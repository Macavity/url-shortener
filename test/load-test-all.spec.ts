import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';

const encodeErrorRate = new Rate('Encode Error Rate');
const decodeErrorRate = new Rate('Decode Error Rate');
const frontendErrorRate = new Rate('Frontend Error Rate');

const ENCODE = 'Encode URL';
const DECODE = 'Decode Short Code';
const FRONTEND = 'Frontend Page';

const encodeTrend = new Trend(ENCODE);
const decodeTrend = new Trend(DECODE);
const frontendTrend = new Trend(FRONTEND);

const apiUrl = 'http://localhost:3000';
const decodeShortCode = 'avbcf2-j';
const urlEncode = `${apiUrl}/short-url/encode`;
const urlDecode = `${apiUrl}/short-url/decode/${decodeShortCode}`;
const urlFrontend = `${apiUrl}/`;

export const options = {
  thresholds: {
    [ENCODE]: ['p(95)<30'],
    [DECODE]: ['p(95)<50'],
    [FRONTEND]: ['p(95)<100'],
  },
};

/**
 * Reset the data and store one entry which will be decoded in the load test
 */
export function setup() {
  http.del(`${apiUrl}/short-url/reset`);
  http.post(urlEncode, {
    original: 'https://google.com/test-for-decode',
    short: decodeShortCode,
  });
}

export default function () {
  const requests = {
    [DECODE]: {
      method: 'GET',
      url: urlDecode,
    },
    [ENCODE]: {
      method: 'POST',
      url: urlEncode,
      body: {
        original: 'https://www.google.com/',
      },
    },
    [FRONTEND]: {
      method: 'GET',
      url: urlFrontend,
    },
  };

  const responses = http.batch(requests);
  const encodeResp = responses[ENCODE];
  const decodeResp = responses[DECODE];
  const frontendResp = responses[FRONTEND];

  check(encodeResp, {
    'Encode: Status is 201': (r) => r.status === 201,
  }) || encodeErrorRate.add(1);

  encodeTrend.add(encodeResp.timings.duration);

  check(decodeResp, {
    'Decode: Status is 200': (r) => r.status === 200,
  }) || decodeErrorRate.add(1);

  decodeTrend.add(decodeResp.timings.duration);

  check(frontendResp, {
    'Page responds with 200': (r) => r.status === 200,
  }) || frontendErrorRate.add(1);

  frontendTrend.add(frontendResp.timings.duration);

  sleep(1);
}
