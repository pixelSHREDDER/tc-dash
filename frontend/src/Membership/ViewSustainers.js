import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewSustainers = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Sustainers on WordPress',
        text: 'You can view a list of all of your chapter\'s sustainers via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ViewSustainers;