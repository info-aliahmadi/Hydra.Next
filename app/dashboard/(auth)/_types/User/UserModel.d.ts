import { MRT_RowData } from 'material-react-table';
interface UserModel extends MRT_RowData {
    id?: number;
    name?: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    avatar?: string;
    avatarFile?: string;
    registerDate?: Date;
    defaultLanguage?: string;
    defaultTheme?: string;
    password?: string;
    accessToken?: string;
    emailConfirmed?: boolean;
    phoneNumberConfirmed?: boolean;
    lockoutEnd?: Date;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    roleIds?: number[];
    roles?: string[];
  }