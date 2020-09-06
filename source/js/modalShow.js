function toggleShowBlock(evt, toggle, classBlock) {
	evt.preventDefault();
	if(toggle == true) {
		modal.classList.add(classBlock);
	} else {
		modal.classList.remove(classBlock);
	}
}

let modal = document.querySelector(".modal");
let openButtons = document.querySelectorAll(".modal-button");
let close = document.querySelectorAll(".modal__close");

openButtons.forEach(function(item) {
  item.addEventListener('click', function(evt) {
		toggleShowBlock(evt, true, "modal__show");
   });
});

close.forEach(function(item) {
item.addEventListener("click", function(evt) {
	toggleShowBlock(evt, false, "modal__show");
	});
});

window.addEventListener("keydown", function(evt) {
		if (evt.keyCode === 27) {
			toggleShowBlock(evt, false, "modal__show");
		}
});