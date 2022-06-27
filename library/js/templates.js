"use strict";

const templates = (function() {

  const tableHeader = function() {
    const newLocal = `
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read</th>
        <th></th>
        <th></th>
      </tr>`;
    return newLocal;
  }

  const tableRow = function(book) {
    const newLocal = `
    <tr id="Book${book.id}" class="content-row">
        <td class="book-title">${book.title}</td>
        <td class="book-author">${book.author}</td>
        <td class="book-pages">${book.pages}</td>
        <td class="book-read">${book.read ? 'Yes' : 'No'}</td>
        <td><input id="EditButton${book.id}" value="Edit" type="button" class="edit-button row-button" role="button"</td>
        <td><input id="TrashButton${book.id}" value="Remove" type="button" class="trash-button row-button" role="button"</td>
    </tr>`;
    return newLocal
  }

  return {
    tableHeader: tableHeader,
    tableRow: tableRow,
  }
})();

export { templates };