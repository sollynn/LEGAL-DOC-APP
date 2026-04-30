import React from 'react';
import { Form, Checkbox, Row, Col } from 'antd';
import { personalDataOptions } from '../../../constants/dpaData';

export default function Step2() {
  return (
    <Form.Item name="personalDataTypes" label="ประเภทข้อมูลส่วนบุคคล" rules={[{required: true}]}>
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          {personalDataOptions.map(opt => (
            <Col span={8} key={opt} style={{ marginBottom: 8 }}>
              <Checkbox value={opt}>{opt}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
}