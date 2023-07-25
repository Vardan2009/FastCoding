


if(!localStorage.getItem("typinggame_highscore"))
{
    console.log("Player First time entering the game")
    localStorage.setItem("typinggame_highscore",0)
    localStorage.setItem("typinggame_besttime_reaction",0)
    localStorage.setItem("typinggame_wordstyped",0)
    localStorage.setItem("typinggame_cwords",0)
    localStorage.setItem("typinggame_ckeys",0)
    localStorage.setItem("typinggame_wwords",0)
    localStorage.setItem("typinggame_secondsingame",0)
    localStorage.setItem("typinggame_lang","en")
}
var audio = new Audio('assets/sounds/menu.mp3');
audio.loop = true;
var openpage = new Audio('assets/sounds/page.mp3');
var hscore = new Audio('assets/sounds/hscore.mp3');
var c = new Audio('assets/sounds/c.mp3');
var w = new Audio('assets/sounds/w.mp3');
var countdown_sound = new Audio('assets/sounds/countdown.mp3');
var bell = new Audio('assets/sounds/bell.mp3');
audio.volume =0; 
var realaudio = 0;
var lang_listening;
var languageString = "English";
var localStorageLanguage = localStorage.getItem("typinggame_lang");

Array.prototype.forEach.call(document.getElementsByClassName("langimg"), function(el) {
  el.classList.remove("selectimg")
  console.log(el.tagName);
});

document.getElementById("changelang_"+localStorageLanguage).classList.add("selectimg");
if(localStorageLanguage == "en")
{
languageString = "English";

lang_listening = "en";
document.getElementById("language_indicator_reaction").src = "assets/lang/en.png";
document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
document.getElementById("language_indicator_memory").src = "assets/lang/en.png";
}
else if (localStorageLanguage == "am")
{
  languageString= "Armenian";

  lang_listening = "am";
  document.getElementById("language_indicator_reaction").src = "assets/lang/am.png";
  document.getElementById("language_indicator_listening").src = "assets/lang/am.png";
  document.getElementById("language_indicator_memory").src = "assets/lang/am.png";
}
else if (localStorageLanguage == "ru")
{
  languageString= "Russian";

  lang_listening = "en";
  document.getElementById("language_indicator_reaction").src = "assets/lang/ru.png";
  document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
  document.getElementById("language_indicator_memory").src = "assets/lang/ru.png";
}
else if (localStorageLanguage == "de")
{
languageString= "German";

lang_listening = "en";
document.getElementById("language_indicator_reaction").src = "assets/lang/en.png";
document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
document.getElementById("language_indicator_memory").src = "assets/lang/en.png";
}
changeLang_keyboard(localStorageLanguage);
document.getElementById("language_indicator_training").src = "assets/lang/"+localStorageLanguage+".png";
document.getElementById("language-specify").innerHTML = languageString;
document.getElementById("language-specify-settings").innerHTML = languageString;
document.getElementById("language_indicator_typing").src = "assets/lang/"+localStorageLanguage+".png";



function changeLang(newLang)
{
  Array.prototype.forEach.call(document.getElementsByClassName("langimg"), function(el) {
    el.classList.remove("selectimg")
    console.log(el.tagName);
  });
  
  document.getElementById("changelang_"+newLang).classList.add("selectimg");
  playSound(openpage);
  localStorage.setItem("typinggame_lang",newLang);
  localStorageLanguage = newLang;

  if(localStorageLanguage == "en")
  {
  languageString = "English";
  
  lang_listening = "en";
  document.getElementById("language_indicator_reaction").src = "assets/lang/en.png";
  document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
  document.getElementById("language_indicator_memory").src = "assets/lang/en.png";
  }
  else if (localStorageLanguage == "am")
  {
    languageString= "Armenian";
  
    lang_listening = "am";
    document.getElementById("language_indicator_reaction").src = "assets/lang/am.png";
    document.getElementById("language_indicator_listening").src = "assets/lang/am.png";
    document.getElementById("language_indicator_memory").src = "assets/lang/am.png";
  }
  else if (localStorageLanguage == "ru")
  {
    languageString= "Russian";
  
    lang_listening = "en";
    document.getElementById("language_indicator_reaction").src = "assets/lang/ru.png";
    document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
    document.getElementById("language_indicator_memory").src = "assets/lang/ru.png";
  }
  else if (localStorageLanguage == "de")
  {
  languageString= "German";
  
  lang_listening = "en";
  document.getElementById("language_indicator_reaction").src = "assets/lang/en.png";
  document.getElementById("language_indicator_listening").src = "assets/lang/en.png";
  document.getElementById("language_indicator_memory").src = "assets/lang/en.png";
  }
  changeLang_keyboard(localStorageLanguage);
document.getElementById("language_indicator_training").src = "assets/lang/"+localStorageLanguage+".png";
  document.getElementById("language-specify").innerHTML = languageString;
  document.getElementById("language-specify-settings").innerHTML = languageString;
  document.getElementById("language_indicator_typing").src = "assets/lang/"+localStorageLanguage+".png";
  playAnim("language-specify-settings","fadeincontainer",300);
}

