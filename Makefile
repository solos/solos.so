all: build upload

clean:
	rm -rf public

build:
	hexo build

serve:
	hexo serve

upload:
	rsync -r public/ vultr:/var/www/solos.so
	@echo "Done..."
