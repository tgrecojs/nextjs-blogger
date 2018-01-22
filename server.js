const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/blog', (req, res) => app.render(req, res, '/'));

    server.get('/', (req, res) => res.redirect(301, '/blog'));

    server.get('/blog/:id', (req, res) => {
        return app.render(req, res, '/post', Object.assign({id: req.params.id}, req.query))
    });

    server.get('/post', (req, res) => {
        if(req.query.id) return res.redirect(`/blog/${req.query.id}`);
        res.redirect(301, '/blog');
    });

    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Read on http://localhost:${port}`);
    })
});

