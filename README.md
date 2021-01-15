# Gerador de imagens placeholder

Um gerador de imagens placeholder construído com Javascript, CSS e HTML.
Com o input do usuário, é possível selecionar as dimensões de uma imagem (width e height) e, com isso, gerar uma URL no canva para poder utilizar como _src_ nas tags <img> em sites que construímos.

### Preview:

<div style="text-align:center"><a href="https://dev-pratico.github.io/projeto-gerador_de_imgs_placeholder/" target="_blank"><img height="400" src="assets/imgs_placeholder.GIF" title="Placeholder images" alt="Project Placeholder Images" /></a></div>

### Tecnologias utilizadas:

<div>
  <code><img height="20" alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/></code>
  <code><img height="20" alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/></code>
  <code><img height="20" alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/></code>
</div>

---

## Passo-a-passo

### Criar HTML inicial

Utilizando o atalho da extensão para VSCode, criar o HTML inicial.
Em seguida, trocar o título do site (**<img> Generator**) e acrescentar tags para o arquivo CSS (**style.css**) e o JS(**script.js**):

```HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> <img> Generator</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <script src="script.js"></script>
    </body>
    </html>
```

### Criação de funções no script.js

A principal funcionalidade da aplicação é criar uma função que recebe dois parâmetros em formato de número, width e height (largura e altura) e retorna uma HTML Element Canvas, o qual terá uma URL reutilizável e poderá ser mostrado na tela.
Vamos começar por essa função, chamada **createPlaceholderCanvas**, a qual deve seguir os passos:

1. Criar elemento <canvas>
2. Estabelecer contexto com "2d"
3. Atribuir as dimensões (_width_ e _height_) ao elemento
4. Preencher o elemento com uma cor pré-determinada, utilizando `fillStyle`
5. Estabelecer onde o retângulo será desenhado utilizando `fillRect`
6. Retornar o elemento

O código final deve ficar assim:

```javascript
function createPlaceholderCanvas(width, height) {
  const element = document.createElement('canvas');
  const context = element.getContext('2d');

  element.width = width;
  element.height = height;

  // Background
  context.fillStyle = '#aaaaaa';
  context.fillRect(0, 0, element.width, element.height);

  return element;
}

document.body.appendChild(createPlaceholderCanvas(300, 200));
```

Com esse código, já deve ser possível visualizar o retângulo numa coloração cinza na tela.
Em seguida, vamos desenhar o texto dentro do retângulo. Os seguintes passos serão seguidos:

1. Determinar o tamanho da fonte de acordo com o tamanho da imagem. Para isso, vamos buscar o menor parâmetro entre os dois da função (width e height) e inserir uma fonte proporcional
2. Determinar a fonte utilizando `context.font`
3. Determinar preenchimento do texto com `fillStyle`
4. Alinhar texto com `textAlign`
5. Determinar o alinhamento da base do texto com `textBaseline`
6. Realizar o preenchimento do texto de acordo com os parâmetros das dimensões, utilizando `fillText`

O código final da função deve ficar assim:

```javascript
function createPlaceholderCanvas(width, height) {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");

  element.width = width;
  element.height = height;

  // Fill in the background
  context.fillStyle = "#aaaaaa";
  context.fillRect(0, 0, element.width, element.height);

  // Place the text
  const lowestDimension = Math.min(Number(inputWidth.value), Number(inputHeight.value))
  const fontSize = Math.trunc(lowestDimension/4.5)

  context.font = `bold ${fontSize}px sans-serif`;
  context.fillStyle = "#333333";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(`${width}x${height}`, element.width / 2, element.height / 2);

  return element;
```

### Criação dos elementos HTML

Com a funcionalidade principal criada, vamos seguir com a criação do layout.
Para isso, vamos seguir os passos:

1. Criar título
2. Criar inputs para as dimensões, além de um botão para gerar a imagem
3. Criar input que vai nos trazer a URL do Canvas e um botão para copiar para a área de transferência
4. Mostrar preview da imagem, inicialmente com "display: none"

O código final deve ficar próximo do abaixo:

```HTML
<body>
    <h1>Gerador de imagens placeholder</h1>
    <h3>Dimensões</h3>
    <div class="dimensions">
        <input type="number" class="input" id="inputWidth" value="500">
        x
        <input type="number" class="input" id="inputHeight" value="400">
        <button id="buttonGenerate" type="button" title="Gerar imagem placeholder com dimensões personalizadas.">Gerar</button>
    </div>
    <h3>Data URL</h3>
    <div class="data-url">
        <input type="text" class="input" id="inputDataUrl" placeholder="Gere uma imagem acima para criar uma url!" readonly>
        <img id="buttonCopy" width="20" height="20" src="assets/copy-link.svg" alt="Copy to clipboard" title="Copiar para Área de Transferência">
    </div>

    <h3 style="display: none" id="titlePreview">Preview</h3>
    <img alt="Preview Image" id="imagePreview" style="display: none">
    <script src="script.js"></script>
</body>
```

