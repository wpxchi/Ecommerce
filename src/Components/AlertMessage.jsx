import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function AlertMessage({ showAlert, setShowAlert, alertMessage }) {
  if (showAlert) {
    return (
      <>
        <Alert show={showAlert} variant="success">
          <Alert.Heading>Rigth Market</Alert.Heading>
          <p>{alertMessage}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)} variant="outline-success">
              Close 
            </Button>
          </div>
        </Alert>
      </>
    );
  }
  return null;
}

export default AlertMessage;