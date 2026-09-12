import Image from 'next/image';
function Still({name,src}:{name?:string;src?:string}) {return <div className="uj-preview-still"><Image src={src || `/lp-assets/studio/${name}.webp`} width={1112} height={626} sizes="(max-width:760px) 75vw, 280px" alt=""/><span aria-hidden="true">▶</span></div>;}
export default function UsePreview({kind}:{kind:'site'|'mail'|'youtube'}) {
  return <figure className={`uj-use-preview uj-preview-${kind}`} aria-label={`${kind==='site'?'採用サイト':kind==='mail'?'候補者へのメール':'企業YouTube'}での動画活用イメージ`}>
    <div className="uj-preview-chrome" aria-hidden="true"><i/><i/><i/><span>{kind==='site'?'RECRUIT SITE':kind==='mail'?'MAIL':'YouTube'}</span></div>
    {kind==='site'?<div className="uj-preview-body"><div className="uj-preview-site-head"><b>社員を知る。</b><span>人と仕事、その一日。</span></div><Still name="kitchen-2"/><div className="uj-preview-lines" aria-hidden="true"><i/><i/></div></div>:kind==='mail'?<div className="uj-preview-body"><div className="uj-preview-mail-title">選考のご案内</div><div className="uj-preview-lines" aria-hidden="true"><i/><i/><i/></div><div className="uj-preview-mail-film"><Still name="cafe-1"/><div><b>働く姿を、動画で。</b><span>密着動画を見る ↗</span></div></div></div>:<div className="uj-preview-body"><div className="uj-preview-channel"><span aria-hidden="true">▶</span><b>御社の公式チャンネル</b></div><div className="uj-preview-channel-grid"><div><Still src="/culture-assets/storefront-real-v3.png"/><span>働く一日に密着</span></div><div><Still name="cafe-3"/><span>仕事への想い</span></div></div></div>}
  </figure>;
}
