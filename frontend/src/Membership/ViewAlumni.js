import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { WordPressIcon } from '../Icons';

const ViewAlumni = () => (
    <ExternalLinkPanel panels={[{
        title: 'View Your Alumni on WordPress',
        text: 'You can view a list of all of your chapter\'s alumni via the WordPress interface.',
        icon: <WordPressIcon />,
        linkFn: null,
    }]} />
);

export default ViewAlumni;