function Book(title, author, noPages) {
    this.author = author;
    this.title = title;
    this.noPages = noPages;
    this.isRead = false;
}

Book.prototype.toggleReadBook = function() {
    this.isRead = !this.isRead;
}

const library = [];

const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector(".new-book-button");
const dialogForm = document.querySelector("dialog form");
const confirmButton = document.querySelector(".confirm");
const formInputs = document.querySelectorAll("form input");
const books = document.querySelector(".books");
const styleElem = document.head.appendChild(document.createElement("style"));
let bookIndex;
let readStatus;

showDialogButton.addEventListener("click", () => {
    dialog.showModal();
});

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    if(dialogForm.checkValidity()) {
        addBookToLibrary(...makeNewBookCard(new Book(...Array.from(formInputs).map(current => current.value))));
        dialogForm.reset();
        dialog.close();
    }
    else dialogForm.reportValidity();
});

books.addEventListener("click", (event) => {
    switch(event.target.type) {
        case "button":
            removeBook(event);
            break;
        case "checkbox":
            toggleBookReadStatus(event);
            break;
    }
});

function makeNewBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    const bookTitle = document.createElement("div");
    bookTitle.className = "title";
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("div");
    bookAuthor.className = "author";
    bookAuthor.textContent = book.author;
    const bookPages = document.createElement("div");
    bookPages.className = "pages";
    const bookPagesNumber = document.createElement("span");
    bookPagesNumber.className = "num";
    bookPagesNumber.textContent = book.noPages;
    bookPages.appendChild(bookPagesNumber);
    bookPages.appendChild(document.createTextNode(book.noPages == 1 ? " page" : " pages"));
    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "is-read";
    const checkboxLabel = document.createElement("label");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.name = "is-book-read";
    checkboxLabel.append(checkboxInput, document.createTextNode(" read book"));
    checkboxDiv.appendChild(checkboxLabel);
    const bookRemove = document.createElement("div");
    bookRemove.className = "remove-book";
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    bookRemove.appendChild(removeButton);
    bookCard.append(bookTitle, bookAuthor, bookPages, checkboxDiv, bookRemove);
    return [book, bookCard];
}

function addBookToLibrary(book, bookCard) {
    library.push([book, bookCard]);
    bookCard.setAttribute("book-index", library.length - 1);
    bookCard.setAttribute("id", `b${library.length - 1}`);
    books.appendChild(bookCard);
}

function removeBook(event) {
    bookIndex = +event.target.parentNode.parentNode.getAttribute("book-index");
    books.removeChild(library[bookIndex][1]);
    library.splice(bookIndex, 1);
    adjustBookIndex();
}

function adjustBookIndex() {
    for(let i = 0 ; i < library.length ; i++) {
        library[i][1].setAttribute("book-index", i);
        library[i][1].setAttribute("id", `b${i}`);
    }
    changeReadStatus();
}

function toggleBookReadStatus(event) {
    bookIndex = +event.target.parentNode.parentNode.parentNode.getAttribute("book-index");
    library[bookIndex][0].toggleReadBook();
    changeReadStatus();
}

function changeReadStatus() {
    readStatus = '{content: "read"; background-color: green;}';
    const readBooks = library.filter((current) => {
        return current[0].isRead;
    })
    if(readBooks.length) readStatus = `#${readBooks[0][1].id}::before` + readStatus;
    for(let i = 1 ; i < readBooks.length ; i++) {
        readStatus = `#${readBooks[i][1].id}::before,` + readStatus;
    }
    styleElem.innerHTML = readStatus;;
}

// SAMPLE BOOK
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));
addBookToLibrary(...makeNewBookCard(new Book("Sample Book", "competitive-flamingo", 1)));