const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // use pages/index.js as /blog
  server.get('/blog', (req, res) => {
    return app.render(req, res, '/', req.query)
  })

  // use pages/post.js as /blog/:id
  server.get('/blog/:id', (req, res) => {
    return app.render(req, res,'/post',
      Object.assign(
        {
          id: req.params.id,
          // post: req.params.content
        },
        req.query
      )
    )
  })

  // redirect from /post to /blog or /post?id to /blog/:id
  server.get('/post', (req, res) => {
    if (req.query.id) return res.redirect('/blog')
    res.redirect(301, `/blog/${req.query.id}`)
  })

  // redirect / to /blog
  server.get('/', (req, res) => {
    res.redirect(301, '/blog')
  })

  // handle each other url
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})