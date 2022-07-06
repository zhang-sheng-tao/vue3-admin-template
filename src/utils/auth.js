// 密钥
const secretKey = 'secretKeyS'

// 读取本地信息
export function getItem (name) {
  let value = localStorage.getItem(name)
  if (value) {
    value = b64Decode(value)
  }
  return value
}
// 设置本地信息
export function setItem (key, value) {
  const val = b64Encode(value)
  localStorage.setItem(key, val)
}
// 删除本地信息
export function removeItem (name) {
  localStorage.removeItem(name)
}

// 加密
export function b64Encode (str) {
  let strin = btoa(encodeURIComponent(str))
  return strin
    .split('')
    .map((item, i) => item + (secretKey + i))
    .reverse()
    .join('&')
}
// 解密
export function b64Decode (str) {
  let str64 = str
    .split('&')
    .reverse()
    .map((item, i) => item.replace(`${secretKey + i}`, ''))
    .join('')
  if (isBase64(str64)) {
    return decodeURIComponent(atob(str64))
  } else {
    return str64
  }
}
// 判断是否为base64字符串
function isBase64 (str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }
}
