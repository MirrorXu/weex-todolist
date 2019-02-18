<template>
<div class="wrapper">
    <div class="header">
        <text class="icon" @click="goBack">&#xe8ef;</text>
        <text class="title">新增事项</text>
        <text class="icon">&#xe8c4;</text>
    </div>
    <div class="body">
        <input type="text"  v-model="name" class="title-input" placeholder="请输入标题">
        <text class="divider"></text>
        <textarea v-model="desc" class="content-input" placeholder="请输入内容"></textarea>
    </div>
    <div class="footer">
        <text class="add-btn icon" @click="onFinish">完成</text>
    </div>
</div>
</template>

<script>
import {getEntryUrl} from '@/utils'
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')
export default {
    name: 'App',
    components: {

    },
    data() {
        return {
            name: '',
            desc: ''
        }
    },
    methods: {
        onFinish() {
            if (!this.name) {
                return modal.toast({
                    message: '至少有个名称吧'
                })
            }
            const me = this
            const currentData = {
                name: me.name,
                desc: me.desc
            }
            let todoEvents = undefined
            storage.getItem('todoEvents', e => {
                if (e.result === 'success') {
                    todoEvents = JSON.parse(e.data)
                } else {
                    todoEvents = []
                }
                todoEvents.push(currentData)

                storage.setItem('todoEvents', JSON.stringify(todoEvents), e => {
                    if (e.result === 'success') {
                        me.name = ''
                        me.desc = ''
                        modal.toast({
                            message: '记录成功'
                        })
                        navigator.pop({
                            animated: 'true'
                        })
                    }
                })
            })
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
    }
}
</script>

<style scoped>
.icon {
    font-family: iconfont;
    color: rgb(180, 130, 87);
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
