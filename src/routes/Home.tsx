import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AssetTable from '@/components/table/AssetTable'
import { fetchAssets } from '@/lib/api'
import type { AssetItem, AssetsResponse } from '@/types'

type SortKey='asset'|'price'; type SortDir='asc'|'desc'

export default function Home(){
  const navigate=useNavigate()
  const [sortKey,setSortKey]=useState<SortKey>('asset')
  const [sortDir,setSortDir]=useState<SortDir>('asc')

  const { data,isLoading,isError,fetchNextPage,hasNextPage,isFetchingNextPage } = useInfiniteQuery({
    queryKey:['assets'],
    initialPageParam:1,
    queryFn: async ({pageParam=1}) => fetchAssets({page:pageParam as number, perPage:10}),
    getNextPageParam:(lastPage:AssetsResponse)=>lastPage.nextPage,
  })

  const items=useMemo<AssetItem[]>(()=>{
    const pages:AssetsResponse[]=data?.pages ?? []
    const flat=pages.flatMap(p=>p.items)
    const mul=sortDir==='asc'?1:-1
    return [...flat].sort((a,b)=>{
      if(sortKey==='asset') return a.name.localeCompare(b.name)*mul
      const av=a.priceUsd ?? 0, bv=b.priceUsd ?? 0
      return (av-bv)*mul
    })
  },[data,sortKey,sortDir])

  return (<section className='card'>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
      <h2 style={{margin:0}}>Markets</h2>
      <div className='row'>
        <label className='row' style={{alignItems:'center'}}>
          <span className='rate' style={{marginRight:8}}>Sort by</span>
          <select className='select' value={sortKey} onChange={e=>setSortKey(e.target.value as SortKey)}>
            <option value='asset'>Asset</option><option value='price'>Price</option>
          </select>
        </label>
        <button className='btn' onClick={()=>setSortDir(d=>d==='asc'?'desc':'asc')}>{sortDir==='asc'?'↑':'↓'}</button>
      </div>
    </div>
    {isLoading && <div>Loading assets…</div>}
    {isError && <div className='alert'>Failed to load assets. Please try again later.</div>}
    <AssetTable items={items} onBuy={(id)=>navigate('/trade',{state:{assetId:id,intent:'buy'}})} onSell={(id)=>navigate('/trade',{state:{assetId:id,intent:'sell'}})} />
    <div style={{display:'flex',justifyContent:'center',marginTop:16}}>
      <button className='btn' onClick={()=>fetchNextPage()} disabled={!hasNextPage||isFetchingNextPage}>
        {isFetchingNextPage?'Loading…':hasNextPage?'Load more':'No more results'}
      </button>
    </div>
  </section>)
}