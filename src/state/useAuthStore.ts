import { create } from 'zustand'
type User={email:string}; type State={user:User|null;login:(e:string,p:string)=>void;logout:()=>void}
const KEY='auth_user_v2'; const SECRET='ct-demo-secret-2025'
const enc=(s:string)=>btoa([...s].map((c,i)=>String.fromCharCode(c.charCodeAt(0)^SECRET.charCodeAt(i%SECRET.length))).join(''))
const dec=(s:string)=>{try{const r=atob(s);return [...r].map((c,i)=>String.fromCharCode(c.charCodeAt(0)^SECRET.charCodeAt(i%SECRET.length))).join('')}catch{return''}}
function load():User|null{ try{ const raw=localStorage.getItem(KEY); if(!raw) return null; const obj=JSON.parse(dec(raw)); return obj?.email? obj as User : null } catch { return null } }
export const useAuthStore=create<State>(set=>({
  user: load(),
  login:(email)=>{ const user={email}; localStorage.setItem(KEY, enc(JSON.stringify(user))); set({user}) },
  logout:()=>{ localStorage.removeItem(KEY); set({user:null}) }
}))