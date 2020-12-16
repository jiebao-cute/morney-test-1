<template>
  <div>
    <ul class="type">
      <li :class="type === '-' && 'selected'"
      @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'"
      @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
//ts语法
   import  Vue from 'vue';
   import {Component} from 'vue-property-decorator';

   @Component
   export default class Types extends  Vue {
     type = '-';//‘-’表示支出，‘+’表示收入
     selectType(type: string){
       if(type !== '-' && type !== '+'){//type只能是‘-’‘+’
         throw new Error('type is unknown')
       }
       this.type=type;
     }
   }

//js语法
// export default {
// name: "types",
//   data(){
//   return{
//     type:'-'  //‘-’表示支出，‘+’表示收入
//   }
//   },
//   methods:{
//   selectType(type){
//     if (type !== '-' && type !=='+'){//type只能是‘-’‘+’
//       throw new Error('type is unknown')
//     }
//     this.type = type
//     }
//   }
//
// }
</script>

<style lang="scss" scoped>
.type{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li{
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333333;
    }
  }
}
</style>