const { Router } = require('express')
const express = require('express')
const Article = require('./../models/article')

const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('articles/new')
})

router.get('/:slug', async (req, res)=>{
    const article = await Article.find({slug: req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show', {article:article})
})

router.post('/', async (req, res)=>{
    let article = new Article({
        title:req.body.title,
        description:req.body.description
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`, )
    }catch (e){
        res.render('articles/new', {article:article})
    }
})

// Router.post('/', async (req, res, next)=>{
//     req.article = new Article()
//     next()
// },saveArticleAndRedirect('new'))



function saveArticleAndRedirect(path) {
    return async (req, res)=>{
        let article = req.article
        article.title = req.body.title
        // article.createAt:req.body.createAt,
        article.description = req.body.description
        try{ 
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch (e){
            res.render(`articles/${path}`, {article:article})
        }
    }
}

module.exports = router