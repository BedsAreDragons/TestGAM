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

    function obfuscateKey(arr) {
        return arr.map(n => String.fromCharCode(n ^ 42)).join('');
    }

    function encryptText(text) {
        const key1 = obfuscateKey([99, 111, 109, 112, 108, 101, 120]);
        const key2 = obfuscateKey([115, 101, 99, 117, 114, 105, 116, 121]);
        let encrypted = xorEncryptDecrypt(text, key1);
        encrypted = xorEncryptDecrypt(encrypted, key2);
        return complexEncode(encrypted);
    }

    function decryptText(encryptedText) {
        const key1 = obfuscateKey([99, 111, 109, 112, 108, 101, 120]);
        const key2 = obfuscateKey([115, 101, 99, 117, 114, 105, 116, 121]);
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
