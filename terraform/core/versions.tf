terraform {
  required_version = "~> 1.2"

  required_providers {
    linode = {
      source  = "linode/linode"
      version = "~> 2.5.2"
    }
  }
}
