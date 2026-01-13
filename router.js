const { getFullData, updateFeature, masterCommand } = require('./controller.js');

exports.handleRequest = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    if (url.pathname === '/get-full-data') return getFullData(res);
    if (url.pathname === '/toggle-feature') return updateFeature(url, res);
    if (url.pathname === '/master-cmd') return masterCommand(url, res);
    
    res.end("404_CORE_NOT_FOUND");
};
