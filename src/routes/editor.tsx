"use client";
import { createFileRoute } from "@tanstack/react-router";
import { WebContainer } from "../webcontainerapi";
import { useEffect } from "react";
import "@xterm/xterm/css/xterm.css";
import type { Terminal } from "@xterm/xterm";
/** @type {import('@webcontainer/api').FileSystemTree} */
const files = {
  "package.json": {
    file: {
      contents: `
        {
          "name": "vite-starter",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
  "index.html": {
    file: {
      contents: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vite + React</title>
          <script type="module" src="/src/main.jsx"></script>
        </head>
        <body>
          <div id="app"></div>
        </body>
        </html>
      `,
    },
  },
};

function EditorPage() {
  // async function fetchNoCors(url: string, options = {}) {
  //   return Newfetch;
  // }
  // (window as any).fetch = fetchNoCors;
  async function startShell(
    terminal: Terminal,
    webcontainerInstance: WebContainer
  ) {
    const shellProcess = await webcontainerInstance.spawn("jsh", {
      terminal: {
        cols: terminal.cols,
        rows: terminal.rows,
      },
    });
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
      input.write(data);
    });

    return shellProcess;
  }
  useEffect(() => {
    async function runWebContainer() {
      const terminalEl = document.getElementById("terminal")!;
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      const terminal = new Terminal({
        convertEol: true,
      });
      const fitAddon = new FitAddon();
      terminal.open(terminalEl);
      terminal.loadAddon(fitAddon);
      document.addEventListener("resize", () => {
        fitAddon.fit();
      });
      fitAddon.fit();
      const container = await WebContainer.boot();
      (window as any).container = container;
      console.log(container);
      container.mount(files);
      startShell(terminal, container);
    }
    runWebContainer();
  }, []);
  return (
    <div>
      <div id="terminal"></div>
    </div>
  );
}

export const Route = createFileRoute("/editor")({
  component: EditorPage,
  ssr: false,
});
