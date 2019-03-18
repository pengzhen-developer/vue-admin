
<script>
export default {
  name: "view",

  props: {
    schema: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      data: []
    };
  },

  methods: {
    get() {
      setTimeout(() => {
        this.data = [{ department: 1 }];
      }, 1000);
    }
  },

  render() {
    this.get();

    const column = this.schema.header.map(item => {
      return <el-table-column {...{ attrs: item }} />;
    });

    return (
      <div>
        <el-table data={this.data}>{column}</el-table>
      </div>
    );
  }
};
</script>