<template>
  <div class="header">
    <aside class="title">
      <img src="~@/assets/images/header/editor_back_big_btn_dark.png" class="cursor-pointer" />
      <p class="text-16 text-gray-light">智慧景区管理模板</p>
    </aside>

    <section class="content">
      <div class="content-left">
        <div class="back-front-btn-box">
          <img src="~@/assets/images/header/editor_nav_revocation_btn_dark.png" class="cursor-pointer" />
          <img src="~@/assets/images/header/editor_nav_remake_btn_dark.png" class="cursor-pointer" />
        </div>
        <div class="select-box">{{ scaleRatio }}%</div>
      </div>
      <div class="content-center">{{ pageTitle }}</div>
      <div class="content-right" v-once>
        <tip-button :icon="require('@/assets/images/header/editor_preview_btn_dark.png')" name="1" tip-position="tb" @click="previewHandle">
          <template v-slot:tip>
            <p>预览</p>
            <p>Ctrl+P</p>
          </template>
        </tip-button>
        <tip-button :icon="require('@/assets/images/header/editor_save_btn_dark.png')" name="1" tip-position="tb">
          <template v-slot:tip>
            <p>保存</p>
            <p>Ctrl+S</p>
          </template>
        </tip-button>
        <tip-button :icon="require('@/assets/images/header/editor_download_btn_dark.png')" name="1" tip-position="middle" @click="exportJSON">
          <template v-slot:tip>
            <p>导出配置</p>
          </template>
        </tip-button>
        <tip-button :icon="require('@/assets/images/header/editor_import_btn_dark.png')" name="1" tip-position="middle" @click="importJSON">
          <template v-slot:tip>
            <p>导入配置</p>
            <input type="file" ref="uploadJSON" style="display: none" @change="loadJSON" />
          </template>
        </tip-button>

        <tip-button>
          <template #default>
            <p class="text-12">图层</p>
            <switch-el v-model:value="isShowLayerTree"></switch-el>
          </template>
        </tip-button>
        <tip-button>
          <template #default>
            <p class="text-12">场景</p>
            <switch-el v-model:value="isShowSceneTree"></switch-el>
          </template>
        </tip-button>
      </div>
    </section>

    <aside class="auto-save">
      <img class="save-icon cursor-pointer" src="~@/assets/images/header/editor_savetime_icn_dark.png" />
      <span class="text-gray-800 text-14">上次保存时间：<Timer formatter="hh:mm" /></span>
    </aside>

    <div class="trees-box flex">
      <SceneTree class="tree-wrap" v-show="isShowSceneTree" />
      <LayerTree class="tree-wrap" v-show="isShowLayerTree" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw, nextTick } from 'vue'
import Timer from '@/components/utils/common/Timer.vue'
import TipButton from '@/components/utils/TipButton.vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import createPreviewTemplate from '@/core/utils/createPreviewTemplate'
import htmlToUrl from '@/core/utils/htmlToUrl'
import { clone, formatterDate } from '@/share/util/base'
import { parseModelNode } from '@/core/3d/util'
import { EventsBus } from '@/core/EventsBus'
import { getAvailableSceneTreeNodes } from '@/core/features/hotKeyShare'
import { previewHandle } from '@/core/features/hotKey'
import { deleteTreeParentQuote } from '@/core/2d/util/tree'
import SwitchEl from '@/components/utils/common/SwitchEl.vue'
import SceneTree from '@/components/utils/editmenu/SceneTree.vue'
import LayerTree from '@/components/utils/editmenu/LayerTree.vue'
import { mapState, useState } from '@/store/helper'

function saveJSON(data: any, filename?: any) {
  if (!data) {
    alert('保存的数据为空')
    return
  }
  if (!filename) filename = 'bol3d.json'
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4)
  }
  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}

