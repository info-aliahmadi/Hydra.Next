import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';

export default class PermissionRoleService {
  constructor(jwt: string) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getPermissionList = async (searchParams : any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetPermissionRoleList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };

  addPermissionRole = async (permissionId : number, roleId : number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/AssignPermissionToRoleByRoleId', { params: { roleId: roleId, permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };
  deletePermissionRole = async (permissionId : number, roleId : number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/DismissPermissionToRoleByRoleId', { params: { roleId: roleId, permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };
}
