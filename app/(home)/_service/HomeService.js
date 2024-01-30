import axios from 'axios';
import CONFIG from '/config.js';

const REVALIDATE_TIME = 60;

export default class HomeService {
  getSettings = async () => {
    return new Promise(async (resolve, reject) => {
      await fetch(CONFIG.API_BASEPATH + '/cms/GetSettings', { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getMenu = async () => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/getMenu', { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getArticles = async (searchInput, categoryName, tagName, pageIndex, pageSize) => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetArticlesList?' + new URLSearchParams({
        searchInput: searchInput,
        categoryName: categoryName,
        tagName: tagName,
        pageIndex: pageIndex,
        pageSize: pageSize,

      }), { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getRelatedArticles = async (articleId) => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetRelatedArticlesList?' + new URLSearchParams({
        articleId: articleId
      }), { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getTopArticle = async () => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetTopArticle', { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getArticle = async (articleId) => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetArticle?' + new URLSearchParams({
        articleId: articleId
      }), { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getPage = async (pageId) => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetPage?' + new URLSearchParams({
        pageId: pageId
      }), { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getCategories = async () => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetTopicsList', { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getTags = async () => {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.API_BASEPATH + '/cms/GetTagsList', { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getLinksByKeyList = async (sectionKey) => {
    return new Promise((resolve, reject) => {
      const options =new URLSearchParams({ sectionKey: sectionKey }).toString();
      fetch(CONFIG.API_BASEPATH + '/cms/GetLinksByKeyList?'+ options , { next: { revalidate: REVALIDATE_TIME } })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  sendRequestMessage = async (message) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/crm/SendRequestMessage', message)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  sendContactMessage = async (message) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/crm/SendContactMessage', message)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
