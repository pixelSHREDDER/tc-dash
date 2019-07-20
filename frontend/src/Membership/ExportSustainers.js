import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportSustainers = () => (
    <ExternalLinkPanel panels={[{
        title: 'Export Your Sustainers from WordPress',
        text: 'You can export your chapter\'s sustainer data via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ExportSustainers;