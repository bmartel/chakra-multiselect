(this["webpackJsonpchakra-multiselect-example"]=this["webpackJsonpchakra-multiselect-example"]||[]).push([[0],{77:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);n(77);var r=n(65),i=n.n(r),o=n(2),c=n(72),u=n(33),a=n(109),l=n(91),s=n(110),d=n(71),f=n(111),v=n(114),b=n(116),h=n(5),m=n(9),p=n(56),g=n.n(p),j=n(66),O=n(113),x=n(57),y=n(73),w=n(117),C=n(43),_=(n(112),n(118)),k=n(107),S=n(108),I=n(49),E=n(115),R=n(0),M=n(4);function L(e,t){return function(n){return"dark"===n.colorMode?t:e}}function T(e){return{bg:L("#fff","gray.700")(e),boxShadow:L("sm","dark-lg")(e),color:"inherit",w:"full",py:"2",zIndex:1,borderRadius:"md",borderWidth:"1px",maxH:"64",overflowY:"auto"}}var H={d:"flex",flex:1,flexWrap:"wrap",alignItems:"center"},W={fontSize:"md",marginEnd:3,mb:2,fontWeight:"medium",transition:"all 0.2s",opacity:1,_disabled:{opacity:.4}};function A(e){return{cursor:"pointer",transition:"background 50ms ease-out",_focus:{bg:L("gray.100","whiteAlpha.100")(e),boxShadow:"outline"},_active:{bg:L("gray.100","whiteAlpha.100")(e)},_expanded:{bg:L("gray.100","whiteAlpha.100")(e)},_disabled:{opacity:.4,cursor:"not-allowed"}}}function D(e){return{borderRadius:"full",variant:"solid",colorscheme:e.colorscheme}}function P(e){return{variant:"ghost",_hover:{bg:L("gray.200","whiteAlpha.200")(e)},_focus:{bg:L("gray.200","whiteAlpha.200")(e),boxShadow:"outline"},_active:{bg:L("gray.100","whiteAlpha.100")(e)},colorscheme:e.colorscheme}}var V={h:"auto"},z={d:"flex",alignItems:"center"},B={fontWeight:"semibold"},N={d:"inline",h:"full",border:0,borderColor:"inherit",my:1,opacity:.8},F={defaultProps:{size:"md"},parts:["item","selectedItem","list","selectedList","combobox","control","input","button","groupTitle","divider","label"],sizes:{sm:{control:{minH:8,px:1,spacing:1},input:{m:"px"},combobox:{spacing:"1"},item:{py:1,px:2},selectedItem:{m:"px"},selectedList:{py:"px"},groupTitle:{mx:2,my:1,fontSize:"sm"}},md:{control:{minH:10,px:1,spacing:1},input:{m:"2px"},combobox:{spacing:"1"},item:{py:2,px:3},selectedItem:{m:"2px"},selectedList:{py:"2px"},groupTitle:{mx:4,my:2,fontSize:"sm"}},lg:{control:{minH:12,px:2,spacing:2},input:{m:1},combobox:{spacing:"2"},item:{py:2,px:3},selectedItem:{m:1},selectedList:{py:1},groupTitle:{mx:4,my:2,fontSize:"sm"}}},baseStyle:function(e){return{list:T(e),selectedList:H,item:A(e),selectedItem:D(e),button:P(e),combobox:z,control:V,input:{bgColor:"transparent",appearance:"none",flex:1,outline:0},groupTitle:B,divider:N,label:W}}};function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Y(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}function X(e,t){if(null!=e)if(function(e){return"function"===typeof e}(e))e(t);else try{e.current=t}catch(n){throw new Error("Cannot assign value '"+t+"' to ref '"+e+"'")}}function q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){return X(t,e)}))}}function J(e){return"object"==typeof e&&null!=e&&1===e.nodeType}function U(e,t){return(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e}function G(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var n=getComputedStyle(e,null);return U(n.overflowY,t)||U(n.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1}function Q(e,t,n,r,i,o,c,u){return o<e&&c>t||o>e&&c<t?0:o<=e&&u<=n||c>=t&&u>=n?o-e-r:c>t&&u<n||o<e&&u>n?c-t+i:0}var Z,$,ee=["onKeyDown"],te=["_new"],ne=["refKey","ref","onChange","onFocus","onClick","onBlur"],re=["index","key","onClick","onMouseEnter"];!function(e){e.Create="create",e.Remove="remove",e.Select="select"}(Z||(Z={})),function(e){e.SetOpen="setOpen",e.SetSearch="setSearch",e.HighlightIndex="highlightIndex"}($||($={}));var ie=[],oe=[],ce={searchValue:"",resolvedSearchValue:"",isOpen:!1,highlightedIndex:0};function ue(e,t){e&&t&&function(e,t){var n=window,r=t.scrollMode,i=t.block,o=t.inline,c=t.boundary,u=t.skipOverflowHiddenElements,a="function"==typeof c?c:function(e){return e!==c};if(!J(e))throw new TypeError("Invalid target");for(var l=document.scrollingElement||document.documentElement,s=[],d=e;J(d)&&a(d);){if((d=d.parentElement)===l){s.push(d);break}null!=d&&d===document.body&&G(d)&&!G(document.documentElement)||null!=d&&G(d,u)&&s.push(d)}for(var f=n.visualViewport?n.visualViewport.width:innerWidth,v=n.visualViewport?n.visualViewport.height:innerHeight,b=window.scrollX||pageXOffset,h=window.scrollY||pageYOffset,m=e.getBoundingClientRect(),p=m.height,g=m.width,j=m.top,O=m.right,x=m.bottom,y=m.left,w="start"===i||"nearest"===i?j:"end"===i?x:j+p/2,C="center"===o?y+g/2:"end"===o?O:y,_=[],k=0;k<s.length;k++){var S=s[k],I=S.getBoundingClientRect(),E=I.height,R=I.width,M=I.top,L=I.right,T=I.bottom,H=I.left;if("if-needed"===r&&j>=0&&y>=0&&x<=v&&O<=f&&j>=M&&x<=T&&y>=H&&O<=L)return _;var W=getComputedStyle(S),A=parseInt(W.borderLeftWidth,10),D=parseInt(W.borderTopWidth,10),P=parseInt(W.borderRightWidth,10),V=parseInt(W.borderBottomWidth,10),z=0,B=0,N="offsetWidth"in S?S.offsetWidth-S.clientWidth-A-P:0,F="offsetHeight"in S?S.offsetHeight-S.clientHeight-D-V:0;if(l===S)z="start"===i?w:"end"===i?w-v:"nearest"===i?Q(h,h+v,v,D,V,h+w,h+w+p,p):w-v/2,B="start"===o?C:"center"===o?C-f/2:"end"===o?C-f:Q(b,b+f,f,A,P,b+C,b+C+g,g),z=Math.max(0,z+h),B=Math.max(0,B+b);else{z="start"===i?w-M-D:"end"===i?w-T+V+F:"nearest"===i?Q(M,T,E,D,V+F,w,w+p,p):w-(M+E/2)+F/2,B="start"===o?C-H-A:"center"===o?C-(H+R/2)+N/2:"end"===o?C-L+P+N:Q(H,L,R,A,P+N,C,C+g,g);var K=S.scrollLeft,Y=S.scrollTop;w+=Y-(z=Math.max(0,Math.min(Y+z,S.scrollHeight-E+F))),C+=K-(B=Math.max(0,Math.min(K+B,S.scrollWidth-R+N)))}_.push({el:S,top:z,left:B})}return _}(e,{boundary:t,block:"nearest",scrollMode:"if-needed"}).forEach((function(e){var t=e.el,n=e.top,r=e.left;t.scrollTop=n,t.scrollLeft=r}))}var ae=function(e,t){return t},le=function(e,t,n,r){r.current&&ue(t.current,n.current)},se=function(e){return"string"===typeof e?{label:e,value:e}:e},de=function(e){return e.length>1e4?1e3:e.length>1e3?200:0},fe=function(e,t,n){return e.filter((function(e){return n(e).value.toString().toLowerCase().includes(t.toString().toLowerCase())})).sort((function(e){return n(e).value.toString().toLowerCase().indexOf(t.toString().toLowerCase())}))};var ve=function(e){void 0===e&&(e={});var t=e,n=t.strict,r=void 0===n||n,i=t.errorMessage,o=void 0===i?"useContext: `context` is undefined. Seems you forgot to wrap component within the Provider":i,c=t.name,u=R.createContext(void 0);return u.displayName=c,[u.Provider,function e(){var t=R.useContext(u);if(!t&&r){var n=new Error(o);throw n.name="ContextError",null==Error.captureStackTrace||Error.captureStackTrace(n,e),n}return t},u]}({strict:!1,name:"SelectContext"}),be=Object(o.a)(ve,2),he=be[0],me=be[1];function pe(e){var t=e.create,n=void 0!==t&&t,r=e.single,i=void 0!==r&&r,c=e.getDebounce,u=void 0===c?de:c,a=e.getOption,l=void 0===a?se:a,s=e.stateReducer,d=void 0===s?ae:s,f=e.filterFn,v=void 0===f?fe:f,b=e.scrollToIndex,p=void 0===b?le:b,x=e.shiftAmount,y=void 0===x?5:x,w=e.duplicates,C=e.options,_=e.value,k=e.onChange,S=e.placement,I=void 0===S?"bottom-start":S,E=function(e,t){var n=Object(R.useRef)();n.current=t;var r=Object(R.useState)(e),i=Object(o.a)(r,2),c=i[0],u=i[1];return[c,Object(R.useCallback)((function(e,t){if(!t)throw new Error("An action type is required to update the state");return u((function(r){return n.current(r,e(r),t)}))}),[u])]}(ce,d),M=Object(o.a)(E,2),L=M[0],T=L.searchValue,H=L.resolvedSearchValue,W=L.isOpen,A=L.highlightedIndex,D=M[1],P=!i,V=Object(R.useRef)(),z=Object(R.useRef)(),B=Object(R.useRef)({}),N=Object(R.useRef)(),F=Object(R.useRef)(),X=Object(R.useRef)(),q=Object(R.useRef)(),J=Object(R.useRef)(!1),U=Object(O.a)({placement:I});F.current=v,X.current=p,N.current=k,P&&"undefined"===typeof _&&(_=ie),C||(C=oe);var G=C;C=Object(R.useMemo)((function(){var e;return P&&!w?null==(e=C)?void 0:e.filter((function(e){var t;return!(null!=(t=_)&&t.some((function(t){return l(t).value===l(e).value})))})):C}),[C,_,w,P,l]);var Q=Object(R.useMemo)((function(){return P?_.map((function(e){return G.find((function(t){return l(t).value===l(e).value}))||l(e)})):G.find((function(e){return l(e).value===l(_).value}))||l(_)}),[P,_,G,l]);C=Object(R.useMemo)((function(){return H?null==F.current?void 0:F.current(C,H,l):C}),[C,H,l]),C=Object(R.useMemo)((function(){return n&&T?[K({_new:!0},l(T))].concat(Object(m.a)(C)):C}),[n,T,C]);var ue,ve=Object(R.useCallback)((function(e){D((function(t){return K({},t,{isOpen:e})}),$.SetOpen)}),[D]),be=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=Object(R.useRef)(null),r=Object(R.useRef)();return r.current=e,Object(R.useEffect)((function(){return function(){clearTimeout(n.current)}}),[t]),Object(R.useCallback)(Object(j.a)(g.a.mark((function e(){var i,o,c,u=arguments;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(i=u.length,o=new Array(i),c=0;c<i;c++)o[c]=u[c];return n.current&&clearTimeout(n.current),e.abrupt("return",new Promise((function(e,i){n.current=setTimeout((function(){n.current=null;try{e(r.current.apply(r,o))}catch(t){i(t)}}),t)})));case 3:case"end":return e.stop()}}),e)}))),[t])}((function(e){D((function(t){return K({},t,{resolvedSearchValue:e})}),$.SetSearch)}),u(C)),he=Object(R.useCallback)((function(e){D((function(t){return K({},t,{searchValue:e})}),$.SetSearch),be(e)}),[D,be]),me=Object(R.useCallback)((function(e){D((function(t){return K({},t,{highlightedIndex:Math.min(Math.max(0,"function"===typeof e?e(t.highlightedIndex):e),C.length-1)})}),$.HighlightIndex)}),[C,D]),pe=Object(R.useCallback)((function(e){var t=C[e];if(t){var n=l(t),r=n._new,i=Y(n,te);P?!w&&_.some((function(e){return l(e).value===i.value}))||null==N.current||N.current([].concat(Object(m.a)(_),[i.value]),{action:r?Z.Create:Z.Select,value:i}):null==N.current||N.current(i.value,{action:r?Z.Create:Z.Select,value:i})}P?he(""):ve(!1)}),[P,C,w,_,ve,he]),ge=Object(R.useCallback)((function(e){N.current(_.filter((function(t,n){return n!==e})),{action:Z.Remove,value:l(_[e])})}),[_]),je=function(e){he(e.target.value),ve(!0)},Oe=function(){n&&!P||he(""),ve(!0)},xe=function(){return Oe()},ye=function(e,t){return function(n,r){var i=n.shift,o=n.meta;r.preventDefault();var c=t||o?1e12:e||i?y-1:1;ve(!0),J.current=!0,me((function(e){return e-c}))}},we=function(e,t){return function(n,r){var i=n.shift,o=n.meta;r.preventDefault();var c=t||o?1e12:e||i?y-1:1;ve(!0),J.current=!0,me((function(e){return e+c}))}},Ce=(ue={ArrowUp:ye(),ArrowDown:we(),PageUp:ye(!0),PageDown:we(!0),Home:ye(!1,!0),End:we(!1,!0),Enter:function(e,t){W&&((T||C[A])&&t.preventDefault(),C[A]&&pe(A))},Escape:function(){ve(!1)},Tab:function(){ve(!1)},Backspace:function(){P&&!T&&ge(_.length-1)}},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onKeyDown;return K({},Y(e,ee),{onKeyDown:function(e){var n=e.keyCode,r=e.key,i=e.shiftKey,o=e.metaKey,c=ue[r]||ue[n];c&&c({keyCode:n,key:r,shift:i,meta:o},e),t&&t(e)}})});return function(e,t,n){var r=Object(R.useRef)(),i=Object(R.useRef)();i.current=t;var o=n||r,c=Object(R.useCallback)((function(e){var t="touchstart"===e.type;if("click"!==e.type||!t){var n=o.current;n&&!n.contains(e.target)&&i.current(e)}}),[o]);Object(R.useEffect)((function(){return e&&(document.addEventListener("touchstart",c,!0),document.addEventListener("click",c,!0)),function(){document.removeEventListener("touchstart",c,!0),document.removeEventListener("click",c,!0)}}),[e,c])}(W,(function(){ve(!1)}),V),Object(R.useEffect)((function(){me(0)}),[T,me]),Object(R.useEffect)((function(){var e,t;(me(0),!W&&null!=(e=B.current)&&e.event)&&(null==(t=B.current)||t.cb(B.current.event),B.current.event=null)}),[W,me]),Object(R.useEffect)((function(){null==X.current||X.current(A,q,V,J)}),[A]),Object(R.useEffect)((function(){W&&z.current&&setTimeout((function(){var e;null==(e=z.current)||e.focus()}))}),[W]),{multi:P,optionsRef:V,popper:U,value:_,searchValue:T,isOpen:W,highlightedIndex:A,highlightedIndexRef:q,enableScrollRef:J,selectedOption:Q,visibleOptions:C,selectIndex:pe,removeValue:ge,setOpen:ve,setSearch:he,highlightIndex:me,getInputProps:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.refKey,r=void 0===n?"ref":n,i=t.ref,o=t.onChange,c=t.onFocus,u=t.onClick,a=t.onBlur,l=Y(t,ne);return Ce(K((e={},Object(h.a)(e,r,(function(e){z.current=e,i&&(i.current=e)})),Object(h.a)(e,"value",(W?T:Q?Q.label:"")||""),Object(h.a)(e,"onChange",(function(e){je(e),o&&o(e)})),Object(h.a)(e,"onFocus",(function(e){xe(),c&&c(e)})),Object(h.a)(e,"onClick",(function(e){Oe(),u&&u(e)})),Object(h.a)(e,"onBlur",(function(e){a&&(e.persist(),B.current.cb=a,B.current.event=e)})),e),l))},getOptionProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.index,n=e.key,r=void 0===n?t:n,i=e.onClick,o=e.onMouseEnter,c=Y(e,re);if("number"!==typeof t||t<0)throw new Error("useSelect: The getOptionProps prop getter requires an index property, eg. 'getOptionProps({index: 1})'");return K({key:r},c,{onClick:function(e){pe(t),i&&i(e)},onMouseEnter:function(e){J.current=!1,me(t),o&&o(e)}})},getOption:l}}var ge=["value","index"],je=["highlightedRef"],Oe=["__css","visibleOptions","isOpen","getOption","ref"],xe=["key"],ye=["isActive","width","height","__css"],we=["value","index"],Ce=["onClick","__css"],_e=["__css","size","ariaLabel","Icon"],ke=["children"],Se=["__css","selectedItems","multi"],Ie=["__css"],Ee=["label"],Re=Object(y.a)("svg"),Me=function(e){var t=e.children,n=Object(w.a)("MultiSelect",e),r=pe(Object(C.b)(e)),i=Object(R.useMemo)((function(){return r}),[r]);return Object(M.jsx)(he,Object.assign({value:i},{children:Object(M.jsx)(x.b,Object.assign({value:n},{children:Object(M.jsx)(y.a.div,Object.assign({pos:"relative"},{children:t}),void 0)}),void 0)}),void 0)},Le=Object(R.memo)((function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(x.d)();return K({},e,{__css:t.label})}();return Object(M.jsx)(y.a.label,Object.assign({},e,t),void 0)}));Le.displayName="SelectLabel";var Te=Object(R.memo)((function(e){var t=e.value,n=e.index,r=Y(e,ge),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me(),n=t.getOptionProps,r=t.highlightedIndex,i=t.highlightedIndexRef,o=Object(x.d)(),c=r===e.index;return K({},e,Object(R.useMemo)((function(){var t;return K({},n({option:{value:e.value},index:e.index}),{highlightedRef:c?i:void 0,__css:K({},o.item,null==(t=c&&o.item)?void 0:t._active)})}),[c,n,e.value,e.index,o.item]))}({value:t,index:n}),o=i.highlightedRef,c=Y(i,je);return Object(M.jsx)(y.a.li,Object.assign({ref:o&&o},r,c,{children:t}),void 0)})),He=Object(R.memo)((function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me(),n=t.isOpen,r=t.getOption,i=t.optionsRef,o=t.popper,c=t.visibleOptions,u=Object(x.d)();return K({},e,{ref:q(i,o.popperRef),isOpen:n,visibleOptions:c,getOption:r,__css:u.list})}({}),t=e.__css,n=e.visibleOptions,r=e.isOpen,i=e.getOption,o=e.ref,c=Y(e,Oe),u=!(!r||!n.length),a=Object(R.useCallback)((function(e,t){var n=i(e);return{key:n.id||"".concat(n.value).concat(t),value:n.value,index:t}}),[i]);return Object(M.jsx)(y.a.ul,Object.assign({ref:o,__css:K({listStyle:"none",position:"absolute"},!u&&{display:"none"},t)},c,{children:u&&n.map((function(e,t){var n=a(e,t),r=n.key,i=Y(n,xe);return Object(M.jsx)(Te,Object.assign({},i),r)}))}),void 0)})),We=function(e){var t=e.isActive,n=e.width,r=void 0===n?"1.25rem":n,i=e.height,o=void 0===i?"1.25rem":i,c=e.__css,u=Y(e,ye);return Object(M.jsx)(Re,Object.assign({viewBox:"0 0 24 24",width:r,height:o,__css:K({},c,t&&(null==c?void 0:c._active))},u,{children:Object(M.jsx)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"},void 0)}),void 0)},Ae=Object(R.memo)((function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me().getInputProps,n=Object(x.d)();return K({},e,t(),{__css:n.input})}(e);return Object(M.jsx)(y.a.input,Object.assign({},t),void 0)}));Ae.displayName="SelectInput";var De=function(e){var t=e.value,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me().removeValue,n=Object(x.d)(),r=Object(R.useCallback)((function(){return t(e.index)}),[e.index,t]);return K({key:e.value,onClick:r,__css:n.selectedItem},e)}(K({value:t,index:e.index},Y(e,we))),r=n.onClick,i=n.__css,o=Y(n,Ce);return Object(M.jsxs)(_.a,Object.assign({},i,o,{children:[Object(M.jsx)(_.c,{children:t},void 0),Object(M.jsx)(_.b,{onClick:r},void 0)]}),void 0)},Pe=Object(R.memo)((function(e){var t=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=me(),r=n.isOpen,i=n.setOpen,o=Object(R.useCallback)((function(){return i((function(e){return!e}))}),[i]),c=Object(x.d)();return K({},t,{__css:K({},c.button,null==(e=r&&c.button)?void 0:e._active),isOpen:r,onClick:o})}(e),n=t.__css,r=t.size,i=void 0===r?"sm":r,o=t.ariaLabel,c=void 0===o?"toggle menu":o,u=t.Icon,a=void 0===u?We:u,l=Y(t,_e);return Object(M.jsx)(k.a,Object.assign({tabIndex:0,size:i,"aria-label":c,icon:Object(M.jsx)(a,{isActive:l.isOpen,__css:{transitionDuration:"200ms",transitionProperty:"transform",_active:{transform:"rotate(180deg)"}}},void 0)},n,l),void 0)}));Pe.displayName="SelectToggleButton";var Ve=Object(R.memo)((function(e){var t=e.children,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me(),n=t.value,r=t.multi,i=Object(x.d)();return K({},e,{multi:r,selectedItems:n,__css:i.selectedList})}(Y(e,ke)),r=n.__css,i=n.selectedItems,o=n.multi,c=Y(n,Se);return Object(M.jsxs)(S.a,Object.assign({},r,c,{children:[o&&(null==i?void 0:i.map((function(e,t){return Object(M.jsx)(De,{value:e,index:t},"selected-item-".concat(t))}))),t]}),void 0)}));Ve.displayName="SelectedList";var ze=Object(R.memo)((function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(x.d)();return K({},e,{__css:t.combobox})}(e),n=t.__css,r=Y(t,Ie);return Object(M.jsx)(b.a,Object.assign({},n,r,{children:Object(M.jsx)(Pe,{},void 0)}),void 0)}));ze.displayName="SelectCombobox";var Be=Object(I.a)((function(e,t){var n=e.children,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=me(),n=t.isOpen,r=t.popper,i=Object(x.d)();return K({},e,Object(R.useMemo)((function(){return{ref:q(e.ref,r.referenceRef)}}),[e.ref,r.referenceRef]),{isOpen:n,__css:i.control})}({ref:t}),i=r.ref,o=r.__css;return Object(M.jsx)(E.a,Object.assign({ref:i,as:b.a},o,{children:n}),void 0)})),Ne=function(e){var t=e.label,n=Y(e,Ee);return Object(M.jsxs)(Me,Object.assign({},n,{children:[t&&Object(M.jsx)(Le,{children:t},void 0),Object(M.jsxs)(Be,{children:[Object(M.jsx)(Ve,{children:Object(M.jsx)(Ae,{},void 0)},void 0),Object(M.jsx)(ze,{},void 0)]},void 0),Object(M.jsx)(He,{},void 0)]}),void 0)},Fe=["onChange","value"],Ke=Object(a.a)({components:{MultiSelect:Object(u.a)(Object(u.a)({},F),{},{baseStyle:function(e){var t=F.baseStyle(e);return Object(u.a)({},t)}})}}),Ye=function(){var e=Object(l.b)().toggleColorMode,t=Object(l.c)("dark","light");return Object(M.jsx)(s.a,{justify:"flex-end",mb:4,children:Object(M.jsx)(d.a,{size:"md",variant:"ghost",color:"current",marginLeft:"2",onClick:e,children:"Switch to ".concat(t," mode")})})},Xe=["Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium","Roentgenium","Copernicium","Nihonium","Flerovium","Moscovium","Livermorium","Tennessine","Oganesson"].map((function(e){return{label:e,value:e.toLowerCase()}})),qe=function(e){var t=e.onChange,n=e.value,r=Object(c.a)(e,Fe),i=Object(R.useState)(n||r.single?"":[]),a=Object(o.a)(i,2),l=a[0],s=a[1],d=Object(R.useCallback)((function(e){s(e),null===t||void 0===t||t(e)}),[s,t]);return Object(M.jsx)(Ne,Object(u.a)({value:l,onChange:d},r))},Je=function(){return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(f.a,{initialColorMode:"light"}),Object(M.jsx)(v.a,{theme:Ke,children:Object(M.jsxs)(b.b,{minH:"100vh",w:"full",children:[Object(M.jsx)(Ye,{}),Object(M.jsxs)(b.b,{spacing:"12",w:"full",flex:"1",justifyContent:"center",alignItems:"center",children:[Object(M.jsx)(qe,{options:Xe,label:"Choose a single item",single:!0}),Object(M.jsx)(qe,{options:Xe,label:"Choose multiple items"}),Object(M.jsx)(qe,{options:Xe,label:"Choose or create a single item",single:!0,create:!0}),Object(M.jsx)(qe,{options:Xe,label:"Choose or create multiple items",create:!0})]})]})})]})};i.a.render(Object(M.jsx)(Je,{}),document.getElementById("root"))}},[[88,1,2]]]);
//# sourceMappingURL=main.97453628.chunk.js.map