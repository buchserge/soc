export interface MessageType {
  id: number;
  text: string;
  name: string;
  comments: Comment[];
  userLikes:User[];
  likeCount:number;
  userDto:User
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
  pageList :MessageType[],
   pageCount: number|void,
  totalElements: number,
 

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
  message?: MessageType;
  messageId?:number;
}
export interface RegisterInput {
  name: string;
  password: string;

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