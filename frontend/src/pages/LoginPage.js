import React, { useState, useContext, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook'
import { AuthContext} from '../context/AuthContext';

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, clearError} = useHttp();
    const [form, setForm] = useState({username: "", password: ""});
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    useEffect( () => {
        clearError()
    });
    const handleFormSubmit = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        } catch (e) {}
    }
    return (
        <div className="position-relative testclass">
            <div className="mx-2 testclass2">
                <form className="text-center card"  >
                    <h1 className="h3 mb-3 fw-normal card-header">SIGN IN</h1>
                    <div className="card-body">
                    <input type="text"
                        name="username"
                        className="form-control mb-3"
                        placeholder="Username"
                        required
                        onChange={handleChange} />
                    <input type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        required
                        onChange={handleChange} />
                    <button
                        disabled={loading}
                        className="w-100 btn btn-lg btn-success"
                        type="submit"
                        onClick={handleFormSubmit}
                        > Sign up
                    </button>
                    </div>
                    <small className="my-1">
                        <a href="/reg" className="mx-1">Sign Up</a>
                        if you don't have an account.
                    </small>
                </form>
            </div>
        </div>
    );
}
