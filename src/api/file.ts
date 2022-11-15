import api from './index'
import { baseURL } from './index'

const update = new Worker('./worker/update.js')

let id = 0
const empty = () => { }
function uploadMessageHandleWrap(id, sucessful: Function = empty, erorr: Function = empty, upProcess: Function = empty) {
  return function (ev: MessageEvent) {
    const data = ev.data
    if (id !== data.id) return
    let fn
    switch (data.type) {
      case "SUCESS":
        data.data = JSON.parse(data.data)
        fn = sucessful
        break
      case "ERROR":
        fn = erorr
        break
      case "UP_PROGRESS":
        fn = upProcess;
        break
      default:
        fn = empty
    }
    fn(data.data)
  }
}
export function uploadFile(data: FormData, upProcess: Function = empty) {
  const map = {}
  for (const [k, v] of data.entries()) {
    map[k] = v
  }

  return new Promise((resolve, reject) => {
    update.postMessage({ url: baseURL + "file/upload", data: map, method: 'post', id: ++id })
    update.addEventListener('message', uploadMessageHandleWrap(id, resolve, reject, upProcess))
  })
}

function deleteFile() {

}