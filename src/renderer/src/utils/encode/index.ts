import md5 from 'js-md5'

function fun(a: number, b: number, c: number): Array<number> {
  return [a >> 2, ((a & 3) << 4) | (b >> 4), ((b & 15) << 2) | (c >> 6), c & 63]
}

export function encrypt(text: string): string {
  // const _text = crypto.createHash('md5').update(text).digest('hex').toUpperCase()
  const _text = md5(text).toUpperCase()
  const header = 'zzb' + [21, 4, 9, 26, 16, 20, 27, 30].map((item) => _text[item]).join('')
  const tail = [18, 11, 3, 2, 1, 7, 6, 25].map((item) => _text[item]).join('')
  const arr = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6].map(
    (item, index) => {
      return (parseInt(_text[index * 2], 16) * 16) ^ parseInt(_text[index * 2 + 1], 16) ^ item
    }
  )
  const idx: Array<number> = []
  for (let i = 0; i < 15; i += 3) idx.push(...fun(arr[i], arr[i + 1], arr[i + 2]))
  idx.push(...[arr[15] >> 2, (arr[15] & 3) << 4])
  const body = idx
    .map((item) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='[item])
    .join('')
  return (header + body + tail).toLowerCase().replace(/[+/]/g, '')
}
