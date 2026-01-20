const pdf = require('pdf-parse');

function extractEmail(text){
  const m = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return m ? m[0] : null;
}

function extractPhone(text){
  const m = text.match(/\+?\d[\d\s().-]{6,}\d/);
  return m ? m[0].trim() : null;
}

function extractPossibleSkills(text){
  // Simple heuristics: look for lines with common separators or comma lists near 'Skills'
  const lines = text.split(/\r?\n/);
  for(let i=0;i<lines.length;i++){
    if(/skills?/i.test(lines[i])){
      // next few lines may contain skill lists
      const block = lines.slice(i, i+6).join(' ');
      const items = block.split(/[,:;\n]/).slice(1).map(s=>s.trim()).filter(Boolean);
      if(items.length) return items;
    }
  }
  return [];
}

function extractSection(text, header){
  const rx = new RegExp('(^|\\n)\\s*' + header + '\\s*\\n','i');
  const idx = text.search(rx);
  if(idx === -1) return null;
  const rest = text.slice(idx + 0);
  // find next blank line sequence or next heading in all-caps
  const split = rest.split(/\n\s*\n/);
  if(split.length>1) return split[0].trim();
  return rest.trim();
}

function heuristicsSections(text){
  const sections = {};
  const headings = ['education','experience','work experience','skills','projects','summary','contact'];
  for(const h of headings){
    const sec = extractSection(text, h);
    if(sec) sections[h.replace(/\s+/g,'_')] = sec;
  }
  // fallback skill extraction
  if(!sections.skills){
    const s = extractPossibleSkills(text);
    if(s.length) sections.skills = s.join(', ');
  }
  return sections;
}

function extractExperienceStructured(text){
  // Prefer to extract from the Experience section if present to reduce false positives
  const expSectionMatch = text.match(/(^|\n)\s*(Experience|Work Experience|Professional Experience)\s*\n([\s\S]{0,2000})/i);
  const sectionText = expSectionMatch ? expSectionMatch[3] : text;
  const lines = sectionText.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const results = [];

  // date pattern examples: 'August 2019 - 2020', '2018', '2019–2020', 'Aug 2019 — Oct 2020'
  const dateRx = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*\d{4}(?:\s*[–-—]\s*(?:\d{4}|Present|present))?/i;

  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    // consider lines that contain a date range OR look like 'Title — Company' patterns
    if(dateRx.test(line) || /\bat\b|,|\u2014|\u2013| - |—/.test(lines[Math.max(0,i-1)])){
      // look back for title/company above
      let title = lines[i-1] || '';
      let company = '';
      // if title has a comma, split into title/company
      if(/,/.test(title)){
        const parts = title.split(/,|@/).map(s=>s.trim());
        title = parts[0];
        company = parts.slice(1).join(', ');
      } else {
        // maybe previous two lines contain role then company
        company = lines[i-2] || '';
      }

      // try extract dates from current line or nearby lines
      const m = (line.match(dateRx) || (lines[i-1] && lines[i-1].match(dateRx)) || (lines[i+1] && lines[i+1].match(dateRx)));
      let start = null, end = null;
      if(m){
        const parts = m[0].split(/[–-—]/).map(s=>s.trim());
        start = parts[0] || null;
        end = parts[1] || null;
      }

      // collect following bullet lines
      const details = [];
      for(let j=i+1;j<Math.min(i+8, lines.length); j++){
        const l = lines[j];
        if(/^[-•*\u2022]/.test(l) || /^\s{2,}/.test(l) ){
          details.push(l.replace(/^[-•*\u2022]\s*/, ''));
        } else if(/^[A-Z][A-Za-z\s]{1,60}$/.test(l)){
          // likely a new heading
          break;
        } else if(l.split(' ').length>3 && l.length<80 && /\.|\,/.test(l)){
          // could be continuation sentence; include
          details.push(l);
        } else if(details.length>0){
          // stop if we've already collected details and hit a non-detail line
          break;
        }
      }

      results.push({ title: title || null, company: company || null, start, end, details });
    }
  }

  return results;
}

async function parseBuffer(buffer){
  const data = await pdf(buffer);
  const text = data && data.text ? data.text : '';
  const contact = { email: extractEmail(text), phone: extractPhone(text) };
  const sections = heuristicsSections(text);
  const experience_structured = extractExperienceStructured(text);
  return { contact, sections, experience_structured, rawText: text };
}

module.exports = { extractEmail, extractPhone, extractSection, heuristicsSections, parseBuffer };
