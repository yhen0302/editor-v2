import store from '../../store'
import { EventsBus } from '../EventsBus'

declare const Bol3D: any

export const addCanvas = (container: any, position: Array<number>, type: string) => {
  const canvas: any = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200
  const c: any = canvas.getContext('2d')
  // 矩形区域填充背景
  c.fillStyle = 'rgba(0,0,0,1)'
  c.fillRect(0, 0, 200, 200)
  c.beginPath()
  // 文字
  c.beginPath()
  c.fillStyle = '#ffffff' //文本填充颜色
  c.font = 'normal 30px SimSun' //字体样式设置
  c.textBaseline = 'top' //文本与fillText定义的纵坐标            top  hanging  middle  ideographic  bottom
  c.textAlign = 'left' //文本居中(以fillText定义的横坐标)        start  end  center  left   right
  c.fillText('新增文本', 0, 0)

  var texture = new Bol3D.CanvasTexture(canvas)
  var TextPlane: any
  if (type == 'RotateText') {
    var material = new Bol3D.SpriteMaterial({ map: texture })
    TextPlane = new Bol3D.Sprite(material)
    TextPlane.userData.selected = type
  } else {
    var geometry = new Bol3D.PlaneGeometry(1, 1)
    var material = new Bol3D.MeshPhongMaterial({
      map: texture,
      side: Bol3D.DoubleSide,
      transparent: true
    })
    TextPlane = new Bol3D.Mesh(geometry, material)
    TextPlane.userData.selected = type
  }
  TextPlane.position.set(position[0], position[1], position[2])
  TextPlane.scale.set(50, 50, 1)
  TextPlane.renderOrder = 500
  TextPlane.name = 'textSelf'
  container.clickObjects.push(TextPlane)
  // container.attach(TextPlane)
  ;(store as any).state.addElementType.mesh = TextPlane
  store.state.pageTreeNodes[0].children[0].trees.threeDimension.forEach((item: any) => {
    if (item.name == 'Text') {
      const obj = meshBasicMsg(TextPlane, item, type)
      item.children.push(obj)
    }
  })
  store.state.threeDimensionContainer.scene.children.forEach((item) => {
    if (item.name == 'Text') {
      item.add(TextPlane)
    }
  })
  setTimeout(() => {
    ;(store as any).state.addElementType.moving = !(store as any).state.addElementType.moving
  }, 100)
  const node = { type: 'text3D', selected: type, name: TextPlane.name }
  EventsBus.emit('toolBarSelected', { node })
}

