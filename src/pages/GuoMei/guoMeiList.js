import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import guoMeiLess from './guoMei.less';
import styles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
// const getValue = obj =>
//   Object.keys(obj)
//     .map(key => obj[key])
//     .join(',');

@Form.create()
class UpdateGuoMeiForm extends PureComponent {
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
        numberId: props.values.numberId,
        studentName: props.values.studentName,
        nationality: props.values.nationality,
        nation: props.values.nation,
        gender: props.values.gender,
        birthDate: props.values.birthDate,
        certificateNumber: props.values.certificateNumber,
        profession: props.values.profession,
        declareLevel: props.values.declareLevel,
        examinationLevel: props.values.examinationLevel,
        originalLevel: props.values.originalLevel,
        nativePlace: props.values.nativePlace,
        examDate: props.values.examDate,
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
        numberId: values.numberId,
        studentName: values.studentName,
        nationality: values.nationality,
        nation: values.nation,
        gender: values.gender,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
        certificateNumber: values.certificateNumber,
        profession: values.profession,
        declareLevel: values.declareLevel,
        examinationLevel: values.examinationLevel,
        originalLevel: values.originalLevel,
        nativePlace: values.nativePlace,
        examDate: values.examDate.format('YYYY-MM-DD'),
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
        title="修改国美"
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
          <FormItem {...formItemLayout} label="国籍">
            {getFieldDecorator('nationality', {
              rules: [
                {
                  required: true,
                  message: '请输入国籍',
                },
              ],
              initialValue: formValues.nationality,
            })(<Input placeholder="请输入国籍" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="民族">
            {getFieldDecorator('nation', {
              rules: [
                {
                  required: true,
                  message: '请输入民族',
                },
              ],
              initialValue: formValues.nation,
            })(<Input placeholder="请输入民族" />)}
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
          <FormItem {...formItemLayout} label="证书编号">
            {getFieldDecorator('certificateNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入证书编号',
                },
              ],
              initialValue: formValues.certificateNumber,
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
              initialValue: formValues.certificateNumber,
            })(<Input placeholder="请输入专业" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="申报级别">
            {getFieldDecorator('declareLevel', {
              rules: [
                {
                  required: true,
                  message: '请输入申报级别',
                },
              ],
              initialValue: formValues.declareLevel,
            })(<Input placeholder="请输入申报级别" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="考试级别">
            {getFieldDecorator('examinationLevel', {
              rules: [
                {
                  required: true,
                  message: '请输入考试级别',
                },
              ],
              initialValue: formValues.examinationLevel,
            })(<Input placeholder="请输入考试级别" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="原级别">
            {getFieldDecorator('originalLevel', {
              rules: [
                {
                  required: true,
                  message: '请输入原级别',
                },
              ],
              initialValue: formValues.originalLevel,
            })(<Input placeholder="请输入原级别" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="所在地">
            {getFieldDecorator('nativePlace', {
              rules: [
                {
                  required: true,
                  message: '请输入所在地',
                },
              ],
              initialValue: formValues.nativePlace,
            })(<Input placeholder="请输入所在地" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动时间">
            {getFieldDecorator('examDate', {
              rules: [
                {
                  required: true,
                  message: '请输入活动时间',
                },
              ],
              initialValue: moment(formValues.examDate),
            })(<DatePicker format="YYYY-MM-DD" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ guoMei, loading }) => ({
  guoMei,
  loading: loading.models.guoMei,
}))
@Form.create()
class GuoMeiList extends PureComponent {
  state = {
    selectedRows: [],
    updateModalVisible: false,
    stepFormValues: {},
  };

  columns = [
    { title: '学员姓名', dataIndex: 'studentName', key: 'name', fixed: 'left' },
    { title: '国籍', dataIndex: 'nationality' },
    { title: '民族', dataIndex: 'nation' },
    { title: '性别', dataIndex: 'gender' },
    { title: '证书编号', dataIndex: 'certificateNumber' },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
      width: 120,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    { title: '专业', dataIndex: 'profession' },
    { title: '申报级别', dataIndex: 'declareLevel' },
    { title: '考试级别', dataIndex: 'examinationLevel' },
    { title: '原级别', dataIndex: 'originalLevel' },
    { title: '所在地', dataIndex: 'nativePlace' },
    {
      title: '考试时间',
      dataIndex: 'examDate',
      width: 120,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
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
      type: 'guoMei/queryguoMeiList',
    });
  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'guoMei/updateGuoMeiInfo',
      payload: {
        id: fields.id,
        numberId: fields.numberId,
        studentName: fields.studentName,
        nationality: fields.nationality,
        nation: fields.nation,
        gender: fields.gender,
        birthDate: fields.birthDate,
        certificateNumber: fields.certificateNumber,
        profession: fields.profession,
        declareLevel: fields.declareLevel,
        examinationLevel: fields.examinationLevel,
        originalLevel: fields.originalLevel,
        nativePlace: fields.nativePlace,
        examDate: fields.examDate,
      },
      callback: data => {
        const { status } = data;

        if (status === '1005') {
          this.state.isLogin = true;
        } else {
          message.success('修改成功');
          dispatch({
            type: 'guoMei/queryguoMeiList',
          });
        }
      },
    });

    // message.success('修改成功');
    this.handleUpdateModalVisible();
    // window.history.go(0);
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
      type: 'rule/fetch',
      payload: {},
    });
  };

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
        type: 'guoMei/queryguoMeiList',
        payload: values,
      });
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
            <FormItem label="证书编号">
              {getFieldDecorator('certificateNumber')(<Input placeholder="请输入证书编号" />)}
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
            <FormItem label="证书编号">
              {getFieldDecorator('certificateNumber')(<Input placeholder="请输入证书编号" />)}
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
            <FormItem label="申报级别">
              {getFieldDecorator('declareLevel')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">级别1</Option>
                  <Option value="1">级别2</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="民族">
              {getFieldDecorator('nation')(<Input placeholder="请输入民族" />)}
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
      guoMei: { data },
      loading,
    } = this.props;
    const { list = [], pagination } = data;
    const { selectedRows, stepFormValues, updateModalVisible } = this.state;
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
            type: 'guoMei/queryguoMeiList',
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
            type: 'guoMei/queryguoMeiList',
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
    return (
      <PageHeaderWrapper title="国美学院列表页">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={guoMeiLess.tableList}>
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
          <UpdateGuoMeiForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default GuoMeiList;
