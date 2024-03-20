
# Thanks https://superuser.com/a/528521/233416
INKSCAPE=/Applications/Inkscape.app/Contents/MacOS/inkscape

PIC=../../../script/pikchr

%.png: %.pic
	$(PIC) --svg-only $< > $*.svg
	$(INKSCAPE) --export-type png -w 500 --export-filename $@ $*.svg 

test.png:

.PHONY: clean	
clean:
	rm -f test.svg test.png


actions:
	$(INKSCAPE) --action-list