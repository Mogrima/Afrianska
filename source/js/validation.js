let form = document.getElementById('feedback');


let elements = form.querySelectorAll('.form__input'),
	button = document.querySelector('.form__button'),
	patternName = /^[a-zA-Z0-9]+$/,
	patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
	patternSpam = /[^\<\>\[\]%\&'`]+$/,
	errorMess = [
		'Blank entry field',
		'Use latin letters please',
		'Enter your email please',
		'Invalid Email Format',
		'Write a message text please',
		'Your message looks like spam, remove special characters.'
	],
	iserror = false;

form.addEventListener('focus', function () {
	let el = document.activeElement;
	if (el !== button) cleanError(el);
}, true);

function getError(formVal, property) {
	let error = '',
		validate = {
			'name': function () {
				if (formVal.name.length == 0) {
					error = errorMess[0];
				} else if (patternName.test(formVal.name) == false) {
					error = errorMess[1];
				}
			},
			'email': function () {
				if (formVal.email.length == 0) {
					error = errorMess[2];
				} else if (patternMail.test(formVal.email) == false) {
					error = errorMess[3];
				}
			},
			'massage': function () {
				if (formVal.massage.length == 0) {
					error = errorMess[4];
				} else if (patternSpam.test(formVal.massage) == false) {
					error = errorMess[5];
				}
			}
		};
	validate[property]();
	return error;
}

[].forEach.call(elements, function (element) {
	element.addEventListener('blur', function (e) {
		let formElement = e.target,
			property = formElement.getAttribute('name'),
			dataField = {};

		dataField[property] = formElement.value;

		let error = getError(dataField, property);
		if (error.length != 0) {
			showError(property, error);

		}

		return false;
	});
});

function showError(property, error) {
	let formElement = form.querySelector('[name=' + property + ']'),
		errorBox = formElement.previousElementSibling;

	formElement.classList.add('form__control-error');
	errorBox.classList.add('form__label-error');
	errorBox.innerHTML = error;

}

function cleanError(el) {
	let errorBox = el.previousElementSibling;
	el.classList.remove('form__control-error');
	errorBox.classList.remove('form__label-error');
}

function getFormData(form) {
	let controls = {};
	if (!form.elements) return '';
	for (let i = 0, ln = form.elements.length; i < ln; i++) {
		let element = form.elements[i];
		if (element.tagName.toLowerCase() !== 'button') {
			controls[element.name] = element.value;
		}
	}
	return controls;
}