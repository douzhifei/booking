<template>
  <div class="project">
    <div class="head">预订方案</div>
    <div class="item" @click="selectProject(project[0])">
      <div class="item-title">方案1</div>
      <div class="item-value">{{project[0]}}</div>
      <div class="item-icon">
        <i :class="{'icon-check' : selected === project[0]}"></i>
      </div>
    </div>
    <div class="item" @click="selectProject(project[1])">
      <div class="item-title">方案2</div>
      <div class="item-value">{{project[1]}}</div>
      <div class="item-icon">
        <i :class="{'icon-check' : selected === project[1]}"></i>
      </div>
    </div>
    <div class="item" @click="selectProject(project[2])">
      <div class="item-title">方案3</div>
      <div class="item-value">{{project[2]}}</div>
      <div class="item-icon">
        <i :class="{'icon-check' : selected === project[2]}"></i>
      </div>
    </div>
    <div class="item" @click="selectProject(project[3])">
      <div class="item-title">方案4</div>
      <div class="item-value">{{project[3]}}</div>
      <div class="item-icon">
        <i :class="{'icon-check' : selected === project[3]}"></i>
      </div>
    </div>
    <div class="service">客服电话：12323123123</div>
    <div class="foot">
      <div class="button" :class="{ 'button-disable': selected === '' }" @click="confirm()">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      project: ['整栋出租', '一层出租', '二层出租', '顶层出租'],
      selected: ''
    }
  },
  props: {
    state: {
      type: Number,
      default: 3
    }
  },
  methods: {
    selectProject (value) {
      this.selected = value
    },
    confirm () {
      if (this.selected === this.project[0] && this.state === 1) {
        this.selected = ''
        alert('有用户租用其他层')
        return
      }

      this.$emit('setProject', this.selected)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.project
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  overflow hidden
  background-color $color-background
  .head
    width 100%
    height 50px
    display flex
    align-items center
    justify-content center
  .item
    width 94%
    height 50px
    display flex
    align-items center
    padding-left 6%
    border-bottom 1px solid $color-text-g
    .item-title
      color $color-text-g
    .item-value
      margin-left 30px
    .item-icon
      position absolute
      width 40px
      height 50px
      right 20px
      display flex
      align-items center
      justify-content center
      .icon-check
        width 24px
        height 24px
        background-size 24px 24px
        bg-image('check')
</style>
