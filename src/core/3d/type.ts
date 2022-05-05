export type LoadSceneOpts = {
  modelUrls: Array<string>
  domElement: HTMLCanvasElement | null
  publicPath: string
  callback?: (container: any) => void
}
