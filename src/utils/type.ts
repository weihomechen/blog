export interface DraftEditorProps {
  type: string,
  content: string,
  getContent: (content: string, type: number) => void
}

export interface DraftEditorState {

}
