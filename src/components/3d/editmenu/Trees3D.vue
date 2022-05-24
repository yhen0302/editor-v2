<template>
  <div class="trees-3d-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <PageTreeNode3d :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import PageTreeNode3d from '@/components/utils/editmenu/PageTreeNode3d.vue'
import { traverseResetSelectedOfNodes } from '@/core/3d/util'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Trees3D',
  components: {
    PageTreeNode3d
  },
  setup() {
    const store = useStore()
    const nodes = ref([])

    // 查看详情页
    EventsBus.on('pageEnter', (e: any) => {
      // console.log('trees3d', e.node.trees)

      nodes.value = e.node.trees.threeDimension
    })

    // 选中元素:单选
    EventsBus.on('treeSelected', (e: any) => {
      const flag = e.node.selected
      traverseResetSelectedOfNodes(nodes.value)
      e.node.selected = !flag
    })

    /*************** 3d event start ***************/
    // 相机改变
    EventsBus.on('cameraChanged', (e: any) => {
      const { position } = e

      nodes.value.forEach((n: any) => {
        if (n.type === 'PerspectiveCamera') {
          n.options.position = position
        }
      })
    })

    // 相机表单改变
    EventsBus.on('cameraInputChanged', (e: any) => {
      const { node } = e

      nodes.value.forEach((n: any) => {
        if (n.type === 'PerspectiveCamera') {
          console.log('node', node)

          node.forEach((c: any) => {
            if (c.name === 'position') {
              n.options.position = [c.settings[0].value, c.settings[1].value, c.settings[2].value]
            } else if (c.name === 'near') {
              n.options.near = c.settings[0].value
            } else if (c.name === 'far') {
              n.options.far = c.settings[0].value
            } else if (c.name === 'fov') {
              n.options.fov = c.settings[0].value
            } else if (c.name === 'distance') {
              n.options.minDistance = c.settings[0].value
              n.options.maxDistance = c.settings[1].value
            } else if (c.name === 'angle') {
              n.options.minPolarAngle = c.settings[0].value
              n.options.maxPolarAngle = c.settings[1].value
            }
          })
        }
      })
    })

    /*************** 3d event end ***************/

    return {
      store,
      nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.trees-3d-main {
  @apply w-full h-full overflow-scroll;
}
</style>
