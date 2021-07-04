# Note:
- Interesting characters: \, ', ", @, #, !, |, \n, \r
- Content-type: text/xml, application/xml
- TODO: log unique dns traffic: https://www.youtube.com/watch?v=aNQg9mg4WNI 4'37
# Steps:

- 1: Recon
  + 1.1: Features
  + 1.2: Domains, Ips
  + 1.3: Apps (Android, ios)
- 2: PLAN, LIST ATTACK VECTORS
- XXX: Scans, discoveries (paths, port, ...) 
- 3: Auto exploit (Jaeles) for: XSS, SQLi, NoSQLi, SSRF
- 4: plz be optimistic :cry:

# Cheat sheets:

## Webs

- Weird proxies: https://github.com/GrrrDog/weird_proxies
- XSS: https://netsec.expert/posts/xss-in-2021/
- XSS sinks: https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/dom-xss
- WAF bypass OS command: https://www.slideshare.net/secret/7IIcnFoZuGke8X
- Web hardcore vulns (in case I forget): XSLeaks, SSTI, Web cache poison, Prototype pollution, Crypto
- IDOR, autorize, autorepeater: https://www.youtube.com/watch?v=3K1-a7dnA60
- Email parsing: https://twitter.com/s0md3v/status/1173603213469110273
  + an@googlemail.com
  + an+(@gmail.com)@gmail.com
  + "an@gmail.com"@gmail.com
  + "<an@gmail.com>"@gmail.com
  + "an@gmail.com;"@gmail.com
  + "an@gmail.com+"@gmail.com
  + Sometimes \n inject SMTP command, read here: https://www.acunetix.com/blog/articles/email-header-injection/
- HTTP leaks: https://github.com/cure53/HTTPLeaks
- (Blind) SSRF cheatsheet: git@github.com:phvietan/bugbounty-cheatsheet.git

## Android

- Reverse: JEB, or go online :smile:
- Cert pinnings script kiddies :cry: : https://github.com/shroudedcode/apk-mitm
- Data flow analysis: https://github.com/secure-software-engineering/FlowDroid
- Auto recon app Drozer: https://github.com/FSecureLABS/drozer
- Sinks: WebView.addJavascriptInterface, WebView.createWebMessageChannel, ... FlowDroid

# Tips:

**Tip #1**

Use GIT as a recon tool. Find the target's GIT repositories, clone them, and then check the logs for information on the team not necessarily in the source code. Say the target is Reddit and I want to see which developers work on certain projects.

[Link](https://gist.github.com/EdOverflow/a9aad69a690d97a8da20cd4194ca6596 )

**Tip #2**

Look for GitLab instances on targets or belonging to the target. When you stumble across the GitLab login panel, navigate to `/explore`. Misconfigured instances do not require authentication to view the internal projects. Once you get in, use the search function to find passwords, keys, etc. This is a pretty big attack vector and I am finally revealing it today, because I am sure it will help a lot of you get some critical issues.

**Tip #3**

Bug bounty tip: test applications of a company that costs money or requires manual setup. Chances are only few to none would have tested it leaving it vulnerable. 

**Tip #4**

If you’ve found an IDOR where you’re able to change data of others then don’t jump out of your seat to report it > modify it to XSS payload & if inputs are not sanitized & variables are echo’d without getting escaped then IDOR>XSS>ATO.

**Tip #5**

Look for *hackathon-related* assets. What I mean by this is sometimes companies run hackathons and give attendees special access to certain API endpoints and/or temporary credentials. I have found GIT instances that were set up for Hackathons full of information that allowed me to find more issues in the target several times.

**Tip #6**

When you have a form, always try to change the request method from POST to GET in order to improve the CVSS score.
For example, demonstrating a CSRF can be exploited simply by using \[img\] tag is better than having to send a link to the victim.

