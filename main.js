const electron = require('electron'); // Import electron module
const url = require('url'); // Import url module
const path = require('path'); // Import path module

const {app, BrowserWindow} = electron; // Grab app and BrowserWindow from electron

let mainWindow; // Create variable the mainWindow

// Listen for app to be ready
app.on('ready', function (){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
});

