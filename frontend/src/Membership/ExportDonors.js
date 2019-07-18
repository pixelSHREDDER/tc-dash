import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportDonors = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Export Your Donors from WordPress',
            text: 'You can export your chapter\'s donor data via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ExportDonors;