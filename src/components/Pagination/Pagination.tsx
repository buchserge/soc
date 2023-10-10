import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { PaginationType } from "../../models/messageTypes";

export const Pagination = ({ totalPages }: PaginationType) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageParam, setPageParam] = React.useState(0);

  const getParam = (): number => {
    let par = Number(searchParams.get("page"));

    return par;
  };
  const setParam = (arg: number) => {
    searchParams.set("page", JSON.stringify(arg));
    setSearchParams(searchParams);
  };

  const increment = () => {
    let par = getParam() + 1;
    setPageParam(par);
    setParam(par);
  };

  const decrement = () => {
    let par = getParam();

    setPageParam(par - 1);
    setParam(par - 1);
  };
  const plusPage = (arg: number) => {
    let par = getParam() - 1;
    setPageParam(arg);
    setParam(arg);
  };

  const generateSequence = () => {
    return Array.from(Array(totalPages).keys());
  };

  return (
    <>
      <div className="pagination">
        <button
          className="button"
          disabled={getParam() === 0 ? true : false}
          onClick={() => decrement()}
        >
          previous
        </button>

        {generateSequence().map((i) => {
          return (
            <button
              key={i}
              className="button"
              disabled={getParam() === i ? true : false}
              onClick={() => plusPage(i)}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          className="button"
          disabled={
            (totalPages as number) === (getParam() as number) + 1 ? true : false
          }
          onClick={() => increment()}
        >
          next
        </button>
      </div>
    </>
  );
};
