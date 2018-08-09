## 说明

## 特性

[vue-cli 支持](https://cli.vuejs.org/)

## 预览

[UAS SITE (内网系统，改造中...)](http://192.168.2.55/007/)

## 安装

```sh
## 拉取 trunk 主干
npm install
npm run serve
```

## 更新日志

> 本插件库严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

```
* 主版本号：含有破坏性更新和新特性。
* 次版本号：向下兼容的功能性新增。
* 修订版本号：向下兼容的问题修正。
```

---

### v0.0.1(Beta)

`2018-07-09`

- UAS(系统)

  - 正式发布

- Framework(框架)

  - 🌟 基于 vue-cli@3.x 搭建
  - 🌟 依赖 axios@0.18.x
  - 🌟 依赖 element-ui@2.4.3
  - 🌟 依赖 echarts@4.1.0
  - 🌟 依赖 font-awesome@4.7.0

- Components(组件)

  - 🌟 kindo-card
  - 🌟 kindo-card-search
  - 🌟 kindo-chart (参考 [vue-echarts](https://github.com/ecomfe/vue-echarts))
  - 🌟 kindo-icon-select
  - 🌟 kindo-rich-datepicker
  - 🌟 kindo-side-panel
  - 🌟 kindo-table (参考 [element-table](http://element.eleme.io/#/zh-CN/component/table))

- Helper(帮助类))

  - config

    - 🌟 kindo.config...

  - cache

    - 🌟 kindo.cache.set
    - 🌟 kindo.cache.get
    - 🌟 kindo.cache.remove
    - 🌟 kindo.cache.clear

  - dictionary

    - 🌟 kindo.dictionary.get / kindo.dictionary.getDictionary
    - 🌟 kindo.dictionary.getLabel
    - 🌟 kindo.dictionary.getValue

  - util

    - 🌟 kindo.util.queryUrlParam
    - 🌟 kindo.util.setUri
    - 🌟 kindo.util.toTree
    - 🌟 kindo.util.formatDate
    - 🌟 kindo.util.formatTime
    - 🌟 kindo.util.alert
    - 🌟 kindo.util.confirm
    - 🌟 kindo.util.notify
    - 🌟 kindo.util.downloadFile
    - 🌟 kindo.util.md5
    - 🌟 kindo.util.encode
    - 🌟 kindo.util.decode

  - valid

    - 🌟 kindo.valid.isEmpty
    - 🌟 kindo.valid.length
    - 🌟 kindo.valid.lengthForByte
    - 🌟 kindo.valid.range
    - 🌟 kindo.valid.url
    - 🌟 kindo.valid.number
    - 🌟 kindo.valid.numerical
    - 🌟 kindo.valid.pNumerical
    - 🌟 kindo.valid.interger
    - 🌟 kindo.valid.pInterger
    - 🌟 kindo.valid.nInterger
    - 🌟 kindo.valid.mobile
    - 🌟 kindo.valid.telephone
    - 🌟 kindo.valid.idCard
    - 🌟 kindo.valid.email
