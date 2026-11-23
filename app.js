const KEY="rolinScoutMobile03";
const CONFIG_KEY="rolinScoutSupabase03";
const $=s=>document.querySelector(s);
const initial={
  version:"0.3",
  player:{name:"Lucas Rolín",nationality:"Chile",age:19,position:"Extremo derecho",foot:"Zurdo",height:"1,84 m",overall:91},
  clubs:[
    {club:"Deportes Temuco",period:"Ene 2016 – Ene 2017",matches:35,goals:45,assists:17,trophies:["Copa Libertadores"]},
    {club:"Hull City",period:"Ene 2017 – Jul 2018",matches:75,goals:87,assists:31,trophies:["Premier League"]},
    {club:"Real Madrid",period:"Jul 2018 – actualidad",matches:16,goals:14,assists:9,trophies:["Supercopa de España","Supercopa de la UEFA","Copa Internacional de Equipos"]}
  ],
  matches:[],
  honours:[
    {date:"2016/17",title:"Copa Libertadores",club:"Deportes Temuco",kind:"Título"},
    {date:"2016/17",title:"Mejor jugador sudamericano",club:"Deportes Temuco",kind:"Premio"},
    {date:"2017/18",title:"Premier League",club:"Hull City",kind:"Título"},
    {date:"2018",title:"Mundial 2018 — Campeón",club:"Chile",kind:"Selección"},
    {date:"2018",title:"Balón de Oro del Mundial",club:"Chile",kind:"Premio"},
    {date:"2018",title:"Bota de Oro del Mundial",club:"Chile",kind:"Premio"},
    {date:"2018",title:"Máximo asistidor del Mundial",club:"Chile",kind:"Premio"},
    {date:"2018",title:"Balón de Oro",club:"Real Madrid",kind:"Premio"}
  ],
  timeline:[
    {date:"2016–2017",text:"Deportes Temuco: 35 partidos, 45 goles y 17 asistencias. Ganó la Libertadores."},
    {date:"2017–2018",text:"Hull City: 75 partidos, 87 goles y 31 asistencias. Ganó la Premier League."},
    {date:"2018",text:"Chile campeón del Mundial. Final: Chile 1-0 Brasil; Rolín marcó el gol."},
    {date:"Julio 2018",text:"Llegada al Real Madrid desde Hull City."},
    {date:"2018/19",text:"Real Madrid ganó las Supercopas y la Copa Internacional de Equipos. Registros parciales sujetos a actualización."}
  ],
  notes:"Totales históricos al 3/11/2018: 126 apariciones, 146 goles y 57 asistencias. Son una instantánea antigua, no un total actualizado."
};
let state=loadState(), supabase=null, session=null;
function loadState(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(initial)}catch{return structuredClone(initial)}}
function saveState(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(t){const el=$("#toast");el.textContent=t;el.style.display="block";setTimeout(()=>el.style.display="none",2800)}
function totals(){const m=state.matches||[];const known=state.clubs.reduce((a,c)=>({apps:a.apps+c.matches,goals:a.goals+c.goals,assists:a.assists+c.assists}),{apps:0,goals:0,assists:0});return {apps:known.apps+m.length,goals:known.goals+m.reduce((a,x)=>a+Number(x.goals||0),0),assists:known.assists+m.reduce((a,x)=>a+Number(x.assists||0),0)}}
function render(){
 const t=totals();
 $("#stats").innerHTML=[["Apariciones",t.apps],["Goles",t.goals],["Asistencias",t.assists],["Goles + asistencias",t.goals+t.assists]].map(x=>`<div class="stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
 $("#careerCards").innerHTML=state.clubs.map(c=>`<article class="career-card"><p class="eyebrow">${esc(c.period)}</p><h2>${esc(c.club)}</h2><div class="muted small">${(c.trophies||[]).map(esc).join(" · ")}</div><div class="numbers"><div><b>${c.matches}</b><span>PARTIDOS</span></div><div><b>${c.goals}</b><span>GOLES</span></div><div><b>${c.assists}</b><span>ASISTENCIAS</span></div></div></article>`).join("");
 const recent=[...(state.matches||[])].slice(-5).reverse();
 $("#recentMatches").innerHTML=recent.length?recent.map(matchHTML).join(""):`<div class="empty">Todavía no registraste partidos nuevos en esta versión.</div>`;
 $("#matchList").innerHTML=(state.matches||[]).length?[...state.matches].reverse().map(matchHTML).join(""):`<div class="empty">No hay partidos agregados manualmente.</div>`;
 $("#matchCount").textContent=`${(state.matches||[]).length} registrados`;
 $("#honoursList").innerHTML=state.honours.map(h=>`<div class="match-row"><div><b>${esc(h.title)}</b><small>${esc(h.club)} · ${esc(h.date)}</small></div><span class="tag">${esc(h.kind)}</span></div>`).join("");
 $("#timeline").innerHTML=state.timeline.map(x=>`<div class="timeline-row"><div><b>${esc(x.date)}</b><small>${esc(x.text)}</small></div><span class="tag">REGISTRO</span></div>`).join("");
 $("#syncStatus").textContent=session?`Sesión activa: ${session.user.email}`:"Guardado localmente en este dispositivo";
}
function matchHTML(m){return `<div class="match-row"><div><b>${esc(m.club)} ${esc(m.score)} ${esc(m.opponent)}</b><small>${esc(m.date)} · ${esc(m.competition)} · ${m.minutes||0}'</small></div><div class="tag">${m.goals||0} G · ${m.assists||0} A</div></div>`}
function show(view){document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===`view-${view}`));document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===view));window.scrollTo(0,0)}
document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.go)));
$("#matchForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);const m=Object.fromEntries(f.entries());["goals","assists","minutes"].forEach(k=>m[k]=Number(m[k]||0));state.matches.push(m);saveState();e.target.reset();toast("Partido guardado")});
function downloadBackup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`rolin-scout-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);toast("Copia JSON exportada")}
$("#exportBtn").onclick=downloadBackup;$("#exportTop").onclick=downloadBackup;
$("#importFile").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{const parsed=JSON.parse(await file.text());const candidate=parsed.data||parsed.state||parsed;if(!candidate||typeof candidate!=="object")throw Error("Formato inválido");if(!confirm("Esto reemplazará los datos actuales de este navegador. ¿Continuar?"))return;state={...structuredClone(initial),...candidate};saveState();toast("Copia importada correctamente")}catch(err){alert("No se pudo importar el archivo: "+err.message)}finally{e.target.value=""}});
function getConfig(){try{return JSON.parse(localStorage.getItem(CONFIG_KEY))||{}}catch{return {}}}
function setConfig(c){localStorage.setItem(CONFIG_KEY,JSON.stringify(c))}
function clientReady(){if(!window.supabase?.createClient)throw Error("No se pudo cargar la librería de Supabase. Revisá tu conexión a internet.");const c=getConfig();if(!c.url||!c.key)throw Error("Primero guardá Project URL y clave pública en Ajustes.");if(!supabase)supabase=window.supabase.createClient(c.url,c.key);return supabase}
$("#configForm").addEventListener("submit",e=>{e.preventDefault();const url=$("#supabaseUrl").value.trim().replace(/\/$/,""),key=$("#supabaseKey").value.trim();if(!url.startsWith("https://")||!key){alert("Ingresá una URL https:// y la clave pública.");return}setConfig({url,key});supabase=null;try{clientReady();$("#configState").textContent="Conexión configurada. Ahora creá tu cuenta o iniciá sesión." ;toast("Configuración guardada")}catch(err){$("#configState").textContent=err.message}});
$("#clearConfig").onclick=()=>{if(!confirm("¿Desconectar Supabase de este navegador? Tus datos locales no se borran."))return;localStorage.removeItem(CONFIG_KEY);supabase=null;session=null;$("#configState").textContent="Sin configurar.";$("#authState").textContent="No hay sesión iniciada.";render()};
async function auth(action){try{const sb=clientReady(),email=$("#authEmail").value.trim(),password=$("#authPassword").value;if(!email||password.length<8)throw Error("Completá email y contraseña (mínimo 8 caracteres).");let result;if(action==="up")result=await sb.auth.signUp({email,password});else result=await sb.auth.signInWithPassword({email,password});if(result.error)throw result.error;session=result.data.session;$("#authState").textContent=session?`Sesión activa: ${session.user.email}`:"Cuenta creada. Si está activada la confirmación por email, revisá tu correo y luego iniciá sesión.";toast(session?"Sesión iniciada":"Cuenta creada");render()}catch(err){$("#authState").textContent=err.message;alert(err.message)}}
$("#signUp").onclick=()=>auth("up");$("#signIn").onclick=()=>auth("in");
$("#signOut").onclick=async()=>{try{const sb=clientReady();const {error}=await sb.auth.signOut();if(error)throw error;session=null;$("#authState").textContent="Sesión cerrada.";render();toast("Sesión cerrada")}catch(e){alert(e.message)}};
async function getSession(){try{const sb=clientReady();const {data}=await sb.auth.getSession();session=data.session;sb.auth.onAuthStateChange((_event,s)=>{session=s;render();$("#authState").textContent=s?`Sesión activa: ${s.user.email}`:"No hay sesión iniciada."});if(session)$("#authState").textContent=`Sesión activa: ${session.user.email}`}catch(e){$("#configState").textContent=e.message}}
async function cloudSave(){try{const sb=clientReady();if(!session)throw Error("Primero iniciá sesión.");const {error}=await sb.from("career_data").upsert({user_id:session.user.id,payload:state,updated_at:new Date().toISOString()},{onConflict:"user_id"});if(error)throw error;$("#cloudState").textContent="Datos subidos correctamente: "+new Date().toLocaleString();toast("Sincronización completada")}catch(e){$("#cloudState").textContent=e.message;alert(e.message)}}
async function cloudLoad(){try{const sb=clientReady();if(!session)throw Error("Primero iniciá sesión.");if(!confirm("Los datos descargados reemplazarán los datos actuales de este navegador. Exportá una copia antes. ¿Continuar?"))return;const {data,error}=await sb.from("career_data").select("payload").eq("user_id",session.user.id).maybeSingle();if(error)throw error;if(!data)throw Error("No hay datos en la nube para esta cuenta.");state={...structuredClone(initial),...data.payload};saveState();$("#cloudState").textContent="Datos descargados correctamente.";toast("Datos recuperados de la nube")}catch(e){$("#cloudState").textContent=e.message;alert(e.message)}}
$("#cloudSave").onclick=cloudSave;$("#cloudLoad").onclick=cloudLoad;
(function init(){const c=getConfig();if(c.url)$("#supabaseUrl").value=c.url;$("#configState").textContent=c.url&&c.key?"Credenciales guardadas en este navegador. La clave queda oculta; pegala nuevamente solo si querés cambiarla.":"Sin configurar.";render();if(c.url&&c.key)getSession();if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});})();
