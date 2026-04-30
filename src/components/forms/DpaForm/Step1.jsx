import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';

const { Option } = Select;

export default function Step1() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="discloserName" label="ชื่อคู่สัญญา (ผู้เปิดเผยข้อมูล)" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="contractorName" label="ชื่อคู่สัญญา" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="abbreviation" label="ชื่อย่อ" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="mainContract" label="สัญญาหรือบันทึกข้อตกลงหลัก" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="mainContractDate" label="ระบุวันที่ในข้อตกลงหลัก" rules={[{required: true}]}>
          <DatePicker style={{width:'100%'}} format="DD/MM/YYYY" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="mainContractAbbr" label="ชื่อย่อสัญญาหรือบันทึกข้อตกลงหลัก" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="processingNature" label="ลักษณะการประมวลผลข้อมูลส่วนบุคคล" rules={[{required: true}]}>
          <Select placeholder="เช่น มอบหมาย/แต่งตั้ง/ว่าจ้าง/อื่นๆ"><Option value="มอบหมาย">มอบหมาย</Option><Option value="แต่งตั้ง">แต่งตั้ง</Option><Option value="ว่าจ้าง">ว่าจ้าง</Option><Option value="อื่นๆ">อื่นๆ</Option></Select>
        </Form.Item>
      </Col>
    </Row>
  );
}