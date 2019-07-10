import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const WriteWebsitePost = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Write a Post on WordPress',
            text: 'You can write a new post for your website via the WordPress interface.',
            icon: <WordPressIcon />,
            linkFn: null,
            useDates: true,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default WriteWebsitePost;