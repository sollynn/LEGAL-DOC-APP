import React from 'react';
import { Form, Radio, Row, Col } from 'antd';

export default function Step3() {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item name="companyGroup" label="ประเภทบริษัท" rules={[{ required: true, message: 'กรุณาเลือกประเภทบริษัท' }]}>
          <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Radio value="กลุ่มบริษัทนทลิน">
              ตัวเลือกที่ 1: กลุ่มบริษัทนทลิน
            </Radio>
            <Radio value="ไม่ใช่ Arm's Length">
              ตัวเลือกที่ 2: ไม่ใช่ Arm's Length
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}