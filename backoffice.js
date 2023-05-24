const apiUrl = 'http://localhost:3000/'

const form = document.getElementById('user-form');

const userIdInput = document.getElementById('user-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const usernameInput = document.getElementById('username');
const cityInput = document.getElementById('city');
const companyInput = document.getElementById('company');

function goBack() {
  window.location.href = 'index.html'
}


form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    username: usernameInput.value,
    phone: phoneInput.value,
    address: {
      city: cityInput.value
    },
    company: {
      name: companyInput.value
    }
  }

  try {
    
    console.log(user);
    const response = await fetch(`${apiUrl}users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (response.ok) {
      window.location.href = 'index.html'
    } else {
      alert('Errore durante l\'aggiunta del nuovo utente')
    }


  } catch (error) {
    console.log('Si è verificato un errore durante il salvataggio: ', error);
  }


})


function buildPageTitle(userId) {
  const pageTitle = document.getElementById('page-title')
  pageTitle.innerHTML = userId ? 'Modifica utente' : 'Crea nuovo utente'
}

function getUserData() {

  const qsParams = new URLSearchParams(window.location.search);
  const userId = qsParams.get('id')

  buildPageTitle(userId)


  if (userId) {
    // IMPLEMENTARE LOGICA PER MODIFICA UTENTE
  }
  
}


// MAIN
getUserData()