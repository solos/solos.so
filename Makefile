all: build upload

clean:
	rm -rf public

build:
	hexo generate

serve:
	hexo serve

upload:
	rsync -r public/ vultr:/var/www/solos.so
	@echo "Done..."
