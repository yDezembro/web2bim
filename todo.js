function listLocalStorageItems(inputs) {
    const localstorageResults = document.querySelector('#localstorage-results')
    localstorageResults.textContent = ''

    if (typeof inputs === 'string') {
        localstorageResults.innerHTML = `<p id="task"> ${element} </p> <hr />  <br />`
    } else {
        inputs.forEach(element => {
            localstorageResults.innerHTML += `<p id="task"> ${element} </p> <hr /> <br />`
        })
    }    
}

function updateLocalStorage(inputValue) {
    if (localStorage.getItem('inputs')) {
        let arrayOfInputs = JSON.parse(localStorage.getItem('inputs'))
        arrayOfInputs.push(inputValue)
        listLocalStorageItems(arrayOfInputs)
        const value = JSON.stringify(arrayOfInputs)
        localStorage.setItem('inputs', value)
    } else {
        localStorage.setItem('inputs', JSON.stringify([inputValue])) // Convertendo para string antes de armazenar
        listLocalStorageItems([inputValue])
    }
}

function submited() {
    const inputValue = document.querySelector('#input-field').value;
    
    if (inputValue) {
        updateLocalStorage(inputValue)
    }
}