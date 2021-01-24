import React from 'react';
import GSForm from '../Forms/GSForm';
import {
    chapterColorFormFields,
    chapterIconFormFields,
    chapterLogoFormFields,
    welcomePostImageFormFields,
} from '../BrandingPersonalization/BrandingPersonalizationFormFields';

const blurb = {
    title: 'Branding Images',
    paragraphs: [
        'Make sure the images you use are legible at small sizes (and avoid tiny text)!',
    ],
};

const questionGroups = [
    {
        questions: [
            ...chapterLogoFormFields,
        ],
    },
    {
        questions: [
            ...chapterIconFormFields,
        ],
    },
    {
        questions: [
            ...welcomePostImageFormFields,
        ],
    },
    {
        title: 'Branding Colors',
        description: 'Use colors that make your chapter really stand out in the crowd!',
        questions: [
            ...chapterColorFormFields,
        ],
    },
];

function GSBrandingPersonalization(props) { return <GSForm blurb={blurb} questionGroups={questionGroups} />; }

export default GSBrandingPersonalization;