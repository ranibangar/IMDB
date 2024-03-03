// Get favorites array from localStorage 
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Loop through favorites array
favorites.forEach(async (id) => {

  // Fetch details for each movie
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=e9005a56`);
  const movie = await res.json();

  // Display each movie
  display(movie);
  
});

// Display movie card
function display(movie) {

  const html = `
    <div class="movie">
    <div>
    <img src="${movie.Poster}">
    </div>
      <div>
      <h2>${movie.Title}</h2>
      <p>Director: ${movie.Director}</p>
      <p>Actors:${movie.Actors}</p>
      <p>Genre:${movie.Genre}</p>
      <p>${movie.Plot}</p>
      <button class="removeBtn" data-id="${movie.imdbID}">Remove</button> 
      </div>
      
    </div>
  `;

  document.getElementById('movies').insertAdjacentHTML('beforeend', html);

}

// Remove favorite  
document.addEventListener('click', (e) => {

  if(e.target.classList.contains('removeBtn')) {

    const movieId = e.target.dataset.id;
    
    // Remove from favorites array
    let favorites = getFavorite();
    favorites = favorites.filter(id => id !== movieId);
    saveFavorite(favorites);
    
    // Remove from DOM
    const movieEl = e.target.closest('.movie');
    movieEl.remove();

  }

});

// Get favorites
function getFavorite() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Save favorites
function saveFavorite(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites)); 
}