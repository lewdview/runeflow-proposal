import PptxGenJS from 'pptxgenjs';

(async () => {
  const pptx = new PptxGenJS();
  pptx.author = 'RuneFlow';
  pptx.company = 'RuneFlow';
  pptx.title = 'RuneFlow ROI Analysis';
  pptx.subject = 'ROI Projections by Service Tier — Baked & Non-Baked';
  pptx.layout = 'LAYOUT_16x9';

  const baked = '00C389', nonbaked = 'FF6B6B';
  const cats = ['LSRS','CMS','FSGS'];

  // Slide 1: Title
  let s1 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s1.addImage({ path: '/Volumes/extremeUno/runeflow-redesigned/slides/assets/title.png', x:0, y:0, w:10, h:5.625 });

  const chartOpts = (title) => ({
    x:0.5, y:0.9, w:9.0, h:4.6,
    title,
    valAxisTitle: 'Value',
    catAxisTitle: 'Category',
    chartColors: [nonbaked, baked],
    dataLabelFormatCode: '0',
    showLegend: true,
    legendPos: 'b',
    fontFace: 'Arial',
    showValue: true,
    dataLabelColor: '000000',
  });

  // Slide 2: ROI weeks by tier
  let s2 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s2.addText('ROI (Weeks) by Tier', { x:0.5, y:0.3, w:9.0, fontSize:24, bold:true, color:'000000', fontFace:'Arial' });
  // Use pre-rendered PNG charts for Google Slides compatibility
  s2.addImage({ path: '/Volumes/extremeUno/runeflow-redesigned/slides/assets/roi_weeks.png', x:0.5, y:0.9, w:9.0, h:4.6 });

  // Slide 3: Monthly savings
  let s3 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s3.addText('Monthly Savings by Tier ($/mo)', { x:0.5, y:0.3, w:9.0, fontSize:24, bold:true, color:'000000', fontFace:'Arial' });
  s3.addImage({ path: '/Volumes/extremeUno/runeflow-redesigned/slides/assets/savings.png', x:0.5, y:0.9, w:9.0, h:4.6 });

  // Slide 4: Payback week by system variant
  let s4 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s4.addText('Payback Week by System Variant', { x:0.5, y:0.3, w:9.0, fontSize:24, bold:true, color:'000000', fontFace:'Arial' });
  s4.addImage({ path: '/Volumes/extremeUno/runeflow-redesigned/slides/assets/payback.png', x:0.5, y:0.9, w:9.0, h:4.6 });

  // Slide 5: ROI comparison (text for maximum compatibility)
  let s5 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s5.addText('ROI Comparison', { x:0.5, y:0.3, w:9.0, fontSize:24, bold:true, color:'000000', fontFace:'Arial' });
  const tableText = [
    'System Type             | Setup + Monthly     | ROI (Weeks)',
    'LSRS Non-Baked          | $1,800              | 5',
    'LSRS Baked              | $3,200 + $450/mo    | 6',
    'CMS Non-Baked           | $1,800              | 7',
    'CMS Baked               | $3,500 + $500/mo    | 8',
    'FSGS Non-Baked          | $2,800              | 6',
    'FSGS Baked              | $5,500 + $800/mo    | 7'
  ].join('\n');
  s5.addText(tableText, { x:0.6, y:1.0, w:8.8, h:3.8, fontSize:16, color:'000000', fontFace:'Courier New' });

  // Slide 6: Key takeaways
  let s6 = pptx.addSlide({ bkgd: 'FFFFFF' });
  s6.addImage({ path: '/Volumes/extremeUno/runeflow-redesigned/slides/assets/takeaways.png', x:0, y:0, w:10, h:5.625 });

  const outPath = new URL('./runeflow-roi.pptx', import.meta.url).pathname;
  await pptx.writeFile({ fileName: outPath });
  console.log(`Wrote ${outPath}`);
})();
