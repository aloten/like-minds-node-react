const express = require('express');
const app = express();
const PORT = 5000;

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/', require('./routes/messages'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
