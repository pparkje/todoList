import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 로컬 html 파일 로드 (electron 폴더 안에 index.html 있어야 함)
  // win.loadFile(path.join(__dirname, 'index.html'));
  win.loadURL('http://localhost:3000');

  // 개발용: 개발자 도구 자동 실행
  win.webContents.openDevTools();
}

// 앱 준비되면 창 생성
app.whenReady().then(() => {
  createWindow();

  // macOS용: dock 클릭 시 창 없으면 새로 생성
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 모든 창 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});