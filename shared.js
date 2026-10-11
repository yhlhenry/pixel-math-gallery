// Shared by index.html (printable worksheets) and play.html (online game).
// Both pages must produce the same equations for the same 題目編號, so this code lives in one place.
(() => {
'use strict';
// Original 16×16 sprites. `half` rows are the left 8 columns and get mirrored, which keeps faces symmetric; '.' is background.
const ART_GALLERY=[
  {name:'貓咪',kind:'可愛動物',colors:{K:'#3d3132',O:'#f6a34b',P:'#f7a1b0',W:'#ffffff'},half:[
    '........','.KK.....','.KOK....','.KOOK...','.KOPOKKK','.KOOOOOO','KOOOOOOO','KOOWKOOO',
    'KOOKKOOO','KOOOOOOP','KPPOOOKO','KOOOOOOK','.KOOOOOO','..KKOOOO','....KKKK','........']},
  {name:'小雞',kind:'可愛動物',colors:{K:'#3d3132',Y:'#ffd64a',O:'#f5953d',P:'#ff9eb0',W:'#ffffff'},half:[
    '........','.......K','.....KKK','...KKYYY','..KYYYYY','.KYYYYYY','.KYYYWKY','KYYYYKKY',
    'KYPPYYOO','KYYYYYYO','KYYYYYYY','KYYYYYYY','.KYYYYYY','..KKYYYY','....KKKK','....OO..']},
  {name:'兔兔',kind:'可愛動物',colors:{K:'#3d3132',W:'#ffffff',P:'#ffa6bd'},half:[
    '..KK....','.KWWK...','.KWPK...','.KWPK...','.KWPK...','..KWKKKK','.KWWWWWW','KWWWWWWW',
    'KWWWKKWW','KWWWKKWW','KWPPWWWP','KWWWWWKW','.KWWWWWK','..KKWWWW','....KKKK','........']},
  {name:'熊熊',kind:'可愛動物',colors:{K:'#3d3132',B:'#c0814f',C:'#f5d9b0',P:'#ff9eb0',W:'#ffffff'},half:[
    '........','.KKK....','KBBBK...','KBPBKKKK','.KKBBBBB','.KBBBBBB','KBBBBBBB','KBBBWKBB',
    'KBBBKKBB','KBBBBCCC','KBPPBCCK','KBBBBCCC','.KBBBBBB','..KKBBBB','....KKKK','........']},
  {name:'企鵝',kind:'可愛動物',colors:{K:'#3d3132',N:'#46638f',W:'#ffffff',O:'#ffb03b',P:'#ff9eb0'},half:[
    '........','.....KKK','...KKNNN','..KNNNNN','.KNNNNNN','.KNNNWWW','KNNWWWWW','KNNWWKWW',
    'KNNWKKWO','KNNPPWWW','KNNWWWWW','KNNWWWWW','.KNNWWWW','..KNNWWW','...KKKKK','...OO...']},
  {name:'草莓',kind:'水果點心',colors:{K:'#3d3132',R:'#f0505a',G:'#5cbf6a',Y:'#ffe27a',P:'#ffb0b8',W:'#ffffff'},half:[
    '........','....KKKK','..KKGGGG','.KRRKGGK','.KRRRKKR','KRRRRRRR','KRYRRRRR','KRRRWKRR',
    'KRRRKKRR','KRPPRRKR','.KRRRRRK','.KRYRRRR','..KRRRRR','...KRRRY','....KKRR','......KK']},
  {name:'冰淇淋',kind:'水果點心',colors:{K:'#3d3132',P:'#ffb3cc',W:'#ffffff',D:'#ff7fa8',C:'#f2be6c',E:'#d99545'},half:[
    '........','.....KKK','...KKPPP','..KPWPPP','.KPWPPPP','.KPPPPPP','KPPPWKPP','KPPPKKPP',
    'KPDDPPKP','.KPPPPPK','KKKKKKKK','.KCECCCE','..KCCECC','...KCCCE','....KCCC','.....KKK']},
  {name:'章魚',kind:'海洋朋友',colors:{K:'#3d3132',P:'#c49bea',W:'#ffffff',R:'#ff8fb8'},half:[
    '........','.....KKK','...KKPPP','..KPPPPP','.KPPPPPP','.KPPPPPP','KPPPWKPP','KPPPKKPP',
    'KPRRPPPP','KPPPPPKK','.KPPPPPP','.KPPPPPP','KPKPPKPP','KPKKPKKP','.K..K..K','........']},
  {name:'暴龍',kind:'恐龍',colors:{K:'#3d3132',G:'#6cc26a',L:'#c9ec9a',P:'#ff9eb0',W:'#ffffff'},art:[
    '........KKKKK...','.......KGGGGGK..','.......KGGWKGGK.','.......KGGKKGGGK','.......KGGGGGGGK','.......KPGGGKKK.','..K....KGGGGGK..','.KGK..KGGGGGGK..',
    '.KGGKKGGLLLGGKK.','..KGGGGGLLLLGGGK','...KGGGGLLLLGKK.','....KGGGGLLGGK..','.....KGGGGGGGK..','.....KGGKKGGK...','.....KGGK.KGGK..','.....KKKK.KKKK..']},
  {name:'長頸龍',kind:'恐龍',colors:{K:'#3d3132',B:'#6fb4e8',D:'#4a8fc9',P:'#ff9eb0',W:'#ffffff'},art:[
    '..........KKKK..','.........KBBBBK.','.........KBWKBBK','.........KBKKBBK','.........KPBBBK.','.........KBBKK..','........KBBK....','...KKKKKBBBK....',
    '..KBBDBBBBBBK...','.KBBBBBBDBBBBK..','KBBDBBBBBBBDBK..','KBKBBBBBBBBBBK..','K..KBBBKKBBBK...','...KBBK.KBBK....','...KBBK.KBBK....','...KKKK.KKKK....']},
  {name:'恐龍蛋',kind:'恐龍',colors:{K:'#3d3132',G:'#7fd18b',E:'#fff3d6',S:'#9fd3f0',P:'#ff9eb0',W:'#ffffff'},half:[
    '........','.....KKK','...KKGGG','..KGGGGG','..KGGWKG','.KGGGKKG','.KGPPGGG','.KGGGGGK',
    '.KGGGGGG','KKEKGGKE','KEEEKKEE','KEEEEEEE','KESEEEES','.KEEEEEE','..KKEEEE','....KKKK']},
  {name:'小汽車',kind:'交通工具',colors:{K:'#3d3132',R:'#f05a5a',C:'#bfe6ff',Y:'#ffd64a',G:'#b8bcc2'},art:[
    '................','................','................','.....KKKKKK.....','....KCCKCCCK....','...KCCCKCCCCK...','.KKKKKKKKKKKKKK.','KRRRRRRRRRRRRRRK',
    'KRRRRRRRRRRRRRYK','KRRRRRRRRRRRRRRK','KRRKKKKRRKKKKRRK','.KKKGGKKKKGGKKK.','...KGGK..KGGK...','....KK....KK....','................','................']},
  {name:'校車',kind:'交通工具',colors:{K:'#3d3132',Y:'#ffcf3f',O:'#f5953d',C:'#bfe6ff',W:'#ffffff',G:'#b8bcc2'},art:[
    '................','................','.KKKKKKKKKKKKKK.','KYYYYYYYYYYYYYYK','KYCCYCCYCCYCCCYK','KYCCYCCYCCYCCCYK','KYYYYYYYYYYYYYYK','KOOOOOOOOOOOOOOK',
    'KYYYYYYYYYYYYYWK','KYYYYYYYYYYYYYYK','KYYKKKKYYYKKKKYK','.KKKGGKKKKKGGKK.','...KGGK...KGGK..','....KK.....KK...','................','................']},
  {name:'飛機',kind:'交通工具',colors:{K:'#3d3132',W:'#ffffff',B:'#5b9bd5',R:'#f05a5a',C:'#bfe6ff'},art:[
    '................','................','.KK.............','.KRK............','.KRRK...........','.KRRRKKKKKKKKK..','.KWWWWWWWWWWWWK.','KWWCWCWCWCWWCCWK',
    'KWWWWWWWWWWWWWWK','.KKKKKBBBBKKKKK.','.....KBBBK......','....KBBBK.......','....KKKK........','................','................','................']},
  {name:'火車',kind:'交通工具',colors:{K:'#3d3132',R:'#f05a5a',B:'#4d81c3',C:'#bfe6ff',Y:'#ffd64a',G:'#b8bcc2'},art:[
    '................','..KKKK..........','..KGGK.....KKKKK','..KGGK.....KRRRK','.KKKKKKKKKKKCCRK','.KYBBBBBBBBKCCRK','.KBBBBBBBBBKRRRK','KKKKKKKKKKKKKKKK',
    'KRRRRRRRRRRRRRRK','KRRRRRRRRRRRRRRK','.KKKKKKKKKKKKKK.','.KGGK.KGGK.KGGK.','..KK...KK...KK..','................','................','................']}
];
const artRows=item=>item.rows??=item.art||item.half.map(r=>r+[...r].reverse().join(''));

function galleryImageSource(item){if(!item.url){const rows=artRows(item),c=document.createElement('canvas');c.width=rows[0].length;c.height=rows.length;const cx=c.getContext('2d');rows.forEach((row,y)=>[...row].forEach((k,x)=>{if(item.colors[k]){cx.fillStyle=item.colors[k];cx.fillRect(x,y,1,1);}}));item.url=c.toDataURL();}return item.url;}

function toOKLab(r,g,b){r/=255;g/=255;b/=255;r=r<=.04045?r/12.92:((r+.055)/1.055)**2.4;g=g<=.04045?g/12.92:((g+.055)/1.055)**2.4;b=b<=.04045?b/12.92:((b+.055)/1.055)**2.4;const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s];}

// Seeded generator (mulberry32): the same 題目編號 + image + settings always gives the same sheet.
let rng=Math.random;
const seeded=seed=>()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^(seed>>>15),1|seed);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};
function randInt(min,max){return Math.floor(rng()*(max-min+1))+min;}
const pick=a=>a[randInt(0,a.length-1)];
const sign=(n)=>n>=0?`+ ${n}`:`− ${-n}`;
// Generators for grades 4–6; tags let the "以加法/減法/乘除為主" option steer which forms appear.
const ADVANCED={
  4:[
    {tags:['times','plus','minus'],make:t=>{const a=randInt(2,9),b=randInt(2,9);return `${a} × ${b} ${sign(t-a*b)}`;}},
    {tags:['times','minus'],make:t=>{const a=randInt(2,9),b=randInt(2,9);return `${t+a*b} − ${a} × ${b}`;}},
    {tags:['times','plus'],make:t=>{const q=randInt(0,t),d=randInt(2,9);return `${q*d} ÷ ${d} + ${t-q}`;}},
    {tags:['plus','minus'],make:t=>{const c=randInt(5,40),s=t+c,a=randInt(1,s-1);return `${a} + ${s-a} − ${c}`;}}],
  5:[
    {tags:['times','minus'],make:t=>{const a=randInt(3,12),b=randInt(3,12);return `${a} × ${b} ${sign(t-a*b)}`;}},
    {tags:['minus'],make:t=>{const x=randInt(100,300);return `${x} − ${x-t}`;}},
    {tags:['plus','minus'],make:t=>{const c=randInt(50,200),s=t+c,a=randInt(20,s-20);return `${a} + ${s-a} − ${c}`;}},
    {tags:['times','minus'],make:t=>{const q=randInt(t,t+20),d=randInt(3,9);return `${q*d} ÷ ${d} − ${q-t}`;}}],
  6:[
    {tags:['times','plus','minus'],make:t=>{const c=randInt(2,5),s=randInt(Math.max(2,Math.ceil(t/c)),12),a=randInt(1,s-1);return `(${a} + ${s-a}) × ${c} − ${s*c-t}`;}},
    {tags:['times','minus'],make:t=>{const d=randInt(2,9),y=randInt(1,30);return `(${t*d+y} − ${y}) ÷ ${d}`;}},
    {tags:['times','minus'],make:t=>{const a=randInt(2,5),k=randInt(1,4),b=k+randInt(1,9);return `${a} × (${b} − ${b-k}) ${sign(t-a*k)}`;}},
    {tags:['plus','minus'],make:t=>{const s2=randInt(2,20),s1=t+s2,a=randInt(1,s1-1),c=randInt(1,s2-1);return `(${a} + ${s1-a}) − (${c} + ${s2-c})`;}}]
};
function equationFor(target,level,style){
  if(level>=4){const all=ADVANCED[level],fit=style==='mixed'?all:all.filter(g=>g.tags.includes(style));return pick(fit.length?fit:all).make(target);}
  const ops=level>=3?['plus','minus','times']:['plus','minus'],op=ops.includes(style)?style:pick(ops);
  if(level<=2){const lim=level===1?10:20;if(op==='minus'){const a=randInt(target,lim);return `${a} − ${a-target}`;}const a=randInt(0,target);return `${a} + ${target-a}`;}
  if(op==='times'){if(target===0)return `${randInt(1,9)} × 0`;const pairs=[];for(let a=1;a<=9;a++)if(target%a===0&&target/a<=9)pairs.push([a,target/a]);if(pairs.length&&rng()<.55){const [a,b]=pick(pairs);return `${a} × ${b}`;}const divisor=randInt(2,9);return `${target*divisor} ÷ ${divisor}`;}
  if(op==='minus'){const a=randInt(target+10,target+60);return `${a} − ${a-target}`;}
  const c=randInt(10,40),s=target+c,a=randInt(1,s-1);return `${a} + ${s-a} − ${c}`;
}

