<template>
  <div id="EditInternship">
    <el-dialog :visible.sync="visible"
               :before-close="close"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="100px">
        <el-form-item label="起止时间">
          <el-date-picker unlinke-panel
                          clearable
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          type="daterange"
                          :picker-options="datePicker.options"
                          v-model="datePicker.value"
                          @change="changeDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="每周实习天"></el-form-item>
        <el-form-item label="主题"></el-form-item>
        <el-form-item label="实习公司"></el-form-item>
        <el-form-item label="实习公司地址"></el-form-item>
        <el-form-item label="实习内容">
          <quill-editor v-model="form.object"
                        :options="editor.object"></quill-editor>
        </el-form-item>
        <el-form-item label="计划安排">
          <quill-editor v-model="form.arrangement"
                        :options="editor.arrangement"></quill-editor>
        </el-form-item>
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
  import {quillEditor as QuillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'

  export default {
    name: 'EditInternship',
    components: {
      'quill-editor': QuillEditor
    },
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
          startTime: {},
          endTime: {},
          theme: '',
          companyName: '',
          companyAddress: '',
          object: '',
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
        ],
        datePicker: {
          options: {
            shortcuts: [
              {
                text: '一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '半年',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(start.getTime() + 3600 * 1000 * 24 * 180);
                  picker.$emit('pick', [start, end]);
                }
              }
            ]
          },
          value: [],
        },
        editor: {
          object: {
            theme: 'snow',
            modules: {
              history: {},
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'size': ['small', false]}, {'align': []}, {'color': []}, {'font': []}],
                [{'header': 1}, {'header': 2}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                ['clean']
              ]
            },
            placeholder: '请输入实习主要内容...',
          },
          arrangement: {
            theme: 'snow',
            modules: {
              history: {},
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'size': ['small', false]}, {'align': []}, {'color': []}, {'font': []}],
                [{'header': 1}, {'header': 2}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                ['clean']
              ]
            },
            placeholder: '请输入实习计划与安排...',
          },
        }
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
      changeDate(date) {
        this.form.startTime = date[0];
        this.form.endTime = date[1];
      },
    },
    watch: {
      internship: function () {
        let id = this.internship.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.internship));
        }
        else {
          this.form = {
            id: -1,
            student: {},
            teacher: {},
            startTime: {},
            endTime: {},
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
