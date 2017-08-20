
interface Math {
    nextFloat(): number
    nextBoundFloat(min: number, max: number): number
}

Math.nextFloat = function() {
    return Math.nextBoundFloat(0, 1);
}

Math.nextBoundFloat = function(min, max) {
    return Math.random() * (max - min) + min;
}

// console.log("Hello World");