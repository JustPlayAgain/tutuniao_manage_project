import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import activityList from './news.less';
import styles from '../List/TableList.less';

const FormItem = Form.Item;

// const getValue = obj =>
//   Object.keys(obj)
//     .map(key => obj[key])
//     .join(',');

@Form.create()
class UpdateActivityForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
    currentStep: 0,
    confirmModalVisible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        activityId: props.values.id,
        activityName: props.values.activityName,
        activityCode: props.values.activityCode,
        activityDate: props.values.activityDate,
      },
    };
  }

  handleSubmit = () => {
    const { form, handleUpdate } = this.props;
    const { formValues } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
        activityId: formValues.activityId,
        activityDate: values.activityDate.format('YYYY-MM-DD'),
      };
      if (!err) {
        handleUpdate(fieldsValue);
      }
    });
  };

  render() {
    const { form, updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;
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
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="修改活动"
        onCancel={() => handleUpdateModalVisible(false, values)}
        // onOk={okHandle(this.handleSubmit)}
        onOk={this.handleSubmit}
        visible={updateModalVisible}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="学员姓名">
            {getFieldDecorator('activityName', {
              rules: [
                {
                  required: true,
                  message: '请输入活动名称',
                },
              ],
              initialValue: formValues.activityName,
            })(<Input placeholder="请输入活动名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动Code">
            {getFieldDecorator('activityCode', {
              rules: [
                {
                  required: true,
                  message: '请输入活动Code',
                },
              ],
              initialValue: formValues.activityCode,
            })(<Input placeholder="请输入活动Code" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动时间">
            {getFieldDecorator('activityDate', {
              rules: [
                {
                  required: true,
                  message: '请输入活动时间',
                },
              ],
              initialValue: moment(formValues.activityDate),
            })(<DatePicker format="YYYY-MM-DD" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ news, loading }) => ({
  news,
  loading: loading.models.news,
}))
@Form.create()
class NewsList extends PureComponent {
  state = {
    selectedRows: [],
    updateModalVisible: false,
    stepFormValues: {},
  };

  columns = [
    {
      title: '活动名称',
      dataIndex: 'newsTitle',
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '修改人',
      dataIndex: 'updateUser',
    },
    {
      title: '修改时间',
      sorter: true,
      dataIndex: 'updateDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
        </Fragment>
      ),
    },
  ];

  // 生命周期函数 在进行reder渲染前 请求接口渲染数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'news/queryNewsList',
    });
  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  // handleStandardTableChange = (pagination, filtersArg, sorter) => {
  //   const { dispatch } = this.props;
  //   const { formValues } = this.state;
  //
  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     newObj[key] = getValue(filtersArg[key]);
  //     return newObj;
  //   }, {});
  //
  //   const params = {
  //     currentPage: pagination.current,
  //     pageSize: pagination.pageSize,
  //     ...formValues,
  //     ...filters,
  //   };
  //   if (sorter.field) {
  //     params.sorter = `${sorter.field}_${sorter.order}`;
  //   }
  //
  //   dispatch({
  //     type: 'activity/activityList',
  //     payload: params,
  //   });
  // };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/updateActivity',
      payload: {
        id: fields.activityId,
        activityName: fields.activityName,
        activityCode: fields.activityCode,
        activityDate: fields.activityDate,
      },
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();
    window.history.go(0);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="文章名称">
              {getFieldDecorator('newsTitle')(<Input placeholder="请输入文章名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createDate')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入创建时间" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      news: { data },
      loading,
    } = this.props;
    const { list = [], pagination } = data;
    const { selectedRows, stepFormValues, updateModalVisible } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const updateMethods = {
      dispatch: this.dispatch,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="新闻列表页">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={activityList.tableList}>
            <Table
              selectedRows={selectedRows}
              loading={loading}
              dataSource={list}
              columns={this.columns}
              pagination={paginationProps}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateActivityForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default NewsList;
