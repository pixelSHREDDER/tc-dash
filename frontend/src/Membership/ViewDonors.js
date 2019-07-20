import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewDonors = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Donors on WordPress',
        text: 'You can view a list of all of your chapter\'s donors via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ViewDonors;