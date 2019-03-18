<template>
  <div id="app">
    <el-input v-model="aaa" type="textarea" :rows="10"/>
    <JsonEditor :objData="jsonSource.web.table.schema" v-model="jsonSource.web.table.schema"/>
    <tree-view :data="jsonSource.web.table.schema"/>

    <hr>

    <Viewa :schema="jsonSource.web.table.schema"></Viewa>
  </div>
</template>

<script>
import Viewa from "./VIEW.vue";

const jsonSource = {
  web: {
    table: {
      schema: {
        paginse: true,
        header: [
          {
            prop: "department",
            label: "科室",
            width: "200px"
          },
          {
            prop: "department1",
            label: "科室1",
            width: "200px"
          }
        ],
        footer: [],
        source: "填写 sql "
      }
    }
  }
};

export default {
  components: {
    Viewa
  },

  name: "app",

  data() {
    return {
      aaa: "",

      jsonSource,

      data: []
    };
  },

  watch: {
    aaa(val) {
      this.jsonSource.web.table.schema = JSON.parse(val);
    }
  },

  created() {
    setTimeout(() => {
      this.aaa = JSON.stringify(this.jsonSource.web.table.schema, null, 2);
    }, 1000);
  },

  methods: {
    get() {
      setTimeout(() => {
        this.data = [{ department: 1 }];
      }, 1000);
    }
  }
};
</script>

<style>
</style>
