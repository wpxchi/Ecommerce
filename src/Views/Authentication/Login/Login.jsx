import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from '../Register/Register';
import { useNavigate } from 'react-router-dom';
import ValidationLogin from '../../../Utils/Validations/Vlogin';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [ErrorLogin, setErrorLogin] = useState({});
  const [show, setShow] = useState(false);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario de login
    const validationErrors = ValidationLogin(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrorLogin(validationErrors);
      return;
    }

    try {
      localStorage.setItem('email', form.email);
      const { data } = await axios.post('https://api.escuelajs.co/api/v1/auth/login', form);
      localStorage.setItem('access_token', data.access_token);

      navigate('/Profile');

      setForm({
        email: '',
        password: '',
      });
      setErrorLogin({});
    } catch (error) {
      setError('Incorrect credentials');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className={`form-control ${ErrorLogin.email ? 'is-invalid' : ''}`}
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="example@example.com"
            />
            {ErrorLogin.email && <div className="invalid-feedback">{ErrorLogin.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className={`form-control ${ErrorLogin.password ? 'is-invalid' : ''}`}
              name="password"
              value={form.password}
              onChange={handleFormChange}
              placeholder="Your Password"
            />
            {ErrorLogin.password && <div className="invalid-feedback">{ErrorLogin.password}</div>}
          </div>
          <div className="form-text">We'll never share your information with anyone else.</div>
          <button type="submit" className="btn btn-custom">
            Submit
          </button>
          <div style={{ color: 'red', fontSize: '14px' }}>
            <p>{error}</p>
          </div>
        </form>
        <div className="mt-4">
          <p>You do not have an account? Create One</p>
          <button onClick={handleShow} className="btn btn-custom-outline">
            Create Account
          </button>
        </div>
        <Register show={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Login;