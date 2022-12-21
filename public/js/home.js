const main = document.querySelector(".main")

// chamando a api genres_list_http e juntando ela com uns parâmetros de busca usando o método URLSearch;
// vai passar como parâmetros a api_key - chave de comunicação com a API;
// chama o response - res e o transforma em um json;
// após chame o data para visualizar o conteúdo;
// declara uma função dentro do data que pegará todos os filmes daquele gênero que será passado;
fetch(genres_list_http + new URLSearchParams({
  api_key: api_key
}))
.then(res => res.json())
.then(data => {
  data.genres.forEach(item => {
    fetchMoviesListByGenres(item.id, item.name)
  });
})

// implementando a função fetchMoviesListByGenres que receberá a chamada da api movie_genres_http;
// vai passar como parâmetros a api_key, o with_generes - id que está recebendo e a page - páginas aleatórias;
// declara uma função dentro do data que pegará todos os gêneros dos filmes e os resultados;
const fetchMoviesListByGenres = (id, genres) => {
  fetch(movie_genres_http + new URLSearchParams({
    api_key: api_key,
    with_genres: id,
    page: Math.floor(Math.random()*3) + 1
  }))
  .then(res => res.json())
  .then(data => {
    makeCategoryElement(`${genres}_movies`, data.results)
  })
  .catch(err => console.log(err))
}

// implementando a função makeCategoryElement que receberá a categoria e o conteúdo (data);
const makeCategoryElement = (category, data) => {
  main.innerHTML += `
  <div class="movie-list">

    <button class="pre-btn">
      <img src="img/prev.png" alt="previous button">
    </button>

    <h1 class="movie-category">${category.replace("_", " ")}</h1>
    
    <div class="movie-container" id="${category}"></div>

    <button class="next-btn">
      <img src="img/next.png" alt="next button">
    </button>

  </div>
  `
  // parte que vai trazer os cards - categorias e o conteúdo; 
  makeCards(category, data)
}

// implementando a função que receberá o makeCards, recebendo como parâmetros o id e o conteúdo;
const makeCards = (id, data) => {
  const movieContainer = document.getElementById(id)

  // pega o resultado do json, que é os filmes e faz um forEach;
  // o forEach pega cada item e verifica se tem a propriedade backdrop_path - que são as imagens;
  data.forEach((item, i)=>{
    if(item.backdrop_path == null){
      item.backdrop_path = item.poster_path;

      if(item.backdrop_path == null){
        return
      }
    }

    // trabalha a caixinha do container, que traz a imagem, título e dados do filme;
    movieContainer.innerHTML += `
    <div class="movie">
      <img src="${img_url}${item.backdrop_path}" alt="poster">
      <p class="movie-title">${item.title}</p>
    </div>
    `
    // quando for a última posição espera um tempo para renderizar e chamar a função setupScrooling;
    if(i == data.length -1){
      setTimeout(()=>{
        setupScrooling()
      }, 100)
    }
  })  
}