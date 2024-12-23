const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "#020617",
            symbolColor: "#bbf7d0",
            height: 30,
        },
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Optional: preload script
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    mainWindow.loadURL("http://localhost:4321"); // Point to the Astro development server
    mainWindow.removeMenu();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
