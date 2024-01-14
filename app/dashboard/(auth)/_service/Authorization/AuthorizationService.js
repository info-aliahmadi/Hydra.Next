import axios from 'axios';
import CONFIG from '/config.js';
import { setDefaultHeader } from '/utils/axiosHeaders';
// import { verifyJwtToken, createJwtToken } from '/utils/JwtService';
export default class AuthorizationService {

  constructor(jwt) {
    setDefaultHeader(jwt);
    this.jwt = jwt;
  }

  isAuthorized = async (permission) => {
    return new Promise((resolve, reject) => {
      this.getUserPermissions()
        .then((permissions) => {
          let result = permissions?.findIndex(function (element) {

            return element === permission;
          });
          resolve(result >= 0 ? true : false);
        })
        .catch((error) => {
          reject(false);
        });
    });
  };
  getUserPermissions() {
    return new Promise((resolve, reject) => {

      fetch(CONFIG.API_BASEPATH + '/Auth/GetPermissionsOfCurrentUser', {
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
        cache: 'force-cache',
        next: { revalidate: 20000 }
      }).then(response => resolve(response.json()))
        .catch(error => reject(error));

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
  // getUserPermissions() {
  //   return new Promise(async (resolve, reject) => {
  //     const sessionName = "_pls";
  //       if (typeof window !== 'undefined') {
  //       const permissionsToken = sessionStorage.getItem(sessionName);
  //       const secret = this.getJwtSecretKey();
  //       if (permissionsToken) {
  //         const payload = await verifyJwtToken(permissionsToken, secret)
  //         if (payload) {
  //           resolve(payload.permissions);
  //           return;
  //         }
  //       }

  //       axios
  //         .get(CONFIG.API_BASEPATH + '/Auth/GetPermissionsOfCurrentUser')
  //         .then(async (response) => {
  //           const ps = response.data;
  //           let date = new Date();
  //           date.setDate(date.getDate() + 20);
  //           const token = await createJwtToken(ps, secret, date);
  //           window.sessionStorage.setItem(sessionName, token)
  //           resolve(ps);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           reject([]);
  //         });
  //     } else {
  //       resolve([])
  //     }

  //   });
  // }
}
