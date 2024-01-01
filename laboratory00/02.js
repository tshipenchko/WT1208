const combinations = (str) => {
    let combinations = [];
    for (let i = 0; i < str.length; i++) {
        let temp = "";
        for (let j = i; j < str.length; j++) {
            temp += str[j];
            combinations.push(temp);
        }
    }

    return combinations.join(", ");
};

console.log(
    combinations("dog") // d, do, dog, o, og, g
);
