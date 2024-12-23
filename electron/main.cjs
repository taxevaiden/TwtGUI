const { ipcMain, app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

async function createWindow() {
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
            preload: path.join(__dirname, "preload.cjs"), // Optional: preload script
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
        // load dev server URL
        mainWindow.loadURL("http://localhost:8080");
    } else {
        // serve the built Astro SSR app
        try {
            const server = await import("../dist/server/entry.mjs");

            if (!server || typeof server.startServer !== "function") {
                throw new Error(
                    "startServer is not a function or missing in the entry file."
                );
            }

            const { server: serverDetails } = await server.startServer();
            const url = `http://${serverDetails.host}:${serverDetails.port}`;
            console.log(url);
            mainWindow.loadURL(url);
        } catch (error) {
            console.error("Failed to start the server or load the URL:", error);
            app.quit(); // exit the app if the server fails to start
        }
    }

    // mainWindow.removeMenu();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on("reload-window", (event) => {
        try {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.reload();
            } else {
                console.error("Main window is not available or destroyed.");
            }
        } catch (error) {
            console.error("Error while reloading the window:", error);
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
