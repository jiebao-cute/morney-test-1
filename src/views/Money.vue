<template>
      <layout class-prefix="xxx">
        <number-pad/>
        <types/>
        <notes/>
        <tags :data-source="tags"/>
      </layout>
</template>

<script >
import NumberPad from '@/components/Money/numberPad.vue';
import Types from '@/components/Money/types.vue';
import Notes from '@/components/Money/notes.vue';
import Tags from '@/components/Money/tags.vue';
export default {
  name: 'Money.vue',
  components: {Tags, Notes, Types, NumberPad},
  data(){
    return{
      tags:['衣','食','住','行','乐']
    }
  }
};
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
