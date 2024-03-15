---
title: Dashboard Criptovalute
state: published
description: Una dashboard che visualizza una lista di criptovalute, con paginazione e ordinamento dei dati in tabella.
level: Advanced
topics: [API, Tabelle, Paginazione, Grafici]
repository: crypto-table-react
coverImage: crypto.png
previewImage: crypto.png
---
In questa challenge l'obiettivo è creare una dashboard per visualizzare informazioni relative alle criptovalute. Il focus principale è quello di lavorare con dati tabellari e implementare delle funzionalità base di una tabella:
- visualizzazione di dati
- paginazione (spostamento tra le pagine, visualizzazione della - pagina corrente, modifica di elementi per pagina)
- possibilità di ordinare dati per colonna in modo crescente / decrescente

Per i dati delle criptovalute abbiamo utilizzato l'API di Coderanking. Per accedere all'API c'è bisogno di una chiave, quindi va creato un account gratuito. Mentre testate la vostra app potrebbe capitare che le chiamate API vengono bloccate perchè raggiungete il limite di richieste. Ma non vi preoccupate, basterà aspettare qualche minuto e sarà possibile inviare di nuovo le richieste.

Per il design abbiamo preso ispirazione ad un layout di Georgy Pashkov.

#### Tecnologie
Prova a risolvere la challenge sfruttando un framework Javascript (uno che già conosci o uno che vuoi scoprire!). Per l'implementazione dei grafici è stata utilizzata la libreria chart.js.