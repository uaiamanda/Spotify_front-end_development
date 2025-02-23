// Obtém os elementos do DOM pelos seus IDs
const searchInput = document.getElementById('search-input'); // Campo de pesquisa
const resultArtist = document.getElementById("result-artist"); // Div onde os resultados dos artistas serão exibidos
const resultPlaylist = document.getElementById('result-playlists'); // Div que contém as playlists

// Função que faz a requisição à API para buscar artistas com base no termo pesquisado
function requestApi(searchTerm) {
    const url = `http://localhost:4000/artists?name_like=${searchTerm}`; // URL da API com filtro pelo nome do artista

    fetch(url) // Faz a requisição HTTP
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((result) => displayResults(result, searchTerm)) // Chama a função displayResults para exibir os resultados
}

// Função que exibe os resultados retornados pela API
function displayResults(result, searchTerm) {

    resultPlaylist.classList.add("hidden") // Esconde a seção de playlists

    // Obtém os elementos onde os detalhes do artista serão exibidos
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    const filteredData = result.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Percorre o array de resultados e exibe os dados do primeiro artista encontrado
    filteredData.forEach(element => {
        artistName.innerText = element.name; // Define o nome do artista
        artistImage.src = element.urlImg; // Define a imagem do artista
    });

    resultArtist.classList.remove('hidden'); // Exibe a seção de artistas
}

// Evento que escuta mudanças no caampo de pesquisa
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase(); // Obtém o valor digitado e converte para minúsculas

    // Se o campo estiver vazio, esconde os resultados de playlists e exibe a seção de artistas
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return; // Encerra a função
    }

    // Chama a API para buscar artistas com base no termo pesquisado
    requestApi(searchTerm);
});
