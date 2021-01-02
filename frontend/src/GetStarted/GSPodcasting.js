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

class GSPodcasting extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSPodcasting;