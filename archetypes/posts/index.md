+++
{{ $baseTitle := replaceRE "\\d\\d\\d\\d-\\d\\d-\\d\\d-" "" .File.ContentBaseName }}
title = '{{ replace $baseTitle "-" " " | title }}'
slug = '{{ $baseTitle }}'
date = {{ .Date }}
tags = [
    "Default",
]
draft = true
+++


*Want to leave a comment? Please do so on Linkedin!*
