const myLibrary = [];

function Book(id, title, author, pages, hasRead) {
  if (!new.target) {
    throw Error("You must use the word 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.info = function () {
    let readText = "has not read yet";
    if (this.hasRead) {
      readText = "has read";
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
  };

  this.updateRead = function (hasRead) {
    this.hasRead = hasRead;
  };
}

const addBookToLibrary = async (event) => {
  // take params, create a book then store it in the array
  event.preventDefault();
  console.log("123");
  const ID = crypto.randomUUID();
  const tempBook = new Book(
    ID,
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("hasRead").value
  );
  myLibrary.push(tempBook);
  return true;
};

function removeBookToLibrary(ID) {
  const index = myLibrary.findIndex((book) => book.id === ID);
  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}
