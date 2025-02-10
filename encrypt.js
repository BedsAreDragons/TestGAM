(function () {
    function xorEncryptDecrypt(input, key) {
        let output = '';
        for (let i = 0; i < input.length; i++) {
            output += String.fromCharCode(
                (input.charCodeAt(i) ^ key.charCodeAt(i % key.length)) + ((i * 3) % 7)
            );
        }
        return output;
    }

    function complexEncode(input) {
        return input.split('').map((c, i) => {
            let code = c.charCodeAt(0);
            return String.fromCharCode(((code * 7 + i * 2) % 256) ^ (173 + (i % 5)));
        }).reverse().join('');
    }

    function obfuscateKey(arr) {
        return arr.map(n => String.fromCharCode((n ^ 42) + 5)).reverse().join('');
    }

    function dynamicKey(seed) {
        let key = '';
        for (let i = 0; i < seed.length; i++) {
            key += String.fromCharCode(((seed.charCodeAt(i) * 13) % 256) ^ 91);
        }
        return key;
    }

    function shuffleString(str) {
        let arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            let j = (Math.floor(Math.random() * (i + 1)) + i) % arr.length;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    function encryptText(text) {
        const seedKey = dynamicKey(text);
        const key1 = obfuscateKey([120, 97, 110, 115, 111, 109, 101, 116, 104, 105, 110, 103]);
        const key2 = obfuscateKey([115, 101, 99, 117, 114, 105, 116, 121, 107, 101, 121]);
        let encrypted = xorEncryptDecrypt(text, key1);
        encrypted = xorEncryptDecrypt(encrypted, key2);
        encrypted = xorEncryptDecrypt(encrypted, seedKey);
        encrypted = complexEncode(encrypted);
        return shuffleString(encrypted);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = encryptText;
    } else {
        window.encryptText = encryptText;
    }
})();
