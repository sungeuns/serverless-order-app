# order-app

AWS에서 serverless를 활용하는 예시입니다.

- [참고 워크샵](https://catalog.us-east-1.prod.workshops.aws/workshops/b34eab03-4ebe-46c1-bc63-cd2d975d8ad4/en-US)


## Script 설명

- `c9_resize.sh` : cloud9 IDE의 EBS storage volume size을 설정하는 스크립트입니다.
- `build-app.sh` : 빌드를 진행합니다.
- `deploy-app.sh` : 빌드 이후에 CloudFormation을 활용하여 배포를 진행합니다.



## 기본 설정

#### 편의 설정 추가
```
sudo yum install -y jq
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
echo "export AWS_REGION=${AWS_REGION}" | tee -a ~/.bash_profile
```

#### 앱 배포
- 배포를 진행하기 전에 `samconfig.toml` 에서 s3 bucket을 이름을 적절하게 맞추어 줍니다. (없다면 생성 후 설정합니다.)
- Region 또한 맞춰줄 수 있도록 합니다.
```
./build-app.sh
./deploy-app.sh
```

#### DynamoDB에 초기 데이터 넣기
```
cd populate-db
npm install
node seed-orderdb.js
```


## Local test

SAM은 local 에서 docker를 띄워서 API Gateway나 Lambda의 동작을 테스트할 수 있습니다.
- `local-test` 디렉토리 하위에 있는 스크립트들은 Lambda 함수를 local 테스트하는 예시입니다.
- Local에서 Lambda invoke를 할 수도 있으며 API Gateway를 Local에서 실행시킬 수 있습니다.
- `run-local-api.sh` : API Gateway가 local 에서 동작하도록 합니다.


## Resources

- [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)