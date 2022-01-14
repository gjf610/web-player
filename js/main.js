const m = {
  pointer: 0,
  audio: new Audio(),
  duration: 0,
  musicList: [
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
}

const $ = selector => document.querySelector(selector)
const $preBtn = $('.player .icon-backward')
const $nextBtn = $('.player .icon-forward')
const $playingBtn = $('.player .icon-playing')
const $title = $('.player .texts h3')
const $author = $('.player .texts p')
const $time = $('.player .time')

setMusic()

function setMusic() {
  let curMusic = m.musicList[m.pointer]
  m.audio.src = curMusic.src
  $title.innerText = curMusic.title
  $author.innerText = curMusic.author
  setTime()
}
function setTime() {
  m.audio.oncanplay = function () {
    m.duration = m.audio.duration
    $time.innerText = transTime(m.duration)
  }
}
function paly() {
  $playingBtn.classList.remove('icon-playing')
  $playingBtn.classList.add('icon-pause')
  m.audio.play()
  setTime()
}
function pause() {
  $playingBtn.classList.remove('icon-pause')
  $playingBtn.classList.add('icon-playing')
  m.audio.pause()
}
function isPlaying() {
  return $playingBtn.classList.contains('icon-playing')
}
function transTime(time) {
  const duration = parseInt(time)
  const minute = parseInt(duration / 60)
  const minutes = minute > 10 ? minute : `0${minute}`
  const hour = parseInt(minute / 24)
  const hours = hours > 10 ? hours : `0${hours}`
  const second = duration % 60
  const seconds = second > 10 ? second : `0${second}`
  if (hour) {
    return `${hours}:${minutes}:${seconds}`
  } else {
    return `${minutes}:${seconds}`
  }
}
$playingBtn.onclick = function (e) {
  if (isPlaying()) {
    paly()
  } else {
    pause()
  }
}
$nextBtn.onclick = function (e) {
  m.pointer++
  m.pointer = m.pointer % m.musicList.length
  setMusic()
  paly()
}
$preBtn.onclick = function (e) {
  m.pointer--
  m.pointer = (m.pointer + m.musicList.length) % m.musicList.length
  setMusic()
  paly()
}
