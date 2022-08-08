let stringSimilarity = require("string-similarity");

array1 = ['pavel', 'kuba', 'vasek'];
array2 = ['kuba', 'vasek', 'pavel'];

function getBestSimilarity() {
    let similarityMap = new Map();
    array1.forEach(element1 => {
        if (!similarityMap.get(element1)) {
            let maxSimilarity = 0;
            let indexOfMaxSimilarity = null;
            array2.forEach((element2, index) => {
                let similarity = stringSimilarity.compareTwoStrings(element1, element2);
                if (similarity === 1) {
                    similarityMap.set(element1, { similarity: similarity, elementIndex: index })
                    return;
                }
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity
                    indexOfMaxSimilarity = index
                }
            });
            if (indexOfMaxSimilarity) {
                similarityMap.set(element1, { similarity: maxSimilarity, elementIndex: indexOfMaxSimilarity });
            }
        }
    });
    return similarityMap;
}

similarityMap = getBestSimilarity();
console.log(similarityMap);


