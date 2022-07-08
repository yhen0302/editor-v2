// @ts-ignore
import { html } from 'common-tags'
const baseURL = location.origin + '/demo/edit'
export default function createPreviewTemplate(code: string) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Title</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="${baseURL}/sdk/index.js"></script>
        <script src="${baseURL}/static/main.js"></script>
        <script>
          ${code}
        </script>
      </body>
    </html>
  `
}
