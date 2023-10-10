import React from "react";
import "./CommentModal.css";
import { usePostCommentMutation } from "../../store/api/commentApi";
import { Navigate } from "react-router-dom";
import { CommentModalType, RegisterInput } from "../../models/messageTypes";

export const CommentModal = ({ setIsOpen, messageId }: CommentModalType) => {
  const [postComment, { isSuccess, isError }] = usePostCommentMutation();
  const [comment, setComment] = React.useState("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postComment({ comment, messageId } as RegisterInput);

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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="send"
                name="commentText"
                onChange={(e) => setComment(e.target.value)}
              />
              <input className="submitModal" type="submit" value="send" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
