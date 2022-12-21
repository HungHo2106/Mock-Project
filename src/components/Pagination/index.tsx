import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export const PaginationComponent = ({
  getArticleByPagination,
  totalGlobalPages,
  totalMyPages,
  mode,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  let items = [];
  for (
    let number = 1;
    mode === "global-feed"
      ? number <= totalGlobalPages
      : number <= totalMyPages;
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => {
          setCurrentPage(number);
          getArticleByPagination(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={
          (mode === "global-feed" ? currentPage : totalMyPages) <= 1
            ? true
            : false
        }
        onClick={() => {
          setCurrentPage(currentPage - 1);
          getArticleByPagination(currentPage);
        }}
      >
        Previous
      </Pagination.Prev>
      {items}
      <Pagination.Next
        disabled={
          currentPage >=
          (mode === "global-feed" ? totalGlobalPages : totalMyPages)
            ? true
            : false
        }
        onClick={() => {
          setCurrentPage(currentPage + 1);
          getArticleByPagination(currentPage);
        }}
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
};
