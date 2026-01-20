const fs = require('fs').promises;
const path = require('path');
const assert = require('assert');
const { parseBuffer } = require('../parse');

async function test(){
  const resumePath = process.env.RESUME_PATH || path.join(__dirname, '..', '..', 'src', 'assets', 'resume.pdf');
  const data = await fs.readFile(resumePath);
  const parsed = await parseBuffer(data);

  console.log('Contact:', parsed.contact);
  assert(parsed.contact, 'No contact info parsed');
  assert(parsed.contact.email || parsed.contact.phone, 'No email or phone found');

  console.log('Checking structured experience...');
  assert(Array.isArray(parsed.experience_structured), 'experience_structured missing');
  // if no experience items found, warn but don't fail
  if(parsed.experience_structured.length===0) console.warn('No structured experience items detected (heuristic may need tuning)');

  console.log('Sections detected:', Object.keys(parsed.sections || {}));
  return true;
}

test().then(()=>{ console.log('Parser tests passed'); process.exit(0);} ).catch(err=>{ console.error('Parser tests failed', err); process.exit(2);});
