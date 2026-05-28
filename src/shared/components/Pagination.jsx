export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  color = "#F37A21",
}) {
  return (
    <div className="flex justify-center items-center gap-4 p-4 text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`${
          currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""
        }`}
        style={{ color }}
      >
        ❮
      </button>

      <div className="flex gap-3">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-7 h-7 rounded-full ${
              currentPage === index + 1 ? "text-white" : "text-black"
            }`}
            style={{
              backgroundColor: currentPage === index + 1 ? color : "",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`${
          currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""
        }`}
        style={{ color }}
      >
        ❯
      </button>
    </div>
  );
}
