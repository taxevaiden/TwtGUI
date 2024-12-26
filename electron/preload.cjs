const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    reloadWindow: () => ipcRenderer.send("reload-window"),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
});
