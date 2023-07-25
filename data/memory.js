
var alphabet_en_memory = ['ABAB','ABCDABCD','ABCDEFABCDEF'];
var alphabet_am_memory = ['ԱԲԱԲ','ԱԲԳԴԱԲԳԴ','ԱԲԳԴԵԶԱԲԳԴԵԶ'];
var alphabet_ru_memory = ['АБАБ','АБВГАБВГ','АБВГДЕАБВГДЕ'];
var totalRounds = 3;
var seconds_rounds= [5,20,40];
var alphabet_mem;
var round = 0;
var correctCount = 0;
var selectedEl;
var seconds_memgame;
var MemgameInterval=null;



function menu_from_memory_game(){
  menu();
  clearInterval(MemgameInterval);
  MemgameInterval = null;
}
function startMemoryGame(){
  if(round>=totalRounds)
{
  clearInterval(MemgameInterval);
    MemgameInterval = null;
    open_p(14);
    showWords();
    playMusic();
}
else
{
  if(MemgameInterval==null)
  {
    round = 0;
    MemgameInterval = setInterval(memgame_interval,1000);
  }
  seconds_memgame = seconds_rounds[round];
  document.getElementById("memgame-seconds").innerHTML = seconds_memgame;
  
  document.getElementById("memgame-round").innerHTML = round+1;
  correctCount =0;
    hideWords();
    stopMusic();
    if(localStorageLanguage=="am")
    {
      alphabet_mem= alphabet_am_memory[round];
    }
    else if(localStorageLanguage=="ru")
    {
      alphabet_mem= alphabet_ru_memory[round];
    }
    else
    {
      alphabet_mem= alphabet_en_memory[round];
    }
    alphabet_mem = alphabet_mem.split('').sort(function() { return 0.5 - Math.random(); }).join('');
    playAnim("memgame","fadeincontainer",300);
    open_p(13);
    createTable_memory();
}
  
}
function memgame_interval()
{
  localStorage.typinggame_secondsingame++;
  seconds_memgame--;
  document.getElementById("memgame-seconds").innerHTML = seconds_memgame;
  if(seconds_memgame<0)
  {
    clearInterval(MemgameInterval);
    MemgameInterval = null;
    open_p(7);
    showWords();
    playMusic();
  }
}
function createTable_memory()
{
  var table = document.getElementById("memgame-table");
  table.innerHTML = "";
  var e = 0;
  var curtr;
  curtr = document.createElement("tr");
  curtr.classList.add("reaction-tr");
  table.appendChild(curtr);
  for(let i =0;i<alphabet_mem.length;i++)
  {
    var td = document.createElement("td");
    console.log(td)
    td.classList.add("reaction-td");
    var but =  document.createElement("button");
    if(document.getElementById("reaction_button_"+alphabet_mem[i]+"1") == null)
    {
        but.id = "reaction_button_"+alphabet_mem[i]+"1";
    }
    else
    {
        but.id = "reaction_button_"+alphabet_mem[i]+"2";
    }
  
    but.onclick = (function(id,pt) {
        return function() {
            memgame_handle(id,pt);
        };
      })(but.id,alphabet_mem[i]);
    
    but.innerHTML = "";
    td.appendChild(but);
    curtr.appendChild(td);
    e++;
    if(e>=alphabet_mem.length/2)
    {
      curtr = document.createElement("tr");
      curtr.classList.add("reaction-tr");
      table.appendChild(curtr);
      e=0;
    }
    // console.log(curtr);
    
  }
}

function memgame_handle(id,pt)
{
    
    if(selectedEl ==null)
    {
        selectedEl = document.getElementById(id);
        console.log("setting first");
        selectedEl.innerHTML = pt;
    }
    else
    {
       
        if(selectedEl.id.slice(0, -1) == id.slice(0, -1) && selectedEl.id!=id)
        {
            document.getElementById(id).innerHTML = pt;
            document.getElementById(id).classList.add("fadeout-reaction");
            selectedEl.classList.add("fadeout-reaction");
            selectedEl = null; playSound(c);
            console.log("correct");
            correctCount+=2;
        }
       else {
        console.log("wrong");
        playSound(w);
        playAnim(id,"wrong-reaction-fadeout",300);
        playAnim(selectedEl.id,"wrong-reaction-fadeout",300);
        document.getElementById(id).innerHTML = pt;
        setTimeout(function(){document.getElementById(id).innerHTML = "";
        selectedEl.innerHTML = ""; selectedEl = null;},300);
       }
       if(correctCount>=alphabet_mem.length)
      {
        round++;
        
        startMemoryGame();
      }
      
    }
}