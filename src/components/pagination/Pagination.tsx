"use client";
interface PaginationProps {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  setCurrentPage,
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full p-2 mb-2">
      <div className="flex items-center justify-center gap-1 mt-6">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-l-xl text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          ‹
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 border text-base ${
              page === currentPage
                ? "bg-red-600 text-white font-semibold"
                : "text-gray-600"
            } `}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-4 py-2 border rounded-r-xl text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
