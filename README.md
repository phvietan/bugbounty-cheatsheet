# Note:
- Interesting characters: \, ', ", @, #, !, |, \n, \r, $, `
- Content-type: text/xml, application/xml
- TODO: log unique dns traffic: https://www.youtube.com/watch?v=aNQg9mg4WNI 4'37

# Steps:

- 1: Recon
  + 1.1: Features
  + 1.2: Domains, Ips
  + 1.3: Apps (Android, ios)
- 2: plz be optimistic :cry:

# Techniques:

- Weird proxies: 
  + https://github.com/GrrrDog/weird_proxies
  + https://speakerdeck.com/greendog/2-and-a-bit-of-magic
  + Nginx conf check: https://github.com/yandex/gixy
  
- XSS: https://netsec.expert/posts/xss-in-2021/
- XSS 20 chars: https://jlajara.gitlab.io/web/2019/11/30/XSS_20_characters.html
- XSS sinks: https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/dom-xss
- CRLF bypass: https://blog.innerht.ml/twitter-crlf-injection/
- WAF bypass OS command: https://www.slideshare.net/secret/7IIcnFoZuGke8X
- Web hardcore vulns (in case I forget): XSLeaks, SSTI, Web cache poison, Prototype pollution, Crypto
- IDOR, autorize, autorepeater: https://www.youtube.com/watch?v=3K1-a7dnA60
- HTTP leaks: https://github.com/cure53/HTTPLeaks
- (Blind) SSRF cheatsheet: git@github.com:phvietan/bugbounty-cheatsheet.git

## Android

- Auto recon app Drozer: https://github.com/FSecureLABS/drozer
- Sinks: WebView.addJavascriptInterface, WebView.createWebMessageChannel, ... FlowDroid
- APK leak: https://github.com/dwisiswant0/apkleaks

# Tips:

- Recon for company info (slack/any platform invitation leak, opensource github API key leak, etc)
- Recon for DNS stuff
- Check for DOS issues: https://cpdos.org/ 
- Use money
- Recon for public assets (like hackathon-related assets): sometimes companies run hackathons and give attendees special access to certain API endpoints and/or temporary credentials
- CSRF change body to querystring because may uses @RequestParam
- Look for XSLeaks like window.length
- Look for clickjacking on sensitive content
- Search "package.json" in js files misconfig may leak stuff
