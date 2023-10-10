import {
  useGetMessagesQuery,
  useCreateOneMutation,
  useDeleteMessageMutation,
  useSetLikeMutation,
} from "../../store/api/messageApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Message.css";
import imgg from "../../assets/images/yyy.jpg";
import aaa from "../../assets/images/aaa.jpg";
import React from "react";

import { Sidenav } from "../Sidenav/Sidenav";
import { Navigate, useSearchParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { AuthError } from "../../models/messageTypes";
import { CommentModal } from "../CommentModal/CommentModal";

export const Message = () => {
  const [msgId, setMsgId] = React.useState<number>();
  const [isOpen, setIsOpen] = React.useState(false);

  const [term, setTerm] = React.useState("");

  const [setLike] = useSetLikeMutation();
  const [disabled, setDisabled] = React.useState(false);
  const [createOne] = useCreateOneMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  let [searchParams, setSearchParams] = useSearchParams();

  const { data: messagesWrapper, error } = useGetMessagesQuery(
    Number(searchParams.get("page"))
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createOne(term);
    setTerm("");
    setDisabled(true);
  }

  const onDeleteHandler = (id: number) => {
    deleteMessage(id);
  };

  if (error && (error as AuthError).status === 403) {
    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  } else {
    return (
      <>
        <div className="sidenav">
          <Sidenav />
        </div>
        <div className="beforeBasic">
          {/* 1*/}
          <img className="background_img" src={aaa} alt="" />

          {/* 2 */}
          <div className="afterBase">
            <img className="yyy_img" src={imgg} />
            subscribe
          </div>

          {/* 3 */}
          <div className="insideTweetBox">
            <img className="img_profile" src={imgg} />

            <p>{messagesWrapper?.userName}</p>

            <form className="fff" onSubmit={handleSubmit}>
              <input
                className="mainFeedUser"
                placeholder="What is happening?"
                type="text"
                value={term}
                disabled={disabled}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
          </div>
          {/* 4 */}

          {messagesWrapper?.messages?.pageList.map(function (message) {
            return (
              <div className="before_Basic" key={message.id}>
                <div className="basic">
                  <img className="img_first" src={imgg} alt="" />

                  <div className="inside_basic">
                    <p className="txt">{message.name}</p>
                    <p className="txt2">{message.text}</p>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon1">
                    {message.userLikes?.find((u) => {
                     
                      return u.name === messagesWrapper.userName;
                    }) ? (
                      <div onClick={() => setLike(message.id)}>
                        <FavoriteIcon />
                      </div>
                    ) : (
                      <div onClick={() => setLike(message.id)}>
                        <FavoriteBorderIcon />
                      </div>
                    )}

                    <p>{message.likeCount}</p>
                  </div>

                  <div className="icon3">
                    <div
                      onClick={() => {
                        setIsOpen(true);
                        setMsgId(message.id);
                      }}
                    >
                      <ChatBubbleOutlineIcon />
                    </div>

                    {isOpen && (
                      <CommentModal setIsOpen={setIsOpen} messageId={msgId} />
                    )}
                  </div>
                  <div
                    className="icon4"
                    onClick={() => onDeleteHandler(message.id)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            );
          })}

          <div>
            {messagesWrapper?.messages.pageCount !== 1 &&
              (messagesWrapper?.messages.pageCount as number) > 0 && (
                <Pagination totalPages={messagesWrapper?.messages.pageCount} />
              )}
          </div>
        </div>
      </>
    );
  }
};
