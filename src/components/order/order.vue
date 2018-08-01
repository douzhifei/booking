<template>
  <div class="order">
    <div class="head">
      <div class="close" @click="goBack"></div>
      <div class="title">确认订单</div>
      <div class="clear" @click="clear()">清空</div>
    </div>
    <div class="form" v-if="form.timeStart">
      <div class="item">
        <div class="item-left">预定时间</div>
        <div class="item-right">{{form.timeStart}}
          <i class="icon-reach"></i>{{form.timeEnd}}</div>
      </div>
      <div class="item">
        <div class="item-left">预定方案</div>
        <div class="item-right item-project" @click="selectProject()">
          <strong>{{form.project}}</strong>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="item">
        <div class="item-left">预定人</div>
        <div class="item-right"><input v-model.trim="form.name"></div>
      </div>
      <div class="item">
        <div class="item-left">联系手机</div>
        <div class="item-right item-project"><input v-model.number="form.phone" type="number" class="item-phone">
          <div class="item-code" :class="{'code-disable':countdown>0}" @click="sendCode()">{{codeDesc}}
            <strong v-show="countdown">({{countdown}}s)</strong>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-left">验证码</div>
        <div class="item-right"><input v-model.number="form.code" type="number"></div>
      </div>
      <div class="item">
        <div class="item-left item-left-remark">备注</div>
        <div class="item-right item-right-remark">
          <input v-model="form.remark" class="remark" >
        </div>
      </div>
    </div>
    <div class="service">客服电话：12323123123</div>
    <div class="foot">
      <div class="button" :class="{ 'button-disable': verify }" @click="confirm()">确定</div>
    </div>
    <transition name="slide">
      <project v-if="showProject" :state="form.state" @setProject="setProject"></project>
    </transition>
  </div>
</template>
<script>
import Project from 'components/project/project'
export default {
  components: { Project },
  data () {
    return {
      form: {
        project: '',
        phone: ''
      },
      showProject: false,
      countdown: 0,
      codeDesc: '发送验证码'
    }
  },
  props: {
    time: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    verify () {
      if (!this.form.code || !this.form.phone || !this.form.name || !this.form.project) {
        return true
      }
    }
  },
  created () {
    this.form.timeStart = this.time[0].timeStart
    this.form.timeEnd = this.time[0].timeEnd
    this.form.state = this.time[0].state
  },
  methods: {
    goBack () {
      this.$emit('closeOrder', {})
    },
    clear () {
      this.form.project = ''
      this.form.phone = ''
      this.form.name = ''
      this.form.code = ''
      this.form.remark = ''
    },
    selectProject () {
      this.showProject = true
    },
    setProject (value) {
      this.showProject = false
      this.form.project = value
    },
    sendCode () {
      if (!this.form.phone.toString().match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)) {
        alert('手机号码错误')
        return
      }
      if (this.countdown !== 0) {
        return
      }
      this.countdown = 60
      this.codeDesc = '重新发送'
      let startCountdown = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(startCountdown)
        }
      }, 1000)
    },
    confirm () {
      if (!this.form.code || !this.form.phone || !this.form.name || !this.form.project) {

      }
      if (!this.form.name) {
        alert('请填写预订人姓名')
        return
      }
      if (!this.form.name) {
        alert('请填写手机号码')
        return
      }
      if (!this.form.project) {
        alert('请选择方案')
        return
      }
      if (!this.form.code) {
        alert('请填写手机验证码')
        return
      }
      // console.log(this.form)
      this.$emit('closeOrder', this.form)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.order
  width 100%
  font-size 16px
  position absolute
  top 0
  left 0
  bottom 0
  background-color $color-background
  .head
    width 100%
    height 40px
    font-size 20px
    .close
      position absolute
      width 24px
      height 24px
      top 10px
      left 20px
      background-size 24px 24px
      bg-image('close')
    .clear
      line-height 40px
      position absolute
      right 20px
    .title
      line-height 40px
      position absolute
      left 25%
      width 50%
      transform-origin 50% 50%
  .form
    width 100%
    .item
      width 100%
      height 50px
      border-bottom 1px solid $color-text-g
      display flex
      &:last-child
        border-bottom 0px
        height 100px
        padding-top 20px
      .item-left
        width 20%
        display flex
        align-items center
        justify-content flex-start
        color $color-text-g
        margin-left 6%
      .item-right
        display flex
        align-items center
        justify-content flex-start
        width 74%
        .icon-reach
          width 20px
          height 20px
          background-size 20px 20px
          bg-image('reach')
          margin 0 5px
        .arrow
          width 20px
          height 20px
          background-size 20px 20px
          bg-image('arrow')
          margin-right 15px
        .item-code
          margin-right 15px
        .code-disable
          color $color-text-g
        .item-phone
          width 160px
      .item-project
        justify-content space-between
      .item-left-remark
        align-items flex-start
      .item-right-remark
        align-items flex-start
        .remark
          width 250px
          height 80px
          border-color $color-background
  .service
    width 94%
    height 50px
    border-bottom 1px solid $color-text-g
    border-top 1px solid $color-text-g
    display flex
    align-items center
    padding-left 6%
    color $color-text-g
    position absolute
    bottom 90px
  .foot
    width 100%
    margin-top 10px
    display flex
    position absolute
    bottom 20px
    justify-content flex-end
    .button
      width 142px
      height 50px
      background-color $color-button
      margin-right 8px
      display flex
      align-items center
      justify-content center
      color $color-text-w
      font-size 22px
    .button-disable
      background-color $color-button-disable
.slide-enter-active, .slide-leave-active
  transition all 0.4s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
