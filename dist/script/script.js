// select element from the DOM
const nameIput = document.querySelector('#nameInput'),
emailInput = document.querySelector('#emailInput'),
dateBooked = document.querySelector('#date'),
description = document.querySelector('#description'),
form = document.querySelector('.form');

var books = []


//  EVENTS LISTENERS
// submit a booking
form.addEventListener('submit', addBook);

// cancel booking

document.querySelector('#table__row').addEventListener('click', (e) =>{
    removeFromUI(e.target)
})


// Reusable functions

function validation(message, className){
    const valid = document.querySelector('.validation');
    valid.className = `alert alert-${className}`;
    valid.innerHTML = `${message}`;
    // console.log(valid)

    setTimeout(() => {
        valid.remove()
    }, 3000)
};

function removeFromUI(element){
    if(element.classList.contains('btn-delete')){
        if(confirm('are you sure you want to cancel your photo session')){
        let id = element.parentElement.firstElementChild.textContent;
        console.log(typeof id)
        let newBooks = books.filter(book => book.id !== Number(id)) // initially ParseInt(id)
        books = newBooks;
        localStorage.setItem("books", JSON.stringify(books));
        element.parentElement.remove();
        validation('your photo session has been removed sucessfully. Thanks!', 'success')
        }
    }
}

function clearFeilds(){
    nameIput.value = '';
    emailInput.value = '';
    date.value = '';
    description.value = '';
};

//  create an object

class Book{
    constructor(name, email, date, description){
        this.name = name;
        this.email = email;
        this.date = date;
        this.description =description;
    }
}



storedBooks = JSON.parse(localStorage.getItem("books"))
books.push(...storedBooks)
// dummy booking
// const books = [
//     {
//         "name": "benedict",
//         "email": "benedic@janajn",
//         "date": "1-1-2022",
//         "description": "Lorem ipsum dolor sit amet, consectetur"
//     },

//     {
//         "name": "benedicta",
//         "email": "benedic@janajn",
//         "date": "1-1-2022",
//         "description": "Lorem ipsum dolor sit amet, consectetur "
//     }
// ]


function bookStore(books){
    books.forEach(book => {
       const tableBody = document.querySelector('#table__row');
       const thead = document.createElement('tr');
       thead.innerHTML =  `
        <td>${book.id}</td>
         <td>${book.name}</td>
         <td>${book.email}</td>
         <td>${book.date}</td>
         <td>${book.description}</td>
         <td class = "btn bg-danger btn-sm btn-danger btn-delete">X</td>
         `

       // append elements
       tableBody.appendChild(thead)
       
    })
}


// submit a book
// Show books
document.addEventListener('DOMContentLoaded', bookStore(books))

//  add book to list

function addBook(e){
    e.preventDefault()

    if(nameIput.value === ''|| emailInput.value === '' || date.value === '' || description.value === '' ){
        validation('please Enter all Feilds', 'danger')
    }
    else{
        const tableBody = document.querySelector('#table__row');
        const thead = document.createElement('tr');

        const newData = {
            "id": books.length+1,
            "name": nameIput.value,
            "email": emailInput.value,
            "date": dateBooked.value,
            "description": description.value
        }
        books.push(newData)
        localStorage.setItem("books", JSON.stringify(books));


    
        thead.innerHTML = `
        <td> ${newData["id"]}</td>
        <td> ${nameIput.value}</td>
        <td> ${emailInput.value}</td>
        <td> ${dateBooked.value}</td>
        <td> ${description.value}</td>
        <td class ="btn btn-sm btn-delete btn-danger bg-danger">X</td>
        `;
        // console.log(thead)
    
        validation('Your photosession has been booked successfuly and we will reply you shortly', 'success');
        tableBody.appendChild(thead);
        clearFeilds();
    };
   
}

console.log(typeof addBook)