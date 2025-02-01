import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';
import Result from '@root/app/types/Result';
import { UserModel } from '../_types/User/UserModel';

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
          reject(error)
        });
    });
  };
  getUserListForSelect = async (input: string): Promise<Result<UserModel[]>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetUserListForSelect', input)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
  getUserListForSelectByIds = async (userIds: number[]): Promise<Result<UserModel[]>> => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/GetUserListForSelectByIds', userIds)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
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
          reject(error)
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
          reject(error)
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
          reject(error)
        });
    });
  };
  deleteUser = async (userId: number): Promise<Result<null>> => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/deleteUser', { params: { userId: userId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        });
    });
  };
}
