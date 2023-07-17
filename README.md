<h1 align="center">VCluster</h1>

<p align="center">
A React + Tauri App as visualizer of apps cluster on windows.
</p>

<p align="center">
  <a href="#"><img alt="vcluster" src="https://img.shields.io/badge/VCluster-beta--0.0.1-green.svg"></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/license-GPL3-green.svg"></a>
  <a href="#"><img alt="platform" src="https://img.shields.io/badge/platform-windows-blue.svg"></a>
  <a href="#"><img alt="NodeJS" src="https://img.shields.io/badge/NodeJS-16.17+-black.svg"></a>
  <a href="#"><img alt="Rust" src="https://img.shields.io/badge/Rust-1.70-black.svg"></a>
</p>
<p align="center">
  <a href="#"><img alt="React" src="https://img.shields.io/badge/React-18-%23005fff.svg"/></a>
  <a href="#"><img alt="Redux" src="https://img.shields.io/badge/Redux-8.1-%23005fff.svg"></a>
  <a href="#"><img alt="Tauri" src="https://img.shields.io/badge/Tauri-1.4-%23005fff.svg"></a>
  <a href="#"><img alt="Mui" src="https://img.shields.io/badge/Mui-5.13-%23005fff.svg"></a>
  <a href="#"><img alt="Rbatis" src="https://img.shields.io/badge/Rbatis-4.3-%23005fff.svg"></a>
</p>

<p align="center">
  <img alt="overview" src="https://evan-oss-bucket1.oss-cn-hangzhou.aliyuncs.com/vcluster/overview.png" />
</p>
<p align="center">
  <img alt="create" src="https://evan-oss-bucket1.oss-cn-hangzhou.aliyuncs.com/vcluster/create.png" />
</p>
<p align="center">
  <img alt="shell" src="https://evan-oss-bucket1.oss-cn-hangzhou.aliyuncs.com/vcluster/shell.png" />
</p>

## Notice

This software is still under development, please wait until the firset released version in the short future.

## Latest Progress

1. Validate with Zod.js
2. Clusters shown with Echarts
3. Terminal is integrated

## Platform Support

Support only the windows-10-64bit, exactly linuxs do not need it. Macos is not under consideration in short-term.

## Language Support

Both chinese and english are supported. The default language is english, and you can change it in setting.

## Installation

Download the setup .exe or .msi and install it(wait until the release version). 

You can also download and use the portable app.

If you want to compile it from source code, you should prepare the envirnment with rust and node.

## Description

**Dev-env:**
- windows-10-64bit
- node 16.17.1
- rust 1.70.0

**Stack:**
- typescript 4.9.5
- react 18.2.0
- react-redux 8.1.1
- @reduxjs/toolkit 1.9.5
- react-router-dom 6.14.1
- tauri 1.4.0
- @mui 5.13.7
- @icon-park/react 1.4.2
- vite 4.2.1
- serde 1.0 `derive`
- serde_json  1.0
- chrono 0.4 `serde`
- encoding_rs 0.8.32

**IDE:**
- VsCode

## Hotkeys

- `ctrl` + `h` -  need help and learn this app
- `ctrl` + `alt` + `n` -  create a new apps-cluster
- `ctrl` + `alt` + `t` -  open the vcluster terminal
- `ctrl` + `alt` + `o` -  open an existing apps-cluster
- `ctrl` + `alt` + `i` -  import an outside apps-clustet
- `ctrl` + `l` + `c` -  switch language to Chinese
- `ctrl` + `l` + `e` -  switch language to English

## Usage

1. Create a new cluster
2. Configure the cluster created
3. Start up the cluster
4. Observe the cluster
5. Shutdown the cluster