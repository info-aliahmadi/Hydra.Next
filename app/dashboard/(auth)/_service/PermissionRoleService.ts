import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';
import Result from '@root/app/types/Result';

export default class PermissionRoleService {
  constructor(jwt: string) {
    if (jwt)
      setDefaultHeader(jwt);
  }
  getPermissionList = async (searchParams: GridDataBound): Promise<Result<PaginatedList<Permission>>> => {
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

  addPermissionRole = async (permissionId: number, roleId: number): Promise<Result<Permission>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/AssignPermissionToRoleByRoleId', { params: { roleId: roleId, permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error : any) => {
          reject(error);
        });
    });
  };
  deletePermissionRole = async (permissionId: number, roleId: number): Promise<Result<null>> => {
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
