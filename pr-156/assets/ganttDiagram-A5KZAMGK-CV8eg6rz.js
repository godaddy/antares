import{g as ve,s as xe,t as Te,q as be,a as we,b as _e,_ as c,c as lt,d as pt,e as De,aK as G,l as st,k as Se,j as Ce,A as Me,u as Ee}from"./mermaid.core-jbT5GpgN.js";import{g as Et}from"./iframe-nLyyj1q5.js";import{t as Ie,a as Ut,m as Zt}from"./time-LX-g_rfp.js";import{l as Ae}from"./linear-PAdLsb0K.js";import{A as $e,l as Qt,k as Fe,B as Ye,C as Le,y as Oe,D as We,E as Pe,x as Ve,j as Kt,i as Jt,h as te,s as ee}from"./year-Cm1sU_Jw.js";import"./preload-helper-PPVm8Dsz.js";import"./string-BVYZ4x68.js";import"./line-BwNS3LRv.js";import"./index-DrFu-skq.js";import"./init-Gi6I4Gst.js";import"./defaultLocale-C4B-KCzX.js";function Re(t,n){let i;if(n===void 0)for(const r of t)r!=null&&(i<r||i===void 0&&r>=r)&&(i=r);else{let r=-1;for(let a of t)(a=n(a,++r,t))!=null&&(i<a||i===void 0&&a>=a)&&(i=a)}return i}function ze(t,n){let i;if(n===void 0)for(const r of t)r!=null&&(i>r||i===void 0&&r>=r)&&(i=r);else{let r=-1;for(let a of t)(a=n(a,++r,t))!=null&&(i>a||i===void 0&&a>=a)&&(i=a)}return i}function Ne(t){return t}var xt=1,At=2,Ft=3,vt=4,re=1e-6;function He(t){return"translate("+t+",0)"}function Be(t){return"translate(0,"+t+")"}function qe(t){return n=>+t(n)}function je(t,n){return n=Math.max(0,t.bandwidth()-n*2)/2,t.round()&&(n=Math.round(n)),i=>+t(i)+n}function Ge(){return!this.__axis}function ue(t,n){var i=[],r=null,a=null,m=6,h=6,b=3,E=typeof window<"u"&&window.devicePixelRatio>1?0:.5,$=t===xt||t===vt?-1:1,T=t===vt||t===At?"x":"y",L=t===xt||t===Ft?He:Be;function C(D){var z=r??(n.ticks?n.ticks.apply(n,i):n.domain()),I=a??(n.tickFormat?n.tickFormat.apply(n,i):Ne),S=Math.max(m,0)+b,M=n.range(),W=+M[0]+E,Y=+M[M.length-1]+E,N=(n.bandwidth?je:qe)(n.copy(),E),H=D.selection?D.selection():D,A=H.selectAll(".domain").data([null]),p=H.selectAll(".tick").data(z,n).order(),d=p.exit(),u=p.enter().append("g").attr("class","tick"),x=p.select("line"),v=p.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),p=p.merge(u),x=x.merge(u.append("line").attr("stroke","currentColor").attr(T+"2",$*m)),v=v.merge(u.append("text").attr("fill","currentColor").attr(T,$*S).attr("dy",t===xt?"0em":t===Ft?"0.71em":"0.32em")),D!==H&&(A=A.transition(D),p=p.transition(D),x=x.transition(D),v=v.transition(D),d=d.transition(D).attr("opacity",re).attr("transform",function(k){return isFinite(k=N(k))?L(k+E):this.getAttribute("transform")}),u.attr("opacity",re).attr("transform",function(k){var f=this.parentNode.__axis;return L((f&&isFinite(f=f(k))?f:N(k))+E)})),d.remove(),A.attr("d",t===vt||t===At?h?"M"+$*h+","+W+"H"+E+"V"+Y+"H"+$*h:"M"+E+","+W+"V"+Y:h?"M"+W+","+$*h+"V"+E+"H"+Y+"V"+$*h:"M"+W+","+E+"H"+Y),p.attr("opacity",1).attr("transform",function(k){return L(N(k)+E)}),x.attr(T+"2",$*m),v.attr(T,$*S).text(I),H.filter(Ge).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===At?"start":t===vt?"end":"middle"),H.each(function(){this.__axis=N})}return C.scale=function(D){return arguments.length?(n=D,C):n},C.ticks=function(){return i=Array.from(arguments),C},C.tickArguments=function(D){return arguments.length?(i=D==null?[]:Array.from(D),C):i.slice()},C.tickValues=function(D){return arguments.length?(r=D==null?null:Array.from(D),C):r&&r.slice()},C.tickFormat=function(D){return arguments.length?(a=D,C):a},C.tickSize=function(D){return arguments.length?(m=h=+D,C):m},C.tickSizeInner=function(D){return arguments.length?(m=+D,C):m},C.tickSizeOuter=function(D){return arguments.length?(h=+D,C):h},C.tickPadding=function(D){return arguments.length?(b=+D,C):b},C.offset=function(D){return arguments.length?(E=+D,C):E},C}function Xe(t){return ue(xt,t)}function Ue(t){return ue(Ft,t)}var Tt={exports:{}},Ze=Tt.exports,ie;function Qe(){return ie||(ie=1,(function(t,n){(function(i,r){t.exports=r()})(Ze,(function(){var i="day";return function(r,a,m){var h=function($){return $.add(4-$.isoWeekday(),i)},b=a.prototype;b.isoWeekYear=function(){return h(this).year()},b.isoWeek=function($){if(!this.$utils().u($))return this.add(7*($-this.isoWeek()),i);var T,L,C,D,z=h(this),I=(T=this.isoWeekYear(),L=this.$u,C=(L?m.utc:m)().year(T).startOf("year"),D=4-C.isoWeekday(),C.isoWeekday()>4&&(D+=7),C.add(D,i));return z.diff(I,"week")+1},b.isoWeekday=function($){return this.$utils().u($)?this.day()||7:this.day(this.day()%7?$:$-7)};var E=b.startOf;b.startOf=function($,T){var L=this.$utils(),C=!!L.u(T)||T;return L.p($)==="isoweek"?C?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):E.bind(this)($,T)}}}))})(Tt)),Tt.exports}var Ke=Qe();const Je=Et(Ke);var bt={exports:{}},tr=bt.exports,ne;function er(){return ne||(ne=1,(function(t,n){(function(i,r){t.exports=r()})(tr,(function(){var i={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},r=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d/,m=/\d\d/,h=/\d\d?/,b=/\d*[^-_:/,()\s\d]+/,E={},$=function(S){return(S=+S)+(S>68?1900:2e3)},T=function(S){return function(M){this[S]=+M}},L=[/[+-]\d\d:?(\d\d)?|Z/,function(S){(this.zone||(this.zone={})).offset=(function(M){if(!M||M==="Z")return 0;var W=M.match(/([+-]|\d\d)/g),Y=60*W[1]+(+W[2]||0);return Y===0?0:W[0]==="+"?-Y:Y})(S)}],C=function(S){var M=E[S];return M&&(M.indexOf?M:M.s.concat(M.f))},D=function(S,M){var W,Y=E.meridiem;if(Y){for(var N=1;N<=24;N+=1)if(S.indexOf(Y(N,0,M))>-1){W=N>12;break}}else W=S===(M?"pm":"PM");return W},z={A:[b,function(S){this.afternoon=D(S,!1)}],a:[b,function(S){this.afternoon=D(S,!0)}],Q:[a,function(S){this.month=3*(S-1)+1}],S:[a,function(S){this.milliseconds=100*+S}],SS:[m,function(S){this.milliseconds=10*+S}],SSS:[/\d{3}/,function(S){this.milliseconds=+S}],s:[h,T("seconds")],ss:[h,T("seconds")],m:[h,T("minutes")],mm:[h,T("minutes")],H:[h,T("hours")],h:[h,T("hours")],HH:[h,T("hours")],hh:[h,T("hours")],D:[h,T("day")],DD:[m,T("day")],Do:[b,function(S){var M=E.ordinal,W=S.match(/\d+/);if(this.day=W[0],M)for(var Y=1;Y<=31;Y+=1)M(Y).replace(/\[|\]/g,"")===S&&(this.day=Y)}],w:[h,T("week")],ww:[m,T("week")],M:[h,T("month")],MM:[m,T("month")],MMM:[b,function(S){var M=C("months"),W=(C("monthsShort")||M.map((function(Y){return Y.slice(0,3)}))).indexOf(S)+1;if(W<1)throw new Error;this.month=W%12||W}],MMMM:[b,function(S){var M=C("months").indexOf(S)+1;if(M<1)throw new Error;this.month=M%12||M}],Y:[/[+-]?\d+/,T("year")],YY:[m,function(S){this.year=$(S)}],YYYY:[/\d{4}/,T("year")],Z:L,ZZ:L};function I(S){var M,W;M=S,W=E&&E.formats;for(var Y=(S=M.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(x,v,k){var f=k&&k.toUpperCase();return v||W[k]||i[k]||W[f].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(o,l,y){return l||y.slice(1)}))}))).match(r),N=Y.length,H=0;H<N;H+=1){var A=Y[H],p=z[A],d=p&&p[0],u=p&&p[1];Y[H]=u?{regex:d,parser:u}:A.replace(/^\[|\]$/g,"")}return function(x){for(var v={},k=0,f=0;k<N;k+=1){var o=Y[k];if(typeof o=="string")f+=o.length;else{var l=o.regex,y=o.parser,g=x.slice(f),w=l.exec(g)[0];y.call(v,w),x=x.replace(w,"")}}return(function(s){var R=s.afternoon;if(R!==void 0){var e=s.hours;R?e<12&&(s.hours+=12):e===12&&(s.hours=0),delete s.afternoon}})(v),v}}return function(S,M,W){W.p.customParseFormat=!0,S&&S.parseTwoDigitYear&&($=S.parseTwoDigitYear);var Y=M.prototype,N=Y.parse;Y.parse=function(H){var A=H.date,p=H.utc,d=H.args;this.$u=p;var u=d[1];if(typeof u=="string"){var x=d[2]===!0,v=d[3]===!0,k=x||v,f=d[2];v&&(f=d[2]),E=this.$locale(),!x&&f&&(E=W.Ls[f]),this.$d=(function(g,w,s,R){try{if(["x","X"].indexOf(w)>-1)return new Date((w==="X"?1e3:1)*g);var e=I(w)(g),_=e.year,V=e.month,P=e.day,O=e.hours,j=e.minutes,F=e.seconds,Q=e.milliseconds,rt=e.zone,ot=e.week,ft=new Date,ht=P||(_||V?1:ft.getDate()),ct=_||ft.getFullYear(),B=0;_&&!V||(B=V>0?V-1:ft.getMonth());var Z,X=O||0,nt=j||0,K=F||0,it=Q||0;return rt?new Date(Date.UTC(ct,B,ht,X,nt,K,it+60*rt.offset*1e3)):s?new Date(Date.UTC(ct,B,ht,X,nt,K,it)):(Z=new Date(ct,B,ht,X,nt,K,it),ot&&(Z=R(Z).week(ot).toDate()),Z)}catch{return new Date("")}})(A,u,p,W),this.init(),f&&f!==!0&&(this.$L=this.locale(f).$L),k&&A!=this.format(u)&&(this.$d=new Date("")),E={}}else if(u instanceof Array)for(var o=u.length,l=1;l<=o;l+=1){d[1]=u[l-1];var y=W.apply(this,d);if(y.isValid()){this.$d=y.$d,this.$L=y.$L,this.init();break}l===o&&(this.$d=new Date(""))}else N.call(this,H)}}}))})(bt)),bt.exports}var rr=er();const ir=Et(rr);var wt={exports:{}},nr=wt.exports,se;function sr(){return se||(se=1,(function(t,n){(function(i,r){t.exports=r()})(nr,(function(){return function(i,r){var a=r.prototype,m=a.format;a.format=function(h){var b=this,E=this.$locale();if(!this.isValid())return m.bind(this)(h);var $=this.$utils(),T=(h||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(L){switch(L){case"Q":return Math.ceil((b.$M+1)/3);case"Do":return E.ordinal(b.$D);case"gggg":return b.weekYear();case"GGGG":return b.isoWeekYear();case"wo":return E.ordinal(b.week(),"W");case"w":case"ww":return $.s(b.week(),L==="w"?1:2,"0");case"W":case"WW":return $.s(b.isoWeek(),L==="W"?1:2,"0");case"k":case"kk":return $.s(String(b.$H===0?24:b.$H),L==="k"?1:2,"0");case"X":return Math.floor(b.$d.getTime()/1e3);case"x":return b.$d.getTime();case"z":return"["+b.offsetName()+"]";case"zzz":return"["+b.offsetName("long")+"]";default:return L}}));return m.bind(this)(T)}}}))})(wt)),wt.exports}var ar=sr();const or=Et(ar);var _t={exports:{}},cr=_t.exports,ae;function lr(){return ae||(ae=1,(function(t,n){(function(i,r){t.exports=r()})(cr,(function(){var i,r,a=1e3,m=6e4,h=36e5,b=864e5,E=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$=31536e6,T=2628e6,L=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,C={years:$,months:T,days:b,hours:h,minutes:m,seconds:a,milliseconds:1,weeks:6048e5},D=function(A){return A instanceof N},z=function(A,p,d){return new N(A,d,p.$l)},I=function(A){return r.p(A)+"s"},S=function(A){return A<0},M=function(A){return S(A)?Math.ceil(A):Math.floor(A)},W=function(A){return Math.abs(A)},Y=function(A,p){return A?S(A)?{negative:!0,format:""+W(A)+p}:{negative:!1,format:""+A+p}:{negative:!1,format:""}},N=(function(){function A(d,u,x){var v=this;if(this.$d={},this.$l=x,d===void 0&&(this.$ms=0,this.parseFromMilliseconds()),u)return z(d*C[I(u)],this);if(typeof d=="number")return this.$ms=d,this.parseFromMilliseconds(),this;if(typeof d=="object")return Object.keys(d).forEach((function(o){v.$d[I(o)]=d[o]})),this.calMilliseconds(),this;if(typeof d=="string"){var k=d.match(L);if(k){var f=k.slice(2).map((function(o){return o!=null?Number(o):0}));return this.$d.years=f[0],this.$d.months=f[1],this.$d.weeks=f[2],this.$d.days=f[3],this.$d.hours=f[4],this.$d.minutes=f[5],this.$d.seconds=f[6],this.calMilliseconds(),this}}return this}var p=A.prototype;return p.calMilliseconds=function(){var d=this;this.$ms=Object.keys(this.$d).reduce((function(u,x){return u+(d.$d[x]||0)*C[x]}),0)},p.parseFromMilliseconds=function(){var d=this.$ms;this.$d.years=M(d/$),d%=$,this.$d.months=M(d/T),d%=T,this.$d.days=M(d/b),d%=b,this.$d.hours=M(d/h),d%=h,this.$d.minutes=M(d/m),d%=m,this.$d.seconds=M(d/a),d%=a,this.$d.milliseconds=d},p.toISOString=function(){var d=Y(this.$d.years,"Y"),u=Y(this.$d.months,"M"),x=+this.$d.days||0;this.$d.weeks&&(x+=7*this.$d.weeks);var v=Y(x,"D"),k=Y(this.$d.hours,"H"),f=Y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3,o=Math.round(1e3*o)/1e3);var l=Y(o,"S"),y=d.negative||u.negative||v.negative||k.negative||f.negative||l.negative,g=k.format||f.format||l.format?"T":"",w=(y?"-":"")+"P"+d.format+u.format+v.format+g+k.format+f.format+l.format;return w==="P"||w==="-P"?"P0D":w},p.toJSON=function(){return this.toISOString()},p.format=function(d){var u=d||"YYYY-MM-DDTHH:mm:ss",x={Y:this.$d.years,YY:r.s(this.$d.years,2,"0"),YYYY:r.s(this.$d.years,4,"0"),M:this.$d.months,MM:r.s(this.$d.months,2,"0"),D:this.$d.days,DD:r.s(this.$d.days,2,"0"),H:this.$d.hours,HH:r.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:r.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:r.s(this.$d.seconds,2,"0"),SSS:r.s(this.$d.milliseconds,3,"0")};return u.replace(E,(function(v,k){return k||String(x[v])}))},p.as=function(d){return this.$ms/C[I(d)]},p.get=function(d){var u=this.$ms,x=I(d);return x==="milliseconds"?u%=1e3:u=x==="weeks"?M(u/C[x]):this.$d[x],u||0},p.add=function(d,u,x){var v;return v=u?d*C[I(u)]:D(d)?d.$ms:z(d,this).$ms,z(this.$ms+v*(x?-1:1),this)},p.subtract=function(d,u){return this.add(d,u,!0)},p.locale=function(d){var u=this.clone();return u.$l=d,u},p.clone=function(){return z(this.$ms,this)},p.humanize=function(d){return i().add(this.$ms,"ms").locale(this.$l).fromNow(!d)},p.valueOf=function(){return this.asMilliseconds()},p.milliseconds=function(){return this.get("milliseconds")},p.asMilliseconds=function(){return this.as("milliseconds")},p.seconds=function(){return this.get("seconds")},p.asSeconds=function(){return this.as("seconds")},p.minutes=function(){return this.get("minutes")},p.asMinutes=function(){return this.as("minutes")},p.hours=function(){return this.get("hours")},p.asHours=function(){return this.as("hours")},p.days=function(){return this.get("days")},p.asDays=function(){return this.as("days")},p.weeks=function(){return this.get("weeks")},p.asWeeks=function(){return this.as("weeks")},p.months=function(){return this.get("months")},p.asMonths=function(){return this.as("months")},p.years=function(){return this.get("years")},p.asYears=function(){return this.as("years")},A})(),H=function(A,p,d){return A.add(p.years()*d,"y").add(p.months()*d,"M").add(p.days()*d,"d").add(p.hours()*d,"h").add(p.minutes()*d,"m").add(p.seconds()*d,"s").add(p.milliseconds()*d,"ms")};return function(A,p,d){i=d,r=d().$utils(),d.duration=function(v,k){var f=d.locale();return z(v,{$l:f},k)},d.isDuration=D;var u=p.prototype.add,x=p.prototype.subtract;p.prototype.add=function(v,k){return D(v)?H(this,v,1):u.bind(this)(v,k)},p.prototype.subtract=function(v,k){return D(v)?H(this,v,-1):x.bind(this)(v,k)}}}))})(_t)),_t.exports}var ur=lr();const dr=Et(ur);var Yt=(function(){var t=c(function(f,o,l,y){for(l=l||{},y=f.length;y--;l[f[y]]=o);return l},"o"),n=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],r=[1,27],a=[1,28],m=[1,29],h=[1,30],b=[1,31],E=[1,32],$=[1,33],T=[1,34],L=[1,9],C=[1,10],D=[1,11],z=[1,12],I=[1,13],S=[1,14],M=[1,15],W=[1,16],Y=[1,19],N=[1,20],H=[1,21],A=[1,22],p=[1,23],d=[1,25],u=[1,35],x={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(o,l,y,g,w,s,R){var e=s.length-1;switch(w){case 1:return s[e-1];case 2:this.$=[];break;case 3:s[e-1].push(s[e]),this.$=s[e-1];break;case 4:case 5:this.$=s[e];break;case 6:case 7:this.$=[];break;case 8:g.setWeekday("monday");break;case 9:g.setWeekday("tuesday");break;case 10:g.setWeekday("wednesday");break;case 11:g.setWeekday("thursday");break;case 12:g.setWeekday("friday");break;case 13:g.setWeekday("saturday");break;case 14:g.setWeekday("sunday");break;case 15:g.setWeekend("friday");break;case 16:g.setWeekend("saturday");break;case 17:g.setDateFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 18:g.enableInclusiveEndDates(),this.$=s[e].substr(18);break;case 19:g.TopAxis(),this.$=s[e].substr(8);break;case 20:g.setAxisFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 21:g.setTickInterval(s[e].substr(13)),this.$=s[e].substr(13);break;case 22:g.setExcludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 23:g.setIncludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 24:g.setTodayMarker(s[e].substr(12)),this.$=s[e].substr(12);break;case 27:g.setDiagramTitle(s[e].substr(6)),this.$=s[e].substr(6);break;case 28:this.$=s[e].trim(),g.setAccTitle(this.$);break;case 29:case 30:this.$=s[e].trim(),g.setAccDescription(this.$);break;case 31:g.addSection(s[e].substr(8)),this.$=s[e].substr(8);break;case 33:g.addTask(s[e-1],s[e]),this.$="task";break;case 34:this.$=s[e-1],g.setClickEvent(s[e-1],s[e],null);break;case 35:this.$=s[e-2],g.setClickEvent(s[e-2],s[e-1],s[e]);break;case 36:this.$=s[e-2],g.setClickEvent(s[e-2],s[e-1],null),g.setLink(s[e-2],s[e]);break;case 37:this.$=s[e-3],g.setClickEvent(s[e-3],s[e-2],s[e-1]),g.setLink(s[e-3],s[e]);break;case 38:this.$=s[e-2],g.setClickEvent(s[e-2],s[e],null),g.setLink(s[e-2],s[e-1]);break;case 39:this.$=s[e-3],g.setClickEvent(s[e-3],s[e-1],s[e]),g.setLink(s[e-3],s[e-2]);break;case 40:this.$=s[e-1],g.setLink(s[e-1],s[e]);break;case 41:case 47:this.$=s[e-1]+" "+s[e];break;case 42:case 43:case 45:this.$=s[e-2]+" "+s[e-1]+" "+s[e];break;case 44:case 46:this.$=s[e-3]+" "+s[e-2]+" "+s[e-1]+" "+s[e];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(n,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:r,14:a,15:m,16:h,17:b,18:E,19:18,20:$,21:T,22:L,23:C,24:D,25:z,26:I,27:S,28:M,29:W,30:Y,31:N,33:H,35:A,36:p,37:24,38:d,40:u},t(n,[2,7],{1:[2,1]}),t(n,[2,3]),{9:36,11:17,12:i,13:r,14:a,15:m,16:h,17:b,18:E,19:18,20:$,21:T,22:L,23:C,24:D,25:z,26:I,27:S,28:M,29:W,30:Y,31:N,33:H,35:A,36:p,37:24,38:d,40:u},t(n,[2,5]),t(n,[2,6]),t(n,[2,17]),t(n,[2,18]),t(n,[2,19]),t(n,[2,20]),t(n,[2,21]),t(n,[2,22]),t(n,[2,23]),t(n,[2,24]),t(n,[2,25]),t(n,[2,26]),t(n,[2,27]),{32:[1,37]},{34:[1,38]},t(n,[2,30]),t(n,[2,31]),t(n,[2,32]),{39:[1,39]},t(n,[2,8]),t(n,[2,9]),t(n,[2,10]),t(n,[2,11]),t(n,[2,12]),t(n,[2,13]),t(n,[2,14]),t(n,[2,15]),t(n,[2,16]),{41:[1,40],43:[1,41]},t(n,[2,4]),t(n,[2,28]),t(n,[2,29]),t(n,[2,33]),t(n,[2,34],{42:[1,42],43:[1,43]}),t(n,[2,40],{41:[1,44]}),t(n,[2,35],{43:[1,45]}),t(n,[2,36]),t(n,[2,38],{42:[1,46]}),t(n,[2,37]),t(n,[2,39])],defaultActions:{},parseError:c(function(o,l){if(l.recoverable)this.trace(o);else{var y=new Error(o);throw y.hash=l,y}},"parseError"),parse:c(function(o){var l=this,y=[0],g=[],w=[null],s=[],R=this.table,e="",_=0,V=0,P=2,O=1,j=s.slice.call(arguments,1),F=Object.create(this.lexer),Q={yy:{}};for(var rt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,rt)&&(Q.yy[rt]=this.yy[rt]);F.setInput(o,Q.yy),Q.yy.lexer=F,Q.yy.parser=this,typeof F.yylloc>"u"&&(F.yylloc={});var ot=F.yylloc;s.push(ot);var ft=F.options&&F.options.ranges;typeof Q.yy.parseError=="function"?this.parseError=Q.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ht(U){y.length=y.length-2*U,w.length=w.length-U,s.length=s.length-U}c(ht,"popStack");function ct(){var U;return U=g.pop()||F.lex()||O,typeof U!="number"&&(U instanceof Array&&(g=U,U=g.pop()),U=l.symbols_[U]||U),U}c(ct,"lex");for(var B,Z,X,nt,K={},it,J,Xt,gt;;){if(Z=y[y.length-1],this.defaultActions[Z]?X=this.defaultActions[Z]:((B===null||typeof B>"u")&&(B=ct()),X=R[Z]&&R[Z][B]),typeof X>"u"||!X.length||!X[0]){var It="";gt=[];for(it in R[Z])this.terminals_[it]&&it>P&&gt.push("'"+this.terminals_[it]+"'");F.showPosition?It="Parse error on line "+(_+1)+`:
`+F.showPosition()+`
Expecting `+gt.join(", ")+", got '"+(this.terminals_[B]||B)+"'":It="Parse error on line "+(_+1)+": Unexpected "+(B==O?"end of input":"'"+(this.terminals_[B]||B)+"'"),this.parseError(It,{text:F.match,token:this.terminals_[B]||B,line:F.yylineno,loc:ot,expected:gt})}if(X[0]instanceof Array&&X.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Z+", token: "+B);switch(X[0]){case 1:y.push(B),w.push(F.yytext),s.push(F.yylloc),y.push(X[1]),B=null,V=F.yyleng,e=F.yytext,_=F.yylineno,ot=F.yylloc;break;case 2:if(J=this.productions_[X[1]][1],K.$=w[w.length-J],K._$={first_line:s[s.length-(J||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(J||1)].first_column,last_column:s[s.length-1].last_column},ft&&(K._$.range=[s[s.length-(J||1)].range[0],s[s.length-1].range[1]]),nt=this.performAction.apply(K,[e,V,_,Q.yy,X[1],w,s].concat(j)),typeof nt<"u")return nt;J&&(y=y.slice(0,-1*J*2),w=w.slice(0,-1*J),s=s.slice(0,-1*J)),y.push(this.productions_[X[1]][0]),w.push(K.$),s.push(K._$),Xt=R[y[y.length-2]][y[y.length-1]],y.push(Xt);break;case 3:return!0}}return!0},"parse")},v=(function(){var f={EOF:1,parseError:c(function(l,y){if(this.yy.parser)this.yy.parser.parseError(l,y);else throw new Error(l)},"parseError"),setInput:c(function(o,l){return this.yy=l||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var l=o.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:c(function(o){var l=o.length,y=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var w=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===g.length?this.yylloc.first_column:0)+g[g.length-y.length].length-y[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[w[0],w[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(o){this.unput(this.match.slice(o))},"less"),pastInput:c(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var o=this.pastInput(),l=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:c(function(o,l){var y,g,w;if(this.options.backtrack_lexer&&(w={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(w.yylloc.range=this.yylloc.range.slice(0))),g=o[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],y=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var s in w)this[s]=w[s];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,l,y,g;this._more||(this.yytext="",this.match="");for(var w=this._currentRules(),s=0;s<w.length;s++)if(y=this._input.match(this.rules[w[s]]),y&&(!l||y[0].length>l[0].length)){if(l=y,g=s,this.options.backtrack_lexer){if(o=this.test_match(y,w[s]),o!==!1)return o;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(o=this.test_match(l,w[g]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var l=this.next();return l||this.lex()},"lex"),begin:c(function(l){this.conditionStack.push(l)},"begin"),popState:c(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:c(function(l){this.begin(l)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(l,y,g,w){switch(g){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return f})();x.lexer=v;function k(){this.yy={}}return c(k,"Parser"),k.prototype=x,x.Parser=k,new k})();Yt.parser=Yt;var fr=Yt;G.extend(Je);G.extend(ir);G.extend(or);var oe={friday:5,saturday:6},tt="",Pt="",Vt=void 0,Rt="",mt=[],kt=[],zt=new Map,Nt=[],Ct=[],dt="",Ht="",de=["active","done","crit","milestone","vert"],Bt=[],yt=!1,qt=!1,jt="sunday",Mt="saturday",Lt=0,hr=c(function(){Nt=[],Ct=[],dt="",Bt=[],Dt=0,Wt=void 0,St=void 0,q=[],tt="",Pt="",Ht="",Vt=void 0,Rt="",mt=[],kt=[],yt=!1,qt=!1,Lt=0,zt=new Map,Me(),jt="sunday",Mt="saturday"},"clear"),mr=c(function(t){Pt=t},"setAxisFormat"),kr=c(function(){return Pt},"getAxisFormat"),yr=c(function(t){Vt=t},"setTickInterval"),gr=c(function(){return Vt},"getTickInterval"),pr=c(function(t){Rt=t},"setTodayMarker"),vr=c(function(){return Rt},"getTodayMarker"),xr=c(function(t){tt=t},"setDateFormat"),Tr=c(function(){yt=!0},"enableInclusiveEndDates"),br=c(function(){return yt},"endDatesAreInclusive"),wr=c(function(){qt=!0},"enableTopAxis"),_r=c(function(){return qt},"topAxisEnabled"),Dr=c(function(t){Ht=t},"setDisplayMode"),Sr=c(function(){return Ht},"getDisplayMode"),Cr=c(function(){return tt},"getDateFormat"),Mr=c(function(t){mt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Er=c(function(){return mt},"getIncludes"),Ir=c(function(t){kt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),Ar=c(function(){return kt},"getExcludes"),$r=c(function(){return zt},"getLinks"),Fr=c(function(t){dt=t,Nt.push(t)},"addSection"),Yr=c(function(){return Nt},"getSections"),Lr=c(function(){let t=ce();const n=10;let i=0;for(;!t&&i<n;)t=ce(),i++;return Ct=q,Ct},"getTasks"),fe=c(function(t,n,i,r){const a=t.format(n.trim()),m=t.format("YYYY-MM-DD");return r.includes(a)||r.includes(m)?!1:i.includes("weekends")&&(t.isoWeekday()===oe[Mt]||t.isoWeekday()===oe[Mt]+1)||i.includes(t.format("dddd").toLowerCase())?!0:i.includes(a)||i.includes(m)},"isInvalidDate"),Or=c(function(t){jt=t},"setWeekday"),Wr=c(function(){return jt},"getWeekday"),Pr=c(function(t){Mt=t},"setWeekend"),he=c(function(t,n,i,r){if(!i.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=G(t.startTime):a=G(t.startTime,n,!0),a=a.add(1,"d");let m;t.endTime instanceof Date?m=G(t.endTime):m=G(t.endTime,n,!0);const[h,b]=Vr(a,m,n,i,r);t.endTime=h.toDate(),t.renderEndTime=b},"checkTaskDates"),Vr=c(function(t,n,i,r,a){let m=!1,h=null;for(;t<=n;)m||(h=n.toDate()),m=fe(t,i,r,a),m&&(n=n.add(1,"d")),t=t.add(1,"d");return[n,h]},"fixTaskDates"),Ot=c(function(t,n,i){if(i=i.trim(),c(b=>{const E=b.trim();return E==="x"||E==="X"},"isTimestampFormat")(n)&&/^\d+$/.test(i))return new Date(Number(i));const m=/^after\s+(?<ids>[\d\w- ]+)/.exec(i);if(m!==null){let b=null;for(const $ of m.groups.ids.split(" ")){let T=at($);T!==void 0&&(!b||T.endTime>b.endTime)&&(b=T)}if(b)return b.endTime;const E=new Date;return E.setHours(0,0,0,0),E}let h=G(i,n.trim(),!0);if(h.isValid())return h.toDate();{st.debug("Invalid date:"+i),st.debug("With date format:"+n.trim());const b=new Date(i);if(b===void 0||isNaN(b.getTime())||b.getFullYear()<-1e4||b.getFullYear()>1e4)throw new Error("Invalid date:"+i);return b}},"getStartDate"),me=c(function(t){const n=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return n!==null?[Number.parseFloat(n[1]),n[2]]:[NaN,"ms"]},"parseDuration"),ke=c(function(t,n,i,r=!1){i=i.trim();const m=/^until\s+(?<ids>[\d\w- ]+)/.exec(i);if(m!==null){let T=null;for(const C of m.groups.ids.split(" ")){let D=at(C);D!==void 0&&(!T||D.startTime<T.startTime)&&(T=D)}if(T)return T.startTime;const L=new Date;return L.setHours(0,0,0,0),L}let h=G(i,n.trim(),!0);if(h.isValid())return r&&(h=h.add(1,"d")),h.toDate();let b=G(t);const[E,$]=me(i);if(!Number.isNaN(E)){const T=b.add(E,$);T.isValid()&&(b=T)}return b.toDate()},"getEndDate"),Dt=0,ut=c(function(t){return t===void 0?(Dt=Dt+1,"task"+Dt):t},"parseId"),Rr=c(function(t,n){let i;n.substr(0,1)===":"?i=n.substr(1,n.length):i=n;const r=i.split(","),a={};Gt(r,a,de);for(let h=0;h<r.length;h++)r[h]=r[h].trim();let m="";switch(r.length){case 1:a.id=ut(),a.startTime=t.endTime,m=r[0];break;case 2:a.id=ut(),a.startTime=Ot(void 0,tt,r[0]),m=r[1];break;case 3:a.id=ut(r[0]),a.startTime=Ot(void 0,tt,r[1]),m=r[2];break}return m&&(a.endTime=ke(a.startTime,tt,m,yt),a.manualEndTime=G(m,"YYYY-MM-DD",!0).isValid(),he(a,tt,kt,mt)),a},"compileData"),zr=c(function(t,n){let i;n.substr(0,1)===":"?i=n.substr(1,n.length):i=n;const r=i.split(","),a={};Gt(r,a,de);for(let m=0;m<r.length;m++)r[m]=r[m].trim();switch(r.length){case 1:a.id=ut(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:r[0]};break;case 2:a.id=ut(),a.startTime={type:"getStartDate",startData:r[0]},a.endTime={data:r[1]};break;case 3:a.id=ut(r[0]),a.startTime={type:"getStartDate",startData:r[1]},a.endTime={data:r[2]};break}return a},"parseData"),Wt,St,q=[],ye={},Nr=c(function(t,n){const i={section:dt,type:dt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:n},task:t,classes:[]},r=zr(St,n);i.raw.startTime=r.startTime,i.raw.endTime=r.endTime,i.id=r.id,i.prevTaskId=St,i.active=r.active,i.done=r.done,i.crit=r.crit,i.milestone=r.milestone,i.vert=r.vert,i.order=Lt,Lt++;const a=q.push(i);St=i.id,ye[i.id]=a-1},"addTask"),at=c(function(t){const n=ye[t];return q[n]},"findTaskById"),Hr=c(function(t,n){const i={section:dt,type:dt,description:t,task:t,classes:[]},r=Rr(Wt,n);i.startTime=r.startTime,i.endTime=r.endTime,i.id=r.id,i.active=r.active,i.done=r.done,i.crit=r.crit,i.milestone=r.milestone,i.vert=r.vert,Wt=i,Ct.push(i)},"addTaskOrg"),ce=c(function(){const t=c(function(i){const r=q[i];let a="";switch(q[i].raw.startTime.type){case"prevTaskEnd":{const m=at(r.prevTaskId);r.startTime=m.endTime;break}case"getStartDate":a=Ot(void 0,tt,q[i].raw.startTime.startData),a&&(q[i].startTime=a);break}return q[i].startTime&&(q[i].endTime=ke(q[i].startTime,tt,q[i].raw.endTime.data,yt),q[i].endTime&&(q[i].processed=!0,q[i].manualEndTime=G(q[i].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),he(q[i],tt,kt,mt))),q[i].processed},"compileTask");let n=!0;for(const[i,r]of q.entries())t(i),n=n&&r.processed;return n},"compileTasks"),Br=c(function(t,n){let i=n;lt().securityLevel!=="loose"&&(i=Ce.sanitizeUrl(n)),t.split(",").forEach(function(r){at(r)!==void 0&&(pe(r,()=>{window.open(i,"_self")}),zt.set(r,i))}),ge(t,"clickable")},"setLink"),ge=c(function(t,n){t.split(",").forEach(function(i){let r=at(i);r!==void 0&&r.classes.push(n)})},"setClass"),qr=c(function(t,n,i){if(lt().securityLevel!=="loose"||n===void 0)return;let r=[];if(typeof i=="string"){r=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<r.length;m++){let h=r[m].trim();h.startsWith('"')&&h.endsWith('"')&&(h=h.substr(1,h.length-2)),r[m]=h}}r.length===0&&r.push(t),at(t)!==void 0&&pe(t,()=>{Ee.runFunc(n,...r)})},"setClickFun"),pe=c(function(t,n){Bt.push(function(){const i=document.querySelector(`[id="${t}"]`);i!==null&&i.addEventListener("click",function(){n()})},function(){const i=document.querySelector(`[id="${t}-text"]`);i!==null&&i.addEventListener("click",function(){n()})})},"pushFun"),jr=c(function(t,n,i){t.split(",").forEach(function(r){qr(r,n,i)}),ge(t,"clickable")},"setClickEvent"),Gr=c(function(t){Bt.forEach(function(n){n(t)})},"bindFunctions"),Xr={getConfig:c(()=>lt().gantt,"getConfig"),clear:hr,setDateFormat:xr,getDateFormat:Cr,enableInclusiveEndDates:Tr,endDatesAreInclusive:br,enableTopAxis:wr,topAxisEnabled:_r,setAxisFormat:mr,getAxisFormat:kr,setTickInterval:yr,getTickInterval:gr,setTodayMarker:pr,getTodayMarker:vr,setAccTitle:_e,getAccTitle:we,setDiagramTitle:be,getDiagramTitle:Te,setDisplayMode:Dr,getDisplayMode:Sr,setAccDescription:xe,getAccDescription:ve,addSection:Fr,getSections:Yr,getTasks:Lr,addTask:Nr,findTaskById:at,addTaskOrg:Hr,setIncludes:Mr,getIncludes:Er,setExcludes:Ir,getExcludes:Ar,setClickEvent:jr,setLink:Br,getLinks:$r,bindFunctions:Gr,parseDuration:me,isInvalidDate:fe,setWeekday:Or,getWeekday:Wr,setWeekend:Pr};function Gt(t,n,i){let r=!0;for(;r;)r=!1,i.forEach(function(a){const m="^\\s*"+a+"\\s*$",h=new RegExp(m);t[0].match(h)&&(n[a]=!0,t.shift(1),r=!0)})}c(Gt,"getTaskTags");G.extend(dr);var Ur=c(function(){st.debug("Something is calling, setConf, remove the call")},"setConf"),le={monday:Ve,tuesday:Pe,wednesday:We,thursday:Oe,friday:Le,saturday:Ye,sunday:Fe},Zr=c((t,n)=>{let i=[...t].map(()=>-1/0),r=[...t].sort((m,h)=>m.startTime-h.startTime||m.order-h.order),a=0;for(const m of r)for(let h=0;h<i.length;h++)if(m.startTime>=i[h]){i[h]=m.endTime,m.order=h+n,h>a&&(a=h);break}return a},"getMaxIntersections"),et,$t=1e4,Qr=c(function(t,n,i,r){const a=lt().gantt,m=lt().securityLevel;let h;m==="sandbox"&&(h=pt("#i"+n));const b=m==="sandbox"?pt(h.nodes()[0].contentDocument.body):pt("body"),E=m==="sandbox"?h.nodes()[0].contentDocument:document,$=E.getElementById(n);et=$.parentElement.offsetWidth,et===void 0&&(et=1200),a.useWidth!==void 0&&(et=a.useWidth);const T=r.db.getTasks();let L=[];for(const u of T)L.push(u.type);L=d(L);const C={};let D=2*a.topPadding;if(r.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const u={};for(const v of T)u[v.section]===void 0?u[v.section]=[v]:u[v.section].push(v);let x=0;for(const v of Object.keys(u)){const k=Zr(u[v],x)+1;x+=k,D+=k*(a.barHeight+a.barGap),C[v]=k}}else{D+=T.length*(a.barHeight+a.barGap);for(const u of L)C[u]=T.filter(x=>x.type===u).length}$.setAttribute("viewBox","0 0 "+et+" "+D);const z=b.select(`[id="${n}"]`),I=Ie().domain([ze(T,function(u){return u.startTime}),Re(T,function(u){return u.endTime})]).rangeRound([0,et-a.leftPadding-a.rightPadding]);function S(u,x){const v=u.startTime,k=x.startTime;let f=0;return v>k?f=1:v<k&&(f=-1),f}c(S,"taskCompare"),T.sort(S),M(T,et,D),De(z,D,et,a.useMaxWidth),z.append("text").text(r.db.getDiagramTitle()).attr("x",et/2).attr("y",a.titleTopMargin).attr("class","titleText");function M(u,x,v){const k=a.barHeight,f=k+a.barGap,o=a.topPadding,l=a.leftPadding,y=Ae().domain([0,L.length]).range(["#00B9FA","#F95002"]).interpolate($e);Y(f,o,l,x,v,u,r.db.getExcludes(),r.db.getIncludes()),H(l,o,x,v),W(u,f,o,l,k,y,x),A(f,o),p(l,o,x,v)}c(M,"makeGantt");function W(u,x,v,k,f,o,l){u.sort((e,_)=>e.vert===_.vert?0:e.vert?1:-1);const g=[...new Set(u.map(e=>e.order))].map(e=>u.find(_=>_.order===e));z.append("g").selectAll("rect").data(g).enter().append("rect").attr("x",0).attr("y",function(e,_){return _=e.order,_*x+v-2}).attr("width",function(){return l-a.rightPadding/2}).attr("height",x).attr("class",function(e){for(const[_,V]of L.entries())if(e.type===V)return"section section"+_%a.numberSectionStyles;return"section section0"}).enter();const w=z.append("g").selectAll("rect").data(u).enter(),s=r.db.getLinks();if(w.append("rect").attr("id",function(e){return e.id}).attr("rx",3).attr("ry",3).attr("x",function(e){return e.milestone?I(e.startTime)+k+.5*(I(e.endTime)-I(e.startTime))-.5*f:I(e.startTime)+k}).attr("y",function(e,_){return _=e.order,e.vert?a.gridLineStartPadding:_*x+v}).attr("width",function(e){return e.milestone?f:e.vert?.08*f:I(e.renderEndTime||e.endTime)-I(e.startTime)}).attr("height",function(e){return e.vert?T.length*(a.barHeight+a.barGap)+a.barHeight*2:f}).attr("transform-origin",function(e,_){return _=e.order,(I(e.startTime)+k+.5*(I(e.endTime)-I(e.startTime))).toString()+"px "+(_*x+v+.5*f).toString()+"px"}).attr("class",function(e){const _="task";let V="";e.classes.length>0&&(V=e.classes.join(" "));let P=0;for(const[j,F]of L.entries())e.type===F&&(P=j%a.numberSectionStyles);let O="";return e.active?e.crit?O+=" activeCrit":O=" active":e.done?e.crit?O=" doneCrit":O=" done":e.crit&&(O+=" crit"),O.length===0&&(O=" task"),e.milestone&&(O=" milestone "+O),e.vert&&(O=" vert "+O),O+=P,O+=" "+V,_+O}),w.append("text").attr("id",function(e){return e.id+"-text"}).text(function(e){return e.task}).attr("font-size",a.fontSize).attr("x",function(e){let _=I(e.startTime),V=I(e.renderEndTime||e.endTime);if(e.milestone&&(_+=.5*(I(e.endTime)-I(e.startTime))-.5*f,V=_+f),e.vert)return I(e.startTime)+k;const P=this.getBBox().width;return P>V-_?V+P+1.5*a.leftPadding>l?_+k-5:V+k+5:(V-_)/2+_+k}).attr("y",function(e,_){return e.vert?a.gridLineStartPadding+T.length*(a.barHeight+a.barGap)+60:(_=e.order,_*x+a.barHeight/2+(a.fontSize/2-2)+v)}).attr("text-height",f).attr("class",function(e){const _=I(e.startTime);let V=I(e.endTime);e.milestone&&(V=_+f);const P=this.getBBox().width;let O="";e.classes.length>0&&(O=e.classes.join(" "));let j=0;for(const[Q,rt]of L.entries())e.type===rt&&(j=Q%a.numberSectionStyles);let F="";return e.active&&(e.crit?F="activeCritText"+j:F="activeText"+j),e.done?e.crit?F=F+" doneCritText"+j:F=F+" doneText"+j:e.crit&&(F=F+" critText"+j),e.milestone&&(F+=" milestoneText"),e.vert&&(F+=" vertText"),P>V-_?V+P+1.5*a.leftPadding>l?O+" taskTextOutsideLeft taskTextOutside"+j+" "+F:O+" taskTextOutsideRight taskTextOutside"+j+" "+F+" width-"+P:O+" taskText taskText"+j+" "+F+" width-"+P}),lt().securityLevel==="sandbox"){let e;e=pt("#i"+n);const _=e.nodes()[0].contentDocument;w.filter(function(V){return s.has(V.id)}).each(function(V){var P=_.querySelector("#"+V.id),O=_.querySelector("#"+V.id+"-text");const j=P.parentNode;var F=_.createElement("a");F.setAttribute("xlink:href",s.get(V.id)),F.setAttribute("target","_top"),j.appendChild(F),F.appendChild(P),F.appendChild(O)})}}c(W,"drawRects");function Y(u,x,v,k,f,o,l,y){if(l.length===0&&y.length===0)return;let g,w;for(const{startTime:P,endTime:O}of o)(g===void 0||P<g)&&(g=P),(w===void 0||O>w)&&(w=O);if(!g||!w)return;if(G(w).diff(G(g),"year")>5){st.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const s=r.db.getDateFormat(),R=[];let e=null,_=G(g);for(;_.valueOf()<=w;)r.db.isInvalidDate(_,s,l,y)?e?e.end=_:e={start:_,end:_}:e&&(R.push(e),e=null),_=_.add(1,"d");z.append("g").selectAll("rect").data(R).enter().append("rect").attr("id",P=>"exclude-"+P.start.format("YYYY-MM-DD")).attr("x",P=>I(P.start.startOf("day"))+v).attr("y",a.gridLineStartPadding).attr("width",P=>I(P.end.endOf("day"))-I(P.start.startOf("day"))).attr("height",f-x-a.gridLineStartPadding).attr("transform-origin",function(P,O){return(I(P.start)+v+.5*(I(P.end)-I(P.start))).toString()+"px "+(O*u+.5*f).toString()+"px"}).attr("class","exclude-range")}c(Y,"drawExcludeDays");function N(u,x,v,k){if(v<=0||u>x)return 1/0;const f=x-u,o=G.duration({[k??"day"]:v}).asMilliseconds();return o<=0?1/0:Math.ceil(f/o)}c(N,"getEstimatedTickCount");function H(u,x,v,k){const f=r.db.getDateFormat(),o=r.db.getAxisFormat();let l;o?l=o:f==="D"?l="%d":l=a.axisFormat??"%Y-%m-%d";let y=Ue(I).tickSize(-k+x+a.gridLineStartPadding).tickFormat(Ut(l));const w=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||a.tickInterval);if(w!==null){const s=parseInt(w[1],10);if(isNaN(s)||s<=0)st.warn(`Invalid tick interval value: "${w[1]}". Skipping custom tick interval.`);else{const R=w[2],e=r.db.getWeekday()||a.weekday,_=I.domain(),V=_[0],P=_[1],O=N(V,P,s,R);if(O>$t)st.warn(`The tick interval "${s}${R}" would generate ${O} ticks, which exceeds the maximum allowed (${$t}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(R){case"millisecond":y.ticks(Zt.every(s));break;case"second":y.ticks(ee.every(s));break;case"minute":y.ticks(te.every(s));break;case"hour":y.ticks(Jt.every(s));break;case"day":y.ticks(Kt.every(s));break;case"week":y.ticks(le[e].every(s));break;case"month":y.ticks(Qt.every(s));break}}}if(z.append("g").attr("class","grid").attr("transform","translate("+u+", "+(k-50)+")").call(y).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),r.db.topAxisEnabled()||a.topAxis){let s=Xe(I).tickSize(-k+x+a.gridLineStartPadding).tickFormat(Ut(l));if(w!==null){const R=parseInt(w[1],10);if(isNaN(R)||R<=0)st.warn(`Invalid tick interval value: "${w[1]}". Skipping custom tick interval.`);else{const e=w[2],_=r.db.getWeekday()||a.weekday,V=I.domain(),P=V[0],O=V[1];if(N(P,O,R,e)<=$t)switch(e){case"millisecond":s.ticks(Zt.every(R));break;case"second":s.ticks(ee.every(R));break;case"minute":s.ticks(te.every(R));break;case"hour":s.ticks(Jt.every(R));break;case"day":s.ticks(Kt.every(R));break;case"week":s.ticks(le[_].every(R));break;case"month":s.ticks(Qt.every(R));break}}}z.append("g").attr("class","grid").attr("transform","translate("+u+", "+x+")").call(s).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(H,"makeGrid");function A(u,x){let v=0;const k=Object.keys(C).map(f=>[f,C[f]]);z.append("g").selectAll("text").data(k).enter().append(function(f){const o=f[0].split(Se.lineBreakRegex),l=-(o.length-1)/2,y=E.createElementNS("http://www.w3.org/2000/svg","text");y.setAttribute("dy",l+"em");for(const[g,w]of o.entries()){const s=E.createElementNS("http://www.w3.org/2000/svg","tspan");s.setAttribute("alignment-baseline","central"),s.setAttribute("x","10"),g>0&&s.setAttribute("dy","1em"),s.textContent=w,y.appendChild(s)}return y}).attr("x",10).attr("y",function(f,o){if(o>0)for(let l=0;l<o;l++)return v+=k[o-1][1],f[1]*u/2+v*u+x;else return f[1]*u/2+x}).attr("font-size",a.sectionFontSize).attr("class",function(f){for(const[o,l]of L.entries())if(f[0]===l)return"sectionTitle sectionTitle"+o%a.numberSectionStyles;return"sectionTitle"})}c(A,"vertLabels");function p(u,x,v,k){const f=r.db.getTodayMarker();if(f==="off")return;const o=z.append("g").attr("class","today"),l=new Date,y=o.append("line");y.attr("x1",I(l)+u).attr("x2",I(l)+u).attr("y1",a.titleTopMargin).attr("y2",k-a.titleTopMargin).attr("class","today"),f!==""&&y.attr("style",f.replace(/,/g,";"))}c(p,"drawToday");function d(u){const x={},v=[];for(let k=0,f=u.length;k<f;++k)Object.prototype.hasOwnProperty.call(x,u[k])||(x[u[k]]=!0,v.push(u[k]));return v}c(d,"checkUnique")},"draw"),Kr={setConf:Ur,draw:Qr},Jr=c(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar — same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),ti=Jr,fi={parser:fr,db:Xr,renderer:Kr,styles:ti};export{fi as diagram};
