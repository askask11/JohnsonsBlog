/* Editor: Johnson Gao
 * Date This Project Created:2019-12-13
 * Description Of This Class:This is the script of the website.
 */




class Music
{
    constructor(url, name)
    {
        this.url = url;
        this.name = name;
    }
    toString()
    {
        return "{" + this.url + ", " + this.name + " }";
    }
}


var doPlayClip = true;
/**
 * The tool used to play audios.
 * @type Audio
 */
const CLIP = document.createElement("AUDIO");

const MUSIC = document.createElement("AUDIO");

const CLIP_CLICK = "https://hidrive.ionos.com/api/sharelink/download?id=Xb4O2mgN";

const CLIP_TINGBUTTON = "https://hidrive.ionos.com/api/sharelink/download?id=nWYu2TiL";

const CLIP_WATERPRESS1 = "https://hidrive.ionos.com/api/sharelink/download?id=2B4OW4OQ";

const MUSIC_SRC_GENERAL = [new Music("https://hidrive.ionos.com/api/sharelink/download?id=CX4uWBED", "Love Circulation - Piano"), //
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=Iq4OWnRp", "Annie's dream"), //
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=GN4O2sIg", "500 miles"),
    // new Music("audios/see you again video (mp3cut.net).wav", "see you again"),
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=BN4uWBqw", "Senorita"),
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=AF4uWjJ2", "Always With Me - Piano"), 
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=PQYOWPEP", "宁夏"), /*nxpiano*/
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=T1Yu24ty", "环游星空"), /*hyxk.mp3*/
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=KdYu2QPB", "静悄悄 - 封茗囧菌"),
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=KzYuWWye", "那些年"),
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=CIYOWlZn", "好想你"), /*hxn.mp3*/
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=yEYOWEWv", "樱花草 钢琴版"),
    new Music("https://hidrive.ionos.com/api/sharelink/download?id=LA4uWDnI", "贝壳风铃")];//always with me.mp3

//https://hidrive.ionos.com/api/sharelink/download?id=KdYu2QPB
/**
 * This is the music for background.
 * @type Array
 */

const MUSIC_SRC_CN = [];/*yhcpiano.mp3*/



const PLAY_CLIP = {
    play: function (src)
    {
        CLIP.play(src);
    },

    buttonClick: function ()
    {
        this.play(CLIP_CLICK);
    },

    tinyButton: function ()
    {
        this.play(CLIP_TINGBUTTON);
    },

    waterpress1: function ()
    {
        this.play(CLIP_WATERPRESS1);
    }
};

const PLAY_MUSIC = {
    background1: ""

};

function switchDayVideo(day)
{
    document.getElementById('videoIframe').src = "https://player.bilibili.com/player.html?aid=77794898&cid=133284405&page=" + day;
    switch (day)
    {
        case 1:
            setIntro("我们旅行的第一天，在酒店的沙滩上享受生活.\n\
This is the first day we travel. We enjoyed on the beach.");
            break;
        case 2:
            setIntro("第二天，我们去了最大的水族馆，在帕拉戴斯岛。\n\
这是我在巴哈马岛的第二天。 今天，我们去了市区，在那里看到了一些色彩缤纷的建筑。 然后我们乘船去了天堂岛。 在岛上的一个水族馆里，我们看到了许多美丽的鱼。 第一张照片是在船上拍摄的。 提示：这里的一切都很昂贵，人们的英语发音与美国人略有不同。<br>The next day, we went to the largest aquarium, at Paradis Island. \ n \
Today we went downtown and saw some colorful buildings there. Then we went to Paradise Island by boat. In an aquarium on the island, we saw a tip: everything here is expensive and people's English is appropriately slightly different from Americans. ");
            break;
        case 3:
            setIntro("第三天我们来到了🐖猪岛，他们都会游泳<br>On the third day we came to Piggy Island and they would all swim.");
            break;
        case 4:
            setIntro("第四天，来到了粉色沙滩<br>4th day we were on pink beach.");
            break;
    }

}

function setIntro(intro)
{
    document.getElementById('introParag').innerHTML = intro;
}

function initalizeStandard()
{
    //var browser = getBrowserType();
    //append child
    document.getElementsByClassName('musicControlArea')[0].appendChild(MUSIC);
    MUSIC.controls = true;
    MUSIC.onended = function ()
    {
        randomMusic();
    };


    initalizeMusicClipDefalt();
    //detect local storage
    if (typeof (Storage) === "undefined")
    {
        // No web storage Support.
        console.log('not support local storage.');
        randomMusic();
    } else
    {
        // Code for localStorage
        //0:timeline 1:musicurl 2:isPlaying
        var musicInfo = JSON.parse(window.localStorage.getItem('musicInfo'));
        //0:doplay
        var clipInfo = JSON.parse(window.localStorage.getItem('clipInfo'));
        //

        if (musicInfo === null/*typeof (musicInfo[0]) === "undefined" || musicInfo[1] === ""*/)
        {
            //NO music data fd
            console.log('no music data found');
            //initalizeMusicClipDefalt();
            randomMusic();
        } else
        {

            //load music

            MUSIC.currentTime = musicInfo[0];

            MUSIC.src = musicInfo[1];
            console.log("currenttime = " + musicInfo[0] + " src= " + musicInfo[1]);
            if (musicInfo[2] === "true")
            {
                //currently paused
                console.log("music currently paused");
            } else
            {
                //play music
                MUSIC.play();
            }
        }

        if (clipInfo === null)
        {
            console.log("no clip data found.");
        } else
        {
            if (clipInfo[0] == "true")
            {
                //do play clip
                doPlayClip = true;
            } else if (clipInfo[0] == "false")
            {
                //muted
                doPlayClip = false;
                document.getElementById('doPlayClipIcon').src = "images/mute32.svg";
            } else
            {
                console.log(clipInfo[0]);
            }
        }


    }

}

