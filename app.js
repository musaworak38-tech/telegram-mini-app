const content=document.getElementById('content');
const slipItems=document.getElementById('slipItems');
const stake=document.getElementById('stake');
const potential=document.getElementById('potential');
let selections=[];

const football=[
 ['Arsenal','Chelsea',['1.90','3.50','4.10']],
 ['Barcelona','Real Madrid',['2.20','3.60','2.75']],
 ['Liverpool','Man City',['2.45','3.45','2.55']],
 ['Inter','Juventus',['2.05','3.20','3.70']]
];

const games=[
 ['aviator','✈️','Aviator','Spribe'],
 ['keno','🎯','Fast Keno','Virtual'],
 ['chicken-coin','🐔','777 Chicken Coin','Virtual'],
 ['chicken-road-2','🐔','Chicken Road 2','InOut'],
 ['jetx','🚀','JetX','Virtual'],
 ['chicken-shoot','🎯','Chicken Shoot','Virtual'],
 ['joker-pyre','🃏','Joker Pyre','InOut'],
 ['safari-simba','🦁','Safari Simba','SmartSoft Gaming'],
 ['bao-slot-5x','🐉','Bao Slot 5X','SmartSoft Gaming'],
 ['hot-samba','🔥','Hot Samba','SmartSoft Gaming'],
 ['foxy-hot-20','🦊','Foxy Hot 20','SmartSoft Gaming']
];

function render(game='football'){
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('active',b.dataset.game===game));
  if(game==='football'){
    content.innerHTML='<h2>⚽ Football</h2>'+football.map(m=>`
      <div class="card"><div class="match"><div class="teams">${m[0]} vs ${m[1]}</div><small>1X2</small></div>
      <div class="odds">${m[2].map((o,j)=>`<button class="odd" onclick="addBet('${m[0]} vs ${m[1]}','${['Home','Draw','Away'][j]}',${o})">${['Home','Draw','Away'][j]} ${o}</button>`).join('')}</div></div>`).join('');
    return;
  }
  if(game==='keno'){
    content.innerHTML='<h2>🎯 Fast Keno</h2><div class="card"><p>Select numbers for a Keno ticket.</p><div class="grid">'+
      Array.from({length:40},(_,i)=>`<button class="odd" onclick="toggleNum(this,${i+1})">${i+1}</button>`).join('')+
      '</div><button class="pick" onclick="addBet(\'Fast Keno\',\'Selected numbers\',2)">Add Keno ticket • 2.00x</button></div>';
    return;
  }
  const found=games.find(x=>x[0]===game);
  content.innerHTML=`<h2>${found[1]} ${found[2]}</h2>
    <div class="card"><h3>${found[2]}</h3><p class="muted">Provider: ${found[3]}</p>
    <p>Game is ready to be connected to your licensed game provider/API.</p>
    <button class="pick" onclick="addBet('${found[2]}','Play',2)">Select • 2.00x</button></div>`;
}

function renderAllGames(){
  content.innerHTML='<h2>🎮 All Games</h2><div class="grid">'+games.map(g=>`
    <div class="game-tile"><div class="game-icon">${g[1]}</div><h3>${g[2]}</h3><p class="muted">${g[3]}</p>
    <button class="pick" onclick="render('${g[0]}')">Open</button></div>`).join('')+'</div>';
}

function toggleNum(el,n){el.classList.toggle('active');el.style.background=el.classList.contains('active')?'#16a34a':''}
function addBet(event,pick,odd){selections.push({event,pick,odd});updateSlip()}
function updateSlip(){
  slipItems.innerHTML=selections.length?selections.map((s,i)=>`<div class="card"><b>${s.event}</b><br>${s.pick} • ${s.odd}x <button onclick="removeBet(${i})">×</button></div>`).join(''):'<p class="muted">No selections yet.</p>';
  const mult=selections.reduce((a,s)=>a*s.odd,1);
  potential.textContent='ETB '+(Number(stake.value||0)*mult).toFixed(2);
}
function removeBet(i){selections.splice(i,1);updateSlip()}
stake.addEventListener('input',updateSlip);

document.querySelectorAll('#tabs button').forEach(b=>b.addEventListener('click',()=>render(b.dataset.game)));
document.getElementById('placeBtn').addEventListener('click',()=>alert('Bet submission is not connected. Connect a licensed backend/payment provider and implement authentication, KYC/age checks, wallet, odds validation and secure bet settlement before accepting real money.'));
document.getElementById('loginBtn').addEventListener('click',()=>alert('Login screen can be connected to your authentication backend.'));
render();
