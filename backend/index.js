// backend/index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let registros = [];

app.post('/api/registrar', async (req, res) => {
  const data = req.body;
  registros.push(data);
  console.log('Nuevo registro:', data);

  try {
    await axios.post(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        email: data.correo,
        name: `${data.nombre} ${data.apellido}`,
        fields: {
          empresa: data.empresa,
          cargo: data.cargo,
          telefono: data.telefono,
          tipoRegistro: data.tipoRegistro
        }
      },
      {
        headers: {
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ mensaje: 'Registro exitoso en MailerLite' });
  } catch (err) {
    console.error('Error MailerLite:', err.response?.data || err.message);
    res.status(500).json({ mensaje: 'Error al registrar en MailerLite' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
