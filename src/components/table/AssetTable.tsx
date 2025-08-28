import AssetRow from './AssetRow'
import type { AssetItem } from '@/types'
export default function AssetTable({items,onBuy,onSell}:{items:AssetItem[];onBuy:(id:string)=>void;onSell:(id:string)=>void}){
  return (<table className='table' aria-label='Assets'>
    <thead><tr><th className='asset'>Asset</th><th className='price'>Price (USD)</th><th className='actions'>Actions</th></tr></thead>
    <tbody>{items.map(a=>(<AssetRow key={a.id} asset={a} onBuy={()=>onBuy(a.id)} onSell={()=>onSell(a.id)} />))}</tbody>
  </table>)
}