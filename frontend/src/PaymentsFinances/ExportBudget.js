import React from 'react';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { PayPalIcon } from '../Icons';

const ExportBudget = ({instance}) => {
    const attrs = {
        domain: instance.domain,
        panels: [{
            title: 'Export Your Budget from PayPal',
            text: 'You can generate and export a report of all transactions made through your website, as well as any transactions made through PayPal directly.',
            note: 'You may be redirected to log into your position\'s PayPal account first.',
            icon: <PayPalIcon />,
            linkFn: null,
            useDates: true,
        }]
    };

    return (
        <ExternalLinkPanel {...attrs}></ExternalLinkPanel>
    );
}

export default ExportBudget;