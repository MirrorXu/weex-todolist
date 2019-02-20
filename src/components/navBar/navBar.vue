<style lang="scss" scoped>
@import "@/style/color.scss";
.navBar {
    padding-top: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 118px;
    padding-left: 10px;
    padding-right: 20px;
    background-color: $themeColor;
    border-bottom-width: 1px;
    border-bottom-color: #ebebeb;
}
.icon {
    font-family: iconfont;
    color:$white;
}
.title{
    color: $white;
}
</style>

<template>
<div class="navBar">
    <text v-if="leftShow" class="icon" @click="goBack">&#xe8ef;</text>
    <text v-else class="icon" ></text>
    <text class="title">{{title}}</text>
    <text v-if="rightShow" class="icon">&#xe8c4;</text>
    <text v-else class="icon"></text>
</div>
</template>

<script>
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')
export default {
    name: 'navBar',
    props: {
        icon: {},
        leftShow:{
            type:Boolean,
            default:true
        },
        rightShow:{
            type:Boolean,
            default:true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        goBack() {
            navigator.pop({
                animated: 'true'
            })
        }
    },
    created(){
    }
}
</script>
