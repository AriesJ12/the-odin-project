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
  renderRow(tempBook)
  return true;
};

function removeBookToLibrary(ID) {
  const index = myLibrary.findIndex((book) => book.id === ID);
  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
  // remove row
  const row = document.getElementById(ID)
  row.remove()
}

function renderRow(tempBook){
    const INFO = tempBook.info()
    const HAS_READ = tempBook.hasRead()
    const ID = tempBook.id
    const TBODY = document.getElementById("tableBookBody")
    
    const row = document.createElement("tr");
    row.id = ID

    const infoCell = document.createElement("td");
    infoCell.textContent = INFO

    const readCell = document.createElement("td");
    const readCheckBox = document.createElement("input")
    readCheckBox.type = "checkbox"
    readCheckBox.name = `${ID}_read`;
    readCheckBox.id = `${ID}_read`;
    readCheckBox.checked = HAS_READ;

    readCheckBox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        let book = myLibrary.find(o => o.id === ID);
        book.updateRead(isChecked)
    });

    readCell.append(readCheckBox)

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.type = "button"
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        removeBookToLibrary(ID)
    });

    row.appendChild(infoCell);
    row.appendChild(readCell);
    row.appendChild(removeCell);

    TBODY.appendChild(row);
}
