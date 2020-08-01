import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Button, Upload, Icon, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import guoMeiLess from './uploadMatch.less';

@connect(({ guoMei, loading }) => ({
  guoMei,
  submitting: loading.models.guoMei,
}))
@Form.create()
class GuoMeiUploadFile extends PureComponent {
  render() {
    const props = {
      name: 'file',
      action: 'http://182.92.64.160:8889/mxh/match/importMatchData',
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
            message.error(`${info.file.name} file upload failed.`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
          console.log(`${info.file.response.message}`);
        }
      },
    };
    return (
      <PageHeaderWrapper title="批量添加">
        <Card bordered={false}>
          <div className={guoMeiLess.div}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default GuoMeiUploadFile;
