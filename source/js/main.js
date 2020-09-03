'use strict'

function toggleShowMenu(close, open) {
	if (navMain.classList.contains(close)) {
    navMain.classList.remove(close);
    navMain.classList.add(open);
  } else {
    navMain.classList.add(close);
    navMain.classList.remove(open);
  }
}

let navMain = document.querySelector('.nav');
let navToggle = document.querySelector('.nav__toggle');

navMain.classList.remove('nav--nojs');

navToggle.addEventListener('click', function () {
	toggleShowMenu('nav--closed', 'nav--opened');
});