/**
 * Filters the book list in real-time based on the search input.
 * @param {Event} event - The input event from the search bar.
 */
function searchBooks(event) {
    const searchTerm = event.target.value.toLowerCase();
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        const title = book.querySelector('h3').textContent.toLowerCase();
        book.style.display = title.includes(searchTerm) ? '' : 'none';
    });
}
