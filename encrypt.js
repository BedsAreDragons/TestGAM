(function() {
    function scrambleKey(base) {
        return base.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 3)).reverse().join('');
    }

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

    function encryptText(text) {
        const key1 = scrambleKey("secureKey123");
        const key2 = scrambleKey("anotherSecret");
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
