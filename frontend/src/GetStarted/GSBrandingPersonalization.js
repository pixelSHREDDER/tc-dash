import React from 'react';
import GSForm from '../Forms/GSForm';
import {
    chapterColorFormFields,
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
    {
        title: 'Chapter Colors',
        description: 'Make sure these images are legible at small sizes (and avoid tiny text)!',
        questions: [
            ...chapterColorFormFields,
        ],
    },
];

class GSBrandingPersonalization extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSBrandingPersonalization;