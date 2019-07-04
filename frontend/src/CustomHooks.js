import { useState, useEffect, useRef } from 'react';

const useForm = (initialValues, inputChangeCallback, submitCallback, skipFirstEffect) => {
    const skipEffect = useRef(skipFirstEffect);
    const [inputs, setInputs] = useState(initialValues);
    useEffect(() => {
        if (inputChangeCallback && !skipEffect.current) {
            inputChangeCallback(inputs);
        } else skipEffect.current = false;
    }, [inputs, inputChangeCallback]);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        if (submitCallback) submitCallback();
    };

    const handleInputChange = event => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.nativeEvent.target.id]: event.nativeEvent.target.value}));
    };

    return {
        handleInputChange,
        handleSubmit,
        inputs
    };
}

const useExternalLink = (route, domain, index = 0) => {
    let links = {
        '/email/email-members': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/email/view-stats': [`https://admin.mailchimp.com/reports/`],
        '/membership/view-members': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/export-members': [`https://${domain}/wp-admin/admin-ajax.php?action=memberslist_csv&s=&l=1`],
        '/membership/view-alumni': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/export-alumni': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/view-donors': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/export-donors': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/view-sustainers': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/membership/export-sustainers': [`https://${domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`],
        '/payments-finances/view-budget': [`https://www.paypal.com/listing/transactions?tab=bookkeeping#`],
        '/payments-finances/export-budget': [`https://www.paypal.com/merchantdata/reportHome?reportType=DLOG`],
        '/payments-finances/view-donations': [`https://${domain}/wp-admin/edit.php?post_type=give_forms&page=give-payment-history`],
        '/payments-finances/export-donations': [`https://${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&type=export_donations`,
                                                `https://${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&give-action=generate_pdf`],
        '/social-media/post-to-facebook-page': [`https://${domain}/wp-admin/edit.php?post_type=give_forms&page=give-payment-history`],
        '/website/edit-posts': [`https://${domain}/wp-admin/edit.php`],
        '/website/view-posts': [`https://${domain}/category/blog/`],
        '/website/view-stats': ['https://analytics.google.com/analytics/web/#/report-home/',
                                `https://www.google.com/webmasters/tools/googlebot-fetch?hl=en&siteUrl=${domain}/&authuser=0`],
        '/website/write-post': [`https://${domain}/wp-admin/post-new.php`],
    };
    let dateFormats = {
        '/payments-finances/export-budget': { utc: true },
    };

    const [link, setLink] = useState(links[route][index]);

    const handleSetDates = (dates) => {
        let newLink = link;
        let dateFormat;
        if (!dateFormats[route]) return;
        dateFormat = dateFormats[route];
        if (dateFormat['utc']) dates.forEach = date => date = date.UTC();
        setLink(newLink);
    };

    return {
        handleSetDates,
        link
    };
}

export { useForm, useExternalLink };