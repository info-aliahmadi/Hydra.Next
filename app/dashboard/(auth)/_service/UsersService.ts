import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';
import { UserModel } from '../_types/User/UserModel';
import GridDataBound from '@root/app/types/GridDataBound';
import Result from '@root/app/types/Result';
import { PaginatedList } from '@root/app/types/PaginatedList';

export default class UsersService {
  constructor(jwt?: string) {
    if (jwt)
      setDefaultHeader(jwt);
  }
  getUserList = async (searchParams: GridDataBound): Promise<Result<PaginatedList<UserModel>>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetUserList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getUserListForSelect = async (input: string) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetUserListForSelect', input)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getUserListForSelectByIds = async (userIds: number[]) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetUserListForSelectByIds', userIds)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  getUserById = async (userId: number) : Promise<UserModel> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getUserById', { params: { userId: userId } })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  addUser = async (user: UserModel): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/addUser', user)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  updateUser = async (user: UserModel): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updateUser', user)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
  deleteUser = async (userId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deleteUser', { params: { userId: userId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message))
        });
    });
  };
}
