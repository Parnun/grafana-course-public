module.exports = {
  pdf_options: {
    format: 'A4',
    margin: {
      top: '2cm',
      right: '1.5cm',
      bottom: '2.5cm',
      left: '1.5cm',
    },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="
        font-size: 9px;
        font-family: Arial, sans-serif;
        color: #444;
        width: 100%;
        text-align: center;
        padding: 0 1.5cm;
        border-top: 1px solid #ccc;
        padding-top: 4px;
        box-sizing: border-box;
      ">
        Tel: 083-071-3373, Email: training@nextflow.in.th<br>
        All right reserved, Amaround Co., Ltd.
      </div>
    `,
    printBackground: true,
  },
  stylesheet: [],
  highlight_style: 'github',
};
