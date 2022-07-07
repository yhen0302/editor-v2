// @ts-ignore
import {html} from 'common-tags'

export default function createPreviewTemplate(sdk:string,code:string){
  return html`
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <title>Title</title>
    </head>
    <body>
      <div id='app'></div>
      <script>
        ${sdk}
      </script>
      <script>
        ${code}
      </script>
    </body>
    </html>
  `
}