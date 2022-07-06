# CDK Backup Plan

![Build](https://github.com/aws-samples/cdk-backup-plan/workflows/build/badge.svg)
![Release](https://github.com/aws-samples/cdk-backup-plan/workflows/release/badge.svg)

Provides an easy to use reusable CDK construct to create [Backup Plans](https://docs.aws.amazon.com/aws-backup/latest/devguide/about-backup-plans.html) using [AWS Backups](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html). It allows to indicate how frequently and what resources to backup.

> **NOTE:** More details on all the available arguments can be found [here](API.md)

## Install

NPM install:

```sh
npm install cdk-backup-plan
```

PyPi install:

```sh
pip install cdk-backup-plan
```

## Usage

```typescript
// ...
import { Backup } from "cdk-backup-plan";

// ...
const vpc = new ec2.Vpc(stack, "TestVPC");
const engine = rds.DatabaseInstanceEngine.postgres({
  version: rds.PostgresEngineVersion.VER_12_3,
});
// create rds DB
const db = new rds.DatabaseInstance(stack, "TestInstance", {
  engine,
  vpc,
  credentials: rds.Credentials.fromGeneratedSecret("postgres"),
});
// create a backup plan for `db`
new Backup(stack, "TestBk", {
  backupPlanName: "TestPkPlan",
  backupRateHour: 3, // backup every 3 hours
  backupCompletionWindow: cdk.Duration.hours(2), // backup should take up to 2 hours
  resources: [bk.BackupResource.fromRdsDatabaseInstance(db)],
});
// ...
```

Python usage:

```python
# ...
from cdk_backup_plan import Backup

# ...
vpc = ec2.Vpc(self, "TestVPC")
engine = rds.DatabaseInstanceEngine.postgres(
    version=rds.PostgresEngineVersion.VER_12_3,
)
db = rds.DatabaseInstance(self, "TestInstance",
    engine=engine,
    vpc=vpc,
    credentials=rds.Credentials.from_generated_secret("postgres"),
)
Backup(self, "TestBk",
    backup_plan_name="TestPkPlan",
    backup_rate_hour=3,
    backup_completion_window=Duration.hours(2),
    resources=[bk.BackupResource.from_rds_database_instance(db)],
)
# ...
```

> **NOTE:** [Tagging](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_backup.BackupResource.html#static-fromwbrtagkey-value-operation) and/or [ARN](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_backup.BackupResource.html#static-fromwbrarnarn) can be used to reference resources not directly available in the [static methods section](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_backup.BackupResource.html#methods).
