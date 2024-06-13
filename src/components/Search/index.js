import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./Search.module.css";
import { PlaceContext } from '../../context';
import useDebounce from '../../hooks/useDebounce';

export default function Search() {

    const { setQueryCtx } = useContext(PlaceContext);

    const [localQuery, setLocalQuery] = useState("");

    const debouncedQuery = useDebounce(localQuery, 1000);

    const inputRef = useRef(null);

    const handleQuerySearch = (e) => {
        const query = e.target.value.trim();
        if (query?.length == 0) {
            setQueryCtx(p => ({ ...p, name: "", tableData: [], isLoading: false }));
        }else{
            setQueryCtx(p => ({ ...p, isLoading: true }))
        }
        setLocalQuery(query);
    }

    useEffect(() => {
        if (debouncedQuery?.length > 0) {
            setQueryCtx(p => ({ ...p, name: debouncedQuery }));
        }
    }, [debouncedQuery])

    // Capture "ctrl+/"" combo key
    useEffect(() => {
        function captureSearchKey(event) {
            console.log(event.key);
            if (event.ctrlKey && event.key === '/') {
                inputRef.current.focus();
            }
        }
        window.addEventListener('keydown', captureSearchKey);
        return () => window.removeEventListener("keydown", captureSearchKey)
    }, [])


    return (
        <div>
            <div className={styles["search-form"]}>
                <input ref={inputRef} type="search" onChange={handleQuerySearch} value={localQuery} placeholder="Search for the places..." className={styles["search-input"]} />
                <div className={styles["search-option"]}>
                    <div className={styles["search-keyboard"]}>
                        ctrl+/
                    </div>
                </div>
            </div>
        </div>
    )
}
