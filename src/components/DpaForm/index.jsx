import React from 'react';
import { Form, Button, Space, Steps, Card, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useStore } from '../../store';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { generateDpaWord } from '../../utils/documentGenerator';

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

  const handleFinish = async (values) => {
    try {
      await generateDpaWord(values);
      message.success('สร้างเอกสาร Word เรียบร้อยแล้ว!');
      reset(); // กลับไปหน้าแรกหลังทำรายการเสร็จ
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการสร้างเอกสาร');
      console.error(error);
    }
  };

  const stepsItems = [{ title: 'ข้อมูลสัญญา' }, { title: 'ข้อมูลบุคคล' }, { title: 'วัตถุประสงค์' }];

  return (
    <Card title="แบบฟอร์มข้อมูล DPA">
      <Steps current={currentStep} items={stepsItems} style={{ marginBottom: 30 }} />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}><Step1 /></div>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}><Step2 /></div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}><Step3 /></div>

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