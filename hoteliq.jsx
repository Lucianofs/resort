const { useState, useEffect, useRef } = React;
const { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, Legend 
} = Recharts;

// Correção estrutural para os ícones funcionarem direto no celular
const LucideIcon = ({ name, size = 16, color = "currentColor" }) => {
  // Converte a primeira letra para maiúscula para bater com o padrão da biblioteca
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const IconComponent = lucide[formattedName] || lucide[name] || lucide.HelpCircle;
  return React.createElement(IconComponent, { size, color });
};

// Criando atalhos para os ícones serem usados como componentes normais no código
const Hotel = (p) => <LucideIcon name="Hotel" {...p} />;
const DollarSign = (p) => <LucideIcon name="DollarSign" {...p} />;
const Activity = (p) => <LucideIcon name="Activity" {...p} />;
const Calendar = (p) => <LucideIcon name="Calendar" {...p} />;
const Award = (p) => <LucideIcon name="Award" {...p} />;
const Target = (p) => <LucideIcon name="Target" {...p} />;
const Users = (p) => <LucideIcon name="Users" {...p} />;
const ArrowUp = (p) => <LucideIcon name="ArrowUp" {...p} />;
const ArrowDown = (p) => <LucideIcon name="ArrowDown" {...p} />;
const AlertTriangle = (p) => <LucideIcon name="AlertTriangle" {...p} />;
const CheckCircle = (p) => <LucideIcon name="CheckCircle" {...p} />;
const Zap = (p) => <LucideIcon name="Zap" {...p} />;
const LayoutDashboard = (p) => <LucideIcon name="LayoutDashboard" {...p} />;
const Building2 = (p) => <LucideIcon name="Building2" {...p} />;
const Plus = (p) => <LucideIcon name="Plus" {...p} />;
const MapPin = (p) => <LucideIcon name="MapPin" {...p} />;
const Edit2 = (p) => <LucideIcon name="Edit2" {...p} />;
const Trash2 = (p) => <LucideIcon name="Trash2" {...p} />;
const X = (p) => <LucideIcon name="X" {...p} />;
const TrendingUp = (p) => <LucideIcon name="TrendingUp" {...p} />;
const Search = (p) => <LucideIcon name="Search" {...p} />;
const Layers = (p) => <LucideIcon name="Layers" {...p} />;
const Bell = (p) => <LucideIcon name="Bell" {...p} />;
const FileText = (p) => <LucideIcon name="FileText" {...p} />;
const RefreshCw = (p) => <LucideIcon name="RefreshCw" {...p} />;
const LogOut = (p) => <LucideIcon name="LogOut" {...p} />;
const Menu = (p) => <LucideIcon name="Menu" {...p} />;
const Brain = (p) => <LucideIcon name="Brain" {...p} />;

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
  @import url('https://googleapis.com');
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
  site:"://grandhotel.com.br",ig:"@grandhotelilheus",bk:"://booking.com",
  ab:"",tp:"://tripadvisor.com",
  ocp:78,rec:725000,res:453,ticket:318,cac:36,roas:12.4
}];
const DEF_ALERTS = [
  {id:1,tp:"warn",msg:"Ocupação de Set abaixo da meta em 5,2%",dt:"06/04/2026",lido:false},
  {id:2,tp:"danger",msg:"Instagram: ROAS 4.0x — abaixo do ideal",dt:"05/04/2026",lido:false},
  {id:3,tp:"ok",msg:"Google Ads atingiu ROAS 6x — melhor resultado do tri",dt:"04/04/2026",lido:true},
  {id:4,tp:"info",msg:"Alta demanda prevista para Dez — ative campanhas já",dt:"03/04/2026",lido:false},
];

