import { deleteKeyHandle, keyboardHandle } from '@/core/2d/features/hotKeyHandle'

document.addEventListener('keyup',(ev)=>{
  keyboardHandle(ev.keyCode)
})



