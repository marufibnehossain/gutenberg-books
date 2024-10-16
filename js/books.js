const bookList = document.getElementById('bookList');

/**
 * Renders a list of books on the page.
 * @param {Array} books - The array of books to display.
 */
// function renderBooks(books) {
//     bookList.innerHTML = '';
//     books.forEach(book => {
//         const bookElement = document.createElement('div');
//         bookElement.classList.add('book');
//         const genres = [...book.bookshelves, ...book.subjects].join(', ');
//         bookElement.innerHTML = `
//             <img src="${book.formats['image/jpeg'] || 'placeholder.jpg'}" alt="${book.title}">
//             <h3>${book.title}</h3>
//             <p>${book.authors.map(author => author.name).join(', ')}</p>
//             <p class="genres">${genres}</p>
//             <button onclick="addToWishlist(${book.id})">Add to Wishlist</button>
//         `;
//         bookElement.dataset.genres = genres.toLowerCase();
//         bookList.appendChild(bookElement);
//     });
// }

function renderBooks(books) {
    const bookElements = books.map(book => {
        const allGenres = [...new Set([...book.bookshelves, ...book.subjects])];
        const displayGenres = allGenres.slice(0, 5).join(', ') + (allGenres.length > 3 ? '...' : '');
        return `
            <div class="book" data-genres="${allGenres.join(', ').toLowerCase()}">
                <img src="${book.formats['image/jpeg'] || 'placeholder.jpg'}" alt="${book.title}">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="genres">${displayGenres}</p>
                    <button onclick="addToWishlist(${book.id})">Add to Wishlist</button>
                </div>
            </div>
        `;
    }).join('');

    bookList.innerHTML = bookElements;
}





