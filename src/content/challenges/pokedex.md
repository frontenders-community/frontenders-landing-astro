---
title: Pokedex
state: published
description: Web app che permette di cercare dei pokemon tramite PokeAPI e di gestire un pokedex.
level: Beginner
topics: [Strutture dati, API]
repository: pokedex-react
coverImage: pokedex.png
previewImage: pokedex.png
mostView: true
---

In questa challenge l'obiettivo è creare una web app che permetta di cercare e visualizzare delle informazioni relative ai pokemon e di creare il proprio pokedex.

La web app deve essere suddivisa in tre componenti:
- **Search Bar**: tramite la search bar è possibile cercare un Pokemon. La ricerca va fatta sfruttando l'API PokéAPI (https://pokeapi.co/)
- **Dettaglio Pokemon**: l'utente visualizza alcune informazioni base del pokemon. Le statistiche sono mostrate con delle progress-bar. L'utente ha anche la possibilità di visualizzare l'immagine del pokemon in modalità default o shiny
- **Pokedex**: è possibile aggiungere dei pokemon al proprio pokedex, per un massimo di 10 pokemon. Per ogni pokemon è possibile rivedere le statistiche cliccando su Mostra oppure eliminarlo dal pokedex cliccando su Elimina. Il pokedex viene salvato in locale, così che sia disponibile anche dopo il refresh o all'avvio dell'app

Per lo stile della web app noi abbiamo utilizzato la libreria Milligram CSS (https://milligram.io/#getting-started).