const ctrl = require('./controller.js');

exports.handleRequest = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    if (url.pathname === '/get-full-data') return ctrl.getFullData(res);
    if (url.pathname === '/register') return ctrl.registerNode(url, res);
    if (url.pathname === '/toggle-feature') return ctrl.updateFeature(url, res);
    if (url.pathname === '/master-cmd') return ctrl.masterCommand(url, res);
    
    res.end("SYSTEM_READY");
};
