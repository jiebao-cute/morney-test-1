<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
         :class="{selected: selectedTags.indexOf(tag) >=0}"
         @click="toggle(tag)">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component
export default class Tags extends mixins(TagHelper){

  selectedTags: string[] = [];

  get tagList(){
    return (this.$store.state as RootState).tagList;
  }
  created(){
    this.$store.commit('fetchTag');
  }

  toggle(tag: string){
    const index = this.selectedTags.indexOf(tag)
    if (index >= 0){
      this.selectedTags.splice(index,1)
    }else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  display: flex;
  flex-direction: column-reverse;//从下往上布局
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      $bg:#d9d9d9;
      background: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
         background: darken($bg,50%);
         color: white;
      }
    }
  }
  > .new{
    padding-top: 16px;
    button{
      background: transparent;
      border: none;
      color: #999999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>