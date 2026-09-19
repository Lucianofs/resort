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
