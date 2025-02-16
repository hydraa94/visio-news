import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  paginate,
  getPaginationGroup,
}) {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-white text-black border border-black border-b-[3px] active:border-b hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Pagination Numbers */}
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof item === "number") paginate(item);
          }}
          className={`px-4 py-2 rounded-md ${
            currentPage === item
              ? "bg-gray-200 text-black border border-black"
              : "bg-white text-gray-900 font-semibold hover:bg-gray-300 border border-black border-b-[3px]"
          } ${item === "..." ? "cursor-default pointer-events-none" : ""}`}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white text-gray-900 hover:bg-gray-300 disabled:bg-gray-700 border border-black border-b-[3px] active:border-b"
      >
        Next
      </button>
    </div>
  );
}
