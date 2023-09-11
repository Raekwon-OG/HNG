const http = require('http');
const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const port = process.env.PORT || 3000;


const server =  http.createServer((req,res) => {
    if (req.url === '/api'){
     res.write(JSON.stringify({
        'slack_name':`Demi_Brown`, 
        'current_day': `${weekday[new Date().getDay()]}`,
        'utc_time': `${new Date().toISOString().split('.')[0]}Z`,
        'track':`backend`,
        'github_file_url': ``,
        'github_repo_url': ``,
        'status_code': 200
    }))
    };
    res.end();
})

server.listen(port);