### Estilização dos elementos usando CSS

A estilização pode ser dividida em 4 partes:

- **Geral**: onde centralizamos os elementos, escolhemos as fontes, entre outros
- **Input**: estilização das caixas de texto e botão, com efeito hover
- **Input**: data URL e posicionamento do ícone para copiar para a área de transferência
- **Preview da imagem**: que vai ter um inline style de "display:none" e será removido com uma função CSS. Além disso, o tamanho da imagem Canvas não pode ser limitado pelo CSS, por isso, "position: absolute".

Os estilos devem ficar próximos disso:

```CSS
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: auto;
  width: 50%;
}

.input {
  height: 30px;
  box-sizing: border-box;
}

#inputWidth,
#inputHeight {
  width: 80px;
}

#buttonGenerate {
  height: 28px;
  border-radius: 10%;
  transition: all 0.2s;
}
#buttonGenerate:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.data-url {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.data-url img {
  margin-left: 5px;
  align-self: center;
}
.data-url img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.data-url img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.data-url img:focus {
  transform: scale(1.2);
}

#inputDataUrl {
  width: 100%;
  max-width: 600px;
}

#imagePreview {
  width: 100%;
  position: absolute;
}
```

### Adicionando funcionalidade à interface

De volta ao arquivo **script.js**, vamos criar mais duas funcionalidades: gerar o canvas e copiar código final para clipboard.
O primeiro passo será identificar quais são os elementos sendo utilizados pela página.
No topo do arquivo, algo assim:

```javascript
const inputWidth = document.getElementById('inputWidth');
const inputHeight = document.getElementById('inputHeight');
const inputDataUrl = document.getElementById('inputDataUrl');
const imagePreview = document.getElementById('imagePreview');
const titlePreview = document.getElementById('titlePreview');
```

Para criar a funcionalidade de gerar o elemento canvas, devemos seguir os seguintes passos:

1. Identificar o botão e acrescentar um eventListener com `addEventListener` do tipo `click`
2. Criar validações: se o input não for número ou for abaixo de 200px, a função deve mostrar um alerta
3. Utilizar os valores do input na função **createPlaceholderCanvas**
4. Buscar DataURL no canvas element
5. Atualizar a _src_ na imagem de preview
6. Remover o estilo "display:none" no preview

O código final deve ficar assim:

```javascript
document.getElementById('buttonGenerate').addEventListener('click', () => {
  const MIN_SIDE_LENGTH = 200;

  // Validation
  if (
    isNaN(inputWidth.value) ||
    isNaN(inputHeight.value) ||
    inputWidth.value < MIN_SIDE_LENGTH ||
    inputHeight.value < MIN_SIDE_LENGTH
  ) {
    alert(
      `Ops. Tamanho de imagem inválido. O tamanho mínimo é de ${MIN_SIDE_LENGTH}px`
    );
    return;
  }

  const canvasElement = createPlaceholderCanvas(
    inputWidth.value,
    inputHeight.value
  );
  const dataUrl = canvasElement.toDataURL();

  inputDataUrl.value = dataUrl;
  imagePreview.src = dataUrl;
  imagePreview.style.display = 'block';
  titlePreview.style.display = 'block';
  imagePreview.style.maxWidth = `${inputWidth.value}px`;
});
```

A seguir, vamos criar a função para colar o código na área de transferência do usuário.
Para isso, vamos seguir os seguintes passos:

1. Verificar se a imagem já foi gerada
2. Identificar e selecionar o elemento na página, utilizando `select` e `setSelectionRange` (para mobile)
3. Executar o comando de copiar com `execCommand('copy')`

O código final deve ficar assim:

```javascript
document.getElementById('buttonCopy').addEventListener('click', () => {
  if (inputDataUrl.value) {
    inputDataUrl.select();
    inputDataUrl.setSelectionRange(0, 99999);

    document.execCommand('copy');

    alert(
      `Copiado para a área de transferência!\n\nURL:\n${inputDataUrl.value}`
    );
  } else {
    alert('Gere a imagem para poder copiar para a área de transferência.');
  }
});
```

## Deployment

A aplicação foi subida na internet usando o gh-pages.
Para fazê-lo, basta estar com os arquivos _index.html_, _style.css_ e _script.js_ dentro de um repositório aberto no Github e, em **Configurações**, buscar a opção **Github Pages**.
Nesta seção, basta escolher a branch a ser utilizada e salvar.
Em alguns minutos a aplicação deve estar disponível numa url como a abaixo:

> https://dev-pratico.github.io/projeto-gerador_de_imgs_placeholder/

## Construído com

- [Visual Studio Code](https://code.visualstudio.com/) - The editor
- HTML5 Canvas

## Autores

- **Sthefano Carvalho** - [SthefanoC](https://github.com/sthefanoc)
