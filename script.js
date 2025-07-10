const textInput = document.getElementById('text-input');
const fontSelect = document.getElementById('font-select');
const generateBtn = document.getElementById('generate-btn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const fonts = ['standard', 'slant', 'banner', 'script', 'digital', 'ghost', 'ogre'];
fonts.forEach(font => {
  const option = document.createElement('option');
  option.value = font;
  option.textContent = capitalizeFirstLetter(font);
  fontSelect.appendChild(option);
});
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function generateASCII() {
  const userText = textInput.value.trim();
  const font = fontSelect.value;
  if (!userText) {
    output.textContent = "Введите текст для генерации.";
    return;
  }
  fetch(`fonts/${font}.flf`)
    .then(response => {
      if (!response.ok) throw new Error("Шрифт не найден");
      return response.text();
    })
    .then(fontData => {
      figlet.parseFont(font, fontData);
      const asciiArt = figlet.textSync(userText, { font: font });
      output.textContent = asciiArt;
    })
    .catch(err => {
      output.textContent = "Ошибка загрузки шрифта.";
      console.error(err);
    });
}
generateBtn.addEventListener('click', generateASCII);
copyBtn.addEventListener('click', () => {
  const textToCopy = output.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("Результат скопирован в буфер обмена!");
  }).catch(err => {
    alert("Не удалось скопировать.");
    console.error(err);
  });
});