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
            String.fromCharCode(c.charCodeAt(0) + (i % 5))
        ).join(''));
    }

    function complexDecode(input) {
        return atob(input).split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) - (i % 5))
        ).join('');
    }

    function mutateKey(seed) {
        let transformed = '';
        for (let i = 0; i < seed.length; i++) {
            transformed += String.fromCharCode((seed.charCodeAt(i) * 17 + 13) % 256);
        }
        return transformed;
    }

    const key1_base = [99, 111, 109, 112, 108, 101, 120]; 
    const key2_base = [115, 101, 99, 117, 114, 105, 116, 121]; 

    const key1 = mutateKey(String.fromCharCode(...key1_base));
    const key2 = mutateKey(String.fromCharCode(...key2_base));

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

    window.encryptText = encryptText;
    window.decryptText = decryptText;
})();
