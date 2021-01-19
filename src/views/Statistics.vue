<template>
<div>
  <layout>
     <Tabs class-prefix = "type" :data-source="typeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <chart class="chart" :options = "x"/>
    </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index" >
         <H3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></H3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="note">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/chart.vue';


@Component({
  components: {Tabs,Chart}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    if (tags.length <= 0) {
      return '空';
    } else {
      let a = '';
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].name) {
          a = a + tags[i].name + ','
        }
      }
      return a.substr(0, a.length - 1)
    }
  }

  mounted(){
    this.$refs.chartWrapper.scrollLeft = 9999;//将滚动条滚在最右方
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }
  get x() {
    return {
      grid:{
        left:0,
        right:0,
      },//去掉echarts的padding
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: [
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320, 1, 2
        ],
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;//这里获取数据的时候会出现类型错误，所以需要声明
  }

  get groupedList() {
    const {recordList} = this;

    const newList = clone(recordList)
        .filter(t => t.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [] as Result;}
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }


  beforeCreate(){
    this.$store.commit('fetchRecord');
  }

  type = '-';
  interval = 'day';
  typeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
.chart{
  width: 430%;
  &-wrapper{
    overflow: auto;
    &::-webkit-scrollbar{
      display: none;//去除滚动条
    }
  }
}
%item{
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title{
  display: flex;
  justify-content: space-between;
  @extend %item;

}
.record{
  background: white;
  @extend %item;

}
.note{
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
.noResult{
  padding: 26px;
  text-align: center;
}
 ::v-deep {
   .type-tabs-item{
     background: #C4C4C4;
     &.selected{
       background: white;
       &::after{
         display: none;
       }
     }
   }
 }
</style>