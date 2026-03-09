(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const um="modulepreload",pm=function(n){return"/"+n},oc={},za=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let u=function(m){return Promise.all(m.map(b=>Promise.resolve(b).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var o=u;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");s=u(t.map(m=>{if(m=pm(m),m in oc)return;oc[m]=!0;const b=m.endsWith(".css"),v=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${v}`))return;const R=document.createElement("link");if(R.rel=b?"stylesheet":um,b||(R.as="script"),R.crossOrigin="",R.href=m,d&&R.setAttribute("nonce",d),document.head.appendChild(R),b)return new Promise((D,L)=>{R.addEventListener("load",D),R.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return s.then(l=>{for(const d of l||[])d.status==="rejected"&&r(d.reason);return e().catch(r)})},hm=()=>`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Admin Panel</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/admin/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/admin/companies" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-building"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/admin/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Usuários</span>
                </a>
                <a href="/admin/webhooks" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-link"></i></span>
                    <span>Webhooks</span>
                </a>
                <a href="/admin/migration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clone"></i></span>
                    <span>Migração</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div class="user-info">
                        <span class="name">Administrador</span><br>
                        <span class="role">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    `,mm=()=>{};var lc={};const nu=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},fm=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],l=n[t++],d=((s&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(d>>10)),e[i++]=String.fromCharCode(56320+(d&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},iu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,l=o?n[s+1]:0,d=s+2<n.length,u=d?n[s+2]:0,m=r>>2,b=(r&3)<<4|l>>4;let v=(l&15)<<2|u>>6,R=u&63;d||(R=64,o||(v=64)),i.push(t[m],t[b],t[v],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(nu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const u=s<n.length?t[n.charAt(s)]:64;++s;const b=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||l==null||u==null||b==null)throw new gm;const v=r<<2|l>>4;if(i.push(v),u!==64){const R=l<<4&240|u>>2;if(i.push(R),b!==64){const D=u<<6&192|b;i.push(D)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class gm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ym=function(n){const e=nu(n);return iu.encodeByteArray(e,!0)},vr=function(n){return ym(n).replace(/\./g,"")},su=function(n){try{return iu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function vm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const bm=()=>vm().__FIREBASE_DEFAULTS__,wm=()=>{if(typeof process>"u"||typeof lc>"u")return;const n=lc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_m=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&su(n[1]);return e&&JSON.parse(e)},Br=()=>{try{return mm()||bm()||wm()||_m()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ru=n=>Br()?.emulatorHosts?.[n],au=n=>{const e=ru(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},ou=()=>Br()?.config,lu=n=>Br()?.[`_${n}`];class xm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}function Fn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function go(n){return(await fetch(n,{credentials:"include"})).ok}function cu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vr(JSON.stringify(t)),vr(JSON.stringify(o)),""].join(".")}const hs={};function Em(){const n={prod:[],emulator:[]};for(const e of Object.keys(hs))hs[e]?n.emulator.push(e):n.prod.push(e);return n}function Im(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let cc=!1;function yo(n,e){if(typeof window>"u"||typeof document>"u"||!Fn(window.location.host)||hs[n]===e||hs[n]||cc)return;hs[n]=e;function t(v){return`__firebase__banner__${v}`}const i="__firebase__banner",r=Em().prod.length>0;function o(){const v=document.getElementById(i);v&&v.remove()}function l(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function d(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function u(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{cc=!0,o()},v}function m(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function b(){const v=Im(i),R=t("text"),D=document.getElementById(R)||document.createElement("span"),L=t("learnmore"),_=document.getElementById(L)||document.createElement("a"),A=t("preprendIcon"),S=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const $=v.element;l($),m(_,L);const C=u();d(S,A),$.append(S,D,_,C),document.body.appendChild($)}r?(D.innerText="Preview backend disconnected.",S.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(S.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",b):b()}function ft(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ft())}function km(){const n=Br()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Am(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pm(){const n=ft();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Rm(){return!km()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lm(){try{return typeof indexedDB=="object"}catch{return!1}}function Dm(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}const $m="FirebaseError";class tn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=$m,Object.setPrototypeOf(this,tn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rs.prototype.create)}}class Rs{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Nm(r,i):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new tn(s,l,i)}}function Nm(n,e){return n.replace(Mm,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Mm=/\{\$([^}]+)}/g;function Om(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ii(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(dc(r)&&dc(o)){if(!ii(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function dc(n){return n!==null&&typeof n=="object"}function Ls(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function as(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function os(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Vm(n,e){const t=new Bm(n,e);return t.subscribe.bind(t)}class Bm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Fm(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Ia),s.error===void 0&&(s.error=Ia),s.complete===void 0&&(s.complete=Ia);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ia(){}function Oe(n){return n&&n._delegate?n._delegate:n}class Dn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const Qn="[DEFAULT]";class Um{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new xm;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jm(e))try{this.getOrInitializeService({instanceIdentifier:Qn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Qn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qn){return this.instances.has(e)}getOptions(e=Qn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:zm(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Qn){return this.component?this.component.multipleInstances?e:Qn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zm(n){return n===Qn?void 0:n}function jm(n){return n.instantiationMode==="EAGER"}class qm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Um(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}var ve;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ve||(ve={}));const Hm={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},Wm=ve.INFO,Gm={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},Km=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Gm[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vo{constructor(e){this.name=e,this._logLevel=Wm,this._logHandler=Km,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const Qm=(n,e)=>e.some(t=>n instanceof t);let uc,pc;function Ym(){return uc||(uc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jm(){return pc||(pc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const du=new WeakMap,ja=new WeakMap,uu=new WeakMap,Ta=new WeakMap,bo=new WeakMap;function Xm(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Cn(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&du.set(t,n)}).catch(()=>{}),bo.set(e,n),e}function Zm(n){if(ja.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ja.set(n,e)}let qa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ja.get(n);if(e==="objectStoreNames")return n.objectStoreNames||uu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Cn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ef(n){qa=n(qa)}function tf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ka(this),e,...t);return uu.set(i,e.sort?e.sort():[e]),Cn(i)}:Jm().includes(n)?function(...e){return n.apply(ka(this),e),Cn(du.get(this))}:function(...e){return Cn(n.apply(ka(this),e))}}function nf(n){return typeof n=="function"?tf(n):(n instanceof IDBTransaction&&Zm(n),Qm(n,Ym())?new Proxy(n,qa):n)}function Cn(n){if(n instanceof IDBRequest)return Xm(n);if(Ta.has(n))return Ta.get(n);const e=nf(n);return e!==n&&(Ta.set(n,e),bo.set(e,n)),e}const ka=n=>bo.get(n);function sf(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),l=Cn(o);return i&&o.addEventListener("upgradeneeded",d=>{i(Cn(o.result),d.oldVersion,d.newVersion,Cn(o.transaction),d)}),t&&o.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),l.then(d=>{r&&d.addEventListener("close",()=>r()),s&&d.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const rf=["get","getKey","getAll","getAllKeys","count"],af=["put","add","delete","clear"],Aa=new Map;function hc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Aa.get(e))return Aa.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=af.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||rf.includes(t)))return;const r=async function(o,...l){const d=this.transaction(o,s?"readwrite":"readonly");let u=d.store;return i&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),s&&d.done]))[0]};return Aa.set(e,r),r}ef(n=>({...n,get:(e,t,i)=>hc(e,t)||n.get(e,t,i),has:(e,t)=>!!hc(e,t)||n.has(e,t)}));class of{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(lf(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function lf(n){return n.getComponent()?.type==="VERSION"}const Ha="@firebase/app",mc="0.14.8";const dn=new vo("@firebase/app"),cf="@firebase/app-compat",df="@firebase/analytics-compat",uf="@firebase/analytics",pf="@firebase/app-check-compat",hf="@firebase/app-check",mf="@firebase/auth",ff="@firebase/auth-compat",gf="@firebase/database",yf="@firebase/data-connect",vf="@firebase/database-compat",bf="@firebase/functions",wf="@firebase/functions-compat",_f="@firebase/installations",xf="@firebase/installations-compat",Ef="@firebase/messaging",If="@firebase/messaging-compat",Tf="@firebase/performance",kf="@firebase/performance-compat",Af="@firebase/remote-config",Sf="@firebase/remote-config-compat",Cf="@firebase/storage",Pf="@firebase/storage-compat",Rf="@firebase/firestore",Lf="@firebase/ai",Df="@firebase/firestore-compat",$f="firebase",Nf="12.9.0";const Wa="[DEFAULT]",Mf={[Ha]:"fire-core",[cf]:"fire-core-compat",[uf]:"fire-analytics",[df]:"fire-analytics-compat",[hf]:"fire-app-check",[pf]:"fire-app-check-compat",[mf]:"fire-auth",[ff]:"fire-auth-compat",[gf]:"fire-rtdb",[yf]:"fire-data-connect",[vf]:"fire-rtdb-compat",[bf]:"fire-fn",[wf]:"fire-fn-compat",[_f]:"fire-iid",[xf]:"fire-iid-compat",[Ef]:"fire-fcm",[If]:"fire-fcm-compat",[Tf]:"fire-perf",[kf]:"fire-perf-compat",[Af]:"fire-rc",[Sf]:"fire-rc-compat",[Cf]:"fire-gcs",[Pf]:"fire-gcs-compat",[Rf]:"fire-fst",[Df]:"fire-fst-compat",[Lf]:"fire-vertex","fire-js":"fire-js",[$f]:"fire-js-all"};const br=new Map,Of=new Map,Ga=new Map;function fc(n,e){try{n.container.addComponent(e)}catch(t){dn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function si(n){const e=n.name;if(Ga.has(e))return dn.debug(`There were multiple attempts to register component ${e}.`),!1;Ga.set(e,n);for(const t of br.values())fc(t,n);for(const t of Of.values())fc(t,n);return!0}function Fr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function St(n){return n==null?!1:n.settings!==void 0}const Vf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new Rs("app","Firebase",Vf);class Bf{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}const mi=Nf;function wo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Wa,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(t||(t=ou()),!t)throw Pn.create("no-options");const r=br.get(s);if(r){if(ii(t,r.options)&&ii(i,r.config))return r;throw Pn.create("duplicate-app",{appName:s})}const o=new qm(s);for(const d of Ga.values())o.addComponent(d);const l=new Bf(t,i,o);return br.set(s,l),l}function _o(n=Wa){const e=br.get(n);if(!e&&n===Wa&&ou())return wo();if(!e)throw Pn.create("no-app",{appName:n});return e}function Kt(n,e,t){let i=Mf[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),dn.warn(o.join(" "));return}si(new Dn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}const Ff="firebase-heartbeat-database",Uf=1,ws="firebase-heartbeat-store";let Sa=null;function pu(){return Sa||(Sa=sf(Ff,Uf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ws)}catch(t){console.warn(t)}}}}).catch(n=>{throw Pn.create("idb-open",{originalErrorMessage:n.message})})),Sa}async function zf(n){try{const t=(await pu()).transaction(ws),i=await t.objectStore(ws).get(hu(n));return await t.done,i}catch(e){if(e instanceof tn)dn.warn(e.message);else{const t=Pn.create("idb-get",{originalErrorMessage:e?.message});dn.warn(t.message)}}}async function gc(n,e){try{const i=(await pu()).transaction(ws,"readwrite");await i.objectStore(ws).put(e,hu(n)),await i.done}catch(t){if(t instanceof tn)dn.warn(t.message);else{const i=Pn.create("idb-set",{originalErrorMessage:t?.message});dn.warn(i.message)}}}function hu(n){return`${n.name}!${n.options.appId}`}const jf=1024,qf=30;class Hf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=yc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>qf){const s=Kf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){dn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=yc(),{heartbeatsToSend:t,unsentEntries:i}=Wf(this._heartbeatsCache.heartbeats),s=vr(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return dn.warn(e),""}}}function yc(){return new Date().toISOString().substring(0,10)}function Wf(n,e=jf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),vc(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),vc(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Gf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Lm()?Dm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await zf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return gc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return gc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function vc(n){return vr(JSON.stringify({version:2,heartbeats:n})).length}function Kf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}function Qf(n){si(new Dn("platform-logger",e=>new of(e),"PRIVATE")),si(new Dn("heartbeat",e=>new Hf(e),"PRIVATE")),Kt(Ha,mc,n),Kt(Ha,mc,"esm2020"),Kt("fire-js","")}Qf("");function mu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Yf=mu,fu=new Rs("auth","Firebase",mu());const wr=new vo("@firebase/auth");function Jf(n,...e){wr.logLevel<=ve.WARN&&wr.warn(`Auth (${mi}): ${n}`,...e)}function lr(n,...e){wr.logLevel<=ve.ERROR&&wr.error(`Auth (${mi}): ${n}`,...e)}function Ft(n,...e){throw xo(n,...e)}function Qt(n,...e){return xo(n,...e)}function gu(n,e,t){const i={...Yf(),[e]:t};return new Rs("auth","Firebase",i).create(e,{appName:n.name})}function an(n){return gu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return fu.create(n,...e)}function se(n,e,...t){if(!n)throw xo(e,...t)}function sn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw lr(e),new Error(e)}function un(n,e){n||sn(e)}function Ka(){return typeof self<"u"&&self.location?.href||""}function Xf(){return bc()==="http:"||bc()==="https:"}function bc(){return typeof self<"u"&&self.location?.protocol||null}function Zf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xf()||Sm()||"connection"in navigator)?navigator.onLine:!0}function eg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}class Ds{constructor(e,t){this.shortDelay=e,this.longDelay=t,un(t>e,"Short delay should be less than long delay!"),this.isMobile=Tm()||Cm()}get(){return Zf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}function Eo(n,e){un(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}class yu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const tg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};const ng=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ig=new Ds(3e4,6e4);function Un(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function zn(n,e,t,i,s={}){return vu(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const l=Ls({key:n.config.apiKey,...o}).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:d,...r};return Am()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Fn(n.emulatorConfig.host)&&(u.credentials="include"),yu.fetch()(await bu(n,n.config.apiHost,t,l),u)})}async function vu(n,e,t){n._canInitEmulator=!1;const i={...tg,...e};try{const s=new rg(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Zs(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const l=r.ok?o.errorMessage:o.error.message,[d,u]=l.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zs(n,"credential-already-in-use",o);if(d==="EMAIL_EXISTS")throw Zs(n,"email-already-in-use",o);if(d==="USER_DISABLED")throw Zs(n,"user-disabled",o);const m=i[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw gu(n,m,u);Ft(n,m)}}catch(s){if(s instanceof tn)throw s;Ft(n,"network-request-failed",{message:String(s)})}}async function $s(n,e,t,i,s={}){const r=await zn(n,e,t,i,s);return"mfaPendingCredential"in r&&Ft(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function bu(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Eo(n.config,s):`${n.config.apiScheme}://${s}`;return ng.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}function sg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class rg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Qt(this.auth,"network-request-failed")),ig.get())})}}function Zs(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Qt(n,e,i);return s.customData._tokenResponse=t,s}function wc(n){return n!==void 0&&n.enterprise!==void 0}class ag{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return sg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function og(n,e){return zn(n,"GET","/v2/recaptchaConfig",Un(n,e))}async function lg(n,e){return zn(n,"POST","/v1/accounts:delete",e)}async function _r(n,e){return zn(n,"POST","/v1/accounts:lookup",e)}function ms(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cg(n,e=!1){const t=Oe(n),i=await t.getIdToken(e),s=Io(i);se(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:ms(Ca(s.auth_time)),issuedAtTime:ms(Ca(s.iat)),expirationTime:ms(Ca(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Ca(n){return Number(n)*1e3}function Io(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return lr("JWT malformed, contained fewer than 3 sections"),null;try{const s=su(t);return s?JSON.parse(s):(lr("Failed to decode base64 JWT payload"),null)}catch(s){return lr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function _c(n){const e=Io(n);return se(e,"internal-error"),se(typeof e.exp<"u","internal-error"),se(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function _s(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof tn&&dg(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function dg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}class ug{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}class Qa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ms(this.lastLoginAt),this.creationTime=ms(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function xr(n){const e=n.auth,t=await n.getIdToken(),i=await _s(n,_r(e,{idToken:t}));se(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?wu(s.providerUserInfo):[],o=hg(n.providerData,r),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!o?.length,u=l?d:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Qa(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,m)}async function pg(n){const e=Oe(n);await xr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hg(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function wu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function mg(n,e){const t=await vu(n,{},async()=>{const i=Ls({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await bu(n,s,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const d={method:"POST",headers:l,body:i};return n.emulatorConfig&&Fn(n.emulatorConfig.host)&&(d.credentials="include"),yu.fetch()(o,d)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function fg(n,e){return zn(n,"POST","/v2/accounts:revokeToken",Un(n,e))}class Ai{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){se(e.idToken,"internal-error"),se(typeof e.idToken<"u","internal-error"),se(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_c(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){se(e.length!==0,"internal-error");const t=_c(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(se(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await mg(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Ai;return i&&(se(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(se(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(se(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ai,this.toJSON())}_performRefresh(){return sn("not implemented")}}function xn(n,e){se(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Vt{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new ug(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Qa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await _s(this,this.stsTokenManager.getToken(this.auth,e));return se(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cg(this,e)}reload(){return pg(this)}_assign(e){this!==e&&(se(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Vt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){se(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await xr(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(St(this.auth.app))return Promise.reject(an(this.auth));const e=await this.getIdToken();return await _s(this,lg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,l=t.tenantId??void 0,d=t._redirectEventId??void 0,u=t.createdAt??void 0,m=t.lastLoginAt??void 0,{uid:b,emailVerified:v,isAnonymous:R,providerData:D,stsTokenManager:L}=t;se(b&&L,e,"internal-error");const _=Ai.fromJSON(this.name,L);se(typeof b=="string",e,"internal-error"),xn(i,e.name),xn(s,e.name),se(typeof v=="boolean",e,"internal-error"),se(typeof R=="boolean",e,"internal-error"),xn(r,e.name),xn(o,e.name),xn(l,e.name),xn(d,e.name),xn(u,e.name),xn(m,e.name);const A=new Vt({uid:b,auth:e,email:s,emailVerified:v,displayName:i,isAnonymous:R,photoURL:o,phoneNumber:r,tenantId:l,stsTokenManager:_,createdAt:u,lastLoginAt:m});return D&&Array.isArray(D)&&(A.providerData=D.map(S=>({...S}))),d&&(A._redirectEventId=d),A}static async _fromIdTokenResponse(e,t,i=!1){const s=new Ai;s.updateFromServerResponse(t);const r=new Vt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await xr(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];se(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?wu(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,l=new Ai;l.updateFromIdToken(i);const d=new Vt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Qa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(d,u),d}}const xc=new Map;function rn(n){un(n instanceof Function,"Expected a class definition");let e=xc.get(n);return e?(un(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xc.set(n,e),e)}class _u{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}_u.type="NONE";const Ec=_u;function cr(n,e,t){return`firebase:${n}:${e}:${t}`}class Si{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=cr(this.userKey,s.apiKey,r),this.fullPersistenceKey=cr("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await _r(this.auth,{idToken:e}).catch(()=>{});return t?Vt._fromGetAccountInfoResponse(this.auth,t,e):null}return Vt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Si(rn(Ec),e,i);const s=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let r=s[0]||rn(Ec);const o=cr(i,e.config.apiKey,e.name);let l=null;for(const u of t)try{const m=await u._get(o);if(m){let b;if(typeof m=="string"){const v=await _r(e,{idToken:m}).catch(()=>{});if(!v)break;b=await Vt._fromGetAccountInfoResponse(e,v,m)}else b=Vt._fromJSON(e,m);u!==r&&(l=b),r=u;break}}catch{}const d=s.filter(u=>u._shouldAllowMigration);return!r._shouldAllowMigration||!d.length?new Si(r,e,i):(r=d[0],l&&await r._set(o,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==r)try{await u._remove(o)}catch{}})),new Si(r,e,i))}}function Ic(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Tu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Au(e))return"Blackberry";if(Su(e))return"Webos";if(Eu(e))return"Safari";if((e.includes("chrome/")||Iu(e))&&!e.includes("edge/"))return"Chrome";if(ku(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function xu(n=ft()){return/firefox\//i.test(n)}function Eu(n=ft()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Iu(n=ft()){return/crios\//i.test(n)}function Tu(n=ft()){return/iemobile/i.test(n)}function ku(n=ft()){return/android/i.test(n)}function Au(n=ft()){return/blackberry/i.test(n)}function Su(n=ft()){return/webos/i.test(n)}function To(n=ft()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gg(n=ft()){return To(n)&&!!window.navigator?.standalone}function yg(){return Pm()&&document.documentMode===10}function Cu(n=ft()){return To(n)||ku(n)||Su(n)||Au(n)||/windows phone/i.test(n)||Tu(n)}function Pu(n,e=[]){let t;switch(n){case"Browser":t=Ic(ft());break;case"Worker":t=`${Ic(ft())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${mi}/${i}`}class vg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,l)=>{try{const d=e(r);o(d)}catch(d){l(d)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}async function bg(n,e={}){return zn(n,"GET","/v2/passwordPolicy",Un(n,e))}const wg=6;class _g{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??wg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}class xg{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Tc(this),this.idTokenSubscription=new Tc(this),this.beforeStateQueue=new vg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rn(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Si.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await _r(this,{idToken:e}),i=await Vt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(St(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!r||r===o)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return se(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=eg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(St(this.app))return Promise.reject(an(this));const t=e?Oe(e):null;return t&&se(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&se(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return St(this.app)?Promise.reject(an(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return St(this.app)?Promise.reject(an(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await bg(this),t=new _g(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Rs("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await fg(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&rn(e)||this._popupRedirectResolver;se(t,this,"argument-error"),this.redirectPersistenceManager=await Si.create(this,[rn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(se(l,this,"internal-error"),l.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,i,s);return()=>{o=!0,d()}}else{const d=e.addObserver(t);return()=>{o=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return se(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Pu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(St(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Jf(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fi(n){return Oe(n)}class Tc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vm(t=>this.observer=t)}get next(){return se(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let Ur={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Eg(n){Ur=n}function Ru(n){return Ur.loadJS(n)}function Ig(){return Ur.recaptchaEnterpriseScript}function Tg(){return Ur.gapiScript}function kg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Ag{constructor(){this.enterprise=new Sg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Sg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Cg="recaptcha-enterprise",Lu="NO_RECAPTCHA";class Pg{constructor(e){this.type=Cg,this.auth=fi(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,l)=>{og(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new ag(d);return r.tenantId==null?r._agentRecaptchaConfig=u:r._tenantRecaptchaConfigs[r.tenantId]=u,o(u.siteKey)}}).catch(d=>{l(d)})})}function s(r,o,l){const d=window.grecaptcha;wc(d)?d.enterprise.ready(()=>{d.enterprise.execute(r,{action:e}).then(u=>{o(u)}).catch(()=>{o(Lu)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ag().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{i(this.auth).then(l=>{if(!t&&wc(window.grecaptcha))s(l,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let d=Ig();d.length!==0&&(d+=l),Ru(d).then(()=>{s(l,r,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function kc(n,e,t,i=!1,s=!1){const r=new Pg(n);let o;if(s)o=Lu;else try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const d=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:d,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const d=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Ya(n,e,t,i,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await kc(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await kc(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(r)})}function Rg(n,e){const t=Fr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(ii(r,e??{}))return s;Ft(s,"already-initialized")}return t.initialize({options:e})}function Lg(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(rn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Dg(n,e,t){const i=fi(n);se(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Du(e),{host:o,port:l}=$g(e),d=l===null?"":`:${l}`,u={url:`${r}//${o}${d}/`},m=Object.freeze({host:o,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){se(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),se(ii(u,i.config.emulator)&&ii(m,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=u,i.emulatorConfig=m,i.settings.appVerificationDisabledForTesting=!0,Fn(o)?(go(`${r}//${o}${d}`),yo("Auth",!0)):Ng()}function Du(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $g(n){const e=Du(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Ac(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Ac(o)}}}function Ac(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ng(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}class ko{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return sn("not implemented")}_getIdTokenResponse(e){return sn("not implemented")}_linkToIdToken(e,t){return sn("not implemented")}_getReauthenticationResolver(e){return sn("not implemented")}}async function Mg(n,e){return zn(n,"POST","/v1/accounts:signUp",e)}async function Og(n,e){return $s(n,"POST","/v1/accounts:signInWithPassword",Un(n,e))}async function Vg(n,e){return $s(n,"POST","/v1/accounts:signInWithEmailLink",Un(n,e))}async function Bg(n,e){return $s(n,"POST","/v1/accounts:signInWithEmailLink",Un(n,e))}class xs extends ko{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new xs(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new xs(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ya(e,t,"signInWithPassword",Og);case"emailLink":return Vg(e,{email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ya(e,i,"signUpPassword",Mg);case"emailLink":return Bg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function Ci(n,e){return $s(n,"POST","/v1/accounts:signInWithIdp",Un(n,e))}const Fg="http://localhost";class ri extends ko{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ri(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ft("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new ri(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ci(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Ci(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ci(e,t)}buildRequest(){const e={requestUri:Fg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ls(t)}return e}}function Ug(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function zg(n){const e=as(os(n)).link,t=e?as(os(e)).deep_link_id:null,i=as(os(n)).deep_link_id;return(i?as(os(i)).link:null)||i||t||e||n}class Ao{constructor(e){const t=as(os(e)),i=t.apiKey??null,s=t.oobCode??null,r=Ug(t.mode??null);se(i&&s&&r,"argument-error"),this.apiKey=i,this.operation=r,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=zg(e);try{return new Ao(t)}catch{return null}}}class Vi{constructor(){this.providerId=Vi.PROVIDER_ID}static credential(e,t){return xs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Ao.parseLink(t);return se(i,"argument-error"),xs._fromEmailAndCode(e,i.code,i.tenantId)}}Vi.PROVIDER_ID="password";Vi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Vi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class $u{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ns extends $u{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class En extends Ns{constructor(){super("facebook.com")}static credential(e){return ri._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return En.credential(e.oauthAccessToken)}catch{return null}}}En.FACEBOOK_SIGN_IN_METHOD="facebook.com";En.PROVIDER_ID="facebook.com";class In extends Ns{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ri._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return In.credential(t,i)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";class Tn extends Ns{constructor(){super("github.com")}static credential(e){return ri._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.GITHUB_SIGN_IN_METHOD="github.com";Tn.PROVIDER_ID="github.com";class kn extends Ns{constructor(){super("twitter.com")}static credential(e,t){return ri._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return kn.credential(t,i)}catch{return null}}}kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";async function jg(n,e){return $s(n,"POST","/v1/accounts:signUp",Un(n,e))}class ai{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Vt._fromIdTokenResponse(e,i,s),o=Sc(i);return new ai({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Sc(i);return new ai({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Sc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}class Er extends tn{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Er.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Er(e,t,i,s)}}function Nu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Er._fromErrorAndOperation(n,r,e,i):r})}async function qg(n,e,t=!1){const i=await _s(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ai._forOperation(n,"link",i)}async function Hg(n,e,t=!1){const{auth:i}=n;if(St(i.app))return Promise.reject(an(i));const s="reauthenticate";try{const r=await _s(n,Nu(i,s,e,n),t);se(r.idToken,i,"internal-error");const o=Io(r.idToken);se(o,i,"internal-error");const{sub:l}=o;return se(n.uid===l,i,"user-mismatch"),ai._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Ft(i,"user-mismatch"),r}}async function Mu(n,e,t=!1){if(St(n.app))return Promise.reject(an(n));const i="signIn",s=await Nu(n,i,e),r=await ai._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Wg(n,e){return Mu(fi(n),e)}async function Ou(n){const e=fi(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Gg(n,e,t){if(St(n.app))return Promise.reject(an(n));const i=fi(n),o=await Ya(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",jg).catch(d=>{throw d.code==="auth/password-does-not-meet-requirements"&&Ou(n),d}),l=await ai._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(l.user),l}function Kg(n,e,t){return St(n.app)?Promise.reject(an(n)):Wg(Oe(n),Vi.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Ou(n),i})}function Qg(n,e,t,i){return Oe(n).onIdTokenChanged(e,t,i)}function Yg(n,e,t){return Oe(n).beforeAuthStateChanged(e,t)}function Jg(n,e,t,i){return Oe(n).onAuthStateChanged(e,t,i)}function Xg(n){return Oe(n).signOut()}const Ir="__sak";class Vu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ir,"1"),this.storage.removeItem(Ir),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}const Zg=1e3,ey=10;class Bu extends Vu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Cu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,d)=>{this.notifyListeners(o,d)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);yg()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ey):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Zg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Bu.type="LOCAL";const ty=Bu;class Fu extends Vu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Fu.type="SESSION";const Uu=Fu;function ny(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}class zr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new zr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(o).map(async u=>u(t.origin,r)),d=await ny(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zr.receivers=[];function So(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}class iy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((l,d)=>{const u=So("",20);s.port1.start();const m=setTimeout(()=>{d(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(b){const v=b;if(v.data.eventId===u)switch(v.data.status){case"ack":clearTimeout(m),r=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(v.data.response);break;default:clearTimeout(m),clearTimeout(r),d(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}function Yt(){return window}function sy(n){Yt().location.href=n}function zu(){return typeof Yt().WorkerGlobalScope<"u"&&typeof Yt().importScripts=="function"}async function ry(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ay(){return navigator?.serviceWorker?.controller||null}function oy(){return zu()?self:null}const ju="firebaseLocalStorageDb",ly=1,Tr="firebaseLocalStorage",qu="fbase_key";class Ms{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function jr(n,e){return n.transaction([Tr],e?"readwrite":"readonly").objectStore(Tr)}function cy(){const n=indexedDB.deleteDatabase(ju);return new Ms(n).toPromise()}function Ja(){const n=indexedDB.open(ju,ly);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Tr,{keyPath:qu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Tr)?e(i):(i.close(),await cy(),e(await Ja()))})})}async function Cc(n,e,t){const i=jr(n,!0).put({[qu]:e,value:t});return new Ms(i).toPromise()}async function dy(n,e){const t=jr(n,!1).get(e),i=await new Ms(t).toPromise();return i===void 0?null:i.value}function Pc(n,e){const t=jr(n,!0).delete(e);return new Ms(t).toPromise()}const uy=800,py=3;class Hu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ja(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>py)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zr._getInstance(oy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await ry(),!this.activeServiceWorker)return;this.sender=new iy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ay()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ja();return await Cc(e,Ir,"1"),await Pc(e,Ir),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Cc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>dy(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Pc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=jr(s,!1).getAll();return new Ms(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Hu.type="LOCAL";const hy=Hu;new Ds(3e4,6e4);function my(n,e){return e?rn(e):(se(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}class Co extends ko{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ci(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ci(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ci(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fy(n){return Mu(n.auth,new Co(n),n.bypassAuthState)}function gy(n){const{auth:e,user:t}=n;return se(t,e,"internal-error"),Hg(t,new Co(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return se(t,e,"internal-error"),qg(t,new Co(n),n.bypassAuthState)}class Wu{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:l}=e;if(o){this.reject(o);return}const d={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(d))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fy;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return gy;default:Ft(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const vy=new Ds(2e3,1e4);class ki extends Wu{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,ki.currentPopupAction&&ki.currentPopupAction.cancel(),ki.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return se(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");const e=So();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ki.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vy.get())};e()}}ki.currentPopupAction=null;const by="pendingRedirect",dr=new Map;class wy extends Wu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=dr.get(this.auth._key());if(!e){try{const i=await _y(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}dr.set(this.auth._key(),e)}return this.bypassAuthState||dr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _y(n,e){const t=Iy(e),i=Ey(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function xy(n,e){dr.set(n._key(),e)}function Ey(n){return rn(n._redirectPersistence)}function Iy(n){return cr(by,n.config.apiKey,n.name)}async function Ty(n,e,t=!1){if(St(n.app))return Promise.reject(an(n));const i=fi(n),s=my(i,e),o=await new wy(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}const ky=600*1e3;class Ay{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Gu(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Qt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ky&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rc(e))}saveEventToCache(e){this.cachedEventUids.add(Rc(e)),this.lastProcessedEventTime=Date.now()}}function Rc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Gu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Sy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Gu(n);default:return!1}}async function Cy(n,e={}){return zn(n,"GET","/v1/projects",e)}const Py=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ry=/^https?/;async function Ly(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cy(n);for(const t of e)try{if(Dy(t))return}catch{}Ft(n,"unauthorized-domain")}function Dy(n){const e=Ka(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Ry.test(t))return!1;if(Py.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}const $y=new Ds(3e4,6e4);function Lc(){const n=Yt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ny(n){return new Promise((e,t)=>{function i(){Lc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Lc(),t(Qt(n,"network-request-failed"))},timeout:$y.get()})}if(Yt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Yt().gapi?.load)i();else{const s=kg("iframefcb");return Yt()[s]=()=>{gapi.load?i():t(Qt(n,"network-request-failed"))},Ru(`${Tg()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw ur=null,e})}let ur=null;function My(n){return ur=ur||Ny(n),ur}const Oy=new Ds(5e3,15e3),Vy="__/auth/iframe",By="emulator/auth/iframe",Fy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Uy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zy(n){const e=n.config;se(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Eo(e,By):`https://${n.config.authDomain}/${Vy}`,i={apiKey:e.apiKey,appName:n.name,v:mi},s=Uy.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Ls(i).slice(1)}`}async function jy(n){const e=await My(n),t=Yt().gapi;return se(t,n,"internal-error"),e.open({where:document.body,url:zy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fy,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Qt(n,"network-request-failed"),l=Yt().setTimeout(()=>{r(o)},Oy.get());function d(){Yt().clearTimeout(l),s(i)}i.ping(d).then(d,()=>{r(o)})}))}const qy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hy=500,Wy=600,Gy="_blank",Ky="http://localhost";class Dc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Qy(n,e,t,i=Hy,s=Wy){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const d={...qy,width:i.toString(),height:s.toString(),top:r,left:o},u=ft().toLowerCase();t&&(l=Iu(u)?Gy:t),xu(u)&&(e=e||Ky,d.scrollbars="yes");const m=Object.entries(d).reduce((v,[R,D])=>`${v}${R}=${D},`,"");if(gg(u)&&l!=="_self")return Yy(e||"",l),new Dc(null);const b=window.open(e||"",l,m);se(b,n,"popup-blocked");try{b.focus()}catch{}return new Dc(b)}function Yy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}const Jy="__/auth/handler",Xy="emulator/auth/handler",Zy=encodeURIComponent("fac");async function $c(n,e,t,i,s,r){se(n.config.authDomain,n,"auth-domain-config-required"),se(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:mi,eventId:s};if(e instanceof $u){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Om(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,b]of Object.entries({}))o[m]=b}if(e instanceof Ns){const m=e.getScopes().filter(b=>b!=="");m.length>0&&(o.scopes=m.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const d=await n._getAppCheckToken(),u=d?`#${Zy}=${encodeURIComponent(d)}`:"";return`${ev(n)}?${Ls(l).slice(1)}${u}`}function ev({config:n}){return n.emulator?Eo(n,Xy):`https://${n.authDomain}/${Jy}`}const Pa="webStorageSupport";class tv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Uu,this._completeRedirectFn=Ty,this._overrideRedirectResult=xy}async _openPopup(e,t,i,s){un(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await $c(e,t,i,Ka(),s);return Qy(e,r,So())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await $c(e,t,i,Ka(),s);return sy(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(un(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await jy(e),i=new Ay(e);return t.register("authEvent",s=>(se(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Pa,{type:Pa},s=>{const r=s?.[0]?.[Pa];r!==void 0&&t(!!r),Ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ly(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Cu()||Eu()||To()}}const nv=tv;var Nc="@firebase/auth",Mc="1.12.0";class iv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){se(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function sv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rv(n){si(new Dn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;se(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const d={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Pu(n)},u=new xg(i,s,r,d);return Lg(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),si(new Dn("auth-internal",e=>{const t=fi(e.getProvider("auth").getImmediate());return(i=>new iv(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Kt(Nc,Mc,sv(n)),Kt(Nc,Mc,"esm2020")}const av=300,ov=lu("authIdTokenMaxAge")||av;let Oc=null;const lv=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>ov)return;const s=t?.token;Oc!==s&&(Oc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ku(n=_o()){const e=Fr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Rg(n,{popupRedirectResolver:nv,persistence:[hy,ty,Uu]}),i=lu("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=lv(r.toString());Yg(t,o,()=>o(t.currentUser)),Qg(t,l=>o(l))}}const s=ru("auth");return s&&Dg(t,`http://${s}`),t}function cv(){return document.getElementsByTagName("head")?.[0]??document}Eg({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Qt("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",cv().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rv("Browser");var dv="firebase",uv="12.9.0";Kt(dv,uv,"app");var Vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Rn,Qu;(function(){var n;function e(f,g){function y(){}y.prototype=g.prototype,f.F=g.prototype,f.prototype=new y,f.prototype.constructor=f,f.D=function(w,h,I){for(var x=Array(arguments.length-2),P=2;P<arguments.length;P++)x[P-2]=arguments[P];return g.prototype[h].apply(w,x)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(f,g,y){y||(y=0);const w=Array(16);if(typeof g=="string")for(var h=0;h<16;++h)w[h]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(h=0;h<16;++h)w[h]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=f.g[0],y=f.g[1],h=f.g[2];let I=f.g[3],x;x=g+(I^y&(h^I))+w[0]+3614090360&4294967295,g=y+(x<<7&4294967295|x>>>25),x=I+(h^g&(y^h))+w[1]+3905402710&4294967295,I=g+(x<<12&4294967295|x>>>20),x=h+(y^I&(g^y))+w[2]+606105819&4294967295,h=I+(x<<17&4294967295|x>>>15),x=y+(g^h&(I^g))+w[3]+3250441966&4294967295,y=h+(x<<22&4294967295|x>>>10),x=g+(I^y&(h^I))+w[4]+4118548399&4294967295,g=y+(x<<7&4294967295|x>>>25),x=I+(h^g&(y^h))+w[5]+1200080426&4294967295,I=g+(x<<12&4294967295|x>>>20),x=h+(y^I&(g^y))+w[6]+2821735955&4294967295,h=I+(x<<17&4294967295|x>>>15),x=y+(g^h&(I^g))+w[7]+4249261313&4294967295,y=h+(x<<22&4294967295|x>>>10),x=g+(I^y&(h^I))+w[8]+1770035416&4294967295,g=y+(x<<7&4294967295|x>>>25),x=I+(h^g&(y^h))+w[9]+2336552879&4294967295,I=g+(x<<12&4294967295|x>>>20),x=h+(y^I&(g^y))+w[10]+4294925233&4294967295,h=I+(x<<17&4294967295|x>>>15),x=y+(g^h&(I^g))+w[11]+2304563134&4294967295,y=h+(x<<22&4294967295|x>>>10),x=g+(I^y&(h^I))+w[12]+1804603682&4294967295,g=y+(x<<7&4294967295|x>>>25),x=I+(h^g&(y^h))+w[13]+4254626195&4294967295,I=g+(x<<12&4294967295|x>>>20),x=h+(y^I&(g^y))+w[14]+2792965006&4294967295,h=I+(x<<17&4294967295|x>>>15),x=y+(g^h&(I^g))+w[15]+1236535329&4294967295,y=h+(x<<22&4294967295|x>>>10),x=g+(h^I&(y^h))+w[1]+4129170786&4294967295,g=y+(x<<5&4294967295|x>>>27),x=I+(y^h&(g^y))+w[6]+3225465664&4294967295,I=g+(x<<9&4294967295|x>>>23),x=h+(g^y&(I^g))+w[11]+643717713&4294967295,h=I+(x<<14&4294967295|x>>>18),x=y+(I^g&(h^I))+w[0]+3921069994&4294967295,y=h+(x<<20&4294967295|x>>>12),x=g+(h^I&(y^h))+w[5]+3593408605&4294967295,g=y+(x<<5&4294967295|x>>>27),x=I+(y^h&(g^y))+w[10]+38016083&4294967295,I=g+(x<<9&4294967295|x>>>23),x=h+(g^y&(I^g))+w[15]+3634488961&4294967295,h=I+(x<<14&4294967295|x>>>18),x=y+(I^g&(h^I))+w[4]+3889429448&4294967295,y=h+(x<<20&4294967295|x>>>12),x=g+(h^I&(y^h))+w[9]+568446438&4294967295,g=y+(x<<5&4294967295|x>>>27),x=I+(y^h&(g^y))+w[14]+3275163606&4294967295,I=g+(x<<9&4294967295|x>>>23),x=h+(g^y&(I^g))+w[3]+4107603335&4294967295,h=I+(x<<14&4294967295|x>>>18),x=y+(I^g&(h^I))+w[8]+1163531501&4294967295,y=h+(x<<20&4294967295|x>>>12),x=g+(h^I&(y^h))+w[13]+2850285829&4294967295,g=y+(x<<5&4294967295|x>>>27),x=I+(y^h&(g^y))+w[2]+4243563512&4294967295,I=g+(x<<9&4294967295|x>>>23),x=h+(g^y&(I^g))+w[7]+1735328473&4294967295,h=I+(x<<14&4294967295|x>>>18),x=y+(I^g&(h^I))+w[12]+2368359562&4294967295,y=h+(x<<20&4294967295|x>>>12),x=g+(y^h^I)+w[5]+4294588738&4294967295,g=y+(x<<4&4294967295|x>>>28),x=I+(g^y^h)+w[8]+2272392833&4294967295,I=g+(x<<11&4294967295|x>>>21),x=h+(I^g^y)+w[11]+1839030562&4294967295,h=I+(x<<16&4294967295|x>>>16),x=y+(h^I^g)+w[14]+4259657740&4294967295,y=h+(x<<23&4294967295|x>>>9),x=g+(y^h^I)+w[1]+2763975236&4294967295,g=y+(x<<4&4294967295|x>>>28),x=I+(g^y^h)+w[4]+1272893353&4294967295,I=g+(x<<11&4294967295|x>>>21),x=h+(I^g^y)+w[7]+4139469664&4294967295,h=I+(x<<16&4294967295|x>>>16),x=y+(h^I^g)+w[10]+3200236656&4294967295,y=h+(x<<23&4294967295|x>>>9),x=g+(y^h^I)+w[13]+681279174&4294967295,g=y+(x<<4&4294967295|x>>>28),x=I+(g^y^h)+w[0]+3936430074&4294967295,I=g+(x<<11&4294967295|x>>>21),x=h+(I^g^y)+w[3]+3572445317&4294967295,h=I+(x<<16&4294967295|x>>>16),x=y+(h^I^g)+w[6]+76029189&4294967295,y=h+(x<<23&4294967295|x>>>9),x=g+(y^h^I)+w[9]+3654602809&4294967295,g=y+(x<<4&4294967295|x>>>28),x=I+(g^y^h)+w[12]+3873151461&4294967295,I=g+(x<<11&4294967295|x>>>21),x=h+(I^g^y)+w[15]+530742520&4294967295,h=I+(x<<16&4294967295|x>>>16),x=y+(h^I^g)+w[2]+3299628645&4294967295,y=h+(x<<23&4294967295|x>>>9),x=g+(h^(y|~I))+w[0]+4096336452&4294967295,g=y+(x<<6&4294967295|x>>>26),x=I+(y^(g|~h))+w[7]+1126891415&4294967295,I=g+(x<<10&4294967295|x>>>22),x=h+(g^(I|~y))+w[14]+2878612391&4294967295,h=I+(x<<15&4294967295|x>>>17),x=y+(I^(h|~g))+w[5]+4237533241&4294967295,y=h+(x<<21&4294967295|x>>>11),x=g+(h^(y|~I))+w[12]+1700485571&4294967295,g=y+(x<<6&4294967295|x>>>26),x=I+(y^(g|~h))+w[3]+2399980690&4294967295,I=g+(x<<10&4294967295|x>>>22),x=h+(g^(I|~y))+w[10]+4293915773&4294967295,h=I+(x<<15&4294967295|x>>>17),x=y+(I^(h|~g))+w[1]+2240044497&4294967295,y=h+(x<<21&4294967295|x>>>11),x=g+(h^(y|~I))+w[8]+1873313359&4294967295,g=y+(x<<6&4294967295|x>>>26),x=I+(y^(g|~h))+w[15]+4264355552&4294967295,I=g+(x<<10&4294967295|x>>>22),x=h+(g^(I|~y))+w[6]+2734768916&4294967295,h=I+(x<<15&4294967295|x>>>17),x=y+(I^(h|~g))+w[13]+1309151649&4294967295,y=h+(x<<21&4294967295|x>>>11),x=g+(h^(y|~I))+w[4]+4149444226&4294967295,g=y+(x<<6&4294967295|x>>>26),x=I+(y^(g|~h))+w[11]+3174756917&4294967295,I=g+(x<<10&4294967295|x>>>22),x=h+(g^(I|~y))+w[2]+718787259&4294967295,h=I+(x<<15&4294967295|x>>>17),x=y+(I^(h|~g))+w[9]+3951481745&4294967295,f.g[0]=f.g[0]+g&4294967295,f.g[1]=f.g[1]+(h+(x<<21&4294967295|x>>>11))&4294967295,f.g[2]=f.g[2]+h&4294967295,f.g[3]=f.g[3]+I&4294967295}i.prototype.v=function(f,g){g===void 0&&(g=f.length);const y=g-this.blockSize,w=this.C;let h=this.h,I=0;for(;I<g;){if(h==0)for(;I<=y;)s(this,f,I),I+=this.blockSize;if(typeof f=="string"){for(;I<g;)if(w[h++]=f.charCodeAt(I++),h==this.blockSize){s(this,w),h=0;break}}else for(;I<g;)if(w[h++]=f[I++],h==this.blockSize){s(this,w),h=0;break}}this.h=h,this.o+=g},i.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var g=1;g<f.length-8;++g)f[g]=0;g=this.o*8;for(var y=f.length-8;y<f.length;++y)f[y]=g&255,g/=256;for(this.v(f),f=Array(16),g=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)f[g++]=this.g[y]>>>w&255;return f};function r(f,g){var y=l;return Object.prototype.hasOwnProperty.call(y,f)?y[f]:y[f]=g(f)}function o(f,g){this.h=g;const y=[];let w=!0;for(let h=f.length-1;h>=0;h--){const I=f[h]|0;w&&I==g||(y[h]=I,w=!1)}this.g=y}var l={};function d(f){return-128<=f&&f<128?r(f,function(g){return new o([g|0],g<0?-1:0)}):new o([f|0],f<0?-1:0)}function u(f){if(isNaN(f)||!isFinite(f))return b;if(f<0)return _(u(-f));const g=[];let y=1;for(let w=0;f>=y;w++)g[w]=f/y|0,y*=4294967296;return new o(g,0)}function m(f,g){if(f.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(f.charAt(0)=="-")return _(m(f.substring(1),g));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=u(Math.pow(g,8));let w=b;for(let I=0;I<f.length;I+=8){var h=Math.min(8,f.length-I);const x=parseInt(f.substring(I,I+h),g);h<8?(h=u(Math.pow(g,h)),w=w.j(h).add(u(x))):(w=w.j(y),w=w.add(u(x)))}return w}var b=d(0),v=d(1),R=d(16777216);n=o.prototype,n.m=function(){if(L(this))return-_(this).m();let f=0,g=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);f+=(w>=0?w:4294967296+w)*g,g*=4294967296}return f},n.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(D(this))return"0";if(L(this))return"-"+_(this).toString(f);const g=u(Math.pow(f,6));var y=this;let w="";for(;;){const h=C(y,g).g;y=A(y,h.j(g));let I=((y.g.length>0?y.g[0]:y.h)>>>0).toString(f);if(y=h,D(y))return I+w;for(;I.length<6;)I="0"+I;w=I+w}},n.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function D(f){if(f.h!=0)return!1;for(let g=0;g<f.g.length;g++)if(f.g[g]!=0)return!1;return!0}function L(f){return f.h==-1}n.l=function(f){return f=A(this,f),L(f)?-1:D(f)?0:1};function _(f){const g=f.g.length,y=[];for(let w=0;w<g;w++)y[w]=~f.g[w];return new o(y,~f.h).add(v)}n.abs=function(){return L(this)?_(this):this},n.add=function(f){const g=Math.max(this.g.length,f.g.length),y=[];let w=0;for(let h=0;h<=g;h++){let I=w+(this.i(h)&65535)+(f.i(h)&65535),x=(I>>>16)+(this.i(h)>>>16)+(f.i(h)>>>16);w=x>>>16,I&=65535,x&=65535,y[h]=x<<16|I}return new o(y,y[y.length-1]&-2147483648?-1:0)};function A(f,g){return f.add(_(g))}n.j=function(f){if(D(this)||D(f))return b;if(L(this))return L(f)?_(this).j(_(f)):_(_(this).j(f));if(L(f))return _(this.j(_(f)));if(this.l(R)<0&&f.l(R)<0)return u(this.m()*f.m());const g=this.g.length+f.g.length,y=[];for(var w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let h=0;h<f.g.length;h++){const I=this.i(w)>>>16,x=this.i(w)&65535,P=f.i(h)>>>16,M=f.i(h)&65535;y[2*w+2*h]+=x*M,S(y,2*w+2*h),y[2*w+2*h+1]+=I*M,S(y,2*w+2*h+1),y[2*w+2*h+1]+=x*P,S(y,2*w+2*h+1),y[2*w+2*h+2]+=I*P,S(y,2*w+2*h+2)}for(f=0;f<g;f++)y[f]=y[2*f+1]<<16|y[2*f];for(f=g;f<2*g;f++)y[f]=0;return new o(y,0)};function S(f,g){for(;(f[g]&65535)!=f[g];)f[g+1]+=f[g]>>>16,f[g]&=65535,g++}function $(f,g){this.g=f,this.h=g}function C(f,g){if(D(g))throw Error("division by zero");if(D(f))return new $(b,b);if(L(f))return g=C(_(f),g),new $(_(g.g),_(g.h));if(L(g))return g=C(f,_(g)),new $(_(g.g),g.h);if(f.g.length>30){if(L(f)||L(g))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=g;w.l(f)<=0;)y=T(y),w=T(w);var h=k(y,1),I=k(w,1);for(w=k(w,2),y=k(y,2);!D(w);){var x=I.add(w);x.l(f)<=0&&(h=h.add(y),I=x),w=k(w,1),y=k(y,1)}return g=A(f,h.j(g)),new $(h,g)}for(h=b;f.l(g)>=0;){for(y=Math.max(1,Math.floor(f.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),I=u(y),x=I.j(g);L(x)||x.l(f)>0;)y-=w,I=u(y),x=I.j(g);D(I)&&(I=v),h=h.add(I),f=A(f,x)}return new $(h,f)}n.B=function(f){return C(this,f).h},n.and=function(f){const g=Math.max(this.g.length,f.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)&f.i(w);return new o(y,this.h&f.h)},n.or=function(f){const g=Math.max(this.g.length,f.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)|f.i(w);return new o(y,this.h|f.h)},n.xor=function(f){const g=Math.max(this.g.length,f.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)^f.i(w);return new o(y,this.h^f.h)};function T(f){const g=f.g.length+1,y=[];for(let w=0;w<g;w++)y[w]=f.i(w)<<1|f.i(w-1)>>>31;return new o(y,f.h)}function k(f,g){const y=g>>5;g%=32;const w=f.g.length-y,h=[];for(let I=0;I<w;I++)h[I]=g>0?f.i(I+y)>>>g|f.i(I+y+1)<<32-g:f.i(I+y);return new o(h,f.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,Qu=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=m,Rn=o}).apply(typeof Vc<"u"?Vc:typeof self<"u"?self:typeof window<"u"?window:{});var er=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Yu,ls,Ju,pr,Xa,Xu,Zu,ep;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof er=="object"&&er];for(var c=0;c<a.length;++c){var p=a[c];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var i=t(this);function s(a,c){if(c)e:{var p=i;a=a.split(".");for(var E=0;E<a.length-1;E++){var V=a[E];if(!(V in p))break e;p=p[V]}a=a[a.length-1],E=p[a],c=c(E),c!=E&&c!=null&&e(p,a,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(c){var p=[],E;for(E in c)Object.prototype.hasOwnProperty.call(c,E)&&p.push([E,c[E]]);return p}});var r=r||{},o=this||self;function l(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function d(a,c,p){return a.call.apply(a.bind,arguments)}function u(a,c,p){return u=d,u.apply(null,arguments)}function m(a,c){var p=Array.prototype.slice.call(arguments,1);return function(){var E=p.slice();return E.push.apply(E,arguments),a.apply(this,E)}}function b(a,c){function p(){}p.prototype=c.prototype,a.Z=c.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(E,V,U){for(var Y=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)Y[fe-2]=arguments[fe];return c.prototype[V].apply(E,Y)}}var v=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function R(a){const c=a.length;if(c>0){const p=Array(c);for(let E=0;E<c;E++)p[E]=a[E];return p}return[]}function D(a,c){for(let E=1;E<arguments.length;E++){const V=arguments[E];var p=typeof V;if(p=p!="object"?p:V?Array.isArray(V)?"array":p:"null",p=="array"||p=="object"&&typeof V.length=="number"){p=a.length||0;const U=V.length||0;a.length=p+U;for(let Y=0;Y<U;Y++)a[p+Y]=V[Y]}else a.push(V)}}class L{constructor(c,p){this.i=c,this.j=p,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function _(a){o.setTimeout(()=>{throw a},0)}function A(){var a=f;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class S{constructor(){this.h=this.g=null}add(c,p){const E=$.get();E.set(c,p),this.h?this.h.next=E:this.g=E,this.h=E}}var $=new L(()=>new C,a=>a.reset());class C{constructor(){this.next=this.g=this.h=null}set(c,p){this.h=c,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let T,k=!1,f=new S,g=()=>{const a=Promise.resolve(void 0);T=()=>{a.then(y)}};function y(){for(var a;a=A();){try{a.h.call(a.g)}catch(p){_(p)}var c=$;c.j(a),c.h<100&&(c.h++,a.next=c.g,c.g=a)}k=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function h(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}h.prototype.h=function(){this.defaultPrevented=!0};var I=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,c),o.removeEventListener("test",p,c)}catch{}return a})();function x(a){return/^[\s\xa0]*$/.test(a)}function P(a,c){h.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,c)}b(P,h),P.prototype.init=function(a,c){const p=this.type=a.type,E=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget,c||(p=="mouseover"?c=a.fromElement:p=="mouseout"&&(c=a.toElement)),this.relatedTarget=c,E?(this.clientX=E.clientX!==void 0?E.clientX:E.pageX,this.clientY=E.clientY!==void 0?E.clientY:E.pageY,this.screenX=E.screenX||0,this.screenY=E.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&P.Z.h.call(this)},P.prototype.h=function(){P.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var M="closure_listenable_"+(Math.random()*1e6|0),q=0;function j(a,c,p,E,V){this.listener=a,this.proxy=null,this.src=c,this.type=p,this.capture=!!E,this.ha=V,this.key=++q,this.da=this.fa=!1}function K(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function J(a,c,p){for(const E in a)c.call(p,a[E],E,a)}function ie(a,c){for(const p in a)c.call(void 0,a[p],p,a)}function he(a){const c={};for(const p in a)c[p]=a[p];return c}const ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pe(a,c){let p,E;for(let V=1;V<arguments.length;V++){E=arguments[V];for(p in E)a[p]=E[p];for(let U=0;U<ce.length;U++)p=ce[U],Object.prototype.hasOwnProperty.call(E,p)&&(a[p]=E[p])}}function xe(a){this.src=a,this.g={},this.h=0}xe.prototype.add=function(a,c,p,E,V){const U=a.toString();a=this.g[U],a||(a=this.g[U]=[],this.h++);const Y=Ge(a,c,E,V);return Y>-1?(c=a[Y],p||(c.fa=!1)):(c=new j(c,this.src,U,!!E,V),c.fa=p,a.push(c)),c};function We(a,c){const p=c.type;if(p in a.g){var E=a.g[p],V=Array.prototype.indexOf.call(E,c,void 0),U;(U=V>=0)&&Array.prototype.splice.call(E,V,1),U&&(K(c),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Ge(a,c,p,E){for(let V=0;V<a.length;++V){const U=a[V];if(!U.da&&U.listener==c&&U.capture==!!p&&U.ha==E)return V}return-1}var Xe="closure_lm_"+(Math.random()*1e6|0),lt={};function gt(a,c,p,E,V){if(Array.isArray(c)){for(let U=0;U<c.length;U++)gt(a,c[U],p,E,V);return null}return p=ke(p),a&&a[M]?a.J(c,p,l(E)?!!E.capture:!1,V):ct(a,c,p,!1,E,V)}function ct(a,c,p,E,V,U){if(!c)throw Error("Invalid event type");const Y=l(V)?!!V.capture:!!V;let fe=Ee(a);if(fe||(a[Xe]=fe=new xe(a)),p=fe.add(c,p,E,Y,U),p.proxy)return p;if(E=It(),p.proxy=E,E.src=a,E.listener=p,a.addEventListener)I||(V=Y),V===void 0&&(V=!1),a.addEventListener(c.toString(),E,V);else if(a.attachEvent)a.attachEvent(oe(c.toString()),E);else if(a.addListener&&a.removeListener)a.addListener(E);else throw Error("addEventListener and attachEvent are unavailable.");return p}function It(){function a(p){return c.call(a.src,a.listener,p)}const c=Pe;return a}function tt(a,c,p,E,V){if(Array.isArray(c))for(var U=0;U<c.length;U++)tt(a,c[U],p,E,V);else E=l(E)?!!E.capture:!!E,p=ke(p),a&&a[M]?(a=a.i,U=String(c).toString(),U in a.g&&(c=a.g[U],p=Ge(c,p,E,V),p>-1&&(K(c[p]),Array.prototype.splice.call(c,p,1),c.length==0&&(delete a.g[U],a.h--)))):a&&(a=Ee(a))&&(c=a.g[c.toString()],a=-1,c&&(a=Ge(c,p,E,V)),(p=a>-1?c[a]:null)&&ge(p))}function ge(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[M])We(c.i,a);else{var p=a.type,E=a.proxy;c.removeEventListener?c.removeEventListener(p,E,a.capture):c.detachEvent?c.detachEvent(oe(p),E):c.addListener&&c.removeListener&&c.removeListener(E),(p=Ee(c))?(We(p,a),p.h==0&&(p.src=null,c[Xe]=null)):K(a)}}}function oe(a){return a in lt?lt[a]:lt[a]="on"+a}function Pe(a,c){if(a.da)a=!0;else{c=new P(c,this);const p=a.listener,E=a.ha||a.src;a.fa&&ge(a),a=p.call(E,c)}return a}function Ee(a){return a=a[Xe],a instanceof xe?a:null}var de="__closure_events_fn_"+(Math.random()*1e9>>>0);function ke(a){return typeof a=="function"?a:(a[de]||(a[de]=function(c){return a.handleEvent(c)}),a[de])}function ae(){w.call(this),this.i=new xe(this),this.M=this,this.G=null}b(ae,w),ae.prototype[M]=!0,ae.prototype.removeEventListener=function(a,c,p,E){tt(this,a,c,p,E)};function Te(a,c){var p,E=a.G;if(E)for(p=[];E;E=E.G)p.push(E);if(a=a.M,E=c.type||c,typeof c=="string")c=new h(c,a);else if(c instanceof h)c.target=c.target||a;else{var V=c;c=new h(E,a),pe(c,V)}V=!0;let U,Y;if(p)for(Y=p.length-1;Y>=0;Y--)U=c.g=p[Y],V=st(U,E,!0,c)&&V;if(U=c.g=a,V=st(U,E,!0,c)&&V,V=st(U,E,!1,c)&&V,p)for(Y=0;Y<p.length;Y++)U=c.g=p[Y],V=st(U,E,!1,c)&&V}ae.prototype.N=function(){if(ae.Z.N.call(this),this.i){var a=this.i;for(const c in a.g){const p=a.g[c];for(let E=0;E<p.length;E++)K(p[E]);delete a.g[c],a.h--}}this.G=null},ae.prototype.J=function(a,c,p,E){return this.i.add(String(a),c,!1,p,E)},ae.prototype.K=function(a,c,p,E){return this.i.add(String(a),c,!0,p,E)};function st(a,c,p,E){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();let V=!0;for(let U=0;U<c.length;++U){const Y=c[U];if(Y&&!Y.da&&Y.capture==p){const fe=Y.listener,Ze=Y.ha||Y.src;Y.fa&&We(a.i,Y),V=fe.call(Ze,E)!==!1&&V}}return V&&!E.defaultPrevented}function Dt(a,c){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:o.setTimeout(a,c||0)}function zt(a){a.g=Dt(()=>{a.g=null,a.i&&(a.i=!1,zt(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class jt extends w{constructor(c,p){super(),this.m=c,this.l=p,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:zt(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function O(a){w.call(this),this.h=a,this.g={}}b(O,w);var N=[];function z(a){J(a.g,function(c,p){this.g.hasOwnProperty(p)&&ge(c)},a),a.g={}}O.prototype.N=function(){O.Z.N.call(this),z(this)},O.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var G=o.JSON.stringify,Q=o.JSON.parse,ee=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function ne(){}function _e(){}var Ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function qe(){h.call(this,"d")}b(qe,h);function vt(){h.call(this,"c")}b(vt,h);var dt={},bt=null;function Be(){return bt=bt||new ae}dt.Ia="serverreachability";function $t(a){h.call(this,dt.Ia,a)}b($t,h);function Tt(a){const c=Be();Te(c,new $t(c))}dt.STAT_EVENT="statevent";function Me(a,c){h.call(this,dt.STAT_EVENT,a),this.stat=c}b(Me,h);function me(a){const c=Be();Te(c,new Me(c,a))}dt.Ja="timingevent";function Re(a,c){h.call(this,dt.Ja,a),this.size=c}b(Re,h);function $e(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},c)}function wt(){this.g=!0}wt.prototype.ua=function(){this.g=!1};function nn(a,c,p,E,V,U){a.info(function(){if(a.g)if(U){var Y="",fe=U.split("&");for(let Le=0;Le<fe.length;Le++){var Ze=fe[Le].split("=");if(Ze.length>1){const nt=Ze[0];Ze=Ze[1];const Ht=nt.split("_");Y=Ht.length>=2&&Ht[1]=="type"?Y+(nt+"="+Ze+"&"):Y+(nt+"=redacted&")}}}else Y=null;else Y=U;return"XMLHTTP REQ ("+E+") [attempt "+V+"]: "+c+`
`+p+`
`+Y})}function qh(a,c,p,E,V,U,Y){a.info(function(){return"XMLHTTP RESP ("+E+") [ attempt "+V+"]: "+c+`
`+p+`
`+U+" "+Y})}function vi(a,c,p,E){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+Wh(a,p)+(E?" "+E:"")})}function Hh(a,c){a.info(function(){return"TIMEOUT: "+c})}wt.prototype.info=function(){};function Wh(a,c){if(!a.g)return c;if(!c)return null;try{const U=JSON.parse(c);if(U){for(a=0;a<U.length;a++)if(Array.isArray(U[a])){var p=U[a];if(!(p.length<2)){var E=p[1];if(Array.isArray(E)&&!(E.length<1)){var V=E[0];if(V!="noop"&&V!="stop"&&V!="close")for(let Y=1;Y<E.length;Y++)E[Y]=""}}}}return G(U)}catch{return c}}var js={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},xl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},El;function da(){}b(da,ne),da.prototype.g=function(){return new XMLHttpRequest},El=new da;function qi(a){return encodeURIComponent(String(a))}function Gh(a){var c=1;a=a.split(":");const p=[];for(;c>0&&a.length;)p.push(a.shift()),c--;return a.length&&p.push(a.join(":")),p}function gn(a,c,p,E){this.j=a,this.i=c,this.l=p,this.S=E||1,this.V=new O(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Il}function Il(){this.i=null,this.g="",this.h=!1}var Tl={},ua={};function pa(a,c,p){a.M=1,a.A=Hs(qt(c)),a.u=p,a.R=!0,kl(a,null)}function kl(a,c){a.F=Date.now(),qs(a),a.B=qt(a.A);var p=a.B,E=a.S;Array.isArray(E)||(E=[String(E)]),Bl(p.i,"t",E),a.C=0,p=a.j.L,a.h=new Il,a.g=ic(a.j,p?c:null,!a.u),a.P>0&&(a.O=new jt(u(a.Y,a,a.g),a.P)),c=a.V,p=a.g,E=a.ba;var V="readystatechange";Array.isArray(V)||(V&&(N[0]=V.toString()),V=N);for(let U=0;U<V.length;U++){const Y=gt(p,V[U],E||c.handleEvent,!1,c.h||c);if(!Y)break;c.g[Y.key]=Y}c=a.J?he(a.J):{},a.u?(a.v||(a.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,c)):(a.v="GET",a.g.ea(a.B,a.v,null,c)),Tt(),nn(a.i,a.v,a.B,a.l,a.S,a.u)}gn.prototype.ba=function(a){a=a.target;const c=this.O;c&&bn(a)==3?c.j():this.Y(a)},gn.prototype.Y=function(a){try{if(a==this.g)e:{const fe=bn(this.g),Ze=this.g.ya(),Le=this.g.ca();if(!(fe<3)&&(fe!=3||this.g&&(this.h.h||this.g.la()||Wl(this.g)))){this.K||fe!=4||Ze==7||(Ze==8||Le<=0?Tt(3):Tt(2)),ha(this);var c=this.g.ca();this.X=c;var p=Kh(this);if(this.o=c==200,qh(this.i,this.v,this.B,this.l,this.S,fe,c),this.o){if(this.U&&!this.L){t:{if(this.g){var E,V=this.g;if((E=V.g?V.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(E)){var U=E;break t}}U=null}if(a=U)vi(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ma(this,a);else{this.o=!1,this.m=3,me(12),Hn(this),Hi(this);break e}}if(this.R){a=!0;let nt;for(;!this.K&&this.C<p.length;)if(nt=Qh(this,p),nt==ua){fe==4&&(this.m=4,me(14),a=!1),vi(this.i,this.l,null,"[Incomplete Response]");break}else if(nt==Tl){this.m=4,me(15),vi(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else vi(this.i,this.l,nt,null),ma(this,nt);if(Al(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),fe!=4||p.length!=0||this.h.h||(this.m=1,me(16),a=!1),this.o=this.o&&a,!a)vi(this.i,this.l,p,"[Invalid Chunked Response]"),Hn(this),Hi(this);else if(p.length>0&&!this.W){this.W=!0;var Y=this.j;Y.g==this&&Y.aa&&!Y.P&&(Y.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),xa(Y),Y.P=!0,me(11))}}else vi(this.i,this.l,p,null),ma(this,p);fe==4&&Hn(this),this.o&&!this.K&&(fe==4?Zl(this.j,this):(this.o=!1,qs(this)))}else cm(this.g),c==400&&p.indexOf("Unknown SID")>0?(this.m=3,me(12)):(this.m=0,me(13)),Hn(this),Hi(this)}}}catch{}};function Kh(a){if(!Al(a))return a.g.la();const c=Wl(a.g);if(c==="")return"";let p="";const E=c.length,V=bn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Hn(a),Hi(a),"";a.h.i=new o.TextDecoder}for(let U=0;U<E;U++)a.h.h=!0,p+=a.h.i.decode(c[U],{stream:!(V&&U==E-1)});return c.length=0,a.h.g+=p,a.C=0,a.h.g}function Al(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Qh(a,c){var p=a.C,E=c.indexOf(`
`,p);return E==-1?ua:(p=Number(c.substring(p,E)),isNaN(p)?Tl:(E+=1,E+p>c.length?ua:(c=c.slice(E,E+p),a.C=E+p,c)))}gn.prototype.cancel=function(){this.K=!0,Hn(this)};function qs(a){a.T=Date.now()+a.H,Sl(a,a.H)}function Sl(a,c){if(a.D!=null)throw Error("WatchDog timer not null");a.D=$e(u(a.aa,a),c)}function ha(a){a.D&&(o.clearTimeout(a.D),a.D=null)}gn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Hh(this.i,this.B),this.M!=2&&(Tt(),me(17)),Hn(this),this.m=2,Hi(this)):Sl(this,this.T-a)};function Hi(a){a.j.I==0||a.K||Zl(a.j,a)}function Hn(a){ha(a);var c=a.O;c&&typeof c.dispose=="function"&&c.dispose(),a.O=null,z(a.V),a.g&&(c=a.g,a.g=null,c.abort(),c.dispose())}function ma(a,c){try{var p=a.j;if(p.I!=0&&(p.g==a||fa(p.h,a))){if(!a.L&&fa(p.h,a)&&p.I==3){try{var E=p.Ba.g.parse(c)}catch{E=null}if(Array.isArray(E)&&E.length==3){var V=E;if(V[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)Ys(p),Ks(p);else break e;_a(p),me(18)}}else p.xa=V[1],0<p.xa-p.K&&V[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=$e(u(p.Va,p),6e3));Rl(p.h)<=1&&p.ta&&(p.ta=void 0)}else Gn(p,11)}else if((a.L||p.g==a)&&Ys(p),!x(c))for(V=p.Ba.g.parse(c),c=0;c<V.length;c++){let Le=V[c];const nt=Le[0];if(!(nt<=p.K))if(p.K=nt,Le=Le[1],p.I==2)if(Le[0]=="c"){p.M=Le[1],p.ba=Le[2];const Ht=Le[3];Ht!=null&&(p.ka=Ht,p.j.info("VER="+p.ka));const Kn=Le[4];Kn!=null&&(p.za=Kn,p.j.info("SVER="+p.za));const wn=Le[5];wn!=null&&typeof wn=="number"&&wn>0&&(E=1.5*wn,p.O=E,p.j.info("backChannelRequestTimeoutMs_="+E)),E=p;const _n=a.g;if(_n){const Xs=_n.g?_n.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Xs){var U=E.h;U.g||Xs.indexOf("spdy")==-1&&Xs.indexOf("quic")==-1&&Xs.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(ga(U,U.h),U.h=null))}if(E.G){const Ea=_n.g?_n.g.getResponseHeader("X-HTTP-Session-Id"):null;Ea&&(E.wa=Ea,Ne(E.J,E.G,Ea))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),E=p;var Y=a;if(E.na=nc(E,E.L?E.ba:null,E.W),Y.L){Ll(E.h,Y);var fe=Y,Ze=E.O;Ze&&(fe.H=Ze),fe.D&&(ha(fe),qs(fe)),E.g=Y}else Jl(E);p.i.length>0&&Qs(p)}else Le[0]!="stop"&&Le[0]!="close"||Gn(p,7);else p.I==3&&(Le[0]=="stop"||Le[0]=="close"?Le[0]=="stop"?Gn(p,7):wa(p):Le[0]!="noop"&&p.l&&p.l.qa(Le),p.A=0)}}Tt(4)}catch{}}var Yh=class{constructor(a,c){this.g=a,this.map=c}};function Cl(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Pl(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Rl(a){return a.h?1:a.g?a.g.size:0}function fa(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function ga(a,c){a.g?a.g.add(c):a.h=c}function Ll(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}Cl.prototype.cancel=function(){if(this.i=Dl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Dl(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const p of a.g.values())c=c.concat(p.G);return c}return R(a.i)}var $l=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jh(a,c){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const E=a[p].indexOf("=");let V,U=null;E>=0?(V=a[p].substring(0,E),U=a[p].substring(E+1)):V=a[p],c(V,U?decodeURIComponent(U.replace(/\+/g," ")):"")}}}function yn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;a instanceof yn?(this.l=a.l,Wi(this,a.j),this.o=a.o,this.g=a.g,Gi(this,a.u),this.h=a.h,ya(this,Fl(a.i)),this.m=a.m):a&&(c=String(a).match($l))?(this.l=!1,Wi(this,c[1]||"",!0),this.o=Ki(c[2]||""),this.g=Ki(c[3]||"",!0),Gi(this,c[4]),this.h=Ki(c[5]||"",!0),ya(this,c[6]||"",!0),this.m=Ki(c[7]||"")):(this.l=!1,this.i=new Yi(null,this.l))}yn.prototype.toString=function(){const a=[];var c=this.j;c&&a.push(Qi(c,Nl,!0),":");var p=this.g;return(p||c=="file")&&(a.push("//"),(c=this.o)&&a.push(Qi(c,Nl,!0),"@"),a.push(qi(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Qi(p,p.charAt(0)=="/"?em:Zh,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Qi(p,nm)),a.join("")},yn.prototype.resolve=function(a){const c=qt(this);let p=!!a.j;p?Wi(c,a.j):p=!!a.o,p?c.o=a.o:p=!!a.g,p?c.g=a.g:p=a.u!=null;var E=a.h;if(p)Gi(c,a.u);else if(p=!!a.h){if(E.charAt(0)!="/")if(this.g&&!this.h)E="/"+E;else{var V=c.h.lastIndexOf("/");V!=-1&&(E=c.h.slice(0,V+1)+E)}if(V=E,V==".."||V==".")E="";else if(V.indexOf("./")!=-1||V.indexOf("/.")!=-1){E=V.lastIndexOf("/",0)==0,V=V.split("/");const U=[];for(let Y=0;Y<V.length;){const fe=V[Y++];fe=="."?E&&Y==V.length&&U.push(""):fe==".."?((U.length>1||U.length==1&&U[0]!="")&&U.pop(),E&&Y==V.length&&U.push("")):(U.push(fe),E=!0)}E=U.join("/")}else E=V}return p?c.h=E:p=a.i.toString()!=="",p?ya(c,Fl(a.i)):p=!!a.m,p&&(c.m=a.m),c};function qt(a){return new yn(a)}function Wi(a,c,p){a.j=p?Ki(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function Gi(a,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);a.u=c}else a.u=null}function ya(a,c,p){c instanceof Yi?(a.i=c,im(a.i,a.l)):(p||(c=Qi(c,tm)),a.i=new Yi(c,a.l))}function Ne(a,c,p){a.i.set(c,p)}function Hs(a){return Ne(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Ki(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Qi(a,c,p){return typeof a=="string"?(a=encodeURI(a).replace(c,Xh),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Xh(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Nl=/[#\/\?@]/g,Zh=/[#\?:]/g,em=/[#\?]/g,tm=/[#\?@]/g,nm=/#/g;function Yi(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function Wn(a){a.g||(a.g=new Map,a.h=0,a.i&&Jh(a.i,function(c,p){a.add(decodeURIComponent(c.replace(/\+/g," ")),p)}))}n=Yi.prototype,n.add=function(a,c){Wn(this),this.i=null,a=bi(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(c),this.h+=1,this};function Ml(a,c){Wn(a),c=bi(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Ol(a,c){return Wn(a),c=bi(a,c),a.g.has(c)}n.forEach=function(a,c){Wn(this),this.g.forEach(function(p,E){p.forEach(function(V){a.call(c,V,E,this)},this)},this)};function Vl(a,c){Wn(a);let p=[];if(typeof c=="string")Ol(a,c)&&(p=p.concat(a.g.get(bi(a,c))));else for(a=Array.from(a.g.values()),c=0;c<a.length;c++)p=p.concat(a[c]);return p}n.set=function(a,c){return Wn(this),this.i=null,a=bi(this,a),Ol(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},n.get=function(a,c){return a?(a=Vl(this,a),a.length>0?String(a[0]):c):c};function Bl(a,c,p){Ml(a,c),p.length>0&&(a.i=null,a.g.set(bi(a,c),R(p)),a.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(let E=0;E<c.length;E++){var p=c[E];const V=qi(p);p=Vl(this,p);for(let U=0;U<p.length;U++){let Y=V;p[U]!==""&&(Y+="="+qi(p[U])),a.push(Y)}}return this.i=a.join("&")};function Fl(a){const c=new Yi;return c.i=a.i,a.g&&(c.g=new Map(a.g),c.h=a.h),c}function bi(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function im(a,c){c&&!a.j&&(Wn(a),a.i=null,a.g.forEach(function(p,E){const V=E.toLowerCase();E!=V&&(Ml(this,E),Bl(this,V,p))},a)),a.j=c}function sm(a,c){const p=new wt;if(o.Image){const E=new Image;E.onload=m(vn,p,"TestLoadImage: loaded",!0,c,E),E.onerror=m(vn,p,"TestLoadImage: error",!1,c,E),E.onabort=m(vn,p,"TestLoadImage: abort",!1,c,E),E.ontimeout=m(vn,p,"TestLoadImage: timeout",!1,c,E),o.setTimeout(function(){E.ontimeout&&E.ontimeout()},1e4),E.src=a}else c(!1)}function rm(a,c){const p=new wt,E=new AbortController,V=setTimeout(()=>{E.abort(),vn(p,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:E.signal}).then(U=>{clearTimeout(V),U.ok?vn(p,"TestPingServer: ok",!0,c):vn(p,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(V),vn(p,"TestPingServer: error",!1,c)})}function vn(a,c,p,E,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),E(p)}catch{}}function am(){this.g=new ee}function va(a){this.i=a.Sb||null,this.h=a.ab||!1}b(va,ne),va.prototype.g=function(){return new Ws(this.i,this.h)};function Ws(a,c){ae.call(this),this.H=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}b(Ws,ae),n=Ws.prototype,n.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=c,this.readyState=1,Xi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(c.body=a),(this.H||o).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ji(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Xi(this)),this.g&&(this.readyState=3,Xi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ul(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ul(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?Ji(this):Xi(this),this.readyState==3&&Ul(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Ji(this))},n.Na=function(a){this.g&&(this.response=a,Ji(this))},n.ga=function(){this.g&&Ji(this)};function Ji(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Xi(a)}n.setRequestHeader=function(a,c){this.A.append(a,c)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var p=c.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=c.next();return a.join(`\r
`)};function Xi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ws.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function zl(a){let c="";return J(a,function(p,E){c+=E,c+=":",c+=p,c+=`\r
`}),c}function ba(a,c,p){e:{for(E in p){var E=!1;break e}E=!0}E||(p=zl(p),typeof a=="string"?p!=null&&qi(p):Ne(a,c,p))}function Fe(a){ae.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}b(Fe,ae);var om=/^https?$/i,lm=["POST","PUT"];n=Fe.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,c,p,E){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():El.g(),this.g.onreadystatechange=v(u(this.Ca,this));try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(U){jl(this,U);return}if(a=p||"",p=new Map(this.headers),E)if(Object.getPrototypeOf(E)===Object.prototype)for(var V in E)p.set(V,E[V]);else if(typeof E.keys=="function"&&typeof E.get=="function")for(const U of E.keys())p.set(U,E.get(U));else throw Error("Unknown input type for opt_headers: "+String(E));E=Array.from(p.keys()).find(U=>U.toLowerCase()=="content-type"),V=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(lm,c,void 0)>=0)||E||V||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Y]of p)this.g.setRequestHeader(U,Y);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(U){jl(this,U)}};function jl(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.o=5,ql(a),Gs(a)}function ql(a){a.A||(a.A=!0,Te(a,"complete"),Te(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Te(this,"complete"),Te(this,"abort"),Gs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gs(this,!0)),Fe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Hl(this):this.Xa())},n.Xa=function(){Hl(this)};function Hl(a){if(a.h&&typeof r<"u"){if(a.v&&bn(a)==4)setTimeout(a.Ca.bind(a),0);else if(Te(a,"readystatechange"),bn(a)==4){a.h=!1;try{const U=a.ca();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var p;if(!(p=c)){var E;if(E=U===0){let Y=String(a.D).match($l)[1]||null;!Y&&o.self&&o.self.location&&(Y=o.self.location.protocol.slice(0,-1)),E=!om.test(Y?Y.toLowerCase():"")}p=E}if(p)Te(a,"complete"),Te(a,"success");else{a.o=6;try{var V=bn(a)>2?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.ca()+"]",ql(a)}}finally{Gs(a)}}}}function Gs(a,c){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,c||Te(a,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function bn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return bn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),Q(c)}};function Wl(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function cm(a){const c={};a=(a.g&&bn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let E=0;E<a.length;E++){if(x(a[E]))continue;var p=Gh(a[E]);const V=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const U=c[V]||[];c[V]=U,U.push(p)}ie(c,function(E){return E.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Zi(a,c,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||c}function Gl(a){this.za=0,this.i=[],this.j=new wt,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Zi("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Zi("baseRetryDelayMs",5e3,a),this.Za=Zi("retryDelaySeedMs",1e4,a),this.Ta=Zi("forwardChannelMaxRetries",2,a),this.va=Zi("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Cl(a&&a.concurrentRequestLimit),this.Ba=new am,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Gl.prototype,n.ka=8,n.I=1,n.connect=function(a,c,p,E){me(0),this.W=a,this.H=c||{},p&&E!==void 0&&(this.H.OSID=p,this.H.OAID=E),this.F=this.X,this.J=nc(this,null,this.W),Qs(this)};function wa(a){if(Kl(a),a.I==3){var c=a.V++,p=qt(a.J);if(Ne(p,"SID",a.M),Ne(p,"RID",c),Ne(p,"TYPE","terminate"),es(a,p),c=new gn(a,a.j,c),c.M=2,c.A=Hs(qt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(c.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=c.A,p=!0),p||(c.g=ic(c.j,null),c.g.ea(c.A)),c.F=Date.now(),qs(c)}tc(a)}function Ks(a){a.g&&(xa(a),a.g.cancel(),a.g=null)}function Kl(a){Ks(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ys(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Qs(a){if(!Pl(a.h)&&!a.m){a.m=!0;var c=a.Ea;T||g(),k||(T(),k=!0),f.add(c,a),a.D=0}}function dm(a,c){return Rl(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=c.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=$e(u(a.Ea,a,c),ec(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const V=new gn(this,this.j,a);let U=this.o;if(this.U&&(U?(U=he(U),pe(U,this.U)):U=this.U),this.u!==null||this.R||(V.J=U,U=null),this.S)e:{for(var c=0,p=0;p<this.i.length;p++){t:{var E=this.i[p];if("__data__"in E.map&&(E=E.map.__data__,typeof E=="string")){E=E.length;break t}E=void 0}if(E===void 0)break;if(c+=E,c>4096){c=p;break e}if(c===4096||p===this.i.length-1){c=p+1;break e}}c=1e3}else c=1e3;c=Yl(this,V,c),p=qt(this.J),Ne(p,"RID",a),Ne(p,"CVER",22),this.G&&Ne(p,"X-HTTP-Session-Id",this.G),es(this,p),U&&(this.R?c="headers="+qi(zl(U))+"&"+c:this.u&&ba(p,this.u,U)),ga(this.h,V),this.Ra&&Ne(p,"TYPE","init"),this.S?(Ne(p,"$req",c),Ne(p,"SID","null"),V.U=!0,pa(V,p,null)):pa(V,p,c),this.I=2}}else this.I==3&&(a?Ql(this,a):this.i.length==0||Pl(this.h)||Ql(this))};function Ql(a,c){var p;c?p=c.l:p=a.V++;const E=qt(a.J);Ne(E,"SID",a.M),Ne(E,"RID",p),Ne(E,"AID",a.K),es(a,E),a.u&&a.o&&ba(E,a.u,a.o),p=new gn(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),c&&(a.i=c.G.concat(a.i)),c=Yl(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ga(a.h,p),pa(p,E,c)}function es(a,c){a.H&&J(a.H,function(p,E){Ne(c,E,p)}),a.l&&J({},function(p,E){Ne(c,E,p)})}function Yl(a,c,p){p=Math.min(a.i.length,p);const E=a.l?u(a.l.Ka,a.l,a):null;e:{var V=a.i;let fe=-1;for(;;){const Ze=["count="+p];fe==-1?p>0?(fe=V[0].g,Ze.push("ofs="+fe)):fe=0:Ze.push("ofs="+fe);let Le=!0;for(let nt=0;nt<p;nt++){var U=V[nt].g;const Ht=V[nt].map;if(U-=fe,U<0)fe=Math.max(0,V[nt].g-100),Le=!1;else try{U="req"+U+"_"||"";try{var Y=Ht instanceof Map?Ht:Object.entries(Ht);for(const[Kn,wn]of Y){let _n=wn;l(wn)&&(_n=G(wn)),Ze.push(U+Kn+"="+encodeURIComponent(_n))}}catch(Kn){throw Ze.push(U+"type="+encodeURIComponent("_badmap")),Kn}}catch{E&&E(Ht)}}if(Le){Y=Ze.join("&");break e}}Y=void 0}return a=a.i.splice(0,p),c.G=a,Y}function Jl(a){if(!a.g&&!a.v){a.Y=1;var c=a.Da;T||g(),k||(T(),k=!0),f.add(c,a),a.A=0}}function _a(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=$e(u(a.Da,a),ec(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Xl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=$e(u(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,me(10),Ks(this),Xl(this))};function xa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Xl(a){a.g=new gn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var c=qt(a.na);Ne(c,"RID","rpc"),Ne(c,"SID",a.M),Ne(c,"AID",a.K),Ne(c,"CI",a.F?"0":"1"),!a.F&&a.ia&&Ne(c,"TO",a.ia),Ne(c,"TYPE","xmlhttp"),es(a,c),a.u&&a.o&&ba(c,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=Hs(qt(c)),p.u=null,p.R=!0,kl(p,a)}n.Va=function(){this.C!=null&&(this.C=null,Ks(this),_a(this),me(19))};function Ys(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Zl(a,c){var p=null;if(a.g==c){Ys(a),xa(a),a.g=null;var E=2}else if(fa(a.h,c))p=c.G,Ll(a.h,c),E=1;else return;if(a.I!=0){if(c.o)if(E==1){p=c.u?c.u.length:0,c=Date.now()-c.F;var V=a.D;E=Be(),Te(E,new Re(E,p)),Qs(a)}else Jl(a);else if(V=c.m,V==3||V==0&&c.X>0||!(E==1&&dm(a,c)||E==2&&_a(a)))switch(p&&p.length>0&&(c=a.h,c.i=c.i.concat(p)),V){case 1:Gn(a,5);break;case 4:Gn(a,10);break;case 3:Gn(a,6);break;default:Gn(a,2)}}}function ec(a,c){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*c}function Gn(a,c){if(a.j.info("Error code "+c),c==2){var p=u(a.bb,a),E=a.Ua;const V=!E;E=new yn(E||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Wi(E,"https"),Hs(E),V?sm(E.toString(),p):rm(E.toString(),p)}else me(2);a.I=0,a.l&&a.l.pa(c),tc(a),Kl(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),me(2)):(this.j.info("Failed to ping google.com"),me(1))};function tc(a){if(a.I=0,a.ja=[],a.l){const c=Dl(a.h);(c.length!=0||a.i.length!=0)&&(D(a.ja,c),D(a.ja,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.oa()}}function nc(a,c,p){var E=p instanceof yn?qt(p):new yn(p);if(E.g!="")c&&(E.g=c+"."+E.g),Gi(E,E.u);else{var V=o.location;E=V.protocol,c=c?c+"."+V.hostname:V.hostname,V=+V.port;const U=new yn(null);E&&Wi(U,E),c&&(U.g=c),V&&Gi(U,V),p&&(U.h=p),E=U}return p=a.G,c=a.wa,p&&c&&Ne(E,p,c),Ne(E,"VER",a.ka),es(a,E),E}function ic(a,c,p){if(c&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Aa&&!a.ma?new Fe(new va({ab:p})):new Fe(a.ma),c.Fa(a.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function sc(){}n=sc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Js(){}Js.prototype.g=function(a,c){return new kt(a,c)};function kt(a,c){ae.call(this),this.g=new Gl(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(a?a["X-WebChannel-Client-Profile"]=c.sa:a={"X-WebChannel-Client-Profile":c.sa}),this.g.U=a,(a=c&&c.Qb)&&!x(a)&&(this.g.u=a),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!x(c)&&(this.g.G=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new wi(this)}b(kt,ae),kt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},kt.prototype.close=function(){wa(this.g)},kt.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=G(a),a=p);c.i.push(new Yh(c.Ya++,a)),c.I==3&&Qs(c)},kt.prototype.N=function(){this.g.l=null,delete this.j,wa(this.g),delete this.g,kt.Z.N.call(this)};function rc(a){qe.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const p in c){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}b(rc,qe);function ac(){vt.call(this),this.status=1}b(ac,vt);function wi(a){this.g=a}b(wi,sc),wi.prototype.ra=function(){Te(this.g,"a")},wi.prototype.qa=function(a){Te(this.g,new rc(a))},wi.prototype.pa=function(a){Te(this.g,new ac)},wi.prototype.oa=function(){Te(this.g,"b")},Js.prototype.createWebChannel=Js.prototype.g,kt.prototype.send=kt.prototype.o,kt.prototype.open=kt.prototype.m,kt.prototype.close=kt.prototype.close,ep=function(){return new Js},Zu=function(){return Be()},Xu=dt,Xa={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},js.NO_ERROR=0,js.TIMEOUT=8,js.HTTP_ERROR=6,pr=js,xl.COMPLETE="complete",Ju=xl,_e.EventType=Ce,Ce.OPEN="a",Ce.CLOSE="b",Ce.ERROR="c",Ce.MESSAGE="d",ae.prototype.listen=ae.prototype.J,ls=_e,Fe.prototype.listenOnce=Fe.prototype.K,Fe.prototype.getLastError=Fe.prototype.Ha,Fe.prototype.getLastErrorCode=Fe.prototype.ya,Fe.prototype.getStatus=Fe.prototype.ca,Fe.prototype.getResponseJson=Fe.prototype.La,Fe.prototype.getResponseText=Fe.prototype.la,Fe.prototype.send=Fe.prototype.ea,Fe.prototype.setWithCredentials=Fe.prototype.Fa,Yu=Fe}).apply(typeof er<"u"?er:typeof self<"u"?self:typeof window<"u"?window:{});class pt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");let Bi="12.9.0";function pv(n){Bi=n}const oi=new vo("@firebase/firestore");function xi(){return oi.logLevel}function Z(n,...e){if(oi.logLevel<=ve.DEBUG){const t=e.map(Po);oi.debug(`Firestore (${Bi}): ${n}`,...t)}}function pn(n,...e){if(oi.logLevel<=ve.ERROR){const t=e.map(Po);oi.error(`Firestore (${Bi}): ${n}`,...t)}}function li(n,...e){if(oi.logLevel<=ve.WARN){const t=e.map(Po);oi.warn(`Firestore (${Bi}): ${n}`,...t)}}function Po(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}function re(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,tp(n,i,t)}function tp(n,e,t){let i=`FIRESTORE (${Bi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw pn(i),new Error(i)}function Se(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||tp(e,s,i)}function ue(n,e){return n}const H={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends tn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class on{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}class np{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(pt.UNAUTHENTICATED)))}shutdown(){}}class mv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class fv{constructor(e){this.t=e,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Se(this.o===void 0,42304);let i=this.i;const s=d=>this.i!==i?(i=this.i,t(d)):Promise.resolve();let r=new on;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new on,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const d=r;e.enqueueRetryable((async()=>{await d.promise,await s(this.currentUser)}))},l=d=>{Z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((d=>l(d))),setTimeout((()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?l(d):(Z("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new on)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(Z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Se(typeof i.accessToken=="string",31837,{l:i}),new np(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Se(e===null||typeof e=="string",2055,{h:e}),new pt(e)}}class gv{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class yv{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new gv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(pt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Bc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class vv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,St(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Se(this.o===void 0,3512);const i=r=>{r.error!=null&&Z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,Z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable((()=>i(r)))};const s=r=>{Z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((r=>s(r))),setTimeout((()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?s(r):Z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Bc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Bc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function bv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}class Ro{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=bv(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%62))}return i}}function be(n,e){return n<e?-1:n>e?1:0}function Za(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const s=n.charAt(i),r=e.charAt(i);if(s!==r)return Ra(s)===Ra(r)?be(s,r):Ra(s)?1:-1}return be(n.length,e.length)}const wv=55296,_v=57343;function Ra(n){const e=n.charCodeAt(0);return e>=wv&&e<=_v}function Di(n,e,t){return n.length===e.length&&n.every(((i,s)=>t(i,e[s])))}const Fc="__name__";class Wt{constructor(e,t,i){t===void 0?t=0:t>e.length&&re(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&re(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Wt?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const r=Wt.compareSegments(e.get(s),t.get(s));if(r!==0)return r}return be(e.length,t.length)}static compareSegments(e,t){const i=Wt.isNumericId(e),s=Wt.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?Wt.extractNumericId(e).compare(Wt.extractNumericId(t)):Za(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Rn.fromString(e.substring(4,e.length-2))}}class De extends Wt{construct(e,t,i){return new De(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new X(H.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((s=>s.length>0)))}return new De(t)}static emptyPath(){return new De([])}}const xv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends Wt{construct(e,t,i){return new at(e,t,i)}static isValidIdentifier(e){return xv.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fc}static keyField(){return new at([Fc])}static fromServerFormat(e){const t=[];let i="",s=0;const r=()=>{if(i.length===0)throw new X(H.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new X(H.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new X(H.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=d,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(i+=l,s++):(r(),s++)}if(r(),o)throw new X(H.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new at(t)}static emptyPath(){return new at([])}}class te{constructor(e){this.path=e}static fromPath(e){return new te(De.fromString(e))}static fromName(e){return new te(De.fromString(e).popFirst(5))}static empty(){return new te(De.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&De.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return De.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new te(new De(e.slice()))}}function ip(n,e,t){if(!t)throw new X(H.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ev(n,e,t,i){if(e===!0&&i===!0)throw new X(H.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Uc(n){if(!te.isDocumentKey(n))throw new X(H.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function zc(n){if(te.isDocumentKey(n))throw new X(H.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function sp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function qr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":re(12329,{type:typeof n})}function Et(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new X(H.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qr(n);throw new X(H.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Je(n,e){const t={typeString:n};return e&&(t.value=e),t}function Os(n,e){if(!sp(n))throw new X(H.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const s=e[i].typeString,r="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const o=n[i];if(s&&typeof o!==s){t=`JSON field '${i}' must be a ${s}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${i}' field to equal '${r.value}'`;break}}if(t)throw new X(H.INVALID_ARGUMENT,t);return!0}const jc=-62135596800,qc=1e6;class ye{static now(){return ye.fromMillis(Date.now())}static fromDate(e){return ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*qc);return new ye(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new X(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new X(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<jc)throw new X(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qc}_compareTo(e){return this.seconds===e.seconds?be(this.nanoseconds,e.nanoseconds):be(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ye._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Os(e,ye._jsonSchema))return new ye(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-jc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ye._jsonSchemaVersion="firestore/timestamp/1.0",ye._jsonSchema={type:Je("string",ye._jsonSchemaVersion),seconds:Je("number"),nanoseconds:Je("number")};class le{static fromTimestamp(e){return new le(e)}static min(){return new le(new ye(0,0))}static max(){return new le(new ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Es=-1;function Iv(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=le.fromTimestamp(i===1e9?new ye(t+1,0):new ye(t,i));return new $n(s,te.empty(),e)}function Tv(n){return new $n(n.readTime,n.key,Es)}class $n{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new $n(le.min(),te.empty(),Es)}static max(){return new $n(le.max(),te.empty(),Es)}}function kv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=te.comparator(n.documentKey,e.documentKey),t!==0?t:be(n.largestBatchId,e.largestBatchId))}const Av="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Sv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}async function Fi(n){if(n.code!==H.FAILED_PRECONDITION||n.message!==Av)throw n;Z("LocalStore","Unexpectedly lost primary lease")}class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&re(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new W(((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof W?t:W.resolve(t)}catch(t){return W.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):W.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):W.reject(t)}static resolve(e){return new W(((t,i)=>{t(e)}))}static reject(e){return new W(((t,i)=>{i(e)}))}static waitFor(e){return new W(((t,i)=>{let s=0,r=0,o=!1;e.forEach((l=>{++s,l.next((()=>{++r,o&&r===s&&t()}),(d=>i(d)))})),o=!0,r===s&&t()}))}static or(e){let t=W.resolve(!1);for(const i of e)t=t.next((s=>s?W.resolve(s):i()));return t}static forEach(e,t){const i=[];return e.forEach(((s,r)=>{i.push(t.call(this,s,r))})),this.waitFor(i)}static mapArray(e,t){return new W(((i,s)=>{const r=e.length,o=new Array(r);let l=0;for(let d=0;d<r;d++){const u=d;t(e[u]).next((m=>{o[u]=m,++l,l===r&&i(o)}),(m=>s(m)))}}))}static doWhile(e,t){return new W(((i,s)=>{const r=()=>{e()===!0?t().next((()=>{r()}),s):i()};r()}))}}function Cv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ui(n){return n.name==="IndexedDbTransactionError"}class Hr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>t.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Hr.ce=-1;const Lo=-1;function Wr(n){return n==null}function kr(n){return n===0&&1/n==-1/0}function Pv(n){return typeof n=="number"&&Number.isInteger(n)&&!kr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const rp="";function Rv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Hc(e)),e=Lv(n.get(t),e);return Hc(e)}function Lv(n,e){let t=e;const i=n.length;for(let s=0;s<i;s++){const r=n.charAt(s);switch(r){case"\0":t+="";break;case rp:t+="";break;default:t+=r}}return t}function Hc(n){return n+rp+""}function Wc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function jn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ap(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}class Ve{constructor(e,t){this.comparator=e,this.root=t||rt.EMPTY}insert(e,t){return new Ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,rt.BLACK,null,null))}remove(e){return new Ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,i)=>(e(t,i),!1)))}toString(){const e=[];return this.inorderTraversal(((t,i)=>(e.push(`${t}:${i}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new tr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new tr(this.root,e,this.comparator,!1)}getReverseIterator(){return new tr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new tr(this.root,e,this.comparator,!0)}}class tr{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class rt{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??rt.RED,this.left=s??rt.EMPTY,this.right=r??rt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new rt(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return rt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return rt.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw re(43730,{key:this.key,value:this.value});if(this.right.isRed())throw re(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw re(27949);return e+(this.isRed()?0:1)}}rt.EMPTY=null,rt.RED=!0,rt.BLACK=!1;rt.EMPTY=new class{constructor(){this.size=0}get key(){throw re(57766)}get value(){throw re(16141)}get color(){throw re(16727)}get left(){throw re(29726)}get right(){throw re(36894)}copy(e,t,i,s,r){return this}insert(e,t,i){return new rt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class et{constructor(e){this.comparator=e,this.data=new Ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,i)=>(e(t),!1)))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Gc(this.data.getIterator())}getIteratorFrom(e){return new Gc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((i=>{t=t.add(i)})),t}isEqual(e){if(!(e instanceof et)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new et(this.comparator);return t.data=e,t}}class Gc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class Ct{constructor(e){this.fields=e,e.sort(at.comparator)}static empty(){return new Ct([])}unionWith(e){let t=new et(at.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Ct(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Di(this.fields,e.fields,((t,i)=>t.isEqual(i)))}}class op extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class ot{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new op("Invalid base64 string: "+r):r}})(e);return new ot(t)}static fromUint8Array(e){const t=(function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r})(e);return new ot(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return be(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ot.EMPTY_BYTE_STRING=new ot("");const Dv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nn(n){if(Se(!!n,39018),typeof n=="string"){let e=0;const t=Dv.exec(n);if(Se(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:He(n.seconds),nanos:He(n.nanos)}}function He(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Mn(n){return typeof n=="string"?ot.fromBase64String(n):ot.fromUint8Array(n)}const lp="server_timestamp",cp="__type__",dp="__previous_value__",up="__local_write_time__";function Do(n){return(n?.mapValue?.fields||{})[cp]?.stringValue===lp}function Gr(n){const e=n.mapValue.fields[dp];return Do(e)?Gr(e):e}function Is(n){const e=Nn(n.mapValue.fields[up].timestampValue);return new ye(e.seconds,e.nanos)}class $v{constructor(e,t,i,s,r,o,l,d,u,m,b){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=d,this.useFetchStreams=u,this.isUsingEmulator=m,this.apiKey=b}}const Ar="(default)";class Ts{constructor(e,t){this.projectId=e,this.database=t||Ar}static empty(){return new Ts("","")}get isDefaultDatabase(){return this.database===Ar}isEqual(e){return e instanceof Ts&&e.projectId===this.projectId&&e.database===this.database}}function Nv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new X(H.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ts(n.options.projectId,e)}const pp="__type__",Mv="__max__",nr={mapValue:{}},hp="__vector__",Sr="value";function On(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Do(n)?4:Vv(n)?9007199254740991:Ov(n)?10:11:re(28295,{value:n})}function en(n,e){if(n===e)return!0;const t=On(n);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Is(n).isEqual(Is(e));case 3:return(function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const o=Nn(s.timestampValue),l=Nn(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,r){return Mn(s.bytesValue).isEqual(Mn(r.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,r){return He(s.geoPointValue.latitude)===He(r.geoPointValue.latitude)&&He(s.geoPointValue.longitude)===He(r.geoPointValue.longitude)})(n,e);case 2:return(function(s,r){if("integerValue"in s&&"integerValue"in r)return He(s.integerValue)===He(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const o=He(s.doubleValue),l=He(r.doubleValue);return o===l?kr(o)===kr(l):isNaN(o)&&isNaN(l)}return!1})(n,e);case 9:return Di(n.arrayValue.values||[],e.arrayValue.values||[],en);case 10:case 11:return(function(s,r){const o=s.mapValue.fields||{},l=r.mapValue.fields||{};if(Wc(o)!==Wc(l))return!1;for(const d in o)if(o.hasOwnProperty(d)&&(l[d]===void 0||!en(o[d],l[d])))return!1;return!0})(n,e);default:return re(52216,{left:n})}}function ks(n,e){return(n.values||[]).find((t=>en(t,e)))!==void 0}function $i(n,e){if(n===e)return 0;const t=On(n),i=On(e);if(t!==i)return be(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return be(n.booleanValue,e.booleanValue);case 2:return(function(r,o){const l=He(r.integerValue||r.doubleValue),d=He(o.integerValue||o.doubleValue);return l<d?-1:l>d?1:l===d?0:isNaN(l)?isNaN(d)?0:-1:1})(n,e);case 3:return Kc(n.timestampValue,e.timestampValue);case 4:return Kc(Is(n),Is(e));case 5:return Za(n.stringValue,e.stringValue);case 6:return(function(r,o){const l=Mn(r),d=Mn(o);return l.compareTo(d)})(n.bytesValue,e.bytesValue);case 7:return(function(r,o){const l=r.split("/"),d=o.split("/");for(let u=0;u<l.length&&u<d.length;u++){const m=be(l[u],d[u]);if(m!==0)return m}return be(l.length,d.length)})(n.referenceValue,e.referenceValue);case 8:return(function(r,o){const l=be(He(r.latitude),He(o.latitude));return l!==0?l:be(He(r.longitude),He(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Qc(n.arrayValue,e.arrayValue);case 10:return(function(r,o){const l=r.fields||{},d=o.fields||{},u=l[Sr]?.arrayValue,m=d[Sr]?.arrayValue,b=be(u?.values?.length||0,m?.values?.length||0);return b!==0?b:Qc(u,m)})(n.mapValue,e.mapValue);case 11:return(function(r,o){if(r===nr.mapValue&&o===nr.mapValue)return 0;if(r===nr.mapValue)return 1;if(o===nr.mapValue)return-1;const l=r.fields||{},d=Object.keys(l),u=o.fields||{},m=Object.keys(u);d.sort(),m.sort();for(let b=0;b<d.length&&b<m.length;++b){const v=Za(d[b],m[b]);if(v!==0)return v;const R=$i(l[d[b]],u[m[b]]);if(R!==0)return R}return be(d.length,m.length)})(n.mapValue,e.mapValue);default:throw re(23264,{he:t})}}function Kc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return be(n,e);const t=Nn(n),i=Nn(e),s=be(t.seconds,i.seconds);return s!==0?s:be(t.nanos,i.nanos)}function Qc(n,e){const t=n.values||[],i=e.values||[];for(let s=0;s<t.length&&s<i.length;++s){const r=$i(t[s],i[s]);if(r)return r}return be(t.length,i.length)}function Ni(n){return eo(n)}function eo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const i=Nn(t);return`time(${i.seconds},${i.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Mn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return te.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let i="[",s=!0;for(const r of t.values||[])s?s=!1:i+=",",i+=eo(r);return i+"]"})(n.arrayValue):"mapValue"in n?(function(t){const i=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const o of i)r?r=!1:s+=",",s+=`${o}:${eo(t.fields[o])}`;return s+"}"})(n.mapValue):re(61005,{value:n})}function hr(n){switch(On(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Gr(n);return e?16+hr(e):16;case 5:return 2*n.stringValue.length;case 6:return Mn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((s,r)=>s+hr(r)),0)})(n.arrayValue);case 10:case 11:return(function(i){let s=0;return jn(i.fields,((r,o)=>{s+=r.length+hr(o)})),s})(n.mapValue);default:throw re(13486,{value:n})}}function Yc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function to(n){return!!n&&"integerValue"in n}function $o(n){return!!n&&"arrayValue"in n}function Jc(n){return!!n&&"nullValue"in n}function Xc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function mr(n){return!!n&&"mapValue"in n}function Ov(n){return(n?.mapValue?.fields||{})[pp]?.stringValue===hp}function fs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return jn(n.mapValue.fields,((t,i)=>e.mapValue.fields[t]=fs(i))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fs(n.arrayValue.values[t]);return e}return{...n}}function Vv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Mv}class xt{constructor(e){this.value=e}static empty(){return new xt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!mr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fs(t)}setAll(e){let t=at.emptyPath(),i={},s=[];e.forEach(((o,l)=>{if(!t.isImmediateParentOf(l)){const d=this.getFieldsMap(t);this.applyChanges(d,i,s),i={},s=[],t=l.popLast()}o?i[l.lastSegment()]=fs(o):s.push(l.lastSegment())}));const r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){const t=this.field(e.popLast());mr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return en(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];mr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){jn(t,((s,r)=>e[s]=r));for(const s of i)delete e[s]}clone(){return new xt(fs(this.value))}}function mp(n){const e=[];return jn(n.fields,((t,i)=>{const s=new at([t]);if(mr(i)){const r=mp(i.mapValue).fields;if(r.length===0)e.push(s);else for(const o of r)e.push(s.child(o))}else e.push(s)})),new Ct(e)}class mt{constructor(e,t,i,s,r,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new mt(e,0,le.min(),le.min(),le.min(),xt.empty(),0)}static newFoundDocument(e,t,i,s){return new mt(e,1,t,le.min(),i,s,0)}static newNoDocument(e,t){return new mt(e,2,t,le.min(),le.min(),xt.empty(),0)}static newUnknownDocument(e,t){return new mt(e,3,t,le.min(),le.min(),xt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(le.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=le.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof mt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new mt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Cr{constructor(e,t){this.position=e,this.inclusive=t}}function Zc(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){const r=e[s],o=n.position[s];if(r.field.isKeyField()?i=te.comparator(te.fromName(o.referenceValue),t.key):i=$i(o,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function ed(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!en(n.position[t],e.position[t]))return!1;return!0}class As{constructor(e,t="asc"){this.field=e,this.dir=t}}function Bv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}class fp{}class Qe extends fp{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new Uv(e,t,i):t==="array-contains"?new qv(e,i):t==="in"?new Hv(e,i):t==="not-in"?new Wv(e,i):t==="array-contains-any"?new Gv(e,i):new Qe(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new zv(e,i):new jv(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison($i(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison($i(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ut extends fp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ut(e,t)}matches(e){return gp(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function gp(n){return n.op==="and"}function yp(n){return Fv(n)&&gp(n)}function Fv(n){for(const e of n.filters)if(e instanceof Ut)return!1;return!0}function no(n){if(n instanceof Qe)return n.field.canonicalString()+n.op.toString()+Ni(n.value);if(yp(n))return n.filters.map((e=>no(e))).join(",");{const e=n.filters.map((t=>no(t))).join(",");return`${n.op}(${e})`}}function vp(n,e){return n instanceof Qe?(function(i,s){return s instanceof Qe&&i.op===s.op&&i.field.isEqual(s.field)&&en(i.value,s.value)})(n,e):n instanceof Ut?(function(i,s){return s instanceof Ut&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce(((r,o,l)=>r&&vp(o,s.filters[l])),!0):!1})(n,e):void re(19439)}function bp(n){return n instanceof Qe?(function(t){return`${t.field.canonicalString()} ${t.op} ${Ni(t.value)}`})(n):n instanceof Ut?(function(t){return t.op.toString()+" {"+t.getFilters().map(bp).join(" ,")+"}"})(n):"Filter"}class Uv extends Qe{constructor(e,t,i){super(e,t,i),this.key=te.fromName(i.referenceValue)}matches(e){const t=te.comparator(e.key,this.key);return this.matchesComparison(t)}}class zv extends Qe{constructor(e,t){super(e,"in",t),this.keys=wp("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class jv extends Qe{constructor(e,t){super(e,"not-in",t),this.keys=wp("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function wp(n,e){return(e.arrayValue?.values||[]).map((t=>te.fromName(t.referenceValue)))}class qv extends Qe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $o(t)&&ks(t.arrayValue,this.value)}}class Hv extends Qe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ks(this.value.arrayValue,t)}}class Wv extends Qe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ks(this.value.arrayValue,t)}}class Gv extends Qe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$o(t)||!t.arrayValue.values)&&t.arrayValue.values.some((i=>ks(this.value.arrayValue,i)))}}class Kv{constructor(e,t=null,i=[],s=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=l,this.Te=null}}function td(n,e=null,t=[],i=[],s=null,r=null,o=null){return new Kv(n,e,t,i,s,r,o)}function No(n){const e=ue(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((i=>no(i))).join(","),t+="|ob:",t+=e.orderBy.map((i=>(function(r){return r.field.canonicalString()+r.dir})(i))).join(","),Wr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((i=>Ni(i))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((i=>Ni(i))).join(",")),e.Te=t}return e.Te}function Mo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Bv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!vp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ed(n.startAt,e.startAt)&&ed(n.endAt,e.endAt)}function io(n){return te.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}class zi{constructor(e,t=null,i=[],s=[],r=null,o="F",l=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=d,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Qv(n,e,t,i,s,r,o,l){return new zi(n,e,t,i,s,r,o,l)}function Kr(n){return new zi(n)}function nd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Yv(n){return te.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function _p(n){return n.collectionGroup!==null}function gs(n){const e=ue(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ie.push(r),t.add(r.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new et(at.comparator);return o.filters.forEach((d=>{d.getFlattenedFilters().forEach((u=>{u.isInequality()&&(l=l.add(u.field))}))})),l})(e).forEach((r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ie.push(new As(r,i))})),t.has(at.keyField().canonicalString())||e.Ie.push(new As(at.keyField(),i))}return e.Ie}function Jt(n){const e=ue(n);return e.Ee||(e.Ee=Jv(e,gs(n))),e.Ee}function Jv(n,e){if(n.limitType==="F")return td(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const r=s.dir==="desc"?"asc":"desc";return new As(s.field,r)}));const t=n.endAt?new Cr(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Cr(n.startAt.position,n.startAt.inclusive):null;return td(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function so(n,e){const t=n.filters.concat([e]);return new zi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xv(n,e){const t=n.explicitOrderBy.concat([e]);return new zi(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Pr(n,e,t){return new zi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Qr(n,e){return Mo(Jt(n),Jt(e))&&n.limitType===e.limitType}function xp(n){return`${No(Jt(n))}|lt:${n.limitType}`}function Ei(n){return`Query(target=${(function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map((s=>bp(s))).join(", ")}]`),Wr(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((s=>Ni(s))).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((s=>Ni(s))).join(",")),`Target(${i})`})(Jt(n))}; limitType=${n.limitType})`}function Yr(n,e){return e.isFoundDocument()&&(function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):te.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)})(n,e)&&(function(i,s){for(const r of gs(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0})(n,e)&&(function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0})(n,e)&&(function(i,s){return!(i.startAt&&!(function(o,l,d){const u=Zc(o,l,d);return o.inclusive?u<=0:u<0})(i.startAt,gs(i),s)||i.endAt&&!(function(o,l,d){const u=Zc(o,l,d);return o.inclusive?u>=0:u>0})(i.endAt,gs(i),s))})(n,e)}function Zv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ep(n){return(e,t)=>{let i=!1;for(const s of gs(n)){const r=eb(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function eb(n,e,t){const i=n.field.isKeyField()?te.comparator(e.key,t.key):(function(r,o,l){const d=o.data.field(r),u=l.data.field(r);return d!==null&&u!==null?$i(d,u):re(42886)})(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return re(19790,{direction:n.dir})}}class gi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){jn(this.inner,((t,i)=>{for(const[s,r]of i)e(s,r)}))}isEmpty(){return ap(this.inner)}size(){return this.innerSize}}const tb=new Ve(te.comparator);function hn(){return tb}const Ip=new Ve(te.comparator);function cs(...n){let e=Ip;for(const t of n)e=e.insert(t.key,t);return e}function Tp(n){let e=Ip;return n.forEach(((t,i)=>e=e.insert(t,i.overlayedDocument))),e}function Yn(){return ys()}function kp(){return ys()}function ys(){return new gi((n=>n.toString()),((n,e)=>n.isEqual(e)))}const nb=new Ve(te.comparator),ib=new et(te.comparator);function we(...n){let e=ib;for(const t of n)e=e.add(t);return e}const sb=new et(be);function rb(){return sb}function Oo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:kr(e)?"-0":e}}function Ap(n){return{integerValue:""+n}}function ab(n,e){return Pv(e)?Ap(e):Oo(n,e)}class Jr{constructor(){this._=void 0}}function ob(n,e,t){return n instanceof Rr?(function(s,r){const o={fields:{[cp]:{stringValue:lp},[up]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Do(r)&&(r=Gr(r)),r&&(o.fields[dp]=r),{mapValue:o}})(t,e):n instanceof Ss?Cp(n,e):n instanceof Cs?Pp(n,e):(function(s,r){const o=Sp(s,r),l=id(o)+id(s.Ae);return to(o)&&to(s.Ae)?Ap(l):Oo(s.serializer,l)})(n,e)}function lb(n,e,t){return n instanceof Ss?Cp(n,e):n instanceof Cs?Pp(n,e):t}function Sp(n,e){return n instanceof Lr?(function(i){return to(i)||(function(r){return!!r&&"doubleValue"in r})(i)})(e)?e:{integerValue:0}:null}class Rr extends Jr{}class Ss extends Jr{constructor(e){super(),this.elements=e}}function Cp(n,e){const t=Rp(e);for(const i of n.elements)t.some((s=>en(s,i)))||t.push(i);return{arrayValue:{values:t}}}class Cs extends Jr{constructor(e){super(),this.elements=e}}function Pp(n,e){let t=Rp(e);for(const i of n.elements)t=t.filter((s=>!en(s,i)));return{arrayValue:{values:t}}}class Lr extends Jr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function id(n){return He(n.integerValue||n.doubleValue)}function Rp(n){return $o(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function cb(n,e){return n.field.isEqual(e.field)&&(function(i,s){return i instanceof Ss&&s instanceof Ss||i instanceof Cs&&s instanceof Cs?Di(i.elements,s.elements,en):i instanceof Lr&&s instanceof Lr?en(i.Ae,s.Ae):i instanceof Rr&&s instanceof Rr})(n.transform,e.transform)}class db{constructor(e,t){this.version=e,this.transformResults=t}}class Lt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Lt}static exists(e){return new Lt(void 0,e)}static updateTime(e){return new Lt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function fr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Xr{}function Lp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Vo(n.key,Lt.none()):new Vs(n.key,n.data,Lt.none());{const t=n.data,i=xt.empty();let s=new et(at.comparator);for(let r of e.fields)if(!s.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new qn(n.key,i,new Ct(s.toArray()),Lt.none())}}function ub(n,e,t){n instanceof Vs?(function(s,r,o){const l=s.value.clone(),d=rd(s.fieldTransforms,r,o.transformResults);l.setAll(d),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):n instanceof qn?(function(s,r,o){if(!fr(s.precondition,r))return void r.convertToUnknownDocument(o.version);const l=rd(s.fieldTransforms,r,o.transformResults),d=r.data;d.setAll(Dp(s)),d.setAll(l),r.convertToFoundDocument(o.version,d).setHasCommittedMutations()})(n,e,t):(function(s,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function vs(n,e,t,i){return n instanceof Vs?(function(r,o,l,d){if(!fr(r.precondition,o))return l;const u=r.value.clone(),m=ad(r.fieldTransforms,d,o);return u.setAll(m),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,i):n instanceof qn?(function(r,o,l,d){if(!fr(r.precondition,o))return l;const u=ad(r.fieldTransforms,d,o),m=o.data;return m.setAll(Dp(r)),m.setAll(u),o.convertToFoundDocument(o.version,m).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map((b=>b.field)))})(n,e,t,i):(function(r,o,l){return fr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l})(n,e,t)}function pb(n,e){let t=null;for(const i of n.fieldTransforms){const s=e.data.field(i.field),r=Sp(i.transform,s||null);r!=null&&(t===null&&(t=xt.empty()),t.set(i.field,r))}return t||null}function sd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&Di(i,s,((r,o)=>cb(r,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Vs extends Xr{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class qn extends Xr{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function Dp(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}})),e}function rd(n,e,t){const i=new Map;Se(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const r=n[s],o=r.transform,l=e.data.field(r.field);i.set(r.field,lb(o,l,t[s]))}return i}function ad(n,e,t){const i=new Map;for(const s of n){const r=s.transform,o=t.data.field(s.field);i.set(s.field,ob(r,o,e))}return i}class Vo extends Xr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hb extends Xr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class mb{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&ub(r,e,i[s])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=vs(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=vs(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=kp();return this.mutations.forEach((s=>{const r=e.get(s.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(s.key)?null:l;const d=Lp(o,l);d!==null&&i.set(s.key,d),o.isValidDocument()||o.convertToNoDocument(le.min())})),i}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),we())}isEqual(e){return this.batchId===e.batchId&&Di(this.mutations,e.mutations,((t,i)=>sd(t,i)))&&Di(this.baseMutations,e.baseMutations,((t,i)=>sd(t,i)))}}class Bo{constructor(e,t,i,s){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=s}static from(e,t,i){Se(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let s=(function(){return nb})();const r=e.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new Bo(e,t,i,s)}}class fb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}class gb{constructor(e,t){this.count=e,this.unchangedNames=t}}var Ke,Ie;function yb(n){switch(n){case H.OK:return re(64938);case H.CANCELLED:case H.UNKNOWN:case H.DEADLINE_EXCEEDED:case H.RESOURCE_EXHAUSTED:case H.INTERNAL:case H.UNAVAILABLE:case H.UNAUTHENTICATED:return!1;case H.INVALID_ARGUMENT:case H.NOT_FOUND:case H.ALREADY_EXISTS:case H.PERMISSION_DENIED:case H.FAILED_PRECONDITION:case H.ABORTED:case H.OUT_OF_RANGE:case H.UNIMPLEMENTED:case H.DATA_LOSS:return!0;default:return re(15467,{code:n})}}function $p(n){if(n===void 0)return pn("GRPC error has no .code"),H.UNKNOWN;switch(n){case Ke.OK:return H.OK;case Ke.CANCELLED:return H.CANCELLED;case Ke.UNKNOWN:return H.UNKNOWN;case Ke.DEADLINE_EXCEEDED:return H.DEADLINE_EXCEEDED;case Ke.RESOURCE_EXHAUSTED:return H.RESOURCE_EXHAUSTED;case Ke.INTERNAL:return H.INTERNAL;case Ke.UNAVAILABLE:return H.UNAVAILABLE;case Ke.UNAUTHENTICATED:return H.UNAUTHENTICATED;case Ke.INVALID_ARGUMENT:return H.INVALID_ARGUMENT;case Ke.NOT_FOUND:return H.NOT_FOUND;case Ke.ALREADY_EXISTS:return H.ALREADY_EXISTS;case Ke.PERMISSION_DENIED:return H.PERMISSION_DENIED;case Ke.FAILED_PRECONDITION:return H.FAILED_PRECONDITION;case Ke.ABORTED:return H.ABORTED;case Ke.OUT_OF_RANGE:return H.OUT_OF_RANGE;case Ke.UNIMPLEMENTED:return H.UNIMPLEMENTED;case Ke.DATA_LOSS:return H.DATA_LOSS;default:return re(39323,{code:n})}}(Ie=Ke||(Ke={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";function vb(){return new TextEncoder}const bb=new Rn([4294967295,4294967295],0);function od(n){const e=vb().encode(n),t=new Qu;return t.update(e),new Uint8Array(t.digest())}function ld(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Rn([t,i],0),new Rn([s,r],0)]}class Fo{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new ds(`Invalid padding: ${t}`);if(i<0)throw new ds(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new ds(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new ds(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Rn.fromNumber(this.ge)}ye(e,t,i){let s=e.add(t.multiply(Rn.fromNumber(i)));return s.compare(bb)===1&&(s=new Rn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=od(e),[i,s]=ld(t);for(let r=0;r<this.hashCount;r++){const o=this.ye(i,s,r);if(!this.we(o))return!1}return!0}static create(e,t,i){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Fo(r,s,t);return i.forEach((l=>o.insert(l))),o}insert(e){if(this.ge===0)return;const t=od(e),[i,s]=ld(t);for(let r=0;r<this.hashCount;r++){const o=this.ye(i,s,r);this.be(o)}}be(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class ds extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}class Zr{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const s=new Map;return s.set(e,Bs.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new Zr(le.min(),s,new Ve(be),hn(),we())}}class Bs{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new Bs(i,t,we(),we(),we())}}class gr{constructor(e,t,i,s){this.Se=e,this.removedTargetIds=t,this.key=i,this.De=s}}class Np{constructor(e,t){this.targetId=e,this.Ce=t}}class Mp{constructor(e,t,i=ot.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}}class cd{constructor(){this.ve=0,this.Fe=dd(),this.Me=ot.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=we(),t=we(),i=we();return this.Fe.forEach(((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:re(38017,{changeType:r})}})),new Bs(this.Me,this.xe,e,t,i)}Ke(){this.Oe=!1,this.Fe=dd()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Se(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class wb{constructor(e){this.Ge=e,this.ze=new Map,this.je=hn(),this.He=ir(),this.Je=ir(),this.Ze=new Ve(be)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const i=this.nt(t);switch(e.state){case 0:this.rt(t)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.Ke(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),i.Le(e.resumeToken));break;default:re(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((i,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,i=e.Ce.count,s=this.ot(t);if(s){const r=s.target;if(io(r))if(i===0){const o=new te(r.path);this.et(t,o,mt.newNoDocument(o,le.min()))}else Se(i===1,20013,{expectedCount:i});else{const o=this._t(t);if(o!==i){const l=this.ut(e),d=l?this.ct(l,e,o):1;if(d!==0){this.it(t);const u=d===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=t;let o,l;try{o=Mn(i).toUint8Array()}catch(d){if(d instanceof op)return li("Decoding the base64 bloom filter in existence filter failed ("+d.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw d}try{l=new Fo(o,s,r)}catch(d){return li(d instanceof ds?"BloomFilter error: ":"Applying bloom filter failed: ",d),null}return l.ge===0?null:l}ct(e,t,i){return t.Ce.count===i-this.Pt(e,t.targetId)?0:2}Pt(e,t){const i=this.Ge.getRemoteKeysForTarget(t);let s=0;return i.forEach((r=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.et(t,r,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((r,o)=>{const l=this.ot(o);if(l){if(r.current&&io(l.target)){const d=new te(l.target.path);this.It(d).has(o)||this.Et(o,d)||this.et(o,d,mt.newNoDocument(d,e))}r.Be&&(t.set(o,r.ke()),r.Ke())}}));let i=we();this.Je.forEach(((r,o)=>{let l=!0;o.forEachWhile((d=>{const u=this.ot(d);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(i=i.add(r))})),this.je.forEach(((r,o)=>o.setReadTime(e)));const s=new Zr(e,t,this.Ze,this.je,i);return this.je=hn(),this.He=ir(),this.Je=ir(),this.Ze=new Ve(be),s}Ye(e,t){if(!this.rt(e))return;const i=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,i),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,i){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.qe(t,1):s.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),i&&(this.je=this.je.insert(t,i))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new cd,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new et(be),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new et(be),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||Z("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new cd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ir(){return new Ve(te.comparator)}function dd(){return new Ve(te.comparator)}const _b={asc:"ASCENDING",desc:"DESCENDING"},xb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Eb={and:"AND",or:"OR"};class Ib{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ro(n,e){return n.useProto3Json||Wr(e)?e:{value:e}}function Dr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Op(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Tb(n,e){return Dr(n,e.toTimestamp())}function Xt(n){return Se(!!n,49232),le.fromTimestamp((function(t){const i=Nn(t);return new ye(i.seconds,i.nanos)})(n))}function Uo(n,e){return ao(n,e).canonicalString()}function ao(n,e){const t=(function(s){return new De(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Vp(n){const e=De.fromString(n);return Se(jp(e),10190,{key:e.toString()}),e}function oo(n,e){return Uo(n.databaseId,e.path)}function La(n,e){const t=Vp(e);if(t.get(1)!==n.databaseId.projectId)throw new X(H.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new X(H.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new te(Fp(t))}function Bp(n,e){return Uo(n.databaseId,e)}function kb(n){const e=Vp(n);return e.length===4?De.emptyPath():Fp(e)}function lo(n){return new De(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Fp(n){return Se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ud(n,e,t){return{name:oo(n,e),fields:t.value.mapValue.fields}}function Ab(n,e){let t;if("targetChange"in e){e.targetChange;const i=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:re(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=(function(u,m){return u.useProto3Json?(Se(m===void 0||typeof m=="string",58123),ot.fromBase64String(m||"")):(Se(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ot.fromUint8Array(m||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&(function(u){const m=u.code===void 0?H.UNKNOWN:$p(u.code);return new X(m,u.message||"")})(o);t=new Mp(i,s,r,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=La(n,i.document.name),r=Xt(i.document.updateTime),o=i.document.createTime?Xt(i.document.createTime):le.min(),l=new xt({mapValue:{fields:i.document.fields}}),d=mt.newFoundDocument(s,r,o,l),u=i.targetIds||[],m=i.removedTargetIds||[];t=new gr(u,m,d.key,d)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=La(n,i.document),r=i.readTime?Xt(i.readTime):le.min(),o=mt.newNoDocument(s,r),l=i.removedTargetIds||[];t=new gr([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=La(n,i.document),r=i.removedTargetIds||[];t=new gr([],r,s,null)}else{if(!("filter"in e))return re(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,o=new gb(s,r),l=i.targetId;t=new Np(l,o)}}return t}function Sb(n,e){let t;if(e instanceof Vs)t={update:ud(n,e.key,e.value)};else if(e instanceof Vo)t={delete:oo(n,e.key)};else if(e instanceof qn)t={update:ud(n,e.key,e.data),updateMask:Ob(e.fieldMask)};else{if(!(e instanceof hb))return re(16599,{dt:e.type});t={verify:oo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((i=>(function(r,o){const l=o.transform;if(l instanceof Rr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ss)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Cs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Lr)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw re(20930,{transform:o.transform})})(0,i)))),e.precondition.isNone||(t.currentDocument=(function(s,r){return r.updateTime!==void 0?{updateTime:Tb(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:re(27497)})(n,e.precondition)),t}function Cb(n,e){return n&&n.length>0?(Se(e!==void 0,14353),n.map((t=>(function(s,r){let o=s.updateTime?Xt(s.updateTime):Xt(r);return o.isEqual(le.min())&&(o=Xt(r)),new db(o,s.transformResults||[])})(t,e)))):[]}function Pb(n,e){return{documents:[Bp(n,e.path)]}}function Rb(n,e){const t={structuredQuery:{}},i=e.path;let s;e.collectionGroup!==null?(s=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Bp(n,s);const r=(function(u){if(u.length!==0)return zp(Ut.create(u,"and"))})(e.filters);r&&(t.structuredQuery.where=r);const o=(function(u){if(u.length!==0)return u.map((m=>(function(v){return{field:Ii(v.field),direction:$b(v.dir)}})(m)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=ro(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:s}}function Lb(n){let e=kb(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let s=null;if(i>0){Se(i===1,65062);const m=t.from[0];m.allDescendants?s=m.collectionId:e=e.child(m.collectionId)}let r=[];t.where&&(r=(function(b){const v=Up(b);return v instanceof Ut&&yp(v)?v.getFilters():[v]})(t.where));let o=[];t.orderBy&&(o=(function(b){return b.map((v=>(function(D){return new As(Ti(D.field),(function(_){switch(_){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(v)))})(t.orderBy));let l=null;t.limit&&(l=(function(b){let v;return v=typeof b=="object"?b.value:b,Wr(v)?null:v})(t.limit));let d=null;t.startAt&&(d=(function(b){const v=!!b.before,R=b.values||[];return new Cr(R,v)})(t.startAt));let u=null;return t.endAt&&(u=(function(b){const v=!b.before,R=b.values||[];return new Cr(R,v)})(t.endAt)),Qv(e,s,o,r,l,"F",d,u)}function Db(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Up(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Ti(t.unaryFilter.field);return Qe.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=Ti(t.unaryFilter.field);return Qe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Ti(t.unaryFilter.field);return Qe.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ti(t.unaryFilter.field);return Qe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return re(61313);default:return re(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Qe.create(Ti(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return re(58110);default:return re(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Ut.create(t.compositeFilter.filters.map((i=>Up(i))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return re(1026)}})(t.compositeFilter.op))})(n):re(30097,{filter:n})}function $b(n){return _b[n]}function Nb(n){return xb[n]}function Mb(n){return Eb[n]}function Ii(n){return{fieldPath:n.canonicalString()}}function Ti(n){return at.fromServerFormat(n.fieldPath)}function zp(n){return n instanceof Qe?(function(t){if(t.op==="=="){if(Xc(t.value))return{unaryFilter:{field:Ii(t.field),op:"IS_NAN"}};if(Jc(t.value))return{unaryFilter:{field:Ii(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Xc(t.value))return{unaryFilter:{field:Ii(t.field),op:"IS_NOT_NAN"}};if(Jc(t.value))return{unaryFilter:{field:Ii(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ii(t.field),op:Nb(t.op),value:t.value}}})(n):n instanceof Ut?(function(t){const i=t.getFilters().map((s=>zp(s)));return i.length===1?i[0]:{compositeFilter:{op:Mb(t.op),filters:i}}})(n):re(54877,{filter:n})}function Ob(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function jp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function qp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Sn{constructor(e,t,i,s,r=le.min(),o=le.min(),l=ot.EMPTY_BYTE_STRING,d=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=d}withSequenceNumber(e){return new Sn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}class Vb{constructor(e){this.yt=e}}function Bb(n){const e=Lb({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Pr(e,e.limit,"L"):e}class Fb{constructor(){this.Sn=new Ub}addToCollectionParentIndex(e,t){return this.Sn.add(t),W.resolve()}getCollectionParents(e,t){return W.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return W.resolve()}deleteFieldIndex(e,t){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,t){return W.resolve()}getDocumentsMatchingTarget(e,t){return W.resolve(null)}getIndexType(e,t){return W.resolve(0)}getFieldIndexes(e,t){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,t){return W.resolve($n.min())}getMinOffsetFromCollectionGroup(e,t){return W.resolve($n.min())}updateCollectionGroup(e,t,i){return W.resolve()}updateIndexEntries(e,t){return W.resolve()}}class Ub{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new et(De.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new et(De.comparator)).toArray()}}const pd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Hp=41943040;class _t{static withCacheSize(e){return new _t(e,_t.DEFAULT_COLLECTION_PERCENTILE,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}_t.DEFAULT_COLLECTION_PERCENTILE=10,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,_t.DEFAULT=new _t(Hp,_t.DEFAULT_COLLECTION_PERCENTILE,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),_t.DISABLED=new _t(-1,0,0);class Mi{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Mi(0)}static ar(){return new Mi(-1)}}const hd="LruGarbageCollector",zb=1048576;function md([n,e],[t,i]){const s=be(n,t);return s===0?be(e,i):s}class jb{constructor(e){this.Pr=e,this.buffer=new et(md),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();md(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class qb{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){Z(hd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ui(t)?Z(hd,"Ignoring IndexedDB error during garbage collection: ",t):await Fi(t)}await this.Ar(3e5)}))}}class Hb{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((i=>Math.floor(t/100*i)))}nthSequenceNumber(e,t){if(t===0)return W.resolve(Hr.ce);const i=new jb(t);return this.Vr.forEachTarget(e,(s=>i.Er(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>i.Er(s))))).next((()=>i.maxValue))}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Z("LruGarbageCollector","Garbage collection skipped; disabled"),W.resolve(pd)):this.getCacheSize(e).next((i=>i<this.params.cacheSizeCollectionThreshold?(Z("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),pd):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let i,s,r,o,l,d,u;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((b=>(b>this.params.maximumSequenceNumbersToCollect?(Z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${b}`),s=this.params.maximumSequenceNumbersToCollect):s=b,o=Date.now(),this.nthSequenceNumber(e,s)))).next((b=>(i=b,l=Date.now(),this.removeTargets(e,i,t)))).next((b=>(r=b,d=Date.now(),this.removeOrphanedDocuments(e,i)))).next((b=>(u=Date.now(),xi()<=ve.DEBUG&&Z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-m}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${r} targets in `+(d-l)+`ms
	Removed ${b} documents in `+(u-d)+`ms
Total Duration: ${u-m}ms`),W.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:b}))))}}function Wb(n,e){return new Hb(n,e)}class Gb{constructor(){this.changes=new gi((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,mt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?W.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}class Kb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}class Qb{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(i=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(i!==null&&vs(i.mutation,s,Ct.empty(),ye.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.getLocalViewOfDocuments(e,i,we()).next((()=>i))))}getLocalViewOfDocuments(e,t,i=we()){const s=Yn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,i).next((r=>{let o=cs();return r.forEach(((l,d)=>{o=o.insert(l,d.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const i=Yn();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,we())))}populateOverlays(e,t,i){const s=[];return i.forEach((r=>{t.has(r)||s.push(r)})),this.documentOverlayCache.getOverlays(e,s).next((r=>{r.forEach(((o,l)=>{t.set(o,l)}))}))}computeViews(e,t,i,s){let r=hn();const o=ys(),l=(function(){return ys()})();return t.forEach(((d,u)=>{const m=i.get(u.key);s.has(u.key)&&(m===void 0||m.mutation instanceof qn)?r=r.insert(u.key,u):m!==void 0?(o.set(u.key,m.mutation.getFieldMask()),vs(m.mutation,u,m.mutation.getFieldMask(),ye.now())):o.set(u.key,Ct.empty())})),this.recalculateAndSaveOverlays(e,r).next((d=>(d.forEach(((u,m)=>o.set(u,m))),t.forEach(((u,m)=>l.set(u,new Kb(m,o.get(u)??null)))),l)))}recalculateAndSaveOverlays(e,t){const i=ys();let s=new Ve(((o,l)=>o-l)),r=we();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const l of o)l.keys().forEach((d=>{const u=t.get(d);if(u===null)return;let m=i.get(d)||Ct.empty();m=l.applyToLocalView(u,m),i.set(d,m);const b=(s.get(l.batchId)||we()).add(d);s=s.insert(l.batchId,b)}))})).next((()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const d=l.getNext(),u=d.key,m=d.value,b=kp();m.forEach((v=>{if(!r.has(v)){const R=Lp(t.get(v),i.get(v));R!==null&&b.set(v,R),r=r.add(v)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,b))}return W.waitFor(o)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.recalculateAndSaveOverlays(e,i)))}getDocumentsMatchingQuery(e,t,i,s){return Yv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):_p(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,s):this.getDocumentsMatchingCollectionQuery(e,t,i,s)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next((r=>{const o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):W.resolve(Yn());let l=Es,d=r;return o.next((u=>W.forEach(u,((m,b)=>(l<b.largestBatchId&&(l=b.largestBatchId),r.get(m)?W.resolve():this.remoteDocumentCache.getEntry(e,m).next((v=>{d=d.insert(m,v)}))))).next((()=>this.populateOverlays(e,u,r))).next((()=>this.computeViews(e,d,u,we()))).next((m=>({batchId:l,changes:Tp(m)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new te(t)).next((i=>{let s=cs();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,i,s){const r=t.collectionGroup;let o=cs();return this.indexManager.getCollectionParents(e,r).next((l=>W.forEach(l,(d=>{const u=(function(b,v){return new zi(v,null,b.explicitOrderBy.slice(),b.filters.slice(),b.limit,b.limitType,b.startAt,b.endAt)})(t,d.child(r));return this.getDocumentsMatchingCollectionQuery(e,u,i,s).next((m=>{m.forEach(((b,v)=>{o=o.insert(b,v)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next((o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,r,s)))).next((o=>{r.forEach(((d,u)=>{const m=u.getKey();o.get(m)===null&&(o=o.insert(m,mt.newInvalidDocument(m)))}));let l=cs();return o.forEach(((d,u)=>{const m=r.get(d);m!==void 0&&vs(m.mutation,u,Ct.empty(),ye.now()),Yr(t,u)&&(l=l.insert(d,u))})),l}))}}class Yb{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return W.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Xt(s.createTime)}})(t)),W.resolve()}getNamedQuery(e,t){return W.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:Bb(s.bundledQuery),readTime:Xt(s.readTime)}})(t)),W.resolve()}}class Jb{constructor(){this.overlays=new Ve(te.comparator),this.Lr=new Map}getOverlay(e,t){return W.resolve(this.overlays.get(t))}getOverlays(e,t){const i=Yn();return W.forEach(t,(s=>this.getOverlay(e,s).next((r=>{r!==null&&i.set(s,r)})))).next((()=>i))}saveOverlays(e,t,i){return i.forEach(((s,r)=>{this.bt(e,t,r)})),W.resolve()}removeOverlaysForBatchId(e,t,i){const s=this.Lr.get(i);return s!==void 0&&(s.forEach((r=>this.overlays=this.overlays.remove(r))),this.Lr.delete(i)),W.resolve()}getOverlaysForCollection(e,t,i){const s=Yn(),r=t.length+1,o=new te(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const d=l.getNext().value,u=d.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===r&&d.largestBatchId>i&&s.set(d.getKey(),d)}return W.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new Ve(((u,m)=>u-m));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>i){let m=r.get(u.largestBatchId);m===null&&(m=Yn(),r=r.insert(u.largestBatchId,m)),m.set(u.getKey(),u)}}const l=Yn(),d=r.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach(((u,m)=>l.set(u,m))),!(l.size()>=s)););return W.resolve(l)}bt(e,t,i){const s=this.overlays.get(i.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(i.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new fb(t,i));let r=this.Lr.get(t);r===void 0&&(r=we(),this.Lr.set(t,r)),this.Lr.set(t,r.add(i.key))}}class Xb{constructor(){this.sessionToken=ot.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,W.resolve()}}class zo{constructor(){this.kr=new et(it.Kr),this.qr=new et(it.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const i=new it(e,t);this.kr=this.kr.add(i),this.qr=this.qr.add(i)}$r(e,t){e.forEach((i=>this.addReference(i,t)))}removeReference(e,t){this.Wr(new it(e,t))}Qr(e,t){e.forEach((i=>this.removeReference(i,t)))}Gr(e){const t=new te(new De([])),i=new it(t,e),s=new it(t,e+1),r=[];return this.qr.forEachInRange([i,s],(o=>{this.Wr(o),r.push(o.key)})),r}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new te(new De([])),i=new it(t,e),s=new it(t,e+1);let r=we();return this.qr.forEachInRange([i,s],(o=>{r=r.add(o.key)})),r}containsKey(e){const t=new it(e,0),i=this.kr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class it{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return te.comparator(e.key,t.key)||be(e.Hr,t.Hr)}static Ur(e,t){return be(e.Hr,t.Hr)||te.comparator(e.key,t.key)}}class Zb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new et(it.Kr)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){const r=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new mb(r,t,i,s);this.mutationQueue.push(o);for(const l of s)this.Jr=this.Jr.add(new it(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return W.resolve(o)}lookupMutationBatch(e,t){return W.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,s=this.Xr(i),r=s<0?0:s;return W.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?Lo:this.Yn-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new it(t,0),s=new it(t,Number.POSITIVE_INFINITY),r=[];return this.Jr.forEachInRange([i,s],(o=>{const l=this.Zr(o.Hr);r.push(l)})),W.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new et(be);return t.forEach((s=>{const r=new it(s,0),o=new it(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([r,o],(l=>{i=i.add(l.Hr)}))})),W.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,s=i.length+1;let r=i;te.isDocumentKey(r)||(r=r.child(""));const o=new it(new te(r),0);let l=new et(be);return this.Jr.forEachWhile((d=>{const u=d.key.path;return!!i.isPrefixOf(u)&&(u.length===s&&(l=l.add(d.Hr)),!0)}),o),W.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((i=>{const s=this.Zr(i);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Se(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Jr;return W.forEach(t.mutations,(s=>{const r=new it(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=i}))}nr(e){}containsKey(e,t){const i=new it(t,0),s=this.Jr.firstAfterOrEqual(i);return W.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}class e0{constructor(e){this.ti=e,this.docs=(function(){return new Ve(te.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,s=this.docs.get(i),r=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return W.resolve(i?i.document.mutableCopy():mt.newInvalidDocument(t))}getEntries(e,t){let i=hn();return t.forEach((s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():mt.newInvalidDocument(s))})),W.resolve(i)}getDocumentsMatchingQuery(e,t,i,s){let r=hn();const o=t.path,l=new te(o.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(l);for(;d.hasNext();){const{key:u,value:{document:m}}=d.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||kv(Tv(m),i)<=0||(s.has(m.key)||Yr(t,m))&&(r=r.insert(m.key,m.mutableCopy()))}return W.resolve(r)}getAllFromCollectionGroup(e,t,i,s){re(9500)}ni(e,t){return W.forEach(this.docs,(i=>t(i)))}newChangeBuffer(e){return new t0(this)}getSize(e){return W.resolve(this.size)}}class t0 extends Gb{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((i,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(i)})),W.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}class n0{constructor(e){this.persistence=e,this.ri=new gi((t=>No(t)),Mo),this.lastRemoteSnapshotVersion=le.min(),this.highestTargetId=0,this.ii=0,this.si=new zo,this.targetCount=0,this.oi=Mi._r()}forEachTarget(e,t){return this.ri.forEach(((i,s)=>t(s))),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.ii&&(this.ii=t),W.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Mi(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,W.resolve()}updateTargetData(e,t){return this.lr(t),W.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,t,i){let s=0;const r=[];return this.ri.forEach(((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.ri.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),W.waitFor(r).next((()=>s))}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,t){const i=this.ri.get(t)||null;return W.resolve(i)}addMatchingKeys(e,t,i){return this.si.$r(t,i),W.resolve()}removeMatchingKeys(e,t,i){this.si.Qr(t,i);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach((o=>{r.push(s.markPotentiallyOrphaned(e,o))})),W.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),W.resolve()}getMatchingKeysForTargetId(e,t){const i=this.si.jr(t);return W.resolve(i)}containsKey(e,t){return W.resolve(this.si.containsKey(t))}}class Wp{constructor(e,t){this._i={},this.overlays={},this.ai=new Hr(0),this.ui=!1,this.ui=!0,this.ci=new Xb,this.referenceDelegate=e(this),this.li=new n0(this),this.indexManager=new Fb,this.remoteDocumentCache=(function(s){return new e0(s)})((i=>this.referenceDelegate.hi(i))),this.serializer=new Vb(t),this.Pi=new Yb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Jb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this._i[e.toKey()];return i||(i=new Zb(t,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,i){Z("MemoryPersistence","Starting transaction:",e);const s=new i0(this.ai.next());return this.referenceDelegate.Ti(),i(s).next((r=>this.referenceDelegate.Ii(s).next((()=>r)))).toPromise().then((r=>(s.raiseOnCommittedEvent(),r)))}Ei(e,t){return W.or(Object.values(this._i).map((i=>()=>i.containsKey(e,t))))}}class i0 extends Sv{constructor(e){super(),this.currentSequenceNumber=e}}class jo{constructor(e){this.persistence=e,this.Ri=new zo,this.Ai=null}static Vi(e){return new jo(e)}get di(){if(this.Ai)return this.Ai;throw re(60996)}addReference(e,t,i){return this.Ri.addReference(i,t),this.di.delete(i.toString()),W.resolve()}removeReference(e,t,i){return this.Ri.removeReference(i,t),this.di.add(i.toString()),W.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),W.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((r=>this.di.add(r.toString())))})).next((()=>i.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.di,(i=>{const s=te.fromPath(i);return this.mi(e,s).next((r=>{r||t.removeEntry(s,le.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((i=>{i?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return W.or([()=>W.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class $r{constructor(e,t){this.persistence=e,this.fi=new gi((i=>Rv(i.path)),((i,s)=>i.isEqual(s))),this.garbageCollector=Wb(this,t)}static Vi(e,t){return new $r(e,t)}Ti(){}Ii(e){return W.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((i=>t.next((s=>i+s))))}pr(e){let t=0;return this.mr(e,(i=>{t++})).next((()=>t))}mr(e,t){return W.forEach(this.fi,((i,s)=>this.wr(e,i,s).next((r=>r?W.resolve():t(s)))))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((l=>{l||(i++,r.removeEntry(o,le.min()))})))).next((()=>r.apply(e))).next((()=>i))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}removeReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=hr(e.data.value)),t}wr(e,t,i){return W.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return W.resolve(s!==void 0&&s>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}class qo{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.Ts=i,this.Is=s}static Es(e,t){let i=we(),s=we();for(const r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new qo(e,t.fromCache,i,s)}}class s0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}class r0{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Rm()?8:Cv(ft())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,i,s){const r={result:null};return this.gs(e,t).next((o=>{r.result=o})).next((()=>{if(!r.result)return this.ps(e,t,s,i).next((o=>{r.result=o}))})).next((()=>{if(r.result)return;const o=new s0;return this.ys(e,t,o).next((l=>{if(r.result=l,this.As)return this.ws(e,t,o,l.size)}))})).next((()=>r.result))}ws(e,t,i,s){return i.documentReadCount<this.Vs?(xi()<=ve.DEBUG&&Z("QueryEngine","SDK will not create cache indexes for query:",Ei(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),W.resolve()):(xi()<=ve.DEBUG&&Z("QueryEngine","Query:",Ei(t),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.ds*s?(xi()<=ve.DEBUG&&Z("QueryEngine","The SDK decides to create cache indexes for query:",Ei(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Jt(t))):W.resolve())}gs(e,t){if(nd(t))return W.resolve(null);let i=Jt(t);return this.indexManager.getIndexType(e,i).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Pr(t,null,"F"),i=Jt(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next((r=>{const o=we(...r);return this.fs.getDocuments(e,o).next((l=>this.indexManager.getMinOffset(e,i).next((d=>{const u=this.bs(t,l);return this.Ss(t,u,o,d.readTime)?this.gs(e,Pr(t,null,"F")):this.Ds(e,u,t,d)}))))})))))}ps(e,t,i,s){return nd(t)||s.isEqual(le.min())?W.resolve(null):this.fs.getDocuments(e,i).next((r=>{const o=this.bs(t,r);return this.Ss(t,o,i,s)?W.resolve(null):(xi()<=ve.DEBUG&&Z("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ei(t)),this.Ds(e,o,t,Iv(s,Es)).next((l=>l)))}))}bs(e,t){let i=new et(Ep(e));return t.forEach(((s,r)=>{Yr(e,r)&&(i=i.add(r))})),i}Ss(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}ys(e,t,i){return xi()<=ve.DEBUG&&Z("QueryEngine","Using full collection scan to execute query:",Ei(t)),this.fs.getDocumentsMatchingQuery(e,t,$n.min(),i)}Ds(e,t,i,s){return this.fs.getDocumentsMatchingQuery(e,i,s).next((r=>(t.forEach((o=>{r=r.insert(o.key,o)})),r)))}}const Ho="LocalStore",a0=3e8;class o0{constructor(e,t,i,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new Ve(be),this.Fs=new gi((r=>No(r)),Mo),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Qb(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function l0(n,e,t,i){return new o0(n,e,t,i)}async function Gp(n,e){const t=ue(n);return await t.persistence.runTransaction("Handle user change","readonly",(i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next((r=>(s=r,t.Os(e),t.mutationQueue.getAllMutationBatches(i)))).next((r=>{const o=[],l=[];let d=we();for(const u of s){o.push(u.batchId);for(const m of u.mutations)d=d.add(m.key)}for(const u of r){l.push(u.batchId);for(const m of u.mutations)d=d.add(m.key)}return t.localDocuments.getDocuments(i,d).next((u=>({Ns:u,removedBatchIds:o,addedBatchIds:l})))}))}))}function c0(n,e){const t=ue(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const s=e.batch.keys(),r=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,d,u,m){const b=u.batch,v=b.keys();let R=W.resolve();return v.forEach((D=>{R=R.next((()=>m.getEntry(d,D))).next((L=>{const _=u.docVersions.get(D);Se(_!==null,48541),L.version.compareTo(_)<0&&(b.applyToRemoteDocument(L,u),L.isValidDocument()&&(L.setReadTime(u.commitVersion),m.addEntry(L)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(d,b)))})(t,i,e,r).next((()=>r.apply(i))).next((()=>t.mutationQueue.performConsistencyCheck(i))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(l){let d=we();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(d=d.add(l.batch.mutations[u].key));return d})(e)))).next((()=>t.localDocuments.getDocuments(i,s)))}))}function Kp(n){const e=ue(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function d0(n,e){const t=ue(n),i=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(r=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const l=[];e.targetChanges.forEach(((m,b)=>{const v=s.get(b);if(!v)return;l.push(t.li.removeMatchingKeys(r,m.removedDocuments,b).next((()=>t.li.addMatchingKeys(r,m.addedDocuments,b))));let R=v.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(b)!==null?R=R.withResumeToken(ot.EMPTY_BYTE_STRING,le.min()).withLastLimboFreeSnapshotVersion(le.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,i)),s=s.insert(b,R),(function(L,_,A){return L.resumeToken.approximateByteSize()===0||_.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=a0?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0})(v,R,m)&&l.push(t.li.updateTargetData(r,R))}));let d=hn(),u=we();if(e.documentUpdates.forEach((m=>{e.resolvedLimboDocuments.has(m)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,m))})),l.push(u0(r,o,e.documentUpdates).next((m=>{d=m.Bs,u=m.Ls}))),!i.isEqual(le.min())){const m=t.li.getLastRemoteSnapshotVersion(r).next((b=>t.li.setTargetsMetadata(r,r.currentSequenceNumber,i)));l.push(m)}return W.waitFor(l).next((()=>o.apply(r))).next((()=>t.localDocuments.getLocalViewOfDocuments(r,d,u))).next((()=>d))})).then((r=>(t.vs=s,r)))}function u0(n,e,t){let i=we(),s=we();return t.forEach((r=>i=i.add(r))),e.getEntries(n,i).next((r=>{let o=hn();return t.forEach(((l,d)=>{const u=r.get(l);d.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(l)),d.isNoDocument()&&d.version.isEqual(le.min())?(e.removeEntry(l,d.readTime),o=o.insert(l,d)):!u.isValidDocument()||d.version.compareTo(u.version)>0||d.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(d),o=o.insert(l,d)):Z(Ho,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",d.version)})),{Bs:o,Ls:s}}))}function p0(n,e){const t=ue(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(i=>(e===void 0&&(e=Lo),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e))))}function h0(n,e){const t=ue(n);return t.persistence.runTransaction("Allocate target","readwrite",(i=>{let s;return t.li.getTargetData(i,e).next((r=>r?(s=r,W.resolve(s)):t.li.allocateTargetId(i).next((o=>(s=new Sn(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.li.addTargetData(i,s).next((()=>s)))))))})).then((i=>{const s=t.vs.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(i.targetId,i),t.Fs.set(e,i.targetId)),i}))}async function co(n,e,t){const i=ue(n),s=i.vs.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,(o=>i.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Ui(o))throw o;Z(Ho,`Failed to update sequence numbers for target ${e}: ${o}`)}i.vs=i.vs.remove(e),i.Fs.delete(s.target)}function fd(n,e,t){const i=ue(n);let s=le.min(),r=we();return i.persistence.runTransaction("Execute query","readwrite",(o=>(function(d,u,m){const b=ue(d),v=b.Fs.get(m);return v!==void 0?W.resolve(b.vs.get(v)):b.li.getTargetData(u,m)})(i,o,Jt(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(o,l.targetId).next((d=>{r=d}))})).next((()=>i.Cs.getDocumentsMatchingQuery(o,e,t?s:le.min(),t?r:we()))).next((l=>(m0(i,Zv(e),l),{documents:l,ks:r})))))}function m0(n,e,t){let i=n.Ms.get(e)||le.min();t.forEach(((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)})),n.Ms.set(e,i)}class gd{constructor(){this.activeTargetIds=rb()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class f0{constructor(){this.vo=new gd,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,i){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new gd,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}class g0{Mo(e){}shutdown(){}}const yd="ConnectivityMonitor";class vd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){Z(yd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){Z(yd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let sr=null;function uo(){return sr===null?sr=(function(){return 268435456+Math.round(2147483648*Math.random())})():sr++,"0x"+sr.toString(16)}const Da="RestConnection",y0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class v0{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${i}/databases/${s}`,this.$o=this.databaseId.database===Ar?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Wo(e,t,i,s,r){const o=uo(),l=this.Qo(e,t.toUriEncodedString());Z(Da,`Sending RPC '${e}' ${o}:`,l,i);const d={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(d,s,r);const{host:u}=new URL(l),m=Fn(u);return this.zo(e,l,d,i,m).then((b=>(Z(Da,`Received RPC '${e}' ${o}: `,b),b)),(b=>{throw li(Da,`RPC '${e}' ${o} failed with error: `,b,"url: ",l,"request:",i),b}))}jo(e,t,i,s,r,o){return this.Wo(e,t,i,s,r)}Go(e,t,i){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Bi})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,r)=>e[r]=s)),i&&i.headers.forEach(((s,r)=>e[r]=s))}Qo(e,t){const i=y0[e];let s=`${this.qo}/v1/${t}:${i}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}class b0{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}const ut="WebChannelConnection",ts=(n,e,t)=>{n.listen(e,(i=>{try{t(i)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Pi extends v0{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Pi.c_){const e=Zu();ts(e,Xu.STAT_EVENT,(t=>{t.stat===Xa.PROXY?Z(ut,"STAT_EVENT: detected buffering proxy"):t.stat===Xa.NOPROXY&&Z(ut,"STAT_EVENT: detected no buffering proxy")})),Pi.c_=!0}}zo(e,t,i,s,r){const o=uo();return new Promise(((l,d)=>{const u=new Yu;u.setWithCredentials(!0),u.listenOnce(Ju.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case pr.NO_ERROR:const b=u.getResponseJson();Z(ut,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(b)),l(b);break;case pr.TIMEOUT:Z(ut,`RPC '${e}' ${o} timed out`),d(new X(H.DEADLINE_EXCEEDED,"Request time out"));break;case pr.HTTP_ERROR:const v=u.getStatus();if(Z(ut,`RPC '${e}' ${o} failed with status:`,v,"response text:",u.getResponseText()),v>0){let R=u.getResponseJson();Array.isArray(R)&&(R=R[0]);const D=R?.error;if(D&&D.status&&D.message){const L=(function(A){const S=A.toLowerCase().replace(/_/g,"-");return Object.values(H).indexOf(S)>=0?S:H.UNKNOWN})(D.status);d(new X(L,D.message))}else d(new X(H.UNKNOWN,"Server responded with status "+u.getStatus()))}else d(new X(H.UNAVAILABLE,"Connection failed."));break;default:re(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{Z(ut,`RPC '${e}' ${o} completed.`)}}));const m=JSON.stringify(s);Z(ut,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",m,i,15)}))}T_(e,t,i){const s=uo(),r=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,i),l.encodeInitMessageHeaders=!0;const u=r.join("");Z(ut,`Creating RPC '${e}' stream ${s}: ${u}`,l);const m=o.createWebChannel(u,l);this.I_(m);let b=!1,v=!1;const R=new b0({Ho:D=>{v?Z(ut,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(b||(Z(ut,`Opening RPC '${e}' stream ${s} transport.`),m.open(),b=!0),Z(ut,`RPC '${e}' stream ${s} sending:`,D),m.send(D))},Jo:()=>m.close()});return ts(m,ls.EventType.OPEN,(()=>{v||(Z(ut,`RPC '${e}' stream ${s} transport opened.`),R.i_())})),ts(m,ls.EventType.CLOSE,(()=>{v||(v=!0,Z(ut,`RPC '${e}' stream ${s} transport closed`),R.o_(),this.E_(m))})),ts(m,ls.EventType.ERROR,(D=>{v||(v=!0,li(ut,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),R.o_(new X(H.UNAVAILABLE,"The operation could not be completed")))})),ts(m,ls.EventType.MESSAGE,(D=>{if(!v){const L=D.data[0];Se(!!L,16349);const _=L,A=_?.error||_[0]?.error;if(A){Z(ut,`RPC '${e}' stream ${s} received error:`,A);const S=A.status;let $=(function(k){const f=Ke[k];if(f!==void 0)return $p(f)})(S),C=A.message;S==="NOT_FOUND"&&C.includes("database")&&C.includes("does not exist")&&C.includes(this.databaseId.database)&&li(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),$===void 0&&($=H.INTERNAL,C="Unknown error status: "+S+" with message "+A.message),v=!0,R.o_(new X($,C)),m.close()}else Z(ut,`RPC '${e}' stream ${s} received:`,L),R.__(L)}})),Pi.u_(),setTimeout((()=>{R.s_()}),0),R}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,i){super.Go(e,t,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ep()}}function w0(n){return new Pi(n)}function $a(){return typeof document<"u"?document:null}function ea(n){return new Ib(n,!0)}Pi.c_=!1;class Qp{constructor(e,t,i=1e3,s=1.5,r=6e4){this.Ci=e,this.timerId=t,this.R_=i,this.A_=s,this.V_=r,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-i);s>0&&Z("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const bd="PersistentStream";class Yp{constructor(e,t,i,s,r,o,l,d){this.Ci=e,this.b_=i,this.S_=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=d,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Qp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===H.RESOURCE_EXHAUSTED?(pn(t.toString()),pn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===H.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,s])=>{this.D_===t&&this.G_(i,s)}),(i=>{e((()=>{const s=new X(H.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(s)}))}))}G_(e,t){const i=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{i((()=>this.listener.Zo()))})),this.stream.Yo((()=>{i((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{i((()=>this.z_(s)))})),this.stream.onMessage((s=>{i((()=>++this.F_==1?this.H_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return Z(bd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(Z(bd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class _0 extends Yp{constructor(e,t,i,s,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Ab(this.serializer,e),i=(function(r){if(!("targetChange"in r))return le.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?le.min():o.readTime?Xt(o.readTime):le.min()})(e);return this.listener.J_(t,i)}Z_(e){const t={};t.database=lo(this.serializer),t.addTarget=(function(r,o){let l;const d=o.target;if(l=io(d)?{documents:Pb(r,d)}:{query:Rb(r,d).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Op(r,o.resumeToken);const u=ro(r,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(le.min())>0){l.readTime=Dr(r,o.snapshotVersion.toTimestamp());const u=ro(r,o.expectedCount);u!==null&&(l.expectedCount=u)}return l})(this.serializer,e);const i=Db(this.serializer,e);i&&(t.labels=i),this.K_(t)}X_(e){const t={};t.database=lo(this.serializer),t.removeTarget=e,this.K_(t)}}class x0 extends Yp{constructor(e,t,i,s,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return Se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Cb(e.writeResults,e.commitTime),i=Xt(e.commitTime);return this.listener.na(i,t)}ra(){const e={};e.database=lo(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((i=>Sb(this.serializer,i)))};this.K_(t)}}class E0{}class I0 extends E0{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new X(H.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,o])=>this.connection.Wo(e,ao(t,i),s,r,o))).catch((r=>{throw r.name==="FirebaseError"?(r.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new X(H.UNKNOWN,r.toString())}))}jo(e,t,i,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.jo(e,ao(t,i),s,o,l,r))).catch((o=>{throw o.name==="FirebaseError"?(o.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(H.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function T0(n,e,t,i){return new I0(n,e,t,i)}class k0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(pn(t),this.aa=!1):Z("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const ci="RemoteStore";class A0{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=r,this.Aa.Mo((o=>{i.enqueueAndForget((async()=>{yi(this)&&(Z(ci,"Restarting streams for network reachability change."),await(async function(d){const u=ue(d);u.Ea.add(4),await Fs(u),u.Va.set("Unknown"),u.Ea.delete(4),await ta(u)})(this))}))})),this.Va=new k0(i,s)}}async function ta(n){if(yi(n))for(const e of n.Ra)await e(!0)}async function Fs(n){for(const e of n.Ra)await e(!1)}function Jp(n,e){const t=ue(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Qo(t)?Ko(t):ji(t).O_()&&Go(t,e))}function Wo(n,e){const t=ue(n),i=ji(t);t.Ia.delete(e),i.O_()&&Xp(t,e),t.Ia.size===0&&(i.O_()?i.L_():yi(t)&&t.Va.set("Unknown"))}function Go(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(le.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ji(n).Z_(e)}function Xp(n,e){n.da.$e(e),ji(n).X_(e)}function Ko(n){n.da=new wb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),ji(n).start(),n.Va.ua()}function Qo(n){return yi(n)&&!ji(n).x_()&&n.Ia.size>0}function yi(n){return ue(n).Ea.size===0}function Zp(n){n.da=void 0}async function S0(n){n.Va.set("Online")}async function C0(n){n.Ia.forEach(((e,t)=>{Go(n,e)}))}async function P0(n,e){Zp(n),Qo(n)?(n.Va.ha(e),Ko(n)):n.Va.set("Unknown")}async function R0(n,e,t){if(n.Va.set("Online"),e instanceof Mp&&e.state===2&&e.cause)try{await(async function(s,r){const o=r.cause;for(const l of r.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.Ia.delete(l),s.da.removeTarget(l))})(n,e)}catch(i){Z(ci,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Nr(n,i)}else if(e instanceof gr?n.da.Xe(e):e instanceof Np?n.da.st(e):n.da.tt(e),!t.isEqual(le.min()))try{const i=await Kp(n.localStore);t.compareTo(i)>=0&&await(function(r,o){const l=r.da.Tt(o);return l.targetChanges.forEach(((d,u)=>{if(d.resumeToken.approximateByteSize()>0){const m=r.Ia.get(u);m&&r.Ia.set(u,m.withResumeToken(d.resumeToken,o))}})),l.targetMismatches.forEach(((d,u)=>{const m=r.Ia.get(d);if(!m)return;r.Ia.set(d,m.withResumeToken(ot.EMPTY_BYTE_STRING,m.snapshotVersion)),Xp(r,d);const b=new Sn(m.target,d,u,m.sequenceNumber);Go(r,b)})),r.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(i){Z(ci,"Failed to raise snapshot:",i),await Nr(n,i)}}async function Nr(n,e,t){if(!Ui(e))throw e;n.Ea.add(1),await Fs(n),n.Va.set("Offline"),t||(t=()=>Kp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{Z(ci,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ta(n)}))}function eh(n,e){return e().catch((t=>Nr(n,t,e)))}async function na(n){const e=ue(n),t=Vn(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Lo;for(;L0(e);)try{const s=await p0(e.localStore,i);if(s===null){e.Ta.length===0&&t.L_();break}i=s.batchId,D0(e,s)}catch(s){await Nr(e,s)}th(e)&&nh(e)}function L0(n){return yi(n)&&n.Ta.length<10}function D0(n,e){n.Ta.push(e);const t=Vn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function th(n){return yi(n)&&!Vn(n).x_()&&n.Ta.length>0}function nh(n){Vn(n).start()}async function $0(n){Vn(n).ra()}async function N0(n){const e=Vn(n);for(const t of n.Ta)e.ea(t.mutations)}async function M0(n,e,t){const i=n.Ta.shift(),s=Bo.from(i,e,t);await eh(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await na(n)}async function O0(n,e){e&&Vn(n).Y_&&await(async function(i,s){if((function(o){return yb(o)&&o!==H.ABORTED})(s.code)){const r=i.Ta.shift();Vn(i).B_(),await eh(i,(()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s))),await na(i)}})(n,e),th(n)&&nh(n)}async function wd(n,e){const t=ue(n);t.asyncQueue.verifyOperationInProgress(),Z(ci,"RemoteStore received new credentials");const i=yi(t);t.Ea.add(3),await Fs(t),i&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ta(t)}async function V0(n,e){const t=ue(n);e?(t.Ea.delete(2),await ta(t)):e||(t.Ea.add(2),await Fs(t),t.Va.set("Unknown"))}function ji(n){return n.ma||(n.ma=(function(t,i,s){const r=ue(t);return r.sa(),new _0(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)})(n.datastore,n.asyncQueue,{Zo:S0.bind(null,n),Yo:C0.bind(null,n),t_:P0.bind(null,n),J_:R0.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Qo(n)?Ko(n):n.Va.set("Unknown")):(await n.ma.stop(),Zp(n))}))),n.ma}function Vn(n){return n.fa||(n.fa=(function(t,i,s){const r=ue(t);return r.sa(),new x0(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:$0.bind(null,n),t_:O0.bind(null,n),ta:N0.bind(null,n),na:M0.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await na(n)):(await n.fa.stop(),n.Ta.length>0&&(Z(ci,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class Yo{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new on,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,r){const o=Date.now()+i,l=new Yo(e,t,o,s,r);return l.start(i),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(H.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jo(n,e){if(pn("AsyncQueue",`${e}: ${n}`),Ui(n))return new X(H.UNAVAILABLE,`${e}: ${n}`);throw n}class Ri{static emptySet(e){return new Ri(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||te.comparator(t.key,i.key):(t,i)=>te.comparator(t.key,i.key),this.keyedMap=cs(),this.sortedSet=new Ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,i)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ri)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new Ri;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}class _d{constructor(){this.ga=new Ve(te.comparator)}track(e){const t=e.doc.key,i=this.ga.get(t);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(t,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(t):e.type===1&&i.type===2?this.ga=this.ga.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):re(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,i)=>{e.push(i)})),e}}class Oi{constructor(e,t,i,s,r,o,l,d,u){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=d,this.hasCachedResults=u}static fromInitialDocuments(e,t,i,s,r){const o=[];return t.forEach((l=>{o.push({type:0,doc:l})})),new Oi(e,t,Ri.emptySet(t),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}}class B0{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class F0{constructor(){this.queries=xd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,i){const s=ue(t),r=s.queries;s.queries=xd(),r.forEach(((o,l)=>{for(const d of l.ba)d.onError(i)}))})(this,new X(H.ABORTED,"Firestore shutting down"))}}function xd(){return new gi((n=>xp(n)),Qr)}async function Xo(n,e){const t=ue(n);let i=3;const s=e.query;let r=t.queries.get(s);r?!r.Sa()&&e.Da()&&(i=2):(r=new B0,i=e.Da()?0:1);try{switch(i){case 0:r.wa=await t.onListen(s,!0);break;case 1:r.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const l=Jo(o,`Initialization of query '${Ei(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,r),r.ba.push(e),e.va(t.onlineState),r.wa&&e.Fa(r.wa)&&el(t)}async function Zo(n,e){const t=ue(n),i=e.query;let s=3;const r=t.queries.get(i);if(r){const o=r.ba.indexOf(e);o>=0&&(r.ba.splice(o,1),r.ba.length===0?s=e.Da()?0:1:!r.Sa()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function U0(n,e){const t=ue(n);let i=!1;for(const s of e){const r=s.query,o=t.queries.get(r);if(o){for(const l of o.ba)l.Fa(s)&&(i=!0);o.wa=s}}i&&el(t)}function z0(n,e,t){const i=ue(n),s=i.queries.get(e);if(s)for(const r of s.ba)r.onError(t);i.queries.delete(e)}function el(n){n.Ca.forEach((e=>{e.next()}))}var po,Ed;(Ed=po||(po={})).Ma="default",Ed.Cache="cache";class tl{constructor(e,t,i){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const s of e.docChanges)s.type!==3&&i.push(s);e=new Oi(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const i=t!=="Offline";return(!this.options.Ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Oi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==po.Cache}}class ih{constructor(e){this.key=e}}class sh{constructor(e){this.key=e}}class j0{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=we(),this.mutatedKeys=we(),this.eu=Ep(e),this.tu=new Ri(this.eu)}get nu(){return this.Za}ru(e,t){const i=t?t.iu:new _d,s=t?t.tu:this.tu;let r=t?t.mutatedKeys:this.mutatedKeys,o=s,l=!1;const d=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((m,b)=>{const v=s.get(m),R=Yr(this.query,b)?b:null,D=!!v&&this.mutatedKeys.has(v.key),L=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let _=!1;v&&R?v.data.isEqual(R.data)?D!==L&&(i.track({type:3,doc:R}),_=!0):this.su(v,R)||(i.track({type:2,doc:R}),_=!0,(d&&this.eu(R,d)>0||u&&this.eu(R,u)<0)&&(l=!0)):!v&&R?(i.track({type:0,doc:R}),_=!0):v&&!R&&(i.track({type:1,doc:v}),_=!0,(d||u)&&(l=!0)),_&&(R?(o=o.add(R),r=L?r.add(m):r.delete(m)):(o=o.delete(m),r=r.delete(m)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const m=this.query.limitType==="F"?o.last():o.first();o=o.delete(m.key),r=r.delete(m.key),i.track({type:1,doc:m})}return{tu:o,iu:i,Ss:l,mutatedKeys:r}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,s){const r=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((m,b)=>(function(R,D){const L=_=>{switch(_){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re(20277,{Vt:_})}};return L(R)-L(D)})(m.type,b.type)||this.eu(m.doc,b.doc))),this.ou(i),s=s??!1;const l=t&&!s?this._u():[],d=this.Ya.size===0&&this.current&&!s?1:0,u=d!==this.Xa;return this.Xa=d,o.length!==0||u?{snapshot:new Oi(this.query,e.tu,r,o,e.mutatedKeys,d===0,u,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new _d,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=we(),this.tu.forEach((i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))}));const t=[];return e.forEach((i=>{this.Ya.has(i)||t.push(new sh(i))})),this.Ya.forEach((i=>{e.has(i)||t.push(new ih(i))})),t}cu(e){this.Za=e.ks,this.Ya=we();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Oi.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const nl="SyncEngine";class q0{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class H0{constructor(e){this.key=e,this.hu=!1}}class W0{constructor(e,t,i,s,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new gi((l=>xp(l)),Qr),this.Iu=new Map,this.Eu=new Set,this.Ru=new Ve(te.comparator),this.Au=new Map,this.Vu=new zo,this.du={},this.mu=new Map,this.fu=Mi.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function G0(n,e,t=!0){const i=dh(n);let s;const r=i.Tu.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.lu()):s=await rh(i,e,t,!0),s}async function K0(n,e){const t=dh(n);await rh(t,e,!0,!1)}async function rh(n,e,t,i){const s=await h0(n.localStore,Jt(e)),r=s.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let l;return i&&(l=await Q0(n,e,r,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Jp(n.remoteStore,s),l}async function Q0(n,e,t,i,s){n.pu=(b,v,R)=>(async function(L,_,A,S){let $=_.view.ru(A);$.Ss&&($=await fd(L.localStore,_.query,!1).then((({documents:f})=>_.view.ru(f,$))));const C=S&&S.targetChanges.get(_.targetId),T=S&&S.targetMismatches.get(_.targetId)!=null,k=_.view.applyChanges($,L.isPrimaryClient,C,T);return Td(L,_.targetId,k.au),k.snapshot})(n,b,v,R);const r=await fd(n.localStore,e,!0),o=new j0(e,r.ks),l=o.ru(r.documents),d=Bs.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),u=o.applyChanges(l,n.isPrimaryClient,d);Td(n,t,u.au);const m=new q0(e,t,o);return n.Tu.set(e,m),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function Y0(n,e,t){const i=ue(n),s=i.Tu.get(e),r=i.Iu.get(s.targetId);if(r.length>1)return i.Iu.set(s.targetId,r.filter((o=>!Qr(o,e)))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await co(i.localStore,s.targetId,!1).then((()=>{i.sharedClientState.clearQueryState(s.targetId),t&&Wo(i.remoteStore,s.targetId),ho(i,s.targetId)})).catch(Fi)):(ho(i,s.targetId),await co(i.localStore,s.targetId,!0))}async function J0(n,e){const t=ue(n),i=t.Tu.get(e),s=t.Iu.get(i.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Wo(t.remoteStore,i.targetId))}async function X0(n,e,t){const i=rw(n);try{const s=await(function(o,l){const d=ue(o),u=ye.now(),m=l.reduce(((R,D)=>R.add(D.key)),we());let b,v;return d.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let D=hn(),L=we();return d.xs.getEntries(R,m).next((_=>{D=_,D.forEach(((A,S)=>{S.isValidDocument()||(L=L.add(A))}))})).next((()=>d.localDocuments.getOverlayedDocuments(R,D))).next((_=>{b=_;const A=[];for(const S of l){const $=pb(S,b.get(S.key).overlayedDocument);$!=null&&A.push(new qn(S.key,$,mp($.value.mapValue),Lt.exists(!0)))}return d.mutationQueue.addMutationBatch(R,u,A,l)})).next((_=>{v=_;const A=_.applyToLocalDocumentSet(b,L);return d.documentOverlayCache.saveOverlays(R,_.batchId,A)}))})).then((()=>({batchId:v.batchId,changes:Tp(b)})))})(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),(function(o,l,d){let u=o.du[o.currentUser.toKey()];u||(u=new Ve(be)),u=u.insert(l,d),o.du[o.currentUser.toKey()]=u})(i,s.batchId,t),await Us(i,s.changes),await na(i.remoteStore)}catch(s){const r=Jo(s,"Failed to persist write");t.reject(r)}}async function ah(n,e){const t=ue(n);try{const i=await d0(t.localStore,e);e.targetChanges.forEach(((s,r)=>{const o=t.Au.get(r);o&&(Se(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Se(o.hu,14607):s.removedDocuments.size>0&&(Se(o.hu,42227),o.hu=!1))})),await Us(t,i,e)}catch(i){await Fi(i)}}function Id(n,e,t){const i=ue(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const s=[];i.Tu.forEach(((r,o)=>{const l=o.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(o,l){const d=ue(o);d.onlineState=l;let u=!1;d.queries.forEach(((m,b)=>{for(const v of b.ba)v.va(l)&&(u=!0)})),u&&el(d)})(i.eventManager,e),s.length&&i.Pu.J_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Z0(n,e,t){const i=ue(n);i.sharedClientState.updateQueryState(e,"rejected",t);const s=i.Au.get(e),r=s&&s.key;if(r){let o=new Ve(te.comparator);o=o.insert(r,mt.newNoDocument(r,le.min()));const l=we().add(r),d=new Zr(le.min(),new Map,new Ve(be),o,l);await ah(i,d),i.Ru=i.Ru.remove(r),i.Au.delete(e),il(i)}else await co(i.localStore,e,!1).then((()=>ho(i,e,t))).catch(Fi)}async function ew(n,e){const t=ue(n),i=e.batch.batchId;try{const s=await c0(t.localStore,e);lh(t,i,null),oh(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await Us(t,s)}catch(s){await Fi(s)}}async function tw(n,e,t){const i=ue(n);try{const s=await(function(o,l){const d=ue(o);return d.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let m;return d.mutationQueue.lookupMutationBatch(u,l).next((b=>(Se(b!==null,37113),m=b.keys(),d.mutationQueue.removeMutationBatch(u,b)))).next((()=>d.mutationQueue.performConsistencyCheck(u))).next((()=>d.documentOverlayCache.removeOverlaysForBatchId(u,m,l))).next((()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,m))).next((()=>d.localDocuments.getDocuments(u,m)))}))})(i.localStore,e);lh(i,e,t),oh(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await Us(i,s)}catch(s){await Fi(s)}}function oh(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function lh(n,e,t){const i=ue(n);let s=i.du[i.currentUser.toKey()];if(s){const r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),i.du[i.currentUser.toKey()]=s}}function ho(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Iu.get(e))n.Tu.delete(i),t&&n.Pu.yu(i,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((i=>{n.Vu.containsKey(i)||ch(n,i)}))}function ch(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Wo(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),il(n))}function Td(n,e,t){for(const i of t)i instanceof ih?(n.Vu.addReference(i.key,e),nw(n,i)):i instanceof sh?(Z(nl,"Document no longer in limbo: "+i.key),n.Vu.removeReference(i.key,e),n.Vu.containsKey(i.key)||ch(n,i.key)):re(19791,{wu:i})}function nw(n,e){const t=e.key,i=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(i)||(Z(nl,"New document in limbo: "+t),n.Eu.add(i),il(n))}function il(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new te(De.fromString(e)),i=n.fu.next();n.Au.set(i,new H0(t)),n.Ru=n.Ru.insert(t,i),Jp(n.remoteStore,new Sn(Jt(Kr(t.path)),i,"TargetPurposeLimboResolution",Hr.ce))}}async function Us(n,e,t){const i=ue(n),s=[],r=[],o=[];i.Tu.isEmpty()||(i.Tu.forEach(((l,d)=>{o.push(i.pu(d,e,t).then((u=>{if((u||t)&&i.isPrimaryClient){const m=u?!u.fromCache:t?.targetChanges.get(d.targetId)?.current;i.sharedClientState.updateQueryState(d.targetId,m?"current":"not-current")}if(u){s.push(u);const m=qo.Es(d.targetId,u);r.push(m)}})))})),await Promise.all(o),i.Pu.J_(s),await(async function(d,u){const m=ue(d);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(b=>W.forEach(u,(v=>W.forEach(v.Ts,(R=>m.persistence.referenceDelegate.addReference(b,v.targetId,R))).next((()=>W.forEach(v.Is,(R=>m.persistence.referenceDelegate.removeReference(b,v.targetId,R)))))))))}catch(b){if(!Ui(b))throw b;Z(Ho,"Failed to update sequence numbers: "+b)}for(const b of u){const v=b.targetId;if(!b.fromCache){const R=m.vs.get(v),D=R.snapshotVersion,L=R.withLastLimboFreeSnapshotVersion(D);m.vs=m.vs.insert(v,L)}}})(i.localStore,r))}async function iw(n,e){const t=ue(n);if(!t.currentUser.isEqual(e)){Z(nl,"User change. New user:",e.toKey());const i=await Gp(t.localStore,e);t.currentUser=e,(function(r,o){r.mu.forEach((l=>{l.forEach((d=>{d.reject(new X(H.CANCELLED,o))}))})),r.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Us(t,i.Ns)}}function sw(n,e){const t=ue(n),i=t.Au.get(e);if(i&&i.hu)return we().add(i.key);{let s=we();const r=t.Iu.get(e);if(!r)return s;for(const o of r){const l=t.Tu.get(o);s=s.unionWith(l.view.nu)}return s}}function dh(n){const e=ue(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ah.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=sw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Z0.bind(null,e),e.Pu.J_=U0.bind(null,e.eventManager),e.Pu.yu=z0.bind(null,e.eventManager),e}function rw(n){const e=ue(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ew.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=tw.bind(null,e),e}class Mr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ea(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return l0(this.persistence,new r0,e.initialUser,this.serializer)}Cu(e){return new Wp(jo.Vi,this.serializer)}Du(e){return new f0}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mr.provider={build:()=>new Mr};class aw extends Mr{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Se(this.persistence.referenceDelegate instanceof $r,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new qb(i,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?_t.withCacheSize(this.cacheSizeBytes):_t.DEFAULT;return new Wp((i=>$r.Vi(i,t)),this.serializer)}}class mo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Id(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=iw.bind(null,this.syncEngine),await V0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new F0})()}createDatastore(e){const t=ea(e.databaseInfo.databaseId),i=w0(e.databaseInfo);return T0(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return(function(i,s,r,o,l){return new A0(i,s,r,o,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Id(this.syncEngine,t,0)),(function(){return vd.v()?new vd:new g0})())}createSyncEngine(e,t){return(function(s,r,o,l,d,u,m){const b=new W0(s,r,o,l,d,u);return m&&(b.gu=!0),b})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const i=ue(t);Z(ci,"RemoteStore shutting down."),i.Ea.add(5),await Fs(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}mo.provider={build:()=>new mo};class sl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):pn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}const Bn="FirestoreClient";class ow{constructor(e,t,i,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this._databaseInfo=s,this.user=pt.UNAUTHENTICATED,this.clientId=Ro.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,(async o=>{Z(Bn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(i,(o=>(Z(Bn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new on;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Jo(t,"Failed to shutdown persistence");e.reject(i)}})),e.promise}}async function Na(n,e){n.asyncQueue.verifyOperationInProgress(),Z(Bn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener((async s=>{i.isEqual(s)||(await Gp(e.localStore,s),i=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function kd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await lw(n);Z(Bn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((i=>wd(e.remoteStore,i))),n.setAppCheckTokenChangeListener(((i,s)=>wd(e.remoteStore,s))),n._onlineComponents=e}async function lw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Z(Bn,"Using user provided OfflineComponentProvider");try{await Na(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===H.FAILED_PRECONDITION||s.code===H.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;li("Error using user provided cache. Falling back to memory cache: "+t),await Na(n,new Mr)}}else Z(Bn,"Using default OfflineComponentProvider"),await Na(n,new aw(void 0));return n._offlineComponents}async function uh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Z(Bn,"Using user provided OnlineComponentProvider"),await kd(n,n._uninitializedComponentsProvider._online)):(Z(Bn,"Using default OnlineComponentProvider"),await kd(n,new mo))),n._onlineComponents}function cw(n){return uh(n).then((e=>e.syncEngine))}async function Or(n){const e=await uh(n),t=e.eventManager;return t.onListen=G0.bind(null,e.syncEngine),t.onUnlisten=Y0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=K0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=J0.bind(null,e.syncEngine),t}function dw(n,e,t,i){const s=new sl(i),r=new tl(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>Xo(await Or(n),r))),()=>{s.Nu(),n.asyncQueue.enqueueAndForget((async()=>Zo(await Or(n),r)))}}function uw(n,e,t={}){const i=new on;return n.asyncQueue.enqueueAndForget((async()=>(function(r,o,l,d,u){const m=new sl({next:v=>{m.Nu(),o.enqueueAndForget((()=>Zo(r,b)));const R=v.docs.has(l);!R&&v.fromCache?u.reject(new X(H.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&v.fromCache&&d&&d.source==="server"?u.reject(new X(H.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(v)},error:v=>u.reject(v)}),b=new tl(Kr(l.path),m,{includeMetadataChanges:!0,Ka:!0});return Xo(r,b)})(await Or(n),n.asyncQueue,e,t,i))),i.promise}function pw(n,e,t={}){const i=new on;return n.asyncQueue.enqueueAndForget((async()=>(function(r,o,l,d,u){const m=new sl({next:v=>{m.Nu(),o.enqueueAndForget((()=>Zo(r,b))),v.fromCache&&d.source==="server"?u.reject(new X(H.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(v)},error:v=>u.reject(v)}),b=new tl(l,m,{includeMetadataChanges:!0,Ka:!0});return Xo(r,b)})(await Or(n),n.asyncQueue,e,t,i))),i.promise}function hw(n,e){const t=new on;return n.asyncQueue.enqueueAndForget((async()=>X0(await cw(n),e,t))),t.promise}function ph(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}const mw="ComponentProvider",Ad=new Map;function fw(n,e,t,i,s){return new $v(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ph(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,i)}const hh="firestore.googleapis.com",Sd=!0;class Cd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new X(H.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hh,this.ssl=Sd}else this.host=e.host,this.ssl=e.ssl??Sd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Hp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zb)throw new X(H.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ev("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ph(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,s){return i.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ia{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(H.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(H.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new hv;switch(i.type){case"firstParty":return new yv(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new X(H.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=Ad.get(t);i&&(Z(mw,"Removing Datastore"),Ad.delete(t),i.terminate())})(this),Promise.resolve()}}function gw(n,e,t,i={}){n=Et(n,ia);const s=Fn(e),r=n._getSettings(),o={...r,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(go(`https://${l}`),yo("Firestore",!0)),r.host!==hh&&r.host!==l&&li("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d={...r,host:l,ssl:s,emulatorOptions:i};if(!ii(d,o)&&(n._setSettings(d),i.mockUserToken)){let u,m;if(typeof i.mockUserToken=="string")u=i.mockUserToken,m=pt.MOCK_USER;else{u=cu(i.mockUserToken,n._app?.options.projectId);const b=i.mockUserToken.sub||i.mockUserToken.user_id;if(!b)throw new X(H.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new pt(b)}n._authCredentials=new mv(new np(u,m))}}class fn{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new fn(this.firestore,e,this._query)}}class Ue{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ln(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}toJSON(){return{type:Ue._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(Os(t,Ue._jsonSchema))return new Ue(e,i||null,new te(De.fromString(t.referencePath)))}}Ue._jsonSchemaVersion="firestore/documentReference/1.0",Ue._jsonSchema={type:Je("string",Ue._jsonSchemaVersion),referencePath:Je("string")};class Ln extends fn{constructor(e,t,i){super(e,t,Kr(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new te(e))}withConverter(e){return new Ln(this.firestore,e,this._path)}}function di(n,e,...t){if(n=Oe(n),ip("collection","path",e),n instanceof ia){const i=De.fromString(e,...t);return zc(i),new Ln(n,null,i)}{if(!(n instanceof Ue||n instanceof Ln))throw new X(H.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(De.fromString(e,...t));return zc(i),new Ln(n.firestore,null,i)}}function us(n,e,...t){if(n=Oe(n),arguments.length===1&&(e=Ro.newId()),ip("doc","path",e),n instanceof ia){const i=De.fromString(e,...t);return Uc(i),new Ue(n,null,new te(i))}{if(!(n instanceof Ue||n instanceof Ln))throw new X(H.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(De.fromString(e,...t));return Uc(i),new Ue(n.firestore,n instanceof Ln?n.converter:null,new te(i))}}const Pd="AsyncQueue";class Rd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Qp(this,"async_queue_retry"),this._c=()=>{const i=$a();i&&Z(Pd,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=$a();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=$a();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new on;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Ui(e))throw e;Z(Pd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,pn("INTERNAL UNHANDLED ERROR: ",Ld(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Yo.createAndSchedule(this,e,t,i,(r=>this.hc(r)));return this.tc.push(s),s}uc(){this.nc&&re(47125,{Pc:Ld(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Ld(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class mn extends ia{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new Rd,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Rd(e),this._firestoreClient=void 0,await e}}}function yw(n,e){const t=typeof n=="object"?n:_o(),i=typeof n=="string"?n:Ar,s=Fr(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=au("firestore");r&&gw(s,...r)}return s}function sa(n){if(n._terminated)throw new X(H.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||vw(n),n._firestoreClient}function vw(n){const e=n._freezeSettings(),t=fw(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new ow(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const r=s?._online.build();return{_offline:s?._offline.build(r),_online:r}})(n._componentsProvider))}class Rt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Rt(ot.fromBase64String(e))}catch(t){throw new X(H.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Rt(ot.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Os(e,Rt._jsonSchema))return Rt.fromBase64String(e.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:Je("string",Rt._jsonSchemaVersion),bytes:Je("string")};class rl{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new X(H.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}class al{constructor(e){this._methodName=e}}class Zt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new X(H.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new X(H.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return be(this._lat,e._lat)||be(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Zt._jsonSchemaVersion}}static fromJSON(e){if(Os(e,Zt._jsonSchema))return new Zt(e.latitude,e.longitude)}}Zt._jsonSchemaVersion="firestore/geoPoint/1.0",Zt._jsonSchema={type:Je("string",Zt._jsonSchemaVersion),latitude:Je("number"),longitude:Je("number")};class Bt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Os(e,Bt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Bt(e.vectorValues);throw new X(H.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Bt._jsonSchemaVersion="firestore/vectorValue/1.0",Bt._jsonSchema={type:Je("string",Bt._jsonSchemaVersion),vectorValues:Je("object")};const bw=/^__.*__$/;class ww{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new qn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vs(e,this.data,t,this.fieldTransforms)}}class mh{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new qn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function fh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re(40011,{dataSource:n})}}class ol{constructor(e,t,i,s,r,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.validatePath(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ol({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePathSegment(e),i}childContextForFieldPath(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePath(),i}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Vr(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(fh(this.dataSource)&&bw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class _w{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||ea(e)}createContext(e,t,i,s=!1){return new ol({dataSource:e,methodName:t,targetDoc:i,path:at.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ra(n){const e=n._freezeSettings(),t=ea(n._databaseId);return new _w(n._databaseId,!!e.ignoreUndefinedProperties,t)}function gh(n,e,t,i,s,r={}){const o=n.createContext(r.merge||r.mergeFields?2:0,e,t,s);ll("Data must be an object, but it was:",o,i);const l=yh(i,o);let d,u;if(r.merge)d=new Ct(o.fieldMask),u=o.fieldTransforms;else if(r.mergeFields){const m=[];for(const b of r.mergeFields){const v=ui(e,b,t);if(!o.contains(v))throw new X(H.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);wh(m,v)||m.push(v)}d=new Ct(m),u=o.fieldTransforms.filter((b=>d.covers(b.field)))}else d=null,u=o.fieldTransforms;return new ww(new xt(l),d,u)}class aa extends al{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof aa}}function xw(n,e,t,i){const s=n.createContext(1,e,t);ll("Data must be an object, but it was:",s,i);const r=[],o=xt.empty();jn(i,((d,u)=>{const m=bh(e,d,t);u=Oe(u);const b=s.childContextForFieldPath(m);if(u instanceof aa)r.push(m);else{const v=zs(u,b);v!=null&&(r.push(m),o.set(m,v))}}));const l=new Ct(r);return new mh(o,l,s.fieldTransforms)}function Ew(n,e,t,i,s,r){const o=n.createContext(1,e,t),l=[ui(e,i,t)],d=[s];if(r.length%2!=0)throw new X(H.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<r.length;v+=2)l.push(ui(e,r[v])),d.push(r[v+1]);const u=[],m=xt.empty();for(let v=l.length-1;v>=0;--v)if(!wh(u,l[v])){const R=l[v];let D=d[v];D=Oe(D);const L=o.childContextForFieldPath(R);if(D instanceof aa)u.push(R);else{const _=zs(D,L);_!=null&&(u.push(R),m.set(R,_))}}const b=new Ct(u);return new mh(m,b,o.fieldTransforms)}function Iw(n,e,t,i=!1){return zs(t,n.createContext(i?4:3,e))}function zs(n,e){if(vh(n=Oe(n)))return ll("Unsupported field value:",e,n),yh(n,e);if(n instanceof al)return(function(i,s){if(!fh(s.dataSource))throw s.createError(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(i,s){const r=[];let o=0;for(const l of i){let d=zs(l,s.childContextForArray(o));d==null&&(d={nullValue:"NULL_VALUE"}),r.push(d),o++}return{arrayValue:{values:r}}})(n,e)}return(function(i,s){if((i=Oe(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return ab(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=ye.fromDate(i);return{timestampValue:Dr(s.serializer,r)}}if(i instanceof ye){const r=new ye(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:Dr(s.serializer,r)}}if(i instanceof Zt)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Rt)return{bytesValue:Op(s.serializer,i._byteString)};if(i instanceof Ue){const r=s.databaseId,o=i.firestore._databaseId;if(!o.isEqual(r))throw s.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Uo(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof Bt)return(function(o,l){const d=o instanceof Bt?o.toArray():o;return{mapValue:{fields:{[pp]:{stringValue:hp},[Sr]:{arrayValue:{values:d.map((m=>{if(typeof m!="number")throw l.createError("VectorValues must only contain numeric values.");return Oo(l.serializer,m)}))}}}}}})(i,s);if(qp(i))return i._toProto(s.serializer);throw s.createError(`Unsupported field value: ${qr(i)}`)})(n,e)}function yh(n,e){const t={};return ap(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jn(n,((i,s)=>{const r=zs(s,e.childContextForField(i));r!=null&&(t[i]=r)})),{mapValue:{fields:t}}}function vh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ye||n instanceof Zt||n instanceof Rt||n instanceof Ue||n instanceof al||n instanceof Bt||qp(n))}function ll(n,e,t){if(!vh(t)||!sp(t)){const i=qr(t);throw i==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+i)}}function ui(n,e,t){if((e=Oe(e))instanceof rl)return e._internalPath;if(typeof e=="string")return bh(n,e);throw Vr("Field path arguments must be of type string or ",n,!1,void 0,t)}const Tw=new RegExp("[~\\*/\\[\\]]");function bh(n,e,t){if(e.search(Tw)>=0)throw Vr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new rl(...e.split("."))._internalPath}catch{throw Vr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Vr(n,e,t,i,s){const r=i&&!i.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let d="";return(r||o)&&(d+=" (found",r&&(d+=` in field ${i}`),o&&(d+=` in document ${s}`),d+=")"),new X(H.INVALID_ARGUMENT,l+n+d)}function wh(n,e){return n.some((t=>t.isEqual(e)))}class kw{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return He(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Mn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw re(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return jn(e,((s,r)=>{i[s]=this.convertValue(r,t)})),i}convertVectorValue(e){const t=e.fields?.[Sr].arrayValue?.values?.map((i=>He(i.doubleValue)));return new Bt(t)}convertGeoPoint(e){return new Zt(He(e.latitude),He(e.longitude))}convertArray(e,t){return(e.values||[]).map((i=>this.convertValue(i,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const i=Gr(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Is(e));default:return null}}convertTimestamp(e){const t=Nn(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=De.fromString(e);Se(jp(i),9688,{name:e});const s=new Ts(i.get(1),i.get(3)),r=new te(i.popFirst(5));return s.isEqual(t)||pn(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}class cl extends kw{constructor(e){super(),this.firestore=e}convertBytes(e){return new Rt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ue(this.firestore,null,t)}}const Dd="@firebase/firestore",$d="4.11.0";function Nd(n){return(function(t,i){if(typeof t!="object"||t===null)return!1;const s=t;for(const r of i)if(r in s&&typeof s[r]=="function")return!0;return!1})(n,["next","error","complete"])}class _h{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Aw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(ui("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Aw extends _h{data(){return super.data()}}function xh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new X(H.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class dl{}class ul extends dl{}function pi(n,e,...t){let i=[];e instanceof dl&&i.push(e),i=i.concat(t),(function(r){const o=r.filter((d=>d instanceof pl)).length,l=r.filter((d=>d instanceof oa)).length;if(o>1||o>0&&l>0)throw new X(H.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(i);for(const s of i)n=s._apply(n);return n}class oa extends ul{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new oa(e,t,i)}_apply(e){const t=this._parse(e);return Eh(e._query,t),new fn(e.firestore,e.converter,so(e._query,t))}_parse(e){const t=ra(e.firestore);return(function(r,o,l,d,u,m,b){let v;if(u.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new X(H.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Od(b,m);const D=[];for(const L of b)D.push(Md(d,r,L));v={arrayValue:{values:D}}}else v=Md(d,r,b)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Od(b,m),v=Iw(l,o,b,m==="in"||m==="not-in");return Qe.create(u,m,v)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Xn(n,e,t){const i=e,s=ui("where",n);return oa._create(s,i,t)}class pl extends dl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new pl(e,t)}_parse(e){const t=this._queryConstraints.map((i=>i._parse(e))).filter((i=>i.getFilters().length>0));return t.length===1?t[0]:Ut.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,r){let o=s;const l=r.getFlattenedFilters();for(const d of l)Eh(o,d),o=so(o,d)})(e._query,t),new fn(e.firestore,e.converter,so(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class hl extends ul{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new hl(e,t)}_apply(e){const t=(function(s,r,o){if(s.startAt!==null)throw new X(H.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new X(H.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new As(r,o)})(e._query,this._field,this._direction);return new fn(e.firestore,e.converter,Xv(e._query,t))}}function Sw(n,e="asc"){const t=e,i=ui("orderBy",n);return hl._create(i,t)}class ml extends ul{constructor(e,t,i){super(),this.type=e,this._limit=t,this._limitType=i}static _create(e,t,i){return new ml(e,t,i)}_apply(e){return new fn(e.firestore,e.converter,Pr(e._query,this._limit,this._limitType))}}function Cw(n){return ml._create("limit",n,"F")}function Md(n,e,t){if(typeof(t=Oe(t))=="string"){if(t==="")throw new X(H.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_p(e)&&t.indexOf("/")!==-1)throw new X(H.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(De.fromString(t));if(!te.isDocumentKey(i))throw new X(H.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Yc(n,new te(i))}if(t instanceof Ue)return Yc(n,t._key);throw new X(H.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qr(t)}.`)}function Od(n,e){if(!Array.isArray(n)||n.length===0)throw new X(H.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Eh(n,e){const t=(function(s,r){for(const o of s)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new X(H.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new X(H.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Ih(n,e,t){let i;return i=n?n.toFirestore(e):e,i}class ps{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zn extends _h{constructor(e,t,i,s,r,o){super(e,t,i,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new yr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(ui("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new X(H.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Zn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Zn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Zn._jsonSchema={type:Je("string",Zn._jsonSchemaVersion),bundleSource:Je("string","DocumentSnapshot"),bundleName:Je("string"),bundle:Je("string")};class yr extends Zn{data(e={}){return super.data(e)}}class ei{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ps(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new yr(this._firestore,this._userDataWriter,i.key,i,new ps(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new X(H.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,r){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((l=>{const d=new yr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ps(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:d,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>r||l.type!==3)).map((l=>{const d=new yr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ps(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,m=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),m=o.indexOf(l.doc.key)),{type:Pw(l.type),doc:d,oldIndex:u,newIndex:m}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new X(H.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ei._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ro.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],s=[];return this.docs.forEach((r=>{r._document!==null&&(t.push(r._document),i.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),s.push(r.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Pw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re(61501,{type:n})}}ei._jsonSchemaVersion="firestore/querySnapshot/1.0",ei._jsonSchema={type:Je("string",ei._jsonSchemaVersion),bundleSource:Je("string","QuerySnapshot"),bundleName:Je("string"),bundle:Je("string")};function Rw(n){n=Et(n,Ue);const e=Et(n.firestore,mn),t=sa(e);return uw(t,n._key).then((i=>Th(e,n,i)))}function Lw(n){n=Et(n,fn);const e=Et(n.firestore,mn),t=sa(e),i=new cl(e);return xh(n._query),pw(t,n._query).then((s=>new ei(e,i,n,s)))}function Dw(n,e,t){n=Et(n,Ue);const i=Et(n.firestore,mn),s=Ih(n.converter,e),r=ra(i);return la(i,[gh(r,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Lt.none())])}function $w(n,e,t,...i){n=Et(n,Ue);const s=Et(n.firestore,mn),r=ra(s);let o;return o=typeof(e=Oe(e))=="string"||e instanceof rl?Ew(r,"updateDoc",n._key,e,t,i):xw(r,"updateDoc",n._key,e),la(s,[o.toMutation(n._key,Lt.exists(!0))])}function Nw(n){return la(Et(n.firestore,mn),[new Vo(n._key,Lt.none())])}function Mw(n,e){const t=Et(n.firestore,mn),i=us(n),s=Ih(n.converter,e),r=ra(n.firestore);return la(t,[gh(r,"addDoc",i._key,s,n.converter!==null,{}).toMutation(i._key,Lt.exists(!1))]).then((()=>i))}function Ps(n,...e){n=Oe(n);let t={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||Nd(e[i])||(t=e[i++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Nd(e[i])){const u=e[i];e[i]=u.next?.bind(u),e[i+1]=u.error?.bind(u),e[i+2]=u.complete?.bind(u)}let r,o,l;if(n instanceof Ue)o=Et(n.firestore,mn),l=Kr(n._key.path),r={next:u=>{e[i]&&e[i](Th(o,n,u))},error:e[i+1],complete:e[i+2]};else{const u=Et(n,fn);o=Et(u.firestore,mn),l=u._query;const m=new cl(o);r={next:b=>{e[i]&&e[i](new ei(o,m,u,b))},error:e[i+1],complete:e[i+2]},xh(n._query)}const d=sa(o);return dw(d,l,s,r)}function la(n,e){const t=sa(n);return hw(t,e)}function Th(n,e,t){const i=t.docs.get(e._key),s=new cl(n);return new Zn(n,s,e._key,i,new ps(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){pv(mi),si(new Dn("firestore",((i,{instanceIdentifier:s,options:r})=>{const o=i.getProvider("app").getImmediate(),l=new mn(new fv(i.getProvider("auth-internal")),new vv(o,i.getProvider("app-check-internal")),Nv(o,s),o);return r={useFetchStreams:t,...r},l._setSettings(r),l}),"PUBLIC").setMultipleInstances(!0)),Kt(Dd,$d,e),Kt(Dd,$d,"esm2020")})();const kh="firebasestorage.googleapis.com",Ah="storageBucket",Ow=120*1e3,Vw=600*1e3;class je extends tn{constructor(e,t,i=0){super(Ma(e),`Firebase Storage: ${t} (${Ma(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,je.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ma(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ze;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ze||(ze={}));function Ma(n){return"storage/"+n}function fl(){const n="An unknown error occurred, please check the error payload for server response.";return new je(ze.UNKNOWN,n)}function Bw(n){return new je(ze.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Fw(n){return new je(ze.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Uw(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new je(ze.UNAUTHENTICATED,n)}function zw(){return new je(ze.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function jw(n){return new je(ze.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function qw(){return new je(ze.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Hw(){return new je(ze.CANCELED,"User canceled the upload/download.")}function Ww(n){return new je(ze.INVALID_URL,"Invalid URL '"+n+"'.")}function Gw(n){return new je(ze.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Kw(){return new je(ze.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ah+"' property when initializing the app?")}function Qw(){return new je(ze.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Yw(){return new je(ze.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Jw(n){return new je(ze.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function fo(n){return new je(ze.INVALID_ARGUMENT,n)}function Sh(){return new je(ze.APP_DELETED,"The Firebase app was deleted.")}function Xw(n){return new je(ze.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function bs(n,e){return new je(ze.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ns(n){throw new je(ze.INTERNAL_ERROR,"Internal error: "+n)}class Pt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=Pt.makeFromUrl(e,t)}catch{return new Pt(e,"")}if(i.path==="")return i;throw Gw(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),d={bucket:1,path:3};function u(C){C.path_=decodeURIComponent(C.path)}const m="v[A-Za-z0-9_]+",b=t.replace(/[.]/g,"\\."),v="(/([^?#]*).*)?$",R=new RegExp(`^https?://${b}/${m}/b/${s}/o${v}`,"i"),D={bucket:1,path:3},L=t===kh?"(?:storage.googleapis.com|storage.cloud.google.com)":t,_="([^?#]*)",A=new RegExp(`^https?://${L}/${s}/${_}`,"i"),$=[{regex:l,indices:d,postModify:r},{regex:R,indices:D,postModify:u},{regex:A,indices:{bucket:1,path:2},postModify:u}];for(let C=0;C<$.length;C++){const T=$[C],k=T.regex.exec(e);if(k){const f=k[T.indices.bucket];let g=k[T.indices.path];g||(g=""),i=new Pt(f,g),T.postModify(i);break}}if(i==null)throw Ww(e);return i}}class Zw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function e_(n,e,t){let i=1,s=null,r=null,o=!1,l=0;function d(){return l===2}let u=!1;function m(..._){u||(u=!0,e.apply(null,_))}function b(_){s=setTimeout(()=>{s=null,n(R,d())},_)}function v(){r&&clearTimeout(r)}function R(_,...A){if(u){v();return}if(_){v(),m.call(null,_,...A);return}if(d()||o){v(),m.call(null,_,...A);return}i<64&&(i*=2);let $;l===1?(l=2,$=0):$=(i+Math.random())*1e3,b($)}let D=!1;function L(_){D||(D=!0,v(),!u&&(s!==null?(_||(l=2),clearTimeout(s),b(0)):_||(l=1)))}return b(0),r=setTimeout(()=>{o=!0,L(!0)},t),L}function t_(n){n(!1)}function n_(n){return n!==void 0}function i_(n){return typeof n=="object"&&!Array.isArray(n)}function gl(n){return typeof n=="string"||n instanceof String}function Vd(n){return yl()&&n instanceof Blob}function yl(){return typeof Blob<"u"}function Bd(n,e,t,i){if(i<e)throw fo(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw fo(`Invalid value for '${n}'. Expected ${t} or less.`)}function ca(n,e,t){let i=e;return t==null&&(i=`https://${e}`),`${t}://${i}/v0${n}`}function Ch(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var ti;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ti||(ti={}));function s_(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||s||r}class r_{constructor(e,t,i,s,r,o,l,d,u,m,b,v=!0,R=!1){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=d,this.timeout_=u,this.progressCallback_=m,this.connectionFactory_=b,this.retry=v,this.isUsingEmulator=R,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((D,L)=>{this.resolve_=D,this.reject_=L,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new rr(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=l=>{const d=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(d,u)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const l=r.getErrorCode()===ti.NO_ERROR,d=r.getStatus();if(!l||s_(d,this.additionalRetryCodes_)&&this.retry){const m=r.getErrorCode()===ti.ABORT;i(!1,new rr(!1,null,m));return}const u=this.successCodes_.indexOf(d)!==-1;i(!0,new rr(u,r))})},t=(i,s)=>{const r=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const d=this.callback_(l,l.getResponse());n_(d)?r(d):r()}catch(d){o(d)}else if(l!==null){const d=fl();d.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,d)):o(d)}else if(s.canceled){const d=this.appDelete_?Sh():Hw();o(d)}else{const d=qw();o(d)}};this.canceled_?t(!1,new rr(!1,null,!0)):this.backoffId_=e_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&t_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class rr{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function a_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function o_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function l_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function c_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function d_(n,e,t,i,s,r,o=!0,l=!1){const d=Ch(n.urlParams),u=n.url+d,m=Object.assign({},n.headers);return l_(m,e),a_(m,t),o_(m,r),c_(m,i),new r_(u,n.method,m,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,l)}function u_(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function p_(...n){const e=u_();if(e!==void 0){const t=new e;for(let i=0;i<n.length;i++)t.append(n[i]);return t.getBlob()}else{if(yl())return new Blob(n);throw new je(ze.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function h_(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function m_(n){if(typeof atob>"u")throw Jw("base-64");return atob(n)}const Gt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Oa{constructor(e,t){this.data=e,this.contentType=t||null}}function f_(n,e){switch(n){case Gt.RAW:return new Oa(Ph(e));case Gt.BASE64:case Gt.BASE64URL:return new Oa(Rh(n,e));case Gt.DATA_URL:return new Oa(y_(e),v_(e))}throw fl()}function Ph(n){const e=[];for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const r=i,o=n.charCodeAt(++t);i=65536|(r&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function g_(n){let e;try{e=decodeURIComponent(n)}catch{throw bs(Gt.DATA_URL,"Malformed data URL.")}return Ph(e)}function Rh(n,e){switch(n){case Gt.BASE64:{const s=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(s||r)throw bs(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Gt.BASE64URL:{const s=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(s||r)throw bs(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=m_(e)}catch(s){throw s.message.includes("polyfill")?s:bs(n,"Invalid character found")}const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}class Lh{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw bs(Gt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=t[1]||null;i!=null&&(this.base64=b_(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function y_(n){const e=new Lh(n);return e.base64?Rh(Gt.BASE64,e.rest):g_(e.rest)}function v_(n){return new Lh(n).contentType}function b_(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}class An{constructor(e,t){let i=0,s="";Vd(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Vd(this.data_)){const i=this.data_,s=h_(i,e,t);return s===null?null:new An(s)}else{const i=new Uint8Array(this.data_.buffer,e,t-e);return new An(i,!0)}}static getBlob(...e){if(yl()){const t=e.map(i=>i instanceof An?i.data_:i);return new An(p_.apply(null,t))}else{const t=e.map(o=>gl(o)?f_(Gt.RAW,o).data:o.data_);let i=0;t.forEach(o=>{i+=o.byteLength});const s=new Uint8Array(i);let r=0;return t.forEach(o=>{for(let l=0;l<o.length;l++)s[r++]=o[l]}),new An(s,!0)}}uploadData(){return this.data_}}function Dh(n){let e;try{e=JSON.parse(n)}catch{return null}return i_(e)?e:null}function w_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function __(n,e){const t=e.split("/").filter(i=>i.length>0).join("/");return n.length===0?t:n+"/"+t}function $h(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function x_(n,e){return e}class yt{constructor(e,t,i,s){this.server=e,this.local=t||e,this.writable=!!i,this.xform=s||x_}}let ar=null;function E_(n){return!gl(n)||n.length<2?n:$h(n)}function Nh(){if(ar)return ar;const n=[];n.push(new yt("bucket")),n.push(new yt("generation")),n.push(new yt("metageneration")),n.push(new yt("name","fullPath",!0));function e(r,o){return E_(o)}const t=new yt("name");t.xform=e,n.push(t);function i(r,o){return o!==void 0?Number(o):o}const s=new yt("size");return s.xform=i,n.push(s),n.push(new yt("timeCreated")),n.push(new yt("updated")),n.push(new yt("md5Hash",null,!0)),n.push(new yt("cacheControl",null,!0)),n.push(new yt("contentDisposition",null,!0)),n.push(new yt("contentEncoding",null,!0)),n.push(new yt("contentLanguage",null,!0)),n.push(new yt("contentType",null,!0)),n.push(new yt("metadata","customMetadata",!0)),ar=n,ar}function I_(n,e){function t(){const i=n.bucket,s=n.fullPath,r=new Pt(i,s);return e._makeStorageReference(r)}Object.defineProperty(n,"ref",{get:t})}function T_(n,e,t){const i={};i.type="file";const s=t.length;for(let r=0;r<s;r++){const o=t[r];i[o.local]=o.xform(i,e[o.server])}return I_(i,n),i}function Mh(n,e,t){const i=Dh(e);return i===null?null:T_(n,i,t)}function k_(n,e,t,i){const s=Dh(e);if(s===null||!gl(s.downloadTokens))return null;const r=s.downloadTokens;if(r.length===0)return null;const o=encodeURIComponent;return r.split(",").map(u=>{const m=n.bucket,b=n.fullPath,v="/b/"+o(m)+"/o/"+o(b),R=ca(v,t,i),D=Ch({alt:"media",token:u});return R+D})[0]}function A_(n,e){const t={},i=e.length;for(let s=0;s<i;s++){const r=e[s];r.writable&&(t[r.server]=n[r.local])}return JSON.stringify(t)}class vl{constructor(e,t,i,s){this.url=e,this.method=t,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function Oh(n){if(!n)throw fl()}function S_(n,e){function t(i,s){const r=Mh(n,s,e);return Oh(r!==null),r}return t}function C_(n,e){function t(i,s){const r=Mh(n,s,e);return Oh(r!==null),k_(r,s,n.host,n._protocol)}return t}function Vh(n){function e(t,i){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=zw():s=Uw():t.getStatus()===402?s=Fw(n.bucket):t.getStatus()===403?s=jw(n.path):s=i,s.status=t.getStatus(),s.serverResponse=i.serverResponse,s}return e}function Bh(n){const e=Vh(n);function t(i,s){let r=e(i,s);return i.getStatus()===404&&(r=Bw(n.path)),r.serverResponse=s.serverResponse,r}return t}function P_(n,e,t){const i=e.fullServerUrl(),s=ca(i,n.host,n._protocol),r="GET",o=n.maxOperationRetryTime,l=new vl(s,r,C_(n,t),o);return l.errorHandler=Bh(e),l}function R_(n,e){const t=e.fullServerUrl(),i=ca(t,n.host,n._protocol),s="DELETE",r=n.maxOperationRetryTime;function o(d,u){}const l=new vl(i,s,o,r);return l.successCodes=[200,204],l.errorHandler=Bh(e),l}function L_(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function D_(n,e,t){const i=Object.assign({},t);return i.fullPath=n.path,i.size=e.size(),i.contentType||(i.contentType=L_(null,e)),i}function $_(n,e,t,i,s){const r=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let $="";for(let C=0;C<2;C++)$=$+Math.random().toString().slice(2);return $}const d=l();o["Content-Type"]="multipart/related; boundary="+d;const u=D_(e,i,s),m=A_(u,t),b="--"+d+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+m+`\r
--`+d+`\r
Content-Type: `+u.contentType+`\r
\r
`,v=`\r
--`+d+"--",R=An.getBlob(b,i,v);if(R===null)throw Qw();const D={name:u.fullPath},L=ca(r,n.host,n._protocol),_="POST",A=n.maxUploadRetryTime,S=new vl(L,_,S_(n,t),A);return S.urlParams=D,S.headers=o,S.body=R.uploadData(),S.errorHandler=Vh(e),S}class N_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ti.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ti.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ti.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,i,s,r){if(this.sent_)throw ns("cannot .send() more than once");if(Fn(e)&&i&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),r!==void 0)for(const o in r)r.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,r[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ns("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ns("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ns("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ns("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class M_ extends N_{initXhr(){this.xhr_.responseType="text"}}function bl(){return new M_}class hi{constructor(e,t){this._service=e,t instanceof Pt?this._location=t:this._location=Pt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new hi(e,t)}get root(){const e=new Pt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return $h(this._location.path)}get storage(){return this._service}get parent(){const e=w_(this._location.path);if(e===null)return null;const t=new Pt(this._location.bucket,e);return new hi(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Xw(e)}}function O_(n,e,t){n._throwIfRoot("uploadBytes");const i=$_(n.storage,n._location,Nh(),new An(e,!0),t);return n.storage.makeRequestWithTokens(i,bl).then(s=>({metadata:s,ref:n}))}function V_(n){n._throwIfRoot("getDownloadURL");const e=P_(n.storage,n._location,Nh());return n.storage.makeRequestWithTokens(e,bl).then(t=>{if(t===null)throw Yw();return t})}function B_(n){n._throwIfRoot("deleteObject");const e=R_(n.storage,n._location);return n.storage.makeRequestWithTokens(e,bl)}function F_(n,e){const t=__(n._location.path,e),i=new Pt(n._location.bucket,t);return new hi(n.storage,i)}function U_(n){return/^[A-Za-z]+:\/\//.test(n)}function z_(n,e){return new hi(n,e)}function Fh(n,e){if(n instanceof wl){const t=n;if(t._bucket==null)throw Kw();const i=new hi(t,t._bucket);return e!=null?Fh(i,e):i}else return e!==void 0?F_(n,e):n}function j_(n,e){if(e&&U_(e)){if(n instanceof wl)return z_(n,e);throw fo("To use ref(service, url), the first argument must be a Storage instance.")}else return Fh(n,e)}function Fd(n,e){const t=e?.[Ah];return t==null?null:Pt.makeFromBucketSpec(t,n)}function q_(n,e,t,i={}){n.host=`${e}:${t}`;const s=Fn(e);s&&(go(`https://${n.host}/b`),yo("Storage",!0)),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:r}=i;r&&(n._overrideAuthToken=typeof r=="string"?r:cu(r,n.app.options.projectId))}class wl{constructor(e,t,i,s,r,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=kh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ow,this._maxUploadRetryTime=Vw,this._requests=new Set,s!=null?this._bucket=Pt.makeFromBucketSpec(s,this._host):this._bucket=Fd(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Pt.makeFromBucketSpec(this._url,e):this._bucket=Fd(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Bd("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Bd("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(St(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new hi(this,e)}_makeRequest(e,t,i,s,r=!0){if(this._deleted)return new Zw(Sh());{const o=d_(e,this._appId,i,s,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const Ud="@firebase/storage",zd="0.14.0";const Uh="storage";function Li(n,e,t){return n=Oe(n),O_(n,e,t)}function ni(n){return n=Oe(n),V_(n)}function H_(n){return n=Oe(n),B_(n)}function ln(n,e){return n=Oe(n),j_(n,e)}function W_(n=_o(),e){n=Oe(n);const i=Fr(n,Uh).getImmediate({identifier:e}),s=au("storage");return s&&G_(i,...s),i}function G_(n,e,t,i={}){q_(n,e,t,i)}function K_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new wl(t,i,s,e,mi)}function Q_(){si(new Dn(Uh,K_,"PUBLIC").setMultipleInstances(!0)),Kt(Ud,zd,""),Kt(Ud,zd,"esm2020")}Q_();const zh={apiKey:"AIzaSyAOV2Dz0mrJAIT2DLQsrLCTC2bLO7lkzmI",authDomain:"conectacidade-5e46d.firebaseapp.com",projectId:"conectacidade-5e46d",storageBucket:"conectacidade-5e46d.firebasestorage.app",messagingSenderId:"740343372037",appId:"1:740343372037:web:a74dcf684844bc9167ff6c",measurementId:"G-GH3W7LBTWZ"},_l=wo(zh),Va=Ku(_l),Ot=yw(_l),cn=W_(_l),F={async create(n,e){const t=di(Ot,n);return(await Mw(t,{...e,createdAt:ye.now()})).id},async set(n,e,t){const i=us(Ot,n,e);await Dw(i,{...t,createdAt:ye.now()})},async getAll(n,e){const t=di(Ot,n);let i=pi(t);return e&&(i=pi(t,Xn(e.field,e.operator,e.value))),(await Lw(i)).docs.map(r=>({id:r.id,...r.data()}))},async get(n,e){const t=us(Ot,n,e),i=await Rw(t);return i.exists()?{id:i.id,...i.data()}:null},async update(n,e,t){const i=us(Ot,n,e);await $w(i,t)},async delete(n,e){const t=us(Ot,n,e);await Nw(t)}},Y_=Object.freeze(Object.defineProperty({__proto__:null,dbService:F},Symbol.toStringTag,{value:"Module"}));class J_{currentUser=null;listeners=[];constructor(){Jg(Va,async e=>{if(e)if(e.email==="ginannymoreira@gmail.com")this.currentUser={uid:e.uid,email:e.email,role:"admin"};else try{const t=await F.get("users",e.uid);if(t){const i=t;if(i.companyId){const r=await F.get("companies",i.companyId);if(r&&r.status==="inactive"){await this.logout();const{toast:o}=await za(async()=>{const{toast:l}=await Promise.resolve().then(()=>jd);return{toast:l}},void 0);o.error("Seu acesso de cliente foi desativado. Entre em contato com o administrador.");return}}this.currentUser={uid:e.uid,email:e.email,role:i.role,companyId:i.companyId,storeId:i.storeId,storeIds:i.storeIds}}else{console.warn("User authenticated but not found in DB",e.uid),await this.logout();const{toast:i}=await za(async()=>{const{toast:s}=await Promise.resolve().then(()=>jd);return{toast:s}},void 0);i.error("Sua conta não foi encontrada ou foi removida."),this.currentUser=null}}catch(t){console.error("Error fetching user profile:",t),this.currentUser=null}else this.currentUser=null;this.notifyListeners()})}async login(e,t){await Kg(Va,e,t)}async logout(){await Xg(Va)}async registerUser(e,t){const i=wo(zh,"Secondary"),s=Ku(i);return(await Gg(s,e,t)).user.uid}getCurrentUser(){return this.currentUser}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e(this.currentUser))}}const Ae=new J_,X_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1,s=!1;if(n&&n.companyId)try{const l=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"];l.includes("venda")&&(e=!0),l.includes("agendamento")&&(t=!0),l.includes("disparo")&&(i=!0),l.includes("venda_catalogo")&&(s=!0)}catch(r){console.error("Error fetching company for sidebar:",r)}return s?`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel do Dono</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${i?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}

                <div class="nav-divider"></div>

                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/catalog-settings" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-sliders"></i></span>
                    <span>Configuração</span>
                </a>
                <a href="/mercado-pago" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span>Mercado Pago</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
        `:`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel do Dono</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                
                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}

                ${t?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                `:""}

                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${t?`
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

                ${i?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}
                
                <div class="nav-divider"></div>
                
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/configuration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-gear"></i></span>
                    <span>Configurações</span>
                </a>
                <a href="/mercado-pago" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span>Mercado Pago</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
    `},Z_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1;if(n&&n.companyId)try{const o=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"];o.includes("venda")&&(e=!0),o.includes("agendamento")&&(t=!0),o.includes("venda_catalogo")&&(i=!0)}catch(s){console.error("Error fetching company for employee sidebar:",s)}return i?`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span><br>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
        `:`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>

                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-cart-shopping"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}

                ${t?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span><br>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
    `},ex=n=>`
        <div class="topbar glass">
            <div class="topbar-left">
                <h2 class="page-title">${n}</h2>
            </div>
            <div class="topbar-right">
                <!--<div class="notification-bell">
                    <span class="icon">🔔</span>
                    <span class="dot"></span>
                </div>-->
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Buscar...">
                </div>
                <button id="logout-btn" class="logout-btn" title="Sair">
                    <span class="icon"><i style="color: #FFF; font-size: 1.0rem;" class="fa-solid fa-arrow-right-from-bracket"></i></span>
                </button>
            </div>
        </div>
    `,Nt="https://evolution.vps.pequi.digital",Mt="1120d381afc6900754fc87d8264ed6335aeab3223b4d24810a17145399c16e46",ht={async createInstance(n){try{const e=await fetch(`${Nt}/instance/create`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Mt},body:JSON.stringify({instanceName:n,qrcode:!0,integration:"WHATSAPP-BAILEYS"})});if(!e.ok){const t=await e.json();throw new Error(t.message||"Failed to create instance")}return await e.json()}catch(e){throw console.error("Evolution API - Create Instance Error:",e),e}},async setWebhook(n,e,t=!0){try{const i=await fetch(`${Nt}/webhook/set/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Mt},body:JSON.stringify({webhook:{enabled:t,url:e,byEvents:!1,base64:!0,events:["MESSAGES_UPSERT"]}})});return i.ok?!0:(console.error("Evolution API - Set Webhook Error:",await i.text()),!1)}catch(i){return console.error("Evolution API - Set Webhook Exception:",i),!1}},async getInstanceStatus(n){try{const e=await fetch(`${Nt}/instance/connectionState/${n}`,{method:"GET",headers:{apikey:Mt}});if(!e.ok)throw new Error("Failed to get instance status");const t=await e.json();return{state:t.state||t.instance?.state||"close",connected:t.state==="open"||t.instance?.state==="open"}}catch(e){return console.error("Evolution API - Get Status Error:",e),{state:"close",connected:!1}}},async getQRCode(n){try{const e=await fetch(`${Nt}/instance/connect/${n}`,{method:"GET",headers:{apikey:Mt}});if(!e.ok)throw new Error("Failed to get QR code");const t=await e.json();return t.qrcode?.base64?{base64:t.qrcode.base64}:t.base64?{base64:t.base64}:null}catch(e){return console.error("Evolution API - Get QR Code Error:",e),null}},async deleteInstance(n){try{return(await fetch(`${Nt}/instance/delete/${n}`,{method:"DELETE",headers:{apikey:Mt}})).ok}catch(e){return console.error("Evolution API - Delete Instance Error:",e),!1}},async logoutInstance(n){try{return(await fetch(`${Nt}/instance/logout/${n}`,{method:"DELETE",headers:{apikey:Mt}})).ok}catch(e){return console.error("Evolution API - Logout Instance Error:",e),!1}},async instanceExists(n){try{const e=await fetch(`${Nt}/instance/fetchInstances`,{method:"GET",headers:{apikey:Mt}});if(!e.ok)return!1;const t=await e.json();return Array.isArray(t)&&t.some(i=>i.instance?.instanceName===n)}catch(e){return console.error("Evolution API - Check Instance Exists Error:",e),!1}},async sendText(n,e,t){try{let i=e.replace(/\D/g,"");i.length<=11&&!i.startsWith("55")&&(i="55"+i);const s=i.includes("@")?i:`${i}@s.whatsapp.net`,r=await fetch(`${Nt}/message/sendText/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Mt},body:JSON.stringify({number:s,text:t,delay:1200,linkPreview:!0})});if(!r.ok){const o=await r.json();return console.error("Evolution API - Send Text Error:",o),!1}return!0}catch(i){return console.error("Evolution API - Send Text Exception:",i),!1}}};class tx{container=null;soundEnabled=!0;constructor(){this.init()}init(){typeof window>"u"||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container))}playSound(e){if(this.soundEnabled)try{const t=new Audio;switch(e){case"success":t.src="/sounds/success.mp3";break;case"error":t.src="/sounds/error.mp3";break;case"warning":t.src="/sounds/warning.mp3";break;default:return}t.volume=.3,t.play().catch(()=>{})}catch{}}show(e){const{message:t,type:i="info",duration:s=3e3,sound:r=!0}=e;if(this.container||this.init(),!this.container)return;const o=document.createElement("div");o.className=`toast toast-${i}`;const l={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};o.innerHTML=`
            <div class="toast-icon">${l[i]}</div>
            <div class="toast-message">${t}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `,this.container.appendChild(o),r&&this.playSound(i),setTimeout(()=>{o.classList.add("toast-exit"),setTimeout(()=>o.remove(),300)},s)}success(e,t){this.show({message:e,type:"success",duration:t})}error(e,t){this.show({message:e,type:"error",duration:t})}warning(e,t){this.show({message:e,type:"warning",duration:t})}info(e,t){this.show({message:e,type:"info",duration:t})}setSoundEnabled(e){this.soundEnabled=e}}const B=new tx,jd=Object.freeze(Object.defineProperty({__proto__:null,toast:B},Symbol.toStringTag,{value:"Module"}));window.copyToClipboard=(n,e="Link copiado!")=>{navigator.clipboard.writeText(n).then(()=>{B.success(e)}).catch(t=>{console.error("Erro ao copiar link:",t),B.error("Erro ao copiar link.")})};window.toggleStoreActive=async(n,e,t)=>{try{const i=await F.get("companies",n);if(!i)return;const r=i.stores||[],o=r.findIndex(l=>l.id===e);o!==-1&&(r[o].active=t,await F.update("companies",n,{stores:r}),B.success(`Loja ${t?"ativada":"desativada"} com sucesso!`),setTimeout(()=>location.reload(),1e3))}catch(i){console.error("Error toggling store status:",i),B.error("Erro ao alterar status da loja.")}};const nx=async()=>{const n=Ae.getCurrentUser();if(!n)return"";let e={messages:0,payments:0,orders_pending:0,orders_paid:0,today:0,openai:{usage:0,credits:0,limit:0}},t=["atendimento"],i=null;if(n?.role==="admin"){t=["atendimento","venda","agendamento","disparo"];try{(await F.getAll("companies")).forEach(l=>{l.metrics&&(e.messages+=l.metrics.totalMessages||0,e.payments+=l.metrics.totalPayments||0)}),e.orders_pending=15,e.orders_paid=1200;const o=await F.get("settings","openai");o?e.openai={usage:o.usage||0,credits:o.credits||0,limit:o.limit||0}:e.openai={usage:0,credits:0,limit:0}}catch(r){console.error("Error fetching dashboard data:",r)}}else if(n?.companyId)try{if(t=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"],t.includes("atendimento")){const l=await F.getAll("messages",{field:"empresaId",operator:"==",value:n.companyId}),d=n.storeIds||(n.storeId?[n.storeId]:[]);e.messages=l.filter(u=>u.role!=="assistente"?!1:n.role==="owner"?!0:u.lojaId&&d.includes(u.lojaId)).length}if(t.includes("venda")||t.includes("venda_catalogo")){const l=await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId}),d=n.storeIds||(n.storeId?[n.storeId]:[]),u=n.role==="owner"?l:l.filter(R=>R.lojaId&&d.includes(R.lojaId));e.orders_pending=u.filter(R=>R.status!=="finalizado"&&R.status!=="cancelado").length,e.orders_paid=u.filter(R=>R.status==="finalizado").length;let m=0,b=0;const v=new Date;if(v.setHours(0,0,0,0),u.forEach(R=>{R.status==="finalizado"&&(m+=R.value||R.total||0),(R.criadoEm?.toDate?R.criadoEm.toDate():new Date(R.criadoEm||0))>=v&&b++}),e.payments=m,e.today=b,t.includes("venda_catalogo")){const D=(await F.getAll("products",{field:"companyId",operator:"==",value:n.companyId})).filter(C=>C.stock!=null&&C.stock<=5&&C.active!==!1).sort((C,T)=>(C.stock??0)-(T.stock??0)).slice(0,10),L=new Map;u.forEach(C=>{(Array.isArray(C.items)?C.items:Array.isArray(C.itens)?C.itens:[]).forEach(k=>{const f=k.name||k.item||"Produto",g=k.qty||k.quantidade||1,y=k.price||k.preco||0,w=L.get(f)||{name:f,qty:0,revenue:0};L.set(f,{name:f,qty:w.qty+g,revenue:w.revenue+g*y})})});const _=Array.from(L.values()).sort((C,T)=>T.qty-C.qty).slice(0,5),A=new Map;u.forEach(C=>{const k=(C.criadoEm?.toDate?C.criadoEm.toDate():new Date(C.criadoEm||0)).getHours();A.set(k,(A.get(k)||0)+1)});const S=Array.from(A.entries()).sort((C,T)=>T[1]-C[1]).slice(0,3),$=e.orders_paid>0?m/e.orders_paid:0;i={lowStockProducts:D,topProducts:_,bestHours:S,avgTicket:$,totalOrders:u.length}}}}catch(r){console.error("Error fetching dashboard data:",r)}return setTimeout(()=>{n?.companyId&&s(n.companyId,n)},100),`
        <div class="page-header">
            <h2 class="page-title">Visão Geral (${n?.role==="admin"?"Global":"Cliente"})</h2>
        </div>

        <div class="dashboard-grid">
            ${n.role==="admin"?`
                <div class="stats-card card" style="border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.02);">
                    <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-coins"></i></div>
                    <div class="stats-info">
                        <span class="label">Créditos OpenAI</span><br>
                        <span class="value" style="color:var(--success);">$ ${e.openai.credits.toFixed(2)}</span>
                    </div>
                </div>
                <div class="stats-card card" style="border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.02);">
                    <div class="stats-icon danger"><i style="color: #ffffff8f;" class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div class="stats-info">
                        <span class="label">Gasto OpenAI (Mês)</span><br>
                        <span class="value" style="color:var(--danger);">$ ${e.openai.usage.toFixed(2)}</span>
                    </div>
                </div>
            `:""}
            ${t.includes("atendimento")?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-message"></i></div>
                <div class="stats-info">
                    <span class="label">Mensagens pela IA</span><br>
                    <span class="value">${e.messages}</span>
                </div>
            </div>`:""}
            ${t.includes("venda")||t.includes("venda_catalogo")?`
            <div class="stats-card card">
                <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-money-bill"></i></div>
                <div class="stats-info">
                    <span class="label">Total em Vendas</span><br>
                    <span class="value">R$ ${e.payments.toFixed(2)}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon warning"><i style="color: #ffffff8f;" class="fa-solid fa-hourglass-half"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Pendentes</span><br>
                    <span class="value">${e.orders_pending}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon info"><i style="color: #ffffff8f;" class="fa-solid fa-box"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Hoje</span><br>
                    <span class="value">${e.today||0}</span>
                </div>
            </div>
            ${i?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-receipt"></i></div>
                <div class="stats-info">
                    <span class="label">Ticket Médio</span><br>
                    <span class="value">R$ ${i.avgTicket.toFixed(2)}</span>
                </div>
            </div>
            `:""}
            `:""}
        </div>

        ${i?`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-top:1.5rem;">

            <!-- Low Stock Alert -->
            <div class="card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.03);">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Estoque Baixo
                </h4>
                ${i.lowStockProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Todos os produtos estão com estoque adequado.</p>':i.lowStockProducts.map(r=>`
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:0.85rem;font-weight:500;">${r.name}</span>
                            <span class="badge ${r.stock===0?"danger":"warning"}">${r.stock===0?"Esgotado":r.stock+" un."}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Top Selling Products -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> Top 5 Produtos
                </h4>
                ${i.topProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido com itens ainda.</p>':i.topProducts.map((r,o)=>`
                        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:1rem;font-weight:900;color:${o===0?"#f59e0b":o===1?"#94a3b8":o===2?"#b45309":"var(--text-dim)"};min-width:20px;">${o+1}</span>
                            <span style="flex:1;font-size:0.85rem;font-weight:500;">${r.name}</span>
                            <span style="font-size:0.8rem;color:var(--text-muted);">${r.qty} un.</span>
                            <span style="font-size:0.8rem;color:var(--success);">R$ ${r.revenue.toFixed(2)}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Best Sales Hours -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-chart-bar" style="color:var(--primary);"></i> Melhores Horários
                </h4>
                ${i.bestHours.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido registrado ainda.</p>':i.bestHours.map(([r,o],l)=>{const d=i.bestHours[0][1],u=Math.round(o/d*100);return`
                            <div style="margin-bottom:10px;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                                    <span style="font-size:0.85rem;font-weight:600;">${String(r).padStart(2,"0")}h – ${String(r+1).padStart(2,"0")}h</span>
                                    <span style="font-size:0.8rem;color:var(--text-muted);">${o} pedido${o!==1?"s":""}</span>
                                </div>
                                <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
                                    <div style="width:${u}%;height:100%;background:${l===0?"var(--primary)":"rgba(99,102,241,0.4)"};border-radius:3px;"></div>
                                </div>
                            </div>
                        `}).join("")}
            </div>

        </div>
        `:""}

        <div id="store-statuses-container"></div>
    `;async function s(r,o){const l=document.getElementById("store-statuses-container");if(l)try{const u=await F.get("companies",r);let m=u?.stores||[];const v=await F.getAll("instancias",{field:"empresaId",operator:"==",value:r});if(o.role!=="owner"){const D=o.storeIds||(o.storeId?[o.storeId]:[]);m=m.filter(L=>D.includes(L.id))}if(m.length===0){l.innerHTML=`
                    <div class="card" style="margin-top: 1.5rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);">
                        <h3 style="color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Sistema Inoperante</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Nenhuma loja encontrada ou associada a este usuário. O sistema não pode operar.</p>
                    </div>
                `;return}let R="";for(const D of m){let L="",_=!1;const A=(D.instancia_id?v.find(T=>T.id===D.instancia_id):null)||v.find(T=>T.lojaId===D.id),S=A?.nome;if(!A||D.active===!1)L=`
                        <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-circle-xmark"></i> Loja Inoperante</p>
                                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${A?"Loja desativada":"Sem instância vinculada"}.</p>
                                </div>
                                <button class="btn-primary btn-sm" onclick="toggleStoreActive('${u.id}', '${D.id}', true)">
                                    <i class="fa-solid fa-play"></i> Ativar Loja
                                </button>
                            </div>
                        </div>
                    `;else try{const T=await ht.getInstanceStatus(S);if(["open","connected","CONNECTED","ON"].includes(T.state))_=!0,L=`
                                <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Instância Conectada</p>
                                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">A IA e o WhatsApp estão online (Instância: ${S}).</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${D.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                </div>
                            `;else{const g=await ht.getQRCode(S);L=`
                                <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</p>
                                            <p style="margin: 0.25rem 0 0.5rem 0; font-size: 0.85rem; color: var(--text-muted);">Instância: <strong>${S}</strong>. Escaneie o QR Code.</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${D.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                    ${g?.base64?`<img src="${g.base64}" alt="QR" style="width:150px;height:150px;display:block;margin:0 auto;border-radius:8px; background: white; padding: 5px;">`:'<p style="font-size:0.8rem;text-align:center; padding: 20px;">QR Code indisponível no momento. Tente atualizar a página.</p>'}
                                </div>
                            `}}catch(T){console.error("Error checking instance status in dashboard:",T),L=`
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--warning); margin-bottom: 1rem;">
                                <p style="margin: 0; font-weight: 600; color: var(--warning);"><i class="fa-solid fa-circle-exclamation"></i> Erro de Comunicação</p>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">Não foi possível verificar a instância: <strong>${S}</strong>. Verifique sua conexão.</p>
                            </div>
                        `}const $=D.frete_ativo!==!1,C=A&&D.active!==!1;R+=`
                    <div class="card" style="margin-top: 1.5rem; border: 1px solid ${_?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin-bottom: 0.25rem;"><i class="fa-solid fa-store"></i> ${D.name}</h3>
                                <div style="display:flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <span class="badge ${C?"success":"danger"}">${C?"Operante":"Inoperante"}</span>
                                    <span class="badge ${_?"success":"warning"}">${_?"WhatsApp Online":"WhatsApp Offline"}</span>
                                    <span class="badge ${$?"success":"warning"}">${$?"Frete Ativo":"Retirada Apenas"}</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${S?`
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/qr/${S}', 'Link de conexão copiado!')" title="Link para conectar WhatsApp" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; border-color: rgba(245, 158, 11, 0.3);">
                                    <i class="fa-solid fa-qrcode" style="font-size: 0.75rem; color: var(--warning);"></i> Link QR
                                </button>
                                `:""}
                                <a href="/catalog/${D.id}" target="_blank" class="btn-secondary btn-sm" style="text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-up-right-from-square" style="font-size: 0.75rem;"></i> Catálogo
                                </a>
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/catalog/${D.id}', 'Link do catálogo copiado!')" title="Copiar link do catálogo" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-copy" style="font-size: 0.75rem;"></i> Link
                                </button>
                            </div>
                        </div>
                        ${L}
                    </div>
                `}if(o.role==="owner"||o.role==="admin"){const D=m.map(S=>S.instancia_id).filter(S=>!!S),L=v.filter(S=>S.lojaId).map(S=>S.id),_=new Set([...D,...L]),A=v.filter(S=>!_.has(S.id));if(A.length>0){R+=`
                        <div class="card" style="margin-top: 2rem; border: 1px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.02);">
                            <h4 style="margin-bottom: 1rem; color: var(--text-muted);"><i class="fa-solid fa-link-slash"></i> Instâncias não vinculadas a lojas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                    `;for(const S of A){let $=!1;try{$=(await ht.getInstanceStatus(S.nome)).connected}catch{}R+=`
                            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>${S.nome}</strong>
                                    <span class="badge ${$?"success":"warning"}">${$?"Online":"Offline"}</span>
                                </div>
                                <p style="font-size:0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Vá em Configurações > Lojas para vincular esta instância a uma unidade.</p>
                            </div>
                        `}R+="</div></div>"}}l.innerHTML=R}catch(d){console.error("Error setting up Store statuses:",d),l.innerHTML=`
                <div class="card" style="margin-top: 1.5rem; background: var(--surface-hover);">
                    <p style="color: var(--danger);">Erro ao carregar os status integrados.</p>
                </div>
            `}}};class ix{show(e){return new Promise(t=>{const{title:i,message:s,confirmText:r="Confirmar",cancelText:o="Cancelar",type:l="warning"}=e,d=document.createElement("div");d.className="confirm-modal",d.innerHTML=`
                <div class="confirm-modal-content">
                    <div class="confirm-header ${l}">
                        <div class="confirm-icon">${l==="danger"?'<i class="fa fa-times"></i>':l==="warning"?'<i class="fa fa-exclamation-triangle"></i>':'<i class="fa fa-info-circle"></i>'}</div>
                        <h2>${i}</h2>
                    </div>
                    <div class="confirm-body">
                        <p>${s}</p>
                    </div>
                    <div class="confirm-actions">
                        <button class="btn-cancel" id="confirm-cancel">${o}</button>
                        <button class="btn-confirm ${l}" id="confirm-ok">${r}</button>
                    </div>
                </div>
            `,document.body.appendChild(d);const u=d.querySelector("#confirm-ok"),m=d.querySelector("#confirm-cancel"),b=v=>{d.remove(),t(v)};u?.addEventListener("click",()=>b(!0)),m?.addEventListener("click",()=>b(!1)),d.addEventListener("click",v=>{v.target===d&&b(!1)})})}async danger(e,t){return this.show({title:e,message:t,type:"danger",confirmText:"Sim, excluir"})}async warning(e,t){return this.show({title:e,message:t,type:"warning"})}}const Ye=new ix;function qd(n,e){return n.replace(/\{\{(\w+)\}\}/g,(t,i)=>e[i]!==void 0?e[i]:t)}function sx(n,e){const s=(Array.isArray(n.itens)?n.itens:Array.isArray(n.items)?n.items:[]).map(r=>({item:r.item||r.name||"",quantidade:r.quantidade||r.qty||1,preco:r.preco||r.price||0})).map(r=>`${r.quantidade}x ${r.item}`).join(", ");return{nome_lead:e?.nome||e?.name||n.clientName||n.nome||"Cliente",telefone_lead:(e?.telefone||"").split("@")[0]||n.clientPhone||"",numero_pedido:n.id?.slice(-6).toUpperCase()||"",lista_produtos:s,valor_total:`R$ ${(n.value||n.total||0).toFixed(2)}`,endereco_entrega:n.endereco||n.clientAddress||"Não informado",forma_pagamento:n.formaPagamento||n.paymentMethod||n.pagamento||"Não informado"}}const Ba={pedido_aceito:"✅ Pedido confirmado! Pode me informar a forma de pagamento?",pedido_aceito_retirada:"✅ Pedido confirmado para retirada! Já está sendo preparado.",pagamento_confirmado:"💳 Pagamento confirmado! Seu pedido já está sendo preparado.",pedido_pronto:"📦 Seu pedido já está pronto para retirada!",saiu_para_entrega:"🚚 Boa notícia! Seu pedido saiu para entrega.",pedido_entregue:"🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!",pedido_cancelado:"❌ Seu pedido foi cancelado."};function rx(n){switch(n){case"aguardando_pagamento":return"pedido_aceito";case"em_preparo":return"pagamento_confirmado";case"pedido_pronto":return"pedido_pronto";case"saiu_para_entrega":return"saiu_para_entrega";case"finalizado":return"pedido_entregue";case"cancelado":return"pedido_cancelado";default:return null}}async function ax(n,e){try{if(e){const i=await F.getAll("loja_config",{field:"lojaId",operator:"==",value:e});if(i&&i.length>0){const s=i[0];if(s.mensagens_automaticas)return s.mensagens_automaticas}}const t=await F.getAll("empresa_config",{field:"empresaId",operator:"==",value:n});if(t&&t.length>0)return t[0].mensagens_automaticas||{}}catch(t){console.error("Error fetching message config:",t)}return{}}const Jn={async updateOrderStatus(n,e,t,i,s){try{s&&Object.assign(n,s);let r=n.instancia||null;if(!r){const D=n.storeId||n.lojaId;if(D)try{let A=(await F.getAll("loja_config",{field:"lojaId",operator:"==",value:D}))[0]?.instancia_id;const S=await F.get("companies",e);!A&&S?.stores&&(A=S.stores.find(C=>C.id===D)?.instancia_id),A&&(r=(await F.get("instancias",A))?.nome||null),!r&&S?.whatsappInstance?.instanceName&&(r=S.whatsappInstance.instanceName)}catch(L){console.error("Error fetching instance for store:",L)}}r||(r=(await F.get("companies",e))?.whatsappInstance?.instanceName||null);const o=n.leadId?await F.get("leads",n.leadId):null,l=o?.telefone||o?.whatsapp||(n.clientPhone?n.clientPhone.replace(/\D/g,""):null)||n.leadId||null,d=sx(n,o),u=await ax(e,n.lojaId||n.storeId);let m="",b=rx(t);if(t==="em_preparo"&&(n.status==="em_montagem"||!n.status)&&(b="pedido_aceito_retirada"),b)if(t==="cancelado"){const D=u[b]||Ba[b]||"",L=D?qd(D,d):Ba[b];m=i?`${L} Motivo: ${i}`:L}else{const D=u[b]||Ba[b]||"";m=D?qd(D,d):""}let v={status:t,updatedAt:ye.now()};i&&(v.rejectionReason=i),s&&(v={...v,...s}),await F.update("pedidos",n.id,v),t==="finalizado"&&n.leadId&&await F.update("leads",n.leadId,{statusAtendimento:"finalizado",updatedAt:ye.now()});let R=!1;return m&&r&&l&&(R=await ht.sendText(r,l,m),n.leadId&&await this.saveMessageLog(e,n.leadId,m)),R}catch(r){throw console.error("OrderService - Error updating status:",r),r}},async activateHumanSupport(n){await F.update("leads",n,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()})},async sendInterventionMessage(n,e,t,i,s){const r=await ht.sendText(t,i,s);return await F.create("messages",{conteudo:s,createdAt:ye.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"}),r},async saveMessageLog(n,e,t){try{await F.create("messages",{conteudo:t,createdAt:ye.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"})}catch(i){console.error("OrderService - Error logging message:",i)}},async getOrderDetails(n){return await F.get("pedidos",n)},async getOpenOrdersCount(n,e){try{return(await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n})).filter(i=>{if(e&&e.length>0&&(!i.lojaId||!e.includes(i.lojaId)))return!1;const s=(i.status||"em_montagem").toLowerCase();return s!=="finalizado"&&s!=="cancelado"}).length}catch{return 0}}},ox={em_montagem:{label:"Em Montagem",cls:"badge warning",icon:'<i class="fa-solid fa-cart-shopping"></i>'},aguardando_pagamento:{label:"Aguard. Pagamento",cls:"badge info",icon:'<i class="fa-solid fa-credit-card"></i>'},em_preparo:{label:"Em Preparo",cls:"badge primary",icon:'<i class="fa-solid fa-utensils"></i>'},pedido_pronto:{label:"Pronto p/ Retirada",cls:"badge success",icon:'<i class="fa-solid fa-box" style="color:#fff;"></i>'},saiu_para_entrega:{label:"Saiu p/ Entrega",cls:"badge success",icon:'<i class="fa-solid fa-truck" style="color:#fff;"></i>'},finalizado:{label:"Finalizado",cls:"badge success",icon:'<i class="fa-solid fa-check" style="color:#fff;"></i>'},cancelado:{label:"Cancelado",cls:"badge danger",icon:'<i class="fa-solid fa-xmark"></i>'}};function Hd(n){const e=(n||"em_montagem").toLowerCase(),t=ox[e]||{label:n||"Pendente",cls:"badge secondary",icon:'<i class="fa-solid fa-question"></i>'};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function Wd(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const Gd=[{key:"todos",label:"Todos"},{key:"em_montagem",label:'<i class="fa-solid fa-cart-shopping"></i> Em Montagem'},{key:"aguardando_pagamento",label:'<i class="fa-solid fa-credit-card"></i> Pag. Pendente'},{key:"em_preparo",label:'<i class="fa-solid fa-utensils"></i> Em Preparo'},{key:"pedido_pronto",label:'<i class="fa-solid fa-box"></i> Prontos'},{key:"saiu_para_entrega",label:'<i class="fa-solid fa-truck"></i> Em Entrega'},{key:"finalizado",label:'<i class="fa-solid fa-check"></i> Finalizados'}];function Kd(n){return n==="retirada"?'<span class="badge secondary" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-store" style="font-size: 0.6rem;"></i> Retirada</span>':'<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-truck" style="font-size: 0.6rem;"></i> Entrega</span>'}function Qd(n,e,t){if(!n)return'<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>';const i=n.toLowerCase().trim(),s=i.includes("link"),r=i.includes("pagamento_no_pix"),o=i.includes("entrega")||i.includes("dinheiro")||i.includes("maquininha");if(s)return`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;if(r){let l=`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;const d=e&&e!=="tete"?e:t&&t.startsWith("comprovantes/")?t:null;return d&&(l+=`
                <button class="view-comprovante-btn" data-path="${d}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`),`<div style="display: flex; align-items: center;">${l}</div>`}return o?`<span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
        </span>`:`<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${n}</span>`}const lx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId});e.sort((T,k)=>{const f=(T.criadoEm?.toDate?.()||new Date(T.criadoEm||0)).getTime();return(k.criadoEm?.toDate?.()||new Date(k.criadoEm||0)).getTime()-f});let i=(await F.get("companies",n.companyId))?.stores||[];if(n.role!=="owner"){const T=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(k=>T.includes(k.id)),e=e.filter(k=>T.includes(k.lojaId))}const s=await F.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId}),r=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:n.companyId}),o=T=>{const k=i.find(f=>f.id===T);return k?k.name:T||"-"},l=T=>{const k=i.find(g=>g.id===T);if(k&&k.active!==!1&&k.instancia_id)return!0;const f=r.find(g=>g.lojaId===T);return f?!!f.instancia_id:!1},d=(T,k)=>{if(k)return k;const f=s.find(g=>g.id===T);return f?f.nome||f.name||"Cliente":T||"Cliente"},u=T=>(s.find(f=>f.id===T)?.telefone||"").split("@")[0];let m="todos";const b=T=>T==="todos"?e:e.filter(k=>(k.status||"em_montagem").toLowerCase()===T),v=T=>T.length===0?'<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>':T.map(k=>{const f=(k.status||"em_montagem").toLowerCase();return`
            <tr data-order-id="${k.id}">
                <td><span style="font-family:monospace;font-weight:600;color:var(--primary);">#${k.id.slice(-6).toUpperCase()}</span></td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${o(k.lojaId)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <div class="lead-avatar" style="width:28px;height:28px;font-size:0.7rem;flex-shrink:0;">${(d(k.leadId,k.nome||k.leadName)[0]||"C").toUpperCase()}</div>
                        <div>
                            <div style="font-weight:500;">${d(k.leadId,k.nome||k.leadName)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">${u(k.leadId)}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight:600;">R$ ${(k.value||k.total||0).toFixed(2)}</td>
                <td>${Hd(f)}  ${Kd(k.entrega||"entrega")}  ${Qd(k.pagamento||k.formaPagamento,k.comprovanteUrl,k.empresaId)}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;">${Wd(k.criadoEm||k.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${k.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),R=T=>{const k=T==="todos"?e.length:e.filter(f=>(f.status||"em_montagem").toLowerCase()===T).length;return`<span class="filter-count" id="count-${T}">${k}</span>`};return setTimeout(()=>D(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar" id="orders-filter-bar">
                ${Gd.map(T=>`
                    <button class="filter-btn${T.key==="todos"?" active":""}" data-filter="${T.key}">
                        ${T.label} ${R(T.key)}
                    </button>
                `).join("")}
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="orders-table">
                    <thead>
                        <tr>
                            <th>TAG</th>
                            <th>Loja</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        ${v(e)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="order-modal-inner"></div>
            </div>
        </div>
    `;function D(){const T=di(Ot,"pedidos"),k=pi(T,Xn("empresaId","==",n.companyId));window._ordersUnsubscribe&&window._ordersUnsubscribe();const f=Ps(k,w=>{if(e=w.docs.map(I=>({id:I.id,...I.data()})),n.role!=="owner"){const I=n.storeIds||(n.storeId?[n.storeId]:[]);e=e.filter(x=>I.includes(x.lojaId))}e.sort((I,x)=>{const P=(I.criadoEm?.toDate?.()||new Date(I.criadoEm||0)).getTime();return(x.criadoEm?.toDate?.()||new Date(x.criadoEm||0)).getTime()-P});const h=document.getElementById("orders-tbody");h&&(h.innerHTML=v(b(m)),L()),Gd.forEach(I=>{const x=document.getElementById(`count-${I.key}`);if(x){const P=I.key==="todos"?e.length:e.filter(M=>(M.status||"em_montagem").toLowerCase()===I.key).length;x.textContent=P.toString()}})});window._ordersUnsubscribe=f,document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(w=>{w.addEventListener("click",()=>{document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(I=>I.classList.remove("active")),w.classList.add("active"),m=w.dataset.filter||"todos";const h=document.getElementById("orders-tbody");h&&(h.innerHTML=v(b(m))),L()})}),L();const g=document.getElementById("order-detail-modal");g?.addEventListener("click",w=>{w.target===g&&g.classList.add("hidden")}),document.getElementById("orders-filter-bar")?.parentElement?.parentElement?.addEventListener("click",async w=>{const h=w.target.closest(".view-comprovante-btn");if(h){w.preventDefault(),w.stopPropagation();const I=h.dataset.path;if(!I)return;const x=h.innerHTML;h.disabled=!0,h.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{let P=I;if(!I.startsWith("http")){const M=ln(cn,I);P=await ni(M)}window.open(P,"_blank")}catch(P){console.error("Erro ao abrir comprovante:",P),B.error("Não foi possível carregar o comprovante do storage.")}finally{h.disabled=!1,h.innerHTML=x}}})}function L(){document.querySelectorAll(".action-btn.view").forEach(T=>{T.addEventListener("click",()=>{const k=T.dataset.id,f=e.find(g=>g.id===k);f&&_(f)})})}async function _(T){const k=document.getElementById("order-detail-modal"),f=document.getElementById("order-modal-inner");if(!k||!f)return;const g=T.empresaId||Ae.getCurrentUser()?.companyId;if(g&&Array.isArray(T.itens))try{const K=await F.getAll("products",{field:"companyId",operator:"==",value:g});let J=!1;if(T.itens.forEach(ie=>{const he=(ie.item||"").toLowerCase().trim(),ce=K.find(pe=>(pe.name||"").toLowerCase().trim()===he);if(ce){const pe=ce.promotionalActive&&ce.promotionalPrice||ce.price;(!ie.preco||ie.preco===0)&&(ie.preco=pe,J=!0)}}),J){let ie=0;T.itens.forEach(ce=>{const pe=parseFloat(ce.preco)||0,xe=parseInt(ce.quantidade)||1;ie+=xe*pe});const he=parseFloat(T.valoresAdicionais)||0;T.value=ie+he}}catch(K){console.error("Error syncing prices with catalog:",K)}const y=(T.status||"em_montagem").toLowerCase(),w=y==="finalizado"||y==="cancelado",h=d(T.leadId,T.nome||T.leadName),I=u(T.leadId),x=l(T.lojaId),P=Array.isArray(T.itens)?T.itens.map((K,J)=>`
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${K.quantidade}x ${K.item}</span>
                        ${K.observacao?`<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${K.observacao}</small>`:""}
                    </div>
                    ${y==="em_montagem"?`
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${J}" value="${K.preco||0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    `:`
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(K.preco||0).toFixed(2)}</span>
                    `}
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1.5rem; text-align: center;">Sem itens listados.</p>',M=y==="em_montagem"?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; background: rgba(99, 102, 241, 0.03);">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Taxas / Adicionais</span>
                    <small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Frete, acréscimos, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                    <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                    <input type="number" id="detail-additional-value" value="${T.valoresAdicionais||0}"
                        step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                </div>
            </div>
        `:T.valoresAdicionais?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1rem 1.25rem;">
                <span class="lead-info-label" style="font-size:0.85rem;">Valores adicionais</span>
                <span style="color:var(--primary);font-weight:700;">R$ ${(T.valoresAdicionais||0).toFixed(2)}</span>
            </div>
        `:"",q=A(T,y),j=w?"":`
            <button id="btn-intervir" class="btn-lead-action" style="background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #a78bfa;"
                title="Enviar mensagem diretamente ao cliente sem alterar o status">
                <i class="fa-solid fa-comment-dots"></i> Intervir
            </button>`;f.innerHTML=`
            <!-- Header -->
            <div class="lead-modal-header">
                <div class="lead-modal-avatar" style="background: linear-gradient(135deg, var(--primary), #7c3aed);">
                    ${h[0]?.toUpperCase()||"P"}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${T.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${h} · ${I}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${w?"":`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="order-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="order-dropdown">
                            <button class="lead-dropdown-item" data-menu-action="atendimento_humano">
                                <i class="fa-solid fa-headset" style="color:var(--primary);"></i> Ativar Atendimento Humano
                            </button>
                        </div>
                    </div>`}
                    <button class="action-btn" id="close-order-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <!-- Status badges -->
            <div class="lead-modal-badges">
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Pedido</span>
                    ${Hd(y)}
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Loja</span>
                    <span class="badge secondary">${o(T.lojaId)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Data</span>
                    <span class="badge secondary" style="font-size:0.78rem;">${Wd(T.criadoEm||T.createdAt)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">${T.source==="catalog"?"Modo de Envio":"Tipo"}</span>
                    ${Kd(T.entrega||"entrega")}
                </div>
            </div>

            ${x?"":`
            <div class="lead-alert danger" style="margin: 1rem 1.5rem 0 1.5rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Atenção:</strong> A loja deste pedido está inoperante (inativa ou sem instância vinculada). Mensagens automáticas podem falhar.
            </div>
            `}

            <!-- Body -->
            <div class="lead-modal-body">
                <!-- Client info -->
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Cliente</span>
                        <span class="lead-info-value">${h}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${I||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Pagamento</span>
                        <span class="lead-info-value">${Qd(T.pagamento||T.formaPagamento,T.comprovanteUrl,T.empresaId)}</span>
                    </div>
                    ${T.source==="catalog"?T.entrega==="retirada"?`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Informação de Coleta</span>
                            <span class="lead-info-value" style="color:var(--primary);font-weight:600;"><i class="fa-solid fa-store"></i> Retirada na Loja</span>
                        </div>`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${T.endereco||"Não informado"}</span>
                        </div>`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${T.endereco||"-"}</span>
                        </div>
                    `}
                </div>

                <!-- Items -->
                <div class="lead-section">
                    <h4 class="lead-section-title"><i class="fa-solid fa-basket-shopping"></i> Itens do Pedido</h4>
                    <div class="order-items-block">
                        ${P}
                        ${M}
                        <div class="order-total-row">
                            <span>Total</span>
                            ${y==="em_montagem"?`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;" id="detail-order-total">R$ ${(T.value||T.total||0).toFixed(2)}</span>
                            `:`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;">R$ ${(T.value||T.total||0).toFixed(2)}</span>
                            `}
                        </div>
                    </div>
                </div>

                ${T.rejectionReason?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <strong>Motivo do Cancelamento:</strong> ${T.rejectionReason}
                </div>`:""}

                <!-- Intervention area (hidden by default) -->
                <div id="intervir-area" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title"><i class="fa-solid fa-comment-dots" style="color:#a78bfa;"></i> Enviar Mensagem ao Cliente</h4>
                        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">Esta mensagem será enviada diretamente ao cliente sem alterar o status do pedido ou o atendimento.</p>
                        <textarea id="intervir-text" placeholder="Digite sua mensagem..." rows="3"
                            style="width:100%;background:var(--surface-hover);border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                        <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
                            <button id="btn-intervir-send" class="btn-lead-action" style="background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.5);color:#a78bfa;flex:1;">
                                <i class="fa-solid fa-paper-plane"></i> Enviar Mensagem
                            </button>
                            <button id="btn-intervir-cancel" class="action-btn" style="padding:0.6rem 1rem;">
                                <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cancelation reason (shown on cancel click) -->
                <div id="cancel-container" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title" style="color:var(--danger);"><i class="fa-solid fa-circle-exclamation"></i> Motivo do Cancelamento <span style="color:#ff4d4d">*</span></h4>
                        <textarea id="cancel-reason" placeholder="Informe o motivo para o cliente..." rows="3"
                            style="width:100%;background:rgba(239,68,68,0.05);border:1px solid var(--danger);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                    </div>
                </div>
            </div>

            <!-- Footer actions -->
            ${w?"":`
            <div class="lead-modal-footer" id="modal-footer">
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    ${j}
                    ${q}
                </div>
            </div>`}
        `,k.classList.remove("hidden"),S(k,T,y)}function A(T,k){const f=T.entrega==="retirada",g=(T.pagamento||T.formaPagamento||"").toLowerCase(),y=g.includes("entrega")||g.includes("dinheiro")||g.includes("maquininha");switch(k){case"em_montagem":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="${f&&y?"em_preparo":"aguardando_pagamento"}">
                        <i class="fa-solid fa-check"></i> Aceitar Pedido
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> Cancelar Pedido
                    </button>`;case"aguardando_pagamento":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="em_preparo">
                        <i class="fa-solid fa-credit-card"></i> Confirmar Pagamento
                    </button>`;case"em_preparo":return f?`
                        <button id="btn-main-action" class="btn-lead-action" data-target="pedido_pronto">
                            <i class="fa-solid fa-box"></i> ${y?"Pronto":"Pedido Pronto"}
                        </button>`:`
                    <button id="btn-main-action" class="btn-lead-action" data-target="saiu_para_entrega">
                        <i class="fa-solid fa-truck"></i> Saiu para Entrega
                    </button>`;case"pedido_pronto":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> ${y?"Finalizar":"Entregue"}
                    </button>`;case"saiu_para_entrega":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> Entregue
                    </button>`;default:return""}}function S(T,k,f){const g=f==="finalizado"||f==="cancelado";if(document.getElementById("close-order-modal")?.addEventListener("click",()=>{T.classList.add("hidden")}),f==="em_montagem"){const q=K=>{const J=parseFloat(K);return isNaN(J)?0:J},j=()=>{let K=0;document.querySelectorAll(".item-price-input").forEach(he=>{const ce=parseInt(he.dataset.index),pe=k.itens[ce]?.quantidade||1;K+=pe*q(he.value)});const J=q(document.getElementById("detail-additional-value")?.value);K+=J;const ie=document.getElementById("detail-order-total");ie&&(ie.innerText=`R$ ${K.toFixed(2)}`)};document.querySelectorAll(".item-price-input").forEach(K=>{K.addEventListener("input",j)}),document.getElementById("detail-additional-value")?.addEventListener("input",j),j()}if(g)return;const y=document.getElementById("order-menu-trigger"),w=document.getElementById("order-dropdown");y?.addEventListener("click",q=>{q.stopPropagation(),w?.classList.toggle("hidden")}),document.addEventListener("click",()=>w?.classList.add("hidden"),{once:!0}),w?.querySelectorAll(".lead-dropdown-item").forEach(q=>{q.addEventListener("click",async()=>{w.classList.add("hidden"),q.dataset.menuAction==="atendimento_humano"&&await $(k)})});const h=document.getElementById("btn-intervir"),I=document.getElementById("intervir-area");h?.addEventListener("click",()=>{if(I){const q=I.style.display==="none";I.style.display=q?"block":"none",q&&document.getElementById("intervir-text")?.focus()}}),document.getElementById("btn-intervir-cancel")?.addEventListener("click",()=>{I&&(I.style.display="none");const q=document.getElementById("intervir-text");q&&(q.value="")}),document.getElementById("btn-intervir-send")?.addEventListener("click",async()=>{const q=document.getElementById("intervir-text"),j=q?.value.trim();if(!j){B.warning("Digite uma mensagem antes de enviar.");return}const K=document.getElementById("btn-intervir-send");K.disabled=!0,K.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';try{let J=k.instancia;J||(J=(await F.get("companies",n.companyId))?.whatsappInstance?.instanceName||"");const ie=u(k.leadId)||k.leadId;await Jn.sendInterventionMessage(n.companyId,k.leadId,J,ie,j),B.success("Mensagem enviada com sucesso!"),q.value="",I&&(I.style.display="none")}catch{B.error("Erro ao enviar mensagem."),K.disabled=!1,K.innerHTML='<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem'}});const x=document.getElementById("btn-main-action");x?.addEventListener("click",async()=>{const q=x.dataset.target;if(!q)return;let j="",K="";switch(q){case"aguardando_pagamento":j="Aceitar Pedido",K=`Deseja aceitar o pedido #${k.id.slice(-6).toUpperCase()}?`;break;case"em_preparo":j="Confirmar Pagamento",K="Confirmar que o pagamento foi recebido?";break;case"pedido_pronto":j="Pedido Pronto",K="Marcar pedido como pronto para retirada?";break;case"saiu_para_entrega":j="Saiu para Entrega",K="Marcar pedido como saiu para entrega?";break;case"finalizado":j="Pedido Entregue",K="Marcar pedido como entregue e finalizado?";break}if(await Ye.warning(j,K)){x.disabled=!0,x.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...';try{let ie;if(f==="em_montagem"){const he=We=>{const Ge=parseFloat(We);return isNaN(Ge)?0:Ge};let ce=0;const pe=Array.isArray(k.itens)?[...k.itens]:[];document.querySelectorAll(".item-price-input").forEach(We=>{const Ge=parseInt(We.dataset.index),Xe=pe[Ge]?.quantidade||1,lt=he(We.value);pe[Ge]&&(pe[Ge].preco=lt),ce+=Xe*lt});const xe=he(document.getElementById("detail-additional-value")?.value);ce+=xe,ie={value:ce,total:ce,itens:pe,valoresAdicionais:xe}}q==="em_preparo"&&(ie={...ie,manuallyConfirmed:!0}),await Jn.updateOrderStatus(k,n.companyId,q,void 0,ie),k.status=q,C(k),B.success("Pedido atualizado com sucesso!"),_(k)}catch{B.error("Erro ao atualizar pedido."),x.disabled=!1}}});const P=document.getElementById("btn-cancel"),M=document.getElementById("cancel-container");P?.addEventListener("click",async()=>{if(P.dataset.stage==="confirm"){const q=document.getElementById("cancel-reason")?.value.trim();if(!q){B.warning("Informe o motivo do cancelamento.");return}if(!await Ye.danger("Cancelar Pedido","Tem certeza que deseja cancelar este pedido?"))return;P.disabled=!0,P.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';try{await Jn.updateOrderStatus(k,n.companyId,"cancelado",q),k.status="cancelado",C(k),B.success("Pedido cancelado."),_(k)}catch{B.error("Erro ao cancelar pedido."),P.disabled=!1}}else P.dataset.stage="confirm",P.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento',M&&(M.style.display="block",document.getElementById("cancel-reason")?.focus())})}async function $(T){if(await Ye.warning("Ativar Atendimento Humano","Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado."))try{await Jn.activateHumanSupport(T.leadId),B.success("Atendimento humano ativado para o lead!")}catch{B.error("Erro ao ativar atendimento humano.")}}function C(T){const k=e.findIndex(g=>g.id===T.id);k>=0&&(e[k]={...e[k],...T});const f=document.getElementById("orders-tbody");f&&(f.innerHTML=v(b(m))),L()}},or=n=>n.imageUrl?n.imageUrl:n.imagemPath&&n.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(n.imagemPath)}?alt=media&token=${n.downloadToken}`:null,cx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const t=await F.get("companies",n.companyId),i=t?.modulos_ativos||[],s=i.includes("venda")||i.includes("agendamento")||i.includes("venda_catalogo"),r=i.includes("agendamento"),o=r?"Serviço":"Produto",l=r?"Serviços":"Produtos";let d=t?.stores||[];const u=n.role?.toLowerCase()==="owner",m=n.storeIds||(n.storeId?[n.storeId]:[]);u||(d=d.filter(P=>m.includes(P.id)));let b=u?"all":m.length===1?m[0]:"employee_all",v=new Map,R=null;if(!s)return`
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;let D=await F.getAll("products",{field:"companyId",operator:"==",value:n.companyId}),L=await F.getAll("categories",{field:"companyId",operator:"==",value:n.companyId});const _=P=>{const M=P.storeIds||(P.storeId?[P.storeId]:[]);return M.length===0?"Sem Loja":M.map(q=>{const j=d.find(K=>K.id===q);return j?j.name:"Desconhecida"}).join(", ")},A=()=>{let P=D;return b!=="all"&&b!=="employee_all"?P=D.filter(M=>M.storeIds&&M.storeIds.includes(b)||M.storeId===b):b==="employee_all"&&(P=D.filter(M=>M.storeIds&&M.storeIds.some(q=>m.includes(q))||M.storeId&&m.includes(M.storeId))),P.length===0?`<tr><td colspan="7" style="text-align:center">Nenhum ${o.toLowerCase()} encontrado.</td></tr>`:P.map(M=>`
            <tr data-product-id="${M.id}">
                <td><input type="checkbox" class="product-checkbox" data-id="${M.id}" onchange="window.updateBulkBar()"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${or(M)?`<img src="${or(M)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">`:'<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <span style="font-weight: 600;">${M.name}</span>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${_(M)}">${_(M)}</div></td>
                <td>R$ ${M.price?.toFixed(2)}</td>
                <td>
                    ${M.stock===null||M.stock===void 0?'<span class="badge info" title="Sem controle">&#8734; Ilimitado</span>':M.stock>10?`<span class="badge success">${M.stock} un.</span>`:M.stock>0?`<span class="badge" style="background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);">${M.stock} un.</span>`:'<span class="badge danger">Esgotado</span>'}
                </td>
                <td><span class="badge ${M.active?"success":"danger"}">${M.active?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editProduct('${M.id}')" title="Editar"><i style="color: #FFF;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleProductStatus('${M.id}', ${M.active})" title="${M.active?"Desativar":"Ativar"}">${M.active?'<i style="color: #FFF;" class="fa-solid fa-ban"></i>':'<i style="color: #FFF;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteProduct('${M.id}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join("")},S=()=>{const P=document.querySelector(".data-table tbody");P&&(P.innerHTML=A(),$())},$=()=>{const P=document.querySelectorAll(".product-checkbox:checked"),M=document.getElementById("bulk-actions-container"),q=document.getElementById("bulk-count");M&&q&&(P.length>0?(M.classList.remove("hidden"),q.innerText=`${P.length} item(ns) selecionado(s)`):M.classList.add("hidden"))},C=()=>{const P='<option value="">Sem Categoria</option>'+L.map(M=>`<option value="${M.id}">${M.name}</option>`).join("");document.querySelectorAll(".item-category, #bulk-assign-cat").forEach(M=>{const q=M.value;M.innerHTML=P,M.value=q})},T=()=>{const P=document.getElementById("categories-list");if(P){if(L.length===0){P.innerHTML='<p style="text-align:center; color:var(--text-dim);">Nenhuma categoria criada.</p>';return}P.innerHTML=L.map(M=>`
            <div class="category-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fa-solid ${M.icon}" style="color:var(--primary); width:20px; text-align:center;"></i>
                    <span id="cat-name-text-${M.id}">${M.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="action-btn" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-color);" onclick="window.openEditCategoryModal('${M.id}', '${M.name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444;" onclick="window.deleteCategory('${M.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join("")}},k=P=>{const M=document.getElementById("catalog-link-container"),q=document.getElementById("catalog-url-display"),j=document.getElementById("btn-open-catalog");if(!(!M||!q||!j))if(P==="all"||P==="employee_all")M.classList.add("hidden");else{const K=`${window.location.origin}/catalog/${P}`;q.value=K,j.href=K,M.classList.remove("hidden")}},f=async(P,M)=>{const q=`img_${Date.now()}_${Math.random().toString(36).substr(2,5)}`,j=ln(cn,`products/${M}/${q}_${P.name}`);await Li(j,P);const K=await ni(j),J=new URL(K);return{imagemPath:j.fullPath,downloadToken:J.searchParams.get("token")||""}},g=(P,M="",q="",j=null,K=!1,J="",ie="",he="",ce=null)=>{const pe=L.map(xe=>`<option value="${xe.id}" ${xe.id===he?"selected":""}>${xe.name}</option>`).join("");return`
            <div class="product-item-card" id="card-${P}">
                 <div class="item-visual">
                    <div class="image-preview-wrapper" id="preview-wrapper-${P}">
                        ${j?`<img src="${j}" class="preview-img">`:'<div class="preview-placeholder"><i class="fa-solid fa-image"></i></div>'}
                        <div class="upload-progress-overlay hidden" id="progress-${P}">
                            <div class="spinner-small"></div>
                        </div>
                    </div>
                    ${!j||P!=="edit-item"?`
                    <button type="button" class="btn-change-img" data-id="${P}">
                        <i class="fa-solid fa-camera"></i>
                    </button>
                    `:""}
                    <input type="file" id="file-${P}" accept="image/*" style="display: none;">
                 </div>
                 
                 <div class="item-details">
                    <div class="input-row">
                        <div class="field">
                            <label>Nome do ${o}</label>
                            <input type="text" name="name-${P}" value="${M}" class="item-name" placeholder="${r?"Ex: Corte de Cabelo":"Ex: Tênis Esportivo Nitro"}" required>
                        </div>
                        <div class="field price-field">
                            <label>Preço (R$)</label>
                            <input type="number" name="price-${P}" value="${q}" class="item-price" placeholder="0,00" step="0.01" required>
                        </div>
                    </div>

                    <div class="input-row" style="margin-top: 12px;">
                        <div class="field">
                            <label>Categoria</label>
                            <select name="category-${P}" class="item-category" style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;">
                                <option value="">Sem Categoria</option>
                                ${pe}
                            </select>
                        </div>
                        <div class="field price-field">
                            <label>Estoque <span style="color:var(--text-dim);font-weight:400;">(vazio = ilimitado)</span></label>
                            <input type="number" name="stock-${P}" value="${ce??""}" class="item-stock" placeholder="Ilimitado" min="0" step="1">
                        </div>
                    </div>
                    
                    <div class="promotional-section" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                        <label class="promotional-toggle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
                            <input type="checkbox" name="promotional-active-${P}" class="promotional-checkbox" ${K?"checked":""} style="width: 16px; height: 16px;">
                            <i class="fa-solid fa-tag"></i> Ativar Promoção
                        </label>
                        
                        <div class="promotional-fields ${K?"":"hidden"}" id="promotional-fields-${P}" style="margin-top: 10px; border-radius: 8px; background: rgba(99, 102, 241, 0.05); padding: 12px; border: 1px solid rgba(99, 102, 241, 0.2);">
                            <div class="input-row">
                                <div class="field">
                                    <label>Título da Promoção</label>
                                    <input type="text" name="promotional-name-${P}" value="${J}" placeholder="Ex: Oferta Relâmpago!" class="promotional-name-input">
                                </div>
                                <div class="field price-field">
                                    <label>Preço Promo (R$)</label>
                                    <input type="number" name="promotional-price-${P}" value="${ie}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${P}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `},y=P=>{const M=document.querySelector(`#card-${P} .btn-change-img`),q=document.getElementById(`file-${P}`);M&&q&&(M.addEventListener("click",()=>q.click()),q.addEventListener("change",()=>{if(q.files&&q.files[0]){const J=q.files[0];v.set(P,J);const ie=new FileReader;ie.onload=he=>{const ce=document.getElementById(`preview-wrapper-${P}`);ce&&(ce.innerHTML=`<img src="${he.target?.result}" class="preview-img">
                                                 <div class="upload-progress-overlay hidden" id="progress-${P}"><div class="spinner-small"></div></div>`)},ie.readAsDataURL(J)}}));const j=document.querySelector(`input[name="promotional-active-${P}"]`),K=document.getElementById(`promotional-fields-${P}`);j&&K&&j.addEventListener("change",()=>{j.checked?K.classList.remove("hidden"):K.classList.add("hidden")})},w=P=>{const M=document.getElementById("products-list-container"),q=document.getElementById("empty-list-msg");!M||!q||Array.from(P).forEach(j=>{const K=`prod_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;v.set(K,j);const J=j.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "),ie=g(K,J,"");M.insertAdjacentHTML("beforeend",ie),q.style.display="none",y(K);const he=new FileReader;he.onload=ce=>{const pe=document.getElementById(`preview-wrapper-${K}`);pe&&(pe.innerHTML=`<img src="${ce.target?.result}" class="preview-img">
                                          <div class="upload-progress-overlay hidden" id="progress-${K}"><div class="spinner-small"></div></div>`)},he.readAsDataURL(j)})};window.editProduct=async P=>{const M=D.find(q=>q.id===P);if(M){R=P,v.clear(),document.getElementById("modal-title").innerText=`Editar ${o}`,document.getElementById("bulk-upload-section").style.display="none",u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>{J.checked=(M.storeIds||[]).includes(J.value)});const q=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");if(q&&j){q.innerHTML="",j.style.display="none";const K=or(M);q.innerHTML=g("edit-item",M.name,M.price,K,M.promotionalActive,M.promotionalName,M.promotionalPrice,M.categoryId,M.stock),setTimeout(()=>y("edit-item"),0)}document.getElementById("product-modal").classList.remove("hidden")}},window.toggleProductStatus=async(P,M)=>{try{await F.update("products",P,{active:!M});const q=D.find(j=>j.id===P);q&&(q.active=!M),S(),B.success(`${o} ${M?"desativado":"ativado"} com sucesso!`)}catch(q){B.error("Erro ao atualizar status: "+q)}},window.deleteProduct=async P=>{if(await Ye.danger(`Excluir ${o}`,`Tem certeza que deseja EXCLUIR este ${o.toLowerCase()}? Esta ação não pode ser desfeita.`))try{const q=D.find(j=>j.id===P);if(q){const j=or(q),K=q.imagemPath;if(j||K)try{const J=K?ln(cn,K):ln(cn,j);await H_(J)}catch(J){console.warn("Could not delete image from storage:",J)}}await F.delete("products",P),D=D.filter(j=>j.id!==P),S(),B.success(`${o} excluído com sucesso!`)}catch(q){B.error("Erro ao excluir: "+q)}},window.openProductModal=()=>{R=null,v.clear();const P=document.getElementById("modal-title"),M=document.getElementById("bulk-upload-section"),q=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");P&&(P.innerText=`Adicionar ${l}`),M&&(M.style.display="block"),q&&(q.innerHTML=""),j&&(j.style.display="block"),u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>J.checked=!1),document.getElementById("product-modal")?.classList.remove("hidden")},window.closeModals=()=>{document.getElementById("product-modal")?.classList.add("hidden"),document.getElementById("category-modal")?.classList.add("hidden"),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),document.getElementById("migration-modal")?.classList.add("hidden")},window.handleBulkFileSelection=P=>{P.files&&(w(P.files),P.value="")},window.addManualItem=()=>{const P=`manual_${Date.now()}`,M=document.getElementById("products-list-container"),q=document.getElementById("empty-list-msg");if(M&&q){const j=g(P);M.insertAdjacentHTML("beforeend",j),q.style.display="none",y(P)}},window.removeProductItem=P=>{const M=document.getElementById(`card-${P}`);M&&M.remove(),v.delete(P);const q=document.getElementById("products-list-container");if(q&&q.children.length===0){const j=document.getElementById("empty-list-msg");j&&(j.style.display="block")}},window.saveProducts=async()=>{const P=document.getElementById("btn-save-products-trigger");if(!P)return;P.disabled=!0;const M=P.innerHTML;P.innerHTML='<div class="spinner-small"></div> <span>Salvando...</span>';const j=document.getElementById("products-list-container")?.querySelectorAll(".product-item-card");if(!j||j.length===0){B.warning(`Adicione pelo menos um ${o.toLowerCase()}.`),P.disabled=!1,P.innerHTML=M;return}let K=[];if(u){const J=document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');K=Array.from(J).map(ie=>ie.value)}else n.storeId?K=[n.storeId]:n.storeIds&&n.storeIds.length>0&&(K=n.storeIds);if(K.length===0){B.warning("Selecione pelo menos uma loja para este(s) produto(s)."),P.disabled=!1,P.innerHTML=M;return}try{for(const J of Array.from(j)){const ie=J.id.replace("card-",""),he=J.querySelector(".item-name").value,ce=parseFloat(J.querySelector(".item-price").value),pe=J.querySelector(".item-category").value,xe=J.querySelector(".promotional-checkbox").checked,We=J.querySelector(".promotional-name-input").value,Ge=parseFloat(J.querySelector(".promotional-price-input").value)||0,Xe=J.querySelector(".item-stock").value,lt=Xe!==""?parseInt(Xe):null,gt=document.getElementById(`progress-${ie}`);gt&&gt.classList.remove("hidden");let ct={};v.has(ie)&&(ct=await f(v.get(ie),n.companyId));const It={name:he,price:ce||0,categoryId:pe,storeIds:K,companyId:n.companyId,active:!0,promotionalActive:xe,promotionalName:We,promotionalPrice:Ge,stock:lt,...ct};if(R&&ie==="edit-item"){await F.update("products",R,It);const tt=D.findIndex(ge=>ge.id===R);tt!==-1&&(D[tt]={...D[tt],...It})}else{const tt=await F.create("products",It);D.push({id:tt,...It})}gt&&gt.classList.add("hidden")}B.success(`${l} salvo(s) com sucesso!`),window.closeModals(),S(),P.disabled=!1,P.innerHTML=M}catch(J){console.error("Error saving products:",J),B.error(`Erro ao salvar ${l.toLowerCase()}.`),P.disabled=!1,P.innerHTML=M}},window.saveCategory=async P=>{P.preventDefault();const M=document.getElementById("cat-name"),q=document.getElementById("cat-icon"),j=M.value.trim(),K=q.value;if(j)try{const J=await F.create("categories",{name:j,icon:K,companyId:n.companyId});L.push({id:J,name:j,icon:K,companyId:n.companyId}),M.value="",T(),C(),B.success("Categoria criada com sucesso!")}catch{B.error("Erro ao criar categoria.")}},window.deleteCategory=async P=>{if(await Ye.warning("Excluir Categoria",'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".'))try{await F.delete("categories",P),L=L.filter(M=>M.id!==P),T(),C(),D.forEach(M=>{M.categoryId===P&&(M.categoryId="")}),B.success("Categoria excluída.")}catch{B.error("Erro ao excluir categoria.")}},window.openEditCategoryModal=(P,M)=>{const q=document.getElementById("edit-cat-name-input");q&&(q.value=M,q.dataset.catId=P,document.getElementById("edit-cat-name-modal")?.classList.remove("hidden"))},window.updateCategoryName=async()=>{const P=document.getElementById("edit-cat-name-input"),M=P.dataset.catId,q=P.value.trim();if(M&&q)try{await F.update("categories",M,{name:q});const j=L.find(K=>K.id===M);j&&(j.name=q),T(),C(),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),B.success("Nome atualizado!")}catch{B.error("Erro ao atualizar nome.")}},window.openCategoryModal=()=>{T();const P=document.getElementById("icon-picker");P&&(P.innerHTML=h.map(M=>`
                <div class="icon-option ${M==="fa-tag"?"selected":""}" data-icon="${M}" onclick="window.selectCategoryIcon(this, '${M}')">
                    <i class="fa-solid ${M}"></i>
                </div>
            `).join("")),document.getElementById("category-modal")?.classList.remove("hidden")},window.selectCategoryIcon=(P,M)=>{const q=document.getElementById("icon-picker");q&&(q.querySelectorAll(".icon-option").forEach(j=>j.classList.remove("selected")),P.classList.add("selected"),document.getElementById("cat-icon").value=M)},window.setStoreFilter=(P,M)=>{document.querySelectorAll(".filter-pill").forEach(q=>q.classList.remove("active")),M.classList.add("active"),b=P,k(P),S()},window.toggleAllCheckboxes=P=>{const M=P.checked;document.querySelectorAll(".product-checkbox").forEach(q=>q.checked=M),$()},window.updateBulkBar=$,window.applyBulkCategory=async()=>{const P=document.getElementById("bulk-assign-cat").value;if(!P){B.warning("Selecione uma categoria.");return}const M=Array.from(document.querySelectorAll(".product-checkbox:checked")).map(j=>j.dataset.id),q=document.getElementById("btn-bulk-save");q&&(q.innerHTML='<div class="spinner-small"></div>');try{await Promise.all(M.map(j=>F.update("products",j,{categoryId:P}))),D.forEach(j=>{M.includes(j.id)&&(j.categoryId=P)}),B.success(`${M.length} produtos atualizados!`),window.cancelBulkActions(),S()}catch{B.error("Erro ao processar em massa.")}finally{q&&(q.innerText="Aplicar")}},window.cancelBulkActions=()=>{document.querySelectorAll(".product-checkbox").forEach(M=>M.checked=!1);const P=document.getElementById("select-all-products");P&&(P.checked=!1),$()};const h=["fa-utensils","fa-burger","fa-pizza-slice","fa-ice-cream","fa-coffee","fa-beer","fa-wine-glass","fa-apple-whole","fa-carrot","fa-bowl-food","fa-cake-candles","fa-candy-cane","fa-cookie","fa-glass-water","fa-mug-hot","fa-bag-shopping","fa-shirt","fa-shoe-prints","fa-glasses","fa-watch","fa-laptop","fa-mobile-screen","fa-gamepad","fa-headphones","fa-camera","fa-tv","fa-microchip","fa-car","fa-bicycle","fa-plane","fa-bus","fa-train","fa-ship","fa-anchor","fa-heart","fa-star","fa-bolt","fa-fire","fa-leaf","fa-tree","fa-sun","fa-moon","fa-droplet","fa-cloud","fa-music","fa-film","fa-book","fa-pencil","fa-palette","fa-briefcase","fa-home","fa-medkit","fa-dumbbell","fa-basketball","fa-soccer-ball","fa-baseball","fa-volleyball","fa-tag"];setTimeout(()=>{k(b);const P=document.getElementById("btn-copy-catalog");P&&(P.onclick=()=>{const K=document.getElementById("catalog-url-display")?.value;K&&navigator.clipboard.writeText(K).then(()=>B.success("Link do catálogo copiado!"))});const M=document.getElementById("btn-bulk-save"),q=document.getElementById("btn-bulk-cancel");M&&(M.onclick=()=>window.applyBulkCategory()),q&&(q.onclick=()=>window.cancelBulkActions());const j=document.getElementById("bulk-upload-section");j&&(j.addEventListener("dragover",K=>{K.preventDefault(),j.classList.add("drag-active")}),j.addEventListener("dragleave",()=>j.classList.remove("drag-active")),j.addEventListener("drop",K=>{K.preventDefault(),j.classList.remove("drag-active"),K.dataTransfer?.files&&w(K.dataTransfer.files)}))},100);const I=`
        <div id="category-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 500px;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <h2>Gerenciar Categorias</h2>
                <p class="text-muted">Crie categorias para organizar seus ${l.toLowerCase()}.</p>
                
                <form id="category-form" style="margin-top: 20px;" onsubmit="window.saveCategory(event)">
                    <div class="form-group">
                        <label>Nome da Categoria</label>
                        <input type="text" id="cat-name" placeholder="Ex: Bebidas, Sobremesas..." required>
                    </div>
                    <div class="form-group">
                        <label>Ícone (Selecione um)</label>
                        <div class="icon-picker-grid" id="icon-picker">
                            <!-- Icons will be injected here -->
                        </div>
                        <input type="hidden" id="cat-icon" value="fa-tag">
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Categoria</button>
                </form>

                <div id="categories-list" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                    <!-- Existing categories will be listed here -->
                </div>
            </div>
        </div>

        <div id="edit-cat-name-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 400px; padding: 30px;">
                 <span class="close-modal" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">&times;</span>
                 <h3>Editar Nome</h3>
                 <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 20px;">Altere o nome da categoria selecionada.</p>
                 <div class="form-group">
                    <input type="text" id="edit-cat-name-input" style="width: 100%;" required>
                 </div>
                 <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn-secondary full-width" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">Cancelar</button>
                    <button class="btn-primary full-width" onclick="window.updateCategoryName()">Salvar</button>
                 </div>
            </div>
        </div>
    `,x=`
        <div id="product-modal" class="modal hidden">
            <div class="modal-content glass big-modal" style="display: flex; flex-direction: column; max-height: 90vh;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <div style="padding: 0 20px 20px 0;">
                    <h2 id="modal-title" style="margin-bottom: 5px;">Gerenciar ${l}</h2>
                    <p class="text-muted" style="font-size: 0.9rem;">Adicione ou edite ${l.toLowerCase()} do seu catálogo.</p>
                </div>
                
                <div style="overflow-y: auto; padding-right: 10px; flex: 1;">
                    ${u?`
                    <div class="form-group" id="store-select-group">
                        <label>Lojas de Destino (selecione uma ou mais)</label>
                        <div id="multi-store-container" class="multi-select-grid">
                            ${d.map(P=>`
                                <label class="store-checkbox-card">
                                    <input type="checkbox" name="store-ids" value="${P.id}">
                                    <span class="checkbox-label">${P.name}</span>
                                </label>
                            `).join("")}
                        </div>
                    </div>
                    `:""}

                    <div id="bulk-upload-section" class="bulk-dropzone" onclick="document.getElementById('bulk-file-input').click()">
                        <input type="file" id="bulk-file-input" multiple accept="image/*" style="display: none;" onchange="window.handleBulkFileSelection(this)">
                        <div class="dropzone-content">
                            <div class="dropzone-icon">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <h3>Importação por Imagem</h3>
                            <p>Arraste fotos dos seus ${l.toLowerCase()} aqui ou <span>clique para navegar</span></p>
                            <small>Formatos: JPG, PNG, WebP (máx 5MB/foto)</small>
                        </div>
                    </div>

                    <form id="create-product-form">
                        <div id="products-list-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                            <!-- Items will be injected here -->
                        </div>

                        <div id="empty-list-msg" style="text-align: center; color: var(--text-dim); padding: 40px 20px; border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 10px;">
                            <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                            Nenhum ${o.toLowerCase()} na lista de envio.
                        </div>
                    </form>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                     <button type="button" class="btn-text" style="display: flex; align-items: center; gap: 8px;" onclick="window.addManualItem()">
                        <i class="fa-solid fa-plus-circle"></i> Item Manual
                     </button>
                     <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-secondary" onclick="window.closeModals()">Cancelar</button>
                        <button type="button" id="btn-save-products-trigger" class="btn-primary" style="min-width: 160px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.saveProducts()">
                            <i class="fa-solid fa-save"></i> <span>Salvar ${l}</span>
                        </button>
                     </div>
                </div>
            </div>
        </div>
    `;return`
        <style>
            .bulk-dropzone {
                margin-top: 10px;
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.02);
            }
            .bulk-dropzone:hover, .bulk-dropzone.drag-active {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }
            .dropzone-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 12px; opacity: 0.8; }
            .dropzone-content h3 { margin-bottom: 4px; font-size: 1.1rem; }
            .dropzone-content p { color: var(--text-muted); font-size: 0.9rem; }
            .dropzone-content span { color: var(--primary); font-weight: 600; text-decoration: underline; }

            .product-item-card {
                display: flex;
                gap: 16px;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 16px;
                position: relative;
                transition: transform 0.2s, border-color 0.2s;
            }
            .product-item-card:hover { border-color: rgba(99, 102, 241, 0.3); }

            .item-visual { position: relative; width: 100px; }
            .image-preview-wrapper {
                width: 100px; height: 100px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px; overflow: hidden;
                display: flex; align-items: center; justify-content: center;
                border: 1px solid var(--border-color);
            }
            .preview-img { width: 100%; height: 100%; object-fit: cover; }
            .preview-placeholder { font-size: 2rem; color: var(--text-dim); }

            .btn-change-img {
                position: absolute; bottom: -8px; right: -8px;
                width: 32px; height: 32px;
                background: var(--primary); color: white;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 0.8rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid var(--surface-hover);
            }

            .item-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .input-row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
            .field label { font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block; }
            .field input {
                width: 100%; background: var(--bg-color);
                border: 1px solid var(--border-color); color: white;
                padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;
            }
            .field input:focus { border-color: var(--primary); outline: none; }

            .btn-remove-item {
                position: absolute; top: 8px; right: 8px;
                width: 24px; height: 24px;
                color: var(--text-dim); font-size: 1rem; opacity: 0.5;
            }
            .btn-remove-item:hover { color: var(--danger); opacity: 1; }

            .upload-progress-overlay {
                position: absolute; inset: 0;
                background: rgba(0,0,0,0.6);
                display: flex; align-items: center; justify-content: center; z-index: 5;
            }
            .spinner-small {
                width: 20px; height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }

            .btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-main); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); }

            .multi-select-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 8px; padding: 12px;
                background: var(--surface-hover); border-radius: 12px; border: 1px solid var(--border-color);
            }
            .store-checkbox-card {
                cursor: pointer; display: flex; align-items: center; gap: 8px;
                padding: 8px 12px; background: var(--bg-color);
                border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s;
            }
            .store-checkbox-card:has(input:checked) { border-color: var(--primary); background: rgba(99,102,241,0.1); }
            .store-checkbox-card input { width: 16px; height: 16px; cursor: pointer; }
            .checkbox-label { font-size: 0.85rem; font-weight: 500; }

            .store-filter-container {
                display: flex; gap: 8px;
                background: var(--surface-hover); padding: 4px;
                border-radius: 12px; border: 1px solid var(--border-color);
                overflow-x: auto; max-width: calc(100vw - 400px);
            }
            .filter-pill {
                padding: 6px 16px; border-radius: 8px;
                font-size: 0.85rem; font-weight: 600;
                color: var(--text-muted); white-space: nowrap; transition: all 0.2s;
            }
            .filter-pill:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
            .filter-pill.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }

            .icon-picker-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                gap: 8px; max-height: 200px; overflow-y: auto;
                background: rgba(0,0,0,0.2); padding: 10px;
                border-radius: 8px; border: 1px solid var(--border-color); margin-top: 5px;
            }
            .icon-option {
                width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                background: var(--surface-hover); border: 1px solid var(--border-color);
                border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1.2rem;
            }
            .icon-option:hover { border-color: var(--primary); }
            .icon-option.selected { background: var(--primary); border-color: var(--primary); color: white; }

            .category-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px; background: rgba(255,255,255,0.03);
                border-radius: 10px; margin-bottom: 10px;
                border: 1px solid var(--border-color);
            }
            #categories-list { max-height: 250px; overflow-y: auto; padding-right: 5px; }
            #categories-list::-webkit-scrollbar { width: 4px; }
            #categories-list::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

            .btn-text { background: transparent; color: var(--primary); border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
            .btn-text:hover { text-decoration: underline; }

            .bulk-actions-bar {
                display: flex; align-items: center; gap: 15px;
                background: var(--primary); color: white;
                padding: 12px 20px; border-radius: 12px; margin-bottom: 20px;
                box-shadow: 0 10px 20px var(--primary-glow); animation: slideInUp 0.3s;
            }
            @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .bulk-select-cat {
                background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
                color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; outline: none;
            }
            .bulk-select-cat option { background: var(--surface); color: white; }
        </style>

        <div class="page-container">
            <div class="page-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                     <h2 class="page-title" style="margin-bottom: 4px;">${r?"Catálogo de Serviços":"Catálogo de Produtos"}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${r?"Gerencie os serviços oferecidos pela sua empresa.":"Gerencie os produtos visíveis no cardápio das suas lojas."}</p>
                </div>
                
                <div id="catalog-link-container" class="hidden" style="flex: 1; min-width: 300px; max-width: 500px; background: rgba(99,102,241,0.1); border: 1px dashed var(--primary); border-radius: 12px; padding: 10px 15px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <div style="flex: 1; overflow: hidden;">
                        <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 2px;">Link do Catálogo</span>
                        <input type="text" id="catalog-url-display" readonly style="width: 100%; background: transparent; border: none; color: white; font-size: 0.85rem; text-overflow: ellipsis; outline: none;" value="">
                    </div>
                    <button id="btn-copy-catalog" class="btn-primary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-copy"></i> Copiar
                    </button>
                    <a id="btn-open-catalog" href="" target="_blank" class="btn-secondary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-external-link"></i>
                    </a>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button class="btn-secondary" onclick="window.openCategoryModal()"><i class="fa-solid fa-tags"></i> Categorias</button>
                    <button class="btn-primary" onclick="window.openProductModal()"><i style="color: #fff;" class="fa-solid fa-plus"></i> Novo ${o}</button>
                </div>
            </div>

            ${u?`
            <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Filtrar por Loja:</span>
                <div class="store-filter-container" id="store-pills-filter">
                    <button class="filter-pill ${b==="all"?"active":""}" onclick="window.setStoreFilter('all', this)">Todas</button>
                    ${d.map(P=>`
                        <button class="filter-pill ${b===P.id?"active":""}" onclick="window.setStoreFilter('${P.id}', this)">${P.name}</button>
                    `).join("")}
                </div>
            </div>
            `:""}
        </div>

        <div class="card">
            <div class="table-container">
                <div id="bulk-actions-container" class="hidden">
                    <div class="bulk-actions-bar">
                        <span id="bulk-count" style="font-weight: 700;">0 itens selecionados</span>
                        <div style="height: 20px; width: 1px; background: rgba(255,255,255,0.3);"></div>
                        <span>Mover para categoria:</span>
                        <select id="bulk-assign-cat" class="bulk-select-cat">
                            <option value="">Selecione...</option>
                            ${L.map(P=>`<option value="${P.id}">${P.name}</option>`).join("")}
                        </select>
                        <button id="btn-bulk-save" class="btn-primary" style="background: white; color: var(--primary); padding: 6px 15px; font-size: 0.85rem;">Aplicar</button>
                        <button id="btn-bulk-cancel" style="background:transparent; border:none; color:white; font-size: 0.85rem; cursor:pointer;">Cancelar</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" id="select-all-products" onchange="window.toggleAllCheckboxes(this)"></th>
                            <th>${o}</th>
                            <th>Loja</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${A()}
                    </tbody>
                </table>
            </div>
        </div>
        ${x}
        ${I}
    `},dx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";let i=(await F.get("companies",n.companyId))?.stores||[];const s=n.role==="owner",r=()=>i.length===0?'<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>':i.map(l=>{const d=l.active&&l.instancia_id,u=l.frete_ativo!==!1;return`
            <tr data-store-id="${l.id}">
                <td>${l.name}</td>
                <td>${l.address}</td>
                <td><span class="badge ${d?"success":"danger"}">${d?"Operante":l.active?"Sem Instância":"Inativa"}</span></td>
                <td><span class="badge ${u?"success":"warning"}">${u?"Frete Ativo":"N/A: Retirada Apenas"}</span></td>
                <td>
                    <div class="actions">
                        ${s?`
                            <button class="action-btn" onclick="window.toggleStoreStatus('${l.id}', ${l.active})" title="${l.active?"Desativar Loja":"Ativar Loja"}">
                                ${l.active?'<i style="color: #FFF;" class="fa-solid fa-store-slash"></i>':'<i style="color: #FFF;" class="fa-solid fa-store"></i>'}
                            </button>
                            <button class="action-btn" onclick="window.toggleStoreFrete('${l.id}', ${u})" title="${u?"Desativar Frete":"Ativar Frete"}">
                                ${u?'<i style="color: #FFF;" class="fa-solid fa-truck-ramp-box"></i>':'<i style="color: #FFF;" class="fa-solid fa-truck"></i>'}
                            </button>
                        `:""}
                    </div>
                </td>
            </tr>
        `}).join(""),o=()=>{const l=document.querySelector(".data-table tbody");l&&(l.innerHTML=r())};return window.toggleStoreFrete=async(l,d)=>{try{const u=!d,m=i.map(b=>b.id===l?{...b,frete_ativo:u}:b);await F.update("companies",n.companyId,{stores:m}),i=m,o(),B.success(`Frete da loja atualizado para ${u?"ativo":"inativo"}.`)}catch(u){B.error("Erro ao atualizar frete: "+u)}},window.toggleStoreStatus=async(l,d)=>{const u=d?"desativar":"ativar";if(await Ye.warning(`${u.charAt(0).toUpperCase()+u.slice(1)} Loja`,`Deseja ${u} esta loja?`))try{const b=i.map(v=>v.id===l?{...v,active:!d}:v);await F.update("companies",n.companyId,{stores:b}),i=b,o(),B.success(`Loja ${d?"desativada":"ativada"} com sucesso!`)}catch(b){B.error("Erro ao atualizar status: "+b)}},`
        <div class="page-header">
            <h2 class="page-title">Minhas Lojas</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome da Loja</th>
                            <th>Endereço</th>
                            <th>Status Operacional</th>
                            <th>Status Frete</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card" style="margin-top: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-info-circle"></i> Informação</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                Apenas o administrador da plataforma pode criar, editar ou excluir lojas.<br>
                Como dono da empresa, você pode apenas ativar ou desativar lojas existentes.
            </p>
        </div>
    `},Yd=async()=>{let n=await F.getAll("users");const e=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>':n.map(r=>`
            <tr data-user-id="${r.id}">
                <td>${r.name||"-"}</td>
                <td>${r.email}</td>
                <td><span class="badge info">${r.role}</span></td>
                <td><span class="badge ${r.companyId?"warning":"success"}">${r.companyId?"Vinculado":"Global"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editAdminUser('${r.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),t=`
        <div id="admin-user-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2>Editar Usuário</h2>
                <form id="edit-user-form">
                    <input type="hidden" id="user-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="user-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email (Apenas Leitura)</label>
                        <input type="email" id="user-email" disabled>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Alterações</button>
                </form>
            </div>
        </div>
    `,i=()=>{const r=document.querySelector(".data-table tbody");r&&(r.innerHTML=e())};return window.editAdminUser=r=>{const o=n.find(l=>l.id===r||l.uid===r);o&&(document.getElementById("user-uid").value=o.id,document.getElementById("user-name").value=o.name||"",document.getElementById("user-email").value=o.email||"",document.getElementById("admin-user-modal").classList.remove("hidden"))},setTimeout(()=>{s()},100),`
        <div class="page-header">
            <h2 class="page-title">Usuários da Plataforma</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Função</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e()}
                    </tbody>
                </table>
            </div>
        </div>
        ${t}
    `;function s(){const r=document.getElementById("admin-user-modal"),o=document.querySelector(".close-modal"),l=document.getElementById("edit-user-form");o&&r&&(o.onclick=()=>r.classList.add("hidden")),l&&(l.onsubmit=async d=>{d.preventDefault();const u=document.getElementById("user-uid").value,m=document.getElementById("user-name").value;try{await F.update("users",u,{name:m});const b=n.find(v=>v.id===u);b&&(b.name=m),i(),B.success("Usuário atualizado com sucesso!"),r&&r.classList.add("hidden")}catch(b){console.error(b),B.error("Erro ao atualizar: "+b)}})}};class jh{container;inputWrapper;searchInput;dropdown;options;selectedValues;onChange;maxVisibleTags;placeholder;constructor(e,t,i=[],s=()=>{},r="Selecione...",o=10){this.options=t,this.selectedValues=new Set(i),this.onChange=s,this.maxVisibleTags=o,this.placeholder=r;const l=document.getElementById(e);if(!l)throw new Error(`Container #${e} not found`);this.container=l,this.container.className="multi-select-container",this.inputWrapper=this.createInputWrapper(),this.searchInput=this.createSearchInput(),this.dropdown=this.createDropdown(),this.inputWrapper.appendChild(this.searchInput),this.container.appendChild(this.inputWrapper),this.container.appendChild(this.dropdown),this.setupEventListeners(),this.render()}createInputWrapper(){const e=document.createElement("div");return e.className="multi-select-input",e}createSearchInput(){const e=document.createElement("input");return e.type="text",e.className="multi-select-search",e.placeholder=this.selectedValues.size===0?this.placeholder:"",e}createDropdown(){const e=document.createElement("div");return e.className="multi-select-dropdown",e}setupEventListeners(){this.inputWrapper.addEventListener("click",e=>{e.stopPropagation(),this.searchInput.focus(),this.openDropdown()}),this.searchInput.addEventListener("input",()=>{this.renderDropdown(),this.openDropdown()}),this.searchInput.addEventListener("keydown",e=>{if(e.key==="Backspace"&&this.searchInput.value===""&&this.selectedValues.size>0){const t=Array.from(this.selectedValues).pop();t&&this.toggleOption(t)}}),document.addEventListener("click",e=>{this.container.contains(e.target)||this.closeDropdown()})}openDropdown(){this.dropdown.classList.add("active"),this.inputWrapper.classList.add("active")}closeDropdown(){this.dropdown.classList.remove("active"),this.inputWrapper.classList.remove("active"),this.searchInput.value="",this.renderDropdown()}render(){this.renderTags(),this.renderDropdown()}renderTags(){this.inputWrapper.querySelectorAll(".multi-select-tag, .multi-select-more").forEach(s=>s.remove());const t=Array.from(this.selectedValues);if(t.slice(0,this.maxVisibleTags).forEach(s=>{const r=this.options.find(o=>o.value===s);if(r){const o=this.createTag(r);this.inputWrapper.insertBefore(o,this.searchInput)}}),t.length>this.maxVisibleTags){const s=document.createElement("span");s.className="multi-select-more",s.textContent=`+${t.length-this.maxVisibleTags}`,this.inputWrapper.insertBefore(s,this.searchInput)}this.searchInput.placeholder=this.selectedValues.size===0?this.placeholder:""}createTag(e){const t=document.createElement("div");t.className="multi-select-tag";const i=document.createElement("span");i.textContent=e.label;const s=document.createElement("button");return s.className="multi-select-tag-remove",s.innerHTML='<i class="fa-solid fa-xmark"></i>',s.onclick=r=>{r.stopPropagation(),this.toggleOption(e.value)},t.appendChild(i),t.appendChild(s),t}renderDropdown(){this.dropdown.innerHTML="";const e=this.searchInput.value.toLowerCase(),t=this.options.filter(i=>i.label.toLowerCase().includes(e)||i.meta&&i.meta.toLowerCase().includes(e));if(t.length===0){const i=document.createElement("div");i.className="multi-select-no-results",i.textContent="Nenhum resultado encontrado",this.dropdown.appendChild(i);return}t.forEach(i=>{const s=this.createOption(i);this.dropdown.appendChild(s)})}createOption(e){const t=document.createElement("div");t.className="multi-select-option",this.selectedValues.has(e.value)&&t.classList.add("selected");const i=document.createElement("div");i.className="multi-select-checkbox";const s=document.createElement("div");if(s.className="multi-select-option-label",s.textContent=e.label,t.appendChild(i),t.appendChild(s),e.meta){const r=document.createElement("div");r.className="multi-select-option-meta",r.textContent=e.meta,t.appendChild(r)}return t.addEventListener("click",r=>{r.stopPropagation(),this.toggleOption(e.value),this.searchInput.value="",this.searchInput.focus(),this.renderDropdown()}),t}toggleOption(e){this.selectedValues.has(e)?this.selectedValues.delete(e):this.selectedValues.add(e),this.renderTags(),this.renderDropdown(),this.onChange(Array.from(this.selectedValues))}getValues(){return Array.from(this.selectedValues)}setValues(e){this.selectedValues=new Set(e),this.render()}destroy(){this.container.innerHTML=""}}const ux=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";const i=(await F.get("companies",n.companyId))?.stores||[];let s=null,o=(await F.getAll("users",{field:"companyId",operator:"==",value:n.companyId})).filter(v=>v.role==="employee");const l=v=>{let R=[];return!v||(typeof v=="string"?R=v===""?[]:[v]:R=v,R.length===0)?"Todas":R.map(L=>{const _=i.find(A=>A.id===L);return _?_.name:L}).join(", ")},d=()=>o.length===0?'<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>':o.map(v=>`
            <tr data-user-id="${v.id}">
                <td>${v.name||"Sem Nome"}</td>
                <td>${v.email}</td>
                <td><span class="badge primary">Atendente</span></td>
                <td>${l(v.storeIds||v.storeId)}</td>
                <td><span class="badge ${v.active!==!1?"success":"danger"}">${v.active!==!1?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editEmployee('${v.id}')" title="Editar"><i style="color: #fff;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleEmployeeStatus('${v.id}', ${v.active!==!1})" title="${v.active!==!1?"Desativar":"Ativar"}">${v.active!==!1?'<i style="color: #fff;" class="fa-solid fa-ban"></i>':'<i style="color: #fff;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteEmployee('${v.id}')" title="Excluir"><i style="color: #fff;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),u=`
        <div id="employee-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2 id="modal-title">Novo Colaborador</h2>
                <form id="create-employee-form">
                    <input type="hidden" id="emp-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="emp-name" required>
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="emp-email" required>
                    </div>
                    <div class="form-group" id="pwd-group">
                        <label>Senha</label>
                        <input type="password" id="emp-password" required>
                        <small style="color: #999; font-size: 0.8em; display: none;" id="pwd-hint">Deixe em branco para manter a senha atual.</small>
                    </div>
                    <div class="form-group">
                         <label>Lojas de Atuação</label>
                         <div id="employee-stores-select"></div>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar</button>
                </form>
            </div>
        </div>
    `,m=()=>{const v=document.querySelector(".data-table tbody");v&&(v.innerHTML=d())};return window.editEmployee=v=>{const R=o.find(D=>D.id===v||D.uid===v);if(R){if(document.getElementById("emp-uid").value=R.id,document.getElementById("emp-name").value=R.name,document.getElementById("emp-email").value=R.email,s){const D=R.storeIds||(R.storeId?[R.storeId]:[]);s.setValues(D)}document.getElementById("emp-password").required=!1,document.getElementById("pwd-hint").style.display="block",document.getElementById("emp-email").disabled=!0,document.getElementById("modal-title").innerText="Editar Colaborador",document.getElementById("employee-modal").classList.remove("hidden")}},window.toggleEmployeeStatus=async(v,R)=>{try{await F.update("users",v,{active:!R});const D=o.find(L=>L.id===v);D&&(D.active=!R),m(),B.success(`Colaborador ${R?"desativado":"ativado"} com sucesso!`)}catch(D){B.error("Erro ao atualizar status: "+D)}},window.deleteEmployee=async v=>{if(await Ye.danger("Excluir Colaborador","Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita."))try{await F.delete("users",v),o=o.filter(D=>D.id!==v),m(),B.success("Colaborador excluído com sucesso!")}catch(D){B.error("Erro ao excluir: "+D)}},setTimeout(()=>{b(n.companyId)},100),`
        <style>
            .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .checkbox-label input[type="checkbox"] { cursor: pointer; }
        </style>
        <div class="page-header">
            <h2 class="page-title">Minha Equipe</h2>
            <button id="btn-new-employee" class="btn-primary"><i style="color: #fff;" class="fa-solid fa-user-plus"></i> Novo Colaborador</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Lojas</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${d()}
                    </tbody>
                </table>
            </div>
        </div>
        ${u}
    `;function b(v){const R=document.getElementById("employee-modal"),D=document.getElementById("btn-new-employee"),L=document.querySelector(".close-modal"),_=document.getElementById("create-employee-form"),A=i.map(S=>({value:S.id,label:S.name}));s=new jh("employee-stores-select",A,[],()=>{},"Selecione as lojas..."),D&&R&&(D.onclick=()=>{document.getElementById("emp-uid").value="",document.getElementById("create-employee-form").reset(),document.getElementById("emp-password").required=!0,document.getElementById("pwd-hint").style.display="none",document.getElementById("emp-email").disabled=!1,document.getElementById("modal-title").innerText="Novo Colaborador",s&&s.setValues([]),R.classList.remove("hidden")}),L&&R&&(L.onclick=()=>R.classList.add("hidden")),_&&(_.onsubmit=async S=>{S.preventDefault();const $=document.getElementById("emp-uid").value,C=document.getElementById("emp-name").value,T=document.getElementById("emp-email").value,k=document.getElementById("emp-password").value,f=s?s.getValues():[];try{if($){const g={name:C,storeIds:f.length>0?f:[]};await F.update("users",$,g);const y=o.find(w=>w.id===$);y&&Object.assign(y,g),B.success("Colaborador atualizado com sucesso!")}else{const g=await Ae.registerUser(T,k),y={uid:g,name:C,email:T,role:"employee",companyId:v,storeIds:f.length>0?f:[],active:!0,permissions:["orders","products"]};await F.set("users",g,y),o.push({id:g,...y}),B.success("Colaborador adicionado com sucesso!")}R&&R.classList.add("hidden"),m()}catch(g){console.error(g),B.error("Erro: "+g)}})}},px=()=>`
        <div class="config-container">
            <div class="card config-card">
                <div class="card-header">
                    <h3>Modo de Operação da IA</h3>
                </div>
                <div class="config-options">
                    <div class="config-option active">
                        <div class="option-header">
                            <input type="radio" name="ia-mode" checked>
                            <label>Modo 1 – IA baseada em produtos</label>
                        </div>
                        <p>A IA consulta os produtos cadastrados na dashboard e valida o estoque.</p>
                    </div>
                    <div class="config-option">
                        <div class="option-header">
                            <input type="radio" name="ia-mode">
                            <label>Modo 2 – IA em modo aberto</label>
                        </div>
                        <p>A IA conversa livremente. Todo pedido é enviado para aceite humano manual.</p>
                    </div>
                </div>
            </div>

            <div class="card config-card">
                <div class="card-header">
                    <h3>Prompt Personalizado</h3>
                </div>
                <div class="prompt-editor">
                    <textarea placeholder="Digite o prompt base para a IA desta empresa...">Você é um assistente virtual para a Loja Centro. Seu objetivo é ajudar o cliente a escolher produtos e fechar pedidos no WhatsApp de forma amigável e eficiente.</textarea>
                </div>
                <div class="config-footer">
                    <button class="btn-primary">Salvar Configurações</button>
                </div>
            </div>
        </div>
    `,hx=()=>`
        <div class="login-wrapper">
            <div class="login-card glass">
                <div class="login-header">
                    <div class="logo-icon large"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                    <h1>AutoQui</h1>
                    <p>Entre com suas credenciais para acessar a plataforma.</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="email" placeholder="Seu e-mail" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="password" placeholder="Sua senha" required>
                    </div>
                    <button type="submit" class="btn-primary full-width">Acessar Sistema</button>
                </form>
            </div>
        </div>
    `,mx=async()=>{let n=await F.getAll("companies"),e=null,t=["atendimento"];const i=[{value:"atendimento",label:"IA de Atendimento"},{value:"venda",label:"IA de Venda"},{value:"agendamento",label:"IA de Agendamento"},{value:"disparo",label:"Disparo em Massa"},{value:"venda_catalogo",label:"Venda pelo Catálogo"}],s=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>':n.map(m=>`
            <tr data-company-id="${m.id}">
                <td>${m.name}</td>
                <td><span class="badge ${m.status==="active"?"success":"danger"}">${m.status==="active"?"Ativo":"Inativo"}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(m.modulos_ativos||[]).map(b=>`<span class="badge info" style="font-size:0.7rem;">${b}</span>`).join("")}</div></td>
                <td>${m.stores?m.stores.length:0}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editCompany('${m.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleCompanyStatus('${m.id}', '${m.status}')" title="${m.status==="active"?"Desativar":"Ativar"}">${m.status==="active"?'<i style="color: #ef4444;" class="fa-solid fa-toggle-off"></i>':'<i style="color: #22c55e;" class="fa-solid fa-toggle-on"></i>'}</button>
                    </div>
                </td>
            </tr>
        `).join(""),r=`
        <div id="company-modal" class="modal hidden">
            <div class="modal-content glass big-modal">
                <span class="close-modal">&times;</span>
                <h2 id="company-modal-title">Novo Cliente</h2>
                <form id="create-company-form">
                    <input type="hidden" id="company-id">
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Nome do Cliente</label>
                            <input type="text" id="company-name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Limite de Instâncias</label>
                            <input type="number" id="company-instances-limit" min="1" value="1" required>
                        </div>
                    </div>

                    <div id="owner-section">
                        <h3>Dono do Cliente</h3>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Email</label>
                                <input type="email" id="owner-email">
                            </div>
                            <div class="form-group half">
                                <label>Senha</label>
                                <input type="password" id="owner-password">
                            </div>
                        </div>
                        <p style="font-size: 0.8em; color: #888; margin-top: -10px; margin-bottom: 10px;">Preencha apenas se for criar um novo usuário dono.</p>
                    </div>

                    <h3>Lojas / Unidades <span style="color: #ef4444;">*</span></h3>
                    <p style="font-size: 0.85em; color: #999; margin-top: -8px; margin-bottom: 12px;">Mínimo de 1 loja obrigatória</p>
                    <div class="stores-section">
                        <div id="stores-list">
                            <!-- Store inputs will be added here -->
                        </div>
                        <button type="button" id="btn-add-store" class="btn-secondary small"><i class="fa-solid fa-plus"></i> Adicionar Loja</button>
                    </div>

                    <h3>Módulos Ativos</h3>
                    <div class="form-row">
                        <div id="modules-select-container"></div>
                    </div>

                    <button type="submit" class="btn-primary full-width" style="margin-top:1rem;">Salvar Cliente</button>
                </form>
            </div>
        </div>
    `,o=()=>{const m=document.querySelector(".data-table tbody");m&&(m.innerHTML=s())};window.editCompany=m=>{const b=n.find(v=>v.id===m);if(b){if(document.getElementById("company-id").value=b.id,document.getElementById("company-name").value=b.name,document.getElementById("company-instances-limit").value=(b.limite_instancias||"1").toString(),e){const R=b.modulos_ativos||["atendimento"];e.setValues(R),t=R}document.getElementById("owner-section").style.display="none",document.getElementById("owner-email").required=!1,document.getElementById("owner-password").required=!1;const v=document.getElementById("stores-list");v.innerHTML="",b.stores&&b.stores.length>0?b.stores.forEach(R=>{l(R)}):l(),document.getElementById("company-modal-title").innerText="Editar Cliente",document.getElementById("company-modal").classList.remove("hidden")}},window.toggleCompanyStatus=async(m,b)=>{const v=b==="active"?"inactive":"active",R=v==="inactive"?"desativar":"ativar";let D=`Deseja ${R} este cliente?`;if(v==="inactive"&&(D+=`

⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!`),await Ye.warning(`${R.charAt(0).toUpperCase()+R.slice(1)} Cliente`,D))try{await F.update("companies",m,{status:v});const _=n.find(A=>A.id===m);_&&(_.status=v),o(),B.success(`Cliente ${v==="inactive"?"desativado":"ativado"} com sucesso!`)}catch(_){B.error("Erro ao atualizar status: "+_)}};const l=(m=null)=>{const b=document.getElementById("stores-list");if(!b)return;const v=document.createElement("div");v.className="store-row",m&&(v.dataset.id=m.id,v.dataset.active=m.active!==void 0?m.active:"true",v.dataset.freteAtivo=m.frete_ativo!==void 0?m.frete_ativo:"true",v.dataset.instanciaId=m.instancia_id||""),v.innerHTML=`
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${m?.name||""}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${m?.address||""}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `,v.querySelector(".btn-remove-store").addEventListener("click",()=>{v.remove()}),b.appendChild(v)},d=`
        <div class="page-header">
            <h2 class="page-title">Gestão de Clientes</h2>
            <button id="btn-new-company" class="btn-primary"><i class="fa-solid fa-plus"></i> Novo Cliente</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Módulos Ativos</th>
                            <th>Lojas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s()}
                    </tbody>
                </table>
            </div>
        </div>
        ${r}
    `;function u(m){const b=document.getElementById("company-modal"),v=document.getElementById("btn-new-company"),R=document.querySelector(".close-modal"),D=document.getElementById("create-company-form"),L=document.getElementById("btn-add-store"),_=document.getElementById("stores-list");e=new jh("modules-select-container",i,["atendimento"],A=>{const S=["atendimento","venda","agendamento"],$=A.find(C=>!t.includes(C));if($==="venda_catalogo"){const C=A.filter(T=>T==="venda_catalogo"||T==="disparo");if(C.length!==A.length){e?.setValues(C),t=C;return}}else if($&&(S.includes($)||$==="disparo")){const C=A.filter(T=>T!=="venda_catalogo");if(S.includes($)){const T=C.filter(k=>!S.includes(k)||k===$);if(T.length!==C.length||C.length!==A.length){e?.setValues(T),t=T;return}}if(C.length!==A.length){e?.setValues(C),t=C;return}}t=A},"Selecione os módulos..."),v&&b&&(v.onclick=()=>{document.getElementById("company-id").value="",document.getElementById("create-company-form").reset(),document.getElementById("owner-section").style.display="block",document.getElementById("owner-email").required=!0,document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",e&&(e.setValues(["atendimento"]),t=["atendimento"]),_&&(_.innerHTML="",m()),b.classList.remove("hidden")}),R&&b&&(R.onclick=()=>b.classList.add("hidden")),L&&(L.onclick=()=>m()),D&&(D.onsubmit=async A=>{A.preventDefault();const S=document.getElementById("company-id").value,$=document.getElementById("company-name").value,C=document.getElementById("owner-email").value,T=document.getElementById("owner-password").value,k=parseInt(document.getElementById("company-instances-limit").value)||1,f=e?e.getValues():["atendimento"];if(f.includes("venda_catalogo")&&f.filter(h=>h!=="venda_catalogo"&&h!=="disparo").length>0){B.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".');return}const g=document.querySelectorAll(".store-row"),y=[];if(g.forEach((w,h)=>{const I=w.querySelector(".store-name").value,x=w.querySelector(".store-address").value;if(I&&x){const P=w.dataset.id,M=w.dataset.active!=="false",q=w.dataset.freteAtivo!=="false",j=w.dataset.instanciaId||null;y.push({id:P||`store_${Date.now()}_${h}`,name:I,address:x,active:M,frete_ativo:q,instancia_id:j})}}),y.length===0){B.warning("É necessário cadastrar pelo menos 1 loja!");return}try{if(S){await F.update("companies",S,{name:$,stores:y,limite_instancias:k,modulos_ativos:f});const w=n.find(h=>h.id===S);w&&(w.name=$,w.stores=y,w.modulos_ativos=f),B.success("Cliente atualizado com sucesso!")}else{const w=await Ae.registerUser(C,T),h=await F.create("companies",{name:$,stores:y,limite_instancias:k,status:"active",ownerId:w,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}});await F.set("users",w,{uid:w,email:C,role:"owner",companyId:h}),n.push({id:h,name:$,stores:y,status:"active",ownerId:w,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}}),B.success("Cliente criado com sucesso!")}b&&b.classList.add("hidden"),o()}catch(w){console.error(w),B.error("Erro: "+w)}})}return setTimeout(()=>{u(l)},100),d},fx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await F.get("companies",n.companyId),i=t.limite_instancias||1;let s=await F.getAll("instancias",{field:"empresaId",operator:"==",value:n.companyId});setTimeout(async()=>{let L=!1;for(const _ of s)try{const S=(await ht.getInstanceStatus(_.nome)).connected?"conectado":"desconectado";S!==_.status&&(await F.update("instancias",_.id,{status:S}),_.status=S,L=!0)}catch(A){console.error("Error verifying status for",_.nome,A)}L&&m()},500);const o=()=>s.length===0?'<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>':s.map(L=>`
            <tr>
                <td>${L.nome}</td>
                <td>${L.numero?L.numero.split("@")[0]:"-"}</td>
                <td>
                    <span class="badge ${l(L.status)}">
                        ${d(L.status)}
                    </span>
                </td>
                <td><span class="badge info">${t.stores?.find(_=>_.id===L.lojaId)?.name||"Global"}</span></td>
                <td><span class="badge secondary">${L.funcao||"Nenhuma"}</span></td>
                <td>${L.createdAt?.toDate?L.createdAt.toDate().toLocaleDateString():"N/A"}</td>
                <td>
                    <div class="actions">
                        ${L.status==="desconectado"?`<button class="action-btn" onclick="window.connectInstance('${L.nome}')" title="Conectar"><i style="color: #FFF;" class="fa-solid fa-qrcode"></i></button>`:""}
                        <button class="action-btn" onclick="window.shareQR('${L.nome}')" title="Compartilhar Link QR" style="background-color: #6366f1; border-color: #6366f1;"><i style="color: #FFF;" class="fa-solid fa-share-nodes"></i></button>
                        ${L.status==="conectado"?`<button class="action-btn" onclick="window.logoutInstance('${L.id}', '${L.nome}')" title="Desconectar" style="background-color: var(--warning); border-color: var(--warning);"><i style="color: #FFF;" class="fa-solid fa-right-from-bracket"></i></button>`:""}
                        <button class="action-btn" onclick="window.deleteInstance('${L.id}', '${L.nome}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),l=L=>{switch(L){case"conectado":return"success";case"desconectado":return"danger";default:return"secondary"}},d=L=>{switch(L){case"conectado":return"Conectado";case"desconectado":return"Desconectado";default:return L}},u=`
        <div id="new-instance-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal" id="close-new-modal">&times;</span>
                <h2>Nova Instância</h2>
                <form id="create-instance-form">
                    <div class="form-group">
                        <label>Identificador da Instância (Uso Interno)</label>
                        <input type="text" id="instance-name" required placeholder="Ex: Matriz 01, Vendas Norte...">
                    </div>
                    <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">Criar e Gerar QR Code</button>
                </form>
            </div>
        </div>

        <div id="qrcode-modal" class="modal hidden">
            <div class="modal-content glass" style="text-align: center;">
                <span class="close-modal" id="close-qr-modal">&times;</span>
                <h2>Conectar WhatsApp</h2>
                <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
                <div id="qrcode-container" style="margin: 20px auto; width: 250px; height: 250px; background: #eee; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
                <button id="btn-done-qrcode" class="btn-primary full-width">Concluir</button>
            </div>
        </div>
    `,m=()=>{const L=document.querySelector(".data-table tbody");L&&(L.innerHTML=o())};let b=null,v=null;const R=()=>{b&&clearInterval(b),v&&clearInterval(v),b=null,v=null};window.refreshApp=()=>{window.location.reload()},window.shareQR=L=>{const _=`${window.location.origin}/qr/${L}`;navigator.clipboard.writeText(_),B.success("Link de conexão copiado para a área de transferência!")},window.deleteInstance=async(L,_)=>{if(await Ye.danger("Excluir Instância",`Tem certeza que deseja excluir a instância "${_}"? Isso irá desconectar o WhatsApp.`))try{await ht.deleteInstance(_),await F.delete("instancias",L),s=s.filter(S=>S.id!==L),m(),B.success("Instância excluída com sucesso.")}catch(S){B.error("Erro ao excluir instância: "+S)}},window.logoutInstance=async(L,_)=>{if(await Ye.warning("Desconectar WhatsApp",`Deseja realmente desconectar o WhatsApp da instância "${_}"?`))try{if(B.info("Desconectando..."),await ht.logoutInstance(_)){await F.update("instancias",L,{status:"desconectado"});const $=s.find(C=>C.id===L);$&&($.status="desconectado"),m(),B.success("Desconectado com sucesso.")}else B.error("Não foi possível desconectar pela API. Verifique se a instância está ativa.")}catch(S){B.error("Erro ao desconectar: "+S)}},window.connectInstance=async L=>{const _=document.getElementById("qrcode-modal"),A=document.getElementById("qrcode-container");if(_&&A){_.classList.remove("hidden"),A.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';const S=async()=>{try{const T=await ht.getQRCode(L);T&&T.base64?A.innerHTML=`<img src="${T.base64}" style="width: 100%; height: 100%; object-fit: contain;">`:(await ht.getInstanceStatus(L)).connected?C():A.innerHTML="<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>"}catch(T){console.error("Error fetching QR:",T)}},$=async()=>{try{(await ht.getInstanceStatus(L)).connected&&C()}catch(T){console.error("Error checking status:",T)}},C=async()=>{R(),B.success("WhatsApp conectado com sucesso!"),_.classList.add("hidden");const T=s.find(k=>k.nome===L);T&&(await F.update("instancias",T.id,{status:"conectado"}),T.status="conectado",m())};await S(),b=setInterval(S,4e4),v=setInterval($,3e3)}},setTimeout(()=>{D(t.id,i)},100);function D(L,_){const A=document.getElementById("btn-new-instance"),S=document.getElementById("new-instance-modal"),$=document.getElementById("close-new-modal"),C=document.getElementById("create-instance-form"),T=document.getElementById("qrcode-modal"),k=document.getElementById("close-qr-modal"),f=document.getElementById("btn-done-qrcode");A&&(A.onclick=()=>{if(s.length>=_){B.error("Limite de instâncias atingido.");return}S?.classList.remove("hidden")}),$&&S&&($.onclick=()=>S.classList.add("hidden")),C&&(C.onsubmit=async g=>{g.preventDefault();let w=document.getElementById("instance-name").value.trim();w=w.replace(/[^a-zA-Z0-9]/g,"_").toLowerCase();const h=`${w}_${L.substring(0,5)}`;try{if(await ht.instanceExists(h)){B.warning("Já existe uma instância com esse nome. Tente outro.");return}B.info("Criando instância, aguarde..."),await ht.createInstance(h);const x={empresaId:L,lojaId:null,nome:h,numero:null,status:"desconectado",funcao:null,webhookUrl:null,upsert:!1},P=await F.create("instancias",x);s.push({id:P,...x,createdAt:{toDate:()=>new Date}}),B.success("Instância criada! Agora vincule-a a uma loja nas configurações."),S?.classList.add("hidden"),m(),window.connectInstance(h)}catch(I){B.error("Erro ao criar instância: "+I)}}),k&&T&&(k.onclick=()=>{R(),T.classList.add("hidden")}),f&&T&&(f.onclick=async()=>{R(),T.classList.add("hidden"),window.location.reload()})}return`
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${s.length>=i?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${i}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${s.length}
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Loja</th>
                            <th>Função</th>
                            <th>Criado Em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o()}
                    </tbody>
                </table>
            </div>
        </div>
        ${u}
    `},gx=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{telefone_lead}}",label:"Telefone",icon:"fa-phone"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],yx=[{key:"pedido_aceito",label:"Pedido Aceito",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}

Pode me informar a forma de pagamento?`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito para retirada e já está sendo preparado. 

💰 Valor: R$ {{valor_total}}

Aguardamos você!`},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado."},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! 📦 Seu pedido #{{numero_pedido}} já está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue",icon:"fa-flag-checkered",default:"🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],vx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,i=await F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),r=await F.get("companies",e);let o=r?.stores||[];if(n.role!=="owner"){const S=n.storeIds||(n.storeId?[n.storeId]:[]);o=o.filter($=>S.includes($.id))}if(o.length===0)return'<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>';let l=o[0].id;const d=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom: 20px; overflow-x:auto;">
            ${o.map(S=>`
                <button class="btn-store-tab ${S.id===l?"active":""}" data-id="${S.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${S.id===l?"var(--primary)":"var(--surface-hover)"};
                    color: ${S.id===l?"#fff":"var(--text-main)"};
                    border: 1px solid ${S.id===l?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px;
                    cursor: pointer;
                    white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${S.name}
                </button>
            `).join("")}
        </div>
    `,u=()=>o.find(S=>S.id===l),m=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:e}),b=S=>m.find($=>$.lojaId===S)||null,v=()=>gx.map(S=>`
        <div class="var-chip" draggable="true" data-var="${S.key}" title="Arraste para o campo de mensagem">
            <i class="fa-solid ${S.icon}"></i>
            <span>${S.label}</span>
            <code>${S.key}</code>
        </div>
    `).join("");return setTimeout(()=>{R(),D()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-main);
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 1.25rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%;
                padding: 0.8rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main);
                font-size: 0.95rem;
                appearance: none;
                cursor: pointer;
            }
            .config-select:focus { outline: none; border-color: var(--primary); }
            /* ── Variables ── */
            .vars-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px;
                font-size: 0.82rem;
                color: var(--primary);
                cursor: grab;
                user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            /* ── Message editors ── */
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
                font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                color: var(--text-main);
                font-size: 0.9rem;
                padding: 0.75rem;
                resize: vertical;
                box-sizing: border-box;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: var(--radius-sm);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }

            /* ── Opening Hours (Horários) ── */
            .horarios-grid {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .horario-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                color: white;
                padding: 0.4rem 0.6rem;
                border-radius: 6px;
                font-size: 0.85rem;
                outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            
            /* Switch Toggle */
            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
            }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333;
                transition: .4s;
                border-radius: 20px;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 14px; width: 14px;
                left: 3px; bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração por Loja</h2>
        </div>

        <div id="tabs-container">
            ${d()}
        </div>

        <div id="config-content-area"></div>
    `;function R(){const S=()=>{document.querySelectorAll(".btn-store-tab").forEach($=>{$.addEventListener("click",()=>{l=$.dataset.id;const C=document.getElementById("tabs-container");C&&(C.innerHTML=d(),S()),D()})})};S()}function D(){const S=u();if(!S)return;const $=b(l),C=$?.mensagens_automaticas||{},T=$?.prompt_ia||S.prompt_ia||"",k=document.getElementById("config-content-area");if(!k)return;const f=()=>'<option value="">Nenhuma</option>'+i.map(y=>{const w=S.instancia_id===y.id,h=o.some(I=>I.id!==l&&I.instancia_id===y.id);return`<option value="${y.id}" ${w?"selected":""} ${h?"disabled":""}>
                     ${y.nome} (${y.status}) ${h?"(Já vinculada a outra loja)":""}
                 </option>`}).join(""),g=()=>yx.map(y=>`
            <div class="msg-card" id="msg-card-${y.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${y.icon}" style="color:var(--primary);"></i>
                    <span>${y.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea
                        id="msg-${y.key}"
                        class="msg-textarea"
                        rows="4"
                        placeholder="${y.default}"
                        data-msg-key="${y.key}"
                    >${C[y.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);"><i class="fa-solid fa-circle-info"></i> Arraste as variáveis abaixo para dentro do texto</span>
                        <button class="btn-save-msg" data-msg-key="${y.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");k.innerHTML=`
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-plug" style="color:var(--primary);"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que responderá por esta loja. Se desconectada, a loja ficará inoperante.
                </p>
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="select-store-instance" class="config-select">
                        ${f()}
                    </select>
                </div>
                <div id="instance-status-indicator" style="margin-top: 10px;"></div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-robot" style="color:var(--primary);"></i> Prompt da IA da Loja
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Configure o comportamento personalizado da IA (ex: tom de voz, regras da loja) para o atendimento.
                </p>
                <textarea id="prompt-ia" class="msg-textarea" rows="4" placeholder="Ex: Você é o assistente virtual da Loja X...">${T}</textarea>
                <div style="text-align:right; margin-top:10px;">
                    <button class="btn-save-msg" id="btn-save-prompt">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Prompt
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja está aberta para receber pedidos.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(y=>{const w=$?.horarios?.[y.key]||{active:!1,open:"08:00",close:"18:00"};return`
                        <div class="horario-row ${w.active?"":"inactive"}" id="row-${y.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle" data-dia="${y.key}" ${w.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${y.label}</span>
                            </div>
                            <div class="horario-inputs ${w.active?"":"hidden"}" id="inputs-${y.key}">
                                <input type="time" class="time-input" id="open-${y.key}" value="${w.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-${y.key}" value="${w.close||"18:00"}">
                            </div>
                            <div class="status-label" id="status-${y.key}" style="font-size: 0.8rem; color: ${w.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${w.active?"Aberto":"Fechado"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(y=>{const w=$?.horarios_entrega?.[y.key]||{active:!1,open:"08:00",close:"22:00"};return`
                        <div class="horario-row ${w.active?"":"inactive"}" id="row-entrega-${y.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle-entrega" data-dia="${y.key}" ${w.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${y.label}</span>
                            </div>
                            <div class="horario-inputs ${w.active?"":"hidden"}" id="inputs-entrega-${y.key}">
                                <input type="time" class="time-input" id="open-entrega-${y.key}" value="${w.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-entrega-${y.key}" value="${w.close||"22:00"}">
                            </div>
                            <div class="status-label" id="status-entrega-${y.key}" style="font-size: 0.8rem; color: ${w.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${w.active?"Disponível":"Indisponível"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas automaticamente ao cliente em cada etapa do pedido.
                </p>
                <div style="margin-bottom:1rem;">
                    <div class="vars-grid" id="vars-grid">
                        ${v()}
                    </div>
                </div>
                <div id="msg-editors">
                    ${g()}
                </div>
            </div>

            <div class="card" style="margin-top: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i> Configurações do Catálogo
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize a aparência e os dados de contato do seu catálogo público.
                </p>
                
                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">WhatsApp de Atendimento (Com DDD)</label>
                    <input type="text" id="catalog-whatsapp" value="${$?.design?.whatsapp||""}" class="time-input" style="width:100%;" placeholder="Ex: 5511999999999">
                    <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Este número será usado no botão flutuante do catálogo.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Primária</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="primary-color" value="${$?.design?.primaryColor||"#6366f1"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="primary-color-hex" value="${$?.design?.primaryColor||"#6366f1"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Secundária (Fundo)</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="secondary-color" value="${$?.design?.secondaryColor||"#0f172a"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="secondary-color-hex" value="${$?.design?.secondaryColor||"#0f172a"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Logo do Catálogo</label>
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div id="logo-preview" style="width:80px; height:80px; border-radius:12px; border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; background:var(--surface-hover); overflow:hidden;">
                            ${$?.design?.logoUrl?`<img src="${$.design.logoUrl}" style="width:100%; height:100%; object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div style="flex:1;">
                            <input type="file" id="logo-upload" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('logo-upload').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Tamanho recomendado: 200x200px (PNG ou SVG transparente)</p>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-design">
                         <i class="fa-solid fa-floppy-disk"></i> Salvar Configurações
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{L(),_(),A()},50)}async function L(){const S=document.getElementById("instance-status-indicator");if(!S)return;const $=u();if(!$||!$.instancia_id){S.innerHTML='<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';return}const C=i.find(T=>T.id===$.instancia_id);if(C)try{(await ht.getInstanceStatus(C.nome)).connected?S.innerHTML='<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>':(S.innerHTML='<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>',C.status==="conectado"&&(await F.update("instancias",C.id,{status:"desconectado"}),C.status="desconectado"))}catch{S.innerHTML='<span class="badge warning">Verificando...</span>'}}function _(){const S=document.getElementById("select-store-instance");S?.addEventListener("change",async()=>{const k=S.value,f=u()?.instancia_id,g=o.map(y=>y.id===l?{...y,instancia_id:k||null}:y);try{B.info("Salvando configuração..."),await F.update("companies",e,{stores:g}),o=g;const y=u();if(y&&(y.instancia_id=k),k){const w=i.find(h=>h.id===k);if(w){const h=r.modulos_ativos||["atendimento"];let I="atendimento";h.includes("venda")?I="venda":h.includes("agendamento")?I="agendamento":h.includes("atendimento")?I="atendimento":h.includes("disparo")&&(I="disparo");const x=await F.get("settings","webhooks"),P=x?x[I]:null;B.info(`Vinculando instância e configurando webhook (${I})...`),await F.update("instancias",w.id,{lojaId:l,funcao:I,webhookUrl:P||null}),P&&(await ht.setWebhook(w.nome,P)?B.success("Webhook configurado com sucesso!"):B.warning("Configuração salva, mas houve uma falha ao ativar o webhook na API."))}}else if(f){const w=i.find(h=>h.id===f);w&&(B.info("Desvinculando instância e desativando webhook..."),await ht.setWebhook(w.nome,"",!1),await F.update("instancias",w.id,{lojaId:null,funcao:null,webhookUrl:null}))}L(),B.success("Vínculo de instância atualizado com sucesso!")}catch(y){B.error("Erro ao atualizar vínculo: "+y),D()}});const $=document.getElementById("btn-save-prompt");$?.addEventListener("click",async()=>{const k=document.getElementById("prompt-ia").value.trim();try{$&&($.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');const f=b(l);if(f)await F.update("loja_config",f.id,{prompt_ia:k}),f.prompt_ia=k;else{const y=await F.create("loja_config",{empresaId:e,lojaId:l,prompt_ia:k});m.push({id:y,empresaId:e,lojaId:l,prompt_ia:k})}const g=o.map(y=>y.id===l?{...y,prompt_ia:k}:y);await F.update("companies",e,{stores:g}),o=g,B.success("Prompt salvo com sucesso!"),$&&($.innerHTML='<i class="fa-solid fa-check"></i> Salvo!'),setTimeout(()=>{$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')},2e3)}catch{B.error("Erro ao salvar prompt."),$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')}}),document.querySelectorAll(".dia-toggle").forEach(k=>{k.addEventListener("change",()=>{const f=k.dataset.dia,g=k.checked,y=document.getElementById(`row-${f}`),w=document.getElementById(`inputs-${f}`),h=document.getElementById(`status-${f}`);g?(y?.classList.remove("inactive"),w?.classList.remove("hidden"),h&&(h.innerText="Aberto",h.style.color="var(--success)")):(y?.classList.add("inactive"),w?.classList.add("hidden"),h&&(h.innerText="Fechado",h.style.color="var(--text-dim)"))})});const C=document.getElementById("btn-save-horarios");C?.addEventListener("click",async()=>{try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const k={};["seg","ter","qua","qui","sex","sab","dom"].forEach(g=>{const y=document.querySelector(`.dia-toggle[data-dia="${g}"]`).checked,w=document.getElementById(`open-${g}`).value,h=document.getElementById(`close-${g}`).value;k[g]={active:y,open:w,close:h}});const f=b(l);if(f)await F.update("loja_config",f.id,{horarios:k}),f.horarios=k;else{const g=await F.create("loja_config",{empresaId:e,lojaId:l,horarios:k});m.push({id:g,empresaId:e,lojaId:l,horarios:k})}B.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'},2e3)}catch{B.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.querySelectorAll(".dia-toggle-entrega").forEach(k=>{k.addEventListener("change",()=>{const f=k.dataset.dia,g=k.checked,y=document.getElementById(`row-entrega-${f}`),w=document.getElementById(`inputs-entrega-${f}`),h=document.getElementById(`status-entrega-${f}`);g?(y?.classList.remove("inactive"),w?.classList.remove("hidden"),h&&(h.innerText="Disponível",h.style.color="var(--success)")):(y?.classList.add("inactive"),w?.classList.add("hidden"),h&&(h.innerText="Indisponível",h.style.color="var(--text-dim)"))})});const T=document.getElementById("btn-save-horarios-entrega");T?.addEventListener("click",async()=>{try{T.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const k={};["seg","ter","qua","qui","sex","sab","dom"].forEach(g=>{const y=document.querySelector(`.dia-toggle-entrega[data-dia="${g}"]`).checked,w=document.getElementById(`open-entrega-${g}`).value,h=document.getElementById(`close-entrega-${g}`).value;k[g]={active:y,open:w,close:h}});const f=b(l);if(f)await F.update("loja_config",f.id,{horarios_entrega:k}),f.horarios_entrega=k;else{const g=await F.create("loja_config",{empresaId:e,lojaId:l,horarios_entrega:k});m.push({id:g,empresaId:e,lojaId:l,horarios_entrega:k})}B.success("Horários de entrega salvos!"),T.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'},2e3)}catch{B.error("Erro ao salvar horários de entrega."),T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".var-chip").forEach(k=>{k.addEventListener("dragstart",f=>{f.dataTransfer.setData("text/plain",k.dataset.var||"")})}),document.querySelectorAll(".msg-textarea").forEach(k=>{k.addEventListener("dragover",f=>f.preventDefault()),k.addEventListener("drop",f=>{f.preventDefault();const g=f.dataTransfer.getData("text/plain");if(!g)return;const y=k.selectionStart??k.value.length,w=k.selectionEnd??k.value.length;k.value=k.value.slice(0,y)+g+k.value.slice(w)})}),document.querySelectorAll(".btn-save-msg").forEach(k=>{k.id!=="btn-save-prompt"&&k.addEventListener("click",async()=>{const f=k.dataset.msgKey,g=document.getElementById(`msg-${f}`).value.trim();k.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const y=b(l);if(y){const w={[`mensagens_automaticas.${f}`]:g||null};await F.update("loja_config",y.id,w),y.mensagens_automaticas||(y.mensagens_automaticas={}),y.mensagens_automaticas[f]=g||void 0}else{const w=await F.create("loja_config",{empresaId:e,lojaId:l,mensagens_automaticas:{[f]:g||null}});m.push({id:w,empresaId:e,lojaId:l,mensagens_automaticas:{[f]:g||void 0}})}B.success("Mensagem salva com sucesso!"),k.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{k.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'},2e3)}catch{B.error("Erro ao salvar mensagem."),k.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})})}function A(){const S=document.getElementById("primary-color"),$=document.getElementById("primary-color-hex"),C=document.getElementById("secondary-color"),T=document.getElementById("secondary-color-hex"),k=document.getElementById("logo-upload"),f=document.getElementById("btn-save-design");S?.addEventListener("input",()=>$.value=S.value),$?.addEventListener("change",()=>S.value=$.value),C?.addEventListener("input",()=>T.value=C.value),T?.addEventListener("change",()=>C.value=T.value);let g=null;k?.addEventListener("change",()=>{if(k.files&&k.files[0]){g=k.files[0];const y=new FileReader;y.onload=w=>{const h=document.getElementById("logo-preview");h&&(h.innerHTML=`<img src="${w.target?.result}" style="width:100%; height:100%; object-fit:contain;">`)},y.readAsDataURL(g)}}),f?.addEventListener("click",async()=>{try{f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';let y=b(l)?.design?.logoUrl||"";if(g){const I=ln(cn,`logos/${e}/${l}_${Date.now()}`);await Li(I,g),y=await ni(I)}const w={primaryColor:$.value,secondaryColor:T.value,logoUrl:y,whatsapp:document.getElementById("catalog-whatsapp").value.replace(/\D/g,"")},h=b(l);if(h)await F.update("loja_config",h.id,{design:w}),h.design=w;else{const I=await F.create("loja_config",{empresaId:e,lojaId:l,design:w});m.push({id:I,empresaId:e,lojaId:l,design:w})}B.success("Configurações do catálogo atualizadas!"),f.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Configurações'},2e3)}catch(y){console.error("Save design error:",y),B.error("Erro ao salvar design."),f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Visual'}})}};class bx{newOrderSound;paymentSound;humanSupportSound;notifiedSupportIds=new Set;isInitialLoad=!0;isLeadsInitialLoad=!0;unsubscribe=null;unsubscribeLeads=null;constructor(){this.newOrderSound=new Audio("/sounds/new-order.mp3"),this.paymentSound=new Audio("/sounds/payment-confirmed.mp3"),this.humanSupportSound=new Audio("/sounds/success.mp3"),this.newOrderSound.volume=.5,this.paymentSound.volume=.5,this.humanSupportSound.volume=.6}formatCustomerName(e){const t=e.nome||e.leadName||e.customerName||"";if(t&&t.length>2)return t;const i=e.leadId||e.telefone||"";if(i){const s=i.split("@")[0];return/^\d+$/.test(s)&&s.length>=10?`Cliente (${s.slice(-8)})`:s||"Cliente"}return"Cliente"}showHumanSupportAlert(e){this.humanSupportSound.currentTime=0,this.humanSupportSound.play().catch(()=>{});const t=document.createElement("div");t.className="order-modal",t.id=`support-modal-${e.id}`;const i=this.formatCustomerName(e);t.innerHTML=`
            <div class="order-modal-content" style="border-top: 5px solid var(--warning);">
                <div class="order-header">
                    <div class="order-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">👤</div>
                    <h2>Atendimento Humano!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; margin-bottom: 1.5rem; color: var(--text-main);">
                        O lead <strong>${i}</strong> está aguardando contato humano.
                    </p>
                    <div class="order-field">
                        <label>Número do Lead:</label>
                        <span>${(e.telefone||e.leadId||"").split("@")[0]||"Não informado"}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-support" style="background: var(--warning);">Entendido</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#close-support")?.addEventListener("click",()=>{t.remove()})}async showNewOrder(e){const t=e.source==="catalog";Array.isArray(e.itens)||(Array.isArray(e.items)?e.itens=e.items.map(D=>({item:D.name||D.item||"",quantidade:D.qty||D.quantidade||1,preco:D.price||D.preco||0,subtotal:D.subtotal||0})):e.itens=[]);const i=e.empresaId||Ae.getCurrentUser()?.companyId;if(i&&Array.isArray(e.itens)&&!t)try{const D=await F.getAll("products",{field:"companyId",operator:"==",value:i});let L=!1;if(e.itens.forEach(_=>{const A=(_.item||"").toLowerCase().trim(),S=D.find($=>($.name||"").toLowerCase().trim()===A);if(S){const $=S.promotionalActive&&S.promotionalPrice||S.price;(!_.preco||_.preco===0)&&(_.preco=$,L=!0)}}),L){let _=0;e.itens.forEach(S=>{const $=parseFloat(S.preco)||0,C=parseInt(S.quantidade)||1;_+=C*$});const A=parseFloat(e.valoresAdicionais)||0;e.value=_+A}}catch(D){console.error("Error syncing prices with catalog:",D)}this.newOrderSound.play().catch(()=>{});const s=document.createElement("div");s.className="order-modal",s.id=`modal-${e.id}`;const r=Array.isArray(e.itens)&&e.itens.length>0?e.itens.map((D,L)=>`
                <div class="order-item-row" style="display:flex; justify-content:space-between; align-items:center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="flex:1; font-weight:500;">${D.quantidade}x ${D.item}</span>
                    <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                        <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                        ${t?`<span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem;">${Number(D.preco||0).toFixed(2)}</span>`:`<input type="number" class="notif-item-price-input" data-index="${L}" value="${D.preco||0}" step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">`}
                    </div>
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1rem; text-align:center;">Sem itens listados.</p>',o=t?"":`
            <div class="order-item-row" style="margin-top:0.5rem; padding: 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.85rem; font-weight:600;">Taxas / Adicionais</span>
                    <small style="font-size:0.7rem; color:var(--text-dim);">Entrega, extras, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                    <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                    <input type="number" id="notif-additional-value" value="${e.valoresAdicionais||0}"
                        step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                </div>
            </div>
        `;s.innerHTML=`
            <div class="order-modal-content" style="max-width: 520px; padding: 1.5rem;">
                <div class="order-header" style="margin-bottom: 1.25rem;">
                    <div class="order-icon" style="width: 44px; height: 44px; font-size: 1.25rem; background: var(--primary-glow); color: var(--primary);">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <h2 style="margin:0; font-size: 1.25rem;">Novo Pedido Recebido!</h2>
                        <p style="margin:0; font-size: 0.85rem; color: var(--text-dim);">#${e.id.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
                
                <div class="order-body" style="gap: 1.25rem; display: flex; flex-direction: column;">
                    <!-- Customer and Delivery Info -->
                    ${t?`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Modo de Envio</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">
                                ${e.entrega==="retirada"?'<i class="fa-solid fa-store"></i> Retirada':'<i class="fa-solid fa-truck"></i> Entrega'}
                            </span>
                        </div>
                        ${e.entrega!=="retirada"?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Endereço</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Não informado"}</span>
                        </div>`:""}
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Pagamento</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">
                                ${e.pagamento==="na_entrega"||e.paymentMethod==="na_entrega"?"🤝 Na Entrega":"⚡ PIX"}
                            </span>
                        </div>
                    </div>`:`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Entrega</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Retirada"}</span>
                        </div>
                    </div>`}
                    
                    <!-- Items Section -->
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <h4 style="font-size: 0.75rem; color: var(--text-dim); font-weight:700; text-transform: uppercase; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fa-solid fa-list-check" style="color: var(--primary); font-size: 0.9rem;"></i>
                            Conferência de Itens e Valores
                        </h4>
                        
                        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
                            <div style="max-height: 220px; overflow-y: auto; padding: 0 1rem;">
                                ${r}
                            </div>
                            
                            <!-- Total and Extras -->
                            <div style="background: rgba(255,255,255,0.03); border-top: 1px solid var(--border-color); padding: 1rem;">
                                ${o}
                                
                                <div style="display:flex; justify-content:space-between; margin-top:0.75rem; padding-top:0.75rem; border-top: 1px dashed var(--border-color); align-items: center;">
                                    <span style="font-weight:700; font-size: 1rem; color: var(--text-main);">Total do Pedido</span>
                                    <span id="notif-order-total" style="font-weight:800; color:var(--primary); font-size:1.4rem; letter-spacing: -0.02em;">R$ ${(e.value||e.total||0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="reject-reason-container" style="display: none; margin-top: 0.5rem; animation: slideDown 0.3s ease;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--danger); font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">Motivo da Recusa *</label>
                        <textarea id="reject-reason" placeholder="Descreva por que o pedido foi recusado..." 
                                  style="width: 100%; border-radius: 10px; border: 1px solid var(--danger); padding: 0.8rem; background: rgba(239, 68, 68, 0.05); color: white; resize: vertical; min-height: 80px; font-size: 0.9rem; outline: none;"></textarea>
                    </div>
                </div>
                
                <div class="order-actions" style="margin-top: 1.5rem; gap: 0.75rem;">
                    <button class="btn-reject" id="reject-order" style="flex:1; height: 48px; border-radius: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: var(--danger);">
                        <i class="fa fa-times"></i> Recusar
                    </button>
                    <button class="btn-reject hidden" id="confirm-reject" style="flex:1; height: 48px; border-radius: 10px; background: var(--danger); color: white;">
                        <i class="fa fa-check"></i> Confirmar Recusa
                    </button>
                    <button class="btn-accept" id="accept-order" style="flex:2; height: 48px; border-radius: 10px; background: var(--primary); color: white; font-weight: 700; box-shadow: 0 4px 15px var(--primary-glow);">
                        <i class="fa fa-check"></i> Aceitar Pedido
                    </button>
                </div>
            </div>
        `,document.body.appendChild(s);const l=D=>{const L=parseFloat(D);return isNaN(L)?0:L},d=()=>{let D=0;document.querySelectorAll(".notif-item-price-input").forEach(A=>{const S=parseInt(A.dataset.index),$=(e.itens||[])[S]?.quantidade||1;D+=$*l(A.value)});const L=l(document.getElementById("notif-additional-value")?.value);D+=L;const _=document.getElementById("notif-order-total");_&&(_.innerText=`R$ ${D.toFixed(2)}`)};document.querySelectorAll(".notif-item-price-input").forEach(D=>{D.addEventListener("input",d)}),document.getElementById("notif-additional-value")?.addEventListener("input",d);const u=s.querySelector("#accept-order"),m=s.querySelector("#reject-order"),b=s.querySelector("#confirm-reject"),v=s.querySelector("#reject-reason-container"),R=s.querySelector("#reject-reason");u?.addEventListener("click",async()=>{const D=Ae.getCurrentUser(),L=e.empresaId||D?.companyId;if(!L){B.error("Empresa não identificada.");return}u.disabled=!0,u.textContent="⌛ Processando...";try{let _=0,A=Array.isArray(e.itens)?[...e.itens]:[];if(t)A.forEach(f=>{_+=(f.quantidade||1)*(f.preco||0)});else{const f=y=>{const w=parseFloat(y);return isNaN(w)?0:w};document.querySelectorAll(".notif-item-price-input").forEach(y=>{const w=parseInt(y.dataset.index),h=A[w]?.quantidade||1,I=f(y.value);A[w]&&(A[w].preco=I),_+=h*I});const g=f(document.getElementById("notif-additional-value")?.value);_+=g}const S={value:_,total:_,itens:A,valoresAdicionais:t?0:parseFloat(document.getElementById("notif-additional-value")?.value)||0},$=e.entrega==="retirada",C=e.pagamento||e.formaPagamento||e.paymentMethod||"",T=C.includes("entrega")||C.includes("dinheiro")||C.includes("maquininha")||C==="na_entrega";let k=$&&T?"em_preparo":"aguardando_pagamento";t&&T&&(k="em_preparo"),await Jn.updateOrderStatus(e,L,k,void 0,S),B.success("Pedido aceito!"),s.remove()}catch(_){B.error("Erro ao aceitar pedido: "+_),u.disabled=!1,u.innerHTML='<i class="fa fa-check"></i> Aceitar'}}),m?.addEventListener("click",()=>{m.classList.add("hidden"),u.classList.add("hidden"),b.classList.remove("hidden"),v.style.display="block",R.focus()}),b?.addEventListener("click",async()=>{const D=R.value.trim();if(!D){B.warning("Informe o motivo da recusa."),R.style.borderColor="red";return}const L=Ae.getCurrentUser(),_=e.empresaId||L?.companyId;if(!_){B.error("Empresa não identificada.");return}b.disabled=!0,b.textContent="⌛ Processando...";try{await Jn.updateOrderStatus(e,_,"cancelado",D),B.success("Pedido recusado e cliente notificado."),s.remove()}catch(A){B.error("Erro ao recusar pedido: "+A),b.disabled=!1,b.textContent="Confirmar Recusa"}})}showPaymentConfirmed(){this.paymentSound.play().catch(()=>{});const e=document.createElement("div");e.className="order-modal",e.innerHTML=`
            <div class="order-modal-content payment-confirmed">
                <div class="order-header">
                    <div class="order-icon success"><i class="fa fa-check"></i></div>
                    <h2>Pagamento Confirmado!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; color: var(--text-muted);">
                        O pagamento foi processado com sucesso.<br>
                        Pedido enviado para produção.
                    </p>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-payment">OK</button>
                </div>
            </div>
        `,document.body.appendChild(e),e.querySelector("#close-payment")?.addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}orderStatusMap=new Map;setupLeadsListener(e){const t=di(Ot,"leads"),i=r=>{if(r.type!=="modified"&&r.type!=="added")return;const o=r.doc.data(),l=r.doc.id,d="lead_"+l,u=(o.statusAtendimento||"").toLowerCase(),m=(o.estado||"").toLowerCase(),b=u==="atendimento_humano"||u==="em_atendimento_humano"||m==="atendimento_humano";if(this.isLeadsInitialLoad){b&&this.notifiedSupportIds.add(d);return}if(b&&!this.notifiedSupportIds.has(d)){if(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;const v=Ae.getCurrentUser();if(v&&v.role!=="owner"&&v.role!=="admin"){const R=v.storeIds||(v.storeId?[v.storeId]:[]);if(console.log("OrderNotification - Checking Lead Store isolation:",{userStoreIds:R,leadLojaId:o.lojaId}),R.length>0&&o.lojaId&&!R.includes(o.lojaId))return}this.showHumanSupportAlert({...o,id:l,leadId:o.telefone||l,customerName:this.formatCustomerName(o)}),this.notifiedSupportIds.add(d)}else!b&&this.notifiedSupportIds.has(d)&&this.notifiedSupportIds.delete(d)},s=pi(t,Xn("empresaId","==",e),Xn("statusAtendimento","in",["atendimento_humano","em_atendimento_humano"]));this.unsubscribeLeads=Ps(s,r=>{r.docChanges().forEach(i),this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)}),setTimeout(()=>{this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)},3e3)}startListening(){if(this.unsubscribe)return;const e=Ae.getCurrentUser();if(!e||!e.companyId)return;if(!["admin","owner","employee","staff"].includes(e.role||"")){console.log("OrderNotification - Unauthorized role for notifications:",e.role);return}const i=e.companyId,s=di(Ot,"pedidos"),r=pi(s,Xn("empresaId","==",i),Sw("criadoEm","desc"),Cw(50));this.unsubscribe=Ps(r,o=>{o.docChanges().forEach(l=>{const d=l.doc.data(),u=(d.status||"em_montagem").toLowerCase(),m=l.doc.id,b=this.orderStatusMap.get(m);if(this.isInitialLoad){this.orderStatusMap.set(m,u);return}if(this.orderStatusMap.set(m,u),!(d.empresaId&&d.empresaId!==i)&&!(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))){if(e&&e.role!=="owner"&&e.role!=="admin"){const v=e.storeIds||(e.storeId?[e.storeId]:[]);if(console.log("OrderNotification - Checking Store isolation:",{userStoreIds:v,orderLojaId:d.lojaId}),v.length>0&&d.lojaId&&!v.includes(d.lojaId))return}if(u==="em_preparo"&&b==="aguardando_pagamento"&&(d.manuallyConfirmed||this.showPaymentConfirmed()),u==="atendimento_humano"){const v="pedido_"+m;this.notifiedSupportIds.has(v)||(this.showHumanSupportAlert({...d,id:m,customerName:this.formatCustomerName(d)}),this.notifiedSupportIds.add(v));return}if(l.type==="added"){if(["cancelado","finalizado"].includes(u))return;this.showNewOrder({id:l.doc.id,...d,customerName:this.formatCustomerName(d),endereco:d.endereco||"Endereço não informado",description:Array.isArray(d.itens)?d.itens.map(R=>`${R.quantidade}x ${R.item}`).join(", "):"Sem itens",value:d.value||d.total||0,leadId:d.leadId,empresaId:d.empresaId,instancia:d.instancia,itens:d.itens,valoresAdicionais:d.valoresAdicionais})}}}),this.isInitialLoad&&(this.isInitialLoad=!1)}),this.setupLeadsListener(i)}stopListening(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.isInitialLoad=!0),this.unsubscribeLeads&&(this.unsubscribeLeads(),this.unsubscribeLeads=null,this.isLeadsInitialLoad=!0),this.notifiedSupportIds.clear(),this.orderStatusMap.clear()}}const Jd=new bx,wx={novo:{label:"Novo",cls:"badge info"},cliente_ativo:{label:"Cliente Ativo",cls:"badge success"},inativo:{label:"Inativo",cls:"badge secondary"},bloqueado:{label:"Bloqueado",cls:"badge danger"}},_x={bot:{label:"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"},em_atendimento_humano:{label:"Atendimento Humano",icon:'<i class="fa-solid fa-user"></i>',cls:"badge warning"},finalizado:{label:"Finalizado",icon:'<i class="fa-solid fa-check"></i>',cls:"badge success"},abandonado:{label:"Abandonado",icon:'<i class="fa-solid fa-warning"></i>',cls:"badge secondary"}};function Xd(n){const e=(n||"novo").toLowerCase(),t=wx[e]||{label:n||"Novo",cls:"badge info"};return`<span class="${t.cls}">${t.label}</span>`}function Zd(n){const e=(n||"bot").toLowerCase(),t=_x[e]||{label:n||"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function Fa(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const xx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await F.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId});const t=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(_=>_.lojaId&&t.includes(_.lojaId)));const s=(await F.get("companies",n.companyId))?.modulos_ativos||[],r=s.includes("venda_catalogo")&&!s.includes("atendimento");let o="todos";const l=_=>_.length===0?`<tr><td colspan="${r?4:5}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`:_.map(A=>{const S=(A.statusLead||"novo").toLowerCase(),$=(A.statusAtendimento||"bot").toLowerCase(),C=$==="atendimento_humano"?"em_atendimento_humano":$,T=(A.telefone||"").split("@")[0];return`
            <tr data-lead-id="${A.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="lead-avatar">${(A.nome||A.telefone||"C")[0].toUpperCase()}</div>
                        <div>
                            <div style="font-weight:600;">${A.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${T}</div>
                        </div>
                    </div>
                </td>
                <td>${Xd(S)}</td>
                ${r?"":`<td>${Zd(C)}</td>`}
                <td style="color:var(--text-muted);font-size:0.85rem;">${Fa(A.updatedAt||A.criadoEm||A.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${A.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),d=_=>_==="todos"?e:_==="humano"?e.filter(A=>{const S=(A.statusAtendimento||"").toLowerCase();return S==="em_atendimento_humano"||S==="atendimento_humano"}):_==="bloqueado"?e.filter(A=>(A.statusLead||"").toLowerCase()==="bloqueado"):_==="bot"?e.filter(A=>(A.statusAtendimento||"bot").toLowerCase()==="bot"):e;return setTimeout(()=>u(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar">
                <button class="filter-btn active" data-filter="todos">Todos <span class="filter-count" id="count-lead-todos">${e.length}</span></button>
                ${r?"":`
                <button class="filter-btn" data-filter="bot"><i class="fa-solid fa-robot"></i> Bot <span class="filter-count" id="count-lead-bot">${e.filter(_=>(_.statusAtendimento||"bot").toLowerCase()==="bot").length}</span></button>
                <button class="filter-btn" data-filter="humano"><i class="fa-solid fa-user"></i> Atendimento Humano <span class="filter-count" id="count-lead-humano">${e.filter(_=>{const A=(_.statusAtendimento||"").toLowerCase();return A==="em_atendimento_humano"||A==="atendimento_humano"}).length}</span></button>
                `}
                <button class="filter-btn" data-filter="bloqueado"><i class="fa-solid fa-ban"></i> Bloqueados <span class="filter-count" id="count-lead-bloqueado">${e.filter(_=>(_.statusLead||"").toLowerCase()==="bloqueado").length}</span></button>
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Status do Lead</th>
                            ${r?"":"<th>Status do Atendimento</th>"}
                            <th>Última Atividade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="leads-tbody">
                        ${l(e)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Lead Detail Modal -->
        <div id="lead-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="lead-modal-inner"></div>
            </div>
        </div>
    `;function u(){if(n){const A=di(Ot,"leads"),S=pi(A,Xn("empresaId","==",n.companyId));window._leadsUnsubscribe&&window._leadsUnsubscribe();const $=Ps(S,C=>{e=C.docs.map(g=>({id:g.id,...g.data()}));const T=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(g=>g.lojaId&&T.includes(g.lojaId)));const k=document.getElementById("leads-tbody");k&&(k.innerHTML=l(d(o)),m());const f={todos:e.length,bot:e.filter(g=>(g.statusAtendimento||"bot").toLowerCase()==="bot").length,humano:e.filter(g=>{const y=(g.statusAtendimento||"").toLowerCase();return y==="em_atendimento_humano"||y==="atendimento_humano"}).length,bloqueado:e.filter(g=>(g.statusLead||"").toLowerCase()==="bloqueado").length};Object.entries(f).forEach(([g,y])=>{const w=document.getElementById(`count-lead-${g}`);w&&(w.textContent=y.toString())})});window._leadsUnsubscribe=$}document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(A=>{A.addEventListener("click",()=>{document.querySelectorAll(".leads-filter-bar .filter-btn").forEach($=>$.classList.remove("active")),A.classList.add("active"),o=A.dataset.filter||"todos";const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(d(o))),m()})}),m();const _=document.getElementById("lead-detail-modal");_?.addEventListener("click",A=>{A.target===_&&_.classList.add("hidden")})}function m(){document.querySelectorAll(".action-btn.view").forEach(_=>{_.addEventListener("click",async()=>{const A=_.dataset.id,S=e.find($=>$.id===A);S&&b(S)})})}function b(_){const A=document.getElementById("lead-detail-modal"),S=document.getElementById("lead-modal-inner");if(!A||!S)return;const $=(_.statusLead||"novo").toLowerCase(),C=(_.statusAtendimento||"bot").toLowerCase(),T=C==="atendimento_humano"?"em_atendimento_humano":C,k=$==="bloqueado",f=(_.telefone||"").split("@")[0];let g="";!k&&!r&&(T==="bot"?g=`<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
                    <i class="fa-solid fa-user"></i> Assumir Atendimento
                </button>`:T==="em_atendimento_humano"?g=`<button id="lead-action-primary" class="btn-lead-action danger" data-action="finalizar">
                    <i class="fa-solid fa-user"></i> Finalizar Atendimento
                </button>`:g=`<button id="lead-action-primary" class="btn-lead-action" data-action="novo_atendimento">
                    <i class="fa-solid fa-user"></i> Iniciar Novo Atendimento
                </button>`);const y=v($);S.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar">${(_.nome||_.telefone||"C")[0].toUpperCase()}</div>
                <div class="lead-modal-title">
                    <h2>${_.nome||"Sem nome"}</h2>
                    <span style="color:var(--text-muted);font-size:0.9rem;">${f}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${y.length>0?`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="lead-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="lead-dropdown">
                            ${y.map(I=>`
                                <button class="lead-dropdown-item ${I.danger?"danger":""}" data-menu-action="${I.action}">
                                    ${I.icon} ${I.label}
                                </button>
                            `).join("")}
                        </div>
                    </div>`:""}
                    <button class="action-btn" id="close-lead-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

                <div class="lead-badge-group">
                    <span class="badge-label">Status do Lead</span>
                    ${Xd($)}
                </div>
                ${r?"":`
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Atendimento</span>
                    ${Zd(T)}
                </div>`}
            </div>

            <div class="lead-modal-body">
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${f||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Empresa ID</span>
                        <span class="lead-info-value" style="font-size:0.8rem;">${_.empresaId||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Criado em</span>
                        <span class="lead-info-value">${Fa(_.criadoEm||_.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${Fa(_.updatedAt)}</span>
                    </div>
                    ${_.endereco?`
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço</span>
                        <span class="lead-info-value">${_.endereco}</span>
                    </div>`:""}
                </div>

                ${_.ultimoPedido||_.lastOrder?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Último Pedido</h4>
                    <div class="lead-last-order">
                        <span>${_.ultimoPedido||_.lastOrder}</span>
                    </div>
                </div>`:""}

                ${_.historicoResumo?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Histórico</h4>
                    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${_.historicoResumo}</p>
                </div>`:""}

                ${k?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-lock"></i> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.
                </div>`:""}
            </div>

            ${g?`
            <div class="lead-modal-footer">
                ${g}
            </div>`:""}
        `,A.classList.remove("hidden"),document.getElementById("close-lead-modal")?.addEventListener("click",()=>{A.classList.add("hidden")});const w=document.getElementById("lead-menu-trigger"),h=document.getElementById("lead-dropdown");w?.addEventListener("click",I=>{I.stopPropagation(),h?.classList.toggle("hidden")}),document.addEventListener("click",()=>h?.classList.add("hidden"),{once:!0}),h?.querySelectorAll(".lead-dropdown-item").forEach(I=>{I.addEventListener("click",async()=>{h.classList.add("hidden");const x=I.dataset.menuAction;await R(x,_)})}),document.getElementById("lead-action-primary")?.addEventListener("click",async function(){const I=this.dataset.action;await D(I,_)})}function v(_,A){const S=[];return _==="bloqueado"?S.push({label:"Desbloquear Lead",icon:'<i class="fa-solid fa-unlock"></i>',action:"desbloquear"}):S.push({label:"Bloquear Lead",icon:'<i class="fa-solid fa-lock"></i>',action:"bloquear",danger:!0}),S}async function R(_,A){if(_==="bloquear"){if(!await Ye.danger("Bloquear Lead",`Deseja bloquear o lead ${A.nome||A.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`))return;try{await F.update("leads",A.id,{statusLead:"bloqueado",statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ye.now()}),A.statusLead="bloqueado",A.statusAtendimento="finalizado",A.estado="finalizado",B.success("Lead bloqueado e atendimento finalizado."),L(A),b(A)}catch{B.error("Erro ao bloquear lead.")}}if(_==="desbloquear"){if(!await Ye.warning("Desbloquear Lead",`Deseja desbloquear o lead ${A.nome||A.telefone}?`))return;try{await F.update("leads",A.id,{statusLead:"cliente_ativo",updatedAt:ye.now()}),A.statusLead="cliente_ativo",B.success("Lead desbloqueado com sucesso."),L(A),b(A)}catch{B.error("Erro ao desbloquear lead.")}}}async function D(_,A){const S=document.getElementById("lead-action-primary");if(_==="assumir"){if(!await Ye.warning("Assumir Atendimento",`Deseja assumir o atendimento humano do lead ${A.nome||A.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",A.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()}),A.statusAtendimento="em_atendimento_humano",A.estado="atendimento_humano",B.success("Atendimento humano iniciado."),L(A),b(A)}catch{B.error("Erro ao assumir atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid user"></i> Assumir Atendimento'}}if(_==="finalizar"){if(!await Ye.warning("Finalizar Atendimento",`Deseja finalizar o atendimento do lead ${A.nome||A.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",A.id,{statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ye.now()}),A.statusAtendimento="finalizado",A.estado="finalizado",B.success("Atendimento finalizado."),L(A),b(A)}catch{B.error("Erro ao finalizar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid check"></i> Finalizar Atendimento'}}if(_==="novo_atendimento"){if(!await Ye.warning("Iniciar Novo Atendimento",`Deseja iniciar um novo atendimento humano para ${A.nome||A.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",A.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()}),A.statusAtendimento="em_atendimento_humano",A.estado="atendimento_humano",B.success("Novo atendimento humano iniciado."),L(A),b(A)}catch{B.error("Erro ao iniciar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid refresh"></i> Iniciar Novo Atendimento'}}}function L(_){const A=e.findIndex($=>$.id===_.id);A>=0&&(e[A]={...e[A],..._});const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(d(o))),m()}};function Ex(n){if(!n)return null;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n).getTime();return isNaN(e)?null:e}function Ix(n){const e=Ex(n);if(e===null)return{label:"Sem registro",color:"#6b7280"};const t=Date.now()-e,i=Math.floor(t/(1e3*60*60*24)),s=Math.floor(t/(1e3*60*60)),r=Math.floor(t/(1e3*60));let o;r<60?o=r<=1?"Agora há pouco":`há ${r} min`:s<24?o=`há ${s}h`:i===1?o="Ontem":o=`há ${i} dias`;const l=i<7?"#22c55e":i<30?"#f59e0b":"#ef4444";return{label:o,color:l}}const Tx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId,[t,i,s]=await Promise.all([F.get("companies",e),F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),F.getAll("leads",{field:"empresaId",operator:"==",value:e})]);let r=[],o="nova";const l=()=>i.length===0?'<option value="">Nenhuma instância cadastrada</option>':i.map(_=>{const A=_.status==="conectado"||_.status==="open",S=t?.stores?.find(C=>C.instancia_id===_.id),$=!!S;return`<option value="${_.id}" 
                        data-status="${_.status}" 
                        ${$?"disabled":""} 
                        style="${$?"color: var(--text-muted);":""}">
                ${_.nome} ${A?'<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>':'<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i>'} ${S?`(EM USO: ${S.name})`:""}
            </option>`}).join(""),d=()=>r.length===0?'<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">Nenhuma campanha realizada ainda.</td></tr>':r.sort((_,A)=>{const S=_.data_agendamento?.seconds||_.data_inicio?.seconds||0;return(A.data_agendamento?.seconds||A.data_inicio?.seconds||0)-S}).map(_=>{const A=_.total_leads>0?Math.round((_.enviados+_.falhas)/_.total_leads*100):0,S=_.data_agendamento?new Date(_.data_agendamento.seconds*1e3).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"}):null;return`
                <tr>
                    <td>
                        <div style="font-weight: 700; color: var(--text-main);">${_.nome||"Campanha Sem Nome"}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${_.id.substring(0,8)}...</div>
                    </td>
                    <td><span class="badge secondary"><i class="fa-brands fa-whatsapp"></i> ${i.find($=>$.id===_.instancia_id)?.nome||"N/A"}</span></td>
                    <td>
                        ${S?`<div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Agendado</span></div><div style="font-size:0.85rem;font-weight:600;color:var(--primary);">${S}</div>`:_.data_inicio?new Date(_.data_inicio.seconds*1e3).toLocaleDateString():"-"}
                    </td>
                    <td><strong>${_.total_leads||0}</strong></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                                <span class="text-success">${_.enviados||0}</span>
                                <span class="text-danger">${_.falhas||0}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${A}%; height: 100%; background: var(--primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${_.status==="finalizada"?"success":_.status==="em_andamento"||_.status==="agendada"&&_.agendamento_imediato?"warning":_.status==="agendada"?"primary":"secondary"}">
                            ${_.status==="em_andamento"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':_.status==="finalizado"?'<i class="fa-solid fa-check-circle"></i> Finalizada':_.status==="processando"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':_.status==="agendada"&&_.agendamento_imediato?'<i class="fa-solid fa-hourglass-end"></i> Aguardando envio':_.status==="agendada"?'<i class="fa-solid fa-calendar"></i> Agendada':"Cancelada"}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="action-btn view-details" data-id="${_.id}" title="Ver detalhes" style="background: var(--primary); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-eye" style="color:#fff;"></i>
                            </button>
                            ${["processando","em_andamento","agendada"].includes(_.status)?`
                            <button class="action-btn cancel-campaign" data-id="${_.id}" title="Cancelar campanha" style="background: var(--danger); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-ban" style="color:#fff;"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join(""),u=`
        <style>
            .campaign-container { max-width: 1200px; margin: 0 auto; }
            .campaign-tabs { 
                display: flex; 
                gap: 0.5rem; 
                margin-bottom: 2rem; 
                padding: 4px;
                background: var(--surface-hover);
                border-radius: 12px;
                width: fit-content;
            }
            .tab-btn { 
                background: none; 
                border: none; 
                color: var(--text-muted); 
                font-weight: 600; 
                cursor: pointer; 
                padding: 0.6rem 1.5rem; 
                border-radius: 10px; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                font-size: 0.9rem;
            }
            .tab-btn:hover { color: var(--text-main); }
            .tab-btn.active { 
                color: white; 
                background: var(--primary); 
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .step-card { 
                margin-bottom: 2rem; 
                border: 1px solid var(--border-color);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }
            .step-card:hover { transform: translateY(-2px); }
            .step-header { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                margin-bottom: 1.5rem; 
                font-size: 1.1rem;
                font-weight: 700; 
                color: var(--text-main); 
            }
            .step-number { 
                width: 28px; 
                height: 28px; 
                background: var(--primary); 
                color: white; 
                border-radius: 8px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.9rem;
                box-shadow: 0 2px 5px rgba(99, 102, 241, 0.4);
            }
            
            /* Premium Inputs */
            .form-control {
                background: var(--surface-hover) !important;
                border: 1px solid var(--border-color) !important;
                color: var(--text-main) !important;
                border-radius: 10px !important;
                padding: 0.8rem 1rem !important;
                font-size: 0.95rem !important;
                transition: all 0.2s !important;
            }
            .form-control:focus {
                border-color: var(--primary) !important;
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                outline: none !important;
            }
            select.form-control {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
                padding-right: 2.5rem !important;
            }

            .var-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
            .var-chip { 
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 6px 14px; 
                background: rgba(99, 102, 241, 0.1); 
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 20px; 
                font-size: 0.8rem; 
                cursor: grab; 
                color: var(--primary);
                font-weight: 600;
                transition: all 0.2s;
                user-select: none;
            }
            .var-chip:hover { 
                border-color: var(--primary); 
                background: rgba(99, 102, 241, 0.15);
            }
            
            /* Lead Selection Table */
            .leads-selection-table-wrap {
                margin-top: 1.5rem;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                background: var(--surface-light);
                overflow: hidden;
            }
            .leads-table-filters {
                padding: 1rem;
                background: var(--surface-hover);
                border-bottom: 1px solid var(--border-color);
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 1rem;
            }
            @media (max-width: 900px) {
                .leads-table-filters {
                    grid-template-columns: 1fr 1fr;
                }
            }
            .leads-table-content {
                max-height: 400px;
                overflow-y: auto;
            }
            .leads-table {
                width: 100%;
                border-collapse: collapse;
            }
            .leads-table th {
                background: var(--surface-hover);
                padding: 10px 15px;
                text-align: left;
                font-size: 0.75rem;
                text-transform: uppercase;
                color: var(--text-muted);
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .leads-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                font-size: 0.9rem;
            }
            .leads-table tr:hover { background: rgba(255,255,255,0.02); }
            
            .leads-pagination {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--surface-hover);
                border-top: 1px solid var(--border-color);
            }

            /* Multiple Messages */
            .message-block {
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.25rem;
                margin-bottom: 1rem;
                position: relative;
            }
            .message-block-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .btn-remove-msg {
                color: var(--danger);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }
            .btn-add-msg {
                width: 100%;
                padding: 0.75rem;
                background: var(--surface-hover);
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                color: var(--text-muted);
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
                transition: all 0.2s;
            }
            .btn-add-msg:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }

            .leads-counter-card { 
                padding: 1.25rem; 
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 100%);
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 12px; 
                margin: 1.5rem 0; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                gap: 15px; 
            }
            .leads-count-info { display: flex; align-items: center; gap: 12px; }
            .leads-count-icon {
                width: 40px;
                height: 40px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }
            
            .view-leads-btn {
                background: none;
                border: 1px solid var(--border-color);
                color: var(--text-main);
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .view-leads-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
            }

            .delay-inputs { display: flex; gap: 1.5rem; align-items: center; }
            .delay-box { flex: 1; }
            .delay-box label { display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); }

            .schedule-toggle {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.55rem 1.2rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background: var(--surface-hover);
                color: var(--text-muted);
                font-weight: 600;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .schedule-toggle:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            .schedule-toggle.active {
                background: var(--primary);
                border-color: var(--primary);
                color: #fff;
                box-shadow: 0 2px 8px rgba(99,102,241,0.35);
            }
            
            .instance-status-tag {
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-left: 8px;
            }
            .status-online { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
            .status-offline { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

            .badge.em_uso { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

            /* Selected Leads List */
            #leads-list-container { margin-top: 1rem; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: none; }
            .leads-list-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            .leads-list-table th { background: var(--surface-light); text-align: left; padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table td { padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table tr:last-child td { border-bottom: none; }

            .filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            @media (max-width: 768px) { .filter-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="campaign-container">
            <div class="page-header" style="flex-direction: column;">
                <div><h2 class="page-title">Disparo em Massa</h2></div>
                <div><p class="page-description">Envie mensagens personalizadas para seus leads de forma estratégica.</p></div>
            </div>

            <div class="campaign-tabs">
                <button class="tab-btn ${o==="nova"?"active":""}" id="tab-nova">
                    <i class="fa-solid fa-plus-circle" style="margin-right: 6px;"></i>Nova Campanha
                </button>
                <button class="tab-btn ${o==="historico"?"active":""}" id="tab-historico">
                    <i class="fa-solid fa-history" style="margin-right: 6px;"></i>Histórico
                </button>
            </div>

            <div id="campaign-view-container">
                <!-- Content dynamicly loaded -->
            </div>
        </div>

        <!-- Detail Modal -->
        <div id="campaign-detail-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 850px;">
                <span class="close-modal" id="close-detail-modal">&times;</span>
                <div id="campaign-detail-content"></div>
            </div>
        </div>
    `;return setTimeout(()=>v(),100),u;function m(){return`
            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">1</div> <span>Dados Campanha</span>
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label style="display:block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">Nome da Campanha</label>
                    <input type="text" id="campaign-name" class="form-control" placeholder="Ex: Promoção de Fevereiro, Leads Inativos..." maxlength="80">
                </div>
                <div class="form-group">
                    <label>Selecione a instância de WhatsApp</label>
                    <select id="select-instance" class="form-control" style="font-size: 1rem; padding: 0.75rem;">
                        <option value="">Selecione uma instância disponível...</option>
                        ${l()}
                    </select>
                    <div style="margin-top: 0.75rem; display: flex; align-items: flex-start; gap: 8px; color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fa-solid fa-circle-info" style="margin-top: 3px; color: var(--primary);"></i>
                        <span>Importante: Instâncias já vinculadas a uma loja estão protegidas e não podem ser usadas em disparos em massa para evitar bloqueios no número oficial.</span>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">2</div> <span>Público Alvo</span>
                </div>
                
                <div class="leads-selection-table-wrap">
                    <div class="leads-table-filters">
                        <input type="text" id="lead-search" class="form-control" placeholder="Buscar por nome ou telefone...">
                        <select id="lead-filter-store" class="form-control">
                            <option value="">Todas as Lojas</option>
                            ${t?.stores?.map(_=>`<option value="${_.id}">${_.name}</option>`).join("")}
                        </select>
                        <select id="lead-filter-status" class="form-control">
                            <option value="">Todos os Status</option>
                            <option value="novo">Novo</option>
                            <option value="cliente_ativo">Cliente Ativo</option>
                            <option value="lead_frio">Lead Frio</option>
                        </select>
                        <select id="lead-filter-activity" class="form-control">
                            <option value="">Qualquer atividade</option>
                            <option value="7">Últimos 7 dias</option>
                            <option value="15">Últimos 15 dias</option>
                            <option value="30">Últimos 30 dias</option>
                            <option value="90">Últimos 90 dias</option>
                        </select>
                    </div>
                    
                    <div class="leads-table-content">
                        <table class="leads-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px;"><input type="checkbox" id="select-all-leads"></th>
                                    <th>Nome</th>
                                    <th>WhatsApp</th>
                                    <th>Loja</th>
                                    <th>Status</th>
                                    <th>Última Atividade</th>
                                </tr>
                            </thead>
                            <tbody id="leads-table-body">
                                <!-- Paginated list -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="leads-pagination">
                        <div style="font-size: 0.85rem; color: var(--text-muted);" id="pagination-info">Mostrando 0 de 0</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn-secondary" id="prev-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="btn-secondary" id="next-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="leads-counter-card">
                    <div class="leads-count-info">
                        <div class="leads-count-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
                                <span id="selected-count-display">0</span> Leads Selecionados
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Estes contatos receberão suas mensagens.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">3</div> <span>Composição da Mensagem</span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">VARIÁVEIS (Arraste para a mensagem):</span>
                    <div class="var-grid" id="var-chips-container">
                        <div class="var-chip" draggable="true" data-var="{{nome}}"><i class="fa-solid fa-user"></i> Nome</div>
                        <div class="var-chip" draggable="true" data-var="{{telefone}}"><i class="fa-solid fa-phone"></i> Telefone</div>
                        <div class="var-chip" draggable="true" data-var="{{endereco}}"><i class="fa-solid fa-location-dot"></i> Endereço</div>
                    </div>
                </div>

                <div id="messages-list">
                    <!-- Multiple messages -->
                </div>
                
                <button class="btn-add-msg" id="btn-add-message">
                    <i class="fa-solid fa-plus-circle"></i> Adicionar Alternativa de Mensagem
                </button>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">4</div> <span>Configurações Inteligentes</span>
                </div>
                <div class="delay-inputs">
                    <div class="delay-box">
                        <label>Intervalo Mínimo (segundos)</label>
                        <input type="number" id="delay-min" class="form-control" value="20" min="5">
                    </div>
                    <div class="delay-box">
                        <label>Intervalo Máximo (segundos)</label>
                        <input type="number" id="delay-max" class="form-control" value="60" min="10">
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(245, 158, 11, 0.05); border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 0.85rem; color: #b45309; margin-bottom: 0;">
                        <i class="fa-solid fa-triangle-exclamation"></i> <strong>Dica Anti-Ban:</strong> Utilize intervalos maiores (ex: 30-90s) para disparos acima de 50 contatos.
                    </p>
                </div>

                <!-- Scheduling Section -->
                <div style="margin-top: 1.75rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                        <i class="fa-solid fa-clock"></i> Quando Enviar?
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <button id="btn-send-now" class="schedule-toggle active" data-mode="now">
                            <i class="fa-solid fa-bolt"></i> Agora
                        </button>
                        <button id="btn-send-scheduled" class="schedule-toggle" data-mode="scheduled">
                            <i class="fa-solid fa-calendar"></i> Agendar
                        </button>
                    </div>
                    <div id="schedule-datetime-wrap" style="display: none;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Data e Hora do Disparo</label>
                        <input type="datetime-local" id="schedule-datetime" class="form-control" style="max-width: 320px;">
                        <div id="schedule-error" style="display:none; margin-top: 0.5rem; font-size: 0.82rem; color: #ef4444;">
                            <i class="fa-solid fa-circle-exclamation"></i> Selecione uma data e hora no futuro.
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn-primary full-width" id="btn-start-campaign" disabled style="padding: 1rem; font-size: 1.1rem; border-radius: 12px;">
                        <i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora
                    </button>
                </div>
            </div>
        `}function b(){return`
            <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Campanha</th>
                                <th>Instância</th>
                                <th>Data</th>
                                <th>Público</th>
                                <th style="width: 150px;">Progresso</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                            <tbody id="campaigns-tbody">
                                ${d()}
                            </tbody>
                    </table>
                </div>
            </div>
        `}function v(){const _=document.getElementById("campaign-view-container");if(!_)return;const A=di(Ot,"campanhas"),S=pi(A,Xn("cliente_id","==",e));window._campaignsUnsubscribe&&window._campaignsUnsubscribe();const $=Ps(S,f=>{if(r=f.docs.map(g=>({id:g.id,...g.data()})),o==="historico"){const g=document.getElementById("campaigns-tbody");g&&(g.innerHTML=d(),D())}});window._campaignsUnsubscribe=$;const C=()=>{o==="nova"?(_.innerHTML=m(),R()):(_.innerHTML=b(),D())},T=document.getElementById("tab-nova"),k=document.getElementById("tab-historico");T?.addEventListener("click",()=>{o="nova",T.classList.add("active"),k?.classList.remove("active"),C()}),k?.addEventListener("click",()=>{o="historico",k.classList.add("active"),T?.classList.remove("active"),C()}),C()}function R(){let _=1;const A=15;let S=new Set,$=s,C=[""];const T=document.getElementById("campaign-name"),k=document.getElementById("select-instance"),f=document.getElementById("btn-start-campaign"),g=document.getElementById("lead-search"),y=document.getElementById("lead-filter-store"),w=document.getElementById("lead-filter-status"),h=document.getElementById("lead-filter-activity"),I=document.getElementById("leads-table-body"),x=document.getElementById("select-all-leads"),P=document.getElementById("pagination-info"),M=document.getElementById("prev-page"),q=document.getElementById("next-page"),j=document.getElementById("selected-count-display"),K=document.getElementById("messages-list"),J=document.getElementById("btn-add-message"),ie=()=>{const ge=g.value.toLowerCase(),oe=y.value,Pe=w.value,Ee=h?parseInt(h.value||"0"):0,de=Date.now(),ke=Ee>0?de-Ee*24*60*60*1e3:null;$=s.filter(ae=>{const Te=!ge||(ae.nome||"").toLowerCase().includes(ge)||(ae.telefone||"").includes(ge),st=!oe||ae.lojaId===oe,Dt=!Pe||(ae.statusLead||"novo")===Pe;let zt=!0;if(ke!==null){const jt=ae.updatedAt||ae.criadoEm||ae.createdAt;let O=null;jt&&(typeof jt.toDate=="function"?O=jt.toDate().getTime():jt.seconds?O=jt.seconds*1e3:O=new Date(jt).getTime()),zt=O!==null&&O>=ke}return Te&&st&&Dt&&zt}),_=1,he()},he=()=>{if(!I||!P)return;const ge=(_-1)*A,oe=Math.min(ge+A,$.length),Pe=$.slice(ge,oe);I.innerHTML=Pe.map(de=>{const ke=S.has(de.id),ae=t?.stores?.find(st=>st.id===de.lojaId)?.name||"N/A",Te=Ix(de.updatedAt||de.criadoEm||de.createdAt);return`
                    <tr>
                        <td><input type="checkbox" class="lead-checkbox" data-id="${de.id}" ${ke?"checked":""}></td>
                        <td>${de.nome||"Sem nome"}</td>
                        <td>${(de.telefone||"").split("@")[0]}</td>
                        <td><span class="badge secondary" style="font-size: 0.7rem;">${ae}</span></td>
                        <td><span class="badge ${de.statusLead==="cliente_ativo"?"success":"secondary"}" style="font-size: 0.7rem;">${de.statusLead||"novo"}</span></td>
                        <td>
                            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-muted);">
                                <span style="width:7px;height:7px;border-radius:50%;background:${Te.color};flex-shrink:0;"></span>
                                <span style="color:${Te.color};font-weight:600;">${Te.label}</span>
                            </span>
                        </td>
                    </tr>
                `}).join(""),P.textContent=`Mostrando ${ge+1}-${oe} de ${$.length}`,j&&(j.textContent=S.size.toString());const Ee=Pe.length>0&&Pe.every(de=>S.has(de.id));x&&(x.checked=Ee),document.querySelectorAll(".lead-checkbox").forEach(de=>{de.addEventListener("change",ke=>{const ae=ke.target.dataset.id;ke.target.checked?S.add(ae):S.delete(ae),j&&(j.textContent=S.size.toString()),pe()})}),pe()},ce=()=>{K&&(K.innerHTML=C.map((ge,oe)=>`
                <div class="message-block" data-index="${oe}">
                    <div class="message-block-header">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">MENSAGEM #${oe+1}</span>
                        ${C.length>1?`<button class="btn-remove-msg" data-index="${oe}"><i class="fa-solid fa-trash-can"></i> Remover</button>`:""}
                    </div>
                    <textarea class="form-control msg-textarea" rows="5" placeholder="Digite sua mensagem aqui..." data-index="${oe}" style="width: 100%; box-sizing: border-box;">${ge}</textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                        <span class="char-count" style="font-size: 0.7rem; color: var(--text-muted);">${ge.length} caracteres</span>
                    </div>
                </div>
            `).join(""),document.querySelectorAll(".btn-remove-msg").forEach(ge=>{const oe=ge;oe.addEventListener("click",()=>{const Pe=parseInt(oe.dataset.index||"0");C.splice(Pe,1),ce(),pe()})}),document.querySelectorAll(".msg-textarea").forEach(ge=>{const oe=ge;oe.addEventListener("input",()=>{const Pe=parseInt(oe.dataset.index||"0");C[Pe]=oe.value;const Ee=oe.parentElement?.querySelector(".char-count");Ee&&(Ee.textContent=`${oe.value.length} caracteres`),pe()}),oe.addEventListener("dragover",Pe=>Pe.preventDefault()),oe.addEventListener("drop",Pe=>{Pe.preventDefault();const Ee=Pe.dataTransfer.getData("text/plain");if(!Ee)return;const de=oe.selectionStart||oe.value.length,ke=oe.selectionEnd||oe.value.length,ae=oe.value.slice(0,de)+Ee+oe.value.slice(ke);oe.value=ae;const Te=parseInt(oe.dataset.index||"0");C[Te]=ae,pe()})}))},pe=()=>{const ge=!!k.value,oe=S.size>0,Pe=C.every(ae=>ae.trim().length>0),Ee=k.options[k.selectedIndex],de=Ee?.dataset.status==="conectado"||Ee?.dataset.status==="open";let ke=!0;if(xe==="scheduled"){const ae=lt?.value;(!ae||new Date(ae).getTime()<=Date.now())&&(ke=!1)}f.disabled=!(ge&&de&&oe&&Pe&&ke)};g?.addEventListener("input",ie),y?.addEventListener("change",ie),w?.addEventListener("change",ie),h?.addEventListener("change",ie),T?.addEventListener("input",pe),M?.addEventListener("click",()=>{_>1&&(_--,he())}),q?.addEventListener("click",()=>{_<Math.ceil($.length/A)&&(_++,he())}),x?.addEventListener("change",ge=>{const oe=(_-1)*A,Pe=Math.min(oe+A,$.length),Ee=$.slice(oe,Pe);ge.target.checked?Ee.forEach(de=>S.add(de.id)):Ee.forEach(de=>S.delete(de.id)),he()}),J?.addEventListener("click",()=>{C.push(""),ce(),pe()}),document.querySelectorAll(".var-chip").forEach(ge=>{const oe=ge;oe.addEventListener("dragstart",Pe=>{Pe.dataTransfer.setData("text/plain",oe.dataset.var||"")})});let xe="now";k?.addEventListener("change",pe);const We=document.getElementById("btn-send-now"),Ge=document.getElementById("btn-send-scheduled"),Xe=document.getElementById("schedule-datetime-wrap"),lt=document.getElementById("schedule-datetime"),gt=document.getElementById("schedule-error"),ct=()=>{xe==="scheduled"?f.innerHTML='<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha':f.innerHTML='<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora'},It=ge=>String(ge).padStart(2,"0"),tt=new Date;tt.setMinutes(tt.getMinutes()+5),lt.min=`${tt.getFullYear()}-${It(tt.getMonth()+1)}-${It(tt.getDate())}T${It(tt.getHours())}:${It(tt.getMinutes())}`,We?.addEventListener("click",()=>{xe="now",We.classList.add("active"),Ge?.classList.remove("active"),Xe&&(Xe.style.display="none"),gt&&(gt.style.display="none"),ct(),pe()}),Ge?.addEventListener("click",()=>{xe="scheduled",Ge.classList.add("active"),We?.classList.remove("active"),Xe&&(Xe.style.display="block"),ct(),pe()}),lt?.addEventListener("change",()=>{gt&&(gt.style.display="none"),pe()}),f?.addEventListener("click",async()=>{if(xe==="scheduled"){const de=lt?.value;if(!de||new Date(de).getTime()<=Date.now()){gt&&(gt.style.display="block");return}}const ge=xe==="scheduled",oe=ge?new Date(lt.value):new Date,Pe=ge?`Confirma o agendamento para ${oe.toLocaleString("pt-BR")} com ${S.size} leads?`:`Deseja iniciar o disparo imediato para ${S.size} leads com ${C.length} variações de mensagem?`;if(await Ye.warning(ge?"Agendar Campanha":"Iniciar Campanha",Pe))try{f.disabled=!0,f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const de={cliente_id:e,instancia_id:k.value,nome:T?.value?.trim()||`Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,mensagens:C,total_leads:S.size,lead_ids:Array.from(S),enviados:0,falhas:0,status:"agendada",agendamento_imediato:!ge,data_agendamento:ye.fromDate(oe),data_inicio:null,config:{delay_min:parseInt(document.getElementById("delay-min").value||"20"),delay_max:parseInt(document.getElementById("delay-max").value||"60")}};await F.create("campanhas",de),B.success(ge?"Campanha agendada com sucesso!":"Campanha criada! O disparo será iniciado em instantes."),window.location.reload()}catch(de){B.error("Erro ao salvar campanha: "+de),f.disabled=!1,ct()}}),he(),ce()}function D(){document.querySelectorAll(".view-details").forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.id,C=r.find(T=>T.id===$);C&&L(C)})}),document.querySelectorAll(".cancel-campaign").forEach(S=>{S.addEventListener("click",async()=>{const $=S.dataset.id;if(!r.find(k=>k.id===$))return;if(await Ye.danger("Cancelar Campanha","Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito."))try{await F.update("campanhas",$,{status:"cancelada"}),B.success("Campanha cancelada com sucesso.")}catch(k){B.error("Erro ao cancelar a campanha."),console.error("Erro ao cancelar campanha:",k)}})});const _=document.getElementById("close-detail-modal"),A=document.getElementById("campaign-detail-modal");_?.addEventListener("click",()=>A?.classList.add("hidden"))}function L(_){const A=document.getElementById("campaign-detail-modal"),S=document.getElementById("campaign-detail-content");if(!A||!S)return;const $=_.total_leads>0?Math.round((_.enviados+_.falhas)/_.total_leads*100):0;S.innerHTML=`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
                <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    <i class="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                    <h3 style="margin: 0;">${_.nome||"Detalhes da Campanha"}</h3>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Iniciada em ${new Date(_.data_inicio.seconds*1e3).toLocaleString()}</p>
                </div>
            </div>

            <div class="lead-info-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Público Total</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${_.total_leads}</div>
                </div>
                <div class="card" style="background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #22c55e; text-transform: uppercase; margin-bottom: 0.5rem;">Sucesso</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">${_.enviados}</div>
                </div>
                <div class="card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #ef4444; text-transform: uppercase; margin-bottom: 0.5rem;">Falhas</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${_.falhas}</div>
                </div>
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Status</div>
                    <span class="badge ${_.status==="finalizada"?"success":"warning"}" style="font-size: 0.8rem;">${_.status.toUpperCase()}</span>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                    <span>Progresso do Envio</span>
                    <span>${$}%</span>
                </div>
                <div style="width: 100%; height: 12px; background: var(--surface-hover); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${$}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, #818cf8 100%); border-radius: 6px; transition: width 0.5s ease;"></div>
                </div>
            </div>

            <div class="card" style="background: var(--surface-hover); border: 1px solid var(--border-color); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-message text-primary"></i>
                    Variações de Mensagem
                    <span class="badge secondary" style="font-size: 0.75rem; margin-left: 4px;">${(_.mensagens||[_.mensagem]).filter(Boolean).length}</span>
                </div>
                ${(_.mensagens?.length?_.mensagens:_.mensagem?[_.mensagem]:["(sem mensagem)"]).map((C,T)=>`
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border: 1px solid var(--border-color);
                            border-radius: 10px;
                            padding: 1rem 1.25rem;
                            margin-bottom: 0.75rem;
                            position: relative;
                        ">
                            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
                                <i class="fa-solid fa-comment"></i> Mensagem #${T+1}
                            </div>
                            <div style="white-space: pre-wrap; font-size: 0.92rem; line-height: 1.65; color: var(--text-main); font-family: inherit;">${C}</div>
                        </div>
                    `).join("")}
            </div>
        `,A.classList.remove("hidden")}},_i={agendado:{label:"Agendado",color:"#6366f1",icon:"fa-clock"},confirmado:{label:"Confirmado",color:"#10b981",icon:"fa-circle-check"},concluido:{label:"Concluído",color:"#64748b",icon:"fa-flag-checkered"},cancelado:{label:"Cancelado",color:"#ef4444",icon:"fa-ban"}},At=n=>String(n).padStart(2,"0"),is=n=>{const[e,t,i]=n.split("-");return`${i}/${t}/${e}`},ss=n=>n?.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})??"R$ 0,00",rs=()=>{const n=new Date;return`${n.getFullYear()}-${At(n.getMonth()+1)}-${At(n.getDate())}`},kx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await F.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;const r=(await F.getAll("products",{field:"companyId",operator:"==",value:e})).filter(h=>h.active!==!1);let o=await F.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),l=rs(),d="day";const u=h=>{const I=new Date(h+"T12:00:00"),x=I.getDay(),P=new Date(I);return P.setDate(I.getDate()-((x===0?7:x)-1)),Array.from({length:7},(M,q)=>{const j=new Date(P);return j.setDate(P.getDate()+q),`${j.getFullYear()}-${At(j.getMonth()+1)}-${At(j.getDate())}`})},m=h=>o.filter(I=>I.date===h).sort((I,x)=>I.time.localeCompare(x.time)),b=h=>o.filter(I=>h.includes(I.date)).sort((I,x)=>I.date.localeCompare(x.date)||I.time.localeCompare(x.time)),v=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],R=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],D=h=>{const I=new Date(h+"T12:00:00");return v[I.getDay()]},L=h=>{const I=new Date(h+"T12:00:00");return`${R[I.getMonth()]} ${I.getFullYear()}`},_=h=>{const I=_i[h]||_i.agendado;return`<span class="sched-badge" style="background:${I.color}22;color:${I.color};border-color:${I.color}44;">
            <i class="fa-solid ${I.icon}"></i> ${I.label}
        </span>`},A=h=>{const I=_i[h.status]||_i.agendado;return`
        <div class="sched-card" data-id="${h.id}" style="border-left-color: ${I.color};">
            <div class="sched-card-time">
                <span class="sched-time">${h.time}</span>
                <span class="sched-duration">${h.duration||30}min</span>
            </div>
            <div class="sched-card-body">
                <div class="sched-client">
                    <i class="fa-solid fa-user"></i>
                    <strong>${h.clientName}</strong>
                    <span class="sched-phone"><i class="fa-brands fa-whatsapp"></i> ${h.clientPhone}</span>
                </div>
                <div class="sched-service">
                    <i class="fa-solid fa-list-check"></i>
                    <span>${h.serviceName}</span>
                    <span class="sched-price">${ss(h.servicePrice)}</span>
                </div>
                ${h.notes?`<div class="sched-notes"><i class="fa-solid fa-note-sticky"></i> ${h.notes}</div>`:""}
                ${_(h.status)}
            </div>
            <div class="sched-card-actions">
                ${h.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${h.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                ${h.status==="confirmado"?`<button class="sched-action-btn done" onclick="window.completeAppointment('${h.id}')" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>`:""}
                <button class="sched-action-btn edit" onclick="window.editAppointment('${h.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${h.id}')" title="Cancelar/Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`},S=()=>{const h=m(l),I=h.reduce((x,P)=>x+(P.servicePrice||0),0);return`
        <div class="sched-day-header">
            <button class="sched-nav-btn" id="prev-day"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="sched-day-info">
                <span class="sched-day-name">${D(l)}</span>
                <span class="sched-day-date">${is(l)}</span>
                <span class="sched-day-month">${L(l)}</span>
            </div>
            <button class="sched-nav-btn" id="next-day"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-stats-row">
            <div class="sched-stat"><i class="fa-solid fa-calendar-check"></i> <strong>${h.length}</strong> agendamentos</div>
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${ss(I)}</strong> previsão</div>
            <div class="sched-stat"><i class="fa-solid fa-circle-check" style="color:#10b981"></i> <strong>${h.filter(x=>x.status==="confirmado").length}</strong> confirmados</div>
        </div>
        <div class="sched-appointments-list" id="appointments-list">
            ${h.length===0?`
            <div class="sched-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>Nenhum agendamento para este dia.</p>
                <button class="btn-primary" id="btn-add-for-day" style="margin-top:1rem;">
                    <i class="fa-solid fa-plus"></i> Novo Agendamento
                </button>
            </div>`:h.map(A).join("")}
        </div>`},$=()=>{const h=u(l),I=b(h);return`
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${is(h[0])} a ${is(h[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${h.map(x=>{const P=I.filter(j=>j.date===x);return`
                <div class="sched-week-col ${x===rs()?"today":""} ${x===l?"selected":""}" data-date="${x}" onclick="window.selectWeekDay('${x}')">
                    <div class="sched-week-col-header">
                        <span class="sched-wday">${D(x)}</span>
                        <span class="sched-wdate">${x.split("-")[2]}</span>
                        ${P.length>0?`<span class="sched-wcount">${P.length}</span>`:""}
                    </div>
                    <div class="sched-week-appts">
                        ${P.map(j=>`<div class="sched-week-item" style="border-left-color:${(_i[j.status]||_i.agendado).color};" onclick="event.stopPropagation(); window.editAppointment('${j.id}')">
                                <span class="sched-wtime">${j.time}</span>
                                <span class="sched-wclient">${j.clientName}</span>
                            </div>`).join("")}
                    </div>
                </div>`}).join("")}
        </div>`},C=()=>{const h=[...o].sort((P,M)=>P.date.localeCompare(M.date)||P.time.localeCompare(M.time)),I=h.filter(P=>P.date>=rs()&&P.status!=="cancelado"),x=h.filter(P=>P.date<rs()||P.status==="cancelado");return`
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${I.length})</div>
            ${I.length===0?'<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>':""}
            ${I.map(P=>`
                <div class="sched-list-row">
                    <div class="sched-list-date">
                        <span>${is(P.date)}</span>
                        <span>${P.time}</span>
                    </div>
                    <div class="sched-list-info">
                        <strong>${P.clientName}</strong>
                        <span>${P.serviceName}</span>
                    </div>
                    <div>${ss(P.servicePrice)}</div>
                    <div>${_(P.status)}</div>
                    <div class="sched-list-actions">
                        ${P.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${P.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                        <button class="sched-action-btn edit" onclick="window.editAppointment('${P.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${P.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`).join("")}
        </div>
        ${x.length>0?`
        <div class="sched-list-section" style="margin-top:2rem; opacity:0.7;">
            <div class="sched-list-title"><i class="fa-solid fa-history"></i> Histórico (${x.length})</div>
            ${x.slice(0,10).map(P=>`
                <div class="sched-list-row">
                    <div class="sched-list-date"><span>${is(P.date)}</span><span>${P.time}</span></div>
                    <div class="sched-list-info"><strong>${P.clientName}</strong><span>${P.serviceName}</span></div>
                    <div>${ss(P.servicePrice)}</div>
                    <div>${_(P.status)}</div>
                    <div style="width:60px;"></div>
                </div>`).join("")}
        </div>`:""}`},T=Array.from({length:28},(h,I)=>{const x=Math.floor(I/2)+8,P=I%2===0?"00":"30";return`${At(x)}:${P}`}),k=`
    <div id="sched-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:560px; width:95%;">
            <span class="close-modal" id="close-sched-modal">&times;</span>
            <h2 id="sched-modal-title" style="margin-bottom:0.25rem;">Novo Agendamento</h2>
            <p class="text-muted" style="font-size:0.9rem; margin-bottom:1.5rem;">Preencha os dados do agendamento.</p>

            <div style="display:grid; gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Cliente</label>
                    <input type="text" id="sched-client-name" class="form-input" placeholder="Nome do cliente" required>
                </div>
                <div class="form-group">
                    <label class="form-label">WhatsApp do Cliente</label>
                    <input type="tel" id="sched-client-phone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">Serviço</label>
                    <select id="sched-service" class="form-input">
                        <option value="">Selecione um serviço...</option>
                        ${r.map(h=>`<option value="${h.id}" data-price="${h.price}" data-duration="${h.duration||30}">${h.name} — ${ss(h.price)}</option>`).join("")}
                    </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" id="sched-date" class="form-input" value="${l}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Horário</label>
                        <select id="sched-time" class="form-input">
                            ${T.map(h=>`<option value="${h}">${h}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Duração (minutos)</label>
                    <input type="number" id="sched-duration" class="form-input" value="30" min="15" max="480" step="15">
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select id="sched-status" class="form-input">
                        <option value="agendado">⏰ Agendado</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="concluido">🏁 Concluído</option>
                        <option value="cancelado">❌ Cancelado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sched-notes" class="form-input" rows="3" style="resize:vertical;" placeholder="Alguma informação extra..."></textarea>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-sched-modal">Cancelar</button>
                <button class="btn-primary" id="save-sched-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>w(),100);const f=()=>{const h=document.getElementById("sched-view-content");h&&(d==="day"?h.innerHTML=S():d==="week"?h.innerHTML=$():h.innerHTML=C(),g())},g=()=>{document.getElementById("prev-day")?.addEventListener("click",()=>{const h=new Date(l+"T12:00:00");h.setDate(h.getDate()-1),l=`${h.getFullYear()}-${At(h.getMonth()+1)}-${At(h.getDate())}`,f()}),document.getElementById("next-day")?.addEventListener("click",()=>{const h=new Date(l+"T12:00:00");h.setDate(h.getDate()+1),l=`${h.getFullYear()}-${At(h.getMonth()+1)}-${At(h.getDate())}`,f()}),document.getElementById("prev-week")?.addEventListener("click",()=>{const h=new Date(l+"T12:00:00");h.setDate(h.getDate()-7),l=`${h.getFullYear()}-${At(h.getMonth()+1)}-${At(h.getDate())}`,f()}),document.getElementById("next-week")?.addEventListener("click",()=>{const h=new Date(l+"T12:00:00");h.setDate(h.getDate()+7),l=`${h.getFullYear()}-${At(h.getMonth()+1)}-${At(h.getDate())}`,f()}),document.getElementById("btn-add-for-day")?.addEventListener("click",()=>{y()})};function y(h){const I=document.getElementById("sched-modal");if(!I)return;const x=document.getElementById("sched-modal-title"),P=document.getElementById("sched-client-name"),M=document.getElementById("sched-client-phone"),q=document.getElementById("sched-service"),j=document.getElementById("sched-date"),K=document.getElementById("sched-time"),J=document.getElementById("sched-duration"),ie=document.getElementById("sched-status"),he=document.getElementById("sched-notes"),ce=document.getElementById("save-sched-btn");h?(x.innerText="Editar Agendamento",P.value=h.clientName,M.value=h.clientPhone,q.value=h.serviceId,j.value=h.date,K.value=h.time,J.value=String(h.duration||30),ie.value=h.status,he.value=h.notes||"",ce.setAttribute("data-edit-id",h.id)):(x.innerText="Novo Agendamento",P.value="",M.value="",q.value="",j.value=l,K.value="09:00",J.value="30",ie.value="agendado",he.value="",ce.removeAttribute("data-edit-id")),I.classList.remove("hidden")}function w(){document.getElementById("btn-new-appointment")?.addEventListener("click",()=>y()),document.getElementById("close-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("cancel-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("sched-service")?.addEventListener("change",h=>{const I=h.target,P=I.options[I.selectedIndex].dataset.duration;P&&(document.getElementById("sched-duration").value=P)}),document.getElementById("save-sched-btn")?.addEventListener("click",async()=>{const h=document.getElementById("sched-client-name"),I=document.getElementById("sched-client-phone"),x=document.getElementById("sched-service"),P=document.getElementById("sched-date"),M=document.getElementById("sched-time"),q=document.getElementById("sched-duration"),j=document.getElementById("sched-status"),K=document.getElementById("sched-notes"),J=document.getElementById("save-sched-btn");if(!h.value.trim()){B.warning("Informe o nome do cliente.");return}if(!x.value){B.warning("Selecione um serviço.");return}if(!P.value){B.warning("Informe a data.");return}const ie=x.options[x.selectedIndex],he={serviceId:x.value,serviceName:ie.text.split(" — ")[0],servicePrice:parseFloat(ie.dataset.price||"0")},ce={companyId:e,clientName:h.value.trim(),clientPhone:I.value.trim(),...he,date:P.value,time:M.value,duration:parseInt(q.value)||30,status:j.value,notes:K.value.trim()||void 0},pe=J.getAttribute("data-edit-id");J.disabled=!0,J.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(pe){await F.update("agendamentos",pe,ce);const xe=o.findIndex(We=>We.id===pe);xe!==-1&&(o[xe]={id:pe,...ce}),B.success("Agendamento atualizado!")}else{const xe=await F.create("agendamentos",ce);o.push({id:xe,...ce}),B.success("Agendamento criado com sucesso!")}document.getElementById("sched-modal")?.classList.add("hidden"),f()}catch(xe){B.error("Erro ao salvar agendamento: "+xe)}finally{J.disabled=!1,J.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.querySelectorAll(".sched-view-tab").forEach(h=>{h.addEventListener("click",()=>{document.querySelectorAll(".sched-view-tab").forEach(I=>I.classList.remove("active")),h.classList.add("active"),d=h.dataset.view,f()})}),document.getElementById("sched-date-jump")?.addEventListener("change",h=>{l=h.target.value,f()}),document.getElementById("btn-today")?.addEventListener("click",()=>{l=rs(),document.getElementById("sched-date-jump").value=l,f()}),window.editAppointment=h=>{const I=o.find(x=>x.id===h);I&&y(I)},window.confirmAppointment=async h=>{try{await F.update("agendamentos",h,{status:"confirmado"});const I=o.find(x=>x.id===h);I&&(I.status="confirmado"),f(),B.success("Agendamento confirmado!")}catch{B.error("Erro ao confirmar.")}},window.completeAppointment=async h=>{try{await F.update("agendamentos",h,{status:"concluido"});const I=o.find(x=>x.id===h);I&&(I.status="concluido"),f(),B.success("Agendamento concluído!")}catch{B.error("Erro ao concluir.")}},window.cancelAppointment=async h=>{if(await Ye.danger("Excluir Agendamento","Deseja excluir este agendamento? Esta ação não pode ser desfeita."))try{await F.delete("agendamentos",h),o=o.filter(x=>x.id!==h),f(),B.success("Agendamento excluído.")}catch{B.error("Erro ao excluir.")}},window.selectWeekDay=h=>{l=h,d="day",document.querySelectorAll(".sched-view-tab").forEach(I=>{I.classList.toggle("active",I.dataset.view==="day")}),document.getElementById("sched-date-jump").value=h,f()},f()}return`
    <style>
        /* ── Schedule page styles ── */
        .sched-toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .sched-view-tabs {
            display: flex;
            background: var(--surface-hover);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 3px;
            gap: 2px;
        }
        .sched-view-tab {
            padding: 6px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .sched-view-tab:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
        .sched-view-tab.active { background: var(--primary); color: #fff; box-shadow: 0 2px 8px var(--primary-glow); }

        .sched-date-jump { background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; padding: 6px 12px; color: var(--text-main); font-size:0.85rem; cursor:pointer; }

        .sched-nav-btn { width:36px; height:36px; border-radius:8px; background:var(--surface-hover); border:1px solid var(--border-color); color:var(--text-main); display:flex;align-items:center;justify-content:center; transition:all 0.2s; }
        .sched-nav-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

        /* Day view */
        .sched-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; }
        .sched-day-info { text-align:center; flex:1; }
        .sched-day-name { display:block; font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:1px; }
        .sched-day-date { display:block; font-size:2rem; font-weight:800; color:var(--text-main); line-height:1; margin: 2px 0; }
        .sched-day-month { display:block; font-size:0.9rem; color:var(--text-muted); }

        .sched-stats-row { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sched-stat { display:flex; align-items:center; gap:8px; background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; padding:10px 16px; font-size:0.9rem; color:var(--text-muted); flex:1; min-width:140px; }
        .sched-stat strong { color:var(--text-main); }

        .sched-appointments-list { display:flex; flex-direction:column; gap:0.75rem; }
        .sched-empty { text-align:center; padding:4rem 2rem; color:var(--text-dim); }
        .sched-empty i { font-size:3rem; margin-bottom:1rem; display:block; opacity:0.4; }

        /* Appointment card */
        .sched-card { display:flex; gap:1rem; background:var(--surface-hover); border:1px solid var(--border-color); border-left:4px solid var(--primary); border-radius:12px; padding:1rem 1.25rem; transition:all 0.2s; align-items:flex-start; }
        .sched-card:hover { border-color: rgba(99,102,241,0.4); transform:translateX(2px); }
        .sched-card-time { display:flex; flex-direction:column; align-items:center; min-width:55px; }
        .sched-time { font-size:1.2rem; font-weight:800; color:var(--text-main); }
        .sched-duration { font-size:0.72rem; color:var(--text-dim); background:rgba(255,255,255,0.06); padding:2px 6px; border-radius:4px; margin-top:4px; }

        .sched-card-body { flex:1; display:flex; flex-direction:column; gap:6px; }
        .sched-client { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .sched-client strong { font-size:1rem; color:var(--text-main); }
        .sched-phone { font-size:0.8rem; color:var(--text-dim); display:flex; align-items:center; gap:4px; }
        .sched-service { display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-muted); }
        .sched-price { font-weight:700; color:var(--text-main); margin-left:auto; }
        .sched-notes { font-size:0.82rem; color:var(--text-dim); background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; border:1px solid var(--border-color); }

        .sched-badge { display:inline-flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid; width:fit-content; margin-top:4px; }

        .sched-card-actions { display:flex; flex-direction:column; gap:6px; }
        .sched-action-btn { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; transition:all 0.2s; border:1px solid var(--border-color); background:var(--surface-hover); color:var(--text-muted); }
        .sched-action-btn:hover { transform:scale(1.1); }
        .sched-action-btn.confirm:hover { background:#10b98122; color:#10b981; border-color:#10b981; }
        .sched-action-btn.done:hover { background:#6366f122; color:#6366f1; border-color:#6366f1; }
        .sched-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sched-action-btn.cancel:hover { background:#ef444422; color:#ef4444; border-color:#ef4444; }

        /* Week view */
        .sched-week-header { display:flex; align-items:center; gap:1rem; justify-content:space-between; margin-bottom:1.25rem; }
        .sched-week-label { font-size:0.95rem; font-weight:700; color:var(--text-main); }
        .sched-week-grid { display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; }
        .sched-week-col { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; overflow:hidden; cursor:pointer; transition:all 0.2s; min-height:160px; }
        .sched-week-col:hover { border-color:rgba(99,102,241,0.4); }
        .sched-week-col.today .sched-week-col-header { background:rgba(99,102,241,0.15); }
        .sched-week-col.selected { border-color:var(--primary); box-shadow:0 0 0 1px var(--primary); }
        .sched-week-col-header { padding:8px 10px; display:flex; flex-direction:column; align-items:center; border-bottom:1px solid var(--border-color); position:relative; }
        .sched-wday { font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:0.5px; }
        .sched-wdate { font-size:1.4rem; font-weight:800; color:var(--text-main); }
        .sched-wcount { position:absolute; top:6px; right:8px; background:var(--primary); color:#fff; border-radius:50%; width:18px; height:18px; font-size:0.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .sched-week-appts { padding:6px; display:flex; flex-direction:column; gap:4px; }
        .sched-week-item { background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-left:3px solid; border-radius:6px; padding:4px 6px; font-size:0.75rem; cursor:pointer; transition:all 0.15s; }
        .sched-week-item:hover { background:rgba(99,102,241,0.2); }
        .sched-wtime { font-weight:700; color:var(--text-main); display:block; }
        .sched-wclient { color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }

        /* List view */
        .sched-list-section { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
        .sched-list-title { padding:1rem 1.25rem; font-weight:700; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-color); color:var(--text-main); background:rgba(255,255,255,0.02); }
        .sched-list-row { display:grid; grid-template-columns:100px 1fr auto auto auto; align-items:center; gap:1rem; padding:0.75rem 1.25rem; border-bottom:1px solid var(--border-color); transition:background 0.2s; }
        .sched-list-row:last-child { border-bottom:none; }
        .sched-list-row:hover { background:rgba(255,255,255,0.03); }
        .sched-list-date { display:flex; flex-direction:column; font-size:0.85rem; }
        .sched-list-date span:first-child { font-weight:700; color:var(--text-main); }
        .sched-list-date span:last-child { color:var(--text-dim); }
        .sched-list-info { display:flex; flex-direction:column; }
        .sched-list-info strong { color:var(--text-main); font-size:0.95rem; }
        .sched-list-info span { color:var(--text-muted); font-size:0.82rem; }
        .sched-list-actions { display:flex; gap:6px; }

        /* Spinner */
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-calendar-alt" style="color:var(--primary); margin-right:10px;"></i>Agenda
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Gerencie os agendamentos dos seus clientes.</p>
        </div>
        <button id="btn-new-appointment" class="btn-primary">
            <i class="fa-solid fa-plus"></i> Novo Agendamento
        </button>
    </div>

    <div class="sched-toolbar">
        <div class="sched-view-tabs">
            <button class="sched-view-tab active" data-view="day"><i class="fa-solid fa-calendar-day"></i> Dia</button>
            <button class="sched-view-tab" data-view="week"><i class="fa-solid fa-calendar-week"></i> Semana</button>
            <button class="sched-view-tab" data-view="list"><i class="fa-solid fa-list"></i> Lista</button>
        </div>
        <input type="date" id="sched-date-jump" class="sched-date-jump" value="${l}" title="Ir para data">
        <button id="btn-today" class="btn-secondary" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-crosshairs"></i> Hoje
        </button>
    </div>

    <div class="card" style="padding:1.5rem;" id="sched-view-content">
        <!-- Dynamically rendered -->
    </div>

    ${k}`},Ax=async()=>{let n={atendimento:"",agendamento:"",venda:"",disparo:""};try{const t=await F.get("settings","webhooks");t&&(n={...n,...t})}catch(t){console.error("Error loading webhooks:",t)}const e=`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; width: 100%;">
            <div style="text-align: center !important; margin-bottom: 2rem; width: 100%;">
                <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin: 0; text-align: center !important;">Configuração de Webhooks (Global)</h2>
            </div>

            <div class="card" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <div style="padding: 2rem;">
                    <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; text-align: center;">
                    Configure as URLs dos webhooks que serão chamados por cada módulo do sistema. 
                    Estas configurações são globais e afetam todos os clientes.
                </p>

                <form id="webhooks-form">
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Atendimento</label>
                        <input type="url" id="webhook-atendimento" placeholder="https://seu-webhook.com/atendimento" 
                               value="${n.atendimento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Agendamento</label>
                        <input type="url" id="webhook-agendamento" placeholder="https://seu-webhook.com/agendamento" 
                               value="${n.agendamento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Venda</label>
                        <input type="url" id="webhook-venda" placeholder="https://seu-webhook.com/venda" 
                               value="${n.venda}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Disparo em Massa</label>
                        <input type="url" id="webhook-disparo" placeholder="https://seu-webhook.com/disparo" 
                               value="${n.disparo}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <button type="submit" class="btn-primary" style="padding: 1rem 2rem;">
                        <i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;return setTimeout(()=>{const t=document.getElementById("webhooks-form");t&&(t.onsubmit=async i=>{i.preventDefault();const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';const r={atendimento:document.getElementById("webhook-atendimento").value,agendamento:document.getElementById("webhook-agendamento").value,venda:document.getElementById("webhook-venda").value,disparo:document.getElementById("webhook-disparo").value,updatedAt:new Date};try{await F.set("settings","webhooks",r),B.success("Webhooks atualizados com sucesso!")}catch(o){console.error("Error saving webhooks:",o),B.error("Erro ao salvar configurações.")}finally{s.disabled=!1,s.innerHTML='<i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações'}})},100),e},Sx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await F.get("companies",n.companyId),i=t?.mercadoPagoToken||"",s=t?.userIdMercadoPago||"";return window.disconnectMercadoPago=async()=>{if(!await Ye.danger("Desativar Integração","Tem certeza que deseja desativar o Mercado Pago? Isso removerá seu token de acesso."))return;const o=document.getElementById("btn-disconnect-mp");o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await F.update("companies",n.companyId,{mercadoPagoToken:null,userIdMercadoPago:null}),B.success("Integração desativada."),setTimeout(()=>window.location.reload(),1e3)}catch(l){B.error("Erro ao desativar: "+l.message),o.disabled=!1,o.innerHTML='<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>'}},window.connectMercadoPago=async()=>{const r=document.getElementById("mp-token-input"),o=document.getElementById("btn-connect-mp"),l=r.value.trim();if(!l){B.warning("Por favor, insira o Access Token primeiro.");return}o.disabled=!0;const d=o.innerHTML;o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';try{if(await F.update("companies",n.companyId,{mercadoPagoToken:l}),!(await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-userId-mercadopago",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:l,companyId:n.companyId})})).ok)throw new Error("Falha ao processar a conexão via servidor.");B.success("Integração processada com sucesso!"),setTimeout(()=>{window.location.reload()},1500)}catch(u){console.error(u),B.error("Erro na conexão: "+u.message)}finally{o.disabled=!1,o.innerHTML=d}},`
        <div class="page-header" style="flex-direction: column;">
            <div><h2 class="page-title">Configuração Mercado Pago</h2></div>
            <div><p style="color: var(--text-muted); font-size: 0.9rem;">Configure sua integração para recebimento de pagamentos.</p></div>
        </div>

        <div class="card glass" style="max-width: 600px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 30px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #009ee3 0%, #007bbd 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.8rem; box-shadow: 0 8px 16px rgba(0, 158, 227, 0.2);">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.25rem;">Integração de Pagamentos</h3>
                    <p style="margin: 0; color: var(--text-dim); font-size: 0.85rem;">Conecte sua conta para aceitar cartões e Pix.</p>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">Access Token (Produção)</label>
                <div style="position: relative;">
                    <input type="password" id="mp-token-input" class="input-field" 
                           placeholder="APP_USR-0000..." 
                           value="${i}" 
                           style="width: 100%; padding: 14px 45px 14px 16px; background: var(--bg-color); border: 1px solid var(--border-color); color: white; border-radius: 10px; font-family: monospace;">
                    <button type="button" onclick="const input = document.getElementById('mp-token-input'); input.type = input.type === 'password' ? 'text' : 'password';" 
                            style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); border: none; background: none; cursor: pointer; padding: 5px;">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">User Id</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="mp-userid-input" class="input-field" 
                           placeholder="Clique em conectar para buscar o ID" 
                           value="${s}" 
                           disabled
                           style="flex: 1; padding: 14px 16px; background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 10px; font-family: monospace;">
                    
                    ${i?`
                        <button id="btn-disconnect-mp" class="btn-danger" onclick="window.disconnectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #ef4444; color: white; border: none; cursor: pointer;">
                            <i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>
                        </button>
                    `:`
                        <button id="btn-connect-mp" class="btn-primary" onclick="window.connectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #009ee3;">
                            <i class="fa-solid fa-plug"></i> <span>Conectar</span>
                        </button>
                    `}
                </div>
            </div>
            
            <div style="background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 15px; display: flex; gap: 12px;">
                <i class="fa-solid fa-circle-info" style="color: var(--primary); margin-top: 3px;"></i>
                <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);">
                    Após inserir o <strong>Access Token</strong>, clique em <strong>Conectar</strong>. O sistema buscará seu <strong>User ID</strong> automaticamente para validar a integração.
                </div>
            </div>
        </div>

        <div class="card" style="max-width: 600px; margin-top: 20px; border-left: 4px solid var(--warning); background: rgba(245, 158, 11, 0.02);">
            <div style="display: flex; gap: 15px;">
                <i class="fa-solid fa-shield-halved" style="color: var(--warning); font-size: 1.2rem;"></i>
                <div>
                    <h4 style="margin: 0 0 5px 0;">Segurança dos Dados</h4>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                        Seu token é armazenado de forma criptografada e utilizado apenas para comunicação oficial com a API do Mercado Pago. Nunca compartilhe seu token com terceiros.
                    </p>
                </div>
            </div>
        </div>
    `},eu=async n=>{try{const e=await F.getAll("loja_config",{field:"lojaId",operator:"==",value:n});let t=e[0]?.empresaId,i=null,s=null;if(t&&(i=await F.get("companies",t),i&&(s=i.stores?.find(O=>O.id===n))),!s){const O=await F.getAll("companies");for(const N of O){const z=N.stores?.find(G=>G.id===n);if(z){i=N,s=z;break}}}if(!i||!s)return`
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;const o=(i.modulos_ativos||[]).includes("venda_catalogo"),l=await F.getAll("products",{field:"companyId",operator:"==",value:i.id}),d=await F.getAll("categories",{field:"companyId",operator:"==",value:i.id}),u=e[0]||{},m=u.design||{},b=m.primaryColor||"#6366f1",v=m.secondaryColor||"#0f172a",R=m.textColor||"#ffffff",D=m.priceColor||"#ffffff",L=m.logoUrl||"",_=m.pixKey||"";if(typeof document<"u"&&(document.title=s.name||"Catálogo",L)){let O=document.querySelector("link[rel~='icon']");O||(O=document.createElement("link"),O.rel="icon",document.head.appendChild(O)),O.href=L}let A=m.whatsapp||"";if(!A)try{if(s.instancia_id){const O=await F.get("instancias",s.instancia_id);O?.numero&&(A=O.numero.replace(/\D/g,""))}}catch(O){console.warn("Could not fetch instance details:",O)}const S=!!i.mercadoPagoToken&&u.mercadoPagoActive!==!1,$=l.filter(O=>O.active!==!1&&(O.storeIds?.includes(n)||O.storeId===n)),C=$.filter(O=>O.promotionalActive),T=m.themeId||"classico",k=m.bannerUrl||"",f=m.bannerMobileUrl||"",g=d.map(O=>({...O,products:$.filter(N=>N.categoryId===O.id)})).filter(O=>O.products.length>0),y=$.filter(O=>!O.categoryId||!d.find(N=>N.id===O.categoryId)),w=O=>O.imageUrl?O.imageUrl:O.imagemPath&&O.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(O.imagemPath)}?alt=media&token=${O.downloadToken}`:"https://via.placeholder.com/300?text=Sem+Imagem";let h=new Map;try{const O=localStorage.getItem(`cat_cart_${n}`);O&&(h=new Map(JSON.parse(O)))}catch{}const I=u?.bairrosEntrega||[],x=[];I&&Array.isArray(I)&&(I.forEach(O=>{(O.bairros||"").split(",").map(z=>z.trim()).filter(Boolean).forEach(z=>x.push({nome:z,preco:parseFloat(O.preco)||0}))}),x.sort((O,N)=>O.nome.localeCompare(N.nome)));const P=u?.cupons||[],M=`cat_user_${i.id}`,q=JSON.parse(localStorage.getItem(M)||"{}");let j=null;const K=()=>{let O=0;return h.forEach(({product:N,qty:z})=>{const G=N.promotionalActive&&N.promotionalPrice||N.price;O+=G*z}),O},J=()=>window.catDeliveryType==="retirada"?0:window.catTaxaBairro||0,ie=()=>window.catDeliveryType==="retirada"?"Retirada":window.catSelectedBairro?`Entrega (${window.catSelectedBairro})`:"Taxa de Entrega",he=O=>j?j.tipo==="percent"?O*j.desconto/100:j.desconto:0,ce=()=>{const O=K();return O+J()-he(O)},pe=()=>{if(h.size===0)return'<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';let O="";return h.forEach(({product:N,qty:z},G)=>{const Q=N.promotionalActive&&N.promotionalPrice||N.price;O+=`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${N.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${Q.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${G}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${z}</span>
                        <button onclick="window.catQtyChange('${G}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${G}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`}),O},xe=()=>{const O=K(),N=J(),z=he(O),G=O+N-z;let Q="";return h.forEach(({product:ee,qty:ne})=>{const _e=ee.promotionalActive&&ee.promotionalPrice||ee.price;Q+=`<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${ne}x ${ee.name}</span><span>R$ ${(_e*ne).toFixed(2)}</span></div>`}),N>0&&(Q+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${ie()}</span><span>+ R$ ${N.toFixed(2)}</span></div>`),z>0&&j&&(Q+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${j.codigo}</span><span>- R$ ${z.toFixed(2)}</span></div>`),Q+=`<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${G.toFixed(2)}</span></div>`,Q},We={dom:"Domingo",seg:"Segunda-feira",ter:"Terça-feira",qua:"Quarta-feira",qui:"Quinta-feira",sex:"Sexta-feira",sab:"Sábado"},Ge=()=>["dom","seg","ter","qua","qui","sex","sab"][new Date().getDay()],Xe=O=>{const N=u.horario_funcionamento?.[O]||s.horarios?.[O]||{};return{ativo:N.ativo??N.aberto??O!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},lt=O=>{const N=u.horario_entrega?.[O]||s.horario_entrega?.[O]||{};return console.log(N),{ativo:N.ativo??N.aberto??O!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},ct=(()=>{const O=Ge(),N=lt(O);if(!N.ativo)return!1;const z=new Date,G=z.getHours()*60+z.getMinutes(),[Q,ee]=N.inicio.split(":").map(Number),[ne,_e]=N.fim.split(":").map(Number);return G>=Q*60+ee&&G<=ne*60+_e})(),It=()=>{const O=Ge(),N=Xe(O);if(!N.ativo)return!1;const z=new Date,G=z.getHours()*60+z.getMinutes(),[Q,ee]=N.inicio.split(":").map(Number),[ne,_e]=N.fim.split(":").map(Number);return G>=Q*60+ee&&G<=ne*60+_e},tt=()=>{const O=["dom","seg","ter","qua","qui","sex","sab"],N=new Date().getDay(),z=new Date,G=z.getHours()*60+z.getMinutes(),Q=O[N],ee=Xe(Q);if(ee.ativo){const[ne,_e]=ee.inicio.split(":").map(Number),Ce=ne*60+_e;if(G<Ce)return`Hoje às ${ee.inicio}`}for(let ne=1;ne<=7;ne++){const _e=(N+ne)%7,Ce=O[_e],qe=Xe(Ce);if(qe.ativo)return ne===1?`Amanhã às ${qe.inicio}`:`${We[Ce]} às ${qe.inicio}`}return"em breve"},ge=It(),oe=()=>{const O=Ge(),N=Xe(O);if(!N.ativo)return'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';const z=new Date,G=z.getHours()*60+z.getMinutes(),[Q,ee]=N.inicio.split(":").map(Number),[ne,_e]=N.fim.split(":").map(Number),Ce=Q*60+ee,qe=ne*60+_e;return G>=Ce&&G<=qe?`<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${N.fim}</span>`:G<Ce?`<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${N.inicio}</span>`:'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>'},Pe=()=>{let O="";return["dom","seg","ter","qua","qui","sex","sab"].forEach(N=>{const z=Xe(N);z.ativo?O+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${We[N]}</span><span style="font-weight:600;">${z.inicio} às ${z.fim}</span></div>`:O+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${We[N]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`}),O},Ee=()=>{const O=document.getElementById("cart-badge"),N=document.getElementById("cart-total"),z=document.getElementById("cart-items"),G=document.getElementById("cart-float-btn"),Q=document.getElementById("cart-total-float"),ee=document.getElementById("cart-badge-float");try{localStorage.setItem(`cat_cart_${n}`,JSON.stringify(Array.from(h.entries())))}catch{}let ne=0;h.forEach(({qty:_e})=>ne+=_e),O&&(O.textContent=ne.toString()),ee&&(ee.textContent=ne.toString()),G&&(G.style.display=ne>0?"flex":"none"),N&&(N.textContent=`R$ ${ce().toFixed(2)}`),Q&&(Q.textContent=`R$ ${ce().toFixed(2).replace(".",",")}`),z&&(z.innerHTML=pe())};window.openStoreInfo=()=>de("store-info-modal"),window.closeStoreInfo=()=>ke("store-info-modal"),window.catInit=()=>{const O=document.getElementById("checkout-name"),N=document.getElementById("checkout-phone"),z=document.getElementById("checkout-address");O&&q.name&&(O.value=q.name),N&&q.phone&&(N.value=q.phone),z&&q.address&&(z.value=q.address),N&&N.addEventListener("input",G=>{let Q=G.target.value.replace(/\D/g,"");Q.length>11&&(Q=Q.slice(0,11)),G.target.value=Q})},setTimeout(()=>window.catInit(),500);const de=O=>{const N=document.getElementById(O);N&&(N.style.display="flex")},ke=O=>{const N=document.getElementById(O);N&&(N.style.display="none")};if(o){window.showClosedAlert=N=>{const z=document.getElementById("closed-alert-title"),G=document.getElementById("closed-alert-desc"),Q=document.getElementById("closed-alert-time-section"),ee=document.getElementById("next-open-time"),ne=document.getElementById("closed-alert-icon");N==="store"?(z&&(z.textContent="Loja Fechada"),G&&(G.textContent="No momento não estamos aceitando pedidos."),Q&&(Q.style.display="block"),ee&&(ee.textContent=tt()),ne&&(ne.className="fa-solid fa-store-slash")):N==="delivery"&&(z&&(z.textContent="Entrega Desativada"),G&&(G.textContent="O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível."),Q&&(Q.style.display="none"),ne&&(ne.className="fa-solid fa-motorcycle")),de("closed-alert-modal")},window.catAddToCart=N=>{const z=$.find(ne=>ne.id===N);if(!z||z.stock===0)return;const G=h.get(N),Q=z.stock??1/0;if((G?.qty||0)>=Q){alert(`Estoque máximo atingido (${z.stock} un.)`);return}h.set(N,{product:z,qty:(G?.qty||0)+1}),Ee();const ee=document.getElementById(`btn-add-${N}`);ee&&(ee.textContent="✓ Adicionado",setTimeout(()=>{ee&&(ee.textContent="+ Adicionar")},1e3))},window.catQtyChange=(N,z)=>{const G=h.get(N);if(!G)return;const Q=G.qty+z;Q<=0?h.delete(N):G.qty=Math.min(Q,G.product.stock??1/0),Ee()},window.catRemoveItem=N=>{h.delete(N),Ee()},window.openCart=()=>{Ee(),de("cart-modal")},window.closeCart=()=>ke("cart-modal"),window.goToDelivery=async()=>{if(h.size===0)return;if(!ge){window.showClosedAlert("store");return}const N=document.getElementById("btn-go-delivery");N&&(N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Verificando...');let z=!1;for(const[G,{product:Q,qty:ee}]of Array.from(h.entries()))try{const ne=await F.get("products",G);if(!ne||ne.active===!1||ne.stock!=null&&ne.stock<ee){z=!0,alert(`O produto "${Q.name}" não possui quantidade suficiente em estoque ou está indisponível.`);break}}catch{}N&&(N.innerHTML='<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido'),!z&&(ke("cart-modal"),de("delivery-modal"))},window.closeDelivery=()=>ke("delivery-modal"),window.selectDelivery=N=>{window.catDeliveryType=N,document.querySelectorAll(".delivery-card").forEach(Q=>{Q.style.borderColor="rgba(255,255,255,0.1)",Q.style.background="transparent"});const z=document.getElementById(`delivery-card-${N}`);z&&(z.style.borderColor="#6366f1",z.style.background="rgba(99,102,241,0.08)");const G=document.getElementById("btn-go-customer");G&&(G.disabled=!1,G.style.opacity="1",G.style.cursor="pointer")},window.goToCustomer=()=>{const N=window.catDeliveryType;if(!N)return;if(N==="entrega"&&!ct){window.showClosedAlert("delivery");return}ke("delivery-modal");const z=document.getElementById("address-group");z&&(z.style.display=N==="entrega"?"block":"none"),de("customer-modal")},window.closeCustomer=()=>ke("customer-modal"),window.catFilterBairros=N=>{const z=document.getElementById("checkout-bairro-dropdown");if(!z)return;const G=N?x.filter(Q=>Q.nome.toLowerCase().includes(N.toLowerCase())):x;G.length===0?z.innerHTML='<div style="padding:12px;color:#ef4444;font-size:0.85rem;">Nenhum bairro encontrado</div>':z.innerHTML=G.map(Q=>`<div onclick="window.catSelectBairro('${Q.nome.replace(/'/g,"\\'")}', ${Q.preco})" style="padding:12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);color:white;font-size:0.9rem;">${Q.nome} - R$ ${Q.preco.toFixed(2)}</div>`).join(""),z.style.display="block"},window.catSelectBairro=(N,z)=>{const G=document.getElementById("checkout-bairro");G&&(G.value=N,G.dataset.preco=z.toString());const Q=document.getElementById("checkout-bairro-dropdown");Q&&(Q.style.display="none")},document.addEventListener("click",N=>{if(!N.target.closest("#bairro-input-wrapper")){const z=document.getElementById("checkout-bairro-dropdown");z&&(z.style.display="none")}}),window.goToPayment=()=>{const N=document.getElementById("checkout-name")?.value.trim(),z=document.getElementById("checkout-phone")?.value.trim(),G=document.getElementById("checkout-address")?.value.trim(),Q=window.catDeliveryType;let ee="",ne=0;if(Q==="entrega"&&x.length>0){const bt=document.getElementById("checkout-bairro");if(!bt||!bt.value.trim()){alert("Selecione ou digite seu bairro para entrega.");return}ee=bt.value.trim();const Be=x.find($t=>$t.nome.toLowerCase()===ee.toLowerCase());if(!Be){alert("Bairro selecionado não encontrado na lista. Por favor, escolha uma opção listada.");return}ee=Be.nome,ne=Be.preco}if(!N||!z){alert("Preencha nome e telefone.");return}if(z.length<10){alert("Telefone inválido. Use o formato DD000000000");return}if(Q==="entrega"&&!G){alert("Preencha o endereço de entrega completo.");return}window.catSelectedBairro=ee,window.catTaxaBairro=ne;const _e={name:N,phone:z,address:G||"",bairro:ee};window.catCustomer=_e,localStorage.setItem(M,JSON.stringify(_e)),ke("customer-modal");const Ce=document.getElementById("payment-order-summary");Ce&&(Ce.innerHTML=xe());const qe=document.getElementById("cat-coupon-section");qe&&(qe.style.display=P.length>0?"block":"none");const vt=document.getElementById("btn-pay-pix-manual"),dt=document.getElementById("btn-pay-pix-mp");vt&&(vt.style.display=_?"flex":"none"),dt&&(dt.style.display=S?"flex":"none"),de("payment-modal")},window.closePayment=()=>ke("payment-modal"),window.catApplyCoupon=()=>{const N=(document.getElementById("cat-coupon-input")?.value||"").trim().toUpperCase(),z=P.find(_e=>_e.codigo===N&&_e.ativo!==!1),G=K(),Q=document.getElementById("cat-coupon-msg");if(!z){Q&&(Q.textContent="Cupom inválido ou expirado.",Q.style.color="#ef4444");return}if(z.valorMinimo>0&&G<z.valorMinimo){Q&&(Q.textContent=`Gasto mínimo de R$ ${z.valorMinimo.toFixed(2)} necessário.`,Q.style.color="#ef4444");return}j=z;const ee=he(G);Q&&(Q.textContent=`✓ Cupom aplicado! Desconto: R$ ${ee.toFixed(2)}`,Q.style.color="#10b981");const ne=document.getElementById("payment-order-summary");ne&&(ne.innerHTML=xe())},window.catToggleCoupon=()=>{const N=document.getElementById("cat-coupon-input-wrapper"),z=document.getElementById("cat-coupon-toggle-label");if(N){const G=N.style.display==="block";N.style.display=G?"none":"block",z&&(z.textContent=G?"Tenho um cupom de desconto":"Ocultar cupom")}},window.catFilterClassic=N=>{document.querySelectorAll(".cat-selector-item").forEach(G=>{const Q=G.getAttribute("onclick")||"";G.classList.toggle("active",Q.includes("'"+N+"'"))});const z=document.getElementById("classic-promo-section");N==="all"?(z&&(z.style.display=C.length>0?"block":"none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="block")):N==="promo"?(z&&(z.style.display="block"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="none")):(z&&(z.style.display="none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>{G.style.display=G.dataset.classicCat===N?"block":"none"}))},window.catFilterCat=N=>{document.querySelectorAll(".cat-sidebar-link").forEach(Q=>{Q.classList.remove("active"),Q.setAttribute("aria-pressed","false")});const z=document.querySelector(`.cat-sidebar-link[onclick*="'${N}'"]`);z&&(z.classList.add("active"),z.setAttribute("aria-pressed","true"));const G=N==="all";document.querySelectorAll("[data-catgroup]").forEach(Q=>{Q.style.display=G||Q.dataset.catgroup===N?"":"none"})},window.catSearch=N=>{N=N.trim().toLowerCase(),document.querySelectorAll("[data-catgroup]").forEach(z=>{z.style.display=""}),N&&document.querySelectorAll(".product-card").forEach(z=>{const G=(z.querySelector("h3")?.textContent||"").toLowerCase();z.style.display=G.includes(N)?"":"none"})};const O=async(N,z)=>{const G=z.replace(/\D/g,""),ee=(await F.getAll("leads",{field:"empresaId",operator:"==",value:i.id})).find(_e=>{const Ce=(_e.telefone||_e.whatsapp||"").replace(/\D/g,"").replace("@c.us","");return Ce&&Ce===G});return ee?(ee.statusLead!=="cliente_ativo"&&await F.update("leads",ee.id,{statusLead:"cliente_ativo"}),ee.id):await F.create("leads",{nome:N,telefone:G,whatsapp:G,empresaId:i.id,lojaId:n,origem:"catalogo",statusLead:"cliente_ativo",criadoEm:new Date().toISOString()})};window.confirmOrderDelivery=async()=>{const N=document.getElementById("btn-pay-delivery");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...');try{const{name:z,phone:G,address:Q}=window.catCustomer,ee=window.catDeliveryType,ne=Array.from(h.entries()).map(([Me,{product:me,qty:Re}])=>{const $e=me.promotionalActive&&me.promotionalPrice||me.price;return{productId:Me,name:me.name,qty:Re,price:$e,subtotal:$e*Re}});for(const[Me,{qty:me}]of Array.from(h.entries())){const Re=$.find($e=>$e.id===Me);Re&&Re.stock!=null&&await F.update("products",Me,{stock:Math.max(0,Re.stock-me)})}const _e=K(),Ce=J(),qe=he(_e),vt=_e+Ce-qe,dt=await O(z,G),bt=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:z,clientPhone:G,endereco:Q,entrega:ee,leadId:dt,nome:z,items:ne,total:vt,taxaAplicada:Ce,taxaNome:ie(),desconto:qe,codigoCupom:j?.codigo||null,paymentMethod:"na_entrega",pagamento:"na_entrega",status:"em_preparo",source:"catalog",criadoEm:new Date().toISOString()});try{console.log("Order created silently, waiting for operator approval.",bt)}catch(Me){console.error("Error in order creation log:",Me)}h.clear(),j=null,ke("payment-modal"),Ee();const Be=document.getElementById("confirmation-modal"),$t=document.getElementById("order-id-display"),Tt=document.getElementById("pix-info-section");Be&&(Be.style.display="flex"),$t&&($t.textContent=bt.slice(0,8).toUpperCase()),Tt&&(Tt.style.display="none"),Ee()}catch(z){console.error(z),alert("Erro ao processar pedido. Tente novamente."),N&&(N.disabled=!1,N.innerHTML="🤝 Pagar na Entrega / Retirada")}},window.showPixManual=()=>{ke("payment-modal");const N=document.getElementById("pix-manual-summary");N&&(N.innerHTML=xe());const z=document.getElementById("pix-key-value");z&&(z.textContent=_),de("pix-manual-modal")},window.closePixManual=()=>ke("pix-manual-modal"),window.copyPixKey=()=>{navigator.clipboard.writeText(_).then(()=>{const N=document.getElementById("btn-copy-pix");N&&(N.textContent="✓ Copiado!",setTimeout(()=>{N.textContent="Copiar"},2e3))})},window.confirmPixManual=async()=>{const N=document.getElementById("btn-confirm-pix-manual");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...');try{const{name:z,phone:G,address:Q}=window.catCustomer,ee=window.catDeliveryType,ne=Array.from(h.entries()).map(([Re,{product:$e,qty:wt}])=>{const nn=$e.promotionalActive&&$e.promotionalPrice||$e.price;return{productId:Re,name:$e.name,qty:wt,price:nn,subtotal:nn*wt}});let _e="";const Ce=document.getElementById("pix-comprovante-input");if(Ce?.files?.[0]){const Re=Ce.files[0],$e=Date.now(),wt=`comprovantes/${i.id}/${$e}_${Re.name}`,nn=ln(cn,wt);await Li(nn,Re),_e=await ni(nn)}for(const[Re,{qty:$e}]of Array.from(h.entries())){const wt=$.find(nn=>nn.id===Re);wt&&wt.stock!=null&&await F.update("products",Re,{stock:Math.max(0,wt.stock-$e)})}const qe=K(),vt=J(),dt=he(qe),bt=qe+vt-dt,Be=await O(z,G),$t=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:z,clientPhone:G,endereco:Q,entrega:ee,leadId:Be,nome:z,items:ne,total:bt,taxaAplicada:vt,taxaNome:ie(),desconto:dt,codigoCupom:j?.codigo||null,paymentMethod:"pix_manual",pagamento:"pagamento_no_pix",comprovanteUrl:_e,status:"aguardando_pagamento",source:"catalog",criadoEm:new Date().toISOString()});h.clear(),j=null,ke("pix-manual-modal"),Ee();const Tt=document.getElementById("confirmation-modal"),Me=document.getElementById("order-id-display");Tt&&(Tt.style.display="flex"),Me&&(Me.textContent=$t.slice(0,8).toUpperCase());const me=document.getElementById("pix-info-section");me&&(me.style.display="none"),Ee()}catch(z){console.error(z),alert("Erro ao confirmar pedido. Tente novamente."),N&&(N.disabled=!1,N.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}},window.confirmPixMercadoPago=async()=>{const N=document.getElementById("btn-pay-pix-mp");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...');try{const{name:z,phone:G,address:Q}=window.catCustomer,ee=window.catDeliveryType,ne=Array.from(h.entries()).map(([Me,{product:me,qty:Re}])=>{const $e=me.promotionalActive&&me.promotionalPrice||me.price;return{productId:Me,name:me.name,qty:Re,price:$e,subtotal:$e*Re}}),_e=K(),Ce=J(),qe=he(_e),vt=_e+Ce-qe,bt=await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-pix-catalog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:i.id,storeId:n,items:ne,total:vt,clientName:z,clientPhone:G,accessToken:i.mercadoPagoToken})}),Be=bt.ok?await bt.json():null;for(const[Me,{qty:me}]of Array.from(h.entries())){const Re=$.find($e=>$e.id===Me);Re&&Re.stock!=null&&await F.update("products",Me,{stock:Math.max(0,Re.stock-me)})}const $t=await O(z,G),Tt=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:z,clientPhone:G,endereco:Q,entrega:ee,leadId:$t,nome:z,items:ne,total:vt,taxaAplicada:Ce,taxaNome:ie(),desconto:qe,codigoCupom:j?.codigo||null,paymentMethod:"pix_mercadopago",pagamento:"pagamento_no_pix",mpPaymentId:Be?.payment_id||"",status:"aguardando_pagamento",source:"catalog",criadoEm:new Date().toISOString()});if(h.clear(),j=null,ke("payment-modal"),Ee(),Be?.qr_code_base64||Be?.qr_code_text){const Me=document.getElementById("mp-qr-img"),me=document.getElementById("mp-qr-code"),Re=document.getElementById("mp-pix-summary");Me&&Be.qr_code_base64&&(Me.src=`data:image/png;base64,${Be.qr_code_base64}`,Me.style.display="block"),me&&Be.qr_code_text&&(me.textContent=Be.qr_code_text,window._mpQrCodeText=Be.qr_code_text),Re&&(Re.innerHTML=xe()),de("mp-pix-modal")}else{const Me=document.getElementById("confirmation-modal"),me=document.getElementById("order-id-display");Me&&(Me.style.display="flex"),me&&(me.textContent=Tt.slice(0,8).toUpperCase())}Ee()}catch(z){console.error(z),alert("Erro ao gerar PIX. Tente novamente."),N&&(N.disabled=!1,N.innerHTML="⚡ Pagar via Mercado Pago (PIX)")}},window.closeMpPix=()=>ke("mp-pix-modal"),window.copyMpQrCode=()=>{const N=window._mpQrCodeText||"";navigator.clipboard.writeText(N).then(()=>{const z=document.getElementById("btn-copy-mp-qr");z&&(z.textContent="✓ Copiado!",setTimeout(()=>{z.textContent="Copiar código"},2e3))})},window.previewComprovante=N=>{const z=document.getElementById("comprovante-preview"),G=document.getElementById("comprovante-label");if(N.files?.[0]){const Q=new FileReader;Q.onload=ee=>{z&&(z.src=ee.target?.result,z.style.display="block"),G&&(G.textContent=N.files[0].name)},Q.readAsDataURL(N.files[0])}}}const ae=(O,N=!1)=>{const z=N&&O.promotionalName||O.name,G=N&&O.promotionalPrice||O.price,Q=N?O.price:null,ee=O.stock===0;return o?`
                <div class="product-card" style="${ee?"opacity:0.6;":""}">
                    <div class="card-image">
                        <img src="${w(O)}" alt="${z}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                        ${ee?'<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${z}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${Q?`<span class="original-price">R$ ${Q.toFixed(2)}</span>`:""}
                        </div>
                        ${O.stock!=null&&!ee&&O.stock<=10?`<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${O.stock} restante${O.stock!==1?"s":""}</p>`:""}
                        <button id="btn-add-${O.id}" onclick="window.catAddToCart('${O.id}')" ${ee?"disabled":""}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${ee?"rgba(255,255,255,0.05)":"var(--primary-cat)"};color:${ee?"#94a3b8":"white"};border:none;cursor:${ee?"not-allowed":"pointer"};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${ee?"Esgotado":"+ Adicionar"}
                        </button>
                    </div>
                </div>`:`
                <div class="product-card">
                    <div class="card-image">
                        <img src="${w(O)}" alt="${z}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${z}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${Q?`<span class="original-price">R$ ${Q.toFixed(2)}</span>`:""}
                        </div>
                    </div>
                </div>`},Te="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;",st="background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;",Dt=(O,N)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${O}</h3>
                <button onclick="${N}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`,zt=(O,N,z,G="")=>`<button id="${O}" onclick="${N}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${G}">${z}</button>`,jt=o?`
            <!-- CART MODAL -->
            <div id="cart-modal" style="${Te}align-items:flex-end;overflow-y:auto;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${Dt('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho',"window.closeCart()")}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${zt("btn-go-delivery","window.goToDelivery()",'<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${Te}">
                <div style="${st}">
                    ${Dt('<i class="fa-solid fa-box"></i> Como deseja receber?',"window.closeDelivery()")}
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <div id="delivery-card-entrega" class="delivery-card" ${ct!==!1&&x.length>0?`onclick="window.selectDelivery('entrega')"`:""} style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);${ct!==!1&&x.length>0?"cursor:pointer;":"opacity:0.5;cursor:not-allowed;"}display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-truck" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Entrega</p>
                                <p style="margin:4px 0 0;color:${ct!==!1&&x.length>0?"#94a3b8":"#ef4444"};font-size:0.85rem;">${ct!==!1&&x.length>0?"Receber no endereço informado":"Entrega indisponível no momento"}</p>
                            </div>
                        </div>
                        <div id="delivery-card-retirada" class="delivery-card" onclick="window.selectDelivery('retirada')" style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);cursor:pointer;display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-store" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Retirada na Loja</p>
                                <p style="margin:4px 0 0;color:#94a3b8;font-size:0.85rem;">Buscar pessoalmente no estabelecimento</p>
                            </div>
                        </div>
                    </div>
                    ${zt("btn-go-customer","window.goToCustomer()",'<i class="fa-solid fa-arrow-right"></i> Continuar',"opacity:0.4;cursor:not-allowed;")}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${Te}">
                <div style="${st}max-height:90vh;overflow-y:auto;">
                    ${Dt('<i class="fa-solid fa-user"></i> Seus Dados',"window.closeCustomer()")}
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div id="address-group" style="display:none;margin-bottom:16px;">
                        ${x.length>0?`
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Bairro</label>
                        <div id="bairro-input-wrapper" style="position:relative;margin-bottom:12px;">
                            <input type="text" id="checkout-bairro" placeholder="Digite ou selecione seu bairro..." autocomplete="off" oninput="window.catFilterBairros(this.value)" onfocus="window.catFilterBairros(this.value)" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;">
                            <div id="checkout-bairro-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:10px;z-index:9999;box-shadow:0 4px 15px rgba(0,0,0,0.5);margin-top:4px;"></div>
                        </div>
                        `:""}
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Endereço Completo</label>
                        <input id="checkout-address" type="text" placeholder="Rua, número, complemento" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    ${zt("btn-go-payment","window.goToPayment()","Escolher Pagamento →","margin-top:8px;")}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${Te}">
                <div style="${st}">
                    ${Dt('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento',"window.closePayment()")}
                    <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.9rem;"></div>
                    <div id="cat-coupon-section" style="display:none;margin-bottom:16px;">
                        <button onclick="window.catToggleCoupon()" style="background:none;border:none;color:#6366f1;font-size:0.85rem;font-weight:600;cursor:pointer;padding:4px 0;display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                            <i class="fa-solid fa-tag" aria-hidden="true"></i>
                            <span id="cat-coupon-toggle-label">Tenho um cupom de desconto</span>
                        </button>
                        <div id="cat-coupon-input-wrapper" style="display:none;">
                            <div style="display:flex;gap:8px;">
                                <input id="cat-coupon-input" type="text" placeholder="Código do cupom" aria-label="Código do cupom" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.9rem;text-transform:uppercase;">
                                <button onclick="window.catApplyCoupon()" style="padding:10px 16px;background:rgba(99,102,241,0.2);color:#6366f1;border:1px solid rgba(99,102,241,0.3);border-radius:10px;cursor:pointer;font-weight:700;white-space:nowrap;" aria-label="Aplicar cupom"><i class="fa-solid fa-check" aria-hidden="true"></i> Aplicar</button>
                            </div>
                            <p id="cat-coupon-msg" style="font-size:0.8rem;margin:4px 0 0;min-height:16px;" aria-live="polite"></p>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <button id="btn-pay-delivery" onclick="window.confirmOrderDelivery()"
                            style="padding:16px;border-radius:14px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;display:flex;align-items:center;gap:12px;">
                            <i class="fa-solid fa-handshake" style="font-size:1.2rem;"></i> <span>Pagar na Entrega / Retirada</span>
                        </button>
                        <button id="btn-pay-pix-manual" onclick="window.showPixManual()"
                            style="display:${_?"flex":"none"};padding:16px;border-radius:14px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>
                        </button>
                        <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()"
                            style="display:${S?"flex":"none"};padding:16px;border-radius:14px;background:#009ee3;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-solid fa-credit-card" style="font-size:1.2rem;"></i> <span>Pagar via Mercado Pago (PIX)</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- PIX MANUAL MODAL -->
            <div id="pix-manual-modal" style="${Te}">
                <div style="${st}max-height:90vh;overflow-y:auto;">
                    ${Dt('<i class="fa-brands fa-pix"></i> Pagamento via PIX',"window.closePixManual()")}
                    <div id="pix-manual-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:16px;margin-bottom:16px;">
                        <p style="margin:0 0 6px;font-weight:700;font-size:0.9rem;color:#10b981;"><i class="fa-brands fa-pix"></i> Chave PIX:</p>
                        <p id="pix-key-value" style="margin:0 0 12px;font-family:monospace;font-size:1rem;color:white;word-break:break-all;"></p>
                        <button id="btn-copy-pix" onclick="window.copyPixKey()" style="padding:8px 16px;border-radius:8px;background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);cursor:pointer;font-weight:700;font-size:0.85rem;">Copiar</button>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:8px;"><i class="fa-solid fa-receipt"></i> Comprovante de Pagamento <span style="color:#94a3b8;font-weight:400;">(opcional)</span></label>
                        <div onclick="document.getElementById('pix-comprovante-input').click()" style="border:2px dashed rgba(255,255,255,0.15);border-radius:12px;padding:18px;text-align:center;cursor:pointer;transition:all 0.2s;" 
                             onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'">
                            <input type="file" id="pix-comprovante-input" accept="image/*,application/pdf" style="display:none;" onchange="window.previewComprovante(this)">
                            <img id="comprovante-preview" style="max-width:100%;max-height:140px;border-radius:8px;display:none;margin:0 auto 8px;">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.5rem;color:#6366f1;display:block;margin-bottom:6px;"></i>
                            <p id="comprovante-label" style="margin:0;font-size:0.85rem;color:#94a3b8;">Clique para anexar o comprovante</p>
                        </div>
                    </div>
                    ${zt("btn-confirm-pix-manual","window.confirmPixManual()",'<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${Te}">
                <div style="${st}max-height:90vh;overflow-y:auto;">
                    ${Dt('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago',"window.closeMpPix()")}
                    <div id="mp-pix-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="text-align:center;margin-bottom:16px;">
                        <img id="mp-qr-img" style="width:180px;height:180px;border-radius:12px;background:white;padding:8px;display:none;margin:0 auto 12px;">
                        <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:12px;">Ou copie o código abaixo:</p>
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;margin-bottom:10px;">
                            <p id="mp-qr-code" style="margin:0;font-family:monospace;font-size:0.75rem;color:#94a3b8;word-break:break-all;max-height:80px;overflow-y:auto;"></p>
                        </div>
                        <button id="btn-copy-mp-qr" onclick="window.copyMpQrCode()" style="padding:10px 20px;border-radius:10px;background:rgba(0,158,227,0.15);color:#009ee3;border:1px solid rgba(0,158,227,0.3);cursor:pointer;font-weight:700;font-size:0.9rem;">Copiar código</button>
                    </div>
                    <p style="text-align:center;color:#94a3b8;font-size:0.8rem;">Após o pagamento, seu pedido será processado automaticamente.</p>
                </div>
            </div>

            <!-- CONFIRMATION MODAL -->
            <div id="confirmation-modal" style="${Te}">
                <div style="${st}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-circle-check" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;">Pedido Confirmado!</h2>
                    <p style="color:#94a3b8;margin-bottom:20px;">Seu pedido foi recebido com sucesso.</p>
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;">Número do Pedido</span>
                        <p id="order-id-display" style="margin:6px 0 0;font-size:1.5rem;font-weight:800;letter-spacing:3px;color:#6366f1;">#000000</p>
                    </div>
                    <div id="pix-info-section" style="display:none;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;margin-bottom:20px;text-align:left;">
                        <p style="margin:0 0 8px;font-weight:700;">⚡ Chave PIX para pagamento:</p>
                        <p id="pix-key-display" style="margin:0;font-family:monospace;font-size:1rem;color:#10b981;word-break:break-all;"></p>
                    </div>
                    <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;">
                        Continuar Comprando
                    </button>
                </div>
            </div>

            <!-- INFO MODAL -->
            <div id="store-info-modal" style="${Te}">
                <div style="${st}max-width:500px;">
                    ${Dt('<i class="fa-solid fa-circle-info"></i> Informações da Loja',"window.closeStoreInfo()")}
                    <div style="padding:10px 0;">
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-regular fa-clock"></i> Horário de Funcionamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:8px 16px;margin-bottom:20px;font-size:0.9rem;">
                            ${Pe()}
                        </div>
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-solid fa-credit-card"></i> Formas de Pagamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;font-size:0.9rem;display:flex;flex-wrap:wrap;gap:8px;">
                            <span class="badge info" style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-money-bill"></i> Na Entrega/Retirada</span>
                            ${_?'<span class="badge success" style="background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-brands fa-pix"></i> PIX</span>':""}
                            ${S?'<span class="badge primary" style="background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-credit-card"></i> Mercado Pago</span>':""}
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLOSED ALERT MODAL -->
            <div id="closed-alert-modal" style="${Te}z-index:9999;">
                <div style="${st}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.15);border:2px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-store-slash" id="closed-alert-icon" style="font-size:2.5rem;color:#ef4444;"></i>
                    </div>
                    <h2 id="closed-alert-title" style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Loja Fechada</h2>
                    <p id="closed-alert-desc" style="color:#94a3b8;margin-bottom:20px;">No momento não estamos aceitando pedidos.</p>
                    <div id="closed-alert-time-section" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;"><i class="fa-regular fa-clock"></i> Voltamos</span>
                        <p id="next-open-time" style="margin:6px 0 0;font-size:1.2rem;font-weight:800;color:#6366f1;"></p>
                    </div>
                    <button onclick="document.getElementById('closed-alert-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-weight:700;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        Entendi
                    </button>
                </div>
            </div>

            <!-- FLOATING CART BUTTON -->
            <button id="cart-float-btn" onclick="window.openCart()" style="display:none;" class="cart-float-btn">
                <div class="cart-float-left">
                    <i class="fa-solid fa-bag-shopping" style="font-size:1.2rem;"></i>
                    <span id="cart-badge-float" class="cart-badge-float">0</span>
                </div>
                <div class="cart-float-center">Ver sacola</div>
                <div class="cart-float-right" id="cart-total-float">R$ 0,00</div>
            </button>
        `:"";return setTimeout(()=>{h.size>0&&typeof Ee=="function"&&Ee()},100),`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                :root {
                    --primary-cat: ${b};
                    --primary-glow: ${b}4D;
                    --bg: ${v};
                    --card-bg: rgba(255,255,255,0.03);
                    --glass: rgba(255,255,255,0.05);
                    --text: ${R};
                    --text-muted: #94a3b8;
                    --price-cat: ${D};
                    --product-bg: ${m.productBgColor||"rgba(255,255,255,0.05)"};
                }
                @keyframes fadeInDown { from { opacity:0;transform:translateY(-30px); } to { opacity:1;transform:translateY(0); } }
                @keyframes pulse-soft { 0%{box-shadow:0 0 0 0 var(--primary-glow);} 70%{box-shadow:0 0 0 15px transparent;} 100%{box-shadow:0 0 0 0 transparent;} }
                .catalog-body { background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;min-height:100vh;margin:0;padding-bottom:80px;overflow-x:hidden; }
                .header { position:relative;padding:80px 20px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;animation:fadeInDown 0.8s cubic-bezier(0.2,0.8,0.2,1);overflow:hidden; }
                .header-glass { display:none; }
                .store-logo-wrapper { position:relative;z-index:1;padding:6px;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);border-radius:50%;box-shadow:0 20px 40px rgba(0,0,0,0.3); }
                .store-logo { width:120px;height:120px;object-fit:cover;border-radius:50%;background:#fff;display:block;border:2px solid rgba(255,255,255,0.1); }
                .status-badge { z-index:1;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:100px;color:#10b981;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;animation:pulse-soft 2s infinite; }
                .header h1 { z-index:1;font-size:2.4rem;font-weight:800;margin:0 0 8px;letter-spacing:-1px;color:var(--text); }
                .header-address { z-index:1;color:var(--text-muted);font-size:0.95rem;margin:0 0 12px;max-width:400px;line-height:1.4;opacity:0.9; }
                .store-info-btn { z-index:1;font-size:0.9rem;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--primary-cat);cursor:pointer;font-weight:700;background:var(--primary-glow);padding:6px 16px;border-radius:100px;transition:0.2s; }
                .store-status-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 20px;display:flex;flex-direction:column;gap:6px;font-size:0.9rem;color:var(--text);min-width:260px;backdrop-filter:blur(10px);z-index:1; }

                /* MODERNO THEME HDR */
                .cat-moderno-header { background: var(--bg); color: var(--text); border-bottom: 2px solid transparent; border-image: linear-gradient(to right, var(--primary-cat) 0%, transparent 100%) 1; }
                .cat-search-bar-top-container { padding: 16px 20px; background: rgba(0,0,0,0.02); }
                .cat-search-bar-wrap { display:flex; align-items:center; background:var(--bg); border-radius:12px; padding:0 16px; border:2px solid var(--primary-cat); max-width:1200px; margin:0 auto; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
                .cat-search-bar-wrap i { color:var(--primary-cat); font-size:1.1rem; }
                .cat-search-bar-wrap input { flex:1; border:none; background:transparent; padding:16px; font-size:1.05rem; outline:none; color:var(--text); font-family:'Outfit',sans-serif; }
                .cat-search-bar-wrap input::placeholder { color:var(--text-muted); }
                .cat-moderno-banner-hero { width: 100%; height: 220px; overflow: hidden; position: relative; }
                .cat-moderno-banner-hero img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-banner-hero .cat-banner-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-cat), rgba(0,0,0,0.2)); display:flex; align-items:center; justify-content:center; font-size:4rem; color:rgba(255,255,255,0.3); }
                .cat-moderno-info { max-width: 1200px; margin: 0 auto; padding: 0 20px 24px; position: relative; }
                .cat-moderno-logo-wrap { width: 110px; height: 110px; border-radius: 50%; border: 4px solid #ffffff; background: #ffffff; position: relative; margin-top: -55px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden; }
                .cat-moderno-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-logo-wrap .fallback-logo { width:100%; height:100%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; }
                .cat-moderno-info h1 { font-size: 2rem; font-weight: 800; margin: 0 0 8px; color: var(--text); }
                .cat-moderno-address { font-size: 0.95rem; color: var(--text-muted); margin: 0 0 12px; font-weight: 500; }
                .moderno-more-info { color: var(--primary-cat); font-weight: 700; cursor: pointer; text-decoration: none; opacity: 0.8; transition: 0.2s; }
                .moderno-more-info:hover { opacity: 1; }
                .cat-moderno-status-row { display: flex; align-items: center; gap: 4px; font-size: 0.95rem; flex-wrap: wrap; font-weight: 600; color: var(--text); }


                .section-container { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 20px; }
                .section-title { display:flex;align-items:center;gap:15px;margin:60px 0 30px 0; }
                .section-title span { font-size:1.8rem;font-weight:700;letter-spacing:-0.5px;color:var(--text); }
                .section-title .line { flex:1;height:1px;background:linear-gradient(to right,var(--primary-cat),transparent);opacity:0.3; }
                .section-title i { width:48px;height:48px;background:var(--glass);border:1px solid rgba(255,255,255,0.08);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--primary-cat);font-size:1.2rem;box-shadow:0 10px 20px rgba(0,0,0,0.1); }
                .product-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:30px; }
                .product-card { background:var(--product-bg);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover { transform:translateY(-8px) scale(1.01);border-color:var(--primary-cat);box-shadow:0 20px 40px -10px rgba(0,0,0,0.4),0 0 20px var(--primary-glow); }
                .card-image { position:relative;aspect-ratio:1/1;overflow:hidden; }
                .card-image img { width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover .card-image img { transform:scale(1.1); }
                .promo-tag { position:absolute;top:15px;right:15px;background:var(--primary-cat);color:white;padding:6px 14px;border-radius:12px;font-size:0.75rem;font-weight:800;box-shadow:0 8px 20px var(--primary-glow); }
                .card-info { padding:20px; }
                .card-info h3 { margin:0 0 12px 0;font-size:1.1rem;font-weight:700;color:var(--text);line-height:1.3; }
                .price-container { display:flex;align-items:center;gap:12px; }
                .price { font-size:1.3rem;font-weight:800;color:var(--price-cat); }
                .original-price { font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;opacity:0.6; }
                .whatsapp-float { position:fixed;bottom:30px;right:30px;background:#25d366;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;display:flex;align-items:center;gap:12px;font-weight:700;box-shadow:0 10px 25px rgba(37,211,102,0.4);z-index:7999;transition:all 0.3s;animation:fadeInDown 0.8s backwards 1s;white-space:nowrap;max-width:calc(100vw - 40px); }
                .whatsapp-float:hover { transform:scale(1.05) translateY(-5px); }
                .whatsapp-float i { font-size:1.5rem; }
                .delivery-card:hover { border-color: var(--primary-cat) !important; background: rgba(255,255,255,0.03); }
                /* Cat search/sidebar (Moderno theme) */
                .cart-float-btn { position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--primary-cat);color:white;border:none;padding:14px 24px;border-radius:100px;font-weight:700;font-size:1rem;cursor:pointer;z-index:8000;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.3);width:fit-content;min-width:320px;display:none; transition:transform 0.2s; }
                .cart-float-btn:hover { transform:translateX(-50%) scale(1.02); }
                .cart-float-left { display:flex;align-items:center;gap:8px; }
                .cart-badge-float { background:white;color:var(--primary-cat);border-radius:100px;padding:2px 8px;font-size:0.75rem;font-weight:800; display:inline-block; line-height:1; }
                .cart-float-center { font-weight:700; }
                .cart-float-right { font-weight:700; }
                @media(max-width:600px) {
                    .cart-float-btn { bottom:0;left:0;transform:none;width:100%;border-radius:0;min-width:unset;padding:18px 24px;box-shadow:0 -5px 20px rgba(0,0,0,0.4); }
                    .cart-float-btn:hover { transform:none; }
                }
                .cat-search-bar { display:block;width:100%;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;color:var(--text);font-size:1rem;font-family:'Outfit',sans-serif;box-sizing:border-box;outline:none;margin-bottom:24px;transition:border-color .2s; }
                .cat-search-bar:focus { border-color:var(--primary-cat); }
                .cat-search-bar::placeholder { color:#64748b; }
                .cat-sidebar { display:flex;flex-direction:column;gap:4px; }
                .cat-sidebar-link { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;color:#94a3b8;cursor:pointer;font-size:0.92rem;font-weight:600;border:none;background:none;width:100%;text-align:left;transition:all .15s; }
                .cat-sidebar-link:hover,.cat-sidebar-link.active { background:rgba(99,102,241,.15);color:var(--text); }
                .cat-sidebar-link i { width:18px;text-align:center;color:var(--primary-cat); }
                .cat-modern-layout { display:grid;grid-template-columns:200px 1fr;gap:28px;max-width:1200px;margin:0 auto;padding:0 20px 80px; }
                /* Banner hero */
                .cat-banner-hero { width:100%;max-height:340px;overflow:hidden;position:relative; }
                .cat-banner-hero img { width:100%;height:100%;object-fit:cover;display:block; }
                .cat-banner-fallback { width:100%;height:180px;background:linear-gradient(135deg,var(--primary-cat),rgba(168,85,247,0.8));display:flex;align-items:center;justify-content:center; }
                /* Accessibility */
                *:focus-visible { outline:3px solid var(--primary-cat);outline-offset:2px; }
                @media(prefers-reduced-motion:reduce){ *,::before,::after { animation-duration:.01ms!important;transition-duration:.01ms!important; } }
                /* iFood Style Selector */
                .cat-selector-wrapper { margin: 24px 0 40px; }
                .cat-selector-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none; }
                .cat-selector-scroll::-webkit-scrollbar { display: none; }
                .cat-selector-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; padding: 0; outline: none; transition: transform 0.2s; }
                .cat-selector-item:hover { transform: translateY(-3px); }
                .cat-selector-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: var(--glass); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content:center; color: var(--primary-cat); font-size: 1.4rem; transition: all 0.3s; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                .cat-selector-item.active .cat-selector-icon-wrap { background: var(--primary-cat); color: white; border-color: var(--primary-cat); box-shadow: 0 10px 20px var(--primary-glow); }
                .cat-selector-label { font-size: 0.82rem; font-weight: 600; color: var(--text); opacity: 0.8; transition: opacity 0.3s; white-space: nowrap; }
                .cat-selector-item.active .cat-selector-label { opacity: 1; color: var(--primary-cat); }
                .promo-highlight { color: #fbbf24 !important; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
                .section-title.promo i { background: rgba(251, 191, 36, 0.15); border-color: rgba(251, 191, 36, 0.3); color: #fbbf24; }
                .section-container-cat { animation: fadeInDown 0.5s ease backwards; }
                @media(max-width:768px){ 
                    .cat-modern-layout { grid-template-columns:1fr; gap:16px; } 
                    .cat-sidebar-sticky { display:block; position:-webkit-sticky; position:sticky; top:0; height:auto; z-index:10; background:var(--bg); padding-top:10px; margin:-10px -20px 0; width:100vw; } 
                    .cat-sidebar { display:flex; flex-direction:row; flex-wrap:nowrap; overflow-x:auto; padding:0 20px 10px; scrollbar-width:none; -ms-overflow-style:none; gap:8px; width:100%; }
                    .cat-sidebar::-webkit-scrollbar { display:none; }
                    .cat-sidebar-link { flex:0 0 auto; white-space:nowrap; width:auto; padding:8px 16px; border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; }
                    .cat-sidebar-sticky p { display:none; }
                }
                @media(max-width:600px){
                    .header{padding:60px 20px 30px;} .header h1{font-size:2rem;letter-spacing:-.5px;} 
                    .store-logo{width:80px;height:80px;} .product-grid{grid-template-columns:repeat(2,1fr);gap:12px;}
                    .section-container{padding:0 14px;} .section-title{margin:36px 0 16px;}
                    .section-title span{font-size:1.3rem;} .section-title i{width:36px;height:36px;font-size:0.9rem;}
                    .card-info{padding:12px;} .card-info h3{font-size:0.88rem;} .price{font-size:0.95rem;}
                    .whatsapp-float{bottom:16px;right:16px;padding:10px 14px;font-size:0.85rem;}
                    .cat-banner-hero{max-height:160px;}
                }
                @media(max-width:380px){ .whatsapp-float{padding:12px;border-radius:50%;right:12px;bottom:12px;} .whatsapp-float span{display:none;} }
            </style>

            <div class="catalog-body">
                ${T!=="moderno"?`
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge"><i class="fa-solid fa-circle" style="font-size:6px;"></i> Loja Online</div>
                    ${L?`<div class="store-logo-wrapper"><img src="${L}" alt="${s.name}" class="store-logo"></div>`:'<div style="width:90px;height:90px;border-radius:50%;background:var(--primary-glow);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                    <h1>${s.name}</h1>
                    <p class="header-address"><i class="fa-solid fa-location-dot" style="margin-right:4px;opacity:0.7;"></i> ${s.address||"Endereço não cadastrado"}</p>
                    
                    <div class="store-info-btn" onclick="window.openStoreInfo()">
                        Mais informações <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;margin-left:4px;"></i>
                    </div>

                    <div class="store-status-card">
                        <div style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">
                            ${oe()}
                        </div>
                        ${ge?`
                        <div style="height:1px;background:rgba(255,255,255,0.05);margin:2px 0;"></div>
                        <div style="color:var(--text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                            <i class="fa-solid fa-motorcycle"></i> ${ct!==!1?"Entrega e Retirada":"Apenas Retirada"}
                        </div>
                        `:""}
                    </div>
                </header>
                `:""}

                ${T==="banner"?`
                    <!-- Banner hero -->
                    ${k||f?`
                        <div class="cat-banner-hero" aria-label="Banner da loja">
                            <picture>
                                ${f?`<source media="(max-width:600px)" srcset="${f}">`:""}
                                <img src="${k||f}" alt="Banner ${s.name}">
                            </picture>
                        </div>`:`
                        <div class="cat-banner-fallback" aria-hidden="true">
                            <i class="fa-solid fa-store" style="font-size:3rem;color:rgba(255,255,255,0.3);"></i>
                        </div>`}
                    <main class="section-container" style="padding-top:20px;">
                        ${C.length>0?`<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${C.map(O=>ae(O,!0)).join("")}</div>`:""}
                        ${g.map(O=>`<div class="section-title"><i class="fa-solid ${O.icon||"fa-tag"}" aria-hidden="true"></i><span>${O.name}</span><div class="line"></div></div><div class="product-grid" role="list">${O.products.map(N=>ae(N,!1)).join("")}</div>`).join("")}
                        ${y.length>0?`<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${y.map(O=>ae(O,!1)).join("")}</div>`:""}
                        ${$.length===0?'<div style="text-align:center;padding:80px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>

                `:T==="moderno"?`
                    <!-- Moderno layout: sidebar + search + new header -->
                    <div class="cat-moderno-header">
                        <div class="cat-search-bar-top-container">
                            <div class="cat-search-bar-wrap">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" id="cat-search-bar-top" placeholder="Buscar no catálogo" aria-label="Buscar produto" oninput="window.catSearch(this.value)">
                            </div>
                        </div>
                        
                        <div class="cat-moderno-banner-hero">
                            ${k||f?`
                            <picture>
                                ${f?`<source media="(max-width:600px)" srcset="${f}">`:""}
                                <img src="${k||f}" alt="Banner ${s.name}">
                            </picture>
                            `:`
                            <div class="cat-banner-fallback">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            `}
                        </div>

                        <div class="cat-moderno-info">
                            <div class="cat-moderno-logo-wrap">
                                ${L?`<img src="${L}" alt="${s.name}">`:'<div class="fallback-logo"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                            </div>
                            <h1>${s.name}</h1>
                            <p class="cat-moderno-address">
                                ${s.address||"Endereço não cadastrado"} <span style="margin:0 8px;">•</span> <span class="moderno-more-info" onclick="window.openStoreInfo()">Mais informações</span>
                            </p>
                            <div class="cat-moderno-status-row">
                                ${oe()} 
                                ${ge?`<span class="badge" style="background:rgba(148,163,184,0.1);color:#475569;border:1px solid rgba(148,163,184,0.2);margin-left:8px;font-size:0.8rem;padding:4px 10px;border-radius:6px;font-weight:700;">${ct!==!1?"Entrega e Retirada":"Apenas Retirada"}</span>`:""}
                            </div>
                        </div>
                    </div>

                    <div class="cat-modern-layout" style="padding-top:20px;">
                        <aside class="cat-sidebar-sticky" style="position:sticky;top:20px;height:fit-content;" aria-label="Categorias">
                            <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:700;margin:0 0 10px 14px;">Categorias</p>
                            <nav class="cat-sidebar">
                                <button class="cat-sidebar-link active" onclick="window.catFilterCat('all')" aria-pressed="true">
                                    <i class="fa-solid fa-th-large" aria-hidden="true"></i> Todos
                                </button>
                                ${C.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('promo')"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i> Ofertas</button>`:""}
                                ${g.map(O=>`<button class="cat-sidebar-link" onclick="window.catFilterCat('${O.id}')"><i class="fa-solid ${O.icon||"fa-tag"}" aria-hidden="true"></i> ${O.name}</button>`).join("")}
                                ${y.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>`:""}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${C.length>0?`<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${C.map(O=>ae(O,!0)).join("")}</div>`:""}
                                ${g.map(O=>`<div class="section-title" data-catgroup="${O.id}"><i class="fa-solid ${O.icon||"fa-tag"}" aria-hidden="true"></i><span>${O.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${O.id}" role="list">${O.products.map(N=>ae(N,!1)).join("")}</div>`).join("")}
                                ${y.length>0?`<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${y.map(O=>ae(O,!1)).join("")}</div>`:""}
                                ${$.length===0?'<div style="text-align:center;padding:80px 20px;color:#64748b;"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível.</p></div>':""}
                            </div>
                        </div>
                    </div>
                `:`
                    <!-- Clássico (default) -->
                    <main class="section-container">
                        <div class="cat-selector-wrapper">
                            <div class="cat-selector-scroll">
                                <button class="cat-selector-item active" onclick="window.catFilterClassic('all')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-th-large"></i></div>
                                    <span class="cat-selector-label">Todos</span>
                                </button>
                                ${C.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('promo')">
                                    <div class="cat-selector-icon-wrap" style="color:#fbbf24;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <span class="cat-selector-label">Ofertas</span>
                                </button>`:""}
                                ${g.map(O=>`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${O.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${O.icon||"fa-tag"}"></i></div>
                                    <span class="cat-selector-label">${O.name}</span>
                                </button>`).join("")}
                                ${y.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>`:""}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${C.length>0?"":"display:none;"}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${C.map(O=>ae(O,!0)).join("")}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${g.map(O=>`
                                <div class="section-container-cat" data-classic-cat="${O.id}">
                                    <div class="section-title"><i class="fa-solid ${O.icon||"fa-tag"}" aria-hidden="true"></i><span>${O.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${O.products.map(N=>ae(N,!1)).join("")}</div>
                                </div>
                            `).join("")}
                            ${y.length>0?`
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${y.map(O=>ae(O,!1)).join("")}</div>
                                </div>
                            `:""}
                        </div>

                        ${$.length===0?'<div style="text-align:center;padding:100px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:4rem;opacity:0.3;display:block;margin-bottom:20px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>
                `}

                ${A?`
                    <a href="https://wa.me/${A}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar conosco via WhatsApp">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Falar conosco</span>
                    </a>`:""}

                ${jt}
            </div>
        `}catch(e){return console.error("Catalog Error:",e),"<p>Erro ao carregar catálogo.</p>"}},tu=async n=>(setTimeout(()=>{const e=document.getElementById("remote-qrcode"),t=document.getElementById("qr-content-active"),i=document.getElementById("qr-content-success");if(!e)return;let s=null,r=null;const o=()=>{s&&clearInterval(s),r&&clearInterval(r)},l=async()=>{try{const v=await(await fetch(`${Nt}/instance/connect/${n}`,{headers:{apikey:Mt}})).json();if(v&&(v.base64||v.qrcode?.base64)){const R=v.base64||v.qrcode.base64;e.innerHTML=`<img src="${R}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`}else{const D=await(await fetch(`${Nt}/instance/connectionState/${n}`,{headers:{apikey:Mt}})).json();(D.instance?.state==="open"||D.state==="open")&&u()}}catch(b){console.error("Error fetching QR:",b)}},d=async()=>{try{const v=await(await fetch(`${Nt}/instance/connectionState/${n}`,{headers:{apikey:Mt}})).json();(v.instance?.state==="open"||v.state==="open")&&u()}catch(b){console.error("Error checking status:",b)}},u=()=>{o(),t&&(t.style.display="none"),i&&(i.style.display="flex")};l(),s=setInterval(l,4e4),r=setInterval(d,3e3);const m=setInterval(()=>{document.getElementById("remote-qrcode")||(o(),clearInterval(m))},1e3)},100),`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
            
            :root {
                --primary: #6366f1;
                --primary-glow: rgba(99, 102, 241, 0.3);
                --bg: #0f172a;
                --glass: rgba(255, 255, 255, 0.05);
                --text: #ffffff;
                --text-muted: #94a3b8;
            }

            .qr-body {
                background: var(--bg);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                background-image: 
                    radial-gradient(circle at 0% 0%, var(--primary-glow) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, var(--primary-glow) 0%, transparent 40%);
            }

            .qr-card {
                background: var(--glass);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 32px;
                padding: 3rem;
                width: 100%;
                max-width: 480px;
                text-align: center;
                box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                animation: scaleUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            @keyframes scaleUp {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .qr-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                color: var(--primary);
                display: inline-block;
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -1px; }
            p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }

            .qrcode-container {
                background: white;
                padding: 20px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 2.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                min-width: 250px;
                min-height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-muted);
            }

            .pulse {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 var(--primary-glow);
                animation: pulse-ring 1.5s infinite;
            }

            @keyframes pulse-ring {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--primary-glow); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
            }

            .success-message {
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
            }
        </style>

        <div class="qr-body">
            <div class="qr-card">
                <div id="qr-content-active">
                    <div class="qr-icon"><i class="fa-solid fa-qrcode"></i></div>
                    <h1>Conectar WhatsApp</h1>
                    <p>Escaneie o QR Code abaixo com o seu WhatsApp para ativar a integração.</p>
                    
                    <div class="qrcode-container" id="remote-qrcode">
                        <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--bg);"></i>
                    </div>

                    <div class="status-indicator">
                        <span class="pulse"></span>
                        Aguardando leitura do QR Code...
                    </div>
                </div>

                <div id="qr-content-success" class="success-message">
                    <div class="success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h1 style="color: #10b981;">Conectado!</h1>
                    <p>O WhatsApp foi vinculado com sucesso. Você já pode fechar esta página.</p>
                </div>
            </div>
        </div>
    `),Cx=[{key:"pedido_aceito",label:"Pedido Aceito (Entrega)",icon:"fa-check-circle",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito! Itens: {{lista_produtos}}. Total: R$ {{valor_total}}"},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!"},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!"},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue / Finalizado",icon:"fa-flag-checkered",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],Px=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],Ua=[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}],Rx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,t=await F.get("companies",e);let i=t?.stores||[];const s=!!t?.mercadoPagoToken;if(n.role!=="owner"){const L=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(_=>L.includes(_.id))}if(i.length===0)return'<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>';const r=await F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),o=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:e});let l=i[0].id;const d=L=>o.find(_=>_.lojaId===L)||null,u=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom:20px; overflow-x:auto;">
            ${i.map(L=>`
                <button class="btn-store-tab ${L.id===l?"active":""}" data-id="${L.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${L.id===l?"var(--primary)":"var(--surface-hover)"};
                    color: ${L.id===l?"#fff":"var(--text-main)"};
                    border: 1px solid ${L.id===l?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px; cursor: pointer; white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${L.name}
                </button>
            `).join("")}
        </div>`,m=()=>Px.map(L=>`
        <div class="var-chip" draggable="true" data-var="${L.key}" title="Clique para copiar">
            <i class="fa-solid ${L.icon}"></i>
            <span>${L.label}</span>
            <code>${L.key}</code>
        </div>
    `).join("");return setTimeout(()=>{b(),v()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem; font-weight: 700; color: var(--text-main);
                display: flex; align-items: center; gap: 10px;
                margin-bottom: 1.25rem; padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%; padding: 0.75rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                appearance: none; cursor: pointer;
                transition: border-color .2s;
            }
            .config-select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input {
                width: 100%; padding: 0.75rem 1rem;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                box-sizing: border-box; transition: border-color .2s;
                height: 44px;
            }
            .config-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input::placeholder { color: var(--text-dim); }
            .config-label {
                display: block; font-size: 0.75rem; font-weight: 700;
                color: var(--text-dim); text-transform: uppercase;
                letter-spacing: 0.05em; margin-bottom: 6px;
            }
            .cat-field-hint {
                font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;
            }
            .cat-field { margin-bottom: 1.25rem; }
            .theme-card-grid {
                display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 1.25rem;
            }
            @media(max-width:600px) { .theme-card-grid { grid-template-columns: 1fr; } }
            .theme-card {
                border: 2px solid var(--border-color); border-radius: 12px;
                padding: 14px; cursor: pointer; transition: all .2s;
                background: rgba(255,255,255,0.02);
            }
            .theme-card:hover { border-color: rgba(99,102,241,.5); background: rgba(99,102,241,.04); }
            .theme-card.active { border-color: var(--primary); background: rgba(99,102,241,.08); }
            .theme-card-preview {
                height: 72px; border-radius: 8px; margin-bottom: 8px;
                overflow: hidden; background: var(--surface-hover);
                display: flex; flex-direction: column; gap: 4px; padding: 6px;
            }
            .theme-card-name { font-size: 0.85rem; font-weight: 700; text-align: center; }
            .theme-card-desc { font-size: 0.75rem; color: var(--text-dim); text-align: center; margin-top: 2px; }
            .vars-grid {
                display: flex; flex-wrap: wrap; gap: 0.5rem;
                margin-bottom: 1.5rem; padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px; font-size: 0.82rem;
                color: var(--primary); cursor: grab; user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden; margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex; align-items: center; gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600; font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%; background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm); color: var(--text-main);
                font-size: 0.9rem; padding: 0.75rem; resize: vertical;
                box-sizing: border-box; font-family: inherit;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex; align-items: center;
                justify-content: space-between; margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem; background: var(--primary);
                color: white; border: none; border-radius: var(--radius-sm);
                font-size: 0.85rem; font-weight: 600; cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }
            .horarios-grid { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
            .horario-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md); transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color); border: 1px solid var(--border-color);
                color: white; padding: 0.4rem 0.6rem;
                border-radius: 6px; font-size: 0.85rem; outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute; cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333; transition: .4s; border-radius: 20px;
            }
            .slider:before {
                position: absolute; content: "";
                height: 14px; width: 14px; left: 3px; bottom: 3px;
                background-color: white; transition: .4s; border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração do Catálogo</h2>
        </div>

        <div id="cat-tabs-container">
            ${u()}
        </div>

        <div id="cat-config-content-area"></div>
    `;function b(){const L=()=>{document.querySelectorAll(".btn-store-tab").forEach(_=>{_.addEventListener("click",()=>{l=_.dataset.id;const A=document.getElementById("cat-tabs-container");A&&(A.innerHTML=u(),L()),v()})})};L()}function v(){const L=document.getElementById("cat-config-content-area");if(!L)return;const _=d(l),A=_?.design||{},S=_?.mensagens_automaticas||{},$=`${window.location.origin}/catalog/${l}`,C=_?.instancia_id||i.find(f=>f.id===l)?.instancia_id||"",T=(f,g)=>{const y=_?.[g]||{};return Ua.map(w=>{const h=y[w.key]||{},I=h.ativo??h.aberto??w.key!=="dom",x=h.inicio||h.abertura||"08:00",P=h.fim||h.fechamento||"18:00";return`
                <div class="horario-row ${I?"":"inactive"}" id="${f}-row-${w.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${f}-toggle" data-dia="${w.key}" ${I?"checked":""}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${w.label}</span>
                    </div>
                    <div class="horario-inputs ${I?"":"hidden"}" id="${f}-inputs-${w.key}">
                        <input type="time" class="time-input" id="${f}-open-${w.key}" value="${x}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${f}-close-${w.key}" value="${P}">
                    </div>
                    <div class="status-label" id="${f}-status-${w.key}" style="font-size:0.8rem;color:${I?"var(--success)":"var(--text-dim)"};min-width:70px;text-align:right;">
                        ${I?"Aberto":"Fechado"}
                    </div>
                </div>`}).join("")},k=Cx.map(f=>`
            <div class="msg-card" id="msg-card-${f.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${f.icon}" style="color:var(--primary);"></i>
                    <span>${f.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea id="cat-msg-${f.key}" class="msg-textarea" rows="3"
                        placeholder="${f.default}" data-msg-key="${f.key}"
                    >${S[f.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);">
                            <i class="fa-solid fa-circle-info"></i> Arraste as variáveis acima para o texto
                        </span>
                        <button class="btn-save-msg cat-save-single-msg" data-msg-key="${f.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");L.innerHTML=`

            <!-- ── Link do catálogo ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-link" style="color:var(--primary);"></i> Link do Catálogo
                </div>
                <div style="display:flex;gap:10px;align-items:center;background:rgba(99,102,241,0.06);border:1px dashed rgba(99,102,241,0.3);border-radius:var(--radius-md);padding:0.75rem 1rem;">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i>
                    <input type="text" id="cat-link-display" value="${$}" readonly style="flex:1;background:transparent;border:none;color:var(--text-main);font-size:0.9rem;outline:none;">
                    <button class="btn-save-msg" id="btn-copy-cat-link"><i class="fa-solid fa-copy"></i> Copiar</button>
                    <a href="${$}" target="_blank" class="btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.85rem;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>

            <!-- ── Instância ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que enviará mensagens automáticas para esta loja.
                </p>
                <select id="cat-instance-select" class="config-select">
                    <option value="">-- Nenhuma instância --</option>
                    ${r.map(f=>`
                        <option value="${f.id}" ${f.id===C?"selected":""}>
                            ${f.nome} (${f.status})
                        </option>
                    `).join("")}
                </select>
                <div id="cat-instance-indicator" style="margin-top:10px;"></div>
            </div>

            <!-- ── Aparência ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-palette" style="color:var(--primary);"></i> Aparência do Catálogo
                </div>

                <!-- Logo -->
                <div class="cat-field">
                    <label class="config-label">Logo da Loja</label>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div id="cat-logo-preview-wrapper" style="width:80px;height:80px;border-radius:12px;border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;background:var(--surface-hover);overflow:hidden;flex-shrink:0;">
                            ${A.logoUrl?`<img src="${A.logoUrl}" style="width:100%;height:100%;object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div>
                            <input type="file" id="cat-logo-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('cat-logo-file').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p class="cat-field-hint" style="margin-top:6px;">Recomendado: 200×200px PNG/SVG transparente</p>
                        </div>
                    </div>
                </div>

                <!-- Cores -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor Principal</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-primary-color" value="${A.primaryColor||"#6366f1"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-primary-color-hex" value="${A.primaryColor||"#6366f1"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor de Fundo</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-secondary-color" value="${A.secondaryColor||"#0f172a"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-secondary-color-hex" value="${A.secondaryColor||"#0f172a"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor do Texto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-text-color" value="${A.textColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-text-color-hex" value="${A.textColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor do Preço</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-price-color" value="${A.priceColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-price-color-hex" value="${A.priceColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Fundo do Produto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-product-bg-color" value="${A.productBgColor||"#1e293b"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-product-bg-color-hex" value="${A.productBgColor||"#1e293b"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <!-- Tema do catálogo -->
                <div class="cat-field">
                    <label class="config-label">Layout do Catálogo</label>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Escolha a apresentação visual dos seus produtos.</p>
                    <div class="theme-card-grid" id="cat-theme-grid">

                        <!-- Clássico -->
                        <div class="theme-card ${(A.themeId||"classico")==="classico"?"active":""}" onclick="window.catSelectTheme('classico')">
                            <div class="theme-card-preview">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">
                                    ${["","","",""].map(()=>'<div style="background:rgba(99,102,241,.2);border-radius:4px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-th-large" style="margin-right:5px;"></i>Clássico</div>
                            <div class="theme-card-desc">Grade de produtos simples e direta</div>
                        </div>

                        <!-- Moderno -->
                        <div class="theme-card ${A.themeId==="moderno"?"active":""}" onclick="window.catSelectTheme('moderno')">
                            <div class="theme-card-preview" style="flex-direction:row;padding:4px;gap:4px;">
                                <div style="width:30%;background:rgba(99,102,241,.15);border-radius:4px;"></div>
                                <div style="flex:1;display:flex;flex-direction:column;gap:3px;">
                                    <div style="height:10px;background:rgba(255,255,255,.15);border-radius:3px;"></div>
                                    ${["","",""].map(()=>'<div style="height:16px;background:rgba(99,102,241,.12);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-search" style="margin-right:5px;"></i>Moderno</div>
                            <div class="theme-card-desc">Sidebar de categorias + busca</div>
                        </div>

                        <!-- Banner -->
                        <div class="theme-card ${A.themeId==="banner"?"active":""}" onclick="window.catSelectTheme('banner')">
                            <div class="theme-card-preview" style="flex-direction:column;padding:4px;gap:3px;">
                                <div style="height:28px;background:linear-gradient(135deg,rgba(99,102,241,.4),rgba(168,85,247,.3));border-radius:4px;"></div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;flex:1;">
                                    ${["","",""].map(()=>'<div style="background:rgba(99,102,241,.15);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-image" style="margin-right:5px;"></i>Banner</div>
                            <div class="theme-card-desc">Hero banner + grade de produtos</div>
                        </div>
                    </div>
                    <input type="hidden" id="cat-theme-id" value="${A.themeId||"classico"}">
                </div>

                <!-- Banners (utilizado em temas Banner e Moderno) -->
                <div id="cat-banner-section" style="border-top:1px solid var(--border-color);padding-top:1rem;margin-bottom:1rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-images" style="color:var(--primary);"></i> Banners do Catálogo
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div>
                            <label class="config-label">Banner Desktop</label>
                            <div id="banner-desktop-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${A.bannerUrl?`<img src="${A.bannerUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-panorama" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-desktop-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-desktop-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Desktop (1200×400)
                            </button>
                        </div>
                        <div>
                            <label class="config-label">Banner Mobile</label>
                            <div id="banner-mobile-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${A.bannerMobileUrl?`<img src="${A.bannerMobileUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-mobile-screen" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-mobile-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-mobile-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Mobile (600×300)
                            </button>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-aparencia">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Aparência
                    </button>
                </div>
            </div>

            <!-- ── Horário de Funcionamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja aceita pedidos.
                </p>
                <div class="horarios-grid">
                    ${T("func","horario_funcionamento")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-func">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <!-- ── Horário de Entrega ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${T("entrega","horario_entrega")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <!-- ── Mensagens Automáticas ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas ao cliente em cada etapa do pedido via WhatsApp.
                </p>
                <div class="vars-grid" id="cat-vars-grid">
                    ${m()}
                </div>
                <div id="cat-msg-editors">
                    ${k}
                </div>
            </div>

            <!-- ── Pagamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Pagamento
                </div>

                <div class="cat-field">
                    <label class="config-label">WhatsApp de Atendimento (com DDD)</label>
                    <input type="text" id="cat-whatsapp" value="${A.whatsapp||""}" class="config-input" placeholder="Ex: 5511999999999">
                    <p class="cat-field-hint">Número exibido no botão flutuante do catálogo.</p>
                </div>

                <div class="cat-field">
                    <label class="config-label">Chave PIX (Manual)</label>
                    <input type="text" id="cat-pix-key" value="${A.pixKey||""}" class="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória">
                    <p class="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.25rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Taxas de Entrega por Bairro
                    </p>
                    <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:12px;">Defina o preço da entrega para cada bairro. Para aplicar o mesmo valor a múltiplos bairros, separe-os por vírgula (Ex: Centro, Vila Nova).</p>
                    <div style="display:grid;grid-template-columns:1fr 100px;gap:16px;margin-bottom:16px;align-items:end;">
                        <div class="field">
                            <label class="config-label">Bairro(s)</label>
                            <input type="text" id="new-bairro-nomes" class="config-input" placeholder="Ex: Centro, Jardim Floral">
                        </div>
                        <div class="field">
                            <label class="config-label">Valor (R$)</label>
                            <input type="number" id="new-bairro-preco" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-bairro">
                            <i class="fa-solid fa-plus"></i> Adicionar Bairro
                        </button>
                    </div>
                    <div id="bairros-list">
                        ${(_?.bairrosEntrega||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum bairro com entrega configurado.</p>':(_?.bairrosEntrega||[]).map((f,g)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;flex:1;">
                                        <span style="font-weight:600;color:var(--text-main);">${f.bairros}</span>
                                        <span style="font-size:0.85rem;color:var(--primary);font-weight:700;">R$ ${Number(f.preco).toFixed(2)}</span>
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteBairro(${g})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Mercado Pago (PIX Automático)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Ativar ou desativar pagamentos via Mercado Pago.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="mp-active-toggle" ${_?.mercadoPagoActive!==!1?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- Cupons de Desconto -->
                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-tag" style="color:var(--primary);"></i> Cupons de Desconto
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px;align-items:end;">
                        <div>
                            <label class="config-label">Código do Cupom</label>
                            <input type="text" id="new-cupom-code" class="config-input" style="text-transform:uppercase;" placeholder="EX: DESCONTO10">
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 100px;gap:8px;">
                            <div>
                                <label class="config-label">Desconto</label>
                                <input type="number" id="new-cupom-valor" class="config-input" placeholder="10" min="0" step="0.01">
                            </div>
                            <div>
                                <label class="config-label">Tipo</label>
                                <select id="new-cupom-tipo" class="config-select" style="height:44px;">
                                    <option value="percent">%</option>
                                    <option value="fixo">R$</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="config-label">Gasto Mínimo (R$)</label>
                            <input type="number" id="new-cupom-min" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-cupom">
                            <i class="fa-solid fa-plus"></i> Adicionar Cupom
                        </button>
                    </div>
                    <div id="cupons-list">
                        ${(_?.cupons||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum cupom cadastrado ainda.</p>':(_?.cupons||[]).map((f,g)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-family:monospace;font-weight:700;color:var(--primary);">${f.codigo}</span>
                                        <span class="badge ${f.ativo!==!1?"success":"warning"}">${f.ativo!==!1?"Ativo":"Inativo"}</span>
                                        <span style="font-size:0.8rem;color:var(--text-muted);">${f.tipo==="percent"?f.desconto+"%":"R$ "+Number(f.desconto).toFixed(2)} de desconto</span>
                                        ${f.valorMinimo>0?`<span style="font-size:0.75rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px;">Min: R$ ${f.valorMinimo.toFixed(2)}</span>`:""}
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteCupom(${g})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="padding:14px;border-radius:var(--radius-md);background:${s?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)"};border:1px solid ${s?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"};display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                    <i class="fa-solid ${s?"fa-circle-check":"fa-circle-xmark"}" style="color:${s?"#10b981":"#ef4444"};font-size:1.2rem;"></i>
                    <div>
                        <p style="margin:0;font-weight:600;font-size:0.9rem;">Mercado Pago</p>
                        <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">
                            ${s?"Integração ativa — PIX via Mercado Pago disponível no catálogo.":'Não configurado. <a href="/mercado-pago" style="color:var(--primary);">Configurar agora →</a>'}
                        </p>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-pagamento">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{R()},50)}function R(L){const _=i;document.getElementById("btn-copy-cat-link")?.addEventListener("click",()=>{const C=document.getElementById("cat-link-display");C?.value&&navigator.clipboard.writeText(C.value).then(()=>B.success("Link copiado!"))});const A=(C,T)=>{const k=document.getElementById(C),f=document.getElementById(T);k?.addEventListener("input",()=>{f&&(f.value=k.value)}),f?.addEventListener("input",()=>{k&&(k.value=f.value)})};A("cat-primary-color","cat-primary-color-hex"),A("cat-secondary-color","cat-secondary-color-hex"),A("cat-text-color","cat-text-color-hex"),A("cat-price-color","cat-price-color-hex"),A("cat-product-bg-color","cat-product-bg-color-hex"),document.getElementById("cat-logo-file")?.addEventListener("change",C=>{const T=C.target.files?.[0];if(T){const k=new FileReader;k.onload=f=>{const g=document.getElementById("cat-logo-preview-wrapper");g&&(g.innerHTML=`<img src="${f.target?.result}" style="width:100%;height:100%;object-fit:contain;">`)},k.readAsDataURL(T)}}),document.getElementById("cat-instance-select")?.addEventListener("change",async C=>{const T=C.target.value,k=_.map(f=>f.id===l?{...f,instancia_id:T||null}:f);try{B.info("Salvando instância..."),await F.update("companies",e,{stores:k});const f=_.find(w=>w.id===l);f&&(f.instancia_id=T);const g=d(l);if(g)await F.update("loja_config",g.id,{instancia_id:T||null}),g.instancia_id=T;else{const w=await F.create("loja_config",{empresaId:e,lojaId:l,instancia_id:T||null});o.push({id:w,empresaId:e,lojaId:l,instancia_id:T})}const y=await F.getAll("instancias",{field:"lojaId",operator:"==",value:l});for(const w of y)await F.update("instancias",w.id,{lojaId:null,funcao:null});T&&await F.update("instancias",T,{lojaId:l,funcao:"Catálogo Vendas"}),B.success("Instância vinculada com sucesso!")}catch(f){B.error("Erro ao salvar instância."),console.error(f)}}),window.catSelectTheme=C=>{const T=document.getElementById("cat-theme-id");T&&(T.value=C),document.querySelectorAll(".theme-card").forEach(f=>f.classList.remove("active")),document.querySelectorAll(".theme-card").forEach(f=>{f.getAttribute("onclick")?.includes(`'${C}'`)&&f.classList.add("active")})};const S=(C,T)=>{document.getElementById(C)?.addEventListener("change",k=>{const f=k.target.files?.[0];if(f){const g=new FileReader;g.onload=y=>{const w=document.getElementById(T);w&&(w.innerHTML=`<img src="${y.target?.result}" style="width:100%;height:100%;object-fit:cover;">`)},g.readAsDataURL(f)}})};S("cat-banner-desktop-file","banner-desktop-preview"),S("cat-banner-mobile-file","banner-mobile-preview"),document.getElementById("btn-save-cat-aparencia")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-aparencia");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=document.getElementById("cat-primary-color-hex").value,k=document.getElementById("cat-secondary-color-hex").value,f=document.getElementById("cat-text-color-hex").value,g=document.getElementById("cat-price-color-hex").value,y=document.getElementById("cat-product-bg-color-hex").value,w=document.getElementById("cat-theme-id")?.value||"classico",h=document.getElementById("cat-logo-file").files?.[0],I=document.getElementById("cat-banner-desktop-file")?.files?.[0],x=document.getElementById("cat-banner-mobile-file")?.files?.[0],P=d(l);let M=P?.design?.logoUrl||"",q=P?.design?.bannerUrl||"",j=P?.design?.bannerMobileUrl||"";if(h){const J=ln(cn,`logos/${e}/${l}_logo`);await Li(J,h),M=await ni(J)}if(I){const J=ln(cn,`banners/${e}/${l}_desktop`);await Li(J,I),q=await ni(J)}if(x){const J=ln(cn,`banners/${e}/${l}_mobile`);await Li(J,x),j=await ni(J)}const K={...P?.design||{},primaryColor:T,secondaryColor:k,textColor:f,priceColor:g,productBgColor:y,logoUrl:M,themeId:w,bannerUrl:q,bannerMobileUrl:j};await D({design:K}),B.success("Aparência salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência',C.classList.remove("saved")},2e3)}catch{B.error("Erro ao salvar aparência."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'}}),document.getElementById("btn-save-cat-func")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-func");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};Ua.forEach(({key:k})=>{const f=document.querySelector(`.func-toggle[data-dia="${k}"]`)?.checked,g=document.getElementById(`func-open-${k}`)?.value||"08:00",y=document.getElementById(`func-close-${k}`)?.value||"18:00";T[k]={ativo:f,inicio:g,fim:y}}),await D({horario_funcionamento:T}),B.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários',C.classList.remove("saved")},2e3)}catch{B.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.getElementById("btn-save-cat-entrega")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-entrega");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};Ua.forEach(({key:k})=>{const f=document.querySelector(`.entrega-toggle[data-dia="${k}"]`)?.checked,g=document.getElementById(`entrega-open-${k}`)?.value||"08:00",y=document.getElementById(`entrega-close-${k}`)?.value||"18:00";T[k]={ativo:f,inicio:g,fim:y}}),await D({horario_entrega:T}),B.success("Horários de entrega salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega',C.classList.remove("saved")},2e3)}catch{B.error("Erro ao salvar horários de entrega."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".cat-save-single-msg").forEach(C=>{C.addEventListener("click",async()=>{const T=C.dataset.msgKey,k=document.getElementById(`cat-msg-${T}`)?.value||"",y={...d(l)?.mensagens_automaticas||{},[T]:k};try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>',await D({mensagens_automaticas:y}),B.success("Mensagem salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar',C.classList.remove("saved")},2e3)}catch{B.error("Erro ao salvar mensagem."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})}),document.querySelectorAll(".var-chip").forEach(C=>{C.addEventListener("dragstart",T=>{T.dataTransfer?.setData("text/plain",C.dataset.var||"")}),C.addEventListener("click",()=>{navigator.clipboard.writeText(C.dataset.var||"").then(()=>B.info("Variável copiada!"))})}),document.querySelectorAll(".msg-textarea").forEach(C=>{C.addEventListener("dragover",T=>T.preventDefault()),C.addEventListener("drop",T=>{T.preventDefault();const k=T.dataTransfer?.getData("text/plain")||"",f=C,g=f.selectionStart,y=f.selectionEnd;f.value=f.value.substring(0,g)+k+f.value.substring(y),f.selectionStart=f.selectionEnd=g+k.length,f.focus()})}),document.getElementById("btn-save-cat-pagamento")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-pagamento");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=d(l),k=document.getElementById("cat-whatsapp").value.replace(/\D/g,""),f=document.getElementById("cat-pix-key").value.trim(),g=document.getElementById("mp-active-toggle")?.checked,y={...T?.design||{},whatsapp:k,pixKey:f};delete y.taxaFixaNome,delete y.taxaFixaValor,delete y.taxaTipo,await D({design:y,mercadoPagoActive:g}),B.success("Configurações de pagamento salvas!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento',C.classList.remove("saved")},2e3)}catch{B.error("Erro ao salvar pagamento."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'}}),document.getElementById("btn-add-cupom")?.addEventListener("click",async()=>{const C=(document.getElementById("new-cupom-code").value||"").trim().toUpperCase(),T=parseFloat(document.getElementById("new-cupom-valor").value||"0"),k=document.getElementById("new-cupom-tipo").value||"percent",f=parseFloat(document.getElementById("new-cupom-min").value||"0")||0;if(!C||!T){B.error("Preencha código e valor do cupom.");return}const y=[...d(l)?.cupons||[],{codigo:C,desconto:T,tipo:k,valorMinimo:f,ativo:!0}];await D({cupons:y}),B.success(`Cupom ${C} adicionado!`),v()}),window.catDeleteCupom=async C=>{const k=[...d(l)?.cupons||[]].filter((f,g)=>g!==C);await D({cupons:k}),B.success("Cupom removido."),v()},document.getElementById("btn-add-bairro")?.addEventListener("click",async()=>{const C=(document.getElementById("new-bairro-nomes").value||"").trim(),T=document.getElementById("new-bairro-preco").value,k=parseFloat(T||"0");if(!C){B.error("Preencha os bairros.");return}if(!T){B.error("Preencha o valor da taxa para estes bairros.");return}const g=[...d(l)?.bairrosEntrega||[],{bairros:C,preco:k}];await D({bairrosEntrega:g}),B.success("Bairro(s) adicionado(s)!"),v()}),window.catDeleteBairro=async C=>{const k=[...d(l)?.bairrosEntrega||[]].filter((f,g)=>g!==C);await D({bairrosEntrega:k}),B.success("Bairro(s) removido(s)."),v()};const $=(C,T,k,f)=>{document.querySelectorAll(`.${C}`).forEach(g=>{g.addEventListener("change",()=>{const y=g.dataset.dia,w=g.checked;document.getElementById(`${T}-row-${y}`)?.classList.toggle("inactive",!w),document.getElementById(`${T}-inputs-${y}`)?.classList.toggle("hidden",!w);const h=document.getElementById(`${T}-status-${y}`);h&&(h.innerText=w?k:f,h.style.color=w?"var(--success)":"var(--text-dim)")})})};$("func-toggle","func","Aberto","Fechado"),$("entrega-toggle","entrega","Disponível","Indisponível")}async function D(L){const _=d(l);if(_)await F.update("loja_config",_.id,L),Object.assign(_,L);else{const A=await F.create("loja_config",{empresaId:e,lojaId:l,...L});o.push({id:A,empresaId:e,lojaId:l,...L})}}},Lx=()=>`
    <style>
        :root {
            --lp-bg: #030712;
            --lp-primary: #6366f1;
            --lp-secondary: #a855f7;
            --lp-text: #f9fafb;
            --lp-text-dim: #9ca3af;
            --lp-glass: rgba(255, 255, 255, 0.03);
            --lp-border: rgba(255, 255, 255, 0.08);
        }

        .lp-container {
            background-color: var(--lp-bg);
            color: var(--lp-text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            line-height: 1.6;
        }

        /* ── Glowing Background ── */
        .lp-glow {
            position: fixed;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
            filter: blur(100px);
            z-index: 0;
            pointer-events: none;
        }
        .lp-glow-1 { top: -300px; right: -300px; }
        .lp-glow-2 { bottom: -300px; left: -300px; }

        /* ── Navbar ── */
        .lp-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 10%;
            position: sticky;
            top: 0;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(16px);
            z-index: 100;
            border-bottom: 1px solid var(--lp-border);
        }
        .lp-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .lp-logo img {
            height: 32px;
            width: auto;
        }
        .lp-logo span {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
        }
        .lp-nav-link {
            text-decoration: none;
            color: var(--lp-text-dim);
            font-size: 0.95rem;
            font-weight: 500;
            transition: color 0.3s;
        }
        .lp-nav-link:hover { color: var(--lp-text); }
        .lp-btn-login {
            background: var(--lp-primary);
            color: white;
            padding: 0.7rem 1.8rem;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        .lp-btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* ── Hero Section ── */
        .lp-hero {
            padding: 120px 10% 80px;
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .lp-badge {
            display: inline-block;
            padding: 8px 18px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 99px;
            font-size: 0.85rem;
            color: #818cf8;
            margin-bottom: 2.5rem;
            backdrop-filter: blur(4px);
            letter-spacing: 0.5px;
            font-weight: 600;
        }
        .lp-hero h1 {
            font-size: 4.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 2rem;
            letter-spacing: -2px;
        }
        .lp-hero h1 span {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-hero p {
            font-size: 1.35rem;
            color: var(--lp-text-dim);
            line-height: 1.7;
            margin-bottom: 3.5rem;
            max-width: 750px;
            margin-left: auto;
            margin-right: auto;
        }
        .lp-hero-btns {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
        }
        .lp-btn-primary {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: white;
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        }
        .lp-btn-primary:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3); }
        .lp-btn-secondary {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: var(--lp-text);
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            backdrop-filter: blur(4px);
        }
        .lp-btn-secondary:hover { background: rgba(255,255,255,0.06); transform: translateY(-3px); }

        /* ── Feature Sections ── */
        .lp-section { padding: 120px 10%; position: relative; z-index: 1; }
        .lp-section.alt { background: rgba(255,255,255,0.015); }
        
        .lp-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-grid-2.reverse { direction: rtl; }
        .lp-grid-2.reverse > * { direction: ltr; }

        .lp-feat-content h2 { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; line-height: 1.2; }
        .lp-feat-content p { font-size: 1.15rem; color: var(--lp-text-dim); margin-bottom: 2rem; line-height: 1.8; }
        
        .lp-feat-list { list-style: none; padding: 0; margin-bottom: 2.5rem; }
        .lp-feat-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 1.2rem; font-size: 1.05rem; color: var(--lp-text); }
        .lp-feat-item i { color: var(--lp-primary); margin-top: 5px; font-size: 0.9rem; }

        .lp-feat-image {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 32px;
            padding: 2.5rem;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
        }
        .lp-feat-image img { width: 100%; height: auto; border-radius: 16px; display: block; }

        /* ── Modules (Cards) ── */
        .lp-section-header { text-align: center; margin-bottom: 6rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .lp-section-header h2 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; }
        .lp-section-header p { color: var(--lp-text-dim); font-size: 1.25rem; }

        .lp-grid-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-card {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 3rem;
            border-radius: 32px;
            transition: all 0.4s;
            backdrop-filter: blur(8px);
        }
        .lp-card:hover { transform: translateY(-12px); border-color: var(--lp-primary); background: rgba(99, 102, 241, 0.05); }
        .lp-card-icon {
            width: 70px;
            height: 70px;
            background: rgba(99, 102, 241, 0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            color: var(--lp-primary);
            font-size: 1.8rem;
        }
        .lp-card h3 { font-size: 1.75rem; font-weight: 700; margin-bottom: 1.2rem; }
        .lp-card p { color: var(--lp-text-dim); line-height: 1.8; margin-bottom: 2rem; font-size: 1.05rem; }
        .lp-card-link { color: var(--lp-primary); text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 1.1rem; }

        /* ── FAQ ── */
        .lp-faq { padding: 120px 10%; max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .lp-faq-item {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 20px;
            margin-bottom: 1.2rem;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s;
        }
        .lp-faq-item:hover { border-color: rgba(99,102,241,0.3); background: rgba(255,255,255,0.05); }
        .lp-faq-question { padding: 1.8rem; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.15rem; }
        .lp-faq-answer { padding: 0 1.8rem 1.8rem; color: var(--lp-text-dim); line-height: 1.8; display: none; font-size: 1.05rem; }
        .lp-faq-item.active .lp-faq-answer { display: block; }
        .lp-faq-item.active .lp-faq-question i { transform: rotate(180deg); color: var(--lp-primary); }

        /* ── Footer ── */
        .lp-footer {
            padding: 120px 10% 60px;
            border-top: 1px solid var(--lp-border);
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 6rem;
            position: relative;
            z-index: 1;
        }
        .lp-footer-col h4 { font-weight: 800; margin-bottom: 2rem; font-size: 1.2rem; }
        .lp-footer-col ul { list-style: none; padding: 0; }
        .lp-footer-col li { margin-bottom: 1rem; }
        .lp-footer-col a { color: var(--lp-text-dim); text-decoration: none; transition: color 0.3s; font-size: 1rem; }
        .lp-footer-col a:hover { color: white; }

        /* ── Floating WhatsApp ── */
        .lp-wa-float {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 65px;
            height: 65px;
            background: #25d366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s;
            text-decoration: none;
            animation: pulse-wa 2s infinite;
        }
        .lp-wa-float:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 40px rgba(37, 211, 102, 0.5); }
        
        @keyframes pulse-wa {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media(max-width: 992px) {
            .lp-grid-2 { grid-template-columns: 1fr; gap: 60px; text-align: center; }
            .lp-feat-item { justify-content: center; }
            .lp-hero h1 { font-size: 3.5rem; }
            .lp-section-header h2 { font-size: 2.8rem; }
            .lp-footer { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
        @media(max-width: 768px) {
            .lp-hero h1 { font-size: 2.8rem; }
            .lp-navbar { padding: 1rem 5%; }
            .lp-nav-links { display: none; }
            .lp-footer { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
            .lp-logo { margin: 0 auto; }
            .lp-hero { padding-top: 80px; }
            .lp-wa-float { bottom: 25px; right: 25px; width: 55px; height: 55px; font-size: 28px; }
        }
    </style>

    <div class="lp-container">
        <div class="lp-glow lp-glow-1"></div>
        <div class="lp-glow lp-glow-2"></div>

        <nav class="lp-navbar">
            <div class="lp-logo">
                <img src="/logo.png" alt="AutoQui Logo">
                <span>AutoQui</span>
            </div>
            <div class="lp-nav-links">
                <a href="#features" class="lp-nav-link">Planos</a>
                <a href="#solucoes" class="lp-nav-link">Soluções</a>
                <a href="#faq" class="lp-nav-link">Suporte</a>
                <a href="/login" class="lp-btn-login">Entrar no Painel</a>
            </div>
        </nav>

        <section class="lp-hero">
            <div class="lp-badge">Tecnologia de Ponta para o seu Negócio</div>
            <h1>Aumente suas vendas com <span>Automação Inteligente</span></h1>
            <p>O AutoQui é a plataforma definitiva para quem deseja automatizar processos, gerenciar pedidos via catálogo e manter um relacionamento premium com clientes via WhatsApp.</p>
            <div class="lp-hero-btns">
                <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary">Falar com Consultor</a>
                <a href="#solucoes" class="lp-btn-secondary">Conhecer Módulos</a>
            </div>
        </section>

        <!-- Seção de Explicação 1: Automação -->
        <section id="solucoes" class="lp-section alt">
            <div class="lp-grid-2">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">Inteligência Artificial</div>
                    <h2>Atendimento Humano em Escala de Robô</h2>
                    <p>Nossa IA não apenas responde, ela entende o contexto. Transforme seu WhatsApp em uma máquina de vendas que nunca dorme.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Qualificação automática de leads</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Agendamentos sincronizados em tempo real</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Transição suave para atendente humano</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary" style="padding: 0.9rem 2rem; font-size: 1rem;">Quero Automatizar</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-photo/robot-operating-laptop-futuristic-office-generative-ai_124507-65715.jpg" alt="IA Atendimento">
                </div>
            </div>
        </section>

        <!-- Seção de Explicação 2: Catálogo -->
        <section class="lp-section">
            <div class="lp-grid-2 reverse">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">E-commerce de Próxima Geração</div>
                    <h2>Um Catálogo que é mais que uma Loja</h2>
                    <p>Ofereça aos seus clientes uma experiência de compra fluida, rápida e integrada. Nada de aplicativos pesados, tudo direto no navegador.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Checkout em menos de 30 segundos</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Integração nativa com Mercado Pago (PIX)</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Controle de estoque e gatilhos de escassez</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-secondary" style="padding: 0.9rem 2rem; font-size: 1rem;">Ver Demonstração</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-psd/food-delivery-online-app-landing-page-template_444901-155.jpg" alt="Catálogo Digital">
                </div>
            </div>
        </section>

        <section id="features" class="lp-section alt">
            <div class="lp-section-header">
                <h2>Módulos Especializados</h2>
                <p>O AutoQui se adapta ao seu modelo de negócio, seja ele vendas diretas, serviços ou envios em massa.</p>
            </div>
            
            <div class="lp-grid-cards">
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-shop"></i></div>
                    <h3>Vendas Catálogo</h3>
                    <p>A vitrine definitiva para o seu delivery ou loja online. Sincronização total com WhatsApp e gestão de pedidos centralizada.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Solicitar Teste <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-calendar-check"></i></div>
                    <h3>Gestão de Serviços</h3>
                    <p>Para clínicas, barbearias ou consultorias. Agendamento inteligente que reduz faltas em até 70% com lembretes automáticos.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Saber mais <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-bullhorn"></i></div>
                    <h3>Campanhas Pro</h3>
                    <p>Envio em massa com inteligência de anti-banimento. Fale com toda a sua base de leads com apenas um clique.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Explorar <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </section>

        <section id="faq" class="lp-faq">
            <div class="lp-section-header">
                <h2>Perguntas Frequentes</h2>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Como funciona a implementação do AutoQui? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">É instantâneo! Após criar sua conta, você vincula seu WhatsApp por QR Code e já pode configurar seus produtos e fluxos de atendimento em poucos minutos.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Os dados dos meus clientes estão seguros? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Com certeza. Utilizamos criptografia de ponta e servidores seguros para garantir que todas as transações e dados de leads sejam privados da sua empresa.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Posso usar o meu número atual do WhatsApp? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Sim! Você não precisa de um número novo. A integração é feita diretamente com o seu número de atendimento atual (Business ou Pessoal).</div>
            </div>
        </section>

        <footer class="lp-footer">
            <div class="lp-footer-col">
                <div class="lp-logo" style="margin-bottom: 2rem;">
                    <img src="/logo.png" alt="AutoQui Logo">
                    <span>AutoQui</span>
                </div>
                <p style="color: var(--lp-text-dim); line-height: 1.8;">A solução número #1 para empresas que buscam excelência no atendimento digital.</p>
            </div>
            <div class="lp-footer-col">
                <h4>Produto</h4>
                <ul>
                    <li><a href="#solucoes">Recursos</a></li>
                    <li><a href="#solucoes">Soluções</a></li>
                    <li><a href="#faq">Novidades</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Atendimento</h4>
                <ul>
                    <li><a href="https://wa.me/5564996168691">Falar com Consultor</a></li>
                    <li><a href="https://wa.me/5564996168691">Suporte Técnico</a></li>
                    <li><a href="https://wa.me/5564996168691">Comercial</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacidade</a></li>
                    <li><a href="#">Termos de Uso</a></li>
                </ul>
            </div>
        </footer>

        <!-- Floating WhatsApp Button -->
        <a href="https://wa.me/5564996168691" target="_blank" class="lp-wa-float">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    </div>

    <script>
        // FAQ Toggle
        document.querySelectorAll('.lp-faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.lp-faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });

        // Smooth scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    <\/script>
    `,Dx=async()=>{const n=Ae.getCurrentUser(),e=n?.role?.toLowerCase()==="admin"||n?.email==="ginannymoreira@gmail.com";if(!n||!e)return"<p>Acesso negado.</p>";const s=(await F.getAll("companies")).flatMap(o=>(o.stores||[]).map(l=>({...l,companyName:o.name,companyId:o.id}))),r=()=>s.map(o=>`<option value="${o.id}" data-company-id="${o.companyId}">${o.name} (${o.companyName})</option>`).join("");return window.performMigration=async()=>{const o=document.getElementById("migration-source-store"),l=document.getElementById("migration-target-store"),d=o.value,u=o.selectedOptions[0]?.dataset.companyId,m=l.value,b=l.selectedOptions[0]?.dataset.companyId;if(!d||!m){B.warning("Selecione as lojas de origem e destino.");return}if(d===m){B.warning("A loja de origem e destino não podem ser a mesma.");return}if(!await Ye.warning("Confirmar Migração","Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?"))return;const R=document.getElementById("btn-run-migration");R.disabled=!0,R.innerHTML='<div class="spinner-small"></div> Migrando...';try{const L=(await F.getAll("products",{field:"companyId",operator:"==",value:u})).filter(A=>A.storeIds&&A.storeIds.includes(d)||A.storeId===d);if(L.length===0){B.info("Nenhum produto encontrado na loja de origem."),R.disabled=!1,R.innerText="Iniciar Migração";return}let _=0;for(const A of L){const{id:S,...$}=A;$.companyId=b,$.storeIds=[m],delete $.lojaId,delete $.createdAt,await F.create("products",$),_++}B.success(`${_} produtos migrados com sucesso!`)}catch(D){console.error(D),B.error("Erro durante a migração: "+D)}finally{R.disabled=!1,R.innerText="Iniciar Migração"}},`
        <div class="page-header">
            <h2 class="page-title">Migração Administrativa de Produtos</h2>
        </div>

        <div class="card glass">
            <div class="card-header">
                <h3><i class="fa-solid fa-clone"></i> Duplicar Catálogo</h3>
                <p class="text-muted">Use esta ferramenta para copiar todos os produtos de uma unidade para outra.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div class="form-group">
                    <label>Loja de ORIGEM (De onde virão os produtos)</label>
                    <select id="migration-source-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione a origem...</option>
                        ${r()}
                    </select>
                </div>

                <div class="form-group">
                    <label>Loja de DESTINO (Para onde serão copiados)</label>
                    <select id="migration-target-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione o destino...</option>
                        ${r()}
                    </select>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; border-radius: 12px; background: rgba(234, 179, 8, 0.05); border: 1px solid rgba(234, 179, 8, 0.2);">
                <p style="color: #eab308; font-size: 0.9rem; margin-bottom: 0;">
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>Atenção:</strong> Os produtos serão duplicados. Se você já migrou anteriormente, eles aparecerão repetidos no destino.
                </p>
            </div>

            <div style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button id="btn-run-migration" class="btn-primary" onclick="window.performMigration()" style="padding: 12px 30px;">
                    <i class="fa-solid fa-play"></i> Iniciar Migração
                </button>
            </div>
        </div>
    `};class $x{appElement;constructor(){this.appElement=document.getElementById("app"),this.init()}init(){let e=null;Ae.subscribe(t=>{this.render(),t?t.uid!==e&&(e=t.uid,Jd.startListening()):(e=null,Jd.stopListening())}),this.handleRouting(),window.addEventListener("render-app",()=>this.render())}handleRouting(){window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",e=>{const i=e.target.closest("a");if(i&&i.getAttribute("href")?.startsWith("/")){e.preventDefault();const s=i.getAttribute("href");window.location.pathname!==s&&(history.pushState(null,"",s),this.render())}}),document.addEventListener("submit",async e=>{if(e.target.id==="login-form"){e.preventDefault();const i=document.getElementById("email").value,s=document.getElementById("password").value;try{await Ae.login(i,s)}catch(r){B.error("Erro ao fazer login: "+r)}}}),document.addEventListener("click",async e=>{e.target.closest("#logout-btn")&&(history.replaceState(null,"","/"),await Ae.logout())})}async render(){const e=window.location.pathname,t=Ae.getCurrentUser();if(e==="/"){this.appElement.innerHTML=Lx();const l=this.appElement.querySelector(".lp-btn-login")||this.appElement.querySelector(".lp-btn-primary");t&&l&&(l.textContent="Dashboard",l.setAttribute("href",t.role==="admin"?"/admin/dashboard":"/dashboard"));return}if(!t){if(e.startsWith("/catalog/")){const l=e.split("/").pop()||"";this.appElement.innerHTML=await eu(l);return}if(e.startsWith("/qr/")){const l=e.split("/").pop()||"";this.appElement.innerHTML=await tu(l);return}e!=="/login"&&history.replaceState(null,"","/login"),this.appElement.innerHTML=`<div id="page-content" class="login-page-container">${hx()}</div>`;return}if(e==="/login"){const l=t.role==="admin"?"/admin/dashboard":"/dashboard";history.replaceState(null,"",l),this.render();return}if(e.startsWith("/catalog/")){const l=e.split("/").pop()||"";this.appElement.innerHTML=await eu(l);return}if(e.startsWith("/qr/")){const l=e.split("/").pop()||"";this.appElement.innerHTML=await tu(l);return}if(!this.isRouteAllowed(e,t.role)){this.appElement.innerHTML="<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>";return}const i=await this.getPageTitle(e);let s;t.role==="admin"?s=hm:t.role==="employee"?s=Z_:s=X_;const r=await this.getPageContent(e),o=await s();this.appElement.innerHTML=`
            <div class="app-container">
                ${o}
                <main class="main-content">
                    ${ex(i)}
                    <div id="page-content" class="page-container">
                        ${r}
                    </div>
                </main>
            </div>
        `,this.updateActiveLinks(),this.updateOrderCounter()}isRouteAllowed(e,t){return t==="admin"?e.startsWith("/admin"):!e.startsWith("/admin")}async getPageTitle(e){if(e==="/products"){const t=Ae.getCurrentUser();if(t?.companyId)try{const{dbService:i}=await za(async()=>{const{dbService:o}=await Promise.resolve().then(()=>Y_);return{dbService:o}},void 0);if(((await i.get("companies",t.companyId))?.modulos_ativos||[]).includes("agendamento"))return"Serviços"}catch{}return"Produtos"}switch(e){case"/":case"/dashboard":case"/admin/dashboard":return"Dashboard";case"/orders":return"Pedidos";case"/stores":return"Lojas";case"/leads":return"Leads";case"/users":case"/admin/users":return"Usuários";case"/admin/ai-config":return"Configuração IA";case"/companies":case"/admin/companies":return"Gestão de Clientes";case"/instances":return"Instâncias";case"/configuration":return"Configurações";case"/campaigns":return"Campanhas";case"/schedule":return"Agenda";case"/admin/webhooks":return"Configuração de Webhooks";case"/admin/migration":return"Migração de Produtos";case"/mercado-pago":return"Mercado Pago";case"/catalog-settings":return"Configuração";default:return"Página não encontrada"}}async getPageContent(e){switch(e){case"/":case"/dashboard":case"/admin/dashboard":return nx();case"/orders":return lx();case"/products":return await cx();case"/stores":return await dx();case"/leads":return await xx();case"/users":return Ae.getCurrentUser()?.role==="admin"?Yd():ux();case"/admin/users":return Yd();case"/admin/ai-config":return px();case"/companies":case"/admin/companies":return await mx();case"/instances":return fx();case"/configuration":return vx();case"/campaigns":return Tx();case"/schedule":return kx();case"/admin/webhooks":return await Ax();case"/admin/migration":return await Dx();case"/mercado-pago":return await Sx();case"/catalog-settings":return await Rx();default:return"<h1>404</h1><p>Página não encontrada.</p>"}}updateActiveLinks(){const e=window.location.pathname;document.querySelectorAll(".nav-item").forEach(i=>{i.getAttribute("href")===e?i.classList.add("active"):i.classList.remove("active")})}async updateOrderCounter(){const e=Ae.getCurrentUser();if(!(!e||!e.companyId||e.role==="admin"))try{const t=e.storeIds||(e.storeId?[e.storeId]:[]),i=await Jn.getOpenOrdersCount(e.companyId,e.role==="owner"?[]:t),s=document.getElementById("orders-count-badge");s&&(s.textContent=i.toString(),i>0?s.classList.remove("hidden"):s.classList.add("hidden"))}catch(t){console.error("Error updating order counter:",t)}}}new $x;
