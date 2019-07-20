import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { EmailIcon } from '../Icons';

const EmailMembers = () => {
    return (
        <ExternalLinkPanel panels={
            [{
                title: 'Email Your Members on Mailchimp',
                text: 'You can email all of your active members from the Mailchimp interface.',
                note: 'You may be redirected to log into your chapter\'s Mailchimp account first.',
                icon: <EmailIcon />,
                linkFn: null,
            }]
        }></ExternalLinkPanel>
    );
}

export default EmailMembers;