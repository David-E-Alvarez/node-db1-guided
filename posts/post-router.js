const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // get a list of posts from the database
  // select * from posts;
  db.select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json({ data: posts });
    })
    .catch(error => {
      // save it to a log somewhere
      console.log(error);
      res.status(500).json({ message: error.messsage });
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first() // pick the first record from the array
    .then(post => {
      if (post) {
        res.status(200).json({ data: post });
      } else {
        res.status(404).json({ message: "No posts by that ID" });
      }
    })
    .catch(error => {
      // save it to a log somewhere
      console.log(error);
      res.status(500).json({ message: error.messsage });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

  // a post must have title and contents
  if (isValidPost(post)) {
    // once you know the post is valid then try to save to the db
    db("posts")
      // there will be a warning in the console about .returnnin(), ignore it for SQLite
      .insert(post, "id")
      .then(ids => {
        res.status(201).json({ data: ids });
      })
      .catch(error => {
        // save the error to a log somewhere
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide title and contents for the post" });
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  // validate the data
  db("post")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      // the count is the number of records updated
      // if the count is 0, it means, the record was not found
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "record not found by that Id" });
      }
    })
    .catch(error => {
      // save the error to a log somewhere
      console.log(error);
      res.status(500).json({ message: error.messsage });
    });
});

router.delete("/:id", (req, res) => {
  db("post")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      // the count is the number of records updated
      // if the count is 0, it means, the record was not found
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "record not found by that Id" });
      }
    })
    .catch(error => {
      // save the error to a log somewhere
      console.log(error);
      res.status(500).json({ message: error.messsage });
    });
});

function isValidPost(post) {
  return Boolean(post.title && post.contents);
}

module.exports = router;
