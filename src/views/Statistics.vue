<template>
<div>
  <layout>
     <Tabs class-prefix = "type" :data-source="typeList" :value.sync="type"/>
     <Tabs class-prefix = "interval" :data-source="intervalList" :value.sync="interval" height='48px'/>
      <ol>
        <li v-for="(group,index) in result" :key="index" >
         <H3 class="title">{{beautify(group.title)}}</H3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="note">{{item.notes}}</span>
              <span>{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
  </layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';



@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{
  tagString(tags: Tag[]) {
    if(tags.length <= 0){
      return '空';
    }else{
      let a = '';
      for(let i =0;i<tags.length ;i++){
        if(tags[i].name){
          a = a + tags[i].name + ','
        }
      }
      return a.substr(0,a.length-1)
    }
  }

  beautify(string: string){
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now,'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天';
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天';
    }else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;//这里获取数据的时候会出现类型错误，所以需要声明
  }
  get result(){
     const {recordList} = this;
    type HashTAbelValue = {title: string;items: RecordItem[]}
     const hashTable: {[key: string]: HashTAbelValue}={};
     for(let i=0; i < recordList.length;i++){
      const[date,time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date,items:[]};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate(){
    this.$store.commit('fetchRecord');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  typeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
%item{
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title{
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
 ::v-deep {
   .type-tabs-item{
     background: white;
     &.selected{
       background: #c4c4c4;
       &::after{
         display: none;
       }
     }
   }
   //.interval-tabs-item{
   //  height: 48px;
   //}
 }
</style>