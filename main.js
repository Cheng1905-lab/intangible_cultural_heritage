const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// 保持对窗口对象的全局引用，避免被自动垃圾回收
let mainWindow

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'images/icon-512.png'),
        webPreferences: {
            nodeIntegration: false, // 为了安全，建议设为 false
            contextIsolation: true,
            enableRemoteModule: false
        },
        autoHideMenuBar: true, // 自动隐藏菜单栏，让应用看起来更像“软件”
        titleBarStyle: 'hiddenInset' // 更现代的标题栏样式（Mac效果更好）
    })

    // 加载你的网页首页
    // 使用 file:// 协议加载本地文件
    const startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl)

    // 打开开发者工具（开发阶段用，发布时可以注释掉）
    // mainWindow.webContents.openDevTools()

    // 窗口关闭时触发
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// Electron 初始化完成后创建窗口
app.whenReady().then(createWindow)

// 所有窗口关闭时退出应用（Windows 和 Linux）
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 在 macOS 上，点击 Dock 图标时重新创建窗口
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})