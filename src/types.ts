export type AssetItem={id:string;slug:string;symbol:string;name:string;iconUrl:string;priceUsd:number|null}
export type AssetsResponse={items:AssetItem[];nextPage?:number}
