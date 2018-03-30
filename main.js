const electron = require('electron'); // Import electron module
const url = require('url'); // Import url module
const path = require('path'); // Import path module

const {app, BrowserWindow, Menu} = electron; // Grab app and BrowserWindow from electron

let mainWindow; // Create variable the mainWindow
let addWindow; // Create variable the addWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);
// Quit when all windows are closed.
app.on('window-all-closed', windowAllClosed);
app.on('activate', activeWindow);

function createMainWindow() {
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function() {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}

// Handle create add window
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // Garbage collection handler
    addWindow.on('close', function() {
        addWindow = null;
    });
}

function windowAllClosed() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
      }
}

function activeWindow() {
    // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
}

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// if mac, add empty object to menu
if (process.platform == 'darwin') {
    // unshift, inserting
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}