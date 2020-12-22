<template>
      <layout class-prefix="xxx">
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
import model from '@/model';

const recordList = model.fetch()
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue{
      tags = ['衣','食','住','行','乐'];
      recordList: RecordItem[] = recordList;
      record: RecordItem ={
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
        const record2: RecordItem= model.clone(this.record);
        record2.createdAt = new Date();
        this.recordList.push(record2);
         console.log(this.recordList);
       }
      @Watch('recordList')
         onRecordListChange(){
         model.save(this.recordList);
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
