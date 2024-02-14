import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import AlertMessage from '../../../Components/AlertMessage';


function UpdateUser ({show, handleClose, id, fetchInfo}) {

  const [UserData, setUserData]=useState(
    {
        name:'',
        email:'',
        password:'',
        avatar:'',
    }
  ) 
  const [errorMessage, setErrorMessage]= useState('')
  const [successMessage, setSuccessMessage]= useState('')
  const [showAlert, setShowAlert] = useState(false);

  const userDataHandler=(e)=>{
   const name=e.target.name
   const value=e.target.value

   setUserData({
    ...UserData,
    [name]: value
   })
  }

  const handleSubmit = async (e) => {
     e.preventDefault()

     try {
        const FilteredForm = Object.fromEntries(
            Object.entries(UserData).filter(([_, valor]) => valor.length > 0)
          );

          await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, FilteredForm)
          setSuccessMessage('Account updated successfully!');
          fetchInfo()
          setShowAlert(true);
          handleClose()
     } catch (error) {
        setErrorMessage('An error occurred while updating the account.')
     }
   
  };



  return (

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" name="name" value={UserData.name} onChange={userDataHandler} placeholder='Your Name'/>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" name="email" value={UserData.email} onChange={userDataHandler} placeholder='example@email.com'/>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" name="password" value={UserData.password} onChange={userDataHandler} placeholder='example123'/>
          </div>

          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">Avatar:</label>
            <input type="text" className="form-control" id="avatar" name="avatar" value={UserData.avatar} onChange={userDataHandler} placeholder='URL' />
          </div>
        </form>

        {errorMessage.length? <p>{errorMessage}</p> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
           Update account
          </Button>
        </Modal.Footer>
      </Modal>

      <AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={successMessage} />
    </>
  );
}

export default UpdateUser