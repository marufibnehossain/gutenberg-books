const API_URL = 'https://gutendex.com/books';
let currentPageUrl = API_URL;

/**
 * Fetches books from the API and returns the results.
 * @param {string} url - The API URL for fetching books.
 */
async function fetchBooks(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}
