SHELL := /bin/bash
APPLICATION := $(shell basename $$PWD)
VERSION := $(shell cat VERSION)
PACKAGE := target/$(APPLICATION)_$(VERSION).tbz
CRED_FILE := deploy/aws_credentials.json

$(PACKAGE):
	@mkdir -p target
	@cd .. && tar cjfv $(APPLICATION)/$(PACKAGE) \
	--exclude=*.log \
	--exclude=$(APPLICATION)/.git \
	--exclude=$(APPLICATION)/deploy \
	--exclude=$(APPLICATION)/target \
	--exclude=$(APPLICATION)/doc \
	--exclude=$(APPLICATION)/packer_cache $(APPLICATION)/

$(CRED_FILE):
	@pm setup

release: clean grunt-build $(PACKAGE) $(CRED_FILE)
	@pm release $(PACKAGE) $(VERSION)

prod-admin-deploy: $(CRED_FILE)
	@pm deploy prod-admin $(VERSION)

stage-deploy: $(CRED_FILE)
	@pm deploy staging $(VERSION)

qa-deploy: $(CRED_FILE)
	@pm deploy qa $(VERSION)

feature-deploy: $(CRED_FILE)
	@pm deploy feature $(VERSION)

clean:
	@rm -rf target

grunt-build:
	@grunt build:dist
