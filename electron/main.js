import { app, BrowserWindow } from "electron";

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 760,
    minWidth: 420,
    minHeight: 560,
    title: "KSJ Nexus",
    backgroundColor: "#050811",
  });

  if (isDev) {
    win.loadURL("http://localhost:5173/KSJNexus/");
  } else {
    win.loadFile("dist/index.html");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});