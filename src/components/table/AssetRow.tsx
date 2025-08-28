import type { AssetItem } from '@/types'
function formatUsd(v:number|null|undefined){ if(typeof v!=='number'||!isFinite(v)) return '—'; try{ return v.toLocaleString(undefined,{maximumFractionDigits:8}) } catch { return String(v) } }
export default function AssetRow({asset,onBuy,onSell}:{asset:AssetItem;onBuy:()=>void;onSell:()=>void}){
  return (<tr>
    <td className='asset-cell'><img className='asset-icon' src={asset.iconUrl} alt='' />
      <div><div style={{fontWeight:700}}>{asset.name} <span className='rate'>({asset.symbol})</span></div><div className='rate'>{asset.slug}</div></div></td>
    <td>${formatUsd(asset.priceUsd)}</td>
    <td style={{textAlign:'right'}}><button className='btn' onClick={onBuy} style={{marginRight:8}}>Buy</button><button className='btn' onClick={onSell}>Sell</button></td>
  </tr>)
}