export default defineComponent({
  name: 'Header',
  components: {
    LayerTree,
    SceneTree,
    SwitchEl,
    Timer,
    TipButton
  },
  setup() {
    const uploadJSON: any = ref(null)

    const store = useStore()

    const stateGlobal = useState(store, 'global')

    const stateMapperGlobal = mapState(store, 'global', ['drawingBoard', 'template', 'sceneTreeNodes'])

    const stateMapper3D = mapState(store, '3d', ['threeDimensionContainer'])

    const scaleRatio = computed(() => {
      return (stateMapperGlobal.drawingBoard.value.scale * 100).toFixed()
    })

    //导出 bol3d.json
    const exportJSON = () => {
      // 导出
      const JSON_data = JSON.stringify(getAvailableSceneTreeNodes())
      // console.log('isNoe')

      saveJSON(JSON_data)
    }

    //导入 bol3d.json
    const importJSON = () => {
      uploadJSON.value.click()
    }
    const loadJSON = (e: any) => {
      // const fileList = e.target.files
      // if (fileList.length === 0) return
      // if (fileList.length > 1) {
      //   ElMessage({
      //     message: '一次仅能上传一个配置文件。',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // let validateFlag = true
      // const validateTypes = ['ktj']
      // for (const i in fileList) {
      //   const file = fileList[i]
      //   if (file instanceof File) {
      //     const nameArr = file.name.split('.')
      //     const type = nameArr[nameArr.length - 1]
      //     if (!validateTypes.includes(type.toLowerCase())) {
      //       validateFlag = false
      //       break
      //     }
      //   }
      // }
      // if (!validateFlag) {
      //   ElMessage({
      //     message: '请上传json配置文件。',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // EventsBus.emit('toolBarSelected', { node: {} })
      // store.state.dimensionType = null
      // store.state.selectBarToolType = ''
      // nextTick(() => {
      //   store.state.dimensionType = '3d'
      //   remove3Dnodes()
      //   fileList[0].text().then((res: any) => {
      //     // 接受
      //     store.state.exportContent = JSON.parse(res)
      //     store.state.exportType = !store.state.exportType
      //     // store.state.pageTreeNodes[0].children[0].trees.twoDimension = store.state.exportContent[0].children[0].trees.twoDimension
      //   })
      // })
    }

    function remove3Dnodes() {
      const container = toRaw(stateMapper3D.threeDimensionContainer.value)

      // 1.remove old node
      const removedStoreNodeUUIDs: any = []
      // 1).store:template
      for (let i = stateMapperGlobal.template.value.threeDimension.length; i--; i >= 0) {
        if (stateMapperGlobal.template.value.threeDimension[i].uuid !== -1) {
          removedStoreNodeUUIDs.push(stateMapperGlobal.template.value.threeDimension[i].uuid)
          stateMapperGlobal.template.value.threeDimension.splice(i, 1)
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
      // scene clear
      container.scene.children.forEach((item: any) => {
        container.scene.remove(item)
      })
      // pass clear
      stateMapperGlobal.template.value.threeDimension = []
      // 3.reset sceneTree/pageTree/editform
      EventsBus.emit('resetTemplate', {})
    }

    // tree
    const isShowLayerTree = ref(false)
    const isShowSceneTree = ref(false)

    const pageTitle = computed(() => {
      return stateGlobal.selectedPageTreeNode ? `场景${parseInt(stateGlobal.selectedPageTreeNode?.parent) + 1}-${stateGlobal.selectedPageTreeNode.name}` : ''
    })
    return {
      store,
      scaleRatio,
      exportJSON,
      importJSON,
      loadJSON,
      uploadJSON,
      previewHandle,
      isShowLayerTree,
      isShowSceneTree,
      pageTitle,
      stateGlobal
    }
  }
})
</script>

<style lang="postcss" scoped>
.header {
  height: 64px;
  @apply box-border w-full bg-gray-dark flex justify-between;
}

.title {
  width: 272px;
  padding-left: 16px;
  gap: 16px;
  @apply flex items-center h-full;
}
.content {
  padding: 0 10px;
  width: calc(100% - 272px - 272px);
  @apply box-border h-full flex items-center justify-between relative;
}
.content-left {
  @apply flex items-center;
}
.content-right {
  width: 242px;
  padding: 0 10px;
  @apply flex justify-between;
}
.back-front-btn-box {
  @apply flex items-center justify-between;
  width: 92px;
  padding: 0 10px;
  margin-right: 36px;
}
.select-box {
  @apply text-gray-light;
}
.auto-save {
  width: 272px;
  padding-right: 16px;
  @apply flex items-center h-full justify-end;
}
.save-icon {
  margin-right: 4px;
}

.trees-box {
  position: fixed;
  right: 280px;
  top: 72px;
  z-index: 50;
  gap: 0 10px;
}
.tree-wrap {
  width: 272px;
  background: #25262d;
}
.tree-wrap:nth-last-child(1) {
  left: 350px;
  top: 200px;
}
</style>
