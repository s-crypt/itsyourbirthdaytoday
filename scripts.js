// on load
(function () {
  /*

    Warning. There is a list of blocked words in this document.
    This is to curb any abuse of the site. Or at least try.
    If it doesn't work I'll delete it.

    They're lots of slurs, if you'd prefer not read this leave now.

  */
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var DEFAULT_NAME = 'michael'

  var BLOCKED_TEXT = [
    'beaner',
    'beaners',
    'bimbos',
    'bulldyke',
    'coon',
    'darkie',
    'faggot',
    'fucktard',
    'fudge packer',
    'fudgepacker',
    'jail bait',
    'jailbait',
    'jigaboo',
    'jiggaboo',
    'jiggerboo',
    'kike',
    'lolita',
    'nambla',
    'negro',
    'nigga',
    'nigger',
    'nig nog',
    'paki',
    'raghead',
    'rape',
    'slave',
    'shemale',
    'slanteye',
    'towelhead',
    'tranny'
  ]

  // https://github.com/remy/remysharp.com/blob/master/public/blog/throttling-function-calls.md
  function debounce (fn, delay) {
    var timer = null
    return function () {
      var context = this
      var args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
  var syllable = require('syllable')
  function removeBlockedWords (text) {
    var foundBlockedText = false

    for (var i = 0; i < BLOCKED_TEXT.length; i++) {
      var blockedTextItem = BLOCKED_TEXT[i]
      var matchedBlockedTextItem = text.toLowerCase().indexOf(blockedTextItem) !== -1

      if (matchedBlockedTextItem) {
        foundBlockedText = true
        break
      }
    }

    return foundBlockedText ? DEFAULT_NAME : text
  }

  var hashName = decodeURIComponent(window.location.hash.slice(1))
  var name = removeBlockedWords(hashName || DEFAULT_NAME)
  var nameToSay
  var speechHasErrored = false
  var speechHasStarted = false
  var hasSpeechSupport = (
    ('speechSynthesis' in window) &&
    ('SpeechSynthesisUtterance' in window)
  )

  var ratsIntro
  var ratsName
  var ratsCakeAndIcecream
  var ratsSuchAGoodBoy
  var ratsSprite = new window.Howl({
    src: ['rats.mp3'],
    sprite: {
      ratsIntro: [0, (7354 + 219)],
      ratsName: [7600, 550],
      ratsCakeAndIcecream: [8150, (3357 + 180)],
      ratsSuchAGoodBoy: [12200, 3709]
    }
  })
  var ratsInstrumental = new window.Howl({
    src: ['ratsInstrumental.wav']
  })

  var ratsInput = document.querySelector('input')
  var ratsButton = document.querySelector('button')

  var firstTry = true

  ratsInput.value = name
  ratsInput.addEventListener('change', setName)
  ratsInput.addEventListener('keyup', debounce(setName, 200))

  ratsButton.addEventListener('click', function () {
<<<<<<< HEAD
    // Play and pause sprites so we can get their IDs.
    ratsSprite.mute(true)
    ratsIntro = ratsSprite.play('ratsIntro')
    ratsSprite.pause(ratsIntro)
=======
    window.requestAnimationFrame(animate)
    video.play()

    ratsIntro.play()
>>>>>>> master

    ratsName = ratsSprite.play('ratsName')
    ratsSprite.pause(ratsName)

    ratsCakeAndIcecream = ratsSprite.play('ratsCakeAndIcecream')
    ratsSprite.pause(ratsCakeAndIcecream)

    ratsSuchAGoodBoy = ratsSprite.play('ratsSuchAGoodBoy')
    ratsSprite.pause(ratsSuchAGoodBoy)

    // Start it off
    ratsSprite.mute(false)
    ratsSprite.play(ratsIntro)
    ratsButton.innerHTML = 'loading...'
    ratsButton.disabled = true

    ratsSprite.on('play', function () {
      ratsButton.style.display = 'none'
    }, ratsIntro)

    ratsSprite.on('end', function () {
      sayRatsName()
    }, ratsIntro)

    ratsSprite.on('end', function () {
      handleRatsNameEnd()
    }, ratsName)

    ratsSprite.on('end', function () {
      sayRatsName()
    }, ratsCakeAndIcecream)

    ratsSprite.on('end', function () {
      // Start a bit at the start to get it on beat.
      ratsSprite.seek(0.3, ratsIntro)
      ratsSprite.play(ratsIntro)
    }, ratsSuchAGoodBoy)
  })

  var syllablesProcessed = 0
  var totalSyllables
  setName()
  setNameToSay()

  function setName () {
    if (ratsInput.value === name) {
      return
    }

    name = removeBlockedWords(ratsInput.value)

    if (name === '') {
      name = DEFAULT_NAME
    }

    window.location.hash = encodeURIComponent(name)
    window.document.title = name + ' it\'s your birthday today'
  }

  function handleRatsNameEnd () {
    if (firstTry) {
      ratsSprite.play(ratsCakeAndIcecream)
    } else {
      ratsSprite.play(ratsSuchAGoodBoy)
    }

    firstTry = !firstTry
  }
  function search (nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i]
      }
    }
    return false
  }
  function setNameToSay () {
    totalSyllables = syllable(name)
    if (!hasSpeechSupport) {
      return
    }
    nameToSay = new window.SpeechSynthesisUtterance(name)
    nameToSay.pitch = 0.8
    nameToSay.rate = 1.25
    nameToSay.lang = 'en-US'
    var voices = window.speechSynthesis.getVoices()
    var voice
    // forgive me for i have sinned
    if (search('Microsoft David Desktop - English (United States)', voices) !== false) { // windows
      voice = search('Microsoft David Desktop - English (United States)', voices)
    } else if (search('Fred (en-US)', voices) !== false) { // ios
      voice = search('Fred (en-US)', voices)
    } else if (search('English United States (en_US)', voices) !== false) { // android
      voice = search('English United States (en_US)', voices)
    } else if (search('English (America) (en-US)', voices) !== false) { // ubuntu
      voice = search('English (America) (en-US)', voices)
    }
    nameToSay.voice = voice

    speechHasStarted = false
    nameToSay.onstart = function () {
      speechHasStarted = true
    }
    nameToSay.onend = function () {
      if (!speechHasErrored && !handled) {
        handleRatsNameEnd()
      }
    }
    nameToSay.onerror = function () {
      speechHasErrored = true
      sayRatsName()
    }
    var handled = false
    nameToSay.onboundary = function () {
      syllablesProcessed++
      if (!speechHasErrored && syllablesProcessed === (totalSyllables) && handled === false) {
        setTimeout(function () { handleRatsNameEnd() }, 330)
        handled = true
      }
    }
  }

  function sayRatsName () {
    syllablesProcessed = 0
    if (name === DEFAULT_NAME || !hasSpeechSupport || !nameToSay || speechHasErrored) {
      return ratsSprite.play(ratsName)
    }
    setNameToSay()
    ratsInstrumental.play()
    window.speechSynthesis.speak(nameToSay)
    // If the speech api times out, then fallback to the regular sound.
    setTimeout(function () {
      if (!speechHasStarted) {
        speechHasErrored = true
        sayRatsName()
      }
    }, 3000)
  }
})()

var video = document.createElement('video')
video.src = 'rats.mp4'

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
function animate () {
  ctx.imageSmoothingEnabled = false // disabling image smoothing makes it look much nicer in my opinion
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  window.requestAnimationFrame(animate)
}

video.onended = videoRepeat // repeat the video
function videoRepeat () {
  window.requestAnimationFrame(animate)
  video.play()
}

window.onload = function () { // have to draw one frame at the start before the users clicks
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
}
