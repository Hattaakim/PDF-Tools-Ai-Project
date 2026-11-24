/* Paperly — cache aset antarmuka untuk pemakaian offline.
   Dokumen pengguna tidak disimpan di sini; salinan dokumen ada di IndexedDB (lihat app.js). */
const CACHE_NAME='paperly-ui-v51';
const MAX_ENTRIES=120;
const MAX_AGE=30*24*60*60*1000;

const PRECACHE=[
  './','./index.html','./favicon.svg','./styles.css?v=51','./app.js?v=51',
  './vendor/pdf-lib.min.js','./vendor/pdf-lib-cantoo.min.js','./vendor/pdf.min.js',
  './vendor/pdf.worker.min.js','./vendor/fflate.js','./vendor/fontkit.umd.min.js',
  './vendor/sql-wasm.js','./vendor/sql-wasm.wasm','./vendor/srgb.icc',
  './vendor/qpdf-wasm/index.js','./vendor/qpdf-wasm/api.js','./vendor/qpdf-wasm/engine.js',
  './vendor/qpdf-wasm/errors.js','./vendor/qpdf-wasm/inline-executor.js','./vendor/qpdf-wasm/input.js',
  './vendor/qpdf-wasm/progress.js','./vendor/qpdf-wasm/protocol.js','./vendor/qpdf-wasm/transfer.js',
  './vendor/qpdf-wasm/types.js','./vendor/qpdf-wasm/wasm-loader.js','./vendor/qpdf-wasm/worker-handler.js',
  './vendor/qpdf-wasm/worker-pool.js','./vendor/qpdf-wasm/worker-url.js','./vendor/qpdf-wasm/worker.js',
  './vendor/qpdf-wasm/jobs/compress.js','./vendor/qpdf-wasm/jobs/decrypt.js','./vendor/qpdf-wasm/jobs/encrypt.js',
  './vendor/qpdf-wasm/jobs/info.js','./vendor/qpdf-wasm/jobs/job.js','./vendor/qpdf-wasm/jobs/linearize.js',
  './vendor/qpdf-wasm/jobs/merge.js','./vendor/qpdf-wasm/jobs/rotate.js','./vendor/qpdf-wasm/jobs/select-pages.js',
  './vendor/qpdf-wasm/jobs/split.js','./vendor/qpdf-wasm/wasm/qpdf.mjs','./vendor/qpdf-wasm/wasm/meta.mjs',
  './vendor/qpdf-wasm/wasm/qpdf.wasm'
];

function absolute(path){return new URL(path,self.registration.scope).href}

async function cacheResponse(cache,request,response){
  if(!response)return;
  try{
    if(response.type==='opaque'){
      await cache.put(request,response.clone());
      return;
    }
    if(response.status!==200)return;
    const headers=new Headers(response.headers);
    headers.set('x-paperly-cached-at',String(Date.now()));
    await cache.put(request,new Response(response.body,{status:response.status,statusText:response.statusText,headers}));
  }catch(error){}
}

async function trimCache(cache){
  try{
    const now=Date.now(),keys=await cache.keys(),fresh=[];
    for(const request of keys){
      let response=null;
      try{response=await cache.match(request)}catch(error){}
      const stored=response?Number(response.headers.get('x-paperly-cached-at')||0):0;
      if(stored&&now-stored>MAX_AGE){
        await cache.delete(request);
        continue;
      }
      fresh.push({request,stored});
    }
    if(fresh.length>MAX_ENTRIES){
      fresh.sort((a,b)=>a.stored-b.stored);
      for(const item of fresh.slice(0,fresh.length-MAX_ENTRIES))await cache.delete(item.request);
    }
  }catch(error){}
}

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await Promise.allSettled(PRECACHE.map(async path=>{
      try{
        const response=await fetch(absolute(path),{cache:'reload'});
        await cacheResponse(cache,new Request(absolute(path)),response);
      }catch(error){}
    }));
    await trimCache(cache);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('paperly-')&&key!==CACHE_NAME)
      .map(key=>caches.delete(key).catch(()=>{})));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='TRIM_CACHE')event.waitUntil(caches.open(CACHE_NAME).then(trimCache));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  let url;
  try{url=new URL(request.url)}catch(error){return}
  if(url.protocol!=='http:'&&url.protocol!=='https:')return;
  if(request.mode==='navigate'&&url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    let cached=null;
    try{cached=await cache.match(request)}catch(error){}
    const network=fetch(request).then(async response=>{
      await cacheResponse(cache,request,response.clone());
      return response;
    });
    if(request.mode==='navigate'){
      try{return await network}catch(error){}
      if(cached)return cached;
      return new Response('Konten tidak tersedia secara offline.',{status:503,statusText:'Offline'});
    }
    if(cached){
      network.catch(()=>{});
      return cached;
    }
    try{return await network}catch(error){}
    if(url.origin!==self.location.origin&&['style','font','image'].includes(request.destination)){
      return new Response('',{status:200,headers:{'content-type':request.destination==='style'?'text/css':'application/octet-stream'}});
    }
    return new Response('Konten tidak tersedia secara offline.',{status:503,statusText:'Offline'});
  })());
});
