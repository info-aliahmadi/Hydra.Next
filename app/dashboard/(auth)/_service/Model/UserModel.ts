interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  dob: Date;
  registerDate: Date;
  defaultLanguage: string;
  defaultTheme: string;
  avatar: string;
  userRoles: string[];
}
