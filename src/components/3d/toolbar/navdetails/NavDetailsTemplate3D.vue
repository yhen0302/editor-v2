<template>
  <div class="nav-details-template-3d-main">
    <div class="content">
      <ToolBarItem v-for="item in detailsList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
    </div>

    <div class="upload">
      <div class="upload-btn" @click="uploadFiles">
        <p>上传模板</p>
      </div>
      <input type="file" ref="uploadFileInput" multiple style="display: none" @change="loadFiles" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { parseModelNode, reloadThreeDimensionPassesByTemplate } from '@/core/3d/util'
import { useMutation, useState } from '@/store/helper'

declare const Bol3D: any

export default defineComponent({
  name: 'NavDetailsTemplate3D',
  components: { ToolBarItem },
  setup() {
    const store = useStore()
    const state3D = useState(store, '3d')
    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['TEMPLATE_3D_RESET'])

    const uploadFileInput: any = ref(null)

    const detailsList: any = ref([
      // { icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'), name: '航天航空', type: 'hthk' }
    ])

    const chooseItem = () => {
      //
    }

    const uploadFiles = () => {
      uploadFileInput.value.click()
    }

    var max = new Bol3D.Vector3()
    var min = new Bol3D.Vector3()

    const loadFiles = (e: any) => {
      // console.log('e', e.target.files)

      const container = state3D.threeDimensionContainer
      const fileList = e.target.files

      // validate filesList
      let validateFlag = true
      const validateTypes = ['glb', 'gltf', 'fbx']
      for (const i in fileList) {
        const file = fileList[i]
        if (file instanceof File) {
          const nameArr = file.name.split('.')
          const type = nameArr[nameArr.length - 1]
          if (!validateTypes.includes(type.toLowerCase())) {
            validateFlag = false
            break
          }
        }
      }

      if (!validateFlag) return

      container.loadModels({
        fileList,
        onProgress: (model: any) => {
          //
        },
        onLoad: () => {
          // console.log('finish models', container)

          container.transformControl.detach()
          container.outlineObjects = []

          // 1.remove old node
          const removedStoreNodeUUIDs: any = []
          // 1).store:template
          for (let i = stateGlobal.template.threeDimension.length; i--; i >= 0) {
            if (stateGlobal.template.threeDimension[i].uuid !== -1) {
              removedStoreNodeUUIDs.push(stateGlobal.template.threeDimension[i].uuid)
              stateGlobal.template.threeDimension.splice(i, 1)
            }
          }
          // 2).container:sceneModel,children,clickObjects,mixers,mixerActions,sceneAnimations,lights,outlineObjects,passes
          // sceneModel
          for (let i = container.sceneModels.length; i--; i >= 0) {
            if (removedStoreNodeUUIDs.includes(container.sceneModels[i].uuid)) {
              container.sceneModels[i].traverse((c: any) => {
                container.scene.remove(c)

                const childMesh = c
                if (childMesh.material) {
                  if (childMesh.material.map) {
                    childMesh.material.map.dispose()
                    childMesh.material.map = null
                  }
                  childMesh.material.dispose()
                  childMesh.material = null
                }
                if (childMesh.geometry) {
                  childMesh.geometry.dispose()
                  childMesh.geometry = null
                }
                c = null
              })
              container.sceneModels.splice(i, 1)
            }
          }
          // children
          container.children.splice(0, container.children.length)
          // clickObjects
          container.clickObjects.splice(0, container.clickObjects.length)
          // mixers
          container.mixers.splice(0, container.mixers.length)
          // mixerActions
          container.mixerActions.splice(0, container.mixerActions.length)
          // sceneAnimations
          container.sceneAnimations = {}
          // lights:directionLights,pointLights,spotLights,rectAreaLights
          for (let i = container.directionLights.length; i--; i >= 0) {
            container.scene.remove(i)
            container.directionLights.splice(i, 1)
          }
          for (let i = container.pointLights.length; i--; i >= 0) {
            container.scene.remove(i)
            container.pointLights.splice(i, 1)
          }
          for (let i = container.spotLights.length; i--; i >= 0) {
            container.scene.remove(i)
            container.spotLights.splice(i, 1)
          }
          for (let i = container.rectAreaLights.length; i--; i >= 0) {
            container.scene.remove(i)
            container.rectAreaLights.splice(i, 1)
          }
          // outlineObjects
          container.outlineObjects.splice(0, container.outlineObjects.length)
          // passes
          reloadThreeDimensionPassesByTemplate()
          // 2.update store template
          // 1).store:template: modelNode, cameraNode
          container.sceneModels.forEach((model: any) => {
            const node: any = {}
            const index = 0
            // 3d模板 存入缓存
            parseModelNode(model, index, node)
            stateGlobal.template.threeDimension.push(node)
          })
          stateGlobal.template.threeDimension.forEach((c: any) => {
            if (c.type === 'Camera') {
              const camera = container.orbitControls.object
              c.options.position = [parseFloat(camera.position.x.toFixed(4)), parseFloat(camera.position.y.toFixed(4)), parseFloat(camera.position.z.toFixed(4))]
            }
          })
          // 2).container:children,clickObjects,  (mixers,mixerActions,sceneAnimations ---- todo animations)
          container.sceneModels.forEach((model: any) => {
            model.traverse((c: any) => {
              if (c.isMesh) {
                container.children.push(c)
                container.clickObjects.push(c)
              }
            })
          })
          // 3.reset sceneTree/pageTree/editform
          mutations3D.TEMPLATE_3D_RESET()
        }
      })
    }

    return {
      store,
      detailsList,
      chooseItem,
      uploadFileInput,
      uploadFiles,
      loadFiles
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-details-template-3d-main {
  @apply w-full h-full relative;
}
.content {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.content-item {
  background: #7aa6ff;
  border-radius: 2px;
}
.upload {
  bottom: 0;
  height: 64px;
  border-top: #464858 1px solid;
  @apply w-full absolute flex items-center justify-center;
}
.upload-btn {
  width: 240px;
  height: 32px;
  background: #464858;
  border-radius: 2px;
  @apply flex items-center justify-center cursor-pointer;
}
.upload-btn:hover {
  background: #7aa6ff;
}
.upload-btn p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
}
</style>
