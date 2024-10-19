document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (bookId) {
        fetchBookDetails(bookId);
    }
});

async function fetchBookDetails(bookId) {
    try {
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        const book = await response.json();
        renderBookDetails(book);
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function renderBookDetails(book) {
    const bookDetailsElement = document.getElementById('bookDetails');
    const allGenres = [...new Set([...book.bookshelves, ...book.subjects])];
    const displayGenres = allGenres.slice(0, 5).join(', ') + (allGenres.length > 5 ? '...' : '');
    const isInWishlist = wishlist.includes(book.id);
    const buttonText = isInWishlist ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';

    bookDetailsElement.innerHTML = `
        <h1>${book.title}</h1>
        <img src="${book.formats['image/jpeg'] || 'placeholder.jpg'}" alt="${book.title}">
        <p><strong>Author(s):</strong> ${book.authors.map(author => author.name).join(', ')}</p>
        <p><strong>Genres:</strong> ${displayGenres}</p>
        <p><strong>Download count:</strong> ${book.download_count}</p>
        <button onclick="addToWishlist(${book.id})" data-book-id="${book.id}">${buttonText}</button>
    `;
}
