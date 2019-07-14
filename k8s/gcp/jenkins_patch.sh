kubectl patch svc cd-jenkins -p '{"spec": {"ports": [{"port": 8080,"targetPort": 8080,"name": "http"}],"type": "NodePort"}}'
