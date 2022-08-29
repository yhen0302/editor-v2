import api from './index'

export function uploadFile(data:FormData) {
  return api({url:'file/upload',data,method:'post'})
}

function deleteFile(){

}