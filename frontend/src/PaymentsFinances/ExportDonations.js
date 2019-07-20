import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { getCSVDonations, getCurrentYearPDFDonations } from '../WordPress/Plugins/Give';
import { WordPressIcon } from '../Icons';

const ExportDonations = () => (
    <ExternalLinkPanel panels={[{
        title: 'Export Donations to CSV File',
        text: 'You can export all or some of your chapter\'s donation data into a CSV (comma-separated values) file.',
        note: 'You may be redirected to log into your Wordpress account first.',
        icon: <WordPressIcon />,
        linkFn: getCSVDonations,
        useDates: true,
    }, {
        title: 'Export This Year\'s Donations to PDF File',
        text: 'You can export all of your chapter\'s donation data for the current year into a PDF file.',
        note: 'You may be redirected to log into your Wordpress account first.',
        icon: <WordPressIcon />,
        linkFn: getCurrentYearPDFDonations,
        useDates: true,
    }]} />
);

export default ExportDonations;