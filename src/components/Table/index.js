import React, { useContext, useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { PlaceContext } from "../../context";

const Table = ({ data, rowsPerPage }) => {

    const { queryCtx } = useContext(PlaceContext);

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>#</th>
                        <th className={styles.tableHeader}>Place Name</th>
                        <th className={styles.tableHeader}>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>{el.name}</td>
                            <td className={styles.tableCell}>{el.capital}</td>
                            <td className={styles.tableCell}>{el.language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default Table;