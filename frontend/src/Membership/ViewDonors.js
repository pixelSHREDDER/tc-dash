import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewDonors = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'View Your Donors on WordPress',
            text: 'You can view a list of all of your chapter\'s donors via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ViewDonors;