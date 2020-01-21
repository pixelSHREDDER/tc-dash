import React from 'react';
import GSForm from '../Forms/GSForm';
import {
    chapterIconFormFields,
    chapterLogoFormFields,
    welcomePostImageFormFields,
} from '../BrandingPersonalization/BrandingPersonalizationFormFields';

const questionGroups = [
    {
        //title: 'Chapter Logos',
        description: 'Make sure these images are legible at small sizes (and avoid tiny text)!',
        questions: [
            ...chapterLogoFormFields,
        ],
    },
    {
        //title: 'Existing Email Accounts',
        description: 'Make sure these images are legible at small sizes (and avoid tiny text)!',
        questions: [
            ...chapterIconFormFields,
        ],
    },
    {
        //title: 'Misc',
        description: 'Make sure these images are legible at small sizes (and avoid tiny text)!',
        questions: [
            ...welcomePostImageFormFields,
        ],
    },
];

class GSBrandingPersonalization extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSBrandingPersonalization;