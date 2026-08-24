import http from 'node:http'
import { URL } from 'node:url'

const porta = 3000

const server = http.createServer()

const requisicao = (req, res) => {
    console.log(req.method, req.url)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 201

    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    if (req.method === 'GET' && urlObj.pathname === '/saudacao') {
        const nome = urlObj.searchParams.get('nome')
        return res.end(JSON.stringify({ nome: nome }))
    }

    else if (req.method === 'GET' && urlObj.pathname === '/status') {
        return res.end(JSON.stringify({ status: 'ok' }))
    }

    else if (req.method === 'GET' && urlObj.pathname === '/') {
        return res.end(JSON.stringify({
            data: 'Esta é a nossa página inicial'
        }))
    }



}

server.on('request', requisicao)

server.listen(porta, () => {
    console.log(` Servidor ouvindo na porta ${porta}`)
})