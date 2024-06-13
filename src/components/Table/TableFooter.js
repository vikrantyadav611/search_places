import { useContext, useEffect, useState } from "react";
import styles from "./TableFooter.module.css";
import { PlaceContext } from "../../context";
import useDebounce from "../../hooks/useDebounce";


const TableFooter = ({ range, setPage, page, slice }) => {

    const { queryCtx, setQueryCtx } = useContext(PlaceContext);

    const [error, setError] = useState("");

    const [localQuery, setLocalQuery] = useState(queryCtx?.limit);

    const debouncedQuery = useDebounce(localQuery, 1000);

    const handleLimitChange = (e) => {
        const limit = e.target.value;
        if (Number(limit) > 10) {
            setError("Can't use limit more than 10!");
        } else {
            setError("");
            setQueryCtx(p => ({ ...p, isLoading: true }));
        }
        setLocalQuery(limit);
    }

    useEffect(() => {
        if (debouncedQuery?.length > 0) {
            setQueryCtx(p => ({ ...p, limit: debouncedQuery }));
        }
    }, [debouncedQuery])

    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);


    return (
        <div className={styles.tableFooterContainer}>
            <div className={styles.tableFooter}>
                {range.map((el, index) => (
                    <button
                        key={index}
                        className={`${styles.button} ${page === el ? styles.activeButton : styles.inactiveButton
                            }`}
                        onClick={() => setPage(el)}
                    >
                        {el}
                    </button>
                ))}

            </div>
            <div className={styles.limitContainer}>
                <input type="number" className={styles.limit} value={localQuery} onChange={handleLimitChange} />
                {error?.length > 0 ? <p className={styles.tableFooterError}>{error}</p> : null}
            </div>
        </div>
    );
};

export default TableFooter;