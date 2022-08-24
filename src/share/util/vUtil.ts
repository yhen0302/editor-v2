import { computed, ComputedRef } from 'vue'


export function mapComputed(obj:any, propsList: Array<string>):{[key in keyof typeof propsList]: ComputedRef} {
  const computedObj = {}
  propsList.forEach((keyStr) => {
    const keyList = keyStr.split('.')
    computedObj[keyStr.substr(keyStr.lastIndexOf('.')+1)] = computed({
      get() {
        let val = obj
        keyList.forEach(key=>val = val[key])
        console.log(val)
        return val
      },
      set(val) {
        let o = obj
        keyList.forEach((key,i)=>{
          if(i===keyList.length-1){
            o[key] = val
            return
          }
          o = o[key]
        })
      }
    })
  })
  return computedObj as {[key in keyof typeof propsList]: ComputedRef<any>}
}
