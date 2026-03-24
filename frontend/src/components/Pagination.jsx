import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={styles.wrapper}>
      <button
        style={{
          ...styles.btn,
          opacity: currentPage === 1 ? 0.35 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon fontSize="small" />
      </button>

      <div style={styles.pages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            style={{
              ...styles.pageBtn,
              background: page === currentPage
                ? "linear-gradient(135deg, #1976d2, #42a5f5)"
                : "#fff",
              color: page === currentPage ? "#fff" : "#65676b",
              border: page === currentPage
                ? "none"
                : "1px solid #e8eaed",
              boxShadow: page === currentPage
                ? "0 2px 8px rgba(25,118,210,0.3)"
                : "none",
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        style={{
          ...styles.btn,
          opacity: currentPage === totalPages ? 0.35 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon fontSize="small" />
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "28px",
    paddingBottom: "20px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #e8eaed",
    background: "#fff",
    cursor: "pointer",
    color: "#65676b",
    transition: "all 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  pages: {
    display: "flex",
    gap: "6px",
  },
  pageBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default Pagination;