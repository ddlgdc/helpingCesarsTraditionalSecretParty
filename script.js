// varaibles for both lower and upper case alphabets
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Function to get a random letter from the alphabet
function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

// function to encrypt message with random letters
function encrypt(message, shiftValue) {
    // empty string for message
    let encryptedMessage = '';
    // counter to trach number of letters processed
    let letterCount = 0;

    // loop through each char in message
    for (let i = 0; i < message.length; i++) {
        // obtains curr char
        let char = message[i];
        // finds indedx of char in alphabet
        let index = alphabet.indexOf(char);

        // if char is not in alphabet, add it directly to encrypt message
        if (index === -1) {
            encryptedMessage += char;
        } else {
            // calculates new index w wrap around using shiftValue
            let newIndex = (index + shiftValue) % 26;
            // handles negative indices 
            if (newIndex < 0) newIndex += 26;

            // gets new char from alphabet
            let newChar = alphabet[newIndex];
            // appends encrypted char to message
            encryptedMessage += newChar;
            // increments letter count
            letterCount++;

            // after every two letters, add random letter
            if (letterCount % 2 === 0) {
                encryptedMessage += getRandomLetter();
            }
        }
    }

    return encryptedMessage;
}

// function to decrypt message 
function decrypt(encryptedMessage, shiftValue) {
    // empty string for clean message
    let cleanMessage = '';

    // loosp through encrypted message to remove random letters
    for (let i = 0; i < encryptedMessage.length; i++) {
        if ((i + 1) % 3 !== 0) {
            cleanMessage += encryptedMessage[i];
        }
    }

    // empty string for decrypted message
    let decryptedMessage = '';
    // makes shiftValue within range of alphabet length
    shiftValue = shiftValue % 26;

    // loop through each char in clean message 
    for (let i = 0; i < cleanMessage.length; i++) {
        // gets curr char
        let char = cleanMessage[i];
        // flag to indicate if char is upper 
        let isUpperCase = false;
        // var to store index of char in alphabet 
        let index;

        // checks if char is lowercase
        if (alphabet.indexOf(char) !== -1) {
            // finds index in lowercase alphabet
            index = alphabet.indexOf(char);
        } else if (ALPHABET.indexOf(char) !== -1) {
            // finds index in uppercase alphabet
            index = ALPHABET.indexOf(char);
            // set flag for uppercase char
            isUpperCase = true;
        } else {
            // add non alphabet char directly to message
            decryptedMessage += char;
            // continue moves to the next char 
            continue;
        }

        // calculates new index for decryption with wrap around using shiftvalue
        let newIndex = (index - shiftValue) % 26;
        // handles newgative indices
        if (newIndex < 0) newIndex += 26;

        // gets new char based on whether is originally upper or lower case
        let newChar = isUpperCase ? ALPHABET[newIndex] : alphabet[newIndex];
        // appends decrypted char to message
        decryptedMessage += newChar;
    }

    return decryptedMessage;
}

const secretMessage = "Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.";
const shiftValue = 42;
const decryptedMessage = decrypt(secretMessage, shiftValue);
console.log(decryptedMessage);