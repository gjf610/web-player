let musicList = [
  {
    "src": "http://jirengu_1.gitee.io/music/ifyou.mp3",
    "title": "IF YOU",
    "author": "Big Bang",
    "img": "http://jirengu_1.gitee.io/music/if-you.png"
  },
  {
    "src": "http://jirengu_1.gitee.io/music/夏日示爱-郭彩洁-暖手心.m4a",
    "title": "暖手心",
    "author": "郭彩洁",
    "img": "http://jirengu_1.gitee.io/music/夏日示爱-郭彩洁-暖手心.jpg"
  },
  {
    "src": "http://jirengu_1.gitee.io/music/玫瑰.mp3",
    "title": "玫瑰",
    "author": "贰佰",
    "img": "http://jirengu_1.gitee.io/music/玫瑰.jpeg"
  },
  {
    "src": "http://jirengu_1.gitee.io/music/成全-林宥嘉-成全.m4a",
    "title": "成全",
    "author": "林宥嘉",
    "img": "http://jirengu_1.gitee.io/music/成全-林宥嘉-成全.jpg"
  },
  {
    "src": "http://jirengu_1.gitee.io/music/飞行器的执行周期-郭顶-水星记.m4a",
    "title": "水星记",
    "author": "郭顶",
    "img": "http://jirengu_1.gitee.io/music/飞行器的执行周期-郭顶-水星记.jpg"
  }
]

const $ = selector => document.querySelector(selector)
const $preBtn = $('.player .icon-backward')
const $nextBtn = $('.player .icon-forward')
const $playingBtn = $('.player .icon-playing')
const $title = $('.player .texts h3')
const $author = $('.player .texts p')
const $time = $('.player .time')


let index = 0
let audioObj = new Audio()
setMusic()

function setMusic() {
  let curMusic = musicList[index]
  audioObj.src = curMusic.src
  $title.innerText = curMusic.title
  $author.innerText = curMusic.author
}
function paly() {
  console.log(audioObj.duration)
  audioObj.play()

}

$playingBtn.onclick = function (e) {
  if (this.classList.contains('icon-playing')) {
    this.classList.remove('icon-playing')
    this.classList.add('icon-pause')
    paly()
  } else {
    this.classList.remove('icon-pause')
    this.classList.add('icon-playing')
    audioObj.pause()
  }
}
$nextBtn.onclick = function (e) {
  index++
  index = index % musicList.length
  setMusic()
  paly()
}
$preBtn.onclick = function (e) {
  index--
  index = (index + musicList.length) % musicList.length
  setMusic()
  paly()
}