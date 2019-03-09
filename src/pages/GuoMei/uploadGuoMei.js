import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Button, Upload, Icon, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import guoMeiLess from './uploadGuoMei.less';

@connect(({ guoMei, loading }) => ({
  guoMei,
  submitting: loading.models.guoMei,
}))
@Form.create()
class GuoMeiUploadFile extends PureComponent {
  render() {
    const props = {
      name: 'file',
      action: 'http://www.tutuniao.com:8008/tutuniao/guomei/importguomeidata',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
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
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default GuoMeiUploadFile;
