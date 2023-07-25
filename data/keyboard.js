

let keyboard = [
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Equal',
    'KeyQ',
    'KeyW',
    'KeyE',
    'KeyR',
    'KeyT',
    'KeyY',
    'KeyU',
    'KeyI',
    'KeyO',
    'KeyP',
    'BracketLeft',
    'BracketRight',
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
    'Quote',
    'KeyZ',
    'KeyX',
    'KeyC',
    'KeyV',
    'KeyB',
    'KeyN',
    'KeyM',
 ];

let am_layout = [
    'է',
    'թ',
    'փ',
    'ձ',
    'ջ',
    'ւ',
    'և',
    'ր',
    'չ',
    'ճ',
    'ժ',
    'ք',
    'ո',
    'ե',
    'ռ',
    'տ',
    'ը',
    'ւ',
    'ի',
    'օ',
    'պ',
    'խ',
    'ծ',
    'ա',
    'ս',
    'դ',
    'ֆ',
    'գ',
    'հ',
    'յ',
    'կ',
    'լ',
    '՛',
    'զ',
    'ղ',
    'ց',
    'վ',
    'բ',
    'ն',
    'մ',
]

let en_layout = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '=',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    '',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
]

let de_layout = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'ß',
    'q',
    'w',
    'e',
    'r',
    't',
    'z',
    'u',
    'i',
    'o',
    'p',
    'ü',
    '*',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'Ä',
    'y',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
]

let ru_layout = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '=',
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
]


function changeLang_keyboard(lang)
{
    var array = am_layout;
    if(lang == "am")
    {
        array = am_layout;
    }
    else if(lang =="en")
    {   
        array = en_layout;
    }
    else if(lang =="ru")
    {   
        array = ru_layout;
    }
    else if(lang =="de")
    {   
        array = de_layout;
    }
    for(let i =0;i<keyboard.length;i++)
    {
        document.getElementById(keyboard[i]).innerHTML = array[i];
    }
}



var key = "Digit4";
function randomKey()
{
    document.getElementById(key).classList.remove("selected");
    key = keyboard[Math.floor(Math.random()*keyboard.length)]
    document.getElementById(key).classList.add("selected");
}

function checkKey(k)
{
    console.log(k.code);
    if(k.code == key)
    {
        localStorage.typinggame_ckeys++;
        playSound(c);
        randomKey();
    }
    else
    {
        playSound(w);
        playAnim(k.code,"hit",200);
    }
}