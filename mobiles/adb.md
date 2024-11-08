# ADB cheatsheet

Root with: https://github.com/newbit1/rootAVD

```
    Old: $ adb reverse tcp:8080 tcp:8080
    New: emulator -avd <name> -http-proxy 192.168.1.17:8080 -writable-system
```

### Root & install Burp

#### Method 1: x86 apps without google play

Use AVD. Install x86 (no google play, because google play is production builds, and within production builds cannot run `adb root`).

If install x86, there'll be no browser, you can try installing firefox [here](https://apkcombo.com/vi/firefox/org.mozilla.firefox/download/phone-130.0-apk)

Then, just run `adb root` to gain root access

#### Method 2: x86 apps with google play

Download https://gitlab.com/newbit/rootAVD

Run rootAVD.bat file, use the 1st command, but choose your architect correctly, for example x86, API 26 :

```
.\rootAVD.bat system-images\android-26\google_apis_playstore\x86\ramdisk.img
```

#### Install Burp

##### Android < 10

https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/install-burp-certificate

If you can run `adb root`:
```
    adb root
    adb remount
    adb shell "su 0 mount -o rw,remount /system"
```

If you can get root shell:
```
    adb shell
    su
    mount -o rw,remount /system
```

##### Android >= 10

https://gist.github.com/pwlin/8a0d01e6428b7a96e2eb?permalink_comment_id=3499340

Then proceed to copy the cert into system

