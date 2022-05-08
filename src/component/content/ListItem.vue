
<template>
  <div class="list-item-box items-center flex">
    <div class="list-item-prefix">
      <img src="~@/assets/images/editor_postprocessing_btn_dark.png" class="">
    </div>

    <div class="list-item-content text-left flex-1">
      <h3 class="title-content text-gray-light text-14">{{title}}</h3>
      <p class="content text-12">{{content}}</p>
    </div>

    <slot name="suffix">
      <div class="list-item-suffix">
      </div>
    </slot>
  </div>

</template>

<script>
export default {
  name: "ListItem",
  props:{title:{default:"",type:String},content:{default:"",type:String},},
}
</script>

<style scoped>
.list-item-box{
  padding: 8px 16px 8px 8px;
  gap:8px;
  background: #31333D;
  border-radius: 4px;
}
.content{
  color: #757A87;
}
.list-item-content{
}
</style>