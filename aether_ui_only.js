
<script data-mod="tailwind">
/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /npm/@tailwindcss/browser@4.3.0/dist/index.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";(()=>{function e(e){let t=[0];for(let r=0;r<e.length;r++)10===e.charCodeAt(r)&&t.push(r+1);return{find:function(e){let r=0,n=t.length;for(;n>0;){let o=n>>1,a=r+o;t[a]<=e?(r=a+1,n=n-o-1):n=o}return r-=1,{line:r+1,column:e-t[r]}},findOffset:function({line:e,column:r}){e-=1,e=Math.min(Math.max(e,0),t.length-1);let n=t[e],o=t[e+1]??n;return Math.min(Math.max(n+r,0),o)}}}var t=10,r=class t extends Error{loc;constructor(r,n){if(n){let t=n[0],o=e(t.code).find(n[1]);r=`${t.file}:${o.line}:${o.column+1}: ${r}`}super(r),this.name="CssSyntaxError",this.loc=n,Error.captureStackTrace&&Error.captureStackTrace(this,t)}};function n(e,n){let l=n?.from?{file:n.from,code:e}:null;"\ufeff"===e[0]&&(e=" "+e.slice(1));let s,c=[],u=[],d=[],f=null,p=null,h="",m="",g=0;for(let n=0;n<e.length;n++){let v=e.charCodeAt(n);if(13!==v||(s=e.charCodeAt(n+1),s!==t))if(92===v)""===h&&(g=n),h+=e.slice(n,n+2),n+=1;else if(47===v&&42===e.charCodeAt(n+1)){let t=n;for(let t=n+2;t<e.length;t++)if(s=e.charCodeAt(t),92===s)t+=1;else if(42===s&&47===e.charCodeAt(t+1)){n=t+1;break}let r=e.slice(t,n+1);if(33===r.charCodeAt(2)){let e=T(r.slice(2,-2));u.push(e),l&&(e.src=[l,t,n+1],e.dst=[l,t,n+1])}}else if(39===v||34===v){let t=i(e,n,v,l);h+=e.slice(n,t+1),n=t}else{if((32===v||v===t||9===v)&&(s=e.charCodeAt(n+1))&&(32===s||s===t||9===s||13===s&&(s=e.charCodeAt(n+2))&&s==t))continue;if(v===t){if(0===h.length)continue;s=h.charCodeAt(h.length-1),32!==s&&s!==t&&9!==s&&(h+=" ")}else if(45===v&&45===e.charCodeAt(n+1)&&0===h.length){let t="",o=n,u=-1;for(let r=n+2;r<e.length;r++)if(s=e.charCodeAt(r),92===s)r+=1;else if(39===s||34===s)r=i(e,r,s,l);else if(47===s&&42===e.charCodeAt(r+1)){for(let t=r+2;t<e.length;t++)if(s=e.charCodeAt(t),92===s)t+=1;else if(42===s&&47===e.charCodeAt(t+1)){r=t+1;break}}else if(-1===u&&58===s)u=h.length+r-o;else{if(59===s&&0===t.length){h+=e.slice(o,r),n=r;break}if(40===s)t+=")";else if(91===s)t+="]";else if(123===s)t+="}";else{if((125===s||e.length-1===r)&&0===t.length){n=r-1,h+=e.slice(o,r);break}(41===s||93===s||125===s)&&t.length>0&&e[r]===t[t.length-1]&&(t=t.slice(0,-1))}}let d=a(h,u);if(!d)throw new r("Invalid custom property, expected a value",l?[l,o,n]:null);l&&(d.src=[l,o,n],d.dst=[l,o,n]),f?f.nodes.push(d):c.push(d),h=""}else if(59===v&&64===h.charCodeAt(0))p=o(h),l&&(p.src=[l,g,n],p.dst=[l,g,n]),f?f.nodes.push(p):c.push(p),h="",p=null;else if(59===v&&")"!==m[m.length-1]){let e=a(h);if(!e){if(0===h.length)continue;throw new r(`Invalid declaration: \`${h.trim()}\``,l?[l,g,n]:null)}l&&(e.src=[l,g,n],e.dst=[l,g,n]),f?f.nodes.push(e):c.push(e),h=""}else if(123===v&&")"!==m[m.length-1])m+="}",p=C(h.trim()),l&&(p.src=[l,g,n],p.dst=[l,g,n]),f&&f.nodes.push(p),d.push(f),f=p,h="",p=null;else if(125===v&&")"!==m[m.length-1]){if(""===m)throw new r("Missing opening {",l?[l,n,n]:null);if(m=m.slice(0,-1),h.length>0)if(64===h.charCodeAt(0))p=o(h),l&&(p.src=[l,g,n],p.dst=[l,g,n]),f?f.nodes.push(p):c.push(p),h="",p=null;else{let e=h.indexOf(":");if(f){let t=a(h,e);if(!t)throw new r(`Invalid declaration: \`${h.trim()}\``,l?[l,g,n]:null);l&&(t.src=[l,g,n],t.dst=[l,g,n]),f.nodes.push(t)}}let e=d.pop()??null;null===e&&f&&c.push(f),f=e,h="",p=null}else if(40===v)m+=")",h+="(";else if(41===v){if(")"!==m[m.length-1])throw new r("Missing opening (",l?[l,n,n]:null);m=m.slice(0,-1),h+=")"}else{if(0===h.length&&(32===v||v===t||9===v))continue;""===h&&(g=n),h+=String.fromCharCode(v)}}}if(64===h.charCodeAt(0)){let t=o(h);l&&(t.src=[l,g,e.length],t.dst=[l,g,e.length]),c.push(t)}if(m.length>0&&f){if("rule"===f.kind)throw new r(`Missing closing } at ${f.selector}`,f.src?[f.src[0],f.src[1],f.src[1]]:null);if("at-rule"===f.kind)throw new r(`Missing closing } at ${f.name} ${f.params}`,f.src?[f.src[0],f.src[1],f.src[1]]:null)}return u.length>0?u.concat(c):c}function o(e,t=[]){let r=e,n="";for(let t=5;t<e.length;t++){let o=e.charCodeAt(t);if(32===o||9===o||40===o){r=e.slice(0,t),n=e.slice(t);break}}return S(r.trim(),n.trim(),t)}function a(e,t=e.indexOf(":")){if(-1===t)return null;let r=e.indexOf("!important",t+1);return j(e.slice(0,t).trim(),e.slice(t+1,-1===r?e.length:r).trim(),-1!==r)}function i(e,n,o,a=null){let i;for(let l=n+1;l<e.length;l++)if(i=e.charCodeAt(l),92===i)l+=1;else{if(i===o)return l;if(59===i&&(e.charCodeAt(l+1)===t||13===e.charCodeAt(l+1)&&e.charCodeAt(l+2)===t))throw new r(`Unterminated string: ${e.slice(n,l+1)+String.fromCharCode(o)}`,a?[a,n,l+1]:null);if(i===t||13===i&&e.charCodeAt(l+1)===t)throw new r(`Unterminated string: ${e.slice(n,l)+String.fromCharCode(o)}`,a?[a,n,l+1]:null)}return n}function l(e){if(0===arguments.length)throw new TypeError("`CSS.escape` requires an argument.");let t,r=String(e),n=r.length,o=-1,a="",i=r.charCodeAt(0);if(1===n&&45===i)return"\\"+r;for(;++o<n;)t=r.charCodeAt(o),a+=0!==t?t>=1&&t<=31||127===t||0===o&&t>=48&&t<=57||1===o&&t>=48&&t<=57&&45===i?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?r.charAt(o):"\\"+r.charAt(o):"ï¿½";return a}function s(e){return e.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g,(e=>{if(e.length<=2)return e[1];let t=Number.parseInt(e.slice(1).trim(),16);return 0===t||t>1114111||t>=55296&&t<=57343?"ï¿½":String.fromCodePoint(t)}))}var c=new Map([["--font",["--font-weight","--font-size"]],["--inset",["--inset-shadow","--inset-ring"]],["--text",["--text-color","--text-decoration-color","--text-decoration-thickness","--text-indent","--text-shadow","--text-underline-offset"]],["--grid-column",["--grid-column-start","--grid-column-end"]],["--grid-row",["--grid-row-start","--grid-row-end"]]]);function u(e,t){return(c.get(t)??[]).some((t=>e===t||e.startsWith(`${t}-`)))}var d=class{constructor(e=new Map,t=new Set([])){this.values=e,this.keyframes=t}prefix=null;get size(){return this.values.size}add(e,t,r=0,n){if(e.endsWith("-*")){if("initial"!==t)throw new Error(`Invalid theme value \`${t}\` for namespace \`${e}\``);"--*"===e?this.values.clear():this.clearNamespace(e.slice(0,-2),0)}if(4&r){let t=this.values.get(e);if(t&&!(4&t.options))return}"initial"===t?this.values.delete(e):this.values.set(e,{value:t,options:r,src:n})}keysInNamespaces(e){let t=[];for(let r of e){let e=`${r}-`;for(let n of this.values.keys())n.startsWith(e)&&-1===n.indexOf("--",2)&&(u(n,r)||t.push(n.slice(e.length)))}return t}get(e){for(let t of e){let e=this.values.get(t);if(e)return e.value}return null}hasDefault(e){return!(4&~this.getOptions(e))}getOptions(e){return e=s(this.#e(e)),this.values.get(e)?.options??0}entries(){return this.prefix?Array.from(this.values,(e=>(e[0]=this.prefixKey(e[0]),e))):this.values.entries()}prefixKey(e){return this.prefix?`--${this.prefix}-${e.slice(2)}`:e}#e(e){return this.prefix?`--${e.slice(3+this.prefix.length)}`:e}clearNamespace(e,t){let r=c.get(e)??[];e:for(let n of this.values.keys())if(n.startsWith(e)){if(0!==t&&(this.getOptions(n)&t)!==t)continue;for(let e of r)if(n.startsWith(e))continue e;this.values.delete(n)}}#t(e,t){for(let r of t){let t=null!==e?`${r}-${e}`:r;if(!this.values.has(t)){if(null===e||!e.includes("."))continue;if(t=`${r}-${e.replaceAll(".","_")}`,!this.values.has(t))continue}if(!u(t,r))return t}return null}#r(e){let t=this.values.get(e);if(!t)return null;let r=null;return 2&t.options&&(r=t.value),`var(${l(this.prefixKey(e))}${r?`, ${r}`:""})`}markUsedVariable(e){let t=s(this.#e(e)),r=this.values.get(t);if(!r)return!1;let n=16&r.options;return r.options|=16,!n}resolve(e,t,r=0){let n=this.#t(e,t);if(!n)return null;let o=this.values.get(n);return 1&(r|o.options)?o.value:this.#r(n)}resolveValue(e,t){let r=this.#t(e,t);return r?this.values.get(r).value:null}resolveWith(e,t,r=[]){let n=this.#t(e,t);if(!n)return null;let o={};for(let e of r){let t=`${n}${e}`,r=this.values.get(t);r&&(1&r.options?o[e]=r.value:o[e]=this.#r(t))}let a=this.values.get(n);return 1&a.options?[a.value,o]:[this.#r(n),o]}namespace(e){let t=new Map,r=`${e}-`;for(let[n,o]of this.values)n===e?t.set(null,o.value):n.startsWith(`${r}-`)?t.set(n.slice(e.length),o.value):n.startsWith(r)&&t.set(n.slice(r.length),o.value);return t}addKeyframes(e){this.keyframes.add(e)}getKeyframes(){return Array.from(this.keyframes)}},f=class extends Map{constructor(e){super(),this.factory=e}get(e){let t=super.get(e);return void 0===t&&(t=this.factory(e,this),this.set(e,t)),t}};function p(e){return{kind:"word",value:e}}function h(e,t){return{kind:"function",value:e,nodes:t}}function m(e){return{kind:"separator",value:e}}function g(e){let t="";for(let r of e)switch(r.kind){case"word":case"separator":t+=r.value;break;case"function":t+=r.value+"("+g(r.nodes)+")"}return t}function v(e){e=e.replaceAll("\r\n","\n");let t,r=[],n=[],o=null,a="";for(let i=0;i<e.length;i++){let l=e.charCodeAt(i);switch(l){case 92:a+=e[i]+e[i+1],i++;break;case 47:{if(a.length>0){let e=p(a);o?o.nodes.push(e):r.push(e),a=""}let t=p(e[i]);o?o.nodes.push(t):r.push(t);break}case 58:case 44:case 61:case 62:case 60:case 10:case 32:case 9:{if(a.length>0){let e=p(a);o?o.nodes.push(e):r.push(e),a=""}let n=i,l=i+1;for(;l<e.length&&(t=e.charCodeAt(l),58===t||44===t||61===t||62===t||60===t||10===t||32===t||9===t);l++);i=l-1;let s=m(e.slice(n,l));o?o.nodes.push(s):r.push(s);break}case 39:case 34:{let r=i;for(let r=i+1;r<e.length;r++)if(t=e.charCodeAt(r),92===t)r+=1;else if(t===l){i=r;break}a+=e.slice(r,i+1);break}case 40:{let e=h(a,[]);a="",o?o.nodes.push(e):r.push(e),n.push(e),o=e;break}case 41:{let e=n.pop();if(a.length>0){let t=p(a);e?.nodes.push(t),a=""}o=n.length>0?n[n.length-1]:null;break}default:a+=String.fromCharCode(l)}}return a.length>0&&r.push(p(a)),r}var k,w=((k=w||{})[k.Continue=0]="Continue",k[k.Skip=1]="Skip",k[k.Stop=2]="Stop",k[k.Replace=3]="Replace",k[k.ReplaceSkip=4]="ReplaceSkip",k[k.ReplaceStop=5]="ReplaceStop",k),b={Continue:{kind:0},Skip:{kind:1},Stop:{kind:2},Replace:e=>({kind:3,nodes:Array.isArray(e)?e:[e]}),ReplaceSkip:e=>({kind:4,nodes:Array.isArray(e)?e:[e]}),ReplaceStop:e=>({kind:5,nodes:Array.isArray(e)?e:[e]})};function y(e,t){"function"==typeof t?x(e,t):x(e,t.enter,t.exit)}function x(e,t=()=>b.Continue,r=()=>b.Continue){let n={value:[e,0,null],prev:null},o={parent:null,depth:0,path(){let e=[],t=n;for(;t;){let r=t.value[2];r&&e.push(r),t=t.prev}return e.reverse(),e}};for(;null!==n;){let e=n.value,a=e[0],i=e[1],l=e[2];if(i>=a.length){n=n.prev,o.depth-=1;continue}if(o.parent=l,i>=0){let r=a[i],l=t(r,o)??b.Continue;switch(l.kind){case 0:r.nodes&&r.nodes.length>0&&(o.depth+=1,n={value:[r.nodes,0,r],prev:n}),e[1]=~i;continue;case 2:return;case 1:e[1]=~i;continue;case 3:a.splice(i,1,...l.nodes);continue;case 5:return void a.splice(i,1,...l.nodes);case 4:a.splice(i,1,...l.nodes),e[1]+=l.nodes.length;continue;default:throw new Error(`Invalid \`WalkAction.${w[l.kind]??`Unknown(${l.kind})`}\` in enter.`)}}let s=~i,c=r(a[s],o)??b.Continue;switch(c.kind){case 0:e[1]=s+1;continue;case 2:return;case 3:case 4:a.splice(s,1,...c.nodes),e[1]=s+c.nodes.length;continue;case 5:return void a.splice(s,1,...c.nodes);default:throw new Error(`Invalid \`WalkAction.${w[c.kind]??`Unknown(${c.kind})`}\` in exit.`)}}}function $(e){let t=[];return y(v(e),(e=>{if("function"===e.kind&&"var"===e.value)return y(e.nodes,(e=>{"word"!==e.kind||"-"!==e.value[0]||"-"!==e.value[1]||t.push(e.value)})),b.Skip})),t}var z=64;function A(e,t=[]){return{kind:"rule",selector:e,nodes:t}}function S(e,t="",r=[]){return{kind:"at-rule",name:e,params:t,nodes:r}}function C(e,t=[]){return e.charCodeAt(0)===z?o(e,t):A(e,t)}function j(e,t,r=!1){return{kind:"declaration",property:e,value:t,important:r}}function T(e){return{kind:"comment",value:e}}function V(e,t){return{kind:"context",context:e,nodes:t}}function K(e){return{kind:"at-root",nodes:e}}function E(e){switch(e.kind){case"rule":return{kind:e.kind,selector:e.selector,nodes:e.nodes.map(E),src:e.src,dst:e.dst};case"at-rule":return{kind:e.kind,name:e.name,params:e.params,nodes:e.nodes.map(E),src:e.src,dst:e.dst};case"at-root":return{kind:e.kind,nodes:e.nodes.map(E),src:e.src,dst:e.dst};case"context":return{kind:e.kind,context:{...e.context},nodes:e.nodes.map(E),src:e.src,dst:e.dst};case"declaration":return{kind:e.kind,property:e.property,value:e.value,important:e.important,src:e.src,dst:e.dst};case"comment":return{kind:e.kind,value:e.value,src:e.src,dst:e.dst};default:throw new Error(`Unknown node kind: ${e.kind}`)}}function O(e){return{depth:e.depth,get context(){let t={};for(let r of e.path())"context"===r.kind&&Object.assign(t,r.context);return Object.defineProperty(this,"context",{value:t}),t},get parent(){let e=this.path().pop()??null;return Object.defineProperty(this,"parent",{value:e}),e},path:()=>e.path().filter((e=>"context"!==e.kind))}}function N(e,t,r=3){let n=[],o=new Set,a=new f((()=>new Set)),i=new f((()=>new Set)),l=new Set,s=new Set,c=[],u=[],d=new f((()=>new Set));function p(e,f,h={},m=0){if("declaration"===e.kind){if("--tw-sort"===e.property||void 0===e.value||null===e.value)return;if(h.theme&&"-"===e.property[0]&&"-"===e.property[1]){if("initial"===e.value)return void(e.value=void 0);h.keyframes||a.get(f).add(e)}if(e.value.includes("var("))if(h.theme&&"-"===e.property[0]&&"-"===e.property[1])for(let t of $(e.value))d.get(t).add(e.property);else t.trackUsedVariables(e.value);if("animation"===e.property)for(let t of R(e.value))s.add(t);2&r&&e.value.includes("color-mix(")&&!h.supportsColorMix&&!h.keyframes&&i.get(f).add(e),f.push(e)}else if("rule"===e.kind){let t=[];for(let r of e.nodes)p(r,t,h,m+1);let r={},n=new Set;for(let e of t){if("declaration"!==e.kind)continue;let t=`${e.property}:${e.value}:${e.important}`;r[t]??=[],r[t].push(e)}for(let e in r)for(let t=0;t<r[e].length-1;++t)n.add(r[e][t]);if(n.size>0&&(t=t.filter((e=>!n.has(e)))),0===t.length)return;"&"===e.selector?f.push(...t):f.push({...e,nodes:t})}else if("at-rule"===e.kind&&"@property"===e.name&&0===m){if(o.has(e.params))return;if(1&r){let t=e.params,r=null,n=!1;for(let t of e.nodes)"declaration"===t.kind&&("initial-value"===t.property?r=t.value:"inherits"===t.property&&(n="true"===t.value));let o=j(t,r??"initial");o.src=e.src,n?c.push(o):u.push(o)}o.add(e.params);let t={...e,nodes:[]};for(let r of e.nodes)p(r,t.nodes,h,m+1);f.push(t)}else if("at-rule"===e.kind){"@keyframes"===e.name?h={...h,keyframes:!0}:"@supports"===e.name&&e.params.includes("color-mix(")&&(h={...h,supportsColorMix:!0});let t={...e,nodes:[]};for(let r of e.nodes)p(r,t.nodes,h,m+1);"@keyframes"===e.name&&h.theme&&l.add(t),(t.nodes.length>0||"@layer"===t.name||"@charset"===t.name||"@custom-media"===t.name||"@namespace"===t.name||"@import"===t.name)&&f.push(t)}else if("at-root"===e.kind)for(let t of e.nodes){let e=[];p(t,e,h,0);for(let t of e)n.push(t)}else if("context"===e.kind){if(e.context.reference)return;for(let t of e.nodes)p(t,f,{...h,...e.context},m)}else"comment"===e.kind&&f.push(e)}let h=[];for(let t of e)p(t,h,{},0);e:for(let[e,r]of a)for(let n of r){if(W(n.property,t.theme,d)){if(n.property.startsWith(t.theme.prefixKey("--animate-")))for(let e of R(n.value))s.add(e);continue}let r=e.indexOf(n);if(e.splice(r,1),0===e.length){let t=U(h,(t=>"rule"===t.kind&&t.nodes===e));if(!t||0===t.length)continue e;for(t.unshift({kind:"at-root",nodes:h});;){let e=t.pop();if(!e)break;let r=t[t.length-1];if(!r||"at-root"!==r.kind&&"at-rule"!==r.kind)break;let n=r.nodes.indexOf(e);if(-1===n)break;r.nodes.splice(n,1)}continue e}}for(let e of l)if(!s.has(e.params)){let t=n.indexOf(e);n.splice(t,1)}if(h=h.concat(n),2&r)for(let[e,r]of i)for(let n of r){let r=e.indexOf(n);if(-1===r||null==n.value)continue;let o=v(n.value),a=!1;if(y(o,(e=>{if("function"!==e.kind||"color-mix"!==e.value)return;let r=!1,n=!1;if(y(e.nodes,(e=>{if("word"==e.kind&&"currentcolor"===e.value.toLowerCase())return n=!0,void(a=!0);let o=e,i=null,l=new Set;do{if("function"!==o.kind||"var"!==o.value)return;let e=o.nodes[0];if(!e||"word"!==e.kind)return;let s=e.value;if(l.has(s))return void(r=!0);if(l.add(s),a=!0,i=t.theme.resolveValue(null,[e.value]),!i)return void(r=!0);if("currentcolor"===i.toLowerCase())return void(n=!0);o=i.startsWith("var(")?v(i)[0]:null}while(o);return b.Replace({kind:"word",value:i})})),r||n){let t=e.nodes.findIndex((e=>"separator"===e.kind&&e.value.trim().includes(",")));if(-1===t)return;let r=e.nodes.length>t?e.nodes[t+1]:null;return r?b.Replace(r):void 0}if(a){let t=e.nodes[2];"word"===t.kind&&("oklab"===t.value||"oklch"===t.value||"lab"===t.value||"lch"===t.value)&&(t.value="srgb")}})),!a)continue;let i={...n,value:g(o)},l=C("@supports (color: color-mix(in lab, red, red))",[n]);l.src=n.src,e.splice(r,1,i,l)}if(1&r){let e=[];if(c.length>0){let t=C(":root, :host",c);t.src=c[0].src,e.push(t)}if(u.length>0){let t=C("*, ::before, ::after, ::backdrop",u);t.src=u[0].src,e.push(t)}if(e.length>0){let t=h.findIndex((e=>!("comment"===e.kind||"at-rule"===e.kind&&("@charset"===e.name||"@import"===e.name)))),r=S("@layer","properties",[]);r.src=e[0].src,h.splice(t<0?h.length:t,0,r);let n=C("@layer properties",[S("@supports","((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",e)]);n.src=e[0].src,n.nodes[0].src=e[0].src,h.push(n)}}return h}function F(e,t){let r=0,n={file:null,code:""};function o(e,a=0){let i="",l="  ".repeat(a);if("declaration"===e.kind){if(i+=`${l}${e.property}: ${e.value}${e.important?" !important":""};\n`,t){r+=l.length;let t=r;r+=e.property.length,r+=2,r+=e.value?.length??0,e.important&&(r+=11);let o=r;r+=2,e.dst=[n,t,o]}}else if("rule"===e.kind){if(i+=`${l}${e.selector} {\n`,t){r+=l.length;let t=r;r+=e.selector.length,r+=1;let o=r;e.dst=[n,t,o],r+=2}for(let t of e.nodes)i+=o(t,a+1);i+=`${l}}\n`,t&&(r+=l.length,r+=2)}else if("at-rule"===e.kind){if(0===e.nodes.length){let o=`${l}${e.name} ${e.params};\n`;if(t){r+=l.length;let t=r;r+=e.name.length,r+=1,r+=e.params.length;let o=r;r+=2,e.dst=[n,t,o]}return o}if(i+=`${l}${e.name}${e.params?` ${e.params} `:" "}{\n`,t){r+=l.length;let t=r;r+=e.name.length,e.params&&(r+=1,r+=e.params.length),r+=1;let o=r;e.dst=[n,t,o],r+=2}for(let t of e.nodes)i+=o(t,a+1);i+=`${l}}\n`,t&&(r+=l.length,r+=2)}else if("comment"===e.kind){if(i+=`${l}/*${e.value}*/\n`,t){r+=l.length;let t=r;r+=2+e.value.length+2;let o=r;e.dst=[n,t,o],r+=1}}else if("context"===e.kind||"at-root"===e.kind)return"";return i}let a="";for(let t of e)a+=o(t,0);return n.code=a,a}function U(e,t){let r=[];return y(e,((e,n)=>{if(t(e))return r=n.path(),r.push(e),b.Stop})),r}function W(e,t,r,n=new Set){if(n.has(e)||(n.add(e),24&t.getOptions(e)))return!0;{let o=r.get(e)??[];for(let e of o)if(W(e,t,r,n))return!0}return!1}function R(e){return e.split(/[\s,]+/)}var D=["calc","min","max","clamp","mod","rem","sin","cos","tan","asin","acos","atan","atan2","pow","sqrt","hypot","log","exp","round"];function _(e){return-1!==e.indexOf("(")&&D.some((t=>e.includes(`${t}(`)))}function M(e){if(!D.some((t=>e.includes(t))))return e;let t="",r=[],n=null,o=null;for(let a=0;a<e.length;a++){let i=e.charCodeAt(a);if(i>=48&&i<=57||null!==n&&(37===i||i>=97&&i<=122||i>=65&&i<=90)?n=a:(o=n,n=null),40!==i)if(41===i)t+=e[a],r.shift();else{if(44===i&&r[0]){t+=", ";continue}if(32===i&&r[0]&&32===t.charCodeAt(t.length-1))continue;if(43!==i&&42!==i&&47!==i&&45!==i||!r[0])t+=e[a];else{let r=t.trimEnd(),n=r.charCodeAt(r.length-1),i=r.charCodeAt(r.length-2),l=e.charCodeAt(a+1);if((101===n||69===n)&&i>=48&&i<=57){t+=e[a];continue}if(43===n||42===n||47===n||45===n){t+=e[a];continue}if(40===n||44===n){t+=e[a];continue}32===e.charCodeAt(a-1)?t+=`${e[a]} `:t+=n>=48&&n<=57||l>=48&&l<=57||41===n||40===l||43===l||42===l||47===l||45===l||null!==o&&o===a-1?` ${e[a]} `:e[a]}}else{t+=e[a];let n=a;for(let t=a-1;t>=0;t--){let r=e.charCodeAt(t);if(r>=48&&r<=57)n=t;else{if(!(r>=97&&r<=122))break;n=t}}let o=e.slice(n,a);if(D.includes(o)){r.unshift(!0);continue}if(r[0]&&""===o){r.unshift(!0);continue}r.unshift(!1)}}return t}function B(e){if(-1===e.indexOf("("))return L(e);let t=v(e);return I(t),e=M(e=g(t))}function L(e,t=!1){let r="";for(let n=0;n<e.length;n++){let o=e[n];"\\"===o&&"_"===e[n+1]?(r+="_",n+=1):r+="_"!==o||t?o:" "}return r}function I(e){for(let t of e)switch(t.kind){case"function":if("url"===t.value||t.value.endsWith("_url")){t.value=L(t.value);break}if("var"===t.value||t.value.endsWith("_var")||"theme"===t.value||t.value.endsWith("_theme")){t.value=L(t.value);for(let e=0;e<t.nodes.length;e++)0!=e||"word"!==t.nodes[e].kind?I([t.nodes[e]]):t.nodes[e].value=L(t.nodes[e].value,!0);break}t.value=L(t.value),I(t.nodes);break;case"separator":case"word":t.value=L(t.value);break;default:P(t)}}function P(e){throw new Error(`Unexpected value: ${e}`)}var q=new Uint8Array(256);function H(e){let t=0,r=e.length;for(let n=0;n<r;n++){let o=e.charCodeAt(n);switch(o){case 92:n+=1;break;case 39:case 34:for(;++n<r;){let t=e.charCodeAt(n);if(92!==t){if(t===o)break}else n+=1}break;case 40:q[t]=41,t++;break;case 91:q[t]=93,t++;break;case 123:break;case 93:case 125:case 41:if(0===t)return!1;t>0&&o===q[t-1]&&t--;break;case 59:if(0===t)return!1}}return!0}var Z=new Uint8Array(256);function Y(e,t){let r=0,n=[],o=0,a=e.length,i=t.charCodeAt(0);for(let t=0;t<a;t++){let l=e.charCodeAt(t);if(0!==r||l!==i)switch(l){case 92:t+=1;break;case 39:case 34:for(;++t<a;){let r=e.charCodeAt(t);if(92!==r){if(r===l)break}else t+=1}break;case 40:Z[r]=41,r++;break;case 91:Z[r]=93,r++;break;case 123:Z[r]=125,r++;break;case 93:case 125:case 41:r>0&&l===Z[r-1]&&r--}else n.push(e.slice(o,t)),o=t+1}return n.push(e.slice(o)),n}var G=/^[a-zA-Z0-9_.%-]+$/;function J(e){if("["===e[0]&&"]"===e[e.length-1]){let t=B(e.slice(1,-1));return H(t)&&0!==t.length&&0!==t.trim().length?{kind:"arbitrary",value:t}:null}return"("===e[0]&&")"===e[e.length-1]?"-"===(e=e.slice(1,-1))[0]&&"-"===e[1]&&H(e)?{kind:"arbitrary",value:B(e=`var(${e})`)}:null:G.test(e)?{kind:"named",value:e}:null}function*X(e,t){t(e)&&(yield[e,null]);let r=e.lastIndexOf("-");for(;r>0;){let n=e.slice(0,r);if(t(n)){let o=[n,e.slice(r+1)];if(""===o[1]||"@"===o[0]&&t("@")&&"-"===e[r])break;yield o}r=e.lastIndexOf("-",r-1)}"@"===e[0]&&t("@")&&(yield["@",e.slice(1)])}function Q(e){if(null===e)return"";let t=ie(e.value),r=t?e.value.slice(4,-1):e.value,[n,o]=t?["(",")"]:["[","]"];return"arbitrary"===e.kind?`/${n}${re(r)}${o}`:"named"===e.kind?`/${e.value}`:""}function ee(e){if("static"===e.kind)return e.root;if("arbitrary"===e.kind)return`[${re(function(e){return ne.get(e)}(e.selector))}]`;let t="";if("functional"===e.kind){t+=e.root;let r="@"!==e.root;if(e.value)if("arbitrary"===e.value.kind){let n=ie(e.value.value),o=n?e.value.value.slice(4,-1):e.value.value,[a,i]=n?["(",")"]:["[","]"];t+=`${r?"-":""}${a}${re(o)}${i}`}else"named"===e.value.kind&&(t+=`${r?"-":""}${e.value.value}`)}return"compound"===e.kind&&(t+=e.root,t+="-",t+=ee(e.variant)),("functional"===e.kind||"compound"===e.kind)&&(t+=Q(e.modifier)),t}var te=new f((e=>{let t=v(e),r=new Set,n=new Set(["~",">","+","-","*","/"]);return y(t,((e,o)=>{let a=null===o.parent?t:o.parent.nodes??[];if("word"===e.kind&&n.has(e.value)){let t=a.indexOf(e)??-1;if(-1===t)return;let o=a[t-1];if("separator"!==o?.kind||" "!==o.value)return;let i=a[t+1];if("separator"!==i?.kind||" "!==i.value)return;let l=a[t-2];if(l&&n.has(l.value))return;let s=a[t+2];if(s&&n.has(s.value))return;r.add(o),r.add(i)}else if("separator"===e.kind&&e.value.length>0&&""===e.value.trim())(a[0]===e||a[a.length-1]===e)&&r.add(e);else if("separator"===e.kind&&","===e.value.trim())e.value=",";else if("function"===e.kind&&e.value.startsWith("--")){let t=a.indexOf(e)??-1;if(t<=0)return;let r=a[t-1];if("separator"===r?.kind&&","===r.value)return;let o=a[t-2];return o&&!n.has(o.value)?void 0:b.ReplaceSkip({kind:"function",value:"",nodes:[e]})}})),r.size>0&&y(t,(e=>{if(r.has(e))return r.delete(e),b.ReplaceSkip([])})),oe(t),g(t)}));function re(e){return te.get(e)}var ne=new f((e=>{let t=v(e);return 3===t.length&&"word"===t[0].kind&&"&"===t[0].value&&"separator"===t[1].kind&&":"===t[1].value&&"function"===t[2].kind&&"is"===t[2].value?g(t[2].nodes):e}));function oe(e){for(let t of e)switch(t.kind){case"function":if("url"===t.value||t.value.endsWith("_url")){t.value=se(t.value);break}if("var"===t.value||t.value.endsWith("_var")||"theme"===t.value||t.value.endsWith("_theme")){t.value=se(t.value);for(let e=0;e<t.nodes.length;e++)oe([t.nodes[e]]);break}t.value=se(t.value),oe(t.nodes);break;case"separator":t.value=se(t.value);break;case"word":("-"!==t.value[0]||"-"!==t.value[1])&&(t.value=se(t.value));break;default:le(t)}}var ae=new f((e=>{let t=v(e);return 1===t.length&&"function"===t[0].kind&&"var"===t[0].value}));function ie(e){return ae.get(e)}function le(e){throw new Error(`Unexpected value: ${e}`)}function se(e){return e.replaceAll("_",String.raw`\_`).replaceAll(" ","_")}function ce(e,t,r){if(e===t)return 0;let n=e.indexOf("("),o=t.indexOf("("),a=-1===n?e.replace(/[\d.]+/g,""):e.slice(0,n),i=-1===o?t.replace(/[\d.]+/g,""):t.slice(0,o),l=(a===i?0:a<i?-1:1)||("asc"===r?parseInt(e)-parseInt(t):parseInt(t)-parseInt(e));return Number.isNaN(l)?e<t?-1:1:l}var ue=new Set(["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua","aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen","transparent","currentcolor","canvas","canvastext","linktext","visitedtext","activetext","buttonface","buttontext","buttonborder","field","fieldtext","highlight","highlighttext","selecteditem","selecteditemtext","mark","marktext","graytext","accentcolor","accentcolortext"]),de=/^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;var fe={color:function(e){return 35===e.charCodeAt(0)||de.test(e)||ue.has(e.toLowerCase())},length:Ae,percentage:xe,ratio:function(e){return $e.test(e)||_(e)},number:be,integer:je,url:me,position:function(e){let t=0;for(let r of Y(e," "))if("center"!==r&&"top"!==r&&"right"!==r&&"bottom"!==r&&"left"!==r){if(!r.startsWith("var(")){if(Ae(r)||xe(r)){t+=1;continue}return!1}}else t+=1;return t>0},"bg-size":function(e){let t=0;for(let r of Y(e,",")){if("cover"===r||"contain"===r){t+=1;continue}let e=Y(r," ");if(1!==e.length&&2!==e.length)return!1;e.every((e=>"auto"===e||Ae(e)||xe(e)))&&(t+=1)}return t>0},"line-width":function(e){return Y(e," ").every((e=>Ae(e)||be(e)||"thin"===e||"medium"===e||"thick"===e))},image:function(e){let t=0;for(let r of Y(e,","))if(!r.startsWith("var(")){if(me(r)){t+=1;continue}if(ve.test(r)){t+=1;continue}if(ge.test(r)){t+=1;continue}return!1}return t>0},"family-name":function(e){let t=0;for(let r of Y(e,",")){let e=r.charCodeAt(0);if(e>=48&&e<=57)return!1;r.startsWith("var(")||(t+=1)}return t>0},"generic-name":function(e){return"serif"===e||"sans-serif"===e||"monospace"===e||"cursive"===e||"fantasy"===e||"system-ui"===e||"ui-serif"===e||"ui-sans-serif"===e||"ui-monospace"===e||"ui-rounded"===e||"math"===e||"emoji"===e||"fangsong"===e},"absolute-size":function(e){return"xx-small"===e||"x-small"===e||"small"===e||"medium"===e||"large"===e||"x-large"===e||"xx-large"===e||"xxx-large"===e},"relative-size":function(e){return"larger"===e||"smaller"===e},angle:function(e){return Se.test(e)},vector:function(e){return Ce.test(e)}};function pe(e,t){if(e.startsWith("var("))return null;for(let r of t)if(fe[r]?.(e))return r;return null}var he=/^url\(.*\)$/;function me(e){return he.test(e)}var ge=/^(?:element|image|cross-fade|image-set)\(/,ve=/^(repeating-)?(conic|linear|radial)-gradient\(/;var ke=/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,we=new RegExp(`^${ke.source}$`);function be(e){return we.test(e)||_(e)}var ye=new RegExp(`^${ke.source}%$`);function xe(e){return ye.test(e)||_(e)}var $e=new RegExp(`^${ke.source}\\s*/\\s*${ke.source}$`);var ze=new RegExp(`^${ke.source}(${["cm","mm","Q","in","pc","pt","px","em","ex","ch","rem","lh","rlh","vw","vh","vmin","vmax","vb","vi","svw","svh","lvw","lvh","dvw","dvh","cqw","cqh","cqi","cqb","cqmin","cqmax"].join("|")})$`);function Ae(e){return ze.test(e)||_(e)}var Se=new RegExp(`^${ke.source}(${["deg","rad","grad","turn"].join("|")})$`);var Ce=new RegExp(`^${ke.source} +${ke.source} +${ke.source}$`);function je(e){let t=Number(e);return Number.isInteger(t)&&t>=0&&String(t)===String(e)}function Te(e){let t=Number(e);return Number.isInteger(t)&&t>0&&String(t)===String(e)}function Ve(e){return Ee(e,.25)}function Ke(e){return Ee(e,.25)}function Ee(e,t){let r=Number(e);return r>=0&&r%t==0&&String(r)===String(e)}var Oe=new Set(["inset","inherit","initial","revert","unset"]),Ne=/^-?(\d+|\.\d+)(.*?)$/g;function Fe(e,t){return Y(e,",").map((e=>{let r=Y(e=e.trim()," ").filter((e=>""!==e.trim())),n=null,o=null,a=null;for(let e of r)Oe.has(e)||(Ne.test(e)?(null===o?o=e:null===a&&(a=e),Ne.lastIndex=0):null===n&&(n=e));if(null===o||null===a)return e;let i=t(n??"currentcolor");return null!==n?e.replace(n,i):`${e} ${i}`})).join(", ")}var Ue=["0","0.5","1","1.5","2","2.5","3","3.5","4","5","6","7","8","9","10","11","12","14","16","20","24","28","32","36","40","44","48","52","56","60","64","72","80","96"],We=class{utilities=new f((()=>[]));completions=new Map;static(e,t){this.utilities.get(e).push({kind:"static",compileFn:t})}functional(e,t,r){this.utilities.get(e).push({kind:"functional",compileFn:t,options:r})}has(e,t){return this.utilities.has(e)&&this.utilities.get(e).some((e=>e.kind===t))}get(e){return this.utilities.has(e)?this.utilities.get(e):[]}getCompletions(e){return this.has(e,"static")?this.completions.get(e)?.()??[{supportsNegative:!1,values:[],modifiers:[]}]:this.completions.get(e)?.()??[]}suggest(e,t){let r=this.completions.get(e);r?this.completions.set(e,(()=>[...r?.(),...t?.()])):this.completions.set(e,t)}keys(e){let t=[];for(let[r,n]of this.utilities.entries())for(let o of n)if(o.kind===e){t.push(r);break}return t}};function Re(e,t,r){return S("@property",e,[j("syntax",r?`"${r}"`:'"*"'),j("inherits","false"),...t?[j("initial-value",t)]:[]])}function De(e,t){if(null===t)return e;let r=Number(t);return Number.isNaN(r)||(t=100*r+"%"),"100%"===t?e:`color-mix(in oklab, ${e} ${t}, transparent)`}function _e(e,t){let r=Number(t);return Number.isNaN(r)||(t=100*r+"%"),`oklab(from ${e} l a b / ${t})`}function Me(e,t,r){if(!t)return e;if("arbitrary"===t.kind)return De(e,t.value);let n=r.resolve(t.value,["--opacity"]);return n?De(e,n):Ke(t.value)?De(e,`${t.value}%`):null}function Be(e,t,r){let n=null;switch(e.value.value){case"inherit":n="inherit";break;case"transparent":n="transparent";break;case"current":n="currentcolor";break;default:n=t.resolve(e.value.value,r)}return n?Me(n,e.modifier,t):null}var Le=/(\d+)_(\d+)/g;var Ie=["number","integer","ratio","percentage"];function Pe(e){let t=s(e.params);return function(e){if(!e.endsWith("-*"))return!1;e=e.slice(0,-2);let t=Ye.exec(e);if(null===t)return!1;let r=t[0];return 0===e.slice(r.length).length}(t)?r=>{let n={"--value":{usedSpacingInteger:!1,usedSpacingNumber:!1,themeKeys:new Set,literals:new Set},"--modifier":{usedSpacingInteger:!1,usedSpacingNumber:!1,themeKeys:new Set,literals:new Set}};y(e.nodes,(e=>{if("declaration"!==e.kind||!e.value||!e.value.includes("--value(")&&!e.value.includes("--modifier("))return;let t=v(e.value);y(t,(e=>{if("function"!==e.kind)return;if(!("--spacing"!==e.value||n["--modifier"].usedSpacingNumber&&n["--value"].usedSpacingNumber))return y(e.nodes,(e=>{if("function"!==e.kind||"--value"!==e.value&&"--modifier"!==e.value)return;let t=e.value;for(let r of e.nodes)if("word"===r.kind)if("integer"===r.value)n[t].usedSpacingInteger||=!0;else if("number"===r.value&&(n[t].usedSpacingNumber||=!0,n["--modifier"].usedSpacingNumber&&n["--value"].usedSpacingNumber))return b.Stop})),b.Continue;if("--value"!==e.value&&"--modifier"!==e.value)return;let t=Y(g(e.nodes),",");for(let[e,r]of t.entries())r=r.replace(/\\\*/g,"*"),r=r.replace(/--(.*?)\s--(.*?)/g,"--$1-*--$2"),r=r.replace(/\s+/g,""),r=r.replace(/(-\*){2,}/g,"-*"),"-"===r[0]&&"-"===r[1]&&!r.includes("(")&&!r.includes("-*")&&(r+="-*"),t[e]=r;e.nodes=v(t.join(","));for(let t of e.nodes)if("word"!==t.kind||'"'!==t.value[0]&&"'"!==t.value[0]||t.value[0]!==t.value[t.value.length-1]){if("word"===t.kind&&"-"===t.value[0]&&"-"===t.value[1]){let r=t.value.replace(/-\*.*$/g,"");n[e.value].themeKeys.add(r)}else if("word"===t.kind&&("["!==t.value[0]||"]"!==t.value[t.value.length-1])&&!Ie.includes(t.value)){console.warn(`Unsupported bare value data type: "${t.value}".\nOnly valid data types are: ${Ie.map((e=>`"${e}"`)).join(", ")}.\n`);let r=t.value,n=structuredClone(e),o="Â¶";y(n.nodes,(e=>{if("word"===e.kind&&e.value===r)return b.ReplaceSkip({kind:"word",value:o})}));let a="^".repeat(g([t]).length),i=g([n]).indexOf(o),l=["```css",g([e])," ".repeat(i)+a,"```"].join("\n");console.warn(l)}}else{let r=t.value.slice(1,-1);n[e.value].literals.add(r)}})),e.value=g(t)})),r.utilities.functional(t.slice(0,-2),(t=>{let n=E(e),o=t.value,a=t.modifier,i=!1,l=!1,s=!1,c=!1,u=new Map,d=!1;if(y([n],((e,t)=>{let n=t.parent;if("rule"!==n?.kind&&"at-rule"!==n?.kind||"declaration"!==e.kind||!e.value)return;let f=!1,p=v(e.value);if(y(p,(t=>{if("function"===t.kind){if("--value"===t.value){i=!0;let a=qe(o,t,r);return a?(l=!0,a.ratio?d=!0:u.set(e,n),b.ReplaceSkip(a.nodes)):(f=!0,b.Stop)}if("--modifier"===t.value){s=!0;let e=qe(a,t,r);return e?(c=!0,b.ReplaceSkip(e.nodes)):(f=!0,b.Stop)}}})),f)return b.ReplaceSkip([]);e.value=g(p)})),!i||!l||s&&!c&&null!==a||d&&c||a&&!d&&!c)return null;if(d)for(let[e,t]of u){let r=t.nodes.indexOf(e);-1!==r&&t.nodes.splice(r,1)}return n.nodes})),r.utilities.suggest(t.slice(0,-2),(()=>{let e=[],t=[];for(let[o,{literals:a,usedSpacingNumber:i,usedSpacingInteger:l,themeKeys:s}]of[[e,n["--value"]],[t,n["--modifier"]]]){for(let e of a)o.push(e);if(i)o.push(...Ue);else if(l)for(let e of Ue)je(e)&&o.push(e);for(let e of r.theme.keysInNamespaces(s))o.push(e.replace(Le,((e,t,r)=>`${t}.${r}`)))}return[{values:e,modifiers:t}]}))}:function(e){let t=Ye.exec(e);if(null===t)return!1;let r=t[0],n=e.slice(r.length);if(0===n.length&&r.endsWith("-"))return!1;if(0===n.length)return!0;let o=!1;for(let e=0;e<n.length;e++){let t=n.charCodeAt(e);switch(t){case Ge:{if(e!==n.length-1)return!1;let t=(n[e-1]||r[r.length-1]||"").charCodeAt(0);if(t<nt||t>ot)return!1;break}case Je:if(e===n.length-1||o)return!1;o=!0;break;case Xe:{let t=(n[e-1]||r[r.length-1]||"").charCodeAt(0);if(t<nt||t>ot)return!1;let o=(n[e+1]||"").charCodeAt(0);if(o<nt||o>ot)return!1;break}case at:case it:continue;default:if(t>=Qe&&t<=et||t>=tt&&t<=rt||t>=nt&&t<=ot)continue;return!1}}return!0}(t)?r=>{r.utilities.static(t,(()=>e.nodes.map(E)))}:null}function qe(e,t,r){if(null!==e)for(let n of t.nodes){if("named"===e.kind&&"word"===n.kind&&("'"===n.value[0]||'"'===n.value[0])&&n.value[n.value.length-1]===n.value[0]&&n.value.slice(1,-1)===e.value)return{nodes:v(e.value)};if("named"===e.kind&&"word"===n.kind&&"-"===n.value[0]&&"-"===n.value[1]){let t=n.value;if(t.endsWith("-*")){t=t.slice(0,-2);let n=r.theme.resolve(e.value,[t]);if(n)return{nodes:v(n)}}else{let n=t.split("-*");if(n.length<=1)continue;let o=[n.shift()],a=r.theme.resolveWith(e.value,o,n);if(a){let[,e={}]=a;{let t=e[n.pop()];if(t)return{nodes:v(t)}}}}}else{if("named"===e.kind&&"word"===n.kind){if(!Ie.includes(n.value))continue;let t="ratio"===n.value&&"fraction"in e?e.fraction:e.value;if(!t)continue;let r=pe(t,[n.value]);if(null===r)continue;if("ratio"===r){let[e,r]=Y(t,"/").map(Number);if(!je(e)||!je(r))continue}else{if("number"===r&&!Ve(t))continue;if("percentage"===r&&!je(t.slice(0,-1)))continue}if("ratio"===r){let[e,r]=Y(t,"/");return{nodes:v(`${e.trim()} / ${r.trim()}`),ratio:!0}}return{nodes:v(t),ratio:!1}}if("arbitrary"===e.kind&&"word"===n.kind&&"["===n.value[0]&&"]"===n.value[n.value.length-1]){let t=n.value.slice(1,-1);if("*"===t)return{nodes:v(e.value)};if("dataType"in e&&e.dataType&&e.dataType!==t)continue;if("dataType"in e&&e.dataType)return{nodes:v(e.value)};if(null!==pe(e.value,[t]))return{nodes:v(e.value)}}}}else for(let e of t.nodes)if("function"===e.kind&&"--default"===e.value)return{nodes:e.nodes}}function He(e,t,r,n,o=""){let a=!1,i=Fe(t,(e=>null==r?n(e):e.startsWith("current")?n(De(e,r)):((e.startsWith("var(")||r.startsWith("var("))&&(a=!0),n(_e(e,r)))));function l(e){return o?Y(e,",").map((e=>o.trim()+" "+e.trim())).join(", "):e}return a?[j(e,l(Fe(t,n))),C("@supports (color: lab(from red l a b))",[j(e,l(i))])]:[j(e,l(i))]}function Ze(e,t,r,n,o=""){let a=!1,i=Y(t,",").map((e=>Fe(e,(e=>null==r?n(e):e.startsWith("current")?n(De(e,r)):((e.startsWith("var(")||r.startsWith("var("))&&(a=!0),n(_e(e,r))))))).map((e=>`drop-shadow(${e})`)).join(" ");return a?[j(e,o+Y(t,",").map((e=>`drop-shadow(${Fe(e,n)})`)).join(" ")),C("@supports (color: lab(from red l a b))",[j(e,o+i)])]:[j(e,o+i)]}var Ye=/^-?[a-z][a-zA-Z0-9_-]*/,Ge=37,Je=47,Xe=46,Qe=97,et=122,tt=65,rt=90,nt=48,ot=57,at=95,it=45;var lt={"--alpha":function(e,t,r,...n){let[o,a]=Y(r,"/").map((e=>e.trim()));if(!o||!a)throw new Error(`The --alpha(â€¦) function requires a color and an alpha value, e.g.: \`--alpha(${o||"var(--my-color)"} / ${a||"50%"})\``);if(n.length>0)throw new Error(`The --alpha(â€¦) function only accepts one argument, e.g.: \`--alpha(${o||"var(--my-color)"} / ${a||"50%"})\``);return De(o,a)},"--spacing":function(e,t,r,...n){if(!r)throw new Error("The --spacing(â€¦) function requires an argument, but received none.");if(n.length>0)throw new Error(`The --spacing(â€¦) function only accepts a single argument, but received ${n.length+1}.`);let o=e.theme.resolve(null,["--spacing"]);if(!o)throw new Error("The --spacing(â€¦) function requires that the `--spacing` theme variable exists, but it was not found.");return`calc(${o} * ${r})`},"--theme":function(e,t,r,...n){if(!r.startsWith("--"))throw new Error("The --theme(â€¦) function can only be used with CSS variables from your theme.");let o=!1;r.endsWith(" inline")&&(o=!0,r=r.slice(0,-7)),"at-rule"===t.kind&&(o=!0);let a=e.resolveThemeValue(r,o);if(!a){if(n.length>0)return n.join(", ");throw new Error(`Could not resolve value for theme function: \`theme(${r})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`)}if(0===n.length)return a;let i=n.join(", ");if("initial"===i)return a;if("initial"===a)return i;if(a.startsWith("var(")||a.startsWith("theme(")||a.startsWith("--theme(")){let e=v(a);return function(e,t){y(e,(e=>{if("function"===e.kind&&("var"===e.value||"theme"===e.value||"--theme"===e.value))if(1===e.nodes.length)e.nodes.push({kind:"word",value:`, ${t}`});else{let r=e.nodes[e.nodes.length-1];"word"===r.kind&&"initial"===r.value&&(r.value=t)}}))}(e,i),g(e)}return a},theme:function(e,t,r,...n){r=function(e){if("'"!==e[0]&&'"'!==e[0])return e;let t="",r=e[0];for(let n=1;n<e.length-1;n++){let o=e[n],a=e[n+1];"\\"!==o||a!==r&&"\\"!==a?t+=o:(t+=a,n++)}return t}(r);let o=e.resolveThemeValue(r);if(!o&&n.length>0)return n.join(", ");if(!o)throw new Error(`Could not resolve value for theme function: \`theme(${r})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`);return o}};var st=new RegExp(Object.keys(lt).map((e=>`${e}\\(`)).join("|"));function ct(e,t){let r=0;return y(e,(e=>{if("declaration"===e.kind&&e.value&&st.test(e.value))return r|=8,void(e.value=ut(e.value,e,t));"at-rule"===e.kind&&("@media"===e.name||"@custom-media"===e.name||"@container"===e.name||"@supports"===e.name)&&st.test(e.params)&&(r|=8,e.params=ut(e.params,e,t))})),r}function ut(e,t,r){let n=v(e);return y(n,(e=>{if("function"===e.kind&&e.value in lt){let n=Y(g(e.nodes).trim(),",").map((e=>e.trim())),o=lt[e.value](r,t,...n);return b.Replace(v(o))}})),g(n)}var dt=/^@?[a-z0-9][a-zA-Z0-9_-]*(?<![_-])$/,ft=class{compareFns=new Map;variants=new Map;completions=new Map;groupOrder=null;lastOrder=0;static(e,t,{compounds:r,order:n}={}){this.set(e,{kind:"static",applyFn:t,compoundsWith:0,compounds:r??2,order:n})}fromAst(e,t,r){let n=[],o=!1;y(t,(e=>{"rule"===e.kind?n.push(e.selector):"at-rule"===e.kind&&"@variant"===e.name?o=!0:"at-rule"===e.kind&&"@slot"!==e.name&&n.push(`${e.name} ${e.params}`)})),this.static(e,(e=>{let n=t.map(E);o&&gt(n,r),mt(n,e.nodes),e.nodes=n}),{compounds:pt(n)})}functional(e,t,{compounds:r,order:n}={}){this.set(e,{kind:"functional",applyFn:t,compoundsWith:0,compounds:r??2,order:n})}compound(e,t,r,{compounds:n,order:o}={}){this.set(e,{kind:"compound",applyFn:r,compoundsWith:t,compounds:n??2,order:o})}group(e,t){this.groupOrder=this.nextOrder(),t&&this.compareFns.set(this.groupOrder,t),e(),this.groupOrder=null}has(e){return this.variants.has(e)}get(e){return this.variants.get(e)}kind(e){return this.variants.get(e)?.kind}compoundsWith(e,t){let r=this.variants.get(e),n="string"==typeof t?this.variants.get(t):"arbitrary"===t.kind?{compounds:pt([t.selector])}:this.variants.get(t.root);return!!(r&&n&&"compound"===r.kind&&0!==n.compounds&&0!==r.compoundsWith&&r.compoundsWith&n.compounds)}suggest(e,t){this.completions.set(e,t)}getCompletions(e){return this.completions.get(e)?.()??[]}compare(e,t){if(e===t)return 0;if(null===e)return-1;if(null===t)return 1;if("arbitrary"===e.kind&&"arbitrary"===t.kind)return e.selector<t.selector?-1:1;if("arbitrary"===e.kind)return 1;if("arbitrary"===t.kind)return-1;let r=this.variants.get(e.root).order,n=r-this.variants.get(t.root).order;if(0!==n)return n;if("compound"===e.kind&&"compound"===t.kind){let r=this.compare(e.variant,t.variant);return 0!==r?r:e.modifier&&t.modifier?e.modifier.value<t.modifier.value?-1:1:e.modifier?1:t.modifier?-1:0}let o=this.compareFns.get(r);if(void 0!==o)return o(e,t);if(e.root!==t.root)return e.root<t.root?-1:1;let a=e.value,i=t.value;return null===a?-1:null===i||"arbitrary"===a.kind&&"arbitrary"!==i.kind?1:"arbitrary"!==a.kind&&"arbitrary"===i.kind||a.value<i.value?-1:1}keys(){return this.variants.keys()}entries(){return this.variants.entries()}set(e,{kind:t,applyFn:r,compounds:n,compoundsWith:o,order:a}){let i=this.variants.get(e);i?Object.assign(i,{kind:t,applyFn:r,compounds:n}):(void 0===a&&(this.lastOrder=this.nextOrder(),a=this.lastOrder),this.variants.set(e,{kind:t,applyFn:r,order:a,compoundsWith:o,compounds:n}))}nextOrder(){return this.groupOrder??this.lastOrder+1}};function pt(e){let t=0;for(let r of e)if("@"!==r[0]){if(r.includes("::"))return 0;t|=2}else{if(!r.startsWith("@media")&&!r.startsWith("@supports")&&!r.startsWith("@container"))return 0;t|=1}return t}function ht(e){if(e.includes("=")){let[t,...r]=Y(e,"="),n=r.join("=").trim();if("'"===n[0]||'"'===n[0])return e;if(n.length>1){let e=n[n.length-1];if(" "===n[n.length-2]&&("i"===e||"I"===e||"s"===e||"S"===e))return`${t}="${n.slice(0,-2)}" ${e}`}return`${t}="${n}"`}return e}function mt(e,t){y(e,(e=>"at-rule"===e.kind&&"@slot"===e.name?b.ReplaceSkip(t):"at-rule"!==e.kind||"@keyframes"!==e.name&&"@property"!==e.name?void 0:(Object.assign(e,K([S(e.name,e.params,e.nodes)])),b.Skip)))}function gt(e,t){let r=0;return y(e,(e=>{if("at-rule"!==e.kind||"@variant"!==e.name)return;let n=[],o=Y(e.params,",");for(let[r,a]of o.entries()){let i=A("&",r===o.length-1?e.nodes:e.nodes.map(E)),l=Y(a,":");for(let e=l.length-1;e>=0;--e){let r=l[e].trim();if(!r)throw new Error("Cannot use `@variant` with empty variant");let n=t.parseVariant(r);if(null===n)throw new Error(`Cannot use \`@variant\` with unknown variant: ${r}`);if(null===bt(i,n,t.variants))throw new Error(`Cannot use \`@variant\` with variant: ${r}`)}n.push(i)}return r|=32,b.Replace(n)})),r}function vt(e,t){let r=function(e){let t=new We;function r(r,n){function*o(t){for(let r of e.keysInNamespaces(t))yield r.replace(Le,((e,t,r)=>`${t}.${r}`))}let a=["1/2","1/3","2/3","1/4","2/4","3/4","1/5","2/5","3/5","4/5","1/6","2/6","3/6","4/6","5/6","1/12","2/12","3/12","4/12","5/12","6/12","7/12","8/12","9/12","10/12","11/12"];t.suggest(r,(()=>{let e=[];for(let t of n()){if("string"==typeof t){e.push({values:[t],modifiers:[]});continue}let r=[...t.values??[],...o(t.valueThemeKeys??[])],n=[...t.modifiers??[],...o(t.modifierThemeKeys??[])];t.supportsFractions&&r.push(...a),t.hasDefaultValue&&r.unshift(null),e.push({supportsNegative:t.supportsNegative,values:r,modifiers:n})}return e}))}function n(e,r){t.static(e,(()=>r.map((e=>"function"==typeof e?e():j(e[0],e[1])))))}function o(n,o){function a({negative:t}){return r=>{let n=null,a=null;if(r.value)if("arbitrary"===r.value.kind){if(r.modifier)return;n=r.value.value,a=r.value.dataType}else{if(n=e.resolve(r.value.fraction??r.value.value,o.themeKeys??[]),null===n&&o.supportsFractions&&r.value.fraction){let[e,t]=Y(r.value.fraction,"/");if(!je(e)||!je(t))return;n=`calc(${e} / ${t} * 100%)`}if(null===n&&t&&o.handleNegativeBareValue){if(n=o.handleNegativeBareValue(r.value),!n?.includes("/")&&r.modifier)return;if(null!==n)return o.handle(n,null)}if(null===n&&o.handleBareValue&&(n=o.handleBareValue(r.value),!n?.includes("/")&&r.modifier))return;if(null===n&&!t&&o.staticValues&&!r.modifier){let e=o.staticValues[r.value.value];if(e)return e.map(E)}}else{if(r.modifier)return;n=void 0!==o.defaultValue?o.defaultValue:e.resolve(null,o.themeKeys??[])}if(null!==n)return o.handle(t?M(`calc(${n} * -1)`):n,a)}}if(o.staticValues&&(o.staticValues=Object.assign(Object.create(null),o.staticValues)),o.supportsNegative&&t.functional(`-${n}`,a({negative:!0})),t.functional(n,a({negative:!1})),r(n,(()=>[{supportsNegative:o.supportsNegative,valueThemeKeys:o.themeKeys??[],hasDefaultValue:void 0!==o.defaultValue&&null!==o.defaultValue,supportsFractions:o.supportsFractions}])),o.staticValues&&Object.keys(o.staticValues).length>0){let e=Object.keys(o.staticValues);r(n,(()=>[{values:e}]))}}function a(n,o){t.functional(n,(t=>{if(!t.value)return;let r=null;return"arbitrary"===t.value.kind?(r=t.value.value,r=Me(r,t.modifier,e)):r=Be(t,e,o.themeKeys),null!==r?o.handle(r):void 0})),r(n,(()=>[{values:["current","inherit","transparent"],valueThemeKeys:o.themeKeys,modifiers:Array.from({length:21},((e,t)=>""+5*t))}]))}function i(n,a,i,{supportsNegative:l=!1,supportsFractions:s=!1,staticValues:c}={}){l&&t.static(`-${n}-px`,(()=>i("-1px"))),t.static(`${n}-px`,(()=>i("1px"))),o(n,{themeKeys:a,supportsFractions:s,supportsNegative:l,defaultValue:null,handleBareValue:({value:t})=>{let r=e.resolve(null,["--spacing"]);return r&&Ve(t)?`calc(${r} * ${t})`:null},handleNegativeBareValue:({value:t})=>{let r=e.resolve(null,["--spacing"]);return r&&Ve(t)?`calc(${r} * -${t})`:null},handle:i,staticValues:c}),r(n,(()=>[{values:e.get(["--spacing"])?Ue:[],supportsNegative:l,supportsFractions:s,valueThemeKeys:a}]))}n("sr-only",[["position","absolute"],["width","1px"],["height","1px"],["padding","0"],["margin","-1px"],["overflow","hidden"],["clip-path","inset(50%)"],["white-space","nowrap"],["border-width","0"]]),n("not-sr-only",[["position","static"],["width","auto"],["height","auto"],["padding","0"],["margin","0"],["overflow","visible"],["clip-path","none"],["white-space","normal"]]),n("pointer-events-none",[["pointer-events","none"]]),n("pointer-events-auto",[["pointer-events","auto"]]),n("visible",[["visibility","visible"]]),n("invisible",[["visibility","hidden"]]),n("collapse",[["visibility","collapse"]]),n("static",[["position","static"]]),n("fixed",[["position","fixed"]]),n("absolute",[["position","absolute"]]),n("relative",[["position","relative"]]),n("sticky",[["position","sticky"]]);for(let[e,t]of[["inset","inset"],["inset-x","inset-inline"],["inset-y","inset-block"],["inset-s","inset-inline-start"],["inset-e","inset-inline-end"],["inset-bs","inset-block-start"],["inset-be","inset-block-end"],["top","top"],["right","right"],["bottom","bottom"],["left","left"]])n(`${e}-auto`,[[t,"auto"]]),n(`${e}-full`,[[t,"100%"]]),n(`-${e}-full`,[[t,"-100%"]]),i(e,["--inset","--spacing"],(e=>[j(t,e)]),{supportsNegative:!0,supportsFractions:!0});n("isolate",[["isolation","isolate"]]),n("isolation-auto",[["isolation","auto"]]),o("z",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--z-index"],handle:e=>[j("z-index",e)],staticValues:{auto:[j("z-index","auto")]}}),r("z",(()=>[{supportsNegative:!0,values:["0","10","20","30","40","50"],valueThemeKeys:["--z-index"]}])),o("order",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--order"],handle:e=>[j("order",e)],staticValues:{first:[j("order","-9999")],last:[j("order","9999")]}}),r("order",(()=>[{supportsNegative:!0,values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:["--order"]}])),o("col",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-column"],handle:e=>[j("grid-column",e)],staticValues:{auto:[j("grid-column","auto")]}}),o("col-span",{handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("grid-column",`span ${e} / span ${e}`)],staticValues:{full:[j("grid-column","1 / -1")]}}),o("col-start",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-column-start"],handle:e=>[j("grid-column-start",e)],staticValues:{auto:[j("grid-column-start","auto")]}}),o("col-end",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-column-end"],handle:e=>[j("grid-column-end",e)],staticValues:{auto:[j("grid-column-end","auto")]}}),r("col-span",(()=>[{values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:[]}])),r("col-start",(()=>[{supportsNegative:!0,values:Array.from({length:13},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-column-start"]}])),r("col-end",(()=>[{supportsNegative:!0,values:Array.from({length:13},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-column-end"]}])),o("row",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-row"],handle:e=>[j("grid-row",e)],staticValues:{auto:[j("grid-row","auto")]}}),o("row-span",{themeKeys:[],handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("grid-row",`span ${e} / span ${e}`)],staticValues:{full:[j("grid-row","1 / -1")]}}),o("row-start",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-row-start"],handle:e=>[j("grid-row-start",e)],staticValues:{auto:[j("grid-row-start","auto")]}}),o("row-end",{supportsNegative:!0,handleBareValue:({value:e})=>je(e)?e:null,themeKeys:["--grid-row-end"],handle:e=>[j("grid-row-end",e)],staticValues:{auto:[j("grid-row-end","auto")]}}),r("row-span",(()=>[{values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:[]}])),r("row-start",(()=>[{supportsNegative:!0,values:Array.from({length:13},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-row-start"]}])),r("row-end",(()=>[{supportsNegative:!0,values:Array.from({length:13},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-row-end"]}])),n("float-start",[["float","inline-start"]]),n("float-end",[["float","inline-end"]]),n("float-right",[["float","right"]]),n("float-left",[["float","left"]]),n("float-none",[["float","none"]]),n("clear-start",[["clear","inline-start"]]),n("clear-end",[["clear","inline-end"]]),n("clear-right",[["clear","right"]]),n("clear-left",[["clear","left"]]),n("clear-both",[["clear","both"]]),n("clear-none",[["clear","none"]]);for(let[e,t]of[["m","margin"],["mx","margin-inline"],["my","margin-block"],["ms","margin-inline-start"],["me","margin-inline-end"],["mbs","margin-block-start"],["mbe","margin-block-end"],["mt","margin-top"],["mr","margin-right"],["mb","margin-bottom"],["ml","margin-left"]])n(`${e}-auto`,[[t,"auto"]]),i(e,["--margin","--spacing"],(e=>[j(t,e)]),{supportsNegative:!0});n("box-border",[["box-sizing","border-box"]]),n("box-content",[["box-sizing","content-box"]]),o("line-clamp",{themeKeys:["--line-clamp"],handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("overflow","hidden"),j("display","-webkit-box"),j("-webkit-box-orient","vertical"),j("-webkit-line-clamp",e)],staticValues:{none:[j("overflow","visible"),j("display","block"),j("-webkit-box-orient","horizontal"),j("-webkit-line-clamp","unset")]}}),r("line-clamp",(()=>[{values:["1","2","3","4","5","6"],valueThemeKeys:["--line-clamp"]}])),n("block",[["display","block"]]),n("inline-block",[["display","inline-block"]]),n("inline",[["display","inline"]]),n("hidden",[["display","none"]]),n("inline-flex",[["display","inline-flex"]]),n("table",[["display","table"]]),n("inline-table",[["display","inline-table"]]),n("table-caption",[["display","table-caption"]]),n("table-cell",[["display","table-cell"]]),n("table-column",[["display","table-column"]]),n("table-column-group",[["display","table-column-group"]]),n("table-footer-group",[["display","table-footer-group"]]),n("table-header-group",[["display","table-header-group"]]),n("table-row-group",[["display","table-row-group"]]),n("table-row",[["display","table-row"]]),n("flow-root",[["display","flow-root"]]),n("flex",[["display","flex"]]),n("grid",[["display","grid"]]),n("inline-grid",[["display","inline-grid"]]),n("contents",[["display","contents"]]),n("list-item",[["display","list-item"]]),n("field-sizing-content",[["field-sizing","content"]]),n("field-sizing-fixed",[["field-sizing","fixed"]]),o("aspect",{themeKeys:["--aspect"],handleBareValue:({fraction:e})=>{if(null===e)return null;let[t,r]=Y(e,"/");return Ve(t)&&Ve(r)?e:null},handle:e=>[j("aspect-ratio",e)],staticValues:{auto:[j("aspect-ratio","auto")],square:[j("aspect-ratio","1 / 1")]}});for(let[e,t]of[["full","100%"],["svw","100svw"],["lvw","100lvw"],["dvw","100dvw"],["svh","100svh"],["lvh","100lvh"],["dvh","100dvh"],["min","min-content"],["max","max-content"],["fit","fit-content"]])n(`size-${e}`,[["--tw-sort","size"],["width",t],["height",t]]),n(`w-${e}`,[["width",t]]),n(`h-${e}`,[["height",t]]),n(`min-w-${e}`,[["min-width",t]]),n(`min-h-${e}`,[["min-height",t]]),n(`max-w-${e}`,[["max-width",t]]),n(`max-h-${e}`,[["max-height",t]]);n("size-auto",[["--tw-sort","size"],["width","auto"],["height","auto"]]),n("w-auto",[["width","auto"]]),n("h-auto",[["height","auto"]]),n("min-w-auto",[["min-width","auto"]]),n("min-h-auto",[["min-height","auto"]]),n("h-lh",[["height","1lh"]]),n("min-h-lh",[["min-height","1lh"]]),n("max-h-lh",[["max-height","1lh"]]),n("w-screen",[["width","100vw"]]),n("min-w-screen",[["min-width","100vw"]]),n("max-w-screen",[["max-width","100vw"]]),n("h-screen",[["height","100vh"]]),n("min-h-screen",[["min-height","100vh"]]),n("max-h-screen",[["max-height","100vh"]]),n("max-w-none",[["max-width","none"]]),n("max-h-none",[["max-height","none"]]),i("size",["--size","--spacing"],(e=>[j("--tw-sort","size"),j("width",e),j("height",e)]),{supportsFractions:!0});for(let[e,t,r]of[["w",["--width","--spacing","--container"],"width"],["min-w",["--min-width","--spacing","--container"],"min-width"],["max-w",["--max-width","--spacing","--container"],"max-width"],["h",["--height","--spacing"],"height"],["min-h",["--min-height","--height","--spacing"],"min-height"],["max-h",["--max-height","--height","--spacing"],"max-height"]])i(e,t,(e=>[j(r,e)]),{supportsFractions:!0});for(let[e,t]of[["full","100%"],["min","min-content"],["max","max-content"],["fit","fit-content"]])n(`inline-${e}`,[["inline-size",t]]),n(`block-${e}`,[["block-size",t]]),n(`min-inline-${e}`,[["min-inline-size",t]]),n(`min-block-${e}`,[["min-block-size",t]]),n(`max-inline-${e}`,[["max-inline-size",t]]),n(`max-block-${e}`,[["max-block-size",t]]);for(let[e,t]of[["svw","100svw"],["lvw","100lvw"],["dvw","100dvw"]])n(`inline-${e}`,[["inline-size",t]]),n(`min-inline-${e}`,[["min-inline-size",t]]),n(`max-inline-${e}`,[["max-inline-size",t]]);for(let[e,t]of[["svh","100svh"],["lvh","100lvh"],["dvh","100dvh"]])n(`block-${e}`,[["block-size",t]]),n(`min-block-${e}`,[["min-block-size",t]]),n(`max-block-${e}`,[["max-block-size",t]]);n("inline-auto",[["inline-size","auto"]]),n("block-auto",[["block-size","auto"]]),n("min-inline-auto",[["min-inline-size","auto"]]),n("min-block-auto",[["min-block-size","auto"]]),n("block-lh",[["block-size","1lh"]]),n("min-block-lh",[["min-block-size","1lh"]]),n("max-block-lh",[["max-block-size","1lh"]]),n("inline-screen",[["inline-size","100vw"]]),n("min-inline-screen",[["min-inline-size","100vw"]]),n("max-inline-screen",[["max-inline-size","100vw"]]),n("block-screen",[["block-size","100vh"]]),n("min-block-screen",[["min-block-size","100vh"]]),n("max-block-screen",[["max-block-size","100vh"]]),n("max-inline-none",[["max-inline-size","none"]]),n("max-block-none",[["max-block-size","none"]]);for(let[e,t,r]of[["inline",["--spacing","--container"],"inline-size"],["min-inline",["--spacing","--container"],"min-inline-size"],["max-inline",["--spacing","--container"],"max-inline-size"],["block",["--spacing"],"block-size"],["min-block",["--spacing"],"min-block-size"],["max-block",["--spacing"],"max-block-size"]])i(e,t,(e=>[j(r,e)]),{supportsFractions:!0});t.static("container",(()=>{let t=[...e.namespace("--breakpoint").values()];t.sort(((e,t)=>ce(e,t,"asc")));let r=[j("--tw-sort","--tw-container-component"),j("width","100%")];for(let e of t)r.push(S("@media",`(width >= ${e})`,[j("max-width",e)]));return r})),n("flex-auto",[["flex","auto"]]),n("flex-initial",[["flex","0 auto"]]),n("flex-none",[["flex","none"]]),t.functional("flex",(e=>{if(e.value){if("arbitrary"===e.value.kind)return e.modifier?void 0:[j("flex",e.value.value)];if(e.value.fraction){let[t,r]=Y(e.value.fraction,"/");return je(t)&&je(r)?[j("flex",`calc(${e.value.fraction} * 100%)`)]:void 0}if(je(e.value.value))return e.modifier?void 0:[j("flex",e.value.value)]}})),r("flex",(()=>[{supportsFractions:!0},{values:Array.from({length:12},((e,t)=>`${t+1}`))}])),o("shrink",{defaultValue:"1",handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("flex-shrink",e)]}),o("grow",{defaultValue:"1",handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("flex-grow",e)]}),r("shrink",(()=>[{values:["0"],valueThemeKeys:[],hasDefaultValue:!0}])),r("grow",(()=>[{values:["0"],valueThemeKeys:[],hasDefaultValue:!0}])),n("basis-auto",[["flex-basis","auto"]]),n("basis-full",[["flex-basis","100%"]]),i("basis",["--flex-basis","--spacing","--container"],(e=>[j("flex-basis",e)]),{supportsFractions:!0}),n("table-auto",[["table-layout","auto"]]),n("table-fixed",[["table-layout","fixed"]]),n("caption-top",[["caption-side","top"]]),n("caption-bottom",[["caption-side","bottom"]]),n("border-collapse",[["border-collapse","collapse"]]),n("border-separate",[["border-collapse","separate"]]);let l=()=>K([Re("--tw-border-spacing-x","0","<length>"),Re("--tw-border-spacing-y","0","<length>")]);i("border-spacing",["--border-spacing","--spacing"],(e=>[l(),j("--tw-border-spacing-x",e),j("--tw-border-spacing-y",e),j("border-spacing","var(--tw-border-spacing-x) var(--tw-border-spacing-y)")])),i("border-spacing-x",["--border-spacing","--spacing"],(e=>[l(),j("--tw-border-spacing-x",e),j("border-spacing","var(--tw-border-spacing-x) var(--tw-border-spacing-y)")])),i("border-spacing-y",["--border-spacing","--spacing"],(e=>[l(),j("--tw-border-spacing-y",e),j("border-spacing","var(--tw-border-spacing-x) var(--tw-border-spacing-y)")])),o("origin",{themeKeys:["--transform-origin"],handle:e=>[j("transform-origin",e)],staticValues:{center:[j("transform-origin","center")],top:[j("transform-origin","top")],"top-right":[j("transform-origin","100% 0")],right:[j("transform-origin","100%")],"bottom-right":[j("transform-origin","100% 100%")],bottom:[j("transform-origin","bottom")],"bottom-left":[j("transform-origin","0 100%")],left:[j("transform-origin","0")],"top-left":[j("transform-origin","0 0")]}}),o("perspective-origin",{themeKeys:["--perspective-origin"],handle:e=>[j("perspective-origin",e)],staticValues:{center:[j("perspective-origin","center")],top:[j("perspective-origin","top")],"top-right":[j("perspective-origin","100% 0")],right:[j("perspective-origin","100%")],"bottom-right":[j("perspective-origin","100% 100%")],bottom:[j("perspective-origin","bottom")],"bottom-left":[j("perspective-origin","0 100%")],left:[j("perspective-origin","0")],"top-left":[j("perspective-origin","0 0")]}}),o("perspective",{themeKeys:["--perspective"],handle:e=>[j("perspective",e)],staticValues:{none:[j("perspective","none")]}});let s=()=>K([Re("--tw-translate-x","0"),Re("--tw-translate-y","0"),Re("--tw-translate-z","0")]);n("translate-none",[["translate","none"]]),n("-translate-full",[s,["--tw-translate-x","-100%"],["--tw-translate-y","-100%"],["translate","var(--tw-translate-x) var(--tw-translate-y)"]]),n("translate-full",[s,["--tw-translate-x","100%"],["--tw-translate-y","100%"],["translate","var(--tw-translate-x) var(--tw-translate-y)"]]),i("translate",["--translate","--spacing"],(e=>[s(),j("--tw-translate-x",e),j("--tw-translate-y",e),j("translate","var(--tw-translate-x) var(--tw-translate-y)")]),{supportsNegative:!0,supportsFractions:!0});for(let e of["x","y"])n(`-translate-${e}-full`,[s,[`--tw-translate-${e}`,"-100%"],["translate","var(--tw-translate-x) var(--tw-translate-y)"]]),n(`translate-${e}-full`,[s,[`--tw-translate-${e}`,"100%"],["translate","var(--tw-translate-x) var(--tw-translate-y)"]]),i(`translate-${e}`,["--translate","--spacing"],(t=>[s(),j(`--tw-translate-${e}`,t),j("translate","var(--tw-translate-x) var(--tw-translate-y)")]),{supportsNegative:!0,supportsFractions:!0});i("translate-z",["--translate","--spacing"],(e=>[s(),j("--tw-translate-z",e),j("translate","var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)")]),{supportsNegative:!0}),n("translate-3d",[s,["translate","var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"]]);let c=()=>K([Re("--tw-scale-x","1"),Re("--tw-scale-y","1"),Re("--tw-scale-z","1")]);function u({negative:t}){return r=>{if(!r.value||r.modifier)return;let n;return"arbitrary"===r.value.kind?(n=r.value.value,n=t?`calc(${n} * -1)`:n,[j("scale",n)]):(n=e.resolve(r.value.value,["--scale"]),!n&&je(r.value.value)&&(n=`${r.value.value}%`),n?(n=t?`calc(${n} * -1)`:n,[c(),j("--tw-scale-x",n),j("--tw-scale-y",n),j("--tw-scale-z",n),j("scale","var(--tw-scale-x) var(--tw-scale-y)")]):void 0)}}n("scale-none",[["scale","none"]]),t.functional("-scale",u({negative:!0})),t.functional("scale",u({negative:!1})),r("scale",(()=>[{supportsNegative:!0,values:["0","50","75","90","95","100","105","110","125","150","200"],valueThemeKeys:["--scale"]}]));for(let e of["x","y","z"])o(`scale-${e}`,{supportsNegative:!0,themeKeys:["--scale"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:t=>[c(),j(`--tw-scale-${e}`,t),j("scale","var(--tw-scale-x) var(--tw-scale-y)"+("z"===e?" var(--tw-scale-z)":""))]}),r(`scale-${e}`,(()=>[{supportsNegative:!0,values:["0","50","75","90","95","100","105","110","125","150","200"],valueThemeKeys:["--scale"]}]));function d({negative:t}){return r=>{if(!r.value||r.modifier)return;let n;if("arbitrary"===r.value.kind){n=r.value.value;let e=r.value.dataType??pe(n,["angle","vector"]);if("vector"===e)return[j("rotate",`${n} var(--tw-rotate)`)];if("angle"!==e)return[j("rotate",t?`calc(${n} * -1)`:n)]}else if(n=e.resolve(r.value.value,["--rotate"]),!n&&je(r.value.value)&&(n=`${r.value.value}deg`),!n)return;return[j("rotate",t?`calc(${n} * -1)`:n)]}}n("scale-3d",[c,["scale","var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"]]),n("rotate-none",[["rotate","none"]]),t.functional("-rotate",d({negative:!0})),t.functional("rotate",d({negative:!1})),r("rotate",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12","45","90","180"],valueThemeKeys:["--rotate"]}]));{let e=["var(--tw-rotate-x,)","var(--tw-rotate-y,)","var(--tw-rotate-z,)","var(--tw-skew-x,)","var(--tw-skew-y,)"].join(" "),a=()=>K([Re("--tw-rotate-x"),Re("--tw-rotate-y"),Re("--tw-rotate-z"),Re("--tw-skew-x"),Re("--tw-skew-y")]);for(let t of["x","y","z"])o(`rotate-${t}`,{supportsNegative:!0,themeKeys:["--rotate"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:r=>[a(),j(`--tw-rotate-${t}`,`rotate${t.toUpperCase()}(${r})`),j("transform",e)]}),r(`rotate-${t}`,(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12","45","90","180"],valueThemeKeys:["--rotate"]}]));o("skew",{supportsNegative:!0,themeKeys:["--skew"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:t=>[a(),j("--tw-skew-x",`skewX(${t})`),j("--tw-skew-y",`skewY(${t})`),j("transform",e)]}),o("skew-x",{supportsNegative:!0,themeKeys:["--skew"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:t=>[a(),j("--tw-skew-x",`skewX(${t})`),j("transform",e)]}),o("skew-y",{supportsNegative:!0,themeKeys:["--skew"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:t=>[a(),j("--tw-skew-y",`skewY(${t})`),j("transform",e)]}),r("skew",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12"],valueThemeKeys:["--skew"]}])),r("skew-x",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12"],valueThemeKeys:["--skew"]}])),r("skew-y",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12"],valueThemeKeys:["--skew"]}])),t.functional("transform",(t=>{if(t.modifier)return;let r=null;return t.value?"arbitrary"===t.value.kind&&(r=t.value.value):r=e,null!==r?[a(),j("transform",r)]:void 0})),r("transform",(()=>[{hasDefaultValue:!0}])),n("transform-cpu",[["transform",e]]),n("transform-gpu",[["transform",`translateZ(0) ${e}`]]),n("transform-none",[["transform","none"]])}o("zoom",{handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[j("zoom",e)]}),r("zoom",(()=>[{values:["50","75","90","95","100","105","110","125","150","200"]}])),n("transform-flat",[["transform-style","flat"]]),n("transform-3d",[["transform-style","preserve-3d"]]),n("transform-content",[["transform-box","content-box"]]),n("transform-border",[["transform-box","border-box"]]),n("transform-fill",[["transform-box","fill-box"]]),n("transform-stroke",[["transform-box","stroke-box"]]),n("transform-view",[["transform-box","view-box"]]),n("backface-visible",[["backface-visibility","visible"]]),n("backface-hidden",[["backface-visibility","hidden"]]);for(let e of["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out"])n(`cursor-${e}`,[["cursor",e]]);o("cursor",{themeKeys:["--cursor"],handle:e=>[j("cursor",e)]});for(let e of["auto","none","manipulation"])n(`touch-${e}`,[["touch-action",e]]);let f=()=>K([Re("--tw-pan-x"),Re("--tw-pan-y"),Re("--tw-pinch-zoom")]);for(let e of["x","left","right"])n(`touch-pan-${e}`,[f,["--tw-pan-x",`pan-${e}`],["touch-action","var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]);for(let e of["y","up","down"])n(`touch-pan-${e}`,[f,["--tw-pan-y",`pan-${e}`],["touch-action","var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]);n("touch-pinch-zoom",[f,["--tw-pinch-zoom","pinch-zoom"],["touch-action","var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]);for(let e of["none","text","all","auto"])n(`select-${e}`,[["-webkit-user-select",e],["user-select",e]]);n("resize-none",[["resize","none"]]),n("resize-x",[["resize","horizontal"]]),n("resize-y",[["resize","vertical"]]),n("resize",[["resize","both"]]),n("snap-none",[["scroll-snap-type","none"]]);let p=()=>K([Re("--tw-scroll-snap-strictness","proximity","*")]);for(let e of["x","y","both"])n(`snap-${e}`,[p,["scroll-snap-type",`${e} var(--tw-scroll-snap-strictness)`]]);n("snap-mandatory",[p,["--tw-scroll-snap-strictness","mandatory"]]),n("snap-proximity",[p,["--tw-scroll-snap-strictness","proximity"]]),n("snap-align-none",[["scroll-snap-align","none"]]),n("snap-start",[["scroll-snap-align","start"]]),n("snap-end",[["scroll-snap-align","end"]]),n("snap-center",[["scroll-snap-align","center"]]),n("snap-normal",[["scroll-snap-stop","normal"]]),n("snap-always",[["scroll-snap-stop","always"]]);for(let[e,t]of[["scroll-m","scroll-margin"],["scroll-mx","scroll-margin-inline"],["scroll-my","scroll-margin-block"],["scroll-ms","scroll-margin-inline-start"],["scroll-me","scroll-margin-inline-end"],["scroll-mbs","scroll-margin-block-start"],["scroll-mbe","scroll-margin-block-end"],["scroll-mt","scroll-margin-top"],["scroll-mr","scroll-margin-right"],["scroll-mb","scroll-margin-bottom"],["scroll-ml","scroll-margin-left"]])i(e,["--scroll-margin","--spacing"],(e=>[j(t,e)]),{supportsNegative:!0});for(let[e,t]of[["scroll-p","scroll-padding"],["scroll-px","scroll-padding-inline"],["scroll-py","scroll-padding-block"],["scroll-ps","scroll-padding-inline-start"],["scroll-pe","scroll-padding-inline-end"],["scroll-pbs","scroll-padding-block-start"],["scroll-pbe","scroll-padding-block-end"],["scroll-pt","scroll-padding-top"],["scroll-pr","scroll-padding-right"],["scroll-pb","scroll-padding-bottom"],["scroll-pl","scroll-padding-left"]])i(e,["--scroll-padding","--spacing"],(e=>[j(t,e)]));n("list-inside",[["list-style-position","inside"]]),n("list-outside",[["list-style-position","outside"]]),o("list",{themeKeys:["--list-style-type"],handle:e=>[j("list-style-type",e)],staticValues:{none:[j("list-style-type","none")],disc:[j("list-style-type","disc")],decimal:[j("list-style-type","decimal")]}}),o("list-image",{themeKeys:["--list-style-image"],handle:e=>[j("list-style-image",e)],staticValues:{none:[j("list-style-image","none")]}}),n("appearance-none",[["appearance","none"]]),n("appearance-auto",[["appearance","auto"]]),n("scheme-normal",[["color-scheme","normal"]]),n("scheme-dark",[["color-scheme","dark"]]),n("scheme-light",[["color-scheme","light"]]),n("scheme-light-dark",[["color-scheme","light dark"]]),n("scheme-only-dark",[["color-scheme","only dark"]]),n("scheme-only-light",[["color-scheme","only light"]]),o("columns",{themeKeys:["--columns","--container"],handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("columns",e)],staticValues:{auto:[j("columns","auto")]}}),r("columns",(()=>[{values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:["--columns","--container"]}]));for(let e of["auto","avoid","all","avoid-page","page","left","right","column"])n(`break-before-${e}`,[["break-before",e]]);for(let e of["auto","avoid","avoid-page","avoid-column"])n(`break-inside-${e}`,[["break-inside",e]]);for(let e of["auto","avoid","all","avoid-page","page","left","right","column"])n(`break-after-${e}`,[["break-after",e]]);n("grid-flow-row",[["grid-auto-flow","row"]]),n("grid-flow-col",[["grid-auto-flow","column"]]),n("grid-flow-dense",[["grid-auto-flow","dense"]]),n("grid-flow-row-dense",[["grid-auto-flow","row dense"]]),n("grid-flow-col-dense",[["grid-auto-flow","column dense"]]),o("auto-cols",{themeKeys:["--grid-auto-columns"],handle:e=>[j("grid-auto-columns",e)],staticValues:{auto:[j("grid-auto-columns","auto")],min:[j("grid-auto-columns","min-content")],max:[j("grid-auto-columns","max-content")],fr:[j("grid-auto-columns","minmax(0, 1fr)")]}}),o("auto-rows",{themeKeys:["--grid-auto-rows"],handle:e=>[j("grid-auto-rows",e)],staticValues:{auto:[j("grid-auto-rows","auto")],min:[j("grid-auto-rows","min-content")],max:[j("grid-auto-rows","max-content")],fr:[j("grid-auto-rows","minmax(0, 1fr)")]}}),o("grid-cols",{themeKeys:["--grid-template-columns"],handleBareValue:({value:e})=>Te(e)?`repeat(${e}, minmax(0, 1fr))`:null,handle:e=>[j("grid-template-columns",e)],staticValues:{none:[j("grid-template-columns","none")],subgrid:[j("grid-template-columns","subgrid")]}}),o("grid-rows",{themeKeys:["--grid-template-rows"],handleBareValue:({value:e})=>Te(e)?`repeat(${e}, minmax(0, 1fr))`:null,handle:e=>[j("grid-template-rows",e)],staticValues:{none:[j("grid-template-rows","none")],subgrid:[j("grid-template-rows","subgrid")]}}),r("grid-cols",(()=>[{values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-template-columns"]}])),r("grid-rows",(()=>[{values:Array.from({length:12},((e,t)=>`${t+1}`)),valueThemeKeys:["--grid-template-rows"]}])),n("flex-row",[["flex-direction","row"]]),n("flex-row-reverse",[["flex-direction","row-reverse"]]),n("flex-col",[["flex-direction","column"]]),n("flex-col-reverse",[["flex-direction","column-reverse"]]),n("flex-nowrap",[["flex-nowrap","wrap"]]),n("flex-nowrap",[["flex-nowrap","nowrap"]]),n("flex-nowrap-reverse",[["flex-nowrap","wrap-reverse"]]),n("place-content-center",[["place-content","center"]]),n("place-content-start",[["place-content","start"]]),n("place-content-end",[["place-content","end"]]),n("place-content-center-safe",[["place-content","safe center"]]),n("place-content-end-safe",[["place-content","safe end"]]),n("place-content-between",[["place-content","space-between"]]),n("place-content-around",[["place-content","space-around"]]),n("place-content-evenly",[["place-content","space-evenly"]]),n("place-content-baseline",[["place-content","baseline"]]),n("place-content-stretch",[["place-content","stretch"]]),n("place-items-center",[["place-items","center"]]),n("place-items-start",[["place-items","start"]]),n("place-items-end",[["place-items","end"]]),n("place-items-center-safe",[["place-items","safe center"]]),n("place-items-end-safe",[["place-items","safe end"]]),n("place-items-baseline",[["place-items","baseline"]]),n("place-items-stretch",[["place-items","stretch"]]),n("content-normal",[["align-content","normal"]]),n("content-center",[["align-content","center"]]),n("content-start",[["align-content","flex-start"]]),n("content-end",[["align-content","flex-end"]]),n("content-center-safe",[["align-content","safe center"]]),n("content-end-safe",[["align-content","safe flex-end"]]),n("content-between",[["align-content","space-between"]]),n("content-around",[["align-content","space-around"]]),n("content-evenly",[["align-content","space-evenly"]]),n("content-baseline",[["align-content","baseline"]]),n("content-stretch",[["align-content","stretch"]]),n("items-center",[["align-items","center"]]),n("items-start",[["align-items","flex-start"]]),n("items-end",[["align-items","flex-end"]]),n("items-center-safe",[["align-items","safe center"]]),n("items-end-safe",[["align-items","safe flex-end"]]),n("items-baseline",[["align-items","baseline"]]),n("items-baseline-last",[["align-items","last baseline"]]),n("items-stretch",[["align-items","stretch"]]),n("justify-normal",[["justify-content","normal"]]),n("justify-center",[["justify-content","center"]]),n("justify-start",[["justify-content","flex-start"]]),n("justify-end",[["justify-content","flex-end"]]),n("justify-center-safe",[["justify-content","safe center"]]),n("justify-end-safe",[["justify-content","safe flex-end"]]),n("justify-between",[["justify-content","space-between"]]),n("justify-around",[["justify-content","space-around"]]),n("justify-evenly",[["justify-content","space-evenly"]]),n("justify-baseline",[["justify-content","baseline"]]),n("justify-stretch",[["justify-content","stretch"]]),n("justify-items-normal",[["justify-items","normal"]]),n("justify-items-center",[["justify-items","center"]]),n("justify-items-start",[["justify-items","start"]]),n("justify-items-end",[["justify-items","end"]]),n("justify-items-center-safe",[["justify-items","safe center"]]),n("justify-items-end-safe",[["justify-items","safe end"]]),n("justify-items-stretch",[["justify-items","stretch"]]),i("gap",["--gap","--spacing"],(e=>[j("gap",e)])),i("gap-x",["--gap","--spacing"],(e=>[j("column-gap",e)])),i("gap-y",["--gap","--spacing"],(e=>[j("row-gap",e)])),i("space-x",["--space","--spacing"],(e=>[K([Re("--tw-space-x-reverse","0")]),A(":where(& > :not(:last-child))",[j("--tw-sort","row-gap"),j("--tw-space-x-reverse","0"),j("margin-inline-start",`calc(${e} * var(--tw-space-x-reverse))`),j("margin-inline-end",`calc(${e} * calc(1 - var(--tw-space-x-reverse)))`)])]),{supportsNegative:!0}),i("space-y",["--space","--spacing"],(e=>[K([Re("--tw-space-y-reverse","0")]),A(":where(& > :not(:last-child))",[j("--tw-sort","column-gap"),j("--tw-space-y-reverse","0"),j("margin-block-start",`calc(${e} * var(--tw-space-y-reverse))`),j("margin-block-end",`calc(${e} * calc(1 - var(--tw-space-y-reverse)))`)])]),{supportsNegative:!0}),n("space-x-reverse",[()=>K([Re("--tw-space-x-reverse","0")]),()=>A(":where(& > :not(:last-child))",[j("--tw-sort","row-gap"),j("--tw-space-x-reverse","1")])]),n("space-y-reverse",[()=>K([Re("--tw-space-y-reverse","0")]),()=>A(":where(& > :not(:last-child))",[j("--tw-sort","column-gap"),j("--tw-space-y-reverse","1")])]),n("accent-auto",[["accent-color","auto"]]),a("accent",{themeKeys:["--accent-color","--color"],handle:e=>[j("accent-color",e)]}),a("caret",{themeKeys:["--caret-color","--color"],handle:e=>[j("caret-color",e)]}),a("divide",{themeKeys:["--divide-color","--border-color","--color"],handle:e=>[A(":where(& > :not(:last-child))",[j("--tw-sort","divide-color"),j("border-color",e)])]}),n("place-self-auto",[["place-self","auto"]]),n("place-self-start",[["place-self","start"]]),n("place-self-end",[["place-self","end"]]),n("place-self-center",[["place-self","center"]]),n("place-self-end-safe",[["place-self","safe end"]]),n("place-self-center-safe",[["place-self","safe center"]]),n("place-self-stretch",[["place-self","stretch"]]),n("self-auto",[["align-self","auto"]]),n("self-start",[["align-self","flex-start"]]),n("self-end",[["align-self","flex-end"]]),n("self-center",[["align-self","center"]]),n("self-end-safe",[["align-self","safe flex-end"]]),n("self-center-safe",[["align-self","safe center"]]),n("self-stretch",[["align-self","stretch"]]),n("self-baseline",[["align-self","baseline"]]),n("self-baseline-last",[["align-self","last baseline"]]),n("justify-self-auto",[["justify-self","auto"]]),n("justify-self-start",[["justify-self","flex-start"]]),n("justify-self-end",[["justify-self","flex-end"]]),n("justify-self-center",[["justify-self","center"]]),n("justify-self-end-safe",[["justify-self","safe flex-end"]]),n("justify-self-center-safe",[["justify-self","safe center"]]),n("justify-self-stretch",[["justify-self","stretch"]]);for(let e of["auto","hidden","clip","visible","scroll"])n(`overflow-${e}`,[["overflow",e]]),n(`overflow-x-${e}`,[["overflow-x",e]]),n(`overflow-y-${e}`,[["overflow-y",e]]);for(let e of["auto","contain","none"])n(`overscroll-${e}`,[["overscroll-behavior",e]]),n(`overscroll-x-${e}`,[["overscroll-behavior-x",e]]),n(`overscroll-y-${e}`,[["overscroll-behavior-y",e]]);n("scroll-auto",[["scroll-behavior","auto"]]),n("scroll-smooth",[["scroll-behavior","smooth"]]),n("scrollbar-auto",[["scrollbar-width","auto"]]),n("scrollbar-thin",[["scrollbar-width","thin"]]),n("scrollbar-none",[["scrollbar-width","none"]]);{let e=()=>K([Re("--tw-scrollbar-thumb","#0000","<color>"),Re("--tw-scrollbar-track","#0000","<color>")]);a("scrollbar-thumb",{themeKeys:["--color"],handle:t=>[e(),j("--tw-scrollbar-thumb",t),j("scrollbar-color","var(--tw-scrollbar-thumb) var(--tw-scrollbar-track)")]}),a("scrollbar-track",{themeKeys:["--color"],handle:t=>[e(),j("--tw-scrollbar-track",t),j("scrollbar-color","var(--tw-scrollbar-thumb) var(--tw-scrollbar-track)")]})}n("scrollbar-gutter-auto",[["scrollbar-gutter","auto"]]),n("scrollbar-gutter-stable",[["scrollbar-gutter","stable"]]),n("scrollbar-gutter-both",[["scrollbar-gutter","stable both-edges"]]),n("truncate",[["overflow","hidden"],["text-overflow","ellipsis"],["white-space","nowrap"]]),n("text-ellipsis",[["text-overflow","ellipsis"]]),n("text-clip",[["text-overflow","clip"]]),n("hyphens-none",[["-webkit-hyphens","none"],["hyphens","none"]]),n("hyphens-manual",[["-webkit-hyphens","manual"],["hyphens","manual"]]),n("hyphens-auto",[["-webkit-hyphens","auto"],["hyphens","auto"]]),n("whitespace-normal",[["white-space","normal"]]),n("whitespace-nowrap",[["white-space","nowrap"]]),n("whitespace-pre",[["white-space","pre"]]),n("whitespace-pre-line",[["white-space","pre-line"]]),n("whitespace-pre-wrap",[["white-space","pre-wrap"]]),n("whitespace-break-spaces",[["white-space","break-spaces"]]),o("tab",{handleBareValue:({value:e})=>je(e)?e:null,handle:e=>[j("tab-size",e)]}),r("tab",(()=>[{values:["2","4","8"]}])),n("text-wrap",[["text-wrap","wrap"]]),n("text-nowrap",[["text-wrap","nowrap"]]),n("text-balance",[["text-wrap","balance"]]),n("text-pretty",[["text-wrap","pretty"]]),n("break-normal",[["overflow-wrap","normal"],["word-break","normal"]]),n("break-all",[["word-break","break-all"]]),n("break-keep",[["word-break","keep-all"]]),n("wrap-anywhere",[["overflow-wrap","anywhere"]]),n("wrap-break-word",[["overflow-wrap","break-word"]]),n("wrap-normal",[["overflow-wrap","normal"]]);for(let[e,t]of[["rounded",["border-radius"]],["rounded-s",["border-start-start-radius","border-end-start-radius"]],["rounded-e",["border-start-end-radius","border-end-end-radius"]],["rounded-t",["border-top-left-radius","border-top-right-radius"]],["rounded-r",["border-top-right-radius","border-bottom-right-radius"]],["rounded-b",["border-bottom-right-radius","border-bottom-left-radius"]],["rounded-l",["border-top-left-radius","border-bottom-left-radius"]],["rounded-ss",["border-start-start-radius"]],["rounded-se",["border-start-end-radius"]],["rounded-ee",["border-end-end-radius"]],["rounded-es",["border-end-start-radius"]],["rounded-tl",["border-top-left-radius"]],["rounded-tr",["border-top-right-radius"]],["rounded-br",["border-bottom-right-radius"]],["rounded-bl",["border-bottom-left-radius"]]])o(e,{themeKeys:["--radius"],handle:e=>t.map((t=>j(t,e))),staticValues:{none:t.map((e=>j(e,"0"))),full:t.map((e=>j(e,"calc(infinity * 1px)")))}});n("border-solid",[["--tw-border-style","solid"],["border-style","solid"]]),n("border-dashed",[["--tw-border-style","dashed"],["border-style","dashed"]]),n("border-dotted",[["--tw-border-style","dotted"],["border-style","dotted"]]),n("border-double",[["--tw-border-style","double"],["border-style","double"]]),n("border-hidden",[["--tw-border-style","hidden"],["border-style","hidden"]]),n("border-none",[["--tw-border-style","none"],["border-style","none"]]);{let a=function(n,o){t.functional(n,(t=>{if(!t.value){if(t.modifier)return;let r=e.get(["--default-border-width"])??"1px",n=o.width(r);return n?[i(),...n]:void 0}if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","line-width","length"])){case"line-width":case"length":{if(t.modifier)return;let e=o.width(r);return e?[i(),...e]:void 0}default:return r=Me(r,t.modifier,e),null===r?void 0:o.color(r)}}{let r=Be(t,e,["--border-color","--color"]);if(r)return o.color(r)}{if(t.modifier)return;let r=e.resolve(t.value.value,["--border-width"]);if(r){let e=o.width(r);return e?[i(),...e]:void 0}if(je(t.value.value)){let e=o.width(`${t.value.value}px`);return e?[i(),...e]:void 0}}})),r(n,(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--border-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t)),hasDefaultValue:!0},{values:["0","2","4","8"],valueThemeKeys:["--border-width"]}]))},i=()=>K([Re("--tw-border-style","solid")]);a("border",{width:e=>[j("border-style","var(--tw-border-style)"),j("border-width",e)],color:e=>[j("border-color",e)]}),a("border-x",{width:e=>[j("border-inline-style","var(--tw-border-style)"),j("border-inline-width",e)],color:e=>[j("border-inline-color",e)]}),a("border-y",{width:e=>[j("border-block-style","var(--tw-border-style)"),j("border-block-width",e)],color:e=>[j("border-block-color",e)]}),a("border-s",{width:e=>[j("border-inline-start-style","var(--tw-border-style)"),j("border-inline-start-width",e)],color:e=>[j("border-inline-start-color",e)]}),a("border-e",{width:e=>[j("border-inline-end-style","var(--tw-border-style)"),j("border-inline-end-width",e)],color:e=>[j("border-inline-end-color",e)]}),a("border-bs",{width:e=>[j("border-block-start-style","var(--tw-border-style)"),j("border-block-start-width",e)],color:e=>[j("border-block-start-color",e)]}),a("border-be",{width:e=>[j("border-block-end-style","var(--tw-border-style)"),j("border-block-end-width",e)],color:e=>[j("border-block-end-color",e)]}),a("border-t",{width:e=>[j("border-top-style","var(--tw-border-style)"),j("border-top-width",e)],color:e=>[j("border-top-color",e)]}),a("border-r",{width:e=>[j("border-right-style","var(--tw-border-style)"),j("border-right-width",e)],color:e=>[j("border-right-color",e)]}),a("border-b",{width:e=>[j("border-bottom-style","var(--tw-border-style)"),j("border-bottom-width",e)],color:e=>[j("border-bottom-color",e)]}),a("border-l",{width:e=>[j("border-left-style","var(--tw-border-style)"),j("border-left-width",e)],color:e=>[j("border-left-color",e)]}),o("divide-x",{defaultValue:e.get(["--default-border-width"])??"1px",themeKeys:["--divide-width","--border-width"],handleBareValue:({value:e})=>je(e)?`${e}px`:null,handle:e=>[K([Re("--tw-divide-x-reverse","0")]),A(":where(& > :not(:last-child))",[j("--tw-sort","divide-x-width"),i(),j("--tw-divide-x-reverse","0"),j("border-inline-style","var(--tw-border-style)"),j("border-inline-start-width",`calc(${e} * var(--tw-divide-x-reverse))`),j("border-inline-end-width",`calc(${e} * calc(1 - var(--tw-divide-x-reverse)))`)])]}),o("divide-y",{defaultValue:e.get(["--default-border-width"])??"1px",themeKeys:["--divide-width","--border-width"],handleBareValue:({value:e})=>je(e)?`${e}px`:null,handle:e=>[K([Re("--tw-divide-y-reverse","0")]),A(":where(& > :not(:last-child))",[j("--tw-sort","divide-y-width"),i(),j("--tw-divide-y-reverse","0"),j("border-bottom-style","var(--tw-border-style)"),j("border-top-style","var(--tw-border-style)"),j("border-top-width",`calc(${e} * var(--tw-divide-y-reverse))`),j("border-bottom-width",`calc(${e} * calc(1 - var(--tw-divide-y-reverse)))`)])]}),r("divide-x",(()=>[{values:["0","2","4","8"],valueThemeKeys:["--divide-width","--border-width"],hasDefaultValue:!0}])),r("divide-y",(()=>[{values:["0","2","4","8"],valueThemeKeys:["--divide-width","--border-width"],hasDefaultValue:!0}])),n("divide-x-reverse",[()=>K([Re("--tw-divide-x-reverse","0")]),()=>A(":where(& > :not(:last-child))",[j("--tw-divide-x-reverse","1")])]),n("divide-y-reverse",[()=>K([Re("--tw-divide-y-reverse","0")]),()=>A(":where(& > :not(:last-child))",[j("--tw-divide-y-reverse","1")])]);for(let e of["solid","dashed","dotted","double","none"])n(`divide-${e}`,[()=>A(":where(& > :not(:last-child))",[j("--tw-sort","divide-style"),j("--tw-border-style",e),j("border-style",e)])])}n("bg-auto",[["background-size","auto"]]),n("bg-cover",[["background-size","cover"]]),n("bg-contain",[["background-size","contain"]]),o("bg-size",{handle(e){if(e)return[j("background-size",e)]}}),n("bg-fixed",[["background-attachment","fixed"]]),n("bg-local",[["background-attachment","local"]]),n("bg-scroll",[["background-attachment","scroll"]]),n("bg-top",[["background-position","top"]]),n("bg-top-left",[["background-position","left top"]]),n("bg-top-right",[["background-position","right top"]]),n("bg-bottom",[["background-position","bottom"]]),n("bg-bottom-left",[["background-position","left bottom"]]),n("bg-bottom-right",[["background-position","right bottom"]]),n("bg-left",[["background-position","left"]]),n("bg-right",[["background-position","right"]]),n("bg-center",[["background-position","center"]]),o("bg-position",{handle(e){if(e)return[j("background-position",e)]}}),n("bg-repeat",[["background-repeat","repeat"]]),n("bg-no-repeat",[["background-repeat","no-repeat"]]),n("bg-repeat-x",[["background-repeat","repeat-x"]]),n("bg-repeat-y",[["background-repeat","repeat-y"]]),n("bg-repeat-round",[["background-repeat","round"]]),n("bg-repeat-space",[["background-repeat","space"]]),n("bg-none",[["background-image","none"]]);{let e=function(e){let t="in oklab";if("named"===e?.kind)switch(e.value){case"longer":case"shorter":case"increasing":case"decreasing":t=`in oklch ${e.value} hue`;break;default:t=`in ${e.value}`}else"arbitrary"===e?.kind&&(t=e.value);return t},n=function({negative:t}){return r=>{if(!r.value)return;if("arbitrary"===r.value.kind){if(r.modifier)return;let e=r.value.value;return"angle"===(r.value.dataType??pe(e,["angle"]))?(e=t?`calc(${e} * -1)`:`${e}`,[j("--tw-gradient-position",e),j("background-image",`linear-gradient(var(--tw-gradient-stops,${e}))`)]):t?void 0:[j("--tw-gradient-position",e),j("background-image",`linear-gradient(var(--tw-gradient-stops,${e}))`)]}let n=r.value.value;if(!t&&i.has(n))n=i.get(n);else{if(!je(n))return;n=t?`calc(${n}deg * -1)`:`${n}deg`}let o=e(r.modifier);return[j("--tw-gradient-position",`${n}`),C("@supports (background-image: linear-gradient(in lab, red, red))",[j("--tw-gradient-position",`${n} ${o}`)]),j("background-image","linear-gradient(var(--tw-gradient-stops))")]}},o=function({negative:t}){return r=>{if("arbitrary"===r.value?.kind){if(r.modifier)return;let e=r.value.value;return[j("--tw-gradient-position",e),j("background-image",`conic-gradient(var(--tw-gradient-stops,${e}))`)]}let n=e(r.modifier);if(!r.value)return[j("--tw-gradient-position",n),j("background-image","conic-gradient(var(--tw-gradient-stops))")];let o=r.value.value;return je(o)?(o=t?`calc(${o}deg * -1)`:`${o}deg`,[j("--tw-gradient-position",`from ${o} ${n}`),j("background-image","conic-gradient(var(--tw-gradient-stops))")]):void 0}},a=["oklab","oklch","srgb","hsl","longer","shorter","increasing","decreasing"],i=new Map([["to-t","to top"],["to-tr","to top right"],["to-r","to right"],["to-br","to bottom right"],["to-b","to bottom"],["to-bl","to bottom left"],["to-l","to left"],["to-tl","to top left"]]);t.functional("-bg-linear",n({negative:!0})),t.functional("bg-linear",n({negative:!1})),r("bg-linear",(()=>[{values:[...i.keys()],modifiers:a},{values:["0","30","60","90","120","150","180","210","240","270","300","330"],supportsNegative:!0,modifiers:a}])),t.functional("-bg-conic",o({negative:!0})),t.functional("bg-conic",o({negative:!1})),r("bg-conic",(()=>[{hasDefaultValue:!0,modifiers:a},{values:["0","30","60","90","120","150","180","210","240","270","300","330"],supportsNegative:!0,modifiers:a}])),t.functional("bg-radial",(t=>{if(!t.value)return[j("--tw-gradient-position",e(t.modifier)),j("background-image","radial-gradient(var(--tw-gradient-stops))")];if("arbitrary"===t.value.kind){if(t.modifier)return;let e=t.value.value;return[j("--tw-gradient-position",e),j("background-image",`radial-gradient(var(--tw-gradient-stops,${e}))`)]}})),r("bg-radial",(()=>[{hasDefaultValue:!0,modifiers:a}]))}t.functional("bg",(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["image","color","percentage","position","bg-size","length","url"])){case"percentage":case"position":return t.modifier?void 0:[j("background-position",r)];case"bg-size":case"length":case"size":return t.modifier?void 0:[j("background-size",r)];case"image":case"url":return t.modifier?void 0:[j("background-image",r)];default:return r=Me(r,t.modifier,e),null===r?void 0:[j("background-color",r)]}}{let r=Be(t,e,["--background-color","--color"]);if(r)return[j("background-color",r)]}{if(t.modifier)return;let r=e.resolve(t.value.value,["--background-image"]);if(r)return[j("background-image",r)]}}})),r("bg",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--background-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:[],valueThemeKeys:["--background-image"]}]));let h=()=>K([Re("--tw-gradient-position"),Re("--tw-gradient-from","#0000","<color>"),Re("--tw-gradient-via","#0000","<color>"),Re("--tw-gradient-to","#0000","<color>"),Re("--tw-gradient-stops"),Re("--tw-gradient-via-stops"),Re("--tw-gradient-from-position","0%","<length-percentage>"),Re("--tw-gradient-via-position","50%","<length-percentage>"),Re("--tw-gradient-to-position","100%","<length-percentage>")]);function m(n,o){t.functional(n,(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","length","percentage"])){case"length":case"percentage":return t.modifier?void 0:o.position(r);default:return r=Me(r,t.modifier,e),null===r?void 0:o.color(r)}}{let r=Be(t,e,["--background-color","--color"]);if(r)return o.color(r)}{if(t.modifier)return;let r=e.resolve(t.value.value,["--gradient-color-stop-positions"]);if(r)return o.position(r);if("%"===t.value.value[t.value.value.length-1]&&je(t.value.value.slice(0,-1)))return o.position(t.value.value)}}})),r(n,(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--background-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:Array.from({length:21},((e,t)=>5*t+"%")),valueThemeKeys:["--gradient-color-stop-positions"]}]))}m("from",{color:e=>[h(),j("--tw-sort","--tw-gradient-from"),j("--tw-gradient-from",e),j("--tw-gradient-stops","var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")],position:e=>[h(),j("--tw-gradient-from-position",e)]}),n("via-none",[["--tw-gradient-via-stops","initial"]]),m("via",{color:e=>[h(),j("--tw-sort","--tw-gradient-via"),j("--tw-gradient-via",e),j("--tw-gradient-via-stops","var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"),j("--tw-gradient-stops","var(--tw-gradient-via-stops)")],position:e=>[h(),j("--tw-gradient-via-position",e)]}),m("to",{color:e=>[h(),j("--tw-sort","--tw-gradient-to"),j("--tw-gradient-to",e),j("--tw-gradient-stops","var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")],position:e=>[h(),j("--tw-gradient-to-position",e)]}),n("mask-none",[["mask-image","none"]]),t.functional("mask",(e=>{if(!e.value||e.modifier||"arbitrary"!==e.value.kind)return;let t=e.value.value;switch(e.value.dataType??pe(t,["image","percentage","position","bg-size","length","url"])){case"percentage":case"position":return e.modifier?void 0:[j("mask-position",t)];case"bg-size":case"length":case"size":return[j("mask-size",t)];default:return[j("mask-image",t)]}})),n("mask-add",[["mask-composite","add"]]),n("mask-subtract",[["mask-composite","subtract"]]),n("mask-intersect",[["mask-composite","intersect"]]),n("mask-exclude",[["mask-composite","exclude"]]),n("mask-alpha",[["mask-mode","alpha"]]),n("mask-luminance",[["mask-mode","luminance"]]),n("mask-match",[["mask-mode","match-source"]]),n("mask-type-alpha",[["mask-type","alpha"]]),n("mask-type-luminance",[["mask-type","luminance"]]),n("mask-auto",[["mask-size","auto"]]),n("mask-cover",[["mask-size","cover"]]),n("mask-contain",[["mask-size","contain"]]),o("mask-size",{handle(e){if(e)return[j("mask-size",e)]}}),n("mask-top",[["mask-position","top"]]),n("mask-top-left",[["mask-position","left top"]]),n("mask-top-right",[["mask-position","right top"]]),n("mask-bottom",[["mask-position","bottom"]]),n("mask-bottom-left",[["mask-position","left bottom"]]),n("mask-bottom-right",[["mask-position","right bottom"]]),n("mask-left",[["mask-position","left"]]),n("mask-right",[["mask-position","right"]]),n("mask-center",[["mask-position","center"]]),o("mask-position",{handle(e){if(e)return[j("mask-position",e)]}}),n("mask-repeat",[["mask-repeat","repeat"]]),n("mask-no-repeat",[["mask-repeat","no-repeat"]]),n("mask-repeat-x",[["mask-repeat","repeat-x"]]),n("mask-repeat-y",[["mask-repeat","repeat-y"]]),n("mask-repeat-round",[["mask-repeat","round"]]),n("mask-repeat-space",[["mask-repeat","space"]]),n("mask-clip-border",[["mask-clip","border-box"]]),n("mask-clip-padding",[["mask-clip","padding-box"]]),n("mask-clip-content",[["mask-clip","content-box"]]),n("mask-clip-fill",[["mask-clip","fill-box"]]),n("mask-clip-stroke",[["mask-clip","stroke-box"]]),n("mask-clip-view",[["mask-clip","view-box"]]),n("mask-no-clip",[["mask-clip","no-clip"]]),n("mask-origin-border",[["mask-origin","border-box"]]),n("mask-origin-padding",[["mask-origin","padding-box"]]),n("mask-origin-content",[["mask-origin","content-box"]]),n("mask-origin-fill",[["mask-origin","fill-box"]]),n("mask-origin-stroke",[["mask-origin","stroke-box"]]),n("mask-origin-view",[["mask-origin","view-box"]]);let g=()=>K([Re("--tw-mask-linear","linear-gradient(#fff, #fff)"),Re("--tw-mask-radial","linear-gradient(#fff, #fff)"),Re("--tw-mask-conic","linear-gradient(#fff, #fff)")]);function v(n,o){t.functional(n,(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["length","percentage","color"])){case"color":return r=Me(r,t.modifier,e),null===r?void 0:o.color(r);case"percentage":return t.modifier||!je(r.slice(0,-1))?void 0:o.position(r);default:return t.modifier?void 0:o.position(r)}}{let r=Be(t,e,["--background-color","--color"]);if(r)return o.color(r)}{if(t.modifier)return;let r=pe(t.value.value,["number","percentage"]);if(!r)return;switch(r){case"number":{let r=e.resolve(null,["--spacing"]);return r&&Ve(t.value.value)?o.position(`calc(${r} * ${t.value.value})`):void 0}case"percentage":return je(t.value.value.slice(0,-1))?o.position(t.value.value):void 0;default:return}}}})),r(n,(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--background-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:Array.from({length:21},((e,t)=>5*t+"%")),valueThemeKeys:["--gradient-color-stop-positions"]}])),r(n,(()=>[{values:Array.from({length:21},((e,t)=>5*t+"%"))},{values:e.get(["--spacing"])?Ue:[]},{values:["current","inherit","transparent"],valueThemeKeys:["--background-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))}]))}let k=()=>K([Re("--tw-mask-left","linear-gradient(#fff, #fff)"),Re("--tw-mask-right","linear-gradient(#fff, #fff)"),Re("--tw-mask-bottom","linear-gradient(#fff, #fff)"),Re("--tw-mask-top","linear-gradient(#fff, #fff)")]);function w(e,t,r){v(e,{color(e){let n=[g(),k(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear","var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")];for(let o of["top","right","bottom","left"])r[o]&&(n.push(j(`--tw-mask-${o}`,`linear-gradient(to ${o}, var(--tw-mask-${o}-from-color) var(--tw-mask-${o}-from-position), var(--tw-mask-${o}-to-color) var(--tw-mask-${o}-to-position))`)),n.push(K([Re(`--tw-mask-${o}-from-position`,"0%"),Re(`--tw-mask-${o}-to-position`,"100%"),Re(`--tw-mask-${o}-from-color`,"black"),Re(`--tw-mask-${o}-to-color`,"transparent")])),n.push(j(`--tw-mask-${o}-${t}-color`,e)));return n},position(e){let n=[g(),k(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear","var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")];for(let o of["top","right","bottom","left"])r[o]&&(n.push(j(`--tw-mask-${o}`,`linear-gradient(to ${o}, var(--tw-mask-${o}-from-color) var(--tw-mask-${o}-from-position), var(--tw-mask-${o}-to-color) var(--tw-mask-${o}-to-position))`)),n.push(K([Re(`--tw-mask-${o}-from-position`,"0%"),Re(`--tw-mask-${o}-to-position`,"100%"),Re(`--tw-mask-${o}-from-color`,"black"),Re(`--tw-mask-${o}-to-color`,"transparent")])),n.push(j(`--tw-mask-${o}-${t}-position`,e)));return n}})}w("mask-x-from","from",{top:!1,right:!0,bottom:!1,left:!0}),w("mask-x-to","to",{top:!1,right:!0,bottom:!1,left:!0}),w("mask-y-from","from",{top:!0,right:!1,bottom:!0,left:!1}),w("mask-y-to","to",{top:!0,right:!1,bottom:!0,left:!1}),w("mask-t-from","from",{top:!0,right:!1,bottom:!1,left:!1}),w("mask-t-to","to",{top:!0,right:!1,bottom:!1,left:!1}),w("mask-r-from","from",{top:!1,right:!0,bottom:!1,left:!1}),w("mask-r-to","to",{top:!1,right:!0,bottom:!1,left:!1}),w("mask-b-from","from",{top:!1,right:!1,bottom:!0,left:!1}),w("mask-b-to","to",{top:!1,right:!1,bottom:!0,left:!1}),w("mask-l-from","from",{top:!1,right:!1,bottom:!1,left:!0}),w("mask-l-to","to",{top:!1,right:!1,bottom:!1,left:!0});let b=()=>K([Re("--tw-mask-linear-position","0deg"),Re("--tw-mask-linear-from-position","0%"),Re("--tw-mask-linear-to-position","100%"),Re("--tw-mask-linear-from-color","black"),Re("--tw-mask-linear-to-color","transparent")]);o("mask-linear",{defaultValue:null,supportsNegative:!0,supportsFractions:!1,handleBareValue:e=>je(e.value)?`calc(1deg * ${e.value})`:null,handleNegativeBareValue:e=>je(e.value)?`calc(1deg * -${e.value})`:null,handle:e=>[g(),b(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear","linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))"),j("--tw-mask-linear-position",e)]}),r("mask-linear",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12","45","90","180"]}])),v("mask-linear-from",{color:e=>[g(),b(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear-stops","var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"),j("--tw-mask-linear","linear-gradient(var(--tw-mask-linear-stops))"),j("--tw-mask-linear-from-color",e)],position:e=>[g(),b(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear-stops","var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"),j("--tw-mask-linear","linear-gradient(var(--tw-mask-linear-stops))"),j("--tw-mask-linear-from-position",e)]}),v("mask-linear-to",{color:e=>[g(),b(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear-stops","var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"),j("--tw-mask-linear","linear-gradient(var(--tw-mask-linear-stops))"),j("--tw-mask-linear-to-color",e)],position:e=>[g(),b(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-linear-stops","var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"),j("--tw-mask-linear","linear-gradient(var(--tw-mask-linear-stops))"),j("--tw-mask-linear-to-position",e)]});let y=()=>K([Re("--tw-mask-radial-from-position","0%"),Re("--tw-mask-radial-to-position","100%"),Re("--tw-mask-radial-from-color","black"),Re("--tw-mask-radial-to-color","transparent"),Re("--tw-mask-radial-shape","ellipse"),Re("--tw-mask-radial-size","farthest-corner"),Re("--tw-mask-radial-position","center")]);n("mask-circle",[["--tw-mask-radial-shape","circle"]]),n("mask-ellipse",[["--tw-mask-radial-shape","ellipse"]]),n("mask-radial-closest-side",[["--tw-mask-radial-size","closest-side"]]),n("mask-radial-farthest-side",[["--tw-mask-radial-size","farthest-side"]]),n("mask-radial-closest-corner",[["--tw-mask-radial-size","closest-corner"]]),n("mask-radial-farthest-corner",[["--tw-mask-radial-size","farthest-corner"]]),n("mask-radial-at-top",[["--tw-mask-radial-position","top"]]),n("mask-radial-at-top-left",[["--tw-mask-radial-position","top left"]]),n("mask-radial-at-top-right",[["--tw-mask-radial-position","top right"]]),n("mask-radial-at-bottom",[["--tw-mask-radial-position","bottom"]]),n("mask-radial-at-bottom-left",[["--tw-mask-radial-position","bottom left"]]),n("mask-radial-at-bottom-right",[["--tw-mask-radial-position","bottom right"]]),n("mask-radial-at-left",[["--tw-mask-radial-position","left"]]),n("mask-radial-at-right",[["--tw-mask-radial-position","right"]]),n("mask-radial-at-center",[["--tw-mask-radial-position","center"]]),o("mask-radial-at",{defaultValue:null,supportsNegative:!1,supportsFractions:!1,handle:e=>[j("--tw-mask-radial-position",e)]}),o("mask-radial",{defaultValue:null,supportsNegative:!1,supportsFractions:!1,handle:e=>[g(),y(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-radial","radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))"),j("--tw-mask-radial-size",e)]}),v("mask-radial-from",{color:e=>[g(),y(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-radial-stops","var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"),j("--tw-mask-radial","radial-gradient(var(--tw-mask-radial-stops))"),j("--tw-mask-radial-from-color",e)],position:e=>[g(),y(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-radial-stops","var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"),j("--tw-mask-radial","radial-gradient(var(--tw-mask-radial-stops))"),j("--tw-mask-radial-from-position",e)]}),v("mask-radial-to",{color:e=>[g(),y(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-radial-stops","var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"),j("--tw-mask-radial","radial-gradient(var(--tw-mask-radial-stops))"),j("--tw-mask-radial-to-color",e)],position:e=>[g(),y(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-radial-stops","var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"),j("--tw-mask-radial","radial-gradient(var(--tw-mask-radial-stops))"),j("--tw-mask-radial-to-position",e)]});let x=()=>K([Re("--tw-mask-conic-position","0deg"),Re("--tw-mask-conic-from-position","0%"),Re("--tw-mask-conic-to-position","100%"),Re("--tw-mask-conic-from-color","black"),Re("--tw-mask-conic-to-color","transparent")]);o("mask-conic",{defaultValue:null,supportsNegative:!0,supportsFractions:!1,handleBareValue:e=>je(e.value)?`calc(1deg * ${e.value})`:null,handleNegativeBareValue:e=>je(e.value)?`calc(1deg * -${e.value})`:null,handle:e=>[g(),x(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-conic","conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))"),j("--tw-mask-conic-position",e)]}),r("mask-conic",(()=>[{supportsNegative:!0,values:["0","1","2","3","6","12","45","90","180"]}])),v("mask-conic-from",{color:e=>[g(),x(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-conic-stops","from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"),j("--tw-mask-conic","conic-gradient(var(--tw-mask-conic-stops))"),j("--tw-mask-conic-from-color",e)],position:e=>[g(),x(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-conic-stops","from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"),j("--tw-mask-conic","conic-gradient(var(--tw-mask-conic-stops))"),j("--tw-mask-conic-from-position",e)]}),v("mask-conic-to",{color:e=>[g(),x(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-conic-stops","from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"),j("--tw-mask-conic","conic-gradient(var(--tw-mask-conic-stops))"),j("--tw-mask-conic-to-color",e)],position:e=>[g(),x(),j("mask-image","var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"),j("mask-composite","intersect"),j("--tw-mask-conic-stops","from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"),j("--tw-mask-conic","conic-gradient(var(--tw-mask-conic-stops))"),j("--tw-mask-conic-to-position",e)]}),n("box-decoration-slice",[["-webkit-box-decoration-break","slice"],["box-decoration-break","slice"]]),n("box-decoration-clone",[["-webkit-box-decoration-break","clone"],["box-decoration-break","clone"]]),n("bg-clip-text",[["background-clip","text"]]),n("bg-clip-border",[["background-clip","border-box"]]),n("bg-clip-padding",[["background-clip","padding-box"]]),n("bg-clip-content",[["background-clip","content-box"]]),n("bg-origin-border",[["background-origin","border-box"]]),n("bg-origin-padding",[["background-origin","padding-box"]]),n("bg-origin-content",[["background-origin","content-box"]]);for(let e of["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"])n(`bg-blend-${e}`,[["background-blend-mode",e]]),n(`mix-blend-${e}`,[["mix-blend-mode",e]]);n("mix-blend-plus-darker",[["mix-blend-mode","plus-darker"]]),n("mix-blend-plus-lighter",[["mix-blend-mode","plus-lighter"]]),n("fill-none",[["fill","none"]]),t.functional("fill",(t=>{if(!t.value)return;if("arbitrary"===t.value.kind){let r=Me(t.value.value,t.modifier,e);return null===r?void 0:[j("fill",r)]}let r=Be(t,e,["--fill","--color"]);return r?[j("fill",r)]:void 0})),r("fill",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--fill","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))}])),n("stroke-none",[["stroke","none"]]),t.functional("stroke",(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","number","length","percentage"])){case"number":case"length":case"percentage":return t.modifier?void 0:[j("stroke-width",r)];default:return r=Me(t.value.value,t.modifier,e),null===r?void 0:[j("stroke",r)]}}{let r=Be(t,e,["--stroke","--color"]);if(r)return[j("stroke",r)]}{let r=e.resolve(t.value.value,["--stroke-width"]);if(r)return[j("stroke-width",r)];if(je(t.value.value))return[j("stroke-width",t.value.value)]}}})),r("stroke",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--stroke","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["0","1","2","3"],valueThemeKeys:["--stroke-width"]}])),n("object-contain",[["object-fit","contain"]]),n("object-cover",[["object-fit","cover"]]),n("object-fill",[["object-fit","fill"]]),n("object-none",[["object-fit","none"]]),n("object-scale-down",[["object-fit","scale-down"]]),o("object",{themeKeys:["--object-position"],handle:e=>[j("object-position",e)],staticValues:{top:[j("object-position","top")],"top-left":[j("object-position","left top")],"top-right":[j("object-position","right top")],bottom:[j("object-position","bottom")],"bottom-left":[j("object-position","left bottom")],"bottom-right":[j("object-position","right bottom")],left:[j("object-position","left")],right:[j("object-position","right")],center:[j("object-position","center")]}});for(let[e,t]of[["p","padding"],["px","padding-inline"],["py","padding-block"],["ps","padding-inline-start"],["pe","padding-inline-end"],["pbs","padding-block-start"],["pbe","padding-block-end"],["pt","padding-top"],["pr","padding-right"],["pb","padding-bottom"],["pl","padding-left"]])i(e,["--padding","--spacing"],(e=>[j(t,e)]));n("text-left",[["text-align","left"]]),n("text-center",[["text-align","center"]]),n("text-right",[["text-align","right"]]),n("text-justify",[["text-align","justify"]]),n("text-start",[["text-align","start"]]),n("text-end",[["text-align","end"]]),i("indent",["--text-indent","--spacing"],(e=>[j("text-indent",e)]),{supportsNegative:!0}),n("align-baseline",[["vertical-align","baseline"]]),n("align-top",[["vertical-align","top"]]),n("align-middle",[["vertical-align","middle"]]),n("align-bottom",[["vertical-align","bottom"]]),n("align-text-top",[["vertical-align","text-top"]]),n("align-text-bottom",[["vertical-align","text-bottom"]]),n("align-sub",[["vertical-align","sub"]]),n("align-super",[["vertical-align","super"]]),o("align",{themeKeys:[],handle:e=>[j("vertical-align",e)]}),t.functional("font",(t=>{if(t.value&&!t.modifier){if("arbitrary"===t.value.kind){let e=t.value.value;switch(t.value.dataType??pe(e,["number","generic-name","family-name"])){case"generic-name":case"family-name":return[j("font-family",e)];default:return[K([Re("--tw-font-weight")]),j("--tw-font-weight",e),j("font-weight",e)]}}{let r=e.resolveWith(t.value.value,["--font"],["--font-feature-settings","--font-variation-settings"]);if(r){let[e,t={}]=r;return[j("font-family",e),j("font-feature-settings",t["--font-feature-settings"]),j("font-variation-settings",t["--font-variation-settings"])]}}{let r=e.resolve(t.value.value,["--font-weight"]);if(r)return[K([Re("--tw-font-weight")]),j("--tw-font-weight",r),j("font-weight",r)]}}})),r("font",(()=>[{values:[],valueThemeKeys:["--font"]},{values:[],valueThemeKeys:["--font-weight"]}])),o("font-features",{themeKeys:[],handle:e=>[j("font-feature-settings",e)]}),n("uppercase",[["text-transform","uppercase"]]),n("lowercase",[["text-transform","lowercase"]]),n("capitalize",[["text-transform","capitalize"]]),n("normal-case",[["text-transform","none"]]),n("italic",[["font-style","italic"]]),n("not-italic",[["font-style","normal"]]),n("underline",[["text-decoration-line","underline"]]),n("overline",[["text-decoration-line","overline"]]),n("line-through",[["text-decoration-line","line-through"]]),n("no-underline",[["text-decoration-line","none"]]),n("font-stretch-normal",[["font-stretch","normal"]]),n("font-stretch-ultra-condensed",[["font-stretch","ultra-condensed"]]),n("font-stretch-extra-condensed",[["font-stretch","extra-condensed"]]),n("font-stretch-condensed",[["font-stretch","condensed"]]),n("font-stretch-semi-condensed",[["font-stretch","semi-condensed"]]),n("font-stretch-semi-expanded",[["font-stretch","semi-expanded"]]),n("font-stretch-expanded",[["font-stretch","expanded"]]),n("font-stretch-extra-expanded",[["font-stretch","extra-expanded"]]),n("font-stretch-ultra-expanded",[["font-stretch","ultra-expanded"]]),o("font-stretch",{handleBareValue:({value:e})=>{if(!e.endsWith("%"))return null;let t=Number(e.slice(0,-1));return!je(t)||Number.isNaN(t)||t<50||t>200?null:e},handle:e=>[j("font-stretch",e)]}),r("font-stretch",(()=>[{values:["50%","75%","90%","95%","100%","105%","110%","125%","150%","200%"]}])),a("placeholder",{themeKeys:["--placeholder-color","--color"],handle:e=>[A("&::placeholder",[j("--tw-sort","placeholder-color"),j("color",e)])]}),n("decoration-solid",[["text-decoration-style","solid"]]),n("decoration-double",[["text-decoration-style","double"]]),n("decoration-dotted",[["text-decoration-style","dotted"]]),n("decoration-dashed",[["text-decoration-style","dashed"]]),n("decoration-wavy",[["text-decoration-style","wavy"]]),n("decoration-auto",[["text-decoration-thickness","auto"]]),n("decoration-from-font",[["text-decoration-thickness","from-font"]]),t.functional("decoration",(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","length","percentage"])){case"length":case"percentage":return t.modifier?void 0:[j("text-decoration-thickness",r)];default:return r=Me(r,t.modifier,e),null===r?void 0:[j("text-decoration-color",r)]}}{let r=e.resolve(t.value.value,["--text-decoration-thickness"]);if(r)return t.modifier?void 0:[j("text-decoration-thickness",r)];if(je(t.value.value))return t.modifier?void 0:[j("text-decoration-thickness",`${t.value.value}px`)]}{let r=Be(t,e,["--text-decoration-color","--color"]);if(r)return[j("text-decoration-color",r)]}}})),r("decoration",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--text-decoration-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["0","1","2"],valueThemeKeys:["--text-decoration-thickness"]}])),o("animate",{themeKeys:["--animate"],handle:e=>[j("animation",e)],staticValues:{none:[j("animation","none")]}});{let a=["var(--tw-blur,)","var(--tw-brightness,)","var(--tw-contrast,)","var(--tw-grayscale,)","var(--tw-hue-rotate,)","var(--tw-invert,)","var(--tw-saturate,)","var(--tw-sepia,)","var(--tw-drop-shadow,)"].join(" "),i=["var(--tw-backdrop-blur,)","var(--tw-backdrop-brightness,)","var(--tw-backdrop-contrast,)","var(--tw-backdrop-grayscale,)","var(--tw-backdrop-hue-rotate,)","var(--tw-backdrop-invert,)","var(--tw-backdrop-opacity,)","var(--tw-backdrop-saturate,)","var(--tw-backdrop-sepia,)"].join(" "),l=()=>K([Re("--tw-blur"),Re("--tw-brightness"),Re("--tw-contrast"),Re("--tw-grayscale"),Re("--tw-hue-rotate"),Re("--tw-invert"),Re("--tw-opacity"),Re("--tw-saturate"),Re("--tw-sepia"),Re("--tw-drop-shadow"),Re("--tw-drop-shadow-color"),Re("--tw-drop-shadow-alpha","100%","<percentage>"),Re("--tw-drop-shadow-size")]),s=()=>K([Re("--tw-backdrop-blur"),Re("--tw-backdrop-brightness"),Re("--tw-backdrop-contrast"),Re("--tw-backdrop-grayscale"),Re("--tw-backdrop-hue-rotate"),Re("--tw-backdrop-invert"),Re("--tw-backdrop-opacity"),Re("--tw-backdrop-saturate"),Re("--tw-backdrop-sepia")]);t.functional("filter",(e=>{if(!e.modifier){if(null===e.value)return[l(),j("filter",a)];if("arbitrary"===e.value.kind)return[j("filter",e.value.value)];if("none"===e.value.value)return[j("filter","none")]}})),t.functional("backdrop-filter",(e=>{if(!e.modifier){if(null===e.value)return[s(),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)];if("arbitrary"===e.value.kind)return[j("-webkit-backdrop-filter",e.value.value),j("backdrop-filter",e.value.value)];if("none"===e.value.value)return[j("-webkit-backdrop-filter","none"),j("backdrop-filter","none")]}})),o("blur",{themeKeys:["--blur"],handle:e=>[l(),j("--tw-blur",`blur(${e})`),j("filter",a)],staticValues:{none:[l(),j("--tw-blur"," "),j("filter",a)]}}),o("backdrop-blur",{themeKeys:["--backdrop-blur","--blur"],handle:e=>[s(),j("--tw-backdrop-blur",`blur(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)],staticValues:{none:[s(),j("--tw-backdrop-blur"," "),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}}),o("brightness",{themeKeys:["--brightness"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[l(),j("--tw-brightness",`brightness(${e})`),j("filter",a)]}),o("backdrop-brightness",{themeKeys:["--backdrop-brightness","--brightness"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[s(),j("--tw-backdrop-brightness",`brightness(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("brightness",(()=>[{values:["0","50","75","90","95","100","105","110","125","150","200"],valueThemeKeys:["--brightness"]}])),r("backdrop-brightness",(()=>[{values:["0","50","75","90","95","100","105","110","125","150","200"],valueThemeKeys:["--backdrop-brightness","--brightness"]}])),o("contrast",{themeKeys:["--contrast"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[l(),j("--tw-contrast",`contrast(${e})`),j("filter",a)]}),o("backdrop-contrast",{themeKeys:["--backdrop-contrast","--contrast"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[s(),j("--tw-backdrop-contrast",`contrast(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("contrast",(()=>[{values:["0","50","75","100","125","150","200"],valueThemeKeys:["--contrast"]}])),r("backdrop-contrast",(()=>[{values:["0","50","75","100","125","150","200"],valueThemeKeys:["--backdrop-contrast","--contrast"]}])),o("grayscale",{themeKeys:["--grayscale"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[l(),j("--tw-grayscale",`grayscale(${e})`),j("filter",a)]}),o("backdrop-grayscale",{themeKeys:["--backdrop-grayscale","--grayscale"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[s(),j("--tw-backdrop-grayscale",`grayscale(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("grayscale",(()=>[{values:["0","25","50","75","100"],valueThemeKeys:["--grayscale"],hasDefaultValue:!0}])),r("backdrop-grayscale",(()=>[{values:["0","25","50","75","100"],valueThemeKeys:["--backdrop-grayscale","--grayscale"],hasDefaultValue:!0}])),o("hue-rotate",{supportsNegative:!0,themeKeys:["--hue-rotate"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:e=>[l(),j("--tw-hue-rotate",`hue-rotate(${e})`),j("filter",a)]}),o("backdrop-hue-rotate",{supportsNegative:!0,themeKeys:["--backdrop-hue-rotate","--hue-rotate"],handleBareValue:({value:e})=>je(e)?`${e}deg`:null,handle:e=>[s(),j("--tw-backdrop-hue-rotate",`hue-rotate(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("hue-rotate",(()=>[{values:["0","15","30","60","90","180"],valueThemeKeys:["--hue-rotate"]}])),r("backdrop-hue-rotate",(()=>[{values:["0","15","30","60","90","180"],valueThemeKeys:["--backdrop-hue-rotate","--hue-rotate"]}])),o("invert",{themeKeys:["--invert"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[l(),j("--tw-invert",`invert(${e})`),j("filter",a)]}),o("backdrop-invert",{themeKeys:["--backdrop-invert","--invert"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[s(),j("--tw-backdrop-invert",`invert(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("invert",(()=>[{values:["0","25","50","75","100"],valueThemeKeys:["--invert"],hasDefaultValue:!0}])),r("backdrop-invert",(()=>[{values:["0","25","50","75","100"],valueThemeKeys:["--backdrop-invert","--invert"],hasDefaultValue:!0}])),o("saturate",{themeKeys:["--saturate"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[l(),j("--tw-saturate",`saturate(${e})`),j("filter",a)]}),o("backdrop-saturate",{themeKeys:["--backdrop-saturate","--saturate"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,handle:e=>[s(),j("--tw-backdrop-saturate",`saturate(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("saturate",(()=>[{values:["0","50","100","150","200"],valueThemeKeys:["--saturate"]}])),r("backdrop-saturate",(()=>[{values:["0","50","100","150","200"],valueThemeKeys:["--backdrop-saturate","--saturate"]}])),o("sepia",{themeKeys:["--sepia"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[l(),j("--tw-sepia",`sepia(${e})`),j("filter",a)]}),o("backdrop-sepia",{themeKeys:["--backdrop-sepia","--sepia"],handleBareValue:({value:e})=>je(e)?`${e}%`:null,defaultValue:"100%",handle:e=>[s(),j("--tw-backdrop-sepia",`sepia(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("sepia",(()=>[{values:["0","50","100"],valueThemeKeys:["--sepia"],hasDefaultValue:!0}])),r("backdrop-sepia",(()=>[{values:["0","50","100"],valueThemeKeys:["--backdrop-sepia","--sepia"],hasDefaultValue:!0}])),n("drop-shadow-none",[l,["--tw-drop-shadow"," "],["filter",a]]),t.functional("drop-shadow",(t=>{let r;if(t.modifier&&("arbitrary"===t.modifier.kind?r=t.modifier.value:je(t.modifier.value)&&(r=`${t.modifier.value}%`)),!t.value){let t=e.get(["--drop-shadow"]),n=e.resolve(null,["--drop-shadow"]);return null===t||null===n?void 0:[l(),j("--tw-drop-shadow-alpha",r),...Ze("--tw-drop-shadow-size",t,r,(e=>`var(--tw-drop-shadow-color, ${e})`)),j("--tw-drop-shadow",Y(n,",").map((e=>`drop-shadow(${e})`)).join(" ")),j("filter",a)]}if("arbitrary"===t.value.kind){let n=t.value.value;return"color"===(t.value.dataType??pe(n,["color"]))?(n=Me(n,t.modifier,e),null===n?void 0:[l(),j("--tw-drop-shadow-color",De(n,"var(--tw-drop-shadow-alpha)")),j("--tw-drop-shadow","var(--tw-drop-shadow-size)")]):t.modifier&&!r?void 0:[l(),j("--tw-drop-shadow-alpha",r),...Ze("--tw-drop-shadow-size",n,r,(e=>`var(--tw-drop-shadow-color, ${e})`)),j("--tw-drop-shadow","var(--tw-drop-shadow-size)"),j("filter",a)]}{let n=e.get([`--drop-shadow-${t.value.value}`]),o=e.resolve(t.value.value,["--drop-shadow"]);if(n&&o)return t.modifier&&!r?void 0:r?[l(),j("--tw-drop-shadow-alpha",r),...Ze("--tw-drop-shadow-size",n,r,(e=>`var(--tw-drop-shadow-color, ${e})`)),j("--tw-drop-shadow","var(--tw-drop-shadow-size)"),j("filter",a)]:[l(),j("--tw-drop-shadow-alpha",r),...Ze("--tw-drop-shadow-size",n,r,(e=>`var(--tw-drop-shadow-color, ${e})`)),j("--tw-drop-shadow",Y(o,",").map((e=>`drop-shadow(${e})`)).join(" ")),j("filter",a)]}{let r=Be(t,e,["--drop-shadow-color","--color"]);if(r)return"inherit"===r?[l(),j("--tw-drop-shadow-color","inherit"),j("--tw-drop-shadow","var(--tw-drop-shadow-size)")]:[l(),j("--tw-drop-shadow-color",De(r,"var(--tw-drop-shadow-alpha)")),j("--tw-drop-shadow","var(--tw-drop-shadow-size)")]}})),r("drop-shadow",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--drop-shadow-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{valueThemeKeys:["--drop-shadow"]}])),o("backdrop-opacity",{themeKeys:["--backdrop-opacity","--opacity"],handleBareValue:({value:e})=>Ke(e)?`${e}%`:null,handle:e=>[s(),j("--tw-backdrop-opacity",`opacity(${e})`),j("-webkit-backdrop-filter",i),j("backdrop-filter",i)]}),r("backdrop-opacity",(()=>[{values:Array.from({length:21},((e,t)=>""+5*t)),valueThemeKeys:["--backdrop-opacity","--opacity"]}]))}{let a=`var(--tw-ease, ${e.resolve(null,["--default-transition-timing-function"])??"ease"})`,i=`var(--tw-duration, ${e.resolve(null,["--default-transition-duration"])??"0s"})`;o("transition",{defaultValue:"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events",themeKeys:["--transition-property"],handle:e=>[j("transition-property",e),j("transition-timing-function",a),j("transition-duration",i)],staticValues:{none:[j("transition-property","none")],all:[j("transition-property","all"),j("transition-timing-function",a),j("transition-duration",i)],colors:[j("transition-property","color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to"),j("transition-timing-function",a),j("transition-duration",i)],opacity:[j("transition-property","opacity"),j("transition-timing-function",a),j("transition-duration",i)],shadow:[j("transition-property","box-shadow"),j("transition-timing-function",a),j("transition-duration",i)],transform:[j("transition-property","transform, translate, scale, rotate"),j("transition-timing-function",a),j("transition-duration",i)]}}),n("transition-discrete",[["transition-behavior","allow-discrete"]]),n("transition-normal",[["transition-behavior","normal"]]),o("delay",{handleBareValue:({value:e})=>je(e)?`${e}ms`:null,themeKeys:["--transition-delay"],handle:e=>[j("transition-delay",e)]});{let r=()=>K([Re("--tw-duration")]);n("duration-initial",[r,["--tw-duration","initial"]]),t.functional("duration",(t=>{if(t.modifier||!t.value)return;let n=null;return"arbitrary"===t.value.kind?n=t.value.value:(n=e.resolve(t.value.fraction??t.value.value,["--transition-duration"]),null===n&&je(t.value.value)&&(n=`${t.value.value}ms`)),null!==n?[r(),j("--tw-duration",n),j("transition-duration",n)]:void 0}))}r("delay",(()=>[{values:["75","100","150","200","300","500","700","1000"],valueThemeKeys:["--transition-delay"]}])),r("duration",(()=>[{values:["75","100","150","200","300","500","700","1000"],valueThemeKeys:["--transition-duration"]}]))}{let e=()=>K([Re("--tw-ease")]);o("ease",{themeKeys:["--ease"],handle:t=>[e(),j("--tw-ease",t),j("transition-timing-function",t)],staticValues:{initial:[e(),j("--tw-ease","initial")],linear:[e(),j("--tw-ease","linear"),j("transition-timing-function","linear")]}})}n("will-change-auto",[["will-change","auto"]]),n("will-change-scroll",[["will-change","scroll-position"]]),n("will-change-contents",[["will-change","contents"]]),n("will-change-transform",[["will-change","transform"]]),o("will-change",{themeKeys:[],handle:e=>[j("will-change",e)]}),n("content-none",[["--tw-content","none"],["content","none"]]),o("content",{themeKeys:["--content"],handle:e=>[K([Re("--tw-content",'""')]),j("--tw-content",e),j("content","var(--tw-content)")]});{let e="var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)",t=()=>K([Re("--tw-contain-size"),Re("--tw-contain-layout"),Re("--tw-contain-paint"),Re("--tw-contain-style")]);n("contain-none",[["contain","none"]]),n("contain-content",[["contain","content"]]),n("contain-strict",[["contain","strict"]]),n("contain-size",[t,["--tw-contain-size","size"],["contain",e]]),n("contain-inline-size",[t,["--tw-contain-size","inline-size"],["contain",e]]),n("contain-layout",[t,["--tw-contain-layout","layout"],["contain",e]]),n("contain-paint",[t,["--tw-contain-paint","paint"],["contain",e]]),n("contain-style",[t,["--tw-contain-style","style"],["contain",e]]),o("contain",{themeKeys:[],handle:e=>[j("contain",e)]})}n("forced-color-adjust-none",[["forced-color-adjust","none"]]),n("forced-color-adjust-auto",[["forced-color-adjust","auto"]]),i("leading",["--leading","--spacing"],(e=>[K([Re("--tw-leading")]),j("--tw-leading",e),j("line-height",e)]),{staticValues:{none:[K([Re("--tw-leading")]),j("--tw-leading","1"),j("line-height","1")]}}),o("tracking",{supportsNegative:!0,themeKeys:["--tracking"],handle:e=>[K([Re("--tw-tracking")]),j("--tw-tracking",e),j("letter-spacing",e)]}),n("antialiased",[["-webkit-font-smoothing","antialiased"],["-moz-osx-font-smoothing","grayscale"]]),n("subpixel-antialiased",[["-webkit-font-smoothing","auto"],["-moz-osx-font-smoothing","auto"]]);{let e="var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",t=()=>K([Re("--tw-ordinal"),Re("--tw-slashed-zero"),Re("--tw-numeric-figure"),Re("--tw-numeric-spacing"),Re("--tw-numeric-fraction")]);n("normal-nums",[["font-variant-numeric","normal"]]),n("ordinal",[t,["--tw-ordinal","ordinal"],["font-variant-numeric",e]]),n("slashed-zero",[t,["--tw-slashed-zero","slashed-zero"],["font-variant-numeric",e]]),n("lining-nums",[t,["--tw-numeric-figure","lining-nums"],["font-variant-numeric",e]]),n("oldstyle-nums",[t,["--tw-numeric-figure","oldstyle-nums"],["font-variant-numeric",e]]),n("proportional-nums",[t,["--tw-numeric-spacing","proportional-nums"],["font-variant-numeric",e]]),n("tabular-nums",[t,["--tw-numeric-spacing","tabular-nums"],["font-variant-numeric",e]]),n("diagonal-fractions",[t,["--tw-numeric-fraction","diagonal-fractions"],["font-variant-numeric",e]]),n("stacked-fractions",[t,["--tw-numeric-fraction","stacked-fractions"],["font-variant-numeric",e]])}{let a=()=>K([Re("--tw-outline-style","solid")]);t.static("outline-hidden",(()=>[j("--tw-outline-style","none"),j("outline-style","none"),S("@media","(forced-colors: active)",[j("outline","2px solid transparent"),j("outline-offset","2px")])])),n("outline-none",[["--tw-outline-style","none"],["outline-style","none"]]),n("outline-solid",[["--tw-outline-style","solid"],["outline-style","solid"]]),n("outline-dashed",[["--tw-outline-style","dashed"],["outline-style","dashed"]]),n("outline-dotted",[["--tw-outline-style","dotted"],["outline-style","dotted"]]),n("outline-double",[["--tw-outline-style","double"],["outline-style","double"]]),t.functional("outline",(t=>{if(null===t.value){if(t.modifier)return;let r=e.get(["--default-outline-width"])??"1px";return[a(),j("outline-style","var(--tw-outline-style)"),j("outline-width",r)]}if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","length","number","percentage"])){case"length":case"number":case"percentage":return t.modifier?void 0:[a(),j("outline-style","var(--tw-outline-style)"),j("outline-width",r)];default:return r=Me(r,t.modifier,e),null===r?void 0:[j("outline-color",r)]}}{let r=Be(t,e,["--outline-color","--color"]);if(r)return[j("outline-color",r)]}{if(t.modifier)return;let r=e.resolve(t.value.value,["--outline-width"]);if(r)return[a(),j("outline-style","var(--tw-outline-style)"),j("outline-width",r)];if(je(t.value.value))return[a(),j("outline-style","var(--tw-outline-style)"),j("outline-width",`${t.value.value}px`)]}})),r("outline",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--outline-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t)),hasDefaultValue:!0},{values:["0","1","2","4","8"],valueThemeKeys:["--outline-width"]}])),o("outline-offset",{supportsNegative:!0,themeKeys:["--outline-offset"],handleBareValue:({value:e})=>je(e)?`${e}px`:null,handle:e=>[j("outline-offset",e)]}),r("outline-offset",(()=>[{supportsNegative:!0,values:["0","1","2","4","8"],valueThemeKeys:["--outline-offset"]}]))}o("opacity",{themeKeys:["--opacity"],handleBareValue:({value:e})=>Ke(e)?`${e}%`:null,handle:e=>[j("opacity",e)]}),r("opacity",(()=>[{values:Array.from({length:21},((e,t)=>""+5*t)),valueThemeKeys:["--opacity"]}])),o("underline-offset",{supportsNegative:!0,themeKeys:["--text-underline-offset"],handleBareValue:({value:e})=>je(e)?`${e}px`:null,handle:e=>[j("text-underline-offset",e)],staticValues:{auto:[j("text-underline-offset","auto")]}}),r("underline-offset",(()=>[{supportsNegative:!0,values:["0","1","2","4","8"],valueThemeKeys:["--text-underline-offset"]}])),t.functional("text",(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;switch(t.value.dataType??pe(r,["color","length","percentage","absolute-size","relative-size"])){case"size":case"length":case"percentage":case"absolute-size":case"relative-size":if(t.modifier){let n="arbitrary"===t.modifier.kind?t.modifier.value:e.resolve(t.modifier.value,["--leading"]);if(!n&&Ve(t.modifier.value)){let r=e.resolve(null,["--spacing"]);if(!r)return null;n=`calc(${r} * ${t.modifier.value})`}return!n&&"none"===t.modifier.value&&(n="1"),n?[j("font-size",r),j("line-height",n)]:null}return[j("font-size",r)];default:return r=Me(r,t.modifier,e),null===r?void 0:[j("color",r)]}}{let r=Be(t,e,["--text-color","--color"]);if(r)return[j("color",r)]}{let r=e.resolveWith(t.value.value,["--text"],["--line-height","--letter-spacing","--font-weight"]);if(r){let[n,o={}]=Array.isArray(r)?r:[r];if(t.modifier){let r="arbitrary"===t.modifier.kind?t.modifier.value:e.resolve(t.modifier.value,["--leading"]);if(!r&&Ve(t.modifier.value)){let n=e.resolve(null,["--spacing"]);if(!n)return null;r=`calc(${n} * ${t.modifier.value})`}if(!r&&"none"===t.modifier.value&&(r="1"),!r)return null;let o=[j("font-size",n)];return r&&o.push(j("line-height",r)),o}return"string"==typeof o?[j("font-size",n),j("line-height",o)]:[j("font-size",n),j("line-height",o["--line-height"]?`var(--tw-leading, ${o["--line-height"]})`:void 0),j("letter-spacing",o["--letter-spacing"]?`var(--tw-tracking, ${o["--letter-spacing"]})`:void 0),j("font-weight",o["--font-weight"]?`var(--tw-font-weight, ${o["--font-weight"]})`:void 0)]}}}})),r("text",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--text-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:[],valueThemeKeys:["--text"],modifiers:[],modifierThemeKeys:["--leading"]}]));let $=()=>K([Re("--tw-text-shadow-color"),Re("--tw-text-shadow-alpha","100%","<percentage>")]);n("text-shadow-initial",[$,["--tw-text-shadow-color","initial"]]),t.functional("text-shadow",(t=>{let r;if(t.modifier&&("arbitrary"===t.modifier.kind?r=t.modifier.value:je(t.modifier.value)&&(r=`${t.modifier.value}%`)),!t.value){let t=e.get(["--text-shadow"]);return null===t?void 0:[$(),j("--tw-text-shadow-alpha",r),...He("text-shadow",t,r,(e=>`var(--tw-text-shadow-color, ${e})`))]}if("arbitrary"===t.value.kind){let n=t.value.value;return"color"===(t.value.dataType??pe(n,["color"]))?(n=Me(n,t.modifier,e),null===n?void 0:[$(),j("--tw-text-shadow-color",De(n,"var(--tw-text-shadow-alpha)"))]):[$(),j("--tw-text-shadow-alpha",r),...He("text-shadow",n,r,(e=>`var(--tw-text-shadow-color, ${e})`))]}switch(t.value.value){case"none":return t.modifier?void 0:[$(),j("text-shadow","none")];case"inherit":return t.modifier?void 0:[$(),j("--tw-text-shadow-color","inherit")]}{let n=e.get([`--text-shadow-${t.value.value}`]);if(n)return[$(),j("--tw-text-shadow-alpha",r),...He("text-shadow",n,r,(e=>`var(--tw-text-shadow-color, ${e})`))]}{let r=Be(t,e,["--text-shadow-color","--color"]);if(r)return[$(),j("--tw-text-shadow-color",De(r,"var(--tw-text-shadow-alpha)"))]}})),r("text-shadow",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--text-shadow-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["none"]},{valueThemeKeys:["--text-shadow"],modifiers:Array.from({length:21},((e,t)=>""+5*t)),hasDefaultValue:null!==e.get(["--text-shadow"])}]));{let o=function(e){return`var(--tw-ring-inset,) 0 0 0 calc(${e} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${c})`},a=function(e){return`inset 0 0 0 ${e} var(--tw-inset-ring-color, currentcolor)`},i=["var(--tw-inset-shadow)","var(--tw-inset-ring-shadow)","var(--tw-ring-offset-shadow)","var(--tw-ring-shadow)","var(--tw-shadow)"].join(", "),l="0 0 #0000",s=()=>K([Re("--tw-shadow",l),Re("--tw-shadow-color"),Re("--tw-shadow-alpha","100%","<percentage>"),Re("--tw-inset-shadow",l),Re("--tw-inset-shadow-color"),Re("--tw-inset-shadow-alpha","100%","<percentage>"),Re("--tw-ring-color"),Re("--tw-ring-shadow",l),Re("--tw-inset-ring-color"),Re("--tw-inset-ring-shadow",l),Re("--tw-ring-inset"),Re("--tw-ring-offset-width","0px","<length>"),Re("--tw-ring-offset-color","#fff"),Re("--tw-ring-offset-shadow",l)]);n("shadow-initial",[s,["--tw-shadow-color","initial"]]),t.functional("shadow",(t=>{let r;if(t.modifier&&("arbitrary"===t.modifier.kind?r=t.modifier.value:je(t.modifier.value)&&(r=`${t.modifier.value}%`)),!t.value){let t=e.get(["--shadow"]);return null===t?void 0:[s(),j("--tw-shadow-alpha",r),...He("--tw-shadow",t,r,(e=>`var(--tw-shadow-color, ${e})`)),j("box-shadow",i)]}if("arbitrary"===t.value.kind){let n=t.value.value;return"color"===(t.value.dataType??pe(n,["color"]))?(n=Me(n,t.modifier,e),null===n?void 0:[s(),j("--tw-shadow-color",De(n,"var(--tw-shadow-alpha)"))]):[s(),j("--tw-shadow-alpha",r),...He("--tw-shadow",n,r,(e=>`var(--tw-shadow-color, ${e})`)),j("box-shadow",i)]}switch(t.value.value){case"none":return t.modifier?void 0:[s(),j("--tw-shadow",l),j("box-shadow",i)];case"inherit":return t.modifier?void 0:[s(),j("--tw-shadow-color","inherit")]}{let n=e.get([`--shadow-${t.value.value}`]);if(n)return[s(),j("--tw-shadow-alpha",r),...He("--tw-shadow",n,r,(e=>`var(--tw-shadow-color, ${e})`)),j("box-shadow",i)]}{let r=Be(t,e,["--box-shadow-color","--color"]);if(r)return[s(),j("--tw-shadow-color",De(r,"var(--tw-shadow-alpha)"))]}})),r("shadow",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--box-shadow-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["none"]},{valueThemeKeys:["--shadow"],modifiers:Array.from({length:21},((e,t)=>""+5*t)),hasDefaultValue:null!==e.get(["--shadow"])}])),n("inset-shadow-initial",[s,["--tw-inset-shadow-color","initial"]]),t.functional("inset-shadow",(t=>{let r;if(t.modifier&&("arbitrary"===t.modifier.kind?r=t.modifier.value:je(t.modifier.value)&&(r=`${t.modifier.value}%`)),!t.value){let t=e.get(["--inset-shadow"]);return null===t?void 0:[s(),j("--tw-inset-shadow-alpha",r),...He("--tw-inset-shadow",t,r,(e=>`var(--tw-inset-shadow-color, ${e})`)),j("box-shadow",i)]}if("arbitrary"===t.value.kind){let n=t.value.value;return"color"===(t.value.dataType??pe(n,["color"]))?(n=Me(n,t.modifier,e),null===n?void 0:[s(),j("--tw-inset-shadow-color",De(n,"var(--tw-inset-shadow-alpha)"))]):[s(),j("--tw-inset-shadow-alpha",r),...He("--tw-inset-shadow",n,r,(e=>`var(--tw-inset-shadow-color, ${e})`),"inset"),j("box-shadow",i)]}switch(t.value.value){case"none":return t.modifier?void 0:[s(),j("--tw-inset-shadow",l),j("box-shadow",i)];case"inherit":return t.modifier?void 0:[s(),j("--tw-inset-shadow-color","inherit")]}{let n=e.get([`--inset-shadow-${t.value.value}`]);if(n)return[s(),j("--tw-inset-shadow-alpha",r),...He("--tw-inset-shadow",n,r,(e=>`var(--tw-inset-shadow-color, ${e})`)),j("box-shadow",i)]}{let r=Be(t,e,["--box-shadow-color","--color"]);if(r)return[s(),j("--tw-inset-shadow-color",De(r,"var(--tw-inset-shadow-alpha)"))]}})),r("inset-shadow",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--box-shadow-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["none"]},{valueThemeKeys:["--inset-shadow"],modifiers:Array.from({length:21},((e,t)=>""+5*t)),hasDefaultValue:null!==e.get(["--inset-shadow"])}])),n("ring-inset",[s,["--tw-ring-inset","inset"]]);let c=e.get(["--default-ring-color"])??"currentcolor";t.functional("ring",(t=>{if(!t.value){if(t.modifier)return;let r=e.get(["--default-ring-width"])??"1px";return[s(),j("--tw-ring-shadow",o(r)),j("box-shadow",i)]}if("arbitrary"===t.value.kind){let r=t.value.value;return"length"===(t.value.dataType??pe(r,["color","length"]))?t.modifier?void 0:[s(),j("--tw-ring-shadow",o(r)),j("box-shadow",i)]:(r=Me(r,t.modifier,e),null===r?void 0:[j("--tw-ring-color",r)])}{let r=Be(t,e,["--ring-color","--color"]);if(r)return[j("--tw-ring-color",r)]}{if(t.modifier)return;let r=e.resolve(t.value.value,["--ring-width"]);if(null===r&&je(t.value.value)&&(r=`${t.value.value}px`),r)return[s(),j("--tw-ring-shadow",o(r)),j("box-shadow",i)]}})),r("ring",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--ring-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["0","1","2","4","8"],valueThemeKeys:["--ring-width"],hasDefaultValue:!0}])),t.functional("inset-ring",(t=>{if(!t.value)return t.modifier?void 0:[s(),j("--tw-inset-ring-shadow",a("1px")),j("box-shadow",i)];if("arbitrary"===t.value.kind){let r=t.value.value;return"length"===(t.value.dataType??pe(r,["color","length"]))?t.modifier?void 0:[s(),j("--tw-inset-ring-shadow",a(r)),j("box-shadow",i)]:(r=Me(r,t.modifier,e),null===r?void 0:[j("--tw-inset-ring-color",r)])}{let r=Be(t,e,["--ring-color","--color"]);if(r)return[j("--tw-inset-ring-color",r)]}{if(t.modifier)return;let r=e.resolve(t.value.value,["--ring-width"]);if(null===r&&je(t.value.value)&&(r=`${t.value.value}px`),r)return[s(),j("--tw-inset-ring-shadow",a(r)),j("box-shadow",i)]}})),r("inset-ring",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--ring-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["0","1","2","4","8"],valueThemeKeys:["--ring-width"],hasDefaultValue:!0}]));let u="var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)";t.functional("ring-offset",(t=>{if(t.value){if("arbitrary"===t.value.kind){let r=t.value.value;return"length"===(t.value.dataType??pe(r,["color","length"]))?t.modifier?void 0:[j("--tw-ring-offset-width",r),j("--tw-ring-offset-shadow",u)]:(r=Me(r,t.modifier,e),null===r?void 0:[j("--tw-ring-offset-color",r)])}{let r=e.resolve(t.value.value,["--ring-offset-width"]);if(r)return t.modifier?void 0:[j("--tw-ring-offset-width",r),j("--tw-ring-offset-shadow",u)];if(je(t.value.value))return t.modifier?void 0:[j("--tw-ring-offset-width",`${t.value.value}px`),j("--tw-ring-offset-shadow",u)]}{let r=Be(t,e,["--ring-offset-color","--color"]);if(r)return[j("--tw-ring-offset-color",r)]}}}))}return r("ring-offset",(()=>[{values:["current","inherit","transparent"],valueThemeKeys:["--ring-offset-color","--color"],modifiers:Array.from({length:21},((e,t)=>""+5*t))},{values:["0","1","2","4","8"],valueThemeKeys:["--ring-offset-width"]}])),t.functional("@container",(e=>{let t=null;if(null===e.value?t="inline-size":"arbitrary"===e.value.kind?t=e.value.value:"named"===e.value.kind&&"normal"===e.value.value?t="normal":"named"===e.value.kind&&"size"===e.value.value&&(t="size"),null!==t)return e.modifier?[j("container-type",t),j("container-name",e.modifier.value)]:[j("container-type",t)]})),r("@container",(()=>[{values:["normal"],valueThemeKeys:[],hasDefaultValue:!0}])),t}(e),n=function(e){let t=new ft;function r(e,r,{compounds:n}={}){n=n??pt(r),t.static(e,(e=>{e.nodes=r.map((t=>C(t,e.nodes)))}),{compounds:n})}function n(e,t){return t.map((t=>{let r=Y(t=t.trim()," ");return"not"===r[0]?r.slice(1).join(" "):"@container"===e?"("===r[0][0]?`not ${t}`:"not"===r[1]?`${r[0]} ${r.slice(2).join(" ")}`:`${r[0]} not ${r.slice(1).join(" ")}`:`not ${t}`}))}r("*",[":is(& > *)"],{compounds:0}),r("**",[":is(& *)"],{compounds:0});let o=["@media","@supports","@container"];function a(e){for(let t of o){if(t!==e.name)continue;let r=Y(e.params,",");return r.length>1?null:(r=n(e.name,r),S(e.name,r.join(", ")))}return null}function i(e){return e.includes("::")?null:`&:not(${Y(e,",").map((e=>e.replaceAll("&","*"))).join(", ")})`}t.compound("not",3,((e,t)=>{if("arbitrary"===t.variant.kind&&t.variant.relative||t.modifier)return null;let r=!1;return y([e],((t,n)=>{if("rule"!==t.kind&&"at-rule"!==t.kind)return b.Continue;if(t.nodes.length>0)return b.Continue;let o=[],l=[],s=n.path();s.push(t);for(let e of s)"at-rule"===e.kind?o.push(e):"rule"===e.kind&&l.push(e);if(o.length>1)return b.Stop;if(l.length>1)return b.Stop;let c=[];for(let e of l){let t=i(e.selector);if(!t)return r=!1,b.Stop;c.push(A(t,[]))}for(let e of o){let t=a(e);if(!t)return r=!1,b.Stop;c.push(t)}return Object.assign(e,A("&",c)),r=!0,b.Skip})),"rule"===e.kind&&"&"===e.selector&&1===e.nodes.length&&Object.assign(e,e.nodes[0]),r?void 0:null})),t.suggest("not",(()=>Array.from(t.keys()).filter((e=>t.compoundsWith("not",e))))),t.compound("group",2,((t,r)=>{if("arbitrary"===r.variant.kind&&r.variant.relative)return null;let n=r.modifier?`:where(.${e.prefix?`${e.prefix}\\:`:""}group\\/${r.modifier.value})`:`:where(.${e.prefix?`${e.prefix}\\:`:""}group)`,o=!1;return y([t],((e,t)=>{if("rule"!==e.kind)return b.Continue;for(let e of t.path())if("rule"===e.kind)return o=!1,b.Stop;let r=e.selector.replaceAll("&",n);Y(r,",").length>1&&(r=`:is(${r})`),e.selector=`&:is(${r} *)`,o=!0})),o?void 0:null})),t.suggest("group",(()=>Array.from(t.keys()).filter((e=>t.compoundsWith("group",e))))),t.compound("peer",2,((t,r)=>{if("arbitrary"===r.variant.kind&&r.variant.relative)return null;let n=r.modifier?`:where(.${e.prefix?`${e.prefix}\\:`:""}peer\\/${r.modifier.value})`:`:where(.${e.prefix?`${e.prefix}\\:`:""}peer)`,o=!1;return y([t],((e,t)=>{if("rule"!==e.kind)return b.Continue;for(let e of t.path())if("rule"===e.kind)return o=!1,b.Stop;let r=e.selector.replaceAll("&",n);Y(r,",").length>1&&(r=`:is(${r})`),e.selector=`&:is(${r} ~ *)`,o=!0})),o?void 0:null})),t.suggest("peer",(()=>Array.from(t.keys()).filter((e=>t.compoundsWith("peer",e))))),r("first-letter",["&::first-letter"]),r("first-line",["&::first-line"]),r("marker",["& *::marker","&::marker","& *::-webkit-details-marker","&::-webkit-details-marker"]),r("selection",["& *::selection","&::selection"]),r("file",["&::file-selector-button"]),r("placeholder",["&::placeholder"]),r("backdrop",["&::backdrop"]),r("details-content",["&::details-content"]);{let e=function(){return K([S("@property","--tw-content",[j("syntax",'"*"'),j("initial-value",'""'),j("inherits","false")])])};t.static("before",(t=>{t.nodes=[A("&::before",[e(),j("content","var(--tw-content)"),...t.nodes])]}),{compounds:0}),t.static("after",(t=>{t.nodes=[A("&::after",[e(),j("content","var(--tw-content)"),...t.nodes])]}),{compounds:0})}r("first",["&:first-child"]),r("last",["&:last-child"]),r("only",["&:only-child"]),r("odd",["&:nth-child(odd)"]),r("even",["&:nth-child(even)"]),r("first-of-type",["&:first-of-type"]),r("last-of-type",["&:last-of-type"]),r("only-of-type",["&:only-of-type"]),r("visited",["&:visited"]),r("target",["&:target"]),r("open",["&:is([open], :popover-open, :open)"]),r("default",["&:default"]),r("checked",["&:checked"]),r("indeterminate",["&:indeterminate"]),r("placeholder-shown",["&:placeholder-shown"]),r("autofill",["&:autofill"]),r("optional",["&:optional"]),r("required",["&:required"]),r("valid",["&:valid"]),r("invalid",["&:invalid"]),r("user-valid",["&:user-valid"]),r("user-invalid",["&:user-invalid"]),r("in-range",["&:in-range"]),r("out-of-range",["&:out-of-range"]),r("read-only",["&:read-only"]),r("empty",["&:empty"]),r("focus-within",["&:focus-within"]),t.static("hover",(e=>{e.nodes=[A("&:hover",[S("@media","(hover: hover)",e.nodes)])]})),r("focus",["&:focus"]),r("focus-visible",["&:focus-visible"]),r("active",["&:active"]),r("enabled",["&:enabled"]),r("disabled",["&:disabled"]),r("inert",["&:is([inert], [inert] *)"]),t.compound("in",2,((e,t)=>{if(t.modifier)return null;let r=!1;return y([e],((e,t)=>{if("rule"!==e.kind)return b.Continue;for(let e of t.path())if("rule"===e.kind)return r=!1,b.Stop;e.selector=`:where(${e.selector.replaceAll("&","*")}) &`,r=!0})),r?void 0:null})),t.suggest("in",(()=>Array.from(t.keys()).filter((e=>t.compoundsWith("in",e))))),t.compound("has",2,((e,t)=>{if(t.modifier)return null;let r=!1;return y([e],((e,t)=>{if("rule"!==e.kind)return b.Continue;for(let e of t.path())if("rule"===e.kind)return r=!1,b.Stop;e.selector=`&:has(${e.selector.replaceAll("&","*")})`,r=!0})),r?void 0:null})),t.suggest("has",(()=>Array.from(t.keys()).filter((e=>t.compoundsWith("has",e))))),t.functional("aria",((e,t)=>{if(!t.value||t.modifier)return null;"arbitrary"===t.value.kind?e.nodes=[A(`&[aria-${ht(t.value.value)}]`,e.nodes)]:e.nodes=[A(`&[aria-${t.value.value}="true"]`,e.nodes)]})),t.suggest("aria",(()=>["busy","checked","disabled","expanded","hidden","pressed","readonly","required","selected"])),t.functional("data",((e,t)=>{if(!t.value||t.modifier)return null;e.nodes=[A(`&[data-${ht(t.value.value)}]`,e.nodes)]})),t.functional("nth",((e,t)=>{if(!t.value||t.modifier||"named"===t.value.kind&&!je(t.value.value))return null;e.nodes=[A(`&:nth-child(${t.value.value})`,e.nodes)]})),t.functional("nth-last",((e,t)=>{if(!t.value||t.modifier||"named"===t.value.kind&&!je(t.value.value))return null;e.nodes=[A(`&:nth-last-child(${t.value.value})`,e.nodes)]})),t.functional("nth-of-type",((e,t)=>{if(!t.value||t.modifier||"named"===t.value.kind&&!je(t.value.value))return null;e.nodes=[A(`&:nth-of-type(${t.value.value})`,e.nodes)]})),t.functional("nth-last-of-type",((e,t)=>{if(!t.value||t.modifier||"named"===t.value.kind&&!je(t.value.value))return null;e.nodes=[A(`&:nth-last-of-type(${t.value.value})`,e.nodes)]})),t.functional("supports",((e,t)=>{if(!t.value||t.modifier)return null;let r=t.value.value;if(null===r)return null;if(/^[\w-]*\s*\(/.test(r)){let t=r.replace(/\b(and|or|not)\b/g," $1 ");e.nodes=[S("@supports",t,e.nodes)]}else r.includes(":")||(r=`${r}: var(--tw)`),("("!==r[0]||")"!==r[r.length-1])&&(r=`(${r})`),e.nodes=[S("@supports",r,e.nodes)]}),{compounds:1}),r("motion-safe",["@media (prefers-reduced-motion: no-preference)"]),r("motion-reduce",["@media (prefers-reduced-motion: reduce)"]),r("contrast-more",["@media (prefers-contrast: more)"]),r("contrast-less",["@media (prefers-contrast: less)"]);{let r=function(e,t,r,n){if(e===t)return 0;let o=n.get(e);if(null===o)return"asc"===r?-1:1;let a=n.get(t);return null===a?"asc"===r?1:-1:ce(o,a,r)};{let n=e.namespace("--breakpoint"),o=new f((t=>{switch(t.kind){case"static":return e.resolveValue(t.root,["--breakpoint"])??null;case"functional":{if(!t.value||t.modifier)return null;let r=null;return"arbitrary"===t.value.kind?r=t.value.value:"named"===t.value.kind&&(r=e.resolveValue(t.value.value,["--breakpoint"])),!r||r.includes("var(")?null:r}case"arbitrary":case"compound":return null}}));t.group((()=>{t.functional("max",((e,t)=>{if(t.modifier)return null;let r=o.get(t);if(null===r)return null;e.nodes=[S("@media",`(width < ${r})`,e.nodes)]}),{compounds:1})}),((e,t)=>r(e,t,"desc",o))),t.suggest("max",(()=>Array.from(n.keys()).filter((e=>null!==e)))),t.group((()=>{for(let[r,n]of e.namespace("--breakpoint"))null!==r&&t.static(r,(e=>{e.nodes=[S("@media",`(width >= ${n})`,e.nodes)]}),{compounds:1});t.functional("min",((e,t)=>{if(t.modifier)return null;let r=o.get(t);if(null===r)return null;e.nodes=[S("@media",`(width >= ${r})`,e.nodes)]}),{compounds:1})}),((e,t)=>r(e,t,"asc",o))),t.suggest("min",(()=>Array.from(n.keys()).filter((e=>null!==e))))}{let n=e.namespace("--container"),o=new f((t=>{switch(t.kind){case"functional":{if(null===t.value)return null;let r=null;return"arbitrary"===t.value.kind?r=t.value.value:"named"===t.value.kind&&(r=e.resolveValue(t.value.value,["--container"])),!r||r.includes("var(")?null:r}case"static":case"arbitrary":case"compound":return null}}));t.group((()=>{t.functional("@max",((e,t)=>{let r=o.get(t);if(null===r)return null;e.nodes=[S("@container",t.modifier?`${t.modifier.value} (width < ${r})`:`(width < ${r})`,e.nodes)]}),{compounds:1})}),((e,t)=>r(e,t,"desc",o))),t.suggest("@max",(()=>Array.from(n.keys()).filter((e=>null!==e)))),t.group((()=>{t.functional("@",((e,t)=>{let r=o.get(t);if(null===r)return null;e.nodes=[S("@container",t.modifier?`${t.modifier.value} (width >= ${r})`:`(width >= ${r})`,e.nodes)]}),{compounds:1}),t.functional("@min",((e,t)=>{let r=o.get(t);if(null===r)return null;e.nodes=[S("@container",t.modifier?`${t.modifier.value} (width >= ${r})`:`(width >= ${r})`,e.nodes)]}),{compounds:1})}),((e,t)=>r(e,t,"asc",o))),t.suggest("@min",(()=>Array.from(n.keys()).filter((e=>null!==e)))),t.suggest("@",(()=>Array.from(n.keys()).filter((e=>null!==e))))}}return r("portrait",["@media (orientation: portrait)"]),r("landscape",["@media (orientation: landscape)"]),r("ltr",['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),r("rtl",['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),r("dark",["@media (prefers-color-scheme: dark)"]),r("starting",["@starting-style"]),r("print",["@media print"]),r("forced-colors",["@media (forced-colors: active)"]),r("inverted-colors",["@media (inverted-colors: inverted)"]),r("pointer-none",["@media (pointer: none)"]),r("pointer-coarse",["@media (pointer: coarse)"]),r("pointer-fine",["@media (pointer: fine)"]),r("any-pointer-none",["@media (any-pointer: none)"]),r("any-pointer-coarse",["@media (any-pointer: coarse)"]),r("any-pointer-fine",["@media (any-pointer: fine)"]),r("noscript",["@media (scripting: none)"]),t}(e),o=new f((e=>function(e,t){if("["===e[0]&&"]"===e[e.length-1]){if("@"===e[1]&&e.includes("&"))return null;let t=B(e.slice(1,-1));if(!H(t)||0===t.length||0===t.trim().length)return null;let r=">"===t[0]||"+"===t[0]||"~"===t[0];return!r&&"@"!==t[0]&&!t.includes("&")&&(t=`&:is(${t})`),{kind:"arbitrary",selector:t,relative:r}}{let[r,n=null,o]=Y(e,"/");if(o)return null;let a=X(r,(e=>t.variants.has(e)));for(let[e,r]of a)switch(t.variants.kind(e)){case"static":return null!==r||null!==n?null:{kind:"static",root:e};case"functional":{let t=null===n?null:J(n);if(null!==n&&null===t)return null;if(null===r)return{kind:"functional",root:e,modifier:t,value:null};if("]"===r[r.length-1]){if("["!==r[0])continue;let n=B(r.slice(1,-1));return H(n)&&0!==n.length&&0!==n.trim().length?{kind:"functional",root:e,modifier:t,value:{kind:"arbitrary",value:n}}:null}if(")"===r[r.length-1]){if("("!==r[0])continue;let n=B(r.slice(1,-1));return H(n)&&0!==n.length&&0!==n.trim().length&&"-"===n[0]&&"-"===n[1]?{kind:"functional",root:e,modifier:t,value:{kind:"arbitrary",value:`var(${n})`}}:null}if(!G.test(r))continue;return{kind:"functional",root:e,modifier:t,value:{kind:"named",value:r}}}case"compound":{if(null===r)return null;n&&("not"===e||"has"===e||"in"===e)&&(r=`${r}/${n}`,n=null);let o=t.parseVariant(r);if(null===o||!t.variants.compoundsWith(e,o))return null;let a=null===n?null:J(n);return null!==n&&null===a?null:{kind:"compound",root:e,modifier:a,variant:o}}}}return null}(e,u))),a=new f((e=>Array.from(function*(e,t){let r=Y(e,":");if(t.theme.prefix){if(1===r.length||r[0]!==t.theme.prefix)return null;r.shift()}let n=r.pop(),o=[];for(let e=r.length-1;e>=0;--e){let n=t.parseVariant(r[e]);if(null===n)return;o.push(n)}let a=!1;"!"===n[n.length-1]?(a=!0,n=n.slice(0,-1)):"!"===n[0]&&(a=!0,n=n.slice(1)),t.utilities.has(n,"static")&&!n.includes("[")&&(yield{kind:"static",root:n,variants:o,important:a,raw:e});let[i,l=null,s]=Y(n,"/");if(s)return;let c,u=null===l?null:J(l);if(null===l||null!==u)if("["!==i[0]){if("]"===i[i.length-1]){let e=i.indexOf("-[");if(-1===e)return;let r=i.slice(0,e);if(!t.utilities.has(r,"functional"))return;c=[[r,i.slice(e+1)]]}else if(")"===i[i.length-1]){let e=i.indexOf("-(");if(-1===e)return;let r=i.slice(0,e);if(!t.utilities.has(r,"functional"))return;let n=i.slice(e+2,-1),o=Y(n,":"),a=null;if(2===o.length&&(a=o[0],n=o[1]),"-"!==n[0]||"-"!==n[1]||!H(n))return;c=[[r,null===a?`[var(${n})]`:`[${a}:var(${n})]`]]}else c=X(i,(e=>t.utilities.has(e,"functional")));for(let[t,r]of c){let n={kind:"functional",root:t,modifier:u,value:null,variants:o,important:a,raw:e};if(null!==r){{let e=r.indexOf("[");if(-1!==e){if("]"!==r[r.length-1])return;let t=B(r.slice(e+1,-1));if(!H(t))continue;let o=null;for(let e=0;e<t.length;e++){let r=t.charCodeAt(e);if(58===r){o=t.slice(0,e),t=t.slice(e+1);break}if(!(45===r||r>=97&&r<=122))break}if(0===t.length||0===t.trim().length||""===o)continue;n.value={kind:"arbitrary",dataType:o||null,value:t}}else{let e=null===l||"arbitrary"===n.modifier?.kind?null:`${r}/${l}`;if(!G.test(r))continue;n.value={kind:"named",value:r,fraction:e}}}yield n}else yield n}}else{if("]"!==i[i.length-1])return;let t=i.charCodeAt(1);if(45!==t&&!(t>=97&&t<=122))return;i=i.slice(1,-1);let r=i.indexOf(":");if(-1===r||0===r||r===i.length-1)return;let n=i.slice(0,r),l=B(i.slice(r+1));if(!H(l))return;yield{kind:"arbitrary",property:n,value:l,modifier:u,variants:o,important:a,raw:e}}}(e,u)))),i=new f((e=>new f((t=>{let r=function(e,t,r){let n=function(e,t){if("arbitrary"===e.kind){let r=e.value;return e.modifier&&(r=Me(r,e.modifier,t.theme)),null===r?[]:[[j(e.property,r)]]}let r=t.utilities.get(e.root)??[],n=[],o=r.filter((e=>!yt(e)));for(let t of o){if(t.kind!==e.kind)continue;let r=t.compileFn(e);if(void 0!==r){if(null===r){if(t.options?.types?.length)return n;continue}n.push(r)}}if(n.length>0)return n;let a=r.filter((e=>yt(e)));for(let t of a){if(t.kind!==e.kind)continue;let r=t.compileFn(e);if(void 0!==r){if(null===r){if(t.options?.types?.length)return n;continue}n.push(r)}}return n}(e,t);if(0===n.length)return[];let o=t.important&&!!(1&r),a=[],i=`.${l(e.raw)}`;for(let r of n){let n=$t(r);(e.important||o)&&xt(r);let l={kind:"rule",selector:i,nodes:r};for(let r of e.variants)if(null===bt(l,r,t.variants))return[];a.push({node:l,propertySort:n})}return a}(t,u,e);try{ct(r.map((({node:e})=>e)),u),gt(r.map((({node:e})=>e)),u)}catch{return[]}return r})))),s=new f((t=>{for(let r of $(t))e.markUsedVariable(r)}));function c(e){let r=[];for(let n of e){let e=!0,{astNodes:o}=wt([n],u,{onInvalidCandidate(){e=!1}});t&&y(o,(e=>(e.src??=t,b.Continue))),o=N(o,u,0),r.push(e?o:[])}return r}let u={theme:e,utilities:r,variants:n,invalidCandidates:new Set,important:!1,candidatesToCss:function(e){return c(e).map((e=>e.length>0?F(e):null))},candidatesToAst:c,getClassOrder(e){return function(e,t){let{astNodes:r,nodeSorting:n}=wt(Array.from(t),e),o=new Map(t.map((e=>[e,null]))),a=0n;for(let e of r){let t=n.get(e)?.candidate;t&&o.set(t,o.get(t)??a++)}return t.map((e=>[e,o.get(e)??null]))}(this,e)},getClassList:()=>[],getVariants:()=>[],parseCandidate:e=>a.get(e),parseVariant:e=>o.get(e),compileAstNodes:(e,t=1)=>i.get(t).get(e),printCandidate:e=>function(e,t){let r=[];for(let e of t.variants)r.unshift(ee(e));e.theme.prefix&&r.unshift(e.theme.prefix);let n="";if("static"===t.kind&&(n+=t.root),"functional"===t.kind&&(n+=t.root,t.value))if("arbitrary"===t.value.kind){if(null!==t.value){let e=ie(t.value.value),r=e?t.value.value.slice(4,-1):t.value.value,[o,a]=e?["(",")"]:["[","]"];t.value.dataType?n+=`-${o}${t.value.dataType}:${re(r)}${a}`:n+=`-${o}${re(r)}${a}`}}else"named"===t.value.kind&&(n+=`-${t.value.value}`);return"arbitrary"===t.kind&&(n+=`[${t.property}:${re(t.value)}]`),("arbitrary"===t.kind||"functional"===t.kind)&&(n+=Q(t.modifier)),t.important&&(n+="!"),r.push(n),r.join(":")}(u,e),printVariant:e=>ee(e),getVariantOrder(){let e=Array.from(o.values());e.sort(((e,t)=>this.variants.compare(e,t)));let t,r=new Map,n=0;for(let o of e)null!==o&&(void 0!==t&&0!==this.variants.compare(t,o)&&n++,r.set(o,n),t=o);return r},resolveThemeValue(t,r=!0){let n=t.lastIndexOf("/"),o=null;-1!==n&&(o=t.slice(n+1).trim(),t=t.slice(0,n).trim());let a=e.resolve(null,[t],r?1:0)??void 0;return o&&a?De(a,o):a},trackUsedVariables(e){s.get(e)},canonicalizeCandidates:(e,t)=>[],storage:{}};return u}var kt=["container-type","pointer-events","visibility","position","inset","inset-inline","inset-block","inset-inline-start","inset-inline-end","inset-block-start","inset-block-end","top","right","bottom","left","isolation","z-index","order","grid-column","grid-column-start","grid-column-end","grid-row","grid-row-start","grid-row-end","float","clear","--tw-container-component","margin","margin-inline","margin-block","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-top","margin-right","margin-bottom","margin-left","box-sizing","display","field-sizing","aspect-ratio","height","max-height","min-height","width","max-width","min-width","flex","flex-shrink","flex-grow","flex-basis","table-layout","caption-side","border-collapse","border-spacing","transform-origin","translate","--tw-translate-x","--tw-translate-y","--tw-translate-z","scale","--tw-scale-x","--tw-scale-y","--tw-scale-z","rotate","--tw-rotate-x","--tw-rotate-y","--tw-rotate-z","--tw-skew-x","--tw-skew-y","transform","zoom","animation","cursor","touch-action","--tw-pan-x","--tw-pan-y","--tw-pinch-zoom","resize","scroll-snap-type","--tw-scroll-snap-strictness","scroll-snap-align","scroll-snap-stop","scroll-margin","scroll-margin-inline","scroll-margin-block","scroll-margin-inline-start","scroll-margin-inline-end","scroll-margin-block-start","scroll-margin-block-end","scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left","scroll-padding","scroll-padding-inline","scroll-padding-block","scroll-padding-inline-start","scroll-padding-inline-end","scroll-padding-block-start","scroll-padding-block-end","scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left","scrollbar-width","scrollbar-color","scrollbar-gutter","list-style-position","list-style-type","list-style-image","appearance","columns","break-before","break-inside","break-after","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-template-columns","grid-template-rows","flex-direction","flex-nowrap","place-content","place-items","align-content","align-items","justify-content","justify-items","gap","column-gap","row-gap","--tw-space-x-reverse","--tw-space-y-reverse","divide-x-width","divide-y-width","--tw-divide-y-reverse","divide-style","divide-color","place-self","align-self","justify-self","overflow","overflow-x","overflow-y","overscroll-behavior","overscroll-behavior-x","overscroll-behavior-y","scroll-behavior","border-radius","border-start-radius","border-end-radius","border-top-radius","border-right-radius","border-bottom-radius","border-left-radius","border-start-start-radius","border-start-end-radius","border-end-end-radius","border-end-start-radius","border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius","border-width","border-inline-width","border-block-width","border-inline-start-width","border-inline-end-width","border-block-start-width","border-block-end-width","border-top-width","border-right-width","border-bottom-width","border-left-width","border-style","border-inline-style","border-block-style","border-inline-start-style","border-inline-end-style","border-block-start-style","border-block-end-style","border-top-style","border-right-style","border-bottom-style","border-left-style","border-color","border-inline-color","border-block-color","border-inline-start-color","border-inline-end-color","border-block-start-color","border-block-end-color","border-top-color","border-right-color","border-bottom-color","border-left-color","background-color","background-image","--tw-gradient-position","--tw-gradient-stops","--tw-gradient-via-stops","--tw-gradient-from","--tw-gradient-from-position","--tw-gradient-via","--tw-gradient-via-position","--tw-gradient-to","--tw-gradient-to-position","mask-image","--tw-mask-top","--tw-mask-top-from-color","--tw-mask-top-from-position","--tw-mask-top-to-color","--tw-mask-top-to-position","--tw-mask-right","--tw-mask-right-from-color","--tw-mask-right-from-position","--tw-mask-right-to-color","--tw-mask-right-to-position","--tw-mask-bottom","--tw-mask-bottom-from-color","--tw-mask-bottom-from-position","--tw-mask-bottom-to-color","--tw-mask-bottom-to-position","--tw-mask-left","--tw-mask-left-from-color","--tw-mask-left-from-position","--tw-mask-left-to-color","--tw-mask-left-to-position","--tw-mask-linear","--tw-mask-linear-position","--tw-mask-linear-from-color","--tw-mask-linear-from-position","--tw-mask-linear-to-color","--tw-mask-linear-to-position","--tw-mask-radial","--tw-mask-radial-shape","--tw-mask-radial-size","--tw-mask-radial-position","--tw-mask-radial-from-color","--tw-mask-radial-from-position","--tw-mask-radial-to-color","--tw-mask-radial-to-position","--tw-mask-conic","--tw-mask-conic-position","--tw-mask-conic-from-color","--tw-mask-conic-from-position","--tw-mask-conic-to-color","--tw-mask-conic-to-position","box-decoration-break","background-size","background-attachment","background-clip","background-position","background-repeat","background-origin","mask-composite","mask-mode","mask-type","mask-size","mask-clip","mask-position","mask-repeat","mask-origin","fill","stroke","stroke-width","object-fit","object-position","padding","padding-inline","padding-block","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-top","padding-right","padding-bottom","padding-left","text-align","text-indent","vertical-align","font-family","font-feature-settings","font-size","line-height","font-weight","letter-spacing","text-wrap","overflow-wrap","word-break","text-overflow","hyphens","white-space","tab-size","color","text-transform","font-style","font-stretch","font-variant-numeric","text-decoration-line","text-decoration-color","text-decoration-style","text-decoration-thickness","text-underline-offset","-webkit-font-smoothing","placeholder-color","caret-color","accent-color","color-scheme","opacity","background-blend-mode","mix-blend-mode","box-shadow","--tw-shadow","--tw-shadow-color","--tw-ring-shadow","--tw-ring-color","--tw-inset-shadow","--tw-inset-shadow-color","--tw-inset-ring-shadow","--tw-inset-ring-color","--tw-ring-offset-width","--tw-ring-offset-color","outline","outline-width","outline-offset","outline-color","--tw-blur","--tw-brightness","--tw-contrast","--tw-drop-shadow","--tw-grayscale","--tw-hue-rotate","--tw-invert","--tw-saturate","--tw-sepia","filter","--tw-backdrop-blur","--tw-backdrop-brightness","--tw-backdrop-contrast","--tw-backdrop-grayscale","--tw-backdrop-hue-rotate","--tw-backdrop-invert","--tw-backdrop-opacity","--tw-backdrop-saturate","--tw-backdrop-sepia","backdrop-filter","transition-property","transition-behavior","transition-delay","transition-duration","transition-timing-function","will-change","contain","content","forced-color-adjust"];function wt(e,t,{onInvalidCandidate:r,respectImportant:n}={}){let o=new Map,a=[],i=new Map;for(let n of e){if(t.invalidCandidates.has(n)){r?.(n);continue}let e=t.parseCandidate(n);0!==e.length?i.set(n,e):r?.(n)}let l=0;(n??1)&&(l|=1);let s=t.getVariantOrder();for(let[e,n]of i){let i=!1;for(let r of n){let n=t.compileAstNodes(r,l);if(0!==n.length){i=!0;for(let{node:t,propertySort:i}of n){let n=0n;for(let e of r.variants)n|=1n<<BigInt(s.get(e));o.set(t,{properties:i,variants:n,candidate:e}),a.push(t)}}}i||r?.(e)}return a.sort(((e,t)=>{let r=o.get(e),n=o.get(t);if(r.variants-n.variants!==0n)return Number(r.variants-n.variants);let a=0;for(;a<r.properties.order.length&&a<n.properties.order.length&&r.properties.order[a]===n.properties.order[a];)a+=1;return(r.properties.order[a]??1/0)-(n.properties.order[a]??1/0)||n.properties.count-r.properties.count||function(e,t){let r=e.length,n=t.length,o=r<n?r:n;for(let r=0;r<o;r++){let n=e.charCodeAt(r),o=t.charCodeAt(r);if(n>=48&&n<=57&&o>=48&&o<=57){let a=r,i=r+1,l=r,s=r+1;for(n=e.charCodeAt(i);n>=48&&n<=57;)n=e.charCodeAt(++i);for(o=t.charCodeAt(s);o>=48&&o<=57;)o=t.charCodeAt(++s);let c=e.slice(a,i),u=t.slice(l,s),d=Number(c)-Number(u);if(d)return d;if(c<u)return-1;if(c>u)return 1}else if(n!==o)return n-o}return e.length-t.length}(r.candidate,n.candidate)})),{astNodes:a,nodeSorting:o}}function bt(e,t,r,n=0){if("arbitrary"===t.kind)return t.relative&&0===n?null:void(e.nodes=[C(t.selector,e.nodes)]);let{applyFn:o}=r.get(t.root);if("compound"===t.kind){let a=S("@slot");if(null===bt(a,t.variant,r,n+1)||"not"===t.root&&a.nodes.length>1)return null;for(let e of a.nodes)if("rule"!==e.kind&&"at-rule"!==e.kind||null===o(e,t))return null;return y(a.nodes,(t=>{if(("rule"===t.kind||"at-rule"===t.kind)&&t.nodes.length<=0)return t.nodes=e.nodes,b.Skip})),void(e.nodes=a.nodes)}return null===o(e,t)?null:void 0}function yt(e){let t=e.options?.types??[];return t.length>1&&t.includes("any")}function xt(e){for(let t of e)"at-root"!==t.kind&&("declaration"===t.kind?t.important=!0:("rule"===t.kind||"at-rule"===t.kind)&&xt(t.nodes))}function $t(e){let t=new Set,r=0,n=e.slice(),o=!1;for(;n.length>0;){let e=n.shift();if("declaration"===e.kind){if(void 0===e.value||(r++,o))continue;if("--tw-sort"===e.property){let r=kt.indexOf(e.value??"");if(-1!==r){t.add(r),o=!0;continue}}let n=kt.indexOf(e.property);-1!==n&&t.add(n)}else if("rule"===e.kind||"at-rule"===e.kind)for(let t of e.nodes)n.push(t)}return{order:Array.from(t).sort(((e,t)=>e-t)),count:r}}function zt(e,t){let r=0,n=C("&",e),o=new Set,a=new f((()=>new Set)),i=new f((()=>new Set));y([n],((e,n)=>{if("at-rule"===e.kind){if("@keyframes"===e.name)return y(e.nodes,(e=>{if("at-rule"===e.kind&&"@apply"===e.name)throw new Error("You cannot use `@apply` inside `@keyframes`.")})),b.Skip;if("@utility"===e.name){let r=e.params.replace(/-\*$/,"");return i.get(r).add(e),void y(e.nodes,(r=>{if("at-rule"===r.kind&&"@apply"===r.name){o.add(e);for(let n of At(r,t))a.get(e).add(n)}}))}if("@apply"===e.name){if(null===n.parent)return;r|=1,o.add(n.parent);for(let r of At(e,t))for(let e of n.path())o.has(e)&&a.get(e).add(r)}}}));let l=new Set,s=[],c=new Set;function u(e,r=[]){if(!l.has(e)){if(c.has(e)){let n=r[(r.indexOf(e)+1)%r.length];throw"at-rule"===e.kind&&"@utility"===e.name&&"at-rule"===n.kind&&"@utility"===n.name&&y(e.nodes,(e=>{if("at-rule"!==e.kind||"@apply"!==e.name)return;let r=e.params.split(/\s+/g);for(let e of r)for(let r of t.parseCandidate(e))switch(r.kind){case"arbitrary":break;case"static":case"functional":if(n.params.replace(/-\*$/,"")===r.root)throw new Error(`You cannot \`@apply\` the \`${e}\` utility here because it creates a circular dependency.`)}})),new Error(`Circular dependency detected:\n\n${F([e])}\nRelies on:\n\n${F([n])}`)}c.add(e);for(let t of a.get(e))for(let n of i.get(t))r.push(e),u(n,r),r.pop();l.add(e),c.delete(e),s.push(e)}}for(let e of o)u(e);for(let e of s)"nodes"in e&&y(e.nodes,(e=>{if("at-rule"!==e.kind||"@apply"!==e.name)return;let r=e.params.split(/(\s+)/g),n={},o=0;for(let[e,t]of r.entries())e%2==0&&(n[t]=o),o+=t.length;{let r=wt(Object.keys(n),t,{respectImportant:!1,onInvalidCandidate:e=>{if(t.theme.prefix&&!e.startsWith(t.theme.prefix))throw new Error(`Cannot apply unprefixed utility class \`${e}\`. Did you mean \`${t.theme.prefix}:${e}\`?`);if(t.invalidCandidates.has(e))throw new Error(`Cannot apply utility class \`${e}\` because it has been explicitly disabled: https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-excluding-classes`);let r=Y(e,":");if(r.length>1){let n=r.pop();if(t.candidatesToCss([n])[0]){let n=t.candidatesToCss(r.map((e=>`${e}:[--tw-variant-check:1]`))),o=r.filter(((e,t)=>null===n[t]));if(o.length>0){if(1===o.length)throw new Error(`Cannot apply utility class \`${e}\` because the ${o.map((e=>`\`${e}\``))} variant does not exist.`);{let t=new Intl.ListFormat("en",{style:"long",type:"conjunction"});throw new Error(`Cannot apply utility class \`${e}\` because the ${t.format(o.map((e=>`\`${e}\``)))} variants do not exist.`)}}}}throw 0===t.theme.size?new Error(`Cannot apply unknown utility class \`${e}\`. Are you using CSS modules or similar and missing \`@reference\`? https://tailwindcss.com/docs/functions-and-directives#reference-directive`):new Error(`Cannot apply unknown utility class \`${e}\``)}}),o=e.src,a=r.astNodes.map((e=>{let t=r.nodeSorting.get(e)?.candidate,a=t?n[t]:void 0;if(e=E(e),!o||!t||void 0===a)return y([e],(e=>{e.src=o})),e;let i=[o[0],o[1],o[2]];return i[1]+=7+a,i[2]=i[1]+t.length,y([e],(e=>{e.src=i})),e})),i=[];for(let e of a)if("rule"===e.kind)for(let t of e.nodes)i.push(t);else i.push(e);return b.Replace(i)}}));return r}function*At(e,t){for(let r of e.params.split(/\s+/g))for(let e of t.parseCandidate(r))switch(e.kind){case"arbitrary":break;case"static":case"functional":yield e.root}}async function St(e,t,r,o=0,a=!1){let i=0,l=[];return y(e,(e=>{if("at-rule"===e.kind&&("@import"===e.name||"@reference"===e.name)){let s=function(e){let t,r=null,n=null,o=null;for(let a=0;a<e.length;a++){let i=e[a];if("separator"!==i.kind){if("word"===i.kind&&!t){if(!i.value||'"'!==i.value[0]&&"'"!==i.value[0])return null;t=i.value.slice(1,-1);continue}if("function"===i.kind&&"url"===i.value.toLowerCase()||!t)return null;if(("word"===i.kind||"function"===i.kind)&&"layer"===i.value.toLowerCase()){if(r)return null;if(o)throw new Error("`layer(â€¦)` in an `@import` should come before any other functions or conditions");r="nodes"in i?g(i.nodes):"";continue}if("function"===i.kind&&"supports"===i.value.toLowerCase()){if(o)return null;o=g(i.nodes);continue}n=g(e.slice(a));break}}return t?{uri:t,layer:r,media:n,supports:o}:null}(v(e.params));if(null===s)return;"@reference"===e.name&&(s.media="reference"),i|=2;let{uri:c,layer:u,media:d,supports:f}=s;if(c.startsWith("data:")||c.startsWith("http://")||c.startsWith("https://"))return;let p=V({},[]);return l.push((async()=>{if(o>100)throw new Error(`Exceeded maximum recursion depth while resolving \`${c}\` in \`${t}\`)`);let i=await r(c,t),l=n(i.content,{from:a?i.path:void 0});await St(l,i.base,r,o+1,a),p.nodes=function(e,t,r,n,o){let a=t;if(null!==r){let t=S("@layer",r,a);t.src=e.src,a=[t]}if(null!==n){let t=S("@media",n,a);t.src=e.src,a=[t]}if(null!==o){let t=S("@supports","("===o[0]?o:`(${o})`,a);t.src=e.src,a=[t]}return a}(e,[V({base:i.base},l)],u,d,f)})()),b.ReplaceSkip(p)}})),l.length>0&&await Promise.all(l),i}function Ct(e,t=null){return Array.isArray(e)&&2===e.length&&"object"==typeof e[1]&&null!==typeof e[1]?t?e[1][t]??null:e[0]:Array.isArray(e)&&null===t?e.join(", "):"string"==typeof e&&null===t?e:null}function jt(e,{theme:t},r){for(let t of r){let r=Et([t]);r&&e.theme.clearNamespace(`--${r}`,4)}for(let[r,n]of function(e){let t=[];return Ot(e,[],((e,r)=>{if(function(e){return"number"==typeof e||"string"==typeof e}(e))return t.push([r,e]),1;if(function(e){if(!Array.isArray(e)||2!==e.length||"string"!=typeof e[0]&&"number"!=typeof e[0]||void 0===e[1]||null===e[1]||"object"!=typeof e[1])return!1;for(let t of Reflect.ownKeys(e[1]))if("string"!=typeof t||"string"!=typeof e[1][t]&&"number"!=typeof e[1][t])return!1;return!0}(e)){t.push([r,e[0]]);for(let n of Reflect.ownKeys(e[1]))t.push([[...r,`-${n}`],e[1][n]]);return 1}return Array.isArray(e)&&e.every((e=>"string"==typeof e))?("fontSize"===r[0]?(t.push([r,e[0]]),e.length>=2&&t.push([[...r,"-line-height"],e[1]])):t.push([r,e.join(", ")]),1):void 0})),t}(t)){if("string"!=typeof n&&"number"!=typeof n)continue;if("string"==typeof n&&(n=n.replace(/<alpha-value>/g,"1")),"opacity"===r[0]&&("number"==typeof n||"string"==typeof n)){let e="string"==typeof n?parseFloat(n):n;e>=0&&e<=1&&(n=100*e+"%")}let t=Et(r);t&&e.theme.add(`--${t}`,""+n,7)}if(Object.hasOwn(t,"fontFamily")){let r=5;{let n=Ct(t.fontFamily.sans);n&&e.theme.hasDefault("--font-sans")&&(e.theme.add("--default-font-family",n,r),e.theme.add("--default-font-feature-settings",Ct(t.fontFamily.sans,"fontFeatureSettings")??"normal",r),e.theme.add("--default-font-variation-settings",Ct(t.fontFamily.sans,"fontVariationSettings")??"normal",r))}{let n=Ct(t.fontFamily.mono);n&&e.theme.hasDefault("--font-mono")&&(e.theme.add("--default-mono-font-family",n,r),e.theme.add("--default-mono-font-feature-settings",Ct(t.fontFamily.mono,"fontFeatureSettings")??"normal",r),e.theme.add("--default-mono-font-variation-settings",Ct(t.fontFamily.mono,"fontVariationSettings")??"normal",r))}}return t}var Tt={borderWidth:"border-width",outlineWidth:"outline-width",ringColor:"ring-color",ringWidth:"ring-width",transitionDuration:"transition-duration",transitionTimingFunction:"transition-timing-function"},Vt={animation:"animate",aspectRatio:"aspect",borderRadius:"radius",boxShadow:"shadow",colors:"color",containers:"container",fontFamily:"font",fontSize:"text",letterSpacing:"tracking",lineHeight:"leading",maxWidth:"container",screens:"breakpoint",transitionTimingFunction:"ease"},Kt=/^[a-zA-Z0-9-_%/.]+$/;function Et(e){let t=Tt[e[0]];if(t&&"DEFAULT"===e[1])return`default-${t}`;if("container"===e[0])return null;for(let t of e)if(!Kt.test(t))return null;let r=Vt[e[0]];return r&&((e=e.slice())[0]=r),e.map(((e,t,r)=>"1"===e&&t!==r.length-1?"":e)).map(((e,t)=>(e=e.replaceAll(".","_"),(0===t||e.startsWith("-")||"lineHeight"===e)&&(e=e.replace(/([a-z])([A-Z])/g,((e,t,r)=>`${t}-${r.toLowerCase()}`))),e))).filter(((t,r)=>"DEFAULT"!==t||r!==e.length-1)).join("-")}function Ot(e,t=[],r){for(let n of Reflect.ownKeys(e)){let o=e[n];if(null==o)continue;let a=[...t,n],i=r(o,a)??0;if(1!==i){if(2===i)return 2;if((Array.isArray(o)||"object"==typeof o)&&2===Ot(o,a,r))return 2}}}function Nt(e){return{kind:"combinator",value:e}}function Ft(e,t){return{kind:"function",value:e,nodes:t}}function Ut(e){return{kind:"selector",value:e}}function Wt(e){return{kind:"separator",value:e}}function Rt(e){return{kind:"value",value:e}}function Dt(e){let t="";for(let r of e)switch(r.kind){case"combinator":case"selector":case"separator":case"value":t+=r.value;break;case"function":t+=r.value+"("+Dt(r.nodes)+")"}return t}function _t(e){e=e.replaceAll("\r\n","\n");let t,r=[],n=[],o=null,a="";for(let i=0;i<e.length;i++){let l=e.charCodeAt(i);switch(l){case 44:case 62:case 10:case 32:case 43:case 9:case 126:{if(a.length>0){let e=Ut(a);o?o.nodes.push(e):r.push(e),a=""}let n=i,l=i+1;for(;l<e.length&&(t=e.charCodeAt(l),44===t||62===t||10===t||32===t||43===t||9===t||126===t);l++);i=l-1;let s=e.slice(n,l),c=","===s.trim()?Wt(s):Nt(s);o?o.nodes.push(c):r.push(c);break}case 40:{let l=Ft(a,[]);if(a="",":not"!==l.value&&":where"!==l.value&&":has"!==l.value&&":is"!==l.value){let n=i+1,s=0;for(let r=i+1;r<e.length;r++)if(t=e.charCodeAt(r),40!==t){if(41===t){if(0===s){i=r;break}s--}}else s++;let c=i;l.nodes.push(Rt(e.slice(n,c))),a="",i=c,o?o.nodes.push(l):r.push(l);break}o?o.nodes.push(l):r.push(l),n.push(l),o=l;break}case 41:{let e=n.pop();if(a.length>0){let t=Ut(a);e.nodes.push(t),a=""}o=n.length>0?n[n.length-1]:null;break}case 46:case 58:case 35:if(a.length>0){let e=Ut(a);o?o.nodes.push(e):r.push(e)}a=e[i];break;case 91:{if(a.length>0){let e=Ut(a);o?o.nodes.push(e):r.push(e)}a="";let n=i,l=0;for(let r=i+1;r<e.length;r++)if(t=e.charCodeAt(r),91!==t){if(93===t){if(0===l){i=r;break}l--}}else l++;a+=e.slice(n,i+1);break}case 39:case 34:{let r=i;for(let r=i+1;r<e.length;r++)if(t=e.charCodeAt(r),92===t)r+=1;else if(t===l){i=r;break}a+=e.slice(r,i+1);break}case 38:case 42:if(a.length>0){let e=Ut(a);o?o.nodes.push(e):r.push(e),a=""}o?o.nodes.push(Ut(e[i])):r.push(Ut(e[i]));break;case 92:a+=e[i]+e[i+1],i+=1;break;default:a+=e[i]}}return a.length>0&&r.push(Ut(a)),r}function Mt(e){let t=[];for(let r of Y(e,".")){if(!r.includes("[")){t.push(r);continue}let e=0;for(;;){let n=r.indexOf("[",e),o=r.indexOf("]",n);if(-1===n||-1===o)break;n>e&&t.push(r.slice(e,n)),t.push(r.slice(n+1,o)),e=o+1}e<=r.length-1&&t.push(r.slice(e))}return t}function Bt(e){if("[object Object]"!==Object.prototype.toString.call(e))return!1;let t=Object.getPrototypeOf(e);return null===t||null===Object.getPrototypeOf(t)}function Lt(e,t,r,n=[]){for(let o of t)if(null!=o)for(let t of Reflect.ownKeys(o)){n.push(t);let a=r(e[t],o[t],n);void 0!==a?e[t]=a:Bt(e[t])&&Bt(o[t])?e[t]=Lt({},[e[t],o[t]],r,n):e[t]=o[t],n.pop()}return e}function It(e,t,r){return function(n,o){let a=n.lastIndexOf("/"),i=null;-1!==a&&(i=n.slice(a+1).trim(),n=n.slice(0,a).trim());let l=(()=>{let o=Mt(n),[a,i]=function(e,t){if(1===t.length&&t[0].startsWith("--"))return[e.get([t[0]]),e.getOptions(t[0])];let r=Et(t),n=new Map,o=new f((()=>new Map)),a=e.namespace(`--${r}`);if(0===a.size)return[null,0];let i=new Map;for(let[t,l]of a){if(!t||!t.includes("--")){n.set(t,l),i.set(t,e.getOptions(t?`--${r}-${t}`:`--${r}`));continue}let a=t.indexOf("--"),s=t.slice(0,a),c=t.slice(a+2);c=c.replace(/-([a-z])/g,((e,t)=>t.toUpperCase())),o.get(""===s?null:s).set(c,[l,e.getOptions(`--${r}${t}`)])}let l=e.getOptions(`--${r}`);for(let[e,t]of o){let r=n.get(e);if("string"!=typeof r)continue;let o={},a={};for(let[e,[r,n]]of t)o[e]=r,a[e]=n;n.set(e,[r,o]),i.set(e,[l,a])}let s={},c={};for(let[e,t]of n)qt(s,[e??"DEFAULT"],t);for(let[e,t]of i)qt(c,[e??"DEFAULT"],t);return"DEFAULT"===t[t.length-1]?[s?.DEFAULT??null,c.DEFAULT??0]:"DEFAULT"in s&&1===Object.keys(s).length?[s.DEFAULT,c.DEFAULT??0]:(s.__CSS_VALUES__=c,[s,c])}(e.theme,o),l=r(Pt(t()??{},o)??null);if("string"==typeof l&&(l=l.replace("<alpha-value>","1")),"object"!=typeof a)return"object"!=typeof i&&4&i?l??a:a;if(null!==l&&"object"==typeof l&&!Array.isArray(l)){let e=Lt({},[l],((e,t)=>t));if(null===a&&Object.hasOwn(l,"__CSS_VALUES__")){let t={};for(let r in l.__CSS_VALUES__)t[r]=l[r],delete e[r];a=t}for(let t in a)"__CSS_VALUES__"!==t&&(4&l?.__CSS_VALUES__?.[t]&&void 0!==Pt(e,t.split("-"))||(e[s(t)]=a[t]));return e}if(Array.isArray(a)&&Array.isArray(i)&&Array.isArray(l)){let e=a[0],t=a[1];4&i[0]&&(e=l[0]??e);for(let e of Object.keys(t))4&i[1][e]&&(t[e]=l[1][e]??t[e]);return[e,t]}return a??l})();return i&&"string"==typeof l&&(l=De(l,i)),l??o}}function Pt(e,t){for(let r=0;r<t.length;++r){let n=t[r];if(null!=e&&"object"==typeof e&&Object.hasOwn(e,n))e=e[n];else{if(void 0===t[r+1])return;t[r+1]=`${n}-${t[r+1]}`}}return e}function qt(e,t,r){for(let r of t.slice(0,-1))void 0===e[r]&&(e[r]={}),e=e[r];e[t[t.length-1]]=r}var Ht=/^[a-z@][a-zA-Z0-9/%._-]*$/;function Zt({designSystem:e,ast:t,resolvedConfig:r,featuresRef:n,referenceMode:o,src:a}){let i={addBase(r){if(o)return;let i=Yt(r);n.current|=ct(i,e);let l=S("@layer","base",i);y([l],(e=>{e.src=a})),t.push(l)},addVariant(t,r){if(!dt.test(t))throw new Error(`\`addVariant('${t}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes, or underscore characters and start with a lowercase letter or number.`);if("string"==typeof r){if(r.includes(":merge("))return}else if(Array.isArray(r)){if(r.some((e=>e.includes(":merge("))))return}else if("object"==typeof r){let e=function(t,r){return Object.entries(t).some((([t,n])=>t.includes(r)||"object"==typeof n&&e(n,r)))};if(e(r,":merge("))return}"string"==typeof r||Array.isArray(r)?e.variants.static(t,(e=>{e.nodes=Gt(r,e.nodes)}),{compounds:pt("string"==typeof r?[r]:r)}):"object"==typeof r&&e.variants.fromAst(t,Yt(r),e)},matchVariant(t,r,n){function o(e,t,n){return Gt(r(e,{modifier:t?.value??null}),n)}try{let e=r("a",{modifier:null});if("string"==typeof e&&e.includes(":merge("))return;if(Array.isArray(e)&&e.some((e=>e.includes(":merge("))))return}catch{}let a=Object.keys(n?.values??{});e.variants.group((()=>{e.variants.functional(t,((e,t)=>{if(!t.value)return n?.values&&"DEFAULT"in n.values?void(e.nodes=o(n.values.DEFAULT,t.modifier,e.nodes)):null;if("arbitrary"===t.value.kind)e.nodes=o(t.value.value,t.modifier,e.nodes);else{if("named"!==t.value.kind||!n?.values)return null;{if(!Object.hasOwn(n.values,t.value.value))return null;let r=n.values[t.value.value];if("string"!=typeof r)return null;e.nodes=o(r,t.modifier,e.nodes)}}}))}),((e,t)=>{if("functional"!==e.kind||"functional"!==t.kind)return 0;let r=e.value?e.value.value:"DEFAULT",o=t.value?t.value.value:"DEFAULT",i=(n?.values&&Object.hasOwn(n.values,r)?n.values[r]:void 0)??r,l=(n?.values&&Object.hasOwn(n.values,o)?n.values[o]:void 0)??o;if(n&&"function"==typeof n.sort)return n.sort({value:i,modifier:e.modifier?.value??null},{value:l,modifier:t.modifier?.value??null});let s=a.indexOf(r),c=a.indexOf(o);return s=-1===s?a.length:s,c=-1===c?a.length:c,s!==c?s-c:i<l?-1:1})),e.variants.suggest(t,(()=>Object.keys(n?.values??{}).filter((e=>"DEFAULT"!==e))))},addUtilities(r){let i=(r=Array.isArray(r)?r:[r]).flatMap((e=>Object.entries(e)));i=i.flatMap((([e,t])=>Y(e,",").map((e=>[e.trim(),t]))));let l=new f((()=>[]));for(let[e,r]of i){if(e.startsWith("@keyframes ")){if(!o){let n=C(e,Yt(r));y([n],(e=>{e.src=a})),t.push(n)}continue}let n=_t(e),i=!1;if(y(n,(e=>{if("selector"===e.kind&&"."===e.value[0]&&Ht.test(e.value.slice(1))){let t=e.value;e.value="&";let o=Dt(n),a=t.slice(1),s="&"===o?Yt(r):[C(o,Yt(r))];return l.get(a).push(...s),i=!0,void(e.value=t)}if("function"===e.kind&&":not"===e.value)return b.Skip})),!i)throw new Error(`\`addUtilities({ '${e}' : â€¦ })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`)}for(let[t,r]of l)e.theme.prefix&&y(r,(t=>{if("rule"===t.kind){let r=_t(t.selector);y(r,(t=>{"selector"===t.kind&&"."===t.value[0]&&(t.value=`.${e.theme.prefix}\\:${t.value.slice(1)}`)})),t.selector=Dt(r)}})),e.utilities.static(t,(o=>{let a=r.map(E);return Jt(a,t,o.raw),n.current|=zt(a,e),a}))},matchUtilities(t,r){let o=r?.type?Array.isArray(r?.type)?r.type:[r.type]:["any"];for(let[a,i]of Object.entries(t)){let t=function({negative:t}){return l=>{if("arbitrary"===l.value?.kind&&o.length>0&&!o.includes("any")&&(l.value.dataType&&!o.includes(l.value.dataType)||!l.value.dataType&&!pe(l.value.value,o)))return;let s,c=o.includes("color"),u=null,d=!1;{let e=r?.values??{};c&&(e=Object.assign({inherit:"inherit",transparent:"transparent",current:"currentcolor"},e)),l.value?"arbitrary"===l.value.kind?u=l.value.value:l.value.fraction&&Object.hasOwn(e,l.value.fraction)?(u=e[l.value.fraction],d=!0):Object.hasOwn(e,l.value.value)?u=e[l.value.value]:e.__BARE_VALUE__&&(u=e.__BARE_VALUE__(l.value)??null,d=(null!==l.value.fraction&&u?.includes("/"))??!1):u=e.DEFAULT??null}if(null===u)return;{let e=r?.modifiers??null;s=l.modifier?"any"===e||"arbitrary"===l.modifier.kind?l.modifier.value:e&&Object.hasOwn(e,l.modifier.value)?e[l.modifier.value]:c&&!Number.isNaN(Number(l.modifier.value))?`${l.modifier.value}%`:null:null}if(l.modifier&&null===s&&!d)return"arbitrary"===l.value?.kind?null:void 0;c&&null!==s&&(u=De(u,s)),t&&(u=`calc(${u} * -1)`);let f=Yt(i(u,{modifier:s}));return Jt(f,a,l.raw),n.current|=zt(f,e),f}};if(!Ht.test(a))throw new Error(`\`matchUtilities({ '${a}' : â€¦ })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`);r?.supportsNegativeValues&&e.utilities.functional(`-${a}`,t({negative:!0}),{types:o}),e.utilities.functional(a,t({negative:!1}),{types:o}),e.utilities.suggest(a,(()=>{let e=r?.values??{},t=new Set(Object.keys(e));t.delete("__BARE_VALUE__"),t.delete("__CSS_VALUES__"),t.has("DEFAULT")&&(t.delete("DEFAULT"),t.add(null));let n=r?.modifiers??{},o="any"===n?[]:Object.keys(n);return[{supportsNegative:r?.supportsNegativeValues??!1,values:Array.from(t),modifiers:o}]}))}},addComponents(e,t){this.addUtilities(e,t)},matchComponents(e,t){this.matchUtilities(e,t)},theme:It(e,(()=>r.theme??{}),(e=>e)),prefix:e=>e,config(e,t){let n=r;if(!e)return n;let o=Mt(e);for(let e=0;e<o.length;++e){let r=o[e];if(void 0===n[r])return t;n=n[r]}return n??t}};return i.addComponents=i.addComponents.bind(i),i.matchComponents=i.matchComponents.bind(i),i}function Yt(e){let t=[],r=(e=Array.isArray(e)?e:[e]).flatMap((e=>Object.entries(e)));for(let[e,n]of r)if(null!=n&&!1!==n)if("object"!=typeof n){if(!e.startsWith("--")){if("@slot"===n){t.push(C(e,[S("@slot")]));continue}e=e.replace(/([A-Z])/g,"-$1").toLowerCase()}t.push(j(e,String(n)))}else if(Array.isArray(n))for(let r of n)"string"==typeof r?t.push(j(e,r)):t.push(C(e,Yt(r)));else t.push(C(e,Yt(n)));return t}function Gt(e,t){return("string"==typeof e?[e]:e).flatMap((e=>{if(e.trim().endsWith("}")){let r=n(e.replace("}","{@slot}}"));return mt(r,t),r}return C(e,t)}))}function Jt(e,t,r){y(e,(e=>{if("rule"===e.kind){let n=_t(e.selector);y(n,(e=>{"selector"===e.kind&&e.value===`.${t}`&&(e.value=`.${l(r)}`)})),e.selector=Dt(n)}}))}function Xt(e,t){for(let r of function(e){let t=[];if("keyframes"in e.theme)for(let[r,n]of Object.entries(e.theme.keyframes))t.push(S("@keyframes",r,Yt(n)));return t}(t))e.theme.addKeyframes(r)}var Qt={inherit:"inherit",current:"currentcolor",transparent:"transparent",black:"#000",white:"#fff",slate:{50:"oklch(98.4% 0.003 247.858)",100:"oklch(96.8% 0.007 247.896)",200:"oklch(92.9% 0.013 255.508)",300:"oklch(86.9% 0.022 252.894)",400:"oklch(70.4% 0.04 256.788)",500:"oklch(55.4% 0.046 257.417)",600:"oklch(44.6% 0.043 257.281)",700:"oklch(37.2% 0.044 257.287)",800:"oklch(27.9% 0.041 260.031)",900:"oklch(20.8% 0.042 265.755)",950:"oklch(12.9% 0.042 264.695)"},gray:{50:"oklch(98.5% 0.002 247.839)",100:"oklch(96.7% 0.003 264.542)",200:"oklch(92.8% 0.006 264.531)",300:"oklch(87.2% 0.01 258.338)",400:"oklch(70.7% 0.022 261.325)",500:"oklch(55.1% 0.027 264.364)",600:"oklch(44.6% 0.03 256.802)",700:"oklch(37.3% 0.034 259.733)",800:"oklch(27.8% 0.033 256.848)",900:"oklch(21% 0.034 264.665)",950:"oklch(13% 0.028 261.692)"},zinc:{50:"oklch(98.5% 0 0)",100:"oklch(96.7% 0.001 286.375)",200:"oklch(92% 0.004 286.32)",300:"oklch(87.1% 0.006 286.286)",400:"oklch(70.5% 0.015 286.067)",500:"oklch(55.2% 0.016 285.938)",600:"oklch(44.2% 0.017 285.786)",700:"oklch(37% 0.013 285.805)",800:"oklch(27.4% 0.006 286.033)",900:"oklch(21% 0.006 285.885)",950:"oklch(14.1% 0.005 285.823)"},neutral:{50:"oklch(98.5% 0 0)",100:"oklch(97% 0 0)",200:"oklch(92.2% 0 0)",300:"oklch(87% 0 0)",400:"oklch(70.8% 0 0)",500:"oklch(55.6% 0 0)",600:"oklch(43.9% 0 0)",700:"oklch(37.1% 0 0)",800:"oklch(26.9% 0 0)",900:"oklch(20.5% 0 0)",950:"oklch(14.5% 0 0)"},stone:{50:"oklch(98.5% 0.001 106.423)",100:"oklch(97% 0.001 106.424)",200:"oklch(92.3% 0.003 48.717)",300:"oklch(86.9% 0.005 56.366)",400:"oklch(70.9% 0.01 56.259)",500:"oklch(55.3% 0.013 58.071)",600:"oklch(44.4% 0.011 73.639)",700:"oklch(37.4% 0.01 67.558)",800:"oklch(26.8% 0.007 34.298)",900:"oklch(21.6% 0.006 56.043)",950:"oklch(14.7% 0.004 49.25)"},mauve:{50:"oklch(98.5% 0 0)",100:"oklch(96% 0.003 325.6)",200:"oklch(92.2% 0.005 325.62)",300:"oklch(86.5% 0.012 325.68)",400:"oklch(71.1% 0.019 323.02)",500:"oklch(54.2% 0.034 322.5)",600:"oklch(43.5% 0.029 321.78)",700:"oklch(36.4% 0.029 323.89)",800:"oklch(26.3% 0.024 320.12)",900:"oklch(21.2% 0.019 322.12)",950:"oklch(14.5% 0.008 326)"},olive:{50:"oklch(98.8% 0.003 106.5)",100:"oklch(96.6% 0.005 106.5)",200:"oklch(93% 0.007 106.5)",300:"oklch(88% 0.011 106.6)",400:"oklch(73.7% 0.021 106.9)",500:"oklch(58% 0.031 107.3)",600:"oklch(46.6% 0.025 107.3)",700:"oklch(39.4% 0.023 107.4)",800:"oklch(28.6% 0.016 107.4)",900:"oklch(22.8% 0.013 107.4)",950:"oklch(15.3% 0.006 107.1)"},mist:{50:"oklch(98.7% 0.002 197.1)",100:"oklch(96.3% 0.002 197.1)",200:"oklch(92.5% 0.005 214.3)",300:"oklch(87.2% 0.007 219.6)",400:"oklch(72.3% 0.014 214.4)",500:"oklch(56% 0.021 213.5)",600:"oklch(45% 0.017 213.2)",700:"oklch(37.8% 0.015 216)",800:"oklch(27.5% 0.011 216.9)",900:"oklch(21.8% 0.008 223.9)",950:"oklch(14.8% 0.004 228.8)"},taupe:{50:"oklch(98.6% 0.002 67.8)",100:"oklch(96% 0.002 17.2)",200:"oklch(92.2% 0.005 34.3)",300:"oklch(86.8% 0.007 39.5)",400:"oklch(71.4% 0.014 41.2)",500:"oklch(54.7% 0.021 43.1)",600:"oklch(43.8% 0.017 39.3)",700:"oklch(36.7% 0.016 35.7)",800:"oklch(26.8% 0.011 36.5)",900:"oklch(21.4% 0.009 43.1)",950:"oklch(14.7% 0.004 49.3)"},red:{50:"oklch(97.1% 0.013 17.38)",100:"oklch(93.6% 0.032 17.717)",200:"oklch(88.5% 0.062 18.334)",300:"oklch(80.8% 0.114 19.571)",400:"oklch(70.4% 0.191 22.216)",500:"oklch(63.7% 0.237 25.331)",600:"oklch(57.7% 0.245 27.325)",700:"oklch(50.5% 0.213 27.518)",800:"oklch(44.4% 0.177 26.899)",900:"oklch(39.6% 0.141 25.723)",950:"oklch(25.8% 0.092 26.042)"},orange:{50:"oklch(98% 0.016 73.684)",100:"oklch(95.4% 0.038 75.164)",200:"oklch(90.1% 0.076 70.697)",300:"oklch(83.7% 0.128 66.29)",400:"oklch(75% 0.183 55.934)",500:"oklch(70.5% 0.213 47.604)",600:"oklch(64.6% 0.222 41.116)",700:"oklch(55.3% 0.195 38.402)",800:"oklch(47% 0.157 37.304)",900:"oklch(40.8% 0.123 38.172)",950:"oklch(26.6% 0.079 36.259)"},amber:{50:"oklch(98.7% 0.022 95.277)",100:"oklch(96.2% 0.059 95.617)",200:"oklch(92.4% 0.12 95.746)",300:"oklch(87.9% 0.169 91.605)",400:"oklch(82.8% 0.189 84.429)",500:"oklch(76.9% 0.188 70.08)",600:"oklch(66.6% 0.179 58.318)",700:"oklch(55.5% 0.163 48.998)",800:"oklch(47.3% 0.137 46.201)",900:"oklch(41.4% 0.112 45.904)",950:"oklch(27.9% 0.077 45.635)"},yellow:{50:"oklch(98.7% 0.026 102.212)",100:"oklch(97.3% 0.071 103.193)",200:"oklch(94.5% 0.129 101.54)",300:"oklch(90.5% 0.182 98.111)",400:"oklch(85.2% 0.199 91.936)",500:"oklch(79.5% 0.184 86.047)",600:"oklch(68.1% 0.162 75.834)",700:"oklch(55.4% 0.135 66.442)",800:"oklch(47.6% 0.114 61.907)",900:"oklch(42.1% 0.095 57.708)",950:"oklch(28.6% 0.066 53.813)"},lime:{50:"oklch(98.6% 0.031 120.757)",100:"oklch(96.7% 0.067 122.328)",200:"oklch(93.8% 0.127 124.321)",300:"oklch(89.7% 0.196 126.665)",400:"oklch(84.1% 0.238 128.85)",500:"oklch(76.8% 0.233 130.85)",600:"oklch(64.8% 0.2 131.684)",700:"oklch(53.2% 0.157 131.589)",800:"oklch(45.3% 0.124 130.933)",900:"oklch(40.5% 0.101 131.063)",950:"oklch(27.4% 0.072 132.109)"},green:{50:"oklch(98.2% 0.018 155.826)",100:"oklch(96.2% 0.044 156.743)",200:"oklch(92.5% 0.084 155.995)",300:"oklch(87.1% 0.15 154.449)",400:"oklch(79.2% 0.209 151.711)",500:"oklch(72.3% 0.219 149.579)",600:"oklch(62.7% 0.194 149.214)",700:"oklch(52.7% 0.154 150.069)",800:"oklch(44.8% 0.119 151.328)",900:"oklch(39.3% 0.095 152.535)",950:"oklch(26.6% 0.065 152.934)"},emerald:{50:"oklch(97.9% 0.021 166.113)",100:"oklch(95% 0.052 163.051)",200:"oklch(90.5% 0.093 164.15)",300:"oklch(84.5% 0.143 164.978)",400:"oklch(76.5% 0.177 163.223)",500:"oklch(69.6% 0.17 162.48)",600:"oklch(59.6% 0.145 163.225)",700:"oklch(50.8% 0.118 165.612)",800:"oklch(43.2% 0.095 166.913)",900:"oklch(37.8% 0.077 168.94)",950:"oklch(26.2% 0.051 172.552)"},teal:{50:"oklch(98.4% 0.014 180.72)",100:"oklch(95.3% 0.051 180.801)",200:"oklch(91% 0.096 180.426)",300:"oklch(85.5% 0.138 181.071)",400:"oklch(77.7% 0.152 181.912)",500:"oklch(70.4% 0.14 182.503)",600:"oklch(60% 0.118 184.704)",700:"oklch(51.1% 0.096 186.391)",800:"oklch(43.7% 0.078 188.216)",900:"oklch(38.6% 0.063 188.416)",950:"oklch(27.7% 0.046 192.524)"},cyan:{50:"oklch(98.4% 0.019 200.873)",100:"oklch(95.6% 0.045 203.388)",200:"oklch(91.7% 0.08 205.041)",300:"oklch(86.5% 0.127 207.078)",400:"oklch(78.9% 0.154 211.53)",500:"oklch(71.5% 0.143 215.221)",600:"oklch(60.9% 0.126 221.723)",700:"oklch(52% 0.105 223.128)",800:"oklch(45% 0.085 224.283)",900:"oklch(39.8% 0.07 227.392)",950:"oklch(30.2% 0.056 229.695)"},sky:{50:"oklch(97.7% 0.013 236.62)",100:"oklch(95.1% 0.026 236.824)",200:"oklch(90.1% 0.058 230.902)",300:"oklch(82.8% 0.111 230.318)",400:"oklch(74.6% 0.16 232.661)",500:"oklch(68.5% 0.169 237.323)",600:"oklch(58.8% 0.158 241.966)",700:"oklch(50% 0.134 242.749)",800:"oklch(44.3% 0.11 240.79)",900:"oklch(39.1% 0.09 240.876)",950:"oklch(29.3% 0.066 243.157)"},blue:{50:"oklch(97% 0.014 254.604)",100:"oklch(93.2% 0.032 255.585)",200:"oklch(88.2% 0.059 254.128)",300:"oklch(80.9% 0.105 251.813)",400:"oklch(70.7% 0.165 254.624)",500:"oklch(62.3% 0.214 259.815)",600:"oklch(54.6% 0.245 262.881)",700:"oklch(48.8% 0.243 264.376)",800:"oklch(42.4% 0.199 265.638)",900:"oklch(37.9% 0.146 265.522)",950:"oklch(28.2% 0.091 267.935)"},indigo:{50:"oklch(96.2% 0.018 272.314)",100:"oklch(93% 0.034 272.788)",200:"oklch(87% 0.065 274.039)",300:"oklch(78.5% 0.115 274.713)",400:"oklch(67.3% 0.182 276.935)",500:"oklch(58.5% 0.233 277.117)",600:"oklch(51.1% 0.262 276.966)",700:"oklch(45.7% 0.24 277.023)",800:"oklch(39.8% 0.195 277.366)",900:"oklch(35.9% 0.144 278.697)",950:"oklch(25.7% 0.09 281.288)"},violet:{50:"oklch(96.9% 0.016 293.756)",100:"oklch(94.3% 0.029 294.588)",200:"oklch(89.4% 0.057 293.283)",300:"oklch(81.1% 0.111 293.571)",400:"oklch(70.2% 0.183 293.541)",500:"oklch(60.6% 0.25 292.717)",600:"oklch(54.1% 0.281 293.009)",700:"oklch(49.1% 0.27 292.581)",800:"oklch(43.2% 0.232 292.759)",900:"oklch(38% 0.189 293.745)",950:"oklch(28.3% 0.141 291.089)"},purple:{50:"oklch(97.7% 0.014 308.299)",100:"oklch(94.6% 0.033 307.174)",200:"oklch(90.2% 0.063 306.703)",300:"oklch(82.7% 0.119 306.383)",400:"oklch(71.4% 0.203 305.504)",500:"oklch(62.7% 0.265 303.9)",600:"oklch(55.8% 0.288 302.321)",700:"oklch(49.6% 0.265 301.924)",800:"oklch(43.8% 0.218 303.724)",900:"oklch(38.1% 0.176 304.987)",950:"oklch(29.1% 0.149 302.717)"},fuchsia:{50:"oklch(97.7% 0.017 320.058)",100:"oklch(95.2% 0.037 318.852)",200:"oklch(90.3% 0.076 319.62)",300:"oklch(83.3% 0.145 321.434)",400:"oklch(74% 0.238 322.16)",500:"oklch(66.7% 0.295 322.15)",600:"oklch(59.1% 0.293 322.896)",700:"oklch(51.8% 0.253 323.949)",800:"oklch(45.2% 0.211 324.591)",900:"oklch(40.1% 0.17 325.612)",950:"oklch(29.3% 0.136 325.661)"},pink:{50:"oklch(97.1% 0.014 343.198)",100:"oklch(94.8% 0.028 342.258)",200:"oklch(89.9% 0.061 343.231)",300:"oklch(82.3% 0.12 346.018)",400:"oklch(71.8% 0.202 349.761)",500:"oklch(65.6% 0.241 354.308)",600:"oklch(59.2% 0.249 0.584)",700:"oklch(52.5% 0.223 3.958)",800:"oklch(45.9% 0.187 3.815)",900:"oklch(40.8% 0.153 2.432)",950:"oklch(28.4% 0.109 3.907)"},rose:{50:"oklch(96.9% 0.015 12.422)",100:"oklch(94.1% 0.03 12.58)",200:"oklch(89.2% 0.058 10.001)",300:"oklch(81% 0.117 11.638)",400:"oklch(71.2% 0.194 13.428)",500:"oklch(64.5% 0.246 16.439)",600:"oklch(58.6% 0.253 17.585)",700:"oklch(51.4% 0.222 16.935)",800:"oklch(45.5% 0.188 13.697)",900:"oklch(41% 0.159 10.272)",950:"oklch(27.1% 0.105 12.094)"}};function er(e){return{__BARE_VALUE__:e}}var tr=er((e=>{if(je(e.value))return e.value})),rr=er((e=>{if(je(e.value))return`${e.value}%`})),nr=er((e=>{if(je(e.value))return`${e.value}px`})),or=er((e=>{if(je(e.value))return`${e.value}ms`})),ar=er((e=>{if(je(e.value))return`${e.value}deg`})),ir=er((e=>{if(null===e.fraction)return;let[t,r]=Y(e.fraction,"/");return je(t)&&je(r)?e.fraction:void 0})),lr=er((e=>{if(je(Number(e.value)))return`repeat(${e.value}, minmax(0, 1fr))`})),sr={accentColor:({theme:e})=>e("colors"),animation:{none:"none",spin:"spin 1s linear infinite",ping:"ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",pulse:"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",bounce:"bounce 1s infinite"},aria:{busy:'busy="true"',checked:'checked="true"',disabled:'disabled="true"',expanded:'expanded="true"',hidden:'hidden="true"',pressed:'pressed="true"',readonly:'readonly="true"',required:'required="true"',selected:'selected="true"'},aspectRatio:{auto:"auto",square:"1 / 1",video:"16 / 9",...ir},backdropBlur:({theme:e})=>e("blur"),backdropBrightness:({theme:e})=>({...e("brightness"),...rr}),backdropContrast:({theme:e})=>({...e("contrast"),...rr}),backdropGrayscale:({theme:e})=>({...e("grayscale"),...rr}),backdropHueRotate:({theme:e})=>({...e("hueRotate"),...ar}),backdropInvert:({theme:e})=>({...e("invert"),...rr}),backdropOpacity:({theme:e})=>({...e("opacity"),...rr}),backdropSaturate:({theme:e})=>({...e("saturate"),...rr}),backdropSepia:({theme:e})=>({...e("sepia"),...rr}),backgroundColor:({theme:e})=>e("colors"),backgroundImage:{none:"none","gradient-to-t":"linear-gradient(to top, var(--tw-gradient-stops))","gradient-to-tr":"linear-gradient(to top right, var(--tw-gradient-stops))","gradient-to-r":"linear-gradient(to right, var(--tw-gradient-stops))","gradient-to-br":"linear-gradient(to bottom right, var(--tw-gradient-stops))","gradient-to-b":"linear-gradient(to bottom, var(--tw-gradient-stops))","gradient-to-bl":"linear-gradient(to bottom left, var(--tw-gradient-stops))","gradient-to-l":"linear-gradient(to left, var(--tw-gradient-stops))","gradient-to-tl":"linear-gradient(to top left, var(--tw-gradient-stops))"},backgroundOpacity:({theme:e})=>e("opacity"),backgroundPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},backgroundSize:{auto:"auto",cover:"cover",contain:"contain"},blur:{0:"0",none:"",sm:"4px",DEFAULT:"8px",md:"12px",lg:"16px",xl:"24px","2xl":"40px","3xl":"64px"},borderColor:({theme:e})=>({DEFAULT:"currentcolor",...e("colors")}),borderOpacity:({theme:e})=>e("opacity"),borderRadius:{none:"0px",sm:"0.125rem",DEFAULT:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},borderSpacing:({theme:e})=>e("spacing"),borderWidth:{DEFAULT:"1px",0:"0px",2:"2px",4:"4px",8:"8px",...nr},boxShadow:{sm:"0 1px 2px 0 rgb(0 0 0 / 0.05)",DEFAULT:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",md:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",lg:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",xl:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)","2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",none:"none"},boxShadowColor:({theme:e})=>e("colors"),brightness:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5",200:"2",...rr},caretColor:({theme:e})=>e("colors"),colors:()=>({...Qt}),columns:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12","3xs":"16rem","2xs":"18rem",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",...tr},container:{},content:{none:"none"},contrast:{0:"0",50:".5",75:".75",100:"1",125:"1.25",150:"1.5",200:"2",...rr},cursor:{auto:"auto",default:"default",pointer:"pointer",wait:"wait",text:"text",move:"move",help:"help","not-allowed":"not-allowed",none:"none","context-menu":"context-menu",progress:"progress",cell:"cell",crosshair:"crosshair","vertical-text":"vertical-text",alias:"alias",copy:"copy","no-drop":"no-drop",grab:"grab",grabbing:"grabbing","all-scroll":"all-scroll","col-resize":"col-resize","row-resize":"row-resize","n-resize":"n-resize","e-resize":"e-resize","s-resize":"s-resize","w-resize":"w-resize","ne-resize":"ne-resize","nw-resize":"nw-resize","se-resize":"se-resize","sw-resize":"sw-resize","ew-resize":"ew-resize","ns-resize":"ns-resize","nesw-resize":"nesw-resize","nwse-resize":"nwse-resize","zoom-in":"zoom-in","zoom-out":"zoom-out"},divideColor:({theme:e})=>e("borderColor"),divideOpacity:({theme:e})=>e("borderOpacity"),divideWidth:({theme:e})=>({...e("borderWidth"),...nr}),dropShadow:{sm:"0 1px 1px rgb(0 0 0 / 0.05)",DEFAULT:["0 1px 2px rgb(0 0 0 / 0.1)","0 1px 1px rgb(0 0 0 / 0.06)"],md:["0 4px 3px rgb(0 0 0 / 0.07)","0 2px 2px rgb(0 0 0 / 0.06)"],lg:["0 10px 8px rgb(0 0 0 / 0.04)","0 4px 3px rgb(0 0 0 / 0.1)"],xl:["0 20px 13px rgb(0 0 0 / 0.03)","0 8px 5px rgb(0 0 0 / 0.08)"],"2xl":"0 25px 25px rgb(0 0 0 / 0.15)",none:"0 0 #0000"},fill:({theme:e})=>e("colors"),flex:{1:"1 1 0%",auto:"1 1 auto",initial:"0 1 auto",none:"none"},flexBasis:({theme:e})=>({auto:"auto","1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",...e("spacing")}),flexGrow:{0:"0",DEFAULT:"1",...tr},flexShrink:{0:"0",DEFAULT:"1",...tr},fontFamily:{sans:["ui-sans-serif","system-ui","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"','"Noto Color Emoji"'],serif:["ui-serif","Georgia","Cambria",'"Times New Roman"',"Times","serif"],mono:["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas",'"Liberation Mono"','"Courier New"',"monospace"]},fontSize:{xs:["0.75rem",{lineHeight:"1rem"}],sm:["0.875rem",{lineHeight:"1.25rem"}],base:["1rem",{lineHeight:"1.5rem"}],lg:["1.125rem",{lineHeight:"1.75rem"}],xl:["1.25rem",{lineHeight:"1.75rem"}],"2xl":["1.5rem",{lineHeight:"2rem"}],"3xl":["1.875rem",{lineHeight:"2.25rem"}],"4xl":["2.25rem",{lineHeight:"2.5rem"}],"5xl":["3rem",{lineHeight:"1"}],"6xl":["3.75rem",{lineHeight:"1"}],"7xl":["4.5rem",{lineHeight:"1"}],"8xl":["6rem",{lineHeight:"1"}],"9xl":["8rem",{lineHeight:"1"}]},fontWeight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},gap:({theme:e})=>e("spacing"),gradientColorStops:({theme:e})=>e("colors"),gradientColorStopPositions:{"0%":"0%","5%":"5%","10%":"10%","15%":"15%","20%":"20%","25%":"25%","30%":"30%","35%":"35%","40%":"40%","45%":"45%","50%":"50%","55%":"55%","60%":"60%","65%":"65%","70%":"70%","75%":"75%","80%":"80%","85%":"85%","90%":"90%","95%":"95%","100%":"100%",...rr},grayscale:{0:"0",DEFAULT:"100%",...rr},gridAutoColumns:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridAutoRows:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridColumn:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridColumnEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",...tr},gridColumnStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",...tr},gridRow:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridRowEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",...tr},gridRowStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",...tr},gridTemplateColumns:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))",...lr},gridTemplateRows:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))",...lr},height:({theme:e})=>({auto:"auto","1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),hueRotate:{0:"0deg",15:"15deg",30:"30deg",60:"60deg",90:"90deg",180:"180deg",...ar},inset:({theme:e})=>({auto:"auto","1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%",...e("spacing")}),invert:{0:"0",DEFAULT:"100%",...rr},keyframes:{spin:{to:{transform:"rotate(360deg)"}},ping:{"75%, 100%":{transform:"scale(2)",opacity:"0"}},pulse:{"50%":{opacity:".5"}},bounce:{"0%, 100%":{transform:"translateY(-25%)",animationTimingFunction:"cubic-bezier(0.8,0,1,1)"},"50%":{transform:"none",animationTimingFunction:"cubic-bezier(0,0,0.2,1)"}}},letterSpacing:{tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},lineHeight:{none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},listStyleType:{none:"none",disc:"disc",decimal:"decimal"},listStyleImage:{none:"none"},margin:({theme:e})=>({auto:"auto",...e("spacing")}),lineClamp:{1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",...tr},maxHeight:({theme:e})=>({none:"none",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),maxWidth:({theme:e})=>({none:"none",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",full:"100%",min:"min-content",max:"max-content",fit:"fit-content",prose:"65ch",...e("spacing")}),minHeight:({theme:e})=>({full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),minWidth:({theme:e})=>({full:"100%",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),objectPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},opacity:{0:"0",5:"0.05",10:"0.1",15:"0.15",20:"0.2",25:"0.25",30:"0.3",35:"0.35",40:"0.4",45:"0.45",50:"0.5",55:"0.55",60:"0.6",65:"0.65",70:"0.7",75:"0.75",80:"0.8",85:"0.85",90:"0.9",95:"0.95",100:"1",...rr},order:{first:"-9999",last:"9999",none:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",...tr},outlineColor:({theme:e})=>e("colors"),outlineOffset:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},outlineWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},padding:({theme:e})=>e("spacing"),placeholderColor:({theme:e})=>e("colors"),placeholderOpacity:({theme:e})=>e("opacity"),ringColor:({theme:e})=>({DEFAULT:"currentcolor",...e("colors")}),ringOffsetColor:({theme:e})=>e("colors"),ringOffsetWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},ringOpacity:({theme:e})=>({DEFAULT:"0.5",...e("opacity")}),ringWidth:{DEFAULT:"3px",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},rotate:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg",45:"45deg",90:"90deg",180:"180deg",...ar},saturate:{0:"0",50:".5",100:"1",150:"1.5",200:"2",...rr},scale:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5",...rr},screens:{sm:"40rem",md:"48rem",lg:"64rem",xl:"80rem","2xl":"96rem"},scrollMargin:({theme:e})=>e("spacing"),scrollPadding:({theme:e})=>e("spacing"),sepia:{0:"0",DEFAULT:"100%",...rr},skew:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg",...ar},space:({theme:e})=>e("spacing"),spacing:{px:"1px",0:"0px",.5:"0.125rem",1:"0.25rem",1.5:"0.375rem",2:"0.5rem",2.5:"0.625rem",3:"0.75rem",3.5:"0.875rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",14:"3.5rem",16:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},stroke:({theme:e})=>({none:"none",...e("colors")}),strokeWidth:{0:"0",1:"1",2:"2",...tr},supports:{},data:{},textColor:({theme:e})=>e("colors"),textDecorationColor:({theme:e})=>e("colors"),textDecorationThickness:{auto:"auto","from-font":"from-font",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},textIndent:({theme:e})=>e("spacing"),textOpacity:({theme:e})=>e("opacity"),textUnderlineOffset:{auto:"auto",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px",...nr},transformOrigin:{center:"center",top:"top","top-right":"top right",right:"right","bottom-right":"bottom right",bottom:"bottom","bottom-left":"bottom left",left:"left","top-left":"top left"},transitionDelay:{0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms",...or},transitionDuration:{DEFAULT:"150ms",0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms",...or},transitionProperty:{none:"none",all:"all",DEFAULT:"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",colors:"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",opacity:"opacity",shadow:"box-shadow",transform:"transform"},transitionTimingFunction:{DEFAULT:"cubic-bezier(0.4, 0, 0.2, 1)",linear:"linear",in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)","in-out":"cubic-bezier(0.4, 0, 0.2, 1)"},translate:({theme:e})=>({"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%",...e("spacing")}),size:({theme:e})=>({auto:"auto","1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),width:({theme:e})=>({auto:"auto","1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",screen:"100vw",svw:"100svw",lvw:"100lvw",dvw:"100dvw",min:"min-content",max:"max-content",fit:"fit-content",...e("spacing")}),willChange:{auto:"auto",scroll:"scroll-position",contents:"contents",transform:"transform"},zIndex:{auto:"auto",0:"0",10:"10",20:"20",30:"30",40:"40",50:"50",...tr}};function cr(e){return{theme:{...sr,colors:({theme:e})=>e("color",{}),extend:{fontSize:({theme:e})=>({...e("text",{})}),boxShadow:({theme:e})=>({...e("shadow",{})}),animation:({theme:e})=>({...e("animate",{})}),aspectRatio:({theme:e})=>({...e("aspect",{})}),borderRadius:({theme:e})=>({...e("radius",{})}),screens:({theme:e})=>({...e("breakpoint",{})}),letterSpacing:({theme:e})=>({...e("tracking",{})}),lineHeight:({theme:e})=>({...e("leading",{})}),transitionDuration:{DEFAULT:e.get(["--default-transition-duration"])??null},transitionTimingFunction:{DEFAULT:e.get(["--default-transition-timing-function"])??null},maxWidth:({theme:e})=>({...e("container",{})})}}}}var ur={blocklist:[],future:{},experimental:{},prefix:"",important:!1,darkMode:null,theme:{},plugins:[],content:{files:[]}};function dr(e,t){let r={design:e,configs:[],plugins:[],content:{files:[]},theme:{},extend:{},result:structuredClone(ur)};for(let e of t)pr(r,e);for(let e of r.configs)"darkMode"in e&&void 0!==e.darkMode&&(r.result.darkMode=e.darkMode??null),"prefix"in e&&void 0!==e.prefix&&(r.result.prefix=e.prefix??""),"blocklist"in e&&void 0!==e.blocklist&&(r.result.blocklist=e.blocklist??[]),"important"in e&&void 0!==e.important&&(r.result.important=e.important??!1);let n=function(e){let t=new Set,r=It(e.design,(()=>e.theme),o),n=Object.assign(r,{theme:r,colors:Qt});function o(e){return"function"==typeof e?e(n)??null:e??null}for(let r of e.configs){let n=r.theme??{},o=n.extend??{};for(let e in n)"extend"!==e&&t.add(e);Object.assign(e.theme,n);for(let t in o)e.extend[t]??=[],e.extend[t].push(o[t])}delete e.theme.extend;for(let t in e.extend){let r=[e.theme[t],...e.extend[t]];e.theme[t]=()=>Lt({},r.map(o),fr)}for(let t in e.theme)e.theme[t]=o(e.theme[t]);if(e.theme.screens&&"object"==typeof e.theme.screens)for(let t of Object.keys(e.theme.screens)){let r=e.theme.screens[t];r&&"object"==typeof r&&("raw"in r||"max"in r||"min"in r&&(e.theme.screens[t]=r.min))}return t}(r);return{resolvedConfig:{...r.result,content:r.content,theme:r.theme,plugins:r.plugins},replacedThemeKeys:n}}function fr(e,t){return Array.isArray(e)&&Bt(e[0])?e.concat(t):Array.isArray(t)&&Bt(t[0])&&Bt(e)?[e,...t]:Array.isArray(t)?t:void 0}function pr(e,{config:t,base:r,path:n,reference:o,src:a}){let i=[];for(let e of t.plugins??[])"__isOptionsFunction"in e?i.push({...e(),reference:o,src:a}):"handler"in e?i.push({...e,reference:o,src:a}):i.push({handler:e,reference:o,src:a});if(Array.isArray(t.presets)&&0===t.presets.length)throw new Error("Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported.");for(let i of t.presets??[])pr(e,{path:n,base:r,config:i,reference:o,src:a});for(let t of i)e.plugins.push(t),t.config&&pr(e,{path:n,base:r,config:t.config,reference:!!t.reference,src:t.src??a});let l=t.content??[],s=Array.isArray(l)?l:l.files;for(let t of s)e.content.files.push("object"==typeof t?t:{base:r,pattern:t});e.configs.push(t)}function hr(e,t){let r=e.theme.container||{};if("object"!=typeof r||null===r)return;let n=function({center:e,padding:t,screens:r},n){let o=[],a=null;if(e&&o.push(j("margin-inline","auto")),("string"==typeof t||"object"==typeof t&&null!==t&&"DEFAULT"in t)&&o.push(j("padding-inline","string"==typeof t?t:t.DEFAULT)),"object"==typeof r&&null!==r){a=new Map;let e=Array.from(n.theme.namespace("--breakpoint").entries());if(e.sort(((e,t)=>ce(e[1],t[1],"asc"))),e.length>0){let[t]=e[0];o.push(S("@media",`(width >= --theme(--breakpoint-${t}))`,[j("max-width","none")]))}for(let[e,t]of Object.entries(r)){if("object"==typeof t){if(!("min"in t))continue;t=t.min}a.set(e,S("@media",`(width >= ${t})`,[j("max-width",t)]))}}if("object"==typeof t&&null!==t){let e=Object.entries(t).filter((([e])=>"DEFAULT"!==e)).map((([e,t])=>[e,n.theme.resolveValue(e,["--breakpoint"]),t])).filter(Boolean);e.sort(((e,t)=>ce(e[1],t[1],"asc")));for(let[t,,r]of e)if(a&&a.has(t))a.get(t).nodes.push(j("padding-inline",r));else{if(a)continue;o.push(S("@media",`(width >= theme(--breakpoint-${t}))`,[j("padding-inline",r)]))}}if(a)for(let[,e]of a)o.push(e);return o}(r,t);0!==n.length&&t.utilities.static("container",(()=>n.map(E)))}function mr({addVariant:e,config:t}){let r=t("darkMode",null),[n,o=".dark"]=Array.isArray(r)?r:[r];if("variant"===n){let e;if(Array.isArray(o)||"function"==typeof o?e=o:"string"==typeof o&&(e=[o]),Array.isArray(e))for(let t of e)".dark"===t?(n=!1,console.warn('When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`')):t.includes("&")||(n=!1,console.warn('When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`'));o=e}null===n||("selector"===n?e("dark",`&:where(${o}, ${o} *)`):"media"===n?e("dark","@media (prefers-color-scheme: dark)"):"variant"===n?e("dark",o):"class"===n&&e("dark",`&:is(${o} *)`))}function gr(e){return(Array.isArray(e)?e:[e]).map((e=>"string"==typeof e?{min:e}:e&&"object"==typeof e?e:null)).map((e=>{if(null===e)return null;if("raw"in e)return e.raw;let t="";return void 0!==e.max&&(t+=`${e.max} >= `),t+="width",void 0!==e.min&&(t+=` >= ${e.min}`),`(${t})`})).filter(Boolean).join(", ")}var vr=/^[a-z]+$/;async function kr({designSystem:e,base:t,ast:r,loadModule:n,sources:o}){let a=0,i=[],l=[];y(r,((e,t)=>{if("at-rule"!==e.kind)return;let r=O(t);if("@plugin"===e.name){if(null!==r.parent)throw new Error("`@plugin` cannot be nested.");let t=e.params.slice(1,-1);if(0===t.length)throw new Error("`@plugin` must have a path.");let n={};for(let t of e.nodes??[]){if("declaration"!==t.kind)throw new Error(`Unexpected \`@plugin\` option:\n\n${F([t])}\n\n\`@plugin\` options must be a flat list of declarations.`);if(void 0===t.value)continue;let e=Y(t.value,",").map((e=>{if("null"===(e=e.trim()))return null;if("true"===e)return!0;if("false"===e)return!1;if(!Number.isNaN(Number(e)))return Number(e);if('"'===e[0]&&'"'===e[e.length-1]||"'"===e[0]&&"'"===e[e.length-1])return e.slice(1,-1);if("{"===e[0]&&"}"===e[e.length-1])throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${F([t]).trim()}\` is not supported.\n\nUsing an object as a plugin option is currently only supported in JavaScript configuration files.`);return e}));n[t.property]=1===e.length?e[0]:e}return i.push([{id:t,base:r.context.base,reference:!!r.context.reference,src:e.src},Object.keys(n).length>0?n:null]),a|=4,b.Replace([])}if("@config"===e.name){if(e.nodes.length>0)throw new Error("`@config` cannot have a body.");if(null!==r.parent)throw new Error("`@config` cannot be nested.");return l.push({id:e.params.slice(1,-1),base:r.context.base,reference:!!r.context.reference,src:e.src}),a|=4,b.Replace([])}})),function(e){for(let[t,r]of[["t","top"],["tr","top right"],["r","right"],["br","bottom right"],["b","bottom"],["bl","bottom left"],["l","left"],["tl","top left"]])e.utilities.suggest(`bg-gradient-to-${t}`,(()=>[])),e.utilities.static(`bg-gradient-to-${t}`,(()=>[j("--tw-gradient-position",`to ${r} in oklab`),j("background-image","linear-gradient(var(--tw-gradient-stops))")]));e.utilities.suggest("bg-left-top",(()=>[])),e.utilities.static("bg-left-top",(()=>[j("background-position","left top")])),e.utilities.suggest("bg-right-top",(()=>[])),e.utilities.static("bg-right-top",(()=>[j("background-position","right top")])),e.utilities.suggest("bg-left-bottom",(()=>[])),e.utilities.static("bg-left-bottom",(()=>[j("background-position","left bottom")])),e.utilities.suggest("bg-right-bottom",(()=>[])),e.utilities.static("bg-right-bottom",(()=>[j("background-position","right bottom")])),e.utilities.suggest("object-left-top",(()=>[])),e.utilities.static("object-left-top",(()=>[j("object-position","left top")])),e.utilities.suggest("object-right-top",(()=>[])),e.utilities.static("object-right-top",(()=>[j("object-position","right top")])),e.utilities.suggest("object-left-bottom",(()=>[])),e.utilities.static("object-left-bottom",(()=>[j("object-position","left bottom")])),e.utilities.suggest("object-right-bottom",(()=>[])),e.utilities.static("object-right-bottom",(()=>[j("object-position","right bottom")])),e.utilities.suggest("max-w-screen",(()=>[])),e.utilities.functional("max-w-screen",(t=>{if(!t.value||"arbitrary"===t.value.kind)return;let r=e.theme.resolve(t.value.value,["--breakpoint"]);return r?[j("max-width",r)]:void 0})),e.utilities.suggest("overflow-ellipsis",(()=>[])),e.utilities.static("overflow-ellipsis",(()=>[j("text-overflow","ellipsis")])),e.utilities.suggest("decoration-slice",(()=>[])),e.utilities.static("decoration-slice",(()=>[j("-webkit-box-decoration-break","slice"),j("box-decoration-break","slice")])),e.utilities.suggest("decoration-clone",(()=>[])),e.utilities.static("decoration-clone",(()=>[j("-webkit-box-decoration-break","clone"),j("box-decoration-break","clone")])),e.utilities.suggest("flex-shrink",(()=>[])),e.utilities.functional("flex-shrink",(e=>{if(!e.modifier){if(!e.value)return[j("flex-shrink","1")];if("arbitrary"===e.value.kind)return[j("flex-shrink",e.value.value)];if(je(e.value.value))return[j("flex-shrink",e.value.value)]}})),e.utilities.suggest("flex-grow",(()=>[])),e.utilities.functional("flex-grow",(e=>{if(!e.modifier){if(!e.value)return[j("flex-grow","1")];if("arbitrary"===e.value.kind)return[j("flex-grow",e.value.value)];if(je(e.value.value))return[j("flex-grow",e.value.value)]}})),e.utilities.suggest("order-none",(()=>[])),e.utilities.static("order-none",(()=>[j("order","0")])),e.utilities.suggest("break-words",(()=>[])),e.utilities.static("break-words",(()=>[j("overflow-wrap","break-word")]));for(let[t,r]of[["start","inset-inline-start"],["end","inset-inline-end"]]){let n=function({negative:t}){return n=>{if(null===n.value)return;if("arbitrary"===n.value.kind){if(n.modifier)return;let e=n.value.value;return[j(r,t?`calc(${e} * -1)`:e)]}let o=e.theme.resolve(n.value.fraction??n.value.value,["--inset","--spacing"]);if(null===o&&n.value.fraction){let[e,t]=Y(n.value.fraction,"/");if(!je(e)||!je(t))return;o=`calc(${n.value.fraction} * 100%)`}if(null===o&&t){let t=e.theme.resolve(null,["--spacing"]);if(t&&Ve(n.value.value)&&(o=`calc(${t} * -${n.value.value})`,null!==o))return[j(r,o)]}if(null===o){let t=e.theme.resolve(null,["--spacing"]);t&&Ve(n.value.value)&&(o=`calc(${t} * ${n.value.value})`)}return null!==o?[j(r,t?`calc(${o} * -1)`:o)]:void 0}};e.utilities.static(`${t}-auto`,(()=>[j(r,"auto")])),e.utilities.static(`${t}-full`,(()=>[j(r,"100%")])),e.utilities.static(`-${t}-full`,(()=>[j(r,"-100%")])),e.utilities.static(`${t}-px`,(()=>[j(r,"1px")])),e.utilities.static(`-${t}-px`,(()=>[j(r,"-1px")])),e.utilities.functional(`-${t}`,n({negative:!0})),e.utilities.functional(t,n({negative:!1}))}}(e);let s=e.resolveThemeValue;if(e.resolveThemeValue=function(n,i){return n.startsWith("--")?s(n,i):(a|=wr({designSystem:e,base:t,ast:r,sources:o,configs:[],pluginDetails:[]}),e.resolveThemeValue(n,i))},!i.length&&!l.length)return 0;let[c,u]=await Promise.all([Promise.all(l.map((async({id:e,base:t,reference:r,src:o})=>{let a=await n(e,t,"config");return{path:e,base:a.base,config:a.module,reference:r,src:o}}))),Promise.all(i.map((async([{id:e,base:t,reference:r,src:o},a])=>{let i=await n(e,t,"plugin");return{path:e,base:i.base,plugin:i.module,options:a,reference:r,src:o}})))]);return a|=wr({designSystem:e,base:t,ast:r,sources:o,configs:c,pluginDetails:u}),a}function wr({designSystem:e,base:t,ast:r,sources:n,configs:o,pluginDetails:a}){let i=0,l=[...a.map((e=>{if(!e.options)return{config:{plugins:[e.plugin]},base:e.base,reference:e.reference,src:e.src};if("__isOptionsFunction"in e.plugin)return{config:{plugins:[e.plugin(e.options)]},base:e.base,reference:e.reference,src:e.src};throw new Error(`The plugin "${e.path}" does not accept options`)})),...o],{resolvedConfig:s}=dr(e,[{config:cr(e.theme),base:t,reference:!0,src:void 0},...l,{config:{plugins:[mr]},base:t,reference:!0,src:void 0}]),{resolvedConfig:c,replacedThemeKeys:u}=dr(e,l),d={designSystem:e,ast:r,resolvedConfig:s,featuresRef:{set current(e){i|=e}}},f=Zt({...d,referenceMode:!1,src:void 0}),p=e.resolveThemeValue;e.resolveThemeValue=function(e,t){if("-"===e[0]&&"-"===e[1])return p(e,t);let r=f.theme(e,void 0);return Array.isArray(r)&&2===r.length?r[0]:Array.isArray(r)?r.join(", "):"object"==typeof r&&null!==r&&"DEFAULT"in r?r.DEFAULT:"string"==typeof r?r:void 0};for(let{handler:e,reference:t,src:r}of s.plugins){e(Zt({...d,referenceMode:t??!1,src:r}))}if(jt(e,c,u),Xt(e,c),function(e,t){let r=e.theme.aria||{},n=e.theme.supports||{},o=e.theme.data||{};if(Object.keys(r).length>0){let e=t.variants.get("aria"),n=e?.applyFn,o=e?.compounds;t.variants.functional("aria",((e,t)=>{let o=t.value;return o&&"named"===o.kind&&o.value in r?n?.(e,{...t,value:{kind:"arbitrary",value:r[o.value]}}):n?.(e,t)}),{compounds:o})}if(Object.keys(n).length>0){let e=t.variants.get("supports"),r=e?.applyFn,o=e?.compounds;t.variants.functional("supports",((e,t)=>{let o=t.value;return o&&"named"===o.kind&&o.value in n?r?.(e,{...t,value:{kind:"arbitrary",value:n[o.value]}}):r?.(e,t)}),{compounds:o})}if(Object.keys(o).length>0){let e=t.variants.get("data"),r=e?.applyFn,n=e?.compounds;t.variants.functional("data",((e,t)=>{let n=t.value;return n&&"named"===n.kind&&n.value in o?r?.(e,{...t,value:{kind:"arbitrary",value:o[n.value]}}):r?.(e,t)}),{compounds:n})}}(c,e),function(e,t){let r=e.theme.screens||{},n=t.variants.get("min")?.order??0,o=[];for(let[e,a]of Object.entries(r)){let r=function(r){t.variants.static(e,(e=>{e.nodes=[S("@media",c,e.nodes)]}),{order:r})},i=t.variants.get(e),l=t.theme.resolveValue(e,["--breakpoint"]);if(i&&l&&!t.theme.hasDefault(`--breakpoint-${e}`))continue;let s=!0;"string"==typeof a&&(s=!1);let c=gr(a);s?o.push(r):r(n)}if(0!==o.length){for(let[,e]of t.variants.variants)e.order>n&&(e.order+=o.length);t.variants.compareFns=new Map(Array.from(t.variants.compareFns).map((([e,t])=>(e>n&&(e+=o.length),[e,t]))));for(let[e,t]of o.entries())t(n+e+1)}}(c,e),hr(c,e),!e.theme.prefix&&s.prefix){if(s.prefix.endsWith("-")&&(s.prefix=s.prefix.slice(0,-1),console.warn(`The prefix "${s.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`)),!vr.test(s.prefix))throw new Error(`The prefix "${s.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`);e.theme.prefix=s.prefix}if(!e.important&&!0===s.important&&(e.important=!0),"string"==typeof s.important){let e=s.important;y(r,((t,r)=>{if("at-rule"!==t.kind||"@tailwind"!==t.name||"utilities"!==t.params)return;let n=O(r);return"rule"===n.parent?.kind&&n.parent.selector===e?b.Stop:b.ReplaceStop(A(e,[t]))}))}for(let t of s.blocklist)e.invalidCandidates.add(t);for(let e of s.content.files){if("raw"in e)throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:\n\n${JSON.stringify(e,null,2)}\n\nThis feature is not currently supported.`);let t=!1;"!"==e.pattern[0]&&(t=!0,e.pattern=e.pattern.slice(1)),n.push({...e,negated:t})}return i}var br=/^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/;function yr(e){let t=e.indexOf("{");if(-1===t)return[e];let r=[],n=e.slice(0,t),o=e.slice(t),a=0,i=o.lastIndexOf("}");for(let e=0;e<o.length;e++){let t=o[e];if("{"===t)a++;else if("}"===t&&(a--,0===a)){i=e;break}}if(-1===i)throw new Error(`The pattern \`${e}\` is not balanced.`);let l,s=o.slice(1,i),c=o.slice(i+1);l=function(e){return br.test(e)}(s)?function(e){let t=e.match(br);if(!t)return[e];let[,r,n,o]=t,a=o?parseInt(o,10):void 0,i=[];if(/^-?\d+$/.test(r)&&/^-?\d+$/.test(n)){let e=parseInt(r,10),t=parseInt(n,10);if(void 0===a&&(a=e<=t?1:-1),0===a)throw new Error("Step cannot be zero in sequence expansion.");let o=e<t;o&&a<0&&(a=-a),!o&&a>0&&(a=-a);for(let r=e;o?r<=t:r>=t;r+=a)i.push(r.toString())}return i}(s):Y(s,","),l=l.flatMap((e=>yr(e)));let u=yr(c);for(let e of u)for(let t of l)r.push(n+t+e);return r}var xr=/^[a-z]+$/;function $r(){throw new Error("No `loadModule` function provided to `compile`")}function zr(){throw new Error("No `loadStylesheet` function provided to `compile`")}async function Ar(e,{base:t="",from:r,loadModule:n=$r,loadStylesheet:o=zr}={}){let a=0;e=[V({base:t},e)],a|=await St(e,t,o,0,void 0!==r);let i=null,c=new d,u=new Map,f=new Map,p=[],h=null,m=null,g=[],v=[],k=[],w=[],x=null;y(e,((e,t)=>{if("at-rule"!==e.kind)return;let r=O(t);if("@tailwind"===e.name&&("utilities"===e.params||e.params.startsWith("utilities"))){if(null!==m)return b.Replace([]);if(r.context.reference)return b.Replace([]);let t=Y(e.params," ");for(let e of t)if(e.startsWith("source(")){let t=e.slice(7,-1);if("none"===t){x=t;continue}if('"'===t[0]&&'"'!==t[t.length-1]||"'"===t[0]&&"'"!==t[t.length-1]||"'"!==t[0]&&'"'!==t[0])throw new Error("`source(â€¦)` paths must be quoted.");x={base:r.context.sourceBase??r.context.base,pattern:t.slice(1,-1)}}m=e,a|=16}if("@utility"===e.name){if(null!==r.parent)throw new Error("`@utility` cannot be nested.");if(0===e.nodes.length)throw new Error(`\`@utility ${e.params}\` is empty. Utilities should include at least one property.`);let t=Pe(e);if(null===t){if(!e.params.endsWith("-*")){if(e.params.endsWith("*"))throw new Error(`\`@utility ${e.params}\` defines an invalid utility name. A functional utility must end in \`-*\`.`);if(e.params.includes("*"))throw new Error(`\`@utility ${e.params}\` defines an invalid utility name. The dynamic portion marked by \`-*\` must appear once at the end.`)}throw new Error(`\`@utility ${e.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`)}p.push(t)}if("@source"===e.name){if(e.nodes.length>0)throw new Error("`@source` cannot have a body.");if(null!==r.parent)throw new Error("`@source` cannot be nested.");let t=!1,n=!1,o=e.params;if("n"===o[0]&&o.startsWith("not ")&&(t=!0,o=o.slice(4)),"i"===o[0]&&o.startsWith("inline(")&&(n=!0,o=o.slice(7,-1).trim()),'"'===o[0]&&'"'!==o[o.length-1]||"'"===o[0]&&"'"!==o[o.length-1]||"'"!==o[0]&&'"'!==o[0])throw new Error("`@source` paths must be quoted.");let a=o.slice(1,-1);if(n){let e=t?w:k,r=Y(a," ");for(let t of r)for(let r of yr(t))e.push(r)}else v.push({base:r.context.base,pattern:a,negated:t});return b.ReplaceSkip([])}if("@variant"===e.name&&(null===r.parent?0===e.nodes.length?e.name="@custom-variant":(y(e.nodes,(t=>{if("at-rule"===t.kind&&"@slot"===t.name)return e.name="@custom-variant",b.Stop})),"@variant"===e.name&&g.push(e)):g.push(e)),"@custom-variant"===e.name){if(null!==r.parent)throw new Error("`@custom-variant` cannot be nested.");let[t,n]=Y(e.params," ");if(!dt.test(t))throw new Error(`\`@custom-variant ${t}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes, or underscore characters and start with a lowercase letter or number.`);if(e.nodes.length>0&&n)throw new Error(`\`@custom-variant ${t}\` cannot have both a selector and a body.`);if(0===e.nodes.length){if(!n)throw new Error(`\`@custom-variant ${t}\` has no selector or body.`);let e=Y(n.slice(1,-1),",");if(0===e.length||e.some((e=>""===e.trim())))throw new Error(`\`@custom-variant ${t} (${e.join(",")})\` selector is invalid.`);let r=[],o=[];for(let t of e)t=t.trim(),"@"===t[0]?r.push(t):o.push(t);u.set(t,(e=>{e.variants.static(t,(e=>{let t=[];o.length>0&&t.push(A(o.join(", "),e.nodes));for(let n of r)t.push(C(n,e.nodes));e.nodes=t}),{compounds:pt([...o,...r])})})),f.set(t,new Set)}else{let r=new Set;y(e.nodes,(e=>{"at-rule"===e.kind&&"@variant"===e.name&&r.add(e.params)})),u.set(t,(r=>{r.variants.fromAst(t,e.nodes,r)})),f.set(t,r)}return b.ReplaceSkip([])}if("@media"===e.name){let t=Y(e.params," "),n=[];for(let o of t)if(o.startsWith("source(")){let t=o.slice(7,-1);y(e.nodes,(e=>{if("at-rule"===e.kind&&"@tailwind"===e.name&&"utilities"===e.params)return e.params+=` source(${t})`,b.ReplaceStop([V({sourceBase:r.context.base},[e])])}))}else if(o.startsWith("theme(")){let t=o.slice(6,-1),r=t.includes("reference");y(e.nodes,(e=>{if("context"!==e.kind){if("at-rule"!==e.kind){if(r)throw new Error('Files imported with `@import "â€¦" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "â€¦";` instead.');return b.Continue}if("@theme"===e.name)return e.params+=" "+t,b.Skip}}))}else if(o.startsWith("prefix(")){let t=o.slice(7,-1);y(e.nodes,(e=>{if("at-rule"===e.kind&&"@theme"===e.name)return e.params+=` prefix(${t})`,b.Skip}))}else"important"===o?i=!0:"reference"===o?e.nodes=[V({reference:!0},e.nodes)]:n.push(o);if(n.length>0)e.params=n.join(" ");else if(t.length>0)return b.Replace(e.nodes);return b.Continue}if("@theme"===e.name){let[t,n]=function(e){let t=0,r=null;for(let n of Y(e," "))"reference"===n?t|=2:"inline"===n?t|=1:"default"===n?t|=4:"static"===n?t|=8:n.startsWith("prefix(")&&n.endsWith(")")&&(r=n.slice(7,-1));return[t,r]}(e.params);if(a|=64,r.context.reference&&(t|=2),n){if(!xr.test(n))throw new Error(`The prefix "${n}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`);c.prefix=n}return y(e.nodes,(r=>{if("at-rule"===r.kind&&"@keyframes"===r.name)return c.addKeyframes(r),b.Skip;if("comment"===r.kind)return;if("declaration"===r.kind&&r.property.startsWith("--"))return void c.add(s(r.property),r.value??"",t,r.src);let n=F([S(e.name,e.params,[r])]).split("\n").map(((e,t,r)=>`${0===t||t>=r.length-2?" ":">"} ${e}`)).join("\n");throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.\n\n${n}`)})),h?b.ReplaceSkip([]):(h=A(":root, :host",[]),h.src=e.src,b.ReplaceSkip(h))}}));let $=vt(c,m?.src);if(i&&($.important=i),w.length>0)for(let e of w)$.invalidCandidates.add(e);a|=await kr({designSystem:$,base:t,ast:e,loadModule:n,sources:v});for(let e of u.keys())$.variants.static(e,(()=>{}));for(let e of function(e,t){let r=new Set,n=new Set,o=[];function a(i,l=[]){if(e.has(i)&&!r.has(i)){n.has(i)&&t.onCircularDependency?.(l,i),n.add(i);for(let t of e.get(i)??[])l.push(i),a(t,l),l.pop();r.add(i),n.delete(i),o.push(i)}}for(let t of e.keys())a(t);return o}(f,{onCircularDependency(e,t){let r=F(e.map(((r,n)=>S("@custom-variant",r,[S("@variant",e[n+1]??t,[])])))).replaceAll(";"," { â€¦ }").replace(`@custom-variant ${t} {`,`@custom-variant ${t} { /* â† */`);throw new Error(`Circular dependency detected in custom variants:\n\n${r}`)}}))u.get(e)?.($);for(let e of p)e($);if(h){let t=[];for(let[e,r]of $.theme.entries()){if(2&r.options)continue;let n=j(l(e),r.value);n.src=r.src,t.push(n)}let r=$.theme.getKeyframes();for(let t of r)e.push(V({theme:!0},[K([t])]));h.nodes=[V({theme:!0},t)]}if(a|=gt(e,$),a|=ct(e,$),a|=zt(e,$),m){let e=m;e.kind="context",e.context={}}return y(e,(e=>{if("at-rule"===e.kind)return"@utility"===e.name?b.Replace([]):b.Skip})),{designSystem:$,ast:e,sources:v,root:x,utilitiesNode:m,features:a,inlineCandidates:k}}async function Sr(t,r={}){let o=n(t,{from:r.from}),a=await async function(e,t={}){let{designSystem:r,ast:n,sources:o,root:a,utilitiesNode:i,features:l,inlineCandidates:s}=await Ar(e,t);function c(e){r.invalidCandidates.add(e)}n.unshift(T("! tailwindcss v4.3.0 | MIT License | https://tailwindcss.com "));let u=new Set,d=null,f=0,p=!1;for(let e of s)r.invalidCandidates.has(e)||(u.add(e),p=!0);return{sources:o,root:a,features:l,build(o){if(0===l)return e;if(!i)return d??=N(n,r,t.polyfills),d;let a=p,s=!1;p=!1;let h=u.size;for(let e of o)if(!r.invalidCandidates.has(e))if("-"===e[0]&&"-"===e[1]){let t=r.theme.markUsedVariable(e);a||=t,s||=t}else u.add(e),a||=u.size!==h;if(!a)return d??=N(n,r,t.polyfills),d;let m=wt(u,r,{onInvalidCandidate:c}).astNodes;return t.from&&y(m,(e=>{e.src??=i.src})),s||f!==m.length?(f=m.length,i.nodes=m,d=N(n,r,t.polyfills),d):(d??=N(n,r,t.polyfills),d)}}}(o,r),i=o,l=t;return{...a,build(e){let t=a.build(e);return t===i||(l=F(t,!!r.from),i=t),l},buildSourceMap:()=>function({ast:t}){let r=new f((t=>e(t.code))),n=new f((e=>({url:e.file,content:e.code,ignore:!1}))),o={file:null,sources:[],mappings:[]};y(t,(e=>{if(!e.src||!e.dst)return;let t=n.get(e.src[0]);if(!t.content)return;let a=r.get(e.src[0]),i=r.get(e.dst[0]),l=t.content.slice(e.src[1],e.src[2]),s=0;for(let r of l.split("\n")){if(""!==r.trim()){let r=a.find(e.src[1]+s),n=i.find(e.dst[1]);o.mappings.push({name:null,originalPosition:{source:t,...r},generatedPosition:n})}s+=r.length,s+=1}let c=a.find(e.src[2]),u=i.find(e.dst[2]);o.mappings.push({name:null,originalPosition:{source:t,...c},generatedPosition:u})}));for(let e of r.keys())o.sources.push(n.get(e));return o.mappings.sort(((e,t)=>e.generatedPosition.line-t.generatedPosition.line||e.generatedPosition.column-t.generatedPosition.column||(e.originalPosition?.line??0)-(t.originalPosition?.line??0)||(e.originalPosition?.column??0)-(t.originalPosition?.column??0))),o}({ast:i})}}var Cr,jr={index:"@layer theme, base, components, utilities;\n\n@import './theme.css' layer(theme);\n@import './preflight.css' layer(base);\n@import './utilities.css' layer(utilities);\n",preflight:"/*\n  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n  2. Remove default margins and padding\n  3. Reset all borders.\n*/\n\n*,\n::after,\n::before,\n::backdrop,\n::file-selector-button {\n  box-sizing: border-box; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 2 */\n  border: 0 solid; /* 3 */\n}\n\n/*\n  1. Use a consistent sensible line-height in all browsers.\n  2. Prevent adjustments of font size after orientation changes in iOS.\n  3. Use a more readable tab size.\n  4. Use the user's configured `sans` font-family by default.\n  5. Use the user's configured `sans` font-feature-settings by default.\n  6. Use the user's configured `sans` font-variation-settings by default.\n  7. Disable tap highlights on iOS.\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  tab-size: 4; /* 3 */\n  font-family: --theme(\n    --default-font-family,\n    ui-sans-serif,\n    system-ui,\n    sans-serif,\n    'Apple Color Emoji',\n    'Segoe UI Emoji',\n    'Segoe UI Symbol',\n    'Noto Color Emoji'\n  ); /* 4 */\n  font-feature-settings: --theme(--default-font-feature-settings, normal); /* 5 */\n  font-variation-settings: --theme(--default-font-variation-settings, normal); /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n  1. Add the correct height in Firefox.\n  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n  3. Reset the default border style to a 1px solid border.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\n  Add the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\n\n/*\n  Remove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\n  Reset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  -webkit-text-decoration: inherit;\n  text-decoration: inherit;\n}\n\n/*\n  Add the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n  1. Use the user's configured `mono` font-family by default.\n  2. Use the user's configured `mono` font-feature-settings by default.\n  3. Use the user's configured `mono` font-variation-settings by default.\n  4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: --theme(\n    --default-mono-font-family,\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    'Liberation Mono',\n    'Courier New',\n    monospace\n  ); /* 1 */\n  font-feature-settings: --theme(--default-mono-font-feature-settings, normal); /* 2 */\n  font-variation-settings: --theme(--default-mono-font-variation-settings, normal); /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\n  Add the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\n  Prevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n  3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n  Use the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\n  Add the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\n  Add the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\n  Make lists unstyled by default.\n*/\n\nol,\nul,\nmenu {\n  list-style: none;\n}\n\n/*\n  1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n  2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n      This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\n  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\n  1. Inherit font styles in all browsers.\n  2. Remove border radius in all browsers.\n  3. Remove background color in all browsers.\n  4. Ensure consistent opacity for disabled states in all browsers.\n*/\n\nbutton,\ninput,\nselect,\noptgroup,\ntextarea,\n::file-selector-button {\n  font: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  border-radius: 0; /* 2 */\n  background-color: transparent; /* 3 */\n  opacity: 1; /* 4 */\n}\n\n/*\n  Restore default font weight.\n*/\n\n:where(select:is([multiple], [size])) optgroup {\n  font-weight: bolder;\n}\n\n/*\n  Restore indentation.\n*/\n\n:where(select:is([multiple], [size])) optgroup option {\n  padding-inline-start: 20px;\n}\n\n/*\n  Restore space after button.\n*/\n\n::file-selector-button {\n  margin-inline-end: 4px;\n}\n\n/*\n  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n*/\n\n::placeholder {\n  opacity: 1;\n}\n\n/*\n  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not\n  crash when using `color-mix(â€¦)` with `currentcolor`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)\n*/\n\n@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or\n  (contain-intrinsic-size: 1px) /* Safari 17+ */ {\n  ::placeholder {\n    color: color-mix(in oklab, currentcolor 50%, transparent);\n  }\n}\n\n/*\n  Prevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n  Remove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n  1. Ensure date/time inputs have the same height when empty in iOS Safari.\n  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.\n*/\n\n::-webkit-date-and-time-value {\n  min-height: 1lh; /* 1 */\n  text-align: inherit; /* 2 */\n}\n\n/*\n  Prevent height from changing on date/time inputs in macOS Safari when the input is set to `display: block`.\n*/\n\n::-webkit-datetime-edit {\n  display: inline-flex;\n}\n\n/*\n  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.\n*/\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-datetime-edit,\n::-webkit-datetime-edit-year-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-minute-field,\n::-webkit-datetime-edit-second-field,\n::-webkit-datetime-edit-millisecond-field,\n::-webkit-datetime-edit-meridiem-field {\n  padding-block: 0;\n}\n\n/*\n  Center dropdown marker shown on inputs with paired `<datalist>`s in Chrome. (https://github.com/tailwindlabs/tailwindcss/issues/18499)\n*/\n\n::-webkit-calendar-picker-indicator {\n  line-height: 1;\n}\n\n/*\n  Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\n  Correct the inability to style the border radius in iOS Safari.\n*/\n\nbutton,\ninput:where([type='button'], [type='reset'], [type='submit']),\n::file-selector-button {\n  appearance: button;\n}\n\n/*\n  Correct the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n  Make elements with the HTML hidden attribute stay hidden by default.\n*/\n\n[hidden]:where(:not([hidden='until-found'])) {\n  display: none !important;\n}\n",theme:"@theme default {\n  --font-sans:\n    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n    'Noto Color Emoji';\n  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;\n  --font-mono:\n    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',\n    monospace;\n\n  --color-red-50: oklch(97.1% 0.013 17.38);\n  --color-red-100: oklch(93.6% 0.032 17.717);\n  --color-red-200: oklch(88.5% 0.062 18.334);\n  --color-red-300: oklch(80.8% 0.114 19.571);\n  --color-red-400: oklch(70.4% 0.191 22.216);\n  --color-red-500: oklch(63.7% 0.237 25.331);\n  --color-red-600: oklch(57.7% 0.245 27.325);\n  --color-red-700: oklch(50.5% 0.213 27.518);\n  --color-red-800: oklch(44.4% 0.177 26.899);\n  --color-red-900: oklch(39.6% 0.141 25.723);\n  --color-red-950: oklch(25.8% 0.092 26.042);\n\n  --color-orange-50: oklch(98% 0.016 73.684);\n  --color-orange-100: oklch(95.4% 0.038 75.164);\n  --color-orange-200: oklch(90.1% 0.076 70.697);\n  --color-orange-300: oklch(83.7% 0.128 66.29);\n  --color-orange-400: oklch(75% 0.183 55.934);\n  --color-orange-500: oklch(70.5% 0.213 47.604);\n  --color-orange-600: oklch(64.6% 0.222 41.116);\n  --color-orange-700: oklch(55.3% 0.195 38.402);\n  --color-orange-800: oklch(47% 0.157 37.304);\n  --color-orange-900: oklch(40.8% 0.123 38.172);\n  --color-orange-950: oklch(26.6% 0.079 36.259);\n\n  --color-amber-50: oklch(98.7% 0.022 95.277);\n  --color-amber-100: oklch(96.2% 0.059 95.617);\n  --color-amber-200: oklch(92.4% 0.12 95.746);\n  --color-amber-300: oklch(87.9% 0.169 91.605);\n  --color-amber-400: oklch(82.8% 0.189 84.429);\n  --color-amber-500: oklch(76.9% 0.188 70.08);\n  --color-amber-600: oklch(66.6% 0.179 58.318);\n  --color-amber-700: oklch(55.5% 0.163 48.998);\n  --color-amber-800: oklch(47.3% 0.137 46.201);\n  --color-amber-900: oklch(41.4% 0.112 45.904);\n  --color-amber-950: oklch(27.9% 0.077 45.635);\n\n  --color-yellow-50: oklch(98.7% 0.026 102.212);\n  --color-yellow-100: oklch(97.3% 0.071 103.193);\n  --color-yellow-200: oklch(94.5% 0.129 101.54);\n  --color-yellow-300: oklch(90.5% 0.182 98.111);\n  --color-yellow-400: oklch(85.2% 0.199 91.936);\n  --color-yellow-500: oklch(79.5% 0.184 86.047);\n  --color-yellow-600: oklch(68.1% 0.162 75.834);\n  --color-yellow-700: oklch(55.4% 0.135 66.442);\n  --color-yellow-800: oklch(47.6% 0.114 61.907);\n  --color-yellow-900: oklch(42.1% 0.095 57.708);\n  --color-yellow-950: oklch(28.6% 0.066 53.813);\n\n  --color-lime-50: oklch(98.6% 0.031 120.757);\n  --color-lime-100: oklch(96.7% 0.067 122.328);\n  --color-lime-200: oklch(93.8% 0.127 124.321);\n  --color-lime-300: oklch(89.7% 0.196 126.665);\n  --color-lime-400: oklch(84.1% 0.238 128.85);\n  --color-lime-500: oklch(76.8% 0.233 130.85);\n  --color-lime-600: oklch(64.8% 0.2 131.684);\n  --color-lime-700: oklch(53.2% 0.157 131.589);\n  --color-lime-800: oklch(45.3% 0.124 130.933);\n  --color-lime-900: oklch(40.5% 0.101 131.063);\n  --color-lime-950: oklch(27.4% 0.072 132.109);\n\n  --color-green-50: oklch(98.2% 0.018 155.826);\n  --color-green-100: oklch(96.2% 0.044 156.743);\n  --color-green-200: oklch(92.5% 0.084 155.995);\n  --color-green-300: oklch(87.1% 0.15 154.449);\n  --color-green-400: oklch(79.2% 0.209 151.711);\n  --color-green-500: oklch(72.3% 0.219 149.579);\n  --color-green-600: oklch(62.7% 0.194 149.214);\n  --color-green-700: oklch(52.7% 0.154 150.069);\n  --color-green-800: oklch(44.8% 0.119 151.328);\n  --color-green-900: oklch(39.3% 0.095 152.535);\n  --color-green-950: oklch(26.6% 0.065 152.934);\n\n  --color-emerald-50: oklch(97.9% 0.021 166.113);\n  --color-emerald-100: oklch(95% 0.052 163.051);\n  --color-emerald-200: oklch(90.5% 0.093 164.15);\n  --color-emerald-300: oklch(84.5% 0.143 164.978);\n  --color-emerald-400: oklch(76.5% 0.177 163.223);\n  --color-emerald-500: oklch(69.6% 0.17 162.48);\n  --color-emerald-600: oklch(59.6% 0.145 163.225);\n  --color-emerald-700: oklch(50.8% 0.118 165.612);\n  --color-emerald-800: oklch(43.2% 0.095 166.913);\n  --color-emerald-900: oklch(37.8% 0.077 168.94);\n  --color-emerald-950: oklch(26.2% 0.051 172.552);\n\n  --color-teal-50: oklch(98.4% 0.014 180.72);\n  --color-teal-100: oklch(95.3% 0.051 180.801);\n  --color-teal-200: oklch(91% 0.096 180.426);\n  --color-teal-300: oklch(85.5% 0.138 181.071);\n  --color-teal-400: oklch(77.7% 0.152 181.912);\n  --color-teal-500: oklch(70.4% 0.14 182.503);\n  --color-teal-600: oklch(60% 0.118 184.704);\n  --color-teal-700: oklch(51.1% 0.096 186.391);\n  --color-teal-800: oklch(43.7% 0.078 188.216);\n  --color-teal-900: oklch(38.6% 0.063 188.416);\n  --color-teal-950: oklch(27.7% 0.046 192.524);\n\n  --color-cyan-50: oklch(98.4% 0.019 200.873);\n  --color-cyan-100: oklch(95.6% 0.045 203.388);\n  --color-cyan-200: oklch(91.7% 0.08 205.041);\n  --color-cyan-300: oklch(86.5% 0.127 207.078);\n  --color-cyan-400: oklch(78.9% 0.154 211.53);\n  --color-cyan-500: oklch(71.5% 0.143 215.221);\n  --color-cyan-600: oklch(60.9% 0.126 221.723);\n  --color-cyan-700: oklch(52% 0.105 223.128);\n  --color-cyan-800: oklch(45% 0.085 224.283);\n  --color-cyan-900: oklch(39.8% 0.07 227.392);\n  --color-cyan-950: oklch(30.2% 0.056 229.695);\n\n  --color-sky-50: oklch(97.7% 0.013 236.62);\n  --color-sky-100: oklch(95.1% 0.026 236.824);\n  --color-sky-200: oklch(90.1% 0.058 230.902);\n  --color-sky-300: oklch(82.8% 0.111 230.318);\n  --color-sky-400: oklch(74.6% 0.16 232.661);\n  --color-sky-500: oklch(68.5% 0.169 237.323);\n  --color-sky-600: oklch(58.8% 0.158 241.966);\n  --color-sky-700: oklch(50% 0.134 242.749);\n  --color-sky-800: oklch(44.3% 0.11 240.79);\n  --color-sky-900: oklch(39.1% 0.09 240.876);\n  --color-sky-950: oklch(29.3% 0.066 243.157);\n\n  --color-blue-50: oklch(97% 0.014 254.604);\n  --color-blue-100: oklch(93.2% 0.032 255.585);\n  --color-blue-200: oklch(88.2% 0.059 254.128);\n  --color-blue-300: oklch(80.9% 0.105 251.813);\n  --color-blue-400: oklch(70.7% 0.165 254.624);\n  --color-blue-500: oklch(62.3% 0.214 259.815);\n  --color-blue-600: oklch(54.6% 0.245 262.881);\n  --color-blue-700: oklch(48.8% 0.243 264.376);\n  --color-blue-800: oklch(42.4% 0.199 265.638);\n  --color-blue-900: oklch(37.9% 0.146 265.522);\n  --color-blue-950: oklch(28.2% 0.091 267.935);\n\n  --color-indigo-50: oklch(96.2% 0.018 272.314);\n  --color-indigo-100: oklch(93% 0.034 272.788);\n  --color-indigo-200: oklch(87% 0.065 274.039);\n  --color-indigo-300: oklch(78.5% 0.115 274.713);\n  --color-indigo-400: oklch(67.3% 0.182 276.935);\n  --color-indigo-500: oklch(58.5% 0.233 277.117);\n  --color-indigo-600: oklch(51.1% 0.262 276.966);\n  --color-indigo-700: oklch(45.7% 0.24 277.023);\n  --color-indigo-800: oklch(39.8% 0.195 277.366);\n  --color-indigo-900: oklch(35.9% 0.144 278.697);\n  --color-indigo-950: oklch(25.7% 0.09 281.288);\n\n  --color-violet-50: oklch(96.9% 0.016 293.756);\n  --color-violet-100: oklch(94.3% 0.029 294.588);\n  --color-violet-200: oklch(89.4% 0.057 293.283);\n  --color-violet-300: oklch(81.1% 0.111 293.571);\n  --color-violet-400: oklch(70.2% 0.183 293.541);\n  --color-violet-500: oklch(60.6% 0.25 292.717);\n  --color-violet-600: oklch(54.1% 0.281 293.009);\n  --color-violet-700: oklch(49.1% 0.27 292.581);\n  --color-violet-800: oklch(43.2% 0.232 292.759);\n  --color-violet-900: oklch(38% 0.189 293.745);\n  --color-violet-950: oklch(28.3% 0.141 291.089);\n\n  --color-purple-50: oklch(97.7% 0.014 308.299);\n  --color-purple-100: oklch(94.6% 0.033 307.174);\n  --color-purple-200: oklch(90.2% 0.063 306.703);\n  --color-purple-300: oklch(82.7% 0.119 306.383);\n  --color-purple-400: oklch(71.4% 0.203 305.504);\n  --color-purple-500: oklch(62.7% 0.265 303.9);\n  --color-purple-600: oklch(55.8% 0.288 302.321);\n  --color-purple-700: oklch(49.6% 0.265 301.924);\n  --color-purple-800: oklch(43.8% 0.218 303.724);\n  --color-purple-900: oklch(38.1% 0.176 304.987);\n  --color-purple-950: oklch(29.1% 0.149 302.717);\n\n  --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n  --color-fuchsia-100: oklch(95.2% 0.037 318.852);\n  --color-fuchsia-200: oklch(90.3% 0.076 319.62);\n  --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n  --color-fuchsia-400: oklch(74% 0.238 322.16);\n  --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n  --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n  --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n  --color-fuchsia-800: oklch(45.2% 0.211 324.591);\n  --color-fuchsia-900: oklch(40.1% 0.17 325.612);\n  --color-fuchsia-950: oklch(29.3% 0.136 325.661);\n\n  --color-pink-50: oklch(97.1% 0.014 343.198);\n  --color-pink-100: oklch(94.8% 0.028 342.258);\n  --color-pink-200: oklch(89.9% 0.061 343.231);\n  --color-pink-300: oklch(82.3% 0.12 346.018);\n  --color-pink-400: oklch(71.8% 0.202 349.761);\n  --color-pink-500: oklch(65.6% 0.241 354.308);\n  --color-pink-600: oklch(59.2% 0.249 0.584);\n  --color-pink-700: oklch(52.5% 0.223 3.958);\n  --color-pink-800: oklch(45.9% 0.187 3.815);\n  --color-pink-900: oklch(40.8% 0.153 2.432);\n  --color-pink-950: oklch(28.4% 0.109 3.907);\n\n  --color-rose-50: oklch(96.9% 0.015 12.422);\n  --color-rose-100: oklch(94.1% 0.03 12.58);\n  --color-rose-200: oklch(89.2% 0.058 10.001);\n  --color-rose-300: oklch(81% 0.117 11.638);\n  --color-rose-400: oklch(71.2% 0.194 13.428);\n  --color-rose-500: oklch(64.5% 0.246 16.439);\n  --color-rose-600: oklch(58.6% 0.253 17.585);\n  --color-rose-700: oklch(51.4% 0.222 16.935);\n  --color-rose-800: oklch(45.5% 0.188 13.697);\n  --color-rose-900: oklch(41% 0.159 10.272);\n  --color-rose-950: oklch(27.1% 0.105 12.094);\n\n  --color-slate-50: oklch(98.4% 0.003 247.858);\n  --color-slate-100: oklch(96.8% 0.007 247.896);\n  --color-slate-200: oklch(92.9% 0.013 255.508);\n  --color-slate-300: oklch(86.9% 0.022 252.894);\n  --color-slate-400: oklch(70.4% 0.04 256.788);\n  --color-slate-500: oklch(55.4% 0.046 257.417);\n  --color-slate-600: oklch(44.6% 0.043 257.281);\n  --color-slate-700: oklch(37.2% 0.044 257.287);\n  --color-slate-800: oklch(27.9% 0.041 260.031);\n  --color-slate-900: oklch(20.8% 0.042 265.755);\n  --color-slate-950: oklch(12.9% 0.042 264.695);\n\n  --color-gray-50: oklch(98.5% 0.002 247.839);\n  --color-gray-100: oklch(96.7% 0.003 264.542);\n  --color-gray-200: oklch(92.8% 0.006 264.531);\n  --color-gray-300: oklch(87.2% 0.01 258.338);\n  --color-gray-400: oklch(70.7% 0.022 261.325);\n  --color-gray-500: oklch(55.1% 0.027 264.364);\n  --color-gray-600: oklch(44.6% 0.03 256.802);\n  --color-gray-700: oklch(37.3% 0.034 259.733);\n  --color-gray-800: oklch(27.8% 0.033 256.848);\n  --color-gray-900: oklch(21% 0.034 264.665);\n  --color-gray-950: oklch(13% 0.028 261.692);\n\n  --color-zinc-50: oklch(98.5% 0 0);\n  --color-zinc-100: oklch(96.7% 0.001 286.375);\n  --color-zinc-200: oklch(92% 0.004 286.32);\n  --color-zinc-300: oklch(87.1% 0.006 286.286);\n  --color-zinc-400: oklch(70.5% 0.015 286.067);\n  --color-zinc-500: oklch(55.2% 0.016 285.938);\n  --color-zinc-600: oklch(44.2% 0.017 285.786);\n  --color-zinc-700: oklch(37% 0.013 285.805);\n  --color-zinc-800: oklch(27.4% 0.006 286.033);\n  --color-zinc-900: oklch(21% 0.006 285.885);\n  --color-zinc-950: oklch(14.1% 0.005 285.823);\n\n  --color-neutral-50: oklch(98.5% 0 0);\n  --color-neutral-100: oklch(97% 0 0);\n  --color-neutral-200: oklch(92.2% 0 0);\n  --color-neutral-300: oklch(87% 0 0);\n  --color-neutral-400: oklch(70.8% 0 0);\n  --color-neutral-500: oklch(55.6% 0 0);\n  --color-neutral-600: oklch(43.9% 0 0);\n  --color-neutral-700: oklch(37.1% 0 0);\n  --color-neutral-800: oklch(26.9% 0 0);\n  --color-neutral-900: oklch(20.5% 0 0);\n  --color-neutral-950: oklch(14.5% 0 0);\n\n  --color-stone-50: oklch(98.5% 0.001 106.423);\n  --color-stone-100: oklch(97% 0.001 106.424);\n  --color-stone-200: oklch(92.3% 0.003 48.717);\n  --color-stone-300: oklch(86.9% 0.005 56.366);\n  --color-stone-400: oklch(70.9% 0.01 56.259);\n  --color-stone-500: oklch(55.3% 0.013 58.071);\n  --color-stone-600: oklch(44.4% 0.011 73.639);\n  --color-stone-700: oklch(37.4% 0.01 67.558);\n  --color-stone-800: oklch(26.8% 0.007 34.298);\n  --color-stone-900: oklch(21.6% 0.006 56.043);\n  --color-stone-950: oklch(14.7% 0.004 49.25);\n\n  --color-mauve-50: oklch(98.5% 0 0);\n  --color-mauve-100: oklch(96% 0.003 325.6);\n  --color-mauve-200: oklch(92.2% 0.005 325.62);\n  --color-mauve-300: oklch(86.5% 0.012 325.68);\n  --color-mauve-400: oklch(71.1% 0.019 323.02);\n  --color-mauve-500: oklch(54.2% 0.034 322.5);\n  --color-mauve-600: oklch(43.5% 0.029 321.78);\n  --color-mauve-700: oklch(36.4% 0.029 323.89);\n  --color-mauve-800: oklch(26.3% 0.024 320.12);\n  --color-mauve-900: oklch(21.2% 0.019 322.12);\n  --color-mauve-950: oklch(14.5% 0.008 326);\n\n  --color-olive-50: oklch(98.8% 0.003 106.5);\n  --color-olive-100: oklch(96.6% 0.005 106.5);\n  --color-olive-200: oklch(93% 0.007 106.5);\n  --color-olive-300: oklch(88% 0.011 106.6);\n  --color-olive-400: oklch(73.7% 0.021 106.9);\n  --color-olive-500: oklch(58% 0.031 107.3);\n  --color-olive-600: oklch(46.6% 0.025 107.3);\n  --color-olive-700: oklch(39.4% 0.023 107.4);\n  --color-olive-800: oklch(28.6% 0.016 107.4);\n  --color-olive-900: oklch(22.8% 0.013 107.4);\n  --color-olive-950: oklch(15.3% 0.006 107.1);\n\n  --color-mist-50: oklch(98.7% 0.002 197.1);\n  --color-mist-100: oklch(96.3% 0.002 197.1);\n  --color-mist-200: oklch(92.5% 0.005 214.3);\n  --color-mist-300: oklch(87.2% 0.007 219.6);\n  --color-mist-400: oklch(72.3% 0.014 214.4);\n  --color-mist-500: oklch(56% 0.021 213.5);\n  --color-mist-600: oklch(45% 0.017 213.2);\n  --color-mist-700: oklch(37.8% 0.015 216);\n  --color-mist-800: oklch(27.5% 0.011 216.9);\n  --color-mist-900: oklch(21.8% 0.008 223.9);\n  --color-mist-950: oklch(14.8% 0.004 228.8);\n\n  --color-taupe-50: oklch(98.6% 0.002 67.8);\n  --color-taupe-100: oklch(96% 0.002 17.2);\n  --color-taupe-200: oklch(92.2% 0.005 34.3);\n  --color-taupe-300: oklch(86.8% 0.007 39.5);\n  --color-taupe-400: oklch(71.4% 0.014 41.2);\n  --color-taupe-500: oklch(54.7% 0.021 43.1);\n  --color-taupe-600: oklch(43.8% 0.017 39.3);\n  --color-taupe-700: oklch(36.7% 0.016 35.7);\n  --color-taupe-800: oklch(26.8% 0.011 36.5);\n  --color-taupe-900: oklch(21.4% 0.009 43.1);\n  --color-taupe-950: oklch(14.7% 0.004 49.3);\n\n  --color-black: #000;\n  --color-white: #fff;\n\n  --spacing: 0.25rem;\n\n  --breakpoint-sm: 40rem;\n  --breakpoint-md: 48rem;\n  --breakpoint-lg: 64rem;\n  --breakpoint-xl: 80rem;\n  --breakpoint-2xl: 96rem;\n\n  --container-3xs: 16rem;\n  --container-2xs: 18rem;\n  --container-xs: 20rem;\n  --container-sm: 24rem;\n  --container-md: 28rem;\n  --container-lg: 32rem;\n  --container-xl: 36rem;\n  --container-2xl: 42rem;\n  --container-3xl: 48rem;\n  --container-4xl: 56rem;\n  --container-5xl: 64rem;\n  --container-6xl: 72rem;\n  --container-7xl: 80rem;\n\n  --text-xs: 0.75rem;\n  --text-xs--line-height: calc(1 / 0.75);\n  --text-sm: 0.875rem;\n  --text-sm--line-height: calc(1.25 / 0.875);\n  --text-base: 1rem;\n  --text-base--line-height: calc(1.5 / 1);\n  --text-lg: 1.125rem;\n  --text-lg--line-height: calc(1.75 / 1.125);\n  --text-xl: 1.25rem;\n  --text-xl--line-height: calc(1.75 / 1.25);\n  --text-2xl: 1.5rem;\n  --text-2xl--line-height: calc(2 / 1.5);\n  --text-3xl: 1.875rem;\n  --text-3xl--line-height: calc(2.25 / 1.875);\n  --text-4xl: 2.25rem;\n  --text-4xl--line-height: calc(2.5 / 2.25);\n  --text-5xl: 3rem;\n  --text-5xl--line-height: 1;\n  --text-6xl: 3.75rem;\n  --text-6xl--line-height: 1;\n  --text-7xl: 4.5rem;\n  --text-7xl--line-height: 1;\n  --text-8xl: 6rem;\n  --text-8xl--line-height: 1;\n  --text-9xl: 8rem;\n  --text-9xl--line-height: 1;\n\n  --font-weight-thin: 100;\n  --font-weight-extralight: 200;\n  --font-weight-light: 300;\n  --font-weight-normal: 400;\n  --font-weight-medium: 500;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n  --font-weight-extrabold: 800;\n  --font-weight-black: 900;\n\n  --tracking-tighter: -0.05em;\n  --tracking-tight: -0.025em;\n  --tracking-normal: 0em;\n  --tracking-wide: 0.025em;\n  --tracking-wider: 0.05em;\n  --tracking-widest: 0.1em;\n\n  --leading-tight: 1.25;\n  --leading-snug: 1.375;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.625;\n  --leading-loose: 2;\n\n  --radius-xs: 0.125rem;\n  --radius-sm: 0.25rem;\n  --radius-md: 0.375rem;\n  --radius-lg: 0.5rem;\n  --radius-xl: 0.75rem;\n  --radius-2xl: 1rem;\n  --radius-3xl: 1.5rem;\n  --radius-4xl: 2rem;\n\n  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);\n  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n\n  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);\n\n  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);\n  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);\n  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);\n  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);\n  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);\n  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);\n\n  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);\n  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);\n  --text-shadow-sm:\n    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);\n  --text-shadow-md:\n    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);\n  --text-shadow-lg:\n    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);\n\n  --ease-in: cubic-bezier(0.4, 0, 1, 1);\n  --ease-out: cubic-bezier(0, 0, 0.2, 1);\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n  --animate-spin: spin 1s linear infinite;\n  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  --animate-bounce: bounce 1s infinite;\n\n  @keyframes spin {\n    to {\n      transform: rotate(360deg);\n    }\n  }\n\n  @keyframes ping {\n    75%,\n    100% {\n      transform: scale(2);\n      opacity: 0;\n    }\n  }\n\n  @keyframes pulse {\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes bounce {\n    0%,\n    100% {\n      transform: translateY(-25%);\n      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n    }\n\n    50% {\n      transform: none;\n      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    }\n  }\n\n  --blur-xs: 4px;\n  --blur-sm: 8px;\n  --blur-md: 12px;\n  --blur-lg: 16px;\n  --blur-xl: 24px;\n  --blur-2xl: 40px;\n  --blur-3xl: 64px;\n\n  --perspective-dramatic: 100px;\n  --perspective-near: 300px;\n  --perspective-normal: 500px;\n  --perspective-midrange: 800px;\n  --perspective-distant: 1200px;\n\n  --aspect-video: 16 / 9;\n\n  --default-transition-duration: 150ms;\n  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  --default-font-family: --theme(--font-sans, initial);\n  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);\n  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);\n  --default-mono-font-family: --theme(--font-mono, initial);\n  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);\n  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);\n}\n\n/* Deprecated */\n@theme default inline reference {\n  --blur: 8px;\n  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);\n  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);\n  --radius: 0.25rem;\n  --max-width-prose: 65ch;\n}\n",utilities:"@tailwind utilities;\n"},Tr="text/tailwindcss",Vr=new Set,Kr="",Er=document.createElement("style"),Or=Promise.resolve(),Nr=1,Fr=new class{start(e){performance.mark(`${e} (start)`)}end(e,t){performance.mark(`${e} (end)`),performance.measure(e,{start:`${e} (start)`,end:`${e} (end)`,detail:t})}hit(e,t){performance.mark(e,{detail:t})}error(e){throw performance.mark("(error)",{detail:{error:`${e}`}}),e}};async function Ur(e,t){try{let r=function(){if("tailwindcss"===e)return{path:"virtual:tailwindcss/index.css",base:t,content:jr.index};if("tailwindcss/preflight"===e||"tailwindcss/preflight.css"===e||"./preflight.css"===e)return{path:"virtual:tailwindcss/preflight.css",base:t,content:jr.preflight};if("tailwindcss/theme"===e||"tailwindcss/theme.css"===e||"./theme.css"===e)return{path:"virtual:tailwindcss/theme.css",base:t,content:jr.theme};if("tailwindcss/utilities"===e||"tailwindcss/utilities.css"===e||"./utilities.css"===e)return{path:"virtual:tailwindcss/utilities.css",base:t,content:jr.utilities};throw new Error(`The browser build does not support @import for "${e}"`)}();return Fr.hit("Loaded stylesheet",{id:e,base:t,size:r.content.length}),r}catch(r){throw Fr.hit("Failed to load stylesheet",{id:e,base:t,error:r.message??r}),r}}async function Wr(){throw new Error("The browser build does not support plugins or config files.")}function Rr(e){Or=Or.then((async function(){if(!Cr&&"full"!==e)return;let t=Nr++;Fr.start(`Build #${t} (${e})`),"full"===e&&await async function(){Fr.start("Create compiler"),Fr.start("Reading Stylesheets");let e=document.querySelectorAll(`style[type="${Tr}"]`),t="";for(let r of e)_r(r),t+=r.textContent+"\n";if(t.includes("@import")||(t=`@import "tailwindcss";${t}`),Fr.end("Reading Stylesheets",{size:t.length,changed:Kr!==t}),Kr!==t){Kr=t,Fr.start("Compile CSS");try{Cr=await Sr(t,{base:"/",loadStylesheet:Ur,loadModule:Wr})}finally{Fr.end("Compile CSS"),Fr.end("Create compiler")}Vr.clear()}}(),Fr.start("Build"),await async function(e){if(!Cr)return;let t=new Set;Fr.start("Collect classes");for(let e of document.querySelectorAll("[class]"))for(let r of e.classList)Vr.has(r)||(Vr.add(r),t.add(r));Fr.end("Collect classes",{count:t.size}),(0!==t.size||"incremental"!==e)&&(Fr.start("Build utilities"),Er.textContent=Cr.build(Array.from(t)),Fr.end("Build utilities"))}(e),Fr.end("Build"),Fr.end(`Build #${t} (${e})`)})).catch((e=>Fr.error(e)))}var Dr=new MutationObserver((()=>Rr("full")));function _r(e){Dr.observe(e,{attributes:!0,attributeFilter:["type"],characterData:!0,subtree:!0,childList:!0})}new MutationObserver((e=>{let t=0,r=0;for(let n of e){for(let e of n.addedNodes)e.nodeType===Node.ELEMENT_NODE&&"STYLE"===e.tagName&&e.getAttribute("type")===Tr&&(_r(e),t++);for(let e of n.addedNodes)1===e.nodeType&&e!==Er&&r++;"attributes"===n.type&&r++}return t>0?Rr("full"):r>0?Rr("incremental"):void 0})).observe(document.documentElement,{attributes:!0,attributeFilter:["class"],childList:!0,subtree:!0}),Rr("full"),document.head.append(Er)})();
//# sourceMappingURL=/sm/bd39219e772a2edfcbff5d8fd1ea19c80e713f41f1785c80de339dfab9ad6de5.map
</script>
<script data-mod="icons">
(() => {
  /* Lucide-style icons. All 24x24, stroke based. */
  const Icon = ({
    size = 18,
    strokeWidth = 1.75,
    className = "",
    children
  }) => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, children);
  const IFolder = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
  }));
  const IKeyboard = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "20",
    height: "12",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"
  }));
  const IBulb = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M9 18h6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 22h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"
  }));
  const IGauge = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m12 14 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0"
  }));
  const ICrosshair = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "12",
    x2: "18",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "12",
    x2: "2",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "6",
    x2: "12",
    y2: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "18"
  }));
  const IGrid = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }));
  const IPlug = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M9 7V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 7V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17v5"
  }));
  const IPower = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M18.36 6.64a9 9 0 1 1-12.73 0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "12"
  }));
  const IChevron = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  }));
  const IChevronD = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }));
  const ICheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }));
  const IEdit = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
  }));
  const IRefresh = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 15-6.7L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 3v5h-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-15 6.7L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21v-5h5"
  }));
  const IZap = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M13 2 3 14h7l-1 8 10-12h-7l1-8z"
  }));
  const ISave = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-8H7v8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 3v5h8"
  }));
  const ILink = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  }));
  const IUnlink = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m18.84 12.25 1.72-1.71a5 5 0 0 0-7.07-7.07L12 4.96"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m5.17 11.75-1.71 1.71a5 5 0 0 0 7.07 7.07L12 19.04"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "8",
    x2: "5",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "19",
    x2: "16",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "16",
    x2: "22",
    y2: "16"
  }));
  const IPalette = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "13.5",
    cy: "6.5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "10.5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "7.5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "12.5",
    r: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a10 10 0 1 0 0 20c1 0 1.5-.5 1.5-1.5a1.5 1.5 0 0 0-.4-1 1.5 1.5 0 0 1 1.1-2.5h1.8A4 4 0 0 0 20 13a8 8 0 0 0-8-11Z"
  }));
  const IActivity = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  }));
  const IWaves = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  }));
  const ISettings = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
  }));
  const ITrash = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 11v6M14 11v6"
  }));
  const IPlus = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }));
  const ICpu = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 20v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 20v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 9h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 15h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 9h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 15h2"
  }));
  const ILayers = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 2 7 12 12 22 7 12 2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2 17 12 22 22 17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2 12 12 17 22 12"
  }));
  const IMore = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.5"
  }));
  const IDownload = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }));
  window.AetherIcons = {
    Icon,
    IFolder,
    IKeyboard,
    IBulb,
    IGauge,
    ICrosshair,
    IGrid,
    IPlug,
    IPower,
    IChevron,
    IChevronD,
    ICheck,
    IEdit,
    IRefresh,
    IZap,
    ISave,
    ILink,
    IUnlink,
    IPalette,
    IActivity,
    IWaves,
    ISettings,
    ITrash,
    IPlus,
    ICpu,
    ILayers,
    IMore,
    IDownload
  };
})();
</script>
<script data-mod="keyboard">
(() => {
  /* WIN60 HE keyboard visualization with per-key live actuation. */
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;

  /* 60% ANSI layout â€” each row totals 60 cols (each 0.25u = 1 col). */
  /* Each entry: [label, units, code, fn?] â€” `units` is in 0.25u increments. */
  /* FN-layer labels transcribed from the Aula Win60 HE box â€”
     "Magnetic Switch Keyboard Â· 30 Seconds Quick Operation Guide". */
  const KB_ROWS = [[["Esc", 4, "Escape", "`~"], ["!1", 4, "1", "F1"], ["@2", 4, "2", "F2"], ["#3", 4, "3", "F3"], ["$4", 4, "4", "F4"], ["%5", 4, "5", "F5"], ["^6", 4, "6", "F6"], ["&7", 4, "7", "F7"], ["*8", 4, "8", "F8"], ["(9", 4, "9", "F9"], [")0", 4, "0", "F10"], ["-_", 4, "Minus", "F11"], ["+=", 4, "Equal", "F12"], ["Backspace", 4, "Backspace", ""], ["Insert", 4, "Insert", ""]], [["Tab", 4, "Tab", ""], ["Q", 4, "Q", ""], ["W", 4, "W", ""], ["E", 4, "E", ""], ["R", 4, "R", ""], ["T", 4, "T", ""], ["Y", 4, "Y", ""], ["U", 4, "U", ""], ["I", 4, "I", ""], ["O", 4, "O", ""], ["P", 4, "P", ""], ["{[", 4, "Lbr", ""], ["}]", 4, "Rbr", ""], ["|\\", 4, "Bsl", ""], ["Delete", 4, "Delete", ""]], [["Caps", 6, "Caps", ""], ["A", 4, "A", ""], ["S", 4, "S", ""], ["D", 4, "D", ""], ["F", 4, "F", ""], ["G", 4, "G", ""], ["H", 4, "H", ""], ["J", 4, "J", ""], ["K", 4, "K", ""], ["L", 4, "L", ""], [":;", 4, "Semi", ""], ["\"'", 4, "Quot", ""], ["Enter", 6, "Enter", ""], ["PgUp", 4, "PageUp", ""]], [["Shift", 7, "LShift", ""], ["Z", 4, "Z", ""], ["X", 4, "X", ""], ["C", 4, "C", ""], ["V", 4, "V", ""], ["B", 4, "B", ""], ["N", 4, "N", ""], ["M", 4, "M", ""], ["<,", 4, "Comma", ""], [">.", 4, "Dot", ""], ["?/", 4, "Slash", ""], ["Shift", 5, "RShift", ""], ["â†‘", 4, "ArrowUp", ""], ["PgDn", 4, "PageDown", ""]], [["Ctrl", 5, "LCtrl", ""], ["Win", 5, "LWin", ""], ["Alt", 5, "LAlt", ""], ["Space", 21, "Space", ""], ["Alt", 4, "RAlt", ""], ["Fn", 4, "Fn", ""], ["Ctrl", 4, "RCtrl", ""], ["â†", 4, "ArrowLeft", ""], ["â†“", 4, "ArrowDown", ""], ["â†’", 4, "ArrowRight", ""]]];

  /* Compute a fractional width string given units in 0.25u increments out of 60 cols. */
  const ufrac = u => (u / 60 * 100) + '%';
  const Key = React.memo(({
    label,
    units,
    code,
    fnLabel,
    layer = "default",
    // default | fn
    depth = 0,
    actuationPoint = 1.70,
    rtPress = 0.05,
    rtRelease = 0.05,
    selected = false,
    highlighted = false,
    mode = "keymap",
    calibrating = false,
    calibrated = false,
    ledColor = null,
    onClick = () => {},
    onMouseDown = () => {},
    onMouseEnter = () => {},
    onContextMenu = () => {}
  }) => {
    const actuated = depth >= actuationPoint && actuationPoint > 0;
    const progress = Math.min(1, depth / 4);

    // Background depending on mode. In lighting mode each key shows its real
    // color (effect foreground, or the background color underneath) at FULL
    // strength â€” so a key lit with the effect color and a key showing only the
    // background read at the same brightness. Near-black (an "off"/background
    // color) falls back to the faint unlit surface instead of a black box.
    let bg = "rgba(255,255,255,0.025)";
    if (mode === "lighting" && ledColor) {
      const hx = String(ledColor).replace("#", "");
      const r = parseInt(hx.slice(0, 2), 16) || 0;
      const g = parseInt(hx.slice(2, 4), 16) || 0;
      const b = parseInt(hx.slice(4, 6), 16) || 0;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      // Lower threshold + brighter top stop so dim animation frames still show
      // their color (not the unlit surface). cc -> ff at top makes the keycap
      // read at the LED's intended brightness instead of a darkened gradient.
      bg = lum < 6 ? "rgba(255,255,255,0.025)" : `linear-gradient(180deg, ${ledColor}, ${ledColor})`;
    }

    // Two-line labels (e.g. "1!" -> shifted/unshifted stack)
    const lines = label.length === 2 && !/^[a-zA-Z]+$/.test(label) && label !== "Fn" ? [label[0], label[1]] : null;
    const displayLabel = layer === "fn" && fnLabel ? fnLabel : label;
    const displayLines = layer === "fn" ? null : lines;
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseDown: onMouseDown,
      onMouseEnter: onMouseEnter,
      onDragStart: e => e.preventDefault(),
      draggable: false,
      onContextMenu: e => {
        e.preventDefault();
        onContextMenu(e);
      },
      style: {
        gridColumn: `span ${units}`,
        background: calibrated ? "linear-gradient(180deg, #10b98133, #10b98119)" : bg
      },
      "data-code": code,
      className: `relative rounded-[5px] border text-left
                  px-1.5 pt-1 pb-0.5 h-[46px] overflow-hidden
                  transition-[border-color,box-shadow] duration-150
                  ${calibrated ? "border-emerald-400 shadow-[0_0_0_1px_#10b981,0_0_14px_rgba(16,185,129,0.6)]" : calibrating ? "border-amber-400/40 animate-pulse" : selected ? mode === "lighting" ? "border-white shadow-[0_0_0_2px_#ffffff,0_0_12px_rgba(255,255,255,0.75)]" : "border-[var(--accent)]/80 shadow-[0_0_0_1px_var(--accent),0_0_18px_var(--accent-glow)]" : actuated ? "border-[var(--accent)]/60 shadow-[0_0_14px_var(--accent-glow)]" : highlighted ? "border-[color-mix(in_srgb,var(--accent)_30%,transparent)]" : "border-[var(--line)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, mode !== "lighting" && depth > 0.02 && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      className: "absolute inset-x-0 bottom-0 pointer-events-none",
      style: {
        height: progress * 100 + "%",
        background: actuated ? "linear-gradient(to top, var(--accent), transparent 90%)" : "linear-gradient(to top, rgba(148,163,184,0.18), transparent 90%)",
        opacity: actuated ? 0.45 : 0.55,
        transition: "height 120ms linear"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 flex items-start justify-between"
    }, displayLines ? /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col leading-[1.0]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text)] font-medium"
    }, displayLines[1]), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text-dim)] font-medium"
    }, displayLines[0])) : /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] font-medium tracking-wide
                            ${layer === "fn" && fnLabel ? "text-[var(--accent)]" : actuated ? "text-white" : "text-[var(--text)]"}`
    }, displayLabel)), mode === "actuation" && actuationPoint != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "absolute top-[3px] right-[4px] z-10 font-mono text-[8.5px] font-bold text-[#4ade80] leading-none tracking-tighter"
    }, Number(actuationPoint).toFixed(2)), (rtPress > 0 || rtRelease > 0) && /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-[3px] inset-x-[4px] z-10 flex items-center justify-between leading-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[8px] font-semibold text-[#38bdf8] tracking-tighter"
    }, Number(rtPress).toFixed(2)), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[8px] font-semibold text-[#fb923c] tracking-tighter"
    }, Number(rtRelease).toFixed(2)))), mode === "actuation" && depth >= 0.05 && /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-[3px] right-[4px] z-20 px-1 rounded bg-black/80 font-mono text-[8.5px] font-bold text-[var(--accent)]"
    }, depth.toFixed(2)));
  }, (prev, next) => prev.code === next.code && prev.layer === next.layer && prev.depth === next.depth && prev.actuationPoint === next.actuationPoint && prev.rtPress === next.rtPress && prev.rtRelease === next.rtRelease && prev.selected === next.selected && prev.highlighted === next.highlighted && prev.mode === next.mode && prev.calibrating === next.calibrating && prev.calibrated === next.calibrated && prev.ledColor === next.ledColor);

  /* Top "WIN 68 HE MAX" pill */
  const DevicePill = ({
    connected
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-4 py-1.5 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)] shadow-[0_0_18px_var(--accent-glow)] whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-ring text-[var(--accent)]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold tracking-[0.18em] text-[12px]"
  }, "WIN 68 HE MAX"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)]/70 ml-1"
  }, connected ? "Linked" : "Offline"));

  /* The full keyboard panel â€” handles live actuation telemetry and selection */
  const KeyboardPanel = ({
    mode,
    layer = "default",
    selectedKeys,
    setSelectedKeys,
    actuationPoint,
    rtPress,
    rtRelease,
    perKeyOverride,
    ledMap,
    accent,
    leftSlot,
    rightSlot,
    showPill = true,
    compact = false,
    liveDepths = null,
    calibrating = false,
    calibratedCodes = null
  }) => {
    const calibSet = calibratedCodes || null;
    // Real per-key travel depth (mm), streamed from the board by the HID bridge
    // (App polls api.read_live() while Travel Test is on). When the bridge isn't
    // streaming, every key reads 0 â€” no simulated motion fighting the hardware.
    const depths = liveDepths || {};
    const _dv = Object.values(depths);
    const liveMax = _dv.length ? Math.max(0, ..._dv) : 0;
    const toggleSelect = (code, e) => {
      setSelectedKeys(prev => {
        const cur = new Set(prev);
        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          cur.has(code) ? cur.delete(code) : cur.add(code);
        } else {
          if (cur.has(code) && cur.size === 1) cur.clear();else {
            cur.clear();
            cur.add(code);
          }
        }
        return cur;
      });
    };

    // Click-and-drag selection: press on a key to start (modifier = add to the
    // current selection, else start fresh), drag across keys to sweep-select.
    const dragging = useRef(false);
    const additive = useRef(false);
    const startDrag = (code, e) => {
      dragging.current = true;
      additive.current = e.shiftKey || e.metaKey || e.ctrlKey;
      setSelectedKeys(prev => {
        const cur = new Set(additive.current ? prev : []);
        if (additive.current && cur.has(code)) cur.delete(code); // ctrl-click toggles off
        else cur.add(code);
        return cur;
      });
    };
    const dragOver = code => {
      if (!dragging.current) return;
      setSelectedKeys(prev => {
        if (prev.has(code)) return prev;
        const cur = new Set(prev);
        cur.add(code);
        return cur;
      });
    };
    useEffect(() => {
      const up = () => {
        dragging.current = false;
      };
      window.addEventListener("mouseup", up);
      return () => window.removeEventListener("mouseup", up);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, showPill && /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center mb-4"
    }, /*#__PURE__*/React.createElement(DevicePill, {
      connected: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-center gap-4"
    }, leftSlot && /*#__PURE__*/React.createElement("div", {
      className: "shrink-0 w-[110px] pt-2 flex flex-col gap-1.5"
    }, leftSlot), /*#__PURE__*/React.createElement("div", {
      className: "relative w-full max-w-[960px] rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white/[0.025] to-black/30 p-3.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-[3px]"
    }, KB_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
      key: ri,
      className: "grid w-full gap-[3px]",
      style: {
        gridTemplateColumns: "repeat(60, minmax(0, 1fr))"
      }
    }, row.map(([label, units, code, fnLabel]) => {
      window.__liveDepths = depths; window.__perKeyOverride = perKeyOverride;
      const rawOv = perKeyOverride?.[code];
      const override = (rawOv && typeof rawOv === "object") ? rawOv : (typeof rawOv === "number" ? { actuation: rawOv, touchMode: 1 } : {});
      const hasCustom = (override.touchMode === 1 || override.touchMode === 2);
      return /*#__PURE__*/React.createElement(Key, {
        key: code,
        label: label,
        units: units,
        code: code,
        fnLabel: fnLabel,
        layer: layer,
        depth: depths[code] || 0,
        actuationPoint: hasCustom ? override.actuation : null,
        rtPress: override.touchMode === 2 ? (override.rtPress ?? 0) : 0,
        rtRelease: override.touchMode === 2 ? (override.rtRelease ?? 0) : 0,
        selected: selectedKeys.has(code),
        mode: mode,
        calibrating: calibrating,
        calibrated: !!(calibSet && calibSet.has(code)),
        ledColor: ledMap?.[code] || null,
        onMouseDown: e => startDrag(code, e),
        onMouseEnter: () => dragOver(code),
        onContextMenu: () => setSelectedKeys(prev => {
          if (!prev.has(code)) return prev;
          const cur = new Set(prev);
          cur.delete(code);
          return cur;
        })
      });
    }))))), rightSlot && /*#__PURE__*/React.createElement("div", {
      className: "shrink-0 w-[110px] pt-2 flex flex-col gap-1.5 items-end"
    }, rightSlot)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center mt-3 gap-1"
    }, /*#__PURE__*/React.createElement("button", {
      className: "grid place-items-center w-7 h-7 rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-colors",
      title: "Refresh device state"
    }, /*#__PURE__*/React.createElement(window.AetherIcons.IRefresh, {
      size: 13
    })), mode === "socd" && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, "Right-click to uncheck all keys")));
  };
  window.AetherKeyboard = {
    KeyboardPanel,
    KB_ROWS,
    DevicePill
  };
})();
</script>
<script data-mod="sections">
(() => {
  /* Section panels: Keymap, Actuation, Lighting, SOCD, Other */
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;
  const {
    IFolder,
    IKeyboard,
    IBulb,
    IGauge,
    ICrosshair,
    IGrid,
    IPlug,
    IPower,
    IChevron,
    IChevronD,
    ICheck,
    IEdit,
    IRefresh,
    IZap,
    ISave,
    ILink,
    IUnlink,
    IPalette,
    IActivity,
    IWaves,
    ISettings,
    ITrash,
    IPlus,
    ICpu,
    ILayers,
    IMore,
    IDownload
  } = window.AetherIcons;

  /* ===== Shared bits ===== */
  const SubTabs = ({
    tabs,
    active,
    onChange
  }) => /*#__PURE__*/React.createElement("nav", {
    className: "flex items-center gap-1 border-b border-[var(--line)] mb-4"
  }, tabs.map(t => {
    const isActive = active === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange(t.id),
      className: `relative flex items-center gap-2 px-4 h-10 -mb-px font-display text-[12px] uppercase tracking-[0.16em] whitespace-nowrap
                      transition-colors
                      ${isActive ? "text-[var(--accent)]" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
    }, t.icon, t.label, isActive && /*#__PURE__*/React.createElement("span", {
      className: "absolute left-2 right-2 -bottom-px h-px bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]"
    }));
  }));
  const Slider = ({
    label,
    value,
    min,
    max,
    step = 0.01,
    onChange,
    unit = "",
    color = "accent"
  }) => {
    const decimals = step < 0.1 ? 2 : (step < 1 ? 1 : 0);
    const numVal = Number(value) || 0;
    const pct = Math.min(100, Math.max(0, ((numVal - min) / (max - min)) * 100));
    const [focused, setFocused] = React.useState(false);
    const [draft, setDraft] = React.useState(() => numVal.toFixed(decimals));
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (!focused) {
        setDraft(numVal.toFixed(decimals));
      }
    }, [numVal, decimals, focused]);

    const commitDraft = rawStr => {
      const cleaned = String(rawStr).replace(/[^0-9.]/g, "");
      const parsed = parseFloat(cleaned);
      if (!Number.isNaN(parsed)) {
        const clamped = Math.min(max, Math.max(min, parsed));
        const factor = Math.pow(10, decimals);
        const finalVal = Math.round(clamped * factor) / factor;
        onChange(finalVal);
        setDraft(finalVal.toFixed(decimals));
      } else {
        setDraft(numVal.toFixed(decimals));
      }
    };

    const stepBy = delta => {
      const factor = Math.pow(10, decimals);
      const next = Math.min(max, Math.max(min, Math.round((numVal + delta) * factor) / factor));
      onChange(next);
      setDraft(next.toFixed(decimals));
    };

    return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline gap-1.5 cursor-text",
      onClick: () => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      },
      title: "Click to type exact value"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[14px] text-[var(--accent)] hover:underline"
    }, numVal.toFixed(decimals)), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, unit))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: min,
      max: max,
      step: step,
      value: numVal,
      style: {
        "--pct": pct + "%"
      },
      onChange: e => onChange(parseFloat(e.target.value))
    }), unit === "mm" && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mt-2"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => stepBy(-step),
      className: "w-7 h-7 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-mono text-xs"
    }, "\u2212"), /*#__PURE__*/React.createElement("div", {
      className: `relative flex items-center px-2.5 h-7 rounded-md border bg-black/30 transition-all ${focused ? "border-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] hover:border-[var(--accent)]/50"}`
    }, /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      type: "text",
      inputMode: "decimal",
      value: focused ? draft : numVal.toFixed(decimals),
      onFocus: e => {
        setFocused(true);
        setDraft(numVal.toFixed(decimals));
        const el = e.target;
        setTimeout(() => { try { el.select(); } catch (_) {} }, 0);
      },
      onClick: e => {
        e.stopPropagation();
      },
      onChange: e => {
        e.stopPropagation();
        setDraft(e.target.value);
      },
      onKeyDown: e => {
        e.stopPropagation();
        if (e.key === "Enter") {
          commitDraft(draft);
          e.target.blur();
        } else if (e.key === "Escape") {
          setDraft(numVal.toFixed(decimals));
          setFocused(false);
          e.target.blur();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          stepBy(step);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          stepBy(-step);
        }
      },
      onBlur: () => {
        setFocused(false);
        commitDraft(draft);
      },
      className: "w-12 bg-transparent font-mono text-[12px] text-[var(--text)] text-right outline-none select-all pr-1"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] text-[var(--text-faint)] select-none pointer-events-none"
    }, unit)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => stepBy(step),
      className: "w-7 h-7 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-mono text-xs"
    }, "+")));
  };
  const ToolbarButton = ({
    children,
    onClick,
    variant = "ghost",
    active,
    glow
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: `px-3 h-8 rounded-md font-display text-[11px] uppercase tracking-[0.16em] border transition-all
                ${variant === "primary" ? "bg-[var(--accent)]/15 border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_10px_var(--accent-glow)]" : active ? "border-[var(--line)] bg-white/[0.04] text-[var(--text)]" : "border-[var(--line)] bg-white/[0.015] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
  }, children);
  const Chip = ({
    children,
    color = "slate"
  }) => {
    const tones = {
      slate: "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)]",
      accent: "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]",
      danger: "border-rose-400/30 bg-rose-500/10 text-rose-300",
      ok: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
    };
    return /*#__PURE__*/React.createElement("span", {
      className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-[0.18em] border ${tones[color]}`
    }, children);
  };

  /* ===== Layer pill (Default Layer / Fn Layer) ===== */
  const LayerPicker = ({
    layer,
    setLayer
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 mr-6"
  }, ["default", "fn"].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => setLayer(l),
    className: `px-3.5 h-9 rounded-md font-display text-[11.5px] uppercase tracking-[0.14em] border transition-all
                    ${layer === l ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)]" : "bg-white/[0.02] border-[var(--line)] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
  }, l === "default" ? "Default Layer" : "Fn Layer")));

  /* ===== KEYMAP SECTION ===== */
  const BASIC_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1!", "2@", "3#", "$4", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+", "{[", "}]", "\\|", "<>", ";:", "'\"", "`~", ",<", ".>", "/?"];
  const EXTENDED_KEYS = ["Esc", "Tab", "Caps", "Back", "Enter", "Space", "L-Ctrl", "R-Ctrl", "L-Shift", "R-Shift", "L-Alt", "R-Alt", "L-Win", "R-Win", "Menu", "Left", "Up", "Right", "Down", "PrtSc", "ScrLk", "Pause", "Ins", "Home", "Del", "End", "PgUp", "PgDn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
  const KeymapSection = ({
    selectedKey,
    selectedCount = 0,
    onRemap,
    onResetKey
  }) => {
    const [tab, setTab] = useState("remap");
    const [picked, setPicked] = useState(null);
    const [flash, setFlash] = useState(null); // "applied" | "reset" toast
    const showFlash = kind => {
      setFlash(kind);
      setTimeout(() => setFlash(null), 1400);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubTabs, {
      active: tab,
      onChange: setTab,
      tabs: [{
        id: "remap",
        label: "Remap Key",
        icon: /*#__PURE__*/React.createElement(IKeyboard, {
          size: 13
        })
      }, {
        id: "adv",
        label: "Advanced",
        icon: /*#__PURE__*/React.createElement(IZap, {
          size: 13
        })
      }]
    }), tab === "adv" && /*#__PURE__*/React.createElement(AdvancedKeyPanel, {
      selectedKey: selectedKey
    }), tab !== "adv" && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ol", {
      className: "text-[12px] text-[var(--text-dim)] leading-relaxed space-y-2 mb-4 font-mono"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "01."), " Click a key on the keyboard above."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "02."), " Pick the new mapping at right."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "03."), " Or type it into the input below."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "04."), " Hit ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "Apply"), " to flash.")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center w-14 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[11px] text-[var(--text-dim)]"
    }, selectedKey || "None"), /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement(IChevron, {
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-md border border-[var(--line)] bg-white/[0.02] px-3 grid place-items-start py-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)]"
    }, picked || "â€”"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "remap target"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        onResetKey && onResetKey();
        setPicked(null);
        showFlash("reset");
      },
      className: "flex-1 h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.18em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }, "Default"), /*#__PURE__*/React.createElement("button", {
      disabled: !picked || !selectedCount,
      onClick: () => {
        onRemap && onRemap(picked);
        showFlash("applied");
      },
      className: `flex-1 h-9 rounded-md border font-display text-[11px] uppercase tracking-[0.18em] transition-all
                          ${!picked || !selectedCount ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_12px_var(--accent-glow)]"}`
    }, "Apply")), /*#__PURE__*/React.createElement("div", {
      className: "h-5 mt-2 text-[11px] font-mono tracking-[0.14em]"
    }, !selectedCount && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Select a key on the board first."), flash === "applied" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "\u2713 Remapped ", selectedCount, " key", selectedCount > 1 ? "s" : "", " \u2192 ", picked), flash === "reset" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)]"
    }, "\u21A9 Restored default mapping"))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: picked,
      onPick: setPicked
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: picked,
      onPick: setPicked
    }))));
  };

  /* Advanced: DKS / MT / TGL */
  const AdvancedKeyPanel = ({
    selectedKey
  }) => {
    const [mode, setMode] = useState("dks");
    const [dksPoints, setDksPoints] = useState([1.5, 3.0, 3.0, 1.5]);
    const [tapKey, setTapKey] = useState("");
    const [holdKey, setHoldKey] = useState("");
    const [holdDuration, setHoldDuration] = useState(150);
    const [tglKey, setTglKey] = useState("");
    const [picked, setPicked] = useState(null);
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-5"
    }, [{
      id: "dks",
      label: "DKS"
    }, {
      id: "mt",
      label: "MT"
    }, {
      id: "tgl",
      label: "TGL"
    }].map(b => /*#__PURE__*/React.createElement("button", {
      key: b.id,
      onClick: () => setMode(b.id),
      className: `flex-1 max-w-[120px] h-9 rounded-md border font-display text-[11.5px] uppercase tracking-[0.18em] transition-all
                          ${mode === b.id ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, b.label))), mode === "dks" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-dim)] mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "DKS"), " \xB7 Dynamic Key Stroke. Bind up to 4 different actions to a single key at different actuation depths."), /*#__PURE__*/React.createElement(DKSDiagram, {
      points: dksPoints,
      setPoints: setDksPoints
    }), /*#__PURE__*/React.createElement("button", {
      className: "mt-4 px-4 h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[11.5px] uppercase tracking-[0.18em] shadow-[0_0_12px_var(--accent-glow)]"
    }, "Save DKS Layer")), mode === "mt" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-dim)] mb-5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "MT"), " \xB7 Mod-Tap. Send one keycode on a quick tap, another when held past the threshold."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-4 mb-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
    }, "Tap"), /*#__PURE__*/React.createElement("div", {
      className: `h-10 rounded-md border grid place-items-center font-mono text-[14px]
                                 ${tapKey ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02]"}`
    }, tapKey || "â€”")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
    }, "Hold"), /*#__PURE__*/React.createElement("div", {
      className: `h-10 rounded-md border grid place-items-center font-mono text-[14px]
                                 ${holdKey ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02]"}`
    }, holdKey || "â€”"))), /*#__PURE__*/React.createElement("div", {
      className: "mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Hold Duration"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, holdDuration, "ms")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 50,
      max: 800,
      step: 10,
      value: holdDuration,
      style: {
        "--pct": (holdDuration - 50) / 750 * 100 + "%"
      },
      onChange: e => setHoldDuration(parseInt(e.target.value))
    }))), mode === "tgl" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-dim)] mb-5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "TGL"), " \xB7 Toggle. One tap latches the key down until tapped again \u2014 perfect for auto-walk or capslock-style behavior."), /*#__PURE__*/React.createElement("div", {
      className: "max-w-[180px]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
    }, "Toggle key"), /*#__PURE__*/React.createElement("div", {
      className: `h-10 rounded-md border grid place-items-center font-mono text-[14px]
                               ${tglKey ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02]"}`
    }, tglKey || "â€”")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: picked,
      onPick: k => {
        setPicked(k);
        if (mode === "mt") {
          if (!tapKey) setTapKey(k);else setHoldKey(k);
        } else if (mode === "tgl") {
          setTglKey(k);
        }
      }
    })));
  };
  const DKSDiagram = ({
    points,
    setPoints
  }) => {
    // 4 columns, 4 row tracks. Up/down arrow indicators with depth labels.
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-end gap-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 w-10"
    }, [1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `h-7 rounded border text-center font-mono text-[10px] grid place-items-center
                                    ${i === 1 ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)]"}`
    }, "K", i))), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 grid grid-cols-4 gap-3"
    }, points.map((p, idx) => /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex flex-col items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: `font-mono text-[11px] mb-1 ${idx % 3 === 0 ? "text-amber-300" : "text-[var(--text)]"}`
    }, p.toFixed(1), "mm"), /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)] mb-1"
    }, idx < 2 ? "â†“" : "â†‘"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 w-full"
    }, [0, 1, 2, 3].map(row => {
      const filled = row === idx;
      return /*#__PURE__*/React.createElement("button", {
        key: row,
        className: `h-7 rounded-full border grid place-items-center transition-colors
                                  ${filled ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[10px]"
      }, filled ? "â—" : "+"));
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-[10px] font-mono text-[var(--text-faint)] mt-2"
    }, /*#__PURE__*/React.createElement("span", null, "Press \u2192"), /*#__PURE__*/React.createElement("span", null, "\u2190 Release")));
  };
  const KeyGrid = ({
    title,
    keys,
    picked,
    onPick
  }) => {
    const [open, setOpen] = useState(true);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-2 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em]"
    }, title)), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5"
    }, keys.map(k => {
      const active = picked === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => onPick(k),
        className: `h-9 rounded-md border font-mono text-[11px] transition-all
                            ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
      }, k);
    })));
  };

  /* ===== ACTUATION SECTION ===== */
  const ActuationSection = ({
    actuation,
    setActuation,
    rtPress,
    setRtPress,
    rtRelease,
    setRtRelease,
    rtEnabled,
    setRtEnabled,
    polling,
    setPolling,
    travelTest,
    setTravelTest,
    onSelectAll,
    onSelectInvert,
    onDeselectAll,
    onResetTrigger,
    calibrating,
    onCalibrate,
    deadTop,
    setDeadTop,
    deadBottom,
    setDeadBottom,
    switchId,
    onPickSwitch,
    liveDepth = 0,
    selectedCount = 0,
    onApplyActuation,
    onApplyDeadband
  }) => {
    const scope = selectedCount > 0 ? `${selectedCount} selected key${selectedCount > 1 ? "s" : ""}` : "no keys (select some)";
    const canApply = selectedCount > 0;
    const applyBtnCls = enabled => `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all ${enabled ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed"}`;
    const [tab, setTab] = useState("travel");
    // Confirmation toast â€” shows the exact keys + value the user just wrote so
    // there's no ambiguity about scope. Fades after 2.4s.
    const [confirm, setConfirm] = useState(null);
    const [rtContinuous, setRtContinuousState] = useState(() => !!window.__rtContinuous);
    const setRtContinuous = val => {
      window.__rtContinuous = !!val;
      setRtContinuousState(!!val);
    };
    const flash = msg => {
      setConfirm(msg);
      setTimeout(() => setConfirm(null), 2400);
    };
    const handleApplyTravel = () => {
      if (!canApply || !onApplyActuation) return;
      onApplyActuation();
      const rt = rtEnabled ? ` Â· RT press ${rtPress.toFixed(2)}mm / release ${rtRelease.toFixed(2)}mm` : "";
      flash(`Wrote ${actuation.toFixed(2)}mm to ${selectedCount} key${selectedCount === 1 ? "" : "s"}${rt}`);
    };
    const handleApplyDead = () => {
      if (!canApply || !onApplyDeadband) return;
      onApplyDeadband();
      flash(`Wrote dead band ${(deadTop ?? 0.04).toFixed(2)}/${(deadBottom ?? 0.05).toFixed(2)}mm to ${selectedCount} key${selectedCount === 1 ? "" : "s"}`);
    };
    const ConfirmToast = () => confirm ? /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", confirm) : null;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubTabs, {
      active: tab,
      onChange: setTab,
      tabs: [{
        id: "travel",
        label: "Travel",
        icon: /*#__PURE__*/React.createElement(IGauge, {
          size: 13
        })
      }, {
        id: "dead",
        label: "Dead Band",
        icon: /*#__PURE__*/React.createElement(IActivity, {
          size: 13
        })
      }, {
        id: "switch",
        label: "Switch",
        icon: /*#__PURE__*/React.createElement(ICpu, {
          size: 13
        })
      }, {
        id: "poll",
        label: "Polling Rate",
        icon: /*#__PURE__*/React.createElement(IActivity, {
          size: 13
        })
      }, {
        id: "calib",
        label: "Calibration",
        icon: /*#__PURE__*/React.createElement(ICrosshair, {
          size: 13
        })
      }]
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Travel Test"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTravelTest(!travelTest),
      className: `relative w-10 h-5 rounded-full border transition-colors
                          ${travelTest ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                                ${travelTest ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement(SwitchRender, {
      depth: travelTest ? liveMax : 0,
      actuation: actuation
    })), /*#__PURE__*/React.createElement("div", {
      className: "glass p-5"
    }, tab === "travel" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-3"
    }, "Select keys on the board, set the actuation point, then press ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Apply"), " \u2014 only the selected keys are written. Nothing is sent while you move the slider."), /*#__PURE__*/React.createElement("div", {
      className: "mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Applying to"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, scope)), /*#__PURE__*/React.createElement("div", {
      className: "mb-5"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Key Trigger Travel",
      value: actuation,
      min: 0.1,
      max: 3.4,
      step: 0.01,
      unit: "mm",
      onChange: setActuation
    })), /*#__PURE__*/React.createElement("label", {
      className: "flex items-center gap-2 cursor-pointer select-none mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-4 h-4 rounded border grid place-items-center transition
                                  ${rtEnabled ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`,
      onClick: () => setRtEnabled(!rtEnabled)
    }, rtEnabled && /*#__PURE__*/React.createElement(ICheck, {
      size: 10,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: rtEnabled,
      onChange: e => setRtEnabled(e.target.checked),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, "Rapid Trigger"), /*#__PURE__*/React.createElement(Chip, {
      color: "accent"
    }, "RT")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4"
    }, "Rapid Trigger dynamically actuates and resets your key based on your intent \u2014 perfect for counter-strafing and rebound presses."), rtEnabled && /*#__PURE__*/React.createElement("div", {
      className: "mt-4 p-4 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] space-y-4"
    }, /*#__PURE__*/React.createElement(() => {
      const [cont, setCont] = React.useState(() => !!window.__rtContinuous);
      const choose = (val) => {
        window.__rtContinuous = !!val;
        setCont(!!val);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-2 pb-3 border-b border-[var(--line)]"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between gap-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.15em] text-[var(--text)]"
      }, "Rapid Trigger Mode"), /*#__PURE__*/React.createElement("div", {
        className: "inline-flex rounded-md border border-[var(--line)] bg-black/30 p-0.5 gap-1"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(false),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${!cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Basic RT"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(true),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Continuous RT"))), /*#__PURE__*/React.createElement("span", {
        className: "text-[11px] text-[var(--text-faint)]"
      }, cont ? "Continuous RT: Active across full keystroke (0.10mm-3.40mm) until key is completely released." : "Basic RT: Activates at your actuation point and immediately resets as soon as the key rises above it."));
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Press Sensitivity",
      value: rtPress,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtPress
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Release Sensitivity",
      value: rtRelease,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtRelease
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyTravel,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s"), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, null) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, canApply ? "writes only the selected keys" : "select keys on the board to enable"))), tab === "dead" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored. Press ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Apply"), " to write to the selected keys."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-6"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Top Dead Band",
      value: deadTop ?? 0.04,
      min: 0,
      max: 0.5,
      step: 0.01,
      unit: "mm",
      onChange: setDeadTop
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Bottom Dead Band",
      value: deadBottom ?? 0.05,
      min: 0,
      max: 0.5,
      step: 0.01,
      unit: "mm",
      onChange: setDeadBottom
    })), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyDead,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s"), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, null) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, canApply ? "writes only the selected keys" : "select keys on the board to enable"))), tab === "switch" && (() => {
      const SWITCHES = [{
        id: "hm1",
        name: "HM1",
        sub: "Magnetic Switch",
        dot: "#3b82f6",
        maker: "Gateron",
        travel: "4.0 mm",
        force: "30 gf",
        range: "0.1 â€“ 4.0 mm",
        poles: "Single",
        life: "100 M"
      }, {
        id: "hh1",
        name: "HH1",
        sub: "Magnetic Switch",
        dot: "#a3a300",
        maker: "Gateron",
        travel: "3.5 mm",
        force: "40 gf",
        range: "0.1 â€“ 3.5 mm",
        poles: "Single",
        life: "100 M"
      }, {
        id: "cy1",
        name: "CY1",
        sub: "Magnetic Switch",
        dot: "#cbd5e1",
        maker: "KZZI",
        travel: "3.4 mm",
        force: "35 gf",
        range: "0.1 â€“ 3.4 mm",
        poles: "Single",
        life: "80 M"
      }, {
        id: "tc1",
        name: "TC1",
        sub: "TTC Kom",
        dot: "#c026d3",
        maker: "TTC",
        travel: "3.6 mm",
        force: "45 gf",
        range: "0.2 â€“ 3.6 mm",
        poles: "Dual",
        life: "100 M"
      }];
      const cur = SWITCHES.find(s => s.id === (switchId || "hm1")) || SWITCHES[0];
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-[12px] text-[var(--text-dim)] mb-5"
      }, "Select the magnetic switch profile installed in your board. Calibration curves load automatically."), /*#__PURE__*/React.createElement("div", {
        className: "grid grid-cols-2 gap-3 mb-5"
      }, SWITCHES.map(s => {
        const active = (switchId || "hm1") === s.id;
        return /*#__PURE__*/React.createElement("button", {
          key: s.id,
          onClick: () => onPickSwitch && onPickSwitch(s.id),
          className: `text-left rounded-lg border p-3 transition-all
                                ${active ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex items-center gap-2"
        }, /*#__PURE__*/React.createElement("div", {
          className: "font-display text-[14px] text-[var(--text)]"
        }, s.name), /*#__PURE__*/React.createElement("span", {
          className: "w-2.5 h-2.5 rounded-full",
          style: {
            background: s.dot,
            boxShadow: `0 0 8px ${s.dot}`
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em] mt-0.5"
        }, s.sub));
      })), /*#__PURE__*/React.createElement("div", {
        className: "rounded-xl border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-2.5 h-2.5 rounded-full",
        style: {
          background: cur.dot,
          boxShadow: `0 0 8px ${cur.dot}`
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[13px] text-[var(--text)]"
      }, cur.name), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
      }, cur.maker, " \xB7 ", cur.sub)), /*#__PURE__*/React.createElement("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 font-mono text-[11px]"
      }, [["Total Travel", cur.travel], ["Actuation Range", cur.range], ["Initial Force", cur.force], ["Sensing", cur.poles + " Hall"], ["Rated Life", cur.life + " presses"], ["Tech", "Magnetic / Analog"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
        key: k
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-[var(--text-faint)] uppercase tracking-[0.14em] text-[9.5px]"
      }, k), /*#__PURE__*/React.createElement("div", {
        className: "text-[var(--text)] mt-0.5"
      }, v))))));
    })(), tab === "poll" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Switch the polling rate of the device. The keyboard will restart and disconnect briefly after switching."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-nowrap gap-2"
    }, [1, 2, 4, 8].map(p => /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: () => setPolling(p),
      className: `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all
                                ${polling === p ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, p, "KHz"))), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "current"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, polling, "000 Hz"), " \xB7 ", (1000 / polling).toFixed(2), "ms tick"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "latency"), " \xB7 ~", (0.5 + 1 / polling).toFixed(2), "ms end-to-end"))), tab === "calib" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "Key Calibration"), /*#__PURE__*/React.createElement("button", {
      onClick: () => onCalibrate && onCalibrate(!calibrating),
      className: "px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-5"
    }, calibrating ? "Stop Calibration" : "Start Calibration"), /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Calibration steps:"), /*#__PURE__*/React.createElement("ol", {
      className: "space-y-2 text-[12px] text-[var(--text-dim)] max-w-2xl"
    }, ["Click the Start Calibration button", "Press the required key (Hit bottom)", "Wait for the corresponding key to change color, and the key calibration is complete", "Click the Stop Calibration button"].map((step, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "shrink-0 grid place-items-center w-5 h-5 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px]"
    }, i + 1), /*#__PURE__*/React.createElement("span", null, step))))))));
  };
  const SwitchRender = ({
    depth = 0,
    actuation = 2.0
  }) => {
    const dMap = window.__liveDepths || {};
    const ovMap = window.__perKeyOverride || {};
    let activeCode = null;
    let bestRaw = 0;
    let maxD = 0;

    if (Number(depth) > 0) {
      for (const [k, v] of Object.entries(dMap)) {
        const rv = Number(v) || 0;
        const cd = Math.floor((rv + 1e-6) * 100) / 100;
        if (cd > maxD || (cd === maxD && rv > bestRaw)) {
          maxD = cd;
          bestRaw = rv;
          activeCode = k;
        }
      }
      if (maxD === 0) {
        bestRaw = Number(depth) || 0;
        maxD = Math.floor((bestRaw + 1e-6) * 100) / 100;
      }
    }

    const cleanDepth = maxD;
    const hwTriggered = Math.abs(bestRaw - cleanDepth) > 0.00004;
    const globalMm = Number(window.__globalTravelMm) || 2.00;
    const sliderMm = (actuation != null && Number(actuation) > 0) ? Number(actuation) : globalMm;

    // Look up the physically pressed key's configured actuation point
    const pressedKeyActMm = (() => {
      if (!activeCode || cleanDepth <= 0.04) return null;
      const sc = String(activeCode).replace(/^Key/, "").replace(/^Digit/, "");
      const kc = sc.length === 1 && /[A-Za-z]/.test(sc) ? "Key" + sc.toUpperCase() : activeCode;
      const modAliases = {
        ShiftLeft: ["LShift", "Shift"], LShift: ["ShiftLeft", "Shift"],
        ShiftRight: ["RShift"], RShift: ["ShiftRight"],
        ControlLeft: ["LCtrl", "Ctrl"], LCtrl: ["ControlLeft", "Ctrl"],
        ControlRight: ["RCtrl"], RCtrl: ["ControlRight"],
        AltLeft: ["LAlt", "Alt"], LAlt: ["AltLeft", "Alt"],
        AltRight: ["RAlt"], RAlt: ["AltRight"]
      }[activeCode] || [];
      let rawCfg = null;
      for (const cand of [activeCode, kc, sc, sc.toUpperCase(), sc.toLowerCase(), ...modAliases]) {
        if (ovMap[cand] !== undefined) {
          rawCfg = ovMap[cand];
          break;
        }
      }
      if (rawCfg && typeof rawCfg === "object") {
        const tm = Number(rawCfg.touchMode);
        const hasCustom = (tm === 1 || tm === 2) || (rawCfg.touchMode === undefined && Number(rawCfg.actuation) > 0);
        if (hasCustom && Number(rawCfg.actuation) > 0) {
          return Number(rawCfg.actuation);
        }
        return globalMm;
      }
      if (typeof rawCfg === "number" && rawCfg > 0) {
        return rawCfg;
      }
      return globalMm;
    })();

    // Latch the yellow line to the last physically pressed key (so it never snaps back on key release!),
    // while immediately tracking the slider whenever the user drags the slider or selects a key in the UI.
    const yellowRef = React.useRef({ mm: sliderMm, prevSlider: sliderMm, prevGlobal: globalMm });
    if (Math.abs(sliderMm - yellowRef.current.prevSlider) > 0.001) {
      yellowRef.current.prevSlider = sliderMm;
      yellowRef.current.mm = sliderMm;
    } else if (Math.abs(globalMm - yellowRef.current.prevGlobal) > 0.001) {
      yellowRef.current.prevGlobal = globalMm;
      yellowRef.current.mm = globalMm;
    }
    if (pressedKeyActMm != null) {
      yellowRef.current.mm = pressedKeyActMm;
    }

    const keyActMm = yellowRef.current.mm || globalMm;
    const isActuated = hwTriggered && cleanDepth > 0.04;
    const stemY = Math.min(40, (cleanDepth / 4.0) * 40);
    const depthPct = Math.min(100, Math.max(0, (cleanDepth / 4.0) * 100));
    const actPct = Math.min(100, Math.max(0, (keyActMm / 4.0) * 100));

    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center gap-3 w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-[110px] h-[150px] flex-shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-16 rounded-md transition-all duration-75 border ${isActuated ? "bg-gradient-to-b from-emerald-400/40 to-emerald-500/25 border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.55)]" : "bg-gradient-to-b from-emerald-200/20 to-emerald-300/10 border-emerald-200/15"}`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 bottom-2 w-14 h-4 rounded-sm border transition-colors duration-75 ${isActuated ? "bg-emerald-950/90 border-emerald-400/60" : "bg-slate-900/60 border-white/10"}`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 w-8 rounded-t-sm border transition-colors duration-75 shadow-[0_2px_6px_rgba(0,0,0,0.4)] ${isActuated ? "bg-emerald-300 border-emerald-100 shadow-[0_0_16px_rgba(52,211,153,0.8)]" : "bg-slate-100/95 border-white/30"}`,
      style: {
        top: 18 + stemY,
        height: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 top-1 w-3 h-3 rounded-sm ${isActuated ? "bg-emerald-600" : "bg-slate-300"}`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 bottom-1 w-1.5 h-1.5 rounded-full ${isActuated ? "bg-emerald-950" : "bg-rose-500"}`
    })), /*#__PURE__*/React.createElement("div", {
      className: `absolute left-1/2 -translate-x-1/2 bottom-6 w-14 h-14 rounded-full blur-2xl transition-opacity duration-75 ${isActuated ? "bg-emerald-400/60 opacity-100" : "bg-[var(--accent)]/30 opacity-70"}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "relative flex flex-col justify-between h-[150px] text-right pr-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -right-1.5 top-[7px] bottom-[7px] w-[6px] rounded-full bg-white/[0.06] overflow-hidden border border-white/10"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-full transition-all duration-75 rounded-full ${isActuated ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : "bg-[var(--accent)]/70"}`,
      style: { height: `${depthPct}%` }
    })), /*#__PURE__*/React.createElement("div", {
      className: "absolute -right-2.5 w-3.5 h-[2px] bg-amber-400 shadow-[0_0_6px_#fbbf24] pointer-events-none z-10 transition-all duration-75 ease-out",
      style: { top: `calc(7px + (100% - 14px) * ${actPct / 100} - 1px)` },
      title: `Actuation Point: ${keyActMm.toFixed(2)}mm`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute -right-3 w-4 h-[3px] rounded-full pointer-events-none z-20 transition-all duration-75 ${isActuated ? "bg-emerald-300 shadow-[0_0_8px_#4ade80]" : "bg-white shadow-[0_0_4px_#fff]"}`,
      style: { top: `calc(7px + (100% - 14px) * ${depthPct / 100} - 1.5px)` }
    }), [0, 1, 2, 3, 4].map(mm => /*#__PURE__*/React.createElement("div", {
      key: mm,
      className: "relative flex items-center justify-end gap-1.5 text-[10px] line-height-none font-mono text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, mm.toFixed(1), "mm"), /*#__PURE__*/React.createElement("span", {
      className: "w-1.5 h-px bg-white/25"
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "w-full flex flex-col items-center gap-1 pt-1 border-t border-[var(--line)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-full py-1 px-2.5 rounded font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-center border transition-all duration-75 ${isActuated ? "bg-emerald-400/20 border-emerald-400 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]" : "bg-white/[0.02] border-[var(--line)] text-[var(--text-faint)]"}`
    }, isActuated ? "\u25CF ACTUATED \u00B7 KEY TRIGGERED" : "\u25CB RELEASED \u00B7 IDLE"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between w-full px-1 text-[10px] font-mono text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement("span", null, "DEPTH:"), /*#__PURE__*/React.createElement("span", {
      className: isActuated ? "text-emerald-300 font-bold" : "text-[var(--text)]"
    }, cleanDepth.toFixed(2), " mm"))));
  };
  const ActuationToolbar = ({
    onSelectAll,
    onSelectInvert,
    onDeselectAll,
    onResetTrigger
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5"
  }, [{
    label: "Select All",
    onClick: onSelectAll
  }, {
    label: "Select Invert",
    onClick: onSelectInvert
  }, {
    label: "Deselect All",
    onClick: onDeselectAll
  }, {
    label: "Reset Trigger",
    onClick: onResetTrigger,
    primary: true
  }].map(b => /*#__PURE__*/React.createElement("button", {
    key: b.label,
    onClick: b.onClick,
    className: `w-[110px] h-8 rounded-md border font-display text-[10.5px] uppercase tracking-[0.16em] transition-all
                    ${b.primary ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
  }, b.label)));

  /* ===== LIGHTING SECTION ===== */
  const PRESETS = [{
    id: "neon",
    name: "Neon Red",
    hex: "#ff1f5a"
  }, {
    id: "cyber",
    name: "Cyber Green",
    hex: "#39ff8a"
  }, {
    id: "elec",
    name: "Electric Blue",
    hex: "#00b8ff"
  }, {
    id: "violet",
    name: "Hyper Violet",
    hex: "#9d4edd"
  }, {
    id: "amber",
    name: "Solar Amber",
    hex: "#ffaa1f"
  }, {
    id: "ice",
    name: "Glacier Ice",
    hex: "#c7f3ff"
  }];
  const LIGHT_MODES = [{
    id: "wave",
    label: "Wave",
    icon: "ã€°"
  }, {
    id: "neon",
    label: "Neon",
    icon: "â—Ž"
  }, {
    id: "radar",
    label: "Radar",
    icon: "â—’"
  }, {
    id: "cross",
    label: "Cross",
    icon: "âœš"
  }, {
    id: "breath",
    label: "Breath",
    icon: "â—‹"
  }, {
    id: "static",
    label: "Static",
    icon: "â– "
  }, {
    id: "aurora",
    label: "Aurora",
    icon: "â—"
  }, {
    id: "ripple",
    label: "Ripple",
    icon: "â—Ž"
  }, {
    id: "twinkle",
    label: "Twinkle",
    icon: "âœ¸"
  }, {
    id: "reactive",
    label: "Reactive",
    icon: "â˜¼"
  }, {
    id: "striation",
    label: "Striation",
    icon: "â¦¹"
  }, {
    id: "fireworks",
    label: "Fireworks",
    icon: "âœ»"
  }, {
    id: "frenzy",
    label: "Frenzy",
    icon: "âœº"
  }, {
    id: "autorip",
    label: "Auto Ripple",
    icon: "â—ˆ"
  }, {
    id: "speedres",
    label: "Speed Respond",
    icon: "â¦¿"
  }, {
    id: "rain",
    label: "Rain",
    icon: "â˜‚"
  }, {
    id: "comet",
    label: "Comet",
    icon: "â˜„"
  }, {
    id: "tide",
    label: "Tide",
    icon: "â‰ˆ"
  }, {
    id: "custom",
    label: "Custom",
    icon: "â—‡"
  }];

  // Per-mode capabilities (mirrors app.jsx FW_MODES, from the firmware driver).
  const ZONE_MODES = [{
    id: "twinkle",
    label: "Twinkle"
  }, {
    id: "wave",
    label: "Wave"
  }, {
    id: "striation",
    label: "Striation"
  }, {
    id: "radar",
    label: "Radar"
  }, {
    id: "ripple",
    label: "Ripple"
  }, {
    id: "cross",
    label: "Cross"
  }, {
    id: "fireworks",
    label: "Fireworks"
  }, {
    id: "aurora",
    label: "Aurora"
  }, {
    id: "breath",
    label: "Breath"
  }, {
    id: "static",
    label: "Static"
  }, {
    id: "rain",
    label: "Rain"
  }, {
    id: "comet",
    label: "Comet"
  }, {
    id: "tide",
    label: "Tide"
  }];

  /* Effect zones: each = a group of keys running its own effect+colors. */
  const ZonesPanel = ({
    zones,
    selectedKeys,
    onAdd,
    onUpdate,
    onRemove
  }) => /*#__PURE__*/React.createElement("div", {
    className: "glass p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
  }, "Effect Zones"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
  }, "Select keys on the board, add a zone, give it its own effect")), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    disabled: !selectedKeys || selectedKeys.size === 0,
    className: "px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] disabled:opacity-40 font-display text-[10.5px] uppercase tracking-[0.16em]"
  }, "+ Zone (", selectedKeys?.size ?? 0, ")")), (!zones || zones.length === 0) && /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[11px] text-[var(--text-faint)]"
  }, "No zones yet \u2014 select keys, then click \u201C+ Zone\u201D. Keys outside every zone stay off."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, (zones || []).map(z => /*#__PURE__*/React.createElement("div", {
    key: z.id,
    className: "rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.35)] p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: z.mode,
    onChange: e => onUpdate(z.id, {
      mode: e.target.value
    }),
    className: "flex-1 h-8 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] text-[var(--text)] font-display text-[11px] uppercase tracking-[0.12em] px-2 outline-none"
  }, ZONE_MODES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m.id,
    value: m.id
  }, m.label))), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[10px] text-[var(--text-faint)] whitespace-nowrap"
  }, z.codes.length, " keys"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(z.id),
    title: "Remove zone",
    className: "w-7 h-7 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-rose-300 hover:border-rose-400/40"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, (z.colors || []).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "relative w-7 h-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full rounded-md ring-1 ring-white/10",
    style: {
      background: c
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: c,
    onChange: e => {
      const cs = [...z.colors];
      cs[i] = e.target.value;
      onUpdate(z.id, {
        colors: cs
      });
    },
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  })), z.colors.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: z.colors.filter((_, j) => j !== i)
    }),
    className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 ring-1 ring-white/20 text-[var(--text-dim)] hover:text-rose-300 grid place-items-center text-[9px]"
  }, "\u2715"))), (z.colors || []).length < 4 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: [...(z.colors || []), "#ffffff"]
    }),
    className: "w-7 h-7 rounded-md border-2 border-dashed border-[var(--line)] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] grid place-items-center text-[12px]"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
  }, "Spd"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "aether flex-1",
    min: 0,
    max: 100,
    step: 1,
    value: z.speed != null ? z.speed : 60,
    style: {
      "--pct": (z.speed != null ? z.speed : 60) + "%"
    },
    onChange: e => onUpdate(z.id, {
      speed: parseFloat(e.target.value)
    })
  })))))));
  const LightingSection = ({
    colors,
    setColors,
    bgColor,
    setBgColor,
    perKeyColors,
    setPerKeyColors,
    pattern,
    setPattern,
    brightness,
    setBrightness,
    speed,
    setSpeed,
    power,
    setPower,
    fullColor,
    setFullColor,
    direction,
    setDirection,
    striOrient,
    setStriOrient,
    bgBright,
    setBgBright,
    zones,
    onAddZone,
    onUpdateZone,
    onRemoveZone,
    selectedKeys,
    onSelectAll,
    onClearSelection
  }) => {
    const palette = colors || []; // may be empty â€” user builds their own palette
    // Full RGB (rainbow) isn't meaningful for Static or per-key Custom.
    const fullColorOk = pattern !== "static" && pattern !== "custom";
    const [activeSlot, setActiveSlot] = useState(0);
    const setSlot = (i, value) => {
      const p = [...palette];
      p[i] = value;
      setColors(p);
    };
    const addSlot = () => {
      if (palette.length >= 4) return;
      const seeds = ["#663390", "#009fa6", "#a62848", "#a66e14"]; // ~2 tones darker defaults
      const next = seeds[palette.length] || "#a6a6a6";
      setColors([...palette, next]);
      setActiveSlot(palette.length);
    };
    const removeSlot = i => {
      if (palette.length <= 0) return;
      const p = palette.filter((_, idx) => idx !== i);
      setColors(p);
      if (activeSlot >= p.length) setActiveSlot(p.length - 1);
    };

    // Apply currently-active palette slot to selected keys
    const assignToSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const c = palette[activeSlot] || palette[0];
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        next[code] = c;
      });
      setPerKeyColors(next);
    };
    const clearPerKeyForSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        delete next[code];
      });
      setPerKeyColors(next);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[15px] text-[var(--text)] tracking-[0.02em] font-semibold"
    }, "Lighting"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, "RGB engine \xB7 per-key")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4"
    }, fullColorOk && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2",
      title: "Cycle the full RGB spectrum (rainbow) instead of the chosen colors"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Full RGB"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setFullColor(!fullColor),
      className: `relative w-10 h-5 rounded-full border transition-colors
                            ${fullColor ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                                  ${fullColor ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Power"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setPower(!power),
      className: `relative w-10 h-5 rounded-full border transition-colors
                          ${power ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                                ${power ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Light Mode"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5"
    }, LIGHT_MODES.map(m => {
      const active = pattern === m.id;
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        onClick: () => setPattern(m.id),
        className: `h-9 rounded-lg border font-display text-[11px] tracking-[0.06em] flex items-center justify-center gap-1.5 transition-all
                                ${active ? "border-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`,
        style: active ? {
          background: "var(--accent-gradient, var(--accent))"
        } : {}
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[12px]"
      }, m.icon), " ", m.label);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Brightness"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, Math.round(brightness), "%")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: 1,
      value: brightness,
      style: {
        "--pct": brightness + "%"
      },
      onChange: e => setBrightness(parseFloat(e.target.value))
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Speed"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, Math.round(speed), "%")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: 1,
      value: speed,
      style: {
        "--pct": speed + "%"
      },
      onChange: e => setSpeed(parseFloat(e.target.value))
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4 gap-1.5 max-w-[220px]"
    }, [["â†’", 0], ["â†", 1], ["â†‘", 2], ["â†“", 3]].map(([arrow, val]) => {
      const active = direction === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setDirection(val),
        className: `h-9 rounded-lg border text-[15px] transition-all
                                ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, arrow);
    }))), pattern === "striation" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Stripe Orientation"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5 max-w-[260px]"
    }, [["Vertical", "v", "â–¥"], ["Horizontal", "h", "â–¤"], ["Both", "both", "â–¦"]].map(([lbl, val, ic]) => {
      const active = (striOrient || "v") === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setStriOrient && setStriOrient(val),
        className: `h-9 rounded-lg border text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all
                                  ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[14px]"
      }, ic), lbl);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Background color"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "underlies the effect")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-14 h-12 rounded-xl overflow-hidden ring-1 ring-white/10",
      style: {
        background: bgColor,
        boxShadow: `0 0 18px ${bgColor}55`
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "color",
      value: bgColor,
      onChange: e => setBgColor(e.target.value),
      className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    })), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: bgColor.toUpperCase(),
      onChange: e => {
        const v = e.target.value;
        if (/^#[0-9a-fA-F]{6}$/.test(v)) setBgColor(v);else setBgColor(v);
      },
      className: "flex-1 h-10 px-3 rounded-lg bg-[rgba(5,11,14,0.5)] border border-[var(--line)] font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => setBgColor("#000000"),
      className: "px-2.5 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Off")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 mt-2.5"
    }, ["#000000", "#0b0f19", "#1a0833", "#001318", "#0a1f10", "#241400", "#2a0814", "#ffffff"].map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setBgColor(c),
      className: `w-6 h-6 rounded-md ring-1 ${bgColor.toLowerCase() === c.toLowerCase() ? "ring-white scale-110" : "ring-white/15 hover:scale-105"} transition-transform`,
      style: {
        background: c
      },
      title: c
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, pattern !== "custom" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Effect colors \xB7 ", palette.length, "/4"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, palette.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => setColors([]),
      className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)] hover:text-rose-300"
    }, "Clear all"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "click slot to recolor"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, palette.map((c, i) => {
      const isActive = activeSlot === i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "relative flex-1 min-w-0 group"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setActiveSlot(i),
        className: `relative w-full h-16 rounded-2xl overflow-hidden ring-1 transition-all
                                  ${isActive ? "ring-2 ring-white/80 scale-[1.02]" : "ring-white/10 hover:scale-[1.01]"}`,
        style: {
          background: c,
          boxShadow: `0 0 24px ${c}55, inset 0 0 0 1px rgba(255,255,255,0.06)`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "absolute bottom-1.5 left-2 text-[10px] font-mono text-white/85",
        style: {
          textShadow: "0 1px 4px rgba(0,0,0,0.6)"
        }
      }, c.toUpperCase()), /*#__PURE__*/React.createElement("input", {
        type: "color",
        value: c,
        onChange: e => setSlot(i, e.target.value),
        onClick: e => e.stopPropagation(),
        className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      })), palette.length > 0 && /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          removeSlot(i);
        },
        title: "Remove",
        className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 ring-1 ring-white/20 text-slate-300 hover:text-rose-300 grid place-items-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
      }, "\u2715"));
    }), palette.length < 4 && /*#__PURE__*/React.createElement("button", {
      onClick: addSlot,
      className: "flex-1 min-w-0 h-16 rounded-2xl border-2 border-dashed border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.18em]"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 13
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4 gap-2"
    }, [["#9d4edd"], ["#00f5ff"], ["#ff3d6e"], ["#39ff8a"], ["#9d4edd", "#00f5ff"], ["#ff7a59", "#ffaa1f"], ["#ff3d6e", "#ffaa1f", "#39ff8a"], ["#ff3d6e", "#ffaa1f", "#39ff8a", "#3b82f6"]].map((p, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        setColors([...p]);
        setActiveSlot(0);
      },
      className: "h-7 rounded-lg ring-1 ring-white/10 hover:scale-[1.02] transition-transform overflow-hidden",
      title: p.join(", ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full flex"
    }, p.map((c, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: "flex-1",
      style: {
        background: c
      }
    }))))))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Per-key colors"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, selectedKeys?.size ?? 0, " key", (selectedKeys?.size ?? 0) === 1 ? "" : "s", " selected \xB7 Ctrl/\u2318-click to toggle")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onSelectAll,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Select all"), /*#__PURE__*/React.createElement("button", {
      onClick: onClearSelection,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Clear"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: assignToSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "flex-1 h-10 rounded-lg font-display text-[12px] uppercase tracking-[0.18em] text-[var(--accent-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110",
      style: {
        background: "var(--accent-gradient, var(--accent))",
        boxShadow: "0 8px 24px -8px var(--accent-glow)"
      }
    }, "Paint selected with slot ", activeSlot + 1), /*#__PURE__*/React.createElement("button", {
      onClick: clearPerKeyForSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "px-3 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] disabled:opacity-40 font-display text-[11.5px] uppercase tracking-[0.18em]"
    }, "Reset"))), pattern === "custom" && /*#__PURE__*/React.createElement(ZonesPanel, {
      zones: zones,
      selectedKeys: selectedKeys,
      onAdd: onAddZone,
      onUpdate: onUpdateZone,
      onRemove: onRemoveZone
    }))));
  };

  /* ===== SOCD SECTION ===== */
  const SOCDSection = ({
    socdMode,
    setSocdMode,
    hotkey,
    hotkeyEnabled,
    setHotkeyEnabled,
    onApply,
    profiles,
    setProfiles,
    active,
    setActive
  }) => {
    const cur = profiles.find(p => p.id === active) || profiles[0];
    const updateActive = patch => setProfiles(ps => ps.map(p => p.id === active ? {
      ...p,
      ...patch
    } : p));
    const addProfile = () => {
      if (profiles.length >= 20) return; // enforce the advertised /20 cap
      // Smallest unused SOCDn id â€” length-based ids collide after a delete.
      const used = new Set(profiles.map(p => p.id));
      let n = 1;
      while (used.has(`SOCD${n}`)) n++;
      const next = `SOCD${n}`;
      setProfiles([...profiles, {
        id: next,
        k1: "",
        k2: "",
        mode: 1
      }]);
      setActive(next);
    };
    const delActive = () => {
      if (profiles.length <= 1) return;
      const remaining = profiles.filter(p => p.id !== active);
      setProfiles(remaining);
      setActive(remaining[0].id);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-nowrap items-center gap-4 mb-5 pb-4 border-b border-[var(--line)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Switch"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setHotkeyEnabled(!hotkeyEnabled),
      className: `relative w-10 h-5 rounded-full border transition-colors
                        ${hotkeyEnabled ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${hotkeyEnabled ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-dim)]"
    }, "Hotkey: ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, hotkey)), /*#__PURE__*/React.createElement("div", {
      className: "ml-auto"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onApply && onApply(profiles, hotkeyEnabled),
      className: "px-5 h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.16em] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110"
    }, "Apply"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[200px_320px_1fr] gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-2"
    }, profiles.length, "/20 slots"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5 mb-3"
    }, profiles.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => setActive(p.id),
      className: `flex items-center justify-between px-3 h-8 rounded-md border font-mono text-[12px] transition-all
                            ${active === p.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", null, p.id), p.k1 && p.k2 && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, p.k1, " \u2194 ", p.k2)))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: addProfile,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " Create"), /*#__PURE__*/React.createElement("button", {
      onClick: delActive,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 font-display text-[11px] uppercase tracking-[0.16em]"
    }, /*#__PURE__*/React.createElement(ITrash, {
      size: 12
    }), " Delete"))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 1"), /*#__PURE__*/React.createElement("div", {
      className: `h-9 rounded-md border grid place-items-center font-mono text-[14px]
                               ${cur?.k1 ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02]"}`
    }, cur?.k1 || "â€”")), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] mt-5"
    }, /*#__PURE__*/React.createElement(IUnlink, {
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 2"), /*#__PURE__*/React.createElement("div", {
      className: `h-9 rounded-md border grid place-items-center font-mono text-[14px]
                               ${cur?.k2 ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02]"}`
    }, cur?.k2 || "â€”"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5 mb-4"
    }, [1, 2, 3, 4].map(m => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => updateActive({
        mode: m
      }),
      className: `flex items-center gap-2 px-3 h-9 rounded-md border font-mono text-[12px] transition-all
                            ${cur?.mode === m ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-3 h-3 rounded-full border ${cur?.mode === m ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--text-faint)]"}`
    }), "Model ", m))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 text-[11.5px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] font-display uppercase tracking-[0.18em] text-[10.5px] mb-2"
    }, "When both Key1 and Key2 fire:"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 font-mono"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 1"), " \xB7 First press wins; second is interrupted."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 2"), " \xB7 Key1 interrupts Key2."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 3"), " \xB7 Key2 interrupts Key1."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 4"), " \xB7 Later-triggered key wins (Snap Tap).")))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k1,
      onPick: k => updateActive({
        k1: cur?.k1 ? cur.k1 : k,
        k2: cur?.k1 && !cur?.k2 ? k : cur?.k2
      })
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k2,
      onPick: k => updateActive({
        k2: k
      })
    }))));
  };

  /* ===== OTHER SECTION ===== */
  const OtherSection = ({
    activeProfileName = "Profile",
    onResetProfile = () => {}
  }) => {
    const [winLock, setWinLock] = useState({
      win: true,
      shiftTab: false,
      altTab: false,
      altF4: false
    });
    // Always render the toggle on Windows â€” the bridge probe was racing the
    // first paint and the option would silently disappear.
    const isWindows = typeof navigator !== "undefined" && /Windows/i.test(navigator.userAgent || "");
    const [autostart, setAutostart] = useState({
      supported: isWindows,
      enabled: false
    });
    const [settingsInfo, setSettingsInfo] = useState({
      path: "",
      exists: false
    });
    // Updates: current version + latest GitHub release. State machine:
    // idle -> checking -> {uptodate | available | error}; then installing -> done.
    const [upd, setUpd] = useState({
      phase: "idle",
      version: "",
      info: null,
      msg: ""
    });
    // Auto-update-on-launch preference (null = still loading / never set).
    const [autoUpd, setAutoUpd] = useState(null);
    useEffect(() => {
      const api = window.pywebview?.api;
      if (!api?.app_version) return;
      api.app_version().then(r => {
        if (r?.ok) setUpd(u => ({
          ...u,
          version: r.version
        }));
      }).catch(() => {});
      // Auto-check once on open (silent on failure â€” it's just informational).
      checkUpdate(true);
    }, []);
    const checkUpdate = async silent => {
      const api = window.pywebview?.api;
      if (!api?.check_update) return;
      setUpd(u => ({
        ...u,
        phase: "checking",
        msg: ""
      }));
      try {
        const r = await api.check_update();
        if (!r || !r.ok) {
          setUpd(u => ({
            ...u,
            phase: silent ? "idle" : "error",
            msg: r?.error || "check failed"
          }));
          return;
        }
        if (r.update) setUpd(u => ({
          ...u,
          phase: "available",
          info: r
        }));else setUpd(u => ({
          ...u,
          phase: "uptodate",
          info: r,
          msg: r.newer ? "New version exists, but no installer for this OS." : ""
        }));
      } catch (e) {
        setUpd(u => ({
          ...u,
          phase: silent ? "idle" : "error",
          msg: String(e)
        }));
      }
    };
    const installUpdate = async () => {
      const api = window.pywebview?.api;
      if (!api?.apply_update || !upd.info) return;
      setUpd(u => ({
        ...u,
        phase: "installing",
        msg: "Downloadingâ€¦"
      }));
      try {
        const r = await api.apply_update(upd.info.asset_url, upd.info.asset_name);
        if (!r || !r.ok) {
          setUpd(u => ({
            ...u,
            phase: "error",
            msg: r?.error || "install failed"
          }));
          return;
        }
        if (r.quit) setUpd(u => ({
          ...u,
          phase: "done",
          msg: "Installer launched â€” Aether will close and reopen."
        }));else if (r.restart) setUpd(u => ({
          ...u,
          phase: "done",
          msg: "Update installed â€” quit and reopen Aether to apply it."
        }));else setUpd(u => ({
          ...u,
          phase: "done",
          msg: r.path ? `Downloaded to ${r.path}` : "Downloaded."
        }));
      } catch (e) {
        setUpd(u => ({
          ...u,
          phase: "error",
          msg: String(e)
        }));
      }
    };
    useEffect(() => {
      let cancelled = false;
      const probe = () => {
        const api = window.pywebview?.api;
        if (!api) return;
        if (api.get_autostart) {
          api.get_autostart().then(r => {
            if (cancelled || !r || !r.ok) return;
            setAutostart({
              supported: !!r.supported || isWindows,
              enabled: !!r.enabled
            });
          }).catch(() => {});
        }
        if (api.settings_info) {
          api.settings_info().then(r => {
            if (cancelled || !r || !r.ok) return;
            setSettingsInfo({
              path: r.path || "",
              exists: !!r.exists
            });
          }).catch(() => {});
        }
        if (api.get_auto_update) {
          api.get_auto_update().then(r => {
            if (cancelled || !r || !r.ok) return;
            // null (never answered) shows as ON here, matching the default the
            // startup prompt applies; the toggle then persists an explicit value.
            setAutoUpd(r.autoUpdate === null ? true : !!r.autoUpdate);
          }).catch(() => {});
        }
      };
      probe();
      const id = setInterval(probe, 800);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }, []);
    const toggleAutostart = async () => {
      const next = !autostart.enabled;
      setAutostart(s => ({
        ...s,
        enabled: next
      }));
      if (!window.pywebview?.api?.set_autostart) return;
      const r = await window.pywebview.api.set_autostart(next);
      if (!(r && r.ok)) setAutostart(s => ({
        ...s,
        enabled: !next
      }));
    };
    const toggleAutoUpdate = async () => {
      const next = !autoUpd;
      setAutoUpd(next);
      if (!window.pywebview?.api?.set_auto_update) return;
      const r = await window.pywebview.api.set_auto_update(next);
      if (!(r && r.ok)) setAutoUpd(!next);
    };
    const revealSettings = async () => {
      if (window.pywebview?.api?.reveal_settings) await window.pywebview.api.reveal_settings();
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", {
      className: "flex items-center gap-1 border-b border-[var(--line)] mb-5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "relative flex items-center gap-2 px-2 h-10 -mb-px font-display text-[12px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, /*#__PURE__*/React.createElement(IGrid, {
      size: 13
    }), " Settings", /*#__PURE__*/React.createElement("span", {
      className: "absolute left-0 right-0 -bottom-px h-px bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl"
    }, autostart.supported && /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Start on launch"), /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text-dim)] mt-1"
    }, "Open Aether automatically when you sign in to Windows.")), /*#__PURE__*/React.createElement("button", {
      onClick: toggleAutostart,
      className: `relative w-12 h-6 rounded-full border transition-colors shrink-0 ml-4
                          ${autostart.enabled ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 rounded-full transition-all
                                ${autostart.enabled ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
      style: {
        width: 18,
        height: 18
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Current profile"), /*#__PURE__*/React.createElement("div", {
      className: "text-[12.5px] text-[var(--text)] mt-1 truncate"
    }, activeProfileName), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] text-[var(--text-faint)] mt-0.5"
    }, "Use the profile dropdown (top-left) to add, rename, duplicate or delete profiles."), /*#__PURE__*/React.createElement("button", {
      onClick: onResetProfile,
      className: "mt-3 px-3 h-8 rounded-md border border-rose-400/30 bg-rose-500/10 text-rose-100 font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-rose-500/15"
    }, "Reset this profile")), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 lg:col-span-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Updates"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "v", upd.version || "â€”")), /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] mt-1 min-h-[18px]"
    }, upd.phase === "checking" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)]"
    }, "Checking for updates\u2026"), upd.phase === "uptodate" && /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400/80"
    }, "You're on the latest version", upd.msg ? " â€” " + upd.msg : "."), upd.phase === "available" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Update available \u2192 v", upd.info?.latest), upd.phase === "installing" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)]"
    }, upd.msg || "Installingâ€¦"), upd.phase === "done" && /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400/80"
    }, upd.msg), upd.phase === "error" && /*#__PURE__*/React.createElement("span", {
      className: "text-rose-300/90"
    }, "Update error: ", upd.msg), upd.phase === "idle" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "Check for a newer release on GitHub.")), upd.phase === "available" && upd.info?.notes && /*#__PURE__*/React.createElement("pre", {
      className: "mt-2 max-h-28 overflow-auto whitespace-pre-wrap text-[11px] text-[var(--text-dim)] bg-[rgba(5,11,14,0.5)] rounded-md p-2 border border-[var(--line)]"
    }, upd.info.notes), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => checkUpdate(false),
      disabled: upd.phase === "checking" || upd.phase === "installing",
      className: "px-3 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] disabled:opacity-40"
    }, "Check for updates"), upd.phase === "available" && /*#__PURE__*/React.createElement("button", {
      onClick: installUpdate,
      className: "px-3 h-8 rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, "Download & install")), /*#__PURE__*/React.createElement("div", {
      className: "mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-[var(--text)]"
    }, "Auto-update on launch"), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] text-[var(--text-dim)] mt-0.5"
    }, "Install new releases automatically when Aether opens.")), /*#__PURE__*/React.createElement("button", {
      onClick: toggleAutoUpdate,
      disabled: autoUpd === null,
      className: `relative w-12 h-6 rounded-full border transition-colors shrink-0 ml-4 disabled:opacity-40
                          ${autoUpd ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 rounded-full transition-all
                                ${autoUpd ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
      style: {
        width: 18,
        height: 18
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 lg:col-span-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Settings file"), /*#__PURE__*/React.createElement("span", {
      className: `font-mono text-[10px] uppercase tracking-[0.18em] ${settingsInfo.exists ? "text-emerald-400/80" : "text-[var(--text-faint)]"}`
    }, settingsInfo.exists ? "âœ“ saved" : "not yet written")), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-dim)] mt-2 break-all"
    }, settingsInfo.path || "(loadingâ€¦)"), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: revealSettings,
      className: "px-3 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }, "Show in folder")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "If Win Lock is ON:"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 max-w-md"
    }, [{
      id: "win",
      label: "Disable Windows key"
    }, {
      id: "shiftTab",
      label: "Disable Shift+Tab"
    }, {
      id: "altTab",
      label: "Disable Alt+Tab"
    }, {
      id: "altF4",
      label: "Disable Alt+F4"
    }].map(o => /*#__PURE__*/React.createElement("label", {
      key: o.id,
      className: "flex items-center gap-2.5 cursor-pointer select-none"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => setWinLock(w => ({
        ...w,
        [o.id]: !w[o.id]
      })),
      className: `w-4 h-4 rounded border grid place-items-center transition
                                ${winLock[o.id] ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`
    }, winLock[o.id] && /*#__PURE__*/React.createElement(ICheck, {
      size: 10,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-[12.5px] text-[var(--text-dim)]"
    }, o.label))))));
  };

  /* ===== Gamepad: virtual-pad capture + per-key control mapping ===== */
  const PAD_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Space", "Enter", "L-Shift", "L-Ctrl", "Up", "Down", "Left", "Right"];
  const PAD_AXES = [{
    id: "LX",
    label: "Left Stick X",
    stick: true
  }, {
    id: "LY",
    label: "Left Stick Y",
    stick: true
  }, {
    id: "RX",
    label: "Right Stick X",
    stick: true
  }, {
    id: "RY",
    label: "Right Stick Y",
    stick: true
  }, {
    id: "LT",
    label: "Left Trigger",
    stick: false
  }, {
    id: "RT",
    label: "Right Trigger",
    stick: false
  }, {
    id: "BTN_A",
    label: "Button A",
    stick: false,
    btn: true
  }, {
    id: "BTN_B",
    label: "Button B",
    stick: false,
    btn: true
  }, {
    id: "BTN_X",
    label: "Button X",
    stick: false,
    btn: true
  }, {
    id: "BTN_Y",
    label: "Button Y",
    stick: false,
    btn: true
  }, {
    id: "BTN_LB",
    label: "Bumper L",
    stick: false,
    btn: true
  }, {
    id: "BTN_RB",
    label: "Bumper R",
    stick: false,
    btn: true
  }];
  const axisMeta = id => PAD_AXES.find(a => a.id === id) || PAD_AXES[0];
  const GamepadSection = ({
    connected,
    enabled,
    onToggle,
    map,
    onApplyMap,
    defaultMap,
    error,
    onInstallDriver
  }) => {
    const rows = map || [];
    const setRow = (i, patch) => onApplyMap(rows.map((r, j) => j === i ? {
      ...r,
      ...patch
    } : r));
    const addRow = () => onApplyMap([...rows, {
      key: "W",
      axis: "RT",
      direction: 1,
      threshold_mm: 1.5
    }]);
    const removeRow = i => onApplyMap(rows.filter((_, j) => j !== i));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "glass p-5 mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[13px] uppercase tracking-[0.18em] text-[var(--text)] flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(IZap, {
      size: 15
    }), " Virtual Gamepad"), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mt-1.5 max-w-xl"
    }, "Streams live key travel into a system gamepad \u2014 press a key deeper for more throttle / steering. Maps below drive the analog axes & buttons. ", !connected && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Connect the board to capture."))), /*#__PURE__*/React.createElement("button", {
      onClick: () => onToggle(!enabled),
      disabled: !connected,
      className: `relative w-12 h-6 rounded-full border transition-colors shrink-0 ml-4
                        ${!connected ? "opacity-40 cursor-not-allowed" : ""}
                        ${enabled ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all
                              ${enabled ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
      style: {
        width: 18,
        height: 18
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 font-mono text-[11px]"
    }, enabled ? /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400"
    }, "\u25CF Capturing \u2192 \"Aula Win60 HE Virtual Gamepad\"") : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "\u25CB Idle")), error && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[11.5px] text-rose-100 flex items-center justify-between gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, error.msg), error.needsDriver && /*#__PURE__*/React.createElement("button", {
      onClick: onInstallDriver,
      className: "shrink-0 px-3 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, "Install ViGEmBus"))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Key \u2192 Control Mapping"), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onApplyMap(defaultMap.map(r => ({
        ...r
      }))),
      className: "px-3 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement(IRefresh, {
      size: 12
    }), " Driving Defaults"), /*#__PURE__*/React.createElement("button", {
      onClick: addRow,
      className: "px-3 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 px-1 mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, "Key"), /*#__PURE__*/React.createElement("span", null, "Control"), /*#__PURE__*/React.createElement("span", null, "Behaviour"), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, rows.map((r, i) => {
      const meta = axisMeta(r.axis);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 items-center"
      }, /*#__PURE__*/React.createElement("select", {
        value: r.key,
        onChange: e => setRow(i, {
          key: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_KEYS.map(k => /*#__PURE__*/React.createElement("option", {
        key: k,
        value: k
      }, k))), /*#__PURE__*/React.createElement("select", {
        value: r.axis,
        onChange: e => setRow(i, {
          axis: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_AXES.map(a => /*#__PURE__*/React.createElement("option", {
        key: a.id,
        value: a.id
      }, a.label))), meta.stick ? /*#__PURE__*/React.createElement("div", {
        className: "flex gap-1"
      }, [["âˆ’", -1], ["+", 1]].map(([lbl, val]) => /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setRow(i, {
          direction: val
        }),
        className: `flex-1 h-9 rounded-md border font-mono text-[13px] transition-all
                                    ${(r.direction || 1) === val ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, lbl))) : meta.btn ? /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "range",
        className: "aether flex-1",
        min: 0.2,
        max: 3.4,
        step: 0.1,
        value: r.threshold_mm ?? 1.5,
        style: {
          "--pct": ((r.threshold_mm ?? 1.5) - 0.2) / 3.2 * 100 + "%"
        },
        onChange: e => setRow(i, {
          threshold_mm: parseFloat(e.target.value)
        })
      }), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-dim)] w-12 text-right"
      }, (r.threshold_mm ?? 1.5).toFixed(1), "mm")) : /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-faint)] pl-1"
      }, "analog 0\u2192max"), /*#__PURE__*/React.createElement("button", {
        onClick: () => removeRow(i),
        className: "w-7 h-7 grid place-items-center rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] hover:text-rose-300 hover:border-rose-400/30"
      }, /*#__PURE__*/React.createElement(ITrash, {
        size: 12
      })));
    }), !rows.length && /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-[var(--text-faint)] py-4 text-center"
    }, "No mappings \u2014 add one or load driving defaults.")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] text-[var(--text-faint)] mt-4 leading-relaxed"
    }, "Sticks combine opposing keys (e.g. A=\u2212 and D=+ on Left Stick X). Triggers & sticks are analog \u2014 deeper press = larger value. Buttons fire past their threshold. Changes apply live while capturing.")));
  };
  window.AetherSections = {
    // Shared primitives + telemetry parts, exported so workspace files (desktop
    // widget bodies) can reuse them byte-identically instead of re-implementing.
    Slider,
    Chip,
    SubTabs,
    SwitchRender,
    ToolbarButton,
    KeymapSection: React.memo(KeymapSection, (prev, next) => prev.selectedKey === next.selectedKey && prev.selectedCount === next.selectedCount && prev.selectedKeys === next.selectedKeys && prev.connected === next.connected),
    ActuationSection: React.memo(ActuationSection, (prev, next) => prev.actuation === next.actuation && prev.rtPress === next.rtPress && prev.rtRelease === next.rtRelease && prev.rtEnabled === next.rtEnabled && prev.polling === next.polling && prev.travelTest === next.travelTest && prev.calibrating === next.calibrating && prev.deadTop === next.deadTop && prev.deadBottom === next.deadBottom && prev.switchId === next.switchId && prev.liveDepth === next.liveDepth && prev.selectedCount === next.selectedCount && prev.selectedKeys === next.selectedKeys && prev.connected === next.connected),
    LightingSection: React.memo(LightingSection, (prev, next) => prev.colors === next.colors && prev.bgColor === next.bgColor && prev.perKeyColors === next.perKeyColors && prev.pattern === next.pattern && prev.brightness === next.brightness && prev.speed === next.speed && prev.power === next.power && prev.fullColor === next.fullColor && prev.direction === next.direction && prev.striOrient === next.striOrient && prev.bgBright === next.bgBright && prev.zones === next.zones && prev.selectedKeys === next.selectedKeys),
    SOCDSection: React.memo(SOCDSection, (prev, next) => prev.socdMode === next.socdMode && prev.hotkey === next.hotkey && prev.hotkeyEnabled === next.hotkeyEnabled && prev.profiles === next.profiles && prev.active === next.active),
    GamepadSection: React.memo(GamepadSection, (prev, next) => prev.connected === next.connected && prev.enabled === next.enabled && prev.map === next.map && prev.error === next.error),
    OtherSection: React.memo(OtherSection),
    ActuationToolbar: React.memo(ActuationToolbar)
  };
})();
</script>
<script data-mod="theme">
/* Theme customizer popup â€” palette (1-4 colors) + image backdrop */
(() => {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const {
    IPalette,
    IWaves,
    IDownload,
    ICheck,
    ITrash,
    IPlus,
    IRefresh
  } = window.AetherIcons;

  /* ===== Curated palettes (each up to 4 colors) ===== */
  const PALETTE_PRESETS = [{
    name: "Lagoon",
    colors: ["#6fe8c0"]
  }, {
    name: "Ember",
    colors: ["#f4b268"]
  }, {
    name: "Tide",
    colors: ["#6fe8c0", "#8ae0ff"]
  }, {
    name: "Moss",
    colors: ["#7be3b0", "#c9e07a"]
  }, {
    name: "Aurora",
    colors: ["#6fe8c0", "#f4b268"]
  }, {
    name: "Mono Slate",
    colors: ["#94a3b8"]
  }];
  const IMAGE_PRESETS = [{
    name: "Ember",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='70%' cy='110%' r='120%'><stop offset='0' stop-color='%230c1a17'/><stop offset='0.55' stop-color='%23050b0e'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%23f5a952' stop-opacity='0.35'/><stop offset='1' stop-color='%23f5a952' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%231d5c52' stop-opacity='0.35'/><stop offset='1' stop-color='%231d5c52' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Tide",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='30%' cy='110%' r='120%'><stop offset='0' stop-color='%2308131f'/><stop offset='0.55' stop-color='%2304080e'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%233aa6c9' stop-opacity='0.3'/><stop offset='1' stop-color='%233aa6c9' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%2314456e' stop-opacity='0.35'/><stop offset='1' stop-color='%2314456e' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Moss",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='50%' cy='120%' r='120%'><stop offset='0' stop-color='%230b1510'/><stop offset='0.55' stop-color='%2305090a'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%236f9a3e' stop-opacity='0.3'/><stop offset='1' stop-color='%236f9a3e' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%231e4d36' stop-opacity='0.35'/><stop offset='1' stop-color='%231e4d36' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Violet Hour",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='80%' cy='120%' r='120%'><stop offset='0' stop-color='%23150f1d'/><stop offset='0.55' stop-color='%23070510'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%238a5cf6' stop-opacity='0.3'/><stop offset='1' stop-color='%238a5cf6' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%23d4638a' stop-opacity='0.3'/><stop offset='1' stop-color='%23d4638a' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }];

  /* ===== Helpers ===== */
  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16)
    } : null;
  }
  function isLight(hex) {
    const r = hexToRgb(hex);
    if (!r) return false;
    const L = 0.299 * r.r + 0.587 * r.g + 0.114 * r.b;
    return L > 160;
  }
  function glowFor(hex, alpha = 0.45) {
    const r = hexToRgb(hex);
    if (!r) return "rgba(255,255,255,0.3)";
    return `rgba(${r.r},${r.g},${r.b},${alpha})`;
  }
  const DEFAULT_THEME = {
    palette: ["#6fe8c0"],
    // 1-4 colors
    gradientAngle: 135,
    useImage: false,
    image: null,
    imageOpacity: 0.6
  };
  function applyTheme(theme) {
    const root = document.documentElement;
    const colors = theme.palette && theme.palette.length ? theme.palette : ["#6fe8c0"];
    const c1 = colors[0];
    root.style.setProperty("--accent", c1);
    root.style.setProperty("--accent-2", colors[1] || c1);
    root.style.setProperty("--accent-3", colors[2] || c1);
    root.style.setProperty("--accent-4", colors[3] || c1);
    root.style.setProperty("--accent-glow", glowFor(c1, 0.45));
    root.style.setProperty("--accent-fg", isLight(c1) ? "#0b0f19" : "#ffffff");
    const gradient = colors.length > 1 ? `linear-gradient(${theme.gradientAngle ?? 135}deg, ${colors.join(", ")})` : c1;
    root.style.setProperty("--accent-gradient", gradient);
    if (colors.length > 1) document.body.classList.add("accent-is-gradient");else document.body.classList.remove("accent-is-gradient");
    const bg = document.getElementById("__bg-image-layer");
    if (theme.useImage && theme.image && bg) {
      bg.style.backgroundImage = `url("${theme.image}")`;
      bg.style.opacity = theme.imageOpacity ?? 0.6;
      bg.style.display = "block";
    } else if (bg) {
      bg.style.display = "none";
    }
  }

  /* Migrate older themes (single accent / gradient mode) to palette */
  function migrate(t) {
    if (Array.isArray(t.palette)) return t;
    // Legacy structure
    const palette = [];
    if (t.mode === "gradient" && t.gradient) {
      palette.push(t.gradient.from, t.gradient.to);
    } else if (t.accent) {
      palette.push(t.accent);
    } else {
      palette.push("#6fe8c0");
    }
    return {
      palette,
      gradientAngle: t.gradient?.angle ?? 135,
      useImage: t.mode === "image",
      image: t.image || null,
      imageOpacity: t.imageOpacity ?? 0.35
    };
  }

  /* ===== Public hook ===== */
  function useTheme() {
    const [theme, setThemeState] = useState(() => {
      try {
        const raw = JSON.parse(localStorage.getItem("aether-theme"));
        if (!raw) return DEFAULT_THEME;
        return {
          ...DEFAULT_THEME,
          ...migrate(raw)
        };
      } catch {
        return DEFAULT_THEME;
      }
    });
    useEffect(() => {
      applyTheme(theme);
      try {
        localStorage.setItem("aether-theme", JSON.stringify(theme));
      } catch {}
    }, [theme]);
    return [theme, setThemeState];
  }

  /* ===== Multi-color slot ===== */
  const ColorSlot = ({
    color,
    onChange,
    onRemove,
    removable
  }) => /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-16 rounded-2xl overflow-hidden ring-1 ring-white/10",
    style: {
      background: color,
      boxShadow: `0 0 24px ${color}55, inset 0 0 0 1px rgba(255,255,255,0.06)`
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: color,
    onChange: e => onChange(e.target.value),
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: `absolute bottom-1.5 left-2 text-[10px] font-mono ${isLight(color) ? "text-black/70" : "text-white/80"} drop-shadow`,
    style: {
      textShadow: isLight(color) ? "none" : "0 1px 4px rgba(0,0,0,0.6)"
    }
  }, color.toUpperCase()), removable && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    title: "Remove",
    className: `absolute top-1.5 right-1.5 w-5 h-5 rounded-full grid place-items-center ${isLight(color) ? "bg-black/30 text-white" : "bg-white/80 text-black"} hover:scale-110 transition-transform`
  }, "\u2715")));
  const AddSlot = ({
    onAdd
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    className: "flex-1 min-w-0 h-16 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] text-slate-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.18em]"
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 13
  }), " Add"));

  /* ===== Popup ===== */
  const ThemePopup = ({
    open,
    onClose,
    theme,
    setTheme
  }) => {
    const [tab, setTab] = useState("palette");
    const [draft, setDraft] = useState(theme);
    const fileRef = useRef(null);
    useEffect(() => {
      if (open) {
        setDraft(theme);
        setTab("palette");
      }
    }, [open]);
    useEffect(() => {
      if (open) applyTheme(draft);
    }, [draft, open]);
    useEffect(() => {
      const onKey = e => {
        if (e.key === "Escape" && open) handleClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open]);
    const handleClose = () => {
      applyTheme(theme);
      onClose();
    };
    const handleApply = () => {
      setTheme(draft);
      onClose();
    };
    const handleReset = () => {
      setDraft(DEFAULT_THEME);
    };
    const palette = draft.palette || ["#6fe8c0"];
    const setSlot = (i, value) => {
      const p = [...palette];
      p[i] = value;
      setDraft(d => ({
        ...d,
        palette: p
      }));
    };
    const addSlot = () => {
      if (palette.length >= 4) return;
      const next = ["#f4b268", "#8ae0ff", "#c9e07a"][palette.length - 1] || "#ffffff";
      setDraft(d => ({
        ...d,
        palette: [...palette, next]
      }));
    };
    const removeSlot = i => {
      if (palette.length <= 1) return;
      setDraft(d => ({
        ...d,
        palette: palette.filter((_, idx) => idx !== i)
      }));
    };
    const usePreset = colors => setDraft(d => ({
      ...d,
      palette: [...colors]
    }));
    const onImageFile = file => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        setDraft(d => ({
          ...d,
          image: e.target.result,
          useImage: true
        }));
      };
      reader.readAsDataURL(file);
    };
    if (!open) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[120] flex items-center justify-center",
      onMouseDown: e => {
        if (e.target === e.currentTarget) handleClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-black/65 backdrop-blur-md animate-[fadeIn_180ms_ease-out]"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative w-[680px] max-w-[92vw] max-h-[90vh] overflow-hidden rounded-3xl bg-[#0e1220]/95 border border-white/[0.06] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] animate-[popIn_220ms_cubic-bezier(.2,.9,.3,1.1)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-7 pt-6 pb-3 flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500"
    }, "Appearance"), /*#__PURE__*/React.createElement("div", {
      className: "text-[22px] font-display font-semibold tracking-[0.02em] text-slate-50 mt-1"
    }, "Customize Theme"), /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-slate-500 mt-1"
    }, "Pick up to 4 colors \u2014 they'll cascade through the app, accents and lighting.")), /*#__PURE__*/React.createElement("button", {
      onClick: handleClose,
      className: "w-9 h-9 rounded-full grid place-items-center text-slate-500 hover:text-slate-100 hover:bg-white/[0.06] transition-colors"
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "px-7 pb-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.04]"
    }, [{
      id: "palette",
      label: "Palette",
      icon: /*#__PURE__*/React.createElement(IPalette, {
        size: 13
      })
    }, {
      id: "image",
      label: "Background",
      icon: /*#__PURE__*/React.createElement(IDownload, {
        size: 13
      })
    }].map(t => {
      const isActive = tab === t.id;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: () => setTab(t.id),
        className: `relative flex items-center gap-2 px-4 h-8 rounded-lg text-[12px] font-display uppercase tracking-[0.18em] transition-all
                              ${isActive ? "text-slate-50 bg-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.3)]" : "text-slate-400 hover:text-slate-200"}`
      }, t.icon, t.label);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "px-7 py-5 overflow-y-auto max-h-[60vh]"
    }, tab === "palette" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2.5 mb-4"
    }, palette.map((c, i) => /*#__PURE__*/React.createElement(ColorSlot, {
      key: i,
      color: c,
      onChange: v => setSlot(i, v),
      onRemove: () => removeSlot(i),
      removable: palette.length > 1
    })), palette.length < 4 && /*#__PURE__*/React.createElement(AddSlot, {
      onAdd: addSlot
    })), /*#__PURE__*/React.createElement("div", {
      className: "relative h-10 rounded-xl overflow-hidden ring-1 ring-white/10 mb-5",
      style: {
        background: palette.length > 1 ? `linear-gradient(${draft.gradientAngle ?? 135}deg, ${palette.join(", ")})` : palette[0]
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]"
    }), /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-1.5 right-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/80",
      style: {
        textShadow: "0 1px 4px rgba(0,0,0,0.5)"
      }
    }, palette.length === 1 ? "Solid" : `Gradient Â· ${palette.length} stops`)), palette.length > 1 && /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4 mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.22em] text-slate-300"
    }, "Gradient angle"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-slate-100"
    }, draft.gradientAngle ?? 135, "\xB0")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 360,
      step: 1,
      value: draft.gradientAngle ?? 135,
      onChange: e => setDraft(d => ({
        ...d,
        gradientAngle: parseInt(e.target.value)
      })),
      className: "aether w-full",
      style: {
        "--pct": (draft.gradientAngle ?? 135) / 360 * 100 + "%"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-2"
    }, "Presets"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-2.5"
    }, PALETTE_PRESETS.map((p, i) => {
      const isSel = JSON.stringify(palette) === JSON.stringify(p.colors);
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: () => usePreset(p.colors),
        className: `relative text-left p-2.5 rounded-xl border transition-all
                                  ${isSel ? "border-white/30 bg-white/[0.06]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex gap-1 mb-1.5"
      }, p.colors.map((c, j) => /*#__PURE__*/React.createElement("span", {
        key: j,
        className: "flex-1 h-4 rounded-md ring-1 ring-white/10",
        style: {
          background: c,
          boxShadow: `0 0 8px ${c}55`
        }
      })), Array.from({
        length: 4 - p.colors.length
      }).map((_, j) => /*#__PURE__*/React.createElement("span", {
        key: `e${j}`,
        className: "flex-1 h-4 rounded-md bg-white/[0.04]"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.14em] text-slate-200"
      }, p.name), isSel && /*#__PURE__*/React.createElement(ICheck, {
        size: 11,
        className: "text-[var(--accent)]"
      })));
    }))), tab === "image" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "flex items-center gap-2.5 mb-4 cursor-pointer"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => setDraft(d => ({
        ...d,
        useImage: !d.useImage
      })),
      className: `w-5 h-5 rounded-md border grid place-items-center transition
                                  ${draft.useImage ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-white/15 bg-white/[0.02]"}`
    }, draft.useImage && /*#__PURE__*/React.createElement(ICheck, {
      size: 12,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] uppercase tracking-[0.16em] text-slate-200"
    }, "Use background image")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-3 mb-5"
    }, IMAGE_PRESETS.map(p => {
      const active = draft.image === p.url;
      return /*#__PURE__*/React.createElement("button", {
        key: p.name,
        onClick: () => setDraft(d => ({
          ...d,
          image: p.url,
          useImage: true
        })),
        className: `relative aspect-[4/3] rounded-2xl overflow-hidden transition-all
                                  ${active ? "ring-2 ring-white/80 scale-[1.02]" : "ring-1 ring-white/10 hover:scale-[1.02]"}`,
        style: {
          background: `url("${p.url}") center/cover`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "absolute bottom-2 left-2.5 text-[10.5px] font-display uppercase tracking-[0.18em] text-white/90",
        style: {
          textShadow: "0 1px 4px rgba(0,0,0,0.7)"
        }
      }, p.name), active && /*#__PURE__*/React.createElement("span", {
        className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-white/85 grid place-items-center"
      }, /*#__PURE__*/React.createElement(ICheck, {
        size: 11,
        className: "text-black",
        strokeWidth: 3
      })));
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-2"
    }, "Upload custom image"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => fileRef.current?.click(),
      className: "flex-1 h-11 rounded-lg border border-dashed border-white/15 bg-white/[0.025] hover:border-white/30 hover:bg-white/[0.05] text-slate-300 hover:text-white text-[12px] font-display uppercase tracking-[0.18em] transition-all"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center justify-center gap-2"
    }, /*#__PURE__*/React.createElement(IDownload, {
      size: 13
    }), " Choose image")), draft.image && /*#__PURE__*/React.createElement("button", {
      onClick: () => setDraft(d => ({
        ...d,
        image: null
      })),
      className: "w-11 h-11 rounded-lg border border-white/[0.08] bg-white/[0.025] hover:bg-rose-500/15 hover:border-rose-400/40 text-slate-400 hover:text-rose-300 transition-colors grid place-items-center",
      title: "Remove"
    }, /*#__PURE__*/React.createElement(ITrash, {
      size: 14
    })), /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: "image/*",
      className: "hidden",
      onChange: e => onImageFile(e.target.files?.[0])
    }))), draft.image && draft.useImage && /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500"
    }, "Opacity"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-slate-200"
    }, Math.round((draft.imageOpacity ?? 0.35) * 100), "%")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 5,
      max: 100,
      step: 1,
      value: Math.round((draft.imageOpacity ?? 0.35) * 100),
      onChange: e => setDraft(d => ({
        ...d,
        imageOpacity: parseInt(e.target.value) / 100
      })),
      className: "aether w-full",
      style: {
        "--pct": (draft.imageOpacity ?? 0.35) * 100 + "%"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "px-7 py-4 border-t border-white/[0.05] bg-black/20 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleReset,
      className: "flex items-center gap-1.5 px-3 h-9 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] text-[12px] font-display uppercase tracking-[0.18em] transition-colors"
    }, /*#__PURE__*/React.createElement(IRefresh, {
      size: 13
    }), " Reset"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleClose,
      className: "px-5 h-10 rounded-lg border border-white/[0.08] bg-white/[0.025] text-slate-300 hover:text-white hover:border-white/20 text-[12px] font-display uppercase tracking-[0.18em] transition-all"
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: handleApply,
      className: "px-6 h-10 rounded-lg font-display text-[12px] uppercase tracking-[0.18em] text-[var(--accent-fg)] transition-all hover:brightness-110",
      style: {
        background: `var(--accent-gradient, var(--accent))`,
        boxShadow: "0 10px 30px -8px var(--accent-glow)"
      }
    }, "Apply")))));
  };

  /* ===== Reusable multi-color picker (1-4 colors) for other settings ===== */
  const ColorPalettePicker = ({
    colors,
    onChange,
    max = 4,
    label
  }) => {
    const setSlot = (i, value) => {
      const p = [...colors];
      p[i] = value;
      onChange(p);
    };
    const add = () => {
      if (colors.length >= max) return;
      const seeds = ["#6fe8c0", "#f4b268", "#8ae0ff", "#c9e07a"];
      onChange([...colors, seeds[colors.length] || "#ffffff"]);
    };
    const remove = i => {
      if (colors.length <= 1) return;
      onChange(colors.filter((_, idx) => idx !== i));
    };
    return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2"
    }, colors.map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "relative w-12 h-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/10",
      style: {
        background: c,
        boxShadow: `0 0 12px ${c}55`
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "color",
      value: c,
      onChange: e => setSlot(i, e.target.value),
      className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    })), colors.length > 1 && /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(i),
      title: "Remove",
      className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 ring-1 ring-white/20 text-slate-300 hover:text-rose-300 grid place-items-center text-[9px]"
    }, "\u2715"))), colors.length < max && /*#__PURE__*/React.createElement("button", {
      onClick: add,
      className: "w-12 h-12 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-slate-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 14
    }))));
  };
  window.AetherTheme = {
    ThemePopup,
    useTheme,
    applyTheme,
    DEFAULT_THEME,
    ColorPalettePicker
  };
})();
</script>
<script data-mod="desktop">
(() => {
  /* ============================================================
     Desktop-widget shell for AetherHE.
     Exposes window.AetherDesktop = { WidgetFrame, Workspace, Dock, TopBar }.
     Plain JSX, uses global React (no libs). Vanilla pointer events for
     drag + resize. Geometry persists per (workspace,widget) in localStorage
     under key `aether-wgt:{workspace}:{id}`.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef,
    useCallback
  } = React;
  const I = window.AetherIcons || {};
  const IKeyboard = I.IKeyboard,
    IBulb = I.IBulb,
    IGauge = I.IGauge,
    ICrosshair = I.ICrosshair,
    IZap = I.IZap,
    ISettings = I.ISettings,
    IPlug = I.IPlug,
    IPower = I.IPower,
    ICheck = I.ICheck,
    IMore = I.IMore,
    ILayers = I.ILayers;
  const GRID = 8;
  const snap = v => Math.max(0, Math.round(v / GRID) * GRID);

  /* ============================================================
     Active-board name for the top-bar status chip (additive).
     The chip used to be the hardcoded string "WIN 68 HE MAX", which read wrong
     the moment Aether became multi-board. It now shows whichever board is
     actually selected.
  
     Resolved at module scope so the hook below is unconditional: if the
     board-context module isn't loaded (or nothing is selected) we fall back
     to a private context whose value is null, and the chip renders exactly
     the string it always did. The Win60 keeps its historical label verbatim
     via BOARD_CHIP_LABEL rather than a derived one, so its UI is unchanged.
     ============================================================ */
  const BOARD_CTX = window.AetherBoard && window.AetherBoard.BoardContext || React.createContext(null);
  const BOARD_CHIP_LABEL = {
    "aula-win60-he": "WIN 68 HE MAX"
  };
  const boardChipName = board => {
    if (!board) return "WIN 68 HE MAX"; // fail-open: today's string
    if (BOARD_CHIP_LABEL[board.slug]) return BOARD_CHIP_LABEL[board.slug];
    return String(board.name || "").replace(/^aula\s+/i, "") // vendor prefix is noise here
    .replace(/\s*\([^)]*\)\s*/g, " ") // drop "(wired)" / "(2.4GHz dongle)"
    .trim().toUpperCase() || "KEYBOARD";
  };

  /* ---- geometry persistence ---- */
  const geoKey = (workspace, id) => `aether-wgt:${workspace}:${id}`;
  const loadGeo = (workspace, id) => {
    try {
      const raw = localStorage.getItem(geoKey(workspace, id));
      if (!raw) return null;
      const g = JSON.parse(raw);
      if (!g || typeof g !== "object") return null;
      return g;
    } catch {
      return null;
    }
  };
  const saveGeo = (workspace, id, geo) => {
    try {
      localStorage.setItem(geoKey(workspace, id), JSON.stringify(geo));
    } catch {}
  };

  /* ============================================================
     WidgetFrame â€” a draggable + resizable window with an Impact title bar.
     Drag by the title bar, resize by the bottom-right handle, minimize button.
     ============================================================ */
  function WidgetFrame({
    id,
    workspace,
    title,
    defaultPos,
    defaultSize,
    minSize,
    onMinimize,
    z,
    onFocus,
    children
  }) {
    const min = minSize || {
      w: 220,
      h: 140
    };
    const init = loadGeo(workspace, id);
    const [pos, setPos] = useState(() => init && init.pos || defaultPos || {
      x: 40,
      y: 40
    });
    const [size, setSize] = useState(() => init && init.size || defaultSize || {
      w: 360,
      h: 300
    });
    const [minimized, setMinimized] = useState(() => !!(init && init.minimized));
    const [drag, setDrag] = useState(false);
    const [resizing, setResizing] = useState(false);
    const gesture = useRef(null);

    // Persist geometry whenever it settles.
    useEffect(() => {
      saveGeo(workspace, id, {
        pos,
        size,
        minimized
      });
    }, [workspace, id, pos, size, minimized]);

    // Report minimized transitions up so the Workspace can drive the dock.
    useEffect(() => {
      if (onMinimize) onMinimize(id, minimized);
    }, [minimized]);
    const onTitleDown = useCallback(e => {
      if (e.target.closest("button, input, textarea, select, a")) return;
      gesture.current = {
        kind: "drag",
        px: e.clientX,
        py: e.clientY,
        x: pos.x,
        y: pos.y
      };
      setDrag(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }, [pos.x, pos.y]);
    const onResizeDown = useCallback(e => {
      e.stopPropagation();
      gesture.current = {
        kind: "resize",
        px: e.clientX,
        py: e.clientY,
        w: size.w,
        h: size.h
      };
      setResizing(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }, [size.w, size.h]);
    const onMove = useCallback(e => {
      const g = gesture.current;
      if (!g) return;
      if (g.kind === "drag") {
        setPos({
          x: snap(g.x + (e.clientX - g.px)),
          y: snap(g.y + (e.clientY - g.py))
        });
      } else if (g.kind === "resize") {
        setSize({
          w: Math.max(min.w, snap(g.w + (e.clientX - g.px))),
          h: Math.max(min.h, snap(g.h + (e.clientY - g.py)))
        });
      }
    }, [min.w, min.h]);
    const endGesture = useCallback(() => {
      gesture.current = null;
      setDrag(false);
      setResizing(false);
    }, []);
    if (minimized) return null;
    return /*#__PURE__*/React.createElement("section", {
      className: `widget glass${drag ? " dragging" : ""}${resizing ? " resizing" : ""}`,
      style: {
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex: z || 1
      },
      onPointerDownCapture: () => onFocus && onFocus(id)
    }, /*#__PURE__*/React.createElement("header", {
      className: "widget-head",
      onPointerDown: onTitleDown,
      onPointerMove: onMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture
    }, /*#__PURE__*/React.createElement("span", {
      className: "widget-dot",
      "aria-hidden": true
    }), /*#__PURE__*/React.createElement("span", {
      className: "widget-title font-title"
    }, title), /*#__PURE__*/React.createElement("button", {
      className: "widget-min",
      title: "Minimize",
      "aria-label": `Minimize ${title}`,
      onClick: e => {
        e.stopPropagation();
        setMinimized(true);
      }
    }, "\u2013")), /*#__PURE__*/React.createElement("div", {
      className: "widget-body"
    }, children), /*#__PURE__*/React.createElement("div", {
      className: "widget-resize",
      title: "Resize",
      onPointerDown: onResizeDown,
      onPointerMove: onMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture
    }));
  }

  /* ============================================================
     Dock â€” bottom-center pill of minimized-widget buttons.
     ============================================================ */
  function Dock({
    items,
    onRestore
  }) {
    if (!items || !items.length) return null;
    return /*#__PURE__*/React.createElement("nav", {
      className: "dock glass"
    }, items.map(w => /*#__PURE__*/React.createElement("button", {
      key: w.id,
      className: "font-title",
      title: `Restore ${w.title}`,
      onClick: () => onRestore(w.id)
    }, w.title)));
  }

  /* ============================================================
     Workspace â€” absolute-positioned desktop surface. Renders each widget in a
     WidgetFrame, plus a per-workspace Dock of minimized widgets to restore.
     widgets = [{ id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }]
     ============================================================ */
  function Workspace({
    section,
    widgets,
    ctx
  }) {
    const list = widgets || [];
    // Track which widgets are minimized (seeded from persisted geometry).
    const [minimized, setMinimized] = useState(() => {
      const s = {};
      list.forEach(w => {
        const g = loadGeo(section, w.id);
        if (g && g.minimized) s[w.id] = true;
      });
      return s;
    });
    // Reset when the workspace (section) changes.
    useEffect(() => {
      const s = {};
      list.forEach(w => {
        const g = loadGeo(section, w.id);
        if (g && g.minimized) s[w.id] = true;
      });
      setMinimized(s);
    }, [section]);
    const handleMinimize = useCallback((id, isMin) => {
      setMinimized(prev => prev[id] === isMin ? prev : {
        ...prev,
        [id]: isMin
      });
    }, []);
    const restore = useCallback(id => {
      // Flip persisted geometry and force a remount of that frame.
      const g = loadGeo(section, id) || {};
      saveGeo(section, id, {
        ...g,
        minimized: false
      });
      setMinimized(prev => ({
        ...prev,
        [id]: false
      }));
      setNonce(n => n + 1);
    }, [section]);
    const [nonce, setNonce] = useState(0);

    // Stacking order: clicking a widget raises it above the others and it stays
    // there until another is clicked. Seeded so array order is the initial stack.
    const zTop = useRef(10 + list.length);
    const [zmap, setZmap] = useState(() => {
      const m = {};
      list.forEach((w, i) => {
        m[w.id] = 10 + i;
      });
      return m;
    });
    useEffect(() => {
      const m = {};
      list.forEach((w, i) => {
        m[w.id] = 10 + i;
      });
      zTop.current = 10 + list.length;
      setZmap(m);
    }, [section]);
    const raise = useCallback(id => {
      setZmap(prev => prev[id] === zTop.current ? prev : {
        ...prev,
        [id]: ++zTop.current
      });
    }, []);
    const dockItems = list.filter(w => minimized[w.id]);
    return /*#__PURE__*/React.createElement("div", {
      className: "workspace",
      "data-section": section
    }, list.map(w => /*#__PURE__*/React.createElement(WidgetFrame, {
      key: `${section}:${w.id}:${nonce}`,
      id: w.id,
      workspace: section,
      title: w.title,
      defaultPos: {
        x: w.default.x,
        y: w.default.y
      },
      defaultSize: {
        w: w.default.w,
        h: w.default.h
      },
      minSize: w.min,
      onMinimize: handleMinimize,
      z: zmap[w.id],
      onFocus: raise
    }, React.createElement(w.render, ctx))), /*#__PURE__*/React.createElement(Dock, {
      items: dockItems,
      onRestore: restore
    }));
  }

  /* ============================================================
     TopBar â€” horizontal section tabs (Impact) + brand + connect cluster.
     Sections: keymap, macros, lighting, actuation, socd, gamepad, settings.
     (app.jsx filters this list per board â€” "macros" is capability-gated.)
     ============================================================ */
  const SECTION_DEFS = [{
    id: "keymap",
    label: "Keymap",
    icon: IKeyboard
  }, {
    id: "macros",
    label: "Macros",
    icon: ILayers
  }, {
    id: "lighting",
    label: "Lighting",
    icon: IBulb
  }, {
    id: "actuation",
    label: "Actuation",
    icon: IGauge
  }, {
    id: "socd",
    label: "SOCD",
    icon: ICrosshair
  }, {
    id: "gamepad",
    label: "Gamepad",
    icon: IZap
  }, {
    id: "settings",
    label: "Settings",
    icon: ISettings
  }];
  function TopBar({
    sections,
    active,
    onSelect,
    connected,
    connecting,
    onTogglePair,
    autoConnect,
    setAutoConnect,
    onOpenSettings,
    zoom,
    setZoom
  }) {
    const defs = sections || SECTION_DEFS;
    const bctx = React.useContext(BOARD_CTX);
    const chipName = boardChipName(bctx && bctx.board);
    return /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "topbar-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "topbar-brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: window.__resources && window.__resources.logo || "assets/logo.png",
      alt: "",
      className: "topbar-logo"
    }), /*#__PURE__*/React.createElement("span", {
      className: "topbar-name font-title"
    }, "AETHER")), /*#__PURE__*/React.createElement("nav", {
      className: "topbar-tabs"
    }, defs.map(s => {
      const Icon = s.icon;
      const on = active === s.id;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => onSelect(s.id),
        className: `topbar-tab font-title${on ? " on" : ""}`
      }, Icon && /*#__PURE__*/React.createElement(Icon, {
        size: 14
      }), /*#__PURE__*/React.createElement("span", null, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      className: "topbar-right"
    }, /*#__PURE__*/React.createElement("div", {
      className: `topbar-status${connected ? " linked" : ""}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "topbar-dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      title: bctx && bctx.board && bctx.board.vidPid || ""
    }, chipName), /*#__PURE__*/React.createElement("span", {
      className: "topbar-state"
    }, connected ? "Linked" : "Offline")), /*#__PURE__*/React.createElement("label", {
      className: "topbar-auto",
      title: "Connect automatically on launch"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => setAutoConnect(!autoConnect),
      className: `topbar-check${autoConnect ? " on" : ""}`
    }, autoConnect && ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 9
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-title"
    }, "Auto")), /*#__PURE__*/React.createElement("button", {
      onClick: onTogglePair,
      disabled: connecting,
      className: `topbar-pair${connected ? " on" : ""}`
    }, connected ? IPower && /*#__PURE__*/React.createElement(IPower, {
      size: 13
    }) : IPlug && /*#__PURE__*/React.createElement(IPlug, {
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title"
    }, connecting ? "â€¦" : connected ? "Connected" : "Pair")), setZoom && /*#__PURE__*/React.createElement("div", {
      className: "topbar-zoom",
      title: "Zoom the workspace"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2))),
      "aria-label": "Zoom out"
    }, "\u2013"), /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      onClick: () => setZoom(1),
      title: "Reset zoom"
    }, Math.round((zoom || 1) * 100), "%"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2))),
      "aria-label": "Zoom in"
    }, "+")), /*#__PURE__*/React.createElement("button", {
      title: "Settings",
      onClick: onOpenSettings,
      className: "topbar-gear"
    }, ISettings && /*#__PURE__*/React.createElement(ISettings, {
      size: 14
    })))));
  }
  window.AetherDesktop = {
    WidgetFrame,
    Workspace,
    Dock,
    TopBar,
    SECTION_DEFS
  };
})();
</script>
<script data-mod="ws_actuation">
(() => {
  /* ============================================================
     Actuation workspace â€” the REFERENCE workspace for the desktop-widget shell.
     Exports window.AetherWorkspaces.ACTUATION_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     Control JSX + telemetry (SwitchRender depth math, live depth) reused verbatim
     from the old ActuationSection via window.AetherSections shared primitives.
     ============================================================ */
  const {
    useState
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SwitchRender = S.SwitchRender;
  const I = window.AetherIcons || {};
  const ICheck = I.ICheck,
    ICrosshair = I.ICrosshair;

  /* Shared apply-button class + confirm toast (from ActuationSection). */
  const applyBtnCls = enabled => `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all ${enabled ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed"}`;
  const useFlash = () => {
    const [confirm, setConfirm] = useState(null);
    const flash = msg => {
      setConfirm(msg);
      setTimeout(() => setConfirm(null), 2400);
    };
    return [confirm, flash];
  };
  const ConfirmToast = ({
    confirm
  }) => confirm ? /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
  }, "\u2713 ", confirm) : null;

  /* ============================================================
     Board-awareness helpers (additive â€” PER_BOARD_PARITY_PLAN step 6).
     ctx.board is the board-context value from components/board-context.jsx
     (locked contract). Everything falls back to today's hardcoded values when
     the board declares nothing, so the Win60 (and any unknown board) renders
     exactly as before.
     ============================================================ */
  const boardCtxOf = ctx => ctx && ctx.board || window.AetherBoard && window.AetherBoard.UNKNOWN_BOARD || {
    board: null,
    lighting: null,
    actuation: null,
    cap: () => undefined,
    capState: () => "unknown",
    isSupported: () => true
  };

  /* [min, max] from a registry range with a hardcoded fallback (today's values). */
  const rangeOr = (r, fallback) => Array.isArray(r) && r.length === 2 && isFinite(r[0]) && isFinite(r[1]) ? r : fallback;

  /* ===== Travel widget (actuation point + rapid trigger + live switch render) ===== */
  function TravelWidget(ctx) {
    const {
      actuation,
      setActuation,
      rtPress,
      setRtPress,
      rtRelease,
      setRtRelease,
      rtEnabled,
      setRtEnabled,
      travelTest,
      setTravelTest,
      liveMax = 0,
      selectedKeys,
      applyActuation
    } = ctx;
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    React.useEffect(() => {
      if (!selectedKeys || selectedKeys.size === 0 || !ctx.perKeyActuation) return;
      const code = Array.from(selectedKeys)[selectedKeys.size - 1];
      const ov = ctx.perKeyActuation[code];
      if (ov && typeof ov === "object") {
        const tMode = Number(ov.touchMode) || 0;
        const actVal = Number(ov.actuation) || (tMode === 0 ? 2.00 : 1.50);
        ctx.setActuation(actVal);
        if (tMode === 2) {
          ctx.setRtEnabled(true);
          ctx.setRtPress(Number(ov.rtPress) || 0.05);
          ctx.setRtRelease(Number(ov.rtRelease) || 0.05);
        } else {
          ctx.setRtEnabled(false);
        }
      } else if (typeof ov === "number") {
        ctx.setActuation(ov);
        ctx.setRtEnabled(false);
      } else {
        ctx.setActuation(2.00);
        ctx.setRtEnabled(false);
      }
    }, [selectedKeys, ctx.perKeyActuation]);
    const scope = selectedCount > 0 ? `${selectedCount} selected key${selectedCount > 1 ? "s" : ""}` : "no keys (select some)";
    const canApply = selectedCount > 0;
    const [confirm, flash] = useFlash();

    /* Board awareness (additive): ranges from the registry actuation block when
       present (the Win60's block equals today's hardcoded values), rapid-trigger
       gated on the capability flag ("wip" = source-only = unavailable; unknown =
       fail-open = render as today). */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    const [travelMin, travelMax] = rangeOr(bact && bact.travelRange, [0.1, 3.4]);
    const [rtMin, rtMax] = rangeOr(bact && bact.rtRange, [0.05, 2.0]);
    const rtState = bctx.capState ? bctx.capState("rapidTrigger") : "unknown";
    const rtAvailable = rtState === "yes" || rtState === "unknown";
    const handleApplyTravel = () => {
      if (!canApply || !applyActuation) return;
      applyActuation();
      const rt = rtEnabled && rtAvailable ? ` Â· RT press ${rtPress.toFixed(2)}mm / release ${rtRelease.toFixed(2)}mm` : "";
      flash(`Wrote ${actuation.toFixed(2)}mm to ${selectedCount} key${selectedCount === 1 ? "" : "s"}${rt}`);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Travel Test"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTravelTest(!travelTest),
      className: `relative w-10 h-5 rounded-full border transition-colors
                        ${travelTest ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${travelTest ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement(SwitchRender, {
      depth: travelTest ? liveMax : 0,
      actuation: actuation
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Applying to"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, scope)), /*#__PURE__*/React.createElement("div", {
      className: "mb-5"
    }, /*#__PURE__*/React.createElement(() => {
      const [gTravel, setGTravel] = React.useState(() => Number(window.__globalTravelMm) || 2.00);
      // Sync initial global travel from an unconfigured key (touchMode === 0) when perKeyActuation loads
      React.useEffect(() => {
        if (!ctx.perKeyActuation) return;
        for (const v of Object.values(ctx.perKeyActuation)) {
          if (v && typeof v === "object" && v.touchMode === 0 && v.actuation) {
            const val = Number(v.actuation);
            window.__globalTravelMm = val;
            setGTravel(val);
            break;
          }
        }
      }, [ctx.perKeyActuation]);
      const applyGlobal = async (val) => {
        const clamped = Math.max(0.10, Math.min(3.40, Math.round(Number(val) * 100) / 100));
        window.__globalTravelMm = clamped;
        setGTravel(clamped);
        if (!ctx.connected) return;
        const allC = (window.AetherKeyboard && window.AetherKeyboard.KB_ROWS || []).flat().map(k => k[2]);
        await ctx.apiCall("set_trigger_codes", allC, clamped, 0, 0, 98);
        if (ctx.refreshPerKeyActuation) ctx.refreshPerKeyActuation();
        flash(`Global Travel set to ${clamped.toFixed(2)}mm (all non-custom keys)`);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "rounded-xl border border-[var(--line)] bg-white/[0.015] p-3.5 space-y-2.5 mb-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)] font-semibold"
      }, "Global Travel"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => applyGlobal(gTravel),
        className: "px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition"
      }, "Apply Global")), /*#__PURE__*/React.createElement("p", {
        className: "text-[11px] text-[var(--text-faint)] leading-relaxed"
      }, "Sets the default trigger travel for all unconfigured keys (not displayed on keycaps)."), /*#__PURE__*/React.createElement(Slider, {
        label: "Global Trigger Travel",
        value: gTravel,
        min: travelMin,
        max: travelMax,
        step: 0.01,
        unit: "mm",
        onChange: v => setGTravel(Math.round(v * 100) / 100)
      }));
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Key Trigger Travel",
      value: actuation,
      min: travelMin,
      max: travelMax,
      step: 0.01,
      unit: "mm",
      onChange: setActuation
    })), rtAvailable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
      className: "flex items-center gap-2 cursor-pointer select-none mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-4 h-4 rounded border grid place-items-center transition
                                ${rtEnabled ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`,
      onClick: () => setRtEnabled(!rtEnabled)
    }, rtEnabled && ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 10,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: rtEnabled,
      onChange: e => setRtEnabled(e.target.checked),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, "Rapid Trigger"), Chip && /*#__PURE__*/React.createElement(Chip, {
      color: "accent"
    }, "RT")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4"
    }, "Rapid Trigger dynamically actuates and resets your key based on your intent \u2014 perfect for counter-strafing and rebound presses."), rtEnabled && /*#__PURE__*/React.createElement("div", {
      className: "mt-4 p-4 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] space-y-4"
    }, /*#__PURE__*/React.createElement(() => {
      const [cont, setCont] = React.useState(() => !!window.__rtContinuous);
      const choose = (val) => {
        window.__rtContinuous = !!val;
        setCont(!!val);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-2 pb-3 border-b border-[var(--line)]"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between gap-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.15em] text-[var(--text)]"
      }, "Rapid Trigger Mode"), /*#__PURE__*/React.createElement("div", {
        className: "inline-flex rounded-md border border-[var(--line)] bg-black/30 p-0.5 gap-1"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(false),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${!cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Basic RT"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(true),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Continuous RT"))), /*#__PURE__*/React.createElement("span", {
        className: "text-[11px] text-[var(--text-faint)]"
      }, cont ? "Continuous RT: Active across full keystroke (0.10mm-3.40mm) until key is completely released." : "Basic RT: Activates at your actuation point and immediately resets as soon as the key rises above it."));
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Press Sensitivity",
      value: rtPress,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtPress
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Release Sensitivity",
      value: rtRelease,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtRelease
    })))) :
    /*#__PURE__*/
    /* Unavailable â€” same info-box idiom as Dead Band / Switch / Calibration
       (and the pre-existing Polling readout): bordered ink card, mono body. */
    React.createElement("div", {
      className: "mb-4 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text-dim)]"
    }, "Rapid Trigger"), Chip && /*#__PURE__*/React.createElement(Chip, {
      color: "accent"
    }, "RT")), /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, rtState === "wip" ? `Rapid trigger is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support rapid trigger.`)), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyTravel,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s"), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, {
      confirm: confirm
    }) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, canApply ? "writes only the selected keys" : "select keys on the board to enable"))));
  }

  /* ===== Dead Band widget ===== */
  function DeadBandWidget(ctx) {
    const {
      deadTop,
      setDeadTop,
      deadBottom,
      setDeadBottom,
      selectedKeys,
      applyDeadband
    } = ctx;
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    const [confirm, flash] = useFlash();

    /* Board awareness (additive). deadzoneScope "global" means the dead zones
       live in ONE whole-board config table â€” a per-key control CANNOT work on
       that hardware, so the widget becomes a single board-wide control. The
       Win60 declares "per-key" (and unknown boards declare nothing), so both
       take the original per-key path unchanged. */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    const globalScope = !!(bact && bact.deadzoneScope === "global");
    const [dzMin, dzMax] = rangeOr(bact && bact.deadzoneRange, [0.0, 0.5]);
    const dzState = bctx.capState ? bctx.capState("deadzone") : "unknown";
    const canApply = globalScope ? true : selectedCount > 0;
    const handleApplyDead = () => {
      if (!canApply || !applyDeadband) return;
      applyDeadband();
      flash(`Wrote dead band ${(deadTop ?? 0.04).toFixed(2)}/${(deadBottom ?? 0.05).toFixed(2)}mm to ${globalScope ? "the whole board" : `${selectedCount} key${selectedCount === 1 ? "" : "s"}`}`);
    };

    /* Capability gate: "wip" = decoded from vendor source only, never proven on
       hardware â€” do not drive it. The Win60 flag is a hard true (and unknown
       boards fail open), so this branch never renders there. */
    if (dzState === "wip" || dzState === "no") {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-[12px] text-[var(--text-dim)] mb-4"
      }, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored."), /*#__PURE__*/React.createElement("div", {
        className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
      }, dzState === "wip" ? `Dead-band control is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support dead-band configuration.`));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, globalScope ? /*#__PURE__*/React.createElement(React.Fragment, null, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored. On ", boardName, " the dead zones are a ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "single board-wide setting"), ": per-key dead bands are not possible on this hardware, so these values apply to every key at once.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored. Press ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Apply"), " to write to the selected keys.")), globalScope && /*#__PURE__*/React.createElement("div", {
      className: "mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Scope"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "Whole board \xB7 every key")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-6"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Top Dead Band",
      value: deadTop ?? 0.04,
      min: dzMin,
      max: dzMax,
      step: 0.01,
      unit: "mm",
      onChange: setDeadTop
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Bottom Dead Band",
      value: deadBottom ?? 0.05,
      min: dzMin,
      max: dzMax,
      step: 0.01,
      unit: "mm",
      onChange: setDeadBottom
    })), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyDead,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, globalScope ? "Apply to whole board" : /*#__PURE__*/React.createElement(React.Fragment, null, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s")), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, {
      confirm: confirm
    }) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, globalScope ? "one pair of values for every key â€” key selection is ignored" : canApply ? "writes only the selected keys" : "select keys on the board to enable")));
  }

  /* ===== Switch widget ===== */
  const SWITCHES = [{
    id: "hm1",
    name: "HM1",
    sub: "Magnetic Switch",
    dot: "#3b82f6",
    maker: "Gateron",
    travel: "4.0 mm",
    force: "30 gf",
    range: "0.1 â€“ 4.0 mm",
    poles: "Single",
    life: "100 M"
  }, {
    id: "hh1",
    name: "HH1",
    sub: "Magnetic Switch",
    dot: "#a3a300",
    maker: "Gateron",
    travel: "3.5 mm",
    force: "40 gf",
    range: "0.1 â€“ 3.5 mm",
    poles: "Single",
    life: "100 M"
  }, {
    id: "cy1",
    name: "CY1",
    sub: "Magnetic Switch",
    dot: "#cbd5e1",
    maker: "KZZI",
    travel: "3.4 mm",
    force: "35 gf",
    range: "0.1 â€“ 3.4 mm",
    poles: "Single",
    life: "80 M"
  }, {
    id: "tc1",
    name: "TC1",
    sub: "TTC Kom",
    dot: "#c026d3",
    maker: "TTC",
    travel: "3.6 mm",
    force: "45 gf",
    range: "0.2 â€“ 3.6 mm",
    poles: "Dual",
    life: "100 M"
  }];
  function SwitchWidget(ctx) {
    const {
      switchId,
      handlePickSwitch
    } = ctx;

    /* Board awareness (additive): the switch/axis list comes from the registry
       actuation block when the board declares one. The Win60's registry list
       carries the same four ids as the hardcoded list below, and matching ids
       keep the hardcoded display fields verbatim â€” so the Win60 renders
       byte-identically. A board that declares an EMPTY list (axis ids never
       verified on hardware) gets an honest explanation instead of a picker.
       No board data at all -> today's hardcoded list (fail-open). */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    let switchList = SWITCHES;
    if (bact && Array.isArray(bact.switches)) {
      if (bact.switches.length === 0) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
          className: "text-[12px] text-[var(--text-dim)] mb-5"
        }, "Select the magnetic switch profile installed in your board. Calibration curves load automatically."), /*#__PURE__*/React.createElement("div", {
          className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
        }, "No verified switch list for ", boardName, " yet \u2014 this board selects its magnetic axis per key by an id that has never been read back from hardware. Aether will not guess axis ids, so the switch picker stays disabled."));
      }
      switchList = bact.switches.map(s => {
        const legacy = SWITCHES.find(x => x.id === s.id);
        return legacy ? {
          ...s,
          ...legacy
        } : s;
      });
    }
    const defaultId = switchList[0] && switchList[0].id || "hm1";
    const cur = switchList.find(s => s.id === (switchId || defaultId)) || switchList[0];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Select the magnetic switch profile installed in your board. Calibration curves load automatically."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-3 mb-5"
    }, switchList.map(s => {
      const active = (switchId || defaultId) === s.id;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => handlePickSwitch && handlePickSwitch(s.id),
        className: `text-left rounded-lg border p-3 transition-all
                        ${active ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-display text-[14px] text-[var(--text)]"
      }, s.name), /*#__PURE__*/React.createElement("span", {
        className: "w-2.5 h-2.5 rounded-full",
        style: {
          background: s.dot,
          boxShadow: `0 0 8px ${s.dot}`
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em] mt-0.5"
      }, s.sub));
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full",
      style: {
        background: cur.dot,
        boxShadow: `0 0 8px ${cur.dot}`
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)]"
    }, cur.name), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, cur.maker, " \xB7 ", cur.sub)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 font-mono text-[11px]"
    }, [["Total Travel", cur.travel || "â€”"], ["Actuation Range", cur.range || "â€”"], ["Initial Force", cur.force || "â€”"], ["Sensing", cur.poles ? cur.poles + " Hall" : "â€”"], ["Rated Life", cur.life ? cur.life + " presses" : "â€”"], ["Tech", "Magnetic / Analog"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] uppercase tracking-[0.14em] text-[9.5px]"
    }, k), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] mt-0.5"
    }, v))))));
  }

  /* ===== Polling Rate widget ===== */
  function PollingWidget(ctx) {
    const {
      polling,
      handleSetPolling
    } = ctx;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Switch the polling rate of the device. The keyboard will restart and disconnect briefly after switching."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-nowrap gap-2"
    }, [1, 2, 4, 8].map(p => /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: () => handleSetPolling(p),
      className: `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all
                        ${polling === p ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, p, "KHz"))), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "current"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, polling, "000 Hz"), " \xB7 ", (1 / polling).toFixed(2), "ms tick"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "latency"), " \xB7 ~", (0.5 + 1 / polling).toFixed(2), "ms end-to-end")));
  }

  /* ===== Calibration widget ===== */
  function CalibrationWidget(ctx) {
    const {
      calibrating,
      handleCalibrate
    } = ctx;

    /* Board awareness (additive): gate on the calibration capability. "wip"
       means the commands are only known from vendor driver source â€” never
       verified on hardware â€” and must not be driven. The Win60 flag is a hard
       true (and unknown boards fail open), so it renders exactly as today. */
    const bctx = boardCtxOf(ctx);
    const calState = bctx.capState ? bctx.capState("calibration") : "unknown";
    if (calState === "wip" || calState === "no") {
      const boardName = bctx.board && bctx.board.name || "this board";
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
      }, "Key Calibration"), /*#__PURE__*/React.createElement("div", {
        className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed max-w-2xl"
      }, calState === "wip" ? `Calibration is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support key calibration.`));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "Key Calibration"), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleCalibrate && handleCalibrate(!calibrating),
      className: "px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-5"
    }, calibrating ? "Stop Calibration" : "Start Calibration"), /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Calibration steps:"), /*#__PURE__*/React.createElement("ol", {
      className: "space-y-2 text-[12px] text-[var(--text-dim)] max-w-2xl"
    }, ["Click the Start Calibration button", "Press the required key (Hit bottom)", "Wait for the corresponding key to change color, and the key calibration is complete", "Click the Stop Calibration button"].map((step, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "shrink-0 grid place-items-center w-5 h-5 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px]"
    }, i + 1), /*#__PURE__*/React.createElement("span", null, step)))));
  }
    const ActuationBoardWidget = (ctx) => {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const allCodes = React.useMemo(() => (KB.KB_ROWS || []).flat().map(k => k[2]), []);
    const selectPreset = (codes) => ctx.setSelectedKeys(new Set(codes));
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full flex flex-col justify-between px-3 py-2 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-2 mb-1.5 px-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#4ade80]" }), "Actuation (mm)"),
       /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#38bdf8]" }), "RT Press"),
       /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#fb923c]" }), "RT Release")),
    /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset(["KeyW", "KeyA", "KeyS", "KeyD"]),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "WASD"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset(allCodes),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "Select All"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset([]),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "Uncheck"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: async () => {
        if (!ctx.connected) return;
        const allC = (KB.KB_ROWS || []).flat().map(k => k[2]);
        const targets = ctx.selectedKeys && ctx.selectedKeys.size > 0 ? Array.from(ctx.selectedKeys) : allC;
        const gMm = Number(window.__globalTravelMm) || 2.00;
        await ctx.apiCall("set_trigger_codes", targets, gMm, 0, 0, 99);
        if (ctx.refreshPerKeyActuation) await ctx.refreshPerKeyActuation();
        ctx.setRtEnabled(false);
        ctx.setActuation(gMm);
      },
      className: "px-2 py-1 rounded border border-rose-400/40 bg-rose-500/10 hover:bg-rose-500/20 text-[10px] font-mono uppercase tracking-[0.12em] text-rose-300 transition"
    }, "Reset Travel"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => ctx.refreshPerKeyActuation && ctx.refreshPerKeyActuation(),
      className: "px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition"
    }, "Sync Board"))), /*#__PURE__*/React.createElement("div", {
      className: "w-full flex-1 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(KeyboardPanel, {
      mode: "actuation",
      layer: ctx.layer || "default",
      selectedKeys: ctx.selectedKeys,
      setSelectedKeys: (updater) => {
        ctx.setSelectedKeys(prev => {
          const next = typeof updater === "function" ? updater(prev) : updater;
          if (next && next.size === 1) {
            const code = Array.from(next)[0];
            const ov = ctx.perKeyActuation && ctx.perKeyActuation[code];
            if (ov && typeof ov === "object" && (ov.touchMode === 1 || ov.touchMode === 2)) {
              ctx.setActuation(Number(ov.actuation) || 1.50);
              ctx.setRtEnabled(ov.touchMode === 2);
              if (ov.touchMode === 2) {
                ctx.setRtPress(Number(ov.rtPress) || 0.05);
                ctx.setRtRelease(Number(ov.rtRelease) || 0.05);
              } else {
                ctx.setRtPress(0.05);
                ctx.setRtRelease(0.05);
              }
            } else {
              // Unconfigured key (Global travel mode = 0): sync to its saved Global travel (e.g. 2.00mm)
              // and clear the previous key's Rapid Trigger state and sensitivities!
              const globalAct = (ov && typeof ov === "object" && ov.actuation) ? Number(ov.actuation) : 2.00;
              ctx.setActuation(globalAct);
              ctx.setRtEnabled(false);
              ctx.setRtPress(0.05);
              ctx.setRtRelease(0.05);
            }
          }
          return next;
        });
      },
      actuationPoint: ctx.actuation,
      rtPress: ctx.rtPress,
      rtRelease: ctx.rtRelease,
      perKeyOverride: ctx.perKeyActuation,
      liveDepths: ctx.liveDepths,
      showPill: false,
      compact: false
    })));
  };

  const ACTUATION_WIDGETS = [{
    id: "board",
    title: "Keyboard - Per-Key Actuation & RT",
    default: { x: 40, y: 24, w: 980, h: 340 },
    min: { w: 680, h: 280 },
    render: ActuationBoardWidget
  }, {

    id: "travel",
    title: "Travel",
    default: {
      x: 40,
      y: 384,
      w: 680,
      h: 430
    },
    min: {
      w: 420,
      h: 320
    },
    render: TravelWidget
  }, {
    id: "dead",
    title: "Dead Band",
    default: {
      x: 736,
      y: 32,
      w: 460,
      h: 300
    },
    min: {
      w: 320,
      h: 240
    },
    render: DeadBandWidget
  }, {
    id: "switch",
    title: "Switch",
    default: {
      x: 736,
      y: 352,
      w: 460,
      h: 430
    },
    min: {
      w: 340,
      h: 300
    },
    render: SwitchWidget
  }, {
    id: "poll",
    title: "Polling Rate",
    default: {
      x: 40,
      y: 488,
      w: 380,
      h: 300
    },
    min: {
      w: 300,
      h: 240
    },
    render: PollingWidget
  }, {
    id: "calib",
    title: "Calibration",
    default: {
      x: 440,
      y: 488,
      w: 456,
      h: 360
    },
    min: {
      w: 340,
      h: 280
    },
    render: CalibrationWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.ACTUATION_WIDGETS = ACTUATION_WIDGETS;
  // Pure board-awareness helpers exported for verification (no UI reads these).
  window.AetherWorkspaces.ACTUATION_BOARD = {
    SWITCHES,
    rangeOr,
    boardCtxOf
  };
})();
</script>
<script data-mod="ws_gamepad">
(() => {
  /* ============================================================
     Gamepad workspace â€” window.AetherWorkspaces.GAMEPAD_WIDGETS.
     Reuses GamepadSection JSX verbatim (split into 3 widgets) from
     ui/runtime_src/src/sections.jsx â€” no re-implementation of the
     virtual-pad capture / mapping UI, only layout is split.
     ============================================================ */
  const I = window.AetherIcons || {};
  const {
    IZap,
    IRefresh,
    IPlus,
    ITrash
  } = I;
  const PAD_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Space", "Enter", "L-Shift", "L-Ctrl", "Up", "Down", "Left", "Right"];
  const PAD_AXES = [{
    id: "LX",
    label: "Left Stick X",
    stick: true
  }, {
    id: "LY",
    label: "Left Stick Y",
    stick: true
  }, {
    id: "RX",
    label: "Right Stick X",
    stick: true
  }, {
    id: "RY",
    label: "Right Stick Y",
    stick: true
  }, {
    id: "LT",
    label: "Left Trigger",
    stick: false
  }, {
    id: "RT",
    label: "Right Trigger",
    stick: false
  }, {
    id: "BTN_A",
    label: "Button A",
    stick: false,
    btn: true
  }, {
    id: "BTN_B",
    label: "Button B",
    stick: false,
    btn: true
  }, {
    id: "BTN_X",
    label: "Button X",
    stick: false,
    btn: true
  }, {
    id: "BTN_Y",
    label: "Button Y",
    stick: false,
    btn: true
  }, {
    id: "BTN_LB",
    label: "Bumper L",
    stick: false,
    btn: true
  }, {
    id: "BTN_RB",
    label: "Bumper R",
    stick: false,
    btn: true
  }];
  const axisMeta = id => PAD_AXES.find(a => a.id === id) || PAD_AXES[0];

  /* ===== Enable / Status widget ===== */
  function EnableStatusWidget(ctx) {
    const {
      connected,
      gamepadOn,
      handleGamepadToggle,
      gamepadError,
      handleInstallVigem
    } = ctx;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[13px] uppercase tracking-[0.18em] text-[var(--text)] flex items-center gap-2"
    }, IZap && /*#__PURE__*/React.createElement(IZap, {
      size: 15
    }), " Virtual Gamepad"), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mt-1.5 max-w-xl"
    }, "Streams live key travel into a system gamepad \u2014 press a key deeper for more throttle / steering. Maps below drive the analog axes & buttons. ", !connected && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Connect the board to capture."))), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleGamepadToggle(!gamepadOn),
      disabled: !connected,
      className: `relative w-12 h-6 rounded-full border transition-colors shrink-0 ml-4
                      ${!connected ? "opacity-40 cursor-not-allowed" : ""}
                      ${gamepadOn ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all
                            ${gamepadOn ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
      style: {
        width: 18,
        height: 18
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 font-mono text-[11px]"
    }, gamepadOn ? /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400"
    }, "\u25CF Capturing \u2192 \"Aula Win60 HE Virtual Gamepad\"") : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "\u25CB Idle")), gamepadError && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[11.5px] text-rose-100 flex items-center justify-between gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, gamepadError.msg), gamepadError.needsDriver && /*#__PURE__*/React.createElement("button", {
      onClick: handleInstallVigem,
      className: "shrink-0 px-3 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, "Install ViGEmBus")));
  }

  /* ===== Axis Mapping widget ===== */
  function AxisMappingWidget(ctx) {
    const {
      gamepadMap,
      handleGamepadMapApply,
      DEFAULT_PAD_MAP
    } = ctx;
    const rows = gamepadMap || [];
    const setRow = (i, patch) => handleGamepadMapApply(rows.map((r, j) => j === i ? {
      ...r,
      ...patch
    } : r));
    const addRow = () => handleGamepadMapApply([...rows, {
      key: "W",
      axis: "RT",
      direction: 1,
      threshold_mm: 1.5
    }]);
    const removeRow = i => handleGamepadMapApply(rows.filter((_, j) => j !== i));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Key \u2192 Control Mapping"), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleGamepadMapApply((DEFAULT_PAD_MAP || []).map(r => ({
        ...r
      }))),
      className: "px-3 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center gap-1.5"
    }, IRefresh && /*#__PURE__*/React.createElement(IRefresh, {
      size: 12
    }), " Driving Defaults"), /*#__PURE__*/React.createElement("button", {
      onClick: addRow,
      className: "px-3 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 flex items-center gap-1.5"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 px-1 mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, "Key"), /*#__PURE__*/React.createElement("span", null, "Control"), /*#__PURE__*/React.createElement("span", null, "Behaviour"), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, rows.map((r, i) => {
      const meta = axisMeta(r.axis);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 items-center"
      }, /*#__PURE__*/React.createElement("select", {
        value: r.key,
        onChange: e => setRow(i, {
          key: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_KEYS.map(k => /*#__PURE__*/React.createElement("option", {
        key: k,
        value: k
      }, k))), /*#__PURE__*/React.createElement("select", {
        value: r.axis,
        onChange: e => setRow(i, {
          axis: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_AXES.map(a => /*#__PURE__*/React.createElement("option", {
        key: a.id,
        value: a.id
      }, a.label))), meta.stick ? /*#__PURE__*/React.createElement("div", {
        className: "flex gap-1"
      }, [["âˆ’", -1], ["+", 1]].map(([lbl, val]) => /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setRow(i, {
          direction: val
        }),
        className: `flex-1 h-9 rounded-md border font-mono text-[13px] transition-all
                                  ${(r.direction || 1) === val ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, lbl))) : meta.btn ? /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "range",
        className: "aether flex-1",
        min: 0.2,
        max: 3.4,
        step: 0.1,
        value: r.threshold_mm ?? 1.5,
        style: {
          "--pct": ((r.threshold_mm ?? 1.5) - 0.2) / 3.2 * 100 + "%"
        },
        onChange: e => setRow(i, {
          threshold_mm: parseFloat(e.target.value)
        })
      }), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-dim)] w-12 text-right"
      }, (r.threshold_mm ?? 1.5).toFixed(1), "mm")) : /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-faint)] pl-1"
      }, "analog 0\u2192max"), /*#__PURE__*/React.createElement("button", {
        onClick: () => removeRow(i),
        className: "w-7 h-7 grid place-items-center rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] hover:text-rose-300 hover:border-rose-400/30"
      }, ITrash && /*#__PURE__*/React.createElement(ITrash, {
        size: 12
      })));
    }), !rows.length && /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-[var(--text-faint)] py-4 text-center"
    }, "No mappings \u2014 add one or load driving defaults.")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] text-[var(--text-faint)] mt-4 leading-relaxed"
    }, "Sticks combine opposing keys (e.g. A=\u2212 and D=+ on Left Stick X). Triggers & sticks are analog \u2014 deeper press = larger value. Buttons fire past their threshold. Changes apply live while capturing."));
  }

  /* ===== Driver Install widget (ViGEmBus) ===== */
  function DriverInstallWidget(ctx) {
    const {
      handleInstallVigem,
      gamepadError
    } = ctx;
    const needsDriver = !!(gamepadError && gamepadError.needsDriver);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "Driver"), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5 leading-relaxed"
    }, "The virtual gamepad is emulated through ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "ViGEmBus"), " \u2014 a kernel driver that exposes an Xbox 360-compatible controller to Windows. Install it once; no reboot is normally required."), /*#__PURE__*/React.createElement("button", {
      onClick: handleInstallVigem,
      className: "px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-4"
    }, "Install ViGEmBus"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px]"
    }, needsDriver ? /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Driver missing \u2014 install required before capture will work.") : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "No driver issue detected.")));
  }
  const GAMEPAD_WIDGETS = [{
    id: "enable",
    title: "Enable / Status",
    default: {
      x: 40,
      y: 32,
      w: 620,
      h: 300
    },
    min: {
      w: 380,
      h: 220
    },
    render: EnableStatusWidget
  }, {
    id: "axes",
    title: "Axis Mapping",
    default: {
      x: 680,
      y: 32,
      w: 640,
      h: 520
    },
    min: {
      w: 460,
      h: 340
    },
    render: AxisMappingWidget
  }, {
    id: "driver",
    title: "Driver Install",
    default: {
      x: 40,
      y: 352,
      w: 500,
      h: 300
    },
    min: {
      w: 340,
      h: 240
    },
    render: DriverInstallWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.GAMEPAD_WIDGETS = GAMEPAD_WIDGETS;
})();
</script>
<script data-mod="ws_keymap">
(() => {
  /* ============================================================
     Keymap workspace â€” mirrors the Actuation reference workspace shape.
     Exports window.AetherWorkspaces.KEYMAP_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     Reuses KeyGrid JSX from sections.jsx's KeymapSection (basic/extended key picker)
     and the existing keyboard.jsx KeyboardPanel for the selectable board â€” its
     per-key device-color/actuation styling stays byte-identical, untouched here.
     ============================================================ */
  const {
    useState
  } = React;
  const S = window.AetherSections || {};
  const {
    Chip,
    ToolbarButton,
    LayerPicker
  } = S;
  const KB = window.AetherKeyboard || {};
  const KeyboardPanel = KB.KeyboardPanel;

  /* ===== Key label sets (verbatim from sections.jsx KeymapSection) ===== */
  const BASIC_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1!", "2@", "3#", "$4", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+", "{[", "}]", "\\|", "<>", ";:", "'\"", "`~", ",<", ".>", "/?"];
  const EXTENDED_KEYS = ["Esc", "Tab", "Caps", "Back", "Enter", "Space", "L-Ctrl", "R-Ctrl", "L-Shift", "R-Shift", "L-Alt", "R-Alt", "L-Win", "R-Win", "Menu", "Left", "Up", "Right", "Down", "PrtSc", "ScrLk", "Pause", "Ins", "Home", "Del", "End", "PgUp", "PgDn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];

  /* KeyGrid â€” collapsible label picker (verbatim JSX from sections.jsx). */
  const KeyGrid = ({
    title,
    keys,
    picked,
    onPick
  }) => {
    const [open, setOpen] = useState(true);
    const I = window.AetherIcons || {};
    const IChevronD = I.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-2 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em]"
    }, title)), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5"
    }, keys.map(k => {
      const active = picked === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => onPick(k),
        className: `h-9 rounded-md border font-mono text-[11px] transition-all
                            ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
      }, k);
    })));
  };

  /* ===== Key Grid widget â€” the selectable keyboard board ===== */
  function KeyGridWidget(ctx) {
    const {
      selectedKeys,
      setSelectedKeys,
      layer,
      ledMap,
      calibrating,
      calibratedKeys,
      liveDepths
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, KeyboardPanel ? React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: layer || "default",
      selectedKeys,
      setSelectedKeys,
      ledMap,
      showPill: false,
      compact: true,
      calibrating: !!calibrating,
      calibratedCodes: calibratedKeys,
      liveDepths
    }) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Keyboard render unavailable."));
  }

  /* ===== Remap Editor widget â€” assign HID to selected keys ===== */
  function RemapEditorWidget(ctx) {
    const {
      selectedKeys,
      selectedKey,
      HID_BY_LABEL,
      remapSelected,
      resetRemapSelected
    } = ctx;
    const [picked, setPicked] = useState(null);
    const [flash, setFlash] = useState(null);
    const showFlash = kind => {
      setFlash(kind);
      setTimeout(() => setFlash(null), 1400);
    };
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    const curLabel = selectedKey || (selectedCount ? `${selectedCount} keys` : "None");
    const doApply = () => {
      if (!picked || !selectedCount || !remapSelected) return;
      remapSelected(picked);
      showFlash("applied");
    };
    const doReset = () => {
      if (resetRemapSelected) resetRemapSelected();
      setPicked(null);
      showFlash("reset");
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ol", {
      className: "text-[12px] text-[var(--text-dim)] leading-relaxed space-y-2 mb-4 font-mono"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "01."), " Click a key on the Key Grid widget."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "02."), " Pick the new mapping below."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "03."), " Hit ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "Apply"), " to flash.")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center px-3 min-w-[64px] rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[11px] text-[var(--text-dim)]"
    }, curLabel), /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center text-[var(--text-faint)]"
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-md border border-[var(--line)] bg-white/[0.02] px-3 grid place-items-start py-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)]"
    }, picked || "â€”"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "remap target"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2 mb-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: doReset,
      className: "flex-1 h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.18em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }, "Default"), /*#__PURE__*/React.createElement("button", {
      disabled: !picked || !selectedCount,
      onClick: doApply,
      className: `flex-1 h-9 rounded-md border font-display text-[11px] uppercase tracking-[0.18em] transition-all
                      ${!picked || !selectedCount ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_12px_var(--accent-glow)]"}`
    }, "Apply")), /*#__PURE__*/React.createElement("div", {
      className: "h-5 mb-3 text-[11px] font-mono tracking-[0.14em]"
    }, !selectedCount && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Select a key on the Key Grid first."), flash === "applied" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "\u2713 Remapped ", selectedCount, " key", selectedCount > 1 ? "s" : "", " \u2192 ", picked), flash === "reset" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)]"
    }, "\u21A9 Restored default mapping")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: picked,
      onPick: setPicked
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: picked,
      onPick: setPicked
    })));
  }

  /* ===== Layer Picker widget ===== */
  function LayerPickerWidget(ctx) {
    const {
      layer,
      setLayer,
      selectAllKeys,
      selectInvertKeys,
      deselectAllKeys
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Active Layer"), LayerPicker ? /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row lg:flex-col gap-2"
    }, React.createElement(LayerPicker, {
      layer,
      setLayer
    })) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Layer picker unavailable.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Selection"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5"
    }, ToolbarButton ? [{
      label: "Select All",
      onClick: selectAllKeys
    }, {
      label: "Select Invert",
      onClick: selectInvertKeys
    }, {
      label: "Deselect All",
      onClick: deselectAllKeys
    }].map(b => /*#__PURE__*/React.createElement("div", {
      key: b.label
    }, React.createElement(ToolbarButton, {
      onClick: b.onClick
    }, b.label))) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Toolbar unavailable."))), Chip && /*#__PURE__*/React.createElement("div", null, React.createElement(Chip, {
      color: "accent"
    }, layer === "fn" ? "Fn Layer" : "Default Layer")));
  }
  const KEYMAP_WIDGETS = [{
    id: "keygrid",
    title: "Key Grid",
    default: {
      x: 40,
      y: 32,
      w: 760,
      h: 460
    },
    min: {
      w: 520,
      h: 360
    },
    render: KeyGridWidget
  }, {
    id: "remap",
    title: "Remap Editor",
    default: {
      x: 820,
      y: 32,
      w: 460,
      h: 460
    },
    min: {
      w: 340,
      h: 340
    },
    render: RemapEditorWidget
  }, {
    id: "layer",
    title: "Layer Picker",
    default: {
      x: 40,
      y: 516,
      w: 320,
      h: 300
    },
    min: {
      w: 260,
      h: 240
    },
    render: LayerPickerWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.KEYMAP_WIDGETS = KEYMAP_WIDGETS;
})();
</script>
<script data-mod="ws_lighting">
(() => {
  /* ============================================================
     Lighting workspace â€” window.AetherWorkspaces.LIGHTING_WIDGETS.
     Control JSX ported verbatim from the old LightingSection (sections.jsx)
     and split across four widget bodies. Color values (hex swatches, style=
     {{background:c}}, PatternPreview) are byte-identical â€” these are real
     device RGB values, never re-tokenized.
     ============================================================ */
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SubTabs = S.SubTabs,
    ToolbarButton = S.ToolbarButton;
  const I = window.AetherIcons || {};
  const IPlus = I.IPlus;

  /* ===== shared static data (verbatim from sections.jsx) ===== */
  const LIGHT_MODES = [{
    id: "wave",
    label: "Wave",
    icon: "ã€°"
  }, {
    id: "neon",
    label: "Neon",
    icon: "â—Ž"
  }, {
    id: "radar",
    label: "Radar",
    icon: "â—’"
  }, {
    id: "cross",
    label: "Cross",
    icon: "âœš"
  }, {
    id: "breath",
    label: "Breath",
    icon: "â—‹"
  }, {
    id: "static",
    label: "Static",
    icon: "â– "
  }, {
    id: "aurora",
    label: "Aurora",
    icon: "â—"
  }, {
    id: "ripple",
    label: "Ripple",
    icon: "â—Ž"
  }, {
    id: "twinkle",
    label: "Twinkle",
    icon: "âœ¸"
  }, {
    id: "reactive",
    label: "Reactive",
    icon: "â˜¼"
  }, {
    id: "striation",
    label: "Striation",
    icon: "â¦¹"
  }, {
    id: "fireworks",
    label: "Fireworks",
    icon: "âœ»"
  }, {
    id: "frenzy",
    label: "Frenzy",
    icon: "âœº"
  }, {
    id: "autorip",
    label: "Auto Ripple",
    icon: "â—ˆ"
  }, {
    id: "speedres",
    label: "Speed Respond",
    icon: "â¦¿"
  }, {
    id: "rain",
    label: "Rain",
    icon: "â˜‚"
  }, {
    id: "comet",
    label: "Comet",
    icon: "â˜„"
  }, {
    id: "tide",
    label: "Tide",
    icon: "â‰ˆ"
  }, {
    id: "custom",
    label: "Custom",
    icon: "â—‡"
  }];
  const ZONE_MODES = [{
    id: "twinkle",
    label: "Twinkle"
  }, {
    id: "wave",
    label: "Wave"
  }, {
    id: "striation",
    label: "Striation"
  }, {
    id: "radar",
    label: "Radar"
  }, {
    id: "ripple",
    label: "Ripple"
  }, {
    id: "cross",
    label: "Cross"
  }, {
    id: "fireworks",
    label: "Fireworks"
  }, {
    id: "aurora",
    label: "Aurora"
  }, {
    id: "breath",
    label: "Breath"
  }, {
    id: "static",
    label: "Static"
  }, {
    id: "rain",
    label: "Rain"
  }, {
    id: "comet",
    label: "Comet"
  }, {
    id: "tide",
    label: "Tide"
  }];
  const PRESET_PALETTES = [["#9d4edd"], ["#00f5ff"], ["#ff3d6e"], ["#39ff8a"], ["#9d4edd", "#00f5ff"], ["#ff7a59", "#ffaa1f"], ["#ff3d6e", "#ffaa1f", "#39ff8a"], ["#ff3d6e", "#ffaa1f", "#39ff8a", "#3b82f6"]];
  const BG_SWATCHES = ["#000000", "#0b0f19", "#1a0833", "#001318", "#0a1f10", "#241400", "#2a0814", "#ffffff"];

  /* ============================================================
     Board-awareness helpers (additive â€” PER_BOARD_PARITY_PLAN step 5).
     Every helper falls back to today's hardcoded behaviour when the board
     declares nothing, so the Win60 (and any unknown board) renders exactly
     as before. ctx.board is the board-context value from
     components/board-context.jsx (locked contract).
     ============================================================ */
  const boardCtxOf = ctx => ctx && ctx.board || window.AetherBoard && window.AetherBoard.UNKNOWN_BOARD || {
    board: null,
    lighting: null,
    actuation: null,
    cap: () => undefined,
    capState: () => "unknown",
    isSupported: () => true
  };

  /* Icons for registry-declared firmware modes today's hardcoded grid doesn't
     know about (e.g. the HFD boards' own effect set). Fallback glyph: â–£ */
  const DATA_MODE_ICONS = {
    "reactive-single": "â˜¼",
    "extinguish-single": "â—Œ",
    "starry-sky": "âœ¦",
    "snowfall": "â†",
    "blossoming": "âœ»",
    "dynamic-breathing": "â—‹",
    "spectrum-cycle": "â—Ž",
    "color-spring": "â†Ÿ",
    "colorful-cross": "âœš",
    "drifting": "ã€°",
    "twisting-path": "âˆ¿",
    "double-tap": "â—‰",
    "ripple-spread": "â—Ž",
    "flowing": "â‰ˆ",
    "mountain-peaks": "â‹€",
    "gentle-rain": "â˜‚",
    "shuttle": "â‡„"
  };

  /* Per-mode control rule from the board's registry mode table (or null). */
  const modeRuleFor = (bl, id) => bl && Array.isArray(bl.modes) && bl.modes.find(m => m.id === id) || null;

  /* Build the mode grid for the active board.
     - No board lighting data  -> today's hardcoded LIGHT_MODES (fail-open).
     - hostEngine board (Win60 family) -> today's grid IS the product (host
       effects + firmware modes share it); only append registry modes the grid
       doesn't already know. For the Win60 the registry ids are a strict subset
       of LIGHT_MODES, so this returns LIGHT_MODES unchanged.
     - firmware-only board (hostEngine === false) -> the registry mode table is
       the whole truth: host-animated entries (rain/comet/tide/â€¦) are not
       offered, because they stream per-key RGB frames from the PC and that
       path is unproven on such boards (see the note rendered under the grid). */
  const modeGridFor = bl => {
    if (!bl || !Array.isArray(bl.modes) || bl.modes.length === 0) return LIGHT_MODES;
    if (bl.hostEngine !== false) {
      const known = new Set(LIGHT_MODES.map(m => m.id));
      const extra = bl.modes.filter(m => !known.has(m.id)).map(m => ({
        id: m.id,
        label: m.name || m.id,
        icon: DATA_MODE_ICONS[m.id] || "â–£"
      }));
      return extra.length ? LIGHT_MODES.concat(extra) : LIGHT_MODES;
    }
    return bl.modes.map(m => {
      const legacy = LIGHT_MODES.find(x => x.id === m.id);
      return {
        id: m.id,
        label: m.name || legacy && legacy.label || m.id,
        icon: DATA_MODE_ICONS[m.id] || legacy && legacy.icon || "â–£"
      };
    });
  };

  /* ============================================================
     Host-engine frame-rate awareness (additive).
     The host effect engine runs at 60 fps (effects.FPS â€” a 120 bump was
     reverted because it saturated the USB pipe; keep the constant below in
     step with effects.FPS). A board that sustains the per-key stream at a
     lower rate declares `hostEngineMaxFps` in its registry lighting block
     (e.g. the MINI 60 HE PRO: measured 28). A MISSING hostEngineMaxFps means
     "no cap / full speed", so a board that does not declare it â€” and the
     fail-open no-board path â€” renders exactly as today.
  
     Motion-rate classification is owned HERE (the registry does not carry
     it). Press-reactive effects need live key travel and fast response, so
     they read as choppy on a low-fps board; the ambient/slow set looks right
     even at ~28 fps. From CLAUDE.md + effects.py:
       press-reactive: reactive, ripple, speedres, cross, fireworks
       ambient/slow:   rain, aurora, autorip, striation, twinkle, breath,
                       frenzy, comet, tide
     wave / neon / radar are classified ambient here as well (slow sweeps /
     pulses, no press input); static has no motion; custom is the zone
     container (its zone modes carry the same â‰ˆ marker in the Effect Preview
     widget â€” the fps fact itself is stated ONCE, under the mode grid). */
  const HOST_ENGINE_TARGET_FPS = 60;
  const HOST_FX_FAST = new Set(["reactive", "ripple", "speedres", "cross", "fireworks"]);
  /* Declared cap in fps, or null when the board declares none (= full speed). */
  const hostFpsCapOf = bl => bl && bl.hostEngine !== false && typeof bl.hostEngineMaxFps === "number" && bl.hostEngineMaxFps > 0 ? bl.hostEngineMaxFps : null;
  /* The cap, but only when it is meaningfully below the engine target
     (< 75% of 60 fps) â€” otherwise null, i.e. nothing worth surfacing. */
  const hostFpsLimited = bl => {
    const cap = hostFpsCapOf(bl);
    return cap != null && cap < HOST_ENGINE_TARGET_FPS * 0.75 ? cap : null;
  };

  /* ============================================================
     Per-board lighting dispatch (firmware set_light vs host start_multicolor).
  
     THE BUG THIS FIXES: app.jsx used to decide with
         useHost = power && !fullColor && pattern !== "static";
         else set_light(MODE_BYTE[pattern] ?? 0, ...)
     where MODE_BYTE is the hardcoded Win60 cmd-7 table. On any other board that
     is wrong twice over: the board's own firmware modes (e.g. the MINI 60 HE
     PRO's starry-sky/snowfall/...) are missing from that table, so `?? 0`
     silently sends byte 0 â€” which on the MINI means LIGHTS OFF â€” and shared ids
     resolve to the WRONG byte (static is 0 on the Win60 but 1 on the MINI).
  
     THE RULE LANDED HERE (single source of truth, used by app.jsx at send time
     and by the verification harness against raw registry data):
       1. Boards with a registry mode table (board.lighting.modes) resolve the
          selected id against THAT table. While powered and not in Full-RGB, an
          id the host engine can generate (HOST_FX_IDS == effects.py's table)
          runs on the host when the board allows it (hostEngine !== false) â€”
          the exact precedence the shipped Win60 build has always used.
          Everything else is a firmware set_light with THIS board's byte.
       2. An unknown id NEVER falls back to `?? 0`: it resolves to the board's
          own declared static mode (never a byte that can mean OFF) and carries
          a `notice` string so the UI can say so out loud.
       3. Power-off prefers the board's declared offModeByte (MINI: 0). Boards
          that don't declare one (Win60) keep today's byte-identical behaviour:
          the resolved mode byte with the power flag low.
       4. Per-mode registry rules are honoured when building the set_light args:
          brightness/speed scale to the board's brightnessMax/speedMax (Win60
          4 == the legacy constants, so its bytes are unchanged; MINI is 0..5),
          and a `direction: true` rule (2-way byte) clamps the 4-way dial to 0/1.
       5. No registry table at all (no bridge / no board data) -> call:"legacy",
          and app.jsx falls through to exactly today's shipped code path.
     ============================================================ */
  /* Host-engine effect generators that exist in effects.py (its `gens` table),
     minus the internal 'static'/'calibrate' entries â€” static dispatches to
     firmware (today's rule) and calibrate is engine-internal. Keep in step with
     effects.py; ids sent to start_multicolor MUST come from this set so the
     engine never silently falls back on an id it doesn't know. */
  const HOST_FX_IDS = new Set(["wave", "neon", "radar", "cross", "breath", "aurora", "ripple", "twinkle", "reactive", "striation", "fireworks", "frenzy", "autorip", "speedres", "rain", "comet", "tide"]);

  /* Local copies of app.jsx's color/step helpers (this file loads first, so it
     cannot import them; keep in step). briByteFor/spdByteFor generalise the
     legacy briByte/spdByte to a per-board max â€” with max 4 they are the same
     function, so Win60 bytes are provably unchanged. */
  const hexToRgb = hex => {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  };
  const briByteFor = (pct, max) => pct <= 0 ? 0 : Math.max(1, Math.min(max, Math.ceil(pct / 100 * max)));
  const spdByteFor = (pct, max) => Math.max(1, Math.min(max, Math.round(pct / 100 * (max - 1)) + 1));

  /* resolveLightDispatch(bl, {pattern, power, fullColor}) -> decision.
     bl = board.lighting (registry block) or null. Returns one of:
       { call:"legacy" }                          no mode table -> today's code
       { call:"host", id }                        start_multicolor(id, ...)
       { call:"fw", byte, rule, off? , fallback?, reason? }
                                                  set_light(byte, ...) with THIS
                                                  board's byte; `fallback` marks
                                                  the honest static substitution */
  const resolveLightDispatch = (bl, {
    pattern,
    power,
    fullColor
  }) => {
    const modes = bl && Array.isArray(bl.modes) && bl.modes.length ? bl.modes : null;
    if (!modes) return {
      call: "legacy"
    };
    const rule = modes.find(m => m.id === pattern) || null;
    const hostOk = bl.hostEngine !== false;
    if (power && !fullColor && pattern !== "static" && hostOk && HOST_FX_IDS.has(pattern)) return {
      call: "host",
      id: pattern
    };
    if (!power && bl.offModeByte != null) return {
      call: "fw",
      byte: bl.offModeByte,
      rule: null,
      off: true
    };
    if (rule) return {
      call: "fw",
      byte: rule.byte,
      rule
    };
    // Unknown on this board (or a host-only id while Full-RGB / host-less):
    // NEVER guess a raw byte â€” 0 means OFF on some boards. Fall back to the
    // board's own declared static mode. (On the Win60 static IS byte 0, so the
    // legacy `?? 0` bytes are reproduced exactly there.)
    const off = bl.offModeByte;
    const fb = modes.find(m => m.id === "static") || modes.find(m => off == null || m.byte !== off) || modes[0];
    return {
      call: "fw",
      byte: fb.byte,
      rule: fb,
      fallback: "static",
      reason: `"${pattern}" is not available on this board`
    };
  };

  /* buildLightCalls(bl, s) -> null | { dispatch, notice, calls:[[api, ...args]] }.
     The COMPLETE per-board send for one lighting state â€” app.jsx executes the
     list verbatim; the harness asserts it against every board's registry data.
     s: { pattern, power, fullColor, colors:[hex], bgColor:hex, brightness,
          speed, direction, striOrient }. Returns null for call:"legacy" (the
     caller keeps today's exact MODE_BYTE code path). */
  const buildLightCalls = (bl, s) => {
    const d = resolveLightDispatch(bl, s);
    if (d.call === "legacy") return null;
    if (d.call === "host") {
      return {
        dispatch: d,
        notice: null,
        calls: [["start_multicolor", d.id, (s.colors || []).map(hexToRgb), hexToRgb(s.bgColor), s.brightness, s.speed, s.direction, s.striOrient]]
      };
    }
    const briMax = bl.brightnessMax || 4;
    const spdMax = bl.speedMax || 4;
    const [r, g, b] = hexToRgb(s.colors && s.colors[0] || "#ffffff");
    const [br, bg2, bb] = hexToRgb(s.bgColor);
    // 2-way direction rule (registry `direction: true`): the firmware takes a
    // plain 0/1 byte, so clamp the 4-way dial value. Directional *kinds*
    // ("lr"/"all"/...) and rule-less modes pass the dial byte through untouched
    // (the Win60's rules are all kinds or absent -> byte-identical).
    const dirOut = d.rule && d.rule.direction === true ? s.direction === 1 ? 1 : 0 : s.direction;
    return {
      dispatch: d,
      // Only the powered, non-Full-RGB substitution is worth saying out loud:
      // power-off lands on off/static intentionally, and Full-RGB over a
      // host-only id has always quietly used the static slot (Win60 shipped
      // behaviour â€” keep it silent there too).
      notice: d.fallback && s.power && !s.fullColor ? `${d.reason} â€” showing ${d.rule && d.rule.name || "Static"} instead` : null,
      calls: [["stop_multicolor"], ["set_light", d.byte, r, g, b, briByteFor(s.brightness, briMax), spdByteFor(s.speed, spdMax), br, bg2, bb, dirOut, s.power, s.fullColor ? 1 : 0]]
    };
  };

  /* ============================================================
     Schematic-preview color honesty (the "yellow in my purple twinkle" fix).
  
     previewSimColor(bl, s, idx) -> the hex color the Live Keyboard's STATIC
     fallback schematic paints on flat key index `idx` whenever there is no
     live host frame to mirror (board-firmware effects, disconnected, engine
     stopped). app.jsx's ledMap memo calls this per key.
  
     THE BUG THIS FIXES: the old inline sim painted EVERY non-static pattern as
         hit ? colors[idx % colors.length] : bgColor
     i.e. it scattered the WHOLE palette across the board. A mode that
     dispatches to the board's own firmware (the MINI 60 HE PRO's
     starry-sky/snowfall/... and everything on a firmware-only board) only ever
     receives colors[0] + bgColor â€” set_light carries ONE foreground. So the
     schematic showed palette slots the effect can never display; with the
     out-of-the-box palette seed (which contains #ffd400) a purple firmware
     twinkle over white gained a literal YELLOW key that exists nowhere on the
     hardware. Modes whose registry rule says `color: false` are worse: the
     firmware picks its own colors, so ANY foreground we draw is a guess â€”
     only the user's background is honest.
  
     Legacy grid ids on host-engine boards (the whole shipped Win60 surface,
     and the no-board fail-open path) keep the old scatter BYTE-IDENTICAL:
     the fw branch below only fires where resolveLightDispatch sends the
     powered pattern to firmware â€” ids beyond the legacy grid, or any id on a
     hostEngine:false board â€” never for static/custom. */
  const previewSimColor = (bl, s, idx) => {
    const colors = s.colors || [];
    if (s.pattern === "static") return colors[0];
    const rule = modeRuleFor(bl, s.pattern);
    const legacyId = LIGHT_MODES.some(m => m.id === s.pattern);
    if (rule && s.pattern !== "custom" && (!legacyId || bl.hostEngine === false)) {
      if (rule.color === false) return s.bgColor; // firmware-chosen colors â€” show only the user's bg
      return idx % 6 === 0 ? colors[0] || "#ffffff" : s.bgColor; // exactly the fg byte sent (buildLightCalls)
    }
    const hit = idx % 6 === 0 || colors.length === 1;
    return hit ? colors[idx % colors.length] : s.bgColor;
  };

  /* PatternPreview â€” verbatim from sections.jsx (real RGB color prop). */
  const PatternPreview = ({
    kind,
    color
  }) => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 30",
    className: "w-full h-8 mt-3",
    preserveAspectRatio: "none"
  }, kind === "static" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: "0.7"
  })), kind === "wave" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: 0.2 + (Math.sin(i) + 1) * 0.4
  })), kind === "react" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: i === 3 ? 1 : 0.15
  })), kind === "ripple" && [10, 18, 26].map((r, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: "50",
    cy: "15",
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: 1 - i * 0.3
  })), kind === "breathe" && /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "96",
    height: "18",
    rx: "3",
    fill: color,
    opacity: "0.5"
  }), kind === "rain" && Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: i * 18 + 8,
    x2: i * 18 + 8,
    y1: i * 4,
    y2: i * 4 + 12,
    stroke: color,
    strokeWidth: "1.5"
  })));

  /* Preview "kind" for a given firmware pattern id (best-effort mapping). */
  const previewKindFor = pattern => {
    if (pattern === "static") return "static";
    if (pattern === "wave" || pattern === "aurora" || pattern === "tide" || pattern === "comet") return "wave";
    if (pattern === "reactive" || pattern === "cross" || pattern === "speedres") return "react";
    if (pattern === "ripple" || pattern === "autorip" || pattern === "radar") return "ripple";
    if (pattern === "breath" || pattern === "neon") return "breathe";
    if (pattern === "rain" || pattern === "twinkle" || pattern === "fireworks" || pattern === "frenzy" || pattern === "striation") return "rain";
    return "static";
  };

  /* ===== Effect zones panel (custom mode) â€” verbatim behavior from sections.jsx.
     `degraded` (Set|null): press-reactive mode ids to mark â‰ˆ on fps-capped boards â€”
     same marker idiom as the Mode Picker grid, whose footnote explains it. Null on
     uncapped boards, so labels render exactly as before. ===== */
  const ZonesPanel = ({
    zones,
    selectedKeys,
    onAdd,
    onUpdate,
    onRemove,
    degraded
  }) => /*#__PURE__*/React.createElement("div", {
    className: "glass p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
  }, "Effect Zones"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
  }, "Select keys on the board, add a zone, give it its own effect")), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    disabled: !selectedKeys || selectedKeys.size === 0,
    className: "px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] disabled:opacity-40 font-display text-[10.5px] uppercase tracking-[0.16em]"
  }, "+ Zone (", selectedKeys?.size ?? 0, ")")), (!zones || zones.length === 0) && /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[11px] text-[var(--text-faint)]"
  }, "No zones yet \u2014 select keys, then click \"+ Zone\". Keys outside every zone stay off."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, (zones || []).map(z => /*#__PURE__*/React.createElement("div", {
    key: z.id,
    className: "rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.35)] p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: z.mode,
    onChange: e => onUpdate(z.id, {
      mode: e.target.value
    }),
    className: "flex-1 h-8 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] text-[var(--text)] font-display text-[11px] uppercase tracking-[0.12em] px-2 outline-none"
  }, ZONE_MODES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m.id,
    value: m.id
  }, degraded && degraded.has(m.id) ? m.label + " â‰ˆ" : m.label))), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[10px] text-[var(--text-faint)] whitespace-nowrap"
  }, z.codes.length, " keys"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(z.id),
    title: "Remove zone",
    className: "w-7 h-7 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-rose-300 hover:border-rose-400/40"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, (z.colors || []).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "relative w-7 h-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full rounded-md ring-1 ring-white/10",
    style: {
      background: c
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: c,
    onChange: e => {
      const cs = [...z.colors];
      cs[i] = e.target.value;
      onUpdate(z.id, {
        colors: cs
      });
    },
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  })), z.colors.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: z.colors.filter((_, j) => j !== i)
    }),
    className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 ring-1 ring-white/20 text-[var(--text-dim)] hover:text-rose-300 grid place-items-center text-[9px]"
  }, "\u2715"))), (z.colors || []).length < 4 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: [...(z.colors || []), "#ffffff"]
    }),
    className: "w-7 h-7 rounded-md border-2 border-dashed border-[var(--line)] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] grid place-items-center text-[12px]"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
  }, "Spd"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "aether flex-1",
    min: 0,
    max: 100,
    step: 1,
    value: z.speed != null ? z.speed : 60,
    style: {
      "--pct": (z.speed != null ? z.speed : 60) + "%"
    },
    onChange: e => onUpdate(z.id, {
      speed: parseFloat(e.target.value)
    })
  })))))));

  /* ============================================================
     Widget 1 â€” Mode Picker: firmware pattern grid, power/full-RGB,
     brightness/speed sliders, direction, striation orientation.
     ============================================================ */
  /* DirectionDial â€” an angle picker for effect flow direction. The firmware
     supports 4 cardinal directions (right0 left1 up2 down3), so the dial snaps
     to the nearest. Drag or click anywhere on the ring to set the angle. */
  const DIR_BYTE_AT = [0, 2, 1, 3]; // round(angle/90)%4 -> byte
  const DIR_ANGLE_OF = {
    0: 0,
    2: 90,
    1: 180,
    3: 270
  };
  const DIR_NAME = {
    0: "Right",
    1: "Left",
    2: "Up",
    3: "Down"
  };
  function DirectionDial({
    direction,
    setDirection
  }) {
    const ref = useRef(null);
    const angle = DIR_ANGLE_OF[direction] != null ? DIR_ANGLE_OF[direction] : 0;
    const pick = e => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      let a = Math.atan2(r.top + r.height / 2 - e.clientY, e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
      if (a < 0) a += 360;
      setDirection(DIR_BYTE_AT[Math.round(a / 90) % 4]);
    };
    const marks = [["â†’", 0, {
      right: 6,
      top: "50%",
      transform: "translateY(-50%)"
    }], ["â†‘", 2, {
      top: 6,
      left: "50%",
      transform: "translateX(-50%)"
    }], ["â†", 1, {
      left: 6,
      top: "50%",
      transform: "translateY(-50%)"
    }], ["â†“", 3, {
      bottom: 6,
      left: "50%",
      transform: "translateX(-50%)"
    }]];
    return /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      onPointerDown: e => {
        e.currentTarget.setPointerCapture(e.pointerId);
        pick(e);
      },
      onPointerMove: e => e.buttons && pick(e),
      style: {
        width: 112,
        height: 112,
        cursor: "pointer",
        touchAction: "none"
      },
      className: "relative rounded-full border border-[var(--line)] bg-white/[0.02]"
    }, marks.map(([glyph, byte, css]) => /*#__PURE__*/React.createElement("span", {
      key: byte,
      style: {
        position: "absolute",
        fontSize: 11,
        ...css,
        color: direction === byte ? "var(--accent)" : "var(--text-faint)"
      }
    }, glyph)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 44,
        height: 3,
        borderRadius: 3,
        background: "linear-gradient(90deg, transparent, var(--accent))",
        transformOrigin: "left center",
        transform: `rotate(${-angle}deg)`,
        boxShadow: "0 0 10px var(--accent-glow)",
        transition: "transform 0.2s var(--ease-out)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 8,
        height: 8,
        marginLeft: -4,
        marginTop: -4,
        borderRadius: "50%",
        background: "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, "Angle"), /*#__PURE__*/React.createElement("div", {
      className: "font-title text-[20px] text-[var(--text)] leading-tight"
    }, DIR_NAME[direction] || "Right"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, angle, "\xB0 \xB7 snaps to 4-way")));
  }

  /* Two-way direction toggle â€” for firmware-only boards whose registry declares
     `direction: true` (a plain 0/1 byte) for the current mode. Boards with a
     directional *kind* ("lr"/"ud"/â€¦) keep the DirectionDial. */
  function DirectionToggle({
    direction,
    setDirection
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5 max-w-[260px]"
    }, [["Forward", 0, "â†’"], ["Reverse", 1, "â†"]].map(([lbl, val, ic]) => {
      const active = (direction === 1 ? 1 : 0) === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setDirection(val),
        className: `h-9 rounded-lg border text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all
                        ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[14px]"
      }, ic), lbl);
    }));
  }
  function ModePickerWidget(ctx) {
    const {
      pattern,
      setPattern,
      brightness,
      setBrightness,
      speed,
      setSpeed,
      power,
      setPower,
      fullColor,
      setFullColor,
      direction,
      setDirection,
      striOrient,
      setStriOrient
    } = ctx;
    const fullColorOk = pattern !== "static" && pattern !== "custom";

    /* Board awareness (additive). firmwareOnly === false for the Win60 (its
       registry sets hostEngine true) and whenever no board data is available,
       so every branch below falls back to today's exact rendering. */
    const bctx = boardCtxOf(ctx);
    const bl = bctx.lighting;
    const boardName = bctx.board && bctx.board.name || "this board";
    const modeGrid = modeGridFor(bl);
    const firmwareOnly = !!bl && bl.hostEngine === false;
    const rule = firmwareOnly ? modeRuleFor(bl, pattern) : null;
    // A host-engine board's OWN firmware mode beyond the legacy grid (e.g. the
    // MINI's starry-sky): its registry rule drives the direction control below.
    // null for every legacy grid id and whenever there is no board data, so the
    // Win60 (whose ids are all legacy) renders exactly as before.
    const hfdRule = !firmwareOnly && bl && !LIGHT_MODES.some(m => m.id === pattern) ? modeRuleFor(bl, pattern) : null;
    // Discrete firmware brightness/speed levels â€” only on firmware-only boards
    // (on host-engine boards the % is genuinely continuous in the host engine).
    const briMax = firmwareOnly && bl.brightnessMax || 0;
    const spdMax = firmwareOnly && bl.speedMax || 0;
    const speedOff = !!(firmwareOnly && rule && rule.speed === false);
    // Host-engine fps cap â€” null unless the board declares one meaningfully
    // below the 60fps engine rate (missing hostEngineMaxFps => null => no change).
    const fpsCap = !firmwareOnly ? hostFpsLimited(bl) : null;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-end gap-4 mb-1"
    }, fullColorOk && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2",
      title: "Cycle the full RGB spectrum (rainbow) instead of the chosen colors"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Full RGB"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setFullColor(!fullColor),
      className: `relative w-10 h-5 rounded-full border transition-colors
                          ${fullColor ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                                ${fullColor ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Power"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setPower(!power),
      className: `relative w-10 h-5 rounded-full border transition-colors
                        ${power ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${power ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Light Mode"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5"
    }, modeGrid.map(m => {
      const active = pattern === m.id;
      // Press-reactive host effect on a low-fps board: mark it (â‰ˆ) so the
      // footnote below can be specific. degraded is always false when the
      // board declares no cap, so nothing changes on such boards.
      const degraded = fpsCap != null && HOST_FX_FAST.has(m.id);
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        onClick: () => setPattern(m.id),
        title: degraded ? `Press-reactive â€” ${boardName} sustains ~${fpsCap} fps, so this effect will look choppy` : undefined,
        className: `h-9 rounded-lg border font-display text-[11px] tracking-[0.06em] flex items-center justify-center gap-1.5 transition-all
                            ${active ? "border-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`,
        style: active ? {
          background: "var(--accent-gradient, var(--accent))"
        } : {}
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[12px]"
      }, m.icon), " ", m.label, degraded && /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[9px] opacity-70"
      }, "\u2248"));
    })), firmwareOnly && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "This is ", boardName, "'s own firmware effect set. Aether's host-animated effects (Rain, Comet, Tide, Aurora and the rest) stream per-key RGB frames from the PC, and that streaming path is not yet proven on this board \u2014 so they are not offered. Static per-key painting still works."), fpsCap != null && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "Host-animated effects stream from this PC at ~", fpsCap, " fps on ", boardName, " (engine target ~", HOST_ENGINE_TARGET_FPS, " fps). Ambient effects like Rain, Aurora, Comet and Tide look right at that rate; press-reactive effects \u2014 marked \u2248 \u2014 need faster updates and will look choppy.")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Brightness"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, briMax > 0 ? `${Math.round(brightness / 100 * briMax)} / ${briMax}` : /*#__PURE__*/React.createElement(React.Fragment, null, Math.round(brightness), "%"))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: briMax > 0 ? 100 / briMax : 1,
      value: brightness,
      style: {
        "--pct": brightness + "%"
      },
      onChange: e => setBrightness(parseFloat(e.target.value))
    })), !speedOff ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Speed"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, spdMax > 0 ? `${Math.round(speed / 100 * spdMax)} / ${spdMax}` : /*#__PURE__*/React.createElement(React.Fragment, null, Math.round(speed), "%"))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: spdMax > 0 ? 100 / spdMax : 1,
      value: speed,
      style: {
        "--pct": speed + "%"
      },
      onChange: e => setSpeed(parseFloat(e.target.value))
    })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Speed"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "n/a")), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "This mode has no speed control on ", boardName, "."))), !firmwareOnly ?
    // Host-engine board. A board-specific firmware mode (hfdRule) honours
    // its own registry rule: `direction: true` is a 2-way 0/1 byte ->
    // toggle; no direction declared -> no control (the firmware ignores
    // it). Legacy grid ids (hfdRule null) keep today's 4-way dial.
    hfdRule ? hfdRule.direction === true ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), /*#__PURE__*/React.createElement(DirectionToggle, {
      direction: direction,
      setDirection: setDirection
    }), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-1.5"
    }, "This effect takes a 2-way direction on ", boardName, ".")) : null : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), /*#__PURE__*/React.createElement(DirectionDial, {
      direction: direction,
      setDirection: setDirection
    })) : rule && rule.direction ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), rule.direction === true ? /*#__PURE__*/React.createElement(DirectionToggle, {
      direction: direction,
      setDirection: setDirection
    }) : /*#__PURE__*/React.createElement(DirectionDial, {
      direction: direction,
      setDirection: setDirection
    }), rule.direction === true && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-1.5"
    }, "This effect takes a 2-way direction on ", boardName, ".")) : null, pattern === "striation" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Stripe Orientation"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5 max-w-[260px]"
    }, [["Vertical", "v", "â–¥"], ["Horizontal", "h", "â–¤"], ["Both", "both", "â–¦"]].map(([lbl, val, ic]) => {
      const active = (striOrient || "v") === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setStriOrient && setStriOrient(val),
        className: `h-9 rounded-lg border text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all
                              ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[14px]"
      }, ic), lbl);
    }))));
  }

  /* ============================================================
     Widget 2 â€” Color Palette: effect-colors palette + presets + background color.
     ============================================================ */
  function ColorPaletteWidget(ctx) {
    const {
      colors,
      setColors,
      bgColor,
      setBgColor,
      pattern
    } = ctx;
    const palette = colors || [];
    const [activeSlot, setActiveSlot] = useState(0);
    // Draft for the bg hex text field: lets the user type intermediate values
    // without committing an invalid color (which would stream black to the
    // device). Only a full valid #RRGGBB is pushed to bgColor; external changes
    // (picker, swatches, Off) sync back into the field.
    const [bgText, setBgText] = useState(bgColor);
    useEffect(() => {
      setBgText(bgColor);
    }, [bgColor]);

    /* Board awareness (additive): some boards' firmware forces random colors
       for certain modes (registry rule `color: false`) â€” the picker cannot
       apply. The Win60 declares no such mode, so this never triggers there. */
    const bctx = boardCtxOf(ctx);
    const boardName = bctx.board && bctx.board.name || "this board";
    const colorRule = modeRuleFor(bctx.lighting, pattern);
    const colorLocked = !!(colorRule && colorRule.color === false);
    const setSlot = (i, value) => {
      const p = [...palette];
      p[i] = value;
      setColors(p);
    };
    const addSlot = () => {
      if (palette.length >= 4) return;
      const seeds = ["#663390", "#009fa6", "#a62848", "#a66e14"];
      const next = seeds[palette.length] || "#a6a6a6";
      setColors([...palette, next]);
      setActiveSlot(palette.length);
    };
    const removeSlot = i => {
      if (palette.length <= 0) return;
      const p = palette.filter((_, idx) => idx !== i);
      setColors(p);
      if (activeSlot >= p.length) setActiveSlot(p.length - 1);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, pattern !== "custom" && colorLocked ? /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)] leading-relaxed"
    }, "\"", colorRule && colorRule.name || pattern, "\" uses firmware-forced random colors on", " ", boardName, " \u2014 the effect color picker does not apply while it is active. The other controls still work.") : pattern !== "custom" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Effect colors \xB7 ", palette.length, "/4"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, palette.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => setColors([]),
      className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)] hover:text-rose-300"
    }, "Clear all"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "click slot to recolor"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, palette.map((c, i) => {
      const isActive = activeSlot === i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "relative flex-1 min-w-0 group"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setActiveSlot(i),
        className: `relative w-full h-16 rounded-2xl overflow-hidden ring-1 transition-all
                                ${isActive ? "ring-2 ring-white/80 scale-[1.02]" : "ring-white/10 hover:scale-[1.01]"}`,
        style: {
          background: c,
          boxShadow: `0 0 24px ${c}55, inset 0 0 0 1px rgba(255,255,255,0.06)`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "absolute bottom-1.5 left-2 text-[10px] font-mono text-white/85",
        style: {
          textShadow: "0 1px 4px rgba(0,0,0,0.6)"
        }
      }, c.toUpperCase()), /*#__PURE__*/React.createElement("input", {
        type: "color",
        value: c,
        onChange: e => setSlot(i, e.target.value),
        onClick: e => e.stopPropagation(),
        className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      })), palette.length > 0 && /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          removeSlot(i);
        },
        title: "Remove",
        className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 ring-1 ring-white/20 text-slate-300 hover:text-rose-300 grid place-items-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
      }, "\u2715"));
    }), palette.length < 4 && /*#__PURE__*/React.createElement("button", {
      onClick: addSlot,
      className: "flex-1 min-w-0 h-16 rounded-2xl border-2 border-dashed border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.18em]"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 13
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4 gap-2"
    }, PRESET_PALETTES.map((p, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        setColors([...p]);
        setActiveSlot(0);
      },
      className: "h-7 rounded-lg ring-1 ring-white/10 hover:scale-[1.02] transition-transform overflow-hidden",
      title: p.join(", ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full flex"
    }, p.map((c, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: "flex-1",
      style: {
        background: c
      }
    }))))))) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Custom mode drives colors per Effect Zone (see the Effect Preview widget) \u2014 the shared palette is hidden while Custom is active."), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Background color"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "underlies the effect")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-14 h-12 rounded-xl overflow-hidden ring-1 ring-white/10",
      style: {
        background: bgColor,
        boxShadow: `0 0 18px ${bgColor}55`
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "color",
      value: bgColor,
      onChange: e => setBgColor(e.target.value),
      className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    })), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: (bgText || "").toUpperCase(),
      onChange: e => {
        const v = e.target.value;
        setBgText(v);
        if (/^#[0-9a-fA-F]{6}$/.test(v)) setBgColor(v);
      },
      className: "flex-1 h-10 px-3 rounded-lg bg-[rgba(5,11,14,0.5)] border border-[var(--line)] font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => setBgColor("#000000"),
      className: "px-2.5 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Off")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 mt-2.5"
    }, BG_SWATCHES.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setBgColor(c),
      className: `w-6 h-6 rounded-md ring-1 ${bgColor.toLowerCase() === c.toLowerCase() ? "ring-white scale-110" : "ring-white/15 hover:scale-105"} transition-transform`,
      style: {
        background: c
      },
      title: c
    })))));
  }

  /* ============================================================
     Widget 3 â€” Effect Preview: live SVG pattern preview + Custom effect zones.
     ============================================================ */
  function EffectPreviewWidget(ctx) {
    const {
      pattern,
      colors,
      bgColor,
      zones,
      addZone,
      updateZone,
      removeZone,
      selectedKeys
    } = ctx;
    const palette = colors || [];
    const previewColor = palette[0] || bgColor || "#9d4edd";
    const kind = previewKindFor(pattern);

    /* Board awareness (additive): Effect Zones animate via the host streaming
       engine, so they are only offered when the board allows it (hostEngine
       true, or no board data â€” fail-open, exactly today's behaviour). */
    const bctx = boardCtxOf(ctx);
    const hostFx = !bctx.lighting || bctx.lighting.hostEngine !== false;
    const boardName = bctx.board && bctx.board.name || "this board";
    // Streaming fps cap â€” drives the â‰ˆ markers on zone modes (null = no cap).
    const fpsCap = hostFx ? hostFpsLimited(bctx.lighting) : null;

    /* Dispatch honesty: a mode that is one of THIS board's own firmware effects
       (beyond the legacy host grid â€” e.g. the MINI's starry-sky) runs on the
       keyboard itself, so the host-animation schematic would be a lie. Show
       what actually happens instead. Legacy grid ids (and the no-board path)
       render exactly today's preview. */
    const fwRule = modeRuleFor(bctx.lighting, pattern);
    const fwOnlyMode = !!fwRule && !LIGHT_MODES.some(m => m.id === pattern);
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Preview"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.16em]"
    }, fwOnlyMode ? pattern + " Â· firmware" : pattern)), fwOnlyMode ? /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed mt-2"
    }, "\"", fwRule.name || pattern, "\" is one of ", boardName, "'s built-in firmware effects \u2014 the animation runs on the keyboard itself, not through Aether's host engine, so there is no host preview to mirror here. The board plays it live.") : /*#__PURE__*/React.createElement(PatternPreview, {
      kind: kind,
      color: previewColor
    })), pattern === "custom" && (hostFx ? /*#__PURE__*/React.createElement(ZonesPanel, {
      zones: zones,
      selectedKeys: selectedKeys,
      onAdd: addZone,
      onUpdate: updateZone,
      onRemove: removeZone,
      degraded: fpsCap != null ? HOST_FX_FAST : null
    }) : /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, "Effect Zones animate through Aether's host streaming engine, and that streaming path is not yet proven on ", boardName, " \u2014 so zones are not offered. Static per-key colors still work: use the Per-key Paint widget.")), pattern !== "custom" && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Switch Light Mode to \"Custom\" (Mode Picker widget) to build per-zone effects here."));
  }

  /* ============================================================
     Widget 4 â€” Per-key Paint: assign/clear the active palette color to
     the current key selection.
     ============================================================ */
  function PerKeyPaintWidget(ctx) {
    const {
      colors,
      perKeyColors,
      setPerKeyColors,
      selectedKeys,
      setSelectedKeys,
      ledMap
    } = ctx;
    const palette = colors || [];
    const [activeSlot, setActiveSlot] = useState(0);
    const selCount = selectedKeys ? selectedKeys.size : 0;
    const assignToSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const c = palette[activeSlot] || palette[0] || "#ffffff";
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        next[code] = c;
      });
      setPerKeyColors(next);
    };
    const clearPerKeyForSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        delete next[code];
      });
      setPerKeyColors(next);
    };
    const selectAll = () => {
      if (!setSelectedKeys) return;
      setSelectedKeys(new Set(Object.keys(ledMap || {})));
    };
    const clearSelection = () => {
      if (!setSelectedKeys) return;
      setSelectedKeys(new Set());
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, palette.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Active slot"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, palette.map((c, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setActiveSlot(i),
      className: `w-9 h-9 rounded-lg ring-1 transition-all ${activeSlot === i ? "ring-2 ring-white/80 scale-110" : "ring-white/10 hover:scale-105"}`,
      style: {
        background: c,
        boxShadow: `0 0 12px ${c}55`
      },
      title: c.toUpperCase()
    })))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Per-key colors"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, selCount, " key", selCount === 1 ? "" : "s", " selected \xB7 Ctrl/\u2318-click to toggle")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: selectAll,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Select all"), /*#__PURE__*/React.createElement("button", {
      onClick: clearSelection,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Clear"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: assignToSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "flex-1 h-10 rounded-lg font-display text-[12px] uppercase tracking-[0.18em] text-[var(--accent-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110",
      style: {
        background: "var(--accent-gradient, var(--accent))",
        boxShadow: "0 8px 24px -8px var(--accent-glow)"
      }
    }, "Paint selected with slot ", activeSlot + 1), /*#__PURE__*/React.createElement("button", {
      onClick: clearPerKeyForSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "px-3 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] disabled:opacity-40 font-display text-[11.5px] uppercase tracking-[0.18em]"
    }, "Reset"))));
  }

  /* ============================================================
     Widget 5 â€” Live Keyboard: the real board painted with the live animated
     effect frame (ctx.ledMapLive, polled from get_light_frame on the Lighting
     tab). Click keys to build a selection for Per-key Paint. This is the
     animated keyboard preview from the previous UI.
     ============================================================ */
  function LiveKeyboardWidget(ctx) {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const {
      ledMap,
      ledMapLive,
      perKeyColors,
      selectedKeys,
      setSelectedKeys,
      connected,
      pattern
    } = ctx;
    /* Board awareness (additive): a mode that runs on the BOARD's firmware has
       no host frames to mirror, so the keyboard below shows the static
       schematic (fg/bg only). Say so, instead of letting the still image read
       as a broken animation. Never fires for legacy grid ids on host-engine
       boards (the shipped Win60 surface) or without board data. */
    const bctx = boardCtxOf(ctx);
    const fwRule = modeRuleFor(bctx.lighting, pattern);
    const fwLive = !!fwRule && pattern !== "static" && pattern !== "custom" && (!LIGHT_MODES.some(m => m.id === pattern) || bctx.lighting && bctx.lighting.hostEngine === false);
    if (typeof KeyboardPanel !== "function") {
      return /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[11px] text-[var(--text-faint)] p-2"
      }, "keyboard layout unavailable");
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, !connected && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "connect the board to see the live effect"), fwLive && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed text-center"
    }, "\"", fwRule.name || pattern, "\" animates on the keyboard's own firmware \u2014 the board plays it live. Keys below show ", fwRule.color === false ? "your background color only (this effect uses firmware-chosen colors)" : "the exact colors sent (effect color over your background)", ", not the animation."), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, React.createElement(KeyboardPanel, {
      mode: "lighting",
      layer: "default",
      ledMap: ledMapLive || ledMap,
      perKeyOverride: perKeyColors,
      selectedKeys: selectedKeys || new Set(),
      setSelectedKeys: setSelectedKeys || (() => {}),
      showPill: false
    })));
  }

  /* ============================================================
     Layout â€” Live Keyboard is the hero (wide, top); controls below/around.
     ============================================================ */
  const LIGHTING_WIDGETS = [{
    id: "live",
    title: "Live Keyboard",
    default: {
      x: 40,
      y: 32,
      w: 1000,
      h: 330
    },
    min: {
      w: 560,
      h: 240
    },
    render: LiveKeyboardWidget
  }, {
    id: "mode",
    title: "Mode Picker",
    default: {
      x: 40,
      y: 382,
      w: 460,
      h: 520
    },
    min: {
      w: 340,
      h: 420
    },
    render: ModePickerWidget
  }, {
    id: "palette",
    title: "Color Palette",
    default: {
      x: 520,
      y: 382,
      w: 460,
      h: 460
    },
    min: {
      w: 340,
      h: 340
    },
    render: ColorPaletteWidget
  }, {
    id: "preview",
    title: "Effect Preview",
    default: {
      x: 1000,
      y: 382,
      w: 380,
      h: 460
    },
    min: {
      w: 300,
      h: 300
    },
    render: EffectPreviewWidget
  }, {
    id: "perkey",
    title: "Per-key Paint",
    default: {
      x: 1060,
      y: 32,
      w: 380,
      h: 330
    },
    min: {
      w: 340,
      h: 260
    },
    render: PerKeyPaintWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.LIGHTING_WIDGETS = LIGHTING_WIDGETS;
  // Pure board-awareness helpers. app.jsx reads resolveLightDispatch /
  // buildLightCalls at send time (this file loads before app.jsx â€” see
  // build_runtime.py's dependency order); the rest is for verification.
  window.AetherWorkspaces.LIGHTING_BOARD = {
    LIGHT_MODES,
    modeGridFor,
    modeRuleFor,
    boardCtxOf,
    HOST_ENGINE_TARGET_FPS,
    HOST_FX_FAST,
    hostFpsCapOf,
    hostFpsLimited,
    HOST_FX_IDS,
    resolveLightDispatch,
    buildLightCalls,
    briByteFor,
    spdByteFor,
    previewSimColor
  };
})();
</script>
<script data-mod="ws_macros">
(() => {
  /* ============================================================
     Macros workspace â€” Aula Win60 HE macro slots (cmd 25) + key binds.
     Exports window.AetherWorkspaces.MACROS_WIDGETS â€” widget descriptors
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     like every other workspace. Widgets talk to the bridge through ctx.apiCall
     ONLY (list_macros / read_macro / save_macro / delete_macro / bind_macro /
     unbind_macro â€” see app_web.py Api) and share state through a tiny local
     store, since widget frames are independent React roots of one workspace.
  
     Capability gate: the whole section is hidden by app.jsx unless the active
     board's registry flag `macros` is true (fail-open when no board data is
     available, like every other gate); each widget also re-checks at render
     so a board switch while the tab is open degrades to a notice.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;
  const KB = window.AetherKeyboard || {};
  const KeyboardPanel = KB.KeyboardPanel;
  const KB_ROWS = KB.KB_ROWS || [];

  /* ===== board-context (looked up at render â€” components/ compile after
     workspaces/, see socd.jsx) ===== */
  const FALLBACK_BOARD_CTX = React.createContext(null);
  const useBoardSafe = () => {
    const B = window.AetherBoard;
    const val = React.useContext(B && B.BoardContext || FALLBACK_BOARD_CTX);
    return val || B && B.UNKNOWN_BOARD || null;
  };
  const macrosState = b => b && typeof b.capState === "function" ? b.capState("macros") : "unknown";

  /* ===== HID usage <-> labels (USB HID keyboard page 0x07) ===== */
  const HID_KEYS = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => HID_KEYS.push([c, 0x04 + i]));
  [["1", 0x1e], ["2", 0x1f], ["3", 0x20], ["4", 0x21], ["5", 0x22], ["6", 0x23], ["7", 0x24], ["8", 0x25], ["9", 0x26], ["0", 0x27], ["Enter", 0x28], ["Esc", 0x29], ["Back", 0x2a], ["Tab", 0x2b], ["Space", 0x2c], ["-_", 0x2d], ["=+", 0x2e], ["[{", 0x2f], ["]}", 0x30], ["\\|", 0x31], [";:", 0x33], ["'\"", 0x34], ["`~", 0x35], [",<", 0x36], [".>", 0x37], ["/?", 0x38], ["Caps", 0x39], ["F1", 0x3a], ["F2", 0x3b], ["F3", 0x3c], ["F4", 0x3d], ["F5", 0x3e], ["F6", 0x3f], ["F7", 0x40], ["F8", 0x41], ["F9", 0x42], ["F10", 0x43], ["F11", 0x44], ["F12", 0x45], ["PrtSc", 0x46], ["ScrLk", 0x47], ["Pause", 0x48], ["Ins", 0x49], ["Home", 0x4a], ["PgUp", 0x4b], ["Del", 0x4c], ["End", 0x4d], ["PgDn", 0x4e], ["Right", 0x4f], ["Left", 0x50], ["Down", 0x51], ["Up", 0x52], ["Menu", 0x65], ["L-Ctrl", 0xe0], ["L-Shift", 0xe1], ["L-Alt", 0xe2], ["L-Win", 0xe3], ["R-Ctrl", 0xe4], ["R-Shift", 0xe5], ["R-Alt", 0xe6], ["R-Win", 0xe7]].forEach(p => HID_KEYS.push(p));
  const HID_LABEL = {};
  HID_KEYS.forEach(([l, c]) => {
    HID_LABEL[c] = l;
  });
  const hidLabel = c => HID_LABEL[c] || "0x" + (c & 0xff).toString(16).toUpperCase().padStart(2, "0");

  /* KeyboardEvent.code -> HID usage, for the recorder. */
  const CODE_TO_HID = (() => {
    const m = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => {
      m["Key" + c] = 0x04 + i;
    });
    "1234567890".split("").forEach((d, i) => {
      m["Digit" + d] = 0x1e + i;
    });
    Object.assign(m, {
      Enter: 0x28,
      Escape: 0x29,
      Backspace: 0x2a,
      Tab: 0x2b,
      Space: 0x2c,
      Minus: 0x2d,
      Equal: 0x2e,
      BracketLeft: 0x2f,
      BracketRight: 0x30,
      Backslash: 0x31,
      Semicolon: 0x33,
      Quote: 0x34,
      Backquote: 0x35,
      Comma: 0x36,
      Period: 0x37,
      Slash: 0x38,
      CapsLock: 0x39,
      PrintScreen: 0x46,
      ScrollLock: 0x47,
      Pause: 0x48,
      Insert: 0x49,
      Home: 0x4a,
      PageUp: 0x4b,
      Delete: 0x4c,
      End: 0x4d,
      PageDown: 0x4e,
      ArrowRight: 0x4f,
      ArrowLeft: 0x50,
      ArrowDown: 0x51,
      ArrowUp: 0x52,
      ContextMenu: 0x65,
      ControlLeft: 0xe0,
      ShiftLeft: 0xe1,
      AltLeft: 0xe2,
      MetaLeft: 0xe3,
      ControlRight: 0xe4,
      ShiftRight: 0xe5,
      AltRight: 0xe6,
      MetaRight: 0xe7
    });
    for (let i = 1; i <= 12; i++) m["F" + i] = 0x3a + i - 1;
    return m;
  })();

  /* Design code -> key label, for the bindings list. */
  const LABEL_OF_CODE = {};
  KB_ROWS.flat().forEach(([label, _u, code]) => {
    LABEL_OF_CODE[code] = label;
  });

  /* Playback modes = macro slot header byte 1 (vendor getMacroType). Only 0 and
     1 were seen on the wire; 2 and 3 exist in the vendor UI but are unverified. */
  const PLAY_MODES = [{
    v: 0,
    label: "Once",
    hint: "Plays the sequence once per press.",
    verified: true
  }, {
    v: 1,
    label: "Repeat Ã—N",
    hint: "Plays the sequence N times per press.",
    verified: true
  }, {
    v: 2,
    label: "Toggle",
    hint: "Vendor macroType3 â€” press to start, press again to stop. NOT verified on hardware.",
    verified: false
  }, {
    v: 3,
    label: "Hold",
    hint: "Vendor macroType4 â€” repeats while held. NOT verified on hardware.",
    verified: false
  }];

  /* ===== shared store ===== */
  const store = {
    macros: [],
    // [{slot, name, play_mode, repeat_count, events:[{delay,hid,down}]}]
    bindings: {},
    // {designCode: slot}
    bindingsError: null,
    limits: {
      slots: 10,
      maxEvents: 62,
      maxDelay: 65535,
      maxRepeat: 65535,
      playModes: [0, 1, 2, 3]
    },
    sel: null,
    // selected slot (editor target)
    draft: null,
    // {slot, name, playMode, repeat, events:[{delay,hid,down}]}
    dirty: false,
    loaded: false,
    busy: false,
    status: null,
    // {tone:"ok"|"warn"|"bad", msg}
    listeners: new Set()
  };
  const emit = () => store.listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {}
  });
  const useStore = () => {
    const [, force] = useState(0);
    useEffect(() => {
      const fn = () => force(n => n + 1);
      store.listeners.add(fn);
      return () => store.listeners.delete(fn);
    }, []);
    return store;
  };
  const setStatus = (tone, msg) => {
    store.status = msg ? {
      tone,
      msg,
      id: Date.now()
    } : null;
    emit();
    if (msg) setTimeout(() => {
      if (store.status && store.status.msg === msg) {
        store.status = null;
        emit();
      }
    }, 4500);
  };
  const macroAt = slot => store.macros.find(m => m.slot === slot) || null;
  const blankDraft = slot => ({
    slot,
    name: "",
    playMode: 0,
    repeat: 1,
    events: []
  });
  const draftFrom = m => ({
    slot: m.slot,
    name: m.name || "",
    playMode: m.play_mode || 0,
    repeat: Math.max(1, m.repeat_count || 1),
    events: (m.events || []).map(e => ({
      delay: e.delay | 0,
      hid: e.hid | 0,
      down: !!e.down
    }))
  });
  const selectSlot = slot => {
    store.sel = slot;
    const m = macroAt(slot);
    store.draft = m ? draftFrom(m) : blankDraft(slot);
    store.dirty = false;
    emit();
  };
  const updateDraft = patch => {
    store.draft = Object.assign({}, store.draft || blankDraft(store.sel == null ? 0 : store.sel), patch);
    store.dirty = true;
    emit();
  };
  const refresh = async (apiCall, quiet) => {
    if (!apiCall) return;
    store.busy = true;
    emit();
    try {
      const r = await apiCall("list_macros");
      if (r && r.ok) {
        store.macros = Array.isArray(r.macros) ? r.macros : [];
        store.bindings = r.bindings && typeof r.bindings === "object" ? r.bindings : {};
        store.bindingsError = r.bindings ? null : r.bindings_error || null;
        store.limits = {
          slots: r.slots || 10,
          maxEvents: r.max_events || 62,
          maxDelay: r.max_delay_ms || 65535,
          maxRepeat: r.max_repeat || 65535,
          playModes: Array.isArray(r.play_modes) ? r.play_modes : [0, 1, 2, 3]
        };
        store.loaded = true;
        if (store.sel != null && !store.dirty) {
          const m = macroAt(store.sel);
          store.draft = m ? draftFrom(m) : blankDraft(store.sel);
        }
        if (!quiet) setStatus("ok", `Read ${store.macros.length} macro${store.macros.length === 1 ? "" : "s"} from the board`);
      } else if (!quiet) {
        setStatus("bad", r && r.error || "list_macros failed");
      }
    } finally {
      store.busy = false;
      emit();
    }
  };

  /* ===== small shared bits ===== */
  const Label = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
  }, children);
  const Note = ({
    children,
    tone
  }) => /*#__PURE__*/React.createElement("div", {
    className: `text-[11px] leading-relaxed ${tone === "warn" ? "text-amber-300/90" : tone === "bad" ? "text-rose-300/90" : "text-[var(--text-dim)]"}`
  }, children);
  const Btn = ({
    children,
    onClick,
    disabled,
    variant = "ghost",
    title,
    small
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    title: title,
    className: `${small ? "px-2 h-7 text-[10px]" : "px-3 h-9 text-[11px]"} rounded-md border font-display uppercase tracking-[0.16em] transition-all
                ${disabled ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : variant === "primary" ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_12px_var(--accent-glow)]" : variant === "danger" ? "border-rose-400/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20" : variant === "rec" ? "border-rose-400/60 bg-rose-500/20 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.45)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
  }, children);
  const StatusLine = () => {
    const s = useStore();
    const st = s.status;
    return /*#__PURE__*/React.createElement("div", {
      className: "h-4 text-[11px] font-mono tracking-[0.12em] truncate"
    }, st && /*#__PURE__*/React.createElement("span", {
      className: st.tone === "ok" ? "text-[var(--accent)]" : st.tone === "warn" ? "text-amber-300/90" : "text-rose-300/90"
    }, st.msg));
  };
  const Gate = ({
    children
  }) => {
    const b = useBoardSafe();
    const st = macrosState(b);
    if (st === "yes" || st === "unknown") return children;
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-amber-400/35 bg-amber-500/[0.06] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-amber-300 mb-1"
    }, "Macros \xB7 unavailable"), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, st === "wip" ? "This board's macro protocol is source-only (never verified on hardware) â€” nothing here is sent." : "The active board does not declare macro support."));
  };
  const bindingsOfSlot = slot => Object.keys(store.bindings).filter(c => store.bindings[c] === slot);

  /* ============================================================
     Widget: Key Grid (the selectable board; selection is shared via ctx)
     ============================================================ */
  function KeyGridWidget(ctx) {
    const {
      selectedKeys,
      setSelectedKeys,
      layer,
      ledMap,
      liveDepths
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, KeyboardPanel ? React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: layer || "default",
      selectedKeys,
      setSelectedKeys,
      ledMap,
      showPill: false,
      compact: true,
      liveDepths
    }) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Keyboard render unavailable."));
  }

  /* ============================================================
     Widget: Macro Library â€” the 10 board slots
     ============================================================ */
  function LibraryWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected
    } = ctx;
    useEffect(() => {
      if (connected && !s.loaded && !s.busy) refresh(apiCall, true);
    }, [connected]);
    const slots = Array.from({
      length: s.limits.slots
    }, (_, i) => i);
    const doDelete = async () => {
      if (s.sel == null || !macroAt(s.sel)) return;
      const m = macroAt(s.sel);
      if (!window.confirm(`Erase macro slot ${s.sel + 1}${m.name ? ` ("${m.name}")` : ""} on the board and release its keys?`)) return;
      store.busy = true;
      emit();
      const r = await apiCall("delete_macro", s.sel);
      store.busy = false;
      if (r && r.ok) {
        setStatus("ok", `Slot ${s.sel + 1} erased${r.released && r.released.length ? ` Â· released ${r.released.map(c => LABEL_OF_CODE[c] || c).join(", ")}` : ""}`);
        store.dirty = false;
        await refresh(apiCall, true);
        selectSlot(s.sel);
      } else setStatus("bad", r && r.error || "delete failed");
    };
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: () => refresh(apiCall),
      disabled: !connected || s.busy,
      small: true,
      title: "Re-read every slot from the board"
    }, "\u21BB Read board"), /*#__PURE__*/React.createElement(Btn, {
      onClick: doDelete,
      disabled: !connected || s.busy || s.sel == null || !macroAt(s.sel),
      variant: "danger",
      small: true
    }, "Erase slot"), /*#__PURE__*/React.createElement("span", {
      className: "ml-auto font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, s.macros.length, "/", s.limits.slots, " used")), !connected && /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Pair the keyboard to read its macro slots."), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1"
    }, slots.map(slot => {
      const m = macroAt(slot);
      const active = s.sel === slot;
      const bound = bindingsOfSlot(slot);
      const mode = PLAY_MODES.find(p => p.v === (m ? m.play_mode : 0)) || PLAY_MODES[0];
      return /*#__PURE__*/React.createElement("button", {
        key: slot,
        onClick: () => selectSlot(slot),
        className: `w-full text-left px-3 py-2 rounded-md border transition-all
                            ${active ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: `font-mono text-[10px] w-7 ${active ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}`
      }, "M", slot + 1), /*#__PURE__*/React.createElement("span", {
        className: `font-display text-[12.5px] truncate ${m ? "text-[var(--text)]" : "text-[var(--text-faint)] italic"}`
      }, m ? m.name || `Macro ${slot + 1}` : "empty"), m && /*#__PURE__*/React.createElement("span", {
        className: "ml-auto flex items-center gap-1.5 shrink-0"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[9px] text-[var(--text-faint)]"
      }, m.events.length, " ev"), /*#__PURE__*/React.createElement("span", {
        className: "chip"
      }, mode.label, m.play_mode === 1 ? ` ${m.repeat_count}` : ""))), bound.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "mt-1 flex flex-nowrap gap-1"
      }, bound.map(c => /*#__PURE__*/React.createElement("span", {
        key: c,
        className: "px-1.5 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 font-mono text-[9px] text-[var(--accent)]"
      }, LABEL_OF_CODE[c] || c))));
    })), /*#__PURE__*/React.createElement(StatusLine, null)));
  }

  /* ============================================================
     Widget: Macro Editor â€” record / compose steps, playback, save
     ============================================================ */
  function EditorWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected
    } = ctx;
    const [recording, setRecording] = useState(false);
    const [pickKey, setPickKey] = useState(0x04);
    const recRef = useRef(null);
    const lastT = useRef(0);
    const held = useRef(new Set());
    useEffect(() => {
      if (recording && recRef.current) recRef.current.focus();
    }, [recording]);
    const d = s.draft;
    const events = d ? d.events : [];
    const full = events.length >= s.limits.maxEvents;
    const push = (hid, down, delay) => {
      if (full) {
        setStatus("warn", `Slot holds at most ${s.limits.maxEvents} events`);
        return;
      }
      updateDraft({
        events: events.concat([{
          delay: Math.min(s.limits.maxDelay, Math.max(0, delay | 0)),
          hid,
          down
        }])
      });
    };
    const startRec = () => {
      if (!d) return;
      held.current = new Set();
      lastT.current = 0;
      setRecording(true);
    };
    const stopRec = () => {
      // close any key still held so the macro never leaves a key stuck down
      let evs = (store.draft ? store.draft.events : []).slice();
      held.current.forEach(hid => {
        if (evs.length < s.limits.maxEvents) evs.push({
          delay: 50,
          hid,
          down: false
        });
      });
      held.current = new Set();
      updateDraft({
        events: evs
      });
      setRecording(false);
    };
    const onRecKey = (e, down) => {
      // The native shell suppresses key events outside editable elements; the
      // recorder is a focused input so they reach us here, and we swallow them.
      e.preventDefault();
      e.stopPropagation();
      if (!recording) return;
      if (down && e.repeat) return; // OS auto-repeat
      if (e.code === "Escape" && !down && !held.current.has(0x29)) {
        stopRec();
        return;
      }
      const hid = CODE_TO_HID[e.code];
      if (hid == null) return;
      if (down && held.current.has(hid)) return;
      if (!down && !held.current.has(hid)) return;
      const now = performance.now();
      const delay = lastT.current ? Math.round(now - lastT.current) : 0;
      lastT.current = now;
      if (down) held.current.add(hid);else held.current.delete(hid);
      const cur = store.draft ? store.draft.events : [];
      if (cur.length >= s.limits.maxEvents) {
        setStatus("warn", `Slot full (${s.limits.maxEvents} events) â€” recording stopped`);
        stopRec();
        return;
      }
      updateDraft({
        events: cur.concat([{
          delay,
          hid,
          down
        }])
      });
    };
    const setEv = (i, patch) => updateDraft({
      events: events.map((e, j) => j === i ? Object.assign({}, e, patch) : e)
    });
    const delEv = i => updateDraft({
      events: events.filter((_, j) => j !== i)
    });
    const moveEv = (i, dir) => {
      const j = i + dir;
      if (j < 0 || j >= events.length) return;
      const n = events.slice();
      const t = n[i];
      n[i] = n[j];
      n[j] = t;
      updateDraft({
        events: n
      });
    };
    const unbalanced = useMemo(() => {
      const open = new Set();
      for (const e of events) {
        if (e.down) open.add(e.hid);else open.delete(e.hid);
      }
      return Array.from(open);
    }, [events]);
    const save = async () => {
      if (!d) return;
      if (!events.length) {
        setStatus("warn", "Add at least one step");
        return;
      }
      if (recording) stopRec();
      store.busy = true;
      emit();
      const r = await apiCall("save_macro", d.slot, d.name, events, d.playMode, d.playMode === 1 ? d.repeat : 1);
      store.busy = false;
      if (r && r.ok) {
        setStatus("ok", `Saved ${r.events} events to slot ${d.slot + 1}`);
        store.dirty = false;
        await refresh(apiCall, true);
        selectSlot(d.slot);
      } else setStatus("bad", r && r.error || "save failed");
    };
    if (!d) {
      return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-3"
      }, /*#__PURE__*/React.createElement("ol", {
        className: "text-[12px] text-[var(--text-dim)] leading-relaxed space-y-2 font-mono"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "01."), " Pick a slot in the Macro Library (M1\u2013M10)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "02."), " Record keystrokes or add steps by hand; tune the delays."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "03."), " ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text)]"
      }, "Save to board"), ", then bind it to a key in the Bind widget.")), /*#__PURE__*/React.createElement(Note, null, "Delays are the wait ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text)]"
      }, "before"), " each step, in milliseconds \u2014 the same convention as the vendor's recorder. The board stores up to ", s.limits.maxEvents, " steps per slot (a press and a release are two steps)."), /*#__PURE__*/React.createElement(StatusLine, null)));
    }
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full min-h-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-end gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, "Slot M", d.slot + 1, " \xB7 name (kept in Aether, the board stores only the steps)"), /*#__PURE__*/React.createElement("input", {
      className: "input",
      value: d.name,
      maxLength: 32,
      placeholder: `Macro ${d.slot + 1}`,
      onChange: e => updateDraft({
        name: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-nowrap"
    }, !recording ? /*#__PURE__*/React.createElement(Btn, {
      onClick: startRec,
      disabled: full,
      variant: "primary",
      small: true
    }, "\u25CF Record") : /*#__PURE__*/React.createElement(Btn, {
      onClick: stopRec,
      variant: "rec",
      small: true
    }, "\u25A0 Stop (Esc)"), /*#__PURE__*/React.createElement("input", {
      ref: recRef,
      readOnly: true,
      value: recording ? "recordingâ€¦ type here" : "",
      placeholder: "click Record, then type",
      onKeyDown: e => onRecKey(e, true),
      onKeyUp: e => onRecKey(e, false),
      onBlur: () => {
        if (recording) stopRec();
      },
      className: `input flex-1 min-w-[140px] h-8 py-0 font-mono text-[11px] ${recording ? "border-rose-400/60 text-rose-200" : ""}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-nowrap"
    }, /*#__PURE__*/React.createElement("select", {
      value: pickKey,
      onChange: e => setPickKey(+e.target.value),
      className: "input w-auto h-8 py-0 font-mono text-[11px]"
    }, HID_KEYS.map(([l, c]) => /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, l))), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => push(pickKey, true, 50),
      disabled: full,
      small: true
    }, "+ Down"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => push(pickKey, false, 50),
      disabled: full,
      small: true
    }, "+ Up"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => {
        push(pickKey, true, 50);
        setTimeout(() => push(pickKey, false, 50), 0);
      },
      disabled: full || events.length + 2 > s.limits.maxEvents,
      small: true
    }, "+ Tap"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => updateDraft({
        events: []
      }),
      disabled: !events.length,
      small: true
    }, "Clear")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-h-[90px] overflow-y-auto rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, events.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "p-3 font-mono text-[11px] text-[var(--text-faint)]"
    }, "No steps yet.") : events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-2 px-2 h-8 border-b border-[var(--line)]/60 last:border-b-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] w-5 text-[var(--text-faint)]"
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] w-7 text-[var(--text-faint)]"
    }, "wait"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: s.limits.maxDelay,
      value: e.delay,
      onChange: ev => setEv(i, {
        delay: Math.max(0, Math.min(s.limits.maxDelay, +ev.target.value || 0))
      }),
      className: "input w-[72px] h-6 py-0 px-1.5 font-mono text-[11px] text-right"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "ms"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEv(i, {
        down: !e.down
      }),
      title: "Toggle press / release",
      className: `w-8 h-6 rounded border font-mono text-[10px] ${e.down ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)]"}`
    }, e.down ? "â–¼" : "â–²"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)] flex-1 truncate"
    }, hidLabel(e.hid)), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveEv(i, -1),
      disabled: i === 0,
      className: "text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-30 px-1"
    }, "\u2191"), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveEv(i, 1),
      disabled: i === events.length - 1,
      className: "text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-30 px-1"
    }, "\u2193"), /*#__PURE__*/React.createElement("button", {
      onClick: () => delEv(i),
      className: "text-[var(--text-faint)] hover:text-rose-300 px-1"
    }, "\u2715")))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 font-mono text-[10px] text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, events.length, "/", s.limits.maxEvents, " steps"), unbalanced.length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-300/90"
    }, "held at end: ", unbalanced.map(hidLabel).join(", ")), s.dirty && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "unsaved")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Playback (stored in the slot header)"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 flex-nowrap"
    }, PLAY_MODES.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.v,
      onClick: () => updateDraft({
        playMode: p.v
      }),
      title: p.hint,
      className: `px-2.5 h-8 rounded-md border font-display text-[10.5px] uppercase tracking-[0.14em] transition-all
                            ${d.playMode === p.v ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)]"}
                            ${p.verified ? "" : "opacity-70"}`
    }, p.label, p.verified ? "" : " ?")), d.playMode === 1 && /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 1,
      max: s.limits.maxRepeat,
      value: d.repeat,
      onChange: e => updateDraft({
        repeat: Math.max(1, Math.min(s.limits.maxRepeat, +e.target.value || 1))
      }),
      className: "input w-[72px] h-8 py-0 px-2 font-mono text-[11px] text-right",
      title: "Repeat count"
    })), d.playMode >= 2 && /*#__PURE__*/React.createElement("div", {
      className: "mt-1"
    }, /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Toggle / Hold come from the vendor UI's option list and were never captured on the wire \u2014 the board may ignore them."))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: save,
      disabled: !connected || s.busy || !events.length,
      variant: "primary"
    }, "Save to board"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => selectSlot(d.slot),
      disabled: !s.dirty,
      small: true
    }, "Revert"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement(StatusLine, null)))));
  }

  /* ============================================================
     Widget: Bind â€” point the selected key at the selected slot
     ============================================================ */
  function BindWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected,
      selectedKeys,
      selectedKey
    } = ctx;
    const codes = selectedKeys ? Array.from(selectedKeys) : [];
    const m = s.sel != null ? macroAt(s.sel) : null;
    const canBind = connected && !s.busy && codes.length > 0 && s.sel != null && !!m;
    const boundCodes = Object.keys(s.bindings);
    const bind = async () => {
      if (!canBind) return;
      store.busy = true;
      emit();
      let ok = 0,
        err = null;
      for (const code of codes) {
        const r = await apiCall("bind_macro", code, s.sel);
        if (r && r.ok) ok++;else {
          err = r && r.error || "bind failed";
          break;
        }
      }
      store.busy = false;
      if (err) setStatus("bad", err);else setStatus("ok", `Bound ${codes.map(c => LABEL_OF_CODE[c] || c).join(", ")} â†’ M${s.sel + 1}`);
      await refresh(apiCall, true);
    };
    const unbind = async list => {
      if (!connected || !list.length) return;
      store.busy = true;
      emit();
      let err = null;
      for (const code of list) {
        const r = await apiCall("unbind_macro", code);
        if (!(r && r.ok)) {
          err = r && r.error || "unbind failed";
          break;
        }
      }
      store.busy = false;
      if (err) setStatus("bad", err);else setStatus("ok", `Restored ${list.map(c => LABEL_OF_CODE[c] || c).join(", ")}`);
      await refresh(apiCall, true);
    };
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full min-h-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center px-3 min-w-[64px] rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[11px] text-[var(--text-dim)]"
    }, codes.length > 1 ? `${codes.length} keys` : selectedKey ? LABEL_OF_CODE[selectedKey] || selectedKey : "None"), /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center text-[var(--text-faint)]"
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-md border border-[var(--line)] bg-white/[0.02] px-3 grid place-items-start py-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)] truncate w-full"
    }, s.sel == null ? "â€”" : `M${s.sel + 1}${m ? ` Â· ${m.name || `Macro ${s.sel + 1}`}` : " Â· empty"}`), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "macro slot"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: () => unbind(codes.filter(c => c in s.bindings)),
      disabled: !connected || s.busy || !codes.some(c => c in s.bindings)
    }, "Unbind"), /*#__PURE__*/React.createElement(Btn, {
      onClick: bind,
      disabled: !canBind,
      variant: "primary"
    }, "Bind")), /*#__PURE__*/React.createElement("div", {
      className: "h-4 text-[11px] font-mono tracking-[0.14em]"
    }, !codes.length && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Select a key on the Key Grid first."), codes.length > 0 && s.sel != null && !m && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Slot M", s.sel + 1, " is empty \u2014 save a macro into it first."), codes.length > 0 && s.sel == null && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Pick a macro in the Library.")), /*#__PURE__*/React.createElement(Note, null, "Binding rewrites the base keymap layer as a read-modify-write, so remaps and other bindings on the board are kept. The playback mode lives in the macro slot, so every key bound to a slot shares it."), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-h-0 overflow-y-auto"
    }, /*#__PURE__*/React.createElement(Label, null, "Bound keys", s.bindingsError ? " Â· read failed" : ""), s.bindingsError && /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, s.bindingsError), !s.bindingsError && boundCodes.length === 0 && /*#__PURE__*/React.createElement(Note, null, "No key on the board points at a macro."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1"
    }, boundCodes.map(c => {
      const slot = s.bindings[c];
      const mm = macroAt(slot);
      return /*#__PURE__*/React.createElement("div", {
        key: c,
        className: "flex items-center gap-2 px-2 h-8 rounded-md border border-[var(--line)] bg-white/[0.02]"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[12px] text-[var(--text)] w-14 truncate"
      }, LABEL_OF_CODE[c] || c), /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text-faint)]"
      }, "\u2192"), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[11px] text-[var(--accent)] flex-1 truncate"
      }, "M", slot + 1, mm ? ` Â· ${mm.name || `Macro ${slot + 1}`}` : " Â· (empty slot)"), /*#__PURE__*/React.createElement("button", {
        onClick: () => unbind([c]),
        disabled: !connected || s.busy,
        className: "text-[var(--text-faint)] hover:text-rose-300 px-1 text-[11px]"
      }, "\u2715"));
    }))), /*#__PURE__*/React.createElement(StatusLine, null)));
  }
  const MACROS_WIDGETS = [{
    id: "keygrid",
    title: "Key Grid",
    default: {
      x: 40,
      y: 32,
      w: 760,
      h: 400
    },
    min: {
      w: 520,
      h: 320
    },
    render: KeyGridWidget
  }, {
    id: "library",
    title: "Macro Library",
    default: {
      x: 820,
      y: 32,
      w: 420,
      h: 400
    },
    min: {
      w: 300,
      h: 260
    },
    render: LibraryWidget
  }, {
    id: "editor",
    title: "Macro Editor",
    default: {
      x: 40,
      y: 456,
      w: 760,
      h: 520
    },
    min: {
      w: 520,
      h: 420
    },
    render: EditorWidget
  }, {
    id: "bind",
    title: "Bind to Key",
    default: {
      x: 820,
      y: 456,
      w: 420,
      h: 520
    },
    min: {
      w: 300,
      h: 340
    },
    render: BindWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.MACROS_WIDGETS = MACROS_WIDGETS;
})();
</script>
<script data-mod="ws_settings">
(() => {
  /* ============================================================
     Settings workspace â€” app configuration & profile management.
     Exports window.AetherWorkspaces.SETTINGS_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     ============================================================ */
  const {
    useState,
    useEffect
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SubTabs = S.SubTabs,
    ToolbarButton = S.ToolbarButton;
  const I = window.AetherIcons || {};
  const ICheck = I.ICheck,
    IPlus = I.IPlus,
    ITrash = I.ITrash,
    IEdit = I.IEdit,
    IDownload = I.IDownload,
    IRefresh = I.IRefresh,
    ISettings = I.ISettings;

  /* ===== Profiles widget ===== */
  function ProfilesWidget(ctx) {
    const {
      profiles = [],
      activeId,
      activeProfileName = "Default",
      switchProfile,
      renameProfile,
      addProfile,
      duplicateProfile,
      deleteProfile
    } = ctx;
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [toast, setToast] = useState(null);
    const flash = msg => {
      setToast(msg);
      setTimeout(() => setToast(null), 2400);
    };
    const handleAdd = () => {
      if (addProfile) {
        addProfile();
        flash("Profile added");
      }
    };
    const handleSwitch = id => {
      if (switchProfile) {
        switchProfile(id);
      }
    };
    const handleStartEdit = (id, name) => {
      setEditId(id);
      setEditName(name);
    };
    const handleSaveEdit = id => {
      if (editName.trim() && renameProfile) {
        renameProfile(id, editName.trim());
        setEditId(null);
        flash(`Renamed to "${editName.trim()}"`);
      }
    };
    const handleDuplicate = id => {
      if (duplicateProfile) {
        duplicateProfile(id);
        flash("Profile duplicated");
      }
    };
    const handleDelete = id => {
      if (deleteProfile && profiles.length > 1) {
        deleteProfile(id);
        flash("Profile deleted");
      }
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Profile Management"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[13px] text-[var(--text)]"
    }, profiles.length, " profile", profiles.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
      onClick: handleAdd,
      className: "px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, IPlus && /*#__PURE__*/React.createElement("span", {
      className: "inline mr-1"
    }, IPlus && "+"), "Add"))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, profiles.map(p => {
      const isActive = activeId === p.id;
      const isEditing = editId === p.id;
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        className: `rounded-lg border p-3 transition-all ${isActive ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]" : "border-[var(--line)] bg-white/[0.02]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between gap-2"
      }, isEditing ? /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: editName,
        onChange: e => setEditName(e.target.value),
        onKeyDown: e => {
          if (e.key === "Enter") handleSaveEdit(p.id);
          if (e.key === "Escape") setEditId(null);
        },
        className: "flex-1 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2 text-[12px] text-[var(--text)] font-display outline-none",
        autoFocus: true
      }) : /*#__PURE__*/React.createElement("button", {
        onClick: () => handleSwitch(p.id),
        className: `flex-1 text-left px-2 h-7 rounded-md border transition-all ${isActive ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]" : "border-transparent bg-white/[0.02] text-[var(--text)] hover:border-[var(--line)]"} font-display text-[12px]`
      }, p.name || "Untitled", isActive && /*#__PURE__*/React.createElement("span", {
        className: "ml-2 text-[10px]"
      }, "\u2713")), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1"
      }, isEditing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleSaveEdit(p.id),
        className: "w-6 h-6 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-[11px]"
      }, "\u2713"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setEditId(null),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] flex items-center justify-center text-[11px]"
      }, "\u2715")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleStartEdit(p.id, p.name || "Untitled"),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[10px]",
        title: "Rename"
      }, IEdit ? "âœŽ" : "E"), /*#__PURE__*/React.createElement("button", {
        onClick: () => handleDuplicate(p.id),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[9px]",
        title: "Duplicate"
      }, "\u25C8"), /*#__PURE__*/React.createElement("button", {
        onClick: () => handleDelete(p.id),
        disabled: profiles.length <= 1,
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-40 flex items-center justify-center text-[10px]",
        title: "Delete"
      }, "\u2715")))));
    })), toast && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", toast));
  }

  /* ===== Theme widget ===== */
  function ThemeWidget(ctx) {
    const {
      theme = "dark",
      setTheme,
      setThemeOpen
    } = ctx;
    const themes = [{
      id: "dark",
      label: "Dark",
      desc: "Dim background, bright accents"
    }, {
      id: "light",
      label: "Light",
      desc: "Bright background, muted accents"
    }, {
      id: "auto",
      label: "Auto",
      desc: "Match system preference"
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Appearance"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, themes.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTheme && setTheme(t.id),
      className: `text-left rounded-lg border p-2.5 transition-all ${theme === t.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] text-[var(--text)]"
    }, t.label), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, t.desc)), theme === t.id && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "\u2713"))))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setThemeOpen && setThemeOpen(true),
      className: "w-full h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, "Customize Colors"));
  }

  /* ===== System widget: launch behaviour (Windows) =====
     Two independent toggles, both read/written through the bridge:
       Start on launch  â†’ HKCU\...\Run entry (get_autostart / set_autostart)
       Start minimized  â†’ settings.json `startMinimized` (get_tray_prefs /
                          set_start_minimized): every launch begins hidden in
                          the tray with the lighting running.
     The widget hides itself on platforms where neither is supported. */
  const Toggle = ({
    on,
    onClick,
    label,
    desc
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white/[0.02] p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[12px] text-[var(--text)]"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5 leading-snug"
  }, desc)), /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    role: "switch",
    "aria-checked": on,
    "aria-label": label,
    className: `relative w-12 h-6 rounded-full border transition-colors shrink-0
                  ${on ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `absolute top-0.5 rounded-full transition-all
                        ${on ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
    style: {
      width: 18,
      height: 18
    }
  })));
  function SystemWidget() {
    const [autostart, setAutostart] = useState({
      supported: false,
      enabled: false
    });
    const [tray, setTray] = useState({
      supported: false,
      startMinimized: false
    });
    const [err, setErr] = useState("");

    // The bridge can mount after first paint (WebView2) â€” poll until it answers
    // once, then stop; both reads are cheap registry/JSON lookups.
    useEffect(() => {
      let cancelled = false,
        done = false;
      const probe = () => {
        const api = window.pywebview?.api;
        if (!api || done) return;
        done = true;
        if (api.get_autostart) api.get_autostart().then(r => {
          if (!cancelled && r && r.ok) setAutostart({
            supported: !!r.supported,
            enabled: !!r.enabled
          });
        }).catch(() => {});
        if (api.get_tray_prefs) api.get_tray_prefs().then(r => {
          if (!cancelled && r && r.ok) setTray({
            supported: !!r.supported,
            startMinimized: !!r.startMinimized
          });
        }).catch(() => {});
      };
      probe();
      const id = setInterval(() => {
        probe();
        if (done) clearInterval(id);
      }, 500);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }, []);
    const flip = async (fn, next, apply, revert) => {
      apply(next);
      setErr("");
      const api = window.pywebview?.api;
      if (!api || !api[fn]) return;
      try {
        const r = await api[fn](next);
        if (!(r && r.ok)) {
          revert();
          setErr(r && r.error || "failed");
        }
      } catch (e) {
        revert();
        setErr(String(e));
      }
    };
    const toggleAutostart = () => flip("set_autostart", !autostart.enabled, v => setAutostart(s => ({
      ...s,
      enabled: v
    })), () => setAutostart(s => ({
      ...s,
      enabled: !s.enabled
    })));
    const toggleMinimized = () => flip("set_start_minimized", !tray.startMinimized, v => setTray(s => ({
      ...s,
      startMinimized: v
    })), () => setTray(s => ({
      ...s,
      startMinimized: !s.startMinimized
    })));
    if (!autostart.supported && !tray.supported) {
      return /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[10.5px] text-[var(--text-faint)] leading-relaxed"
      }, "Launch options (start with the OS, start minimized to the tray) are available on Windows.");
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Launch"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, autostart.supported && /*#__PURE__*/React.createElement(Toggle, {
      on: autostart.enabled,
      onClick: toggleAutostart,
      label: "Start on launch",
      desc: "Open Aether automatically when you sign in to Windows."
    }), tray.supported && /*#__PURE__*/React.createElement(Toggle, {
      on: tray.startMinimized,
      onClick: toggleMinimized,
      label: "Start minimized",
      desc: "Launch hidden in the system tray with your lighting running. Open the window from the tray icon."
    })), err && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-rose-300/90"
    }, err), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "Closing the window keeps Aether in the tray; right-click the icon for Open, Hide window, Mini mode and Exit."));
  }

  /* ===== Backup/Import widget ===== */
  function BackupWidget(ctx) {
    const {
      applyState,
      collectState,
      profiles
    } = ctx;
    const [message, setMessage] = useState("");
    const handleExport = () => {
      try {
        // Capture the REAL current configuration. collectState() is the exact
        // flat shape applyState() consumes on import, so export->import round-
        // trips; profiles is included so the whole saved set travels with it.
        const live = typeof collectState === "function" && collectState() || {};
        const state = {
          timestamp: new Date().toISOString(),
          app: "AetherHE",
          profiles: Array.isArray(profiles) ? profiles : [],
          ...live
        };
        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `aether-backup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage("Settings exported");
        setTimeout(() => setMessage(""), 2400);
      } catch (e) {
        setMessage("Export failed");
        setTimeout(() => setMessage(""), 2400);
      }
    };
    const handleImport = async () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          if (applyState && typeof applyState === "function") {
            applyState(data);
            setMessage("Settings imported");
            setTimeout(() => setMessage(""), 2400);
          }
        } catch (err) {
          setMessage("Import failed");
          setTimeout(() => setMessage(""), 2400);
        }
      };
      input.click();
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Settings"), /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4"
    }, "Export or import your configuration. Backups include profiles, keymaps, lighting effects, and all settings."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleExport,
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, IDownload ? "â†“" : "Export", " Export"), /*#__PURE__*/React.createElement("button", {
      onClick: handleImport,
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, IDownload ? "â†‘" : "Import", " Import")), message && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", message));
  }

  /* ===== About/Update widget ===== */
  function AboutWidget(ctx) {
    const {
      setWizardOpen,
      setSubmitOpen
    } = ctx;
    const [version, setVersion] = useState("â€”");
    // `info` holds the check_update() result â€” apply_update REQUIRES the asset
    // url/name from it (Api.apply_update(asset_url, asset_name)); calling it bare
    // raises a missing-argument TypeError.
    const [updateState, setUpdateState] = useState({
      phase: "idle",
      msg: "",
      info: null
    });
    useEffect(() => {
      const api = window.pywebview?.api;
      if (!api?.app_version) return;
      api.app_version().then(r => {
        if (r?.ok) setVersion(r.version);
      }).catch(() => {});
    }, []);
    const checkUpdate = async () => {
      const api = window.pywebview?.api;
      if (!api?.check_update) return;
      setUpdateState({
        phase: "checking",
        msg: "Checking for updatesâ€¦",
        info: null
      });
      try {
        const r = await api.check_update();
        if (!r?.ok) {
          // Surface the real reason (rate limit, offline, DNS) instead of a bare
          // "Check failed" â€” this is the only place the user can see it.
          setUpdateState({
            phase: "error",
            msg: `Check failed: ${r?.error || "unknown error"}`,
            info: null
          });
          return;
        }
        // updater.check_for_update() returns `update` / `latest` / `asset_url`.
        // (It has never returned `available` or `version`: reading those meant
        // this button reported "You're up to date" even when a release existed.)
        if (r.update) {
          setUpdateState({
            phase: "available",
            msg: `Update available: v${r.latest}`,
            info: r
          });
        } else if (r.newer) {
          // Newer release exists but ships no asset this OS can install.
          setUpdateState({
            phase: "uptodate",
            msg: `v${r.latest} available, but no installer for this platform`,
            info: null
          });
        } else {
          setUpdateState({
            phase: "uptodate",
            msg: "You're up to date",
            info: null
          });
        }
      } catch (e) {
        setUpdateState({
          phase: "error",
          msg: `Check failed: ${e}`,
          info: null
        });
      }
    };
    const applyUpdate = async () => {
      const api = window.pywebview?.api;
      const info = updateState.info;
      if (!api?.apply_update || !info?.asset_url) return;
      setUpdateState(s => ({
        ...s,
        phase: "installing",
        msg: "Downloadingâ€¦"
      }));
      // The installer is ~20 MB; poll so the window isn't silently frozen. The
      // timer is cleared in every exit path below (including the throw).
      let poll = null;
      if (api.update_progress) {
        poll = setInterval(async () => {
          try {
            const p = await api.update_progress();
            if (!p?.ok) return;
            if (p.phase === "downloading" && p.total) {
              const mb = n => (n / 1048576).toFixed(1);
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: `Downloadingâ€¦ ${p.pct}%  (${mb(p.done)} / ${mb(p.total)} MB)`
              } : s);
            } else if (p.phase === "verified") {
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: "Verifying downloadâ€¦"
              } : s);
            } else if (p.phase === "installing") {
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: "Installingâ€¦"
              } : s);
            }
          } catch {}
        }, 400);
      }
      const stop = () => {
        if (poll) {
          clearInterval(poll);
          poll = null;
        }
      };
      try {
        const r = await api.apply_update(info.asset_url, info.asset_name, info.asset_size, info.asset_sha256);
        stop();
        if (!r?.ok) {
          setUpdateState(s => ({
            ...s,
            phase: "error",
            msg: `Installation failed: ${r?.error || "unknown error"}`
          }));
          return;
        }
        // Windows launches the installer and the app must quit; Flatpak installs
        // in place and needs a manual restart. Say which one happened.
        const msg = r.quit ? "Installer launched â€” Aether will close and reopen." : r.restart ? "Update installed â€” quit and reopen Aether to apply it." : r.path ? `Downloaded to ${r.path}` : "Update complete";
        setUpdateState(s => ({
          ...s,
          phase: "installed",
          msg
        }));
      } catch (e) {
        stop();
        setUpdateState(s => ({
          ...s,
          phase: "error",
          msg: `Installation failed: ${e}`
        }));
      }
    };
    const openWizard = () => {
      if (setWizardOpen) setWizardOpen(true);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "About"), /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg border border-[var(--line)] bg-white/[0.02] p-3 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "Version"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)]"
    }, version)), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "AetherHE Desktop Controller")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: checkUpdate,
      disabled: updateState.phase === "checking",
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 disabled:opacity-50 transition-all"
    }, IRefresh ? "â†»" : "Check", " Check for Updates"), (updateState.phase === "available" || updateState.phase === "installing") && /*#__PURE__*/React.createElement("button", {
      onClick: applyUpdate,
      disabled: updateState.phase === "installing",
      className: "h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 disabled:opacity-50 transition-all"
    }, updateState.phase === "installing" ? "Installingâ€¦" : "Install Update"), /*#__PURE__*/React.createElement("button", {
      onClick: openWizard,
      className: "h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-all"
    }, "Setup Wizard"), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setSubmitOpen && setSubmitOpen(true)
    }, "Submit a board")), updateState.msg && /*#__PURE__*/React.createElement("div", {
      className: `text-[11px] font-mono uppercase tracking-[0.16em] ${updateState.phase === "error" ? "text-rose-300" : "text-[var(--text-faint)]"}`
    }, updateState.msg));
  }

  /* ===== Widget array export ===== */
  const SETTINGS_WIDGETS = [{
    id: "profiles",
    title: "Profiles",
    default: {
      x: 40,
      y: 32,
      w: 380,
      h: 380
    },
    min: {
      w: 300,
      h: 280
    },
    render: ProfilesWidget
  }, {
    id: "theme",
    title: "Theme",
    default: {
      x: 440,
      y: 32,
      w: 340,
      h: 280
    },
    min: {
      w: 280,
      h: 220
    },
    render: ThemeWidget
  }, {
    id: "backup",
    title: "Backup",
    default: {
      x: 40,
      y: 432,
      w: 380,
      h: 240
    },
    min: {
      w: 300,
      h: 180
    },
    render: BackupWidget
  }, {
    id: "about",
    title: "About/Update",
    default: {
      x: 440,
      y: 432,
      w: 340,
      h: 320
    },
    min: {
      w: 280,
      h: 240
    },
    render: AboutWidget
  }, {
    id: "system",
    title: "System",
    default: {
      x: 800,
      y: 32,
      w: 360,
      h: 300
    },
    min: {
      w: 300,
      h: 220
    },
    render: SystemWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.SETTINGS_WIDGETS = SETTINGS_WIDGETS;
})();
</script>
<script data-mod="ws_socd">
(() => {
  /* SOCD Workspace: 3-widget layout for key pair editor, hotkey control, and active pairs list */
  const {
    useState,
    useEffect
  } = React;
  const {
    IPlus,
    ITrash,
    IUnlink,
    ICheck
  } = window.AetherIcons;
  const {
    Chip,
    ToolbarButton
  } = window.AetherSections;
  const BASIC_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1!", "2@", "3#", "$4", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+", "{[", "}]", "\\|", "<>", ";:", "'\"", "`~", ",<", ".>", "/?"];
  const EXTENDED_KEYS = ["Esc", "Tab", "Caps", "Back", "Enter", "Space", "L-Ctrl", "R-Ctrl", "L-Shift", "R-Shift", "L-Alt", "R-Alt", "L-Win", "R-Win", "Menu", "Left", "Up", "Right", "Down", "PrtSc", "ScrLk", "Pause", "Ins", "Home", "Del", "End", "PgUp", "PgDn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];

  /* ===== KeyGrid: collapsible key picker ===== */
  const KeyGrid = ({
    title,
    keys,
    picked,
    onPick
  }) => {
    const [open, setOpen] = useState(true);
    const IChevronD = window.AetherIcons?.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-2 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em]"
    }, title)), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5 mb-3"
    }, keys.map(k => {
      const active = picked === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => onPick(k),
        className: `h-9 rounded-md border font-mono text-[11px] transition-all
                            ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
      }, k);
    })));
  };

  /* ===== Pair Editor Widget ===== */
  const PairEditorWidget = ctx => {
    const {
      socdProfiles,
      setSocdProfiles,
      socdActive,
      setSocdActive
    } = ctx;
    const [editTarget, setEditTarget] = useState("k1"); // "k1" or "k2"
    const cur = socdProfiles.find(p => p.id === socdActive) || socdProfiles[0];
    const updateActive = patch => {
      setSocdProfiles(ps => ps.map(p => p.id === socdActive ? {
        ...p,
        ...patch
      } : p));
    };
    const addProfile = () => {
      if (socdProfiles.length >= 20) return; // enforce the advertised /20 cap
      // Smallest unused SOCDn id â€” length-based ids collide after a delete.
      const used = new Set(socdProfiles.map(p => p.id));
      let n = 1;
      while (used.has(`SOCD${n}`)) n++;
      const next = `SOCD${n}`;
      setSocdProfiles([...socdProfiles, {
        id: next,
        k1: "",
        k2: "",
        mode: 1
      }]);
      setSocdActive(next);
    };
    const delActive = () => {
      if (socdProfiles.length <= 1) return;
      const remaining = socdProfiles.filter(p => p.id !== socdActive);
      setSocdProfiles(remaining);
      setSocdActive(remaining[0].id);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 1"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k1"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                         ${editTarget === "k1" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : cur?.k1 ? "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, cur?.k1 || "â€”")), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] mt-5"
    }, IUnlink && /*#__PURE__*/React.createElement(IUnlink, {
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 2"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k2"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                         ${editTarget === "k2" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : cur?.k2 ? "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, cur?.k2 || "â€”"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5"
    }, [1, 2, 3, 4].map(m => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => updateActive({
        mode: m
      }),
      className: `flex items-center gap-2 px-3 h-9 rounded-md border font-mono text-[12px] transition-all
                        ${cur?.mode === m ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-3 h-3 rounded-full border ${cur?.mode === m ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--text-faint)]"}`
    }), "Model ", m))), editTarget === "k1" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Key 1"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k1,
      onPick: k => {
        updateActive({
          k1: k
        });
        setEditTarget("k2");
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k1,
      onPick: k => {
        updateActive({
          k1: k
        });
        setEditTarget("k2");
      }
    })), editTarget === "k2" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Key 2"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k2,
      onPick: k => {
        updateActive({
          k2: k
        });
        setEditTarget(null);
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k2,
      onPick: k => {
        updateActive({
          k2: k
        });
        setEditTarget(null);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 text-[11.5px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] font-display uppercase tracking-[0.18em] text-[10.5px] mb-2"
    }, "When both Key1 and Key2 fire:"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 font-mono text-[10px]"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 1"), " \xB7 First press wins; second is interrupted."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 2"), " \xB7 Key1 interrupts Key2."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 3"), " \xB7 Key2 interrupts Key1."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 4"), " \xB7 Later-triggered key wins (Snap Tap)."))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: addProfile,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " New"), /*#__PURE__*/React.createElement("button", {
      onClick: delActive,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 font-display text-[11px] uppercase tracking-[0.16em]"
    }, ITrash && /*#__PURE__*/React.createElement(ITrash, {
      size: 12
    }), " Delete")));
  };

  /* ===== Hotkey Widget ===== */
  const HotkeyWidget = ctx => {
    const {
      hotkey,
      hotkeyEnabled,
      setHotkeyEnabled,
      handleSocdApply,
      socdProfiles
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4 h-full"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Switch hotkey"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setHotkeyEnabled(!hotkeyEnabled),
      className: `relative w-10 h-5 rounded-full border transition-colors w-full flex items-center justify-between px-3
                      ${hotkeyEnabled ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                            ${hotkeyEnabled ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] mb-1"
    }, "Active hotkey"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[13px] text-[var(--accent)]"
    }, hotkey || "â€”")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 flex-1 flex flex-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] mb-2"
    }, "Status"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex flex-col justify-center"
    }, hotkeyEnabled ? /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display uppercase tracking-[0.16em] text-[var(--accent)] mb-1"
    }, "Enabled"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] text-[var(--text-dim)]"
    }, "Press ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[var(--accent)]"
    }, hotkey), " to cycle SOCD profiles")) : /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display uppercase tracking-[0.16em] mb-1"
    }, "Disabled"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px]"
    }, "Toggle to enable hotkey switching")))), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleSocdApply && handleSocdApply(socdProfiles, hotkeyEnabled),
      className: "px-4 h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.16em] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110"
    }, "Apply"));
  };

  /* ===== Active Pairs Widget ===== */
  const ActivePairsWidget = ctx => {
    const {
      socdProfiles,
      socdActive,
      setSocdActive
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-2"
    }, socdProfiles.length, "/20 pairs")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5 flex-1 overflow-y-auto"
    }, socdProfiles.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => setSocdActive(p.id),
      className: `flex flex-col px-3 py-2 rounded-md border font-mono text-[12px] transition-all
                        ${socdActive === p.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.16em]"
    }, p.id), p.k1 && p.k2 ? /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-[var(--text-faint)] mt-1"
    }, p.k1, " ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "\u2194"), " ", p.k2, /*#__PURE__*/React.createElement("span", {
      className: "ml-2 font-display text-[9px]"
    }, "M", p.mode)) : /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-[var(--text-faint)] mt-1"
    }, "unconfigured")))));
  };

  /* ============================================================
     Board-aware dispatch (ADDITIVE â€” the Win60 path is untouched).
  
     The three widget bodies above are the Aula Win60 HE's SOCD UI, driven by
     that board's own cmd-36 PRCS mechanism. Boards that instead keep their
     bindings in a 512-byte key table (the MINI 60 HE PRO's advanced keys:
     DKS/MT/TGL/SOCD/RS + plain remap) get a different body, supplied by
     src/components/advanced-keys.jsx.
  
     The switch is a capability gate. It resolves to show:false for the
     Win60 AND for the no-board / plain-browser fail-open path, so those
     render exactly the same element tree as before this file changed â€” the
     only difference is one extra pass-through component layer, which emits
     no DOM of its own.
  
     Lookups are done at RENDER time (not module-eval time) because
     build_runtime.py compiles workspaces/ before src/components/, so
     window.AetherAdvancedKeys / window.AetherBoard do not exist yet when
     this file is evaluated.
     ============================================================ */
  const FALLBACK_BOARD_CTX = React.createContext(null);
  const useBoardSafe = () => {
    const B = window.AetherBoard;
    const val = React.useContext(B && B.BoardContext || FALLBACK_BOARD_CTX);
    return val || B && B.UNKNOWN_BOARD || null;
  };
  const boardAware = (Win60Body, advBodyName) => {
    const Dispatcher = ctx => {
      const board = useBoardSafe();
      const A = window.AetherAdvancedKeys;
      const gate = A ? A.advancedKeysGate(board) : {
        show: false
      };
      if (gate.show && A && A[advBodyName]) {
        return React.createElement(A[advBodyName], {
          ctx,
          gate
        });
      }
      return /*#__PURE__*/React.createElement(Win60Body, ctx);
    };
    Dispatcher.displayName = `BoardAware(${advBodyName})`;
    return Dispatcher;
  };

  /* ===== Widget Array Export ===== */
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.SOCD_WIDGETS = [{
    id: "pair-editor",
    title: "Pair Editor",
    default: {
      x: 20,
      y: 20,
      w: 440,
      h: 520
    },
    min: {
      w: 320,
      h: 400
    },
    render: boardAware(PairEditorWidget, "AdvancedKeyEditor")
  }, {
    id: "hotkey",
    title: "Hotkey",
    default: {
      x: 480,
      y: 20,
      w: 360,
      h: 160
    },
    min: {
      w: 280,
      h: 120
    },
    render: boardAware(HotkeyWidget, "AdvancedKeyStatus")
  }, {
    id: "active-pairs",
    title: "Active Pairs",
    default: {
      x: 480,
      y: 200,
      w: 360,
      h: 340
    },
    min: {
      w: 280,
      h: 240
    },
    render: boardAware(ActivePairsWidget, "AdvancedKeyBindings")
  }];
})();
</script>
<script data-mod="comp_advanced-keys">
(() => {
  /* ============================================================
     AdvancedKeys â€” MINI 60 HE PRO advanced key types + plain remap.
  
     ADDITIVE ONLY. Nothing in this file runs on the Aula Win60 HE:
     `advancedKeysGate()` returns show:false for that board (and for the
     no-board / plain-browser fail-open path), so socd.jsx renders its
     original widgets byte-for-byte unchanged.
  
     WHAT THIS SURFACES
     ------------------
     The MINI 60 HE PRO keeps EVERY key binding â€” plain remap and all five
     advanced key types â€” in one 512-byte key table (GET 0x12 / SET 0x22,
     126 x 4-byte records indexed by MATRIX position). The Fn layer is a
     second, identically formatted table (0x16 / 0x26). A record is
     [pageType, p1, p2, p3]:
  
       pageType  2  REMAP  [02, modmask, hidUsage, 00]
       pageType  8  DKS    [08, dksSlot,  00, 00]  + 1024-byte travel table (0x18/0x28)
       pageType  9  MT     [09, tapHid, holdHid, delayRaw]
       pageType 10  TGL    [0A, hidUsage, 00, 00]
       pageType 11  SOCD   [0B, mode, hidA, hidB]   written to BOTH keys of the pair
       pageType 12  RS     [0C, 00,   hidA, hidB]   written to BOTH keys of the pair
  
     PROVENANCE (docs/context/issue-6-mini60-pro-raw/)
       CAPTURED  = byte-matched against a real frame in the 2.4GHz / wired
                   WebHID captures (FULL_APP_CAPTURE_NOTES.md Â§3,
                   analyze_advkeys.py output).
       SOURCE    = read from the vendor's own bundle (HFD_SDK_DECODE.md Â§5)
                   and NEVER seen on the wire. Shown, never trusted.
  
     WRITE PATH: app_web.py now exposes the bridge â€” set_key_remap,
     set_advanced_socd / _rs / _mt / _tgl, clear_advanced_key and
     read_key_records â€” each resolving design codes to firmware key indices
     through the active board's keymap and refusing loudly if that resolution
     fails (an unbound record reads back all-zero, so a table cannot be searched
     for "the key that sends 0x04"; writing to a guessed slot is not an option).
     The driver underneath does strict read-modify-write and aborts before any
     write if the read fails.
  
     WRITE_PATH_EXISTS below is the single switch. It is ON. What is still
     disabled is disabled on evidence, not plumbing: DKS (its action slots are
     authored by physically pressing keys in the vendor app and the encoding is
     undecoded) and the three SOCD modes never observed on the wire.
  
     Exposes window.AetherAdvancedKeys = {
       advancedKeysGate, AdvancedKeyEditor, AdvancedKeyStatus,
       AdvancedKeyBindings, CompetitiveWarning, ADV_TYPES, HID_KEYS
     }.
     ============================================================ */

  const {
    useState,
    useEffect
  } = React;

  /* ---- the one switch: is there a backend that can write the key table? ---- */
  const WRITE_PATH_EXISTS = true; // app_web.py Api: set_key_remap / set_advanced_* / clear_advanced_key

  /* Boards whose advanced keys are decoded from a real capture but whose
     registry entry does not (yet) carry an `advancedKeys` flag. The registry is
     owned elsewhere; when it declares the flag, the flag wins and this list is
     never consulted. Matching a slug here yields "wip" â€” surfaced, never driven. */
  const CAPTURED_ADV_SLUGS = /^aula-mini60he-pro(-24g)?$/;

  /* ============================================================
     Capability gate
     ============================================================ */
  function advancedKeysGate(board) {
    const b = board || {};
    const raw = typeof b.cap === "function" ? b.cap("advancedKeys") : undefined;
    const slug = b.board && b.board.slug || "";
    let state, source;
    if (raw !== undefined) {
      state = b.capState("advancedKeys"); // "yes" | "wip" | "no"
      source = "registry";
    } else if (CAPTURED_ADV_SLUGS.test(slug)) {
      state = "wip"; // decoded on the wire, not wired up
      source = "capture";
    } else {
      // Flag absent AND board unknown to us -> behave exactly like today.
      state = b.capabilities ? "no" : "unknown";
      source = "registry";
    }
    return {
      state,
      source,
      show: state === "yes" || state === "wip",
      drivable: state === "yes" && !!b.drivable && WRITE_PATH_EXISTS,
      reason: !WRITE_PATH_EXISTS ? "No write path yet: the driver can build these records, but no bridge method exposes it to the UI â€” nothing on this panel is sent to the keyboard." : state === "wip" ? "Capability is marked work-in-progress in the board registry â€” read-only." : ""
    };
  }

  /* ============================================================
     HID usage codes (USB HID Keyboard/Keypad page 0x07)
     Cross-checked against the capture: SOCD pair wrote 04/07 (A/D),
     RS pair wrote 14/08 (Q/E).
     ============================================================ */
  const HID_KEYS = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => HID_KEYS.push([c, 0x04 + i]));
  [["1", 0x1e], ["2", 0x1f], ["3", 0x20], ["4", 0x21], ["5", 0x22], ["6", 0x23], ["7", 0x24], ["8", 0x25], ["9", 0x26], ["0", 0x27], ["Enter", 0x28], ["Esc", 0x29], ["Back", 0x2a], ["Tab", 0x2b], ["Space", 0x2c], ["-_", 0x2d], ["=+", 0x2e], ["[{", 0x2f], ["]}", 0x30], ["\\|", 0x31], [";:", 0x33], ["'\"", 0x34], ["`~", 0x35], [",<", 0x36], [".>", 0x37], ["/?", 0x38], ["Caps", 0x39], ["F1", 0x3a], ["F2", 0x3b], ["F3", 0x3c], ["F4", 0x3d], ["F5", 0x3e], ["F6", 0x3f], ["F7", 0x40], ["F8", 0x41], ["F9", 0x42], ["F10", 0x43], ["F11", 0x44], ["F12", 0x45], ["PrtSc", 0x46], ["ScrLk", 0x47], ["Pause", 0x48], ["Ins", 0x49], ["Home", 0x4a], ["PgUp", 0x4b], ["Del", 0x4c], ["End", 0x4d], ["PgDn", 0x4e], ["Right", 0x4f], ["Left", 0x50], ["Down", 0x51], ["Up", 0x52], ["L-Ctrl", 0xe0], ["L-Shift", 0xe1], ["L-Alt", 0xe2], ["L-Win", 0xe3], ["R-Ctrl", 0xe4], ["R-Shift", 0xe5], ["R-Alt", 0xe6], ["R-Win", 0xe7]].forEach(p => HID_KEYS.push(p));
  const HID_BY_CODE = {};
  HID_KEYS.forEach(([label, code]) => {
    HID_BY_CODE[code] = label;
  });
  const hidLabel = code => code ? HID_BY_CODE[code] || "?" : "â€”";
  const hex2 = n => (n & 0xff).toString(16).toUpperCase().padStart(2, "0");

  /* ============================================================
     SOCD behaviour modes.
     The vendor's own SOCDOptions list carries FOUR values (3, 1, 2, 4) whose
     labels are i18n keys that are not present in the unpacked bundle. Exactly
     ONE of them â€” 0x03 â€” was ever seen on the wire. The other three are listed
     so the user knows they exist, and are NOT selectable.
     ============================================================ */
  const SOCD_MODES = [{
    v: 0x03,
    label: "Key 1 priority",
    verified: true,
    note: "The one mode proven on the wire: the vendor's \"Key 1 Priority\" wrote 0B 03 04 07 into BOTH keys of the pair (indices 49 and 51)."
  }, {
    v: 0x01,
    label: "Undecoded mode",
    verified: false,
    note: "The vendor's list holds four values (3, 1, 2, 4) and its UI shows four labels (last input / key 1 priority / key 2 priority / neutralize). Only the 0x03 pairing was captured; which label 0x01 carries is not decoded."
  }, {
    v: 0x02,
    label: "Undecoded mode",
    verified: false,
    note: "A separate wired session did write 0x02 for a pair the vendor UI called \"absolute button 2 priority\", but that single unlabelled-in-code observation is not enough to publish a behaviour, so Aether does not offer it."
  }, {
    v: 0x04,
    label: "Undecoded mode",
    verified: false,
    note: "Present in the vendor's value list, never captured, behaviour not decoded."
  }];
  const ADV_TYPES = [{
    id: "remap",
    page: 2,
    name: "Remap",
    blurb: "Plain key remap â€” one HID usage code."
  }, {
    id: "socd",
    page: 11,
    name: "SOCD",
    blurb: "Two keys + behaviour mode. Same record written to BOTH keys."
  }, {
    id: "rs",
    page: 12,
    name: "RS",
    blurb: "Rapid SOCD / snap keys â€” two keys, deeper press wins."
  }, {
    id: "mt",
    page: 9,
    name: "MT",
    blurb: "Mod-tap: hold vs tap on one key, plus a trigger-delay byte."
  }, {
    id: "tgl",
    page: 10,
    name: "TGL",
    blurb: "Toggle on/off on one key. No parameters."
  }, {
    id: "dks",
    page: 8,
    name: "DKS",
    blurb: "Up to 4 actions on one key by press depth + a travel table."
  }];

  /* ============================================================
     Local (host-side) binding store â€” shared by the three widgets, which are
     independent widget frames and cannot share App state (app.jsx is owned
     elsewhere). Nothing here is persisted or transmitted.
     ============================================================ */
  const store = {
    bindings: [],
    sel: null,
    listeners: new Set(),
    seq: 1
  };
  const emit = () => store.listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {}
  });
  const useStore = () => {
    const [, force] = useState(0);
    useEffect(() => {
      const fn = () => force(n => n + 1);
      store.listeners.add(fn);
      return () => store.listeners.delete(fn);
    }, []);
    return store;
  };
  const addBinding = b => {
    b.id = "B" + store.seq++;
    store.bindings = store.bindings.concat([b]);
    store.sel = b.id;
    emit();
  };
  const removeBinding = id => {
    store.bindings = store.bindings.filter(b => b.id !== id);
    if (store.sel === id) store.sel = store.bindings.length ? store.bindings[0].id : null;
    emit();
  };
  const selectBinding = id => {
    store.sel = id;
    emit();
  };

  /* Compose the 4-byte key-table record for a draft binding. */
  function recordFor(d) {
    switch (d.type) {
      case "remap":
        return [0x02, d.mod & 0xff, d.hidA & 0xff, 0x00];
      case "dks":
        return [0x08, d.slot & 0xff, 0x00, 0x00];
      case "mt":
        return [0x09, 0x00, 0x00, d.delayRaw & 0xff];
      case "tgl":
        return [0x0a, 0x00, 0x00, 0x00];
      case "socd":
        return [0x0b, d.mode & 0xff, d.hidA & 0xff, d.hidB & 0xff];
      case "rs":
        return [0x0c, 0x00, d.hidA & 0xff, d.hidB & 0xff];
      default:
        return [0, 0, 0, 0];
    }
  }
  const recordHex = d => recordFor(d).map(hex2).join(" ");

  /* ============================================================
     Small presentational helpers
     ============================================================ */
  const Label = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
  }, children);
  const Note = ({
    tone = "dim",
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: `text-[10.5px] leading-relaxed ${tone === "warn" ? "text-amber-300/90" : tone === "bad" ? "text-rose-300/90" : "text-[var(--text-dim)]"}`
  }, children);
  const Tag = ({
    kind
  }) => {
    const map = {
      captured: ["Captured", "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"],
      source: ["Source only", "border-amber-400/30 bg-amber-500/10 text-amber-300"],
      unknown: ["Not decoded", "border-rose-400/30 bg-rose-500/10 text-rose-300"]
    };
    const [text, cls] = map[kind] || map.unknown;
    return /*#__PURE__*/React.createElement("span", {
      className: `inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-[0.18em] border ${cls}`
    }, text);
  };

  /* The competitive-play warning the vendor's own UI carries. Real user-harm
     issue: shown wherever SOCD or RS is exposed. */
  function CompetitiveWarning({
    compact
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-rose-400/40 bg-rose-500/[0.07] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-rose-300 mb-1"
    }, "Competitive-play warning"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] leading-relaxed text-rose-200/90"
    }, "SOCD / snap-tap style key resolution is ", /*#__PURE__*/React.createElement("span", {
      className: "font-semibold"
    }, "restricted or banned"), " by some competitive games \u2014 the vendor's own driver names ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "CS2"), " explicitly and warns that using it can get your account banned.", !compact && " Aether repeats that warning rather than hiding it: enabling SOCD or RS is your call and your risk."));
  }

  /* Compact HID key picker. */
  const HidPicker = ({
    title,
    value,
    onPick
  }) => {
    const [open, setOpen] = useState(false);
    const IChevronD = window.AetherIcons && window.AetherIcons.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-1.5 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em]"
    }, title), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] text-[var(--accent)]"
    }, hidLabel(value), value ? ` Â· 0x${hex2(value)}` : "")), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5 mb-2"
    }, HID_KEYS.map(([label, code]) => /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => {
        onPick(code);
        setOpen(false);
      },
      className: `h-8 rounded-md border font-mono text-[10.5px] transition-all
                          ${value === code ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
    }, label))));
  };

  /* ============================================================
     Editor widget body (replaces the Win60 pair editor ONLY on a board that
     declares the capability).
     ============================================================ */
  function AdvancedKeyEditor({
    ctx,
    gate
  }) {
    const [type, setType] = useState("socd");
    const [keyIndex, setKeyIndex] = useState(49);
    const [keyIndexB, setKeyIndexB] = useState(51);
    const [hidA, setHidA] = useState(0x04);
    const [hidB, setHidB] = useState(0x07);
    const [mode, setMode] = useState(0x03);
    const [delayRaw, setDelayRaw] = useState(40);
    const [slot, setSlot] = useState(0);
    useStore();
    const draft = {
      type,
      keyIndex,
      keyIndexB,
      hidA,
      hidB,
      mode,
      delayRaw,
      slot
    };
    const def = ADV_TYPES.find(t => t.id === type) || ADV_TYPES[0];
    const isPair = type === "socd" || type === "rs";
    const stage = () => addBinding(Object.assign({}, draft, {
      rec: recordFor(draft)
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3.5 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-amber-400/35 bg-amber-500/[0.06] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-amber-300"
    }, "Advanced keys \xB7 unverified"), /*#__PURE__*/React.createElement(Tag, {
      kind: gate.state === "yes" ? "captured" : "source"
    })), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, ctx && ctx.board && ctx.board.name || "This board", " exposes its key bindings through one 512-byte key table (GET ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x12"), " / SET ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x22"), ", 126 records of 4 bytes, indexed by matrix position; the Fn layer is a second table on", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0x16/0x26"), "). Every type below rides that table.", /*#__PURE__*/React.createElement("div", {
      className: "mt-1.5 text-rose-300/90"
    }, gate.reason))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5"
    }, ADV_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setType(t.id),
      className: `flex flex-col items-start px-2.5 py-1.5 rounded-md border transition-all
                        ${type === t.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em]"
    }, t.name), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "page ", t.page)))), /*#__PURE__*/React.createElement(Note, null, def.blurb), /*#__PURE__*/React.createElement("div", {
      className: "flex items-end gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, isPair ? "Key 1 Â· table index" : "Key Â· table index"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 125,
      value: keyIndex,
      onChange: e => setKeyIndex(Math.max(0, Math.min(125, +e.target.value || 0))),
      className: "w-full h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    })), isPair && /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, "Key 2 \xB7 table index"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 125,
      value: keyIndexB,
      onChange: e => setKeyIndexB(Math.max(0, Math.min(125, +e.target.value || 0))),
      className: "w-full h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    }))), /*#__PURE__*/React.createElement(Note, null, "Records are indexed by ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "matrix"), " position, not by on-screen key order (16-column stride; row bases 0/16/32/48/64/80). The index is entered directly here because Aether's key picker for this board maps design codes, not matrix slots."), type === "remap" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2"
    }, /*#__PURE__*/React.createElement(HidPicker, {
      title: "HID usage",
      value: hidA,
      onPick: setHidA
    }), /*#__PURE__*/React.createElement(Note, null, "Byte 1 of a remap record is a modifier bitmask (a modifier-only entry", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 02 40 00 00"), " exists in the stock Fn table). Aether composes it as", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0x00"), " here \u2014 the mask bit order was never exercised in the capture.", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " record shape \xB7 ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " modifier bit order")), (type === "socd" || type === "rs") && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement(HidPicker, {
      title: "Key 1 HID",
      value: hidA,
      onPick: setHidA
    }), /*#__PURE__*/React.createElement(HidPicker, {
      title: "Key 2 HID",
      value: hidB,
      onPick: setHidB
    }), /*#__PURE__*/React.createElement(Note, null, "The pair is stored as HID usage codes inside the record, and the identical record is written into", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, " both"), " keys' slots. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    })), type === "socd" && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5"
    }, /*#__PURE__*/React.createElement(Label, null, "Behaviour mode"), SOCD_MODES.map(m => {
      const sel = mode === m.v;
      return /*#__PURE__*/React.createElement("button", {
        key: m.v,
        disabled: !m.verified,
        onClick: () => m.verified && setMode(m.v),
        className: `text-left px-3 py-2 rounded-md border transition-all
                                ${!m.verified ? "border-[var(--line)] bg-white/[0.01] opacity-60 cursor-not-allowed" : sel ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: `font-mono text-[11px] ${m.verified ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}`
      }, "0x", hex2(m.v)), /*#__PURE__*/React.createElement("span", {
        className: `font-display text-[11px] uppercase tracking-[0.14em] ${m.verified ? "text-[var(--text)]" : "text-[var(--text-faint)]"}`
      }, m.label), /*#__PURE__*/React.createElement(Tag, {
        kind: m.verified ? "captured" : "unknown"
      })), /*#__PURE__*/React.createElement("div", {
        className: "mt-1 text-[10px] leading-relaxed text-[var(--text-dim)]"
      }, m.note));
    }), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "The vendor UI offers four modes. Aether offers the one that was actually observed. The other three are shown greyed out and are deliberately not selectable \u2014 presenting them as working would be a guess, and a wrong guess here silently changes which key wins in-game.")), type === "rs" && /*#__PURE__*/React.createElement(Note, null, "RS carries no mode byte at all \u2014 byte 1 was ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x00"), " in every captured frame. Resolution is \"deeper press wins\", decided by the firmware. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    })), /*#__PURE__*/React.createElement(CompetitiveWarning, null)), type === "mt" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Trigger delay \xB7 raw byte"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 255,
      value: delayRaw,
      onChange: e => setDelayRaw(+e.target.value),
      className: "flex-1"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[13px] text-[var(--accent)] w-20 text-right"
    }, delayRaw, " \xB7 0x", hex2(delayRaw)))), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Shown as the ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "raw byte"), " on purpose. The only value ever captured on this board was ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x28"), " (40) \u2014 which is also the vendor's factory default, so it proves nothing about the unit. The vendor's own bundle describes the field as", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " sliderValue / 10"), " (i.e. 10 ms per count, 40 \u2192 400 ms), but that reading is ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " and was never confirmed against a value we chose. Aether will not print a millisecond figure it cannot stand behind."), /*#__PURE__*/React.createElement(Note, null, "Bytes 1 and 2 are the tap and hold actions. They were ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "00 00"), " in every captured frame because the vendor UI fills them only after you physically press the key on the board. Aether therefore writes them as zero and does not offer an action picker. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "unknown"
    }))), type === "tgl" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, /*#__PURE__*/React.createElement(Note, null, "Toggle takes no parameters: the captured record was exactly", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0A 00 00 00"), ". ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " The vendor bundle claims byte 1 can hold a HID usage (", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "[10, hidUsage, 0, 0]"), "); that was never observed, so Aether composes the captured all-zero form. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }))), type === "dks" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "DKS slot (byte 1)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 15,
      value: slot,
      onChange: e => setSlot(Math.max(0, Math.min(15, +e.target.value || 0))),
      className: "w-28 h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-rose-400/40 bg-rose-500/[0.07] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-rose-300 mb-1"
    }, "DKS cannot be authored in Aether"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] leading-relaxed text-rose-200/90"
    }, "DKS assigns up to four actions by how deep the key is pressed. In the vendor app those four action slots are filled by ", /*#__PURE__*/React.createElement("span", {
      className: "font-semibold"
    }, "physically pressing the key on the keyboard"), " ", "\u2014 the UI literally waits for the press. Aether has no such capture flow, and because the vendor capture never filled the slots, their encoding is undecoded. So Aether can show the record shape and the travel points, and nothing more: it will not ship a control that cannot produce a working DKS key.")), /*#__PURE__*/React.createElement(Note, null, "The companion travel table is a separate 1024-byte table (", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x18"), " / ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x28"), "), four points in 0.1 mm units \u2014 press / bottom-out / release / reset. The one captured entry was", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 10 1E 1E 10"), " = 1.6 / 3.0 / 3.0 / 1.6 mm, written at offset 0, with byte 1 of the key record acting as the slot index into it. One entry is consistent with that reading but does not prove it. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " values \xB7 ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " slot indexing")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Record that would be written"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[13px] text-[var(--accent)]"
    }, recordHex(draft)), /*#__PURE__*/React.createElement("div", {
      className: "mt-1 font-mono text-[10px] text-[var(--text-faint)]"
    }, "key table 0x22 \xB7 index ", keyIndex, " (byte offset ", keyIndex * 4, ")", isPair && /*#__PURE__*/React.createElement(React.Fragment, null, " + index ", keyIndexB, " (byte offset ", keyIndexB * 4, ") \u2014 same record"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: stage,
      className: "flex-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, "Stage binding"), /*#__PURE__*/React.createElement("button", {
      disabled: true,
      title: gate.reason,
      className: "flex-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.01] text-[var(--text-faint)] opacity-60 cursor-not-allowed font-display text-[11px] uppercase tracking-[0.16em]"
    }, "Write \xB7 unavailable")), /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason, " Staged bindings live in this window only."));
  }

  /* ============================================================
     Status widget body (replaces the Win60 hotkey widget on capable boards).
     ============================================================ */
  function AdvancedKeyStatus({
    ctx,
    gate
  }) {
    const board = ctx && ctx.board || null;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Board"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[12px] text-[var(--text)]"
    }, board && board.name || "â€”"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, board && board.vidPid || "")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Capability"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, "advancedKeys"), /*#__PURE__*/React.createElement(Tag, {
      kind: gate.state === "yes" ? "captured" : "source"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, gate.state, " \xB7 from ", gate.source)), /*#__PURE__*/React.createElement("div", {
      className: "mt-2"
    }, /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason))), /*#__PURE__*/React.createElement(CompetitiveWarning, {
      compact: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Transport"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10.5px] text-[var(--text-dim)] leading-relaxed"
    }, "key table GET 0x12 / SET 0x22 \xB7 512 B \xB7 126 x 4", /*#__PURE__*/React.createElement("br", null), "Fn layer GET 0x16 / SET 0x26 \xB7 same format", /*#__PURE__*/React.createElement("br", null), "DKS travel GET 0x18 / SET 0x28 \xB7 1024 B", /*#__PURE__*/React.createElement("br", null), "writes are whole-table (read, patch, write back)")));
  }

  /* ============================================================
     Staged-bindings widget body (replaces the Win60 active-pairs widget).
     ============================================================ */
  function AdvancedKeyBindings({
    ctx,
    gate
  }) {
    const s = useStore();
    const ITrash = window.AetherIcons && window.AetherIcons.ITrash;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, s.bindings.length, " staged \xB7 0 written"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5 flex-1 overflow-y-auto"
    }, !s.bindings.length && /*#__PURE__*/React.createElement(Note, null, "Nothing staged. Bindings composed here are held in this window and never sent to the keyboard."), s.bindings.map(b => {
      const def = ADV_TYPES.find(t => t.id === b.type) || ADV_TYPES[0];
      const pair = b.type === "socd" || b.type === "rs";
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        onClick: () => selectBinding(b.id),
        className: `px-3 py-2 rounded-md border cursor-pointer transition-all
                          ${s.sel === b.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text)]"
      }, def.name, " ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text-faint)]"
      }, "\xB7 page ", def.page)), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          removeBinding(b.id);
        },
        className: "text-[var(--text-faint)] hover:text-rose-300",
        "aria-label": "Remove"
      }, ITrash ? /*#__PURE__*/React.createElement(ITrash, {
        size: 12
      }) : "x")), /*#__PURE__*/React.createElement("div", {
        className: "mt-1 font-mono text-[10px] text-[var(--text-faint)]"
      }, "idx ", b.keyIndex, pair ? ` + ${b.keyIndexB}` : "", pair ? ` Â· ${hidLabel(b.hidA)} / ${hidLabel(b.hidB)}` : "", b.type === "remap" ? ` Â· ${hidLabel(b.hidA)}` : "", b.type === "mt" ? ` Â· delay raw ${b.delayRaw}` : ""), /*#__PURE__*/React.createElement("div", {
        className: "mt-0.5 font-mono text-[11px] text-[var(--accent)]"
      }, recordHex(b)));
    })), /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason));
  }
  window.AetherAdvancedKeys = {
    advancedKeysGate,
    AdvancedKeyEditor,
    AdvancedKeyStatus,
    AdvancedKeyBindings,
    CompetitiveWarning,
    ADV_TYPES,
    HID_KEYS
  };
})();
</script>
<script data-mod="comp_board-context">
(() => {
  /* ============================================================
     Board-awareness context â€” wave "UI board-awareness" of
     docs/context/PER_BOARD_PARITY_PLAN.md (step 4).
  
     Exposes window.AetherBoard = {
       BoardContext, useBoard, capState, makeBoardContextValue, UNKNOWN_BOARD
     }.
  
     The context VALUE shape (the locked contract for the next wave of
     workspace files):
  
       {
         board:        object|null   // get_board().active verbatim:
                                     //   {slug, name, vidPid, formFactor, status,
                                     //    capabilities, drivable, lighting?, actuation?}
         roster:       array         // list_boards().boards verbatim (adds
                                     //   `connected` + `active` booleans per entry)
         capabilities: object|null   // board.capabilities pass-through; values are
                                     //   true | false | "wip"
         lighting:     object|null   // board.lighting pass-through (per-board mode
                                     //   table + slider scales). null until the
                                     //   backend serializes the block in get_board.
         actuation:    object|null   // board.actuation pass-through (deadzoneScope,
                                     //   ranges, switches). Same null caveat.
         drivable:     bool          // protocol wired for the active board
         cap(name)          -> true | false | "wip" | undefined (raw flag)
         capState(name)     -> "yes" | "no" | "wip" | "unknown"
         isSupported(name)  -> bool  // ONLY true for a hard `true`. "wip" means
                                     // SOURCE-ONLY (read from vendor driver source,
                                     // never verified on hardware) and MUST be
                                     // treated as unavailable â€” label it
                                     // "unverified", don't drive it.
         selectBoard(slug)  -> Promise<select_board result>
         refreshBoards()    -> Promise
         switching:    bool          // a select_board round-trip is in flight
       }
  
     Fail-open rule: when NO board data is available at all (bridge not up,
     get_board failed, running in a plain browser) capState() returns "unknown"
     and isSupported() returns true, so the UI renders exactly like today's
     Win60-only build. The UI gate is cosmetic; the backend is the enforcement
     layer (unsupported ops return {ok:false, unsupported:true} regardless).
     ============================================================ */

  const BoardContext = React.createContext(null);

  // Normalize one capability flag. `caps` may be null (no board data).
  const capState = (caps, name) => {
    if (!caps || typeof caps !== "object") return "unknown";
    const v = caps[name];
    if (v === true) return "yes";
    if (v === "wip") return "wip";
    return "no"; // false or missing â€” registry semantics: absent flag = false
  };

  // Build the full context value from App-owned state + actions.
  const makeBoardContextValue = ({
    board,
    roster,
    selectBoard,
    refreshBoards,
    switching
  }) => {
    const caps = board && board.capabilities || null;
    return {
      board: board || null,
      roster: Array.isArray(roster) ? roster : [],
      capabilities: caps,
      lighting: board && board.lighting || null,
      actuation: board && board.actuation || null,
      drivable: !!(board && board.drivable),
      cap: name => caps ? caps[name] : undefined,
      capState: name => capState(caps, name),
      isSupported: name => caps ? caps[name] === true : true,
      // fail-open on unknown
      selectBoard: selectBoard || (() => Promise.resolve({
        ok: false,
        error: "no bridge"
      })),
      refreshBoards: refreshBoards || (() => Promise.resolve()),
      switching: !!switching
    };
  };

  // What consumers get if they render outside the provider (or the provider has
  // no data yet): behave exactly like the pre-board-awareness UI.
  const UNKNOWN_BOARD = makeBoardContextValue({
    board: null,
    roster: []
  });
  const useBoard = () => React.useContext(BoardContext) || UNKNOWN_BOARD;
  window.AetherBoard = {
    BoardContext,
    useBoard,
    capState,
    makeBoardContextValue,
    UNKNOWN_BOARD
  };
})();
</script>
<script data-mod="comp_board-picker">
(() => {
  /* ============================================================
     BoardPicker â€” multi-board chooser (PER_BOARD_PARITY_PLAN.md step 4).
  
     Lists every board the registry OFFERS (`offered`, resolved from
     `offerInUi`) â€” the same flag the setup wizard reads â€” whether or not the
     hardware is plugged in right now. Renders NOTHING when the live roster
     hasn't arrived (no bridge / plain-browser preview).
  
     Rules:
     - The active board is marked; drivable offered boards can be switched
       to via select_board(slug).
     - Non-drivable boards (protocol not decoded â€” e.g. the Mini 60 HE Pro
       2.4GHz dongle) are listed but NOT selectable as drive targets, with the
       reason spelled out instead of a mute grey-out.
  
     Exposes window.AetherBoardPicker = { BoardPicker }.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const I = window.AetherIcons || {};
  const IChevronD = I.IChevronD,
    ICheck = I.ICheck;

  // Why a board can't be driven, in words. `status` comes from the registry.
  const undrivableReason = b => {
    const name = b && b.name || "this board";
    return `${name} can be identified but not driven â€” its protocol hasn't been ` + `decoded, so Aether has no verified frames to send it.`;
  };
  function BoardRow({
    b,
    switching,
    onSelect
  }) {
    const selectable = b.drivable && !b.active && !switching;
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 min-w-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-block w-1.5 h-1.5 rounded-full shrink-0
                          ${b.active ? "bg-[var(--good)]" : b.drivable ? "bg-[var(--text-faint)]" : "bg-[var(--warn)]"}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)] truncate"
    }, b.name)), /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 ml-auto shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-faint)]"
    }, b.vidPid), b.active && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--good)]"
    }, ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 10
    }), "Active"), !b.active && b.drivable && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, switching ? "â€¦" : "Switch"), !b.drivable && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--warn)]"
    }, "Not drivable")));
    if (selectable) {
      return /*#__PURE__*/React.createElement("button", {
        onClick: () => onSelect(b.slug),
        className: "w-full flex items-center gap-2 px-2.5 h-9 rounded-lg text-left transition-colors hover:bg-white/[0.04]"
      }, inner);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-full flex items-center gap-2 px-2.5 h-9 rounded-lg
                       ${b.active ? "bg-[var(--accent)]/10" : ""}`
    }, inner), !b.drivable && /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 pb-2 -mt-0.5 text-[10.5px] leading-relaxed text-[var(--text-dim)]"
    }, undrivableReason(b)));
  }
  function BoardPicker({
    roster,
    active,
    switching,
    onSelect
  }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);

    // The boards this picker lists = registry entries the registry says may be
    // OFFERED (`offered`, resolved from `offerInUi`) â€” the SAME flag the wizard
    // reads, so the two pickers can never disagree. It is deliberately NOT a
    // filter on `connected`: an offered board is pickable whether or not it is
    // plugged in right now (select_board() rebinds; connect() then reports
    // honestly if the hardware is absent). Filtering on `connected` was the bug
    // this replaces â€” the KP-TE153 shares the Win60's VID:PID, so it read as
    // "connected" and appeared here while never being offered at all.
    // `offered` is undefined on older payloads -> fall back to `drivable`.
    const offered = (roster || []).filter(b => b && (b.offered !== undefined ? b.offered : b.drivable));
    // No roster yet (no bridge / plain-browser preview): stay invisible.
    if (offered.length < 2) return null;
    const current = active || offered.find(b => b.active) || null;
    const label = current ? current.name : "Select board";
    const doSelect = slug => {
      setOpen(false);
      onSelect && onSelect(slug);
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "fixed z-[60]",
      style: {
        top: 62,
        right: 20
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      disabled: !!switching,
      title: "Choose which board Aether drives",
      className: "flex items-center gap-2 h-[34px] pl-3 pr-2.5 rounded-[11px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--ink)_70%,transparent)] backdrop-blur-xl text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-colors disabled:opacity-60"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-1.5 h-1.5 rounded-full shrink-0",
      style: {
        background: "var(--good)",
        boxShadow: "0 0 8px var(--good)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title text-[13px] tracking-[0.04em] uppercase"
    }, switching ? "Switchingâ€¦" : label), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, offered.length, " boards"), IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: `text-[var(--text-faint)] transition-transform ${open ? "rotate-180" : ""}`
    })), open && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-full right-0 mt-1.5 w-[340px] p-1.5 menu-pop z-[61] animate-[fadeIn_140ms_ease-out]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 pt-1.5 pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, "Boards"), offered.map(b => /*#__PURE__*/React.createElement(BoardRow, {
      key: b.slug,
      b: b,
      switching: !!switching,
      onSelect: doSelect
    })), /*#__PURE__*/React.createElement("div", {
      className: "h-px bg-[var(--line)] my-1"
    }), /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 py-1.5 text-[10px] leading-relaxed text-[var(--text-faint)]"
    }, "Switching disconnects the current board and rebinds Aether to the one you choose.")));
  }
  window.AetherBoardPicker = {
    BoardPicker
  };
})();
</script>
<script data-mod="comp_unsupported-notices">
(() => {
  /* ============================================================
     UnsupportedNotices â€” honest failure surfacing
     (PER_BOARD_PARITY_PLAN.md step 4, "honest toasts").
  
     When any bridge call resolves {ok:false, unsupported:true, feature, error}
     the App pushes the backend's reason here instead of letting the call fail
     silently. Presentation-only: notices arrive via props, so nothing here
     runs (or renders) on a board where every operation is supported â€” on the
     Aula Win60 HE this component always renders null.
  
     Styling follows the app's existing timed flash-message idiom
     (ConfirmToast / settings.jsx toast): short uppercase display text on a
     bordered card, auto-dismissed by the owner.
  
     Exposes window.AetherNotices = { UnsupportedNotices }.
     ============================================================ */

  function UnsupportedNotices({
    notices,
    onDismiss
  }) {
    if (!notices || !notices.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none"
    }, notices.map(n => /*#__PURE__*/React.createElement("div", {
      key: n.id,
      className: "pointer-events-auto flex items-center gap-3 pl-3.5 pr-2 py-2 rounded-xl border bg-[color-mix(in_srgb,var(--ink)_90%,transparent)] backdrop-blur-md shadow-2xl animate-[fadeIn_140ms_ease-out]",
      style: {
        borderColor: "color-mix(in srgb, var(--warn) 45%, transparent)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--warn)] shrink-0"
    }, "Not supported"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] text-[var(--text)] max-w-[420px]"
    }, n.msg), /*#__PURE__*/React.createElement("button", {
      onClick: () => onDismiss && onDismiss(n.id),
      "aria-label": "Dismiss",
      className: "ml-1 w-6 h-6 grid place-items-center rounded-md text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-white/[0.05]"
    }, "\xD7"))));
  }
  window.AetherNotices = {
    UnsupportedNotices
  };
})();
</script>
<script data-mod="board-submit">
(() => {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const api = () => window.pywebview && window.pywebview.api || {};
  const ISSUE_BASE = "https://github.com/MrWhosNexus/Aether-HE/issues/new";
  function buildIssueUrl(meta, dev) {
    // Pre-fills the add-a-board.yml form fields via query params.
    const p = new URLSearchParams({
      template: "add-a-board.yml",
      title: `[Board] ${meta.brand} ${meta.model} â€” add support`
    });
    p.append("brand-model", `${meta.brand} ${meta.model}`);
    p.append("switch-type", meta.switch_type || "");
    p.append("form-factor", meta.form_factor || "");
    p.append("vid-pid", `${dev.vid}:${dev.pid}`);
    return `${ISSUE_BASE}?${p.toString()}`;
  }
  function BoardSubmit({
    open,
    onClose
  }) {
    const [step, setStep] = useState(0); // 0 detect,1 meta,2 capture,3 submit
    const [devices, setDevices] = useState([]);
    const [dev, setDev] = useState(null);
    const [meta, setMeta] = useState({
      brand: "",
      model: "",
      switch_type: "Hall-effect",
      form_factor: "",
      size: "60"
    });
    const [reports, setReports] = useState([]);
    const [capturing, setCapturing] = useState(false);
    const [keysSeen, setKeysSeen] = useState(0);
    const [result, setResult] = useState(null);
    const pollRef = useRef(null);
    useEffect(() => {
      if (open) {
        setStep(0);
        api().list_hid_devices?.().then(r => r && r.ok && setDevices(r.devices));
      }
    }, [open]);
    useEffect(() => () => {
      if (pollRef.current) clearInterval(pollRef.current);
      api().stop_capture?.();
    }, []);
    useEffect(() => {
      if (!open && capturing) {
        stopCapture();
      }
    }, [open]);
    if (!open) return null;
    const startCapture = async () => {
      // A second click while a poll is already running would overwrite pollRef
      // and orphan the first interval (it would poll forever, past close).
      if (pollRef.current) return;
      setReports([]);
      setKeysSeen(0);
      await api().open_capture?.(dev.path, dev.vid, dev.pid);
      setCapturing(true);
      pollRef.current = setInterval(async () => {
        const r = await api().read_capture?.();
        if (r && r.ok && r.count) {
          setReports(prev => {
            const next = prev.concat(r.reports);
            // Count DISTINCT KEYS, not distinct byte-prefixes. HE Travel-Test frames
            // are all "01 21 .. 05 .." â€” the key identity is row/col at bytes 7-8
            // (see LiveReader). For those, key on bytes 7-8; otherwise fall back to
            // the whole frame so non-HE input reports still count sensibly.
            const keyOf = h => h.length >= 18 && h.slice(2, 4) === "21" && h.slice(10, 12) === "05" ? h.slice(14, 18) : h;
            setKeysSeen(new Set(next.map(x => keyOf(x.hex))).size);
            return next;
          });
        }
      }, 200);
    };
    const stopCapture = async () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setCapturing(false);
      await api().stop_capture?.();
    };
    const submit = async () => {
      const interfaces = (devices || []).filter(d => d.vid === dev.vid && d.pid === dev.pid).map(d => ({
        interface_number: d.interface_number,
        usage_page: d.usage_page
      }));
      const {
        path,
        ...devNoPath
      } = dev; // drop raw HID path (public issue)
      const deviceObj = {
        ...devNoPath,
        hid_descriptor_b64: "",
        interfaces
      };
      const obj = {
        schema: "aether-board-submission/1",
        submitted_at: new Date().toISOString(),
        app_version: window.__resources && window.__resources.version || "0.2.0",
        device: deviceObj,
        meta,
        size_template: `generic-${meta.size}`,
        input_capture: {
          duration_ms: reports.length ? reports[reports.length - 1].t : 0,
          report_len: 64,
          reports,
          keys_seen: keysSeen
        },
        output_pcap: {
          attached: false,
          filename: null
        },
        notes: ""
      };
      const r = await api().save_submission?.(obj);
      setResult(r);
      if (r && r.ok) await api().open_submission_url?.(buildIssueUrl(meta, dev));
    };

    // --- render: a glass modal with the 4 steps (detect / meta / capture / submit) ---
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        background: "rgba(3,7,9,0.6)",
        backdropFilter: "blur(6px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        width: "min(760px,94vw)",
        maxHeight: "90vh",
        overflow: "auto",
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        fontSize: 24
      }
    }, "SUBMIT YOUR BOARD"), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        stopCapture();
        onClose();
      }
    }, "\u2715")), step === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-faint)] mb-3"
    }, "Pick your keyboard from connected HID devices."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5",
      style: {
        maxHeight: 320,
        overflow: "auto"
      }
    }, devices.map((d, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setDev(d),
      className: `btn ${dev && dev.path === d.path ? "on" : ""}`,
      style: {
        textAlign: "left"
      }
    }, d.product || "(unknown)", " \xB7 ", d.vid, ":", d.pid, " \xB7 iface ", d.interface_number, " \xB7 ", (d.usage_pages || [d.usage_page]).join(", ")))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: !dev,
      onClick: () => setStep(1)
    }, "Next"))), step === 1 && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3"
    }, [["brand", "Brand"], ["model", "Model"], ["form_factor", "Form factor"]].map(([k, lbl]) => /*#__PURE__*/React.createElement("label", {
      key: k,
      className: "flex flex-col gap-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, lbl), /*#__PURE__*/React.createElement("input", {
      className: "input",
      value: meta[k],
      onChange: e => setMeta({
        ...meta,
        [k]: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, ["60", "65", "75", "tkl"].map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      className: `btn ${meta.size === s ? "on" : ""}`,
      onClick: () => setMeta({
        ...meta,
        size: s
      })
    }, s.toUpperCase()))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-3"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setStep(0)
    }, "Back"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: !meta.brand || !meta.model,
      onClick: () => setStep(2)
    }, "Next"))), step === 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] mb-2"
    }, "We\u2019ll record what the board ", /*#__PURE__*/React.createElement("b", null, "sends"), " (read-only \u2014 we never write to it). Press every key once, then a few keys slowly."), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-title text-[28px] text-[var(--accent)]"
    }, keysSeen), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, "distinct reports \xB7 ", reports.length, " total")), !capturing ? /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      onClick: startCapture
    }, "Start capture") : /*#__PURE__*/React.createElement("button", {
      className: "btn danger",
      onClick: stopCapture
    }, "Stop capture"), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        stopCapture();
        setStep(1);
      }
    }, "Back"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: reports.length === 0,
      onClick: () => {
        stopCapture();
        setStep(3);
      }
    }, "Next"))), step === 3 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] mb-3"
    }, "Submitting saves a file locally and opens a pre-filled GitHub issue. ", /*#__PURE__*/React.createElement("b", null, "Attach the saved file"), " to the issue. (Optional: record a USBPcap capture for lighting and attach it too.)"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      onClick: submit
    }, "Save & open GitHub issue"), result && result.ok && /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--good)] mt-3"
    }, "Saved: ", result.path), result && !result.ok && /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--bad)] mt-3"
    }, (result.errors || [result.error]).join("; ")), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-start mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setStep(2)
    }, "Back")))));
  }
  window.AetherBoardSubmit = {
    BoardSubmit
  };
})();
</script>
<script data-mod="wizard">
(() => {
  /* ============================================================
     SetupWizard â€” first-run guided setup for AetherHE.
     Exposes window.AetherWizard = { SetupWizard }.
     Plain JSX, global React (no libs). Glass panels + Impact (.font-title)
     titles, matching desktop.jsx / sections.jsx styling. UI ONLY â€” reads/calls
     ctx.* and window.pywebview.api.* exactly like the existing sections.
  
     4 steps:
       1) Board selection   (drivable registry boards only â€” decoded protocol)
       2) Board layout preview (reuses window.AetherKeyboard.KeyboardPanel, read-only)
       3) Animation how-to  (points at the Lighting workspace)
       4) JSON import       (returning users: file -> parse -> ctx.applyState)
  
     Persistence:
       - board choice -> localStorage "aether-board"
       - done flag    -> localStorage "aether-setup-done" = "1"
         (coordinator can key first-run detection off the missing flag /
          missing settings file, and re-open via ctx.setWizardOpen(true).)
     ============================================================ */
  const {
    useState,
    useEffect,
    useMemo,
    useRef
  } = React;
  const BOARD_ISSUE_URL = "https://github.com/MrWhosNexus/Aether-HE/issues/new?template=add-a-board.yml";
  const LS_BOARD = "aether-board";
  const LS_DONE = "aether-setup-done";

  /* Static fallback list â€” mirrors the data/board_registry.json entries the
     registry marks OFFERED (`offerInUi`), used only when the live roster isn't up
     yet (no bridge, plain-browser preview). Keep it in step with the registry:
     the live roster is authoritative, this is just what shows before it loads.
  
     Offered is stricter than drivable. Boards deliberately NOT offered, each for
     a stated reason in the registry's `_offerNote`:
       aula-kp-te153     â€” decoded by family, never run on a physical KP-TE153
       aula-win60he-pro  â€” SayoDevice; captures decode, but nobody owns the board
       aula-mini60he-max â€” decoded from a contributor capture, never hardware-run
     They stay in the registry so a plugged-in board is still detected, named and
     drawn with an honest explanation â€” they are simply never pickable here. */
  const BOARDS = [{
    slug: "aula-win60-he",
    name: "Aula Win60 HE",
    form: "60%",
    status: "supported"
  }, {
    slug: "aula-win68-he",
    name: "Aula WIN 68 HE",
    form: "65%",
    status: "bringup"
  }, {
    slug: "aula-mini60he-pro",
    name: "Aula Mini 60 HE Pro (wired)",
    form: "60%",
    status: "supported"
  }, {
    slug: "aula-mini60he-pro-24g",
    name: "Aula Mini 60 HE Pro (2.4GHz)",
    form: "60%",
    status: "supported"
  }];
  const STATUS_LABEL = {
    supported: "Supported",
    bringup: "Bring-up"
  };

  /* The boards the wizard offers = registry entries the registry says may be
     OFFERED (`offered`, resolved from `offerInUi`), which is a stricter thing
     than `drivable`. A board can have a fully decoded protocol and still not
     belong in a picker â€” e.g. decoded from a contributor's capture but never
     run on physical hardware by anyone. Reading `offered` keeps that judgement
     in the registry as data instead of re-deriving it at each UI site, where
     the two inevitably drift.
  
     `offered` is undefined on older payloads, so fall back to `drivable` â€” that
     preserves today's behaviour for any board that declares nothing.
  
     Prefers the LIVE roster the app already fetched over the bridge
     (ctx.board.roster mirrors list_boards() â€” see board-context.jsx), so the
     wizard tracks the registry with no rebuild; falls back to the static mirror
     above. Filter is NOT on `connected`: an offered board appears whether or not
     it is plugged in right now. */
  const drivableBoards = ctx => {
    const roster = ctx && ctx.board && Array.isArray(ctx.board.roster) ? ctx.board.roster : [];
    const live = roster.filter(b => b && (b.offered !== undefined ? b.offered : b.drivable));
    if (live.length) {
      return live.map(b => ({
        slug: b.slug,
        name: b.name,
        form: b.formFactor || "",
        status: b.status || "bringup"
      }));
    }
    return BOARDS;
  };

  /* Recognised-but-not-drivable boards that are attached RIGHT NOW (identity-only
     registry entries â€” e.g. the 2.4GHz dongles). Not pickable, but if one is
     plugged in the wizard says so honestly instead of silently hiding it. */
  const recognisedUndrivable = ctx => {
    const roster = ctx && ctx.board && Array.isArray(ctx.board.roster) ? ctx.board.roster : [];
    return roster.filter(b => b && b.connected && !b.drivable);
  };
  const STEPS = ["Board", "Layout", "Animations", "Import"];

  /* ---- persistence helpers ---- */
  const loadBoard = () => {
    try {
      return localStorage.getItem(LS_BOARD) || "aula-win60-he";
    } catch {
      return "aula-win60-he";
    }
  };
  const saveBoard = slug => {
    try {
      localStorage.setItem(LS_BOARD, slug);
    } catch {}
  };
  const markDone = () => {
    try {
      localStorage.setItem(LS_DONE, "1");
    } catch {}
  };

  /* ============================================================
     Step 1 â€” Board selection.
     ============================================================ */
  function StepBoard({
    board,
    setBoard,
    ctx,
    onClose
  }) {
    const boards = drivableBoards(ctx);
    const detected = recognisedUndrivable(ctx);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "SELECT YOUR BOARD"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Every board listed here has a decoded protocol \u2014 Aether can drive it today. More are being brought up. Don't see yours?", " ", /*#__PURE__*/React.createElement("a", {
      href: BOARD_ISSUE_URL,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        color: "var(--accent)",
        textDecoration: "underline"
      }
    }, "Submit your board"), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }
    }, boards.map(b => {
      const on = board === b.slug;
      return /*#__PURE__*/React.createElement("button", {
        key: b.slug,
        onClick: () => setBoard(b.slug),
        className: "glass",
        style: {
          textAlign: "left",
          padding: "12px 14px",
          borderRadius: 10,
          cursor: "pointer",
          outline: on ? "2px solid var(--accent)" : "1px solid var(--line)",
          boxShadow: on ? "0 0 18px var(--accent-glow)" : "none",
          transition: "all 150ms"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-title",
        style: {
          fontSize: 15,
          letterSpacing: "0.02em"
        }
      }, b.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          opacity: 0.65,
          marginTop: 4,
          display: "flex",
          gap: 8,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", null, b.form), /*#__PURE__*/React.createElement("span", {
        style: {
          padding: "1px 7px",
          borderRadius: 999,
          fontSize: 9.5,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: b.status === "supported" ? "var(--accent)" : "var(--text-dim)",
          border: "1px solid var(--line)"
        }
      }, STATUS_LABEL[b.status] || b.status)));
    })), detected.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        marginTop: 12,
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 12,
        opacity: 0.8,
        lineHeight: 1.5
      }
    }, detected.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.slug
    }, "Detected ", /*#__PURE__*/React.createElement("strong", null, b.name), " (", b.vidPid, ") \u2014 Aether recognises it, but its protocol hasn't been decoded yet, so it can't be set up here."))), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        onClose();
        ctx && ctx.setSubmitOpen && ctx.setSubmitOpen(true);
      },
      style: {
        marginTop: 14
      }
    }, "My board isn\u2019t listed \u2192 Submit it"));
  }

  /* ============================================================
     Step 2 â€” Board layout preview (reuse KeyboardPanel, read-only).
     ============================================================ */
  function StepLayout({
    board,
    ctx
  }) {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const boards = drivableBoards(ctx);
    const info = boards.find(b => b.slug === board) || boards[0];
    // Read-only preview: a frozen empty selection + no-op setter so nothing is
    // editable and no device is needed. Only the Win60 HE layout is bundled in
    // keyboard.jsx today; other boards show the layout note instead.
    const emptySel = useMemo(() => new Set(), []);
    const noop = useRef(() => {}).current;
    const canRender = (board === "aula-win60-he" || board === "aula-win68he-max" || board === "aula-win68-he-max") && typeof KeyboardPanel === "function";
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, info.name.toUpperCase(), " \xB7 LAYOUT"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "This is your board's key layout. Later you'll click keys here to scope actuation, remaps and lighting \u2014 no device needed to look around."), canRender ? /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "none"
      }
    }, React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: "default",
      selectedKeys: emptySel,
      setSelectedKeys: noop,
      actuationPoint: 1.70,
      rtPress: 0.05,
      rtRelease: 0.05,
      showPill: false,
      compact: true
    })) : /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 20,
        borderRadius: 10,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-title",
      style: {
        fontSize: 16
      }
    }, "Layout preview coming soon"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.65,
        marginTop: 6
      }
    }, "The interactive layout for ", info.name, " lands when its bring-up completes.")));
  }

  /* ============================================================
     Step 3 â€” Animation how-to (static instructional content + small preview).
     ============================================================ */
  function StepAnimations({
    ctx
  }) {
    const goLighting = () => {
      if (ctx && typeof ctx.setSection === "function") ctx.setSection("lighting");
    };
    const steps = [["Open Lighting", "Jump to the Lighting workspace from the top bar."], ["Pick a pattern", "Choose an effect (Wave, Ripple, Aurora, Rainâ€¦) and set its colors."], ["Tune it", "Adjust brightness, speed and direction â€” changes stream live to the board."], ["Scope per-key", "Select keys on the board to paint per-key colors on top of the effect."]];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "SET UP LIGHTING"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Aether streams multi-color animations from the host in real time. Here's the short version \u2014 the full controls live in the Lighting workspace."), /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, Array.from({
      length: 14
    }).map((_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: 22,
        borderRadius: 4,
        background: `hsl(${i * 26 % 360} 85% 55%)`,
        animation: "aetherWizPulse 1.6s ease-in-out infinite",
        animationDelay: `${i * 0.08}s`
      }
    }))), /*#__PURE__*/React.createElement("style", null, `@keyframes aetherWizPulse{0%,100%{opacity:.35}50%{opacity:1}}`)), /*#__PURE__*/React.createElement("ol", {
      style: {
        display: "grid",
        gap: 10,
        margin: 0,
        padding: 0,
        listStyle: "none"
      }
    }, steps.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        border: "1px solid var(--accent)",
        color: "var(--accent)"
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-title",
      style: {
        fontSize: 13.5,
        letterSpacing: "0.02em"
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.68,
        marginTop: 2
      }
    }, d))))), /*#__PURE__*/React.createElement("button", {
      onClick: goLighting,
      className: "glass font-title",
      style: {
        marginTop: 16,
        padding: "8px 16px",
        borderRadius: 8,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        fontSize: 12
      }
    }, "Open Lighting workspace"));
  }

  /* ============================================================
     Step 4 â€” JSON import (returning users).
     ============================================================ */
  function StepImport({
    ctx
  }) {
    const [status, setStatus] = useState({
      kind: "idle",
      msg: ""
    });
    const fileRef = useRef(null);
    const applyImported = parsed => {
      // Accept either a full settings blob {profiles:[...]} or a bare state object.
      let state = parsed;
      if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length) {
        const aid = parsed.activeProfile;
        const active = parsed.profiles.find(p => p.id === aid) || parsed.profiles[0];
        state = active && active.state || {};
      }
      if (ctx && typeof ctx.applyState === "function") ctx.applyState(state);
      // Persist through the same bridge the app uses (best-effort; the app's
      // own save effect will also mirror the applied state after hydration).
      try {
        const api = window.pywebview && window.pywebview.api;
        if (api && api.save_settings && parsed && Array.isArray(parsed.profiles)) {
          Promise.resolve(api.save_settings(parsed)).catch(() => {});
        }
      } catch {}
    };
    const onFile = e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          applyImported(parsed);
          setStatus({
            kind: "ok",
            msg: `Imported ${file.name} â€” settings applied.`
          });
        } catch (err) {
          setStatus({
            kind: "err",
            msg: "Couldn't parse that file â€” is it a valid Aether JSON?"
          });
        }
      };
      reader.onerror = () => setStatus({
        kind: "err",
        msg: "Couldn't read that file."
      });
      reader.readAsText(file);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "IMPORT SETTINGS"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Returning from another install? Import an exported Aether settings JSON to restore your profiles, lighting, actuation and SOCD in one shot. New here? Just skip this and hit Finish."), /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 20,
        borderRadius: 10,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: "application/json,.json",
      onChange: onFile,
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => fileRef.current && fileRef.current.click(),
      className: "font-title",
      style: {
        padding: "10px 20px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "transparent"
      }
    }, "Choose settings JSON\u2026"), status.kind !== "idle" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 12,
        color: status.kind === "err" ? "#fca5a5" : "var(--accent)"
      }
    }, status.msg)));
  }

  /* ============================================================
     SetupWizard â€” modal overlay orchestrating the 4 steps.
     Props: { open, onClose, ctx }
     ============================================================ */
  function SetupWizard({
    open,
    onClose,
    ctx
  }) {
    const [step, setStep] = useState(0);
    const [board, setBoardState] = useState(loadBoard);

    // Reset to first step each time the wizard is (re)opened.
    useEffect(() => {
      if (open) setStep(0);
    }, [open]);

    // If the remembered board is no longer offered (e.g. an identity-only slug
    // left over from an older build), snap to the first drivable board.
    useEffect(() => {
      if (!open) return;
      const boards = drivableBoards(ctx);
      if (boards.length && !boards.some(b => b.slug === board)) {
        setBoardState(boards[0].slug);
        saveBoard(boards[0].slug);
      }
    }, [open]);
    const setBoard = slug => {
      setBoardState(slug);
      saveBoard(slug);
    };
    const finish = () => {
      saveBoard(board);
      markDone();
      // If the coordinator wired a board setter into ctx, tell it too.
      if (ctx && typeof ctx.setBoard === "function") ctx.setBoard(board);
      if (typeof onClose === "function") onClose();
    };
    const close = () => {
      if (typeof onClose === "function") onClose();
    };
    if (!open) return null;
    const last = step === STEPS.length - 1;
    const c = ctx || {};
    let body = null;
    if (step === 0) body = /*#__PURE__*/React.createElement(StepBoard, {
      board: board,
      setBoard: setBoard,
      ctx: c,
      onClose: close
    });else if (step === 1) body = /*#__PURE__*/React.createElement(StepLayout, {
      board: board,
      ctx: c
    });else if (step === 2) body = /*#__PURE__*/React.createElement(StepAnimations, {
      ctx: c
    });else body = /*#__PURE__*/React.createElement(StepImport, {
      ctx: c
    });
    return /*#__PURE__*/React.createElement("div", {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Aether first-run setup",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(3,7,10,0.72)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        padding: 24
      },
      onClick: e => {
        if (e.target === e.currentTarget) close();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        width: "min(1060px, 96vw)",
        maxHeight: "90vh",
        overflow: "auto",
        borderRadius: 16,
        padding: 28,
        position: "relative",
        border: "1px solid var(--line)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: close,
      title: "Close",
      "aria-label": "Close setup",
      style: {
        position: "absolute",
        top: 14,
        right: 16,
        background: "transparent",
        border: "none",
        color: "var(--text-dim)",
        fontSize: 20,
        cursor: "pointer",
        lineHeight: 1
      }
    }, "\xD7"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 22
      }
    }, STEPS.map((label, i) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: i === step ? "var(--accent)" : "var(--text-faint)"
      }
    }, label), i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 1,
        background: "var(--line)"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 320
      }
    }, body), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        borderTop: "1px solid var(--line)",
        paddingTop: 18
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: close,
      className: "font-title",
      style: {
        background: "transparent",
        border: "none",
        color: "var(--text-dim)",
        fontSize: 11.5,
        letterSpacing: "0.1em",
        cursor: "pointer",
        textTransform: "uppercase"
      }
    }, "Skip setup"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setStep(s => Math.max(0, s - 1)),
      disabled: step === 0,
      className: "glass font-title",
      style: {
        padding: "8px 18px",
        borderRadius: 8,
        fontSize: 12,
        cursor: step === 0 ? "not-allowed" : "pointer",
        opacity: step === 0 ? 0.4 : 1
      }
    }, "Back"), last ? /*#__PURE__*/React.createElement("button", {
      onClick: finish,
      className: "font-title",
      style: {
        padding: "8px 22px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "var(--accent-glow, transparent)"
      }
    }, "Finish") : /*#__PURE__*/React.createElement("button", {
      onClick: () => setStep(s => Math.min(STEPS.length - 1, s + 1)),
      className: "font-title",
      style: {
        padding: "8px 22px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "transparent"
      }
    }, "Next")))));
  }
  window.AetherWizard = {
    SetupWizard
  };
})();
</script>
<script data-mod="app">
(() => {
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;
  const {
    IFolder,
    IKeyboard,
    IBulb,
    IGauge,
    ICrosshair,
    IGrid,
    IPlug,
    IPower,
    IChevron,
    IChevronD,
    ICheck,
    IEdit,
    IRefresh,
    IZap,
    ISave,
    ILink,
    IUnlink,
    IPalette,
    IActivity,
    IWaves,
    ISettings,
    ITrash,
    IPlus,
    ICpu,
    ILayers,
    IMore,
    IDownload
  } = window.AetherIcons;
  const {
    KeyboardPanel
  } = window.AetherKeyboard;
  const {
    KeymapSection,
    ActuationSection,
    LightingSection,
    SOCDSection,
    GamepadSection,
    OtherSection,
    ActuationToolbar
  } = window.AetherSections;
  const {
    ThemePopup,
    useTheme
  } = window.AetherTheme;

  // Desktop-widget shell (foundation) + section widget registries.
  const {
    Workspace,
    TopBar: DesktopTopBar,
    SECTION_DEFS
  } = window.AetherDesktop;
  const SetupWizard = window.AetherWizard && window.AetherWizard.SetupWizard;
  const BoardSubmit = window.AetherBoardSubmit && window.AetherBoardSubmit.BoardSubmit;

  // Board awareness (PER_BOARD_PARITY_PLAN.md step 4) â€” all guarded so a missing
  // component file degrades to exactly the previous single-board UI.
  const AetherBoard = window.AetherBoard || {};
  const BoardContext = AetherBoard.BoardContext;
  const makeBoardContextValue = AetherBoard.makeBoardContextValue;
  const BoardPicker = window.AetherBoardPicker && window.AetherBoardPicker.BoardPicker;
  const UnsupportedNotices = window.AetherNotices && window.AetherNotices.UnsupportedNotices;

  // Placeholder for sections not yet built by later waves â€” a single
  // "coming soon" widget so the workspace surface isn't blank.
  const comingSoon = label => [{
    id: "soon",
    title: label,
    default: {
      x: 60,
      y: 48,
      w: 420,
      h: 220
    },
    min: {
      w: 300,
      h: 160
    },
    render: () => /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center h-full text-center px-6"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-title text-[22px] text-[var(--text)] mb-1"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, "workspace coming soon")))
  }];

  // Registry: section id â†’ widget array, sourced from each workspace file's
  // window.AetherWorkspaces.<SECTION>_WIDGETS export; falls back to a placeholder
  // if a workspace file failed to load.
  const wsArr = (key, label) => {
    const a = window.AetherWorkspaces && window.AetherWorkspaces[key] || [];
    return a.length ? a : comingSoon(label);
  };
  const WIDGETS = {
    actuation: wsArr("ACTUATION_WIDGETS", "Actuation"),
    keymap: wsArr("KEYMAP_WIDGETS", "Keymap"),
    macros: wsArr("MACROS_WIDGETS", "Macros"),
    lighting: wsArr("LIGHTING_WIDGETS", "Lighting"),
    socd: wsArr("SOCD_WIDGETS", "SOCD"),
    gamepad: wsArr("GAMEPAD_WIDGETS", "Gamepad"),
    settings: wsArr("SETTINGS_WIDGETS", "Settings")
  };

  // Sections that exist only when the active board declares the capability
  // (registry flag === true). With NO board data at all (bridge down, plain
  // browser) the gate fails open like every other capability gate; a "wip"
  // (source-only) or false flag hides the tab, so other boards never see a
  // Macros section they cannot drive.
  const SECTION_CAPS = {
    macros: "macros"
  };
  const sectionAllowed = (id, board) => {
    const cap = SECTION_CAPS[id];
    if (!cap) return true;
    const caps = board && board.capabilities;
    if (!caps || typeof caps !== "object") return true; // fail-open on unknown
    return caps[cap] === true;
  };

  /* ============================================================
     HID bridge â€” talks to the native Python Api (window.pywebview.api).
     Every control calls these with real, structured values; there is NO
     DOM/CSS scraping. Safely no-ops when run outside the webview.
     ============================================================ */
  const getApi = () => window.pywebview && window.pywebview.api || null;

  // Honest-failure tap: when the backend refuses an operation with
  // {ok:false, unsupported:true, feature, error} (per-board capability gating),
  // broadcast it so the App can surface the reason instead of the call failing
  // silently. Results pass through UNCHANGED, so every existing caller behaves
  // exactly as before â€” and on a fully-supported board (Aula Win60 HE) the
  // backend never returns `unsupported`, so this never fires there.
  const unsupportedListeners = new Set();
  const emitUnsupported = (name, res) => {
    unsupportedListeners.forEach(fn => {
      try {
        fn(name, res);
      } catch {}
    });
  };
  const tapUnsupported = name => r => {
    if (r && r.ok === false && r.unsupported) emitUnsupported(name, r);
    return r;
  };
  const apiCall = (name, ...args) => {
    const api = getApi();
    if (!api || typeof api[name] !== "function") return Promise.resolve({
      ok: false,
      error: "no bridge"
    });
    try {
      return Promise.resolve(api[name](...args)).then(tapUnsupported(name));
    } catch (e) {
      return Promise.resolve({
        ok: false,
        error: String(e)
      });
    }
  };
  // Run bridge calls ONE AFTER ANOTHER. pywebview executes every js_api call on
  // a fresh Python thread, so `apiCall(a); apiCall(b);` gives no ordering
  // guarantee between a and b â€” use this wherever order matters (e.g. stop the
  // host effect engine, THEN write a firmware mode). Resolves to the last result.
  const callSeq = calls => calls.reduce((p, c) => p.then(() => apiCall(...c)), Promise.resolve());
  const hexToRgbArr = hex => {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  };
  const rgbToHex = rgb => "#" + (rgb || [0, 0, 0]).map(c => Math.max(0, Math.min(255, c | 0)).toString(16).padStart(2, "0")).join("");
  // Lighting %â†’firmware steps. `max` comes from the active board's registry
  // (lighting.brightnessMax/speedMax); the default 4 is the Win60 scale and
  // makes these exactly the legacy functions (0% = off). Boards with a
  // different scale (MINI 60 HE PRO: 0..5) pass their own max.
  const briByte = (pct, max = 4) => pct <= 0 ? 0 : Math.max(1, Math.min(max, Math.ceil(pct / 100 * max)));
  const spdByte = (pct, max = 4) => Math.max(1, Math.min(max, Math.round(pct / 100 * (max - 1)) + 1));
  // Firmware light modes (decoded from the official driver: cmd 7, byte5=mode,
  // refreshColorView() defines each mode's controls). Each entry: the firmware
  // mode byte, whether it uses a background color (2-color), a speed control, what
  // kind of direction control it exposes, and whether Full-RGB applies.
  // dir: "none" | "lr" (left/right) | "ud" (up/down) | "all" (4-way+gather/spread)
  //      | "rotate" (CW/CCW) | "gather" (gather/spread).  custom (10) = per-key.
  const FW_MODES = {
    static: {
      byte: 0,
      bg: false,
      speed: false,
      dir: "none",
      full: false
    },
    breath: {
      byte: 1,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    wave: {
      byte: 2,
      bg: true,
      speed: true,
      dir: "all",
      full: true
    },
    neon: {
      byte: 3,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    radar: {
      byte: 4,
      bg: true,
      speed: true,
      dir: "rotate",
      full: true
    },
    reactive: {
      byte: 6,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    // VENDOR-CORRECTED (hed.aulacn.com config__language.json, lightMode<N>, and
    // the board's own readLightList): byte 7 = Aurora (gather/spread), byte 11 =
    // Cross (no direction), byte 16 = Fireworks. The old table had those three
    // swapped, so e.g. picking "Fireworks" made the firmware render Cross.
    aurora: {
      byte: 7,
      bg: true,
      speed: true,
      dir: "gather",
      full: true
    },
    ripple: {
      byte: 8,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    twinkle: {
      byte: 9,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    custom: {
      byte: 10,
      bg: false,
      speed: false,
      dir: "none",
      full: false
    },
    cross: {
      byte: 11,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    frenzy: {
      byte: 16,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    speedres: {
      byte: 12,
      bg: true,
      speed: false,
      dir: "ud",
      full: true
    },
    autorip: {
      byte: 14,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    },
    striation: {
      byte: 15,
      bg: true,
      speed: true,
      dir: "lr",
      full: true
    },
    fireworks: {
      byte: 16,
      bg: true,
      speed: true,
      dir: "none",
      full: true
    }
  };
  const MODE_BYTE = Object.fromEntries(Object.entries(FW_MODES).map(([k, v]) => [k, v.byte]));
  // SOCD key labels (BASIC/EXTENDED) â†’ design data-code, from the keyboard layout.
  const LABEL_TO_CODE = (() => {
    const map = {};
    (window.AetherKeyboard && window.AetherKeyboard.KB_ROWS || []).flat().forEach(([label, _u, code]) => {
      if (label && code) map[label] = code;
    });
    return map;
  })();

  // Keymap target label â†’ USB HID usage code (page 0x07). Used by Remap Key.
  const HID_BY_LABEL = (() => {
    const m = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => {
      m[c] = 0x04 + i;
    });
    // number row (label forms used by BASIC_KEYS): 1..9 then 0
    [["1!", 0x1e], ["2@", 0x1f], ["3#", 0x20], ["$4", 0x21], ["5%", 0x22], ["6^", 0x23], ["7&", 0x24], ["8*", 0x25], ["9(", 0x26], ["0)", 0x27]].forEach(([k, v]) => {
      m[k] = v;
    });
    Object.assign(m, {
      "Enter": 0x28,
      "Esc": 0x29,
      "Back": 0x2a,
      "Tab": 0x2b,
      "Space": 0x2c,
      "-_": 0x2d,
      "=+": 0x2e,
      "{[": 0x2f,
      "}]": 0x30,
      "\\|": 0x31,
      ";:": 0x33,
      "'\"": 0x34,
      "`~": 0x35,
      ",<": 0x36,
      ".>": 0x37,
      "/?": 0x38,
      "Caps": 0x39,
      "F1": 0x3a,
      "F2": 0x3b,
      "F3": 0x3c,
      "F4": 0x3d,
      "F5": 0x3e,
      "F6": 0x3f,
      "F7": 0x40,
      "F8": 0x41,
      "F9": 0x42,
      "F10": 0x43,
      "F11": 0x44,
      "F12": 0x45,
      "PrtSc": 0x46,
      "ScrLk": 0x47,
      "Pause": 0x48,
      "Ins": 0x49,
      "Home": 0x4a,
      "PgUp": 0x4b,
      "Del": 0x4c,
      "End": 0x4d,
      "PgDn": 0x4e,
      "Right": 0x4f,
      "Left": 0x50,
      "Down": 0x51,
      "Up": 0x52,
      "Menu": 0x65,
      "<>": 0x64,
      "L-Ctrl": 0xe0,
      "L-Shift": 0xe1,
      "L-Alt": 0xe2,
      "L-Win": 0xe3,
      "R-Ctrl": 0xe4,
      "R-Shift": 0xe5,
      "R-Alt": 0xe6,
      "R-Win": 0xe7
    });
    return m;
  })();

  // Profiles are dynamic (add/rename/duplicate/delete) and live in settings.json.
  // SEED_PROFILE is the very first profile created on a fresh install; everything
  // else is created at runtime by the user.
  const SEED_PROFILE = {
    id: "p1",
    name: "Default",
    state: {}
  };

  // Migrate the old per-key blob shape ({"profile-p1": {...}, "profile-p2": {...}})
  // to the new {profiles:[...], activeProfile, globals} shape so nobody loses
  // their existing settings file.
  const migrateSettings = raw => {
    if (!raw || typeof raw !== "object") return null;
    if (Array.isArray(raw.profiles)) return raw; // already new shape
    const profs = [];
    for (const k of Object.keys(raw)) {
      if (!k.startsWith("profile-")) continue;
      const id = k.slice("profile-".length);
      const nm = id === "default" ? "Default" : id.toUpperCase();
      profs.push({
        id,
        name: nm,
        state: raw[k] || {}
      });
    }
    if (!profs.length) return null;
    return {
      profiles: profs,
      activeProfile: profs[0].id,
      globals: {}
    };
  };
  const NAV = [{
    id: "keymap",
    label: "Keymap",
    icon: /*#__PURE__*/React.createElement(IKeyboard, {
      size: 14
    })
  }, {
    id: "lighting",
    label: "Lighting",
    icon: /*#__PURE__*/React.createElement(IBulb, {
      size: 14
    })
  }, {
    id: "actuation",
    label: "Actuation",
    icon: /*#__PURE__*/React.createElement(IGauge, {
      size: 14
    })
  }, {
    id: "socd",
    label: "SOCD",
    icon: /*#__PURE__*/React.createElement(ICrosshair, {
      size: 14
    })
  }, {
    id: "gamepad",
    label: "Gamepad",
    icon: /*#__PURE__*/React.createElement(IZap, {
      size: 14
    })
  }, {
    id: "other",
    label: "Settings",
    icon: /*#__PURE__*/React.createElement(ISettings, {
      size: 14
    })
  }];

  /* ============================================================
     Profile dropdown â€” list, switch, rename, duplicate, delete, add new
     ============================================================ */
  const ProfileDropdown = ({
    profiles,
    activeId,
    onChange,
    onRename,
    onAdd,
    onDuplicate,
    onDelete
  }) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [draft, setDraft] = useState("");
    const ref = useRef(null);
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
          setEditing(null);
        }
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);
    const current = profiles.find(p => p.id === activeId) || profiles[0];
    if (!current) return null;
    const startEdit = p => {
      setEditing(p.id);
      setDraft(p.name);
    };
    const commit = () => {
      if (editing && onRename && draft.trim()) onRename(editing, draft.trim());
      setEditing(null);
    };
    const handleAdd = () => {
      const name = (window.prompt("New profile name", `Profile ${profiles.length + 1}`) || "").trim();
      if (!name) return;
      const dup = window.confirm("Start from a copy of the current profile? (Cancel = start blank.)");
      onAdd(name, dup);
      setOpen(false);
    };
    const handleDelete = p => {
      if (profiles.length <= 1) {
        window.alert("You need at least one profile.");
        return;
      }
      if (!window.confirm(`Delete "${p.name}"? This can't be undone.`)) return;
      onDelete(p.id);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "relative",
      ref: ref
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2.5 pl-2 pr-3 h-9 rounded-xl hover:bg-white/[0.04] transition-colors"
    }, /*#__PURE__*/React.createElement("span", {
      className: "grid place-items-center w-6 h-6 rounded-md bg-white/[0.04] text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement(IFolder, {
      size: 12
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[14px] font-medium text-[var(--text)]"
    }, current.name), /*#__PURE__*/React.createElement(IChevronD, {
      size: 13,
      className: `text-[var(--text-faint)] transition-transform ${open ? "rotate-180" : ""}`
    })), open && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-full left-0 mt-1.5 w-[280px] p-1.5 menu-pop z-50 animate-[fadeIn_140ms_ease-out]"
    }, profiles.map(p => {
      const active = p.id === activeId;
      if (editing === p.id) {
        return /*#__PURE__*/React.createElement("div", {
          key: p.id,
          className: "px-1.5 h-9 flex items-center"
        }, /*#__PURE__*/React.createElement("input", {
          autoFocus: true,
          value: draft,
          onChange: e => setDraft(e.target.value),
          onKeyDown: e => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(null);
          },
          onBlur: commit,
          className: "input w-full h-7 px-2 text-[var(--text)] font-display text-[13px] outline-none"
        }));
      }
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        className: `w-full flex items-center gap-1 pl-2.5 pr-1 h-9 rounded-lg transition-colors
                            ${active ? "bg-[var(--accent)]/15 text-[var(--text)]" : "text-[var(--text-dim)] hover:bg-white/[0.04] hover:text-[var(--text)]"}`
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          onChange(p.id);
          setOpen(false);
        },
        className: "flex-1 flex items-center gap-2 text-left min-w-0"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[13px] truncate"
      }, p.name), active && /*#__PURE__*/React.createElement(ICheck, {
        size: 12,
        className: "text-[var(--accent)] shrink-0"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          startEdit(p);
        },
        title: "Rename",
        className: "text-[var(--text-faint)] hover:text-[var(--text)] px-1.5 h-7 grid place-items-center"
      }, /*#__PURE__*/React.createElement(IEdit, {
        size: 11
      })), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          onDuplicate(p.id);
        },
        title: "Duplicate",
        className: "text-[var(--text-faint)] hover:text-[var(--text)] px-1.5 h-7 grid place-items-center"
      }, /*#__PURE__*/React.createElement(ILink, {
        size: 11
      })), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          handleDelete(p);
        },
        title: "Delete",
        disabled: profiles.length <= 1,
        className: "text-[var(--text-faint)] hover:text-rose-300 disabled:text-[var(--text-faint)] disabled:cursor-not-allowed px-1.5 h-7 grid place-items-center"
      }, /*#__PURE__*/React.createElement(ITrash, {
        size: 11
      })));
    }), /*#__PURE__*/React.createElement("div", {
      className: "h-px bg-[var(--line)] my-1.5"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: handleAdd,
      className: "w-full flex items-center gap-2 pl-2.5 pr-1.5 h-9 rounded-lg text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12.5px] uppercase tracking-[0.14em]"
    }, "New profile"))));
  };

  /* ============================================================
     Top bar â€” Notion-style page header
     ============================================================ */
  const TopBar = ({
    profiles,
    activeId,
    onProfileChange,
    onRenameProfile,
    onAddProfile,
    onDuplicateProfile,
    onDeleteProfile,
    connected,
    connecting,
    onTogglePair,
    autoConnect,
    setAutoConnect,
    onOpenTheme,
    onOpenSettings,
    saveStatus
  }) => /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-[var(--ink)]/70 backdrop-blur-xl border-b border-[var(--line)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1400px] mx-auto px-6 lg:px-10 h-14 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "assets/logo.png",
    alt: "",
    className: "w-8 h-8 drop-shadow-[0_4px_14px_rgba(157,78,221,0.55)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block leading-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[16px] font-bold tracking-[0.14em] text-[var(--text)]"
  }, "Aether"))), /*#__PURE__*/React.createElement("span", {
    className: "mx-3 h-5 w-px bg-[var(--line)]"
  }), /*#__PURE__*/React.createElement(ProfileDropdown, {
    profiles: profiles,
    activeId: activeId,
    onChange: onProfileChange,
    onRename: onRenameProfile,
    onAdd: onAddProfile,
    onDuplicate: onDuplicateProfile,
    onDelete: onDeleteProfile
  }), saveStatus && /*#__PURE__*/React.createElement("span", {
    className: `ml-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity
                          ${saveStatus === "saving" ? "text-[var(--text-faint)]" : saveStatus === "saved" ? "text-emerald-400/80" : "text-rose-400/80"}`
  }, saveStatus === "saving" ? "savingâ€¦" : saveStatus === "saved" ? "âœ“ saved" : "save failed"), /*#__PURE__*/React.createElement("div", {
    className: "ml-auto flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pl-2.5 pr-3 h-9 rounded-xl border border-[var(--line)]"
  }, /*#__PURE__*/React.createElement("span", {
    className: `relative inline-block w-1.5 h-1.5 rounded-full pulse-ring ${connected ? "bg-[var(--good)] text-[var(--good)]" : "bg-[var(--text-faint)] text-[var(--text-faint)]"}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-[12.5px] tracking-[0.04em] text-[var(--text)]"
  }, "WIN 68 HE MAX"), /*#__PURE__*/React.createElement("span", {
    className: `font-mono text-[9.5px] uppercase tracking-[0.2em] ml-1 ${connected ? "text-[var(--good)]/85" : "text-[var(--text-faint)]"}`
  }, connected ? "Linked" : "Offline")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-1.5 pl-2 pr-2.5 h-9 rounded-xl border border-[var(--line)] cursor-pointer select-none",
    title: "Connect to the keyboard automatically when the app opens"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setAutoConnect(!autoConnect),
    className: `w-3.5 h-3.5 rounded border grid place-items-center transition
                            ${autoConnect ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`
  }, autoConnect && /*#__PURE__*/React.createElement(ICheck, {
    size: 9,
    className: "text-[var(--accent)]"
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]"
  }, "Auto")), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenTheme,
    className: "flex items-center gap-2 pl-2.5 pr-3 h-9 rounded-xl border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-colors"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3.5 h-3.5 rounded-full ring-1 ring-white/15",
    style: {
      background: "var(--accent-gradient, var(--accent))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-[12px] uppercase tracking-[0.16em]"
  }, "Theme")), /*#__PURE__*/React.createElement("button", {
    onClick: onTogglePair,
    disabled: connecting,
    className: `flex items-center gap-2 pl-2.5 pr-3 h-9 rounded-xl border transition-all disabled:opacity-60
                      ${connected ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15" : "border-[var(--accent)]/40 bg-[var(--accent)]/12 text-[var(--accent)] hover:bg-[var(--accent)]/20"}`
  }, connected ? /*#__PURE__*/React.createElement(IPower, {
    size: 13
  }) : /*#__PURE__*/React.createElement(IPlug, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-[12px] uppercase tracking-[0.16em]"
  }, connecting ? "â€¦" : connected ? "Connected" : "Pair")), /*#__PURE__*/React.createElement("button", {
    title: "Settings",
    onClick: onOpenSettings,
    className: "w-9 h-9 rounded-xl border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] grid place-items-center transition-colors"
  }, /*#__PURE__*/React.createElement(ISettings, {
    size: 14
  })))));

  /* ============================================================
     Segmented pill nav
     ============================================================ */
  const SectionNav = ({
    section,
    setSection
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex gap-1 p-1 rounded-2xl border border-[var(--line)] backdrop-blur-md"
  }, NAV.map(n => {
    const active = section === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => setSection(n.id),
      className: `relative flex items-center gap-2 px-4 h-9 rounded-xl font-display text-[12px] uppercase tracking-[0.18em] transition-all
                        ${active ? "pill-active" : "text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-white/[0.03]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: active ? "text-[var(--accent)]" : ""
    }, n.icon), n.label);
  })));

  /* ============================================================
     Hero â€” keyboard preview card
     ============================================================ */
  const HeroCard = ({
    children,
    badge,
    breadcrumb
  }) => /*#__PURE__*/React.createElement("section", {
    className: "surface rounded-3xl px-6 lg:px-10 py-7 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-[50%] opacity-30 pointer-events-none blur-3xl",
    style: {
      background: "var(--accent-gradient, var(--accent))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-faint)]"
  }, breadcrumb), badge), children));

  /* ============================================================
     App
     ============================================================ */
  // Startup update gate: first-run opt-out prompt + the auto-install overlay.
  // Driven by App's `updGate` state machine (idle | firstrun | updating | done | error).
  function UpdateGate({
    gate,
    onChoose,
    onDismiss
  }) {
    if (!gate || gate.phase === "idle") return null;
    // Above the setup wizard (zIndex 9999): on a true first run the update
    // decision is asked first, then dismisses to reveal onboarding underneath.
    const backdrop = "fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm";
    const card = "w-[430px] max-w-[92vw] rounded-2xl border border-[var(--line)] bg-[#0b1016] shadow-2xl p-5";
    const btnPrimary = "px-3 h-9 rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25";
    const btnGhost = "px-3 h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]";
    if (gate.phase === "firstrun") {
      return /*#__PURE__*/React.createElement("div", {
        className: backdrop
      }, /*#__PURE__*/React.createElement("div", {
        className: card
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-display text-[14px] uppercase tracking-[0.16em] text-[var(--text)]"
      }, "Keep Aether up to date?"), /*#__PURE__*/React.createElement("div", {
        className: "text-[12.5px] text-[var(--text-dim)] mt-2 leading-relaxed"
      }, "Aether can install new releases automatically when you open it. You can change this any time in Settings."), /*#__PURE__*/React.createElement("div", {
        className: "mt-4 flex gap-2"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => onChoose(true),
        className: btnPrimary
      }, "Yes, auto-update"), /*#__PURE__*/React.createElement("button", {
        onClick: () => onChoose(false),
        className: btnGhost
      }, "No, I'll check manually"))));
    }
    const dismissable = gate.phase === "done" || gate.phase === "error";
    return /*#__PURE__*/React.createElement("div", {
      className: backdrop
    }, /*#__PURE__*/React.createElement("div", {
      className: card
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[14px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, gate.phase === "error" ? "Update error" : "Updating Aether"), /*#__PURE__*/React.createElement("div", {
      className: `text-[12.5px] mt-2 leading-relaxed ${gate.phase === "error" ? "text-rose-300/90" : "text-[var(--text-dim)]"}`
    }, gate.msg || "Workingâ€¦"), gate.phase === "updating" && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full bg-[var(--accent)]/70 animate-pulse",
      style: {
        width: "40%"
      }
    })), dismissable && /*#__PURE__*/React.createElement("div", {
      className: "mt-4 flex justify-end"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onDismiss,
      className: btnGhost
    }, gate.phase === "done" ? "OK" : "Dismiss"))));
  }
  function App() {
    const [theme, setTheme] = useTheme();
    const [themeOpen, setThemeOpen] = useState(false);
    // First-run setup wizard: open until the user finishes/skips it once.
    const [wizardOpen, setWizardOpen] = useState(() => {
      try {
        return localStorage.getItem("aether-setup-done") !== "1";
      } catch {
        return false;
      }
    });
    const closeWizard = () => {
      try {
        localStorage.setItem("aether-setup-done", "1");
      } catch {}
      setWizardOpen(false);
    };
    const [submitOpen, setSubmitOpen] = useState(false);

    // ---- auto-update on launch (first-run opt-out) ----
    // On mount, read the persisted preference: null -> first-run prompt; true ->
    // silently check and auto-install; false -> nothing. The updating overlay only
    // appears once an update is confirmed, so there is no flash when up to date.
    const [updGate, setUpdGate] = useState({
      phase: "idle",
      info: null,
      msg: ""
    });
    const updRan = useRef(false);
    const dismissUpdate = () => setUpdGate({
      phase: "idle",
      info: null,
      msg: ""
    });
    const runUpdateFlow = async (api, showChecking) => {
      if (showChecking) setUpdGate({
        phase: "updating",
        info: null,
        msg: "Checking for updatesâ€¦"
      });
      let chk;
      try {
        chk = await api.check_update();
      } catch {
        if (showChecking) dismissUpdate();
        return;
      }
      if (!chk || !chk.ok || !chk.update) {
        if (showChecking) dismissUpdate();
        return;
      }
      setUpdGate({
        phase: "updating",
        info: chk,
        msg: `Updating Aether to v${chk.latest}â€¦`
      });
      // Poll download progress so the launch overlay reports movement rather than
      // sitting on one line for a ~20 MB download.
      let poll = null;
      if (api.update_progress) {
        poll = setInterval(async () => {
          try {
            const p = await api.update_progress();
            if (!p?.ok) return;
            const mb = n => (n / 1048576).toFixed(1);
            if (p.phase === "downloading" && p.total) {
              setUpdGate(g => g.phase === "updating" ? {
                ...g,
                msg: `Downloading v${chk.latest}â€¦ ${p.pct}%  (${mb(p.done)} / ${mb(p.total)} MB)`
              } : g);
            } else if (p.phase === "verified") {
              setUpdGate(g => g.phase === "updating" ? {
                ...g,
                msg: "Verifying downloadâ€¦"
              } : g);
            }
          } catch {}
        }, 400);
      }
      const stopPoll = () => {
        if (poll) {
          clearInterval(poll);
          poll = null;
        }
      };
      try {
        const r = await api.apply_update(chk.asset_url, chk.asset_name, chk.asset_size, chk.asset_sha256);
        stopPoll();
        if (!r || !r.ok) {
          setUpdGate({
            phase: "error",
            info: chk,
            msg: r?.error || "update failed"
          });
          return;
        }
        if (r.quit) setUpdGate({
          phase: "done",
          info: chk,
          msg: "Installer launched â€” Aether will close and reopen."
        });else if (r.restart) setUpdGate({
          phase: "done",
          info: chk,
          msg: "Update installed â€” quit and reopen Aether to apply it."
        });else setUpdGate({
          phase: "done",
          info: chk,
          msg: r.path ? `Downloaded to ${r.path}` : "Downloaded."
        });
      } catch (e) {
        stopPoll();
        setUpdGate({
          phase: "error",
          info: chk,
          msg: String(e)
        });
      }
    };
    const chooseAutoUpdate = async yes => {
      const api = getApi();
      try {
        await api?.set_auto_update?.(yes);
      } catch {}
      if (yes) await runUpdateFlow(api, true);else dismissUpdate();
    };
    useEffect(() => {
      let tries = 0,
        timer = null;
      const run = async () => {
        const api = getApi();
        if (!api?.get_auto_update) {
          if (tries++ < 40) timer = setTimeout(run, 200);
          return;
        }
        if (updRan.current) return;
        updRan.current = true;
        let pref;
        try {
          const r = await api.get_auto_update();
          pref = r && r.autoUpdate;
        } catch {
          return;
        }
        if (pref === null || pref === undefined) setUpdGate({
          phase: "firstrun",
          info: null,
          msg: ""
        });else if (pref === true) runUpdateFlow(api, false);
      };
      run();
      return () => {
        if (timer) clearTimeout(timer);
      };
    }, []);

    // User zoom multiplier (top-bar âˆ’ / % / + control), on top of the auto-fit.
    const [uiZoom, setUiZoom] = useState(() => {
      const v = parseFloat(localStorage.getItem("aether-zoom"));
      return v > 0 ? v : 1;
    });
    useEffect(() => {
      try {
        localStorage.setItem("aether-zoom", String(uiZoom));
      } catch {}
    }, [uiZoom]);

    // Scale only the WORKSPACE (widgets) to the window â€” the top bar stays fixed.
    // CSS `zoom` (not transform) scales the coordinate system itself, so widget
    // drag/resize pointer math stays correct. Fit the design canvas to the area
    // below the top bar, then apply the user's zoom multiplier.
    useEffect(() => {
      const DESIGN_W = 1480,
        DESIGN_H = 900,
        TOPBAR = 64;
      const fit = () => {
        const base = Math.min(window.innerWidth / DESIGN_W, (window.innerHeight - TOPBAR) / DESIGN_H);
        const el = document.getElementById("desktop-main");
        if (el) el.style.setProperty("--ws-zoom", String(Math.max(0.4, Math.min(base * uiZoom, 2.4))));
      };
      fit();
      window.addEventListener("resize", fit);
      return () => window.removeEventListener("resize", fit);
    }, [uiZoom]);

    // Ctrl + mouse wheel over the workspace zooms in/out.
    useEffect(() => {
      const el = document.getElementById("desktop-main");
      if (!el) return;
      const onWheel = e => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        const step = e.deltaY < 0 ? 0.08 : -0.08;
        setUiZoom(z => Math.max(0.5, Math.min(2, +(z + step).toFixed(2))));
      };
      el.addEventListener("wheel", onWheel, {
        passive: false
      });
      return () => el.removeEventListener("wheel", onWheel);
    }, []);

    // Connection is OFF until the user pairs (or auto-connect is enabled).
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [autoConnect, setAutoConnect] = useState(() => {
      try {
        return localStorage.getItem("aether-autoconnect") === "1";
      } catch {
        return false;
      }
    });
    const [section, setSection] = useState("actuation");

    // ---- board awareness (additive; single-board path unchanged) --------------
    // `board` mirrors get_board().active; `boardRoster` mirrors list_boards().boards
    // (each entry carries live `connected` / `active` flags). Stays null/[] when
    // the bridge is absent, which renders exactly the pre-board-awareness UI.
    const [board, setBoard] = useState(null);
    const [boardRoster, setBoardRoster] = useState([]);
    const [boardSwitching, setBoardSwitching] = useState(false);
    // Honest-failure notices: [{id, feature, msg}] fed by the apiCall unsupported tap.
    const [boardNotices, setBoardNotices] = useState([]);

    // Dynamic profile list + the currently active id.
    const [profiles, setProfiles] = useState([{
      ...SEED_PROFILE
    }]);
    const [activeId, setActiveId] = useState(SEED_PROFILE.id);
    // The big "is settings ready to start saving" flag. Stays true (= block saves)
    // until the first hydration attempt finishes, success or fail.
    const [hydrated, setHydrated] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // null | "saving" | "saved" | "error"

    const [layer, setLayer] = useState("default");

    // Empty by default. Actuation/dead-band changes are only sent for the
    // selected keys; with nothing selected they're a no-op (use "Select All" to
    // hit every key) so the whole board is never overwritten by accident.
    const [selectedKeys, setSelectedKeys] = useState(() => new Set());
    const [actuation, setActuation] = useState(1.70);
    const [rtPress, setRtPress] = useState(0.05);
    const [rtRelease, setRtRelease] = useState(0.05);
    const [rtEnabled, setRtEnabled] = useState(false);
    const [polling, setPolling] = useState(8);
    const [travelTest, setTravelTest] = useState(false);
    const [liveDepths, setLiveDepths] = useState(null); // real per-key travel (mm)
    const [lightFrame, setLightFrame] = useState(null); // live effect frame {code:[r,g,b]}
    const [calibrating, setCalibrating] = useState(false);
    const [calibratedKeys, setCalibratedKeys] = useState(() => new Set()); // codes confirmed calibrated by firmware
    const [lightNonce, setLightNonce] = useState(0); // bump to force-resend lighting (e.g. after calibration)
    const [deadTop, setDeadTop] = useState(0.04);
    const [deadBottom, setDeadBottom] = useState(0.05);
    const [switchId, setSwitchId] = useState("hm1");
    // Per-key actuation as the firmware actually stores it. Populated by reading
    // the device on connect and after every Apply so the board renders each key
    // with its own value instead of mirroring the global slider everywhere.
    const [perKeyActuation, setPerKeyActuation] = useState({});

    // Gamepad: virtual-pad capture + keyâ†’control mappings.
    const DEFAULT_PAD_MAP = [{
      key: "A",
      axis: "LX",
      direction: -1,
      threshold_mm: 1.5
    }, {
      key: "D",
      axis: "LX",
      direction: 1,
      threshold_mm: 1.5
    }, {
      key: "W",
      axis: "RT",
      direction: 1,
      threshold_mm: 1.5
    }, {
      key: "S",
      axis: "LT",
      direction: 1,
      threshold_mm: 1.5
    }, {
      key: "Space",
      axis: "BTN_A",
      direction: 1,
      threshold_mm: 1.0
    }];
    const [gamepadOn, setGamepadOn] = useState(false);
    const [gamepadMap, setGamepadMap] = useState(DEFAULT_PAD_MAP);

    // Out-of-the-box: RGB radar (user pref).
    const [colors, setColors] = useState(["#ff0040", "#ff8a00", "#ffd400", "#1eff7a", "#00b7ff", "#9d4edd"]);
    const [bgColor, setBgColor] = useState("#000000");
    const [perKeyColors, setPerKeyColors] = useState({});
    const [zones, setZones] = useState([]); // effect zones for Custom mode
    const [pattern, setPattern] = useState("radar");
    const [brightness, setBrightness] = useState(100);
    const [speed, setSpeed] = useState(60);
    const [power, setPower] = useState(true);
    const [fullColor, setFullColor] = useState(false); // rainbow / full-spectrum
    const [direction, setDirection] = useState(0); // 0â†’ 1â† 2â†‘ 3â†“
    const [striOrient, setStriOrient] = useState("v"); // striation: v|h|both
    const [bgBright, setBgBright] = useState(100); // background brightness %

    const [socdMode, setSocdMode] = useState("last");
    const [hotkey] = useState("Fn + R-Shift");
    const [hotkeyEnabled, setHotkeyEnabled] = useState(true);
    // SOCD profiles live here (not inside SOCDSection) so they persist + save.
    const [socdProfiles, setSocdProfiles] = useState([{
      id: "SOCD1",
      k1: "A",
      k2: "D",
      mode: 1,
      active: true
    }, {
      id: "SOCD2",
      k1: "W",
      k2: "S",
      mode: 1
    }]);
    const [socdActive, setSocdActive] = useState("SOCD1");

    // ---- per-profile persistence ----------------------------------------------
    // applyingRef blocks the save effect while we hydrate (mount OR profile
    // switch). Starts true so the very first render doesn't clobber the file
    // before load_settings has a chance to run.
    const applyingRef = useRef(true);
    const collectState = () => ({
      pattern,
      colors,
      bgColor,
      brightness,
      speed,
      power,
      fullColor,
      direction,
      striOrient,
      bgBright,
      perKeyColors,
      zones,
      actuation,
      rtPress,
      rtRelease,
      rtEnabled,
      polling,
      deadTop,
      deadBottom,
      switchId,
      socdProfiles,
      socdActive,
      hotkeyEnabled,
      socdMode,
      layer,
      gamepadMap
    });
    const applyState = s => {
      if (!s) return;
      applyingRef.current = true;
      const set = (v, fn) => {
        if (v !== undefined) fn(v);
      };
      set(s.pattern, setPattern);
      set(s.colors, setColors);
      set(s.bgColor, setBgColor);
      set(s.brightness, setBrightness);
      set(s.speed, setSpeed);
      set(s.power, setPower);
      set(s.fullColor, setFullColor);
      set(s.direction, setDirection);
      set(s.bgBright, setBgBright);
      set(s.striOrient, setStriOrient);
      set(s.perKeyColors, setPerKeyColors);
      set(s.zones, setZones);
      set(s.actuation, setActuation);
      set(s.rtPress, setRtPress);
      set(s.rtRelease, setRtRelease);
      set(s.rtEnabled, setRtEnabled);
      set(s.polling, setPolling);
      set(s.deadTop, setDeadTop);
      set(s.deadBottom, setDeadBottom);
      set(s.switchId, setSwitchId);
      set(s.socdProfiles, setSocdProfiles);
      set(s.socdActive, setSocdActive);
      set(s.hotkeyEnabled, setHotkeyEnabled);
      set(s.socdMode, setSocdMode);
      set(s.layer, setLayer);
      set(s.gamepadMap, setGamepadMap);
      setTimeout(() => {
        applyingRef.current = false;
      }, 80);
    };

    // Hydrate from settings.json once the pywebview bridge is ready. We poll
    // because Edge WebView2 sometimes mounts the bridge after first render, and
    // a one-shot load misses the window â€” which is the bug that made nothing
    // ever persist.
    useEffect(() => {
      let cancelled = false;
      const tryLoad = async (attempt = 0) => {
        if (cancelled) return;
        if (!window.pywebview?.api?.load_settings) {
          if (attempt < 50) setTimeout(() => tryLoad(attempt + 1), 100);else {
            applyingRef.current = false;
            setHydrated(true);
          }
          return;
        }
        try {
          const r = await window.pywebview.api.load_settings();
          if (cancelled) return;
          const migrated = r && r.ok ? migrateSettings(r.settings) : null;
          if (migrated && migrated.profiles && migrated.profiles.length) {
            setProfiles(migrated.profiles);
            const aid = migrated.activeProfile && migrated.profiles.find(p => p.id === migrated.activeProfile) ? migrated.activeProfile : migrated.profiles[0].id;
            setActiveId(aid);
            const active = migrated.profiles.find(p => p.id === aid);
            if (active?.state) applyState(active.state);
            if (migrated.globals?.autoConnect !== undefined) setAutoConnect(!!migrated.globals.autoConnect);
            if (migrated.globals?.section) setSection(migrated.globals.section === "other" ? "settings" : migrated.globals.section);
          }
        } catch {}
        setTimeout(() => {
          applyingRef.current = false;
          setHydrated(true);
        }, 100);
      };
      tryLoad();
      return () => {
        cancelled = true;
      };
    }, []);

    // Mirror the live state into the active profile's `state` slot whenever
    // anything changes â€” but only after hydration. Saves immediately (no
    // debounce) because Python json.dump is microseconds and a close-too-fast
    // window was a real source of "settings didn't persist". A tiny 120ms debounce
    // coalesces bursts (sliders) without risking lost writes on quick exits.
    const saveTimer = useRef(null);
    useEffect(() => {
      if (!hydrated || applyingRef.current) return;
      const state = collectState();
      setProfiles(ps => {
        const next = ps.map(p => p.id === activeId ? {
          ...p,
          state
        } : p);
        // Persist the whole blob (profiles + active id + globals).
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          if (!window.pywebview?.api?.save_settings) return;
          setSaveStatus("saving");
          const blob = {
            profiles: next,
            activeProfile: activeId,
            globals: {
              autoConnect,
              section
            }
          };
          Promise.resolve(window.pywebview.api.save_settings(blob)).then(r => {
            setSaveStatus(r && r.ok ? "saved" : "error");
            setTimeout(() => setSaveStatus(null), 1400);
          }).catch(() => {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(null), 1400);
          });
        }, 120);
        return next;
      });
    }, [hydrated, activeId, pattern, colors, bgColor, brightness, speed, power, fullColor, direction, striOrient, bgBright, perKeyColors, zones, actuation, rtPress, rtRelease, rtEnabled, polling, deadTop, deadBottom, switchId, socdProfiles, socdActive, hotkeyEnabled, socdMode, layer, gamepadMap, autoConnect, section]);

    // Force a synchronous flush before the window closes / page unloads, so the
    // 120ms debounce never costs us the last edit.
    useEffect(() => {
      const flush = () => {
        if (!window.pywebview?.api?.save_settings || !hydrated) return;
        const state = collectState();
        const ps = profiles.map(p => p.id === activeId ? {
          ...p,
          state
        } : p);
        try {
          window.pywebview.api.save_settings({
            profiles: ps,
            activeProfile: activeId,
            globals: {
              autoConnect,
              section
            }
          });
        } catch {}
      };
      window.addEventListener("beforeunload", flush);
      window.addEventListener("pagehide", flush);
      return () => {
        window.removeEventListener("beforeunload", flush);
        window.removeEventListener("pagehide", flush);
      };
    });

    // ---- profile management actions -------------------------------------------
    const switchProfile = id => {
      if (id === activeId) return;
      const p = profiles.find(x => x.id === id);
      if (!p) return;
      setActiveId(id);
      applyState(p.state || {});
    };
    const renameProfile = (id, name) => {
      setProfiles(ps => ps.map(p => p.id === id ? {
        ...p,
        name
      } : p));
    };
    const addProfile = (name, duplicateCurrent = false) => {
      const newId = "p_" + Date.now().toString(36);
      const seed = duplicateCurrent ? collectState() : {};
      setProfiles(ps => [...ps, {
        id: newId,
        name: name || `Profile ${ps.length + 1}`,
        state: seed
      }]);
      // Switch to it; if duplicating we already have the right state in memory.
      setActiveId(newId);
      if (!duplicateCurrent) applyState({});
    };
    const duplicateProfile = id => {
      const src = profiles.find(p => p.id === id);
      if (!src) return;
      const newId = "p_" + Date.now().toString(36);
      setProfiles(ps => [...ps, {
        id: newId,
        name: `${src.name} (copy)`,
        state: JSON.parse(JSON.stringify(src.state || {}))
      }]);
    };
    const deleteProfile = id => {
      if (profiles.length <= 1) return;
      const remain = profiles.filter(p => p.id !== id);
      setProfiles(remain);
      if (activeId === id) {
        setActiveId(remain[0].id);
        applyState(remain[0].state || {});
      }
    };
    const keyboardMode = section === "actuation" ? "actuation" : section === "lighting" ? "lighting" : section === "socd" ? "socd" : "keymap";
    const ledMap = useMemo(() => {
      if (section !== "lighting") return {};
      const m = {};
      // Effect color depends on pattern. For "static" all keys = colors[0].
      // For others we cycle palette across keys. bgColor underlies un-effect keys.
      // COLOR HONESTY: previewSimColor (workspaces/lighting.jsx, shared with the
      // verification harness) knows that a mode dispatching to the BOARD's
      // firmware only ever receives colors[0] + bgColor â€” so the schematic must
      // not scatter the rest of the palette (the out-of-the-box seed above
      // contains #ffd400: that is the literal yellow that appeared inside a
      // purple firmware twinkle over white). For legacy grid ids on host-engine
      // boards (the shipped Win60 surface) and when the helper is missing, the
      // inline sim below is byte-identical to the previous shipped code.
      const LBH = window.AetherWorkspaces && window.AetherWorkspaces.LIGHTING_BOARD;
      const bl = board && board.lighting || null;
      window.AetherKeyboard.KB_ROWS.flat().forEach(([_, __, code], idx) => {
        if (perKeyColors[code]) {
          m[code] = perKeyColors[code];
          return;
        }
        if (LBH && LBH.previewSimColor) {
          m[code] = LBH.previewSimColor(bl, {
            pattern,
            colors,
            bgColor
          }, idx);
          return;
        }
        if (pattern === "static") {
          m[code] = colors[0];
          return;
        }
        // Simulated effect: every nth key gets an effect color, rest = bg
        const hit = idx % 6 === 0 || colors.length === 1;
        m[code] = hit ? colors[idx % colors.length] : bgColor;
      });
      return m;
    }, [section, colors, bgColor, perKeyColors, pattern, board]);
    const selectedKey = useMemo(() => Array.from(selectedKeys)[0] || null, [selectedKeys]);

    /* ===== HID bridge: handlers ===== */
    // Pair button -> real connect / disconnect.
    const togglePair = () => {
      if (connecting) return;
      setConnecting(true);
      if (connected) {
        apiCall("disconnect").then(() => {
          setConnected(false);
          setLiveDepths(null);
        }).finally(() => setConnecting(false));
      } else {
        apiCall("connect").then(r => setConnected(!!(r && r.ok))).finally(() => setConnecting(false));
      }
    };

    /* ===== board awareness: fetch, switch, honest failures ===== */
    // Refresh the active board + the live roster. Safe no-op without a bridge.
    // Both setters dedupe by content: the bridge hands back a fresh object on
    // every poll, and swapping identity for identical data would re-render the
    // whole App (ctx is rebuilt from `board`) every 5 s for nothing.
    const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const refreshBoards = async () => {
      try {
        const g = await apiCall("get_board");
        if (g && g.active !== undefined) {
          const next = g.active || null;
          setBoard(prev => sameJson(prev, next) ? prev : next);
        }
        const l = await apiCall("list_boards");
        if (l && l.ok && Array.isArray(l.boards)) setBoardRoster(prev => sameJson(prev, l.boards) ? prev : l.boards);
      } catch {}
    };

    // Fetch once when the bridge comes up, then poll slowly so plugging in a
    // second board (or pulling one) updates the picker without a restart.
    // Skipped while the window is hidden/minimised: each tick is two bridge
    // calls and a hid.enumerate() on the Python side.
    useEffect(() => {
      let alive = true,
        timer = null,
        iv = null,
        tries = 0;
      const boot = () => {
        if (!alive) return;
        if (!getApi()) {
          if (tries++ < 50) timer = setTimeout(boot, 200);
          return;
        }
        refreshBoards();
        iv = setInterval(() => {
          if (alive && !document.hidden) refreshBoards();
        }, 5000);
      };
      boot();
      return () => {
        alive = false;
        if (timer) clearTimeout(timer);
        if (iv) clearInterval(iv);
      };
    }, []);

    // Explicit board switch: select_board tears down the Python session and
    // rebinds device + driver + keymap; mirror that teardown in UI state, then
    // reconnect to the newly selected board. Only ever runs from the picker â€”
    // a single-board machine can never reach this code path.
    const selectBoard = async slug => {
      if (boardSwitching) return {
        ok: false,
        error: "switch in progress"
      };
      setBoardSwitching(true);
      try {
        const r = await apiCall("select_board", slug);
        if (!r || !r.ok) return r || {
          ok: false,
          error: "select_board failed"
        };
        setConnected(false);
        setLiveDepths(null);
        setLightFrame(null);
        setTravelTest(false);
        setCalibrating(false);
        setCalibratedKeys(new Set());
        setPerKeyActuation({});
        setGamepadOn(false);
        if (r.active) setBoard(r.active);
        const c = await apiCall("connect");
        setConnected(!!(c && c.ok));
        await refreshBoards();
        return r;
      } finally {
        setBoardSwitching(false);
      }
    };

    // Surface {unsupported:true} results (backend capability gate) as visible,
    // auto-expiring notices with the backend's own reason string.
    useEffect(() => {
      const onUnsupported = (name, res) => {
        // Prefer the backend's reason; fall back to the feature name, never the
        // raw api method name, so the notice reads like the rest of the app.
        const msg = res && res.error || `${res && res.feature || name} is not supported on this board`;
        const id = Date.now() + Math.random();
        setBoardNotices(ns => ns.some(n => n.msg === msg) ? ns : [...ns.slice(-3), {
          id,
          feature: res && res.feature,
          msg
        }]);
        setTimeout(() => setBoardNotices(ns => ns.filter(n => n.id !== id)), 6000);
      };
      unsupportedListeners.add(onUnsupported);
      return () => unsupportedListeners.delete(onUnsupported);
    }, []);
    const dismissBoardNotice = id => setBoardNotices(ns => ns.filter(n => n.id !== id));

    // Keep the active-board snapshot fresh across connect/disconnect (the 5s
    // roster poll would catch it anyway; this just makes it immediate).
    useEffect(() => {
      if (getApi()) refreshBoards();
    }, [connected]);

    // The capability context value â€” the locked contract for the next wave
    // (shape documented in components/board-context.jsx). Also exposed to the
    // current widget files as ctx.board.
    const boardCtx = makeBoardContextValue ? makeBoardContextValue({
      board,
      roster: boardRoster,
      selectBoard,
      refreshBoards,
      switching: boardSwitching
    }) : null;

    // Polling change restarts the board, so only ever send it on an explicit click.
    const handleSetPolling = p => {
      setPolling(p);
      if (connected) apiCall("set_poll", p);
    };
    const handleCalibrate = start => {
      setCalibrating(start);
      if (start) setCalibratedKeys(new Set());
      apiCall("calibrate", start, false); // lighting keeps running during calibration
    };

    // Gamepad: push the current map then toggle capture on/off.
    const [gamepadError, setGamepadError] = useState(null); // {msg, needsDriver}
    const handleGamepadToggle = on => {
      setGamepadOn(on);
      if (on) setGamepadError(null);
      // pywebview runs every bridge call on its own thread, so two back-to-back
      // calls are NOT ordered. Push the map first and only then enable capture,
      // or the pad could open with the previous map and immediately reopen.
      const prep = on ? apiCall("set_gamepad_map", gamepadMap) : Promise.resolve();
      prep.then(() => apiCall("set_gamepad_capture", on)).then(r => {
        if (!(r && r.ok)) {
          setGamepadOn(false);
          setGamepadError({
            msg: r && r.error || "failed",
            needsDriver: !!(r && r.needs_vigembus)
          });
        } else {
          setGamepadError(null);
        }
      });
    };
    const handleInstallVigem = async () => {
      setGamepadError({
        msg: "installing ViGEmBus (approve the UAC prompt)â€¦",
        needsDriver: false,
        installing: true
      });
      const r = await apiCall("install_vigembus");
      if (r && r.ok) setGamepadError({
        msg: "ViGEmBus installed â€” try capture again.",
        needsDriver: false
      });else setGamepadError({
        msg: r && r.error || "install failed",
        needsDriver: true
      });
    };
    const handleGamepadMapApply = map => {
      setGamepadMap(map);
      if (gamepadOn) apiCall("set_gamepad_map", map);
    };
    const handlePickSwitch = id => {
      setSwitchId(id);
      // Pass the registry switch id itself: Api.set_switch_codes resolves it
      // against THE ACTIVE BOARD's `actuation.switches` table and fails closed on
      // an unknown id. (A hardcoded idâ†’code table here would silently send the
      // Win60's bytes to every other board.)
      // A board that declares no table (or no board data at all â€” registry
      // unreadable) can only take a raw code, so keep the legacy Win60 bytes
      // for exactly that case.
      const table = board && board.actuation && board.actuation.switches;
      const legacy = {
        hm1: 1,
        hh1: 2,
        cy1: 3,
        tc1: 5
      };
      const arg = Array.isArray(table) && table.length ? String(id) : legacy[id] || 1;
      if (connected) apiCall("set_switch_codes", Array.from(selectedKeys), arg);
    };

    // Effect zones (Custom mode): a group of keys running their own effect.
    const addZone = () => {
      const codes = Array.from(selectedKeys);
      if (!codes.length) return;
      setZones(zs => [...zs, {
        id: Date.now(),
        codes,
        mode: "twinkle",
        colors: ["#ff1f5a", "#00f5ff"],
        speed: 60
      }]);
    };
    const updateZone = (id, patch) => setZones(zs => zs.map(z => z.id === id ? {
      ...z,
      ...patch
    } : z));
    const removeZone = id => setZones(zs => zs.filter(z => z.id !== id));
    const handleSocdApply = profiles => {
      const pairs = (profiles || []).filter(p => p.k1 && p.k2).map(p => ({
        model: p.mode || 1,
        key1: LABEL_TO_CODE[p.k1] || p.k1,
        key2: LABEL_TO_CODE[p.k2] || p.k2
      }));
      if (pairs.length) apiCall("set_socd", pairs);
    };

    /* ===== HID bridge: effects (push state to the board) ===== */
    // Persist the auto-connect preference.
    useEffect(() => {
      try {
        localStorage.setItem("aether-autoconnect", autoConnect ? "1" : "0");
      } catch {}
    }, [autoConnect]);

    // ---- tray "mini mode" bridge --------------------------------------------
    // The tray panel (tray.py) never touches the board itself: it sets
    // `pattern`/`speed` HERE through window.__aetherTraySet, so the same
    // per-board dispatch + settings persistence run as for a click in the
    // Lighting tab â€” and it reads state back from Api.tray_sync, which we push
    // whenever anything it shows changes (the effect list is the exact grid the
    // Lighting tab offers for the active board).
    useEffect(() => {
      window.__aetherTraySet = patch => {
        if (!patch) return;
        if (typeof patch.pattern === "string") setPattern(patch.pattern);
        if (patch.speed != null && Number.isFinite(Number(patch.speed))) setSpeed(Math.max(0, Math.min(100, Math.round(Number(patch.speed)))));
      };
      return () => {
        delete window.__aetherTraySet;
      };
    }, []);
    useEffect(() => {
      const bl = board && board.lighting || null;
      const LB = window.AetherWorkspaces && window.AetherWorkspaces.LIGHTING_BOARD;
      const grid = LB && LB.modeGridFor ? LB.modeGridFor(bl) : [];
      apiCall("tray_sync", {
        pattern,
        speed,
        connected: !!connected,
        board: board && board.name || null,
        effects: grid.map(m => ({
          id: m.id,
          label: m.label,
          icon: m.icon || ""
        }))
      });
      // `board` by slug, not identity: the 5 s roster poll rebuilds the object.
    }, [pattern, speed, connected, board && board.slug]);

    // One-shot auto-connect on launch, only if the user opted in. Fires once,
    // after hydration resolves `autoConnect` from settings.json, so a persisted
    // preference is honored. Guarded by a ref so it never fires twice.
    const didAuto = useRef(false);
    useEffect(() => {
      if (!hydrated || didAuto.current) return;
      didAuto.current = true;
      if (autoConnect && !connected) togglePair();
    }, [hydrated]);

    // Auto-reconnect watchdog: while Auto is on, poll the real device state and
    // (re)connect whenever the board appears â€” covers unplug/replug, not just
    // launch. Uses refs so the long-lived interval never reads stale state.
    const connectedRef = useRef(connected);
    connectedRef.current = connected;
    const connectingRef = useRef(connecting);
    connectingRef.current = connecting;
    useEffect(() => {
      if (!hydrated || !autoConnect) return;
      let alive = true,
        busy = false;
      const tick = async () => {
        if (!alive || busy || connectingRef.current) return;
        busy = true;
        try {
          const s = await apiCall("status");
          const isOpen = !!(s && s.connected);
          if (isOpen) {
            if (!connectedRef.current) setConnected(true);
          } else {
            if (connectedRef.current) {
              setConnected(false);
              setLiveDepths(null);
            }
            const r = await apiCall("connect");
            if (alive && r && r.ok) setConnected(true);
          }
        } catch {}
        busy = false;
      };
      const id = setInterval(tick, 2500);
      return () => {
        alive = false;
        clearInterval(id);
      };
    }, [hydrated, autoConnect]);

    // Lighting. ALL animated effects run on the HOST per-key engine so their
    // behaviour is consistent and matches the names (auto Ripple/Cross/Fireworks,
    // distinct Striation, directional flow, etc.) regardless of color count.
    // Only Static and Full-RGB use the firmware mode. `section` is intentionally
    // NOT a dependency: switching tabs never re-sends.
    //
    // PER-BOARD DISPATCH: the firmware-vs-host decision and every byte of the
    // resulting call are built by buildLightCalls (workspaces/lighting.jsx, one
    // source of truth shared with the verification harness) from THE ACTIVE
    // BOARD's registry mode table â€” never from the hardcoded Win60 MODE_BYTE
    // table, whose `?? 0` fallback meant LIGHTS OFF on the MINI 60 HE PRO.
    // When there is no board mode table at all (no bridge / board fetch failed)
    // buildLightCalls returns null and the legacy branch below runs â€” exactly
    // today's shipped code path, byte for byte.
    //
    // `board` is read through a ref and keyed by slug so the 5s roster poll
    // (which rebuilds the object identity) never re-sends lighting; a genuine
    // board switch (slug change) re-resolves and re-sends once.
    const boardRef = useRef(null);
    boardRef.current = board;
    const boardSlug = board && board.slug || null;
    const lightTimer = useRef(null);
    useEffect(() => {
      if (!connected) return;
      if (pattern === "custom") return; // custom effect (below) owns the engine
      clearTimeout(lightTimer.current);
      lightTimer.current = setTimeout(() => {
        // Unified brightness: do NOT pre-scale the bg by bgBright here. The host
        // engine applies the main `brightness` to both fg and bg equally, so any
        // pre-scaling here would make the bg dimmer than the effect colors by
        // exactly the bgBright ratio (the two used to fight).
        const bgScaled = hexToRgbArr(bgColor);
        const bl = boardRef.current && boardRef.current.lighting || null;
        const LB = window.AetherWorkspaces && window.AetherWorkspaces.LIGHTING_BOARD;
        const built = LB && LB.buildLightCalls ? LB.buildLightCalls(bl, {
          pattern,
          power,
          fullColor,
          colors,
          bgColor,
          brightness,
          speed,
          direction,
          striOrient
        }) : null;
        if (built) {
          // Sequential, not forEach: pywebview dispatches each bridge call on
          // its own thread, so ["stop_multicolor", "set_light"] fired together
          // can land as set_light THEN stop â€” the engine's last frame overwrites
          // the static colour and the board is left on stale Custom pixels.
          callSeq(built.calls);
          // Honest fallback: the selected mode exists on neither this board's
          // firmware nor the host engine â€” static was shown instead of silently
          // sending a byte that may mean OFF. Same notice pipe as the backend's
          // {unsupported:true} results.
          if (built.notice) {
            const msg = built.notice;
            const id = Date.now() + Math.random();
            setBoardNotices(ns => ns.some(n => n.msg === msg) ? ns : [...ns.slice(-3), {
              id,
              feature: "lighting",
              msg
            }]);
            setTimeout(() => setBoardNotices(ns => ns.filter(n => n.id !== id)), 6000);
          }
          return;
        }
        // Legacy path (no board mode table): today's shipped Win60-era code.
        // Animated effects run on the HOST per-key engine so they can show the
        // full multi-color palette (firmware effects only hold one fg+bg). Only
        // Static and Full-RGB use the firmware mode directly.
        const useHost = power && !fullColor && pattern !== "static";
        if (useHost) {
          apiCall("start_multicolor", pattern, colors.map(hexToRgbArr), bgScaled, brightness, speed, direction, striOrient);
        } else {
          const [r, g, b] = hexToRgbArr(colors[0] || "#ffffff");
          const [br, bg, bb] = bgScaled;
          callSeq([["stop_multicolor"], ["set_light", MODE_BYTE[pattern] ?? 0, r, g, b, briByte(brightness), spdByte(speed), br, bg, bb, direction, power, fullColor ? 1 : 0]]);
        }
      }, 70);
      return () => clearTimeout(lightTimer.current);
    }, [connected, pattern, colors, bgColor, brightness, speed, power, fullColor, direction, bgBright, striOrient, lightNonce, calibrating, boardSlug]);

    // Custom mode: effect zones if any are defined (each key group runs its own
    // animated effect), otherwise static per-key colors.
    useEffect(() => {
      if (!connected || pattern !== "custom") return;
      if (zones.length) {
        // Unified brightness: do NOT pre-scale the bg by bgBright here. The host
        // engine applies the main `brightness` to both fg and bg equally, so any
        // pre-scaling here would make the bg dimmer than the effect colors by
        // exactly the bgBright ratio (the two used to fight).
        const bgScaled = hexToRgbArr(bgColor);
        apiCall("start_zones", zones.map(z => ({
          codes: z.codes,
          mode: z.mode,
          colors: (z.colors || []).map(hexToRgbArr),
          bg: bgScaled,
          // keys outside zones + zone backdrops use it
          brightness,
          speed: z.speed != null ? z.speed : speed,
          direction
        })));
      } else {
        const map = {};
        Object.entries(perKeyColors || {}).forEach(([code, hex]) => {
          map[code] = hexToRgbArr(hex);
        });
        // Brightness/speed steps on THIS board's scale (Win60: 4 == the default,
        // so its bytes are unchanged; MINI 60 HE PRO: 5).
        const bl = boardRef.current && boardRef.current.lighting || null;
        // Ordered: the engine must be stopped BEFORE the per-key table lands.
        callSeq([["stop_multicolor"], ["set_custom_colors", map, briByte(brightness, bl && bl.brightnessMax || 4), spdByte(speed, bl && bl.speedMax || 4)]]);
      }
    }, [connected, pattern, perKeyColors, brightness, speed, zones, direction, bgColor, bgBright, lightNonce, calibrating, boardSlug]);

    // Actuation / Rapid Trigger: EXPLICIT apply only.
    //
    // Earlier versions streamed slider changes to the device on every selection
    // or value change. That stream-on-change model had a fatal UX failure: the
    // global `selectedKeys` set leaks across tabs (Lighting "Select All" stays
    // selected when you enter Actuation), so the very first slider movement
    // would silently push the new travel to every key. Worse, debouncing only
    // hides the symptom â€” by the time the user notices the slider has moved
    // off where they want, the firmware has already committed the write to a
    // selection they didn't realise was active.
    //
    // The driver-style fix is the one the user expected all along: select keys,
    // pick values, click Apply. The slider value is local React state until
    // they hit Apply, at which point we write to EXACTLY the selection shown in
    // the badge ("N selected"). Nothing else can race the write.
    // Read every key's stored actuation back from the firmware, normalise it to
    // {code: mm}, and stash it on JS state so the board can render per-key.
    const refreshPerKeyActuation = async () => {
      if (!connected) return;
      const r = await apiCall("verify_actuation", []);
      if (!r || r.ok === false || !r.actuation_mm) return;
      setPerKeyActuation(r.actuation_mm);
    };
    // On connect, snapshot per-key actuation once so the board reflects reality
    // before the user touches anything.
    useEffect(() => {
      if (connected) refreshPerKeyActuation();
    }, [connected]);
    const applyActuation = async () => {
      if (!connected) return;
      const codes = Array.from(selectedKeys);
      if (codes.length === 0) return;
      const mode = rtEnabled ? (window.__rtContinuous ? 13 : 12) : 0;
      await apiCall("set_trigger_codes", codes, actuation, rtEnabled ? rtPress : 0, rtEnabled ? rtRelease : 0, mode);
      // Optimistic update so the board reflects the change instantly. Skip the
      // 132-key read-back here â€” it takes ~5 s and we already know what was
      // written; the next connect/manual refresh re-syncs from the firmware.
      setPerKeyActuation(prev => {
        const next = {
          ...prev
        };
        const effAct = actuation;
        for (const c of codes) {
          const entry = {
            actuation: Number(effAct.toFixed(2)),
            rtPress: rtEnabled ? Number(rtPress.toFixed(2)) : 0,
            rtRelease: rtEnabled ? Number(rtRelease.toFixed(2)) : 0,
            touchMode: rtEnabled ? 2 : 1
          };
          const shortC = String(c).replace(/^Key/, "").replace(/^Digit/, "");
          const keyC = shortC.length === 1 && /[A-Za-z]/.test(shortC) ? "Key" + shortC.toUpperCase() : c;
          for (const alias of [c, String(c).toUpperCase(), String(c).toLowerCase(), shortC, shortC.toUpperCase(), shortC.toLowerCase(), keyC]) {
            next[alias] = entry;
            if (window.__perKeyOverride) window.__perKeyOverride[alias] = entry;
          }
        }
        return next;
      });
    };
    const applyDeadband = () => {
      if (!connected) return;
      const codes = Array.from(selectedKeys);
      if (codes.length === 0) return;
      apiCall("set_deadband_codes", codes, deadTop, deadBottom);
    };

    // Travel Test: stream live analog depth for ALL keys (so any keypress shows,
    // not just the selected ones) and mirror it onto the on-screen board.
    useEffect(() => {
      if (!connected || !travelTest) {
        if (connected) apiCall("close_analog");
        setLiveDepths(null);
        return;
      }
      apiCall("open_analog_codes", []); // [] = all keys
      let alive = true,
        inflight = false;
      const id = setInterval(() => {
        // Hidden window: nobody can see the board, so don't serialise ~60 key
        // depths over the bridge 30x/s. `inflight` stops ticks queueing up
        // behind a slow bridge round-trip (WebView2 can stall for tens of ms).
        if (document.hidden || inflight) return;
        inflight = true;
        apiCall("read_live").then(d => {
          inflight = false;
          if (alive && d && typeof d === "object" && !(d.ok === false)) {
            setLiveDepths(prev => JSON.stringify(prev) === JSON.stringify(d) ? prev : d);
          }
        }).catch(() => {
          inflight = false;
        });
      }, 33); // ~30fps â€” smooth enough for visual depth, doesn't starve the lighting stream
      return () => {
        alive = false;
        clearInterval(id);
      };
    }, [connected, travelTest]);

    // Calibration: the firmware reports each key the moment it's calibrated. Poll
    // those codes and mark them â€” they light up green both on screen and (driven by
    // Python) on the physical board. Lighting is killed on the Python side at start.
    useEffect(() => {
      if (!connected || !calibrating) return;
      let alive = true;
      let lastCount = 0,
        lastChange = Date.now();
      const finish = () => {
        if (!alive) return;
        alive = false;
        clearInterval(id);
        handleCalibrate(false);
      };
      const id = setInterval(() => {
        apiCall("read_calibrated").then(r => {
          if (!alive || !r || r.ok === false || !Array.isArray(r.codes)) return;
          setCalibratedKeys(prev => {
            if (r.codes.length === prev.size && r.codes.every(c => prev.has(c))) return prev;
            return new Set(r.codes);
          });
          if (r.codes.length !== lastCount) {
            lastCount = r.codes.length;
            lastChange = Date.now();
          }
          // Auto-finish: firmware "done" signal, OR no new key calibrated for 3s
          // after at least one was (so you're never stuck waiting on the button).
          if (r.done) return finish();
          if (lastCount > 0 && Date.now() - lastChange > 3000) return finish();
        });
      }, 80);
      return () => {
        alive = false;
        clearInterval(id);
      };
    }, [connected, calibrating]);

    // Mirror the live host effect onto the IN-APP keyboard: poll the current frame
    // while on the Lighting tab and paint each key with its real animated color.
    // The engine produces frames at effects.FPS (60) â€” the previous 50ms (~20fps)
    // poll showed only every third frame, which read as choppy. Poll at the
    // engine's rate (~16ms) so the on-screen keyboard is as smooth as the effect
    // actually runs. This does NOT starve the board stream the old comment warned
    // about: get_light_frame just returns the engine's last_frame (a cheap dict
    // read, microseconds of GIL), and the engine spends its time in cmd-9 HID
    // writes â€” I/O that releases the GIL â€” so the extra polls have room. The
    // dedupe below skips a re-render whenever the frame hasn't changed, so a
    // board capped below 60fps (its engine produces frames slower) costs nothing.
    //
    // A board that declares `lighting.hostEngineMaxFps` (MINI 60 HE PRO: 28)
    // produces frames no faster than that, so polling it at 60 Hz would just
    // fetch the same frame twice; poll at the engine's actual rate instead.
    const mirrorFps = Math.max(1, Math.min(60, board && board.lighting && +board.lighting.hostEngineMaxFps || 60));
    const MIRROR_MS = Math.round(1000 / mirrorFps); // keep in step with effects.FPS
    useEffect(() => {
      if (!connected || section !== "lighting") {
        setLightFrame(null);
        return;
      }
      let alive = true,
        inflight = false;
      const id = setInterval(() => {
        if (inflight) return; // don't queue behind a slow bridge call
        if (document.hidden) return; // nothing to mirror to while minimised
        inflight = true;
        apiCall("get_light_frame").then(f => {
          inflight = false;
          if (!alive) return;
          const valid = f && typeof f === "object" && !(f.ok === false) && Object.keys(f).length ? f : null;
          setLightFrame(prev => JSON.stringify(prev) === JSON.stringify(valid) ? prev : valid);
        }).catch(() => {
          inflight = false;
        });
      }, MIRROR_MS);
      return () => {
        alive = false;
        clearInterval(id);
      };
    }, [connected, section, MIRROR_MS]);

    // Deepest currently-pressed key, for the switch-cutaway animation.
    const liveMax = useMemo(() => {
      if (!liveDepths) return 0;
      let m = 0;
      for (const k in liveDepths) {
        const v = +liveDepths[k] || 0;
        if (v > m) m = v;
      }
      return m;
    }, [liveDepths]);

    // Live effect colors for the in-app keyboard (overrides the static preview).
    const ledMapLive = useMemo(() => {
      if (!lightFrame) return null;
      const m = {};
      for (const code in lightFrame) m[code] = rgbToHex(lightFrame[code]);
      return m;
    }, [lightFrame]);

    // Hero badge & breadcrumb vary by section
    const breadcrumb = useMemo(() => {
      const profName = (profiles.find(p => p.id === activeId) || {}).name || "Profile";
      const secName = NAV.find(n => n.id === section)?.label || "";
      return `${profName} Â· ${secName}`;
    }, [profiles, activeId, section]);
    const heroBadge = section === "actuation" ? /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Actuation",
      value: `${actuation.toFixed(2)}mm`
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Polling",
      value: `${polling}KHz`
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Selected",
      value: `${selectedKeys.size}`
    })) : section === "lighting" ? /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Mode",
      value: pattern
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Brightness",
      value: `${Math.round(brightness)}%`
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Colors",
      value: `${colors.length}`
    })) : section === "socd" ? /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Hotkey",
      value: hotkey
    })) : section === "keymap" ? /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 p-1 rounded-xl border border-[var(--line)] bg-white/[0.02]"
    }, ["default", "fn"].map(l => /*#__PURE__*/React.createElement("button", {
      key: l,
      onClick: () => setLayer(l),
      className: `px-3 h-7 rounded-lg font-display text-[11px] uppercase tracking-[0.16em] transition-all
                      ${layer === l ? "bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_14px_var(--accent-glow)]" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
    }, l === "default" ? "Default Layer" : "Fn Layer"))) : null;
    const leftSlot = section === "actuation" ? /*#__PURE__*/React.createElement(ActuationToolbar, {
      onSelectAll: () => {
        const all = new Set(window.AetherKeyboard.KB_ROWS.flat().map(([_, __, c]) => c));
        setSelectedKeys(all);
      },
      onSelectInvert: () => {
        const all = window.AetherKeyboard.KB_ROWS.flat().map(([_, __, c]) => c);
        setSelectedKeys(prev => new Set(all.filter(c => !prev.has(c))));
      },
      onDeselectAll: () => setSelectedKeys(new Set()),
      onResetTrigger: () => {
        setActuation(1.70);
        setRtPress(0.05);
        setRtRelease(0.05);
      }
    }) : null;

    // Selection helpers (were the ActuationToolbar / lighting select-all actions).
    const selectAllKeys = () => {
      const all = new Set(window.AetherKeyboard.KB_ROWS.flat().map(([_, __, c]) => c));
      setSelectedKeys(all);
    };
    const selectInvertKeys = () => {
      const all = window.AetherKeyboard.KB_ROWS.flat().map(([_, __, c]) => c);
      setSelectedKeys(prev => new Set(all.filter(c => !prev.has(c))));
    };
    const deselectAllKeys = () => setSelectedKeys(new Set());
    const resetTrigger = () => {
      setActuation(1.70);
      setRtPress(0.05);
      setRtRelease(0.05);
    };
    const remapSelected = label => {
      const hid = HID_BY_LABEL[label];
      if (connected && hid != null && selectedKeys.size) apiCall("set_remap", Array.from(selectedKeys), hid);
    };
    const resetRemapSelected = () => {
      if (connected && selectedKeys.size) apiCall("reset_remap", Array.from(selectedKeys));
    };

    /* ============================================================
       ctx â€” the single object every workspace widget reads from. Carries ALL
       existing state + handlers (no new backend). Section files (ACTUATION_WIDGETS
       etc.) call only ctx.* â€” this is the LOCKED contract for parallel waves.
       ============================================================ */
    const ctx = {
      // bridge + connection
      apiCall,
      connected,
      connecting,
      togglePair,
      autoConnect,
      setAutoConnect,
      // profiles / persistence
      profiles,
      activeId,
      switchProfile,
      renameProfile,
      addProfile,
      duplicateProfile,
      deleteProfile,
      applyState,
      collectState,
      activeProfileName: (profiles.find(p => p.id === activeId) || {}).name || "Profile",
      // theme
      theme,
      setTheme,
      themeOpen,
      setThemeOpen,
      setWizardOpen,
      setSubmitOpen,
      // section
      section,
      setSection,
      // key selection (shared across workspaces)
      selectedKeys,
      setSelectedKeys,
      selectedKey,
      selectAllKeys,
      selectInvertKeys,
      deselectAllKeys,
      // actuation / rapid trigger
      actuation,
      setActuation,
      rtPress,
      setRtPress,
      rtRelease,
      setRtRelease,
      rtEnabled,
      setRtEnabled,
      resetTrigger,
      applyActuation,
      applyDeadband,
      refreshPerKeyActuation,
      perKeyActuation,
      deadTop,
      setDeadTop,
      deadBottom,
      setDeadBottom,
      switchId,
      handlePickSwitch,
      polling,
      handleSetPolling,
      // travel test + calibration telemetry
      travelTest,
      setTravelTest,
      liveDepths,
      liveMax,
      calibrating,
      handleCalibrate,
      calibratedKeys,
      // keymap
      layer,
      setLayer,
      HID_BY_LABEL,
      remapSelected,
      resetRemapSelected,
      // lighting
      colors,
      setColors,
      bgColor,
      setBgColor,
      perKeyColors,
      setPerKeyColors,
      pattern,
      setPattern,
      brightness,
      setBrightness,
      speed,
      setSpeed,
      power,
      setPower,
      fullColor,
      setFullColor,
      direction,
      setDirection,
      striOrient,
      setStriOrient,
      bgBright,
      setBgBright,
      zones,
      addZone,
      updateZone,
      removeZone,
      ledMap,
      ledMapLive,
      // socd
      socdMode,
      setSocdMode,
      hotkey,
      hotkeyEnabled,
      setHotkeyEnabled,
      handleSocdApply,
      socdProfiles,
      setSocdProfiles,
      socdActive,
      setSocdActive,
      // gamepad
      gamepadOn,
      handleGamepadToggle,
      gamepadMap,
      handleGamepadMapApply,
      DEFAULT_PAD_MAP,
      gamepadError,
      handleInstallVigem,
      // board awareness â€” same object as the React BoardContext value; workspaces
      // may read either ctx.board or window.AetherBoard.useBoard(). Contract in
      // components/board-context.jsx. null only if board-context.jsx failed to load.
      board: boardCtx
    };

    // The whole existing tree, unchanged â€” board-awareness overlays are appended
    // after <main> and the tree is (optionally) wrapped in the BoardContext
    // provider below.
    // Capability-gated tabs: filter the section list per board, and if the
    // open section just became unavailable (board switch / first board data)
    // fall back to the Keymap tab rather than showing an orphaned workspace.
    const sectionDefs = useMemo(() => SECTION_DEFS.filter(sdef => sectionAllowed(sdef.id, board)), [board]);
    useEffect(() => {
      if (!sectionAllowed(section, board)) setSection("keymap");
    }, [section, board]);
    const tree = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopTopBar, {
      sections: sectionDefs,
      active: section,
      onSelect: setSection,
      connected: connected,
      connecting: connecting,
      onTogglePair: togglePair,
      autoConnect: autoConnect,
      setAutoConnect: setAutoConnect,
      onOpenSettings: () => setSection("settings"),
      zoom: uiZoom,
      setZoom: setUiZoom
    }), /*#__PURE__*/React.createElement("main", {
      id: "desktop-main",
      className: "desktop-main"
    }, /*#__PURE__*/React.createElement(Workspace, {
      section: section,
      widgets: WIDGETS[section] || [],
      ctx: ctx
    })), BoardPicker && /*#__PURE__*/React.createElement(BoardPicker, {
      roster: boardRoster,
      active: board,
      switching: boardSwitching,
      onSelect: selectBoard
    }), UnsupportedNotices && /*#__PURE__*/React.createElement(UnsupportedNotices, {
      notices: boardNotices,
      onDismiss: dismissBoardNotice
    }), /*#__PURE__*/React.createElement(ThemePopup, {
      open: themeOpen,
      onClose: () => setThemeOpen(false),
      theme: theme,
      setTheme: setTheme
    }), SetupWizard && /*#__PURE__*/React.createElement(SetupWizard, {
      open: wizardOpen,
      onClose: closeWizard,
      ctx: ctx
    }), BoardSubmit && /*#__PURE__*/React.createElement(BoardSubmit, {
      open: submitOpen,
      onClose: () => setSubmitOpen(false)
    }), /*#__PURE__*/React.createElement(UpdateGate, {
      gate: updGate,
      onChoose: chooseAutoUpdate,
      onDismiss: dismissUpdate
    }));

    // Provide the capability context for the next wave of workspaces. When the
    // context module is missing the tree renders bare â€” identical to before.
    return BoardContext && boardCtx ? /*#__PURE__*/React.createElement(BoardContext.Provider, {
      value: boardCtx
    }, tree) : tree;
  }
  const Stat = ({
    label,
    value
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--line)] bg-white/[0.02]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[12px] text-[var(--text)]"
  }, value));
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
</script>
</body>
</html>

