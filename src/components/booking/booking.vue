<template>
  <div class="booking">
    <div class="head">
      <div class="close" @click="goBack()"></div>
      <div class="clear" @click="clear()" v-if="!order.name">清空</div>
    </div>
    <div class="set">
      <div class="set-start" :class="{active : timeStart == '请设置'}">
        <div class="set-name">开始时间</div>
        <div class="set-time">{{timeStart}}</div>
      </div>
      <div class="set-icon"></div>
      <div class="set-end">
        <div class="set-name">结束时间</div>
        <div class="set-time">{{timeEnd}}</div>
      </div>
    </div>
    <div class="calendar">
      <Calendar :data="bookingData" :selected="yourBooking" @selectItem="selectItem" v-if="bookingData.length !=0 && reLoad" ref="calendar"></Calendar>
      <div class="loading" v-if="!reLoad"></div>
    </div>
    <div class="foot">
      <div class="desc">4小时起租</div>
      <div class="button" :class="{ 'button-disable': yourBooking.length === 0 || order.name }" @click="confirm()">确定</div>
    </div>

    <transition name="fade">
      <div class="mask" v-if="openHourBlock" @click="closeHour()"></div>
    </transition>

    <transition name="slide-fade">
      <select-hour class="hour" v-if="openHourBlock" @closeHour="closeHour" @showTime="showTime"></select-hour>
    </transition>

    <transition name="slide">
      <order v-if="showOrder" @closeOrder="closeOrder" :time="yourBooking"></order>
    </transition>

    <transition name="slide">
      <check v-if="showCheck" @closeCheck="closeCheck" :form="order"></check>
    </transition>

  </div>
</template>
<script>
import SelectHour from 'components/selectHour/selectHour'
import Calendar from 'components/calendar/calendar'
import Order from 'components/order/order'
import Check from 'components/check/check'
import axios from 'axios'
export default {
  components: { SelectHour, Calendar, Order, Check },
  data () {
    return {
      bookingData: [],
      yourBooking: [],
      timeStart: '请设置',
      timeEnd: '请设置',
      openHourBlock: false,
      selectDay: {},
      reLoad: true,
      showOrder: false,
      showCheck: false,
      order: {}
    }
  },
  created () {
    this.getBookingData()
  },
  methods: {
    getBookingData () {
      axios.get('/booking').then((res) => {
        // 根据后台返回数据修改
        this.bookingData = res.data.days
        // this.yourBooking = res.data.yourBooking
      })
    },
    selectItem (item) {
      if (item.state === 0 || item.state === 4) {
        return
      }
      if (item.state === 5 && this.order.name) {
        this.showCheck = true
        return
      }
      if (this.order.name) {
        return
      }
      this.selectDay = item
      this.openHourBlock = true
    },
    goBack () {
      this.$router.go(-1)
    },
    clear () {
      this.yourBooking = []
      this.reLoad = false
      setTimeout(() => {
        this.reLoad = true
      }, 10)
    },
    setTime () {
      this.openHourBlock = true
    },
    closeHour () {
      this.openHourBlock = false
    },
    showTime (hour) {
      this.yourBooking = []
      let day = this.selectDay.date
      this.timeStart = day.getMonth() + 1 + '月' + day.getDay() + '日' + ' ' + hour.start + ':00'
      this.timeEnd = day.getMonth() + 1 + '月' + day.getDay() + '日' + ' ' + hour.end + ':00'
      let selected = {}
      selected.day = day
      selected.hour = hour
      selected.timeStart = this.timeStart
      selected.timeEnd = this.timeEnd
      selected.state = this.selectDay.state
      this.yourBooking.push(selected)
      this.reLoad = false
      setTimeout(() => {
        this.reLoad = true
      }, 10)
    },
    confirm () {
      if (this.yourBooking.length < 1 || this.order.name) {
        return
      }
      this.showOrder = true
    },
    closeOrder (value) {
      this.showOrder = false
      this.order = value
    },
    closeCheck () {
      this.showCheck = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.booking
  width 100%
  font-size 16px
  .head
    width 100%
    height 40px
    .close
      position absolute
      width 24px
      height 24px
      top 10px
      left 20px
      background-size 24px 24px
      bg-image('close')
    .clear
      font-size 20px
      line-height 40px
      position absolute
      right 20px
  .set
    width 88%
    height 90px
    margin-left 6%
    display flex
    align-items center
    justify-content space-between
    .set-icon
      width 24px
      height 24px
      background-size 24px 24px
      align-items center
      justify-content center
      display flex
      bg-image('reach')
    .set-start, .set-end
      display flex
      align-items flex-start
      justify-content center
      flex-direction column
      height 100%
      .set-name
        font-size 20px
      .set-time
        margin-top 15px
  .foot
    width 100%
    margin-top 10px
    display flex
    justify-content space-between
    .desc
      margin 10px 0 0 25px
      color $color-text-g
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
.loading
  width 100%
  height 373px
.active
  color $color-active
.hour
  position fixed
  bottom 0
  z-index 999
.mask
  position absolute
  top 0
  bottom 0
  left 0
  width 100%
  background-color rgba(0, 0, 0, 0.7)
.fade-enter-active, .fade-leave-active
  transition opacity 0.4s
.fade-enter, .fade-leave-to
  opacity 0
.slide-fade-enter-active
  transition all 0.4s ease
.slide-fade-leave-active
  transition all 0.4s cubic-bezier(1, 0.5, 0.8, 1)
.slide-fade-enter, .slide-fade-leave-to
  transform translate3d(0, 100%, 0)
  opacity 0
.slide-enter-active, .slide-leave-active
  transition all 0.4s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
