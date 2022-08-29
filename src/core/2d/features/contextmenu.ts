import store from '@/store';
document.addEventListener('contextmenu',function(ev){
  store.state.contextmenu.show = true
  store.state.contextmenu.x = ev.pageX
  store.state.contextmenu.y = ev.pageY
})

document.addEventListener('click',function(){
  store.state.contextmenu.show = false
})