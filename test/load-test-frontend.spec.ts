import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '10s', target: 10 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
