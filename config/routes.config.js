const express = require('express');
const router = express.Router();

const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const secure = require("../middlewares/secure.middleware");

// Posts model CRUD Routes
router.post("/posts", secure.auth, posts.create);
router.get("/posts", secure.auth, posts.list);
router.get("/posts/:id", secure.auth, posts.detail);
router.patch("/posts/:id", secure.auth, secure.admin, posts.update);
router.delete("/posts/:id", secure.auth, posts.delete);

// User Model routes
router.post("/users", users.create);
router.post("/login", users.login);
router.get("/users/:id/validate", users.validate);

module.exports = router;
