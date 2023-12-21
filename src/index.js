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
const form = document.querySelector('#form');
const allFormInputs = document.querySelectorAll('.form__item');
const inputName = document.querySelector('.form-name');
const inputEmail = document.querySelector('.form-email');
const inputText = document.querySelector('.form-text');
const popup = document.querySelector('.popup');
// const popupContent = document.querySelector('.popup__content');
// const closePopupBtn = document.querySelector('.popup__close');
const popupInnerName = document.querySelector('.popup__inner__text_name');
const popupInnerEmail = document.querySelector('.popup__inner__text_email');
const popupInnerMessage = document.querySelector('.popup__inner__text_message');
let data;

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

function escapeDown(element) {
	if (element.code == 'Escape') {
		closeBurgerMenu();
		styleNonePopup();
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

// Валидация полей ввода формы
class Request {
	constructor(name, email, message) {
		this.name = name;
		this.email = email;
		this.message = message;
	}
}

function getFormInput() {
	return new FormData(form);
}

function resetInputs() {
	inputName.value = '';
	inputEmail.value = '';
	inputText.value = '';
}

function validateName(name) {
	let regex = /[A-Za-zА-Яа-яЁё]/;

	return regex.test(name);
}

function validateEmail(email) {
	let regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(String(email).toLowerCase());
}

function validationForm() {
	let result = true;
	let nameValue = inputName.value;
	let emailValue = inputEmail.value;

	for (const input of allFormInputs) {
		if (input.value === '') {
			result = false;
			input.classList.add('error');

			console.log('ERROR');
		} else {
			input.classList.remove('error');
		}
	}

	if (!validateName(nameValue)) {
		console.log('Name not valid');
		inputName.classList.add('error');
		result = false;
	} else {
		inputName.classList.remove('error');
	}

	if (!validateEmail(emailValue)) {
		console.log('Email not valid');
		inputEmail.classList.add('error');
		result = false;
	} else {
		inputEmail.classList.remove('error');
	}

	return result;
}

function request() {
	let requestJSON;
	let formData = getFormInput();

	let request = new Request(
		formData.get('name'),
		formData.get('email'),
		formData.get('message')
	);

	requestJSON = JSON.stringify(request);
	data = request;

	console.log(requestJSON);

	return data;
}

// Отправка формы
function submitForm(e) {
	e.preventDefault();

	if (validationForm()) {
		console.log('Form validate!');

		request();
		resetInputs();
		// console.log(data.name);

		showPopup();
	} else {
		console.log('Form NOT validate!');
	}
}

// Popup
function styleNonePopup() {
	popup.style.display = 'none';
	body.classList.remove('lock');
}

function showPopup() {
	// popupInnerName.innerText = `Ваше имя: ${data.name}`;
	popupInnerName.innerText = ` ${data.name}`;
	// popupInnerEmail.innerText = `Ваш Email: ${data.email}`;
	popupInnerEmail.innerText = ` ${data.email}`;
	// popupInnerMessage.innerText = `Ваше сообщение: ${data.message}`;
	popupInnerMessage.innerText = ` ${data.message}`;

	popup.style.display = 'block';
	body.classList.toggle('lock');
}

function closePopup(e) {
	if (
		e.target.classList.contains('popup') ||
		e.target.classList.contains('popup__close')
	) {
		styleNonePopup();
	}
}

// Вынос навигации слайдера за пределы контейнера Swiper
swiperPrev.addEventListener('click', () => swiper.slidePrev());
swiperNext.addEventListener('click', () => swiper.slideNext());
btnBurger.addEventListener('click', showBurgerMenu);
navBtn.addEventListener('click', onMenuLinkClick);
arrowLink.addEventListener('click', onMenuLinkClick);
document.addEventListener('keydown', escapeDown);
form.addEventListener('submit', submitForm);
window.addEventListener('click', closePopup);
