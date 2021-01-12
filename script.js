const inputWidth = document.getElementById("inputWidth");
const inputHeight = document.getElementById("inputHeight");
const inputDataUrl = document.getElementById("inputDataUrl");
const imagePreview = document.getElementById("imagePreview");
const titlePreview = document.getElementById("titlePreview");

document.getElementById("buttonGenerate").addEventListener("click", () => {
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
  imagePreview.style.display = "block";
  titlePreview.style.display = "block";
  imagePreview.style.maxWidth = `${inputWidth.value}px`;
});

document.getElementById("buttonCopy").addEventListener("click", () => {
    
    if (inputDataUrl.value){
        inputDataUrl.select();
    inputDataUrl.setSelectionRange(0,99999);
    
    document.execCommand('copy')

    alert(`Copiado para a área de transferência!\n\nURL:\n${inputDataUrl.value}`)
    } else {
        alert('Gere a imagem para poder copiar para a área de transferência.')
    }
});


/**
 * Creates a HTML canvas element of the given size.
 *
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
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
}
