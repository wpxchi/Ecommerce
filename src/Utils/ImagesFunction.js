const extractImages = (images) => {
  if (typeof images === 'string') {
    try {
      // Intenta analizar la cadena JSON
      const parsedImages = JSON.parse(images);

      // Verifica si es un array, si es así, devuelve el array
      if (Array.isArray(parsedImages)) {
        return parsedImages;
      }

      // Si no es un array, envuélvelo en un array y devuelve
      return [parsedImages];
    } catch (error) {
      // Si hay un error al analizar JSON, intenta manejar el patrón específico
      const regexPattern = /\["(.+)"\]/;
      const match = images.match(regexPattern);

      if (match && match[1]) {
        return [match[1]];
      }

      // Si no se puede manejar, devuelve la cadena original en un array
      return [images];
    }
  } else if (Array.isArray(images)) {
    if (images.length === 1) {
      try {
        // Intenta analizar la cadena JSON dentro del array
        const parsedImage = JSON.parse(images[0]);

        // Verifica si es un array, si es así, devuelve el array
        if (Array.isArray(parsedImage)) {
          return parsedImage;
        }

        // Si no es un array, envuélvelo en un array y devuelve
        return [parsedImage];
      } catch (error) {
        // Si hay un error al analizar JSON, intenta manejar el patrón específico
        const regexPattern = /\["(.+)"\]/;
        const match = images[0].match(regexPattern);

        if (match && match[1]) {
          return [match[1]];
        }

        // Si no se puede manejar, devuelve la cadena original en un array
        return [images[0]];
      }
    } else {
      // Si es un array con más de un elemento, devuélvelo como está
      return images;
    }
  }

  // Si no es ni cadena ni array, devuelve un array vacío
  return [];
};

export default extractImages;