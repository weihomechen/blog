export interface Article {
  id: number | string
  uid: number | string
  title: string
  author: string
  abstract?: string
  cate: number
  content: string
  isDeleted?: number
  createTime: string
  updateTime?: string
  comments?: Comment[]
  tags?: string
}

export interface Comment {
  id: number | string
  'article_id': number | string
  author: string
  content: string
  createTime: string
  updateTime: string
  isDeleted: number
}

export interface Cate {
  id: number
  name: string
  color: string
}

export interface DraftEditorProps {
  type: string,
  content: string,
  getContent: (content: string, type: number) => void
}

export interface DraftEditorState {

}
