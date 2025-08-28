import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAssetsCatalog, usePrice } from '@/lib/api'
import { useAuthStore } from '@/state/useAuthStore'

type Mode='CRYPTO_TO_FIAT'|'FIAT_TO_CRYPTO'

export default function Trade(){
  const { user } = useAuthStore()
  const nav = useNavigate()
  const { data: catalog } = useAssetsCatalog()
  const location = useLocation() as { state?: { assetId?: string, intent?: 'buy' | 'sell' } }
  const [selectedAssetId,setSelectedAssetId]=useState<string>('bitcoin')
  const [mode,setMode]=useState<Mode>('CRYPTO_TO_FIAT')
  const [cryptoAmount,setCryptoAmount]=useState('')
  const [fiatAmount,setFiatAmount]=useState('')
  const price = usePrice(selectedAssetId)

  useEffect(()=>{ if(!user){ nav('/',{replace:true,state:{login:true}}); return } if(location?.state?.assetId) setSelectedAssetId(location.state.assetId) },[location,user,nav])

  // const selected=useMemo(()=>catalog?.find(a=>a.id===selectedAssetId),[catalog,selectedAssetId])
  // const rateText = (()=>{
  //   if(price.status==='loading') return 'Loading…'
  //   const p = typeof price.data === 'number' ? price.data : null
  //   const s = selected?.symbol ?? ''
  //   if(p==null || !isFinite(p)) return `1 ${s} = —`
  //   try { return `1 ${s} = $${p.toLocaleString(undefined,{maximumFractionDigits:8})}` } catch { return `1 ${s} = $${p}` }
  // })()
  const selected = useMemo(
  () => catalog?.find((a) => a.id === selectedAssetId),
  [catalog, selectedAssetId]
);

// v5-safe + null-safe rate text
const rateText = useMemo(() => {
  if (price.isLoading) return 'Loading…';
  if (price.isError || typeof price.data !== 'number') return '—';

  const s = selected?.symbol ?? '';
  return `1 ${s} = $${price.data.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
}, [price.isLoading, price.isError, price.data, selected?.symbol]);

  function onSwap(){ setMode(m=>m==='CRYPTO_TO_FIAT'?'FIAT_TO_CRYPTO':'CRYPTO_TO_FIAT'); setCryptoAmount(prev=>{ const next=fiatAmount; setFiatAmount(prev); return next }) }
  function onCryptoChange(v:string){ setCryptoAmount(v); const n=Number(v); if(!isFinite(n)||typeof price.data!=='number') return setFiatAmount(''); setFiatAmount((n*price.data).toString()) }
  function onFiatChange(v:string){ setFiatAmount(v); const n=Number(v); if(!isFinite(n)||typeof price.data!=='number') return setCryptoAmount(''); setCryptoAmount((n/price.data).toString()) }

  return (<section className='card'>
    <h2 style={{marginTop:0}}>Trade</h2>
    <p className='rate' style={{marginTop:-6}}>Real-time price in USD. Swap to enter fiat first.</p>
    <div className='row' style={{gap:12,marginTop:16}}>
      <div className='col'>
        <label><div style={{marginBottom:6}}>{mode==='CRYPTO_TO_FIAT'?'Crypto amount':'Fiat amount (USD)'}</div>
          <div className='row' style={{gap:8}}>{mode==='CRYPTO_TO_FIAT'? (<>
            <input className='input' type='number' min='0' step='any' placeholder='0.0' value={cryptoAmount} onChange={e=>onCryptoChange(e.target.value)} />
            <select className='select' value={selectedAssetId} onChange={e=>setSelectedAssetId(e.target.value)} style={{maxWidth:200}} aria-label='Select asset'>
              {catalog?.map(a=>(<option key={a.id} value={a.id}>{a.symbol} — {a.name}</option>))}
            </select></>):(<>
            <input className='input' type='number' min='0' step='any' placeholder='0.0' value={fiatAmount} onChange={e=>onFiatChange(e.target.value)} />
            <div style={{width:200}} className='badge'>$ USD</div></>)}</div></label></div>
      <button className='btn swap-fields' onClick={onSwap} aria-label='Swap fields'>⇅</button>
      <div className='col fiat-amount'>
        <label><div style={{marginBottom:6}}>{mode==='CRYPTO_TO_FIAT'?'Fiat amount (USD)':'Crypto amount'}</div>
          <div className='row' style={{gap:8}}>{mode==='CRYPTO_TO_FIAT'? (<>
            <input className='input' type='number' min='0' step='any' placeholder='0.0' value={fiatAmount} onChange={e=>onFiatChange(e.target.value)} />
            <div style={{width:200}} className='badge'>$ USD</div></>):(<>
            <input className='input' type='number' min='0' step='any' placeholder='0.0' value={cryptoAmount} onChange={e=>onCryptoChange(e.target.value)} />
            <select className='select' value={selectedAssetId} onChange={e=>setSelectedAssetId(e.target.value)} style={{maxWidth:200}} aria-label='Select asset'>
              {catalog?.map(a=>(<option key={a.id} value={a.id}>{a.symbol} — {a.name}</option>))}
            </select></>)}</div></label></div>
    </div>
    <div style={{marginTop:10}} className='rate'>{rateText}</div>
  </section>)
}