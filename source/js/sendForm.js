document.addEventListener('DOMContentLoaded', () => {

	const forms = document.querySelectorAll('.feedback');
	const submitBlock = document.querySelector('.modal__submit');

	const message = {
		loading: 'Sending...',
		success: 'Thank. Form sent',
		failed: 'Something went wrong...'
	};

	let statusMessage = document.createElement('div');
	statusMessage.classList.add('alert');

	const postData = async (url, fData) => {
		document.querySelector('.alert').innerHTML = message.loading;

		let fetchResponse = await fetch(url, {
			method: 'POST',
			body: fData
		});

		return await fetchResponse.text();
	};

	for (let i = 0; i < forms.length; i++) {
		forms[i].addEventListener('submit', async (e) => {
			e.preventDefault();

			forms[i].appendChild(statusMessage);

			const fData = new FormData(forms[i]);
			console.log(fData);

			try {
				await postData('mail.php', fData)
				submitBlock.innerHTML = message.success;
				modal.classList.remove('modal__show');
				submitBlock.classList.add('modal__show');

			} catch (error) {
				statusMessage.innerHTML = message.failed;
			} finally {
				forms[i].reset();
				setTimeout(() => {
					submitBlock.classList.remove('modal__show');
				}, 3000);
			}
		});
	};
});
