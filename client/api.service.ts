import axios from 'axios';

export class ApiService {
  static callEncode(original: string) {
    return axios
      .post('/short-url/encode', {
        original,
      })
      .then((response) => response.data);
  }
}
