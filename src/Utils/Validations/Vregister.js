 export const validateForm = (input) => {
    let errors = {};
  
    // Validación del nombre
    if (!input.name) {
      errors.name = "A name is required";
    } else if (input.name.length > 50) {
      errors.name = "Must be less than 50 characters";
    }
  
    // Validación del email
    if (!input.email) {
      errors.email = "An email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
      errors.email = "Invalid email address";
    } else if (input.email.length > 30) {
      errors.email = "Must be less than 30 characters";
    }
  
    // Validación de la contraseña
    if (!input.password) {
      errors.password = "A password is required";
    } else if (input.password.length < 6) {
      errors.password = "Must be at least 6 characters";
    } else if (!/\d/.test(input.password)) {
      errors.password = "Must contain at least one number";
    } else if (input.password.length > 16) {
      errors.password = "Must be less than 16 characters";
    }
  
    // Validación del avatar
    if (!input.avatar) {
      errors.avatar = "An avatar URL is required";
    } else if (!isValidURL(input.avatar)) {
      errors.avatar = "Invalid URL format for avatar";
    }
  
    return errors;
  };
  
  // Función para verificar el formato de la URL
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };