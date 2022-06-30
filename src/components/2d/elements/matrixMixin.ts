//@ts-nocheck
import {toPx} from "@/core/2d/util/base";

export default {
  methods:{
    onMouseDown(ev:MouseEvent) {
      if (this.node.select) return
      if (ev.shiftKey) {
        this.$emit('append')
        return
      }
      this.$emit('select')
    }
  },
  computed:{
    left(){return toPx(this.node.option.matrixOption.left)},
    width() {return  toPx(this.node.option.matrixOption.width)},
    height(){return toPx(this.node.option.matrixOption.height)},
    top(){return toPx(this.node.option.matrixOption.top)},
  }
}