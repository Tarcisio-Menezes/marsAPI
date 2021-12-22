const app = require('./app');
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT || 3003, () => console.log(`Online na porta ${PORT || 3003}`));
