export class BaseChart {
  defaultMatrixOpt = {
    left: 0,
    top: 0,
    height: 100,
    width: 200,
    angle: 0
  }
  defaultOption = {
    dataType: 'table',
    apiMapping: [] as {
      target: 'x' | 'y'
      path: string
      [k: string]: string
    }[],
    apiUrl:''
  }
}
