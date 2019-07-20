import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewWebsitePosts = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Posts on WordPress',
        text: 'You can view a list of all the posts on your website via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
        useDates: true,
    }]} />
);

export default ViewWebsitePosts;