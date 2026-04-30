import React from 'react';
import { Form, Button, Space, Steps, Card, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

// ตรวจสอบ Path ให้ตรงกับโครงสร้างโฟลเดอร์ของคุณ
import { useStore } from '../../../store'; 
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import { generateWordFromTemplate } from '../../../utils/templateGenerator';

export default function DpaForm() {
  const { currentStep, setCurrentStep, reset } = useStore();
  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(['discloserName', 'contractorName', 'abbreviation', 'mainContract', 'mainContractDate', 'mainContractAbbr', 'processingNature']);
      } else if (currentStep === 1) {
        await form.validateFields(['personalDataTypes']);
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
    }
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleFinish = async () => {
    try {
      // 1. ดึงข้อมูลแบบบังคับเอามาจากทุกหน้า (true) เพื่อกันค่าหายตอนสลับหน้า Step
      const values = form.getFieldsValue(true);

      // 2. จัดเรียงข้อมูล และใส่ || "" เพื่อป้องกันค่า undefined ไปโผล่ใน Word ถ้าไม่ได้กรอก
      const dataToFill = {
        date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
        
        discloser: values.discloserName || "",          // แก้ให้ตรงกับ {discloser}
        contractor: values.contractorName || "",        // แก้ให้ตรงกับ {contractor}
        abbr: values.abbreviation || values.contractorName || "", // แก้ให้ตรงกับ {abbr}
        mainContract: values.mainContract || "",        // อันนี้ตรงอยู่แล้ว
        mainContractDate: values.mainContractDate ? values.mainContractDate.format('DD/MM/YYYY') : '',
        mainContractAbbr: values.mainContractAbbr || values.mainContract || "",
        processingNature: values.processingNature || "",
        purpose: values.purpose || "",
        
        // แก้ให้ตรงกับ {personalDataOptions} ใน Word ของคุณ
        // เปลี่ยนจากบรรทัดเดิม เป็นบรรทัดนี้ครับ:
personalDataOptions: Array.isArray(values.personalDataTypes) ? values.personalDataTypes.join(", ") : (values.personalDataTypes || "")
      };
      // 3. โยนข้อมูลเข้า Template
      await generateWordFromTemplate('dpa_template.docx', dataToFill, `DPA_${values.contractorName || 'Document'}`);
      
      message.success('สร้างเอกสาร Word เรียบร้อยแล้ว!');
      reset(); // รีเซ็ตหน้า Step กลับไปหน้าแรก
      form.resetFields(); // ล้างข้อมูลในฟอร์มเตรียมพร้อมสำหรับสร้างใบใหม่
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการสร้างเอกสาร: ' + error.message);
      console.error(error);
    }
  };

  const stepsItems = [
    { title: 'ข้อมูลสัญญา' }, 
    { title: 'ข้อมูลบุคคล' }, 
    { title: 'วัตถุประสงค์' }
  ];

  return (
    <Card title="แบบฟอร์มข้อมูล DPA">
      <Steps current={currentStep} items={stepsItems} style={{ marginBottom: 30 }} />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
          <Step1 />
        </div>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <Step2 />
        </div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <Step3 />
        </div>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            {currentStep > 0 && <Button onClick={handlePrev}>ย้อนกลับ</Button>}
            {currentStep < 2 ? (
              <Button type="primary" onClick={handleNext}>ถัดไป</Button>
            ) : (
              <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>สร้าง Word</Button>
            )}
          </Space>
        </div>
      </Form>
    </Card>
  );
}