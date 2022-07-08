declare const Bol3D: any

export const outObjects = (container: any, publicPath: string) => {
  // 添加图标自定义元素
  const geometryPlane = new Bol3D.PlaneGeometry(1, 1)
  const materialPlane = new Bol3D.MeshBasicMaterial({ color: 0x16ddfa, side: Bol3D.DoubleSide, map: new Bol3D.TextureLoader().load(publicPath + 'textures/circularPin.png'), transparent: true })
  const lightPlane = new Bol3D.Mesh(geometryPlane, materialPlane)
  lightPlane.rotation.x = -Math.PI / 2
  lightPlane.renderOrder = 1000
  lightPlane.position.y = 0.03

  // 飞线部分自定义元素
  const geometry = new Bol3D.SphereGeometry(10, 32, 16)
  const material = new Bol3D.MeshBasicMaterial({ color: 0xffff00 })
  const curveSphere1 = new Bol3D.Mesh(geometry, material)
  const curveSphere2 = new Bol3D.Mesh(geometry, material)
  curveSphere1.visible = false
  curveSphere2.visible = false
  curveSphere1.name = 'flyLineSelfSphere1'
  curveSphere2.name = 'flyLineSelfSphere2'
  container.attach(curveSphere1)
  container.attach(curveSphere2)
  var curve = new Bol3D.CatmullRomCurve3([new Bol3D.Vector3(0, 0, 0), new Bol3D.Vector3(50, 100, 0), new Bol3D.Vector3(100, 0, 0)])
  curve.closed = false
  const ponits = curve.getPoints(100)
  var line = new Bol3D.Line(new Bol3D.BufferGeometry().setFromPoints(ponits), new Bol3D.LineBasicMaterial({ color: 0xffff00 }))
  line.visible = false
  container.attach(line)

  return { lightPlane, curveSphere1, curveSphere2, line }
}
