//@ts-nocheck
import {toPx} from "../../../../util/base";

export default {
  methods:{
    onMouseDown(ev:MouseEvent) {
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
  computed:{
    left(){return toPx(this.node.option.matrixOption.left)},
    width() {return  toPx(this.node.option.matrixOption.width)},
    height(){return toPx(this.node.option.matrixOption.height)},
    top(){return toPx(this.node.option.matrixOption.top)},
  }
}