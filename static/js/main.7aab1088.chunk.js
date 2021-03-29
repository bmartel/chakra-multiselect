/*! For license information please see main.7aab1088.chunk.js.LICENSE.txt */
(this["webpackJsonpchakra-multiselect-example"]=this["webpackJsonpchakra-multiselect-example"]||[]).push([[0],{69:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);n(69);var r=n(60),i=n.n(r),o=n(99),c=n(104),u=n(106),s=n(2),a=n(0),l=n(101),d=n(50),f=n(84),p=n(31),m=n(65),g=n(52),h=(n(100),n(105)),v=n(102),b=n(103),I=n(97),y=n(98),O=n(4);function x(e){var t={exports:{}};return e(t,t.exports),t.exports}function j(e,t){if(null!=e)if(function(e){return"function"===typeof e}(e))e(t);else try{e.current=t}catch(n){throw new Error("Cannot assign value '"+t+"' to ref '"+e+"'")}}function w(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){return j(t,e)}))}}function C(e,t){return function(n){return"dark"===n.colorMode?t:e}}function S(e){return{bg:C("#fff","gray.700")(e),boxShadow:C("sm","dark-lg")(e),color:"inherit",w:"full",py:"2",zIndex:1,borderRadius:"md",borderWidth:"1px"}}function k(e){return{py:"0.4rem",px:"0.8rem",cursor:"pointer",transition:"background 50ms ease-in 0s",_focus:{bg:C("gray.100","whiteAlpha.100")(e)},_active:{bg:C("gray.200","whiteAlpha.200")(e)},_expanded:{bg:C("gray.100","whiteAlpha.100")(e)},_disabled:{opacity:.4,cursor:"not-allowed"}}}function M(e){return{borderRadius:"full",variant:"solid",colorscheme:e.colorscheme}}function E(e){return{variant:"ghost",colorscheme:e.colorscheme}}var P=function(e){return{minH:e.theme.components.Input.sizes[e.size||"md"].h,h:"auto"}},R={mx:4,my:2,fontWeight:"semibold",fontSize:"sm"},_={border:0,borderBottom:"1px solid",borderColor:"inherit",my:"0.5rem",opacity:.6},D={parts:["item","list","control","input","button","groupTitle","divider"],baseStyle:function(e){return{list:S(e),item:k(e),button:E(e),selectedItem:M(e),control:P(e),input:{appearance:"none",outline:0},groupTitle:R,divider:_}}};function T(){return(T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function F(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}function K(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var $="function"===typeof Symbol&&Symbol.for,L=$?Symbol.for("react.element"):60103,A=$?Symbol.for("react.portal"):60106,N=$?Symbol.for("react.fragment"):60107,B=$?Symbol.for("react.strict_mode"):60108,H=$?Symbol.for("react.profiler"):60114,W=$?Symbol.for("react.provider"):60109,z=$?Symbol.for("react.context"):60110,U=$?Symbol.for("react.async_mode"):60111,q=$?Symbol.for("react.concurrent_mode"):60111,Y=$?Symbol.for("react.forward_ref"):60112,X=$?Symbol.for("react.suspense"):60113,J=$?Symbol.for("react.suspense_list"):60120,G=$?Symbol.for("react.memo"):60115,Q=$?Symbol.for("react.lazy"):60116,Z=$?Symbol.for("react.block"):60121,ee=$?Symbol.for("react.fundamental"):60117,te=$?Symbol.for("react.responder"):60118,ne=$?Symbol.for("react.scope"):60119;function re(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case L:switch(e=e.type){case U:case q:case N:case H:case B:case X:return e;default:switch(e=e&&e.$$typeof){case z:case Y:case Q:case G:case W:return e;default:return t}}case A:return t}}}function ie(e){return re(e)===q}var oe={AsyncMode:U,ConcurrentMode:q,ContextConsumer:z,ContextProvider:W,Element:L,ForwardRef:Y,Fragment:N,Lazy:Q,Memo:G,Portal:A,Profiler:H,StrictMode:B,Suspense:X,isAsyncMode:function(e){return ie(e)||re(e)===U},isConcurrentMode:ie,isContextConsumer:function(e){return re(e)===z},isContextProvider:function(e){return re(e)===W},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===L},isForwardRef:function(e){return re(e)===Y},isFragment:function(e){return re(e)===N},isLazy:function(e){return re(e)===Q},isMemo:function(e){return re(e)===G},isPortal:function(e){return re(e)===A},isProfiler:function(e){return re(e)===H},isStrictMode:function(e){return re(e)===B},isSuspense:function(e){return re(e)===X},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===N||e===q||e===H||e===B||e===X||e===J||"object"===typeof e&&null!==e&&(e.$$typeof===Q||e.$$typeof===G||e.$$typeof===W||e.$$typeof===z||e.$$typeof===Y||e.$$typeof===ee||e.$$typeof===te||e.$$typeof===ne||e.$$typeof===Z)},typeOf:re},ce=(x((function(e,t){0})),x((function(e){e.exports=oe})),Object.getOwnPropertySymbols),ue=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;function ae(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(i){return!1}})()&&Object.assign;var le="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function de(e,t,n,r,i){}de.resetWarningCache=function(){0};Function.call.bind(Object.prototype.hasOwnProperty);function fe(){}function pe(){}pe.resetWarningCache=fe;var me=x((function(e){e.exports=function(){function e(e,t,n,r,i,o){if(o!==le){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:pe,resetWarningCache:fe};return n.PropTypes=n,n}()})),ge=60103,he=60106,ve=60107,be=60108,Ie=60114,ye=60109,Oe=60110,xe=60112,je=60113,we=60120,Ce=60115,Se=60116,ke=60121,Me=60122,Ee=60117,Pe=60129,Re=60131;if("function"===typeof Symbol&&Symbol.for){var _e=Symbol.for;ge=_e("react.element"),he=_e("react.portal"),ve=_e("react.fragment"),be=_e("react.strict_mode"),Ie=_e("react.profiler"),ye=_e("react.provider"),Oe=_e("react.context"),xe=_e("react.forward_ref"),je=_e("react.suspense"),we=_e("react.suspense_list"),Ce=_e("react.memo"),Se=_e("react.lazy"),ke=_e("react.block"),Me=_e("react.server.block"),Ee=_e("react.fundamental"),Pe=_e("react.debug_trace_mode"),Re=_e("react.legacy_hidden")}function De(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case ge:switch(e=e.type){case ve:case Ie:case be:case je:case we:return e;default:switch(e=e&&e.$$typeof){case Oe:case xe:case Se:case Ce:case ye:return e;default:return t}}case he:return t}}}var Te={ContextConsumer:Oe,ContextProvider:ye,Element:ge,ForwardRef:xe,Fragment:ve,Lazy:Se,Memo:Ce,Portal:he,Profiler:Ie,StrictMode:be,Suspense:je,isAsyncMode:function(){return!1},isConcurrentMode:function(){return!1},isContextConsumer:function(e){return De(e)===Oe},isContextProvider:function(e){return De(e)===ye},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===ge},isForwardRef:function(e){return De(e)===xe},isFragment:function(e){return De(e)===ve},isLazy:function(e){return De(e)===Se},isMemo:function(e){return De(e)===Ce},isPortal:function(e){return De(e)===he},isProfiler:function(e){return De(e)===Ie},isStrictMode:function(e){return De(e)===be},isSuspense:function(e){return De(e)===je},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===ve||e===Ie||e===Pe||e===be||e===je||e===we||e===Re||"object"===typeof e&&null!==e&&(e.$$typeof===Se||e.$$typeof===Ce||e.$$typeof===ye||e.$$typeof===Oe||e.$$typeof===xe||e.$$typeof===Ee||e.$$typeof===ke||e[0]===Me)},typeOf:De};x((function(e,t){0}));function Fe(e){return"object"==typeof e&&null!=e&&1===e.nodeType}function Ke(e,t){return(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e}function Ve(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var n=getComputedStyle(e,null);return Ke(n.overflowY,t)||Ke(n.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1}function $e(e,t,n,r,i,o,c,u){return o<e&&c>t||o>e&&c<t?0:o<=e&&u<=n||c>=t&&u>=n?o-e-r:c>t&&u<n||o<e&&u>n?c-t+i:0}x((function(e){e.exports=Te}));var Le=0;function Ae(){}function Ne(e,t){return e===t||t instanceof Node&&e.contains&&e.contains(t)}function Be(e,t){var n;function r(){n&&clearTimeout(n)}function i(){for(var i=arguments.length,o=new Array(i),c=0;c<i;c++)o[c]=arguments[c];r(),n=setTimeout((function(){n=null,e.apply(void 0,o)}),t)}return i.cancel=r,i}function He(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return t.some((function(t){return t&&t.apply(void 0,[e].concat(r)),e.preventDownshiftDefault||e.hasOwnProperty("nativeEvent")&&e.nativeEvent.preventDownshiftDefault}))}}function We(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){"function"===typeof t?t(e):t&&(t.current=e)}))}}function ze(e,t){return Object.keys(e).reduce((function(n,r){return n[r]=Ue(t,r)?t[r]:e[r],n}),{})}function Ue(e,t){return void 0!==e[t]}function qe(e){var t=e.key,n=e.keyCode;return n>=37&&n<=40&&0!==t.indexOf("Arrow")?"Arrow"+t:t}function Ye(e,t,n,r,i){if(void 0===i&&(i=!0),0===n)return-1;var o=n-1;("number"!==typeof t||t<0||t>=n)&&(t=e>0?-1:o+1);var c=t+e;c<0?c=i?o:0:c>o&&(c=i?0:o);var u=Xe(e,c,n,r,i);return-1===u?t>=n?-1:t:u}function Xe(e,t,n,r,i){var o=r(t);if(!o||!o.hasAttribute("disabled"))return t;if(e>0){for(var c=t+1;c<n;c++)if(!r(c).hasAttribute("disabled"))return c}else for(var u=t-1;u>=0;u--)if(!r(u).hasAttribute("disabled"))return u;return i?e>0?Xe(1,0,n,r,!1):Xe(-1,n-1,n,r,!1):-1}function Je(e,t,n,r){return void 0===r&&(r=!0),t.some((function(t){return t&&(Ne(t,e)||r&&Ne(t,n.activeElement))}))}var Ge=Be((function(e){Ze(e).textContent=""}),500);function Qe(e,t){var n=Ze(t);e&&(n.textContent=e,Ge(t))}function Ze(e){void 0===e&&(e=document);var t=e.getElementById("a11y-status-message");return t||((t=e.createElement("div")).setAttribute("id","a11y-status-message"),t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions text"),Object.assign(t.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),e.body.appendChild(t),t)}var et={highlightedIndex:-1,isOpen:!1,selectedItem:null,inputValue:""};function tt(e,t,n){var r=e.props,i=e.type,o={};Object.keys(t).forEach((function(r){!function(e,t,n,r){var i=t.props,o=t.type,c="on"+ct(e)+"Change";i[c]&&void 0!==r[e]&&r[e]!==n[e]&&i[c](V({type:o},r))}(r,e,t,n),n[r]!==t[r]&&(o[r]=n[r])})),r.onStateChange&&Object.keys(o).length&&r.onStateChange(V({type:i},o))}var nt=Be((function(e,t){Qe(e(),t)}),200),rt="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?a.useLayoutEffect:a.useEffect;function it(e){var t=e.id,n=void 0===t?"downshift-"+String(Le++):t,r=e.labelId,i=e.menuId,o=e.getItemId,c=e.toggleButtonId,u=e.inputId;return Object(a.useRef)({labelId:r||n+"-label",menuId:i||n+"-menu",getItemId:o||function(e){return n+"-item-"+e},toggleButtonId:c||n+"-toggle-button",inputId:u||n+"-input"}).current}function ot(e,t,n){return void 0!==e?e:0===n.length?-1:n.indexOf(t)}function ct(e){return""+e.slice(0,1).toUpperCase()+e.slice(1)}function ut(e){var t=Object(a.useRef)(e);return t.current=e,t}function st(e,t,n){var r=Object(a.useRef)(),i=Object(a.useRef)(),o=Object(a.useCallback)((function(t,n){i.current=n,t=ze(t,n.props);var r=e(t,n);return n.props.stateReducer(t,V({},n,{changes:r}))}),[e]),c=Object(a.useReducer)(o,t),u=c[0],s=c[1],l=ut(n),d=Object(a.useCallback)((function(e){return s(V({props:l.current},e))}),[l]),f=i.current;return Object(a.useEffect)((function(){f&&r.current&&r.current!==u&&tt(f,ze(r.current,f.props),u),r.current=u}),[u,n,f]),[u,d]}var at={itemToString:function(e){return e?String(e):""},stateReducer:function(e,t){return t.changes},getA11ySelectionMessage:function(e){var t=e.selectedItem,n=e.itemToString;return t?n(t)+" has been selected.":""},scrollIntoView:function(e,t){e&&function(e,t){var n=window,r=t.scrollMode,i=t.block,o=t.inline,c=t.boundary,u=t.skipOverflowHiddenElements,s="function"==typeof c?c:function(e){return e!==c};if(!Fe(e))throw new TypeError("Invalid target");for(var a=document.scrollingElement||document.documentElement,l=[],d=e;Fe(d)&&s(d);){if((d=d.parentElement)===a){l.push(d);break}null!=d&&d===document.body&&Ve(d)&&!Ve(document.documentElement)||null!=d&&Ve(d,u)&&l.push(d)}for(var f=n.visualViewport?n.visualViewport.width:innerWidth,p=n.visualViewport?n.visualViewport.height:innerHeight,m=window.scrollX||pageXOffset,g=window.scrollY||pageYOffset,h=e.getBoundingClientRect(),v=h.height,b=h.width,I=h.top,y=h.right,O=h.bottom,x=h.left,j="start"===i||"nearest"===i?I:"end"===i?O:I+v/2,w="center"===o?x+b/2:"end"===o?y:x,C=[],S=0;S<l.length;S++){var k=l[S],M=k.getBoundingClientRect(),E=M.height,P=M.width,R=M.top,_=M.right,D=M.bottom,T=M.left;if("if-needed"===r&&I>=0&&x>=0&&O<=p&&y<=f&&I>=R&&O<=D&&x>=T&&y<=_)return C;var F=getComputedStyle(k),K=parseInt(F.borderLeftWidth,10),V=parseInt(F.borderTopWidth,10),$=parseInt(F.borderRightWidth,10),L=parseInt(F.borderBottomWidth,10),A=0,N=0,B="offsetWidth"in k?k.offsetWidth-k.clientWidth-K-$:0,H="offsetHeight"in k?k.offsetHeight-k.clientHeight-V-L:0;if(a===k)A="start"===i?j:"end"===i?j-p:"nearest"===i?$e(g,g+p,p,V,L,g+j,g+j+v,v):j-p/2,N="start"===o?w:"center"===o?w-f/2:"end"===o?w-f:$e(m,m+f,f,K,$,m+w,m+w+b,b),A=Math.max(0,A+g),N=Math.max(0,N+m);else{A="start"===i?j-R-V:"end"===i?j-D+L+H:"nearest"===i?$e(R,D,E,V,L+H,j,j+v,v):j-(R+E/2)+H/2,N="start"===o?w-T-K:"center"===o?w-(T+P/2)+B/2:"end"===o?w-_+$+B:$e(T,_,P,K,$+B,w,w+b,b);var W=k.scrollLeft,z=k.scrollTop;j+=z-(A=Math.max(0,Math.min(z+A,k.scrollHeight-E+H))),w+=W-(N=Math.max(0,Math.min(W+N,k.scrollWidth-P+B)))}C.push({el:k,top:A,left:N})}return C}(e,{boundary:t,block:"nearest",scrollMode:"if-needed"}).forEach((function(e){var t=e.el,n=e.top,r=e.left;t.scrollTop=n,t.scrollLeft=r}))},circularNavigation:!1,environment:"undefined"===typeof window?{}:window};function lt(e,t,n){void 0===n&&(n=et);var r="default"+ct(t);return r in e?e[r]:n[t]}function dt(e,t,n){if(void 0===n&&(n=et),t in e)return e[t];var r="initial"+ct(t);return r in e?e[r]:lt(e,t,n)}function ft(e,t,n,r){var i=e.items,o=e.initialHighlightedIndex,c=e.defaultHighlightedIndex,u=t.selectedItem,s=t.highlightedIndex;return 0===i.length?-1:void 0!==o&&s===o?o:void 0!==c?c:u?0===n?i.indexOf(u):Ye(n,i.indexOf(u),i.length,r,!1):0===n?-1:n<0?i.length-1:0}var pt=function(){return Ae};function mt(e,t,n){var r=n.isInitialMount,i=n.highlightedIndex,o=n.items,c=n.environment,u=K(n,["isInitialMount","highlightedIndex","items","environment"]);Object(a.useEffect)((function(){r||nt((function(){return e(V({highlightedIndex:i,highlightedItem:o[i],resultCount:o.length},u))}),c.document)}),t)}var gt=Ae;me.array.isRequired,me.func,me.func,me.func,me.bool,me.number,me.number,me.number,me.bool,me.bool,me.bool,me.any,me.any,me.any,me.string,me.string,me.string,me.func,me.string,me.func,me.func,me.func,me.func,me.func,me.shape({addEventListener:me.func,removeEventListener:me.func,document:me.shape({getElementById:me.func,activeElement:me.any,body:me.any})}),V({},at,{getA11yStatusMessage:function(e){var t=e.isOpen,n=e.resultCount,r=e.previousResultCount;return t?n?n!==r?n+" result"+(1===n?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.":"":"No results are available.":""}});var ht=Object.freeze({__proto__:null,InputKeyDownArrowDown:0,InputKeyDownArrowUp:1,InputKeyDownEscape:2,InputKeyDownHome:3,InputKeyDownEnd:4,InputKeyDownEnter:5,InputChange:6,InputBlur:7,MenuMouseLeave:8,ItemMouseMove:9,ItemClick:10,ToggleButtonClick:11,FunctionToggleMenu:12,FunctionOpenMenu:13,FunctionCloseMenu:14,FunctionSetHighlightedIndex:15,FunctionSelectItem:16,FunctionSetInputValue:17,FunctionReset:18,ControlledPropUpdatedSelectedItem:19});function vt(e){var t=function(e){var t=dt(e,"selectedItem"),n=dt(e,"isOpen"),r=dt(e,"highlightedIndex"),i=dt(e,"inputValue");return{highlightedIndex:r<0&&t&&n?e.items.indexOf(t):r,isOpen:n,selectedItem:t,inputValue:i}}(e),n=t.selectedItem,r=t.inputValue;return""===r&&n&&void 0===e.defaultInputValue&&void 0===e.initialInputValue&&void 0===e.inputValue&&(r=e.itemToString(n)),V({},t,{inputValue:r})}me.array.isRequired,me.func,me.func,me.func,me.bool,me.number,me.number,me.number,me.bool,me.bool,me.bool,me.any,me.any,me.any,me.string,me.string,me.string,me.string,me.string,me.string,me.func,me.string,me.string,me.func,me.func,me.func,me.func,me.func,me.func,me.shape({addEventListener:me.func,removeEventListener:me.func,document:me.shape({getElementById:me.func,activeElement:me.any,body:me.any})});var bt=Ae;var It=V({},at,{getA11yStatusMessage:function(e){var t=e.isOpen,n=e.resultCount,r=e.previousResultCount;return t?n?n!==r?n+" result"+(1===n?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter key to select.":"":"No results are available.":""},circularNavigation:!0});function yt(e,t){var n,r=t.type,i=t.props,o=t.shiftKey;switch(r){case 10:n={isOpen:lt(i,"isOpen"),highlightedIndex:lt(i,"highlightedIndex"),selectedItem:i.items[t.index],inputValue:i.itemToString(i.items[t.index])};break;case 0:n=e.isOpen?{highlightedIndex:Ye(o?5:1,e.highlightedIndex,i.items.length,t.getItemNodeFromIndex,i.circularNavigation)}:{highlightedIndex:ft(i,e,1,t.getItemNodeFromIndex),isOpen:i.items.length>=0};break;case 1:n=e.isOpen?{highlightedIndex:Ye(o?-5:-1,e.highlightedIndex,i.items.length,t.getItemNodeFromIndex,i.circularNavigation)}:{highlightedIndex:ft(i,e,-1,t.getItemNodeFromIndex),isOpen:i.items.length>=0};break;case 5:n=V({},e.isOpen&&e.highlightedIndex>=0&&{selectedItem:i.items[e.highlightedIndex],isOpen:lt(i,"isOpen"),highlightedIndex:lt(i,"highlightedIndex"),inputValue:i.itemToString(i.items[e.highlightedIndex])});break;case 2:n=V({isOpen:!1,highlightedIndex:-1},!e.isOpen&&{selectedItem:null,inputValue:""});break;case 3:n={highlightedIndex:Xe(1,0,i.items.length,t.getItemNodeFromIndex,!1)};break;case 4:n={highlightedIndex:Xe(-1,i.items.length-1,i.items.length,t.getItemNodeFromIndex,!1)};break;case 7:n=V({isOpen:!1,highlightedIndex:-1},e.highlightedIndex>=0&&t.selectItem&&{selectedItem:i.items[e.highlightedIndex],inputValue:i.itemToString(i.items[e.highlightedIndex])});break;case 6:n={isOpen:!0,highlightedIndex:lt(i,"highlightedIndex"),inputValue:t.inputValue};break;case 16:n={selectedItem:t.selectedItem,inputValue:i.itemToString(t.selectedItem)};break;case 19:n={inputValue:t.inputValue};break;default:return function(e,t,n){var r,i=t.type,o=t.props;switch(i){case n.ItemMouseMove:r={highlightedIndex:t.index};break;case n.MenuMouseLeave:r={highlightedIndex:-1};break;case n.ToggleButtonClick:case n.FunctionToggleMenu:r={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:ft(o,e,0)};break;case n.FunctionOpenMenu:r={isOpen:!0,highlightedIndex:ft(o,e,0)};break;case n.FunctionCloseMenu:r={isOpen:!1};break;case n.FunctionSetHighlightedIndex:r={highlightedIndex:t.highlightedIndex};break;case n.FunctionSetInputValue:r={inputValue:t.inputValue};break;case n.FunctionReset:r={highlightedIndex:lt(o,"highlightedIndex"),isOpen:lt(o,"isOpen"),selectedItem:lt(o,"selectedItem"),inputValue:lt(o,"inputValue")};break;default:throw new Error("Reducer called without proper action type.")}return V({},e,r)}(e,t,ht)}return V({},e,n)}function Ot(e){void 0===e&&(e={}),bt(e,Ot);var t=V({},It,e),n=t.initialIsOpen,r=t.defaultIsOpen,i=t.items,o=t.scrollIntoView,c=t.environment,u=t.getA11yStatusMessage,s=t.getA11ySelectionMessage,l=t.itemToString,d=function(e,t,n){var r=Object(a.useRef)(),i=st(e,t,n),o=i[0],c=i[1];return Object(a.useEffect)((function(){Ue(n,"selectedItem")&&(r.current!==n.selectedItem&&c({type:19,inputValue:n.itemToString(n.selectedItem)}),r.current=o.selectedItem===r.current?n.selectedItem:o.selectedItem)})),[ze(o,n),c]}(yt,vt(t),t),f=d[0],p=d[1],m=f.isOpen,g=f.highlightedIndex,h=f.selectedItem,v=f.inputValue,b=Object(a.useRef)(null),I=Object(a.useRef)({}),y=Object(a.useRef)(null),O=Object(a.useRef)(null),x=Object(a.useRef)(null),j=Object(a.useRef)(!0),w=it(t),C=Object(a.useRef)(),S=ut({state:f,props:t}),k=Object(a.useCallback)((function(e){return I.current[w.getItemId(e)]}),[w]);mt(u,[m,g,v,i],V({isInitialMount:j.current,previousResultCount:C.current,items:i,environment:c,itemToString:l},f)),mt(s,[h],V({isInitialMount:j.current,previousResultCount:C.current,items:i,environment:c,itemToString:l},f));var M=function(e){var t=e.highlightedIndex,n=e.isOpen,r=e.itemRefs,i=e.getItemNodeFromIndex,o=e.menuElement,c=e.scrollIntoView,u=Object(a.useRef)(!0);return rt((function(){t<0||!n||!Object.keys(r.current).length||(!1===u.current?u.current=!0:c(i(t),o))}),[t]),u}({menuElement:b.current,highlightedIndex:g,isOpen:m,itemRefs:I,scrollIntoView:o,getItemNodeFromIndex:k});gt({isInitialMount:j.current,props:t,state:f}),Object(a.useEffect)((function(){(n||r||m)&&y.current&&y.current.focus()}),[]),Object(a.useEffect)((function(){j.current||(C.current=i.length)}));var E=function(e,t,n,r){var i=Object(a.useRef)({isMouseDown:!1,isTouchMove:!1});return Object(a.useEffect)((function(){var o=function(){i.current.isMouseDown=!0},c=function(o){i.current.isMouseDown=!1,e&&!Je(o.target,t.map((function(e){return e.current})),n.document)&&r()},u=function(){i.current.isTouchMove=!1},s=function(){i.current.isTouchMove=!0},a=function(o){!e||i.current.isTouchMove||Je(o.target,t.map((function(e){return e.current})),n.document,!1)||r()};return n.addEventListener("mousedown",o),n.addEventListener("mouseup",c),n.addEventListener("touchstart",u),n.addEventListener("touchmove",s),n.addEventListener("touchend",a),function(){n.removeEventListener("mousedown",o),n.removeEventListener("mouseup",c),n.removeEventListener("touchstart",u),n.removeEventListener("touchmove",s),n.removeEventListener("touchend",a)}}),[e,n]),i}(m,[x,b,O],c,(function(){p({type:7,selectItem:!1})})),P=pt();Object(a.useEffect)((function(){j.current=!1}),[]),Object(a.useEffect)((function(){m||(I.current={})}),[m]);var R=Object(a.useMemo)((function(){return{ArrowDown:function(e){e.preventDefault(),p({type:0,shiftKey:e.shiftKey,getItemNodeFromIndex:k})},ArrowUp:function(e){e.preventDefault(),p({type:1,shiftKey:e.shiftKey,getItemNodeFromIndex:k})},Home:function(e){S.current.state.isOpen&&(e.preventDefault(),p({type:3,getItemNodeFromIndex:k}))},End:function(e){S.current.state.isOpen&&(e.preventDefault(),p({type:4,getItemNodeFromIndex:k}))},Escape:function(){var e=S.current.state;(e.isOpen||e.inputValue||e.selectedItem||e.highlightedIndex>-1)&&p({type:2})},Enter:function(e){var t=S.current.state;!t.isOpen||t.highlightedIndex<0||229===e.which||(e.preventDefault(),p({type:5,getItemNodeFromIndex:k}))}}}),[p,S,k]),_=Object(a.useCallback)((function(e){return V({id:w.labelId,htmlFor:w.inputId},e)}),[w]),D=Object(a.useCallback)((function(e,t){var n,r=void 0===e?{}:e,i=r.onMouseLeave,o=r.refKey,c=void 0===o?"ref":o,u=r.ref,s=K(r,["onMouseLeave","refKey","ref"]),a=(void 0===t?{}:t).suppressRefError;return P("getMenuProps",void 0!==a&&a,c,b),V(((n={})[c]=We(u,(function(e){b.current=e})),n.id=w.menuId,n.role="listbox",n["aria-labelledby"]=w.labelId,n.onMouseLeave=He(i,(function(){p({type:8})})),n),s)}),[p,P,w]),T=Object(a.useCallback)((function(e){var t,n,r=void 0===e?{}:e,i=r.item,o=r.index,c=r.refKey,u=void 0===c?"ref":c,s=r.ref,a=r.onMouseMove,l=r.onClick,d=K(r,["item","index","refKey","ref","onMouseMove","onClick","onPress"]),f=S.current,m=f.props,g=f.state,h=ot(o,i,m.items);if(h<0)throw new Error("Pass either item or item index in getItemProps!");var v=l;return V(((t={})[u]=We(s,(function(e){e&&(I.current[w.getItemId(h)]=e)})),t.role="option",t["aria-selected"]=""+(h===g.highlightedIndex),t.id=w.getItemId(h),t),!d.disabled&&((n={onMouseMove:He(a,(function(){o!==g.highlightedIndex&&(M.current=!1,p({type:9,index:o}))}))}).onClick=He(v,(function(){p({type:10,index:o}),y.current&&y.current.focus()})),n),d)}),[p,S,M,w]),F=Object(a.useCallback)((function(e){var t,n=void 0===e?{}:e,r=n.onClick,i=n.refKey,o=void 0===i?"ref":i,c=n.ref,u=K(n,["onClick","onPress","refKey","ref"]);return V(((t={})[o]=We(c,(function(e){O.current=e})),t.id=w.toggleButtonId,t.tabIndex=-1,t),!u.disabled&&V({},{onClick:He(r,(function(){p({type:11}),!S.current.state.isOpen&&y.current&&y.current.focus()}))}),u)}),[p,S,w]),$=Object(a.useCallback)((function(e,t){var n,r=void 0===e?{}:e,i=r.onKeyDown,o=r.onChange,c=r.onInput,u=r.onBlur,s=r.refKey,a=void 0===s?"ref":s,l=r.ref,d=K(r,["onKeyDown","onChange","onInput","onBlur","onChangeText","refKey","ref"]),f=(void 0===t?{}:t).suppressRefError;P("getInputProps",void 0!==f&&f,a,y);var m,g=S.current.state,h={};d.disabled||((m={}).onChange=He(o,c,(function(e){p({type:6,inputValue:e.target.value})})),m.onKeyDown=He(i,(function(e){var t=qe(e);t&&R[t]&&R[t](e)})),m.onBlur=He(u,(function(){g.isOpen&&!E.current.isMouseDown&&p({type:7,selectItem:!0})})),h=m);return V(((n={})[a]=We(l,(function(e){y.current=e})),n.id=w.inputId,n["aria-autocomplete"]="list",n["aria-controls"]=w.menuId,n),g.isOpen&&g.highlightedIndex>-1&&{"aria-activedescendant":w.getItemId(g.highlightedIndex)},{"aria-labelledby":w.labelId,autoComplete:"off",value:g.inputValue},h,d)}),[p,R,S,E,P,w]),L=Object(a.useCallback)((function(e,t){var n,r=void 0===e?{}:e,i=r.refKey,o=void 0===i?"ref":i,c=r.ref,u=K(r,["refKey","ref"]),s=(void 0===t?{}:t).suppressRefError;return P("getComboboxProps",void 0!==s&&s,o,x),V(((n={})[o]=We(c,(function(e){x.current=e})),n.role="combobox",n["aria-haspopup"]="listbox",n["aria-owns"]=w.menuId,n["aria-expanded"]=S.current.state.isOpen,n),u)}),[S,P,w]),A=Object(a.useCallback)((function(){p({type:12})}),[p]),N=Object(a.useCallback)((function(){p({type:14})}),[p]),B=Object(a.useCallback)((function(){p({type:13})}),[p]),H=Object(a.useCallback)((function(e){p({type:15,highlightedIndex:e})}),[p]),W=Object(a.useCallback)((function(e){p({type:16,selectedItem:e})}),[p]);return{getItemProps:T,getLabelProps:_,getMenuProps:D,getInputProps:$,getComboboxProps:L,getToggleButtonProps:F,toggleMenu:A,openMenu:B,closeMenu:N,setHighlightedIndex:H,setInputValue:Object(a.useCallback)((function(e){p({type:17,inputValue:e})}),[p]),selectItem:W,reset:Object(a.useCallback)((function(){p({type:18})}),[p]),highlightedIndex:g,isOpen:m,selectedItem:h,inputValue:v}}Ot.stateChangeTypes=ht;var xt={activeIndex:-1,selectedItems:[]};function jt(e,t){return dt(e,t,xt)}function wt(e,t){return lt(e,t,xt)}function Ct(e){if(e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)return!1;var t=e.target;return!(t instanceof HTMLInputElement&&""!==t.value)||0===t.selectionStart&&0===t.selectionEnd}me.array,me.array,me.array,me.func,me.func,me.func,me.number,me.number,me.number,me.func,me.func,me.string,me.string,me.shape({addEventListener:me.func,removeEventListener:me.func,document:me.shape({getElementById:me.func,activeElement:me.any,body:me.any})});var St={itemToString:at.itemToString,stateReducer:at.stateReducer,environment:at.environment,getA11yRemovalMessage:function(e){var t=e.removedSelectedItem;return(0,e.itemToString)(t)+" has been removed."},keyNavigationNext:"ArrowRight",keyNavigationPrevious:"ArrowLeft"},kt=Ae;var Mt=Object.freeze({__proto__:null,SelectedItemClick:0,SelectedItemKeyDownDelete:1,SelectedItemKeyDownBackspace:2,SelectedItemKeyDownNavigationNext:3,SelectedItemKeyDownNavigationPrevious:4,DropdownKeyDownNavigationPrevious:5,DropdownKeyDownBackspace:6,DropdownClick:7,FunctionAddSelectedItem:8,FunctionRemoveSelectedItem:9,FunctionSetSelectedItems:10,FunctionSetActiveIndex:11,FunctionReset:12});function Et(e,t){var n,r=t.type,i=t.index,o=t.props,c=t.selectedItem,u=e.activeIndex,s=e.selectedItems;switch(r){case 0:n={activeIndex:i};break;case 4:n={activeIndex:u-1<0?0:u-1};break;case 3:n={activeIndex:u+1>=s.length?-1:u+1};break;case 2:case 1:var a=u;1===s.length?a=-1:u===s.length-1&&(a=s.length-2),n=V({selectedItems:[].concat(s.slice(0,u),s.slice(u+1))},{activeIndex:a});break;case 5:n={activeIndex:s.length-1};break;case 6:n={selectedItems:s.slice(0,s.length-1)};break;case 8:n={selectedItems:[].concat(s,[c])};break;case 7:n={activeIndex:-1};break;case 9:var l=u,d=s.indexOf(c);1===s.length?l=-1:d===s.length-1&&(l=s.length-2),n=V({selectedItems:[].concat(s.slice(0,d),s.slice(d+1))},{activeIndex:l});break;case 10:n={selectedItems:t.selectedItems};break;case 11:n={activeIndex:t.activeIndex};break;case 12:n={activeIndex:wt(o,"activeIndex"),selectedItems:wt(o,"selectedItems")};break;default:throw new Error("Reducer called without proper action type.")}return V({},e,n)}function Pt(e){void 0===e&&(e={}),kt(e,Pt);var t=V({},St,e),n=t.getA11yRemovalMessage,r=t.itemToString,i=t.environment,o=t.keyNavigationNext,c=t.keyNavigationPrevious,u=function(e,t,n){var r=st(e,t,n),i=r[0],o=r[1];return[ze(i,n),o]}(Et,function(e){return{activeIndex:jt(e,"activeIndex"),selectedItems:jt(e,"selectedItems")}}(t),t),s=u[0],l=u[1],d=s.activeIndex,f=s.selectedItems,p=Object(a.useRef)(!0),m=Object(a.useRef)(null),g=Object(a.useRef)(f),h=Object(a.useRef)();h.current=[];var v=ut({state:s,props:t});Object(a.useEffect)((function(){if(!p.current){if(f.length<g.current.length){var e=g.current.find((function(e){return f.indexOf(e)<0}));Qe(n({itemToString:r,resultCount:f.length,removedSelectedItem:e,activeIndex:d,activeSelectedItem:f[d]}),i.document)}g.current=f}}),[f.length]),Object(a.useEffect)((function(){p.current||(-1===d&&m.current?m.current.focus():h.current[d]&&h.current[d].focus())}),[d]),gt({isInitialMount:p.current,props:t,state:s});var b=pt();Object(a.useEffect)((function(){p.current=!1}),[]);var I=Object(a.useMemo)((function(){var e;return(e={})[c]=function(){l({type:4})},e[o]=function(){l({type:3})},e.Delete=function(){l({type:1})},e.Backspace=function(){l({type:2})},e}),[l,o,c]),y=Object(a.useMemo)((function(){var e;return(e={})[c]=function(e){Ct(e)&&l({type:5})},e.Backspace=function(e){Ct(e)&&l({type:6})},e}),[l,c]);return{getSelectedItemProps:Object(a.useCallback)((function(e){var t,n=void 0===e?{}:e,r=n.refKey,i=void 0===r?"ref":r,o=n.ref,c=n.onClick,u=n.onKeyDown,s=n.selectedItem,a=n.index,d=K(n,["refKey","ref","onClick","onKeyDown","selectedItem","index"]),f=v.current.state;if(ot(a,s,f.selectedItems)<0)throw new Error("Pass either selectedItem or index in getSelectedItemProps!");return V(((t={})[i]=We(o,(function(e){e&&h.current.push(e)})),t.tabIndex=a===f.activeIndex?0:-1,t.onClick=He(c,(function(){l({type:0,index:a})})),t.onKeyDown=He(u,(function(e){var t=qe(e);t&&I[t]&&I[t](e)})),t),d)}),[l,v,I]),getDropdownProps:Object(a.useCallback)((function(e,t){var n,r=void 0===e?{}:e,i=r.refKey,o=void 0===i?"ref":i,c=r.ref,u=r.onKeyDown,s=r.onClick,a=r.preventKeyAction,d=void 0!==a&&a,f=K(r,["refKey","ref","onKeyDown","onClick","preventKeyAction"]),p=(void 0===t?{}:t).suppressRefError;b("getDropdownProps",void 0!==p&&p,o,m);return V(((n={})[o]=We(c,(function(e){e&&(m.current=e)})),n),!d&&{onKeyDown:He(u,(function(e){var t=qe(e);t&&y[t]&&y[t](e)})),onClick:He(s,(function(){l({type:7})}))},f)}),[l,y,b]),addSelectedItem:Object(a.useCallback)((function(e){l({type:8,selectedItem:e})}),[l]),removeSelectedItem:Object(a.useCallback)((function(e){l({type:9,selectedItem:e})}),[l]),setSelectedItems:Object(a.useCallback)((function(e){l({type:10,selectedItems:e})}),[l]),setActiveIndex:Object(a.useCallback)((function(e){l({type:11,activeIndex:e})}),[l]),reset:Object(a.useCallback)((function(){l({type:12})}),[l]),selectedItems:f,activeIndex:d}}Pt.stateChangeTypes=Mt;var Rt=function(e){void 0===e&&(e={});var t=e,n=t.strict,r=void 0===n||n,i=t.errorMessage,o=void 0===i?"useContext: `context` is undefined. Seems you forgot to wrap component within the Provider":i,c=t.name,u=a.createContext(void 0);return u.displayName=c,[u.Provider,function(){var e=a.useContext(u);if(!e&&r)throw new Error(o);return e},u]}({strict:!1,name:"SelectContext"}),_t=Object(s.a)(Rt,2),Dt=_t[0],Tt=_t[1];var Ft=function(e){var t=e.children,n=Object(f.a)("MultiSelect",e),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{items:[],initialSelectedItems:[],placement:"bottom-start"},t=e.items,n=void 0===t?[]:t,r=e.initialSelectedItems,i=void 0===r?[]:r,o=e.placement,c=void 0===o?"bottom-start":o,u=e.hasDivider,d=void 0===u||u,f=Object(a.useState)(""),p=Object(s.a)(f,2),m=p[0],g=p[1],h=Pt({initialSelectedItems:i}),v=h.getSelectedItemProps,b=h.getDropdownProps,I=h.addSelectedItem,y=h.removeSelectedItem,O=h.selectedItems,x=function(e){return e.filter((function(e){return O.indexOf(e)<0&&e.toLowerCase().startsWith(m.toLowerCase())}))},j=Ot({inputValue:m,items:x(n),onStateChange:function(e){var t=e.inputValue,n=e.type,r=e.selectedItem;switch(n){case Ot.stateChangeTypes.InputChange:g(t);break;case Ot.stateChangeTypes.InputKeyDownEnter:case Ot.stateChangeTypes.ItemClick:case Ot.stateChangeTypes.InputBlur:r&&(g(""),I(r),_(null))}}}),w=j.isOpen,C=j.getToggleButtonProps,S=j.getLabelProps,k=j.getMenuProps,M=j.getInputProps,E=j.getComboboxProps,P=j.highlightedIndex,R=j.getItemProps,_=j.selectItem,D=Object(l.a)({placement:c});return{items:n,hasDivider:d,inputValue:m,setInputValue:g,getSelectedItemProps:v,getDropdownProps:b,addSelectedItem:I,removeSelectedItem:y,selectedItems:O,isOpen:w,getToggleButtonProps:C,getLabelProps:S,getMenuProps:k,getInputProps:M,getComboboxProps:E,highlightedIndex:P,getItemProps:R,selectItem:_,getFilteredItems:x,popper:D}}(Object(p.b)(e)),i=Object(a.useMemo)((function(){return r}),[r]);return Object(O.jsx)(Dt,Object.assign({value:i},{children:Object(O.jsx)(d.b,Object.assign({value:n},{children:Object(O.jsx)(m.a.div,Object.assign({pos:"relative"},{children:t}),void 0)}),void 0)}),void 0)},Kt=function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt().getLabelProps;return T({},e,t())}();return Object(O.jsx)(m.a.label,Object.assign({},e,t),void 0)},Vt=function(e){var t=e.value,n=e.index,r=F(e,["value","index"]),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt(),n=t.getItemProps,r=t.highlightedIndex,i=Object(d.d)(),o=r===e.index;return T({},e,Object(a.useMemo)((function(){var t;return T({},n({item:e.item,index:e.index}),{__css:T({},i.item,null==(t=o&&i.item)?void 0:t._active)})}),[n,e.item,e.index,o,i.item]))}({item:t,index:n});return Object(O.jsx)(m.a.li,Object.assign({},r,i,{children:t}),void 0)},$t=Object(g.a)((function(e,t){var n,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt(),n=t.isOpen,r=t.getMenuProps,i=t.getFilteredItems,o=t.popper,c=t.items,u=r(),s=u.ref,l=F(u,["ref"]),f=Object(d.d)();return T({},e,l,{isOpen:n,getFilteredItems:i,items:c},Object(a.useMemo)((function(){return{ref:w(e.ref,s,o.popperRef),__css:f.list}}),[e.ref,s,f.list,o.popperRef]))}({ref:t}),i=r.__css,o=r.items,c=r.isOpen,u=r.getFilteredItems,s=r.ref,l=F(r,["__css","items","isOpen","getFilteredItems","ref"]);return Object(O.jsx)(m.a.ul,Object.assign({ref:s,__css:T({listStyle:"none",position:"absolute"},!c&&{visibility:"hidden"},i)},l,{children:c&&(null==(n=u(o))?void 0:n.map((function(e,t){return Object(O.jsx)(Vt,{value:e,index:t},"".concat(e).concat(t))})))}),void 0)})),Lt=function(e){return Object(O.jsx)("svg",Object.assign({viewBox:"0 0 24 24",width:"1.5em",height:"1.5em"},e,{children:Object(O.jsx)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"},void 0)}),void 0)},At=function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt(),n=t.getInputProps,r=t.getDropdownProps,i=t.isOpen,o=Object(d.d)();return T({},e,n(r({preventKeyAction:i})),Object(a.useMemo)((function(){return{__css:o.input}}),[o.input]))}();return Object(O.jsx)(m.a.input,Object.assign({},e),void 0)},Nt=function(e){var t=e.value,n=e.index,r=F(e,["value","index"]),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt(),n=t.getSelectedItemProps,r=t.removeSelectedItem,i=Object(d.d)();return T({},e,Object(a.useMemo)((function(){return T({},n({selectedItem:e.item,index:e.index}),{__css:i.selectedItem})}),[n,e.item,e.index,i.selectedItem]),{removeSelectedItem:r})}(T({item:t,index:n},r)),o=i.removeSelectedItem,c=i.__css,u=F(i,["removeSelectedItem","__css"]);return Object(O.jsxs)(h.a,Object.assign({},c,u,{children:[Object(O.jsx)(h.c,{children:t},void 0),Object(O.jsx)(h.b,{onClick:function(){return o(t)}},void 0)]}),void 0)},Bt=function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt().getToggleButtonProps,n=Object(d.d)();return T({},e,Object(a.useMemo)((function(){return T({},t(),{__css:n.button})}),[t,n.button]))}(),t=e.__css,n=F(e,["__css"]);return Object(O.jsx)(v.a,Object.assign({size:"sm","aria-label":"toggle menu",icon:Object(O.jsx)(Lt,{},void 0)},t,n),void 0)},Ht=Object(g.a)((function(e,t){var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Tt(),n=t.isOpen,r=t.hasDivider,i=t.selectedItems,o=t.getSelectedItemProps,c=t.removeSelectedItem,u=t.getInputProps,s=t.getToggleButtonProps,l=t.getDropdownProps,f=t.getComboboxProps,p=t.popper,m=Object(d.d)();return T({},e,{hasDivider:r,selectedItems:i,getSelectedItemProps:o,removeSelectedItem:c,getInputProps:u,getToggleButtonProps:s,getDropdownProps:l,getComboboxProps:f,isOpen:n},Object(a.useMemo)((function(){return{ref:w(e.ref,p.referenceRef),__css:m.control}}),[e.ref,m.control,p.referenceRef]))}({ref:t}),r=n.ref,i=n.__css,o=n.hasDivider,c=n.selectedItems,s=n.getComboboxProps;return Object(O.jsxs)(b.a,Object.assign({ref:r,as:u.a,pl:1,pr:0,spacing:1},i,{children:[Object(O.jsx)(u.a,Object.assign({flexWrap:"wrap",py:1,spacing:1},{children:null==c?void 0:c.map((function(e,t){return Object(O.jsx)(Nt,{value:e,index:t},"selected-item-".concat(t))}))}),void 0),Object(O.jsxs)(I.a,Object.assign({d:"flex",alignItems:"center"},s(),{children:[Object(O.jsx)(At,{},void 0),Object(O.jsx)(I.a,Object.assign({h:"full",d:"flex",p:"1",alignItems:"center"},{children:o&&Object(O.jsx)(y.a,{orientation:"vertical"},void 0)}),void 0),Object(O.jsx)(Bt,{},void 0)]}),void 0)]}),void 0)})),Wt=function(e){var t=e.label,n=F(e,["label"]);return Object(O.jsxs)(Ft,Object.assign({},n,{children:[t&&Object(O.jsx)(Kt,{children:t},void 0),Object(O.jsx)(Ht,{},void 0),Object(O.jsx)($t,{},void 0)]}),void 0)},zt=Object(o.a)({components:{MultiSelect:D}}),Ut=["Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium","Roentgenium","Copernicium","Nihonium","Flerovium","Moscovium","Livermorium","Tennessine","Oganesson"],qt=function(){return Object(O.jsx)(c.a,{theme:zt,children:Object(O.jsx)(u.b,{minH:"100vh",w:"full",justifyContent:"center",alignItems:"center",children:Object(O.jsx)(Wt,{items:Ut,label:"Choose an item"})})})};i.a.render(Object(O.jsx)(qt,{}),document.getElementById("root"))}},[[79,1,2]]]);
//# sourceMappingURL=main.7aab1088.chunk.js.map