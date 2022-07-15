import store from '@/store';
document.addEventListener('contextmenu',function(ev){
  store.state.contextmenu = true
})