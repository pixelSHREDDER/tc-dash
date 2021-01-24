import React from 'react';
import GSForm from '../Forms/GSForm';
import { podcastFormFields } from '../Podcasting/PodcastingFormFields';

const questionGroups = [
  {
    title: 'Podcast',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you currently have a podcast?',
        fields: podcastFormFields.existing,
      },
    ],
  },
];

function GSPodcasting(props) { return <GSForm questionGroups={questionGroups} />; }

export default GSPodcasting;