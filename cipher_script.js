const button_encode = document.getElementById("encode")
const button_decode = document.getElementById("decode")
const message_area = document.getElementById("txt_to_code")

button_encode.addEventListener("click", encodeClicked)
button_decode.addEventListener("click", decodeClicked)


function removeWhitespaces(message) {
    message = message.replace(/\s+/g, ' ');
    if (message.slice(-1).match(/\s/)) {
        message = message.slice(0, -1);
    }
    return message;
}


function divideIntoBlocks(message, size) {
    let block_arr = [];
    let block = '';
    for (let letter of message) {
        block += letter;
        if (block.length % size === 0) {
            block_arr.push(block);
            block = '';
        }
    }
    if (block.length !== 0) {
        block_arr.push(block);
    }
    return block_arr;
}

function prepareMessage(message) {
    message = removeWhitespaces(message);
    let block_size = message.match(/ /g).length;
    return divideIntoBlocks(message, block_size);
}


function encode(message) {
    let block_list = prepareMessage(message);
    let result = '';
    for (let word of block_list) {
        for (let j = 0; j < (Math.floor(word.length / 2)); j++) {
            result += word[word.length - 1 - j];
            result += word[j];
        }
        if (word.length % 2 !== 0) {
            result += word[Math.floor(word.length / 2)];
        }
    }
    return result;
}

function decode(message){
    let block_list = prepareMessage(message);
    let result = '';
    for (let word of block_list){
            for (let i = 1; i < word.length; i += 2){
                result += word[i];
            }
            for (let j = word.length % 2 === 0 ? word.length - 2 : word.length -1; j >= 0; j -= 2) {
                result += word[j];
            }
    }
    return result;
}


function encodeClicked() {
    let message = message_area.value;
    let encoded = encode(message);
    console.log(encoded);
    message_area.value = encoded;
}

function decodeClicked() {
    let message = message_area.value;
    let decoded = decode(message);
    console.log(decoded);
    message_area.value = decoded;
}
