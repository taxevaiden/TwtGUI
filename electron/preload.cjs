const { contextBridge, ipcRenderer, app } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    getVersion: () => app.getVersion(),
});