// Equations for every cell, in row-major order, seeded by the 題目編號 and settings.
function generateEquations(codes,level,style,code){
  rng=seeded(code*7+level*100003+['mixed','plus','minus','times'].indexOf(style));
  try{return codes.map(c=>equationFor(c,level,style));}finally{rng=Math.random;}
}

// A puzzle travels in the URL (?p=…) so a link reproduces it exactly: grid, palette and settings.
const b64url={
  enc:str=>btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''),
  dec:str=>new TextDecoder().decode(Uint8Array.from(atob(str.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)))
};
function encodePuzzle(z){
  return b64url.enc(JSON.stringify({v:1,w:z.w,h:z.h,c:z.codes.join(''),p:z.palette.map(c=>c.hex.slice(1)),n:z.names||null,b:z.blank??-1,l:z.level,s:z.style,k:z.code,t:z.title||''}));
}
function decodePuzzle(str){
  const o=JSON.parse(b64url.dec(str));
  if(o.v!==1||!(o.w>0&&o.h>0)||o.c.length!==o.w*o.h||!/^[0-9]+$/.test(o.c))throw new Error('bad puzzle');
  const palette=o.p.map((h,i)=>{if(!/^[0-9a-f]{6}$/i.test(h))throw new Error('bad colour');return {value:i,hex:'#'+h,name:o.n?.[i]||`色票 ${i}`};});
  const codes=[...o.c].map(Number);
  if(codes.some(v=>v>=palette.length))throw new Error('bad code');
  return {w:o.w,h:o.h,codes,palette,blank:o.b>=0?o.b:null,level:Math.min(6,Math.max(1,o.l|0)),style:['mixed','plus','minus','times'].includes(o.s)?o.s:'mixed',code:Math.min(99999,Math.max(1,o.k|0)),title:String(o.t||'').slice(0,40)};
}

