import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, Legend
} from "recharts";
import {
  Hotel, BarChart2, TrendingUp, Brain, Bell, FileText, Plus, Edit2,
  Trash2, Menu, X, AlertTriangle, CheckCircle, ArrowUp, ArrowDown,
  Globe, Download, Eye, DollarSign, Activity, Calendar, Star, LogOut,
  Instagram, MessageSquare, Send, Building2, Target, Users, Zap,
  MapPin, TrendingDown, RefreshCw, Award, Search, Shield, ChevronDown,
  Percent, LayoutDashboard, Settings, ExternalLink, Layers
} from "lucide-react";

const C = {
  bg0:"#060910",bg1:"#0C1220",bg2:"#111827",bg3:"#182033",
  card:"#131A2C",card2:"#1A2438",
  border:"#1F2D46",borderL:"#2A3D5A",
  gold:"#C9A84B",goldL:"#E8C86A",goldD:"rgba(201,168,75,0.12)",
  text:"#E8EDF8",muted:"#6880A8",faint:"#3A4D6A",
  ok:"#2DCFA0",warn:"#F5A623",danger:"#FF5555",info:"#5B8FFF",
  purple:"#8B5CF6",
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { background: ${C.bg0}; font-family: 'DM Sans', sans-serif; color: ${C.text}; min-height: 100vh; }
  h1,h2,h3 { font-family: 'Cormorant Garamond', serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg1}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
  input,textarea,select { background: ${C.bg3}; border: 1px solid ${C.border}; color: ${C.text}; font-family: 'DM Sans', sans-serif; padding: 8px 12px; border-radius: 8px; width: 100%; font-size: 14px; outline: none; }
  input:focus,textarea:focus,select:focus { border-color: ${C.gold}; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  .anim { animation: fadeIn .3s ease forwards; }
  .pulse { animation: pulse 2s infinite; }
`;

// ── MOCK DATA ──────────────────────────────────────────────────────────────
const OCP = [
  {m:"Jan",a:62,meta:75,p:65},{m:"Fev",a:71,meta:75,p:70},{m:"Mar",a:68,meta:75,p:72},
  {m:"Abr",a:80,meta:80,p:78},{m:"Mai",a:85,meta:82,p:83},{m:"Jun",a:90,meta:85,p:88},
  {m:"Jul",a:88,meta:85,p:91},{m:"Ago",a:92,meta:88,p:89},{m:"Set",a:76,meta:80,p:80},
  {m:"Out",a:74,meta:78,p:77},{m:"Nov",a:79,meta:80,p:82},{m:"Dez",a:95,meta:90,p:93},
];
const REV = [
  {m:"Jan",r:42,meta:50,p:45},{m:"Fev",r:48,meta:50,p:49},{m:"Mar",r:46,meta:52,p:48},
  {m:"Abr",r:58,meta:55,p:56},{m:"Mai",r:65,meta:60,p:63},{m:"Jun",r:72,meta:68,p:70},
  {m:"Jul",r:70,meta:70,p:74},{m:"Ago",r:78,meta:75,p:76},{m:"Set",r:59,meta:65,p:62},
  {m:"Out",r:57,meta:62,p:60},{m:"Nov",r:63,meta:66,p:65},{m:"Dez",r:88,meta:85,p:85},
];
const CANAIS = [
  {c:"Google Ads",inv:3000,rec:18000,roas:6.0,cac:42,leads:145,res:68},
  {c:"Instagram",inv:2500,rec:10000,roas:4.0,cac:78,leads:95,res:32},
  {c:"Booking.com",inv:1800,rec:32000,roas:17.8,cac:28,leads:240,res:142},
  {c:"Airbnb",inv:600,rec:14000,roas:23.3,cac:22,leads:180,res:96},
  {c:"Direto",inv:1000,rec:22000,roas:22.0,cac:18,leads:210,res:115},
];
const CONTENT = [
  {t:"Quartos",v:12400,e:8.2,c:1820,r:92},{t:"Café da Manhã",v:9800,e:7.1,c:1240,r:55},
  {t:"Piscina",v:15200,e:5.4,c:980,r:23},{t:"Localização",v:7600,e:6.8,c:1100,r:61},
  {t:"Promoções",v:6200,e:9.5,c:1680,r:84},
];
const FUNIL = [
  {e:"Visualizações",v:51200},{e:"Cliques",v:6820},{e:"Leads",v:870},{e:"Reservas",v:453}
];
const CONCORRENTES = [
  {n:"Hotel Vista Mar",p:380,av:4.7,ocp:"Alta",d:"Vista para o mar"},
  {n:"Pousada das Flores",p:220,av:4.5,ocp:"Média",d:"Café colonial incluso"},
  {n:"Resort Sol e Mar",p:520,av:4.9,ocp:"Alta",d:"All-inclusive"},
  {n:"Hotel Central",p:180,av:4.2,ocp:"Média",d:"Localização central"},
];
const RADAR_DATA = [
  {s:"Preço",h:75,c:85},{s:"Avaliação",h:82,c:90},{s:"Conteúdo",h:68,c:72},
  {s:"SEO",h:55,c:78},{s:"Redes Sociais",h:80,c:65},{s:"Reservas",h:88,c:82},
];
const DEF_HOTELS = [{
  id:"h1",nome:"Grand Hotel Ilhéus",cidade:"Ilhéus",estado:"BA",cat:"4★",
  site:"www.grandhotel.com.br",ig:"@grandhotelilheus",bk:"booking.com/grandhotel",
  ab:"",tp:"tripadvisor.com/grandhotel",
  ocp:78,rec:725000,res:453,ticket:318,cac:36,roas:12.4
}];
const DEF_ALERTS = [
  {id:1,tp:"warn",msg:"Ocupação de Set abaixo da meta em 5,2%",dt:"06/04/2026",lido:false},
  {id:2,tp:"danger",msg:"Instagram: ROAS 4.0x — abaixo do ideal",dt:"05/04/2026",lido:false},
  {id:3,tp:"ok",msg:"Google Ads atingiu ROAS 6x — melhor resultado do tri",dt:"04/04/2026",lido:true},
  {id:4,tp:"info",msg:"Alta demanda prevista para Dez — ative campanhas já",dt:"03/04/2026",lido:false},
];

// ── UTILS ─────────────────────────────────────────────────────────────────
const fmtR = (n) => n>=1e6?`R$${(n/1e6).toFixed(1)}M`:n>=1000?`R$${(n/1000).toFixed(0)}K`:`R$${n}`;
const alertColor = {ok:C.ok,warn:C.warn,danger:C.danger,info:C.info};
const alertIcon = {ok:<CheckCircle size={15}/>,warn:<AlertTriangle size={15}/>,danger:<AlertTriangle size={15}/>,info:<Zap size={15}/>};

// ── COMPONENTS ────────────────────────────────────────────────────────────
const Card = ({children,style={}})=>(
  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 22px",...style}}>{children}</div>
);
const Badge = ({children,color=C.gold})=>(
  <span style={{background:`${color}18`,color,border:`1px solid ${color}30`,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>{children}</span>
);
const KPI = ({label,value,sub,icon:Icon,trend,color=C.gold})=>(
  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,right:0,width:80,height:80,background:`${color}08`,borderRadius:"0 14px 0 80px"}}/>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <div style={{width:34,height:34,borderRadius:9,background:`${color}18`,display:"flex",alignItems:"center",justifyContent:"center",color}}>
        <Icon size={16}/>
      </div>
      <span style={{fontSize:12,color:C.muted,fontWeight:500}}>{label}</span>
    </div>
    <div style={{fontSize:26,fontWeight:700,fontFamily:"Cormorant Garamond, serif",color:C.text,lineHeight:1}}>{value}</div>
    {sub&&<div style={{marginTop:6,display:"flex",alignItems:"center",gap:6}}>
      {trend!=null&&(trend>=0?<ArrowUp size={11} color={C.ok}/>:<ArrowDown size={11} color={C.danger}/>)}
      <span style={{fontSize:11,color:trend!=null?(trend>=0?C.ok:C.danger):C.muted}}>{sub}</span>
    </div>}
  </div>
);
const SectionTitle = ({icon:Icon,title,sub})=>(
  <div style={{marginBottom:24}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
      {Icon&&<div style={{color:C.gold}}><Icon size={20}/></div>}
      <h2 style={{fontSize:26,fontWeight:600,color:C.text}}>{title}</h2>
    </div>
    {sub&&<p style={{fontSize:13,color:C.muted,marginLeft:30}}>{sub}</p>}
  </div>
);
const TT = ({active,payload,label})=>{
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:C.bg3,border:`1px solid ${C.borderL}`,borderRadius:10,padding:"10px 14px",fontSize:12}}>
      <div style={{fontWeight:600,marginBottom:6,color:C.gold}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||C.text,marginBottom:2}}>{p.name}: <b>{p.value}</b></div>
      ))}
    </div>
  );
};

// ── AUTH SCREEN ───────────────────────────────────────────────────────────
function AuthScreen({onLogin}){
  const [email,setEmail]=useState("demo@hoteliq.com.br");
  const [pass,setPass]=useState("hotel2026");
  const [loading,setLoading]=useState(false);
  const submit=async(e)=>{
    e.preventDefault();setLoading(true);
    await new Promise(r=>setTimeout(r,800));
    onLogin(email,pass);setLoading(false);
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg0,padding:20}}>
      <style>{FONTS}</style>
      <div style={{width:"100%",maxWidth:420,animation:"fadeIn .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:64,height:64,borderRadius:18,background:C.goldD,border:`1px solid ${C.gold}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.gold}}>
            <Hotel size={28}/>
          </div>
          <h1 style={{fontSize:38,fontWeight:700,color:C.text,letterSpacing:1}}>HotelIQ</h1>
          <p style={{color:C.muted,fontSize:13,marginTop:4}}>Inteligência estratégica para hotelaria</p>
        </div>
        <Card>
          <form onSubmit={submit}>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,color:C.muted,fontWeight:500,display:"block",marginBottom:6}}>E-MAIL</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{fontSize:12,color:C.muted,fontWeight:500,display:"block",marginBottom:6}}>SENHA</label>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"/>
            </div>
            <button type="submit" style={{width:"100%",padding:"12px",background:loading?"#8B6E2E":C.gold,color:C.bg0,border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"DM Sans, sans-serif",transition:"all .2s"}}>
              {loading?"Entrando...":"Entrar no Sistema"}
            </button>
          </form>
          <div style={{marginTop:16,padding:"12px",background:C.bg3,borderRadius:8,fontSize:12,color:C.muted,textAlign:"center"}}>
            Demo: demo@hoteliq.com.br / hotel2026
          </div>
        </Card>
        <p style={{textAlign:"center",marginTop:20,fontSize:11,color:C.faint}}>© 2026 HotelIQ · SaaS de Revenue Management</p>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function DashboardView({hotel,alerts}){
  const unread=alerts.filter(a=>!a.lido).length;
  return (
    <div className="anim">
      <SectionTitle icon={LayoutDashboard} title="Dashboard" sub={`Visão estratégica · ${hotel.nome}`}/>
      {unread>0&&(
        <div style={{background:`${C.warn}15`,border:`1px solid ${C.warn}40`,borderRadius:10,padding:"10px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10,fontSize:13}}>
          <AlertTriangle size={15} color={C.warn}/>
          <span style={{color:C.warn}}>{unread} alerta{unread>1?"s":""} ativo{unread>1?"s":""} · </span>
          <span style={{color:C.muted}}>Verifique a seção Alertas</span>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        <KPI label="RECEITA ANUAL" value={fmtR(hotel.rec)} sub="+8,4% vs ano anterior" trend={8.4} icon={DollarSign}/>
        <KPI label="OCUPAÇÃO MÉDIA" value={`${hotel.ocp}%`} sub="+3,2pp vs meta" trend={3.2} icon={Activity} color={C.ok}/>
        <KPI label="RESERVAS" value={hotel.res.toLocaleString()} sub="+12% vs ano anterior" trend={12} icon={Calendar} color={C.info}/>
        <KPI label="TICKET MÉDIO" value={fmtR(hotel.ticket)} sub="+5,1% vs ano anterior" trend={5.1} icon={Award} color={C.purple}/>
        <KPI label="ROAS MÉDIO" value={`${hotel.roas}x`} sub="Meta: 10x" trend={24} icon={Target} color={C.warn}/>
        <KPI label="CAC MÉDIO" value={fmtR(hotel.cac)} sub="-8% vs trimestre" trend={-8} icon={Users} color={C.danger}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600}}>Receita Mensal (R$ mil)</h3>
            <Badge>2026</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REV}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.gold} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={C.gold} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.info} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={C.info} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}K`}/>
              <Tooltip content={<TT/>}/>
              <Area type="monotone" dataKey="r" name="Receita" stroke={C.gold} fill="url(#rg)" strokeWidth={2}/>
              <Area type="monotone" dataKey="meta" name="Meta" stroke={C.info} fill="url(#mg)" strokeWidth={1.5} strokeDasharray="5 4"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Funil de Conversão</h3>
          {FUNIL.map((f,i)=>{
            const pct=(f.v/FUNIL[0].v*100).toFixed(1);
            const colors=[C.gold,C.info,C.ok,C.purple];
            return (
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:C.muted}}>{f.e}</span>
                  <span style={{color:colors[i],fontWeight:600}}>{f.v.toLocaleString()}</span>
                </div>
                <div style={{background:C.bg3,borderRadius:4,height:6}}>
                  <div style={{width:`${pct}%`,height:6,borderRadius:4,background:colors[i],transition:"width .5s"}}/>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Ocupação vs Meta (%)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={OCP}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[0,100]}/>
              <Tooltip content={<TT/>}/>
              <Bar dataKey="a" name="Atual" fill={C.gold} radius={[4,4,0,0]}/>
              <Bar dataKey="meta" name="Meta" fill={C.info} radius={[4,4,0,0]} opacity={0.5}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Performance dos Canais</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {CANAIS.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:13,fontWeight:500}}>{c.c}</span>
                <div style={{display:"flex",gap:12,fontSize:12}}>
                  <span style={{color:C.muted}}>ROAS: <b style={{color:c.roas>=10?C.ok:c.roas>=5?C.warn:C.danger}}>{c.roas}x</b></span>
                  <span style={{color:C.muted}}>CAC: <b style={{color:C.text}}>{fmtR(c.cac)}</b></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── MY HOTELS ─────────────────────────────────────────────────────────────
function HotelsView({hotels,setHotels,currentHotel,setCurrentHotel}){
  const [modal,setModal]=useState(null);
  const blank={id:`h${Date.now()}`,nome:"",cidade:"",estado:"",cat:"3★",site:"",ig:"",bk:"",ab:"",tp:"",ocp:0,rec:0,res:0,ticket:0,cac:0,roas:0};
  const [form,setForm]=useState(blank);

  const save=async()=>{
    const updated=modal==="new"?[...hotels,{...form,id:`h${Date.now()}`}]:hotels.map(h=>h.id===form.id?form:h);
    setHotels(updated);
    try{await window.storage.set("hoteliq_hotels",JSON.stringify(updated));}catch(e){}
    if(modal==="new"||currentHotel.id===form.id) setCurrentHotel(updated.find(h=>h.id===form.id)||updated[0]);
    setModal(null);
  };
  const del=(id)=>{
    const updated=hotels.filter(h=>h.id!==id);
    setHotels(updated);
    if(currentHotel?.id===id) setCurrentHotel(updated[0]||null);
  };

  const F = ({label,field,type="text"})=>(
    <div>
      <label style={{fontSize:11,color:C.muted,fontWeight:600,display:"block",marginBottom:4}}>{label}</label>
      <input type={type} value={form[field]||""} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))}/>
    </div>
  );

  return (
    <div className="anim">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <SectionTitle icon={Building2} title="Meus Hotéis" sub="Gerencie seu portfólio hoteleiro"/>
        <button onClick={()=>{setForm(blank);setModal("new");}} style={{display:"flex",alignItems:"center",gap:6,background:C.gold,color:C.bg0,border:"none",borderRadius:10,padding:"9px 16px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
          <Plus size={15}/> Novo Hotel
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {hotels.map(h=>(
          <Card key={h.id} style={{cursor:"pointer",border:`1px solid ${currentHotel?.id===h.id?C.gold:C.border}`,transition:"all .2s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <h3 style={{fontSize:17,fontWeight:600,color:currentHotel?.id===h.id?C.gold:C.text}}>{h.nome}</h3>
                <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}>
                  <MapPin size={11} color={C.muted}/><span style={{fontSize:12,color:C.muted}}>{h.cidade}, {h.estado}</span>
                  <Badge>{h.cat}</Badge>
                </div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>{setForm({...h});setModal("edit");}} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 7px",color:C.muted,cursor:"pointer"}}>
                  <Edit2 size={13}/>
                </button>
                {hotels.length>1&&<button onClick={()=>del(h.id)} style={{background:"#FF555518",border:`1px solid ${C.danger}30`,borderRadius:7,padding:"5px 7px",color:C.danger,cursor:"pointer"}}>
                  <Trash2 size={13}/>
                </button>}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
              {[["Ocupação",`${h.ocp}%`,C.gold],["Receita",fmtR(h.rec),C.ok],["Reservas",h.res,C.info]].map(([l,v,col])=>(
                <div key={l} style={{background:C.bg3,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:700,color:col}}>{v}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setCurrentHotel(h)} style={{width:"100%",padding:"8px",background:currentHotel?.id===h.id?C.goldD:"transparent",border:`1px solid ${currentHotel?.id===h.id?C.gold:C.border}`,borderRadius:8,color:currentHotel?.id===h.id?C.gold:C.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
              {currentHotel?.id===h.id?"✓ Hotel Ativo":"Selecionar Hotel"}
            </button>
          </Card>
        ))}
      </div>

      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(6,9,16,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20}}>
          <Card style={{width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{fontSize:22}}>{modal==="new"?"Novo Hotel":"Editar Hotel"}</h2>
              <button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><X size={20}/></button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              <div style={{gridColumn:"1/-1"}}><F label="NOME DO HOTEL" field="nome"/></div>
              <F label="CIDADE" field="cidade"/>
              <F label="ESTADO" field="estado"/>
              <F label="CATEGORIA" field="cat"/>
              <F label="SITE" field="site"/>
              <F label="INSTAGRAM" field="ig"/>
              <F label="BOOKING.COM" field="bk"/>
              <F label="AIRBNB" field="ab"/>
              <F label="TRIPADVISOR" field="tp"/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setModal(null)} style={{padding:"9px 20px",background:"none",border:`1px solid ${C.border}`,borderRadius:9,color:C.muted,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>Cancelar</button>
              <button onClick={save} style={{padding:"9px 20px",background:C.gold,border:"none",borderRadius:9,color:C.bg0,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>Salvar</button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ── MARKETING ─────────────────────────────────────────────────────────────
function MarketingView(){
  const total={inv:CANAIS.reduce((a,c)=>a+c.inv,0),rec:CANAIS.reduce((a,c)=>a+c.rec,0)};
  return (
    <div className="anim">
      <SectionTitle icon={Target} title="Marketing" sub="Análise de canais, conteúdo e ROI"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:24}}>
        <KPI label="INVEST. TOTAL" value={fmtR(total.inv)} sub="Este mês" icon={DollarSign}/>
        <KPI label="RECEITA GERADA" value={fmtR(total.rec)} sub="Via marketing" trend={14} icon={TrendingUp} color={C.ok}/>
        <KPI label="ROAS MÉDIO" value={`${(total.rec/total.inv).toFixed(1)}x`} sub="Meta: 10x" trend={18} icon={Target} color={C.warn}/>
        <KPI label="LEADS TOTAIS" value="870" sub="+23% vs mês ant." trend={23} icon={Users} color={C.info}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:16,marginBottom:16}}>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>ROAS por Canal</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CANAIS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
              <XAxis type="number" tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis dataKey="c" type="category" tick={{fill:C.text,fontSize:12}} axisLine={false} tickLine={false} width={80}/>
              <Tooltip content={<TT/>}/>
              <Bar dataKey="roas" name="ROAS" fill={C.gold} radius={[0,6,6,0]}>
                {CANAIS.map((c,i)=>(
                  <Cell key={i} fill={c.roas>=15?C.ok:c.roas>=8?C.gold:c.roas>=5?C.warn:C.danger}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Distribuição de Investimento</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CANAIS} dataKey="inv" nameKey="c" cx="50%" cy="50%" outerRadius={70} label={({c,percent})=>`${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {CANAIS.map((_,i)=><Cell key={i} fill={[C.gold,C.info,C.ok,C.warn,C.purple][i]}/>)}
              </Pie>
              <Tooltip content={<TT/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8,justifyContent:"center"}}>
            {CANAIS.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.muted}}>
                <div style={{width:8,height:8,borderRadius:2,background:[C.gold,C.info,C.ok,C.warn,C.purple][i]}}/>
                {c.c}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Performance de Conteúdo</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr>{["Tipo de Conteúdo","Visualizações","Engajamento","Cliques","Reservas","Conv. Rate"].map(h=>(
                <th key={h} style={{padding:"8px 12px",color:C.muted,fontWeight:500,textAlign:"left",borderBottom:`1px solid ${C.border}`,fontSize:11}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {CONTENT.map((c,i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${C.border}`}}>
                  <td style={{padding:"10px 12px",fontWeight:600}}>{c.t}</td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{c.v.toLocaleString()}</td>
                  <td style={{padding:"10px 12px"}}>
                    <span style={{color:c.e>7?C.ok:c.e>5?C.warn:C.danger}}>{c.e}%</span>
                  </td>
                  <td style={{padding:"10px 12px",color:C.muted}}>{c.c.toLocaleString()}</td>
                  <td style={{padding:"10px 12px",color:C.text,fontWeight:600}}>{c.r}</td>
                  <td style={{padding:"10px 12px"}}>
                    <Badge color={c.r/c.c*100>5?C.ok:C.warn}>{(c.r/c.c*100).toFixed(1)}%</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:14,padding:"12px 14px",background:`${C.gold}10`,borderRadius:8,border:`1px solid ${C.gold}30`,fontSize:12,color:C.muted}}>
          <span style={{color:C.gold,fontWeight:600}}>💡 Insight da IA: </span>
          Conteúdo de Quartos converte 4x mais que Piscina. Aumente a produção desse tipo de conteúdo para maximizar reservas.
        </div>
      </Card>
    </div>
  );
}

// ── OCCUPANCY & REVENUE ───────────────────────────────────────────────────
function OccupancyView(){
  return (
    <div className="anim">
      <SectionTitle icon={Activity} title="Ocupação & Receita" sub="Histórico, metas e previsões"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14,marginBottom:24}}>
        <KPI label="OCUPAÇÃO ATUAL" value="78%" sub="+3pp vs meta" trend={4} icon={Activity}/>
        <KPI label="MELHOR MÊS" value="95%" sub="Dezembro" icon={Award} color={C.ok}/>
        <KPI label="RECEITA YTD" value="R$725K" sub="+8,4% vs 2025" trend={8.4} icon={DollarSign} color={C.info}/>
        <KPI label="PREVISÃO DEZ" value="95%" sub="Alta demanda" trend={22} icon={TrendingUp} color={C.warn}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Taxa de Ocupação Mensal (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={OCP}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[50,100]}/>
              <Tooltip content={<TT/>}/>
              <Line type="monotone" dataKey="a" name="Atual" stroke={C.gold} strokeWidth={2.5} dot={{fill:C.gold,r:3}}/>
              <Line type="monotone" dataKey="meta" name="Meta" stroke={C.info} strokeWidth={1.5} strokeDasharray="6 4" dot={false}/>
              <Line type="monotone" dataKey="p" name="Prev. IA" stroke={C.ok} strokeWidth={1.5} strokeDasharray="3 3" dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Receita vs Meta (R$ mil)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REV}>
              <defs>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.ok} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={C.ok} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<TT/>}/>
              <Area type="monotone" dataKey="r" name="Receita" stroke={C.ok} fill="url(#rg2)" strokeWidth={2}/>
              <Line type="monotone" dataKey="meta" name="Meta" stroke={C.warn} strokeWidth={1.5} strokeDasharray="5 4" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:14}}>Previsão de Ocupação — Próximos 90 dias</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[{m:"Abril 2026",v:82,t:"Tendência de alta — Semana Santa",c:C.ok},
            {m:"Maio 2026",v:76,t:"Estável — sem feriados relevantes",c:C.warn},
            {m:"Junho 2026",v:88,t:"Alta demanda — São João na Bahia",c:C.ok}].map(f=>(
            <div key={f.m} style={{background:C.bg3,borderRadius:10,padding:"14px 16px"}}>
              <div style={{fontSize:12,color:C.muted,fontWeight:500,marginBottom:6}}>{f.m}</div>
              <div style={{fontSize:32,fontWeight:700,fontFamily:"Cormorant Garamond, serif",color:f.c}}>{f.v}%</div>
              <div style={{fontSize:11,color:C.muted,marginTop:4}}>{f.t}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── AI CONSULTANT ─────────────────────────────────────────────────────────
function AIView({hotel}){
  const [msgs,setMsgs]=useState([
    {role:"assistant",text:`Olá! Sou a IA estratégica do **${hotel?.nome||"HotelIQ"}**. Tenho acesso aos seus dados de ocupação, receita, marketing e conteúdo. Como posso ajudar hoje?\n\nAlgumas análises rápidas disponíveis:\n• Diagnóstico completo de marketing\n• Análise de gargalos de conversão\n• Recomendações de campanha\n• Previsão de receita`}
  ]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const endRef=useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send=async()=>{
    if(!input.trim()||loading) return;
    const userMsg=input;setInput("");
    setMsgs(p=>[...p,{role:"user",text:userMsg}]);
    setLoading(true);
    try{
      const ctx=`Você é um consultor de IA premium para o ${hotel?.nome||"hotel"} em ${hotel?.cidade||"Brasil"} (${hotel?.cat||"4★"}).
Dados atuais: Ocupação ${hotel?.ocp||78}%, Receita YTD R$${(hotel?.rec||725000).toLocaleString()}, ${hotel?.res||453} reservas, Ticket médio R$${hotel?.ticket||318}, ROAS ${hotel?.roas||12.4}x, CAC R$${hotel?.cac||36}.
Canais: Google Ads ROAS 6x, Instagram ROAS 4x, Booking ROAS 17.8x, Airbnb ROAS 23.3x.
Conteúdo: Quartos converte 4x mais que Piscina.
Responda em português do Brasil, de forma estratégica, objetiva e com exemplos concretos. Use emojis moderadamente.`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:800,
          system:ctx,
          messages:[...msgs.filter(m=>m.role!=="assistant"||msgs.indexOf(m)>0).slice(-8).map(m=>({role:m.role,content:m.text})),{role:"user",content:userMsg}]
        })
      });
      const data=await res.json();
      const reply=data.content?.[0]?.text||"Desculpe, não consegui processar sua solicitação.";
      setMsgs(p=>[...p,{role:"assistant",text:reply}]);
    }catch(e){
      setMsgs(p=>[...p,{role:"assistant",text:"⚠️ Erro ao conectar com a IA. Verifique sua conexão."}]);
    }
    setLoading(false);
  };

  const quick=["Diagnóstico completo","Otimizar Google Ads","Aumentar ocupação em Set","Sugestão de conteúdo para Instagram","Previsão de receita Dez"];

  return (
    <div className="anim" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 120px)"}}>
      <SectionTitle icon={Brain} title="Consultor IA" sub="Análise estratégica em tempo real com IA"/>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,marginBottom:16,paddingRight:4}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:10}}>
            {m.role==="assistant"&&(
              <div style={{width:32,height:32,borderRadius:9,background:C.goldD,border:`1px solid ${C.gold}40`,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold,flexShrink:0}}>
                <Brain size={14}/>
              </div>
            )}
            <div style={{
              maxWidth:"80%",padding:"12px 16px",borderRadius:12,fontSize:13,lineHeight:1.6,
              background:m.role==="user"?`${C.gold}20`:C.card,
              border:`1px solid ${m.role==="user"?`${C.gold}40`:C.border}`,
              color:m.role==="user"?C.goldL:C.text,
              whiteSpace:"pre-wrap"
            }}>
              {m.text.replace(/\*\*(.*?)\*\*/g,"$1")}
            </div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",gap:10}}>
            <div style={{width:32,height:32,borderRadius:9,background:C.goldD,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold}}>
              <Brain size={14}/>
            </div>
            <div style={{padding:"12px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:12}}>
              <div className="pulse" style={{fontSize:13,color:C.muted}}>IA analisando seus dados...</div>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {quick.map(q=>(
          <button key={q} onClick={()=>{setInput(q);}} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 12px",fontSize:11,color:C.muted,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
            {q}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Pergunte sobre marketing, ocupação, receita..."/>
        <button onClick={send} disabled={loading||!input.trim()} style={{background:input.trim()?C.gold:C.bg3,border:"none",borderRadius:10,padding:"0 18px",color:input.trim()?C.bg0:C.faint,cursor:"pointer",flexShrink:0,transition:"all .2s"}}>
          <Send size={16}/>
        </button>
      </div>
    </div>
  );
}

// ── COMPETITORS ───────────────────────────────────────────────────────────
function CompetitorsView(){
  const [url,setUrl]=useState("");
  const [loading,setLoading]=useState(false);
  const [analysis,setAnalysis]=useState(null);

  const analyze=async()=>{
    if(!url.trim()) return;
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:600,
          messages:[{role:"user",content:`Analise o site hoteleiro "${url}" e gere um diagnóstico estratégico em JSON com estes campos: {"pontuacao":0-100,"seo":"análise","copywriting":"análise","conversao":"análise","diferenciais":"análise","recomendacoes":["rec1","rec2","rec3"]}. Responda SOMENTE com o JSON, sem markdown.`}]
        })
      });
      const data=await res.json();
      const text=data.content?.[0]?.text||"{}";
      try{setAnalysis(JSON.parse(text));}catch{
        setAnalysis({pontuacao:72,seo:"Presença digital moderada, meta tags básicas",copywriting:"Conteúdo persuasivo razoável, pode melhorar CTAs",conversao:"Botão de reserva visível mas sem urgência",diferenciais:"Poucos diferenciais destacados na home",recomendacoes:["Adicione depoimentos de hóspedes na home","Destaque avaliações do TripAdvisor","Crie landing pages por período/evento"]});
      }
    }catch(e){
      setAnalysis({pontuacao:72,seo:"IA indisponível — use análise manual",copywriting:"Verifique sua conexão e tente novamente",conversao:"",diferenciais:"",recomendacoes:[]});
    }
    setLoading(false);
  };

  return (
    <div className="anim">
      <SectionTitle icon={Search} title="Análise de Concorrentes" sub="Compare seu hotel com a concorrência"/>
      <Card style={{marginBottom:20}}>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:12}}>Analisar Site Concorrente com IA</h3>
        <div style={{display:"flex",gap:10}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.hotelconcorrente.com.br" onKeyDown={e=>e.key==="Enter"&&analyze()}/>
          <button onClick={analyze} disabled={loading} style={{flexShrink:0,padding:"0 20px",background:C.gold,border:"none",borderRadius:9,color:C.bg0,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans, sans-serif",whiteSpace:"nowrap"}}>
            {loading?"Analisando...":"Analisar"}
          </button>
        </div>
        {analysis&&(
          <div style={{marginTop:16,animation:"fadeIn .3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:60,height:60,borderRadius:14,background:`${analysis.pontuacao>=80?C.ok:analysis.pontuacao>=60?C.warn:C.danger}20`,border:`2px solid ${analysis.pontuacao>=80?C.ok:analysis.pontuacao>=60?C.warn:C.danger}`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <span style={{fontSize:20,fontWeight:700,color:analysis.pontuacao>=80?C.ok:analysis.pontuacao>=60?C.warn:C.danger}}>{analysis.pontuacao}</span>
                <span style={{fontSize:9,color:C.muted}}>/ 100</span>
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:15}}>Score de Competitividade</div>
                <div style={{fontSize:12,color:C.muted}}>{analysis.pontuacao>=80?"Concorrente forte — monitore de perto":analysis.pontuacao>=60?"Concorrente moderado":"Concorrente fraco — vantagem para você"}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
              {[["SEO",analysis.seo],["Copywriting",analysis.copywriting],["Conversão",analysis.conversao],["Diferenciais",analysis.diferenciais]].filter(([,v])=>v).map(([k,v])=>(
                <div key={k} style={{background:C.bg3,borderRadius:8,padding:"10px 12px"}}>
                  <div style={{fontSize:11,color:C.gold,fontWeight:600,marginBottom:4}}>{k.toUpperCase()}</div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{v}</div>
                </div>
              ))}
            </div>
            {analysis.recomendacoes?.length>0&&(
              <div style={{background:`${C.info}10`,border:`1px solid ${C.info}30`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:12,fontWeight:600,color:C.info,marginBottom:8}}>RECOMENDAÇÕES ESTRATÉGICAS</div>
                {analysis.recomendacoes.map((r,i)=>(
                  <div key={i} style={{fontSize:12,color:C.muted,marginBottom:4,display:"flex",gap:8}}>
                    <span style={{color:C.gold}}>→</span>{r}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
      <Card>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Benchmark da Região</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr>{["Hotel","Preço/noite","Avaliação","Demanda","Diferencial"].map(h=>(
                <th key={h} style={{padding:"8px 12px",color:C.muted,fontWeight:500,textAlign:"left",borderBottom:`1px solid ${C.border}`,fontSize:11}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {[{n:"Seu Hotel",p:318,av:4.6,ocp:"Alta",d:"Sua proposta única",me:true},...CONCORRENTES].map((c,i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${C.border}`,background:c.me?`${C.gold}08`:"transparent"}}>
                  <td style={{padding:"10px 12px",fontWeight:c.me?700:400,color:c.me?C.gold:C.text}}>{c.n}{c.me&&" ★"}</td>
                  <td style={{padding:"10px 12px",color:C.text}}>R$ {c.p}</td>
                  <td style={{padding:"10px 12px"}}><span style={{color:c.av>=4.8?C.ok:c.av>=4.5?C.warn:C.muted}}>{"★".repeat(Math.floor(c.av))} {c.av}</span></td>
                  <td style={{padding:"10px 12px"}}><Badge color={c.ocp==="Alta"?C.ok:C.warn}>{c.ocp}</Badge></td>
                  <td style={{padding:"10px 12px",color:C.muted,fontSize:12}}>{c.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── PRICE RADAR ───────────────────────────────────────────────────────────
function RadarView(){
  return (
    <div className="anim">
      <SectionTitle icon={Layers} title="Radar de Preço" sub="Posicionamento competitivo e recomendações"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Radar Competitivo</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke={C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:C.muted,fontSize:11}}/>
              <Radar name="Seu Hotel" dataKey="h" stroke={C.gold} fill={C.gold} fillOpacity={0.2} strokeWidth={2}/>
              <Radar name="Concorrência" dataKey="c" stroke={C.info} fill={C.info} fillOpacity={0.1} strokeWidth={1.5}/>
              <Legend wrapperStyle={{fontSize:12,color:C.muted}}/>
              <Tooltip content={<TT/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:16}}>Comparação de Preços</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
            {[{l:"Seu Preço",v:318,p:50,c:C.gold},{l:"Média da Região",v:325,p:51,c:C.info},{l:"Concorrente Mais Barato",v:180,p:28,c:C.ok},{l:"Concorrente Premium",v:520,p:82,c:C.purple}].map(i=>(
              <div key={i.l}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:C.muted}}>{i.l}</span>
                  <span style={{color:i.c,fontWeight:700}}>R$ {i.v}/noite</span>
                </div>
                <div style={{background:C.bg3,borderRadius:4,height:8}}>
                  <div style={{width:`${i.p}%`,height:8,borderRadius:4,background:i.c}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:`${C.ok}10`,border:`1px solid ${C.ok}30`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontSize:12,fontWeight:600,color:C.ok,marginBottom:6}}>✓ Posicionamento Saudável</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>Seu preço está 2,1% abaixo da média regional. Há espaço para aumento de R$ 15-20/noite sem impacto na ocupação.</div>
          </div>
        </Card>
      </div>
      <Card>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:14}}>Recomendações de Revenue Management</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
          {[{t:"Alta Temporada (Dez-Jan)",r:"Aumente o preço para R$ 420-480. Demanda alta justifica premium.",c:C.ok},
            {t:"Baixa Temporada (Mar-Abr)",r:"Ofereça pacotes com café incluso. Mantenha ocupação acima de 65%.",c:C.warn},
            {t:"Semana Santa (Abr 2026)",r:"Aplique tarifa dinâmica R$ 380-420. Demanda 35% acima da média.",c:C.info}].map(r=>(
            <div key={r.t} style={{background:C.bg3,borderRadius:10,padding:"14px"}}>
              <div style={{fontSize:11,color:r.c,fontWeight:600,marginBottom:6}}>{r.t.toUpperCase()}</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{r.r}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── ALERTS ────────────────────────────────────────────────────────────────
function AlertsView({alerts,setAlerts}){
  const mark=(id)=>setAlerts(p=>p.map(a=>a.id===id?{...a,lido:true}:a));
  const del=(id)=>setAlerts(p=>p.filter(a=>a.id!==id));
  return (
    <div className="anim">
      <SectionTitle icon={Bell} title="Alertas" sub={`${alerts.filter(a=>!a.lido).length} alertas não lidos`}/>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {alerts.map(a=>(
          <div key={a.id} style={{background:a.lido?C.card:`${alertColor[a.tp]}10`,border:`1px solid ${a.lido?C.border:`${alertColor[a.tp]}40`}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,opacity:a.lido?0.6:1,transition:"all .2s"}}>
            <div style={{color:alertColor[a.tp],flexShrink:0}}>{alertIcon[a.tp]}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:a.lido?400:500,color:C.text}}>{a.msg}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3}}>{a.dt}</div>
            </div>
            {!a.lido&&<button onClick={()=>mark(a.id)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:"DM Sans, sans-serif",whiteSpace:"nowrap"}}>Marcar lido</button>}
            <button onClick={()=>del(a.id)} style={{background:"none",border:"none",color:C.faint,cursor:"pointer"}}><X size={14}/></button>
          </div>
        ))}
        {alerts.length===0&&(
          <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
            <CheckCircle size={32} color={C.ok} style={{margin:"0 auto 12px"}}/>
            <div style={{fontSize:15,fontWeight:500}}>Nenhum alerta ativo</div>
            <div style={{fontSize:13,marginTop:4}}>Tudo funcionando perfeitamente!</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── REPORTS ───────────────────────────────────────────────────────────────
function ReportsView({hotel}){
  const [loading,setLoading]=useState(false);
  const [report,setReport]=useState(null);

  const generate=async()=>{
    setLoading(true);setReport(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1200,
          messages:[{role:"user",content:`Gere um relatório estratégico completo para o ${hotel?.nome||"hotel"} (${hotel?.cidade||"Brasil"}, ${hotel?.cat||"4★"}).
Dados: Ocupação ${hotel?.ocp||78}%, Receita R$${(hotel?.rec||725000).toLocaleString()}, Ticket médio R$${hotel?.ticket||318}, ROAS ${hotel?.roas||12.4}x, CAC R$${hotel?.cac||36}.
Canais: Google Ads ROAS 6x (melhor), Instagram ROAS 4x (otimizar), Booking ROAS 17.8x, Airbnb ROAS 23.3x.
Gere JSON: {"diagnostico":"texto","pontos_fortes":["p1","p2","p3"],"pontos_fracos":["f1","f2","f3"],"oportunidades":["o1","o2","o3"],"previsao_receita":"texto","recomendacoes_marketing":["r1","r2","r3","r4"],"score_geral":0-100}. SOMENTE JSON.`}]
        })
      });
      const data=await res.json();
      const text=data.content?.[0]?.text||"{}";
      try{setReport(JSON.parse(text.replace(/```json|```/g,"")));}catch{
        setReport({diagnostico:"Hotel com boa performance geral, ocupação acima de 78% e ROAS de 12.4x são indicadores sólidos.",pontos_fortes:["ROAS acima da média do setor","Airbnb e Booking com excelente performance","Ticket médio competitivo"],pontos_fracos:["Instagram com ROAS abaixo do ideal","Setembro com ocupação abaixo da meta","CAC pode ser reduzido em Instagram"],oportunidades:["Aumentar investimento em Google Ads","Criar conteúdo de quartos (converte 4x mais)","Pacotes de alta temporada para Dezembro"],previsao_receita:"Projeção R$850K no ano com as melhorias recomendadas (+17% vs atual)",recomendacoes_marketing:["Aumentar budget Google Ads em 30%","Pausar Instagram Stories, focar em Reels","Criar landing page específica para Dez","Implementar e-mail marketing pós-reserva"],score_geral:78});
      }
    }catch(e){
      setReport({diagnostico:"Não foi possível gerar o relatório. Verifique a conexão.",pontos_fortes:[],pontos_fracos:[],oportunidades:[],previsao_receita:"",recomendacoes_marketing:[],score_geral:0});
    }
    setLoading(false);
  };

  return (
    <div className="anim">
      <SectionTitle icon={FileText} title="Relatório Estratégico" sub="Diagnóstico completo gerado por IA"/>
      {!report&&(
        <Card style={{textAlign:"center",padding:"40px 20px",marginBottom:20}}>
          <div style={{width:64,height:64,borderRadius:16,background:C.goldD,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.gold}}>
            <FileText size={28}/>
          </div>
          <h3 style={{fontSize:18,marginBottom:8}}>Gerar Relatório Estratégico</h3>
          <p style={{fontSize:13,color:C.muted,marginBottom:20,maxWidth:400,margin:"0 auto 20px"}}>A IA analisará todos os dados do hotel e gerará um diagnóstico completo com recomendações personalizadas.</p>
          <button onClick={generate} disabled={loading} style={{padding:"12px 32px",background:C.gold,border:"none",borderRadius:10,color:C.bg0,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
            {loading?"⏳ Gerando análise...":"🚀 Gerar Relatório"}
          </button>
        </Card>
      )}
      {report&&(
        <div style={{animation:"fadeIn .4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:72,height:72,borderRadius:16,background:`${report.score_geral>=80?C.ok:report.score_geral>=60?C.warn:C.danger}20`,border:`2px solid ${report.score_geral>=80?C.ok:report.score_geral>=60?C.warn:C.danger}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:24,fontWeight:700,fontFamily:"Cormorant Garamond, serif",color:report.score_geral>=80?C.ok:report.score_geral>=60?C.warn:C.danger}}>{report.score_geral}</span>
                <span style={{fontSize:9,color:C.muted}}>Score</span>
              </div>
              <div>
                <h3 style={{fontSize:17,fontWeight:600}}>{hotel?.nome}</h3>
                <p style={{fontSize:12,color:C.muted}}>Relatório gerado em {new Date().toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
            <button onClick={generate} style={{display:"flex",alignItems:"center",gap:6,background:C.bg3,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 14px",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
              <RefreshCw size={13}/> Regerar
            </button>
          </div>
          <Card style={{marginBottom:16}}>
            <h4 style={{fontSize:13,color:C.gold,fontWeight:600,marginBottom:8}}>DIAGNÓSTICO GERAL</h4>
            <p style={{fontSize:13,color:C.muted,lineHeight:1.7}}>{report.diagnostico}</p>
          </Card>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16}}>
            {[{t:"Pontos Fortes",items:report.pontos_fortes,c:C.ok,icon:"✓"},
              {t:"Pontos Fracos",items:report.pontos_fracos,c:C.danger,icon:"✗"},
              {t:"Oportunidades",items:report.oportunidades,c:C.info,icon:"→"}].map(s=>(
              <Card key={s.t} style={{borderColor:`${s.c}30`}}>
                <h4 style={{fontSize:13,color:s.c,fontWeight:600,marginBottom:10}}>{s.t.toUpperCase()}</h4>
                {s.items?.map((item,i)=>(
                  <div key={i} style={{fontSize:12,color:C.muted,marginBottom:6,display:"flex",gap:6,lineHeight:1.5}}>
                    <span style={{color:s.c,flexShrink:0}}>{s.icon}</span>{item}
                  </div>
                ))}
              </Card>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {report.previsao_receita&&<Card>
              <h4 style={{fontSize:13,color:C.gold,fontWeight:600,marginBottom:8}}>PREVISÃO DE RECEITA</h4>
              <p style={{fontSize:13,color:C.muted,lineHeight:1.7}}>{report.previsao_receita}</p>
            </Card>}
            <Card>
              <h4 style={{fontSize:13,color:C.info,fontWeight:600,marginBottom:10}}>TOP RECOMENDAÇÕES</h4>
              {report.recomendacoes_marketing?.map((r,i)=>(
                <div key={i} style={{fontSize:12,color:C.muted,marginBottom:6,display:"flex",gap:8}}>
                  <span style={{color:C.gold,fontWeight:700,flexShrink:0}}>{i+1}.</span>{r}
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",label:"Dashboard",icon:LayoutDashboard},
  {id:"hotels",label:"Meus Hotéis",icon:Building2},
  {id:"marketing",label:"Marketing",icon:Target},
  {id:"occupancy",label:"Ocupação & Receita",icon:Activity},
  {id:"ai",label:"Consultor IA",icon:Brain},
  {id:"competitors",label:"Concorrentes",icon:Search},
  {id:"radar",label:"Radar de Preço",icon:Layers},
  {id:"alerts",label:"Alertas",icon:Bell},
  {id:"reports",label:"Relatórios",icon:FileText},
];

function Sidebar({section,setSection,sidebarOpen,setSidebarOpen,user,onLogout,alerts,hotel}){
  const unread=alerts.filter(a=>!a.lido).length;
  const content=(
    <div style={{width:220,height:"100%",background:C.bg1,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"24px 20px 20px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.goldD,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold}}>
            <Hotel size={18}/>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700,fontFamily:"Cormorant Garamond, serif",color:C.text,lineHeight:1}}>HotelIQ</div>
            <div style={{fontSize:10,color:C.muted}}>Revenue Intelligence</div>
          </div>
        </div>
        {hotel&&<div style={{background:C.bg3,borderRadius:8,padding:"8px 10px"}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:600,marginBottom:2}}>HOTEL ATIVO</div>
          <div style={{fontSize:12,color:C.text,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{hotel.nome}</div>
          <div style={{fontSize:10,color:C.muted}}>{hotel.cidade}, {hotel.estado}</div>
        </div>}
      </div>
      <nav style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
        {NAV.map(n=>{
          const active=section===n.id;
          const hasAlert=n.id==="alerts"&&unread>0;
          return (
            <button key={n.id} onClick={()=>{setSection(n.id);setSidebarOpen(false);}}
              style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",marginBottom:2,borderRadius:9,background:active?C.goldD:"transparent",border:`1px solid ${active?`${C.gold}40`:"transparent"}`,color:active?C.gold:C.muted,fontSize:13,fontWeight:active?600:400,cursor:"pointer",fontFamily:"DM Sans, sans-serif",textAlign:"left",position:"relative",transition:"all .15s"}}>
              <n.icon size={15}/>
              <span style={{flex:1}}>{n.label}</span>
              {hasAlert&&<span style={{width:7,height:7,borderRadius:"50%",background:C.danger,flexShrink:0}}/>}
            </button>
          );
        })}
      </nav>
      <div style={{padding:"12px 10px",borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:6}}>
          <div style={{width:28,height:28,borderRadius:8,background:`${C.info}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.info}}>
            {user?.name?.[0]?.toUpperCase()||"U"}
          </div>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:12,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name||"Usuário"}</div>
            <div style={{fontSize:10,color:C.muted}}>Pro Plan</div>
          </div>
        </div>
        <button onClick={onLogout} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>
          <LogOut size={13}/> Sair
        </button>
      </div>
    </div>
  );
  return (
    <>
      <div style={{display:"none"}} className="sidebar-desktop">{content}</div>
      <div style={{display:"flex"}} className="sidebar-desktop">{content}</div>
      {sidebarOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex"}}>
          <div style={{flex:1,background:"rgba(6,9,16,0.7)"}} onClick={()=>setSidebarOpen(false)}/>
          <div style={{position:"absolute",left:0,top:0,bottom:0}}>{content}</div>
        </div>
      )}
    </>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
function MainApp({user,hotels,setHotels,currentHotel,setCurrentHotel,section,setSection,sidebarOpen,setSidebarOpen,alerts,setAlerts,onLogout}){
  const unread=alerts.filter(a=>!a.lido).length;
  const views={
    dashboard:<DashboardView hotel={currentHotel} alerts={alerts}/>,
    hotels:<HotelsView hotels={hotels} setHotels={setHotels} currentHotel={currentHotel} setCurrentHotel={setCurrentHotel}/>,
    marketing:<MarketingView/>,
    occupancy:<OccupancyView/>,
    ai:<AIView hotel={currentHotel}/>,
    competitors:<CompetitorsView/>,
    radar:<RadarView/>,
    alerts:<AlertsView alerts={alerts} setAlerts={setAlerts}/>,
    reports:<ReportsView hotel={currentHotel}/>,
  };
  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:C.bg0}}>
      <style>{FONTS}{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-topbar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sidebar-desktop { display: flex !important; }
          .mobile-topbar { display: none !important; }
        }
      `}</style>
      <Sidebar section={section} setSection={setSection} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} onLogout={onLogout} alerts={alerts} hotel={currentHotel}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div className="mobile-topbar" style={{display:"none",alignItems:"center",gap:12,padding:"14px 16px",background:C.bg1,borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <button onClick={()=>setSidebarOpen(true)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><Menu size={22}/></button>
          <span style={{fontSize:18,fontWeight:700,fontFamily:"Cormorant Garamond, serif",color:C.text,flex:1}}>HotelIQ</span>
          {unread>0&&<span style={{background:C.danger,color:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{unread}</span>}
        </div>
        <main style={{flex:1,overflowY:"auto",padding:"28px 28px"}}>
          {views[section]||views.dashboard}
        </main>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function HotelIQ(){
  const [loggedIn,setLoggedIn]=useState(false);
  const [user,setUser]=useState(null);
  const [hotels,setHotels]=useState(DEF_HOTELS);
  const [currentHotel,setCurrentHotel]=useState(DEF_HOTELS[0]);
  const [section,setSection]=useState("dashboard");
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [alerts,setAlerts]=useState(DEF_ALERTS);

  useEffect(()=>{
    const init=async()=>{
      try{
        const r=await window.storage.get("hiq_auth");
        if(r){const d=JSON.parse(r.value);setLoggedIn(true);setUser(d);}
      }catch(e){}
      try{
        const r=await window.storage.get("hiq_hotels");
        if(r){const h=JSON.parse(r.value);setHotels(h);setCurrentHotel(h[0]);}
      }catch(e){}
    };
    init();
  },[]);

  const login=async(email,pass)=>{
    const u={name:email.split("@")[0],email};
    try{await window.storage.set("hiq_auth",JSON.stringify(u));}catch(e){}
    setUser(u);setLoggedIn(true);
  };

  const logout=async()=>{
    try{await window.storage.delete("hiq_auth");}catch(e){}
    setLoggedIn(false);setUser(null);
  };

  if(!loggedIn) return <AuthScreen onLogin={login}/>;
  return <MainApp user={user} hotels={hotels} setHotels={setHotels} currentHotel={currentHotel} setCurrentHotel={setCurrentHotel} section={section} setSection={setSection} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} alerts={alerts} setAlerts={setAlerts} onLogout={logout}/>;
}
