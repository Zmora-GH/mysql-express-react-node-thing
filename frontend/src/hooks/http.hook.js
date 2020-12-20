import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method='GET', body=null, headers={}) => {
        setLoading(true);
        try {
            const headers2 = {"Content-Type": "application/json"};
            const res = await fetch(url, {method, body, headers2});
            const data = await res.json();
            console.log(body);
            console.log(data);
            if (!res.ok) { throw new Error(data.message || 'Oops! http.hook.js')};
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = () => setError(null);
    return {loading, request, error, clearError};
}
