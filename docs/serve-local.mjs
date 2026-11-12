import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root='/Volumes/EXTERNAL/海外落地页/client_uk_rc_contractors/demo';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
  let p;try{const u=new URL(req.url,'http://localhost');p=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(p===root)p=path.join(root,'index.html');}catch{res.writeHead(400);res.end();return;}
  if(!p.startsWith(root+path.sep)||!fs.existsSync(p)||!fs.statSync(p).isFile()){res.writeHead(404,{'content-type':'text/plain'});res.end('Page not found.');return;}
  res.writeHead(200,{'content-type':types[path.extname(p)]||'application/octet-stream','cache-control':'no-store'});if(req.method==='HEAD')res.end();else fs.createReadStream(p).pipe(res);
}).listen(0,'127.0.0.1',function(){console.log('LOCAL_PREVIEW_URL=http://127.0.0.1:'+this.address().port);});
