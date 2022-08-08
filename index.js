let stringSimilarity = require("string-similarity");

array1 = ['pavel', 'kuba', 'vasek'];
array2 = ['kuba', 'vasek', 'pavel'];

function getBestSimilarity() {
    let similarityMap = new Map();
    array1.forEach(element1 => {
        if (!similarityMap.get(element1)) {
            let maxSimilarity = -1;
            let indexOfMaxSimilarity = null;
            for (let i = 0; i < array2.length; i++) {
                let similarity = stringSimilarity.compareTwoStrings(element1, array2[i]);
                if (similarity === 1) {
                    similarityMap.set(element1, { similarityRating: similarity, elementIndex: i });
                    break;
                }
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity
                    indexOfMaxSimilarity = index
                }
            }
            if (indexOfMaxSimilarity) {
                similarityMap.set(element1, { similarity: maxSimilarity, elementIndex: indexOfMaxSimilarity });
            }
        }
    });
    return similarityMap;
}

function getBestSimilarityByLib() {
    let similarityMap = new Map();
    array1.forEach(element => {
        if (!similarityMap.get(element)) {
            bestMatchedSimilarity = stringSimilarity.findBestMatch(element, array2);
            similarityMap.set(element, { similarityRating: bestMatchedSimilarity.ratings[bestMatchedSimilarity.bestMatchIndex].rating, elementIndex: bestMatchedSimilarity.bestMatchIndex });
        }
    });
    return similarityMap
}

similarityMap = getBestSimilarityByLib();
similarityMap2 = getBestSimilarity();
console.log(similarityMap);
console.log(similarityMap2);


