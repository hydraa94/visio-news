import { useState } from "react";

export function usePagination(data = [], itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current page's data
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate pagination group (e.g., 1, 2, 3, ..., 10)
  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
      end = totalPages;
    }

    const paginationGroup = [];
    for (let i = start; i <= end; i++) {
      paginationGroup.push(i);
    }

    if (start > 1) paginationGroup.unshift("...");
    if (end < totalPages) paginationGroup.push("...");

    return paginationGroup;
  };

  return {
    currentItems,
    totalPages,
    currentPage,
    paginate,
    getPaginationGroup,
  };
}
