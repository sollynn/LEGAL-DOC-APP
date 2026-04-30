import DpaForm from '../components/forms/DpaForm';
import IntercompanyForm from '../components/forms/IntercompanyForm';
// อนาคตถ้ามีฟอร์มอื่นก็ import มา เช่น:
// import NdaForm from '../components/forms/NdaForm';

export const FORM_LIST = [
  {
    id: 'dpa',
    title: 'ข้อตกลงการประมวลผลข้อมูลส่วนบุคคล (DPA)',
    description: 'สำหรับทำสัญญาคุ้มครองข้อมูลส่วนบุคคล (PDPA) ระหว่างผู้ว่าจ้างและผู้รับจ้าง',
    component: DpaForm, // ผูกหน้าจอเข้ากับชื่อนี้
  },
  {
    id: 'intercompany',
    title: 'สัญญามาตรฐานระหว่างกลุ่มนทลิน',
    description: 'สัญญามาตรฐานระหว่างกลุ่มนทลิน',
    component: IntercompanyForm, // ถ้ายังทำหน้าจอไม่เสร็จ ให้ใส่ null ไว้ก่อน ปุ่มจะกดไม่ได้อัตโนมัติ
  },
  // เพิ่มฟอร์มที่ 3, 4, 5... ไปได้เรื่อยๆ เลยครับ
];