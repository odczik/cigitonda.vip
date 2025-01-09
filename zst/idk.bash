Putty: 
Enable
Configure terminal
Hostname R13
Interface g0/0/0
Ip address 192.168.100.13 255.255.255.0
No shutdown
Do show ip int brief – kontrola
Exit
Ip dhcp pool PC13
Network 192.168.13.0 255.255.255.0
Default-router 192.168.13.1
Show ip dhcp pool – kontrola
Int g0/0/0
Ipv6 address fd00:100::13/64
No shutdown
Do Show ipv6 int brief – kontrola
Int g0/0/1
Ip address 192.168.13.1 255.255.255.0
No shutdown
Int g0/0/1
Ipv6 address fd00:13::1/64
No shutdown
Ip domain name cisco.com
Crypto key generate Rsa
Username admin privilege privilege 15 secret 123456789
line vty 0 4
transport input ssh
login local


