/**
 * Fetch details of a single book by its ID.
 * @param {number} bookId - The ID of the book.
 */
async function fetchBookDetails(bookId) {
    try {
        const response = await fetch(`${API_URL}/${bookId}`);
        const book = await response.json();
        return book;
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}
