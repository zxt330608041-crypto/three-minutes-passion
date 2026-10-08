// V1.6 — local interest footprint. Migrates V1.2–V1.5 favorites without deleting them.
type Status='curious'|'active'|'past';
type Footprint={status:Status;note:string;updatedAt:string};
const OLD_KEY='three-minutes-passion:favorites:v1';
const KEY='three-minutes-passion:footprints:v1';
const statuses:Record<Status,string>={curious:'有点心动',active:'正在发热',past:'曾经热爱'};
function load():Record<string,Footprint>{
 let data:Record<string,Footprint>={};
 try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');if(x&&typeof x==='object'&&!Array.isArray(x)){
 for(const [id,entry] of Object.entries(x)){const v=entry as Partial<Footprint>;if(['curious','active','past'].includes(v?.status||''))data[id]={status:v.status as Status,note:String(v.note||'').slice(0,500),updatedAt:String(v.updatedAt||'')};}
 }}catch{}
 try{const old=JSON.parse(localStorage.getItem(OLD_KEY)||'[]');if(Array.isArray(old))for(const id of old)if(typeof id==='string'&&!data[id])data[id]={status:'curious',note:'',updatedAt:new Date().toISOString()};}catch{}
 return data;
}
function persist(data:Record<string,Footprint>):boolean{try{localStorage.setItem(KEY,JSON.stringify(data));localStorage.setItem(OLD_KEY,JSON.stringify(Object.keys(data)));return true}catch{return false}}
function render(){const data=load();const n=Object.keys(data).length;
 document.querySelectorAll<HTMLElement>('.favorite-count').forEach(el=>el.textContent=n?`(${n})`:'');
 document.querySelectorAll<HTMLButtonElement>('[data-save-hobby]').forEach(b=>{const id=b.dataset.saveHobby||'';const entry=data[id];b.setAttribute('aria-pressed',String(Boolean(entry)));b.textContent=entry?`♥ ${statuses[entry.status]} · 修改记录`:'♡ 加入我的兴趣足迹'});
 document.querySelectorAll<HTMLElement>('[data-favorite-entry]').forEach(el=>{const entry=data[el.dataset.favoriteEntry||''];el.hidden=!entry;const s=el.querySelector<HTMLElement>('[data-entry-status]');if(s&&entry)s.textContent=statuses[entry.status];});
 const count=document.getElementById('saved-count');if(count)count.textContent=`已记录 ${n} 种兴趣`;
 const empty=document.getElementById('favorites-empty');if(empty)empty.hidden=n>0;
 for(const k of ['curious','active','past'] as const){const count=document.querySelector<HTMLElement>(`[data-status-count="${k}"]`);if(count)count.textContent=String(Object.values(data).filter(v=>v.status===k).length);}
 document.querySelectorAll<HTMLElement>('[data-footprint-entry]').forEach(el=>{const id=el.dataset.footprintEntry||'';const entry=data[id];el.hidden=!entry;const badge=el.querySelector<HTMLElement>('[data-footprint-status]');if(badge&&entry)badge.textContent=statuses[entry.status];const note=el.querySelector<HTMLElement>('[data-footprint-note]');if(note&&entry)note.textContent=entry.note||'还没有写下心得，随时可以补充。';});
 const select=document.querySelector<HTMLSelectElement>('#footprint-filter');if(select){const f=select.value;document.querySelectorAll<HTMLElement>('[data-footprint-entry]').forEach(el=>{const entry=data[el.dataset.footprintEntry||''];el.hidden=!entry||(f!=='all'&&entry.status!==f);});}
}
function openEditor(id:string,name:string){const dialog=document.querySelector<HTMLDialogElement>('#footprint-dialog');if(!dialog)return;const data=load(),entry=data[id];(dialog.querySelector<HTMLInputElement>('#footprint-id')!).value=id;(dialog.querySelector<HTMLElement>('#footprint-hobby-name')!).textContent=name;(dialog.querySelector<HTMLSelectElement>('#footprint-status')!).value=entry?.status||'curious';(dialog.querySelector<HTMLTextAreaElement>('#footprint-note')!).value=entry?.note||'';const remove=dialog.querySelector<HTMLButtonElement>('#footprint-remove');if(remove)remove.hidden=!entry;dialog.showModal();}
document.addEventListener('click',e=>{const el=(e.target as HTMLElement).closest<HTMLElement>('[data-save-hobby],[data-edit-footprint]');if(!el)return;const id=el.dataset.saveHobby||el.dataset.editFootprint||'';const name=el.dataset.hobbyName||document.querySelector('h1')?.textContent?.trim()||id;openEditor(id,name);});
document.addEventListener('submit',e=>{const form=(e.target as HTMLElement).closest<HTMLFormElement>('#footprint-form');if(!form)return;e.preventDefault();const id=(form.querySelector<HTMLInputElement>('#footprint-id')!).value;const status=(form.querySelector<HTMLSelectElement>('#footprint-status')!).value as Status;const note=(form.querySelector<HTMLTextAreaElement>('#footprint-note')!).value.trim().slice(0,500);if(!['curious','active','past'].includes(status))return;const data=load();data[id]={status,note,updatedAt:new Date().toISOString()};if(!persist(data)){alert('保存失败。请检查浏览器本地存储是否可用。');return}document.querySelector<HTMLDialogElement>('#footprint-dialog')?.close();render();});
document.addEventListener('click',e=>{const target=e.target as HTMLElement;if(target.closest('#footprint-cancel'))document.querySelector<HTMLDialogElement>('#footprint-dialog')?.close();if(target.closest('#footprint-remove')){const id=document.querySelector<HTMLInputElement>('#footprint-id')?.value;if(!id||!confirm('从兴趣足迹中移除这项兴趣？'))return;const data=load();delete data[id];if(persist(data)){document.querySelector<HTMLDialogElement>('#footprint-dialog')?.close();render()}else alert('移除失败。');}});
document.addEventListener('change',e=>{if((e.target as HTMLElement).id==='footprint-filter')render()});
window.addEventListener('storage',render);document.addEventListener('DOMContentLoaded',render);render();