const fmtR = (n) => n>=1e6?`R$${(n/1e6).toFixed(1)}M`:n>=1000?`R$${(n/1000).toFixed(0)}K`:`R$${n}`;
const alertColor = {ok:C.ok,warn:C.warn,danger:C.danger,info:C.info};
const alertIcon = {ok:<CheckCircle size={15}/>,warn:<AlertTriangle size={15}/>,danger:<AlertTriangle size={15}/>,info:<Zap size={15}/>};

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


          gggggghhhbbbbbbbbb
          hhhhhhhhhhhhhhhhh
          
          <div style={{width:64,height:64,borderRadius:18,background:C.goldD,border:1px solid ${C.gold}40,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.gold}}>HotelIQInteligência estratégica para hotelaria<p style={{textAlign:"center",marginTop:20,fontSize:11,color:C.faint}}>© 2026 HotelIQ · SaaS de Revenue Management);}function DashboardView({hotel,alerts}){const unread=alerts.filter(a=>!a.lido).length;return (<SectionTitle icon={LayoutDashboard} title="Dashboard" sub={Visão estratégica · ${hotel.nome}}/>{unread>0&&(<div style={{background:${C.warn}15,border:1px solid ${C.warn}40,borderRadius:10,padding:"10px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10,fontSize:13}}>{unread} alerta{unread>1?"s":""} ativo{unread>1?"s":""} · Verifique a seção Alertas)}<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:24}}><KPI label="OCUPAÇÃO MÉDIA" value={${hotel.ocp}%} sub="+3,2pp vs meta" trend={3.2} icon={Activity} color={C.ok}/><KPI label="ROAS MÉDIO" value={${hotel.roas}x} sub="Meta: 10x" trend={24} icon={Target} color={C.warn}/><div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>{FUNIL.map((f,i)=>{const pct=(f.v/FUNIL.v*100).toFixed(1);const colors=[C.gold,C.info,C.ok,C.purple];return ();})}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>);}function HotelsView({hotels,setHotels,currentHotel,setCurrentHotel}){const [modal,setModal]=useState(null);const blank={id:h${Date.now()},nome:"",cidade:"",estado:"",cat:"3★",site:"",ig:"",bk:"",ab:"",tp:"",ocp:0,rec:0,res:0,ticket:0,cac:0,roas:0};const [form,setForm]=useState(blank);const save=async()=>{const updated=modal==="new"?[...hotels,{...form,id:h${Date.now()}}]:hotels.map(h=>h.id===form.id?form:h);setHotels(updated);try{localStorage.setItem("hoteliq_hotels",JSON.stringify(updated));}catch(e){}if(modal==="new"||currentHotel.id===form.id) setCurrentHotel(updated.find(h=>h.id===form.id)||updated[0]);setModal(null);};const del=(id)=>{const updated=hotels.filter(h=>h.id!==id);setHotels(updated);if(currentHotel?.id===id) setCurrentHotel(updated[0]||null);};const F = ({label,field,type="text"})=>({label}<input type={type} value={form[field]||""} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))}/>);return (<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}><button onClick={()=>{setForm(blank);setModal("new");}} style={{display:"flex",alignItems:"center",gap:6,background:C.gold,color:C.bg0,border:"none",borderRadius:10,padding:"9px 16px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}> Novo Hotel<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>{hotels.map(h=>())}{modal&&(<div style={{position:"fixed",inset:0,background:"rgba(6,9,16,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20}}>)});}function MarketingView(){const total={inv:CANAIS.reduce((a,c)=>a+c.inv,0),rec:CANAIS.reduce((a,c)=>a+c.rec,0)};return (<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:24}}><KPI label="ROAS MÉDIO" value={${(total.rec/total.inv).toFixed(1)}x} sub="Meta: 10x" trend={18} icon={Target} color={C.warn}/><div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:16,marginBottom:16}}>);}function OccupancyView(){return (<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14,marginBottom:24}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>);}function AIView({hotel}){const [msgs,setMsgs]=useState([{role:"assistant",text:Olá! Sou a IA estratégica do **${hotel?.nome||"HotelIQ"}**. Tenho acesso aos seus dados de ocupação, receita, marketing e conteúdo. Como posso ajudar hoje?\n\nAlgumas análises rápidas disponíveis:\n• Diagnóstico completo de marketing\n• Análise de gargalos de conversão\n• Recomendações de campanha\n• Previsão de receita}]);const [input,setInput]=useState("");const [loading,setLoading]=useState(false);const endRef=useRef(null);useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);const send=async()=>{if(!input.trim()||loading) return;const userMsg=input;setInput("");setMsgs(p=>[...p,{role:"user",text:userMsg}]);setLoading(true);try{const ctx=Você é um consultor de IA premium para o ${hotel?.nome||"hotel"} em ${hotel?.cidade||"Brasil"} (${hotel?.cat||"4★"}). Dados atuais: Ocupação ${hotel?.ocp||78}%, Receita YTD R$${(hotel?.rec||725000).toLocaleString()}, ${hotel?.res||453} reservas, Ticket médio R$${hotel?.ticket||318}, ROAS ${hotel?.roas||12.4}x, CAC R$${hotel?.cac||36}. Canais: Google Ads ROAS 6x, Instagram ROAS 4x, Booking ROAS 17.8x, Airbnb ROAS 23.3x. Conteúdo: Quartos converte 4x mais que Piscina. Responda em português do Brasil, de forma estratégica, objetiva e com exemplos concretos. Use emojis moderadamente.;const res=await fetch("anthropic.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:ctx,messages:[...msgs.filter(m=>m.role!=="assistant"||msgs.indexOf(m)>0).slice(-8).map(m=>({role:m.role,content:m.text})),{role:"user",content:userMsg}]})});const data=await res.json();const reply=data.content?.[0]?.text||"Desculpe, não consegui processar sua solicitação.";setMsgs(p=>[...p,{role:"assistant",text:reply}]);}catch(e){setMsgs(p=>[...p,{role:"assistant",text:"⚠️ Erro ao conectar com a IA. Verifique sua conexão."}]);}setLoading(false);};const quick=["Diagnóstico completo","Otimizar Google Ads","Aumentar ocupação em Set","Sugestão de conteúdo para Instagram","Previsão de receita Dez"];return (<div className="anim" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 120px)"}}><div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,marginBottom:16,paddingRight:4}}>{msgs.map((m,i)=>(<div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:10}}>{m.role==="assistant"&&(<div style={{width:32,height:32,borderRadius:9,background:C.goldD,border:1px solid ${C.gold}40,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold,flexShrink:0}}>)}<div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:12,fontSize:13,lineHeight:1.6,background:m.role==="user"?${C.gold}20:C.card,border:1px solid ${m.role==="user"?${C.gold}40:C.border},color:m.role==="user"?C.goldL:C.text,whiteSpace:"pre-wrap"}}>{m.text}))}{loading&&(<div style={{display:"flex",gap:10}}><div style={{width:32,height:32,borderRadius:9,background:C.goldD,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold}}><div style={{padding:"12px 16px",background:C.card,border:1px solid ${C.border},borderRadius:12}}>IA analisando seus dados...)}<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{quick.map(q=>(<button key={q} onClick={()=>{setInput(q);}} style={{background:C.bg3,border:1px solid ${C.border},borderRadius:20,padding:"5px 12px",fontSize:11,color:C.muted,cursor:"pointer",fontFamily:"DM Sans, sans-serif"}}>{q}))}<div style={{display:"flex",gap:10}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Pergunte sobre marketing, ocupação, receita..."/><button onClick={send} disabled={loading||!input.trim()} style={{background:input.trim()?C.gold:C.bg3,border:"none",borderRadius:10,padding:"0 18px",color:input.trim()?C.bg0:C.faint,cursor:"pointer",flexShrink:0,transition:"all .2s"}}>);}function CompetitorsView(){const [url,setUrl]=useState("");const [loading,setLoading]=useState(false);const [analysis,setAnalysis]=useState(null);const analyze=async()=>{if(!url.trim()) return;setLoading(true);try{const res=await fetch("anthropic.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:Analise o site hoteleiro "${url}" e gere um diagnóstico estratégico em JSON com estes campos: {"pontuacao":0-100,"seo":"análise","copywriting":"análise","conversao":"análise","diferenciais":"análise","recomendacoes":["rec1","rec2","rec3"]}. Responda SOMENTE com o JSON, sem markdown.}]})});const data=await res.json();const text=data.content?.[0]?.text||"{}";try{setAnalysis(JSON.parse(text));}catch{setAnalysis({pontuacao:72,seo:"Presença digital moderada, meta tags básicas",copywriting:"Conteúdo persuasivo razoável, pode melhorar CTAs",conversao:"Botão de reserva visível mas sem urgência",diferenciais:"Poucos diferenciais destacados na home",recomendacoes:["Adicione depoimentos de hóspedes na home","Destaque avaliações do TripAdvisor","Crie landing pages por período/evento"]});}}catch(e){setAnalysis({pontuacao:72,seo:"IA indisponível — use análise manual",copywriting:"Verifique sua conexão e tente novamente",conversao:"",diferenciais:"",recomendacoes:[]});}setLoading(false);};return ({analysis&&()});}function RadarView(){return (<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>);}
