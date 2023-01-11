import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '20s', target: 100 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], //95% should be response
    http_req_failed: ['rate<0.01'] //1% das request failed
  }
}

export default function () {
  const url = 'http://localhost:3333/signup'

  const payload = JSON.stringify(
    { email: 'tiagodias5@connections.com', password: 'UmDois12' }
  )
  const headers = {
    'headers': {
      'Content-Type': 'application/json'
    }
  }
  const res = http.post(url, payload, headers)

  console.log(res.body)

  check(res, {
    'status should be 201': (r) => r.status === 201
  })

  sleep(1)
}
