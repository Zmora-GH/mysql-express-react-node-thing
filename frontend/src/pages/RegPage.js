import React, { useState } from 'react';
// import {useHttp} from '../hooks/http.hook'

const axios = require('axios');

export const RegPage = () => {
    // const {loading, request, error} = useHttp();
    const [form, setForm] = useState({username: "", password: "", email: ""});
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        axios.post('/api/auth/register', {...form})
        .then(function (resp) {
            if (resp.status === 201) {
                window.location.replace("/");
            };
        })
        .catch(function (err) {
            if (err.response.status === 400) {
                let usernameAlert = document.getElementById('username-alert')
                usernameAlert.classList.remove('hidden')
                setTimeout(() => {
                    usernameAlert.classList.add('hidden')
                }, 1000);
            }
        })

        event.preventDefault();
    }
    return (
        <div className="position-relative testclass">
            <div className="mx-2 testclass2">
                <form className="text-center card" onSubmit={handleFormSubmit} >
                    <h1 className="h3 mb-3 fw-normal card-header">REG FORM</h1>
                    <div className="card-body">
                    <input type="text"
                        name="username"
                        className="form-control mb-3"
                        placeholder="Username"
                        required
                        onChange={handleChange} />
                    <div className="position-absolute alert alert-danger hidden" role="alert" id="username-alert">
                        This name is already in use!
                    </div>
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
