[[toc]]

## kindo-card

将信息聚合在卡片容器中展示。

## 基础用法

包含标题，内容，页脚和操作。

::: demo

```html
<template>
  <div>
    <kindo-card>
      <div slot="header">header</div>
      <p>....</p>
      <div slot="footer">footer</div>

      <div slot="control">
        <el-button type="text">操作</el-button>
      </div>
    </kindo-card>
  </div>
</template>
```

:::

## 典型表单

与表单或表格联合使用

::: demo

```html
<template>
  <div>
    <kindo-card>
      <div slot="header">header</div>

      <el-form label-width="100px">
        <el-form-item label="查询条件：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer">footer</div>
    </kindo-card>

    <kindo-card>
      <div slot="header">header</div>

      <el-form label-width="70px" inline>
        <el-form-item label="查询条件：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer">footer</div>
    </kindo-card>

    <kindo-card>
      <el-table :data="[{name: '张三', sex: '男'}]" border>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
      </el-table>

      <div slot="control">
        <el-button type="primary">编辑</el-button>
        <el-button type="primary">删除</el-button>
      </div>
    </kindo-card>
  </div>
</template>
```

:::

::: demo

```html
<template>
  <div>
    123
    <kindo-table :data="[{name: '张三', sex: '男'}]" border>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
    </kindo-table>
  </div>
</template>
```

:::
