import React, { useState } from 'react';
import './Form.css';

function App() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    empresa: '',
    cargo: '',
    telefono: '',

  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setFormulario({ ...formulario, tipoRegistro: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario)
    });

    if (res.ok) {
      alert('¡Te registraste al webinar!');
      setFormulario({
        nombre: '', apellido: '', correo: '', empresa: '',
        cargo: '', telefono: ''
      });
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <div className="overlay">
          <p>WEBINAR ONLINE</p>
          <h1>Business Intelligence y AI en SAP Business One</h1>
          <div className="date-box">17 de julio, 2025 | 10:00 am (Hora Ecuador) </div>
        </div>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Formulario de Registro</h2>

    

        <div className="form-group">
          <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} required />
          <input type="text" name="apellido" placeholder="Apellido" value={formulario.apellido} onChange={handleChange} required />
        </div>

        <input type="email" name="correo" placeholder="Correo electrónico corporativo" value={formulario.correo} onChange={handleChange} required />
        <input type="text" name="empresa" placeholder="Empresa" value={formulario.empresa} onChange={handleChange} required />
        <input type="text" name="cargo" placeholder="Cargo o rol en la empresa" value={formulario.cargo} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Número de teléfono (opcional)" value={formulario.telefono} onChange={handleChange} />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default App;
