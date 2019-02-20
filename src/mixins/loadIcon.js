const domModule = weex.requireModule('dom')
const modal = weex.requireModule('modal')
export default {
    created(){
        modal.toast({
            message:'mixin loadIcon created'
        })
    },
    beforeCreate() {
        domModule.addRule('fontFace', {
            'fontFamily': 'iconfont',
            'src': "url('http://at.alicdn.com/t/font_1035077_f7lm0j9xsqp.ttf')"
        })
    }
}