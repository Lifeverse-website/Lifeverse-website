const storageKey = 'lifeverse_portal_data_v1';
const defaultData = {
  projects: [
    {name:'LifeVerse RP', owner:'Founder', status:'Planning', priority:'High', notes:'Gameplay systems, economy, roadmap, content publishing.'},
    {name:'LifeCoin (LFC)', owner:'Founder', status:'In Progress', priority:'High', notes:'Blockchain, wallet, exchange readiness, public docs.'},
    {name:'Lifetime', owner:'Founder', status:'Planning', priority:'Medium', notes:'Products, drops, catalog, digital-to-physical bridge.'}
  ],
  tasks: [
    {title:'Publish official company website', assignee:'Founder', due:'2026-03-30', state:'Open'},
    {title:'Prepare document library', assignee:'Content Team', due:'2026-04-05', state:'Open'}
  ],
  records: [
    {type:'Legal', title:'Company profile archive', date:'2026-03-21', ref:'LVT-LEGAL-001'},
    {type:'Technical', title:'LifeCoin whitepaper source', date:'2026-03-21', ref:'LFC-TECH-001'}
  ],
  integrations: [
    {name:'Website repository', status:'Active', note:'GitHub Pages live deployment.'},
    {name:'Custom domain', status:'Pending', note:'Add when domain is purchased.'}
  ]
};
function loadData(){
  try { return JSON.parse(localStorage.getItem(storageKey)) || structuredClone(defaultData); }
  catch(e){ return structuredClone(defaultData); }
}
function saveData(data){ localStorage.setItem(storageKey, JSON.stringify(data)); }
function exportData(){
  const blob = new Blob([JSON.stringify(loadData(), null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lifeverse-portal-backup.json';
  a.click();
}
function importData(file){
  const reader = new FileReader();
  reader.onload = () => {
    try { saveData(JSON.parse(reader.result)); location.reload(); }
    catch(e){ alert('Backup file is invalid.'); }
  };
  reader.readAsText(file);
}
function resetData(){ if(confirm('Reset portal data to the starter backup?')){ saveData(structuredClone(defaultData)); location.reload(); } }
function renderTable(elId, rows, cols){
  const el = document.getElementById(elId); if(!el) return;
  const thead = `<tr>${cols.map(c=>`<th>${c.label}</th>`).join('')}</tr>`;
  const tbody = rows.map(r=>`<tr>${cols.map(c=>`<td>${r[c.key] ?? ''}</td>`).join('')}</tr>`).join('');
  el.innerHTML = `<table class="table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
}
window.addEventListener('DOMContentLoaded', ()=>{
  const data = loadData();
  renderTable('projectsTable', data.projects, [
    {key:'name',label:'Project'},{key:'owner',label:'Owner'},{key:'status',label:'Status'},{key:'priority',label:'Priority'},{key:'notes',label:'Notes'}
  ]);
  renderTable('tasksTable', data.tasks, [
    {key:'title',label:'Task'},{key:'assignee',label:'Assignee'},{key:'due',label:'Due'},{key:'state',label:'State'}
  ]);
  renderTable('recordsTable', data.records, [
    {key:'type',label:'Type'},{key:'title',label:'Title'},{key:'date',label:'Date'},{key:'ref',label:'Reference'}
  ]);
  renderTable('integrationsTable', data.integrations, [
    {key:'name',label:'Integration'},{key:'status',label:'Status'},{key:'note',label:'Note'}
  ]);
  const projectForm = document.getElementById('projectForm');
  if(projectForm){
    projectForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(projectForm);
      data.projects.unshift(Object.fromEntries(fd.entries()));
      saveData(data); location.reload();
    });
  }
  const taskForm = document.getElementById('taskForm');
  if(taskForm){
    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(taskForm);
      data.tasks.unshift(Object.fromEntries(fd.entries()));
      saveData(data); location.reload();
    });
  }
  const recordForm = document.getElementById('recordForm');
  if(recordForm){
    recordForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(recordForm);
      data.records.unshift(Object.fromEntries(fd.entries()));
      saveData(data); location.reload();
    });
  }
  const integrationForm = document.getElementById('integrationForm');
  if(integrationForm){
    integrationForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(integrationForm);
      data.integrations.unshift(Object.fromEntries(fd.entries()));
      saveData(data); location.reload();
    });
  }
  const exportBtn = document.getElementById('exportBackup'); if(exportBtn) exportBtn.onclick = exportData;
  const resetBtn = document.getElementById('resetData'); if(resetBtn) resetBtn.onclick = resetData;
  const importInput = document.getElementById('importBackup'); if(importInput) importInput.onchange = e => importData(e.target.files[0]);
});
