import { spawn } from "child_process";

export const prerender = false;

export async function GET() {
    return new Promise<Response>((resolve, reject) => {
        const isWindows = process.platform === "win32"; // check if we're on windows or not

        // if on windows use cmd. if on macOS/Linux use sh.
        const command = isWindows ? "cmd" : "sh";
        const args = isWindows
            ? ["/C", "chcp 65001 && twtxt timeline"]
            : ["-c", "twtxt timeline"];
        // if on windows, set encoding to UTF-8 `chcp 65001` and view timeline. otherwise just view timeline.

        const twtxt = spawn(command, args, {
            shell: isWindows, // use shell on windows to handle cmd
            env: { ...process.env, PYTHONIOENCODING: "utf-8" },
            // ensure encoding is correct,,, python crashes out if it isn't ig?
        });

        let output = "";
        let errorOutput = "";

        twtxt.stdout.on("data", (data) => {
            output += data.toString("utf-8");
        });

        // capture stderr
        twtxt.stderr.on("data", (data) => {
            errorOutput += data.toString("utf-8");
        });

        // return the timeline! :)))))
        twtxt.on("close", (code) => {
            if (code === 0) {
                resolve(
                    new Response(output, {
                        status: 200,
                        headers: { "Content-Type": "text/plain" },
                    })
                );
            } else {
                console.error("Error executing command:", errorOutput);
                resolve(
                    new Response("Error fetching timeline", {
                        status: 500,
                    })
                );
            }
        });

        // handle error
        twtxt.on("error", (err) => {
            console.error("Failed to start command:", err);
            reject(
                new Response("Internal server error", {
                    status: 500,
                })
            );
        });
    });
}
