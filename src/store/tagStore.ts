import tagsListModel from '@/models/tagsListModel';

export default {
  // tag store
  tagList : tagsListModel.fetch(),

  findTag(id: string){
    return this.tagList.filter(t=>t.id ===id)[0];
  },
  createTag :(name: string)=>{
    const message = tagsListModel.create(name);
    if (message === 'duplicated'){
      window.alert('标签名重复了');
    }else if (message === 'success'){
      window.alert('添加成功')
    }
  },
  removeTag: (id: string) =>{
    return tagsListModel.remove(id);
  },
  updateTag : (id: string ,name: string) => {
    return tagsListModel.update(id,name);
  }
}