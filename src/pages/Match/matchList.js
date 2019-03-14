import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Card, Col, DatePicker, Form, Icon, Input, message, Modal, Row, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Redirect from 'umi/redirect';
import activityList from './match.less';

const FormItem = Form.Item;
// const getValue = obj =>
//   Object.keys(obj)
//     .map(key => obj[key])
//     .join(',');

@Form.create()
class UpdateMatchForm extends PureComponent {
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
        id: props.values.id,
        studentName: props.values.studentName,
        idCard: props.values.idCard,
        gender: props.values.gender,
        profession: props.values.profession,
        groupLevel: props.values.groupLevel,
        worksName: props.values.worksName,
        tutor: props.values.tutor,
        birthDate: props.values.birthDate,
      },
    };
  }

  handleSubmit = () => {
    const { form, handleUpdate } = this.props;
    const { formValues } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      const fieldsValue = {
        ...values,
        id: formValues.id,
        studentName: values.studentName,
        idCard: values.idCard,
        gender: values.gender,
        profession: values.profession,
        groupLevel: values.groupLevel,
        worksName: values.worksName,
        tutor: values.tutor,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
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
        title="修改图图鸟证书"
        onCancel={() => handleUpdateModalVisible(false, values)}
        // onOk={okHandle(this.handleSubmit)}
        onOk={this.handleSubmit}
        visible={updateModalVisible}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="学员姓名">
            {getFieldDecorator('studentName', {
              rules: [
                {
                  required: true,
                  message: '请输入学员姓名',
                },
              ],
              initialValue: formValues.studentName,
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
              initialValue: formValues.idCard,
            })(<Input placeholder="请输入身份证" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="性别">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请输入性别',
                },
              ],
              initialValue: formValues.gender,
            })(<Input placeholder="请输入性别" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="专业">
            {getFieldDecorator('profession', {
              rules: [
                {
                  required: true,
                  message: '请输入专业',
                },
              ],
              initialValue: formValues.profession,
            })(<Input placeholder="请输入专业" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="组别">
            {getFieldDecorator('groupLevel', {
              rules: [
                {
                  required: true,
                  message: '请输入组别',
                },
              ],
              initialValue: formValues.groupLevel,
            })(<Input placeholder="请输入组别" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="作品名称">
            {getFieldDecorator('worksName', {
              rules: [
                {
                  required: true,
                  message: '请输入作品名称',
                },
              ],
              initialValue: formValues.worksName,
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
              initialValue: formValues.tutor,
            })(<Input placeholder="请输入辅导老师" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="出生日期">
            {getFieldDecorator('birthDate', {
              rules: [
                {
                  required: true,
                  message: '请输入出生日期',
                },
              ],
              initialValue: moment(formValues.birthDate),
            })(<DatePicker format="YYYY-MM-DD" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ match, loading }) => ({
  match,
  loading: loading.models.match,
}))
@Form.create()
class MatchList extends PureComponent {
  state = {
    selectedRows: [],
    updateModalVisible: false,
    stepFormValues: {},
  };

  columns = [
    { title: '学员姓名', dataIndex: 'studentName', fixed: 'left' },
    { title: '身份证', dataIndex: 'idCard' },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
      width: 120,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    { title: '性别', dataIndex: 'gender' },
    { title: '专业', dataIndex: 'profession' },
    { title: '组别', dataIndex: 'groupLevel' },
    { title: '作品名称', dataIndex: 'worksName' },
    { title: '辅导老师', dataIndex: 'tutor' },
    { title: '获奖结果', dataIndex: 'results' },
    {
      title: '操作',
      fixed: 'right',
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
      type: 'match/queryMatchList',
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

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        pageIndex: 0,
        pageSize: 10,
        birthDate:
          fieldsValue.birthDate === undefined
            ? fieldsValue.birthDate
            : fieldsValue.birthDate.format('YYYY-MM-DD'),
      };
      //
      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'match/queryMatchList',
        payload: values,
      });
    });
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'match/updateMatchInfo',
      payload: {
        id: fields.id,
        studentName: fields.studentName,
        idCard: fields.idCard,
        gender: fields.gender,
        profession: fields.profession,
        groupLevel: fields.groupLevel,
        worksName: fields.worksName,
        tutor: fields.tutor,
        birthDate: fields.birthDate,
      },
      callback: data => {
        const { status } = data;
        if (status === '1005') {
          this.state.isLogin = true;
        } else {
          message.success('修改成功');
          dispatch({
            type: 'match/queryMatchList',
          });
        }
      },
    });
    this.handleUpdateModalVisible();
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    dispatch({
      type: 'match/queryMatchList',
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
            <FormItem label="学生姓名">
              {getFieldDecorator('studentName')(<Input placeholder="请输入学生姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证">
              {getFieldDecorator('idCard')(<Input placeholder="请输入身份证" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={activityList.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生姓名">
              {getFieldDecorator('studentName')(<Input placeholder="请输入学生姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证">
              {getFieldDecorator('idCard')(<Input placeholder="请输入身份证" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="专业">
              {getFieldDecorator('profession')(<Input placeholder="请输入专业" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="出生日期">
              {getFieldDecorator('birthDate')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入出生日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="组别">
              {getFieldDecorator('groupLevel')(<Input placeholder="请输入组别" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="辅导老师">
              {getFieldDecorator('tutor')(<Input placeholder="请输入辅导老师" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      match: { data },
      loading,
    } = this.props;
    const { list = [], pagination } = data;
    const { selectedRows, stepFormValues, updateModalVisible, isLogin } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
      onShowSizeChange: (pageIndex, pageSize) => {
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          const values = {
            ...fieldsValue,
            pageIndex: 0,
            pageSize,
            birthDate:
              fieldsValue.birthDate === undefined
                ? fieldsValue.birthDate
                : fieldsValue.birthDate.format('YYYY-MM-DD'),
          };
          dispatch({
            type: 'match/queryMatchList',
            payload: values,
          });
        });
      },
      onChange: (pageIndex, pageSize) => {
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          const values = {
            ...fieldsValue,
            pageIndex,
            pageSize,
            birthDate:
              fieldsValue.birthDate === undefined
                ? fieldsValue.birthDate
                : fieldsValue.birthDate.format('YYYY-MM-DD'),
          };
          dispatch({
            type: 'match/queryMatchList',
            payload: values,
          });
        });
      },
    };
    const updateMethods = {
      dispatch: this.dispatch,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    if (isLogin) {
      return <Redirect to="/user/login" />;
    }
    return (
      <PageHeaderWrapper title="结业学员列表">
        <Card bordered={false}>
          <div className={activityList.tableListForm}>{this.renderForm()}</div>
          <div className={activityList.tableList}>
            <Table
              selectedRows={selectedRows}
              loading={loading}
              dataSource={list}
              columns={this.columns}
              pagination={paginationProps}
              scroll={{ x: 1000 }}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateMatchForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default MatchList;
