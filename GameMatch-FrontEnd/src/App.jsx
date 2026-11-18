import { useState } from 'react';
import Navbar from './components/Navbar.jsx';


const CATS=['Board Games','Indoor Games','Outdoor Games','Social','Christian','Relaxation'];
const ACTS=[['Chess',1,'indoor','social','low',30,120],
['Monopoly Night',1,'indoor','social','low',60,180],
['Solo Puzzle',1,'indoor','solo','low',30,90],
['Mario Kart',2,'indoor','social','medium',20,60],
['Darts',2,'indoor','either','low',20,60],
['Basketball',3,'outdoor','social','high',45,120],
['Frisbee',3,'outdoor','either','medium',20,60],
['Church Service',5,'indoor','social','low',60,120],
['Bible Study Group',5,'indoor','social','low',60,120],
['Prayer Walk',5,'outdoor','solo','low',20,60],
['Coffee with Friends',4,'either','social','low',45,120],
['Movie Night',4,'indoor','social','low',90,180],
['Reading Session',6,'either','solo','low',30,120],
['Worship Music',6,'either','solo','low',15,60]];

const rank=(p)=>ACTS.filter(a=>a[5]<=p.time).map(a=>{let s=0;if(a[2]===p.setting)s+=3;
  else if(a[2]==='either')s+=1;if(a[3]===p.social)s+=3;
  else if(a[3]==='either')s+=1;
  if(a[4]===p.energy)s+=2;
  if(p.time>=a[5]&&p.time<=a[6])s+=2;
  if(p.cat&&a[1]===+p.cat)s+=1;
  return{n:a[0],c:a[1],s}}).sort((x,y)=>y.s-x.s);

export default function App(){
  const [p,setP]=useState({setting:'either',social:'either',energy:'medium',time:'',cat:''});
  const [err,setErr]=useState(''),[res,setRes]=useState(null),[fav,setFav]=useState([]);
  const ch=(k)=>(e)=>setP({...p,[k]:e.target.value});
  const go=(e)=>{e.preventDefault();
    const t=+p.time;if(!t||t<1||t>1440)return setErr('Enter time 1–1440 min.');
    setErr('');setRes(rank({...p,time:t}));};
  const tog=(n)=>setFav(f=>f.includes(n)?f.filter(x=>x!==n):[...f,n]);
  return <div className="app"><Navbar/>
  <main>
    <h1>Find your next leisure activity</h1>
    <form onSubmit={go} className="grid">
      <select value={p.setting} onChange={ch('setting')}>
        <option>either</option>
        <option>indoor</option>
        <option>outdoor</option>
        </select>
      <select value={p.social} onChange={ch('social')}>
        <option>either</option>
        <option>solo</option>
        <option>social</option>
        </select>
      <select value={p.energy} onChange={ch('energy')}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
        </select>
      <input type="number" placeholder="Minutes" value={p.time} onChange={ch('time')}/>
      <select value={p.cat} onChange={ch('cat')}>
        <option value="">Any</option>{CATS.map((c,i)=><option key={i} value={i+1}>{c}</option>)}
        </select>
      <button className="btn">Find</button>{err&&<p className="err">{err}
        </p>}
      </form>
    {res&&<div className="cards">{res.map(r=><div className="card" key={r.n}><b>{r.n}</b><span className="badge">{r.s}</span><p>{CATS[r.c-1]}</p><button className="btn" onClick={()=>tog(r.n)}>{fav.includes(r.n)?'★ Saved':'☆ Save'}</button></div>)}</div>}
    {fav.length>0&&<p><b>Saved:</b> {fav.join(', ')}
    </p>}
    </main>
    <footer>GameMatch</footer>
    </div>;
}