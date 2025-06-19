const primeLetterMap = {
    2: 'A', 3: 'B', 5: 'C', 7: 'D', 11: 'E', 13: 'F', 17: 'G', 19: 'H',
    23: 'I', 29: 'J', 31: 'K', 37: 'L', 41: 'M', 43: 'N', 47: 'O',
    53: 'P', 59: 'Q', 61: 'R', 67: 'S', 71: 'T', 73: 'U', 79: 'V',
    83: 'W', 89: 'X', 97: 'Y', 101: 'Z', 103: 'Ç'
};
const letterPrimeMap = Object.fromEntries(Object.entries(primeLetterMap).map(([k, v]) => [v, Number(k)]));

function encodeWord() {
    const input = document.getElementById("wordInput").value.toUpperCase().trim();
    const outputDiv = document.getElementById("encodedOutput");
    outputDiv.style.display = "none";

    if (!input) return;
    if (!/^[A-ZÇ]+$/.test(input)) {
        outputDiv.innerHTML = '<p class="error">Digite apenas letras.</p>';
        outputDiv.style.display = "block";
        return;
    }
    let product = 1n;
    let mapping = "";
    for (let char of input) {
        if (letterPrimeMap[char]) {
            const primeValue = BigInt(letterPrimeMap[char]);
            mapping += `<br>${char} = ${primeValue}`;
            product *= primeValue;
        }
    }
    outputDiv.innerHTML =
    `<p>Números primos correspondentes:<br>${mapping}
    <br>Palavra codificada: ${product.toString()}</p>`;
    outputDiv.style.display = "block";
}

function decodeNumber() {
    const numInput = document.getElementById("numInput");
    let num;
    try {
        num = BigInt(numInput.value);
    } catch {
        return;
    }
    const outputDiv = document.getElementById("decodedOutput");
    outputDiv.style.display = "none";

    if (!numInput.value || num < 2n) return;

    let output = "";
    let mapping = "";
    for (let prime = 2n; prime <= num; prime++) {
        while (num % prime === 0n) {
            let letter = primeLetterMap[prime] || "?";
            output += letter;
            mapping += `<br>${prime} = ${letter}`;
            num /= prime;
        }
    }
    outputDiv.innerHTML =
    `<p>Números primos correspondentes:<br>${mapping}
    <br>Decodificação: ${output}<br>As letras estão em ordem alfabética.</p>`;
    outputDiv.style.display = "block";
}

function generateAnagrams(str) {
    const results = new Set();
    function permute(letters, prefix = "") {
        if (letters.length === 0) {
            results.add(prefix);
        } else {
            for (let i = 0; i < letters.length; i++) {
                const before = letters.slice(0, i);
                const after = letters.slice(i + 1);
                permute(before.concat(after), prefix + letters[i]);
            }
        }
    }
    permute(str.split(""));
    return Array.from(results);
}

function showAnagrams() {
    const input = document.getElementById("anagramInput").value.toUpperCase().trim();
    const outputDiv = document.getElementById("anagramOutput");
    outputDiv.style.display = "none";

    if (!input) return;

    if (!/^[A-ZÇ]+$/.test(input)) {
        outputDiv.innerHTML = '<p class="error">Digite apenas letras.</p>';
        outputDiv.style.display = "block";
        return;
    }

    const anagrams = generateAnagrams(input);
    const count = anagrams.length;
    const message = count === 1
        ? 'Foi encontrado 1 anagrama:'
        : `Foram encontrados ${count} anagramas:`;

    outputDiv.innerHTML = `<p>${message}</p><p>${anagrams.join(" <br>")}</p>`;
    outputDiv.style.display = "block";
}
