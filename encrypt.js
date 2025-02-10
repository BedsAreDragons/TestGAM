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

    function decodeObfuscatedKey(arr) {
        return arr.map(n => String.fromCharCode(n)).join('');
    }

    function encryptText(text) {
        const key1 = decodeObfuscatedKey([69, 162, 69, 219, 5, 234, 249, 17, 198, 96, 240, 195, 12, 21, 54, 11, 20, 41, 65, 104]);
        const key2 = decodeObfuscatedKey([2, 255, 14, 14, 252, 147, 2, 252, 246, 255, 2, 255, 249, 207, 68, 252, 5, 255, 171, 2, 240, 147, 2, 204, 243, 144, 2, 252, 255, 144, 14, 2, 252, 207, 104, 14, 246, 207, 2, 204, 243, 144, 246, 210, 246, 207, 68, 255]);
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
