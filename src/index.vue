<style scoped>
.icon {
    font-family: iconfont;
}

.wrapper {
    /* justify-content: center;
    align-items: center; */
    background-color: rgb(248, 248, 248);
}

.item {
    margin-top: 50px;
}

.item-title {
    font-weight: 800;
    padding-left: 20px;
    margin-bottom: 10px;
    color: rgb(143, 10, 92);
}

.item-cell {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 80px;
    padding-left: 20px;
    padding-right: 20px;
}

.cell-r {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.btn {
    border-width: 1px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    font-size: 18px;
}

.footer {
    flex-direction: row;
    justify-content: space-between;
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
    flex: 1;
    font-size: 22px;
    text-align: center;
    border-right-width: 1px;
    border-right-color: #f3f3f3;
}

.clear-btn {
    flex: 1;
    font-size: 22px;
    text-align: center;
}
</style>

<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
    <div class="body">
        <div class="item">
            <text class="item-title">待办事项</text>
            <div class="item-cell" v-for="(item , index ) in todoEvents" :key="index" @click="onEventClick(item)">
                <text class="label">{{item.name}}</text>
                <div class="cell-r">
                    <text class="btn" @click="onFinish(item , index)">完成</text>
                    <text class="icon">&#xe8f1;</text>
                </div>
            </div>
        </div>
        <div class="item">
            <text class="item-title">已办事项</text>
            <div class="item-cell" v-for="(item , index) in doneEvents" :key="index" @click="onEventClick(item)">
                <text class="label">{{item.name}}</text>
                <div class="cell-r">
                    <!-- <text class="btn">完成</text> -->
                    <text class="icon">&#xe8f1;</text>
                </div>
            </div>
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

const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
const navigator = weex.requireModule('navigator')
export default {
    name: 'App',
    components: {
        // HelloWorld,
        // add
    },
    data() {
        return {
            msg: 'hello weex',
            todoEvents: [],
            doneEvents: []
        }
    },
    methods: {
        onFinish(event, index) {
            this.todoEvents.splice(index, 1)
            this.doneEvents.push(event)
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
    beforeCreate() {
        const domModule = weex.requireModule('dom')
        domModule.addRule('fontFace', {
            'fontFamily': 'iconfont',
            'src': "url('http://at.alicdn.com/t/font_1035077_f7lm0j9xsqp.ttf')"
        })
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
