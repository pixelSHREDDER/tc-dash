import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportAlumni = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Export Your Alumni from WordPress',
            text: 'You can export your chapter\'s alumni data via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ExportAlumni;