// criando uma função que captura todos os vetores (setinhas) e todos os botões;
const setupScrooling= () =>{

  // capturando os vetores;
  const container = [...document.querySelectorAll(".movie-container")]

  // capturando os botões;
  const nextBtn = [...document.querySelectorAll(".next-btn")]
  const prevBtn = [...document.querySelectorAll(".pre-btn")]

  // para cada um dos containers, pega o tamanho do contâiner 
  container.forEach((item, i)=>{
    let containerDimensions = item.getBoundingClientRect()
    let containerWidth = containerDimensions.width

    // adicona um evento de clique para os botões funcionarem;
    nextBtn[i].addEventListener('click', ()=>{
      item.scrollLeft += containerWidth
    })

    prevBtn[i].addEventListener('click', ()=>{
      item.scrollLeft -= containerWidth
    })
  })
}