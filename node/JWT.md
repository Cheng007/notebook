# JWT
JWT(JSON Web Token)，是一种开放的行业标准 RFC 7519 方法，用于在两方之间安全地表示声明，进行身份验证

## 怎么生成JWT
```js
// npm install jose，可以直接使用这个工具生成

// 头部
const header = {
  // 使用的加密算法
  "alg": "HS256",
  // token type
  "typ": "JWT"
}
// 载荷
const payload = {
  "iat": 1516239022,
  "sub": "1234567890",
  "name": "John Doe",
}
// 验证签名
const signature = ''
const jwt = [
  // base64编码
  btoa(JSON.stringify(header)),
  btoa(JSON.stringify(payload)),
  // 伪代码
  HMACSHA256(
    [
      btoa(JSON.stringify(header)),
      btoa(JSON.stringify(payload)),
    ].join('.')
    // 伪代码
    'your-256-bit-secret'
  )
].join('.')
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```