// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2022 Jean-Francois Moine - LGPL3+
//xdSnd_1.js-file to include in html pages with abc2svg-1.js for playing
const v4_xdSnd_1 = "xdSnd_1.js 0.12";
document.getElementById("id_4_xdSnd_1_js").value = v4_xdSnd_1;

function AbcPlay(i_conf){ 
    var conf=i_conf,init={},audio=ToAudio(),audio5,midi5,current;
    var o4Play={
        clear:audio.clear,
        add:audio.add,
        set_sfu:function(v){
            if(v==undefined){
                return conf.sfu;
            }
            conf.sfu=v
        },
        set_speed:function(v){
            if(v==undefined){
                return conf.speed;
            }
            conf.new_speed=v
        },
        set_vol:function(v){
            if(v==undefined){
                return conf.gain;
            }
            conf.gain=v;
            if(current&&current.set_vol){
                current.set_vol(v);
            }
        },
        play:play,
        stop:vf
    };
    
    function vf(){}
    
    function play(istart,i_iend,a_e){
        init.istart=istart;
        init.i_iend=i_iend;
        init.a_e=a_e;
        if(midi5){
            midi5.get_outputs(play2);
        }
        else{
            play2();
        }
    }
    
    function play2(out){
        var o;
        if(!out){
            out=[];
        }
        o=audio5.get_outputs();
        if(o){
            Array.prototype.push.apply(out,o);
        }
        if(out.length==0){
            if(conf.onend){
                conf.onend();
            }
            return;
        }
        if(out.length==1){
            o=0;
        }
        else
        {
            o=-1;
            var pr="Use";
            for(var i=0;i<out.length;i++){
                pr+="\n "+i+": "+out[i];
            }
            var res=window.prompt(pr,'0');
            if(res){
                o=Number(res);
                if(isNaN(o)||o<0||o>=out.length){
                    o=-1;
                }
            }
            if(!res||o<0){
                if(conf.onend){
                    conf.onend();
                }
            return;
            }
        }
        current=out[o]=='sf2'?audio5:midi5;
        o4Play.play=current.play;
        o4Play.stop=current.stop;
        if(current.set_output)current.set_output(out[o]);
        if(abc2svg.pwait){
            if(typeof abc2svg.pwait=="boolean"){
                abc2svg.pwait=function(){
                    o4Play.play(init.istart,init.i_iend,init.a_e)
                }
            }
            return
        }
        o4Play.play(init.istart,init.i_iend,init.a_e)
    }
    conf.gain=0.7;
    conf.speed=1;

    (function(){
        var v;
        try{
            if(!localStorage) return
        }
        catch(e){return}
        if(!conf.sfu){
            v=localStorage.getItem("sfu")
            if(v)conf.sfu=v
        }
        v=localStorage.getItem("volume")
        if(v) conf.gain=Number(v)
    })()
    
    if(typeof Midi5=="function") midi5=Midi5(conf)
    if(typeof Audio5=="function") audio5=Audio5(conf);
    return o4Play;
}

if(typeof module=='object'&&typeof exports=='object') exports.AbcPlay=AbcPlay

if(!abc2svg) var abc2svg={}

