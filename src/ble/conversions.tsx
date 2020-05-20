export function stringToChars(str: string) {
  let chars: any[] = [];
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i).toString(16);
    chars.push(char);
  }
  return chars;
}

export function letterToChar(ltr: string) {
  return ltr.charCodeAt(0).toString(16);
}
export function stringToBytes(str: string) {
  return str.split('').map(function(x) { return x.charCodeAt(0) })
}
export function bytesToString(bytes: any[]) {
  return bytes.map(function(x){ return String.fromCharCode(x) }).join('')
}
export function bytesToStringUTF8(bytes: any[]) {
  return decodeURIComponent(escape(bytesToString(bytes)))
}
export function stringUTF8ToBytes(str: string) {
 return stringToBytes(unescape(encodeURIComponent(str)))
}

export function hex2Rgb(hex: string) {
    hex.length === 7 ? hex = hex.substring(1,) : hex = hex;
    let bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const rgbArray = [r, g, b];
    return rgbArray;
}

// export function emojiToText(unicode) {
// }

const DataConversions = {
  letterToChar, bytesToString, bytesToStringUTF8,
  stringToChars, stringToBytes, stringUTF8ToBytes,
  hex2Rgb,
}

export default DataConversions