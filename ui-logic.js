async function registerNewNode() {
    const tunnel = document.getElementById('tunnel').value;
    const link = document.getElementById('nodeLink').value;
    if(!tunnel || !link) return alert("Isi URL Tunnel & Link Target!");
    
    await fetch(`${tunnel}/register?link=${link}`);
    document.getElementById('nodeLink').value = "";
    refresh();
}

async function refresh() {
    const tunnel = document.getElementById('tunnel').value;
    if(!tunnel) return;

    try {
        const res = await fetch(`${tunnel}/get-full-data`);
        const db = await res.json();
        document.getElementById('serv-status').innerText = "ONLINE";
        
        let html = "";
        for(let key in db.active_nodes) {
            let node = db.active_nodes[key];
            html += `
                <div class="card">
                    <h3>${key}</h3>
                    <p style="font-size:10px; color:#444;">${node.url}</p>
                    <div style="display:flex; gap:10px;">
                        <button class="btn" onclick="toggle('${key}', 'maintenance')">MT: ${node.maintenance ? 'ON' : 'OFF'}</button>
                        <button class="btn" style="background:#ef4444;" onclick="masterCmd('${key}', 'WIPE')">WIPE</button>
                    </div>
                </div>
            `;
        }
        document.getElementById('node-grid').innerHTML = html;
        document.getElementById('log-box').innerHTML = db.global_logs.join("<br>");
    } catch(e) {
        document.getElementById('serv-status').innerText = "DISCONNECTED";
    }
}
setInterval(refresh, 3000);

