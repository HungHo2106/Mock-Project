import Pagination from "react-bootstrap/Pagination";

export const PaginationComponent = ({
  totalArticles,
  itemPerPage,
  currentPage,
  setCurrentPage,
}: any) => {
  const pagesCount = Math.ceil(totalArticles / itemPerPage);

  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage <= 1 ? true : false}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        Previous
      </Pagination.Prev>
      {items}
      <Pagination.Next
        disabled={currentPage >= pagesCount ? true : false}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
};
