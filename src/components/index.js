import MyDialogComponent from './MyDialog.vue'
import MyInputComponent from './MyInput'

export const MyDialog = {
    install: function (Vue) {
        Vue.component('my-dialog', MyDialogComponent)
    }
}

export const MyInput = {
    install: function (Vue) {
        Vue.component('my-input', MyInputComponent)
    }
}