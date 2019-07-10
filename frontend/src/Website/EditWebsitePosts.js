import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const EditWebsitePosts = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Edit Your Posts on WordPress',
            text: 'You can edit the posts on your website directly through the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default EditWebsitePosts;