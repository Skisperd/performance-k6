import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 10,
    duration: '10s',
    threshold: {
      http_req_duration: ['p(95)<2000'], //95% should be response
      http_req_failed: ['rate<0.01'] //1% das request failed
    }
  }

  export default function () {
    const url = 'http://localhost:3333/signup'

  const payload = JSON.stringify(
    { email: 'tiagodias2@connections.com', password: 'UmDois12' }
  )
  const headers = {
    'headers': {
      'Content-Type': 'application/json'
    }
  }
  const res = http.post(url, payload, headers)

  console.log(res.body)

  check(res, {
    'status should be 200': (r) => r.status === 200
  })

  sleep(1)
}
