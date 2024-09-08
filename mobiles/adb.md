# ADB cheatsheet

Root with: https://github.com/newbit1/rootAVD

```
    Old: $ adb reverse tcp:8080 tcp:8080
    New: emulator -avd <name> -http-proxy 192.168.1.17:8080 -writable-system
```

### Install Burp

#### Method 1: x86 apps

Use AVD. Install x86 (no google play, because google play is productionbuild, non-google play is not productionbuild, productionbuild = cannot run `adb root`).

If install x86, there'll be no browser, install firefox [here](https://apkcombo.com/vi/firefox/org.mozilla.firefox/download/phone-130.0-apk)

https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/install-burp-certificate

```
    adb root
    adb remount
    adb shell "su 0 mount -o rw,remount /system"
```
