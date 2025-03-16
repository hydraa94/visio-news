"use client";

import { useState, useEffect } from "react";

export function usePagination(data = [], itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

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
    // For mobile, show only 3 numbers
    if (isMobile) {
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, currentPage + 1);

      // Adjust for edge cases
      if (currentPage <= 2) {
        start = 1;
        end = Math.min(3, totalPages);
      }
      if (currentPage >= totalPages - 1) {
        start = Math.max(1, totalPages - 2);
        end = totalPages;
      }

      const paginationGroup = [];
      for (let i = start; i <= end; i++) {
        paginationGroup.push(i);
      }

      // Add ellipsis if needed
      if (start > 1) paginationGroup.unshift("...");
      if (end < totalPages) paginationGroup.push("...");

      return paginationGroup;
    }
    // For desktop, keep the original logic (5 numbers)
    else {
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
    }
  };

  return {
    currentItems,
    totalPages,
    currentPage,
    paginate,
    getPaginationGroup,
    isMobile,
  };
}
