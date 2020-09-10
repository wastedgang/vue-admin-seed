<template>
    <div class="input-wrapper">
        <div class="input-up">
            <div class="input-icon"><i :class="icon"></i></div>
            <div class="input-form">
                <input 
                    @keyup="onEnterClick" 
                    @blur="onInputBlur" 
                    :placeholder="placeholder"
                    :type="type"
                    :value="inputValue"
                    :autofocus="autofocus"
                    @input="updateValue($event.target.value)"
                    />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        inputValue: {
            type: String
        },
        autofocus: {
            type: Boolean,
        }
    },
    methods: {
        onInputBlur(event) {
            this.$emit("blur", event);
        },
        onEnterClick(event) {
            this.$emit('keyup', event);
        },
        updateValue(value) {
           this.$emit('input', value)
      }
    }
}
</script>

<style scoped>
.input-wrapper { 
    color: #fff;
    width: 100%;
    /* background: #000; */
    box-sizing: border-box;
    padding: 20px 0;
    overflow: hidden;
}
.input-up {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.input-lable {
    position: absolute;
    left: 10%;
    bottom: 2px;
    font-size: 15px;
}
.label-active {
    left: 10%;
    position: absolute;
    color: rgb(196, 196, 196);
    bottom: 30px;
    font-size: 12px;
}
.input-icon {
    width: 10%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-form {
    width: 85%;
}
.input-form input{
    color: #fff;
    width: 100%;
    text-decoration: none;
    outline: none;
    background: transparent;
    padding: 5px 5px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #fff;
    transition: border .5s;
    -webkit-transition: border .5s;
}
.input-form input:focus {
    border-bottom: 1px solid rgb(43, 145, 255);
}

.input-tip {
    width: 85%;
    text-align: left;
    font-size: 12px;
    margin-top: 10px;
    color: red;
    margin-left: 10%;
    height: 12px;
}
.input-tip-enter-active {
  transition: all .3s ease;
}
.input-tipleave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>