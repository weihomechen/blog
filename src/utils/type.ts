import { Issue } from './type';
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
  isAcceptReward?: boolean
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
  status: number
}

export interface DraftEditorState {

}

export interface ApprovalItem {
  aid: number
  title: string
  applicant: number
  approver: number
  status: number
  reason: string
  createTime: string
  updateTime: string
  type: number
}

export interface Issue {
  id: number
  author: number
  type: number
  title: string
  content: string
  status: number
  createTime: string
  updateTime: string
  replys: IssueReply[]
}

export interface IssueReply {
  id: number
  'issue_id': number
  author: number
  content: string
  status: number
  createTime: string
  updateTime: string
}

export interface Dispatch {
  (val: any): any
}

export interface Message {
  mid: number | string
  title: string
  content: string
  sender: number
  receiver: number
  status: number
  createTime: string
  updateTime: string
  type: number
  'article_id': string
  senderAvatar?: string
  articleTitle?: string
  senderName?: string
}


