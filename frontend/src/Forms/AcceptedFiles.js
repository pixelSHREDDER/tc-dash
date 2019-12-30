class AcceptedFiles {
    constructor() {
        this.audio = {
            dropzoneText: 'an audio file',
            mimes: [
                'audio/mpeg', /* .mp3 */
                'audio/wav',
            ],
            filetypes: [ '.mp3', '.wav' ],
        };
        this.documents = {
            dropzoneText: 'a document',
            mimes: [
                'application/msword', /* .doc */
                'application/pdf',
                'application/rtf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', /* .docx */
                'text/plain', /* .txt and others */
            ],
            filetypes: [ '.doc', '.docx', '.pdf', '.rtf', '.txt' ],
        };
        this.images = {
            dropzoneText: 'an image',
            mimes: [
                'image/bmp',
                'image/gif',
                'image/jpeg',
                'image/png',
                'image/tiff',
            ],
            filetypes: [ '.bmp', '.gif', '.jpg', '.jpeg', '.png', '.tiff' ],
        };
        this.transparentImages = {
            dropzoneText: 'an image with a transparent background',
            mimes: [
                'image/bmp',
                'image/gif',
                'image/png',
                'image/tiff',
            ],
            filetypes: [ '.bmp', '.gif', '.png', '.tiff' ],
        };
        this.video = {
            dropzoneText: 'a video',
            mimes: [
                'video/mp4',
                'video/quicktime', /* .mov */
                'video/webm',
                'video/x-matroska', /* .mkv */
                'video/x-ms-wmv',
                'video/x-msvideo', /* .avi */
            ],
            filetypes: [ '.avi', '.mkv', '.mov', '.mp4', '.webm', '.wmv' ],
        };
    }

    getGeneric() {
        return {
            dropzoneText: 'a file',
            mimes: [
                ...this.audio.mimes,
                ...this.documents.mimes,
                ...this.images.mimes,
                ...this.video.mimes,
            ],
            filetypes: [
                ...this.audio.filetypes,
                ...this.documents.filetypes,
                ...this.images.filetypes,
                ...this.video.filetypes,
            ].sort(),
        };
    }
};

export default AcceptedFiles;