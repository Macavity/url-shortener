import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

export const apiUrl = 'http://localhost:3000';
export const decodeShortCode = 'avbcf2-j';
export const urlEncode = `${apiUrl}/short-url/encode`;
export const urlDecode = `${apiUrl}/short-url/decode/${decodeShortCode}`;

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 40,
      timeUnit: '1s',
      startRate: 50,
      stages: [
        { target: 200, duration: '30s' }, // linearly go from 50 iters/s to 200 iters/s for 30s
        { target: 500, duration: '0' }, // instantly jump to 500 iters/s
        { target: 500, duration: '10m' }, // continue with 500 iters/s for 10 minutes
      ],
    },
  },
};

export const errorRate = new Rate('errors');

export function setup() {
  //http.del(`${apiUrl}/short-url/reset`);
  const res = http.post(urlEncode, {
    original: `https://google.com/maps`,
    short: 'avbcf2',
  });
  check(res, {
    'Setup: Test Data set up': (r) => r.status == 201 || r.status == 304,
  });
  sleep(2);
}

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.get(`http://localhost:3000/short-url/decode/avbcf2`, params);
  check(res, { 'status was 200': (r) => r.status == 200 }) || errorRate.add(1);
  sleep(1);
}
