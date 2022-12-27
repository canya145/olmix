import {AXIOS} from './axios.config';

class AdsService {

  async getAllAds() {
    const {data} = await AXIOS.get('/ads');
    return data;
  }

  async getAdById(id) {
    const {data} = await AXIOS.get(`/ads/${id}`);
    return data;
  }
}

export const adsService = new AdsService();
