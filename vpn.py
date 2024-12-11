import openvpn_api
from openvpn_status.models import Status

# client = Client()
# client.connect('52.53.148.148', 943)      # default port
# v = openvpn_api.VPN('127.0.0.1', 1194)    # udp port
v = openvpn_api.VPN('127.0.0.1', 943)       # tcp port
v.connect()
status = v.get_status()
print(status)

# Connect to the management interface
client = openvpn_api.Client(
    # host="localhost",
    host="https://52.53.148.148:943/",
    port=7505, 
    password="$t3eLEr$"
)

# Get the status
status = client.get_status()

# Print the status
print(status)