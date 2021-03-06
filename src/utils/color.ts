import { Color } from '../components/MessageControl/color';

export function hex2Rgb(hex: string) {
  hex.length === 7 ? (hex = hex.substring(1)) : (hex = hex);
  let bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const rgbArray = [r, g, b];
  return rgbArray;
}

export function rgb2Hex(rgb: number[]) {
  let hex = '#';
  rgb.forEach(c => {
    let col: string = c.toString(16);
    if (col.length === 1) {
      col = `0${col}`;
    }
    hex += col;
  });
  return hex;
}

export const HSLToHex = (h: number, s: number, l: number) => {
  // s /= 100;
  // l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Having obtained RGB, convert channels to hex
  let R = Math.round((r + m) * 255).toString(16);
  let G = Math.round((g + m) * 255).toString(16);
  let B = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (R.length == 1) {
    R = '0' + R;
  }
  if (G.length == 1) {
    G = '0' + G;
  }
  if (B.length == 1) {
    B = '0' + B;
  }

  return '#' + R + G + B;
};

function hexToHSL(H: string) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  let rgb = {
    r: '',
    g: '',
    b: '',
  };

  if (H.length == 4) {
    rgb.r = '0x' + H[1] + H[1];
    rgb.g = '0x' + H[2] + H[2];
    rgb.b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    rgb.r = '0x' + H[1] + H[2];
    rgb.g = '0x' + H[3] + H[4];
    rgb.b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) {
    h = 0;
  } else if (cmax == r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
