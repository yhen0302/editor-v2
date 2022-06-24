<template>
  <div class="content ambientLight">
    <div v-for="item in props.value" :key="item">
      <div v-if="item.fold" class="titleFold">
        <FoldEl :title="item.name" :show="true" class="titleFont">
          <template #default>
            <div v-for="dev in item.content" :key="dev" class="content-item">
              <div class="setting-item">
                <BaseTitle :value="dev.name" :height="56" :width="72" :marginRight="8" />
              </div>
              <div class="right-setting">
                <div v-for="setting in dev.content" :key="setting" class="setting">
                  <StyleChoice :value="setting"></StyleChoice>
                </div>
              </div>
              <LineEl class="division" :color="'#363741'" />
            </div>
          </template>
        </FoldEl>
      </div>

      <div v-else class="content-item">
        <div class="setting-item">
          <BaseTitle :value="item.name" :height="56" :width="72" :marginRight="8" />
        </div>
        <div class="right-setting">
          <div v-for="setting in item.content" :key="setting" class="setting">
            <div class="setting-title" v-if="setting.type == 'title'"></div>
            <div v-else>
              <StyleChoice :value="setting"></StyleChoice>
            </div>
          </div>
        </div>

        <LineEl class="division" :color="'#363741'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import FoldEl from '@/components/common/FoldEl.vue'
import LineEl from '@/components/utils/common/LineEl.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import StyleChoice from './StyleChoice.vue'

const props = defineProps({
  value: Object
})
</script>

<style lang="postcss" scoped>
.content {
  height: calc(100% - 64px - 1px - 48px - 1px);
  @apply w-full overflow-scroll;
}
.content-title {
  height: @apply w-full flex;
}
.content-item {
  flex-wrap: nowrap;
  @apply w-full h-auto flex items-start relative;
}
.setting-item {
  @apply flex flex-col h-auto;
}
.setting:last-child {
  margin-bottom: 12px;
}
.division {
  bottom: 0;
  @apply absolute;
}
.right-setting {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.titleFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  white-space: nowrap;
  text-align: left;
}
.titleFold {
  width: 100%;
}
</style>
