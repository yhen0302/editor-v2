function empty() { }

onmessage = (e) => {
  const formData = new FormData()
  const option = e.data
  for (const k in option.data) {
    formData.append(k, option.data[k])
  }
  sendXhr({
    url: option.url,
    data: formData,
    method: option.method,
    sucess(res) {
      postMessage({ id: option.id, type: "SUCESS", data: res })
    },
    fail(ev) {
      postMessage({ id: option.id, type: "ERROR", data: "未知的网络错误!" })
    },
    upProgress(ev) {
      postMessage({ id: option.id, type: "UP_PROGRESS", data: { total: ev.total, loaded: ev.loaded } })
    }
  })
}

function sendXhr({ url, method = "get", sucess = empty, fail = empty, data, headers = {}, upProgress = empty }) {
  if (!url) throw new Error("parameter url is requred,url is not define.")
  const xhr = new XMLHttpRequest()
  for (let k in headers) {
    xhr.setRequestHeader(k, headers[k])
  }

  xhr.open(method, url)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      sucess(xhr.response)
    }
  }
  xhr.onerror = fail
  xhr.upload.onprogress = upProgress
  xhr.send(data)
}



