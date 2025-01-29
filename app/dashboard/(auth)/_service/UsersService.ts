import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config';

export default class UsersService {
  constructor(jwt : string) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getUserList = async (searchParams : any) => {
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
  getUserListForSelect = async (input : any) => {
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
  getUserListForSelectByIds = async (userIds : any) => {
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
  getUserById = async (userId : number) => {
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
  addUser = async (user : any) => {
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
  updateUser = async (user: any) => {
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
