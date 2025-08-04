const myLibrary = [];

class Book{
// function Book(id, title, author, pages, hasRead) {
  // if (!new.target) {
  //   throw Error("You must use the word 'new' operator to call the constructor");
  // }
  constructor (id, title, author, pages, hasRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
  
  get info() {
    let readText = "has not read yet";
    if (this.hasRead) {
      readText = "has read";
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
  };

  set updateRead(hasRead) {
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
    document.getElementById("hasRead").checked
  );
  myLibrary.push(tempBook);
  renderRow(tempBook)
  console.log(myLibrary)
  return true;
};

function removeBookToLibrary(ID) {
  const index = myLibrary.findIndex((book) => book.id === ID);
  if (index > -1) {
    // only splice array when item is found
    myLibrary.splice(index, 1); // 2nd parameter means remove one item only
  }
  // remove row
  const row = document.getElementById(ID)
  row.remove()
  console.log(myLibrary)
}

function renderRow(tempBook){
    const INFO = tempBook.info()
    const HAS_READ = tempBook.hasRead
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
        console.log(myLibrary)
    });

    readCell.append(readCheckBox)

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.type = "button"
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        removeBookToLibrary(ID)
    });
    removeCell.appendChild(removeButton)

    row.appendChild(infoCell);
    row.appendChild(readCell);
    row.appendChild(removeCell);

    TBODY.appendChild(row);
}


// html
/*
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      table, th, tr, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <form action="" onsubmit="addBookToLibrary(event)">
      <label>
        Title
        <input type="text" name="title" id="title" />
      </label>
      <label>
        Author
        <input type="text" name="author" id="author" />
      </label>
      <label>
        Pages
        <input type="number" name="pages" id="pages" />
      </label>
      <label>
        Read?
        <input type="checkbox" name="hasRead" id="hasRead" />
      </label>
      <button type="submit">Add book</button>
    </form>
    <table>
        <thead>
            <tr>
              <th>Book info</th>
              <th>Update Read</th>
              <th>Remove</th>
            </tr>

        </thead>
        <tbody id="tableBookBody">

        </tbody>
    </table>
    <script src="projectLibrary.js"></script>
  </body>
</html>
*/