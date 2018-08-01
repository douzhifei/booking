<template>
  <div class="calendar">
    <ul class="week">
      <li class="day">一</li>
      <li class="day">二</li>
      <li class="day">三</li>
      <li class="day">四</li>
      <li class="day">五</li>
      <li class="day">六</li>
      <li class="day">日</li>
    </ul>
    <div class="container">
      <div class="months" ref="scroll">
        <div class="month">
          <div class="month-name">{{thisMonth.month+1}}月</div>
          <ul class="month-days">
            <li class="month-day" v-for="(item,index) in thisMonth.days" :key="index" :class="{past:item.date<new Date()}">
              <div class="day-bg" :class="{'day-bg1' : item.state == 0,'day-bg2' : item.state == 1,'day-bg3' : item.state == 5 }" @click="selectItem(item)">{{item.desc}}</div>
            </li>
          </ul>
        </div>
        <div class="month">
          <div class="month-name">{{nextMonth.month+1}}月</div>
          <ul class="month-days">
            <li class="month-day" v-for="(item,index) in nextMonth.days" :key="index" :class="{past:item.date<new Date()}">
              <div class="day-bg" :class="{'day-bg1' : item.state == 0,'day-bg2' : item.state == 1,'day-bg3' : item.state == 5 }" @click="selectItem(item)">{{item.desc}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="desc">
      <div class="desc-item">
        <i class="desc-icon day-bg1"></i>全天已订</div>
      <div class="desc-item">
        <i class="desc-icon day-bg2"></i>部分时段已订</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      thisMonth: {},
      nextMonth: {}
    }
  },
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    selected: {
      type: Array,
      default: () => { return [] }
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.scroll()
  },
  methods: {
    initData () {
      let today = new Date()
      let _year = today.getFullYear()
      let _month = today.getMonth()
      // let _day = today.getDate()
      this.thisMonth = this.getDays(today)
      this.nextMonth = this.getDays(new Date(_year, _month + 1, 1))
    },
    getDays (time) {
      let m = {}
      let now = new Date()
      m.year = time.getFullYear()
      m.month = time.getMonth()
      let firstDay = new Date(m.year, m.month, 1)
      let firstWeek = firstDay.getDay() !== 0 ? firstDay.getDay() : 7
      let lastDay = this.daysInMonths(m.month, m.year)
      m.days = new Array(firstWeek - 1).fill('')
      for (let i = 1; i < lastDay + 1; i++) {
        let item = {}
        item.date = new Date(m.year, m.month, i)
        if (item.date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) {
          item.desc = '今'
        } else {
          item.desc = i
        }
        if (item.date.setHours(0, 0, 0, 0) > now.setHours(0, 0, 0, 0)) {
          item.state = 4
          for (let k = 0; k < this.data.length; k++) {
            let d = new Date(this.data[k].time * 1000)
            if (item.date.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0)) {
              item.state = this.data[k].state
              break
            } else {
              item.state = 3
            }
          }
          for (let j = 0; j < this.selected.length; j++) {
            if (item.date.setHours(0, 0, 0, 0) === this.selected[j].day.setHours(0, 0, 0, 0)) {
              item.state = 5
              break
            }
          }
        } else {
          item.state = 4
        }
        m.days.push(item)
      }
      return m
    },
    daysInMonths (month, year) {
      return new Date(year, month + 1, 0).getDate()
    },
    scroll () {
      let today = new Date()
      let _year = today.getFullYear()
      let _month = today.getMonth()
      let _day = today.getDate()
      let mondays = this.daysInMonths(_year, _month)
      let scroll = Math.floor((this.thisMonth.days.length - mondays + _day) / 7) * 60 + 60
      this.$refs.scroll.scrollTop = scroll
    },
    selectItem (item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.calendar
  width 100%
  font-size 16px
  .week
    width 100%
    height 60px
    display flex
    border-bottom 1px solid $color-text-g
    color $color-text-g
    .day
      height 100%
      display flex
      flex 1
      align-items center
      justify-content center
  .container
    width 100%
    height 270px
    overflow hidden
    border-bottom 1px solid $color-text-g
    font-weight bold
    .months
      width 100%
      height 100%
      overflow hidden
      overflow-y scroll
      .month
        width 100%
        .month-name
          display flex
          width 100%
          height 60px
          align-items center
          padding-left 20px
        .month-days
          width 100%
          display flex
          flex-wrap wrap
          .past
            color $color-text-g
          .month-day
            display flex
            width 14.28%
            height 60px
            align-items center
            justify-content center
            .day-bg
              width 32px
              height 32px
              background-size 32px 32px
              align-items center
              justify-content center
              display flex
            .day-bg1
              bg-image('icon1')
            .day-bg2
              bg-image('icon2')
            .day-bg3
              bg-image('icon3')
  .desc
    width 100%
    height 40px
    display flex
    align-items center
    justify-content flex-end
    border-bottom 1px solid $color-text-g
    color $color-text-g
    .desc-item
      display flex
      align-items center
      justify-content center
      padding 0 10px
      .desc-icon
        width 18px
        height 18px
        background-size 18px 18px
        margin-right 5px
      .day-bg1
        bg-image('icon1')
      .day-bg2
        bg-image('icon2')
</style>
