<template>
      <layout class-prefix="xxx">
        <number-pad :value.sync="record.amount"  @submit="saveRecord" />
       <Tabs :dataSource ="recordTypeList" :value.sync = "record.type"/>
        <div class="notes">
        <FormItem field-name="备注"
                  placeholder="在这里输入备注"
                  :value.sync="record.notes"
        />
        </div>
        <div class="createdAt">
          <FormItem field-name="日期"
                    placeholder="在这里输入日期"
                    type="date"
                    :value.sync="record.createdAt"
          />
        </div>
        <tags @update:value = "onUpdateTags"/>
      </layout>
</template>
<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money/numberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';
import Tags from '@/components/Money/tags.vue';


@Component({
  components: {Tags, Tabs, FormItem, NumberPad}
})

export default class Money extends Vue{
      record: RecordItem ={
        tags:[] , notes:'' , type:'-' , amount:0,createdAt:new Date().toISOString()
      }
      get tagList(){
        return this.$store.state.recordList;
      }
      recordTypeList = recordTypeList;

      created(){
        this.$store.commit('fetchRecord')
      }
       onUpdateTags(value: Tag[]) {
       this.record.tags = value;
      }
       onUpdateNotes(value: string){
         this.record.notes = value;
       }
       saveRecord(){
        if (!this.record.tags || this.record.tags.length === 0){
          return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord',this.record);
        this.record.notes = '';
      }
    }
</script>
<style lang="scss" >
    .xxx-content{
      display: flex;
      flex-direction: column-reverse;
    }
    .notes{
     padding: 1px 0;
    }
    .createdAt{
      padding: 1px 0;
    }
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>
