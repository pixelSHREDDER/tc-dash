import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { AnalyticsIcon } from '../Icons';

const ViewEmailStats = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Email Stats on Mailchimp',
        text: 'You can view your emails\' stats on Mailchimp.',
        note: 'You may be redirected to log into your chapter\'s Mailchimp account first.',
        icon: <AnalyticsIcon />,
        linkFn: null,
        useDates: true,
    }]} />
);

export default ViewEmailStats;