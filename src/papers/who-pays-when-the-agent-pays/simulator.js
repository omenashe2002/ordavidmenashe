// The interactive simulator in the paper (ported from the ALCF Liability Flow artifact). Plain JavaScript, run as it is
// by src/pages/papers/who-pays-when-the-agent-pays/index.astro after the figures it controls.
(function(){
  var $=function(id){return document.getElementById(id)};
  var BOND=100000;
  var S={victim:'third'};
  var names={developer:'Developer',user:'User',inter:'Intermediary',cp:'Counterparty'};
  function c(id){return $(id).checked}
  function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
  var DEV=['d1','d2','d3','d4','d5','d6'];

  function sync(){
    var bonded=c('u3'), tools=c('i2');
    ['u1','u2'].forEach(function(id){var el=$(id);if(!tools){el.checked=false;el.disabled=true}else if(el.disabled){el.disabled=false;el.checked=true}});
    $('unote').hidden=tools;
    $('unote').textContent='The platform offers no guardrail tools, so the User could not set parameters or a verification threshold. That missing shield shifts to the intermediary.';
    ['i3','c1'].forEach(function(id){var el=$(id);if(!bonded){el.checked=false;el.disabled=true}else if(el.disabled){el.disabled=false;el.checked=true}});
    $('inote').hidden=bonded;$('inote').textContent='The agent was unbonded and the intermediary processed it anyway. That is an anchor.';
    $('cnote').hidden=bonded;$('cnote').textContent='The agent was unbonded and the counterparty dealt with it anyway. That is an anchor.';
    $('badge').classList.toggle('bad',!bonded);
    $('badge1').textContent=bonded?'BOND ATTESTATION':'NO ATTESTATION';
    $('badge2').textContent=bonded?'$100,000 · TRUSTEE · EXPIRES':'UNBONDED AGENT';
    $('txdot').classList.toggle('bad',!bonded);
    $('bondamt').textContent=bonded?'$100,000 posted':'nothing posted';
    $('b-bond').classList.toggle('off',!bonded);
  }

  function compute(){
    var H=+$('harm').value, bonded=c('u3');
    var r={liable:{},anch:{},holds:{},segs:[],why:[],chan:[],pays:[],boxes:{},head:''};
    var devShield=DEV.every(c);
    var devLiable=!devShield||c('da');
    var shift=!c('i2');
    var userShield=c('u1')&&c('u2')&&bonded&&!c('ua');
    var userShieldEff=(shift?true:(c('u1')&&c('u2')))&&bonded&&!c('ua');
    var interAnch=c('ia')||!c('i4')||!bonded;
    var interLiable=interAnch||shift;
    var cpAnch=c('ca')||!c('c2')||!bonded;
    r.anch={developer:c('da'),user:c('ua'),inter:interAnch,cp:cpAnch};
    r.holds={developer:devShield&&!c('da'),user:userShield,inter:c('i1')&&c('i2')&&c('i3')&&c('i4')&&!interAnch,cp:c('c1')&&c('c2')&&!cpAnch};

    r.chan.push('ch-1');
    if(devLiable){r.liable.developer=1}
    if(S.victim==='cp'&&cpAnch&&!devLiable&&!interLiable){
      r.liable.cp=1;
      r.segs.push({k:'own',v:H,l:'Counterparty bears its own loss'});
      r.why.push('The counterparty was harmed but is anchored'+(!bonded?' (it dealt with an unbonded agent)':'')+', so it loses the protection of the bond and the pool and bears its own loss.');
      r.head='Counterparty absorbs '+money(H);
      return r;
    }
    var outside=[];
    if(devLiable)outside.push('developer');
    if(interLiable)outside.push('inter');
    if(S.victim==='third'&&cpAnch)outside.push('cp');
    if(c('ua')&&outside.length)outside.push('user');
    if(outside.length){
      outside.forEach(function(k){r.liable[k]=1;r.pays.push('p-'+k)});
      var share=H/outside.length;
      outside.forEach(function(k){r.segs.push({k:k,v:share,l:names[k]})});
      if(devLiable)r.why.push(c('da')?'The agent broke one of its own disclosed restrictions without the User’s authenticated command. The limit was illusory, so the developer is liable.':'The developer cannot show all six shields, so liability stops at the developer and is not channeled to the User.');
      if(interLiable){
        if(shift&&!interAnch)r.why.push('The platform offered no guardrail tools, so the User could not set limits or verification. The liability the User would have borne for those missing shields shifts to the intermediary, and the User’s collateral is not drawn upon.');
        else if(!bonded)r.why.push('The intermediary processed an unbonded agent, which anchors it.');
        else if(!c('i4'))r.why.push('The intermediary kept processing after notice that the agent was compromised, which anchors it.');
        else r.why.push('The intermediary knew or should have known it was serving a rogue agent, which anchors it.');
      }
      if(outside.indexOf('cp')>=0)r.why.push(!bonded?'The counterparty dealt with an unbonded agent, which anchors it.':'The counterparty knew or should have known it was dealing with a rogue agent, which anchors it.');
      if(outside.indexOf('user')>=0)r.why.push('The User also knowingly acted illicitly and is jointly liable.');
      if(outside.length>1)r.why.push('With more than one anchored party, the harmed party may collect the full amount from any of them, jointly and severally, with contribution among them in proportion to fault. The bar shows an even split for illustration.');
      if(!devLiable)r.chan.push('ch-2');
      r.head=(outside.length>1?'Jointly and severally: ':'')+outside.map(function(k){return names[k]}).join(', ');
      if(S.victim==='cp')r.why.unshift('The User disputed the transaction within 90 days, so the counterparty unwound it. Its '+money(H)+' unrecoverable loss is collected from the anchored parties.');
      return r;
    }
    r.chan.push('ch-2');r.liable.user=1;
    if(S.victim==='cp')r.why.push('The User disputed the transaction within 90 days, so the counterparty unwound it. Its unrecoverable loss of '+money(H)+' is paid from the User’s bond, then the pool.');
    else r.why.push('The developer held all six shields, so liability is channeled to the User.');
    if(!bonded){
      r.segs.push({k:'user',v:H,l:'User personally'});r.pays.push('p-user');
      r.why.push('No bond was posted, so the User forfeits its shields and is personally liable for the full amount.');
      r.head='User personally, '+money(H);return r;
    }
    var b=Math.min(H,BOND),ex=H-b;
    r.segs.push({k:'bond',v:b,l:'Bond'});r.pays.push('p-bond');r.boxes.bond=1;
    r.why.push('The harmed party collects '+money(b)+' from the collateral held by the Trustee, at once.');
    if(ex>0){
      r.chan.push('ch-3');
      if(userShieldEff){r.segs.push({k:'pool',v:ex,l:'Pool'});r.pays.push('p-pool');r.boxes.pool=1;
        r.why.push('The harm exceeds the bond by '+money(ex)+'. The User held every shield, so the pool pays the difference and restores the bond.');}
      else{r.segs.push({k:'user',v:ex,l:'User personally'});r.pays.push('p-user');
        r.why.push('The harm exceeds the bond by '+money(ex)+'. '+(c('ua')?'The User knowingly acted illicitly':'The User lacked a shield')+', so the pool does not backstop it, the bond is not restored, and the User owes the excess personally.');}
    } else {
      if(userShieldEff)r.why.push('The harm is within the bond. The User held every shield, so the pool restores the bond.');
      else r.why.push('The harm is within the bond. The User lacked a shield, so the bond is not restored.');
    }
    r.head=r.segs.map(function(s){return s.l+' '+money(s.v)}).join(' + ');
    return r;
  }

  function render(){
    sync();
    var r=compute(), H=+$('harm').value;
    $('harmout').value=money(H);$('harmout').textContent=money(H);
    $('scale-max').textContent=money(H);
    document.querySelectorAll('.chan').forEach(function(e){e.classList.toggle('live',r.chan.indexOf(e.id)>=0)});
    document.querySelectorAll('.pay').forEach(function(e){e.classList.toggle('live',r.pays.indexOf(e.id)>=0)});
    $('b-bond').classList.toggle('live',!!r.boxes.bond);
    $('b-pool').classList.toggle('live',!!r.boxes.pool);
    var bondPaid=0,poolPaid=0;r.segs.forEach(function(s){if(s.k==='bond')bondPaid=s.v;if(s.k==='pool')poolPaid=s.v});
    if(c('u3'))$('bondamt').textContent=bondPaid?('pays '+money(bondPaid)):'$100,000 posted';
    $('poolamt').textContent=poolPaid?('pays '+money(poolPaid)):'backstop';
    ['developer','user','inter','cp'].forEach(function(k){
      var n=$('n-'+k),s=$('s-'+k),dot=$('dot-'+k),card=$('c-'+k);
      var liable=!!r.liable[k], payer=r.pays.indexOf('p-'+k)>=0;
      n.classList.toggle('holds',!!r.holds[k]);
      n.classList.toggle('anch',!!r.anch[k]);
      n.classList.toggle('liable',liable);
      n.classList.toggle('payer',payer);
      card.classList.toggle('active',liable);
      s.className='st';
      if(liable&&payer){s.textContent='liable · pays';s.classList.add('rests')}
      else if(liable){s.textContent=k==='user'?'liability channeled here':'liable';s.classList.add('rests')}
      else if(r.anch[k]){s.textContent='anchored';s.classList.add('anch')}
      else if(r.holds[k]){s.textContent='shielded';s.classList.add('holds')}
      else{s.textContent=(k==='inter'||k==='cp')?'shield down · not anchored':'shield down'}
      dot.className='dot'+(liable?' rests':r.anch[k]?' anch':r.holds[k]?' holds':'');
    });
    $('vt').textContent=S.victim==='cp'?'Counterparty as victim':'Harmed third party';
    $('vs').textContent=(S.victim==='cp'?'UNRECOVERABLE LOSS AFTER UNWIND · ':'HARM · ')+money(H);
    var own=r.segs.some(function(s){return s.k==='own'}), pers=r.segs.some(function(s){return s.k==='user'});
    $('vs2').textContent=own?'NO RECOVERY':pers?'PART DEPENDS ON USER’S ASSETS':'RECOVERS IN FULL';
    var bar=$('bar');bar.innerHTML='';
    var pl=$('paylist');pl.innerHTML='';
    var colors={developer:'var(--charge)',inter:'var(--shield)',cp:'var(--cp)',bond:'var(--pool)',pool:'var(--pool2)',user:'var(--anchor)',own:'var(--own)'};
    r.segs.forEach(function(s){
      var d=document.createElement('div');d.className='seg '+s.k;d.style.flex=s.v+' 0 0';d.textContent=s.v/H>.3?(s.l+' '+money(s.v)):(s.v/H>.12?money(s.v):'');d.title=s.l+' '+money(s.v);bar.appendChild(d);
      var li=document.createElement('span');li.innerHTML='<i style="background:'+colors[s.k]+'"></i>'+s.l+': '+money(s.v);pl.appendChild(li);
    });
    $('v-head').textContent=r.head;
    $('why').textContent=r.why.join(' ');
  }

  function setVictim(v){S.victim=v;document.querySelectorAll('#victimSel button').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-v')===v?'true':'false')});
    $('amtlabel').textContent=v==='cp'?'Counterparty’s unrecoverable loss after unwinding':'Harm';}
  function resetAll(){
    document.querySelectorAll('.controls input[type=checkbox]').forEach(function(i){i.disabled=false;i.checked=!i.closest('label').classList.contains('a')});
  }
  var presets={
    p5:function(){resetAll();setVictim('third');$('harm').value=150000},
    p8:function(){resetAll();setVictim('third');$('i2').checked=false;$('harm').value=100000},
    p9:function(){resetAll();setVictim('cp');$('harm').value=30000},
    p4:function(){resetAll();setVictim('third');$('da').checked=true;$('harm').value=150000},
    illicit:function(){resetAll();setVictim('third');$('ua').checked=true;$('harm').value=200000},
    unbonded:function(){resetAll();setVictim('third');$('u3').checked=false;$('harm').value=120000}
  };
  document.querySelectorAll('.presets button').forEach(function(b){b.addEventListener('click',function(){presets[b.getAttribute('data-p')]();render()})});
  document.querySelectorAll('#victimSel button').forEach(function(b){b.addEventListener('click',function(){setVictim(b.getAttribute('data-v'));render()})});
  document.querySelectorAll('.controls input').forEach(function(i){i.addEventListener('input',render);i.addEventListener('change',render)});
  $('reset').addEventListener('click',function(){resetAll();setVictim('third');$('harm').value=150000;render()});
  var order=['developer','user','inter','cp'];
  function selectTab(k,focus){order.forEach(function(o){var on=o===k,t=$('t-'+o);t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;$('c-'+o).hidden=!on});if(focus)$('t-'+k).focus()}
  $('simulator').querySelectorAll('.tab').forEach(function(t){
    t.addEventListener('click',function(){selectTab(t.getAttribute('data-k'))});
    t.addEventListener('keydown',function(e){var i=order.indexOf(t.getAttribute('data-k')),n=null;
      if(e.key==='ArrowRight')n=(i+1)%4;else if(e.key==='ArrowLeft')n=(i+3)%4;else if(e.key==='Home')n=0;else if(e.key==='End')n=3;
      if(n!==null){e.preventDefault();selectTab(order[n],true)}});
  });
  order.forEach(function(k){$('n-'+k).addEventListener('click',function(){selectTab(k)})});
  render();
})();
