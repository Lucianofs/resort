const { useState, useEffect, useRef } = React;
const { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, Legend 
} = Recharts;

// Nova função leve de ícones que não trava o navegador do celular
const LucideIcon = ({ name, size = 16, color = "currentColor" }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);
  
  // Transforma o nome camelCase do lucide (ex: DollarSign) para o padrão de traço (dollar-sign)
  const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return <i data-lucide={kebabName} style={{ width: size, height: size, color: color, display: 'inline-block' }}></i>;
};

// Atalhos limpos para os componentes de ícones
const Hotel = (p) => <LucideIcon name="hotel" {...p} />;
const DollarSign = (p) => <LucideIcon name="dollar-sign" {...p} />;
const Activity = (p) => <LucideIcon name="activity" {...p} />;
const Calendar = (p) => <LucideIcon name="calendar" {...p} />;
const Award = (p) => <LucideIcon name="award" {...p} />;
const Target = (p) => <LucideIcon name="target" {...p} />;
const Users = (p) => <LucideIcon name="users" {...p} />;
const ArrowUp = (p) => <LucideIcon name="arrow-up" {...p} />;
const ArrowDown = (p) => <LucideIcon name="arrow-down" {...p} />;
const AlertTriangle = (p) => <LucideIcon name="alert-triangle" {...p} />;
const CheckCircle = (p) => <LucideIcon name="check-circle" {...p} />;
const Zap = (p) => <LucideIcon name="zap" {...p} />;
const LayoutDashboard = (p) => <LucideIcon name="layout-dashboard" {...p} />;
const Building2 = (p) => <LucideIcon name="building-2" {...p} />;
const Plus = (p) => <LucideIcon name="plus" {...p} />;
const MapPin = (p) => <LucideIcon name="map-pin" {...p} />;
const Edit2 = (p) => <LucideIcon name="edit-2" {...p} />;
const Trash2 = (p) => <LucideIcon name="trash-2" {...p} />;
const X = (p) => <LucideIcon name="x" {...p} />;
const TrendingUp = (p) => <LucideIcon name="trending-up" {...p} />;
const Search = (p) => <LucideIcon name="search" {...p} />;
const Layers = (p) => <LucideIcon name="layers" {...p} />;
const Bell = (p) => <LucideIcon name="bell" {...p} />;
const FileText = (p) => <LucideIcon name="file-text" {...p} />;
const RefreshCw = (p) => <LucideIcon name="refresh-cw" {...p} />;
const LogOut = (p) => <LucideIcon name="log-out" {...p} />;
const Menu = (p) => <LucideIcon name="menu" {...p} />;
const Brain = (p) => <LucideIcon name="brain" {...p} />;


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
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { background: ${C.bg0}; font-family: sans-serif; color: ${C.text}; min-height: 100vh; }
  input,textarea,select { background: ${C.bg3}; border: 1px solid ${C.border}; color: ${C.text}; padding: 8px 12px; border-radius: 8px; width: 100%; font-size: 14px; outline: none; }
  input:focus,textarea:focus,select:focus { border-color: ${C.gold}; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  .anim { animation: fadeIn .3s ease forwards; }
  .pulse { animation: pulse 2s infinite; }
`;

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
    <div style={{fontSize:26,fontWeight:700,color:C.text,lineHeight:1}}>{value}</div>
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

function AuthScreen({onLogin}){
  const [email,setEmail]=useState("demo@hoteliq.com.br");
  const [pass,setPass]=useState("hotel2026");
  const [loading,setLoading]=useState(false);
  const submit=async(e)=>{
    e.preventDefault();setLoading(true);
    await new Promise(r=>setTimeout(r,500));
    onLogin(email);setLoading(false);
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg0,padding:20}}>
      <style>{FONTS}</style>
      <div style={{width:"100%",maxWidth:420,animation:"fadeIn .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:64,height:64,borderRadius:18,background:C.goldD,border:`1px solid ${C.gold}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.gold}}>
            <Hotel size={28}/>
          </div>
          <h1 style={{fontSize:38,fontWeight:700,color:C.text}}>HotelIQ</h1>
        </div>
        <Card>
          <form onSubmit={submit}>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:6}}>E-MAIL</label>
              <input value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:6}}>SENHA</label>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
            </div>
            <button type="submit" style={{width:"100%",padding:"12px",background:C.gold,color:C.bg0,border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}>
              {loading?"Entrando...":"Entrar no Sistema"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

function DashboardView({hotel}){
  return (
    <div className="anim">
      <SectionTitle icon={LayoutDashboard} title="Dashboard" sub={`Visão estratégica · ${hotel.nome}`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:24}}>
        <KPI label="RECEITA ANUAL" value={fmtR(hotel.rec)} icon={DollarSign}/>
        <KPI label="OCUPAÇÃO MÉDIA" value={`${hotel.ocp}%`} icon={Activity} color={C.ok}/>
        <KPI label="RESERVAS" value={hotel.res.toLocaleString()} icon={Calendar} color={C.info}/>
        <KPI label="TICKET MÉDIO" value={fmtR(hotel.ticket)} icon={Award} color={C.purple}/>
      </div>
    </div>
  );
}

function MainApp({user,currentHotel,onLogout}){
  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:C.bg0}}>
      <style>{FONTS}</style>
      <div style={{width:220,background:C.bg1,borderRight:`1px solid ${C.border}`,padding:20,display:"flex",flexDirection:"column"}}>
        <h2 style={{color:C.gold,marginBottom:20,fontFamily:"serif"}}>HotelIQ</h2>
        <div style={{fontSize:12,color:C.muted,marginBottom:20}}>Olá, {user.name}</div>
        <button onClick={onLogout} style={{marginTop:"auto",padding:8,background:C.bg3,color:C.text,border:"none",borderRadius:8,cursor:"pointer"}}>Sair</button>
      </div>
      <main style={{flex:1,overflowY:"auto",padding:28}}>
        <DashboardView hotel={currentHotel}/>
      </main>
    </div>
  );
}

function HotelIQ(){
  const [loggedIn,setLoggedIn]=useState(false);
  const [user,setUser]=useState(null);
  const [currentHotel]=useState(DEF_HOTELS[0]);

  const login=(email)=>{
    setUser({name:email.split("@")[0],email});
    setLoggedIn(true);
  };

  if(!loggedIn) return <AuthScreen onLogin={login}/>;
  return <MainApp user={user} currentHotel={currentHotel} onLogout={()=>setLoggedIn(false)}/>;
}

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(HotelIQ));
