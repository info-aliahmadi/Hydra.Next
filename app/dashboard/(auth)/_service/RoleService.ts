import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';
import Result from '@root/app/types/Result';

export default class RoleService {
  constructor(jwt: string) {
    if (jwt)
      setDefaultHeader(jwt);
  }
  getRoleList = async (searchParams: GridDataBound): Promise<Result<PaginatedList<RoleModel>>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetRoleList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  getAllRoles = async (): Promise<Result<RoleModel[]>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/GetAllRoles')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  getRoleById = async (roleId: number): Promise<Result<RoleModel>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getRoleById', { params: { roleId: roleId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  addRole = async (role: RoleModel): Promise<Result<RoleModel>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/addRole', role)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  updateRole = async (role: RoleModel): Promise<Result<RoleModel>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updateRole', role)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  deleteRole = async (roleId: number): Promise<Result<null>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deleteRole', { params: { roleId: roleId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
}
  