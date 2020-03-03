export function stringToBytes(str: string) {
    return str.split('').map(function(x) { return x.charCodeAt(0) })
};

export function hex2Rgb(hex: string) {
    hex.length === 7 ? hex = hex.substring(1,) : hex = hex;
    let bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const rgbArray = [r, g, b];
    return rgbArray;
}