const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4500;

const posts = require('./routes/api/Post.js');

app.use('/api/posts', posts);

app.listen(PORT, () => console.log(`App listing to the port http://localhost:${PORT}`));
