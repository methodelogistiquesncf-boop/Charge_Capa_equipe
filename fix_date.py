import re
with open('index.html', 'r') as f:
    s = f.read()

old = r"function rhParseDate\(v\)\{.*?return isNaN\(d\)\?null:d; \}"
new = r"function rhParseDate(v){ if(v==null||v==='') return null; if(typeof v==='number'){ const d=new Date(Math.round((v-25569)*86400000)); return isNaN(d.getTime())?null:d; } const s=String(v).trim(); const m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/); if(m){ const d=new Date(+m[3], +m[2]-1, +m[1]); return isNaN(d.getTime())?null:d; } const m2=s.match(/^(\d{4})(\d{2})(\d{2})$/); if(m2){ const d=new Date(+m2[1], +m2[2]-1, +m2[3]); return isNaN(d.getTime())?null:d; } const d=new Date(s); return isNaN(d.getTime())?null:d; }"

s2 = re.sub(old, new, s, flags=re.DOTALL)
if s2 != s:
    with open('index.html', 'w') as f:
        f.write(s2)
    print("✅ Fonction rhParseDate remplacée avec succès")
else:
    print("❌ Fonction non trouvée")
