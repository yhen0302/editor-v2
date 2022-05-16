<!--
 // 1. 每个树节点增加父节点引用 parent

 // 2. 在拖拽的时候禁止元素的 point-event 来解决leave 事件穿透的问题

 // 4. 解决高度动画卡顿

 -->
<script>
import SvgIcon from '@/plugins/SvgIcon'
import TreeItem from '@/plugins/layerPlugin/TreeItem'
import TreeFolderItem from '@/plugins/layerPlugin/TreeFolderItem'
import { h } from 'vue'

export default {
  name: 'LayerList',
  components: { SvgIcon },
  props: { node: Array },
  setup(props, { slots }) {
    let parseTree = (treeRoot) => {
      let startTime = Date.now()

      let stack = [...treeRoot],
        node = null,
        arr = [],
        path = [treeRoot.length],
        parentNode = [treeRoot],
        depth = 1
      let i = 0

      while ((node = stack.shift())) {
        i++
        node.depth = depth
        // 数组
        if (node.children && node.open) {
          stack.unshift(...node.children)
          arr.push(node)
          // --path[path.length - 1]
          // 如果children的长度大于 0
          path[path.length - 1]--
          node.parent = parentNode[parentNode.length - 1]
          if (node.children.length) {
            path.push(node.children.length)
            parentNode.push(node)
            depth++
          }
        } else {
          arr.push(node)
          path[path.length - 1]--
          node.parent = parentNode[parentNode.length - 1]
          // 遍历到路径最后一个清空路径存储的长度
          while (path[path.length - 1] === 0) {
            path.pop()
            depth--
          }
          while (parentNode.length > path.length) {
            parentNode.pop()
          }
        }
      }
      creatJsxTree(arr)

      function creatJsxTree(arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
          let node = arr[i]
          // 如果是一个有子树的元素
          if (node.children) {
            // 子元素的长度
            let realPathLength = node.open ? node.children.length : 0
            let children = arr.splice(i + 1, realPathLength)
            //放入文件夹
            // if (!node.open) children = []
            arr[i] = TreeFolderItem(node, children, slots.folderPrefix || slots.prefix, slots.folderSuffix || slots.suffix)
          } else {
            arr[i] = TreeItem(node, slots.prefix, slots.suffix, slots.placeholder)
          }
        }
      }

      return <ul className="layer-list root">{...arr}</ul>
    }

    return () => <section id="layer-list-wrapper">{parseTree(props.node)}</section>
  }
}
</script>

<style scoped>
#layer-list-wrapper {
  width: 100%;
  font-size: 12px;
  background: transparent;
  --layer-item-prefix-width: 0px;
  --default-pl: calc(var(--layer-item-prefix-width) + 28px);
}

.layer-list,
.layer-child-list {
  padding: 0;
  margin: 0;
  list-style: none;
  will-change: max-height;
  transition: max-height 0.25s ease;
}

.layer-folder-item,
.layer-item {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: var(--default-pl);
  padding-right: 16px;
}

.layer-folder-item:hover,
.layer-item:hover {
  background: #323440;
}

.layer-folder-item {
  height: 30px;
  background: transparent;
}

.layer-item_list > .layer-folder-item {
  padding-left: calc((var(--level) - 2) * 24px + 16px);
}

.layer-child-list > .layer-item {
  padding-left: calc((var(--level) - 1) * 24px + var(--default-pl));
}

.root > .layer-item_list > .layer-folder-item,
.layer-item {
}

.layer-item {
  box-sizing: border-box;
  height: 32px;
  width: 100%;
  background-repeat: no-repeat;
}
.layer-item.select,.layer-folder-item.select{
  background: #6582FE;
}
.layer-item_list {
  overflow: hidden;
}

.layer-item-prefix {
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  height: 100%;
  /*width: var(--layer-item-prefix-width);*/
  flex-shrink: 0;
}

.item-name-wrapper {
  display: flex;
  align-items: center;
  text-align: left;
  flex: 1;
}

.item-name {
  box-sizing: border-box;
  display: inline-block;
  min-width: 100px;
  max-width: calc(100% - 40px);
  border: none;
  outline: none;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  cursor: text;
}

.item-name:focus {
  cursor: text;
  border: 1px solid black;
  border-radius: 4px;
}

.item-name:disabled {
  background: transparent;
}

/* icon */
.layer-item-prefix-icon {
  font-size: 18px;
}

.placeholder-box {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left top/10px 5px repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 5px/10px 5px repeat-x, linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left 10px/10px 5px repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 15px/10px 5px repeat-x, linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left 20px/10px 5px repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 25px/10px 5px repeat-x;
}

.arrow-icon.active {
  transform: rotate(90deg);
}

.arrow-icon {
  margin-right: 4px;
  transition: 0.2s transform ease;
}

/* suffix */
.layer-item-suffix {
  justify-self: flex-end;
}
</style>
