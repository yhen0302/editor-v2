<template>
  <div class='node-toggle-effect'>
    <ul class='scenes-list'>
      <li class='scenes-item' v-for='parent in trees' :key='parent.uuid'>
        <div class='scenes-info flex items-center' @click='toggleFoldNodeList(parent)'>
          <i class='arrow' :class='{ open: parent.open }'></i>
          <span class='scenes-name'>{{ parent.name }}</span>
        </div>
        <ul class='page-list' :class='{ open: parent.open }'>
          <li class='page-item flex justify-between' v-for='item in parent.children' @click='checkNode(parent, item)'
              :class='{ active: !!item.parameter,current:item.id===selectNode.id}' :key='item.id'>
            <span class='node-name'>{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <dialog-el v-model:visible='visible' :modal='true' :destroy-on-close='true'>
      <component :is='"ParameterEditor"+toUpperFirstLetter(curNodeParent?.id)'  :nodeId='curNode?.id' :echo='curNode?.parameter' @update='getParams'
                 :nodeTree='globalStore.selectedPageTreeNode.trees'></component>
    </dialog-el>
  </div>
</template>

<script lang='ts'>
import { computed, getCurrentInstance, isRef, reactive, Ref, ref, toRaw, watch } from 'vue'
import { useGetter, useState } from '@/store/helper'
import { useStore } from 'vuex'
import { clone, flatTree, toUpperFirstLetter } from '@/share/util/base'
import RadioEl from '../../../common/RadioEl.vue'
import NavTabItem from '@/components/2d/common/navTab/NavTabItem.vue'
import NavTab from '@/components/2d/common/navTab/NavTab.vue'
import ParameterEditor2d from '@/components/2d/event/effect/nodeToggleEffect/parameterEditor/ParameterEditor2d.vue'
import Dialog from '@/components/2d/common/Dialog.vue'

export default {
  name: 'NodeTransformEffect',
  props: ['modelValue'],
  components: { DialogEl: Dialog, ParameterEditor2d, NavTab, NavTabItem, RadioEl },
  setup(props, { emit }) {
    const checkedNodes = computed<any>({
      get() {
        return props.modelValue
      },
      set(nodeList) {
        emit('update:modelValue', nodeList)
      }
    })
    const store = useStore()
    const globalStore = useState(store, 'global')
    const getters2d = useGetter(store, '2d', ['GET_SELECT_NODE'])

    const getTree2D = () => {
      const tree2d = flatTree(toRaw(globalStore.selectedPageTreeNode!.trees.twoDimension))
      let clonedTree2d = clone(tree2d)
      // init Three 2d from global store
      clonedTree2d = clonedTree2d.map((item) => ({ id: item.id, name: item.name }))
      // merge modelValue
      if (checkedNodes.value['2d']) {
        for (const [index, initNode] of clonedTree2d.entries()) {
          for (const node of checkedNodes.value['2d'])
            if (initNode.id === node.id) clonedTree2d[index] = node
        }
      }
      return clonedTree2d
    }
    const trees = reactive([
      {
        name: '2d组件',
        id: '2d',
        open: false,
        children: getTree2D()
      }
    ])

    function toggleFoldNodeList(childTree) {
      childTree.open = !childTree.open
    }

    // 参数详情弹窗的显示和隐藏
    const visible = ref(false)
    const toggleDialog = (v: Ref | boolean = visible) => visible.value = isRef(v) ? !v.value : v
    // 指向最后执行选中操作的节点 ( 也是当前选中的节点 )
    const curNode = ref(null)
    const curNodeParent = ref(null)

    function checkNode(parent, node) {
      curNode.value = node
      curNodeParent.value = parent
      toggleDialog(true)
    }

    function getParams(params) {
      (curNode.value as any).parameter = params
      toggleDialog()
      updateNodes()
    }

    const updateNodes = (parent: Ref<any> = curNodeParent, node = curNode) => checkedNodes.value = { [parent.value.id]: parent.value.children.filter((item) => item.parameter) }

    return {
      globalStore,
      toggleFoldNodeList,
      checkedNodes,
      trees,
      checkNode,
      curNode,
      curNodeParent,
      toUpperFirstLetter,
      visible,
      selectNode: getters2d['GET_SELECT_NODE'],
      getParams
    }
  }
}
</script>

<style scoped>
.node-toggle-effect {
  font-size: 14px;
  color: #dadada;
  text-align: left;
  background: #292929;
  padding: 6px 4px;
  height: 400px;
  overflow-y: scroll;
}

.arrow {
  display: inline-block;
  box-sizing: border-box;
  height: 8px;
  width: 8px;
  border: 1px solid transparent;
  border-right: 1px solid #dadada;
  border-top: 1px solid #dadada;
  transform: rotate(45deg);
  transform-origin: 6px center;
  margin-right: 10px;
  transition: transform 0.2s linear;
}

.arrow.open {
  transform: rotate(135deg);
}

.scenes-info {
  padding: 6px 0 6px 0px;
}

.page-list {
  box-sizing: border-box;
  overflow: hidden;
  color: #9c9c9c;
  height: 0;
}

.page-list.open {
  height: auto;
}

.page-item {
  position: relative;
  padding: 6px 18px 6px 18px;
  font-size: 12px;
}

.page-item:hover {
  background: #4a4a4a;
}

.page-item.current:before {
  left: 8px;
  color: #d00000;
  position: absolute;
  content: "*";
}

.page-item.active {
  background: #5475ff;
  color: #dadada;
}


</style>
