import { deleteKeyHandle, keyboardHandle } from '@/core/2d/features/hotKeyHandle'

document.addEventListener('keyup',(ev)=>{
  console.log('key up')
  keyboardHandle(ev.keyCode)
})



