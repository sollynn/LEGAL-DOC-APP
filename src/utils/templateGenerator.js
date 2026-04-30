import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateWordFromTemplate = async (templateName, data, outputFileName) => {
  // 1. เติม ?t=... เข้าไปเพื่อหลอกให้เบราว์เซอร์โหลดไฟล์ Word ฉบับใหม่ล่าสุดเสมอ (แก้ปัญหา Cache)
  const response = await fetch(`/${templateName}?t=${new Date().getTime()}`);
  if (!response.ok) {
    throw new Error(`ไม่พบไฟล์ Template: ${templateName}`);
  }
    
  const content = await response.arrayBuffer();
  const zip = new PizZip(content);
  
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    // 2. พระเอกของเรา: ถ้าหาตัวแปรไม่เจอ หรือลืมกรอก ให้พิมพ์ "ช่องว่าง" แทนคำว่า "undefined"
    nullGetter: function(part) {
      return ""; 
    }
  });

  doc.render(data);

  const out = doc.getZip().generate({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
    
  saveAs(out, `${outputFileName}.docx`);
};