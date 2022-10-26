export declare global {
    declare const IS_EDITOR:boolean
  }

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
