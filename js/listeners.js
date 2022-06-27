"use strict";


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

const listeners = (function() {

  nodes.closeModal.addEventListener("click", toggleModal);
  nodes.newBookButton.addEventListener("click", addBook);

  let rowButtonListeners = function(book) {
      console.log("test");
      document.getElementById('TrashButton' + book.id).
        addEventListener('click', e => this.markAsDeleted(book.id));

      document.getElementById('EditButton' + book.id).
        addEventListener('click', e => this.edit(book));
  }

  return {
    rowButtonListeners: rowButtonListeners,
  }
})();

export { listeners, nodes };