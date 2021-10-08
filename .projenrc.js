const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Yvo van Zee',
  authorAddress: 'yvo@yvovanzee.nl',
  cdkVersion: '1.124.0',
  defaultReleaseBranch: 'main',
  description: 'A CDK construct to create a Secure S3 Bucket for enterprise security frameworks',
  name: '@yvthepief/secure-bucket',
  repositoryUrl: 'https://github.com/yvthepief/secure-bucket.git',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-s3',
  ],

  python: {
    distName: 'yvthepief.secure-bucket',
    module: 'yvthepief.secure_bucket',
  },
  releaseEveryCommit: true,
  // cdkDependencies: undefined,      /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                     /* Build dependencies for this module. */
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();