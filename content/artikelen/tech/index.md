+++
title    = "De leer van de Eenheid is één"
subtitle = "al-Tawhīdu wāhidun"
auteurs  = ["Camille Meloen"]
date     = "2022-05-02"
themas   = "Religie & Metafysica"
draft = true
+++

This article is quite niche, it is namely about the tech behind Reactionair.nl, so if this doesn't interest you, just skip ahead to some other article on our site!

I started Reactionair.nl as a hobby project back in late 2021 because I was bored, since then it has grown into something quite impressive, if I do say so myself. I like to make everything myself and am very into minimalism, which is not only reflected in the design, but the backend is so as well.


### Hugo

The most important piece of software behind Reactionair.nl is probably Hugo, a static site generator.

Every article is written in plaintext using the minimal markup language Markdown. Each article contains what is called front matter defining some properties such as the title, a little example:

```md
+++
title    = "De leer van de Eenheid is één"
subtitle = "al-Tawhīdu wāhidun"
auteurs  = ["Camille Meloen"]
date     = "2022-05-02"
themas   = "Religie & Metafysica"
dossiers = ["Islam"]
+++


Wanneer ik boeken lees, vergeet ik de meeste zinnen binnen enkele minuten. Ik lees boeken voor de kleine goudklompjes die toch blijven hangen. Eén zo'n goudklompje is te vinden in de volgende alinea in het boek van René Guénon, _Aperçus sur l'ésotérisme islamique et le taoïsme_:

>De leer van de Eenheid, dat wil zeggen de bevestiging dat het Beginsel van alle bestaan in wezen Eén is, is een fundamenteel punt dat alle orthodoxe tradities gemeen hebben, en we zouden zelfs kunnen zeggen dat ...
```

This file is then fed into a layout that makes up the pages, and Hugo spits out html files that are served to you, the user. The great benifit of something a static site generator is that all the hard work is done long before serving, and as such it is very quick. With what we call 'dynamic' sites, the content is generated on the fly, each time a user requests a page.

This also means we don't really make use of any fancy database, everything is just plain text files, mirroring the UNIX philosophy.


### Comments

Though it must be noted that there are some dynamic things on our pages, such as the comments. I make use a the little know, but great tool called Welcomments for this. When you send a comment, it gets send to the Welcomments server. There I can accept or deny the comment. Once accpeted Welcomments pushes it to the Reactionairy git repository, where the next time Hugo is run to generate the static files, the comments will be build statically as well


### Analytics

I'm not really a fan of tracking, though it is useful to know which articles do well, which timespaces work well, and such. For this I use counted.dev instead of something more privacy invacive like Google Analitics. counted.dev does not make use of any cooking or finger printing, and as such no annoying "cookie popup" has to be shown either.


### Hosting

The website is hosted using the Caddy webserver, on a machine running Alpine Linux. Caddy is quite minimal for a webserver, and Alpine is quite minimal for a Linux distro. Bother very interesting projects to check out.


If you have any questions regarding the tech behind Reactionair, just leave a comment!


[^1]: this is a little secret I have, because for you, the user, it looks like the comment is already live while it really isn't it is just only visible on your end, till I accept the comment. Many comments I deem of low quality, or just plain spam and insult I simply throw away.
