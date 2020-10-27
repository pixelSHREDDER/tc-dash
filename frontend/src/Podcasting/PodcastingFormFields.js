const podcastFormFields = {
    'existing': [
        {
            type: 'radioToggle',
            id: 'podcast_anchor',
            label: 'Is it hosted by Anchor?',
            fields: [
                {
                    type: 'text',
                    id: 'podcast_anchor_link',
                    label: 'Player Link',
                    description: 'Go to your podcast\'s page on Anchor, click \'Listen in your favorite app\', and copy/paste the link for the service of your choice',
                    validators: ['required', 'url'],
                },
            ],
        },
        {
            type: 'textarea',
            id: 'podcast_embed_code',
            label: 'Player Embed (for non-Anchor podcasts)',
            description: 'If you don\'t use Anchor, please paste the embed code for your podcast player here (it\'s usually enclosed in an <iframe> tag)',
            validators: ['iframe'],
        },
    ],
};

export {
    podcastFormFields,
};