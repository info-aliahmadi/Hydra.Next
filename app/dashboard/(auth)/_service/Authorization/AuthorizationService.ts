import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';

export default class AuthorizationService {

  storageService: any;
  jwt: any;

  constructor(jwt: any) {
    setDefaultHeader(jwt);
    this.jwt = jwt;
  }

  isAuthorized = async (permission: any) => {
    return new Promise((resolve, reject) => {
      this.getUserPermissions()
        .then((permissions: any) => {
          let result = permissions?.findIndex(function (element: any) {
            return element === permission;
          });
          resolve(result >= 0);
        })
        .catch((error) => {
          reject(new Error('Permission check failed'));
        });
    });
  };
  getUserPermissions() {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/Auth/GetPermissionsOfCurrentUser', {
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
        // cache: 'force-cache',
        // next: { revalidate: 20000 }
      })
      .then(response =>  response.json())
      .then(data => resolve(data))
        .catch(error => reject(new Error(error.message)));

    });
  }
  getJwtSecretKey() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
  }
  refreshUserPermissions = async () => {
    axios
      .get(CONFIG.API_BASEPATH + '/Auth/GetPermissionsOfCurrentUser')
      .then((response) => {
        this.storageService.addItem(response.data);
        return true;
      })
      .catch((error) => {
        return error.message;
      });
  };
}
