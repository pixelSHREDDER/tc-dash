import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { TwitterIcon } from '../Icons';

const SendATweet = () => (
    <ExternalLinkPanel panels={[{
        title: 'Send a Tweet',
        text: 'You can tweet from your chapter\'s Twitter account here.',
        note: 'You may be redirected to log into Twitter first.',
        icon: <TwitterIcon />,
        linkFn: null,
    }]} />
);

export default SendATweet;