<template>
  <TableColumn v-if="internalVisible" v-bind="$attrs" v-on="$listeners">
    <template slot-scope="scope">
      <slot :row="scope.row" :$index="scope.$index">
        <span>{{ scope.row[$attrs.prop] }}</span>
      </slot>
    </template>
  </TableColumn>
</template>

<script>
import TableColumn from './tableColumn'

export default {
  name: 'kindo-table-column',

  components: { TableColumn },

  props: {
    visible: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  data() {
    return {
      internalVisible: this.visible
    }
  }
}
</script>

<style>
</style>
