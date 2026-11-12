import {chromium} from '/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
if(fs.realpathSync(root)!=='/Volumes/EXTERNAL/海外落地页/client_uk_rc_contractors/docs')throw Error('ROOT');
const targets=[['local','https://www.earthstonemortar.co.uk/'],['industry','https://www.marshalls.co.uk/gardens-and-driveways'],['brickwork','https://www.londonbrickwork.co.uk/'],['current','https://apps.derbyshire.gov.uk/applications/trusted-trader/profile.asp?tid=62399']];
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const [id,url] of targets){const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:false});const page=await context.newPage();let status,error;
try{status=(await page.goto(url,{waitUntil:'domcontentloaded',timeout:20000}))?.status();await page.waitForTimeout(1500);}catch(e){error=e.message;}
const data=await page.evaluate(()=>({url:location.href,title:document.title,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.innerText).filter(Boolean).slice(0,20),excerpt:document.body.innerText.slice(0,2200),links:[...document.querySelectorAll('a[href]')].map(a=>({text:a.innerText.trim(),url:a.href})).filter(x=>x.text).slice(0,50)}));
fs.writeFileSync(path.join(root,'references',id+'.json'),JSON.stringify({requested:url,date:new Date().toISOString(),viewport:{width:1440,height:900},status,error,...data},null,2));await page.screenshot({path:path.join(root,'references',id+'.png')});console.log(JSON.stringify({id,status,error,title:data.title}));await context.close();}}finally{await browser.close();}