var checkkeya = function(a){
  checkKey(a)
};
function keyboardGame()
{
  hideWords();
  stopMusic();
 document.addEventListener("keydown", checkkeya);
  open_p(3);
}
function menuKeyboard()
{
   document.removeEventListener("keydown", checkkeya);
  menu();
}
function toggleSong()
{
    if(audio.volume==0)
    {
        document.getElementById("volumebutton").className = "fa-solid fa-volume-high";
        realaudio = 1;
       
        playMusic(false)
    }
    else
    {
        document.getElementById("volumebutton").className = "fa-solid fa-volume-off";
        realaudio = 0;
        stopMusic(false);

    }
}


function playMusic(check = true) {
   if (audio.volume==0||!check)
   {
    audio.volume = 0;  
    audio.currentTime = 0;
    audio.play();
  
    var interval = setInterval(function() {
      if (audio.volume < 1) {
        audio.volume = Math.min(1, audio.volume + 0.1)*realaudio;  
      } else {
        clearInterval(interval);
      }
    }, 100); 
   }
    
   
   
  }
  
  function stopMusic(check = true) {
    if (audio.volume==1||!check)
    {
  
    var interval = setInterval(function() {
      if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - 0.1)*realaudio;  
      } else {
        audio.pause();
        clearInterval(interval);
      }
    }, 100);  
}
}
  
  


var countdown = 3;
var seconds = 5;
var listening_score = 0;
var started = false;
function menu()
{
    playSound(openpage)
    showWords();
    pages.forEach(element => element.style.display = "none");
    pages[0].style.display = "block";
    playMusic()
}
function open_p(pagenum)
{
  if(page_sound[pagenum])
      playSound(openpage)
   pages.forEach(element => element.style.display = "none");
    pages[pagenum].style.display = "block";
    
}
var ctdn;
var hscoreachieved = false;
var mainGameInterval;
function startTyping()
{
  document.getElementById("typing").value = "";
    stopMusic();
    hideWords();
    open_p(2);
    countdown=3;
    score=0;
    hscoreachieved = false;
    document.getElementById("hscoreachievedh4").style.display = "none";
    playAnim("start-count","fadeincontainer",500);
    document.getElementById("time_text").innerHTML = seconds;
    document.getElementById("hscoretext").innerHTML = localStorage.typinggame_highscore;
   
    document.getElementById("scoretext").innerHTML = score;
    document.getElementById("start-count").innerHTML = countdown;
    playSound(countdown_sound);
    ctdn = setInterval(countDown,1000);
}



function startListening()
{
    stopMusic()
    hideWords();
    countdown=3;
    document.getElementById("start-count").innerHTML = "3";
    
    open_p(2);
    listening_score=0;
    document.getElementById("scoretext_listening").innerHTML = listening_score;
    hscoreachieved = false;
    seconds =10;
    playAnim("start-count","fadeincontainer",500);
    playSound(countdown_sound);
    ctdn = setInterval(countDown_Listening,1000);
}
function countDown_Listening()
{
    if(countdown<=0)
    {
        clearInterval(ctdn);
        open_p(9);
        listen();
        seconds =10;
        mainGameInterval = setInterval(secondsGo_listening,1000);
    }
    playAnim("start-count","fadeincontainer",500);
    countdown--;

    if(countdown==0)
    {
        document.getElementById("start-count").innerHTML = "Listen!";
        playSound(bell);
    }
    else
    {
        document.getElementById("start-count").innerHTML = countdown;
        playSound(countdown_sound);
    }
}
function listen()
{
  document.getElementById("typing_listening").value = "";
  if(lang_listening == "en")
  {
    word = voices_en[Math.floor(Math.random()*voices_en.length)]
  }
  else if (lang_listening == "am")
  {
    word = voices_am[Math.floor(Math.random()*voices_am.length)]
  }
  document.getElementById("myAudio").volume =1;
  document.getElementById("myAudio").src = "assets/sounds/words/"+lang_listening+"/"+word+".mp3";
  document.getElementById("myAudio").play();
}
function update_listening()
{
  localStorage.typinggame_wordstyped++;
  if(document.getElementById("typing_listening").value.toLowerCase()==word.toLowerCase())
  {
    playAnim("time_text_listening","correctwordanim",400);
    playAnim("scoretext_listening","correctwordanim",400);
    playAnim("scorelogo_listening","correctwordanim",400);
    
    localStorage.typinggame_cwords++;

    seconds+=5;
    document.getElementById("time_text_listening").innerHTML = seconds;
    playSound(c);
    listening_score++;
  }
  else
  {
    playAnim("time_text_listening","wrongwordanim",400);
    playAnim("scoretext_listening","wrongwordanim",400);
    playAnim("scorelogo_listening","wrongwordanim",400);

    localStorage.typinggame_cwords++;

    seconds-=3;
    loseCondition();
    document.getElementById("time_text_listening").innerHTML = seconds;
    playSound(w);
    
  }

  playAnim("playButton","fadeincontainer",500);
  document.getElementById("time_text_listening").innerHTML = seconds;
  document.getElementById("scoretext_listening").innerHTML = listening_score;
  listen();
}
function loseCondition()
{
  if(seconds<0)
  {
      playMusic();
      showWords();
      clearInterval(mainGameInterval);
      started = false;
      open_p(7);
  }
}
function secondsGo()
{
   
    seconds--;
    document.getElementById("time_text").innerHTML = seconds;
    localStorage.typinggame_secondsingame++;
   loseCondition();
}
function HowToPlayScreen()
{
 
  open_p(12);
}

