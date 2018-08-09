# 这是 kindo-vue-admin 的底层核心库

## components 公用组件支持

- kindo-card

  - 布局组件
  - 支持 header, control, footer, more 插槽

- kindo-card-search

  - 布局组件-查询跳转专用
  - 支持 more 插槽

- kindo-chart

  - 图表组件
  - 底层依赖 echart 4.x
  - 支持 echart 所有的时间与方法

- kindo-side-panel

  - 弹出组件
  - 支持左右弹出
  - 支持双层弹出

- kindo-xlsx-preview

  - 预览组件
  - 支持格式 xls, xlsx, txt

- kindo-table

  - 表格组件
  - 底层依赖 element-table
  - 支持 element-table 所有的方法
  - 支持 url , queryParam 方式获取数据
  - 支持 pagination 与 table

## directive 指令支持

- drag

  - element-dialog 拖拽

- focus

## helper 方法支持

- cache 缓存类支持

  - set 赋值
  - get 取值
  - remove 删除指定值
  - clear 清空

- dictionary 字典类支持

  - getDictionary / get 获取字典
  - getLabel 获取字典的 label
  - getValue 获取字典的 value

- util 常用方法类支持

  - queryUrlParam 获取 url 参数
  - setUri 配置 uri
  - toTree List 结构转换为 Tree 结构
  - formatDate 格式化日期为 yyyy-MM-dd 格式
  - formatTime 格式化日期为 yyyy-MM-dd HH:mm:ss 格式
  - formatNum 格式化数字为千分位
  - alert 提示
  - confirm 提示
  - notify 提示
  - downloadFile 下载
  - md5 加密
  - encode 加密
  - decode 解密

- valid

  - pattern 一系列可用正则验证
  - isEmpty 是否为空验证
  - length 长度验证
  - lengthForByte 字节长度验证
  - range 范围验证
  - url 验证
  - number 数字验证（正负整数）
  - numerical 数值验证（包括整数、浮点数、正、负数）
  - pNumerical 数值验证（包括整数、浮点数、正数）
  - interger 整数验证
  - pInterger 正整数及 0 验证
  - nInterger 负整数及 0 验证
  - mobile 手机号码验证
  - telephone 电话号码验证
  - idCard 验证
  - email 验证

## prototype 扩展原型支持

- date

  - formatDate 同 kindo.util.formatDate
  - formatTime 同 kindo.util.formatDate
  - proDate
  - toDate

- number

  - toDate
  - formatNum 同 kindo.util.formatNum

- string

  - restfulFormat RESTful 风格转换
  - format
  - byteLength
  - toDate
  - toFixed
  - formatDate
