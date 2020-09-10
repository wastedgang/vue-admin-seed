import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/public.css'
import { MyDialog, MyInput } from './components/index'
import { MessageBox, Pagination, Upload, Message ,Dialog ,Input, Button, Form, FormItem ,Dropdown, DropdownMenu, DropdownItem, Menu, Submenu, MenuItem, Table, TableColumn,} from 'element-ui';


Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.component(Upload.name, Upload)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Table.name, Table)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(MyDialog)
Vue.use(MyInput)
Vue.config.productionTip = false


//路由拦截
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next()
    }
    else if (JSON.stringify(store.state.userinfo.userinfo) == '{}') {
        next({
            path: '/login'
        })
    }
    else if (to.matched.some((record) => record)) {
        next()
    }
    else {
        next({
            path: '/login'
        })
    }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
