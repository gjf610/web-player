// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"d6sW":[function(require,module,exports) {
var m = {
  pointer: 0,
  audio: new Audio(),
  duration: 0,
  clock: null,
  cacheVolume: 0,
  musicList: [{
    "src": "http://jirengu_1.gitee.io/music/music/ifyou.mp3",
    "title": "IF YOU",
    "author": "Big Bang",
    "img": "http://jirengu_1.gitee.io/music/music/if-you.png"
  }, {
    "src": "http://jirengu_1.gitee.io/music/music/夏日示爱-郭彩洁-暖手心.m4a",
    "title": "暖手心",
    "author": "郭彩洁",
    "img": "http://jirengu_1.gitee.io/music/music/夏日示爱-郭彩洁-暖手心.jpg"
  }, {
    "src": "http://jirengu_1.gitee.io/music/music/玫瑰.mp3",
    "title": "玫瑰",
    "author": "贰佰",
    "img": "http://jirengu_1.gitee.io/music/music/玫瑰.jpeg"
  }, {
    "src": "http://jirengu_1.gitee.io/music/music/成全-林宥嘉-成全.m4a",
    "title": "成全",
    "author": "林宥嘉",
    "img": "http://jirengu_1.gitee.io/music/music/成全-林宥嘉-成全.jpg"
  }, {
    "src": "http://jirengu_1.gitee.io/music/music/飞行器的执行周期-郭顶-水星记.m4a",
    "title": "水星记",
    "author": "郭顶",
    "img": "http://jirengu_1.gitee.io/music/music/飞行器的执行周期-郭顶-水星记.jpg"
  }]
};

var $ = function $(selector) {
  return document.querySelector(selector);
};

var $cover = $('.cover');
var $preBtn = $('.player .icon-backward');
var $nextBtn = $('.player .icon-forward');
var $playingBtn = $('.player .icon-playing');
var $title = $('.player .texts h3');
var $author = $('.player .texts p');
var $time = $('.player .time');
var $bar = $('.player .bar');
var $progress = $('.player .progress');
var $volume = $("#volume");
var $volCtrl = $(".volCtrl");
var $volNum = $(".volNum");
var $volBarWrapper = $('.volBarWrapper');
var $volBar = $('.volBar');
setMusic();

function setMusic() {
  var curMusic = m.musicList[m.pointer];
  m.audio.src = curMusic.src;
  $cover.style.background = "url(".concat(curMusic.img, ") center no-repeat");
  $title.innerText = curMusic.title;
  $author.innerText = curMusic.author;
}

function secondToText(second) {
  second = parseInt(second);
  var min = parseInt(second / 60);
  var sec = second % 60;
  sec = sec < 10 ? '0' + sec : '' + sec;
  return min + ':' + sec;
}

function paly() {
  $playingBtn.classList.remove('icon-playing');
  $playingBtn.classList.add('icon-pause');
  m.audio.play();
}

function pause() {
  $playingBtn.classList.remove('icon-pause');
  $playingBtn.classList.add('icon-playing');
  m.audio.pause();
}

function isPlaying() {
  return $playingBtn.classList.contains('icon-playing');
}

function transTime(time) {
  var duration = parseInt(time);
  var minute = parseInt(duration / 60);
  var minutes = minute > 10 ? minute : "0".concat(minute);
  var hour = parseInt(minute / 24);
  var hours = hours > 10 ? hours : "0".concat(hours);
  var second = duration % 60;
  var seconds = second > 10 ? second : "0".concat(second);

  if (hour) {
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
  } else {
    return "".concat(minutes, ":").concat(seconds);
  }
}

$playingBtn.onclick = function (e) {
  if (isPlaying()) {
    paly();
  } else {
    pause();
  }
};

$nextBtn.onclick = function (e) {
  m.pointer++;
  m.pointer = m.pointer % m.musicList.length;
  setMusic();
  paly();
};

$preBtn.onclick = function (e) {
  m.pointer--;
  m.pointer = (m.pointer + m.musicList.length) % m.musicList.length;
  setMusic();
  paly();
};

m.audio.addEventListener('timeupdate', function () {
  var percent = this.currentTime / m.audio.duration;
  $progress.style.width = percent * 100 + '%';

  if (this.readyState >= 2) {
    // 数据已经可以播放
    $time.innerText = secondToText(this.currentTime) + ' / ' + secondToText(m.audio.duration);
  }
});
m.audio.addEventListener('abort', function () {
  console.log('加载中');
  console.log('readyState a', this.readyState);
});
m.audio.addEventListener('ended', function () {
  console.log('结束了');
  setTimeout($nextBtn.onclick, 1000); // 1s后开始播放下一首,预留一点加载时间
});

$bar.onmousedown = function (e) {
  var percent = e.offsetX / $bar.offsetWidth;
  $progress.style.width = percent * 100 + '%';
  m.audio.currentTime = parseInt(m.audio.duration * percent);
  paly();
}; // 音量部分
// 音量控制进度条


$volBarWrapper.onclick = function (e) {
  var height = $volBarWrapper.offsetHeight;
  var offsetParent = $volume.offsetParent,
      offsetTop = $volume.offsetTop;
  var cal = e.screenY - offsetParent.offsetTop - offsetTop + 75;
  var per = (height - cal) / height * 100;

  if (per < 1) {
    $volBar.style.height = '0%';
    m.audio.volume = 0;
  } else {
    $volBar.style.height = per + '%';
    m.audio.volume = per / 100;
  }

  volControl();
}; // 音量按钮鼠标滑过显示音量控制条,鼠标移出隐藏音量控制条


$volume.onmouseover = function () {
  $volCtrl.style.display = "block";
};

$volume.onmouseout = function () {
  $volCtrl.style.display = "none";
}; // 鼠标在音量条上移动时候继续显示音量控制条


$volCtrl.onmousemove = function () {
  $volCtrl.style.display = "block";
};

$volCtrl.onmouseout = function () {
  $volCtrl.style.display = "none";
}; // 监控音量变化，实时显示当前音量


m.audio.addEventListener('volumechange', function () {
  $volNum.innerText = m.audio.muted ? "0" : parseInt(m.audio.volume * 100);
});

$volume.onclick = function () {
  if (m.audio.muted) {
    m.audio.volume = m.cacheVolume;
    $volBar.style.height = m.audio.volume * 100 + '%';
    m.audio.muted = false;
  } else {
    m.cacheVolume = m.audio.volume;
    $volBar.style.height = '0%';
    m.audio.volume = 0;
    m.audio.muted = true;
  }

  volControl();
};

function volumeStyle(icon, color) {
  $volume.className = "iconfont " + icon;
  $volume.style.color = color;
} // 音量控制函数


function volControl() {
  switch (true) {
    case m.audio.volume === 0:
      volumeStyle("icon-mute", "#ccc");
      break;

    case m.audio.volume > 0 && m.audio.volume <= 0.33:
      volumeStyle("icon-volume-low", "inherit");
      break;

    case m.audio.volume > 0.33 && m.audio.volume <= 0.66:
      volumeStyle("icon-volume-middle", "inherit");
      break;

    case m.audio.volume > 0.66 && m.audio.volume <= 1:
      volumeStyle("icon-volume-high", "inherit");
      break;
  }
}
},{}]},{},["d6sW"], null)
//# sourceMappingURL=main.6721279a.js.map