import {reactive} from "vue";

export interface RectProperty {
    left: number,
    top: number,
    width: number,
    height: number,

    [key: string]: any
}

export const rectProperties: RectProperty = reactive<RectProperty>({
    left: 0,
    top: 0,
    width: 100,
    height: 100
})