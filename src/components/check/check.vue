<template>
  <div class="check">
    <div class="head">
      <div class="close" @click="goBack"></div>
      <div class="title">确认订单</div>
    </div>
    <div class="form" v-if="form.timeStart">
      <div class="item">
        <div class="item-left">预定时间</div>
        <div class="item-right">{{form.timeStart}}
          <i class="icon-reach"></i>{{form.timeEnd}}</div>
      </div>
      <div class="item">
        <div class="item-left">预定方案</div>
        <div class="item-right item-project">
          <strong>{{form.project}}</strong>
        </div>
      </div>
      <div class="item">
        <div class="item-left">预定人</div>
        <div class="item-right">{{form.name}}</div>
      </div>
      <div class="item">
        <div class="item-left">联系手机</div>
        <div class="item-right item-project">{{form.phone}}</div>
      </div>
      <div class="item">
        <div class="item-left item-left-remark">备注</div>
        <div class="item-right item-right-remark">
          {{form.remark}}
        </div>
      </div>
    </div>
    <div class="service">客服电话：12323123123</div>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    goBack () {
      this.$emit('closeCheck')
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.check
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
    bottom 40px
.slide-enter-active, .slide-leave-active
  transition all 0.4s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
