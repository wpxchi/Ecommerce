const ValidationLogin = (input) => {
    let errors = {};
  
  
  
    // Validación del correo electrónico
    if (!input.email) {
      errors.email = "An email is required";
    }
  
    // Validación de la contraseña
    if (!input.password) {
      errors.password = "A password is required";
    } 
  
    return errors;
  };
  
  export default ValidationLogin;