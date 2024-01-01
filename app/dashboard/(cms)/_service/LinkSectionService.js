import axios from 'axios';
import CONFIG from '/config.js';
import { setDefaultHeader } from '/utils/axiosHeaders';

export default class LinkSectionService {
  constructor(jwt) {
    setDefaultHeader(jwt);
  }
  getLinkSectionList = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/cms/GetLinkSectionList')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getLinkSectionById = async (linkSectionId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/cms/getLinkSectionById', { params: { linkSectionId: linkSectionId } })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  addLinkSection = async (linkSection) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/cms/addLinkSection', linkSection)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  updateLinkSection = async (linkSection) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/cms/updateLinkSection', linkSection)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  visibleLinkSection = async (linkSectionId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/cms/VisibleLinkSection', { params: { linkSectionId: linkSectionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  deleteLinkSection = async (linkSectionId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/cms/deleteLinkSection', { params: { linkSectionId: linkSectionId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
