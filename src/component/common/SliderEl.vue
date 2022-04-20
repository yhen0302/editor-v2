<template>
  <div class="slider-el flex items-center">
    <div class="slider-wrapper flex items-center">
      <div class="slider-process"></div>
      <div class="slider-icon relative"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderEl"
}
</script>

<style scoped>
.slider-el{
  height: 32px;
}
.slider-wrapper{
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: #31333D;
}
.slider-process{
  background: #6582FE;
  height: 100%;
}
.slider-icon{
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #fff;
}
.slider-icon::before{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  content: "";
  background: radial-gradient(#6582FE 0%,#6582FE 30%,transparent 100%);
  border-radius: 4px;
  transform: translate(-50%,-50%);
}
</style>