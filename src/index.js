import './styles/reset.css';
import './styles/fonts/fonts.css';
import './styles/main.scss';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
	slidesPerView: 2,
	spaceBetween: 40,
	slidesPerGroup: 1,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	modules: [Navigation, Pagination],
	breakpoints: {
		320: {
			spaceBetween: 38,
			slidesPerView: 1,
			pagination: {
				dynamicBullets: true,
			},
		},
		701: {
			slidesPerView: 2,
		},
		769: {
			spaceBetween: 40,
		},
	},
});

const swiperPrev = document.querySelector('#swiperPrev');
const swiperNext = document.querySelector('#swiperNext');
const linksMenu = document.querySelectorAll(
	'.nav__list__item__link[data-goto]'
);
const body = document.querySelector('body');
const btnBurger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav');
const navBtn = document.querySelector('.nav__btn');
const arrowLink = document.querySelector('.promo__arrow');
const elementDateYear = document.querySelector('.logo-text__date');
const date = new Date().toISOString();
const currentDate = getDate(date);

// Плавный переход к разделу по клику в меню
if (linksMenu.length > 0) {
	linksMenu.forEach(element => {
		element.addEventListener('click', onMenuLinkClick);
	});
}

function onMenuLinkClick(event) {
	event.preventDefault();

	const linkMenu = event.target;
	const gotoBlock = document.querySelector(linkMenu.dataset.goto);

	// if (linkMenu.dataset.goto && gotoBlock) {
	if (linkMenu.dataset && gotoBlock) {
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

		closeBurgerMenu();

		window.scrollTo({
			top: gotoBlockValue,
			behavior: 'smooth',
		});
	}
}

// Показать меню БУРГЕР
function showBurgerMenu(event) {
	event.preventDefault();
	body.classList.toggle('lock');
	btnBurger.classList.toggle('active');
	navList.classList.toggle('active');
}

// Убрать меню БУРГЕР
function closeBurgerMenu() {
	if (btnBurger.classList.contains('active')) {
		body.classList.remove('lock');
		btnBurger.classList.remove('active');
		navList.classList.remove('active');
	}
}

// Динамическая дата
function getDate(date) {
	const year = new Date(date).getFullYear();
	return {
		year: year,
	};
}

(function (year) {
	elementDateYear.innerHTML = `${year}`;
})(currentDate.year);

// Вынос навигации слайдера за пределы контейнера Swiper
swiperPrev.addEventListener('click', () => swiper.slidePrev());
swiperNext.addEventListener('click', () => swiper.slideNext());
btnBurger.addEventListener('click', showBurgerMenu);
navBtn.addEventListener('click', onMenuLinkClick);
arrowLink.addEventListener('click', onMenuLinkClick);
