//@ts-nocheck
import { toPx } from '../../../../src/share/util/base'
import { nextTick } from 'vue'

export default {
  methods: {
    onMouseDown(ev: MouseEvent) {
      // @ts-ignore
      if (this.node.select) return
      if (ev.shiftKey) {
        // @ts-ignore
        this.$emit('append')
        return
      }
      // @ts-ignore
      this.$emit('select')
    }
  },
  computed: {

    left() {
      return toPx(this.node.option.matrixOption.left)
    },
    width() {
      return toPx(this.node.option.matrixOption.width)
    },
    height() {
      return toPx(this.node.option.matrixOption.height)
    },
    top() {
      return toPx(this.node.option.matrixOption.top)
    },
    rotate(){
      return `rotate(${this.node.option.matrixOption.rotate}deg)`
    }
  },
  watch:{
    'node.option.matrixOption':{
      handler(){
        nextTick().then(()=>{
          this.$updateRect()
        })
      },
      deep:true
    }
  }

}
