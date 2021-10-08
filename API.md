# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### SecureBucket <a name="@yvthepief/secure-bucket.SecureBucket"></a>

#### Initializers <a name="@yvthepief/secure-bucket.SecureBucket.Initializer"></a>

```typescript
import { SecureBucket } from '@yvthepief/secure-bucket'

new SecureBucket(scope: Construct, id: string, props?: BucketProps)
```

##### `scope`<sup>Required</sup> <a name="@yvthepief/secure-bucket.SecureBucket.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@yvthepief/secure-bucket.SecureBucket.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@yvthepief/secure-bucket.SecureBucket.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-s3.BucketProps`](#@aws-cdk/aws-s3.BucketProps)

---



#### Properties <a name="Properties"></a>

##### `bucket`<sup>Required</sup> <a name="@yvthepief/secure-bucket.SecureBucket.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---





