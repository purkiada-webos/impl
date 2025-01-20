const form = document.getElementById('form') as HTMLFormElement | null;
const usernameInput = document.getElementById('username-input') as HTMLInputElement | null;
const passwordInput = document.getElementById('password-input') as HTMLInputElement | null;
const errorMsg = document.getElementById('error-msg') as HTMLParagraphElement | null;

if (form) {
    form.addEventListener('submit', function (e) {
        if (!usernameInput || !passwordInput || !errorMsg) {
		e.preventDefault()
		if (errorMsg) {
			errorMsg.innerText = 'Fill in all fields.'
		};

		return;	
	};

        const errors = getLoginErrors(usernameInput.value, passwordInput.value);

        if (errors.length > 0) {
            e.preventDefault();
            errorMsg.innerText = errors.join('. ');
        }
    });
}

export function getLoginErrors(username: string, password: string): string[] {
    const errors: string[] = [];

    if (!username || username.trim() === '') {
        errors.push('Username is required');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
    }

    if (username && username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (password && password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    return errors;
}

export function validateCredentials(username: string, password: string): boolean {
    const errors = getLoginErrors(username, password);
    return errors.length === 0;
}

const allInputs = [usernameInput, passwordInput]

allInputs.forEach(function(input) {
	input?.addEventListener('input', function() {
		if (input?.parentElement?.classList.contains('incorrect')) {
			input.parentElement.classList.remove('incorrect')
			if (errorMsg) {
				errorMsg.innerText = ''
			}
		};
	});
});

