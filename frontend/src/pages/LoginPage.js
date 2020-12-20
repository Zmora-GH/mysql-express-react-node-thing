import React, { useState } from 'react';

const axios = require('axios');

export const LoginPage = () => {

    const [form, setForm] = useState({username: "", password: ""});
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        axios.post('/api/auth/login', {...form})
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
                }, 1800);
            }
        })

        event.preventDefault();
    }
    return (
        <div className="position-relative testclass">
            <div className="mx-2 testclass2">
                <form className="text-center card" onSubmit={handleFormSubmit}>
                    <h1 className="h3 mb-3 fw-normal card-header">LOGIN FORM</h1>
                    <div class="card-body">
                    <label className="visually-hidden">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control mb-3"
                        placeholder="Username"
                        required
                        onChange={handleChange}/>
                    <label className="visually-hidden">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        required
                        onChange={handleChange}/>
                    <button className="w-100 btn btn-lg btn-success" type="submit">Sign in</button>
                        <div className="position-absolute alert alert-danger hidden" role="alert" id="username-alert">
                            <small>User not found or invalid password</small>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
