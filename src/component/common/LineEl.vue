<template>
  <div class="line" v-once :style="{height:props.height,width:props.width,background:props.color}"></div>
</template>

<script>


export default {
  name: "lineEl",
  props: {
    color: {type: String, default: 'black'},
    height: {type: String, default: '1px'},
    width: {type: String, default: "100%"}
  },
  setup(props) {
    return {props}
  }
}
</script>

<style scoped>
</style>