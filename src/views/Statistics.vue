<template>
<div>
  <layout>
     <Tabs class-prefix = "type" :data-source="typeList" :value.sync="type"/>
     <Tabs class-prefix = "interval" :data-source="intervalList" :value.sync="interval" height='48px'/>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
         <H3>{{group.title}}</H3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{item.amount}} {{item.createdAt}}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{

  get recordList() {
    return (this.$store.state as RootState).recordList;//这里获取数据的时候会出现类型错误，所以需要声明
  }
  get result(){
     const {recordList} = this;
    type HashTAbelValue = {title: string;items: RecordList[]}
     const hashTable: {[key: string]: HashTAbelValue}={};
     for(let i=0; i < recordList.length;i++){
      const[date,time] = recordList[i].createdAt.split('T');
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