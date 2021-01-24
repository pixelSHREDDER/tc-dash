import React, { useCallback, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useInstance } from '../CustomHooks';
import FormRenderer from '../Forms/FormRenderer';
import { updateInstance } from '../redux/actions/instanceActions';

function GSForm(props) {
  const { blurb, location, questionGroups } = props;
  const skipEffect = useRef(null);
  const { handleSaveInstance } = useInstance();
  const instance = useSelector(state => state.instance);
  const [filledToggles, setFilledToggles] = useState({});
  const [onboardingSection, setOnboardingSection] = useState(null);
  const [questionClearQueue, setQuestionClearQueue] = useState({});
  const [questionProgressValues, setQuestionProgressValues] = useState({});
  const dispatch = useDispatch();

  const saveInstance = data => {
    dispatch(updateInstance(data));
    handleSaveInstance();
  }

  const updateQuestionProgressValues = useCallback((values, totalPoints, question) => {
    values[question.id] = totalPoints;
    question.type === 'radioToggle' && question.fields.forEach(field => updateQuestionProgressValues(values, totalPoints / question.fields.length, field))
  }, []);

  const setProgressValues = useCallback(() => {
    let newQuestionProgressValues = { ...questionProgressValues };
    let requiredQuestions;

    questionGroups.forEach(group => {
      requiredQuestions = [ ...group.questions.filter(q => q.type === 'radioToggle' || (q.validators && q.validators.includes('required'))) ];

      requiredQuestions.forEach(question => {
        updateQuestionProgressValues(newQuestionProgressValues, (100 / questionGroups.length) / requiredQuestions.length, question);
      });
    });

    setQuestionProgressValues(newQuestionProgressValues);
  }, [questionGroups, questionProgressValues, updateQuestionProgressValues]);

  const incrementOnboardingProgress = (question, progress, queue) => {
    const { filled, id, parents } = question;

    let newOnboardingProgress = { ...progress };

    if (parents && parents.length) {
      if (parents[0] in queue) {
        if (filled === true) {
          newOnboardingProgress[onboardingSection] += questionProgressValues[id];
          if (newOnboardingProgress[onboardingSection] > 99.9) { newOnboardingProgress[onboardingSection] = 100 }
        }
        else {
          newOnboardingProgress[onboardingSection] -= questionProgressValues[id];
          if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
        }

        return newOnboardingProgress;
      }
    } else if (filled === true) {
      newOnboardingProgress[onboardingSection] += questionProgressValues[id];
      if (newOnboardingProgress[onboardingSection] > 99.9) { newOnboardingProgress[onboardingSection] = 100 }
    }
    else {
      newOnboardingProgress[onboardingSection] -= questionProgressValues[id];
      if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
    }

    return newOnboardingProgress;
  }

  const updateQuestionClearQueue = (id, question, parents, queue) => {
    let parentId;

    if (!('filled' in question)) { question.filled = (('value' in question) && question.value) ? true : false }
    
    if (!('isRequired' in question)) {
      if (('validators' in question) && (question.validators.includes('required'))) {
        question.isRequired = true;
      } else {
        question.isRequired = false;
      }
    }

    if (!parents || !parents.length) { return {
      ...queue,
      [id]: [{
        id: question.id,
        isRequired: question.isRequired,
        name: question.name,
        parents: [],
        filled: question.filled,
      }],
    }};

    parentId = parents[0];

    if (parentId in queue) {
      for (let i = 0; i < queue[parentId].length; i++) {
        if (queue[parentId][i].id === id) {
          queue[parentId][i].filled = question.filled;
          return queue; 
        }
      }
      queue[parentId].push({
        id: question.id,
        isRequired: question.isRequired,
        name: question.name,
        parents: question.parents,
        filled: question.filled,
      });

      return queue;
    }

    return queue;
  }

  const handleRadioToggleChange = (value, id, fields, parents) => {
    let newFilledToggles = { ...filledToggles };
    let newInstance = { ...instance };
    let newOnboardingProgress = { ...newInstance['onboarding_progress'] };
    let newQuestionClearQueue = { ...questionClearQueue };

    newFilledToggles[id] = value;

    if (value === true) {
      newQuestionClearQueue[id] = [];
      fields.forEach(field => newQuestionClearQueue[id].push({
        id: field.id,
        isRequired: true,
        name: field.name,
        parents: field.parents,
        value: null,
        filled: false,
      }));
    }

    if ((value === false) && (filledToggles[id] === true)) {
      fields.forEach(field => {
        field.name && delete newInstance[field.name];
        newQuestionClearQueue = updateQuestionClearQueue(field.id, field, field.parents, newQuestionClearQueue);
        if (field.isRequired) { newOnboardingProgress = incrementOnboardingProgress(field, newOnboardingProgress, newQuestionClearQueue) }
      });
      newOnboardingProgress = incrementOnboardingProgress({
        filled: true,
        id,
      }, newOnboardingProgress, newQuestionClearQueue);
      
      parents.forEach(parent => {
        newQuestionClearQueue[parent].fields && newQuestionClearQueue[parent].fields.forEach(field => {
          field.name && delete newInstance[field.name];
          newQuestionClearQueue = updateQuestionClearQueue(field.id, field, [ parent ], newQuestionClearQueue);
          if (field.isRequired) { newOnboardingProgress = incrementOnboardingProgress(field, newOnboardingProgress, newQuestionClearQueue) }
        });
        newOnboardingProgress = incrementOnboardingProgress({
          filled: newFilledToggles[parent] || false,
          id,
        }, newOnboardingProgress, newQuestionClearQueue);
      });

      saveInstance({
        ...newInstance,
        'onboarding_progress': newOnboardingProgress,
      });

      setFilledToggles(newFilledToggles);
      setQuestionClearQueue(newQuestionClearQueue);
    } else {
      newOnboardingProgress = incrementOnboardingProgress({
        filled: !(id in filledToggles) && (value === false),
        id,
      }, newOnboardingProgress, newQuestionClearQueue);

      saveInstance({
        ...newInstance,
        'onboarding_progress': newOnboardingProgress,
      });

      setFilledToggles(newFilledToggles);
      setQuestionClearQueue(newQuestionClearQueue);
    }
  }

  const handleInputChange = (value, id, name, isRequired, parents) => {
    let newOnboardingProgress;
    let newInstance = { ...instance };
    let question = {
      id: id,
      isRequired,
      filled: value ? true : false,
      name: name,
      parents,
      value: value,
    };
    let newQuestionClearQueue;

    if (value) {
      if (name) { newInstance[name] = value }
      newQuestionClearQueue = updateQuestionClearQueue(id, question, parents, questionClearQueue);

      if (isRequired) {
        newOnboardingProgress = incrementOnboardingProgress(question, newInstance['onboarding_progress'], newQuestionClearQueue);
        newInstance['onboarding_progress'] = newOnboardingProgress;
        saveInstance(newInstance);
      } else {
        name && saveInstance(newInstance);
      }

      setQuestionClearQueue(newQuestionClearQueue);
    } else {
      if (name in newInstance) { delete newInstance[name] }
      newQuestionClearQueue = updateQuestionClearQueue(id, question, parents, questionClearQueue);

      if (isRequired) {
        newOnboardingProgress = incrementOnboardingProgress(question, newInstance['onboarding_progress'], newQuestionClearQueue);
        newInstance['onboarding_progress'] = newOnboardingProgress;
        saveInstance(newInstance);
      }

      setQuestionClearQueue(newQuestionClearQueue);
    }
  }

  useEffect(() => {
    if (!skipEffect.current) {
      setProgressValues();
      setOnboardingSection(location.pathname.replace('/get-started/', '').replace('-', '_'));
      skipEffect.current = true;
    }
  }, [location, setProgressValues]);

  return (
      <FormRenderer
          blurb={blurb}    
          questionGroups={questionGroups}
          radioToggleChangeCallback={data => handleRadioToggleChange(data.value, data.id, data.fields, data.parents)}
          inputChangeCallback={data => handleInputChange(data.value, data.id, data.name, data.isRequired, data.parents)}
      />
  )
}

GSForm.propTypes = {
  blurb: PropTypes.object,
  questionGroups: PropTypes.array.isRequired,
};

export default withRouter(GSForm);