export function getMultiKeyFromObject(attrList: Array<any>, obj: object) {
  const res = {}
  attrList.forEach(key => res[key] = obj[key])
  return res
}

export function equal(o1: any, o2: any) {
  if (typeof o1 === 'object' && o1 !== null && typeof o2 === 'object' && o2 !== null) {
    for (const key in o1) {
      if (!equal(o1[key], o2[key])) return false
    }
  } else {
    return o1 === o2
  }
  return true
}