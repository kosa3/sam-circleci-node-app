# Getting started

```bash
$ sam init
Which template source would you like to use?
	1 - AWS Quick Start Templates
	2 - Custom Template Location
Choice: 1

Which runtime would you like to use?
	1 - nodejs12.x
	2 - python3.8
	3 - ruby2.5
	4 - go1.x
	5 - java11
	6 - dotnetcore2.1
	7 - nodejs10.x
	8 - nodejs8.10
	9 - nodejs6.10
	10 - python3.7
	11 - python3.6
	12 - python2.7
	13 - java8
	14 - dotnetcore2.0
	15 - dotnetcore1.0
Runtime: 1

Project name [sam-app]: sam-node-api

Allow SAM CLI to download AWS-provided quick start templates from Github [Y/n]: Y

-----------------------
Generating application:
-----------------------
Name: sam-node-api
Runtime: nodejs12.x
Dependency Manager: npm
Application Template: hello-world
Output Directory: .

Next steps can be found in the README file at ./sam-node-api/README.md
```

## Generate dummy json data

```bash
$ npm install -g dummy-json
$ dummyjson sample-json.hba > sample.json
```

## LocalStack s3

```bash
$ docker-compose up
$ aws s3 --endpoint-url=http://localhost:4572 mb s3://test-bucket
$ aws s3 --endpoint-url=http://localhost:4572 cp sample.json s3://test-bucket
```

## CircleCI Setup

local setting
```bash
$ circleci config process .circleci/config.yml > process.yml
$ circleci local execute -c process.yml --job ${jobName}

```