import { spawn } from "child_process";

export const prerender = false;

export async function GET() {
    return new Promise<Response>((resolve, reject) => {
        // use cmd to execute chcp 65001 and then twtxt
        const command = `cmd`;
        const args = ["/C", "chcp 65001 && twtxt timeline"];
        // i think these are windows only (except for twtxt) IDK!!

        const twtxt = spawn(command, args, {
          shell: true,
          env: { ...process.env, PYTHONIOENCODING: "utf-8" }, //ensure encoding is correct,,, python crashes out if it isn't ig?
        });

        let output = "";
        let errorOutput = "";

        twtxt.stdout.on("data", (data) => {
            output += data.toString("utf-8");
        });

        twtxt.stderr.on("data", (data) => {
            errorOutput += data.toString("utf-8");
        });

        //return the timeline! :)))))
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
