export interface Message {
  id: number;
  text: string;
  name: string;
  comments: Comment[];
  userLikes:User[];
  likeCount:number;
}

export interface CommentPage {
  totalPages: number|void,
  totalElements: number
  content: Comment[] ,
  
}export interface MessagesWrapper {
  userName:string,
  messages:MessagePage, 
}
export interface MessagePage{
  pageList :Message[],
   pageCount: number|void,
  totalElements: number

}

export interface PaginationType {
  
  totalPages:number|void
}
export interface User {
  name:string,
}
export interface Comment {
  id: number;
  text: string;
  message?: Message;
}
export interface RegisterInput {
  userName: string;
  password: string;
  messageId?:number;
  comment?:string;
  
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;

  error: string;
}

export interface CommentModalType {
  setIsOpen: (arg: boolean) => void;
  messageId?:number
}
export interface AuthError {
  error_message?: string |undefined;
  status?:number;
  data?:string
}