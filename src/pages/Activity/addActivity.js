import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Input, Card, DatePicker, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
@connect(({ activity, loading }) => ({
  activity,
  submitting: loading.effects['activity/addActivity'],
}))
@Form.create()
class ActivityForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
        activityDate: values.activityDate.format('YYYY-MM-DD'),
      };
      if (!err) {
        dispatch({
          type: 'activity/addActivity',
          payload: fieldsValue,
        });
      }
    });
  };

  render() {
    const {
      activity: { data },
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
      return <Redirect to="/activity/list" />;
    }
    return (
      <PageHeaderWrapper title="添加大赛和评测">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="比赛、测评名称">
              {getFieldDecorator('activityName', {
                rules: [
                  {
                    required: true,
                    message: '请输入比赛、测评名称',
                  },
                ],
              })(<Input placeholder="请输入比赛、测评名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="活动地点">
              {getFieldDecorator('activityCode', {
                rules: [
                  {
                    required: true,
                    message: '请输入活动地点',
                  },
                ],
              })(<Input placeholder="请输入活动地点" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="比赛、测评时间">
              {getFieldDecorator('activityDate', {
                rules: [
                  {
                    required: true,
                    message: '请输入比赛、测评时间',
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
export default ActivityForms;
