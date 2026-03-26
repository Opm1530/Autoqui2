(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const hm="modulepreload",mm=function(n){return"/"+n},uc={},_s=function(e,t,i){let a=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};var o=u;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");a=u(t.map(h=>{if(h=mm(h),h in uc)return;uc[h]=!0;const w=h.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${b}`))return;const R=document.createElement("link");if(R.rel=w?"stylesheet":hm,w||(R.as="script"),R.crossOrigin="",R.href=h,c&&R.setAttribute("nonce",c),document.head.appendChild(R),w)return new Promise((M,D)=>{R.addEventListener("load",M),R.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return a.then(l=>{for(const c of l||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},fm=()=>`
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
    `,gm=()=>{};var pc={};const su=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let a=n.charCodeAt(i);a<128?e[t++]=a:a<2048?(e[t++]=a>>6|192,e[t++]=a&63|128):(a&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(a=65536+((a&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=a>>18|240,e[t++]=a>>12&63|128,e[t++]=a>>6&63|128,e[t++]=a&63|128):(e[t++]=a>>12|224,e[t++]=a>>6&63|128,e[t++]=a&63|128)}return e},ym=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const a=n[t++];if(a<128)e[i++]=String.fromCharCode(a);else if(a>191&&a<224){const s=n[t++];e[i++]=String.fromCharCode((a&31)<<6|s&63)}else if(a>239&&a<365){const s=n[t++],o=n[t++],l=n[t++],c=((a&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[i++]=String.fromCharCode((a&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ru={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let a=0;a<n.length;a+=3){const s=n[a],o=a+1<n.length,l=o?n[a+1]:0,c=a+2<n.length,u=c?n[a+2]:0,h=s>>2,w=(s&3)<<4|l>>4;let b=(l&15)<<2|u>>6,R=u&63;c||(R=64,o||(b=64)),i.push(t[h],t[w],t[b],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(su(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ym(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let a=0;a<n.length;){const s=t[n.charAt(a++)],l=a<n.length?t[n.charAt(a)]:0;++a;const u=a<n.length?t[n.charAt(a)]:64;++a;const w=a<n.length?t[n.charAt(a)]:64;if(++a,s==null||l==null||u==null||w==null)throw new vm;const b=s<<2|l>>4;if(i.push(b),u!==64){const R=l<<4&240|u>>2;if(i.push(R),w!==64){const M=u<<6&192|w;i.push(M)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class vm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bm=function(n){const e=su(n);return ru.encodeByteArray(e,!0)},xs=function(n){return bm(n).replace(/\./g,"")},ou=function(n){try{return ru.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function wm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const _m=()=>wm().__FIREBASE_DEFAULTS__,xm=()=>{if(typeof process>"u"||typeof pc>"u")return;const n=pc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Em=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ou(n[1]);return e&&JSON.parse(e)},js=()=>{try{return gm()||_m()||xm()||Em()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},lu=n=>js()?.emulatorHosts?.[n],cu=n=>{const e=lu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},du=()=>js()?.config,uu=n=>js()?.[`_${n}`];class Im{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}function Wn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wo(n){return(await fetch(n,{credentials:"include"})).ok}function pu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",a=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:a,exp:a+3600,auth_time:a,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[xs(JSON.stringify(t)),xs(JSON.stringify(o)),""].join(".")}const ya={};function Tm(){const n={prod:[],emulator:[]};for(const e of Object.keys(ya))ya[e]?n.emulator.push(e):n.prod.push(e);return n}function km(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let hc=!1;function _o(n,e){if(typeof window>"u"||typeof document>"u"||!Wn(window.location.host)||ya[n]===e||ya[n]||hc)return;ya[n]=e;function t(b){return`__firebase__banner__${b}`}const i="__firebase__banner",s=Tm().prod.length>0;function o(){const b=document.getElementById(i);b&&b.remove()}function l(b){b.style.display="flex",b.style.background="#7faaf0",b.style.position="fixed",b.style.bottom="5px",b.style.left="5px",b.style.padding=".5em",b.style.borderRadius="5px",b.style.alignItems="center"}function c(b,R){b.setAttribute("width","24"),b.setAttribute("id",R),b.setAttribute("height","24"),b.setAttribute("viewBox","0 0 24 24"),b.setAttribute("fill","none"),b.style.marginLeft="-6px"}function u(){const b=document.createElement("span");return b.style.cursor="pointer",b.style.marginLeft="16px",b.style.fontSize="24px",b.innerHTML=" &times;",b.onclick=()=>{hc=!0,o()},b}function h(b,R){b.setAttribute("id",R),b.innerText="Learn more",b.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",b.setAttribute("target","__blank"),b.style.paddingLeft="5px",b.style.textDecoration="underline"}function w(){const b=km(i),R=t("text"),M=document.getElementById(R)||document.createElement("span"),D=t("learnmore"),v=document.getElementById(D)||document.createElement("a"),k=t("preprendIcon"),S=document.getElementById(k)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(b.created){const $=b.element;l($),h(v,D);const C=u();c(S,k),$.append(S,M,v,C),document.body.appendChild($)}s?(M.innerText="Preview backend disconnected.",S.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,M.innerText="Preview backend running in this workspace."),M.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}function wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Am(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(wt())}function Sm(){const n=js()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Pm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Rm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lm(){const n=wt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Dm(){return!Sm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function $m(){try{return typeof indexedDB=="object"}catch{return!1}}function Nm(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(i);a.onsuccess=()=>{a.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},a.onupgradeneeded=()=>{t=!1},a.onerror=()=>{e(a.error?.message||"")}}catch(t){e(t)}})}const Mm="FirebaseError";class rn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Mm,Object.setPrototypeOf(this,rn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Na.prototype.create)}}class Na{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},a=`${this.service}/${e}`,s=this.errors[e],o=s?Om(s,i):"Error",l=`${this.serviceName}: ${o} (${a}).`;return new rn(a,l,i)}}function Om(n,e){return n.replace(Vm,(t,i)=>{const a=e[i];return a!=null?String(a):`<${i}?>`})}const Vm=/\{\$([^}]+)}/g;function Bm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function li(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const a of t){if(!i.includes(a))return!1;const s=n[a],o=e[a];if(mc(s)&&mc(o)){if(!li(s,o))return!1}else if(s!==o)return!1}for(const a of i)if(!t.includes(a))return!1;return!0}function mc(n){return n!==null&&typeof n=="object"}function Ma(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(a=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function da(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[a,s]=i.split("=");e[decodeURIComponent(a)]=decodeURIComponent(s)}}),e}function ua(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function zm(n,e){const t=new Fm(n,e);return t.subscribe.bind(t)}class Fm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let a;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Um(e,["next","error","complete"])?a=e:a={next:e,error:t,complete:i},a.next===void 0&&(a.next=Sr),a.error===void 0&&(a.error=Sr),a.complete===void 0&&(a.complete=Sr);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Um(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Sr(){}function Ve(n){return n&&n._delegate?n._delegate:n}class Bn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const ni="[DEFAULT]";class jm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Im;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:t});a&&i.resolve(a)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(a){if(i)return null;throw a}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Hm(e))try{this.getOrInitializeService({instanceIdentifier:ni})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:a});i.resolve(s)}catch{}}}}clearInstance(e=ni){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ni){return this.instances.has(e)}getOptions(e=ni){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);i===l&&o.resolve(a)}return a}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),a=this.onInitCallbacks.get(i)??new Set;a.add(e),this.onInitCallbacks.set(i,a);const s=this.instances.get(i);return s&&e(s,i),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const a of i)try{a(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:qm(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ni){return this.component?this.component.multipleInstances?e:ni:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qm(n){return n===ni?void 0:n}function Hm(n){return n.instantiationMode==="EAGER"}class Wm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const Gm={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},Km=we.INFO,Qm={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},Ym=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),a=Qm[e];if(a)console[a](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xo{constructor(e){this.name=e,this._logLevel=Km,this._logHandler=Ym,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Gm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const Jm=(n,e)=>e.some(t=>n instanceof t);let fc,gc;function Xm(){return fc||(fc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zm(){return gc||(gc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hu=new WeakMap,Wr=new WeakMap,mu=new WeakMap,Cr=new WeakMap,Eo=new WeakMap;function ef(n){const e=new Promise((t,i)=>{const a=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Dn(n.result)),a()},o=()=>{i(n.error),a()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&hu.set(t,n)}).catch(()=>{}),Eo.set(e,n),e}function tf(n){if(Wr.has(n))return;const e=new Promise((t,i)=>{const a=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),a()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),a()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Wr.set(n,e)}let Gr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||mu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Dn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function nf(n){Gr=n(Gr)}function af(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Pr(this),e,...t);return mu.set(i,e.sort?e.sort():[e]),Dn(i)}:Zm().includes(n)?function(...e){return n.apply(Pr(this),e),Dn(hu.get(this))}:function(...e){return Dn(n.apply(Pr(this),e))}}function sf(n){return typeof n=="function"?af(n):(n instanceof IDBTransaction&&tf(n),Jm(n,Xm())?new Proxy(n,Gr):n)}function Dn(n){if(n instanceof IDBRequest)return ef(n);if(Cr.has(n))return Cr.get(n);const e=sf(n);return e!==n&&(Cr.set(n,e),Eo.set(e,n)),e}const Pr=n=>Eo.get(n);function rf(n,e,{blocked:t,upgrade:i,blocking:a,terminated:s}={}){const o=indexedDB.open(n,e),l=Dn(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Dn(o.result),c.oldVersion,c.newVersion,Dn(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),a&&c.addEventListener("versionchange",u=>a(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const of=["get","getKey","getAll","getAllKeys","count"],lf=["put","add","delete","clear"],Rr=new Map;function yc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Rr.get(e))return Rr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,a=lf.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(a||of.includes(t)))return;const s=async function(o,...l){const c=this.transaction(o,a?"readwrite":"readonly");let u=c.store;return i&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),a&&c.done]))[0]};return Rr.set(e,s),s}nf(n=>({...n,get:(e,t,i)=>yc(e,t)||n.get(e,t,i),has:(e,t)=>!!yc(e,t)||n.has(e,t)}));class cf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(df(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function df(n){return n.getComponent()?.type==="VERSION"}const Kr="@firebase/app",vc="0.14.8";const hn=new xo("@firebase/app"),uf="@firebase/app-compat",pf="@firebase/analytics-compat",hf="@firebase/analytics",mf="@firebase/app-check-compat",ff="@firebase/app-check",gf="@firebase/auth",yf="@firebase/auth-compat",vf="@firebase/database",bf="@firebase/data-connect",wf="@firebase/database-compat",_f="@firebase/functions",xf="@firebase/functions-compat",Ef="@firebase/installations",If="@firebase/installations-compat",Tf="@firebase/messaging",kf="@firebase/messaging-compat",Af="@firebase/performance",Sf="@firebase/performance-compat",Cf="@firebase/remote-config",Pf="@firebase/remote-config-compat",Rf="@firebase/storage",Lf="@firebase/storage-compat",Df="@firebase/firestore",$f="@firebase/ai",Nf="@firebase/firestore-compat",Mf="firebase",Of="12.9.0";const Qr="[DEFAULT]",Vf={[Kr]:"fire-core",[uf]:"fire-core-compat",[hf]:"fire-analytics",[pf]:"fire-analytics-compat",[ff]:"fire-app-check",[mf]:"fire-app-check-compat",[gf]:"fire-auth",[yf]:"fire-auth-compat",[vf]:"fire-rtdb",[bf]:"fire-data-connect",[wf]:"fire-rtdb-compat",[_f]:"fire-fn",[xf]:"fire-fn-compat",[Ef]:"fire-iid",[If]:"fire-iid-compat",[Tf]:"fire-fcm",[kf]:"fire-fcm-compat",[Af]:"fire-perf",[Sf]:"fire-perf-compat",[Cf]:"fire-rc",[Pf]:"fire-rc-compat",[Rf]:"fire-gcs",[Lf]:"fire-gcs-compat",[Df]:"fire-fst",[Nf]:"fire-fst-compat",[$f]:"fire-vertex","fire-js":"fire-js",[Mf]:"fire-js-all"};const Es=new Map,Bf=new Map,Yr=new Map;function bc(n,e){try{n.container.addComponent(e)}catch(t){hn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ci(n){const e=n.name;if(Yr.has(e))return hn.debug(`There were multiple attempts to register component ${e}.`),!1;Yr.set(e,n);for(const t of Es.values())bc(t,n);for(const t of Bf.values())bc(t,n);return!0}function qs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Dt(n){return n==null?!1:n.settings!==void 0}const zf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$n=new Na("app","Firebase",zf);class Ff{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Bn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $n.create("app-deleted",{appName:this._name})}}const vi=Of;function Io(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Qr,automaticDataCollectionEnabled:!0,...e},a=i.name;if(typeof a!="string"||!a)throw $n.create("bad-app-name",{appName:String(a)});if(t||(t=du()),!t)throw $n.create("no-options");const s=Es.get(a);if(s){if(li(t,s.options)&&li(i,s.config))return s;throw $n.create("duplicate-app",{appName:a})}const o=new Wm(a);for(const c of Yr.values())o.addComponent(c);const l=new Ff(t,i,o);return Es.set(a,l),l}function To(n=Qr){const e=Es.get(n);if(!e&&n===Qr&&du())return Io();if(!e)throw $n.create("no-app",{appName:n});return e}function Xt(n,e,t){let i=Vf[n]??n;t&&(i+=`-${t}`);const a=i.match(/\s|\//),s=e.match(/\s|\//);if(a||s){const o=[`Unable to register library "${i}" with version "${e}":`];a&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),hn.warn(o.join(" "));return}ci(new Bn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}const Uf="firebase-heartbeat-database",jf=1,Ia="firebase-heartbeat-store";let Lr=null;function fu(){return Lr||(Lr=rf(Uf,jf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ia)}catch(t){console.warn(t)}}}}).catch(n=>{throw $n.create("idb-open",{originalErrorMessage:n.message})})),Lr}async function qf(n){try{const t=(await fu()).transaction(Ia),i=await t.objectStore(Ia).get(gu(n));return await t.done,i}catch(e){if(e instanceof rn)hn.warn(e.message);else{const t=$n.create("idb-get",{originalErrorMessage:e?.message});hn.warn(t.message)}}}async function wc(n,e){try{const i=(await fu()).transaction(Ia,"readwrite");await i.objectStore(Ia).put(e,gu(n)),await i.done}catch(t){if(t instanceof rn)hn.warn(t.message);else{const i=$n.create("idb-set",{originalErrorMessage:t?.message});hn.warn(i.message)}}}function gu(n){return`${n.name}!${n.options.appId}`}const Hf=1024,Wf=30;class Gf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Qf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=_c();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Wf){const a=Yf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){hn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=_c(),{heartbeatsToSend:t,unsentEntries:i}=Kf(this._heartbeatsCache.heartbeats),a=xs(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(e){return hn.warn(e),""}}}function _c(){return new Date().toISOString().substring(0,10)}function Kf(n,e=Hf){const t=[];let i=n.slice();for(const a of n){const s=t.find(o=>o.agent===a.agent);if(s){if(s.dates.push(a.date),xc(t)>e){s.dates.pop();break}}else if(t.push({agent:a.agent,dates:[a.date]}),xc(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Qf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $m()?Nm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await qf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function xc(n){return xs(JSON.stringify({version:2,heartbeats:n})).length}function Yf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}function Jf(n){ci(new Bn("platform-logger",e=>new cf(e),"PRIVATE")),ci(new Bn("heartbeat",e=>new Gf(e),"PRIVATE")),Xt(Kr,vc,n),Xt(Kr,vc,"esm2020"),Xt("fire-js","")}Jf("");function yu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Xf=yu,vu=new Na("auth","Firebase",yu());const Is=new xo("@firebase/auth");function Zf(n,...e){Is.logLevel<=we.WARN&&Is.warn(`Auth (${vi}): ${n}`,...e)}function us(n,...e){Is.logLevel<=we.ERROR&&Is.error(`Auth (${vi}): ${n}`,...e)}function Ht(n,...e){throw ko(n,...e)}function Zt(n,...e){return ko(n,...e)}function bu(n,e,t){const i={...Xf(),[e]:t};return new Na("auth","Firebase",i).create(e,{appName:n.name})}function cn(n){return bu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ko(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return vu.create(n,...e)}function re(n,e,...t){if(!n)throw ko(e,...t)}function on(n){const e="INTERNAL ASSERTION FAILED: "+n;throw us(e),new Error(e)}function mn(n,e){n||on(e)}function Jr(){return typeof self<"u"&&self.location?.href||""}function eg(){return Ec()==="http:"||Ec()==="https:"}function Ec(){return typeof self<"u"&&self.location?.protocol||null}function tg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(eg()||Pm()||"connection"in navigator)?navigator.onLine:!0}function ng(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}class Oa{constructor(e,t){this.shortDelay=e,this.longDelay=t,mn(t>e,"Short delay should be less than long delay!"),this.isMobile=Am()||Rm()}get(){return tg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}function Ao(n,e){mn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}class wu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;on("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;on("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;on("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const ig={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};const ag=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],sg=new Oa(3e4,6e4);function Gn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Kn(n,e,t,i,a={}){return _u(n,a,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});const l=Ma({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...s};return Cm()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Wn(n.emulatorConfig.host)&&(u.credentials="include"),wu.fetch()(await xu(n,n.config.apiHost,t,l),u)})}async function _u(n,e,t){n._canInitEmulator=!1;const i={...ig,...e};try{const a=new og(n),s=await Promise.race([t(),a.promise]);a.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ns(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ns(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ns(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ns(n,"user-disabled",o);const h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw bu(n,h,u);Ht(n,h)}}catch(a){if(a instanceof rn)throw a;Ht(n,"network-request-failed",{message:String(a)})}}async function Va(n,e,t,i,a={}){const s=await Kn(n,e,t,i,a);return"mfaPendingCredential"in s&&Ht(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function xu(n,e,t,i){const a=`${e}${t}?${i}`,s=n,o=s.config.emulator?Ao(n.config,a):`${n.config.apiScheme}://${a}`;return ag.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function rg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class og{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Zt(this.auth,"network-request-failed")),sg.get())})}}function ns(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const a=Zt(n,e,i);return a.customData._tokenResponse=t,a}function Ic(n){return n!==void 0&&n.enterprise!==void 0}class lg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return rg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function cg(n,e){return Kn(n,"GET","/v2/recaptchaConfig",Gn(n,e))}async function dg(n,e){return Kn(n,"POST","/v1/accounts:delete",e)}async function Ts(n,e){return Kn(n,"POST","/v1/accounts:lookup",e)}function va(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ug(n,e=!1){const t=Ve(n),i=await t.getIdToken(e),a=So(i);re(a&&a.exp&&a.auth_time&&a.iat,t.auth,"internal-error");const s=typeof a.firebase=="object"?a.firebase:void 0,o=s?.sign_in_provider;return{claims:a,token:i,authTime:va(Dr(a.auth_time)),issuedAtTime:va(Dr(a.iat)),expirationTime:va(Dr(a.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Dr(n){return Number(n)*1e3}function So(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return us("JWT malformed, contained fewer than 3 sections"),null;try{const a=ou(t);return a?JSON.parse(a):(us("Failed to decode base64 JWT payload"),null)}catch(a){return us("Caught error parsing JWT payload as JSON",a?.toString()),null}}function Tc(n){const e=So(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Ta(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof rn&&pg(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function pg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}class hg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}class Xr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=va(this.lastLoginAt),this.creationTime=va(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function ks(n){const e=n.auth,t=await n.getIdToken(),i=await Ta(n,Ts(e,{idToken:t}));re(i?.users.length,e,"internal-error");const a=i.users[0];n._notifyReloadListener(a);const s=a.providerUserInfo?.length?Eu(a.providerUserInfo):[],o=fg(n.providerData,s),l=n.isAnonymous,c=!(n.email&&a.passwordHash)&&!o?.length,u=l?c:!1,h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:o,metadata:new Xr(a.createdAt,a.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function mg(n){const e=Ve(n);await ks(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fg(n,e){return[...n.filter(i=>!e.some(a=>a.providerId===i.providerId)),...e]}function Eu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function gg(n,e){const t=await _u(n,{},async()=>{const i=Ma({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:s}=n.config,o=await xu(n,a,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:i};return n.emulatorConfig&&Wn(n.emulatorConfig.host)&&(c.credentials="include"),wu.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yg(n,e){return Kn(n,"POST","/v2/accounts:revokeToken",Gn(n,e))}class Pi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Tc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=Tc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:a,expiresIn:s}=await gg(e,t);this.updateTokensAndExpiration(i,a,Number(s))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:a,expirationTime:s}=t,o=new Pi;return i&&(re(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),a&&(re(typeof a=="string","internal-error",{appName:e}),o.accessToken=a),s&&(re(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pi,this.toJSON())}_performRefresh(){return on("not implemented")}}function Tn(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class jt{constructor({uid:e,auth:t,stsTokenManager:i,...a}){this.providerId="firebase",this.proactiveRefresh=new hg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Xr(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await Ta(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ug(this,e)}reload(){return mg(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new jt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await ks(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Dt(this.auth.app))return Promise.reject(cn(this.auth));const e=await this.getIdToken();return await Ta(this,dg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,a=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:w,emailVerified:b,isAnonymous:R,providerData:M,stsTokenManager:D}=t;re(w&&D,e,"internal-error");const v=Pi.fromJSON(this.name,D);re(typeof w=="string",e,"internal-error"),Tn(i,e.name),Tn(a,e.name),re(typeof b=="boolean",e,"internal-error"),re(typeof R=="boolean",e,"internal-error"),Tn(s,e.name),Tn(o,e.name),Tn(l,e.name),Tn(c,e.name),Tn(u,e.name),Tn(h,e.name);const k=new jt({uid:w,auth:e,email:a,emailVerified:b,displayName:i,isAnonymous:R,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:v,createdAt:u,lastLoginAt:h});return M&&Array.isArray(M)&&(k.providerData=M.map(S=>({...S}))),c&&(k._redirectEventId=c),k}static async _fromIdTokenResponse(e,t,i=!1){const a=new Pi;a.updateFromServerResponse(t);const s=new jt({uid:t.localId,auth:e,stsTokenManager:a,isAnonymous:i});return await ks(s),s}static async _fromGetAccountInfoResponse(e,t,i){const a=t.users[0];re(a.localId!==void 0,"internal-error");const s=a.providerUserInfo!==void 0?Eu(a.providerUserInfo):[],o=!(a.email&&a.passwordHash)&&!s?.length,l=new Pi;l.updateFromIdToken(i);const c=new jt({uid:a.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:s,metadata:new Xr(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!s?.length};return Object.assign(c,u),c}}const kc=new Map;function ln(n){mn(n instanceof Function,"Expected a class definition");let e=kc.get(n);return e?(mn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,kc.set(n,e),e)}class Iu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Iu.type="NONE";const Ac=Iu;function ps(n,e,t){return`firebase:${n}:${e}:${t}`}class Ri{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:a,name:s}=this.auth;this.fullUserKey=ps(this.userKey,a.apiKey,s),this.fullPersistenceKey=ps("persistence",a.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ts(this.auth,{idToken:e}).catch(()=>{});return t?jt._fromGetAccountInfoResponse(this.auth,t,e):null}return jt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Ri(ln(Ac),e,i);const a=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=a[0]||ln(Ac);const o=ps(i,e.config.apiKey,e.name);let l=null;for(const u of t)try{const h=await u._get(o);if(h){let w;if(typeof h=="string"){const b=await Ts(e,{idToken:h}).catch(()=>{});if(!b)break;w=await jt._fromGetAccountInfoResponse(e,b,h)}else w=jt._fromJSON(e,h);u!==s&&(l=w),s=u;break}}catch{}const c=a.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Ri(s,e,i):(s=c[0],l&&await s._set(o,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Ri(s,e,i))}}function Sc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Su(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Tu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pu(e))return"Blackberry";if(Ru(e))return"Webos";if(ku(e))return"Safari";if((e.includes("chrome/")||Au(e))&&!e.includes("edge/"))return"Chrome";if(Cu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function Tu(n=wt()){return/firefox\//i.test(n)}function ku(n=wt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Au(n=wt()){return/crios\//i.test(n)}function Su(n=wt()){return/iemobile/i.test(n)}function Cu(n=wt()){return/android/i.test(n)}function Pu(n=wt()){return/blackberry/i.test(n)}function Ru(n=wt()){return/webos/i.test(n)}function Co(n=wt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function vg(n=wt()){return Co(n)&&!!window.navigator?.standalone}function bg(){return Lm()&&document.documentMode===10}function Lu(n=wt()){return Co(n)||Cu(n)||Ru(n)||Pu(n)||/windows phone/i.test(n)||Su(n)}function Du(n,e=[]){let t;switch(n){case"Browser":t=Sc(wt());break;case"Worker":t=`${Sc(wt())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vi}/${i}`}class wg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=s=>new Promise((o,l)=>{try{const c=e(s);o(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const a of t)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}async function _g(n,e={}){return Kn(n,"GET","/v2/passwordPolicy",Gn(n,e))}const xg=6;class Eg{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??xg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),a&&(t.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let a=0;a<e.length;a++)i=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,a,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}class Ig{constructor(e,t,i,a){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cc(this),this.idTokenSubscription=new Cc(this),this.beforeStateQueue=new wg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=vu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ln(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ri.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ts(this,{idToken:e}),i=await jt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Dt(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!s||s===o)&&l?.user&&(i=l.user,a=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ks(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ng()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Dt(this.app))return Promise.reject(cn(this));const t=e?Ve(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Dt(this.app)?Promise.reject(cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Dt(this.app)?Promise.reject(cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ln(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await _g(this),t=new Eg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Na("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await yg(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ln(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Ri.create(this,[ln(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,a){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,a);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Du(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(Dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Zf(`Error while retrieving App Check token: ${e.error}`),e?.token}}function bi(n){return Ve(n)}class Cc{constructor(e){this.auth=e,this.observer=null,this.addObserver=zm(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let Hs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tg(n){Hs=n}function $u(n){return Hs.loadJS(n)}function kg(){return Hs.recaptchaEnterpriseScript}function Ag(){return Hs.gapiScript}function Sg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Cg{constructor(){this.enterprise=new Pg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Pg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Rg="recaptcha-enterprise",Nu="NO_RECAPTCHA";class Lg{constructor(e){this.type=Rg,this.auth=bi(e)}async verify(e="verify",t=!1){async function i(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{cg(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new lg(c);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function a(s,o,l){const c=window.grecaptcha;Ic(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(Nu)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Cg().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{i(this.auth).then(l=>{if(!t&&Ic(window.grecaptcha))a(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=kg();c.length!==0&&(c+=l),$u(c).then(()=>{a(l,s,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Pc(n,e,t,i=!1,a=!1){const s=new Lg(n);let o;if(a)o=Nu;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Zr(n,e,t,i,a){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Pc(n,e,t,t==="getOobCode");return i(n,s)}else return i(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Pc(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(s)})}function Dg(n,e){const t=qs(n,"auth");if(t.isInitialized()){const a=t.getImmediate(),s=t.getOptions();if(li(s,e??{}))return a;Ht(a,"already-initialized")}return t.initialize({options:e})}function $g(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(ln);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Ng(n,e,t){const i=bi(n);re(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const a=!1,s=Mu(e),{host:o,port:l}=Mg(e),c=l===null?"":`:${l}`,u={url:`${s}//${o}${c}/`},h=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!i._canInitEmulator){re(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),re(li(u,i.config.emulator)&&li(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=u,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,Wn(o)?(wo(`${s}//${o}${c}`),_o("Auth",!0)):Og()}function Mu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Mg(n){const e=Mu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(i);if(a){const s=a[1];return{host:s,port:Rc(i.substr(s.length+1))}}else{const[s,o]=i.split(":");return{host:s,port:Rc(o)}}}function Rc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Og(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}class Po{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return on("not implemented")}_getIdTokenResponse(e){return on("not implemented")}_linkToIdToken(e,t){return on("not implemented")}_getReauthenticationResolver(e){return on("not implemented")}}async function Vg(n,e){return Kn(n,"POST","/v1/accounts:signUp",e)}async function Bg(n,e){return Va(n,"POST","/v1/accounts:signInWithPassword",Gn(n,e))}async function zg(n,e){return Va(n,"POST","/v1/accounts:signInWithEmailLink",Gn(n,e))}async function Fg(n,e){return Va(n,"POST","/v1/accounts:signInWithEmailLink",Gn(n,e))}class ka extends Po{constructor(e,t,i,a=null){super("password",i),this._email=e,this._password=t,this._tenantId=a}static _fromEmailAndPassword(e,t){return new ka(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new ka(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zr(e,t,"signInWithPassword",Bg);case"emailLink":return zg(e,{email:this._email,oobCode:this._password});default:Ht(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zr(e,i,"signUpPassword",Vg);case"emailLink":return Fg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ht(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function Li(n,e){return Va(n,"POST","/v1/accounts:signInWithIdp",Gn(n,e))}const Ug="http://localhost";class di extends Po{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new di(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:a,...s}=t;if(!i||!a)return null;const o=new di(i,a);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Li(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Li(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Li(e,t)}buildRequest(){const e={requestUri:Ug,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ma(t)}return e}}function jg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function qg(n){const e=da(ua(n)).link,t=e?da(ua(e)).deep_link_id:null,i=da(ua(n)).deep_link_id;return(i?da(ua(i)).link:null)||i||t||e||n}class Ro{constructor(e){const t=da(ua(e)),i=t.apiKey??null,a=t.oobCode??null,s=jg(t.mode??null);re(i&&a&&s,"argument-error"),this.apiKey=i,this.operation=s,this.code=a,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=qg(e);try{return new Ro(t)}catch{return null}}}class Fi{constructor(){this.providerId=Fi.PROVIDER_ID}static credential(e,t){return ka._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Ro.parseLink(t);return re(i,"argument-error"),ka._fromEmailAndCode(e,i.code,i.tenantId)}}Fi.PROVIDER_ID="password";Fi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Fi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class Ou{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ba extends Ou{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class kn extends Ba{constructor(){super("facebook.com")}static credential(e){return di._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kn.credential(e.oauthAccessToken)}catch{return null}}}kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";kn.PROVIDER_ID="facebook.com";class An extends Ba{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return di._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return An.credential(t,i)}catch{return null}}}An.GOOGLE_SIGN_IN_METHOD="google.com";An.PROVIDER_ID="google.com";class Sn extends Ba{constructor(){super("github.com")}static credential(e){return di._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.GITHUB_SIGN_IN_METHOD="github.com";Sn.PROVIDER_ID="github.com";class Cn extends Ba{constructor(){super("twitter.com")}static credential(e,t){return di._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Cn.credential(t,i)}catch{return null}}}Cn.TWITTER_SIGN_IN_METHOD="twitter.com";Cn.PROVIDER_ID="twitter.com";async function Hg(n,e){return Va(n,"POST","/v1/accounts:signUp",Gn(n,e))}class ui{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,a=!1){const s=await jt._fromIdTokenResponse(e,i,a),o=Lc(i);return new ui({user:s,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const a=Lc(i);return new ui({user:e,providerId:a,_tokenResponse:i,operationType:t})}}function Lc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}class As extends rn{constructor(e,t,i,a){super(t.code,t.message),this.operationType=i,this.user=a,Object.setPrototypeOf(this,As.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,a){return new As(e,t,i,a)}}function Vu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?As._fromErrorAndOperation(n,s,e,i):s})}async function Wg(n,e,t=!1){const i=await Ta(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ui._forOperation(n,"link",i)}async function Gg(n,e,t=!1){const{auth:i}=n;if(Dt(i.app))return Promise.reject(cn(i));const a="reauthenticate";try{const s=await Ta(n,Vu(i,a,e,n),t);re(s.idToken,i,"internal-error");const o=So(s.idToken);re(o,i,"internal-error");const{sub:l}=o;return re(n.uid===l,i,"user-mismatch"),ui._forOperation(n,a,s)}catch(s){throw s?.code==="auth/user-not-found"&&Ht(i,"user-mismatch"),s}}async function Bu(n,e,t=!1){if(Dt(n.app))return Promise.reject(cn(n));const i="signIn",a=await Vu(n,i,e),s=await ui._fromIdTokenResponse(n,i,a);return t||await n._updateCurrentUser(s.user),s}async function Kg(n,e){return Bu(bi(n),e)}async function zu(n){const e=bi(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Qg(n,e,t){if(Dt(n.app))return Promise.reject(cn(n));const i=bi(n),o=await Zr(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Hg).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&zu(n),c}),l=await ui._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(l.user),l}function Yg(n,e,t){return Dt(n.app)?Promise.reject(cn(n)):Kg(Ve(n),Fi.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&zu(n),i})}function Jg(n,e,t,i){return Ve(n).onIdTokenChanged(e,t,i)}function Xg(n,e,t){return Ve(n).beforeAuthStateChanged(e,t)}function Zg(n,e,t,i){return Ve(n).onAuthStateChanged(e,t,i)}function ey(n){return Ve(n).signOut()}const Ss="__sak";class Fu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ss,"1"),this.storage.removeItem(Ss),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}const ty=1e3,ny=10;class Uu extends Fu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Lu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),a=this.localCache[t];i!==a&&e(t,a,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const a=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);bg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,ny):a()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const a of Array.from(i))a(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},ty)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Uu.type="LOCAL";const iy=Uu;class ju extends Fu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ju.type="SESSION";const qu=ju;function ay(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}class Ws{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(a=>a.isListeningto(e));if(t)return t;const i=new Ws(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:a,data:s}=t.data,o=this.handlersMap[a];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:a});const l=Array.from(o).map(async u=>u(t.origin,s)),c=await ay(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:a,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ws.receivers=[];function Lo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}class sy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let s,o;return new Promise((l,c)=>{const u=Lo("",20);a.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:a,onMessage(w){const b=w;if(b.data.eventId===u)switch(b.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(b.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),a.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[a.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}function en(){return window}function ry(n){en().location.href=n}function Hu(){return typeof en().WorkerGlobalScope<"u"&&typeof en().importScripts=="function"}async function oy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ly(){return navigator?.serviceWorker?.controller||null}function cy(){return Hu()?self:null}const Wu="firebaseLocalStorageDb",dy=1,Cs="firebaseLocalStorage",Gu="fbase_key";class za{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Gs(n,e){return n.transaction([Cs],e?"readwrite":"readonly").objectStore(Cs)}function uy(){const n=indexedDB.deleteDatabase(Wu);return new za(n).toPromise()}function eo(){const n=indexedDB.open(Wu,dy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Cs,{keyPath:Gu})}catch(a){t(a)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Cs)?e(i):(i.close(),await uy(),e(await eo()))})})}async function Dc(n,e,t){const i=Gs(n,!0).put({[Gu]:e,value:t});return new za(i).toPromise()}async function py(n,e){const t=Gs(n,!1).get(e),i=await new za(t).toPromise();return i===void 0?null:i.value}function $c(n,e){const t=Gs(n,!0).delete(e);return new za(t).toPromise()}const hy=800,my=3;class Ku{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await eo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>my)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ws._getInstance(cy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await oy(),!this.activeServiceWorker)return;this.sender=new sy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ly()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await eo();return await Dc(e,Ss,"1"),await $c(e,Ss),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Dc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>py(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$c(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const s=Gs(a,!1).getAll();return new za(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:a,value:s}of e)i.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(s)&&(this.notifyListeners(a,s),t.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!i.has(a)&&(this.notifyListeners(a,null),t.push(a));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const a of Array.from(i))a(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ku.type="LOCAL";const fy=Ku;new Oa(3e4,6e4);function gy(n,e){return e?ln(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}class Do extends Po{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Li(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Li(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Li(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function yy(n){return Bu(n.auth,new Do(n),n.bypassAuthState)}function vy(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Gg(t,new Do(n),n.bypassAuthState)}async function by(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Wg(t,new Do(n),n.bypassAuthState)}class Qu{constructor(e,t,i,a,s=!1){this.auth=e,this.resolver=i,this.user=a,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:a,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:s||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yy;case"linkViaPopup":case"linkViaRedirect":return by;case"reauthViaPopup":case"reauthViaRedirect":return vy;default:Ht(this.auth,"internal-error")}}resolve(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const wy=new Oa(2e3,1e4);class Ci extends Qu{constructor(e,t,i,a,s){super(e,t,a,s),this.provider=i,this.authWindow=null,this.pollId=null,Ci.currentPopupAction&&Ci.currentPopupAction.cancel(),Ci.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){mn(this.filter.length===1,"Popup operations only handle one event");const e=Lo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ci.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,wy.get())};e()}}Ci.currentPopupAction=null;const _y="pendingRedirect",hs=new Map;class xy extends Qu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=hs.get(this.auth._key());if(!e){try{const i=await Ey(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}hs.set(this.auth._key(),e)}return this.bypassAuthState||hs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ey(n,e){const t=ky(e),i=Ty(n);if(!await i._isAvailable())return!1;const a=await i._get(t)==="true";return await i._remove(t),a}function Iy(n,e){hs.set(n._key(),e)}function Ty(n){return ln(n._redirectPersistence)}function ky(n){return ps(_y,n.config.apiKey,n.name)}async function Ay(n,e,t=!1){if(Dt(n.app))return Promise.reject(cn(n));const i=bi(n),a=gy(i,e),o=await new xy(i,a,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}const Sy=600*1e3;class Cy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Py(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Yu(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Zt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(Nc(e))}saveEventToCache(e){this.cachedEventUids.add(Nc(e)),this.lastProcessedEventTime=Date.now()}}function Nc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Yu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Py(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yu(n);default:return!1}}async function Ry(n,e={}){return Kn(n,"GET","/v1/projects",e)}const Ly=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dy=/^https?/;async function $y(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ry(n);for(const t of e)try{if(Ny(t))return}catch{}Ht(n,"unauthorized-domain")}function Ny(n){const e=Jr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Dy.test(t))return!1;if(Ly.test(n))return i===n;const a=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(i)}const My=new Oa(3e4,6e4);function Mc(){const n=en().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Oy(n){return new Promise((e,t)=>{function i(){Mc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mc(),t(Zt(n,"network-request-failed"))},timeout:My.get()})}if(en().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(en().gapi?.load)i();else{const a=Sg("iframefcb");return en()[a]=()=>{gapi.load?i():t(Zt(n,"network-request-failed"))},$u(`${Ag()}?onload=${a}`).catch(s=>t(s))}}).catch(e=>{throw ms=null,e})}let ms=null;function Vy(n){return ms=ms||Oy(n),ms}const By=new Oa(5e3,15e3),zy="__/auth/iframe",Fy="emulator/auth/iframe",Uy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qy(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ao(e,Fy):`https://${n.config.authDomain}/${zy}`,i={apiKey:e.apiKey,appName:n.name,v:vi},a=jy.get(n.config.apiHost);a&&(i.eid=a);const s=n._getFrameworks();return s.length&&(i.fw=s.join(",")),`${t}?${Ma(i).slice(1)}`}async function Hy(n){const e=await Vy(n),t=en().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:qy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Uy,dontclear:!0},i=>new Promise(async(a,s)=>{await i.restyle({setHideOnLeave:!1});const o=Zt(n,"network-request-failed"),l=en().setTimeout(()=>{s(o)},By.get());function c(){en().clearTimeout(l),a(i)}i.ping(c).then(c,()=>{s(o)})}))}const Wy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Gy=500,Ky=600,Qy="_blank",Yy="http://localhost";class Oc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jy(n,e,t,i=Gy,a=Ky){const s=Math.max((window.screen.availHeight-a)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c={...Wy,width:i.toString(),height:a.toString(),top:s,left:o},u=wt().toLowerCase();t&&(l=Au(u)?Qy:t),Tu(u)&&(e=e||Yy,c.scrollbars="yes");const h=Object.entries(c).reduce((b,[R,M])=>`${b}${R}=${M},`,"");if(vg(u)&&l!=="_self")return Xy(e||"",l),new Oc(null);const w=window.open(e||"",l,h);re(w,n,"popup-blocked");try{w.focus()}catch{}return new Oc(w)}function Xy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}const Zy="__/auth/handler",ev="emulator/auth/handler",tv=encodeURIComponent("fac");async function Vc(n,e,t,i,a,s){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:vi,eventId:a};if(e instanceof Ou){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Bm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,w]of Object.entries({}))o[h]=w}if(e instanceof Ba){const h=e.getScopes().filter(w=>w!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const c=await n._getAppCheckToken(),u=c?`#${tv}=${encodeURIComponent(c)}`:"";return`${nv(n)}?${Ma(l).slice(1)}${u}`}function nv({config:n}){return n.emulator?Ao(n,ev):`https://${n.authDomain}/${Zy}`}const $r="webStorageSupport";class iv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qu,this._completeRedirectFn=Ay,this._overrideRedirectResult=Iy}async _openPopup(e,t,i,a){mn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Vc(e,t,i,Jr(),a);return Jy(e,s,Lo())}async _openRedirect(e,t,i,a){await this._originValidation(e);const s=await Vc(e,t,i,Jr(),a);return ry(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:a,promise:s}=this.eventManagers[t];return a?Promise.resolve(a):(mn(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Hy(e),i=new Cy(e);return t.register("authEvent",a=>(re(a?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send($r,{type:$r},a=>{const s=a?.[0]?.[$r];s!==void 0&&t(!!s),Ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=$y(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Lu()||ku()||Co()}}const av=iv;var Bc="@firebase/auth",zc="1.12.0";class sv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function rv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ov(n){ci(new Bn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;re(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Du(n)},u=new Ig(i,a,s,c);return $g(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ci(new Bn("auth-internal",e=>{const t=bi(e.getProvider("auth").getImmediate());return(i=>new sv(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xt(Bc,zc,rv(n)),Xt(Bc,zc,"esm2020")}const lv=300,cv=uu("authIdTokenMaxAge")||lv;let Fc=null;const dv=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>cv)return;const a=t?.token;Fc!==a&&(Fc=a,await fetch(n,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function Ju(n=To()){const e=qs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Dg(n,{popupRedirectResolver:av,persistence:[fy,iy,qu]}),i=uu("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(i,location.origin);if(location.origin===s.origin){const o=dv(s.toString());Xg(t,o,()=>o(t.currentUser)),Jg(t,l=>o(l))}}const a=lu("auth");return a&&Ng(t,`http://${a}`),t}function uv(){return document.getElementsByTagName("head")?.[0]??document}Tg({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=a=>{const s=Zt("internal-error");s.customData=a,t(s)},i.type="text/javascript",i.charset="UTF-8",uv().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ov("Browser");var pv="firebase",hv="12.9.0";Xt(pv,hv,"app");var Uc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Nn,Xu;(function(){var n;function e(f,m){function y(){}y.prototype=m.prototype,f.F=m.prototype,f.prototype=new y,f.prototype.constructor=f,f.D=function(x,E,g){for(var _=Array(arguments.length-2),L=2;L<arguments.length;L++)_[L-2]=arguments[L];return m.prototype[E].apply(x,_)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(f,m,y){y||(y=0);const x=Array(16);if(typeof m=="string")for(var E=0;E<16;++E)x[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;E<16;++E)x[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=f.g[0],y=f.g[1],E=f.g[2];let g=f.g[3],_;_=m+(g^y&(E^g))+x[0]+3614090360&4294967295,m=y+(_<<7&4294967295|_>>>25),_=g+(E^m&(y^E))+x[1]+3905402710&4294967295,g=m+(_<<12&4294967295|_>>>20),_=E+(y^g&(m^y))+x[2]+606105819&4294967295,E=g+(_<<17&4294967295|_>>>15),_=y+(m^E&(g^m))+x[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(g^y&(E^g))+x[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=g+(E^m&(y^E))+x[5]+1200080426&4294967295,g=m+(_<<12&4294967295|_>>>20),_=E+(y^g&(m^y))+x[6]+2821735955&4294967295,E=g+(_<<17&4294967295|_>>>15),_=y+(m^E&(g^m))+x[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(g^y&(E^g))+x[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=g+(E^m&(y^E))+x[9]+2336552879&4294967295,g=m+(_<<12&4294967295|_>>>20),_=E+(y^g&(m^y))+x[10]+4294925233&4294967295,E=g+(_<<17&4294967295|_>>>15),_=y+(m^E&(g^m))+x[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(g^y&(E^g))+x[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=g+(E^m&(y^E))+x[13]+4254626195&4294967295,g=m+(_<<12&4294967295|_>>>20),_=E+(y^g&(m^y))+x[14]+2792965006&4294967295,E=g+(_<<17&4294967295|_>>>15),_=y+(m^E&(g^m))+x[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(E^g&(y^E))+x[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=g+(y^E&(m^y))+x[6]+3225465664&4294967295,g=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(g^m))+x[11]+643717713&4294967295,E=g+(_<<14&4294967295|_>>>18),_=y+(g^m&(E^g))+x[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^g&(y^E))+x[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=g+(y^E&(m^y))+x[10]+38016083&4294967295,g=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(g^m))+x[15]+3634488961&4294967295,E=g+(_<<14&4294967295|_>>>18),_=y+(g^m&(E^g))+x[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^g&(y^E))+x[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=g+(y^E&(m^y))+x[14]+3275163606&4294967295,g=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(g^m))+x[3]+4107603335&4294967295,E=g+(_<<14&4294967295|_>>>18),_=y+(g^m&(E^g))+x[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^g&(y^E))+x[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=g+(y^E&(m^y))+x[2]+4243563512&4294967295,g=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(g^m))+x[7]+1735328473&4294967295,E=g+(_<<14&4294967295|_>>>18),_=y+(g^m&(E^g))+x[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(y^E^g)+x[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=g+(m^y^E)+x[8]+2272392833&4294967295,g=m+(_<<11&4294967295|_>>>21),_=E+(g^m^y)+x[11]+1839030562&4294967295,E=g+(_<<16&4294967295|_>>>16),_=y+(E^g^m)+x[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^g)+x[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=g+(m^y^E)+x[4]+1272893353&4294967295,g=m+(_<<11&4294967295|_>>>21),_=E+(g^m^y)+x[7]+4139469664&4294967295,E=g+(_<<16&4294967295|_>>>16),_=y+(E^g^m)+x[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^g)+x[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=g+(m^y^E)+x[0]+3936430074&4294967295,g=m+(_<<11&4294967295|_>>>21),_=E+(g^m^y)+x[3]+3572445317&4294967295,E=g+(_<<16&4294967295|_>>>16),_=y+(E^g^m)+x[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^g)+x[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=g+(m^y^E)+x[12]+3873151461&4294967295,g=m+(_<<11&4294967295|_>>>21),_=E+(g^m^y)+x[15]+530742520&4294967295,E=g+(_<<16&4294967295|_>>>16),_=y+(E^g^m)+x[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(E^(y|~g))+x[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=g+(y^(m|~E))+x[7]+1126891415&4294967295,g=m+(_<<10&4294967295|_>>>22),_=E+(m^(g|~y))+x[14]+2878612391&4294967295,E=g+(_<<15&4294967295|_>>>17),_=y+(g^(E|~m))+x[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~g))+x[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=g+(y^(m|~E))+x[3]+2399980690&4294967295,g=m+(_<<10&4294967295|_>>>22),_=E+(m^(g|~y))+x[10]+4293915773&4294967295,E=g+(_<<15&4294967295|_>>>17),_=y+(g^(E|~m))+x[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~g))+x[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=g+(y^(m|~E))+x[15]+4264355552&4294967295,g=m+(_<<10&4294967295|_>>>22),_=E+(m^(g|~y))+x[6]+2734768916&4294967295,E=g+(_<<15&4294967295|_>>>17),_=y+(g^(E|~m))+x[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~g))+x[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=g+(y^(m|~E))+x[11]+3174756917&4294967295,g=m+(_<<10&4294967295|_>>>22),_=E+(m^(g|~y))+x[2]+718787259&4294967295,E=g+(_<<15&4294967295|_>>>17),_=y+(g^(E|~m))+x[9]+3951481745&4294967295,f.g[0]=f.g[0]+m&4294967295,f.g[1]=f.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,f.g[2]=f.g[2]+E&4294967295,f.g[3]=f.g[3]+g&4294967295}i.prototype.v=function(f,m){m===void 0&&(m=f.length);const y=m-this.blockSize,x=this.C;let E=this.h,g=0;for(;g<m;){if(E==0)for(;g<=y;)a(this,f,g),g+=this.blockSize;if(typeof f=="string"){for(;g<m;)if(x[E++]=f.charCodeAt(g++),E==this.blockSize){a(this,x),E=0;break}}else for(;g<m;)if(x[E++]=f[g++],E==this.blockSize){a(this,x),E=0;break}}this.h=E,this.o+=m},i.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var m=1;m<f.length-8;++m)f[m]=0;m=this.o*8;for(var y=f.length-8;y<f.length;++y)f[y]=m&255,m/=256;for(this.v(f),f=Array(16),m=0,y=0;y<4;++y)for(let x=0;x<32;x+=8)f[m++]=this.g[y]>>>x&255;return f};function s(f,m){var y=l;return Object.prototype.hasOwnProperty.call(y,f)?y[f]:y[f]=m(f)}function o(f,m){this.h=m;const y=[];let x=!0;for(let E=f.length-1;E>=0;E--){const g=f[E]|0;x&&g==m||(y[E]=g,x=!1)}this.g=y}var l={};function c(f){return-128<=f&&f<128?s(f,function(m){return new o([m|0],m<0?-1:0)}):new o([f|0],f<0?-1:0)}function u(f){if(isNaN(f)||!isFinite(f))return w;if(f<0)return v(u(-f));const m=[];let y=1;for(let x=0;f>=y;x++)m[x]=f/y|0,y*=4294967296;return new o(m,0)}function h(f,m){if(f.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(f.charAt(0)=="-")return v(h(f.substring(1),m));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=u(Math.pow(m,8));let x=w;for(let g=0;g<f.length;g+=8){var E=Math.min(8,f.length-g);const _=parseInt(f.substring(g,g+E),m);E<8?(E=u(Math.pow(m,E)),x=x.j(E).add(u(_))):(x=x.j(y),x=x.add(u(_)))}return x}var w=c(0),b=c(1),R=c(16777216);n=o.prototype,n.m=function(){if(D(this))return-v(this).m();let f=0,m=1;for(let y=0;y<this.g.length;y++){const x=this.i(y);f+=(x>=0?x:4294967296+x)*m,m*=4294967296}return f},n.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(M(this))return"0";if(D(this))return"-"+v(this).toString(f);const m=u(Math.pow(f,6));var y=this;let x="";for(;;){const E=C(y,m).g;y=k(y,E.j(m));let g=((y.g.length>0?y.g[0]:y.h)>>>0).toString(f);if(y=E,M(y))return g+x;for(;g.length<6;)g="0"+g;x=g+x}},n.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function M(f){if(f.h!=0)return!1;for(let m=0;m<f.g.length;m++)if(f.g[m]!=0)return!1;return!0}function D(f){return f.h==-1}n.l=function(f){return f=k(this,f),D(f)?-1:M(f)?0:1};function v(f){const m=f.g.length,y=[];for(let x=0;x<m;x++)y[x]=~f.g[x];return new o(y,~f.h).add(b)}n.abs=function(){return D(this)?v(this):this},n.add=function(f){const m=Math.max(this.g.length,f.g.length),y=[];let x=0;for(let E=0;E<=m;E++){let g=x+(this.i(E)&65535)+(f.i(E)&65535),_=(g>>>16)+(this.i(E)>>>16)+(f.i(E)>>>16);x=_>>>16,g&=65535,_&=65535,y[E]=_<<16|g}return new o(y,y[y.length-1]&-2147483648?-1:0)};function k(f,m){return f.add(v(m))}n.j=function(f){if(M(this)||M(f))return w;if(D(this))return D(f)?v(this).j(v(f)):v(v(this).j(f));if(D(f))return v(this.j(v(f)));if(this.l(R)<0&&f.l(R)<0)return u(this.m()*f.m());const m=this.g.length+f.g.length,y=[];for(var x=0;x<2*m;x++)y[x]=0;for(x=0;x<this.g.length;x++)for(let E=0;E<f.g.length;E++){const g=this.i(x)>>>16,_=this.i(x)&65535,L=f.i(E)>>>16,P=f.i(E)&65535;y[2*x+2*E]+=_*P,S(y,2*x+2*E),y[2*x+2*E+1]+=g*P,S(y,2*x+2*E+1),y[2*x+2*E+1]+=_*L,S(y,2*x+2*E+1),y[2*x+2*E+2]+=g*L,S(y,2*x+2*E+2)}for(f=0;f<m;f++)y[f]=y[2*f+1]<<16|y[2*f];for(f=m;f<2*m;f++)y[f]=0;return new o(y,0)};function S(f,m){for(;(f[m]&65535)!=f[m];)f[m+1]+=f[m]>>>16,f[m]&=65535,m++}function $(f,m){this.g=f,this.h=m}function C(f,m){if(M(m))throw Error("division by zero");if(M(f))return new $(w,w);if(D(f))return m=C(v(f),m),new $(v(m.g),v(m.h));if(D(m))return m=C(f,v(m)),new $(v(m.g),m.h);if(f.g.length>30){if(D(f)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var y=b,x=m;x.l(f)<=0;)y=T(y),x=T(x);var E=A(y,1),g=A(x,1);for(x=A(x,2),y=A(y,2);!M(x);){var _=g.add(x);_.l(f)<=0&&(E=E.add(y),g=_),x=A(x,1),y=A(y,1)}return m=k(f,E.j(m)),new $(E,m)}for(E=w;f.l(m)>=0;){for(y=Math.max(1,Math.floor(f.m()/m.m())),x=Math.ceil(Math.log(y)/Math.LN2),x=x<=48?1:Math.pow(2,x-48),g=u(y),_=g.j(m);D(_)||_.l(f)>0;)y-=x,g=u(y),_=g.j(m);M(g)&&(g=b),E=E.add(g),f=k(f,_)}return new $(E,f)}n.B=function(f){return C(this,f).h},n.and=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)&f.i(x);return new o(y,this.h&f.h)},n.or=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)|f.i(x);return new o(y,this.h|f.h)},n.xor=function(f){const m=Math.max(this.g.length,f.g.length),y=[];for(let x=0;x<m;x++)y[x]=this.i(x)^f.i(x);return new o(y,this.h^f.h)};function T(f){const m=f.g.length+1,y=[];for(let x=0;x<m;x++)y[x]=f.i(x)<<1|f.i(x-1)>>>31;return new o(y,f.h)}function A(f,m){const y=m>>5;m%=32;const x=f.g.length-y,E=[];for(let g=0;g<x;g++)E[g]=m>0?f.i(g+y)>>>m|f.i(g+y+1)<<32-m:f.i(g+y);return new o(E,f.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,Xu=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,Nn=o}).apply(typeof Uc<"u"?Uc:typeof self<"u"?self:typeof window<"u"?window:{});var is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Zu,pa,ep,fs,to,tp,np,ip;(function(){var n,e=Object.defineProperty;function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof is=="object"&&is];for(var d=0;d<r.length;++d){var p=r[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var i=t(this);function a(r,d){if(d)e:{var p=i;r=r.split(".");for(var I=0;I<r.length-1;I++){var O=r[I];if(!(O in p))break e;p=p[O]}r=r[r.length-1],I=p[r],d=d(I),d!=I&&d!=null&&e(p,r,{configurable:!0,writable:!0,value:d})}}a("Symbol.dispose",function(r){return r||Symbol("Symbol.dispose")}),a("Array.prototype.values",function(r){return r||function(){return this[Symbol.iterator]()}}),a("Object.entries",function(r){return r||function(d){var p=[],I;for(I in d)Object.prototype.hasOwnProperty.call(d,I)&&p.push([I,d[I]]);return p}});var s=s||{},o=this||self;function l(r){var d=typeof r;return d=="object"&&r!=null||d=="function"}function c(r,d,p){return r.call.apply(r.bind,arguments)}function u(r,d,p){return u=c,u.apply(null,arguments)}function h(r,d){var p=Array.prototype.slice.call(arguments,1);return function(){var I=p.slice();return I.push.apply(I,arguments),r.apply(this,I)}}function w(r,d){function p(){}p.prototype=d.prototype,r.Z=d.prototype,r.prototype=new p,r.prototype.constructor=r,r.Ob=function(I,O,U){for(var Y=Array(arguments.length-2),he=2;he<arguments.length;he++)Y[he-2]=arguments[he];return d.prototype[O].apply(I,Y)}}var b=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?r=>r&&AsyncContext.Snapshot.wrap(r):r=>r;function R(r){const d=r.length;if(d>0){const p=Array(d);for(let I=0;I<d;I++)p[I]=r[I];return p}return[]}function M(r,d){for(let I=1;I<arguments.length;I++){const O=arguments[I];var p=typeof O;if(p=p!="object"?p:O?Array.isArray(O)?"array":p:"null",p=="array"||p=="object"&&typeof O.length=="number"){p=r.length||0;const U=O.length||0;r.length=p+U;for(let Y=0;Y<U;Y++)r[p+Y]=O[Y]}else r.push(O)}}class D{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function v(r){o.setTimeout(()=>{throw r},0)}function k(){var r=f;let d=null;return r.g&&(d=r.g,r.g=r.g.next,r.g||(r.h=null),d.next=null),d}class S{constructor(){this.h=this.g=null}add(d,p){const I=$.get();I.set(d,p),this.h?this.h.next=I:this.g=I,this.h=I}}var $=new D(()=>new C,r=>r.reset());class C{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let T,A=!1,f=new S,m=()=>{const r=Promise.resolve(void 0);T=()=>{r.then(y)}};function y(){for(var r;r=k();){try{r.h.call(r.g)}catch(p){v(p)}var d=$;d.j(r),d.h<100&&(d.h++,r.next=d.g,d.g=r)}A=!1}function x(){this.u=this.u,this.C=this.C}x.prototype.u=!1,x.prototype.dispose=function(){this.u||(this.u=!0,this.N())},x.prototype[Symbol.dispose]=function(){this.dispose()},x.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(r,d){this.type=r,this.g=this.target=d,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var g=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var r=!1,d=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const p=()=>{};o.addEventListener("test",p,d),o.removeEventListener("test",p,d)}catch{}return r})();function _(r){return/^[\s\xa0]*$/.test(r)}function L(r,d){E.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r&&this.init(r,d)}w(L,E),L.prototype.init=function(r,d){const p=this.type=r.type,I=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;this.target=r.target||r.srcElement,this.g=d,d=r.relatedTarget,d||(p=="mouseover"?d=r.fromElement:p=="mouseout"&&(d=r.toElement)),this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=r.pointerType,this.state=r.state,this.i=r,r.defaultPrevented&&L.Z.h.call(this)},L.prototype.h=function(){L.Z.h.call(this);const r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var P="closure_listenable_"+(Math.random()*1e6|0),K=0;function j(r,d,p,I,O){this.listener=r,this.proxy=null,this.src=d,this.type=p,this.capture=!!I,this.ha=O,this.key=++K,this.da=this.fa=!1}function Q(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function J(r,d,p){for(const I in r)d.call(p,r[I],I,r)}function X(r,d){for(const p in r)d.call(void 0,r[p],p,r)}function se(r){const d={};for(const p in r)d[p]=r[p];return d}const ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function le(r,d){let p,I;for(let O=1;O<arguments.length;O++){I=arguments[O];for(p in I)r[p]=I[p];for(let U=0;U<ce.length;U++)p=ce[U],Object.prototype.hasOwnProperty.call(I,p)&&(r[p]=I[p])}}function pe(r){this.src=r,this.g={},this.h=0}pe.prototype.add=function(r,d,p,I,O){const U=r.toString();r=this.g[U],r||(r=this.g[U]=[],this.h++);const Y=Oe(r,d,I,O);return Y>-1?(d=r[Y],p||(d.fa=!1)):(d=new j(d,this.src,U,!!I,O),d.fa=p,r.push(d)),d};function ye(r,d){const p=d.type;if(p in r.g){var I=r.g[p],O=Array.prototype.indexOf.call(I,d,void 0),U;(U=O>=0)&&Array.prototype.splice.call(I,O,1),U&&(Q(d),r.g[p].length==0&&(delete r.g[p],r.h--))}}function Oe(r,d,p,I){for(let O=0;O<r.length;++O){const U=r[O];if(!U.da&&U.listener==d&&U.capture==!!p&&U.ha==I)return O}return-1}var Ne="closure_lm_"+(Math.random()*1e6|0),ke={};function je(r,d,p,I,O){if(Array.isArray(d)){for(let U=0;U<d.length;U++)je(r,d[U],p,I,O);return null}return p=rt(p),r&&r[P]?r.J(d,p,l(I)?!!I.capture:!1,O):_t(r,d,p,!1,I,O)}function _t(r,d,p,I,O,U){if(!d)throw Error("Invalid event type");const Y=l(O)?!!O.capture:!!O;let he=Be(r);if(he||(r[Ne]=he=new pe(r)),p=he.add(d,p,I,Y,U),p.proxy)return p;if(I=ut(),p.proxy=I,I.src=r,I.listener=p,r.addEventListener)g||(O=Y),O===void 0&&(O=!1),r.addEventListener(d.toString(),I,O);else if(r.attachEvent)r.attachEvent(ae(d.toString()),I);else if(r.addListener&&r.removeListener)r.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return p}function ut(){function r(p){return d.call(r.src,r.listener,p)}const d=Pe;return r}function De(r,d,p,I,O){if(Array.isArray(d))for(var U=0;U<d.length;U++)De(r,d[U],p,I,O);else I=l(I)?!!I.capture:!!I,p=rt(p),r&&r[P]?(r=r.i,U=String(d).toString(),U in r.g&&(d=r.g[U],p=Oe(d,p,I,O),p>-1&&(Q(d[p]),Array.prototype.splice.call(d,p,1),d.length==0&&(delete r.g[U],r.h--)))):r&&(r=Be(r))&&(d=r.g[d.toString()],r=-1,d&&(r=Oe(d,p,I,O)),(p=r>-1?d[r]:null)&&Ee(p))}function Ee(r){if(typeof r!="number"&&r&&!r.da){var d=r.src;if(d&&d[P])ye(d.i,r);else{var p=r.type,I=r.proxy;d.removeEventListener?d.removeEventListener(p,I,r.capture):d.detachEvent?d.detachEvent(ae(p),I):d.addListener&&d.removeListener&&d.removeListener(I),(p=Be(d))?(ye(p,r),p.h==0&&(p.src=null,d[Ne]=null)):Q(r)}}}function ae(r){return r in ke?ke[r]:ke[r]="on"+r}function Pe(r,d){if(r.da)r=!0;else{d=new L(d,this);const p=r.listener,I=r.ha||r.src;r.fa&&Ee(r),r=p.call(I,d)}return r}function Be(r){return r=r[Ne],r instanceof pe?r:null}var me="__closure_events_fn_"+(Math.random()*1e9>>>0);function rt(r){return typeof r=="function"?r:(r[me]||(r[me]=function(d){return r.handleEvent(d)}),r[me])}function fe(){x.call(this),this.i=new pe(this),this.M=this,this.G=null}w(fe,x),fe.prototype[P]=!0,fe.prototype.removeEventListener=function(r,d,p,I){De(this,r,d,p,I)};function ve(r,d){var p,I=r.G;if(I)for(p=[];I;I=I.G)p.push(I);if(r=r.M,I=d.type||d,typeof d=="string")d=new E(d,r);else if(d instanceof E)d.target=d.target||r;else{var O=d;d=new E(I,r),le(d,O)}O=!0;let U,Y;if(p)for(Y=p.length-1;Y>=0;Y--)U=d.g=p[Y],O=it(U,I,!0,d)&&O;if(U=d.g=r,O=it(U,I,!0,d)&&O,O=it(U,I,!1,d)&&O,p)for(Y=0;Y<p.length;Y++)U=d.g=p[Y],O=it(U,I,!1,d)&&O}fe.prototype.N=function(){if(fe.Z.N.call(this),this.i){var r=this.i;for(const d in r.g){const p=r.g[d];for(let I=0;I<p.length;I++)Q(p[I]);delete r.g[d],r.h--}}this.G=null},fe.prototype.J=function(r,d,p,I){return this.i.add(String(r),d,!1,p,I)},fe.prototype.K=function(r,d,p,I){return this.i.add(String(r),d,!0,p,I)};function it(r,d,p,I){if(d=r.i.g[String(d)],!d)return!0;d=d.concat();let O=!0;for(let U=0;U<d.length;++U){const Y=d[U];if(Y&&!Y.da&&Y.capture==p){const he=Y.listener,at=Y.ha||Y.src;Y.fa&&ye(r.i,Y),O=he.call(at,I)!==!1&&O}}return O&&!I.defaultPrevented}function qe(r,d){if(typeof r!="function")if(r&&typeof r.handleEvent=="function")r=u(r.handleEvent,r);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:o.setTimeout(r,d||0)}function xt(r){r.g=qe(()=>{r.g=null,r.i&&(r.i=!1,xt(r))},r.l);const d=r.h;r.h=null,r.m.apply(null,d)}class ot extends x{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:xt(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ze(r){x.call(this),this.h=r,this.g={}}w(Ze,x);var Gt=[];function Jn(r){J(r.g,function(d,p){this.g.hasOwnProperty(p)&&Ee(d)},r),r.g={}}Ze.prototype.N=function(){Ze.Z.N.call(this),Jn(this)},Ze.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gi=o.JSON.stringify,z=o.JSON.parse,N=class{stringify(r){return o.JSON.stringify(r,void 0)}parse(r){return o.JSON.parse(r,void 0)}};function F(){}function G(){}var W={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function te(){E.call(this,"d")}w(te,E);function ne(){E.call(this,"c")}w(ne,E);var be={},He=null;function We(){return He=He||new fe}be.Ia="serverreachability";function Et(r){E.call(this,be.Ia,r)}w(Et,E);function kt(r){const d=We();ve(d,new Et(d))}be.STAT_EVENT="statevent";function Pt(r,d){E.call(this,be.STAT_EVENT,r),this.stat=d}w(Pt,E);function Te(r){const d=We();ve(d,new Pt(d,r))}be.Ja="timingevent";function Mt(r,d){E.call(this,be.Ja,r),this.size=d}w(Mt,E);function gt(r,d){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){r()},d)}function Re(){this.g=!0}Re.prototype.ua=function(){this.g=!1};function ze(r,d,p,I,O,U){r.info(function(){if(r.g)if(U){var Y="",he=U.split("&");for(let Le=0;Le<he.length;Le++){var at=he[Le].split("=");if(at.length>1){const ct=at[0];at=at[1];const Qt=ct.split("_");Y=Qt.length>=2&&Qt[1]=="type"?Y+(ct+"="+at+"&"):Y+(ct+"=redacted&")}}}else Y=null;else Y=U;return"XMLHTTP REQ ("+I+") [attempt "+O+"]: "+d+`
`+p+`
`+Y})}function Fe(r,d,p,I,O,U,Y){r.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+O+"]: "+d+`
`+p+`
`+U+" "+Y})}function Ce(r,d,p,I){r.info(function(){return"XMLHTTP TEXT ("+d+"): "+It(r,p)+(I?" "+I:"")})}function lt(r,d){r.info(function(){return"TIMEOUT: "+d})}Re.prototype.info=function(){};function It(r,d){if(!r.g)return d;if(!d)return null;try{const U=JSON.parse(d);if(U){for(r=0;r<U.length;r++)if(Array.isArray(U[r])){var p=U[r];if(!(p.length<2)){var I=p[1];if(Array.isArray(I)&&!(I.length<1)){var O=I[0];if(O!="noop"&&O!="stop"&&O!="close")for(let Y=1;Y<I.length;Y++)I[Y]=""}}}}return Gi(U)}catch{return d}}var Ot={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},kl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Al;function mr(){}w(mr,F),mr.prototype.g=function(){return new XMLHttpRequest},Al=new mr;function Ki(r){return encodeURIComponent(String(r))}function Qh(r){var d=1;r=r.split(":");const p=[];for(;d>0&&r.length;)p.push(r.shift()),d--;return r.length&&p.push(r.join(":")),p}function bn(r,d,p,I){this.j=r,this.i=d,this.l=p,this.S=I||1,this.V=new Ze(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Sl}function Sl(){this.i=null,this.g="",this.h=!1}var Cl={},fr={};function gr(r,d,p){r.M=1,r.A=Ka(Kt(d)),r.u=p,r.R=!0,Pl(r,null)}function Pl(r,d){r.F=Date.now(),Ga(r),r.B=Kt(r.A);var p=r.B,I=r.S;Array.isArray(I)||(I=[String(I)]),jl(p.i,"t",I),r.C=0,p=r.j.L,r.h=new Sl,r.g=oc(r.j,p?d:null,!r.u),r.P>0&&(r.O=new ot(u(r.Y,r,r.g),r.P)),d=r.V,p=r.g,I=r.ba;var O="readystatechange";Array.isArray(O)||(O&&(Gt[0]=O.toString()),O=Gt);for(let U=0;U<O.length;U++){const Y=je(p,O[U],I||d.handleEvent,!1,d.h||d);if(!Y)break;d.g[Y.key]=Y}d=r.J?se(r.J):{},r.u?(r.v||(r.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.B,r.v,r.u,d)):(r.v="GET",r.g.ea(r.B,r.v,null,d)),kt(),ze(r.i,r.v,r.B,r.l,r.S,r.u)}bn.prototype.ba=function(r){r=r.target;const d=this.O;d&&xn(r)==3?d.j():this.Y(r)},bn.prototype.Y=function(r){try{if(r==this.g)e:{const he=xn(this.g),at=this.g.ya(),Le=this.g.ca();if(!(he<3)&&(he!=3||this.g&&(this.h.h||this.g.la()||Yl(this.g)))){this.K||he!=4||at==7||(at==8||Le<=0?kt(3):kt(2)),yr(this);var d=this.g.ca();this.X=d;var p=Yh(this);if(this.o=d==200,Fe(this.i,this.v,this.B,this.l,this.S,he,d),this.o){if(this.U&&!this.L){t:{if(this.g){var I,O=this.g;if((I=O.g?O.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(I)){var U=I;break t}}U=null}if(r=U)Ce(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,vr(this,r);else{this.o=!1,this.m=3,Te(12),Xn(this),Qi(this);break e}}if(this.R){r=!0;let ct;for(;!this.K&&this.C<p.length;)if(ct=Jh(this,p),ct==fr){he==4&&(this.m=4,Te(14),r=!1),Ce(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==Cl){this.m=4,Te(15),Ce(this.i,this.l,p,"[Invalid Chunk]"),r=!1;break}else Ce(this.i,this.l,ct,null),vr(this,ct);if(Rl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||p.length!=0||this.h.h||(this.m=1,Te(16),r=!1),this.o=this.o&&r,!r)Ce(this.i,this.l,p,"[Invalid Chunked Response]"),Xn(this),Qi(this);else if(p.length>0&&!this.W){this.W=!0;var Y=this.j;Y.g==this&&Y.aa&&!Y.P&&(Y.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),kr(Y),Y.P=!0,Te(11))}}else Ce(this.i,this.l,p,null),vr(this,p);he==4&&Xn(this),this.o&&!this.K&&(he==4?ic(this.j,this):(this.o=!1,Ga(this)))}else um(this.g),d==400&&p.indexOf("Unknown SID")>0?(this.m=3,Te(12)):(this.m=0,Te(13)),Xn(this),Qi(this)}}}catch{}};function Yh(r){if(!Rl(r))return r.g.la();const d=Yl(r.g);if(d==="")return"";let p="";const I=d.length,O=xn(r.g)==4;if(!r.h.i){if(typeof TextDecoder>"u")return Xn(r),Qi(r),"";r.h.i=new o.TextDecoder}for(let U=0;U<I;U++)r.h.h=!0,p+=r.h.i.decode(d[U],{stream:!(O&&U==I-1)});return d.length=0,r.h.g+=p,r.C=0,r.h.g}function Rl(r){return r.g?r.v=="GET"&&r.M!=2&&r.j.Aa:!1}function Jh(r,d){var p=r.C,I=d.indexOf(`
`,p);return I==-1?fr:(p=Number(d.substring(p,I)),isNaN(p)?Cl:(I+=1,I+p>d.length?fr:(d=d.slice(I,I+p),r.C=I+p,d)))}bn.prototype.cancel=function(){this.K=!0,Xn(this)};function Ga(r){r.T=Date.now()+r.H,Ll(r,r.H)}function Ll(r,d){if(r.D!=null)throw Error("WatchDog timer not null");r.D=gt(u(r.aa,r),d)}function yr(r){r.D&&(o.clearTimeout(r.D),r.D=null)}bn.prototype.aa=function(){this.D=null;const r=Date.now();r-this.T>=0?(lt(this.i,this.B),this.M!=2&&(kt(),Te(17)),Xn(this),this.m=2,Qi(this)):Ll(this,this.T-r)};function Qi(r){r.j.I==0||r.K||ic(r.j,r)}function Xn(r){yr(r);var d=r.O;d&&typeof d.dispose=="function"&&d.dispose(),r.O=null,Jn(r.V),r.g&&(d=r.g,r.g=null,d.abort(),d.dispose())}function vr(r,d){try{var p=r.j;if(p.I!=0&&(p.g==r||br(p.h,r))){if(!r.L&&br(p.h,r)&&p.I==3){try{var I=p.Ba.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var O=I;if(O[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<r.F)Za(p),Ja(p);else break e;Tr(p),Te(18)}}else p.xa=O[1],0<p.xa-p.K&&O[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=gt(u(p.Va,p),6e3));Nl(p.h)<=1&&p.ta&&(p.ta=void 0)}else ei(p,11)}else if((r.L||p.g==r)&&Za(p),!_(d))for(O=p.Ba.g.parse(d),d=0;d<O.length;d++){let Le=O[d];const ct=Le[0];if(!(ct<=p.K))if(p.K=ct,Le=Le[1],p.I==2)if(Le[0]=="c"){p.M=Le[1],p.ba=Le[2];const Qt=Le[3];Qt!=null&&(p.ka=Qt,p.j.info("VER="+p.ka));const ti=Le[4];ti!=null&&(p.za=ti,p.j.info("SVER="+p.za));const En=Le[5];En!=null&&typeof En=="number"&&En>0&&(I=1.5*En,p.O=I,p.j.info("backChannelRequestTimeoutMs_="+I)),I=p;const In=r.g;if(In){const ts=In.g?In.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ts){var U=I.h;U.g||ts.indexOf("spdy")==-1&&ts.indexOf("quic")==-1&&ts.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(wr(U,U.h),U.h=null))}if(I.G){const Ar=In.g?In.g.getResponseHeader("X-HTTP-Session-Id"):null;Ar&&(I.wa=Ar,Me(I.J,I.G,Ar))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-r.F,p.j.info("Handshake RTT: "+p.T+"ms")),I=p;var Y=r;if(I.na=rc(I,I.L?I.ba:null,I.W),Y.L){Ml(I.h,Y);var he=Y,at=I.O;at&&(he.H=at),he.D&&(yr(he),Ga(he)),I.g=Y}else tc(I);p.i.length>0&&Xa(p)}else Le[0]!="stop"&&Le[0]!="close"||ei(p,7);else p.I==3&&(Le[0]=="stop"||Le[0]=="close"?Le[0]=="stop"?ei(p,7):Ir(p):Le[0]!="noop"&&p.l&&p.l.qa(Le),p.A=0)}}kt(4)}catch{}}var Xh=class{constructor(r,d){this.g=r,this.map=d}};function Dl(r){this.l=r||10,o.PerformanceNavigationTiming?(r=o.performance.getEntriesByType("navigation"),r=r.length>0&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $l(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function Nl(r){return r.h?1:r.g?r.g.size:0}function br(r,d){return r.h?r.h==d:r.g?r.g.has(d):!1}function wr(r,d){r.g?r.g.add(d):r.h=d}function Ml(r,d){r.h&&r.h==d?r.h=null:r.g&&r.g.has(d)&&r.g.delete(d)}Dl.prototype.cancel=function(){if(this.i=Ol(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function Ol(r){if(r.h!=null)return r.i.concat(r.h.G);if(r.g!=null&&r.g.size!==0){let d=r.i;for(const p of r.g.values())d=d.concat(p.G);return d}return R(r.i)}var Vl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zh(r,d){if(r){r=r.split("&");for(let p=0;p<r.length;p++){const I=r[p].indexOf("=");let O,U=null;I>=0?(O=r[p].substring(0,I),U=r[p].substring(I+1)):O=r[p],d(O,U?decodeURIComponent(U.replace(/\+/g," ")):"")}}}function wn(r){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;r instanceof wn?(this.l=r.l,Yi(this,r.j),this.o=r.o,this.g=r.g,Ji(this,r.u),this.h=r.h,_r(this,ql(r.i)),this.m=r.m):r&&(d=String(r).match(Vl))?(this.l=!1,Yi(this,d[1]||"",!0),this.o=Xi(d[2]||""),this.g=Xi(d[3]||"",!0),Ji(this,d[4]),this.h=Xi(d[5]||"",!0),_r(this,d[6]||"",!0),this.m=Xi(d[7]||"")):(this.l=!1,this.i=new ea(null,this.l))}wn.prototype.toString=function(){const r=[];var d=this.j;d&&r.push(Zi(d,Bl,!0),":");var p=this.g;return(p||d=="file")&&(r.push("//"),(d=this.o)&&r.push(Zi(d,Bl,!0),"@"),r.push(Ki(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&r.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&r.push("/"),r.push(Zi(p,p.charAt(0)=="/"?nm:tm,!0))),(p=this.i.toString())&&r.push("?",p),(p=this.m)&&r.push("#",Zi(p,am)),r.join("")},wn.prototype.resolve=function(r){const d=Kt(this);let p=!!r.j;p?Yi(d,r.j):p=!!r.o,p?d.o=r.o:p=!!r.g,p?d.g=r.g:p=r.u!=null;var I=r.h;if(p)Ji(d,r.u);else if(p=!!r.h){if(I.charAt(0)!="/")if(this.g&&!this.h)I="/"+I;else{var O=d.h.lastIndexOf("/");O!=-1&&(I=d.h.slice(0,O+1)+I)}if(O=I,O==".."||O==".")I="";else if(O.indexOf("./")!=-1||O.indexOf("/.")!=-1){I=O.lastIndexOf("/",0)==0,O=O.split("/");const U=[];for(let Y=0;Y<O.length;){const he=O[Y++];he=="."?I&&Y==O.length&&U.push(""):he==".."?((U.length>1||U.length==1&&U[0]!="")&&U.pop(),I&&Y==O.length&&U.push("")):(U.push(he),I=!0)}I=U.join("/")}else I=O}return p?d.h=I:p=r.i.toString()!=="",p?_r(d,ql(r.i)):p=!!r.m,p&&(d.m=r.m),d};function Kt(r){return new wn(r)}function Yi(r,d,p){r.j=p?Xi(d,!0):d,r.j&&(r.j=r.j.replace(/:$/,""))}function Ji(r,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);r.u=d}else r.u=null}function _r(r,d,p){d instanceof ea?(r.i=d,sm(r.i,r.l)):(p||(d=Zi(d,im)),r.i=new ea(d,r.l))}function Me(r,d,p){r.i.set(d,p)}function Ka(r){return Me(r,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),r}function Xi(r,d){return r?d?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Zi(r,d,p){return typeof r=="string"?(r=encodeURI(r).replace(d,em),p&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function em(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var Bl=/[#\/\?@]/g,tm=/[#\?:]/g,nm=/[#\?]/g,im=/[#\?@]/g,am=/#/g;function ea(r,d){this.h=this.g=null,this.i=r||null,this.j=!!d}function Zn(r){r.g||(r.g=new Map,r.h=0,r.i&&Zh(r.i,function(d,p){r.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}n=ea.prototype,n.add=function(r,d){Zn(this),this.i=null,r=xi(this,r);let p=this.g.get(r);return p||this.g.set(r,p=[]),p.push(d),this.h+=1,this};function zl(r,d){Zn(r),d=xi(r,d),r.g.has(d)&&(r.i=null,r.h-=r.g.get(d).length,r.g.delete(d))}function Fl(r,d){return Zn(r),d=xi(r,d),r.g.has(d)}n.forEach=function(r,d){Zn(this),this.g.forEach(function(p,I){p.forEach(function(O){r.call(d,O,I,this)},this)},this)};function Ul(r,d){Zn(r);let p=[];if(typeof d=="string")Fl(r,d)&&(p=p.concat(r.g.get(xi(r,d))));else for(r=Array.from(r.g.values()),d=0;d<r.length;d++)p=p.concat(r[d]);return p}n.set=function(r,d){return Zn(this),this.i=null,r=xi(this,r),Fl(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[d]),this.h+=1,this},n.get=function(r,d){return r?(r=Ul(this,r),r.length>0?String(r[0]):d):d};function jl(r,d,p){zl(r,d),p.length>0&&(r.i=null,r.g.set(xi(r,d),R(p)),r.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],d=Array.from(this.g.keys());for(let I=0;I<d.length;I++){var p=d[I];const O=Ki(p);p=Ul(this,p);for(let U=0;U<p.length;U++){let Y=O;p[U]!==""&&(Y+="="+Ki(p[U])),r.push(Y)}}return this.i=r.join("&")};function ql(r){const d=new ea;return d.i=r.i,r.g&&(d.g=new Map(r.g),d.h=r.h),d}function xi(r,d){return d=String(d),r.j&&(d=d.toLowerCase()),d}function sm(r,d){d&&!r.j&&(Zn(r),r.i=null,r.g.forEach(function(p,I){const O=I.toLowerCase();I!=O&&(zl(this,I),jl(this,O,p))},r)),r.j=d}function rm(r,d){const p=new Re;if(o.Image){const I=new Image;I.onload=h(_n,p,"TestLoadImage: loaded",!0,d,I),I.onerror=h(_n,p,"TestLoadImage: error",!1,d,I),I.onabort=h(_n,p,"TestLoadImage: abort",!1,d,I),I.ontimeout=h(_n,p,"TestLoadImage: timeout",!1,d,I),o.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=r}else d(!1)}function om(r,d){const p=new Re,I=new AbortController,O=setTimeout(()=>{I.abort(),_n(p,"TestPingServer: timeout",!1,d)},1e4);fetch(r,{signal:I.signal}).then(U=>{clearTimeout(O),U.ok?_n(p,"TestPingServer: ok",!0,d):_n(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),_n(p,"TestPingServer: error",!1,d)})}function _n(r,d,p,I,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),I(p)}catch{}}function lm(){this.g=new N}function xr(r){this.i=r.Sb||null,this.h=r.ab||!1}w(xr,F),xr.prototype.g=function(){return new Qa(this.i,this.h)};function Qa(r,d){fe.call(this),this.H=r,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}w(Qa,fe),n=Qa.prototype,n.open=function(r,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=r,this.D=d,this.readyState=1,na(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};r&&(d.body=r),(this.H||o).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ta(this)),this.readyState=0},n.Pa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,na(this)),this.g&&(this.readyState=3,na(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Hl(this)}else r.text().then(this.Oa.bind(this),this.ga.bind(this))};function Hl(r){r.j.read().then(r.Ma.bind(r)).catch(r.ga.bind(r))}n.Ma=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var d=r.value?r.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!r.done}))&&(this.response=this.responseText+=d)}r.done?ta(this):na(this),this.readyState==3&&Hl(this)}},n.Oa=function(r){this.g&&(this.response=this.responseText=r,ta(this))},n.Na=function(r){this.g&&(this.response=r,ta(this))},n.ga=function(){this.g&&ta(this)};function ta(r){r.readyState=4,r.l=null,r.j=null,r.B=null,na(r)}n.setRequestHeader=function(r,d){this.A.append(r,d)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,r.push(p[0]+": "+p[1]),p=d.next();return r.join(`\r
`)};function na(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Qa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Wl(r){let d="";return J(r,function(p,I){d+=I,d+=":",d+=p,d+=`\r
`}),d}function Er(r,d,p){e:{for(I in p){var I=!1;break e}I=!0}I||(p=Wl(p),typeof r=="string"?p!=null&&Ki(p):Me(r,d,p))}function Ge(r){fe.call(this),this.headers=new Map,this.L=r||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}w(Ge,fe);var cm=/^https?$/i,dm=["POST","PUT"];n=Ge.prototype,n.Fa=function(r){this.H=r},n.ea=function(r,d,p,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);d=d?d.toUpperCase():"GET",this.D=r,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Al.g(),this.g.onreadystatechange=b(u(this.Ca,this));try{this.B=!0,this.g.open(d,String(r),!0),this.B=!1}catch(U){Gl(this,U);return}if(r=p||"",p=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var O in I)p.set(O,I[O]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const U of I.keys())p.set(U,I.get(U));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(p.keys()).find(U=>U.toLowerCase()=="content-type"),O=o.FormData&&r instanceof o.FormData,!(Array.prototype.indexOf.call(dm,d,void 0)>=0)||I||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Y]of p)this.g.setRequestHeader(U,Y);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(r),this.v=!1}catch(U){Gl(this,U)}};function Gl(r,d){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=d,r.o=5,Kl(r),Ya(r)}function Kl(r){r.A||(r.A=!0,ve(r,"complete"),ve(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=r||7,ve(this,"complete"),ve(this,"abort"),Ya(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ya(this,!0)),Ge.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ql(this):this.Xa())},n.Xa=function(){Ql(this)};function Ql(r){if(r.h&&typeof s<"u"){if(r.v&&xn(r)==4)setTimeout(r.Ca.bind(r),0);else if(ve(r,"readystatechange"),xn(r)==4){r.h=!1;try{const U=r.ca();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var I;if(I=U===0){let Y=String(r.D).match(Vl)[1]||null;!Y&&o.self&&o.self.location&&(Y=o.self.location.protocol.slice(0,-1)),I=!cm.test(Y?Y.toLowerCase():"")}p=I}if(p)ve(r,"complete"),ve(r,"success");else{r.o=6;try{var O=xn(r)>2?r.g.statusText:""}catch{O=""}r.l=O+" ["+r.ca()+"]",Kl(r)}}finally{Ya(r)}}}}function Ya(r,d){if(r.g){r.m&&(clearTimeout(r.m),r.m=null);const p=r.g;r.g=null,d||ve(r,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function xn(r){return r.g?r.g.readyState:0}n.ca=function(){try{return xn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(r){if(this.g){var d=this.g.responseText;return r&&d.indexOf(r)==0&&(d=d.substring(r.length)),z(d)}};function Yl(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.F){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function um(r){const d={};r=(r.g&&xn(r)>=2&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<r.length;I++){if(_(r[I]))continue;var p=Qh(r[I]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const U=d[O]||[];d[O]=U,U.push(p)}X(d,function(I){return I.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ia(r,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[r]||d}function Jl(r){this.za=0,this.i=[],this.j=new Re,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ia("failFast",!1,r),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ia("baseRetryDelayMs",5e3,r),this.Za=ia("retryDelaySeedMs",1e4,r),this.Ta=ia("forwardChannelMaxRetries",2,r),this.va=ia("forwardChannelRequestTimeoutMs",2e4,r),this.ma=r&&r.xmlHttpFactory||void 0,this.Ua=r&&r.Rb||void 0,this.Aa=r&&r.useFetchStreams||!1,this.O=void 0,this.L=r&&r.supportsCrossDomainXhr||!1,this.M="",this.h=new Dl(r&&r.concurrentRequestLimit),this.Ba=new lm,this.S=r&&r.fastHandshake||!1,this.R=r&&r.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=r&&r.Pb||!1,r&&r.ua&&this.j.ua(),r&&r.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&r&&r.detectBufferingProxy||!1,this.ia=void 0,r&&r.longPollingTimeout&&r.longPollingTimeout>0&&(this.ia=r.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Jl.prototype,n.ka=8,n.I=1,n.connect=function(r,d,p,I){Te(0),this.W=r,this.H=d||{},p&&I!==void 0&&(this.H.OSID=p,this.H.OAID=I),this.F=this.X,this.J=rc(this,null,this.W),Xa(this)};function Ir(r){if(Xl(r),r.I==3){var d=r.V++,p=Kt(r.J);if(Me(p,"SID",r.M),Me(p,"RID",d),Me(p,"TYPE","terminate"),aa(r,p),d=new bn(r,r.j,d),d.M=2,d.A=Ka(Kt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(d.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=d.A,p=!0),p||(d.g=oc(d.j,null),d.g.ea(d.A)),d.F=Date.now(),Ga(d)}sc(r)}function Ja(r){r.g&&(kr(r),r.g.cancel(),r.g=null)}function Xl(r){Ja(r),r.v&&(o.clearTimeout(r.v),r.v=null),Za(r),r.h.cancel(),r.m&&(typeof r.m=="number"&&o.clearTimeout(r.m),r.m=null)}function Xa(r){if(!$l(r.h)&&!r.m){r.m=!0;var d=r.Ea;T||m(),A||(T(),A=!0),f.add(d,r),r.D=0}}function pm(r,d){return Nl(r.h)>=r.h.j-(r.m?1:0)?!1:r.m?(r.i=d.G.concat(r.i),!0):r.I==1||r.I==2||r.D>=(r.Sa?0:r.Ta)?!1:(r.m=gt(u(r.Ea,r,d),ac(r,r.D)),r.D++,!0)}n.Ea=function(r){if(this.m)if(this.m=null,this.I==1){if(!r){this.V=Math.floor(Math.random()*1e5),r=this.V++;const O=new bn(this,this.j,r);let U=this.o;if(this.U&&(U?(U=se(U),le(U,this.U)):U=this.U),this.u!==null||this.R||(O.J=U,U=null),this.S)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var I=this.i[p];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,d>4096){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=ec(this,O,d),p=Kt(this.J),Me(p,"RID",r),Me(p,"CVER",22),this.G&&Me(p,"X-HTTP-Session-Id",this.G),aa(this,p),U&&(this.R?d="headers="+Ki(Wl(U))+"&"+d:this.u&&Er(p,this.u,U)),wr(this.h,O),this.Ra&&Me(p,"TYPE","init"),this.S?(Me(p,"$req",d),Me(p,"SID","null"),O.U=!0,gr(O,p,null)):gr(O,p,d),this.I=2}}else this.I==3&&(r?Zl(this,r):this.i.length==0||$l(this.h)||Zl(this))};function Zl(r,d){var p;d?p=d.l:p=r.V++;const I=Kt(r.J);Me(I,"SID",r.M),Me(I,"RID",p),Me(I,"AID",r.K),aa(r,I),r.u&&r.o&&Er(I,r.u,r.o),p=new bn(r,r.j,p,r.D+1),r.u===null&&(p.J=r.o),d&&(r.i=d.G.concat(r.i)),d=ec(r,p,1e3),p.H=Math.round(r.va*.5)+Math.round(r.va*.5*Math.random()),wr(r.h,p),gr(p,I,d)}function aa(r,d){r.H&&J(r.H,function(p,I){Me(d,I,p)}),r.l&&J({},function(p,I){Me(d,I,p)})}function ec(r,d,p){p=Math.min(r.i.length,p);const I=r.l?u(r.l.Ka,r.l,r):null;e:{var O=r.i;let he=-1;for(;;){const at=["count="+p];he==-1?p>0?(he=O[0].g,at.push("ofs="+he)):he=0:at.push("ofs="+he);let Le=!0;for(let ct=0;ct<p;ct++){var U=O[ct].g;const Qt=O[ct].map;if(U-=he,U<0)he=Math.max(0,O[ct].g-100),Le=!1;else try{U="req"+U+"_"||"";try{var Y=Qt instanceof Map?Qt:Object.entries(Qt);for(const[ti,En]of Y){let In=En;l(En)&&(In=Gi(En)),at.push(U+ti+"="+encodeURIComponent(In))}}catch(ti){throw at.push(U+"type="+encodeURIComponent("_badmap")),ti}}catch{I&&I(Qt)}}if(Le){Y=at.join("&");break e}}Y=void 0}return r=r.i.splice(0,p),d.G=r,Y}function tc(r){if(!r.g&&!r.v){r.Y=1;var d=r.Da;T||m(),A||(T(),A=!0),f.add(d,r),r.A=0}}function Tr(r){return r.g||r.v||r.A>=3?!1:(r.Y++,r.v=gt(u(r.Da,r),ac(r,r.A)),r.A++,!0)}n.Da=function(){if(this.v=null,nc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var r=4*this.T;this.j.info("BP detection timer enabled: "+r),this.B=gt(u(this.Wa,this),r)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Te(10),Ja(this),nc(this))};function kr(r){r.B!=null&&(o.clearTimeout(r.B),r.B=null)}function nc(r){r.g=new bn(r,r.j,"rpc",r.Y),r.u===null&&(r.g.J=r.o),r.g.P=0;var d=Kt(r.na);Me(d,"RID","rpc"),Me(d,"SID",r.M),Me(d,"AID",r.K),Me(d,"CI",r.F?"0":"1"),!r.F&&r.ia&&Me(d,"TO",r.ia),Me(d,"TYPE","xmlhttp"),aa(r,d),r.u&&r.o&&Er(d,r.u,r.o),r.O&&(r.g.H=r.O);var p=r.g;r=r.ba,p.M=1,p.A=Ka(Kt(d)),p.u=null,p.R=!0,Pl(p,r)}n.Va=function(){this.C!=null&&(this.C=null,Ja(this),Tr(this),Te(19))};function Za(r){r.C!=null&&(o.clearTimeout(r.C),r.C=null)}function ic(r,d){var p=null;if(r.g==d){Za(r),kr(r),r.g=null;var I=2}else if(br(r.h,d))p=d.G,Ml(r.h,d),I=1;else return;if(r.I!=0){if(d.o)if(I==1){p=d.u?d.u.length:0,d=Date.now()-d.F;var O=r.D;I=We(),ve(I,new Mt(I,p)),Xa(r)}else tc(r);else if(O=d.m,O==3||O==0&&d.X>0||!(I==1&&pm(r,d)||I==2&&Tr(r)))switch(p&&p.length>0&&(d=r.h,d.i=d.i.concat(p)),O){case 1:ei(r,5);break;case 4:ei(r,10);break;case 3:ei(r,6);break;default:ei(r,2)}}}function ac(r,d){let p=r.Qa+Math.floor(Math.random()*r.Za);return r.isActive()||(p*=2),p*d}function ei(r,d){if(r.j.info("Error code "+d),d==2){var p=u(r.bb,r),I=r.Ua;const O=!I;I=new wn(I||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Yi(I,"https"),Ka(I),O?rm(I.toString(),p):om(I.toString(),p)}else Te(2);r.I=0,r.l&&r.l.pa(d),sc(r),Xl(r)}n.bb=function(r){r?(this.j.info("Successfully pinged google.com"),Te(2)):(this.j.info("Failed to ping google.com"),Te(1))};function sc(r){if(r.I=0,r.ja=[],r.l){const d=Ol(r.h);(d.length!=0||r.i.length!=0)&&(M(r.ja,d),M(r.ja,r.i),r.h.i.length=0,R(r.i),r.i.length=0),r.l.oa()}}function rc(r,d,p){var I=p instanceof wn?Kt(p):new wn(p);if(I.g!="")d&&(I.g=d+"."+I.g),Ji(I,I.u);else{var O=o.location;I=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;const U=new wn(null);I&&Yi(U,I),d&&(U.g=d),O&&Ji(U,O),p&&(U.h=p),I=U}return p=r.G,d=r.wa,p&&d&&Me(I,p,d),Me(I,"VER",r.ka),aa(r,I),I}function oc(r,d,p){if(d&&!r.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=r.Aa&&!r.ma?new Ge(new xr({ab:p})):new Ge(r.ma),d.Fa(r.L),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function lc(){}n=lc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function es(){}es.prototype.g=function(r,d){return new Rt(r,d)};function Rt(r,d){fe.call(this),this.g=new Jl(d),this.l=r,this.h=d&&d.messageUrlParams||null,r=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(r?r["X-WebChannel-Content-Type"]=d.messageContentType:r={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(r?r["X-WebChannel-Client-Profile"]=d.sa:r={"X-WebChannel-Client-Profile":d.sa}),this.g.U=r,(r=d&&d.Qb)&&!_(r)&&(this.g.u=r),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!_(d)&&(this.g.G=d,r=this.h,r!==null&&d in r&&(r=this.h,d in r&&delete r[d])),this.j=new Ei(this)}w(Rt,fe),Rt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Rt.prototype.close=function(){Ir(this.g)},Rt.prototype.o=function(r){var d=this.g;if(typeof r=="string"){var p={};p.__data__=r,r=p}else this.v&&(p={},p.__data__=Gi(r),r=p);d.i.push(new Xh(d.Ya++,r)),d.I==3&&Xa(d)},Rt.prototype.N=function(){this.g.l=null,delete this.j,Ir(this.g),delete this.g,Rt.Z.N.call(this)};function cc(r){te.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var d=r.__sm__;if(d){e:{for(const p in d){r=p;break e}r=void 0}(this.i=r)&&(r=this.i,d=d!==null&&r in d?d[r]:void 0),this.data=d}else this.data=r}w(cc,te);function dc(){ne.call(this),this.status=1}w(dc,ne);function Ei(r){this.g=r}w(Ei,lc),Ei.prototype.ra=function(){ve(this.g,"a")},Ei.prototype.qa=function(r){ve(this.g,new cc(r))},Ei.prototype.pa=function(r){ve(this.g,new dc)},Ei.prototype.oa=function(){ve(this.g,"b")},es.prototype.createWebChannel=es.prototype.g,Rt.prototype.send=Rt.prototype.o,Rt.prototype.open=Rt.prototype.m,Rt.prototype.close=Rt.prototype.close,ip=function(){return new es},np=function(){return We()},tp=be,to={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ot.NO_ERROR=0,Ot.TIMEOUT=8,Ot.HTTP_ERROR=6,fs=Ot,kl.COMPLETE="complete",ep=kl,G.EventType=W,W.OPEN="a",W.CLOSE="b",W.ERROR="c",W.MESSAGE="d",fe.prototype.listen=fe.prototype.J,pa=G,Ge.prototype.listenOnce=Ge.prototype.K,Ge.prototype.getLastError=Ge.prototype.Ha,Ge.prototype.getLastErrorCode=Ge.prototype.ya,Ge.prototype.getStatus=Ge.prototype.ca,Ge.prototype.getResponseJson=Ge.prototype.La,Ge.prototype.getResponseText=Ge.prototype.la,Ge.prototype.send=Ge.prototype.ea,Ge.prototype.setWithCredentials=Ge.prototype.Fa,Zu=Ge}).apply(typeof is<"u"?is:typeof self<"u"?self:typeof window<"u"?window:{});class vt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");let Ui="12.9.0";function mv(n){Ui=n}const pi=new xo("@firebase/firestore");function Ti(){return pi.logLevel}function ee(n,...e){if(pi.logLevel<=we.DEBUG){const t=e.map($o);pi.debug(`Firestore (${Ui}): ${n}`,...t)}}function fn(n,...e){if(pi.logLevel<=we.ERROR){const t=e.map($o);pi.error(`Firestore (${Ui}): ${n}`,...t)}}function hi(n,...e){if(pi.logLevel<=we.WARN){const t=e.map($o);pi.warn(`Firestore (${Ui}): ${n}`,...t)}}function $o(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}function oe(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,ap(n,i,t)}function ap(n,e,t){let i=`FIRESTORE (${Ui}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw fn(i),new Error(i)}function Se(n,e,t,i){let a="Unexpected state";typeof t=="string"?a=t:i=t,n||ap(e,a,i)}function ue(n,e){return n}const q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends rn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class dn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}class sp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(vt.UNAUTHENTICATED)))}shutdown(){}}class gv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class yv{constructor(e){this.t=e,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Se(this.o===void 0,42304);let i=this.i;const a=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let s=new dn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new dn,e.enqueueRetryable((()=>a(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await a(this.currentUser)}))},l=c=>{ee("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(ee("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new dn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(ee("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Se(typeof i.accessToken=="string",31837,{l:i}),new sp(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Se(e===null||typeof e=="string",2055,{h:e}),new vt(e)}}class vv{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class bv{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new vv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(vt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class jc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Dt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Se(this.o===void 0,3512);const i=s=>{s.error!=null&&ee("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,ee("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>i(s)))};const a=s=>{ee("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>a(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?a(s):ee("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new jc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new jc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function _v(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}class No{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const a=_v(40);for(let s=0;s<a.length;++s)i.length<20&&a[s]<t&&(i+=e.charAt(a[s]%62))}return i}}function _e(n,e){return n<e?-1:n>e?1:0}function no(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const a=n.charAt(i),s=e.charAt(i);if(a!==s)return Nr(a)===Nr(s)?_e(a,s):Nr(a)?1:-1}return _e(n.length,e.length)}const xv=55296,Ev=57343;function Nr(n){const e=n.charCodeAt(0);return e>=xv&&e<=Ev}function Mi(n,e,t){return n.length===e.length&&n.every(((i,a)=>t(i,e[a])))}const qc="__name__";class Yt{constructor(e,t,i){t===void 0?t=0:t>e.length&&oe(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&oe(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Yt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Yt?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let a=0;a<i;a++){const s=Yt.compareSegments(e.get(a),t.get(a));if(s!==0)return s}return _e(e.length,t.length)}static compareSegments(e,t){const i=Yt.isNumericId(e),a=Yt.isNumericId(t);return i&&!a?-1:!i&&a?1:i&&a?Yt.extractNumericId(e).compare(Yt.extractNumericId(t)):no(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nn.fromString(e.substring(4,e.length-2))}}class $e extends Yt{construct(e,t,i){return new $e(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new Z(q.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((a=>a.length>0)))}return new $e(t)}static emptyPath(){return new $e([])}}const Iv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class mt extends Yt{construct(e,t,i){return new mt(e,t,i)}static isValidIdentifier(e){return Iv.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),mt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===qc}static keyField(){return new mt([qc])}static fromServerFormat(e){const t=[];let i="",a=0;const s=()=>{if(i.length===0)throw new Z(q.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;a<e.length;){const l=e[a];if(l==="\\"){if(a+1===e.length)throw new Z(q.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[a+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new Z(q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,a+=2}else l==="`"?(o=!o,a++):l!=="."||o?(i+=l,a++):(s(),a++)}if(s(),o)throw new Z(q.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new mt(t)}static emptyPath(){return new mt([])}}class ie{constructor(e){this.path=e}static fromPath(e){return new ie($e.fromString(e))}static fromName(e){return new ie($e.fromString(e).popFirst(5))}static empty(){return new ie($e.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&$e.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return $e.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new $e(e.slice()))}}function rp(n,e,t){if(!t)throw new Z(q.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Tv(n,e,t,i){if(e===!0&&i===!0)throw new Z(q.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Hc(n){if(!ie.isDocumentKey(n))throw new Z(q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Wc(n){if(ie.isDocumentKey(n))throw new Z(q.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function op(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ks(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":oe(12329,{type:typeof n})}function Ct(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new Z(q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ks(n);throw new Z(q.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function nt(n,e){const t={typeString:n};return e&&(t.value=e),t}function Fa(n,e){if(!op(n))throw new Z(q.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const a=e[i].typeString,s="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const o=n[i];if(a&&typeof o!==a){t=`JSON field '${i}' must be a ${a}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${i}' field to equal '${s.value}'`;break}}if(t)throw new Z(q.INVALID_ARGUMENT,t);return!0}const Gc=-62135596800,Kc=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Kc);return new ge(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Z(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Z(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Gc)throw new Z(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Z(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Kc}_compareTo(e){return this.seconds===e.seconds?_e(this.nanoseconds,e.nanoseconds):_e(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Fa(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Gc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:nt("string",ge._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};class de{static fromTimestamp(e){return new de(e)}static min(){return new de(new ge(0,0))}static max(){return new de(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Aa=-1;function kv(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,a=de.fromTimestamp(i===1e9?new ge(t+1,0):new ge(t,i));return new zn(a,ie.empty(),e)}function Av(n){return new zn(n.readTime,n.key,Aa)}class zn{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new zn(de.min(),ie.empty(),Aa)}static max(){return new zn(de.max(),ie.empty(),Aa)}}function Sv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=ie.comparator(n.documentKey,e.documentKey),t!==0?t:_e(n.largestBatchId,e.largestBatchId))}const Cv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Pv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}async function ji(n){if(n.code!==q.FAILED_PRECONDITION||n.message!==Cv)throw n;ee("LocalStore","Unexpectedly lost primary lease")}class H{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&oe(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new H(((i,a)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(i,a)},this.catchCallback=s=>{this.wrapFailure(t,s).next(i,a)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof H?t:H.resolve(t)}catch(t){return H.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):H.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):H.reject(t)}static resolve(e){return new H(((t,i)=>{t(e)}))}static reject(e){return new H(((t,i)=>{i(e)}))}static waitFor(e){return new H(((t,i)=>{let a=0,s=0,o=!1;e.forEach((l=>{++a,l.next((()=>{++s,o&&s===a&&t()}),(c=>i(c)))})),o=!0,s===a&&t()}))}static or(e){let t=H.resolve(!1);for(const i of e)t=t.next((a=>a?H.resolve(a):i()));return t}static forEach(e,t){const i=[];return e.forEach(((a,s)=>{i.push(t.call(this,a,s))})),this.waitFor(i)}static mapArray(e,t){return new H(((i,a)=>{const s=e.length,o=new Array(s);let l=0;for(let c=0;c<s;c++){const u=c;t(e[u]).next((h=>{o[u]=h,++l,l===s&&i(o)}),(h=>a(h)))}}))}static doWhile(e,t){return new H(((i,a)=>{const s=()=>{e()===!0?t().next((()=>{s()}),a):i()};s()}))}}function Rv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function qi(n){return n.name==="IndexedDbTransactionError"}class Qs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>t.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Qs.ce=-1;const Mo=-1;function Ys(n){return n==null}function Ps(n){return n===0&&1/n==-1/0}function Lv(n){return typeof n=="number"&&Number.isInteger(n)&&!Ps(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const lp="";function Dv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Qc(e)),e=$v(n.get(t),e);return Qc(e)}function $v(n,e){let t=e;const i=n.length;for(let a=0;a<i;a++){const s=n.charAt(a);switch(s){case"\0":t+="";break;case lp:t+="";break;default:t+=s}}return t}function Qc(n){return n+lp+""}function Yc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Qn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function cp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}class Ue{constructor(e,t){this.comparator=e,this.root=t||pt.EMPTY}insert(e,t){return new Ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(e){return new Ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const a=this.comparator(e,i.key);if(a===0)return t+i.left.size;a<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,i)=>(e(t,i),!1)))}toString(){const e=[];return this.inorderTraversal(((t,i)=>(e.push(`${t}:${i}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new as(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new as(this.root,e,this.comparator,!1)}getReverseIterator(){return new as(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new as(this.root,e,this.comparator,!0)}}class as{constructor(e,t,i,a){this.isReverse=a,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?i(e.key,t):1,t&&a&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class pt{constructor(e,t,i,a,s){this.key=e,this.value=t,this.color=i??pt.RED,this.left=a??pt.EMPTY,this.right=s??pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,a,s){return new pt(e??this.key,t??this.value,i??this.color,a??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let a=this;const s=i(e,a.key);return a=s<0?a.copy(null,null,null,a.left.insert(e,t,i),null):s===0?a.copy(null,t,null,null,null):a.copy(null,null,null,null,a.right.insert(e,t,i)),a.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,a=this;if(t(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,t),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),t(e,a.key)===0){if(a.right.isEmpty())return pt.EMPTY;i=a.right.min(),a=a.copy(i.key,i.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,t))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw oe(43730,{key:this.key,value:this.value});if(this.right.isRed())throw oe(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw oe(27949);return e+(this.isRed()?0:1)}}pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1;pt.EMPTY=new class{constructor(){this.size=0}get key(){throw oe(57766)}get value(){throw oe(16141)}get color(){throw oe(16727)}get left(){throw oe(29726)}get right(){throw oe(36894)}copy(e,t,i,a,s){return this}insert(e,t,i){return new pt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class st{constructor(e){this.comparator=e,this.data=new Ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,i)=>(e(t),!1)))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const a=i.getNext();if(this.comparator(a.key,e[1])>=0)return;t(a.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Jc(this.data.getIterator())}getIteratorFrom(e){return new Jc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((i=>{t=t.add(i)})),t}isEqual(e){if(!(e instanceof st)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const a=t.getNext().key,s=i.getNext().key;if(this.comparator(a,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new st(this.comparator);return t.data=e,t}}class Jc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class $t{constructor(e){this.fields=e,e.sort(mt.comparator)}static empty(){return new $t([])}unionWith(e){let t=new st(mt.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new $t(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mi(this.fields,e.fields,((t,i)=>t.isEqual(i)))}}class dp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class ft{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(a){try{return atob(a)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new dp("Invalid base64 string: "+s):s}})(e);return new ft(t)}static fromUint8Array(e){const t=(function(a){let s="";for(let o=0;o<a.length;++o)s+=String.fromCharCode(a[o]);return s})(e);return new ft(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _e(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const Nv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Fn(n){if(Se(!!n,39018),typeof n=="string"){let e=0;const t=Nv.exec(n);if(Se(!!t,46558,{timestamp:n}),t[1]){let a=t[1];a=(a+"000000000").substr(0,9),e=Number(a)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:Je(n.seconds),nanos:Je(n.nanos)}}function Je(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Un(n){return typeof n=="string"?ft.fromBase64String(n):ft.fromUint8Array(n)}const up="server_timestamp",pp="__type__",hp="__previous_value__",mp="__local_write_time__";function Oo(n){return(n?.mapValue?.fields||{})[pp]?.stringValue===up}function Js(n){const e=n.mapValue.fields[hp];return Oo(e)?Js(e):e}function Sa(n){const e=Fn(n.mapValue.fields[mp].timestampValue);return new ge(e.seconds,e.nanos)}class Mv{constructor(e,t,i,a,s,o,l,c,u,h,w){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=a,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=h,this.apiKey=w}}const Rs="(default)";class Ca{constructor(e,t){this.projectId=e,this.database=t||Rs}static empty(){return new Ca("","")}get isDefaultDatabase(){return this.database===Rs}isEqual(e){return e instanceof Ca&&e.projectId===this.projectId&&e.database===this.database}}function Ov(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new Z(q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ca(n.options.projectId,e)}const fp="__type__",Vv="__max__",ss={mapValue:{}},gp="__vector__",Ls="value";function jn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Oo(n)?4:zv(n)?9007199254740991:Bv(n)?10:11:oe(28295,{value:n})}function sn(n,e){if(n===e)return!0;const t=jn(n);if(t!==jn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Sa(n).isEqual(Sa(e));case 3:return(function(a,s){if(typeof a.timestampValue=="string"&&typeof s.timestampValue=="string"&&a.timestampValue.length===s.timestampValue.length)return a.timestampValue===s.timestampValue;const o=Fn(a.timestampValue),l=Fn(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(a,s){return Un(a.bytesValue).isEqual(Un(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(a,s){return Je(a.geoPointValue.latitude)===Je(s.geoPointValue.latitude)&&Je(a.geoPointValue.longitude)===Je(s.geoPointValue.longitude)})(n,e);case 2:return(function(a,s){if("integerValue"in a&&"integerValue"in s)return Je(a.integerValue)===Je(s.integerValue);if("doubleValue"in a&&"doubleValue"in s){const o=Je(a.doubleValue),l=Je(s.doubleValue);return o===l?Ps(o)===Ps(l):isNaN(o)&&isNaN(l)}return!1})(n,e);case 9:return Mi(n.arrayValue.values||[],e.arrayValue.values||[],sn);case 10:case 11:return(function(a,s){const o=a.mapValue.fields||{},l=s.mapValue.fields||{};if(Yc(o)!==Yc(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!sn(o[c],l[c])))return!1;return!0})(n,e);default:return oe(52216,{left:n})}}function Pa(n,e){return(n.values||[]).find((t=>sn(t,e)))!==void 0}function Oi(n,e){if(n===e)return 0;const t=jn(n),i=jn(e);if(t!==i)return _e(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return _e(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const l=Je(s.integerValue||s.doubleValue),c=Je(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(n,e);case 3:return Xc(n.timestampValue,e.timestampValue);case 4:return Xc(Sa(n),Sa(e));case 5:return no(n.stringValue,e.stringValue);case 6:return(function(s,o){const l=Un(s),c=Un(o);return l.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const l=s.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const h=_e(l[u],c[u]);if(h!==0)return h}return _e(l.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const l=_e(Je(s.latitude),Je(o.latitude));return l!==0?l:_e(Je(s.longitude),Je(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Zc(n.arrayValue,e.arrayValue);case 10:return(function(s,o){const l=s.fields||{},c=o.fields||{},u=l[Ls]?.arrayValue,h=c[Ls]?.arrayValue,w=_e(u?.values?.length||0,h?.values?.length||0);return w!==0?w:Zc(u,h)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===ss.mapValue&&o===ss.mapValue)return 0;if(s===ss.mapValue)return 1;if(o===ss.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let w=0;w<c.length&&w<h.length;++w){const b=no(c[w],h[w]);if(b!==0)return b;const R=Oi(l[c[w]],u[h[w]]);if(R!==0)return R}return _e(c.length,h.length)})(n.mapValue,e.mapValue);default:throw oe(23264,{he:t})}}function Xc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return _e(n,e);const t=Fn(n),i=Fn(e),a=_e(t.seconds,i.seconds);return a!==0?a:_e(t.nanos,i.nanos)}function Zc(n,e){const t=n.values||[],i=e.values||[];for(let a=0;a<t.length&&a<i.length;++a){const s=Oi(t[a],i[a]);if(s)return s}return _e(t.length,i.length)}function Vi(n){return io(n)}function io(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const i=Fn(t);return`time(${i.seconds},${i.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Un(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return ie.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let i="[",a=!0;for(const s of t.values||[])a?a=!1:i+=",",i+=io(s);return i+"]"})(n.arrayValue):"mapValue"in n?(function(t){const i=Object.keys(t.fields||{}).sort();let a="{",s=!0;for(const o of i)s?s=!1:a+=",",a+=`${o}:${io(t.fields[o])}`;return a+"}"})(n.mapValue):oe(61005,{value:n})}function gs(n){switch(jn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Js(n);return e?16+gs(e):16;case 5:return 2*n.stringValue.length;case 6:return Un(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((a,s)=>a+gs(s)),0)})(n.arrayValue);case 10:case 11:return(function(i){let a=0;return Qn(i.fields,((s,o)=>{a+=s.length+gs(o)})),a})(n.mapValue);default:throw oe(13486,{value:n})}}function ed(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ao(n){return!!n&&"integerValue"in n}function Vo(n){return!!n&&"arrayValue"in n}function td(n){return!!n&&"nullValue"in n}function nd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ys(n){return!!n&&"mapValue"in n}function Bv(n){return(n?.mapValue?.fields||{})[fp]?.stringValue===gp}function ba(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Qn(n.mapValue.fields,((t,i)=>e.mapValue.fields[t]=ba(i))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ba(n.arrayValue.values[t]);return e}return{...n}}function zv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Vv}class St{constructor(e){this.value=e}static empty(){return new St({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!ys(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ba(t)}setAll(e){let t=mt.emptyPath(),i={},a=[];e.forEach(((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,a),i={},a=[],t=l.popLast()}o?i[l.lastSegment()]=ba(o):a.push(l.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,i,a)}delete(e){const t=this.field(e.popLast());ys(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return sn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let a=t.mapValue.fields[e.get(i)];ys(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=a),t=a}return t.mapValue.fields}applyChanges(e,t,i){Qn(t,((a,s)=>e[a]=s));for(const a of i)delete e[a]}clone(){return new St(ba(this.value))}}function yp(n){const e=[];return Qn(n.fields,((t,i)=>{const a=new mt([t]);if(ys(i)){const s=yp(i.mapValue).fields;if(s.length===0)e.push(a);else for(const o of s)e.push(a.child(o))}else e.push(a)})),new $t(e)}class bt{constructor(e,t,i,a,s,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=a,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new bt(e,0,de.min(),de.min(),de.min(),St.empty(),0)}static newFoundDocument(e,t,i,a){return new bt(e,1,t,de.min(),i,a,0)}static newNoDocument(e,t){return new bt(e,2,t,de.min(),de.min(),St.empty(),0)}static newUnknownDocument(e,t){return new bt(e,3,t,de.min(),de.min(),St.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(de.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=St.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=St.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Ds{constructor(e,t){this.position=e,this.inclusive=t}}function id(n,e,t){let i=0;for(let a=0;a<n.position.length;a++){const s=e[a],o=n.position[a];if(s.field.isKeyField()?i=ie.comparator(ie.fromName(o.referenceValue),t.key):i=Oi(o,t.data.field(s.field)),s.dir==="desc"&&(i*=-1),i!==0)break}return i}function ad(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!sn(n.position[t],e.position[t]))return!1;return!0}class Ra{constructor(e,t="asc"){this.field=e,this.dir=t}}function Fv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}class vp{}class tt extends vp{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new jv(e,t,i):t==="array-contains"?new Wv(e,i):t==="in"?new Gv(e,i):t==="not-in"?new Kv(e,i):t==="array-contains-any"?new Qv(e,i):new tt(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new qv(e,i):new Hv(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Oi(t,this.value)):t!==null&&jn(this.value)===jn(t)&&this.matchesComparison(Oi(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return oe(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Wt extends vp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Wt(e,t)}matches(e){return bp(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function bp(n){return n.op==="and"}function wp(n){return Uv(n)&&bp(n)}function Uv(n){for(const e of n.filters)if(e instanceof Wt)return!1;return!0}function so(n){if(n instanceof tt)return n.field.canonicalString()+n.op.toString()+Vi(n.value);if(wp(n))return n.filters.map((e=>so(e))).join(",");{const e=n.filters.map((t=>so(t))).join(",");return`${n.op}(${e})`}}function _p(n,e){return n instanceof tt?(function(i,a){return a instanceof tt&&i.op===a.op&&i.field.isEqual(a.field)&&sn(i.value,a.value)})(n,e):n instanceof Wt?(function(i,a){return a instanceof Wt&&i.op===a.op&&i.filters.length===a.filters.length?i.filters.reduce(((s,o,l)=>s&&_p(o,a.filters[l])),!0):!1})(n,e):void oe(19439)}function xp(n){return n instanceof tt?(function(t){return`${t.field.canonicalString()} ${t.op} ${Vi(t.value)}`})(n):n instanceof Wt?(function(t){return t.op.toString()+" {"+t.getFilters().map(xp).join(" ,")+"}"})(n):"Filter"}class jv extends tt{constructor(e,t,i){super(e,t,i),this.key=ie.fromName(i.referenceValue)}matches(e){const t=ie.comparator(e.key,this.key);return this.matchesComparison(t)}}class qv extends tt{constructor(e,t){super(e,"in",t),this.keys=Ep("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Hv extends tt{constructor(e,t){super(e,"not-in",t),this.keys=Ep("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Ep(n,e){return(e.arrayValue?.values||[]).map((t=>ie.fromName(t.referenceValue)))}class Wv extends tt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Vo(t)&&Pa(t.arrayValue,this.value)}}class Gv extends tt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Pa(this.value.arrayValue,t)}}class Kv extends tt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Pa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Pa(this.value.arrayValue,t)}}class Qv extends tt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Vo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((i=>Pa(this.value.arrayValue,i)))}}class Yv{constructor(e,t=null,i=[],a=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=a,this.limit=s,this.startAt=o,this.endAt=l,this.Te=null}}function sd(n,e=null,t=[],i=[],a=null,s=null,o=null){return new Yv(n,e,t,i,a,s,o)}function Bo(n){const e=ue(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((i=>so(i))).join(","),t+="|ob:",t+=e.orderBy.map((i=>(function(s){return s.field.canonicalString()+s.dir})(i))).join(","),Ys(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((i=>Vi(i))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((i=>Vi(i))).join(",")),e.Te=t}return e.Te}function zo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Fv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_p(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ad(n.startAt,e.startAt)&&ad(n.endAt,e.endAt)}function ro(n){return ie.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}class Hi{constructor(e,t=null,i=[],a=[],s=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=a,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Jv(n,e,t,i,a,s,o,l){return new Hi(n,e,t,i,a,s,o,l)}function Xs(n){return new Hi(n)}function rd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Xv(n){return ie.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ip(n){return n.collectionGroup!==null}function wa(n){const e=ue(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new st(mt.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((u=>{u.isInequality()&&(l=l.add(u.field))}))})),l})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Ra(s,i))})),t.has(mt.keyField().canonicalString())||e.Ie.push(new Ra(mt.keyField(),i))}return e.Ie}function tn(n){const e=ue(n);return e.Ee||(e.Ee=Zv(e,wa(n))),e.Ee}function Zv(n,e){if(n.limitType==="F")return sd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((a=>{const s=a.dir==="desc"?"asc":"desc";return new Ra(a.field,s)}));const t=n.endAt?new Ds(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Ds(n.startAt.position,n.startAt.inclusive):null;return sd(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function oo(n,e){const t=n.filters.concat([e]);return new Hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function eb(n,e){const t=n.explicitOrderBy.concat([e]);return new Hi(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function $s(n,e,t){return new Hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Zs(n,e){return zo(tn(n),tn(e))&&n.limitType===e.limitType}function Tp(n){return`${Bo(tn(n))}|lt:${n.limitType}`}function ki(n){return`Query(target=${(function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map((a=>xp(a))).join(", ")}]`),Ys(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map((a=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(a))).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((a=>Vi(a))).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((a=>Vi(a))).join(",")),`Target(${i})`})(tn(n))}; limitType=${n.limitType})`}function er(n,e){return e.isFoundDocument()&&(function(i,a){const s=a.key.path;return i.collectionGroup!==null?a.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(s):ie.isDocumentKey(i.path)?i.path.isEqual(s):i.path.isImmediateParentOf(s)})(n,e)&&(function(i,a){for(const s of wa(i))if(!s.field.isKeyField()&&a.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(i,a){for(const s of i.filters)if(!s.matches(a))return!1;return!0})(n,e)&&(function(i,a){return!(i.startAt&&!(function(o,l,c){const u=id(o,l,c);return o.inclusive?u<=0:u<0})(i.startAt,wa(i),a)||i.endAt&&!(function(o,l,c){const u=id(o,l,c);return o.inclusive?u>=0:u>0})(i.endAt,wa(i),a))})(n,e)}function tb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function kp(n){return(e,t)=>{let i=!1;for(const a of wa(n)){const s=nb(a,e,t);if(s!==0)return s;i=i||a.field.isKeyField()}return 0}}function nb(n,e,t){const i=n.field.isKeyField()?ie.comparator(e.key,t.key):(function(s,o,l){const c=o.data.field(s),u=l.data.field(s);return c!==null&&u!==null?Oi(c,u):oe(42886)})(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return oe(19790,{direction:n.dir})}}class wi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[a,s]of i)if(this.equalsFn(a,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),a=this.inner[i];if(a===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let s=0;s<a.length;s++)if(this.equalsFn(a[s][0],e))return void(a[s]=[e,t]);a.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let a=0;a<i.length;a++)if(this.equalsFn(i[a][0],e))return i.length===1?delete this.inner[t]:i.splice(a,1),this.innerSize--,!0;return!1}forEach(e){Qn(this.inner,((t,i)=>{for(const[a,s]of i)e(a,s)}))}isEmpty(){return cp(this.inner)}size(){return this.innerSize}}const ib=new Ue(ie.comparator);function gn(){return ib}const Ap=new Ue(ie.comparator);function ha(...n){let e=Ap;for(const t of n)e=e.insert(t.key,t);return e}function Sp(n){let e=Ap;return n.forEach(((t,i)=>e=e.insert(t,i.overlayedDocument))),e}function ii(){return _a()}function Cp(){return _a()}function _a(){return new wi((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ab=new Ue(ie.comparator),sb=new st(ie.comparator);function xe(...n){let e=sb;for(const t of n)e=e.add(t);return e}const rb=new st(_e);function ob(){return rb}function Fo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ps(e)?"-0":e}}function Pp(n){return{integerValue:""+n}}function lb(n,e){return Lv(e)?Pp(e):Fo(n,e)}class tr{constructor(){this._=void 0}}function cb(n,e,t){return n instanceof Ns?(function(a,s){const o={fields:{[pp]:{stringValue:up},[mp]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return s&&Oo(s)&&(s=Js(s)),s&&(o.fields[hp]=s),{mapValue:o}})(t,e):n instanceof La?Lp(n,e):n instanceof Da?Dp(n,e):(function(a,s){const o=Rp(a,s),l=od(o)+od(a.Ae);return ao(o)&&ao(a.Ae)?Pp(l):Fo(a.serializer,l)})(n,e)}function db(n,e,t){return n instanceof La?Lp(n,e):n instanceof Da?Dp(n,e):t}function Rp(n,e){return n instanceof Ms?(function(i){return ao(i)||(function(s){return!!s&&"doubleValue"in s})(i)})(e)?e:{integerValue:0}:null}class Ns extends tr{}class La extends tr{constructor(e){super(),this.elements=e}}function Lp(n,e){const t=$p(e);for(const i of n.elements)t.some((a=>sn(a,i)))||t.push(i);return{arrayValue:{values:t}}}class Da extends tr{constructor(e){super(),this.elements=e}}function Dp(n,e){let t=$p(e);for(const i of n.elements)t=t.filter((a=>!sn(a,i)));return{arrayValue:{values:t}}}class Ms extends tr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function od(n){return Je(n.integerValue||n.doubleValue)}function $p(n){return Vo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function ub(n,e){return n.field.isEqual(e.field)&&(function(i,a){return i instanceof La&&a instanceof La||i instanceof Da&&a instanceof Da?Mi(i.elements,a.elements,sn):i instanceof Ms&&a instanceof Ms?sn(i.Ae,a.Ae):i instanceof Ns&&a instanceof Ns})(n.transform,e.transform)}class pb{constructor(e,t){this.version=e,this.transformResults=t}}class Bt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Bt}static exists(e){return new Bt(void 0,e)}static updateTime(e){return new Bt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class nr{}function Np(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Uo(n.key,Bt.none()):new Ua(n.key,n.data,Bt.none());{const t=n.data,i=St.empty();let a=new st(mt.comparator);for(let s of e.fields)if(!a.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?i.delete(s):i.set(s,o),a=a.add(s)}return new Yn(n.key,i,new $t(a.toArray()),Bt.none())}}function hb(n,e,t){n instanceof Ua?(function(a,s,o){const l=a.value.clone(),c=cd(a.fieldTransforms,s,o.transformResults);l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):n instanceof Yn?(function(a,s,o){if(!vs(a.precondition,s))return void s.convertToUnknownDocument(o.version);const l=cd(a.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(Mp(a)),c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(a,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function xa(n,e,t,i){return n instanceof Ua?(function(s,o,l,c){if(!vs(s.precondition,o))return l;const u=s.value.clone(),h=dd(s.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,i):n instanceof Yn?(function(s,o,l,c){if(!vs(s.precondition,o))return l;const u=dd(s.fieldTransforms,c,o),h=o.data;return h.setAll(Mp(s)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((w=>w.field)))})(n,e,t,i):(function(s,o,l){return vs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l})(n,e,t)}function mb(n,e){let t=null;for(const i of n.fieldTransforms){const a=e.data.field(i.field),s=Rp(i.transform,a||null);s!=null&&(t===null&&(t=St.empty()),t.set(i.field,s))}return t||null}function ld(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(i,a){return i===void 0&&a===void 0||!(!i||!a)&&Mi(i,a,((s,o)=>ub(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ua extends nr{constructor(e,t,i,a=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class Yn extends nr{constructor(e,t,i,a,s=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=a,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Mp(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}})),e}function cd(n,e,t){const i=new Map;Se(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let a=0;a<t.length;a++){const s=n[a],o=s.transform,l=e.data.field(s.field);i.set(s.field,db(o,l,t[a]))}return i}function dd(n,e,t){const i=new Map;for(const a of n){const s=a.transform,o=t.data.field(a.field);i.set(a.field,cb(s,o,e))}return i}class Uo extends nr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class fb extends nr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class gb{constructor(e,t,i,a){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=a}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let a=0;a<this.mutations.length;a++){const s=this.mutations[a];s.key.isEqual(e.key)&&hb(s,e,i[a])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=xa(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=xa(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Cp();return this.mutations.forEach((a=>{const s=e.get(a.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=t.has(a.key)?null:l;const c=Np(o,l);c!==null&&i.set(a.key,c),o.isValidDocument()||o.convertToNoDocument(de.min())})),i}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),xe())}isEqual(e){return this.batchId===e.batchId&&Mi(this.mutations,e.mutations,((t,i)=>ld(t,i)))&&Mi(this.baseMutations,e.baseMutations,((t,i)=>ld(t,i)))}}class jo{constructor(e,t,i,a){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=a}static from(e,t,i){Se(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let a=(function(){return ab})();const s=e.mutations;for(let o=0;o<s.length;o++)a=a.insert(s[o].key,i[o].version);return new jo(e,t,i,a)}}class yb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}class vb{constructor(e,t){this.count=e,this.unchangedNames=t}}var et,Ie;function bb(n){switch(n){case q.OK:return oe(64938);case q.CANCELLED:case q.UNKNOWN:case q.DEADLINE_EXCEEDED:case q.RESOURCE_EXHAUSTED:case q.INTERNAL:case q.UNAVAILABLE:case q.UNAUTHENTICATED:return!1;case q.INVALID_ARGUMENT:case q.NOT_FOUND:case q.ALREADY_EXISTS:case q.PERMISSION_DENIED:case q.FAILED_PRECONDITION:case q.ABORTED:case q.OUT_OF_RANGE:case q.UNIMPLEMENTED:case q.DATA_LOSS:return!0;default:return oe(15467,{code:n})}}function Op(n){if(n===void 0)return fn("GRPC error has no .code"),q.UNKNOWN;switch(n){case et.OK:return q.OK;case et.CANCELLED:return q.CANCELLED;case et.UNKNOWN:return q.UNKNOWN;case et.DEADLINE_EXCEEDED:return q.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return q.RESOURCE_EXHAUSTED;case et.INTERNAL:return q.INTERNAL;case et.UNAVAILABLE:return q.UNAVAILABLE;case et.UNAUTHENTICATED:return q.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return q.INVALID_ARGUMENT;case et.NOT_FOUND:return q.NOT_FOUND;case et.ALREADY_EXISTS:return q.ALREADY_EXISTS;case et.PERMISSION_DENIED:return q.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return q.FAILED_PRECONDITION;case et.ABORTED:return q.ABORTED;case et.OUT_OF_RANGE:return q.OUT_OF_RANGE;case et.UNIMPLEMENTED:return q.UNIMPLEMENTED;case et.DATA_LOSS:return q.DATA_LOSS;default:return oe(39323,{code:n})}}(Ie=et||(et={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";function wb(){return new TextEncoder}const _b=new Nn([4294967295,4294967295],0);function ud(n){const e=wb().encode(n),t=new Xu;return t.update(e),new Uint8Array(t.digest())}function pd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),a=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Nn([t,i],0),new Nn([a,s],0)]}class qo{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new ma(`Invalid padding: ${t}`);if(i<0)throw new ma(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new ma(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new ma(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Nn.fromNumber(this.ge)}ye(e,t,i){let a=e.add(t.multiply(Nn.fromNumber(i)));return a.compare(_b)===1&&(a=new Nn([a.getBits(0),a.getBits(1)],0)),a.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ud(e),[i,a]=pd(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(i,a,s);if(!this.we(o))return!1}return!0}static create(e,t,i){const a=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new qo(s,a,t);return i.forEach((l=>o.insert(l))),o}insert(e){if(this.ge===0)return;const t=ud(e),[i,a]=pd(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(i,a,s);this.be(o)}}be(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class ma extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}class ir{constructor(e,t,i,a,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=a,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const a=new Map;return a.set(e,ja.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new ir(de.min(),a,new Ue(_e),gn(),xe())}}class ja{constructor(e,t,i,a,s){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=a,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new ja(i,t,xe(),xe(),xe())}}class bs{constructor(e,t,i,a){this.Se=e,this.removedTargetIds=t,this.key=i,this.De=a}}class Vp{constructor(e,t){this.targetId=e,this.Ce=t}}class Bp{constructor(e,t,i=ft.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=a}}class hd{constructor(){this.ve=0,this.Fe=md(),this.Me=ft.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=xe(),t=xe(),i=xe();return this.Fe.forEach(((a,s)=>{switch(s){case 0:e=e.add(a);break;case 2:t=t.add(a);break;case 1:i=i.add(a);break;default:oe(38017,{changeType:s})}})),new ja(this.Me,this.xe,e,t,i)}Ke(){this.Oe=!1,this.Fe=md()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Se(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class xb{constructor(e){this.Ge=e,this.ze=new Map,this.je=gn(),this.He=rs(),this.Je=rs(),this.Ze=new Ue(_e)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const i=this.nt(t);switch(e.state){case 0:this.rt(t)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.Ke(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),i.Le(e.resumeToken));break;default:oe(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((i,a)=>{this.rt(a)&&t(a)}))}st(e){const t=e.targetId,i=e.Ce.count,a=this.ot(t);if(a){const s=a.target;if(ro(s))if(i===0){const o=new ie(s.path);this.et(t,o,bt.newNoDocument(o,de.min()))}else Se(i===1,20013,{expectedCount:i});else{const o=this._t(t);if(o!==i){const l=this.ut(e),c=l?this.ct(l,e,o):1;if(c!==0){this.it(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:a=0},hashCount:s=0}=t;let o,l;try{o=Un(i).toUint8Array()}catch(c){if(c instanceof dp)return hi("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new qo(o,a,s)}catch(c){return hi(c instanceof ma?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,i){return t.Ce.count===i-this.Pt(e,t.targetId)?0:2}Pt(e,t){const i=this.Ge.getRemoteKeysForTarget(t);let a=0;return i.forEach((s=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(t,s,null),a++)})),a}Tt(e){const t=new Map;this.ze.forEach(((s,o)=>{const l=this.ot(o);if(l){if(s.current&&ro(l.target)){const c=new ie(l.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,bt.newNoDocument(c,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}}));let i=xe();this.Je.forEach(((s,o)=>{let l=!0;o.forEachWhile((c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(i=i.add(s))})),this.je.forEach(((s,o)=>o.setReadTime(e)));const a=new ir(e,t,this.Ze,this.je,i);return this.je=gn(),this.He=rs(),this.Je=rs(),this.Ze=new Ue(_e),a}Ye(e,t){if(!this.rt(e))return;const i=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,i),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,i){if(!this.rt(e))return;const a=this.nt(e);this.Et(e,t)?a.qe(t,1):a.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),i&&(this.je=this.je.insert(t,i))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new hd,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new st(_e),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new st(_e),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||ee("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new hd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function rs(){return new Ue(ie.comparator)}function md(){return new Ue(ie.comparator)}const Eb={asc:"ASCENDING",desc:"DESCENDING"},Ib={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Tb={and:"AND",or:"OR"};class kb{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function lo(n,e){return n.useProto3Json||Ys(e)?e:{value:e}}function Os(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ab(n,e){return Os(n,e.toTimestamp())}function nn(n){return Se(!!n,49232),de.fromTimestamp((function(t){const i=Fn(t);return new ge(i.seconds,i.nanos)})(n))}function Ho(n,e){return co(n,e).canonicalString()}function co(n,e){const t=(function(a){return new $e(["projects",a.projectId,"databases",a.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Fp(n){const e=$e.fromString(n);return Se(Wp(e),10190,{key:e.toString()}),e}function uo(n,e){return Ho(n.databaseId,e.path)}function Mr(n,e){const t=Fp(e);if(t.get(1)!==n.databaseId.projectId)throw new Z(q.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new Z(q.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new ie(jp(t))}function Up(n,e){return Ho(n.databaseId,e)}function Sb(n){const e=Fp(n);return e.length===4?$e.emptyPath():jp(e)}function po(n){return new $e(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jp(n){return Se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function fd(n,e,t){return{name:uo(n,e),fields:t.value.mapValue.fields}}function Cb(n,e){let t;if("targetChange"in e){e.targetChange;const i=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:oe(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],s=(function(u,h){return u.useProto3Json?(Se(h===void 0||typeof h=="string",58123),ft.fromBase64String(h||"")):(Se(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),ft.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&(function(u){const h=u.code===void 0?q.UNKNOWN:Op(u.code);return new Z(h,u.message||"")})(o);t=new Bp(i,a,s,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const a=Mr(n,i.document.name),s=nn(i.document.updateTime),o=i.document.createTime?nn(i.document.createTime):de.min(),l=new St({mapValue:{fields:i.document.fields}}),c=bt.newFoundDocument(a,s,o,l),u=i.targetIds||[],h=i.removedTargetIds||[];t=new bs(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const a=Mr(n,i.document),s=i.readTime?nn(i.readTime):de.min(),o=bt.newNoDocument(a,s),l=i.removedTargetIds||[];t=new bs([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const a=Mr(n,i.document),s=i.removedTargetIds||[];t=new bs([],s,a,null)}else{if(!("filter"in e))return oe(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:a=0,unchangedNames:s}=i,o=new vb(a,s),l=i.targetId;t=new Vp(l,o)}}return t}function Pb(n,e){let t;if(e instanceof Ua)t={update:fd(n,e.key,e.value)};else if(e instanceof Uo)t={delete:uo(n,e.key)};else if(e instanceof Yn)t={update:fd(n,e.key,e.data),updateMask:Bb(e.fieldMask)};else{if(!(e instanceof fb))return oe(16599,{dt:e.type});t={verify:uo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((i=>(function(s,o){const l=o.transform;if(l instanceof Ns)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof La)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Da)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ms)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw oe(20930,{transform:o.transform})})(0,i)))),e.precondition.isNone||(t.currentDocument=(function(a,s){return s.updateTime!==void 0?{updateTime:Ab(a,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:oe(27497)})(n,e.precondition)),t}function Rb(n,e){return n&&n.length>0?(Se(e!==void 0,14353),n.map((t=>(function(a,s){let o=a.updateTime?nn(a.updateTime):nn(s);return o.isEqual(de.min())&&(o=nn(s)),new pb(o,a.transformResults||[])})(t,e)))):[]}function Lb(n,e){return{documents:[Up(n,e.path)]}}function Db(n,e){const t={structuredQuery:{}},i=e.path;let a;e.collectionGroup!==null?(a=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Up(n,a);const s=(function(u){if(u.length!==0)return Hp(Wt.create(u,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(u){if(u.length!==0)return u.map((h=>(function(b){return{field:Ai(b.field),direction:Mb(b.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=lo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:a}}function $b(n){let e=Sb(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let a=null;if(i>0){Se(i===1,65062);const h=t.from[0];h.allDescendants?a=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(w){const b=qp(w);return b instanceof Wt&&wp(b)?b.getFilters():[b]})(t.where));let o=[];t.orderBy&&(o=(function(w){return w.map((b=>(function(M){return new Ra(Si(M.field),(function(v){switch(v){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(M.direction))})(b)))})(t.orderBy));let l=null;t.limit&&(l=(function(w){let b;return b=typeof w=="object"?w.value:w,Ys(b)?null:b})(t.limit));let c=null;t.startAt&&(c=(function(w){const b=!!w.before,R=w.values||[];return new Ds(R,b)})(t.startAt));let u=null;return t.endAt&&(u=(function(w){const b=!w.before,R=w.values||[];return new Ds(R,b)})(t.endAt)),Jv(e,a,o,s,l,"F",c,u)}function Nb(n,e){const t=(function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return oe(28987,{purpose:a})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function qp(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Si(t.unaryFilter.field);return tt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const a=Si(t.unaryFilter.field);return tt.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Si(t.unaryFilter.field);return tt.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Si(t.unaryFilter.field);return tt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return oe(61313);default:return oe(60726)}})(n):n.fieldFilter!==void 0?(function(t){return tt.create(Si(t.fieldFilter.field),(function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return oe(58110);default:return oe(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Wt.create(t.compositeFilter.filters.map((i=>qp(i))),(function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return oe(1026)}})(t.compositeFilter.op))})(n):oe(30097,{filter:n})}function Mb(n){return Eb[n]}function Ob(n){return Ib[n]}function Vb(n){return Tb[n]}function Ai(n){return{fieldPath:n.canonicalString()}}function Si(n){return mt.fromServerFormat(n.fieldPath)}function Hp(n){return n instanceof tt?(function(t){if(t.op==="=="){if(nd(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NAN"}};if(td(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(nd(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NOT_NAN"}};if(td(t.value))return{unaryFilter:{field:Ai(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ai(t.field),op:Ob(t.op),value:t.value}}})(n):n instanceof Wt?(function(t){const i=t.getFilters().map((a=>Hp(a)));return i.length===1?i[0]:{compositeFilter:{op:Vb(t.op),filters:i}}})(n):oe(54877,{filter:n})}function Bb(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Wp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Gp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Rn{constructor(e,t,i,a,s=de.min(),o=de.min(),l=ft.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=a,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Rn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}class zb{constructor(e){this.yt=e}}function Fb(n){const e=$b({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?$s(e,e.limit,"L"):e}class Ub{constructor(){this.Sn=new jb}addToCollectionParentIndex(e,t){return this.Sn.add(t),H.resolve()}getCollectionParents(e,t){return H.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return H.resolve()}deleteFieldIndex(e,t){return H.resolve()}deleteAllFieldIndexes(e){return H.resolve()}createTargetIndexes(e,t){return H.resolve()}getDocumentsMatchingTarget(e,t){return H.resolve(null)}getIndexType(e,t){return H.resolve(0)}getFieldIndexes(e,t){return H.resolve([])}getNextCollectionGroupToUpdate(e){return H.resolve(null)}getMinOffset(e,t){return H.resolve(zn.min())}getMinOffsetFromCollectionGroup(e,t){return H.resolve(zn.min())}updateCollectionGroup(e,t,i){return H.resolve()}updateIndexEntries(e,t){return H.resolve()}}class jb{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),a=this.index[t]||new st($e.comparator),s=!a.has(i);return this.index[t]=a.add(i),s}has(e){const t=e.lastSegment(),i=e.popLast(),a=this.index[t];return a&&a.has(i)}getEntries(e){return(this.index[e]||new st($e.comparator)).toArray()}}const gd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Kp=41943040;class At{static withCacheSize(e){return new At(e,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(Kp,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);class Bi{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Bi(0)}static ar(){return new Bi(-1)}}const yd="LruGarbageCollector",qb=1048576;function vd([n,e],[t,i]){const a=_e(n,t);return a===0?_e(e,i):a}class Hb{constructor(e){this.Pr=e,this.buffer=new st(vd),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();vd(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Wb{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){ee(yd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qi(t)?ee(yd,"Ignoring IndexedDB error during garbage collection: ",t):await ji(t)}await this.Ar(3e5)}))}}class Gb{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((i=>Math.floor(t/100*i)))}nthSequenceNumber(e,t){if(t===0)return H.resolve(Qs.ce);const i=new Hb(t);return this.Vr.forEachTarget(e,(a=>i.Er(a.sequenceNumber))).next((()=>this.Vr.mr(e,(a=>i.Er(a))))).next((()=>i.maxValue))}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(ee("LruGarbageCollector","Garbage collection skipped; disabled"),H.resolve(gd)):this.getCacheSize(e).next((i=>i<this.params.cacheSizeCollectionThreshold?(ee("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gd):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let i,a,s,o,l,c,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((w=>(w>this.params.maximumSequenceNumbersToCollect?(ee("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),a=this.params.maximumSequenceNumbersToCollect):a=w,o=Date.now(),this.nthSequenceNumber(e,a)))).next((w=>(i=w,l=Date.now(),this.removeTargets(e,i,t)))).next((w=>(s=w,c=Date.now(),this.removeOrphanedDocuments(e,i)))).next((w=>(u=Date.now(),Ti()<=we.DEBUG&&ee("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${a} in `+(l-o)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${w} documents in `+(u-c)+`ms
Total Duration: ${u-h}ms`),H.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:s,documentsRemoved:w}))))}}function Kb(n,e){return new Gb(n,e)}class Qb{constructor(){this.changes=new wi((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,bt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?H.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}class Yb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}class Jb{constructor(e,t,i,a){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=a}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next((a=>(i=a,this.remoteDocumentCache.getEntry(e,t)))).next((a=>(i!==null&&xa(i.mutation,a,$t.empty(),ge.now()),a)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.getLocalViewOfDocuments(e,i,xe()).next((()=>i))))}getLocalViewOfDocuments(e,t,i=xe()){const a=ii();return this.populateOverlays(e,a,t).next((()=>this.computeViews(e,t,a,i).next((s=>{let o=ha();return s.forEach(((l,c)=>{o=o.insert(l,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const i=ii();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,xe())))}populateOverlays(e,t,i){const a=[];return i.forEach((s=>{t.has(s)||a.push(s)})),this.documentOverlayCache.getOverlays(e,a).next((s=>{s.forEach(((o,l)=>{t.set(o,l)}))}))}computeViews(e,t,i,a){let s=gn();const o=_a(),l=(function(){return _a()})();return t.forEach(((c,u)=>{const h=i.get(u.key);a.has(u.key)&&(h===void 0||h.mutation instanceof Yn)?s=s.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),xa(h.mutation,u,h.mutation.getFieldMask(),ge.now())):o.set(u.key,$t.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((u,h)=>o.set(u,h))),t.forEach(((u,h)=>l.set(u,new Yb(h,o.get(u)??null)))),l)))}recalculateAndSaveOverlays(e,t){const i=_a();let a=new Ue(((o,l)=>o-l)),s=xe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const l of o)l.keys().forEach((c=>{const u=t.get(c);if(u===null)return;let h=i.get(c)||$t.empty();h=l.applyToLocalView(u,h),i.set(c,h);const w=(a.get(l.batchId)||xe()).add(c);a=a.insert(l.batchId,w)}))})).next((()=>{const o=[],l=a.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,h=c.value,w=Cp();h.forEach((b=>{if(!s.has(b)){const R=Np(t.get(b),i.get(b));R!==null&&w.set(b,R),s=s.add(b)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,w))}return H.waitFor(o)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.recalculateAndSaveOverlays(e,i)))}getDocumentsMatchingQuery(e,t,i,a){return Xv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ip(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,a):this.getDocumentsMatchingCollectionQuery(e,t,i,a)}getNextDocuments(e,t,i,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,a).next((s=>{const o=a-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,a-s.size):H.resolve(ii());let l=Aa,c=s;return o.next((u=>H.forEach(u,((h,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),s.get(h)?H.resolve():this.remoteDocumentCache.getEntry(e,h).next((b=>{c=c.insert(h,b)}))))).next((()=>this.populateOverlays(e,u,s))).next((()=>this.computeViews(e,c,u,xe()))).next((h=>({batchId:l,changes:Sp(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ie(t)).next((i=>{let a=ha();return i.isFoundDocument()&&(a=a.insert(i.key,i)),a}))}getDocumentsMatchingCollectionGroupQuery(e,t,i,a){const s=t.collectionGroup;let o=ha();return this.indexManager.getCollectionParents(e,s).next((l=>H.forEach(l,(c=>{const u=(function(w,b){return new Hi(b,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,i,a).next((h=>{h.forEach(((w,b)=>{o=o.insert(w,b)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,i,a){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,s,a)))).next((o=>{s.forEach(((c,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,bt.newInvalidDocument(h)))}));let l=ha();return o.forEach(((c,u)=>{const h=s.get(c);h!==void 0&&xa(h.mutation,u,$t.empty(),ge.now()),er(t,u)&&(l=l.insert(c,u))})),l}))}}class Xb{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return H.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(a){return{id:a.id,version:a.version,createTime:nn(a.createTime)}})(t)),H.resolve()}getNamedQuery(e,t){return H.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(a){return{name:a.name,query:Fb(a.bundledQuery),readTime:nn(a.readTime)}})(t)),H.resolve()}}class Zb{constructor(){this.overlays=new Ue(ie.comparator),this.Lr=new Map}getOverlay(e,t){return H.resolve(this.overlays.get(t))}getOverlays(e,t){const i=ii();return H.forEach(t,(a=>this.getOverlay(e,a).next((s=>{s!==null&&i.set(a,s)})))).next((()=>i))}saveOverlays(e,t,i){return i.forEach(((a,s)=>{this.bt(e,t,s)})),H.resolve()}removeOverlaysForBatchId(e,t,i){const a=this.Lr.get(i);return a!==void 0&&(a.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(i)),H.resolve()}getOverlaysForCollection(e,t,i){const a=ii(),s=t.length+1,o=new ie(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>i&&a.set(c.getKey(),c)}return H.resolve(a)}getOverlaysForCollectionGroup(e,t,i,a){let s=new Ue(((u,h)=>u-h));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>i){let h=s.get(u.largestBatchId);h===null&&(h=ii(),s=s.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const l=ii(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((u,h)=>l.set(u,h))),!(l.size()>=a)););return H.resolve(l)}bt(e,t,i){const a=this.overlays.get(i.key);if(a!==null){const o=this.Lr.get(a.largestBatchId).delete(i.key);this.Lr.set(a.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new yb(t,i));let s=this.Lr.get(t);s===void 0&&(s=xe(),this.Lr.set(t,s)),this.Lr.set(t,s.add(i.key))}}class e0{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(e){return H.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,H.resolve()}}class Wo{constructor(){this.kr=new st(dt.Kr),this.qr=new st(dt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const i=new dt(e,t);this.kr=this.kr.add(i),this.qr=this.qr.add(i)}$r(e,t){e.forEach((i=>this.addReference(i,t)))}removeReference(e,t){this.Wr(new dt(e,t))}Qr(e,t){e.forEach((i=>this.removeReference(i,t)))}Gr(e){const t=new ie(new $e([])),i=new dt(t,e),a=new dt(t,e+1),s=[];return this.qr.forEachInRange([i,a],(o=>{this.Wr(o),s.push(o.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new ie(new $e([])),i=new dt(t,e),a=new dt(t,e+1);let s=xe();return this.qr.forEachInRange([i,a],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new dt(e,0),i=this.kr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class dt{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return ie.comparator(e.key,t.key)||_e(e.Hr,t.Hr)}static Ur(e,t){return _e(e.Hr,t.Hr)||ie.comparator(e.key,t.key)}}class t0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new st(dt.Kr)}checkEmpty(e){return H.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,a){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new gb(s,t,i,a);this.mutationQueue.push(o);for(const l of a)this.Jr=this.Jr.add(new dt(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return H.resolve(o)}lookupMutationBatch(e,t){return H.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,a=this.Xr(i),s=a<0?0:a;return H.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return H.resolve(this.mutationQueue.length===0?Mo:this.Yn-1)}getAllMutationBatches(e){return H.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new dt(t,0),a=new dt(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([i,a],(o=>{const l=this.Zr(o.Hr);s.push(l)})),H.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new st(_e);return t.forEach((a=>{const s=new dt(a,0),o=new dt(a,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],(l=>{i=i.add(l.Hr)}))})),H.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,a=i.length+1;let s=i;ie.isDocumentKey(s)||(s=s.child(""));const o=new dt(new ie(s),0);let l=new st(_e);return this.Jr.forEachWhile((c=>{const u=c.key.path;return!!i.isPrefixOf(u)&&(u.length===a&&(l=l.add(c.Hr)),!0)}),o),H.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((i=>{const a=this.Zr(i);a!==null&&t.push(a)})),t}removeMutationBatch(e,t){Se(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Jr;return H.forEach(t.mutations,(a=>{const s=new dt(a.key,t.batchId);return i=i.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)})).next((()=>{this.Jr=i}))}nr(e){}containsKey(e,t){const i=new dt(t,0),a=this.Jr.firstAfterOrEqual(i);return H.resolve(t.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,H.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}class n0{constructor(e){this.ti=e,this.docs=(function(){return new Ue(ie.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,a=this.docs.get(i),s=a?a.size:0,o=this.ti(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return H.resolve(i?i.document.mutableCopy():bt.newInvalidDocument(t))}getEntries(e,t){let i=gn();return t.forEach((a=>{const s=this.docs.get(a);i=i.insert(a,s?s.document.mutableCopy():bt.newInvalidDocument(a))})),H.resolve(i)}getDocumentsMatchingQuery(e,t,i,a){let s=gn();const o=t.path,l=new ie(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Sv(Av(h),i)<=0||(a.has(h.key)||er(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return H.resolve(s)}getAllFromCollectionGroup(e,t,i,a){oe(9500)}ni(e,t){return H.forEach(this.docs,(i=>t(i)))}newChangeBuffer(e){return new i0(this)}getSize(e){return H.resolve(this.size)}}class i0 extends Qb{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((i,a)=>{a.isValidDocument()?t.push(this.Mr.addEntry(e,a)):this.Mr.removeEntry(i)})),H.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}class a0{constructor(e){this.persistence=e,this.ri=new wi((t=>Bo(t)),zo),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.ii=0,this.si=new Wo,this.targetCount=0,this.oi=Bi._r()}forEachTarget(e,t){return this.ri.forEach(((i,a)=>t(a))),H.resolve()}getLastRemoteSnapshotVersion(e){return H.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return H.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),H.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.ii&&(this.ii=t),H.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Bi(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,H.resolve()}updateTargetData(e,t){return this.lr(t),H.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,H.resolve()}removeTargets(e,t,i){let a=0;const s=[];return this.ri.forEach(((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),a++)})),H.waitFor(s).next((()=>a))}getTargetCount(e){return H.resolve(this.targetCount)}getTargetData(e,t){const i=this.ri.get(t)||null;return H.resolve(i)}addMatchingKeys(e,t,i){return this.si.$r(t,i),H.resolve()}removeMatchingKeys(e,t,i){this.si.Qr(t,i);const a=this.persistence.referenceDelegate,s=[];return a&&t.forEach((o=>{s.push(a.markPotentiallyOrphaned(e,o))})),H.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),H.resolve()}getMatchingKeysForTargetId(e,t){const i=this.si.jr(t);return H.resolve(i)}containsKey(e,t){return H.resolve(this.si.containsKey(t))}}class Qp{constructor(e,t){this._i={},this.overlays={},this.ai=new Qs(0),this.ui=!1,this.ui=!0,this.ci=new e0,this.referenceDelegate=e(this),this.li=new a0(this),this.indexManager=new Ub,this.remoteDocumentCache=(function(a){return new n0(a)})((i=>this.referenceDelegate.hi(i))),this.serializer=new zb(t),this.Pi=new Xb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Zb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this._i[e.toKey()];return i||(i=new t0(t,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,i){ee("MemoryPersistence","Starting transaction:",e);const a=new s0(this.ai.next());return this.referenceDelegate.Ti(),i(a).next((s=>this.referenceDelegate.Ii(a).next((()=>s)))).toPromise().then((s=>(a.raiseOnCommittedEvent(),s)))}Ei(e,t){return H.or(Object.values(this._i).map((i=>()=>i.containsKey(e,t))))}}class s0 extends Pv{constructor(e){super(),this.currentSequenceNumber=e}}class Go{constructor(e){this.persistence=e,this.Ri=new Wo,this.Ai=null}static Vi(e){return new Go(e)}get di(){if(this.Ai)return this.Ai;throw oe(60996)}addReference(e,t,i){return this.Ri.addReference(i,t),this.di.delete(i.toString()),H.resolve()}removeReference(e,t,i){return this.Ri.removeReference(i,t),this.di.add(i.toString()),H.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),H.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((a=>this.di.add(a.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next((a=>{a.forEach((s=>this.di.add(s.toString())))})).next((()=>i.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return H.forEach(this.di,(i=>{const a=ie.fromPath(i);return this.mi(e,a).next((s=>{s||t.removeEntry(a,de.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((i=>{i?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return H.or([()=>H.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Vs{constructor(e,t){this.persistence=e,this.fi=new wi((i=>Dv(i.path)),((i,a)=>i.isEqual(a))),this.garbageCollector=Kb(this,t)}static Vi(e,t){return new Vs(e,t)}Ti(){}Ii(e){return H.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((i=>t.next((a=>i+a))))}pr(e){let t=0;return this.mr(e,(i=>{t++})).next((()=>t))}mr(e,t){return H.forEach(this.fi,((i,a)=>this.wr(e,i,a).next((s=>s?H.resolve():t(a)))))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const a=this.persistence.getRemoteDocumentCache(),s=a.newChangeBuffer();return a.ni(e,(o=>this.wr(e,o,t).next((l=>{l||(i++,s.removeEntry(o,de.min()))})))).next((()=>s.apply(e))).next((()=>i))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),H.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),H.resolve()}removeReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),H.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),H.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=gs(e.data.value)),t}wr(e,t,i){return H.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const a=this.fi.get(t);return H.resolve(a!==void 0&&a>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}class Ko{constructor(e,t,i,a){this.targetId=e,this.fromCache=t,this.Ts=i,this.Is=a}static Es(e,t){let i=xe(),a=xe();for(const s of t.docChanges)switch(s.type){case 0:i=i.add(s.doc.key);break;case 1:a=a.add(s.doc.key)}return new Ko(e,t.fromCache,i,a)}}class r0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}class o0{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Dm()?8:Rv(wt())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,i,a){const s={result:null};return this.gs(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.ps(e,t,a,i).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new r0;return this.ys(e,t,o).next((l=>{if(s.result=l,this.As)return this.ws(e,t,o,l.size)}))})).next((()=>s.result))}ws(e,t,i,a){return i.documentReadCount<this.Vs?(Ti()<=we.DEBUG&&ee("QueryEngine","SDK will not create cache indexes for query:",ki(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),H.resolve()):(Ti()<=we.DEBUG&&ee("QueryEngine","Query:",ki(t),"scans",i.documentReadCount,"local documents and returns",a,"documents as results."),i.documentReadCount>this.ds*a?(Ti()<=we.DEBUG&&ee("QueryEngine","The SDK decides to create cache indexes for query:",ki(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tn(t))):H.resolve())}gs(e,t){if(rd(t))return H.resolve(null);let i=tn(t);return this.indexManager.getIndexType(e,i).next((a=>a===0?null:(t.limit!==null&&a===1&&(t=$s(t,null,"F"),i=tn(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next((s=>{const o=xe(...s);return this.fs.getDocuments(e,o).next((l=>this.indexManager.getMinOffset(e,i).next((c=>{const u=this.bs(t,l);return this.Ss(t,u,o,c.readTime)?this.gs(e,$s(t,null,"F")):this.Ds(e,u,t,c)}))))})))))}ps(e,t,i,a){return rd(t)||a.isEqual(de.min())?H.resolve(null):this.fs.getDocuments(e,i).next((s=>{const o=this.bs(t,s);return this.Ss(t,o,i,a)?H.resolve(null):(Ti()<=we.DEBUG&&ee("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),ki(t)),this.Ds(e,o,t,kv(a,Aa)).next((l=>l)))}))}bs(e,t){let i=new st(kp(e));return t.forEach(((a,s)=>{er(e,s)&&(i=i.add(s))})),i}Ss(e,t,i,a){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(a)>0)}ys(e,t,i){return Ti()<=we.DEBUG&&ee("QueryEngine","Using full collection scan to execute query:",ki(t)),this.fs.getDocumentsMatchingQuery(e,t,zn.min(),i)}Ds(e,t,i,a){return this.fs.getDocumentsMatchingQuery(e,i,a).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}const Qo="LocalStore",l0=3e8;class c0{constructor(e,t,i,a){this.persistence=e,this.Cs=t,this.serializer=a,this.vs=new Ue(_e),this.Fs=new wi((s=>Bo(s)),zo),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jb(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function d0(n,e,t,i){return new c0(n,e,t,i)}async function Yp(n,e){const t=ue(n);return await t.persistence.runTransaction("Handle user change","readonly",(i=>{let a;return t.mutationQueue.getAllMutationBatches(i).next((s=>(a=s,t.Os(e),t.mutationQueue.getAllMutationBatches(i)))).next((s=>{const o=[],l=[];let c=xe();for(const u of a){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of s){l.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(i,c).next((u=>({Ns:u,removedBatchIds:o,addedBatchIds:l})))}))}))}function u0(n,e){const t=ue(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const a=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,c,u,h){const w=u.batch,b=w.keys();let R=H.resolve();return b.forEach((M=>{R=R.next((()=>h.getEntry(c,M))).next((D=>{const v=u.docVersions.get(M);Se(v!==null,48541),D.version.compareTo(v)<0&&(w.applyToRemoteDocument(D,u),D.isValidDocument()&&(D.setReadTime(u.commitVersion),h.addEntry(D)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(c,w)))})(t,i,e,s).next((()=>s.apply(i))).next((()=>t.mutationQueue.performConsistencyCheck(i))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(i,a,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(l){let c=xe();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(i,a)))}))}function Jp(n){const e=ue(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function p0(n,e){const t=ue(n),i=e.snapshotVersion;let a=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});a=t.vs;const l=[];e.targetChanges.forEach(((h,w)=>{const b=a.get(w);if(!b)return;l.push(t.li.removeMatchingKeys(s,h.removedDocuments,w).next((()=>t.li.addMatchingKeys(s,h.addedDocuments,w))));let R=b.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(w)!==null?R=R.withResumeToken(ft.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):h.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(h.resumeToken,i)),a=a.insert(w,R),(function(D,v,k){return D.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=l0?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0})(b,R,h)&&l.push(t.li.updateTargetData(s,R))}));let c=gn(),u=xe();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),l.push(h0(s,o,e.documentUpdates).next((h=>{c=h.Bs,u=h.Ls}))),!i.isEqual(de.min())){const h=t.li.getLastRemoteSnapshotVersion(s).next((w=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,i)));l.push(h)}return H.waitFor(l).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,u))).next((()=>c))})).then((s=>(t.vs=a,s)))}function h0(n,e,t){let i=xe(),a=xe();return t.forEach((s=>i=i.add(s))),e.getEntries(n,i).next((s=>{let o=gn();return t.forEach(((l,c)=>{const u=s.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(a=a.add(l)),c.isNoDocument()&&c.version.isEqual(de.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):ee(Qo,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)})),{Bs:o,Ls:a}}))}function m0(n,e){const t=ue(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(i=>(e===void 0&&(e=Mo),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e))))}function f0(n,e){const t=ue(n);return t.persistence.runTransaction("Allocate target","readwrite",(i=>{let a;return t.li.getTargetData(i,e).next((s=>s?(a=s,H.resolve(a)):t.li.allocateTargetId(i).next((o=>(a=new Rn(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.li.addTargetData(i,a).next((()=>a)))))))})).then((i=>{const a=t.vs.get(i.targetId);return(a===null||i.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(t.vs=t.vs.insert(i.targetId,i),t.Fs.set(e,i.targetId)),i}))}async function ho(n,e,t){const i=ue(n),a=i.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",s,(o=>i.persistence.referenceDelegate.removeTarget(o,a)))}catch(o){if(!qi(o))throw o;ee(Qo,`Failed to update sequence numbers for target ${e}: ${o}`)}i.vs=i.vs.remove(e),i.Fs.delete(a.target)}function bd(n,e,t){const i=ue(n);let a=de.min(),s=xe();return i.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,u,h){const w=ue(c),b=w.Fs.get(h);return b!==void 0?H.resolve(w.vs.get(b)):w.li.getTargetData(u,h)})(i,o,tn(e)).next((l=>{if(l)return a=l.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(o,l.targetId).next((c=>{s=c}))})).next((()=>i.Cs.getDocumentsMatchingQuery(o,e,t?a:de.min(),t?s:xe()))).next((l=>(g0(i,tb(e),l),{documents:l,ks:s})))))}function g0(n,e,t){let i=n.Ms.get(e)||de.min();t.forEach(((a,s)=>{s.readTime.compareTo(i)>0&&(i=s.readTime)})),n.Ms.set(e,i)}class wd{constructor(){this.activeTargetIds=ob()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class y0{constructor(){this.vo=new wd,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,i){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new wd,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}class v0{Mo(e){}shutdown(){}}const _d="ConnectivityMonitor";class xd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){ee(_d,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){ee(_d,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let os=null;function mo(){return os===null?os=(function(){return 268435456+Math.round(2147483648*Math.random())})():os++,"0x"+os.toString(16)}const Or="RestConnection",b0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class w0{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${i}/databases/${a}`,this.$o=this.databaseId.database===Rs?`project_id=${i}`:`project_id=${i}&database_id=${a}`}Wo(e,t,i,a,s){const o=mo(),l=this.Qo(e,t.toUriEncodedString());ee(Or,`Sending RPC '${e}' ${o}:`,l,i);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,a,s);const{host:u}=new URL(l),h=Wn(u);return this.zo(e,l,c,i,h).then((w=>(ee(Or,`Received RPC '${e}' ${o}: `,w),w)),(w=>{throw hi(Or,`RPC '${e}' ${o} failed with error: `,w,"url: ",l,"request:",i),w}))}jo(e,t,i,a,s,o){return this.Wo(e,t,i,a,s)}Go(e,t,i){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ui})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((a,s)=>e[s]=a)),i&&i.headers.forEach(((a,s)=>e[s]=a))}Qo(e,t){const i=b0[e];let a=`${this.qo}/v1/${t}:${i}`;return this.databaseInfo.apiKey&&(a=`${a}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),a}terminate(){}}class _0{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}const yt="WebChannelConnection",sa=(n,e,t)=>{n.listen(e,(i=>{try{t(i)}catch(a){setTimeout((()=>{throw a}),0)}}))};class Di extends w0{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Di.c_){const e=np();sa(e,tp.STAT_EVENT,(t=>{t.stat===to.PROXY?ee(yt,"STAT_EVENT: detected buffering proxy"):t.stat===to.NOPROXY&&ee(yt,"STAT_EVENT: detected no buffering proxy")})),Di.c_=!0}}zo(e,t,i,a,s){const o=mo();return new Promise(((l,c)=>{const u=new Zu;u.setWithCredentials(!0),u.listenOnce(ep.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case fs.NO_ERROR:const w=u.getResponseJson();ee(yt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(w)),l(w);break;case fs.TIMEOUT:ee(yt,`RPC '${e}' ${o} timed out`),c(new Z(q.DEADLINE_EXCEEDED,"Request time out"));break;case fs.HTTP_ERROR:const b=u.getStatus();if(ee(yt,`RPC '${e}' ${o} failed with status:`,b,"response text:",u.getResponseText()),b>0){let R=u.getResponseJson();Array.isArray(R)&&(R=R[0]);const M=R?.error;if(M&&M.status&&M.message){const D=(function(k){const S=k.toLowerCase().replace(/_/g,"-");return Object.values(q).indexOf(S)>=0?S:q.UNKNOWN})(M.status);c(new Z(D,M.message))}else c(new Z(q.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new Z(q.UNAVAILABLE,"Connection failed."));break;default:oe(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{ee(yt,`RPC '${e}' ${o} completed.`)}}));const h=JSON.stringify(a);ee(yt,`RPC '${e}' ${o} sending request:`,a),u.send(t,"POST",h,i,15)}))}T_(e,t,i){const a=mo(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,i),l.encodeInitMessageHeaders=!0;const u=s.join("");ee(yt,`Creating RPC '${e}' stream ${a}: ${u}`,l);const h=o.createWebChannel(u,l);this.I_(h);let w=!1,b=!1;const R=new _0({Ho:M=>{b?ee(yt,`Not sending because RPC '${e}' stream ${a} is closed:`,M):(w||(ee(yt,`Opening RPC '${e}' stream ${a} transport.`),h.open(),w=!0),ee(yt,`RPC '${e}' stream ${a} sending:`,M),h.send(M))},Jo:()=>h.close()});return sa(h,pa.EventType.OPEN,(()=>{b||(ee(yt,`RPC '${e}' stream ${a} transport opened.`),R.i_())})),sa(h,pa.EventType.CLOSE,(()=>{b||(b=!0,ee(yt,`RPC '${e}' stream ${a} transport closed`),R.o_(),this.E_(h))})),sa(h,pa.EventType.ERROR,(M=>{b||(b=!0,hi(yt,`RPC '${e}' stream ${a} transport errored. Name:`,M.name,"Message:",M.message),R.o_(new Z(q.UNAVAILABLE,"The operation could not be completed")))})),sa(h,pa.EventType.MESSAGE,(M=>{if(!b){const D=M.data[0];Se(!!D,16349);const v=D,k=v?.error||v[0]?.error;if(k){ee(yt,`RPC '${e}' stream ${a} received error:`,k);const S=k.status;let $=(function(A){const f=et[A];if(f!==void 0)return Op(f)})(S),C=k.message;S==="NOT_FOUND"&&C.includes("database")&&C.includes("does not exist")&&C.includes(this.databaseId.database)&&hi(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),$===void 0&&($=q.INTERNAL,C="Unknown error status: "+S+" with message "+k.message),b=!0,R.o_(new Z($,C)),h.close()}else ee(yt,`RPC '${e}' stream ${a} received:`,D),R.__(D)}})),Di.u_(),setTimeout((()=>{R.s_()}),0),R}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,i){super.Go(e,t,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ip()}}function x0(n){return new Di(n)}function Vr(){return typeof document<"u"?document:null}function ar(n){return new kb(n,!0)}Di.c_=!1;class Xp{constructor(e,t,i=1e3,a=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=i,this.A_=a,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),a=Math.max(0,t-i);a>0&&ee("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,a,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const Ed="PersistentStream";class Zp{constructor(e,t,i,a,s,o,l,c){this.Ci=e,this.b_=i,this.S_=a,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Xp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===q.RESOURCE_EXHAUSTED?(fn(t.toString()),fn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,a])=>{this.D_===t&&this.G_(i,a)}),(i=>{e((()=>{const a=new Z(q.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(a)}))}))}G_(e,t){const i=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{i((()=>this.listener.Zo()))})),this.stream.Yo((()=>{i((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((a=>{i((()=>this.z_(a)))})),this.stream.onMessage((a=>{i((()=>++this.F_==1?this.H_(a):this.onNext(a)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return ee(Ed,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(ee(Ed,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class E0 extends Zp{constructor(e,t,i,a,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,a,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Cb(this.serializer,e),i=(function(s){if(!("targetChange"in s))return de.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?de.min():o.readTime?nn(o.readTime):de.min()})(e);return this.listener.J_(t,i)}Z_(e){const t={};t.database=po(this.serializer),t.addTarget=(function(s,o){let l;const c=o.target;if(l=ro(c)?{documents:Lb(s,c)}:{query:Db(s,c).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=zp(s,o.resumeToken);const u=lo(s,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(de.min())>0){l.readTime=Os(s,o.snapshotVersion.toTimestamp());const u=lo(s,o.expectedCount);u!==null&&(l.expectedCount=u)}return l})(this.serializer,e);const i=Nb(this.serializer,e);i&&(t.labels=i),this.K_(t)}X_(e){const t={};t.database=po(this.serializer),t.removeTarget=e,this.K_(t)}}class I0 extends Zp{constructor(e,t,i,a,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,a,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return Se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Rb(e.writeResults,e.commitTime),i=nn(e.commitTime);return this.listener.na(i,t)}ra(){const e={};e.database=po(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((i=>Pb(this.serializer,i)))};this.K_(t)}}class T0{}class k0 extends T0{constructor(e,t,i,a){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=a,this.ia=!1}sa(){if(this.ia)throw new Z(q.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Wo(e,co(t,i),a,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new Z(q.UNKNOWN,s.toString())}))}jo(e,t,i,a,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.jo(e,co(t,i),a,o,l,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Z(q.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function A0(n,e,t,i){return new k0(n,e,t,i)}class S0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(fn(t),this.aa=!1):ee("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const mi="RemoteStore";class C0{constructor(e,t,i,a,s){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((o=>{i.enqueueAndForget((async()=>{_i(this)&&(ee(mi,"Restarting streams for network reachability change."),await(async function(c){const u=ue(c);u.Ea.add(4),await qa(u),u.Va.set("Unknown"),u.Ea.delete(4),await sr(u)})(this))}))})),this.Va=new S0(i,a)}}async function sr(n){if(_i(n))for(const e of n.Ra)await e(!0)}async function qa(n){for(const e of n.Ra)await e(!1)}function eh(n,e){const t=ue(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Zo(t)?Xo(t):Wi(t).O_()&&Jo(t,e))}function Yo(n,e){const t=ue(n),i=Wi(t);t.Ia.delete(e),i.O_()&&th(t,e),t.Ia.size===0&&(i.O_()?i.L_():_i(t)&&t.Va.set("Unknown"))}function Jo(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(de.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Wi(n).Z_(e)}function th(n,e){n.da.$e(e),Wi(n).X_(e)}function Xo(n){n.da=new xb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Wi(n).start(),n.Va.ua()}function Zo(n){return _i(n)&&!Wi(n).x_()&&n.Ia.size>0}function _i(n){return ue(n).Ea.size===0}function nh(n){n.da=void 0}async function P0(n){n.Va.set("Online")}async function R0(n){n.Ia.forEach(((e,t)=>{Jo(n,e)}))}async function L0(n,e){nh(n),Zo(n)?(n.Va.ha(e),Xo(n)):n.Va.set("Unknown")}async function D0(n,e,t){if(n.Va.set("Online"),e instanceof Bp&&e.state===2&&e.cause)try{await(async function(a,s){const o=s.cause;for(const l of s.targetIds)a.Ia.has(l)&&(await a.remoteSyncer.rejectListen(l,o),a.Ia.delete(l),a.da.removeTarget(l))})(n,e)}catch(i){ee(mi,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Bs(n,i)}else if(e instanceof bs?n.da.Xe(e):e instanceof Vp?n.da.st(e):n.da.tt(e),!t.isEqual(de.min()))try{const i=await Jp(n.localStore);t.compareTo(i)>=0&&await(function(s,o){const l=s.da.Tt(o);return l.targetChanges.forEach(((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.Ia.get(u);h&&s.Ia.set(u,h.withResumeToken(c.resumeToken,o))}})),l.targetMismatches.forEach(((c,u)=>{const h=s.Ia.get(c);if(!h)return;s.Ia.set(c,h.withResumeToken(ft.EMPTY_BYTE_STRING,h.snapshotVersion)),th(s,c);const w=new Rn(h.target,c,u,h.sequenceNumber);Jo(s,w)})),s.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(i){ee(mi,"Failed to raise snapshot:",i),await Bs(n,i)}}async function Bs(n,e,t){if(!qi(e))throw e;n.Ea.add(1),await qa(n),n.Va.set("Offline"),t||(t=()=>Jp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{ee(mi,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await sr(n)}))}function ih(n,e){return e().catch((t=>Bs(n,t,e)))}async function rr(n){const e=ue(n),t=qn(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Mo;for(;$0(e);)try{const a=await m0(e.localStore,i);if(a===null){e.Ta.length===0&&t.L_();break}i=a.batchId,N0(e,a)}catch(a){await Bs(e,a)}ah(e)&&sh(e)}function $0(n){return _i(n)&&n.Ta.length<10}function N0(n,e){n.Ta.push(e);const t=qn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function ah(n){return _i(n)&&!qn(n).x_()&&n.Ta.length>0}function sh(n){qn(n).start()}async function M0(n){qn(n).ra()}async function O0(n){const e=qn(n);for(const t of n.Ta)e.ea(t.mutations)}async function V0(n,e,t){const i=n.Ta.shift(),a=jo.from(i,e,t);await ih(n,(()=>n.remoteSyncer.applySuccessfulWrite(a))),await rr(n)}async function B0(n,e){e&&qn(n).Y_&&await(async function(i,a){if((function(o){return bb(o)&&o!==q.ABORTED})(a.code)){const s=i.Ta.shift();qn(i).B_(),await ih(i,(()=>i.remoteSyncer.rejectFailedWrite(s.batchId,a))),await rr(i)}})(n,e),ah(n)&&sh(n)}async function Id(n,e){const t=ue(n);t.asyncQueue.verifyOperationInProgress(),ee(mi,"RemoteStore received new credentials");const i=_i(t);t.Ea.add(3),await qa(t),i&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await sr(t)}async function z0(n,e){const t=ue(n);e?(t.Ea.delete(2),await sr(t)):e||(t.Ea.add(2),await qa(t),t.Va.set("Unknown"))}function Wi(n){return n.ma||(n.ma=(function(t,i,a){const s=ue(t);return s.sa(),new E0(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,a)})(n.datastore,n.asyncQueue,{Zo:P0.bind(null,n),Yo:R0.bind(null,n),t_:L0.bind(null,n),J_:D0.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Zo(n)?Xo(n):n.Va.set("Unknown")):(await n.ma.stop(),nh(n))}))),n.ma}function qn(n){return n.fa||(n.fa=(function(t,i,a){const s=ue(t);return s.sa(),new I0(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,a)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:M0.bind(null,n),t_:B0.bind(null,n),ta:O0.bind(null,n),na:V0.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await rr(n)):(await n.fa.stop(),n.Ta.length>0&&(ee(mi,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class el{constructor(e,t,i,a,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=a,this.removalCallback=s,this.deferred=new dn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,a,s){const o=Date.now()+i,l=new el(e,t,o,a,s);return l.start(i),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(q.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function tl(n,e){if(fn("AsyncQueue",`${e}: ${n}`),qi(n))return new Z(q.UNAVAILABLE,`${e}: ${n}`);throw n}class $i{static emptySet(e){return new $i(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||ie.comparator(t.key,i.key):(t,i)=>ie.comparator(t.key,i.key),this.keyedMap=ha(),this.sortedSet=new Ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,i)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $i)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const a=t.getNext().key,s=i.getNext().key;if(!a.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new $i;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}class Td{constructor(){this.ga=new Ue(ie.comparator)}track(e){const t=e.doc.key,i=this.ga.get(t);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(t,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(t):e.type===1&&i.type===2?this.ga=this.ga.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):oe(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,i)=>{e.push(i)})),e}}class zi{constructor(e,t,i,a,s,o,l,c,u){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=a,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,i,a,s){const o=[];return t.forEach((l=>{o.push({type:0,doc:l})})),new zi(e,t,$i.emptySet(t),o,i,a,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Zs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let a=0;a<t.length;a++)if(t[a].type!==i[a].type||!t[a].doc.isEqual(i[a].doc))return!1;return!0}}class F0{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class U0{constructor(){this.queries=kd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,i){const a=ue(t),s=a.queries;a.queries=kd(),s.forEach(((o,l)=>{for(const c of l.ba)c.onError(i)}))})(this,new Z(q.ABORTED,"Firestore shutting down"))}}function kd(){return new wi((n=>Tp(n)),Zs)}async function nl(n,e){const t=ue(n);let i=3;const a=e.query;let s=t.queries.get(a);s?!s.Sa()&&e.Da()&&(i=2):(s=new F0,i=e.Da()?0:1);try{switch(i){case 0:s.wa=await t.onListen(a,!0);break;case 1:s.wa=await t.onListen(a,!1);break;case 2:await t.onFirstRemoteStoreListen(a)}}catch(o){const l=tl(o,`Initialization of query '${ki(e.query)}' failed`);return void e.onError(l)}t.queries.set(a,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&al(t)}async function il(n,e){const t=ue(n),i=e.query;let a=3;const s=t.queries.get(i);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?a=e.Da()?0:1:!s.Sa()&&e.Da()&&(a=2))}switch(a){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function j0(n,e){const t=ue(n);let i=!1;for(const a of e){const s=a.query,o=t.queries.get(s);if(o){for(const l of o.ba)l.Fa(a)&&(i=!0);o.wa=a}}i&&al(t)}function q0(n,e,t){const i=ue(n),a=i.queries.get(e);if(a)for(const s of a.ba)s.onError(t);i.queries.delete(e)}function al(n){n.Ca.forEach((e=>{e.next()}))}var fo,Ad;(Ad=fo||(fo={})).Ma="default",Ad.Cache="cache";class sl{constructor(e,t,i){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const a of e.docChanges)a.type!==3&&i.push(a);e=new zi(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const i=t!=="Offline";return(!this.options.Ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=zi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fo.Cache}}class rh{constructor(e){this.key=e}}class oh{constructor(e){this.key=e}}class H0{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=xe(),this.mutatedKeys=xe(),this.eu=kp(e),this.tu=new $i(this.eu)}get nu(){return this.Za}ru(e,t){const i=t?t.iu:new Td,a=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=a,l=!1;const c=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,u=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal(((h,w)=>{const b=a.get(h),R=er(this.query,w)?w:null,M=!!b&&this.mutatedKeys.has(b.key),D=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let v=!1;b&&R?b.data.isEqual(R.data)?M!==D&&(i.track({type:3,doc:R}),v=!0):this.su(b,R)||(i.track({type:2,doc:R}),v=!0,(c&&this.eu(R,c)>0||u&&this.eu(R,u)<0)&&(l=!0)):!b&&R?(i.track({type:0,doc:R}),v=!0):b&&!R&&(i.track({type:1,doc:b}),v=!0,(c||u)&&(l=!0)),v&&(R?(o=o.add(R),s=D?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),i.track({type:1,doc:h})}return{tu:o,iu:i,Ss:l,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,a){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((h,w)=>(function(R,M){const D=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return oe(20277,{Vt:v})}};return D(R)-D(M)})(h.type,w.type)||this.eu(h.doc,w.doc))),this.ou(i),a=a??!1;const l=t&&!a?this._u():[],c=this.Ya.size===0&&this.current&&!a?1:0,u=c!==this.Xa;return this.Xa=c,o.length!==0||u?{snapshot:new zi(this.query,e.tu,s,o,e.mutatedKeys,c===0,u,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Td,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=xe(),this.tu.forEach((i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))}));const t=[];return e.forEach((i=>{this.Ya.has(i)||t.push(new oh(i))})),this.Ya.forEach((i=>{e.has(i)||t.push(new rh(i))})),t}cu(e){this.Za=e.ks,this.Ya=xe();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return zi.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const rl="SyncEngine";class W0{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class G0{constructor(e){this.key=e,this.hu=!1}}class K0{constructor(e,t,i,a,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=a,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new wi((l=>Tp(l)),Zs),this.Iu=new Map,this.Eu=new Set,this.Ru=new Ue(ie.comparator),this.Au=new Map,this.Vu=new Wo,this.du={},this.mu=new Map,this.fu=Bi.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Q0(n,e,t=!0){const i=hh(n);let a;const s=i.Tu.get(e);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),a=s.view.lu()):a=await lh(i,e,t,!0),a}async function Y0(n,e){const t=hh(n);await lh(t,e,!0,!1)}async function lh(n,e,t,i){const a=await f0(n.localStore,tn(e)),s=a.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let l;return i&&(l=await J0(n,e,s,o==="current",a.resumeToken)),n.isPrimaryClient&&t&&eh(n.remoteStore,a),l}async function J0(n,e,t,i,a){n.pu=(w,b,R)=>(async function(D,v,k,S){let $=v.view.ru(k);$.Ss&&($=await bd(D.localStore,v.query,!1).then((({documents:f})=>v.view.ru(f,$))));const C=S&&S.targetChanges.get(v.targetId),T=S&&S.targetMismatches.get(v.targetId)!=null,A=v.view.applyChanges($,D.isPrimaryClient,C,T);return Cd(D,v.targetId,A.au),A.snapshot})(n,w,b,R);const s=await bd(n.localStore,e,!0),o=new H0(e,s.ks),l=o.ru(s.documents),c=ja.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",a),u=o.applyChanges(l,n.isPrimaryClient,c);Cd(n,t,u.au);const h=new W0(e,t,o);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function X0(n,e,t){const i=ue(n),a=i.Tu.get(e),s=i.Iu.get(a.targetId);if(s.length>1)return i.Iu.set(a.targetId,s.filter((o=>!Zs(o,e)))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(a.targetId),i.sharedClientState.isActiveQueryTarget(a.targetId)||await ho(i.localStore,a.targetId,!1).then((()=>{i.sharedClientState.clearQueryState(a.targetId),t&&Yo(i.remoteStore,a.targetId),go(i,a.targetId)})).catch(ji)):(go(i,a.targetId),await ho(i.localStore,a.targetId,!0))}async function Z0(n,e){const t=ue(n),i=t.Tu.get(e),a=t.Iu.get(i.targetId);t.isPrimaryClient&&a.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Yo(t.remoteStore,i.targetId))}async function ew(n,e,t){const i=ow(n);try{const a=await(function(o,l){const c=ue(o),u=ge.now(),h=l.reduce(((R,M)=>R.add(M.key)),xe());let w,b;return c.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let M=gn(),D=xe();return c.xs.getEntries(R,h).next((v=>{M=v,M.forEach(((k,S)=>{S.isValidDocument()||(D=D.add(k))}))})).next((()=>c.localDocuments.getOverlayedDocuments(R,M))).next((v=>{w=v;const k=[];for(const S of l){const $=mb(S,w.get(S.key).overlayedDocument);$!=null&&k.push(new Yn(S.key,$,yp($.value.mapValue),Bt.exists(!0)))}return c.mutationQueue.addMutationBatch(R,u,k,l)})).next((v=>{b=v;const k=v.applyToLocalDocumentSet(w,D);return c.documentOverlayCache.saveOverlays(R,v.batchId,k)}))})).then((()=>({batchId:b.batchId,changes:Sp(w)})))})(i.localStore,e);i.sharedClientState.addPendingMutation(a.batchId),(function(o,l,c){let u=o.du[o.currentUser.toKey()];u||(u=new Ue(_e)),u=u.insert(l,c),o.du[o.currentUser.toKey()]=u})(i,a.batchId,t),await Ha(i,a.changes),await rr(i.remoteStore)}catch(a){const s=tl(a,"Failed to persist write");t.reject(s)}}async function ch(n,e){const t=ue(n);try{const i=await p0(t.localStore,e);e.targetChanges.forEach(((a,s)=>{const o=t.Au.get(s);o&&(Se(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1,22616),a.addedDocuments.size>0?o.hu=!0:a.modifiedDocuments.size>0?Se(o.hu,14607):a.removedDocuments.size>0&&(Se(o.hu,42227),o.hu=!1))})),await Ha(t,i,e)}catch(i){await ji(i)}}function Sd(n,e,t){const i=ue(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const a=[];i.Tu.forEach(((s,o)=>{const l=o.view.va(e);l.snapshot&&a.push(l.snapshot)})),(function(o,l){const c=ue(o);c.onlineState=l;let u=!1;c.queries.forEach(((h,w)=>{for(const b of w.ba)b.va(l)&&(u=!0)})),u&&al(c)})(i.eventManager,e),a.length&&i.Pu.J_(a),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function tw(n,e,t){const i=ue(n);i.sharedClientState.updateQueryState(e,"rejected",t);const a=i.Au.get(e),s=a&&a.key;if(s){let o=new Ue(ie.comparator);o=o.insert(s,bt.newNoDocument(s,de.min()));const l=xe().add(s),c=new ir(de.min(),new Map,new Ue(_e),o,l);await ch(i,c),i.Ru=i.Ru.remove(s),i.Au.delete(e),ol(i)}else await ho(i.localStore,e,!1).then((()=>go(i,e,t))).catch(ji)}async function nw(n,e){const t=ue(n),i=e.batch.batchId;try{const a=await u0(t.localStore,e);uh(t,i,null),dh(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await Ha(t,a)}catch(a){await ji(a)}}async function iw(n,e,t){const i=ue(n);try{const a=await(function(o,l){const c=ue(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let h;return c.mutationQueue.lookupMutationBatch(u,l).next((w=>(Se(w!==null,37113),h=w.keys(),c.mutationQueue.removeMutationBatch(u,w)))).next((()=>c.mutationQueue.performConsistencyCheck(u))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h))).next((()=>c.localDocuments.getDocuments(u,h)))}))})(i.localStore,e);uh(i,e,t),dh(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await Ha(i,a)}catch(a){await ji(a)}}function dh(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function uh(n,e,t){const i=ue(n);let a=i.du[i.currentUser.toKey()];if(a){const s=a.get(e);s&&(t?s.reject(t):s.resolve(),a=a.remove(e)),i.du[i.currentUser.toKey()]=a}}function go(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Iu.get(e))n.Tu.delete(i),t&&n.Pu.yu(i,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((i=>{n.Vu.containsKey(i)||ph(n,i)}))}function ph(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Yo(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),ol(n))}function Cd(n,e,t){for(const i of t)i instanceof rh?(n.Vu.addReference(i.key,e),aw(n,i)):i instanceof oh?(ee(rl,"Document no longer in limbo: "+i.key),n.Vu.removeReference(i.key,e),n.Vu.containsKey(i.key)||ph(n,i.key)):oe(19791,{wu:i})}function aw(n,e){const t=e.key,i=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(i)||(ee(rl,"New document in limbo: "+t),n.Eu.add(i),ol(n))}function ol(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new ie($e.fromString(e)),i=n.fu.next();n.Au.set(i,new G0(t)),n.Ru=n.Ru.insert(t,i),eh(n.remoteStore,new Rn(tn(Xs(t.path)),i,"TargetPurposeLimboResolution",Qs.ce))}}async function Ha(n,e,t){const i=ue(n),a=[],s=[],o=[];i.Tu.isEmpty()||(i.Tu.forEach(((l,c)=>{o.push(i.pu(c,e,t).then((u=>{if((u||t)&&i.isPrimaryClient){const h=u?!u.fromCache:t?.targetChanges.get(c.targetId)?.current;i.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(u){a.push(u);const h=Ko.Es(c.targetId,u);s.push(h)}})))})),await Promise.all(o),i.Pu.J_(a),await(async function(c,u){const h=ue(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(w=>H.forEach(u,(b=>H.forEach(b.Ts,(R=>h.persistence.referenceDelegate.addReference(w,b.targetId,R))).next((()=>H.forEach(b.Is,(R=>h.persistence.referenceDelegate.removeReference(w,b.targetId,R)))))))))}catch(w){if(!qi(w))throw w;ee(Qo,"Failed to update sequence numbers: "+w)}for(const w of u){const b=w.targetId;if(!w.fromCache){const R=h.vs.get(b),M=R.snapshotVersion,D=R.withLastLimboFreeSnapshotVersion(M);h.vs=h.vs.insert(b,D)}}})(i.localStore,s))}async function sw(n,e){const t=ue(n);if(!t.currentUser.isEqual(e)){ee(rl,"User change. New user:",e.toKey());const i=await Yp(t.localStore,e);t.currentUser=e,(function(s,o){s.mu.forEach((l=>{l.forEach((c=>{c.reject(new Z(q.CANCELLED,o))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Ha(t,i.Ns)}}function rw(n,e){const t=ue(n),i=t.Au.get(e);if(i&&i.hu)return xe().add(i.key);{let a=xe();const s=t.Iu.get(e);if(!s)return a;for(const o of s){const l=t.Tu.get(o);a=a.unionWith(l.view.nu)}return a}}function hh(n){const e=ue(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ch.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=rw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=tw.bind(null,e),e.Pu.J_=j0.bind(null,e.eventManager),e.Pu.yu=q0.bind(null,e.eventManager),e}function ow(n){const e=ue(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=nw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iw.bind(null,e),e}class zs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ar(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return d0(this.persistence,new o0,e.initialUser,this.serializer)}Cu(e){return new Qp(Go.Vi,this.serializer)}Du(e){return new y0}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}zs.provider={build:()=>new zs};class lw extends zs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Se(this.persistence.referenceDelegate instanceof Vs,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new Wb(i,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new Qp((i=>Vs.Vi(i,t)),this.serializer)}}class yo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Sd(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=sw.bind(null,this.syncEngine),await z0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new U0})()}createDatastore(e){const t=ar(e.databaseInfo.databaseId),i=x0(e.databaseInfo);return A0(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return(function(i,a,s,o,l){return new C0(i,a,s,o,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Sd(this.syncEngine,t,0)),(function(){return xd.v()?new xd:new v0})())}createSyncEngine(e,t){return(function(a,s,o,l,c,u,h){const w=new K0(a,s,o,l,c,u);return h&&(w.gu=!0),w})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const i=ue(t);ee(mi,"RemoteStore shutting down."),i.Ea.add(5),await qa(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}yo.provider={build:()=>new yo};class ll{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):fn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}const Hn="FirestoreClient";class cw{constructor(e,t,i,a,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this._databaseInfo=a,this.user=vt.UNAUTHENTICATED,this.clientId=No.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(i,(async o=>{ee(Hn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(i,(o=>(ee(Hn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new dn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=tl(t,"Failed to shutdown persistence");e.reject(i)}})),e.promise}}async function Br(n,e){n.asyncQueue.verifyOperationInProgress(),ee(Hn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener((async a=>{i.isEqual(a)||(await Yp(e.localStore,a),i=a)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Pd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await dw(n);ee(Hn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((i=>Id(e.remoteStore,i))),n.setAppCheckTokenChangeListener(((i,a)=>Id(e.remoteStore,a))),n._onlineComponents=e}async function dw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){ee(Hn,"Using user provided OfflineComponentProvider");try{await Br(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(a){return a.name==="FirebaseError"?a.code===q.FAILED_PRECONDITION||a.code===q.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11})(t))throw t;hi("Error using user provided cache. Falling back to memory cache: "+t),await Br(n,new zs)}}else ee(Hn,"Using default OfflineComponentProvider"),await Br(n,new lw(void 0));return n._offlineComponents}async function mh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(ee(Hn,"Using user provided OnlineComponentProvider"),await Pd(n,n._uninitializedComponentsProvider._online)):(ee(Hn,"Using default OnlineComponentProvider"),await Pd(n,new yo))),n._onlineComponents}function uw(n){return mh(n).then((e=>e.syncEngine))}async function Fs(n){const e=await mh(n),t=e.eventManager;return t.onListen=Q0.bind(null,e.syncEngine),t.onUnlisten=X0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Y0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Z0.bind(null,e.syncEngine),t}function pw(n,e,t,i){const a=new ll(i),s=new sl(e,a,t);return n.asyncQueue.enqueueAndForget((async()=>nl(await Fs(n),s))),()=>{a.Nu(),n.asyncQueue.enqueueAndForget((async()=>il(await Fs(n),s)))}}function hw(n,e,t={}){const i=new dn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,l,c,u){const h=new ll({next:b=>{h.Nu(),o.enqueueAndForget((()=>il(s,w)));const R=b.docs.has(l);!R&&b.fromCache?u.reject(new Z(q.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&b.fromCache&&c&&c.source==="server"?u.reject(new Z(q.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(b)},error:b=>u.reject(b)}),w=new sl(Xs(l.path),h,{includeMetadataChanges:!0,Ka:!0});return nl(s,w)})(await Fs(n),n.asyncQueue,e,t,i))),i.promise}function mw(n,e,t={}){const i=new dn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,l,c,u){const h=new ll({next:b=>{h.Nu(),o.enqueueAndForget((()=>il(s,w))),b.fromCache&&c.source==="server"?u.reject(new Z(q.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(b)},error:b=>u.reject(b)}),w=new sl(l,h,{includeMetadataChanges:!0,Ka:!0});return nl(s,w)})(await Fs(n),n.asyncQueue,e,t,i))),i.promise}function fw(n,e){const t=new dn;return n.asyncQueue.enqueueAndForget((async()=>ew(await uw(n),e,t))),t.promise}function fh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}const gw="ComponentProvider",Rd=new Map;function yw(n,e,t,i,a){return new Mv(n,e,t,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,fh(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator,i)}const gh="firestore.googleapis.com",Ld=!0;class Dd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Z(q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gh,this.ssl=Ld}else this.host=e.host,this.ssl=e.ssl??Ld;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Kp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qb)throw new Z(q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Tv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fh(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Z(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Z(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Z(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,a){return i.timeoutSeconds===a.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class or{constructor(e,t,i,a){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Z(q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new fv;switch(i.type){case"firstParty":return new bv(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new Z(q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=Rd.get(t);i&&(ee(gw,"Removing Datastore"),Rd.delete(t),i.terminate())})(this),Promise.resolve()}}function vw(n,e,t,i={}){n=Ct(n,or);const a=Wn(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;a&&(wo(`https://${l}`),_o("Firestore",!0)),s.host!==gh&&s.host!==l&&hi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:l,ssl:a,emulatorOptions:i};if(!li(c,o)&&(n._setSettings(c),i.mockUserToken)){let u,h;if(typeof i.mockUserToken=="string")u=i.mockUserToken,h=vt.MOCK_USER;else{u=pu(i.mockUserToken,n._app?.options.projectId);const w=i.mockUserToken.sub||i.mockUserToken.user_id;if(!w)throw new Z(q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new vt(w)}n._authCredentials=new gv(new sp(u,h))}}class vn{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new vn(this.firestore,e,this._query)}}class Ke{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}toJSON(){return{type:Ke._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(Fa(t,Ke._jsonSchema))return new Ke(e,i||null,new ie($e.fromString(t.referencePath)))}}Ke._jsonSchemaVersion="firestore/documentReference/1.0",Ke._jsonSchema={type:nt("string",Ke._jsonSchemaVersion),referencePath:nt("string")};class Mn extends vn{constructor(e,t,i){super(e,t,Xs(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new ie(e))}withConverter(e){return new Mn(this.firestore,e,this._path)}}function fi(n,e,...t){if(n=Ve(n),rp("collection","path",e),n instanceof or){const i=$e.fromString(e,...t);return Wc(i),new Mn(n,null,i)}{if(!(n instanceof Ke||n instanceof Mn))throw new Z(q.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child($e.fromString(e,...t));return Wc(i),new Mn(n.firestore,null,i)}}function fa(n,e,...t){if(n=Ve(n),arguments.length===1&&(e=No.newId()),rp("doc","path",e),n instanceof or){const i=$e.fromString(e,...t);return Hc(i),new Ke(n,null,new ie(i))}{if(!(n instanceof Ke||n instanceof Mn))throw new Z(q.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child($e.fromString(e,...t));return Hc(i),new Ke(n.firestore,n instanceof Mn?n.converter:null,new ie(i))}}const $d="AsyncQueue";class Nd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Xp(this,"async_queue_retry"),this._c=()=>{const i=Vr();i&&ee($d,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=Vr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Vr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new dn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!qi(e))throw e;ee($d,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,fn("INTERNAL UNHANDLED ERROR: ",Md(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const a=el.createAndSchedule(this,e,t,i,(s=>this.hc(s)));return this.tc.push(a),a}uc(){this.nc&&oe(47125,{Pc:Md(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Md(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class yn extends or{constructor(e,t,i,a){super(e,t,i,a),this.type="firestore",this._queue=new Nd,this._persistenceKey=a?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Nd(e),this._firestoreClient=void 0,await e}}}function bw(n,e){const t=typeof n=="object"?n:To(),i=typeof n=="string"?n:Rs,a=qs(t,"firestore").getImmediate({identifier:i});if(!a._initialized){const s=cu("firestore");s&&vw(a,...s)}return a}function lr(n){if(n._terminated)throw new Z(q.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ww(n),n._firestoreClient}function ww(n){const e=n._freezeSettings(),t=yw(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new cw(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(a){const s=a?._online.build();return{_offline:a?._offline.build(s),_online:s}})(n._componentsProvider))}class Vt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Vt(ft.fromBase64String(e))}catch(t){throw new Z(q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Vt(ft.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Vt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Fa(e,Vt._jsonSchema))return Vt.fromBase64String(e.bytes)}}Vt._jsonSchemaVersion="firestore/bytes/1.0",Vt._jsonSchema={type:nt("string",Vt._jsonSchemaVersion),bytes:nt("string")};class cl{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new Z(q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new mt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}class dl{constructor(e){this._methodName=e}}class an{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Z(q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Z(q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return _e(this._lat,e._lat)||_e(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:an._jsonSchemaVersion}}static fromJSON(e){if(Fa(e,an._jsonSchema))return new an(e.latitude,e.longitude)}}an._jsonSchemaVersion="firestore/geoPoint/1.0",an._jsonSchema={type:nt("string",an._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};class qt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,a){if(i.length!==a.length)return!1;for(let s=0;s<i.length;++s)if(i[s]!==a[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:qt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Fa(e,qt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new qt(e.vectorValues);throw new Z(q.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qt._jsonSchemaVersion="firestore/vectorValue/1.0",qt._jsonSchema={type:nt("string",qt._jsonSchemaVersion),vectorValues:nt("object")};const _w=/^__.*__$/;class xw{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Yn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ua(e,this.data,t,this.fieldTransforms)}}class yh{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new Yn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function vh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw oe(40011,{dataSource:n})}}class ul{constructor(e,t,i,a,s,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=a,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ul({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePathSegment(e),i}childContextForFieldPath(e){const t=this.path?.child(e),i=this.contextWith({path:t,arrayElement:!1});return i.validatePath(),i}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Us(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(vh(this.dataSource)&&_w.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Ew{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||ar(e)}createContext(e,t,i,a=!1){return new ul({dataSource:e,methodName:t,targetDoc:i,path:mt.emptyPath(),arrayElement:!1,hasConverter:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function cr(n){const e=n._freezeSettings(),t=ar(n._databaseId);return new Ew(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bh(n,e,t,i,a,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,a);pl("Data must be an object, but it was:",o,i);const l=wh(i,o);let c,u;if(s.merge)c=new $t(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const w of s.mergeFields){const b=gi(e,w,t);if(!o.contains(b))throw new Z(q.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);Eh(h,b)||h.push(b)}c=new $t(h),u=o.fieldTransforms.filter((w=>c.covers(w.field)))}else c=null,u=o.fieldTransforms;return new xw(new St(l),c,u)}class dr extends dl{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof dr}}function Iw(n,e,t,i){const a=n.createContext(1,e,t);pl("Data must be an object, but it was:",a,i);const s=[],o=St.empty();Qn(i,((c,u)=>{const h=xh(e,c,t);u=Ve(u);const w=a.childContextForFieldPath(h);if(u instanceof dr)s.push(h);else{const b=Wa(u,w);b!=null&&(s.push(h),o.set(h,b))}}));const l=new $t(s);return new yh(o,l,a.fieldTransforms)}function Tw(n,e,t,i,a,s){const o=n.createContext(1,e,t),l=[gi(e,i,t)],c=[a];if(s.length%2!=0)throw new Z(q.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<s.length;b+=2)l.push(gi(e,s[b])),c.push(s[b+1]);const u=[],h=St.empty();for(let b=l.length-1;b>=0;--b)if(!Eh(u,l[b])){const R=l[b];let M=c[b];M=Ve(M);const D=o.childContextForFieldPath(R);if(M instanceof dr)u.push(R);else{const v=Wa(M,D);v!=null&&(u.push(R),h.set(R,v))}}const w=new $t(u);return new yh(h,w,o.fieldTransforms)}function kw(n,e,t,i=!1){return Wa(t,n.createContext(i?4:3,e))}function Wa(n,e){if(_h(n=Ve(n)))return pl("Unsupported field value:",e,n),wh(n,e);if(n instanceof dl)return(function(i,a){if(!vh(a.dataSource))throw a.createError(`${i._methodName}() can only be used with update() and set()`);if(!a.path)throw a.createError(`${i._methodName}() is not currently supported inside arrays`);const s=i._toFieldTransform(a);s&&a.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(i,a){const s=[];let o=0;for(const l of i){let c=Wa(l,a.childContextForArray(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(n,e)}return(function(i,a){if((i=Ve(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return lb(a.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const s=ge.fromDate(i);return{timestampValue:Os(a.serializer,s)}}if(i instanceof ge){const s=new ge(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:Os(a.serializer,s)}}if(i instanceof an)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Vt)return{bytesValue:zp(a.serializer,i._byteString)};if(i instanceof Ke){const s=a.databaseId,o=i.firestore._databaseId;if(!o.isEqual(s))throw a.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ho(i.firestore._databaseId||a.databaseId,i._key.path)}}if(i instanceof qt)return(function(o,l){const c=o instanceof qt?o.toArray():o;return{mapValue:{fields:{[fp]:{stringValue:gp},[Ls]:{arrayValue:{values:c.map((h=>{if(typeof h!="number")throw l.createError("VectorValues must only contain numeric values.");return Fo(l.serializer,h)}))}}}}}})(i,a);if(Gp(i))return i._toProto(a.serializer);throw a.createError(`Unsupported field value: ${Ks(i)}`)})(n,e)}function wh(n,e){const t={};return cp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Qn(n,((i,a)=>{const s=Wa(a,e.childContextForField(i));s!=null&&(t[i]=s)})),{mapValue:{fields:t}}}function _h(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof an||n instanceof Vt||n instanceof Ke||n instanceof dl||n instanceof qt||Gp(n))}function pl(n,e,t){if(!_h(t)||!op(t)){const i=Ks(t);throw i==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+i)}}function gi(n,e,t){if((e=Ve(e))instanceof cl)return e._internalPath;if(typeof e=="string")return xh(n,e);throw Us("Field path arguments must be of type string or ",n,!1,void 0,t)}const Aw=new RegExp("[~\\*/\\[\\]]");function xh(n,e,t){if(e.search(Aw)>=0)throw Us(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new cl(...e.split("."))._internalPath}catch{throw Us(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Us(n,e,t,i,a){const s=i&&!i.isEmpty(),o=a!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${i}`),o&&(c+=` in document ${a}`),c+=")"),new Z(q.INVALID_ARGUMENT,l+n+c)}function Eh(n,e){return n.some((t=>t.isEqual(e)))}class Sw{convertValue(e,t="none"){switch(jn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Je(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Un(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw oe(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Qn(e,((a,s)=>{i[a]=this.convertValue(s,t)})),i}convertVectorValue(e){const t=e.fields?.[Ls].arrayValue?.values?.map((i=>Je(i.doubleValue)));return new qt(t)}convertGeoPoint(e){return new an(Je(e.latitude),Je(e.longitude))}convertArray(e,t){return(e.values||[]).map((i=>this.convertValue(i,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const i=Js(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Sa(e));default:return null}}convertTimestamp(e){const t=Fn(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=$e.fromString(e);Se(Wp(i),9688,{name:e});const a=new Ca(i.get(1),i.get(3)),s=new ie(i.popFirst(5));return a.isEqual(t)||fn(`Document ${s} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}class hl extends Sw{constructor(e){super(),this.firestore=e}convertBytes(e){return new Vt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}const Od="@firebase/firestore",Vd="4.11.0";function Bd(n){return(function(t,i){if(typeof t!="object"||t===null)return!1;const a=t;for(const s of i)if(s in a&&typeof a[s]=="function")return!0;return!1})(n,["next","error","complete"])}class Ih{constructor(e,t,i,a,s){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=a,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Cw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(gi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Cw extends Ih{data(){return super.data()}}function Th(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new Z(q.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ml{}class fl extends ml{}function On(n,e,...t){let i=[];e instanceof ml&&i.push(e),i=i.concat(t),(function(s){const o=s.filter((c=>c instanceof gl)).length,l=s.filter((c=>c instanceof ur)).length;if(o>1||o>0&&l>0)throw new Z(q.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(i);for(const a of i)n=a._apply(n);return n}class ur extends fl{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new ur(e,t,i)}_apply(e){const t=this._parse(e);return kh(e._query,t),new vn(e.firestore,e.converter,oo(e._query,t))}_parse(e){const t=cr(e.firestore);return(function(s,o,l,c,u,h,w){let b;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new Z(q.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Fd(w,h);const M=[];for(const D of w)M.push(zd(c,s,D));b={arrayValue:{values:M}}}else b=zd(c,s,w)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Fd(w,h),b=kw(l,o,w,h==="in"||h==="not-in");return tt.create(u,h,b)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Vn(n,e,t){const i=e,a=gi("where",n);return ur._create(a,i,t)}class gl extends ml{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new gl(e,t)}_parse(e){const t=this._queryConstraints.map((i=>i._parse(e))).filter((i=>i.getFilters().length>0));return t.length===1?t[0]:Wt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(a,s){let o=a;const l=s.getFlattenedFilters();for(const c of l)kh(o,c),o=oo(o,c)})(e._query,t),new vn(e.firestore,e.converter,oo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class yl extends fl{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new yl(e,t)}_apply(e){const t=(function(a,s,o){if(a.startAt!==null)throw new Z(q.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(a.endAt!==null)throw new Z(q.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ra(s,o)})(e._query,this._field,this._direction);return new vn(e.firestore,e.converter,eb(e._query,t))}}function Pw(n,e="asc"){const t=e,i=gi("orderBy",n);return yl._create(i,t)}class vl extends fl{constructor(e,t,i){super(),this.type=e,this._limit=t,this._limitType=i}static _create(e,t,i){return new vl(e,t,i)}_apply(e){return new vn(e.firestore,e.converter,$s(e._query,this._limit,this._limitType))}}function Rw(n){return vl._create("limit",n,"F")}function zd(n,e,t){if(typeof(t=Ve(t))=="string"){if(t==="")throw new Z(q.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ip(e)&&t.indexOf("/")!==-1)throw new Z(q.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child($e.fromString(t));if(!ie.isDocumentKey(i))throw new Z(q.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return ed(n,new ie(i))}if(t instanceof Ke)return ed(n,t._key);throw new Z(q.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ks(t)}.`)}function Fd(n,e){if(!Array.isArray(n)||n.length===0)throw new Z(q.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function kh(n,e){const t=(function(a,s){for(const o of a)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new Z(q.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Z(q.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Ah(n,e,t){let i;return i=n?n.toFirestore(e):e,i}class ga{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ai extends Ih{constructor(e,t,i,a,s,o){super(e,t,i,a,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ws(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(gi("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Z(q.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ai._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ai._jsonSchemaVersion="firestore/documentSnapshot/1.0",ai._jsonSchema={type:nt("string",ai._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class ws extends ai{data(e={}){return super.data(e)}}class si{constructor(e,t,i,a){this._firestore=e,this._userDataWriter=t,this._snapshot=a,this.metadata=new ga(a.hasPendingWrites,a.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new ws(this._firestore,this._userDataWriter,i.key,i,new ga(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Z(q.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(a,s){if(a._snapshot.oldDocs.isEmpty()){let o=0;return a._snapshot.docChanges.map((l=>{const c=new ws(a._firestore,a._userDataWriter,l.doc.key,l.doc,new ga(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=a._snapshot.oldDocs;return a._snapshot.docChanges.filter((l=>s||l.type!==3)).map((l=>{const c=new ws(a._firestore,a._userDataWriter,l.doc.key,l.doc,new ga(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);let u=-1,h=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),h=o.indexOf(l.doc.key)),{type:Lw(l.type),doc:c,oldIndex:u,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Z(q.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=si._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=No.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],a=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),i.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),a.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Lw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return oe(61501,{type:n})}}si._jsonSchemaVersion="firestore/querySnapshot/1.0",si._jsonSchema={type:nt("string",si._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};function Dw(n){n=Ct(n,Ke);const e=Ct(n.firestore,yn),t=lr(e);return hw(t,n._key).then((i=>Sh(e,n,i)))}function $w(n){n=Ct(n,vn);const e=Ct(n.firestore,yn),t=lr(e),i=new hl(e);return Th(n._query),mw(t,n._query).then((a=>new si(e,i,n,a)))}function Nw(n,e,t){n=Ct(n,Ke);const i=Ct(n.firestore,yn),a=Ah(n.converter,e),s=cr(i);return pr(i,[bh(s,"setDoc",n._key,a,n.converter!==null,t).toMutation(n._key,Bt.none())])}function Mw(n,e,t,...i){n=Ct(n,Ke);const a=Ct(n.firestore,yn),s=cr(a);let o;return o=typeof(e=Ve(e))=="string"||e instanceof cl?Tw(s,"updateDoc",n._key,e,t,i):Iw(s,"updateDoc",n._key,e),pr(a,[o.toMutation(n._key,Bt.exists(!0))])}function Ow(n){return pr(Ct(n.firestore,yn),[new Uo(n._key,Bt.none())])}function Vw(n,e){const t=Ct(n.firestore,yn),i=fa(n),a=Ah(n.converter,e),s=cr(n.firestore);return pr(t,[bh(s,"addDoc",i._key,a,n.converter!==null,{}).toMutation(i._key,Bt.exists(!1))]).then((()=>i))}function $a(n,...e){n=Ve(n);let t={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||Bd(e[i])||(t=e[i++]);const a={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Bd(e[i])){const u=e[i];e[i]=u.next?.bind(u),e[i+1]=u.error?.bind(u),e[i+2]=u.complete?.bind(u)}let s,o,l;if(n instanceof Ke)o=Ct(n.firestore,yn),l=Xs(n._key.path),s={next:u=>{e[i]&&e[i](Sh(o,n,u))},error:e[i+1],complete:e[i+2]};else{const u=Ct(n,vn);o=Ct(u.firestore,yn),l=u._query;const h=new hl(o);s={next:w=>{e[i]&&e[i](new si(o,h,u,w))},error:e[i+1],complete:e[i+2]},Th(n._query)}const c=lr(o);return pw(c,l,a,s)}function pr(n,e){const t=lr(n);return fw(t,e)}function Sh(n,e,t){const i=t.docs.get(e._key),a=new hl(n);return new ai(n,a,e._key,i,new ga(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){mv(vi),ci(new Bn("firestore",((i,{instanceIdentifier:a,options:s})=>{const o=i.getProvider("app").getImmediate(),l=new yn(new yv(i.getProvider("auth-internal")),new wv(o,i.getProvider("app-check-internal")),Ov(o,a),o);return s={useFetchStreams:t,...s},l._setSettings(s),l}),"PUBLIC").setMultipleInstances(!0)),Xt(Od,Vd,e),Xt(Od,Vd,"esm2020")})();const Ch="firebasestorage.googleapis.com",Ph="storageBucket",Bw=120*1e3,zw=600*1e3;class Ye extends rn{constructor(e,t,i=0){super(zr(e),`Firebase Storage: ${t} (${zr(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ye.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return zr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Qe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Qe||(Qe={}));function zr(n){return"storage/"+n}function bl(){const n="An unknown error occurred, please check the error payload for server response.";return new Ye(Qe.UNKNOWN,n)}function Fw(n){return new Ye(Qe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Uw(n){return new Ye(Qe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function jw(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ye(Qe.UNAUTHENTICATED,n)}function qw(){return new Ye(Qe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Hw(n){return new Ye(Qe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Ww(){return new Ye(Qe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Gw(){return new Ye(Qe.CANCELED,"User canceled the upload/download.")}function Kw(n){return new Ye(Qe.INVALID_URL,"Invalid URL '"+n+"'.")}function Qw(n){return new Ye(Qe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Yw(){return new Ye(Qe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ph+"' property when initializing the app?")}function Jw(){return new Ye(Qe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Xw(){return new Ye(Qe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Zw(n){return new Ye(Qe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function vo(n){return new Ye(Qe.INVALID_ARGUMENT,n)}function Rh(){return new Ye(Qe.APP_DELETED,"The Firebase app was deleted.")}function e_(n){return new Ye(Qe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ea(n,e){return new Ye(Qe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ra(n){throw new Ye(Qe.INTERNAL_ERROR,"Internal error: "+n)}class Nt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=Nt.makeFromUrl(e,t)}catch{return new Nt(e,"")}if(i.path==="")return i;throw Qw(e)}static makeFromUrl(e,t){let i=null;const a="([A-Za-z0-9.\\-_]+)";function s(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+a+o,"i"),c={bucket:1,path:3};function u(C){C.path_=decodeURIComponent(C.path)}const h="v[A-Za-z0-9_]+",w=t.replace(/[.]/g,"\\."),b="(/([^?#]*).*)?$",R=new RegExp(`^https?://${w}/${h}/b/${a}/o${b}`,"i"),M={bucket:1,path:3},D=t===Ch?"(?:storage.googleapis.com|storage.cloud.google.com)":t,v="([^?#]*)",k=new RegExp(`^https?://${D}/${a}/${v}`,"i"),$=[{regex:l,indices:c,postModify:s},{regex:R,indices:M,postModify:u},{regex:k,indices:{bucket:1,path:2},postModify:u}];for(let C=0;C<$.length;C++){const T=$[C],A=T.regex.exec(e);if(A){const f=A[T.indices.bucket];let m=A[T.indices.path];m||(m=""),i=new Nt(f,m),T.postModify(i);break}}if(i==null)throw Kw(e);return i}}class t_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function n_(n,e,t){let i=1,a=null,s=null,o=!1,l=0;function c(){return l===2}let u=!1;function h(...v){u||(u=!0,e.apply(null,v))}function w(v){a=setTimeout(()=>{a=null,n(R,c())},v)}function b(){s&&clearTimeout(s)}function R(v,...k){if(u){b();return}if(v){b(),h.call(null,v,...k);return}if(c()||o){b(),h.call(null,v,...k);return}i<64&&(i*=2);let $;l===1?(l=2,$=0):$=(i+Math.random())*1e3,w($)}let M=!1;function D(v){M||(M=!0,b(),!u&&(a!==null?(v||(l=2),clearTimeout(a),w(0)):v||(l=1)))}return w(0),s=setTimeout(()=>{o=!0,D(!0)},t),D}function i_(n){n(!1)}function a_(n){return n!==void 0}function s_(n){return typeof n=="object"&&!Array.isArray(n)}function wl(n){return typeof n=="string"||n instanceof String}function Ud(n){return _l()&&n instanceof Blob}function _l(){return typeof Blob<"u"}function jd(n,e,t,i){if(i<e)throw vo(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw vo(`Invalid value for '${n}'. Expected ${t} or less.`)}function hr(n,e,t){let i=e;return t==null&&(i=`https://${e}`),`${t}://${i}/v0${n}`}function Lh(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const a=e(i)+"="+e(n[i]);t=t+a+"&"}return t=t.slice(0,-1),t}var ri;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ri||(ri={}));function r_(n,e){const t=n>=500&&n<600,a=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||a||s}class o_{constructor(e,t,i,a,s,o,l,c,u,h,w,b=!0,R=!1){this.url_=e,this.method_=t,this.headers_=i,this.body_=a,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=w,this.retry=b,this.isUsingEmulator=R,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((M,D)=>{this.resolve_=M,this.reject_=D,this.start_()})}start_(){const e=(i,a)=>{if(a){i(!1,new ls(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===ri.NO_ERROR,c=s.getStatus();if(!l||r_(c,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===ri.ABORT;i(!1,new ls(!1,null,h));return}const u=this.successCodes_.indexOf(c)!==-1;i(!0,new ls(u,s))})},t=(i,a)=>{const s=this.resolve_,o=this.reject_,l=a.connection;if(a.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());a_(c)?s(c):s()}catch(c){o(c)}else if(l!==null){const c=bl();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(a.canceled){const c=this.appDelete_?Rh():Gw();o(c)}else{const c=Ww();o(c)}};this.canceled_?t(!1,new ls(!1,null,!0)):this.backoffId_=n_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&i_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ls{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function l_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function c_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function d_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function u_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function p_(n,e,t,i,a,s,o=!0,l=!1){const c=Lh(n.urlParams),u=n.url+c,h=Object.assign({},n.headers);return d_(h,e),l_(h,t),c_(h,s),u_(h,i),new o_(u,n.method,h,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,a,o,l)}function h_(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function m_(...n){const e=h_();if(e!==void 0){const t=new e;for(let i=0;i<n.length;i++)t.append(n[i]);return t.getBlob()}else{if(_l())return new Blob(n);throw new Ye(Qe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function f_(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function g_(n){if(typeof atob>"u")throw Zw("base-64");return atob(n)}const Jt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Fr{constructor(e,t){this.data=e,this.contentType=t||null}}function y_(n,e){switch(n){case Jt.RAW:return new Fr(Dh(e));case Jt.BASE64:case Jt.BASE64URL:return new Fr($h(n,e));case Jt.DATA_URL:return new Fr(b_(e),w_(e))}throw bl()}function Dh(n){const e=[];for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=i,o=n.charCodeAt(++t);i=65536|(s&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function v_(n){let e;try{e=decodeURIComponent(n)}catch{throw Ea(Jt.DATA_URL,"Malformed data URL.")}return Dh(e)}function $h(n,e){switch(n){case Jt.BASE64:{const a=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(a||s)throw Ea(n,"Invalid character '"+(a?"-":"_")+"' found: is it base64url encoded?");break}case Jt.BASE64URL:{const a=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(a||s)throw Ea(n,"Invalid character '"+(a?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=g_(e)}catch(a){throw a.message.includes("polyfill")?a:Ea(n,"Invalid character found")}const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return i}class Nh{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ea(Jt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=t[1]||null;i!=null&&(this.base64=__(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function b_(n){const e=new Nh(n);return e.base64?$h(Jt.BASE64,e.rest):v_(e.rest)}function w_(n){return new Nh(n).contentType}function __(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}class Pn{constructor(e,t){let i=0,a="";Ud(e)?(this.data_=e,i=e.size,a=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=a}size(){return this.size_}type(){return this.type_}slice(e,t){if(Ud(this.data_)){const i=this.data_,a=f_(i,e,t);return a===null?null:new Pn(a)}else{const i=new Uint8Array(this.data_.buffer,e,t-e);return new Pn(i,!0)}}static getBlob(...e){if(_l()){const t=e.map(i=>i instanceof Pn?i.data_:i);return new Pn(m_.apply(null,t))}else{const t=e.map(o=>wl(o)?y_(Jt.RAW,o).data:o.data_);let i=0;t.forEach(o=>{i+=o.byteLength});const a=new Uint8Array(i);let s=0;return t.forEach(o=>{for(let l=0;l<o.length;l++)a[s++]=o[l]}),new Pn(a,!0)}}uploadData(){return this.data_}}function Mh(n){let e;try{e=JSON.parse(n)}catch{return null}return s_(e)?e:null}function x_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function E_(n,e){const t=e.split("/").filter(i=>i.length>0).join("/");return n.length===0?t:n+"/"+t}function Oh(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function I_(n,e){return e}class Tt{constructor(e,t,i,a){this.server=e,this.local=t||e,this.writable=!!i,this.xform=a||I_}}let cs=null;function T_(n){return!wl(n)||n.length<2?n:Oh(n)}function Vh(){if(cs)return cs;const n=[];n.push(new Tt("bucket")),n.push(new Tt("generation")),n.push(new Tt("metageneration")),n.push(new Tt("name","fullPath",!0));function e(s,o){return T_(o)}const t=new Tt("name");t.xform=e,n.push(t);function i(s,o){return o!==void 0?Number(o):o}const a=new Tt("size");return a.xform=i,n.push(a),n.push(new Tt("timeCreated")),n.push(new Tt("updated")),n.push(new Tt("md5Hash",null,!0)),n.push(new Tt("cacheControl",null,!0)),n.push(new Tt("contentDisposition",null,!0)),n.push(new Tt("contentEncoding",null,!0)),n.push(new Tt("contentLanguage",null,!0)),n.push(new Tt("contentType",null,!0)),n.push(new Tt("metadata","customMetadata",!0)),cs=n,cs}function k_(n,e){function t(){const i=n.bucket,a=n.fullPath,s=new Nt(i,a);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function A_(n,e,t){const i={};i.type="file";const a=t.length;for(let s=0;s<a;s++){const o=t[s];i[o.local]=o.xform(i,e[o.server])}return k_(i,n),i}function Bh(n,e,t){const i=Mh(e);return i===null?null:A_(n,i,t)}function S_(n,e,t,i){const a=Mh(e);if(a===null||!wl(a.downloadTokens))return null;const s=a.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const h=n.bucket,w=n.fullPath,b="/b/"+o(h)+"/o/"+o(w),R=hr(b,t,i),M=Lh({alt:"media",token:u});return R+M})[0]}function C_(n,e){const t={},i=e.length;for(let a=0;a<i;a++){const s=e[a];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class xl{constructor(e,t,i,a){this.url=e,this.method=t,this.handler=i,this.timeout=a,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function zh(n){if(!n)throw bl()}function P_(n,e){function t(i,a){const s=Bh(n,a,e);return zh(s!==null),s}return t}function R_(n,e){function t(i,a){const s=Bh(n,a,e);return zh(s!==null),S_(s,a,n.host,n._protocol)}return t}function Fh(n){function e(t,i){let a;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?a=qw():a=jw():t.getStatus()===402?a=Uw(n.bucket):t.getStatus()===403?a=Hw(n.path):a=i,a.status=t.getStatus(),a.serverResponse=i.serverResponse,a}return e}function Uh(n){const e=Fh(n);function t(i,a){let s=e(i,a);return i.getStatus()===404&&(s=Fw(n.path)),s.serverResponse=a.serverResponse,s}return t}function L_(n,e,t){const i=e.fullServerUrl(),a=hr(i,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,l=new xl(a,s,R_(n,t),o);return l.errorHandler=Uh(e),l}function D_(n,e){const t=e.fullServerUrl(),i=hr(t,n.host,n._protocol),a="DELETE",s=n.maxOperationRetryTime;function o(c,u){}const l=new xl(i,a,o,s);return l.successCodes=[200,204],l.errorHandler=Uh(e),l}function $_(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function N_(n,e,t){const i=Object.assign({},t);return i.fullPath=n.path,i.size=e.size(),i.contentType||(i.contentType=$_(null,e)),i}function M_(n,e,t,i,a){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let $="";for(let C=0;C<2;C++)$=$+Math.random().toString().slice(2);return $}const c=l();o["Content-Type"]="multipart/related; boundary="+c;const u=N_(e,i,a),h=C_(u,t),w="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,b=`\r
--`+c+"--",R=Pn.getBlob(w,i,b);if(R===null)throw Jw();const M={name:u.fullPath},D=hr(s,n.host,n._protocol),v="POST",k=n.maxUploadRetryTime,S=new xl(D,v,P_(n,t),k);return S.urlParams=M,S.headers=o,S.body=R.uploadData(),S.errorHandler=Fh(e),S}class O_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ri.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ri.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ri.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,i,a,s){if(this.sent_)throw ra("cannot .send() more than once");if(Wn(e)&&i&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return a!==void 0?this.xhr_.send(a):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ra("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ra("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ra("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ra("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class V_ extends O_{initXhr(){this.xhr_.responseType="text"}}function El(){return new V_}class yi{constructor(e,t){this._service=e,t instanceof Nt?this._location=t:this._location=Nt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new yi(e,t)}get root(){const e=new Nt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Oh(this._location.path)}get storage(){return this._service}get parent(){const e=x_(this._location.path);if(e===null)return null;const t=new Nt(this._location.bucket,e);return new yi(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw e_(e)}}function B_(n,e,t){n._throwIfRoot("uploadBytes");const i=M_(n.storage,n._location,Vh(),new Pn(e,!0),t);return n.storage.makeRequestWithTokens(i,El).then(a=>({metadata:a,ref:n}))}function z_(n){n._throwIfRoot("getDownloadURL");const e=L_(n.storage,n._location,Vh());return n.storage.makeRequestWithTokens(e,El).then(t=>{if(t===null)throw Xw();return t})}function F_(n){n._throwIfRoot("deleteObject");const e=D_(n.storage,n._location);return n.storage.makeRequestWithTokens(e,El)}function U_(n,e){const t=E_(n._location.path,e),i=new Nt(n._location.bucket,t);return new yi(n.storage,i)}function j_(n){return/^[A-Za-z]+:\/\//.test(n)}function q_(n,e){return new yi(n,e)}function jh(n,e){if(n instanceof Il){const t=n;if(t._bucket==null)throw Yw();const i=new yi(t,t._bucket);return e!=null?jh(i,e):i}else return e!==void 0?U_(n,e):n}function H_(n,e){if(e&&j_(e)){if(n instanceof Il)return q_(n,e);throw vo("To use ref(service, url), the first argument must be a Storage instance.")}else return jh(n,e)}function qd(n,e){const t=e?.[Ph];return t==null?null:Nt.makeFromBucketSpec(t,n)}function W_(n,e,t,i={}){n.host=`${e}:${t}`;const a=Wn(e);a&&(wo(`https://${n.host}/b`),_o("Storage",!0)),n._isUsingEmulator=!0,n._protocol=a?"https":"http";const{mockUserToken:s}=i;s&&(n._overrideAuthToken=typeof s=="string"?s:pu(s,n.app.options.projectId))}class Il{constructor(e,t,i,a,s,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=a,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=Ch,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Bw,this._maxUploadRetryTime=zw,this._requests=new Set,a!=null?this._bucket=Nt.makeFromBucketSpec(a,this._host):this._bucket=qd(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Nt.makeFromBucketSpec(this._url,e):this._bucket=qd(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){jd("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){jd("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new yi(this,e)}_makeRequest(e,t,i,a,s=!0){if(this._deleted)return new t_(Rh());{const o=p_(e,this._appId,i,a,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[i,a]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,a).getPromise()}}const Hd="@firebase/storage",Wd="0.14.0";const qh="storage";function Ni(n,e,t){return n=Ve(n),B_(n,e,t)}function oi(n){return n=Ve(n),z_(n)}function G_(n){return n=Ve(n),F_(n)}function un(n,e){return n=Ve(n),H_(n,e)}function K_(n=To(),e){n=Ve(n);const i=qs(n,qh).getImmediate({identifier:e}),a=cu("storage");return a&&Q_(i,...a),i}function Q_(n,e,t,i={}){W_(n,e,t,i)}function Y_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),a=n.getProvider("app-check-internal");return new Il(t,i,a,e,vi)}function J_(){ci(new Bn(qh,Y_,"PUBLIC").setMultipleInstances(!0)),Xt(Hd,Wd,""),Xt(Hd,Wd,"esm2020")}J_();const Hh={apiKey:"AIzaSyAOV2Dz0mrJAIT2DLQsrLCTC2bLO7lkzmI",authDomain:"conectacidade-5e46d.firebaseapp.com",projectId:"conectacidade-5e46d",storageBucket:"conectacidade-5e46d.firebasestorage.app",messagingSenderId:"740343372037",appId:"1:740343372037:web:a74dcf684844bc9167ff6c",measurementId:"G-GH3W7LBTWZ"},Tl=Io(Hh),Ur=Ju(Tl),Ut=bw(Tl),pn=K_(Tl),B={async create(n,e){const t=fi(Ut,n);return(await Vw(t,{...e,createdAt:ge.now()})).id},async set(n,e,t){const i=fa(Ut,n,e);await Nw(i,{...t,createdAt:ge.now()})},async getAll(n,e){const t=fi(Ut,n);let i=On(t);if(e)if(Array.isArray(e)){const s=e.map(o=>Vn(o.field,o.operator,o.value));i=On(t,...s)}else i=On(t,Vn(e.field,e.operator,e.value));return(await $w(i)).docs.map(s=>({id:s.id,...s.data()}))},async get(n,e){const t=fa(Ut,n,e),i=await Dw(t);return i.exists()?{id:i.id,...i.data()}:null},async update(n,e,t){const i=fa(Ut,n,e);await Mw(i,t)},async delete(n,e){const t=fa(Ut,n,e);await Ow(t)}},X_=Object.freeze(Object.defineProperty({__proto__:null,dbService:B},Symbol.toStringTag,{value:"Module"}));class Z_{currentUser=null;listeners=[];constructor(){Zg(Ur,async e=>{if(e)if(e.email==="ginannymoreira@gmail.com")this.currentUser={uid:e.uid,email:e.email,role:"admin"};else try{const t=await B.get("users",e.uid);if(t){const i=t;if(i.companyId){const s=await B.get("companies",i.companyId);if(s&&s.status==="inactive"){await this.logout();const{toast:o}=await _s(async()=>{const{toast:l}=await Promise.resolve().then(()=>Gd);return{toast:l}},void 0);o.error("Seu acesso de cliente foi desativado. Entre em contato com o administrador.");return}}this.currentUser={uid:e.uid,email:e.email,role:i.role,companyId:i.companyId,storeId:i.storeId,storeIds:i.storeIds}}else{console.warn("User authenticated but not found in DB",e.uid),await this.logout();const{toast:i}=await _s(async()=>{const{toast:a}=await Promise.resolve().then(()=>Gd);return{toast:a}},void 0);i.error("Sua conta não foi encontrada ou foi removida."),this.currentUser=null}}catch(t){console.error("Error fetching user profile:",t),this.currentUser=null}else this.currentUser=null;this.notifyListeners()})}async login(e,t){await Yg(Ur,e,t)}async logout(){await ey(Ur)}async registerUser(e,t){const i=Io(Hh,"Secondary"),a=Ju(i);return(await Qg(a,e,t)).user.uid}getCurrentUser(){return this.currentUser}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e(this.currentUser))}}const Ae=new Z_,ex=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1,a=!1;if(n&&n.companyId)try{const l=(await B.get("companies",n.companyId))?.modulos_ativos||["atendimento"];l.includes("venda")&&(e=!0),l.includes("agendamento")&&(t=!0),l.includes("disparo")&&(i=!0),l.includes("venda_catalogo")&&(a=!0)}catch(s){console.error("Error fetching company for sidebar:",s)}return a?`
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
    `},tx=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,i=!1;if(n&&n.companyId)try{const o=(await B.get("companies",n.companyId))?.modulos_ativos||["atendimento"];o.includes("venda")&&(e=!0),o.includes("agendamento")&&(t=!0),o.includes("venda_catalogo")&&(i=!0)}catch(a){console.error("Error fetching company for employee sidebar:",a)}return i?`
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
    `},nx=n=>`
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
    `,zt="https://evolution.vps.pequi.digital",Ft="1120d381afc6900754fc87d8264ed6335aeab3223b4d24810a17145399c16e46",ht={async createInstance(n){try{const e=await fetch(`${zt}/instance/create`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({instanceName:n,qrcode:!0,integration:"WHATSAPP-BAILEYS"})});if(!e.ok){const t=await e.json();throw new Error(t.message||"Failed to create instance")}return await e.json()}catch(e){throw console.error("Evolution API - Create Instance Error:",e),e}},async setWebhook(n,e,t=!0){try{const i=await fetch(`${zt}/webhook/set/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({webhook:{enabled:t,url:e,byEvents:!1,base64:!0,events:["MESSAGES_UPSERT"]}})});return i.ok?!0:(console.error("Evolution API - Set Webhook Error:",await i.text()),!1)}catch(i){return console.error("Evolution API - Set Webhook Exception:",i),!1}},async getInstanceStatus(n){try{const e=await fetch(`${zt}/instance/connectionState/${n}`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)throw new Error("Failed to get instance status");const t=await e.json();return{state:t.state||t.instance?.state||"close",connected:t.state==="open"||t.instance?.state==="open"}}catch(e){return console.error("Evolution API - Get Status Error:",e),{state:"close",connected:!1}}},async getQRCode(n){try{const e=await fetch(`${zt}/instance/connect/${n}`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)throw new Error("Failed to get QR code");const t=await e.json();return t.qrcode?.base64?{base64:t.qrcode.base64}:t.base64?{base64:t.base64}:null}catch(e){return console.error("Evolution API - Get QR Code Error:",e),null}},async deleteInstance(n){try{return(await fetch(`${zt}/instance/delete/${n}`,{method:"DELETE",headers:{apikey:Ft}})).ok}catch(e){return console.error("Evolution API - Delete Instance Error:",e),!1}},async logoutInstance(n){try{return(await fetch(`${zt}/instance/logout/${n}`,{method:"DELETE",headers:{apikey:Ft}})).ok}catch(e){return console.error("Evolution API - Logout Instance Error:",e),!1}},async instanceExists(n){try{const e=await fetch(`${zt}/instance/fetchInstances`,{method:"GET",headers:{apikey:Ft}});if(!e.ok)return!1;const t=await e.json();return Array.isArray(t)&&t.some(i=>i.instance?.instanceName===n)}catch(e){return console.error("Evolution API - Check Instance Exists Error:",e),!1}},async sendText(n,e,t){try{let i=e.replace(/\D/g,"");i.length<=11&&!i.startsWith("55")&&(i="55"+i);const a=i,s=await fetch(`${zt}/message/sendText/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:Ft},body:JSON.stringify({number:a,text:t,delay:1200,linkPreview:!0})});if(!s.ok){const o=await s.json();return console.error("Evolution API - Send Text Error:",o),!1}return!0}catch(i){return console.error("Evolution API - Send Text Exception:",i),!1}}};class ix{container=null;soundEnabled=!0;constructor(){this.init()}init(){typeof window>"u"||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container))}playSound(e){if(this.soundEnabled)try{const t=new Audio;switch(e){case"success":t.src="/sounds/success.mp3";break;case"error":t.src="/sounds/error.mp3";break;case"warning":t.src="/sounds/warning.mp3";break;default:return}t.volume=.3,t.play().catch(()=>{})}catch{}}show(e){const{message:t,type:i="info",duration:a=3e3,sound:s=!0}=e;if(this.container||this.init(),!this.container)return;const o=document.createElement("div");o.className=`toast toast-${i}`;const l={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};o.innerHTML=`
            <div class="toast-icon">${l[i]}</div>
            <div class="toast-message">${t}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `,this.container.appendChild(o),s&&this.playSound(i),setTimeout(()=>{o.classList.add("toast-exit"),setTimeout(()=>o.remove(),300)},a)}success(e,t){this.show({message:e,type:"success",duration:t})}error(e,t){this.show({message:e,type:"error",duration:t})}warning(e,t){this.show({message:e,type:"warning",duration:t})}info(e,t){this.show({message:e,type:"info",duration:t})}setSoundEnabled(e){this.soundEnabled=e}}const V=new ix,Gd=Object.freeze(Object.defineProperty({__proto__:null,toast:V},Symbol.toStringTag,{value:"Module"}));window.copyToClipboard=(n,e="Link copiado!")=>{navigator.clipboard.writeText(n).then(()=>{V.success(e)}).catch(t=>{console.error("Erro ao copiar link:",t),V.error("Erro ao copiar link.")})};window.toggleStoreActive=async(n,e,t)=>{try{const i=await B.get("companies",n);if(!i)return;const s=i.stores||[],o=s.findIndex(l=>l.id===e);o!==-1&&(s[o].active=t,await B.update("companies",n,{stores:s}),V.success(`Loja ${t?"ativada":"desativada"} com sucesso!`),setTimeout(()=>location.reload(),1e3))}catch(i){console.error("Error toggling store status:",i),V.error("Erro ao alterar status da loja.")}};const ax=async()=>{const n=Ae.getCurrentUser();if(!n)return"";let e={messages:0,payments:0,orders_pending:0,orders_paid:0,today:0,openai:{usage:0,credits:0,limit:0}},t=["atendimento"],i=null;if(n?.role==="admin"){t=["atendimento","venda","agendamento","disparo"];try{(await B.getAll("companies")).forEach(l=>{l.metrics&&(e.messages+=l.metrics.totalMessages||0,e.payments+=l.metrics.totalPayments||0)}),e.orders_pending=15,e.orders_paid=1200;const o=await B.get("settings","openai");o?e.openai={usage:o.usage||0,credits:o.credits||0,limit:o.limit||0}:e.openai={usage:0,credits:0,limit:0}}catch(s){console.error("Error fetching dashboard data:",s)}}else if(n?.companyId)try{if(t=(await B.get("companies",n.companyId))?.modulos_ativos||["atendimento"],t.includes("atendimento")){const l=await B.getAll("messages",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]);e.messages=l.filter(u=>u.role!=="assistente"?!1:n.role==="owner"?!0:u.lojaId&&c.includes(u.lojaId)).length}if(t.includes("venda")||t.includes("venda_catalogo")){const l=await B.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]),u=n.role==="owner"?l:l.filter(R=>R.lojaId&&c.includes(R.lojaId));e.orders_pending=u.filter(R=>R.status!=="finalizado"&&R.status!=="cancelado").length,e.orders_paid=u.filter(R=>R.status==="finalizado").length;let h=0,w=0;const b=new Date;if(b.setHours(0,0,0,0),u.forEach(R=>{R.status==="finalizado"&&(h+=R.value||R.total||0),(R.criadoEm?.toDate?R.criadoEm.toDate():new Date(R.criadoEm||0))>=b&&w++}),e.payments=h,e.today=w,t.includes("venda_catalogo")){const M=(await B.getAll("products",{field:"companyId",operator:"==",value:n.companyId})).filter(C=>C.stock!=null&&C.stock<=5&&C.active!==!1).sort((C,T)=>(C.stock??0)-(T.stock??0)).slice(0,10),D=new Map;u.forEach(C=>{(Array.isArray(C.items)?C.items:Array.isArray(C.itens)?C.itens:[]).forEach(A=>{const f=A.name||A.item||"Produto",m=A.qty||A.quantidade||1,y=A.price||A.preco||0,x=D.get(f)||{name:f,qty:0,revenue:0};D.set(f,{name:f,qty:x.qty+m,revenue:x.revenue+m*y})})});const v=Array.from(D.values()).sort((C,T)=>T.qty-C.qty).slice(0,5),k=new Map;u.forEach(C=>{const A=(C.criadoEm?.toDate?C.criadoEm.toDate():new Date(C.criadoEm||0)).getHours();k.set(A,(k.get(A)||0)+1)});const S=Array.from(k.entries()).sort((C,T)=>T[1]-C[1]).slice(0,3),$=e.orders_paid>0?h/e.orders_paid:0;i={lowStockProducts:M,topProducts:v,bestHours:S,avgTicket:$,totalOrders:u.length}}}}catch(s){console.error("Error fetching dashboard data:",s)}return setTimeout(()=>{n?.companyId&&a(n.companyId,n)},100),`
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
    `;async function a(s,o){const l=document.getElementById("store-statuses-container");if(l)try{const u=await B.get("companies",s);let h=u?.stores||[];const b=await B.getAll("instancias",{field:"empresaId",operator:"==",value:s});if(o.role!=="owner"){const M=o.storeIds||(o.storeId?[o.storeId]:[]);h=h.filter(D=>M.includes(D.id))}if(h.length===0){l.innerHTML=`
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
                    `;else try{const T=await ht.getInstanceStatus(S);if(["open","connected","CONNECTED","ON"].includes(T.state))v=!0,D=`
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
                            `;else{const m=await ht.getQRCode(S);D=`
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
                    `;for(const S of k){let $=!1;try{$=(await ht.getInstanceStatus(S.nome)).connected}catch{}R+=`
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
            `}}};class sx{show(e){return new Promise(t=>{const{title:i,message:a,confirmText:s="Confirmar",cancelText:o="Cancelar",type:l="warning"}=e,c=document.createElement("div");c.className="confirm-modal",c.innerHTML=`
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
            `,document.body.appendChild(c);const u=c.querySelector("#confirm-ok"),h=c.querySelector("#confirm-cancel"),w=b=>{c.remove(),t(b)};u?.addEventListener("click",()=>w(!0)),h?.addEventListener("click",()=>w(!1)),c.addEventListener("click",b=>{b.target===c&&w(!1)})})}async danger(e,t){return this.show({title:e,message:t,type:"danger",confirmText:"Sim, excluir"})}async warning(e,t){return this.show({title:e,message:t,type:"warning"})}}const Xe=new sx;function bo(n,e){return n.replace(/\{\{(\w+)\}\}/g,(t,i)=>e[i]!==void 0?e[i]:t)}function Wh(n,e){const a=(Array.isArray(n.itens)?n.itens:Array.isArray(n.items)?n.items:[]).map(s=>({item:s.item||s.name||"",quantidade:s.quantidade||s.qty||1,preco:s.preco||s.price||0})).map(s=>`${s.quantidade}x ${s.item}`).join(", ");return{nome_lead:e?.nome||e?.name||n.clientName||n.nome||"Cliente",telefone_lead:(e?.telefone||"").split("@")[0]||n.clientPhone||"",numero_pedido:n.id?.slice(-6).toUpperCase()||"",lista_produtos:a,valor_total:(n.value||n.total||0).toFixed(2),endereco_entrega:n.endereco||n.clientAddress||"Não informado",forma_pagamento:n.formaPagamento||n.paymentMethod||n.pagamento||"Não informado"}}const jr={pedido_aceito_entrega_pago:"✅ Pedido aceito e em preparo! (Pagamento Adiantado)",pedido_aceito_entrega_pendente:"✅ Pedido aceito e em preparo! Pagamento na entrega.",pedido_aceito_retirada:"✅ Pedido confirmado para retirada! Já está sendo preparado.",pagamento_confirmado:"💳 Pagamento confirmado! Seu pedido já está sendo preparado.",pedido_pronto:"📦 Seu pedido já está pronto para retirada!",saiu_para_entrega:"🚚 Boa notícia! Seu pedido saiu para entrega.",pedido_entregue:"🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!",pedido_cancelado:"❌ Seu pedido foi cancelado."};function rx(n){switch(n){case"aguardando_pagamento":return"pedido_aceito_entrega_pago";case"em_preparo":return"pagamento_confirmado";case"pedido_pronto":return"pedido_pronto";case"saiu_para_entrega":return"saiu_para_entrega";case"finalizado":return"pedido_entregue";case"cancelado":return"pedido_cancelado";default:return null}}async function Gh(n,e){try{if(e){const i=await B.getAll("loja_config",[{field:"empresaId",operator:"==",value:n},{field:"lojaId",operator:"==",value:e}]);if(i&&i.length>0){const a=i[0];if(a.mensagens_automaticas)return a.mensagens_automaticas}}const t=await B.getAll("empresa_config",{field:"empresaId",operator:"==",value:n});if(t&&t.length>0)return t[0].mensagens_automaticas||{}}catch(t){console.error("Error fetching message config:",t)}return{}}async function ox(n,e){try{const t=n.storeId||n.lojaId;if(!t)return;let i=null,o=(await B.getAll("loja_config",[{field:"empresaId",operator:"==",value:e},{field:"lojaId",operator:"==",value:t}]))[0]?.instancia_id;if(o||(o=(await B.get("companies",e))?.stores?.find(D=>D.id===t)?.instancia_id),o&&(i=(await B.get("instancias",o))?.nome),!i)return;const c=(await Gh(e,t)).pedido_recebido;if(!c)return;const u=n.leadId?await B.get("leads",n.leadId):null,h=Wh(n,u),w=bo(c,h),b=n.clientPhone||n.telefone||u?.telefone;b&&w&&(await ht.sendText(i,b,w),n.leadId&&await B.create("messages",{conteudo:w,createdAt:ge.now(),empresaId:e,leadId:n.leadId,role:"assistente",tipo:"conversation"}))}catch(t){console.error("OrderService - Error in notifyNewOrder:",t)}}const Ln={notifyNewOrder:ox,async updateOrderStatus(n,e,t,i,a){try{a&&Object.assign(n,a);let s=n.instancia||null;if(!s){const k=n.storeId||n.lojaId;if(k)try{let C=(await B.getAll("loja_config",[{field:"empresaId",operator:"==",value:e},{field:"lojaId",operator:"==",value:k}]))[0]?.instancia_id;const T=await B.get("companies",e);!C&&T?.stores&&(C=T.stores.find(f=>f.id===k)?.instancia_id),C&&(s=(await B.get("instancias",C))?.nome||null),!s&&T?.whatsappInstance?.instanceName&&(s=T.whatsappInstance.instanceName)}catch(S){console.error("Error fetching instance for store:",S)}}s||(s=(await B.get("companies",e))?.whatsappInstance?.instanceName||null);const o=n.leadId?await B.get("leads",n.leadId):null,l=o?.telefone||o?.whatsapp||(n.clientPhone?n.clientPhone.replace(/\D/g,""):null)||n.leadId||null,c=Wh(n,o),u=await Gh(e,n.lojaId||n.storeId);let h="",w=rx(t);const b=n.entrega==="retirada"||n.deliveryType==="retirada",R=n.formaPagamento||n.paymentMethod||n.pagamento||"",M=R.includes("entrega")||R.includes("dinheiro")||R.includes("maquininha")||R==="na_entrega";if((t==="aguardando_pagamento"||t==="em_preparo")&&(n.status==="em_montagem"||!n.status)&&(b?w="pedido_aceito_retirada":M?w="pedido_aceito_entrega_pendente":w="pedido_aceito_entrega_pago"),w)if(t==="cancelado"){const k=u[w]||jr[w]||"",S=k?bo(k,c):jr[w];h=i?`${S} Motivo: ${i}`:S}else{const k=u[w]||jr[w]||"";h=k?bo(k,c):""}let D={status:t,updatedAt:ge.now()};i&&(D.rejectionReason=i),a&&(D={...D,...a}),await B.update("pedidos",n.id,D),t==="finalizado"&&n.leadId&&await B.update("leads",n.leadId,{statusAtendimento:"finalizado",updatedAt:ge.now()});let v=!1;return h&&s&&l&&(v=await ht.sendText(s,l,h),n.leadId&&await this.saveMessageLog(e,n.leadId,h)),v}catch(s){throw console.error("OrderService - Error updating status:",s),s}},async activateHumanSupport(n){await B.update("leads",n,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()})},async sendInterventionMessage(n,e,t,i,a){const s=await ht.sendText(t,i,a);return await B.create("messages",{conteudo:a,createdAt:ge.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"}),s},async saveMessageLog(n,e,t){try{await B.create("messages",{conteudo:t,createdAt:ge.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"})}catch(i){console.error("OrderService - Error logging message:",i)}},async getOrderDetails(n){return await B.get("pedidos",n)},async getOpenOrdersCount(n,e){try{return(await B.getAll("pedidos",{field:"empresaId",operator:"==",value:n})).filter(i=>{if(e&&e.length>0&&(!i.lojaId||!e.includes(i.lojaId)))return!1;const a=(i.status||"em_montagem").toLowerCase();return a!=="finalizado"&&a!=="cancelado"}).length}catch{return 0}}},lx=Object.freeze(Object.defineProperty({__proto__:null,orderService:Ln},Symbol.toStringTag,{value:"Module"})),cx={em_montagem:{label:"Em Montagem",cls:"badge warning",icon:'<i class="fa-solid fa-cart-shopping"></i>'},aguardando_pagamento:{label:"Aguard. Pagamento",cls:"badge info",icon:'<i class="fa-solid fa-credit-card"></i>'},em_preparo:{label:"Em Preparo",cls:"badge primary",icon:'<i class="fa-solid fa-utensils"></i>'},pedido_pronto:{label:"Pronto p/ Retirada",cls:"badge success",icon:'<i class="fa-solid fa-box" style="color:#fff;"></i>'},saiu_para_entrega:{label:"Saiu p/ Entrega",cls:"badge success",icon:'<i class="fa-solid fa-truck" style="color:#fff;"></i>'},finalizado:{label:"Finalizado",cls:"badge success",icon:'<i class="fa-solid fa-check" style="color:#fff;"></i>'},cancelado:{label:"Cancelado",cls:"badge danger",icon:'<i class="fa-solid fa-xmark"></i>'}};function Kd(n){const e=(n||"em_montagem").toLowerCase(),t=cx[e]||{label:n||"Pendente",cls:"badge secondary",icon:'<i class="fa-solid fa-question"></i>'};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function Qd(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const Yd=[{key:"todos",label:"Todos"},{key:"em_montagem",label:'<i class="fa-solid fa-cart-shopping"></i> Em Montagem'},{key:"aguardando_pagamento",label:'<i class="fa-solid fa-credit-card"></i> Pag. Pendente'},{key:"em_preparo",label:'<i class="fa-solid fa-utensils"></i> Em Preparo'},{key:"pedido_pronto",label:'<i class="fa-solid fa-box"></i> Prontos'},{key:"saiu_para_entrega",label:'<i class="fa-solid fa-truck"></i> Em Entrega'},{key:"finalizado",label:'<i class="fa-solid fa-check"></i> Finalizados'}];function Jd(n){return n==="retirada"?'<span class="badge secondary" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-store" style="font-size: 0.6rem;"></i> Retirada</span>':'<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-truck" style="font-size: 0.6rem;"></i> Entrega</span>'}function Xd(n,e,t){if(!n)return'<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>';const i=n.toLowerCase().trim(),a=i.includes("link"),s=i.includes("pagamento_no_pix"),o=i.includes("entrega")||i.includes("dinheiro")||i.includes("maquininha");if(a)return`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;if(s){let l=`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;const c=e&&e!=="tete"?e:t&&t.startsWith("comprovantes/")?t:null;return c&&(l+=`
                <button class="view-comprovante-btn" data-path="${c}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`),`<div style="display: flex; align-items: center;">${l}</div>`}return o?`<span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
        </span>`:`<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${n}</span>`}const dx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await B.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId});e.sort((T,A)=>{const f=(T.criadoEm?.toDate?.()||new Date(T.criadoEm||0)).getTime();return(A.criadoEm?.toDate?.()||new Date(A.criadoEm||0)).getTime()-f});let i=(await B.get("companies",n.companyId))?.stores||[];if(n.role!=="owner"){const T=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(A=>T.includes(A.id)),e=e.filter(A=>T.includes(A.lojaId))}const a=await B.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId}),s=await B.getAll("loja_config",{field:"empresaId",operator:"==",value:n.companyId}),o=T=>{const A=i.find(f=>f.id===T);return A?A.name:T||"-"},l=T=>{const A=i.find(m=>m.id===T);if(A&&A.active!==!1&&A.instancia_id)return!0;const f=s.find(m=>m.lojaId===T);return f?!!f.instancia_id:!1},c=(T,A)=>{if(A)return A;const f=a.find(m=>m.id===T);return f?f.nome||f.name||"Cliente":T||"Cliente"},u=T=>(a.find(f=>f.id===T)?.telefone||"").split("@")[0];let h="todos";const w=T=>T==="todos"?e:e.filter(A=>(A.status||"em_montagem").toLowerCase()===T),b=T=>T.length===0?'<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>':T.map(A=>{const f=(A.status||"em_montagem").toLowerCase();return`
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
    `;function M(){const T=fi(Ut,"pedidos"),A=On(T,Vn("empresaId","==",n.companyId));window._ordersUnsubscribe&&window._ordersUnsubscribe();const f=$a(A,x=>{if(e=x.docs.map(g=>({id:g.id,...g.data()})),n.role!=="owner"){const g=n.storeIds||(n.storeId?[n.storeId]:[]);e=e.filter(_=>g.includes(_.lojaId))}e.sort((g,_)=>{const L=(g.criadoEm?.toDate?.()||new Date(g.criadoEm||0)).getTime();return(_.criadoEm?.toDate?.()||new Date(_.criadoEm||0)).getTime()-L});const E=document.getElementById("orders-tbody");E&&(E.innerHTML=b(w(h)),D()),Yd.forEach(g=>{const _=document.getElementById(`count-${g.key}`);if(_){const L=g.key==="todos"?e.length:e.filter(P=>(P.status||"em_montagem").toLowerCase()===g.key).length;_.textContent=L.toString()}})});window._ordersUnsubscribe=f,document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(x=>{x.addEventListener("click",()=>{document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(g=>g.classList.remove("active")),x.classList.add("active"),h=x.dataset.filter||"todos";const E=document.getElementById("orders-tbody");E&&(E.innerHTML=b(w(h))),D()})}),D();const m=document.getElementById("order-detail-modal");m?.addEventListener("click",x=>{x.target===m&&m.classList.add("hidden")}),document.getElementById("orders-filter-bar")?.parentElement?.parentElement?.addEventListener("click",async x=>{const E=x.target.closest(".view-comprovante-btn");if(E){x.preventDefault(),x.stopPropagation();const g=E.dataset.path;if(!g)return;const _=E.innerHTML;E.disabled=!0,E.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{let L=g;if(!g.startsWith("http")){const P=un(pn,g);L=await oi(P)}window.open(L,"_blank")}catch(L){console.error("Erro ao abrir comprovante:",L),V.error("Não foi possível carregar o comprovante do storage.")}finally{E.disabled=!1,E.innerHTML=_}}})}function D(){document.querySelectorAll(".action-btn.view").forEach(T=>{T.addEventListener("click",()=>{const A=T.dataset.id,f=e.find(m=>m.id===A);f&&v(f)})})}async function v(T){const A=document.getElementById("order-detail-modal"),f=document.getElementById("order-modal-inner");if(!A||!f)return;!T.itens&&Array.isArray(T.items)&&(T.itens=T.items.map(X=>({item:X.item||X.name||"",quantidade:X.quantidade||X.qty||1,preco:X.preco||X.price||0,observacao:X.observacao||""}))),A.classList.remove("hidden"),f.innerHTML=`
            <div style="padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Carregando detalhes do pedido...</p>
            </div>
        `;const m=T.clientPhone?T.clientPhone.replace(/\D/g,""):u(T.leadId)||T.leadId,y=T.source==="catalog"||!!T.taxaNome,x=T.empresaId||Ae.getCurrentUser()?.companyId;if(x&&Array.isArray(T.itens))try{const X=await B.getAll("products",{field:"companyId",operator:"==",value:x});let se=!1;if(T.itens.forEach(ce=>{const le=(ce.item||"").toLowerCase().trim(),pe=X.find(ye=>(ye.name||"").toLowerCase().trim()===le);if(pe){const ye=pe.promotionalActive&&pe.promotionalPrice||pe.price;(!ce.preco||ce.preco===0)&&(ce.preco=ye,se=!0)}}),se){let ce=0;T.itens.forEach(ye=>{const Oe=parseFloat(ye.preco)||0,Ne=parseInt(ye.quantidade)||1;ce+=Ne*Oe});const le=parseFloat(T.valoresAdicionais)||0,pe=parseFloat(T.taxaAplicada||T.taxaEntrega)||0;T.value=ce+le+pe}}catch(X){console.error("Error syncing prices with catalog:",X)}const E=(T.status||"em_montagem").toLowerCase(),g=E==="finalizado"||E==="cancelado",_=c(T.leadId,T.nome||T.leadName),L=l(T.lojaId),P=Array.isArray(T.itens)?T.itens.map((X,se)=>`
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${X.quantidade}x ${X.item}</span>
                        ${X.observacao?`<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${X.observacao}</small>`:""}
                    </div>
                    ${E==="em_montagem"&&!y?`
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${se}" value="${X.preco||0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    `:`
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(X.preco||0).toFixed(2)}</span>
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
                    ${_[0]?.toUpperCase()||"P"}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${T.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${_} · ${m}</span>
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
                        <span class="lead-info-value">${_}</span>
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
                        </div>
                        ${(()=>{const X=T.bairro||(T.taxaNome?.includes("(")?T.taxaNome.split("(")[1].split(")")[0]:"");return X?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${X}</span>
                        </div>`:""})()}
`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${T.endereco||"-"}</span>
                        </div>
                        ${(()=>{const X=T.bairro||(T.taxaNome?.includes("(")?T.taxaNome.split("(")[1].split(")")[0]:"");return X?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${X}</span>
                        </div>`:""})()}
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
                    </button>`;default:return""}}function S(T,A,f){const m=f==="finalizado"||f==="cancelado",y=A.source==="catalog"||!!A.taxaNome;if(document.getElementById("close-order-modal")?.addEventListener("click",()=>{T.classList.add("hidden")}),f==="em_montagem"&&!y){const j=J=>{const X=parseFloat(J);return isNaN(X)?0:X},Q=()=>{let J=0;document.querySelectorAll(".item-price-input").forEach(le=>{const pe=parseInt(le.dataset.index),ye=A.itens[pe]?.quantidade||1;J+=ye*j(le.value)});const X=j(document.getElementById("detail-additional-value")?.value),se=j(document.getElementById("detail-taxa-entrega")?.value);J+=X+se;const ce=document.getElementById("detail-order-total");ce&&(ce.innerText=`R$ ${J.toFixed(2)}`)};document.querySelectorAll(".item-price-input").forEach(J=>{J.addEventListener("input",Q)}),document.getElementById("detail-additional-value")?.addEventListener("input",Q),document.getElementById("detail-taxa-entrega")?.addEventListener("input",Q),Q()}if(m)return;const x=document.getElementById("order-menu-trigger"),E=document.getElementById("order-dropdown");x?.addEventListener("click",j=>{j.stopPropagation(),E?.classList.toggle("hidden")}),document.addEventListener("click",()=>E?.classList.add("hidden"),{once:!0}),E?.querySelectorAll(".lead-dropdown-item").forEach(j=>{j.addEventListener("click",async()=>{E.classList.add("hidden"),j.dataset.menuAction==="atendimento_humano"&&await $(A)})});const g=document.getElementById("btn-intervir"),_=document.getElementById("intervir-area");g?.addEventListener("click",()=>{if(_){const j=_.style.display==="none";_.style.display=j?"block":"none",j&&document.getElementById("intervir-text")?.focus()}}),document.getElementById("btn-intervir-cancel")?.addEventListener("click",()=>{_&&(_.style.display="none");const j=document.getElementById("intervir-text");j&&(j.value="")}),document.getElementById("btn-intervir-send")?.addEventListener("click",async()=>{const j=document.getElementById("intervir-text"),Q=j?.value.trim();if(!Q){V.warning("Digite uma mensagem antes de enviar.");return}const J=document.getElementById("btn-intervir-send");J.disabled=!0,J.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';try{let X=A.instancia;X||(X=(await B.get("companies",n.companyId))?.whatsappInstance?.instanceName||"");const se=u(A.leadId)||A.leadId;await Ln.sendInterventionMessage(n.companyId,A.leadId,X,se,Q),V.success("Mensagem enviada com sucesso!"),j.value="",_&&(_.style.display="none")}catch{V.error("Erro ao enviar mensagem."),J.disabled=!1,J.innerHTML='<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem'}});const L=document.getElementById("btn-main-action");L?.addEventListener("click",async()=>{const j=L.dataset.target;if(!j)return;let Q="",J="";switch(j){case"aguardando_pagamento":Q="Aceitar Pedido",J=`Deseja aceitar o pedido #${A.id.slice(-6).toUpperCase()}?`;break;case"em_preparo":Q="Confirmar Pagamento",J="Confirmar que o pagamento foi recebido?";break;case"pedido_pronto":Q="Pedido Pronto",J="Marcar pedido como pronto para retirada?";break;case"saiu_para_entrega":Q="Saiu para Entrega",J="Marcar pedido como saiu para entrega?";break;case"finalizado":Q="Pedido Entregue",J="Marcar pedido como entregue e finalizado?";break}if(await Xe.warning(Q,J)){L.disabled=!0,L.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...';try{let se;if(f==="em_montagem"){const ce=Ne=>{const ke=parseFloat(Ne);return isNaN(ke)?0:ke};let le=0;const pe=Array.isArray(A.itens)?[...A.itens]:[];document.querySelectorAll(".item-price-input").forEach(Ne=>{const ke=parseInt(Ne.dataset.index),je=pe[ke]?.quantidade||1,_t=ce(Ne.value);pe[ke]&&(pe[ke].preco=_t),le+=je*_t});const ye=ce(document.getElementById("detail-additional-value")?.value),Oe=ce(document.getElementById("detail-taxa-entrega")?.value);le+=ye+Oe,se={value:le,total:le,itens:pe,valoresAdicionais:ye,taxaEntrega:Oe,taxaAplicada:Oe}}j==="em_preparo"&&(se={...se,manuallyConfirmed:!0}),await Ln.updateOrderStatus(A,n.companyId,j,void 0,se),A.status=j,C(A),V.success("Pedido atualizado com sucesso!"),v(A)}catch{V.error("Erro ao atualizar pedido."),L.disabled=!1}}});const P=document.getElementById("btn-cancel"),K=document.getElementById("cancel-container");P?.addEventListener("click",async()=>{if(P.dataset.stage==="confirm"){const j=document.getElementById("cancel-reason")?.value.trim();if(!j){V.warning("Informe o motivo do cancelamento.");return}if(!await Xe.danger("Cancelar Pedido","Tem certeza que deseja cancelar este pedido?"))return;P.disabled=!0,P.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';try{await Ln.updateOrderStatus(A,n.companyId,"cancelado",j),A.status="cancelado",C(A),V.success("Pedido cancelado."),v(A)}catch{V.error("Erro ao cancelar pedido."),P.disabled=!1}}else P.dataset.stage="confirm",P.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento',K&&(K.style.display="block",document.getElementById("cancel-reason")?.focus())})}async function $(T){if(await Xe.warning("Ativar Atendimento Humano","Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado."))try{await Ln.activateHumanSupport(T.leadId),V.success("Atendimento humano ativado para o lead!")}catch{V.error("Erro ao ativar atendimento humano.")}}function C(T){const A=e.findIndex(m=>m.id===T.id);A>=0&&(e[A]={...e[A],...T});const f=document.getElementById("orders-tbody");f&&(f.innerHTML=b(w(h))),D()}},ds=n=>n.imageUrl?n.imageUrl:n.imagemPath&&n.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(n.imagemPath)}?alt=media&token=${n.downloadToken}`:null,ux=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const t=await B.get("companies",n.companyId),i=t?.modulos_ativos||[],a=i.includes("venda")||i.includes("agendamento")||i.includes("venda_catalogo"),s=i.includes("agendamento"),o=s?"Serviço":"Produto",l=s?"Serviços":"Produtos";let c=t?.stores||[];const u=n.role?.toLowerCase()==="owner",h=n.storeIds||(n.storeId?[n.storeId]:[]);u||(c=c.filter(L=>h.includes(L.id)));let w=u?"all":h.length===1?h[0]:"employee_all",b=new Map,R=null;if(!a)return`
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;let M=await B.getAll("products",{field:"companyId",operator:"==",value:n.companyId}),D=await B.getAll("categories",{field:"companyId",operator:"==",value:n.companyId});const v=L=>{const P=L.storeIds||(L.storeId?[L.storeId]:[]);return P.length===0?"Sem Loja":P.map(K=>{const j=c.find(Q=>Q.id===K);return j?j.name:"Desconhecida"}).join(", ")},k=()=>{let L=M;return w!=="all"&&w!=="employee_all"?L=M.filter(P=>P.storeIds&&P.storeIds.includes(w)||P.storeId===w):w==="employee_all"&&(L=M.filter(P=>P.storeIds&&P.storeIds.some(K=>h.includes(K))||P.storeId&&h.includes(P.storeId))),L.length===0?`<tr><td colspan="7" style="text-align:center">Nenhum ${o.toLowerCase()} encontrado.</td></tr>`:L.map(P=>`
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
        `).join("")}},A=L=>{const P=document.getElementById("catalog-link-container"),K=document.getElementById("catalog-url-display"),j=document.getElementById("btn-open-catalog");if(!(!P||!K||!j))if(L==="all"||L==="employee_all")P.classList.add("hidden");else{const Q=`${window.location.origin}/catalog/${L}`;K.value=Q,j.href=Q,P.classList.remove("hidden")}},f=async(L,P)=>{const K=`img_${Date.now()}_${Math.random().toString(36).substr(2,5)}`,j=un(pn,`products/${P}/${K}_${L.name}`);await Ni(j,L);const Q=await oi(j),J=new URL(Q);return{imagemPath:j.fullPath,downloadToken:J.searchParams.get("token")||""}},m=(L,P="",K="",j=null,Q=!1,J="",X="",se="",ce=null,le=null)=>{const pe=D.map(ye=>`<option value="${ye.id}" ${ye.id===se?"selected":""}>${ye.name}</option>`).join("");return`
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
                                    <input type="number" name="promotional-price-${L}" value="${X}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>`}
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${L}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `},y=L=>{const P=document.querySelector(`#card-${L} .btn-change-img`),K=document.getElementById(`file-${L}`);P&&K&&(P.addEventListener("click",()=>K.click()),K.addEventListener("change",()=>{if(K.files&&K.files[0]){const J=K.files[0];b.set(L,J);const X=new FileReader;X.onload=se=>{const ce=document.getElementById(`preview-wrapper-${L}`);ce&&(ce.innerHTML=`<img src="${se.target?.result}" class="preview-img">
                                                 <div class="upload-progress-overlay hidden" id="progress-${L}"><div class="spinner-small"></div></div>`)},X.readAsDataURL(J)}}));const j=document.querySelector(`input[name="promotional-active-${L}"]`),Q=document.getElementById(`promotional-fields-${L}`);j&&Q&&j.addEventListener("change",()=>{j.checked?Q.classList.remove("hidden"):Q.classList.add("hidden")})},x=L=>{const P=document.getElementById("products-list-container"),K=document.getElementById("empty-list-msg");!P||!K||Array.from(L).forEach(j=>{const Q=`prod_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;b.set(Q,j);const J=j.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "),X=m(Q,J,"");P.insertAdjacentHTML("beforeend",X),K.style.display="none",y(Q);const se=new FileReader;se.onload=ce=>{const le=document.getElementById(`preview-wrapper-${Q}`);le&&(le.innerHTML=`<img src="${ce.target?.result}" class="preview-img">
                                          <div class="upload-progress-overlay hidden" id="progress-${Q}"><div class="spinner-small"></div></div>`)},se.readAsDataURL(j)})};window.editProduct=async L=>{const P=M.find(K=>K.id===L);if(P){R=L,b.clear(),document.getElementById("modal-title").innerText=`Editar ${o}`,document.getElementById("bulk-upload-section").style.display="none",u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>{J.checked=(P.storeIds||[]).includes(J.value)});const K=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");if(K&&j){K.innerHTML="",j.style.display="none";const Q=ds(P);K.innerHTML=m("edit-item",P.name,P.price,Q,P.promotionalActive,P.promotionalName,P.promotionalPrice,P.categoryId,P.stock,P.duration),setTimeout(()=>y("edit-item"),0)}document.getElementById("product-modal").classList.remove("hidden")}},window.toggleProductStatus=async(L,P)=>{try{await B.update("products",L,{active:!P});const K=M.find(j=>j.id===L);K&&(K.active=!P),S(),V.success(`${o} ${P?"desativado":"ativado"} com sucesso!`)}catch(K){V.error("Erro ao atualizar status: "+K)}},window.deleteProduct=async L=>{if(await Xe.danger(`Excluir ${o}`,`Tem certeza que deseja EXCLUIR este ${o.toLowerCase()}? Esta ação não pode ser desfeita.`))try{const K=M.find(j=>j.id===L);if(K){const j=ds(K),Q=K.imagemPath;if(j||Q)try{const J=Q?un(pn,Q):un(pn,j);await G_(J)}catch(J){console.warn("Could not delete image from storage:",J)}}await B.delete("products",L),M=M.filter(j=>j.id!==L),S(),V.success(`${o} excluído com sucesso!`)}catch(K){V.error("Erro ao excluir: "+K)}},window.openProductModal=()=>{R=null,b.clear();const L=document.getElementById("modal-title"),P=document.getElementById("bulk-upload-section"),K=document.getElementById("products-list-container"),j=document.getElementById("empty-list-msg");L&&(L.innerText=`Adicionar ${l}`),P&&(P.style.display="block"),K&&(K.innerHTML=""),j&&(j.style.display="block"),u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(J=>J.checked=!1),document.getElementById("product-modal")?.classList.remove("hidden")},window.closeModals=()=>{document.getElementById("product-modal")?.classList.add("hidden"),document.getElementById("category-modal")?.classList.add("hidden"),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),document.getElementById("migration-modal")?.classList.add("hidden")},window.handleBulkFileSelection=L=>{L.files&&(x(L.files),L.value="")},window.addManualItem=()=>{const L=`manual_${Date.now()}`,P=document.getElementById("products-list-container"),K=document.getElementById("empty-list-msg");if(P&&K){const j=m(L);P.insertAdjacentHTML("beforeend",j),K.style.display="none",y(L)}},window.removeProductItem=L=>{const P=document.getElementById(`card-${L}`);P&&P.remove(),b.delete(L);const K=document.getElementById("products-list-container");if(K&&K.children.length===0){const j=document.getElementById("empty-list-msg");j&&(j.style.display="block")}},window.saveProducts=async()=>{const L=document.getElementById("btn-save-products-trigger");if(!L)return;L.disabled=!0;const P=L.innerHTML;L.innerHTML='<div class="spinner-small"></div> <span>Salvando...</span>';const j=document.getElementById("products-list-container")?.querySelectorAll(".product-item-card");if(!j||j.length===0){V.warning(`Adicione pelo menos um ${o.toLowerCase()}.`),L.disabled=!1,L.innerHTML=P;return}let Q=[];if(u){const J=document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');Q=Array.from(J).map(X=>X.value)}else n.storeId?Q=[n.storeId]:n.storeIds&&n.storeIds.length>0&&(Q=n.storeIds);if(Q.length===0){V.warning("Selecione pelo menos uma loja para este(s) produto(s)."),L.disabled=!1,L.innerHTML=P;return}try{for(const J of Array.from(j)){const X=J.id.replace("card-",""),se=J.querySelector(".item-name").value,ce=parseFloat(J.querySelector(".item-price").value),le=J.querySelector(".item-category").value;let pe=!1,ye="",Oe=0,Ne=null,ke=null;if(s){const De=J.querySelector(".item-duration")?.value;ke=De!==""&&De!=null?parseInt(De):null}else{pe=J.querySelector(".promotional-checkbox")?.checked||!1,ye=J.querySelector(".promotional-name-input")?.value||"",Oe=parseFloat(J.querySelector(".promotional-price-input")?.value)||0;const De=J.querySelector(".item-stock")?.value;Ne=De!==""&&De!=null?parseInt(De):null}const je=document.getElementById(`progress-${X}`);je&&je.classList.remove("hidden");let _t={};b.has(X)&&(_t=await f(b.get(X),n.companyId));const ut={name:se,price:ce||0,categoryId:le,storeIds:Q,companyId:n.companyId,active:!0,promotionalActive:pe,promotionalName:ye,promotionalPrice:Oe,stock:Ne,duration:ke,..._t};if(R&&X==="edit-item"){await B.update("products",R,ut);const De=M.findIndex(Ee=>Ee.id===R);De!==-1&&(M[De]={...M[De],...ut})}else{const De=await B.create("products",ut);M.push({id:De,...ut})}je&&je.classList.add("hidden")}V.success(`${l} salvo(s) com sucesso!`),window.closeModals(),S(),L.disabled=!1,L.innerHTML=P}catch(J){console.error("Error saving products:",J),V.error(`Erro ao salvar ${l.toLowerCase()}.`),L.disabled=!1,L.innerHTML=P}},window.saveCategory=async L=>{L.preventDefault();const P=document.getElementById("cat-name"),K=document.getElementById("cat-icon"),j=P.value.trim(),Q=K.value;if(j)try{const J=await B.create("categories",{name:j,icon:Q,companyId:n.companyId});D.push({id:J,name:j,icon:Q,companyId:n.companyId}),P.value="",T(),C(),V.success("Categoria criada com sucesso!")}catch{V.error("Erro ao criar categoria.")}},window.deleteCategory=async L=>{if(await Xe.warning("Excluir Categoria",'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".'))try{await B.delete("categories",L),D=D.filter(P=>P.id!==L),T(),C(),M.forEach(P=>{P.categoryId===L&&(P.categoryId="")}),V.success("Categoria excluída.")}catch{V.error("Erro ao excluir categoria.")}},window.openEditCategoryModal=(L,P)=>{const K=document.getElementById("edit-cat-name-input");K&&(K.value=P,K.dataset.catId=L,document.getElementById("edit-cat-name-modal")?.classList.remove("hidden"))},window.updateCategoryName=async()=>{const L=document.getElementById("edit-cat-name-input"),P=L.dataset.catId,K=L.value.trim();if(P&&K)try{await B.update("categories",P,{name:K});const j=D.find(Q=>Q.id===P);j&&(j.name=K),T(),C(),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),V.success("Nome atualizado!")}catch{V.error("Erro ao atualizar nome.")}},window.openCategoryModal=()=>{T();const L=document.getElementById("icon-picker");L&&(L.innerHTML=E.map(P=>`
                <div class="icon-option ${P==="fa-tag"?"selected":""}" data-icon="${P}" onclick="window.selectCategoryIcon(this, '${P}')">
                    <i class="fa-solid ${P}"></i>
                </div>
            `).join("")),document.getElementById("category-modal")?.classList.remove("hidden")},window.selectCategoryIcon=(L,P)=>{const K=document.getElementById("icon-picker");K&&(K.querySelectorAll(".icon-option").forEach(j=>j.classList.remove("selected")),L.classList.add("selected"),document.getElementById("cat-icon").value=P)},window.setStoreFilter=(L,P)=>{document.querySelectorAll(".filter-pill").forEach(K=>K.classList.remove("active")),P.classList.add("active"),w=L,A(L),S()},window.toggleAllCheckboxes=L=>{const P=L.checked;document.querySelectorAll(".product-checkbox").forEach(K=>K.checked=P),$()},window.updateBulkBar=$,window.applyBulkCategory=async()=>{const L=document.getElementById("bulk-assign-cat").value;if(!L){V.warning("Selecione uma categoria.");return}const P=Array.from(document.querySelectorAll(".product-checkbox:checked")).map(j=>j.dataset.id),K=document.getElementById("btn-bulk-save");K&&(K.innerHTML='<div class="spinner-small"></div>');try{await Promise.all(P.map(j=>B.update("products",j,{categoryId:L}))),M.forEach(j=>{P.includes(j.id)&&(j.categoryId=L)}),V.success(`${P.length} produtos atualizados!`),window.cancelBulkActions(),S()}catch{V.error("Erro ao processar em massa.")}finally{K&&(K.innerText="Aplicar")}},window.cancelBulkActions=()=>{document.querySelectorAll(".product-checkbox").forEach(P=>P.checked=!1);const L=document.getElementById("select-all-products");L&&(L.checked=!1),$()};const E=["fa-utensils","fa-burger","fa-pizza-slice","fa-ice-cream","fa-coffee","fa-beer","fa-wine-glass","fa-apple-whole","fa-carrot","fa-bowl-food","fa-cake-candles","fa-candy-cane","fa-cookie","fa-glass-water","fa-mug-hot","fa-bag-shopping","fa-shirt","fa-shoe-prints","fa-glasses","fa-watch","fa-laptop","fa-mobile-screen","fa-gamepad","fa-headphones","fa-camera","fa-tv","fa-microchip","fa-car","fa-bicycle","fa-plane","fa-bus","fa-train","fa-ship","fa-anchor","fa-heart","fa-star","fa-bolt","fa-fire","fa-leaf","fa-tree","fa-sun","fa-moon","fa-droplet","fa-cloud","fa-music","fa-film","fa-book","fa-pencil","fa-palette","fa-briefcase","fa-home","fa-medkit","fa-dumbbell","fa-basketball","fa-soccer-ball","fa-baseball","fa-volleyball","fa-tag"];setTimeout(()=>{A(w);const L=document.getElementById("btn-copy-catalog");L&&(L.onclick=()=>{const Q=document.getElementById("catalog-url-display")?.value;Q&&navigator.clipboard.writeText(Q).then(()=>V.success("Link do catálogo copiado!"))});const P=document.getElementById("btn-bulk-save"),K=document.getElementById("btn-bulk-cancel");P&&(P.onclick=()=>window.applyBulkCategory()),K&&(K.onclick=()=>window.cancelBulkActions());const j=document.getElementById("bulk-upload-section");j&&(j.addEventListener("dragover",Q=>{Q.preventDefault(),j.classList.add("drag-active")}),j.addEventListener("dragleave",()=>j.classList.remove("drag-active")),j.addEventListener("drop",Q=>{Q.preventDefault(),j.classList.remove("drag-active"),Q.dataTransfer?.files&&x(Q.dataTransfer.files)}))},100);const g=`
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
    `,_=`
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
                    <button class="filter-pill ${w==="all"?"active":""}" onclick="window.setStoreFilter('all', this)">Todas</button>
                    ${c.map(L=>`
                        <button class="filter-pill ${w===L.id?"active":""}" onclick="window.setStoreFilter('${L.id}', this)">${L.name}</button>
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
        ${_}
        ${g}
    `},px=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";let i=(await B.get("companies",n.companyId))?.stores||[];const a=n.role==="owner",s=()=>i.length===0?'<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>':i.map(l=>{const c=l.active&&l.instancia_id,u=l.frete_ativo!==!1;return`
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
        `}).join(""),o=()=>{const l=document.querySelector(".data-table tbody");l&&(l.innerHTML=s())};return window.toggleStoreFrete=async(l,c)=>{try{const u=!c,h=i.map(w=>w.id===l?{...w,frete_ativo:u}:w);await B.update("companies",n.companyId,{stores:h}),i=h,o(),V.success(`Frete da loja atualizado para ${u?"ativo":"inativo"}.`)}catch(u){V.error("Erro ao atualizar frete: "+u)}},window.toggleStoreStatus=async(l,c)=>{const u=c?"desativar":"ativar";if(await Xe.warning(`${u.charAt(0).toUpperCase()+u.slice(1)} Loja`,`Deseja ${u} esta loja?`))try{const w=i.map(b=>b.id===l?{...b,active:!c}:b);await B.update("companies",n.companyId,{stores:w}),i=w,o(),V.success(`Loja ${c?"desativada":"ativada"} com sucesso!`)}catch(w){V.error("Erro ao atualizar status: "+w)}},`
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
    `},Zd=async()=>{let n=await B.getAll("users");const e=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>':n.map(s=>`
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
    `;function a(){const s=document.getElementById("admin-user-modal"),o=document.querySelector(".close-modal"),l=document.getElementById("edit-user-form");o&&s&&(o.onclick=()=>s.classList.add("hidden")),l&&(l.onsubmit=async c=>{c.preventDefault();const u=document.getElementById("user-uid").value,h=document.getElementById("user-name").value;try{await B.update("users",u,{name:h});const w=n.find(b=>b.id===u);w&&(w.name=h),i(),V.success("Usuário atualizado com sucesso!"),s&&s.classList.add("hidden")}catch(w){console.error(w),V.error("Erro ao atualizar: "+w)}})}};class Kh{container;inputWrapper;searchInput;dropdown;options;selectedValues;onChange;maxVisibleTags;placeholder;constructor(e,t,i=[],a=()=>{},s="Selecione...",o=10){this.options=t,this.selectedValues=new Set(i),this.onChange=a,this.maxVisibleTags=o,this.placeholder=s;const l=document.getElementById(e);if(!l)throw new Error(`Container #${e} not found`);this.container=l,this.container.className="multi-select-container",this.inputWrapper=this.createInputWrapper(),this.searchInput=this.createSearchInput(),this.dropdown=this.createDropdown(),this.inputWrapper.appendChild(this.searchInput),this.container.appendChild(this.inputWrapper),this.container.appendChild(this.dropdown),this.setupEventListeners(),this.render()}createInputWrapper(){const e=document.createElement("div");return e.className="multi-select-input",e}createSearchInput(){const e=document.createElement("input");return e.type="text",e.className="multi-select-search",e.placeholder=this.selectedValues.size===0?this.placeholder:"",e}createDropdown(){const e=document.createElement("div");return e.className="multi-select-dropdown",e}setupEventListeners(){this.inputWrapper.addEventListener("click",e=>{e.stopPropagation(),this.searchInput.focus(),this.openDropdown()}),this.searchInput.addEventListener("input",()=>{this.renderDropdown(),this.openDropdown()}),this.searchInput.addEventListener("keydown",e=>{if(e.key==="Backspace"&&this.searchInput.value===""&&this.selectedValues.size>0){const t=Array.from(this.selectedValues).pop();t&&this.toggleOption(t)}}),document.addEventListener("click",e=>{this.container.contains(e.target)||this.closeDropdown()})}openDropdown(){this.dropdown.classList.add("active"),this.inputWrapper.classList.add("active")}closeDropdown(){this.dropdown.classList.remove("active"),this.inputWrapper.classList.remove("active"),this.searchInput.value="",this.renderDropdown()}render(){this.renderTags(),this.renderDropdown()}renderTags(){this.inputWrapper.querySelectorAll(".multi-select-tag, .multi-select-more").forEach(a=>a.remove());const t=Array.from(this.selectedValues);if(t.slice(0,this.maxVisibleTags).forEach(a=>{const s=this.options.find(o=>o.value===a);if(s){const o=this.createTag(s);this.inputWrapper.insertBefore(o,this.searchInput)}}),t.length>this.maxVisibleTags){const a=document.createElement("span");a.className="multi-select-more",a.textContent=`+${t.length-this.maxVisibleTags}`,this.inputWrapper.insertBefore(a,this.searchInput)}this.searchInput.placeholder=this.selectedValues.size===0?this.placeholder:""}createTag(e){const t=document.createElement("div");t.className="multi-select-tag";const i=document.createElement("span");i.textContent=e.label;const a=document.createElement("button");return a.className="multi-select-tag-remove",a.innerHTML='<i class="fa-solid fa-xmark"></i>',a.onclick=s=>{s.stopPropagation(),this.toggleOption(e.value)},t.appendChild(i),t.appendChild(a),t}renderDropdown(){this.dropdown.innerHTML="";const e=this.searchInput.value.toLowerCase(),t=this.options.filter(i=>i.label.toLowerCase().includes(e)||i.meta&&i.meta.toLowerCase().includes(e));if(t.length===0){const i=document.createElement("div");i.className="multi-select-no-results",i.textContent="Nenhum resultado encontrado",this.dropdown.appendChild(i);return}t.forEach(i=>{const a=this.createOption(i);this.dropdown.appendChild(a)})}createOption(e){const t=document.createElement("div");t.className="multi-select-option",this.selectedValues.has(e.value)&&t.classList.add("selected");const i=document.createElement("div");i.className="multi-select-checkbox";const a=document.createElement("div");if(a.className="multi-select-option-label",a.textContent=e.label,t.appendChild(i),t.appendChild(a),e.meta){const s=document.createElement("div");s.className="multi-select-option-meta",s.textContent=e.meta,t.appendChild(s)}return t.addEventListener("click",s=>{s.stopPropagation(),this.toggleOption(e.value),this.searchInput.value="",this.searchInput.focus(),this.renderDropdown()}),t}toggleOption(e){this.selectedValues.has(e)?this.selectedValues.delete(e):this.selectedValues.add(e),this.renderTags(),this.renderDropdown(),this.onChange(Array.from(this.selectedValues))}getValues(){return Array.from(this.selectedValues)}setValues(e){this.selectedValues=new Set(e),this.render()}destroy(){this.container.innerHTML=""}}const hx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";const i=(await B.get("companies",n.companyId))?.stores||[];let a=null,o=(await B.getAll("users",{field:"companyId",operator:"==",value:n.companyId})).filter(b=>b.role==="employee");const l=b=>{let R=[];return!b||(typeof b=="string"?R=b===""?[]:[b]:R=b,R.length===0)?"Todas":R.map(D=>{const v=i.find(k=>k.id===D);return v?v.name:D}).join(", ")},c=()=>o.length===0?'<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>':o.map(b=>`
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
    `,h=()=>{const b=document.querySelector(".data-table tbody");b&&(b.innerHTML=c())};return window.editEmployee=b=>{const R=o.find(M=>M.id===b||M.uid===b);if(R){if(document.getElementById("emp-uid").value=R.id,document.getElementById("emp-name").value=R.name,document.getElementById("emp-email").value=R.email,a){const M=R.storeIds||(R.storeId?[R.storeId]:[]);a.setValues(M)}document.getElementById("emp-password").required=!1,document.getElementById("pwd-hint").style.display="block",document.getElementById("emp-email").disabled=!0,document.getElementById("modal-title").innerText="Editar Colaborador",document.getElementById("employee-modal").classList.remove("hidden")}},window.toggleEmployeeStatus=async(b,R)=>{try{await B.update("users",b,{active:!R});const M=o.find(D=>D.id===b);M&&(M.active=!R),h(),V.success(`Colaborador ${R?"desativado":"ativado"} com sucesso!`)}catch(M){V.error("Erro ao atualizar status: "+M)}},window.deleteEmployee=async b=>{if(await Xe.danger("Excluir Colaborador","Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita."))try{await B.delete("users",b),o=o.filter(M=>M.id!==b),h(),V.success("Colaborador excluído com sucesso!")}catch(M){V.error("Erro ao excluir: "+M)}},setTimeout(()=>{w(n.companyId)},100),`
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
    `;function w(b){const R=document.getElementById("employee-modal"),M=document.getElementById("btn-new-employee"),D=document.querySelector(".close-modal"),v=document.getElementById("create-employee-form"),k=i.map(S=>({value:S.id,label:S.name}));a=new Kh("employee-stores-select",k,[],()=>{},"Selecione as lojas..."),M&&R&&(M.onclick=()=>{document.getElementById("emp-uid").value="",document.getElementById("create-employee-form").reset(),document.getElementById("emp-password").required=!0,document.getElementById("pwd-hint").style.display="none",document.getElementById("emp-email").disabled=!1,document.getElementById("modal-title").innerText="Novo Colaborador",a&&a.setValues([]),R.classList.remove("hidden")}),D&&R&&(D.onclick=()=>R.classList.add("hidden")),v&&(v.onsubmit=async S=>{S.preventDefault();const $=document.getElementById("emp-uid").value,C=document.getElementById("emp-name").value,T=document.getElementById("emp-email").value,A=document.getElementById("emp-password").value,f=a?a.getValues():[];try{if($){const m={name:C,storeIds:f.length>0?f:[]};await B.update("users",$,m);const y=o.find(x=>x.id===$);y&&Object.assign(y,m),V.success("Colaborador atualizado com sucesso!")}else{const m=await Ae.registerUser(T,A),y={uid:m,name:C,email:T,role:"employee",companyId:b,storeIds:f.length>0?f:[],active:!0,permissions:["orders","products"]};await B.set("users",m,y),o.push({id:m,...y}),V.success("Colaborador adicionado com sucesso!")}R&&R.classList.add("hidden"),h()}catch(m){console.error(m),V.error("Erro: "+m)}})}},mx=()=>`
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
    `,fx=()=>`
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
    `,gx=async()=>{let n=await B.getAll("companies"),e=null,t=["atendimento"];const i=[{value:"atendimento",label:"IA de Atendimento"},{value:"venda",label:"IA de Venda"},{value:"agendamento",label:"IA de Agendamento"},{value:"disparo",label:"Disparo em Massa"},{value:"venda_catalogo",label:"Venda pelo Catálogo"}],a=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>':n.map(h=>`
            <tr data-company-id="${h.id}">
                <td>${h.name}</td>
                <td><span class="badge ${h.status==="active"?"success":"danger"}">${h.status==="active"?"Ativo":"Inativo"}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(h.modulos_ativos||[]).map(w=>`<span class="badge info" style="font-size:0.7rem;">${w}</span>`).join("")}</div></td>
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
    `,o=()=>{const h=document.querySelector(".data-table tbody");h&&(h.innerHTML=a())};window.editCompany=h=>{const w=n.find(b=>b.id===h);if(w){if(document.getElementById("company-id").value=w.id,document.getElementById("company-name").value=w.name,document.getElementById("company-instances-limit").value=(w.limite_instancias||"1").toString(),e){const R=w.modulos_ativos||["atendimento"];e.setValues(R),t=R}document.getElementById("owner-section").style.display="none",document.getElementById("owner-email").required=!1,document.getElementById("owner-password").required=!1;const b=document.getElementById("stores-list");b.innerHTML="",w.stores&&w.stores.length>0?w.stores.forEach(R=>{l(R)}):l(),document.getElementById("company-modal-title").innerText="Editar Cliente",document.getElementById("company-modal").classList.remove("hidden")}},window.toggleCompanyStatus=async(h,w)=>{const b=w==="active"?"inactive":"active",R=b==="inactive"?"desativar":"ativar";let M=`Deseja ${R} este cliente?`;if(b==="inactive"&&(M+=`

⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!`),await Xe.warning(`${R.charAt(0).toUpperCase()+R.slice(1)} Cliente`,M))try{await B.update("companies",h,{status:b});const v=n.find(k=>k.id===h);v&&(v.status=b),o(),V.success(`Cliente ${b==="inactive"?"desativado":"ativado"} com sucesso!`)}catch(v){V.error("Erro ao atualizar status: "+v)}};const l=(h=null)=>{const w=document.getElementById("stores-list");if(!w)return;const b=document.createElement("div");b.className="store-row",h&&(b.dataset.id=h.id,b.dataset.active=h.active!==void 0?h.active:"true",b.dataset.freteAtivo=h.frete_ativo!==void 0?h.frete_ativo:"true",b.dataset.instanciaId=h.instancia_id||""),b.innerHTML=`
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${h?.name||""}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${h?.address||""}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `,b.querySelector(".btn-remove-store").addEventListener("click",()=>{b.remove()}),w.appendChild(b)},c=`
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
    `;function u(h){const w=document.getElementById("company-modal"),b=document.getElementById("btn-new-company"),R=document.querySelector(".close-modal"),M=document.getElementById("create-company-form"),D=document.getElementById("btn-add-store"),v=document.getElementById("stores-list");e=new Kh("modules-select-container",i,["atendimento"],k=>{const S=["atendimento","venda","agendamento"],$=k.find(C=>!t.includes(C));if($==="venda_catalogo"){const C=k.filter(T=>T==="venda_catalogo"||T==="disparo");if(C.length!==k.length){e?.setValues(C),t=C;return}}else if($&&(S.includes($)||$==="disparo")){const C=k.filter(T=>T!=="venda_catalogo");if(S.includes($)){const T=C.filter(A=>!S.includes(A)||A===$);if(T.length!==C.length||C.length!==k.length){e?.setValues(T),t=T;return}}if(C.length!==k.length){e?.setValues(C),t=C;return}}t=k},"Selecione os módulos..."),b&&w&&(b.onclick=()=>{document.getElementById("company-id").value="",document.getElementById("create-company-form").reset(),document.getElementById("owner-section").style.display="block",document.getElementById("owner-email").required=!0,document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",e&&(e.setValues(["atendimento"]),t=["atendimento"]),v&&(v.innerHTML="",h()),w.classList.remove("hidden")}),R&&w&&(R.onclick=()=>w.classList.add("hidden")),D&&(D.onclick=()=>h()),M&&(M.onsubmit=async k=>{k.preventDefault();const S=document.getElementById("company-id").value,$=document.getElementById("company-name").value,C=document.getElementById("owner-email").value,T=document.getElementById("owner-password").value,A=parseInt(document.getElementById("company-instances-limit").value)||1,f=e?e.getValues():["atendimento"];if(f.includes("venda_catalogo")&&f.filter(E=>E!=="venda_catalogo"&&E!=="disparo").length>0){V.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".');return}const m=document.querySelectorAll(".store-row"),y=[];if(m.forEach((x,E)=>{const g=x.querySelector(".store-name").value,_=x.querySelector(".store-address").value;if(g&&_){const L=x.dataset.id,P=x.dataset.active!=="false",K=x.dataset.freteAtivo!=="false",j=x.dataset.instanciaId||null;y.push({id:L||`store_${Date.now()}_${E}`,name:g,address:_,active:P,frete_ativo:K,instancia_id:j})}}),y.length===0){V.warning("É necessário cadastrar pelo menos 1 loja!");return}try{if(S){await B.update("companies",S,{name:$,stores:y,limite_instancias:A,modulos_ativos:f});const x=n.find(E=>E.id===S);x&&(x.name=$,x.stores=y,x.modulos_ativos=f),V.success("Cliente atualizado com sucesso!")}else{const x=await Ae.registerUser(C,T),E=await B.create("companies",{name:$,stores:y,limite_instancias:A,status:"active",ownerId:x,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}});await B.set("users",x,{uid:x,email:C,role:"owner",companyId:E}),n.push({id:E,name:$,stores:y,status:"active",ownerId:x,modulos_ativos:f,metrics:{totalMessages:0,totalPayments:0}}),V.success("Cliente criado com sucesso!")}w&&w.classList.add("hidden"),o()}catch(x){console.error(x),V.error("Erro: "+x)}})}return setTimeout(()=>{u(l)},100),c},yx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await B.get("companies",n.companyId),i=t.limite_instancias||1;let a=await B.getAll("instancias",{field:"empresaId",operator:"==",value:n.companyId});setTimeout(async()=>{let D=!1;for(const v of a)try{const S=(await ht.getInstanceStatus(v.nome)).connected?"conectado":"desconectado";S!==v.status&&(await B.update("instancias",v.id,{status:S}),v.status=S,D=!0)}catch(k){console.error("Error verifying status for",v.nome,k)}D&&h()},500);const o=()=>a.length===0?'<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>':a.map(D=>`
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
    `,h=()=>{const D=document.querySelector(".data-table tbody");D&&(D.innerHTML=o())};let w=null,b=null;const R=()=>{w&&clearInterval(w),b&&clearInterval(b),w=null,b=null};window.refreshApp=()=>{window.location.reload()},window.shareQR=D=>{const v=`${window.location.origin}/qr/${D}`;navigator.clipboard.writeText(v),V.success("Link de conexão copiado para a área de transferência!")},window.deleteInstance=async(D,v)=>{if(await Xe.danger("Excluir Instância",`Tem certeza que deseja excluir a instância "${v}"? Isso irá desconectar o WhatsApp.`))try{await ht.deleteInstance(v),await B.delete("instancias",D),a=a.filter(S=>S.id!==D),h(),V.success("Instância excluída com sucesso.")}catch(S){V.error("Erro ao excluir instância: "+S)}},window.logoutInstance=async(D,v)=>{if(await Xe.warning("Desconectar WhatsApp",`Deseja realmente desconectar o WhatsApp da instância "${v}"?`))try{if(V.info("Desconectando..."),await ht.logoutInstance(v)){await B.update("instancias",D,{status:"desconectado"});const $=a.find(C=>C.id===D);$&&($.status="desconectado"),h(),V.success("Desconectado com sucesso.")}else V.error("Não foi possível desconectar pela API. Verifique se a instância está ativa.")}catch(S){V.error("Erro ao desconectar: "+S)}},window.connectInstance=async D=>{const v=document.getElementById("qrcode-modal"),k=document.getElementById("qrcode-container");if(v&&k){v.classList.remove("hidden"),k.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';const S=async()=>{try{const T=await ht.getQRCode(D);T&&T.base64?k.innerHTML=`<img src="${T.base64}" style="width: 100%; height: 100%; object-fit: contain;">`:(await ht.getInstanceStatus(D)).connected?C():k.innerHTML="<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>"}catch(T){console.error("Error fetching QR:",T)}},$=async()=>{try{(await ht.getInstanceStatus(D)).connected&&C()}catch(T){console.error("Error checking status:",T)}},C=async()=>{R(),V.success("WhatsApp conectado com sucesso!"),v.classList.add("hidden");const T=a.find(A=>A.nome===D);T&&(await B.update("instancias",T.id,{status:"conectado"}),T.status="conectado",h())};await S(),w=setInterval(S,4e4),b=setInterval($,3e3)}},setTimeout(()=>{M(t.id,i)},100);function M(D,v){const k=document.getElementById("btn-new-instance"),S=document.getElementById("new-instance-modal"),$=document.getElementById("close-new-modal"),C=document.getElementById("create-instance-form"),T=document.getElementById("qrcode-modal"),A=document.getElementById("close-qr-modal"),f=document.getElementById("btn-done-qrcode");k&&(k.onclick=()=>{if(a.length>=v){V.error("Limite de instâncias atingido.");return}S?.classList.remove("hidden")}),$&&S&&($.onclick=()=>S.classList.add("hidden")),C&&(C.onsubmit=async m=>{m.preventDefault();let x=document.getElementById("instance-name").value.trim();x=x.replace(/[^a-zA-Z0-9]/g,"_").toLowerCase();const E=`${x}_${D.substring(0,5)}`;try{if(await ht.instanceExists(E)){V.warning("Já existe uma instância com esse nome. Tente outro.");return}V.info("Criando instância, aguarde..."),await ht.createInstance(E);const _={empresaId:D,lojaId:null,nome:E,numero:null,status:"desconectado",funcao:null,webhookUrl:null,upsert:!1},L=await B.create("instancias",_);a.push({id:L,..._,createdAt:{toDate:()=>new Date}}),V.success("Instância criada! Agora vincule-a a uma loja nas configurações."),S?.classList.add("hidden"),h(),window.connectInstance(E)}catch(g){V.error("Erro ao criar instância: "+g)}}),A&&T&&(A.onclick=()=>{R(),T.classList.add("hidden")}),f&&T&&(f.onclick=async()=>{R(),T.classList.add("hidden"),window.location.reload()})}return`
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
    `},vx=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{telefone_lead}}",label:"Telefone",icon:"fa-phone"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],bx=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito para retirada e já está sendo preparado. 

💰 Valor: R$ {{valor_total}}

Aguardamos você!`},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado."},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! 📦 Seu pedido #{{numero_pedido}} já está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue",icon:"fa-flag-checkered",default:"🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],wx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,i=await B.getAll("instancias",{field:"empresaId",operator:"==",value:e}),s=await B.get("companies",e);let o=s?.stores||[];if(n.role!=="owner"){const S=n.storeIds||(n.storeId?[n.storeId]:[]);o=o.filter($=>S.includes($.id))}if(o.length===0)return'<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>';let l=o[0].id;const c=()=>`
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
    `,u=()=>o.find(S=>S.id===l),h=await B.getAll("loja_config",{field:"empresaId",operator:"==",value:e}),w=S=>h.find($=>$.lojaId===S)||null,b=()=>vx.map(S=>`
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
    `;function R(){const S=()=>{document.querySelectorAll(".btn-store-tab").forEach($=>{$.addEventListener("click",()=>{l=$.dataset.id;const C=document.getElementById("tabs-container");C&&(C.innerHTML=c(),S()),M()})})};S()}function M(){const S=u();if(!S)return;const $=w(l),C=$?.mensagens_automaticas||{},T=$?.prompt_ia||S.prompt_ia||"",A=document.getElementById("config-content-area");if(!A)return;const f=()=>'<option value="">Nenhuma</option>'+i.map(y=>{const x=S.instancia_id===y.id,E=o.some(g=>g.id!==l&&g.instancia_id===y.id);return`<option value="${y.id}" ${x?"selected":""} ${E?"disabled":""}>
                     ${y.nome} (${y.status}) ${E?"(Já vinculada a outra loja)":""}
                 </option>`}).join(""),m=()=>bx.map(y=>`
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
        `,setTimeout(()=>{D(),v(),k()},50)}async function D(){const S=document.getElementById("instance-status-indicator");if(!S)return;const $=u();if(!$||!$.instancia_id){S.innerHTML='<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';return}const C=i.find(T=>T.id===$.instancia_id);if(C)try{(await ht.getInstanceStatus(C.nome)).connected?S.innerHTML='<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>':(S.innerHTML='<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>',C.status==="conectado"&&(await B.update("instancias",C.id,{status:"desconectado"}),C.status="desconectado"))}catch{S.innerHTML='<span class="badge warning">Verificando...</span>'}}function v(){const S=document.getElementById("select-store-instance");S?.addEventListener("change",async()=>{const A=S.value,f=u()?.instancia_id,m=o.map(y=>y.id===l?{...y,instancia_id:A||null}:y);try{V.info("Salvando configuração..."),await B.update("companies",e,{stores:m}),o=m;const y=u();if(y&&(y.instancia_id=A),A){const x=i.find(E=>E.id===A);if(x){const E=s.modulos_ativos||["atendimento"];let g="atendimento";E.includes("venda")?g="venda":E.includes("agendamento")?g="agendamento":E.includes("atendimento")?g="atendimento":E.includes("disparo")&&(g="disparo");const _=await B.get("settings","webhooks"),L=_?_[g]:null;V.info(`Vinculando instância e configurando webhook (${g})...`),await B.update("instancias",x.id,{lojaId:l,funcao:g,webhookUrl:L||null}),L&&(await ht.setWebhook(x.nome,L)?V.success("Webhook configurado com sucesso!"):V.warning("Configuração salva, mas houve uma falha ao ativar o webhook na API."))}}else if(f){const x=i.find(E=>E.id===f);x&&(V.info("Desvinculando instância e desativando webhook..."),await ht.setWebhook(x.nome,"",!1),await B.update("instancias",x.id,{lojaId:null,funcao:null,webhookUrl:null}))}D(),V.success("Vínculo de instância atualizado com sucesso!")}catch(y){V.error("Erro ao atualizar vínculo: "+y),M()}});const $=document.getElementById("btn-save-prompt");$?.addEventListener("click",async()=>{const A=document.getElementById("prompt-ia").value.trim();try{$&&($.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');const f=w(l);if(f)await B.update("loja_config",f.id,{prompt_ia:A}),f.prompt_ia=A;else{const y=await B.create("loja_config",{empresaId:e,lojaId:l,prompt_ia:A});h.push({id:y,empresaId:e,lojaId:l,prompt_ia:A})}const m=o.map(y=>y.id===l?{...y,prompt_ia:A}:y);await B.update("companies",e,{stores:m}),o=m,V.success("Prompt salvo com sucesso!"),$&&($.innerHTML='<i class="fa-solid fa-check"></i> Salvo!'),setTimeout(()=>{$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')},2e3)}catch{V.error("Erro ao salvar prompt."),$&&($.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')}}),document.querySelectorAll(".dia-toggle").forEach(A=>{A.addEventListener("change",()=>{const f=A.dataset.dia,m=A.checked,y=document.getElementById(`row-${f}`),x=document.getElementById(`inputs-${f}`),E=document.getElementById(`status-${f}`);m?(y?.classList.remove("inactive"),x?.classList.remove("hidden"),E&&(E.innerText="Aberto",E.style.color="var(--success)")):(y?.classList.add("inactive"),x?.classList.add("hidden"),E&&(E.innerText="Fechado",E.style.color="var(--text-dim)"))})});const C=document.getElementById("btn-save-horarios");C?.addEventListener("click",async()=>{try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const A={};["seg","ter","qua","qui","sex","sab","dom"].forEach(m=>{const y=document.querySelector(`.dia-toggle[data-dia="${m}"]`).checked,x=document.getElementById(`open-${m}`).value,E=document.getElementById(`close-${m}`).value;A[m]={active:y,open:x,close:E}});const f=w(l);if(f)await B.update("loja_config",f.id,{horarios:A}),f.horarios=A;else{const m=await B.create("loja_config",{empresaId:e,lojaId:l,horarios:A});h.push({id:m,empresaId:e,lojaId:l,horarios:A})}V.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'},2e3)}catch{V.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.querySelectorAll(".dia-toggle-entrega").forEach(A=>{A.addEventListener("change",()=>{const f=A.dataset.dia,m=A.checked,y=document.getElementById(`row-entrega-${f}`),x=document.getElementById(`inputs-entrega-${f}`),E=document.getElementById(`status-entrega-${f}`);m?(y?.classList.remove("inactive"),x?.classList.remove("hidden"),E&&(E.innerText="Disponível",E.style.color="var(--success)")):(y?.classList.add("inactive"),x?.classList.add("hidden"),E&&(E.innerText="Indisponível",E.style.color="var(--text-dim)"))})});const T=document.getElementById("btn-save-horarios-entrega");T?.addEventListener("click",async()=>{try{T.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const A={};["seg","ter","qua","qui","sex","sab","dom"].forEach(m=>{const y=document.querySelector(`.dia-toggle-entrega[data-dia="${m}"]`).checked,x=document.getElementById(`open-entrega-${m}`).value,E=document.getElementById(`close-entrega-${m}`).value;A[m]={active:y,open:x,close:E}});const f=w(l);if(f)await B.update("loja_config",f.id,{horarios_entrega:A}),f.horarios_entrega=A;else{const m=await B.create("loja_config",{empresaId:e,lojaId:l,horarios_entrega:A});h.push({id:m,empresaId:e,lojaId:l,horarios_entrega:A})}V.success("Horários de entrega salvos!"),T.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'},2e3)}catch{V.error("Erro ao salvar horários de entrega."),T.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".var-chip").forEach(A=>{A.addEventListener("dragstart",f=>{f.dataTransfer.setData("text/plain",A.dataset.var||"")})}),document.querySelectorAll(".msg-textarea").forEach(A=>{A.addEventListener("dragover",f=>f.preventDefault()),A.addEventListener("drop",f=>{f.preventDefault();const m=f.dataTransfer.getData("text/plain");if(!m)return;const y=A.selectionStart??A.value.length,x=A.selectionEnd??A.value.length;A.value=A.value.slice(0,y)+m+A.value.slice(x)})}),document.querySelectorAll(".btn-save-msg").forEach(A=>{A.id!=="btn-save-prompt"&&A.addEventListener("click",async()=>{const f=A.dataset.msgKey,m=document.getElementById(`msg-${f}`).value.trim();A.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const y=w(l);if(y){const x={[`mensagens_automaticas.${f}`]:m||null};await B.update("loja_config",y.id,x),y.mensagens_automaticas||(y.mensagens_automaticas={}),y.mensagens_automaticas[f]=m||void 0}else{const x=await B.create("loja_config",{empresaId:e,lojaId:l,mensagens_automaticas:{[f]:m||null}});h.push({id:x,empresaId:e,lojaId:l,mensagens_automaticas:{[f]:m||void 0}})}V.success("Mensagem salva com sucesso!"),A.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{A.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'},2e3)}catch{V.error("Erro ao salvar mensagem."),A.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})})}function k(){const S=document.getElementById("primary-color"),$=document.getElementById("primary-color-hex"),C=document.getElementById("secondary-color"),T=document.getElementById("secondary-color-hex"),A=document.getElementById("logo-upload"),f=document.getElementById("btn-save-design");S?.addEventListener("input",()=>$.value=S.value),$?.addEventListener("change",()=>S.value=$.value),C?.addEventListener("input",()=>T.value=C.value),T?.addEventListener("change",()=>C.value=T.value);let m=null;A?.addEventListener("change",()=>{if(A.files&&A.files[0]){m=A.files[0];const y=new FileReader;y.onload=x=>{const E=document.getElementById("logo-preview");E&&(E.innerHTML=`<img src="${x.target?.result}" style="width:100%; height:100%; object-fit:contain;">`)},y.readAsDataURL(m)}}),f?.addEventListener("click",async()=>{try{f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';let y=w(l)?.design?.logoUrl||"";if(m){const g=un(pn,`logos/${e}/${l}_${Date.now()}`);await Ni(g,m),y=await oi(g)}const x={primaryColor:$.value,secondaryColor:T.value,logoUrl:y,whatsapp:document.getElementById("catalog-whatsapp").value.replace(/\D/g,"")},E=w(l);if(E)await B.update("loja_config",E.id,{design:x}),E.design=x;else{const g=await B.create("loja_config",{empresaId:e,lojaId:l,design:x});h.push({id:g,empresaId:e,lojaId:l,design:x})}V.success("Configurações do catálogo atualizadas!"),f.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Configurações'},2e3)}catch(y){console.error("Save design error:",y),V.error("Erro ao salvar design."),f.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Visual'}})}};class _x{newOrderSound;paymentSound;humanSupportSound;notifiedSupportIds=new Set;isInitialLoad=!0;isLeadsInitialLoad=!0;unsubscribe=null;unsubscribeLeads=null;constructor(){this.newOrderSound=new Audio("/sounds/new-order.mp3"),this.paymentSound=new Audio("/sounds/payment-confirmed.mp3"),this.humanSupportSound=new Audio("/sounds/success.mp3"),this.newOrderSound.volume=.5,this.paymentSound.volume=.5,this.humanSupportSound.volume=.6}formatCustomerName(e){const t=e.nome||e.leadName||e.customerName||"";if(t&&t.length>2)return t;const i=e.leadId||e.telefone||"";if(i){const a=i.split("@")[0];return/^\d+$/.test(a)&&a.length>=10?`Cliente (${a.slice(-8)})`:a||"Cliente"}return"Cliente"}showHumanSupportAlert(e){this.humanSupportSound.currentTime=0,this.humanSupportSound.play().catch(()=>{});const t=document.createElement("div");t.className="order-modal",t.id=`support-modal-${e.id}`;const i=this.formatCustomerName(e);t.innerHTML=`
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
        `,document.body.appendChild(t),t.querySelector("#close-support")?.addEventListener("click",()=>{t.remove()})}async showNewOrder(e){const t=e.source==="catalog"||!!e.taxaNome;Array.isArray(e.itens)||(Array.isArray(e.items)?e.itens=e.items.map(v=>({item:v.name||v.item||"",quantidade:v.qty||v.quantidade||1,preco:v.price||v.preco||0,subtotal:v.subtotal||0})):e.itens=[]);const i=e.empresaId||Ae.getCurrentUser()?.companyId;if(i&&Array.isArray(e.itens)&&!t)try{const v=await B.getAll("products",{field:"companyId",operator:"==",value:i});let k=!1;if(e.itens.forEach(S=>{const $=(S.item||"").toLowerCase().trim(),C=v.find(T=>(T.name||"").toLowerCase().trim()===$);if(C){const T=C.promotionalActive&&C.promotionalPrice||C.price;(!S.preco||S.preco===0)&&(S.preco=T,k=!0)}}),k){let S=0;e.itens.forEach(C=>{const T=parseFloat(C.preco)||0,A=parseInt(C.quantidade)||1;S+=A*T});const $=parseFloat(e.valoresAdicionais)||0;e.value=S+$}}catch(v){console.error("Error syncing prices with catalog:",v)}this.newOrderSound.play().catch(()=>{});const a=document.createElement("div");a.className="order-modal",a.id=`modal-${e.id}`;const s=Array.isArray(e.itens)&&e.itens.length>0?e.itens.map((v,k)=>`
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
                        </div>
                        ${(()=>{const v=e.bairro||(e.taxaNome?.includes("(")?e.taxaNome.split("(")[1].split(")")[0]:"");return v?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Bairro</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600; text-align: right;">${v}</span>
                        </div>`:""})()}
                        `:""}
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
        `,document.body.appendChild(a);const u=v=>{const k=parseFloat(v);return isNaN(k)?0:k},h=()=>{let v=0;t?(e.itens||[]).forEach($=>{v+=($.quantidade||1)*($.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach($=>{const C=parseInt($.dataset.index),T=(e.itens||[])[C]?.quantidade||1;v+=T*u($.value)});const k=u(document.getElementById("notif-additional-value")?.value);v+=k;const S=document.getElementById("notif-order-total");S&&(S.innerText=`R$ ${v.toFixed(2)}`)};document.querySelectorAll(".notif-item-price-input").forEach(v=>{v.addEventListener("input",h)}),document.getElementById("notif-additional-value")?.addEventListener("input",h);const w=a.querySelector("#accept-order"),b=a.querySelector("#reject-order"),R=a.querySelector("#confirm-reject"),M=a.querySelector("#reject-reason-container"),D=a.querySelector("#reject-reason");w?.addEventListener("click",async()=>{const v=Ae.getCurrentUser(),k=e.empresaId||v?.companyId;if(!k){V.error("Empresa não identificada.");return}w.disabled=!0,w.textContent="⌛ Processando...";try{let S=0,$=Array.isArray(e.itens)?[...e.itens]:[];if(t){$.forEach(x=>{S+=(x.quantidade||1)*(x.preco||0)});const y=parseFloat(document.getElementById("notif-additional-value")?.value)||0;S+=y}else{const y=E=>{const g=parseFloat(E);return isNaN(g)?0:g};document.querySelectorAll(".notif-item-price-input").forEach(E=>{const g=parseInt(E.dataset.index),_=$[g]?.quantidade||1,L=y(E.value);$[g]&&($[g].preco=L),S+=_*L});const x=y(document.getElementById("notif-additional-value")?.value);S+=x}const C={value:S,total:S,itens:$,valoresAdicionais:parseFloat(document.getElementById("notif-additional-value")?.value)||0},T=e.entrega==="retirada",A=e.pagamento||e.formaPagamento||e.paymentMethod||"",f=A.includes("entrega")||A.includes("dinheiro")||A.includes("maquininha")||A==="na_entrega";let m=T&&f?"em_preparo":"aguardando_pagamento";t&&f&&(m="em_preparo"),await Ln.updateOrderStatus(e,k,m,void 0,C),V.success("Pedido aceito!"),a.remove()}catch(S){V.error("Erro ao aceitar pedido: "+S),w.disabled=!1,w.innerHTML='<i class="fa fa-check"></i> Aceitar'}}),b?.addEventListener("click",()=>{b.classList.add("hidden"),w.classList.add("hidden"),R.classList.remove("hidden"),M.style.display="block",D.focus()}),R?.addEventListener("click",async()=>{const v=D.value.trim();if(!v){V.warning("Informe o motivo da recusa."),D.style.borderColor="red";return}const k=Ae.getCurrentUser(),S=e.empresaId||k?.companyId;if(!S){V.error("Empresa não identificada.");return}R.disabled=!0,R.textContent="⌛ Processando...";try{await Ln.updateOrderStatus(e,S,"cancelado",v),V.success("Pedido recusado e cliente notificado."),a.remove()}catch($){V.error("Erro ao recusar pedido: "+$),R.disabled=!1,R.textContent="Confirmar Recusa"}})}showPaymentConfirmed(){this.paymentSound.play().catch(()=>{});const e=document.createElement("div");e.className="order-modal",e.innerHTML=`
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
        `,document.body.appendChild(e),e.querySelector("#close-payment")?.addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}orderStatusMap=new Map;setupLeadsListener(e){const t=fi(Ut,"leads"),i=s=>{if(s.type!=="modified"&&s.type!=="added")return;const o=s.doc.data(),l=s.doc.id,c="lead_"+l,u=(o.statusAtendimento||"").toLowerCase(),h=(o.estado||"").toLowerCase(),w=u==="atendimento_humano"||u==="em_atendimento_humano"||h==="atendimento_humano";if(this.isLeadsInitialLoad){w&&this.notifiedSupportIds.add(c);return}if(w&&!this.notifiedSupportIds.has(c)){if(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;const b=Ae.getCurrentUser();if(b&&b.role!=="owner"&&b.role!=="admin"){const R=b.storeIds||(b.storeId?[b.storeId]:[]);if(console.log("OrderNotification - Checking Lead Store isolation:",{userStoreIds:R,leadLojaId:o.lojaId}),R.length>0&&o.lojaId&&!R.includes(o.lojaId))return}this.showHumanSupportAlert({...o,id:l,leadId:o.telefone||l,customerName:this.formatCustomerName(o)}),this.notifiedSupportIds.add(c)}else!w&&this.notifiedSupportIds.has(c)&&this.notifiedSupportIds.delete(c)},a=On(t,Vn("empresaId","==",e),Vn("statusAtendimento","in",["atendimento_humano","em_atendimento_humano"]));this.unsubscribeLeads=$a(a,s=>{s.docChanges().forEach(i),this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)}),setTimeout(()=>{this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)},3e3)}startListening(){if(this.unsubscribe)return;const e=Ae.getCurrentUser();if(!e||!e.companyId)return;if(!["admin","owner","employee","staff"].includes(e.role||"")){console.log("OrderNotification - Unauthorized role for notifications:",e.role);return}const i=e.companyId,a=fi(Ut,"pedidos"),s=On(a,Vn("empresaId","==",i),Pw("criadoEm","desc"),Rw(50));this.unsubscribe=$a(s,o=>{o.docChanges().forEach(l=>{const c=l.doc.data(),u=(c.status||"em_montagem").toLowerCase(),h=l.doc.id,w=this.orderStatusMap.get(h);if(this.isInitialLoad){this.orderStatusMap.set(h,u);return}if(this.orderStatusMap.set(h,u),!(c.empresaId&&c.empresaId!==i)&&!(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))){if(e&&e.role!=="owner"&&e.role!=="admin"){const b=e.storeIds||(e.storeId?[e.storeId]:[]);if(console.log("OrderNotification - Checking Store isolation:",{userStoreIds:b,orderLojaId:c.lojaId}),b.length>0&&c.lojaId&&!b.includes(c.lojaId))return}if(u==="em_preparo"&&w==="aguardando_pagamento"&&(c.manuallyConfirmed||this.showPaymentConfirmed()),u==="atendimento_humano"){const b="pedido_"+h;this.notifiedSupportIds.has(b)||(this.showHumanSupportAlert({...c,id:h,customerName:this.formatCustomerName(c)}),this.notifiedSupportIds.add(b));return}if(l.type==="added"){if(["cancelado","finalizado"].includes(u))return;this.showNewOrder({id:l.doc.id,...c,customerName:this.formatCustomerName(c),endereco:c.endereco||"Endereço não informado",description:Array.isArray(c.itens)?c.itens.map(R=>`${R.quantidade}x ${R.item}`).join(", "):"Sem itens",value:c.value||c.total||0,leadId:c.leadId,empresaId:c.empresaId,instancia:c.instancia,itens:c.itens,valoresAdicionais:c.valoresAdicionais})}}}),this.isInitialLoad&&(this.isInitialLoad=!1)}),this.setupLeadsListener(i)}stopListening(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.isInitialLoad=!0),this.unsubscribeLeads&&(this.unsubscribeLeads(),this.unsubscribeLeads=null,this.isLeadsInitialLoad=!0),this.notifiedSupportIds.clear(),this.orderStatusMap.clear()}}const eu=new _x,xx={novo:{label:"Novo",cls:"badge info"},cliente_ativo:{label:"Cliente Ativo",cls:"badge success"},inativo:{label:"Inativo",cls:"badge secondary"},bloqueado:{label:"Bloqueado",cls:"badge danger"}},Ex={bot:{label:"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"},em_atendimento_humano:{label:"Atendimento Humano",icon:'<i class="fa-solid fa-user"></i>',cls:"badge warning"},finalizado:{label:"Finalizado",icon:'<i class="fa-solid fa-check"></i>',cls:"badge success"},abandonado:{label:"Abandonado",icon:'<i class="fa-solid fa-warning"></i>',cls:"badge secondary"}};function tu(n){const e=(n||"novo").toLowerCase(),t=xx[e]||{label:n||"Novo",cls:"badge info"};return`<span class="${t.cls}">${t.label}</span>`}function nu(n){const e=(n||"bot").toLowerCase(),t=Ex[e]||{label:n||"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function qr(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const Ix=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await B.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId});const t=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(v=>v.lojaId&&t.includes(v.lojaId)));const a=(await B.get("companies",n.companyId))?.modulos_ativos||[],s=a.includes("venda_catalogo")&&!a.includes("atendimento");let o="todos";const l=v=>v.length===0?`<tr><td colspan="${s?4:5}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`:v.map(k=>{const S=(k.statusLead||"novo").toLowerCase(),$=(k.statusAtendimento||"bot").toLowerCase(),C=$==="atendimento_humano"?"em_atendimento_humano":$,T=(k.telefone||"").split("@")[0];return`
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
                <td style="color:var(--text-muted);font-size:0.85rem;">${qr(k.updatedAt||k.criadoEm||k.createdAt)}</td>
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
    `;function u(){if(n){const k=fi(Ut,"leads"),S=On(k,Vn("empresaId","==",n.companyId));window._leadsUnsubscribe&&window._leadsUnsubscribe();const $=$a(S,C=>{e=C.docs.map(m=>({id:m.id,...m.data()}));const T=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(m=>m.lojaId&&T.includes(m.lojaId)));const A=document.getElementById("leads-tbody");A&&(A.innerHTML=l(c(o)),h());const f={todos:e.length,bot:e.filter(m=>(m.statusAtendimento||"bot").toLowerCase()==="bot").length,humano:e.filter(m=>{const y=(m.statusAtendimento||"").toLowerCase();return y==="em_atendimento_humano"||y==="atendimento_humano"}).length,bloqueado:e.filter(m=>(m.statusLead||"").toLowerCase()==="bloqueado").length};Object.entries(f).forEach(([m,y])=>{const x=document.getElementById(`count-lead-${m}`);x&&(x.textContent=y.toString())})});window._leadsUnsubscribe=$}document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(k=>{k.addEventListener("click",()=>{document.querySelectorAll(".leads-filter-bar .filter-btn").forEach($=>$.classList.remove("active")),k.classList.add("active"),o=k.dataset.filter||"todos";const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(c(o))),h()})}),h();const v=document.getElementById("lead-detail-modal");v?.addEventListener("click",k=>{k.target===v&&v.classList.add("hidden")})}function h(){document.querySelectorAll(".action-btn.view").forEach(v=>{v.addEventListener("click",async()=>{const k=v.dataset.id,S=e.find($=>$.id===k);S&&w(S)})})}function w(v){const k=document.getElementById("lead-detail-modal"),S=document.getElementById("lead-modal-inner");if(!k||!S)return;const $=(v.statusLead||"novo").toLowerCase(),C=(v.statusAtendimento||"bot").toLowerCase(),T=C==="atendimento_humano"?"em_atendimento_humano":C,A=$==="bloqueado",f=(v.telefone||"").split("@")[0];let m="";!A&&!s&&(T==="bot"?m=`<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
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
                        <span class="lead-info-value">${qr(v.criadoEm||v.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${qr(v.updatedAt)}</span>
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
        `,k.classList.remove("hidden"),document.getElementById("close-lead-modal")?.addEventListener("click",()=>{k.classList.add("hidden")});const x=document.getElementById("lead-menu-trigger"),E=document.getElementById("lead-dropdown");x?.addEventListener("click",g=>{g.stopPropagation(),E?.classList.toggle("hidden")}),document.addEventListener("click",()=>E?.classList.add("hidden"),{once:!0}),E?.querySelectorAll(".lead-dropdown-item").forEach(g=>{g.addEventListener("click",async()=>{E.classList.add("hidden");const _=g.dataset.menuAction;await R(_,v)})}),document.getElementById("lead-action-primary")?.addEventListener("click",async function(){const g=this.dataset.action;await M(g,v)})}function b(v,k){const S=[];return v==="bloqueado"?S.push({label:"Desbloquear Lead",icon:'<i class="fa-solid fa-unlock"></i>',action:"desbloquear"}):S.push({label:"Bloquear Lead",icon:'<i class="fa-solid fa-lock"></i>',action:"bloquear",danger:!0}),S}async function R(v,k){if(v==="bloquear"){if(!await Xe.danger("Bloquear Lead",`Deseja bloquear o lead ${k.nome||k.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`))return;try{await B.update("leads",k.id,{statusLead:"bloqueado",statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ge.now()}),k.statusLead="bloqueado",k.statusAtendimento="finalizado",k.estado="finalizado",V.success("Lead bloqueado e atendimento finalizado."),D(k),w(k)}catch{V.error("Erro ao bloquear lead.")}}if(v==="desbloquear"){if(!await Xe.warning("Desbloquear Lead",`Deseja desbloquear o lead ${k.nome||k.telefone}?`))return;try{await B.update("leads",k.id,{statusLead:"cliente_ativo",updatedAt:ge.now()}),k.statusLead="cliente_ativo",V.success("Lead desbloqueado com sucesso."),D(k),w(k)}catch{V.error("Erro ao desbloquear lead.")}}}async function M(v,k){const S=document.getElementById("lead-action-primary");if(v==="assumir"){if(!await Xe.warning("Assumir Atendimento",`Deseja assumir o atendimento humano do lead ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await B.update("leads",k.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()}),k.statusAtendimento="em_atendimento_humano",k.estado="atendimento_humano",V.success("Atendimento humano iniciado."),D(k),w(k)}catch{V.error("Erro ao assumir atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid user"></i> Assumir Atendimento'}}if(v==="finalizar"){if(!await Xe.warning("Finalizar Atendimento",`Deseja finalizar o atendimento do lead ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await B.update("leads",k.id,{statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ge.now()}),k.statusAtendimento="finalizado",k.estado="finalizado",V.success("Atendimento finalizado."),D(k),w(k)}catch{V.error("Erro ao finalizar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid check"></i> Finalizar Atendimento'}}if(v==="novo_atendimento"){if(!await Xe.warning("Iniciar Novo Atendimento",`Deseja iniciar um novo atendimento humano para ${k.nome||k.telefone}?`))return;S.disabled=!0,S.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await B.update("leads",k.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ge.now()}),k.statusAtendimento="em_atendimento_humano",k.estado="atendimento_humano",V.success("Novo atendimento humano iniciado."),D(k),w(k)}catch{V.error("Erro ao iniciar atendimento."),S.disabled=!1,S.textContent='<i class="fa-solid refresh"></i> Iniciar Novo Atendimento'}}}function D(v){const k=e.findIndex($=>$.id===v.id);k>=0&&(e[k]={...e[k],...v});const S=document.getElementById("leads-tbody");S&&(S.innerHTML=l(c(o))),h()}};function Tx(n){if(!n)return null;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n).getTime();return isNaN(e)?null:e}function kx(n){const e=Tx(n);if(e===null)return{label:"Sem registro",color:"#6b7280"};const t=Date.now()-e,i=Math.floor(t/(1e3*60*60*24)),a=Math.floor(t/(1e3*60*60)),s=Math.floor(t/(1e3*60));let o;s<60?o=s<=1?"Agora há pouco":`há ${s} min`:a<24?o=`há ${a}h`:i===1?o="Ontem":o=`há ${i} dias`;const l=i<7?"#22c55e":i<30?"#f59e0b":"#ef4444";return{label:o,color:l}}const Ax=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId,[t,i,a]=await Promise.all([B.get("companies",e),B.getAll("instancias",{field:"empresaId",operator:"==",value:e}),B.getAll("leads",{field:"empresaId",operator:"==",value:e})]);let s=[],o="nova";const l=()=>i.length===0?'<option value="">Nenhuma instância cadastrada</option>':i.map(v=>{const k=v.status==="conectado"||v.status==="open",S=t?.stores?.find(C=>C.instancia_id===v.id),$=!!S;return`<option value="${v.id}" 
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
        `}function w(){return`
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
        `}function b(){const v=document.getElementById("campaign-view-container");if(!v)return;const k=fi(Ut,"campanhas"),S=On(k,Vn("cliente_id","==",e));window._campaignsUnsubscribe&&window._campaignsUnsubscribe();const $=$a(S,f=>{if(s=f.docs.map(m=>({id:m.id,...m.data()})),o==="historico"){const m=document.getElementById("campaigns-tbody");m&&(m.innerHTML=c(),M())}});window._campaignsUnsubscribe=$;const C=()=>{o==="nova"?(v.innerHTML=h(),R()):(v.innerHTML=w(),M())},T=document.getElementById("tab-nova"),A=document.getElementById("tab-historico");T?.addEventListener("click",()=>{o="nova",T.classList.add("active"),A?.classList.remove("active"),C()}),A?.addEventListener("click",()=>{o="historico",A.classList.add("active"),T?.classList.remove("active"),C()}),C()}function R(){let v=1;const k=15;let S=new Set,$=a,C=[""];const T=document.getElementById("campaign-name"),A=document.getElementById("select-instance"),f=document.getElementById("btn-start-campaign"),m=document.getElementById("lead-search"),y=document.getElementById("lead-filter-store"),x=document.getElementById("lead-filter-status"),E=document.getElementById("lead-filter-activity"),g=document.getElementById("leads-table-body"),_=document.getElementById("select-all-leads"),L=document.getElementById("pagination-info"),P=document.getElementById("prev-page"),K=document.getElementById("next-page"),j=document.getElementById("selected-count-display"),Q=document.getElementById("messages-list"),J=document.getElementById("btn-add-message"),X=()=>{const Ee=m.value.toLowerCase(),ae=y.value,Pe=x.value,Be=E?parseInt(E.value||"0"):0,me=Date.now(),rt=Be>0?me-Be*24*60*60*1e3:null;$=a.filter(fe=>{const ve=!Ee||(fe.nome||"").toLowerCase().includes(Ee)||(fe.telefone||"").includes(Ee),it=!ae||fe.lojaId===ae,qe=!Pe||(fe.statusLead||"novo")===Pe;let xt=!0;if(rt!==null){const ot=fe.updatedAt||fe.criadoEm||fe.createdAt;let Ze=null;ot&&(typeof ot.toDate=="function"?Ze=ot.toDate().getTime():ot.seconds?Ze=ot.seconds*1e3:Ze=new Date(ot).getTime()),xt=Ze!==null&&Ze>=rt}return ve&&it&&qe&&xt}),v=1,se()},se=()=>{if(!g||!L)return;const Ee=(v-1)*k,ae=Math.min(Ee+k,$.length),Pe=$.slice(Ee,ae);g.innerHTML=Pe.map(me=>{const rt=S.has(me.id),fe=t?.stores?.find(it=>it.id===me.lojaId)?.name||"N/A",ve=kx(me.updatedAt||me.criadoEm||me.createdAt);return`
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
                `}).join(""),L.textContent=`Mostrando ${Ee+1}-${ae} de ${$.length}`,j&&(j.textContent=S.size.toString());const Be=Pe.length>0&&Pe.every(me=>S.has(me.id));_&&(_.checked=Be),document.querySelectorAll(".lead-checkbox").forEach(me=>{me.addEventListener("change",rt=>{const fe=rt.target.dataset.id;rt.target.checked?S.add(fe):S.delete(fe),j&&(j.textContent=S.size.toString()),le()})}),le()},ce=()=>{Q&&(Q.innerHTML=C.map((Ee,ae)=>`
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
            `).join(""),document.querySelectorAll(".btn-remove-msg").forEach(Ee=>{const ae=Ee;ae.addEventListener("click",()=>{const Pe=parseInt(ae.dataset.index||"0");C.splice(Pe,1),ce(),le()})}),document.querySelectorAll(".msg-textarea").forEach(Ee=>{const ae=Ee;ae.addEventListener("input",()=>{const Pe=parseInt(ae.dataset.index||"0");C[Pe]=ae.value;const Be=ae.parentElement?.querySelector(".char-count");Be&&(Be.textContent=`${ae.value.length} caracteres`),le()}),ae.addEventListener("dragover",Pe=>Pe.preventDefault()),ae.addEventListener("drop",Pe=>{Pe.preventDefault();const Be=Pe.dataTransfer.getData("text/plain");if(!Be)return;const me=ae.selectionStart||ae.value.length,rt=ae.selectionEnd||ae.value.length,fe=ae.value.slice(0,me)+Be+ae.value.slice(rt);ae.value=fe;const ve=parseInt(ae.dataset.index||"0");C[ve]=fe,le()})}))},le=()=>{const Ee=!!A.value,ae=S.size>0,Pe=C.every(fe=>fe.trim().length>0),Be=A.options[A.selectedIndex],me=Be?.dataset.status==="conectado"||Be?.dataset.status==="open";let rt=!0;if(pe==="scheduled"){const fe=ke?.value;(!fe||new Date(fe).getTime()<=Date.now())&&(rt=!1)}f.disabled=!(Ee&&me&&ae&&Pe&&rt)};m?.addEventListener("input",X),y?.addEventListener("change",X),x?.addEventListener("change",X),E?.addEventListener("change",X),T?.addEventListener("input",le),P?.addEventListener("click",()=>{v>1&&(v--,se())}),K?.addEventListener("click",()=>{v<Math.ceil($.length/k)&&(v++,se())}),_?.addEventListener("change",Ee=>{const ae=(v-1)*k,Pe=Math.min(ae+k,$.length),Be=$.slice(ae,Pe);Ee.target.checked?Be.forEach(me=>S.add(me.id)):Be.forEach(me=>S.delete(me.id)),se()}),J?.addEventListener("click",()=>{C.push(""),ce(),le()}),document.querySelectorAll(".var-chip").forEach(Ee=>{const ae=Ee;ae.addEventListener("dragstart",Pe=>{Pe.dataTransfer.setData("text/plain",ae.dataset.var||"")})});let pe="now";A?.addEventListener("change",le);const ye=document.getElementById("btn-send-now"),Oe=document.getElementById("btn-send-scheduled"),Ne=document.getElementById("schedule-datetime-wrap"),ke=document.getElementById("schedule-datetime"),je=document.getElementById("schedule-error"),_t=()=>{pe==="scheduled"?f.innerHTML='<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha':f.innerHTML='<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora'},ut=Ee=>String(Ee).padStart(2,"0"),De=new Date;De.setMinutes(De.getMinutes()+5),ke.min=`${De.getFullYear()}-${ut(De.getMonth()+1)}-${ut(De.getDate())}T${ut(De.getHours())}:${ut(De.getMinutes())}`,ye?.addEventListener("click",()=>{pe="now",ye.classList.add("active"),Oe?.classList.remove("active"),Ne&&(Ne.style.display="none"),je&&(je.style.display="none"),_t(),le()}),Oe?.addEventListener("click",()=>{pe="scheduled",Oe.classList.add("active"),ye?.classList.remove("active"),Ne&&(Ne.style.display="block"),_t(),le()}),ke?.addEventListener("change",()=>{je&&(je.style.display="none"),le()}),f?.addEventListener("click",async()=>{if(pe==="scheduled"){const me=ke?.value;if(!me||new Date(me).getTime()<=Date.now()){je&&(je.style.display="block");return}}const Ee=pe==="scheduled",ae=Ee?new Date(ke.value):new Date,Pe=Ee?`Confirma o agendamento para ${ae.toLocaleString("pt-BR")} com ${S.size} leads?`:`Deseja iniciar o disparo imediato para ${S.size} leads com ${C.length} variações de mensagem?`;if(await Xe.warning(Ee?"Agendar Campanha":"Iniciar Campanha",Pe))try{f.disabled=!0,f.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const me={cliente_id:e,instancia_id:A.value,nome:T?.value?.trim()||`Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,mensagens:C,total_leads:S.size,lead_ids:Array.from(S),enviados:0,falhas:0,status:"agendada",agendamento_imediato:!Ee,data_agendamento:ge.fromDate(ae),data_inicio:null,config:{delay_min:parseInt(document.getElementById("delay-min").value||"20"),delay_max:parseInt(document.getElementById("delay-max").value||"60")}};await B.create("campanhas",me),V.success(Ee?"Campanha agendada com sucesso!":"Campanha criada! O disparo será iniciado em instantes."),window.location.reload()}catch(me){V.error("Erro ao salvar campanha: "+me),f.disabled=!1,_t()}}),se(),ce()}function M(){document.querySelectorAll(".view-details").forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.id,C=s.find(T=>T.id===$);C&&D(C)})}),document.querySelectorAll(".cancel-campaign").forEach(S=>{S.addEventListener("click",async()=>{const $=S.dataset.id;if(!s.find(A=>A.id===$))return;if(await Xe.danger("Cancelar Campanha","Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito."))try{await B.update("campanhas",$,{status:"cancelada"}),V.success("Campanha cancelada com sucesso.")}catch(A){V.error("Erro ao cancelar a campanha."),console.error("Erro ao cancelar campanha:",A)}})});const v=document.getElementById("close-detail-modal"),k=document.getElementById("campaign-detail-modal");v?.addEventListener("click",()=>k?.classList.add("hidden"))}function D(v){const k=document.getElementById("campaign-detail-modal"),S=document.getElementById("campaign-detail-content");if(!k||!S)return;const $=v.total_leads>0?Math.round((v.enviados+v.falhas)/v.total_leads*100):0;S.innerHTML=`
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
        `,k.classList.remove("hidden")}},Ii={agendado:{label:"Agendado",color:"#6366f1",icon:"fa-clock"},confirmado:{label:"Confirmado",color:"#10b981",icon:"fa-circle-check"},concluido:{label:"Concluído",color:"#64748b",icon:"fa-flag-checkered"},cancelado:{label:"Cancelado",color:"#ef4444",icon:"fa-ban"}},Lt=n=>String(n).padStart(2,"0"),oa=n=>{const[e,t,i]=n.split("-");return`${i}/${t}/${e}`},la=n=>n?.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})??"R$ 0,00",ca=()=>{const n=new Date;return`${n.getFullYear()}-${Lt(n.getMonth()+1)}-${Lt(n.getDate())}`},Sx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await B.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;const s=(await B.getAll("products",{field:"companyId",operator:"==",value:e})).filter(g=>g.active!==!1),o=await B.getAll("clientes",{field:"companyId",operator:"==",value:e});o.sort((g,_)=>(g.nome||"").localeCompare(_.nome||""));let l=await B.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),c=ca(),u="day";const h=g=>{const _=new Date(g+"T12:00:00"),L=_.getDay(),P=new Date(_);return P.setDate(_.getDate()-((L===0?7:L)-1)),Array.from({length:7},(K,j)=>{const Q=new Date(P);return Q.setDate(P.getDate()+j),`${Q.getFullYear()}-${Lt(Q.getMonth()+1)}-${Lt(Q.getDate())}`})},w=g=>l.filter(_=>_.date===g).sort((_,L)=>_.time.localeCompare(L.time)),b=g=>l.filter(_=>g.includes(_.date)).sort((_,L)=>_.date.localeCompare(L.date)||_.time.localeCompare(L.time)),R=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],M=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],D=g=>{const _=new Date(g+"T12:00:00");return R[_.getDay()]},v=g=>{const _=new Date(g+"T12:00:00");return`${M[_.getMonth()]} ${_.getFullYear()}`},k=g=>{const _=Ii[g]||Ii.agendado;return`<span class="sched-badge" style="background:${_.color}22;color:${_.color};border-color:${_.color}44;">
            <i class="fa-solid ${_.icon}"></i> ${_.label}
        </span>`},S=g=>{const _=Ii[g.status]||Ii.agendado;return`
        <div class="sched-card" data-id="${g.id}" style="border-left-color: ${_.color};">
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
        </div>`},$=()=>{const g=w(c),_=g.reduce((L,P)=>L+(P.servicePrice||0),0);return`
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
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${la(_)}</strong> previsão</div>
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
        </div>`},C=()=>{const g=h(c),_=b(g);return`
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${oa(g[0])} a ${oa(g[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${g.map(L=>{const P=_.filter(Q=>Q.date===L);return`
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
        </div>`},T=()=>{const g=[...l].sort((P,K)=>P.date.localeCompare(K.date)||P.time.localeCompare(K.time)),_=g.filter(P=>P.date>=ca()&&P.status!=="cancelado"),L=g.filter(P=>P.date<ca()||P.status==="cancelado");return`
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${_.length})</div>
            ${_.length===0?'<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>':""}
            ${_.map(P=>`
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
        </div>`:""}`},A=Array.from({length:28},(g,_)=>{const L=Math.floor(_/2)+8,P=_%2===0?"00":"30";return`${Lt(L)}:${P}`}),f=`
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
    </div>`;setTimeout(()=>E(),100);const m=()=>{const g=document.getElementById("sched-view-content");g&&(u==="day"?g.innerHTML=$():u==="week"?g.innerHTML=C():g.innerHTML=T(),y())},y=()=>{document.getElementById("prev-day")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()-1),c=`${g.getFullYear()}-${Lt(g.getMonth()+1)}-${Lt(g.getDate())}`,m()}),document.getElementById("next-day")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()+1),c=`${g.getFullYear()}-${Lt(g.getMonth()+1)}-${Lt(g.getDate())}`,m()}),document.getElementById("prev-week")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()-7),c=`${g.getFullYear()}-${Lt(g.getMonth()+1)}-${Lt(g.getDate())}`,m()}),document.getElementById("next-week")?.addEventListener("click",()=>{const g=new Date(c+"T12:00:00");g.setDate(g.getDate()+7),c=`${g.getFullYear()}-${Lt(g.getMonth()+1)}-${Lt(g.getDate())}`,m()}),document.getElementById("btn-add-for-day")?.addEventListener("click",()=>{x()})};function x(g){const _=document.getElementById("sched-modal");if(!_)return;const L=document.getElementById("sched-modal-title"),P=document.getElementById("sched-client-select"),K=document.getElementById("sched-service"),j=document.getElementById("sched-date"),Q=document.getElementById("sched-time"),J=document.getElementById("sched-duration"),X=document.getElementById("sched-status"),se=document.getElementById("sched-notes"),ce=document.getElementById("save-sched-btn");if(g){L.innerText="Editar Agendamento";const le=g.clienteId||"";if(P)if(le)P.value=le;else{const pe=Array.from(P.options).find(ye=>ye.dataset.nome===g.clientName);P.value=pe?pe.value:""}K.value=g.serviceId,j.value=g.date,Q.value=g.time,J.value=String(g.duration||30),X.value=g.status,se.value=g.notes||"",ce.setAttribute("data-edit-id",g.id)}else L.innerText="Novo Agendamento",P&&(P.value=""),K.value="",j.value=c,Q.value="09:00",J.value="30",X.value="agendado",se.value="",ce.removeAttribute("data-edit-id");_.classList.remove("hidden")}function E(){document.getElementById("btn-new-appointment")?.addEventListener("click",()=>x()),document.getElementById("close-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("cancel-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("sched-service")?.addEventListener("change",g=>{const _=g.target,P=_.options[_.selectedIndex].dataset.duration;P&&(document.getElementById("sched-duration").value=P)}),document.getElementById("save-sched-btn")?.addEventListener("click",async()=>{const g=document.getElementById("sched-client-select"),_=document.getElementById("sched-service"),L=document.getElementById("sched-date"),P=document.getElementById("sched-time"),K=document.getElementById("sched-duration"),j=document.getElementById("sched-status"),Q=document.getElementById("sched-notes"),J=document.getElementById("save-sched-btn");if(!g.value){V.warning("Selecione um cliente.");return}if(!_.value){V.warning("Selecione um serviço.");return}if(!L.value){V.warning("Informe a data.");return}const X=g.options[g.selectedIndex],se=g.value,ce=X.dataset.nome||X.text.split(" — ")[0],le=X.dataset.phone||"",pe=_.options[_.selectedIndex],ye={serviceId:_.value,serviceName:pe.text.split(" — ")[0],servicePrice:parseFloat(pe.dataset.price||"0")},Oe={companyId:e,clienteId:se,clientName:ce,clientPhone:le,...ye,date:L.value,time:P.value,duration:parseInt(K.value)||30,status:j.value,notes:Q.value.trim()||void 0},Ne=J.getAttribute("data-edit-id");J.disabled=!0,J.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(Ne){await B.update("agendamentos",Ne,Oe);const ke=l.findIndex(je=>je.id===Ne);ke!==-1&&(l[ke]={id:Ne,...Oe}),V.success("Agendamento atualizado!")}else{const ke=await B.create("agendamentos",Oe);l.push({id:ke,...Oe}),V.success("Agendamento criado com sucesso!")}document.getElementById("sched-modal")?.classList.add("hidden"),m()}catch(ke){V.error("Erro ao salvar agendamento: "+ke)}finally{J.disabled=!1,J.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.querySelectorAll(".sched-view-tab").forEach(g=>{g.addEventListener("click",()=>{document.querySelectorAll(".sched-view-tab").forEach(_=>_.classList.remove("active")),g.classList.add("active"),u=g.dataset.view,m()})}),document.getElementById("sched-date-jump")?.addEventListener("change",g=>{c=g.target.value,m()}),document.getElementById("btn-today")?.addEventListener("click",()=>{c=ca(),document.getElementById("sched-date-jump").value=c,m()}),window.editAppointment=g=>{const _=l.find(L=>L.id===g);_&&x(_)},window.confirmAppointment=async g=>{try{await B.update("agendamentos",g,{status:"confirmado"});const _=l.find(L=>L.id===g);_&&(_.status="confirmado"),m(),V.success("Agendamento confirmado!")}catch{V.error("Erro ao confirmar.")}},window.completeAppointment=async g=>{try{await B.update("agendamentos",g,{status:"concluido"});const _=l.find(L=>L.id===g);_&&(_.status="concluido"),m(),V.success("Agendamento concluído!")}catch{V.error("Erro ao concluir.")}},window.cancelAppointment=async g=>{if(await Xe.danger("Excluir Agendamento","Deseja excluir este agendamento? Esta ação não pode ser desfeita."))try{await B.delete("agendamentos",g),l=l.filter(L=>L.id!==g),m(),V.success("Agendamento excluído.")}catch{V.error("Erro ao excluir.")}},window.selectWeekDay=g=>{c=g,u="day",document.querySelectorAll(".sched-view-tab").forEach(_=>{_.classList.toggle("active",_.dataset.view==="day")}),document.getElementById("sched-date-jump").value=g,m()},m()}return`
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

    ${f}`},Cx=n=>{if(!n)return"—";try{return new Date(n).toLocaleDateString("pt-BR")}catch{return n}},Px=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await B.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-users-slash" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;let a=await B.getAll("clientes",{field:"companyId",operator:"==",value:e});const s=await B.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),o=new Map;s.forEach(v=>{const k=v.clienteId;if(!k)return;const S=o.get(k),$=v.date||"";S?o.set(k,{count:S.count+1,ultimo:$>S.ultimo?$:S.ultimo}):o.set(k,{count:1,ultimo:$})});let l="";const c=v=>v.length===0?`
            <tr>
                <td colspan="5" style="text-align:center;padding:2.5rem;color:var(--text-muted);">
                    <i class="fa-solid fa-users-slash" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.4;"></i>
                    Nenhum cliente encontrado.
                </td>
            </tr>`:v.map(k=>{const S=o.get(k.id),$=S?.count??0,C=S?.ultimo?Cx(S.ultimo):"—",T=(k.nome||k.telefone||"C")[0].toUpperCase();return`
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
    </div>`;setTimeout(()=>D(),100);function w(v){const k=document.getElementById("sc-modal");if(!k)return;const S=document.getElementById("sc-modal-title"),$=document.getElementById("sc-nome"),C=document.getElementById("sc-telefone"),T=document.getElementById("sc-email"),A=document.getElementById("sc-obs"),f=document.getElementById("sc-save-btn");v?(S.textContent="Editar Cliente",$.value=v.nome||"",C.value=v.telefone||"",T.value=v.email||"",A.value=v.observacoes||"",f.setAttribute("data-edit-id",v.id)):(S.textContent="Novo Cliente",$.value="",C.value="",T.value="",A.value="",f.removeAttribute("data-edit-id")),k.classList.remove("hidden"),$.focus()}function b(){document.getElementById("sc-modal")?.classList.add("hidden")}const R=()=>{const v=document.getElementById("sc-tbody");v&&(v.innerHTML=c(u())),M()};function M(){document.querySelectorAll(".sc-action-btn.edit").forEach(v=>{v.addEventListener("click",()=>{const k=v.dataset.editId,S=a.find($=>$.id===k);S&&w(S)})}),document.querySelectorAll(".sc-action-btn.del").forEach(v=>{v.addEventListener("click",async()=>{const k=v.dataset.delId,S=a.find(C=>C.id===k);if(await Xe.danger("Excluir Cliente",`Deseja excluir o cliente "${S?.nome||k}"? Esta ação não pode ser desfeita.`))try{await B.delete("clientes",k),a=a.filter(C=>C.id!==k),R(),V.success("Cliente excluído.")}catch{V.error("Erro ao excluir cliente.")}})})}function D(){document.getElementById("btn-new-client")?.addEventListener("click",()=>w()),document.getElementById("sc-modal-close")?.addEventListener("click",b),document.getElementById("sc-modal-cancel")?.addEventListener("click",b),document.getElementById("sc-modal")?.addEventListener("click",v=>{v.target===document.getElementById("sc-modal")&&b()}),document.getElementById("sc-search")?.addEventListener("input",v=>{l=v.target.value,R()}),document.getElementById("sc-save-btn")?.addEventListener("click",async()=>{const v=document.getElementById("sc-nome"),k=document.getElementById("sc-telefone"),S=document.getElementById("sc-email"),$=document.getElementById("sc-obs"),C=document.getElementById("sc-save-btn"),T=v.value.trim(),A=k.value.trim().replace(/\D/g,"");if(!T){V.warning("Informe o nome do cliente.");return}if(!A){V.warning("Informe o telefone do cliente.");return}const f={companyId:e,nome:T,telefone:A,email:S.value.trim()||"",observacoes:$.value.trim()||"",criadoEm:new Date().toISOString()},m=C.getAttribute("data-edit-id");C.disabled=!0,C.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(m){await B.update("clientes",m,f);const y=a.findIndex(x=>x.id===m);y!==-1&&(a[y]={id:m,...f}),V.success("Cliente atualizado!")}else{const y=await B.create("clientes",f);a.push({id:y,...f}),V.success("Cliente criado com sucesso!")}b(),R()}catch(y){V.error("Erro ao salvar cliente: "+y)}finally{C.disabled=!1,C.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),R()}return`
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

    ${h}`},Rx=async()=>{let n={atendimento:"",agendamento:"",venda:"",disparo:""};try{const t=await B.get("settings","webhooks");t&&(n={...n,...t})}catch(t){console.error("Error loading webhooks:",t)}const e=`
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
    `;return setTimeout(()=>{const t=document.getElementById("webhooks-form");t&&(t.onsubmit=async i=>{i.preventDefault();const a=t.querySelector('button[type="submit"]');a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';const s={atendimento:document.getElementById("webhook-atendimento").value,agendamento:document.getElementById("webhook-agendamento").value,venda:document.getElementById("webhook-venda").value,disparo:document.getElementById("webhook-disparo").value,updatedAt:new Date};try{await B.set("settings","webhooks",s),V.success("Webhooks atualizados com sucesso!")}catch(o){console.error("Error saving webhooks:",o),V.error("Erro ao salvar configurações.")}finally{a.disabled=!1,a.innerHTML='<i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações'}})},100),e},Lx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await B.get("companies",n.companyId),i=t?.mercadoPagoToken||"",a=t?.userIdMercadoPago||"";return window.disconnectMercadoPago=async()=>{if(!await Xe.danger("Desativar Integração","Tem certeza que deseja desativar o Mercado Pago? Isso removerá seu token de acesso."))return;const o=document.getElementById("btn-disconnect-mp");o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await B.update("companies",n.companyId,{mercadoPagoToken:null,userIdMercadoPago:null}),V.success("Integração desativada."),setTimeout(()=>window.location.reload(),1e3)}catch(l){V.error("Erro ao desativar: "+l.message),o.disabled=!1,o.innerHTML='<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>'}},window.connectMercadoPago=async()=>{const s=document.getElementById("mp-token-input"),o=document.getElementById("btn-connect-mp"),l=s.value.trim();if(!l){V.warning("Por favor, insira o Access Token primeiro.");return}o.disabled=!0;const c=o.innerHTML;o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';try{if(await B.update("companies",n.companyId,{mercadoPagoToken:l}),!(await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-userId-mercadopago",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:l,companyId:n.companyId})})).ok)throw new Error("Falha ao processar a conexão via servidor.");V.success("Integração processada com sucesso!"),setTimeout(()=>{window.location.reload()},1500)}catch(u){console.error(u),V.error("Erro na conexão: "+u.message)}finally{o.disabled=!1,o.innerHTML=c}},`
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
    `},iu=async n=>{try{const e=await B.getAll("loja_config",{field:"lojaId",operator:"==",value:n});let t=e[0]?.empresaId,i=null,a=null;if(t&&(i=await B.get("companies",t),i&&(a=i.stores?.find(z=>z.id===n))),!a){const z=await B.getAll("companies");for(const N of z){const F=N.stores?.find(G=>G.id===n);if(F){i=N,a=F;break}}}if(!i||!a)return`
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;const o=(i.modulos_ativos||[]).includes("venda_catalogo"),l=await B.getAll("products",{field:"companyId",operator:"==",value:i.id}),c=await B.getAll("categories",{field:"companyId",operator:"==",value:i.id}),u=e[0]||{},h=u.design||{},w=h.primaryColor||"#6366f1",b=h.secondaryColor||"#0f172a",R=h.textColor||"#ffffff",M=h.priceColor||"#ffffff",D=h.logoUrl||"",v=h.pixKey||"",k=(z,N,F)=>{if(typeof document>"u")return;if(document.title=z,[{name:"description",content:N},{property:"og:title",content:z},{property:"og:description",content:N},{property:"og:image",content:F},{property:"og:type",content:"website"},{property:"og:url",content:window.location.href},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:z},{name:"twitter:description",content:N},{name:"twitter:image",content:F}].forEach(W=>{const te=W.name?`meta[name="${W.name}"]`:`meta[property="${W.property}"]`;let ne=document.querySelector(te);ne||(ne=document.createElement("meta"),W.name&&ne.setAttribute("name",W.name),W.property&&ne.setAttribute("property",W.property),document.head.appendChild(ne)),ne.setAttribute("content",W.content)}),D){let W=document.querySelector("link[rel~='icon']");W||(W=document.createElement("link"),W.rel="icon",document.head.appendChild(W)),W.href=D}},S=a.name||"Catálogo",$=h.metaDescription||`Confira os produtos de ${S} em nosso catálogo digital.`,C=h.logoUrl||window.location.origin+"/logo.png";k(S,$,C),console.log(`[Catalog] Meta tags updated for: ${S}`);let T=h.whatsapp||"";if(!T)try{if(a.instancia_id){const z=await B.get("instancias",a.instancia_id);z?.numero&&(T=z.numero.replace(/\D/g,""))}}catch(z){console.warn("Could not fetch instance details:",z)}const A=!!i.mercadoPagoToken&&u.mercadoPagoActive!==!1,f=l.filter(z=>z.active!==!1&&(z.storeIds?.includes(n)||z.storeId===n)).sort((z,N)=>(z.name||"").localeCompare(N.name||"")),m=f.filter(z=>z.promotionalActive),y=h.themeId||"classico",x=h.bannerUrl||"",E=h.bannerMobileUrl||"",g=c.map(z=>({...z,products:f.filter(N=>N.categoryId===z.id)})).filter(z=>z.products.length>0).sort((z,N)=>(z.name||"").localeCompare(N.name||"")),_=f.filter(z=>!z.categoryId||!c.find(N=>N.id===z.categoryId)),L=z=>z.imageUrl?z.imageUrl:z.imagemPath&&z.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(z.imagemPath)}?alt=media&token=${z.downloadToken}`:"https://via.placeholder.com/300?text=Sem+Imagem";let P=new Map;try{const z=localStorage.getItem(`cat_cart_${n}`);z&&(P=new Map(JSON.parse(z)))}catch{}const K=u?.bairrosEntrega||[],j=[];K&&Array.isArray(K)&&(K.forEach(z=>{(z.bairros||"").split(",").map(F=>F.trim()).filter(Boolean).forEach(F=>j.push({nome:F,preco:parseFloat(z.preco)||0}))}),j.sort((z,N)=>z.nome.localeCompare(N.nome)));const Q=u?.cupons||[],J=`cat_user_${i.id}`,X=JSON.parse(localStorage.getItem(J)||"{}");let se=null;const ce=()=>{let z=0;return P.forEach(({product:N,qty:F})=>{const G=N.promotionalActive&&N.promotionalPrice||N.price;z+=G*F}),z},le=()=>window.catDeliveryType==="retirada"?0:window.catTaxaBairro||0,pe=()=>window.catDeliveryType==="retirada"?"Retirada":window.catSelectedBairro?`Entrega (${window.catSelectedBairro})`:"Taxa de Entrega",ye=z=>se?se.tipo==="percent"?z*se.desconto/100:se.desconto:0,Oe=()=>{const z=ce();return z+le()-ye(z)},Ne=()=>{if(P.size===0)return'<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';let z="";return P.forEach(({product:N,qty:F},G)=>{const W=N.promotionalActive&&N.promotionalPrice||N.price;z+=`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${N.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${W.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${G}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${F}</span>
                        <button onclick="window.catQtyChange('${G}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${G}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`}),z},ke=()=>{const z=ce(),N=le(),F=ye(z),G=z+N-F;let W="";return P.forEach(({product:te,qty:ne})=>{const be=te.promotionalActive&&te.promotionalPrice||te.price;W+=`<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${ne}x ${te.name}</span><span>R$ ${(be*ne).toFixed(2)}</span></div>`}),N>0&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${pe()}</span><span>+ R$ ${N.toFixed(2)}</span></div>`),F>0&&se&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${se.codigo}</span><span>- R$ ${F.toFixed(2)}</span></div>`),W+=`<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${G.toFixed(2)}</span></div>`,W},je={dom:"Domingo",seg:"Segunda-feira",ter:"Terça-feira",qua:"Quarta-feira",qui:"Quinta-feira",sex:"Sexta-feira",sab:"Sábado"},_t=()=>["dom","seg","ter","qua","qui","sex","sab"][new Date().getDay()],ut=z=>{const N=u.horario_funcionamento?.[z]||a.horarios?.[z]||{};return{ativo:N.ativo??N.aberto??z!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},De=z=>{const N=u.horario_entrega?.[z]||a.horario_entrega?.[z]||{};return console.log(N),{ativo:N.ativo??N.aberto??z!=="dom",inicio:N.inicio||N.abertura||"08:00",fim:N.fim||N.fechamento||"18:00"}},ae=(()=>{const z=_t(),N=De(z);if(!N.ativo)return!1;const F=new Date,G=F.getHours()*60+F.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number);return G>=W*60+te&&G<=ne*60+be})(),Pe=()=>{const z=_t(),N=ut(z);if(!N.ativo)return!1;const F=new Date,G=F.getHours()*60+F.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number);return G>=W*60+te&&G<=ne*60+be},Be=()=>{const z=["dom","seg","ter","qua","qui","sex","sab"],N=new Date().getDay(),F=new Date,G=F.getHours()*60+F.getMinutes(),W=z[N],te=ut(W);if(te.ativo){const[ne,be]=te.inicio.split(":").map(Number),He=ne*60+be;if(G<He)return`Hoje às ${te.inicio}`}for(let ne=1;ne<=7;ne++){const be=(N+ne)%7,He=z[be],We=ut(He);if(We.ativo)return ne===1?`Amanhã às ${We.inicio}`:`${je[He]} às ${We.inicio}`}return"em breve"},me=Pe(),rt=()=>{const z=_t(),N=ut(z);if(!N.ativo)return'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';const F=new Date,G=F.getHours()*60+F.getMinutes(),[W,te]=N.inicio.split(":").map(Number),[ne,be]=N.fim.split(":").map(Number),He=W*60+te,We=ne*60+be;return G>=He&&G<=We?`<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${N.fim}</span>`:G<He?`<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${N.inicio}</span>`:'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>'},fe=()=>{let z="";return["dom","seg","ter","qua","qui","sex","sab"].forEach(N=>{const F=ut(N);F.ativo?z+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${je[N]}</span><span style="font-weight:600;">${F.inicio} às ${F.fim}</span></div>`:z+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${je[N]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`}),z},ve=()=>{const z=document.getElementById("cart-badge"),N=document.getElementById("cart-total"),F=document.getElementById("cart-items"),G=document.getElementById("cart-float-btn"),W=document.getElementById("cart-total-float"),te=document.getElementById("cart-badge-float");try{localStorage.setItem(`cat_cart_${n}`,JSON.stringify(Array.from(P.entries())))}catch{}let ne=0;P.forEach(({qty:be})=>ne+=be),z&&(z.textContent=ne.toString()),te&&(te.textContent=ne.toString()),G&&(G.style.display=ne>0?"flex":"none"),N&&(N.textContent=`R$ ${Oe().toFixed(2)}`),W&&(W.textContent=`R$ ${Oe().toFixed(2).replace(".",",")}`),F&&(F.innerHTML=Ne())};window.openStoreInfo=()=>it("store-info-modal"),window.closeStoreInfo=()=>qe("store-info-modal"),window.catInit=()=>{const z=document.getElementById("checkout-name"),N=document.getElementById("checkout-phone"),F=document.getElementById("checkout-address");z&&X.name&&(z.value=X.name),N&&X.phone&&(N.value=X.phone),F&&X.address&&(F.value=X.address),N&&N.addEventListener("input",G=>{let W=G.target.value.replace(/\D/g,"");W.length>11&&(W=W.slice(0,11)),G.target.value=W})},setTimeout(()=>window.catInit(),500);const it=z=>{const N=document.getElementById(z);N&&(N.style.display="flex")},qe=z=>{const N=document.getElementById(z);N&&(N.style.display="none")};if(o){window.showClosedAlert=N=>{const F=document.getElementById("closed-alert-title"),G=document.getElementById("closed-alert-desc"),W=document.getElementById("closed-alert-time-section"),te=document.getElementById("next-open-time"),ne=document.getElementById("closed-alert-icon");N==="store"?(F&&(F.textContent="Loja Fechada"),G&&(G.textContent="No momento não estamos aceitando pedidos."),W&&(W.style.display="block"),te&&(te.textContent=Be()),ne&&(ne.className="fa-solid fa-store-slash")):N==="delivery"&&(F&&(F.textContent="Entrega Desativada"),G&&(G.textContent="O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível."),W&&(W.style.display="none"),ne&&(ne.className="fa-solid fa-motorcycle")),it("closed-alert-modal")},window.catAddToCart=N=>{const F=f.find(ne=>ne.id===N);if(!F||F.stock===0)return;const G=P.get(N),W=F.stock??1/0;if((G?.qty||0)>=W){alert(`Estoque máximo atingido (${F.stock} un.)`);return}P.set(N,{product:F,qty:(G?.qty||0)+1}),ve();const te=document.getElementById(`btn-add-${N}`);te&&(te.textContent="✓ Adicionado",setTimeout(()=>{te&&(te.textContent="+ Adicionar")},1e3))},window.catQtyChange=(N,F)=>{const G=P.get(N);if(!G)return;const W=G.qty+F;W<=0?P.delete(N):G.qty=Math.min(W,G.product.stock??1/0),ve()},window.catRemoveItem=N=>{P.delete(N),ve()},window.openCart=()=>{ve(),it("cart-modal")},window.closeCart=()=>qe("cart-modal"),window.goToDelivery=async()=>{if(P.size===0)return;if(!me){window.showClosedAlert("store");return}const N=document.getElementById("btn-go-delivery");N&&(N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Verificando...');let F=!1;for(const[G,{product:W,qty:te}]of Array.from(P.entries()))try{const ne=await B.get("products",G);if(!ne||ne.active===!1||ne.stock!=null&&ne.stock<te){F=!0,alert(`O produto "${W.name}" não possui quantidade suficiente em estoque ou está indisponível.`);break}}catch{}N&&(N.innerHTML='<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido'),!F&&(qe("cart-modal"),it("delivery-modal"))},window.closeDelivery=()=>qe("delivery-modal"),window.selectDelivery=N=>{window.catDeliveryType=N,document.querySelectorAll(".delivery-card").forEach(W=>{W.style.borderColor="rgba(255,255,255,0.1)",W.style.background="transparent"});const F=document.getElementById(`delivery-card-${N}`);F&&(F.style.borderColor="#6366f1",F.style.background="rgba(99,102,241,0.08)");const G=document.getElementById("btn-go-customer");G&&(G.disabled=!1,G.style.opacity="1",G.style.cursor="pointer")},window.goToCustomer=()=>{const N=window.catDeliveryType;if(!N)return;if(N==="entrega"&&!ae){window.showClosedAlert("delivery");return}qe("delivery-modal");const F=document.getElementById("address-group");F&&(F.style.display=N==="entrega"?"block":"none"),it("customer-modal")},window.closeCustomer=()=>qe("customer-modal"),window.catFilterBairros=N=>{const F=document.getElementById("checkout-bairro-dropdown");if(!F)return;const G=N?j.filter(W=>W.nome.toLowerCase().includes(N.toLowerCase())):j;G.length===0?F.innerHTML='<div style="padding:12px;color:#ef4444;font-size:0.85rem;">Nenhum bairro encontrado</div>':F.innerHTML=G.map(W=>`<div onclick="window.catSelectBairro('${W.nome.replace(/'/g,"\\'")}', ${W.preco})" style="padding:12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);color:white;font-size:0.9rem;">${W.nome} - R$ ${W.preco.toFixed(2)}</div>`).join(""),F.style.display="block"},window.catSelectBairro=(N,F)=>{const G=document.getElementById("checkout-bairro");G&&(G.value=N,G.dataset.preco=F.toString());const W=document.getElementById("checkout-bairro-dropdown");W&&(W.style.display="none")},document.addEventListener("click",N=>{if(!N.target.closest("#bairro-input-wrapper")){const F=document.getElementById("checkout-bairro-dropdown");F&&(F.style.display="none")}}),window.goToPayment=()=>{const N=document.getElementById("checkout-name")?.value.trim(),F=document.getElementById("checkout-phone")?.value.trim(),G=document.getElementById("checkout-address")?.value.trim(),W=window.catDeliveryType;let te="",ne=0;if(W==="entrega"&&j.length>0){const gt=document.getElementById("checkout-bairro");if(!gt||!gt.value.trim()){alert("Selecione ou digite seu bairro para entrega.");return}te=gt.value.trim();const Re=j.find(ze=>ze.nome.toLowerCase()===te.toLowerCase());if(!Re){alert("Bairro selecionado não encontrado na lista. Por favor, escolha uma opção listada.");return}te=Re.nome,ne=Re.preco}if(!N||!F){alert("Preencha nome e telefone.");return}if(F.length<10){alert("Telefone inválido. Use o formato DD000000000");return}if(W==="entrega"&&!G){alert("Preencha o endereço de entrega completo.");return}window.catSelectedBairro=te,window.catTaxaBairro=ne;const be={name:N,phone:F,address:G||"",bairro:te};window.catCustomer=be,localStorage.setItem(J,JSON.stringify(be)),qe("customer-modal");const He=document.getElementById("payment-order-summary");He&&(He.innerHTML=ke());const We=document.getElementById("cat-coupon-section");We&&(We.style.display=Q.length>0?"block":"none");const Et=document.getElementById("btn-pay-delivery"),kt=document.getElementById("btn-pay-pix-manual"),Pt=document.getElementById("btn-pay-pix-mp"),Te=document.getElementById("mandatory-pay-msg"),Mt=u?.pagamentoObrigatorioRetirada===!0;Et&&(W==="retirada"&&Mt?Et.style.display="none":Et.style.display="flex"),Te&&(Te.style.display=W==="retirada"&&Mt?"block":"none"),kt&&(kt.style.display=v?"flex":"none"),Pt&&(Pt.style.display=A?"flex":"none"),it("payment-modal")},window.closePayment=()=>qe("payment-modal"),window.catApplyCoupon=()=>{const N=(document.getElementById("cat-coupon-input")?.value||"").trim().toUpperCase(),F=Q.find(be=>be.codigo===N&&be.ativo!==!1),G=ce(),W=document.getElementById("cat-coupon-msg");if(!F){W&&(W.textContent="Cupom inválido ou expirado.",W.style.color="#ef4444");return}if(F.valorMinimo>0&&G<F.valorMinimo){W&&(W.textContent=`Gasto mínimo de R$ ${F.valorMinimo.toFixed(2)} necessário.`,W.style.color="#ef4444");return}se=F;const te=ye(G);W&&(W.textContent=`✓ Cupom aplicado! Desconto: R$ ${te.toFixed(2)}`,W.style.color="#10b981");const ne=document.getElementById("payment-order-summary");ne&&(ne.innerHTML=ke())},window.catToggleCoupon=()=>{const N=document.getElementById("cat-coupon-input-wrapper"),F=document.getElementById("cat-coupon-toggle-label");if(N){const G=N.style.display==="block";N.style.display=G?"none":"block",F&&(F.textContent=G?"Tenho um cupom de desconto":"Ocultar cupom")}},window.catFilterClassic=N=>{document.querySelectorAll(".cat-selector-item").forEach(G=>{const W=G.getAttribute("onclick")||"";G.classList.toggle("active",W.includes("'"+N+"'"))});const F=document.getElementById("classic-promo-section");N==="all"?(F&&(F.style.display=m.length>0?"block":"none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="block")):N==="promo"?(F&&(F.style.display="block"),document.querySelectorAll("[data-classic-cat]").forEach(G=>G.style.display="none")):(F&&(F.style.display="none"),document.querySelectorAll("[data-classic-cat]").forEach(G=>{G.style.display=G.dataset.classicCat===N?"block":"none"}))},window.catFilterCat=N=>{document.querySelectorAll(".cat-sidebar-link").forEach(W=>{W.classList.remove("active"),W.setAttribute("aria-pressed","false")});const F=document.querySelector(`.cat-sidebar-link[onclick*="'${N}'"]`);F&&(F.classList.add("active"),F.setAttribute("aria-pressed","true"));const G=N==="all";document.querySelectorAll("[data-catgroup]").forEach(W=>{W.style.display=G||W.dataset.catgroup===N?"":"none"})},window.catSearch=N=>{N=N.trim().toLowerCase(),document.querySelectorAll("[data-catgroup]").forEach(F=>{F.style.display=""}),N&&document.querySelectorAll(".product-card").forEach(F=>{const G=(F.querySelector("h3")?.textContent||"").toLowerCase();F.style.display=G.includes(N)?"":"none"})};const z=async(N,F)=>{const G=F.replace(/\D/g,"");let te=(await B.getAll("leads",[{field:"empresaId",operator:"==",value:i.id},{field:"whatsapp",operator:"==",value:G}]))[0];return te||(te=(await B.getAll("leads",[{field:"empresaId",operator:"==",value:i.id},{field:"telefone",operator:"==",value:G}]))[0]),te?(te.statusLead!=="cliente_ativo"&&await B.update("leads",te.id,{statusLead:"cliente_ativo"}),te.id):await B.create("leads",{nome:N,telefone:G,whatsapp:G,empresaId:i.id,lojaId:n,origem:"catalogo",statusLead:"cliente_ativo",criadoEm:new Date().toISOString()})};window.confirmOrderDelivery=async()=>{const N=document.getElementById("btn-pay-delivery");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...');try{const F=window.catCustomer;if(!F||!F.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),qe("payment-modal"),qe("pix-manual-modal"),it("customer-modal");return}const{name:G,phone:W,address:te}=F,ne=window.catDeliveryType,be=Array.from(P.entries()).map(([Fe,{product:Ce,qty:lt}])=>{const It=Ce.promotionalActive&&Ce.promotionalPrice||Ce.price;return{productId:Fe,name:Ce.name,qty:lt,price:It,subtotal:It*lt}});for(const[Fe,{qty:Ce}]of Array.from(P.entries())){const lt=f.find(It=>It.id===Fe);lt&&lt.stock!=null&&await B.update("products",Fe,{stock:Math.max(0,lt.stock-Ce)})}const He=ce(),We=le(),Et=ye(He),kt=He+We-Et,Pt=await z(G,W),Te={lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:G,clientPhone:W,endereco:te,bairro:F.bairro||"",entrega:ne,leadId:Pt,nome:G,items:be,total:kt,taxaAplicada:We,taxaNome:pe(),desconto:Et,codigoCupom:se?.codigo||null,paymentMethod:"na_entrega",pagamento:"na_entrega",status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()},Mt=await B.create("pedidos",Te);try{const{orderService:Fe}=await _s(async()=>{const{orderService:Ce}=await Promise.resolve().then(()=>lx);return{orderService:Ce}},void 0);await Fe.notifyNewOrder({id:Mt,...Te},i.id)}catch(Fe){console.error("Error in order notification:",Fe)}P.clear(),se=null,qe("payment-modal"),ve();const gt=document.getElementById("confirmation-modal"),Re=document.getElementById("order-id-display"),ze=document.getElementById("pix-info-section");gt&&(gt.style.display="flex"),Re&&(Re.textContent=Mt.slice(0,8).toUpperCase()),ze&&(ze.style.display="none"),ve()}catch(F){console.error("Confirm Order Delivery Error:",F),alert("Erro ao processar pedido: "+(F.message||"Erro desconhecido")+". Por favor, tente novamente ou fale com a loja."),N&&(N.disabled=!1,N.innerHTML="🤝 Pagar na Entrega / Retirada")}},window.showPixManual=()=>{qe("payment-modal");const N=document.getElementById("pix-manual-summary");N&&(N.innerHTML=ke());const F=document.getElementById("pix-key-value");F&&(F.textContent=v),it("pix-manual-modal")},window.closePixManual=()=>qe("pix-manual-modal"),window.copyPixKey=()=>{navigator.clipboard.writeText(v).then(()=>{const N=document.getElementById("btn-copy-pix");N&&(N.textContent="✓ Copiado!",setTimeout(()=>{N.textContent="Copiar"},2e3))})},window.confirmPixManual=async()=>{const N=document.getElementById("btn-confirm-pix-manual");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...');try{const F=window.catCustomer;if(!F||!F.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),qe("payment-modal"),qe("pix-manual-modal"),it("customer-modal");return}const{name:G,phone:W,address:te}=F,ne=window.catDeliveryType,be=Array.from(P.entries()).map(([Ce,{product:lt,qty:It}])=>{const Ot=lt.promotionalActive&&lt.promotionalPrice||lt.price;return{productId:Ce,name:lt.name,qty:It,price:Ot,subtotal:Ot*It}});let He="";const We=document.getElementById("pix-comprovante-input");if(We?.files?.[0]){const Ce=We.files[0],lt=Date.now(),It=`comprovantes/${i.id}/${lt}_${Ce.name}`,Ot=un(pn,It);await Ni(Ot,Ce),He=await oi(Ot)}for(const[Ce,{qty:lt}]of Array.from(P.entries())){const It=f.find(Ot=>Ot.id===Ce);It&&It.stock!=null&&await B.update("products",Ce,{stock:Math.max(0,It.stock-lt)})}const Et=ce(),kt=le(),Pt=ye(Et),Te=Et+kt-Pt,Mt=await z(G,W),gt=await B.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:G,clientPhone:W,endereco:te,bairro:F.bairro||"",entrega:ne,leadId:Mt,nome:G,items:be,total:Te,taxaAplicada:kt,taxaNome:pe(),desconto:Pt,codigoCupom:se?.codigo||null,paymentMethod:"pix_manual",pagamento:"pagamento_no_pix",comprovanteUrl:He,status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()});P.clear(),se=null,qe("pix-manual-modal"),ve();const Re=document.getElementById("confirmation-modal"),ze=document.getElementById("order-id-display");Re&&(Re.style.display="flex"),ze&&(ze.textContent=gt.slice(0,8).toUpperCase());const Fe=document.getElementById("pix-info-section");Fe&&(Fe.style.display="none"),ve()}catch(F){console.error("Confirm Pix Manual Error:",F),alert("Erro ao confirmar pedido: "+(F.message||"Erro de conexão/permissão")+". Tente novamente."),N&&(N.disabled=!1,N.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}},window.confirmPixMercadoPago=async()=>{const N=document.getElementById("btn-pay-pix-mp");N&&(N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...');try{const{name:F,phone:G,address:W}=window.catCustomer,te=window.catDeliveryType,ne=Array.from(P.entries()).map(([Re,{product:ze,qty:Fe}])=>{const Ce=ze.promotionalActive&&ze.promotionalPrice||ze.price;return{productId:Re,name:ze.name,qty:Fe,price:Ce,subtotal:Ce*Fe}}),be=ce(),He=le(),We=ye(be),Et=be+He-We,Pt=await fetch("https://n8n.vps.pequi.digital/webhook/autoqui-pix-catalog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:i.id,storeId:n,items:ne,total:Et,clientName:F,clientPhone:G,accessToken:i.mercadoPagoToken})}),Te=Pt.ok?await Pt.json():null;for(const[Re,{qty:ze}]of Array.from(P.entries())){const Fe=f.find(Ce=>Ce.id===Re);Fe&&Fe.stock!=null&&await B.update("products",Re,{stock:Math.max(0,Fe.stock-ze)})}const Mt=await z(F,G),gt=await B.create("pedidos",{lojaId:n,storeId:n,companyId:i.id,empresaId:i.id,clientName:F,clientPhone:G,endereco:W,entrega:te,leadId:Mt,nome:F,items:ne,total:Et,taxaAplicada:He,taxaNome:pe(),desconto:We,codigoCupom:se?.codigo||null,paymentMethod:"pix_mercadopago",pagamento:"pagamento_no_pix",mpPaymentId:Te?.payment_id||"",status:"em_montagem",source:"catalog",criadoEm:new Date().toISOString()});if(P.clear(),se=null,qe("payment-modal"),ve(),Te?.qr_code_base64||Te?.qr_code_text){const Re=document.getElementById("mp-qr-img"),ze=document.getElementById("mp-qr-code"),Fe=document.getElementById("mp-pix-summary");Re&&Te.qr_code_base64&&(Re.src=`data:image/png;base64,${Te.qr_code_base64}`,Re.style.display="block"),ze&&Te.qr_code_text&&(ze.textContent=Te.qr_code_text,window._mpQrCodeText=Te.qr_code_text),Fe&&(Fe.innerHTML=ke()),it("mp-pix-modal")}else{const Re=document.getElementById("confirmation-modal"),ze=document.getElementById("order-id-display");Re&&(Re.style.display="flex"),ze&&(ze.textContent=gt.slice(0,8).toUpperCase())}ve()}catch(F){console.error("Confirm Pix MP Error:",F),alert("Erro ao gerar PIX Mercado Pago: "+(F.message||"Erro de resposta")+". Tente novamente."),N&&(N.disabled=!1,N.innerHTML="⚡ Pagar via Mercado Pago (PIX)")}},window.closeMpPix=()=>qe("mp-pix-modal"),window.copyMpQrCode=()=>{const N=window._mpQrCodeText||"";navigator.clipboard.writeText(N).then(()=>{const F=document.getElementById("btn-copy-mp-qr");F&&(F.textContent="✓ Copiado!",setTimeout(()=>{F.textContent="Copiar código"},2e3))})},window.previewComprovante=N=>{const F=document.getElementById("comprovante-preview"),G=document.getElementById("comprovante-label");if(N.files?.[0]){const W=new FileReader;W.onload=te=>{F&&(F.src=te.target?.result,F.style.display="block"),G&&(G.textContent=N.files[0].name)},W.readAsDataURL(N.files[0])}}}const xt=(z,N=!1)=>{const F=N&&z.promotionalName||z.name,G=N&&z.promotionalPrice||z.price,W=N?z.price:null,te=z.stock===0;return o?`
                <div class="product-card" style="${te?"opacity:0.6;":""}">
                    <div class="card-image">
                        <img src="${L(z)}" alt="${F}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                        ${te?'<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${F}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                        ${z.stock!=null&&!te&&z.stock<=10?`<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${z.stock} restante${z.stock!==1?"s":""}</p>`:""}
                        <button id="btn-add-${z.id}" onclick="window.catAddToCart('${z.id}')" ${te?"disabled":""}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${te?"rgba(255,255,255,0.05)":"var(--primary-cat)"};color:${te?"#94a3b8":"white"};border:none;cursor:${te?"not-allowed":"pointer"};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${te?"Esgotado":"+ Adicionar"}
                        </button>
                    </div>
                </div>`:`
                <div class="product-card">
                    <div class="card-image">
                        <img src="${L(z)}" alt="${F}" loading="lazy">
                        ${N?'<div class="promo-tag">OFERTA</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${F}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${G?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                    </div>
                </div>`},ot="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;",Ze="background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;",Gt=(z,N)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${z}</h3>
                <button onclick="${N}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`,Jn=(z,N,F,G="")=>`<button id="${z}" onclick="${N}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${G}">${F}</button>`,Gi=o?`
            <!-- CART MODAL -->
            <div id="cart-modal" style="${ot}align-items:flex-end;overflow-y:auto;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${Gt('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho',"window.closeCart()")}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${Jn("btn-go-delivery","window.goToDelivery()",'<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${ot}">
                <div style="${Ze}">
                    ${Gt('<i class="fa-solid fa-box"></i> Como deseja receber?',"window.closeDelivery()")}
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
                    ${Jn("btn-go-customer","window.goToCustomer()",'<i class="fa-solid fa-arrow-right"></i> Continuar',"opacity:0.4;cursor:not-allowed;")}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${ot}">
                <div style="${Ze}max-height:90vh;overflow-y:auto;">
                    ${Gt('<i class="fa-solid fa-user"></i> Seus Dados',"window.closeCustomer()")}
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
                    ${Jn("btn-go-payment","window.goToPayment()","Escolher Pagamento →","margin-top:8px;")}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${ot}">
                <div style="${Ze}">
                    ${Gt('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento',"window.closePayment()")}
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
                    ${Gt('<i class="fa-brands fa-pix"></i> Pagamento via PIX',"window.closePixManual()")}
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
                    ${Jn("btn-confirm-pix-manual","window.confirmPixManual()",'<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${ot}">
                <div style="${Ze}max-height:90vh;overflow-y:auto;">
                    ${Gt('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago',"window.closeMpPix()")}
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
                    ${Gt('<i class="fa-solid fa-circle-info"></i> Informações da Loja',"window.closeStoreInfo()")}
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
                    --primary-cat: ${w};
                    --primary-glow: ${w}4D;
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
                        ${m.length>0?`<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${m.map(z=>xt(z,!0)).join("")}</div>`:""}
                        ${g.map(z=>`<div class="section-title"><i class="fa-solid ${z.icon||"fa-tag"}" aria-hidden="true"></i><span>${z.name}</span><div class="line"></div></div><div class="product-grid" role="list">${z.products.map(N=>xt(N,!1)).join("")}</div>`).join("")}
                        ${_.length>0?`<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${_.map(z=>xt(z,!1)).join("")}</div>`:""}
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
                                ${g.map(z=>`<button class="cat-sidebar-link" onclick="window.catFilterCat('${z.id}')"><i class="fa-solid ${z.icon||"fa-tag"}" aria-hidden="true"></i> ${z.name}</button>`).join("")}
                                ${_.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>`:""}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${m.length>0?`<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${m.map(z=>xt(z,!0)).join("")}</div>`:""}
                                ${g.map(z=>`<div class="section-title" data-catgroup="${z.id}"><i class="fa-solid ${z.icon||"fa-tag"}" aria-hidden="true"></i><span>${z.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${z.id}" role="list">${z.products.map(N=>xt(N,!1)).join("")}</div>`).join("")}
                                ${_.length>0?`<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${_.map(z=>xt(z,!1)).join("")}</div>`:""}
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
                                ${g.map(z=>`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${z.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${z.icon||"fa-tag"}"></i></div>
                                    <span class="cat-selector-label">${z.name}</span>
                                </button>`).join("")}
                                ${_.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>`:""}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${m.length>0?"":"display:none;"}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${m.map(z=>xt(z,!0)).join("")}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${g.map(z=>`
                                <div class="section-container-cat" data-classic-cat="${z.id}">
                                    <div class="section-title"><i class="fa-solid ${z.icon||"fa-tag"}" aria-hidden="true"></i><span>${z.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${z.products.map(N=>xt(N,!1)).join("")}</div>
                                </div>
                            `).join("")}
                            ${_.length>0?`
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${_.map(z=>xt(z,!1)).join("")}</div>
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
        `}catch(e){return console.error("Catalog Error:",e),"<p>Erro ao carregar catálogo.</p>"}},au=async n=>(setTimeout(()=>{const e=document.getElementById("remote-qrcode"),t=document.getElementById("qr-content-active"),i=document.getElementById("qr-content-success");if(!e)return;let a=null,s=null;const o=()=>{a&&clearInterval(a),s&&clearInterval(s)},l=async()=>{try{const b=await(await fetch(`${zt}/instance/connect/${n}`,{headers:{apikey:Ft}})).json();if(b&&(b.base64||b.qrcode?.base64)){const R=b.base64||b.qrcode.base64;e.innerHTML=`<img src="${R}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`}else{const M=await(await fetch(`${zt}/instance/connectionState/${n}`,{headers:{apikey:Ft}})).json();(M.instance?.state==="open"||M.state==="open")&&u()}}catch(w){console.error("Error fetching QR:",w)}},c=async()=>{try{const b=await(await fetch(`${zt}/instance/connectionState/${n}`,{headers:{apikey:Ft}})).json();(b.instance?.state==="open"||b.state==="open")&&u()}catch(w){console.error("Error checking status:",w)}},u=()=>{o(),t&&(t.style.display="none"),i&&(i.style.display="flex")};l(),a=setInterval(l,4e4),s=setInterval(c,3e3);const h=setInterval(()=>{document.getElementById("remote-qrcode")||(o(),clearInterval(h))},1e3)},100),`
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
    `),Dx=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!"},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!"},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue / Finalizado",icon:"fa-flag-checkered",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."},{key:"pedido_recebido",label:"Pedido Recebido (Aguardando Aprovação)",icon:"fa-clock",default:"Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳"}],$x=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],Hr=[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}],Nx=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,t=await B.get("companies",e);let i=t?.stores||[];const a=!!t?.mercadoPagoToken;if(n.role!=="owner"){const D=n.storeIds||(n.storeId?[n.storeId]:[]);i=i.filter(v=>D.includes(v.id))}if(i.length===0)return'<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>';const s=await B.getAll("instancias",{field:"empresaId",operator:"==",value:e}),o=await B.getAll("loja_config",{field:"empresaId",operator:"==",value:e});let l=i[0].id;const c=D=>o.find(v=>v.lojaId===D)||null,u=()=>`
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
        </div>`,h=()=>$x.map(D=>`
        <div class="var-chip" draggable="true" data-var="${D.key}" title="Clique para copiar">
            <i class="fa-solid ${D.icon}"></i>
            <span>${D.label}</span>
            <code>${D.key}</code>
        </div>
    `).join("");return setTimeout(()=>{w(),b()},100),`
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
    `;function w(){const D=()=>{document.querySelectorAll(".btn-store-tab").forEach(v=>{v.addEventListener("click",()=>{l=v.dataset.id;const k=document.getElementById("cat-tabs-container");k&&(k.innerHTML=u(),D()),b()})})};D()}function b(){const D=document.getElementById("cat-config-content-area");if(!D)return;const v=c(l),k=v?.design||{},S=v?.mensagens_automaticas||{},$=`${window.location.origin}/catalog/${l}`,C=v?.instancia_id||i.find(f=>f.id===l)?.instancia_id||"",T=(f,m)=>{const y=v?.[m]||{};return Hr.map(x=>{const E=y[x.key]||{},g=E.ativo??E.aberto??x.key!=="dom",_=E.inicio||E.abertura||"08:00",L=E.fim||E.fechamento||"18:00";return`
                <div class="horario-row ${g?"":"inactive"}" id="${f}-row-${x.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${f}-toggle" data-dia="${x.key}" ${g?"checked":""}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${x.label}</span>
                    </div>
                    <div class="horario-inputs ${g?"":"hidden"}" id="${f}-inputs-${x.key}">
                        <input type="time" class="time-input" id="${f}-open-${x.key}" value="${_}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${f}-close-${x.key}" value="${L}">
                    </div>
                    <div class="status-label" id="${f}-status-${x.key}" style="font-size:0.8rem;color:${g?"var(--success)":"var(--text-dim)"};min-width:70px;text-align:right;">
                        ${g?"Aberto":"Fechado"}
                    </div>
                </div>`}).join("")},A=Dx.map(f=>`
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
        `,setTimeout(()=>{R()},50)}function R(D){const v=i;document.getElementById("btn-copy-cat-link")?.addEventListener("click",()=>{const C=document.getElementById("cat-link-display");C?.value&&navigator.clipboard.writeText(C.value).then(()=>V.success("Link copiado!"))});const k=(C,T)=>{const A=document.getElementById(C),f=document.getElementById(T);A?.addEventListener("input",()=>{f&&(f.value=A.value)}),f?.addEventListener("input",()=>{A&&(A.value=f.value)})};k("cat-primary-color","cat-primary-color-hex"),k("cat-secondary-color","cat-secondary-color-hex"),k("cat-text-color","cat-text-color-hex"),k("cat-price-color","cat-price-color-hex"),k("cat-product-bg-color","cat-product-bg-color-hex"),document.getElementById("cat-logo-file")?.addEventListener("change",C=>{const T=C.target.files?.[0];if(T){const A=new FileReader;A.onload=f=>{const m=document.getElementById("cat-logo-preview-wrapper");m&&(m.innerHTML=`<img src="${f.target?.result}" style="width:100%;height:100%;object-fit:contain;">`)},A.readAsDataURL(T)}}),document.getElementById("cat-instance-select")?.addEventListener("change",async C=>{const T=C.target.value,A=v.map(f=>f.id===l?{...f,instancia_id:T||null}:f);try{V.info("Salvando instância..."),await B.update("companies",e,{stores:A});const f=v.find(x=>x.id===l);f&&(f.instancia_id=T);const m=c(l);if(m)await B.update("loja_config",m.id,{instancia_id:T||null}),m.instancia_id=T;else{const x=await B.create("loja_config",{empresaId:e,lojaId:l,instancia_id:T||null});o.push({id:x,empresaId:e,lojaId:l,instancia_id:T})}const y=await B.getAll("instancias",{field:"lojaId",operator:"==",value:l});for(const x of y)await B.update("instancias",x.id,{lojaId:null,funcao:null});T&&await B.update("instancias",T,{lojaId:l,funcao:"Catálogo Vendas"}),V.success("Instância vinculada com sucesso!")}catch(f){V.error("Erro ao salvar instância."),console.error(f)}}),window.catSelectTheme=C=>{const T=document.getElementById("cat-theme-id");T&&(T.value=C),document.querySelectorAll(".theme-card").forEach(f=>f.classList.remove("active")),document.querySelectorAll(".theme-card").forEach(f=>{f.getAttribute("onclick")?.includes(`'${C}'`)&&f.classList.add("active")})};const S=(C,T)=>{document.getElementById(C)?.addEventListener("change",A=>{const f=A.target.files?.[0];if(f){const m=new FileReader;m.onload=y=>{const x=document.getElementById(T);x&&(x.innerHTML=`<img src="${y.target?.result}" style="width:100%;height:100%;object-fit:cover;">`)},m.readAsDataURL(f)}})};S("cat-banner-desktop-file","banner-desktop-preview"),S("cat-banner-mobile-file","banner-mobile-preview"),document.getElementById("btn-save-cat-aparencia")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-aparencia");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=document.getElementById("cat-primary-color-hex").value,A=document.getElementById("cat-secondary-color-hex").value,f=document.getElementById("cat-text-color-hex").value,m=document.getElementById("cat-price-color-hex").value,y=document.getElementById("cat-product-bg-color-hex").value,x=document.getElementById("cat-theme-id")?.value||"classico",E=document.getElementById("cat-meta-description").value,g=document.getElementById("cat-logo-file").files?.[0],_=document.getElementById("cat-banner-desktop-file")?.files?.[0],L=document.getElementById("cat-banner-mobile-file")?.files?.[0],P=c(l);let K=P?.design?.logoUrl||"",j=P?.design?.bannerUrl||"",Q=P?.design?.bannerMobileUrl||"";if(g){const X=un(pn,`logos/${e}/${l}_logo`);await Ni(X,g),K=await oi(X)}if(_){const X=un(pn,`banners/${e}/${l}_desktop`);await Ni(X,_),j=await oi(X)}if(L){const X=un(pn,`banners/${e}/${l}_mobile`);await Ni(X,L),Q=await oi(X)}const J={...P?.design||{},primaryColor:T,secondaryColor:A,textColor:f,priceColor:m,productBgColor:y,logoUrl:K,themeId:x,bannerUrl:j,bannerMobileUrl:Q,metaDescription:E};await M({design:J}),V.success("Aparência salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar aparência."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'}}),document.getElementById("btn-save-cat-func")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-func");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};Hr.forEach(({key:A})=>{const f=document.querySelector(`.func-toggle[data-dia="${A}"]`)?.checked,m=document.getElementById(`func-open-${A}`)?.value||"08:00",y=document.getElementById(`func-close-${A}`)?.value||"18:00";T[A]={ativo:f,inicio:m,fim:y}}),await M({horario_funcionamento:T}),V.success("Horários de funcionamento salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar horários."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.getElementById("btn-save-cat-entrega")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-entrega");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T={};Hr.forEach(({key:A})=>{const f=document.querySelector(`.entrega-toggle[data-dia="${A}"]`)?.checked,m=document.getElementById(`entrega-open-${A}`)?.value||"08:00",y=document.getElementById(`entrega-close-${A}`)?.value||"18:00";T[A]={ativo:f,inicio:m,fim:y}}),await M({horario_entrega:T}),V.success("Horários de entrega salvos!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar horários de entrega."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".cat-save-single-msg").forEach(C=>{C.addEventListener("click",async()=>{const T=C.dataset.msgKey,A=document.getElementById(`cat-msg-${T}`)?.value||"",y={...c(l)?.mensagens_automaticas||{},[T]:A};try{C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>',await M({mensagens_automaticas:y}),V.success("Mensagem salva!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar mensagem."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})}),document.querySelectorAll(".var-chip").forEach(C=>{C.addEventListener("dragstart",T=>{T.dataTransfer?.setData("text/plain",C.dataset.var||"")}),C.addEventListener("click",()=>{navigator.clipboard.writeText(C.dataset.var||"").then(()=>V.info("Variável copiada!"))})}),document.querySelectorAll(".msg-textarea").forEach(C=>{C.addEventListener("dragover",T=>T.preventDefault()),C.addEventListener("drop",T=>{T.preventDefault();const A=T.dataTransfer?.getData("text/plain")||"",f=C,m=f.selectionStart,y=f.selectionEnd;f.value=f.value.substring(0,m)+A+f.value.substring(y),f.selectionStart=f.selectionEnd=m+A.length,f.focus()})}),document.getElementById("btn-save-cat-pagamento")?.addEventListener("click",async()=>{const C=document.getElementById("btn-save-cat-pagamento");C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const T=c(l),A=document.getElementById("cat-whatsapp").value.replace(/\D/g,""),f=document.getElementById("cat-pix-key").value.trim(),m=document.getElementById("mp-active-toggle")?.checked,y=document.getElementById("cat-mandatory-pickup-pay")?.checked,x={...T?.design||{},whatsapp:A,pixKey:f};delete x.taxaFixaNome,delete x.taxaFixaValor,delete x.taxaTipo,await M({design:x,mercadoPagoActive:m,pagamentoObrigatorioRetirada:y}),V.success("Configurações de pagamento salvas!"),C.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',C.classList.add("saved"),setTimeout(()=>{C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento',C.classList.remove("saved")},2e3)}catch{V.error("Erro ao salvar pagamento."),C.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'}}),document.getElementById("btn-add-cupom")?.addEventListener("click",async()=>{const C=(document.getElementById("new-cupom-code").value||"").trim().toUpperCase(),T=parseFloat(document.getElementById("new-cupom-valor").value||"0"),A=document.getElementById("new-cupom-tipo").value||"percent",f=parseFloat(document.getElementById("new-cupom-min").value||"0")||0;if(!C||!T){V.error("Preencha código e valor do cupom.");return}const y=[...c(l)?.cupons||[],{codigo:C,desconto:T,tipo:A,valorMinimo:f,ativo:!0}];await M({cupons:y}),V.success(`Cupom ${C} adicionado!`),b()}),window.catDeleteCupom=async C=>{const A=[...c(l)?.cupons||[]].filter((f,m)=>m!==C);await M({cupons:A}),V.success("Cupom removido."),b()},document.getElementById("btn-add-bairro")?.addEventListener("click",async()=>{const C=(document.getElementById("new-bairro-nomes").value||"").trim(),T=document.getElementById("new-bairro-preco").value,A=parseFloat(T||"0");if(!C){V.error("Preencha os bairros.");return}if(!T){V.error("Preencha o valor da taxa para estes bairros.");return}const m=[...c(l)?.bairrosEntrega||[],{bairros:C,preco:A}];await M({bairrosEntrega:m}),V.success("Bairro(s) adicionado(s)!"),b()}),window.catDeleteBairro=async C=>{const A=[...c(l)?.bairrosEntrega||[]].filter((f,m)=>m!==C);await M({bairrosEntrega:A}),V.success("Bairro(s) removido(s)."),b()};const $=(C,T,A,f)=>{document.querySelectorAll(`.${C}`).forEach(m=>{m.addEventListener("change",()=>{const y=m.dataset.dia,x=m.checked;document.getElementById(`${T}-row-${y}`)?.classList.toggle("inactive",!x),document.getElementById(`${T}-inputs-${y}`)?.classList.toggle("hidden",!x);const E=document.getElementById(`${T}-status-${y}`);E&&(E.innerText=x?A:f,E.style.color=x?"var(--success)":"var(--text-dim)")})})};$("func-toggle","func","Aberto","Fechado"),$("entrega-toggle","entrega","Disponível","Indisponível")}async function M(D){const v=c(l);if(v)await B.update("loja_config",v.id,D),Object.assign(v,D);else{const k=await B.create("loja_config",{empresaId:e,lojaId:l,...D});o.push({id:k,empresaId:e,lojaId:l,...D})}}},Mx=()=>`
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
    `,Ox=async()=>{const n=Ae.getCurrentUser(),e=n?.role?.toLowerCase()==="admin"||n?.email==="ginannymoreira@gmail.com";if(!n||!e)return"<p>Acesso negado.</p>";const a=(await B.getAll("companies")).flatMap(o=>(o.stores||[]).map(l=>({...l,companyName:o.name,companyId:o.id}))),s=()=>a.map(o=>`<option value="${o.id}" data-company-id="${o.companyId}">${o.name} (${o.companyName})</option>`).join("");return window.performMigration=async()=>{const o=document.getElementById("migration-source-store"),l=document.getElementById("migration-target-store"),c=o.value,u=o.selectedOptions[0]?.dataset.companyId,h=l.value,w=l.selectedOptions[0]?.dataset.companyId;if(!c||!h){V.warning("Selecione as lojas de origem e destino.");return}if(c===h){V.warning("A loja de origem e destino não podem ser a mesma.");return}if(!await Xe.warning("Confirmar Migração","Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?"))return;const R=document.getElementById("btn-run-migration");R.disabled=!0,R.innerHTML='<div class="spinner-small"></div> Migrando...';try{const D=(await B.getAll("products",{field:"companyId",operator:"==",value:u})).filter(k=>k.storeIds&&k.storeIds.includes(c)||k.storeId===c);if(D.length===0){V.info("Nenhum produto encontrado na loja de origem."),R.disabled=!1,R.innerText="Iniciar Migração";return}let v=0;for(const k of D){const{id:S,...$}=k;$.companyId=w,$.storeIds=[h],delete $.lojaId,delete $.createdAt,await B.create("products",$),v++}V.success(`${v} produtos migrados com sucesso!`)}catch(M){console.error(M),V.error("Erro durante a migração: "+M)}finally{R.disabled=!1,R.innerText="Iniciar Migração"}},`
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
    `};class Vx{appElement;constructor(){this.appElement=document.getElementById("app"),this.init()}init(){let e=null;Ae.subscribe(t=>{this.render(),t?t.uid!==e&&(e=t.uid,eu.startListening()):(e=null,eu.stopListening())}),this.handleRouting(),window.addEventListener("render-app",()=>this.render())}handleRouting(){window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",e=>{const i=e.target.closest("a");if(i&&i.getAttribute("href")?.startsWith("/")){e.preventDefault();const a=i.getAttribute("href");window.location.pathname!==a&&(history.pushState(null,"",a),this.render())}}),document.addEventListener("submit",async e=>{if(e.target.id==="login-form"){e.preventDefault();const i=document.getElementById("email").value,a=document.getElementById("password").value;try{await Ae.login(i,a)}catch(s){V.error("Erro ao fazer login: "+s)}}}),document.addEventListener("click",async e=>{e.target.closest("#logout-btn")&&(history.replaceState(null,"","/"),await Ae.logout())})}async render(){const e=window.location.pathname,t=Ae.getCurrentUser();if(e==="/"){this.appElement.innerHTML=Mx();const o=this.appElement.querySelector(".lp-btn-login")||this.appElement.querySelector(".lp-btn-primary");t&&o&&(o.textContent="Dashboard",o.setAttribute("href",t.role==="admin"?"/admin/dashboard":"/dashboard"));return}if(!t){if(e.startsWith("/catalog/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await iu(o);return}if(e.startsWith("/qr/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await au(o);return}e!=="/login"&&history.replaceState(null,"","/login"),this.appElement.innerHTML=`<div id="page-content" class="login-page-container">${fx()}</div>`;return}if(e==="/login"){const o=t.role==="admin"?"/admin/dashboard":"/dashboard";history.replaceState(null,"",o),this.render();return}if(e.startsWith("/catalog/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await iu(o);return}if(e.startsWith("/qr/")){const o=e.split("/").pop()||"";this.appElement.innerHTML=await au(o);return}if(!this.isRouteAllowed(e,t.role)){this.appElement.innerHTML="<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>";return}const i=await this.getPageTitle(e);let a;t.role==="admin"?a=fm:t.role==="employee"?a=tx:a=ex;const s=await a();this.appElement.innerHTML=`
            <div class="app-container">
                ${s}
                <main class="main-content">
                    ${nx(i)}
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
            `)}this.updateActiveLinks(),this.updateOrderCounter()}isRouteAllowed(e,t){return t==="admin"?e.startsWith("/admin"):!e.startsWith("/admin")}async getPageTitle(e){if(e==="/products"){const t=Ae.getCurrentUser();if(t?.companyId)try{const{dbService:i}=await _s(async()=>{const{dbService:o}=await Promise.resolve().then(()=>X_);return{dbService:o}},void 0);if(((await i.get("companies",t.companyId))?.modulos_ativos||[]).includes("agendamento"))return"Serviços"}catch{}return"Produtos"}switch(e){case"/":case"/dashboard":case"/admin/dashboard":return"Dashboard";case"/orders":return"Pedidos";case"/stores":return"Lojas";case"/leads":return"Leads";case"/users":case"/admin/users":return"Usuários";case"/admin/ai-config":return"Configuração IA";case"/companies":case"/admin/companies":return"Gestão de Clientes";case"/instances":return"Instâncias";case"/configuration":return"Configurações";case"/campaigns":return"Campanhas";case"/schedule":return"Agenda";case"/schedule-clients":return"Clientes";case"/admin/webhooks":return"Configuração de Webhooks";case"/admin/migration":return"Migração de Produtos";case"/mercado-pago":return"Mercado Pago";case"/catalog-settings":return"Configuração";default:return"Página não encontrada"}}async getPageContent(e){switch(e){case"/":case"/dashboard":case"/admin/dashboard":return ax();case"/orders":return dx();case"/products":return await ux();case"/stores":return await px();case"/leads":return await Ix();case"/users":return Ae.getCurrentUser()?.role==="admin"?Zd():hx();case"/admin/users":return Zd();case"/admin/ai-config":return mx();case"/companies":case"/admin/companies":return await gx();case"/instances":return yx();case"/configuration":return wx();case"/campaigns":return Ax();case"/schedule":return Sx();case"/schedule-clients":return Px();case"/admin/webhooks":return await Rx();case"/admin/migration":return await Ox();case"/mercado-pago":return await Lx();case"/catalog-settings":return await Nx();default:return"<h1>404</h1><p>Página não encontrada.</p>"}}updateActiveLinks(){const e=window.location.pathname;document.querySelectorAll(".nav-item").forEach(i=>{i.getAttribute("href")===e?i.classList.add("active"):i.classList.remove("active")})}async updateOrderCounter(){const e=Ae.getCurrentUser();if(!(!e||!e.companyId||e.role==="admin"))try{const t=e.storeIds||(e.storeId?[e.storeId]:[]),i=await Ln.getOpenOrdersCount(e.companyId,e.role==="owner"?[]:t),a=document.getElementById("orders-count-badge");a&&(a.textContent=i.toString(),i>0?a.classList.remove("hidden"):a.classList.add("hidden"))}catch(t){console.error("Error updating order counter:",t)}}}new Vx;
