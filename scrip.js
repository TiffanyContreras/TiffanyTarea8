const API_KEY = 'api_key=334de744f6e8fa979ca36deefec77824';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  const main = document.getElementById('main');
  const form =  document.getElementById('form');
  const search = document.getElementById('search');
  const tagsEl = document.getElementById('tags');
  
  const prev = document.getElementById('prev')
  const next = document.getElementById('next')
  const current = document.getElementById('current')
  
  var currentPage = 1;
  var nextPage = 2;
  var prevPage = 3;
  var lastUrl = '';
  var totalPages = 100;

opciones();
function opciones(){
      select = document.getElementById("año");
      genres.forEach((genre ) => {
         
          option = document.createElement("option");
          option.value = genre.id;
          option.text = genre.name;;
          select.appendChild(option);
 
      })
}

function cambia(){
  var cosa;
  //Se toma el vamor de la "cosa seleccionada"
  cosa = document.form.año[document.form.año.selectedIndex].value;
  var selected = document.form.año[document.form.año.selectedIndex].text;
  if(cosa!=0){
    busqueda(selected)
  }

}


getMovies(API_URL);

function getMovies(url){

  fetch(url).then(res => res.json()).then(data => {
    showMovies(data.results);
  })
}


function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
      const {title, poster_path, vote_average, overview, id} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
           <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              ${overview}
              <br/> 
              <button class="know-more" id="${id}">Know More</button
          </div>
      
      `

      main.appendChild(movieEl);
})
}
function getColor(vote) {
if(vote>= 8){
    return 'green'
}else if(vote >= 5){
    return "orange"
}else{
    return 'red'
}
}



function busqueda(datobusqueda){
const searchTerm = datobusqueda;
//selectedGenre=[];
// setGenre();
if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
}else{
    getMovies(API_URL);
}
}