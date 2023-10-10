import "./Comment.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import imgg from "../../assets/images/yyy.jpg";
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "../../store/api/commentApi";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Sidenav } from "../Sidenav/Sidenav";
import { Pagination } from "../Pagination/Pagination";

export const Comment = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageParam, setPageParam] = React.useState(0);
  const { messageId } = useParams();
  const [deleteMessage, { error, isSuccess, isError }] =
    useDeleteCommentMutation();

  const { data: comments } = useGetCommentsQuery({
    page: Number(searchParams.get("page")),
    messageId: Number(messageId),
  });

  useEffect(() => {
    console.log(isSuccess + " INSIDE COMMENT");
  });

  return (
    <>
      <div className="sidenav">
        <Sidenav />
      </div>
      <div className="beforeBasic">
        {comments?.content?.map((comment) => {
          return (
            <div className="before_Basic" key={comment.id}>
              <div className="basic">
                <img className="img_first" src={imgg} alt="" />

                <div className="inside_basic">
                  <p className="txt">{comment?.text}</p>
                  <p className="txt2">{comment?.message?.text}</p>
                </div>
              </div>
              <div className="icons">
                <div className="icon1">
                  <div>
                    <FavoriteBorderIcon />
                  </div>
                </div>

                <div
                  className="icon4"
                  onClick={() => {
                    deleteMessage(comment.id);
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}

        <div>
          {(comments?.totalPages as number) > 0 &&
            comments?.totalPages !== 1 && (
              <Pagination totalPages={comments?.totalPages} />
            )}
        </div>
      </div>
    </>
  );
};
