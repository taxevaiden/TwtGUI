const { app, BrowserWindow } = require("electron");
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
            preload: path.join(__dirname, "preload.js"), // Optional: preload script
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
        // Load your dev server URL
        mainWindow.loadURL("http://localhost:8080");
    } else {
        // Serve the built Astro SSR app
        try {
            const server = await import("../dist/server/entry.mjs"); // Adjust the path if needed

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
            app.quit(); // Exit the app if the server fails to start
        }
    }

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
