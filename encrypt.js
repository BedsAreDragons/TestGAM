require('dotenv').config();

(function () {
    function xorEncryptDecrypt(input, key) {
        let output = '';
        for (let i = 0; i < input.length; i++) {
            output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return output;
    }

    function complexEncode(input) {
        return btoa(input.split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) + (i % 7))
        ).join(''));
    }

    function complexDecode(input) {
        return atob(input).split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) - (i % 7))
        ).join('');
    }

    function obfuscateKey(envKey) {
        return envKey.split(',').map(n => String.fromCharCode(parseInt(n) ^ 42)).join('');
    }

    const key1 = obfuscateKey(process.env.KEY1);
    const key2 = obfuscateKey(process.env.KEY2);

    function encryptText(text) {
        let encrypted = xorEncryptDecrypt(text, key1);
        encrypted = xorEncryptDecrypt(encrypted, key2);
        return complexEncode(encrypted);
    }

    function decryptText(encryptedText) {
        let decrypted = complexDecode(encryptedText);
        decrypted = xorEncryptDecrypt(decrypted, key2);
        decrypted = xorEncryptDecrypt(decrypted, key1);
        return decrypted;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { encryptText, decryptText };
    } else {
        window.encryptText = encryptText;
        window.decryptText = decryptText;
    }
})();
