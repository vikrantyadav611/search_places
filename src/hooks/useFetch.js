import { useState, useEffect } from 'react';
import axios from 'axios';


function useFetch(queryCtx,setQueryCtx) {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (queryCtx?.name?.length == 0 || !queryCtx?.name || Number(queryCtx?.limit) > 10) return;
        const source = axios.CancelToken.source();
        axios.request({
            method: 'GET',
            url: process.env.REACT_APP_URL,
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_API_HOST,
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }, params: { countryIds: 'IN', namePrefix: queryCtx?.name, limit: queryCtx?.limit }
        })
            .then(res => {
                console.log(res);
                setQueryCtx(p => ({ ...p, isLoading: false, tableData: res?.data?.data }));
                //checking for multiple responses for more flexibility 
                //with the url we send in.
                // res.data && setData(res.data);
            })
            .catch(err => {
                setQueryCtx(p => ({ ...p, isLoading: false, tableData: [] }))

                setError('An error occurred. Awkward..')
            })
        return () => {
            source.cancel();
        }
    }, [queryCtx?.name, queryCtx?.limit])
}

export default useFetch;