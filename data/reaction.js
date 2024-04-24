

var alphabet_en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var alphabet_am = 'ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԽՂՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖ';
var alphabet_ru = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var alphabet_reaction;
var currentLetterIndex = 0;
var alphabetButtons = document.querySelectorAll('.reaction-td button');
var gameInterval = null;
var seconds_reaction = 0;
var width = 6;


function returnMenu_fromReaction()
{
  clearInterval(gameInterval);
  gameInterval = null;
  menu();
}


function createTable()
{
  if(localStorageLanguage=="am")
  {
    alphabet_reaction= alphabet_am;
    width=9;
  }
  else if(localStorageLanguage=="ru")
  {
    alphabet_reaction= alphabet_ru;
    width=7;
  }
  else
  {
    alphabet_reaction= alphabet_en;
    width=6;
  }


  var table = document.getElementById("reaction-table");
  table.innerHTML = "";
  var e = 0;
  var curtr;
  curtr = document.createElement("tr");
  curtr.classList.add("reaction-tr");
  table.appendChild(curtr);
  for(let i =0;i<alphabet_reaction.length;i++)
  {
    var td = document.createElement("td");
    console.log(td)
    td.classList.add("reaction-td");
    var but =  document.createElement("button");
    but.id = "reaction_button_"+alphabet_reaction[i];
    but.innerHTML = alphabet_reaction[i];
    td.appendChild(but);
    curtr.appendChild(td);
    e++;
    if(e>=width)
    {
      curtr = document.createElement("tr");
      curtr.classList.add("reaction-tr");
      table.appendChild(curtr);
      e=0;
    }
    // console.log(curtr);
    
  }
}


function randomizeAlphabet() {
  createTable();
  alphabetButtons = document.querySelectorAll('.reaction-td button');
  stopMusic()
  hideWords();
  open_p(10);
  seconds_reaction = 0;
  currentLetterIndex = 0;
  var shuffledAlphabet = alphabet_reaction.split('').sort(function() { return 0.5 - Math.random(); }).join('');
   
  for (var i = 0; i < alphabetButtons.length; i++) {
        alphabetButtons[i].classList.remove("fadeout-reaction");
      alphabetButtons[i].innerHTML = shuffledAlphabet[i];
      alphabetButtons[i].onclick = (function(index,element) {
        return function() {
          handleButtonClick(shuffledAlphabet[index],element);
        };
      })(i,alphabetButtons[i]);
    }
    document.getElementById("scoretext-reaction").innerHTML = seconds_reaction;
    document.getElementById("hscoretext-reaction").innerHTML = localStorage.typinggame_besttime_reaction;
    if(gameInterval==null)
    {
        gameInterval = setInterval(secondsReactionGo,1000);
    }
  }

  function secondsReactionGo()
  {
    document.getElementById("scoretext-reaction").innerHTML = seconds_reaction;
    document.getElementById("hscoretext-reaction").innerHTML = localStorage.typinggame_besttime_reaction;
    localStorage.typinggame_secondsingame++;
    seconds_reaction++;
  }

  function handleButtonClick(letter,element) {
   
    console.log(letter)
    if (letter == alphabet_reaction[currentLetterIndex]) {
        playSound(correctAnswerAudio);
      element.classList.add("fadeout-reaction");
      currentLetterIndex++;
      if (currentLetterIndex === alphabet_reaction.length) {
        clearInterval(gameInterval);
       gameInterval = null;
       document.getElementById("reaction-results").innerHTML = seconds_reaction;
       showWords();
       if(localStorage.typinggame_besttime_reaction>seconds_reaction||localStorage.typinggame_besttime_reaction==0)
       {
         localStorage.typinggame_besttime_reaction = seconds_reaction;
       }
       open_p(11);
    
      }
    }
    else
    {
        playSound(wrongAnswerAudio);
        playAnim(element.id,"wrong-reaction",300)
    }
}