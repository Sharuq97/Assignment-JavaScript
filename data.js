const API_KEY = '$2a$10$HmXRRZDaepDvFzcLUKL6vO4oM37jfk91O/MuoWFsGIWYkQTqzibby';
const JSON_BIN = '66a74811e41b4d34e4188d4c';
const BASE_URL= 'https://api.jsonbin.io/v3/b/66a74811e41b4d34e4188d4c';

let movies = [];
let editingIndex = null;

async function fetchMovies() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        movies = response.data.record;
        renderMovies();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function saveMovies() {
    try {
        await axios.put(BASE_URL, movies, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            }
        });
    } catch (error) {
        console.error('Error saving movies:', error.response.data);
    }
}
// adding part
function addMovie(movie) {
    movies.push(movie);
    saveMovies();
    renderMovies();
}
// updating part
function updateMovie(index, updatedMovie) {
    movies[index] = updatedMovie;
    saveMovies();
    renderMovies();
}
// deleting part
function deleteMovie(index) {
    movies.splice(index, 1);
    saveMovies();
    renderMovies();
}

function increasePopularity(index) {
    if (movies[index].popularity < 5) {
        movies[index].popularity++;
    }
    saveMovies();
    renderMovies();
}

function decreasePopularity(index) {
    if (movies[index].popularity > 1) {
        movies[index].popularity--;
    }
    saveMovies();
    renderMovies();
}

function renderMovies() {
    const movieTableBody = document.getElementById('movieTableBody');
    movieTableBody.innerHTML = '';

    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index;

        row.innerHTML = `
            <td data-label="Title">${movie.title}</td>
            <td data-label="Director">${movie.director}</td>
            <td data-label="Year">${movie.year}</td>
            <td data-label="Popularity">
                <span>${movie.popularity}</span>
                <button>+</button>
                <button>-</button>
            </td>
            <td data-label="Actions">
                <button>Edit</button>
                <button>Delete</button>
            </td>
        `;

        movieTableBody.appendChild(row);
    });
}

// Fetch movies when the script loads
fetchMovies();