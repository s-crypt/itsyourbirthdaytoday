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

  // var speakDelay = 53
  var hashName = decodeURIComponent(window.location.hash.slice(1))
  var name = removeBlockedWords(hashName || DEFAULT_NAME)
  var nameToSay
  var speechHasErrored = false
  var speechHasStarted = false
  var hasSpeechSupport = (
    ('speechSynthesis' in window) &&
    ('SpeechSynthesisUtterance' in window)
  )

  var ratsIntro = document.getElementById('ratsIntro')
  var ratsName = document.getElementById('ratsName')
  var ratsNameInstrumental1 = document.getElementById('ratsNameInstrumental1')
  var ratsNameInstrumental2 = document.getElementById('ratsNameInstrumental2')
  var ratsCakeAndIcecream = document.getElementById('ratsCakeAndIcecream')
  var ratsSuchAGoodBoy = document.getElementById('ratsSuchAGoodBoy')

  var ratsInput = document.querySelector('input')
  var ratsButton = document.querySelector('button')

  var firstTry = true

  ratsName.playbackRate = 1.25

  ratsInput.value = name
  ratsInput.addEventListener('change', setName)
  ratsInput.addEventListener('keyup', debounce(setName, 200))

  ratsButton.addEventListener('click', function () {
    ratsIntro.play()
    setTimeout(function () {
      sayRatsName()
    }, (7354 + 219)
  )
  })

  ratsIntro.addEventListener('playing', function () {
    ratsButton.style.display = 'none'
  })

  // ratsIntro.addEventListener('ended', function () {
    // sayRatsName()
  // })

  var syllablesProcessed = 0
  var totalSyllables

  // ratsCakeAndIcecream.addEventListener('ended', function () {
    // sayRatsName()
  // })

  ratsSuchAGoodBoy.addEventListener('ended', function () {
    ratsIntro.play()
    setTimeout(function () {
      sayRatsName()
    }, (7354 + 250)
  )
  })

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
      ratsCakeAndIcecream.play()
      setTimeout(function () {
        sayRatsName()
      }, (3357 + 180))
    } else {
      ratsSuchAGoodBoy.play()
    }

    firstTry = !firstTry
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
    nameToSay.voice = voices[0]

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
      if (!speechHasErrored && syllablesProcessed === (totalSyllables) && firstTry === false && handled === false) {
        setTimeout(function () { handleRatsNameEnd() }, 256)
        handled = true
      } else if (!speechHasErrored && syllablesProcessed === (totalSyllables) && firstTry === true && handled === false) {
        setTimeout(function () { handleRatsNameEnd() }, 286)
        handled = true
      }
    }
  }

  function sayRatsName () {
    syllablesProcessed = 0
    if (name === DEFAULT_NAME || !hasSpeechSupport || !nameToSay || speechHasErrored) {
      ratsName.play()
      setTimeout(function () { handleRatsNameEnd() }, 420)
      return
    }
    setNameToSay()

    window.speechSynthesis.speak(nameToSay)

    if (firstTry === false) {
      ratsNameInstrumental2.play()
    } else if (firstTry === true) {
      ratsNameInstrumental1.play()
    }
    // If the speech api times out, then fallback to the regular sound.
    setTimeout(function () {
      if (!speechHasStarted) {
        speechHasErrored = true
        sayRatsName()
      }
    }, 3000)
  }
})()
