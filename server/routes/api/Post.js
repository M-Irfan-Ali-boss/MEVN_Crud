const express = require('express');
const connection = require('../../config/db');

const router = express.Router();

//Database connected
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Database Connected');
});

//Get the Post
router.get('/', (req, res) => {
  const sql = 'SELECT * from posts';
  try {
    connection.query(sql, (err, data) => {
      if (err) throw err;
      else {
        res.status(201).json(data);
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Get single Post
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * from posts WHERE id = ?';
  try {
    connection.query(sql, [id], (err, post) => {
      if (err) throw err;
      else {
        res.status(201).json(post);
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Update the Post
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * from posts WHERE id = ?';
  try {
    connection.query(sql, [id], (err, post) => {
      if (err) throw err;
      else {
        if (post.length <= 0) {
          res.status(404).send('Post is not found');
        } else {
          const { text } = req.body;
          const createdDate = new Date();
          const updateSql = 'UPDATE posts SET text = ?, createdDate = ? WHERE id = ?';
          connection.query(updateSql, [text, createdDate, id], (err, result) => {
            if (err) throw err;
            else {
              res.status(201).send(`Post Updated with the id:${id}`);
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//Delete the Post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM `posts` WHERE id = ?';
  try {
    connection.query(sql, [id], (err, post) => {
      if (err) throw err;
      else {
        if (post.affectedRows <= 0) {
          res.status(404).send('Post is not found');
        } else {
          res.status(201).send(`Post is deleted with the id:${id}`);
        }
      }
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//Add the Post
router.post('/', (req, res) => {
  const { text } = req.body;
  const createdDate = new Date();
  try {
    const sql = 'INSERT INTO `posts`(`text`, `createdDate`) VALUES (?,?)';
    connection.query(sql, [text, createdDate], (err, result) => {
      if (err) throw err;
      else {
        connection.query('SELECT * from posts WHERE id = ?', result.insertId, function (error, response) {
          if (error) throw error;
          res.status(201).json(response);
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
