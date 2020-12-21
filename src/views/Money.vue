<template>
      <layout class-prefix="xxx">
       {{record}}
        <number-pad @update:value="onUpdateAmount"/>
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
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue{
      tags = ['衣','食','住','行','乐'];
      record: Record ={
        tags:[] , notes:'' , type:'+' , amount:0
      }
       onUpdateTags(value: string[]){
        this.record.tags = value;
         console.log(value);
       }
       onUpdateNotes(value: string){
         this.record.notes = value;
       }
       onUpdateAmount(value: string){
         this.record.amount = parseFloat(value);
         console.log(value);
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
