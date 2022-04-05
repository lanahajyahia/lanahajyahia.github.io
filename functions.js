function generateEquation(dmas_array) {
    var randomNum, array = [];
    for (let i = 0; i < 7; i++) {
        if (i % 2 == 0) {
            randomNum = Math.floor(Math.random() * 10);
            array[i] = randomNum + '';
            if (i != 0) {
                if (array[i - 1] == '/') {
                    try {
                        while (!Number.isInteger(eval(array.join(''))) || randomNum == 0) {
                            randomNum = Math.floor(Math.random() * 10);
                            array[i] = randomNum + '';
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }

        } else {
            let index_random = Math.floor(Math.random() * 4);
            array[i] = dmas_array[index_random];
        }
    }
    sessionStorage.setItem('myArrayEquation', JSON.stringify(array));
    return array;
}