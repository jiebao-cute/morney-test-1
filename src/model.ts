const  localStorageKeyName = 'recordList';
const model = {
  clone(date: RecordItem[] | RecordItem){
    return JSON.parse(JSON.stringify(date));
  },
  fetch(){
   return JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
  },
  save(date: RecordItem[]){
      window.localStorage.setItem(localStorageKeyName,JSON.stringify(date));
  }
};
export default model;