function secondsGo_listening()
{
  
    seconds--;
    document.getElementById("time_text_listening").innerHTML = seconds;
    localStorage.typinggame_secondsingame++;
    if(seconds<0)
    {
        playMusic();
        showWords();
        clearInterval(mainGameInterval);
        started = false;
        open_p(7);
    }
}
function returnMenu()
{
  started = false;
  clearInterval(mainGameInterval);
  menu()
}

function countDown()
{
    if(countdown<=0)
    {
        clearInterval(ctdn);
        open_p(4);
        seconds = 10;
        document.getElementById("time_text").innerHTML = seconds;
        mainGameInterval = setInterval(secondsGo,1000)
        started = true;
        typing();
    }
    playAnim("start-count","fadeincontainer",500);
    countdown--;
   
    if(countdown==0)
    {
        document.getElementById("start-count").innerHTML = "Type!";
        playSound(bell);
    }
    else
    {
        document.getElementById("start-count").innerHTML = countdown;
        playSound(countdown_sound);
    }
}



var score = 0;
var word = "";

function typing()
{
    playAnim("gameword","fadeincontainer",500);
    localStorage.typinggame_wordstyped++;
    if(localStorageLanguage == "en")
    {
      word = words_en[Math.floor(Math.random()*words_en.length)];
    }else if(localStorageLanguage == "am")
    {
      word = words_am[Math.floor(Math.random()*words_am.length)];
    }else if(localStorageLanguage == "ru")
    {
      word = words_ru[Math.floor(Math.random()*words_ru.length)];
    }
    else if(localStorageLanguage == "de")
    {
      word = words_de[Math.floor(Math.random()*words_de.length)];
    }
   
   
    document.getElementById("gameword").innerHTML = word;
}

function removeAnimation()
{
   document.getElementById("gameword").classList.remove("fadeincontainer");
}

function playSound(sound)
{
    sound.currentTime=0;
    sound.play();
}


function update()
{

    if(document.getElementById("typing").value.toLowerCase()==word.toLowerCase())
    {
      playAnim("scoretext","correctwordanim",500);
      playAnim("scorelogo","correctwordanim",500);
      playAnim("time_text","correctwordanim",500);
      localStorage.typinggame_cwords++;
    
      seconds+=5;
      document.getElementById("time_text").innerHTML = seconds;
     playSound(c);
        score++;
    }
    else
    {
        playAnim("scoretext","wrongwordanim",500);
        playAnim("scorelogo","wrongwordanim",500);
        playAnim("time_text","wrongwordanim",500);
        localStorage.typinggame_wwords++;

        seconds-=3;
        loseCondition();
        document.getElementById("time_text").innerHTML = seconds;
        playSound(w);
    }
    if(score>localStorage.typinggame_highscore)
    {
       if(!hscoreachieved)
       {
        hscore.play();
       }
        localStorage.typinggame_highscore = score;
        document.getElementById("hscoreachievedh4").style.display = "block";
        hscoreachieved = true;
    }
    
    document.getElementById("hscoretext").innerHTML = localStorage.typinggame_highscore;
   
    document.getElementById("scoretext").innerHTML = score;
    document.getElementById("typing").value = "";
    typing();
}
function loadStats()
{
    open_p(6);
    document.getElementById("besttime_stats").innerHTML = localStorage.typinggame_besttime_reaction;
    document.getElementById("hscore_stats").innerHTML = localStorage.typinggame_highscore;
    document.getElementById("wordstyped_stats").innerHTML = localStorage.typinggame_wordstyped;
    document.getElementById("cwords_stats").innerHTML = localStorage.typinggame_cwords;
    document.getElementById("wwords_stats").innerHTML = localStorage.typinggame_wwords;
    document.getElementById("ckeys_stats").innerHTML = localStorage.typinggame_ckeys;
    document.getElementById("secondsingame_stats").innerHTML = localStorage.typinggame_secondsingame;

}
function playAnim(id,animationName,timeout)
{
    document.getElementById(id).classList.add(animationName);
    setTimeout(function(){  document.getElementById(id).classList.remove(animationName);},timeout);
}

