provider "linode" {
  token = var.linode_token
}

resource "linode_lke_cluster" "cluster" {
  label       = "monorepo-cluster"
  region      = "us-central"
  k8s_version = "1.26"
  tags        = ["terraform"]

  pool {
    type  = "g6-standard-1"
    count = 1
  }
}
