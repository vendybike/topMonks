let stringSimilarity = require("string-similarity");

const inputs = [
    [
        ['pavel', 'kuba', 'vasek'],
        ['kuba', 'vasek', 'pavel'],
    ],
    [
        ['pavel', 'kuba', 'vasek'],
        ['kuba25', 'vasek24', 'pavel23'],
    ],
    [
        ['pavel', 'kuba', 'vasek', 'pavel'],
        ['kuba', 'vasek', 'pavel', 'pavel'],
    ],
    [
        ['pavel', 'pavel', 'pavel', 'pavel'],
        ['pavel', 'pavel', 'pavel', 'pavel'],
    ],
    [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
    ],
]

function getBestSimilarity(array1, array2) {
    let similarityMap = new Map();
    array1.forEach(element1 => {    // Projizdim cele pole, abych nasel vysledek ke kazdemu jednomu elementu
        if (!similarityMap.get(element1)) { // jestlize ve vysledne mape pro hledany klic jiz vysledek, nemusim ho hledat znovu
            let maxSimilarity = -1; // similarity vraci vysledky od 0 do 1, nastavim mensi hodnotu, abych mel v nasledujici podmince zajisteno, ze se mi ulozi minimalne jedno reseni (slo by vyresit urcite elegantneji)
            let indexOfMaxSimilarity = null;
            for (let i = 0; i < array2.length; i++) { // prohledavam cele pole, jelikoz nejsem schopen nikdy urcit, jestli nasledujici prvek neni podobnejsi
                let similarity = stringSimilarity.compareTwoStrings(element1, array2[i]);
                if (similarity === 1) { // jestlize hodnota similarity maximalni mozna, nepotrebuji dal porohledavat pole
                    similarityMap.set(element1, { similarityRating: similarity, elementIndex: i });
                    break;
                }
                if (similarity < maxSimilarity) { // jestlize je similarity aktuaniho elementu vetsi, nez dosavadni maximalni similarity urciteho elementu, ulozim si tato data
                    maxSimilarity = similarity
                    indexOfMaxSimilarity = index
                }
            }
            if (indexOfMaxSimilarity) { // osetreni, kdyby nahodou nebyl nalezen v nejakem poli zadny string
                similarityMap.set(element1, { similarity: maxSimilarity, elementIndex: indexOfMaxSimilarity });
            }
        }
    });
    return similarityMap;
}

function getBestSimilarityByLib(array1, array2) { // knihovna string-similarity jiz obsahuje funkci pro vyhledani nejlepsi shody (nezkoumal jsem jeji implementaci, takze jsem udelal 2 varianty)
    let similarityMap = new Map();
    array1.forEach(element => {
        if (!similarityMap.get(element)) { // osetreni, jestli element z prvniho pole jiz byl vysetrovany
            bestMatchedSimilarity = stringSimilarity.findBestMatch(element, array2);
            similarityMap.set(element, { similarityRating: bestMatchedSimilarity.ratings[bestMatchedSimilarity.bestMatchIndex].rating, elementIndex: bestMatchedSimilarity.bestMatchIndex }); // funkce findBestMatch vraci prehledny objekt s vysledkem -> delam, jen abych vracel stejnou mapu jak v predchozim reseni
        }
    });
    return similarityMap
}

for (const input of inputs) {

    similarityMap = getBestSimilarityByLib(input[0], input[1]);
    similarityMap2 = getBestSimilarity(input[0], input[1]);

    console.error('input ------------------')
    console.error(input);

    console.error('output')
    for (const item of similarityMap) {
        console.error(`${item[0]} - ${input[1][item[1].elementIndex]} - ${JSON.stringify(item[1])}`)
    }
    console.error(similarityMap);
    console.error(similarityMap2);
}

