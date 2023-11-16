(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=window,K=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),F=new WeakMap;let lt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(K&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=F.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&F.set(e,t))}return t}toString(){return this.cssText}};const _t=o=>new lt(typeof o=="string"?o:o+"",void 0,Z),at=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new lt(e,o,Z)},mt=(o,t)=>{K?o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=U.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)})},G=K?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return _t(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const N=window,Q=N.trustedTypes,yt=Q?Q.emptyScript:"",X=N.reactiveElementPolyfillSupport,I={toAttribute(o,t){switch(t){case Boolean:o=o?yt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ht=(o,t)=>t!==o&&(t==t||o==o),M={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:ht},V="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=M){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||M}static finalize(){if(this.hasOwnProperty(V))return!1;this[V]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(G(s))}else t!==void 0&&e.push(G(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return mt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=M){var s;const n=this.constructor._$Ep(t,i);if(n!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:I).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(n!==void 0&&this._$El!==n){const r=s.getPropertyOptions(n),h=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:I;this._$El=n,this[n]=h.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ht)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,n)=>this[n]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};m[V]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},X==null||X({ReactiveElement:m}),((L=N.reactiveElementVersions)!==null&&L!==void 0?L:N.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var R;const k=window,A=k.trustedTypes,Y=A?A.createPolicy("lit-html",{createHTML:o=>o}):void 0,W="$lit$",f=`lit$${(Math.random()+"").slice(9)}$`,dt="?"+f,At=`<${dt}>`,_=document,w=()=>_.createComment(""),C=o=>o===null||typeof o!="object"&&typeof o!="function",ct=Array.isArray,bt=o=>ct(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",z=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,$=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),it=/'/g,st=/"/g,ut=/^(?:script|style|textarea|title)$/i,Et=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),pt=Et(1),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ot=new WeakMap,g=_.createTreeWalker(_,129,null,!1);function vt(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Y!==void 0?Y.createHTML(t):t}const St=(o,t)=>{const e=o.length-1,i=[];let s,n=t===2?"<svg>":"",r=S;for(let h=0;h<e;h++){const l=o[h];let a,d,c=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===S?d[1]==="!--"?r=tt:d[1]!==void 0?r=et:d[2]!==void 0?(ut.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=$):d[3]!==void 0&&(r=$):r===$?d[0]===">"?(r=s??S,c=-1):d[1]===void 0?c=-2:(c=r.lastIndex-d[2].length,a=d[1],r=d[3]===void 0?$:d[3]==='"'?st:it):r===st||r===it?r=$:r===tt||r===et?r=S:(r=$,s=void 0);const v=r===$&&o[h+1].startsWith("/>")?" ":"";n+=r===S?l+At:c>=0?(i.push(a),l.slice(0,c)+W+l.slice(c)+f+v):l+f+(c===-2?(i.push(void 0),h):v)}return[vt(o,n+(o[e]||"<?>")+(t===2?"</svg>":"")),i]};class x{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const h=t.length-1,l=this.parts,[a,d]=St(t,e);if(this.el=x.createElement(a,i),g.currentNode=this.el.content,e===2){const c=this.el.content,p=c.firstChild;p.remove(),c.append(...p.childNodes)}for(;(s=g.nextNode())!==null&&l.length<h;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const p of s.getAttributeNames())if(p.endsWith(W)||p.startsWith(f)){const v=d[r++];if(c.push(p),v!==void 0){const gt=s.getAttribute(v.toLowerCase()+W).split(f),H=/([.?@])?(.*)/.exec(v);l.push({type:1,index:n,name:H[2],strings:gt,ctor:H[1]==="."?Ct:H[1]==="?"?Pt:H[1]==="@"?Ot:T})}else l.push({type:6,index:n})}for(const p of c)s.removeAttribute(p)}if(ut.test(s.tagName)){const c=s.textContent.split(f),p=c.length-1;if(p>0){s.textContent=A?A.emptyScript:"";for(let v=0;v<p;v++)s.append(c[v],w()),g.nextNode(),l.push({type:2,index:++n});s.append(c[p],w())}}}else if(s.nodeType===8)if(s.data===dt)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(f,c+1))!==-1;)l.push({type:7,index:n}),c+=f.length-1}n++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function E(o,t,e=o,i){var s,n,r,h;if(t===b)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const a=C(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(o),l._$AT(o,e,i)),i!==void 0?((r=(h=e)._$Co)!==null&&r!==void 0?r:h._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=E(o,l._$AS(o,t.values),l,i)),t}class wt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:_).importNode(i,!0);g.currentNode=n;let r=g.nextNode(),h=0,l=0,a=s[0];for(;a!==void 0;){if(h===a.index){let d;a.type===2?d=new O(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Ht(r,this,t)),this._$AV.push(d),a=s[++l]}h!==(a==null?void 0:a.index)&&(r=g.nextNode(),h++)}return g.currentNode=_,n}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class O{constructor(t,e,i,s){var n;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(n=s==null?void 0:s.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),C(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):bt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(_.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=x.createElement(vt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(i);else{const r=new wt(n,this),h=r.u(this.options);r.v(i),this.$(h),this._$AH=r}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new x(t)),e}T(t){ct(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new O(this.k(w()),this.k(w()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class T{constructor(t,e,i,s,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(n===void 0)t=E(this,t,e,0),r=!C(t)||t!==this._$AH&&t!==b,r&&(this._$AH=t);else{const h=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=E(this,h[i+l],e,l),a===b&&(a=this._$AH[l]),r||(r=!C(a)||a!==this._$AH[l]),a===u?t=u:t!==u&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}r&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const xt=A?A.emptyScript:"";class Pt extends T{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,xt):this.element.removeAttribute(this.name)}}class Ot extends T{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=(i=E(this,t,e,0))!==null&&i!==void 0?i:u)===b)return;const s=this._$AH,n=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==u&&(s===u||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const nt=k.litHtmlPolyfillSupport;nt==null||nt(x,O),((R=k.litHtmlVersions)!==null&&R!==void 0?R:k.litHtmlVersions=[]).push("2.8.0");const Ut=(o,t,e)=>{var i,s;const n=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=n._$litPart$;if(r===void 0){const h=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=r=new O(t.insertBefore(w(),h),h,void 0,e??{})}return r._$AI(o),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var j,D;class y extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return b}}y.finalized=!0,y._$litElement$=!0,(j=globalThis.litElementHydrateSupport)===null||j===void 0||j.call(globalThis,{LitElement:y});const rt=globalThis.litElementPolyfillSupport;rt==null||rt({LitElement:y});((D=globalThis.litElementVersions)!==null&&D!==void 0?D:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=o=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(o,t):((e,i)=>{const{kind:s,elements:n}=i;return{kind:s,elements:n,finisher(r){customElements.define(e,r)}}})(o,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,o)}},kt=(o,t,e)=>{t.constructor.createProperty(e,o)};function $t(o){return(t,e)=>e!==void 0?kt(o,t,e):Nt(o,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;((B=window.HTMLSlotElement)===null||B===void 0?void 0:B.prototype.assignedElements)!=null;const Tt="/assets/react-35ef61ed.svg",Lt="/assets/tauri-3f32698a.svg",Mt="/assets/lit-c8dae599.svg",Rt="/assets/cluster-38d692d0.svg";var zt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,J=(o,t,e,i)=>{for(var s=i>1?void 0:i?jt(t,e):t,n=o.length-1,r;n>=0;n--)(r=o[n])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&zt(t,e,s),s};let P=class extends y{constructor(){super(...arguments),this.docsHint="Managing cluster of apps has never been easier !",this.count=0}render(){return pt`
      <div class="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src=${Tt} class="logo react" alt="React logo" />
        </a>
        <a href="https://vcluster.dev" target="_blank">
          <img src=${Rt} class="logo vcluster" alt="Vcluster logo" />
        </a>
        <a href="https://tauri.dev" target="_blank">
          <img src=${Lt} class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${Mt} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          See detials on official website
        </button>
      </div>
      <div class="loading-wrapper">
        <loading-live></loading-live>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `}_onClick(){this.count++}};P.styles=at`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vcluster {
      animation: vcluster-logo-spin infinite 20s linear;
    }
    .logo.vcluster:hover {
      filter: drop-shadow(0 0 2em #7892fbaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      margin-top: 2em;
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }

    @keyframes vcluster-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .logos .logo {
      animation: logo-beat 10s infinite linear,
        vcluster-logo-spin infinite 20s linear;
    }

    .logos {
      .logo.react {
        animation-delay: 0s;
      }
      .logo.vcluster {
        animation-delay: -2.5s;
      }
      .logo.tauri {
        animation-delay: -5s;
      }
      .logo.lit {
        animation-delay: -7.5s;
      }
    }

    @keyframes logo-beat {
      50% {
        scale: 0.75;
        opacity: 0.2;
      }

      100% {
        opacity: 1;
        scale: 1;
      }
    }

    .loading-wrapper {
      display: flex;
      justify-content: center;
    }
  `;J([$t()],P.prototype,"docsHint",2);J([$t({type:Number})],P.prototype,"count",2);P=J([ft("splash-screen")],P);var Dt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,It=(o,t,e,i)=>{for(var s=i>1?void 0:i?Bt(t,e):t,n=o.length-1,r;n>=0;n--)(r=o[n])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&Dt(t,e,s),s};let q=class extends y{render(){return pt`
      <div class="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}};q.styles=at`
    .loading,
    .loading > div {
      position: relative;
      box-sizing: border-box;
    }

    .loading {
      display: block;
      font-size: 0;
      color: #818181;
    }

    .loading.la-dark {
      color: #333;
    }

    .loading > div {
      display: inline-block;
      float: none;
      background-color: currentColor;
      border: 0 solid currentColor;
    }

    .loading {
      width: 32px;
      height: 32px;
    }

    .loading > div:nth-child(1) {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      width: 60%;
      height: 60%;
      background: #888888;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      animation: ball-atom-shrink 4.5s infinite linear;
    }

    .loading > div:not(:nth-child(1)) {
      position: absolute;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: none;
      animation: ball-atom-zindex 1.5s 0s infinite steps(2, end);
    }

    .loading > div:not(:nth-child(1)):before {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      margin-top: -5px;
      margin-left: -5px;
      content: "";
      background: currentColor;
      border-radius: 50%;
      opacity: 0.75;
      animation: ball-atom-position 1.5s 0s infinite ease,
        ball-atom-size 1.5s 0s infinite ease;
    }

    .loading > div:nth-child(2) {
      animation-delay: 0.75s;
    }

    .loading > div:nth-child(2):before {
      animation-delay: 0s, -1.125s;
    }

    .loading > div:nth-child(3) {
      transform: rotate(120deg);
      animation-delay: -0.25s;
    }

    .loading > div:nth-child(3):before {
      animation-delay: -1s, -0.75s;
    }

    .loading > div:nth-child(4) {
      transform: rotate(240deg);
      animation-delay: 0.25s;
    }

    .loading > div:nth-child(4):before {
      animation-delay: -0.5s, -0.125s;
    }

    @keyframes ball-atom-position {
      50% {
        top: 100%;
        left: 100%;
      }
    }
  `;q=It([ft("loading-live")],q);
