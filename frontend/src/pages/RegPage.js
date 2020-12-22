import React, { useState, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook'

export const RegPage = () => {
    const {loading, request, clearError} = useHttp();
    const [form, setForm] = useState({username: "", password: "", email: ""});
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    useEffect( () => {
        clearError()
    });
    const handleFormSubmit = async () => {
        try {
            // eslint-disable-next-line
            const data = await request('/api/auth/register', 'POST', {...form})
            window.location.href = '/login'
        } catch (e) {}
    }
    return (
        <div className="position-relative testclass">
            <div className="mx-2 testclass2">
                <form className="text-center card" onSubmit={handleFormSubmit} >
                    <h1 className="h3 mb-3 fw-normal card-header">SIGN UP</h1>
                    <div className="card-body">
                    <input type="text"
                        name="username"
                        className="form-control mb-3"
                        placeholder="Username"
                        required
                        onChange={handleChange} />
                    <input type="email"
                        name="email"
                        className="form-control mb-3"
                        placeholder="Email"
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
                        > Sign up
                    </button>
                    </div>
                    <small className="my-1">
                        <a href="/login" className="mx-1">Sign in</a>
                        if you have an account.
                    </small>
                </form>
            </div>
        </div>
    );
}