function ToAudio(){return{add:function(first,voice_tb,cfmt){var toaud=this,C=abc2svg.C,p_time=0,abc_time=0,play_fac=C.BLEN/4*120/60,i,n,dt,d,v,c,s=first,rst=s,rst_fac,rsk,b_tim,b_typ,instr=[],chn=[]
function build_parts(first){var i,j,c,n,v,s=first,p=s.parts,st=[],r=""
for(i=0;i<p.length;i++){c=p[i]
switch(c){case'.':continue
case'(':st.push(r.length)
continue
case')':j=st.pop()
if(j==undefined)
j=r.length
continue}
if(c>='A'&&c<='Z'){j=r.length
r+=c
continue}
n=Number(c)
if(isNaN(n))
break
v=r.slice(j)
if(r.length+v.length*n>128)
continue
while(--n>0)
r+=v}
s.parts=r
s.p_s=[]
while(1){if(!s.ts_next){s.part1=first
break}
s=s.ts_next
if(s.part){s.part1=first
v=s.part.text[0]
for(i=0;i<first.parts.length;i++){if(first.parts[i]==v)
first.p_s[i]=s}}}}
function midi_start(){var v,p_v,c,i,ii
for(v=0;v<voice_tb.length;v++){p_v=voice_tb[v]
ii=p_v.instr||0
c=p_v.chn
if(c==undefined)
c=p_v.v<9?p_v.v:p_v.v+1
else if(c==9)
ii=(ii&~0x7f)|16384
if(p_v.midictl){for(i in p_v.midictl){switch(Number(i)){case 0:ii=(ii&0x3fff)|(p_v.midictl[i]<<14)
break
case 32:ii=(ii&0x1fc07f)|(p_v.midictl[i]<<7)
break}}}
if((ii&~0x7f)==16384)
c=9
chn[v]=c
instr[c]=ii}}
function do_block(s){var v=s.v,c=chn[v]
switch(s.subtype){case"midichn":chn[v]=s.chn
break
case"midictl":switch(s.ctrl){case 0:instr[c]=(instr[c]&0x3fff)|(s.val<<14)
break
case 32:instr[c]=(instr[c]&0x1fc07f)|(s.val<<7)
break}
if((instr[c]&~0x7f)==16384){instr[9]=instr[c]
chn[v]=c=9}
s.chn=c
break
case"midiprog":instr[c]=(instr[c]&~0x7f)|s.instr
s.chn=c
break}}
function gen_grace(s){var g,i,n,t,d,s2,next=s.next
if(s.sappo){d=C.BLEN/16}else if((!next||next.type!=C.NOTE)&&s.prev&&s.prev.type==C.NOTE){d=s.prev.dur/2}else{d=next.dur/12
if(!(d&(d-1)))
d=next.dur/2
else
d=next.dur/3
next.time+=d
next.dur-=d}
n=0
for(g=s.extra;g;g=g.next)
n++
d/=n*play_fac
t=p_time
for(g=s.extra;g;g=g.next){g.ptim=t
g.pdur=d
g.chn=chn[s.v]
g.instr=instr[g.chn]
t+=d}}
function set_tempo(s){var i,d=0,n=s.tempo_notes.length
for(i=0;i<n;i++)
d+=s.tempo_notes[i]
return d*s.tempo/60}
function set_variant(rsk,n,s){var d
n=n.match(/[1-8]-[2-9]|[1-9,.]|[^\s]+$/g)
while(1){d=n.shift()
if(!d)
break
if(d[1]=='-')
for(i=d[0];i<=d[2];i++)
rsk[i]=s
else if(d>='1'&&d<='9')
rsk[Number(d)]=s
else if(d!=',')
rsk.push(s)}}
if(cfmt.chord){if(!abc2svg.chord){abc2svg.pwait=true
abc2svg.loadjs("chord-1.js",function(){toaud.add(first,voice_tb,cfmt)},function(){cfmt.chord=null
toaud.add(first,voice_tb,cfmt)})
return}
abc2svg.chord(first,voice_tb,cfmt)}
if(s.parts)
build_parts(s)
midi_start()
rst_fac=play_fac
while(s){if(s.noplay){s=s.ts_next
continue}
dt=s.time-abc_time
if(dt!=0){p_time+=dt/play_fac
abc_time=s.time}
s.ptim=p_time
if(s.part){rst=s
rst_fac=play_fac}
switch(s.type){case C.BAR:if(s.time!=b_tim){b_tim=s.time
b_typ=0}
if(s.text&&rsk&&s.text[0]!='1'){if(b_typ&1)
break
b_typ|=1
set_variant(rsk,s.text,s)
play_fac=rst_fac
rst=rsk[0]}
if(s.bar_type[0]==':'){if(b_typ&2)
break
b_typ|=2
s.rep_p=rst
if(rsk&&rst==rsk[0])
s.rep_v=rsk}
if(s.text){if(s.text[0]=='1'){if(b_typ&1)
break
b_typ|=1
s.rep_s=rsk=[rst]
if(rst.bar_type&&rst.bar_type.slice(-1)!=':')
rst.bar_type+=':'
set_variant(rsk,s.text,s)
rst_fac=play_fac}}else if(s.rbstop){if(s.bar_type.slice(-1)==':'){if(b_typ&4)
break
b_typ|=4}else{if(b_typ&8)
break
b_typ|=8}
rst=s
rst_fac=play_fac}
break
case C.BLOCK:do_block(s)
break
case C.GRACE:if(s.time==0&&abc_time==0){dt=0
if(s.sappo)
dt=C.BLEN/16
else if(!s.next||s.next.type!=C.NOTE)
dt=d/2
abc_time-=dt}
gen_grace(s)
break
case C.REST:case C.NOTE:d=s.dur
if(s.next&&s.next.type==C.GRACE){dt=0
if(s.next.sappo)
dt=C.BLEN/16
else if(!s.next.next||s.next.next.type!=C.NOTE)
dt=d/2
s.next.time-=dt
d-=dt}
d/=play_fac
s.pdur=d
v=s.v
c=chn[v]
s.chn=c
s.instr=instr[c]
break
case C.TEMPO:if(s.tempo)
play_fac=set_tempo(s)
break}
s=s.ts_next}
if(abc2svg.pwait){i=abc2svg.pwait
delete abc2svg.pwait
if(typeof i=="function")
i()}}}}
abc2svg.play_next=function(po){function do_tie(note,d){var i,s=note.s,midi=note.midi,C=abc2svg.C,v=s.v,end_time=s.time+s.dur,repv=po.repv
while(1){s=s.ts_next
if(!s||s.time>end_time)
break
if(s.type==C.BAR){if(s.rep_p){if(!po.repn){s=s.rep_p
end_time=s.time}}
if(s.rep_s){if(!s.rep_s[repv])
break
s=s.rep_s[repv++]
end_time=s.time}
while(s.ts_next&&!s.ts_next.dur)
s=s.ts_next}
if(s.type!=C.NOTE)
continue
i=s.notes.length
while(--i>=0){note=s.notes[i]
if(note.midi==midi){note.ti2=true
d+=s.pdur/po.conf.speed
return note.tie_ty?do_tie(note,d):d}}}
return d}
function set_ctrl(po,s2,t){var i,p_v=s2.p_v,tim=s2.time,s={subtype:"midictl",p_v:p_v,v:p_v.v,chn:p_v.chn}
for(i in p_v.midictl){s.ctrl=Number(i)
s.val=p_v.midictl[i]
po.midi_ctrl(po,s,t)}
for(s=p_v.sym;s&&s.time<=tim;s=s.next){if(s.subtype=="midictl")
po.midi_ctrl(po,s,t)}
po.p_v[s2.v]=true}
function play_cont(po){var d,i,st,m,note,g,s2,t,maxt,now,C=abc2svg.C,s=po.s_cur
if(po.stop){if(po.onend)
po.onend(po.repv)
return}
while(s.noplay){s=s.ts_next
if(!s||s==po.s_end){if(po.onend)
po.onend(po.repv)
return}}
t=po.stim+s.ptim/po.conf.speed
now=po.get_time(po)
if(po.conf.new_speed){po.stim=now-(now-po.stim)*po.conf.speed/po.conf.new_speed
po.conf.speed=po.conf.new_speed
po.conf.new_speed=0
t=po.stim+s.ptim/po.conf.speed}
maxt=t+po.tgen
po.timouts=[]
while(1){if(!po.p_v[s.v])
set_ctrl(po,s,t)
switch(s.type){case C.BAR:if(s.rep_p){po.repv++
if(!po.repn&&(!s.rep_v||po.repv<s.rep_v.length)){po.stim+=(s.ptim-s.rep_p.ptim)/po.conf.speed
s=s.rep_p
while(s.ts_next&&!s.ts_next.dur)
s=s.ts_next
t=po.stim+s.ptim/po.conf.speed
po.repn=true
break}
po.repn=false}
if(s.rep_s){s2=s.rep_s[po.repv]
if(s2){po.stim+=(s.ptim-s2.ptim)/po.conf.speed
s=s2
t=po.stim+s.ptim/po.conf.speed
po.repn=false}else{s=po.s_end
break}}
if(s.bar_type.slice(-1)==':')
po.repv=1
if(!s.part1){while(s.ts_next&&!s.ts_next.seqst){s=s.ts_next
if(s.part1)
break}
if(!s.part1)
break}
default:if(s.part1&&po.i_p!=undefined){s2=s.part1.p_s[++po.i_p]
if(s2){po.stim+=(s.ptim-s2.ptim)/po.conf.speed
s=s2
t=po.stim+s.ptim/po.conf.speed}else{s=po.s_end}
po.repv=1}
break}
if(s&&s!=po.s_end){switch(s.type){case C.BAR:break
case C.BLOCK:if(s.subtype=="midictl")
po.midi_ctrl(po,s,t)
break
case C.GRACE:for(g=s.extra;g;g=g.next){d=g.pdur/po.conf.speed
for(m=0;m<=g.nhd;m++){note=g.notes[m]
po.note_run(po,g,note.midi,t+g.ptim-s.ptim,d)}}
break
case C.NOTE:case C.REST:d=s.pdur/po.conf.speed
if(s.type==C.NOTE){for(m=0;m<=s.nhd;m++){note=s.notes[m]
if(note.ti2)
continue
po.note_run(po,s,note.midi,t,note.tie_ty?do_tie(note,d):d)}}
if(po.onnote&&s.istart){i=s.istart
st=(t-now)*1000
po.timouts.push(setTimeout(po.onnote,st,i,true))
if(d>2)
d-=.1
setTimeout(po.onnote,st+d*1000,i,false)}
break}}
while(1){if(!s||s==po.s_end||!s.ts_next){if(po.onend)
setTimeout(po.onend,(t-now+d)*1000,po.repv)
po.s_cur=s
return}
s=s.ts_next
if(!s.noplay)
break}
t=po.stim+s.ptim/po.conf.speed
if(t>maxt)
break}
po.s_cur=s
po.timouts.push(setTimeout(play_cont,(t-now)*1000
-300,po))}
function get_part(po){var s,i,s_p
for(s=po.s_cur;s;s=s.ts_prev){if(s.parts){po.i_p=-1
return}
s_p=s.part1
if(!s_p||!s_p.p_s)
continue
for(i=0;i<s_p.p_s.length;i++){if(s_p.p_s[i]==s){po.i_p=i
return}}}}
get_part(po)
po.stim=po.get_time(po)+.3
-po.s_cur.ptim*po.conf.speed
po.p_v=[]
if(!po.repv)
po.repv=1
play_cont(po)}
if(typeof module=='object'&&typeof exports=='object')
exports.ToAudio=ToAudio
var abcsf2=[]
function Audio5(i_conf){var po,conf=i_conf,empty=function(){},errmsg,ac,gain,model,parser,presets,instr=[],params=[],rates=[],w_instr=0
var b64d=[]
function init_b64d(){var b64l='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',l=b64l.length
for(var i=0;i<l;i++)
b64d[b64l[i]]=i
b64d['=']=0}
function b64dcod(s){var i,t,dl,a,l=s.length,j=0
dl=l*3/4
if(s[l-1]=='='){if(s[l-2]=='=')
dl--
dl--
l-=4}
a=new Uint8Array(dl)
for(i=0;i<l;i+=4){t=(b64d[s[i]]<<18)+
(b64d[s[i+1]]<<12)+
(b64d[s[i+2]]<<6)+
b64d[s[i+3]]
a[j++]=(t>>16)&0xff
a[j++]=(t>>8)&0xff
a[j++]=t&0xff}
if(l!=s.length){t=(b64d[s[i]]<<18)+
(b64d[s[i+1]]<<12)+
(b64d[s[i+2]]<<6)+
b64d[s[i+3]]
a[j++]=(t>>16)&0xff
if(j<dl)
a[j++]=(t>>8)&0xff}
return a}
function sample_cp(b,s){var i,n,a=b.getChannelData(0)
for(i=0;i<s.length;i++)
a[i]=s[i]/196608}
function sf2_create(instr){function get_instr(i){var instrument=parser.instrument,zone=parser.instrumentZone,j=instrument[i].instrumentBagIndex,jl=instrument[i+1]?instrument[i+1].instrumentBagIndex:zone.length,info=[]
while(j<jl){instrumentGenerator=parser.createInstrumentGenerator_(zone,j)
info.push({generator:instrumentGenerator.generator,})
j++}
return{info:info}}
var i,j,k,sid,gen,parm,gparm,sample,infos,sampleRate,scale,b=instr>>7,p=instr%128,pr=presets
rates[instr]=[]
for(i=0;i<pr.length;i++){gen=pr[i].header
if(gen.preset==p&&gen.bank==b)
break}
pr=pr[i]
if(!pr){errmsg('unknown instrument '+b+':'+p)
return}
pr=pr.info
for(k=0;k<pr.length;k++){if(!pr[k].generator.instrument)
continue
gparm=null
infos=get_instr(pr[k].generator.instrument.amount).info
for(i=0;i<infos.length;i++){gen=infos[i].generator
if(!gparm){parm=gparm={attack:.001,hold:.001,decay:.001,sustain:0}}else{parm=Object.create(gparm)
if(!gen.sampleID)
gparm=parm}
if(gen.attackVolEnv)
parm.attack=Math.pow(2,gen.attackVolEnv.amount/1200)
if(gen.holdVolEnv)
parm.hold=Math.pow(2,gen.holdVolEnv.amount/1200)
if(gen.decayVolEnv)
parm.decay=Math.pow(2,gen.decayVolEnv.amount/1200)/3
if(gen.sustainVolEnv)
parm.sustain=gen.sustainVolEnv.amount/1000
if(gen.sampleModes&&gen.sampleModes.amount&1)
parm.sm=1
if(!gen.sampleID)
continue
sid=gen.sampleID.amount
sampleRate=parser.sampleHeader[sid].sampleRate
sample=parser.sample[sid]
parm.buffer=ac.createBuffer(1,sample.length,sampleRate)
parm.hold+=parm.attack
parm.decay+=parm.hold
if(parm.sustain>=.4)
parm.sustain=0.01
else
parm.sustain=1-parm.sustain/.4
sample_cp(parm.buffer,sample)
if(parm.sm){parm.loopStart=parser.sampleHeader[sid].startLoop/sampleRate
parm.loopEnd=parser.sampleHeader[sid].endLoop/sampleRate}
scale=(gen.scaleTuning?gen.scaleTuning.amount:100)/100,tune=(gen.coarseTune?gen.coarseTune.amount:0)+
(gen.fineTune?gen.fineTune.amount:0)/100+
parser.sampleHeader[sid].pitchCorrection/100-
(gen.overridingRootKey?gen.overridingRootKey.amount:parser.sampleHeader[sid].originalPitch)
for(j=gen.keyRange.lo;j<=gen.keyRange.hi;j++){rates[instr][j]=Math.pow(Math.pow(2,1/12),(j+tune)*scale)
params[instr][j]=parm}}}}
function load_instr(instr){w_instr++
abc2svg.loadjs(conf.sfu+'/'+instr+'.js',function(){parser=new sf2.Parser(b64dcod(abcsf2[instr]))
parser.parse()
presets=parser.getPresets()
sf2_create(instr)
if(--w_instr==0)
play_start()},function(){errmsg('could not find the instrument '+
((instr/128)|0).toString()+'-'+
(instr%128).toString())
if(--w_instr==0)
play_start()})}
function load_res(s){if(abc2svg.sf2||conf.sfu.slice(-4)==".sf2"||conf.sfu.slice(-3)==".js"){if(abc2svg.sf2){if(!parser){parser=new sf2.Parser(b64dcod(abc2svg.sf2))
parser.parse()
presets=parser.getPresets()}}else if(!parser){if(conf.sfu.slice(-3)==".js"){abc2svg.loadjs(conf.sfu,function(){load_res(s)},function(){errmsg('could not load the sound file '
+conf.sfu)})
return}
var r=new XMLHttpRequest()
r.open('GET',conf.sfu,true)
r.responseType="arraybuffer"
r.onload=function(){if(r.status===200){parser=new sf2.Parser(new Uint8Array(r.response))
parser.parse()
presets=parser.getPresets()
load_res(s)}else{errmsg('could not load the sound file '
+conf.sfu)}}
r.onerror=function(){errmsg('could not load the sound file '
+conf.sfu)}
r.send()
return}
while(s){var i=s.instr
if(i!=undefined&&!params[i]){params[i]=[]
sf2_create(i)}
s=s.ts_next}
play_start()}else{w_instr++
while(s){var i=s.instr
if(i!=undefined&&!params[i]){params[i]=[]
load_instr(i)}
s=s.ts_next}
if(--w_instr==0)
play_start()}}
function get_time(po){return po.ac.currentTime}
function midi_ctrl(po,s,t){if(s.ctrl==7)
s.p_v.vol=s.val/127}
function note_run(po,s,key,t,d){var g,st,instr=s.instr,k=key|0,parm=po.params[instr][k],o=po.ac.createBufferSource(),v=s.p_v.vol==undefined?1:s.p_v.vol
if(!v||!parm)
return
o.buffer=parm.buffer
if(parm.loopStart){o.loop=true
o.loopStart=parm.loopStart
o.loopEnd=parm.loopEnd}
if(o.detune){var dt=(key*100)%100
if(dt)
o.detune.value=dt}
o.playbackRate.value=po.rates[instr][k]
g=po.ac.createGain()
if(parm.hold<0.002){g.gain.setValueAtTime(v,t)}else{if(parm.attack<0.002){g.gain.setValueAtTime(v,t)}else{g.gain.setValueAtTime(0,t)
g.gain.linearRampToValueAtTime(v,t+parm.attack)}
g.gain.setValueAtTime(v,t+parm.hold)}
g.gain.exponentialRampToValueAtTime(parm.sustain*v,t+parm.decay)
o.connect(g)
g.connect(po.gain)
o.start(t)
o.stop(t+d)}
function play_start(){if(po.stop){po.onend(repv)
return}
gain.connect(ac.destination)
abc2svg.play_next(po)}
init_b64d()
if(!conf.sfu)
conf.sfu="Scc1t2"
if(navigator.userAgentData&&navigator.userAgentData.getHighEntropyValues)
navigator.userAgentData.getHighEntropyValues(['model']).then(function(ua){model=ua.model})
else
model=navigator.userAgent
return{get_outputs:function(){return(window.AudioContext||window.webkitAudioContext)?['sf2']:null},play:function(i_start,i_end,i_lvl){errmsg=conf.errmsg||alert
function play_unlock(){var buf=ac.createBuffer(1,1,22050),src=ac.createBufferSource()
src.buffer=buf
src.connect(ac.destination)
src.noteOn(0)}
if(!gain){ac=conf.ac
if(!ac){conf.ac=ac=new(window.AudioContext||window.webkitAudioContext)
if(/iPad|iPhone|iPod/.test(model))
play_unlock()}
gain=ac.createGain()
gain.gain.value=conf.gain}
while(i_start.noplay)
i_start=i_start.ts_next
po={conf:conf,onend:conf.onend||empty,onnote:conf.onnote||empty,s_end:i_end,s_cur:i_start,repv:i_lvl||0,tgen:2,get_time:get_time,midi_ctrl:midi_ctrl,note_run:note_run,timouts:[],ac:ac,gain:gain,params:params,rates:rates}
load_res(i_start)},stop:function(){po.stop=true
po.timouts.forEach(function(id){clearTimeout(id)})
abc2svg.play_next(po)
if(gain){gain.disconnect()
gain=null}},set_vol:function(v){if(gain)
gain.gain.value=v}}}
(function(root,factory){if(typeof exports==="object"){root.sf2=exports;factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],function(exports){root.sf2=exports;return(root.sf2,factory(exports))})}else{root.sf2={};factory(root.sf2)}}(this,function(sf2){"use strict";sf2.Parser=function(input,options){options=options||{};this.input=input;this.parserOptions=options.parserOptions};sf2.Parser.prototype.parse=function(){var parser=new sf2.Riff.Parser(this.input,this.parserOptions),chunk;parser.parse();if(parser.chunkList.length!==1)
throw new Error('wrong chunk length');chunk=parser.getChunk(0);if(chunk===null)
throw new Error('chunk not found');this.parseRiffChunk(chunk);this.input=null};sf2.Parser.prototype.parseRiffChunk=function(chunk){var parser,data=this.input,ip=chunk.offset,signature;if(chunk.type!=='RIFF')
throw new Error('invalid chunk type:'+chunk.type);signature=String.fromCharCode(data[ip++],data[ip++],data[ip++],data[ip++]);if(signature!=='sfbk')
throw new Error('invalid signature:'+signature);parser=new sf2.Riff.Parser(data,{'index':ip,'length':chunk.size-4});parser.parse();if(parser.getNumberOfChunks()!==3)
throw new Error('invalid sfbk structure');this.parseInfoList(parser.getChunk(0));this.parseSdtaList(parser.getChunk(1));this.parsePdtaList(parser.getChunk(2))};sf2.Parser.prototype.parseInfoList=function(chunk){var parser,data=this.input,ip=chunk.offset,signature;if(chunk.type!=='LIST')
throw new Error('invalid chunk type:'+chunk.type);signature=String.fromCharCode(data[ip++],data[ip++],data[ip++],data[ip++]);if(signature!=='INFO')
throw new Error('invalid signature:'+signature);parser=new sf2.Riff.Parser(data,{'index':ip,'length':chunk.size-4});parser.parse()};sf2.Parser.prototype.parseSdtaList=function(chunk){var parser,data=this.input,ip=chunk.offset,signature;if(chunk.type!=='LIST')
throw new Error('invalid chunk type:'+chunk.type);signature=String.fromCharCode(data[ip++],data[ip++],data[ip++],data[ip++]);if(signature!=='sdta')
throw new Error('invalid signature:'+signature);parser=new sf2.Riff.Parser(data,{'index':ip,'length':chunk.size-4});parser.parse();if(parser.chunkList.length!==1)
throw new Error('TODO');this.samplingData=parser.getChunk(0)};sf2.Parser.prototype.parsePdtaList=function(chunk){var parser,data=this.input,ip=chunk.offset,signature;if(chunk.type!=='LIST')
throw new Error('invalid chunk type:'+chunk.type);signature=String.fromCharCode(data[ip++],data[ip++],data[ip++],data[ip++]);if(signature!=='pdta')
throw new Error('invalid signature:'+signature);parser=new sf2.Riff.Parser(data,{'index':ip,'length':chunk.size-4});parser.parse();if(parser.getNumberOfChunks()!==9)
throw new Error('invalid pdta chunk');this.parsePhdr((parser.getChunk(0)));this.parsePbag((parser.getChunk(1)));this.parsePmod((parser.getChunk(2)));this.parsePgen((parser.getChunk(3)));this.parseInst((parser.getChunk(4)));this.parseIbag((parser.getChunk(5)));this.parseImod((parser.getChunk(6)));this.parseIgen((parser.getChunk(7)));this.parseShdr((parser.getChunk(8)))};sf2.Parser.prototype.parsePhdr=function(chunk){var data=this.input,ip=chunk.offset,presetHeader=this.presetHeader=[],size=chunk.offset+chunk.size;if(chunk.type!=='phdr')
throw new Error('invalid chunk type:'+chunk.type);while(ip<size){presetHeader.push({presetName:String.fromCharCode.apply(null,data.subarray(ip,ip+=20)),preset:data[ip++]|(data[ip++]<<8),bank:data[ip++]|(data[ip++]<<8),presetBagIndex:data[ip++]|(data[ip++]<<8),library:(data[ip++]|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24))>>>0,genre:(data[ip++]|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24))>>>0,morphology:(data[ip++]|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24))>>>0})}};sf2.Parser.prototype.parsePbag=function(chunk){var data=this.input,ip=chunk.offset,presetZone=this.presetZone=[],size=chunk.offset+chunk.size;if(chunk.type!=='pbag')
throw new Error('invalid chunk type:'+chunk.type);while(ip<size){presetZone.push({presetGeneratorIndex:data[ip++]|(data[ip++]<<8),presetModulatorIndex:data[ip++]|(data[ip++]<<8)})}};sf2.Parser.prototype.parsePmod=function(chunk){if(chunk.type!=='pmod')
throw new Error('invalid chunk type:'+chunk.type);this.presetZoneModulator=this.parseModulator(chunk)};sf2.Parser.prototype.parsePgen=function(chunk){if(chunk.type!=='pgen')
throw new Error('invalid chunk type:'+chunk.type);this.presetZoneGenerator=this.parseGenerator(chunk)};sf2.Parser.prototype.parseInst=function(chunk){var data=this.input,ip=chunk.offset,instrument=this.instrument=[],size=chunk.offset+chunk.size;if(chunk.type!=='inst')
throw new Error('invalid chunk type:'+chunk.type);while(ip<size){instrument.push({instrumentName:String.fromCharCode.apply(null,data.subarray(ip,ip+=20)),instrumentBagIndex:data[ip++]|(data[ip++]<<8)})}};sf2.Parser.prototype.parseIbag=function(chunk){var data=this.input,ip=chunk.offset,instrumentZone=this.instrumentZone=[],size=chunk.offset+chunk.size;if(chunk.type!=='ibag')
throw new Error('invalid chunk type:'+chunk.type);while(ip<size){instrumentZone.push({instrumentGeneratorIndex:data[ip++]|(data[ip++]<<8),instrumentModulatorIndex:data[ip++]|(data[ip++]<<8)})}};sf2.Parser.prototype.parseImod=function(chunk){if(chunk.type!=='imod')
throw new Error('invalid chunk type:'+chunk.type);this.instrumentZoneModulator=this.parseModulator(chunk)};sf2.Parser.prototype.parseIgen=function(chunk){if(chunk.type!=='igen')
throw new Error('invalid chunk type:'+chunk.type);this.instrumentZoneGenerator=this.parseGenerator(chunk)};sf2.Parser.prototype.parseShdr=function(chunk){var data=this.input,ip=chunk.offset,samples=this.sample=[],sampleHeader=this.sampleHeader=[],size=chunk.offset+chunk.size,sampleName,start,end,startLoop,endLoop,sampleRate,originalPitch,pitchCorrection,sampleLink,sampleType;if(chunk.type!=='shdr')
throw new Error('invalid chunk type:'+chunk.type);while(ip<size){sampleName=String.fromCharCode.apply(null,data.subarray(ip,ip+=20));start=(data[ip++]<<0)|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24);end=(data[ip++]<<0)|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24);startLoop=(data[ip++]<<0)|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24);endLoop=(data[ip++]<<0)|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24);sampleRate=(data[ip++]<<0)|(data[ip++]<<8)|(data[ip++]<<16)|(data[ip++]<<24);originalPitch=data[ip++];pitchCorrection=(data[ip++]<<24)>>24;sampleLink=data[ip++]|(data[ip++]<<8);sampleType=data[ip++]|(data[ip++]<<8);var sample=new Int16Array(new Uint8Array(data.subarray(this.samplingData.offset+start*2,this.samplingData.offset+end*2)).buffer);startLoop-=start;endLoop-=start;if(sampleRate>0){var adjust=this.adjustSampleData(sample,sampleRate);sample=adjust.sample;sampleRate*=adjust.multiply;startLoop*=adjust.multiply;endLoop*=adjust.multiply}
samples.push(sample);sampleHeader.push({sampleName:sampleName,startLoop:startLoop,endLoop:endLoop,sampleRate:sampleRate,originalPitch:originalPitch,pitchCorrection:pitchCorrection,sampleLink:sampleLink,sampleType:sampleType})}};sf2.Parser.prototype.adjustSampleData=function(sample,sampleRate){var newSample,i,il,j,multiply=1;while(sampleRate<22050){newSample=new Int16Array(sample.length*2);for(i=j=0,il=sample.length;i<il;++i){newSample[j++]=sample[i];newSample[j++]=sample[i]}
sample=newSample;multiply*=2;sampleRate*=2}
return{sample:sample,multiply:multiply}};sf2.Parser.prototype.parseModulator=function(chunk){var data=this.input,ip=chunk.offset,size=chunk.offset+chunk.size,code,key,output=[];while(ip<size){ip+=2;code=data[ip++]|(data[ip++]<<8);key=sf2.Parser.GeneratorEnumeratorTable[code];if(key===undefined){output.push({type:key,value:{code:code,amount:data[ip]|(data[ip+1]<<8)<<16>>16,lo:data[ip++],hi:data[ip++]}})}else{switch(key){case'keyRange':case'velRange':case'keynum':case'velocity':output.push({type:key,value:{lo:data[ip++],hi:data[ip++]}});break;default:output.push({type:key,value:{amount:data[ip++]|(data[ip++]<<8)<<16>>16}});break}}
ip+=2;ip+=2}
return output};sf2.Parser.prototype.parseGenerator=function(chunk){var data=this.input,ip=chunk.offset,size=chunk.offset+chunk.size,code,key,output=[];while(ip<size){code=data[ip++]|(data[ip++]<<8);key=sf2.Parser.GeneratorEnumeratorTable[code];if(key===undefined){output.push({type:key,value:{code:code,amount:data[ip]|(data[ip+1]<<8)<<16>>16,lo:data[ip++],hi:data[ip++]}});continue}
switch(key){case'keynum':case'keyRange':case'velRange':case'velocity':output.push({type:key,value:{lo:data[ip++],hi:data[ip++]}});break;default:output.push({type:key,value:{amount:data[ip++]|(data[ip++]<<8)<<16>>16}});break}}
return output};sf2.Parser.prototype.getPresets=function(){var preset=this.presetHeader,zone=this.presetZone,output=[],bagIndex,bagIndexEnd,zoneInfo,presetGenerator,presetModulator,i,il,j,jl
for(i=0,il=preset.length;i<il;++i){j=preset[i].presetBagIndex
jl=preset[i+1]?preset[i+1].presetBagIndex:zone.length
zoneInfo=[];for(;j<jl;++j){presetGenerator=this.createPresetGenerator_(zone,j);presetModulator=this.createPresetModulator_(zone,j);zoneInfo.push({generator:presetGenerator.generator,modulator:presetModulator.modulator,})}
output.push({info:zoneInfo,header:preset[i],})}
return output};sf2.Parser.prototype.createInstrumentGenerator_=function(zone,index){var modgen=this.createBagModGen_(zone,zone[index].instrumentGeneratorIndex,zone[index+1]?zone[index+1].instrumentGeneratorIndex:this.instrumentZoneGenerator.length,this.instrumentZoneGenerator);return{generator:modgen.modgen,}};sf2.Parser.prototype.createInstrumentModulator_=function(zone,index){var modgen=this.createBagModGen_(zone,zone[index].presetModulatorIndex,zone[index+1]?zone[index+1].instrumentModulatorIndex:this.instrumentZoneModulator.length,this.instrumentZoneModulator);return{modulator:modgen.modgen}};sf2.Parser.prototype.createPresetGenerator_=function(zone,index){var modgen=this.createBagModGen_(zone,zone[index].presetGeneratorIndex,zone[index+1]?zone[index+1].presetGeneratorIndex:this.presetZoneGenerator.length,this.presetZoneGenerator);return{generator:modgen.modgen,}};sf2.Parser.prototype.createPresetModulator_=function(zone,index){var modgen=this.createBagModGen_(zone,zone[index].presetModulatorIndex,zone[index+1]?zone[index+1].presetModulatorIndex:this.presetZoneModulator.length,this.presetZoneModulator);return{modulator:modgen.modgen,}};sf2.Parser.prototype.createBagModGen_=function(zone,indexStart,indexEnd,zoneModGen){var modgen={unknown:[],'keyRange':{hi:127,lo:0}};var info,i,il;for(i=indexStart,il=indexEnd;i<il;++i){info=zoneModGen[i];if(info.type==='unknown')
modgen.unknown.push(info.value);else
modgen[info.type]=info.value}
return{modgen:modgen}};sf2.Parser.GeneratorEnumeratorTable=['startAddrsOffset','endAddrsOffset','startloopAddrsOffset','endloopAddrsOffset','startAddrsCoarseOffset','modLfoToPitch','vibLfoToPitch','modEnvToPitch','initialFilterFc','initialFilterQ','modLfoToFilterFc','modEnvToFilterFc','endAddrsCoarseOffset','modLfoToVolume',undefined,'chorusEffectsSend','reverbEffectsSend','pan',undefined,undefined,undefined,'delayModLFO','freqModLFO','delayVibLFO','freqVibLFO','delayModEnv','attackModEnv','holdModEnv','decayModEnv','sustainModEnv','releaseModEnv','keynumToModEnvHold','keynumToModEnvDecay','delayVolEnv','attackVolEnv','holdVolEnv','decayVolEnv','sustainVolEnv','releaseVolEnv','keynumToVolEnvHold','keynumToVolEnvDecay','instrument',undefined,'keyRange','velRange','startloopAddrsCoarseOffset','keynum','velocity','initialAttenuation',undefined,'endloopAddrsCoarseOffset','coarseTune','fineTune','sampleID','sampleModes',undefined,'scaleTuning','exclusiveClass','overridingRootKey'];sf2.Riff={};sf2.Riff.Parser=function(input,options){options=options||{};this.input=input;this.ip=options.index||0;this.length=options.length||input.length-this.ip;this.offset=this.ip;this.padding=options.padding!==undefined?options.padding:true;this.bigEndian=options.bigEndian!==undefined?options.bigEndian:false};sf2.Riff.Chunk=function(type,size,offset){this.type=type;this.size=size;this.offset=offset};sf2.Riff.Parser.prototype.parse=function(){var length=this.length+this.offset;this.chunkList=[];while(this.ip<length)
this.parseChunk()};sf2.Riff.Parser.prototype.parseChunk=function(){var input=this.input,ip=this.ip,size;this.chunkList.push(new sf2.Riff.Chunk(String.fromCharCode(input[ip++],input[ip++],input[ip++],input[ip++]),(size=this.bigEndian?((input[ip++]<<24)|(input[ip++]<<16)|(input[ip++]<<8)|(input[ip++])):((input[ip++])|(input[ip++]<<8)|(input[ip++]<<16)|(input[ip++]<<24))),ip));ip+=size;if(this.padding&&((ip-this.offset)&1)===1)
ip++;this.ip=ip};sf2.Riff.Parser.prototype.getChunk=function(index){var chunk=this.chunkList[index];if(chunk===undefined)
return null;return chunk};sf2.Riff.Parser.prototype.getNumberOfChunks=function(){return this.chunkList.length};return sf2}));

