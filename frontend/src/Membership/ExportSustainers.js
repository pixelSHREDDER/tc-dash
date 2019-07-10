import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportSustainers = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Export Your Sustainers from WordPress',
            text: 'You can export your chapter\'s sustainer data via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ExportSustainers;