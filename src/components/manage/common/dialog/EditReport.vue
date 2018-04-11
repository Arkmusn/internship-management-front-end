<template>
  <div id=EditReport>
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="65%"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="100px">
        <el-form-item label="本周周报"
                      class="editor-box">
          <quill-editor v-model="form.process"
                        :options="editor.options"
                        class="editor"></quill-editor>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <template v-if="type==='student'">
          <el-button v-for="button in buttons.student"
                     :key="button.label"
                     :type="button.type"
                     @click="button.handler">{{ button.label }}
          </el-button>
        </template>
        <template v-if="type==='teacher'">
          <el-button v-for="button in buttons.teacher"
                     :key="button.label"
                     :type="button.type"
                     @click="button.handler">{{ button.label }}
          </el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {quillEditor as QuillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'

  export default {
    name: 'EditReport',
    components: {
      'quill-editor': QuillEditor
    },
    props: {
      title: {
        type: String,
        default: '周报详情',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'student',
      },
      report: {
        type: Object,
        default: () => {
          return {};
        }
      },
      intern: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        form: {
          id: -1,
          process: '',
          time: '',
          intern: null,
        },
        editor: {
          options: {
            theme: 'snow',
            readOnly: this.type === 'teacher',
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
          }
        },
        buttons: {
          student: [
            {
              label: '提交',
              type: 'primary',
              handler: () => {
                this.$axios({
                  url: this.$api.report.url,
                  method: 'post',
                  data: this.form
                }).then(data => {
                  this.$message({
                    type: 'success',
                    message: '保存成功',
                  });
                  this.close();
                }).catch(err => {
                })
              }
            },
            {
              label: '取消',
              handler: () => {
                this.close();
              }
            }
          ],
          teacher: [
            {
              label: '取消',
              handler: () => {
                this.close();
              }
            }
          ],
        }
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
    },
    watch: {
      report() {
        let id = this.report.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.report));
        }
        else {
          this.form = {
            id: -1,
            process: '',
            time: this.report.time,
            intern: this.intern,
          };
        }
      },
    },
  }
</script>

<style scoped>
  .editor-box {
    height: 200px;
  }
  .editor {
    height: 160px;
  }
</style>
