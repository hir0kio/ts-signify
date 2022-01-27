export function getNumberFromBuffer(buf: Buffer) {
  let num = 0;

  for (let i = 0; i < buf.length; i++) {
    num += buf[buf.length - 1 - i] * 256 ** i;
  }

  return num;
}

export function getBufferFromNumber(num: number, size: number) {
  let buf = Buffer.alloc(size);

  for (let i = 0; i < size; i++) {
    let min = 256 ** (size - 1 - i);
    let unit = num / min - ((num / min) % 1);

    buf[i] = unit;
    num -= min * unit;
  }

  return buf;
}
