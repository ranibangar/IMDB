// Get search input
const searchInput = document.getElementById('search');

// Search function 
const searchMovies = async (query) => {

  // Make API request
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=e9005a56`);
  const data = await res.json();

  // Display results 
  data.Search.forEach(movie => {
    const html = `
      <div class="movie">
        <div>
          <img id="poster-${movie.imdbID}" src="${movie.Poster}" class="inx-movie-img" />
        </div>
        <div>
          <h2 data-id="${movie.imdbID}">Title: ${movie.Title}</h2>
          <p>Year: (${movie.Year})</p>
          <button class="favorite" data-id="${movie.imdbID}">&#9829;</button>
        </div>
      </div>
    `;

    document.getElementById('results').insertAdjacentHTML('beforeend', html);
  });
}


// Listen for search input changes
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  searchMovies(query);
});

// Listen for movie click
document.addEventListener('click', (e) => {

    // Check if click target is movie title 
    if(e.target.matches('h2')) {
  
      const id = e.target.dataset.id;
  
      // Navigate to movie page
      window.location.href = `movie.html?id=${id}`;
  
    }
  
  });


// Favorite movie 
document.addEventListener('click', (e) => {

    if(e.target.matches('.favorite')) {
  
      const movieId = e.target.dataset.id;
      
      // Add to favorites
      addToFavorites(movieId);
  
      // Navigate to favorites page
      window.location.href = 'favorites.html';
  
    }
  
  })
  
  function addToFavorites(id) {
    let favorites = getFavorites();
    favorites.push(id);
    saveFavorites(favorites);
  }
  
  function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || []; 
  }
  
  function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }