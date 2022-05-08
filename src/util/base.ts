import * as echarts from 'echarts'
import {ECBasicOption} from 'echarts/types/dist/shared'

const fillZero = (num = '', length = 0) => {
    const numStr: string = num.toString()
    return numStr.length < length ? '0'.repeat(length - numStr.length) + numStr : numStr
}

export function formatterDate(formatter = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
    const formatterObj = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    let res = formatter

    Object.keys(formatterObj).forEach((regKey) => {
        res = res.replace(new RegExp(regKey), (...args) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return fillZero(formatterObj[regKey].toString().substr(0, args[0].length), args[0].length)
        })
    })

    return res
}

export function getCss(el: HTMLElement | null, css: keyof CSSStyleDeclaration): CSSStyleDeclaration[keyof CSSStyleDeclaration] {
    return el && window.getComputedStyle(el)[css]
}

export function cssUnitToNumber(target: string) {
    const cssUnitRE = /^\d+(\.\d+)?(px|rem|em|vh|vw|%|cm|mm)$/
    return cssUnitRE.test(target) ? parseInt(target) : 0
}

// 将某个类型转换为url
export function dataToUrl(data: BlobPart[], mimeType: string) {
    const blob = new Blob(data, {type: mimeType})
    return URL.createObjectURL(blob)
}

export function getChartUrl<Opt extends ECBasicOption>(option: Opt) {
    const div = document.createElement('div')
    div.style.width = '240px'
    div.style.height = '160px'

    const chart = echarts.init(div)
    chart.setOption({animation: false, grid: {left: 30, top: 15, right: 10, bottom: 30}})
    chart.setOption(option)

    return chart.getConnectedDataURL({type: 'png'})
}

// 防抖

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(fn: Function, delay: number) {
    let timer: number

    return function (...args: any) {
        if (timer) clearTimeout(timer)
        timer = <number><unknown>setTimeout(function () {
            fn.call(null, args)
        }, delay)

    }

}
