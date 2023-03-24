let musiclist = [
    {
        "id": "0",
        "title": "胆小鬼1",
        "author": "梁咏琪",
        "url": "./assets/胆小鬼-梁咏琪.m4a",
        "cover": "./assets/梁咏琪.jpg"
    },
    {
        "id": "1",
        "title": "分手快乐2",
        "author": "梁静茹",
        "url": "./assets/分手快乐-梁静茹.mp3",
        "cover": "./assets/梁静茹.jpg"
    },
    {
        "id": "2",
        "title": "莫斯科没有眼泪3",
        "author": "Twins",
        "url": "./assets/莫斯科没有眼泪-Twins.m4a",
        "cover": "./assets/Twins.jpg"
    },
    {
        "id": "3",
        "title": "搁浅4",
        "author": "周杰伦",
        "url": "./assets/搁浅-周杰伦.m4a",
        "cover": "./assets/周杰伦.jpg"
    },
    {
        "id": "4",
        "title": "一个像夏天一个像秋天5",
        "author": "范玮琪",
        "url": "./assets/一个像夏天一个像秋天-范玮琪.m4a",
        "cover": "./assets/范玮琪.jpg"
    },
    {
        "id": "5",
        "title": "雨爱6",
        "author": "杨丞琳",
        "url": "./assets/雨爱-杨丞琳.m4a",
        "cover": "./assets/杨丞琳.jpg"
    }
]
let musicIndex = 0;
let audioObj = new Audio(musiclist[musicIndex].url);
audioObj.addEventListener('loadedmetadata', function () {
    $('.endtime').innerText = tidyTime(audioObj.duration)
});
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function previousSong(index) {
    index == undefined ? musicIndex-- : musicIndex = index;
    if (musicIndex < 0) {
        musicIndex = musiclist.length - 1;
    }
    audioObj.src = musiclist[musicIndex].url;
}
function nextSong(index) {
    index == undefined ? musicIndex++ : musicIndex = index;
    if (musicIndex > musiclist.length - 1) {
        musicIndex = 0;
    }
    audioObj.src = musiclist[musicIndex].url;

}
function tidyTime(time) {
    let holetime = parseInt(time)
    return newTime = parseInt(holetime / 60) + ':' + (holetime % 60 == 0 ? '00' : holetime % 60)

}
audioObj.addEventListener('ended', function () {
    $('.bar').style.width = '0%';
    $('.starttime').innerText = '00:00'
    if (!$('.once').classList.contains('hid')) {
        musicIndex = musicIndex - 1;

    }
    $('.go-end').onclick()

}
)



$('.barcontainer').addEventListener('click', e => {
    console.log(e.offsetX)
    let clickWhere = 1-((380-parseInt(e.offsetX)) / 380)
    audioObj.currentTime = clickWhere * audioObj.duration
    $('.bar').style.width = clickWhere * 100 + '%'
}
)


let clock = null
function playMusic() {
    audioObj.play();
    audioObj.addEventListener('loadedmetadata', function () {
        $('.endtime').innerText = tidyTime(audioObj.duration)
    });
    clock = setInterval(function () {
        let percent = (audioObj.currentTime / audioObj.duration) * 100 + '%'
        $('.bar').style.width = percent;
        $('.starttime').innerText = tidyTime(audioObj.currentTime)

    }, 50);
    $('img').classList.add('rotate');




}

function pauseMusic() {
    audioObj.pause();
    $('img').classList.remove('rotate');
    clearInterval(clock)
}
let songname = musiclist[musicIndex].title;
$('img').src = musiclist[musicIndex].cover;
$(".music-name").innerText = songname;
$(".author").innerText = musiclist[musicIndex].author;


$('.paly-one').onclick = function () {
    this.classList.add('hid');
    $('.pause').classList.add('active');
    playMusic();

}
$('.pause').onclick = function () {
    this.classList.remove('active');
    $('.paly-one').classList.remove('hid');
    pauseMusic();
}
$('.go-end').onclick = function (e, index) {
    if (!$('.rand').classList.contains('hid')) {
        let randomNum = Math.random();
        randomNum *= 6;
        let randomInt = Math.floor(randomNum);
        musicIndex = randomInt
    }
    else if (!$('.once').classList.contains('hid')) {
        musicIndex = musicIndex + 1;

    }
    else {
        musicIndex++;
    }

    if (musicIndex > musiclist.length - 1) {
        musicIndex = 0;
    }

    audioObj.src = musiclist[musicIndex].url;
    songname = musiclist[musicIndex].title;
    $(".author").innerText = musiclist[musicIndex].author;
    $(".music-name").innerText = songname;
    $('img').src = musiclist[musicIndex].cover;
    if ($('.pause').classList.contains('active')) {
        playMusic();
    }
}
$('.go-start').onclick = function (e, index) {
    if (!$('.rand').classList.contains('hid')) {
        let randomNum = Math.random();
        randomNum *= 6;
        let randomInt = Math.floor(randomNum);
        musicIndex = randomInt
    }
    else if (!$('.once').classList.contains('hid')) {
        musicIndex = musicIndex - 1;

    }
    else {
        musicIndex--;
    }

    if (musicIndex < 0) {
        musicIndex = musiclist.length - 1;
    }
    audioObj.src = musiclist[musicIndex].url;
    songname = musiclist[musicIndex].title;
    $(".author").innerText = musiclist[musicIndex].author;
    $(".music-name").innerText = songname;
    $('img').src = musiclist[musicIndex].cover;
    if ($('.pause').classList.contains('active')) {
        playMusic()
    }
}


const progressBar = $(".barcontainer");
let isDragging = false;
progressBar.addEventListener("mousedown", function (event) {
    isDragging = true;
});

document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        clearInterval(clock);
        $('.bar').style.width = (1-((380-event.offsetX) / 380)) * 100 + '%';
        $('.starttime').innerText = tidyTime(event.offsetX-380)

    }
});

document.addEventListener("mouseup", function (event) {
    isDragging = false;
});




$('.rand').onclick = function () {
    $$('.playmodle').forEach(e => {
        e.classList.remove('active', 'hid')
    })
    $('.once').classList.add('hid')
    this.classList.add('hid')
}
$('.cycle').onclick = function () {
    $$('.playmodle').forEach(e => {
        e.classList.remove('active', 'hid')
    })
    $('.rand').classList.add('hid')
    this.classList.add('hid')
}
$('.once').onclick = function () {
    $$('.playmodle').forEach(e => {
        e.classList.remove('active', 'hid')
    })
    $('.cycle').classList.add('hid')
    this.classList.add('hid')
}

if (!$('.rand').classList.contains('hid')) {
    let randomNum = Math.random();
    randomNum *= 6;
    let randomInt = Math.floor(randomNum);
    $$('.go-end').onclick(e, randomInt)
}


for (let i = 0; i < musiclist.length; i++) {
    $$('li')[i].innerText = musiclist[i].title + '-' + musiclist[i].author;
}

$$('li').forEach(function (e) {
    e.onclick = function () {
        console.log(e.innerText)
        for (let i = 0; i < musiclist.length; i++){
            if (e.innerText == musiclist[i].title + '-' + musiclist[i].author) {
                musicIndex = i;
                audioObj.src = musiclist[i].url;
                songname = musiclist[i].title;
                $(".author").innerText = musiclist[i].author;
                $(".music-name").innerText = songname;
                $('img').src = musiclist[i].cover;
                $('.paly-one').onclick()

            }
        }

    }
})

$('.list-onf').onclick = function () {
    $('.list').classList.contains('hid')? $('.list').classList.remove('hid') : $('.list').classList.add('hid')
}
