import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import AlertMessage from '../../../Components/AlertMessage';
import { validateForm } from '../../../Utils/Validations/Vregister';

function Register({ show, handleClose }) {
  const [UserData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pinimg.com/736x/87/67/64/8767644bc68a14c50addf8cb2de8c59e.jpg',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorForm, setErrorForm] = useState({});

  const userDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...UserData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    const validationErrors = validateForm(UserData);
    if (Object.keys(validationErrors).length > 0) {
      setErrorForm(validationErrors);
      return;
    }

    try {
      const emailAvailabilityResponse = await axios.post(
        'https://api.escuelajs.co/api/v1/users/is-available',
        { email: UserData.email }
      );
      if (!emailAvailabilityResponse.data.isAvailable) {
        const createUserResponse = await axios.post(
          'https://api.escuelajs.co/api/v1/users/',
          UserData
        );
        setSuccessMessage('Account created successfully!');
        setShowAlert(true);
        setErrorForm({});
        handleClose();

        // Restablecer los valores del formulario después de enviar correctamente
        setUserData({
          name: '',
          email: '',
          password: '',
          avatar: 'https://i.pinimg.com/736x/87/67/64/8767644bc68a14c50addf8cb2de8c59e.jpg',
        });
      } else {
        setErrorMessage('Email is not available.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating the account.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className={`form-control ${errorForm.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={UserData.name}
                onChange={userDataHandler}
                placeholder="Your Name"
              />
              {errorForm.name && <div className="invalid-feedback">{errorForm.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className={`form-control ${errorForm.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={UserData.email}
                onChange={userDataHandler}
                placeholder="example@email.com"
              />
              {errorForm.email && <div className="invalid-feedback">{errorForm.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className={`form-control ${errorForm.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={UserData.password}
                onChange={userDataHandler}
                placeholder="example123"
              />
              {errorForm.password && <div className="invalid-feedback">{errorForm.password}</div>}
            </div>
          </form>
          {errorMessage.length ? <p className="text-danger">{errorMessage}</p> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>

      <AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={successMessage} />
    </>
  );
}

export default Register;