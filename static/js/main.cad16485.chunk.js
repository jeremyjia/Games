(this["webpackJsonpcode-sandbox-examples"]=this["webpackJsonpcode-sandbox-examples"]||[]).push([[0],{42:function(e,t,s){},43:function(e,t,s){},44:function(e,t,s){},47:function(e,t,s){"use strict";s.r(t);var n=s(0),i=s(28),a=s.n(i),c=s(2),r=s(14),o=s(21),d=s(31),l=s(20),j=(s(42),s(16)),h=s(17),b=s(18),g=s(19),u=(s(43),s(13)),O=(s(44),s(1)),x=function(e){Object(b.a)(s,e);var t=Object(g.a)(s);function s(e){var n;return Object(j.a)(this,s),(n=t.call(this,e)).state={diffX:0,diffY:0,dragging:!1,styles:{}},n._dragStart=n._dragStart.bind(Object(u.a)(n)),n._dragging=n._dragging.bind(Object(u.a)(n)),n._dragEnd=n._dragEnd.bind(Object(u.a)(n)),n}return Object(h.a)(s,[{key:"_dragStart",value:function(e){this.setState({diffX:e.screenX-e.currentTarget.getBoundingClientRect().left,diffY:e.screenY-e.currentTarget.getBoundingClientRect().top,dragging:!0})}},{key:"_dragging",value:function(e){if(this.state.dragging){var t=e.screenX-this.state.diffX,s=e.screenY-this.state.diffY;this.setState({styles:{left:t,top:s}})}}},{key:"_dragEnd",value:function(){this.setState({dragging:!1})}},{key:"render",value:function(){var e=this.props.show?"Dialog":"Dialog hidden";return Object(O.jsxs)("div",{className:e,style:this.state.styles,onMouseDown:this._dragStart,onMouseMove:this._dragging,onMouseUp:this._dragEnd,children:[Object(O.jsx)("div",{className:"DialogTitle",children:"My Dialog"}),Object(O.jsx)("div",{className:"Contents",children:"Contents of the Dialog: - one - two - three"}),Object(O.jsx)("div",{className:"closeButton",onClick:this.props.onClose,children:"Close"})]})}}]),s}(n.Component),f=function(e){Object(b.a)(s,e);var t=Object(g.a)(s);function s(e){var n;return Object(j.a)(this,s),(n=t.call(this,e)).state={showDialog:!1},n}return Object(h.a)(s,[{key:"_showDialog",value:function(){this.setState({showDialog:!this.state.showDialog})}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"MainApp",children:[Object(O.jsx)("div",{className:"Title",children:"Example Dialog Popper"}),Object(O.jsx)("div",{className:"button",onClick:this._showDialog.bind(this),children:" Show Dialog "}),Object(O.jsx)(x,{onClose:this._showDialog.bind(this),show:this.state.showDialog})]})}}]),s}(n.Component),p=function(){return Object(O.jsxs)(r.a,{children:[Object(O.jsx)("span",{children:"About:xdv0.14"}),Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(f,{})})]})},v=function(){return Object(O.jsx)("span",{children:"Home"})},m=function(){return Object(O.jsx)("span",{children:"Users"})},C=function(){return Object(O.jsx)(c.a,{children:Object(O.jsx)(r.a,{className:"p-3",children:Object(O.jsxs)(r.a,{className:"p-5 mb-4 bg-light rounded-3",children:[Object(O.jsx)("h1",{className:"header",children:"Welcome To React-Bootstrap v0.22"}),Object(O.jsxs)("h2",{children:["Navigate to"," ",Object(O.jsxs)(d.a,{className:"custom-btn-toolbar",children:[Object(O.jsx)(l.LinkContainer,{to:"/",children:Object(O.jsx)(o.a,{children:"Home"})}),Object(O.jsx)(l.LinkContainer,{to:"/about",children:Object(O.jsx)(o.a,{children:"About"})}),Object(O.jsx)(l.LinkContainer,{to:"/users",children:Object(O.jsx)(o.a,{children:"Users"})})]})]}),Object(O.jsxs)("h2",{children:["Current Page is"," ",Object(O.jsxs)(c.g,{children:[Object(O.jsx)(c.d,{path:"/about",children:Object(O.jsx)(p,{})}),Object(O.jsx)(c.d,{path:"/users",children:Object(O.jsx)(m,{})}),Object(O.jsx)(c.d,{path:"/",children:Object(O.jsx)(v,{})})]})]})]})})})};s(46);a.a.render(Object(O.jsx)(C,{}),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.cad16485.chunk.js.map