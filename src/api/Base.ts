import axios, { AxiosResponse } from 'axios';

export abstract class Base {
  public BASE_URL = import.meta.env.VITE_BASE_URL;

  getInstance() {
    return axios.create({
      baseURL: this.BASE_URL,
    });
  }

  getRequest(response: Promise<AxiosResponse>) {
    return response
      .then((result) => result.data)
      .catch((errror) => {
        throw new Error(errror);
      });
  }
}
