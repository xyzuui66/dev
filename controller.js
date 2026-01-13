const fs = require('fs');
let db = { active_nodes: {}, global_logs: [] };

exports.getFullData = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
};

exports.registerNode = (url, res) => {
    const targetLink = url.searchParams.get('link');
    const name = new URL(targetLink).hostname;
    
    if (!db.active_nodes[name]) {
        db.active_nodes[name] = {
            url: targetLink,
            status: "CONNECTED",
            maintenance: false,
            firewall: true,
            last_ping: new Date().getTime()
        };
        db.global_logs.unshift(`[NEW NODE] ${name} terhubung ke Master Core.`);
    }
    res.end("NODE_REGISTERED");
};

exports.updateFeature = (url, res) => {
    const target = url.searchParams.get('target');
    const feature = url.searchParams.get('feature');
    if(db.active_nodes[target]) {
        db.active_nodes[target][feature] = !db.active_nodes[target][feature];
        db.global_logs.unshift(`[ACTION] ${feature} pada ${target} diubah.`);
    }
    res.end("OK");
};

