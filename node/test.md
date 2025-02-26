# 测试

## node 原生测试
```bash
node --test
```

## 如何缩小测试范围

### 指定测试目录或文件
指定文件
```bash
node --test path-to-test-file.js
```

指定目录
```bash
node --test test/*
```

### 使用 `--test-name-pattern`
通过指定名称模式来运行测试

在 `test.js` 中，匹配 `test name` 测试用例
```bash
node --test --test-name-pattern="test name" test.js
```

在 `test.js` 中，匹配 `测试` 结尾的测试用例
```bash
node --test --test-name-pattern="测试$" test/*.test.js
```

### 如何串行测试
node 默认会并行测试以提高效率，若实在需要串行测试，可以使用 `--test-concurrency`
```bash
node --test --test-concurrency=1
```
