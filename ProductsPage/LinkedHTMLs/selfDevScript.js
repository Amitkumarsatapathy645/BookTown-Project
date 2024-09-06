import books from "../../DataBase/Data.js";
import productMaker from "../defaultScript.js";

function defaultCondition() {
  const getBooks = books().filter((product) =>
    product.categorie.includes("self-dev")
  );
  productMaker(getBooks);
}
defaultCondition();

// search section

const main = document.querySelector("#thumb");
const searchBar = document.querySelector(".searchBar");

let timeoutId;

const updateDisplay = (filteredBooks) => {
  const fragment = document.createDocumentFragment();
  filteredBooks.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.className = "thumb-wrapper flex-column shadow";
    bookElement.innerHTML = `
      <div class="img-box">
        <img src="${book.cover}" class="img-fluid" alt="book cover">
      </div>
      <div class="thumb-content">
        <h4 class="book-name">${book.name}</h4>
        <div class="star-rating">${book.stars}</div>
        <p class="item-price"><strike class="">${book.lastPrice || ""}</strike><b>$${book.price}</b></p>
        <button class="btn btn-outline-danger"> Add to Cart <i class="bi bi-bag"></i></button>
      </div>`;
    fragment.appendChild(bookElement);
  });
  main.innerHTML = ""; // Clear previous content
  main.appendChild(fragment); // Append new content
};

searchBar.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (Boolean(searchBar.value)) {
      const filteredBooks = books().filter((book) =>
        book.name.includes(searchBar.value) && book.categorie.includes("self-dev")
      );
      updateDisplay(filteredBooks);
    }
  }, 300); // Debounce time
});