var buttons = document.querySelectorAll('.faiconbutton');

buttons.forEach(function(button) {
  button.addEventListener('mouseenter', function() {
    if(!button.querySelector('i').classList.contains("fa-bounce"))
    button.querySelector('i').classList.add('fa-bounce');

    setTimeout(function() {
      button.querySelector('i').classList.remove('fa-bounce');
    }, 500);
  });
 
});

function reloadStatistics()
{
    localStorage.setItem("typinggame_highscore",0)
    localStorage.setItem("typinggame_wordstyped",0)
    localStorage.setItem("typinggame_besttime_reaction",0)
    localStorage.setItem("typinggame_cwords",0)
    localStorage.setItem("typinggame_ckeys",0)
    localStorage.setItem("typinggame_wwords",0)
    localStorage.setItem("typinggame_secondsingame",0)
    loadStats();
}

var buttons = document.querySelectorAll('.faiconbutton_spin');

buttons.forEach(function(button) {
  button.addEventListener('mouseenter', function() {
    if(!button.querySelector('i').classList.contains("fa-spin"))
    button.querySelector('i').classList.add('fa-spin');

   
  });
  button.addEventListener('mouseleave', function() {
    button.querySelector('i').classList.remove('fa-spin');

   
  });
});



var audioo = document.getElementById("myAudio");
var playButton = document.getElementById("playButton");

playButton.addEventListener("click", function() {
  audioo.currentTime =0;
    audioo.play();
   
});



let inp = document.getElementById("typing")
inp.addEventListener("keyup",function(event){
  if(event.key === 'Enter' && inp.value!="")
  {
    update();
  }
});



let inplisten = document.getElementById("typing_listening")
inplisten.addEventListener("keyup",function(event){
  if(event.key === 'Enter' && inplisten.value!="")
  {
    update_listening();
  }
});



window.addEventListener('DOMContentLoaded', (event) => {
var elementToadd = document.getElementById("container-bg");
var allwords = words_en.concat(words_am);
  for(let i =0;i<150;i++)
  {
    const e= document.createElement("span");
    e.classList.add("moving-word");
    
    e.innerHTML =  allwords[Math.floor(Math.random()*allwords.length)];
    elementToadd.appendChild(e);
  }



  const words = document.getElementsByClassName('moving-word');
  const container = document.querySelector('.container-bg');
  
  for (let word of words) {
    const randomTop = Math.floor(Math.random() * container.clientHeight);
    const randomLeft = Math.floor(Math.random() * (window.innerWidth + 200)) - 200;
    const randomDuration = Math.floor(Math.random() * 600)+10; 

    word.style.top = randomTop+"px";
    word.style.setProperty('--start-position', `${randomLeft}px`);
    word.addEventListener('animationiteration', () => {
      word.style.setProperty('--start-position', "-200px");
    });
    word.style.animationDuration = `${randomDuration}s`;
    word.style.opacity = `${(1-(randomDuration/610))/10}`;
    word.style.fontSize = `${(1-(randomDuration/610))*40}`;
  }
  
});

var open_howtplay = 0;
var windows_howtoplay = document.querySelectorAll(".howtoplay_p");
function prev_howtoplay()
{
  open_howtplay--;
  if(open_howtplay<0)
  {
    open_howtplay = 0;
  }
  windows_howtoplay.forEach(element => element.style.display ="none");
  windows_howtoplay[open_howtplay].style.display = "block";
}
function next_howtoplay()
{
  open_howtplay++;
  if(open_howtplay>4)
  {
    open_howtplay = 4;
  }
  windows_howtoplay.forEach(element => element.style.display ="none");
  windows_howtoplay[open_howtplay].style.display = "block";
}



function hideWords()
{
  document.getElementById("container-bg").classList.remove("fadeincontainer-notranslate");
  document.getElementById("container-bg").classList.add("fadeoutcontainer-notranslate");
}

function showWords()
{
  document.getElementById("container-bg").classList.add("fadeincontainer-notranslate");
  document.getElementById("container-bg").classList.remove("fadeoutcontainer-notranslate");
}