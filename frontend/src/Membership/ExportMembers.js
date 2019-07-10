import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportMembers = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Export Your Members from WordPress',
            text: 'You can export your chapter\'s active member data via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ExportMembers;