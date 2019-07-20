import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewMembers = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Members on WordPress',
        text: 'You can view a list of all of your chapter\'s active members via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ViewMembers;