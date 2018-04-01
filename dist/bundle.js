!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const s="http://deadlinez.herokuapp.com/alexalone",r="POST",a="GET",i="Content-Type",o="application/json;charset=UTF-8";var l=new class{constructor(){this.domen=s}doGet(e,t=[{name:i,value:o}]){return this.doRequest(a,e,t)}doPost(e,t=null,n=[{name:i,value:o}]){return this.doRequest(r,e,t,n)}doRequest(e=a,t="/",n=null,s=[]){return new Promise((r,a)=>{const i=new XMLHttpRequest;i.open(e,`${this.domen}${t}`,!0),i.addEventListener("load",()=>{const e=JSON.parse(i.responseText);i.status<300?r(e):a(e.message)}),i.addEventListener("error",()=>{a(new Error("Network error"))}),s.forEach(e=>i.setRequestHeader(e.name,e.value)),i.withCredentials=!0,n?i.send(JSON.stringify(n)):i.send()})}};var d=new class{constructor(e=""){e&&this.changeTemplate(e)}getHTML(e,t){return t&&this.changeTemplate(t),this.template(e)}changeTemplate(e){this.template=Handlebars.compile(e)}};class u{constructor(e){this._element=null,this.template=e,this.events=["click","focus","blur"],this.functionExp=/\s*\(([\w, ]*)\)\n*\t*\s*{(.*)}/i}render(e){const t=document.createElement("div");t.innerHTML=d.getHTML(e,this.template),this._element=t.lastChild,this.addListeners(e)}appendChild(e){this._element.appendChild(e)}element(){return this._element}addListeners(e){this.events.forEach(t=>{if(e[t]){const n=e[t].match(this.functionExp);this._element.addEventListener(t,new Function(n[1],n[2]))}})}}class c extends u{render(e){this.template='<div class="button {{class}}"><p>{{text}}</p></div>',super.render(e)}}class p extends u{render(e){this.template='<div class="input-block {{block-class}}">\n                            <label class="{{label-class}}">{{label-text}}</label>\n                            <div class="error {{error-class}}">{{error-text}}</div>\n                            <input name="{{input-name}}" focus="{{focus}}" blur="{{blur}}"\n                            type={{type}} class="{{input-class}}" placeholder="{{placeholder}}" value="{{value}}"/>\n                         </div>',super.render(e)}addListeners(e){this.events.forEach(t=>{if(e[t]){const n=e[t].match(this.functionExp);this._element.getElementsByTagName("input")[0].addEventListener(t,new Function(n[1],n[2]))}})}}class h extends u{render(e){this.template='<div class="header {{class}}">\n                            <h1>{{text}}</h1>\n                         </div>',super.render(e)}}class g extends u{render(e){this.template='<li><a href="{{href}}">{{text}}</a></li>',super.render(e)}}class m extends u{render(e){this.template='<form method="{{method}}"></form>',super.render(e)}}class v extends u{render(e){this.template='<div class="footer"><p>{{text}}</p></div>',super.render(e)}}class w extends u{render(e){this.template='<img class="{{class}}" src="{{src}}">',super.render(e)}}class b extends u{render(e){this.template='<{{tag}} class="{{class}}">{{text}}</{{tag}}>',super.render(e)}}var y=new class{constructor(){this.regExp=/<[a-z0-9 _\-"'=(){}\[\],;:.@!?\/+]+>|<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/gi,this.regExpEnd=/<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/i,this.objects=[],this.tagStack=[],this.componentFactory={Button:()=>new c,Input:()=>new p,Header:()=>new h,MenuPoint:()=>new g,Form:()=>new m,Footer:()=>new v,Image:()=>new w,div:()=>new b,a:()=>new b,p:()=>new b,img:()=>new b,ul:()=>new b}}getHTML(e){this.stringToObject(e);const t=document.createElement("div");return this.objects.forEach(e=>{e&&t.appendChild(this.getElement(e))}),this.objects=[],t}handleCloseTag(){const e=this.tagStack.pop();0!==this.tagStack.length?this.tagStack[this.tagStack.length-1].children.push(e):this.objects.push(e)}handleOpenTag(e){const t={object:e.slice(1,-1),children:[]};this.tagStack.push(t)}handleTag(e){this.regExpEnd.exec(e)?this.handleCloseTag(e):this.handleOpenTag(e)}parseHtml(e){let t="",n=0;for(e=e.replace(/\n/g," ");t=this.regExp.exec(e);)n<t.index&&this.tagStack.length&&(this.tagStack[this.tagStack.length-1].text=e.slice(n,t.index)),this.handleTag(t[0]),n=t.index+t[0].length}setObjectAttributes(e){const t=e.object.split(" ");e.tag=t[0],e.attributes={},e.attributes.text=e.text,e.attributes.tag=e.tag;let n="";const s=/([\w-_]+)="([^"]*)"/gi;for(;n=s.exec(e.object);)e.attributes[n[1]]=n[2]}performObject(e){return e&&e.object?(this.setObjectAttributes(e),e.children.length?void e.children.forEach(e=>this.performObject(e)):e):e}stringToObject(e){return this.parseHtml(e),this.objects.map(e=>this.performObject(e)),this.objects}getElement(e){const t=this.componentFactory[e.tag]();return t.render(e.attributes),e.children.forEach(e=>t.appendChild(this.getElement(e))),t.element()}};class S{constructor(){this.element=null,this.context={}}preRender(){return new Promise((e,t)=>e({}))}render(){return""}deleteElement(){if(this.element){const e=this.element.parentNode;return e.removeChild(this.element),e}}needAuthorization(){return!0}update(e={}){return null}hide(){this.element&&this.element.classList.add("hidden")}show(){this.element&&this.element.classList.remove("hidden")}__render(){return this.element=y.getHTML(d.getHTML(this.context,this.render())),this.element}}class L extends S{render(){return"<Header>Loading...</Header>"}}var E=new class{constructor(){this.lastView=null,this.urls={},this.insertionElement=document.querySelector(".root"),this.loadingElement=(new L).__render(),this.loadingElement.classList.add("hidden"),this.insertionElement.appendChild(this.loadingElement),this.start()}addUrl(e,t){return this.urls[e]={view:t,loaded:!1},this}viewUpdate(e){this.lastView.update(e);const t=this.deleteLast();this.lastView.__render(),t.appendChild(this.lastView.element),this.lastView.show()}go(e,t=this.insertionElement){if(!this.urls[e])return!1;this.showLoading(),e=this.checkAuth(e),this.route(e,t),window.history.pushState({path:e},e,e)}route(e,t=this.insertionElement){this.urls[e].loaded?this.pageUpdate(e):(this.urls[e].loaded=!0,this.urls[e].view.preRender().then(n=>{this.urls[e].view.__render(),t.appendChild(this.urls[e].view.element),this.pageUpdate(e)}))}start(){window.addEventListener("popstate",e=>{this.route(window.location.pathname)})}showPage(e){this.urls[e].view.show()}hideLast(){this.lastView&&this.lastView.hide()}deleteLast(){if(this.lastView.element){const e=this.lastView.element.parentNode;return e.removeChild(this.lastView.element),e}}checkAuth(e){return this.urls[e].view.needAuthorization()&&!x.isAuthorized?"/":!this.urls[e].view.needAuthorization()&&x.isAuthorized?"/user/":e}pageUpdate(e){this.hideLoading(),this.lastView=this.urls[e].view,this.showPage(e)}showLoading(){this.hideLast(),this.loadingElement.classList.remove("hidden")}hideLoading(){this.loadingElement.classList.add("hidden")}};var x=new class{checkSession(){return l.doGet("/me").then(e=>this.isAuthorized=!0,e=>this.isAuthorized=!1)}userLogin(){this.isAuthorized=!0}userLogout(){this.isAuthorized=!1,E.urls["/user/"].view.deleteElement(),E.urls["/user/"].loaded=!1,E.urls["/settings/"].loaded&&(E.urls["/settings/"].view.deleteElement(),E.urls["/settings/"].loaded=!1)}};window.validateLogin=(()=>{const e=[...document.querySelector(".login").getElementsByClassName("input-block")];e.reduce((e,t)=>e+validateLoginInput(t),0)==e.length&&l.doPost("/signin",{login:e[0].querySelector("input").value,password:e[1].querySelector("input").value}).then(t=>{x.userLogin(),E.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{alert(e)})}),window.validateLoginInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusLoginInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurLoginInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))});window.goToLogin=(()=>{E.go("/login/")}),window.goToSignUp=(()=>{E.go("/signup/")}),window.goToScore=(()=>{E.go("/leaderboard/")}),window.goBack=(()=>{E.go("/")});window.validateRegistration=(()=>{const e=[...document.querySelector(".registration").getElementsByClassName("input-block")];e.reduce((e,t)=>e+validateRegistrationInput(t),0)==e.length&&l.doPost("/signup",{login:e[0].querySelector("input").value,email:e[1].querySelector("input").value,password:e[2].querySelector("input").value}).then(t=>{x.userLogin(),E.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{document.querySelector(".registration").getElementsByClassName("input-block")[0].querySelector(".error").innerText=e,document.querySelector(".registration").getElementsByClassName("input-block")[0].querySelector(".error").classList.remove("hidden")})}),window.validateRegistrationInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusRegistrationInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurRegistrationInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))});window.goToSettings=(()=>E.go("/settings/")),window.signOut=(()=>{l.doPost("/signout").then(e=>{x.userLogout(),E.go("/")})});const k=()=>{const e=[...document.querySelector(".settings").getElementsByClassName("input-block")];E.showLoading(),l.doPost("/user/update",{login:e[0].querySelector("input").value,email:e[1].querySelector("input").value,avatar:reader.result}).then(t=>{E.urls["/user/"].loaded=!1,E.urls["/user/"].view.deleteElement(),E.urls["/settings/"].loaded=!1,E.urls["/settings/"].view.deleteElement(),E.hideLoading(),E.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{document.querySelector(".settings").getElementsByClassName("input-block")[0].querySelector(".error").innerText=e,document.querySelector(".settings").getElementsByClassName("input-block")[0].querySelector(".error").classList.remove("hidden")})};window.validateSettings=(()=>{const e=[...document.querySelector(".settings").getElementsByClassName("input-block")];if(window.reader=new FileReader,e.reduce((e,t)=>e+validateSettingsInput(t),0)==e.length){const t=e[2].querySelector("input").files[0];reader.readAsDataURL(t),reader.onload=k}}),window.validateSettingsInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusSettingsInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurSettingsInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))}),window.goToUser=(()=>E.go("/user/"));window.currentPosition=5,window.paginate=(e=>{l.doPost("/score",{position:e,count:5}).then(e=>E.viewUpdate(e)),window.currentPosition+=5}),E.addUrl("/login/",new class extends S{render(){return'<div class="page">\n                        <Header>Login</Header>\n                        <div class="form-block login">\n                            <Form>\n                                <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                                label-text="Enter login:" type="text" placeholder="Enter login"\n                                focus="() { validateFocusLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[0]) }"\n                                blur="() { validateBlurLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[0]) }">\n                                </Input>\n                                <Input block-class="user-password"  error-class="hidden" error-text="empty password"\n                                label-text="Password:" type="password" placeholder="Enter password"\n                                focus="() { validateFocusLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[1]) }"\n                                blur="() { validateBlurLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[1]) }">\n                                </Input>\n                                <div class="button-container">\n                                    <Button class="button large" click="() {validateLogin();}">Log In!</Button>\n                                    <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>\n                                </div>\n                            </Form>\n                        </div>\n                    </div>\n                    <Footer>Made by Tarados Feroces</Footer>'}needAuthorization(){return!1}}).addUrl("/",new class extends S{render(){return'<div class="menu">\n                    <Header>Menu</Header>\n                    <div class="points">\n                        <ul>\n                            <MenuPoint click="(event) {event.preventDefault(); goToSignUp();}">SignUp</MenuPoint>\n                            <MenuPoint click="(event) {event.preventDefault(); goToLogin();}">SignIn</MenuPoint>\n                        </ul>\n                    </div>\n                </div>'}needAuthorization(){return!1}}).addUrl("/signup/",new class extends S{render(){return'<div class="page">\n                    <Header>Sign Up!</Header>\n                    <div class="form-block registration">\n                        <Form>\n                            <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                            label-text="Login:" type="text" placeholder="Enter login"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[0]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[0]) }">\n                            </Input>\n                            <Input block-class="user-email" error-class="hidden" error-text="empty email"\n                            label-text="E-mail:" type="text" placeholder="Enter E-mail"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[1]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[1]) }">\n                            </Input>\n                            <Input block-class="user-password" error-class="hidden" error-text="empty password"\n                            label-text="Password:" type="password" placeholder="Enter password"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[2]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[2]) }">\n                            </Input>\n                            <Input block-class="user-repeat-password" error-class="hidden" error-text="empty password"\n                            label-text="Repeat password:" type="password" placeholder="Enter password"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[3]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[3]) }">\n                            </Input>\n                            <div class="button-container">\n                                <Button class="button large" click="(){ validateRegistration(); }">Sign Up!</Button>\n                                <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>\n                            </div>\n                        </Form>\n                    </div>\n                </div>\n                <Footer>Made by Tarados Feroces</Footer>;'}needAuthorization(){return!1}}).addUrl("/user/",new class extends S{preRender(){return l.doGet("/me").then(e=>{this.context=e})}render(){return'<div class="page">\n                    <Header>Hello, {{login}}</Header>\n                    {{#if avatar}}\n                        <Image class="main-avatar" src="{{{avatar}}}"></Image>\n                    {{else}}\n                        <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>\n                    {{/if}}    \n                    <div class="button-container">\n                        <Button class="button large" click="(event){ event.preventDefault(); goToSettings();  }">Settings</Button>\n                        <Button class="button large" click="(event){ event.preventDefault(); goToScore();  }">Leaderboard</Button>\n                        <Button class="button large" click="(event){ event.preventDefault(); signOut();  }">Sign out</Button>\n                    </div>\n                </div>'}}).addUrl(/leaderboard/,new class extends S{update(e={}){for(const t in Object.keys(e.data)){const n=[];n.push(e.data[t].login),n.push(e.data[t].points),this.context.rows.push(n)}}preRender(){return l.doPost("/score",{position:0,count:5}).then(e=>{this.context.rows=[],this.context.headers=["Login","Points"];for(const t in Object.keys(e.data)){const n=[];n.push(e.data[t].login),n.push(e.data[t].points),this.context.rows.push(n)}})}render(){return'<div class="leaderboard">\n                        <Header>Leaderboard</Header>\n                        <div class="table">\n                            <div class="table-row">\n                                {{#each headers}}\n                                <div class="table-data table-header">{{this}}</div>\n                                {{/each}}\n                            </div>\n                            {{#each rows}}\n                            <div class="table-row">\n                            {{#each this}}  \n                                <div class="table-data">\n                                {{this}}\n                                </div>\n                            {{/each}}\n                            </div>\n                            {{/each}}\n                        </div>\n                </div>\n                <div class="button-container">\n                    <Button class="button large" click="(event){ paginate(currentPosition) }">More</Button>\n                    <Button class="button large" click="(event){ event.preventDefault(); goBack(); }">Back</Button>\n                </div>\n                <Footer>Made by Tarados Feroces</Footer>'}}).addUrl(/settings/,new class extends S{preRender(){return l.doGet("/me").then(e=>{this.context=e})}render(){return'<div class="page">\n                    <Header>Settings</Header>\n                    <div class="form-block settings">\n                        {{#if avatar}}\n                            <Image class="main-avatar" src="{{{avatar}}}"></Image>\n                        {{else}}\n                            <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>\n                        {{/if}} \n                        <Form>\n                            <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                            label-text="Login:" type="text" value="{{login}}"\n                            focus="() { validateFocusSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[0]) }"\n                            blur="() { validateBlurSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[0]) }">\n                            </Input>\n                            <Input block-class="user-email" error-class="hidden" error-text="empty email"\n                            label-text="Email:" type="text" value="{{email}}"\n                            focus="() { validateFocusSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[1]) }"\n                            blur="() { validateBlurSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[1]) }">\n                            </Input>\n                            <Input error-class="hidden"\n                            label-text="Avatar:" type="file">\n                            </Input>\n                            <div class="button-container">\n                                <Button class="button large" click="(){ validateSettings(); }">Save</Button>\n                                <Button class="button large" click="(event){ event.preventDefault(); goToUser();  }">Back</Button>\n                            </div>\n                        </Form>\n                    </div>\n                </div>'}}),void 0===x.isAuthorized?x.checkSession().then(e=>E.go(document.location.pathname),e=>E.go(document.location.pathname)):E.go(document.location.pathname)}]);
//# sourceMappingURL=bundle.js.map