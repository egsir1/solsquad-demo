export interface UserModel {
  userId: string;
  publicId: string; // wallet address
  firstName: string;
  lastName?: string;
  email?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
  createdSurveys: string[]; // list of survey ids
  participatedSurveys: string[]; // list of survey ids
} 