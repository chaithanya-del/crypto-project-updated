import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../ui/Header'
import ErrorBoundary from '../ui/ErrorBoundary'
import { useEffect } from 'react'
import { useAuthStore } from '../state/useAuthStore'
export default function App(){ const { user } = useAuthStore(); const nav=useNavigate(); const loc=useLocation(); useEffect(()=>{ if(loc.pathname==='/trade' && !user){ nav('/',{replace:true,state:{login:true}}) } },[loc,user,nav]); return (<div><Header/><main className='container' style={{paddingTop:20,paddingBottom:40}}><ErrorBoundary><Outlet/></ErrorBoundary></main></div>) }