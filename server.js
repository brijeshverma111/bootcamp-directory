const http = require('http');

let todos = [
    { id: 1, text: "Hello" },
    { id: 2, text: "Doctor" },
    { id: 2, text: "Strange" }
]

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Type','text/json')
    // res.setHeader('X-Powered-By','Node.js')
    // res.write("Hello")
    // console.log(headers, url, method)

    const { method, url } = req

    // writing with body using http module
    let body = [];
    req.on('data', chunk => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        
        let status = 404;
        const response = {
            success: false,
            data: null
        }
        
        if (method === 'GET' && url === '/todos') {
            status = 200;
            response.success = true;
            response.data = todos;
        }

        if (method === 'POST' && url === '/todos') {
            const {id, text } = JSON.parse(body);
            todos.push({id,text});
            status = 201;
            response.success = true;
            response.data = todos;
        }

        res.writeHead(status, {
            'Content-Type': 'text/json',
            'X-Powered-By': 'Node.js'
        })
        res.end(
            JSON.stringify({ response })
        )
    })


})
const PORT = 5000;
server.listen(PORT, () => { console.log(`listening on port ${PORT} ${JSON.stringify(process.versions)}`) })

