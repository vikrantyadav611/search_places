import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./Search.module.css";
import { PlaceContext } from '../../context';
import useDebounce from '../../hooks/useDebounce';

export default function Search() {

    const { setQueryCtx } = useContext(PlaceContext);

    const [localQuery, setLocalQuery] = useState("");
   
    const debouncedQuery = useDebounce(localQuery, 2000);

    const handleQuerySearch = (e) => {
        const query = e.target.value.trim();
        setLocalQuery(query);
    }

    useEffect(() => {
        setQueryCtx(p => ({ ...p, name: debouncedQuery }))
    }, [debouncedQuery])
    

    return (
        <div>
            <div className={styles["search-form"]}>
                <input type="search" onChange={handleQuerySearch} value={localQuery} placeholder="Search for the places..." className={styles["search-input"]} />
                <div className={styles["search-option"]}>
                    <div className={styles["search-keyboard"]}>
                        ctrl+/
                    </div>
                </div>
            </div>
        </div>
    )
}
