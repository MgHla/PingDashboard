# PingCentral - Real-Time Connectivity Dashboard

**PingCentral** is a live network monitoring dashboard that displays real-time ping results from multiple hosts. It features a dynamic grid layout (1-6 columns), audio alerts on ping failures, and a WebSocket-powered backend for real-time updates.

![PingCentral Dashboard](https://github.com/MgHla/PingDashboard/blob/main/PingDashboard.PNG?raw=true)

## Features

- 🖥️ **Real-time ping monitoring** – Watch live ICMP responses from multiple hosts
- 📐 **Dynamic grid layout** – Switch between 1 to 6 columns for optimal viewing
- 🔊 **Audio alerts** – Hear audible notifications when ping errors occur (can be toggled on/off)
- 🎨 **Modern UI** – Dark theme with smooth animations and responsive design
- 🔄 **Auto-reconnect** – WebSocket automatically reconnects if connection drops


## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + WebSocket (`ws` library)
- **Protocol**: WebSocket for real-time bidirectional communication

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- A modern web browser (Chrome, Firefox, Edge, Safari)

## How to Run It
To run this backend, you just need Node.js installed on your machine.

 **1.** Download server.js, index.html, and  pinginfo.csv files.

 **2.** Open your terminal/command prompt inside your project folder.

 **3.** Initialize the environment and install the required websocket package by running:

```bash
npm install ws
```

 **4.** Start your dashboard backend:
```bash
Bash
node server.js
```

 **5.** Open your browser and navigate to: http://localhost:3000

 **Update Group, IPaddress, Description in pinginfo.csv file.**
