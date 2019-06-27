export interface User {
  uid: number
  name: string
  password: string
  role: number
  createTime: string
  email?: string
  cover?: string
  motto: string
  moneyCode: string
  avatar?: string
  tid: number | string
}

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

export interface Reply {
  id: number
  'comment_id': number
  author: string
  to: string
  content: string
  createTime: string
  updateTime: string
}

export interface Comment {
  id: number | string
  'article_id': number | string
  author: string
  content: string
  createTime: string
  updateTime: string
  isDeleted: number
  replyList: Reply[]
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

export interface DispatchParam {
  type: string
  [key: string]: any
}

export interface Team {
  tid: number
  name: string
  avatar: string
  creater: string
  owner: number
  createTime: string
  abstract: string
}

export interface DraftEditorState {

}
