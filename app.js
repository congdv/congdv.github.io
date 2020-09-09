const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

// Serve js files
app.use('/js', express.static(path.join(__dirname, 'js/')));
// Serve css files
app.use('/css', express.static(path.join(__dirname, 'css/')));


app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname + "/index.html"));
})
app.listen(port, () => console.log(`The application is running on port ${port}`))
