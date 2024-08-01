document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const director = document.getElementById('director').value.trim();
    const year = document.getElementById('year').value.trim();
    const popularity = document.getElementById('popularity').value;

    // Check for inputs , ensure nothing is left out ----------------------------------------
    const errors = [];
    if (title === '') {
        errors.push('Title is required.');
    }
    if (director === '') {
        errors.push('Director is required.');
    }
    if (!popularity || isNaN(popularity) || popularity < 1 || popularity > 5) {
        errors.push('Popularity must be a number between 1 and 5.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const movie = {
        title, director, year, popularity: parseInt(popularity)
    };

    if (editingIndex === null) {
        addMovie(movie);
    } else {
        updateMovie(editingIndex, movie);
        editingIndex = null;
        document.querySelector('form button').textContent = 'Add Movie';
    }

    // RESET
    document.getElementById('movieForm').reset();
});

document.getElementById('movieTableBody').addEventListener('click', function(event) {
    const index = event.target.parentElement.parentElement.dataset.index;
    if (event.target.textContent === 'Edit') {
        editMovie(index);
    } else if (event.target.textContent === 'Delete') {
        confirmDelete(index);
    } 
});

// confirm delete pop-up
function confirmDelete(index) {
    const confirmDelete = confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
        deleteMovie(index);
    }
}
// editing for each id element.
function editMovie(index) {
    const movie = movies[index];
    document.getElementById('title').value = movie.title;
    document.getElementById('director').value = movie.director;
    document.getElementById('year').value = movie.year;
    document.getElementById('popularity').value = movie.popularity;
    editingIndex = index;

// update part when editing, the add button changes to edit
    document.querySelector('form button').textContent = 'Update Movie';
}
// adding part
function addMovie(movie) {
    movies.push(movie);
    saveMovies();
    renderMovies();
}
// updateing part
function updateMovie(index, updatedMovie) {
    movies[index] = updatedMovie;
    saveMovies();
    renderMovies();

    // Reset the form button text to "Add Movie"
    document.querySelector('form button').textContent = 'Add Movie';
}
