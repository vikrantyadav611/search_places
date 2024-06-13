import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";


const initialState = {
    name: "",
    limit: 5,
    pageNo: 1,
    tableData: [],
    isLoading: false
}

export const PlaceContext = createContext(initialState)

export default function PlaceContextProvider({ children }) {

    const [queryCtx, setQueryCtx] = useState(initialState);

    useFetch(queryCtx, setQueryCtx);

    return <PlaceContext.Provider value={{ queryCtx, setQueryCtx }}>
        {children}
    </PlaceContext.Provider>
} 