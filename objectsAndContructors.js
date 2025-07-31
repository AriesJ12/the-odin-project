// exercise
function Book(title, author, pages, hasRead)
{
    if (!new.target){
        throw Error("You must use the word 'new' operator to call the constructor")
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.info = function() {
        let readText = "has not read yet"
        if (this.hasRead) {
            readText = "has read"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`
    }
}



