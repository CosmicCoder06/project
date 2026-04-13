const express = require('express');

const {
    getPostsList, 
    addNewPost, 
    sendPostById,
    updatePost,
    patchPost,
    deletePost,
    putPost
    } = require('../controller/postsController');
const { get } = require('../app');

const router = express.Router();

router.get('/', getPostsList);

router.post('/', addNewPost);

router.get("/:id", sendPostById);

router.put("/:id", updatePost);

router.patch("/:id", patchPost);

router.delete("/:id", deletePost);

router.put("/:id", putPost);

module.exports = router;
