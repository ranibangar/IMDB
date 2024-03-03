// Get movie id from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Get movie details
const getNewMovie = async () => {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${movieId}&apikey=e9005a56`
  );
  const data = await res.json();

  // Display details
  document.getElementById("title").textContent = `Title:${data.Title}`;
  document.getElementById("poster").src = data.Poster;
  document.getElementById("director").textContent = `Director:${data.Director}`;
  document.getElementById("cast").textContent = `Cast:${data.Actors}`;
  document.getElementById("genre").textContent = `Genre:${data.Genre}`;
  document.getElementById("plot").textContent = data.Plot;
};

getNewMovie();
