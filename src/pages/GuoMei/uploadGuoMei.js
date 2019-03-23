import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Button, Upload, Icon, Card, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import guoMeiLess from './uploadGuoMei.less';

@connect(({ list }) => ({
  list,
}))
@connect(({ guoMei, loading }) => ({
  guoMei,
  submitting: loading.models.guoMei,
}))
@Form.create()
class GuoMeiUploadFile extends PureComponent {
  state = {
    actId: '',
    uploadModalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/activityLists',
    });
  }

  handleChangeActId = e => {
    this.setState({
      actId: e,
    });
    this.handleUploadModalVisible(true);
  };

  handleUploadModalVisible = flag => {
    this.setState({
      uploadModalVisible: !!flag,
    });
  };

  render() {
    const {
      list: { list },
      form,
    } = this.props;
    const { uploadModalVisible, actId } = this.state;
    const FormItem = Form.Item;
    const { Option } = Select;
    const { getFieldDecorator } = form;
    const children = [];
    for (let i = 0; i < list.length; i += 1) {
      children.push(
        <Option key={i} value={list[i].id}>
          {list[i].activityName}
        </Option>
      );
    }
    const props = {
      name: 'file',
      action: `http://39.106.123.79:8008/mxh/guomei/importguomeidata?actId=${actId}`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response.data.status === 'ok') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else {
            message.error(
              `${info.file.name} file upload failed. ${info.file.response.data.message}`
            );
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
          console.log(`${info.file.response.message}`);
        }
      },
    };
    return (
      <PageHeaderWrapper title="批量添加国美学院">
        <Card bordered={false}>
          <div className={guoMeiLess.div}>
            <Form>
              <FormItem label="比赛、测评名称">
                {getFieldDecorator('actId', {
                  rules: [{ required: true, message: '请选择比赛、测评' }],
                })(
                  <Select
                    placeholder="请选择比赛、测评"
                    defaultValue=""
                    value={actId}
                    onChange={this.handleChangeActId}
                  >
                    {children}
                  </Select>
                )}
              </FormItem>
            </Form>
            {uploadModalVisible ? (
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            ) : null}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default GuoMeiUploadFile;
