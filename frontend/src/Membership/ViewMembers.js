import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewMembers = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'View Your Members on WordPress',
            text: 'You can view a list of all of your chapter\'s active members via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ViewMembers;