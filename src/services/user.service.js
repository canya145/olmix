import {AXIOS} from './axios.config';

class UserService {
  async login(user) {
    try {
      return await AXIOS.post('/auth/login', user);
    } catch (e) {
      console.error(e);
      return {error: e.response.data};
    }
  }

  async register(user) {
    try {
      return await AXIOS.post('/auth/register', user);
    } catch (e) {
      console.error(e);
      return {error: e.response.data};
    }
  }
}

const userService = new UserService();

export {userService};
