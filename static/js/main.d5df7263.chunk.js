(this["webpackJsonpcode-sandbox-examples"]=this["webpackJsonpcode-sandbox-examples"]||[]).push([[0],{15:function(e,t,n){},37:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var s=n(1),i=n(29),a=n.n(i),c=(n(15),n(37),n(2),n(9),n(22),n(32),n(21),n(17)),r=n(18),o=n(19),d=n(20),l=(n(44),n(14)),g=(n(45),n(0)),h=function(e){Object(o.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(c.a)(this,n),(s=t.call(this,e)).state={diffX:0,diffY:0,dragging:!1,styles:{}},s._dragStart=s._dragStart.bind(Object(l.a)(s)),s._dragging=s._dragging.bind(Object(l.a)(s)),s._dragEnd=s._dragEnd.bind(Object(l.a)(s)),s}return Object(r.a)(n,[{key:"_dragStart",value:function(e){this.setState({diffX:e.screenX-e.currentTarget.getBoundingClientRect().left,diffY:e.screenY-e.currentTarget.getBoundingClientRect().top,dragging:!0})}},{key:"_dragging",value:function(e){if(this.state.dragging){var t=e.screenX-this.state.diffX,n=e.screenY-this.state.diffY;this.setState({styles:{left:t,top:n}})}}},{key:"_dragEnd",value:function(){this.setState({dragging:!1})}},{key:"render",value:function(){var e=this.props.show?"Dialog":"Dialog hidden";return Object(g.jsxs)("div",{className:e,style:this.state.styles,onMouseDown:this._dragStart,onMouseMove:this._dragging,onMouseUp:this._dragEnd,children:[Object(g.jsx)("div",{className:"DialogTitle",children:"My Dialog"}),Object(g.jsx)("div",{className:"Contents",children:"Contents of the Dialog: - one - two - three"}),Object(g.jsx)("div",{className:"closeButton",onClick:this.props.onClose,children:"Close"})]})}}]),n}(s.Component),u=(s.Component,function(){return Object(g.jsxs)("header",{class:"w3-container w3-center w3-padding-32",children:[Object(g.jsx)("h1",{children:Object(g.jsx)("b",{children:"BL BLOG-xdv0.11"})}),Object(g.jsxs)("p",{children:["Welcome to the blog of ",Object(g.jsx)("span",{class:"w3-tag",children:"unknown"})]})]})}),j=function(){return Object(g.jsx)("body",{class:"w3-light-grey",children:Object(g.jsx)("div",{class:"w3-content",style:{maxWidth:"1400px"},children:Object(g.jsx)(u,{})})})},b=function(){return Object(g.jsx)(j,{})};n(47);a.a.render(Object(g.jsx)(b,{}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.d5df7263.chunk.js.map