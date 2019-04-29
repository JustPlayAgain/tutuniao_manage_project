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
        birthDate: values.birthDate.format('YYYY-MM-DD'),
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
            <FormItem {...formItemLayout} label="学员名称">
              {getFieldDecorator('studentName', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员名称',
                  },
                ],
              })(<Input placeholder="请输入学员名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员身份证">
              {getFieldDecorator('idCard', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员身份证',
                  },
                ],
              })(<Input placeholder="请输入学员身份证" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员出生日期">
              {getFieldDecorator('birthDate', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员出生日期',
                  },
                ],
              })(<DatePicker format="YYYY-MM-DD" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员性别">
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员性别',
                  },
                ],
              })(<Input placeholder="请输入学员性别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员专业">
              {getFieldDecorator('profession', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员专业',
                  },
                ],
              })(<Input placeholder="请输入学员专业" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员分别">
              {getFieldDecorator('groupLevel', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员分别',
                  },
                ],
              })(<Input placeholder="请输入学员分别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="作品名称">
              {getFieldDecorator('worksName', {
                rules: [
                  {
                    required: true,
                    message: '请输入作品名称',
                  },
                ],
              })(<Input placeholder="请输入作品名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="辅导老师">
              {getFieldDecorator('tutor', {
                rules: [
                  {
                    required: true,
                    message: '请输入辅导老师',
                  },
                ],
              })(<Input placeholder="请输入辅导老师" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="获奖结果">
              {getFieldDecorator('results', {
                rules: [
                  {
                    required: true,
                    message: '请输入获奖结果',
                  },
                ],
              })(<Input placeholder="请输入获奖结果" />)}
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
