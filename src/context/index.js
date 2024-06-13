import { createContext, useState } from "react";

const initialState = {
    name: "",
    limit: 5,
    pageNo: 1
}

export const PlaceContext = createContext(initialState)

export default function PlaceContextProvider({ children }) {

    const [queryCtx, setQueryCtx] = useState(initialState)

    return <PlaceContext.Provider value={{ queryCtx, setQueryCtx }}>
        {children}
    </PlaceContext.Provider>
} 