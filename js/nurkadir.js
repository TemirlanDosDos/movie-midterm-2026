document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('watchlist-form');
    const tableBody = document.getElementById('watchlist-body');
    const feedback = document.getElementById('watchlist-feedback');
    const storageKey = 'cinescope-nurkadir-watchlist';
    const statuses = ['Plan to watch', 'Watching', 'Watched'];
    let movies = [];
    let nextId = 1;
    let editingId = null;

    function validateMovie(title, genre, rating, status) {
        if (title.trim() === '') {
            return 'Please enter a movie title.';
        }
        if (genre.trim() === '') {
            return 'Please enter a genre.';
        }
        if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
            return 'Please enter a numeric rating from 1 to 10.';
        }
        if (!statuses.includes(status)) {
            return 'Please select a valid status.';
        }
        return '';
    }

    function loadMovies() {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === null) {
                return;
            }
            const data = JSON.parse(saved);
            if (!Array.isArray(data)) {
                throw new Error('Invalid movie list');
            }
            const ids = [];
            for (let i = 0; i < data.length; i++) {
                const movie = data[i];
                if (!movie || !Number.isSafeInteger(movie.id) || movie.id < 1 ||
                    movie.id >= Number.MAX_SAFE_INTEGER || ids.includes(movie.id) ||
                    typeof movie.title !== 'string' || typeof movie.genre !== 'string' ||
                    validateMovie(movie.title, movie.genre, movie.rating, movie.status) !== '') {
                    throw new Error('Invalid movie');
                }
                ids.push(movie.id);
            }
            movies = data;
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].id >= nextId) {
                    nextId = movies[i].id + 1;
                }
            }
        } catch (error) {
            feedback.textContent = 'Saved movies could not be loaded. The list starts empty. Adding a movie will try to save a new list.';
        }
    }

    function saveMovies(message) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(movies));
            feedback.textContent = message;
        } catch (error) {
            feedback.textContent = message + ' Could not save in this browser. Changes may be lost after refresh.';
        }
    }

    function addAction(container, label, action, secondary) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        if (secondary) {
            button.className = 'watchlist-secondary';
        }
        button.addEventListener('click', action);
        container.appendChild(button);
    }

    function renderMovies() {
        tableBody.textContent = '';
        if (movies.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 5;
            cell.textContent = 'Your watchlist is empty. Add your first movie above.';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const row = document.createElement('tr');
            if (movie.id === editingId) {
                row.innerHTML = '<td><input id="watchlist-edit-title" aria-label="Edit movie title" required></td>' +
                    '<td><input id="watchlist-edit-genre" aria-label="Edit genre" required></td>' +
                    '<td><input id="watchlist-edit-rating" aria-label="Edit rating" type="number" min="1" max="10" step="any" required></td>' +
                    '<td><select id="watchlist-edit-status" aria-label="Edit status"><option>Plan to watch</option><option>Watching</option><option>Watched</option></select></td>';
                row.querySelector('#watchlist-edit-title').value = movie.title;
                row.querySelector('#watchlist-edit-genre').value = movie.genre;
                row.querySelector('#watchlist-edit-rating').value = movie.rating;
                row.querySelector('#watchlist-edit-status').value = movie.status;
            } else {
                const values = [movie.title, movie.genre, movie.rating, movie.status];
                for (let j = 0; j < values.length; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = values[j];
                    row.appendChild(cell);
                }
            }
            const cell = document.createElement('td');
            const actions = document.createElement('div');
            actions.className = 'watchlist-actions';
            if (movie.id === editingId) {
                addAction(actions, 'Save', function () { updateMovie(movie.id); }, false);
                addAction(actions, 'Cancel', function () {
                    editingId = null;
                    renderMovies();
                    feedback.textContent = 'Editing cancelled.';
                }, true);
            } else {
                addAction(actions, 'Edit', function () { editMovie(movie.id); }, false);
            }
            addAction(actions, 'Delete', function () { deleteMovie(movie.id); }, true);
            cell.appendChild(actions);
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    }

    function addMovie(event) {
        event.preventDefault();
        if (editingId !== null) {
            feedback.textContent = 'Save or cancel your current edit before adding a movie.';
            return;
        }
        const title = document.getElementById('watchlist-title').value.trim();
        const genre = document.getElementById('watchlist-genre').value.trim();
        const rating = Number(document.getElementById('watchlist-rating').value);
        const status = document.getElementById('watchlist-status').value;
        const error = validateMovie(title, genre, rating, status);
        if (error !== '') {
            feedback.textContent = error;
            return;
        }
        movies.push({ id: nextId, title: title, genre: genre, rating: rating, status: status });
        nextId++;
        renderMovies();
        saveMovies('Movie added.');
        form.reset();
    }

    function editMovie(id) {
        if (editingId !== null) {
            feedback.textContent = 'Save or cancel your current edit first.';
            return;
        }
        editingId = id;
        renderMovies();
        feedback.textContent = 'Edit the movie in its row, then choose Save or Cancel.';
        document.getElementById('watchlist-edit-title').focus();
    }

    function updateMovie(id) {
        const title = document.getElementById('watchlist-edit-title').value.trim();
        const genre = document.getElementById('watchlist-edit-genre').value.trim();
        const rating = Number(document.getElementById('watchlist-edit-rating').value);
        const status = document.getElementById('watchlist-edit-status').value;
        const error = validateMovie(title, genre, rating, status);
        if (error !== '') {
            feedback.textContent = error;
            return;
        }
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === id) {
                movies[i].title = title;
                movies[i].genre = genre;
                movies[i].rating = rating;
                movies[i].status = status;
            }
        }
        editingId = null;
        renderMovies();
        saveMovies('Movie updated.');
    }

    function deleteMovie(id) {
        if (editingId !== null && editingId !== id) {
            feedback.textContent = 'Save or cancel your current edit first.';
            return;
        }
        const confirmed = confirm('Are you sure you want to delete this movie?');
        if (!confirmed) {
            return;
        }
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === id) {
                movies.splice(i, 1);
                break;
            }
        }
        if (editingId === id) {
            editingId = null;
        }
        renderMovies();
        saveMovies('Movie deleted.');
    }

    form.addEventListener('submit', addMovie);
    loadMovies();
    renderMovies();
});
