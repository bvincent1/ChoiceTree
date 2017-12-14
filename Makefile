ifndef CI
	include .env
endif

install:
	apt-get update
	apt-get install build-essential awscli -y

deploy:
	aws s3 sync public/ s3://$(AWS_BUCKET)

deploy-dev:
	aws s3 sync public/ s3://$(AWS_BUCKET_DEV)
