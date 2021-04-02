<template>
  <Row type="flex" align="middle" justify="start">
    <Col span="3">
      <date-picker
        type="date"
        placeholder="开始日期"
        v-model="startTimeData"
        @on-change="startTimeData = $event"
        :options="startOptions"
      ></date-picker>
    </Col>
    <Col>~</Col>
    <Col span="3">
      <date-picker
        type="date"
        placeholder="结束日期"
        v-model="endTimeData"
        @on-change="endTimeData = $event"
        :options="endOptions"
      ></date-picker>
    </Col>
  </Row>
</template>

<script>
import { DatePicker, Row, Col } from "iview";
export default {
  name: "date-range",
  components: { DatePicker, Row, Col },
  data() {
    return {
      startTimeData: "",
      endTimeData: "",
      startOptions: {
        disabledDate() {
          return false;
        },
      },
      endOptions: {
        disabledDate() {
          return false;
        },
      },
    };
  },
  computed: {
    startTime: function () {
      return formatTime(this.startTimeData);
    },
    endTime: function () {
      return formatTime(this.endTimeData);
    },
  },
  watch: {
    startTime(newTime, oldTime) {
      if (newTime !== oldTime) {
        this.endOptions = {
          disabledDate(date) {
            return newTime !== ""
              ? disabledDateFn("start", newTime, date, 1)
              : false;
          },
        };
      }
    },
    endTime(newTime, oldTime) {
      if (newTime !== oldTime) {
        this.startOptions = {
          disabledDate(date) {
            return newTime !== ""
              ? disabledDateFn("end", newTime, date, 1)
              : false;
          },
        };
      }
    },
  },
};
const formatTime = (time) => {
  if (time) return new Date(time + " " + "00:00:00");
  return "";
};

/**
 * @param {String} type start,end
 * @param {timeStamp} newTime 改变的日期
 * @param {timeStamp} date 遍历的日期
 * @param {number} month 可选的间隔月份
 * @description 返回不可点击的日期
 */

const disabledDateFn = (type, newTime, date, month) => {
  const day = 24 * 60 * 60 * 1000;
  if (month == undefined) {
    month = 3;
  }
  let months = month * 30.5 * day;

  if (type == "start") {
    return (
      date.valueOf() < newTime.valueOf() ||
      date.valueOf() > newTime.valueOf() + months
    );
  } else if (type == "end") {
    return (
      date.valueOf() > newTime.valueOf() ||
      date.valueOf() < newTime.valueOf() - months
    );
  }
  return false;
};
</script>