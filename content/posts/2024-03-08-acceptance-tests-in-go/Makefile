
# Thanks https://superuser.com/a/528521/233416
INKSCAPE=/Applications/Inkscape.app/Contents/MacOS/inkscape

at.png: at.svg
	$(INKSCAPE) --export-type png -w 720 at.svg --export-filename at.png

at.svg: pikchr at.pic
	./pikchr --svg-only at.pic > at.svg

pikchr:
	gcc -DPIKCHR_SHELL -o pikchr pikchr.c -lm
	
