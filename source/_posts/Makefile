all: build upload

clean:
	rm -rf _build

build:
	run-rstblog build

serve:
	run-rstblog serve

upload:
	rsync -r _build/ vultr:/var/www/solos.so
	@echo "Done..."
