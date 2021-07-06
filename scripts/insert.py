import sys
import requests


api_url = sys.argv[1]
certname = sys.argv[2]
requests.post(api_url+"/v1/new", json={"certname": certname})