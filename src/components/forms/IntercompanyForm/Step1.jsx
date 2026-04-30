import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Divider } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function Step1() {
  return (
    <Row gutter={16}>
      {/* ---------------- ข้อมูลทั่วไปของสัญญา ---------------- */}
      <Col span={8}>
        <Form.Item name="copyType" label="ต้นฉบับ / คู่ฉบับ" rules={[{ required: true }]}>
          <Select placeholder="เลือกประเภทฉบับ">
            <Option value="ต้นฉบับ">ต้นฉบับ</Option>
            <Option value="คู่ฉบับ">คู่ฉบับ</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="contractDate" label="ระบุวันที่ทำสัญญา" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="countryLaw" label="จดทะเบียนภายใต้กฎหมายประเทศ" rules={[{ required: true }]}>
          <Input placeholder="เช่น ประเทศไทย" />
        </Form.Item>
      </Col>

      {/* ---------------- ส่วนที่ 1: ข้อมูลผู้ให้บริการ ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        ส่วนที่ 1: ข้อมูลผู้ให้บริการ
      </Divider>
      
      <Col span={12}>
        <Form.Item name="providerName" label="ชื่อผู้ให้บริการ" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อผู้ให้บริการ" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="providerContact" label="ชื่อบุคคลที่ติดต่อ" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อบุคคลที่ติดต่อ" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="providerAddress" label="ที่อยู่ผู้ให้บริการ" rules={[{ required: true }]}>
          <TextArea rows={2} placeholder="ระบุที่อยู่ผู้ให้บริการ" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="providerEmail" label="Email (ผู้ประสานงาน ฝ่ายผู้ให้บริการ)" rules={[{ required: true, type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }]}>
          <Input placeholder="ระบุอีเมลผู้ประสานงาน" />
        </Form.Item>
      </Col>

      {/* ---------------- ส่วนที่ 2: ข้อมูลผู้รับบริการ ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        ส่วนที่ 2: ข้อมูลผู้รับบริการ
      </Divider>

      <Col span={12}>
        <Form.Item name="receiverName" label="ชื่อผู้รับบริการ" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อผู้รับบริการ" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverContact" label="ชื่อบุคคลที่ติดต่อ" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อบุคคลที่ติดต่อ" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="receiverAddress" label="ที่อยู่ผู้รับบริการ" rules={[{ required: true }]}>
          <TextArea rows={2} placeholder="ระบุที่อยู่ผู้รับบริการ" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverEmail" label="Email (ผู้ประสานงาน ฝ่ายผู้รับบริการ)" rules={[{ required: true, type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }]}>
          <Input placeholder="ระบุอีเมลผู้ประสานงาน" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverBusiness" label="ระบุธุรกิจของผู้รับบริการ" rules={[{ required: true }]}>
          <Input placeholder="เช่น ธุรกิจพัฒนาซอฟต์แวร์" />
        </Form.Item>
      </Col>

      {/* ---------------- ข้อมูลบริการเบื้องต้น ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        ข้อมูลบริการเบื้องต้น
      </Divider>
      <Col span={24}>
        <Form.Item name="serviceBrief" label="บริการ (ระบุการให้บริการโดยย่อ)" rules={[{ required: true }]}>
          <TextArea rows={2} placeholder="อธิบายบริการสั้นๆ" />
        </Form.Item>
      </Col>
    </Row>
  );
}