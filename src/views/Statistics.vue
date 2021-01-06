<template>
<div>
  <layout>
     <Tabs class-prefix = "type" :data-source="typeList" :value.sync="type"/>
     <Tabs class-prefix = "interval" :data-source="intervalList" :value.sync="interval"/>
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
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  typeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
 ::v-deep .type-tabs-item{
   background: white;
   &.selected{
     background: #c4c4c4;
      &::after{
        display: none;
      }
   }
 }
</style>