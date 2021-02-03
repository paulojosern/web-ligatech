"use strict";

(function () {
  var nav = document.querySelector('header');
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = 80;
  /*Get all anchor links, you can be more specific or use a classname to be sure it only selects the links you want.*/

  var lnks = document.querySelectorAll('a[href*="#"]');
  /*Loop through each link to add the click event*/

  for (var i = 0; i < lnks.length; i++) {
    lnks[i].onclick = function (e) {
      /*prevent default behavior [clicking through]*/
      e.preventDefault();
      var b = this;
      /*get the name without the hash character and match it to the corresponding anchor*/

      var c = b.getAttribute('href').substring(1);
      var el = document.querySelectorAll('section[id="' + c + '"]')[0];
      console.log(el);
      /*scroll to that position*/

      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      });
      /*This number subtracted from the offsetTop can be adjusted based on how much above the actual anchor you need to be.
      You'll need to change this based on the height of your anchored element and also if your site has a sticky header. You make it slightly larger than its height. Play with it.*/
    };
  }

  var $heightScreen = window.screen.height / 2;

  var animateHTML = function animateHTML() {
    var elems, windowHeight;

    var init = function init() {
      elems = document.getElementsByClassName('hidden');
      windowHeight = window.innerHeight;

      _addEventHandlers();
    };

    var _addEventHandlers = function _addEventHandlers() {
      window.addEventListener('scroll', _checkPosition);
      window.addEventListener('resize', init);
    };

    var _checkPosition = function _checkPosition() {
      for (var i = 0; i < elems.length; i++) {
        var posFromTop = elems[i].getBoundingClientRect().top;

        if (posFromTop - windowHeight <= -$heightScreen / 2) {
          elems[i].classList.add('active');
        } else {
          elems[i].classList.remove('active');
        }
      }
    };

    return {
      init: init
    };
  };

  animateHTML().init();
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width > 768) {
    var hasScrolled = function hasScrolled() {
      var st = window.pageYOffset || document.body.scrollTop;
      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && st > navbarHeight) {
        nav.classList.add('header--up');
        nav.classList.remove('header--down'); // $btn__top.classList.add('btn__top--open');
      } else {
        if (st + window.innerHeight < document.documentElement.offsetHeight) {
          nav.classList.remove('header--up');
          nav.classList.add('header--down'); // $btn__top.classList.remove('btn__top--open');
        }
      }

      lastScrollTop = st;
    };

    var navFixed = function navFixed(e) {
      if (window.scrollY !== 0) {
        nav.classList.add('header--fixed');
        $btn__top.classList.add('btn__top--open');
      } else {
        nav.classList.remove('header--fixed');
        $btn__top.classList.remove('btn__top--open');
      }
    };

    window.addEventListener('scroll', function (event) {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
    var $btn__top = document.querySelector('.btn__top');
    window.addEventListener('scroll', navFixed);
  } else {
    var $links = document.querySelectorAll('.link__menu');

    for (var index = 0; index < $links.length; index++) {
      var element = $links[index];
      element.addEventListener('click', function (event) {
        document.querySelector('.btn__menu').click();
      });
    }
  }
})();