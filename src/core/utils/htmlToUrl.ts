export default function htmlToUrl(html:string){
  const blob = new Blob([html],{type:'text/html'})
  return URL.createObjectURL(blob)
}