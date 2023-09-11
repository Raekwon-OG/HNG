const http = require('http');
const url = require('url')
const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const port = process.env.PORT || 3000;



const responseObj = {
    'slack_name':`Demi_Brown`, 
    'current_day': `${new Date().toLocaleDateString('en-us',{weekday:'long'})}`,
    'utc_time': `${new Date().toISOString().split('.')[0]}Z`,
    'track':`backend`,
    'github_file_url': `https://github.com/Raekwon-OG/track-backend/blob/main/stage1/server.js`,
    'github_repo_url': `https://github.com/Raekwon-OG/track-backend/tree/main/stage1`,
    'status_code': 200
}

const server =  http.createServer((req,res) => {
    let {query,pathname:path} = url.parse(req.url,true)
    if (path === '/api'){
        if ((query.slack_name == responseObj.slack_name) && (query.track == responseObj.track)){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(JSON.stringify(responseObj))
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write("Please provide 'slack_name' and 'track' parameters")
        }
    };
    res.end();
})

server.listen(port);