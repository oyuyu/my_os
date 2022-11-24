# 从零到一 前端工程化

## 模块化

模块化规范

|          | CJS 编码 | ESM 编码 |
| -------- | -------- | -------- |
|          | node     | 浏览器   |
| type     | CommonJS | module   |
| 引入方式 | require  | import   |
|          |          |          |
|          |          |          |
|          |          |          |

## package.json

|         | 解释             | 枚举值/备注                                    |
| ------- | ---------------- | ---------------------------------------------- |
| type    | 模块化规范类型   | module/CommonJS                                |
| engines | 版本兼容         | 使用 babel 转换时的不用指定                    |
| babel   | 将新语法向下兼容 | 若需兼容低版本 Node，在 Babel 的 target 中指定 |
|         |                  |                                                |
|         |                  |                                                |

脚本解释
| | 解释 |
| ------- | -------------- | --------------- |
| --es-module-specifier-resolution=node |指定文件名引用方式 |=explicit(默认)引用时必须加文件后缀 =node 引用模块不需要加文件后缀 |
| | | |
| | | |
| | | |
| | | |

### 依赖

|                    |                           |
| ------------------ | ------------------------- |
| "@yangzw/bruce-us" | 开源库,获取 node 相关信息 |
| nodemon            | 监听文件变化自动重启      |
|                    |                           |
|                    |                           |

## 文档

https://nodejs.org/zh-cn/download/releases/ node 与 npm 对应版本
