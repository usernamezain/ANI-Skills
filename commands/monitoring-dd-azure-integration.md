# monitoring:dd-azure-integration

Set up the Datadog Azure integration with Terraform - creates an Entra ID app registration and service principal, assigns Monitoring Reader across the chosen subscriptions and management groups, grants the Microsoft Graph permissions Datadog needs for resource discovery, and registers the tenant so Azure metrics and resource collection start flowing. Use when the user wants to monitor Azure VMs, App Service, SQL Database, or AKS, wants to connect an Azure subscription or management group or tenant to Datadog, or asks to set up or repair the Azure integration. Does not set up log forwarding.

**Skill folder:** `skills/agent-skills/dd-azure-integration/`
**Namespace:** `monitoring`
