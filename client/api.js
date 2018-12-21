import axios from 'axios';

// 今日干货
export function getToday() {
  return axios.get('https://gank.io/api/today')
    .then(res => res.data);
}
