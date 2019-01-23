import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
// import { Button, Card, Form, Table } from 'antd';
import { Card, Form, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import activityList from './activityList.less';

/* eslint react/no-multi-comp:0 */
@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))
@Form.create()
class ActivityList extends PureComponent {
  state = {
    selectedRows: [],
    // modalVisible: false,
  };

  columns = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
    },
    {
      title: '活动Code',
      dataIndex: 'activityCode',
    },
    {
      title: '活动日期',
      dataIndex: 'activityDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '修改人',
      dataIndex: 'updateUser',
    },
    {
      title: '修改时间',
      dataIndex: 'updateDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/activityList',
    });
  }

  // handleModalVisible = flag => {
  //   this.setState({
  //     modalVisible: !!flag,
  //   });
  // };

  render() {
    const {
      activity: { data },
      loading,
    } = this.props;
    const { list = [], pagination } = data;
    const { selectedRows } = this.state;
    // const { selectedRows, modalVisible } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    // const parentMethods = {
    //   // handleAdd: this.handleAdd,
    //   handleModalVisible: this.handleModalVisible,
    // };
    // <div className={activityList.tableListOperator}>
    //  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
    //    新建
    //  </Button>
    // </div>
    return (
      <PageHeaderWrapper title="活动列表页">
        <Card bordered={false}>
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
      </PageHeaderWrapper>
    );
  }
}

export default ActivityList;
