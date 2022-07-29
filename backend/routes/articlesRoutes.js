const express = require('express')
const router = express.Router()

const { getArticles, getArticle, setArticle, updateArticle, deleteArticle } = require('../controllers/articleController')

router.route('/').get(getArticles).post(setArticle)
router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle)

module.exports = router
