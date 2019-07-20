import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { FacebookIcon } from '../Icons';

const PostToFacebookPage = () => (
    <ExternalLinkPanel panels={[{
        title: 'Post to Facebook Page',
        text: 'You can post to your chapter\'s Facebook page here.',
        note: 'You may be redirected to log into Facebook first.',
        icon: <FacebookIcon />,
        linkFn: null,
    }]} />
);

export default PostToFacebookPage;