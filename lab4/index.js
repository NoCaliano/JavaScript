const normalArray = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 1000));
const sparseArray = [...normalArray];
for (let i = 0; i < sparseArray.length; i += 5) {
    delete sparseArray[i];
}

console.log("Простий масив");
console.log(sortLibrary.bubbleSort(normalArray));
console.log(sortLibrary.selectionSort(normalArray, false));
console.log(sortLibrary.insertionSort(normalArray));
console.log(sortLibrary.shellSort(normalArray, false));
console.log(sortLibrary.quickSort(normalArray));

console.log("\nРозряджений масив");
console.log(sortLibrary.bubbleSort(sparseArray, false));
console.log(sortLibrary.selectionSort(sparseArray));
console.log(sortLibrary.insertionSort(sparseArray));
console.log(sortLibrary.shellSort(sparseArray));
console.log(sortLibrary.quickSort(sparseArray, false));