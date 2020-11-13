import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3001" // "https://heroku.app.blah.com"
})

// ============ AUTH =============
// goes to http://localhost:3001/auth/signup
export const signup = async (newUserData) => {
  const resp = await api.post('/auth/signup', newUserData);
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
}

// goes to http://localhost:3001/auth/login
export const login = async (loginData) => {
  const resp = await api.post('/auth/login', loginData);
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  console.log(resp.data.user)
  return resp.data.user;
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');

  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false;
}

export const getAllStats = async () => {
  const resp = await api.get('/stats/getAll');
  return resp;
}