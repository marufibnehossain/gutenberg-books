const bookList = document.getElementById('bookList');



function renderBooks(books) {
    const bookElements = books.map(book => {
        const allGenres = [...new Set([...book.bookshelves, ...book.subjects])];
        const displayGenres = allGenres.slice(0, 3).join(', ') + (allGenres.length > 3 ? '...' : '');
        const isInWishlist = wishlist.includes(book.id);
        const buttonText = isInWishlist ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
        return `
            <div class="book" data-genres="${allGenres.join(', ').toLowerCase()}">
                <img src="${book.formats['image/jpeg'] || 'placeholder.jpg'}" alt="${book.title}" onclick="goToBookDetails(${book.id})">
                <div class="book-info">
                    <h3 onclick="goToBookDetails(${book.id})">${book.title}</h3>
                    <p>${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="genres">${displayGenres}</p>
                    <button onclick="addToWishlist(${book.id})" data-book-id="${book.id}">${buttonText}</button>
                </div>
            </div>
        `;
    }).join('');

    bookList.innerHTML = bookElements;
}

function goToBookDetails(bookId) {
    window.location.href = `book-details.html?id=${bookId}`;
}