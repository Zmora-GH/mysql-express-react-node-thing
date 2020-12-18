import React, { useState } from 'react';

export const RegPage = () => {
    const [form, setForm] = useState({username: "", password: ""});
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };
    const handleFormSubmit = event => {
        //
    };

    return (
        <div className="position-relative testclass">
            <div className="mx-2 testclass2">
                <form className="text-center card" onSubmit={handleFormSubmit}>
                    <h1 className="h3 mb-3 fw-normal card-header">REG FORM</h1>
                    <div class="card-body">
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
                    <button className="w-100 btn btn-lg btn-success" type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
