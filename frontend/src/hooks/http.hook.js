import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method, body=null, headers={}) => {
        setLoading(true);
        try {
            const res = await fetch(url, {method, body, headers});
            const data = await res.json();
            if (!res.ok) { throw new Error(data.message || 'Oops!')}
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    return {loading, request, error};
}
