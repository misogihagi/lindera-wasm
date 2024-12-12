import { tokenize } from '../../pkg/lindera_wasm.js';

document.getElementById('runButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const tokens = tokenize(inputText);

    const resultList = document.getElementById('resultList');
    resultList.innerHTML = ''; // Clear previous results

    tokens.forEach(token => {
        const li = document.createElement('li');
        li.textContent = token.get('text'); // トークンのテキストを表示
        resultList.appendChild(li);
    });
});
