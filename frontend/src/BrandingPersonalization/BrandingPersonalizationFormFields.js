const chapterColorFormFields = [
    {
        type: 'colorPicker',
        name: 'primary_color',
        label: 'Primary Color',
        description: 'Used for the header and main buttons on your website, as well as on other platforms and services where custom colors are used. Recommend a medium to dark shade.',
        validators: ['required'],
    },
    {
        type: 'colorPicker',
        name: 'secondary_color',
        label: 'Secondary Color',
        description: 'Used for the menu bar and additional buttons on your website. Recommend a medium to dark shade which stands out against your Primary Color.',
        validators: ['required'],
    },
    {
        type: 'colorPicker',
        name: 'accent_color',
        label: 'Accent Color',
        description: 'Used for accents and other details on your website. Recommend a light to medium shade.',
        validators: ['required'],
    },
];

const chapterIconFormFields = [
    /*{
        type: 'fileUpload',
        name: 'website_up',
        label: 'Website URL',
        fileType: 'documents',
        filesLimit: 10,
        validators: ['required'],
    },*/
    {
        type: 'imageUpload',
        name: 'icon',
        label: 'Chapter Icon',
        // Can I do this programmatically?
        //description: 'If your image is smaller than the minimum size, please center the image.',
        description: 'Used for your Facebook Page, Google account profiles, Mailchimp profile, in search results, social sharing, and the "favicon" in browser tabs. Recommend a simple, shape-based logo with minimal text.',
        imgWidth: 1024,
        imgHeight: 1024,
        fileType: 'images',
        validators: ['required'],
    },
];

const chapterLogoFormFields = [
    {
        type: 'imageUpload',
        name: 'website_logo',
        label: 'Chapter Logo',
        // Can I do this programmatically?
        //description: 'If your image is smaller than the minimum size, please align the image to the left and centered vertically.',
        description: 'Used at the top of your website, and in automatic emails sent to users. Recommend including your chapter\'s name, optionally with graphics. Make sure you scale this image right to the edges!',
        imgWidth: 600,
        imgHeight: 112,
        fileType: 'transparentImages',
        validators: ['required'],
    },
    {
        type: 'imageUpload',
        name: 'website_mobile_logo',
        label: 'Chapter Logo For Mobile Devices',
        // Can I do this programmatically?
        //description: 'If your image is smaller than the minimum size, please align the image to the left and centered vertically.',
        description: 'Used at the top of your website on mobile devices. Recommend including your chapter\'s name, optionally with graphics. Make sure you scale this image right to the edges!',
        imgWidth: 405,
        imgHeight: 57,
        fileType: 'transparentImages',
        validators: ['required'],
    },
    {
        type: 'imageUpload',
        name: 'paypal_payment_logo',
        label: 'Chapter Logo For Payment Screens',
        // Can I do this programmatically?
        //description: 'If your image is smaller than the minimum size, please align the image to the left and centered vertically.',
        description: 'Used on PayPal payment screens. Recommend including your chapter\'s name, optionally with graphics.',
        imgWidth: 780,
        imgHeight: 90,
        fileType: 'images',
        validators: ['required'],
    },
    {
        type: 'imageUpload',
        name: 'paypal_invoice_logo',
        label: 'Chapter Logo For Invoices',
        // Can I do this programmatically?
        //description: 'If your image is smaller than the minimum size, please align the image to the left and centered vertically.',
        description: 'Used on PayPal invoices. Recommend including your chapter\'s name, optionally with graphics.',
        imgWidth: 150,
        imgHeight: 50,
        fileType: 'images',
        validators: ['required'],
    },
];
    /* Not needed anymore
    {
        type: 'imageUpload',
        name: 'website_footer_logo',
        label: 'Chapter Footer Logo',
        description: '',
        imgWidth: 960,
        imgHeight: 200,
        fileType: 'images',
        validators: ['required'],
    },*/

const welcomePostImageFormFields = [
    {
        type: 'imageUpload',
        name: 'welcome_post_image',
        label: 'Welcome Post Image',
        description: 'Used for the very first blog post on your new website, welcoming visitors. Recommend a group photo, or a relevant stock image. Make sure you scale this image right to the edges!',
        imgWidth: 3000,
        imgHeight: 1925,
        fileType: 'images',
        validators: ['required'],
    },
];

export {
    chapterColorFormFields,
    chapterIconFormFields,
    chapterLogoFormFields,
    welcomePostImageFormFields,
};