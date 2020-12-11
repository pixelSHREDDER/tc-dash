const bylawsConstitutionFormFields = [
    {
        title: 'Current Bylaws/Constitution',
        questions: [
          {
            type: 'radioToggle',
            id: 'bylaws',
            label: 'Do you currently have a downloadable copy of your chapter\'s current Bylaws/Constitution?',
            description: 'We\'ll embed it on your website for your members to easily view and download!',
            fields: [
                {
                    type: 'fileUpload',
                    id: 'bylaws_constitution',
                    //label: 'Welcome Post Image',
                    //description: 'Used for the very first blog post on your new website, welcoming visitors. Recommend a group photo, or a relevant stock image. Make sure you scale this image right to the edges!',
                    //imgWidth: 3000,
                    //imgHeight: 1925,
                    fileType: 'documents',
                    validators: ['required'],
                },
            ],
          },
        ],
      },
];

export {
    bylawsConstitutionFormFields,
};