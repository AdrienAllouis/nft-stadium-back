const asyncHandler = require('express-async-handler')
const Article = require('../models/articleModel')

const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find()

  res.status(200).json(articles)
})

const setArticle = asyncHandler(async (req, res) => {
  if(!req.body.title || !req.body.content || !req.body.author || !req.body.category) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const article = await Article.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author
  })

  res.status(200).json(article)
})

const updateArticle = asyncHandler(async (req, res) => {
  const article = Article.findById(req.params.id)

  if(!article) {
    res.status(400)
    throw new Error('Article not found')
  }

  const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedArticle)
})

const deleteArticle = asyncHandler(async (req, res) => {
  const article = Article.findById(req.params.id)

  if(!article) {
    res.status(400)
    throw new Error('Article not found')
  }

  await article.remove()

  res.status(200).json({ message: `Delete articles ${req.params.id}` })
})

module.exports = {
  getArticles,
  setArticle,
  updateArticle,
  deleteArticle
}