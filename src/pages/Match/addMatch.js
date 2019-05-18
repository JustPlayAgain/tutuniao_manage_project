import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Input, Card, DatePicker, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
@connect(({ match, loading }) => ({
  match,
  submitting: loading.effects['match/addMatchInfo'],
}))
@Form.create()
class matchForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
        examDate: values.examDate.format('YYYY-MM-DD'),
      };
      if (!err) {
        dispatch({
          type: 'match/addMatchInfo',
          payload: fieldsValue,
        });
      }
    });
  };

  render() {
    const {
      match: { data },
      submitting,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    if (data !== undefined && data.status === '1005') {
      return <Redirect to="/user/login" />;
    }
    if (data !== undefined && data.status === 'ok') {
      return <Redirect to="/match/matchList" />;
    }
    return (
      <PageHeaderWrapper title="添加学员">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="学员姓名">
              {getFieldDecorator('studentName', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员姓名',
                  },
                ],
              })(<Input placeholder="请输入学员姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="身份证">
              {getFieldDecorator('idCard', {
                rules: [
                  {
                    required: true,
                    message: '请输入身份证',
                  },
                ],
              })(<Input placeholder="请输入身份证" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="测评名称">
              {getFieldDecorator('worksName', {
                rules: [
                  {
                    required: true,
                    message: '请输入测评名称',
                  },
                ],
              })(<Input placeholder="请输入测评名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="证书编号">
              {getFieldDecorator('certificateNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入证书编号',
                  },
                ],
              })(<Input placeholder="请输入证书编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="专业">
              {getFieldDecorator('profession', {
                rules: [
                  {
                    required: true,
                    message: '请输入专业',
                  },
                ],
              })(<Input placeholder="请输入专业" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="考试级别">
              {getFieldDecorator('examinationLevel', {
                rules: [
                  {
                    required: true,
                    message: '请输入考试级别',
                  },
                ],
              })(<Input placeholder="请输入考试级别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所在地">
              {getFieldDecorator('nativePlace', {
                rules: [
                  {
                    required: true,
                    message: '请输入所在地',
                  },
                ],
              })(<Input placeholder="请输入所在地" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="考试时间">
              {getFieldDecorator('examDate', {
                rules: [
                  {
                    required: true,
                    message: '请输入考试时间',
                  },
                ],
              })(<DatePicker format="YYYY-MM-DD" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default matchForms;
