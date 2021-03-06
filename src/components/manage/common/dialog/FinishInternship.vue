<template>
  <div id=FinishInternship>
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="70%"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="100px">
        <el-form-item label="实习总结"
                      class="editor-box">
          <quill-editor v-model="form.summary"
                        :options="editor.options"
                        class="editor"></quill-editor>
        </el-form-item>
        <el-form-item label="实习评分"
                      v-if="!(type === 'student' && rank > 0)">
          <el-slider v-model="form.rank"
                     :disabled="type === 'student'"
                     :max="10"
                     show-stops
                     show-input></el-slider>
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
    name: 'FinishInternship',
    components: {
      'quill-editor': QuillEditor
    },
    props: {
      title: {
        type: String,
        default: '结束实习',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'student',
      },
      internship: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data() {
      return {
        form: {
          id: -1,
          summary: '',
          rank: 8,
        },
        buttons: {
          student: [
            {
              label: '确认',
              type: 'primary',
              handler: () => {
                this.$axios({
                  url: this.$api.internship.finish,
                  method: 'post',
                  data: this.form
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                  });
                  this.close(true);
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
              label: '评分',
              type: 'primary',
              handler: () => {
                this.$axios({
                  url: this.$api.internship.rank,
                  method: 'post',
                  data: this.form
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '评分成功',
                  });
                  this.close(true);
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
        }
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
    },
    watch: {
      internship() {
        let id = this.internship.id;
        if (id && id !== -1) {
          this.form = this.form = JSON.parse(JSON.stringify(this.internship));
        }
        else {
          this.form = {
            id: -1,
            summary: '',
            rank: 8,
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