function Midi5(i_conf){
    var po,conf=i_conf,empty=function(){},rf,op;
    function get_time(po){return window.performance.now()/1000}
    function note_run(po,s,k,t,d){
        var j,a=(k*100)%100,i=s.instr,c=s.chn;
        k|=0
        t*=1000
        d*=1000
        if(i!=po.c_i[c]){
            if(po.c_i[c]==undefined){
                po.op.send(new Uint8Array([0xb0+c,121,0]));
                if(s.p_v.midictl){
                    for(j in s.p_v.midictl);
                    po.op.send(new Uint8Array([0xb0+c,j,s.p_v.midictl[j]]))
                }
            }
            po.c_i[c]=i
            po.op.send(new Uint8Array([0xc0+c,i&0x7f]))
        }
        if(a&&Midi5.ma.sysexEnabled){
            po.op.send(new Uint8Array([0xf0,0x7f,0x7f,0x08,0x02,i&0x7f,0x01,k,k,a/.78125,0,0xf7]),t)
        }
        po.op.send(new Uint8Array([0x90+c,k,127]),t)
        po.op.send(new Uint8Array([0x80+c,k,0]),t+d-20)
    }
    
    function midi_ctrl(po,s,t){po.op.send(new Uint8Array([0xb0+s.chn,s.ctrl,s.val]),t*1000)}
    
    function send_outputs(access){
        var o,os,out=[];
        Midi5.ma=access;
        if(access&&access.outputs.size>0){
            os=access.outputs.values()
            while(1){
                o=os.next();
                if(!o||o.done)              break
                out.push(o.value.name)
            }
        }
        rf(out)
    }

    return {
        get_outputs:function(f){
            if(!navigator.requestMIDIAccess){
                f()
                return
            }
            rf=f
            navigator.requestMIDIAccess({sysex:true})
            .then(send_outputs,
                function(msg){
                    navigator.requestMIDIAccess().then(
                        send_outputs,
                        function(msg){
                            rf()
                        }
                        )
                }
            )
        },
        set_output:function(name){
            var o,os;
            if(!Midi5.ma) return
            os=Midi5.ma.outputs.values()
            while(1){
                o=os.next()
                if(!o||o.done) break
                if(o.value.name==name){
                    op=o.value
                    break
                }
            }
        },
        play:function(i_start,i_end,i_lvl){
            po={conf:conf,
                onend:conf.onend||empty,
                onnote:conf.onnote||empty,
                s_end:i_end,
                s_cur:i_start,
                repv:i_lvl||0,
                tgen:2,
                get_time:get_time,
                midi_ctrl:midi_ctrl,
                note_run:note_run,
                timouts:[],
                op:op,
                c_i:[]
            }
            if(0){
                op.send(new Uint8Array([0xf0,0x7f,0x7f,0x08,0x02,0x00,0x01,0x69,0x69,0x00,0,0xf7]),t)
            }
            abc2svg.play_next(po)
        },
        stop:function(){
            po.stop=true
            po.timouts.forEach(function(id){clearTimeout(id)})
            abc2svg.play_next(po)
            if(op&&op.clear) op.clear()
        }
    }
}

