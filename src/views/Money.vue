<template>
      <layout class-prefix="xxx">
        <number-pad :value.sync="record.amount"  @submit="saveRecord" />
        <types :value.sync="record.type" />
        <div class="notes">
        <FormItem field-name="备注"
               placeholder="在这里输入备注"
               @update:value="onUpdateNotes"/>
        </div>
        <tags @update:value = "onUpdateTags"/>
      </layout>
</template>
<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money/numberPad.vue';
import Types from '@/components/Money/types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/tags.vue';
import {Component} from 'vue-property-decorator';


@Component({
  components: {Tags,  FormItem, Types, NumberPad}
})

export default class Money extends Vue{
      record: RecordItem ={
        tags:[] , notes:'' , type:'-' , amount:0
      }
      get tagList(){
        return this.$store.state.recordList;
      }
      created(){
        this.$store.commit('fetchRecord')
      }
       onUpdateTags(value: string[]) {
       this.record.tags = value;
      }
       onUpdateNotes(value: string){
         this.record.notes = value;
       }
       saveRecord(){
        this.$store.commit('createRecord',this.record)
      }
    }
</script>
<style lang="scss">
    .xxx-content{
      display: flex;
      flex-direction: column-reverse;
    }
    .notes{
     padding: 10px 0;
    }
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>
