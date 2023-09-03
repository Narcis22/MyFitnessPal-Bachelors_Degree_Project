export interface UserMessageModel{
    messageId: string,
    emailSender: string;
    profilePicId: string;
    image: string;
    imageContentType: string;
    isSeen: boolean;
    message: string;
    dateSent: Date
}