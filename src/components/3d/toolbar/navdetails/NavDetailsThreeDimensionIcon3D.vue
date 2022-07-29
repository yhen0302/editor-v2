<template>
  <div class="nav-details-ThreeDimensionIcon-3d-main">
    <ToolBarItem
      :class="{ hightButton: isVisited == item.name }"
      class="hightOutLine"
      v-for="item in dataList"
      :key="item.type"
      :icon="item.icon"
      :name="item.name"
      @click="choosePicture(item)"
    />
    <div class="escButton" v-if="visible" @click="escOut">Esc退出图标模式</div>
    <div class="escButton1" v-if="visible" @click="changeInModel">{{ addModeText }}</div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

const store = useStore()
const isVisited = ref('')
const visible = ref(false)
const addModeType = ref(true)
const addModeText = ref('添加至当前页')
const intervalPlane = setInterval(() => {
  store.state.addElementType &&
    store.state.addElementType.lightMesh &&
    store.state.addElementType.lightMesh.rotateOnAxis(
      store.state.addElementType.lightMesh.position.clone().set(0, 0, 1),
      -0.03
    )
}, 10)

const changeInModel = () => {
  if (addModeType.value) {
    addModeText.value = '添加至全局'
  } else {
    addModeText.value = '添加至当前页'
  }
  addModeType.value = !addModeType.value

  if (store.state.addElementType) {
    store.state.addElementType.modelType = addModeType.value
  }
}

const dataList = ref([
  {
    icon: require('@/assets/images/threeDimensionIcon/Camera.png'),
    name: '摄像头',
    type: 'threeCamera'
  },
  {
    icon: require('@/assets/images/threeDimensionIcon/IsolatingSwitch.png'),
    name: '火警',
    type: 'threeIsolatingSwitch'
  },
  {
    icon: require('@/assets/images/threeDimensionIcon/LightningRod.png'),
    name: '消防',
    type: 'threeLightningRod'
  },
  {
    icon: require('@/assets/images/threeDimensionIcon/WindowPos.png'),
    name: '风扇',
    type: 'threeWindowPos'
  },
  {
    icon: require('@/assets/images/zhihuiwuliu/top.png'),
    name: '分拣区',
    type: 'fenlianqu'
  },
  {
    icon: require('@/assets/images/zhihuiwuliu/position.svg'),
    name: '定位器',
    type: 'dingweiqi'
  }
])

const mouseEnter = () => {
  document.querySelector('body').style.cursor = 'pointer'
}
const mouseLeave = () => {
  document.querySelector('body').style.cursor = 'default'
}
const escOut = () => {
  isVisited.value = ''
  visible.value = false
  store.state.addElementType = {
    mesh: store.state.addElementType.mesh,
    moving: store.state.addElementType.moving,
    lightMesh: store.state.addElementType.lightMesh
  }
  document.onkeydown = null
  document.querySelector('body').style.cursor = 'default'
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseenter', mouseEnter)
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseleave', mouseLeave)
}

onUnmounted(() => {
  if (store.state.addElementType && store.state.addElementType.lightMesh) {
    store.state.addElementType.lightMesh.visible = false
  }
  EventsBus.emit('toolBarSelected', { node: {} })
  clearInterval(intervalPlane)
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseenter', mouseEnter)
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseleave', mouseLeave)
  document.onkeydown = null
  nextTick(() => {
    store.state.addElementType = null
  })
})

const choosePicture = (item) => {
  if (!visible.value) {
    document.getElementsByClassName('scene-3d')[0].addEventListener('mouseenter', mouseEnter)
    document.getElementsByClassName('scene-3d')[0].addEventListener('mouseleave', mouseLeave)
    document.onkeydown = function (event) {
      if (event.keyCode == 27) {
        escOut()
      }
    }
  }
  isVisited.value = item.name
  visible.value = true
  store.state.addElementType = {
    type: 'icon',
    icon: item.icon,
    name: item.name,
    smallType: item.type,
    mesh: null,
    moving: false,
    lightMesh: null,
    modelType: addModeType.value
  }
  const node = { type: 'icon3D', selected: item.type, name: item.name }
  EventsBus.emit('toolBarSelected', { node })
}
</script>

<style lang="postcss" scoped>
.nav-details-ThreeDimensionIcon-3d-main {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}

.hightButton {
  outline: 2px #6582fe solid;
}
.hightOutLine:hover {
  outline: 2px #fff solid !important;
}

.escButton {
  position: absolute;
  width: auto;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  top: 10px;
  left: 290px;
  border-radius: 2px;
  background: #5475ff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
}

.escButton1 {
  position: absolute;
  width: 90px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  top: 10px;
  left: 410px;
  border-radius: 2px;
  background: #5475ff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
