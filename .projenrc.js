const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Mauricio Villaescusa',
  authorAddress: 'maurovc@amazon.com',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  cdkVersion: '2.49.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-backup-plan',
  description: 'CDK construct to create AWS Backup Plans',
  repositoryUrl: 'https://github.com/aws-samples/cdk-backup-plan.git',
  license: 'MIT-0',
  publishToPypi: {
    distName: 'cdk-backup-plan',
    module: 'cdk_backup_plan',
  },
});

project.gitignore.addPatterns('.dev/');

project.synth();
