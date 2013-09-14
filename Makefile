all: build upload

clean:
	rm -rf _build

build:
	run-rstblog build

serve:
	run-rstblog serve

upload:
	rsync -a _build/ root@solos.so:/var/www/solos.so
	@echo "Done..."
