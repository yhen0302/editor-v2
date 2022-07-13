<template>
  <span>{{ time }}</span>
</template>

<script setup lang="ts">
import {Ref, ref} from '@vue/reactivity'
import {formatterDate} from '@/share/util/base.ts'
import {defineProps} from "vue"

let props = defineProps(["formatter"])
const timeFormatterTemp = 'hh:mm'
const time: Ref<string> = ref<string>(formatterDate(props.formatter) as string)

setInterval(() => (time.value = formatterDate(timeFormatterTemp)), 1000)
</script>

<style>
</style>