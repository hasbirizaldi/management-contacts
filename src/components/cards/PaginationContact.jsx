export default function PaginationContact({ page, totalPage, onPageChange }) {
  function getPages() {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  return (
    <>
      <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
        {page > 1 && (
          <button
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
          >
            <i className="fas fa-chevron-left mr-2" /> Previous
          </button>
        )}

        {getPages().map((value) => {
          if (value === page) {
            return (
              <button
                type="button"
                key={value}
                onClick={() => onPageChange(value)}
                className="cursor-pointer px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
              >
                {value}
              </button>
            );
          } else {
            return (
              <button
                key={value}
                onClick={() => onPageChange(value)}
                className="cursor-pointer px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
              >
                {value}
              </button>
            );
          }
        })}

        {page < totalPage && (
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
          >
            Next <i className="fas fa-chevron-right ml-2" />
          </button>
        )}
      </nav>
    </>
  );
}
