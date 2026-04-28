import {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  LevelFormat, ShadingType
} from "docx";
import { saveAs } from "file-saver";
import { message } from "antd";

export const generateDpaWord = async (values) => {
  try {
    const today = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

    const discloser      = values.discloserName    || "บริษัท ทรูธ มารีไทม์ เซอร์วิสเซส จำกัด";
    const contractor     = values.contractorName   || "บริษัท จัดหางาน บีเอสซี แมเนจเม้นท์ จำกัด";
    const abbr           = values.abbreviation     || contractor;
    const mainContract   = values.mainContract     || "SERVICE AGREEMENT (Maning Management Service )";
    const mainContractDate = values.mainContractDate
      ? values.mainContractDate.format('DD/MM/YYYY')
      : 'ฉบับล่าสุดที่ยังมีผลบังคับใช้';
    const mainContractAbbr  = values.mainContractAbbr  || mainContract;
    const processingNature  = values.processingNature  || "ว่าจ้างและแต่งตั้ง";
    const purpose           = values.purpose           || "";
    const personalDataString = values.personalDataTypes?.join(", ") || "";

    // ── helpers ──────────────────────────────────────────────────────────────

    /** ตัวหนา */
    const b  = (text) => new TextRun({ text, bold: true });
    /** ปกติ */
    const t  = (text) => new TextRun(text);
    /** บรรทัดว่าง */
    const blank = () => new Paragraph({ children: [new TextRun("")] });

    /**
     * bullet item  – NUM(id=3,lvl=0) firstLine=360
     */
    const bulletPara = (children) =>
      new Paragraph({
        numbering: { reference: "mainBullets", level: 0 },
        children,
      });

    /**
     * sub-bullet  – NUM(id=5,lvl=0)  ไม่มี indent พิเศษ
     */
    const subBulletPara = (children) =>
      new Paragraph({
        numbering: { reference: "subBullets", level: 0 },
        children,
      });

    /**
     * continuation paragraph ที่ไม่มี bullet แต่มี firstLine indent
     */
    const continuationPara = (children, firstLine = 360) =>
      new Paragraph({
        indent: { firstLine },
        children,
      });

    // ── ตาราง bordered ────────────────────────────────────────────────────────
    const borderSingle = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
    const cellBorders  = {
      top: borderSingle, bottom: borderSingle,
      left: borderSingle, right: borderSingle,
    };

    const singleCellTable = (text, bold = true) =>
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [9026],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 9026, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: bold
                      ? [new TextRun({ text, bold: true })]
                      : [new TextRun(text)],
                  }),
                ],
              }),
            ],
          }),
        ],
      });

    // ── ตารางลงนาม (ไม่มีเส้นขอบ) ────────────────────────────────────────────
    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const noBorders = {
      top: noBorder, bottom: noBorder,
      left: noBorder, right: noBorder,
      insideH: noBorder, insideV: noBorder,
    };

    const sigCell = (lines) =>
      new TableCell({
        borders: noBorders,
        width: { size: 4513, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: lines.map((l) =>
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(l)] })
        ),
      });

    // ── Document ─────────────────────────────────────────────────────────────
    const doc = new Document({
      numbering: {
        config: [
          {
            // เปลี่ยนกระสุนหลัก เป็นตัวเลข (1., 2., 3.)
            reference: "mainBullets",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL, // กำหนดเป็นตัวเลข
                text: "%1.",                 // แสดงผลเป็น 1., 2., 3.
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 360, hanging: 360 },
                  },
                },
              },
            ],
          },
          {
            // กระสุนย่อย (รายละเอียดการละเมิด ข้อ 12) คงไว้เป็น "-"
            reference: "subBullets",
            levels: [
              {
                level: 0,
                format: LevelFormat.BULLET,
                text: "-",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 720, hanging: 360 },
                  },
                },
              },
            ],
          },
        ],
      },

      styles: {
        default: {
          document: {
            run: { font: "TH Sarabun PSK", size: 32 },
            paragraph: { spacing: { line: 276, after: 120 } },
          },
        },
      },

      sections: [
        {
          properties: {
            page: {
              size: { width: 11906, height: 16838 },
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
          },

          children: [
            // ── หัวเรื่อง ──────────────────────────────────────────────────
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "ข้อตกลงการประมวลผลข้อมูลส่วนบุคคล", bold: false })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [b(`(${mainContract}`)],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [t("ระหว่าง")],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [t(`${discloser} กับ ${contractor}`)],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [t("---------------------------------")],
            }),

            // ── ย่อหน้าที่ 1 ──────────────────────────────────────────────
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
                t('ข้อตกลงการประมวลผลข้อมูลส่วนบุคคล ("ข้อตกลง") ฉบับนี้ทำขึ้น เมื่อวันที่ '),
                b(today),
               t(' ณ '),
                b(discloser),
              ],
            }),

            // ── ย่อหน้าที่ 2 ──────────────────────────────────────────────
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
               t('โดยที่ '),
                b(discloser),
                t(` ซึ่งต่อไปในข้อตกลงฉบับนี้เรียกว่า "บริษัทฯ" ฝ่ายหนึ่ง ได้ตกลงใน `),
                b(mainContract),
               t(' '),
                b(mainContractDate),
                t(` ซึ่งต่อไปในข้อตกลงฉบับนี้เรียกว่า "`),
                b(mainContractAbbr),
                t(`" กับ `),
                b(contractor),
                t(` ซึ่งต่อไปในข้อตกลงฉบับนี้เรียกว่า "`),
                b(abbr),
                t(`" อีกฝ่ายหนึ่ง`),
              ],
            }),

            // ── ย่อหน้าที่ 3 ──────────────────────────────────────────────
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
               t('บริษัทฯ ในฐานะผู้ควบคุมข้อมูลส่วนบุคคลเป็นผู้มีอำนาจตัดสินใจ กำหนดรูปแบบและกำหนดวัตถุประสงค์ในการประมวลผลข้อมูลส่วนบุคคล ได้ '),
                b(processingNature),
               t(' ให้ '),
                b(abbr),
               t(' ในฐานะผู้ประมวลผลข้อมูลส่วนบุคคล ดำเนินการเพื่อวัตถุประสงค์ดังต่อไปนี้'),
              ],
            }),

            // ── ตารางวัตถุประสงค์ ────────────────────────────────────────
            singleCellTable(purpose, true),

            // ── ย่อหน้าที่ 5 ──────────────────────────────────────────────
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
               t('โดยข้อมูลส่วนบุคคลที่ บริษัทฯ '),
                b(processingNature),
               t(' ให้ '),
                b(abbr),
               t(' ประมวลผล ประกอบด้วย'),
              ],
            }),

            // ── ตารางประเภทข้อมูล ────────────────────────────────────────
            singleCellTable(personalDataString, true),

            // ── ย่อหน้าปิดก่อนรายการ ───────────────────────────────────
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
               t('ด้วยเหตุนี้ ทั้งสองฝ่ายจึงตกลงจัดทำข้อตกลงฉบับนี้ และให้ถือข้อตกลงฉบับนี้เป็นส่วนหนึ่งของ '),
                b(mainContractAbbr),
               t(' เพื่อเป็นหลักฐานการควบคุมดูแลการประมวลผลข้อมูลส่วนบุคคลที่ บริษัทฯ มอบหมายหรือแต่งตั้งให้ '),
                b(abbr),
               t(' ดำเนินการ อันเนื่องมาจากการดำเนินการตามหน้าที่และความรับผิดชอบตาม '),
                b(mainContractAbbr),
               t(' ฉบับลงวันที่ '),
                b(mainContractDate),
                t(' และเพื่อดำเนินการให้เป็นไปตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 และกฎหมายอื่น ๆ ที่ออกตามความในพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ซึ่งต่อไปในข้อตกลงฉบับนี้ รวมเรียกว่า "กฎหมายคุ้มครองข้อมูลส่วนบุคคล" ทั้งที่มีผลใช้บังคับอยู่ ณ วันทำข้อตกลงฉบับนี้และที่จะมีการเพิ่มเติมหรือแก้ไขเปลี่ยนแปลงในภายหลัง โดยมีรายละเอียดดังนี้'),
              ],
            }),

            // ── ข้อ 1 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' รับทราบว่า ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลธรรมดาซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม โดย '),
              b(abbr),
             t(' จะดำเนินการตามที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลกำหนด เพื่อคุ้มครองให้การประมวลผลข้อมูลส่วนบุคคลเป็นไปอย่างเหมาะสมและถูกต้องตามกฎหมาย'),
            ]),

            // ── ข้อ 2 (continuation) ─────────────────────
            continuationPara([
             t('โดยในการดำเนินการตามข้อตกลงนี้ '),
              b(abbr),
             t(' จะประมวลผลข้อมูลส่วนบุคคลเมื่อได้รับคำสั่งที่เป็นลายลักษณ์อักษรจาก บริษัทฯ แล้วเท่านั้น ทั้งนี้ เพื่อให้ปราศจากข้อสงสัย การดำเนินการประมวลผลข้อมูลส่วนบุคคลโดย '),
              b(abbr),
             t(' ตามหน้าที่และความรับผิดชอบตาม'),
              b(mainContractAbbr),
             t(' ถือเป็นการได้รับคำสั่งที่เป็นลายลักษณ์อักษรจาก บริษัทฯ แล้ว'),
            ]),

            // ── ข้อ 3 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' จะกำหนดให้การเข้าถึงข้อมูลส่วนบุคคลภายใต้ข้อตกลงฉบับนี้ถูกจำกัดเฉพาะเจ้าหน้าที่ และ/หรือลูกจ้าง ตัวแทนหรือบุคคลใด ๆ ที่ได้รับมอบหมาย มีหน้าที่เกี่ยวข้องหรือมีความจำเป็นในการเข้าถึงข้อมูลส่วนบุคคลภายใต้ข้อตกลงฉบับนี้เท่านั้น และจะดำเนินการเพื่อให้พนักงาน และ/หรือลูกจ้าง ตัวแทนหรือบุคคลใด ๆ ที่ได้รับมอบหมายจาก '),
              b(abbr),
             t(' ทำการประมวลผลและรักษาความลับของข้อมูลส่วนบุคคลด้วยมาตรฐานเดียวกัน'),
            ]),

            // ── ข้อ 4 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' จะควบคุมดูแลให้เจ้าหน้าที่ และ/หรือลูกจ้าง ตัวแทนหรือบุคคลใด ๆ ที่ปฏิบัติหน้าที่ในการประมวลผลข้อมูลส่วนบุคคล ปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลอย่างเคร่งครัด และดำเนินการประมวลผลข้อมูลส่วนบุคคลตามวัตถุประสงค์ของการดำเนินการตามข้อตกลงฉบับนี้เท่านั้น โดยจะไม่ทำซ้ำ คัดลอก ทำสำเนา บันทึกภาพข้อมูลส่วนบุคคลไม่ว่าทั้งหมดหรือแต่บางส่วนเป็นอันขาด เว้นแต่เป็นไปตามเงื่อนไขของบันทึกความร่วมมือหรือสัญญา หรือกฎหมายที่เกี่ยวข้องจะระบุหรือบัญญัติไว้เป็นประการอื่น'),
            ]),

            // ── ข้อ 5 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' จะดำเนินการเพื่อช่วยเหลือหรือสนับสนุน บริษัทฯ ในการตอบสนองต่อคำร้องที่เจ้าของข้อมูลส่วนบุคคลแจ้งต่อ บริษัทฯ อันเป็นการใช้สิทธิของเจ้าของข้อมูลส่วนบุคคลตามกฏหมายคุ้มครองข้อมูลส่วนบุคคลในส่วนที่เกี่ยวข้องกับการประมวลผลข้อมูลส่วนบุคคลในขอบเขตของข้อตกลงฉบับนี้'),
            ]),

            // ── ข้อ 6 (continuation) ─────────────────────
            continuationPara([
             t('อย่างไรก็ดี ในกรณีที่เจ้าของข้อมูลส่วนบุคคลยื่นคำร้องขอใช้สิทธิดังกล่าวต่อ '),
              b(abbr),
             t(' โดยตรง '),
              b(abbr),
             t('จะดำเนินการแจ้งและส่งคำร้องดังกล่าวให้แก่ บริษัทฯ ทันที โดย '),
              b(abbr),
             t(' จะไม่เป็นผู้ตอบสนองต่อคำร้องดังกล่าว เว้นแต่ บริษัทฯ จะได้มอบหมายให้ '),
              b(abbr),
             t(' ดำเนินการเฉพาะเรื่องที่เกี่ยวข้องกับคำร้องดังกล่าว'),
            ], 567),

            // ── ข้อ 7 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' จะจัดทำและเก็บรักษาบันทึกรายการของกิจกรรมการประมวลผลข้อมูลส่วนบุคคล (Record of Processing) ทั้งหมดที่ '),
              b(abbr),
             t(' ประมวลผลในขอบเขตของข้อตกลงฉบับนี้ และจะดำเนินการส่งมอบบันทึกรายการดังกล่าวให้แก่ บริษัทฯ ทุก 1 ปี และ/หรือทันทีที่ บริษัทฯ ร้องขอ'),
            ]),

            // ── ข้อ 8 ────────────────────────────────────────────
            bulletPara([
              b(abbr),
             t(' จะจัดให้มีและคงไว้ซึ่งมาตรการรักษาความปลอดภัยสำหรับการประมวลผลข้อมูลที่มีความเหมาะสมทั้งในเชิงองค์กรและเชิงเทคนิคตามที่คณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้ประกาศกำหนดและ/หรือตามมาตรฐานสากล โดยคำนึงถึงลักษณะ ขอบเขต และวัตถุประสงค์ของการประมวลผลข้อมูลตามที่กำหนดในข้อตกลงฉบับนี้เป็นสำคัญ เพื่อคุ้มครองข้อมูลส่วนบุคคลจากความเสี่ยงอันเกี่ยวเนื่องกับการประมวลผลข้อมูลส่วนบุคคล เช่น ความเสียหายอันเกิดจากการละเมิด อุบัติเหตุ การลบ ทำลาย สูญหาย เปลี่ยนแปลง แก้ไข เข้าถึง ใช้ เปิดเผยหรือโอนข้อมูลส่วนบุคคลโดยไม่ชอบด้วยกฎหมาย เป็นต้น'),
            ]),

            // ── ข้อ 9 ────────────────────────────────────────────
            bulletPara([
             t('เว้นแต่กฎหมายที่เกี่ยวข้องจะบัญญัติไว้เป็นประการอื่น '),
              b(abbr),
             t(' จะทำการลบหรือทำลายข้อมูลส่วนบุคคลที่ทำการประมวลผลภายใต้ข้อตกลงฉบับนี้ภายใน 30 วัน นับแต่วันที่ดำเนินการประมวลผลเสร็จสิ้น หรือวันที่ บริษัทฯ และ '),
              b(abbr),
             t(' ได้ตกลงเป็นลายลักษณ์อักษรให้ยกเลิกตามที่ระบุใน '),
              b(mainContractAbbr),
             t(' แล้วแต่กรณีใดจะเกิดขึ้นก่อน'),
            ]),

            // ── ข้อ 10 (continuation) ────────────────────
            continuationPara([
             t('นอกจากนี้ ในกรณีปรากฎว่า '),
              b(abbr),
             t(' หมดความจำเป็นจะต้องเก็บรักษาข้อมูลส่วนบุคคลตามข้อตกลงฉบับนี้ก่อนสิ้นระยะเวลาตามวรรคหนึ่ง '),
              b(abbr),
             t(' จะทำการลบหรือทำลายข้อมูลส่วนบุคคลตามข้อตกลงฉบับนี้ทันที'),
            ]),

            // ── ข้อ 11 ───────────────────────────────────────────
            bulletPara([
             t('กรณีที่ '),
              b(abbr),
             t(' พบพฤติการณ์ใด ๆ ที่มีลักษณะที่กระทบต่อการรักษาความปลอดภัยของข้อมูลส่วนบุคคลที่ '),
              b(abbr),
             t('ประมวลผลภายใต้ข้อตกลงฉบับนี้ ซึ่งอาจก่อให้เกิดความเสียหายจากการละเมิด อุบัติเหตุ การลบ ทำลาย สูญหาย เปลี่ยนแปลง แก้ไข เข้าถึง ใช้ เปิดเผยหรือโอนข้อมูลส่วนบุคคลโดยไม่ชอบด้วยกฎหมาย แล้ว '),
              b(abbr),
             t(' จะดำเนินการแจ้งให้ บริษัทฯ ทราบโดยทันทีภายในเวลาภายใน 24 ชั่วโมง'),
            ]),

            // ── ข้อ 12 ───────────────────────────────────────────
            bulletPara([
             t('การแจ้งถึงเหตุการละเมิดข้อมูลส่วนบุคคลที่เกิดขึ้นภายใต้ข้อตกลงนี้ '),
              b(abbr),
             t(' จะใช้มาตรการตามที่เห็นสมควรในการระบุถึงสาเหตุของการละเมิด และป้องกันปัญหาดังกล่าวมิให้เกิดซ้ำ และจะให้ข้อมูลแก่ บริษัทฯ ภายใต้ขอบเขตที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลได้กำหนด ดังต่อไปนี้'),
            ]),

            // sub-bullets (ข้อ 12 รายละเอียด)
            subBulletPara([t("รายละเอียดของลักษณะและผลกระทบที่อาจเกิดขึ้นของการละเมิด")]),
            subBulletPara([t("มาตรการที่ถูกใช้เพื่อลดผลกระทบของการละเมิด")]),
            subBulletPara([t("ประเภทของข้อมูลส่วนบุคคลและเจ้าของข้อมูลส่วนบุคคลที่ถูกละเมิด หากมีปรากฎ")]),
            subBulletPara([t("ข้อมูลอื่น ๆ เกี่ยวข้องกับการละเมิด")]),

            // ── ข้อ 13 ───────────────────────────────────────────
            bulletPara([
             t('หน้าที่และความรับผิดของ '),
              b(abbr),
             t(' ในการปฏิบัติตามข้อตกลงจะสิ้นสุดลงนับแต่วันที่ปฏิบัติงานที่ตกลงเสร็จสิ้น หรือ วันที่ '),
              b(abbr),
             t(' และ บริษัทฯ ได้ตกลงเป็นลายลักษณ์อักษรให้ยกเลิก '),
              b(mainContractAbbr),
             t('แล้วแต่กรณีใดจะเกิดขึ้นก่อน อย่างไรก็ดี การสิ้นผลลงของข้อตกลงนี้ ไม่กระทบต่อหน้าที่ของ '),
              b(abbr),
             t(' ในการลบหรือทำลายข้อมูลส่วนบุคคลตามที่ได้กำหนดในข้อ 7 ของข้อตกลงฉบับนี้'),
            ]),

            // ── ปิดท้าย ───────────────────────────────────────────────────
            blank(),
            new Paragraph({
              indent: { firstLine: 720 },
              children: [
               t('ทั้งสองฝ่ายได้อ่านและเข้าใจข้อความโดยละเอียดตลอดแล้ว เพื่อเป็นหลักฐานแห่งการนี้ ทั้งสองฝ่ายจึงได้ลงนามไว้เป็นหลักฐานต่อหน้าพยาน ณ วัน เดือน ปี ที่ระบุข้างต้น'),
              ],
            }),
            blank(),

            // ── ตารางลงนาม ────────────────────────────────────────────────
            new Table({
              width: { size: 9026, type: WidthType.DXA },
              columnWidths: [4513, 4513],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: noBorders,
                      width: { size: 4513, type: WidthType.DXA },
                      margins: { top: 80, bottom: 80, left: 120, right: 120 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: discloser, bold: true })],
                        }),
                      ],
                    }),
                    new TableCell({
                      borders: noBorders,
                      width: { size: 4513, type: WidthType.DXA },
                      margins: { top: 80, bottom: 80, left: 120, right: 120 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: contractor, bold: true })],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    sigCell([
                      "",
                      "ลงชื่อ …….……………….........................……….... (     )",
                      "ลงชื่อ …….……………….........................……….... (     )",
                      "ลงชื่อ ………….…...............…………..………........... พยาน (     )",
                    ]),
                    sigCell([
                      "",
                      "ลงชื่อ …….……………….........................……….... (     )",
                      "ลงชื่อ …….……………….........................……….... (     )",
                      "ลงชื่อ ………….….................………….……........... พยาน (     )",
                    ]),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `DPA_${contractor}.docx`);
    message.success('สร้างเอกสาร Word เรียบร้อยแล้ว!');
  } catch (error) {
    message.error('เกิดข้อผิดพลาดในการสร้างไฟล์เอกสาร');
    console.error(error);
  }
};