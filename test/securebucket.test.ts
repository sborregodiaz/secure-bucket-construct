import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { App, Stack } from '@aws-cdk/core';
import { SecureBucket } from '../src';
import '@aws-cdk/assert/jest';

test('Exposes underlying bucket', ()=>{
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  const bucketWrapper = new SecureBucket(stack, 'testing', {});
  expect(bucketWrapper.bucket).toBeInstanceOf(Bucket);

});

test('Has one encrypted Bucket', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', {});

  expect(stack).toHaveResource('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [
        {
          ServerSideEncryptionByDefault: {
            KMSMasterKeyID: {
              'Fn::GetAtt': [
                'testingtestingkey05446519',
                'Arn',
              ],
            },
            SSEAlgorithm: 'aws:kms',
          },
        },
      ],
    },
  });

});
test('Has BucketVersioning enabled', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', { versioned: false });

  expect(stack).toHaveResource('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [
        {
          ServerSideEncryptionByDefault: {
            KMSMasterKeyID: {
              'Fn::GetAtt': [
                'testingtestingkey05446519',
                'Arn',
              ],
            },
            SSEAlgorithm: 'aws:kms',
          },
        },
      ],
    },
  });
});
test('Has BlockPublicAccess to BLOCK_ALL', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', { });

  expect(stack).toHaveResource('AWS::S3::Bucket', {
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
});
test('Has Bucket Logging enabled', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', { });

  expect(stack).toHaveResource('AWS::S3::Bucket', {
    AccessControl: 'LogDeliveryWrite',
    LoggingConfiguration: {
      LogFilePrefix: 'access-logs',
    },
  });
});
test('Does not allow for unencrypted buckets', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', { encryption: BucketEncryption.UNENCRYPTED });

  expect(stack).toHaveResource('AWS::S3::Bucket', {
    VersioningConfiguration: {
      Status: 'Enabled',
    },
  });
});

test('Does not allow for unencrypted uploads', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', { enforceSSL: false });

  expect(stack).toHaveResource('AWS::S3::BucketPolicy', {
    Bucket: {
      Ref: 'testingtestingbucket0660011F',
    },
    PolicyDocument: {
      Statement: [
        {
          Action: 's3:*',
          Condition: {
            Bool: {
              'aws:SecureTransport': 'false',
            },
          },
          Effect: 'Deny',
          Principal: {
            AWS: '*',
          },
          Resource: [
            {
              'Fn::GetAtt': [
                'testingtestingbucket0660011F',
                'Arn',
              ],
            },
            {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'testingtestingbucket0660011F',
                      'Arn',
                    ],
                  },
                  '/*',
                ],
              ],
            },
          ],
        },
      ],
      Version: '2012-10-17',
    },
  });
});

test('Uses KMS encryption with key rotation on key', () => {
  const mockApp = new App();
  const stack = new Stack(mockApp, 'testing-stack');

  new SecureBucket(stack, 'testing', {});

  expect(stack).toHaveResource('AWS::KMS::Key', {
    EnableKeyRotation: true,
  });
});