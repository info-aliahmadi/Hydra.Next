import axios from 'axios';
import { setDefaultHeader } from '/utils/axiosHeaders';
import CONFIG from '/config.js';

export default class PermissionRoleService {
  constructor(jwt) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getPermissionList = async (searchParams) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetPermissionRoleList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  addPermissionRole = async (permissionId, roleId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/AssignPermissionToRoleByRoleId', { params: { roleId: roleId, permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  deletePermissionRole = async (permissionId, roleId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/DismissPermissionToRoleByRoleId', { params: { roleId: roleId, permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
