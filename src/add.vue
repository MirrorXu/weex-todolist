<template>
<div class="wrapper">
    <navBar title="新建"> </navBar>
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
import mixin from '@/mixins/index'
import {getEntryUrl} from '@/utils'
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')

import navBar from '@/components/navBar/navBar'
export default {
    name: 'add',
    mixins:[mixin],
    components: {
        navBar
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
        }
    },
    beforeCreate() {
    },
    created() {
        modal.toast({
            message:'add page created'
        })
    }
}
</script>

<style scoped lang='scss'>
@import "@/style/color.scss";
.icon {
    font-family: iconfont;
    color: $themeColor;
}

.wrapper {
    background-color: rgb(248, 248, 248);
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
