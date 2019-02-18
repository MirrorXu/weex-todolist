<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
    <div class="header">
        <text class="icon" @click="goBack">&#xe8ef;</text>
        <text class="title">详情</text>
        <text class="icon">&#xe8c4;</text>
    </div>
    <div class="body">
        <text  class="title-input">{{name}}</text>
        <text class="divider"></text>
        <text class="content-input" placeholder="请输入内容">{{desc}}</text>
    </div>
    <div class="footer">
        <text class="add-btn icon">&#xe8e1;</text>
    </div>
</div>
</template>

<script>
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')
export default {
    name: 'App',
    data() {
        return {
            name: '获取中...',
            desc: '获取中...'
        }
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
    beforeCreate() {
        const domModule = weex.requireModule('dom')
        domModule.addRule('fontFace', {
            'fontFamily': 'iconfont',
            'src': "url('http://at.alicdn.com/t/font_1035077_f7lm0j9xsqp.ttf')"
        })
    },
    created() {
        this.viewappear()
    }

}
</script>

<style scoped>
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
    background-color: #fff;
    border-top-width: 1px;
    border-top-color: #eeeeee;
    position: absolute;
    width: 750px;
    height: 100px;
    bottom: 0;
}

.add-btn {
    color: rgb(12, 118, 145);
}
</style>
