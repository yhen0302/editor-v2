<template>
  <div class="nav-details-test-3d-box">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
      <div class="escButton" v-if="visible" @click="escOut()">Esc退出飞线模式</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'
import { EventsBus } from '@/core/EventsBus'

const store = useStore()
let visible = ref(false)
const detailsList = ref({
  FlyLine: {
    name: '添加飞线',
    selected: false
  }
})

const mouseEnter = () => {
  document.querySelector('body').style.cursor = 'pointer'
}
const mouseLeave = () => {
  document.querySelector('body').style.cursor = 'default'
}

const escOut = () => {
  for (let key in detailsList.value) {
    detailsList.value[key].selected = false
  }
  visible.value = false

  if (store.state.addElementType.curveObj) {
    store.state.addElementType.curveObj.visible = false
  }
  if (store.state.addElementType.basePoint) {
    store.state.addElementType.basePoint.visible = false
  }
  if (store.state.addElementType.movePoint) {
    store.state.addElementType.movePoint.visible = false
  }

  store.state.addElementType = {
    mesh: store.state.addElementType.mesh,
    moving: false,
    basePoint: null,
    movePoint: null,
    curveObj: null,
    painting: false
  }
  document.onkeydown = null
  document.querySelector('body').style.cursor = 'default'
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseenter', mouseEnter)
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseleave', mouseLeave)
  let node = {}
  EventsBus.emit('toolBarSelected', { node })
}

onUnmounted(() => {
  EventsBus.emit('toolBarSelected', { node: {} })
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseenter', mouseEnter)
  document.getElementsByClassName('scene-3d')[0].removeEventListener('mouseleave', mouseLeave)
  document.onkeydown = null
  if (store.state.addElementType.curveObj) {
    store.state.addElementType.curveObj.visible = false
  }
  if (store.state.addElementType.basePoint) {
    store.state.addElementType.basePoint.visible = false
  }
  if (store.state.addElementType.movePoint) {
    store.state.addElementType.movePoint.visible = false
  }
  nextTick(() => {
    store.state.addElementType = null
  })
})

const selectItem = (options) => {
  if (!visible.value) {
    document.getElementsByClassName('scene-3d')[0].addEventListener('mouseenter', mouseEnter)
    document.getElementsByClassName('scene-3d')[0].addEventListener('mouseleave', mouseLeave)
    document.onkeydown = function (event) {
      if (event.keyCode == 27) {
        escOut()
      }
    }
  }

  const { key, target } = options
  let flag = target.selected
  for (const k in detailsList.value) {
    const detail = detailsList.value[k]
    detail.selected = false
  }
  target.selected = !flag
  visible.value = true

  store.state.addElementType = {
    type: 'flyLine',
    smallType: key,
    mesh: null,
    moving: false,
    basePoint: null,
    movePoint: null,
    curveObj: null,
    painting: false
  }
  // let node = { type: 'flyLine', selected: key, name: target.name }
  // EventsBus.emit('toolBarSelected', { node })
}
</script>

<style lang="postcss" scoped>
.nav-details-test-3d-box {
  @apply w-full h-full flex-row;
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
</style>
