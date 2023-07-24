output "linode_token" {
  value     = var.linode_token
  sensitive = true
}

output "kubeconfig" {
  value     = linode_lke_cluster.cluster.kubeconfig
  sensitive = true
}
