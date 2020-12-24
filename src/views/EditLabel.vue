<template>
  <layout>
    <div>
      <icon name="left"></icon>
      <span>创建组件</span>
    </div>
    <Notes field-name="标签名" placeholder="请输入标签名"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagsListModel from '@/models/tagsListModel';
import Notes from '@/components/Money/notes.vue';
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue{
  created() {
    const id = this.$route.params.id;
    tagsListModel.fetch();
    const tags = tagsListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }

}
</script>

<style lang="scss" scoped>

</style>