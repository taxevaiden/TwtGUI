import { spawn } from "child_process";

export const prerender = false;

interface RequestData {
    tweet: string;
}

export async function POST({ request }: { request: Request }) {
    const { tweet }: RequestData = await request.json();

    if (!tweet || tweet.length === 0) {
        return new Response("Tweet can't be empty.", { status: 400 });
    }

    return new Promise<Response>((resolve) => {
        const command = "cmd"; // use "cmd" for Windows, or "sh" for macOS/Linux.
        const args = ["/C", `twtxt tweet "${tweet}"`];

        const tweetCommand = spawn(command, args, {
            shell: true,
            env: { ...process.env, PYTHONIOENCODING: "utf-8" },
        });

        let errorOutput = "";

        tweetCommand.stderr.on("data", (data) => {
            errorOutput += data.toString("utf-8");
        });

        tweetCommand.on("close", (code) => {
            if (code === 0) {
                resolve(
                    new Response("Tweet posted successfully!", { status: 200 })
                );
            } else {
                console.error("Error posting tweet:", errorOutput);
                resolve(new Response("Failed to post tweet.", { status: 500 }));
            }
        });

        tweetCommand.on("error", (err) => {
            console.error("Command execution error:", err);
            resolve(new Response("Internal server error.", { status: 500 }));
        });
    });
}
