import axios from 'axios';
import useJwt from '@/auth/jwt/useJwt';
import i18n from '@/libs/i18n/index';

export default class APIService {
  async api(
    { url, method },
    data,
    options = { show_loader: true, http_headers: {}, api_version: undefined },
  ) {
    try {
      const headers = {
        'content-type': 'application/json',
        'Accept-Language': i18n.vm.locale,
      };
      const token = localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName);
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
      const config = {
        method,
        url: process.env.VUE_APP_API + url,
        headers: {
          ...headers,
          ...options.http_headers,
        },
      };
      if (method === 'GET' && data && data.size) {
        config.params = data;
      } else {
        config.data = data;
      }
      const res = await axios(config);
      if (
        res &&
        res.data &&
        res.data.result &&
        res.data.result.errors &&
        res.data.result.errors[0] &&
        res.data.result.errors[0].code === '553'
      ) {
        this.logout();
      }
      if (res && (res.data || res.data === 0)) {
        return res.data;
      }
      return {
        error: {
          header: { status: 'ERROR' },
          message: 'Something went wrong',
        },
      };
    } catch (err) {
      console.log(JSON.stringify(err));

      if (err && err.message && !err.response.data.message) {
        return {
          error: {
            message: err.message,
          },
        };
      }
      if (err.response) {
        return { error: { ...err.response.data } };
      }
      console.log(JSON.stringify(err));
      return {
        error: { header: { status: 'ERROR' }, message: 'Something went wrong' },
      };
    }
  }

  logout() {
    localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);
    localStorage.removeItem('username');

    localStorage.removeItem('userData');
    location.reload(true);
    return true;
  }
}
