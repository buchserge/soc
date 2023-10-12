import React from "react";
import "./CommentModal.css";
import { usePostCommentMutation } from "../../store/api/commentApi";
import { Navigate } from "react-router-dom";
import {
  Comment,
  CommentModalType,
} from "../../models/messageTypes";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

export const CommentModal = ({ setIsOpen, messageId }: CommentModalType) => {
 
  const [postComment, { isSuccess, isError }] = usePostCommentMutation();
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const handleCommentinput: SubmitHandler<FieldValues> = async (data) => {
    let dataComment = data as Comment;
    dataComment.messageId = messageId;
    await postComment(dataComment);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {isSuccess && isSuccess === true && (
        <Navigate to={`/comments/${messageId}`} />
      )}
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">comment</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            ✖
          </button>
          <div className="modalContent">
            <form onSubmit={handleSubmit(handleCommentinput)}>
              <input type="text" className="send" {...register("text")} />
              <input className="submitModal" type="submit" value="send" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
