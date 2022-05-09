import {toRaw} from "vue"

export default {
  props: ["matrixOption"],
  methods: {
    getMatrixOption() {
      return toRaw(this.matrixOption)
    }
  }
}