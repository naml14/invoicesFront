import React from 'react';
import Button from '@mui/joy/Button';
import axios from 'axios';

function DeleteRowButton({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      // Realiza la solicitud DELETE a la API con Axios
      await axios.delete(`https://backend-invoice.onrender.com/api/v0/proyectos/${id}`);
      
      // Llama a la función onDelete para eliminar la fila de la interfaz
      onDelete(id);
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  return (
    <Button
      size="s"
      variant="outlined"
      color="danger"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

export default DeleteRowButton;
