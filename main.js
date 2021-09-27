(()=>{"use strict";const t=t=>{if(t<2||t>5)return;const e=new Array(t);for(let t=0;t<e.length;t++)e[t]=!1;return{id:void 0,axis:void 0,firstRow:void 0,firstColumn:void 0,length:t,hit:t=>{e[t]=!0},isSunk:()=>{for(let t=0;t<e.length;t++)if(!1===e[t])return!1;return!0}}},e=(t,e)=>Math.floor(Math.random()*(e-t))+t,n=()=>["x","y"][e(0,2)],o=t=>{let e,n;const o=t.toString();return 1===o.length?(e=0,n=Number(o[0])):2===o.length&&(e=Number(o[0]),n=Number(o[1])),[e,n]},l=(t,e)=>{const n=t,o=e;for(let t=0;t<n.length;t++){let e=0;for(let l=0;l<n[t].length;l++)n[t][l]===o[l]&&(e+=1);if(e===o.length)return!0}return!1},r=o=>{const r=(t=>{const e=new Array(t);for(let n=0;n<e.length;n++)e[n]=new Array(t).fill("");let n=[],o=[];return{rows:e,allShips:n,missedShots:o,placeShip:(o,l,r,s)=>{if(o.axis=l,o.firstRow=r,o.firstColumn=s,(e=>{if("x"===e.axis){if(e.firstColumn+e.length-1>=t)return!0}else if("y"===e.axis&&e.firstRow+e.length-1>=t)return!0;return!1})(o)||(t=>{if("x"===t.axis){const n=t.firstRow,o=t.firstColumn+t.length-1;for(let l=t.firstColumn;l<=o;l++)if(""!=e[n][l])return!0}else if("y"===t.axis){const n=t.firstRow+t.length-1,o=t.firstColumn;for(let l=t.firstRow;l<=n;l++)if(""!=e[l][o])return!0}return!1})(o))return"Invalid position";if(n.push(o),o.id=n.length-1,"x"===l){const t=r,n=s+o.length-1;for(let l=s;l<=n;l++)e[t][l]=`S${o.id}`}else if("y"===l){const t=s,n=r+o.length-1;for(let l=r;l<=n;l++)e[l][t]=`S${o.id}`}},receiveAttack:(t,l)=>{const r=e[t][l];if("S"===r[0]){const o=r.slice(1),s=n[o];e[t][l]=`X${o}`;const a=((t,e,n)=>{const o=n.firstRow,l=n.firstColumn;let r=0;if("x"===n.axis){const t=l+n.length-1;for(let n=l;n<=t;n++){if(n===e)return r;r++}}else if("y"===n.axis){const e=o+n.length-1;for(let n=o;n<=e;n++){if(n===t)return r;r++}}})(t,l,s);s.hit(a)}else{const e=((t,e)=>({row:t,column:e}))(t,l);o.push(e)}},allShipsSunk:()=>{for(let t=0;t<n.length;t++)if(!1===n[t].isSunk())return!1;return!0}}})(10),s=[],a=(t,e,n)=>{s.push([e,n]),t.receiveAttack(e,n)};return{name:o,board:r,allPlays:s,attackEnemyBoard:a,placeShipsRandomly:()=>{const o=[t(5),t(4),t(3),t(3),t(2)];for(let t=0;t<o.length;t++){const l=o[t],s=n(),a=e(0,10),i=e(0,10);let c=r.placeShip(l,s,a,i);for(;"Invalid position"===c;){const t=n(),o=e(0,10),s=e(0,10);c=r.placeShip(l,t,o,s)}}},randomPlay:t=>{if(s.length>0){const n=s[s.length-1],o=n[0],r=n[1];if("X"===t.rows[o][r][0]){const n=((t,n,o)=>{const r=((t,e)=>{const n=[],o=[[t-1,e],[t,e-1],[t,e+1],[t+1,e]];for(let t=0;t<o.length;t++){const e=o[t];e[0]>=0&&e[0]<=9&&e[1]>=0&&e[1]<=9&&n.push(e)}return n})(n,o),s=[];for(let e=0;e<r.length;e++){const n=r[e];l(t,n)||s.push(n)}return 0===s.length?"None":s[e(0,s.length)]})(s,o,r);if("None"!==n){const e=n[0],o=n[1];return a(t,e,o),[e,o]}}}let n=e(0,10),o=e(0,10);for(;l(s,[n,o]);)n=e(0,10),o=e(0,10);return a(t,n,o),[n,o]}}},s=t=>{const e=t.board.allShips,n=document.getElementsByClassName("square"),o=[];if("computer"===t.name.toLowerCase())for(let t=100;t<200;t++)o.push(n[t]);else for(let t=0;t<100;t++)o.push(n[t]);for(let t=0;t<e.length;t++){const n=e[t],l=10*n.firstRow+n.firstColumn;let r;"x"===n.axis?r=l+n.length-1:"y"===n.axis&&(r=l+10*n.length-1);let s=l;for(;s<=r;)o[s].style.backgroundColor="green","x"===n.axis?s++:"y"===n.axis&&(s+=10)}},a=t=>{const e=`${t.name} won!`;alert(e),document.getElementById("title").textContent=e,document.getElementById("replay-btn").style.display="block"},i=(t,e,n,l)=>{const r=o(e)[0],s=o(e)[1];l.attackEnemyBoard(n.board,r,s),"X"===n.board.rows[r][s][0]&&(t.style.backgroundColor="red"),t.textContent="X",n.board.allShipsSunk()&&a(l)},c=(t,e)=>{const n=t.randomPlay(e.board),o=n[0],l=n[1];let r=o.toString()+l.toString();r=Number(r);const s=document.getElementsByClassName("square")[r];s.textContent="X","X"===e.board.rows[o][l][0]&&(s.style.backgroundColor="red"),e.board.allShipsSunk()&&a(t)},d=t=>{document.getElementById("title").textContent="The game has started!";const e=r("Computer");e.placeShipsRandomly();const n=document.getElementsByClassName("square");for(let o=100;o<n.length;o++){const l=n[o];l.addEventListener("click",(()=>{let n=t.board.allShipsSunk()||e.board.allShipsSunk();n||"X"!==l.textContent&&(i(l,o-100,e,t),n=t.board.allShipsSunk()||e.board.allShipsSunk(),n||c(e,t))}))}};document.getElementById("new-game-btn").addEventListener("click",(()=>{const e=document.getElementById("player-name").value;if(""===e.trim()||"computer"===e.toLowerCase().trim())return alert("Invalid name. Try again."),void(document.getElementById("player-name").value="");const n=r(e);(t=>{document.getElementById("new-game").style.display="none";const e=document.getElementById("container");e.style.display="grid";const n=document.createElement("div");n.className="board",n.id="player-board";const o=document.createElement("div");o.className="board",o.id="computer-board";const l=[n,o];for(let n=0;n<l.length;n++){const o=l[n];o.style.display="grid";const r=document.createElement("div");r.className="board-div";const s=document.createElement("div");s.className="board-title","player-board"===o.id?s.textContent=`${t.name}'s board`:"computer-board"===o.id&&(s.textContent="Computer's board"),r.append(s),r.append(o),e.append(r);for(let t=0;t<100;t++){const t=document.createElement("div");t.className="square",o.append(t)}}const r=document.createElement("button");r.id="toggle-btn",r.className="button",r.textContent="Horizontal",document.getElementsByClassName("board-div")[0].append(r),s(t)})(n),(e=>{const n=document.getElementById("title");n.textContent="Place your carrier";const l=document.getElementById("toggle-btn");l.style.display="block",l.addEventListener("click",(()=>{"Horizontal"===l.textContent?l.textContent="Vertical":"Vertical"===l.textContent&&(l.textContent="Horizontal")}));const r=document.getElementsByClassName("square");for(let a=0;a<100;a++)r[a].addEventListener("click",(()=>{let r,i=e.board.allShips.length;if(0===i)r=5;else if(1===i)r=4;else if(2===i)r=3;else if(3===i)r=3;else if(4===i)r=2;else if(5===i)return;const c=t(r);let u;"Horizontal"===l.textContent?u="x":"Vertical"===l.textContent&&(u="y");const m=o(a)[0],f=o(a)[1];e.board.placeShip(c,u,m,f),s(e),i=e.board.allShips.length,1===i?n.textContent="Place your battleship":2===i?n.textContent="Place your cruiser":3===i?n.textContent="Place your submarine":4===i?n.textContent="Place your destroyer":5===i&&(n.textContent=`${e.name}'s board`,l.style.display="none",d(e))}))})(n)})),document.getElementById("replay-btn").addEventListener("click",(()=>{location.reload()}))})();