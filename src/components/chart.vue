<template>
<div class="wrapper" ref="wrapper"></div>
</template>
<script lang="ts">


import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import echarts,{EChartsOption,ECharts} from  'echarts';


@Component
export default class Chart extends Vue{
  @Prop() options?: EChartsOption;
  chart?: ECharts;
  mounted(){
    if (this.options === undefined){
      return console.error('options为空')
    }
    const echarts = require('echarts')
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    this.chart!.setOption(this.options)
  }
  @Watch('options')
  onOptionsChange(newValue: EChartsOption){
    this.chart!.setOption(newValue);
  }
 }
</script>
<style scoped lang="scss">
.wrapper{
  height: 350px;
}
</style>