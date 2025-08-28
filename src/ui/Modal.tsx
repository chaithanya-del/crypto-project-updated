import { useEffect } from 'react'; import { createPortal } from 'react-dom'
export default function Modal({open,onClose,children}:{open:boolean;onClose:()=>void;children:React.ReactNode}){
  useEffect(()=>{function f(e:KeyboardEvent){ if(e.key==='Escape') onClose() } if(open) document.addEventListener('keydown',f); return ()=>document.removeEventListener('keydown',f)},[open,onClose])
  if(!open) return null; const root=document.getElementById('modal-root')!; return createPortal(<div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',display:'grid',placeItems:'center'}}><div className='card' onClick={e=>e.stopPropagation()}>{children}</div></div>, root)
}