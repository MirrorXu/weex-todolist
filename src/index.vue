<style lang="scss" scoped>
@import "@/style/color.scss";

.icon {
    font-family: iconfont;
}

.wrapper {
    background-color: rgb(248, 248, 248);
}

.item {
    margin-top: 50px;
}

.item-title {
    font-weight: 800;
    padding-left: 20px;
    margin-bottom: 10px;
    color: $themeColor;
}

.footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $white;
    border-top-width: 1px;
    border-top-color: #eeeeee;
    position: absolute;
    width: 750px;
    height: 100px;
    bottom: 0px;
}

.add-btn {
    flex: 1;
    font-size: 22px;
    text-align: center;
    border-right-width: 1px;
    border-right-color: #f3f3f3;
    color: $themeColor;
}

.clear-btn {
    flex: 1;
    font-size: 22px;
    text-align: center;
    color: $themeColor;
}
</style>

<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
    <navBar title="备忘录" :leftShow="false" :rightShow="false"></navBar>
    <div class="body">
        <div class="item">
            <text class="item-title">待办事项</text>
            <eventItem v-for="item in todoEvents" :key="item" :item="item" @onFinsh="onFinish"  @onEventClick="onEventClick" ></eventItem>
        </div>
        <div class="item">
            <text class="item-title">已办事项</text>
            <eventItem v-for="item in doneEvents" :key="item" :item="item" :isFinish="true" @onEventClick="onEventClick"></eventItem>
        </div>
    </div>
    <div class="footer">
        <text class="add-btn" @click="onAdd">添加</text>
        <text class="clear-btn" @click="onClear">清空</text>
    </div>
</div>
</template>

<script>
import {
    getEntryUrl
} from '@/utils/index.js'
console.log('getEntryUrl:', getEntryUrl)
// 自定义组件
import navBar from '@/components/navBar/navBar'
import eventItem from '@/components/eventItem/eventItem'
import mixin from '@/mixins/index'
const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
const navigator = weex.requireModule('navigator')
export default {
    name: 'App',
    mixins:[mixin],
    components: {
        navBar,
        eventItem
    },
    data() {
        return {
            msg: 'hello weex',
            todoEvents: [],
            doneEvents: []
        }
    },
    methods: {
        testNativeClick(e) {
            modal.toast({
                message: JSON.stringify(e)
            })
        },
        onFinish(e) {
            console.log('onFinish:', e)
            // this.todoEvents.splice(index, 1)
            this.todoEvents = this.todoEvents.filter(item => {
                if (item.name === e.name && item.desc === e.desc) {
                    return false
                } else {
                    return true
                }
            })
            this.doneEvents.push(e)
        },
        // page 事件
        async viewappear(e) {
            const me = this
            let ret1 = await this.getStrorageItem('todoEvents')
            if (ret1.result != 'success') {
                modal.toast({
                    message: '【待办事项：】' + JSON.stringify(ret1)
                })
                me.todoEvents = []
            } else {
                if (ret1.data === 'undefined') {
                    me.todoEvents = []
                } else {
                    me.todoEvents = JSON.parse(ret1.data)
                }
            }

            let ret2 = await this.getStrorageItem('doneEvents')
            console.log('ret2:', ret2);

            if (ret2.result != 'success') {
                modal.toast({
                    message: '【已办事项：】' + JSON.stringify(ret2)
                })
                me.doneEvents = []
            } else {
                if (ret2.data === 'undefined') {
                    me.doneEvents = []
                } else {
                    me.doneEvents = JSON.parse(ret2.data)
                }
            }

        },
        // page事件
        async viewdisappear(e) {
            console.log('viewdisappear')
            let ret1 = await this.setStrorageItem('todoEvents', this.todoEvents)
            if (ret1.result === 'success') {
                modal.toast({
                    message: 'todoEvents记录成功'
                })
            }

            let ret2 = await this.setStrorageItem('doneEvents', this.doneEvents)
            if (ret2.result === 'success') {
                modal.toast({
                    message: 'todoEvents记录成功'
                })
            }
        },
        getStrorageItem(key) {
            return new Promise((resolve, reject) => {
                storage.getItem(key, e => {
                    resolve(e)
                })
            })
        },
        setStrorageItem(key, value) {
            if (typeof value != 'string') {
                value = JSON.stringify(value)
            }
            return new Promise((resolve, reject) => {
                storage.setItem(key, value, e => {
                    resolve(e)
                })
            })
        },
        async onAdd() {
            if (weex.config.env.platform === 'Web') {
                await this.viewdisappear()
            }
            navigator.push({
                url: getEntryUrl('add'),
                animated: 'true'
            })
        },
        async onEventClick(event) {
            // console.log('event:', event)
            if (weex.config.env.platform === 'Web') {
                await this.viewdisappear()
            }
            this.setStrorageItem('currentEvent', event).then(res => {
                if (res.result === 'success') {
                    navigator.push({
                        url: getEntryUrl('details'),
                        animated: "true"
                    })
                } else {
                    modal.toast({
                        message: '存储失败'
                    })
                }
            })
        },
        onClear() {
            this.todoEvents = []
            this.doneEvents = []
        }
    },
    async created() {
        const me = this
        if (weex.config.env.platform === 'Web') {
            await me.viewappear()
        }
    },
    async beforeDestroy() {
        modal.toast({
            message: 'beforeDestroy'
        })
    }
}
</script>
