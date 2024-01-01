const vowelCount = (str) => {
    // hell yeah, I love Functional Programming
    const vowels = "aeiou";

    return [...str].reduce((acc, char) => {
        if (vowels.includes(char)) acc++;
        return acc;
    }, 0);
};

console.log(
    vowelCount("The quick brown fox") // 5
);
