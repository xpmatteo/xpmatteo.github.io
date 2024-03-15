
# Thanks https://superuser.com/a/528521/233416
INKSCAPE=/Applications/Inkscape.app/Contents/MacOS/inkscape

PIC=../../../script/pikchr

%.png: %.pic
	$(PIC) --svg-only $< > $*.svg
	$(INKSCAPE) --export-type png -w 720 --export-filename $@ $*.svg 

at.png:

.PHONY: clean	
clean:
	rm -f at.svg at.png


