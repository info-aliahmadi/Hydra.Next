import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';
import Result from '@root/app/types/Result';

export default class PermissionService {
  constructor(jwt: string) {
    if (jwt)
      setDefaultHeader(jwt);

  }
  getPermissionList = async (searchParams: GridDataBound): Promise<Result<PaginatedList<Permission>>> => {
    return new Promise((resolve, reject) => {

      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetPermissionList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  getPermissionById = async (permissionId: number): Promise<Result<Permission>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getPermissionById', { params: { permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  getPermissionsByName = async (name: string): Promise<Result<Permission[]>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/GetPermissionsByName', { params: { name: name } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  addPermission = async (permission: Permission): Promise<Result<Permission>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/addPermission', permission)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  updatePermission = async (permission: Permission): Promise<Result<Permission>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updatePermission', permission)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  deletePermission = async (permissionId: number): Promise<Result<null>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deletePermission', { params: { permissionId: permissionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
}
