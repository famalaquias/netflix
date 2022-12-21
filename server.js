// Criando um servidor estático local:

// importando o express;
const express = require("express") 

// importando a biblioteca que lida com caminhos de arquivos;
const path = require("path") 

const PORT = 3333

// declarando um caminho inicial: pega o diretório atual (dirname) e concatena com a pasta public;
let initialPath = path.join(__dirname, "public")

// declarando uma estância de aplicação do servidor: cria uma aplicação express estático que vai servir o que está na pasta public;
let app = express()
app.use(express.static(initialPath))

// dizendo para a aplicação qual é a porta de entrada;
app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"))
})

// iniciando/startando o servidor;
app.listen(PORT, () => {
  console.log(`Server start up on port ${PORT}!`);
})
