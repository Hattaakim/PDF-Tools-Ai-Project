/* Paperly — all document processing happens locally in this browser. */
const { PDFDocument, rgb, degrees, StandardFonts, PDFName, PDFDict, PDFArray, PDFNumber, PDFString, PDFRawStream } = PDFLib;
const { PDFDocument: CantooPDFDocument } = globalThis.PDFLibCantoo;
pdfjsLib.GlobalWorkerOptions.workerSrc = './vendor/pdf.worker.min.js';
const icons={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',wand:'<path d="m15 4 5 5M4 20 17 7M7 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM18 15l1.5 3.5L23 20l-3.5 1.5L18 25l-1.5-3.5L13 20l3.5-1.5L18 15Z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.1 8.1 12 12M14.8 9.2 20 4M8 16l4-4"/>',compress:'<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3M8 8l3 3m5-3-3 3m0 2-3 3m8-3-3 3"/>',merge:'<path d="M7 3H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2m10-9h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 12h10M9 8l-4 4 4 4m6-8 4 4-4 4"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',rotate:'<path d="M20 11a8 8 0 0 0-14-5L4 8"/><path d="M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2"/><path d="M20 20v-4h-4"/>',extract:'<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3"/>',number:'<path d="M9 4h3v16H9M5 8h2M5 16h2M16 8h3m-3 8h3m-3 0 3-4-3-4"/>',watermark:'<path d="M4 20h16M6 17 17 6l3 3L9 20H6v-3Z"/><path d="m14 9 3 3"/>',shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',zap:'<path d="m13 2-3 8h7l-6 12 2-9H6l7-11Z"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2"/>',heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.3 1.7c-1.2 1.1-1.9 1.4-1.9 3M12 17h.01"/>',ocr:'<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 19.5V17"/><path d="M8 10h8M8 13.5h8M8 17h5"/>',unlock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.7-1.5M12 14.5v3"/>',redact:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M6.5 10.5h11" stroke-width="3"/><path d="M6.5 15h7"/>',flatten:'<path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"/><path d="m4 12.5 8 4.5 8-4.5"/><path d="m4 17 8 4.5 8-4.5"/>',edit:'<path d="m4 20h4L19.5 8.5a2.12 2.12 0 0 0-3-3L5 17l-1 3Z"/><path d="m13.5 6.5 3 3"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',sparkles:'<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3ZM19 14l1.2 3.3L23 18.5l-2.8 1.2L19 23l-1.2-3.3-2.8-1.2 2.8-1.2L19 14Z"/>',check:'<path d="m5 12 4 4L19 6"/>',upload:'<path d="M12 16V4m0 0L8 8m4-4 4 4M4 16v4h16v-4"/>',sheet:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M15 9v11M3 14h18"/>',docwrite:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',worddoc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6"/><path d="M8 12h8M8 16h5"/>',slides:'<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M12 16v3M8 21h8"/><path d="M8 8h8M8 11h5"/>'};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.wand}</svg>`}
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon)});
const themeToggle=document.getElementById('themeToggle'),themePreference=window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme){document.documentElement.dataset.theme=theme;document.body.dataset.theme=theme;themeToggle.querySelector('.theme-toggle-icon').textContent=theme==='dark'?'☀':'☾';themeToggle.setAttribute('aria-label',theme==='dark'?'Aktifkan mode terang':'Aktifkan mode gelap');themeToggle.title=theme==='dark'?'Mode terang':'Mode gelap';document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#1c1811':'#efe9dd'}
let savedTheme=null;try{savedTheme=localStorage.getItem('paperly-theme')}catch{}applyTheme(savedTheme==='light'||savedTheme==='dark'?savedTheme:(themePreference.matches?'dark':'light'));
themeToggle.addEventListener('click',()=>{const next=document.body.dataset.theme==='dark'?'light':'dark';applyTheme(next);try{localStorage.setItem('paperly-theme',next)}catch{}});
themePreference.addEventListener?.('change',event=>{let saved=null;try{saved=localStorage.getItem('paperly-theme')}catch{}if(!saved)applyTheme(event.matches?'dark':'light')});
const tools=[
{id:'split',title:'Pisah PDF',description:'Pisahkan halaman atau rentang jadi file PDF baru.',detail:'Pilih halaman atau rentang halaman yang ingin dijadikan file PDF baru.',icon:'scissors',color:'lilac',tag:'POPULER',input:'pdf',action:'Pisahkan PDF'},
{id:'compress',title:'Kompres PDF',description:'Kecilkan ukuran file tanpa mengubah halaman menjadi gambar.',detail:'Optimalkan struktur dan kompresi PDF tanpa merasterisasi halaman. Teks tetap bisa dipilih; jika hasilnya lebih besar, file asli akan dipertahankan.',icon:'compress',color:'mint',tag:'POPULER',input:'pdf',action:'Kompres PDF'},
{id:'merge',title:'Gabungkan PDF',description:'Satukan beberapa dokumen dalam satu file.',detail:'Tambah minimal dua file PDF. Urutan file di bawah menentukan urutan halaman.',icon:'merge',color:'peach',tag:'',input:'pdf-multiple',action:'Gabungkan PDF'},
{id:'images',title:'Gambar ke PDF',description:'Ubah foto atau gambar menjadi PDF praktis.',detail:'Pilih satu atau beberapa gambar. Setiap gambar akan menjadi satu halaman PDF.',icon:'image',color:'blue',tag:'',input:'images',action:'Buat PDF'},
{id:'rotate',title:'Putar halaman',description:'Perbaiki orientasi halaman dengan sekali klik.',detail:'Putar semua halaman PDF searah atau berlawanan jarum jam.',icon:'rotate',color:'yellow',tag:'',input:'pdf',action:'Putar halaman'},
{id:'extract',title:'Ekstrak halaman',description:'Ambil halaman pilihan dari dokumen Anda.',detail:'Simpan halaman tertentu sebagai satu file PDF baru. Contoh: 1, 3-5, 8.',icon:'extract',color:'lilac',tag:'',input:'pdf',action:'Ekstrak halaman'},
{id:'number',title:'Nomor halaman',description:'Tambahkan nomor halaman yang rapi dan konsisten.',detail:'Tambahkan nomor di bagian bawah setiap halaman PDF.',icon:'number',color:'rose',tag:'BARU',input:'pdf',action:'Tambah nomor'},
{id:'watermark',title:'Tanda air',description:'Beri label sederhana untuk menandai dokumen.',detail:'Tambahkan teks tanda air transparan ke setiap halaman PDF.',icon:'watermark',color:'blue',tag:'',input:'pdf',action:'Tambah tanda air'},
{id:'ocr',title:'OCR PDF',description:'Ubah tulisan di PDF pindaian jadi teks.',detail:'Baca tulisan pada halaman PDF lewat OCR langsung di perangkat Anda. Hasilnya file teks yang bisa dicari dan disalin.',icon:'ocr',color:'mint',tag:'BARU',input:'pdf',action:'Jalankan OCR'},
{id:'protect',title:'Enkripsi PDF',description:'Kunci PDF dengan kata sandi.',detail:'Tambah kata sandi agar hanya pemegang sandi yang bisa membuka PDF. Diproses lokal dengan enkripsi AES-256.',icon:'lock',color:'rose',tag:'BARU',input:'pdf',action:'Kunci PDF'},
{id:'unlock',title:'Buka kunci PDF',description:'Lepas kata sandi dari PDF milik Anda.',detail:'Masukkan kata sandi PDF terkunci untuk membuat salinan tanpa proteksi. Gunakan hanya pada file yang Anda miliki.',icon:'unlock',color:'blue',tag:'BARU',input:'pdf',action:'Buka kunci'},
{id:'redact',title:'Redact PDF',description:'Hapus permanen informasi rahasia.',detail:'Tandai teks atau grafis sensitif dengan blok, lalu halaman yang ditandai dirender ulang sebagai gambar sehingga konten di balik blok benar-benar hilang — bukan sekadar ditutupi. Halaman tanpa tanda tetap asli.',icon:'redact',color:'rose',tag:'BARU',input:'pdf',action:'Buka redaksi'},
{id:'flatten',title:'Flatten PDF',description:'Kunci teks, formulir, dan anotasi secara permanen.',detail:'Semua halaman dirender ulang pada resolusi tinggi (sekitar 216 DPI), sehingga teks tidak bisa dipilih atau disunting lagi, formulir dan anotasi menyatu permanen dengan halaman, dan tampilan tetap tajam saat dibuka di pembaca PDF.',icon:'flatten',color:'lilac',tag:'BARU',input:'pdf',action:'Flatten PDF'},
{id:'edit',title:'Edit PDF',description:'Tambah tulisan, gambar, dan coretan.',detail:'Tulis teks, tempel gambar, dan gambar bebas di atas halaman PDF, lalu unduh hasilnya. Halaman asli tetap utuh.',icon:'edit',color:'peach',tag:'BARU',input:'pdf',action:'Buka editor'},
{id:'doc',title:'Pembuat PDF',description:'Tulis dokumen baru dari halaman kosong.',detail:'Editor bergaya aplikasi pengolah kata: ukuran kertas, orientasi, margin, kolom untuk teks terpilih, inden, spasi, perataan justify, gambar, dan halaman tambahan — diekspor jadi PDF rapi.',icon:'docwrite',color:'blue',tag:'BARU',input:'blank',action:'Buat PDF'},
{id:'sheet',title:'PDF Sheet',description:'Hitung data dalam tabel seperti spreadsheet.',detail:'Grid spreadsheet lengkap dengan formula bar, variabel, rumus SUM/AVERAGE/IF, border, format angka, dan ekspor PDF. Semua perhitungan berjalan lokal di browser.',icon:'sheet',color:'mint',tag:'BARU',input:'blank',action:'Buka sheet'},
{id:'database',title:'Database File',description:'Kelola data SQLite seperti spreadsheet.',detail:'Buka file .db yang sudah ada atau buat database baru lewat wizard ramah pemula. Sunting tabel dalam tampilan spreadsheet, simpan kembali sebagai .db, atau ekspor isinya ke PDF.',icon:'database',color:'yellow',tag:'BARU',input:'blank',action:'Buka database'},
{id:'toWord',title:'PDF ke Word',description:'Ubah PDF jadi dokumen Word (.docx).',detail:'Teks di PDF dibaca per baris menjadi dokumen Word yang bisa diedit, lengkap dengan pemisah halaman asli.',icon:'worddoc',color:'mint',tag:'BARU',input:'pdf',action:'Konversi ke Word'},
{id:'toPpt',title:'PDF ke PowerPoint',description:'Ubah PDF jadi presentasi (.pptx).',detail:'Setiap halaman PDF menjadi satu slide utuh di PowerPoint dengan tata letak asli yang dipertahankan.',icon:'slides',color:'peach',tag:'BARU',input:'pdf',action:'Konversi ke PPT'},
{id:'pdfa',title:'Konversi ke PDF/A',description:'Siapkan PDF untuk penyimpanan jangka panjang.',detail:'Tambahkan profil warna sRGB, output intent, dan metadata PDF/A-2b. Hasil tetap perlu divalidasi untuk memastikan seluruh persyaratan arsip sesuai dengan isi dokumen.',icon:'shield',color:'blue',tag:'BARU',input:'pdf',action:'Buat PDF/A'},
{id:'toJpg',title:'PDF ke JPG',description:'Simpan halaman PDF sebagai gambar JPG.',detail:'Pilih semua halaman, tulis rentang tertentu, atau klik halaman pada pratinjau besar. Satu halaman akan diunduh langsung; beberapa halaman dikemas dalam ZIP.',icon:'image',color:'yellow',tag:'BARU',input:'pdf',action:'Konversi ke JPG'}
];
let activeTool=null, selectedFiles=[], toastTimer, processedPreviewUrl=null, processedPreviewBlob=null, processedPreviewName='', processRun=0;
/* Pratinjau hasil dirender dengan PDF.js ke kanvas agar tetap tampil di perangkat/webview yang tidak memiliki PDF viewer bawaan. */
const processedPreviewState={doc:null,page:0,pages:0,token:0,zoom:1,renderTask:null};
const PROCESSED_PREVIEW_ZOOMS=[1,1.5,2];
function processedPreviewParts(){return {preview:document.getElementById('processedPreview'),stage:document.getElementById('processedPreviewStage'),status:document.getElementById('processedPreviewStatus'),zoom:document.getElementById('processedPreviewZoom'),error:document.getElementById('processedPreviewError'),prev:document.querySelector('[data-preview-page="-1"]'),next:document.querySelector('[data-preview-page="1"]'),zoomOut:document.querySelector('[data-preview-zoom="-1"]'),zoomIn:document.querySelector('[data-preview-zoom="1"]')}}
function updateProcessedPreviewChrome(label){const p=processedPreviewParts(),s=processedPreviewState;if(p.status)p.status.textContent=typeof label==='string'?label:s.pages?`Halaman ${s.page} / ${s.pages}`:'Memuat…';if(p.zoom)p.zoom.textContent=Math.round(s.zoom*100)+'%';if(p.prev)p.prev.disabled=!s.pages||s.page<=1;if(p.next)p.next.disabled=!s.pages||s.page>=s.pages;if(p.zoomOut)p.zoomOut.disabled=!s.doc||s.zoom<=PROCESSED_PREVIEW_ZOOMS[0];if(p.zoomIn)p.zoomIn.disabled=!s.doc||s.zoom>=PROCESSED_PREVIEW_ZOOMS[PROCESSED_PREVIEW_ZOOMS.length-1]}
function releaseProcessedPreview(){const s=processedPreviewState;s.token++;if(s.renderTask){try{s.renderTask.cancel()}catch(e){}s.renderTask=null}if(s.doc){try{s.doc.destroy()}catch(e){}s.doc=null}s.page=0;s.pages=0;s.zoom=1;if(processedPreviewUrl){URL.revokeObjectURL(processedPreviewUrl);processedPreviewUrl=null}processedPreviewBlob=null;processedPreviewName=''}
function resetProcessedPreview(){releaseProcessedPreview();const p=processedPreviewParts(),button=document.getElementById('modalAction');if(p.preview)p.preview.hidden=true;if(p.stage)p.stage.innerHTML='';if(p.error){p.error.hidden=true;p.error.textContent=''}if(p.status)p.status.textContent='Memuat…';if(button&&activeTool&&['merge','extract','rotate'].includes(activeTool.id)){button.disabled=false;button.innerHTML=`<span>${activeTool.action}</span><span>↗</span>`}updateProcessedPreviewChrome('Memuat…');hideProgress()}
function showProcessedPreviewError(message){const p=processedPreviewParts(),s=processedPreviewState;if(s.renderTask){try{s.renderTask.cancel()}catch(e){}s.renderTask=null}if(s.doc){try{s.doc.destroy()}catch(e){}s.doc=null}if(p.error){p.error.hidden=false;p.error.textContent=message}if(p.stage)p.stage.innerHTML='<div class="processed-preview-placeholder">Pratinjau tidak tersedia</div>';s.pages=0;s.page=0;updateProcessedPreviewChrome('Pratinjau tidak tersedia')}
async function loadProcessedPreviewDocument(token){const s=processedPreviewState,blob=processedPreviewBlob;try{if(!blob)return;const bytes=new Uint8Array(await blob.arrayBuffer());if(token!==s.token)return;const doc=await pdfjsLib.getDocument({data:bytes}).promise;if(token!==s.token){try{doc.destroy()}catch(e){}return}s.doc=doc;s.pages=doc.numPages;s.page=1;updateProcessedPreviewChrome();await renderProcessedPreviewPage(1,token)}catch(e){if(token!==s.token)return;showProcessedPreviewError('Pratinjau PDF tidak dapat ditampilkan di perangkat ini. File hasil tetap bisa disimpan dengan tombol Simpan.')}}
async function renderProcessedPreviewPage(pageNo,token=processedPreviewState.token){const s=processedPreviewState,p=processedPreviewParts();if(!s.doc||token!==s.token)return;const target=Math.max(1,Math.min(s.pages,pageNo));updateProcessedPreviewChrome(`Memuat halaman ${target}…`);try{const page=await s.doc.getPage(target);if(token!==s.token)return;const base=page.getViewport({scale:1}),stageWidth=(p.stage?p.stage.clientWidth:0)||(p.preview?p.preview.clientWidth:0)||360;const cssWidth=Math.max(160,stageWidth-32)*s.zoom,cssHeight=cssWidth*base.height/base.width,dpr=Math.min(window.devicePixelRatio||1,2),viewport=page.getViewport({scale:cssWidth/base.width*dpr});if(s.renderTask){try{s.renderTask.cancel()}catch(e){}s.renderTask=null}let canvas=p.stage?p.stage.querySelector('canvas.processed-preview-canvas'):null;if(!canvas&&p.stage){p.stage.innerHTML='';canvas=document.createElement('canvas');canvas.className='processed-preview-canvas';p.stage.appendChild(canvas)}if(!canvas)throw Error('Kanvas pratinjau tidak tersedia.');const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Browser tidak dapat menyiapkan kanvas pratinjau.');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);canvas.style.width=cssWidth+'px';canvas.style.height=cssHeight+'px';canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`Halaman ${target} dari ${s.pages}`);ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);s.renderTask=page.render({canvasContext:ctx,viewport,background:'#ffffff'});await s.renderTask.promise;s.renderTask=null;if(token!==s.token)return;s.page=target;if(p.stage)p.stage.scrollTop=0;updateProcessedPreviewChrome()}catch(e){if(token!==s.token||e&&e.name==='RenderingCancelledException')return;showProcessedPreviewError('Halaman pratinjau gagal ditampilkan. File hasil tetap bisa disimpan dengan tombol Simpan.')}}
function showProcessedPreview(data,name){releaseProcessedPreview();processedPreviewBlob=new Blob([data instanceof Blob?data:new Uint8Array(data)],{type:'application/pdf'});processedPreviewName=name;processedPreviewUrl=URL.createObjectURL(processedPreviewBlob);const p=processedPreviewParts(),button=document.getElementById('modalAction'),token=processedPreviewState.token;if(p.error){p.error.hidden=true;p.error.textContent=''}if(p.stage)p.stage.innerHTML='<div class="processed-preview-placeholder">Menyiapkan pratinjau…</div>';if(p.preview){p.preview.hidden=false;requestAnimationFrame(()=>p.preview.scrollIntoView({block:'center',behavior:'smooth'}))}if(button){button.disabled=false;button.classList.remove('loading');button.innerHTML='<span>Simpan</span><span>↓</span>'}updateProcessedPreviewChrome();setProgress(100,'PDF siap diperiksa');loadProcessedPreviewDocument(token)}
const grid=document.getElementById('toolsGrid'),modal=document.getElementById('toolModal'),fileInput=document.getElementById('fileInput');
function resetPreviewOnOptionChange(e){if(!processedPreviewBlob||!activeTool)return;if(activeTool.id==='extract'&&e.target.id==='rangeField')resetProcessedPreview();if(activeTool.id==='rotate'&&e.target.name==='rotation')resetProcessedPreview()}
document.getElementById('modalContent').addEventListener('input',resetPreviewOnOptionChange);
document.getElementById('modalContent').addEventListener('change',resetPreviewOnOptionChange);
document.getElementById('modalContent').addEventListener('click',e=>{if(processedPreviewBlob&&activeTool&&activeTool.id==='rotate'&&e.target.closest('.option-chip'))resetProcessedPreview()});
document.getElementById('modalContent').addEventListener('click',e=>{const pageButton=e.target.closest('[data-preview-page]');if(pageButton){const s=processedPreviewState;if(!s.doc||pageButton.disabled)return;const next=Math.max(1,Math.min(s.pages,s.page+(+pageButton.dataset.previewPage)));if(next!==s.page)renderProcessedPreviewPage(next,s.token);return}const zoomButton=e.target.closest('[data-preview-zoom]');if(zoomButton){const s=processedPreviewState;if(!s.doc||zoomButton.disabled)return;const idx=PROCESSED_PREVIEW_ZOOMS.indexOf(s.zoom),nextIdx=Math.max(0,Math.min(PROCESSED_PREVIEW_ZOOMS.length-1,(idx<0?0:idx)+(+zoomButton.dataset.previewZoom)));if(PROCESSED_PREVIEW_ZOOMS[nextIdx]!==s.zoom){s.zoom=PROCESSED_PREVIEW_ZOOMS[nextIdx];updateProcessedPreviewChrome();renderProcessedPreviewPage(s.page,s.token)}}});
let processedPreviewResizeTimer;
window.addEventListener('resize',()=>{const s=processedPreviewState,p=processedPreviewParts();if(!s.doc||!p.preview||p.preview.hidden)return;clearTimeout(processedPreviewResizeTimer);processedPreviewResizeTimer=setTimeout(()=>renderProcessedPreviewPage(s.page,s.token),150)});
const toolGroups=[
{id:'tulis',title:'Tulis & Sunting',description:'Buat dokumen baru dari nol, kelola data, atau beri catatan di atas PDF.',ids:['doc','sheet','database','edit']},
{id:'kelola',title:'Kelola Halaman',description:'Susun, pisahkan, dan rapikan halaman dokumen Anda.',ids:['split','merge','extract','rotate','number']},
{id:'optimal',title:'Optimasi & Keamanan',description:'Kecilkan ukuran file dan lindungi dokumen.',ids:['compress','protect','unlock','redact','flatten','watermark']},
{id:'konversi',title:'Konversi Dokumen',description:'Ubah PDF ke format lain dan siapkan dokumen untuk arsip.',ids:['toWord','toPpt','pdfa','toJpg','ocr','images']}
];
function toolCard(t,i=0,noAnim=false){return `<button class="tool-card" data-tool="${t.id}" style="--i:${i}${noAnim?';animation:none':''}"><span class="tool-top"><span class="tool-icon ${t.color}">${icon(t.icon)}</span><span class="tool-arrow">↗</span></span>${t.tag?`<span class="tool-tag ${t.tag==='BARU'?'new':''}">${t.tag}</span>`:''}<h3>${t.title}</h3><p>${t.description}</p></button>`}
function renderTools(filter='',isFilter=false){const q=filter.toLowerCase();let total=0;const html=toolGroups.map(g=>{const found=g.ids.map(id=>tools.find(t=>t.id===id)).filter(t=>(t.title+' '+t.description).toLowerCase().includes(q));total+=found.length;if(!found.length)return '';return `<section class="tool-group"><header class="tool-group-head"><div><h3>${g.title}</h3><p>${g.description}</p></div><span class="tool-group-count">${found.length} alat</span></header><div class="tool-group-grid">${found.map((t,i)=>toolCard(t,i,isFilter)).join('')}</div></section>`}).join('');grid.innerHTML=total?html:'<div class="empty-search">Tidak ada alat yang cocok. Coba kata kunci lain.</div>';grid.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>{setSidebarOpen(false);openTool(b.dataset.tool)}));if(isFilter&&canAnimate()&&typeof grid.animate==='function')grid.animate([{opacity:.62},{opacity:1}],{duration:180,easing:'ease-out'})}renderTools();
function showToast(message){let el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function formatBytes(n){if(n<1024)return n+' B';if(n<1048576)return (n/1024).toFixed(0)+' KB';return (n/1048576).toFixed(2)+' MB'}
const BATCH_TOOLS=['compress','number','watermark','protect','unlock','ocr'];
function openTool(id){processRun++;hideProgress();if(id==='doc'){openDocPage();return}if(id==='sheet'){if(modal.classList.contains('open'))closeModal();openSheetPage();return}if(id==='database'){if(modal.classList.contains('open'))closeModal();releaseProcessedPreview();openDatabasePage();return}if(modal.classList.contains('open'))closeModal();releaseProcessedPreview();activeTool=tools.find(t=>t.id===id);if(!activeTool)return;selectedFiles=[];document.getElementById('modalIcon').innerHTML=icon(activeTool.icon);document.getElementById('modalIcon').className=`modal-top-icon ${activeTool.color}`;document.getElementById('modalEyebrow').textContent='ALAT PDF';document.getElementById('modalTitle').textContent=activeTool.title;document.getElementById('modalDescription').textContent=activeTool.detail;document.querySelector('.modal-privacy').lastChild.textContent='Proses aman, file tidak pernah meninggalkan perangkat Anda';document.getElementById('modalError').classList.remove('show');document.getElementById('modalContent').innerHTML=modalFields(activeTool);document.getElementById('modalAction').disabled=false;document.getElementById('modalAction').classList.remove('loading');document.getElementById('modalAction').innerHTML=`<span>${activeTool.action}</span><span>↗</span>`;fileInput.value='';fileInput.multiple=activeTool.input==='pdf-multiple'||activeTool.input==='images'||BATCH_TOOLS.includes(activeTool.id);fileInput.accept=activeTool.input==='images'?'image/png,image/jpeg,image/webp':'.pdf,application/pdf';renderFileRows();const dialog=modal.querySelector('.tool-modal');dialog.classList.toggle('split-wide',activeTool.id==='split'||activeTool.id==='edit'||activeTool.id==='redact'||activeTool.id==='number');dialog.classList.toggle('media-wide',activeTool.id==='toJpg');if(activeTool.id==='split')initSplitBuilder();if(activeTool.id==='toJpg')initJpgBuilder();if(activeTool.id==='merge')initMergePreview();if(activeTool.id==='rotate')initRotate();if(activeTool.id==='number')initNumbering();if(activeTool.id==='watermark')initWatermark();if(activeTool.id==='edit')initEditor();if(activeTool.id==='redact')initRedact();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';wireDropzone()}
function modalFields(t){let fields='';if(t.id==='split')fields+='<div class="split-builder" id="splitBuilder"><div class="split-tabs" role="tablist" aria-label="Cara memilih rentang"><button type="button" class="split-tab active" role="tab" aria-selected="true" aria-controls="splitPanel" data-split-mode="table">Tabel</button><button type="button" class="split-tab" role="tab" aria-selected="false" aria-controls="splitPanel" data-split-mode="manual">Manual</button><button type="button" class="split-tab" role="tab" aria-selected="false" aria-controls="splitPanel" data-split-mode="picker">Pilih halaman</button></div><div class="split-panel" id="splitPanel" role="tabpanel"></div><div class="split-summary" id="splitSummary" aria-live="polite"></div></div>';if(t.id==='extract')fields+='<label class="field-label" for="rangeField">Rentang halaman</label><input id="rangeField" class="text-field" type="text" placeholder="Contoh: 1-3, 5, 8-10"><p class="field-hint">Semua halaman yang dipilih masuk ke satu file.</p>';
if(t.id==='compress')fields+='<label class="field-label">Tingkat kompresi</label><div class="option-row"><label class="option-chip"><input type="radio" name="quality" value="low">Lebih cepat</label><label class="option-chip active"><input type="radio" name="quality" value="medium" checked>Seimbang</label><label class="option-chip"><input type="radio" name="quality" value="high">Maksimal</label></div><div class="modal-note"><span>ⓘ</span><span>Halaman tidak diubah menjadi gambar, jadi teks tetap bisa dicari dan dipilih. Gambar di dalam PDF tidak diperkecil. Jika hasilnya lebih besar, file asli dipertahankan.</span></div>';
if(t.id==='rotate')fields+='<div class="rotate-mode" role="group" aria-label="Cara memutar halaman"><label class="option-chip active"><input type="radio" name="rotateMode" value="all" checked><span>Semua halaman</span></label><label class="option-chip"><input type="radio" name="rotateMode" value="pages"><span>Per halaman</span></label></div><div class="rotate-all-options" id="rotateAllOptions"><label class="field-label">Arah rotasi</label><div class="option-row"><label class="option-chip active"><input type="radio" name="rotation" value="90" checked>↻ 90°</label><label class="option-chip"><input type="radio" name="rotation" value="180">⟳ 180°</label><label class="option-chip"><input type="radio" name="rotation" value="270">↺ 90°</label></div></div><div class="rotate-pages-wrap" id="rotatePagesWrap" hidden><div class="rotate-pages-head"><strong>Putar halaman individu</strong><span id="rotatePagesStatus">Pilih file PDF untuk melihat halaman.</span></div><div class="rotate-pages-toolbar"><button type="button" class="mini-button" data-rotate-all="-1">↺ Putar semua kiri</button><button type="button" class="mini-button" data-rotate-all="1">↻ Putar semua kanan</button><button type="button" class="mini-button" data-rotate-reset-all>Reset semua</button></div><div class="rotate-pages-grid" id="rotatePagesGrid" aria-live="polite"></div><p class="field-hint">Klik tombol putar pada halaman tertentu. Pratinjau langsung mengikuti hasil akhirnya.</p></div>';
if(t.id==='number')fields+='<div class="number-options"><div class="number-grid"><div><label class="field-label" for="numberStart">Mulai dari nomor</label><input id="numberStart" class="text-field" type="number" min="1" value="1"></div><div><label class="field-label" for="numberFormat">Format nomor</label><input id="numberFormat" class="text-field" type="text" maxlength="60" value="{n}" placeholder="Contoh: Halaman {n} dari {total}"><p class="field-hint">Gunakan {n} atau {page} untuk nomor, {total} untuk jumlah halaman.</p></div></div><div class="number-grid"><div><label class="field-label" for="numberPosition">Posisi</label><select id="numberPosition" class="text-field"><option value="bottom-center">Bawah tengah</option><option value="bottom-left">Bawah kiri</option><option value="bottom-right">Bawah kanan</option><option value="top-center">Atas tengah</option><option value="top-left">Atas kiri</option><option value="top-right">Atas kanan</option></select></div><div><label class="field-label" for="numberFont">Font</label><select id="numberFont" class="text-field"><option value="Helvetica">Helvetica</option><option value="Helvetica-Bold">Helvetica Tebal</option><option value="Times-Roman">Times New Roman</option><option value="Courier">Courier</option><option value="custom">Font kustom…</option></select></div></div><div class="number-custom-font" id="numberCustomFontWrap" hidden><label class="field-label" for="numberFontFile">File font kustom</label><input id="numberFontFile" class="text-field" type="file" accept=".ttf,.otf,font/ttf,font/otf"><p class="field-hint" id="numberFontName">Pilih file font TTF atau OTF dari perangkat. Font tetap diproses lokal.</p></div><div class="number-grid number-last-row"><div><label class="field-label" for="numberSize">Ukuran teks</label><select id="numberSize" class="text-field"><option value="8">8 pt</option><option value="9">9 pt</option><option value="10" selected>10 pt</option><option value="12">12 pt</option><option value="14">14 pt</option><option value="16">16 pt</option></select></div><div class="number-preview-label">Pratinjau langsung <span>Halaman contoh</span></div></div><div class="number-preview" id="numberPreview" aria-label="Pratinjau nomor halaman"><div class="number-preview-page"><span class="number-preview-text" id="numberPreviewText">1</span></div></div></div>';
if(t.id==='merge')fields+='<div class="merge-preview-wrap"><div class="merge-preview-heading"><strong>Urutan halaman hasil</strong><span id="mergePageCount">Tambahkan file PDF untuk melihat halaman.</span></div><div class="merge-page-grid" id="mergePageGrid" aria-live="polite"></div><p class="field-hint">Gunakan tombol panah untuk mengatur urutan file dan halaman. Urutan ini dipakai saat PDF dibuat.</p></div>';if(t.id==='watermark')fields+='<div class="watermark-options"><label class="field-label" for="watermarkText">Teks tanda air (opsional)</label><input id="watermarkText" class="text-field" type="text" maxlength="50" placeholder="Contoh: DRAF"><label class="field-label" for="watermarkImage">Gambar tanda air (opsional)</label><input id="watermarkImage" class="text-field" type="file" accept="image/png,image/jpeg,image/webp"><p class="field-hint" id="watermarkImageName">Pilih PNG, JPG, atau WEBP. Teks dan gambar dapat digunakan bersama.</p><div class="number-grid"><div><label class="field-label" for="watermarkOpacity">Opasitas <span id="watermarkOpacityValue">20%</span></label><input id="watermarkOpacity" class="watermark-range" type="range" min="5" max="100" value="20"></div><div><label class="field-label" for="watermarkPosition">Posisi halaman</label><select id="watermarkPosition" class="text-field"><option value="center">Tengah</option><option value="top-left">Atas kiri</option><option value="top-center">Atas tengah</option><option value="top-right">Atas kanan</option><option value="middle-left">Tengah kiri</option><option value="middle-right">Tengah kanan</option><option value="bottom-left">Bawah kiri</option><option value="bottom-center">Bawah tengah</option><option value="bottom-right">Bawah kanan</option></select></div></div><div class="watermark-preview-wrap"><span class="field-label">Pratinjau tanda air</span><div class="watermark-preview" id="watermarkPreview"><div class="watermark-preview-mark" id="watermarkPreviewMark">DRAF</div></div></div></div>';
if(t.id==='ocr')fields+='<label class="field-label" for="ocrLang">Bahasa tulisan di PDF</label><select id="ocrLang" class="text-field"><option value="eng">Inggris</option><option value="ind">Indonesia</option></select><label class="field-label">Bentuk hasil</label><div class="option-row"><label class="option-chip active"><input type="radio" name="ocrOut" value="txt" checked>File teks (.txt)</label><label class="option-chip"><input type="radio" name="ocrOut" value="pdf">PDF bisa dicari</label></div><p class="field-hint" id="ocrStatus">Mesin OCR diunduh sekali dari internet saat pertama dipakai, lalu pembacaan teks berjalan lokal di perangkat Anda. PDF bisa dicari menyimpan halaman sebagai gambar plus lapisan teks tak terlihat.</p>';
if(t.id==='flatten')fields+='<div class="modal-note"><span>ⓘ</span><span>Semua halaman dirender ulang pada resolusi tinggi: teks tidak lagi bisa dipilih atau disunting, formulir dan anotasi menyatu permanen, dan tautan interaktif dilepas. Ukuran file umumnya bertambah.</span></div>';
if(t.id==='images')fields+='<div class="modal-note"><span>ⓘ</span><span>Urutan gambar di daftar menentukan urutan halaman PDF. Gunakan tombol ↑ dan ↓ pada tiap gambar untuk menggesernya sebelum membuat PDF.</span></div>';
if(t.id==='toJpg')fields+='<div class="jpg-builder" id="jpgBuilder"><div class="split-tabs jpg-modes" role="tablist" aria-label="Cara memilih halaman JPG"><button type="button" class="split-tab active" role="tab" aria-selected="true" data-jpg-mode="all">Semua halaman</button><button type="button" class="split-tab" role="tab" aria-selected="false" data-jpg-mode="range">Rentang</button><button type="button" class="split-tab" role="tab" aria-selected="false" data-jpg-mode="picker">Pilih halaman</button></div><div class="jpg-range-wrap" id="jpgRangeWrap" hidden><label class="field-label" for="jpgRangeField">Rentang halaman</label><input id="jpgRangeField" class="text-field" type="text" placeholder="Contoh: 1-3, 5, 8-10" autocomplete="off"><p class="field-hint">Tulis rentang dipisah koma. Urutan tulisan dipakai saat memberi nama file JPG.</p></div><div class="picker-head jpg-picker-head"><span class="picker-status" id="jpgStatus">Pilih file PDF dulu untuk melihat pratinjau halaman.</span><span class="picker-actions"><button type="button" class="mini-button" data-jpg-pick-all hidden>Pilih semua</button><button type="button" class="mini-button" data-jpg-pick-clear hidden>Kosongkan</button></span></div><div class="page-grid jpg-page-grid" id="jpgPageGrid" aria-live="polite"></div><button type="button" class="load-more-pages" id="jpgLoadMore" data-jpg-load-more hidden>Muat halaman berikutnya</button><div class="split-summary" id="jpgSummary" aria-live="polite"></div></div>';
if(t.id==='protect')fields+='<label class="field-label" for="protectPassword">Kata sandi untuk membuka</label><input id="protectPassword" class="text-field" type="password" autocomplete="new-password" placeholder="Minimal 4 karakter"><label class="field-label" for="protectOwner">Kata sandi pemilik (opsional)</label><input id="protectOwner" class="text-field" type="password" autocomplete="new-password" placeholder="Kosongkan untuk sama dengan kata sandi di atas"><label class="field-label">Izin dokumen terkunci</label><div class="option-row"><label class="option-chip active"><input type="radio" name="protectMode" value="open" checked>Bisa dicetak &amp; disalin</label><label class="option-chip"><input type="radio" name="protectMode" value="restrict">Baca saja</label></div><p class="field-hint">Hasilnya dienkripsi AES-256, standar yang direkomendasikan spesifikasi PDF. Simpan kata sandi di tempat aman — tidak bisa dipulihkan.</p>';
if(t.id==='unlock')fields+='<label class="field-label" for="unlockPassword">Kata sandi PDF</label><input id="unlockPassword" class="text-field" type="password" autocomplete="off" placeholder="Kosongkan jika hanya terkunci izinnya"><p class="field-hint">Hasilnya salinan baru tanpa enkripsi. File asli tidak berubah.</p>';
if(t.id==='edit')fields+='<div class="editor-wrap" id="pdfEditor"><div class="editor-toolbar"><div class="editor-tools"><button type="button" class="editor-btn active" data-etool="text">Teks</button><button type="button" class="editor-btn" data-etool="image">Gambar</button><button type="button" class="editor-btn" data-etool="ink">Pensil</button></div><label class="editor-field">Warna <input type="color" id="editorColor" value="#4a5df0"></label><label class="editor-field">Ukuran teks <select id="editorSize"><option value="12">12</option><option value="16" selected>16</option><option value="20">20</option><option value="28">28</option></select></label><div class="editor-tools"><button type="button" class="editor-btn ghost" data-eact="delete-item">Hapus terpilih</button><button type="button" class="editor-btn ghost" data-eact="clear-page">Kosongkan halaman</button></div></div><div class="editor-scroll"><div class="editor-stage" id="editorStage"><canvas id="editorPageCanvas"></canvas><canvas id="editorInkCanvas"></canvas><div class="editor-items" id="editorItems"></div><div class="editor-empty" id="editorEmpty">Pilih file PDF untuk mulai menyunting.</div></div></div><div class="editor-footer"><button type="button" class="mini-button" id="editorPrev" disabled>← Sebelumnya</button><span class="editor-page-label" id="editorPageLabel">Halaman — dari —</span><button type="button" class="mini-button" id="editorNext" disabled>Berikutnya →</button><span class="editor-hint" id="editorHint">Klik halaman untuk menambah teks. Seret elemen untuk memindah.</span></div><input type="file" id="editorImageInput" accept="image/png,image/jpeg" hidden></div>';
if(t.id==='redact')fields+='<div class="editor-wrap" id="redactEditor"><div class="editor-toolbar"><div class="editor-tools"><span class="editor-hint-inline">Seret di halaman untuk menandai area rahasia.</span></div><div class="editor-tools"><button type="button" class="editor-btn ghost" data-ract="delete-item" disabled>Hapus terpilih</button><button type="button" class="editor-btn ghost" data-ract="clear-page" disabled>Kosongkan halaman</button></div></div><div class="editor-scroll"><div class="editor-stage" id="redactStage"><canvas id="redactPageCanvas"></canvas><div class="redact-layer" id="redactLayer"></div><div class="editor-empty" id="redactEmpty">Pilih file PDF untuk mulai menandai.</div></div></div><div class="editor-footer"><button type="button" class="mini-button" id="redactPrev" disabled>← Sebelumnya</button><span class="editor-page-label" id="redactPageLabel">Halaman — dari —</span><button type="button" class="mini-button" id="redactNext" disabled>Berikutnya →</button><span class="editor-hint" id="redactHint">Seret di halaman untuk menandai area. Klik blok untuk memindah atau menghapus.</span></div></div><div class="modal-note"><span>ⓘ</span><span>Halaman yang ditandai dirender ulang menjadi gambar agar konten di balik blok benar-benar hilang, bukan sekadar ditutupi. Halaman tanpa tanda tetap asli. Periksa hasil sebelum dibagikan.</span></div>';
if(['merge','extract','rotate'].includes(t.id))fields+='<div class="processed-preview" id="processedPreview" hidden><div class="processed-preview-heading"><strong>Pratinjau PDF hasil</strong><span>Periksa hasilnya sebelum disimpan.</span></div><div class="processed-preview-bar"><div class="preview-pager"><button type="button" class="preview-nav" data-preview-page="-1" aria-label="Halaman sebelumnya" disabled>←</button><span class="preview-page-label" id="processedPreviewStatus" aria-live="polite">Memuat…</span><button type="button" class="preview-nav" data-preview-page="1" aria-label="Halaman berikutnya" disabled>→</button></div><div class="preview-zoom"><button type="button" class="preview-nav" data-preview-zoom="-1" aria-label="Perkecil pratinjau" disabled>−</button><span class="preview-page-label" id="processedPreviewZoom">100%</span><button type="button" class="preview-nav" data-preview-zoom="1" aria-label="Perbesar pratinjau" disabled>+</button></div></div><div class="processed-preview-stage" id="processedPreviewStage" aria-label="Pratinjau halaman PDF"></div><p class="processed-preview-error" id="processedPreviewError" role="alert" hidden></p></div>';return `<div class="dropzone" id="dropzone"><span class="drop-icon">${icon('upload')}</span><strong>${t.input==='pdf-multiple'?'Pilih beberapa file PDF':t.input==='images'?'Pilih gambar dari perangkat':'Pilih file PDF dari perangkat'}</strong><span>atau <em>seret dan lepas</em> file di sini</span><span>${t.input==='images'?'PNG, JPG, WEBP':'PDF • Maksimal 100 MB per file'}</span></div><div id="fileRows" class="file-list"></div>${fields}`}
const imagePreviewUrls=new Map();
function imagePreviewUrl(file){let url=imagePreviewUrls.get(file);if(!url){url=URL.createObjectURL(file);imagePreviewUrls.set(file,url)}return url}
function releaseImagePreviews(){imagePreviewUrls.forEach(url=>{try{URL.revokeObjectURL(url)}catch(error){}});imagePreviewUrls.clear()}
function renderFileRows(){const list=document.getElementById('fileRows');if(!list)return;const reorderable=!!activeTool&&(activeTool.id==='merge'||activeTool.id==='images');list.innerHTML=selectedFiles.map((f,i)=>{const isImage=f.type.startsWith('image/'),thumb=isImage?`<span class="file-thumb"><img src="${imagePreviewUrl(f)}" alt=""></span>`:'<span class="file-badge">PDF</span>';return `<div class="file-row" style="--i:${i}">${reorderable?`<span class="file-order-index" aria-hidden="true">${i+1}</span>`:''}${thumb}<span class="file-meta"><strong>${escapeHTML(f.name)}</strong><span>${formatBytes(f.size)}</span></span>${reorderable?`<span class="file-order-controls"><button type="button" class="file-order-button" data-file-move="-1" data-file-index="${i}" aria-label="Naikkan ${escapeHTML(f.name)}" ${i===0?'disabled':''}>↑</button><button type="button" class="file-order-button" data-file-move="1" data-file-index="${i}" aria-label="Turunkan ${escapeHTML(f.name)}" ${i===selectedFiles.length-1?'disabled':''}>↓</button></span>`:''}<button class="file-remove" data-remove="${i}" aria-label="Hapus ${escapeHTML(f.name)}">×</button></div>`}).join('');list.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{if(activeTool&&['merge','extract','rotate'].includes(activeTool.id))resetProcessedPreview();const removed=selectedFiles.splice(+b.dataset.remove,1)[0];if(removed){const url=imagePreviewUrls.get(removed);if(url&&!selectedFiles.includes(removed)){try{URL.revokeObjectURL(url)}catch(error){}imagePreviewUrls.delete(removed)}}renderFileRows()}));document.querySelectorAll('.option-chip').forEach(l=>l.addEventListener('click',()=>{let radio=l.querySelector('input');if(radio){document.querySelectorAll(`input[name="${radio.name}"]`).forEach(r=>r.closest('.option-chip').classList.remove('active'));l.classList.add('active');radio.checked=true}}));const dz=document.getElementById('dropzone');if(dz&&activeTool&&activeTool.id==='split'){const compact=selectedFiles.length>0,label=dz.querySelector('strong');dz.classList.toggle('has-file',compact);if(label)label.textContent=compact?'Ganti file PDF':'Pilih file PDF dari perangkat'}if(activeTool&&activeTool.id==='split')updateSplitFile();if(activeTool&&activeTool.id==='toJpg')updateJpgFile();if(activeTool&&activeTool.id==='edit')updateEditorFile();if(activeTool&&activeTool.id==='redact')updateRedactFile();if(activeTool&&activeTool.id==='rotate')updateRotateFile();if(reorderable){list.querySelectorAll('[data-file-move]').forEach(button=>button.addEventListener('click',()=>{const i=+button.dataset.fileIndex,j=i+(+button.dataset.fileMove);if(j<0||j>=selectedFiles.length)return;[selectedFiles[i],selectedFiles[j]]=[selectedFiles[j],selectedFiles[i]];renderFileRows()}));if(activeTool.id==='merge')renderMergePreview()}}
const mergeState={files:[],pages:[],token:0,ready:false};
const rotateState={mode:'all',file:null,doc:null,token:0,pages:new Map()};
function rotatePagesParts(){return {wrap:document.getElementById('rotatePagesWrap'),all:document.getElementById('rotateAllOptions'),grid:document.getElementById('rotatePagesGrid'),status:document.getElementById('rotatePagesStatus')}}
function releaseRotateDoc(){rotateState.token++;if(rotateState.doc){try{rotateState.doc.destroy()}catch(e){}rotateState.doc=null}const parts=rotatePagesParts();if(parts.grid)parts.grid.innerHTML=''}
function updateRotateStatus(){const parts=rotatePagesParts();if(!parts.status)return;const total=rotateState.doc?rotateState.doc.numPages:0,rotated=[...rotateState.pages.values()].filter(Boolean).length;if(!total){parts.status.textContent=selectedFiles.length&&rotateState.mode==='pages'?'Menyiapkan pratinjau halaman…':'Pilih file PDF untuk melihat halaman.';return}parts.status.textContent=`${total} halaman • ${rotated?`${rotated} diputar`:'belum ada yang diputar'}`}
function rotatePageCard(index){const deg=rotateState.pages.get(index)||0;return `<article class="rotate-page-card${deg?' rotated':''}" data-rotate-index="${index}"><div class="rotate-page-thumb"><div class="rotate-page-rotor" style="--rot:${deg}deg;--rot-scale:${deg%180?.68:1}"><canvas></canvas></div><span class="rotate-page-badge"${deg?'':' hidden'}>${deg?deg+'°':''}</span></div><div class="rotate-page-meta"><span>Halaman ${index+1}</span><em>${deg?deg+'°':'Asli'}</em></div><div class="rotate-page-controls"><button type="button" class="rotate-page-btn" data-rotate-dir="-1" aria-label="Putar halaman ${index+1} ke kiri">↺</button><button type="button" class="rotate-page-btn" data-rotate-dir="1" aria-label="Putar halaman ${index+1} ke kanan">↻</button><button type="button" class="rotate-page-btn ghost" data-rotate-clear aria-label="Kembalikan halaman ${index+1} ke posisi asli">⟲</button></div></article>`}
function paintRotateCard(card,index){const deg=rotateState.pages.get(index)||0,rotor=card.querySelector('.rotate-page-rotor'),badge=card.querySelector('.rotate-page-badge'),meta=card.querySelector('.rotate-page-meta em');if(rotor){rotor.style.setProperty('--rot',deg+'deg');rotor.style.setProperty('--rot-scale',String(deg%180?.68:1))}if(badge){badge.hidden=!deg;badge.textContent=deg?deg+'°':''}if(meta)meta.textContent=deg?deg+'°':'Asli';card.classList.toggle('rotated',!!deg)}
async function renderRotateThumbs(token){const parts=rotatePagesParts(),doc=rotateState.doc;if(!parts.grid||!doc)return;for(const card of [...parts.grid.querySelectorAll('.rotate-page-card')]){if(token!==rotateState.token)return;const index=+card.dataset.rotateIndex,canvas=card.querySelector('canvas');if(!canvas)continue;try{const page=await doc.getPage(index+1);if(token!==rotateState.token)return;const base=page.getViewport({scale:1}),scale=Math.min(.3,130/base.width),viewport=page.getViewport({scale});canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:canvas.getContext('2d',{alpha:false}),viewport,background:'#ffffff'}).promise;if(token!==rotateState.token)return;card.classList.add('rendered')}catch(e){card.classList.add('thumb-failed')}}}
async function renderRotatePages(){const parts=rotatePagesParts();if(!parts.grid)return;const file=selectedFiles[0]||null;if(!file){parts.grid.innerHTML='';rotateState.file=null;rotateState.pages=new Map();updateRotateStatus();return}const token=++rotateState.token;rotateState.file=file;rotateState.pages=new Map();parts.grid.innerHTML='<div class="rotate-pages-loading">Membuat pratinjau halaman…</div>';if(parts.status)parts.status.textContent='Memuat pratinjau halaman…';try{const doc=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;if(token!==rotateState.token){try{doc.destroy()}catch(e){}return}rotateState.doc=doc;parts.grid.innerHTML=Array.from({length:doc.numPages},(_,i)=>rotatePageCard(i)).join('');updateRotateStatus();renderRotateThumbs(token)}catch(e){if(token!==rotateState.token)return;parts.grid.innerHTML='<div class="rotate-pages-loading">Pratinjau tidak tersedia. Pastikan PDF tidak rusak atau terkunci.</div>';if(parts.status)parts.status.textContent='Pratinjau tidak tersedia';showError('Pratinjau halaman gagal dimuat. Anda masih bisa memakai opsi putar semua halaman.')}}
function rotateAllPages(dir){if(!rotateState.doc)return;for(let i=0;i<rotateState.doc.numPages;i++){const current=rotateState.pages.get(i)||0;rotateState.pages.set(i,(current+dir*90+360)%360)}document.querySelectorAll('#rotatePagesGrid .rotate-page-card').forEach(card=>paintRotateCard(card,+card.dataset.rotateIndex));updateRotateStatus();resetProcessedPreview()}
function resetRotateAllPages(){if(!rotateState.doc)return;rotateState.pages.clear();document.querySelectorAll('#rotatePagesGrid .rotate-page-card').forEach(card=>paintRotateCard(card,+card.dataset.rotateIndex));updateRotateStatus();resetProcessedPreview()}
function setRotateMode(mode){if(rotateState.mode===mode)return;rotateState.mode=mode;const parts=rotatePagesParts();if(parts.all)parts.all.hidden=mode==='pages';if(parts.wrap)parts.wrap.hidden=mode!=='pages';if(mode==='pages')renderRotatePages();else{releaseRotateDoc();rotateState.file=null;rotateState.pages=new Map();updateRotateStatus()}resetProcessedPreview()}
function updateRotateFile(){if(!activeTool||activeTool.id!=='rotate'||rotateState.mode!=='pages')return;const file=selectedFiles[0]||null;if(file===rotateState.file&&(file?!!rotateState.doc:true))return;releaseRotateDoc();rotateState.file=file;rotateState.pages=new Map();if(file)renderRotatePages();else updateRotateStatus()}
function initRotate(){releaseRotateDoc();rotateState.mode='all';rotateState.file=null;rotateState.pages=new Map();const parts=rotatePagesParts();if(!parts.wrap)return;if(parts.all)parts.all.hidden=false;parts.wrap.hidden=true;document.querySelectorAll('input[name="rotateMode"]').forEach(input=>{const chip=input.closest('.option-chip');if(chip)chip.addEventListener('click',()=>setRotateMode(input.value))});if(parts.grid)parts.grid.addEventListener('click',e=>{const card=e.target.closest('.rotate-page-card');if(!card)return;const index=+card.dataset.rotateIndex,dir=e.target.closest('[data-rotate-dir]');if(dir){const current=rotateState.pages.get(index)||0;rotateState.pages.set(index,(current+(+dir.dataset.rotateDir)*90+360)%360);paintRotateCard(card,index);updateRotateStatus();resetProcessedPreview();return}if(e.target.closest('[data-rotate-clear]')){rotateState.pages.delete(index);paintRotateCard(card,index);updateRotateStatus();resetProcessedPreview()}});parts.wrap.addEventListener('click',e=>{const all=e.target.closest('[data-rotate-all]');if(all){rotateAllPages(+all.dataset.rotateAll);return}if(e.target.closest('[data-rotate-reset-all]'))resetRotateAllPages()});updateRotateStatus()}
const watermarkState={imageFile:null,imageData:null};
function initWatermark(){watermarkState.imageFile=null;watermarkState.imageData=null;const text=document.getElementById('watermarkText'),image=document.getElementById('watermarkImage'),opacity=document.getElementById('watermarkOpacity'),position=document.getElementById('watermarkPosition');if(!text||!image||!opacity||!position)return;const update=()=>updateWatermarkPreview();text.addEventListener('input',update);opacity.addEventListener('input',update);position.addEventListener('change',update);image.addEventListener('change',async()=>{const file=image.files&&image.files[0];watermarkState.imageFile=file||null;watermarkState.imageData=null;const name=document.getElementById('watermarkImageName');if(name)name.textContent=file?`Gambar: ${file.name}`:'Pilih PNG, JPG, atau WEBP. Teks dan gambar dapat digunakan bersama.';if(file){try{watermarkState.imageData=await readImageDataUrl(file)}catch(error){watermarkState.imageFile=null;image.value='';if(name)name.textContent='Gambar tidak dapat dibaca. Pilih file PNG, JPG, atau WEBP yang valid.';showError('Gambar tanda air tidak dapat dibaca.')}}update()});update()}
function updateWatermarkPreview(){const preview=document.getElementById('watermarkPreview'),mark=document.getElementById('watermarkPreviewMark'),text=document.getElementById('watermarkText'),opacity=document.getElementById('watermarkOpacity'),value=document.getElementById('watermarkOpacityValue'),position=document.getElementById('watermarkPosition');if(!preview||!mark||!text||!opacity||!position)return;const label=text.value.trim(),imageData=watermarkState.imageData;mark.style.opacity=String(+opacity.value/100);preview.dataset.position=position.value;mark.innerHTML='';if(imageData){const img=document.createElement('img');img.src=imageData;img.alt='';mark.appendChild(img)}if(label){const caption=document.createElement('span');caption.textContent=label;mark.appendChild(caption)}if(!label&&!imageData){const placeholder=document.createElement('span');placeholder.textContent='TANDA AIR';mark.appendChild(placeholder)}mark.classList.toggle('watermark-empty',!label&&!imageData);if(value)value.textContent=`${opacity.value}%`;preview.setAttribute('aria-label',`Pratinjau tanda air ${[label,imageData?'gambar':''].filter(Boolean).join(' dan ')||'kosong'} dengan opasitas ${opacity.value} persen`)}
function readImageDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error||Error('Gambar gagal dibaca'));reader.readAsDataURL(file)})}
async function watermarkImageBytes(file){const type=(file.type||'').toLowerCase();if(type==='image/png'||type==='image/jpeg')return {type,bytes:await file.arrayBuffer()};if(type!=='image/webp')throw Error('Gunakan gambar PNG, JPG, atau WEBP.');const bitmap=await createImageBitmap(file),canvas=document.createElement('canvas');canvas.width=bitmap.width;canvas.height=bitmap.height;canvas.getContext('2d').drawImage(bitmap,0,0);bitmap.close();const png=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));canvas.width=1;canvas.height=1;if(!png)throw Error('Gambar WEBP tidak dapat dikonversi.');return {type:'image/png',bytes:await png.arrayBuffer()}}
function initMergePreview(){mergeState.files=[];mergeState.pages=[];mergeState.token++;renderMergePreview()}
function renderMergePageCards(){const grid=document.getElementById('mergePageGrid'),count=document.getElementById('mergePageCount');if(!grid||!count)return;count.textContent=mergeState.pages.length?`${mergeState.pages.length} halaman • urutan gabungan`:'Tambahkan file PDF untuk melihat halaman.';grid.innerHTML=mergeState.pages.map((item,i)=>`<article class="merge-page-card"><div class="merge-page-thumb">${item.thumb?`<img src="${item.thumb}" alt="Pratinjau halaman ${item.page} dari ${escapeHTML(item.file.name)}">`:'<span>PDF</span>'}</div><strong>${escapeHTML(item.file.name)}</strong><span>Halaman ${item.page}</span><div class="merge-page-controls"><button type="button" class="mini-button" data-page-move="-1" data-page-index="${i}" aria-label="Pindahkan halaman ${i+1} ke atas" ${i===0?'disabled':''}>↑</button><button type="button" class="mini-button" data-page-move="1" data-page-index="${i}" aria-label="Pindahkan halaman ${i+1} ke bawah" ${i===mergeState.pages.length-1?'disabled':''}>↓</button></div></article>`).join('');grid.querySelectorAll('[data-page-move]').forEach(button=>button.addEventListener('click',()=>{const i=+button.dataset.pageIndex,j=i+(+button.dataset.pageMove);if(j<0||j>=mergeState.pages.length)return;[mergeState.pages[i],mergeState.pages[j]]=[mergeState.pages[j],mergeState.pages[i]];renderMergePageCards()}))}
async function renderMergePreview(){const grid=document.getElementById('mergePageGrid'),count=document.getElementById('mergePageCount');if(!grid||!count)return;const changed=mergeState.files.length!==selectedFiles.length||mergeState.files.some((f,i)=>f!==selectedFiles[i]);if(!changed){renderMergePageCards();return}const token=++mergeState.token;mergeState.files=selectedFiles.slice();mergeState.pages=[];mergeState.ready=false;if(!selectedFiles.length){renderMergePageCards();return}count.textContent='Memuat pratinjau halaman…';grid.innerHTML='<div class="merge-preview-loading">Membuat pratinjau PDF…</div>';try{for(const file of selectedFiles){const pdf=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;if(token!==mergeState.token){pdf.destroy();return}for(let pageNo=1;pageNo<=pdf.numPages;pageNo++){const page=await pdf.getPage(pageNo),base=page.getViewport({scale:1}),viewport=page.getViewport({scale:Math.min(.24,100/base.width)}),canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:canvas.getContext('2d'),viewport,background:'#fff'}).promise;if(token!==mergeState.token){pdf.destroy();return}mergeState.pages.push({file,page:pageNo,thumb:canvas.toDataURL('image/jpeg',.72)});canvas.width=1;canvas.height=1}pdf.destroy()}mergeState.ready=true;renderMergePageCards()}catch(error){if(token===mergeState.token){mergeState.ready=false;count.textContent='Pratinjau tidak tersedia';grid.innerHTML='<p class="merge-preview-loading">Satu atau beberapa PDF tidak dapat dipratinjau. Pastikan file tidak rusak atau terkunci.</p>';showError('Pratinjau PDF gagal dimuat. Anda masih dapat menggabungkan file yang valid.')}}}
const splitState={mode:'table',rows:[{start:'',end:''}],manual:'',selected:new Set(),total:0,doc:null,file:null,token:0,thumbToken:0,limit:30,renderedPages:new Set()};
function initSplitBuilder(){const builder=document.getElementById('splitBuilder');if(!builder)return;splitState.mode='table';splitState.rows=[{start:'',end:''}];splitState.manual='';splitState.selected=new Set();splitState.total=0;splitState.doc=null;splitState.file=null;splitState.token++;splitState.limit=30;splitState.renderedPages=new Set();builder.querySelectorAll('[data-split-mode]').forEach(btn=>btn.addEventListener('click',()=>{syncSplitFields();splitState.mode=btn.dataset.splitMode;builder.querySelectorAll('[data-split-mode]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',b===btn?'true':'false')});renderSplitPanel()}));const panel=document.getElementById('splitPanel');panel.addEventListener('input',handleSplitInput);panel.addEventListener('click',handleSplitClick);renderSplitPanel();updateSplitFile()}
function rangeText(a,b){return a===b?String(a):`${a}–${b}`}
function slugRange(a,b){return a===b?String(a):`${a}-${b}`}
function handleSplitInput(e){const t=e.target;if(t.matches('[data-range-start],[data-range-end]')){splitState.rows=[...document.querySelectorAll('.range-row')].map(row=>({start:row.querySelector('[data-range-start]').value,end:row.querySelector('[data-range-end]').value}));updateRangeLabels();renderSplitSummary()}else if(t.id==='rangeField'){splitState.manual=t.value;renderSplitSummary()}}
function updateRangeLabels(){document.querySelectorAll('.range-row').forEach(row=>{const a=row.querySelector('[data-range-start]').value,b=row.querySelector('[data-range-end]').value,out=row.querySelector('.range-result');const start=parseInt(a),end=parseInt(b);out.textContent=Number.isInteger(start)&&Number.isInteger(end)&&start>0&&end>=start?`${rangeText(start,end)}`:'—'})}
function syncSplitFields(){if(splitState.mode==='manual'){const f=document.getElementById('rangeField');if(f)splitState.manual=f.value}else if(splitState.mode==='table'){const rows=[...document.querySelectorAll('.range-row')];if(rows.length)splitState.rows=rows.map(row=>({start:row.querySelector('[data-range-start]').value,end:row.querySelector('[data-range-end]').value}))}}
function renderSplitPanel(){const panel=document.getElementById('splitPanel');if(!panel)return;if(splitState.mode==='manual'){panel.innerHTML=`<label class="field-label" for="rangeField">Rentang halaman</label><input id="rangeField" class="text-field" type="text" value="${escapeHTML(splitState.manual)}" placeholder="Contoh: 1-3, 5, 8-10" autocomplete="off"><p class="field-hint">Setiap rentang dipisah koma menjadi satu file PDF. Halaman boleh di luar urutan.</p>`}else if(splitState.mode==='table'){panel.innerHTML=`<div class="range-table-wrap"><table class="range-table"><thead><tr><th>#</th><th>Dari</th><th>Sampai</th><th>Hasil</th><th><span class="sr-only">Aksi</span></th></tr></thead><tbody>${splitState.rows.map((r,i)=>`<tr class="range-row"><td class="range-index">${i+1}</td><td><input class="range-input" type="number" min="1" inputmode="numeric" data-range-start value="${escapeHTML(r.start)}" aria-label="Halaman awal baris ${i+1}"></td><td><input class="range-input" type="number" min="1" inputmode="numeric" data-range-end value="${escapeHTML(r.end)}" aria-label="Halaman akhir baris ${i+1}"></td><td class="range-result">—</td><td><button type="button" class="range-remove" data-remove-row="${i}" aria-label="Hapus baris ${i+1}">×</button></td></tr>`).join('')}</tbody></table></div><div class="split-tools"><button type="button" class="mini-button" data-add-row>+ Tambah baris</button>${splitState.total?`<button type="button" class="mini-button" data-fill-all>Isi semua halaman (1–${splitState.total})</button>`:''}</div>`;updateRangeLabels()}else{panel.innerHTML=`<div class="picker-head"><span class="picker-status" id="pickerStatus">${splitState.total?'Klik halaman untuk memilih. Halaman bersebelahan otomatis jadi satu rentang.':'Pilih file PDF dulu untuk melihat isinya.'}</span>${splitState.total?`<span class="picker-actions"><button type="button" class="mini-button" data-pick-all>Pilih semua</button><button type="button" class="mini-button" data-pick-clear>Kosongkan</button></span>`:''}</div>${splitState.total?`<div class="page-grid" id="pageGrid"></div>${splitState.limit<splitState.total?`<button type="button" class="load-more-pages" data-load-more>Muat halaman berikutnya (${splitState.total-splitState.limit} lagi)</button>`:''}`:`<div class="picker-empty"><span class="picker-empty-icon">${icon('image')}</span><span>Pratinjau halaman akan muncul di sini setelah PDF dipilih.</span></div>`}`;if(splitState.total){splitState.renderedPages=new Set();appendPickerCards(1,Math.min(splitState.total,splitState.limit))}updatePickerStatus()}renderSplitSummary()}
function renderPickerThumbs(){const grid=document.getElementById('pageGrid');if(!grid||!splitState.doc)return;const token=++splitState.thumbToken,doc=splitState.doc;(async()=>{for(const card of [...grid.querySelectorAll('.page-thumb')]){const p=+card.dataset.page;if(splitState.renderedPages.has(p))continue;const canvas=card.querySelector('canvas');if(!canvas)continue;try{const page=await doc.getPage(p);if(token!==splitState.thumbToken||!canvas.isConnected)return;const base=page.getViewport({scale:1}),vp=page.getViewport({scale:320/base.width});canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);await page.render({canvasContext:canvas.getContext('2d'),viewport:vp,background:'#ffffff'}).promise;if(token!==splitState.thumbToken)return;card.classList.add('rendered');splitState.renderedPages.add(p)}catch(e){card.classList.add('thumb-failed')}}})()}
function appendPickerCards(from,to){const grid=document.getElementById('pageGrid');if(!grid)return;const frag=document.createDocumentFragment();for(let p=from;p<=to;p++){const card=document.createElement('button');card.type='button';card.className=`page-thumb${splitState.selected.has(p)?' selected':''}`;card.dataset.page=p;card.setAttribute('aria-pressed',splitState.selected.has(p)?'true':'false');card.setAttribute('aria-label',`Halaman ${p}`);card.innerHTML=`<span class="page-thumb-canvas"><canvas></canvas><span class="page-thumb-sheen"></span></span><span class="page-thumb-label">${p}</span>`;frag.appendChild(card)}grid.appendChild(frag);renderPickerThumbs();updatePickerStatus()}
function updatePickerStatus(){const status=document.getElementById('pickerStatus');if(!status)return;const ranges=selectionRanges();const count=splitState.selected.size;status.textContent=count?`${count} halaman dipilih • ${ranges.length} rentang • ${ranges.length} file PDF`:'Klik halaman untuk memilih. Halaman bersebelahan otomatis jadi satu rentang.'}
function pagesToRanges(pages){const sorted=[...new Set([...pages])].filter(Number.isInteger).sort((a,b)=>a-b),ranges=[];let start=null,prev=null;for(const p of sorted){if(start===null){start=prev=p}else if(p===prev+1){prev=p}else{ranges.push({start,end:prev});start=prev=p}}if(start!==null)ranges.push({start,end:prev});return ranges}
function selectionRanges(){return pagesToRanges(splitState.selected)}
function handleSplitClick(e){const target=e.target.closest('button');if(!target)return;const pageCard=target.closest('.page-thumb');if(pageCard){const p=+pageCard.dataset.page;if(splitState.selected.has(p))splitState.selected.delete(p);else splitState.selected.add(p);pageCard.classList.toggle('selected',splitState.selected.has(p));pageCard.setAttribute('aria-pressed',splitState.selected.has(p)?'true':'false');updatePickerStatus();renderSplitSummary();return}if(target.matches('[data-add-row]')){splitState.rows.push({start:'',end:''});renderSplitPanel();return}if(target.matches('[data-remove-row]')){splitState.rows.splice(+target.dataset.removeRow,1);if(!splitState.rows.length)splitState.rows=[{start:'',end:''}];renderSplitPanel();return}if(target.matches('[data-fill-all]')&&splitState.total){splitState.rows=[{start:'1',end:String(splitState.total)}];renderSplitPanel();return}if(target.matches('[data-pick-all]')){for(let p=1;p<=splitState.total;p++)splitState.selected.add(p);document.querySelectorAll('.page-thumb').forEach(card=>{card.classList.add('selected');card.setAttribute('aria-pressed','true')});updatePickerStatus();renderSplitSummary();return}if(target.matches('[data-pick-clear]')){splitState.selected.clear();document.querySelectorAll('.page-thumb').forEach(card=>{card.classList.remove('selected');card.setAttribute('aria-pressed','false')});updatePickerStatus();renderSplitSummary();return}if(target.matches('[data-load-more]')){const from=splitState.limit+1;splitState.limit=Math.min(splitState.total,splitState.limit+30);appendPickerCards(from,splitState.limit);const more=target;if(splitState.limit>=splitState.total)more.remove();else more.textContent=`Muat halaman berikutnya (${splitState.total-splitState.limit} lagi)`;return}}
function rangeIds(a,b,total,label=''){const prefix=label?`${label}: `:'';a=Number(a);b=Number(b);if(!Number.isInteger(a)||!Number.isInteger(b))throw Error(`${prefix}isi halaman awal dan akhir dengan angka bulat.`);if(a<1||b<1||a>total||b>total)throw Error(`${prefix}halaman harus di antara 1–${total}.`);if(b<a)throw Error(`${prefix}halaman akhir harus ≥ halaman awal.`);return Array.from({length:b-a+1},(_,i)=>a-1+i)}
function currentSplitRanges(pageCount=splitState.total){if(!selectedFiles.length)throw Error('Pilih file PDF terlebih dahulu.');const total=pageCount;if(!total)throw Error('PDF sedang dibaca. Tunggu sebentar, lalu coba lagi.');if(splitState.mode==='manual'){const parts=(splitState.manual||'').split(',').map(s=>s.trim());if(!parts.length||parts.every(part=>!part))throw Error('Masukkan rentang halaman terlebih dahulu.');if(parts.some(part=>!part))throw Error('Setiap rentang harus diisi. Periksa pemisah koma.');return parts.map(part=>{const ids=parsePages(part,total);return {label:part.replace(/\s/g,''),slug:part.replace(/[^\d]+/g,'-').replace(/^-|-$/g,''),ids}})}if(splitState.mode==='table'){const ranges=splitState.rows.map((row,i)=>{const start=String(row.start??'').trim(),end=String(row.end??'').trim();if(!start&&!end)return null;const a=Number(start),b=Number(end),ids=rangeIds(a,b,total,`Baris ${i+1}`);return {label:rangeText(a,b),slug:slugRange(a,b),ids}}).filter(Boolean);if(!ranges.length)throw Error('Lengkapi minimal satu baris rentang.');return ranges}const ranges=selectionRanges();if(!ranges.length)throw Error('Pilih minimal satu halaman di pratinjau PDF.');return ranges.map(r=>{const ids=rangeIds(r.start,r.end,total,'Halaman pilihan');return {label:rangeText(r.start,r.end),slug:slugRange(r.start,r.end),ids}})}
function renderSplitSummary(){const el=document.getElementById('splitSummary');if(!el)return;if(!selectedFiles.length){el.className='split-summary';el.innerHTML='<span class="summary-title">Mulai dengan memilih file PDF.</span><span class="summary-note">Setelah itu Anda bisa mengatur rentang lewat tabel, manual, atau pratinjau halaman.</span>';return}if(splitState.mode==='picker'&&!splitState.selected.size){el.className='split-summary';el.innerHTML='<span class="summary-title">Belum ada halaman dipilih.</span><span class="summary-note">Klik halaman pada pratinjau. Halaman yang bersebelahan otomatis digabung menjadi satu rentang.</span>';return}try{const ranges=currentSplitRanges();el.className='split-summary';el.innerHTML=`<span class="summary-chips">${ranges.map(r=>`<span class="range-chip">${r.label}<em>${r.ids.length} hlm</em></span>`).join('')}</span><span class="summary-note"><b>${ranges.length} file PDF</b> akan dibuat${ranges.length>1?' dan diunduh sebagai ZIP':''}.</span>`}catch(e){el.className='split-summary warn';el.innerHTML=`<span class="summary-warn-icon">!</span><span class="summary-note">${escapeHTML(e.message)}</span>`}}
function updateSplitFile(){if(!activeTool||activeTool.id!=='split'||!document.getElementById('splitBuilder'))return;const file=selectedFiles[0]||null;if(file===splitState.file)return;if(splitState.doc&&splitState.doc.destroy){try{splitState.doc.destroy()}catch(e){}}splitState.file=file;splitState.token++;splitState.thumbToken++;splitState.doc=null;splitState.total=0;splitState.selected=new Set();splitState.renderedPages=new Set();splitState.limit=30;if(!file){renderSplitPanel();return}const token=splitState.token;(async()=>{try{const bytes=new Uint8Array(await file.arrayBuffer()),doc=await pdfjsLib.getDocument({data:bytes}).promise;if(token!==splitState.token){try{doc.destroy()}catch(e){}return}splitState.doc=doc;splitState.total=doc.numPages;if(splitState.rows.length===1&&splitState.rows[0].start===''&&splitState.rows[0].end==='')splitState.rows=[{start:'1',end:'1'}];renderSplitPanel()}catch(e){if(token===splitState.token){splitState.total=0;renderSplitPanel();showError('Pratinjau PDF gagal dimuat. Pastikan file tidak rusak atau terkunci.')}}})();renderSplitPanel()}

const jpgState={file:null,doc:null,total:0,mode:'all',range:'',selected:new Set(),token:0,thumbToken:0,limit:30,renderedPages:new Set()};
function releaseJpgDoc(){jpgState.token++;jpgState.thumbToken++;if(jpgState.doc){try{jpgState.doc.destroy()}catch(error){}jpgState.doc=null}}
function initJpgBuilder(){const builder=document.getElementById('jpgBuilder');if(!builder)return;releaseJpgDoc();jpgState.file=null;jpgState.total=0;jpgState.mode='all';jpgState.range='';jpgState.selected=new Set();jpgState.limit=30;jpgState.renderedPages=new Set();const input=document.getElementById('jpgRangeField');if(input)input.value='';builder.querySelectorAll('[data-jpg-mode]').forEach(button=>button.addEventListener('click',()=>{if(jpgState.mode===button.dataset.jpgMode)return;jpgState.mode=button.dataset.jpgMode;syncJpgChrome();renderJpgSelection();if(jpgState.mode==='range'){const field=document.getElementById('jpgRangeField');if(field)field.focus()}}));if(input)input.addEventListener('input',()=>{jpgState.range=input.value;renderJpgSelection()});builder.addEventListener('click',handleJpgClick);syncJpgChrome();renderJpgGrid();renderJpgSelection();updateJpgFile()}
function syncJpgChrome(){const builder=document.getElementById('jpgBuilder');if(!builder)return;builder.querySelectorAll('[data-jpg-mode]').forEach(button=>{const active=button.dataset.jpgMode===jpgState.mode;button.classList.toggle('active',active);button.setAttribute('aria-selected',active?'true':'false')});const wrap=document.getElementById('jpgRangeWrap');if(wrap)wrap.hidden=jpgState.mode!=='range';builder.querySelectorAll('[data-jpg-pick-all],[data-jpg-pick-clear]').forEach(button=>{button.hidden=jpgState.mode!=='picker'||!jpgState.total});renderJpgSummary()}
function jpgActivePages(){if(!jpgState.total)return[];if(jpgState.mode==='all')return Array.from({length:jpgState.total},(_,index)=>index+1);if(jpgState.mode==='range'){try{return parsePages(jpgState.range,jpgState.total).map(id=>id+1)}catch(error){return[]}}return [...jpgState.selected].sort((a,b)=>a-b)}
function jpgPageCard(page){return `<button type="button" class="page-thumb" data-page="${page}" aria-pressed="false" aria-label="Halaman ${page}"><span class="page-thumb-canvas"><canvas></canvas><span class="page-thumb-sheen"></span></span><span class="page-thumb-label">${page}</span></button>`}
function appendJpgCards(from,to){const grid=document.getElementById('jpgPageGrid');if(!grid)return;const html=[];for(let page=from;page<=to;page++)html.push(jpgPageCard(page));grid.insertAdjacentHTML('beforeend',html.join(''));const more=document.getElementById('jpgLoadMore');if(more){more.hidden=jpgState.limit>=jpgState.total;more.textContent=`Muat halaman berikutnya (${Math.max(0,jpgState.total-jpgState.limit)} lagi)`}renderJpgThumbs();renderJpgSelection()}
function renderJpgThumbs(){const grid=document.getElementById('jpgPageGrid');if(!grid||!jpgState.doc)return;const token=++jpgState.thumbToken,doc=jpgState.doc;(async()=>{for(const card of [...grid.querySelectorAll('.page-thumb')]){const pageNumber=+card.dataset.page;if(jpgState.renderedPages.has(pageNumber))continue;const canvas=card.querySelector('canvas');if(!canvas)continue;try{const page=await doc.getPage(pageNumber);if(token!==jpgState.thumbToken||!canvas.isConnected)return;const base=page.getViewport({scale:1}),viewport=page.getViewport({scale:360/base.width});canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:canvas.getContext('2d',{alpha:false}),viewport,background:'#ffffff'}).promise;if(token!==jpgState.thumbToken)return;card.classList.add('rendered');jpgState.renderedPages.add(pageNumber)}catch(error){card.classList.add('thumb-failed')}}})()}
function renderJpgGrid(){const grid=document.getElementById('jpgPageGrid');if(!grid)return;const more=document.getElementById('jpgLoadMore');if(!jpgState.total){grid.innerHTML=`<div class="picker-empty jpg-empty"><span class="picker-empty-icon">${icon('image')}</span><span>${selectedFiles.length?'Pratinjau halaman sedang dimuat…':'Pratinjau halaman akan muncul di sini setelah PDF dipilih.'}</span></div>`;if(more)more.hidden=true;return}const limit=Math.min(jpgState.limit,jpgState.total),html=[];for(let page=1;page<=limit;page++)html.push(jpgPageCard(page));grid.innerHTML=html.join('');if(more){more.hidden=limit>=jpgState.total;more.textContent=`Muat halaman berikutnya (${Math.max(0,jpgState.total-limit)} lagi)`}renderJpgThumbs()}
function renderJpgSummary(){const status=document.getElementById('jpgStatus'),summary=document.getElementById('jpgSummary');if(status){if(!selectedFiles.length)status.textContent='Pilih file PDF dulu untuk melihat pratinjau halaman.';else if(!jpgState.total)status.textContent=selectedFiles.length?'Menyiapkan pratinjau halaman…':'';else if(jpgState.mode==='all')status.textContent=`Semua ${jpgState.total} halaman dipilih.`;else if(jpgState.mode==='range')status.textContent=jpgState.range.trim()?'Halaman pada rentang ditandai di pratinjau.':'Tulis rentang halaman, lalu halaman yang cocok akan ditandai.';else status.textContent=jpgState.selected.size?`${jpgState.selected.size} halaman dipilih dari ${jpgState.total}.`:'Klik halaman pada pratinjau untuk memilih.'}if(!summary)return;if(!selectedFiles.length){summary.className='split-summary';summary.innerHTML='<span class="summary-title">Mulai dengan memilih file PDF.</span><span class="summary-note">Semua halaman, rentang tertentu, atau halaman pilihan bisa diubah menjadi JPG.</span>';return}if(!jpgState.total){summary.className='split-summary';summary.innerHTML='<span class="summary-note">Pratinjau PDF sedang disiapkan…</span>';return}if(jpgState.mode==='range'){if(!jpgState.range.trim()){summary.className='split-summary warn';summary.innerHTML='<span class="summary-warn-icon">!</span><span class="summary-note">Masukkan rentang halaman, misalnya 1-3, 5, 8-10.</span>';return}try{parsePages(jpgState.range,jpgState.total)}catch(error){summary.className='split-summary warn';summary.innerHTML=`<span class="summary-warn-icon">!</span><span class="summary-note">${escapeHTML(error.message)}</span>`;return}}const pages=jpgActivePages();if(!pages.length){summary.className='split-summary warn';summary.innerHTML='<span class="summary-warn-icon">!</span><span class="summary-note">Pilih minimal satu halaman pada pratinjau atau masukkan rentang yang valid.</span>';return}const ranges=pagesToRanges(pages);summary.className='split-summary';summary.innerHTML=`<span class="summary-chips">${ranges.slice(0,12).map(range=>`<span class="range-chip">${rangeText(range.start,range.end)}<em>${range.end-range.start+1} hlm</em></span>`).join('')}${ranges.length>12?`<span class="range-chip">+${ranges.length-12} rentang</span>`:''}</span><span class="summary-note"><b>${pages.length} file JPG</b> akan dibuat${pages.length>1?' dan diunduh sebagai ZIP':' dan langsung diunduh'}.</span>`}
function renderJpgSelection(){const grid=document.getElementById('jpgPageGrid');if(grid){const active=new Set(jpgActivePages());grid.querySelectorAll('.page-thumb').forEach(card=>{const on=active.has(+card.dataset.page);card.classList.toggle('selected',on);card.setAttribute('aria-pressed',on?'true':'false')})}renderJpgSummary()}
function handleJpgClick(event){const button=event.target.closest('button');if(!button)return;const pageCard=button.closest('.page-thumb');if(pageCard){const pageNumber=+pageCard.dataset.page;if(jpgState.mode!=='picker'){jpgState.mode='picker';syncJpgChrome()}if(jpgState.selected.has(pageNumber))jpgState.selected.delete(pageNumber);else jpgState.selected.add(pageNumber);renderJpgSelection();return}if(button.matches('[data-jpg-pick-all]')){for(let page=1;page<=jpgState.total;page++)jpgState.selected.add(page);renderJpgSelection();return}if(button.matches('[data-jpg-pick-clear]')){jpgState.selected.clear();renderJpgSelection();return}if(button.matches('[data-jpg-load-more]')){const from=jpgState.limit+1;jpgState.limit=Math.min(jpgState.total,jpgState.limit+30);appendJpgCards(from,jpgState.limit);return}}
function updateJpgFile(){if(!activeTool||activeTool.id!=='toJpg'||!document.getElementById('jpgBuilder'))return;const file=selectedFiles[0]||null;if(file===jpgState.file&&(file?!!jpgState.doc:true))return;releaseJpgDoc();jpgState.file=file;jpgState.total=0;jpgState.selected=new Set();jpgState.renderedPages=new Set();jpgState.limit=30;if(!file){syncJpgChrome();renderJpgGrid();renderJpgSelection();return}const token=++jpgState.token;(async()=>{try{const doc=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;if(token!==jpgState.token){try{doc.destroy()}catch(error){}return}jpgState.doc=doc;jpgState.total=doc.numPages;jpgState.limit=Math.min(30,doc.numPages);syncJpgChrome();renderJpgGrid();renderJpgSelection()}catch(error){if(token===jpgState.token){jpgState.total=0;syncJpgChrome();renderJpgGrid();renderJpgSelection();showError('Pratinjau PDF gagal dimuat. Pastikan file tidak rusak atau terkunci.')}}})();syncJpgChrome();renderJpgGrid();renderJpgSelection()}
function wireDropzone(){const dz=document.getElementById('dropzone');if(!dz)return;dz.onclick=()=>fileInput.click();dz.ondragover=e=>{e.preventDefault();dz.classList.add('dragover')};dz.ondragleave=()=>dz.classList.remove('dragover');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('dragover');addFiles(e.dataTransfer.files)};fileInput.onchange=()=>{addFiles(fileInput.files);fileInput.value=''}}
function addFiles(files){
 const incoming=[...files];
 const valid=incoming.filter(file=>activeTool.input==='images'?file.type.startsWith('image/'):file.type==='application/pdf'||file.name.toLowerCase().endsWith('.pdf'));
 if(!valid.length&&incoming.length){showError(activeTool.input==='images'?'Pilih file gambar PNG, JPG, atau WEBP.':'Pilih file PDF yang valid.');return}
 processRun++;
 resetProcessActionButton();
 hideProgress();
 hideDocProgress();
 if(['merge','extract','rotate'].includes(activeTool.id))resetProcessedPreview();
 const batch=activeTool.input==='pdf-multiple'||activeTool.input==='images'||BATCH_TOOLS.includes(activeTool.id);if(!batch)selectedFiles=[];const accepted=batch?valid:valid.slice(0,1);selectedFiles.push(...accepted.filter(file=>!selectedFiles.some(old=>old.name===file.name&&old.size===file.size)));
 renderFileRows();if(incoming.length)document.getElementById('modalError').classList.remove('show')
}
function closeModal(cancelRun=true){if(cancelRun)processRun++;hideProgress();syncSplitFields();releaseProcessedPreview();releaseRotateDoc();releaseJpgDoc();releaseImagePreviews();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function resetProcessActionButton(){const b=document.getElementById('modalAction');if(!b||!activeTool)return;b.disabled=false;b.classList.remove('loading');b.innerHTML=`<span>${activeTool.action}</span><span>↗</span>`}
function showError(msg){let e=document.getElementById('modalError');e.textContent=msg;e.classList.add('show')}
function filenameBase(name){return name.replace(/\.pdf$/i,'').replace(/[^\w\-]+/g,'-').replace(/^-|-$/g,'')||'dokumen'}
function splitFileName(name){const raw=String(name||'').trim()||'dokumen',match=/^(.*?)(\.[a-z0-9]{1,10})$/i.exec(raw);if(match&&match[1].trim())return {stem:match[1],ext:match[2].toLowerCase()};return {stem:raw,ext:''}}
function sanitizeFileStem(value,fallback){const cleaned=String(value||'').replace(/[\\/:*?"<>|\u0000-\u001f]+/g,'-').replace(/\s+/g,' ').replace(/^[.\-\s]+|[.\-\s]+$/g,'').slice(0,120);return cleaned||fallback||'dokumen'}
const saveDialogState={data:null,type:'application/pdf',name:'',defaultStem:'',ext:'',returnFocus:null,onConfirm:null};
function saveDialogParts(){return {dialog:document.getElementById('saveDialog'),input:document.getElementById('saveNameInput'),ext:document.getElementById('saveExt'),hint:document.getElementById('saveDialogHint'),confirm:document.getElementById('saveDialogConfirm'),presets:document.getElementById('savePresetRow')}}
function performDownload(data,name,type){const blob=data instanceof Blob?data:new Blob([data],{type:type||'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function savePresetStem(preset){const base=saveDialogState.defaultStem||'dokumen',now=new Date(),pad=n=>String(n).padStart(2,'0');if(preset==='date')return `${base}-${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;if(preset==='datetime')return `${base}-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;return base}
function markSavePreset(preset){const row=document.getElementById('savePresetRow');if(!row)return;row.querySelectorAll('[data-save-preset]').forEach(button=>{const active=button.dataset.savePreset===preset;button.classList.toggle('active',active);button.setAttribute('aria-pressed',active?'true':'false')})}
function openSaveDialog(data,name,type,onConfirm){
  const parts=saveDialogParts(),split=splitFileName(name);
  saveDialogState.data=data;saveDialogState.type=type||'application/pdf';saveDialogState.name=name;saveDialogState.defaultStem=split.stem;saveDialogState.ext=split.ext;saveDialogState.onConfirm=typeof onConfirm==='function'?onConfirm:null;
  if(!parts.dialog){performDownload(data,name,type);const cb=saveDialogState.onConfirm;saveDialogState.onConfirm=null;if(cb)try{cb()}catch(e){}return}
  if(!saveDialogState.returnFocus||!saveDialogState.returnFocus.isConnected)saveDialogState.returnFocus=document.activeElement;
  parts.input.value=split.stem;parts.ext.textContent=split.ext||'';parts.hint.textContent=split.ext?`Ekstensi ${split.ext} mengikuti hasil alat ini.`:'Ekstensi mengikuti hasil alat ini.';
  markSavePreset('default');
  parts.dialog.classList.add('open');parts.dialog.setAttribute('aria-hidden','false');
  document.body.classList.add('save-dialog-open');
  requestAnimationFrame(()=>{parts.input.focus();parts.input.select()});
}
function download(data,name,type='application/pdf',onConfirm){openSaveDialog(data,name,type,onConfirm)}
function closeSaveDialog(){
  const parts=saveDialogParts();if(!parts.dialog||!parts.dialog.classList.contains('open'))return;
  parts.dialog.classList.remove('open');parts.dialog.setAttribute('aria-hidden','true');document.body.classList.remove('save-dialog-open');
  saveDialogState.data=null;saveDialogState.name='';
  const target=saveDialogState.returnFocus;saveDialogState.returnFocus=null;
  if(target&&target.isConnected&&target.getClientRects().length){try{target.focus({preventScroll:true})}catch(e){}}
}
function confirmSaveDialog(){
  const parts=saveDialogParts();if(!parts.dialog)return;
  const ext=saveDialogState.ext||'',fallback=saveDialogState.defaultStem||'dokumen';
  let stem=sanitizeFileStem(parts.input.value,fallback);
  if(ext&&stem.toLowerCase().endsWith(ext.toLowerCase()))stem=sanitizeFileStem(stem.slice(0,-ext.length),fallback);
  const name=stem+ext,cb=saveDialogState.onConfirm;
  performDownload(saveDialogState.data,name,saveDialogState.type||'application/pdf');
  closeSaveDialog();
  if(cb)try{cb(name)}catch(e){}
}
(()=>{const parts=saveDialogParts();if(!parts.dialog)return;
  parts.dialog.addEventListener('click',e=>{if(e.target===parts.dialog)closeSaveDialog()});
  document.getElementById('saveDialogCancel').addEventListener('click',closeSaveDialog);
  parts.confirm.addEventListener('click',confirmSaveDialog);
  parts.input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();confirmSaveDialog()}else if(e.key==='Escape'){e.preventDefault();closeSaveDialog()}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&parts.dialog.classList.contains('open')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();closeSaveDialog()}},true);
  parts.input.addEventListener('input',()=>markSavePreset(''));
  parts.presets.addEventListener('click',e=>{const button=e.target.closest('[data-save-preset]');if(!button)return;const preset=button.dataset.savePreset;parts.input.value=savePresetStem(preset);markSavePreset(preset);parts.input.focus();parts.input.select()});
  parts.dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeSaveDialog();return}if(e.key!=='Tab')return;const focusable=[...parts.dialog.querySelectorAll('button:not(:disabled),input:not(:disabled)')];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
})();
function parsePages(str,total){if(!String(str??'').trim())throw Error('Masukkan rentang halaman terlebih dahulu.');const pages=[];for(const part of str.split(',')){let m=part.trim().match(/^(\d+)(?:\s*[-–—−]\s*(\d+))?$/);if(!m)throw Error(`Format rentang “${part.trim()}” tidak valid.`);for(const id of rangeIds(m[1],m[2]||m[1],total,`Rentang ${part.trim()}`))if(!pages.includes(id))pages.push(id)}return pages}
async function readPDF(file){const bytes=await file.arrayBuffer();return {bytes,doc:await PDFDocument.load(bytes)}}
async function convertToPdfA(file,onProgress){const images=await renderPdfPagesToJpg(file,onProgress),doc=await PDFDocument.create();for(const image of images){const embedded=await doc.embedJpg(image.data),page=doc.addPage([image.width,image.height]);page.drawImage(embedded,{x:0,y:0,width:image.width,height:image.height})}const profileResponse=await fetch('./vendor/srgb.icc');if(!profileResponse.ok)throw Error('Profil warna sRGB tidak tersedia. Muat ulang halaman lalu coba lagi.');const profileBytes=new Uint8Array(await profileResponse.arrayBuffer()),profileDict=PDFDict.withContext(doc.context);profileDict.set(PDFName.of('N'),PDFNumber.of(3));profileDict.set(PDFName.of('Alternate'),PDFName.of('DeviceRGB'));const profileRef=doc.context.register(PDFRawStream.of(profileDict,profileBytes)),intent=PDFDict.withContext(doc.context);intent.set(PDFName.of('Type'),PDFName.of('OutputIntent'));intent.set(PDFName.of('S'),PDFName.of('GTS_PDFA2'));intent.set(PDFName.of('OutputConditionIdentifier'),PDFString.of('sRGB IEC61966-2.1'));intent.set(PDFName.of('Info'),PDFString.of('sRGB IEC61966-2.1'));intent.set(PDFName.of('DestOutputProfile'),profileRef);const intentRef=doc.context.register(intent),intents=PDFArray.withContext(doc.context);intents.push(intentRef);doc.catalog.set(PDFName.of('OutputIntents'),intents);doc.catalog.set(PDFName.of('Version'),PDFName.of('1.7'));const title=file.name.replace(/\.pdf$/i,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c])),date=new Date().toISOString().replace(/\.\d{3}Z$/,'Z');doc.setTitle(title);doc.setCreator('Paperly');doc.setProducer('Paperly');doc.setModificationDate(new Date());const xmp=`<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmp="http://ns.adobe.com/xap/1.0/"><pdfaid:part>2</pdfaid:part><pdfaid:conformance>B</pdfaid:conformance><dc:title><rdf:Alt><rdf:li xml:lang="x-default">${title}</rdf:li></rdf:Alt></dc:title><xmp:CreatorTool>Paperly</xmp:CreatorTool><xmp:ModifyDate>${date}</xmp:ModifyDate></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`,metadataDict=PDFDict.withContext(doc.context);metadataDict.set(PDFName.of('Type'),PDFName.of('Metadata'));metadataDict.set(PDFName.of('Subtype'),PDFName.of('XML'));doc.catalog.set(PDFName.of('Metadata'),doc.context.register(PDFRawStream.of(metadataDict,new TextEncoder().encode(xmp))));return doc.save({useObjectStreams:false})}
async function flattenPdf(file,onProgress){
  const pdf=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
  const out=await PDFDocument.create();
  try{
    for(let i=1;i<=pdf.numPages;i++){
      const page=await pdf.getPage(i),base=page.getViewport({scale:1});
      const scale=Math.max(1,Math.min(3,4500/Math.max(base.width,base.height)));
      const viewport=page.getViewport({scale}),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});
      if(!ctx)throw Error('Browser tidak dapat merender halaman. Coba browser lain.');
      canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
      await page.render({canvasContext:ctx,viewport,background:'#ffffff'}).promise;
      const raster=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
      canvas.width=1;canvas.height=1;
      if(!raster)throw Error(`Gagal merender halaman ${i}. Coba gunakan file lain.`);
      const image=await out.embedPng(await raster.arrayBuffer()),pdfPage=out.addPage([base.width,base.height]);
      pdfPage.drawImage(image,{x:0,y:0,width:base.width,height:base.height});
      if(onProgress)onProgress(i/pdf.numPages*.94);
    }
    if(onProgress)onProgress(.97);
    return await out.save({useObjectStreams:true});
  }finally{if(pdf.destroy)try{pdf.destroy()}catch(error){}}
}
async function renderPdfPagesToJpg(file,pages,onProgress,options={}){if(typeof pages==='function'){options=onProgress||{};onProgress=pages;pages=null}const bytes=new Uint8Array(await file.arrayBuffer()),pdf=await pdfjsLib.getDocument({data:bytes}).promise,outputs=[],base=filenameBase(file.name),list=Array.isArray(pages)&&pages.length?pages:Array.from({length:pdf.numPages},(_,i)=>i+1),scale=options.scale||1.5,quality=options.quality||.92;try{for(let index=0;index<list.length;index++){const pageNumber=list[index];if(!Number.isInteger(pageNumber)||pageNumber<1||pageNumber>pdf.numPages)throw Error(`Halaman ${pageNumber} tidak tersedia di PDF ini.`);const page=await pdf.getPage(pageNumber),viewport=page.getViewport({scale}),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Browser tidak dapat membuat gambar. Coba browser lain.');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);const width=viewport.width,height=viewport.height;await page.render({canvasContext:ctx,viewport,background:'#ffffff'}).promise;const image=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));canvas.width=1;canvas.height=1;if(!image)throw Error(`Gagal membuat gambar halaman ${pageNumber}.`);outputs.push({page:pageNumber,name:`${base}-halaman-${String(pageNumber).padStart(3,'0')}.jpg`,data:new Uint8Array(await image.arrayBuffer()),width,height});if(onProgress)onProgress((index+1)/list.length)}return outputs}finally{if(pdf.destroy)try{pdf.destroy()}catch(error){}}}
function hexToRgbColor(hex){const n=parseInt(hex.slice(1),16);return rgb((n>>16&255)/255,(n>>8&255)/255,(n&255)/255)}
let tesseractPromise=null;
function loadTesseract(){if(tesseractPromise)return tesseractPromise;tesseractPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';s.onload=()=>resolve(globalThis.Tesseract);s.onerror=()=>{tesseractPromise=null;reject(Error('Gagal memuat mesin OCR dari internet. Periksa koneksi lalu coba lagi.'))};document.head.appendChild(s)});return tesseractPromise}

/* ===== Editor PDF: teks, gambar, dan coretan langsung di atas halaman ===== */
const editor={doc:null,file:null,total:0,page:1,items:{},tool:'text',color:'#4a5df0',size:16,token:0,renderToken:0,selected:null,canvasW:0,canvasH:0,pageW:595,pageH:842,pendingImageAt:null};
function initEditor(){const wrap=document.getElementById('pdfEditor');if(!wrap)return;wrap.querySelectorAll('[data-etool]').forEach(b=>b.addEventListener('click',()=>{editor.tool=b.dataset.etool;wrap.querySelectorAll('[data-etool]').forEach(x=>x.classList.toggle('active',x===b));setEditorHint()}));wrap.querySelectorAll('[data-eact]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.eact==='delete-item')deleteEditorSelected();else clearEditorPage()}));document.getElementById('editorColor').addEventListener('input',e=>{editor.color=e.target.value});document.getElementById('editorSize').addEventListener('change',e=>{editor.size=+e.target.value});document.getElementById('editorPrev').addEventListener('click',()=>gotoEditorPage(editor.page-1));document.getElementById('editorNext').addEventListener('click',()=>gotoEditorPage(editor.page+1));document.getElementById('editorImageInput').addEventListener('change',e=>{addEditorImage(e.target.files[0]);e.target.value=''});const stage=document.getElementById('editorStage');stage.addEventListener('pointerdown',onEditorStagePointerDown)}
function setEditorHint(){const h=document.getElementById('editorHint');if(!h)return;h.textContent=editor.tool==='text'?'Klik halaman untuk menambah teks. Seret untuk memindah.':editor.tool==='image'?'Pilih gambar dari perangkat, lalu klik halaman untuk menempatkannya.':'Gambar bebas dengan pensil di atas halaman.'}
function updateEditorFile(){if(!activeTool||activeTool.id!=='edit'||!document.getElementById('pdfEditor'))return;const file=selectedFiles[0]||null;if(file===editor.file)return;if(editor.doc){try{editor.doc.destroy()}catch{}}editor.file=file;editor.doc=null;editor.total=0;editor.page=1;editor.items={};editor.selected=null;const token=++editor.token;(async()=>{try{const bytes=new Uint8Array(await file.arrayBuffer()),doc=await pdfjsLib.getDocument({data:bytes}).promise;if(token!==editor.token){try{doc.destroy()}catch{}return}editor.doc=doc;editor.total=doc.numPages;renderEditorPage();renderEditorChrome()}catch(e){if(token===editor.token){editor.doc=null;editor.total=0;renderEditorPage();showError('Pratinjau PDF gagal dimuat. Pastikan file tidak rusak atau terkunci.')}}})();renderEditorChrome()}
function renderEditorChrome(){const label=document.getElementById('editorPageLabel');if(label)label.textContent=editor.total?`Halaman ${editor.page} dari ${editor.total}`:'Halaman — dari —';const prev=document.getElementById('editorPrev'),next=document.getElementById('editorNext');if(prev)prev.disabled=editor.page<=1;if(next)next.disabled=!editor.total||editor.page>=editor.total}
function gotoEditorPage(p){if(!editor.doc||p<1||p>editor.total)return;editor.page=p;editor.selected=null;renderEditorPage();renderEditorChrome()}
async function renderEditorPage(){const canvas=document.getElementById('editorPageCanvas'),ink=document.getElementById('editorInkCanvas'),layer=document.getElementById('editorItems'),empty=document.getElementById('editorEmpty');if(!canvas)return;if(!editor.doc){canvas.width=ink.width=canvas.height=ink.height=10;layer.innerHTML='';if(empty)empty.style.display='grid';return}if(empty)empty.style.display='none';const token=++editor.renderToken,page=await editor.doc.getPage(editor.page);if(token!==editor.renderToken)return;const base=page.getViewport({scale:1}),scale=Math.min(640/base.width,560/base.height,2),vp=page.getViewport({scale});editor.canvasW=Math.ceil(vp.width);editor.canvasH=Math.ceil(vp.height);editor.pageW=base.width;editor.pageH=base.height;canvas.width=ink.width=editor.canvasW;canvas.height=ink.height=editor.canvasH;await page.render({canvasContext:canvas.getContext('2d'),viewport:vp,background:'#ffffff'}).promise;if(token!==editor.renderToken)return;redrawEditorInk();renderEditorItems()}
function redrawEditorInk(){const ink=document.getElementById('editorInkCanvas');if(!ink)return;const ctx=ink.getContext('2d');ctx.clearRect(0,0,ink.width,ink.height);for(const it of editor.items[editor.page]||[])if(it.type==='ink')strokeEditorPath(ctx,it)}
function strokeEditorPath(ctx,it){if(it.points.length<2){const p=it.points[0];if(p){ctx.beginPath();ctx.fillStyle=it.color;ctx.arc(p.x*ctx.canvas.width,p.y*ctx.canvas.height,Math.max(2,it.w*ctx.canvas.width),0,Math.PI*2);ctx.fill()}return}ctx.beginPath();ctx.strokeStyle=it.color;ctx.lineWidth=Math.max(1.5,it.w*ctx.canvas.width);ctx.lineCap='round';ctx.lineJoin='round';ctx.moveTo(it.points[0].x*ctx.canvas.width,it.points[0].y*ctx.canvas.height);for(const p of it.points.slice(1))ctx.lineTo(p.x*ctx.canvas.width,p.y*ctx.canvas.height);ctx.stroke()}
function renderEditorItems(){const layer=document.getElementById('editorItems');if(!layer)return;layer.innerHTML='';(editor.items[editor.page]||[]).forEach((it,idx)=>{if(it.type!=='ink')layer.appendChild(makeEditorItemEl(it,idx))})}
function refreshEditorSelection(){document.querySelectorAll('.editor-item').forEach(el=>el.classList.toggle('selected',+el.dataset.idx===editor.selected))}
function makeEditorItemEl(it,idx){const el=document.createElement('div');el.className='editor-item'+(editor.selected===idx?' selected':'');el.dataset.idx=idx;el.style.left=it.x*100+'%';el.style.top=it.y*100+'%';if(it.type==='text'){el.classList.add('is-text');const span=document.createElement('span');span.className='editor-item-text';span.contentEditable='true';span.spellcheck=false;span.textContent=it.text;span.style.color=it.color;span.style.fontSize=(it.size*editor.canvasW/editor.pageW)+'px';span.addEventListener('input',()=>{it.text=span.textContent});el.appendChild(span)}else{el.classList.add('is-image');el.style.width=it.w*100+'%';const img=document.createElement('img');img.src=it.src;img.alt='Gambar sisipan';el.appendChild(img);const handle=document.createElement('span');handle.className='editor-item-resize';el.appendChild(handle)}el.addEventListener('pointerdown',e=>startEditorDrag(e,it,el));return el}
function startEditorDrag(e,it,el){e.stopPropagation();const resizing=!!e.target.closest('.editor-item-resize');editor.selected=+el.dataset.idx;refreshEditorSelection();const stage=document.getElementById('editorStage'),r=stage.getBoundingClientRect();dragState={mode:resizing?'resize':'move',it,el,sx:e.clientX,sy:e.clientY,x0:resizing?it.w:it.x,y0:it.y};window.addEventListener('pointermove',moveEditorDrag);window.addEventListener('pointerup',endEditorDrag)}
let dragState=null;
function moveEditorDrag(e){if(!dragState)return;const stage=document.getElementById('editorStage'),r=stage.getBoundingClientRect();if(dragState.mode==='move'){dragState.it.x=Math.min(.98,Math.max(-.3,dragState.x0+(e.clientX-dragState.sx)/r.width));dragState.it.y=Math.min(.98,Math.max(-.3,dragState.y0+(e.clientY-dragState.sy)/r.height));dragState.el.style.left=dragState.it.x*100+'%';dragState.el.style.top=dragState.it.y*100+'%'}else{const w=Math.min(1,Math.max(.05,dragState.x0+(e.clientX-dragState.sx)/r.width));dragState.it.w=w;dragState.el.style.width=w*100+'%'}}
function endEditorDrag(){window.removeEventListener('pointermove',moveEditorDrag);window.removeEventListener('pointerup',endEditorDrag);dragState=null}
function onEditorStagePointerDown(e){if(!editor.doc||e.target.closest('.editor-item'))return;const stage=document.getElementById('editorStage'),r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;if(editor.tool==='ink'){const it={type:'ink',points:[{x,y}],color:editor.color,w:.005};(editor.items[editor.page]??=[]).push(it);editor.drawing=it;const move=ev=>{if(!editor.drawing)return;const p={x:Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width)),y:Math.min(1,Math.max(0,(ev.clientY-r.top)/r.height))};const pts=editor.drawing.points,last=pts[pts.length-1];if(Math.hypot(p.x-last.x,p.y-last.y)>.004){pts.push(p);redrawEditorInk()}};const up=()=>{editor.drawing=null;window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up)}else if(editor.tool==='text'){const it={type:'text',text:'Tulis di sini',color:editor.color,size:editor.size,x:Math.min(.85,Math.max(0,x)),y:Math.min(.93,Math.max(0,y))};(editor.items[editor.page]??=[]).push(it);editor.selected=(editor.items[editor.page].length-1);renderEditorItems();const span=document.querySelector(`.editor-item[data-idx="${editor.selected}"] .editor-item-text`);if(span){span.focus();document.getSelection().selectAllChildren(span)}}else if(editor.tool==='image'){editor.pendingImageAt={x:Math.min(.6,Math.max(0,x)),y:Math.min(.9,Math.max(0,y))};document.getElementById('editorImageInput').click()}}
async function addEditorImage(file){if(!file)return;const dataUrl=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>res(null);r.readAsDataURL(file)});if(!dataUrl){showError('Gambar tidak bisa dibaca.');return}const dim=await new Promise(res=>{const i=new Image();i.onload=()=>res({aspect:i.naturalHeight/i.naturalWidth,natural:i.naturalWidth});i.onerror=()=>res(null);i.src=dataUrl});if(!dim){showError('Gambar tidak bisa dibaca.');return}const at=editor.pendingImageAt||{x:.3,y:.3};const it={type:'image',src:dataUrl,x:at.x,y:at.y,w:Math.min(.4,dim.natural/editor.pageW)||.3,aspect:dim.aspect};(editor.items[editor.page]??=[]).push(it);editor.selected=editor.items[editor.page].length-1;renderEditorItems()}
function deleteEditorSelected(){const list=editor.items[editor.page];if(editor.selected==null||!list||!list[editor.selected])return;list.splice(editor.selected,1);editor.selected=null;renderEditorItems();redrawEditorInk()}
function clearEditorPage(){editor.items[editor.page]=[];editor.selected=null;renderEditorItems();redrawEditorInk()}
async function saveEditorPDF(onPage){const items=(editor.items[editor.page]||[]).concat(...Object.entries(editor.items).filter(([p])=>+p!==editor.page).map(([,v])=>v));if(!items.length)throw Error('Tambahkan minimal satu teks, gambar, atau coretan sebelum menyimpan.');const {doc}=await readPDF(selectedFiles[0]);const font=await doc.embedFont(StandardFonts.Helvetica);const pages=doc.getPages();for(let i=0;i<pages.length;i++){const list=editor.items[i+1]||[];if(!list.length)continue;const page=pages[i],{width,height}=page.getSize();const ink=list.filter(t=>t.type==='ink');if(ink.length){const c=document.createElement('canvas');c.width=Math.round(width*2);c.height=Math.round(height*2);const ctx=c.getContext('2d');for(const it of ink)strokeEditorPath(ctx,it);const blob=await new Promise(r=>c.toBlob(r,'image/png'));const img=await doc.embedPng(await blob.arrayBuffer());page.drawImage(img,{x:0,y:0,width,height});c.width=1;c.height=1}for(const it of list)if(it.type==='image'){const img=it.src.startsWith('data:image/png')?await doc.embedPng(it.src):await doc.embedJpg(it.src),w=it.w*width,h=w*it.aspect;page.drawImage(img,{x:it.x*width,y:height-it.y*height-h,width:w,height:h})}for(const it of list)if(it.type==='text'){const text=(it.text||'').trim();if(!text)continue;page.drawText(text,{x:Math.min(it.x*width,width-20),y:height-it.y*height-it.size*.8,size:it.size,font,color:hexToRgbColor(it.color)})}if(onPage)onPage((i+1)/pages.length)}return doc.save({useObjectStreams:true})}
/* ===== Redact PDF: tutup informasi rahasia secara permanen ===== */
const redact={doc:null,file:null,total:0,page:1,boxes:{},selected:null,token:0,renderToken:0,pageW:595,pageH:842};
function initRedact(){const wrap=document.getElementById('redactEditor');if(!wrap)return;wrap.querySelectorAll('[data-ract]').forEach(b=>b.addEventListener('click',()=>{b.blur();if(b.dataset.ract==='delete-item')deleteRedactSelected();else clearRedactPage()}));document.getElementById('redactPrev').addEventListener('click',()=>gotoRedactPage(redact.page-1));document.getElementById('redactNext').addEventListener('click',()=>gotoRedactPage(redact.page+1));document.getElementById('redactStage').addEventListener('pointerdown',onRedactStagePointerDown);updateRedactChrome()}
function updateRedactFile(){if(!activeTool||activeTool.id!=='redact'||!document.getElementById('redactEditor'))return;const file=selectedFiles[0]||null;if(file===redact.file)return;if(redact.doc){try{redact.doc.destroy()}catch{}}redact.file=file;redact.doc=null;redact.total=0;redact.page=1;redact.boxes={};redact.selected=null;const token=++redact.token;(async()=>{try{const bytes=new Uint8Array(await file.arrayBuffer()),doc=await pdfjsLib.getDocument({data:bytes}).promise;if(token!==redact.token){try{doc.destroy()}catch{}return}redact.doc=doc;redact.total=doc.numPages;renderRedactPage();updateRedactChrome()}catch(e){if(token===redact.token){redact.doc=null;redact.total=0;renderRedactPage();updateRedactChrome();showError('Pratinjau PDF gagal dimuat. Pastikan file tidak rusak atau terkunci.')}}})();updateRedactChrome()}
function gotoRedactPage(p){if(!redact.doc||p<1||p>redact.total)return;redact.page=p;redact.selected=null;renderRedactPage();updateRedactChrome()}
function updateRedactChrome(){const label=document.getElementById('redactPageLabel'),prev=document.getElementById('redactPrev'),next=document.getElementById('redactNext'),hint=document.getElementById('redactHint');const errEl=document.getElementById('modalError');if(errEl){errEl.classList.remove('show');errEl.textContent=''}if(label)label.textContent=redact.total?`Halaman ${redact.page} dari ${redact.total}`:'Halaman — dari —';if(prev)prev.disabled=!redact.total||redact.page<=1;if(next)next.disabled=!redact.total||redact.page>=redact.total;const list=redact.boxes[redact.page]||[];const del=document.querySelector('#redactEditor [data-ract="delete-item"]'),clr=document.querySelector('#redactEditor [data-ract="clear-page"]');if(del)del.disabled=redact.selected==null;if(clr)clr.disabled=!list.length;if(hint)hint.textContent=!redact.total?'Pilih file PDF untuk mulai menandai.':list.length?`${list.length} blok di halaman ini — klik blok untuk memindah atau menghapus.`:'Seret di halaman untuk menandai area rahasia.'}
async function renderRedactPage(){const canvas=document.getElementById('redactPageCanvas'),layer=document.getElementById('redactLayer'),empty=document.getElementById('redactEmpty');if(!canvas)return;if(!redact.doc){canvas.width=canvas.height=10;layer.innerHTML='';if(empty)empty.style.display='grid';return}if(empty)empty.style.display='none';const token=++redact.renderToken,page=await redact.doc.getPage(redact.page);if(token!==redact.renderToken)return;const base=page.getViewport({scale:1}),scale=Math.min(640/base.width,560/base.height,2),vp=page.getViewport({scale});redact.pageW=base.width;redact.pageH=base.height;canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);await page.render({canvasContext:canvas.getContext('2d'),viewport:vp,background:'#ffffff'}).promise;if(token!==redact.renderToken)return;renderRedactBoxes()}
function renderRedactBoxes(){const layer=document.getElementById('redactLayer');if(!layer)return;layer.innerHTML='';(redact.boxes[redact.page]||[]).forEach((box,idx)=>{const el=document.createElement('div');el.className='redact-box'+(redact.selected===idx?' selected':'');el.style.left=box.x*100+'%';el.style.top=box.y*100+'%';el.style.width=box.w*100+'%';el.style.height=box.h*100+'%';const handle=document.createElement('span');handle.className='redact-box-resize';el.appendChild(handle);el.addEventListener('pointerdown',e=>{e.stopPropagation();const resizing=!!e.target.closest('.redact-box-resize');redact.selected=idx;renderRedactBoxes();updateRedactChrome();startRedactBoxDrag(e,box,el,resizing?'resize':'move')});layer.appendChild(el)})}
function onRedactStagePointerDown(e){if(!redact.doc||e.target.closest('.redact-box'))return;const stage=document.getElementById('redactStage'),r=stage.getBoundingClientRect(),sx=(e.clientX-r.left)/r.width,sy=(e.clientY-r.top)/r.height;const preview=document.createElement('div');preview.className='redact-preview';stage.appendChild(preview);let box=null;const move=ev=>{const cx=Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width)),cy=Math.min(1,Math.max(0,(ev.clientY-r.top)/r.height));box={x:Math.min(sx,cx),y:Math.min(sy,cy),w:Math.abs(cx-sx),h:Math.abs(cy-sy)};preview.style.left=box.x*100+'%';preview.style.top=box.y*100+'%';preview.style.width=box.w*100+'%';preview.style.height=box.h*100+'%'};const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);preview.remove();if(box&&box.w>.015&&box.h>.015){(redact.boxes[redact.page]??=[]).push(box);redact.selected=redact.boxes[redact.page].length-1;renderRedactBoxes();updateRedactChrome()}};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up)}
function startRedactBoxDrag(e,box,el,mode){const stage=document.getElementById('redactStage'),r=stage.getBoundingClientRect(),sx=e.clientX,sy=e.clientY,x0=box.x,y0=box.y,w0=box.w,h0=box.h;const move=ev=>{if(mode==='move'){box.x=Math.min(1-box.w,Math.max(0,x0+(ev.clientX-sx)/r.width));box.y=Math.min(1-box.h,Math.max(0,y0+(ev.clientY-sy)/r.height))}else{box.w=Math.min(1-box.x,Math.max(.015,w0+(ev.clientX-sx)/r.width));box.h=Math.min(1-box.y,Math.max(.015,h0+(ev.clientY-sy)/r.height))}el.style.left=box.x*100+'%';el.style.top=box.y*100+'%';el.style.width=box.w*100+'%';el.style.height=box.h*100+'%'};const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up)}
function deleteRedactSelected(){const list=redact.boxes[redact.page];if(redact.selected==null||!list||!list[redact.selected])return;list.splice(redact.selected,1);redact.selected=null;renderRedactBoxes();updateRedactChrome()}
function clearRedactPage(){redact.boxes[redact.page]=[];redact.selected=null;renderRedactBoxes();updateRedactChrome()}
async function applyRedaction(file,onPage){const marked=Object.entries(redact.boxes).filter(([,list])=>list&&list.length);if(!marked.length)throw Error('Tandai minimal satu area dengan menggambar blok di pratinjau.');const bytes=new Uint8Array(await file.arrayBuffer()),pdf=await pdfjsLib.getDocument({data:bytes}).promise,{doc}=await readPDF(file),out=await PDFDocument.create();
for(let i=1;i<=pdf.numPages;i++){const list=redact.boxes[i]||[];if(!list.length){const [copied]=await out.copyPages(doc,[i-1]);out.addPage(copied);if(onPage)onPage(i/pdf.numPages);continue}const page=await pdf.getPage(i),base=page.getViewport({scale:1}),scale=Math.min(2,2200/base.width),vp=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);const ctx=canvas.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);await page.render({canvasContext:ctx,viewport:vp,background:'#ffffff'}).promise;ctx.fillStyle='#000';for(const box of list)ctx.fillRect(box.x*canvas.width,box.y*canvas.height,box.w*canvas.width,box.h*canvas.height);const jpg=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.92));canvas.width=1;canvas.height=1;if(!jpg)throw Error(`Gagal merender halaman ${i} untuk redaksi.`);const img=await out.embedJpg(await jpg.arrayBuffer()),pg=out.addPage([base.width,base.height]);pg.drawImage(img,{x:0,y:0,width:base.width,height:base.height});if(onPage)onPage(i/pdf.numPages)}
pdf.destroy();out.setProducer('Paperly');return out.save({useObjectStreams:false})}
/* ===== Pembuat PDF dari halaman kosong + konversi ke Word/PPT ===== */
const DOC_PAPER_SIZES={
 a4:{w:595.28,h:841.89,label:'A4 (210 × 297 mm)'},
 a5:{w:419.53,h:595.28,label:'A5 (148 × 210 mm)'},
 b5:{w:498.90,h:708.66,label:'B5 (176 × 250 mm)'},
 letter:{w:612,h:792,label:'Letter (216 × 279 mm)'},
 legal:{w:612,h:1008,label:'Legal (216 × 356 mm)'},
 f4:{w:609.45,h:935.43,label:'F4 / Folio (216 × 330 mm)'},
 a3:{w:841.89,h:1190.55,label:'A3 (297 × 420 mm)'}
};
const DOC_LAYOUT_DEFAULTS={paper:'a4',orientation:'portrait',marginTop:25.4,marginRight:25.4,marginBottom:25.4,marginLeft:25.4};
const DOC_ZOOM_MIN=.6,DOC_ZOOM_MAX=2.4,DOC_ZOOM_STEP=.1;
let docLayout={...DOC_LAYOUT_DEFAULTS},docZoom=1;
const DOC_COLUMN_GAP_CSS='1.5em';
const docMmToPt=mm=>Math.max(0,Number(mm)||0)*72/25.4;
const docMmToCssPx=mm=>Math.max(0,Number(mm)||0)*96/25.4;
function docLayoutPaper(){const paper=DOC_PAPER_SIZES[docLayout.paper]||DOC_PAPER_SIZES.a4;let w=paper.w,h=paper.h;if(docLayout.orientation==='landscape')[w,h]=[h,w];return {w,h,label:paper.label}}
function docIsTextEl(el){return !!el&&el.nodeType===1&&el.matches&&el.matches('p,h1,h2,h3,h4,li')}
function docListItemLabel(el){const parent=el&&el.parentElement;if(!parent)return null;if(parent.tagName==='UL')return '\u2022';if(parent.tagName==='OL')return `${[...parent.children].indexOf(el)+1}.`;return null}
function docNodeElement(node){return node?(node.nodeType===3?node.parentElement:node):null}
function docRangeInEditor(){const sel=document.getSelection();if(sel&&sel.rangeCount){const r=sel.getRangeAt(0),start=docNodeElement(r.startContainer),end=docNodeElement(r.endContainer);if(start&&start.closest&&start.closest('.doc-page')&&end&&end.closest&&end.closest('.doc-page'))return r}if(docLastRange&&docLastRange.startContainer&&docLastRange.startContainer.isConnected){const host=docNodeElement(docLastRange.startContainer);if(host&&host.closest&&host.closest('.doc-page'))return docLastRange.cloneRange()}return null}
function restoreDocSelection(range){if(!range||!range.startContainer||!range.startContainer.isConnected)return;const host=docNodeElement(range.startContainer),page=host&&host.closest&&host.closest('.doc-page');if(!page)return;try{page.focus({preventScroll:true});const sel=document.getSelection();sel.removeAllRanges();sel.addRange(range)}catch{}}
function docSelectedFormatBlocks(range){const out=[];const walk=root=>{for(const child of root.children){if(!range.intersectsNode(child))continue;if(docIsTextEl(child))out.push(child);else if(child.classList.contains('doc-columns')||child.tagName==='UL'||child.tagName==='OL'||child.tagName==='BLOCKQUOTE'||child.tagName==='DIV')walk(child)}};document.querySelectorAll('.doc-page').forEach(page=>{if(range.intersectsNode(page))walk(page)});return out}
function docSelectedTopBlocks(range){const out=[];document.querySelectorAll('.doc-page').forEach(page=>{if(!range.intersectsNode(page))return;for(const child of page.children){if(!range.intersectsNode(child))continue;if(child.classList.contains('doc-columns')){for(const inner of child.children)if(range.intersectsNode(inner))out.push(inner)}else out.push(child)}});return out}
function unwrapDocColumns(wrapper){const parent=wrapper&&wrapper.parentNode;if(!parent)return;while(wrapper.firstChild)parent.insertBefore(wrapper.firstChild,wrapper);wrapper.remove()}
function applyDocColumns(count){count=Math.max(1,Math.min(3,parseInt(count,10)||1));const range=docRangeInEditor();if(!range){showToast('Letakkan kursor atau pilih teks di halaman dokumen terlebih dahulu.');return}if(range.collapsed){showToast('Blok teks terlebih dahulu untuk mengatur jumlah kolom pada pilihan.');return}const selected=docSelectedTopBlocks(range);if(!selected.length){showToast('Pilih teks yang ingin diatur jumlah kolomnya.');return}if(selected.some(el=>!docIsTextEl(el)&&el.tagName!=='UL'&&el.tagName!=='OL')){showToast('Kolom hanya berlaku untuk teks. Pilih teks tanpa gambar atau tabel.');return}const wrappers=new Set();document.querySelectorAll('.doc-page').forEach(page=>{if(!range.intersectsNode(page))return;for(const child of page.children)if(child.classList.contains('doc-columns')&&range.intersectsNode(child))wrappers.add(child)});wrappers.forEach(unwrapDocColumns);if(count>1){const groups=[];for(const el of selected){const page=el.closest('.doc-page'),last=groups[groups.length-1];if(!last||last.page!==page)groups.push({page,items:[el]});else last.items.push(el)}for(const group of groups){const wrapper=document.createElement('div');wrapper.className='doc-columns';wrapper.dataset.columns=String(count);wrapper.style.columnCount=String(count);wrapper.style.columnGap=DOC_COLUMN_GAP_CSS;group.items[0].parentNode.insertBefore(wrapper,group.items[0]);group.items.forEach(el=>wrapper.appendChild(el))}}const control=document.getElementById('docColumns');if(control)control.value=String(count);const first=selected[0],last=selected[selected.length-1];if(first&&last&&first.isConnected&&last.isConnected){try{const r=document.createRange();r.setStart(first,0);r.setEnd(last,last.childNodes.length);const sel=document.getSelection();sel.removeAllRanges();sel.addRange(r);docLastRange=r.cloneRange()}catch{}}showToast(count>1?`${count} kolom diterapkan pada teks yang dipilih.`:'Teks terpilih kembali menjadi satu kolom.')}
function applyDocParagraphFormatting(){const range=docRangeInEditor();if(!range){showToast('Letakkan kursor atau pilih teks di halaman dokumen terlebih dahulu.');return}const blocks=docSelectedFormatBlocks(range);if(!blocks.length){showToast('Pilih atau letakkan kursor pada teks yang ingin diatur.');return}const left=Math.max(0,parseFloat(document.getElementById('docIndentLeft').value)||0),first=parseFloat(document.getElementById('docIndentFirst').value)||0,spacing=parseFloat(document.getElementById('docLineSpacing').value)||1.7,after=Math.max(0,parseFloat(document.getElementById('docSpaceAfter').value)||0);blocks.forEach(el=>{el.style.marginLeft=left?left+'cm':'';el.style.textIndent=first?first+'cm':'';el.style.lineHeight=String(spacing);el.style.marginBottom=after+'pt'});restoreDocSelection(range);showToast('Inden dan spasi diterapkan pada teks terpilih.')}
function syncDocLayoutControls(){const set=(id,value)=>{const el=document.getElementById(id);if(el)el.value=String(value)};set('docPaper',docLayout.paper);set('docOrientation',docLayout.orientation);set('docMarginTop',docLayout.marginTop);set('docMarginRight',docLayout.marginRight);set('docMarginBottom',docLayout.marginBottom);set('docMarginLeft',docLayout.marginLeft)}
function applyDocLayoutToPreview(){const wrap=document.getElementById('docPages');if(!wrap)return;const viewport=document.getElementById('docZoomViewport'),track=document.getElementById('docZoomTrack');const {w,h}=docLayoutPaper();const pageWidthPx=w*96/72;const vcs=viewport?getComputedStyle(viewport):null;const available=viewport?Math.max(0,viewport.clientWidth-(parseFloat(vcs.paddingLeft)||0)-(parseFloat(vcs.paddingRight)||0)):Math.max(0,wrap.clientWidth);const fitScale=available>0?available/pageWidthPx:1,scale=Math.max(.05,fitScale*docZoom);wrap.style.setProperty('--doc-page-width',`${pageWidthPx}px`);wrap.style.setProperty('--doc-aspect',`${w} / ${h}`);wrap.style.setProperty('--doc-scale',String(scale));wrap.style.setProperty('--doc-pad-top',`${docMmToCssPx(docLayout.marginTop)}px`);wrap.style.setProperty('--doc-pad-right',`${docMmToCssPx(docLayout.marginRight)}px`);wrap.style.setProperty('--doc-pad-bottom',`${docMmToCssPx(docLayout.marginBottom)}px`);wrap.style.setProperty('--doc-pad-left',`${docMmToCssPx(docLayout.marginLeft)}px`);if(track){const baseH=Math.max(wrap.offsetHeight,wrap.scrollHeight||0);const trackH=Math.ceil(baseH*scale);if(track.style.width)track.style.removeProperty('width');if(track.style.height!==`${trackH}px`)track.style.height=`${trackH}px`}wrap.dataset.paper=docLayout.paper;wrap.dataset.orientation=docLayout.orientation;const label=document.getElementById('docZoomLabel');if(label){const percent=Math.round(docZoom*100);label.textContent=`${percent}%`;label.title=`${percent}% zoom tampilan · 100% berarti pas lebar frame`;label.setAttribute('aria-label',`Zoom tampilan ${percent}%`)}const zoomOut=document.querySelector('[data-doczoom="-1"]'),zoomIn=document.querySelector('[data-doczoom="1"]');if(zoomOut)zoomOut.disabled=docZoom<=DOC_ZOOM_MIN;if(zoomIn)zoomIn.disabled=docZoom>=DOC_ZOOM_MAX}
function setDocZoom(value){docZoom=Math.max(DOC_ZOOM_MIN,Math.min(DOC_ZOOM_MAX,Math.round((Number(value)||1)*10)/10));applyDocLayoutToPreview()}
function resetDocZoomScroll(){const viewport=document.getElementById('docZoomViewport');if(viewport)viewport.scrollLeft=0}
let docZoomRaf=0,docZoomObserver=null;
function scheduleDocLayout(){if(docZoomRaf)return;docZoomRaf=requestAnimationFrame(()=>{docZoomRaf=0;applyDocLayoutToPreview()})}
function initDocZoomObserver(){const wrap=document.getElementById('docPages'),viewport=document.getElementById('docZoomViewport');if(!wrap||typeof ResizeObserver==='undefined')return;if(docZoomObserver)docZoomObserver.disconnect();docZoomObserver=new ResizeObserver(scheduleDocLayout);docZoomObserver.observe(wrap);if(viewport)docZoomObserver.observe(viewport)}
function initDocLayout(){const wrap=document.getElementById('docBuilder');if(!wrap||wrap.dataset.layoutBound)return;wrap.dataset.layoutBound='1';syncDocLayoutControls();const toggle=document.getElementById('docLayoutToggle'),panel=document.getElementById('docLayoutPanel');if(toggle&&panel){toggle.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.classList.toggle('active',open)})}panel&&panel.addEventListener('pointerdown',()=>{const range=docRangeInEditor();if(range)docLastRange=range.cloneRange()});const paper=document.getElementById('docPaper'),orientation=document.getElementById('docOrientation');if(paper)paper.addEventListener('change',()=>{docLayout.paper=paper.value;applyDocLayoutToPreview();resetDocZoomScroll()});if(orientation)orientation.addEventListener('change',()=>{docLayout.orientation=orientation.value;applyDocLayoutToPreview();resetDocZoomScroll()});[['docMarginTop','marginTop'],['docMarginRight','marginRight'],['docMarginBottom','marginBottom'],['docMarginLeft','marginLeft']].forEach(([id,key])=>{const input=document.getElementById(id);if(!input)return;input.addEventListener('change',()=>{const value=Math.max(5,Math.min(100,parseFloat(input.value)||DOC_LAYOUT_DEFAULTS[key]));docLayout[key]=value;input.value=String(value);applyDocLayoutToPreview()})});const columns=document.getElementById('docColumns');if(columns)columns.addEventListener('change',()=>applyDocColumns(columns.value));['docIndentLeft','docIndentFirst','docLineSpacing','docSpaceAfter'].forEach(id=>{const input=document.getElementById(id);if(input)input.addEventListener('change',applyDocParagraphFormatting)});window.addEventListener('resize',applyDocLayoutToPreview);initDocZoomObserver();applyDocLayoutToPreview()}
function initDocBuilder(){const wrap=document.getElementById('docBuilder');if(!wrap||wrap.dataset.bound)return;wrap.dataset.bound='1';initDocLayout();wrap.querySelectorAll('[data-doczoom]').forEach(b=>b.addEventListener('click',()=>{b.blur();setDocZoom(docZoom+(Number(b.dataset.doczoom)||0)*DOC_ZOOM_STEP)}));const zoomFit=document.getElementById('docZoomFit');if(zoomFit)zoomFit.addEventListener('click',()=>{zoomFit.blur();setDocZoom(1);resetDocZoomScroll()});wrap.addEventListener('input',()=>{const s=document.getElementById('docStatus');if(s)s.classList.remove('show');scheduleDocLayout()});const page0=wrap.querySelector('.doc-page');if(page0&&!page0.dataset.init){page0.dataset.init='1';page0.innerHTML='<h1>Judul dokumen</h1><p>Mulai menulis di sini — gunakan toolbar untuk tebal, miring, daftar, warna, gambar, dan halaman tambahan.</p>'}
try{document.execCommand('styleWithCSS',false,false)}catch{}
wrap.querySelectorAll('[data-cmd]').forEach(b=>b.addEventListener('click',()=>{b.blur();document.execCommand(b.dataset.cmd,false,null);updateDocToolbarState()}));
wrap.querySelectorAll('[data-block]').forEach(b=>b.addEventListener('click',()=>{b.blur();document.execCommand('formatBlock',false,b.dataset.block)}));
document.getElementById('docFont').addEventListener('change',e=>{document.execCommand('fontName',false,e.target.value)});
document.getElementById('docColor').addEventListener('input',e=>{document.execCommand('foreColor',false,e.target.value)});
wrap.querySelectorAll('[data-doc]').forEach(b=>b.addEventListener('click',()=>{b.blur();hideDocImageBar();hideDocSheetBar();const a=b.dataset.doc;if(a==='image')document.getElementById('docImageInput').click();else if(a==='sheet')insertDocSheet();else if(a==='font')document.getElementById('docFontFile').click();else if(a==='add-page'){const p=document.createElement('div');p.className='doc-page';p.contentEditable='true';p.innerHTML='<p></p>';document.getElementById('docPages').appendChild(p);updateDocLabel()}else if(a==='remove-page'){const all=document.querySelectorAll('.doc-page');if(all.length>1){all[all.length-1].remove();updateDocLabel()}}else if(a==='clear'){document.querySelectorAll('.doc-page').forEach((p,i)=>p.innerHTML=i?'<p></p>':'<p></p>')}}));
wrap.querySelectorAll('[data-dsize]').forEach(b=>b.addEventListener('click',()=>{b.blur();applyDocFontSize((parseInt(document.getElementById('docSizePx').value)||14)+parseInt(b.dataset.dsize))}));
document.getElementById('docSizePx').addEventListener('change',e=>applyDocFontSize(parseInt(e.target.value)));
document.getElementById('docFontFile').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;await loadDocFont(f)});
document.getElementById('docImageInput').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;insertDocImage(await readDocImage(f))});
document.addEventListener('selectionchange',updateDocToolbarState);
wireDocImageObjects();
wireDocSheetObjects();
updateDocLabel()}
let docLastRange=null,docImgSelected=null,docImgBar=null;
function readDocImage(file){return new Promise(resolve=>{if(!file||!file.type.startsWith('image/'))return resolve(null);const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const max=1600;let dataUrl=r.result;if(img.naturalWidth>max){const c=document.createElement('canvas');c.width=max;c.height=Math.max(1,Math.round(img.naturalHeight*max/img.naturalWidth));c.getContext('2d').drawImage(img,0,0,c.width,c.height);dataUrl=c.toDataURL(file.type==='image/png'?'image/png':'image/jpeg',.92)}resolve(dataUrl)};img.onerror=()=>resolve(null);img.src=r.result};r.onerror=()=>resolve(null);r.readAsDataURL(file)})}
function docActiveRange(){const pages=[...document.querySelectorAll('.doc-page')];const sel=document.getSelection();let range=null;if(sel.rangeCount){const c=sel.getRangeAt(0).startContainer;const host=c.nodeType===3?c.parentElement:c;if(host&&host.closest&&host.closest('.doc-page'))range=sel.getRangeAt(0)}if(!range&&docLastRange&&pages.some(p=>p.contains(docLastRange.startContainer)))range=docLastRange;return {pages,range}}
function docTopBlock(node){const el=node.nodeType===3?node.parentElement:node;return el&&el.closest?el.closest('.doc-page > p,.doc-page > h1,.doc-page > h2,.doc-page > h3,.doc-page > h4,.doc-page > ul,.doc-page > ol,.doc-page > table,.doc-page > img,.doc-page > div'):null}
function insertDocImage(dataUrl){if(!dataUrl){showToast('Gambar tidak bisa dibaca. Gunakan PNG, JPG, atau WEBP.');return hideDocImageBar()}const {pages,range}=docActiveRange();const img=document.createElement('img');img.src=dataUrl;img.alt='Gambar sisipan';let placed=false;
if(range){if(!range.collapsed)range.deleteContents();const c=range.startContainer;const block=docTopBlock(c)||(c.nodeType===3?c.parentElement:c);const page=img.closest&&img.closest('.doc-page');
if(block&&block.tagName==='P'&&!block.textContent.trim()&&!block.querySelector('img,table')){block.appendChild(img);placed=true}
else if(block){try{range.insertNode(img);placed=true}catch{}}
if(!placed){const target=(page&&page.classList.contains('doc-page')?page:pages[pages.length-1]);if(target){const p=document.createElement('p');p.appendChild(img);target.appendChild(p);placed=true}}}
if(!placed){const target=pages[pages.length-1];if(target){const p=document.createElement('p');p.appendChild(img);target.appendChild(p)}else{showToast('Tidak ada halaman dokumen.');return hideDocImageBar()}}
const page=img.closest('.doc-page');if(page)page.focus({preventScroll:true});img.scrollIntoView({block:'nearest',behavior:'smooth'});selectDocImage(img)}
function wireDocImageObjects(){const wrap=document.getElementById('docPages');if(!wrap)return;wrap.addEventListener('mousedown',e=>{if(!e.target.closest('img'))hideDocImageBar()});wrap.addEventListener('click',e=>{const img=e.target.closest('img');if(img&&img.closest('.doc-page'))selectDocImage(img)});wrap.addEventListener('dragover',e=>{if([...e.dataTransfer.items].some(i=>i.kind==='file'&&i.type.startsWith('image/')))e.preventDefault()});wrap.addEventListener('drop',async e=>{const file=[...e.dataTransfer.files].find(f=>f.type.startsWith('image/'));if(!file)return;e.preventDefault();const page=e.target.closest('.doc-page');if(page){page.focus();try{const r=document.caretRangeFromPoint(e.clientX,e.clientY);if(r){const sel=document.getSelection();sel.removeAllRanges();sel.addRange(r)}}catch{}}insertDocImage(await readDocImage(file))});wrap.addEventListener('paste',async e=>{const file=[...e.clipboardData.files].find(f=>f.type.startsWith('image/'));if(!file)return;e.preventDefault();insertDocImage(await readDocImage(file))});document.addEventListener('selectionchange',()=>{const sel=document.getSelection();if(!sel||!sel.rangeCount)return;const r=sel.getRangeAt(0),host=docNodeElement(r.startContainer);if(host&&host.closest&&host.closest('.doc-page'))docLastRange=r.cloneRange()});document.addEventListener('keydown',e=>{if(!docImgSelected)return;if(e.key==='Escape'&&!e.target.closest('.doc-page')){e.preventDefault();e.stopPropagation();hideDocImageBar()}else if((e.key==='Delete'||e.key==='Backspace')&&!e.target.closest('.doc-page')){e.preventDefault();e.stopPropagation();removeDocImage()}},true);window.addEventListener('resize',()=>{if(docImgBar)positionDocImageBar()});wrap.addEventListener('scroll',()=>{if(docImgBar)positionDocImageBar()},true)}
function selectDocImage(img){hideDocImageBar();docImgSelected=img;img.classList.add('doc-img-selected');const bar=document.createElement('div');bar.className='doc-img-bar';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','Alat gambar');bar.innerHTML=`<button type="button" data-imgact="smaller" title="Perkecil gambar" aria-label="Perkecil gambar">−</button><button type="button" data-imgact="larger" title="Perbesar gambar" aria-label="Perbesar gambar">+</button><button type="button" data-imgact="full" title="Lebar penuh" aria-label="Lebar penuh">Penuh</button><button type="button" data-imgact="remove" title="Hapus gambar" aria-label="Hapus gambar">Hapus</button>`;bar.addEventListener('click',e=>{const b=e.target.closest('[data-imgact]');if(!b)return;e.preventDefault();const act=b.dataset.imgact,page=img.closest('.doc-page');if(act==='remove')return removeDocImage();if(!page)return;const cs=getComputedStyle(page),pageW=Math.max(40,page.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)),cur=img.clientWidth||pageW*.5;let next=act==='smaller'?cur*.75:act==='larger'?cur*1.3:pageW;next=Math.max(40,Math.min(pageW,next));img.style.width=Math.round(next/pageW*100)+'%';img.style.maxWidth='100%';img.style.height='auto';img.style.display='block';positionDocImageBar()});document.body.appendChild(bar);docImgBar=bar;positionDocImageBar()}
function positionDocImageBar(){if(!docImgBar||!docImgSelected)return;const r=docImgSelected.getBoundingClientRect();if(!r.width){if(docImgSelected.complete)return hideDocImageBar();if(!docImgSelected.__barWaitLoad){docImgSelected.__barWaitLoad=true;docImgSelected.addEventListener('load',()=>{docImgSelected.__barWaitLoad=false;positionDocImageBar()},{once:true});docImgSelected.addEventListener('error',()=>{docImgSelected.__barWaitLoad=false;hideDocImageBar()},{once:true})}return}const bw=docImgBar.offsetWidth,bh=docImgBar.offsetHeight;docImgBar.style.left=Math.max(8,Math.min(window.innerWidth-bw-8,r.right-bw))+'px';docImgBar.style.top=Math.max(8,r.top-bh-8)+'px'}
function hideDocImageBar(){if(docImgSelected)docImgSelected.classList.remove('doc-img-selected');docImgSelected=null;if(docImgBar){docImgBar.remove();docImgBar=null}}
function removeDocImage(){if(docImgSelected)docImgSelected.remove();hideDocImageBar()}
/* Spinbox ukuran huruf, font unggahan, dan objek tabel/spreadsheet */
function applyDocFontSize(px){px=Math.max(8,Math.min(96,Math.round(px||14)));const inp=document.getElementById('docSizePx');if(inp)inp.value=String(px);const sel=document.getSelection();const host=sel.rangeCount&&sel.getRangeAt(0).startContainer.parentElement?sel.getRangeAt(0).startContainer.parentElement.closest('.doc-page'):null;if(!host)return;if(!sel.getRangeAt(0).collapsed){try{document.execCommand('fontSize',false,'7')}catch{}document.querySelectorAll('.doc-page font[size="7"]').forEach(f=>{const s=document.createElement('span');s.style.fontSize=px+'px';s.innerHTML=f.innerHTML;f.replaceWith(s)})}else{const r=sel.getRangeAt(0),s=document.createElement('span');s.style.fontSize=px+'px';s.appendChild(document.createTextNode('\u200B'));r.insertNode(s);r.setStart(s.firstChild,1);r.collapse(true);sel.removeAllRanges();sel.addRange(r)}}
let docCustomFonts=[];
async function loadDocFont(file){if(!/\.(ttf|otf)$/i.test(file.name)){showToast('Gunakan file font TTF atau OTF.');return}let bytes;try{bytes=new Uint8Array(await file.arrayBuffer())}catch{showToast('File font tidak bisa dibaca.');return}const fam='paperly-'+Date.now().toString(36)+'-'+file.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');try{const face=new FontFace(fam,bytes.slice().buffer);await face.load();document.fonts.add(face)}catch{showToast('Font tidak bisa dimuat. Pastikan file TTF/OTF valid.');return}const label=file.name.replace(/\.(ttf|otf)$/i,'');docCustomFonts.push({label,family:fam,bytes});const sel=document.getElementById('docFont');const opt=document.createElement('option');opt.value=fam;opt.textContent=`${label} (kustom)`;sel.appendChild(opt);sel.value=fam;try{document.execCommand('fontName',false,fam)}catch{}showToast(`Font "${label}" siap dipakai di dokumen.`)}
function insertDocSheet(){const tableHtml='<table class="doc-sheet"><tbody><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>';const {pages,range}=docActiveRange();let placed=false,skipTrailing=false;
if(range){const c=range.startContainer;const block=docTopBlock(c);
if(block&&block.parentElement&&block.parentElement.classList.contains('doc-page')){if(block.tagName==='P'&&!block.textContent.trim()&&!block.querySelector('img,table')){block.insertAdjacentHTML('beforebegin',tableHtml);skipTrailing=true}else{block.insertAdjacentHTML('afterend',tableHtml+'<p><br></p>')}placed=true}}
if(!placed){const page=pages[pages.length-1];if(!page)return;page.insertAdjacentHTML('beforeend',tableHtml+'<p><br></p>')}
const tb=[...document.querySelectorAll('.doc-sheet')].pop();if(tb){tb.scrollIntoView({block:'nearest',behavior:'smooth'});const first=tb.querySelector('td');if(first)first.focus()}}
let docSheetSelected=null,docSheetBar=null,docSheetDrag=null;
function wireDocSheetObjects(){const wrap=document.getElementById('docPages');if(!wrap)return;wrap.addEventListener('mousedown',e=>{if(!e.target.closest('.doc-sheet'))hideDocSheetBar()});wrap.addEventListener('click',e=>{const tb=e.target.closest('.doc-sheet');if(tb)selectDocSheet(tb)});wrap.addEventListener('dragstart',e=>{const tb=e.target.closest('.doc-sheet');if(!tb)return;e.dataTransfer.setData('text/plain','paperly-sheet');e.dataTransfer.effectAllowed='move';docSheetDrag=tb});wrap.addEventListener('dragend',()=>{if(docSheetDrag){docSheetDrag.draggable='false';docSheetDrag=null}document.querySelectorAll('.doc-page').forEach(p=>p.classList.remove('doc-drop-target'))});wrap.addEventListener('dragover',e=>{if(!docSheetDrag)return;e.preventDefault();e.dataTransfer.dropEffect='move';const page=e.target.closest('.doc-page');document.querySelectorAll('.doc-page').forEach(p=>p.classList.toggle('doc-drop-target',p===page))});wrap.addEventListener('drop',e=>{if(!docSheetDrag)return;e.preventDefault();const tb=docSheetDrag;docSheetDrag=null;tb.draggable='false';document.querySelectorAll('.doc-page').forEach(p=>p.classList.remove('doc-drop-target'));const page=e.target.closest('.doc-page');if(!page||!page.contains(tb)){hideDocSheetBar();return}let ref=null,before=false;const hb=tb.getBoundingClientRect();try{const r=document.caretRangeFromPoint(e.clientX,e.clientY);const n=r&&r.startContainer;const el=n&&(n.nodeType===3?n.parentElement:n);const blk=el&&el.closest('p,h1,h2,h3,h4,ul,ol,table,img');if(blk&&page.contains(blk)&&blk!==tb&&!tb.contains(blk)){ref=blk;const rb=blk.getBoundingClientRect();before=(e.clientY-rb.top)<rb.height/2}}catch{}if(!ref){page.appendChild(tb)}else if(before){ref.parentNode.insertBefore(tb,ref)}else{ref.parentNode.insertBefore(tb,ref.nextSibling)}hideDocSheetBar();selectDocSheet(tb)})}
function selectDocSheet(tb){hideDocImageBar();hideDocSheetBar();docSheetSelected=tb;tb.classList.add('doc-sheet-selected');const bar=document.createElement('div');bar.className='doc-img-bar doc-sheet-bar';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','Alat tabel');bar.innerHTML=`<span class="doc-sheet-handle" data-sheetact="drag" title="Seret untuk memindah tabel" aria-label="Seret untuk memindah tabel">⠿</span><button type="button" data-sheetact="add-row" title="Tambah baris">+ Baris</button><button type="button" data-sheetact="add-col" title="Tambah kolom">+ Kolom</button><button type="button" data-sheetact="del-row" title="Hapus baris terakhir">− Baris</button><button type="button" data-sheetact="del-col" title="Hapus kolom terakhir">− Kolom</button><button type="button" data-sheetact="up" title="Pindah ke atas">↑</button><button type="button" data-sheetact="down" title="Pindah ke bawah">↓</button><button type="button" data-sheetact="remove" title="Hapus tabel">Hapus</button>`;bar.addEventListener('mousedown',e=>{if(e.target.dataset&&e.target.dataset.sheetact==='drag'){docSheetDrag=tb;tb.draggable='true'}});bar.addEventListener('click',e=>{const b=e.target.closest('[data-sheetact]');if(!b||b.dataset.sheetact==='drag')return;e.preventDefault();const act=b.dataset.sheetact;hideDocSheetBar();if(act==='remove'){tb.remove();return}if(act==='add-row'){const src=tb.rows[tb.rows.length-1],nr=tb.insertRow();[...src.cells].forEach(()=>nr.insertCell())}else if(act==='add-col'){[...tb.rows].forEach(r=>r.insertCell())}else if(act==='del-row'){if(tb.rows.length>1)tb.deleteRow(-1)}else if(act==='del-col'){if(tb.rows[0].cells.length>1)[...tb.rows].forEach(r=>r.deleteCell(-1))}else if(act==='up'){const prev=tb.previousElementSibling;if(prev)tb.parentNode.insertBefore(tb,prev)}else if(act==='down'){const next=tb.nextElementSibling;if(next)next.parentNode.insertBefore(tb,next)}selectDocSheet(tb)});document.body.appendChild(bar);docSheetBar=bar;positionDocSheetBar()}
function positionDocSheetBar(){if(!docSheetBar||!docSheetSelected)return;const r=docSheetSelected.getBoundingClientRect();if(!r.width){hideDocSheetBar();return}const bw=docSheetBar.offsetWidth,bh=docSheetBar.offsetHeight;docSheetBar.style.left=Math.max(8,Math.min(window.innerWidth-bw-8,r.left))+'px';docSheetBar.style.top=Math.max(8,r.top-bh-8)+'px'}
function hideDocSheetBar(){if(docSheetSelected)docSheetSelected.classList.remove('doc-sheet-selected');docSheetSelected=null;if(docSheetBar){docSheetBar.remove();docSheetBar=null}if(docSheetDrag){docSheetDrag.draggable='false';docSheetDrag=null}}
function updateDocLabel(){const l=document.getElementById('docPageLabel');if(l)l.textContent=`${document.querySelectorAll('.doc-page').length} halaman`}
function updateDocToolbarState(){document.querySelectorAll('[data-cmd]').forEach(b=>{try{b.classList.toggle('active',document.queryCommandState(b.dataset.cmd))}catch{}})}
/* ===== Halaman tulis khusus Pembuat PDF ===== */
let docLeaveReturnFocus=null, docExportToken=0;
function openDocPage(){initDocBuilder();const pg=document.getElementById('docWritePage');pg.classList.add('open');pg.setAttribute('aria-hidden','false');document.body.classList.add('doc-writing');applyDocLayoutToPreview();document.getElementById('docError').classList.remove('show');document.getElementById('docStatus').classList.remove('show');setTimeout(()=>{const p=document.querySelector('.doc-page');if(p)p.focus({preventScroll:true})},60)}
function openDocLeaveDialog(){const dlg=document.getElementById('docLeaveDialog');if(!dlg||dlg.classList.contains('open'))return;hideDocImageBar();hideDocSheetBar();docLeaveReturnFocus=document.activeElement;dlg.classList.add('open');dlg.setAttribute('aria-hidden','false');requestAnimationFrame(()=>document.getElementById('docLeaveCancel').focus())}
function closeDocLeaveDialog(restoreFocus=true){const dlg=document.getElementById('docLeaveDialog');if(!dlg||!dlg.classList.contains('open'))return;dlg.classList.remove('open');dlg.setAttribute('aria-hidden','true');const target=docLeaveReturnFocus;docLeaveReturnFocus=null;if(restoreFocus&&target&&document.contains(target)){try{target.focus({preventScroll:true})}catch{}}}
function closeDocPage(){closeDocLeaveDialog(false);const pg=document.getElementById('docWritePage');pg.classList.remove('open');pg.setAttribute('aria-hidden','true');document.body.classList.remove('doc-writing');hideDocImageBar();hideDocSheetBar()}
function setDocProgress(p,label){const bar=document.getElementById('docProgress'),fill=document.getElementById('docProgressFill'),lbl=document.getElementById('docProgressLabel');if(!bar)return;bar.classList.add('show');bar.setAttribute('aria-hidden','false');if(lbl){lbl.textContent=label||'';lbl.classList.toggle('show',!!label)}if(p==null||isNaN(p)){fill.classList.add('indeterminate');fill.style.width='100%';bar.removeAttribute('aria-valuenow')}else{fill.classList.remove('indeterminate');const v=Math.max(2,Math.min(100,p));fill.style.width=v+'%';bar.setAttribute('aria-valuenow',String(Math.round(v)))}}
function hideDocProgress(){const bar=document.getElementById('docProgress');if(!bar)return;bar.classList.remove('show');bar.setAttribute('aria-hidden','true');bar.removeAttribute('aria-valuenow');const fill=document.getElementById('docProgressFill');if(fill){fill.classList.remove('indeterminate');fill.style.width='0%'}const lbl=document.getElementById('docProgressLabel');if(lbl){lbl.textContent='';lbl.classList.remove('show')}}
document.getElementById('docBackBtn').addEventListener('click',openDocLeaveDialog);
document.getElementById('docLeaveCancel').addEventListener('click',()=>closeDocLeaveDialog());
document.getElementById('docLeaveConfirm').addEventListener('click',()=>{closeDocPage();showToast('Pembuat PDF ditutup. Dokumen tetap tersimpan di tab ini.')});
document.getElementById('docLeaveDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)closeDocLeaveDialog()});
document.getElementById('docLeaveDialog').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusable=[...e.currentTarget.querySelectorAll('button:not(:disabled)')];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
document.getElementById('docExport').addEventListener('click',async()=>{const b=document.getElementById('docExport'),status=document.getElementById('docStatus');if(b.disabled)return;const token=++docExportToken;b.disabled=true;b.classList.add('loading');b.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Menyusun…</span>';document.getElementById('docError').classList.remove('show');if(status)status.classList.remove('show');setDocProgress(null,'Menyiapkan…');try{download(await exportDocToPdf(f=>setDocProgress(25+f*.65,'Merakit halaman PDF…')),'paperly-dokumen.pdf');setDocProgress(100,'PDF siap disimpan');if(status){status.innerHTML='<span aria-hidden="true">✓</span> PDF siap disimpan';status.classList.add('show')}showToast('PDF selesai dibuat. Beri nama file pada dialog simpan. Halaman tetap terbuka — tutup lewat tombol Kembali.');setTimeout(()=>{if(token===docExportToken)hideDocProgress()},1600)}catch(e){hideDocProgress();const el=document.getElementById('docError');el.textContent=e.message||'Terjadi kesalahan saat membuat PDF.';el.classList.add('show')}finally{b.disabled=false;b.classList.remove('loading');b.innerHTML='<span>Buat PDF</span><span>↗</span>'}});
function docIsEmpty(){let has=false;document.querySelectorAll('.doc-page').forEach(p=>{if(p.textContent.trim()||p.querySelector('img')||p.querySelector('.doc-sheet'))has=true});return !has}
const winAnsiMap={'\u2018':"'",'\u2019':"'",'\u201C':'"','\u201D':'"','\u2013':'-','\u2014':'-','\u2026':'...','\u00A0':' ','\u200B':'','\u200C':'','\u200D':'','\uFEFF':'','\u00AD':'-','\u2028':' ','\u2029':' '};
function stripInvisible(s){return String(s).replace(/[\u200B\u200C\u200D\uFEFF]/g,'')}
function sanitizeWinAnsi(s){return String(s).replace(/[\u2018\u2019\u201C\u201D\u2013\u2014\u2026\u00A0\u200B\u200C\u200D\uFEFF\u00AD\u2028\u2029]/g,c=>winAnsiMap[c]).replace(/[^\x00-\xFF]/g,'?')}
function parseColor(c){const m=/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(c||'');if(!m)return rgb(.09,.14,.24);const r=+m[1],g=+m[2],b=+m[3];if(r+g+b>600)return rgb(.09,.14,.24);return rgb(r/255,g/255,b/255)}
function collectDocBlocks(pageEl){const out=[];const add=el=>{if(!el||el.nodeType!==1)return;if(el.classList.contains('doc-columns')){out.push({type:'columns',el});return}if(el.tagName==='IMG'){out.push({type:'img',el});return}if(el.tagName==='TABLE'){out.push({type:'table',el});return}if(docIsTextEl(el)){if(el.querySelector('img,table')){for(const child of el.children)add(child);return}out.push({type:el.tagName.toLowerCase(),el,list:el.parentElement&&el.parentElement.tagName==='UL'?'ul':el.parentElement&&el.parentElement.tagName==='OL'?'ol':null});return}if(!el.children.length&&el.textContent.trim()){out.push({type:'div',el});return}for(const child of el.children)add(child)};for(const child of pageEl.children)add(child);return out}
function collectDocRuns(el){const runs=[];const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);while(w.nextNode()){const t=w.currentNode;if(!t.textContent)continue;const cs=getComputedStyle(t.parentElement);const famStr=(cs.fontFamily||'').toLowerCase();runs.push({text:t.textContent,bold:+(cs.fontWeight||400)>=600,italic:cs.fontStyle==='italic',underline:(cs.textDecorationLine||'').includes('underline'),color:parseColor(cs.color),px:parseFloat(cs.fontSize)||14,fam:/paperly-/.test(famStr)?'custom:'+(cs.fontFamily.split(',')[0].trim().replace(/["']/g,'')):/times/i.test(famStr)?'serif':/courier|mono/i.test(famStr)?'mono':'sans'})}return runs}
function normalizeDocPages(){document.querySelectorAll('.doc-page').forEach(pg=>{[...pg.childNodes].forEach(n=>{if(n.nodeType===3&&n.textContent.trim()){const el=document.createElement('p');el.textContent=n.textContent;pg.replaceChild(el,n)}})})}
let fontkitPromise=null;
function ensureFontkit(){if(window.fontkit)return Promise.resolve(window.fontkit);if(!fontkitPromise)fontkitPromise=new Promise((res,rej)=>{const s=document.createElement('script');s.src='./vendor/fontkit.umd.min.js';s.onload=()=>res(window.fontkit);s.onerror=()=>rej(new Error('Pustaka font kustom gagal dimuat.'));document.head.appendChild(s)});return fontkitPromise}
const numberState={fontFile:null,fontFace:null,fontUrl:null};
function formatPageNumber(template,number,total){return String(template).replace(/\{\s*(n|page|total)\s*\}/gi,(_,key)=>String(key.toLowerCase()==='total'?total:number))}
function refreshNumberPreview(){const preview=document.getElementById('numberPreview'),text=document.getElementById('numberPreviewText');if(!preview||!text)return;const start=Math.max(1,parseInt(document.getElementById('numberStart').value,10)||1),template=document.getElementById('numberFormat').value||'{n}',sample=formatPageNumber(template,start,12),position=document.getElementById('numberPosition').value,font=document.getElementById('numberFont').value,size=document.getElementById('numberSize').value;text.textContent=sample;text.style.fontSize=`${Math.max(9,Math.min(18,+size*1.15))}px`;preview.dataset.position=position;text.style.fontFamily=font==='custom'&&numberState.fontFace?`"${numberState.fontFace.family}"`:(font==='Times-Roman'?'Georgia,serif':font==='Courier'?'monospace':'Arial,sans-serif');text.style.fontWeight=font==='Helvetica-Bold'?'700':'400'}
function initNumbering(){numberState.fontFile=null;if(numberState.fontFace&&document.fonts)document.fonts.delete(numberState.fontFace);if(numberState.fontUrl)URL.revokeObjectURL(numberState.fontUrl);numberState.fontFace=null;numberState.fontUrl=null;const fontSelect=document.getElementById('numberFont'),fontInput=document.getElementById('numberFontFile'),fontWrap=document.getElementById('numberCustomFontWrap'),fontName=document.getElementById('numberFontName');fontSelect.addEventListener('change',()=>{fontWrap.hidden=fontSelect.value!=='custom';refreshNumberPreview()});fontInput.addEventListener('change',async()=>{const file=fontInput.files&&fontInput.files[0];numberState.fontFile=file||null;numberState.fontFace=null;if(numberState.fontUrl)URL.revokeObjectURL(numberState.fontUrl);numberState.fontUrl=null;if(!file){fontName.textContent='Pilih file font TTF atau OTF dari perangkat. Font tetap diproses lokal.';refreshNumberPreview();return}fontName.textContent=file.name;try{if(!/\.(ttf|otf)$/i.test(file.name))throw Error();numberState.fontUrl=URL.createObjectURL(file);const face=new FontFace(`NumberCustom${Date.now()}`,`url(${numberState.fontUrl})`);numberState.fontFace=await face.load();document.fonts.add(numberState.fontFace);fontName.textContent=`${file.name} • siap digunakan`}catch{numberState.fontFace=null;fontName.textContent='Font tidak dapat dimuat. Pilih file TTF atau OTF yang valid.'}refreshNumberPreview()});['numberStart','numberFormat','numberPosition','numberSize'].forEach(id=>document.getElementById(id).addEventListener('input',refreshNumberPreview));refreshNumberPreview()}
async function exportDocToPdf(report){
 if(docIsEmpty())throw Error('Dokumen masih kosong. Tulis sesuatu terlebih dahulu.');
 normalizeDocPages();
 const doc=await PDFDocument.create();
 if(docCustomFonts.length)doc.registerFontkit(await ensureFontkit());
 const fontCache={};
 const famMap={sans:{r:StandardFonts.Helvetica,b:StandardFonts.HelveticaBold,i:StandardFonts.HelveticaOblique,bi:StandardFonts.HelveticaBoldOblique},serif:{r:StandardFonts.TimesRoman,b:StandardFonts.TimesRomanBold,i:StandardFonts.TimesRomanItalic,bi:StandardFonts.TimesRomanBoldItalic},mono:{r:StandardFonts.Courier,b:StandardFonts.CourierBold,i:StandardFonts.CourierOblique,bi:StandardFonts.CourierBoldOblique}};
 async function getFont(fam,bold,italic){const key=fam+(bold?'b':'')+(italic?'i':'');if(!fontCache[key])fontCache[key]=fam.startsWith('custom:')?await doc.embedFont((docCustomFonts.find(x=>'custom:'+x.family===fam)||docCustomFonts[0]).bytes,{subset:true}):await doc.embedFont(famMap[fam][bold&&italic?'bi':bold?'b':italic?'i':'r']);return fontCache[key]}
 function safeWidth(f,text,pt){try{return f.widthOfTextAtSize(text,pt)}catch{return text.length*pt*.55}}
 const paper=docLayoutPaper(),PW=paper.w,PH=paper.h;
 const MT=docMmToPt(docLayout.marginTop),MR=docMmToPt(docLayout.marginRight),MB=docMmToPt(docLayout.marginBottom),ML=docMmToPt(docLayout.marginLeft);
 const W=Math.max(72,PW-ML-MR),contentH=Math.max(72,PH-MT-MB),pxToPt=.75;
 let pdfPage=doc.addPage([PW,PH]),y=PH-MT;
 const newPage=()=>{pdfPage=doc.addPage([PW,PH]);y=PH-MT};
 const blockAlign=cs=>{const a=cs.textAlign||'left';return /justify/.test(a)?'justify':a==='center'?'center':(a==='right'||a==='end')?'right':'left'};
 async function textMetrics(el,boxWidth){
  const runs=collectDocRuns(el).map(r=>({...r,text:r.fam.startsWith('custom:')?stripInvisible(r.text):sanitizeWinAnsi(r.text),pt:Math.max(6,Math.round(r.px*.75))}));
  const cs=getComputedStyle(el),fontPx=parseFloat(cs.fontSize)||14,baseSize=Math.max(6,fontPx*.75),lhCss=parseFloat(cs.lineHeight);
  const lineHeight=Number.isFinite(lhCss)&&lhCss>0?Math.max(baseSize*1.1,lhCss*pxToPt):baseSize*1.6;
  const indentLeft=Math.max(0,(parseFloat(cs.marginLeft)||0)*pxToPt),indentRight=Math.max(0,(parseFloat(cs.marginRight)||0)*pxToPt);
  const textIndent=(parseFloat(cs.textIndent)||0)*pxToPt,spaceBefore=Math.max(0,(parseFloat(cs.marginTop)||0)*pxToPt),spaceAfter=Math.max(0,(parseFloat(cs.marginBottom)||0)*pxToPt);
  const avail=Math.max(24,boxWidth-indentLeft-indentRight),firstAvail=Math.max(12,avail-(textIndent>0?textIndent:0));
  const tokens=[];
  for(const r of runs)for(const word of r.text.split(/(\s+)/))if(word!=='')tokens.push({...r,word});
  for(const t of tokens){const f=await getFont(t.fam,t.bold,t.italic);t.w=safeWidth(f,t.word,t.pt)}
  const linesArr=[];let line=[],lineW=0,limit=firstAvail;
  for(const t of tokens){if(t.word.trim()===''&&line.length===0)continue;if(lineW+t.w>limit&&line.length&&t.word.trim()!==''){if(line[line.length-1].word.trim()==='')line.pop();linesArr.push(line);line=[];lineW=0;limit=avail}line.push(t);lineW+=t.w}
  if(line.length)linesArr.push(line);
  return {runs,linesArr,baseSize,lineHeight,spaceBefore,spaceAfter,indentLeft,indentRight,textIndent,align:blockAlign(cs)};
 }
 async function paintLine(ln,m,{xLeft,boxWidth,baseY,first,last,label}){
  if(!ln.length)return;
  const lineSize=Math.max(m.baseSize,...ln.map(t=>t.pt));
  const indent=first?Math.max(0,m.textIndent):0;
  let x=xLeft+m.indentLeft+indent,target=Math.max(24,boxWidth-m.indentLeft-m.indentRight-indent);
  if(label){const lf=await getFont('sans',false,false),gap=label.length>1?24:14;pdfPage.drawText(label,{x:xLeft+m.indentLeft,y:baseY+lineSize*.28,size:Math.min(lineSize,11),font:lf,color:rgb(.3,.35,.45)});x+=gap;target=Math.max(24,target-gap)}
  const lw=ln.reduce((s,t)=>s+t.w,0);
  if(m.align==='center')x+=(target-lw)/2;
  else if(m.align==='right')x+=Math.max(0,target-lw);
  else if(m.align==='justify'&&!last){const spaces=ln.filter(t=>t.word.trim()===''),extra=target-lw;if(spaces.length&&extra>0){const add=extra/spaces.length;for(const t of spaces)t.w+=add}}
  for(const t of ln){if(t.word.trim()!==''){const f=await getFont(t.fam,t.bold,t.italic);try{pdfPage.drawText(t.word,{x,y:baseY+lineSize*.28,size:t.pt,font:f,color:t.color})}catch{}if(t.underline)pdfPage.drawRectangle({x,y:baseY-1.5,width:safeWidth(f,t.word,t.pt),height:.6,color:t.color})}x+=t.w}
 }
 async function drawColumns(block){
  const count=Math.max(1,Math.min(3,parseInt(block.el.dataset.columns||block.el.style.columnCount||1,10)||1));
  const children=collectDocBlocks(block.el).map(b=>b.el).filter(el=>el&&docIsTextEl(el));
  if(!children.length)return;
  const gap=18,colW=count>1?Math.max(48,(W-gap*(count-1))/count):W;
  const items=[];
  let totalH=0;
  for(const child of children){const m=await textMetrics(child,colW);items.push({child,m});totalH+=m.spaceBefore+m.linesArr.length*m.lineHeight+m.spaceAfter}
  const balanced=count>1&&totalH<=y-MB;
  const target=balanced?totalH/count:Infinity;
  let col=0,colY=y,colUsed=0,pageBottom=null;
  const nextColumn=()=>{col++;if(col>=count){newPage();col=0;colY=PH-MT;pageBottom=null}else colY=y;colUsed=0};
  for(const {child,m} of items){
   const label=docListItemLabel(child);
   for(let li=0;li<m.linesArr.length;li++){
    const before=li===0?m.spaceBefore:0,after=li===m.linesArr.length-1?m.spaceAfter:0;
    const keepLastWithParagraph=li===m.linesArr.length-1&&li>0;
    if(colY-m.lineHeight<MB||(balanced&&colUsed>0&&!keepLastWithParagraph&&colUsed+before+m.lineHeight>target))nextColumn();
    colY-=before+m.lineHeight;
    colUsed+=before+m.lineHeight+after;
    pageBottom=pageBottom==null?colY:Math.min(pageBottom,colY);
    await paintLine(m.linesArr[li],m,{xLeft:ML+col*(colW+gap),boxWidth:colW,baseY:colY,first:li===0,last:li===m.linesArr.length-1,label:li===0?label:null});
    colY-=after;
   }
  }
  y=(pageBottom==null?colY:pageBottom)-8;
 }
 const pageEls=[...document.querySelectorAll('.doc-page')];
 for(let pi=0;pi<pageEls.length;pi++){
  if(report)report(pi/pageEls.length*.85);
  for(const block of collectDocBlocks(pageEls[pi])){
   if(block.type==='columns'){await drawColumns(block);continue}
   if(block.type==='img'){
    try{await block.el.decode()}catch{}
    const cs=getComputedStyle(block.el),cssW=parseFloat(cs.width)||block.el.naturalWidth||300,cssH=parseFloat(cs.height)||block.el.naturalHeight||200;
    let dw=Math.max(10,cssW*pxToPt),dh=Math.max(10,cssH*pxToPt);
    const fit=Math.min(1,W/dw,contentH/dh);dw*=fit;dh*=fit;
    if(y-dh<MB)newPage();
    const img=block.el.src.startsWith('data:image/png')?await doc.embedPng(block.el.src):await doc.embedJpg(block.el.src);
    pdfPage.drawImage(img,{x:ML+(W-dw)/2,y:y-dh,width:dw,height:dh});y-=dh+14;continue;
   }
   if(block.type==='table'){
    const tb=block.el,rows=[...tb.rows];
    if(rows.length){
     const pad=6,tw=Math.max(60,tb.clientWidth||W),head=[...rows[0].cells];
     const raw=head.length?head.map(td=>Math.max(24,td.clientWidth/tw*W)):Array.from({length:3},()=>W/3),sum=raw.reduce((a,b)=>a+b,0)||1,colWs=raw.map(w=>w/sum*W);
     for(const rowEl of rows){
      const cells=[...rowEl.cells],cellLines=[];let lineSize=8;
      for(let c=0;c<colWs.length;c++){
       const td=cells[c],runs=td?collectDocRuns(td).map(r=>({...r,text:r.fam.startsWith('custom:')?stripInvisible(r.text):sanitizeWinAnsi(r.text),pt:Math.max(6,Math.round(r.px*.75))})):[],tokens=[];
       for(const r of runs)for(const word of r.text.split(/(\s+)/))if(word!=='')tokens.push({...r,word});
       const linesArr=[];let line=[],lineW=0;const avail=colWs[c]-pad*2;
       for(const t of tokens){if(t.word.trim()===''&&line.length===0)continue;const f=await getFont(t.fam,t.bold,t.italic);const w=safeWidth(f,t.word,t.pt);t.w=w;if(lineW+w>avail&&line.length&&t.word.trim()!==''){if(line[line.length-1].word.trim()==='')line.pop();linesArr.push(line);line=[];lineW=0}line.push(t);lineW+=w}
       if(line.length)linesArr.push(line);
       cellLines.push(linesArr);for(const ln of linesArr)for(const t of ln)lineSize=Math.max(lineSize,t.pt);
      }
      const rowH=Math.min(contentH-10,cellLines.reduce((m,cl)=>Math.max(m,cl.length),1)*(lineSize*1.45)+pad*2+2);
      if(y-rowH<MB)newPage();
      let cx=ML;
      for(let c=0;c<colWs.length;c++){pdfPage.drawRectangle({x:cx,y:y-rowH,width:colWs[c],height:rowH,borderColor:rgb(.6,.66,.76),borderWidth:.8});const linesArr=cellLines[c]||[];let ty=y-pad-lineSize*1.05;for(const ln of linesArr){let tx=cx+pad;for(const t of ln){if(t.word.trim()!==''){const f=await getFont(t.fam,t.bold,t.italic);try{pdfPage.drawText(t.word,{x:tx,y:ty,size:t.pt,font:f,color:t.color})}catch{}tx+=t.w}}ty-=lineSize*1.45}cx+=colWs[c]}
      y-=rowH;
     }
    }
    continue;
   }
   const m=await textMetrics(block.el,W);
   y-=m.spaceBefore;
   for(let li=0;li<m.linesArr.length;li++){
    if(y-m.lineHeight<MB)newPage();
    y-=m.lineHeight;
    await paintLine(m.linesArr[li],m,{xLeft:ML,boxWidth:W,baseY:y,first:li===0,last:li===m.linesArr.length-1,label:li===0?docListItemLabel(block.el):null});
   }
   y-=m.spaceAfter;
  }
  if(pi<pageEls.length-1)newPage();
 }
 if(report)report(.95);
 return doc.save({useObjectStreams:true});
}
function xmlEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function extractPdfLines(file,report){const bytes=new Uint8Array(await file.arrayBuffer()),pdf=await pdfjsLib.getDocument({data:bytes}).promise,pages=[];
for(let i=1;i<=pdf.numPages;i++){if(report)report((i-1)/pdf.numPages*.75);const page=await pdf.getPage(i),tc=await page.getTextContent(),rows={};for(const it of tc.items){if(!it.str||!it.str.trim())continue;const yKey=Math.round(it.transform[5]);(rows[yKey]??=[]).push({x:it.transform[4],w:it.width||0,str:it.str,h:it.height||10,bold:/bold/i.test(it.fontName||'')})}const lines=Object.entries(rows).sort((a,b)=>b[0]-a[0]).map(([,arr])=>{arr.sort((a,b)=>a.x-b.x);let text='',prev=null;for(const r of arr){if(prev!=null&&r.x-prev>1.2)text+=' ';text+=r.str;prev=r.x+r.w}return {text:text.replace(/\s+/g,' ').trim(),h:Math.max(...arr.map(r=>r.h)),bold:arr.some(r=>r.bold)}}).filter(l=>l.text);pages.push(lines)}pdf.destroy();return pages}
function buildDocx(pages){const body=pages.map((lines,pi)=>{const ps=lines.map(l=>{const sz=Math.min(56,Math.max(16,Math.round((l.h||12)*1.5)));const heading=l.h>=15;return `<w:p><w:pPr>${heading?'<w:outlineLvl w:val="0"/>':''}</w:pPr><w:r><w:rPr>${l.bold||heading?'<w:b/>':''}<w:sz w:val="${sz}"/></w:rPr><w:t xml:space="preserve">${xmlEscape(l.text)}</w:t></w:r></w:p>`}).join('');return ps+(pi<pages.length-1?'<w:p><w:r><w:br w:type="page"/></w:r></w:p>':'')}).join('');
const documentXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>`;
const stylesXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`;
return fflate.zipSync({'[Content_Types].xml':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`),'_rels/.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`),'word/_rels/document.xml.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`),'word/document.xml':fflate.strToU8(documentXml),'word/styles.xml':fflate.strToU8(stylesXml)},{level:6})}
async function buildPptx(file,report){const bytes=new Uint8Array(await file.arrayBuffer()),pdf=await pdfjsLib.getDocument({data:bytes}).promise;const SW=12192000,SH=6858000,slideParts=[];
for(let i=1;i<=pdf.numPages;i++){if(report)report((i-1)/pdf.numPages*.8);const page=await pdf.getPage(i),base=page.getViewport({scale:1}),vp=page.getViewport({scale:Math.min(2,1600/base.width)});const canvas=document.createElement('canvas');canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);const ctx=canvas.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);await page.render({canvasContext:ctx,viewport:vp,background:'#ffffff'}).promise;const jpeg=await new Promise(r=>canvas.toBlob(r,'image/jpeg',.8));canvas.width=1;canvas.height=1;
const fit=Math.min(SW/base.width,SH/base.height),w=Math.round(base.width*fit),h=Math.round(base.height*fit),ox=Math.round((SW-w)/2),oy=Math.round((SH-h)/2);
slideParts.push({xml:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:pic><p:nvPicPr><p:cNvPr id="2" name="Halaman ${i}"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${ox}" y="${oy}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`,rels:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image${i}.jpeg"/></Relationships>`,jpeg})}
pdf.destroy();
const sldIdLst=slideParts.map((_,i)=>`<p:sldId id="${256+i}" r:id="rId${i+2}"/>`).join(''),sldRels=slideParts.map((_,i)=>`<Relationship Id="rId${i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i+1}.xml"/>`).join('');
const themeXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Paperly"><a:themeElements><a:clrScheme name="Paperly"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="17243C"/></a:dk2><a:lt2><a:srgbClr val="F5F7FC"/></a:lt2><a:accent1><a:srgbClr val="5676E8"/></a:accent1><a:accent2><a:srgbClr val="3EC9A7"/></a:accent2><a:accent3><a:srgbClr val="9B8CF2"/></a:accent3><a:accent4><a:srgbClr val="FFB38A"/></a:accent4><a:accent5><a:srgbClr val="5E8BFF"/></a:accent5><a:accent6><a:srgbClr val="C86A6A"/></a:accent6><a:hlink><a:srgbClr val="5676E8"/></a:hlink><a:folHlink><a:srgbClr val="9B8CF2"/></a:folHlink></a:clrScheme><a:fontScheme name="Paperly"><a:majorFont><a:latin typeface="Calibri Light"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Paperly"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`;
const masterXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>`;
const layoutXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
const files={'[Content_Types].xml':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>${slideParts.map((_,i)=>`<Override PartName="/ppt/slides/slide${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('')}</Types>`),'_rels/.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`),'ppt/presentation.xml':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>${sldIdLst}</p:sldIdLst><p:sldSz cx="${SW}" cy="${SH}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`),'ppt/_rels/presentation.xml.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>${sldRels}</Relationships>`),'ppt/slideMasters/slideMaster1.xml':fflate.strToU8(masterXml),'ppt/slideMasters/_rels/slideMaster1.xml.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`),'ppt/slideLayouts/slideLayout1.xml':fflate.strToU8(layoutXml),'ppt/slideLayouts/_rels/slideLayout1.xml.rels':fflate.strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`),'ppt/theme/theme1.xml':fflate.strToU8(themeXml)};
for(let i=0;i<slideParts.length;i++){files[`ppt/slides/slide${i+1}.xml`]=fflate.strToU8(slideParts[i].xml);files[`ppt/slides/_rels/slide${i+1}.xml.rels`]=fflate.strToU8(slideParts[i].rels);files[`ppt/media/image${i+1}.jpeg`]=new Uint8Array(await slideParts[i].jpeg.arrayBuffer())}
return fflate.zipSync(files,{level:6})}

let compressionFallbackCount=0,qpdfApiPromise=null;
async function getQpdfApi(){if(!qpdfApiPromise)qpdfApiPromise=import('./vendor/qpdf-wasm/index.js').then(({createQpdf})=>createQpdf({wasmUrl:new URL('./vendor/qpdf-wasm/wasm/qpdf.wasm',location.href),workers:1}));try{return await qpdfApiPromise}catch(error){qpdfApiPromise=null;throw error}}
function setProgress(p,label){const bar=document.getElementById('modalProgress'),fill=document.getElementById('modalProgressFill'),lbl=document.getElementById('modalProgressLabel');if(!bar)return;bar.classList.add('show');bar.setAttribute('aria-hidden','false');if(lbl){lbl.textContent=label||'';lbl.classList.toggle('show',!!label)}if(p==null||isNaN(p)){fill.classList.add('indeterminate');fill.style.width='100%';bar.removeAttribute('aria-valuenow')}else{fill.classList.remove('indeterminate');const v=Math.max(2,Math.min(100,p));fill.style.width=v+'%';bar.setAttribute('aria-valuenow',String(Math.round(v)))}}
function hideProgress(){const bar=document.getElementById('modalProgress');if(!bar)return;bar.classList.remove('show');bar.setAttribute('aria-hidden','true');bar.removeAttribute('aria-valuenow');const fill=document.getElementById('modalProgressFill');if(fill){fill.classList.remove('indeterminate');fill.style.width='0%'}const lbl=document.getElementById('modalProgressLabel');if(lbl){lbl.textContent='';lbl.classList.remove('show')}}
function parseHocrWords(hocr){const words=[],re=/<span[^>]*class=['"]ocrx_word['"][^>]*title=['"][^'"]*bbox ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)[^'"]*['"][^>]*>([\s\S]*?)<\/span>/g;let m;while((m=re.exec(hocr||''))){const tmp=document.createElement('textarea');tmp.innerHTML=m[5].replace(/<[^>]*>/g,'');const text=tmp.value.trim();if(text)words.push({x0:+m[1],y0:+m[2],x1:+m[3],y1:+m[4],text})}return words}
async function runOcrPage(pdf,i,lang,wantHocr){const page=await pdf.getPage(i),base=page.getViewport({scale:1}),maxDimension=3200,maxPixels=12_000_000,scale=Math.min(4,maxDimension/base.width,maxDimension/base.height,Math.sqrt(maxPixels/(base.width*base.height))),vp=page.getViewport({scale});const canvas=document.createElement('canvas');canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Browser tidak dapat menyiapkan kanvas untuk OCR.');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);await page.render({canvasContext:ctx,viewport:vp}).promise;const Tesseract=await loadTesseract();const {data}=await Tesseract.recognize(canvas,lang,{langPath:'https://tessdata.projectnaptha.com/4.0.0',workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@5'},{text:true,hocr:wantHocr});const result={text:data.text||'',hocr:data.hocr||'',width:canvas.width,height:canvas.height,size:base};if(wantHocr){result.png=await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Gambar halaman OCR gagal disimpan.')),'image/png'))}canvas.width=1;canvas.height=1;return result}
async function runOcr(file,report){const lang=document.getElementById('ocrLang').value,mode=(document.querySelector('input[name="ocrOut"]:checked')||{}).value||'txt',status=document.getElementById('ocrStatus'),base=filenameBase(file.name);const bytes=new Uint8Array(await file.arrayBuffer()),pdf=await pdfjsLib.getDocument({data:bytes}).promise;
if(mode==='pdf'){const out=await PDFDocument.create(),font=await out.embedFont(StandardFonts.Helvetica);for(let i=1;i<=pdf.numPages;i++){report((i-1)/pdf.numPages*.9);status.textContent=`Membaca halaman ${i} dari ${pdf.numPages} dengan OCR…`;const r=await runOcrPage(pdf,i,lang,true);const img=await out.embedPng(await r.png.arrayBuffer());const pg=out.addPage([r.size.width,r.size.height]);pg.drawImage(img,{x:0,y:0,width:r.size.width,height:r.size.height});const sx=r.size.width/r.width,sy=r.size.height/r.height;for(const w of parseHocrWords(r.hocr)){const size=(w.y1-w.y0)*sy*.9;if(size<2)continue;pg.drawText(w.text,{x:w.x0*sx,y:r.size.height-w.y1*sy,size,font,color:rgb(0,0,0),opacity:0})}}pdf.destroy();status.textContent='PDF hasil pindaian yang bisa dicari siap diunduh.';return {name:`${base}-ocr-cari.pdf`,data:await out.save()}}
const pages=[];for(let i=1;i<=pdf.numPages;i++){report((i-1)/pdf.numPages*.9);status.textContent=`Membaca halaman ${i} dari ${pdf.numPages} dengan OCR…`;const r=await runOcrPage(pdf,i,lang,false);pages.push(`— Halaman ${i} —\n${r.text.trim()}`)}pdf.destroy();status.textContent='Teks berhasil dibaca. Hasil siap diunduh.';return {name:`${base}-teks.txt`,data:pages.join('\n\n'),type:'text/plain;charset=utf-8'}}
async function runSingle(id,file,report){const base=filenameBase(file.name);
if(id==='compress'){const quality=document.querySelector('input[name="quality"]:checked').value,level={low:3,medium:6,high:9}[quality]||6;report(.1);const qpdf=await getQpdfApi(),{output}=await qpdf.compress(file,{level,onProgress:percent=>report(.1+percent/100*.8)});if(output.byteLength>=file.size){compressionFallbackCount++;return {name:file.name,data:file,type:file.type||'application/pdf'}}return {name:`${base}-kompres.pdf`,data:output}}
if(id==='rotate'){report(.3);const {doc}=await readPDF(file),perPage=rotateState.mode==='pages'&&rotateState.file===file;if(perPage){if(!rotateState.pages.size)throw Error('Putar minimal satu halaman pada pratinjau, atau pilih “Semua halaman”.');doc.getPages().forEach((p,i)=>{const delta=rotateState.pages.get(i)||0;if(delta)p.setRotation(degrees((p.getRotation().angle+delta)%360))})}else{const deg=+document.querySelector('input[name="rotation"]:checked').value;doc.getPages().forEach(p=>p.setRotation(degrees((p.getRotation().angle+deg)%360)))}report(.85);return {name:`${base}-diputar.pdf`,data:await doc.save()}}
if(id==='extract'){report(.25);const {doc}=await readPDF(file),ids=parsePages(document.getElementById('rangeField').value,doc.getPageCount()),piece=await PDFDocument.create(),pages=await piece.copyPages(doc,ids);pages.forEach(p=>piece.addPage(p));report(.85);return {name:`${base}-ekstrak.pdf`,data:await piece.save()}}
if(id==='number'){report(.15);const {doc}=await readPDF(file),fontChoice=document.getElementById('numberFont').value,startRaw=parseInt(document.getElementById('numberStart').value,10),start=Number.isInteger(startRaw)&&startRaw>0?startRaw:1,size=+document.getElementById('numberSize').value||10,template=document.getElementById('numberFormat').value.trim(),position=document.getElementById('numberPosition').value;if(!template)throw Error('Masukkan format nomor halaman.');let font;if(fontChoice==='custom'){if(!numberState.fontFile)throw Error('Pilih file font TTF atau OTF untuk menggunakan font kustom.');try{doc.registerFontkit(await ensureFontkit());font=await doc.embedFont(await numberState.fontFile.arrayBuffer(),{subset:true})}catch(e){throw Error('Font kustom tidak dapat disematkan. Pastikan file TTF/OTF valid dan tidak rusak.')}}else{const standardFont={Helvetica:StandardFonts.Helvetica,'Helvetica-Bold':StandardFonts.HelveticaBold,'Times-Roman':StandardFonts.TimesRoman,Courier:StandardFonts.Courier}[fontChoice];font=await doc.embedFont(standardFont||StandardFonts.Helvetica)}const pages=doc.getPages(),total=pages.length;pages.forEach((p,i)=>{const {width,height}=p.getSize(),text=formatPageNumber(template,start+i,total),textWidth=font.widthOfTextAtSize(text,size),align=position.endsWith('left')?'left':position.endsWith('right')?'right':'center',x=align==='left'?24:align==='right'?Math.max(12,width-24-textWidth):(width-textWidth)/2,y=position.startsWith('top')?height-28-size:18;p.drawText(text,{x,y,size,font,color:rgb(.38,.42,.52)})});report(.85);return {name:`${base}-bernomor.pdf`,data:await doc.save()}}
if(id==='watermark'){const text=document.getElementById('watermarkText').value.trim(),opacity=(+document.getElementById('watermarkOpacity').value||20)/100,position=document.getElementById('watermarkPosition').value,imageFile=watermarkState.imageFile;if(!text&&!imageFile)throw Error('Tulis teks atau pilih gambar untuk tanda air.');report(.12);const {doc}=await readPDF(file);let font,image;if(text)font=await doc.embedFont(StandardFonts.HelveticaBold);if(imageFile){const prepared=await watermarkImageBytes(imageFile);image=prepared.type==='image/png'?await doc.embedPng(prepared.bytes):await doc.embedJpg(prepared.bytes)}const pages=doc.getPages();for(let i=0;i<pages.length;i++){const page=pages[i],{width,height}=page.getSize(),[vertical,horizontal]=position.split('-').length===1?['middle','center']:position.split('-');const size=text?Math.min(48,Math.max(16,width/12)):0,textWidth=text?font.widthOfTextAtSize(text,size):0,maxWidth=width*(text?.24:.36),maxHeight=height*(text?.14:.24),scale=image?Math.min(maxWidth/image.width,maxHeight/image.height):0,drawWidth=image?image.width*scale:0,drawHeight=image?image.height*scale:0,margin=Math.min(28,Math.min(width,height)*.06);if(text&&image){const gap=Math.min(8,size*.25),groupWidth=Math.max(textWidth,drawWidth),groupHeight=size+gap+drawHeight,groupX=horizontal==='left'?margin:horizontal==='right'?Math.max(margin,width-margin-groupWidth):(width-groupWidth)/2,groupY=vertical==='top'?height-margin-groupHeight:vertical==='bottom'?margin:(height-groupHeight)/2;page.drawImage(image,{x:groupX+(groupWidth-drawWidth)/2,y:groupY,width:drawWidth,height:drawHeight,opacity});page.drawText(text,{x:groupX+(groupWidth-textWidth)/2,y:groupY+drawHeight+gap,size,font,color:rgb(.42,.46,.56),opacity})}else if(text){const x=horizontal==='left'?margin:horizontal==='right'?Math.max(margin,width-margin-textWidth):(width-textWidth)/2,y=vertical==='top'?height-margin-size:vertical==='bottom'?margin:(height-size)/2;page.drawText(text,{x,y,size,font,color:rgb(.42,.46,.56),opacity})}else if(image){const x=horizontal==='left'?margin:horizontal==='right'?width-margin-drawWidth:(width-drawWidth)/2,y=vertical==='top'?height-margin-drawHeight:vertical==='bottom'?margin:(height-drawHeight)/2;page.drawImage(image,{x,y,width:drawWidth,height:drawHeight,opacity})}report(.12+((i+1)/pages.length)*.73)}return {name:`${base}-bertanda-air.pdf`,data:await doc.save()}}
if(id==='protect'){const pw=document.getElementById('protectPassword').value,owner=document.getElementById('protectOwner').value.trim();if(pw.length<4)throw Error('Gunakan kata sandi minimal 4 karakter.');report(.2);const doc=await CantooPDFDocument.load(await file.arrayBuffer(),{ignoreEncryption:true});if(doc.isEncrypted)throw Error('PDF ini sudah terkunci. Gunakan "Buka kunci PDF" terlebih dahulu.');const restrict=document.querySelector('input[name="protectMode"]:checked').value==='restrict';doc.encrypt({userPassword:pw,ownerPassword:owner||pw,permissions:restrict?{printing:false,modifying:false,copying:false,annotating:false,fillingForms:false,contentAccessibility:false,documentAssembly:false}:{printing:'highResolution',modifying:true,copying:true,annotating:true,fillingForms:true,contentAccessibility:true,documentAssembly:true}});report(.85);return {name:`${base}-terkunci.pdf`,data:await doc.save({useObjectStreams:true})}}
if(id==='unlock'){const pw=document.getElementById('unlockPassword').value;report(.2);let doc;try{doc=await CantooPDFDocument.load(await file.arrayBuffer(),{password:pw})}catch(e){if(e.name==='EncryptedPDFError'||/encrypt|password/i.test(e.message))throw Error('Kata sandi salah atau file tidak bisa dibuka. Periksa kembali kata sandi PDF Anda.');throw e}report(.85);return {name:`${base}-terbuka.pdf`,data:await doc.save()}}
if(id==='ocr')return runOcr(file,report);
throw Error('Alat tidak dikenal.')}
async function processTool(){if(processedPreviewBlob&&activeTool&&['merge','extract','rotate'].includes(activeTool.id)){download(processedPreviewBlob,processedPreviewName);showToast('Beri nama file pada dialog simpan.');return}if(activeTool.id!=='doc'&&!selectedFiles.length){showError(activeTool.input==='images'?'Pilih setidaknya satu gambar.':'Pilih file PDF terlebih dahulu.');return}if(activeTool.id==='merge'&&selectedFiles.length<2){showError('Tambahkan minimal dua file PDF untuk digabungkan.');return}const run=++processRun,progress=(p,label)=>{if(run===processRun)setProgress(p,label)};
const button=document.getElementById('modalAction');button.disabled=true;button.classList.add('loading');button.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Sedang memproses…</span>';document.getElementById('modalError').classList.remove('show');setProgress(null,'Menyiapkan…');let previewReady=false;try{compressionFallbackCount=0;
switch(activeTool.id){
case'split':{const {doc}=await readPDF(selectedFiles[0]),total=doc.getPageCount(),ranges=currentSplitRanges(total);if(!ranges.length)throw Error('Tentukan setidaknya satu rentang halaman.');progress(30,`Menyiapkan ${ranges.length} rentang…`);const files=[];for(let i=0;i<ranges.length;i++){const ids=ranges[i].ids;if(!ids.length||ids.some(n=>!Number.isInteger(n)||n<0||n>=total))throw Error('Rentang halaman tidak valid. Muat ulang PDF lalu coba lagi.');const piece=await PDFDocument.create(),copied=await piece.copyPages(doc,ids);if(copied.length!==ids.length)throw Error('Jumlah halaman hasil tidak sesuai dengan rentang yang diminta.');copied.forEach(p=>piece.addPage(p));const suffix=ranges.length>1?`-bagian-${i+1}`:'';files.push({name:`${filenameBase(selectedFiles[0].name)}-halaman-${ranges[i].slug}${suffix}.pdf`,data:await piece.save()});progress(30+(i+1)/ranges.length*50,'Membuat file hasil…')}if(files.length===1)run===processRun&&download(files[0].data,files[0].name);else{progress(88,'Membuat arsip ZIP…');const zipped={};for(const f of files)zipped[f.name]=new Uint8Array(f.data);run===processRun&&download(fflate.zipSync(zipped,{level:6}),`${filenameBase(selectedFiles[0].name)}-hasil-pisah.zip`,'application/zip')}progress(100,'Selesai');break}
case'merge':{const merged=await PDFDocument.create(),files=selectedFiles.slice(),orderedPages=mergeState.pages;if(!mergeState.ready||mergeState.files.length!==files.length||mergeState.files.some((f,i)=>f!==files[i])||!orderedPages.length)throw Error('Pratinjau urutan halaman belum siap. Tunggu hingga halaman selesai dimuat lalu coba lagi.');const sourceDocs=new Map();for(let i=0;i<orderedPages.length;i++){const item=orderedPages[i];if(!files.includes(item.file))throw Error('Urutan halaman berubah. Muat ulang pratinjau sebelum menggabungkan.');let source=sourceDocs.get(item.file);if(!source){source=(await readPDF(item.file)).doc;sourceDocs.set(item.file,source)}const pageIndex=Number(item.page)-1;if(!Number.isInteger(pageIndex)||pageIndex<0||pageIndex>=source.getPageCount())throw Error('Pratinjau berisi halaman yang tidak valid. Muat ulang daftar file.');const [copied]=await merged.copyPages(source,[pageIndex]);merged.addPage(copied);progress((i+1)/orderedPages.length*90,`Menyatukan halaman ${i+1} dari ${orderedPages.length}…`)}progress(95,'Menyimpan…');run===processRun&&showProcessedPreview(await merged.save(),`paperly-gabungan-${Date.now()}.pdf`);previewReady=true;break}
case'images':{const pdf=await PDFDocument.create(),files=selectedFiles;for(let i=0;i<files.length;i++){progress(i/files.length*90,`Menyisipkan gambar ${i+1} dari ${files.length}…`);const f=files[i],bytes=await f.arrayBuffer(),img=f.type==='image/png'?await pdf.embedPng(bytes):await pdf.embedJpg(bytes);const page=pdf.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})}progress(95,'Menyimpan…');run===processRun&&download(await pdf.save(),`gambar-ke-pdf-${Date.now()}.pdf`);progress(100,'Selesai');break}
case'edit':{progress(50,'Menyusun halaman…');run===processRun&&download(await saveEditorPDF(f=>progress(30+f*.6)),`${filenameBase(selectedFiles[0].name)}-suntingan.pdf`);progress(100,'Selesai');break}
case'doc':{run===processRun&&download(await exportDocToPdf(f=>progress(25+f*.65,'Merakit halaman PDF…')),'paperly-dokumen.pdf');progress(100,'Selesai');break}
case'toWord':{const pages=await extractPdfLines(selectedFiles[0],f=>progress(15+f*.6,'Membaca teks PDF…'));progress(85,'Menyusun dokumen Word…');run===processRun&&download(buildDocx(pages),`${filenameBase(selectedFiles[0].name)}.docx`,'application/vnd.openxmlformats-officedocument.wordprocessingml.document');progress(100,'Selesai');break}
case'toPpt':{run===processRun&&download(await buildPptx(selectedFiles[0],f=>progress(15+f*.7,'Merender halaman jadi slide…')),`${filenameBase(selectedFiles[0].name)}.pptx`,'application/vnd.openxmlformats-officedocument.presentationml.presentation');progress(100,'Selesai');break}
case'pdfa':{progress(5,'Merender halaman dan menyiapkan metadata PDF/A…');run===processRun&&download(await convertToPdfA(selectedFiles[0],f=>progress(5+f*.75,'Merender halaman PDF/A…')),`${filenameBase(selectedFiles[0].name)}-pdfa.pdf`);progress(100,'Selesai');break}
 case'toJpg':{const total=jpgState.doc?jpgState.doc.numPages:0;let pages=null;if(jpgState.mode!=='all'){if(!total)throw Error('Tunggu pratinjau halaman selesai dimuat, lalu coba lagi.');pages=jpgActivePages();if(!pages.length)throw Error(jpgState.mode==='range'?'Masukkan rentang halaman yang ingin dikonversi.':'Pilih minimal satu halaman pada pratinjau.')}progress(5,pages?`Menyiapkan ${pages.length} halaman JPG…`:'Menyiapkan semua halaman JPG…');const images=await renderPdfPagesToJpg(selectedFiles[0],pages,f=>progress(10+f*.78,'Merender halaman JPG…'),{scale:2});if(images.length===1){run===processRun&&download(images[0].data,images[0].name,'image/jpeg')}else{progress(92,'Membuat arsip ZIP…');const files={};for(const image of images)files[image.name]=image.data;run===processRun&&download(fflate.zipSync(files,{level:6}),`${filenameBase(selectedFiles[0].name)}-jpg.zip`,'application/zip')}progress(100,'Selesai');break}
case'redact':{progress(5,'Menyusun halaman redaksi…');run===processRun&&download(await applyRedaction(selectedFiles[0],f=>progress(5+f*.8,'Merender halaman yang ditandai…')),`${filenameBase(selectedFiles[0].name)}-redaksi.pdf`);progress(100,'Selesai');break}
case'flatten':{progress(6,'Merender halaman resolusi tinggi…');run===processRun&&download(await flattenPdf(selectedFiles[0],f=>progress(6+f*.84,'Merender halaman resolusi tinggi…')),`${filenameBase(selectedFiles[0].name)}-flat.pdf`);progress(100,'Selesai');break}
 default:{const files=selectedFiles,total=files.length,outputs=[];for(let i=0;i<total;i++){const f=files[i];const report=frac=>progress(((i+(frac==null?.5:frac))/total)*100,total>1?`File ${i+1}/${total} — ${f.name}`:f.name);outputs.push(await runSingle(activeTool.id,f,report))}if(outputs.length===1){const o=outputs[0];if(['extract','rotate'].includes(activeTool.id)){run===processRun&&showProcessedPreview(o.data,o.name);previewReady=true}else run===processRun&&download(o.data,o.name,o.type)}else{progress(96,'Membuat arsip ZIP…');const z={};for(let i=0;i<outputs.length;i++){const o=outputs[i];let n=o.name,c=1;while(z[n])n=o.name.replace(/(\.[^./]+)?$/,`-${++c}$1`);z[n]=new Uint8Array(o.data instanceof Blob?await o.data.arrayBuffer():o.data)}run===processRun&&download(fflate.zipSync(z,{level:6}),`${filenameBase(files[0].name)}-${activeTool.id}-hasil.zip`,'application/zip')}progress(100,'Selesai')}}
if(run!==processRun)return;if(previewReady)showToast('PDF hasil siap diperiksa. Simpan untuk mengunduh file yang sama.');else{closeModal(false);hideProgress();showToast(activeTool.id==='compress'?(compressionFallbackCount?'Hasil kompresi lebih besar pada '+compressionFallbackCount+' file, jadi file aslinya dipertahankan.':'PDF selesai dikompres. Beri nama file pada dialog simpan.'):'Selesai! Beri nama file pada dialog simpan.');}}catch(e){if(run===processRun){hideProgress();showError(e.message||'Terjadi kesalahan saat memproses file.')}}finally{if(run===processRun&&!previewReady){button.disabled=false;button.classList.remove('loading');button.innerHTML=`<span>${activeTool.action}</span><span>↗</span>`}}}

document.addEventListener('click',e=>{const brand=e.target.closest('.brand,.topbar-brand');if(!brand)return;brand.classList.remove('logo-click');void brand.offsetWidth;brand.classList.add('logo-click')});
document.addEventListener('animationend',e=>{if(e.animationName!=='logo-pop')return;const brand=e.target.closest('.brand.logo-click,.topbar-brand.logo-click');if(brand)brand.classList.remove('logo-click')});
document.getElementById('modalAction').addEventListener('click',processTool);document.getElementById('modalClose').addEventListener('click',closeModal);document.getElementById('modalCancel').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(sidebarOpen){setSidebarOpen(false,{restoreFocus:true});return}if(document.getElementById('sheetLeaveDialog').classList.contains('open')){e.preventDefault();closeSheetLeaveDialog();return}if(document.getElementById('sheetPage').classList.contains('open')){e.preventDefault();openSheetLeaveDialog();return}if(document.getElementById('docLeaveDialog').classList.contains('open')){e.preventDefault();closeDocLeaveDialog();return}if(document.getElementById('docWritePage').classList.contains('open')){e.preventDefault();openDocLeaveDialog();return}closeModal()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('toolSearch').focus()}});
document.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>{setSidebarOpen(false);openTool(b.dataset.tool)}));document.getElementById('toolSearch').addEventListener('input',e=>renderTools(e.target.value,true));document.querySelector('[data-scroll-tools]').addEventListener('click',()=>{location.hash='tools'});
const sidebar=document.getElementById('sidebar'),sidebarScrim=document.getElementById('sidebarScrim'),mobileMenu=document.getElementById('mobileMenu'),mainContent=document.querySelector('.main-content'),mobileQuery=window.matchMedia('(max-width:860px)');let sidebarOpen=false;
function setSidebarOpen(open,options={}){sidebarOpen=!!open&&mobileQuery.matches;sidebar.classList.toggle('open',sidebarOpen);sidebarScrim.classList.toggle('open',sidebarOpen);document.body.classList.toggle('sidebar-open',sidebarOpen);mobileMenu.setAttribute('aria-expanded',String(sidebarOpen));mobileMenu.setAttribute('aria-label',sidebarOpen?'Tutup menu':'Buka menu');const hidden=mobileQuery.matches&&!sidebarOpen;sidebar.toggleAttribute('inert',hidden);mainContent.toggleAttribute('inert',mobileQuery.matches&&sidebarOpen);if(hidden)sidebar.setAttribute('aria-hidden','true');else sidebar.removeAttribute('aria-hidden');if(sidebarOpen){requestAnimationFrame(()=>{if(sidebarOpen)sidebar.focus({preventScroll:true})})}else if(options.restoreFocus)mobileMenu.focus({preventScroll:true})}
mobileMenu.addEventListener('click',()=>setSidebarOpen(!sidebarOpen));sidebarScrim.addEventListener('click',()=>setSidebarOpen(false));document.querySelector('.brand').addEventListener('click',()=>setSidebarOpen(false));mobileQuery.addEventListener?.('change',()=>setSidebarOpen(false));setSidebarOpen(false);
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
function canAnimate(){return !motionPreference.matches&&document.documentElement.dataset.perf!=='lite'}
let currentPage='';
function commitPage(target){
  const context=document.getElementById('topbarContext');
  if(context)context.textContent={home:'Beranda',tools:'Alat PDF',about:'Tentang'}[target];
  document.querySelectorAll('.page-section').forEach(section=>section.classList.toggle('active',section.dataset.page===target));
  document.querySelectorAll('.nav-link').forEach(link=>{const active=link.dataset.nav===target;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
  setSidebarOpen(false);
}
function showPage(page){
  const target=['home','tools','about'].includes(page)?page:'home';
  const previous=currentPage;
  currentPage=target;
  const changed=!!previous&&previous!==target;
  if(changed)window.scrollTo({top:0,behavior:'auto'});
  if(changed&&canAnimate()&&typeof document.startViewTransition==='function'){
    document.documentElement.classList.add('vt-active');
    let committed=false;
    try{
      const transition=document.startViewTransition(()=>{committed=true;commitPage(target)});
      transition.finished.finally(()=>document.documentElement.classList.remove('vt-active'));
    }catch(error){
      document.documentElement.classList.remove('vt-active');
      if(!committed)commitPage(target);
    }
  }else commitPage(target);
}
function routeHash(){showPage(location.hash.slice(1));}
document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>setSidebarOpen(false)));
window.addEventListener('hashchange',routeHash);
if(!location.hash)history.replaceState(null,'','#home');
routeHash();
const now=new Date(),dateLabel=document.getElementById('todayLabel');dateLabel.textContent=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long'}).format(now);

/* ===== PDF Sheet: spreadsheet lokal dengan rumus, variabel, dan ekspor PDF ===== */
const SHEET_MAX_COLS=26,SHEET_MAX_ROWS=120;
const SHEET_FONTS={sans:{css:"'DM Sans',Arial,sans-serif",label:'Sans'},serif:{css:"Georgia,'Times New Roman',serif",label:'Serif'},mono:{css:"'Courier New',monospace",label:'Mono'}};
const SHEET_PAPERS={a4:{w:595.28,h:841.89,label:'A4'},a3:{w:841.89,h:1190.55,label:'A3'},a5:{w:419.53,h:595.28,label:'A5'},b5:{w:498.9,h:708.66,label:'B5'},letter:{w:612,h:792,label:'Letter'},legal:{w:612,h:1008,label:'Legal'},f4:{w:609.45,h:935.43,label:'F4 / Folio'}};
const SHEET_STD_FONTS={sans:{r:StandardFonts.Helvetica,b:StandardFonts.HelveticaBold,i:StandardFonts.HelveticaOblique,bi:StandardFonts.HelveticaBoldOblique},serif:{r:StandardFonts.TimesRoman,b:StandardFonts.TimesRomanBold,i:StandardFonts.TimesRomanItalic,bi:StandardFonts.TimesRomanBoldItalic},mono:{r:StandardFonts.Courier,b:StandardFonts.CourierBold,i:StandardFonts.CourierOblique,bi:StandardFonts.CourierBoldOblique}};
const SHEET_PDF_DEFAULTS={paper:'a4',orientation:'auto',layout:'fit',border:'all',fontScale:1,margins:'normal',title:true,header:true,rowNumbers:true,pageNumbers:true,pageNumPos:'center'};
const SHEET_DEFAULT_COL_W=108,SHEET_DEFAULT_ROW_H=30,SHEET_MIN_COL_W=48,SHEET_MIN_ROW_H=22,SHEET_MAX_COL_W=480,SHEET_MAX_ROW_H=240;
const SHEET_FORMULA_DOCS=[
  {group:'Matematika',fn:'SUM',args:'A1:A9',desc:'Menjumlahkan angka atau rentang.'},
  {group:'Matematika',fn:'AVERAGE',args:'A1:A9',desc:'Rata-rata nilai.'},
  {group:'Matematika',fn:'MIN',args:'A1:A9',desc:'Nilai terkecil.'},
  {group:'Matematika',fn:'MAX',args:'A1:A9',desc:'Nilai terbesar.'},
  {group:'Matematika',fn:'ROUND',args:'2,567; 2',desc:'Membulatkan ke jumlah desimal.'},
  {group:'Matematika',fn:'ABS',args:'A1',desc:'Nilai absolut.'},
  {group:'Matematika',fn:'SQRT',args:'A1',desc:'Akar kuadrat.'},
  {group:'Matematika',fn:'POWER',args:'A1; 2',desc:'Pangkat.'},
  {group:'Matematika',fn:'MOD',args:'A1; 3',desc:'Sisa pembagian.'},
  {group:'Statistik',fn:'COUNT',args:'A1:A9',desc:'Hitung sel berisi angka.'},
  {group:'Statistik',fn:'COUNTA',args:'A1:A9',desc:'Hitung sel tidak kosong.'},
  {group:'Statistik',fn:'PRODUCT',args:'A1; B1',desc:'Mengalikan semua nilai.'},
  {group:'Logika',fn:'IF',args:'A1>10; "Lunas"; "Belum"',desc:'Pilih nilai sesuai kondisi.'},
  {group:'Logika',fn:'AND',args:'A1>0; B1>0',desc:'Benar jika semua benar.'},
  {group:'Logika',fn:'OR',args:'A1>0; B1>0',desc:'Benar jika salah satu benar.'},
  {group:'Logika',fn:'NOT',args:'A1>0',desc:'Membalik nilai benar/salah.'},
  {group:'Teks',fn:'CONCAT',args:'A1; " - "; B1',desc:'Gabungkan teks.'},
  {group:'Teks',fn:'LEN',args:'A1',desc:'Panjang teks.'}
];
let sheetCustomFonts=[];
let sheetFormulaPrev='',sheetFormulaInserting=false,sheetFormulaCaret=null;
const sheetPdfState={open:false,token:0,doc:null,pages:0,page:1,busy:false,bytes:null,options:null,returnFocus:null,landscape:false};
let sheetPreviewTimer=null;
const sheet={cols:16,rows:40,cells:{},vars:{},merges:[],colW:{},rowH:{},sel:{r:0,c:0},anchor:{r:0,c:0},editing:null,editOriginal:'',history:[],future:[],dragging:false,touchTap:null,touchTimer:null,fillDrag:null,resize:null,initialized:false,exported:false,exportToken:0,_cache:null,_varCache:null,_display:null};
let sheetLeaveReturnFocus=null,sheetPageReturnFocus=null;

function sheetColName(c){let s='';c++;while(c>0){const m=(c-1)%26;s=String.fromCharCode(65+m)+s;c=Math.floor((c-1)/26)}return s}
function sheetColIndex(name){let n=0;for(const ch of String(name).toUpperCase())n=n*26+(ch.charCodeAt(0)-64);return n-1}
function sheetKey(r,c){return sheetColName(c)+(r+1)}
function sheetParseKey(key){const m=/^([A-Z]+)(\d+)$/.exec(key);if(!m)return null;return {c:sheetColIndex(m[1]),r:+m[2]-1}}
function sheetRaw(r,c){const cell=sheet.cells[sheetKey(r,c)];return cell?String(cell.v??''):''}
function sheetNameValue(){const el=document.getElementById('sheetName');return (el&&el.value.trim())||'Lembar 1'}
function sheetErrText(e){const msg=String(e&&e.message||'');return /^#/.test(msg)?msg:'#ERROR!'}
function sheetCoerce(raw){const t=String(raw).trim();if(t==='')return '';if(/^-?\d+(?:[.,]\d+)?$/.test(t))return Number(t.replace(',','.'));return String(raw)}
function sheetNumber(v){if(typeof v==='number'){if(!Number.isFinite(v))throw Error('#NUM!');return v}if(typeof v==='boolean')return v?1:0;if(v===''||v==null)return 0;if(typeof v==='string'){const t=v.trim().replace(/\s/g,'');if(t!==''&&/^-?\d+(?:[.,]\d+)?$/.test(t)){const n=Number(t.replace(',','.'));if(Number.isFinite(n))return n}throw Error('#VALUE!')}throw Error('#VALUE!')}
function sheetText(v){if(v==null)return '';if(typeof v==='boolean')return v?'TRUE':'FALSE';if(Array.isArray(v))return v.map(sheetText).join('');return String(v)}
function sheetTruthy(v){if(typeof v==='boolean')return v;if(typeof v==='number')return v!==0;if(v==null||v==='')return false;if(typeof v==='string')return v.toUpperCase()==='TRUE'||(v.trim()!==''&&v.trim()!=='FALSE');return true}
function sheetFlatten(args){const out=[];for(const a of args){if(Array.isArray(a))out.push(...a);else out.push(a)}return out}
function sheetCompare(a,b,op){let left=a,right=b;if(typeof left==='number'&&typeof right==='number'){if(op==='=')return left===right;if(op==='<>')return left!==right;if(op==='<')return left<right;if(op==='<=')return left<=right;if(op==='>')return left>right;if(op==='>=')return left>=right}const l=sheetText(left).toLowerCase(),r=sheetText(right).toLowerCase();if(op==='=')return l===r;if(op==='<>')return l!==r;if(op==='<')return l<r;if(op==='<=')return l<=r;if(op==='>')return l>r;return l>=r}
function sheetTokenize(src){const out=[];let i=0;const pushOp=v=>{out.push({t:'op',v});i+=v.length};while(i<src.length){const ch=src[i];if(/\s/.test(ch)){i++;continue}if(ch==='"'){let j=i+1,s='';while(j<src.length){if(src[j]==='"'){if(src[j+1]==='"'){s+='"';j+=2;continue}break}s+=src[j++]}if(j>=src.length)throw Error('#SYNTAX!');out.push({t:'str',v:s});i=j+1;continue}if(ch==='#'){const m=/^#[A-Z0-9/!]+/.exec(src.slice(i));if(!m)throw Error('#SYNTAX!');out.push({t:'err',v:m[0]});i+=m[0].length;continue}if(ch==='$'||/[A-Za-z]/.test(ch)){const ref=/^\$?([A-Za-z]{1,3})\$?(\d+)(?![A-Za-z0-9_])/.exec(src.slice(i));if(ref){out.push({t:'ref',c:sheetColIndex(ref[1]),r:+ref[2]-1});i+=ref[0].length;continue}const name=/^[A-Za-z_][A-Za-z0-9_.]*/.exec(src.slice(i));if(!name)throw Error('#SYNTAX!');out.push({t:'name',v:name[0]});i+=name[0].length;continue}if(/[0-9]/.test(ch)||(ch==='.'&&/[0-9]/.test(src[i+1]||''))){const m=/^\d*\.?\d+(?:[eE][+-]?\d+)?/.exec(src.slice(i));if(!m)throw Error('#SYNTAX!');out.push({t:'num',v:parseFloat(m[0])});i+=m[0].length;continue}if(ch==='<'||ch==='>'){if(src[i+1]==='=')pushOp(ch+'=');else if(ch==='<'&&src[i+1]==='>')pushOp('<>');else pushOp(ch);continue}if(ch===';'){pushOp(',');continue}if('+-*/^%&(),:='.includes(ch)){pushOp(ch);continue}throw Error('#SYNTAX!')}return out}
function sheetCallFunction(name,args,stack){const flat=sheetFlatten(args),nums=flat.filter(v=>typeof v==='number'&&Number.isFinite(v));switch(name){case'SUM':return nums.reduce((a,b)=>a+b,0);case'AVERAGE':case'AVG':if(!nums.length)throw Error('#DIV/0!');return nums.reduce((a,b)=>a+b,0)/nums.length;case'MIN':return nums.length?Math.min(...nums):0;case'MAX':return nums.length?Math.max(...nums):0;case'COUNT':return nums.length;case'COUNTA':return flat.filter(v=>v!==''&&v!=null).length;case'PRODUCT':return flat.length?flat.reduce((a,b)=>a*sheetNumber(b),1):0;case'ROUND':{const n=sheetNumber(flat[0]||0),d=Math.trunc(sheetNumber(flat[1]||0)),f=Math.pow(10,d);return Math.round((n+Number.EPSILON)*f)/f}case'ABS':return Math.abs(sheetNumber(flat[0]||0));case'SQRT':{const n=sheetNumber(flat[0]||0);if(n<0)throw Error('#NUM!');return Math.sqrt(n)}case'POWER':return Math.pow(sheetNumber(flat[0]||0),sheetNumber(flat[1]||0));case'MOD':{const a=sheetNumber(flat[0]||0),b=sheetNumber(flat[1]||0);if(!b)throw Error('#DIV/0!');return a%b}case'IF':return sheetTruthy(flat[0])?(flat.length>1?flat[1]:true):(flat.length>2?flat[2]:false);case'AND':return flat.length?flat.every(sheetTruthy):false;case'OR':return flat.some(sheetTruthy);case'NOT':return !sheetTruthy(flat[0]);case'CONCAT':return flat.map(sheetText).join('');case'LEN':return sheetText(flat[0]||'').length;default:throw Error('#NAME?')}}
function sheetParseFormula(src,stack){const tokens=sheetTokenize(src);let i=0;const peek=()=>tokens[i];const eatOp=v=>{const t=tokens[i];if(!t||t.t!=='op'||t.v!==v)throw Error('#SYNTAX!');i++};
function skipArg(){let depth=0;while(i<tokens.length){const t=tokens[i];if(t.t==='op'){if(t.v==='('){depth++;i++;continue}if(t.v===')'){if(!depth)return;depth--;i++;continue}if(t.v===','&&!depth)return}i++}}
function parsePrimary(){const t=peek();if(!t)throw Error('#SYNTAX!');if(t.t==='num'){i++;return t.v}if(t.t==='str'){i++;return t.v}if(t.t==='err'){i++;throw Error(t.v)}if(t.t==='ref'){i++;return sheetEvalCell(t.r,t.c,stack)}if(t.t==='op'&&t.v==='('){i++;const v=parseExpr();eatOp(')');return v}if(t.t==='name'){i++;const upper=t.v.toUpperCase();if(peek()&&peek().t==='op'&&peek().v==='('){i++;if(upper==='IF'){const cond=parseExpr();eatOp(',');let result;const hasTrue=!(peek()&&peek().t==='op'&&peek().v===',');if(sheetTruthy(cond)){result=hasTrue?parseExpr():true;if(peek()&&peek().t==='op'&&peek().v===','){i++;skipArg()}}else{if(hasTrue)skipArg();if(peek()&&peek().t==='op'&&peek().v===','){i++;result=parseExpr()}else result=false}eatOp(')');return result}const args=[];if(!(peek()&&peek().t==='op'&&peek().v===')')){for(;;){const initially=peek(),isRange=initially&&initially.t==='ref'&&tokens[i+1]&&tokens[i+1].t==='op'&&tokens[i+1].v===':'&&tokens[i+2]&&tokens[i+2].t==='ref';if(isRange){const a=tokens[i],b=tokens[i+2];i+=3;const r1=Math.min(a.r,b.r),r2=Math.max(a.r,b.r),c1=Math.min(a.c,b.c),c2=Math.max(a.c,b.c),vals=[];if((r2-r1+1)*(c2-c1+1)>20000)throw Error('#RANGE!');for(let rr=r1;rr<=r2;rr++)for(let cc=c1;cc<=c2;cc++)vals.push(sheetEvalCell(rr,cc,stack));args.push(vals)}else args.push(parseExpr());if(peek()&&peek().t==='op'&&peek().v===','){i++;continue}break}}eatOp(')');return sheetCallFunction(upper,args,stack)}if(upper==='TRUE')return true;if(upper==='FALSE')return false;return sheetEvalVar(t.v,stack)}throw Error('#SYNTAX!')}
function parsePostfix(){let v=parsePrimary();while(peek()&&peek().t==='op'&&peek().v==='%'){i++;v=sheetNumber(v)/100}return v}
function parseUnary(){const t=peek();if(t&&t.t==='op'&&(t.v==='+'||t.v==='-')){i++;const v=parseUnary();return t.v==='-'?-sheetNumber(v):sheetNumber(v)}return parsePostfix()}
function parsePower(){let v=parseUnary();if(peek()&&peek().t==='op'&&peek().v==='^'){i++;v=Math.pow(sheetNumber(v),sheetNumber(parsePower()))}return v}
function parseMul(){let v=parsePower();while(peek()&&peek().t==='op'&&(peek().v==='*'||peek().v==='/')){const op=tokens[i++].v,r=parsePower();if(op==='/'){const d=sheetNumber(r);if(!d)throw Error('#DIV/0!');v=sheetNumber(v)/d}else v=sheetNumber(v)*sheetNumber(r)}return v}
function parseAdd(){let v=parseMul();while(peek()&&peek().t==='op'&&(peek().v==='+'||peek().v==='-')){const op=tokens[i++].v,r=parseMul();v=op==='+'?sheetNumber(v)+sheetNumber(r):sheetNumber(v)-sheetNumber(r)}return v}
function parseConcat(){let v=parseAdd();while(peek()&&peek().t==='op'&&peek().v==='&'){i++;v=sheetText(v)+sheetText(parseAdd())}return v}
function parseCompare(){let v=parseConcat();while(peek()&&peek().t==='op'&&['=','<>','<','<=','>','>='].includes(peek().v)){const op=tokens[i++].v;v=sheetCompare(v,parseConcat(),op)}return v}
function parseExpr(){return parseCompare()}
if(!tokens.length)throw Error('#SYNTAX!');const value=parseExpr();if(i<tokens.length)throw Error('#SYNTAX!');return value}
function sheetEvalVar(name,stack){const key=Object.keys(sheet.vars).find(k=>k.toLowerCase()===String(name).toLowerCase());if(!key)throw Error('#NAME?');const cache=sheet._varCache||(sheet._varCache=new Map()),ck=key.toLowerCase();if(cache.has(ck))return cache.get(ck);const id='var:'+ck;if(stack.has(id))throw Error('#CYCLE!');const next=new Set(stack);next.add(id);const raw=String(sheet.vars[key]??''),val=raw.trim().startsWith('=')?sheetParseFormula(raw.trim().slice(1),next):sheetCoerce(raw);cache.set(ck,val);return val}
function sheetEvalCell(r,c,stack){if(r<0||c<0||r>=SHEET_MAX_ROWS||c>=SHEET_MAX_COLS)throw Error('#REF!');const key=sheetKey(r,c),cache=sheet._cache||(sheet._cache=new Map());if(cache.has(key))return cache.get(key);const cell=sheet.cells[key];if(!cell||cell.v===''||cell.v==null){cache.set(key,'');return ''}const raw=String(cell.v);if(raw[0]!=='='){const val=sheetCoerce(raw);cache.set(key,val);return val}const id='cell:'+r+':'+c;if(stack.has(id))throw Error('#CYCLE!');const next=new Set(stack);next.add(id);const val=sheetParseFormula(raw.slice(1),next);cache.set(key,val);return val}
function sheetFormatValue(v,style){const fmt=style&&style.fmt||'auto';if(v===''||v==null)return {text:'',type:'empty',error:false};if(typeof v==='boolean')return {text:v?'TRUE':'FALSE',type:'text',error:false};if(typeof v==='number'){if(!Number.isFinite(v))return {text:'#NUM!',type:'error',error:true};let text;if(fmt==='currency')text='Rp '+v.toLocaleString('id-ID',{maximumFractionDigits:0});else if(fmt==='percent')text=(v*100).toLocaleString('id-ID',{maximumFractionDigits:1})+'%';else if(fmt==='number')text=v.toLocaleString('id-ID',{maximumFractionDigits:2});else if(fmt==='text')text=String(v);else text=Number.isInteger(v)?String(v):String(Math.round(v*1e6)/1e6);return {text,type:'number',error:false}}return {text:String(v),type:'text',error:false}}
function sheetDisplay(r,c){const key=sheetKey(r,c),cache=sheet._display||(sheet._display=new Map());if(cache.has(key))return cache.get(key);const cell=sheet.cells[key],style=cell&&cell.s||{};let out={text:'',type:'empty',error:false};if(cell&&cell.v!==''&&cell.v!=null){try{out=sheetFormatValue(sheetEvalCell(r,c,new Set()),style)}catch(e){out={text:sheetErrText(e),type:'error',error:true}}}cache.set(key,out);return out}
function sheetSnapshot(){return JSON.stringify({cells:sheet.cells,vars:sheet.vars,cols:sheet.cols,rows:sheet.rows,merges:sheet.merges||[],colW:sheet.colW||{},rowH:sheet.rowH||{}})}
function sheetRestore(snap){const data=JSON.parse(snap);sheet.cells=data.cells;sheet.vars=data.vars;sheet.cols=data.cols;sheet.rows=data.rows;sheet.merges=data.merges||[];sheet.colW=data.colW||{};sheet.rowH=data.rowH||{};sheet.sel={r:Math.min(sheet.sel.r,sheet.rows-1),c:Math.min(sheet.sel.c,sheet.cols-1)};sheet.anchor={...sheet.sel};sheet.editing=null;sheetMarkDirty();sheetRefresh();renderSheetVars()}
function sheetPushHistory(){sheet.history.push(sheetSnapshot());if(sheet.history.length>80)sheet.history.shift();sheet.future=[]}
function sheetUndo(){if(!sheet.history.length)return;sheet.future.push(sheetSnapshot());sheetRestore(sheet.history.pop())}
function sheetRedo(){if(!sheet.future.length)return;sheet.history.push(sheetSnapshot());sheetRestore(sheet.future.pop())}
function sheetMarkDirty(){sheet.exported=false;const dirty=document.getElementById('sheetDirty');if(dirty)dirty.hidden=false;const st=document.getElementById('sheetStatus');if(st)st.classList.remove('show');const err=document.getElementById('sheetError');if(err)err.classList.remove('show')}
function sheetUpdateDirty(){const dirty=document.getElementById('sheetDirty');if(dirty)dirty.hidden=!!sheet.exported}
function sheetNormRange(){return {r1:Math.min(sheet.anchor.r,sheet.sel.r),r2:Math.max(sheet.anchor.r,sheet.sel.r),c1:Math.min(sheet.anchor.c,sheet.sel.c),c2:Math.max(sheet.anchor.c,sheet.sel.c)}}
function sheetIsSelected(r,c){const g=sheetNormRange();return r>=g.r1&&r<=g.r2&&c>=g.c1&&c<=g.c2}
function sheetCellNode(r,c){return document.querySelector(`#sheetGrid .sheet-cell[data-r="${r}"][data-c="${c}"]`)}
function sheetColWidth(c){const w=Number(sheet.colW&&sheet.colW[c]);return Number.isFinite(w)&&w>0?w:SHEET_DEFAULT_COL_W}
function sheetRowHeight(r){const h=Number(sheet.rowH&&sheet.rowH[r]);return Number.isFinite(h)&&h>0?h:SHEET_DEFAULT_ROW_H}
function sheetSelectionCornerNode(){const g=sheetNormRange();for(let r=g.r2;r>=g.r1;r--)for(let c=g.c2;c>=g.c1;c--){const n=sheetCellNode(r,c);if(n)return n}return null}
function sheetPositionFillHandle(){const host=document.getElementById('sheetGrid'),handle=document.getElementById('sheetFillHandle');if(!host||!handle)return;if(sheet.editing){handle.hidden=true;return}const node=sheetSelectionCornerNode();if(!node){handle.hidden=true;return}const hr=host.getBoundingClientRect(),nr=node.getBoundingClientRect();handle.hidden=false;handle.style.left=(nr.right-hr.left)+'px';handle.style.top=(nr.bottom-hr.top)+'px'}
function sheetBorderShadow(style){const b=style&&style.bd;if(!b)return'';const parts=[];if(b.t)parts.push('inset 0 1.5px 0 0 #8d7c51');if(b.r)parts.push('inset -1.5px 0 0 0 #8d7c51');if(b.b)parts.push('inset 0 -1.5px 0 0 #8d7c51');if(b.l)parts.push('inset 1.5px 0 0 0 #8d7c51');return parts.join(',')}
function renderSheetGrid(){
  const host=document.getElementById('sheetGrid');if(!host)return;
  sheet._cache=new Map();sheet._varCache=new Map();sheet._display=new Map();
  const rows=sheet.rows,cols=sheet.cols;
  const merges=(sheet.merges||[]).map(m=>({r1:Math.max(0,Math.min(m.r1,rows-1)),c1:Math.max(0,Math.min(m.c1,cols-1)),r2:Math.min(m.r2,rows-1),c2:Math.min(m.c2,cols-1)})).filter(m=>m.r2>=m.r1&&m.c2>=m.c1&&(m.r2>m.r1||m.c2>m.c1));
  const anchorMap=new Map(),covered=new Set();
  for(const m of merges){anchorMap.set(m.r1+':'+m.c1,m);for(let r=m.r1;r<=m.r2;r++)for(let c=m.c1;c<=m.c2;c++)if(r!==m.r1||c!==m.c1)covered.add(r+':'+c)}
  let html='<table class="sheet-table" role="grid" aria-label="Spreadsheet PDF Sheet"><colgroup><col class="sheet-rowcol" style="width:44px">';
  for(let c=0;c<cols;c++)html+=`<col data-colcol="${c}" style="width:${sheetColWidth(c)}px">`;
  html+='</colgroup><thead><tr role="row"><th class="sheet-corner" role="columnheader" aria-label="Pilih semua sel"></th>';
  for(let c=0;c<cols;c++)html+=`<th class="sheet-colhead" role="columnheader" data-col="${c}" scope="col" aria-label="Kolom ${sheetColName(c)}">${sheetColName(c)}<span class="sheet-resize-grip sheet-col-grip" data-colgrip="${c}" title="Tarik untuk ubah lebar, klik ganda untuk auto-fit" aria-hidden="true"></span></th>`;
  html+='</tr></thead><tbody>';
  for(let r=0;r<rows;r++){
    html+=`<tr role="row" data-rowtr="${r}" style="height:${sheetRowHeight(r)}px"><th class="sheet-rowhead" role="rowheader" data-row="${r}" scope="row" aria-label="Baris ${r+1}">${r+1}<span class="sheet-resize-grip sheet-row-grip" data-rowgrip="${r}" title="Tarik untuk ubah tinggi, klik ganda untuk auto-fit" aria-hidden="true"></span></th>`;
    for(let c=0;c<cols;c++){
      if(covered.has(r+':'+c))continue;
      const key=sheetKey(r,c),cell=sheet.cells[key],style=cell&&cell.s||{},view=sheetDisplay(r,c),m=anchorMap.get(r+':'+c);
      const align=style.align||(view.type==='number'?'right':'left'),sel=sheetIsSelected(r,c),active=sheet.sel.r===r&&sheet.sel.c===c;
      const spanRows=m?m.r2-m.r1+1:1,spanCols=m?m.c2-m.c1+1:1;
      let st=`text-align:${align};`;
      if(style.color)st+=`color:${style.color};`;
      if(style.bg)st+=`background:${style.bg};`;
      if(style.b)st+='font-weight:700;';
      if(style.i)st+='font-style:italic;';
      if(style.fs)st+=`font-size:${Math.round(style.fs*1.35*10)/10}px;`;
      if(style.f)st+=`font-family:${sheetFontCss(style.f)};`;
      if(style.wrap)st+='white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;text-overflow:clip;';
      if(m)st+='vertical-align:middle;';
      const shadow=sheetBorderShadow(style);if(shadow)st+=`box-shadow:${shadow};`;
      const text=escapeHTML(view.text).replace(/\n/g,'<br>');
      const label=escapeHTML(key)+(view.text?': '+escapeHTML(view.text):'')+(m?' (gabungan)':'');
      const spanAttr=(spanRows>1?` rowspan="${spanRows}"`:'')+(spanCols>1?` colspan="${spanCols}"`:'');
      html+=`<td class="sheet-cell${sel?' sel':''}${active?' active':''}${view.error?' err':''}${m?' merged':''}" role="gridcell" aria-selected="${sel?'true':'false'}" data-r="${r}" data-c="${c}" tabindex="${active?0:-1}" style="${st}" aria-label="${label}"${spanAttr}>${text}</td>`;
    }
    html+='</tr>';
  }
  html+='</tbody></table>';host.innerHTML=html;
  const handle=document.createElement('div');handle.id='sheetFillHandle';handle.className='sheet-fill-handle';handle.title='Tarik untuk mengisi sel lain atau menyalin rumus';handle.setAttribute('aria-hidden','true');host.appendChild(handle);
  sheetUpdateSelectionUI();sheetPositionFillHandle();
}
function sheetOffsetRefs(raw,dr,dc){if(typeof raw!=='string'||raw[0]!=='=')return raw;return raw.replace(/(?<![A-Za-z0-9_])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_])/g,(full,dcol,col,drow,row)=>{let cn=sheetColIndex(col),rn=+row-1;if(!dcol)cn+=dc;if(!drow)rn+=dr;if(cn<0||rn<0)return '#REF!';return dcol+sheetColName(cn)+drow+(rn+1)})}
function sheetMeasureCtx(){if(!sheet._measure){const canvas=document.createElement('canvas');sheet._measure=canvas.getContext('2d')}return sheet._measure}
function sheetFontSpec(style,px){const f=style&&style.f,custom=f&&String(f).startsWith('custom:')?sheetCustomFonts.find(x=>x.id===f):null,css=custom?`'${custom.family}',sans-serif`:(SHEET_FONTS[f]||SHEET_FONTS.sans).css;return `${style&&style.i?'italic ':''}${style&&style.b?700:400} ${px}px ${css}`}
function sheetMeasureText(text,font){const ctx=sheetMeasureCtx();if(!ctx)return String(text).length*7;ctx.font=font;return ctx.measureText(String(text)).width}
function sheetWrappedLineCount(text,font,width){const ctx=sheetMeasureCtx();if(!ctx)return 1;ctx.font=font;let lines=0;for(const para of String(text).split(/\n/)){const words=para.split(/\s+/).filter(Boolean);if(!words.length){lines++;continue}let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width<=width||!line)line=test;else{lines++;line=word}}lines++}return Math.max(1,lines)}
function sheetApplyColWidth(c,w){const value=Math.max(SHEET_MIN_COL_W,Math.min(SHEET_MAX_COL_W,Math.round(w)));sheet.colW[c]=value;const col=document.querySelector(`#sheetGrid col[data-colcol="${c}"]`);if(col)col.style.width=value+'px';return value}
function sheetApplyRowHeight(r,h){const value=Math.max(SHEET_MIN_ROW_H,Math.min(SHEET_MAX_ROW_H,Math.round(h)));sheet.rowH[r]=value;const tr=document.querySelector(`#sheetGrid tr[data-rowtr="${r}"]`);if(tr)tr.style.height=value+'px';return value}
function sheetAutoFitCol(c){const merges=(sheet.merges||[]).map(m=>({r1:Math.max(0,Math.min(m.r1,sheet.rows-1)),c1:Math.max(0,Math.min(m.c1,sheet.cols-1)),r2:Math.min(m.r2,sheet.rows-1),c2:Math.min(m.c2,sheet.cols-1)}));const covered=new Set();for(const m of merges)for(let r=m.r1;r<=m.r2;r++)for(let cc=m.c1;cc<=m.c2;cc++)if(r!==m.r1||cc!==m.c1)covered.add(r+':'+cc);let w=SHEET_MIN_COL_W;const head=sheetMeasureText(sheetColName(c),'700 10px DM Sans, sans-serif')+26;w=Math.max(w,head);for(let r=0;r<sheet.rows;r++){if(covered.has(r+':'+c))continue;const view=sheetDisplay(r,c);if(!view||!view.text)continue;const style=(sheet.cells[sheetKey(r,c)]||{}).s||{},px=Math.round((style.fs||9)*1.35*10)/10,font=sheetFontSpec(style,px);if(style.wrap){for(const word of String(view.text).split(/\s+/))w=Math.max(w,sheetMeasureText(word,font)+18)}else{for(const line of String(view.text).split(/\n/))w=Math.max(w,sheetMeasureText(line,font)+18)}}sheetPushHistory();sheetApplyColWidth(c,Math.min(SHEET_MAX_COL_W,w));sheetRefresh();showToast(`Lebar kolom ${sheetColName(c)} disesuaikan.`)}
function sheetAutoFitRow(r){let h=SHEET_MIN_ROW_H;for(let c=0;c<sheet.cols;c++){const view=sheetDisplay(r,c);const style=(sheet.cells[sheetKey(r,c)]||{}).s||{},px=Math.round((style.fs||9)*1.35*10)/10;if(!view||!view.text){h=Math.max(h,Math.ceil(px*1.4)+10);continue}if(style.wrap){const lines=sheetWrappedLineCount(view.text,sheetFontSpec(style,px),Math.max(24,sheetColWidth(c)-14));h=Math.max(h,Math.ceil(lines*px*1.4)+10)}else h=Math.max(h,Math.ceil(px*1.4)+10)}sheetPushHistory();sheetApplyRowHeight(r,Math.min(SHEET_MAX_ROW_H,h));sheetRefresh();showToast(`Tinggi baris ${r+1} disesuaikan.`)}
function sheetFocusActive(){const td=sheetCellNode(sheet.sel.r,sheet.sel.c);if(!td)return;document.querySelectorAll('#sheetGrid .sheet-cell[tabindex="0"]').forEach(el=>el.tabIndex=-1);td.tabIndex=0;td.focus({preventScroll:true});try{td.scrollIntoView({block:'nearest',inline:'nearest'})}catch{}}
function sheetSyncFormula(force){const f=document.getElementById('sheetFormula');if(f&&(force||document.activeElement!==f)){f.value=sheetRaw(sheet.sel.r,sheet.sel.c);sheetFormulaCaret=null}sheetUpdateToolbarState()}
function sheetUpdateSelectionUI(){const g=sheetNormRange();document.querySelectorAll('#sheetGrid .sheet-cell').forEach(td=>{const r=+td.dataset.r,c=+td.dataset.c,sel=r>=g.r1&&r<=g.r2&&c>=g.c1&&c<=g.c2,active=sheet.sel.r===r&&sheet.sel.c===c;td.classList.toggle('sel',sel);td.classList.toggle('active',active);td.setAttribute('aria-selected',sel?'true':'false');td.tabIndex=active?0:-1});const ref=document.getElementById('sheetCellRef'),info=document.getElementById('sheetSelection');const single=sheet.sel.r===sheet.anchor.r&&sheet.sel.c===sheet.anchor.c;const label=single?sheetKey(sheet.sel.r,sheet.sel.c):`${sheetKey(g.r1,g.c1)}:${sheetKey(g.r2,g.c2)}`;if(ref)ref.textContent=label;if(info)info.textContent=single?label:`${label} · ${(g.r2-g.r1+1)*(g.c2-g.c1+1)} sel`;sheetSyncFormula(false);sheetUpdateToolbarState();sheetPositionFillHandle()}
function sheetUpdateToolbarState(){const activeCell=sheet.cells[sheetKey(sheet.sel.r,sheet.sel.c)],style=activeCell&&activeCell.s||{};const undoBtn=document.querySelector('#sheetTools [data-sact="undo"]'),redoBtn=document.querySelector('#sheetTools [data-sact="redo"]');if(undoBtn)undoBtn.disabled=!sheet.history.length;if(redoBtn)redoBtn.disabled=!sheet.future.length;const g=sheetNormRange(),merged=!!sheetMergeAt(sheet.sel.r,sheet.sel.c)||(sheet.merges||[]).some(m=>!(m.r2<g.r1||m.r1>g.r2||m.c2<g.c1||m.c1>g.c2));document.querySelectorAll('#sheetTools [data-sact]').forEach(b=>{const a=b.dataset.sact;let pressed=false;if(a==='bold'){pressed=!!style.b;b.classList.toggle('active',pressed)}else if(a==='italic'){pressed=!!style.i;b.classList.toggle('active',pressed)}else if(a==='align-left')b.classList.toggle('active',style.align==='left');else if(a==='align-center')b.classList.toggle('active',style.align==='center');else if(a==='align-right')b.classList.toggle('active',style.align==='right');else if(a==='wrap'){pressed=!!style.wrap;b.classList.toggle('active',pressed)}else if(a==='merge'){pressed=merged;b.classList.toggle('active',merged);b.title=merged?'Pisahkan sel gabungan':'Gabung & tengahkan sel';b.setAttribute('aria-label',merged?'Pisahkan sel gabungan':'Gabung dan tengahkan sel')}if(['bold','italic','wrap','merge'].includes(a))b.setAttribute('aria-pressed',String(pressed))});const tc=document.getElementById('sheetTextColor'),fc=document.getElementById('sheetFillColor');if(tc){tc.value=style.color||'#3a3019';tc.closest('.sheet-color').style.setProperty('--swatch',tc.value)}if(fc){fc.value=style.bg||'#fbf1d8';fc.closest('.sheet-color').style.setProperty('--swatch',fc.value)}const fontSel=document.getElementById('sheetFont');if(fontSel){const f=style.f||'sans';fontSel.value=[...fontSel.options].some(o=>o.value===f)?f:'sans'}const sizeSel=document.getElementById('sheetFontSize');if(sizeSel){const v=String(style.fs||9);sizeSel.value=[...sizeSel.options].some(o=>o.value===v)?v:'9'}}
function sheetMergeAt(r,c){return (sheet.merges||[]).find(m=>r>=m.r1&&r<=m.r2&&c>=m.c1&&c<=m.c2)||null}
function sheetSelect(r,c,extend){r=Math.max(0,Math.min(sheet.rows-1,r));c=Math.max(0,Math.min(sheet.cols-1,c));const m=sheetMergeAt(r,c);if(m&&!extend){r=m.r1;c=m.c1}if(!extend)sheet.anchor={r,c};sheet.sel={r,c};sheetUpdateSelectionUI()}
function sheetMove(dr,dc,extend){sheetSelect(sheet.sel.r+dr,sheet.sel.c+dc,extend)}
function sheetRefresh(){sheetMarkDirty();renderSheetGrid();sheetUpdateMeta()}
function sheetUpdateMeta(){const meta=document.getElementById('sheetMeta');if(meta)meta.textContent=`${sheet.cols} kolom × ${sheet.rows} baris`}
function sheetSetValue(r,c,value,history=true){const key=sheetKey(r,c),existing=sheet.cells[key],old=existing?String(existing.v??''):'';if(old===value)return false;if(history)sheetPushHistory();const cell=existing||{v:'',s:{}};cell.v=value;if(value===''&&(!cell.s||!Object.keys(cell.s).length))delete sheet.cells[key];else sheet.cells[key]=cell;sheetRefresh();return true}
function sheetBeginEdit(r,c,initial){if(sheet.editing)sheetCommitEdit();const td=sheetCellNode(r,c);if(!td)return;const cell=sheet.cells[sheetKey(r,c)];sheet.editing={r,c};sheet.editOriginal=cell?String(cell.v??''):'';td.classList.add('editing');td.setAttribute('contenteditable','true');td.textContent=initial!==undefined?initial:sheet.editOriginal;td.focus({preventScroll:true});try{const range=document.createRange();range.selectNodeContents(td);range.collapse(false);const s=window.getSelection();s.removeAllRanges();s.addRange(range)}catch{}sheetSyncFormula(true);sheetPositionFillHandle()}
function sheetCommitEdit(move,restoreFocus=true){if(!sheet.editing)return;const {r,c}=sheet.editing,td=sheetCellNode(r,c);const value=td?td.innerText.replace(/\u00a0/g,' ').replace(/\n$/,''):'';const original=sheet.editOriginal;sheet.editing=null;sheet.editOriginal='';if(td){td.removeAttribute('contenteditable');td.classList.remove('editing')}if(value!==original)sheetSetValue(r,c,value,true);else{sheetRefresh()}if(move==='down')sheetMove(1,0,false);else if(move==='up')sheetMove(-1,0,false);else if(move==='right')sheetMove(0,1,false);else if(move==='left')sheetMove(0,-1,false);if(restoreFocus)sheetFocusActive()}
function sheetCancelEdit(){if(!sheet.editing)return;sheet.editing=null;sheet.editOriginal='';sheetRefresh();sheetFocusActive()}
function sheetApplyFormula(){if(sheet.editing)sheetCommitEdit();const f=document.getElementById('sheetFormula');if(!f)return;sheetSetValue(sheet.sel.r,sheet.sel.c,f.value,true);toggleSheetFormulaMenu(false);sheetFocusActive()}
function sheetApplyRangeStyle(mutator){const g=sheetNormRange();sheetPushHistory();for(let r=g.r1;r<=g.r2;r++)for(let c=g.c1;c<=g.c2;c++){const key=sheetKey(r,c);let cell=sheet.cells[key];if(!cell){cell={v:'',s:{}}}cell.s=cell.s||{};mutator(cell.s,{r,c,r1:g.r1,r2:g.r2,c1:g.c1,c2:g.c2});if((cell.v===''||cell.v==null)&&!Object.keys(cell.s).length)delete sheet.cells[key];else sheet.cells[key]=cell}sheetRefresh()}
function sheetToggleStyle(prop){if(sheet.editing)sheetCommitEdit();const style=sheet.cells[sheetKey(sheet.sel.r,sheet.sel.c)]&&sheet.cells[sheetKey(sheet.sel.r,sheet.sel.c)].s||{};const next=!style[prop];sheetApplyRangeStyle(s=>{if(next)s[prop]=1;else delete s[prop]})}
function sheetAlign(mode){if(sheet.editing)sheetCommitEdit();sheetApplyRangeStyle(s=>{if(mode==='left')delete s.align;else s.align=mode})}
function sheetClearRange(){if(sheet.editing)sheetCommitEdit();const g=sheetNormRange();sheetPushHistory();for(let r=g.r1;r<=g.r2;r++)for(let c=g.c1;c<=g.c2;c++)delete sheet.cells[sheetKey(r,c)];sheetRefresh();sheetFocusActive()}
function sheetShiftRefs(raw,kind,index,delta){if(!raw.startsWith('='))return raw;return raw.replace(/(?<![A-Za-z0-9_])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_])/g,(full,dcol,col,drow,row)=>{if(kind==='row'){const rn=+row;if(delta<0&&rn===index)return '#REF!';return dcol+col+drow+(rn>=index?rn+delta:rn)}const cn=sheetColIndex(col)+1;if(delta<0&&cn===index)return '#REF!';return dcol+sheetColName(cn>=index?cn+delta-1:cn-1)+drow+row})}
function sheetInsertRow(){if(sheet.editing)sheetCommitEdit();if(sheet.rows>=SHEET_MAX_ROWS){showToast(`Batas ${SHEET_MAX_ROWS} baris tercapai.`);return}sheetPushHistory();const at=sheet.sel.r+1,next={};for(const [key,cell] of Object.entries(sheet.cells)){const p=sheetParseKey(key);if(!p)continue;const nr=p.r>=at?p.r+1:p.r,copy=JSON.parse(JSON.stringify(cell));if(typeof copy.v==='string')copy.v=sheetShiftRefs(copy.v,'row',at+1,1);next[sheetKey(nr,p.c)]=copy}sheet.cells=next;if(sheet.rows<SHEET_MAX_ROWS)sheet.rows++;for(const name of Object.keys(sheet.vars))sheet.vars[name]=sheetShiftRefs(String(sheet.vars[name]),'row',at+1,1);sheet.sel={r:Math.min(at,sheet.rows-1),c:sheet.sel.c};sheet.anchor={...sheet.sel};sheetShiftMerges('row',at,1);sheetShiftSizes('row',at,1);sheetRefresh();sheetFocusActive()}
function sheetInsertCol(){if(sheet.editing)sheetCommitEdit();if(sheet.cols>=SHEET_MAX_COLS){showToast(`Batas ${SHEET_MAX_COLS} kolom tercapai.`);return}sheetPushHistory();const at=sheet.sel.c+1,next={};for(const [key,cell] of Object.entries(sheet.cells)){const p=sheetParseKey(key);if(!p)continue;const nc=p.c>=at?p.c+1:p.c,copy=JSON.parse(JSON.stringify(cell));if(typeof copy.v==='string')copy.v=sheetShiftRefs(copy.v,'col',at+1,1);next[sheetKey(p.r,nc)]=copy}sheet.cells=next;if(sheet.cols<SHEET_MAX_COLS)sheet.cols++;for(const name of Object.keys(sheet.vars))sheet.vars[name]=sheetShiftRefs(String(sheet.vars[name]),'col',at+1,1);sheet.sel={r:sheet.sel.r,c:Math.min(at,sheet.cols-1)};sheet.anchor={...sheet.sel};sheetShiftMerges('col',at,1);sheetShiftSizes('col',at,1);sheetRefresh();sheetFocusActive()}
function sheetDeleteRow(){if(sheet.editing)sheetCommitEdit();if(sheet.rows<=1)return;sheetPushHistory();const at=sheet.sel.r,next={};for(const [key,cell] of Object.entries(sheet.cells)){const p=sheetParseKey(key);if(!p||p.r===at)continue;const nr=p.r>at?p.r-1:p.r,copy=JSON.parse(JSON.stringify(cell));if(typeof copy.v==='string')copy.v=sheetShiftRefs(copy.v,'row',at+1,-1);next[sheetKey(nr,p.c)]=copy}sheet.cells=next;sheet.rows--;for(const name of Object.keys(sheet.vars))sheet.vars[name]=sheetShiftRefs(String(sheet.vars[name]),'row',at+1,-1);sheet.sel={r:Math.min(at,sheet.rows-1),c:sheet.sel.c};sheet.anchor={...sheet.sel};sheetShiftMerges('row',at,-1);sheetShiftSizes('row',at,-1);sheetRefresh();sheetFocusActive()}
function sheetDeleteCol(){if(sheet.editing)sheetCommitEdit();if(sheet.cols<=1)return;sheetPushHistory();const at=sheet.sel.c,next={};for(const [key,cell] of Object.entries(sheet.cells)){const p=sheetParseKey(key);if(!p||p.c===at)continue;const nc=p.c>at?p.c-1:p.c,copy=JSON.parse(JSON.stringify(cell));if(typeof copy.v==='string')copy.v=sheetShiftRefs(copy.v,'col',at+1,-1);next[sheetKey(p.r,nc)]=copy}sheet.cells=next;sheet.cols--;for(const name of Object.keys(sheet.vars))sheet.vars[name]=sheetShiftRefs(String(sheet.vars[name]),'col',at+1,-1);sheet.sel={r:sheet.sel.r,c:Math.min(at,sheet.cols-1)};sheet.anchor={...sheet.sel};sheetShiftMerges('col',at,-1);sheetShiftSizes('col',at,-1);sheetRefresh();sheetFocusActive()}
function sheetRangeTSV(){const g=sheetNormRange(),rows=[];for(let r=g.r1;r<=g.r2;r++){const cols=[];for(let c=g.c1;c<=g.c2;c++)cols.push(sheetDisplay(r,c).text.replace(/\t/g,' ').replace(/\n/g,' '));rows.push(cols.join('\t'))}return rows.join('\n')}
function sheetPasteTSV(text){if(!text)return;sheetPushHistory();const lines=String(text).replace(/\r/g,'').split('\n');if(lines.length&&lines[lines.length-1]==='')lines.pop();const start=sheet.sel;const needRows=start.r+lines.length,needCols=start.c+Math.max(...lines.map(line=>line.split('\t').length));if(needRows>sheet.rows)sheet.rows=Math.min(SHEET_MAX_ROWS,needRows);if(needCols>sheet.cols)sheet.cols=Math.min(SHEET_MAX_COLS,needCols);lines.forEach((line,ri)=>line.split('\t').forEach((value,ci)=>{const r=start.r+ri,c=start.c+ci;if(r>=sheet.rows||c>=sheet.cols)return;const key=sheetKey(r,c);if(value===''){if(sheet.cells[key]&&(!sheet.cells[key].s||!Object.keys(sheet.cells[key].s).length))delete sheet.cells[key];else if(sheet.cells[key])sheet.cells[key].v=''}else{const cell=sheet.cells[key]||(sheet.cells[key]={v:'',s:{}});cell.v=value}}));sheetRefresh();sheetFocusActive()}
function sheetShowVarError(msg){const el=document.getElementById('sheetVarError');if(!el)return;el.textContent=msg||'';el.classList.toggle('show',!!msg)}
function renderSheetVars(){const list=document.getElementById('sheetVarList');if(!list)return;const entries=Object.entries(sheet.vars);if(!entries.length){list.innerHTML='<p class="sheet-var-empty">Belum ada variabel. Tambahkan nama dan nilai di atas, lalu pakai di rumus.</p>';return}list.innerHTML=entries.map(([name,value])=>`<div class="sheet-var-row" data-var="${escapeHTML(name)}"><code>${escapeHTML(name)}</code><input class="sheet-var-value" type="text" value="${escapeHTML(value)}" data-varname="${escapeHTML(name)}" aria-label="Nilai variabel ${escapeHTML(name)}" autocomplete="off" spellcheck="false"><button type="button" data-vardel="${escapeHTML(name)}" aria-label="Hapus variabel ${escapeHTML(name)}">×</button></div>`).join('')}
function sheetAddVar(){const nameEl=document.getElementById('sheetVarName'),valueEl=document.getElementById('sheetVarValue');if(!nameEl||!valueEl)return;const name=nameEl.value.trim(),value=valueEl.value.trim();if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)){sheetShowVarError('Nama variabel harus diawali huruf atau garis bawah, tanpa spasi.');nameEl.focus();return}if(/^[A-Za-z]{1,3}\d+$/.test(name)||['TRUE','FALSE'].includes(name.toUpperCase())){sheetShowVarError('Nama itu mirip sel atau nilai bawaan. Gunakan nama lain, misalnya harga_satuan.');nameEl.focus();return}const existing=Object.keys(sheet.vars).find(k=>k.toLowerCase()===name.toLowerCase());if(existing&&existing!==name){sheetShowVarError('Nama variabel sudah dipakai. Pilih nama lain.');nameEl.focus();return}sheetPushHistory();if(existing)delete sheet.vars[existing];sheet.vars[name]=value===''?'0':value;nameEl.value='';valueEl.value='';sheetShowVarError('');renderSheetVars();sheetRefresh();nameEl.focus()}
function sheetUpdateVar(name,value){const key=Object.keys(sheet.vars).find(k=>k===name);if(!key)return;if(String(sheet.vars[key])===value)return;sheetPushHistory();sheet.vars[key]=value;sheetRefresh()}
function sheetDeleteVar(name){if(!(name in sheet.vars))return;sheetPushHistory();delete sheet.vars[name];renderSheetVars();sheetRefresh()}

/* --- Ekspor PDF Sheet --- */
function sheetPdfColor(hex,fallback){const m=/^#?([0-9a-f]{6})$/i.exec(String(hex||''));if(!m)return rgb(fallback[0],fallback[1],fallback[2]);const n=parseInt(m[1],16);return rgb((n>>16&255)/255,(n>>8&255)/255,(n&255)/255)}
function sheetPdfFont(style,fonts){if(style&&style.b&&style.i)return fonts.bi;if(style&&style.b)return fonts.b;if(style&&style.i)return fonts.i;return fonts.r}
function sheetPdfTruncate(text,font,size,maxWidth){if(font.widthOfTextAtSize(text,size)<=maxWidth)return text;let lo=0,hi=text.length;while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(font.widthOfTextAtSize(text.slice(0,mid)+'...',size)<=maxWidth)lo=mid;else hi=mid-1}return text.slice(0,lo)+'...'}
function sheetPdfWrap(text,font,size,maxWidth){const lines=[];for(const para of String(text).split(/\n/)){const words=para.split(/\s+/).filter(Boolean);if(!words.length){lines.push('');continue}let line='';for(const word of words){const test=line?line+' '+word:word;if(font.widthOfTextAtSize(test,size)<=maxWidth||!line)line=test;else{lines.push(sheetPdfTruncate(line,font,size,maxWidth));line=word}}lines.push(sheetPdfTruncate(line,font,size,maxWidth))}return lines.length?lines:['']}
function sheetUsedBounds(){let maxR=-1,maxC=-1;for(const [key,cell] of Object.entries(sheet.cells)){const p=sheetParseKey(key);if(!p)continue;const has=(cell.v!==''&&cell.v!=null)||(cell.s&&Object.keys(cell.s).length);if(!has)continue;maxR=Math.max(maxR,p.r);maxC=Math.max(maxC,p.c)}for(const m of (sheet.merges||[])){maxR=Math.max(maxR,m.r2);maxC=Math.max(maxC,m.c2)}return {rows:maxR+1,cols:maxC+1}}
async function exportSheetToPdf(report,options){
  const o={...SHEET_PDF_DEFAULTS,...(options||{})};
  const bounds=sheetUsedBounds();
  if(!bounds.rows||!bounds.cols)throw Error('Sheet masih kosong. Isi minimal satu sel sebelum mengekspor PDF.');
  sheet._cache=new Map();sheet._varCache=new Map();sheet._display=new Map();
  const doc=await PDFDocument.create();
  const rows=bounds.rows,cols=bounds.cols;
  const fams=new Set(['sans']);
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const st=sheet.cells[sheetKey(r,c)]&&sheet.cells[sheetKey(r,c)].s;if(st&&st.f)fams.add(st.f)}
  const getFont=await sheetEmbedFonts(doc,[...fams]);
  const margin={narrow:20,normal:32,wide:48}[o.margins]??32;
  const rowHead=o.rowNumbers?24:0,colHeadH=o.header?20:0,titleH=o.title?30:0,footerH=o.pageNumbers?14:8;
  const paper=SHEET_PAPERS[o.paper]||SHEET_PAPERS.a4;
  const merges=(sheet.merges||[]).map(m=>({r1:Math.max(0,Math.min(m.r1,rows-1)),c1:Math.max(0,Math.min(m.c1,cols-1)),r2:Math.min(m.r2,rows-1),c2:Math.min(m.c2,cols-1)})).filter(m=>m.r2>=m.r1&&m.c2>=m.c1&&(m.r2>m.r1||m.c2>m.c1));
  const covered=new Set();
  for(const m of merges)for(let r=m.r1;r<=m.r2;r++)for(let c=m.c1;c<=m.c2;c++)if(r!==m.r1||c!==m.c1)covered.add(r+':'+c);
  const mergeFor=(r,c)=>merges.find(m=>r>=m.r1&&r<=m.r2&&c>=m.c1&&c<=m.c2)||null;
  const sizeOf=st=>Math.max(4,(st&&st.fs?st.fs:9)*o.fontScale);
  const prepCell=(r,c)=>{
    const cell=sheet.cells[sheetKey(r,c)],style=cell&&cell.s||{},view=sheetDisplay(r,c),font=getFont(style),size=sizeOf(style),raw=String(view.text);
    const safe=style.f&&String(style.f).startsWith('custom:')&&sheetCustomFonts.some(f=>f.id===style.f)?stripInvisible(raw):sanitizeWinAnsi(raw);
    return {raw,safe,type:view.type,error:view.error,style,font,size};
  };
  let widths=[];
  for(let c=0;c<cols;c++){
    const stored=Number(sheet.colW&&sheet.colW[c]);
    let w=Number.isFinite(stored)&&stored>0?Math.max(24,Math.round(stored*.75)):44;
    for(let r=0;r<rows;r++){
      if(covered.has(r+':'+c))continue;
      const cell=prepCell(r,c);
      if(!cell.safe)continue;
      const capWidth=cell.style.wrap?180:190;
      w=Math.max(w,Math.min(capWidth,cell.font.widthOfTextAtSize(cell.safe,cell.size)+20));
    }
    widths.push(w);
  }
  let totalW=widths.reduce((a,b)=>a+b,0);
  const portraitUsableW=paper.w-margin*2-rowHead;
  const landscape=o.orientation==='landscape'||(o.orientation==='auto'&&totalW+rowHead>portraitUsableW*.94);
  const pageW=landscape?paper.h:paper.w,pageH=landscape?paper.w:paper.h;
  const usableW=pageW-margin*2-rowHead;
  if(totalW>usableW){widths=widths.map(w=>Math.max(24,Math.floor(w*usableW/totalW)));totalW=widths.reduce((a,b)=>a+b,0)}
  else if(o.layout==='fit'&&totalW<usableW){const extra=(usableW-totalW)/cols,cap=Math.max(220,usableW*.45);widths=widths.map(w=>Math.min(cap,w+extra));totalW=widths.reduce((a,b)=>a+b,0)}
  const layout=new Map();
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    if(covered.has(r+':'+c))continue;
    const cell=prepCell(r,c),m=mergeFor(r,c);
    const spanW=m?widths.slice(m.c1,m.c2+1).reduce((a,b)=>a+b,0):widths[c];
    const availW=Math.max(12,spanW-10);
    const lines=cell.safe?(cell.style.wrap?sheetPdfWrap(cell.safe,cell.font,cell.size,availW):[sheetPdfTruncate(cell.safe,cell.font,cell.size,availW)]):[];
    layout.set(r+':'+c,{...cell,lines,availW,spanW});
  }
  const lineFactor=1.28;
  const rowHeights=[];
  for(let r=0;r<rows;r++){const stored=Number(sheet.rowH&&sheet.rowH[r]);rowHeights.push(Number.isFinite(stored)&&stored>0?Math.max(18,Math.round(stored*.75)):Math.max(20,9*o.fontScale*1.5+7))}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const cell=layout.get(r+':'+c);if(!cell||!cell.lines.length)continue;
    const m=mergeFor(r,c);if(m&&m.r2>m.r1)continue;
    rowHeights[r]=Math.max(rowHeights[r],cell.lines.length*cell.size*lineFactor+7);
  }
  for(const m of merges){
    if(m.r2<=m.r1)continue;
    const cell=layout.get(m.r1+':'+m.c1);if(!cell||!cell.lines.length)continue;
    const need=cell.lines.length*cell.size*lineFactor+7;
    const sum=rowHeights.slice(m.r1,m.r2+1).reduce((a,b)=>a+b,0);
    if(sum<need)rowHeights[m.r2]+=need-sum;
  }
  const tableTop=pageH-margin-titleH,rowsTop=tableTop-colHeadH,avail=rowsTop-(margin+footerH);
  const groupEnd=new Map();
  for(const m of merges)if(m.r2>m.r1)groupEnd.set(m.r1,Math.max(groupEnd.get(m.r1)||m.r1,m.r2));
  const pages=[];let current=[],used=0;
  for(let r=0;r<rows;r++){
    const end=groupEnd.get(r);
    if(end!==undefined&&end>r){
      let groupH=0;for(let rr=r;rr<=end;rr++)groupH+=rowHeights[rr];
      if(groupH<=avail){
        if(current.length&&used+groupH>avail){pages.push(current);current=[];used=0}
        for(let rr=r;rr<=end;rr++){const h=Math.min(rowHeights[rr],avail-2);current.push({r:rr,h});used+=h}
        r=end;continue;
      }
    }
    const h=Math.min(rowHeights[r],avail-2);
    if(current.length&&used+h>avail){pages.push(current);current=[];used=0}
    current.push({r,h});used+=h;
  }
  if(current.length)pages.push(current);
  const gridColor=sheetPdfColor('#e7e0d0',[.91,.88,.82]),ink=rgb(.23,.19,.1),muted=rgb(.55,.5,.4),lineColor=rgb(.85,.79,.67);
  const borderAll=o.border==='all',borderRows=o.border==='all'||o.border==='horizontal';
  for(let pi=0;pi<pages.length;pi++){
    const page=doc.addPage([pageW,pageH]);
    if(o.title){
      page.drawText(sheetPdfTruncate(sanitizeWinAnsi(sheetNameValue()),getFont({b:1}),13,pageW-margin*2-110),{x:margin,y:pageH-margin-10,size:13,font:getFont({b:1}),color:ink});
      page.drawText('Paperly PDF Sheet',{x:pageW-margin-92,y:pageH-margin-9,size:7.5,font:getFont({}),color:muted});
    }
    const bandW=totalW+rowHead,borderVisible=o.border!=='none';
    if(o.header){
      if(borderVisible)page.drawRectangle({x:margin,y:tableTop-1,width:bandW,height:1,color:lineColor});
      page.drawRectangle({x:margin,y:rowsTop,width:bandW,height:colHeadH,color:sheetPdfColor('#f6f0e2',[.96,.94,.89])});
      if(rowHead){
        page.drawRectangle({x:margin,y:rowsTop,width:rowHead,height:colHeadH,color:sheetPdfColor('#f0e8d5',[.94,.91,.84])});
        page.drawText('#',{x:margin+rowHead/2-2.5,y:rowsTop+6,size:8,font:getFont({b:1}),color:rgb(.52,.46,.34)});
      }
      let hx=margin+rowHead;
      for(let c=0;c<cols;c++){
        page.drawText(sheetColName(c),{x:hx+widths[c]/2-3.5,y:rowsTop+6,size:8,font:getFont({b:1}),color:rgb(.52,.46,.34)});
        if(borderAll)page.drawLine({start:{x:hx,y:rowsTop},end:{x:hx,y:rowsTop+colHeadH},thickness:.4,color:gridColor});
        hx+=widths[c];
      }
      if(borderVisible)page.drawLine({start:{x:margin,y:rowsTop},end:{x:margin+bandW,y:rowsTop},thickness:.6,color:lineColor});
    }
    let y=rowsTop;
    for(const item of pages[pi]){
      const r=item.r,h=item.h;
      y-=h;
      if(rowHead){
        page.drawRectangle({x:margin,y,width:rowHead,height:h,color:sheetPdfColor('#faf6ec',[.98,.96,.92]),borderColor:borderAll?gridColor:undefined,borderWidth:borderAll?.5:0});
        page.drawText(String(r+1),{x:margin+rowHead/2-String(r+1).length*2.4,y:y+h/2-3,size:7.5,font:getFont({}),color:rgb(.58,.52,.4)});
      }
      let x=margin+rowHead;
      for(let c=0;c<cols;c++){
        const w=widths[c];
        if(covered.has(r+':'+c)){x+=w;continue}
        const cell=layout.get(r+':'+c),style=cell.style,m=mergeFor(r,c);
        const spanW=m?widths.slice(m.c1,m.c2+1).reduce((a,b)=>a+b,0):w;
        const spanH=m?rowHeights.slice(m.r1,m.r2+1).reduce((a,b)=>a+b,0):h;
        const boxY=y+h-spanH;
        if(style.bg)page.drawRectangle({x,y:boxY,width:spanW,height:spanH,color:sheetPdfColor(style.bg,[1,1,1])});
        if(cell.lines.length){
          const lines=cell.lines,lineH=cell.size*lineFactor,textH=lines.length*lineH;
          const align=style.align||(cell.type==='number'?'right':'left');
          const startY=boxY+(spanH-textH)/2+cell.size*.78;
          for(let li=0;li<lines.length;li++){
            const line=lines[li];if(!line)continue;
            const lw=cell.font.widthOfTextAtSize(line,cell.size);
            const tx=align==='right'?x+spanW-5-lw:align==='center'?x+(spanW-lw)/2:x+5;
            page.drawText(line,{x:tx,y:startY-li*lineH,size:cell.size,font:cell.font,color:sheetPdfColor(cell.error?'#c4616d':style.color||'#3a3019',[.23,.19,.1])});
          }
        }
        if(borderAll)page.drawRectangle({x,y:boxY,width:spanW,height:spanH,borderColor:gridColor,borderWidth:.4});
        const b=style.bd;
        if(b){
          const bc=sheetPdfColor('#8d7c51',[.55,.49,.32]);
          if(b.t)page.drawLine({start:{x,y:boxY+spanH},end:{x:x+spanW,y:boxY+spanH},thickness:1,color:bc});
          if(b.b)page.drawLine({start:{x,y:boxY},end:{x:x+spanW,y:boxY},thickness:1,color:bc});
          if(b.l)page.drawLine({start:{x,y:boxY},end:{x,y:boxY+spanH},thickness:1,color:bc});
          if(b.r)page.drawLine({start:{x:x+spanW,y:boxY},end:{x:x+spanW,y:boxY+spanH},thickness:1,color:bc});
        }
        x+=w;
      }
      const last=pages[pi][pages[pi].length-1];
      if(borderRows&&last&&r!==last.r)page.drawLine({start:{x:margin,y},end:{x:margin+bandW,y},thickness:.4,color:gridColor});
    }
    if(o.border==='outer'||o.border==='horizontal'){
      page.drawRectangle({x:margin,y,width:bandW,height:Math.max(1,tableTop-y),borderColor:lineColor,borderWidth:.8});
    }
    if(o.pageNumbers){const label=`Halaman ${pi+1} dari ${pages.length}`,footerFont=getFont({}),fw=footerFont.widthOfTextAtSize(label,7.5);const fx=o.pageNumPos==='left'?margin:o.pageNumPos==='right'?pageW-margin-fw:(pageW-fw)/2;page.drawText(label,{x:fx,y:16,size:7.5,font:footerFont,color:muted})}
    if(report)report((pi+1)/pages.length);
  }
  doc.setTitle(sheetNameValue());doc.setCreator('Paperly');doc.setProducer('Paperly');
  return doc.save({useObjectStreams:true});
}

function sheetFontCss(key){if(key&&String(key).startsWith('custom:')){const f=sheetCustomFonts.find(x=>x.id===key);return f?`'${f.family}',sans-serif`:'inherit'}return (SHEET_FONTS[key]||SHEET_FONTS.sans).css}
async function loadSheetFont(file){
  if(!/\.(ttf|otf)$/i.test(file.name)){showToast('Gunakan file font TTF atau OTF.');return}
  let bytes;try{bytes=new Uint8Array(await file.arrayBuffer())}catch{showToast('File font tidak bisa dibaca.');return}
  const family='paperly-sheet-'+Date.now().toString(36);
  try{const face=new FontFace(family,bytes.slice().buffer);await face.load();document.fonts.add(face)}catch{showToast('Font tidak bisa dimuat. Pastikan file TTF/OTF valid.');return}
  const label=file.name.replace(/\.(ttf|otf)$/i,''),id='custom:'+family;
  sheetCustomFonts.push({label,family,id,bytes});
  const sel=document.getElementById('sheetFont');
  if(sel){const opt=document.createElement('option');opt.value=id;opt.textContent=label.length>18?label.slice(0,17)+'…':label;sel.appendChild(opt);sel.value=id}
  if(sheet.editing)sheetCommitEdit();
  sheetApplyRangeStyle(s=>{s.f=id});
  showToast(`Font "${label}" diterapkan ke sel terpilih.`);
}
function sheetApplyFont(value){if(sheet.editing)sheetCommitEdit();sheetApplyRangeStyle(s=>{if(value==='sans')delete s.f;else s.f=value})}
function sheetApplyFontSize(value){const n=Number(value);if(!n)return;if(sheet.editing)sheetCommitEdit();sheetApplyRangeStyle(s=>{if(n===9)delete s.fs;else s.fs=n})}
function sheetToggleWrap(){if(sheet.editing)sheetCommitEdit();const cell=sheet.cells[sheetKey(sheet.sel.r,sheet.sel.c)],on=!!(cell&&cell.s&&cell.s.wrap);sheetApplyRangeStyle(s=>{if(on)delete s.wrap;else s.wrap=1})}
function sheetShiftMerges(kind,index,delta){const out=[];for(const m of (sheet.merges||[])){const a={...m};if(kind==='row'){if(delta>0){if(a.r1>=index)a.r1++;if(a.r2>=index)a.r2++}else{if(a.r1>index)a.r1--;if(a.r2>=index)a.r2--;if(a.r2<a.r1)continue}}else{if(delta>0){if(a.c1>=index)a.c1++;if(a.c2>=index)a.c2++}else{if(a.c1>index)a.c1--;if(a.c2>=index)a.c2--;if(a.c2<a.c1)continue}}out.push(a)}sheet.merges=out}
function sheetShiftSizes(kind,index,delta){const source=(kind==='row'?sheet.rowH:sheet.colW)||{},out={};for(const [key,value] of Object.entries(source)){const i=Number(key);if(!Number.isFinite(i))continue;let next=i;if(delta>0){if(i>=index)next=i+1}else{if(i===index)continue;if(i>index)next=i-1}out[next]=value}if(kind==='row')sheet.rowH=out;else sheet.colW=out}
function sheetMergeSelection(){
  if(sheet.editing)sheetCommitEdit();
  const g=sheetNormRange(),merges=sheet.merges||[];
  const containsSelection=merges.find(m=>!(m.r2<g.r1||m.r1>g.r2||m.c2<g.c1||m.c1>g.c2));
  const exact=merges.find(m=>m.r1===g.r1&&m.c1===g.c1&&m.r2===g.r2&&m.c2===g.c2);
  const activeMerge=sheetMergeAt(sheet.sel.r,sheet.sel.c);
  const target=exact||containsSelection||activeMerge;
  if(target){
    sheetPushHistory();
    sheet.merges=merges.filter(m=>m!==target);
    const cell=sheet.cells[sheetKey(target.r1,target.c1)];
    if(cell&&cell.s){
      if(target.prevAlign)cell.s.align=target.prevAlign;else delete cell.s.align;
      if(!Object.keys(cell.s).length&&(!cell.v||cell.v===''))delete sheet.cells[sheetKey(target.r1,target.c1)];
    }
    sheet.sel={r:target.r1,c:target.c1};sheet.anchor={...sheet.sel};
    sheetRefresh();sheetFocusActive();showToast('Sel gabungan dipisah.');return
  }
  if(g.r1===g.r2&&g.c1===g.c2){showToast('Pilih minimal dua sel untuk digabung.');return}
  sheetPushHistory();
  let value='';outer:for(let r=g.r1;r<=g.r2;r++)for(let c=g.c1;c<=g.c2;c++){const cell=sheet.cells[sheetKey(r,c)];if(cell&&cell.v!==''&&cell.v!=null){value=String(cell.v);break outer}}
  for(let r=g.r1;r<=g.r2;r++)for(let c=g.c1;c<=g.c2;c++){if(r===g.r1&&c===g.c1)continue;delete sheet.cells[sheetKey(r,c)]}
  const key=sheetKey(g.r1,g.c1),cell=sheet.cells[key]||(sheet.cells[key]={v:'',s:{}});
  cell.v=value;cell.s=cell.s||{};
  const prevAlign=cell.s.align;
  cell.s.align='center';
  sheet.merges=[...merges,{r1:g.r1,c1:g.c1,r2:g.r2,c2:g.c2,prevAlign}];
  sheet.sel={r:g.r1,c:g.c1};sheet.anchor={...sheet.sel};
  sheetRefresh();sheetFocusActive();showToast('Sel digabung dan teks ditengahkan.');
}
function sheetClearFillPreview(){document.querySelectorAll('#sheetGrid .sheet-cell.fill-into').forEach(td=>td.classList.remove('fill-into'))}
function sheetFillTarget(base,tr,tc){if(tr>=base.r1&&tr<=base.r2&&tc>=base.c1&&tc<=base.c2)return null;return {r1:Math.min(base.r1,tr),c1:Math.min(base.c1,tc),r2:Math.max(base.r2,tr),c2:Math.max(base.c2,tc)}}
function sheetPreviewFill(target,base){sheetClearFillPreview();if(!target)return;document.querySelectorAll('#sheetGrid .sheet-cell').forEach(td=>{const r=+td.dataset.r,c=+td.dataset.c;if(r<target.r1||r>target.r2||c<target.c1||c>target.c2)return;if(r>=base.r1&&r<=base.r2&&c>=base.c1&&c<=base.c2)return;td.classList.add('fill-into')})}
function sheetApplyFill(base,target){if(!target)return;const h=base.r2-base.r1+1,w=base.c2-base.c1+1;let count=0;sheetPushHistory();for(let r=target.r1;r<=target.r2;r++)for(let c=target.c1;c<=target.c2;c++){if(r>=base.r1&&r<=base.r2&&c>=base.c1&&c<=base.c2)continue;const sr=base.r1+(((r-base.r1)%h)+h)%h,sc=base.c1+(((c-base.c1)%w)+w)%w;const src=sheet.cells[sheetKey(sr,sc)],key=sheetKey(r,c);if(!src){delete sheet.cells[key];count++;continue}const copy=JSON.parse(JSON.stringify(src));if(typeof copy.v==='string'&&copy.v[0]==='=')copy.v=sheetOffsetRefs(copy.v,r-sr,c-sc);sheet.cells[key]=copy;count++}sheetFillDrag=null;sheetClearFillPreview();document.body.classList.remove('sheet-filling');sheet.anchor={r:target.r1,c:target.c1};sheet.sel={r:target.r2,c:target.c2};sheetRefresh();sheetFocusActive();if(count)showToast(`${count} sel terisi dari pola yang dipilih.`)}
function renderSheetFormulaMenu(){const host=document.getElementById('sheetFormulaList');if(!host)return;const groups={};for(const d of SHEET_FORMULA_DOCS){(groups[d.group]=groups[d.group]||[]).push(d)}host.innerHTML=Object.entries(groups).map(([g,items])=>`<div class="sheet-formula-group"><h4>${g}</h4>${items.map(d=>`<button type="button" class="sheet-formula-item" data-fn="${d.fn}"><code>=${d.fn}(${d.args})</code><span>${d.desc}</span></button>`).join('')}</div>`).join('')}
function toggleSheetFormulaMenu(open,focusFirst=true){const menu=document.getElementById('sheetFormulaMenu'),btn=document.getElementById('sheetFormulaHelp');if(!menu)return;menu.classList.toggle('open',!!open);menu.setAttribute('aria-hidden',String(!open));if(btn)btn.setAttribute('aria-expanded',String(!!open));if(open&&focusFirst){const first=menu.querySelector('[data-fn]');if(first)setTimeout(()=>first.focus(),40)}}
function insertSheetFormula(fn){const f=document.getElementById('sheetFormula');if(!f)return;const raw=f.value,isFormula=raw.startsWith('='),sel=isFormula?sheetFormulaCaret:null;let prefix=sel?raw.slice(0,sel.start):'',suffix=sel?raw.slice(sel.end):'';if(!prefix.startsWith('='))prefix='='+prefix;prefix=prefix.replace(/([A-Za-z_][A-Za-z_]*)$/,'');const addParen=!suffix.startsWith('('),insert=fn+(addParen?'(':'');f.value=prefix+insert+suffix;sheetFormulaInserting=true;try{f.focus()}finally{sheetFormulaInserting=false}const pos=addParen?(prefix+insert).length:(prefix+fn).length+1;sheetFormulaPrev=f.value;sheetFormulaCaret={start:pos,end:pos};try{f.setSelectionRange(pos,pos)}catch{}}
async function sheetEmbedFonts(doc,fams){const std=new Set(),custom=new Set();for(const f of fams){if(f&&String(f).startsWith('custom:'))custom.add(f);else std.add(SHEET_STD_FONTS[f]?f:'sans')}if(custom.size)doc.registerFontkit(await ensureFontkit());const cache=new Map();for(const fam of std){const set=SHEET_STD_FONTS[fam];for(const k of ['r','b','i','bi'])cache.set(fam+k,await doc.embedFont(set[k]))}for(const fam of custom){const rec=sheetCustomFonts.find(x=>x.id===fam);if(!rec)continue;try{const font=await doc.embedFont(rec.bytes,{subset:true});for(const k of ['r','b','i','bi'])cache.set(fam+k,font)}catch(e){console.warn('Font kustom gagal disematkan:',rec.label,e)}}return style=>{const f=style&&style.f,fam=f&&String(f).startsWith('custom:')?f:(SHEET_STD_FONTS[f]?f:'sans'),k=style&&style.b?(style.i?'bi':'b'):(style&&style.i?'i':'r');return cache.get(fam+k)||cache.get('sansr')}}
function sheetPdfReadOptions(){const val=(id,fb)=>{const el=document.getElementById(id);return el?el.value:fb};const checked=(id,fb)=>{const el=document.getElementById(id);return el?el.checked:fb};return {paper:val('sheetPaper','a4'),orientation:val('sheetOrient','auto'),layout:val('sheetLayout','fit'),border:val('sheetBorderStyle','all'),fontScale:Number(val('sheetFontScale','1'))||1,margins:val('sheetMargin','normal'),title:checked('sheetShowTitle',true),header:checked('sheetShowHeader',true),rowNumbers:checked('sheetShowRowNums',true),pageNumbers:checked('sheetShowPageNum',true),pageNumPos:val('sheetPageNumPos','center')}}
function sheetPdfFillOptions(o){const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=String(v)};set('sheetPaper',o.paper);set('sheetOrient',o.orientation);set('sheetLayout',o.layout);set('sheetBorderStyle',o.border);set('sheetFontScale',o.fontScale);set('sheetMargin',o.margins);set('sheetPageNumPos',o.pageNumPos||'center');const chk=(id,v)=>{const el=document.getElementById(id);if(el)el.checked=!!v};chk('sheetShowTitle',o.title);chk('sheetShowHeader',o.header);chk('sheetShowRowNums',o.rowNumbers);chk('sheetShowPageNum',o.pageNumbers)}
function updateSheetPreviewChrome(){const s=sheetPdfState;const label=document.getElementById('sheetPreviewPage'),prev=document.getElementById('sheetPreviewPrev'),next=document.getElementById('sheetPreviewNext'),meta=document.getElementById('sheetPreviewMeta');if(label)label.textContent=`Halaman ${s.page||1} / ${s.pages||1}`;if(prev)prev.disabled=!s.doc||s.page<=1;if(next)next.disabled=!s.doc||s.page>=s.pages;if(meta&&s.options){const p=SHEET_PAPERS[s.options.paper]||SHEET_PAPERS.a4;meta.textContent=`${p.label} · ${s.landscape?'Lanskap':'Potret'}${s.pages?` · ${s.pages} halaman`:''}`}}
function showSheetPreviewLoading(show){const el=document.getElementById('sheetPreviewLoading');if(el)el.hidden=!show;const canvas=document.getElementById('sheetPreviewCanvas');if(canvas&&show)canvas.hidden=true}
async function renderSheetPreviewPage(){const s=sheetPdfState;if(!s.doc)return;let page;try{page=await s.doc.getPage(s.page)}catch{return}if(!page)return;const base=page.getViewport({scale:1});s.landscape=base.width>base.height;const wrap=document.getElementById('sheetPreviewCanvasWrap'),canvas=document.getElementById('sheetPreviewCanvas');if(!wrap||!canvas)return;const availW=Math.max(220,wrap.clientWidth-12),availH=Math.max(180,wrap.clientHeight-12);const scale=Math.min(availW/base.width,availH/base.height,1.8);const vp=page.getViewport({scale});const dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(vp.width*dpr);canvas.height=Math.round(vp.height*dpr);canvas.style.width=Math.round(vp.width)+'px';canvas.style.height=Math.round(vp.height)+'px';const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);await page.render({canvasContext:ctx,viewport:vp,background:'#fff'}).promise;canvas.hidden=false;showSheetPreviewLoading(false);updateSheetPreviewChrome()}
async function refreshSheetPreview(){
  const s=sheetPdfState;if(!s.open)return;
  const token=++s.token;s.busy=true;
  const note=document.getElementById('sheetPreviewNote'),dl=document.getElementById('sheetPreviewDownload');
  showSheetPreviewLoading(true);if(dl)dl.disabled=true;
  if(note){note.textContent='Menyiapkan pratinjau…';note.classList.remove('error')}
  if(s.doc){try{s.doc.destroy()}catch{}s.doc=null}
  try{
    const opts=sheetPdfReadOptions();s.options=opts;
    const bytes=await exportSheetToPdf(null,opts);
    if(token!==s.token)return;
    const doc=await pdfjsLib.getDocument({data:bytes.slice()}).promise;
    if(token!==s.token){try{doc.destroy()}catch{}return}
    s.doc=doc;s.pages=doc.numPages;s.page=Math.max(1,Math.min(s.page||1,doc.numPages));s.bytes=bytes;
    updateSheetPreviewChrome();await renderSheetPreviewPage();
    if(token!==s.token)return;
    if(note)note.textContent=opts.layout==='fit'?'Tabel mengisi lebar kertas. Pratinjau mengikuti pengaturan di samping.':'Tabel memakai ukuran asli; diperkecil otomatis bila melebihi kertas.';
  }catch(e){
    if(token!==s.token)return;
    s.pages=0;s.bytes=null;showSheetPreviewLoading(false);
    if(note){note.textContent=e.message||'Pratinjau gagal dibuat.';note.classList.add('error')}
    updateSheetPreviewChrome();
  }finally{
    if(token===s.token){s.busy=false;if(dl)dl.disabled=!s.bytes}
  }
}
function scheduleSheetPreview(delay=280){clearTimeout(sheetPreviewTimer);sheetPreviewTimer=setTimeout(()=>{if(sheetPdfState.open)refreshSheetPreview()},delay)}
function openSheetPreview(){
  if(!sheetUsedBounds().rows){const err=document.getElementById('sheetError');if(err){err.textContent='Sheet masih kosong. Isi minimal satu sel sebelum mengekspor PDF.';err.classList.add('show')}showToast('Isi minimal satu sel sebelum mengekspor PDF.');return}
  if(sheet.editing)sheetCommitEdit();
  const dlg=document.getElementById('sheetPreview');if(!dlg)return;
  if(!sheetPdfState.options)sheetPdfState.options={...SHEET_PDF_DEFAULTS};
  sheetPdfFillOptions(sheetPdfState.options);
  sheetPdfState.open=true;sheetPdfState.page=1;sheetPdfState.returnFocus=document.activeElement;
  dlg.classList.add('open');dlg.setAttribute('aria-hidden','false');document.body.classList.add('sheet-previewing');
  setTimeout(()=>{const c=document.getElementById('sheetPreviewClose');if(c)c.focus({preventScroll:true})},40);
  refreshSheetPreview();
}
function closeSheetPreview(){
  const s=sheetPdfState,dlg=document.getElementById('sheetPreview');if(!dlg)return;
  s.open=false;s.token++;clearTimeout(sheetPreviewTimer);
  if(s.doc){try{s.doc.destroy()}catch{}s.doc=null}
  s.bytes=null;s.pages=0;
  dlg.classList.remove('open');dlg.setAttribute('aria-hidden','true');document.body.classList.remove('sheet-previewing');
  const canvas=document.getElementById('sheetPreviewCanvas');if(canvas){canvas.hidden=true;canvas.width=1;canvas.height=1}
  showSheetPreviewLoading(true);
  const target=s.returnFocus;s.returnFocus=null;
  const saveOpen=document.getElementById('saveDialog')?.classList.contains('open');
  if(!saveOpen&&target&&document.contains(target)){try{target.focus({preventScroll:true})}catch{}}
}
async function downloadSheetPdf(){
  const s=sheetPdfState,b=document.getElementById('sheetPreviewDownload'),note=document.getElementById('sheetPreviewNote');
  if(!s.open||s.busy)return;
  const opts=sheetPdfReadOptions();s.options=opts;
  b.disabled=true;b.classList.add('loading');b.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Menyiapkan…</span>';
  if(note){note.textContent='Menyusun PDF final…';note.classList.remove('error')}
  try{
    const bytes=await exportSheetToPdf(null,opts);
    download(bytes,`${filenameBase(sheetNameValue())}.pdf`);
    sheet.exported=true;sheetUpdateDirty();
    const status=document.getElementById('sheetStatus');
    if(status){status.innerHTML='<span aria-hidden="true">✓</span> PDF siap disimpan';status.classList.add('show')}
    closeSheetPreview();
    showToast('PDF Sheet selesai dibuat. Beri nama file pada dialog simpan.');
  }catch(e){
    if(note){note.textContent=e.message||'Gagal membuat PDF.';note.classList.add('error')}
  }finally{
    b.disabled=false;b.classList.remove('loading');b.innerHTML='<span>Unduh PDF</span><span>↓</span>';
  }
}
function initSheetExtras(){
  const fontSel=document.getElementById('sheetFont'),sizeSel=document.getElementById('sheetFontSize'),fontFile=document.getElementById('sheetFontFile');
  if(fontSel)fontSel.addEventListener('change',()=>sheetApplyFont(fontSel.value));
  if(sizeSel)sizeSel.addEventListener('change',()=>sheetApplyFontSize(sizeSel.value));
  const upload=document.getElementById('sheetFontUpload');
  if(upload&&fontFile){upload.addEventListener('click',()=>fontFile.click());fontFile.addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];e.target.value='';if(f)await loadSheetFont(f)})}
  renderSheetFormulaMenu();
  const help=document.getElementById('sheetFormulaHelp'),menu=document.getElementById('sheetFormulaMenu');
  if(help&&menu){
    help.addEventListener('click',()=>toggleSheetFormulaMenu(!menu.classList.contains('open')));
    const closeBtn=document.getElementById('sheetFormulaMenuClose');
    if(closeBtn)closeBtn.addEventListener('click',()=>{toggleSheetFormulaMenu(false);help.focus()});
    menu.addEventListener('click',e=>{const item=e.target.closest('[data-fn]');if(!item)return;insertSheetFormula(item.dataset.fn);toggleSheetFormulaMenu(false);const f=document.getElementById('sheetFormula');if(f)f.focus()});
    document.addEventListener('pointerdown',e=>{if(!menu.classList.contains('open'))return;if(menu.contains(e.target)||help.contains(e.target))return;toggleSheetFormulaMenu(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){e.preventDefault();const inMenu=menu.contains(document.activeElement);toggleSheetFormulaMenu(false);if(inMenu)help.focus()}});
  }
  ['sheetPaper','sheetOrient','sheetLayout','sheetBorderStyle','sheetFontScale','sheetMargin','sheetShowTitle','sheetShowHeader','sheetShowRowNums','sheetShowPageNum','sheetPageNumPos'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{sheetPdfState.page=1;scheduleSheetPreview()})});
  const dlg=document.getElementById('sheetPreview');
  if(dlg){
    const close=()=>closeSheetPreview();
    ['sheetPreviewClose','sheetPreviewCancel'].forEach(id=>{const btn=document.getElementById(id);if(btn)btn.addEventListener('click',close)});
    dlg.addEventListener('click',e=>{if(e.target===e.currentTarget)close()});
    dlg.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();close();return}
      if(e.key!=='Tab')return;
      const focusable=[...dlg.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled)')].filter(el=>el.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    });
    const prev=document.getElementById('sheetPreviewPrev'),next=document.getElementById('sheetPreviewNext');
    if(prev)prev.addEventListener('click',()=>{if(sheetPdfState.page>1){sheetPdfState.page--;renderSheetPreviewPage()}});
    if(next)next.addEventListener('click',()=>{if(sheetPdfState.page<sheetPdfState.pages){sheetPdfState.page++;renderSheetPreviewPage()}});
    const dl=document.getElementById('sheetPreviewDownload');if(dl)dl.addEventListener('click',downloadSheetPdf);
    const wrap=document.getElementById('sheetPreviewCanvasWrap');
    if(wrap&&window.ResizeObserver){const ro=new ResizeObserver(()=>{if(sheetPdfState.open&&sheetPdfState.doc&&!sheetPdfState.busy)renderSheetPreviewPage()});ro.observe(wrap)}
  }
}
function setSheetProgress(p,label){const bar=document.getElementById('sheetProgress'),fill=document.getElementById('sheetProgressFill'),lbl=document.getElementById('sheetProgressLabel');if(!bar)return;bar.classList.add('show');bar.setAttribute('aria-hidden','false');if(lbl){lbl.textContent=label||'';lbl.classList.toggle('show',!!label)}if(p==null||isNaN(p)){fill.classList.add('indeterminate');fill.style.width='100%';bar.removeAttribute('aria-valuenow')}else{fill.classList.remove('indeterminate');const v=Math.max(2,Math.min(100,p));fill.style.width=v+'%';bar.setAttribute('aria-valuenow',String(Math.round(v)))}}
function hideSheetProgress(){const bar=document.getElementById('sheetProgress');if(!bar)return;bar.classList.remove('show');bar.setAttribute('aria-hidden','true');bar.removeAttribute('aria-valuenow');const fill=document.getElementById('sheetProgressFill');if(fill){fill.classList.remove('indeterminate');fill.style.width='0%'}const lbl=document.getElementById('sheetProgressLabel');if(lbl){lbl.textContent='';lbl.classList.remove('show')}}
function openSheetPage(){initSheetPage();if(!document.getElementById('sheetPage').classList.contains('open')){const active=document.activeElement;sheetPageReturnFocus=active&&active!==document.body?active:null}const pg=document.getElementById('sheetPage');pg.classList.add('open');pg.setAttribute('aria-hidden','false');document.body.classList.add('sheet-writing');document.getElementById('sheetError').classList.remove('show');document.getElementById('sheetStatus').classList.remove('show');hideSheetProgress();sheetUpdateDirty();renderSheetGrid();renderSheetVars();sheetUpdateMeta();const vars=document.getElementById('sheetVars'),btn=document.getElementById('sheetVarsBtn'),wide=window.innerWidth>=1100;if(vars)vars.classList.toggle('open',wide);if(btn)btn.setAttribute('aria-expanded',String(wide));setTimeout(()=>sheetFocusActive(),60)}
function openSheetLeaveDialog(){const dlg=document.getElementById('sheetLeaveDialog');if(!dlg||dlg.classList.contains('open'))return;sheetLeaveReturnFocus=document.activeElement;dlg.classList.add('open');dlg.setAttribute('aria-hidden','false');requestAnimationFrame(()=>document.getElementById('sheetLeaveCancel').focus())}
function closeSheetLeaveDialog(restoreFocus=true){const dlg=document.getElementById('sheetLeaveDialog');if(!dlg||!dlg.classList.contains('open'))return;dlg.classList.remove('open');dlg.setAttribute('aria-hidden','true');const target=sheetLeaveReturnFocus;sheetLeaveReturnFocus=null;if(restoreFocus&&target&&document.contains(target)){try{target.focus({preventScroll:true})}catch{}}}
function closeSheetPage(){closeSheetLeaveDialog(false);const pg=document.getElementById('sheetPage');pg.classList.remove('open');pg.setAttribute('aria-hidden','true');document.body.classList.remove('sheet-writing');const target=sheetPageReturnFocus||document.querySelector('button[data-tool="sheet"]');sheetPageReturnFocus=null;if(target&&document.contains(target)){try{target.focus({preventScroll:true})}catch{}}}
function initSheetPage(){if(sheet.initialized)return;sheet.initialized=true;const page=document.getElementById('sheetPage'),grid=document.getElementById('sheetGrid'),tools=document.getElementById('sheetTools'),formula=document.getElementById('sheetFormula'),vars=document.getElementById('sheetVars'),varList=document.getElementById('sheetVarList');
grid.addEventListener('pointerdown',e=>{const td=e.target.closest('.sheet-cell');if(!td){const col=e.target.closest('.sheet-colhead'),row=e.target.closest('.sheet-rowhead'),corner=e.target.closest('.sheet-corner');if(col){const c=+col.dataset.col;sheet.anchor={r:0,c};sheet.sel={r:sheet.rows-1,c};sheetUpdateSelectionUI();e.preventDefault()}else if(row){const r=+row.dataset.row;sheet.anchor={r,c:0};sheet.sel={r,c:sheet.cols-1};sheetUpdateSelectionUI();e.preventDefault()}else if(corner){sheet.anchor={r:0,c:0};sheet.sel={r:sheet.rows-1,c:sheet.cols-1};sheetUpdateSelectionUI();e.preventDefault()}return}if(e.pointerType==='touch'){sheet.touchMode=true;sheet.touchTap={r:+(td.dataset.r||0),c:+(td.dataset.c||0),x:e.clientX,y:e.clientY,shift:e.shiftKey,pointerId:e.pointerId};clearTimeout(sheet.touchTimer);sheet.touchTimer=setTimeout(()=>{const t=sheet.touchTap;if(!t)return;sheet.touchTap=null;sheetSelect(t.r,t.c,t.shift);sheetBeginEdit(t.r,t.c)},480);return}if(e.button!==0)return;const r=+td.dataset.r,c=+td.dataset.c;if(sheet.editing&&(sheet.editing.r!==r||sheet.editing.c!==c))sheetCommitEdit();sheet.dragging=true;sheetSelect(r,c,e.shiftKey);sheetFocusActive();e.preventDefault()});
grid.addEventListener('pointerover',e=>{if(!sheet.dragging)return;const td=e.target.closest('.sheet-cell');if(!td)return;sheetSelect(+td.dataset.r,+td.dataset.c,true)});
window.addEventListener('pointerup',()=>{sheet.dragging=false});
 const startSheetResize=(e,kind,index)=>{e.preventDefault();e.stopPropagation();if(sheet.editing)sheetCommitEdit();const startSize=kind==='col'?sheetColWidth(index):sheetRowHeight(index);sheet.resize={kind,index,startX:e.clientX,startY:e.clientY,startSize,pushed:false,pointerId:e.pointerId};document.body.classList.add('sheet-resizing');try{grid.setPointerCapture(e.pointerId)}catch{}};
 const moveSheetResize=e=>{const r=sheet.resize;if(!r)return;e.preventDefault();const delta=r.kind==='col'?e.clientX-r.startX:e.clientY-r.startY;if(!r.pushed&&Math.abs(delta)>1){sheetPushHistory();r.pushed=true;sheetMarkDirty()}if(!r.pushed)return;if(r.kind==='col')sheetApplyColWidth(r.index,r.startSize+delta);else sheetApplyRowHeight(r.index,r.startSize+delta);sheetPositionFillHandle()};
 const endSheetResize=()=>{const r=sheet.resize;if(!r)return;sheet.resize=null;document.body.classList.remove('sheet-resizing');if(r.pushed){sheetMarkDirty();sheetPositionFillHandle()}};
 const moveSheetFill=e=>{const drag=sheet.fillDrag;if(!drag)return;e.preventDefault();const el=document.elementFromPoint(e.clientX,e.clientY),td=el&&el.closest?el.closest('#sheetGrid .sheet-cell'):null;if(!td)return;const base=drag.base;let tr=+td.dataset.r,tc=+td.dataset.c;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.abs(dx)<=16)tc=base.c2;if(Math.abs(dy)<=16)tr=base.r2;const target=sheetFillTarget(base,tr,tc);drag.target=target;sheetPreviewFill(target,base)};
 const endSheetFill=()=>{const drag=sheet.fillDrag;if(!drag)return;const target=drag.target;sheet.fillDrag=null;document.body.classList.remove('sheet-filling');sheetClearFillPreview();if(target)sheetApplyFill(drag.base,target);else sheetPositionFillHandle()};
 grid.addEventListener('pointerdown',e=>{if(e.button!==undefined&&e.button!==0)return;const handle=e.target.closest('.sheet-fill-handle');if(handle){e.preventDefault();e.stopPropagation();if(sheet.editing)sheetCommitEdit();sheet.fillDrag={pointerId:e.pointerId,base:sheetNormRange(),target:null,startX:e.clientX,startY:e.clientY};document.body.classList.add('sheet-filling');try{grid.setPointerCapture(e.pointerId)}catch{};return}const cgrip=e.target.closest('[data-colgrip]');if(cgrip){const c=+cgrip.dataset.colgrip,prev=sheet.lastGrip,now=Date.now();if(prev&&prev.kind==='col'&&prev.index===c&&now-prev.time<420){sheet.lastGrip=null;e.preventDefault();e.stopPropagation();sheetAutoFitCol(c);return}sheet.lastGrip={kind:'col',index:c,time:now};startSheetResize(e,'col',c);return}const rgrip=e.target.closest('[data-rowgrip]');if(rgrip){const r=+rgrip.dataset.rowgrip,prev=sheet.lastGrip,now=Date.now();if(prev&&prev.kind==='row'&&prev.index===r&&now-prev.time<420){sheet.lastGrip=null;e.preventDefault();e.stopPropagation();sheetAutoFitRow(r);return}sheet.lastGrip={kind:'row',index:r,time:now};startSheetResize(e,'row',r);return}},true);
 grid.addEventListener('pointermove',e=>{if(sheet.resize){moveSheetResize(e);return}if(sheet.fillDrag){moveSheetFill(e);return}const tap=sheet.touchTap;if(tap&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>10){clearTimeout(sheet.touchTimer);sheet.touchTap=null}});
 grid.addEventListener('pointerup',e=>{if(sheet.resize){endSheetResize();return}if(sheet.fillDrag){moveSheetFill(e);endSheetFill();return}const tap=sheet.touchTap;if(tap){clearTimeout(sheet.touchTimer);sheet.touchTap=null;if(Math.hypot(e.clientX-tap.x,e.clientY-tap.y)<=10){sheetSelect(tap.r,tap.c,tap.shift);sheetFocusActive()}}});
 grid.addEventListener('pointercancel',()=>{clearTimeout(sheet.touchTimer);sheet.touchTap=null;sheet.dragging=false;endSheetResize();sheet.fillDrag=null;sheetClearFillPreview();document.body.classList.remove('sheet-filling')});
 grid.addEventListener('contextmenu',e=>{if(sheet.touchMode&&e.target.closest('.sheet-cell'))e.preventDefault()});
 grid.addEventListener('dblclick',e=>{const cgrip=e.target.closest('[data-colgrip]');if(cgrip){e.preventDefault();sheetAutoFitCol(+cgrip.dataset.colgrip);return}const rgrip=e.target.closest('[data-rowgrip]');if(rgrip){e.preventDefault();sheetAutoFitRow(+rgrip.dataset.rowgrip);return}});
grid.addEventListener('dblclick',e=>{const td=e.target.closest('.sheet-cell');if(!td)return;clearTimeout(sheet.touchTimer);sheet.touchTap=null;sheetBeginEdit(+td.dataset.r,+td.dataset.c)});
page.addEventListener('focusin',e=>{if(!sheet.editing)return;const td=sheetCellNode(sheet.editing.r,sheet.editing.c);if(td&&(e.target===td||td.contains(e.target)))return;sheetCommitEdit(null,false)});
page.addEventListener('keydown',e=>{if(sheet.editing){if(e.key==='Enter'){e.preventDefault();e.stopPropagation();sheetCommitEdit(e.shiftKey?'up':'down');return}if(e.key==='Tab'){e.preventDefault();e.stopPropagation();sheetCommitEdit(e.shiftKey?'left':'right');return}if(e.key==='Escape'){e.preventDefault();e.stopPropagation();sheetCancelEdit();return}if(e.key==='Delete')return;return}const target=e.target;if(target&&target.closest&&target.closest('#sheetFormulaMenu'))return;if(target&&target.matches&&target.matches('input,select,textarea')){if(e.key==='Escape'){e.preventDefault();e.stopPropagation();if(target.id==='sheetFormula')sheetSyncFormula(true);target.blur()}return}if(e.ctrlKey||e.metaKey){const k=e.key.toLowerCase();if(k==='z'){e.preventDefault();if(e.shiftKey)sheetRedo();else sheetUndo();return}if(k==='y'){e.preventDefault();sheetRedo();return}if(k==='s'){e.preventDefault();document.getElementById('sheetExport').click();return}return}if(e.key==='ArrowUp'||e.key==='ArrowDown'||e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const dr=e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0,dc=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;sheetMove(dr,dc,e.shiftKey);sheetFocusActive();return}if(e.key==='Enter'){e.preventDefault();sheetMove(e.shiftKey?-1:1,0,false);sheetFocusActive();return}if(e.key==='Tab'){e.preventDefault();sheetMove(0,e.shiftKey?-1:1,false);sheetFocusActive();return}if(e.key==='Home'){e.preventDefault();sheetSelect(sheet.sel.r,0,e.shiftKey);sheetFocusActive();return}if(e.key==='End'){e.preventDefault();sheetSelect(sheet.sel.r,sheet.cols-1,e.shiftKey);sheetFocusActive();return}if(e.key==='PageDown'){e.preventDefault();sheetMove(12,0,e.shiftKey);sheetFocusActive();return}if(e.key==='PageUp'){e.preventDefault();sheetMove(-12,0,e.shiftKey);sheetFocusActive();return}if(e.key==='F2'){e.preventDefault();sheetBeginEdit(sheet.sel.r,sheet.sel.c);return}if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();sheetClearRange();return}if(e.key.length===1&&!e.altKey){e.preventDefault();sheetBeginEdit(sheet.sel.r,sheet.sel.c,e.key)}});
page.addEventListener('copy',e=>{if(sheet.editing||(e.target&&e.target.matches&&e.target.matches('input,textarea')))return;const text=sheetRangeTSV();if(!text)return;e.clipboardData.setData('text/plain',text);e.preventDefault()});
page.addEventListener('cut',e=>{if(sheet.editing||(e.target&&e.target.matches&&e.target.matches('input,textarea')))return;const text=sheetRangeTSV();if(!text)return;e.clipboardData.setData('text/plain',text);e.preventDefault();sheetClearRange()});
page.addEventListener('paste',e=>{const text=(e.clipboardData||window.clipboardData).getData('text/plain');if(!text)return;if(sheet.editing){e.preventDefault();document.execCommand('insertText',false,text);return}if(e.target&&e.target.matches&&e.target.matches('input,textarea'))return;e.preventDefault();sheetPasteTSV(text)});
tools.addEventListener('click',e=>{const b=e.target.closest('[data-sact]');if(!b)return;if(sheet.editing)sheetCommitEdit();const act=b.dataset.sact;if(act==='undo')sheetUndo();else if(act==='redo')sheetRedo();else if(act==='bold')sheetToggleStyle('b');else if(act==='italic')sheetToggleStyle('i');else if(act==='align-left')sheetAlign('left');else if(act==='align-center')sheetAlign('center');else if(act==='align-right')sheetAlign('right');else if(act==='fill-none')sheetApplyRangeStyle(s=>{delete s.bg});else if(act==='row-add')sheetInsertRow();else if(act==='col-add')sheetInsertCol();else if(act==='row-del')sheetDeleteRow();else if(act==='col-del')sheetDeleteCol();else if(act==='clear')sheetClearRange();else if(act==='wrap')sheetToggleWrap();else if(act==='merge')sheetMergeSelection()});
document.getElementById('sheetBorder').addEventListener('change',e=>{if(sheet.editing)sheetCommitEdit();const mode=e.target.value;sheetApplyRangeStyle((s,pos)=>{if(mode==='none'){delete s.bd;return}s.bd=s.bd||{};const b=s.bd;if(mode==='all'){b.t=b.r=b.b=b.l=1}else if(mode==='outer'){if(pos.r===pos.r1)b.t=1;if(pos.r===pos.r2)b.b=1;if(pos.c===pos.c1)b.l=1;if(pos.c===pos.c2)b.r=1}else if(mode==='inner'){if(pos.r>pos.r1)b.t=1;if(pos.r<pos.r2)b.b=1;if(pos.c>pos.c1)b.l=1;if(pos.c<pos.c2)b.r=1}else if(mode==='bottom'){b.b=1}if(!b.t&&!b.r&&!b.b&&!b.l)delete s.bd})});
document.getElementById('sheetFormat').addEventListener('change',e=>{if(sheet.editing)sheetCommitEdit();const fmt=e.target.value;sheetApplyRangeStyle(s=>{if(fmt==='auto')delete s.fmt;else s.fmt=fmt})});
const textColor=document.getElementById('sheetTextColor'),fillColor=document.getElementById('sheetFillColor');textColor.addEventListener('input',()=>textColor.closest('.sheet-color').style.setProperty('--swatch',textColor.value));fillColor.addEventListener('input',()=>fillColor.closest('.sheet-color').style.setProperty('--swatch',fillColor.value));textColor.addEventListener('change',()=>{if(sheet.editing)sheetCommitEdit();sheetApplyRangeStyle(s=>{s.color=textColor.value})});fillColor.addEventListener('change',()=>{if(sheet.editing)sheetCommitEdit();const bg=fillColor.value,n=parseInt(bg.slice(1),16),lum=((n>>16&255)*.299+(n>>8&255)*.587+(n&255)*.114)/255;sheetApplyRangeStyle(s=>{s.bg=bg;if(!s.color)s.color=lum>.55?'#3a3019':'#fffaf0'})});
document.getElementById('sheetFormulaApply').addEventListener('click',sheetApplyFormula);
formula.addEventListener('focus',()=>{if(sheet.editing)sheetCommitEdit(null,false);if(!sheetFormulaInserting)sheetSyncFormula(true);sheetFormulaPrev=formula.value;sheetFormulaCaret={start:formula.selectionStart??formula.value.length,end:formula.selectionEnd??formula.value.length}});
formula.addEventListener('blur',()=>{sheetFormulaCaret={start:formula.selectionStart??formula.value.length,end:formula.selectionEnd??formula.value.length}});
const rememberFormulaCaret=()=>{if(document.activeElement===formula)sheetFormulaCaret={start:formula.selectionStart??formula.value.length,end:formula.selectionEnd??formula.value.length}};
['keyup','click','select'].forEach(ev=>formula.addEventListener(ev,rememberFormulaCaret));
formula.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopPropagation();sheetApplyFormula()}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();toggleSheetFormulaMenu(false);sheetSyncFormula(true);formula.blur()}else if(e.key==='ArrowDown'&&document.getElementById('sheetFormulaMenu').classList.contains('open')){e.preventDefault();const first=document.querySelector('#sheetFormulaList [data-fn]');if(first)first.focus()}});
formula.addEventListener('input',()=>{const v=formula.value;if(v.startsWith('=')&&!sheetFormulaPrev.startsWith('='))toggleSheetFormulaMenu(true,false);else if(!v.startsWith('='))toggleSheetFormulaMenu(false);sheetFormulaPrev=v;rememberFormulaCaret()});
document.getElementById('sheetName').addEventListener('input',()=>sheetMarkDirty());
document.getElementById('sheetVarsBtn').addEventListener('click',()=>{const open=vars.classList.toggle('open');document.getElementById('sheetVarsBtn').setAttribute('aria-expanded',String(open));if(open){const first=document.getElementById('sheetVarName');if(first)first.focus()}});
document.getElementById('sheetVarsClose').addEventListener('click',()=>{vars.classList.remove('open');document.getElementById('sheetVarsBtn').setAttribute('aria-expanded','false');sheetFocusActive()});
document.getElementById('sheetVarForm').addEventListener('submit',e=>{e.preventDefault();sheetAddVar()});
varList.addEventListener('change',e=>{const input=e.target.closest('.sheet-var-value');if(input)sheetUpdateVar(input.dataset.varname,input.value)});
varList.addEventListener('click',e=>{const b=e.target.closest('[data-vardel]');if(b)sheetDeleteVar(b.dataset.vardel)});
document.getElementById('sheetBackBtn').addEventListener('click',openSheetLeaveDialog);
document.getElementById('sheetLeaveCancel').addEventListener('click',()=>closeSheetLeaveDialog());
document.getElementById('sheetLeaveConfirm').addEventListener('click',()=>{closeSheetPage();showToast('PDF Sheet ditutup. Data tetap tersimpan di tab ini.')});
document.getElementById('sheetLeaveDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)closeSheetLeaveDialog()});
document.getElementById('sheetLeaveDialog').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...e.currentTarget.querySelectorAll('button:not(:disabled)')];if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
document.getElementById('sheetExport').addEventListener('click',()=>openSheetPreview());
renderSheetGrid();renderSheetVars();sheetUpdateMeta();initSheetExtras()}

/* ===== Liquid glass: interaksi kursor + governer performa tampilan ===== */
(() => {
  const root=document.documentElement;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const lowMemory=(navigator.deviceMemory||8)<=4;
  const lowCores=(navigator.hardwareConcurrency||8)<=2;
  const syncPerfProfile=()=>{
    const lite=!!(connection&&connection.saveData)||lowMemory||lowCores;
    root.dataset.perf=lite?'lite':'full';
  };
  syncPerfProfile();
  connection?.addEventListener?.('change',syncPerfProfile);

  /* Hentikan animasi ambient saat tab tidak terlihat. */
  const syncVisibility=()=>root.classList.toggle('is-paused',document.hidden);
  document.addEventListener('visibilitychange',syncVisibility);
  syncVisibility();

  /* Hero yang keluar layar tidak perlu terus beranimasi. */
  const hero=document.querySelector('.hero-card');
  if(hero&&'IntersectionObserver'in window){
    new IntersectionObserver(entries=>{
      for(const entry of entries)hero.classList.toggle('is-offscreen',!entry.isIntersecting);
    },{rootMargin:'140px'}).observe(hero);
  }

  /* Satu listener kursor untuk semua permukaan kaca (rAF-throttled). */
  const targets='.tool-card,.guide-card,.hero-card,.about-card,.bottom-banner,.quick-link';
  let frame=0,pending=null;
  const paintGlow=()=>{
    frame=0;
    if(!pending)return;
    const {el,x,y}=pending;pending=null;
    const rect=el.getBoundingClientRect();
    el.style.setProperty('--mx',Math.round(x-rect.left)+'px');
    el.style.setProperty('--my',Math.round(y-rect.top)+'px');
  };
  const canGlow=()=>finePointer.matches&&!motion.matches&&root.dataset.perf!=='lite';
  document.addEventListener('pointermove',event=>{
    if(!canGlow())return;
    const el=event.target instanceof Element?event.target.closest(targets):null;
    if(!el)return;
    pending={el,x:event.clientX,y:event.clientY};
    if(!frame)frame=requestAnimationFrame(paintGlow);
  },{passive:true});
  document.addEventListener('pointerout',event=>{
    const el=event.target instanceof Element?event.target.closest(targets):null;
    if(!el||(event.relatedTarget instanceof Node&&el.contains(event.relatedTarget)))return;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  },{passive:true});
})();

/* Topbar sedikit terangkat saat halaman digulir agar batas konten tetap jelas. */
const topbarElement=document.querySelector('.topbar');
let topbarScrollFrame=0;
function syncTopbarElevation(){topbarScrollFrame=0;if(topbarElement)topbarElement.classList.toggle('is-scrolled',window.scrollY>8)}
window.addEventListener('scroll',()=>{if(!topbarScrollFrame)topbarScrollFrame=requestAnimationFrame(syncTopbarElevation)},{passive:true});
syncTopbarElevation();

/* ============================================================
   DATABASE FILE · SQLite lokal
   Baca file .db, sunting seperti spreadsheet, simpan kembali,
   ekspor ke PDF, dan wizard pembuatan database baru.
   ============================================================ */
const DB_PAGE_SIZE=50,DB_MAX_FILE=80*1024*1024,DB_PDF_ROW_LIMIT=5000;
const DB_WIZARD_TYPES={
  TEXT:{label:'Teks',sql:'TEXT',input:'text'},
  INTEGER:{label:'Angka',sql:'INTEGER',input:'integer'},
  REAL:{label:'Angka desimal',sql:'REAL',input:'decimal'},
  DATE:{label:'Tanggal',sql:'DATE',input:'date'},
  DATETIME:{label:'Tanggal & waktu',sql:'DATETIME',input:'datetime'},
  BOOLEAN:{label:'Ya / Tidak',sql:'BOOLEAN',input:'boolean'}
};
const databaseState={db:null,name:'database',tables:[],active:null,page:0,rows:[],columns:[],dirty:false,view:'start',busy:false};
const dbWizardState={step:1,name:'database-baru',tables:[],activeTable:0,error:'',focus:'',wizardReturnView:'start'};
let databasePageInitialized=false,dbReturnFocus=null,sqlJsPromise=null,sqlJsLib=null,dbStatusTimer=0,dbConfirmResolve=null,dbWizardReplaceApproved=false;

function ensureSqlJs(){
  if(sqlJsLib)return Promise.resolve(sqlJsLib);
  if(!sqlJsPromise){
    if(typeof initSqlJs!=='function')sqlJsPromise=Promise.reject(Error('Mesin SQLite tidak tersedia. Muat ulang halaman lalu coba lagi.'));
    else sqlJsPromise=initSqlJs({locateFile:file=>new URL('vendor/'+file,document.baseURI).href}).then(lib=>{sqlJsLib=lib;return lib}).catch(()=>{sqlJsPromise=null;throw Error('Mesin SQLite gagal dimuat. Periksa koneksi lalu muat ulang halaman.')});
  }
  return sqlJsPromise;
}
function dbQuoteIdent(name){return '"'+String(name??'').replace(/"/g,'""')+'"'}
function dbQuoteLiteral(name){return "'"+String(name??'').replace(/'/g,"''")+"'"}
function dbTypeKind(raw){
  const type=String(raw||'').toUpperCase().trim();
  if(!type)return 'TEXT';
  if(type.includes('BOOL'))return 'BOOLEAN';
  if(type.includes('DATETIME')||type.includes('TIMESTAMP'))return 'DATETIME';
  if(type.includes('DATE'))return 'DATE';
  if(type.includes('INT'))return 'INTEGER';
  if(type.includes('CHAR')||type.includes('CLOB')||type.includes('TEXT'))return 'TEXT';
  if(type.includes('BLOB'))return 'BLOB';
  if(type.includes('REAL')||type.includes('FLOA')||type.includes('DOUB')||type.includes('NUM')||type.includes('DEC')||type.includes('MONEY'))return 'REAL';
  return 'TEXT';
}
function dbTypeLabel(kind){return (DB_WIZARD_TYPES[kind]&&DB_WIZARD_TYPES[kind].label)||(kind==='BLOB'?'Biner':'Teks')}
function dbValuesEqual(a,b){
  if(a===null||a===undefined)return b===null||b===undefined;
  if(b===null||b===undefined)return false;
  if(typeof a==='number'||typeof b==='number')return Number(a)===Number(b);
  return String(a)===String(b);
}
function dbDisplayValue(value){
  if(value===null||value===undefined)return '';
  if(typeof value==='number')return String(value);
  if(typeof value==='string')return value;
  if(typeof value==='object'&&value.constructor===Uint8Array)return 'Biner ('+formatBytes(value.byteLength)+')';
  return String(value);
}
function dbNumberIfPossible(value){const n=Number(value);return Number.isFinite(n)&&String(value).trim()!==''?n:value}
function dbActiveTable(){return databaseState.tables.find(t=>t.name===databaseState.active)||null}
function dbBaseName(){
  const input=document.getElementById('dbName');
  const raw=(input?input.value:databaseState.name||'database').replace(/\.(db|sqlite3?)$/i,'');
  return sanitizeFileStem(raw,databaseState.name||'database');
}
function dbWizardBaseName(){
  const raw=String(dbWizardState.name||'').replace(/\.(db|sqlite3?)$/i,'');
  return sanitizeFileStem(raw,'database-baru');
}
function dbParts(){return {
  page:document.getElementById('dbPage'),body:document.getElementById('dbBody'),start:document.getElementById('dbStart'),workspace:document.getElementById('dbWorkspace'),wizard:document.getElementById('dbWizard'),
  name:document.getElementById('dbName'),status:document.getElementById('dbStatus'),dirty:document.getElementById('dbDirty'),
  saveBtn:document.getElementById('dbSaveBtn'),pdfBtn:document.getElementById('dbPdfBtn'),
  tableList:document.getElementById('dbTableList'),tableCount:document.getElementById('dbTableCount'),tablesEmpty:document.getElementById('dbTablesEmpty'),
  activeTable:document.getElementById('dbActiveTable'),activeMeta:document.getElementById('dbActiveMeta'),
  addRow:document.getElementById('dbAddRow'),pdfTable:document.getElementById('dbPdfTable'),grid:document.getElementById('dbGridScroll'),
  rowInfo:document.getElementById('dbRowInfo'),pageInfo:document.getElementById('dbPageInfo'),prev:document.getElementById('dbPrevPage'),next:document.getElementById('dbNextPage'),
  wizardBody:document.getElementById('dbWizardBody'),wizardTitle:document.getElementById('dbWizardTitle'),wizardError:document.getElementById('dbWizardError'),
  wizardNext:document.getElementById('dbWizardNext'),wizardBack:document.getElementById('dbWizardBack'),wizardCancel:document.getElementById('dbWizardCancel'),
  confirm:document.getElementById('dbConfirm'),confirmTitle:document.getElementById('dbConfirmTitle'),confirmCopy:document.getElementById('dbConfirmCopy'),confirmOk:document.getElementById('dbConfirmOk'),confirmCancel:document.getElementById('dbConfirmCancel')
}}
function dbShowView(view){
  databaseState.view=view;
  const p=dbParts();
  if(p.start)p.start.hidden=view!=='start';
  if(p.workspace)p.workspace.hidden=view!=='workspace';
  if(p.wizard)p.wizard.hidden=view!=='wizard';
  if(p.name)p.name.disabled=view!=='workspace';
  if(p.body)p.body.scrollTop=0;
  dbUpdateChrome();
}
function dbUpdateChrome(){
  const p=dbParts(),has=!!databaseState.db,ws=databaseState.view==='workspace',busy=databaseState.busy,t=dbActiveTable();
  if(p.saveBtn)p.saveBtn.disabled=!has||busy||!ws;
  if(p.pdfBtn)p.pdfBtn.disabled=!has||busy||!ws||!databaseState.tables.length;
  if(p.dirty)p.dirty.hidden=!(has&&databaseState.dirty&&ws);
  if(p.addRow)p.addRow.disabled=!has||busy||!t;
  if(p.pdfTable)p.pdfTable.disabled=!has||busy||!t;
  if(p.activeTable)p.activeTable.textContent=t?t.name:'—';
  if(p.activeMeta)p.activeMeta.textContent=t?`${t.columns.length} kolom · ${t.rowCount.toLocaleString('id-ID')} baris`:(has?'Database ini belum memiliki tabel data.':'Pilih tabel untuk mulai.');
  const pages=t?Math.max(1,Math.ceil(t.rowCount/DB_PAGE_SIZE)):1,page=t?Math.min(databaseState.page,pages-1):0;
  if(p.pageInfo)p.pageInfo.textContent=`${page+1} / ${pages}`;
  if(p.prev)p.prev.disabled=!t||busy||page<=0;
  if(p.next)p.next.disabled=!t||busy||page>=pages-1;
  if(p.rowInfo)p.rowInfo.textContent=t?`${t.rowCount.toLocaleString('id-ID')} baris · ${(page*DB_PAGE_SIZE+1).toLocaleString('id-ID')}–${Math.min((page+1)*DB_PAGE_SIZE,t.rowCount).toLocaleString('id-ID')}`:'0 baris';
}
function dbMarkDirty(){databaseState.dirty=true;dbUpdateChrome()}
function dbSyncNameWidth(){
  const input=document.getElementById('dbName');if(!input)return;
  const value=input.value||'database';
  const chars=Math.max(7,Math.min(30,value.length+1));
  if(input.size!==chars)input.size=chars;
}
function dbMarkSaved(name){
  databaseState.dirty=false;
  if(name){databaseState.name=String(name).replace(/\.db$/i,'')||databaseState.name;const input=document.getElementById('dbName');if(input)input.value=databaseState.name}
  dbSyncNameWidth();dbUpdateChrome();dbFlashStatus('Database siap');
}
function dbFlashStatus(text){
  const el=document.getElementById('dbStatus');if(!el)return;
  clearTimeout(dbStatusTimer);
  el.innerHTML=`<span aria-hidden="true">✓</span> ${escapeHTML(text)}`;
  el.classList.add('show');
  dbStatusTimer=setTimeout(()=>el.classList.remove('show'),2800);
}
function dbSetProgress(p,label){
  const bar=document.getElementById('dbProgress'),fill=document.getElementById('dbProgressFill'),lbl=document.getElementById('dbProgressLabel');
  if(!bar||!fill)return;
  bar.classList.add('show');bar.setAttribute('aria-hidden','false');
  if(lbl){lbl.textContent=label||'';lbl.classList.toggle('show',!!label)}
  if(p==null||isNaN(p)){fill.classList.add('indeterminate');fill.style.width='100%';bar.removeAttribute('aria-valuenow')}
  else{fill.classList.remove('indeterminate');const v=Math.max(2,Math.min(100,p));fill.style.width=v+'%';bar.setAttribute('aria-valuenow',String(Math.round(v)))}
}
function dbHideProgress(){
  const bar=document.getElementById('dbProgress'),fill=document.getElementById('dbProgressFill'),lbl=document.getElementById('dbProgressLabel');
  if(!bar)return;bar.classList.remove('show');bar.setAttribute('aria-hidden','true');bar.removeAttribute('aria-valuenow');
  if(fill){fill.classList.remove('indeterminate');fill.style.width='0%'}
  if(lbl){lbl.textContent='';lbl.classList.remove('show')}
}
function dbSetBusy(on,label){databaseState.busy=!!on;if(on)dbSetProgress(null,label||'Memproses…');else dbHideProgress();dbUpdateChrome()}
function dbAskConfirm(options={}){
  const p=dbParts();
  if(!p.confirm||!p.confirmOk||!p.confirmCancel){return Promise.resolve(window.confirm(options.copy||'Lanjutkan?'))}
  if(p.confirmTitle)p.confirmTitle.textContent=options.title||'Lanjutkan?';
  if(p.confirmCopy)p.confirmCopy.textContent=options.copy||'';
  p.confirmOk.innerHTML=`<span>${escapeHTML(options.label||'Lanjutkan')}</span><span>${options.danger===false?'→':'!'}</span>`;
  p.confirmOk.classList.toggle('danger',options.danger!==false);
  p.confirm.classList.add('open');p.confirm.setAttribute('aria-hidden','false');
  return new Promise(resolve=>{
    dbConfirmResolve=resolve;
    requestAnimationFrame(()=>{try{p.confirmCancel.focus({preventScroll:true})}catch(e){}});
  });
}
function dbResolveConfirm(value){
  const p=dbParts();
  if(p.confirm){p.confirm.classList.remove('open');p.confirm.setAttribute('aria-hidden','true')}
  const resolve=dbConfirmResolve;dbConfirmResolve=null;
  if(resolve)resolve(!!value);
}
function openDatabasePage(){
  if(!databasePageInitialized)initDatabasePage();
  const page=document.getElementById('dbPage');if(!page)return;
  if(!page.classList.contains('open')){const active=document.activeElement;dbReturnFocus=active&&active!==document.body?active:null}
  page.classList.add('open');page.setAttribute('aria-hidden','false');document.body.classList.add('db-writing');
  if(databaseState.db&&databaseState.view==='start')databaseState.view='workspace';
  dbShowView(databaseState.view||'start');
  if(databaseState.view==='workspace')dbRenderWorkspace();
  else if(databaseState.view==='wizard')dbRenderWizard();
  setTimeout(()=>{
    const target=document.querySelector('#dbPage [data-db-autofocus]')||document.querySelector('#dbPage .db-body button:not(:disabled)');
    if(target&&target.getClientRects().length)try{target.focus({preventScroll:true})}catch(e){}
  },70);
}
function closeDatabasePage(){
  const page=document.getElementById('dbPage');if(!page||!page.classList.contains('open'))return;
  page.classList.remove('open');page.setAttribute('aria-hidden','true');document.body.classList.remove('db-writing');
  const target=dbReturnFocus||document.querySelector('button[data-tool="database"]');dbReturnFocus=null;
  if(target&&document.contains(target)){try{target.focus({preventScroll:true})}catch(e){}}
  if(databaseState.db)showToast('Database tetap tersimpan di tab ini. Simpan .db sebelum menutup tab.');
}

function dbReadTables(){
  const s=databaseState;
  if(!s.db){s.tables=[];s.active=null;return}
  const res=s.db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name COLLATE NOCASE");
  const names=res.length?res[0].values.map(row=>String(row[0])):[];
  s.tables=names.map(name=>{
    const quoted=dbQuoteIdent(name);
    let columns=[];
    try{
      const info=s.db.exec(`PRAGMA table_info(${dbQuoteLiteral(name)})`);
      if(info.length)columns=info[0].values.map(row=>({name:String(row[1]),type:String(row[2]||''),notnull:!!row[3],defaultValue:row[4],pk:!!row[5],kind:dbTypeKind(row[2])}));
    }catch(e){}
    let rowCount=0;
    try{const count=s.db.exec(`SELECT COUNT(*) FROM ${quoted}`);rowCount=count.length?Number(count[0].values[0][0])||0:0}catch(e){}
    let hasRowid=true;
    try{s.db.exec(`SELECT rowid FROM ${quoted} LIMIT 1`)}catch(e){hasRowid=false}
    let rowKey='';
    if(hasRowid){rowKey='__paperly_rowid__';while(columns.some(c=>c.name.toLowerCase()===rowKey.toLowerCase()))rowKey='_'+rowKey}
    return {name,columns,rowCount,hasRowid,rowKey};
  });
  if(!s.tables.some(t=>t.name===s.active))s.active=s.tables[0]?s.tables[0].name:null;
}
function dbRenderWorkspace(){
  if(!databaseState.db){dbShowView('start');return}
  dbRenderTableList();dbRenderGrid();dbUpdateChrome();
}
function dbRenderTableList(){
  const p=dbParts(),s=databaseState;
  if(p.tableCount)p.tableCount.textContent=String(s.tables.length);
  if(p.tablesEmpty)p.tablesEmpty.hidden=s.tables.length>0;
  if(p.tableList)p.tableList.innerHTML=s.tables.map(t=>`<button type="button" class="db-table-item${t.name===s.active?' active':''}" data-db-table="${escapeHTML(t.name)}"${t.name===s.active?' data-db-autofocus':''}><span class="db-table-name">${escapeHTML(t.name)}</span><span class="db-table-count">${t.rowCount.toLocaleString('id-ID')}</span></button>`).join('');
}
function dbSelectTable(name){
  const t=databaseState.tables.find(table=>table.name===name);if(!t)return;
  databaseState.active=name;databaseState.page=0;
  dbRenderTableList();dbRenderGrid();dbUpdateChrome();
}
function dbNoTableHTML(){
  return `<div class="db-grid-empty"><span class="db-empty-icon">${icon('database')}</span><strong>Belum ada tabel data</strong><p>Database ini kosong. Gunakan wizard untuk membuat tabel dan kolom tanpa menulis SQL.</p><button type="button" class="mini-button" data-db-new-wizard>Buat database baru</button></div>`;
}
function dbRenderGrid(){
  const p=dbParts(),s=databaseState,t=dbActiveTable();
  s.rows=[];s.columns=t?t.columns:[];
  if(!p.grid)return;
  if(!t){p.grid.innerHTML=dbNoTableHTML();dbUpdateChrome();return}
  const pages=Math.max(1,Math.ceil(t.rowCount/DB_PAGE_SIZE));
  s.page=Math.max(0,Math.min(pages-1,s.page));
  let rows=[];
  try{
    const stmt=s.db.prepare(`SELECT ${t.rowKey?`rowid AS ${dbQuoteIdent(t.rowKey)}, `:''}* FROM ${dbQuoteIdent(t.name)} LIMIT ? OFFSET ?`);
    stmt.bind([DB_PAGE_SIZE,s.page*DB_PAGE_SIZE]);
    while(stmt.step())rows.push(stmt.getAsObject());
    stmt.free();
  }catch(e){
    p.grid.innerHTML=`<div class="db-grid-empty"><strong>Tabel tidak dapat ditampilkan</strong><p>${escapeHTML(e.message||'Pastikan tabel masih valid dan tidak terkunci.')}</p></div>`;
    dbUpdateChrome();return;
  }
  s.rows=rows;
  let html=`<table class="db-grid" aria-label="Tabel ${escapeHTML(t.name)}"><thead><tr><th class="db-rowno-head" scope="col">#</th>`;
  for(const col of t.columns)html+=`<th scope="col"><span class="db-col-name">${escapeHTML(col.name)}</span><span class="db-col-type">${escapeHTML(dbTypeLabel(col.kind))}${col.pk?' · kunci':''}</span></th>`;
  html+='<th class="db-row-actions-head" scope="col"><span aria-hidden="true">×</span></th></tr></thead><tbody>';
  if(!rows.length){
    html+=`<tr><td class="db-empty-row" colspan="${t.columns.length+2}">Tabel ini belum memiliki baris.${t.rowKey||t.columns.some(c=>c.pk)?' Klik <strong>+ Baris</strong> untuk menambahkan.':' Baris tidak dapat ditambah karena tabel tidak memiliki kunci.'}</td></tr>`;
  }else{
    rows.forEach((row,i)=>{html+=dbRowHTML(t,row,i,s.page*DB_PAGE_SIZE+i)});
  }
  html+='</tbody></table>';
  p.grid.innerHTML=html;p.grid.scrollTop=0;dbUpdateChrome();
}
function dbRowHTML(table,row,localIndex,displayIndex){
  const canEditRow=!!table.rowKey||table.columns.some(c=>c.pk);
  let attrs=`data-local-index="${localIndex}"`;
  if(table.rowKey)attrs+=` data-rowid="${escapeHTML(String(row[table.rowKey]))}"`;
  if(!table.rowKey&&table.columns.some(c=>c.pk))attrs+=` data-pk="${escapeHTML(JSON.stringify(table.columns.filter(c=>c.pk).map(c=>row[c.name]??null)))}"`;
  const cells=table.columns.map((col,index)=>`<td class="db-cell-td">${dbCellHTML(col,row[col.name],displayIndex+1,canEditRow)}</td>`).join('');
  return `<tr ${attrs}><th class="db-rowno" scope="row">${displayIndex+1}</th>${cells}<td class="db-row-actions"><button type="button" class="db-row-del" data-db-del-row aria-label="Hapus baris ${displayIndex+1}" title="Hapus baris"${canEditRow?'':' disabled'}>×</button></td></tr>`;
}
function dbCellHTML(col,value,rowNumber,canEdit){
  if(value&&typeof value==='object'&&value.constructor===Uint8Array)return `<span class="db-blob">Biner · ${formatBytes(value.byteLength)}</span>`;
  const isNull=value===null||value===undefined;
  const label=`${col.name}, baris ${rowNumber}`;
  if(col.kind==='BOOLEAN'){
    const current=isNull?'':(Number(value)?'1':'0');
    return `<select class="db-cell-select${isNull?' is-null':''}" data-db-cell data-col="${escapeHTML(col.name)}" aria-label="${escapeHTML(label)}"${canEdit?'':' disabled'}><option value=""${current===''?' selected':''}>NULL</option><option value="1"${current==='1'?' selected':''}>Ya</option><option value="0"${current==='0'?' selected':''}>Tidak</option></select>`;
  }
  const mode=col.kind==='INTEGER'?'numeric':col.kind==='REAL'?'decimal':'text';
  return `<input class="db-cell-input${isNull?' is-null':''}" type="text" inputmode="${mode}" value="${isNull?'':escapeHTML(dbDisplayValue(value))}" placeholder="NULL" data-db-cell data-col="${escapeHTML(col.name)}" aria-label="${escapeHTML(label)}" autocomplete="off" spellcheck="false"${canEdit?'':' readonly'}>`;
}
function dbRowWhere(table,tr){
  if(!tr)return null;
  if(table.rowKey)return {sql:'rowid = ?',params:[dbNumberIfPossible(tr.dataset.rowid)]};
  const pk=table.columns.filter(c=>c.pk);
  if(pk.length){
    let values=[];
    try{values=JSON.parse(tr.dataset.pk||'[]')}catch(e){}
    if(values.length!==pk.length||values.some(value=>value&&typeof value==='object'))return null;
    const params=values.map((value,index)=>pk[index]&&['INTEGER','REAL','BOOLEAN'].includes(pk[index].kind)?dbNumberIfPossible(value):value);
    return {sql:pk.map(c=>`${dbQuoteIdent(c.name)} IS ?`).join(' AND '),params};
  }
  return null;
}
function dbApplyCellVisual(input,value){
  if(input.tagName==='SELECT'){
    input.value=value===null||value===undefined?'':(Number(value)?'1':'0');
    input.classList.toggle('is-null',value===null||value===undefined);
  }else{
    input.value=dbDisplayValue(value);
    input.classList.toggle('is-null',value===null||value===undefined);
  }
}
function dbRestoreCell(input){
  const tr=input?input.closest('tr[data-local-index]'):null,row=tr?databaseState.rows[+tr.dataset.localIndex]:null;
  if(!row)return;
  dbApplyCellVisual(input,row[input.dataset.col]);
}
function dbCommitCell(input){
  const s=databaseState,tr=input?input.closest('tr[data-local-index]'):null,table=dbActiveTable();
  if(!tr||!table||!s.db||s.busy)return;
  const col=table.columns.find(c=>c.name===input.dataset.col),row=s.rows[+tr.dataset.localIndex];
  if(!col||!row||input.readOnly||input.disabled)return;
  const original=row[col.name];
  let next;
  if(input.tagName==='SELECT'){
    next=input.value===''?null:Number(input.value);
  }else{
    const raw=input.value;
    if(raw==='')next=null;
    else if(col.kind==='INTEGER'&&/^-?\d+$/.test(raw.trim()))next=Number(raw);
    else if(col.kind==='REAL'&&raw.trim()!==''&&Number.isFinite(Number(raw)))next=Number(raw);
    else next=raw;
  }
  if(dbValuesEqual(original,next)){dbApplyCellVisual(input,original);return}
  const where=dbRowWhere(table,tr);
  if(!where){dbRestoreCell(input);showToast('Tabel ini tidak memiliki kunci baris, jadi sel tidak dapat diubah.');return}
  try{
    s.db.run(`UPDATE ${dbQuoteIdent(table.name)} SET ${dbQuoteIdent(col.name)} = ? WHERE ${where.sql}`,[next,...where.params]);
  }catch(e){
    dbRestoreCell(input);showToast('Nilai gagal disimpan: '+(e.message||'terjadi kesalahan pada database'));return;
  }
  row[col.name]=next;dbApplyCellVisual(input,next);dbMarkDirty();
}
function dbFocusCell(localIndex,colIndex){
  const tr=document.querySelector(`#dbGridScroll tr[data-local-index="${localIndex}"]`);if(!tr)return false;
  const cell=tr.querySelectorAll('[data-db-cell]')[colIndex];if(!cell)return false;
  cell.focus({preventScroll:false});
  if(cell.select&&cell.tagName!=='SELECT')cell.select();
  return true;
}
function dbHandleCellKey(event){
  const input=event.target;
  if(!input||!input.matches('[data-db-cell]'))return;
  const tr=input.closest('tr[data-local-index]');if(!tr)return;
  const row=+tr.dataset.localIndex,col=[...tr.querySelectorAll('[data-db-cell]')].indexOf(input);
  if(event.key==='Enter'){
    event.preventDefault();dbCommitCell(input);
    if(!dbFocusCell(row+1,col))dbFocusCell(row-1,col);return;
  }
  if(event.key==='Escape'){event.preventDefault();dbRestoreCell(input);input.blur();return}
  if(event.key==='ArrowDown'){event.preventDefault();dbCommitCell(input);dbFocusCell(row+1,col);return}
  if(event.key==='ArrowUp'){event.preventDefault();dbCommitCell(input);dbFocusCell(row-1,col);return}
  if(event.key==='ArrowLeft'&&input.selectionStart===0&&input.selectionEnd===0){event.preventDefault();dbCommitCell(input);dbFocusCell(row,col-1);return}
  if(event.key==='ArrowRight'&&input.tagName!=='SELECT'&&input.selectionStart===input.value.length&&input.selectionEnd===input.value.length){event.preventDefault();dbCommitCell(input);dbFocusCell(row,col+1)}
}
function dbDefaultForColumn(col){
  const today=new Date(),pad=n=>String(n).padStart(2,'0');
  const iso=`${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  if(col.kind==='INTEGER'||col.kind==='REAL'||col.kind==='BOOLEAN')return 0;
  if(col.kind==='DATE')return iso;
  if(col.kind==='DATETIME')return `${iso} ${pad(today.getHours())}:${pad(today.getMinutes())}`;
  if(col.kind==='BLOB')return new Uint8Array(0);
  return '';
}
function dbAddRow(){
  const s=databaseState,t=dbActiveTable();if(!t||!s.db||s.busy)return;
  const writable=t.columns.filter(c=>!(c.pk&&c.kind==='INTEGER'&&t.columns.filter(x=>x.pk).length===1));
  const values=[];
  for(const col of writable){
    if(!col.notnull||col.defaultValue!==null&&col.defaultValue!==undefined)continue;
    values.push({name:col.name,value:dbDefaultForColumn(col)});
  }
  try{
    if(values.length)s.db.run(`INSERT INTO ${dbQuoteIdent(t.name)} (${values.map(v=>dbQuoteIdent(v.name)).join(',')}) VALUES (${values.map(()=>'?').join(',')})`,values.map(v=>v.value));
    else s.db.run(`INSERT INTO ${dbQuoteIdent(t.name)} DEFAULT VALUES`);
  }catch(e){showToast('Baris gagal ditambahkan: '+(e.message||'terjadi kesalahan pada database'));return}
  const count=s.db.exec(`SELECT COUNT(*) FROM ${dbQuoteIdent(t.name)}`);
  t.rowCount=count.length?Number(count[0].values[0][0])||0:0;
  s.page=Math.max(0,Math.ceil(t.rowCount/DB_PAGE_SIZE)-1);
  dbRenderTableList();dbRenderGrid();dbMarkDirty();
  setTimeout(()=>dbFocusCell(s.rows.length-1,0),40);
}
async function dbDeleteRow(tr){
  const s=databaseState,t=dbActiveTable();if(!t||!s.db||s.busy||!tr)return;
  const where=dbRowWhere(t,tr);
  if(!where){showToast('Baris ini tidak memiliki kunci, jadi tidak dapat dihapus.');return}
  const ok=await dbAskConfirm({title:'Hapus baris ini?',copy:'Isi baris akan dihapus permanen dari database. Tindakan ini tidak bisa dibatalkan.',label:'Hapus baris'});
  if(!ok)return;
  try{s.db.run(`DELETE FROM ${dbQuoteIdent(t.name)} WHERE ${where.sql}`,where.params)}
  catch(e){showToast('Baris gagal dihapus: '+(e.message||'terjadi kesalahan pada database'));return}
  const count=s.db.exec(`SELECT COUNT(*) FROM ${dbQuoteIdent(t.name)}`);
  t.rowCount=count.length?Number(count[0].values[0][0])||0:0;
  if(s.page>Math.max(0,Math.ceil(t.rowCount/DB_PAGE_SIZE)-1))s.page=Math.max(0,Math.ceil(t.rowCount/DB_PAGE_SIZE)-1);
  dbRenderTableList();dbRenderGrid();dbMarkDirty();showToast('Baris dihapus dari database.');
}
function dbChangePage(delta){
  const t=dbActiveTable();if(!t)return;
  const pages=Math.max(1,Math.ceil(t.rowCount/DB_PAGE_SIZE));
  const next=Math.max(0,Math.min(pages-1,databaseState.page+delta));
  if(next===databaseState.page)return;
  databaseState.page=next;dbRenderGrid();
}

function dbDisposeDatabase(){
  const db=databaseState.db;
  if(db){try{db.close()}catch(e){}}
  databaseState.db=null;databaseState.tables=[];databaseState.active=null;databaseState.page=0;databaseState.rows=[];databaseState.columns=[];
}
function dbLoadDatabase(db,name,options={}){
  if(databaseState.db&&databaseState.db!==db){
    try{databaseState.db.close()}catch(e){}
  }
  databaseState.db=db;
  databaseState.name=sanitizeFileStem(String(name||'database').replace(/\.(db|sqlite3?)$/i,''),'database');
  databaseState.dirty=!!options.dirty;
  databaseState.page=0;
  const input=document.getElementById('dbName');if(input)input.value=databaseState.name;dbSyncNameWidth();
  dbReadTables();
  dbShowView('workspace');
  dbRenderWorkspace();
  if(databaseState.dirty)dbUpdateChrome();
}
function dbSaveDatabase(){
  const s=databaseState;if(!s.db||s.busy)return;
  try{
    const bytes=s.db.export(),blob=new Blob([bytes],{type:'application/vnd.sqlite3'});
    download(blob,dbBaseName()+'.db','application/vnd.sqlite3',name=>dbMarkSaved(name));
  }catch(e){showToast('Database gagal disimpan: '+(e.message||'terjadi kesalahan pada database'))}
}
function dbStartError(message){
  const el=document.getElementById('dbStartError');
  if(el){el.textContent=message||'';el.hidden=!message}
  if(message)showToast(message);
}
async function dbOpenFile(file){
  if(!file)return;
  if(file.size>DB_MAX_FILE){dbStartError('Ukuran file melebihi 80 MB. Mesin SQLite di browser memuat seluruh file ke memori.');return}
  if(databaseState.db&&databaseState.dirty){
    const ok=await dbAskConfirm({title:'Ganti database yang sedang dibuka?',copy:'Database saat ini masih memiliki perubahan yang belum disimpan. File baru akan menggantinya.',label:'Ganti database',danger:false});
    if(!ok)return;
  }
  dbSetBusy(true,'Membaca file database…');dbStartError('');
  try{
    const SQL=await ensureSqlJs();
    const bytes=new Uint8Array(await file.arrayBuffer());
    if(bytes.length<16){throw Error('File terlalu kecil untuk menjadi database SQLite yang valid.')}
    let header='';for(let i=0;i<16;i++)header+=String.fromCharCode(bytes[i]);
    if(header!=='SQLite format 3\u0000')throw Error('File ini bukan database SQLite standar. Pastikan file tidak dienkripsi.');
    let db=null;
    try{
      db=new SQL.Database(bytes);
      const probe=db.exec('SELECT count(*) FROM sqlite_master');
      if(!probe.length)throw Error('Struktur database tidak dapat dibaca.');
    }catch(e){if(db)try{db.close()}catch(err){};throw e}
    const name=file.name.replace(/\.(db|sqlite3?)$/i,'')||'database';
    dbLoadDatabase(db,name);
    const total=databaseState.tables.length;
    showToast(`Database dibuka. ${total} tabel ditemukan.`);
  }catch(e){
    dbStartError('Gagal membuka database: '+(e.message||'file tidak dikenali'));
  }finally{
    dbSetBusy(false);
  }
}
function dbHandleDroppedFile(event){
  event.preventDefault();
  const drop=document.getElementById('dbDropzone');if(drop)drop.classList.remove('dragover');
  const file=event.dataTransfer&&event.dataTransfer.files&&event.dataTransfer.files[0];
  if(file)dbOpenFile(file);
}

function dbFetchAllRows(name,limit){
  const rows=[],stmt=databaseState.db.prepare(`SELECT * FROM ${dbQuoteIdent(name)} LIMIT ?`);
  stmt.bind([limit]);while(stmt.step())rows.push(stmt.getAsObject());stmt.free();return rows;
}
function dbPdfText(value){
  if(value===null||value===undefined)return 'NULL';
  if(typeof value==='object'&&value.constructor===Uint8Array)return `Biner (${formatBytes(value.byteLength)})`;
  let text=String(value).replace(/[\r\n\t]+/g,' ').replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,'-').replace(/\u2026/g,'...');
  return text.replace(/[^\x20-\x7E\xA0-\xFF]/g,'?');
}
function dbWrapPdfText(text,font,size,maxWidth,maxLines){
  const words=String(text||'').split(/\s+/).filter(Boolean),lines=[];let current='';
  const fits=value=>{try{return font.widthOfTextAtSize(value,size)<=maxWidth}catch(e){return false}};
  for(const word of words){
    if(!fits(word)&&word.length>1){
      let piece='';
      for(const char of word){
        if(fits(piece+char))piece+=char;
        else{if(piece)lines.push(piece);piece=char}
      }
      if(piece){if(current&&fits(current+' '+piece))current+=' '+piece;else{if(current)lines.push(current);current=piece}}
    }else if(!current)current=word;
    else if(fits(current+' '+word))current+=' '+word;
    else{lines.push(current);current=word}
  }
  if(current)lines.push(current);
  if(!lines.length)lines.push('');
  if(lines.length<=maxLines)return lines;
  const trimmed=lines.slice(0,maxLines);let last=trimmed[maxLines-1];
  while(last.length>1&&!fits(last+'…'))last=last.slice(0,-1);
  trimmed[maxLines-1]=last+'…';return trimmed;
}
function dbColumnWidths(columns,rows,available){
  const weights=columns.map(col=>{
    let longest=col.name.length;
    for(const row of rows.slice(0,120)){
      const length=dbPdfText(row[col.name]).length;
      if(length>longest)longest=length;
    }
    return Math.max(5,Math.min(longest,34));
  });
  const total=weights.reduce((a,b)=>a+b,0)||1;
  let widths=weights.map(weight=>Math.max(42,available*weight/total));
  const sum=widths.reduce((a,b)=>a+b,0);
  if(sum>available)widths=widths.map(width=>width*available/sum);
  const leftover=available-widths.reduce((a,b)=>a+b,0);
  if(leftover>0.5)widths=widths.map(width=>width+leftover/columns.length);
  return widths;
}
async function dbBuildPdf(names,onProgress){
  const doc=await PDFDocument.create();
  const font=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold);
  const pageW=842,pageH=595,margin=36,contentW=pageW-2*margin;
  const ink=rgb(.227,.188,.098),muted=rgb(.478,.443,.365),line=rgb(.91,.882,.824),headFill=rgb(.965,.945,.898),altFill=rgb(.984,.976,.957);
  const pages=[];let page=null,y=0;
  const newPage=()=>{
    page=doc.addPage([pageW,pageH]);pages.push(page);y=pageH-margin;
  };
  newPage();
  page.drawText('Database SQLite',{x:margin,y:y-20,size:20,font:bold,color:ink});
  page.drawText(dbPdfText(dbBaseName()+'.db'),{x:margin,y:y-37,size:10,font,color:muted});
  page.drawText(dbPdfText(new Date().toLocaleString('id-ID')),{x:margin,y:y-50,size:8,font,color:muted});
  y-=68;
  const totalRows=names.reduce((sum,name)=>sum+(databaseState.tables.find(t=>t.name===name)?.rowCount||0),0);
  page.drawText(dbPdfText(`${names.length} tabel · ${totalRows.toLocaleString('id-ID')} baris`),{x:margin,y:y-10,size:8.5,font,color:muted});
  y-=24;
  if(!names.length)page.drawText('Tidak ada tabel untuk diekspor.',{x:margin,y:y-12,size:9,font,color:muted});
  let processed=0;
  for(const name of names){
    const table=databaseState.tables.find(t=>t.name===name);if(!table)continue;
    const allRows=dbFetchAllRows(name,DB_PDF_ROW_LIMIT);
    const truncated=table.rowCount>allRows.length;
    const columns=table.columns;
    if(!columns.length){y-=24;continue}
    const fontSize=columns.length>14?5.6:columns.length>10?6.2:columns.length>7?6.8:7.6;
    const lineHeight=fontSize+2.4,headerHeight=fontSize*2.2+10;
    const widths=dbColumnWidths(columns,allRows,contentW);
    if(y-30-headerHeight-lineHeight*2<margin+22)newPage(name,`${allRows.length} baris · ${columns.length} kolom`);
    page.drawText(dbPdfText(name),{x:margin,y:y-11,size:12,font:bold,color:ink});
    const meta=`${allRows.length.toLocaleString('id-ID')} baris · ${columns.length} kolom${truncated?' · dibatasi '+DB_PDF_ROW_LIMIT.toLocaleString('id-ID')+' baris':''}`;
    let metaWidth=70;try{metaWidth=font.widthOfTextAtSize(dbPdfText(meta),7.5)}catch(e){}
    page.drawText(dbPdfText(meta),{x:pageW-margin-metaWidth,y:y-10,size:7.5,font,color:muted});
    y-=30;
    const drawHeader=()=>{
      page.drawRectangle({x:margin,y:y-headerHeight,width:contentW,height:headerHeight,color:headFill});
      let x=margin;
      columns.forEach((col,index)=>{
        const label=dbWrapPdfText(dbPdfText(col.name)+' · '+dbTypeLabel(col.kind),bold,fontSize*.88,widths[index]-8,1)[0]||'';
        page.drawText(label,{x:x+4,y:y-headerHeight/2-fontSize*.34,size:fontSize*.88,font:bold,color:ink});
        x+=widths[index];
      });
      let gx=margin;
      widths.forEach(width=>{gx+=width;if(gx<margin+contentW-.2)page.drawLine({start:{x:gx,y:y-headerHeight},end:{x:gx,y:y},thickness:.4,color:line})});
      page.drawLine({start:{x:margin,y:y-headerHeight},end:{x:margin+contentW,y:y-headerHeight},thickness:.6,color:line});
      y-=headerHeight;
    };
    drawHeader();
    if(!allRows.length){
      page.drawText('Tidak ada baris pada tabel ini.',{x:margin+4,y:y-14,size:8,font,color:muted});
      y-=24;
    }
    for(let index=0;index<allRows.length;index++){
      const row=allRows[index];
      const cellLines=columns.map(col=>dbWrapPdfText(dbPdfText(row[col.name]),font,fontSize,widths[columns.indexOf(col)]-8,4));
      let maxLines=1;for(const lines of cellLines)if(lines.length>maxLines)maxLines=lines.length;
      const rowHeight=Math.max(fontSize+7,maxLines*lineHeight+5);
      if(y-rowHeight<margin+22){newPage(name+' (lanjutan)',`${allRows.length.toLocaleString('id-ID')} baris · ${columns.length} kolom`);drawHeader()}
      if(index%2===1)page.drawRectangle({x:margin,y:y-rowHeight,width:contentW,height:rowHeight,color:altFill});
      let x=margin;
      cellLines.forEach((lines,colIndex)=>{
        let textY=y-4-fontSize;
        for(const text of lines){if(text)page.drawText(text,{x:x+4,y:textY,size:fontSize,font,color:ink});textY-=lineHeight}
        x+=widths[colIndex];
      });
      let gx=margin;
      widths.forEach(width=>{gx+=width;if(gx<margin+contentW-.2)page.drawLine({start:{x:gx,y:y-rowHeight},end:{x:gx,y:y},thickness:.3,color:line})});
      page.drawLine({start:{x:margin,y:y-rowHeight},end:{x:margin+contentW,y:y-rowHeight},thickness:.4,color:line});
      y-=rowHeight;
      processed++;
      if(onProgress&&processed%150===0){onProgress(processed/Math.max(1,totalRows));await new Promise(resolve=>setTimeout(resolve,0))}
    }
    y-=18;
  }
  const total=pages.length;
  pages.forEach((item,index)=>{
    item.drawText(dbPdfText(`Paperly · Database SQLite · ${index+1} / ${total}`),{x:margin,y:18,size:7,font,color:muted});
    item.drawLine({start:{x:margin,y:29},end:{x:pageW-margin,y:29},thickness:.35,color:line});
  });
  if(onProgress)onProgress(1);
  return doc.save();
}
async function dbExportPdf(names){
  const s=databaseState,button=document.getElementById('dbPdfBtn');
  if(!s.db||s.busy||!names.length)return;
  dbSetBusy(true,'Menyusun PDF dari database…');
  if(button){button.disabled=true;button.classList.add('loading');button.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Menyusun…</span>'}
  try{
    const bytes=await dbBuildPdf(names,fraction=>dbSetProgress(Math.max(2,Math.min(98,fraction*90)),'Menyusun tabel ke PDF…'));
    const suffix=names.length===1?'-'+sanitizeFileStem(names[0],'tabel'):'';
    download(bytes,dbBaseName()+suffix+'.pdf','application/pdf');
    dbFlashStatus('PDF siap disimpan');
  }catch(e){showToast('PDF gagal dibuat: '+(e.message||'terjadi kesalahan'))}
  finally{
    dbSetBusy(false);
    if(button){button.classList.remove('loading');button.innerHTML='<span>Ekspor PDF</span><span>↓</span>'}
  }
}

function dbResetWizard(){
  const w=dbWizardState;w.step=1;w.name='database-baru';w.activeTable=0;w.error='';w.focus='';
  w.tables=[{name:'Tabel 1',columns:[{name:'Nama',type:'TEXT'},{name:'Keterangan',type:'TEXT'}],rows:[]}];
  dbWizardReplaceApproved=false;
}
function dbWizardRenderStep(){
  const p=dbParts();
  if(p.body)p.body.scrollTop=0;
  if(p.wizardBody)p.wizardBody.scrollTop=0;
  dbRenderWizard();
}
function dbStartWizard(){
  dbWizardState.wizardReturnView=databaseState.view==='workspace'?'workspace':'start';
  dbResetWizard();dbShowView('wizard');dbWizardRenderStep();
  setTimeout(()=>{const input=document.getElementById('wzDbName');if(input)try{input.focus({preventScroll:true});input.select()}catch(e){}},60);
}
function dbWizardTable(){return dbWizardState.tables[dbWizardState.activeTable]||dbWizardState.tables[0]||null}
function dbWizardSqlPreview(){
  return dbWizardState.tables.map(table=>{
    const columns=table.columns.map(col=>`  ${dbQuoteIdent(col.name)} ${DB_WIZARD_TYPES[col.type].sql}${col.notnull?' NOT NULL':''}`);
    return `CREATE TABLE ${dbQuoteIdent(table.name)} (\n  "id" INTEGER PRIMARY KEY AUTOINCREMENT,\n${columns.join(',\n')}\n);`;
  }).join('\n\n');
}
function dbRenderWizard(){
  const w=dbWizardState,titles=['Nama & pengaturan dasar','Struktur tabel & kolom','Isi data awal (opsional)','Selesai & unduh'];
  const p=dbParts();
  if(p.wizardTitle)p.wizardTitle.textContent=titles[w.step-1]||titles[0];
  document.querySelectorAll('#dbStepper li').forEach(li=>{
    const step=Number(li.dataset.wzStep);
    li.classList.toggle('active',step===w.step);
    li.classList.toggle('done',step<w.step);
  });
  if(p.wizardBack)p.wizardBack.hidden=w.step===1;
  if(p.wizardCancel)p.wizardCancel.classList.toggle('full-width',w.step===1);
  if(p.wizardNext)p.wizardNext.innerHTML=w.step===4?'<span>Buat &amp; unduh .db</span><span>↓</span>':'<span>Lanjut</span><span>→</span>';
  if(p.wizardError){p.wizardError.textContent=w.error||'';p.wizardError.hidden=!w.error}
  if(!p.wizardBody)return;
  const scroll=p.wizardBody.scrollTop;
  if(w.activeTable>=w.tables.length)w.activeTable=Math.max(0,w.tables.length-1);
  p.wizardBody.innerHTML=[dbWizardStep1HTML,dbWizardStep2HTML,dbWizardStep3HTML,dbWizardStep4HTML][w.step-1]();
  p.wizardBody.scrollTop=scroll;
  if(w.focus){
    const selector=w.focus;w.focus='';
    requestAnimationFrame(()=>{const target=p.wizardBody.querySelector(selector);if(target){target.focus({preventScroll:true});if(target.select)target.select()}});
  }
}
function dbWizardStep1HTML(){
  return `<div class="wz-panel">
    <div class="wz-intro"><span class="wz-step-note">LANGKAH 1 DARI 4</span><h3>Beri nama database Anda</h3><p>Nama ini dipakai sebagai nama file <strong>.db</strong> saat diunduh. Anda tetap bisa menggantinya nanti.</p></div>
    <label class="field-label" for="wzDbName">Nama file database</label>
    <div class="wz-name-row"><input id="wzDbName" class="text-field" type="text" maxlength="64" autocomplete="off" spellcheck="false" value="${escapeHTML(dbWizardState.name)}" placeholder="Contoh: data-toko"><span>.db</span></div>
    <p class="field-hint">Gunakan huruf, angka, spasi, titik, atau tanda hubung. Karakter yang tidak didukung akan diganti otomatis.</p>
    <div class="wz-info"><span aria-hidden="true">✓</span><span>Database dibuat sepenuhnya di browser Anda. Tidak perlu akun atau koneksi internet.</span></div>
  </div>`;
}
function dbWizardStep2HTML(){
  const tables=dbWizardState.tables.map((table,tableIndex)=>{
    const columns=table.columns.map((col,colIndex)=>{
      const options=Object.entries(DB_WIZARD_TYPES).map(([key,meta])=>`<option value="${key}"${col.type===key?' selected':''}>${meta.label}</option>`).join('');
      return `<div class="wz-col-row">
        <input class="text-field wz-col-name-input" type="text" maxlength="48" value="${escapeHTML(col.name)}" data-wz-col-name aria-label="Nama kolom ${colIndex+1} pada ${escapeHTML(table.name)}" placeholder="Nama kolom">
        <select class="text-field wz-col-type-input" data-wz-col-type aria-label="Tipe data kolom ${colIndex+1}">${options}</select>
        <label class="wz-check"><input type="checkbox" data-wz-col-required${col.notnull?' checked':''} aria-label="Wajib diisi kolom ${colIndex+1}"> Wajib</label>
        <button type="button" class="wz-icon-btn" data-wz-del-col aria-label="Hapus kolom ${colIndex+1}"${table.columns.length<=1?' disabled':''}>×</button>
      </div>`;
    }).join('');
    return `<article class="wz-table-card">
      <header class="wz-table-head"><div><span class="field-label">Nama tabel ${tableIndex+1}</span><input class="text-field" type="text" maxlength="48" value="${escapeHTML(table.name)}" data-wz-table-name aria-label="Nama tabel ${tableIndex+1}" placeholder="Nama tabel"></div><button type="button" class="mini-button" data-wz-del-table${dbWizardState.tables.length<=1?' disabled':''}>Hapus tabel</button></header>
      <div class="wz-col-head"><span>Nama kolom</span><span>Tipe data</span><span>Wajib</span><span aria-hidden="true"></span></div>
      <div class="wz-cols">${columns}</div>
      <button type="button" class="mini-button" data-wz-add-col>+ Tambah kolom</button>
    </article>`;
  }).join('');
  return `<div class="wz-panel">
    <div class="wz-intro"><span class="wz-step-note">LANGKAH 2 DARI 4</span><h3>Susun tabel dan kolom</h3><p>Tambahkan tabel lalu tentukan kolom beserta tipe datanya. Tidak perlu menulis SQL — kami menyiapkan strukturnya untuk Anda.</p></div>
    <div class="wz-tables">${tables}</div>
    <button type="button" class="button-quiet" data-wz-add-table>+ Tambah tabel</button>
    <p class="field-hint">Setiap tabel otomatis mendapat kolom <code>id</code> sebagai kunci utama. Hindari nama kolom <code>id</code> karena sudah disiapkan.</p>
  </div>`;
}
function dbWizardCellHTML(col,value,rowNumber){
  const label=`${col.name}, baris ${rowNumber}`,safeValue=escapeHTML(String(value??''));
  if(col.type==='BOOLEAN'){
    const current=String(value??'');
    return `<select class="wz-cell" data-wz-cell aria-label="${escapeHTML(label)}"><option value=""${current===''?' selected':''}>— (kosong)</option><option value="1"${current==='1'?' selected':''}>Ya</option><option value="0"${current==='0'?' selected':''}>Tidak</option></select>`;
  }
  let type='text',extra='';
  if(col.type==='DATE')type='date';
  else if(col.type==='DATETIME')type='datetime-local';
  else if(col.type==='INTEGER')extra=' inputmode="numeric"';
  else if(col.type==='REAL')extra=' inputmode="decimal"';
  return `<input class="wz-cell" type="${type}"${extra} value="${safeValue}" data-wz-cell aria-label="${escapeHTML(label)}" autocomplete="off">`;
}
function dbWizardStep3HTML(){
  const table=dbWizardTable();
  if(!table)return `<div class="wz-panel"><div class="wz-intro"><h3>Belum ada tabel</h3><p>Kembali ke langkah sebelumnya untuk menambahkan tabel.</p></div></div>`;
  const tabs=dbWizardState.tables.map((item,index)=>`<button type="button" class="wz-tab${item===table?' active':''}" data-wz-tab="${index}">${escapeHTML(item.name||`Tabel ${index+1}`)}</button>`).join('');
  const head=`<tr><th class="wz-rowno" scope="col">#</th>${table.columns.map(col=>`<th scope="col"><span>${escapeHTML(col.name)}</span><small>${escapeHTML(DB_WIZARD_TYPES[col.type].label)}</small></th>`).join('')}<th scope="col"><span aria-hidden="true">×</span></th></tr>`;
  const rows=table.rows.map((row,rowIndex)=>`<tr data-wz-row="${rowIndex}"><th class="wz-rowno" scope="row">${rowIndex+1}</th>${table.columns.map((col,colIndex)=>`<td>${dbWizardCellHTML(col,row[colIndex],rowIndex+1)}</td>`).join('')}<td><button type="button" class="wz-icon-btn" data-wz-del-row="${rowIndex}" aria-label="Hapus baris ${rowIndex+1}">×</button></td></tr>`).join('');
  return `<div class="wz-panel">
    <div class="wz-intro"><span class="wz-step-note">LANGKAH 3 DARI 4</span><h3>Isi data awal (opsional)</h3><p>Anda bisa mengisi beberapa baris sekarang, atau langsung lanjut. Data tetap bisa ditambahkan lewat editor setelah database dibuat.</p></div>
    <div class="wz-tabs" role="tablist" aria-label="Pilih tabel">${tabs}</div>
    <div class="wz-sheet-wrap"><table class="wz-sheet"><thead>${head}</thead><tbody>${rows||`<tr><td class="wz-empty-row" colspan="${table.columns.length+2}">Belum ada baris. Klik tombol di bawah untuk menambahkan.</td></tr>`}</tbody></table></div>
    <button type="button" class="mini-button" data-wz-add-row>+ Tambah baris pada ${escapeHTML(table.name||'tabel ini')}</button>
    <p class="field-hint">Kosongkan sel bila nilainya belum ada. Kolom <code>id</code> diisi otomatis oleh SQLite.</p>
  </div>`;
}
function dbWizardStep4HTML(){
  const w=dbWizardState,totalColumns=w.tables.reduce((sum,t)=>sum+t.columns.length,0),totalRows=w.tables.reduce((sum,t)=>sum+t.rows.length,0);
  return `<div class="wz-panel">
    <div class="wz-finish"><span class="wz-finish-icon" aria-hidden="true">✓</span><span class="wz-step-note">LANGKAH 4 DARI 4</span><h3>Database siap dibuat</h3><p>Periksa ringkasan berikut. Tombol <strong>Buat &amp; unduh .db</strong> akan menyimpan file database dan membukanya di editor.</p></div>
    <dl class="wz-summary">
      <div><dt>Nama file</dt><dd>${escapeHTML(dbWizardBaseName())}.db</dd></div>
      <div><dt>Jumlah tabel</dt><dd>${w.tables.length}</dd></div>
      <div><dt>Total kolom</dt><dd>${totalColumns}</dd></div>
      <div><dt>Baris awal</dt><dd>${totalRows}</dd></div>
    </dl>
    <div class="wz-table-summary">${w.tables.map(t=>`<article><strong>${escapeHTML(t.name)}</strong><span>${t.columns.length} kolom · ${t.rows.length} baris awal</span><small>${t.columns.map(c=>escapeHTML(c.name)).join(', ')}</small></article>`).join('')}</div>
    <details class="wz-sql"><summary>Lihat struktur SQL yang akan dibuat</summary><pre>${escapeHTML(dbWizardSqlPreview())}</pre></details>
    <button type="button" class="button-quiet" data-wz-open>Buat dan buka di editor saja</button>
  </div>`;
}

function dbWizardValidate(step){
  const w=dbWizardState;
  if(step===1)return String(w.name||'').trim()?'':'Nama file database wajib diisi.';
  if(step===2){
    if(!w.tables.length)return 'Tambahkan minimal satu tabel.';
    const tableNames=new Set();
    for(const table of w.tables){
      const name=String(table.name||'').trim();
      if(!name)return 'Nama tabel wajib diisi.';
      if(/^sqlite_/i.test(name))return `Nama tabel "${name}" tidak boleh diawali sqlite_.`;
      if(tableNames.has(name.toLowerCase()))return `Nama tabel "${name}" sudah digunakan.`;
      tableNames.add(name.toLowerCase());
      if(!table.columns.length)return `Tabel "${name}" harus memiliki minimal satu kolom.`;
      const columnNames=new Set();
      for(const col of table.columns){
        const columnName=String(col.name||'').trim();
        if(!columnName)return `Nama kolom pada tabel "${name}" wajib diisi.`;
        if(columnName.toLowerCase()==='id')return 'Kolom "id" dibuat otomatis. Gunakan nama lain.';
        if(columnNames.has(columnName.toLowerCase()))return `Kolom "${columnName}" sudah ada di tabel "${name}".`;
        columnNames.add(columnName.toLowerCase());
        if(!DB_WIZARD_TYPES[col.type])return `Tipe data kolom "${columnName}" tidak dikenali.`;
      }
    }
    return '';
  }
  if(step===3){
    for(const table of w.tables){
      for(const row of table.rows){
        for(let index=0;index<table.columns.length;index++){
          const col=table.columns[index],raw=String(row[index]??'').trim();
          if(!raw){
            if(col.notnull)return `Kolom "${col.name}" pada ${table.name} wajib diisi.`;
            continue;
          }
          if(col.type==='INTEGER'&&!/^-?\d+$/.test(raw))return `Kolom "${col.name}" hanya menerima bilangan bulat. Baris: ${raw}.`;
          if(col.type==='REAL'&&!Number.isFinite(Number(raw.replace(',','.'))))return `Kolom "${col.name}" hanya menerima angka. Baris: ${raw}.`;
        }
      }
    }
  }
  return '';
}
function dbWizardGo(direction){
  const w=dbWizardState;
  if(direction>0){
    const error=dbWizardValidate(w.step);
    if(error){w.error=error;dbWizardRenderStep();return}
    w.error='';
    if(w.step<4){w.step++;dbWizardRenderStep();return}
    dbWizardFinish(false);return;
  }
  if(w.step>1){w.step--;w.error='';dbWizardRenderStep()}
}
function dbWizardValue(value,type){
  const raw=String(value??'').trim();
  if(!raw)return null;
  if(type==='INTEGER'){const number=Number.parseInt(raw,10);return Number.isFinite(number)?number:null}
  if(type==='REAL'){const number=Number(raw.replace(',','.'));return Number.isFinite(number)?number:null}
  if(type==='BOOLEAN')return raw==='1'?1:0;
  return raw;
}
function dbWizardBuild(){
  const db=new sqlJsLib.Database();
  for(const table of dbWizardState.tables){
    const name=table.name.trim();
    const definitions=['"id" INTEGER PRIMARY KEY AUTOINCREMENT',...table.columns.map(col=>`${dbQuoteIdent(col.name.trim())} ${DB_WIZARD_TYPES[col.type].sql}${col.notnull?' NOT NULL':''}`)];
    db.run(`CREATE TABLE ${dbQuoteIdent(name)} (${definitions.join(', ')})`);
    const columns=table.columns.map(col=>dbQuoteIdent(col.name.trim())).join(', ');
    const placeholders=table.columns.map(()=>'?').join(', ');
    const stmt=db.prepare(`INSERT INTO ${dbQuoteIdent(name)} (${columns}) VALUES (${placeholders})`);
    for(const row of table.rows){
      if(!row.some(value=>String(value??'').trim()))continue;
      stmt.run(table.columns.map((col,index)=>dbWizardValue(row[index],col.type)));
    }
    stmt.free();
  }
  return db;
}
async function dbWizardFinish(openOnly){
  const w=dbWizardState;
  for(let step=1;step<=3;step++){
    const error=dbWizardValidate(step);
    if(error){w.step=step;w.error=error;dbWizardRenderStep();return}
  }
  if(databaseState.db&&databaseState.dirty&&!dbWizardReplaceApproved){
    const ok=await dbAskConfirm({title:'Ganti database yang sedang dibuka?',copy:'Database saat ini masih memiliki perubahan yang belum disimpan. Database baru akan menggantinya.',label:'Lanjutkan',danger:false});
    if(!ok)return;
    dbWizardReplaceApproved=true;
  }
  dbSetBusy(true,'Membuat struktur database…');
  try{
    await ensureSqlJs();
    const db=dbWizardBuild(),name=dbWizardBaseName();
    dbLoadDatabase(db,name,{dirty:true});
    dbMarkDirty();
    if(openOnly){showToast('Database baru dibuat. Simpan sebagai .db lewat tombol di atas.')}
    else{
      const blob=new Blob([db.export()],{type:'application/vnd.sqlite3'});
      download(blob,name+'.db','application/vnd.sqlite3',saved=>dbMarkSaved(saved));
    }
    dbResetWizard();
  }catch(e){
    w.error='Database gagal dibuat: '+(e.message||'terjadi kesalahan pada database');
    dbRenderWizard();
  }finally{dbSetBusy(false)}
}
function dbHandleWizardClick(event){
  const button=event.target.closest('button');if(!button)return;
  const w=dbWizardState;
  if(button.id==='dbWizardBack'){dbWizardGo(-1);return}
  if(button.id==='dbWizardNext'){dbWizardGo(1);return}
  if(button.id==='dbWizardCancel'){
    const view=w.wizardReturnView==='workspace'&&databaseState.db?'workspace':'start';
    dbShowView(view);
    if(view==='workspace')dbRenderWorkspace();
    return;
  }
  if(button.hasAttribute('data-wz-open')){dbWizardFinish(true);return}
  const stepItem=button.closest('[data-wz-step]');
  if(stepItem){const step=Number(stepItem.dataset.wzStep);if(step<w.step){w.step=step;w.error='';dbWizardRenderStep()}return}
  const tableCard=button.closest('.wz-table-card');
  const tableIndex=tableCard?[...tableCard.parentElement.children].indexOf(tableCard):w.activeTable;
  const table=w.tables[tableIndex];
  if(button.hasAttribute('data-wz-add-table')){
    w.tables.push({name:`Tabel ${w.tables.length+1}`,columns:[{name:'Nama',type:'TEXT'}],rows:[]});
    w.activeTable=w.tables.length-1;w.focus='.wz-table-card:last-child [data-wz-table-name]';dbRenderWizard();return;
  }
  if(button.hasAttribute('data-wz-del-table')){
    if(w.tables.length<=1)return;
    w.tables.splice(tableIndex,1);w.activeTable=Math.max(0,Math.min(w.activeTable,w.tables.length-1));dbRenderWizard();return;
  }
  if(button.hasAttribute('data-wz-add-col')&&table){
    table.columns.push({name:`Kolom ${table.columns.length+1}`,type:'TEXT'});
    table.rows.forEach(row=>row.push(''));
    w.focus=`.wz-table-card:nth-child(${tableIndex+1}) .wz-col-row:last-child [data-wz-col-name]`;dbRenderWizard();return;
  }
  if(button.hasAttribute('data-wz-del-col')&&table){
    if(table.columns.length<=1)return;
    const rowElement=button.closest('.wz-col-row'),colIndex=rowElement?[...rowElement.parentElement.children].indexOf(rowElement):table.columns.length-1;
    table.columns.splice(colIndex,1);table.rows.forEach(row=>row.splice(colIndex,1));dbRenderWizard();return;
  }
  if(button.hasAttribute('data-wz-tab')){w.activeTable=Number(button.dataset.wzTab);dbRenderWizard();return}
  if(button.hasAttribute('data-wz-add-row')&&table){
    table.rows.push(table.columns.map(()=>''));
    const rowIndex=table.rows.length-1;
    w.focus=`[data-wz-row="${rowIndex}"] [data-wz-cell]`;dbRenderWizard();return;
  }
  if(button.hasAttribute('data-wz-del-row')&&table){
    table.rows.splice(Number(button.dataset.wzDelRow),1);dbRenderWizard();
  }
}
function dbHandleWizardInput(event){
  const target=event.target,w=dbWizardState;
  if(target.id==='wzDbName'){w.name=target.value;return}
  const card=target.closest('.wz-table-card');
  const tableIndex=card?[...card.parentElement.children].indexOf(card):w.activeTable;
  const table=w.tables[tableIndex];if(!table)return;
  if(target.matches('[data-wz-table-name]')){table.name=target.value;return}
  const colRow=target.closest('.wz-col-row');
  if(colRow){
    const colIndex=[...colRow.parentElement.children].indexOf(colRow),col=table.columns[colIndex];if(!col)return;
    if(target.matches('[data-wz-col-name]'))col.name=target.value;
    else if(target.matches('[data-wz-col-type]'))col.type=target.value;
    else if(target.matches('[data-wz-col-required]'))col.notnull=target.checked;
    return;
  }
  const tr=target.closest('tr[data-wz-row]');
  if(tr&&target.matches('[data-wz-cell]')){
    const rowIndex=+tr.dataset.wzRow,colIndex=[...tr.querySelectorAll('[data-wz-cell]')].indexOf(target);
    if(table.rows[rowIndex])table.rows[rowIndex][colIndex]=target.value;
  }
}

function initDatabasePage(){
  if(databasePageInitialized)return;
  databasePageInitialized=true;
  const p=dbParts();
  document.getElementById('dbBackBtn')?.addEventListener('click',closeDatabasePage);
  document.getElementById('dbPickFile')?.addEventListener('click',()=>document.getElementById('dbFileInput')?.click());
  document.getElementById('dbStartWizard')?.addEventListener('click',dbStartWizard);
  const fileInput=document.getElementById('dbFileInput');
  fileInput?.addEventListener('change',()=>{dbOpenFile(fileInput.files&&fileInput.files[0]);fileInput.value=''});
  const drop=document.getElementById('dbDropzone');
  if(drop){
    ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,event=>{event.preventDefault();drop.classList.add('dragover')}));
    ['dragleave','dragend'].forEach(type=>drop.addEventListener(type,()=>drop.classList.remove('dragover')));
    drop.addEventListener('drop',dbHandleDroppedFile);
  }
  p.page?.addEventListener('dragover',event=>{if(event.dataTransfer&&[...event.dataTransfer.types].includes('Files'))event.preventDefault()});
  p.page?.addEventListener('drop',event=>{if(drop&&(event.target===drop||drop.contains(event.target)))return;event.preventDefault()});
  p.name?.addEventListener('input',()=>{databaseState.name=dbBaseName();dbSyncNameWidth();dbUpdateChrome()});
  p.saveBtn?.addEventListener('click',dbSaveDatabase);
  p.pdfBtn?.addEventListener('click',()=>dbExportPdf(databaseState.tables.map(t=>t.name)));
  p.pdfTable?.addEventListener('click',()=>{const t=dbActiveTable();if(t)dbExportPdf([t.name])});
  p.addRow?.addEventListener('click',dbAddRow);
  p.prev?.addEventListener('click',()=>dbChangePage(-1));
  p.next?.addEventListener('click',()=>dbChangePage(1));
  p.tableList?.addEventListener('click',event=>{
    const button=event.target.closest('[data-db-table]');if(button)dbSelectTable(button.dataset.dbTable);
  });
  p.grid?.addEventListener('change',event=>{if(event.target.matches('[data-db-cell]'))dbCommitCell(event.target)});
  p.grid?.addEventListener('keydown',dbHandleCellKey);
  dbSyncNameWidth();
  p.grid?.addEventListener('click',event=>{
    const remove=event.target.closest('[data-db-del-row]');
    if(remove){dbDeleteRow(remove.closest('tr[data-local-index]'));return}
    if(event.target.closest('[data-db-new-wizard]'))dbStartWizard();
  });
  p.confirmOk?.addEventListener('click',()=>dbResolveConfirm(true));
  p.confirmCancel?.addEventListener('click',()=>dbResolveConfirm(false));
  p.confirm?.addEventListener('click',event=>{if(event.target===p.confirm)dbResolveConfirm(false)});
  p.confirm?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dbResolveConfirm(false);return}
    if(event.key!=='Tab')return;
    const focusable=[...p.confirm.querySelectorAll('button:not(:disabled)')];
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });
  p.wizard?.addEventListener('click',dbHandleWizardClick);
  p.wizardBody?.addEventListener('input',dbHandleWizardInput);
  p.wizardBody?.addEventListener('change',dbHandleWizardInput);
  p.wizardBody?.addEventListener('keydown',event=>{
    if(event.key==='Enter'&&dbWizardState.step===1&&event.target.matches('input')){event.preventDefault();dbWizardGo(1)}
  });
  document.addEventListener('keydown',event=>{
    const page=document.getElementById('dbPage');
    if(!page||!page.classList.contains('open'))return;
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){
      event.preventDefault();if(databaseState.view==='workspace')dbSaveDatabase();
    }
  });
  window.addEventListener('beforeunload',event=>{
    if(!databaseState.db||!databaseState.dirty)return;
    event.preventDefault();event.returnValue='';
  });
  dbShowView(databaseState.view||'start');
}
