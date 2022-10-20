import { config } from "../../config";
import "./Pagination.css";

const Pagination = (props) => {
    const { usersLength, setCurrentPage, currentPage, deleteSelected } = props;

    const totalNoOfPages = Math.ceil(usersLength / config.paginate);
    const changePage = (idx) => {
        setCurrentPage(idx);
    };

    const goToPage = (idx) => {
        if (idx < 1) {
            idx = 1;
        } else if (idx > totalNoOfPages) {
            idx = totalNoOfPages;
        }
        setCurrentPage(idx);
    };

    let pages = [];
    pages.push(
        <div
            key={-3}
            className={`paginator-element ${currentPage === 1 ? 'disabled' : ""}`}
            onClick={() => changePage(1)}
        >
            <i className="fas fa-angle-double-left"></i>
        </div>
    );
    pages.push(
        <div
            key={-2}
            className={`paginator-element ${currentPage === 1 ? 'disabled' : ""}`}
            onClick={() => goToPage(currentPage - 1)}
        >
            <i className="fas fa-angle-left"></i>
        </div>
    );
    for (let i = 1; i <= totalNoOfPages; i++) {
        pages.push(
            <div
                key={i}
                onClick={() => changePage(i)}
                className={`paginator-element ${currentPage === i ? 'selected' : ""}`}
            >
                {i}
            </div>
        );
    }
    pages.push(
        <div
            key={-1}
            className={`paginator-element ${currentPage === totalNoOfPages ? 'disabled' : ""}`}
            onClick={() => goToPage(currentPage + 1)}
        >
            <i className="fas fa-angle-right"></i>
        </div>
    );
    pages.push(
        <div
            key={0}
            className={`paginator-element ${currentPage === totalNoOfPages ? 'disabled' : ""}`}
            onClick={() => changePage(totalNoOfPages)}
        >
            <i className="fas fa-angle-double-right"></i>
        </div>
    );

    return (
        <div className='container'>
            <button className='btn-delete' onClick={() => deleteSelected()}>
                Delete Selected
            </button>
            <div className='pagination'>{pages}</div>
        </div>
    );
};


export default Pagination;