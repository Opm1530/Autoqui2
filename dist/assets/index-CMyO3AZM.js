(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const um="modulepreload",pm=function(n){return"/"+n},dc={},Hr=function(e,t,i){let a=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(_=>Promise.resolve(_).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};var o=u;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");a=u(t.map(h=>{if(h=pm(h),h in dc)return;dc[h]=!0;const _=h.endsWith(".css"),b=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${b}`))return;const R=document.createElement("link");if(R.rel=_?"stylesheet":um,_||(R.as="script"),R.crossOrigin="",R.href=h,c&&R.setAttribute("nonce",c),document.head.appendChild(R),_)return new Promise((M,D)=>{R.addEventListener("load",M),R.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return a.then(l=>{for(const c of l||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},hm=()=>`
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
    `,mm=()=>{};var uc={};const su=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let a=n.charCodeAt(i);a<128?e[t++]=a:a<2048?(e[t++]=a>>6|192,e[t++]=a&63|128):(a&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(a=65536+((a&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=a>>18|240,e[t++]=a>>12&63|128,e[t++]=a>>6&63|128,e[t++]=a&63|128):(e[t++]=a>>12|224,e[t++]=a>>6&63|128,e[t++]=a&63|128)}return e},fm=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const a=n[t++];if(a<128)e[i++]=String.fromCharCode(a);else if(a>191&&a<224){const s=n[t++];e[i++]=String.fromCharCode((a&31)<<6|s&63)}else if(a>239&&a<365){const s=n[t++],o=n[t++],l=n[t++],c=((a&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[i++]=String.fromCharCode((a&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ru={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let a=0;a<n.length;a+=3){const s=n[a],o=a+1<n.length,l=o?n[a+1]:0,c=a+2<n.length,u=c?n[a+2]:0,h=s>>2,_=(s&3)<<4|l>>4;let b=(l&15)<<2|u>>6,R=u&63;c||(R=64,o||(b=64)),i.push(t[h],t[_],t[b],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(su(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let a=0;a<n.length;){const s=t[n.charAt(a++)],l=a<n.length?t[n.charAt(a)]:0;++a;const u=a<n.length?t[n.charAt(a)]:64;++a;const _=a<n.length?t[n.charAt(a)]:64;if(++a,s==null||l==null||u==null||_==null)throw new gm;const b=s<<2|l>>4;if(i.push(b),u!==64){const R=l<<4&240|u>>2;if(i.push(R),_!==64){const M=u<<6&192|_;i.push(M)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class gm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ym=function(n){const e=su(n);return ru.encodeByteArray(e,!0)},_s=function(n){return ym(n).replace(/\./g,"")},ou=function(n){try{return ru.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function vm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const bm=()=>vm().__FIREBASE_DEFAULTS__,wm=()=>{if(typeof process>"u"||typeof uc>"u")return;const n=uc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_m=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ou(n[1]);return e&&JSON.parse(e)},Us=()=>{try{return mm()||bm()||wm()||_m()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},lu=n=>Us()?.emulatorHosts?.[n],cu=n=>{const e=lu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},du=()=>Us()?.config,uu=n=>Us()?.[`_${n}`];class xm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}function Hn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bo(n){return(await fetch(n,{credentials:"include"})).ok}function pu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",a=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:a,exp:a+3600,auth_time:a,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[_s(JSON.stringify(t)),_s(JSON.stringify(o)),""].join(".")}const ya={};function Em(){const n={prod:[],emulator:[]};for(const e of Object.keys(ya))ya[e]?n.emulator.push(e):n.prod.push(e);return n}function Im(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let pc=!1;function wo(n,e){if(typeof window>"u"||typeof document>"u"||!Hn(window.location.host)||ya[n]===e||ya[n]||pc)return;ya[n]=e;function t(b){return`__firebase__banner__${b}`}const i="__firebase__banner",s=Em().prod.length>0;function o(){const b=document.getElementById(i);b&&b.remove()}function l(b){b.style.display="flex",b.style.background="#7faaf0",b.style.position="fixed",b.style.bottom="5px",b.style.left="5px",b.style.padding=".5em",b.style.borderRadius="5px",b.style.alignItems="center"}function c(b,R){b.setAttribute("width","24"),b.setAttribute("id",R),b.setAttribute("height","24"),b.setAttribute("viewBox","0 0 24 24"),b.setAttribute("fill","none"),b.style.marginLeft="-6px"}function u(){const b=document.createElement("span");return b.style.cursor="pointer",b.style.marginLeft="16px",b.style.fontSize="24px",b.innerHTML=" &times;",b.onclick=()=>{pc=!0,o()},b}function h(b,R){b.setAttribute("id",R),b.innerText="Learn more",b.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",b.setAttribute("target","__blank"),b.style.paddingLeft="5px",b.style.textDecoration="underline"}function _(){const b=Im(i),R=t("text"),M=document.getElementById(R)||document.createElement("span"),D=t("learnmore"),v=document.getElementById(D)||document.createElement("a"),k=t("preprendIcon"),S=document.getElementById(k)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(b.created){const $=b.element;l($),h(v,D);const C=u();c(S,k),$.append(S,M,v,C),document.body.appendChild($)}s?(M.innerText="Preview backend disconnected.",S.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,M.innerText="Preview backend running in this workspace."),M.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}function wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(wt())}function km(){const n=Us()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Am(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pm(){const n=wt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Rm(){return!km()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lm(){try{return typeof indexedDB=="object"}catch{return!1}}function Dm(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(i);a.onsuccess=()=>{a.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},a.onupgradeneeded=()=>{t=!1},a.onerror=()=>{e(a.error?.message||"")}}catch(t){e(t)}})}const $m="FirebaseError";class rn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=$m,Object.setPrototypeOf(this,rn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Na.prototype.create)}}class Na{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},a=`${this.service}/${e}`,s=this.errors[e],o=s?Nm(s,i):"Error",l=`${this.serviceName}: ${o} (${a}).`;return new rn(a,l,i)}}function Nm(n,e){return n.replace(Mm,(t,i)=>{const a=e[i];return a!=null?String(a):`<${i}?>`})}const Mm=/\{\$([^}]+)}/g;function Om(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function li(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const a of t){if(!i.includes(a))return!1;const s=n[a],o=e[a];if(hc(s)&&hc(o)){if(!li(s,o))return!1}else if(s!==o)return!1}for(const a of i)if(!t.includes(a))return!1;return!0}function hc(n){return n!==null&&typeof n=="object"}function Ma(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(a=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function da(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[a,s]=i.split("=");e[decodeURIComponent(a)]=decodeURIComponent(s)}}),e}function ua(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Vm(n,e){const t=new Bm(n,e);return t.subscribe.bind(t)}class Bm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let a;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Fm(e,["next","error","complete"])?a=e:a={next:e,error:t,complete:i},a.next===void 0&&(a.next=Ar),a.error===void 0&&(a.error=Ar),a.complete===void 0&&(a.complete=Ar);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ar(){}function Be(n){return n&&n._delegate?n._delegate:n}class Vn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const ti="[DEFAULT]";class zm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new xm;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:t});a&&i.resolve(a)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(a){if(i)return null;throw a}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jm(e))try{this.getOrInitializeService({instanceIdentifier:ti})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:a});i.resolve(s)}catch{}}}}clearInstance(e=ti){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ti){return this.instances.has(e)}getOptions(e=ti){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);i===l&&o.resolve(a)}return a}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),a=this.onInitCallbacks.get(i)??new Set;a.add(e),this.onInitCallbacks.set(i,a);const s=this.instances.get(i);return s&&e(s,i),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const a of i)try{a(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Um(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ti){return this.component?this.component.multipleInstances?e:ti:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Um(n){return n===ti?void 0:n}function jm(n){return n.instantiationMode==="EAGER"}class qm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new zm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const Hm={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},Wm=we.INFO,Gm={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},Km=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),a=Gm[e];if(a)console[a](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _o{constructor(e){this.name=e,this._logLevel=Wm,this._logHandler=Km,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const Qm=(n,e)=>e.some(t=>n instanceof t);let mc,fc;function Ym(){return mc||(mc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jm(){return fc||(fc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hu=new WeakMap,Wr=new WeakMap,mu=new WeakMap,Sr=new WeakMap,xo=new WeakMap;function Xm(n){const e=new Promise((t,i)=>{const a=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Ln(n.result)),a()},o=()=>{i(n.error),a()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&hu.set(t,n)}).catch(()=>{}),xo.set(e,n),e}function Zm(n){if(Wr.has(n))return;const e=new Promise((t,i)=>{const a=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),a()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),a()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Wr.set(n,e)}let Gr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||mu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ln(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ef(n){Gr=n(Gr)}function tf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Cr(this),e,...t);return mu.set(i,e.sort?e.sort():[e]),Ln(i)}:Jm().includes(n)?function(...e){return n.apply(Cr(this),e),Ln(hu.get(this))}:function(...e){return Ln(n.apply(Cr(this),e))}}function nf(n){return typeof n=="function"?tf(n):(n instanceof IDBTransaction&&Zm(n),Qm(n,Ym())?new Proxy(n,Gr):n)}function Ln(n){if(n instanceof IDBRequest)return Xm(n);if(Sr.has(n))return Sr.get(n);const e=nf(n);return e!==n&&(Sr.set(n,e),xo.set(e,n)),e}const Cr=n=>xo.get(n);function af(n,e,{blocked:t,upgrade:i,blocking:a,terminated:s}={}){const o=indexedDB.open(n,e),l=Ln(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Ln(o.result),c.oldVersion,c.newVersion,Ln(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),a&&c.addEventListener("versionchange",u=>a(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const sf=["get","getKey","getAll","getAllKeys","count"],rf=["put","add","delete","clear"],Pr=new Map;function gc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Pr.get(e))return Pr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,a=rf.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(a||sf.includes(t)))return;const s=async function(o,...l){const c=this.transaction(o,a?"readwrite":"readonly");let u=c.store;return i&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),a&&c.done]))[0]};return Pr.set(e,s),s}ef(n=>({...n,get:(e,t,i)=>gc(e,t)||n.get(e,t,i),has:(e,t)=>!!gc(e,t)||n.has(e,t)}));class of{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(lf(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function lf(n){return n.getComponent()?.type==="VERSION"}const Kr="@firebase/app",yc="0.14.8";const hn=new _o("@firebase/app"),cf="@firebase/app-compat",df="@firebase/analytics-compat",uf="@firebase/analytics",pf="@firebase/app-check-compat",hf="@firebase/app-check",mf="@firebase/auth",ff="@firebase/auth-compat",gf="@firebase/database",yf="@firebase/data-connect",vf="@firebase/database-compat",bf="@firebase/functions",wf="@firebase/functions-compat",_f="@firebase/installations",xf="@firebase/installations-compat",Ef="@firebase/messaging",If="@firebase/messaging-compat",Tf="@firebase/performance",kf="@firebase/performance-compat",Af="@firebase/remote-config",Sf="@firebase/remote-config-compat",Cf="@firebase/storage",Pf="@firebase/storage-compat",Rf="@firebase/firestore",Lf="@firebase/ai",Df="@firebase/firestore-compat",$f="firebase",Nf="12.9.0";const Qr="[DEFAULT]",Mf={[Kr]:"fire-core",[cf]:"fire-core-compat",[uf]:"fire-analytics",[df]:"fire-analytics-compat",[hf]:"fire-app-check",[pf]:"fire-app-check-compat",[mf]:"fire-auth",[ff]:"fire-auth-compat",[gf]:"fire-rtdb",[yf]:"fire-data-connect",[vf]:"fire-rtdb-compat",[bf]:"fire-fn",[wf]:"fire-fn-compat",[_f]:"fire-iid",[xf]:"fire-iid-compat",[Ef]:"fire-fcm",[If]:"fire-fcm-compat",[Tf]:"fire-perf",[kf]:"fire-perf-compat",[Af]:"fire-rc",[Sf]:"fire-rc-compat",[Cf]:"fire-gcs",[Pf]:"fire-gcs-compat",[Rf]:"fire-fst",[Df]:"fire-fst-compat",[Lf]:"fire-vertex","fire-js":"fire-js",[$f]:"fire-js-all"};const xs=new Map,Of=new Map,Yr=new Map;function vc(n,e){try{n.container.addComponent(e)}catch(t){hn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ci(n){const e=n.name;if(Yr.has(e))return hn.debug(`There were multiple attempts to register component ${e}.`),!1;Yr.set(e,n);for(const t of xs.values())vc(t,n);for(const t of Of.values())vc(t,n);return!0}function js(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Lt(n){return n==null?!1:n.settings!==void 0}const Vf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dn=new Na("app","Firebase",Vf);class Bf{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dn.create("app-deleted",{appName:this._name})}}const vi=Nf;function Eo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Qr,automaticDataCollectionEnabled:!0,...e},a=i.name;if(typeof a!="string"||!a)throw Dn.create("bad-app-name",{appName:String(a)});if(t||(t=du()),!t)throw Dn.create("no-options");const s=xs.get(a);if(s){if(li(t,s.options)&&li(i,s.config))return s;throw Dn.create("duplicate-app",{appName:a})}const o=new qm(a);for(const c of Yr.values())o.addComponent(c);const l=new Bf(t,i,o);return xs.set(a,l),l}function Io(n=Qr){const e=xs.get(n);if(!e&&n===Qr&&du())return Eo();if(!e)throw Dn.create("no-app",{appName:n});return e}function Xt(n,e,t){let i=Mf[n]??n;t&&(i+=`-${t}`);const a=i.match(/\s|\//),s=e.match(/\s|\//);if(a||s){const o=[`Unable to register library "${i}" with version "${e}":`];a&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),hn.warn(o.join(" "));return}ci(new Vn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}const Ff="firebase-heartbeat-database",zf=1,Ia="firebase-heartbeat-store";let Rr=null;function fu(){return Rr||(Rr=af(Ff,zf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ia)}catch(t){console.warn(t)}}}}).catch(n=>{throw Dn.create("idb-open",{originalErrorMessage:n.message})})),Rr}async function Uf(n){try{const t=(await fu()).transaction(Ia),i=await t.objectStore(Ia).get(gu(n));return await t.done,i}catch(e){if(e instanceof rn)hn.warn(e.message);else{const t=Dn.create("idb-get",{originalErrorMessage:e?.message});hn.warn(t.message)}}}async function bc(n,e){try{const i=(await fu()).transaction(Ia,"readwrite");await i.objectStore(Ia).put(e,gu(n)),await i.done}catch(t){if(t instanceof rn)hn.warn(t.message);else{const i=Dn.create("idb-set",{originalErrorMessage:t?.message});hn.warn(i.message)}}}function gu(n){return`${n.name}!${n.options.appId}`}const jf=1024,qf=30;class Hf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>qf){const a=Kf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){hn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=wc(),{heartbeatsToSend:t,unsentEntries:i}=Wf(this._heartbeatsCache.heartbeats),a=_s(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(e){return hn.warn(e),""}}}function wc(){return new Date().toISOString().substring(0,10)}function Wf(n,e=jf){const t=[];let i=n.slice();for(const a of n){const s=t.find(o=>o.agent===a.agent);if(s){if(s.dates.push(a.date),_c(t)>e){s.dates.pop();break}}else if(t.push({agent:a.agent,dates:[a.date]}),_c(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Gf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Lm()?Dm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Uf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function _c(n){return _s(JSON.stringify({version:2,heartbeats:n})).length}function Kf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}function Qf(n){ci(new Vn("platform-logger",e=>new of(e),"PRIVATE")),ci(new Vn("heartbeat",e=>new Hf(e),"PRIVATE")),Xt(Kr,yc,n),Xt(Kr,yc,"esm2020"),Xt("fire-js","")}Qf("");function yu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Yf=yu,vu=new Na("auth","Firebase",yu());const Es=new _o("@firebase/auth");function Jf(n,...e){Es.logLevel<=we.WARN&&Es.warn(`Auth (${vi}): ${n}`,...e)}function us(n,...e){Es.logLevel<=we.ERROR&&Es.error(`Auth (${vi}): ${n}`,...e)}function qt(n,...e){throw To(n,...e)}function Zt(n,...e){return To(n,...e)}function bu(n,e,t){const i={...Yf(),[e]:t};return new Na("auth","Firebase",i).create(e,{appName:n.name})}function cn(n){return bu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function To(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return vu.create(n,...e)}function re(n,e,...t){if(!n)throw To(e,...t)}function on(n){const e="INTERNAL ASSERTION FAILED: "+n;throw us(e),new Error(e)}function mn(n,e){n||on(e)}function Jr(){return typeof self<"u"&&self.location?.href||""}function Xf(){return xc()==="http:"||xc()==="https:"}function xc(){return typeof self<"u"&&self.location?.protocol||null}function Zf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xf()||Sm()||"connection"in navigator)?navigator.onLine:!0}function eg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}class Oa{constructor(e,t){this.shortDelay=e,this.longDelay=t,mn(t>e,"Short delay should be less than long delay!"),this.isMobile=Tm()||Cm()}get(){return Zf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}function ko(n,e){mn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}class wu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;on("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;on("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;on("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const tg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};const ng=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ig=new Oa(3e4,6e4);function Wn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Gn(n,e,t,i,a={}){return _u(n,a,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});const l=Ma({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...s};return Am()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Hn(n.emulatorConfig.host)&&(u.credentials="include"),wu.fetch()(await xu(n,n.config.apiHost,t,l),u)})}async function _u(n,e,t){n._canInitEmulator=!1;const i={...tg,...e};try{const a=new sg(n),s=await Promise.race([t(),a.promise]);a.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ns(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ns(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ns(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ns(n,"user-disabled",o);const h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw bu(n,h,u);qt(n,h)}}catch(a){if(a instanceof rn)throw a;qt(n,"network-request-failed",{message:String(a)})}}async function Va(n,e,t,i,a={}){const s=await Gn(n,e,t,i,a);return"mfaPendingCredential"in s&&qt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function xu(n,e,t,i){const a=`${e}${t}?${i}`,s=n,o=s.config.emulator?ko(n.config,a):`${n.config.apiScheme}://${a}`;return ng.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function ag(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class sg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Zt(this.auth,"network-request-failed")),ig.get())})}}function ns(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const a=Zt(n,e,i);return a.customData._tokenResponse=t,a}function Ec(n){return n!==void 0&&n.enterprise!==void 0}class rg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ag(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function og(n,e){return Gn(n,"GET","/v2/recaptchaConfig",Wn(n,e))}async function lg(n,e){return Gn(n,"POST","/v1/accounts:delete",e)}async function Is(n,e){return Gn(n,"POST","/v1/accounts:lookup",e)}function va(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cg(n,e=!1){const t=Be(n),i=await t.getIdToken(e),a=Ao(i);re(a&&a.exp&&a.auth_time&&a.iat,t.auth,"internal-error");const s=typeof a.firebase=="object"?a.firebase:void 0,o=s?.sign_in_provider;return{claims:a,token:i,authTime:va(Lr(a.auth_time)),issuedAtTime:va(Lr(a.iat)),expirationTime:va(Lr(a.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Lr(n){return Number(n)*1e3}function Ao(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return us("JWT malformed, contained fewer than 3 sections"),null;try{const a=ou(t);return a?JSON.parse(a):(us("Failed to decode base64 JWT payload"),null)}catch(a){return us("Caught error parsing JWT payload as JSON",a?.toString()),null}}function Ic(n){const e=Ao(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Ta(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof rn&&dg(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function dg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}class ug{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}class Xr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=va(this.lastLoginAt),this.creationTime=va(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function Ts(n){const e=n.auth,t=await n.getIdToken(),i=await Ta(n,Is(e,{idToken:t}));re(i?.users.length,e,"internal-error");const a=i.users[0];n._notifyReloadListener(a);const s=a.providerUserInfo?.length?Eu(a.providerUserInfo):[],o=hg(n.providerData,s),l=n.isAnonymous,c=!(n.email&&a.passwordHash)&&!o?.length,u=l?c:!1,h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:o,metadata:new Xr(a.createdAt,a.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function pg(n){const e=Be(n);await Ts(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hg(n,e){return[...n.filter(i=>!e.some(a=>a.providerId===i.providerId)),...e]}function Eu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function mg(n,e){const t=await _u(n,{},async()=>{const i=Ma({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:s}=n.config,o=await xu(n,a,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:i};return n.emulatorConfig&&Hn(n.emulatorConfig.host)&&(c.credentials="include"),wu.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function fg(n,e){return Gn(n,"POST","/v2/accounts:revokeToken",Wn(n,e))}class Pi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ic(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=Ic(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:a,expiresIn:s}=await mg(e,t);this.updateTokensAndExpiration(i,a,Number(s))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:a,expirationTime:s}=t,o=new Pi;return i&&(re(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),a&&(re(typeof a=="string","internal-error",{appName:e}),o.accessToken=a),s&&(re(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pi,this.toJSON())}_performRefresh(){return on("not implemented")}}function Tn(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ut{constructor({uid:e,auth:t,stsTokenManager:i,...a}){this.providerId="firebase",this.proactiveRefresh=new ug(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Xr(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await Ta(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cg(this,e)}reload(){return pg(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ut({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Ts(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Lt(this.auth.app))return Promise.reject(cn(this.auth));const e=await this.getIdToken();return await Ta(this,lg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,a=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:_,emailVerified:b,isAnonymous:R,providerData:M,stsTokenManager:D}=t;re(_&&D,e,"internal-error");const v=Pi.fromJSON(this.name,D);re(typeof _=="string",e,"internal-error"),Tn(i,e.name),Tn(a,e.name),re(typeof b=="boolean",e,"internal-error"),re(typeof R=="boolean",e,"internal-error"),Tn(s,e.name),Tn(o,e.name),Tn(l,e.name),Tn(c,e.name),Tn(u,e.name),Tn(h,e.name);const k=new Ut({uid:_,auth:e,email:a,emailVerified:b,displayName:i,isAnonymous:R,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:v,createdAt:u,lastLoginAt:h});return M&&Array.isArray(M)&&(k.providerData=M.map(S=>({...S}))),c&&(k._redirectEventId=c),k}static async _fromIdTokenResponse(e,t,i=!1){const a=new Pi;a.updateFromServerResponse(t);const s=new Ut({uid:t.localId,auth:e,stsTokenManager:a,isAnonymous:i});return await Ts(s),s}static async _fromGetAccountInfoResponse(e,t,i){const a=t.users[0];re(a.localId!==void 0,"internal-error");const s=a.providerUserInfo!==void 0?Eu(a.providerUserInfo):[],o=!(a.email&&a.passwordHash)&&!s?.length,l=new Pi;l.updateFromIdToken(i);const c=new Ut({uid:a.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:s,metadata:new Xr(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!s?.length};return Object.assign(c,u),c}}const Tc=new Map;function ln(n){mn(n instanceof Function,"Expected a class definition");let e=Tc.get(n);return e?(mn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Tc.set(n,e),e)}class Iu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Iu.type="NONE";const kc=Iu;function ps(n,e,t){return`firebase:${n}:${e}:${t}`}class Ri{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:a,name:s}=this.auth;this.fullUserKey=ps(this.userKey,a.apiKey,s),this.fullPersistenceKey=ps("persistence",a.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Is(this.auth,{idToken:e}).catch(()=>{});return t?Ut._fromGetAccountInfoResponse(this.auth,t,e):null}return Ut._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Ri(ln(kc),e,i);const a=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=a[0]||ln(kc);const o=ps(i,e.config.apiKey,e.name);let l=null;for(const u of t)try{const h=await u._get(o);if(h){let _;if(typeof h=="string"){const b=await Is(e,{idToken:h}).catch(()=>{});if(!b)break;_=await Ut._fromGetAccountInfoResponse(e,b,h)}else _=Ut._fromJSON(e,h);u!==s&&(l=_),s=u;break}}catch{}const c=a.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Ri(s,e,i):(s=c[0],l&&await s._set(o,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Ri(s,e,i))}}function Ac(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Su(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Tu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pu(e))return"Blackberry";if(Ru(e))return"Webos";if(ku(e))return"Safari";if((e.includes("chrome/")||Au(e))&&!e.includes("edge/"))return"Chrome";if(Cu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function Tu(n=wt()){return/firefox\//i.test(n)}function ku(n=wt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Au(n=wt()){return/crios\//i.test(n)}function Su(n=wt()){return/iemobile/i.test(n)}function Cu(n=wt()){return/android/i.test(n)}function Pu(n=wt()){return/blackberry/i.test(n)}function Ru(n=wt()){return/webos/i.test(n)}function So(n=wt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gg(n=wt()){return So(n)&&!!window.navigator?.standalone}function yg(){return Pm()&&document.documentMode===10}function Lu(n=wt()){return So(n)||Cu(n)||Ru(n)||Pu(n)||/windows phone/i.test(n)||Su(n)}function Du(n,e=[]){let t;switch(n){case"Browser":t=Ac(wt());break;case"Worker":t=`${Ac(wt())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vi}/${i}`}class vg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=s=>new Promise((o,l)=>{try{const c=e(s);o(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const a of t)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}async function bg(n,e={}){return Gn(n,"GET","/v2/passwordPolicy",Wn(n,e))}const wg=6;class _g{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??wg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),a&&(t.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let a=0;a<e.length;a++)i=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,a,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}class xg{constructor(e,t,i,a){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Sc(this),this.idTokenSubscription=new Sc(this),this.beforeStateQueue=new vg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=vu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ln(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ri.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Is(this,{idToken:e}),i=await Ut._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Lt(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!s||s===o)&&l?.user&&(i=l.user,a=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ts(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=eg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Lt(this.app))return Promise.reject(cn(this));const t=e?Be(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Lt(this.app)?Promise.reject(cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Lt(this.app)?Promise.reject(cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ln(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await bg(this),t=new _g(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Na("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await fg(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ln(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Ri.create(this,[ln(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,a){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,a);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Du(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(Lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Jf(`Error while retrieving App Check token: ${e.error}`),e?.token}}function bi(n){return Be(n)}class Sc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vm(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let qs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Eg(n){qs=n}function $u(n){return qs.loadJS(n)}function Ig(){return qs.recaptchaEnterpriseScript}function Tg(){return qs.gapiScript}function kg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Ag{constructor(){this.enterprise=new Sg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Sg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Cg="recaptcha-enterprise",Nu="NO_RECAPTCHA";class Pg{constructor(e){this.type=Cg,this.auth=bi(e)}async verify(e="verify",t=!1){async function i(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{og(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new rg(c);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function a(s,o,l){const c=window.grecaptcha;Ec(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(Nu)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ag().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{i(this.auth).then(l=>{if(!t&&Ec(window.grecaptcha))a(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Ig();c.length!==0&&(c+=l),$u(c).then(()=>{a(l,s,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Cc(n,e,t,i=!1,a=!1){const s=new Pg(n);let o;if(a)o=Nu;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Zr(n,e,t,i,a){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Cc(n,e,t,t==="getOobCode");return i(n,s)}else return i(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Cc(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(s)})}function Rg(n,e){const t=js(n,"auth");if(t.isInitialized()){const a=t.getImmediate(),s=t.getOptions();if(li(s,e??{}))return a;qt(a,"already-initialized")}return t.initialize({options:e})}function Lg(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(ln);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Dg(n,e,t){const i=bi(n);re(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const a=!1,s=Mu(e),{host:o,port:l}=$g(e),c=l===null?"":`:${l}`,u={url:`${s}//${o}${c}/`},h=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!i._canInitEmulator){re(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),re(li(u,i.config.emulator)&&li(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=u,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,Hn(o)?(bo(`${s}//${o}${c}`),wo("Auth",!0)):Ng()}function Mu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $g(n){const e=Mu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(i);if(a){const s=a[1];return{host:s,port:Pc(i.substr(s.length+1))}}else{const[s,o]=i.split(":");return{host:s,port:Pc(o)}}}function Pc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ng(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}class Co{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return on("not implemented")}_getIdTokenResponse(e){return on("not implemented")}_linkToIdToken(e,t){return on("not implemented")}_getReauthenticationResolver(e){return on("not implemented")}}async function Mg(n,e){return Gn(n,"POST","/v1/accounts:signUp",e)}async function Og(n,e){return Va(n,"POST","/v1/accounts:signInWithPassword",Wn(n,e))}async function Vg(n,e){return Va(n,"POST","/v1/accounts:signInWithEmailLink",Wn(n,e))}async function Bg(n,e){return Va(n,"POST","/v1/accounts:signInWithEmailLink",Wn(n,e))}class ka extends Co{constructor(e,t,i,a=null){super("password",i),this._email=e,this._password=t,this._tenantId=a}static _fromEmailAndPassword(e,t){return new ka(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new ka(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zr(e,t,"signInWithPassword",Og);case"emailLink":return Vg(e,{email:this._email,oobCode:this._password});default:qt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zr(e,i,"signUpPassword",Mg);case"emailLink":return Bg(e,{idToken:t,email:this._email,oobCode:this._password});default:qt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function Li(n,e){return Va(n,"POST","/v1/accounts:signInWithIdp",Wn(n,e))}const Fg="http://localhost";class di extends Co{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new di(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):qt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:a,...s}=t;if(!i||!a)return null;const o=new di(i,a);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Li(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Li(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Li(e,t)}buildRequest(){const e={requestUri:Fg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ma(t)}return e}}function zg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ug(n){const e=da(ua(n)).link,t=e?da(ua(e)).deep_link_id:null,i=da(ua(n)).deep_link_id;return(i?da(ua(i)).link:null)||i||t||e||n}class Po{constructor(e){const t=da(ua(e)),i=t.apiKey??null,a=t.oobCode??null,s=zg(t.mode??null);re(i&&a&&s,"argument-error"),this.apiKey=i,this.operation=s,this.code=a,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Ug(e);try{return new Po(t)}catch{return null}}}class zi{constructor(){this.providerId=zi.PROVIDER_ID}static credential(e,t){return ka._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Po.parseLink(t);return re(i,"argument-error"),ka._fromEmailAndCode(e,i.code,i.tenantId)}}zi.PROVIDER_ID="password";zi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";zi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class Ou{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ba extends Ou{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class kn extends Ba{constructor(){super("facebook.com")}static credential(e){return di._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kn.credential(e.oauthAccessToken)}catch{return null}}}kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";kn.PROVIDER_ID="facebook.com";class An extends Ba{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return di._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return An.credential(t,i)}catch{return null}}}An.GOOGLE_SIGN_IN_METHOD="google.com";An.PROVIDER_ID="google.com";class Sn extends Ba{constructor(){super("github.com")}static credential(e){return di._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.GITHUB_SIGN_IN_METHOD="github.com";Sn.PROVIDER_ID="github.com";class Cn extends Ba{constructor(){super("twitter.com")}static credential(e,t){return di._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Cn.credential(t,i)}catch{return null}}}Cn.TWITTER_SIGN_IN_METHOD="twitter.com";Cn.PROVIDER_ID="twitter.com";async function jg(n,e){return Va(n,"POST","/v1/accounts:signUp",Wn(n,e))}class ui{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,a=!1){const s=await Ut._fromIdTokenResponse(e,i,a),o=Rc(i);return new ui({user:s,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const a=Rc(i);return new ui({user:e,providerId:a,_tokenResponse:i,operationType:t})}}function Rc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}class ks extends rn{constructor(e,t,i,a){super(t.code,t.message),this.operationType=i,this.user=a,Object.setPrototypeOf(this,ks.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,a){return new ks(e,t,i,a)}}function Vu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ks._fromErrorAndOperation(n,s,e,i):s})}async function qg(n,e,t=!1){const i=await Ta(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ui._forOperation(n,"link",i)}async function Hg(n,e,t=!1){const{auth:i}=n;if(Lt(i.app))return Promise.reject(cn(i));const a="reauthenticate";try{const s=await Ta(n,Vu(i,a,e,n),t);re(s.idToken,i,"internal-error");const o=Ao(s.idToken);re(o,i,"internal-error");const{sub:l}=o;return re(n.uid===l,i,"user-mismatch"),ui._forOperation(n,a,s)}catch(s){throw s?.code==="auth/user-not-found"&&qt(i,"user-mismatch"),s}}async function Bu(n,e,t=!1){if(Lt(n.app))return Promise.reject(cn(n));const i="signIn",a=await Vu(n,i,e),s=await ui._fromIdTokenResponse(n,i,a);return t||await n._updateCurrentUser(s.user),s}async function Wg(n,e){return Bu(bi(n),e)}async function Fu(n){const e=bi(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Gg(n,e,t){if(Lt(n.app))return Promise.reject(cn(n));const i=bi(n),o=await Zr(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",jg).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Fu(n),c}),l=await ui._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(l.user),l}function Kg(n,e,t){return Lt(n.app)?Promise.reject(cn(n)):Wg(Be(n),zi.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Fu(n),i})}function Qg(n,e,t,i){return Be(n).onIdTokenChanged(e,t,i)}function Yg(n,e,t){return Be(n).beforeAuthStateChanged(e,t)}function Jg(n,e,t,i){return Be(n).onAuthStateChanged(e,t,i)}function Xg(n){return Be(n).signOut()}const As="__sak";class zu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(As,"1"),this.storage.removeItem(As),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}const Zg=1e3,ey=10;class Uu extends zu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Lu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),a=this.localCache[t];i!==a&&e(t,a,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const a=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);yg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,ey):a()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const a of Array.from(i))a(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Zg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Uu.type="LOCAL";const ty=Uu;class ju extends zu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ju.type="SESSION";const qu=ju;function ny(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}class Hs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(a=>a.isListeningto(e));if(t)return t;const i=new Hs(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:a,data:s}=t.data,o=this.handlersMap[a];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:a});const l=Array.from(o).map(async u=>u(t.origin,s)),c=await ny(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:a,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hs.receivers=[];function Ro(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}class iy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let s,o;return new Promise((l,c)=>{const u=Ro("",20);a.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:a,onMessage(_){const b=_;if(b.data.eventId===u)switch(b.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(b.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),a.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[a.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}function en(){return window}function ay(n){en().location.href=n}function Hu(){return typeof en().WorkerGlobalScope<"u"&&typeof en().importScripts=="function"}async function sy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ry(){return navigator?.serviceWorker?.controller||null}function oy(){return Hu()?self:null}const Wu="firebaseLocalStorageDb",ly=1,Ss="firebaseLocalStorage",Gu="fbase_key";class Fa{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ws(n,e){return n.transaction([Ss],e?"readwrite":"readonly").objectStore(Ss)}function cy(){const n=indexedDB.deleteDatabase(Wu);return new Fa(n).toPromise()}function eo(){const n=indexedDB.open(Wu,ly);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ss,{keyPath:Gu})}catch(a){t(a)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ss)?e(i):(i.close(),await cy(),e(await eo()))})})}async function Lc(n,e,t){const i=Ws(n,!0).put({[Gu]:e,value:t});return new Fa(i).toPromise()}async function dy(n,e){const t=Ws(n,!1).get(e),i=await new Fa(t).toPromise();return i===void 0?null:i.value}function Dc(n,e){const t=Ws(n,!0).delete(e);return new Fa(t).toPromise()}const uy=800,py=3;class Ku{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await eo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>py)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hs._getInstance(oy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await sy(),!this.activeServiceWorker)return;this.sender=new iy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ry()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await eo();return await Lc(e,As,"1"),await Dc(e,As),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Lc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>dy(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Dc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const s=Ws(a,!1).getAll();return new Fa(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:a,value:s}of e)i.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(s)&&(this.notifyListeners(a,s),t.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!i.has(a)&&(this.notifyListeners(a,null),t.push(a));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const a of Array.from(i))a(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ku.type="LOCAL";const hy=Ku;new Oa(3e4,6e4);function my(n,e){return e?ln(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}class Lo extends Co{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Li(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Li(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Li(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fy(n){return Bu(n.auth,new Lo(n),n.bypassAuthState)}function gy(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Hg(t,new Lo(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),qg(t,new Lo(n),n.bypassAuthState)}class Qu{constructor(e,t,i,a,s=!1){this.auth=e,this.resolver=i,this.user=a,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:a,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:s||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fy;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return gy;default:qt(this.auth,"internal-error")}}resolve(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const vy=new Oa(2e3,1e4);class Ci extends Qu{constructor(e,t,i,a,s){super(e,t,a,s),this.provider=i,this.authWindow=null,this.pollId=null,Ci.currentPopupAction&&Ci.currentPopupAction.cancel(),Ci.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){mn(this.filter.length===1,"Popup operations only handle one event");const e=Ro();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ci.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vy.get())};e()}}Ci.currentPopupAction=null;const by="pendingRedirect",hs=new Map;class wy extends Qu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=hs.get(this.auth._key());if(!e){try{const i=await _y(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}hs.set(this.auth._key(),e)}return this.bypassAuthState||hs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _y(n,e){const t=Iy(e),i=Ey(n);if(!await i._isAvailable())return!1;const a=await i._get(t)==="true";return await i._remove(t),a}function xy(n,e){hs.set(n._key(),e)}function Ey(n){return ln(n._redirectPersistence)}function Iy(n){return ps(by,n.config.apiKey,n.name)}async function Ty(n,e,t=!1){if(Lt(n.app))return Promise.reject(cn(n));const i=bi(n),a=my(i,e),o=await new wy(i,a,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}const ky=600*1e3;class Ay{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Yu(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Zt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ky&&this.cachedEventUids.clear(),this.cachedEventUids.has($c(e))}saveEventToCache(e){this.cachedEventUids.add($c(e)),this.lastProcessedEventTime=Date.now()}}function $c(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Yu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Sy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yu(n);default:return!1}}async function Cy(n,e={}){return Gn(n,"GET","/v1/projects",e)}const Py=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ry=/^https?/;async function Ly(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cy(n);for(const t of e)try{if(Dy(t))return}catch{}qt(n,"unauthorized-domain")}function Dy(n){const e=Jr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Ry.test(t))return!1;if(Py.test(n))return i===n;const a=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(i)}const $y=new Oa(3e4,6e4);function Nc(){const n=en().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ny(n){return new Promise((e,t)=>{function i(){Nc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Nc(),t(Zt(n,"network-request-failed"))},timeout:$y.get()})}if(en().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(en().gapi?.load)i();else{const a=kg("iframefcb");return en()[a]=()=>{gapi.load?i():t(Zt(n,"network-request-failed"))},$u(`${Tg()}?onload=${a}`).catch(s=>t(s))}}).catch(e=>{throw ms=null,e})}let ms=null;function My(n){return ms=ms||Ny(n),ms}const Oy=new Oa(5e3,15e3),Vy="__/auth/iframe",By="emulator/auth/iframe",Fy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Uy(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ko(e,By):`https://${n.config.authDomain}/${Vy}`,i={apiKey:e.apiKey,appName:n.name,v:vi},a=zy.get(n.config.apiHost);a&&(i.eid=a);const s=n._getFrameworks();return s.length&&(i.fw=s.join(",")),`${t}?${Ma(i).slice(1)}`}async function jy(n){const e=await My(n),t=en().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:Uy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fy,dontclear:!0},i=>new Promise(async(a,s)=>{await i.restyle({setHideOnLeave:!1});const o=Zt(n,"network-request-failed"),l=en().setTimeout(()=>{s(o)},Oy.get());function c(){en().clearTimeout(l),a(i)}i.ping(c).then(c,()=>{s(o)})}))}const qy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hy=500,Wy=600,Gy="_blank",Ky="http://localhost";class Mc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Qy(n,e,t,i=Hy,a=Wy){const s=Math.max((window.screen.availHeight-a)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c={...qy,width:i.toString(),height:a.toString(),top:s,left:o},u=wt().toLowerCase();t&&(l=Au(u)?Gy:t),Tu(u)&&(e=e||Ky,c.scrollbars="yes");const h=Object.entries(c).reduce((b,[R,M])=>`${b}${R}=${M},`,"");if(gg(u)&&l!=="_self")return Yy(e||"",l),new Mc(null);const _=window.open(e||"",l,h);re(_,n,"popup-blocked");try{_.focus()}catch{}return new Mc(_)}function Yy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}const Jy="__/auth/handler",Xy="emulator/auth/handler",Zy=encodeURIComponent("fac");async function Oc(n,e,t,i,a,s){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:vi,eventId:a};if(e instanceof Ou){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Om(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,_]of Object.entries({}))o[h]=_}if(e instanceof Ba){const h=e.getScopes().filter(_=>_!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const c=await n._getAppCheckToken(),u=c?`#${Zy}=${encodeURIComponent(c)}`:"";return`${ev(n)}?${Ma(l).slice(1)}${u}`}function ev({config:n}){return n.emulator?ko(n,Xy):`https://${n.authDomain}/${Jy}`}const Dr="webStorageSupport";class tv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qu,this._completeRedirectFn=Ty,this._overrideRedirectResult=xy}async _openPopup(e,t,i,a){mn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Oc(e,t,i,Jr(),a);return Qy(e,s,Ro())}async _openRedirect(e,t,i,a){await this._originValidation(e);const s=await Oc(e,t,i,Jr(),a);return ay(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:a,promise:s}=this.eventManagers[t];return a?Promise.resolve(a):(mn(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await jy(e),i=new Ay(e);return t.register("authEvent",a=>(re(a?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Dr,{type:Dr},a=>{const s=a?.[0]?.[Dr];s!==void 0&&t(!!s),qt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ly(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Lu()||ku()||So()}}const nv=tv;var Vc="@firebase/auth",Bc="1.12.0";class iv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function av(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sv(n){ci(new Vn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;re(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Du(n)},u=new xg(i,a,s,c);return Lg(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ci(new Vn("auth-internal",e=>{const t=bi(e.getProvider("auth").getImmediate());return(i=>new iv(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xt(Vc,Bc,av(n)),Xt(Vc,Bc,"esm2020")}const rv=300,ov=uu("authIdTokenMaxAge")||rv;let Fc=null;const lv=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>ov)return;const a=t?.token;Fc!==a&&(Fc=a,await fetch(n,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function Ju(n=Io()){const e=js(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Rg(n,{popupRedirectResolver:nv,persistence:[hy,ty,qu]}),i=uu("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(i,location.origin);if(location.origin===s.origin){const o=lv(s.toString());Yg(t,o,()=>o(t.currentUser)),Qg(t,l=>o(l))}}const a=lu("auth");return a&&Dg(t,`http://${a}`),t}function cv(){return document.getElementsByTagName("head")?.[0]??document}Eg({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=a=>{const s=Zt("internal-error");s.customData=a,t(s)},i.type="text/javascript",i.charset="UTF-8",cv().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sv("Browser");var dv="firebase",uv="12.9.0";Xt(dv,uv,"app");var zc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var $n,Xu;(function(){var n;function e(f,m){function y(){}y.prototype=m.prototype,f.F=m.prototype,f.prototype=new y,f.prototype.constructor=f,f.D=function(x,E,g){for(var w=Array(arguments.length-2),L=2;L<arguments.length;L++)w[L-2]=arguments[L];return m.prototype[E].apply(x,w)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(f,m,y){y||(y=0);const x=Array(16);if(typeof m=="string")for(var E=0;E<16;++E)x[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;E<16;++E)x[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=f.g[0],y=f.g[1],E=f.g[2];let g=f.g[3],w;w=m+(g^y&(E^g))+x[0]+3614090360&4294967295,m=y+(w<<7&4294967295|w>>>25),w=g+(E^m&(y^E))+x[1]+3905402710&4294967295,g=m+(w<<12&4294967295|w>>>20),w=E+(y^g&(m^y))+x[2]+606105819&4294967295,E=g+(w<<17&4294967295|w>>>15),w=y+(m^E&(g^m))+x[3]+3250441966&4294967295,y=E+(w<<22&4294967295|w>>>10),w=m+(g^y&(E^g))+x[4]+4118548399&4294967295,m=y+(w<<7&4294967295|w>>>25),w=g+(E^m&(y^E))+x[5]+1200080426&4294967295,g=m+(w<<12&4294967295|w>>>20),w=E+(y^g&(m^y))+x[6]+2821735955&4294967295,E=g+(w<<17&4294967295|w>>>15),w=y+(m^E&(g^m))+x[7]+4249261313&4294967295,y=E+(w<<22&4294967295|w>>>10),w=m+(g^y&(E^g))+x[8]+1770035416&4294967295,m=y+(w<<7&4294967295|w>>>25),w=g+(E^m&(y^E))+x[9]+2336552879&4294967295,g=m+(w<<12&4294967295|w>>>20),w=E+(y^g&(m^y))+x[10]+4294925233&4294967295,E=g+(w<<17&4294967295|w>>>15),w=y+(m^E&(g^m))+x[11]+2304563134&4294967295,y=E+(w<<22&4294967295|w>>>10),w=m+(g^y&(E^g))+x[12]+1804603682&4294967295,m=y+(w<<7&4294967295|w>>>25),w=g+(E^m&(y^E))+x[13]+4254626195&4294967295,g=m+(w<<12&4294967295|w>>>20),w=E+(y^g&(m^y))+x[14]+2792965006&4294967295,E=g+(w<<17&4294967295|w>>>15),w=y+(m^E&(g^m))+x[15]+1236535329&4294967295,y=E+(w<<22&4294967295|w>>>10),w=m+(E^g&(y^E))+x[1]+4129170786&4294967295,m=y+(w<<5&4294967295|w>>>27),w=g+(y^E&(m^y))+x[6]+3225465664&4294967295,g=m+(w<<9&4294967295|w>>>23),w=E+(m^y&(g^m))+x[11]+643717713&4294967295,E=g+(w<<14&4294967295|w>>>18),w=y+(g^m&(E^g))+x[0]+3921069994&4294967295,y=E+(w<<20&4294967295|w>>>12),w=m+(E^g&(y^E))+x[5]+3593408605&4294967295,m=y+(w<<5&4294967295|w>>>27),w=g+(y^E&(m^y))+x[10]+38016083&4294967295,g=m+(w<<9&4294967295|w>>>23),w=E+(m^y&(g^m))+x[15]+3634488961&4294967295,E=g+(w<<14&4294967295|w>>>18),w=y+(g^m&(E^g))+x[4]+3889429448&4294967295,y=E+(w<<20&4294967295|w>>>12),w=m+(E^g&(y^E))+x[9]+568446438&4294967295,m=y+(w<<5&4294967295|w>>>27),w=g+(y^E&(m^y))+x[14]+3275163606&4294967295,g=m+(w<<9&4294967295|w>>>23),w=E+(m^y&(g^m))+x[3]+4107603335&4294967295,E=g+(w<<14&4294967295|w>>>18),w=y+(g^m&(E^g))+x[8]+1163531501&4294967295,y=E+(w<<20&4294967295|w>>>12),w=m+(E^g&(y^E))+x[13]+2850285829&4294967295,m=y+(w<<5&4294967295|w>>>27),w=g+(y^E&(m^y))+x[2]+4243563512&4294967295,g=m+(w<<9&4294967295|w>>>23),w=E+(m^y&(g^m))+x[7]+1735328473&4294967295,E=g+(w<<14&4294967295|w>>>18),w=y+(g^m&(E^g))+x[12]+2368359562&4294967295,y=E+(w<<20&4294967295|w>>>12),w=m+(y^E^g)+x[5]+4294588738&4294967295,m=y+(w<<4&4294967295|w>>>28),w=g+(m^y^E)+x[8]+2272392833&4294967295,g=m+(w<<11&4294967295|w>>>21),w=E+(g^m^y)+x[11]+1839030562&4294967295,E=g+(w<<16&4294967295|w>>>16),w=y+(E^g^m)+x[14]+4259657740&4294967295,y=E+(w<<23&4294967295|w>>>9),w=m+(y^E^g)+x[1]+2763975236&4294967295,m=y+(w<<4&4294967295|w>>>28),w=g+(m^y^E)+x[4]+1272893353&4294967295,g=m+(w<<11&4294967295|w>>>21),w=E+(g^m^y)+x[7]+4139469664&4294967295,E=g+(w<<16&4294967295|w>>>16),w=y+(E^g^m)+x[10]+3200236656&4294967295,y=E+(w<<23&4294967295|w>>>9),w=m+(y^E^g)+x[13]+681279174&4294967295,m=y+(w<<4&4294967295|w>>>28),w=g+(m^y^E)+x[0]+3936430074&4294967295,g=m+(w<<11&4294967295|w>>>21),w=E+(g^m^y)+x[3]+3572445317&4294967295,E=g+(w<<16&4294967295|w>>>16),w=y+(E^g^m)+x[6]+76029189&4294967295,y=E+(w<<23&4294967295|w>>>9),w=m+(y^E^g)+x[9]+3654602809&4294967295,m=y+(w<<4&4294967295|w>>>28),w=g+(m^y^E)+x[12]+3873151461&4294967295,g=m+(w<<11&4294967295|w>>>21),w=E+(g^m^y)+x[15]+530742520&4294967295,E=g+(w<<16&4294967295|w>>>16),w=y+(E^g^m)+x[2]+3299628645&4294967295,y=E+(w<<23&4294967295|w>>>9),w=m+(E^(y|~g))+x[0]+4096336452&4294967295,m=y+(w<<6&4294967295|w>>>26),w=g+(y^(m|~E))+x[7]+1126891415&4294967295,g=m+(w<<10&4294967295|w>>>22),w=E+(m^(g|~y))+x[14]+2878612391&4294967295,E=g+(w<<15&4294967295|w>>>17),w=y+(g^(E|~m))+x[5]+4237533241&4294967295,y=E+(w<<21&4294967295|w>>>11),w=m+(E^(y|~g))+x[12]+1700485571&4294967295,m=y+(w<<6&4294967295|w>>>26),w=g+(y^(m|~E))+x[3]+2399980690&4294967295,g=m+(w<<10&4294967295|w>>>22),w=E+(m^(g|~y))+x[10]+4293915773&4294967295,E=g+(w<<15&4294967295|w>>>17),w=y+(g^(E|~m))+x[1]+2240044497&4294967295,y=E+(w<<21&4294967295|w>>>11),w=m+(E^(y|~g))+x[8]+1873313359&4294967295,m=y+(w<<6&4294967295|w>>>26),w=g+(y^(m|~E))+x[15]+4264355552&4294967295,g=m+(w<<10&4294967295|w>>>22),w=E+(m^(g|~y))+x[6]+2734768916&4294967295,E=g+(w<<15&4294967295|w>>>17),w=y+(g^(E|~m))+x[13]+1309151649&4294967295,y=E+(w<<21&4294967295|w>>>11),w=m+(E^(y|~g))+x[4]+4149444226&4294967295,m=y+(w<<6&4294967295|w>>>26),w=g+(y^(m|~E))+x[11]+3174756917&4294967295,g=m+(w<<10&4294967295|w>>>22),w=E+(m^(g|~y))+x[2]+718787259&4294967295,E=g+(w<<15&4294967295|w>>>17),w=y+(g^(E|~m))+x[9]+3951481745&4294967295,f.g[0]=f.g[0]+m&4294967295,f.g[1]=f.g[1]+(E+(w<<21&4294967295|w>>>11))&4294967295,f.g[2]=f.g[2]+E&4294967295,f.g[3]=f.g[3]+g&4294967295}i.prototype.v=function(f,m){m===void 0&&(m=f.length);const y=m-this.blockSize,x=this.C;let E=this.h,g=0;for(;g<m;){if(E==0)for(;g<=y;)a(this,f,g),g+=this.blockSize;if(typeof f=="string"){for(;g<m;)if(x[E++]=f.charCodeAt(g++),E==this.blockSize){a(this,x),E=0;break}}else for(;g<m;)if(x[E++]=f[g++],E==this.blockSize){a(this,x),E=0;break}}this.h=E,this.o+=m},i.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var m=1;m<f.length-8;++m)f[m]=0;m=this.o*8;for(var y=f.length-8;y<f.length;++y)f[y]=m&255,m/=256;for(this.v(f),f=Array(16),m=0,y=0;y<4;++y)for(let x=0;x<32;x+=8)f[m++]=this.g[y]>>>x&255;return f};function s(f,m){var y=l;return Object.prototype.hasOwnProperty.call(y,f)?y[f]:y[f]=m(f)}function o(f,m){this.h=m;const y=[];let x=!0;for(let E=f.length-1;E>=0;E--){const g=f[E]|0;x&&g==m||(y[E]=g,x=!1)}this.g=y}var l={};function c(f){return-128<=f&&f<128?s(f,function(m){return new o([m|0],m<0?-1:0)}):new o([f|0],f<0?-1:0)}function u(f){if(isNaN(f)||!isFinite(f))return _;if(f<0)return v(u(-f));const m=[];let y=1;for(let x=0;f>=y;x++)m[x]=f/y|0,y*=4294967296;return new o(m,0)}function h(f,m){if(f.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(f.charAt(0)=="-")return v(h(f.substring(1),m));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=u(Math.pow(m,8));let x=_;for(let g=0;g<f.length;g+=8){var E=Math.min(8,f.length-g);const w=parseInt(f.substring(g,g+E),m);E<8?(E=u(Math.pow(m,E)),x=x.j(E).add(u(w))):(x=x.j(y),x=x.add(u(w)))}return x}var _=c(0),b=c(1),R=c(16777216);n=o.prototype,n.m=function(){if(D(this))return-v(this).m();let f=0,m=1;for(let y=0;y<this.g.length;y++){const x=this.i(y);f+=(x>=0?x:4294967296+x)*m,m*=4294967296}return f},n.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(M(this))return"0";if(D(this))return"-"+v(this).toString(f);const m=u(Math.pow(f,6));var y=this;let x="";for(;;){const E=C(y,m).g;y=k(y,E.j(m));let g=((y.g.length>0?y.g[0]:y.h)>>>0).toString(f);if(y=E,M(y))return g+x;for(;g.length<6;)g="0"+g;x=g+x}},n.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function M(f){if(f.h!=0)return!1;for(let m=0;m<f.g.length;m++)if(f.g[m]!=0)return!1;return!0}function D(f){return f.h==-1}n.l=function(f){return f=k(this,f),D(f)?-1:M(f)?0:1};function v(f){const m=f.g.length,y=[];for(let x=0;x<m;x++)y[x]=~f.g[x];return new o(y,~f.h).add(b)}n.abs=function(){return D(this)?v(this):this},n.add=function(f){const m=Math.max(this.g.length,f.g.length),y=[];let x=0;for(let E=0;E<=m;E++){let g=x+(this.i(E)&65535)+(f.i(E)&65535),w=(g>>>16)+(this.i(E)>>>16)+(f.i(E)>>>16);x=w>>>16,g&=65535,w&=65535,y[E]=w<<16|g}return new o(y,y[y.length-1]&-2147483648?-1:0)};function k(f,m){return f.add(v(m))}n.j=function(f){if(M(this)||M(f))return _;if(D(this))return D(f)?v(this).j(v(f)):v(v(this).j(f));if(D(f))return v(this.j(v(f)));if(this.l(R)<0&&f.l(R)<0)return u(this.m()*f.m());const m=this.g.length+f.g.length,y=[];for(var x=0;x<2*m;x++)y[x]=0;for(x=0;x<this.g.length;x++)for(let E=0;E<f.g.length;E++){const g=this.i(x)>>>16,w=this.i(x)&65535,L=f.i(E)>>>16,P=f.i(E)&65535;y[2*x+2*E]+=w*P,S(y,2*x+2*E),y[2*x+2*E+1]+=g*P,S(y,2*x+2*E+1),y[2*x+2*E+1]+=w*L,S(y,2*x+2*E+1),y[2*x+2*E+2]+=g*L,S(y,2*x+2*E+2)}for(f=0;f<m;f++)y[f]=y[2*f+1]<<16|y[2*f];for(f=m;f<2*m;f++)y[f]=0;return new o(y,0)};function S(f,m){for(;(f[m]&65535)!=f[m];)f[m+1]+=f[m]>>>16,f[m]&=65535,m++}function $(f,m){this.g=f,this.h=m}function C(f,m){if(M(m))throw Error("division by zero");if(M(f))return new $(_,_);if(D(f))return m=C(v(f),m),new $(v(m.g),v(m.h));if(D(m))return m=C(f,v(m)),new $(v(m.g),m.h);if(f.g.length>30){if(D(f)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var y=b,x=m;x.l(f)<=0;)y=T(y),x=T(x);var E=A(y,1),g=A(x,1);for(x=A(x,2),y=A(y,2);!M(x);){var w=g.add(x);w.l(f)<=0&&(E=E.add(y),g=w),x=A(x,1),y=A(y,1)}return m=k(f,E.j(m)),new $(E,m)}for(E=_;f.l(m)>=0;){for(y=Math.max(1,Math.floor(f.m()/m.m())),x=Math.ceil(Math.log(y)/Math.LN2),x=x<=48?1:Math.pow(2,x-48),g=u(y),w=g.j(m);D(w)||w.l(f)>0;)y-=x,g=u(y),w=g.j(m);M(g)&&(g=b),E=E.add(g),f=k(f,w)}return new $(E,f)}n.B=function(f){return C(this,f).h},n.and=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)&f.i(x);return new o(y,this.h&f.h)},n.or=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)|f.i(x);return new o(y,this.h|f.h)},n.xor=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)^f.i(x);return new o(y,this.h^f.h)};function T(f){const m=f.g.length+1,y=[];for(let x=0;x<m;x++)y[x]=f.i(x)<<1|f.i(x-1)>>>31;return new o(y,f.h)}function A(f,m){const y=m>>5;m%=32;const x=f.g.length-y,E=[];for(let g=0;g<x;g++)E[g]=m>0?f.i(g+y)>>>m|f.i(g+y+1)<<32-m:f.i(g+y);return new o(E,f.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,Xu=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,$n=o}).apply(typeof zc<"u"?zc:typeof self<"u"?self:typeof window<"u"?window:{});var is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Zu,pa,ep,fs,to,tp,np,ip;(function(){var n,e=Object.defineProperty;function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof is=="object"&&is];for(var d=0;d<r.length;++d){var p=r[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var i=t(this);function a(r,d){if(d)e:{var p=i;r=r.split(".");for(var I=0;I<r.length-1;I++){var O=r[I];if(!(O in p))break e;p=p[O]}r=r[r.length-1],I=p[r],d=d(I),d!=I&&d!=null&&e(p,r,{configurable:!0,writable:!0,value:d})}}a("Symbol.dispose",function(r){return r||Symbol("Symbol.dispose")}),a("Array.prototype.values",function(r){return r||function(){return this[Symbol.iterator]()}}),a("Object.entries",function(r){return r||function(d){var p=[],I;for(I in d)Object.prototype.hasOwnProperty.call(d,I)&&p.push([I,d[I]]);return p}});var s=s||{},o=this||self;function l(r){var d=typeof r;return d=="object"&&r!=null||d=="function"}function c(r,d,p){return r.call.apply(r.bind,arguments)}function u(r,d,p){return u=c,u.apply(null,arguments)}function h(r,d){var p=Array.prototype.slice.call(arguments,1);return function(){var I=p.slice();return I.push.apply(I,arguments),r.apply(this,I)}}function _(r,d){function p(){}p.prototype=d.prototype,r.Z=d.prototype,r.prototype=new p,r.prototype.constructor=r,r.Ob=function(I,O,U){for(var Y=Array(arguments.length-2),he=2;he<arguments.length;he++)Y[he-2]=arguments[he];return d.prototype[O].apply(I,Y)}}var b=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?r=>r&&AsyncContext.Snapshot.wrap(r):r=>r;function R(r){const d=r.length;if(d>0){const p=Array(d);for(let I=0;I<d;I++)p[I]=r[I];return p}return[]}function M(r,d){for(let I=1;I<arguments.length;I++){const O=arguments[I];var p=typeof O;if(p=p!="object"?p:O?Array.isArray(O)?"array":p:"null",p=="array"||p=="object"&&typeof O.length=="number"){p=r.length||0;const U=O.length||0;r.length=p+U;for(let Y=0;Y<U;Y++)r[p+Y]=O[Y]}else r.push(O)}}class D{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function v(r){o.setTimeout(()=>{throw r},0)}function k(){var r=f;let d=null;return r.g&&(d=r.g,r.g=r.g.next,r.g||(r.h=null),d.next=null),d}class S{constructor(){this.h=this.g=null}add(d,p){const I=$.get();I.set(d,p),this.h?this.h.next=I:this.g=I,this.h=I}}var $=new D(()=>new C,r=>r.reset());class C{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let T,A=!1,f=new S,m=()=>{const r=Promise.resolve(void 0);T=()=>{r.then(y)}};function y(){for(var r;r=k();){try{r.h.call(r.g)}catch(p){v(p)}var d=$;d.j(r),d.h<100&&(d.h++,r.next=d.g,d.g=r)}A=!1}function x(){this.u=this.u,this.C=this.C}x.prototype.u=!1,x.prototype.dispose=function(){this.u||(this.u=!0,this.N())},x.prototype[Symbol.dispose]=function(){this.dispose()},x.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(r,d){this.type=r,this.g=this.target=d,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var g=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var r=!1,d=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const p=()=>{};o.addEventListener("test",p,d),o.removeEventListener("test",p,d)}catch{}return r})();function w(r){return/^[\s\xa0]*$/.test(r)}function L(r,d){E.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r&&this.init(r,d)}_(L,E),L.prototype.init=function(r,d){const p=this.type=r.type,I=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;this.target=r.target||r.srcElement,this.g=d,d=r.relatedTarget,d||(p=="mouseover"?d=r.fromElement:p=="mouseout"&&(d=r.toElement)),this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=r.pointerType,this.state=r.state,this.i=r,r.defaultPrevented&&L.Z.h.call(this)},L.prototype.h=function(){L.Z.h.call(this);const r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var P="closure_listenable_"+(Math.random()*1e6|0),K=0;function j(r,d,p,I,O){this.listener=r,this.proxy=null,this.src=d,this.type=p,this.capture=!!I,this.ha=O,this.key=++K,this.da=this.fa=!1}function Q(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function J(r,d,p){for(const I in r)d.call(p,r[I],I,r)}function Z(r,d){for(const p in r)d.call(void 0,r[p],p,r)}function se(r){const d={};for(const p in r)d[p]=r[p];return d}const ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function le(r,d){let p,I;for(let O=1;O<arguments.length;O++){I=arguments[O];for(p in I)r[p]=I[p];for(let U=0;U<ce.length;U++)p=ce[U],Object.prototype.hasOwnProperty.call(I,p)&&(r[p]=I[p])}}function pe(r){this.src=r,this.g={},this.h=0}pe.prototype.add=function(r,d,p,I,O){const U=r.toString();r=this.g[U],r||(r=this.g[U]=[],this.h++);const Y=Ve(r,d,I,O);return Y>-1?(d=r[Y],p||(d.fa=!1)):(d=new j(d,this.src,U,!!I,O),d.fa=p,r.push(d)),d};function ye(r,d){const p=d.type;if(p in r.g){var I=r.g[p],O=Array.prototype.indexOf.call(I,d,void 0),U;(U=O>=0)&&Array.prototype.splice.call(I,O,1),U&&(Q(d),r.g[p].length==0&&(delete r.g[p],r.h--))}}function Ve(r,d,p,I){for(let O=0;O<r.length;++O){const U=r[O];if(!U.da&&U.listener==d&&U.capture==!!p&&U.ha==I)return O}return-1}var Me="closure_lm_"+(Math.random()*1e6|0),ke={};function Ue(r,d,p,I,O){if(Array.isArray(d)){for(let U=0;U<d.length;U++)Ue(r,d[U],p,I,O);return null}return p=rt(p),r&&r[P]?r.J(d,p,l(I)?!!I.capture:!1,O):_t(r,d,p,!1,I,O)}function _t(r,d,p,I,O,U){if(!d)throw Error("Invalid event type");const Y=l(O)?!!O.capture:!!O;let he=Fe(r);if(he||(r[Me]=he=new pe(r)),p=he.add(d,p,I,Y,U),p.proxy)return p;if(I=dt(),p.proxy=I,I.src=r,I.listener=p,r.addEventListener)g||(O=Y),O===void 0&&(O=!1),r.addEventListener(d.toString(),I,O);else if(r.attachEvent)r.attachEvent(ae(d.toString()),I);else if(r.addListener&&r.removeListener)r.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return p}function dt(){function r(p){return d.call(r.src,r.listener,p)}const d=Ce;return r}function De(r,d,p,I,O){if(Array.isArray(d))for(var U=0;U<d.length;U++)De(r,d[U],p,I,O);else I=l(I)?!!I.capture:!!I,p=rt(p),r&&r[P]?(r=r.i,U=String(d).toString(),U in r.g&&(d=r.g[U],p=Ve(d,p,I,O),p>-1&&(Q(d[p]),Array.prototype.splice.call(d,p,1),d.length==0&&(delete r.g[U],r.h--)))):r&&(r=Fe(r))&&(d=r.g[d.toString()],r=-1,d&&(r=Ve(d,p,I,O)),(p=r>-1?d[r]:null)&&Ee(p))}function Ee(r){if(typeof r!="number"&&r&&!r.da){var d=r.src;if(d&&d[P])ye(d.i,r);else{var p=r.type,I=r.proxy;d.removeEventListener?d.removeEventListener(p,I,r.capture):d.detachEvent?d.detachEvent(ae(p),I):d.addListener&&d.removeListener&&d.removeListener(I),(p=Fe(d))?(ye(p,r),p.h==0&&(p.src=null,d[Me]=null)):Q(r)}}}function ae(r){return r in ke?ke[r]:ke[r]="on"+r}function Ce(r,d){if(r.da)r=!0;else{d=new L(d,this);const p=r.listener,I=r.ha||r.src;r.fa&&Ee(r),r=p.call(I,d)}return r}function Fe(r){return r=r[Me],r instanceof pe?r:null}var me="__closure_events_fn_"+(Math.random()*1e9>>>0);function rt(r){return typeof r=="function"?r:(r[me]||(r[me]=function(d){return r.handleEvent(d)}),r[me])}function fe(){x.call(this),this.i=new pe(this),this.M=this,this.G=null}_(fe,x),fe.prototype[P]=!0,fe.prototype.removeEventListener=function(r,d,p,I){De(this,r,d,p,I)};function ve(r,d){var p,I=r.G;if(I)for(p=[];I;I=I.G)p.push(I);if(r=r.M,I=d.type||d,typeof d=="string")d=new E(d,r);else if(d instanceof E)d.target=d.target||r;else{var O=d;d=new E(I,r),le(d,O)}O=!0;let U,Y;if(p)for(Y=p.length-1;Y>=0;Y--)U=d.g=p[Y],O=it(U,I,!0,d)&&O;if(U=d.g=r,O=it(U,I,!0,d)&&O,O=it(U,I,!1,d)&&O,p)for(Y=0;Y<p.length;Y++)U=d.g=p[Y],O=it(U,I,!1,d)&&O}fe.prototype.N=function(){if(fe.Z.N.call(this),this.i){var r=this.i;for(const d in r.g){const p=r.g[d];for(let I=0;I<p.length;I++)Q(p[I]);delete r.g[d],r.h--}}this.G=null},fe.prototype.J=function(r,d,p,I){return this.i.add(String(r),d,!1,p,I)},fe.prototype.K=function(r,d,p,I){return this.i.add(String(r),d,!0,p,I)};function it(r,d,p,I){if(d=r.i.g[String(d)],!d)return!0;d=d.concat();let O=!0;for(let U=0;U<d.length;++U){const Y=d[U];if(Y&&!Y.da&&Y.capture==p){const he=Y.listener,at=Y.ha||Y.src;Y.fa&&ye(r.i,Y),O=he.call(at,I)!==!1&&O}}return O&&!I.defaultPrevented}function je(r,d){if(typeof r!="function")if(r&&typeof r.handleEvent=="function")r=u(r.handleEvent,r);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:o.setTimeout(r,d||0)}function xt(r){r.g=je(()=>{r.g=null,r.i&&(r.i=!1,xt(r))},r.l);const d=r.h;r.h=null,r.m.apply(null,d)}class ot extends x{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:xt(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ze(r){x.call(this),this.h=r,this.g={}}_(Ze,x);var Wt=[];function Yn(r){J(r.g,function(d,p){this.g.hasOwnProperty(p)&&Ee(d)},r),r.g={}}Ze.prototype.N=function(){Ze.Z.N.call(this),Yn(this)},Ze.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gi=o.JSON.stringify,B=o.JSON.parse,N=class{stringify(r){return o.JSON.stringify(r,void 0)}parse(r){return o.JSON.parse(r,void 0)}};function z(){}function G(){}var W={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function te(){E.call(this,"d")}_(te,E);function ne(){E.call(this,"c")}_(ne,E);var be={},qe=null;function He(){return qe=qe||new fe}be.Ia="serverreachability";function Et(r){E.call(this,be.Ia,r)}_(Et,E);function Tt(r){const d=He();ve(d,new Et(d))}be.STAT_EVENT="statevent";function Ct(r,d){E.call(this,be.STAT_EVENT,r),this.stat=d}_(Ct,E);function Te(r){const d=He();ve(d,new Ct(d,r))}be.Ja="timingevent";function Nt(r,d){E.call(this,be.Ja,r),this.size=d}_(Nt,E);function mt(r,d){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){r()},d)}function Pe(){this.g=!0}Pe.prototype.ua=function(){this.g=!1};function Re(r,d,p,I,O,U){r.info(function(){if(r.g)if(U){var Y="",he=U.split("&");for(let Le=0;Le<he.length;Le++){var at=he[Le].split("=");if(at.length>1){const lt=at[0];at=at[1];const Qt=lt.split("_");Y=Qt.length>=2&&Qt[1]=="type"?Y+(lt+"="+at+"&"):Y+(lt+"=redacted&")}}}else Y=null;else Y=U;return"XMLHTTP REQ ("+I+") [attempt "+O+"]: "+d+`
`+p+`
`+Y})}function We(r,d,p,I,O,U,Y){r.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+O+"]: "+d+`
`+p+`
`+U+" "+Y})}function $e(r,d,p,I){r.info(function(){return"XMLHTTP TEXT ("+d+"): "+Gt(r,p)+(I?" "+I:"")})}function ft(r,d){r.info(function(){return"TIMEOUT: "+d})}Pe.prototype.info=function(){};function Gt(r,d){if(!r.g)return d;if(!d)return null;try{const U=JSON.parse(d);if(U){for(r=0;r<U.length;r++)if(Array.isArray(U[r])){var p=U[r];if(!(p.length<2)){var I=p[1];if(Array.isArray(I)&&!(I.length<1)){var O=I[0];if(O!="noop"&&O!="stop"&&O!="close")for(let Y=1;Y<I.length;Y++)I[Y]=""}}}}return Gi(U)}catch{return d}}var Mt={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Tl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},kl;function hr(){}_(hr,z),hr.prototype.g=function(){return new XMLHttpRequest},kl=new hr;function Ki(r){return encodeURIComponent(String(r))}function Gh(r){var d=1;r=r.split(":");const p=[];for(;d>0&&r.length;)p.push(r.shift()),d--;return r.length&&p.push(r.join(":")),p}function bn(r,d,p,I){this.j=r,this.i=d,this.l=p,this.S=I||1,this.V=new Ze(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Al}function Al(){this.i=null,this.g="",this.h=!1}var Sl={},mr={};function fr(r,d,p){r.M=1,r.A=Ka(Kt(d)),r.u=p,r.R=!0,Cl(r,null)}function Cl(r,d){r.F=Date.now(),Ga(r),r.B=Kt(r.A);var p=r.B,I=r.S;Array.isArray(I)||(I=[String(I)]),Ul(p.i,"t",I),r.C=0,p=r.j.L,r.h=new Al,r.g=rc(r.j,p?d:null,!r.u),r.P>0&&(r.O=new ot(u(r.Y,r,r.g),r.P)),d=r.V,p=r.g,I=r.ba;var O="readystatechange";Array.isArray(O)||(O&&(Wt[0]=O.toString()),O=Wt);for(let U=0;U<O.length;U++){const Y=Ue(p,O[U],I||d.handleEvent,!1,d.h||d);if(!Y)break;d.g[Y.key]=Y}d=r.J?se(r.J):{},r.u?(r.v||(r.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.B,r.v,r.u,d)):(r.v="GET",r.g.ea(r.B,r.v,null,d)),Tt(),Re(r.i,r.v,r.B,r.l,r.S,r.u)}bn.prototype.ba=function(r){r=r.target;const d=this.O;d&&xn(r)==3?d.j():this.Y(r)},bn.prototype.Y=function(r){try{if(r==this.g)e:{const he=xn(this.g),at=this.g.ya(),Le=this.g.ca();if(!(he<3)&&(he!=3||this.g&&(this.h.h||this.g.la()||Ql(this.g)))){this.K||he!=4||at==7||(at==8||Le<=0?Tt(3):Tt(2)),gr(this);var d=this.g.ca();this.X=d;var p=Kh(this);if(this.o=d==200,We(this.i,this.v,this.B,this.l,this.S,he,d),this.o){if(this.U&&!this.L){t:{if(this.g){var I,O=this.g;if((I=O.g?O.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(I)){var U=I;break t}}U=null}if(r=U)$e(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,yr(this,r);else{this.o=!1,this.m=3,Te(12),Jn(this),Qi(this);break e}}if(this.R){r=!0;let lt;for(;!this.K&&this.C<p.length;)if(lt=Qh(this,p),lt==mr){he==4&&(this.m=4,Te(14),r=!1),$e(this.i,this.l,null,"[Incomplete Response]");break}else if(lt==Sl){this.m=4,Te(15),$e(this.i,this.l,p,"[Invalid Chunk]"),r=!1;break}else $e(this.i,this.l,lt,null),yr(this,lt);if(Pl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||p.length!=0||this.h.h||(this.m=1,Te(16),r=!1),this.o=this.o&&r,!r)$e(this.i,this.l,p,"[Invalid Chunked Response]"),Jn(this),Qi(this);else if(p.length>0&&!this.W){this.W=!0;var Y=this.j;Y.g==this&&Y.aa&&!Y.P&&(Y.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),Tr(Y),Y.P=!0,Te(11))}}else $e(this.i,this.l,p,null),yr(this,p);he==4&&Jn(this),this.o&&!this.K&&(he==4?nc(this.j,this):(this.o=!1,Ga(this)))}else cm(this.g),d==400&&p.indexOf("Unknown SID")>0?(this.m=3,Te(12)):(this.m=0,Te(13)),Jn(this),Qi(this)}}}catch{}};function Kh(r){if(!Pl(r))return r.g.la();const d=Ql(r.g);if(d==="")return"";let p="";const I=d.length,O=xn(r.g)==4;if(!r.h.i){if(typeof TextDecoder>"u")return Jn(r),Qi(r),"";r.h.i=new o.TextDecoder}for(let U=0;U<I;U++)r.h.h=!0,p+=r.h.i.decode(d[U],{stream:!(O&&U==I-1)});return d.length=0,r.h.g+=p,r.C=0,r.h.g}function Pl(r){return r.g?r.v=="GET"&&r.M!=2&&r.j.Aa:!1}function Qh(r,d){var p=r.C,I=d.indexOf(`
`,p);return I==-1?mr:(p=Number(d.substring(p,I)),isNaN(p)?Sl:(I+=1,I+p>d.length?mr:(d=d.slice(I,I+p),r.C=I+p,d)))}bn.prototype.cancel=function(){this.K=!0,Jn(this)};function Ga(r){r.T=Date.now()+r.H,Rl(r,r.H)}function Rl(r,d){if(r.D!=null)throw Error("WatchDog timer not null");r.D=mt(u(r.aa,r),d)}function gr(r){r.D&&(o.clearTimeout(r.D),r.D=null)}bn.prototype.aa=function(){this.D=null;const r=Date.now();r-this.T>=0?(ft(this.i,this.B),this.M!=2&&(Tt(),Te(17)),Jn(this),this.m=2,Qi(this)):Rl(this,this.T-r)};function Qi(r){r.j.I==0||r.K||nc(r.j,r)}function Jn(r){gr(r);var d=r.O;d&&typeof d.dispose=="function"&&d.dispose(),r.O=null,Yn(r.V),r.g&&(d=r.g,r.g=null,d.abort(),d.dispose())}function yr(r,d){try{var p=r.j;if(p.I!=0&&(p.g==r||vr(p.h,r))){if(!r.L&&vr(p.h,r)&&p.I==3){try{var I=p.Ba.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var O=I;if(O[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<r.F)Za(p),Ja(p);else break e;Ir(p),Te(18)}}else p.xa=O[1],0<p.xa-p.K&&O[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=mt(u(p.Va,p),6e3));$l(p.h)<=1&&p.ta&&(p.ta=void 0)}else Zn(p,11)}else if((r.L||p.g==r)&&Za(p),!w(d))for(O=p.Ba.g.parse(d),d=0;d<O.length;d++){let Le=O[d];const lt=Le[0];if(!(lt<=p.K))if(p.K=lt,Le=Le[1],p.I==2)if(Le[0]=="c"){p.M=Le[1],p.ba=Le[2];const Qt=Le[3];Qt!=null&&(p.ka=Qt,p.j.info("VER="+p.ka));const ei=Le[4];ei!=null&&(p.za=ei,p.j.info("SVER="+p.za));const En=Le[5];En!=null&&typeof En=="number"&&En>0&&(I=1.5*En,p.O=I,p.j.info("backChannelRequestTimeoutMs_="+I)),I=p;const In=r.g;if(In){const ts=In.g?In.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ts){var U=I.h;U.g||ts.indexOf("spdy")==-1&&ts.indexOf("quic")==-1&&ts.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(br(U,U.h),U.h=null))}if(I.G){const kr=In.g?In.g.getResponseHeader("X-HTTP-Session-Id"):null;kr&&(I.wa=kr,Oe(I.J,I.G,kr))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-r.F,p.j.info("Handshake RTT: "+p.T+"ms")),I=p;var Y=r;if(I.na=sc(I,I.L?I.ba:null,I.W),Y.L){Nl(I.h,Y);var he=Y,at=I.O;at&&(he.H=at),he.D&&(gr(he),Ga(he)),I.g=Y}else ec(I);p.i.length>0&&Xa(p)}else Le[0]!="stop"&&Le[0]!="close"||Zn(p,7);else p.I==3&&(Le[0]=="stop"||Le[0]=="close"?Le[0]=="stop"?Zn(p,7):Er(p):Le[0]!="noop"&&p.l&&p.l.qa(Le),p.A=0)}}Tt(4)}catch{}}var Yh=class{constructor(r,d){this.g=r,this.map=d}};function Ll(r){this.l=r||10,o.PerformanceNavigationTiming?(r=o.performance.getEntriesByType("navigation"),r=r.length>0&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Dl(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function $l(r){return r.h?1:r.g?r.g.size:0}function vr(r,d){return r.h?r.h==d:r.g?r.g.has(d):!1}function br(r,d){r.g?r.g.add(d):r.h=d}function Nl(r,d){r.h&&r.h==d?r.h=null:r.g&&r.g.has(d)&&r.g.delete(d)}Ll.prototype.cancel=function(){if(this.i=Ml(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function Ml(r){if(r.h!=null)return r.i.concat(r.h.G);if(r.g!=null&&r.g.size!==0){let d=r.i;for(const p of r.g.values())d=d.concat(p.G);return d}return R(r.i)}var Ol=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jh(r,d){if(r){r=r.split("&");for(let p=0;p<r.length;p++){const I=r[p].indexOf("=");let O,U=null;I>=0?(O=r[p].substring(0,I),U=r[p].substring(I+1)):O=r[p],d(O,U?decodeURIComponent(U.replace(/\+/g," ")):"")}}}function wn(r){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;r instanceof wn?(this.l=r.l,Yi(this,r.j),this.o=r.o,this.g=r.g,Ji(this,r.u),this.h=r.h,wr(this,jl(r.i)),this.m=r.m):r&&(d=String(r).match(Ol))?(this.l=!1,Yi(this,d[1]||"",!0),this.o=Xi(d[2]||""),this.g=Xi(d[3]||"",!0),Ji(this,d[4]),this.h=Xi(d[5]||"",!0),wr(this,d[6]||"",!0),this.m=Xi(d[7]||"")):(this.l=!1,this.i=new ea(null,this.l))}wn.prototype.toString=function(){const r=[];var d=this.j;d&&r.push(Zi(d,Vl,!0),":");var p=this.g;return(p||d=="file")&&(r.push("//"),(d=this.o)&&r.push(Zi(d,Vl,!0),"@"),r.push(Ki(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&r.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&r.push("/"),r.push(Zi(p,p.charAt(0)=="/"?em:Zh,!0))),(p=this.i.toString())&&r.push("?",p),(p=this.m)&&r.push("#",Zi(p,nm)),r.join("")},wn.prototype.resolve=function(r){const d=Kt(this);let p=!!r.j;p?Yi(d,r.j):p=!!r.o,p?d.o=r.o:p=!!r.g,p?d.g=r.g:p=r.u!=null;var I=r.h;if(p)Ji(d,r.u);else if(p=!!r.h){if(I.charAt(0)!="/")if(this.g&&!this.h)I="/"+I;else{var O=d.h.lastIndexOf("/");O!=-1&&(I=d.h.slice(0,O+1)+I)}if(O=I,O==".."||O==".")I="";else if(O.indexOf("./")!=-1||O.indexOf("/.")!=-1){I=O.lastIndexOf("/",0)==0,O=O.split("/");const U=[];for(let Y=0;Y<O.length;){const he=O[Y++];he=="."?I&&Y==O.length&&U.push(""):he==".."?((U.length>1||U.length==1&&U[0]!="")&&U.pop(),I&&Y==O.length&&U.push("")):(U.push(he),I=!0)}I=U.join("/")}else I=O}return p?d.h=I:p=r.i.toString()!=="",p?wr(d,jl(r.i)):p=!!r.m,p&&(d.m=r.m),d};function Kt(r){return new wn(r)}function Yi(r,d,p){r.j=p?Xi(d,!0):d,r.j&&(r.j=r.j.replace(/:$/,""))}function Ji(r,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);r.u=d}else r.u=null}function wr(r,d,p){d instanceof ea?(r.i=d,im(r.i,r.l)):(p||(d=Zi(d,tm)),r.i=new ea(d,r.l))}function Oe(r,d,p){r.i.set(d,p)}function Ka(r){return Oe(r,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),r}function Xi(r,d){return r?d?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Zi(r,d,p){return typeof r=="string"?(r=encodeURI(r).replace(d,Xh),p&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Xh(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var Vl=/[#\/\?@]/g,Zh=/[#\?:]/g,em=/[#\?]/g,tm=/[#\?@]/g,nm=/#/g;function ea(r,d){this.h=this.g=null,this.i=r||null,this.j=!!d}function Xn(r){r.g||(r.g=new Map,r.h=0,r.i&&Jh(r.i,function(d,p){r.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}n=ea.prototype,n.add=function(r,d){Xn(this),this.i=null,r=xi(this,r);let p=this.g.get(r);return p||this.g.set(r,p=[]),p.push(d),this.h+=1,this};function Bl(r,d){Xn(r),d=xi(r,d),r.g.has(d)&&(r.i=null,r.h-=r.g.get(d).length,r.g.delete(d))}function Fl(r,d){return Xn(r),d=xi(r,d),r.g.has(d)}n.forEach=function(r,d){Xn(this),this.g.forEach(function(p,I){p.forEach(function(O){r.call(d,O,I,this)},this)},this)};function zl(r,d){Xn(r);let p=[];if(typeof d=="string")Fl(r,d)&&(p=p.concat(r.g.get(xi(r,d))));else for(r=Array.from(r.g.values()),d=0;d<r.length;d++)p=p.concat(r[d]);return p}n.set=function(r,d){return Xn(this),this.i=null,r=xi(this,r),Fl(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[d]),this.h+=1,this},n.get=function(r,d){return r?(r=zl(this,r),r.length>0?String(r[0]):d):d};function Ul(r,d,p){Bl(r,d),p.length>0&&(r.i=null,r.g.set(xi(r,d),R(p)),r.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],d=Array.from(this.g.keys());for(let I=0;I<d.length;I++){var p=d[I];const O=Ki(p);p=zl(this,p);for(let U=0;U<p.length;U++){let Y=O;p[U]!==""&&(Y+="="+Ki(p[U])),r.push(Y)}}return this.i=r.join("&")};function jl(r){const d=new ea;return d.i=r.i,r.g&&(d.g=new Map(r.g),d.h=r.h),d}function xi(r,d){return d=String(d),r.j&&(d=d.toLowerCase()),d}function im(r,d){d&&!r.j&&(Xn(r),r.i=null,r.g.forEach(function(p,I){const O=I.toLowerCase();I!=O&&(Bl(this,I),Ul(this,O,p))},r)),r.j=d}function am(r,d){const p=new Pe;if(o.Image){const I=new Image;I.onload=h(_n,p,"TestLoadImage: loaded",!0,d,I),I.onerror=h(_n,p,"TestLoadImage: error",!1,d,I),I.onabort=h(_n,p,"TestLoadImage: abort",!1,d,I),I.ontimeout=h(_n,p,"TestLoadImage: timeout",!1,d,I),o.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=r}else d(!1)}function sm(r,d){const p=new Pe,I=new AbortController,O=setTimeout(()=>{I.abort(),_n(p,"TestPingServer: timeout",!1,d)},1e4);fetch(r,{signal:I.signal}).then(U=>{clearTimeout(O),U.ok?_n(p,"TestPingServer: ok",!0,d):_n(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),_n(p,"TestPingServer: error",!1,d)})}function _n(r,d,p,I,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),I(p)}catch{}}function rm(){this.g=new N}function _r(r){this.i=r.Sb||null,this.h=r.ab||!1}_(_r,z),_r.prototype.g=function(){return new Qa(this.i,this.h)};function Qa(r,d){fe.call(this),this.H=r,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}_(Qa,fe),n=Qa.prototype,n.open=function(r,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=r,this.D=d,this.readyState=1,na(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};r&&(d.body=r),(this.H||o).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ta(this)),this.readyState=0},n.Pa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,na(this)),this.g&&(this.readyState=3,na(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ql(this)}else r.text().then(this.Oa.bind(this),this.ga.bind(this))};function ql(r){r.j.read().then(r.Ma.bind(r)).catch(r.ga.bind(r))}n.Ma=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var d=r.value?r.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!r.done}))&&(this.response=this.responseText+=d)}r.done?ta(this):na(this),this.readyState==3&&ql(this)}},n.Oa=function(r){this.g&&(this.response=this.responseText=r,ta(this))},n.Na=function(r){this.g&&(this.response=r,ta(this))},n.ga=function(){this.g&&ta(this)};function ta(r){r.readyState=4,r.l=null,r.j=null,r.B=null,na(r)}n.setRequestHeader=function(r,d){this.A.append(r,d)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,r.push(p[0]+": "+p[1]),p=d.next();return r.join(`\r
`)};function na(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Qa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Hl(r){let d="";return J(r,function(p,I){d+=I,d+=":",d+=p,d+=`\r
`}),d}function xr(r,d,p){e:{for(I in p){var I=!1;break e}I=!0}I||(p=Hl(p),typeof r=="string"?p!=null&&Ki(p):Oe(r,d,p))}function Ge(r){fe.call(this),this.headers=new Map,this.L=r||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}_(Ge,fe);var om=/^https?$/i,lm=["POST","PUT"];n=Ge.prototype,n.Fa=function(r){this.H=r},n.ea=function(r,d,p,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);d=d?d.toUpperCase():"GET",this.D=r,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():kl.g(),this.g.onreadystatechange=b(u(this.Ca,this));try{this.B=!0,this.g.open(d,String(r),!0),this.B=!1}catch(U){Wl(this,U);return}if(r=p||"",p=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var O in I)p.set(O,I[O]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const U of I.keys())p.set(U,I.get(U));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(p.keys()).find(U=>U.toLowerCase()=="content-type"),O=o.FormData&&r instanceof o.FormData,!(Array.prototype.indexOf.call(lm,d,void 0)>=0)||I||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Y]of p)this.g.setRequestHeader(U,Y);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(r),this.v=!1}catch(U){Wl(this,U)}};function Wl(r,d){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=d,r.o=5,Gl(r),Ya(r)}function Gl(r){r.A||(r.A=!0,ve(r,"complete"),ve(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=r||7,ve(this,"complete"),ve(this,"abort"),Ya(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ya(this,!0)),Ge.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Kl(this):this.Xa())},n.Xa=function(){Kl(this)};function Kl(r){if(r.h&&typeof s<"u"){if(r.v&&xn(r)==4)setTimeout(r.Ca.bind(r),0);else if(ve(r,"readystatechange"),xn(r)==4){r.h=!1;try{const U=r.ca();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var I;if(I=U===0){let Y=String(r.D).match(Ol)[1]||null;!Y&&o.self&&o.self.location&&(Y=o.self.location.protocol.slice(0,-1)),I=!om.test(Y?Y.toLowerCase():"")}p=I}if(p)ve(r,"complete"),ve(r,"success");else{r.o=6;try{var O=xn(r)>2?r.g.statusText:""}catch{O=""}r.l=O+" ["+r.ca()+"]",Gl(r)}}finally{Ya(r)}}}}function Ya(r,d){if(r.g){r.m&&(clearTimeout(r.m),r.m=null);const p=r.g;r.g=null,d||ve(r,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function xn(r){return r.g?r.g.readyState:0}n.ca=function(){try{return xn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(r){if(this.g){var d=this.g.responseText;return r&&d.indexOf(r)==0&&(d=d.substring(r.length)),B(d)}};function Ql(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.F){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function cm(r){const d={};r=(r.g&&xn(r)>=2&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<r.length;I++){if(w(r[I]))continue;var p=Gh(r[I]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const U=d[O]||[];d[O]=U,U.push(p)}Z(d,function(I){return I.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ia(r,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[r]||d}function Yl(r){this.za=0,this.i=[],this.j=new Pe,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ia("failFast",!1,r),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ia("baseRetryDelayMs",5e3,r),this.Za=ia("retryDelaySeedMs",1e4,r),this.Ta=ia("forwardChannelMaxRetries",2,r),this.va=ia("forwardChannelRequestTimeoutMs",2e4,r),this.ma=r&&r.xmlHttpFactory||void 0,this.Ua=r&&r.Rb||void 0,this.Aa=r&&r.useFetchStreams||!1,this.O=void 0,this.L=r&&r.supportsCrossDomainXhr||!1,this.M="",this.h=new Ll(r&&r.concurrentRequestLimit),this.Ba=new rm,this.S=r&&r.fastHandshake||!1,this.R=r&&r.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=r&&r.Pb||!1,r&&r.ua&&this.j.ua(),r&&r.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&r&&r.detectBufferingProxy||!1,this.ia=void 0,r&&r.longPollingTimeout&&r.longPollingTimeout>0&&(this.ia=r.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Yl.prototype,n.ka=8,n.I=1,n.connect=function(r,d,p,I){Te(0),this.W=r,this.H=d||{},p&&I!==void 0&&(this.H.OSID=p,this.H.OAID=I),this.F=this.X,this.J=sc(this,null,this.W),Xa(this)};function Er(r){if(Jl(r),r.I==3){var d=r.V++,p=Kt(r.J);if(Oe(p,"SID",r.M),Oe(p,"RID",d),Oe(p,"TYPE","terminate"),aa(r,p),d=new bn(r,r.j,d),d.M=2,d.A=Ka(Kt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(d.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=d.A,p=!0),p||(d.g=rc(d.j,null),d.g.ea(d.A)),d.F=Date.now(),Ga(d)}ac(r)}function Ja(r){r.g&&(Tr(r),r.g.cancel(),r.g=null)}function Jl(r){Ja(r),r.v&&(o.clearTimeout(r.v),r.v=null),Za(r),r.h.cancel(),r.m&&(typeof r.m=="number"&&o.clearTimeout(r.m),r.m=null)}function Xa(r){if(!Dl(r.h)&&!r.m){r.m=!0;var d=r.Ea;T||m(),A||(T(),A=!0),f.add(d,r),r.D=0}}function dm(r,d){return $l(r.h)>=r.h.j-(r.m?1:0)?!1:r.m?(r.i=d.G.concat(r.i),!0):r.I==1||r.I==2||r.D>=(r.Sa?0:r.Ta)?!1:(r.m=mt(u(r.Ea,r,d),ic(r,r.D)),r.D++,!0)}n.Ea=function(r){if(this.m)if(this.m=null,this.I==1){if(!r){this.V=Math.floor(Math.random()*1e5),r=this.V++;const O=new bn(this,this.j,r);let U=this.o;if(this.U&&(U?(U=se(U),le(U,this.U)):U=this.U),this.u!==null||this.R||(O.J=U,U=null),this.S)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var I=this.i[p];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,d>4096){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=Zl(this,O,d),p=Kt(this.J),Oe(p,"RID",r),Oe(p,"CVER",22),this.G&&Oe(p,"X-HTTP-Session-Id",this.G),aa(this,p),U&&(this.R?d="headers="+Ki(Hl(U))+"&"+d:this.u&&xr(p,this.u,U)),br(this.h,O),this.Ra&&Oe(p,"TYPE","init"),this.S?(Oe(p,"$req",d),Oe(p,"SID","null"),O.U=!0,fr(O,p,null)):fr(O,p,d),this.I=2}}else this.I==3&&(r?Xl(this,r):this.i.length==0||Dl(this.h)||Xl(this))};function Xl(r,d){var p;d?p=d.l:p=r.V++;const I=Kt(r.J);Oe(I,"SID",r.M),Oe(I,"RID",p),Oe(I,"AID",r.K),aa(r,I),r.u&&r.o&&xr(I,r.u,r.o),p=new bn(r,r.j,p,r.D+1),r.u===null&&(p.J=r.o),d&&(r.i=d.G.concat(r.i)),d=Zl(r,p,1e3),p.H=Math.round(r.va*.5)+Math.round(r.va*.5*Math.random()),br(r.h,p),fr(p,I,d)}function aa(r,d){r.H&&J(r.H,function(p,I){Oe(d,I,p)}),r.l&&J({},function(p,I){Oe(d,I,p)})}function Zl(r,d,p){p=Math.min(r.i.length,p);const I=r.l?u(r.l.Ka,r.l,r):null;e:{var O=r.i;let he=-1;for(;;){const at=["count="+p];he==-1?p>0?(he=O[0].g,at.push("ofs="+he)):he=0:at.push("ofs="+he);let Le=!0;for(let lt=0;lt<p;lt++){var U=O[lt].g;const Qt=O[lt].map;if(U-=he,U<0)he=Math.max(0,O[lt].g-100),Le=!1;else try{U="req"+U+"_"||"";try{var Y=Qt instanceof Map?Qt:Object.entries(Qt);for(const[ei,En]of Y){let In=En;l(En)&&(In=Gi(En)),at.push(U+ei+"="+encodeURIComponent(In))}}catch(ei){throw at.push(U+"type="+encodeURIComponent("_badmap")),ei}}catch{I&&I(Qt)}}if(Le){Y=at.join("&");break e}}Y=void 0}return r=r.i.splice(0,p),d.G=r,Y}function ec(r){if(!r.g&&!r.v){r.Y=1;var d=r.Da;T||m(),A||(T(),A=!0),f.add(d,r),r.A=0}}function Ir(r){return r.g||r.v||r.A>=3?!1:(r.Y++,r.v=mt(u(r.Da,r),ic(r,r.A)),r.A++,!0)}n.Da=function(){if(this.v=null,tc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var r=4*this.T;this.j.info("BP detection timer enabled: "+r),this.B=mt(u(this.Wa,this),r)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Te(10),Ja(this),tc(this))};function Tr(r){r.B!=null&&(o.clearTimeout(r.B),r.B=null)}function tc(r){r.g=new bn(r,r.j,"rpc",r.Y),r.u===null&&(r.g.J=r.o),r.g.P=0;var d=Kt(r.na);Oe(d,"RID","rpc"),Oe(d,"SID",r.M),Oe(d,"AID",r.K),Oe(d,"CI",r.F?"0":"1"),!r.F&&r.ia&&Oe(d,"TO",r.ia),Oe(d,"TYPE","xmlhttp"),aa(r,d),r.u&&r.o&&xr(d,r.u,r.o),r.O&&(r.g.H=r.O);var p=r.g;r=r.ba,p.M=1,p.A=Ka(Kt(d)),p.u=null,p.R=!0,Cl(p,r)}n.Va=function(){this.C!=null&&(this.C=null,Ja(this),Ir(this),Te(19))};function Za(r){r.C!=null&&(o.clearTimeout(r.C),r.C=null)}function nc(r,d){var p=null;if(r.g==d){Za(r),Tr(r),r.g=null;var I=2}else if(vr(r.h,d))p=d.G,Nl(r.h,d),I=1;else return;if(r.I!=0){if(d.o)if(I==1){p=d.u?d.u.length:0,d=Date.now()-d.F;var O=r.D;I=He(),ve(I,new Nt(I,p)),Xa(r)}else ec(r);else if(O=d.m,O==3||O==0&&d.X>0||!(I==1&&dm(r,d)||I==2&&Ir(r)))switch(p&&p.length>0&&(d=r.h,d.i=d.i.concat(p)),O){case 1:Zn(r,5);break;case 4:Zn(r,10);break;case 3:Zn(r,6);break;default:Zn(r,2)}}}function ic(r,d){let p=r.Qa+Math.floor(Math.random()*r.Za);return r.isActive()||(p*=2),p*d}function Zn(r,d){if(r.j.info("Error code "+d),d==2){var p=u(r.bb,r),I=r.Ua;const O=!I;I=new wn(I||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Yi(I,"https"),Ka(I),O?am(I.toString(),p):sm(I.toString(),p)}else Te(2);r.I=0,r.l&&r.l.pa(d),ac(r),Jl(r)}n.bb=function(r){r?(this.j.info("Successfully pinged google.com"),Te(2)):(this.j.info("Failed to ping google.com"),Te(1))};function ac(r){if(r.I=0,r.ja=[],r.l){const d=Ml(r.h);(d.length!=0||r.i.length!=0)&&(M(r.ja,d),M(r.ja,r.i),r.h.i.length=0,R(r.i),r.i.length=0),r.l.oa()}}function sc(r,d,p){var I=p instanceof wn?Kt(p):new wn(p);if(I.g!="")d&&(I.g=d+"."+I.g),Ji(I,I.u);else{var O=o.location;I=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;const U=new wn(null);I&&Yi(U,I),d&&(U.g=d),O&&Ji(U,O),p&&(U.h=p),I=U}return p=r.G,d=r.wa,p&&d&&Oe(I,p,d),Oe(I,"VER",r.ka),aa(r,I),I}function rc(r,d,p){if(d&&!r.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=r.Aa&&!r.ma?new Ge(new _r({ab:p})):new Ge(r.ma),d.Fa(r.L),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oc(){}n=oc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function es(){}es.prototype.g=function(r,d){return new Pt(r,d)};function Pt(r,d){fe.call(this),this.g=new Yl(d),this.l=r,this.h=d&&d.messageUrlParams||null,r=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(r?r["X-WebChannel-Content-Type"]=d.messageContentType:r={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(r?r["X-WebChannel-Client-Profile"]=d.sa:r={"X-WebChannel-Client-Profile":d.sa}),this.g.U=r,(r=d&&d.Qb)&&!w(r)&&(this.g.u=r),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!w(d)&&(this.g.G=d,r=this.h,r!==null&&d in r&&(r=this.h,d in r&&delete r[d])),this.j=new Ei(this)}_(Pt,fe),Pt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Pt.prototype.close=function(){Er(this.g)},Pt.prototype.o=function(r){var d=this.g;if(typeof r=="string"){var p={};p.__data__=r,r=p}else this.v&&(p={},p.__data__=Gi(r),r=p);d.i.push(new Yh(d.Ya++,r)),d.I==3&&Xa(d)},Pt.prototype.N=function(){this.g.l=null,delete this.j,Er(this.g),delete this.g,Pt.Z.N.call(this)};function lc(r){te.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var d=r.__sm__;if(d){e:{for(const p in d){r=p;break e}r=void 0}(this.i=r)&&(r=this.i,d=d!==null&&r in d?d[r]:void 0),this.data=d}else this.data=r}_(lc,te);function cc(){ne.call(this),this.status=1}_(cc,ne);function Ei(r){this.g=r}_(Ei,oc),Ei.prototype.ra=function(){ve(this.g,"a")},Ei.prototype.qa=function(r){ve(this.g,new lc(r))},Ei.prototype.pa=function(r){ve(this.g,new cc)},Ei.prototype.oa=function(){ve(this.g,"b")},es.prototype.createWebChannel=es.prototype.g,Pt.prototype.send=Pt.prototype.o,Pt.prototype.open=Pt.prototype.m,Pt.prototype.close=Pt.prototype.close,ip=function(){return new es},np=function(){return He()},tp=be,to={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Mt.NO_ERROR=0,Mt.TIMEOUT=8,Mt.HTTP_ERROR=6,fs=Mt,Tl.COMPLETE="complete",ep=Tl,G.EventType=W,W.OPEN="a",W.CLOSE="b",W.ERROR="c",W.MESSAGE="d",fe.prototype.listen=fe.prototype.J,pa=G,Ge.prototype.listenOnce=Ge.prototype.K,Ge.prototype.getLastError=Ge.prototype.Ha,Ge.prototype.getLastErrorCode=Ge.prototype.ya,Ge.prototype.getStatus=Ge.prototype.ca,Ge.prototype.getResponseJson=Ge.prototype.La,Ge.prototype.getResponseText=Ge.prototype.la,Ge.prototype.send=Ge.prototype.ea,Ge.prototype.setWithCredentials=Ge.prototype.Fa,Zu=Ge}).apply(typeof is<"u"?is:typeof self<"u"?self:typeof window<"u"?window:{});class yt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}yt.UNAUTHENTICATED=new yt(null),yt.GOOGLE_CREDENTIALS=new yt("google-credentials-uid"),yt.FIRST_PARTY=new yt("first-party-uid"),yt.MOCK_USER=new yt("mock-user");let Ui="12.9.0";function pv(n){Ui=n}const pi=new _o("@firebase/firestore");function Ti(){return pi.logLevel}function ee(n,...e){if(pi.logLevel<=we.DEBUG){const t=e.map(Do);pi.debug(`Firestore (${Ui}): ${n}`,...t)}}function fn(n,...e){if(pi.logLevel<=we.ERROR){const t=e.map(Do);pi.error(`Firestore (${Ui}): ${n}`,...t)}}function hi(n,...e){if(pi.logLevel<=we.WARN){const t=e.map(Do);pi.warn(`Firestore (${Ui}): ${n}`,...t)}}function Do(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}function oe(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,ap(n,i,t)}function ap(n,e,t){let i=`FIRESTORE (${Ui}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw fn(i),new Error(i)}function Se(n,e,t,i){let a="Unexpected state";typeof t=="string"?a=t:i=t,n||ap(e,a,i)}function ue(n,e){return n}const q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends rn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class dn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}class sp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(yt.UNAUTHENTICATED)))}shutdown(){}}class mv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class fv{constructor(e){this.t=e,this.currentUser=yt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Se(this.o===void 0,42304);let i=this.i;const a=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let s=new dn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new dn,e.enqueueRetryable((()=>a(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await a(this.currentUser)}))},l=c=>{ee("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(ee("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new dn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(ee("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Se(typeof i.accessToken=="string",31837,{l:i}),new sp(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Se(e===null||typeof e=="string",2055,{h:e}),new yt(e)}}class gv{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=yt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class yv{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new gv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(yt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Uc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class vv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Lt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Se(this.o===void 0,3512);const i=s=>{s.error!=null&&ee("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,ee("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>i(s)))};const a=s=>{ee("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>a(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?a(s):ee("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Uc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Uc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function bv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}class $o{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const a=bv(40);for(let s=0;s<a.length;++s)i.length<20&&a[s]<t&&(i+=e.charAt(a[s]%62))}return i}}function _e(n,e){return n<e?-1:n>e?1:0}function no(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const a=n.charAt(i),s=e.charAt(i);if(a!==s)return $r(a)===$r(s)?_e(a,s):$r(a)?1:-1}return _e(n.length,e.length)}const wv=55296,_v=57343;function $r(n){const e=n.charCodeAt(0);return e>=wv&&e<=_v}function Mi(n,e,t){return n.length===e.length&&n.every(((i,a)=>t(i,e[a])))}const jc="__name__";class Yt{constructor(e,t,i){t===void 0?t=0:t>e.length&&oe(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&oe(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Yt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Yt?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let a=0;a<i;a++){const s=Yt.compareSegments(e.get(a),t.get(a));if(s!==0)return s}return _e(e.length,t.length)}static compareSegments(e,t){const i=Yt.isNumericId(e),a=Yt.isNumericId(t);return i&&!a?-1:!i&&a?1:i&&a?Yt.extractNumericId(e).compare(Yt.extractNumericId(t)):no(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return $n.fromString(e.substring(4,e.length-2))}}class Ne extends Yt{construct(e,t,i){return new Ne(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new X(q.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((a=>a.length>0)))}return new Ne(t)}static emptyPath(){return new Ne([])}}const xv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pt extends Yt{construct(e,t,i){return new pt(e,t,i)}static isValidIdentifier(e){return xv.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===jc}static keyField(){return new pt([jc])}static fromServerFormat(e){const t=[];let i="",a=0;const s=()=>{if(i.length===0)throw new X(q.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;a<e.length;){const l=e[a];if(l==="\\"){if(a+1===e.length)throw new X(q.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[a+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new X(q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,a+=2}else l==="`"?(o=!o,a++):l!=="."||o?(i+=l,a++):(s(),a++)}if(s(),o)throw new X(q.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pt(t)}static emptyPath(){return new pt([])}}class ie{constructor(e){this.path=e}static fromPath(e){return new ie(Ne.fromString(e))}static fromName(e){return new ie(Ne.fromString(e).popFirst(5))}static empty(){return new ie(Ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new Ne(e.slice()))}}function rp(n,e,t){if(!t)throw new X(q.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ev(n,e,t,i){if(e===!0&&i===!0)throw new X(q.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function qc(n){if(!ie.isDocumentKey(n))throw new X(q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Hc(n){if(ie.isDocumentKey(n))throw new X(q.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function op(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Gs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":oe(12329,{type:typeof n})}function St(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new X(q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Gs(n);throw new X(q.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function nt(n,e){const t={typeString:n};return e&&(t.value=e),t}function za(n,e){if(!op(n))throw new X(q.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const a=e[i].typeString,s="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const o=n[i];if(a&&typeof o!==a){t=`JSON field '${i}' must be a ${a}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${i}' field to equal '${s.value}'`;break}}if(t)throw new X(q.INVALID_ARGUMENT,t);return!0}const Wc=-62135596800,Gc=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Gc);return new ge(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new X(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new X(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Wc)throw new X(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gc}_compareTo(e){return this.seconds===e.seconds?_e(this.nanoseconds,e.nanoseconds):_e(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(za(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:nt("string",ge._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};class de{static fromTimestamp(e){return new de(e)}static min(){return new de(new ge(0,0))}static max(){return new de(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Aa=-1;function Iv(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,a=de.fromTimestamp(i===1e9?new ge(t+1,0):new ge(t,i));return new Bn(a,ie.empty(),e)}function Tv(n){return new Bn(n.readTime,n.key,Aa)}class Bn{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Bn(de.min(),ie.empty(),Aa)}static max(){return new Bn(de.max(),ie.empty(),Aa)}}function kv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=ie.comparator(n.documentKey,e.documentKey),t!==0?t:_e(n.largestBatchId,e.largestBatchId))}const Av="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Sv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}async function ji(n){if(n.code!==q.FAILED_PRECONDITION||n.message!==Av)throw n;ee("LocalStore","Unexpectedly lost primary lease")}class H{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&oe(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new H(((i,a)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(i,a)},this.catchCallback=s=>{this.wrapFailure(t,s).next(i,a)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof H?t:H.resolve(t)}catch(t){return H.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):H.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):H.reject(t)}static resolve(e){return new H(((t,i)=>{t(e)}))}static reject(e){return new H(((t,i)=>{i(e)}))}static waitFor(e){return new H(((t,i)=>{let a=0,s=0,o=!1;e.forEach((l=>{++a,l.next((()=>{++s,o&&s===a&&t()}),(c=>i(c)))})),o=!0,s===a&&t()}))}static or(e){let t=H.resolve(!1);for(const i of e)t=t.next((a=>a?H.resolve(a):i()));return t}static forEach(e,t){const i=[];return e.forEach(((a,s)=>{i.push(t.call(this,a,s))})),this.waitFor(i)}static mapArray(e,t){return new H(((i,a)=>{const s=e.length,o=new Array(s);let l=0;for(let c=0;c<s;c++){const u=c;t(e[u]).next((h=>{o[u]=h,++l,l===s&&i(o)}),(h=>a(h)))}}))}static doWhile(e,t){return new H(((i,a)=>{const s=()=>{e()===!0?t().next((()=>{s()}),a):i()};s()}))}}function Cv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function qi(n){return n.name==="IndexedDbTransactionError"}class Ks{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>t.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ks.ce=-1;const No=-1;function Qs(n){return n==null}function Cs(n){return n===0&&1/n==-1/0}function Pv(n){return typeof n=="number"&&Number.isInteger(n)&&!Cs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const lp="";function Rv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Kc(e)),e=Lv(n.get(t),e);return Kc(e)}function Lv(n,e){let t=e;const i=n.length;for(let a=0;a<i;a++){const s=n.charAt(a);switch(s){case"\0":t+="";break;case lp:t+="";break;default:t+=s}}return t}function Kc(n){return n+lp+""}function Qc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Kn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function cp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}class ze{constructor(e,t){this.comparator=e,this.root=t||ut.EMPTY}insert(e,t){return new ze(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(e){return new ze(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ut.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const a=this.comparator(e,i.key);if(a===0)return t+i.left.size;a<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,i)=>(e(t,i),!1)))}toString(){const e=[];return this.inorderTraversal(((t,i)=>(e.push(`${t}:${i}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new as(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new as(this.root,e,this.comparator,!1)}getReverseIterator(){return new as(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new as(this.root,e,this.comparator,!0)}}class as{constructor(e,t,i,a){this.isReverse=a,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?i(e.key,t):1,t&&a&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ut{constructor(e,t,i,a,s){this.key=e,this.value=t,this.color=i??ut.RED,this.left=a??ut.EMPTY,this.right=s??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,a,s){return new ut(e??this.key,t??this.value,i??this.color,a??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let a=this;const s=i(e,a.key);return a=s<0?a.copy(null,null,null,a.left.insert(e,t,i),null):s===0?a.copy(null,t,null,null,null):a.copy(null,null,null,null,a.right.insert(e,t,i)),a.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,a=this;if(t(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,t),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),t(e,a.key)===0){if(a.right.isEmpty())return ut.EMPTY;i=a.right.min(),a=a.copy(i.key,i.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,t))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw oe(43730,{key:this.key,value:this.value});if(this.right.isRed())throw oe(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw oe(27949);return e+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw oe(57766)}get value(){throw oe(16141)}get color(){throw oe(16727)}get left(){throw oe(29726)}get right(){throw oe(36894)}copy(e,t,i,a,s){return this}insert(e,t,i){return new ut(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class st{constructor(e){this.comparator=e,this.data=new ze(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,i)=>(e(t),!1)))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const a=i.getNext();if(this.comparator(a.key,e[1])>=0)return;t(a.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Yc(this.data.getIterator())}getIteratorFrom(e){return new Yc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((i=>{t=t.add(i)})),t}isEqual(e){if(!(e instanceof st)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const a=t.getNext().key,s=i.getNext().key;if(this.comparator(a,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new st(this.comparator);return t.data=e,t}}class Yc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class Dt{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new Dt([])}unionWith(e){let t=new st(pt.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Dt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mi(this.fields,e.fields,((t,i)=>t.isEqual(i)))}}class dp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class ht{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(a){try{return atob(a)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new dp("Invalid base64 string: "+s):s}})(e);return new ht(t)}static fromUint8Array(e){const t=(function(a){let s="";for(let o=0;o<a.length;++o)s+=String.fromCharCode(a[o]);return s})(e);return new ht(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _e(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Dv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Fn(n){if(Se(!!n,39018),typeof n=="string"){let e=0;const t=Dv.exec(n);if(Se(!!t,46558,{timestamp:n}),t[1]){let a=t[1];a=(a+"000000000").substr(0,9),e=Number(a)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:Je(n.seconds),nanos:Je(n.nanos)}}function Je(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function zn(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}const up="server_timestamp",pp="__type__",hp="__previous_value__",mp="__local_write_time__";function Mo(n){return(n?.mapValue?.fields||{})[pp]?.stringValue===up}function Ys(n){const e=n.mapValue.fields[hp];return Mo(e)?Ys(e):e}function Sa(n){const e=Fn(n.mapValue.fields[mp].timestampValue);return new ge(e.seconds,e.nanos)}class $v{constructor(e,t,i,a,s,o,l,c,u,h,_){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=a,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=h,this.apiKey=_}}const Ps="(default)";class Ca{constructor(e,t){this.projectId=e,this.database=t||Ps}static empty(){return new Ca("","")}get isDefaultDatabase(){return this.database===Ps}isEqual(e){return e instanceof Ca&&e.projectId===this.projectId&&e.database===this.database}}function Nv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new X(q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ca(n.options.projectId,e)}const fp="__type__",Mv="__max__",ss={mapValue:{}},gp="__vector__",Rs="value";function Un(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Mo(n)?4:Vv(n)?9007199254740991:Ov(n)?10:11:oe(28295,{value:n})}function sn(n,e){if(n===e)return!0;const t=Un(n);if(t!==Un(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Sa(n).isEqual(Sa(e));case 3:return(function(a,s){if(typeof a.timestampValue=="string"&&typeof s.timestampValue=="string"&&a.timestampValue.length===s.timestampValue.length)return a.timestampValue===s.timestampValue;const o=Fn(a.timestampValue),l=Fn(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(a,s){return zn(a.bytesValue).isEqual(zn(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(a,s){return Je(a.geoPointValue.latitude)===Je(s.geoPointValue.latitude)&&Je(a.geoPointValue.longitude)===Je(s.geoPointValue.longitude)})(n,e);case 2:return(function(a,s){if("integerValue"in a&&"integerValue"in s)return Je(a.integerValue)===Je(s.integerValue);if("doubleValue"in a&&"doubleValue"in s){const o=Je(a.doubleValue),l=Je(s.doubleValue);return o===l?Cs(o)===Cs(l):isNaN(o)&&isNaN(l)}return!1})(n,e);case 9:return Mi(n.arrayValue.values||[],e.arrayValue.values||[],sn);case 10:case 11:return(function(a,s){const o=a.mapValue.fields||{},l=s.mapValue.fields||{};if(Qc(o)!==Qc(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!sn(o[c],l[c])))return!1;return!0})(n,e);default:return oe(52216,{left:n})}}function Pa(n,e){return(n.values||[]).find((t=>sn(t,e)))!==void 0}function Oi(n,e){if(n===e)return 0;const t=Un(n),i=Un(e);if(t!==i)return _e(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return _e(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const l=Je(s.integerValue||s.doubleValue),c=Je(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(n,e);case 3:return Jc(n.timestampValue,e.timestampValue);case 4:return Jc(Sa(n),Sa(e));case 5:return no(n.stringValue,e.stringValue);case 6:return(function(s,o){const l=zn(s),c=zn(o);return l.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const l=s.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const h=_e(l[u],c[u]);if(h!==0)return h}return _e(l.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const l=_e(Je(s.latitude),Je(o.latitude));return l!==0?l:_e(Je(s.longitude),Je(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Xc(n.arrayValue,e.arrayValue);case 10:return(function(s,o){const l=s.fields||{},c=o.fields||{},u=l[Rs]?.arrayValue,h=c[Rs]?.arrayValue,_=_e(u?.values?.length||0,h?.values?.length||0);return _!==0?_:Xc(u,h)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===ss.mapValue&&o===ss.mapValue)return 0;if(s===ss.mapValue)return 1;if(o===ss.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let _=0;_<c.length&&_<h.length;++_){const b=no(c[_],h[_]);if(b!==0)return b;const R=Oi(l[c[_]],u[h[_]]);if(R!==0)return R}return _e(c.length,h.length)})(n.mapValue,e.mapValue);default:throw oe(23264,{he:t})}}function Jc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return _e(n,e);const t=Fn(n),i=Fn(e),a=_e(t.seconds,i.seconds);return a!==0?a:_e(t.nanos,i.nanos)}function Xc(n,e){const t=n.values||[],i=e.values||[];for(let a=0;a<t.length&&a<i.length;++a){const s=Oi(t[a],i[a]);if(s)return s}return _e(t.length,i.length)}function Vi(n){return io(n)}function io(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const i=Fn(t);return`time(${i.seconds},${i.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return zn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return ie.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let i="[",a=!0;for(const s of t.values||[])a?a=!1:i+=",",i+=io(s);return i+"]"})(n.arrayValue):"mapValue"in n?(function(t){const i=Object.keys(t.fields||{}).sort();let a="{",s=!0;for(const o of i)s?s=!1:a+=",",a+=`${o}:${io(t.fields[o])}`;return a+"}"})(n.mapValue):oe(61005,{value:n})}function gs(n){switch(Un(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ys(n);return e?16+gs(e):16;case 5:return 2*n.stringValue.length;case 6:return zn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((a,s)=>a+gs(s)),0)})(n.arrayValue);case 10:case 11:return(function(i){let a=0;return Kn(i.fields,((s,o)=>{a+=s.length+gs(o)})),a})(n.mapValue);default:throw oe(13486,{value:n})}}function Zc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ao(n){return!!n&&"integerValue"in n}function Oo(n){return!!n&&"arrayValue"in n}function ed(n){return!!n&&"nullValue"in n}function td(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ys(n){return!!n&&"mapValue"in n}function Ov(n){return(n?.mapValue?.fields||{})[fp]?.stringValue===gp}function ba(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Kn(n.mapValue.fields,((t,i)=>e.mapValue.fields[t]=ba(i))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ba(n.arrayValue.values[t]);return e}return{...n}}function Vv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Mv}class At{constructor(e){this.value=e}static empty(){return new At({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!ys(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ba(t)}setAll(e){let t=pt.emptyPath(),i={},a=[];e.forEach(((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,a),i={},a=[],t=l.popLast()}o?i[l.lastSegment()]=ba(o):a.push(l.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,i,a)}delete(e){const t=this.field(e.popLast());ys(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return sn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let a=t.mapValue.fields[e.get(i)];ys(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=a),t=a}return t.mapValue.fields}applyChanges(e,t,i){Kn(t,((a,s)=>e[a]=s));for(const a of i)delete e[a]}clone(){return new At(ba(this.value))}}function yp(n){const e=[];return Kn(n.fields,((t,i)=>{const a=new pt([t]);if(ys(i)){const s=yp(i.mapValue).fields;if(s.length===0)e.push(a);else for(const o of s)e.push(a.child(o))}else e.push(a)})),new Dt(e)}class bt{constructor(e,t,i,a,s,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=a,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new bt(e,0,de.min(),de.min(),de.min(),At.empty(),0)}static newFoundDocument(e,t,i,a){return new bt(e,1,t,de.min(),i,a,0)}static newNoDocument(e,t){return new bt(e,2,t,de.min(),de.min(),At.empty(),0)}static newUnknownDocument(e,t){return new bt(e,3,t,de.min(),de.min(),At.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(de.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Ls{constructor(e,t){this.position=e,this.inclusive=t}}function nd(n,e,t){let i=0;for(let a=0;a<n.position.length;a++){const s=e[a],o=n.position[a];if(s.field.isKeyField()?i=ie.comparator(ie.fromName(o.referenceValue),t.key):i=Oi(o,t.data.field(s.field)),s.dir==="desc"&&(i*=-1),i!==0)break}return i}function id(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!sn(n.position[t],e.position[t]))return!1;return!0}class Ra{constructor(e,t="asc"){this.field=e,this.dir=t}}function Bv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}class vp{}class tt extends vp{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new zv(e,t,i):t==="array-contains"?new qv(e,i):t==="in"?new Hv(e,i):t==="not-in"?new Wv(e,i):t==="array-contains-any"?new Gv(e,i):new tt(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new Uv(e,i):new jv(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Oi(t,this.value)):t!==null&&Un(this.value)===Un(t)&&this.matchesComparison(Oi(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return oe(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ht extends vp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ht(e,t)}matches(e){return bp(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function bp(n){return n.op==="and"}function wp(n){return Fv(n)&&bp(n)}function Fv(n){for(const e of n.filters)if(e instanceof Ht)return!1;return!0}function so(n){if(n instanceof tt)return n.field.canonicalString()+n.op.toString()+Vi(n.value);if(wp(n))return n.filters.map((e=>so(e))).join(",");{const e=n.filters.map((t=>so(t))).join(",");return`${n.op}(${e})`}}function _p(n,e){return n instanceof tt?(function(i,a){return a instanceof tt&&i.op===a.op&&i.field.isEqual(a.field)&&sn(i.value,a.value)})(n,e):n instanceof Ht?(function(i,a){return a instanceof Ht&&i.op===a.op&&i.filters.length===a.filters.length?i.filters.reduce(((s,o,l)=>s&&_p(o,a.filters[l])),!0):!1})(n,e):void oe(19439)}function xp(n){return n instanceof tt?(function(t){return`${t.field.canonicalString()} ${t.op} ${Vi(t.value)}`})(n):n instanceof Ht?(function(t){return t.op.toString()+" {"+t.getFilters().map(xp).join(" ,")+"}"})(n):"Filter"}class zv extends tt{constructor(e,t,i){super(e,t,i),this.key=ie.fromName(i.referenceValue)}matches(e){const t=ie.comparator(e.key,this.key);return this.matchesComparison(t)}}class Uv extends tt{constructor(e,t){super(e,"in",t),this.keys=Ep("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class jv extends tt{constructor(e,t){super(e,"not-in",t),this.keys=Ep("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Ep(n,e){return(e.arrayValue?.values||[]).map((t=>ie.fromName(t.referenceValue)))}class qv extends tt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Oo(t)&&Pa(t.arrayValue,this.value)}}class Hv extends tt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Pa(this.value.arrayValue,t)}}class Wv extends tt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Pa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Pa(this.value.arrayValue,t)}}class Gv extends tt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Oo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((i=>Pa(this.value.arrayValue,i)))}}class Kv{constructor(e,t=null,i=[],a=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=a,this.limit=s,this.startAt=o,this.endAt=l,this.Te=null}}function ad(n,e=null,t=[],i=[],a=null,s=null,o=null){return new Kv(n,e,t,i,a,s,o)}function Vo(n){const e=ue(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((i=>so(i))).join(","),t+="|ob:",t+=e.orderBy.map((i=>(function(s){return s.field.canonicalString()+s.dir})(i))).join(","),Qs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((i=>Vi(i))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((i=>Vi(i))).join(",")),e.Te=t}return e.Te}function Bo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Bv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_p(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!id(n.startAt,e.startAt)&&id(n.endAt,e.endAt)}function ro(n){return ie.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}class Hi{constructor(e,t=null,i=[],a=[],s=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=a,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Qv(n,e,t,i,a,s,o,l){return new Hi(n,e,t,i,a,s,o,l)}function Js(n){return new Hi(n)}function sd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Yv(n){return ie.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ip(n){return n.collectionGroup!==null}function wa(n){const e=ue(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new st(pt.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((u=>{u.isInequality()&&(l=l.add(u.field))}))})),l})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Ra(s,i))})),t.has(pt.keyField().canonicalString())||e.Ie.push(new Ra(pt.keyField(),i))}return e.Ie}function tn(n){const e=ue(n);return e.Ee||(e.Ee=Jv(e,wa(n))),e.Ee}function Jv(n,e){if(n.limitType==="F")return ad(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((a=>{const s=a.dir==="desc"?"asc":"desc";return new Ra(a.field,s)}));const t=n.endAt?new Ls(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Ls(n.startAt.position,n.startAt.inclusive):null;return ad(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function oo(n,e){const t=n.filters.concat([e]);return new Hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xv(n,e){const t=n.explicitOrderBy.concat([e]);return new Hi(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ds(n,e,t){return new Hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Xs(n,e){return Bo(tn(n),tn(e))&&n.limitType===e.limitType}function Tp(n){return`${Vo(tn(n))}|lt:${n.limitType}`}function ki(n){return`Query(target=${(function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map((a=>xp(a))).join(", ")}]`),Qs(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map((a=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(a))).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((a=>Vi(a))).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((a=>Vi(a))).join(",")),`Target(${i})`})(tn(n))}; limitType=${n.limitType})`}function Zs(n,e){return e.isFoundDocument()&&(function(i,a){const s=a.key.path;return i.collectionGroup!==null?a.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(s):ie.isDocumentKey(i.path)?i.path.isEqual(s):i.path.isImmediateParentOf(s)})(n,e)&&(function(i,a){for(const s of wa(i))if(!s.field.isKeyField()&&a.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(i,a){for(const s of i.filters)if(!s.matches(a))return!1;return!0})(n,e)&&(function(i,a){return!(i.startAt&&!(function(o,l,c){const u=nd(o,l,c);return o.inclusive?u<=0:u<0})(i.startAt,wa(i),a)||i.endAt&&!(function(o,l,c){const u=nd(o,l,c);return o.inclusive?u>=0:u>0})(i.endAt,wa(i),a))})(n,e)}function Zv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function kp(n){return(e,t)=>{let i=!1;for(const a of wa(n)){const s=eb(a,e,t);if(s!==0)return s;i=i||a.field.isKeyField()}return 0}}function eb(n,e,t){const i=n.field.isKeyField()?ie.comparator(e.key,t.key):(function(s,o,l){const c=o.data.field(s),u=l.data.field(s);return c!==null&&u!==null?Oi(c,u):oe(42886)})(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return oe(19790,{direction:n.dir})}}class wi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[a,s]of i)if(this.equalsFn(a,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),a=this.inner[i];if(a===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let s=0;s<a.length;s++)if(this.equalsFn(a[s][0],e))return void(a[s]=[e,t]);a.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let a=0;a<i.length;a++)if(this.equalsFn(i[a][0],e))return i.length===1?delete this.inner[t]:i.splice(a,1),this.innerSize--,!0;return!1}forEach(e){Kn(this.inner,((t,i)=>{for(const[a,s]of i)e(a,s)}))}isEmpty(){return cp(this.inner)}size(){return this.innerSize}}const tb=new ze(ie.comparator);function gn(){return tb}const Ap=new ze(ie.comparator);function ha(...n){let e=Ap;for(const t of n)e=e.insert(t.key,t);return e}function Sp(n){let e=Ap;return n.forEach(((t,i)=>e=e.insert(t,i.overlayedDocument))),e}function ni(){return _a()}function Cp(){return _a()}function _a(){return new wi((n=>n.toString()),((n,e)=>n.isEqual(e)))}const nb=new ze(ie.comparator),ib=new st(ie.comparator);function xe(...n){let e=ib;for(const t of n)e=e.add(t);return e}const ab=new st(_e);function sb(){return ab}function Fo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Cs(e)?"-0":e}}function Pp(n){return{integerValue:""+n}}function rb(n,e){return Pv(e)?Pp(e):Fo(n,e)}class er{constructor(){this._=void 0}}function ob(n,e,t){return n instanceof $s?(function(a,s){const o={fields:{[pp]:{stringValue:up},[mp]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return s&&Mo(s)&&(s=Ys(s)),s&&(o.fields[hp]=s),{mapValue:o}})(t,e):n instanceof La?Lp(n,e):n instanceof Da?Dp(n,e):(function(a,s){const o=Rp(a,s),l=rd(o)+rd(a.Ae);return ao(o)&&ao(a.Ae)?Pp(l):Fo(a.serializer,l)})(n,e)}function lb(n,e,t){return n instanceof La?Lp(n,e):n instanceof Da?Dp(n,e):t}function Rp(n,e){return n instanceof Ns?(function(i){return ao(i)||(function(s){return!!s&&"doubleValue"in s})(i)})(e)?e:{integerValue:0}:null}class $s extends er{}class La extends er{constructor(e){super(),this.elements=e}}function Lp(n,e){const t=$p(e);for(const i of n.elements)t.some((a=>sn(a,i)))||t.push(i);return{arrayValue:{values:t}}}class Da extends er{constructor(e){super(),this.elements=e}}function Dp(n,e){let t=$p(e);for(const i of n.elements)t=t.filter((a=>!sn(a,i)));return{arrayValue:{values:t}}}class Ns extends er{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function rd(n){return Je(n.integerValue||n.doubleValue)}function $p(n){return Oo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function cb(n,e){return n.field.isEqual(e.field)&&(function(i,a){return i instanceof La&&a instanceof La||i instanceof Da&&a instanceof Da?Mi(i.elements,a.elements,sn):i instanceof Ns&&a instanceof Ns?sn(i.Ae,a.Ae):i instanceof $s&&a instanceof $s})(n.transform,e.transform)}class db{constructor(e,t){this.version=e,this.transformResults=t}}class Vt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Vt}static exists(e){return new Vt(void 0,e)}static updateTime(e){return new Vt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class tr{}function Np(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new zo(n.key,Vt.none()):new Ua(n.key,n.data,Vt.none());{const t=n.data,i=At.empty();let a=new st(pt.comparator);for(let s of e.fields)if(!a.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?i.delete(s):i.set(s,o),a=a.add(s)}return new Qn(n.key,i,new Dt(a.toArray()),Vt.none())}}function ub(n,e,t){n instanceof Ua?(function(a,s,o){const l=a.value.clone(),c=ld(a.fieldTransforms,s,o.transformResults);l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):n instanceof Qn?(function(a,s,o){if(!vs(a.precondition,s))return void s.convertToUnknownDocument(o.version);const l=ld(a.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(Mp(a)),c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(a,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function xa(n,e,t,i){return n instanceof Ua?(function(s,o,l,c){if(!vs(s.precondition,o))return l;const u=s.value.clone(),h=cd(s.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,i):n instanceof Qn?(function(s,o,l,c){if(!vs(s.precondition,o))return l;const u=cd(s.fieldTransforms,c,o),h=o.data;return h.setAll(Mp(s)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((_=>_.field)))})(n,e,t,i):(function(s,o,l){return vs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l})(n,e,t)}function pb(n,e){let t=null;for(const i of n.fieldTransforms){const a=e.data.field(i.field),s=Rp(i.transform,a||null);s!=null&&(t===null&&(t=At.empty()),t.set(i.field,s))}return t||null}function od(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(i,a){return i===void 0&&a===void 0||!(!i||!a)&&Mi(i,a,((s,o)=>cb(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ua extends tr{constructor(e,t,i,a=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class Qn extends tr{constructor(e,t,i,a,s=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=a,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Mp(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}})),e}function ld(n,e,t){const i=new Map;Se(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let a=0;a<t.length;a++){const s=n[a],o=s.transform,l=e.data.field(s.field);i.set(s.field,lb(o,l,t[a]))}return i}function cd(n,e,t){const i=new Map;for(const a of n){const s=a.transform,o=t.data.field(a.field);i.set(a.field,ob(s,o,e))}return i}class zo extends tr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hb extends tr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class mb{constructor(e,t,i,a){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=a}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let a=0;a<this.mutations.length;a++){const s=this.mutations[a];s.key.isEqual(e.key)&&ub(s,e,i[a])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=xa(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=xa(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Cp();return this.mutations.forEach((a=>{const s=e.get(a.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=t.has(a.key)?null:l;const c=Np(o,l);c!==null&&i.set(a.key,c),o.isValidDocument()||o.convertToNoDocument(de.min())})),i}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),xe())}isEqual(e){return this.batchId===e.batchId&&Mi(this.mutations,e.mutations,((t,i)=>od(t,i)))&&Mi(this.baseMutations,e.baseMutations,((t,i)=>od(t,i)))}}class Uo{constructor(e,t,i,a){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=a}static from(e,t,i){Se(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let a=(function(){return nb})();const s=e.mutations;for(let o=0;o<s.length;o++)a=a.insert(s[o].key,i[o].version);return new Uo(e,t,i,a)}}class fb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}class gb{constructor(e,t){this.count=e,this.unchangedNames=t}}var et,Ie;function yb(n){switch(n){case q.OK:return oe(64938);case q.CANCELLED:case q.UNKNOWN:case q.DEADLINE_EXCEEDED:case q.RESOURCE_EXHAUSTED:case q.INTERNAL:case q.UNAVAILABLE:case q.UNAUTHENTICATED:return!1;case q.INVALID_ARGUMENT:case q.NOT_FOUND:case q.ALREADY_EXISTS:case q.PERMISSION_DENIED:case q.FAILED_PRECONDITION:case q.ABORTED:case q.OUT_OF_RANGE:case q.UNIMPLEMENTED:case q.DATA_LOSS:return!0;default:return oe(15467,{code:n})}}function Op(n){if(n===void 0)return fn("GRPC error has no .code"),q.UNKNOWN;switch(n){case et.OK:return q.OK;case et.CANCELLED:return q.CANCELLED;case et.UNKNOWN:return q.UNKNOWN;case et.DEADLINE_EXCEEDED:return q.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return q.RESOURCE_EXHAUSTED;case et.INTERNAL:return q.INTERNAL;case et.UNAVAILABLE:return q.UNAVAILABLE;case et.UNAUTHENTICATED:return q.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return q.INVALID_ARGUMENT;case et.NOT_FOUND:return q.NOT_FOUND;case et.ALREADY_EXISTS:return q.ALREADY_EXISTS;case et.PERMISSION_DENIED:return q.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return q.FAILED_PRECONDITION;case et.ABORTED:return q.ABORTED;case et.OUT_OF_RANGE:return q.OUT_OF_RANGE;case et.UNIMPLEMENTED:return q.UNIMPLEMENTED;case et.DATA_LOSS:return q.DATA_LOSS;default:return oe(39323,{code:n})}}(Ie=et||(et={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";function vb(){return new TextEncoder}const bb=new $n([4294967295,4294967295],0);function dd(n){const e=vb().encode(n),t=new Xu;return t.update(e),new Uint8Array(t.digest())}function ud(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),a=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new $n([t,i],0),new $n([a,s],0)]}class jo{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new ma(`Invalid padding: ${t}`);if(i<0)throw new ma(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new ma(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new ma(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=$n.fromNumber(this.ge)}ye(e,t,i){let a=e.add(t.multiply($n.fromNumber(i)));return a.compare(bb)===1&&(a=new $n([a.getBits(0),a.getBits(1)],0)),a.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=dd(e),[i,a]=ud(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(i,a,s);if(!this.we(o))return!1}return!0}static create(e,t,i){const a=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new jo(s,a,t);return i.forEach((l=>o.insert(l))),o}insert(e){if(this.ge===0)return;const t=dd(e),[i,a]=ud(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(i,a,s);this.be(o)}}be(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class ma extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}class nr{constructor(e,t,i,a,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=a,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const a=new Map;return a.set(e,ja.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new nr(de.min(),a,new ze(_e),gn(),xe())}}class ja{constructor(e,t,i,a,s){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=a,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new ja(i,t,xe(),xe(),xe())}}class bs{constructor(e,t,i,a){this.Se=e,this.removedTargetIds=t,this.key=i,this.De=a}}class Vp{constructor(e,t){this.targetId=e,this.Ce=t}}class Bp{constructor(e,t,i=ht.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=a}}class pd{constructor(){this.ve=0,this.Fe=hd(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=xe(),t=xe(),i=xe();return this.Fe.forEach(((a,s)=>{switch(s){case 0:e=e.add(a);break;case 2:t=t.add(a);break;case 1:i=i.add(a);break;default:oe(38017,{changeType:s})}})),new ja(this.Me,this.xe,e,t,i)}Ke(){this.Oe=!1,this.Fe=hd()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Se(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class wb{constructor(e){this.Ge=e,this.ze=new Map,this.je=gn(),this.He=rs(),this.Je=rs(),this.Ze=new ze(_e)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const i=this.nt(t);switch(e.state){case 0:this.rt(t)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.Ke(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),i.Le(e.resumeToken));break;default:oe(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((i,a)=>{this.rt(a)&&t(a)}))}st(e){const t=e.targetId,i=e.Ce.count,a=this.ot(t);if(a){const s=a.target;if(ro(s))if(i===0){const o=new ie(s.path);this.et(t,o,bt.newNoDocument(o,de.min()))}else Se(i===1,20013,{expectedCount:i});else{const o=this._t(t);if(o!==i){const l=this.ut(e),c=l?this.ct(l,e,o):1;if(c!==0){this.it(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:a=0},hashCount:s=0}=t;let o,l;try{o=zn(i).toUint8Array()}catch(c){if(c instanceof dp)return hi("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new jo(o,a,s)}catch(c){return hi(c instanceof ma?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,i){return t.Ce.count===i-this.Pt(e,t.targetId)?0:2}Pt(e,t){const i=this.Ge.getRemoteKeysForTarget(t);let a=0;return i.forEach((s=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(t,s,null),a++)})),a}Tt(e){const t=new Map;this.ze.forEach(((s,o)=>{const l=this.ot(o);if(l){if(s.current&&ro(l.target)){const c=new ie(l.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,bt.newNoDocument(c,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}}));let i=xe();this.Je.forEach(((s,o)=>{let l=!0;o.forEachWhile((c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(i=i.add(s))})),this.je.forEach(((s,o)=>o.setReadTime(e)));const a=new nr(e,t,this.Ze,this.je,i);return this.je=gn(),this.He=rs(),this.Je=rs(),this.Ze=new ze(_e),a}Ye(e,t){if(!this.rt(e))return;const i=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,i),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,i){if(!this.rt(e))return;const a=this.nt(e);this.Et(e,t)?a.qe(t,1):a.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),i&&(this.je=this.je.insert(t,i))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new pd,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new st(_e),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new st(_e),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||ee("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new pd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function rs(){return new ze(ie.comparator)}function hd(){return new ze(ie.comparator)}const _b={asc:"ASCENDING",desc:"DESCENDING"},xb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Eb={and:"AND",or:"OR"};class Ib{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function lo(n,e){return n.useProto3Json||Qs(e)?e:{value:e}}function Ms(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Fp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Tb(n,e){return Ms(n,e.toTimestamp())}function nn(n){return Se(!!n,49232),de.fromTimestamp((function(t){const i=Fn(t);return new ge(i.seconds,i.nanos)})(n))}function qo(n,e){return co(n,e).canonicalString()}function co(n,e){const t=(function(a){return new Ne(["projects",a.projectId,"databases",a.database])})(n).child("documents");return e===void 0?t:t.child(e)}function zp(n){const e=Ne.fromString(n);return Se(Wp(e),10190,{key:e.toString()}),e}function uo(n,e){return qo(n.databaseId,e.path)}function Nr(n,e){const t=zp(e);if(t.get(1)!==n.databaseId.projectId)throw new X(q.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new X(q.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new ie(jp(t))}function Up(n,e){return qo(n.databaseId,e)}function kb(n){const e=zp(n);return e.length===4?Ne.emptyPath():jp(e)}function po(n){return new Ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jp(n){return Se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function md(n,e,t){return{name:uo(n,e),fields:t.value.mapValue.fields}}function Ab(n,e){let t;if("targetChange"in e){e.targetChange;const i=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:oe(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],s=(function(u,h){return u.useProto3Json?(Se(h===void 0||typeof h=="string",58123),ht.fromBase64String(h||"")):(Se(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),ht.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&(function(u){const h=u.code===void 0?q.UNKNOWN:Op(u.code);return new X(h,u.message||"")})(o);t=new Bp(i,a,s,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const a=Nr(n,i.document.name),s=nn(i.document.updateTime),o=i.document.createTime?nn(i.document.createTime):de.min(),l=new At({mapValue:{fields:i.document.fields}}),c=bt.newFoundDocument(a,s,o,l),u=i.targetIds||[],h=i.removedTargetIds||[];t=new bs(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const a=Nr(n,i.document),s=i.readTime?nn(i.readTime):de.min(),o=bt.newNoDocument(a,s),l=i.removedTargetIds||[];t=new bs([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const a=Nr(n,i.document),s=i.removedTargetIds||[];t=new bs([],s,a,null)}else{if(!("filter"in e))return oe(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:a=0,unchangedNames:s}=i,o=new gb(a,s),l=i.targetId;t=new Vp(l,o)}}return t}function Sb(n,e){let t;if(e instanceof Ua)t={update:md(n,e.key,e.value)};else if(e instanceof zo)t={delete:uo(n,e.key)};else if(e instanceof Qn)t={update:md(n,e.key,e.data),updateMask:Ob(e.fieldMask)};else{if(!(e instanceof hb))return oe(16599,{dt:e.type});t={verify:uo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((i=>(function(s,o){const l=o.transform;if(l instanceof $s)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof La)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Da)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ns)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw oe(20930,{transform:o.transform})})(0,i)))),e.precondition.isNone||(t.currentDocument=(function(a,s){return s.updateTime!==void 0?{updateTime:Tb(a,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:oe(27497)})(n,e.precondition)),t}function Cb(n,e){return n&&n.length>0?(Se(e!==void 0,14353),n.map((t=>(function(a,s){let o=a.updateTime?nn(a.updateTime):nn(s);return o.isEqual(de.min())&&(o=nn(s)),new db(o,a.transformResults||[])})(t,e)))):[]}function Pb(n,e){return{documents:[Up(n,e.path)]}}function Rb(n,e){const t={structuredQuery:{}},i=e.path;let a;e.collectionGroup!==null?(a=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Up(n,a);const s=(function(u){if(u.length!==0)return Hp(Ht.create(u,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(u){if(u.length!==0)return u.map((h=>(function(b){return{field:Ai(b.field),direction:$b(b.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=lo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:a}}function Lb(n){let e=kb(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let a=null;if(i>0){Se(i===1,65062);const h=t.from[0];h.allDescendants?a=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(_){const b=qp(_);return b instanceof Ht&&wp(b)?b.getFilters():[b]})(t.where));let o=[];t.orderBy&&(o=(function(_){return _.map((b=>(function(M){return new Ra(Si(M.field),(function(v){switch(v){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(M.direction))})(b)))})(t.orderBy));let l=null;t.limit&&(l=(function(_){let b;return b=typeof _=="object"?_.value:_,Qs(b)?null:b})(t.limit));let c=null;t.startAt&&(c=(function(_){const b=!!_.before,R=_.values||[];return new Ls(R,b)})(t.startAt));let u=null;return t.endAt&&(u=(function(_){const b=!_.before,R=_.values||[];return new Ls(R,b)})(t.endAt)),Qv(e,a,o,s,l,"F",c,u)}function Db(n,e){const t=(function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return oe(28987,{purpose:a})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function qp(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Si(t.unaryFilter.field);return tt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const a=Si(t.unaryFilter.field);return tt.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Si(t.unaryFilter.field);return tt.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Si(t.unaryFilter.field);return tt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return oe(61313);default:return oe(60726)}})(n):n.fieldFilter!==void 0?(function(t){return tt.create(Si(t.fieldFilter.field),(function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return oe(58110);default:return oe(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Ht.create(t.compositeFilter.filters.map((i=>qp(i))),(function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return oe(1026)}})(t.compositeFilter.op))})(n):oe(30097,{filter:n})}function $b(n){return _b[n]}function Nb(n){return xb[n]}function Mb(n){return Eb[n]}function Ai(n){return{fieldPath:n.canonicalString()}}function Si(n){return pt.fromServerFormat(n.fieldPath)}function Hp(n){return n instanceof tt?(function(t){if(t.op==="=="){if(td(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NAN"}};if(ed(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(td(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NOT_NAN"}};if(ed(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ai(t.field),op:Nb(t.op),value:t.value}}})(n):n instanceof Ht?(function(t){const i=t.getFilters().map((a=>Hp(a)));return i.length===1?i[0]:{compositeFilter:{op:Mb(t.op),filters:i}}})(n):oe(54877,{filter:n})}function Ob(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Wp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Gp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Rn{constructor(e,t,i,a,s=de.min(),o=de.min(),l=ht.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=a,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Rn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}class Vb{constructor(e){this.yt=e}}function Bb(n){const e=Lb({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ds(e,e.limit,"L"):e}class Fb{constructor(){this.Sn=new zb}addToCollectionParentIndex(e,t){return this.Sn.add(t),H.resolve()}getCollectionParents(e,t){return H.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return H.resolve()}deleteFieldIndex(e,t){return H.resolve()}deleteAllFieldIndexes(e){return H.resolve()}createTargetIndexes(e,t){return H.resolve()}getDocumentsMatchingTarget(e,t){return H.resolve(null)}getIndexType(e,t){return H.resolve(0)}getFieldIndexes(e,t){return H.resolve([])}getNextCollectionGroupToUpdate(e){return H.resolve(null)}getMinOffset(e,t){return H.resolve(Bn.min())}getMinOffsetFromCollectionGroup(e,t){return H.resolve(Bn.min())}updateCollectionGroup(e,t,i){return H.resolve()}updateIndexEntries(e,t){return H.resolve()}}class zb{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),a=this.index[t]||new st(Ne.comparator),s=!a.has(i);return this.index[t]=a.add(i),s}has(e){const t=e.lastSegment(),i=e.popLast(),a=this.index[t];return a&&a.has(i)}getEntries(e){return(this.index[e]||new st(Ne.comparator)).toArray()}}const fd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Kp=41943040;class kt{static withCacheSize(e){return new kt(e,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(Kp,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);class Bi{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Bi(0)}static ar(){return new Bi(-1)}}const gd="LruGarbageCollector",Ub=1048576;function yd([n,e],[t,i]){const a=_e(n,t);return a===0?_e(e,i):a}class jb{constructor(e){this.Pr=e,this.buffer=new st(yd),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();yd(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class qb{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){ee(gd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qi(t)?ee(gd,"Ignoring IndexedDB error during garbage collection: ",t):await ji(t)}await this.Ar(3e5)}))}}class Hb{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((i=>Math.floor(t/100*i)))}nthSequenceNumber(e,t){if(t===0)return H.resolve(Ks.ce);const i=new jb(t);return this.Vr.forEachTarget(e,(a=>i.Er(a.sequenceNumber))).next((()=>this.Vr.mr(e,(a=>i.Er(a))))).next((()=>i.maxValue))}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(ee("LruGarbageCollector","Garbage collection skipped; disabled"),H.resolve(fd)):this.getCacheSize(e).next((i=>i<this.params.cacheSizeCollectionThreshold?(ee("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),fd):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let i,a,s,o,l,c,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((_=>(_>this.params.maximumSequenceNumbersToCollect?(ee("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),a=this.params.maximumSequenceNumbersToCollect):a=_,o=Date.now(),this.nthSequenceNumber(e,a)))).next((_=>(i=_,l=Date.now(),this.removeTargets(e,i,t)))).next((_=>(s=_,c=Date.now(),this.removeOrphanedDocuments(e,i)))).next((_=>(u=Date.now(),Ti()<=we.DEBUG&&ee("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${a} in `+(l-o)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${_} documents in `+(u-c)+`ms
Total Duration: ${u-h}ms`),H.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:s,documentsRemoved:_}))))}}function Wb(n,e){return new Hb(n,e)}class Gb{constructor(){this.changes=new wi((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,bt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?H.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}class Kb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}class Qb{constructor(e,t,i,a){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=a}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next((a=>(i=a,this.remoteDocumentCache.getEntry(e,t)))).next((a=>(i!==null&&xa(i.mutation,a,Dt.empty(),ge.now()),a)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.getLocalViewOfDocuments(e,i,xe()).next((()=>i))))}getLocalViewOfDocuments(e,t,i=xe()){const a=ni();return this.populateOverlays(e,a,t).next((()=>this.computeViews(e,t,a,i).next((s=>{let o=ha();return s.forEach(((l,c)=>{o=o.insert(l,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const i=ni();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,xe())))}populateOverlays(e,t,i){const a=[];return i.forEach((s=>{t.has(s)||a.push(s)})),this.documentOverlayCache.getOverlays(e,a).next((s=>{s.forEach(((o,l)=>{t.set(o,l)}))}))}computeViews(e,t,i,a){let s=gn();const o=_a(),l=(function(){return _a()})();return t.forEach(((c,u)=>{const h=i.get(u.key);a.has(u.key)&&(h===void 0||h.mutation instanceof Qn)?s=s.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),xa(h.mutation,u,h.mutation.getFieldMask(),ge.now())):o.set(u.key,Dt.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((u,h)=>o.set(u,h))),t.forEach(((u,h)=>l.set(u,new Kb(h,o.get(u)??null)))),l)))}recalculateAndSaveOverlays(e,t){const i=_a();let a=new ze(((o,l)=>o-l)),s=xe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const l of o)l.keys().forEach((c=>{const u=t.get(c);if(u===null)return;let h=i.get(c)||Dt.empty();h=l.applyToLocalView(u,h),i.set(c,h);const _=(a.get(l.batchId)||xe()).add(c);a=a.insert(l.batchId,_)}))})).next((()=>{const o=[],l=a.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,h=c.value,_=Cp();h.forEach((b=>{if(!s.has(b)){const R=Np(t.get(b),i.get(b));R!==null&&_.set(b,R),s=s.add(b)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,_))}return H.waitFor(o)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.recalculateAndSaveOverlays(e,i)))}getDocumentsMatchingQuery(e,t,i,a){return Yv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ip(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,a):this.getDocumentsMatchingCollectionQuery(e,t,i,a)}getNextDocuments(e,t,i,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,a).next((s=>{const o=a-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,a-s.size):H.resolve(ni());let l=Aa,c=s;return o.next((u=>H.forEach(u,((h,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),s.get(h)?H.resolve():this.remoteDocumentCache.getEntry(e,h).next((b=>{c=c.insert(h,b)}))))).next((()=>this.populateOverlays(e,u,s))).next((()=>this.computeViews(e,c,u,xe()))).next((h=>({batchId:l,changes:Sp(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ie(t)).next((i=>{let a=ha();return i.isFoundDocument()&&(a=a.insert(i.key,i)),a}))}getDocumentsMatchingCollectionGroupQuery(e,t,i,a){const s=t.collectionGroup;let o=ha();return this.indexManager.getCollectionParents(e,s).next((l=>H.forEach(l,(c=>{const u=(function(_,b){return new Hi(b,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,i,a).next((h=>{h.forEach(((_,b)=>{o=o.insert(_,b)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,i,a){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,s,a)))).next((o=>{s.forEach(((c,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,bt.newInvalidDocument(h)))}));let l=ha();return o.forEach(((c,u)=>{const h=s.get(c);h!==void 0&&xa(h.mutation,u,Dt.empty(),ge.now()),Zs(t,u)&&(l=l.insert(c,u))})),l}))}}class Yb{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return H.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(a){return{id:a.id,version:a.version,createTime:nn(a.createTime)}})(t)),H.resolve()}getNamedQuery(e,t){return H.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(a){return{name:a.name,query:Bb(a.bundledQuery),readTime:nn(a.readTime)}})(t)),H.resolve()}}class Jb{constructor(){this.overlays=new ze(ie.comparator),this.Lr=new Map}getOverlay(e,t){return H.resolve(this.overlays.get(t))}getOverlays(e,t){const i=ni();return H.forEach(t,(a=>this.getOverlay(e,a).next((s=>{s!==null&&i.set(a,s)})))).next((()=>i))}saveOverlays(e,t,i){return i.forEach(((a,s)=>{this.bt(e,t,s)})),H.resolve()}removeOverlaysForBatchId(e,t,i){const a=this.Lr.get(i);return a!==void 0&&(a.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(i)),H.resolve()}getOverlaysForCollection(e,t,i){const a=ni(),s=t.length+1,o=new ie(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>i&&a.set(c.getKey(),c)}return H.resolve(a)}getOverlaysForCollectionGroup(e,t,i,a){let s=new ze(((u,h)=>u-h));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>i){let h=s.get(u.largestBatchId);h===null&&(h=ni(),s=s.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const l=ni(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((u,h)=>l.set(u,h))),!(l.size()>=a)););return H.resolve(l)}bt(e,t,i){const a=this.overlays.get(i.key);if(a!==null){const o=this.Lr.get(a.largestBatchId).delete(i.key);this.Lr.set(a.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new fb(t,i));let s=this.Lr.get(t);s===void 0&&(s=xe(),this.Lr.set(t,s)),this.Lr.set(t,s.add(i.key))}}class Xb{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(e){return H.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,H.resolve()}}class Ho{constructor(){this.kr=new st(ct.Kr),this.qr=new st(ct.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const i=new ct(e,t);this.kr=this.kr.add(i),this.qr=this.qr.add(i)}$r(e,t){e.forEach((i=>this.addReference(i,t)))}removeReference(e,t){this.Wr(new ct(e,t))}Qr(e,t){e.forEach((i=>this.removeReference(i,t)))}Gr(e){const t=new ie(new Ne([])),i=new ct(t,e),a=new ct(t,e+1),s=[];return this.qr.forEachInRange([i,a],(o=>{this.Wr(o),s.push(o.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new ie(new Ne([])),i=new ct(t,e),a=new ct(t,e+1);let s=xe();return this.qr.forEachInRange([i,a],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new ct(e,0),i=this.kr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class ct{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return ie.comparator(e.key,t.key)||_e(e.Hr,t.Hr)}static Ur(e,t){return _e(e.Hr,t.Hr)||ie.comparator(e.key,t.key)}}class Zb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new st(ct.Kr)}checkEmpty(e){return H.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,a){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new mb(s,t,i,a);this.mutationQueue.push(o);for(const l of a)this.Jr=this.Jr.add(new ct(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return H.resolve(o)}lookupMutationBatch(e,t){return H.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,a=this.Xr(i),s=a<0?0:a;return H.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return H.resolve(this.mutationQueue.length===0?No:this.Yn-1)}getAllMutationBatches(e){return H.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new ct(t,0),a=new ct(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([i,a],(o=>{const l=this.Zr(o.Hr);s.push(l)})),H.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new st(_e);return t.forEach((a=>{const s=new ct(a,0),o=new ct(a,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],(l=>{i=i.add(l.Hr)}))})),H.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,a=i.length+1;let s=i;ie.isDocumentKey(s)||(s=s.child(""));const o=new ct(new ie(s),0);let l=new st(_e);return this.Jr.forEachWhile((c=>{const u=c.key.path;return!!i.isPrefixOf(u)&&(u.length===a&&(l=l.add(c.Hr)),!0)}),o),H.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((i=>{const a=this.Zr(i);a!==null&&t.push(a)})),t}removeMutationBatch(e,t){Se(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Jr;return H.forEach(t.mutations,(a=>{const s=new ct(a.key,t.batchId);return i=i.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)})).next((()=>{this.Jr=i}))}nr(e){}containsKey(e,t){const i=new ct(t,0),a=this.Jr.firstAfterOrEqual(i);return H.resolve(t.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,H.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}class e0{constructor(e){this.ti=e,this.docs=(function(){return new ze(ie.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,a=this.docs.get(i),s=a?a.size:0,o=this.ti(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return H.resolve(i?i.document.mutableCopy():bt.newInvalidDocument(t))}getEntries(e,t){let i=gn();return t.forEach((a=>{const s=this.docs.get(a);i=i.insert(a,s?s.document.mutableCopy():bt.newInvalidDocument(a))})),H.resolve(i)}getDocumentsMatchingQuery(e,t,i,a){let s=gn();const o=t.path,l=new ie(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||kv(Tv(h),i)<=0||(a.has(h.key)||Zs(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return H.resolve(s)}getAllFromCollectionGroup(e,t,i,a){oe(9500)}ni(e,t){return H.forEach(this.docs,(i=>t(i)))}newChangeBuffer(e){return new t0(this)}getSize(e){return H.resolve(this.size)}}class t0 extends Gb{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((i,a)=>{a.isValidDocument()?t.push(this.Mr.addEntry(e,a)):this.Mr.removeEntry(i)})),H.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}class n0{constructor(e){this.persistence=e,this.ri=new wi((t=>Vo(t)),Bo),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.ii=0,this.si=new Ho,this.targetCount=0,this.oi=Bi._r()}forEachTarget(e,t){return this.ri.forEach(((i,a)=>t(a))),H.resolve()}getLastRemoteSnapshotVersion(e){return H.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return H.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),H.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.ii&&(this.ii=t),H.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Bi(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,H.resolve()}updateTargetData(e,t){return this.lr(t),H.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,H.resolve()}removeTargets(e,t,i){let a=0;const s=[];return this.ri.forEach(((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),a++)})),H.waitFor(s).next((()=>a))}getTargetCount(e){return H.resolve(this.targetCount)}getTargetData(e,t){const i=this.ri.get(t)||null;return H.resolve(i)}addMatchingKeys(e,t,i){return this.si.$r(t,i),H.resolve()}removeMatchingKeys(e,t,i){this.si.Qr(t,i);const a=this.persistence.referenceDelegate,s=[];return a&&t.forEach((o=>{s.push(a.markPotentiallyOrphaned(e,o))})),H.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),H.resolve()}getMatchingKeysForTargetId(e,t){const i=this.si.jr(t);return H.resolve(i)}containsKey(e,t){return H.resolve(this.si.containsKey(t))}}class Qp{constructor(e,t){this._i={},this.overlays={},this.ai=new Ks(0),this.ui=!1,this.ui=!0,this.ci=new Xb,this.referenceDelegate=e(this),this.li=new n0(this),this.indexManager=new Fb,this.remoteDocumentCache=(function(a){return new e0(a)})((i=>this.referenceDelegate.hi(i))),this.serializer=new Vb(t),this.Pi=new Yb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Jb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this._i[e.toKey()];return i||(i=new Zb(t,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,i){ee("MemoryPersistence","Starting transaction:",e);const a=new i0(this.ai.next());return this.referenceDelegate.Ti(),i(a).next((s=>this.referenceDelegate.Ii(a).next((()=>s)))).toPromise().then((s=>(a.raiseOnCommittedEvent(),s)))}Ei(e,t){return H.or(Object.values(this._i).map((i=>()=>i.containsKey(e,t))))}}class i0 extends Sv{constructor(e){super(),this.currentSequenceNumber=e}}class Wo{constructor(e){this.persistence=e,this.Ri=new Ho,this.Ai=null}static Vi(e){return new Wo(e)}get di(){if(this.Ai)return this.Ai;throw oe(60996)}addReference(e,t,i){return this.Ri.addReference(i,t),this.di.delete(i.toString()),H.resolve()}removeReference(e,t,i){return this.Ri.removeReference(i,t),this.di.add(i.toString()),H.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),H.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((a=>this.di.add(a.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next((a=>{a.forEach((s=>this.di.add(s.toString())))})).next((()=>i.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return H.forEach(this.di,(i=>{const a=ie.fromPath(i);return this.mi(e,a).next((s=>{s||t.removeEntry(a,de.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((i=>{i?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return H.or([()=>H.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Os{constructor(e,t){this.persistence=e,this.fi=new wi((i=>Rv(i.path)),((i,a)=>i.isEqual(a))),this.garbageCollector=Wb(this,t)}static Vi(e,t){return new Os(e,t)}Ti(){}Ii(e){return H.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((i=>t.next((a=>i+a))))}pr(e){let t=0;return this.mr(e,(i=>{t++})).next((()=>t))}mr(e,t){return H.forEach(this.fi,((i,a)=>this.wr(e,i,a).next((s=>s?H.resolve():t(a)))))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const a=this.persistence.getRemoteDocumentCache(),s=a.newChangeBuffer();return a.ni(e,(o=>this.wr(e,o,t).next((l=>{l||(i++,s.removeEntry(o,de.min()))})))).next((()=>s.apply(e))).next((()=>i))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),H.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),H.resolve()}removeReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),H.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),H.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=gs(e.data.value)),t}wr(e,t,i){return H.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const a=this.fi.get(t);return H.resolve(a!==void 0&&a>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}class Go{constructor(e,t,i,a){this.targetId=e,this.fromCache=t,this.Ts=i,this.Is=a}static Es(e,t){let i=xe(),a=xe();for(const s of t.docChanges)switch(s.type){case 0:i=i.add(s.doc.key);break;case 1:a=a.add(s.doc.key)}return new Go(e,t.fromCache,i,a)}}class a0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}class s0{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Rm()?8:Cv(wt())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,i,a){const s={result:null};return this.gs(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.ps(e,t,a,i).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new a0;return this.ys(e,t,o).next((l=>{if(s.result=l,this.As)return this.ws(e,t,o,l.size)}))})).next((()=>s.result))}ws(e,t,i,a){return i.documentReadCount<this.Vs?(Ti()<=we.DEBUG&&ee("QueryEngine","SDK will not create cache indexes for query:",ki(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),H.resolve()):(Ti()<=we.DEBUG&&ee("QueryEngine","Query:",ki(t),"scans",i.documentReadCount,"local documents and returns",a,"documents as results."),i.documentReadCount>this.ds*a?(Ti()<=we.DEBUG&&ee("QueryEngine","The SDK decides to create cache indexes for query:",ki(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tn(t))):H.resolve())}gs(e,t){if(sd(t))return H.resolve(null);let i=tn(t);return this.indexManager.getIndexType(e,i).next((a=>a===0?null:(t.limit!==null&&a===1&&(t=Ds(t,null,"F"),i=tn(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next((s=>{const o=xe(...s);return this.fs.getDocuments(e,o).next((l=>this.indexManager.getMinOffset(e,i).next((c=>{const u=this.bs(t,l);return this.Ss(t,u,o,c.readTime)?this.gs(e,Ds(t,null,"F")):this.Ds(e,u,t,c)}))))})))))}ps(e,t,i,a){return sd(t)||a.isEqual(de.min())?H.resolve(null):this.fs.getDocuments(e,i).next((s=>{const o=this.bs(t,s);return this.Ss(t,o,i,a)?H.resolve(null):(Ti()<=we.DEBUG&&ee("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),ki(t)),this.Ds(e,o,t,Iv(a,Aa)).next((l=>l)))}))}bs(e,t){let i=new st(kp(e));return t.forEach(((a,s)=>{Zs(e,s)&&(i=i.add(s))})),i}Ss(e,t,i,a){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(a)>0)}ys(e,t,i){return Ti()<=we.DEBUG&&ee("QueryEngine","Using full collection scan to execute query:",ki(t)),this.fs.getDocumentsMatchingQuery(e,t,Bn.min(),i)}Ds(e,t,i,a){return this.fs.getDocumentsMatchingQuery(e,i,a).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}const Ko="LocalStore",r0=3e8;class o0{constructor(e,t,i,a){this.persistence=e,this.Cs=t,this.serializer=a,this.vs=new ze(_e),this.Fs=new wi((s=>Vo(s)),Bo),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Qb(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function l0(n,e,t,i){return new o0(n,e,t,i)}async function Yp(n,e){const t=ue(n);return await t.persistence.runTransaction("Handle user change","readonly",(i=>{let a;return t.mutationQueue.getAllMutationBatches(i).next((s=>(a=s,t.Os(e),t.mutationQueue.getAllMutationBatches(i)))).next((s=>{const o=[],l=[];let c=xe();for(const u of a){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of s){l.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(i,c).next((u=>({Ns:u,removedBatchIds:o,addedBatchIds:l})))}))}))}function c0(n,e){const t=ue(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const a=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,c,u,h){const _=u.batch,b=_.keys();let R=H.resolve();return b.forEach((M=>{R=R.next((()=>h.getEntry(c,M))).next((D=>{const v=u.docVersions.get(M);Se(v!==null,48541),D.version.compareTo(v)<0&&(_.applyToRemoteDocument(D,u),D.isValidDocument()&&(D.setReadTime(u.commitVersion),h.addEntry(D)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(c,_)))})(t,i,e,s).next((()=>s.apply(i))).next((()=>t.mutationQueue.performConsistencyCheck(i))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(i,a,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(l){let c=xe();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(i,a)))}))}function Jp(n){const e=ue(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function d0(n,e){const t=ue(n),i=e.snapshotVersion;let a=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});a=t.vs;const l=[];e.targetChanges.forEach(((h,_)=>{const b=a.get(_);if(!b)return;l.push(t.li.removeMatchingKeys(s,h.removedDocuments,_).next((()=>t.li.addMatchingKeys(s,h.addedDocuments,_))));let R=b.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(_)!==null?R=R.withResumeToken(ht.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):h.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(h.resumeToken,i)),a=a.insert(_,R),(function(D,v,k){return D.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=r0?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0})(b,R,h)&&l.push(t.li.updateTargetData(s,R))}));let c=gn(),u=xe();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),l.push(u0(s,o,e.documentUpdates).next((h=>{c=h.Bs,u=h.Ls}))),!i.isEqual(de.min())){const h=t.li.getLastRemoteSnapshotVersion(s).next((_=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,i)));l.push(h)}return H.waitFor(l).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,u))).next((()=>c))})).then((s=>(t.vs=a,s)))}function u0(n,e,t){let i=xe(),a=xe();return t.forEach((s=>i=i.add(s))),e.getEntries(n,i).next((s=>{let o=gn();return t.forEach(((l,c)=>{const u=s.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(a=a.add(l)),c.isNoDocument()&&c.version.isEqual(de.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):ee(Ko,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)})),{Bs:o,Ls:a}}))}function p0(n,e){const t=ue(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(i=>(e===void 0&&(e=No),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e))))}function h0(n,e){const t=ue(n);return t.persistence.runTransaction("Allocate target","readwrite",(i=>{let a;return t.li.getTargetData(i,e).next((s=>s?(a=s,H.resolve(a)):t.li.allocateTargetId(i).next((o=>(a=new Rn(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.li.addTargetData(i,a).next((()=>a)))))))})).then((i=>{const a=t.vs.get(i.targetId);return(a===null||i.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(t.vs=t.vs.insert(i.targetId,i),t.Fs.set(e,i.targetId)),i}))}async function ho(n,e,t){const i=ue(n),a=i.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",s,(o=>i.persistence.referenceDelegate.removeTarget(o,a)))}catch(o){if(!qi(o))throw o;ee(Ko,`Failed to update sequence numbers for target ${e}: ${o}`)}i.vs=i.vs.remove(e),i.Fs.delete(a.target)}function vd(n,e,t){const i=ue(n);let a=de.min(),s=xe();return i.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,u,h){const _=ue(c),b=_.Fs.get(h);return b!==void 0?H.resolve(_.vs.get(b)):_.li.getTargetData(u,h)})(i,o,tn(e)).next((l=>{if(l)return a=l.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(o,l.targetId).next((c=>{s=c}))})).next((()=>i.Cs.getDocumentsMatchingQuery(o,e,t?a:de.min(),t?s:xe()))).next((l=>(m0(i,Zv(e),l),{documents:l,ks:s})))))}function m0(n,e,t){let i=n.Ms.get(e)||de.min();t.forEach(((a,s)=>{s.readTime.compareTo(i)>0&&(i=s.readTime)})),n.Ms.set(e,i)}class bd{constructor(){this.activeTargetIds=sb()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class f0{constructor(){this.vo=new bd,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,i){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new bd,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}class g0{Mo(e){}shutdown(){}}const wd="ConnectivityMonitor";class _d{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){ee(wd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){ee(wd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let os=null;function mo(){return os===null?os=(function(){return 268435456+Math.round(2147483648*Math.random())})():os++,"0x"+os.toString(16)}const Mr="RestConnection",y0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class v0{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${i}/databases/${a}`,this.$o=this.databaseId.database===Ps?`project_id=${i}`:`project_id=${i}&database_id=${a}`}Wo(e,t,i,a,s){const o=mo(),l=this.Qo(e,t.toUriEncodedString());ee(Mr,`Sending RPC '${e}' ${o}:`,l,i);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,a,s);const{host:u}=new URL(l),h=Hn(u);return this.zo(e,l,c,i,h).then((_=>(ee(Mr,`Received RPC '${e}' ${o}: `,_),_)),(_=>{throw hi(Mr,`RPC '${e}' ${o} failed with error: `,_,"url: ",l,"request:",i),_}))}jo(e,t,i,a,s,o){return this.Wo(e,t,i,a,s)}Go(e,t,i){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ui})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((a,s)=>e[s]=a)),i&&i.headers.forEach(((a,s)=>e[s]=a))}Qo(e,t){const i=y0[e];let a=`${this.qo}/v1/${t}:${i}`;return this.databaseInfo.apiKey&&(a=`${a}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),a}terminate(){}}class b0{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}const gt="WebChannelConnection",sa=(n,e,t)=>{n.listen(e,(i=>{try{t(i)}catch(a){setTimeout((()=>{throw a}),0)}}))};class Di extends v0{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Di.c_){const e=np();sa(e,tp.STAT_EVENT,(t=>{t.stat===to.PROXY?ee(gt,"STAT_EVENT: detected buffering proxy"):t.stat===to.NOPROXY&&ee(gt,"STAT_EVENT: detected no buffering proxy")})),Di.c_=!0}}zo(e,t,i,a,s){const o=mo();return new Promise(((l,c)=>{const u=new Zu;u.setWithCredentials(!0),u.listenOnce(ep.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case fs.NO_ERROR:const _=u.getResponseJson();ee(gt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(_)),l(_);break;case fs.TIMEOUT:ee(gt,`RPC '${e}' ${o} timed out`),c(new X(q.DEADLINE_EXCEEDED,"Request time out"));break;case fs.HTTP_ERROR:const b=u.getStatus();if(ee(gt,`RPC '${e}' ${o} failed with status:`,b,"response text:",u.getResponseText()),b>0){let R=u.getResponseJson();Array.isArray(R)&&(R=R[0]);const M=R?.error;if(M&&M.status&&M.message){const D=(function(k){const S=k.toLowerCase().replace(/_/g,"-");return Object.values(q).indexOf(S)>=0?S:q.UNKNOWN})(M.status);c(new X(D,M.message))}else c(new X(q.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new X(q.UNAVAILABLE,"Connection failed."));break;default:oe(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{ee(gt,`RPC '${e}' ${o} completed.`)}}));const h=JSON.stringify(a);ee(gt,`RPC '${e}' ${o} sending request:`,a),u.send(t,"POST",h,i,15)}))}T_(e,t,i){const a=mo(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,i),l.encodeInitMessageHeaders=!0;const u=s.join("");ee(gt,`Creating RPC '${e}' stream ${a}: ${u}`,l);const h=o.createWebChannel(u,l);this.I_(h);let _=!1,b=!1;const R=new b0({Ho:M=>{b?ee(gt,`Not sending because RPC '${e}' stream ${a} is closed:`,M):(_||(ee(gt,`Opening RPC '${e}' stream ${a} transport.`),h.open(),_=!0),ee(gt,`RPC '${e}' stream ${a} sending:`,M),h.send(M))},Jo:()=>h.close()});return sa(h,pa.EventType.OPEN,(()=>{b||(ee(gt,`RPC '${e}' stream ${a} transport opened.`),R.i_())})),sa(h,pa.EventType.CLOSE,(()=>{b||(b=!0,ee(gt,`RPC '${e}' stream ${a} transport closed`),R.o_(),this.E_(h))})),sa(h,pa.EventType.ERROR,(M=>{b||(b=!0,hi(gt,`RPC '${e}' stream ${a} transport errored. Name:`,M.name,"Message:",M.message),R.o_(new X(q.UNAVAILABLE,"The operation could not be completed")))})),sa(h,pa.EventType.MESSAGE,(M=>{if(!b){const D=M.data[0];Se(!!D,16349);const v=D,k=v?.error||v[0]?.error;if(k){ee(gt,`RPC '${e}' stream ${a} received error:`,k);const S=k.status;let $=(function(A){const f=et[A];if(f!==void 0)return Op(f)})(S),C=k.message;S==="NOT_FOUND"&&C.includes("database")&&C.includes("does not exist")&&C.includes(this.databaseId.database)&&hi(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),$===void 0&&($=q.INTERNAL,C="Unknown error status: "+S+" with message "+k.message),b=!0,R.o_(new X($,C)),h.close()}else ee(gt,`RPC '${e}' stream ${a} received:`,D),R.__(D)}})),Di.u_(),setTimeout((()=>{R.s_()}),0),R}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,i){super.Go(e,t,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ip()}}function w0(n){return new Di(n)}function Or(){return typeof document<"u"?document:null}function ir(n){return new Ib(n,!0)}Di.c_=!1;class Xp{constructor(e,t,i=1e3,a=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=i,this.A_=a,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),a=Math.max(0,t-i);a>0&&ee("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,a,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const xd="PersistentStream";class Zp{constructor(e,t,i,a,s,o,l,c){this.Ci=e,this.b_=i,this.S_=a,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Xp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===q.RESOURCE_EXHAUSTED?(fn(t.toString()),fn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,a])=>{this.D_===t&&this.G_(i,a)}),(i=>{e((()=>{const a=new X(q.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(a)}))}))}G_(e,t){const i=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{i((()=>this.listener.Zo()))})),this.stream.Yo((()=>{i((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((a=>{i((()=>this.z_(a)))})),this.stream.onMessage((a=>{i((()=>++this.F_==1?this.H_(a):this.onNext(a)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return ee(xd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(ee(xd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class _0 extends Zp{constructor(e,t,i,a,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,a,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Ab(this.serializer,e),i=(function(s){if(!("targetChange"in s))return de.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?de.min():o.readTime?nn(o.readTime):de.min()})(e);return this.listener.J_(t,i)}Z_(e){const t={};t.database=po(this.serializer),t.addTarget=(function(s,o){let l;const c=o.target;if(l=ro(c)?{documents:Pb(s,c)}:{query:Rb(s,c).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Fp(s,o.resumeToken);const u=lo(s,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(de.min())>0){l.readTime=Ms(s,o.snapshotVersion.toTimestamp());const u=lo(s,o.expectedCount);u!==null&&(l.expectedCount=u)}return l})(this.serializer,e);const i=Db(this.serializer,e);i&&(t.labels=i),this.K_(t)}X_(e){const t={};t.database=po(this.serializer),t.removeTarget=e,this.K_(t)}}class x0 extends Zp{constructor(e,t,i,a,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,a,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return Se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Cb(e.writeResults,e.commitTime),i=nn(e.commitTime);return this.listener.na(i,t)}ra(){const e={};e.database=po(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((i=>Sb(this.serializer,i)))};this.K_(t)}}class E0{}class I0 extends E0{constructor(e,t,i,a){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=a,this.ia=!1}sa(){if(this.ia)throw new X(q.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Wo(e,co(t,i),a,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new X(q.UNKNOWN,s.toString())}))}jo(e,t,i,a,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.jo(e,co(t,i),a,o,l,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(q.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function T0(n,e,t,i){return new I0(n,e,t,i)}class k0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(fn(t),this.aa=!1):ee("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const mi="RemoteStore";class A0{constructor(e,t,i,a,s){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((o=>{i.enqueueAndForget((async()=>{_i(this)&&(ee(mi,"Restarting streams for network reachability change."),await(async function(c){const u=ue(c);u.Ea.add(4),await qa(u),u.Va.set("Unknown"),u.Ea.delete(4),await ar(u)})(this))}))})),this.Va=new k0(i,a)}}async function ar(n){if(_i(n))for(const e of n.Ra)await e(!0)}async function qa(n){for(const e of n.Ra)await e(!1)}function eh(n,e){const t=ue(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Xo(t)?Jo(t):Wi(t).O_()&&Yo(t,e))}function Qo(n,e){const t=ue(n),i=Wi(t);t.Ia.delete(e),i.O_()&&th(t,e),t.Ia.size===0&&(i.O_()?i.L_():_i(t)&&t.Va.set("Unknown"))}function Yo(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(de.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Wi(n).Z_(e)}function th(n,e){n.da.$e(e),Wi(n).X_(e)}function Jo(n){n.da=new wb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Wi(n).start(),n.Va.ua()}function Xo(n){return _i(n)&&!Wi(n).x_()&&n.Ia.size>0}function _i(n){return ue(n).Ea.size===0}function nh(n){n.da=void 0}async function S0(n){n.Va.set("Online")}async function C0(n){n.Ia.forEach(((e,t)=>{Yo(n,e)}))}async function P0(n,e){nh(n),Xo(n)?(n.Va.ha(e),Jo(n)):n.Va.set("Unknown")}async function R0(n,e,t){if(n.Va.set("Online"),e instanceof Bp&&e.state===2&&e.cause)try{await(async function(a,s){const o=s.cause;for(const l of s.targetIds)a.Ia.has(l)&&(await a.remoteSyncer.rejectListen(l,o),a.Ia.delete(l),a.da.removeTarget(l))})(n,e)}catch(i){ee(mi,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Vs(n,i)}else if(e instanceof bs?n.da.Xe(e):e instanceof Vp?n.da.st(e):n.da.tt(e),!t.isEqual(de.min()))try{const i=await Jp(n.localStore);t.compareTo(i)>=0&&await(function(s,o){const l=s.da.Tt(o);return l.targetChanges.forEach(((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.Ia.get(u);h&&s.Ia.set(u,h.withResumeToken(c.resumeToken,o))}})),l.targetMismatches.forEach(((c,u)=>{const h=s.Ia.get(c);if(!h)return;s.Ia.set(c,h.withResumeToken(ht.EMPTY_BYTE_STRING,h.snapshotVersion)),th(s,c);const _=new Rn(h.target,c,u,h.sequenceNumber);Yo(s,_)})),s.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(i){ee(mi,"Failed to raise snapshot:",i),await Vs(n,i)}}async function Vs(n,e,t){if(!qi(e))throw e;n.Ea.add(1),await qa(n),n.Va.set("Offline"),t||(t=()=>Jp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{ee(mi,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ar(n)}))}function ih(n,e){return e().catch((t=>Vs(n,t,e)))}async function sr(n){const e=ue(n),t=jn(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:No;for(;L0(e);)try{const a=await p0(e.localStore,i);if(a===null){e.Ta.length===0&&t.L_();break}i=a.batchId,D0(e,a)}catch(a){await Vs(e,a)}ah(e)&&sh(e)}function L0(n){return _i(n)&&n.Ta.length<10}function D0(n,e){n.Ta.push(e);const t=jn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function ah(n){return _i(n)&&!jn(n).x_()&&n.Ta.length>0}function sh(n){jn(n).start()}async function $0(n){jn(n).ra()}async function N0(n){const e=jn(n);for(const t of n.Ta)e.ea(t.mutations)}async function M0(n,e,t){const i=n.Ta.shift(),a=Uo.from(i,e,t);await ih(n,(()=>n.remoteSyncer.applySuccessfulWrite(a))),await sr(n)}async function O0(n,e){e&&jn(n).Y_&&await(async function(i,a){if((function(o){return yb(o)&&o!==q.ABORTED})(a.code)){const s=i.Ta.shift();jn(i).B_(),await ih(i,(()=>i.remoteSyncer.rejectFailedWrite(s.batchId,a))),await sr(i)}})(n,e),ah(n)&&sh(n)}async function Ed(n,e){const t=ue(n);t.asyncQueue.verifyOperationInProgress(),ee(mi,"RemoteStore received new credentials");const i=_i(t);t.Ea.add(3),await qa(t),i&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ar(t)}async function V0(n,e){const t=ue(n);e?(t.Ea.delete(2),await ar(t)):e||(t.Ea.add(2),await qa(t),t.Va.set("Unknown"))}function Wi(n){return n.ma||(n.ma=(function(t,i,a){const s=ue(t);return s.sa(),new _0(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,a)})(n.datastore,n.asyncQueue,{Zo:S0.bind(null,n),Yo:C0.bind(null,n),t_:P0.bind(null,n),J_:R0.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Xo(n)?Jo(n):n.Va.set("Unknown")):(await n.ma.stop(),nh(n))}))),n.ma}function jn(n){return n.fa||(n.fa=(function(t,i,a){const s=ue(t);return s.sa(),new x0(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,a)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:$0.bind(null,n),t_:O0.bind(null,n),ta:N0.bind(null,n),na:M0.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await sr(n)):(await n.fa.stop(),n.Ta.length>0&&(ee(mi,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class Zo{constructor(e,t,i,a,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=a,this.removalCallback=s,this.deferred=new dn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,a,s){const o=Date.now()+i,l=new Zo(e,t,o,a,s);return l.start(i),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(q.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function el(n,e){if(fn("AsyncQueue",`${e}: ${n}`),qi(n))return new X(q.UNAVAILABLE,`${e}: ${n}`);throw n}class $i{static emptySet(e){return new $i(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||ie.comparator(t.key,i.key):(t,i)=>ie.comparator(t.key,i.key),this.keyedMap=ha(),this.sortedSet=new ze(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,i)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $i)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const a=t.getNext().key,s=i.getNext().key;if(!a.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new $i;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}class Id{constructor(){this.ga=new ze(ie.comparator)}track(e){const t=e.doc.key,i=this.ga.get(t);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(t,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(t):e.type===1&&i.type===2?this.ga=this.ga.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):oe(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,i)=>{e.push(i)})),e}}class Fi{constructor(e,t,i,a,s,o,l,c,u){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=a,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,i,a,s){const o=[];return t.forEach((l=>{o.push({type:0,doc:l})})),new Fi(e,t,$i.emptySet(t),o,i,a,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Xs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let a=0;a<t.length;a++)if(t[a].type!==i[a].type||!t[a].doc.isEqual(i[a].doc))return!1;return!0}}class B0{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class F0{constructor(){this.queries=Td(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,i){const a=ue(t),s=a.queries;a.queries=Td(),s.forEach(((o,l)=>{for(const c of l.ba)c.onError(i)}))})(this,new X(q.ABORTED,"Firestore shutting down"))}}function Td(){return new wi((n=>Tp(n)),Xs)}async function tl(n,e){const t=ue(n);let i=3;const a=e.query;let s=t.queries.get(a);s?!s.Sa()&&e.Da()&&(i=2):(s=new B0,i=e.Da()?0:1);try{switch(i){case 0:s.wa=await t.onListen(a,!0);break;case 1:s.wa=await t.onListen(a,!1);break;case 2:await t.onFirstRemoteStoreListen(a)}}catch(o){const l=el(o,`Initialization of query '${ki(e.query)}' failed`);return void e.onError(l)}t.queries.set(a,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&il(t)}async function nl(n,e){const t=ue(n),i=e.query;let a=3;const s=t.queries.get(i);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?a=e.Da()?0:1:!s.Sa()&&e.Da()&&(a=2))}switch(a){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function z0(n,e){const t=ue(n);let i=!1;for(const a of e){const s=a.query,o=t.queries.get(s);if(o){for(const l of o.ba)l.Fa(a)&&(i=!0);o.wa=a}}i&&il(t)}function U0(n,e,t){const i=ue(n),a=i.queries.get(e);if(a)for(const s of a.ba)s.onError(t);i.queries.delete(e)}function il(n){n.Ca.forEach((e=>{e.next()}))}var fo,kd;(kd=fo||(fo={})).Ma="default",kd.Cache="cache";class al{constructor(e,t,i){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const a of e.docChanges)a.type!==3&&i.push(a);e=new Fi(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const i=t!=="Offline";return(!this.options.Ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Fi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fo.Cache}}class rh{constructor(e){this.key=e}}class oh{constructor(e){this.key=e}}class j0{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=xe(),this.mutatedKeys=xe(),this.eu=kp(e),this.tu=new $i(this.eu)}get nu(){return this.Za}ru(e,t){const i=t?t.iu:new Id,a=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=a,l=!1;const c=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,u=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal(((h,_)=>{const b=a.get(h),R=Zs(this.query,_)?_:null,M=!!b&&this.mutatedKeys.has(b.key),D=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let v=!1;b&&R?b.data.isEqual(R.data)?M!==D&&(i.track({type:3,doc:R}),v=!0):this.su(b,R)||(i.track({type:2,doc:R}),v=!0,(c&&this.eu(R,c)>0||u&&this.eu(R,u)<0)&&(l=!0)):!b&&R?(i.track({type:0,doc:R}),v=!0):b&&!R&&(i.track({type:1,doc:b}),v=!0,(c||u)&&(l=!0)),v&&(R?(o=o.add(R),s=D?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),i.track({type:1,doc:h})}return{tu:o,iu:i,Ss:l,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,a){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((h,_)=>(function(R,M){const D=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return oe(20277,{Vt:v})}};return D(R)-D(M)})(h.type,_.type)||this.eu(h.doc,_.doc))),this.ou(i),a=a??!1;const l=t&&!a?this._u():[],c=this.Ya.size===0&&this.current&&!a?1:0,u=c!==this.Xa;return this.Xa=c,o.length!==0||u?{snapshot:new Fi(this.query,e.tu,s,o,e.mutatedKeys,c===0,u,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Id,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=xe(),this.tu.forEach((i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))}));const t=[];return e.forEach((i=>{this.Ya.has(i)||t.push(new oh(i))})),this.Ya.forEach((i=>{e.has(i)||t.push(new rh(i))})),t}cu(e){this.Za=e.ks,this.Ya=xe();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Fi.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const sl="SyncEngine";class q0{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class H0{constructor(e){this.key=e,this.hu=!1}}class W0{constructor(e,t,i,a,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=a,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new wi((l=>Tp(l)),Xs),this.Iu=new Map,this.Eu=new Set,this.Ru=new ze(ie.comparator),this.Au=new Map,this.Vu=new Ho,this.du={},this.mu=new Map,this.fu=Bi.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function G0(n,e,t=!0){const i=hh(n);let a;const s=i.Tu.get(e);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),a=s.view.lu()):a=await lh(i,e,t,!0),a}async function K0(n,e){const t=hh(n);await lh(t,e,!0,!1)}async function lh(n,e,t,i){const a=await h0(n.localStore,tn(e)),s=a.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let l;return i&&(l=await Q0(n,e,s,o==="current",a.resumeToken)),n.isPrimaryClient&&t&&eh(n.remoteStore,a),l}async function Q0(n,e,t,i,a){n.pu=(_,b,R)=>(async function(D,v,k,S){let $=v.view.ru(k);$.Ss&&($=await vd(D.localStore,v.query,!1).then((({documents:f})=>v.view.ru(f,$))));const C=S&&S.targetChanges.get(v.targetId),T=S&&S.targetMismatches.get(v.targetId)!=null,A=v.view.applyChanges($,D.isPrimaryClient,C,T);return Sd(D,v.targetId,A.au),A.snapshot})(n,_,b,R);const s=await vd(n.localStore,e,!0),o=new j0(e,s.ks),l=o.ru(s.documents),c=ja.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",a),u=o.applyChanges(l,n.isPrimaryClient,c);Sd(n,t,u.au);const h=new q0(e,t,o);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function Y0(n,e,t){const i=ue(n),a=i.Tu.get(e),s=i.Iu.get(a.targetId);if(s.length>1)return i.Iu.set(a.targetId,s.filter((o=>!Xs(o,e)))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(a.targetId),i.sharedClientState.isActiveQueryTarget(a.targetId)||await ho(i.localStore,a.targetId,!1).then((()=>{i.sharedClientState.clearQueryState(a.targetId),t&&Qo(i.remoteStore,a.targetId),go(i,a.targetId)})).catch(ji)):(go(i,a.targetId),await ho(i.localStore,a.targetId,!0))}async function J0(n,e){const t=ue(n),i=t.Tu.get(e),a=t.Iu.get(i.targetId);t.isPrimaryClient&&a.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Qo(t.remoteStore,i.targetId))}async function X0(n,e,t){const i=sw(n);try{const a=await(function(o,l){const c=ue(o),u=ge.now(),h=l.reduce(((R,M)=>R.add(M.key)),xe());let _,b;return c.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let M=gn(),D=xe();return c.xs.getEntries(R,h).next((v=>{M=v,M.forEach(((k,S)=>{S.isValidDocument()||(D=D.add(k))}))})).next((()=>c.localDocuments.getOverlayedDocuments(R,M))).next((v=>{_=v;const k=[];for(const S of l){const $=pb(S,_.get(S.key).overlayedDocument);$!=null&&k.push(new Qn(S.key,$,yp($.value.mapValue),Vt.exists(!0)))}return c.mutationQueue.addMutationBatch(R,u,k,l)})).next((v=>{b=v;const k=v.applyToLocalDocumentSet(_,D);return c.documentOverlayCache.saveOverlays(R,v.batchId,k)}))})).then((()=>({batchId:b.batchId,changes:Sp(_)})))})(i.localStore,e);i.sharedClientState.addPendingMutation(a.batchId),(function(o,l,c){let u=o.du[o.currentUser.toKey()];u||(u=new ze(_e)),u=u.insert(l,c),o.du[o.currentUser.toKey()]=u})(i,a.batchId,t),await Ha(i,a.changes),await sr(i.remoteStore)}catch(a){const s=el(a,"Failed to persist write");t.reject(s)}}async function ch(n,e){const t=ue(n);try{const i=await d0(t.localStore,e);e.targetChanges.forEach(((a,s)=>{const o=t.Au.get(s);o&&(Se(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1,22616),a.addedDocuments.size>0?o.hu=!0:a.modifiedDocuments.size>0?Se(o.hu,14607):a.removedDocuments.size>0&&(Se(o.hu,42227),o.hu=!1))})),await Ha(t,i,e)}catch(i){await ji(i)}}function Ad(n,e,t){const i=ue(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const a=[];i.Tu.forEach(((s,o)=>{const l=o.view.va(e);l.snapshot&&a.push(l.snapshot)})),(function(o,l){const c=ue(o);c.onlineState=l;let u=!1;c.queries.forEach(((h,_)=>{for(const b of _.ba)b.va(l)&&(u=!0)})),u&&il(c)})(i.eventManager,e),a.length&&i.Pu.J_(a),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Z0(n,e,t){const i=ue(n);i.sharedClientState.updateQueryState(e,"rejected",t);const a=i.Au.get(e),s=a&&a.key;if(s){let o=new ze(ie.comparator);o=o.insert(s,bt.newNoDocument(s,de.min()));const l=xe().add(s),c=new nr(de.min(),new Map,new ze(_e),o,l);await ch(i,c),i.Ru=i.Ru.remove(s),i.Au.delete(e),rl(i)}else await ho(i.localStore,e,!1).then((()=>go(i,e,t))).catch(ji)}async function ew(n,e){const t=ue(n),i=e.batch.batchId;try{const a=await c0(t.localStore,e);uh(t,i,null),dh(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await Ha(t,a)}catch(a){await ji(a)}}async function tw(n,e,t){const i=ue(n);try{const a=await(function(o,l){const c=ue(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let h;return c.mutationQueue.lookupMutationBatch(u,l).next((_=>(Se(_!==null,37113),h=_.keys(),c.mutationQueue.removeMutationBatch(u,_)))).next((()=>c.mutationQueue.performConsistencyCheck(u))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h))).next((()=>c.localDocuments.getDocuments(u,h)))}))})(i.localStore,e);uh(i,e,t),dh(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await Ha(i,a)}catch(a){await ji(a)}}function dh(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function uh(n,e,t){const i=ue(n);let a=i.du[i.currentUser.toKey()];if(a){const s=a.get(e);s&&(t?s.reject(t):s.resolve(),a=a.remove(e)),i.du[i.currentUser.toKey()]=a}}function go(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Iu.get(e))n.Tu.delete(i),t&&n.Pu.yu(i,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((i=>{n.Vu.containsKey(i)||ph(n,i)}))}function ph(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Qo(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),rl(n))}function Sd(n,e,t){for(const i of t)i instanceof rh?(n.Vu.addReference(i.key,e),nw(n,i)):i instanceof oh?(ee(sl,"Document no longer in limbo: "+i.key),n.Vu.removeReference(i.key,e),n.Vu.containsKey(i.key)||ph(n,i.key)):oe(19791,{wu:i})}function nw(n,e){const t=e.key,i=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(i)||(ee(sl,"New document in limbo: "+t),n.Eu.add(i),rl(n))}function rl(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new ie(Ne.fromString(e)),i=n.fu.next();n.Au.set(i,new H0(t)),n.Ru=n.Ru.insert(t,i),eh(n.remoteStore,new Rn(tn(Js(t.path)),i,"TargetPurposeLimboResolution",Ks.ce))}}async function Ha(n,e,t){const i=ue(n),a=[],s=[],o=[];i.Tu.isEmpty()||(i.Tu.forEach(((l,c)=>{o.push(i.pu(c,e,t).then((u=>{if((u||t)&&i.isPrimaryClient){const h=u?!u.fromCache:t?.targetChanges.get(c.targetId)?.current;i.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(u){a.push(u);const h=Go.Es(c.targetId,u);s.push(h)}})))})),await Promise.all(o),i.Pu.J_(a),await(async function(c,u){const h=ue(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(_=>H.forEach(u,(b=>H.forEach(b.Ts,(R=>h.persistence.referenceDelegate.addReference(_,b.targetId,R))).next((()=>H.forEach(b.Is,(R=>h.persistence.referenceDelegate.removeReference(_,b.targetId,R)))))))))}catch(_){if(!qi(_))throw _;ee(Ko,"Failed to update sequence numbers: "+_)}for(const _ of u){const b=_.targetId;if(!_.fromCache){const R=h.vs.get(b),M=R.snapshotVersion,D=R.withLastLimboFreeSnapshotVersion(M);h.vs=h.vs.insert(b,D)}}})(i.localStore,s))}async function iw(n,e){const t=ue(n);if(!t.currentUser.isEqual(e)){ee(sl,"User change. New user:",e.toKey());const i=await Yp(t.localStore,e);t.currentUser=e,(function(s,o){s.mu.forEach((l=>{l.forEach((c=>{c.reject(new X(q.CANCELLED,o))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Ha(t,i.Ns)}}function aw(n,e){const t=ue(n),i=t.Au.get(e);if(i&&i.hu)return xe().add(i.key);{let a=xe();const s=t.Iu.get(e);if(!s)return a;for(const o of s){const l=t.Tu.get(o);a=a.unionWith(l.view.nu)}return a}}function hh(n){const e=ue(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ch.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=aw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Z0.bind(null,e),e.Pu.J_=z0.bind(null,e.eventManager),e.Pu.yu=U0.bind(null,e.eventManager),e}function sw(n){const e=ue(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ew.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=tw.bind(null,e),e}class Bs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ir(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return l0(this.persistence,new s0,e.initialUser,this.serializer)}Cu(e){return new Qp(Wo.Vi,this.serializer)}Du(e){return new f0}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Bs.provider={build:()=>new Bs};class rw extends Bs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Se(this.persistence.referenceDelegate instanceof Os,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new qb(i,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new Qp((i=>Os.Vi(i,t)),this.serializer)}}class yo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Ad(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=iw.bind(null,this.syncEngine),await V0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new F0})()}createDatastore(e){const t=ir(e.databaseInfo.databaseId),i=w0(e.databaseInfo);return T0(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return(function(i,a,s,o,l){return new A0(i,a,s,o,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ad(this.syncEngine,t,0)),(function(){return _d.v()?new _d:new g0})())}createSyncEngine(e,t){return(function(a,s,o,l,c,u,h){const _=new W0(a,s,o,l,c,u);return h&&(_.gu=!0),_})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const i=ue(t);ee(mi,"RemoteStore shutting down."),i.Ea.add(5),await qa(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}yo.provider={build:()=>new yo};class ol{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):fn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}const qn="FirestoreClient";class ow{constructor(e,t,i,a,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this._databaseInfo=a,this.user=yt.UNAUTHENTICATED,this.clientId=$o.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(i,(async o=>{ee(qn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(i,(o=>(ee(qn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new dn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=el(t,"Failed to shutdown persistence");e.reject(i)}})),e.promise}}async function Vr(n,e){n.asyncQueue.verifyOperationInProgress(),ee(qn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener((async a=>{i.isEqual(a)||(await Yp(e.localStore,a),i=a)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Cd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await lw(n);ee(qn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((i=>Ed(e.remoteStore,i))),n.setAppCheckTokenChangeListener(((i,a)=>Ed(e.remoteStore,a))),n._onlineComponents=e}async function lw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){ee(qn,"Using user provided OfflineComponentProvider");try{await Vr(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(a){return a.name==="FirebaseError"?a.code===q.FAILED_PRECONDITION||a.code===q.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11})(t))throw t;hi("Error using user provided cache. Falling back to memory cache: "+t),await Vr(n,new Bs)}}else ee(qn,"Using default OfflineComponentProvider"),await Vr(n,new rw(void 0));return n._offlineComponents}async function mh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(ee(qn,"Using user provided OnlineComponentProvider"),await Cd(n,n._uninitializedComponentsProvider._online)):(ee(qn,"Using default OnlineComponentProvider"),await Cd(n,new yo))),n._onlineComponents}function cw(n){return mh(n).then((e=>e.syncEngine))}async function Fs(n){const e=await mh(n),t=e.eventManager;return t.onListen=G0.bind(null,e.syncEngine),t.onUnlisten=Y0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=K0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=J0.bind(null,e.syncEngine),t}function dw(n,e,t,i){const a=new ol(i),s=new al(e,a,t);return n.asyncQueue.enqueueAndForget((async()=>tl(await Fs(n),s))),()=>{a.Nu(),n.asyncQueue.enqueueAndForget((async()=>nl(await Fs(n),s)))}}function uw(n,e,t={}){const i=new dn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,l,c,u){const h=new ol({next:b=>{h.Nu(),o.enqueueAndForget((()=>nl(s,_)));const R=b.docs.has(l);!R&&b.fromCache?u.reject(new X(q.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&b.fromCache&&c&&c.source==="server"?u.reject(new X(q.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(b)},error:b=>u.reject(b)}),_=new al(Js(l.path),h,{includeMetadataChanges:!0,Ka:!0});return tl(s,_)})(await Fs(n),n.asyncQueue,e,t,i))),i.promise}function pw(n,e,t={}){const i=new dn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,l,c,u){const h=new ol({next:b=>{h.Nu(),o.enqueueAndForget((()=>nl(s,_))),b.fromCache&&c.source==="server"?u.reject(new X(q.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(b)},error:b=>u.reject(b)}),_=new al(l,h,{includeMetadataChanges:!0,Ka:!0});return tl(s,_)})(await Fs(n),n.asyncQueue,e,t,i))),i.promise}function hw(n,e){const t=new dn;return n.asyncQueue.enqueueAndForget((async()=>X0(await cw(n),e,t))),t.promise}function fh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}const mw="ComponentProvider",Pd=new Map;function fw(n,e,t,i,a){return new $v(n,e,t,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,fh(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator,i)}const gh="firestore.googleapis.com",Rd=!0;class Ld{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new X(q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gh,this.ssl=Rd}else this.host=e.host,this.ssl=e.ssl??Rd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Kp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ub)throw new X(q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ev("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fh(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,a){return i.timeoutSeconds===a.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class rr{constructor(e,t,i,a){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ld({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ld(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new hv;switch(i.type){case"firstParty":return new yv(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new X(q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=Pd.get(t);i&&(ee(mw,"Removing Datastore"),Pd.delete(t),i.terminate())})(this),Promise.resolve()}}function gw(n,e,t,i={}){n=St(n,rr);const a=Hn(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;a&&(bo(`https://${l}`),wo("Firestore",!0)),s.host!==gh&&s.host!==l&&hi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:l,ssl:a,emulatorOptions:i};if(!li(c,o)&&(n._setSettings(c),i.mockUserToken)){let u,h;if(typeof i.mockUserToken=="string")u=i.mockUserToken,h=yt.MOCK_USER;else{u=pu(i.mockUserToken,n._app?.options.projectId);const _=i.mockUserToken.sub||i.mockUserToken.user_id;if(!_)throw new X(q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new yt(_)}n._authCredentials=new mv(new sp(u,h))}}class vn{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new vn(this.firestore,e,this._query)}}class Ke{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Nn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}toJSON(){return{type:Ke._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(za(t,Ke._jsonSchema))return new Ke(e,i||null,new ie(Ne.fromString(t.referencePath)))}}Ke._jsonSchemaVersion="firestore/documentReference/1.0",Ke._jsonSchema={type:nt("string",Ke._jsonSchemaVersion),referencePath:nt("string")};class Nn extends vn{constructor(e,t,i){super(e,t,Js(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new ie(e))}withConverter(e){return new Nn(this.firestore,e,this._path)}}function fi(n,e,...t){if(n=Be(n),rp("collection","path",e),n instanceof rr){const i=Ne.fromString(e,...t);return Hc(i),new Nn(n,null,i)}{if(!(n instanceof Ke||n instanceof Nn))throw new X(q.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Ne.fromString(e,...t));return Hc(i),new Nn(n.firestore,null,i)}}function fa(n,e,...t){if(n=Be(n),arguments.length===1&&(e=$o.newId()),rp("doc","path",e),n instanceof rr){const i=Ne.fromString(e,...t);return qc(i),new Ke(n,null,new ie(i))}{if(!(n instanceof Ke||n instanceof Nn))throw new X(q.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Ne.fromString(e,...t));return qc(i),new Ke(n.firestore,n instanceof Nn?n.converter:null,new ie(i))}}const Dd="AsyncQueue";class $d{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Xp(this,"async_queue_retry"),this._c=()=>{const i=Or();i&&ee(Dd,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=Or();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Or();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new dn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!qi(e))throw e;ee(Dd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,fn("INTERNAL UNHANDLED ERROR: ",Nd(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const a=Zo.createAndSchedule(this,e,t,i,(s=>this.hc(s)));return this.tc.push(a),a}uc(){this.nc&&oe(47125,{Pc:Nd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Nd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class yn extends rr{constructor(e,t,i,a){super(e,t,i,a),this.type="firestore",this._queue=new $d,this._persistenceKey=a?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new $d(e),this._firestoreClient=void 0,await e}}}function yw(n,e){const t=typeof n=="object"?n:Io(),i=typeof n=="string"?n:Ps,a=js(t,"firestore").getImmediate({identifier:i});if(!a._initialized){const s=cu("firestore");s&&gw(a,...s)}return a}function or(n){if(n._terminated)throw new X(q.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||vw(n),n._firestoreClient}function vw(n){const e=n._freezeSettings(),t=fw(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new ow(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(a){const s=a?._online.build();return{_offline:a?._offline.build(s),_online:s}})(n._componentsProvider))}class Ot{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ot(ht.fromBase64String(e))}catch(t){throw new X(q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ot(ht.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ot._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(za(e,Ot._jsonSchema))return Ot.fromBase64String(e.bytes)}}Ot._jsonSchemaVersion="firestore/bytes/1.0",Ot._jsonSchema={type:nt("string",Ot._jsonSchemaVersion),bytes:nt("string")};class ll{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new X(q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}class cl{constructor(e){this._methodName=e}}class an{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new X(q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new X(q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return _e(this._lat,e._lat)||_e(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:an._jsonSchemaVersion}}static fromJSON(e){if(za(e,an._jsonSchema))return new an(e.latitude,e.longitude)}}an._jsonSchemaVersion="firestore/geoPoint/1.0",an._jsonSchema={type:nt("string",an._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};class jt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,a){if(i.length!==a.length)return!1;for(let s=0;s<i.length;++s)if(i[s]!==a[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:jt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(za(e,jt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new jt(e.vectorValues);throw new X(q.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}jt._jsonSchemaVersion="firestore/vectorValue/1.0",jt._jsonSchema={type:nt("string",jt._jsonSchemaVersion),vectorValues:nt("object")};const bw=/^__.*__$/;class ww{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Qn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ua(e,this.data,t,this.fieldTransforms)}}class yh{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new Qn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function vh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw oe(40011,{dataSource:n})}}class dl{constructor(e,t,i,a,s,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=a,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new dl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePathSegment(e),i}childContextForFieldPath(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePath(),i}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return zs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(vh(this.dataSource)&&bw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class _w{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||ir(e)}createContext(e,t,i,a=!1){return new dl({dataSource:e,methodName:t,targetDoc:i,path:pt.emptyPath(),arrayElement:!1,hasConverter:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function lr(n){const e=n._freezeSettings(),t=ir(n._databaseId);return new _w(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bh(n,e,t,i,a,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,a);ul("Data must be an object, but it was:",o,i);const l=wh(i,o);let c,u;if(s.merge)c=new Dt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const _ of s.mergeFields){const b=gi(e,_,t);if(!o.contains(b))throw new X(q.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);Eh(h,b)||h.push(b)}c=new Dt(h),u=o.fieldTransforms.filter((_=>c.covers(_.field)))}else c=null,u=o.fieldTransforms;return new ww(new At(l),c,u)}class cr extends cl{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof cr}}function xw(n,e,t,i){const a=n.createContext(1,e,t);ul("Data must be an object, but it was:",a,i);const s=[],o=At.empty();Kn(i,((c,u)=>{const h=xh(e,c,t);u=Be(u);const _=a.childContextForFieldPath(h);if(u instanceof cr)s.push(h);else{const b=Wa(u,_);b!=null&&(s.push(h),o.set(h,b))}}));const l=new Dt(s);return new yh(o,l,a.fieldTransforms)}function Ew(n,e,t,i,a,s){const o=n.createContext(1,e,t),l=[gi(e,i,t)],c=[a];if(s.length%2!=0)throw new X(q.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<s.length;b+=2)l.push(gi(e,s[b])),c.push(s[b+1]);const u=[],h=At.empty();for(let b=l.length-1;b>=0;--b)if(!Eh(u,l[b])){const R=l[b];let M=c[b];M=Be(M);const D=o.childContextForFieldPath(R);if(M instanceof cr)u.push(R);else{const v=Wa(M,D);v!=null&&(u.push(R),h.set(R,v))}}const _=new Dt(u);return new yh(h,_,o.fieldTransforms)}function Iw(n,e,t,i=!1){return Wa(t,n.createContext(i?4:3,e))}function Wa(n,e){if(_h(n=Be(n)))return ul("Unsupported field value:",e,n),wh(n,e);if(n instanceof cl)return(function(i,a){if(!vh(a.dataSource))throw a.createError(`${i._methodName}() can only be used with update() and set()`);if(!a.path)throw a.createError(`${i._methodName}() is not currently supported inside arrays`);const s=i._toFieldTransform(a);s&&a.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(i,a){const s=[];let o=0;for(const l of i){let c=Wa(l,a.childContextForArray(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(n,e)}return(function(i,a){if((i=Be(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return rb(a.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const s=ge.fromDate(i);return{timestampValue:Ms(a.serializer,s)}}if(i instanceof ge){const s=new ge(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:Ms(a.serializer,s)}}if(i instanceof an)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Ot)return{bytesValue:Fp(a.serializer,i._byteString)};if(i instanceof Ke){const s=a.databaseId,o=i.firestore._databaseId;if(!o.isEqual(s))throw a.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:qo(i.firestore._databaseId||a.databaseId,i._key.path)}}if(i instanceof jt)return(function(o,l){const c=o instanceof jt?o.toArray():o;return{mapValue:{fields:{[fp]:{stringValue:gp},[Rs]:{arrayValue:{values:c.map((h=>{if(typeof h!="number")throw l.createError("VectorValues must only contain numeric values.");return Fo(l.serializer,h)}))}}}}}})(i,a);if(Gp(i))return i._toProto(a.serializer);throw a.createError(`Unsupported field value: ${Gs(i)}`)})(n,e)}function wh(n,e){const t={};return cp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Kn(n,((i,a)=>{const s=Wa(a,e.childContextForField(i));s!=null&&(t[i]=s)})),{mapValue:{fields:t}}}function _h(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof an||n instanceof Ot||n instanceof Ke||n instanceof cl||n instanceof jt||Gp(n))}function ul(n,e,t){if(!_h(t)||!op(t)){const i=Gs(t);throw i==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+i)}}function gi(n,e,t){if((e=Be(e))instanceof ll)return e._internalPath;if(typeof e=="string")return xh(n,e);throw zs("Field path arguments must be of type string or ",n,!1,void 0,t)}const Tw=new RegExp("[~\\*/\\[\\]]");function xh(n,e,t){if(e.search(Tw)>=0)throw zs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ll(...e.split("."))._internalPath}catch{throw zs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function zs(n,e,t,i,a){const s=i&&!i.isEmpty(),o=a!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${i}`),o&&(c+=` in document ${a}`),c+=")"),new X(q.INVALID_ARGUMENT,l+n+c)}function Eh(n,e){return n.some((t=>t.isEqual(e)))}class kw{convertValue(e,t="none"){switch(Un(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Je(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(zn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw oe(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Kn(e,((a,s)=>{i[a]=this.convertValue(s,t)})),i}convertVectorValue(e){const t=e.fields?.[Rs].arrayValue?.values?.map((i=>Je(i.doubleValue)));return new jt(t)}convertGeoPoint(e){return new an(Je(e.latitude),Je(e.longitude))}convertArray(e,t){return(e.values||[]).map((i=>this.convertValue(i,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const i=Ys(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Sa(e));default:return null}}convertTimestamp(e){const t=Fn(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=Ne.fromString(e);Se(Wp(i),9688,{name:e});const a=new Ca(i.get(1),i.get(3)),s=new ie(i.popFirst(5));return a.isEqual(t)||fn(`Document ${s} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}class pl extends kw{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ot(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}const Md="@firebase/firestore",Od="4.11.0";function Vd(n){return(function(t,i){if(typeof t!="object"||t===null)return!1;const a=t;for(const s of i)if(s in a&&typeof a[s]=="function")return!0;return!1})(n,["next","error","complete"])}class Ih{constructor(e,t,i,a,s){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=a,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Aw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(gi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Aw extends Ih{data(){return super.data()}}function Th(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new X(q.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class hl{}class ml extends hl{}function Mn(n,e,...t){let i=[];e instanceof hl&&i.push(e),i=i.concat(t),(function(s){const o=s.filter((c=>c instanceof fl)).length,l=s.filter((c=>c instanceof dr)).length;if(o>1||o>0&&l>0)throw new X(q.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(i);for(const a of i)n=a._apply(n);return n}class dr extends ml{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new dr(e,t,i)}_apply(e){const t=this._parse(e);return kh(e._query,t),new vn(e.firestore,e.converter,oo(e._query,t))}_parse(e){const t=lr(e.firestore);return(function(s,o,l,c,u,h,_){let b;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new X(q.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Fd(_,h);const M=[];for(const D of _)M.push(Bd(c,s,D));b={arrayValue:{values:M}}}else b=Bd(c,s,_)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Fd(_,h),b=Iw(l,o,_,h==="in"||h==="not-in");return tt.create(u,h,b)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function On(n,e,t){const i=e,a=gi("where",n);return dr._create(a,i,t)}class fl extends hl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fl(e,t)}_parse(e){const t=this._queryConstraints.map((i=>i._parse(e))).filter((i=>i.getFilters().length>0));return t.length===1?t[0]:Ht.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(a,s){let o=a;const l=s.getFlattenedFilters();for(const c of l)kh(o,c),o=oo(o,c)})(e._query,t),new vn(e.firestore,e.converter,oo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class gl extends ml{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new gl(e,t)}_apply(e){const t=(function(a,s,o){if(a.startAt!==null)throw new X(q.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(a.endAt!==null)throw new X(q.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ra(s,o)})(e._query,this._field,this._direction);return new vn(e.firestore,e.converter,Xv(e._query,t))}}function Sw(n,e="asc"){const t=e,i=gi("orderBy",n);return gl._create(i,t)}class yl extends ml{constructor(e,t,i){super(),this.type=e,this._limit=t,this._limitType=i}static _create(e,t,i){return new yl(e,t,i)}_apply(e){return new vn(e.firestore,e.converter,Ds(e._query,this._limit,this._limitType))}}function Cw(n){return yl._create("limit",n,"F")}function Bd(n,e,t){if(typeof(t=Be(t))=="string"){if(t==="")throw new X(q.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ip(e)&&t.indexOf("/")!==-1)throw new X(q.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(Ne.fromString(t));if(!ie.isDocumentKey(i))throw new X(q.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Zc(n,new ie(i))}if(t instanceof Ke)return Zc(n,t._key);throw new X(q.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Gs(t)}.`)}function Fd(n,e){if(!Array.isArray(n)||n.length===0)throw new X(q.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function kh(n,e){const t=(function(a,s){for(const o of a)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new X(q.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new X(q.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Ah(n,e,t){let i;return i=n?n.toFirestore(e):e,i}class ga{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ai extends Ih{constructor(e,t,i,a,s,o){super(e,t,i,a,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ws(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(gi("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new X(q.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ai._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ai._jsonSchemaVersion="firestore/documentSnapshot/1.0",ai._jsonSchema={type:nt("string",ai._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class ws extends ai{data(e={}){return super.data(e)}}class si{constructor(e,t,i,a){this._firestore=e,this._userDataWriter=t,this._snapshot=a,this.metadata=new ga(a.hasPendingWrites,a.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new ws(this._firestore,this._userDataWriter,i.key,i,new ga(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new X(q.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(a,s){if(a._snapshot.oldDocs.isEmpty()){let o=0;return a._snapshot.docChanges.map((l=>{const c=new ws(a._firestore,a._userDataWriter,l.doc.key,l.doc,new ga(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=a._snapshot.oldDocs;return a._snapshot.docChanges.filter((l=>s||l.type!==3)).map((l=>{const c=new ws(a._firestore,a._userDataWriter,l.doc.key,l.doc,new ga(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);let u=-1,h=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),h=o.indexOf(l.doc.key)),{type:Pw(l.type),doc:c,oldIndex:u,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new X(q.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=si._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=$o.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],a=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),i.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),a.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Pw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return oe(61501,{type:n})}}si._jsonSchemaVersion="firestore/querySnapshot/1.0",si._jsonSchema={type:nt("string",si._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};function Rw(n){n=St(n,Ke);const e=St(n.firestore,yn),t=or(e);return uw(t,n._key).then((i=>Sh(e,n,i)))}function Lw(n){n=St(n,vn);const e=St(n.firestore,yn),t=or(e),i=new pl(e);return Th(n._query),pw(t,n._query).then((a=>new si(e,i,n,a)))}function Dw(n,e,t){n=St(n,Ke);const i=St(n.firestore,yn),a=Ah(n.converter,e),s=lr(i);return ur(i,[bh(s,"setDoc",n._key,a,n.converter!==null,t).toMutation(n._key,Vt.none())])}function $w(n,e,t,...i){n=St(n,Ke);const a=St(n.firestore,yn),s=lr(a);let o;return o=typeof(e=Be(e))=="string"||e instanceof ll?Ew(s,"updateDoc",n._key,e,t,i):xw(s,"updateDoc",n._key,e),ur(a,[o.toMutation(n._key,Vt.exists(!0))])}function Nw(n){return ur(St(n.firestore,yn),[new zo(n._key,Vt.none())])}function Mw(n,e){const t=St(n.firestore,yn),i=fa(n),a=Ah(n.converter,e),s=lr(n.firestore);return ur(t,[bh(s,"addDoc",i._key,a,n.converter!==null,{}).toMutation(i._key,Vt.exists(!1))]).then((()=>i))}function $a(n,...e){n=Be(n);let t={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||Vd(e[i])||(t=e[i++]);const a={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Vd(e[i])){const u=e[i];e[i]=u.next?.bind(u),e[i+1]=u.error?.bind(u),e[i+2]=u.complete?.bind(u)}let s,o,l;if(n instanceof Ke)o=St(n.firestore,yn),l=Js(n._key.path),s={next:u=>{e[i]&&e[i](Sh(o,n,u))},error:e[i+1],complete:e[i+2]};else{const u=St(n,vn);o=St(u.firestore,yn),l=u._query;const h=new pl(o);s={next:_=>{e[i]&&e[i](new si(o,h,u,_))},error:e[i+1],complete:e[i+2]},Th(n._query)}const c=or(o);return dw(c,l,a,s)}function ur(n,e){const t=or(n);return hw(t,e)}function Sh(n,e,t){const i=t.docs.get(e._key),a=new pl(n);return new ai(n,a,e._key,i,new ga(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){pv(vi),ci(new Vn("firestore",((i,{instanceIdentifier:a,options:s})=>{const o=i.getProvider("app").getImmediate(),l=new yn(new fv(i.getProvider("auth-internal")),new vv(o,i.getProvider("app-check-internal")),Nv(o,a),o);return s={useFetchStreams:t,...s},l._setSettings(s),l}),"PUBLIC").setMultipleInstances(!0)),Xt(Md,Od,e),Xt(Md,Od,"esm2020")})();const Ch="firebasestorage.googleapis.com",Ph="storageBucket",Ow=120*1e3,Vw=600*1e3;class Ye extends rn{constructor(e,t,i=0){super(Br(e),`Firebase Storage: ${t} (${Br(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ye.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Br(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Qe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Qe||(Qe={}));function Br(n){return"storage/"+n}function vl(){const n="An unknown error occurred, please check the error payload for server response.";return new Ye(Qe.UNKNOWN,n)}function Bw(n){return new Ye(Qe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Fw(n){return new Ye(Qe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function zw(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ye(Qe.UNAUTHENTICATED,n)}function Uw(){return new Ye(Qe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function jw(n){return new Ye(Qe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function qw(){return new Ye(Qe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Hw(){return new Ye(Qe.CANCELED,"User canceled the upload/download.")}function Ww(n){return new Ye(Qe.INVALID_URL,"Invalid URL '"+n+"'.")}function Gw(n){return new Ye(Qe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Kw(){return new Ye(Qe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ph+"' property when initializing the app?")}function Qw(){return new Ye(Qe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Yw(){return new Ye(Qe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Jw(n){return new Ye(Qe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function vo(n){return new Ye(Qe.INVALID_ARGUMENT,n)}function Rh(){return new Ye(Qe.APP_DELETED,"The Firebase app was deleted.")}function Xw(n){return new Ye(Qe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ea(n,e){return new Ye(Qe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ra(n){throw new Ye(Qe.INTERNAL_ERROR,"Internal error: "+n)}class $t{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=$t.makeFromUrl(e,t)}catch{return new $t(e,"")}if(i.path==="")return i;throw Gw(e)}static makeFromUrl(e,t){let i=null;const a="([A-Za-z0-9.\\-_]+)";function s(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+a+o,"i"),c={bucket:1,path:3};function u(C){C.path_=decodeURIComponent(C.path)}const h="v[A-Za-z0-9_]+",_=t.replace(/[.]/g,"\\."),b="(/([^?#]*).*)?$",R=new RegExp(`^https?://${_}/${h}/b/${a}/o${b}`,"i"),M={bucket:1,path:3},D=t===Ch?"(?:storage.googleapis.com|storage.cloud.google.com)":t,v="([^?#]*)",k=new RegExp(`^https?://${D}/${a}/${v}`,"i"),$=[{regex:l,indices:c,postModify:s},{regex:R,indices:M,postModify:u},{regex:k,indices:{bucket:1,path:2},postModify:u}];for(let C=0;C<$.length;C++){const T=$[C],A=T.regex.exec(e);if(A){const f=A[T.indices.bucket];let m=A[T.indices.path];m||(m=""),i=new $t(f,m),T.postModify(i);break}}if(i==null)throw Ww(e);return i}}class Zw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function e_(n,e,t){let i=1,a=null,s=null,o=!1,l=0;function c(){return l===2}let u=!1;function h(...v){u||(u=!0,e.apply(null,v))}function _(v){a=setTimeout(()=>{a=null,n(R,c())},v)}function b(){s&&clearTimeout(s)}function R(v,...k){if(u){b();return}if(v){b(),h.call(null,v,...k);return}if(c()||o){b(),h.call(null,v,...k);return}i<64&&(i*=2);let $;l===1?(l=2,$=0):$=(i+Math.random())*1e3,_($)}let M=!1;function D(v){M||(M=!0,b(),!u&&(a!==null?(v||(l=2),clearTimeout(a),_(0)):v||(l=1)))}return _(0),s=setTimeout(()=>{o=!0,D(!0)},t),D}function t_(n){n(!1)}function n_(n){return n!==void 0}function i_(n){return typeof n=="object"&&!Array.isArray(n)}function bl(n){return typeof n=="string"||n instanceof String}function zd(n){return wl()&&n instanceof Blob}function wl(){return typeof Blob<"u"}function Ud(n,e,t,i){if(i<e)throw vo(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw vo(`Invalid value for '${n}'. Expected ${t} or less.`)}function pr(n,e,t){let i=e;return t==null&&(i=`https://${e}`),`${t}://${i}/v0${n}`}function Lh(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const a=e(i)+"="+e(n[i]);t=t+a+"&"}return t=t.slice(0,-1),t}var ri;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ri||(ri={}));function a_(n,e){const t=n>=500&&n<600,a=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||a||s}class s_{constructor(e,t,i,a,s,o,l,c,u,h,_,b=!0,R=!1){this.url_=e,this.method_=t,this.headers_=i,this.body_=a,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=_,this.retry=b,this.isUsingEmulator=R,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((M,D)=>{this.resolve_=M,this.reject_=D,this.start_()})}start_(){const e=(i,a)=>{if(a){i(!1,new ls(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===ri.NO_ERROR,c=s.getStatus();if(!l||a_(c,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===ri.ABORT;i(!1,new ls(!1,null,h));return}const u=this.successCodes_.indexOf(c)!==-1;i(!0,new ls(u,s))})},t=(i,a)=>{const s=this.resolve_,o=this.reject_,l=a.connection;if(a.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());n_(c)?s(c):s()}catch(c){o(c)}else if(l!==null){const c=vl();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(a.canceled){const c=this.appDelete_?Rh():Hw();o(c)}else{const c=qw();o(c)}};this.canceled_?t(!1,new ls(!1,null,!0)):this.backoffId_=e_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&t_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ls{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function r_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function o_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function l_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function c_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function d_(n,e,t,i,a,s,o=!0,l=!1){const c=Lh(n.urlParams),u=n.url+c,h=Object.assign({},n.headers);return l_(h,e),r_(h,t),o_(h,s),c_(h,i),new s_(u,n.method,h,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,a,o,l)}function u_(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function p_(...n){const e=u_();if(e!==void 0){const t=new e;for(let i=0;i<n.length;i++)t.append(n[i]);return t.getBlob()}else{if(wl())return new Blob(n);throw new Ye(Qe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function h_(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function m_(n){if(typeof atob>"u")throw Jw("base-64");return atob(n)}const Jt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Fr{constructor(e,t){this.data=e,this.contentType=t||null}}function f_(n,e){switch(n){case Jt.RAW:return new Fr(Dh(e));case Jt.BASE64:case Jt.BASE64URL:return new Fr($h(n,e));case Jt.DATA_URL:return new Fr(y_(e),v_(e))}throw vl()}function Dh(n){const e=[];for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=i,o=n.charCodeAt(++t);i=65536|(s&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function g_(n){let e;try{e=decodeURIComponent(n)}catch{throw Ea(Jt.DATA_URL,"Malformed data URL.")}return Dh(e)}function $h(n,e){switch(n){case Jt.BASE64:{const a=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(a||s)throw Ea(n,"Invalid character '"+(a?"-":"_")+"' found: is it base64url encoded?");break}case Jt.BASE64URL:{const a=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(a||s)throw Ea(n,"Invalid character '"+(a?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=m_(e)}catch(a){throw a.message.includes("polyfill")?a:Ea(n,"Invalid character found")}const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return i}class Nh{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ea(Jt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=t[1]||null;i!=null&&(this.base64=b_(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function y_(n){const e=new Nh(n);return e.base64?$h(Jt.BASE64,e.rest):g_(e.rest)}function v_(n){return new Nh(n).contentType}function b_(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}class Pn{constructor(e,t){let i=0,a="";zd(e)?(this.data_=e,i=e.size,a=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=a}size(){return this.size_}type(){return this.type_}slice(e,t){if(zd(this.data_)){const i=this.data_,a=h_(i,e,t);return a===null?null:new Pn(a)}else{const i=new Uint8Array(this.data_.buffer,e,t-e);return new Pn(i,!0)}}static getBlob(...e){if(wl()){const t=e.map(i=>i instanceof Pn?i.data_:i);return new Pn(p_.apply(null,t))}else{const t=e.map(o=>bl(o)?f_(Jt.RAW,o).data:o.data_);let i=0;t.forEach(o=>{i+=o.byteLength});const a=new Uint8Array(i);let s=0;return t.forEach(o=>{for(let l=0;l<o.length;l++)a[s++]=o[l]}),new Pn(a,!0)}}uploadData(){return this.data_}}function Mh(n){let e;try{e=JSON.parse(n)}catch{return null}return i_(e)?e:null}function w_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function __(n,e){const t=e.split("/").filter(i=>i.length>0).join("/");return n.length===0?t:n+"/"+t}function Oh(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function x_(n,e){return e}class It{constructor(e,t,i,a){this.server=e,this.local=t||e,this.writable=!!i,this.xform=a||x_}}let cs=null;function E_(n){return!bl(n)||n.length<2?n:Oh(n)}function Vh(){if(cs)return cs;const n=[];n.push(new It("bucket")),n.push(new It("generation")),n.push(new It("metageneration")),n.push(new It("name","fullPath",!0));function e(s,o){return E_(o)}const t=new It("name");t.xform=e,n.push(t);function i(s,o){return o!==void 0?Number(o):o}const a=new It("size");return a.xform=i,n.push(a),n.push(new It("timeCreated")),n.push(new It("updated")),n.push(new It("md5Hash",null,!0)),n.push(new It("cacheControl",null,!0)),n.push(new It("contentDisposition",null,!0)),n.push(new It("contentEncoding",null,!0)),n.push(new It("contentLanguage",null,!0)),n.push(new It("contentType",null,!0)),n.push(new It("metadata","customMetadata",!0)),cs=n,cs}function I_(n,e){function t(){const i=n.bucket,a=n.fullPath,s=new $t(i,a);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function T_(n,e,t){const i={};i.type="file";const a=t.length;for(let s=0;s<a;s++){const o=t[s];i[o.local]=o.xform(i,e[o.server])}return I_(i,n),i}function Bh(n,e,t){const i=Mh(e);return i===null?null:T_(n,i,t)}function k_(n,e,t,i){const a=Mh(e);if(a===null||!bl(a.downloadTokens))return null;const s=a.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const h=n.bucket,_=n.fullPath,b="/b/"+o(h)+"/o/"+o(_),R=pr(b,t,i),M=Lh({alt:"media",token:u});return R+M})[0]}function A_(n,e){const t={},i=e.length;for(let a=0;a<i;a++){const s=e[a];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class _l{constructor(e,t,i,a){this.url=e,this.method=t,this.handler=i,this.timeout=a,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function Fh(n){if(!n)throw vl()}function S_(n,e){function t(i,a){const s=Bh(n,a,e);return Fh(s!==null),s}return t}function C_(n,e){function t(i,a){const s=Bh(n,a,e);return Fh(s!==null),k_(s,a,n.host,n._protocol)}return t}function zh(n){function e(t,i){let a;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?a=Uw():a=zw():t.getStatus()===402?a=Fw(n.bucket):t.getStatus()===403?a=jw(n.path):a=i,a.status=t.getStatus(),a.serverResponse=i.serverResponse,a}return e}function Uh(n){const e=zh(n);function t(i,a){let s=e(i,a);return i.getStatus()===404&&(s=Bw(n.path)),s.serverResponse=a.serverResponse,s}return t}function P_(n,e,t){const i=e.fullServerUrl(),a=pr(i,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,l=new _l(a,s,C_(n,t),o);return l.errorHandler=Uh(e),l}function R_(n,e){const t=e.fullServerUrl(),i=pr(t,n.host,n._protocol),a="DELETE",s=n.maxOperationRetryTime;function o(c,u){}const l=new _l(i,a,o,s);return l.successCodes=[200,204],l.errorHandler=Uh(e),l}function L_(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function D_(n,e,t){const i=Object.assign({},t);return i.fullPath=n.path,i.size=e.size(),i.contentType||(i.contentType=L_(null,e)),i}function $_(n,e,t,i,a){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let $="";for(let C=0;C<2;C++)$=$+Math.random().toString().slice(2);return $}const c=l();o["Content-Type"]="multipart/related; boundary="+c;const u=D_(e,i,a),h=A_(u,t),_="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,b=`\r
--`+c+"--",R=Pn.getBlob(_,i,b);if(R===null)throw Qw();const M={name:u.fullPath},D=pr(s,n.host,n._protocol),v="POST",k=n.maxUploadRetryTime,S=new _l(D,v,S_(n,t),k);return S.urlParams=M,S.headers=o,S.body=R.uploadData(),S.errorHandler=zh(e),S}class N_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ri.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ri.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ri.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,i,a,s){if(this.sent_)throw ra("cannot .send() more than once");if(Hn(e)&&i&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return a!==void 0?this.xhr_.send(a):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ra("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ra("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ra("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ra("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class M_ extends N_{initXhr(){this.xhr_.responseType="text"}}function xl(){return new M_}class yi{constructor(e,t){this._service=e,t instanceof $t?this._location=t:this._location=$t.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new yi(e,t)}get root(){const e=new $t(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Oh(this._location.path)}get storage(){return this._service}get parent(){const e=w_(this._location.path);if(e===null)return null;const t=new $t(this._location.bucket,e);return new yi(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Xw(e)}}function O_(n,e,t){n._throwIfRoot("uploadBytes");const i=$_(n.storage,n._location,Vh(),new Pn(e,!0),t);return n.storage.makeRequestWithTokens(i,xl).then(a=>({metadata:a,ref:n}))}function V_(n){n._throwIfRoot("getDownloadURL");const e=P_(n.storage,n._location,Vh());return n.storage.makeRequestWithTokens(e,xl).then(t=>{if(t===null)throw Yw();return t})}function B_(n){n._throwIfRoot("deleteObject");const e=R_(n.storage,n._location);return n.storage.makeRequestWithTokens(e,xl)}function F_(n,e){const t=__(n._location.path,e),i=new $t(n._location.bucket,t);return new yi(n.storage,i)}function z_(n){return/^[A-Za-z]+:\/\//.test(n)}function U_(n,e){return new yi(n,e)}function jh(n,e){if(n instanceof El){const t=n;if(t._bucket==null)throw Kw();const i=new yi(t,t._bucket);return e!=null?jh(i,e):i}else return e!==void 0?F_(n,e):n}function j_(n,e){if(e&&z_(e)){if(n instanceof El)return U_(n,e);throw vo("To use ref(service, url), the first argument must be a Storage instance.")}else return jh(n,e)}function jd(n,e){const t=e?.[Ph];return t==null?null:$t.makeFromBucketSpec(t,n)}function q_(n,e,t,i={}){n.host=`${e}:${t}`;const a=Hn(e);a&&(bo(`https://${n.host}/b`),wo("Storage",!0)),n._isUsingEmulator=!0,n._protocol=a?"https":"http";const{mockUserToken:s}=i;s&&(n._overrideAuthToken=typeof s=="string"?s:pu(s,n.app.options.projectId))}class El{constructor(e,t,i,a,s,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=a,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=Ch,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ow,this._maxUploadRetryTime=Vw,this._requests=new Set,a!=null?this._bucket=$t.makeFromBucketSpec(a,this._host):this._bucket=jd(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=$t.makeFromBucketSpec(this._url,e):this._bucket=jd(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ud("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ud("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new yi(this,e)}_makeRequest(e,t,i,a,s=!0){if(this._deleted)return new Zw(Rh());{const o=d_(e,this._appId,i,a,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[i,a]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,a).getPromise()}}const qd="@firebase/storage",Hd="0.14.0";const qh="storage";function Ni(n,e,t){return n=Be(n),O_(n,e,t)}function oi(n){return n=Be(n),V_(n)}function H_(n){return n=Be(n),B_(n)}function un(n,e){return n=Be(n),j_(n,e)}function W_(n=Io(),e){n=Be(n);const i=js(n,qh).getImmediate({identifier:e}),a=cu("storage");return a&&G_(i,...a),i}function G_(n,e,t,i={}){q_(n,e,t,i)}function K_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),a=n.getProvider("app-check-internal");return new El(t,i,a,e,vi)}function Q_(){ci(new Vn(qh,K_,"PUBLIC").setMultipleInstances(!0)),Xt(qd,Hd,""),Xt(qd,Hd,"esm2020")}Q_();const Hh={apiKey:"AIzaSyAOV2Dz0mrJAIT2DLQsrLCTC2bLO7lkzmI",authDomain:"conectacidade-5e46d.firebaseapp.com",projectId:"conectacidade-5e46d",storageBucket:"conectacidade-5e46d.firebasestorage.app",messagingSenderId:"740343372037",appId:"1:740343372037:web:a74dcf684844bc9167ff6c",measurementId:"G-GH3W7LBTWZ"},Il=Eo(Hh),zr=Ju(Il),zt=yw(Il),pn=W_(Il),F={async create(n,e){const t=fi(zt,n);return(await Mw(t,{...e,createdAt:ge.now()})).id},async set(n,e,t){const i=fa(zt,n,e);await Dw(i,{...t,createdAt:ge.now()})},async getAll(n,e){const t=fi(zt,n);let i=Mn(t);if(e)if(Array.isArray(e)){const s=e.map(o=>On(o.field,o.operator,o.value));i=Mn(t,...s)}else i=Mn(t,On(e.field,e.operator,e.value));return(await Lw(i)).docs.map(s=>({id:s.id,...s.data()}))},async get(n,e){const t=fa(zt,n,e),i=await Rw(t);return i.exists()?{id:i.id,...i.data()}:null},async update(n,e,t){const i=fa(zt,n,e);await $w(i,t)},async delete(n,e){const t=fa(zt,n,e);await Nw(t)}},Y_=Object.freeze(Object.defineProperty({__proto__:null,dbService:F},Symbol.toStringTag,{value:"Module"}));class J_{currentUser=null;listeners=[];constructor(){Jg(zr,async e=>{if(e)if(e.email==="ginannymoreira@gmail.com")this.currentUser={uid:e.uid,email:e.email,role:"admin"};else try{const t=await F.get("users",e.uid);if(t){const i=t;if(i.companyId){const s=await F.get("companies",i.companyId);if(s&&s.status==="inactive"){await this.logout();const{toast:o}=await Hr(async()=>{const{toast:l}=await Promise.resolve().then(()=>Wd);return{toast:l}},void 0);o.error("Seu acesso de cliente foi desativado. Entre em contato com o administrador.");return}}this.currentUser={uid:e.uid,email:e.email,role:i.role,companyId:i.companyId,storeId:i.storeId,storeIds:i.storeIds}}else{console.warn("User authenticated but not found in DB",e.uid),await this.logout();const{toast:i}=await Hr(async()=>{const{toast:a}=await Promise.resolve().then(()=>Wd);return{toast:a}},void 0);i.error("Sua conta não foi encontrada ou foi removida."),this.currentUser=null}}catch(t){console.error("Error fetching user profile:",t),this.currentUser=null}else this.currentUser=null;this.notifyListeners()})}async login(e,t){await Kg(zr,e,t)}async logout(){await Xg(zr)}async registerUser(e,t){const i=Eo(Hh,"Secondary"),a=Ju(i);return(await Gg(a,e,t)).user.uid}getCurrentUser(){return this.currentUser}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e(this.currentUser))}}const Ae=new J_,X_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1,a=!1;if(n&&n.companyId)try{const l=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"];l.includes("venda")&&(e=!0),l.includes("agendamento")&&(t=!0),l.includes("disparo")&&(i=!0),l.includes("venda_catalogo")&&(a=!0)}catch(s){console.error("Error fetching company for sidebar:",s)}return a?`
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



                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${t?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
                </a>
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
    `},Z_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1;if(n&&n.companyId)try{const o=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"];o.includes("venda")&&(e=!0),o.includes("agendamento")&&(t=!0),o.includes("venda_catalogo")&&(i=!0)}catch(a){console.error("Error fetching company for employee sidebar:",a)}return i?`
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
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
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
    `,Bt="https://evolution.vps.pequi.digital",Ft="1120d381afc6900754fc87d8264ed6335aeab3223b4d24810a17145399c16e46",vt={async createInstance(n){try{const e=await fetch(`${Bt}/instance/create`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({instanceName:n,qrcode:!0,integration:"WHATSAPP-BAILEYS"})});if(!e.ok){const t=await e.json();throw new Error(t.message||"Failed to create instance")}return await e.json()}catch(e){throw console.error("Evolution API - Create Instance Error:",e),e}},async setWebhook(n,e,t=!0){try{const i=await fetch(`${Bt}/webhook/set/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({webhook:{enabled:t,url:e,byEvents:!1,base64:!0,events:["MESSAGES_UPSERT"]}})});return i.ok?!0:(console.error("Evolution API - Set Webhook Error:",await i.text()),!1)}catch(i){return console.error("Evolution API - Set Webhook Exception:",i),!1}},async getInstanceStatus(n){try{const e=await fetch(`${Bt}/instance/connectionState/${n}`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)throw new Error("Failed to get instance status");const t=await e.json();return{state:t.state||t.instance?.state||"close",connected:t.state==="open"||t.instance?.state==="open"}}catch(e){return console.error("Evolution API - Get Status Error:",e),{state:"close",connected:!1}}},async getQRCode(n){try{const e=await fetch(`${Bt}/instance/connect/${n}`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)throw new Error("Failed to get QR code");const t=await e.json();return t.qrcode?.base64?{base64:t.qrcode.base64}:t.base64?{base64:t.base64}:null}catch(e){return console.error("Evolution API - Get QR Code Error:",e),null}},async deleteInstance(n){try{return(await fetch(`${Bt}/instance/delete/${n}`,{method:"DELETE",headers:{apikey:Ft}})).ok}catch(e){return console.error("Evolution API - Delete Instance Error:",e),!1}},async logoutInstance(n){try{return(await fetch(`${Bt}/instance/logout/${n}`,{method:"DELETE",headers:{apikey:Ft}})).ok}catch(e){return console.error("Evolution API - Logout Instance Error:",e),!1}},async instanceExists(n){try{const e=await fetch(`${Bt}/instance/fetchInstances`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)return!1;const t=await e.json();return Array.isArray(t)&&t.some(i=>i.instance?.instanceName===n)}catch(e){return console.error("Evolution API - Check Instance Exists Error:",e),!1}},async sendText(n,e,t){try{let i=e.replace(/\D/g,"");i.length<=11&&!i.startsWith("55")&&(i="55"+i);const a=i,s=await fetch(`${Bt}/message/sendText/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({number:a,text:t,delay:1200,linkPreview:!0})});if(!s.ok){const o=await s.json();return console.error("Evolution API - Send Text Error:",o),!1}return!0}catch(i){return console.error("Evolution API - Send Text Exception:",i),!1}}};class tx{container=null;soundEnabled=!0;constructor(){this.init()}init(){typeof window>"u"||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container))}playSound(e){if(this.soundEnabled)try{const t=new Audio;switch(e){case"success":t.src="/sounds/success.mp3";break;case"error":t.src="/sounds/error.mp3";break;case"warning":t.src="/sounds/warning.mp3";break;default:return}t.volume=.3,t.play().catch(()=>{})}catch{}}show(e){const{message:t,type:i="info",duration:a=3e3,sound:s=!0}=e;if(this.container||this.init(),!this.container)return;const o=document.createElement("div");o.className=`toast toast-${i}`;const l={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};o.innerHTML=`
            <div class="toast-icon">${l[i]}</div>
            <div class="toast-message">${t}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `,this.container.appendChild(o),s&&this.playSound(i),setTimeout(()=>{o.classList.add("toast-exit"),setTimeout(()=>o.remove(),300)},a)}success(e,t){this.show({message:e,type:"success",duration:t})}error(e,t){this.show({message:e,type:"error",duration:t})}warning(e,t){this.show({message:e,type:"warning",duration:t})}info(e,t){this.show({message:e,type:"info",duration:t})}setSoundEnabled(e){this.soundEnabled=e}}const V=new tx,Wd=Object.freeze(Object.defineProperty({__proto__:null,toast:V},Symbol.toStringTag,{value:"Module"}));window.copyToClipboard=(n,e="Link copiado!")=>{navigator.clipboard.writeText(n).then(()=>{V.success(e)}).catch(t=>{console.error("Erro ao copiar link:",t),V.error("Erro ao copiar link.")})};window.toggleStoreActive=async(n,e,t)=>{try{const i=await F.get("companies",n);if(!i)return;const s=i.stores||[],o=s.findIndex(l=>l.id===e);o!==-1&&(s[o].active=t,await F.update("companies",n,{stores:s}),V.success(`Loja ${t?"ativada":"desativada"} com sucesso!`),setTimeout(()=>location.reload(),1e3))}catch(i){console.error("Error toggling store status:",i),V.error("Erro ao alterar status da loja.")}};const nx=async()=>{const n=Ae.getCurrentUser();if(!n)return"";let e={messages:0,payments:0,orders_pending:0,orders_paid:0,today:0,openai:{usage:0,credits:0,limit:0}},t=["atendimento"],i=null;if(n?.role==="admin"){t=["atendimento","venda","agendamento","disparo"];try{(await F.getAll("companies")).forEach(l=>{l.metrics&&(e.messages+=l.metrics.totalMessages||0,e.payments+=l.metrics.totalPayments||0)}),e.orders_pending=15,e.orders_paid=1200;const o=await F.get("settings","openai");o?e.openai={usage:o.usage||0,credits:o.credits||0,limit:o.limit||0}:e.openai={usage:0,credits:0,limit:0}}catch(s){console.error("Error fetching dashboard data:",s)}}else if(n?.companyId)try{if(t=(await F.get("companies",n.companyId))?.modulos_ativos||["atendimento"],t.includes("atendimento")){const l=await F.getAll("messages",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]);e.messages=l.filter(u=>u.role!=="assistente"?!1:n.role==="owner"?!0:u.lojaId&&c.includes(u.lojaId)).length}if(t.includes("venda")||t.includes("venda_catalogo")){const l=await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]),u=n.role==="owner"?l:l.filter(R=>R.lojaId&&c.includes(R.lojaId));e.orders_pending=u.filter(R=>R.status!=="finalizado"&&R.status!=="cancelado").length,e.orders_paid=u.filter(R=>R.status==="finalizado").length;let h=0,_=0;const b=new Date;if(b.setHours(0,0,0,0),u.forEach(R=>{R.status==="finalizado"&&(h+=R.value||R.total||0),(R.criadoEm?.toDate?R.criadoEm.toDate():new Date(R.criadoEm||0))>=b&&_++}),e.payments=h,e.today=_,t.includes("venda_catalogo")){const M=(await F.getAll("products",{field:"companyId",operator:"==",value:n.companyId})).filter(C=>C.stock!=null&&C.stock<=5&&C.active!==!1).sort((C,T)=>(C.stock??0)-(T.stock??0)).slice(0,10),D=new Map;u.forEach(C=>{(Array.isArray(C.items)?C.items:Array.isArray(C.itens)?C.itens:[]).forEach(A=>{const f=A.name||A.item||"Produto",m=A.qty||A.quantidade||1,y=A.price||A.preco||0,x=D.get(f)||{name:f,qty:0,revenue:0};D.set(f,{name:f,qty:x.qty+m,revenue:x.revenue+m*y})})});const v=Array.from(D.values()).sort((C,T)=>T.qty-C.qty).slice(0,5),k=new Map;u.forEach(C=>{const A=(C.criadoEm?.toDate?C.criadoEm.toDate():new Date(C.criadoEm||0)).getHours();k.set(A,(k.get(A)||0)+1)});const S=Array.from(k.entries()).sort((C,T)=>T[1]-C[1]).slice(0,3),$=e.orders_paid>0?h/e.orders_paid:0;i={lowStockProducts:M,topProducts:v,bestHours:S,avgTicket:$,totalOrders:u.length}}}}catch(s){console.error("Error fetching dashboard data:",s)}return setTimeout(()=>{n?.companyId&&a(n.companyId,n)},100),`
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
                ${i.lowStockProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Todos os produtos estão com estoque adequado.</p>':i.lowStockProducts.map(s=>`
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:0.85rem;font-weight:500;">${s.name}</span>
                            <span class="badge ${s.stock===0?"danger":"warning"}">${s.stock===0?"Esgotado":s.stock+" un."}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Top Selling Products -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> Top 5 Produtos
                </h4>
                ${i.topProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido com itens ainda.</p>':i.topProducts.map((s,o)=>`
                        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:1rem;font-weight:900;color:${o===0?"#f59e0b":o===1?"#94a3b8":o===2?"#b45309":"var(--text-dim)"};min-width:20px;">${o+1}</span>
                            <span style="flex:1;font-size:0.85rem;font-weight:500;">${s.name}</span>
                            <span style="font-size:0.8rem;color:var(--text-muted);">${s.qty} un.</span>
                            <span style="font-size:0.8rem;color:var(--success);">R$ ${s.revenue.toFixed(2)}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Best Sales Hours -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-chart-bar" style="color:var(--primary);"></i> Melhores Horários
                </h4>
                ${i.bestHours.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido registrado ainda.</p>':i.bestHours.map(([s,o],l)=>{const c=i.bestHours[0][1],u=Math.round(o/c*100);return`
                            <div style="margin-bottom:10px;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                                    <span style="font-size:0.85rem;font-weight:600;">${String(s).padStart(2,"0")}h – ${String(s+1).padStart(2,"0")}h</span>
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
    `;async function a(s,o){const l=document.getElementById("store-statuses-container");if(l)try{const u=await F.get("companies",s);let h=u?.stores||[];const b=await F.getAll("instancias",{field:"empresaId",operator:"==",value:s});if(o.role!=="owner"){const M=o.storeIds||(o.storeId?[o.storeId]:[]);h=h.filter(D=>M.includes(D.id))}if(h.length===0){l.innerHTML=`
                    <div class="card" style="margin-top: 1.5rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);">
                        <h3 style="color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Sistema Inoperante</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Nenhuma loja encontrada ou associada a este usuário. O sistema não pode operar.</p>
                    </div>
                `;return}let R="";for(const M of h){let D="",v=!1;const k=(M.instancia_id?b.find(T=>T.id===M.instancia_id):null)||b.find(T=>T.lojaId===M.id),S=k?.nome;if(!k||M.active===!1)D=`
                        <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-circle-xmark"></i> Loja Inoperante</p>
                                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${k?"Loja desativada":"Sem instância vinculada"}.</p>
                                </div>
                                <button class="btn-primary btn-sm" onclick="toggleStoreActive('${u.id}', '${M.id}', true)">
                                    <i class="fa-solid fa-play"></i> Ativar Loja
                                </button>
                            </div>
                        </div>
                    `;else try{const T=await vt.getInstanceStatus(S);if(["open","connected","CONNECTED","ON"].includes(T.state))v=!0,D=`
                                <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Instância Conectada</p>
                                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">A IA e o WhatsApp estão online (Instância: ${S}).</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${M.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                </div>
                            `;else{const m=await vt.getQRCode(S);D=`
                                <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</p>
                                            <p style="margin: 0.25rem 0 0.5rem 0; font-size: 0.85rem; color: var(--text-muted);">Instância: <strong>${S}</strong>. Escaneie o QR Code.</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${M.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                    ${m?.base64?`<img src="${m.base64}" alt="QR" style="width:150px;height:150px;display:block;margin:0 auto;border-radius:8px; background: white; padding: 5px;">`:'<p style="font-size:0.8rem;text-align:center; padding: 20px;">QR Code indisponível no momento. Tente atualizar a página.</p>'}
                                </div>
                            `}}catch(T){console.error("Error checking instance status in dashboard:",T),D=`
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--warning); margin-bottom: 1rem;">
                                <p style="margin: 0; font-weight: 600; color: var(--warning);"><i class="fa-solid fa-circle-exclamation"></i> Erro de Comunicação</p>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">Não foi possível verificar a instância: <strong>${S}</strong>. Verifique sua conexão.</p>
                            </div>
                        `}const $=M.frete_ativo!==!1,C=k&&M.active!==!1;R+=`
                    <div class="card" style="margin-top: 1.5rem; border: 1px solid ${v?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin-bottom: 0.25rem;"><i class="fa-solid fa-store"></i> ${M.name}</h3>
                                <div style="display:flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <span class="badge ${C?"success":"danger"}">${C?"Operante":"Inoperante"}</span>
                                    <span class="badge ${v?"success":"warning"}">${v?"WhatsApp Online":"WhatsApp Offline"}</span>
                                    <span class="badge ${$?"success":"warning"}">${$?"Frete Ativo":"Retirada Apenas"}</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${S?`
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/qr/${S}', 'Link de conexão copiado!')" title="Link para conectar WhatsApp" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; border-color: rgba(245, 158, 11, 0.3);">
                                    <i class="fa-solid fa-qrcode" style="font-size: 0.75rem; color: var(--warning);"></i> Link QR
                                </button>
                                `:""}
                                <a href="/catalog/${M.id}" target="_blank" class="btn-secondary btn-sm" style="text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-up-right-from-square" style="font-size: 0.75rem;"></i> Catálogo
                                </a>
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/catalog/${M.id}', 'Link do catálogo copiado!')" title="Copiar link do catálogo" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-copy" style="font-size: 0.75rem;"></i> Link
                                </button>
                            </div>
                        </div>
                        ${D}
                    </div>
                `}if(o.role==="owner"||o.role==="admin"){const M=h.map(S=>S.instancia_id).filter(S=>!!S),D=b.filter(S=>S.lojaId).map(S=>S.id),v=new Set([...M,...D]),k=b.filter(S=>!v.has(S.id));if(k.length>0){R+=`
                        <div class="card" style="margin-top: 2rem; border: 1px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.02);">
                            <h4 style="margin-bottom: 1rem; color: var(--text-muted);"><i class="fa-solid fa-link-slash"></i> Instâncias não vinculadas a lojas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                    `;for(const S of k){let $=!1;try{$=(await vt.getInstanceStatus(S.nome)).connected}catch{}R+=`
                            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>${S.nome}</strong>
                                    <span class="badge ${$?"success":"warning"}">${$?"Online":"Offline"}</span>
                                </div>
                                <p style="font-size:0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Vá em Configurações > Lojas para vincular esta instância a uma unidade.</p>
                            </div>
                        `}R+="</div></div>"}}l.innerHTML=R}catch(c){console.error("Error setting up Store statuses:",c),l.innerHTML=`
                <div class="card" style="margin-top: 1.5rem; background: var(--surface-hover);">
                    <p style="color: var(--danger);">Erro ao carregar os status integrados.</p>
                </div>
            `}}};class ix{show(e){return new Promise(t=>{const{title:i,message:a,confirmText:s="Confirmar",cancelText:o="Cancelar",type:l="warning"}=e,c=document.createElement("div");c.className="confirm-modal",c.innerHTML=`
                <div class="confirm-modal-content">
                    <div class="confirm-header ${l}">
                        <div class="confirm-icon">${l==="danger"?'<i class="fa fa-times"></i>':l==="warning"?'<i class="fa fa-exclamation-triangle"></i>':'<i class="fa fa-info-circle"></i>'}</div>
                        <h2>${i}</h2>
                    </div>
                    <div class="confirm-body">
                        <p>${a}</p>
                    </div>
                    <div class="confirm-actions">
                        <button class="btn-cancel" id="confirm-cancel">${o}</button>
                        <button class="btn-confirm ${l}" id="confirm-ok">${s}</button>
                    </div>
                </div>
            `,document.body.appendChild(c);const u=c.querySelector("#confirm-ok"),h=c.querySelector("#confirm-cancel"),_=b=>{c.remove(),t(b)};u?.addEventListener("click",()=>_(!0)),h?.addEventListener("click",()=>_(!1)),c.addEventListener("click",b=>{b.target===c&&_(!1)})})}async danger(e,t){return this.show({title:e,message:t,type:"danger",confirmText:"Sim, excluir"})}async warning(e,t){return this.show({title:e,message:t,type:"warning"})}}const Xe=new ix;function Gd(n,e){return n.replace(/\{\{(\w+)\}\}/g,(t,i)=>e[i]!==void 0?e[i]:t)}function ax(n,e){const a=(Array.isArray(n.itens)?n.itens:Array.isArray(n.items)?n.items:[]).map(s=>({item:s.item||s.name||"",quantidade:s.quantidade||s.qty||1,preco:s.preco||s.price||0})).map(s=>`${s.quantidade}x ${s.item}`).join(", ");return{nome_lead:e?.nome||e?.name||n.clientName||n.nome||"Cliente",telefone_lead:(e?.telefone||"").split("@")[0]||n.clientPhone||"",numero_pedido:n.id?.slice(-6).toUpperCase()||"",lista_produtos:a,valor_total:(n.value||n.total||0).toFixed(2),endereco_entrega:n.endereco||n.clientAddress||"Não informado",forma_pagamento:n.formaPagamento||n.paymentMethod||n.pagamento||"Não informado"}}const Ur={pedido_aceito_entrega_pago:"✅ Pedido aceito e em preparo! (Pagamento Adiantado)",pedido_aceito_entrega_pendente:"✅ Pedido aceito e em preparo! Pagamento na entrega.",pedido_aceito_retirada:"✅ Pedido confirmado para retirada! Já está sendo preparado.",pagamento_confirmado:"💳 Pagamento confirmado! Seu pedido já está sendo preparado.",pedido_pronto:"📦 Seu pedido já está pronto para retirada!",saiu_para_entrega:"🚚 Boa notícia! Seu pedido saiu para entrega.",pedido_entregue:"🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!",pedido_cancelado:"❌ Seu pedido foi cancelado."};function sx(n){switch(n){case"aguardando_pagamento":return"pedido_aceito_entrega_pago";case"em_preparo":return"pagamento_confirmado";case"pedido_pronto":return"pedido_pronto";case"saiu_para_entrega":return"saiu_para_entrega";case"finalizado":return"pedido_entregue";case"cancelado":return"pedido_cancelado";default:return null}}async function rx(n,e){try{if(e){const i=await F.getAll("loja_config",[{field:"empresaId",operator:"==",value:n},{field:"lojaId",operator:"==",value:e}]);if(i&&i.length>0){const a=i[0];if(a.mensagens_automaticas)return a.mensagens_automaticas}}const t=await F.getAll("empresa_config",{field:"empresaId",operator:"==",value:n});if(t&&t.length>0)return t[0].mensagens_automaticas||{}}catch(t){console.error("Error fetching message config:",t)}return{}}const ii={async updateOrderStatus(n,e,t,i,a){try{a&&Object.assign(n,a);let s=n.instancia||null;if(!s){const k=n.storeId||n.lojaId;if(k)try{let C=(await F.getAll("loja_config",[{field:"empresaId",operator:"==",value:e},{field:"lojaId",operator:"==",value:k}]))[0]?.instancia_id;const T=await F.get("companies",e);!C&&T?.stores&&(C=T.stores.find(f=>f.id===k)?.instancia_id),C&&(s=(await F.get("instancias",C))?.nome||null),!s&&T?.whatsappInstance?.instanceName&&(s=T.whatsappInstance.instanceName)}catch(S){console.error("Error fetching instance for store:",S)}}s||(s=(await F.get("companies",e))?.whatsappInstance?.instanceName||null);const o=n.leadId?await F.get("leads",n.leadId):null,l=o?.telefone||o?.whatsapp||(n.clientPhone?n.clientPhone.replace(/\D/g,""):null)||n.leadId||null,c=ax(n,o),u=await rx(e,n.lojaId||n.storeId);let h="",_=sx(t);const b=n.entrega==="retirada"||n.deliveryType==="retirada",R=n.formaPagamento||n.paymentMethod||n.pagamento||"",M=R.includes("entrega")||R.includes("dinheiro")||R.includes("maquininha")||R==="na_entrega";if((t==="aguardando_pagamento"||t==="em_preparo")&&(n.status==="em_montagem"||!n.status)&&(b?_="pedido_aceito_retirada":M?_="pedido_aceito_entrega_pendente":_="pedido_aceito_entrega_pago"),_)if(t==="cancelado"){const k=u[_]||Ur[_]||"",S=k?Gd(k,c):Ur[_];h=i?`${S} Motivo: ${i}`:S}else{const k=u[_]||Ur[_]||"";h=k?Gd(k,c):""}let D={status:t,updatedAt:ge.now()};i&&(D.rejectionReason=i),a&&(D={...D,...a}),await F.update("pedidos",n.id,D),t==="finalizado"&&n.leadId&&await F.update("leads",n.leadId,{statusAtendimento:"finalizado",updatedAt:ge.now()});let v=!1;return h&&s&&l&&(v=await vt.sendText(s,l,h),n.leadId&&await this.saveMessageLog(e,n.leadId,h)),v}catch(s){throw console.error("OrderService - Error updating status:",s),s}},async activateHumanSupport(n){await F.update("leads",n,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()})},async sendInterventionMessage(n,e,t,i,a){const s=await vt.sendText(t,i,a);return await F.create("messages",{conteudo:a,createdAt:ge.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"}),s},async saveMessageLog(n,e,t){try{await F.create("messages",{conteudo:t,createdAt:ge.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"})}catch(i){console.error("OrderService - Error logging message:",i)}},async getOrderDetails(n){return await F.get("pedidos",n)},async getOpenOrdersCount(n,e){try{return(await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n})).filter(i=>{if(e&&e.length>0&&(!i.lojaId||!e.includes(i.lojaId)))return!1;const a=(i.status||"em_montagem").toLowerCase();return a!=="finalizado"&&a!=="cancelado"}).length}catch{return 0}}},ox={em_montagem:{label:"Em Montagem",cls:"badge warning",icon:'<i class="fa-solid fa-cart-shopping"></i>'},aguardando_pagamento:{label:"Aguard. Pagamento",cls:"badge info",icon:'<i class="fa-solid fa-credit-card"></i>'},em_preparo:{label:"Em Preparo",cls:"badge primary",icon:'<i class="fa-solid fa-utensils"></i>'},pedido_pronto:{label:"Pronto p/ Retirada",cls:"badge success",icon:'<i class="fa-solid fa-box" style="color:#fff;"></i>'},saiu_para_entrega:{label:"Saiu p/ Entrega",cls:"badge success",icon:'<i class="fa-solid fa-truck" style="color:#fff;"></i>'},finalizado:{label:"Finalizado",cls:"badge success",icon:'<i class="fa-solid fa-check" style="color:#fff;"></i>'},cancelado:{label:"Cancelado",cls:"badge danger",icon:'<i class="fa-solid fa-xmark"></i>'}};function Kd(n){const e=(n||"em_montagem").toLowerCase(),t=ox[e]||{label:n||"Pendente",cls:"badge secondary",icon:'<i class="fa-solid fa-question"></i>'};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function Qd(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const Yd=[{key:"todos",label:"Todos"},{key:"em_montagem",label:'<i class="fa-solid fa-cart-shopping"></i> Em Montagem'},{key:"aguardando_pagamento",label:'<i class="fa-solid fa-credit-card"></i> Pag. Pendente'},{key:"em_preparo",label:'<i class="fa-solid fa-utensils"></i> Em Preparo'},{key:"pedido_pronto",label:'<i class="fa-solid fa-box"></i> Prontos'},{key:"saiu_para_entrega",label:'<i class="fa-solid fa-truck"></i> Em Entrega'},{key:"finalizado",label:'<i class="fa-solid fa-check"></i> Finalizados'}];function Jd(n){return n==="retirada"?'<span class="badge secondary" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-store" style="font-size: 0.6rem;"></i> Retirada</span>':'<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-truck" style="font-size: 0.6rem;"></i> Entrega</span>'}function Xd(n,e,t){if(!n)return'<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>';const i=n.toLowerCase().trim(),a=i.includes("link"),s=i.includes("pagamento_no_pix"),o=i.includes("entrega")||i.includes("dinheiro")||i.includes("maquininha");if(a)return`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;if(s){let l=`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;const c=e&&e!=="tete"?e:t&&t.startsWith("comprovantes/")?t:null;return c&&(l+=`
                <button class="view-comprovante-btn" data-path="${c}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`),`<div style="display: flex; align-items: center;">${l}</div>`}return o?`<span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
        </span>`:`<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${n}</span>`}const lx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await F.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId});e.sort((T,A)=>{const f=(T.criadoEm?.toDate?.()||new Date(T.criadoEm||0)).getTime();return(A.criadoEm?.toDate?.()||new Date(A.criadoEm||0)).getTime()-f});let i=(await F.get("companies",n.companyId))?.stores||[];if(n.role!=="owner"){const T=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(A=>T.includes(A.id)),e=e.filter(A=>T.includes(A.lojaId))}const a=await F.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId}),s=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:n.companyId}),o=T=>{const A=i.find(f=>f.id===T);return A?A.name:T||"-"},l=T=>{const A=i.find(m=>m.id===T);if(A&&A.active!==!1&&A.instancia_id)return!0;const f=s.find(m=>m.lojaId===T);return f?!!f.instancia_id:!1},c=(T,A)=>{if(A)return A;const f=a.find(m=>m.id===T);return f?f.nome||f.name||"Cliente":T||"Cliente"},u=T=>(a.find(f=>f.id===T)?.telefone||"").split("@")[0];let h="todos";const _=T=>T==="todos"?e:e.filter(A=>(A.status||"em_montagem").toLowerCase()===T),b=T=>T.length===0?'<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>':T.map(A=>{const f=(A.status||"em_montagem").toLowerCase();return`
            <tr data-order-id="${A.id}">
                <td><span style="font-family:monospace;font-weight:600;color:var(--primary);">#${A.id.slice(-6).toUpperCase()}</span></td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${o(A.lojaId)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <div class="lead-avatar" style="width:28px;height:28px;font-size:0.7rem;flex-shrink:0;">${(c(A.leadId,A.nome||A.leadName)[0]||"C").toUpperCase()}</div>
                        <div>
                            <div style="font-weight:500;">${c(A.leadId,A.nome||A.leadName)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">${u(A.leadId)}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight:600;">R$ ${(A.value||A.total||0).toFixed(2)}</td>
                <td>${Kd(f)}  ${Jd(A.entrega||"entrega")}  ${Xd(A.pagamento||A.formaPagamento,A.comprovanteUrl,A.empresaId)}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;">${Qd(A.criadoEm||A.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${A.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),R=T=>{const A=T==="todos"?e.length:e.filter(f=>(f.status||"em_montagem").toLowerCase()===T).length;return`<span class="filter-count" id="count-${T}">${A}</span>`};return setTimeout(()=>M(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar" id="orders-filter-bar">
                ${Yd.map(T=>`
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
                        ${b(e)}
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
    `;function M(){const T=fi(zt,"pedidos"),A=Mn(T,On("empresaId","==",n.companyId));window._ordersUnsubscribe&&window._ordersUnsubscribe();const f=$a(A,x=>{if(e=x.docs.map(g=>({id:g.id,...g.data()})),n.role!=="owner"){const g=n.storeIds||(n.storeId?[n.storeId]:[]);e=e.filter(w=>g.includes(w.lojaId))}e.sort((g,w)=>{const L=(g.criadoEm?.toDate?.()||new Date(g.criadoEm||0)).getTime();return(w.criadoEm?.toDate?.()||new Date(w.criadoEm||0)).getTime()-L});const E=document.getElementById("orders-tbody");E&&(E.innerHTML=b(_(h)),D()),Yd.forEach(g=>{const w=document.getElementById(`count-${g.key}`);if(w){const L=g.key==="todos"?e.length:e.filter(P=>(P.status||"em_montagem").toLowerCase()===g.key).length;w.textContent=L.toString()}})});window._ordersUnsubscribe=f,document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(x=>{x.addEventListener("click",()=>{document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(g=>g.classList.remove("active")),x.classList.add("active"),h=x.dataset.filter||"todos";const E=document.getElementById("orders-tbody");E&&(E.innerHTML=b(_(h))),D()})}),D();const m=document.getElementById("order-detail-modal");m?.addEventListener("click",x=>{x.target===m&&m.classList.add("hidden")}),document.getElementById("orders-filter-bar")?.parentElement?.parentElement?.addEventListener("click",async x=>{const E=x.target.closest(".view-comprovante-btn");if(E){x.preventDefault(),x.stopPropagation();const g=E.dataset.path;if(!g)return;const w=E.innerHTML;E.disabled=!0,E.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{let L=g;if(!g.startsWith("http")){const P=un(pn,g);L=await oi(P)}window.open(L,"_blank")}catch(L){console.error("Erro ao abrir comprovante:",L),V.error("Não foi possível carregar o comprovante do storage.")}finally{E.disabled=!1,E.innerHTML=w}}})}function D(){document.querySelectorAll(".action-btn.view").forEach(T=>{T.addEventListener("click",()=>{const A=T.dataset.id,f=e.find(m=>m.id===A);f&&v(f)})})}async function v(T){const A=document.getElementById("order-detail-modal"),f=document.getElementById("order-modal-inner");if(!A||!f)return;!T.itens&&Array.isArray(T.items)&&(T.itens=T.items.map(Z=>({item:Z.item||Z.name||"",quantidade:Z.quantidade||Z.qty||1,preco:Z.preco||Z.price||0,observacao:Z.observacao||""}))),A.classList.remove("hidden"),f.innerHTML=`
            <div style="padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Carregando detalhes do pedido...</p>
            </div>
        `;const m=T.clientPhone?T.clientPhone.replace(/\D/g,""):u(T.leadId)||T.leadId,y=T.source==="catalog"||!!T.taxaNome,x=T.empresaId||Ae.getCurrentUser()?.companyId;if(x&&Array.isArray(T.itens))try{const Z=await F.getAll("products",{field:"companyId",operator:"==",value:x});let se=!1;if(T.itens.forEach(ce=>{const le=(ce.item||"").toLowerCase().trim(),pe=Z.find(ye=>(ye.name||"").toLowerCase().trim()===le);if(pe){const ye=pe.promotionalActive&&pe.promotionalPrice||pe.price;(!ce.preco||ce.preco===0)&&(ce.preco=ye,se=!0)}}),se){let ce=0;T.itens.forEach(ye=>{const Ve=parseFloat(ye.preco)||0,Me=parseInt(ye.quantidade)||1;ce+=Me*Ve});const le=parseFloat(T.valoresAdicionais)||0,pe=parseFloat(T.taxaAplicada||T.taxaEntrega)||0;T.value=ce+le+pe}}catch(Z){console.error("Error syncing prices with catalog:",Z)}const E=(T.status||"em_montagem").toLowerCase(),g=E==="finalizado"||E==="cancelado",w=c(T.leadId,T.nome||T.leadName),L=l(T.lojaId),P=Array.isArray(T.itens)?T.itens.map((Z,se)=>`
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${Z.quantidade}x ${Z.item}</span>
                        ${Z.observacao?`<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${Z.observacao}</small>`:""}
                    </div>
                    ${E==="em_montagem"&&!y?`
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${se}" value="${Z.preco||0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    `:`
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(Z.preco||0).toFixed(2)}</span>
                    `}
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1.5rem; text-align: center;">Sem itens listados.</p>',K=E==="em_montagem"||T.taxaAplicada||T.taxaEntrega?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; ${E==="em_montagem"?"background: rgba(99, 102, 241, 0.03);":""}">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Taxa de Entrega</span>
                    ${E==="em_montagem"?'<small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Frete / Entrega</small>':""}
                </div>
                ${E==="em_montagem"&&!y?`
                    <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                        <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                        <input type="number" id="detail-taxa-entrega" value="${T.taxaAplicada||T.taxaEntrega||0}"
                            step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                    </div>
                `:`
                    <span style="color:var(--primary);font-weight:700;">R$ ${(T.taxaAplicada||T.taxaEntrega||0).toFixed(2)}</span>
                `}
            </div>
        `:"",j=E==="em_montagem"&&!y?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; background: rgba(99, 102, 241, 0.03);">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Outros Adicionais</span>
                    <small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Descontos (use valor negativo), acréscimos, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                    <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                    <input type="number" id="detail-additional-value" value="${T.valoresAdicionais||0}"
                        step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                </div>
            </div>
        `:T.valoresAdicionais&&!y?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1rem 1.25rem;">
                <span class="lead-info-label" style="font-size:0.85rem;">Valores adicionais</span>
                <span style="color:var(--primary);font-weight:700;">R$ ${(T.valoresAdicionais||0).toFixed(2)}</span>
            </div>
        `:"",Q=k(T,E),J=g?"":y?`
                <a href="https://wa.me/${m.replace(/\D/g,"")}" target="_blank" class="btn-lead-action" 
                    style="background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.4); color: #25d366; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> WhatsApp
                </a>`:`
                <button id="btn-intervir" class="btn-lead-action" style="background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #a78bfa;"
                    title="Enviar mensagem diretamente ao cliente sem alterar o status">
                    <i class="fa-solid fa-comment-dots"></i> Intervir
                </button>`;f.innerHTML=`
            <!-- Header -->
            <div class="lead-modal-header">
                <div class="lead-modal-avatar" style="background: linear-gradient(135deg, var(--primary), #7c3aed);">
                    ${w[0]?.toUpperCase()||"P"}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${T.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${w} · ${m}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${g?"":`
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
                    ${Kd(E)}
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Loja</span>
                    <span class="badge secondary">${o(T.lojaId)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Data</span>
                    <span class="badge secondary" style="font-size:0.78rem;">${Qd(T.criadoEm||T.createdAt)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">${T.source==="catalog"?"Modo de Envio":"Tipo"}</span>
                    ${Jd(T.entrega||"entrega")}
                </div>
            </div>

            ${L?"":`
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
                        <span class="lead-info-value">${w}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${m||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Pagamento</span>
                        <span class="lead-info-value">${Xd(T.pagamento||T.formaPagamento,T.comprovanteUrl,T.empresaId)}</span>
                    </div>
                    ${y?T.entrega==="retirada"?`
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
                        ${K}
                        ${j}
                        <div class="order-total-row">
                            <span>Total</span>
                            ${E==="em_montagem"?`
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

                <!-- Intervention area (hidden by default) - Only for non-catalog orders -->
                ${T.source!=="catalog"?`
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
                `:""}

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
            ${g?"":`
            <div class="lead-modal-footer" id="modal-footer">
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    ${J}
                    ${Q}
                </div>
            </div>`}
        `,S(A,T,E)}function k(T,A){const f=T.entrega==="retirada",m=(T.pagamento||T.formaPagamento||"").toLowerCase(),y=m.includes("entrega")||m.includes("dinheiro")||m.includes("maquininha");switch(A){case"em_montagem":return`
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
                    </button>`;default:return""}}function S(T,A,f){const m=f==="finalizado"||f==="cancelado",y=A.source==="catalog"||!!A.taxaNome;if(document.getElementById("close-order-modal")?.addEventListener("click",()=>{T.classList.add("hidden")}),f==="em_montagem"&&!y){const j=J=>{const Z=parseFloat(J);return isNaN(Z)?0:Z},Q=()=>{let J=0;document.querySelectorAll(".item-price-input").forEach(le=>{const pe=parseInt(le.dataset.index),ye=A.itens[pe]?.quantidade||1;J+=ye*j(le.value)});const Z=j(document.getElementById("detail-additional-value")?.value),se=j(document.getElementById("detail-taxa-entrega")?.value);J+=Z+se;const ce=document.getElementById("detail-order-total");ce&&(ce.innerText=`R$ ${J.toFixed(2)}`)};document.querySelectorAll(".item-price-input").forEach(J=>{J.addEventListener("input",Q)}),document.getElementById("detail-additional-value")?.addEventListener("input",Q),document.getElementById("detail-taxa-entrega")?.addEventListener("input",Q),Q()}if(m)return;const x=document.getElementById("order-menu-trigger"),E=document.getElementById("order-dropdown");x?.addEventListener("click",j=>{j.stopPropagation(),E?.classList.toggle("hidden")}),document.addEventListener("click",()=>E?.classList.add("hidden"),{once:!0}),E?.querySelectorAll(".lead-dropdown-item").forEach(j=>{j.addEventListener("click",async()=>{E.classList.add("hidden"),j.dataset.menuAction==="atendimento_humano"&&await $(A)})});const g=document.getElementById("btn-intervir"),w=document.getElementById("intervir-area");g?.addEventListener("click",()=>{if(w){const j=w.style.display==="none";w.style.display=j?"block":"none",j&&document.getElementById("intervir-text")?.focus()}}),document.getElementById("btn-intervir-cancel")?.addEventListener("click",()=>{w&&(w.style.display="none");const j=document.getElementById("intervir-text");j&&(j.value="")}),document.getElementById("btn-intervir-send")?.addEventListener("click",async()=>{const j=document.getElementById("intervir-text"),Q=j?.value.trim();if(!Q){V.warning("Digite uma mensagem antes de enviar.");return}const J=document.getElementById("btn-intervir-send");J.disabled=!0,J.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';try{let Z=A.instancia;Z||(Z=(await F.get("companies",n.companyId))?.whatsappInstance?.instanceName||"");const se=u(A.leadId)||A.leadId;await ii.sendInterventionMessage(n.companyId,A.leadId,Z,se,Q),V.success("Mensagem enviada com sucesso!"),j.value="",w&&(w.style.display="none")}catch{V.error("Erro ao enviar mensagem."),J.disabled=!1,J.innerHTML='<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem'}});const L=document.getElementById("btn-main-action");L?.addEventListener("click",async()=>{const j=L.dataset.target;if(!j)return;let Q="",J="";switch(j){case"aguardando_pagamento":Q="Aceitar Pedido",J=`Deseja aceitar o pedido #${A.id.slice(-6).toUpperCase()}?`;break;case"em_preparo":Q="Confirmar Pagamento",J="Confirmar que o pagamento foi recebido?";break;case"pedido_pronto":Q="Pedido Pronto",J="Marcar pedido como pronto para retirada?";break;case"saiu_para_entrega":Q="Saiu para Entrega",J="Marcar pedido como saiu para entrega?";break;case"finalizado":Q="Pedido Entregue",J="Marcar pedido como entregue e finalizado?";break}if(await Xe.warning(Q,J)){L.disabled=!0,L.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...';try{let se;if(f==="em_montagem"){const ce=Me=>{const ke=parseFloat(Me);return isNaN(ke)?0:ke};let le=0;const pe=Array.isArray(A.itens)?[...A.itens]:[];document.querySelectorAll(".item-price-input").forEach(Me=>{const ke=parseInt(Me.dataset.index),Ue=pe[ke]?.quantidade||1,_t=ce(Me.value);pe[ke]&&(pe[ke].preco=_t),le+=Ue*_t});const ye=ce(document.getElementById("detail-additional-value")?.value),Ve=ce(document.getElementById("detail-taxa-entrega")?.value);le+=ye+Ve,se={value:le,total:le,itens:pe,valoresAdicionais:ye,taxaEntrega:Ve,taxaAplicada:Ve}}j==="em_preparo"&&(se={...se,manuallyConfirmed:!0}),await ii.updateOrderStatus(A,n.companyId,j,void 0,se),A.status=j,C(A),V.success("Pedido atualizado com sucesso!"),v(A)}catch{V.error("Erro ao atualizar pedido."),L.disabled=!1}}});const P=document.getElementById("btn-cancel"),K=document.getElementById("cancel-container");P?.addEventListener("click",async()=>{if(P.dataset.stage==="confirm"){const j=document.getElementById("cancel-reason")?.value.trim();if(!j){V.warning("Informe o motivo do cancelamento.");return}if(!await Xe.danger("Cancelar Pedido","Tem certeza que deseja cancelar este pedido?"))return;P.disabled=!0,P.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';try{await ii.updateOrderStatus(A,n.companyId,"cancelado",j),A.status="cancelado",C(A),V.success("Pedido cancelado."),v(A)}catch{V.error("Erro ao cancelar pedido."),P.disabled=!1}}else P.dataset.stage="confirm",P.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento',K&&(K.style.display="block",document.getElementById("cancel-reason")?.focus())})}async function $(T){if(await Xe.warning("Ativar Atendimento Humano","Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado."))try{await ii.activateHumanSupport(T.leadId),V.success("Atendimento humano ativado para o lead!")}catch{V.error("Erro ao ativar atendimento humano.")}}function C(T){const A=e.findIndex(m=>m.id===T.id);A>=0&&(e[A]={...e[A],...T});const f=document.getElementById("orders-tbody");f&&(f.innerHTML=b(_(h))),D()}},ds=n=>n.imageUrl?n.imageUrl:n.imagemPath&&n.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(n.imagemPath)}?alt=media&token=${n.downloadToken}`:null,cx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const t=await F.get("companies",n.companyId),i=t?.modulos_ativos||[],a=i.includes("venda")||i.includes("agendamento")||i.includes("venda_catalogo"),s=i.includes("agendamento"),o=s?"Serviço":"Produto",l=s?"Serviços":"Produtos";let c=t?.stores||[];const u=n.role?.toLowerCase()==="owner",h=n.storeIds||(n.storeId?[n.storeId]:[]);u||(c=c.filter(L=>h.includes(L.id)));let _=u?"all":h.length===1?h[0]:"employee_all",b=new Map,R=null;if(!a)return`
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;let M=await F.getAll("products",{field:"companyId",operator:"==",value:n.companyId}),D=await F.getAll("categories",{field:"companyId",operator:"==",value:n.companyId});const v=L=>{const P=L.storeIds||(L.storeId?[L.storeId]:[]);return P.length===0?"Sem Loja":P.map(K=>{const j=c.find(Q=>Q.id===K);return j?j.name:"Desconhecida"}).join(", ")},k=()=>{let L=M;return _!=="all"&&_!=="employee_all"?L=M.filter(P=>P.storeIds&&P.storeIds.includes(_)||P.storeId===_):_==="employee_all"&&(L=M.filter(P=>P.storeIds&&P.storeIds.some(K=>h.includes(K))||P.storeId&&h.includes(P.storeId))),L.length===0?`<tr><td colspan="7" style="text-align:center">Nenhum ${o.toLowerCase()} encontrado.</td></tr>`:L.map(P=>`
            <tr data-product-id="${P.id}">
                <td><input type="checkbox" class="product-checkbox" data-id="${P.id}" onchange="window.updateBulkBar()"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${ds(P)?`<img src="${ds(P)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">`:'<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <span style="font-weight: 600;">${P.name}</span>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${v(P)}">${v(P)}</div></td>
                <td>R$ ${P.price?.toFixed(2)}</td>
                <td>
                    ${s?P.duration?`<span class="badge info">${P.duration} min</span>`:'<span class="badge" style="background:rgba(100,116,139,0.15);color:#94a3b8;">—</span>':P.stock===null||P.stock===void 0?'<span class="badge info" title="Sem controle">&#8734; Ilimitado</span>':P.stock>10?`<span class="badge success">${P.stock} un.</span>`:P.stock>0?`<span class="badge" style="background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);">${P.stock} un.</span>`:'<span class="badge danger">Esgotado</span>'}
                </td>
                <td><span class="badge ${P.active?"success":"danger"}">${P.active?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editProduct('${P.id}')" title="Editar"><i style="color: #FFF;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleProductStatus('${P.id}', ${P.active})" title="${P.active?"Desativar":"Ativar"}">${P.active?'<i style="color: #FFF;" class="fa-solid fa-ban"></i>':'<i style="color: #FFF;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteProduct('${P.id}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join("")},S=()=>{const L=document.querySelector(".data-table tbody");L&&(L.innerHTML=k(),$())},$=()=>{const L=document.querySelectorAll(".product-checkbox:checked"),P=document.getElementById("bulk-actions-container"),K=document.getElementById("bulk-count");P&&K&&(L.length>0?(P.classList.remove("hidden"),K.innerText=`${L.length} item(ns) selecionado(s)`):P.classList.add("hidden"))},C=()=>{const L='<option value="">Sem Categoria</option>'+D.map(P=>`<option value="${P.id}">${P.name}</option>`).join("");document.querySelectorAll(".item-category, #bulk-assign-cat").forEach(P=>{const K=P.value;P.innerHTML=L,P.value=K})},T=()=>{const L=document.getElementById("categories-list");if(L){if(D.length===0){L.innerHTML='<p style="text-align:center; color:var(--text-dim);">Nenhuma categoria criada.</p>';return}L.innerHTML=D.map(P=>`
            <div class="category-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fa-solid ${P.icon}" style="color:var(--primary); width:20px; text-align:center;"></i>
                    <span id="cat-name-text-${P.id}">${P.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="action-btn" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-color);" onclick="window.openEditCategoryModal('${P.id}', '${P.name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444;" onclick="window.deleteCategory('${P.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join("")}},A=L=>{const P=document.getElementById("catalog-link-container"),K=document.getElementById("catalog-url-display"),j=document.getElementById("btn-open-catalog");if(!(!P||!K||!j))if(L==="all"||L==="employee_all")P.classList.add("hidden");else{const Q=`${window.location.origin}/catalog/${L}`;K.value=Q,j.href=Q,P.classList.remove("hidden")}},f=async(L,P)=>{const K=`img_${Date.now()}_${Math.random().toString(36).substr(2,5)}`,j=un(pn,`products/${P}/${K}_${L.name}`);await Ni(j,L);const Q=await oi(j),J=new URL(Q);return{imagemPath:j.fullPath,downloadToken:J.searchParams.get("token")||""}},m=(L,P="",K="",j=null,Q=!1,J="",Z="",se="",ce=null,le=null)=>{const pe=D.map(ye=>`<option value="${ye.id}" ${ye.id===se?"selected":""}>${ye.name}</option>`).join("");return`
            <div class="product-item-card" id="card-${L}">
                 <div class="item-visual">
                    <div class="image-preview-wrapper" id="preview-wrapper-${L}">
                        ${j?`<img src="${j}" class="preview-img">`:'<div class="preview-placeholder"><i class="fa-solid fa-image"></i></div>'}
                        <div class="upload-progress-overlay hidden" id="progress-${L}">
                            <div class="spinner-small"></div>
                        </div>
                    </div>
                    ${!j||L!=="edit-item"?`
                    <button type="button" class="btn-change-img" data-id="${L}">
                        <i class="fa-solid fa-camera"></i>
                    </button>
                    `:""}
                    <input type="file" id="file-${L}" accept="image/*" style="display: none;">
                 </div>
                 
                 <div class="item-details">
                    <div class="input-row">
                        <div class="field">
                            <label>Nome do ${o}</label>
                            <input type="text" name="name-${L}" value="${P}" class="item-name" placeholder="${s?"Ex: Corte de Cabelo":"Ex: Tênis Esportivo Nitro"}" required>
                        </div>
                        <div class="field price-field">
                            <label>Preço (R$)</label>
                            <input type="number" name="price-${L}" value="${K}" class="item-price" placeholder="0,00" step="0.01" required>
                        </div>
                    </div>

                    <div class="input-row" style="margin-top: 12px;">
                        <div class="field">
                            <label>Categoria</label>
                            <select name="category-${L}" class="item-category" style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;">
                                <option value="">Sem Categoria</option>
                                ${pe}
                            </select>
                        </div>
                        <div class="field price-field">
                            ${s?`<label>Duração <span style="color:var(--text-dim);font-weight:400;">(minutos)</span></label>
                                   <input type="number" name="duration-${L}" value="${le??""}" class="item-duration" placeholder="Ex: 30" min="5" step="5">`:`<label>Estoque <span style="color:var(--text-dim);font-weight:400;">(vazio = ilimitado)</span></label>
                                   <input type="number" name="stock-${L}" value="${ce??""}" class="item-stock" placeholder="Ilimitado" min="0" step="1">`}
                        </div>
                    </div>
                    
                    ${s?"":`
                    <div class="promotional-section" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                        <label class="promotional-toggle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
                            <input type="checkbox" name="promotional-active-${L}" class="promotional-checkbox" ${Q?"checked":""} style="width: 16px; height: 16px;">
                            <i class="fa-solid fa-tag"></i> Ativar Promoção
                        </label>
                        
                        <div class="promotional-fields ${Q?"":"hidden"}" id="promotional-fields-${L}" style="margin-top: 10px; border-radius: 8px; background: rgba(99, 102, 241, 0.05); padding: 12px; border: 1px solid rgba(99, 102, 241, 0.2);">
                            <div class="input-row">
                                <div class="field">
                                    <label>Título da Promoção</label>
                                    <input type="text" name="promotional-name-${L}" value="${J}" placeholder="Ex: Oferta Relâmpago!" class="promotional-name-input">
                                </div>
                                <div class="field price-field">
                                    <label>Preço Promo (R$)</label>
                                    <input type="number" name="promotional-price-${L}" value="${Z}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>`}
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${L}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `},y=L=>{const P=document.querySelector(`#card-${L} .btn-change-img`),K=document.getElementById(`file-${L}`);P&&K&&(P.addEventListener("click",()=>K.click()),K.addEventListener("change",()=>{if(K.files&&K.files[0]){const J=K.files[0];b.set(L,J);const Z=new FileReader;Z.onload=se=>{const ce=document.getElementById(`preview-wrapper-${L}`);ce&&(ce.innerHTML=`<img src="${se.target?.result}" class="preview-img">
                                                 <div class="upload-progress-overlay hidden" id="progress-${L}"><div class="spinner-small"></div></div>`)},Z.readAsDataURL(J)}}));const j=document.querySelector(`input[name="promotional-active-${L}"]`),Q=document.getElementById(`promotional-fields-${L}`);j&&Q&&j.addEventListener("change",()=>{j.checked?Q.classList.remove("hidden"):Q.classList.add("hidden")})},x=L=>{const P=document.getElementById("products-list-container"),K=document.getElementById("empty-list-msg");!P||!K||Array.from(L).forEach(j=>{const Q=`prod_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;b.set(Q,j);const J=j.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "),Z=m(Q,J,"");P.insertAdjacentHTML("beforeend",Z),K.style.display="none",y(Q);const se=new FileReader;se.onload=ce=>{const le=document.getElementById(`preview-wrapper-${Q}`);le&&(le.innerHTML=`<img src="${ce.target?.result}" class="preview-img">
                                          <div class="upload-progress-overlay hidden" id="progress-${Q}"><div class="spinner-small"></div></div>`)},se.readAsDataURL(j)})};window.editProduct=async L=>{const P=M.find(K=>K.id===L);if(P){R=L,b.clear(),document.getElementById("modal-title").innerText=`Editar ${o}`,document.getElementById("bulk-upload-section").style.display="none",u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>{J.checked=(P.storeIds||[]).includes(J.value)});const K=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");if(K&&j){K.innerHTML="",j.style.display="none";const Q=ds(P);K.innerHTML=m("edit-item",P.name,P.price,Q,P.promotionalActive,P.promotionalName,P.promotionalPrice,P.categoryId,P.stock,P.duration),setTimeout(()=>y("edit-item"),0)}document.getElementById("product-modal").classList.remove("hidden")}},window.toggleProductStatus=async(L,P)=>{try{await F.update("products",L,{active:!P});const K=M.find(j=>j.id===L);K&&(K.active=!P),S(),V.success(`${o} ${P?"desativado":"ativado"} com sucesso!`)}catch(K){V.error("Erro ao atualizar status: "+K)}},window.deleteProduct=async L=>{if(await Xe.danger(`Excluir ${o}`,`Tem certeza que deseja EXCLUIR este ${o.toLowerCase()}? Esta ação não pode ser desfeita.`))try{const K=M.find(j=>j.id===L);if(K){const j=ds(K),Q=K.imagemPath;if(j||Q)try{const J=Q?un(pn,Q):un(pn,j);await H_(J)}catch(J){console.warn("Could not delete image from storage:",J)}}await F.delete("products",L),M=M.filter(j=>j.id!==L),S(),V.success(`${o} excluído com sucesso!`)}catch(K){V.error("Erro ao excluir: "+K)}},window.openProductModal=()=>{R=null,b.clear();const L=document.getElementById("modal-title"),P=document.getElementById("bulk-upload-section"),K=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");L&&(L.innerText=`Adicionar ${l}`),P&&(P.style.display="block"),K&&(K.innerHTML=""),j&&(j.style.display="block"),u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>J.checked=!1),document.getElementById("product-modal")?.classList.remove("hidden")},window.closeModals=()=>{document.getElementById("product-modal")?.classList.add("hidden"),document.getElementById("category-modal")?.classList.add("hidden"),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),document.getElementById("migration-modal")?.classList.add("hidden")},window.handleBulkFileSelection=L=>{L.files&&(x(L.files),L.value="")},window.addManualItem=()=>{const L=`manual_${Date.now()}`,P=document.getElementById("products-list-container"),K=document.getElementById("empty-list-msg");if(P&&K){const j=m(L);P.insertAdjacentHTML("beforeend",j),K.style.display="none",y(L)}},window.removeProductItem=L=>{const P=document.getElementById(`card-${L}`);P&&P.remove(),b.delete(L);const K=document.getElementById("products-list-container");if(K&&K.children.length===0){const j=document.getElementById("empty-list-msg");j&&(j.style.display="block")}},window.saveProducts=async()=>{const L=document.getElementById("btn-save-products-trigger");if(!L)return;L.disabled=!0;const P=L.innerHTML;L.innerHTML='<div class="spinner-small"></div> <span>Salvando...</span>';const j=document.getElementById("products-list-container")?.querySelectorAll(".product-item-card");if(!j||j.length===0){V.warning(`Adicione pelo menos um ${o.toLowerCase()}.`),L.disabled=!1,L.innerHTML=P;return}let Q=[];if(u){const J=document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');Q=Array.from(J).map(Z=>Z.value)}else n.storeId?Q=[n.storeId]:n.storeIds&&n.storeIds.length>0&&(Q=n.storeIds);if(Q.length===0){V.warning("Selecione pelo menos uma loja para este(s) produto(s)."),L.disabled=!1,L.innerHTML=P;return}try{for(const J of Array.from(j)){const Z=J.id.replace("card-",""),se=J.querySelector(".item-name").value,ce=parseFloat(J.querySelector(".item-price").value),le=J.querySelector(".item-category").value;let pe=!1,ye="",Ve=0,Me=null,ke=null;if(s){const De=J.querySelector(".item-duration")?.value;ke=De!==""&&De!=null?parseInt(De):null}else{pe=J.querySelector(".promotional-checkbox")?.checked||!1,ye=J.querySelector(".promotional-name-input")?.value||"",Ve=parseFloat(J.querySelector(".promotional-price-input")?.value)||0;const De=J.querySelector(".item-stock")?.value;Me=De!==""&&De!=null?parseInt(De):null}const Ue=document.getElementById(`progress-${Z}`);Ue&&Ue.classList.remove("hidden");let _t={};b.has(Z)&&(_t=await f(b.get(Z),n.companyId));const dt={name:se,price:ce||0,categoryId:le,storeIds:Q,companyId:n.companyId,active:!0,promotionalActive:pe,promotionalName:ye,promotionalPrice:Ve,stock:Me,duration:ke,..._t};if(R&&Z==="edit-item"){await F.update("products",R,dt);const De=M.findIndex(Ee=>Ee.id===R);De!==-1&&(M[De]={...M[De],...dt})}else{const De=await F.create("products",dt);M.push({id:De,...dt})}Ue&&Ue.classList.add("hidden")}V.success(`${l} salvo(s) com sucesso!`),window.closeModals(),S(),L.disabled=!1,L.innerHTML=P}catch(J){console.error("Error saving products:",J),V.error(`Erro ao salvar ${l.toLowerCase()}.`),L.disabled=!1,L.innerHTML=P}},window.saveCategory=async L=>{L.preventDefault();const P=document.getElementById("cat-name"),K=document.getElementById("cat-icon"),j=P.value.trim(),Q=K.value;if(j)try{const J=await F.create("categories",{name:j,icon:Q,companyId:n.companyId});D.push({id:J,name:j,icon:Q,companyId:n.companyId}),P.value="",T(),C(),V.success("Categoria criada com sucesso!")}catch{V.error("Erro ao criar categoria.")}},window.deleteCategory=async L=>{if(await Xe.warning("Excluir Categoria",'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".'))try{await F.delete("categories",L),D=D.filter(P=>P.id!==L),T(),C(),M.forEach(P=>{P.categoryId===L&&(P.categoryId="")}),V.success("Categoria excluída.")}catch{V.error("Erro ao excluir categoria.")}},window.openEditCategoryModal=(L,P)=>{const K=document.getElementById("edit-cat-name-input");K&&(K.value=P,K.dataset.catId=L,document.getElementById("edit-cat-name-modal")?.classList.remove("hidden"))},window.updateCategoryName=async()=>{const L=document.getElementById("edit-cat-name-input"),P=L.dataset.catId,K=L.value.trim();if(P&&K)try{await F.update("categories",P,{name:K});const j=D.find(Q=>Q.id===P);j&&(j.name=K),T(),C(),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),V.success("Nome atualizado!")}catch{V.error("Erro ao atualizar nome.")}},window.openCategoryModal=()=>{T();const L=document.getElementById("icon-picker");L&&(L.innerHTML=E.map(P=>`
                <div class="icon-option ${P==="fa-tag"?"selected":""}" data-icon="${P}" onclick="window.selectCategoryIcon(this, '${P}')">
                    <i class="fa-solid ${P}"></i>
                </div>
            `).join("")),document.getElementById("category-modal")?.classList.remove("hidden")},window.selectCategoryIcon=(L,P)=>{const K=document.getElementById("icon-picker");K&&(K.querySelectorAll(".icon-option").forEach(j=>j.classList.remove("selected")),L.classList.add("selected"),document.getElementById("cat-icon").value=P)},window.setStoreFilter=(L,P)=>{document.querySelectorAll(".filter-pill").forEach(K=>K.classList.remove("active")),P.classList.add("active"),_=L,A(L),S()},window.toggleAllCheckboxes=L=>{const P=L.checked;document.querySelectorAll(".product-checkbox").forEach(K=>K.checked=P),$()},window.updateBulkBar=$,window.applyBulkCategory=async()=>{const L=document.getElementById("bulk-assign-cat").value;if(!L){V.warning("Selecione uma categoria.");return}const P=Array.from(document.querySelectorAll(".product-checkbox:checked")).map(j=>j.dataset.id),K=document.getElementById("btn-bulk-save");K&&(K.innerHTML='<div class="spinner-small"></div>');try{await Promise.all(P.map(j=>F.update("products",j,{categoryId:L}))),M.forEach(j=>{P.includes(j.id)&&(j.categoryId=L)}),V.success(`${P.length} produtos atualizados!`),window.cancelBulkActions(),S()}catch{V.error("Erro ao processar em massa.")}finally{K&&(K.innerText="Aplicar")}},window.cancelBulkActions=()=>{document.querySelectorAll(".product-checkbox").forEach(P=>P.checked=!1);const L=document.getElementById("select-all-products");L&&(L.checked=!1),$()};const E=["fa-utensils","fa-burger","fa-pizza-slice","fa-ice-cream","fa-coffee","fa-beer","fa-wine-glass","fa-apple-whole","fa-carrot","fa-bowl-food","fa-cake-candles","fa-candy-cane","fa-cookie","fa-glass-water","fa-mug-hot","fa-bag-shopping","fa-shirt","fa-shoe-prints","fa-glasses","fa-watch","fa-laptop","fa-mobile-screen","fa-gamepad","fa-headphones","fa-camera","fa-tv","fa-microchip","fa-car","fa-bicycle","fa-plane","fa-bus","fa-train","fa-ship","fa-anchor","fa-heart","fa-star","fa-bolt","fa-fire","fa-leaf","fa-tree","fa-sun","fa-moon","fa-droplet","fa-cloud","fa-music","fa-film","fa-book","fa-pencil","fa-palette","fa-briefcase","fa-home","fa-medkit","fa-dumbbell","fa-basketball","fa-soccer-ball","fa-baseball","fa-volleyball","fa-tag"];setTimeout(()=>{A(_);const L=document.getElementById("btn-copy-catalog");L&&(L.onclick=()=>{const Q=document.getElementById("catalog-url-display")?.value;Q&&navigator.clipboard.writeText(Q).then(()=>V.success("Link do catálogo copiado!"))});const P=document.getElementById("btn-bulk-save"),K=document.getElementById("btn-bulk-cancel");P&&(P.onclick=()=>window.applyBulkCategory()),K&&(K.onclick=()=>window.cancelBulkActions());const j=document.getElementById("bulk-upload-section");j&&(j.addEventListener("dragover",Q=>{Q.preventDefault(),j.classList.add("drag-active")}),j.addEventListener("dragleave",()=>j.classList.remove("drag-active")),j.addEventListener("drop",Q=>{Q.preventDefault(),j.classList.remove("drag-active"),Q.dataTransfer?.files&&x(Q.dataTransfer.files)}))},100);const g=`
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
    `,w=`
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
                            ${c.map(L=>`
                                <label class="store-checkbox-card">
                                    <input type="checkbox" name="store-ids" value="${L.id}">
                                    <span class="checkbox-label">${L.name}</span>
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
                     <h2 class="page-title" style="margin-bottom: 4px;">${s?"Catálogo de Serviços":"Catálogo de Produtos"}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${s?"Gerencie os serviços oferecidos pela sua empresa.":"Gerencie os produtos visíveis no cardápio das suas lojas."}</p>
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
                    <button class="filter-pill ${_==="all"?"active":""}" onclick="window.setStoreFilter('all', this)">Todas</button>
                    ${c.map(L=>`
                        <button class="filter-pill ${_===L.id?"active":""}" onclick="window.setStoreFilter('${L.id}', this)">${L.name}</button>
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
                            ${D.map(L=>`<option value="${L.id}">${L.name}</option>`).join("")}
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
                            <th>${s?"Duração":"Estoque"}</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${k()}
                    </tbody>
                </table>
            </div>
        </div>
        ${w}
        ${g}
    `},dx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";let i=(await F.get("companies",n.companyId))?.stores||[];const a=n.role==="owner",s=()=>i.length===0?'<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>':i.map(l=>{const c=l.active&&l.instancia_id,u=l.frete_ativo!==!1;return`
            <tr data-store-id="${l.id}">
                <td>${l.name}</td>
                <td>${l.address}</td>
                <td><span class="badge ${c?"success":"danger"}">${c?"Operante":l.active?"Sem Instância":"Inativa"}</span></td>
                <td><span class="badge ${u?"success":"warning"}">${u?"Frete Ativo":"N/A: Retirada Apenas"}</span></td>
                <td>
                    <div class="actions">
                        ${a?`
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
        `}).join(""),o=()=>{const l=document.querySelector(".data-table tbody");l&&(l.innerHTML=s())};return window.toggleStoreFrete=async(l,c)=>{try{const u=!c,h=i.map(_=>_.id===l?{..._,frete_ativo:u}:_);await F.update("companies",n.companyId,{stores:h}),i=h,o(),V.success(`Frete da loja atualizado para ${u?"ativo":"inativo"}.`)}catch(u){V.error("Erro ao atualizar frete: "+u)}},window.toggleStoreStatus=async(l,c)=>{const u=c?"desativar":"ativar";if(await Xe.warning(`${u.charAt(0).toUpperCase()+u.slice(1)} Loja`,`Deseja ${u} esta loja?`))try{const _=i.map(b=>b.id===l?{...b,active:!c}:b);await F.update("companies",n.companyId,{stores:_}),i=_,o(),V.success(`Loja ${c?"desativada":"ativada"} com sucesso!`)}catch(_){V.error("Erro ao atualizar status: "+_)}},`
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
                        ${s()}
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
    `},Zd=async()=>{let n=await F.getAll("users");const e=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>':n.map(s=>`
            <tr data-user-id="${s.id}">
                <td>${s.name||"-"}</td>
                <td>${s.email}</td>
                <td><span class="badge info">${s.role}</span></td>
                <td><span class="badge ${s.companyId?"warning":"success"}">${s.companyId?"Vinculado":"Global"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editAdminUser('${s.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
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
    `,i=()=>{const s=document.querySelector(".data-table tbody");s&&(s.innerHTML=e())};return window.editAdminUser=s=>{const o=n.find(l=>l.id===s||l.uid===s);o&&(document.getElementById("user-uid").value=o.id,document.getElementById("user-name").value=o.name||"",document.getElementById("user-email").value=o.email||"",document.getElementById("admin-user-modal").classList.remove("hidden"))},setTimeout(()=>{a()},100),`
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
    `;function a(){const s=document.getElementById("admin-user-modal"),o=document.querySelector(".close-modal"),l=document.getElementById("edit-user-form");o&&s&&(o.onclick=()=>s.classList.add("hidden")),l&&(l.onsubmit=async c=>{c.preventDefault();const u=document.getElementById("user-uid").value,h=document.getElementById("user-name").value;try{await F.update("users",u,{name:h});const _=n.find(b=>b.id===u);_&&(_.name=h),i(),V.success("Usuário atualizado com sucesso!"),s&&s.classList.add("hidden")}catch(_){console.error(_),V.error("Erro ao atualizar: "+_)}})}};class Wh{container;inputWrapper;searchInput;dropdown;options;selectedValues;onChange;maxVisibleTags;placeholder;constructor(e,t,i=[],a=()=>{},s="Selecione...",o=10){this.options=t,this.selectedValues=new Set(i),this.onChange=a,this.maxVisibleTags=o,this.placeholder=s;const l=document.getElementById(e);if(!l)throw new Error(`Container #${e} not found`);this.container=l,this.container.className="multi-select-container",this.inputWrapper=this.createInputWrapper(),this.searchInput=this.createSearchInput(),this.dropdown=this.createDropdown(),this.inputWrapper.appendChild(this.searchInput),this.container.appendChild(this.inputWrapper),this.container.appendChild(this.dropdown),this.setupEventListeners(),this.render()}createInputWrapper(){const e=document.createElement("div");return e.className="multi-select-input",e}createSearchInput(){const e=document.createElement("input");return e.type="text",e.className="multi-select-search",e.placeholder=this.selectedValues.size===0?this.placeholder:"",e}createDropdown(){const e=document.createElement("div");return e.className="multi-select-dropdown",e}setupEventListeners(){this.inputWrapper.addEventListener("click",e=>{e.stopPropagation(),this.searchInput.focus(),this.openDropdown()}),this.searchInput.addEventListener("input",()=>{this.renderDropdown(),this.openDropdown()}),this.searchInput.addEventListener("keydown",e=>{if(e.key==="Backspace"&&this.searchInput.value===""&&this.selectedValues.size>0){const t=Array.from(this.selectedValues).pop();t&&this.toggleOption(t)}}),document.addEventListener("click",e=>{this.container.contains(e.target)||this.closeDropdown()})}openDropdown(){this.dropdown.classList.add("active"),this.inputWrapper.classList.add("active")}closeDropdown(){this.dropdown.classList.remove("active"),this.inputWrapper.classList.remove("active"),this.searchInput.value="",this.renderDropdown()}render(){this.renderTags(),this.renderDropdown()}renderTags(){this.inputWrapper.querySelectorAll(".multi-select-tag, .multi-select-more").forEach(a=>a.remove());const t=Array.from(this.selectedValues);if(t.slice(0,this.maxVisibleTags).forEach(a=>{const s=this.options.find(o=>o.value===a);if(s){const o=this.createTag(s);this.inputWrapper.insertBefore(o,this.searchInput)}}),t.length>this.maxVisibleTags){const a=document.createElement("span");a.className="multi-select-more",a.textContent=`+${t.length-this.maxVisibleTags}`,this.inputWrapper.insertBefore(a,this.searchInput)}this.searchInput.placeholder=this.selectedValues.size===0?this.placeholder:""}createTag(e){const t=document.createElement("div");t.className="multi-select-tag";const i=document.createElement("span");i.textContent=e.label;const a=document.createElement("button");return a.className="multi-select-tag-remove",a.innerHTML='<i class="fa-solid fa-xmark"></i>',a.onclick=s=>{s.stopPropagation(),this.toggleOption(e.value)},t.appendChild(i),t.appendChild(a),t}renderDropdown(){this.dropdown.innerHTML="";const e=this.searchInput.value.toLowerCase(),t=this.options.filter(i=>i.label.toLowerCase().includes(e)||i.meta&&i.meta.toLowerCase().includes(e));if(t.length===0){const i=document.createElement("div");i.className="multi-select-no-results",i.textContent="Nenhum resultado encontrado",this.dropdown.appendChild(i);return}t.forEach(i=>{const a=this.createOption(i);this.dropdown.appendChild(a)})}createOption(e){const t=document.createElement("div");t.className="multi-select-option",this.selectedValues.has(e.value)&&t.classList.add("selected");const i=document.createElement("div");i.className="multi-select-checkbox";const a=document.createElement("div");if(a.className="multi-select-option-label",a.textContent=e.label,t.appendChild(i),t.appendChild(a),e.meta){const s=document.createElement("div");s.className="multi-select-option-meta",s.textContent=e.meta,t.appendChild(s)}return t.addEventListener("click",s=>{s.stopPropagation(),this.toggleOption(e.value),this.searchInput.value="",this.searchInput.focus(),this.renderDropdown()}),t}toggleOption(e){this.selectedValues.has(e)?this.selectedValues.delete(e):this.selectedValues.add(e),this.renderTags(),this.renderDropdown(),this.onChange(Array.from(this.selectedValues))}getValues(){return Array.from(this.selectedValues)}setValues(e){this.selectedValues=new Set(e),this.render()}destroy(){this.container.innerHTML=""}}const ux=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";const i=(await F.get("companies",n.companyId))?.stores||[];let a=null,o=(await F.getAll("users",{field:"companyId",operator:"==",value:n.companyId})).filter(b=>b.role==="employee");const l=b=>{let R=[];return!b||(typeof b=="string"?R=b===""?[]:[b]:R=b,R.length===0)?"Todas":R.map(D=>{const v=i.find(k=>k.id===D);return v?v.name:D}).join(", ")},c=()=>o.length===0?'<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>':o.map(b=>`
            <tr data-user-id="${b.id}">
                <td>${b.name||"Sem Nome"}</td>
                <td>${b.email}</td>
                <td><span class="badge primary">Atendente</span></td>
                <td>${l(b.storeIds||b.storeId)}</td>
                <td><span class="badge ${b.active!==!1?"success":"danger"}">${b.active!==!1?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editEmployee('${b.id}')" title="Editar"><i style="color: #fff;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleEmployeeStatus('${b.id}', ${b.active!==!1})" title="${b.active!==!1?"Desativar":"Ativar"}">${b.active!==!1?'<i style="color: #fff;" class="fa-solid fa-ban"></i>':'<i style="color: #fff;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteEmployee('${b.id}')" title="Excluir"><i style="color: #fff;" class="fa-solid fa-trash"></i></button>
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
    `,h=()=>{const b=document.querySelector(".data-table tbody");b&&(b.innerHTML=c())};return window.editEmployee=b=>{const R=o.find(M=>M.id===b||M.uid===b);if(R){if(document.getElementById("emp-uid").value=R.id,document.getElementById("emp-name").value=R.name,document.getElementById("emp-email").value=R.email,a){const M=R.storeIds||(R.storeId?[R.storeId]:[]);a.setValues(M)}document.getElementById("emp-password").required=!1,document.getElementById("pwd-hint").style.display="block",document.getElementById("emp-email").disabled=!0,document.getElementById("modal-title").innerText="Editar Colaborador",document.getElementById("employee-modal").classList.remove("hidden")}},window.toggleEmployeeStatus=async(b,R)=>{try{await F.update("users",b,{active:!R});const M=o.find(D=>D.id===b);M&&(M.active=!R),h(),V.success(`Colaborador ${R?"desativado":"ativado"} com sucesso!`)}catch(M){V.error("Erro ao atualizar status: "+M)}},window.deleteEmployee=async b=>{if(await Xe.danger("Excluir Colaborador","Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita."))try{await F.delete("users",b),o=o.filter(M=>M.id!==b),h(),V.success("Colaborador excluído com sucesso!")}catch(M){V.error("Erro ao excluir: "+M)}},setTimeout(()=>{_(n.companyId)},100),`
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
                        ${c()}
                    </tbody>
                </table>
            </div>
        </div>
        ${u}
    `;function _(b){const R=document.getElementById("employee-modal"),M=document.getElementById("btn-new-employee"),D=document.querySelector(".close-modal"),v=document.getElementById("create-employee-form"),k=i.map(S=>({value:S.id,label:S.name}));a=new Wh("employee-stores-select",k,[],()=>{},"Selecione as lojas..."),M&&R&&(M.onclick=()=>{document.getElementById("emp-uid").value="",document.getElementById("create-employee-form").reset(),document.getElementById("emp-password").required=!0,document.getElementById("pwd-hint").style.display="none",document.getElementById("emp-email").disabled=!1,document.getElementById("modal-title").innerText="Novo Colaborador",a&&a.setValues([]),R.classList.remove("hidden")}),D&&R&&(D.onclick=()=>R.classList.add("hidden")),v&&(v.onsubmit=async S=>{S.preventDefault();const $=document.getElementById("emp-uid").value,C=document.getElementById("emp-name").value,T=document.getElementById("emp-email").value,A=document.getElementById("emp-password").value,f=a?a.getValues():[];try{if($){const m={name:C,storeIds:f.length>0?f:[]};await F.update("users",$,m);const y=o.find(x=>x.id===$);y&&Object.assign(y,m),V.success("Colaborador atualizado com sucesso!")}else{const m=await Ae.registerUser(T,A),y={uid:m,name:C,email:T,role:"employee",companyId:b,storeIds:f.length>0?f:[],active:!0,permissions:["orders","products"]};await F.set("users",m,y),o.push({id:m,...y}),V.success("Colaborador adicionado com sucesso!")}R&&R.classList.add("hidden"),h()}catch(m){console.error(m),V.error("Erro: "+m)}})}},px=()=>`
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
    `,mx=async()=>{let n=await F.getAll("companies"),e=null,t=["atendimento"];const i=[{value:"atendimento",label:"IA de Atendimento"},{value:"venda",label:"IA de Venda"},{value:"agendamento",label:"IA de Agendamento"},{value:"disparo",label:"Disparo em Massa"},{value:"venda_catalogo",label:"Venda pelo Catálogo"}],a=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>':n.map(h=>`
            <tr data-company-id="${h.id}">
                <td>${h.name}</td>
                <td><span class="badge ${h.status==="active"?"success":"danger"}">${h.status==="active"?"Ativo":"Inativo"}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(h.modulos_ativos||[]).map(_=>`<span class="badge info" style="font-size:0.7rem;">${_}</span>`).join("")}</div></td>
                <td>${h.stores?h.stores.length:0}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editCompany('${h.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleCompanyStatus('${h.id}', '${h.status}')" title="${h.status==="active"?"Desativar":"Ativar"}">${h.status==="active"?'<i style="color: #ef4444;" class="fa-solid fa-toggle-off"></i>':'<i style="color: #22c55e;" class="fa-solid fa-toggle-on"></i>'}</button>
                    </div>
                </td>
            </tr>
        `).join(""),s=`
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
    `,o=()=>{const h=document.querySelector(".data-table tbody");h&&(h.innerHTML=a())};window.editCompany=h=>{const _=n.find(b=>b.id===h);if(_){if(document.getElementById("company-id").value=_.id,document.getElementById("company-name").value=_.name,document.getElementById("company-instances-limit").value=(_.limite_instancias||"1").toString(),e){const R=_.modulos_ativos||["atendimento"];e.setValues(R),t=R}document.getElementById("owner-section").style.display="none",document.getElementById("owner-email").required=!1,document.getElementById("owner-password").required=!1;const b=document.getElementById("stores-list");b.innerHTML="",_.stores&&_.stores.length>0?_.stores.forEach(R=>{l(R)}):l(),document.getElementById("company-modal-title").innerText="Editar Cliente",document.getElementById("company-modal").classList.remove("hidden")}},window.toggleCompanyStatus=async(h,_)=>{const b=_==="active"?"inactive":"active",R=b==="inactive"?"desativar":"ativar";let M=`Deseja ${R} este cliente?`;if(b==="inactive"&&(M+=`

⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!`),await Xe.warning(`${R.charAt(0).toUpperCase()+R.slice(1)} Cliente`,M))try{await F.update("companies",h,{status:b});const v=n.find(k=>k.id===h);v&&(v.status=b),o(),V.success(`Cliente ${b==="inactive"?"desativado":"ativado"} com sucesso!`)}catch(v){V.error("Erro ao atualizar status: "+v)}};const l=(h=null)=>{const _=document.getElementById("stores-list");if(!_)return;const b=document.createElement("div");b.className="store-row",h&&(b.dataset.id=h.id,b.dataset.active=h.active!==void 0?h.active:"true",b.dataset.freteAtivo=h.frete_ativo!==void 0?h.frete_ativo:"true",b.dataset.instanciaId=h.instancia_id||""),b.innerHTML=`
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${h?.name||""}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${h?.address||""}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `,b.querySelector(".btn-remove-store").addEventListener("click",()=>{b.remove()}),_.appendChild(b)},c=`
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
                        ${a()}
                    </tbody>
                </table>
            </div>
        </div>
        ${s}
    `;function u(h){const _=document.getElementById("company-modal"),b=document.getElementById("btn-new-company"),R=document.querySelector(".close-modal"),M=document.getElementById("create-company-form"),D=document.getElementById("btn-add-store"),v=document.getElementById("stores-list");e=new Wh("modules-select-container",i,["atendimento"],k=>{const S=["atendimento","venda","agendamento"],$=k.find(C=>!t.includes(C));if($==="venda_catalogo"){const C=k.filter(T=>T==="venda_catalogo"||T==="disparo");if(C.length!==k.length){e?.setValues(C),t=C;return}}else if($&&(S.includes($)||$==="disparo")){const C=k.filter(T=>T!=="venda_catalogo");if(S.includes($)){const T=C.filter(A=>!S.includes(A)||A===$);if(T.length!==C.length||C.length!==k.length){e?.setValues(T),t=T;return}}if(C.length!==k.length){e?.setValues(C),t=C;return}}t=k},"Selecione os módulos..."),b&&_&&(b.onclick=()=>{document.getElementById("company-id").value="",document.getElementById("create-company-form").reset(),document.getElementById("owner-section").style.display="block",document.getElementById("owner-email").required=!0,document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",e&&(e.setValues(["atendimento"]),t=["atendimento"]),v&&(v.innerHTML="",h()),_.classList.remove("hidden")}),R&&_&&(R.onclick=()=>_.classList.add("hidden")),D&&(D.onclick=()=>h()),M&&(M.onsubmit=async k=>{k.preventDefault();const S=document.getElementById("company-id").value,$=document.getElementById("company-name").value,C=document.getElementById("owner-email").value,T=document.getElementById("owner-password").value,A=parseInt(document.getElementById("company-instances-limit").value)||1,f=e?e.getValues():["atendimento"];if(f.includes("venda_catalogo")&&f.filter(E=>E!=="venda_catalogo"&&E!=="disparo").length>0){V.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".');return}const m=document.querySelectorAll(".store-row"),y=[];if(m.forEach((x,E)=>{const g=x.querySelector(".store-name").value,w=x.querySelector(".store-address").value;if(g&&w){const L=x.dataset.id,P=x.dataset.active!=="false",K=x.dataset.freteAtivo!=="false",j=x.dataset.instanciaId||null;y.push({id:L||`store_${Date.now()}_${E}`,name:g,address:w,active:P,frete_ativo:K,instancia_id:j})}}),y.length===0){V.warning("É necessário cadastrar pelo menos 1 loja!");return}try{if(S){await F.update("companies",S,{name:$,stores:y,limite_instancias:A,modulos_ativos:f});const x=n.find(E=>E.id===S);x&&(x.name=$,x.stores=y,x.modulos_ativos=f),V.success("Cliente atualizado com sucesso!")}else{const x=await Ae.registerUser(C,T),E=await F.create("companies",{name:$,stores:y,limite_instancias:A,status:"active",ownerId:x,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}});await F.set("users",x,{uid:x,email:C,role:"owner",companyId:E}),n.push({id:E,name:$,stores:y,status:"active",ownerId:x,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}}),V.success("Cliente criado com sucesso!")}_&&_.classList.add("hidden"),o()}catch(x){console.error(x),V.error("Erro: "+x)}})}return setTimeout(()=>{u(l)},100),c},fx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await F.get("companies",n.companyId),i=t.limite_instancias||1;let a=await F.getAll("instancias",{field:"empresaId",operator:"==",value:n.companyId});setTimeout(async()=>{let D=!1;for(const v of a)try{const S=(await vt.getInstanceStatus(v.nome)).connected?"conectado":"desconectado";S!==v.status&&(await F.update("instancias",v.id,{status:S}),v.status=S,D=!0)}catch(k){console.error("Error verifying status for",v.nome,k)}D&&h()},500);const o=()=>a.length===0?'<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>':a.map(D=>`
            <tr>
                <td>${D.nome}</td>
                <td>${D.numero?D.numero.split("@")[0]:"-"}</td>
                <td>
                    <span class="badge ${l(D.status)}">
                        ${c(D.status)}
                    </span>
                </td>
                <td><span class="badge info">${t.stores?.find(v=>v.id===D.lojaId)?.name||"Global"}</span></td>
                <td><span class="badge secondary">${D.funcao||"Nenhuma"}</span></td>
                <td>${D.createdAt?.toDate?D.createdAt.toDate().toLocaleDateString():"N/A"}</td>
                <td>
                    <div class="actions">
                        ${D.status==="desconectado"?`<button class="action-btn" onclick="window.connectInstance('${D.nome}')" title="Conectar"><i style="color: #FFF;" class="fa-solid fa-qrcode"></i></button>`:""}
                        <button class="action-btn" onclick="window.shareQR('${D.nome}')" title="Compartilhar Link QR" style="background-color: #6366f1; border-color: #6366f1;"><i style="color: #FFF;" class="fa-solid fa-share-nodes"></i></button>
                        ${D.status==="conectado"?`<button class="action-btn" onclick="window.logoutInstance('${D.id}', '${D.nome}')" title="Desconectar" style="background-color: var(--warning); border-color: var(--warning);"><i style="color: #FFF;" class="fa-solid fa-right-from-bracket"></i></button>`:""}
                        <button class="action-btn" onclick="window.deleteInstance('${D.id}', '${D.nome}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),l=D=>{switch(D){case"conectado":return"success";case"desconectado":return"danger";default:return"secondary"}},c=D=>{switch(D){case"conectado":return"Conectado";case"desconectado":return"Desconectado";default:return D}},u=`
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
    `,h=()=>{const D=document.querySelector(".data-table tbody");D&&(D.innerHTML=o())};let _=null,b=null;const R=()=>{_&&clearInterval(_),b&&clearInterval(b),_=null,b=null};window.refreshApp=()=>{window.location.reload()},window.shareQR=D=>{const v=`${window.location.origin}/qr/${D}`;navigator.clipboard.writeText(v),V.success("Link de conexão copiado para a área de transferência!")},window.deleteInstance=async(D,v)=>{if(await Xe.danger("Excluir Instância",`Tem certeza que deseja excluir a instância "${v}"? Isso irá desconectar o WhatsApp.`))try{await vt.deleteInstance(v),await F.delete("instancias",D),a=a.filter(S=>S.id!==D),h(),V.success("Instância excluída com sucesso.")}catch(S){V.error("Erro ao excluir instância: "+S)}},window.logoutInstance=async(D,v)=>{if(await Xe.warning("Desconectar WhatsApp",`Deseja realmente desconectar o WhatsApp da instância "${v}"?`))try{if(V.info("Desconectando..."),await vt.logoutInstance(v)){await F.update("instancias",D,{status:"desconectado"});const $=a.find(C=>C.id===D);$&&($.status="desconectado"),h(),V.success("Desconectado com sucesso.")}else V.error("Não foi possível desconectar pela API. Verifique se a instância está ativa.")}catch(S){V.error("Erro ao desconectar: "+S)}},window.connectInstance=async D=>{const v=document.getElementById("qrcode-modal"),k=document.getElementById("qrcode-container");if(v&&k){v.classList.remove("hidden"),k.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';const S=async()=>{try{const T=await vt.getQRCode(D);T&&T.base64?k.innerHTML=`<img src="${T.base64}" style="width: 100%; height: 100%; object-fit: contain;">`:(await vt.getInstanceStatus(D)).connected?C():k.innerHTML="<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>"}catch(T){console.error("Error fetching QR:",T)}},$=async()=>{try{(await vt.getInstanceStatus(D)).connected&&C()}catch(T){console.error("Error checking status:",T)}},C=async()=>{R(),V.success("WhatsApp conectado com sucesso!"),v.classList.add("hidden");const T=a.find(A=>A.nome===D);T&&(await F.update("instancias",T.id,{status:"conectado"}),T.status="conectado",h())};await S(),_=setInterval(S,4e4),b=setInterval($,3e3)}},setTimeout(()=>{M(t.id,i)},100);function M(D,v){const k=document.getElementById("btn-new-instance"),S=document.getElementById("new-instance-modal"),$=document.getElementById("close-new-modal"),C=document.getElementById("create-instance-form"),T=document.getElementById("qrcode-modal"),A=document.getElementById("close-qr-modal"),f=document.getElementById("btn-done-qrcode");k&&(k.onclick=()=>{if(a.length>=v){V.error("Limite de instâncias atingido.");return}S?.classList.remove("hidden")}),$&&S&&($.onclick=()=>S.classList.add("hidden")),C&&(C.onsubmit=async m=>{m.preventDefault();let x=document.getElementById("instance-name").value.trim();x=x.replace(/[^a-zA-Z0-9]/g,"_").toLowerCase();const E=`${x}_${D.substring(0,5)}`;try{if(await vt.instanceExists(E)){V.warning("Já existe uma instância com esse nome. Tente outro.");return}V.info("Criando instância, aguarde..."),await vt.createInstance(E);const w={empresaId:D,lojaId:null,nome:E,numero:null,status:"desconectado",funcao:null,webhookUrl:null,upsert:!1},L=await F.create("instancias",w);a.push({id:L,...w,createdAt:{toDate:()=>new Date}}),V.success("Instância criada! Agora vincule-a a uma loja nas configurações."),S?.classList.add("hidden"),h(),window.connectInstance(E)}catch(g){V.error("Erro ao criar instância: "+g)}}),A&&T&&(A.onclick=()=>{R(),T.classList.add("hidden")}),f&&T&&(f.onclick=async()=>{R(),T.classList.add("hidden"),window.location.reload()})}return`
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${a.length>=i?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${i}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${a.length}
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
    `},gx=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{telefone_lead}}",label:"Telefone",icon:"fa-phone"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],yx=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito para retirada e já está sendo preparado. 

💰 Valor: R$ {{valor_total}}

Aguardamos você!`},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado."},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! 📦 Seu pedido #{{numero_pedido}} já está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue",icon:"fa-flag-checkered",default:"🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],vx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,i=await F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),s=await F.get("companies",e);let o=s?.stores||[];if(n.role!=="owner"){const S=n.storeIds||(n.storeId?[n.storeId]:[]);o=o.filter($=>S.includes($.id))}if(o.length===0)return'<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>';let l=o[0].id;const c=()=>`
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
    `,u=()=>o.find(S=>S.id===l),h=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:e}),_=S=>h.find($=>$.lojaId===S)||null,b=()=>gx.map(S=>`
        <div class="var-chip" draggable="true" data-var="${S.key}" title="Arraste para o campo de mensagem">
            <i class="fa-solid ${S.icon}"></i>
            <span>${S.label}</span>
            <code>${S.key}</code>
        </div>
    `).join("");return setTimeout(()=>{R(),M()},100),`
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
            ${c()}
        </div>

        <div id="config-content-area"></div>
    `;function R(){const S=()=>{document.querySelectorAll(".btn-store-tab").forEach($=>{$.addEventListener("click",()=>{l=$.dataset.id;const C=document.getElementById("tabs-container");C&&(C.innerHTML=c(),S()),M()})})};S()}function M(){const S=u();if(!S)return;const $=_(l),C=$?.mensagens_automaticas||{},T=$?.prompt_ia||S.prompt_ia||"",A=document.getElementById("config-content-area");if(!A)return;const f=()=>'<option value="">Nenhuma</option>'+i.map(y=>{const x=S.instancia_id===y.id,E=o.some(g=>g.id!==l&&g.instancia_id===y.id);return`<option value="${y.id}" ${x?"selected":""} ${E?"disabled":""}>
                     ${y.nome} (${y.status}) ${E?"(Já vinculada a outra loja)":""}
                 </option>`}).join(""),m=()=>yx.map(y=>`
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
        `).join("");A.innerHTML=`
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
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(y=>{const x=$?.horarios?.[y.key]||{active:!1,open:"08:00",close:"18:00"};return`
                        <div class="horario-row ${x.active?"":"inactive"}" id="row-${y.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle" data-dia="${y.key}" ${x.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${y.label}</span>
                            </div>
                            <div class="horario-inputs ${x.active?"":"hidden"}" id="inputs-${y.key}">
                                <input type="time" class="time-input" id="open-${y.key}" value="${x.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-${y.key}" value="${x.close||"18:00"}">
                            </div>
                            <div class="status-label" id="status-${y.key}" style="font-size: 0.8rem; color: ${x.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${x.active?"Aberto":"Fechado"}
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
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(y=>{const x=$?.horarios_entrega?.[y.key]||{active:!1,open:"08:00",close:"22:00"};return`
                        <div class="horario-row ${x.active?"":"inactive"}" id="row-entrega-${y.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle-entrega" data-dia="${y.key}" ${x.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${y.label}</span>
                            </div>
                            <div class="horario-inputs ${x.active?"":"hidden"}" id="inputs-entrega-${y.key}">
                                <input type="time" class="time-input" id="open-entrega-${y.key}" value="${x.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-entrega-${y.key}" value="${x.close||"22:00"}">
                            </div>
                            <div class="status-label" id="status-entrega-${y.key}" style="font-size: 0.8rem; color: ${x.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${x.active?"Disponível":"Indisponível"}
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
                        ${b()}
                    </div>
                </div>
                <div id="msg-editors">
                    ${m()}
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
        `,setTimeout(()=>{D(),v(),k()},50)}async function D(){const S=document.getElementById("instance-status-indicator");if(!S)return;const $=u();if(!$||!$.instancia_id){S.innerHTML='<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';return}const C=i.find(T=>T.id===$.instancia_id);if(C)try{(await vt.getInstanceStatus(C.nome)).connected?S.innerHTML='<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>':(S.innerHTML='<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>',C.status==="conectado"&&(await F.update("instancias",C.id,{status:"desconectado"}),C.status="desconectado"))}catch{S.innerHTML='<span class="badge warning">Verificando...</span>'}}function v(){const S=document.getElementById("select-store-instance");S?.addEventListener("change",async()=>{const A=S.value,f=u()?.instancia_id,m=o.map(y=>y.id===l?{...y,instancia_id:A||null}:y);try{V.info("Salvando configuração..."),await F.update("companies",e,{stores:m}),o=m;const y=u();if(y&&(y.instancia_id=A),A){const x=i.find(E=>E.id===A);if(x){const E=s.modulos_ativos||["atendimento"];let g="atendimento";E.includes("venda")?g="venda":E.includes("agendamento")?g="agendamento":E.includes("atendimento")?g="atendimento":E.includes("disparo")&&(g="disparo");const w=await F.get("settings","webhooks"),L=w?w[g]:null;V.info(`Vinculando instância e configurando webhook (${g})...`),await F.update("instancias",x.id,{lojaId:l,funcao:g,webhookUrl:L||null}),L&&(await vt.setWebhook(x.nome,L)?V.success("Webhook configurado com sucesso!"):V.warning("Configuração salva, mas houve uma falha ao ativar o webhook na API."))}}else if(f){const x=i.find(E=>E.id===f);x&&(V.info("Desvinculando instância e desativando webhook..."),await vt.setWebhook(x.nome,"",!1),await F.update("instancias",x.id,{lojaId:null,funcao:null,webhookUrl:null}))}D(),V.success("Vínculo de instância atualizado com sucesso!")}catch(y){V.error("Erro ao atualizar vínculo: "+y),M()}});const $=document.getElementById("btn-save-prompt");$?.addEventListener("click",async()=>{const A=document.getElementById("prompt-ia").value.trim();try{$&&($.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');const f=_(l);if(f)await F.update("loja_config",f.id,{prompt_ia:A}),f.prompt_ia=A;else{const y=await F.create("loja_config",{empresaId:e,lojaId:l,prompt_ia:A});h.push({id:y,empresaId:e,lojaId:l,prompt_ia:A})}const m=o.map(y=>y.id===l?{...y,prompt_ia:A}:y);await F.update("companies",e,{stores:m}),o=m,V.success("Prompt salvo com sucesso!"),$&&($.innerHTML='<i class="fa-solid fa-check"></i> Salvo!'),setTimeout(()=>{$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')},2e3)}catch{V.error("Erro ao salvar prompt."),$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')}}),document.querySelectorAll(".dia-toggle").forEach(A=>{A.addEventListener("change",()=>{const f=A.dataset.dia,m=A.checked,y=document.getElementById(`row-${f}`),x=document.getElementById(`inputs-${f}`),E=document.getElementById(`status-${f}`);m?(y?.classList.remove("inactive"),x?.classList.remove("hidden"),E&&(E.innerText="Aberto",E.style.color="var(--success)")):(y?.classList.add("inactive"),x?.classList.add("hidden"),E&&(E.innerText="Fechado",E.style.color="var(--text-dim)"))})});const C=document.getElementById("btn-save-horarios");C?.addEventListener("click",async()=>{try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const A={};["seg","ter","qua","qui","sex","sab","dom"].forEach(m=>{const y=document.querySelector(`.dia-toggle[data-dia="${m}"]`).checked,x=document.getElementById(`open-${m}`).value,E=document.getElementById(`close-${m}`).value;A[m]={active:y,open:x,close:E}});const f=_(l);if(f)await F.update("loja_config",f.id,{horarios:A}),f.horarios=A;else{const m=await F.create("loja_config",{empresaId:e,lojaId:l,horarios:A});h.push({id:m,empresaId:e,lojaId:l,horarios:A})}V.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'},2e3)}catch{V.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.querySelectorAll(".dia-toggle-entrega").forEach(A=>{A.addEventListener("change",()=>{const f=A.dataset.dia,m=A.checked,y=document.getElementById(`row-entrega-${f}`),x=document.getElementById(`inputs-entrega-${f}`),E=document.getElementById(`status-entrega-${f}`);m?(y?.classList.remove("inactive"),x?.classList.remove("hidden"),E&&(E.innerText="Disponível",E.style.color="var(--success)")):(y?.classList.add("inactive"),x?.classList.add("hidden"),E&&(E.innerText="Indisponível",E.style.color="var(--text-dim)"))})});const T=document.getElementById("btn-save-horarios-entrega");T?.addEventListener("click",async()=>{try{T.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const A={};["seg","ter","qua","qui","sex","sab","dom"].forEach(m=>{const y=document.querySelector(`.dia-toggle-entrega[data-dia="${m}"]`).checked,x=document.getElementById(`open-entrega-${m}`).value,E=document.getElementById(`close-entrega-${m}`).value;A[m]={active:y,open:x,close:E}});const f=_(l);if(f)await F.update("loja_config",f.id,{horarios_entrega:A}),f.horarios_entrega=A;else{const m=await F.create("loja_config",{empresaId:e,lojaId:l,horarios_entrega:A});h.push({id:m,empresaId:e,lojaId:l,horarios_entrega:A})}V.success("Horários de entrega salvos!"),T.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'},2e3)}catch{V.error("Erro ao salvar horários de entrega."),T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".var-chip").forEach(A=>{A.addEventListener("dragstart",f=>{f.dataTransfer.setData("text/plain",A.dataset.var||"")})}),document.querySelectorAll(".msg-textarea").forEach(A=>{A.addEventListener("dragover",f=>f.preventDefault()),A.addEventListener("drop",f=>{f.preventDefault();const m=f.dataTransfer.getData("text/plain");if(!m)return;const y=A.selectionStart??A.value.length,x=A.selectionEnd??A.value.length;A.value=A.value.slice(0,y)+m+A.value.slice(x)})}),document.querySelectorAll(".btn-save-msg").forEach(A=>{A.id!=="btn-save-prompt"&&A.addEventListener("click",async()=>{const f=A.dataset.msgKey,m=document.getElementById(`msg-${f}`).value.trim();A.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const y=_(l);if(y){const x={[`mensagens_automaticas.${f}`]:m||null};await F.update("loja_config",y.id,x),y.mensagens_automaticas||(y.mensagens_automaticas={}),y.mensagens_automaticas[f]=m||void 0}else{const x=await F.create("loja_config",{empresaId:e,lojaId:l,mensagens_automaticas:{[f]:m||null}});h.push({id:x,empresaId:e,lojaId:l,mensagens_automaticas:{[f]:m||void 0}})}V.success("Mensagem salva com sucesso!"),A.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{A.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'},2e3)}catch{V.error("Erro ao salvar mensagem."),A.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})})}function k(){const S=document.getElementById("primary-color"),$=document.getElementById("primary-color-hex"),C=document.getElementById("secondary-color"),T=document.getElementById("secondary-color-hex"),A=document.getElementById("logo-upload"),f=document.getElementById("btn-save-design");S?.addEventListener("input",()=>$.value=S.value),$?.addEventListener("change",()=>S.value=$.value),C?.addEventListener("input",()=>T.value=C.value),T?.addEventListener("change",()=>C.value=T.value);let m=null;A?.addEventListener("change",()=>{if(A.files&&A.files[0]){m=A.files[0];const y=new FileReader;y.onload=x=>{const E=document.getElementById("logo-preview");E&&(E.innerHTML=`<img src="${x.target?.result}" style="width:100%; height:100%; object-fit:contain;">`)},y.readAsDataURL(m)}}),f?.addEventListener("click",async()=>{try{f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';let y=_(l)?.design?.logoUrl||"";if(m){const g=un(pn,`logos/${e}/${l}_${Date.now()}`);await Ni(g,m),y=await oi(g)}const x={primaryColor:$.value,secondaryColor:T.value,logoUrl:y,whatsapp:document.getElementById("catalog-whatsapp").value.replace(/\D/g,"")},E=_(l);if(E)await F.update("loja_config",E.id,{design:x}),E.design=x;else{const g=await F.create("loja_config",{empresaId:e,lojaId:l,design:x});h.push({id:g,empresaId:e,lojaId:l,design:x})}V.success("Configurações do catálogo atualizadas!"),f.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Configurações'},2e3)}catch(y){console.error("Save design error:",y),V.error("Erro ao salvar design."),f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Visual'}})}};class bx{newOrderSound;paymentSound;humanSupportSound;notifiedSupportIds=new Set;isInitialLoad=!0;isLeadsInitialLoad=!0;unsubscribe=null;unsubscribeLeads=null;constructor(){this.newOrderSound=new Audio("/sounds/new-order.mp3"),this.paymentSound=new Audio("/sounds/payment-confirmed.mp3"),this.humanSupportSound=new Audio("/sounds/success.mp3"),this.newOrderSound.volume=.5,this.paymentSound.volume=.5,this.humanSupportSound.volume=.6}formatCustomerName(e){const t=e.nome||e.leadName||e.customerName||"";if(t&&t.length>2)return t;const i=e.leadId||e.telefone||"";if(i){const a=i.split("@")[0];return/^\d+$/.test(a)&&a.length>=10?`Cliente (${a.slice(-8)})`:a||"Cliente"}return"Cliente"}showHumanSupportAlert(e){this.humanSupportSound.currentTime=0,this.humanSupportSound.play().catch(()=>{});const t=document.createElement("div");t.className="order-modal",t.id=`support-modal-${e.id}`;const i=this.formatCustomerName(e);t.innerHTML=`
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
        `,document.body.appendChild(t),t.querySelector("#close-support")?.addEventListener("click",()=>{t.remove()})}async showNewOrder(e){const t=e.source==="catalog"||!!e.taxaNome;Array.isArray(e.itens)||(Array.isArray(e.items)?e.itens=e.items.map(v=>({item:v.name||v.item||"",quantidade:v.qty||v.quantidade||1,preco:v.price||v.preco||0,subtotal:v.subtotal||0})):e.itens=[]);const i=e.empresaId||Ae.getCurrentUser()?.companyId;if(i&&Array.isArray(e.itens)&&!t)try{const v=await F.getAll("products",{field:"companyId",operator:"==",value:i});let k=!1;if(e.itens.forEach(S=>{const $=(S.item||"").toLowerCase().trim(),C=v.find(T=>(T.name||"").toLowerCase().trim()===$);if(C){const T=C.promotionalActive&&C.promotionalPrice||C.price;(!S.preco||S.preco===0)&&(S.preco=T,k=!0)}}),k){let S=0;e.itens.forEach(C=>{const T=parseFloat(C.preco)||0,A=parseInt(C.quantidade)||1;S+=A*T});const $=parseFloat(e.valoresAdicionais)||0;e.value=S+$}}catch(v){console.error("Error syncing prices with catalog:",v)}this.newOrderSound.play().catch(()=>{});const a=document.createElement("div");a.className="order-modal",a.id=`modal-${e.id}`;const s=Array.isArray(e.itens)&&e.itens.length>0?e.itens.map((v,k)=>`
                <div class="order-item-row" style="display:flex; justify-content:space-between; align-items:center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="flex:1; font-weight:500;">${v.quantidade}x ${v.item}</span>
                    <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                        <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                        ${t?`<span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem;">${Number(v.preco||0).toFixed(2)}</span>`:`<input type="number" class="notif-item-price-input" data-index="${k}" value="${v.preco||0}" step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">`}
                    </div>
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1rem; text-align:center;">Sem itens listados.</p>',o=e.taxaAplicada||e.valoresAdicionais||0,c=`
            <div class="order-item-row" style="margin-top:0.5rem; padding: 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.85rem; font-weight:600;">${e.entrega==="retirada"?"Taxas / Adicionais":"Taxa de Entrega"}</span>
                    <small style="font-size:0.7rem; color:var(--text-dim);">Entrega, extras, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                    <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                    ${t?`
                        <span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem; color: var(--primary); font-weight: 700;">${Number(o||0).toFixed(2)}</span>
                        <input type="hidden" id="notif-additional-value" value="${o||0}">
                    `:`
                        <input type="number" id="notif-additional-value" value="${o||0}"
                            step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                    `}
                </div>
            </div>
        `;a.innerHTML=`
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
                                ${s}
                            </div>
                            
                            <!-- Total and Extras -->
                            <div style="background: rgba(255,255,255,0.03); border-top: 1px solid var(--border-color); padding: 1rem;">
                                ${c}
                                
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
        `,document.body.appendChild(a);const u=v=>{const k=parseFloat(v);return isNaN(k)?0:k},h=()=>{let v=0;t?(e.itens||[]).forEach($=>{v+=($.quantidade||1)*($.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach($=>{const C=parseInt($.dataset.index),T=(e.itens||[])[C]?.quantidade||1;v+=T*u($.value)});const k=u(document.getElementById("notif-additional-value")?.value);v+=k;const S=document.getElementById("notif-order-total");S&&(S.innerText=`R$ ${v.toFixed(2)}`)};document.querySelectorAll(".notif-item-price-input").forEach(v=>{v.addEventListener("input",h)}),document.getElementById("notif-additional-value")?.addEventListener("input",h);const _=a.querySelector("#accept-order"),b=a.querySelector("#reject-order"),R=a.querySelector("#confirm-reject"),M=a.querySelector("#reject-reason-container"),D=a.querySelector("#reject-reason");_?.addEventListener("click",async()=>{const v=Ae.getCurrentUser(),k=e.empresaId||v?.companyId;if(!k){V.error("Empresa não identificada.");return}_.disabled=!0,_.textContent="⌛ Processando...";try{let S=0,$=Array.isArray(e.itens)?[...e.itens]:[];if(t){$.forEach(x=>{S+=(x.quantidade||1)*(x.preco||0)});const y=parseFloat(document.getElementById("notif-additional-value")?.value)||0;S+=y}else{const y=E=>{const g=parseFloat(E);return isNaN(g)?0:g};document.querySelectorAll(".notif-item-price-input").forEach(E=>{const g=parseInt(E.dataset.index),w=$[g]?.quantidade||1,L=y(E.value);$[g]&&($[g].preco=L),S+=w*L});const x=y(document.getElementById("notif-additional-value")?.value);S+=x}const C={value:S,total:S,itens:$,valoresAdicionais:parseFloat(document.getElementById("notif-additional-value")?.value)||0},T=e.entrega==="retirada",A=e.pagamento||e.formaPagamento||e.paymentMethod||"",f=A.includes("entrega")||A.includes("dinheiro")||A.includes("maquininha")||A==="na_entrega";let m=T&&f?"em_preparo":"aguardando_pagamento";t&&f&&(m="em_preparo"),await ii.updateOrderStatus(e,k,m,void 0,C),V.success("Pedido aceito!"),a.remove()}catch(S){V.error("Erro ao aceitar pedido: "+S),_.disabled=!1,_.innerHTML='<i class="fa fa-check"></i> Aceitar'}}),b?.addEventListener("click",()=>{b.classList.add("hidden"),_.classList.add("hidden"),R.classList.remove("hidden"),M.style.display="block",D.focus()}),R?.addEventListener("click",async()=>{const v=D.value.trim();if(!v){V.warning("Informe o motivo da recusa."),D.style.borderColor="red";return}const k=Ae.getCurrentUser(),S=e.empresaId||k?.companyId;if(!S){V.error("Empresa não identificada.");return}R.disabled=!0,R.textContent="⌛ Processando...";try{await ii.updateOrderStatus(e,S,"cancelado",v),V.success("Pedido recusado e cliente notificado."),a.remove()}catch($){V.error("Erro ao recusar pedido: "+$),R.disabled=!1,R.textContent="Confirmar Recusa"}})}showPaymentConfirmed(){this.paymentSound.play().catch(()=>{});const e=document.createElement("div");e.className="order-modal",e.innerHTML=`
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
        `,document.body.appendChild(e),e.querySelector("#close-payment")?.addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}orderStatusMap=new Map;setupLeadsListener(e){const t=fi(zt,"leads"),i=s=>{if(s.type!=="modified"&&s.type!=="added")return;const o=s.doc.data(),l=s.doc.id,c="lead_"+l,u=(o.statusAtendimento||"").toLowerCase(),h=(o.estado||"").toLowerCase(),_=u==="atendimento_humano"||u==="em_atendimento_humano"||h==="atendimento_humano";if(this.isLeadsInitialLoad){_&&this.notifiedSupportIds.add(c);return}if(_&&!this.notifiedSupportIds.has(c)){if(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;const b=Ae.getCurrentUser();if(b&&b.role!=="owner"&&b.role!=="admin"){const R=b.storeIds||(b.storeId?[b.storeId]:[]);if(console.log("OrderNotification - Checking Lead Store isolation:",{userStoreIds:R,leadLojaId:o.lojaId}),R.length>0&&o.lojaId&&!R.includes(o.lojaId))return}this.showHumanSupportAlert({...o,id:l,leadId:o.telefone||l,customerName:this.formatCustomerName(o)}),this.notifiedSupportIds.add(c)}else!_&&this.notifiedSupportIds.has(c)&&this.notifiedSupportIds.delete(c)},a=Mn(t,On("empresaId","==",e),On("statusAtendimento","in",["atendimento_humano","em_atendimento_humano"]));this.unsubscribeLeads=$a(a,s=>{s.docChanges().forEach(i),this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)}),setTimeout(()=>{this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)},3e3)}startListening(){if(this.unsubscribe)return;const e=Ae.getCurrentUser();if(!e||!e.companyId)return;if(!["admin","owner","employee","staff"].includes(e.role||"")){console.log("OrderNotification - Unauthorized role for notifications:",e.role);return}const i=e.companyId,a=fi(zt,"pedidos"),s=Mn(a,On("empresaId","==",i),Sw("criadoEm","desc"),Cw(50));this.unsubscribe=$a(s,o=>{o.docChanges().forEach(l=>{const c=l.doc.data(),u=(c.status||"em_montagem").toLowerCase(),h=l.doc.id,_=this.orderStatusMap.get(h);if(this.isInitialLoad){this.orderStatusMap.set(h,u);return}if(this.orderStatusMap.set(h,u),!(c.empresaId&&c.empresaId!==i)&&!(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))){if(e&&e.role!=="owner"&&e.role!=="admin"){const b=e.storeIds||(e.storeId?[e.storeId]:[]);if(console.log("OrderNotification - Checking Store isolation:",{userStoreIds:b,orderLojaId:c.lojaId}),b.length>0&&c.lojaId&&!b.includes(c.lojaId))return}if(u==="em_preparo"&&_==="aguardando_pagamento"&&(c.manuallyConfirmed||this.showPaymentConfirmed()),u==="atendimento_humano"){const b="pedido_"+h;this.notifiedSupportIds.has(b)||(this.showHumanSupportAlert({...c,id:h,customerName:this.formatCustomerName(c)}),this.notifiedSupportIds.add(b));return}if(l.type==="added"){if(["cancelado","finalizado"].includes(u))return;this.showNewOrder({id:l.doc.id,...c,customerName:this.formatCustomerName(c),endereco:c.endereco||"Endereço não informado",description:Array.isArray(c.itens)?c.itens.map(R=>`${R.quantidade}x ${R.item}`).join(", "):"Sem itens",value:c.value||c.total||0,leadId:c.leadId,empresaId:c.empresaId,instancia:c.instancia,itens:c.itens,valoresAdicionais:c.valoresAdicionais})}}}),this.isInitialLoad&&(this.isInitialLoad=!1)}),this.setupLeadsListener(i)}stopListening(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.isInitialLoad=!0),this.unsubscribeLeads&&(this.unsubscribeLeads(),this.unsubscribeLeads=null,this.isLeadsInitialLoad=!0),this.notifiedSupportIds.clear(),this.orderStatusMap.clear()}}const eu=new bx,wx={novo:{label:"Novo",cls:"badge info"},cliente_ativo:{label:"Cliente Ativo",cls:"badge success"},inativo:{label:"Inativo",cls:"badge secondary"},bloqueado:{label:"Bloqueado",cls:"badge danger"}},_x={bot:{label:"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"},em_atendimento_humano:{label:"Atendimento Humano",icon:'<i class="fa-solid fa-user"></i>',cls:"badge warning"},finalizado:{label:"Finalizado",icon:'<i class="fa-solid fa-check"></i>',cls:"badge success"},abandonado:{label:"Abandonado",icon:'<i class="fa-solid fa-warning"></i>',cls:"badge secondary"}};function tu(n){const e=(n||"novo").toLowerCase(),t=wx[e]||{label:n||"Novo",cls:"badge info"};return`<span class="${t.cls}">${t.label}</span>`}function nu(n){const e=(n||"bot").toLowerCase(),t=_x[e]||{label:n||"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function jr(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const xx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await F.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId});const t=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(v=>v.lojaId&&t.includes(v.lojaId)));const a=(await F.get("companies",n.companyId))?.modulos_ativos||[],s=a.includes("venda_catalogo")&&!a.includes("atendimento");let o="todos";const l=v=>v.length===0?`<tr><td colspan="${s?4:5}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`:v.map(k=>{const S=(k.statusLead||"novo").toLowerCase(),$=(k.statusAtendimento||"bot").toLowerCase(),C=$==="atendimento_humano"?"em_atendimento_humano":$,T=(k.telefone||"").split("@")[0];return`
            <tr data-lead-id="${k.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="lead-avatar">${(k.nome||k.telefone||"C")[0].toUpperCase()}</div>
                        <div>
                            <div style="font-weight:600;">${k.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${T}</div>
                        </div>
                    </div>
                </td>
                <td>${tu(S)}</td>
                ${s?"":`<td>${nu(C)}</td>`}
                <td style="color:var(--text-muted);font-size:0.85rem;">${jr(k.updatedAt||k.criadoEm||k.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${k.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),c=v=>v==="todos"?e:v==="humano"?e.filter(k=>{const S=(k.statusAtendimento||"").toLowerCase();return S==="em_atendimento_humano"||S==="atendimento_humano"}):v==="bloqueado"?e.filter(k=>(k.statusLead||"").toLowerCase()==="bloqueado"):v==="bot"?e.filter(k=>(k.statusAtendimento||"bot").toLowerCase()==="bot"):e;return setTimeout(()=>u(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar">
                <button class="filter-btn active" data-filter="todos">Todos <span class="filter-count" id="count-lead-todos">${e.length}</span></button>
                ${s?"":`
                <button class="filter-btn" data-filter="bot"><i class="fa-solid fa-robot"></i> Bot <span class="filter-count" id="count-lead-bot">${e.filter(v=>(v.statusAtendimento||"bot").toLowerCase()==="bot").length}</span></button>
                <button class="filter-btn" data-filter="humano"><i class="fa-solid fa-user"></i> Atendimento Humano <span class="filter-count" id="count-lead-humano">${e.filter(v=>{const k=(v.statusAtendimento||"").toLowerCase();return k==="em_atendimento_humano"||k==="atendimento_humano"}).length}</span></button>
                `}
                <button class="filter-btn" data-filter="bloqueado"><i class="fa-solid fa-ban"></i> Bloqueados <span class="filter-count" id="count-lead-bloqueado">${e.filter(v=>(v.statusLead||"").toLowerCase()==="bloqueado").length}</span></button>
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Status do Lead</th>
                            ${s?"":"<th>Status do Atendimento</th>"}
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
    `;function u(){if(n){const k=fi(zt,"leads"),S=Mn(k,On("empresaId","==",n.companyId));window._leadsUnsubscribe&&window._leadsUnsubscribe();const $=$a(S,C=>{e=C.docs.map(m=>({id:m.id,...m.data()}));const T=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(m=>m.lojaId&&T.includes(m.lojaId)));const A=document.getElementById("leads-tbody");A&&(A.innerHTML=l(c(o)),h());const f={todos:e.length,bot:e.filter(m=>(m.statusAtendimento||"bot").toLowerCase()==="bot").length,humano:e.filter(m=>{const y=(m.statusAtendimento||"").toLowerCase();return y==="em_atendimento_humano"||y==="atendimento_humano"}).length,bloqueado:e.filter(m=>(m.statusLead||"").toLowerCase()==="bloqueado").length};Object.entries(f).forEach(([m,y])=>{const x=document.getElementById(`count-lead-${m}`);x&&(x.textContent=y.toString())})});window._leadsUnsubscribe=$}document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(k=>{k.addEventListener("click",()=>{document.querySelectorAll(".leads-filter-bar .filter-btn").forEach($=>$.classList.remove("active")),k.classList.add("active"),o=k.dataset.filter||"todos";const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(c(o))),h()})}),h();const v=document.getElementById("lead-detail-modal");v?.addEventListener("click",k=>{k.target===v&&v.classList.add("hidden")})}function h(){document.querySelectorAll(".action-btn.view").forEach(v=>{v.addEventListener("click",async()=>{const k=v.dataset.id,S=e.find($=>$.id===k);S&&_(S)})})}function _(v){const k=document.getElementById("lead-detail-modal"),S=document.getElementById("lead-modal-inner");if(!k||!S)return;const $=(v.statusLead||"novo").toLowerCase(),C=(v.statusAtendimento||"bot").toLowerCase(),T=C==="atendimento_humano"?"em_atendimento_humano":C,A=$==="bloqueado",f=(v.telefone||"").split("@")[0];let m="";!A&&!s&&(T==="bot"?m=`<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
                    <i class="fa-solid fa-user"></i> Assumir Atendimento
                </button>`:T==="em_atendimento_humano"?m=`<button id="lead-action-primary" class="btn-lead-action danger" data-action="finalizar">
                    <i class="fa-solid fa-user"></i> Finalizar Atendimento
                </button>`:m=`<button id="lead-action-primary" class="btn-lead-action" data-action="novo_atendimento">
                    <i class="fa-solid fa-user"></i> Iniciar Novo Atendimento
                </button>`);const y=b($);S.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar">${(v.nome||v.telefone||"C")[0].toUpperCase()}</div>
                <div class="lead-modal-title">
                    <h2>${v.nome||"Sem nome"}</h2>
                    <span style="color:var(--text-muted);font-size:0.9rem;">${f}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${y.length>0?`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="lead-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="lead-dropdown">
                            ${y.map(g=>`
                                <button class="lead-dropdown-item ${g.danger?"danger":""}" data-menu-action="${g.action}">
                                    ${g.icon} ${g.label}
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
                    ${tu($)}
                </div>
                ${s?"":`
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Atendimento</span>
                    ${nu(T)}
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
                        <span class="lead-info-value" style="font-size:0.8rem;">${v.empresaId||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Criado em</span>
                        <span class="lead-info-value">${jr(v.criadoEm||v.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${jr(v.updatedAt)}</span>
                    </div>
                    ${v.endereco?`
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço</span>
                        <span class="lead-info-value">${v.endereco}</span>
                    </div>`:""}
                </div>

                ${v.ultimoPedido||v.lastOrder?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Último Pedido</h4>
                    <div class="lead-last-order">
                        <span>${v.ultimoPedido||v.lastOrder}</span>
                    </div>
                </div>`:""}

                ${v.historicoResumo?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Histórico</h4>
                    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${v.historicoResumo}</p>
                </div>`:""}

                ${A?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-lock"></i> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.
                </div>`:""}
            </div>

            ${m?`
            <div class="lead-modal-footer">
                ${m}
            </div>`:""}
        `,k.classList.remove("hidden"),document.getElementById("close-lead-modal")?.addEventListener("click",()=>{k.classList.add("hidden")});const x=document.getElementById("lead-menu-trigger"),E=document.getElementById("lead-dropdown");x?.addEventListener("click",g=>{g.stopPropagation(),E?.classList.toggle("hidden")}),document.addEventListener("click",()=>E?.classList.add("hidden"),{once:!0}),E?.querySelectorAll(".lead-dropdown-item").forEach(g=>{g.addEventListener("click",async()=>{E.classList.add("hidden");const w=g.dataset.menuAction;await R(w,v)})}),document.getElementById("lead-action-primary")?.addEventListener("click",async function(){const g=this.dataset.action;await M(g,v)})}function b(v,k){const S=[];return v==="bloqueado"?S.push({label:"Desbloquear Lead",icon:'<i class="fa-solid fa-unlock"></i>',action:"desbloquear"}):S.push({label:"Bloquear Lead",icon:'<i class="fa-solid fa-lock"></i>',action:"bloquear",danger:!0}),S}async function R(v,k){if(v==="bloquear"){if(!await Xe.danger("Bloquear Lead",`Deseja bloquear o lead ${k.nome||k.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`))return;try{await F.update("leads",k.id,{statusLead:"bloqueado",statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ge.now()}),k.statusLead="bloqueado",k.statusAtendimento="finalizado",k.estado="finalizado",V.success("Lead bloqueado e atendimento finalizado."),D(k),_(k)}catch{V.error("Erro ao bloquear lead.")}}if(v==="desbloquear"){if(!await Xe.warning("Desbloquear Lead",`Deseja desbloquear o lead ${k.nome||k.telefone}?`))return;try{await F.update("leads",k.id,{statusLead:"cliente_ativo",updatedAt:ge.now()}),k.statusLead="cliente_ativo",V.success("Lead desbloqueado com sucesso."),D(k),_(k)}catch{V.error("Erro ao desbloquear lead.")}}}async function M(v,k){const S=document.getElementById("lead-action-primary");if(v==="assumir"){if(!await Xe.warning("Assumir Atendimento",`Deseja assumir o atendimento humano do lead ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",k.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()}),k.statusAtendimento="em_atendimento_humano",k.estado="atendimento_humano",V.success("Atendimento humano iniciado."),D(k),_(k)}catch{V.error("Erro ao assumir atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid user"></i> Assumir Atendimento'}}if(v==="finalizar"){if(!await Xe.warning("Finalizar Atendimento",`Deseja finalizar o atendimento do lead ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",k.id,{statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ge.now()}),k.statusAtendimento="finalizado",k.estado="finalizado",V.success("Atendimento finalizado."),D(k),_(k)}catch{V.error("Erro ao finalizar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid check"></i> Finalizar Atendimento'}}if(v==="novo_atendimento"){if(!await Xe.warning("Iniciar Novo Atendimento",`Deseja iniciar um novo atendimento humano para ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await F.update("leads",k.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()}),k.statusAtendimento="em_atendimento_humano",k.estado="atendimento_humano",V.success("Novo atendimento humano iniciado."),D(k),_(k)}catch{V.error("Erro ao iniciar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid refresh"></i> Iniciar Novo Atendimento'}}}function D(v){const k=e.findIndex($=>$.id===v.id);k>=0&&(e[k]={...e[k],...v});const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(c(o))),h()}};function Ex(n){if(!n)return null;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n).getTime();return isNaN(e)?null:e}function Ix(n){const e=Ex(n);if(e===null)return{label:"Sem registro",color:"#6b7280"};const t=Date.now()-e,i=Math.floor(t/(1e3*60*60*24)),a=Math.floor(t/(1e3*60*60)),s=Math.floor(t/(1e3*60));let o;s<60?o=s<=1?"Agora há pouco":`há ${s} min`:a<24?o=`há ${a}h`:i===1?o="Ontem":o=`há ${i} dias`;const l=i<7?"#22c55e":i<30?"#f59e0b":"#ef4444";return{label:o,color:l}}const Tx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId,[t,i,a]=await Promise.all([F.get("companies",e),F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),F.getAll("leads",{field:"empresaId",operator:"==",value:e})]);let s=[],o="nova";const l=()=>i.length===0?'<option value="">Nenhuma instância cadastrada</option>':i.map(v=>{const k=v.status==="conectado"||v.status==="open",S=t?.stores?.find(C=>C.instancia_id===v.id),$=!!S;return`<option value="${v.id}" 
                        data-status="${v.status}" 
                        ${$?"disabled":""} 
                        style="${$?"color: var(--text-muted);":""}">
                ${v.nome} ${k?'<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>':'<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i>'} ${S?`(EM USO: ${S.name})`:""}
            </option>`}).join(""),c=()=>s.length===0?'<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">Nenhuma campanha realizada ainda.</td></tr>':s.sort((v,k)=>{const S=v.data_agendamento?.seconds||v.data_inicio?.seconds||0;return(k.data_agendamento?.seconds||k.data_inicio?.seconds||0)-S}).map(v=>{const k=v.total_leads>0?Math.round((v.enviados+v.falhas)/v.total_leads*100):0,S=v.data_agendamento?new Date(v.data_agendamento.seconds*1e3).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"}):null;return`
                <tr>
                    <td>
                        <div style="font-weight: 700; color: var(--text-main);">${v.nome||"Campanha Sem Nome"}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${v.id.substring(0,8)}...</div>
                    </td>
                    <td><span class="badge secondary"><i class="fa-brands fa-whatsapp"></i> ${i.find($=>$.id===v.instancia_id)?.nome||"N/A"}</span></td>
                    <td>
                        ${S?`<div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Agendado</span></div><div style="font-size:0.85rem;font-weight:600;color:var(--primary);">${S}</div>`:v.data_inicio?new Date(v.data_inicio.seconds*1e3).toLocaleDateString():"-"}
                    </td>
                    <td><strong>${v.total_leads||0}</strong></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                                <span class="text-success">${v.enviados||0}</span>
                                <span class="text-danger">${v.falhas||0}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${k}%; height: 100%; background: var(--primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${v.status==="finalizada"?"success":v.status==="em_andamento"||v.status==="agendada"&&v.agendamento_imediato?"warning":v.status==="agendada"?"primary":"secondary"}">
                            ${v.status==="em_andamento"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':v.status==="finalizado"?'<i class="fa-solid fa-check-circle"></i> Finalizada':v.status==="processando"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':v.status==="agendada"&&v.agendamento_imediato?'<i class="fa-solid fa-hourglass-end"></i> Aguardando envio':v.status==="agendada"?'<i class="fa-solid fa-calendar"></i> Agendada':"Cancelada"}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="action-btn view-details" data-id="${v.id}" title="Ver detalhes" style="background: var(--primary); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-eye" style="color:#fff;"></i>
                            </button>
                            ${["processando","em_andamento","agendada"].includes(v.status)?`
                            <button class="action-btn cancel-campaign" data-id="${v.id}" title="Cancelar campanha" style="background: var(--danger); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
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
    `;return setTimeout(()=>b(),100),u;function h(){return`
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
                            ${t?.stores?.map(v=>`<option value="${v.id}">${v.name}</option>`).join("")}
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
        `}function _(){return`
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
                                ${c()}
                            </tbody>
                    </table>
                </div>
            </div>
        `}function b(){const v=document.getElementById("campaign-view-container");if(!v)return;const k=fi(zt,"campanhas"),S=Mn(k,On("cliente_id","==",e));window._campaignsUnsubscribe&&window._campaignsUnsubscribe();const $=$a(S,f=>{if(s=f.docs.map(m=>({id:m.id,...m.data()})),o==="historico"){const m=document.getElementById("campaigns-tbody");m&&(m.innerHTML=c(),M())}});window._campaignsUnsubscribe=$;const C=()=>{o==="nova"?(v.innerHTML=h(),R()):(v.innerHTML=_(),M())},T=document.getElementById("tab-nova"),A=document.getElementById("tab-historico");T?.addEventListener("click",()=>{o="nova",T.classList.add("active"),A?.classList.remove("active"),C()}),A?.addEventListener("click",()=>{o="historico",A.classList.add("active"),T?.classList.remove("active"),C()}),C()}function R(){let v=1;const k=15;let S=new Set,$=a,C=[""];const T=document.getElementById("campaign-name"),A=document.getElementById("select-instance"),f=document.getElementById("btn-start-campaign"),m=document.getElementById("lead-search"),y=document.getElementById("lead-filter-store"),x=document.getElementById("lead-filter-status"),E=document.getElementById("lead-filter-activity"),g=document.getElementById("leads-table-body"),w=document.getElementById("select-all-leads"),L=document.getElementById("pagination-info"),P=document.getElementById("prev-page"),K=document.getElementById("next-page"),j=document.getElementById("selected-count-display"),Q=document.getElementById("messages-list"),J=document.getElementById("btn-add-message"),Z=()=>{const Ee=m.value.toLowerCase(),ae=y.value,Ce=x.value,Fe=E?parseInt(E.value||"0"):0,me=Date.now(),rt=Fe>0?me-Fe*24*60*60*1e3:null;$=a.filter(fe=>{const ve=!Ee||(fe.nome||"").toLowerCase().includes(Ee)||(fe.telefone||"").includes(Ee),it=!ae||fe.lojaId===ae,je=!Ce||(fe.statusLead||"novo")===Ce;let xt=!0;if(rt!==null){const ot=fe.updatedAt||fe.criadoEm||fe.createdAt;let Ze=null;ot&&(typeof ot.toDate=="function"?Ze=ot.toDate().getTime():ot.seconds?Ze=ot.seconds*1e3:Ze=new Date(ot).getTime()),xt=Ze!==null&&Ze>=rt}return ve&&it&&je&&xt}),v=1,se()},se=()=>{if(!g||!L)return;const Ee=(v-1)*k,ae=Math.min(Ee+k,$.length),Ce=$.slice(Ee,ae);g.innerHTML=Ce.map(me=>{const rt=S.has(me.id),fe=t?.stores?.find(it=>it.id===me.lojaId)?.name||"N/A",ve=Ix(me.updatedAt||me.criadoEm||me.createdAt);return`
                    <tr>
                        <td><input type="checkbox" class="lead-checkbox" data-id="${me.id}" ${rt?"checked":""}></td>
                        <td>${me.nome||"Sem nome"}</td>
                        <td>${(me.telefone||"").split("@")[0]}</td>
                        <td><span class="badge secondary" style="font-size: 0.7rem;">${fe}</span></td>
                        <td><span class="badge ${me.statusLead==="cliente_ativo"?"success":"secondary"}" style="font-size: 0.7rem;">${me.statusLead||"novo"}</span></td>
                        <td>
                            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-muted);">
                                <span style="width:7px;height:7px;border-radius:50%;background:${ve.color};flex-shrink:0;"></span>
                                <span style="color:${ve.color};font-weight:600;">${ve.label}</span>
                            </span>
                        </td>
                    </tr>
                `}).join(""),L.textContent=`Mostrando ${Ee+1}-${ae} de ${$.length}`,j&&(j.textContent=S.size.toString());const Fe=Ce.length>0&&Ce.every(me=>S.has(me.id));w&&(w.checked=Fe),document.querySelectorAll(".lead-checkbox").forEach(me=>{me.addEventListener("change",rt=>{const fe=rt.target.dataset.id;rt.target.checked?S.add(fe):S.delete(fe),j&&(j.textContent=S.size.toString()),le()})}),le()},ce=()=>{Q&&(Q.innerHTML=C.map((Ee,ae)=>`
                <div class="message-block" data-index="${ae}">
                    <div class="message-block-header">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">MENSAGEM #${ae+1}</span>
                        ${C.length>1?`<button class="btn-remove-msg" data-index="${ae}"><i class="fa-solid fa-trash-can"></i> Remover</button>`:""}
                    </div>
                    <textarea class="form-control msg-textarea" rows="5" placeholder="Digite sua mensagem aqui..." data-index="${ae}" style="width: 100%; box-sizing: border-box;">${Ee}</textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                        <span class="char-count" style="font-size: 0.7rem; color: var(--text-muted);">${Ee.length} caracteres</span>
                    </div>
                </div>
            `).join(""),document.querySelectorAll(".btn-remove-msg").forEach(Ee=>{const ae=Ee;ae.addEventListener("click",()=>{const Ce=parseInt(ae.dataset.index||"0");C.splice(Ce,1),ce(),le()})}),document.querySelectorAll(".msg-textarea").forEach(Ee=>{const ae=Ee;ae.addEventListener("input",()=>{const Ce=parseInt(ae.dataset.index||"0");C[Ce]=ae.value;const Fe=ae.parentElement?.querySelector(".char-count");Fe&&(Fe.textContent=`${ae.value.length} caracteres`),le()}),ae.addEventListener("dragover",Ce=>Ce.preventDefault()),ae.addEventListener("drop",Ce=>{Ce.preventDefault();const Fe=Ce.dataTransfer.getData("text/plain");if(!Fe)return;const me=ae.selectionStart||ae.value.length,rt=ae.selectionEnd||ae.value.length,fe=ae.value.slice(0,me)+Fe+ae.value.slice(rt);ae.value=fe;const ve=parseInt(ae.dataset.index||"0");C[ve]=fe,le()})}))},le=()=>{const Ee=!!A.value,ae=S.size>0,Ce=C.every(fe=>fe.trim().length>0),Fe=A.options[A.selectedIndex],me=Fe?.dataset.status==="conectado"||Fe?.dataset.status==="open";let rt=!0;if(pe==="scheduled"){const fe=ke?.value;(!fe||new Date(fe).getTime()<=Date.now())&&(rt=!1)}f.disabled=!(Ee&&me&&ae&&Ce&&rt)};m?.addEventListener("input",Z),y?.addEventListener("change",Z),x?.addEventListener("change",Z),E?.addEventListener("change",Z),T?.addEventListener("input",le),P?.addEventListener("click",()=>{v>1&&(v--,se())}),K?.addEventListener("click",()=>{v<Math.ceil($.length/k)&&(v++,se())}),w?.addEventListener("change",Ee=>{const ae=(v-1)*k,Ce=Math.min(ae+k,$.length),Fe=$.slice(ae,Ce);Ee.target.checked?Fe.forEach(me=>S.add(me.id)):Fe.forEach(me=>S.delete(me.id)),se()}),J?.addEventListener("click",()=>{C.push(""),ce(),le()}),document.querySelectorAll(".var-chip").forEach(Ee=>{const ae=Ee;ae.addEventListener("dragstart",Ce=>{Ce.dataTransfer.setData("text/plain",ae.dataset.var||"")})});let pe="now";A?.addEventListener("change",le);const ye=document.getElementById("btn-send-now"),Ve=document.getElementById("btn-send-scheduled"),Me=document.getElementById("schedule-datetime-wrap"),ke=document.getElementById("schedule-datetime"),Ue=document.getElementById("schedule-error"),_t=()=>{pe==="scheduled"?f.innerHTML='<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha':f.innerHTML='<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora'},dt=Ee=>String(Ee).padStart(2,"0"),De=new Date;De.setMinutes(De.getMinutes()+5),ke.min=`${De.getFullYear()}-${dt(De.getMonth()+1)}-${dt(De.getDate())}T${dt(De.getHours())}:${dt(De.getMinutes())}`,ye?.addEventListener("click",()=>{pe="now",ye.classList.add("active"),Ve?.classList.remove("active"),Me&&(Me.style.display="none"),Ue&&(Ue.style.display="none"),_t(),le()}),Ve?.addEventListener("click",()=>{pe="scheduled",Ve.classList.add("active"),ye?.classList.remove("active"),Me&&(Me.style.display="block"),_t(),le()}),ke?.addEventListener("change",()=>{Ue&&(Ue.style.display="none"),le()}),f?.addEventListener("click",async()=>{if(pe==="scheduled"){const me=ke?.value;if(!me||new Date(me).getTime()<=Date.now()){Ue&&(Ue.style.display="block");return}}const Ee=pe==="scheduled",ae=Ee?new Date(ke.value):new Date,Ce=Ee?`Confirma o agendamento para ${ae.toLocaleString("pt-BR")} com ${S.size} leads?`:`Deseja iniciar o disparo imediato para ${S.size} leads com ${C.length} variações de mensagem?`;if(await Xe.warning(Ee?"Agendar Campanha":"Iniciar Campanha",Ce))try{f.disabled=!0,f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const me={cliente_id:e,instancia_id:A.value,nome:T?.value?.trim()||`Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,mensagens:C,total_leads:S.size,lead_ids:Array.from(S),enviados:0,falhas:0,status:"agendada",agendamento_imediato:!Ee,data_agendamento:ge.fromDate(ae),data_inicio:null,config:{delay_min:parseInt(document.getElementById("delay-min").value||"20"),delay_max:parseInt(document.getElementById("delay-max").value||"60")}};await F.create("campanhas",me),V.success(Ee?"Campanha agendada com sucesso!":"Campanha criada! O disparo será iniciado em instantes."),window.location.reload()}catch(me){V.error("Erro ao salvar campanha: "+me),f.disabled=!1,_t()}}),se(),ce()}function M(){document.querySelectorAll(".view-details").forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.id,C=s.find(T=>T.id===$);C&&D(C)})}),document.querySelectorAll(".cancel-campaign").forEach(S=>{S.addEventListener("click",async()=>{const $=S.dataset.id;if(!s.find(A=>A.id===$))return;if(await Xe.danger("Cancelar Campanha","Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito."))try{await F.update("campanhas",$,{status:"cancelada"}),V.success("Campanha cancelada com sucesso.")}catch(A){V.error("Erro ao cancelar a campanha."),console.error("Erro ao cancelar campanha:",A)}})});const v=document.getElementById("close-detail-modal"),k=document.getElementById("campaign-detail-modal");v?.addEventListener("click",()=>k?.classList.add("hidden"))}function D(v){const k=document.getElementById("campaign-detail-modal"),S=document.getElementById("campaign-detail-content");if(!k||!S)return;const $=v.total_leads>0?Math.round((v.enviados+v.falhas)/v.total_leads*100):0;S.innerHTML=`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
                <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    <i class="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                    <h3 style="margin: 0;">${v.nome||"Detalhes da Campanha"}</h3>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Iniciada em ${new Date(v.data_inicio.seconds*1e3).toLocaleString()}</p>
                </div>
            </div>

            <div class="lead-info-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Público Total</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${v.total_leads}</div>
                </div>
                <div class="card" style="background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #22c55e; text-transform: uppercase; margin-bottom: 0.5rem;">Sucesso</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">${v.enviados}</div>
                </div>
                <div class="card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #ef4444; text-transform: uppercase; margin-bottom: 0.5rem;">Falhas</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${v.falhas}</div>
                </div>
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Status</div>
                    <span class="badge ${v.status==="finalizada"?"success":"warning"}" style="font-size: 0.8rem;">${v.status.toUpperCase()}</span>
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
                    <span class="badge secondary" style="font-size: 0.75rem; margin-left: 4px;">${(v.mensagens||[v.mensagem]).filter(Boolean).length}</span>
                </div>
                ${(v.mensagens?.length?v.mensagens:v.mensagem?[v.mensagem]:["(sem mensagem)"]).map((C,T)=>`
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
        `,k.classList.remove("hidden")}},Ii={agendado:{label:"Agendado",color:"#6366f1",icon:"fa-clock"},confirmado:{label:"Confirmado",color:"#10b981",icon:"fa-circle-check"},concluido:{label:"Concluído",color:"#64748b",icon:"fa-flag-checkered"},cancelado:{label:"Cancelado",color:"#ef4444",icon:"fa-ban"}},Rt=n=>String(n).padStart(2,"0"),oa=n=>{const[e,t,i]=n.split("-");return`${i}/${t}/${e}`},la=n=>n?.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})??"R$ 0,00",ca=()=>{const n=new Date;return`${n.getFullYear()}-${Rt(n.getMonth()+1)}-${Rt(n.getDate())}`},kx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await F.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;const s=(await F.getAll("products",{field:"companyId",operator:"==",value:e})).filter(g=>g.active!==!1),o=await F.getAll("clientes",{field:"companyId",operator:"==",value:e});o.sort((g,w)=>(g.nome||"").localeCompare(w.nome||""));let l=await F.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),c=ca(),u="day";const h=g=>{const w=new Date(g+"T12:00:00"),L=w.getDay(),P=new Date(w);return P.setDate(w.getDate()-((L===0?7:L)-1)),Array.from({length:7},(K,j)=>{const Q=new Date(P);return Q.setDate(P.getDate()+j),`${Q.getFullYear()}-${Rt(Q.getMonth()+1)}-${Rt(Q.getDate())}`})},_=g=>l.filter(w=>w.date===g).sort((w,L)=>w.time.localeCompare(L.time)),b=g=>l.filter(w=>g.includes(w.date)).sort((w,L)=>w.date.localeCompare(L.date)||w.time.localeCompare(L.time)),R=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],M=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],D=g=>{const w=new Date(g+"T12:00:00");return R[w.getDay()]},v=g=>{const w=new Date(g+"T12:00:00");return`${M[w.getMonth()]} ${w.getFullYear()}`},k=g=>{const w=Ii[g]||Ii.agendado;return`<span class="sched-badge" style="background:${w.color}22;color:${w.color};border-color:${w.color}44;">
            <i class="fa-solid ${w.icon}"></i> ${w.label}
        </span>`},S=g=>{const w=Ii[g.status]||Ii.agendado;return`
        <div class="sched-card" data-id="${g.id}" style="border-left-color: ${w.color};">
            <div class="sched-card-time">
                <span class="sched-time">${g.time}</span>
                <span class="sched-duration">${g.duration||30}min</span>
            </div>
            <div class="sched-card-body">
                <div class="sched-client">
                    <i class="fa-solid fa-user"></i>
                    <strong>${g.clientName}</strong>
                    <span class="sched-phone"><i class="fa-brands fa-whatsapp"></i> ${g.clientPhone}</span>
                </div>
                <div class="sched-service">
                    <i class="fa-solid fa-list-check"></i>
                    <span>${g.serviceName}</span>
                    <span class="sched-price">${la(g.servicePrice)}</span>
                </div>
                ${g.notes?`<div class="sched-notes"><i class="fa-solid fa-note-sticky"></i> ${g.notes}</div>`:""}
                ${k(g.status)}
            </div>
            <div class="sched-card-actions">
                ${g.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${g.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                ${g.status==="confirmado"?`<button class="sched-action-btn done" onclick="window.completeAppointment('${g.id}')" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>`:""}
                <button class="sched-action-btn edit" onclick="window.editAppointment('${g.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${g.id}')" title="Cancelar/Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`},$=()=>{const g=_(c),w=g.reduce((L,P)=>L+(P.servicePrice||0),0);return`
        <div class="sched-day-header">
            <button class="sched-nav-btn" id="prev-day"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="sched-day-info">
                <span class="sched-day-name">${D(c)}</span>
                <span class="sched-day-date">${oa(c)}</span>
                <span class="sched-day-month">${v(c)}</span>
            </div>
            <button class="sched-nav-btn" id="next-day"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-stats-row">
            <div class="sched-stat"><i class="fa-solid fa-calendar-check"></i> <strong>${g.length}</strong> agendamentos</div>
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${la(w)}</strong> previsão</div>
            <div class="sched-stat"><i class="fa-solid fa-circle-check" style="color:#10b981"></i> <strong>${g.filter(L=>L.status==="confirmado").length}</strong> confirmados</div>
        </div>
        <div class="sched-appointments-list" id="appointments-list">
            ${g.length===0?`
            <div class="sched-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>Nenhum agendamento para este dia.</p>
                <button class="btn-primary" id="btn-add-for-day" style="margin-top:1rem;">
                    <i class="fa-solid fa-plus"></i> Novo Agendamento
                </button>
            </div>`:g.map(S).join("")}
        </div>`},C=()=>{const g=h(c),w=b(g);return`
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${oa(g[0])} a ${oa(g[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${g.map(L=>{const P=w.filter(Q=>Q.date===L);return`
                <div class="sched-week-col ${L===ca()?"today":""} ${L===c?"selected":""}" data-date="${L}" onclick="window.selectWeekDay('${L}')">
                    <div class="sched-week-col-header">
                        <span class="sched-wday">${D(L)}</span>
                        <span class="sched-wdate">${L.split("-")[2]}</span>
                        ${P.length>0?`<span class="sched-wcount">${P.length}</span>`:""}
                    </div>
                    <div class="sched-week-appts">
                        ${P.map(Q=>`<div class="sched-week-item" style="border-left-color:${(Ii[Q.status]||Ii.agendado).color};" onclick="event.stopPropagation(); window.editAppointment('${Q.id}')">
                                <span class="sched-wtime">${Q.time}</span>
                                <span class="sched-wclient">${Q.clientName}</span>
                            </div>`).join("")}
                    </div>
                </div>`}).join("")}
        </div>`},T=()=>{const g=[...l].sort((P,K)=>P.date.localeCompare(K.date)||P.time.localeCompare(K.time)),w=g.filter(P=>P.date>=ca()&&P.status!=="cancelado"),L=g.filter(P=>P.date<ca()||P.status==="cancelado");return`
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${w.length})</div>
            ${w.length===0?'<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>':""}
            ${w.map(P=>`
                <div class="sched-list-row">
                    <div class="sched-list-date">
                        <span>${oa(P.date)}</span>
                        <span>${P.time}</span>
                    </div>
                    <div class="sched-list-info">
                        <strong>${P.clientName}</strong>
                        <span>${P.serviceName}</span>
                    </div>
                    <div>${la(P.servicePrice)}</div>
                    <div>${k(P.status)}</div>
                    <div class="sched-list-actions">
                        ${P.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${P.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                        <button class="sched-action-btn edit" onclick="window.editAppointment('${P.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${P.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`).join("")}
        </div>
        ${L.length>0?`
        <div class="sched-list-section" style="margin-top:2rem; opacity:0.7;">
            <div class="sched-list-title"><i class="fa-solid fa-history"></i> Histórico (${L.length})</div>
            ${L.slice(0,10).map(P=>`
                <div class="sched-list-row">
                    <div class="sched-list-date"><span>${oa(P.date)}</span><span>${P.time}</span></div>
                    <div class="sched-list-info"><strong>${P.clientName}</strong><span>${P.serviceName}</span></div>
                    <div>${la(P.servicePrice)}</div>
                    <div>${k(P.status)}</div>
                    <div style="width:60px;"></div>
                </div>`).join("")}
        </div>`:""}`},A=Array.from({length:28},(g,w)=>{const L=Math.floor(w/2)+8,P=w%2===0?"00":"30";return`${Rt(L)}:${P}`}),f=`
    <div id="sched-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:560px; width:95%;">
            <span class="close-modal" id="close-sched-modal">&times;</span>
            <h2 id="sched-modal-title" style="margin-bottom:0.25rem;">Novo Agendamento</h2>
            <p class="text-muted" style="font-size:0.9rem; margin-bottom:1.5rem;">Preencha os dados do agendamento.</p>

            <div style="display:grid; gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Cliente <span style="color:#ef4444;">*</span></label>
                    <select id="sched-client-select" class="form-input">
                        <option value="">Selecione um cliente...</option>
                        ${o.map(g=>`<option value="${g.id}" data-nome="${g.nome}" data-phone="${g.telefone||""}">${g.nome}${g.telefone?" — "+g.telefone:""}</option>`).join("")}
                    </select>
                    ${o.length===0?'<p style="font-size:0.8rem;color:#f59e0b;margin-top:4px;"><i class="fa-solid fa-triangle-exclamation"></i> Nenhum cliente cadastrado. <a href="/schedule-clients" style="color:#6366f1;">Cadastrar clientes</a></p>':""}
                </div>
                <div class="form-group">
                    <label class="form-label">Serviço</label>
                    <select id="sched-service" class="form-input">
                        <option value="">Selecione um serviço...</option>
                        ${s.map(g=>`<option value="${g.id}" data-price="${g.price}" data-duration="${g.duration||30}">${g.name} — ${la(g.price)}</option>`).join("")}
                    </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" id="sched-date" class="form-input" value="${c}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Horário</label>
                        <select id="sched-time" class="form-input">
                            ${A.map(g=>`<option value="${g}">${g}</option>`).join("")}
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
    </div>`;setTimeout(()=>E(),100);const m=()=>{const g=document.getElementById("sched-view-content");g&&(u==="day"?g.innerHTML=$():u==="week"?g.innerHTML=C():g.innerHTML=T(),y())},y=()=>{document.getElementById("prev-day")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()-1),c=`${g.getFullYear()}-${Rt(g.getMonth()+1)}-${Rt(g.getDate())}`,m()}),document.getElementById("next-day")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()+1),c=`${g.getFullYear()}-${Rt(g.getMonth()+1)}-${Rt(g.getDate())}`,m()}),document.getElementById("prev-week")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()-7),c=`${g.getFullYear()}-${Rt(g.getMonth()+1)}-${Rt(g.getDate())}`,m()}),document.getElementById("next-week")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()+7),c=`${g.getFullYear()}-${Rt(g.getMonth()+1)}-${Rt(g.getDate())}`,m()}),document.getElementById("btn-add-for-day")?.addEventListener("click",()=>{x()})};function x(g){const w=document.getElementById("sched-modal");if(!w)return;const L=document.getElementById("sched-modal-title"),P=document.getElementById("sched-client-select"),K=document.getElementById("sched-service"),j=document.getElementById("sched-date"),Q=document.getElementById("sched-time"),J=document.getElementById("sched-duration"),Z=document.getElementById("sched-status"),se=document.getElementById("sched-notes"),ce=document.getElementById("save-sched-btn");if(g){L.innerText="Editar Agendamento";const le=g.clienteId||"";if(P)if(le)P.value=le;else{const pe=Array.from(P.options).find(ye=>ye.dataset.nome===g.clientName);P.value=pe?pe.value:""}K.value=g.serviceId,j.value=g.date,Q.value=g.time,J.value=String(g.duration||30),Z.value=g.status,se.value=g.notes||"",ce.setAttribute("data-edit-id",g.id)}else L.innerText="Novo Agendamento",P&&(P.value=""),K.value="",j.value=c,Q.value="09:00",J.value="30",Z.value="agendado",se.value="",ce.removeAttribute("data-edit-id");w.classList.remove("hidden")}function E(){document.getElementById("btn-new-appointment")?.addEventListener("click",()=>x()),document.getElementById("close-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("cancel-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("sched-service")?.addEventListener("change",g=>{const w=g.target,P=w.options[w.selectedIndex].dataset.duration;P&&(document.getElementById("sched-duration").value=P)}),document.getElementById("save-sched-btn")?.addEventListener("click",async()=>{const g=document.getElementById("sched-client-select"),w=document.getElementById("sched-service"),L=document.getElementById("sched-date"),P=document.getElementById("sched-time"),K=document.getElementById("sched-duration"),j=document.getElementById("sched-status"),Q=document.getElementById("sched-notes"),J=document.getElementById("save-sched-btn");if(!g.value){V.warning("Selecione um cliente.");return}if(!w.value){V.warning("Selecione um serviço.");return}if(!L.value){V.warning("Informe a data.");return}const Z=g.options[g.selectedIndex],se=g.value,ce=Z.dataset.nome||Z.text.split(" — ")[0],le=Z.dataset.phone||"",pe=w.options[w.selectedIndex],ye={serviceId:w.value,serviceName:pe.text.split(" — ")[0],servicePrice:parseFloat(pe.dataset.price||"0")},Ve={companyId:e,clienteId:se,clientName:ce,clientPhone:le,...ye,date:L.value,time:P.value,duration:parseInt(K.value)||30,status:j.value,notes:Q.value.trim()||void 0},Me=J.getAttribute("data-edit-id");J.disabled=!0,J.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(Me){await F.update("agendamentos",Me,Ve);const ke=l.findIndex(Ue=>Ue.id===Me);ke!==-1&&(l[ke]={id:Me,...Ve}),V.success("Agendamento atualizado!")}else{const ke=await F.create("agendamentos",Ve);l.push({id:ke,...Ve}),V.success("Agendamento criado com sucesso!")}document.getElementById("sched-modal")?.classList.add("hidden"),m()}catch(ke){V.error("Erro ao salvar agendamento: "+ke)}finally{J.disabled=!1,J.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.querySelectorAll(".sched-view-tab").forEach(g=>{g.addEventListener("click",()=>{document.querySelectorAll(".sched-view-tab").forEach(w=>w.classList.remove("active")),g.classList.add("active"),u=g.dataset.view,m()})}),document.getElementById("sched-date-jump")?.addEventListener("change",g=>{c=g.target.value,m()}),document.getElementById("btn-today")?.addEventListener("click",()=>{c=ca(),document.getElementById("sched-date-jump").value=c,m()}),window.editAppointment=g=>{const w=l.find(L=>L.id===g);w&&x(w)},window.confirmAppointment=async g=>{try{await F.update("agendamentos",g,{status:"confirmado"});const w=l.find(L=>L.id===g);w&&(w.status="confirmado"),m(),V.success("Agendamento confirmado!")}catch{V.error("Erro ao confirmar.")}},window.completeAppointment=async g=>{try{await F.update("agendamentos",g,{status:"concluido"});const w=l.find(L=>L.id===g);w&&(w.status="concluido"),m(),V.success("Agendamento concluído!")}catch{V.error("Erro ao concluir.")}},window.cancelAppointment=async g=>{if(await Xe.danger("Excluir Agendamento","Deseja excluir este agendamento? Esta ação não pode ser desfeita."))try{await F.delete("agendamentos",g),l=l.filter(L=>L.id!==g),m(),V.success("Agendamento excluído.")}catch{V.error("Erro ao excluir.")}},window.selectWeekDay=g=>{c=g,u="day",document.querySelectorAll(".sched-view-tab").forEach(w=>{w.classList.toggle("active",w.dataset.view==="day")}),document.getElementById("sched-date-jump").value=g,m()},m()}return`
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
        <input type="date" id="sched-date-jump" class="sched-date-jump" value="${c}" title="Ir para data">
        <button id="btn-today" class="btn-secondary" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-crosshairs"></i> Hoje
        </button>
    </div>

    <div class="card" style="padding:1.5rem;" id="sched-view-content">
        <!-- Dynamically rendered -->
    </div>

    ${f}`},Ax=n=>{if(!n)return"—";try{return new Date(n).toLocaleDateString("pt-BR")}catch{return n}},Sx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await F.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-users-slash" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;let a=await F.getAll("clientes",{field:"companyId",operator:"==",value:e});const s=await F.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),o=new Map;s.forEach(v=>{const k=v.clienteId;if(!k)return;const S=o.get(k),$=v.date||"";S?o.set(k,{count:S.count+1,ultimo:$>S.ultimo?$:S.ultimo}):o.set(k,{count:1,ultimo:$})});let l="";const c=v=>v.length===0?`
            <tr>
                <td colspan="5" style="text-align:center;padding:2.5rem;color:var(--text-muted);">
                    <i class="fa-solid fa-users-slash" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.4;"></i>
                    Nenhum cliente encontrado.
                </td>
            </tr>`:v.map(k=>{const S=o.get(k.id),$=S?.count??0,C=S?.ultimo?Ax(S.ultimo):"—",T=(k.nome||k.telefone||"C")[0].toUpperCase();return`
            <tr data-client-id="${k.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="sc-avatar">${T}</div>
                        <div>
                            <div style="font-weight:600;">${k.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${k.email||""}</div>
                        </div>
                    </div>
                </td>
                <td style="color:var(--text-muted);font-size:0.9rem;">${k.telefone||"—"}</td>
                <td style="text-align:center;">
                    <span class="sc-badge">${$}</span>
                </td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${C}</td>
                <td>
                    <div style="display:flex;gap:8px;">
                        <button class="sc-action-btn edit" title="Editar" data-edit-id="${k.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="sc-action-btn del" title="Excluir" data-del-id="${k.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),u=()=>{if(!l)return a;const v=l.toLowerCase();return a.filter(k=>(k.nome||"").toLowerCase().includes(v)||(k.telefone||"").toLowerCase().includes(v)||(k.email||"").toLowerCase().includes(v))},h=`
    <div id="sc-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" id="sc-modal-close">&times;</span>
            <h2 id="sc-modal-title" style="margin-bottom:0.25rem;">Novo Cliente</h2>
            <p class="text-muted" style="font-size:0.9rem;margin-bottom:1.5rem;">Preencha os dados do cliente.</p>
            <div style="display:grid;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Nome <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="sc-nome" class="form-input" placeholder="Nome completo do cliente">
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone / WhatsApp <span style="color:#ef4444;">*</span></label>
                    <input type="tel" id="sc-telefone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input type="email" id="sc-email" class="form-input" placeholder="cliente@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sc-obs" class="form-input" rows="3" style="resize:vertical;" placeholder="Informações extras sobre o cliente..."></textarea>
                </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="sc-modal-cancel">Cancelar</button>
                <button class="btn-primary" id="sc-save-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>D(),100);function _(v){const k=document.getElementById("sc-modal");if(!k)return;const S=document.getElementById("sc-modal-title"),$=document.getElementById("sc-nome"),C=document.getElementById("sc-telefone"),T=document.getElementById("sc-email"),A=document.getElementById("sc-obs"),f=document.getElementById("sc-save-btn");v?(S.textContent="Editar Cliente",$.value=v.nome||"",C.value=v.telefone||"",T.value=v.email||"",A.value=v.observacoes||"",f.setAttribute("data-edit-id",v.id)):(S.textContent="Novo Cliente",$.value="",C.value="",T.value="",A.value="",f.removeAttribute("data-edit-id")),k.classList.remove("hidden"),$.focus()}function b(){document.getElementById("sc-modal")?.classList.add("hidden")}const R=()=>{const v=document.getElementById("sc-tbody");v&&(v.innerHTML=c(u())),M()};function M(){document.querySelectorAll(".sc-action-btn.edit").forEach(v=>{v.addEventListener("click",()=>{const k=v.dataset.editId,S=a.find($=>$.id===k);S&&_(S)})}),document.querySelectorAll(".sc-action-btn.del").forEach(v=>{v.addEventListener("click",async()=>{const k=v.dataset.delId,S=a.find(C=>C.id===k);if(await Xe.danger("Excluir Cliente",`Deseja excluir o cliente "${S?.nome||k}"? Esta ação não pode ser desfeita.`))try{await F.delete("clientes",k),a=a.filter(C=>C.id!==k),R(),V.success("Cliente excluído.")}catch{V.error("Erro ao excluir cliente.")}})})}function D(){document.getElementById("btn-new-client")?.addEventListener("click",()=>_()),document.getElementById("sc-modal-close")?.addEventListener("click",b),document.getElementById("sc-modal-cancel")?.addEventListener("click",b),document.getElementById("sc-modal")?.addEventListener("click",v=>{v.target===document.getElementById("sc-modal")&&b()}),document.getElementById("sc-search")?.addEventListener("input",v=>{l=v.target.value,R()}),document.getElementById("sc-save-btn")?.addEventListener("click",async()=>{const v=document.getElementById("sc-nome"),k=document.getElementById("sc-telefone"),S=document.getElementById("sc-email"),$=document.getElementById("sc-obs"),C=document.getElementById("sc-save-btn"),T=v.value.trim(),A=k.value.trim().replace(/\D/g,"");if(!T){V.warning("Informe o nome do cliente.");return}if(!A){V.warning("Informe o telefone do cliente.");return}const f={companyId:e,nome:T,telefone:A,email:S.value.trim()||"",observacoes:$.value.trim()||"",criadoEm:new Date().toISOString()},m=C.getAttribute("data-edit-id");C.disabled=!0,C.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(m){await F.update("clientes",m,f);const y=a.findIndex(x=>x.id===m);y!==-1&&(a[y]={id:m,...f}),V.success("Cliente atualizado!")}else{const y=await F.create("clientes",f);a.push({id:y,...f}),V.success("Cliente criado com sucesso!")}b(),R()}catch(y){V.error("Erro ao salvar cliente: "+y)}finally{C.disabled=!1,C.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),R()}return`
    <style>
        .sc-avatar {
            width: 38px; height: 38px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            color: #fff; font-weight: 800; font-size: 1rem;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sc-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: rgba(99,102,241,0.12); color: #6366f1;
            border: 1px solid rgba(99,102,241,0.25);
            border-radius: 20px; padding: 2px 10px;
            font-size: 0.8rem; font-weight: 700;
        }
        .sc-action-btn {
            width: 32px; height: 32px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; transition: all 0.2s;
            border: 1px solid var(--border-color);
            background: var(--surface-hover);
            color: var(--text-muted);
            cursor: pointer;
        }
        .sc-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sc-action-btn.del:hover  { background:#ef444422; color:#ef4444; border-color:#ef4444; }
        .sc-search-wrap {
            position: relative; flex: 1; min-width: 200px; max-width: 360px;
        }
        .sc-search-wrap i {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            color: var(--text-dim); font-size: 0.85rem;
        }
        .sc-search-input {
            width: 100%; padding: 8px 12px 8px 36px;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; color: var(--text-main); font-size: 0.9rem;
        }
        .sc-search-input:focus { outline: none; border-color: var(--primary); }
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-users" style="color:var(--primary);margin-right:10px;"></i>Clientes
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os clientes cadastrados para agendamento.</p>
        </div>
        <button id="btn-new-client" class="btn-primary">
            <i class="fa-solid fa-user-plus"></i> Novo Cliente
        </button>
    </div>

    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
            <div class="sc-search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="sc-search" class="sc-search-input" placeholder="Buscar por nome, telefone ou e-mail...">
            </div>
            <span id="sc-count" style="color:var(--text-dim);font-size:0.85rem;margin-left:auto;">
                ${a.length} cliente${a.length!==1?"s":""}
            </span>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th style="text-align:center;">Agendamentos</th>
                        <th>Último Agend.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="sc-tbody">
                    <!-- preenchido via JS -->
                </tbody>
            </table>
        </div>
    </div>

    ${h}`},Cx=async()=>{let n={atendimento:"",agendamento:"",venda:"",disparo:""};try{const t=await F.get("settings","webhooks");t&&(n={...n,...t})}catch(t){console.error("Error loading webhooks:",t)}const e=`
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
    `;return setTimeout(()=>{const t=document.getElementById("webhooks-form");t&&(t.onsubmit=async i=>{i.preventDefault();const a=t.querySelector('button[type="submit"]');a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';const s={atendimento:document.getElementById("webhook-atendimento").value,agendamento:document.getElementById("webhook-agendamento").value,venda:document.getElementById("webhook-venda").value,disparo:document.getElementById("webhook-disparo").value,updatedAt:new Date};try{await F.set("settings","webhooks",s),V.success("Webhooks atualizados com sucesso!")}catch(o){console.error("Error saving webhooks:",o),V.error("Erro ao salvar configurações.")}finally{a.disabled=!1,a.innerHTML='<i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações'}})},100),e},Px=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await F.get("companies",n.companyId),i=t?.mercadoPagoToken||"",a=t?.userIdMercadoPago||"";return window.disconnectMercadoPago=async()=>{if(!await Xe.danger("Desativar Integração","Tem certeza que deseja desativar o Mercado Pago? Isso removerá seu token de acesso."))return;const o=document.getElementById("btn-disconnect-mp");o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await F.update("companies",n.companyId,{mercadoPagoToken:null,userIdMercadoPago:null}),V.success("Integração desativada."),setTimeout(()=>window.location.reload(),1e3)}catch(l){V.error("Erro ao desativar: "+l.message),o.disabled=!1,o.innerHTML='<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>'}},window.connectMercadoPago=async()=>{const s=document.getElementById("mp-token-input"),o=document.getElementById("btn-connect-mp"),l=s.value.trim();if(!l){V.warning("Por favor, insira o Access Token primeiro.");return}o.disabled=!0;const c=o.innerHTML;o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';try{if(await F.update("companies",n.companyId,{mercadoPagoToken:l}),!(await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-userId-mercadopago",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:l,companyId:n.companyId})})).ok)throw new Error("Falha ao processar a conexão via servidor.");V.success("Integração processada com sucesso!"),setTimeout(()=>{window.location.reload()},1500)}catch(u){console.error(u),V.error("Erro na conexão: "+u.message)}finally{o.disabled=!1,o.innerHTML=c}},`
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
                           value="${a}" 
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
    `},iu=async n=>{try{const e=await F.getAll("loja_config",{field:"lojaId",operator:"==",value:n});let t=e[0]?.empresaId,i=null,a=null;if(t&&(i=await F.get("companies",t),i&&(a=i.stores?.find(B=>B.id===n))),!a){const B=await F.getAll("companies");for(const N of B){const z=N.stores?.find(G=>G.id===n);if(z){i=N,a=z;break}}}if(!i||!a)return`
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;const o=(i.modulos_ativos||[]).includes("venda_catalogo"),l=await F.getAll("products",{field:"companyId",operator:"==",value:i.id}),c=await F.getAll("categories",{field:"companyId",operator:"==",value:i.id}),u=e[0]||{},h=u.design||{},_=h.primaryColor||"#6366f1",b=h.secondaryColor||"#0f172a",R=h.textColor||"#ffffff",M=h.priceColor||"#ffffff",D=h.logoUrl||"",v=h.pixKey||"",k=(B,N,z)=>{if(typeof document>"u")return;if(document.title=B,[{name:"description",content:N},{property:"og:title",content:B},{property:"og:description",content:N},{property:"og:image",content:z},{property:"og:type",content:"website"},{property:"og:url",content:window.location.href},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:B},{name:"twitter:description",content:N},{name:"twitter:image",content:z}].forEach(W=>{const te=W.name?`meta[name="${W.name}"]`:`meta[property="${W.property}"]`;let ne=document.querySelector(te);ne||(ne=document.createElement("meta"),W.name&&ne.setAttribute("name",W.name),W.property&&ne.setAttribute("property",W.property),document.head.appendChild(ne)),ne.setAttribute("content",W.content)}),D){let W=document.querySelector("link[rel~='icon']");W||(W=document.createElement("link"),W.rel="icon",document.head.appendChild(W)),W.href=D}},S=a.name||"Catálogo",$=h.metaDescription||`Confira os produtos de ${S} em nosso catálogo digital.`,C=h.logoUrl||window.location.origin+"/logo.png";k(S,$,C),console.log(`[Catalog] Meta tags updated for: ${S}`);let T=h.whatsapp||"";if(!T)try{if(a.instancia_id){const B=await F.get("instancias",a.instancia_id);B?.numero&&(T=B.numero.replace(/\D/g,""))}}catch(B){console.warn("Could not fetch instance details:",B)}const A=!!i.mercadoPagoToken&&u.mercadoPagoActive!==!1,f=l.filter(B=>B.active!==!1&&(B.storeIds?.includes(n)||B.storeId===n)).sort((B,N)=>(B.name||"").localeCompare(N.name||"")),m=f.filter(B=>B.promotionalActive),y=h.themeId||"classico",x=h.bannerUrl||"",E=h.bannerMobileUrl||"",g=c.map(B=>({...B,products:f.filter(N=>N.categoryId===B.id)})).filter(B=>B.products.length>0).sort((B,N)=>(B.name||"").localeCompare(N.name||"")),w=f.filter(B=>!B.categoryId||!c.find(N=>N.id===B.categoryId)),L=B=>B.imageUrl?B.imageUrl:B.imagemPath&&B.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(B.imagemPath)}?alt=media&token=${B.downloadToken}`:"https://via.placeholder.com/300?text=Sem+Imagem";let P=new Map;try{const B=localStorage.getItem(`cat_cart_${n}`);B&&(P=new Map(JSON.parse(B)))}catch{}const K=u?.bairrosEntrega||[],j=[];K&&Array.isArray(K)&&(K.forEach(B=>{(B.bairros||"").split(",").map(z=>z.trim()).filter(Boolean).forEach(z=>j.push({nome:z,preco:parseFloat(B.preco)||0}))}),j.sort((B,N)=>B.nome.localeCompare(N.nome)));const Q=u?.cupons||[],J=`cat_user_${i.id}`,Z=JSON.parse(localStorage.getItem(J)||"{}");let se=null;const ce=()=>{let B=0;return P.forEach(({product:N,qty:z})=>{const G=N.promotionalActive&&N.promotionalPrice||N.price;B+=G*z}),B},le=()=>window.catDeliveryType==="retirada"?0:window.catTaxaBairro||0,pe=()=>window.catDeliveryType==="retirada"?"Retirada":window.catSelectedBairro?`Entrega (${window.catSelectedBairro})`:"Taxa de Entrega",ye=B=>se?se.tipo==="percent"?B*se.desconto/100:se.desconto:0,Ve=()=>{const B=ce();return B+le()-ye(B)},Me=()=>{if(P.size===0)return'<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';let B="";return P.forEach(({product:N,qty:z},G)=>{const W=N.promotionalActive&&N.promotionalPrice||N.price;B+=`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${N.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${W.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${G}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${z}</span>
                        <button onclick="window.catQtyChange('${G}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${G}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`}),B},ke=()=>{const B=ce(),N=le(),z=ye(B),G=B+N-z;let W="";return P.forEach(({product:te,qty:ne})=>{const be=te.promotionalActive&&te.promotionalPrice||te.price;W+=`<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${ne}x ${te.name}</span><span>R$ ${(be*ne).toFixed(2)}</span></div>`}),N>0&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${pe()}</span><span>+ R$ ${N.toFixed(2)}</span></div>`),z>0&&se&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${se.codigo}</span><span>- R$ ${z.toFixed(2)}</span></div>`),W+=`<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${G.toFixed(2)}</span></div>`,W},Ue={dom:"Domingo",seg:"Segunda-feira",ter:"Terça-feira",qua:"Quarta-feira",qui:"Quinta-feira",sex:"Sexta-feira",sab:"Sábado"},_t=()=>["dom","seg","ter","qua","qui","sex","sab"][new Date().getDay()],dt=B=>{const N=u.horario_funcionamento?.[B]||a.horarios?.[B]||{};return{ativo:N.ativo??N.aberto??B!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},De=B=>{const N=u.horario_entrega?.[B]||a.horario_entrega?.[B]||{};return console.log(N),{ativo:N.ativo??N.aberto??B!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},ae=(()=>{const B=_t(),N=De(B);if(!N.ativo)return!1;const z=new Date,G=z.getHours()*60+z.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number);return G>=W*60+te&&G<=ne*60+be})(),Ce=()=>{const B=_t(),N=dt(B);if(!N.ativo)return!1;const z=new Date,G=z.getHours()*60+z.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number);return G>=W*60+te&&G<=ne*60+be},Fe=()=>{const B=["dom","seg","ter","qua","qui","sex","sab"],N=new Date().getDay(),z=new Date,G=z.getHours()*60+z.getMinutes(),W=B[N],te=dt(W);if(te.ativo){const[ne,be]=te.inicio.split(":").map(Number),qe=ne*60+be;if(G<qe)return`Hoje às ${te.inicio}`}for(let ne=1;ne<=7;ne++){const be=(N+ne)%7,qe=B[be],He=dt(qe);if(He.ativo)return ne===1?`Amanhã às ${He.inicio}`:`${Ue[qe]} às ${He.inicio}`}return"em breve"},me=Ce(),rt=()=>{const B=_t(),N=dt(B);if(!N.ativo)return'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';const z=new Date,G=z.getHours()*60+z.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number),qe=W*60+te,He=ne*60+be;return G>=qe&&G<=He?`<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${N.fim}</span>`:G<qe?`<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${N.inicio}</span>`:'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>'},fe=()=>{let B="";return["dom","seg","ter","qua","qui","sex","sab"].forEach(N=>{const z=dt(N);z.ativo?B+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Ue[N]}</span><span style="font-weight:600;">${z.inicio} às ${z.fim}</span></div>`:B+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Ue[N]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`}),B},ve=()=>{const B=document.getElementById("cart-badge"),N=document.getElementById("cart-total"),z=document.getElementById("cart-items"),G=document.getElementById("cart-float-btn"),W=document.getElementById("cart-total-float"),te=document.getElementById("cart-badge-float");try{localStorage.setItem(`cat_cart_${n}`,JSON.stringify(Array.from(P.entries())))}catch{}let ne=0;P.forEach(({qty:be})=>ne+=be),B&&(B.textContent=ne.toString()),te&&(te.textContent=ne.toString()),G&&(G.style.display=ne>0?"flex":"none"),N&&(N.textContent=`R$ ${Ve().toFixed(2)}`),W&&(W.textContent=`R$ ${Ve().toFixed(2).replace(".",",")}`),z&&(z.innerHTML=Me())};window.openStoreInfo=()=>it("store-info-modal"),window.closeStoreInfo=()=>je("store-info-modal"),window.catInit=()=>{const B=document.getElementById("checkout-name"),N=document.getElementById("checkout-phone"),z=document.getElementById("checkout-address");B&&Z.name&&(B.value=Z.name),N&&Z.phone&&(N.value=Z.phone),z&&Z.address&&(z.value=Z.address),N&&N.addEventListener("input",G=>{let W=G.target.value.replace(/\D/g,"");W.length>11&&(W=W.slice(0,11)),G.target.value=W})},setTimeout(()=>window.catInit(),500);const it=B=>{const N=document.getElementById(B);N&&(N.style.display="flex")},je=B=>{const N=document.getElementById(B);N&&(N.style.display="none")};if(o){window.showClosedAlert=N=>{const z=document.getElementById("closed-alert-title"),G=document.getElementById("closed-alert-desc"),W=document.getElementById("closed-alert-time-section"),te=document.getElementById("next-open-time"),ne=document.getElementById("closed-alert-icon");N==="store"?(z&&(z.textContent="Loja Fechada"),G&&(G.textContent="No momento não estamos aceitando pedidos."),W&&(W.style.display="block"),te&&(te.textContent=Fe()),ne&&(ne.className="fa-solid fa-store-slash")):N==="delivery"&&(z&&(z.textContent="Entrega Desativada"),G&&(G.textContent="O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível."),W&&(W.style.display="none"),ne&&(ne.className="fa-solid fa-motorcycle")),it("closed-alert-modal")},window.catAddToCart=N=>{const z=f.find(ne=>ne.id===N);if(!z||z.stock===0)return;const G=P.get(N),W=z.stock??1/0;if((G?.qty||0)>=W){alert(`Estoque máximo atingido (${z.stock} un.)`);return}P.set(N,{product:z,qty:(G?.qty||0)+1}),ve();const te=document.getElementById(`btn-add-${N}`);te&&(te.textContent="✓ Adicionado",setTimeout(()=>{te&&(te.textContent="+ Adicionar")},1e3))},window.catQtyChange=(N,z)=>{const G=P.get(N);if(!G)return;const W=G.qty+z;W<=0?P.delete(N):G.qty=Math.min(W,G.product.stock??1/0),ve()},window.catRemoveItem=N=>{P.delete(N),ve()},window.openCart=()=>{ve(),it("cart-modal")},window.closeCart=()=>je("cart-modal"),window.goToDelivery=async()=>{if(P.size===0)return;if(!me){window.showClosedAlert("store");return}const N=document.getElementById("btn-go-delivery");N&&(N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Verificando...');let z=!1;for(const[G,{product:W,qty:te}]of Array.from(P.entries()))try{const ne=await F.get("products",G);if(!ne||ne.active===!1||ne.stock!=null&&ne.stock<te){z=!0,alert(`O produto "${W.name}" não possui quantidade suficiente em estoque ou está indisponível.`);break}}catch{}N&&(N.innerHTML='<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido'),!z&&(je("cart-modal"),it("delivery-modal"))},window.closeDelivery=()=>je("delivery-modal"),window.selectDelivery=N=>{window.catDeliveryType=N,document.querySelectorAll(".delivery-card").forEach(W=>{W.style.borderColor="rgba(255,255,255,0.1)",W.style.background="transparent"});const z=document.getElementById(`delivery-card-${N}`);z&&(z.style.borderColor="#6366f1",z.style.background="rgba(99,102,241,0.08)");const G=document.getElementById("btn-go-customer");G&&(G.disabled=!1,G.style.opacity="1",G.style.cursor="pointer")},window.goToCustomer=()=>{const N=window.catDeliveryType;if(!N)return;if(N==="entrega"&&!ae){window.showClosedAlert("delivery");return}je("delivery-modal");const z=document.getElementById("address-group");z&&(z.style.display=N==="entrega"?"block":"none"),it("customer-modal")},window.closeCustomer=()=>je("customer-modal"),window.catFilterBairros=N=>{const z=document.getElementById("checkout-bairro-dropdown");if(!z)return;const G=N?j.filter(W=>W.nome.toLowerCase().includes(N.toLowerCase())):j;G.length===0?z.innerHTML='<div style="padding:12px;color:#ef4444;font-size:0.85rem;">Nenhum bairro encontrado</div>':z.innerHTML=G.map(W=>`<div onclick="window.catSelectBairro('${W.nome.replace(/'/g,"\\'")}', ${W.preco})" style="padding:12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);color:white;font-size:0.9rem;">${W.nome} - R$ ${W.preco.toFixed(2)}</div>`).join(""),z.style.display="block"},window.catSelectBairro=(N,z)=>{const G=document.getElementById("checkout-bairro");G&&(G.value=N,G.dataset.preco=z.toString());const W=document.getElementById("checkout-bairro-dropdown");W&&(W.style.display="none")},document.addEventListener("click",N=>{if(!N.target.closest("#bairro-input-wrapper")){const z=document.getElementById("checkout-bairro-dropdown");z&&(z.style.display="none")}}),window.goToPayment=()=>{const N=document.getElementById("checkout-name")?.value.trim(),z=document.getElementById("checkout-phone")?.value.trim(),G=document.getElementById("checkout-address")?.value.trim(),W=window.catDeliveryType;let te="",ne=0;if(W==="entrega"&&j.length>0){const mt=document.getElementById("checkout-bairro");if(!mt||!mt.value.trim()){alert("Selecione ou digite seu bairro para entrega.");return}te=mt.value.trim();const Pe=j.find(Re=>Re.nome.toLowerCase()===te.toLowerCase());if(!Pe){alert("Bairro selecionado não encontrado na lista. Por favor, escolha uma opção listada.");return}te=Pe.nome,ne=Pe.preco}if(!N||!z){alert("Preencha nome e telefone.");return}if(z.length<10){alert("Telefone inválido. Use o formato DD000000000");return}if(W==="entrega"&&!G){alert("Preencha o endereço de entrega completo.");return}window.catSelectedBairro=te,window.catTaxaBairro=ne;const be={name:N,phone:z,address:G||"",bairro:te};window.catCustomer=be,localStorage.setItem(J,JSON.stringify(be)),je("customer-modal");const qe=document.getElementById("payment-order-summary");qe&&(qe.innerHTML=ke());const He=document.getElementById("cat-coupon-section");He&&(He.style.display=Q.length>0?"block":"none");const Et=document.getElementById("btn-pay-delivery"),Tt=document.getElementById("btn-pay-pix-manual"),Ct=document.getElementById("btn-pay-pix-mp"),Te=document.getElementById("mandatory-pay-msg"),Nt=u?.pagamentoObrigatorioRetirada===!0;Et&&(W==="retirada"&&Nt?Et.style.display="none":Et.style.display="flex"),Te&&(Te.style.display=W==="retirada"&&Nt?"block":"none"),Tt&&(Tt.style.display=v?"flex":"none"),Ct&&(Ct.style.display=A?"flex":"none"),it("payment-modal")},window.closePayment=()=>je("payment-modal"),window.catApplyCoupon=()=>{const N=(document.getElementById("cat-coupon-input")?.value||"").trim().toUpperCase(),z=Q.find(be=>be.codigo===N&&be.ativo!==!1),G=ce(),W=document.getElementById("cat-coupon-msg");if(!z){W&&(W.textContent="Cupom inválido ou expirado.",W.style.color="#ef4444");return}if(z.valorMinimo>0&&G<z.valorMinimo){W&&(W.textContent=`Gasto mínimo de R$ ${z.valorMinimo.toFixed(2)} necessário.`,W.style.color="#ef4444");return}se=z;const te=ye(G);W&&(W.textContent=`✓ Cupom aplicado! Desconto: R$ ${te.toFixed(2)}`,W.style.color="#10b981");const ne=document.getElementById("payment-order-summary");ne&&(ne.innerHTML=ke())},window.catToggleCoupon=()=>{const N=document.getElementById("cat-coupon-input-wrapper"),z=document.getElementById("cat-coupon-toggle-label");if(N){const G=N.style.display==="block";N.style.display=G?"none":"block",z&&(z.textContent=G?"Tenho um cupom de desconto":"Ocultar cupom")}},window.catFilterClassic=N=>{document.querySelectorAll(".cat-selector-item").forEach(G=>{const W=G.getAttribute("onclick")||"";G.classList.toggle("active",W.includes("'"+N+"'"))});const z=document.getElementById("classic-promo-section");N==="all"?(z&&(z.style.display=m.length>0?"block":"none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="block")):N==="promo"?(z&&(z.style.display="block"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="none")):(z&&(z.style.display="none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>{G.style.display=G.dataset.classicCat===N?"block":"none"}))},window.catFilterCat=N=>{document.querySelectorAll(".cat-sidebar-link").forEach(W=>{W.classList.remove("active"),W.setAttribute("aria-pressed","false")});const z=document.querySelector(`.cat-sidebar-link[onclick*="'${N}'"]`);z&&(z.classList.add("active"),z.setAttribute("aria-pressed","true"));const G=N==="all";document.querySelectorAll("[data-catgroup]").forEach(W=>{W.style.display=G||W.dataset.catgroup===N?"":"none"})},window.catSearch=N=>{N=N.trim().toLowerCase(),document.querySelectorAll("[data-catgroup]").forEach(z=>{z.style.display=""}),N&&document.querySelectorAll(".product-card").forEach(z=>{const G=(z.querySelector("h3")?.textContent||"").toLowerCase();z.style.display=G.includes(N)?"":"none"})};const B=async(N,z)=>{const G=z.replace(/\D/g,"");let te=(await F.getAll("leads",[{field:"empresaId",operator:"==",value:i.id},{field:"whatsapp",operator:"==",value:G}]))[0];return te||(te=(await F.getAll("leads",[{field:"empresaId",operator:"==",value:i.id},{field:"telefone",operator:"==",value:G}]))[0]),te?(te.statusLead!=="cliente_ativo"&&await F.update("leads",te.id,{statusLead:"cliente_ativo"}),te.id):await F.create("leads",{nome:N,telefone:G,whatsapp:G,empresaId:i.id,lojaId:n,origem:"catalogo",statusLead:"cliente_ativo",criadoEm:new Date().toISOString()})};window.confirmOrderDelivery=async()=>{const N=document.getElementById("btn-pay-delivery");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...');try{const z=window.catCustomer;if(!z||!z.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),je("payment-modal"),je("pix-manual-modal"),it("customer-modal");return}const{name:G,phone:W,address:te}=z,ne=window.catDeliveryType,be=Array.from(P.entries()).map(([Re,{product:We,qty:$e}])=>{const ft=We.promotionalActive&&We.promotionalPrice||We.price;return{productId:Re,name:We.name,qty:$e,price:ft,subtotal:ft*$e}});for(const[Re,{qty:We}]of Array.from(P.entries())){const $e=f.find(ft=>ft.id===Re);$e&&$e.stock!=null&&await F.update("products",Re,{stock:Math.max(0,$e.stock-We)})}const qe=ce(),He=le(),Et=ye(qe),Tt=qe+He-Et,Ct=await B(G,W),Te=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:G,clientPhone:W,endereco:te,entrega:ne,leadId:Ct,nome:G,items:be,total:Tt,taxaAplicada:He,taxaNome:pe(),desconto:Et,codigoCupom:se?.codigo||null,paymentMethod:"na_entrega",pagamento:"na_entrega",status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()});try{console.log("Order created silently, waiting for operator approval.",Te)}catch(Re){console.error("Error in order creation log:",Re)}P.clear(),se=null,je("payment-modal"),ve();const Nt=document.getElementById("confirmation-modal"),mt=document.getElementById("order-id-display"),Pe=document.getElementById("pix-info-section");Nt&&(Nt.style.display="flex"),mt&&(mt.textContent=Te.slice(0,8).toUpperCase()),Pe&&(Pe.style.display="none"),ve()}catch(z){console.error("Confirm Order Delivery Error:",z),alert("Erro ao processar pedido: "+(z.message||"Erro desconhecido")+". Por favor, tente novamente ou fale com a loja."),N&&(N.disabled=!1,N.innerHTML="🤝 Pagar na Entrega / Retirada")}},window.showPixManual=()=>{je("payment-modal");const N=document.getElementById("pix-manual-summary");N&&(N.innerHTML=ke());const z=document.getElementById("pix-key-value");z&&(z.textContent=v),it("pix-manual-modal")},window.closePixManual=()=>je("pix-manual-modal"),window.copyPixKey=()=>{navigator.clipboard.writeText(v).then(()=>{const N=document.getElementById("btn-copy-pix");N&&(N.textContent="✓ Copiado!",setTimeout(()=>{N.textContent="Copiar"},2e3))})},window.confirmPixManual=async()=>{const N=document.getElementById("btn-confirm-pix-manual");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...');try{const z=window.catCustomer;if(!z||!z.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),je("payment-modal"),je("pix-manual-modal"),it("customer-modal");return}const{name:G,phone:W,address:te}=z,ne=window.catDeliveryType,be=Array.from(P.entries()).map(([$e,{product:ft,qty:Gt}])=>{const Mt=ft.promotionalActive&&ft.promotionalPrice||ft.price;return{productId:$e,name:ft.name,qty:Gt,price:Mt,subtotal:Mt*Gt}});let qe="";const He=document.getElementById("pix-comprovante-input");if(He?.files?.[0]){const $e=He.files[0],ft=Date.now(),Gt=`comprovantes/${i.id}/${ft}_${$e.name}`,Mt=un(pn,Gt);await Ni(Mt,$e),qe=await oi(Mt)}for(const[$e,{qty:ft}]of Array.from(P.entries())){const Gt=f.find(Mt=>Mt.id===$e);Gt&&Gt.stock!=null&&await F.update("products",$e,{stock:Math.max(0,Gt.stock-ft)})}const Et=ce(),Tt=le(),Ct=ye(Et),Te=Et+Tt-Ct,Nt=await B(G,W),mt=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:G,clientPhone:W,endereco:te,entrega:ne,leadId:Nt,nome:G,items:be,total:Te,taxaAplicada:Tt,taxaNome:pe(),desconto:Ct,codigoCupom:se?.codigo||null,paymentMethod:"pix_manual",pagamento:"pagamento_no_pix",comprovanteUrl:qe,status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()});P.clear(),se=null,je("pix-manual-modal"),ve();const Pe=document.getElementById("confirmation-modal"),Re=document.getElementById("order-id-display");Pe&&(Pe.style.display="flex"),Re&&(Re.textContent=mt.slice(0,8).toUpperCase());const We=document.getElementById("pix-info-section");We&&(We.style.display="none"),ve()}catch(z){console.error("Confirm Pix Manual Error:",z),alert("Erro ao confirmar pedido: "+(z.message||"Erro de conexão/permissão")+". Tente novamente."),N&&(N.disabled=!1,N.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}},window.confirmPixMercadoPago=async()=>{const N=document.getElementById("btn-pay-pix-mp");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...');try{const{name:z,phone:G,address:W}=window.catCustomer,te=window.catDeliveryType,ne=Array.from(P.entries()).map(([Pe,{product:Re,qty:We}])=>{const $e=Re.promotionalActive&&Re.promotionalPrice||Re.price;return{productId:Pe,name:Re.name,qty:We,price:$e,subtotal:$e*We}}),be=ce(),qe=le(),He=ye(be),Et=be+qe-He,Ct=await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-pix-catalog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:i.id,storeId:n,items:ne,total:Et,clientName:z,clientPhone:G,accessToken:i.mercadoPagoToken})}),Te=Ct.ok?await Ct.json():null;for(const[Pe,{qty:Re}]of Array.from(P.entries())){const We=f.find($e=>$e.id===Pe);We&&We.stock!=null&&await F.update("products",Pe,{stock:Math.max(0,We.stock-Re)})}const Nt=await B(z,G),mt=await F.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:z,clientPhone:G,endereco:W,entrega:te,leadId:Nt,nome:z,items:ne,total:Et,taxaAplicada:qe,taxaNome:pe(),desconto:He,codigoCupom:se?.codigo||null,paymentMethod:"pix_mercadopago",pagamento:"pagamento_no_pix",mpPaymentId:Te?.payment_id||"",status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()});if(P.clear(),se=null,je("payment-modal"),ve(),Te?.qr_code_base64||Te?.qr_code_text){const Pe=document.getElementById("mp-qr-img"),Re=document.getElementById("mp-qr-code"),We=document.getElementById("mp-pix-summary");Pe&&Te.qr_code_base64&&(Pe.src=`data:image/png;base64,${Te.qr_code_base64}`,Pe.style.display="block"),Re&&Te.qr_code_text&&(Re.textContent=Te.qr_code_text,window._mpQrCodeText=Te.qr_code_text),We&&(We.innerHTML=ke()),it("mp-pix-modal")}else{const Pe=document.getElementById("confirmation-modal"),Re=document.getElementById("order-id-display");Pe&&(Pe.style.display="flex"),Re&&(Re.textContent=mt.slice(0,8).toUpperCase())}ve()}catch(z){console.error("Confirm Pix MP Error:",z),alert("Erro ao gerar PIX Mercado Pago: "+(z.message||"Erro de resposta")+". Tente novamente."),N&&(N.disabled=!1,N.innerHTML="⚡ Pagar via Mercado Pago (PIX)")}},window.closeMpPix=()=>je("mp-pix-modal"),window.copyMpQrCode=()=>{const N=window._mpQrCodeText||"";navigator.clipboard.writeText(N).then(()=>{const z=document.getElementById("btn-copy-mp-qr");z&&(z.textContent="✓ Copiado!",setTimeout(()=>{z.textContent="Copiar código"},2e3))})},window.previewComprovante=N=>{const z=document.getElementById("comprovante-preview"),G=document.getElementById("comprovante-label");if(N.files?.[0]){const W=new FileReader;W.onload=te=>{z&&(z.src=te.target?.result,z.style.display="block"),G&&(G.textContent=N.files[0].name)},W.readAsDataURL(N.files[0])}}}const xt=(B,N=!1)=>{const z=N&&B.promotionalName||B.name,G=N&&B.promotionalPrice||B.price,W=N?B.price:null,te=B.stock===0;return o?`
                <div class="product-card" style="${te?"opacity:0.6;":""}">
                    <div class="card-image">
                        <img src="${L(B)}" alt="${z}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                        ${te?'<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${z}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                        ${B.stock!=null&&!te&&B.stock<=10?`<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${B.stock} restante${B.stock!==1?"s":""}</p>`:""}
                        <button id="btn-add-${B.id}" onclick="window.catAddToCart('${B.id}')" ${te?"disabled":""}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${te?"rgba(255,255,255,0.05)":"var(--primary-cat)"};color:${te?"#94a3b8":"white"};border:none;cursor:${te?"not-allowed":"pointer"};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${te?"Esgotado":"+ Adicionar"}
                        </button>
                    </div>
                </div>`:`
                <div class="product-card">
                    <div class="card-image">
                        <img src="${L(B)}" alt="${z}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${z}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                    </div>
                </div>`},ot="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;",Ze="background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;",Wt=(B,N)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${B}</h3>
                <button onclick="${N}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`,Yn=(B,N,z,G="")=>`<button id="${B}" onclick="${N}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${G}">${z}</button>`,Gi=o?`
            <!-- CART MODAL -->
            <div id="cart-modal" style="${ot}align-items:flex-end;overflow-y:auto;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${Wt('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho',"window.closeCart()")}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${Yn("btn-go-delivery","window.goToDelivery()",'<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${ot}">
                <div style="${Ze}">
                    ${Wt('<i class="fa-solid fa-box"></i> Como deseja receber?',"window.closeDelivery()")}
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <div id="delivery-card-entrega" class="delivery-card" ${ae!==!1&&j.length>0?`onclick="window.selectDelivery('entrega')"`:""} style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);${ae!==!1&&j.length>0?"cursor:pointer;":"opacity:0.5;cursor:not-allowed;"}display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-truck" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Entrega</p>
                                <p style="margin:4px 0 0;color:${ae!==!1&&j.length>0?"#94a3b8":"#ef4444"};font-size:0.85rem;">${ae!==!1&&j.length>0?"Receber no endereço informado":"Entrega indisponível no momento"}</p>
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
                    ${Yn("btn-go-customer","window.goToCustomer()",'<i class="fa-solid fa-arrow-right"></i> Continuar',"opacity:0.4;cursor:not-allowed;")}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${ot}">
                <div style="${Ze}max-height:90vh;overflow-y:auto;">
                    ${Wt('<i class="fa-solid fa-user"></i> Seus Dados',"window.closeCustomer()")}
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div id="address-group" style="display:none;margin-bottom:16px;">
                        ${j.length>0?`
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Bairro</label>
                        <div id="bairro-input-wrapper" style="position:relative;margin-bottom:12px;">
                            <input type="text" id="checkout-bairro" placeholder="Digite ou selecione seu bairro..." autocomplete="off" oninput="window.catFilterBairros(this.value)" onfocus="window.catFilterBairros(this.value)" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;">
                            <div id="checkout-bairro-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:10px;z-index:9999;box-shadow:0 4px 15px rgba(0,0,0,0.5);margin-top:4px;"></div>
                        </div>
                        `:""}
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Endereço Completo</label>
                        <input id="checkout-address" type="text" placeholder="Rua, número, complemento" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    ${Yn("btn-go-payment","window.goToPayment()","Escolher Pagamento →","margin-top:8px;")}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${ot}">
                <div style="${Ze}">
                    ${Wt('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento',"window.closePayment()")}
                    <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.9rem;"></div>
                    
                    <div id="mandatory-pay-msg" style="display:none;padding:12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:12px;margin-bottom:14px;color:#fbbf24;font-size:0.85rem;line-height:1.4;">
                        <i class="fa-solid fa-circle-info"></i> Atenção: Para pedidos para retirada é obrigatório o pagamento adiantado pois o produto vai ser reservado.
                    </div>

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
                            style="display:${v?"flex":"none"};padding:16px;border-radius:14px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>
                        </button>
                        <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()"
                            style="display:${A?"flex":"none"};padding:16px;border-radius:14px;background:#009ee3;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-solid fa-credit-card" style="font-size:1.2rem;"></i> <span>Pagar via Mercado Pago (PIX)</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- PIX MANUAL MODAL -->
            <div id="pix-manual-modal" style="${ot}">
                <div style="${Ze}max-height:90vh;overflow-y:auto;">
                    ${Wt('<i class="fa-brands fa-pix"></i> Pagamento via PIX',"window.closePixManual()")}
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
                    ${Yn("btn-confirm-pix-manual","window.confirmPixManual()",'<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${ot}">
                <div style="${Ze}max-height:90vh;overflow-y:auto;">
                    ${Wt('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago',"window.closeMpPix()")}
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
            <div id="confirmation-modal" style="${ot}">
                <div style="${Ze}text-align:center;">
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
            <div id="store-info-modal" style="${ot}">
                <div style="${Ze}max-width:500px;">
                    ${Wt('<i class="fa-solid fa-circle-info"></i> Informações da Loja',"window.closeStoreInfo()")}
                    <div style="padding:10px 0;">
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-regular fa-clock"></i> Horário de Funcionamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:8px 16px;margin-bottom:20px;font-size:0.9rem;">
                            ${fe()}
                        </div>
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-solid fa-credit-card"></i> Formas de Pagamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;font-size:0.9rem;display:flex;flex-wrap:wrap;gap:8px;">
                            <span class="badge info" style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-money-bill"></i> Na Entrega/Retirada</span>
                            ${v?'<span class="badge success" style="background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-brands fa-pix"></i> PIX</span>':""}
                            ${A?'<span class="badge primary" style="background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-credit-card"></i> Mercado Pago</span>':""}
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLOSED ALERT MODAL -->
            <div id="closed-alert-modal" style="${ot}z-index:9999;">
                <div style="${Ze}text-align:center;">
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
        `:"";return setTimeout(()=>{P.size>0&&typeof ve=="function"&&ve()},100),`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                :root {
                    --primary-cat: ${_};
                    --primary-glow: ${_}4D;
                    --bg: ${b};
                    --card-bg: rgba(255,255,255,0.03);
                    --glass: rgba(255,255,255,0.05);
                    --text: ${R};
                    --text-muted: #94a3b8;
                    --price-cat: ${M};
                    --product-bg: ${h.productBgColor||"rgba(255,255,255,0.05)"};
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
                ${y!=="moderno"?`
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge"><i class="fa-solid fa-circle" style="font-size:6px;"></i> Loja Online</div>
                    ${D?`<div class="store-logo-wrapper"><img src="${D}" alt="${a.name}" class="store-logo"></div>`:'<div style="width:90px;height:90px;border-radius:50%;background:var(--primary-glow);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                    <h1>${a.name}</h1>
                    <p class="header-address"><i class="fa-solid fa-location-dot" style="margin-right:4px;opacity:0.7;"></i> ${a.address||"Endereço não cadastrado"}</p>
                    
                    <div class="store-info-btn" onclick="window.openStoreInfo()">
                        Mais informações <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;margin-left:4px;"></i>
                    </div>

                    <div class="store-status-card">
                        <div style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">
                            ${rt()}
                        </div>
                        ${me?`
                        <div style="height:1px;background:rgba(255,255,255,0.05);margin:2px 0;"></div>
                        <div style="color:var(--text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                            <i class="fa-solid fa-motorcycle"></i> ${ae!==!1?"Entrega e Retirada":"Apenas Retirada"}
                        </div>
                        `:""}
                    </div>
                </header>
                `:""}

                ${y==="banner"?`
                    <!-- Banner hero -->
                    ${x||E?`
                        <div class="cat-banner-hero" aria-label="Banner da loja">
                            <picture>
                                ${E?`<source media="(max-width:600px)" srcset="${E}">`:""}
                                <img src="${x||E}" alt="Banner ${a.name}">
                            </picture>
                        </div>`:`
                        <div class="cat-banner-fallback" aria-hidden="true">
                            <i class="fa-solid fa-store" style="font-size:3rem;color:rgba(255,255,255,0.3);"></i>
                        </div>`}
                    <main class="section-container" style="padding-top:20px;">
                        ${m.length>0?`<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${m.map(B=>xt(B,!0)).join("")}</div>`:""}
                        ${g.map(B=>`<div class="section-title"><i class="fa-solid ${B.icon||"fa-tag"}" aria-hidden="true"></i><span>${B.name}</span><div class="line"></div></div><div class="product-grid" role="list">${B.products.map(N=>xt(N,!1)).join("")}</div>`).join("")}
                        ${w.length>0?`<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${w.map(B=>xt(B,!1)).join("")}</div>`:""}
                        ${f.length===0?'<div style="text-align:center;padding:80px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>

                `:y==="moderno"?`
                    <!-- Moderno layout: sidebar + search + new header -->
                    <div class="cat-moderno-header">
                        <div class="cat-search-bar-top-container">
                            <div class="cat-search-bar-wrap">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" id="cat-search-bar-top" placeholder="Buscar no catálogo" aria-label="Buscar produto" oninput="window.catSearch(this.value)">
                            </div>
                        </div>
                        
                        <div class="cat-moderno-banner-hero">
                            ${x||E?`
                            <picture>
                                ${E?`<source media="(max-width:600px)" srcset="${E}">`:""}
                                <img src="${x||E}" alt="Banner ${a.name}">
                            </picture>
                            `:`
                            <div class="cat-banner-fallback">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            `}
                        </div>

                        <div class="cat-moderno-info">
                            <div class="cat-moderno-logo-wrap">
                                ${D?`<img src="${D}" alt="${a.name}">`:'<div class="fallback-logo"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                            </div>
                            <h1>${a.name}</h1>
                            <p class="cat-moderno-address">
                                ${a.address||"Endereço não cadastrado"} <span style="margin:0 8px;">•</span> <span class="moderno-more-info" onclick="window.openStoreInfo()">Mais informações</span>
                            </p>
                            <div class="cat-moderno-status-row">
                                ${rt()} 
                                ${me?`<span class="badge" style="background:rgba(148,163,184,0.1);color:#475569;border:1px solid rgba(148,163,184,0.2);margin-left:8px;font-size:0.8rem;padding:4px 10px;border-radius:6px;font-weight:700;">${ae!==!1?"Entrega e Retirada":"Apenas Retirada"}</span>`:""}
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
                                ${m.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('promo')"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i> Ofertas</button>`:""}
                                ${g.map(B=>`<button class="cat-sidebar-link" onclick="window.catFilterCat('${B.id}')"><i class="fa-solid ${B.icon||"fa-tag"}" aria-hidden="true"></i> ${B.name}</button>`).join("")}
                                ${w.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>`:""}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${m.length>0?`<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${m.map(B=>xt(B,!0)).join("")}</div>`:""}
                                ${g.map(B=>`<div class="section-title" data-catgroup="${B.id}"><i class="fa-solid ${B.icon||"fa-tag"}" aria-hidden="true"></i><span>${B.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${B.id}" role="list">${B.products.map(N=>xt(N,!1)).join("")}</div>`).join("")}
                                ${w.length>0?`<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${w.map(B=>xt(B,!1)).join("")}</div>`:""}
                                ${f.length===0?'<div style="text-align:center;padding:80px 20px;color:#64748b;"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível.</p></div>':""}
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
                                ${m.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('promo')">
                                    <div class="cat-selector-icon-wrap" style="color:#fbbf24;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <span class="cat-selector-label">Ofertas</span>
                                </button>`:""}
                                ${g.map(B=>`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${B.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${B.icon||"fa-tag"}"></i></div>
                                    <span class="cat-selector-label">${B.name}</span>
                                </button>`).join("")}
                                ${w.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>`:""}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${m.length>0?"":"display:none;"}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${m.map(B=>xt(B,!0)).join("")}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${g.map(B=>`
                                <div class="section-container-cat" data-classic-cat="${B.id}">
                                    <div class="section-title"><i class="fa-solid ${B.icon||"fa-tag"}" aria-hidden="true"></i><span>${B.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${B.products.map(N=>xt(N,!1)).join("")}</div>
                                </div>
                            `).join("")}
                            ${w.length>0?`
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${w.map(B=>xt(B,!1)).join("")}</div>
                                </div>
                            `:""}
                        </div>

                        ${f.length===0?'<div style="text-align:center;padding:100px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:4rem;opacity:0.3;display:block;margin-bottom:20px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>
                `}

                ${T?`
                    <a href="https://wa.me/${T}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar conosco via WhatsApp">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Falar conosco</span>
                    </a>`:""}

                ${Gi}
            </div>
        `}catch(e){return console.error("Catalog Error:",e),"<p>Erro ao carregar catálogo.</p>"}},au=async n=>(setTimeout(()=>{const e=document.getElementById("remote-qrcode"),t=document.getElementById("qr-content-active"),i=document.getElementById("qr-content-success");if(!e)return;let a=null,s=null;const o=()=>{a&&clearInterval(a),s&&clearInterval(s)},l=async()=>{try{const b=await(await fetch(`${Bt}/instance/connect/${n}`,{headers:{apikey:Ft}})).json();if(b&&(b.base64||b.qrcode?.base64)){const R=b.base64||b.qrcode.base64;e.innerHTML=`<img src="${R}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`}else{const M=await(await fetch(`${Bt}/instance/connectionState/${n}`,{headers:{apikey:Ft}})).json();(M.instance?.state==="open"||M.state==="open")&&u()}}catch(_){console.error("Error fetching QR:",_)}},c=async()=>{try{const b=await(await fetch(`${Bt}/instance/connectionState/${n}`,{headers:{apikey:Ft}})).json();(b.instance?.state==="open"||b.state==="open")&&u()}catch(_){console.error("Error checking status:",_)}},u=()=>{o(),t&&(t.style.display="none"),i&&(i.style.display="flex")};l(),a=setInterval(l,4e4),s=setInterval(c,3e3);const h=setInterval(()=>{document.getElementById("remote-qrcode")||(o(),clearInterval(h))},1e3)},100),`
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
    `),Rx=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!"},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!"},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue / Finalizado",icon:"fa-flag-checkered",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."},{key:"pedido_recebido",label:"Pedido Recebido (Aguardando Aprovação)",icon:"fa-clock",default:"Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳"}],Lx=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],qr=[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}],Dx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,t=await F.get("companies",e);let i=t?.stores||[];const a=!!t?.mercadoPagoToken;if(n.role!=="owner"){const D=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(v=>D.includes(v.id))}if(i.length===0)return'<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>';const s=await F.getAll("instancias",{field:"empresaId",operator:"==",value:e}),o=await F.getAll("loja_config",{field:"empresaId",operator:"==",value:e});let l=i[0].id;const c=D=>o.find(v=>v.lojaId===D)||null,u=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom:20px; overflow-x:auto;">
            ${i.map(D=>`
                <button class="btn-store-tab ${D.id===l?"active":""}" data-id="${D.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${D.id===l?"var(--primary)":"var(--surface-hover)"};
                    color: ${D.id===l?"#fff":"var(--text-main)"};
                    border: 1px solid ${D.id===l?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px; cursor: pointer; white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${D.name}
                </button>
            `).join("")}
        </div>`,h=()=>Lx.map(D=>`
        <div class="var-chip" draggable="true" data-var="${D.key}" title="Clique para copiar">
            <i class="fa-solid ${D.icon}"></i>
            <span>${D.label}</span>
            <code>${D.key}</code>
        </div>
    `).join("");return setTimeout(()=>{_(),b()},100),`
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
    `;function _(){const D=()=>{document.querySelectorAll(".btn-store-tab").forEach(v=>{v.addEventListener("click",()=>{l=v.dataset.id;const k=document.getElementById("cat-tabs-container");k&&(k.innerHTML=u(),D()),b()})})};D()}function b(){const D=document.getElementById("cat-config-content-area");if(!D)return;const v=c(l),k=v?.design||{},S=v?.mensagens_automaticas||{},$=`${window.location.origin}/catalog/${l}`,C=v?.instancia_id||i.find(f=>f.id===l)?.instancia_id||"",T=(f,m)=>{const y=v?.[m]||{};return qr.map(x=>{const E=y[x.key]||{},g=E.ativo??E.aberto??x.key!=="dom",w=E.inicio||E.abertura||"08:00",L=E.fim||E.fechamento||"18:00";return`
                <div class="horario-row ${g?"":"inactive"}" id="${f}-row-${x.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${f}-toggle" data-dia="${x.key}" ${g?"checked":""}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${x.label}</span>
                    </div>
                    <div class="horario-inputs ${g?"":"hidden"}" id="${f}-inputs-${x.key}">
                        <input type="time" class="time-input" id="${f}-open-${x.key}" value="${w}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${f}-close-${x.key}" value="${L}">
                    </div>
                    <div class="status-label" id="${f}-status-${x.key}" style="font-size:0.8rem;color:${g?"var(--success)":"var(--text-dim)"};min-width:70px;text-align:right;">
                        ${g?"Aberto":"Fechado"}
                    </div>
                </div>`}).join("")},A=Rx.map(f=>`
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
        `).join("");D.innerHTML=`

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
                    ${s.map(f=>`
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
                    <i class="fa-solid fa-palette" style="color:var(--primary);"></i> Aparência e Redes Sociais
                </div>

                <!-- Meta Description -->
                <div class="cat-field">
                    <label class="config-label">Descrição para Compartilhamento</label>
                    <input type="text" id="cat-meta-description" value="${k.metaDescription||""}" class="config-input" placeholder="Ex: Melhores lanches da região. Peça agora!">
                    <p class="cat-field-hint">Texto que aparece quando você compartilha o link no WhatsApp/FB/Insta.</p>
                </div>

                <!-- Logo -->
                <div class="cat-field">
                    <label class="config-label">Logo da Loja</label>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div id="cat-logo-preview-wrapper" style="width:80px;height:80px;border-radius:12px;border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;background:var(--surface-hover);overflow:hidden;flex-shrink:0;">
                            ${k.logoUrl?`<img src="${k.logoUrl}" style="width:100%;height:100%;object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
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
                            <input type="color" id="cat-primary-color" value="${k.primaryColor||"#6366f1"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-primary-color-hex" value="${k.primaryColor||"#6366f1"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor de Fundo</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-secondary-color" value="${k.secondaryColor||"#0f172a"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-secondary-color-hex" value="${k.secondaryColor||"#0f172a"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor do Texto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-text-color" value="${k.textColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-text-color-hex" value="${k.textColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor do Preço</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-price-color" value="${k.priceColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-price-color-hex" value="${k.priceColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Fundo do Produto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-product-bg-color" value="${k.productBgColor||"#1e293b"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-product-bg-color-hex" value="${k.productBgColor||"#1e293b"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <!-- Tema do catálogo -->
                <div class="cat-field">
                    <label class="config-label">Layout do Catálogo</label>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Escolha a apresentação visual dos seus produtos.</p>
                    <div class="theme-card-grid" id="cat-theme-grid">

                        <!-- Clássico -->
                        <div class="theme-card ${(k.themeId||"classico")==="classico"?"active":""}" onclick="window.catSelectTheme('classico')">
                            <div class="theme-card-preview">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">
                                    ${["","","",""].map(()=>'<div style="background:rgba(99,102,241,.2);border-radius:4px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-th-large" style="margin-right:5px;"></i>Clássico</div>
                            <div class="theme-card-desc">Grade de produtos simples e direta</div>
                        </div>

                        <!-- Moderno -->
                        <div class="theme-card ${k.themeId==="moderno"?"active":""}" onclick="window.catSelectTheme('moderno')">
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
                        <div class="theme-card ${k.themeId==="banner"?"active":""}" onclick="window.catSelectTheme('banner')">
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
                    <input type="hidden" id="cat-theme-id" value="${k.themeId||"classico"}">
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
                                ${k.bannerUrl?`<img src="${k.bannerUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-panorama" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-desktop-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-desktop-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Desktop (1200×400)
                            </button>
                        </div>
                        <div>
                            <label class="config-label">Banner Mobile</label>
                            <div id="banner-mobile-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${k.bannerMobileUrl?`<img src="${k.bannerMobileUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-mobile-screen" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
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
                    ${h()}
                </div>
                <div id="cat-msg-editors">
                    ${A}
                </div>
            </div>

            <!-- ── Pagamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Pagamento
                </div>

                <div class="cat-field">
                    <label class="config-label">WhatsApp de Atendimento (com DDD)</label>
                    <input type="text" id="cat-whatsapp" value="${k.whatsapp||""}" class="config-input" placeholder="Ex: 5511999999999">
                    <p class="cat-field-hint">Número exibido no botão flutuante do catálogo.</p>
                </div>

                <div class="cat-field">
                    <label class="config-label">Chave PIX (Manual)</label>
                    <input type="text" id="cat-pix-key" value="${k.pixKey||""}" class="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória">
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
                        ${(v?.bairrosEntrega||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum bairro com entrega configurado.</p>':(v?.bairrosEntrega||[]).map((f,m)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;flex:1;">
                                        <span style="font-weight:600;color:var(--text-main);">${f.bairros}</span>
                                        <span style="font-size:0.85rem;color:var(--primary);font-weight:700;">R$ ${Number(f.preco).toFixed(2)}</span>
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteBairro(${m})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
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
                            <input type="checkbox" id="mp-active-toggle" ${v?.mercadoPagoActive!==!1?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-store" style="color:var(--primary);"></i> Pagamento Antecipado (Retirada)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Obrigar pagamento adiantado para pedidos de retirada.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-mandatory-pickup-pay" ${v?.pagamentoObrigatorioRetirada?"checked":""}>
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
                        ${(v?.cupons||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum cupom cadastrado ainda.</p>':(v?.cupons||[]).map((f,m)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-family:monospace;font-weight:700;color:var(--primary);">${f.codigo}</span>
                                        <span class="badge ${f.ativo!==!1?"success":"warning"}">${f.ativo!==!1?"Ativo":"Inativo"}</span>
                                        <span style="font-size:0.8rem;color:var(--text-muted);">${f.tipo==="percent"?f.desconto+"%":"R$ "+Number(f.desconto).toFixed(2)} de desconto</span>
                                        ${f.valorMinimo>0?`<span style="font-size:0.75rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px;">Min: R$ ${f.valorMinimo.toFixed(2)}</span>`:""}
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteCupom(${m})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="padding:14px;border-radius:var(--radius-md);background:${a?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)"};border:1px solid ${a?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"};display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                    <i class="fa-solid ${a?"fa-circle-check":"fa-circle-xmark"}" style="color:${a?"#10b981":"#ef4444"};font-size:1.2rem;"></i>
                    <div>
                        <p style="margin:0;font-weight:600;font-size:0.9rem;">Mercado Pago</p>
                        <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">
                            ${a?"Integração ativa — PIX via Mercado Pago disponível no catálogo.":'Não configurado. <a href="/mercado-pago" style="color:var(--primary);">Configurar agora →</a>'}
                        </p>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-pagamento">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{R()},50)}function R(D){const v=i;document.getElementById("btn-copy-cat-link")?.addEventListener("click",()=>{const C=document.getElementById("cat-link-display");C?.value&&navigator.clipboard.writeText(C.value).then(()=>V.success("Link copiado!"))});const k=(C,T)=>{const A=document.getElementById(C),f=document.getElementById(T);A?.addEventListener("input",()=>{f&&(f.value=A.value)}),f?.addEventListener("input",()=>{A&&(A.value=f.value)})};k("cat-primary-color","cat-primary-color-hex"),k("cat-secondary-color","cat-secondary-color-hex"),k("cat-text-color","cat-text-color-hex"),k("cat-price-color","cat-price-color-hex"),k("cat-product-bg-color","cat-product-bg-color-hex"),document.getElementById("cat-logo-file")?.addEventListener("change",C=>{const T=C.target.files?.[0];if(T){const A=new FileReader;A.onload=f=>{const m=document.getElementById("cat-logo-preview-wrapper");m&&(m.innerHTML=`<img src="${f.target?.result}" style="width:100%;height:100%;object-fit:contain;">`)},A.readAsDataURL(T)}}),document.getElementById("cat-instance-select")?.addEventListener("change",async C=>{const T=C.target.value,A=v.map(f=>f.id===l?{...f,instancia_id:T||null}:f);try{V.info("Salvando instância..."),await F.update("companies",e,{stores:A});const f=v.find(x=>x.id===l);f&&(f.instancia_id=T);const m=c(l);if(m)await F.update("loja_config",m.id,{instancia_id:T||null}),m.instancia_id=T;else{const x=await F.create("loja_config",{empresaId:e,lojaId:l,instancia_id:T||null});o.push({id:x,empresaId:e,lojaId:l,instancia_id:T})}const y=await F.getAll("instancias",{field:"lojaId",operator:"==",value:l});for(const x of y)await F.update("instancias",x.id,{lojaId:null,funcao:null});T&&await F.update("instancias",T,{lojaId:l,funcao:"Catálogo Vendas"}),V.success("Instância vinculada com sucesso!")}catch(f){V.error("Erro ao salvar instância."),console.error(f)}}),window.catSelectTheme=C=>{const T=document.getElementById("cat-theme-id");T&&(T.value=C),document.querySelectorAll(".theme-card").forEach(f=>f.classList.remove("active")),document.querySelectorAll(".theme-card").forEach(f=>{f.getAttribute("onclick")?.includes(`'${C}'`)&&f.classList.add("active")})};const S=(C,T)=>{document.getElementById(C)?.addEventListener("change",A=>{const f=A.target.files?.[0];if(f){const m=new FileReader;m.onload=y=>{const x=document.getElementById(T);x&&(x.innerHTML=`<img src="${y.target?.result}" style="width:100%;height:100%;object-fit:cover;">`)},m.readAsDataURL(f)}})};S("cat-banner-desktop-file","banner-desktop-preview"),S("cat-banner-mobile-file","banner-mobile-preview"),document.getElementById("btn-save-cat-aparencia")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-aparencia");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=document.getElementById("cat-primary-color-hex").value,A=document.getElementById("cat-secondary-color-hex").value,f=document.getElementById("cat-text-color-hex").value,m=document.getElementById("cat-price-color-hex").value,y=document.getElementById("cat-product-bg-color-hex").value,x=document.getElementById("cat-theme-id")?.value||"classico",E=document.getElementById("cat-meta-description").value,g=document.getElementById("cat-logo-file").files?.[0],w=document.getElementById("cat-banner-desktop-file")?.files?.[0],L=document.getElementById("cat-banner-mobile-file")?.files?.[0],P=c(l);let K=P?.design?.logoUrl||"",j=P?.design?.bannerUrl||"",Q=P?.design?.bannerMobileUrl||"";if(g){const Z=un(pn,`logos/${e}/${l}_logo`);await Ni(Z,g),K=await oi(Z)}if(w){const Z=un(pn,`banners/${e}/${l}_desktop`);await Ni(Z,w),j=await oi(Z)}if(L){const Z=un(pn,`banners/${e}/${l}_mobile`);await Ni(Z,L),Q=await oi(Z)}const J={...P?.design||{},primaryColor:T,secondaryColor:A,textColor:f,priceColor:m,productBgColor:y,logoUrl:K,themeId:x,bannerUrl:j,bannerMobileUrl:Q,metaDescription:E};await M({design:J}),V.success("Aparência salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar aparência."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'}}),document.getElementById("btn-save-cat-func")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-func");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};qr.forEach(({key:A})=>{const f=document.querySelector(`.func-toggle[data-dia="${A}"]`)?.checked,m=document.getElementById(`func-open-${A}`)?.value||"08:00",y=document.getElementById(`func-close-${A}`)?.value||"18:00";T[A]={ativo:f,inicio:m,fim:y}}),await M({horario_funcionamento:T}),V.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.getElementById("btn-save-cat-entrega")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-entrega");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};qr.forEach(({key:A})=>{const f=document.querySelector(`.entrega-toggle[data-dia="${A}"]`)?.checked,m=document.getElementById(`entrega-open-${A}`)?.value||"08:00",y=document.getElementById(`entrega-close-${A}`)?.value||"18:00";T[A]={ativo:f,inicio:m,fim:y}}),await M({horario_entrega:T}),V.success("Horários de entrega salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar horários de entrega."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".cat-save-single-msg").forEach(C=>{C.addEventListener("click",async()=>{const T=C.dataset.msgKey,A=document.getElementById(`cat-msg-${T}`)?.value||"",y={...c(l)?.mensagens_automaticas||{},[T]:A};try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>',await M({mensagens_automaticas:y}),V.success("Mensagem salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar mensagem."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})}),document.querySelectorAll(".var-chip").forEach(C=>{C.addEventListener("dragstart",T=>{T.dataTransfer?.setData("text/plain",C.dataset.var||"")}),C.addEventListener("click",()=>{navigator.clipboard.writeText(C.dataset.var||"").then(()=>V.info("Variável copiada!"))})}),document.querySelectorAll(".msg-textarea").forEach(C=>{C.addEventListener("dragover",T=>T.preventDefault()),C.addEventListener("drop",T=>{T.preventDefault();const A=T.dataTransfer?.getData("text/plain")||"",f=C,m=f.selectionStart,y=f.selectionEnd;f.value=f.value.substring(0,m)+A+f.value.substring(y),f.selectionStart=f.selectionEnd=m+A.length,f.focus()})}),document.getElementById("btn-save-cat-pagamento")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-pagamento");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=c(l),A=document.getElementById("cat-whatsapp").value.replace(/\D/g,""),f=document.getElementById("cat-pix-key").value.trim(),m=document.getElementById("mp-active-toggle")?.checked,y=document.getElementById("cat-mandatory-pickup-pay")?.checked,x={...T?.design||{},whatsapp:A,pixKey:f};delete x.taxaFixaNome,delete x.taxaFixaValor,delete x.taxaTipo,await M({design:x,mercadoPagoActive:m,pagamentoObrigatorioRetirada:y}),V.success("Configurações de pagamento salvas!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar pagamento."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'}}),document.getElementById("btn-add-cupom")?.addEventListener("click",async()=>{const C=(document.getElementById("new-cupom-code").value||"").trim().toUpperCase(),T=parseFloat(document.getElementById("new-cupom-valor").value||"0"),A=document.getElementById("new-cupom-tipo").value||"percent",f=parseFloat(document.getElementById("new-cupom-min").value||"0")||0;if(!C||!T){V.error("Preencha código e valor do cupom.");return}const y=[...c(l)?.cupons||[],{codigo:C,desconto:T,tipo:A,valorMinimo:f,ativo:!0}];await M({cupons:y}),V.success(`Cupom ${C} adicionado!`),b()}),window.catDeleteCupom=async C=>{const A=[...c(l)?.cupons||[]].filter((f,m)=>m!==C);await M({cupons:A}),V.success("Cupom removido."),b()},document.getElementById("btn-add-bairro")?.addEventListener("click",async()=>{const C=(document.getElementById("new-bairro-nomes").value||"").trim(),T=document.getElementById("new-bairro-preco").value,A=parseFloat(T||"0");if(!C){V.error("Preencha os bairros.");return}if(!T){V.error("Preencha o valor da taxa para estes bairros.");return}const m=[...c(l)?.bairrosEntrega||[],{bairros:C,preco:A}];await M({bairrosEntrega:m}),V.success("Bairro(s) adicionado(s)!"),b()}),window.catDeleteBairro=async C=>{const A=[...c(l)?.bairrosEntrega||[]].filter((f,m)=>m!==C);await M({bairrosEntrega:A}),V.success("Bairro(s) removido(s)."),b()};const $=(C,T,A,f)=>{document.querySelectorAll(`.${C}`).forEach(m=>{m.addEventListener("change",()=>{const y=m.dataset.dia,x=m.checked;document.getElementById(`${T}-row-${y}`)?.classList.toggle("inactive",!x),document.getElementById(`${T}-inputs-${y}`)?.classList.toggle("hidden",!x);const E=document.getElementById(`${T}-status-${y}`);E&&(E.innerText=x?A:f,E.style.color=x?"var(--success)":"var(--text-dim)")})})};$("func-toggle","func","Aberto","Fechado"),$("entrega-toggle","entrega","Disponível","Indisponível")}async function M(D){const v=c(l);if(v)await F.update("loja_config",v.id,D),Object.assign(v,D);else{const k=await F.create("loja_config",{empresaId:e,lojaId:l,...D});o.push({id:k,empresaId:e,lojaId:l,...D})}}},$x=()=>`
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
    `,Nx=async()=>{const n=Ae.getCurrentUser(),e=n?.role?.toLowerCase()==="admin"||n?.email==="ginannymoreira@gmail.com";if(!n||!e)return"<p>Acesso negado.</p>";const a=(await F.getAll("companies")).flatMap(o=>(o.stores||[]).map(l=>({...l,companyName:o.name,companyId:o.id}))),s=()=>a.map(o=>`<option value="${o.id}" data-company-id="${o.companyId}">${o.name} (${o.companyName})</option>`).join("");return window.performMigration=async()=>{const o=document.getElementById("migration-source-store"),l=document.getElementById("migration-target-store"),c=o.value,u=o.selectedOptions[0]?.dataset.companyId,h=l.value,_=l.selectedOptions[0]?.dataset.companyId;if(!c||!h){V.warning("Selecione as lojas de origem e destino.");return}if(c===h){V.warning("A loja de origem e destino não podem ser a mesma.");return}if(!await Xe.warning("Confirmar Migração","Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?"))return;const R=document.getElementById("btn-run-migration");R.disabled=!0,R.innerHTML='<div class="spinner-small"></div> Migrando...';try{const D=(await F.getAll("products",{field:"companyId",operator:"==",value:u})).filter(k=>k.storeIds&&k.storeIds.includes(c)||k.storeId===c);if(D.length===0){V.info("Nenhum produto encontrado na loja de origem."),R.disabled=!1,R.innerText="Iniciar Migração";return}let v=0;for(const k of D){const{id:S,...$}=k;$.companyId=_,$.storeIds=[h],delete $.lojaId,delete $.createdAt,await F.create("products",$),v++}V.success(`${v} produtos migrados com sucesso!`)}catch(M){console.error(M),V.error("Erro durante a migração: "+M)}finally{R.disabled=!1,R.innerText="Iniciar Migração"}},`
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
                        ${s()}
                    </select>
                </div>

                <div class="form-group">
                    <label>Loja de DESTINO (Para onde serão copiados)</label>
                    <select id="migration-target-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione o destino...</option>
                        ${s()}
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
    `};class Mx{appElement;constructor(){this.appElement=document.getElementById("app"),this.init()}init(){let e=null;Ae.subscribe(t=>{this.render(),t?t.uid!==e&&(e=t.uid,eu.startListening()):(e=null,eu.stopListening())}),this.handleRouting(),window.addEventListener("render-app",()=>this.render())}handleRouting(){window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",e=>{const i=e.target.closest("a");if(i&&i.getAttribute("href")?.startsWith("/")){e.preventDefault();const a=i.getAttribute("href");window.location.pathname!==a&&(history.pushState(null,"",a),this.render())}}),document.addEventListener("submit",async e=>{if(e.target.id==="login-form"){e.preventDefault();const i=document.getElementById("email").value,a=document.getElementById("password").value;try{await Ae.login(i,a)}catch(s){V.error("Erro ao fazer login: "+s)}}}),document.addEventListener("click",async e=>{e.target.closest("#logout-btn")&&(history.replaceState(null,"","/"),await Ae.logout())})}async render(){const e=window.location.pathname,t=Ae.getCurrentUser();if(e==="/"){this.appElement.innerHTML=$x();const o=this.appElement.querySelector(".lp-btn-login")||this.appElement.querySelector(".lp-btn-primary");t&&o&&(o.textContent="Dashboard",o.setAttribute("href",t.role==="admin"?"/admin/dashboard":"/dashboard"));return}if(!t){if(e.startsWith("/catalog/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await iu(o);return}if(e.startsWith("/qr/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await au(o);return}e!=="/login"&&history.replaceState(null,"","/login"),this.appElement.innerHTML=`<div id="page-content" class="login-page-container">${hx()}</div>`;return}if(e==="/login"){const o=t.role==="admin"?"/admin/dashboard":"/dashboard";history.replaceState(null,"",o),this.render();return}if(e.startsWith("/catalog/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await iu(o);return}if(e.startsWith("/qr/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await au(o);return}if(!this.isRouteAllowed(e,t.role)){this.appElement.innerHTML="<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>";return}const i=await this.getPageTitle(e);let a;t.role==="admin"?a=hm:t.role==="employee"?a=Z_:a=X_;const s=await a();this.appElement.innerHTML=`
            <div class="app-container">
                ${s}
                <main class="main-content">
                    ${ex(i)}
                    <div id="page-content" class="page-container">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50vh; flex-direction: column; gap: 1rem;">
                            <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i>
                            <span style="color: var(--text-muted);">Carregando página...</span>
                        </div>
                    </div>
                </main>
            </div>
        `;try{const o=await this.getPageContent(e),l=document.getElementById("page-content");l&&(l.innerHTML=o)}catch(o){console.error("Error loading page content:",o);const l=document.getElementById("page-content");l&&(l.innerHTML=`
                <div style="padding: 2rem; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: var(--danger);"></i>
                    <h3 style="margin-top: 1rem; color: var(--text-main);">Falha ao carregar</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Não foi possível carregar o conteúdo da página.</p>
                </div>
            `)}this.updateActiveLinks(),this.updateOrderCounter()}isRouteAllowed(e,t){return t==="admin"?e.startsWith("/admin"):!e.startsWith("/admin")}async getPageTitle(e){if(e==="/products"){const t=Ae.getCurrentUser();if(t?.companyId)try{const{dbService:i}=await Hr(async()=>{const{dbService:o}=await Promise.resolve().then(()=>Y_);return{dbService:o}},void 0);if(((await i.get("companies",t.companyId))?.modulos_ativos||[]).includes("agendamento"))return"Serviços"}catch{}return"Produtos"}switch(e){case"/":case"/dashboard":case"/admin/dashboard":return"Dashboard";case"/orders":return"Pedidos";case"/stores":return"Lojas";case"/leads":return"Leads";case"/users":case"/admin/users":return"Usuários";case"/admin/ai-config":return"Configuração IA";case"/companies":case"/admin/companies":return"Gestão de Clientes";case"/instances":return"Instâncias";case"/configuration":return"Configurações";case"/campaigns":return"Campanhas";case"/schedule":return"Agenda";case"/schedule-clients":return"Clientes";case"/admin/webhooks":return"Configuração de Webhooks";case"/admin/migration":return"Migração de Produtos";case"/mercado-pago":return"Mercado Pago";case"/catalog-settings":return"Configuração";default:return"Página não encontrada"}}async getPageContent(e){switch(e){case"/":case"/dashboard":case"/admin/dashboard":return nx();case"/orders":return lx();case"/products":return await cx();case"/stores":return await dx();case"/leads":return await xx();case"/users":return Ae.getCurrentUser()?.role==="admin"?Zd():ux();case"/admin/users":return Zd();case"/admin/ai-config":return px();case"/companies":case"/admin/companies":return await mx();case"/instances":return fx();case"/configuration":return vx();case"/campaigns":return Tx();case"/schedule":return kx();case"/schedule-clients":return Sx();case"/admin/webhooks":return await Cx();case"/admin/migration":return await Nx();case"/mercado-pago":return await Px();case"/catalog-settings":return await Dx();default:return"<h1>404</h1><p>Página não encontrada.</p>"}}updateActiveLinks(){const e=window.location.pathname;document.querySelectorAll(".nav-item").forEach(i=>{i.getAttribute("href")===e?i.classList.add("active"):i.classList.remove("active")})}async updateOrderCounter(){const e=Ae.getCurrentUser();if(!(!e||!e.companyId||e.role==="admin"))try{const t=e.storeIds||(e.storeId?[e.storeId]:[]),i=await ii.getOpenOrdersCount(e.companyId,e.role==="owner"?[]:t),a=document.getElementById("orders-count-badge");a&&(a.textContent=i.toString(),i>0?a.classList.remove("hidden"):a.classList.add("hidden"))}catch(t){console.error("Error updating order counter:",t)}}}new Mx;
