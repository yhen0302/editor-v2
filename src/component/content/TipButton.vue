<template>
  <div class="tip-button relative" :class="{active:props.active}"
       :key="props.icon">
    <img class="select-icon" width="24" height="24" :src="props.icon">
      <div class="select-tip absolute text-12 pointer-events-none" :class="props.tipPosition" v-show="props.name">
        <slot name="tip" :tipName="name">
          {{ props.name }}
        </slot>
      </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TipButton",
  props: {
    active: {default: false, type: Boolean},
    icon: {default: "", type: String},
    name: {default: "", type: String},
    tipPosition: {default: "lr", type: String}
  },
  setup(props: any) {
    return {props}
  }
}
</script>

<style scoped>
.tip-button {
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 4px;
  transition: background-color .2s linear;
  z-index: 1;
}

.tip-button:hover {
  background: #323440;
}

.tip-button:hover > .select-tip.lr {
  opacity: .8;
  transform: translate(100%, -50%)
}

.tip-button:hover > .select-tip.tb {
  opacity: .8;
  transform: translate(0, calc(100% - 15px));
}

.tip-button.active {
  background-color: #6582FE;
}

.select-tip {
  top: 50%;
  right: -4px;
  background: #ECECEC;
  width: max-content;
  border-radius: 4px;
  padding: 8px 16px;
  opacity: 0;
  transition-property: transform, opacity;
  transition: .1s cubic-bezier(1,-0.00,1,-0.00);
  color: #1d1d1d;
}

.select-tip.lr {
  transform: translate(0px, -50%);
}
</style>