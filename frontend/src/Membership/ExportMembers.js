import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ExportMembers = () => (
    <ExternalLinkPanel panels={[{
        title: 'Export Your Members from WordPress',
        text: 'You can export your chapter\'s active member data via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ExportMembers;