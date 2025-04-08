const sortLibrary = (() => {
    const logResult = (name, comparisons, moves, hasSparse) => {
        console.log(`- ${name} -`);
        console.log(`Порівнянь: ${comparisons}`);
        console.log(`Перестановок: ${moves}`);
        if (hasSparse) {
            console.log("Помічено розряджений масив!!! Значення undefined замінено на Infinity");
        }
    };

    const compare = (a, b, ascending) => ascending ? a > b : a < b;

    const filterSparse = (arr) => {
        const hasSparse = arr.some((el) => el === undefined);
        return {
            array: arr.map((el) => el === undefined ? Infinity : el),
            hasSparse
        };
    };

    return {
        bubbleSort(arr, ascending = true) {
            const a = [...arr];
            let comparisons = 0, moves = 0;
            const { array, hasSparse } = filterSparse(a);

            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - 1 - i; j++) {
                    comparisons++;
                    if (compare(array[j], array[j + 1], ascending)) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        moves++;
                    }
                }
            }

            logResult("Bubble Sort", comparisons, moves, hasSparse);
            return array;
        },

        selectionSort(arr, ascending = true) {
            const a = [...arr];
            let comparisons = 0, moves = 0;
            const { array, hasSparse } = filterSparse(a);

            for (let i = 0; i < array.length - 1; i++) {
                let idx = i;
                for (let j = i + 1; j < array.length; j++) {
                    comparisons++;
                    if (compare(array[idx], array[j], ascending)) {
                        idx = j;
                    }
                }
                if (idx !== i) {
                    [array[i], array[idx]] = [array[idx], array[i]];
                    moves++;
                }
            }

            logResult("Selection Sort", comparisons, moves, hasSparse);
            return array;
        },

        insertionSort(arr, ascending = true) {
            const a = [...arr];
            let comparisons = 0, moves = 0;
            const { array, hasSparse } = filterSparse(a);

            for (let i = 1; i < array.length; i++) {
                let current = array[i];
                let j = i - 1;
                while (j >= 0 && compare(array[j], current, ascending)) {
                    comparisons++;
                    array[j + 1] = array[j];
                    moves++;
                    j--;
                }
                array[j + 1] = current;
                moves++;
            }

            logResult("Insertion Sort", comparisons, moves, hasSparse);
            return array;
        },

        shellSort(arr, ascending = true) {
            const a = [...arr];
            let comparisons = 0, moves = 0;
            const { array, hasSparse } = filterSparse(a);

            let gap = Math.floor(array.length / 2);
            while (gap > 0) {
                for (let i = gap; i < array.length; i++) {
                    let temp = array[i];
                    let j = i;
                    while (j >= gap && compare(array[j - gap], temp, ascending)) {
                        comparisons++;
                        array[j] = array[j - gap];
                        moves++;
                        j -= gap;
                    }
                    array[j] = temp;
                    moves++;
                }
                gap = Math.floor(gap / 2);
            }

            logResult("Shell Sort", comparisons, moves, hasSparse);
            return array;
        },

        quickSort(arr, ascending = true) {
            let comparisons = 0, moves = 0;
            const { array, hasSparse } = filterSparse([...arr]);

            const quick = (arr) => {
                if (arr.length <= 1) return arr;

                let pivot = arr[Math.floor(arr.length / 2)];
                let left = [], right = [], equal = [];

                for (let el of arr) {
                    comparisons++;
                    if (el === pivot) {
                        equal.push(el);
                    } else if (compare(pivot, el, ascending)) {
                        left.push(el);
                        moves++;
                    } else {
                        right.push(el);
                        moves++;
                    }
                }

                return [...quick(left), ...equal, ...quick(right)];
            };

            const result = quick(array);
            logResult("Quick Sort (Hoare)", comparisons, moves, hasSparse);
            return result;
        }
    };
})();