<template>
  <div id="EditInternship">
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="300px"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="60px">

      </el-form>
      <span slot="footer">
        <el-button v-for="button in buttons"
                   :key="button.label"
                   :type="button.type"
                   @click="button.handler">
          {{ button.label }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditInternship',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      internship: {
        type: Object,
        default: () => {
          return {}
        }
      },
      title: {
        type: String,
        default: '编辑实习申报书'
      }
    },
    mounted() {

    },
    data() {
      return {
        form: {
          id: -1,
          student: {},
          teacher: {},
          startTime: '',
          endTime: '',
          theme: '',
          companyName: '',
          companyAddress: '',
          arrangement: '',
          weekday: '',
          rank: '',
          attachment: false,

        },
        buttons: [
          {
            label: '保存',
            type: 'primary',
            handler: () => {
              this.$axios({
                url: this.$api.internship.url,
                method: 'post',
                data: this.form
              }).then(data => {
                this.$message({
                  type: 'success',
                  message: '保存成功',
                });
                this.close(true);
              }).catch(err => {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              })
            }
          },
          {
            label: '取消',
            handler: () => {
              this.close();
            }
          },
        ]
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
    },
    watch: {
      Internship() {
        let id = this.Internship.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.Internship));
        }
        else {
          this.form = {
            id: -1,
            student: {},
            teacher: {},
            startTime: '',
            endTime: '',
            theme: '',
            companyName: '',
            companyAddress: '',
            arrangement: '',
            weekday: '',
            rank: '',
            attachment: false,

          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
