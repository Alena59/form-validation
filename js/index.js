const form = document.getElementById('add-form');

function validation(form) {

  let result = true;

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-message').remove();
      parent.classList.remove('error');
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('span')

    errorLabel.classList.add('error-message')
    errorLabel.textContent = text

    parent.classList.add('error')

    parent.append(errorLabel)
  }

  const allInputs = form.querySelectorAll('input');

  for (const input of allInputs) {

    removeError(input)

    if(input.dataset.minLength) {
      if(input.value.length < input.dataset.minLength) {
        removeError(input)
        createError(input, `Минимальное количество символов: ${input.dataset.minLength}!`)
        result = false
      }
    }

    if(input.dataset.maxLength) {
      
      if(input.value.length > input.dataset.maxLength) {
        removeError(input)
        createError(input, `Максимальное количество символов: ${input.dataset.maxLength}!`)
        result = false
      }
    }

    if(input.dataset.required == 'true') {
      if(input.value == "") {
        removeError(input)
        createError(input, 'Поле не заполнено!')
        result = false
      }
    }
    
  }

  return result
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (validation(this) == true) {
    alert('Форма проверена успешно!')
    form.reset()
  };
})