const genreSelect = document.getElementById('genreSelect');

/**
 * Fetch genres from the API and populate the dropdown menu.
 */
async function populateGenres() {
    const data = await fetchBooks(API_URL);
    const genres = new Set(data.results.flatMap(book => [...book.bookshelves, ...book.subjects]));
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}


/**
 * Filters books based on selected genre.
 */
function filterByGenre(props) {
    const { genreSelect, bookList } = props;
    const selectedGenre = genreSelect.value.toLowerCase();
    const books = bookList.querySelectorAll('.book');
    books.forEach(book => {
        const genres = book.dataset.genres.toLowerCase();
        book.style.display = genres.includes(selectedGenre) || !selectedGenre ? '' : 'none';
    });
}

genreSelect.addEventListener('change', () => {
    filterByGenre({
        genreSelect: document.getElementById('genreSelect'),
        bookList: document.getElementById('bookList') || document.getElementById('wishlist')
    });
});


// Populate genres on page load
// document.addEventListener('DOMContentLoaded', async () => {
//     const data = await fetchBooks(currentPageUrl);
//     renderBooks(data.results);
//     populateGenres();
// });
