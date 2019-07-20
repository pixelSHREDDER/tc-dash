import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { GoogleAnalyticsIcon, GoogleIcon } from '../Icons';

const ViewWebsiteStats = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Stats on Google Analytics',
        text: 'You can view your website\'s stats and traffic on Google Analytics.',
        note: 'You may be redirected to log into your position\'s Google account first.',
        icon: <GoogleAnalyticsIcon />,
        linkFn: null,
        useDates: true,
    }, {
        title: 'View Your Rankings on Google Search Console',
        text: 'You can view your website\'s search rankings and settings on Google Search Console.',
        note: 'You may be redirected to log into your position\'s Google account first.',
        icon: <GoogleIcon />,
        linkFn: null,
        useDates: true,
    }]} />
);

export default ViewWebsiteStats;