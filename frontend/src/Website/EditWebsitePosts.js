import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const EditWebsitePosts = () => (
    <ExternalLinkPanel panels={[{
        title: 'Edit Your Posts on WordPress',
        text: 'You can edit the posts on your website directly through the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default EditWebsitePosts;