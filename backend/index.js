require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/registrar', async (req, res) => {
  const data = req.body;
  console.log('Registro recibido:', data);

  try {
    await axios.post(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        email: data.correo,
        name: `${data.nombre} ${data.apellido}`,
        fields: {
          empresa: data.empresa,
          cargo: data.cargo,
          telefono: data.telefono
        }
      },
      {
        headers: {
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error('Error registrando:', err.response?.data || err.message);
    res.status(500).json({ mensaje: 'Error al registrarse' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
