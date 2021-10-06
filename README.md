# Secure Bucket Construcs

This Secure Bucket construcs extends the S3 Bucket construct. When using this construct, you will create a S3 bucket with default security best practises enabled. These are:

- Block public access
- Enabled versioning
- Enforce SSL to connect to bucket
- Enabled Bucket access logging
- Encryption of the bucket with a customer managed KMS key with enabled key rotation and trusted account identities.