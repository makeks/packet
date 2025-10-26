



import { createServer } from 'node:http';
import fs from 'node:fs';
// import { error } from 'node:console';
import path from 'path';
import {url} from 'node:inspector'


function getPage(name){
    const outputFilePath = path.join(process.cwd(),`/src/templates${name}.html`)
    try{
    const data = fs.readFileSync(outputFilePath,'utf8')
    return data
    }catch(err){
    console.error(err);
    }
}

function getStaticFile(PathToFile){
    const outputFilePath = path.join(process.cwd(),`/src/static${PathToFile}`)
    try{
    const data = fs.readFileSync(outputFilePath,'utf8')
    return data
    }catch(err){
    console.error(err);
    }

}

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    console.log(req.url)
    if(req.url.startsWith('/static')){
        const staticObjPath = req.url.substring(7, req.url.length)
        const obj = getStaticFile(staticObjPath)
        res.statusCode = 200;
        res.end(obj);
        return
    }
    let html = '<div>404</div>'
    if (req.url === '/contacts'){
        html = getPage('contacts')
    }
    if (req.url === '/'){
        html = getPage('index')
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
}
);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
