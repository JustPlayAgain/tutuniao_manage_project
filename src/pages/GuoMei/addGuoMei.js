import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Input, Card, Button, Select } from 'antd';
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
      <PageHeaderWrapper title="添加学员">
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
            <FormItem {...formItemLayout} label="大赛名称">
              {getFieldDecorator('worksName', {
                rules: [
                  {
                    required: true,
                    message: '请输入大赛名称',
                  },
                ],
              })(<Input placeholder="请输入大赛名称" />)}
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
export default GuoMeiForms;
