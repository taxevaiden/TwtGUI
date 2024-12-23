const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    reloadWindow: () => ipcRenderer.send("reload-window"),
});
