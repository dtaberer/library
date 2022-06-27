"use strict";

import { templates } from "./templates.js";

/*
* Class definitions
*********************************************/
class Library {
  constructor() {
    this.inventory = [];
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

/*
* Set up some node descriptors
* context. Puting them in a hash
* makes it easier to look up the required node
* when using the editor.
*********************************************/
const nodes = {
  form: document.getElementById("Form"),
  books: document.getElementById("Booklist"),
  modal: document.getElementById("FormModal"),
  modalButton: document.getElementById("NewBookButton"),
  closeModal: document.getElementById("CloseModalButton"),
  inputId: document.getElementById("InputId"),
  inputs: document.querySelectorAll(".input"),
  checkboxes: document.querySelectorAll(".checkbox"),
  modalTitle: document.getElementById("modalTitle"),
  newBookButton: document.getElementById('NewBookButton'),
}

/*
* Create some non enumerable properties
* for handling soft deletion, marking a record 
* to show it has been edited, and for storing
* an id. 
*********************************************/
function defineBookProperties(obj, value) {
  Object.defineProperty(obj, 'id', {
    value: value,
    enumerable: false
  });

  Object.defineProperty(obj, 'deleted', {
    value: false,
    enumerable: false,
    writable: true,
  });

  Object.defineProperty(obj, 'edited', {
    value: false,
    enumerable: false,
    writable: true,
  });

  Object.defineProperty(obj, ' created_at', {
    value: false,
    enumerable: false,
    writable: true,
  });
}

/*
* Method for adding new books to the library
*********************************************/
Library.prototype.add = function(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  const id = this.inventory.length;
  defineBookProperties(book, id);
  book.created_at = Date.now();
  this.inventory.push(book);
  nodes.books.innerHTML += templates.tableRow(book);
}

/*
* Soft delete by specified book
*********************************************/
Library.prototype.markAsDeleted = function(id) {
  this.inventory[id].deleted = true;
  this.list();
}

/*
* As we are doing a soft delete, a method
* for returning only books that have not
* been marked for deletion.
*********************************************/
Library.prototype.undeletedBooks = function() {
  return this.inventory.filter(book => !book.deleted);
}

/*
* Top level function for listing out all
* the books to the DOM.
*********************************************/
Library.prototype.list = function() {
  this.createDom();
  this.addRowButtonListeners();
}

/*
* Applies the generated book rows HTML 
* to the DOM
*********************************************/
Library.prototype.createDom = function() {
  nodes.books.innerHTML = templates.tableHeader();
  this.undeletedBooks().forEach( book => {
    nodes.books.innerHTML += templates.tableRow(book);
  });  
}

/*
*  Apply row level listeners, which needs to 
* be done once properly loaded
*********************************************/
Library.prototype.addRowButtonListeners = function() {
  this.undeletedBooks().forEach( book => {
    document.getElementById('TrashButton' + book.id).
      addEventListener('click', e => this.markAsDeleted(book.id));

    document.getElementById('EditButton' + book.id).
      addEventListener('click', e => this.edit(book));
  }); 
}

/*
* used by a click event listener for the
* row level edit button
*********************************************/
Library.prototype.edit = function(book) {
  console.log("test")
  const modal = nodes.modal;
  nodes.modalTitle.innerHTML = "Edit Book Details";
  nodes.inputId.value = book.id;
  nodes.inputs.forEach( node => node.value = book[node.name]);
  nodes.checkboxes.forEach( node => node.checked = book[node.name]);
  toggleModal();
}

/*
* used by the click event listener for
* adding a new book
*********************************************/
let addBook = function() {
  nodes.form.reset();
  const modal = nodes.modal;
  nodes.modalTitle.innerHTML = "Enter New Book Details";
  toggleModal();
}

/*
* Apply row level listeners, which needs to 
* be done once properly loaded - see the
* window 'load' event 
*********************************************/
Library.prototype.update = function(id) {
  let book = this.inventory[id];
  nodes.inputs.forEach(node => book[node.name] = node.value);
  nodes.checkboxes.forEach(node => book[node.name] = node.checked);
  book.edited = true;
}

Library.prototype.insert = function() {
  let params = {};
  nodes.inputs.forEach(node => params[node.name] = node.value);
  nodes.checkboxes.forEach(node => params[node.name] = node.checked);
  this.add(params.title, params.author, params.pages, params.read);
}

function toggleModal() {
  nodes.modal.classList.toggle("show-modal");
}

nodes.closeModal.addEventListener("click", toggleModal);
nodes.newBookButton.addEventListener("click", addBook);

nodes.form.addEventListener("submit", (e, i) => {
  e.preventDefault();
  let id = nodes.inputId.value;
  id ? update(id) : insert();
  toggleModal();
  library.list();
});

/* 
* When the user clicks anywhere outside of the 
* modal, close it
*********************************************/
window.onclick = function(event) {
  if (event.target == nodes.modal) {
    toggleModal();
  }
}

/* When the document is loaded, build out the 
* DOM and apply listeners for row level 
* buttons
*********************************************/
window.addEventListener("load", () => {
  library.list();
});

let library = new Library;
let insert = library.insert.bind(library);
let update = library.update.bind(library);

/*
* Set up some initial books for testing
*********************************************/
library.add('The Secret Diary of Adrian Mole', 'Sue Townsend', 493, false);
library.add('Grid Wars', 'K. C. Martin', 271, true);
library.add('Atlas Shrugged', 'Ayn Rand', 341, true);
library.add('The Fountain Head', 'Ayn Rand', 271, true);





