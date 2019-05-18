import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Input, Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
@connect(({ news, loading }) => ({
  news,
  submitting: loading.effects['news/addNewsInfo'],
}))
@Form.create()
class NewsForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
      };
      if (!err) {
        dispatch({
          type: 'news/addNewsInfo',
          payload: fieldsValue,
        });
      }
    });
  };

  render() {
    const {
      news: { data },
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
      return <Redirect to="/news/newsList" />;
    }
    return (
      <PageHeaderWrapper title="新增新闻">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="新闻名称">
              {getFieldDecorator('newsTitle', {
                rules: [
                  {
                    required: true,
                    message: '请输入新闻名称',
                  },
                ],
              })(<Input placeholder="请输入新闻名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="跳转链接">
              {getFieldDecorator('newsUrl', {
                rules: [
                  {
                    required: true,
                    message: '请输入跳转链接',
                  },
                ],
              })(<Input placeholder="请输入跳转链接" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="缩略图地址(125*200) ">
              {getFieldDecorator('newsPic', {
                rules: [
                  {
                    required: true,
                    message: '请输入缩略图地址',
                  },
                ],
              })(<Input placeholder="请输入缩略图地址" />)}
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
export default NewsForms;
