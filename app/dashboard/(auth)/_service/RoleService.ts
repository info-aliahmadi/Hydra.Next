import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config.js';

export default class RoleService {
  constructor(jwt : string) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getRoleList = async (searchParams : any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetRoleList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getAllRoles = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/GetAllRoles')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getRoleById = async (roleId : number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getRoleById', { params: { roleId: roleId } })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  addRole = async (role : any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/addRole', role)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  updateRole = async (role: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updateRole', role)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  deleteRole = async (roleId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deleteRole', { params: { roleId: roleId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
}
