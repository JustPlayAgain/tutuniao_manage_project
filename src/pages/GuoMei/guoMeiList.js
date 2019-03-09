import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, DatePicker, Form, Input, message, Modal, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import guoMeiLess from './guoMei.less';

const FormItem = Form.Item;

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
    {
      title: '学员姓名',
      dataIndex: 'studentName',
    },
    {
      title: '国籍',
      dataIndex: 'nationality',
    },
    {
      title: '民族',
      dataIndex: 'nation',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
    },
    {
      title: '出生日期',
      sorter: true,
      dataIndex: 'birthDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '专业',
      dataIndex: 'profession',
    },
    {
      title: '申报级别',
      dataIndex: 'declareLevel',
    },
    {
      title: '考试级别',
      dataIndex: 'examinationLevel',
    },
    {
      title: '原级别',
      dataIndex: 'originalLevel',
    },
    {
      title: '所在地',
      dataIndex: 'nativePlace',
    },
    {
      title: '考试时间',
      dataIndex: 'examDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
        </Fragment>
      ),
      width: 200,
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
    };
    const updateMethods = {
      dispatch: this.dispatch,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="活动列表页">
        <Card bordered={false}>
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
