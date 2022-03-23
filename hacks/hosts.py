from collections import defaultdict
import re
import os
import sys

args = sys.argv[1:]
if (len(args) == 0):
    print("Usage: python3 host.py <file_domains>")
    print("For example: python3 host.py viettelpay.vn")
    print("Exitting ...")
    exit()

domains = open(args[0]).read().strip().split('\n')

ips = defaultdict(list)
for d in domains:
    out = os.popen('host ' + d).read()
    matched = re.findall("(?<=has address )\d{0,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", out)
    matchedDomains = re.findall("(?<=is an alias for ).+\.", out)
    for i in range(len(matchedDomains)):
        matchedDomains[i] = matchedDomains[i][:-1]
    matchedDomains.append(d)
    for ip in matched:
        ips[ip].extend(matchedDomains)
        ips[ip] = list(set(ips[ip]))

ips = sorted(ips.items())
for row in ips:
    print(row[0], ':', row[1])