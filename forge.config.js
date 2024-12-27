import { fileURLToPath } from "node:url";
import path from "node:path";

import dotenv from "dotenv";
dotenv.config();

import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsPath = path.resolve(__dirname, "assets", "icons");

export default {
    packagerConfig: {
        name: "twtGUI",
        executableName: "twtGUI",
        asar: true,
        icon: path.resolve(iconsPath, "icon"),
    },
    rebuildConfig: {},
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "taxevaiden",
                    name: "twtGUI",
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
            platforms: ["win32", "darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {},
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
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
