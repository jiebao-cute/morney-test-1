<template>
      <layout class-prefix="xxx">
       {{recordList}}
        <number-pad :value.sync="record.amount"  @submit="saveRecord" />
        <types :value.sync="record.type" />
        <notes @update:value="onUpdateNotes"/>
        <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
      </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money/numberPad.vue';
import Types from '@/components/Money/types.vue';
import Notes from '@/components/Money/notes.vue';
import Tags from '@/components/Money/tags.vue';
import {Component, Watch} from 'vue-property-decorator';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;//数据类型object\\string
  createdAt? : Date;//类   构造函数
}

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue{
      tags = ['衣','食','住','行','乐'];
      recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
      record: Record ={
        tags:[] , notes:'' , type:'-' , amount:0
      }
       onUpdateTags(value: string[]){
        this.record.tags = value;
         console.log(value);
       }
       onUpdateNotes(value: string){
         this.record.notes = value;
       }
       saveRecord(){
        const record2: Record= JSON.parse(JSON.stringify(this.record));
        record2.createdAt = new Date();
        this.recordList.push(record2);
         console.log(this.recordList);
       }
      @Watch('recordList')
         onRecordListChange(){
        window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
      }

    }
</script>
<style lang="scss">
    .xxx-content{
      display: flex;
      flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
