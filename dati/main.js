const apiUrl = 'http://localhost:3000/'


async function fetchUsers() {
  
  try {
    const response = await fetch(`${apiUrl}users`);
    const data = await response.json();

    console.log(data);
    displayUsers(data);

  } catch (error) {
    console.log('Errore nel recupero degli utenti: ', error);
  }
}


function displayUsers(users) {
  
  const tableBody = document.getElementById('users-table-body');
  tableBody.innerHTML = '';

  users.forEach( user => {
    
    const row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.phone}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
        <td>
          <button class="btn btn-primary" onclick="editUsers(${user.id})">Modifica</button>
          <button class="btn btn-danger">Elimina</button>
        </td>
      </tr>
    `

    tableBody.innerHTML += row;
  });
}

function addUser() {
  window.location.href = 'user-form.html'
}

function editUsers(userId) {
  window.location.href = `user-form.html?id=${userId}`
}

// MAIN
fetchUsers()

