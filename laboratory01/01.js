const findFirstUnique = (str) => {
    let charMap = {};

    [...str].forEach((char) => {
        charMap[char] = charMap[char] + 1 || 1;
    });
    return Object.keys(charMap).find((key) => charMap[key] === 1);
};

console.log(
    findFirstUnique("abacddbec") // e
);
