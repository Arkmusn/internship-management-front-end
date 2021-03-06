<template>
  <div id="EditInternship">
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="70%"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="100px">
        <el-form-item label="指导教师"
                      v-if="type!=='teacher'">
          <el-select filterable
                     remote
                     :remote-method="asyncLoadTeacherData"
                     :loading="selector.teacher.loading"
                     value-key="id"
                     clearable
                     v-model="form.teacher">
            <el-option v-for="item in selector.teacher.options"
                       :label="item.name"
                       :key="item.id"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker unlinke-panel
                          clearable
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          type="daterange"
                          :picker-options="datePicker.options"
                          v-model="datePicker.value"
                          @change="changeDate"
                          :readonly="type==='teacher'"></el-date-picker>
        </el-form-item>
        <el-form-item label="每周实习天">
          <div class="weekday-mask"
               v-if="type==='teacher'"></div>
          <el-checkbox-group v-model="checkboxGroup.weekday.values">
            <el-checkbox-button v-for="checkbox in checkboxGroup.weekday.options"
                                :label="checkbox.value"
                                :key="checkbox.value">{{ checkbox.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主题">
          <el-input v-model="form.theme"
                    :readonly="type==='teacher'"></el-input>
        </el-form-item>
        <el-form-item label="实习公司">
          <el-input v-model="form.companyName"
                    :readonly="type==='teacher'"></el-input>
        </el-form-item>
        <el-form-item label="实习公司地址">
          <el-input v-model="form.companyAddress"
                    :readonly="type==='teacher'"></el-input>
        </el-form-item>
        <el-form-item label="实习内容"
                      class="editor-box">
          <quill-editor v-model="form.object"
                        :options="editor.object"
                        class="editor"></quill-editor>
        </el-form-item>
        <el-form-item label="计划安排"
                      class="editor-box">
          <quill-editor v-model="form.arrangement"
                        :options="editor.arrangement"
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
  import debounce from 'lodash.debounce'

  export default {
    name: 'EditInternship',
    components: {
      'quill-editor': QuillEditor
    },
    props: {
      finishFlag: {
        type: Boolean,
        default: false,
      },
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
      },
      type: {
        type: String,
        default: 'student'
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
          weekday: [],
          rank: '',
          attachment: false,
        },
        buttons: {
          student: [
            {
              disabled: this.finishFlag,
              label: '提交审核',
              type: 'primary',
              handler: () => {
                this.$axios({
                  url: this.$api.internship.url,
                  method: 'post',
                  data: this.form,
                  transformRequest: [
                    (data, headers) => {
                      data.student = JSON.parse(localStorage.getItem('user')).user;
                      const values = this.checkboxGroup.weekday.values;
                      let weekday = 0;
                      for (let value of values) {
                        weekday += 1 << value - 1;
                      }
                      data.weekday = weekday;
                      headers.post['Content-Type'] = 'application/json;charset=utf-8';
                      return JSON.stringify(data);
                    }
                  ],
                }).then(data => {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                  });
                  this.close(true);
                }).catch(err => {
                  this.$message({
                    type: 'error',
                    message: '提交失败'
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
          teacher: [
            {
              label: '通过',
              type: 'primary',
              handler: () => {
                this.$emit('audit', [this.internship]);
              }
            },
            {
              label: '打回',
              type: 'danger',
              handler: () => {
                this.$emit('reject', [this.internship]);
              },
            },
            {
              label: '取消',
              handler: () => {
                this.close();
              }
            },
          ],
        },
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
        checkboxGroup: {
          weekday: {
            values: [],
            options: [
              {
                label: '星期一',
                value: 1,
              },
              {
                label: '星期二',
                value: 2,
              },
              {
                label: '星期三',
                value: 3,
              },
              {
                label: '星期四',
                value: 4,
              },
              {
                label: '星期五',
                value: 5,
              },

            ],
          },
        },
        selector: {
          teacher: {
            loading: false,
            options: [],
          },
        },
        editor: {
          object: {
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
          },
          arrangement: {
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
          },
        }
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
      changeDate(date) {
        if (date && date[0] && date[1]) {
          this.form.startTime = date[0];
          this.form.endTime = date[1];
        }
      },
      asyncLoadTeacherData(query) {
        this.selector.teacher.loading = true;
        (debounce(() => {
          if (query !== '') {
            this.$axios({
              url: this.$api.teacher.queryTeacherByName,
              method: 'get',
              params: {
                name: query
              },
            }).then(data => {
              this.selector.teacher.options = data;
              this.selector.teacher.loading = false;
            }).catch(err => {
            })
          }
        }, 500))();
      },
    },
    watch: {
      internship() {
        let id = this.internship.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.internship));

          let bit = 1;
          let weekday = this.form.weekday;
          this.checkboxGroup.weekday.values = [];
          while (weekday > 0) {
            if (weekday % 2 === 1 && bit <= 5) {
              this.checkboxGroup.weekday.values.push(bit);
            }
            weekday >>= 1;
            bit++;
          }

          this.datePicker.value = [];
          this.datePicker.value.push(new Date(this.form.startTime));
          this.datePicker.value.push(new Date(this.form.endTime));
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
            object: '',
            arrangement: '',
            weekday: [],
            rank: '',
            attachment: false,
          };
          this.checkboxGroup.weekday.values = [];
          this.form.startTime = {};
          this.form.endTime = {};
        }
      }
    }
  }
</script>

<style scoped>
  .weekday-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .editor-box {
    height: 200px;
  }
  .editor {
    height: 160px;
  }
</style>
