export function* range (a, b) {
    let min = (a && b) ? a : 0;
    let max = (a && b) ? b : a;

    while (min < max) { yield min++; }
}
