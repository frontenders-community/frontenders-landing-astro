---
title: Drumpad
state: published
description: Web app che implementa un drum pad per riprodurre dei suoni, registrare una sequenza e riprodurla.
level: Advanced
topics: [Strutture dati, Audio]
repository: drumpad-react-ts
coverImage: drumpad.png
previewImage: drumpad.png
starterKit: drumpad-starter-kit.zip
---
In questa challenge l'obiettivo è creare un drum pad che riproduce un suono diverso della batteria al click sui tasti.

Inoltre, l'utente può registrare una sequenza di suoni cliccando sul pulsante Registra, cliccando sui suoni in sequenza e interrompendo la registrazione. Una volta registrata, può riprodurla.

N.B. non si tratta di una registrazione audio, ma solo di una sequenza di suoni in loop.

Ogni suono ha una sua tipologia, quindi possiamo colorare i tasti in base a quest'ultima per rendere l'app più creativa.
Il layout è semplice, ma deve essere realizzato come una web app (a tutto schermo) e inoltre deve essere responsive.

#### Starter Kit
Nello starter kit troverete una cartella assets, suddivisa in questo modo:
- sounds: contiene i suoni da riprodurre al click dei tasti (credits: https://plays.org/virtu-drum-pads/)
- data.js: un array js che contiene i dati dei suoni e delle altre informazioni utili allo sviluppo
Font: Roboto

#### Bonus
Prova a creare il layout responsive senza utilizzare le media query. Dai all'utente la possibilità di scegliere la velocità di riproduzione della sequenza dei suoni