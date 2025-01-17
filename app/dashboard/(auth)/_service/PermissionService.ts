import axios from 'axios';
import CONFIG from '@root/config.js';
import { setDefaultHeader } from '@root/utils/axiosHeaders';

export default class PermissionService {
  constructor(jwt : string) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getPermissionList = async (searchParams : any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetPermissionList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getPermissionById = async (permissionId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getPermissionById', { params: { permissionId: permissionId } })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getPermissionsByName = async (name: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/GetPermissionsByName', { params: { name: name } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  addPermission = async (permission: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/addPermission', permission)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  updatePermission = async (permission: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updatePermission', permission)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  deletePermission = async (permissionId : number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deletePermission', { params: { permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
}