// Palette + codes for a gallery sprite: its own colours, numbered darkest first (same order index.html ends up with).
function spritePuzzle(item){
  const rows=artRows(item),hexes=new Set(['#ffffff']);
  rows.forEach(r=>[...r].forEach(k=>{if(item.colors[k])hexes.add(item.colors[k].toLowerCase());}));
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const cols=[...hexes].map(hex=>({hex,lab:toOKLab(...rgb(hex))})).sort((a,b)=>a.lab[0]-b.lab[0]||a.lab[1]-b.lab[1]||a.lab[2]-b.lab[2]);
  const idx=new Map(cols.map((c,i)=>[c.hex,i]));
  const codes=[];rows.forEach(r=>[...r].forEach(k=>codes.push(idx.get((item.colors[k]||'#ffffff').toLowerCase()))));
  const used=[...new Set(codes)].sort((a,b)=>a-b),remap=new Map(used.map((v,i)=>[v,i]));
  const palette=used.map((v,i)=>({value:i,hex:cols[v].hex,name:`色票 ${i}`,lab:cols[v].lab}));
  const white=palette.find(c=>c.lab[0]>.96&&Math.hypot(c.lab[1],c.lab[2])<.03);
  return {w:rows[0].length,h:rows.length,codes:codes.map(v=>remap.get(v)),palette,blank:white?white.value:null,title:item.name};
}

window.PM={ART_GALLERY,artRows,galleryImageSource,toOKLab,generateEquations,encodePuzzle,decodePuzzle,spritePuzzle};
})();
