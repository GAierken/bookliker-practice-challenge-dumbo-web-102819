const booksUl = document.getElementById('list')
const bookDiv = document.getElementById('show-panel')

fetch("http://localhost:3000/books")
.then(r => r.json())
.then(booksArry =>  {
    booksArry.forEach(turnJsonToHtml)})




function turnJsonToHtml(book){
    bookLi = document.createElement("li")
    bookLi.innerText = book.title
    booksUl.append(bookLi)
    
    
        

    bookLi.addEventListener('click', (evt) => {
        
        bookDiv.innerHTML = `<h1></h1><img src=${book.img_url}><p>${book.description}</p>`
        
        book.users.forEach((user) => {
            userH5 = document.createElement('h5')
            userH5.innerText = user.username
            bookDiv.appendChild(userH5)
        })
         likeBtn = document.createElement('button')
         likeBtn.innerText = "Like"
         bookDiv.append(likeBtn)

         likeBtn.addEventListener('click', (evt) => {
             book.users.push({
                "id": 1,
                "username": "pouros"
              })

              fetch(`http://localhost:3000/books/${book.id}`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                      "Accepnt": "application/json"
                  },
                  body: JSON.stringify(book.users)
              })
              .then(r => r.json())
              .then((bookObj) => {
                newUserH5 = document.createElement("h5")
                newUserH5.innerText = book.users[book.users.length-1].username
                allH5 = document.querySelectorAll("h5")
                lastH5 = allH5[allH5.length-1]
                lastH5.append(newUserH5)
            }
                )
         })
    })
}