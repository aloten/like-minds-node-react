const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();

// Init middleware
// app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/', require('./routes/router'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
