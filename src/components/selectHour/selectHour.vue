<template>
  <div class="hour">
    <div class="settime" v-if="isStart">
      <div class="head">
        <div class="quit" @click="closeHour()">取消</div>
        <div>请选择开始时间</div>
        <div class="sure" @click="next()">下一步</div>
      </div>
      <popup-select :listData="hours" :value="start" v-model="start" @input="getStartValue" :type="type"></popup-select>
    </div>
    <div class="settime" v-if="isEnd">
      <div class="head">
        <div class="quit" @click="last()">上一步</div>
        <div>请选择结束时间</div>
        <div class="confirm" @click="confirm()">确定</div>
      </div>
      <popup-select :listData="hours" :value="end" v-model="end" @input="getEndValue" :type="type"></popup-select>
    </div>
  </div>
</template>
<script>
import PopupSelect from 'components/popup-select/popup-select'
export default {
  components: { PopupSelect },
  data () {
    return {
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
      start: '00',
      end: '24',
      bookingData: [],
      yourBooking: {},
      timeStart: '',
      timeEnd: '',
      isStart: true,
      isEnd: false,
      type: 'end'
    }
  },
  methods: {
    closeHour () {
      this.$emit('closeHour')
    },
    getStartValue (value) {
      // console.log('start'+value)
    },
    getEndValue (value) {
      // console.log('end'+value)
    },
    next () {
      this.isStart = false
      this.isEnd = true
    },
    last () {
      this.isStart = true
      this.isEnd = false
    },
    confirm () {
      let h = {}
      if (parseInt(this.end) < parseInt(this.start)) {
        alert('结束时间必须大于开始时间')
        return
      }
      h.start = this.start
      h.end = this.end
      this.$emit('closeHour')
      this.$emit('showTime', h)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable'
.hour
  position fixed
  width 100%
  bottom 0
  background #fff
  .settime
    width 100%
    .head
      display flex
      align-items center
      justify-content space-between
      height 50px
      font-size 16px
      border-bottom 1px solid $color-text-g
      border-top 1px solid $color-text-g
      margin-bottom 20px
      .quit
        margin-left 20px
      .sure, .confirm
        margin-right 10px
        color $color-active
</style>
