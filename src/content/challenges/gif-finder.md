---
title: GIF Finder
state: published
description: Web app per cercare delle GIF tramite parole chiave e condividerle tramite whatsapp.
level: Pro
topics: [API, Grid, Responsive]
repository: vue3-gif-app
coverImage: gif.png
previewImage: gif.png
---
In questa challenge l'obiettivo è creare una web app per cercare delle GIF tramite parole chiave. Per la ricerca utilizzeremo questa API: https://tenor.com/gifapi.

Dopo aver inserito la chiave di ricerca e premuto Invio (o cliccato sul pulsante relativo), l'utente potrà visualizzare le gif in una griglia. Attenzione: non vedremo tutte le gif poiché l'API effettua la paginazione dei risultati. Proviamo quindi ad eseguire nuove chiamate API allo scroll della pagina (effetto noto come infinite scroll).

Altre funzionalità del progetto sono:
- possibilità di cambiare tema: light/dark mode switcher
- possibilità di condividere il link della gif tramite whatsapp
- possibilità di copiare link in clipboard
- layout responsive

Partiamo dalla documentazione (https://developers.google.com/tenor/guides/quickstart): ci registriamo in Google Cloud Console e richiediamo la API Key per poter accedere al Tenor. Ricordate che le credenziali di accesso non dovrebbero essere publiche e quindi trovate il modo per non condividerli su Github.

Font: Roboto. Icone: Fontawesome.

#### Bonus
Implementa filtro delle gif per categoria.

#### Tecnologie
Prova a risolvere la challenge sfruttando un framework Javascript (uno che già conosci o uno che vuoi scoprire!).