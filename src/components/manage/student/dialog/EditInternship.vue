<template>
  <el-dialog id=EditInternship :visible="visible" :before-close="close">
    <el-steps :active="step.active" align-center finish-status="success">
      <el-step v-for="item in step.steps" :key="item.label" :title="item.title"></el-step>
    </el-steps>
    <el-form label-width="80" label-position="left">
      <span v-show="step.active===1">
        <el-form-item label="实习单位">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="单位地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
        </el-form-item>
        <el-form-item label="结束日期">
        </el-form-item>
        <el-form-item label="每周天数">
        </el-form-item>
        <el-form-item label="指导老师">
        </el-form-item>
      </span>
      <span v-show="step.active===2">
        <el-form-item label="主题">
        </el-form-item>
        <el-form-item label="主要内容">
        </el-form-item>
        <el-form-item label="进度安排">
        </el-form-item>
      </span>
    </el-form>
    <span slot="footer">
      <el-button v-for="(item, index) in buttons" :key="item.label" @click="item.handler" :type="item.type"
                 :disabled="!item.active">{{ item.label }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EditInternship',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        step: {
          active: 1,
          steps: [{
            title: '基本信息',
          }, {
            title: '实习内容'
          }]
        },
        buttons: [{
          label: '上一步',
          active: false,
          handler: () => {
            let step = --this.step.active;
            if (step === 1) {
              this.buttons[0].active = false;
            }
            this.buttons[1].label = '下一步';
          }
        }, {
          label: '下一步',
          active: true,
          type: 'primary',
          handler: () => {
            let step = ++this.step.active;
            // 点击下一步
            if (step === this.step.steps.length) {
              this.buttons[1].label = '完成';
            }
            // 点击完成
            else if (step > this.step.steps.length) {
              // TODO do something
              this.close();
            }
            this.buttons[0].active = true;
          }
        }, {
          label: '取消',
          active: true,
          handler: () => {
            this.close();
          }
        }]
      }
    },
    methods: {
      close() {
        this.$emit('close');
        this.resetDialog();
      },
      resetDialog() {
        this.step.active = 1;
        let buttons = this.buttons;
        buttons[0].active = false;
        buttons[1].label = '下一步';
      }
    }
  }
</script>

<style scoped>

</style>
