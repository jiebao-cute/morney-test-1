type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;//数据类型object\\string
  createdAt? : string;//类   构造函数
}
type Tag ={
  id: string;
  name: string;
}
type TagsListModel ={
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success'|'duplicated';
  save: () => void;
  update: (id: string ,name: string) => 'success'|'not found'|'duplicated';
  remove: (id: string) => boolean;
}
type RootState ={
  recordList: RecordItem[];
  createRecordError: Error| null;
  a: string;
  tagList: Tag[];
  currentTag?: Tag;
}