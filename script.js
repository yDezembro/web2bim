function setFooter() {
    const footer = document.querySelector('#access');
    footer.textContent = `Esta página foi visitada ${localStorage.getItem('count')} vezes. A última visita foi: ${localStorage.getItem('last-access')}`
  }
  
  function countVisits() {
    const now = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    if (localStorage.getItem('count') !== 0) {
      let counter = localStorage.getItem('count');
      localStorage.setItem('count', ++counter)
    } else {
      localStorage.setItem('count', 0);
    }
    localStorage.setItem('last-access', now);
    setFooter();
  }
  
  function set_page(evolucao, evolucaoObject, target) {
    const index = localStorage.getItem('image-index')
    evolucao = evolucao.charAt(0).toUpperCase() + evolucao.slice(1)
    target.innerHTML = `
    <h1>Detalhes sobre o ${evolucao} </h1>
    
    <img id="evolucao-image" src="${evolucaoObject[index]}" alt=${evolucao}>
    `
  }
  
  function changeImage(evolucaoObject) {
    const index = localStorage.getItem('image-index')
    const img = document.querySelector('#evolucao-image');
    img.setAttribute('src', evolucaoObject[index])
  }
  
  async function getImagesObject(evolucao) {
    const evolucao_url = (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao}`)).url;
    const pokemon_detail_object = await (await fetch(evolucao_url)).json();
    const image_path = pokemon_detail_object.sprites.front_default
    const spriteObject = {};
    let index = 0;
  
    const allSpritesObject = pokemon_detail_object.sprites;
    const allSpritesListObject = Object.values(allSpritesObject);
  
    allSpritesListObject.forEach(element => {
      if (typeof element === 'string') {
        spriteObject[index] = element;
        index++;
      }
    })
  
    localStorage.setItem('image-index', 0)
  
    return spriteObject;
  }
  
  async function main() {
    countVisits()
    const titulo = document.getElementById('header')
    const img = document.getElementById('evolucao')
    const queryString = window.location.search
    const evolucao = new URLSearchParams(queryString).get('evolucao').toLowerCase(); 
    
    titulo.innerHTML = `<h1>Pagina do ${evolucao}</h1>`
  
    const evolucaoObject = await getImagesObject(evolucao, img);
    set_page(evolucao, evolucaoObject, img)
  
    img.addEventListener('click', () => {
      let image_index = localStorage.getItem('image-index');
      if (image_index > (Object.values(evolucaoObject).length) -2) {
        image_index = 0;
      }
      localStorage.setItem('image-index', ++image_index);
      changeImage(evolucaoObject)
    });
  }