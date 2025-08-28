import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from './Modal'
import { useAuthStore } from '../state/useAuthStore'
import { useUiStore } from '../state/useUiStore'

export default function Header(){
  const { user, login, logout } = useAuthStore()
  const { loginOpen, openLogin, closeLogin } = useUiStore()
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const loc=useLocation()
  useEffect(()=>{ if((loc.state as any)?.login) openLogin() },[loc,openLogin])
  const onSubmit=(e:React.FormEvent)=>{ e.preventDefault(); const ok=/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email); if(!ok) return alert('Enter a valid email.'); if(password.length<6) return alert('Password ≥ 6'); login(email,password); setEmail(''); setPassword(''); closeLogin() }
  return (<header className='header'><div className='header-inner container'>
    <div className='brand'>Crypto Trader</div>
    <nav className='nav'><NavLink to='/' end className={({isActive})=>isActive?'active':''}>Home</NavLink><NavLink to='/trade' className={({isActive})=>isActive?'active':''}>Trade</NavLink></nav>
    <div className='row'>{user? (<><span className='badge'>Signed in as {user.email}</span><button className='btn' onClick={logout}>Logout</button></>) : (<button className='btn primary' onClick={openLogin}>Log in</button>)}</div>
  </div>
  <Modal open={loginOpen} onClose={closeLogin}>
    <h3 style={{marginTop:0}}>Log in</h3>
    <form onSubmit={onSubmit} style={{display:'grid',gap:10}}>
      <input className='input' type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='you@example.com' />
      <input className='input' type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='••••••••' minLength={6} />
      <button className='btn primary' type='submit'>Log in</button>
    </form>
  </Modal></header>)
}