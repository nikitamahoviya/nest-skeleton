# Kubernets Guides

## Best Practices

[Kubernetes Best Practices](#)

## Useful Commands

- [Kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

- [REF 1](https://github.com/RehanSaeed/Kubernetes-Cheat-Sheet)
- [REF 2](https://www.mirantis.com/blog/kubernetes-cheat-sheet/)
- [REF 3](https://www.bluematador.com/learn/kubectl-cheatsheet)

Handy commands

```
# Create namespace
$ kubectl create namespace <namespace>

# Apply changes
$ kubectl apply -f <filepath> -n <namespace>

# Get Pods
$ kubectl get pods -n <namespace>
# Get Services
$ kubectl get svc -n <namespace>
# Get ServiceEntries
$ kubectl get serviceentry -n <namespace>

# Get Pod logs
$ kubectl logs <podname> -n <namespace>
# Get Pod logs (Sidecar)
$ kubectl logs <podname> <sidecar name> -n <namespace>

# Exec into Pod interactive mode
$ kubectl exec -it <podname> -n <namespace> /bin/sh

# Delete Pod
$ kubectl delete pod <podname> -n <namespace>
# Delete Service
$ kubectl delete svc <servicename> -n <namespace>
# Delete deployment
$ kubectl delete deployment <deploymentname> -n <namespace>

# Describe Pod
$ kubectl describe pod <podname> -n <namespace>
# Describe Service
$ kubectl describe svc <servicename> -n <namespace>
# Describe deployment
$ kubectl describe deployment <deploymentname> -n <namespace>

# Get Ingress
$ kubectl get ingress -n <namespace>

# Enable istio injection
kubectl label namespace <namespace> istio-injection=enabled

# Verify namespace injections
kubectl get namespace -L istio-injections
```
