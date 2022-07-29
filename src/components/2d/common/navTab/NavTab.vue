<script lang="tsx">
import LineEl from "../LineEl.vue";
import {Ref, ref} from "@vue/reactivity";
import {computed, getCurrentInstance, onBeforeUpdate, onUpdated, SetupContext, watch} from "vue";

export default {
  name: "NavTab",
  props: {
    index: {type: Number, default: 0},
    title:{type:String,default:''}
  },
  emits: ["update:index"],
  components: {LineEl},
  setup(props: any, context: SetupContext) {
    const backImg = require("@/assets/images/editor_card_backarrow_btn_dark.png")

    const navIndex: Ref<number> = ref<number>(props.index)
    const getCurrentTabCard = computed(() => {
      let defaultSlotsRes = context.slots.default?.()
      if (defaultSlotsRes?.[navIndex.value]) {
        return defaultSlotsRes?.[navIndex.value]
      } else {
        return (defaultSlotsRes?.[0]?.children as [])?.[navIndex.value - Number(defaultSlotsRes?.length) + 1]
      }
    })
    watch(() => props.index, newVal => navIndex.value = newVal)
    return () => (<div class="nav-tab">
      {context.slots.header?.(navIndex)||<nav class="select-detail-header box-border flex items-center p-16 justify-between">
        <div class="back-icon-wrap" style="width:16px;">
          {
            navIndex.value === 0 ? '' :
                (<img src={backImg} class="back-icon cursor-pointer" onClick={() => {
                  navIndex.value--;
                  context.emit('update:index', navIndex.value)
                }}/>)
          }
        </div>
        <div class="header-title-wrap text-gray-light flex-grow">
          <p class="header-title">{props.title}</p>
        </div>
        <div class="nav-right" style="width: 16px"></div>
      </nav>}
      <line-el color="#363741"></line-el>
      {getCurrentTabCard.value || ""}
    </div>)
  }
}
</script>

<style scoped>
.select-detail-header {
  height: 64px;
}
</style>