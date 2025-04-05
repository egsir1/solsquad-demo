export interface UserModel {
    userPubKey: string; // wallet public key
    createdSurveys: string[]; // list of survey ids
    participatedSurveys: string[]; // list of survey ids
}