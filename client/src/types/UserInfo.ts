export interface UserInfo {
  user: {
    _id: string;
    userEmail: string;
    userPassword: string;
    userNickname: string;
    userPreference: string[];
    userDescription: string;
    userFollow: string[];
    userFollower: string[];
    userFile: string;
  }
}
