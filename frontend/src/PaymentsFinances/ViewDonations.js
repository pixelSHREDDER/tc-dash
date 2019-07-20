import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewDonations = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Donations on WordPress',
        text: 'You can view a list of all of your chapter\'s donations via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]}></ExternalLinkPanel>
);

export default ViewDonations;