const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey =  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkNDRkMzZhMTllZjAwMTRkNmU0NTEiLCJpYXQiOjE2ODE3MzY5MTUsImV4cCI6MTY4Mjk0NjUxNX0.5jIj6nRgEP_a4Jtm4CLtCxslun_bKaNKtc9rNmuqfY4`

const form = document.getElementById('user-form');

const idProductNuovo = document.getElementById('id-product-nuovo')
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('image-url');
const priceInput = document.getElementById('price');





form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const isFormValid = handleFormValidation()
    if (!isFormValid) return false

    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    }
    try {
        if(idProductNuovo.value === "" ){
            const response = await fetch(apiUrl, {
                method : 'POST',
                body : JSON.stringify(product),
                headers : new Headers ({
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-type" : 'application/json; charset=UTF-8'
                })
            })
            window.location.href = 'formAggiunta.html?status=aggiunta-prodotto'
        } else  {
            const risposta = await fetch(`${apiUrl}${idProductNuovo.value}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: new Headers ({
                    "Authorization": `Bearer ${apiKey}`,
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            if (risposta.ok) {
                window.location.href = 'formAggiunta.html?status=edit-ok'
            } else {
                alert('Errore durante la modifica dell\'prodotto')
            }
        } 
    } catch (error) {
        console.log(error);
    }
})


function validateForm() {
    const errors = {}

    const nameValue = document.getElementById('name').value;
    const descriptionValue = document.getElementById('description').value;
    const brandValue = document.getElementById('brand').value;
    const imageUrlValue = document.getElementById('image-url').value;
    const priceValue = document.getElementById('price').value;



    if (!nameValue) errors.name = "ERRORE, devi inserire il testo nello spazio."
    else errors.name = ""

    if (!descriptionValue) errors.description = "ERRORE, devi inserire il testo nello spazio."
    else errors.description = ""

    if (!brandValue) errors.brand = "ERRORE, devi inserire il testo nello spazio."
    else errors.brand = ""

    if (!imageUrlValue) errors.url = "ERRORE, devi inserire il testo Url nello spazio."
    else if (!imageUrlValue.startsWith("http")) errors.url = "ERRORE, devi inserire il testo iniziando con http:// nello spazio."
    else errors.url = ""

    if (isNaN(priceValue)) errors.price = "ERRORE, il prrezzo lo devi inserire in cifre nello spazio."
    else if (!priceValue) errors.price = "ERRORE, devi inserire il prezzo nello spazio."
    else  errors.price = ""



    
    return {
        errors,
        isValid: Object.values(errors).every(value => value === "") 
    }
}

function handleFormValidation() {
    const validation = validateForm()
    let isValid = true;

    if (!validation.isValid) {
        for (const key in validation.errors) {

            const elementError = document.getElementById(`${key}-error`)
            elementError.textContent = '';
            elementError.textContent = validation.errors[key];
        }
        isValid = false;
    } 

    return isValid
}



function creaProdotto(titolo) {
    window.location.href = 'formAggiunta.html?status=Nuovo-prodotto'
    titoloPage(titolo)
}

async function getToken() {
    try{
        const response = await fetch(apiUrl,{
            headers: {
                "Authorization": `Bearer ${apiKey}`                
            }
        })
        const data = await response.json()
        // console.log(data);
        // tableBody(data)
        setTimeout(() => {
            document.querySelector(".spinner-container").classList.add("d-none")
            tableBody(data);
        }, 1000)
        titoloPage()
    } 
    catch (error){
        console.log('Errore nel recupero degli utenti: ', error);
    }
}

getToken()

// CREAZIONE DELLA TABBELLA 

function tableBody(product) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    product.forEach((element) => {
        const row = `
        <tr>
            <td class="td-body">${element._id}</td>
            <td class="td-body">${element.name}</td>
            <td class="td-body"> <p class="descrizione">${element.description}</p></td>
            <td class="td-body">${element.brand}</td>
            <td class="td-body"><p class="td-img">${element.imageUrl}</p></td>
            <td class="td-body">${element.price} € </td>
            <td class="td-body">${element.userId}</td>
            <td class="td-body">${element.createdAt}</td>
            <td class="td-body">${element.updatedAt}</td>
            <td class="td-button">
            <button class="btn btn-primary me-2" onclick="getProductData('${element._id}')">Modifica</button>
            <button class="btn btn-danger" onclick="deleteProduct('${element._id}')">Elimina</button>
            </td>
        </tr>
        `
        tableBody.innerHTML += row 
    });
}


// ELIMINAZIONE DEL PRODOTTO

async function deleteProduct(deleteProductId) {
    if (confirm('Sei siuro di voler eliminare questo Prodotto?')) {
    try {
        await fetch(`${apiUrl}${deleteProductId}`, { 
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-type" : 'application/json; charset=UTF-8'
                },
            method: 'DELETE'} );
        window.location.href = 'formAggiunta.html?status=delete-ok'
    } catch (error) {
        console.log('Errore durante cancellazione di questo Prodotto: ', error);
    }
    }
}


function titoloPage(titolo) {
    const titoloPage = document.getElementById('page-title')
    titoloPage.textContent = titolo ? 'Modifica Prodotto' : 'Crea Prodotto'
}

function goBack() {
    window.location.href = 'index.html'
}

async function getProductData(idProdotto) {
    try {
        const response = await fetch(`${apiUrl}${idProdotto}`,{
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        })
        const prodotto = await response.json()
            idProductNuovo.value = prodotto._id
            nameInput.value = prodotto.name
            descriptionInput.value = prodotto.description
            brandInput.value = prodotto.brand
            imageUrlInput.value = prodotto.imageUrl
            priceInput.value = prodotto.price
            titoloPage(idProdotto)
    } catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
    }
}








// RIPRISTINO TOKEN CON PASSWORD 

async function restPassword() {
    try{
        const response = await fetch(apiUrl, {
            method: 'POST',
            endpoint: `https://striveschool-api.herokuapp.com/api/account/login`,
            requestbody: {
                "username" : `iorioandrea10015@gmail.com`,
                "password": `Epicode97*`
            }
        })
    } catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
    }
}
