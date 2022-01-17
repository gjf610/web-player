const m = {
  pointer: 0,
  audio: new Audio(),
  duration: 0,
  clock: null,
  musicList: [
    {
      "src": "http://jirengu_1.gitee.io/music/music/ifyou.mp3",
      "title": "IF YOU",
      "author": "Big Bang",
      "img": "http://jirengu_1.gitee.io/music/music/if-you.png"
    },
    {
      "src": "http://jirengu_1.gitee.io/music/music/夏日示爱-郭彩洁-暖手心.m4a",
      "title": "暖手心",
      "author": "郭彩洁",
      "img": "http://jirengu_1.gitee.io/music/music/夏日示爱-郭彩洁-暖手心.jpg"
    },
    {
      "src": "http://jirengu_1.gitee.io/music/music/玫瑰.mp3",
      "title": "玫瑰",
      "author": "贰佰",
      "img": "http://jirengu_1.gitee.io/music/music/玫瑰.jpeg"
    },
    {
      "src": "http://jirengu_1.gitee.io/music/music/成全-林宥嘉-成全.m4a",
      "title": "成全",
      "author": "林宥嘉",
      "img": "http://jirengu_1.gitee.io/music/music/成全-林宥嘉-成全.jpg"
    },
    {
      "src": "http://jirengu_1.gitee.io/music/music/飞行器的执行周期-郭顶-水星记.m4a",
      "title": "水星记",
      "author": "郭顶",
      "img": "http://jirengu_1.gitee.io/music/music/飞行器的执行周期-郭顶-水星记.jpg"
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
const $progress = $('.player .progress')

setMusic()

function setMusic() {
  let curMusic = m.musicList[m.pointer]
  m.audio.src = curMusic.src
  $title.innerText = curMusic.title
  $author.innerText = curMusic.author

}

function secondToText(second) {
  second = parseInt(second)
  let min = parseInt(second / 60)
  let sec = second % 60
  sec = sec < 10 ? '0' + sec : '' + sec
  return min + ':' + sec
}
function paly() {
  $playingBtn.classList.remove('icon-playing')
  $playingBtn.classList.add('icon-pause')
  m.audio.play()
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
m.audio.addEventListener('timeupdate', function () {
  //更新进度条
  const percentage = (this.currentTime / m.audio.duration) * 100;
  $progress.style.width = percentage + '%';
  if (this.readyState >= 2) { // 数据已经可以播放
    $time.innerText = secondToText(this.currentTime) + ' / ' + secondToText(m.audio.duration)
  }

});
m.audio.addEventListener('abort', function () {
  console.log('加载中')
  console.log('readyState a', this.readyState)
})
m.audio.addEventListener('ended', function () {
  console.log('结束了')
  setTimeout($nextBtn.onclick, 1000);	// 1s后开始播放下一首,预留一点加载时间
})