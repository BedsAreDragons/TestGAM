(function () {
    function getTimeKey() {
        const now = new Date();
        return [
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
        ].join('-'); 
    }

    function obfuscateKey(arr) {
        return arr.map(n => String.fromCharCode(n ^ 42)).join('');
    }

    const staticKey = obfuscateKey([99, 111, 109, 112, 108, 101, 120]); 
    const securityKey = obfuscateKey([115, 101, 99, 117, 114, 105, 116, 121]); 

    function xorEncrypt(input, key) {
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

    function encryptText(text) {
        const timeKey = getTimeKey();
        let encrypted = xorEncrypt(text, staticKey);
        encrypted = xorEncrypt(encrypted, timeKey);
        encrypted = xorEncrypt(encrypted, securityKey);
        return complexEncode(encrypted);
    }

    window.encryptText = encryptText;
})();
