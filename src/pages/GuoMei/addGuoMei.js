import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Input, Card, DatePicker, Button, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ list }) => ({
  list,
}))
@connect(({ guoMei, loading }) => ({
  guoMei,
  submitting: loading.effects['guoMei/addGuoMeiInfo'],
}))
@Form.create()
class GuoMeiForms extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/activityLists',
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
        examDate: values.examDate.format('YYYY-MM-DD'),
      };
      if (!err) {
        dispatch({
          type: 'guoMei/addGuoMeiInfo',
          payload: fieldsValue,
        });
      }
    });
  };

  render() {
    const {
      list: { list },
      guoMei: { data },
      submitting,
      form,
    } = this.props;
    const FormItem = Form.Item;
    const { Option } = Select;
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
    const children = [];
    for (let i = 0; i < list.length; i += 1) {
      children.push(
        <Option key={i} value={list[i].id}>
          {list[i].activityName}
        </Option>
      );
    }
    if (data !== undefined && data.status === '1005') {
      return <Redirect to="/user/login" />;
    }
    if (data !== undefined && data.status === 'ok') {
      return <Redirect to="/guoMei/guoMeiList" />;
    }
    return (
      <PageHeaderWrapper title="添加国美学员">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="测评/活动名称">
              {getFieldDecorator('actId', {
                rules: [{ required: true, message: '请选择测评/活动' }],
              })(<Select placeholder="请选择测评/活动">{children}</Select>)}
            </FormItem>
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
            <FormItem {...formItemLayout} label="学员国籍">
              {getFieldDecorator('nationality', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员国籍',
                  },
                ],
              })(<Input placeholder="请输入学员国籍" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员民族">
              {getFieldDecorator('nation', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员民族',
                  },
                ],
              })(<Input placeholder="请输入学员民族" />)}
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

            <FormItem {...formItemLayout} label="学员证书编号">
              {getFieldDecorator('certificateNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员证书编号',
                  },
                ],
              })(<Input placeholder="请输入学员证书编号" />)}
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
            <FormItem {...formItemLayout} label="学员申报级别">
              {getFieldDecorator('declareLevel', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员申报级别',
                  },
                ],
              })(<Input placeholder="请输入学员申报级别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员考试级别">
              {getFieldDecorator('examinationLevel', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员考试级别',
                  },
                ],
              })(<Input placeholder="请输入学员考试级别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员原级别">
              {getFieldDecorator('originalLevel', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员原级别',
                  },
                ],
              })(<Input placeholder="请输入学员原级别" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员所在地">
              {getFieldDecorator('nativePlace', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员所在地',
                  },
                ],
              })(<Input placeholder="请输入学员所在地" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学员考试时间">
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
export default GuoMeiForms;
