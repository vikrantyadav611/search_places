import React, { useContext, useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { PlaceContext } from "../../context";
import loader from '../../assets/loader.webp'

const Table = ({ rowsPerPage }) => {

    const { queryCtx } = useContext(PlaceContext);
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(queryCtx?.tableData ?? [], page, rowsPerPage);

    return (
        <>
            <table className={styles.table}>
                {queryCtx?.isLoading && <img src={loader} alt="loading..." />}

                {
                    !queryCtx?.isLoading && !queryCtx?.name ? <p>Start Searching</p> : !queryCtx?.isLoading && queryCtx?.tableData?.length == 0 ? <p>No Result Found</p> : null
                }

                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>#</th>
                        <th className={styles.tableHeader}>Place Name</th>
                        <th className={styles.tableHeader}>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {!queryCtx?.isLoading && slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>{queryCtx?.tableData?.map(e => e?.id)?.indexOf(el?.id) + 1}</td>
                            <td className={styles.tableCell}>{el.name}</td>
                            <td className={styles.tableCell}><img src={`https://flagsapi.com/${el.countryCode}/shiny/32.png`} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default Table;