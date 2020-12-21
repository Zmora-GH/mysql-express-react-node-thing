import {useState, useCallback, useEffect} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserID] = useState(null);

    const login = useCallback( (jwttoken, id) => {
        setToken(jwttoken)
        setUserID(id)
        localStorage.setItem('userData', JSON.stringify({userId: id, token: jwttoken}))
    }, []);

    const logout = useCallback( () => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem('userData')
    }, []);

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId}
}
