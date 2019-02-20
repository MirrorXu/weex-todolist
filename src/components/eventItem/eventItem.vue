<template>
<div class="cell" @click="click(item)">
    <text class="cell-text">{{item.name}}</text>
    <div class="cell-r">
        <text v-if="!isFinish" class="cell-r-btn" @click="onFinish(item)">完成</text>
        <text class="cell-r-icon">&#xe8f1;</text>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import '@/style/color.scss';
.cell {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $white-snowy;
    height: 80px;
    padding-left: 20px;
    padding-right: 20px;
}
.cell-text {
    color: $black;
}

.cell-r {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.cell-r-icon {
    font-family: iconfont;
}
.cell-r-btn {
    border-width: 1px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    font-size: 18px;
}
</style>

<script>
export default {
    name: 'eventItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        isFinish: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onFinish(e) {
            this.$emit('onFinsh', e)
        },
        click(e) {
            this.$emit('onEventClick', e)
        }
    }
}
</script>
