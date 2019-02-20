<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
    <navBar title="详情"></navBar>
    <div class="body">
        <text  class="title-input">{{name}}</text>
        <text class="divider"></text>
        <text class="content-input">{{desc}}</text>
    </div>
    <div class="footer">
        <text class="del-btn icon">删除</text>
    </div>
</div>
</template>

<script>
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')
import navBar from '@/components/navBar/navBar'
export default {
    name: 'App',
    data() {
        return {
            name: '获取中...',
            desc: '获取中...'
        }
    },
    components:{
        navBar
    },
    methods: {
        getStrorageItem(key) {
            return new Promise((resolve, reject) => {
                storage.getItem(key, e => {
                    resolve(e)
                })
            })
        },
        viewappear() {
            this.getStrorageItem('currentEvent').then(res => {

                if (res.result == 'success' && res.data != 'undefined') {
                    let currentEvent = JSON.parse(res.data)
                    console.log('currentEvent:', currentEvent)

                    this.name = currentEvent.name || '未知的事件标题'
                    this.desc = currentEvent.desc || '未知的内容'
                } else {
                    modal.toast({
                        message: 'currentEvent 获取失败'
                    })
                }
            })
        },
        viewdisappear() {

        },
        goBack() {
            navigator.pop({
                animated: 'true'
            })
        }
    },
    created() {
        this.viewappear()
    }

}
</script>

<style scoped lang="scss">
@import '@/style/color.scss';
.icon {
    font-family: iconfont;
}

.wrapper {
    background-color: rgb(248, 248, 248);
}

.header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 88px;
    padding-left: 10px;
    padding-right: 20px;
    background-color: #ffffff;
    border-bottom-width: 1px;
    border-bottom-color: #ebebeb;
}

.body {
    margin-top: 50px;
    padding-left: 20px;
    padding-right: 20px;
}

.title-input {
    border-radius: 10px;
    margin-bottom: 15px;
    height: 70px;
    font-size: 25px;
    padding-left: 20px;
    padding-right: 20px;
}

.divider {
    height: 1px;
    background-color: #e6e6e6;
}

.content-input {
    height: 500px;
    margin-top: 20px;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;

}

.footer {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: $white;
    border-top-width: 1px;
    border-top-color: #eeeeee;
    position: absolute;
    width: 750px;
    height: 100px;
    bottom: 0;
}

.del-btn{
    color:$themeColor;
}
</style>
