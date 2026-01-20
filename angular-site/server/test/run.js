const fs = require('fs').promises;
const path = require('path');
const { parseBuffer } = require('../parse');

async function run(){
  const resumePath = process.env.RESUME_PATH || path.join(__dirname, '..', '..', 'src', 'assets', 'resume.pdf');
  try{
    const data = await fs.readFile(resumePath);
    const parsed = await parseBuffer(data);
    console.log('Parsed contact:', parsed.contact);
    console.log('Detected sections:', Object.keys(parsed.sections || {}));
    console.log('Structured experience items:', parsed.experience_structured || []);
    process.exit(0);
  }catch(err){
    console.error('Test failed:', err);
    process.exit(2);
  }
}

run();