export const upDateText3D = (obj: any, bool: boolean, type: any) => {
  const { text, color, fontFamily, fontSize, fontWeight, textScale, bgColor, bgOpcity, bgImage, textOffset, textAlign, lineAlign } = obj
  const { position, scale, opacity, rotation, center } = obj
  if (!bool) {
    const canvas: any = document.createElement('canvas')
    canvas.width = textScale[0]
    canvas.height = textScale[1]
    const c: any = canvas.getContext('2d')

    // 矩形区域填充背景
    c.fillStyle = bgColor == '' ? 'rgba(0,0,0,1)' : `rgba(${bgColor}, ${bgOpcity / 100})`
    c.fillRect(0, 0, textScale[0], textScale[1])
    c.beginPath()

    var textWidth = (c.measureText(text).width * fontSize) / 10
    var wOffset: any = 0,
      hOffset: any = 0
    textAlign == 'left' ? (wOffset = 0 + textOffset[0]) : textAlign == 'center' ? (wOffset = textScale[0] / 2 - textWidth / 2 + textOffset[0]) : (wOffset = textScale[0] - textWidth + textOffset[0])
    lineAlign == 'top' ? (hOffset = 0 + textOffset[1]) : lineAlign == 'center' ? (hOffset = textScale[1] / 2 - fontSize / 2 + textOffset[1]) : (hOffset = textScale[1] - fontSize + textOffset[1])

    if (bgImage) {
      const image = new Image()
      image.src = bgImage
      image.onload = function () {
        c.drawImage(this, 0, 0, textScale[0], textScale[1])

        // 文字
        c.beginPath()
        c.fillStyle = color //文本填充颜色
        c.font = `${fontWeight} ${fontSize}px ${fontFamily}` //字体样式设置
        c.textBaseline = 'top' //文本与fillText定义的纵坐标            top  hanging  middle  ideographic  bottom
        c.textAlign = 'left' //文本居中(以fillText定义的横坐标)        start  end  center  left   right
        c.fillText(text, wOffset, hOffset)

        var texture = new Bol3D.CanvasTexture(canvas)
        texture.needsUpdate = true
        ;(store as any).state.addElementType.mesh.material.map = texture
      }
    } else {
      // 文字
      c.beginPath()
      c.fillStyle = color //文本填充颜色
      c.font = `${fontWeight} ${fontSize}px ${fontFamily}` //字体样式设置
      c.textBaseline = 'top' //文本与fillText定义的纵坐标            top  hanging  middle  ideographic  bottom
      c.textAlign = 'left' //文本居中(以fillText定义的横坐标)        start  end  center  left   right
      c.fillText(text, wOffset, hOffset)

      var texture = new Bol3D.CanvasTexture(canvas)
      ;(store as any).state.addElementType.mesh.material.map = texture
    }
  }

  ;(store as any).state.addElementType.mesh.position.set(...position)
  ;(store as any).state.addElementType.mesh.scale.set(...scale, 1)
  ;(store as any).state.addElementType.mesh.material.opacity = opacity / 100
  if (type == 'RotateText') {
    ;(store as any).state.addElementType.mesh.center.set(center[0], center[1])
  } else {
    ;(store as any).state.addElementType.mesh.rotation.set((rotation[0] * Math.PI) / 180, (rotation[1] * Math.PI) / 180, (rotation[2] * Math.PI) / 180)
  }
  ;(store as any).state.addElementType.mesh.userData.editDate = obj
}