/**
 * Get system language
 * @returns {String|navigator.language|getSystemLanguageCode.lang|navigator.userLanguage|Navigator.userLanguage} User's language code.
 */
function getSystemLanguageCode()
{
    var type = navigator.appName;
    var lang;
    if (type == "Netscape")
    {
        lang = navigator.language;//Get browser defalut language config
    } else
    {
        lang = navigator.userLanguage;//IE5+ LANG == navigator.systemLanguage
    }
    ;
    lang = lang.substr(0, 2);//first two digits
    return lang;
}


function initalizeMusicClipDefalt()
{
    var language = getSystemLanguageCode();
    console.log(language);
    if (language == "zh")
    {
        for (var i = 0, max = MUSIC_SRC_CN.length - 1; i < max; i++)
        {
            //put array in CN;
            MUSIC_SRC_GENERAL[MUSIC_SRC_GENERAL.length] = MUSIC_SRC_CN[i];
        }
    }
    //create a list
    for (var i = 0, max = MUSIC_SRC_GENERAL.length - 1, child; i < max; i++)
    {
        child = document.createElement("LI");
        child.innerHTML = "<span onclick = \"" + "playThatMusic('" + MUSIC_SRC_GENERAL[i].url + "');\" >" + MUSIC_SRC_GENERAL[i].name + "</span>";
        document.getElementById('musicList').appendChild(child);
    }

}

function randomMusic()
{
    var index;
    //select a music
    index = randomInt(0, MUSIC_SRC_GENERAL.length - 1);
    MUSIC.src = MUSIC_SRC_GENERAL[index].url;
    MUSIC.play();
}

/**
 * This function will generate a random integer.
 * @param {type} upperBound The upmost bound of the interger that is going to be generated.
 * @param {type} lowerBound The minimun of generated integer.
 * @returns {Number} The number generated.
 */
function randomInt(upperBound, lowerBound)
{
    return lowerBound + parseInt(Math.random() * (upperBound - lowerBound + 1));
}




/**
 * Get what type of browser user is using.
 * @returns {String}
 */
function getBrowserType()
{
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p)
    {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
// Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
// Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera)
    {
        return "Opera";
    } else if (isSafari)
    {
        return "Safari";
    } else if (isIE)
    {
        return "IE";
    } else if (isEdge)
    {
        return "Edge";
    } else if (isChrome)
    {
        return "Chrome";
    } else if (isBlink)
    {
        return "Blink";
    } else
    {
        return "Unknown";
    }
}

function changeinterestImage(src)
{
    document.getElementById('myintImg').src = src;
    document.getElementById('myintImg').alt = src;
}

function switchPage(pg)
{
    var storage = [MUSIC.currentTime, MUSIC.currentSrc, MUSIC.paused];
    var clipInfo = [doPlayClip];
    PLAY_CLIP.buttonClick();
    //0:timeline 1:musicurl 2:isPlaying

    window.localStorage.setItem('musicInfo', JSON.stringify(storage));

    window.localStorage.setItem('clipInfo', JSON.stringify(clipInfo));
    window.location = pg;
}

function togglePupup(element)
{
    document.getElementById(element).classList.toggle('show');
}

/**
 * Mute/unmute the page
 * @returns {undefined}
 */
function mute_unmute()
{
    doPlayClip = !doPlayClip;
    if (doPlayClip)
    {
        document.getElementById('doPlayClipIcon').src = "images/loudsound32.svg";
    } else
    {
        document.getElementById('doPlayClipIcon').src = "images/mute32.svg";
    }
}

async function playThatMusic(src)
{
    // Automatic playback started!
    // Show playing UI.
    console.log("switch music");
    try
    {
        MUSIC.src = src;
        MUSIC.play();
    } catch (e)
    {
        console.log("erro misic" + e);
        alert("failed to play your music, sorry!");
    }

    //MUSIC.src = src;
    // fetchAndPlay(src,MUSIC);

}

function fetchAndPlay(src, music)
{
    fetch(src)
            .then(response => response.blob())
            .then(blob => {
                music.srcObject = blob;
                return music.play();//stop at this point
            })
            .then(_ => {
                // Video playback started ;)
                console.log("worked");
            })
            .catch(e => {
                // Video playback failed ;(
                console.log("no failed : " + e);
            });

}

/**
 * Used on index only, register the service worker.
 * @returns {undefined}
 */
function registerServiceWorker()
{
    console.log('service worker called');
    registerSW();
}

/**
 * register service worker.
 * @returns {undefined}
 */
async function registerSW()
{
    if ('serviceWorker' in navigator)
    {
        try
        {
            await navigator.serviceWorker.register('service-worker.js');
        } catch (e)
        {
            alert('ServiceWorker registration failed. Sorry about that.');
        }
    } else
    {

        alert('Failed to register service worker. Sorry for your inconvinence');

    }
}