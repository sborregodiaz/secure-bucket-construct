
import { Key } from '@aws-cdk/aws-kms';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption, BucketProps } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export class SecureBucket extends Construct {
  public bucket: Bucket;

  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id);

    // Overrule Bucket Props with secure defaults and make them mandatory
    let newProps: BucketProps = {
      ...props,
      encryption: props && props.encryption && props.encryption != BucketEncryption.UNENCRYPTED
        ? props.encryption
        : BucketEncryption.KMS,
      encryptionKey: new Key(this, `${id}-key`, { enableKeyRotation: true, trustAccountIdentities: true }),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      versioned: true,
      enforceSSL: true,
      accessControl: BucketAccessControl.LOG_DELIVERY_WRITE,
      serverAccessLogsPrefix: 'access-logs',
    };

    // Create actual bucket
    this.bucket = new Bucket(this, `${id}-bucket`, newProps);
  }
}
