<template>
  <div class="tip-button relative" :class="{ active: props.active }" :key="props.icon">
    <slot>
      <img class="select-icon" :src="props.icon" />
    </slot>
    <div class="select-tip absolute text-12 pointer-events-none" :class="props.tipPosition" v-show="props.name">
      <slot name="tip" :tipName="name">
        {{ props.name }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipButton',
  props: {
    active: { default: false, type: Boolean },
    icon: { default: '', type: String },
    name: { default: '', type: String },
    tipPosition: { default: 'lr', type: String }
  },
  setup(props: any) {
    return { props }
  }
})
</script>

<style lang="postcss" scoped>
.tip-button {
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 4px;
  transition: background-color 0.2s linear;
  z-index: 1;
}

.tip-button img {
  width: 24px !important;
  height: 24px !important;
  max-width: 24px;
}

.tip-button:hover {
  background: #323440;
}

.tip-button:hover > .select-tip.lr {
  opacity: 0.8;
  transform: translate(100%, -50%);
}

.tip-button:hover > .select-tip.tb {
  opacity: 0.8;
  transform: translate(0, calc(100% - 15px));
}

.tip-button:hover > .select-tip.middle {
  opacity: 0.8;
  transform: translate(8px, calc(100% + 3px));
}

.tip-button.active {
  background-color: #6582fe;
}

.select-tip {
  top: 50%;
  right: -4px;
  background: #ececec;
  width: max-content;
  border-radius: 4px;
  padding: 8px 16px;
  opacity: 0;
  transition-property: transform, opacity;
  transition: 0.1s cubic-bezier(1, -0, 1, -0);
  color: #1d1d1d;
}

.select-tip.lr {
  transform: translate(0px, -50%);
}
</style>