function follow(abc,user,playconf){var ref=[],keep_types={note:true,rest:true}
user.anno_stop=function(type,start,stop,x,y,w,h){if(!keep_types[type])
return
ref[start]=stop;abc.out_svg('<rect class="abcr _'+start+'_" x="');abc.out_sxsy(x,'" y="',y);abc.out_svg('" width="'+w.toFixed(2)+'" height="'+abc.sh(h).toFixed(2)+'"/>\n')}
playconf.onnote=function(i,on){var b,x,y,elts=document.getElementsByClassName('_'+i+'_')
if(elts&&elts[0]){elts[0].style.fillOpacity=on?0.4:0
if(on&&!window.no_scroll){b=elts[0].getBoundingClientRect()
if(b.top<0)
y=window.scrollY+b.top-
window.innerHeight/2
else if(b.bottom>window.innerHeight)
y=window.scrollY+b.bottom+
window.innerHeight/2
if(b.left<0)
x=window.scrollX+b.left-
window.innerWidth/2
else if(b.right>window.innerWidth)
x=window.scrollX+b.right+
window.innerWidth/2
if(x!=undefined||y!=undefined)
window.scrollTo(x||0,y||0)}}}}
(function(){var sty=document.createElement("style")
sty.innerHTML=".abcr {fill: #d00000; fill-opacity: 0; z-index: 15}"
document.head.appendChild(sty)})()
