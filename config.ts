// ==============================|| THEME CONFIG  ||============================== //
const CONFIG = {
  APP_VERSION: '1.2',
  DEFAULT_PATH: '/',
  MINIDRAWER: true,
  CONTAINER: true,
  DASHBOARD_FONT_FAMILY: `'Public Sans', sans-serif`,
  DASHBOARD_DEFAULT_THEME_MODE: 'light',
  DASHBOARD_THEME_MODE_STORAGE_NAME: 'HydraThemeMode',
  PRESET_COLOR: 'default',
  DOMAIN: 'http://localhost:3000',
  API_BASEPATH: 'https://localhost:7134' , // application api basepath
  AVATAR_BASEPATH: 'https://localhost:7134/avatar/',
  UPLOAD_BASEPATH:  'https://localhost:7134/',
  IMAGES_EXTENSIONS: ['.jpg', '.jpeg', '.tiff', '.tif', '.gif', '.bmp', '.png'],
  VIDEOS_EXTENSIONS: ['.mp4', '.h264', '.wmv', '.wav', '.avi', '.flv', '.mov', '.mkv', '.webm', '.ogg'],
  LOGIN_API_PATH:  'https://localhost:7134/Auth/Login',
  REFRESH_TOKEN_API_PATH: 'https://localhost:7134/Auth/RefreshToken',
  LOGOUT_API_PATH: 'https://localhost:7134/Auth/SignOut',
  FRONT_PATH: 'http://localhost:3000',
  DASHBOARD_PATH: 'http://localhost:3000/dashboard',
  LOGIN_PATH: 'http://localhost:3000/api/auth/signin',

  AUTHENTICATION_DEFAULT_STORAGE: 'localStorage', //'cookie',
  AUTHENTICATION_STORAGE_NAME: 'HydraAuthenticationStorage',
  AUTHORIZATION_STORAGE_NAME: 'HydraAuthorizationStorage',
  LANGUAGE_STORAGE_NAME: 'i18nextLng',
  DEFAULT_LANGUAGE: 'en',
  DATE_STYLE: "short", // "full" | "long" | "medium" | "short",
  TIME_STYLE: 'short', // "full" | "long" | "medium" | "short"
  LTR_FONTS_EDITOR: ['"Public Sans"', 'Arial', 'tohoma', 'Courier New,Courier'],
  RTL_FONTS_EDITOR: ['Iran Sans', 'Arial', 'tohoma', 'Courier New,Courier']
};

export default CONFIG;

export const drawerWidth = 260;

export const drawerMinimizeWidth = 60;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
