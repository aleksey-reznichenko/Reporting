import { renders } from './tableLoad.js';

export const headerLoad = () => {
   
   //Change Mode in Header
   document.querySelector('.header__mode').addEventListener("click", e => {
      transition()
      if(document.documentElement.getAttribute('data-theme') === 'dark'){
         e.currentTarget.querySelector('img').src = 'img/dark-mode.svg';
         document.documentElement.setAttribute('data-theme', 'light');
         document.querySelector('.header__logo').children[0].src = 'img/mainLogoLight.svg';
         document.querySelectorAll('.select__arrow').forEach(item=> item.src = 'img/arrowDark.svg');
         document.querySelectorAll('.select__checkbox--arrow').forEach(item=> item.src = 'img/arrowDark.svg');
         document.querySelector('.info__content--label').style.backgroundImage = 'url("img/labelBlue.svg")';
         document.querySelectorAll('.table__column-name').forEach(item => item.children[1].src = 'img/sortDark.svg')
      }
      else {
         e.currentTarget.querySelector('img').src = 'img/light-mode.svg';
         document.documentElement.setAttribute('data-theme', 'dark');
         document.querySelector('.header__logo').children[0].src = 'img/mainLogo.svg';
         document.querySelectorAll('.select__arrow').forEach(item => item.src = 'img/arrow.svg');
         document.querySelectorAll('.select__checkbox--arrow').forEach(item => item.src = 'img/arrow.svg');
         document.querySelector('.info__content--label').style.backgroundImage = "url('img/label.svg')"
         document.querySelectorAll('.table__column-name').forEach(item => item.children[1].src = 'img/sort.svg')
      }
      renders()
   });

   function transition() {
      document.documentElement.classList.add('transition')
      setTimeout(() => {
         document.documentElement.classList.remove('transition')
      }, 750);
   }

   //Header Menu Adaptive
   const iconMenu = document.querySelector(".icon-menu");
   const body = document.querySelector("body");
   const menuBody = document.querySelector(".menu__body");
   if (iconMenu) {
      iconMenu.addEventListener("click", function () {
         iconMenu.classList.toggle("active");
         body.classList.toggle("lock");
         menuBody.classList.toggle("active");
      });
   }
}