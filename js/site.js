(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
var WA="254738281177";
var nav=$('#nav'),burger=$('#burger');
function solid(){nav.classList.toggle('is-solid',window.scrollY>40)}solid();window.addEventListener('scroll',solid,{passive:true});
burger.addEventListener('click',function(){var o=d.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o)});
$$('#links a').forEach(function(a){a.addEventListener('click',function(){d.body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false')})});
var y=$('#yr');if(y)y.textContent=new Date().getFullYear();
/* gallery */
var gts=$$('.gt'),cur=0,vis=[];
$$('.fbtn').forEach(function(b){b.addEventListener('click',function(){$$('.fbtn').forEach(function(x){x.setAttribute('aria-pressed',x===b)});var f=b.dataset.f;gts.forEach(function(g){g.hidden=!(f==='all'||g.dataset.c===f)});if(window.ScrollTrigger)ScrollTrigger.refresh()})});
var lb=$('#lb');
function show(i){vis=gts.filter(function(g){return!g.hidden});cur=(i+vis.length)%vis.length;var g=vis[cur];$('img',lb).src=g.dataset.full;$('img',lb).alt=g.dataset.cap;var s=$$('figcaption span',lb);s[0].textContent=g.dataset.cap;s[1].textContent=(cur+1)+' / '+vis.length}
gts.forEach(function(g){g.addEventListener('click',function(){vis=gts.filter(function(x){return!x.hidden});show(vis.indexOf(g));lb.classList.add('is-open');$('.x',lb).focus()})});
function close(){lb.classList.remove('is-open')}
if(lb){$('.x',lb).onclick=close;$('.pv',lb).onclick=function(){show(cur-1)};$('.nx',lb).onclick=function(){show(cur+1)};lb.addEventListener('click',function(e){if(e.target===lb)close()});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)})}
/* form */
var f=$('#qf');if(f)f.addEventListener('submit',function(e){e.preventDefault();var n=f.name.value.trim();if(!n){$('#err').textContent='Please add your name.';return}$('#err').textContent='';
var t='Hello Kizito Camping Gear, I am '+n+(f.phone.value?' ('+f.phone.value+')':'')+'. I am interested in: '+f.topic.value+'.'+(f.msg.value?'\n'+f.msg.value:'');
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener')});
/* motion */
if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(reduce)return;
if(window.Lenis){var lenis=new Lenis({lerp:.1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
/* split headings into words */
$$('[data-split]').forEach(function(el){var out=[];el.childNodes.forEach(function(n){if(n.nodeType===3){n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){out.push(w)}else out.push('<span class="w" style="display:inline-block;overflow:hidden;vertical-align:top"><span class="wi" style="display:inline-block">'+w+'</span></span>')})}else out.push(n.outerHTML||'')});el.innerHTML=out.join('');
 var wi=$$('.wi',el);gsap.from(wi,{yPercent:110,duration:.9,ease:'power4.out',stagger:.045,scrollTrigger:{trigger:el,start:'top 88%'}})});
gsap.utils.toArray('[data-reveal]').forEach(function(el){gsap.from(el,{y:50,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}})});
gsap.utils.toArray('[data-par] img').forEach(function(im){gsap.fromTo(im,{scale:1.18,yPercent:-6},{scale:1,yPercent:6,ease:'none',scrollTrigger:{trigger:im.closest('.frame'),start:'top bottom',end:'bottom top',scrub:true}})});
gsap.utils.toArray('[data-bandpar]').forEach(function(b){gsap.fromTo(b,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:b.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
gsap.utils.toArray('[data-heropar]').forEach(function(b){gsap.to(b,{yPercent:14,ease:'none',scrollTrigger:{trigger:b.parentNode,start:'top top',end:'bottom top',scrub:true}})});
/* pinned sideways sections */
$$('.hdiv').forEach(function(hd){
 var tr=$('.hdiv-track',hd),pin=$('.hdiv-pin',hd),prog=$('.hdiv-prog i',hd),h=$('.hint',hd),dp=$('.dsec[data-light]',hd);
 var dist=function(){return Math.max(0,tr.scrollWidth-window.innerWidth)};
 gsap.to(tr,{x:function(){return-dist()},ease:'none',scrollTrigger:{trigger:hd,start:'top top',end:function(){return'+='+Math.round(dist()*(window.innerWidth<700?2.1:1.8))},pin:pin,scrub:1.1,invalidateOnRefresh:true,anticipatePin:1,onUpdate:function(s){prog.style.transform='scaleX('+s.progress+')';
  if(h){if(dp){var r=dp.getBoundingClientRect();h.classList.toggle('is-light',r.left<window.innerWidth-150)}h.classList.toggle('is-off',s.progress>.985);h.classList.add('is-moving');clearTimeout(h._t);h._t=setTimeout(function(){h.classList.remove('is-moving')},260)}}}})});
/* fleet pan */
var pan=$('#pan');
if(pan){var pi=$('.pan-img',pan);gsap.to(pi,{x:function(){return-(pi.offsetWidth-pan.offsetWidth)},ease:'none',scrollTrigger:{trigger:pan,start:'top top',end:function(){return'+='+Math.max(900,Math.round((pi.offsetWidth-pan.offsetWidth)*1.8))},pin:true,scrub:1.1,invalidateOnRefresh:true}})}
gsap.from('.hero .tags,.hero .lede,.hero .btns,.hero .crumb',{y:30,opacity:0,duration:1,delay:.35,stagger:.12,ease:'power3.out'});
window.addEventListener('load',function(){ScrollTrigger.refresh()});
})();
