<script lang="jsx">
export default {
  name: "TableEl",
  props:['data'],
  setup(props,context){

    console.log(context.slots.default())
    return ()=><section class="table-el">

    </section>
  }
}
</script>

<style scoped>

</style>