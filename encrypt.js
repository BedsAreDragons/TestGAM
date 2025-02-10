(function() {
    function xorEncryptDecrypt(input, key) {
        let output = '';
        for (let i = 0; i < input.length; i++) {
            output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return output;
    }

    function customEncode(input) {
        return input.split('').map(c => {
            let code = c.charCodeAt(0);
            return String.fromCharCode((code * 3) % 256);
        }).join('');
    }

    function obfuscateKey(arr) {
        return arr.map(n => String.fromCharCode(n)).join('');
    }

    function encryptText(text) {
        const key1 = obfuscateKey([86, 109, 48, 120, 77, 70, 89, 120, 86, 88, 104, 97, 82, 109, 82, 86, 89, 84, 70, 119, 85, 49, 82, 87, 86, 110, 100, 83, 77, 86, 112, 121, 86, 109, 115, 53, 86, 108, 74, 114, 99, 69, 100, 87, 98, 71, 104, 110, 85, 70, 69, 57, 80, 81, 61, 61]);
        const key2 = obfuscateKey([86, 109, 112, 67, 86, 49, 82, 87, 85, 107, 90, 86, 98, 69, 74, 86, 89, 49, 65, 122, 83, 70, 90, 69, 82, 75, 116, 85, 98, 69, 53, 87, 86, 70, 81, 119, 80, 81, 61, 61]);
        let encrypted = xorEncryptDecrypt(text, key1);
        encrypted = xorEncryptDecrypt(encrypted, key2);
        return customEncode(encrypted);
    }

    // Export function for external use
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = encryptText;
    } else {
        window.encryptText = encryptText;
    }
})();
