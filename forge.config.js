import { fileURLToPath } from 'node:url';
import { resolve } from "node:path";

import dotenv from 'dotenv';
dotenv.config();

import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsPath = resolve(__dirname, "assets", "icons");

export default {
    packagerConfig: {
        name: "twtGUI",
        executableName: "twtGUI",
        asar: true,
        icon: resolve(iconsPath, "icon"),
    },
    rebuildConfig: {},
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "taxevaiden",
                    name: "twtGUI",
                    generateReleaseNotes: true,
                },
                prerelease: true,
                draft: true,
                authToken: process.env.GITHUB_TOKEN,
            },
        },
    ],
    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: ["win32", "darwin"], // create ZIP files for both Windows and macOS
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}, // for Linux (debian-based)
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}, // for Linux (red gat-based)
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {}, // unpack native modules automatically
        },
        {
            name: "@electron-forge/plugin-fuses",
            config: {
                version: FuseVersion.V1,
                setFuses: {
                    [FuseV1Options.RunAsNode]: false,
                    [FuseV1Options.EnableCookieEncryption]: true,
                    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
                    [FuseV1Options.EnableNodeCliInspectArguments]: false,
                    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
                    [FuseV1Options.OnlyLoadAppFromAsar]: true,
                },
            },
        },
    ],
};