export const loadTextPlane = (container: any, parentObj: any, node: any) => {
  var {
    type,
    meshOpacity,
    meshPosition,
    meshScale,
    textBGColor,
    textBGImage,
    textBGOpacity,
    textColor,
    textFontFamily,
    textFontSize,
    textFontWeight,
    textLineAlign,
    textText,
    textTextAlign,
    textTextOffset,
    textTextScale
  } = node.options
  var meshRotation: any, meshCenter: any
  if (type == 'RotateText') {
    meshCenter = node.options.meshCenter
  } else {
    meshRotation = node.options.meshRotation
  }

  var obj = {
    text: textText,
    color: textColor,
    fontFamily: textFontFamily,
    fontSize: textFontSize,
    fontWeight: textFontWeight,
    textScale: textTextScale,
    bgColor: textBGColor,
    bgOpcity: textBGOpacity,
    bgImage: textBGImage,
    textOffset: textTextOffset,
    textAlign: textTextAlign,
    lineAlign: textLineAlign,
    position: meshPosition,
    scale: meshScale,
    opacity: meshOpacity,
    rotation: meshRotation,
    center: meshCenter
  }

  const addPlane = (texture: any) => {
    var TextPlane: any
    if (type == 'RotateText') {
      var material = new Bol3D.SpriteMaterial({ map: texture, side: Bol3D.DoubleSide, transparent: true, opacity: meshOpacity / 100 })
      TextPlane = new Bol3D.Sprite(material)
      TextPlane.center.set(meshCenter[0], meshCenter[1])
      TextPlane.userData.selected = type
    } else {
      var geometry = new Bol3D.PlaneGeometry(1, 1)
      var material = new Bol3D.MeshPhongMaterial({
        map: texture,
        side: Bol3D.DoubleSide,
        transparent: true,
        opacity: meshOpacity / 100
      })
      TextPlane = new Bol3D.Mesh(geometry, material)
      TextPlane.rotation.set(meshRotation[0], meshRotation[1], meshRotation[2])
      TextPlane.userData.selected = type
    }
    TextPlane.position.set(meshPosition[0], meshPosition[1], meshPosition[2])
    TextPlane.scale.set(meshScale[0], meshScale[1], 1)
    TextPlane.renderOrder = 500
    TextPlane.name = node.name
    TextPlane.visible = node.visible
    node.uuid = TextPlane.uuid
    parentObj.add(TextPlane)
    container.clickObjects.push(TextPlane)
    TextPlane.userData.editDate = obj
  }

  const canvas: any = document.createElement('canvas')
  canvas.width = textTextScale[0]
  canvas.height = textTextScale[1]
  const c: any = canvas.getContext('2d')

  // 矩形区域填充背景
  c.fillStyle = textBGColor == '' ? 'rgba(0,0,0,1)' : `rgba(${textBGColor}, ${textBGOpacity / 100})`
  c.fillRect(0, 0, textTextScale[0], textTextScale[1])
  c.beginPath()

  var textWidth = (c.measureText(textText).width * textFontSize) / 10
  var wOffset: any = 0,
    hOffset: any = 0
  textTextAlign == 'left'
    ? (wOffset = 0 + textTextOffset[0])
    : textTextAlign == 'center'
    ? (wOffset = textTextScale[0] / 2 - textWidth / 2 + textTextOffset[0])
    : (wOffset = textTextScale[0] - textWidth + textTextOffset[0])
  textLineAlign == 'top'
    ? (hOffset = 0 + textTextOffset[1])
    : textLineAlign == 'center'
    ? (hOffset = textTextScale[1] / 2 - textFontSize / 2 + textTextOffset[1])
    : (hOffset = textTextScale[1] - textFontSize + textTextOffset[1])

  if (textBGImage) {
    const image = new Image()
    image.src = textBGImage
    image.onload = function () {
      c.drawImage(this, 0, 0, textTextScale[0], textTextScale[1])

      // 文字
      c.beginPath()
      c.fillStyle = textColor //文本填充颜色
      c.font = `${textFontWeight} ${textFontSize}px ${textFontFamily}` //字体样式设置
      c.textBaseline = 'top' //文本与fillText定义的纵坐标            top  hanging  middle  ideographic  bottom
      c.textAlign = 'left' //文本居中(以fillText定义的横坐标)        start  end  center  left   right
      c.fillText(textText, wOffset, hOffset)

      var texture = new Bol3D.CanvasTexture(canvas)
      texture.needsUpdate = true
      addPlane(texture)
    }
  } else {
    // 文字
    c.beginPath()
    c.fillStyle = textColor //文本填充颜色
    c.font = `${textFontWeight} ${textFontSize}px ${textFontFamily}` //字体样式设置
    c.textBaseline = 'top' //文本与fillText定义的纵坐标            top  hanging  middle  ideographic  bottom
    c.textAlign = 'left' //文本居中(以fillText定义的横坐标)        start  end  center  left   right
    c.fillText(textText, wOffset, hOffset)

    var texture = new Bol3D.CanvasTexture(canvas)
    addPlane(texture)
  }
}

const meshBasicMsg = (mesh: any, item: any, type: any) => {
  var index = item.index
  const obj = {
    children: [],
    index: index + 1,
    name: mesh.name,
    options: {
      type: type,
      textColor: '',
      textFontFamily: '',
      textFontSize: '',
      textFontWeight: '',
      textText: '',
      textTextScale: [],
      textBGColor: '',
      textBGOpacity: '',
      textBGImage: '',
      textTextOffset: [],
      textTextAlign: '',
      textLineAlign: '',
      meshPosition: [],
      meshScale: [],
      meshOpacity: '',
      meshRotation: [],
      meshCenter: ''
    },
    addMeshType: 'Text',
    selected: false,
    show: true,
    spread: false,
    type: 'Mesh',
    uuid: mesh.uuid,
    visible: mesh.visible
  }
  return obj
}
