import axios from 'axios';
axios.defaults.baseURL = window.location.origin;

export const getArticles = (callback) => {
  return axios
    .get('/api/articles')
    .then((response) => {
      callback(response);
      return response;
    });
}

export const getArticle = (id, callback) => {
  axios
    .get('/api/articles?_id=' + id)
    .then(function (response) {
      callback(response);
      return response;
    })
};

export const addArticle = (articleJson, callback) => {
  return axios({
    method: 'post',
    url: '/api/articles',
    data: articleJson
  }).then((response) => {
    callback();
    return response;
  });
}

export const editArticle = (id, articleJson, callback) => {
  return axios({
    method: 'put',
    url: '/api/articles',
    params: {
      _id: id
    },
    data: articleJson
  }).then((response) => {
    callback();
    return response;
  });
}

export const deleteArticle = (id, callback) => {
  return axios({
    method: 'delete',
    url: '/api/articles',
    params: {
      _id: id
    }
  }).then((response) => {
    callback();
    return response;
  });
}
export const api = {
  getArticles,
  getArticle,
  addArticle,
  editArticle,
  deleteArticle
}
export default api;