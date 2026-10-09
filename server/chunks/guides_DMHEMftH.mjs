//#endregion
//#region src/lib/guides.ts
var guides = {
	"qr-code-generator": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Ein QR-Code ist nichts weiter als eine Adresse in Bildform. Wer ihn mit der Handykamera erfasst, landet direkt auf Ihrer Website, im WLAN Ihres Betriebs oder mit Ihren Kontaktdaten im Adressbuch — ohne dass jemand etwas abtippen muss. Genau da liegt der praktische Nutzen: Jede Ziffer, die ein Kunde selbst eingeben soll, ist eine Gelegenheit, sich zu vertippen und aufzugeben.",
				"Dieser Generator erzeugt vier Arten von Codes: freie URLs und Texte, WLAN-Zugänge und Kontaktdaten als vCard. Sie können Vorder- und Hintergrundfarbe an Ihr Erscheinungsbild anpassen und das Ergebnis als PNG für den Druck oder als SVG für die skalierbare Weiterverarbeitung herunterladen.",
				"Wichtig zu wissen: Der Code enthält das Ziel unmittelbar — er ist keine Weiterleitung über einen fremden Dienst. Das bedeutet, dass er dauerhaft funktioniert, aber auch, dass sich das Ziel nachträglich nicht ändern lässt. Wenn Sie damit rechnen, die Adresse später zu wechseln, verweisen Sie besser auf eine eigene Seite, deren Inhalt Sie selbst anpassen können."
			],
			useCases: [
				{
					title: "Gäste-WLAN ohne Zettel",
					text: "Der WLAN-Code hinterlegt Netzname und Passwort. Gäste verbinden sich mit einem Scan, statt ein 20-stelliges Passwort von einem Aushang abzuschreiben."
				},
				{
					title: "Speisekarte, Preisliste, Anleitung",
					text: "Ein Code am Tisch, am Regal oder auf der Maschine führt zur aktuellen Fassung — und Sie tauschen künftig die Seite aus statt des Aufstellers."
				},
				{
					title: "Visitenkarte, die im Adressbuch landet",
					text: "Der vCard-Code überträgt Name, Firma, Telefon und E-Mail in einem Zug. Deutlich zuverlässiger, als eine Karte später abzutippen."
				},
				{
					title: "Flyer und Anzeigen messbar machen",
					text: "Zeigt der Code auf einen Link mit UTM-Parametern, sehen Sie in Ihrer Statistik, wie viele Besucher tatsächlich aus dem Print gekommen sind."
				},
				{
					title: "Formulare am Fahrzeug oder auf der Baustelle",
					text: "Ein Aufkleber mit Code führt direkt zum Schadens-, Abnahme- oder Kontaktformular, ohne dass jemand die Adresse kennt."
				}
			],
			steps: [
				{
					title: "Art des Codes wählen",
					description: "Entscheiden Sie zwischen URL beziehungsweise freiem Text, WLAN-Zugang und Kontaktdaten. Die Eingabefelder darunter richten sich nach dieser Auswahl."
				},
				{
					title: "Inhalt eintragen",
					description: "Tragen Sie die Zieladresse ein — bei einer Website vollständig mit https://. Beim WLAN kommen Netzname und Passwort dazu, bei der vCard Name, Firma, Telefon und E-Mail."
				},
				{
					title: "Farben anpassen",
					description: "Vorder- und Hintergrundfarbe lassen sich an Ihr Erscheinungsbild angleichen. Achten Sie auf deutlichen Unterschied zwischen beiden: Ein zu heller Code wird von vielen Kameras nicht erkannt."
				},
				{
					title: "Prüfen und herunterladen",
					description: "Scannen Sie den Code einmal mit dem eigenen Telefon, bevor Sie ihn in den Druck geben. Danach als PNG für Papier oder als SVG für skalierbare Layouts speichern."
				}
			],
			privacy: "Der Code entsteht vollständig in Ihrem Browser. Weder die Zieladresse noch Ihr WLAN-Passwort oder Ihre Kontaktdaten werden an einen Server übertragen oder gespeichert — das Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Sie können die Seite nach dem Laden vom Netz nehmen und trotzdem weiterarbeiten. Bei einem WLAN-Passwort ist das kein akademischer Unterschied: Viele Online-Generatoren senden genau diese Eingabe zur Erzeugung an ihren Server.",
			faq: [
				{
					q: "Läuft der QR-Code irgendwann ab?",
					a: "Nein. Der Code enthält das Ziel direkt und ist nicht an einen Dienst gebunden, der ihn auflösen müsste. Er funktioniert, solange die Zieladresse erreichbar ist. Genau deshalb lässt sich das Ziel aber auch nicht nachträglich ändern."
				},
				{
					q: "PNG oder SVG — was soll ich nehmen?",
					a: "PNG für alles, was in fester Größe gedruckt oder eingefügt wird. SVG, wenn der Code noch vergrößert wird, etwa für ein Plakat oder eine Fahrzeugbeschriftung: Ein SVG bleibt in jeder Größe scharf, ein PNG wird beim Hochskalieren unsauber."
				},
				{
					q: "Wie groß muss ein gedruckter QR-Code sein?",
					a: "Als Faustregel gilt ein Zehntel des Leseabstands: Wer aus einem Meter Entfernung scannt, braucht etwa zehn Zentimeter Kantenlänge. Lassen Sie außerdem einen weißen Rand von der Breite mehrerer Module stehen — ohne diese Ruhezone finden viele Kameras den Code nicht."
				},
				{
					q: "Warum wird mein Code nicht erkannt?",
					a: "Meist liegt es am Kontrast oder am fehlenden Rand. Der Vordergrund muss deutlich dunkler sein als der Hintergrund, invertierte Codes lesen viele Kameras nicht. Auch sehr lange Inhalte machen das Muster feiner und damit schwerer erkennbar — kürzen Sie die Adresse, wenn möglich."
				},
				{
					q: "Kann ich damit Codes für Kunden erstellen?",
					a: "Ja, das Werkzeug ist kostenlos und ohne Anmeldung nutzbar, auch geschäftlich. Wenn Sie regelmäßig viele Codes brauchen oder sie aus eigenen Daten erzeugen wollen, lässt sich das automatisieren — sprechen Sie mich an."
				}
			],
			related: [
				"utm-link-generator",
				"visitenkarten-designer",
				"bild-komprimieren"
			]
		},
		en: {
			intro: [
				"A QR code is nothing more than an address in the shape of a picture. Point a phone camera at it and the person lands directly on your website, on your business Wi-Fi, or with your contact details in their address book — without anyone having to type. That is where the practical value sits: every character a customer is asked to enter themselves is an opportunity to mistype it and give up.",
				"This generator produces four kinds of code: plain URLs and text, Wi-Fi credentials, and contact details as a vCard. You can match the foreground and background colours to your own look, and download the result as a PNG for print or an SVG for scalable use.",
				"One thing worth knowing: the code contains its destination directly — it is not a redirect through someone else's service. That means it keeps working indefinitely, but it also means the destination cannot be changed afterwards. If you expect the address to move, point the code at a page of your own whose content you can edit instead."
			],
			useCases: [
				{
					title: "Guest Wi-Fi without a printed note",
					text: "The Wi-Fi code carries the network name and password. Guests connect with one scan instead of copying a 20-character password off a sign."
				},
				{
					title: "Menu, price list, instructions",
					text: "A code on the table, the shelf or the machine leads to the current version — and from then on you replace the page, not the stand."
				},
				{
					title: "A business card that lands in the address book",
					text: "The vCard code transfers name, company, phone and email in one go. Considerably more reliable than typing a card up later."
				},
				{
					title: "Making print measurable",
					text: "Point the code at a link carrying UTM parameters and your analytics will show how many visitors genuinely came from the printed piece."
				},
				{
					title: "Forms on a vehicle or a building site",
					text: "A sticker with a code leads straight to the damage, handover or contact form, without anyone needing to know the address."
				}
			],
			steps: [
				{
					title: "Choose the kind of code",
					description: "Decide between a URL or free text, Wi-Fi access, and contact details. The input fields below change to match that choice."
				},
				{
					title: "Enter the content",
					description: "Fill in the destination — for a website, complete with https://. Wi-Fi adds the network name and password; a vCard adds name, company, phone and email."
				},
				{
					title: "Adjust the colours",
					description: "Foreground and background can be matched to your own look. Keep a clear difference between the two: a code that is too light will not be recognised by many cameras."
				},
				{
					title: "Test it, then download",
					description: "Scan the code once with your own phone before sending it to print. Then save it as a PNG for paper, or as an SVG for layouts that scale."
				}
			],
			privacy: "The code is created entirely in your browser. Neither the destination address nor your Wi-Fi password or contact details are sent to a server or stored anywhere — the tool has no counterpart to send anything to. You can disconnect from the network after the page has loaded and carry on working. With a Wi-Fi password that is not an academic distinction: many online generators send exactly that input to their server to produce the image.",
			faq: [
				{
					q: "Does the QR code expire?",
					a: "No. The code contains its destination directly and is not tied to a service that has to resolve it. It works for as long as the destination is reachable. That is also precisely why the destination cannot be changed afterwards."
				},
				{
					q: "PNG or SVG — which should I use?",
					a: "PNG for anything printed or placed at a fixed size. SVG when the code will be enlarged, for a poster or vehicle lettering: an SVG stays sharp at any size, while a PNG becomes ragged when scaled up."
				},
				{
					q: "How big does a printed QR code need to be?",
					a: "A rule of thumb is one tenth of the reading distance: scanning from one metre away needs roughly ten centimetres of edge length. Also leave a white margin several modules wide — without that quiet zone many cameras will not find the code at all."
				},
				{
					q: "Why is my code not being recognised?",
					a: "Usually it is the contrast or the missing margin. The foreground has to be clearly darker than the background; many cameras will not read an inverted code. Very long content also makes the pattern finer and harder to read — shorten the address where you can."
				},
				{
					q: "Can I create codes for clients with this?",
					a: "Yes, the tool is free and needs no sign-up, commercial use included. If you regularly need many codes, or want to generate them from your own data, that can be automated — get in touch."
				}
			],
			related: [
				"utm-link-generator",
				"visitenkarten-designer",
				"bild-komprimieren"
			]
		}
	},
	"passwort-generator": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Die meisten Passwörter in kleinen Betrieben sind gewachsen, nicht gewählt: der Firmenname mit einer Jahreszahl, der Ort mit einem Ausrufezeichen, ein Muster, das sich auf der Tastatur gut anfühlt. Angriffe raten heute aber nicht Zeichen für Zeichen, sondern probieren Listen aus geleakten Passwörtern und ihre naheliegenden Abwandlungen durch. Gegen diese Listen hilft nur eines: ein Passwort, das niemand gewählt hat, sondern der Zufall.",
				"Dieser Generator erzeugt genau solche Passwörter. Länge und Zeichenauswahl — Großbuchstaben, Kleinbuchstaben, Ziffern, Sonderzeichen — stellen Sie selbst ein, und eine Anzeige schätzt die Stärke des Ergebnisses ein. Auf Wunsch bleiben leicht verwechselbare Zeichen wie große i, kleine L, Null und großes O außen vor: sinnvoll überall dort, wo ein Passwort auch einmal vorgelesen oder abgeschrieben werden muss.",
				"Zur Einordnung: Länge wirkt stärker als Sonderzeichen. Ein zwanzig Zeichen langes Passwort aus Buchstaben und Ziffern ist erheblich schwerer zu brechen als ein achtstelliges mit drei Sonderzeichen — und Sie müssen sich ohnehin keines von beiden merken, wenn Sie einen Passwortmanager verwenden."
			],
			useCases: [
				{
					title: "Zugänge für neue Mitarbeitende",
					text: "Ein zufälliges Erstpasswort, das beim ersten Anmelden geändert wird, statt eines Schemas, das nach dem dritten Mal jeder kennt."
				},
				{
					title: "Router, Kasse, Netzwerkdrucker",
					text: "Geräte, deren Werkspasswort im Handbuch steht und im Internet auffindbar ist. Hier ohne verwechselbare Zeichen erzeugen — es wird abgetippt."
				},
				{
					title: "Gäste-WLAN mit eigenem Passwort",
					text: "Ein langes Zufallspasswort für das Gastnetz, getrennt vom Betriebsnetz. Zusammen mit einem QR-Code muss es niemand eingeben."
				},
				{
					title: "Datenbank- und Dienstzugänge",
					text: "Zugangsdaten, die nur Software benutzt, sollten maximal lang und zufällig sein — sie werden ohnehin nie von Hand eingegeben."
				},
				{
					title: "Verschlüsselte Archive und Sicherungen",
					text: "Ein starkes Passwort für Backups ist die letzte Verteidigungslinie, wenn eine Festplatte oder ein Stick verloren geht."
				}
			],
			steps: [
				{
					title: "Länge festlegen",
					description: "Stellen Sie die gewünschte Länge über den Schieberegler ein. Für Zugänge, die ein Mensch tippt, sind sechzehn Zeichen ein guter Ausgangspunkt; für alles, was in einem Passwortmanager liegt, dürfen es deutlich mehr sein."
				},
				{
					title: "Zeichenarten auswählen",
					description: "Aktivieren Sie Großbuchstaben, Kleinbuchstaben, Ziffern und Sonderzeichen nach Bedarf. Manche Systeme verbieten bestimmte Sonderzeichen — dann schalten Sie sie hier ab, statt das Ergebnis hinterher von Hand zu verändern."
				},
				{
					title: "Verwechselbare Zeichen ausschließen",
					description: "Wenn das Passwort vorgelesen, abgeschrieben oder ausgedruckt wird, blenden Sie große i, kleine L, Null und großes O aus. Das kostet etwas Stärke und erspart die Rückfrage, ob das nun eine Eins oder ein L war."
				},
				{
					title: "Erzeugen, prüfen, übernehmen",
					description: "Lassen Sie sich ein neues Passwort erzeugen, achten Sie auf die Stärkeanzeige und kopieren Sie es direkt in Ihren Passwortmanager. Legen Sie es dort ab, bevor Sie die Seite schließen — das Werkzeug speichert nichts."
				}
			],
			privacy: "Das Passwort entsteht in Ihrem Browser über den kryptografischen Zufallsgenerator des Systems und verlässt Ihr Gerät nicht. Es wird nicht übertragen, nicht protokolliert und nirgends zwischengespeichert; nach dem Schließen der Seite ist es weg. Bei einem Passwortgenerator ist das der entscheidende Punkt — ein Dienst, der das Passwort auf seinem Server erzeugt, kennt es, und Sie können nicht überprüfen, was er damit tut.",
			faq: [
				{
					q: "Wie lang sollte ein Passwort sein?",
					a: "Für Zugänge, die ein Mensch eingibt, sind sechzehn zufällige Zeichen eine gute Untergrenze. Für Zugänge, die nur Software verwendet, spricht nichts gegen dreißig oder mehr. Länge bringt mehr Sicherheit als exotische Sonderzeichen."
				},
				{
					q: "Ist der Zufall hier wirklich zufällig?",
					a: "Das Werkzeug nutzt die Schnittstelle crypto.getRandomValues des Browsers, also den kryptografisch sicheren Zufallsgenerator des Betriebssystems. Das ist derselbe Mechanismus, auf dem auch die Verschlüsselung Ihrer Verbindungen aufbaut — kein simpler Zufall wie bei Math.random."
				},
				{
					q: "Muss ich Passwörter regelmäßig wechseln?",
					a: "Nach heutiger Empfehlung des BSI nicht mehr routinemäßig. Ein starkes, einzigartiges Passwort bleibt so lange gültig, bis es Anlass zur Sorge gibt — etwa nach einem bekannt gewordenen Datenleck. Erzwungene Wechsel führen erfahrungsgemäß zu schwächeren Passwörtern mit hochgezählter Endziffer."
				},
				{
					q: "Wie merke ich mir solche Passwörter?",
					a: "Gar nicht. Nutzen Sie einen Passwortmanager und merken Sie sich genau ein starkes Hauptpasswort. Alles andere liegt verschlüsselt im Manager und wird beim Anmelden eingesetzt."
				},
				{
					q: "Kann ich das Werkzeug im Betrieb einsetzen?",
					a: "Ja, es ist kostenlos, ohne Anmeldung nutzbar und läuft lokal — es gibt keine Übertragung, die eine betriebliche Richtlinie verletzen könnte. Wenn Sie Zugänge für mehrere Personen strukturiert verwalten wollen, ist ein Passwortmanager der nächste Schritt."
				}
			],
			related: ["qr-code-generator", "json-formatter"]
		},
		en: {
			intro: [
				"Most passwords in a small business have grown rather than been chosen: the company name with a year, the town with an exclamation mark, a pattern that feels good on the keyboard. Attacks today do not guess character by character, though — they work through lists of leaked passwords and their obvious variations. There is only one defence against those lists: a password nobody chose, but chance produced.",
				"This generator produces exactly that kind of password. You set the length and the character sets — upper case, lower case, digits, symbols — and a meter estimates the strength of the result. Optionally, easily confused characters such as capital i, lower-case L, zero and capital O are left out: worth doing wherever a password will be read aloud or copied by hand.",
				"For perspective: length does more than symbols do. A twenty-character password of letters and digits is considerably harder to break than an eight-character one with three symbols — and you need to memorise neither of them if you use a password manager."
			],
			useCases: [
				{
					title: "Accounts for new staff",
					text: "A random first password that gets changed at first sign-in, instead of a scheme everyone recognises after the third time."
				},
				{
					title: "Router, till, network printer",
					text: "Devices whose factory password is printed in the manual and findable online. Generate these without ambiguous characters — they get typed by hand."
				},
				{
					title: "Guest Wi-Fi with its own password",
					text: "A long random password for the guest network, separate from the business one. Paired with a QR code, nobody has to enter it at all."
				},
				{
					title: "Database and service accounts",
					text: "Credentials only software ever uses should be as long and as random as possible — they are never typed by a person anyway."
				},
				{
					title: "Encrypted archives and backups",
					text: "A strong password on a backup is the last line of defence when a drive or a stick goes missing."
				}
			],
			steps: [
				{
					title: "Set the length",
					description: "Use the slider to choose the length. For accounts a human types, sixteen characters is a good starting point; for anything living in a password manager, considerably more is fine."
				},
				{
					title: "Pick the character sets",
					description: "Enable upper case, lower case, digits and symbols as needed. Some systems forbid particular symbols — switch them off here rather than editing the result by hand afterwards."
				},
				{
					title: "Exclude ambiguous characters",
					description: "If the password will be read aloud, copied down or printed, hide capital i, lower-case L, zero and capital O. It costs a little strength and saves the question of whether that was a one or an L."
				},
				{
					title: "Generate, check, store",
					description: "Generate a password, watch the strength meter, and copy it straight into your password manager. Store it there before you close the page — the tool keeps nothing."
				}
			],
			privacy: "The password is created in your browser using the operating system's cryptographic random generator, and it does not leave your device. It is not transmitted, not logged and not cached anywhere; once you close the page it is gone. With a password generator that is the decisive point — a service that generates the password on its server knows it, and you have no way to check what it does with it.",
			faq: [
				{
					q: "How long should a password be?",
					a: "For accounts a person types, sixteen random characters is a sensible floor. For accounts only software uses, there is nothing against thirty or more. Length buys more security than exotic symbols do."
				},
				{
					q: "Is the randomness here genuinely random?",
					a: "The tool uses the browser's crypto.getRandomValues interface, which is the operating system's cryptographically secure random generator. That is the same mechanism your encrypted connections are built on — not the simple randomness of Math.random."
				},
				{
					q: "Should I change passwords regularly?",
					a: "By current guidance, not as a routine. A strong, unique password stays valid until there is a reason for concern — after a known breach, for instance. Forced rotation reliably produces weaker passwords with an incremented digit on the end."
				},
				{
					q: "How am I supposed to remember these?",
					a: "You are not. Use a password manager and memorise exactly one strong master password. Everything else lives encrypted in the manager and is filled in for you at sign-in."
				},
				{
					q: "Can I use this at work?",
					a: "Yes. It is free, needs no sign-up and runs locally, so there is no transmission that could breach a company policy. If you need to manage accounts for several people in a structured way, a password manager is the next step."
				}
			],
			related: ["qr-code-generator", "json-formatter"]
		}
	},
	"utm-link-generator": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Wer Werbung schaltet, einen Newsletter verschickt oder einen Flyer verteilt, sieht in der Website-Statistik hinterher meist nur eines: Es kamen Besucher. Woher genau, bleibt offen — und damit auch die Frage, welche Maßnahme sich gelohnt hat. UTM-Parameter lösen das, indem sie die Herkunft an den Link selbst hängen. Ihre Statistik liest sie aus und ordnet den Besuch der richtigen Quelle zu.",
				"Ein solcher Link sieht aus wie Ihre normale Adresse, ergänzt um Angaben wie utm_source, utm_medium und utm_campaign. Dieses Werkzeug baut ihn korrekt zusammen: Es kodiert Sonderzeichen, wandelt Ihre Eingaben in saubere Kleinschreibung ohne Leerzeichen um und zeigt den fertigen Link zum Kopieren an.",
				"Der Nutzen steht und fällt mit der Einheitlichkeit. Newsletter, newsletter und Newsletter-Mai sind für die Auswertung drei verschiedene Quellen, und niemand merkt es, bis der Bericht in fünf Zeilen zerfällt, die alle dasselbe meinen. Legen Sie sich einmal eine Schreibweise fest und halten Sie sich daran."
			],
			useCases: [
				{
					title: "Newsletter auswerten",
					text: "Ein eigener Link je Aussendung zeigt, welches Thema tatsächlich Klicks gebracht hat — und nicht nur, wer die Mail geöffnet hat."
				},
				{
					title: "Bezahlte Anzeigen trennen",
					text: "Getrennte Kennzeichnung je Plattform und Anzeige macht sichtbar, welches Motiv Besucher bringt und welches nur Budget verbraucht."
				},
				{
					title: "Print messbar machen",
					text: "Der Link hinter einem QR-Code auf Flyer, Plakat oder Fahrzeug macht aus Druckwerbung eine Maßnahme mit nachvollziehbarem Ergebnis."
				},
				{
					title: "Einträge in Verzeichnissen",
					text: "Branchenbücher, Kleinanzeigen und Kartendienste bekommen jeweils eigene Links — so sehen Sie, welcher Eintrag seinen Preis wert ist."
				},
				{
					title: "Social-Media-Profile",
					text: "Der Link im Profil bekommt eine eigene Kennzeichnung, getrennt von Links in einzelnen Beiträgen."
				}
			],
			steps: [
				{
					title: "Zieladresse eintragen",
					description: "Beginnen Sie mit der Seite, auf der die Besucher landen sollen — vollständig mit https:// und möglichst genau die passende Unterseite, nicht pauschal die Startseite."
				},
				{
					title: "Quelle und Medium angeben",
					description: "Die Quelle ist, wo der Link steht: newsletter, instagram, flyer. Das Medium ist die Art: email, social, print, cpc. Beide Felder sind das Minimum, damit eine Auswertung überhaupt etwas trennen kann."
				},
				{
					title: "Kampagne benennen",
					description: "Die Kampagne fasst eine Maßnahme zusammen, etwa fruehjahr-2026 oder tag-der-offenen-tuer. Verwenden Sie denselben Namen über alle Kanäle einer Aktion, sonst lässt sie sich später nicht als Ganzes auswerten."
				},
				{
					title: "Link kopieren und einsetzen",
					description: "Kopieren Sie den fertigen Link und verwenden Sie ihn überall dort, wo diese Quelle verlinkt. Prüfen Sie ihn einmal im Browser: Die Seite muss normal laden, die Parameter stehen sichtbar in der Adresszeile."
				}
			],
			privacy: "Der Link wird ausschließlich in Ihrem Browser zusammengesetzt; weder Zieladresse noch Kampagnenname werden übertragen oder gespeichert. Ein Hinweis zur Sache selbst: UTM-Parameter sind für Ihre Besucher sichtbar, sie stehen in der Adresszeile. Schreiben Sie deshalb nichts hinein, was nicht öffentlich sein soll — interne Kürzel, Budgetzahlen oder Kundennamen haben dort nichts verloren.",
			faq: [
				{
					q: "Welche Parameter brauche ich wirklich?",
					a: "utm_source und utm_medium sind das Minimum, utm_campaign kommt dazu, sobald Sie mehrere Aktionen unterscheiden wollen. utm_term und utm_content sind Feinheiten für Suchanzeigen und A/B-Tests und können in den meisten Fällen leer bleiben."
				},
				{
					q: "Schadet ein UTM-Link meinem SEO?",
					a: "Für Links, die auf Ihre eigene Seite zeigen und in Werbung, Newslettern oder auf Druckerzeugnissen stehen, ist das unkritisch. Verwenden Sie UTM-Parameter aber nicht für die interne Verlinkung innerhalb Ihrer Website — dort erzeugen sie mehrere Adressen für dieselbe Seite und stören die Auswertung."
				},
				{
					q: "Warum werden meine Eingaben kleingeschrieben?",
					a: "Weil Auswertungswerkzeuge Groß- und Kleinschreibung unterscheiden. Newsletter und newsletter erscheinen als zwei getrennte Quellen im Bericht. Das Werkzeug vereinheitlicht deshalb automatisch und ersetzt Leerzeichen durch Bindestriche."
				},
				{
					q: "Funktioniert das auch ohne Google Analytics?",
					a: "Ja. UTM-Parameter sind eine reine Konvention in der Adresse, kein Google-Produkt. Matomo, Plausible, Fathom und praktisch jede Server-Logauswertung verstehen sie ebenfalls."
				},
				{
					q: "Kann ich den Link kürzen?",
					a: "Ja, ein Kurzlink-Dienst oder eine eigene Weiterleitung behält die Parameter beim Weiterleiten bei. Für gedruckte Werbung ist das sinnvoll — dort steht ohnehin meist ein QR-Code, und dann spielt die Länge des Links keine Rolle mehr."
				}
			],
			related: ["qr-code-generator", "kontrast-checker"]
		},
		en: {
			intro: [
				"If you run ads, send a newsletter or hand out flyers, your website statistics afterwards usually tell you one thing: visitors arrived. Exactly where from stays open — and with it the question of which effort paid off. UTM parameters solve that by attaching the origin to the link itself. Your analytics reads them and files the visit under the right source.",
				"Such a link looks like your normal address, extended with values like utm_source, utm_medium and utm_campaign. This tool assembles it correctly: it encodes special characters, turns your input into clean lower case without spaces, and shows the finished link ready to copy.",
				"The value of all this stands or falls with consistency. Newsletter, newsletter and Newsletter-May are three different sources to a report, and nobody notices until it splits into five rows that all mean the same thing. Decide on one spelling and stick to it."
			],
			useCases: [
				{
					title: "Measuring a newsletter",
					text: "A separate link per send shows which subject actually produced clicks — not merely who opened the mail."
				},
				{
					title: "Separating paid ads",
					text: "Distinct tagging per platform and creative makes it visible which one brings visitors and which one only spends budget."
				},
				{
					title: "Making print measurable",
					text: "The link behind a QR code on a flyer, poster or vehicle turns printed advertising into something with a traceable result."
				},
				{
					title: "Directory listings",
					text: "Trade directories, classifieds and map services each get their own link — so you can see which listing is worth its price."
				},
				{
					title: "Social media profiles",
					text: "The link in a profile gets its own tagging, kept separate from links inside individual posts."
				}
			],
			steps: [
				{
					title: "Enter the destination",
					description: "Start with the page visitors should land on — complete with https://, and ideally the precise sub-page rather than the home page by default."
				},
				{
					title: "Give a source and a medium",
					description: "The source is where the link sits: newsletter, instagram, flyer. The medium is the kind: email, social, print, cpc. Both are the minimum for a report to separate anything at all."
				},
				{
					title: "Name the campaign",
					description: "The campaign groups one effort together, such as spring-2026 or open-day. Use the same name across every channel of one activity, or it cannot be evaluated as a whole later."
				},
				{
					title: "Copy the link and use it",
					description: "Copy the finished link and use it everywhere that source links to you. Try it once in a browser: the page must load normally, with the parameters visible in the address bar."
				}
			],
			privacy: "The link is assembled entirely in your browser; neither the destination nor the campaign name is transmitted or stored. A note about the thing itself: UTM parameters are visible to your visitors, sitting in plain view in the address bar. So do not put anything in them that should not be public — internal codes, budget figures or client names have no place there.",
			faq: [
				{
					q: "Which parameters do I actually need?",
					a: "utm_source and utm_medium are the minimum; utm_campaign joins them as soon as you want to tell several activities apart. utm_term and utm_content are refinements for search ads and A/B tests and can stay empty in most cases."
				},
				{
					q: "Do UTM links hurt my SEO?",
					a: "For links pointing at your own site from ads, newsletters or printed material this is not a concern. Do not use UTM parameters for internal links within your website, though — there they create several addresses for one page and muddle the reporting."
				},
				{
					q: "Why is my input converted to lower case?",
					a: "Because analytics tools distinguish upper and lower case. Newsletter and newsletter appear as two separate sources in the report. The tool therefore normalises automatically and replaces spaces with hyphens."
				},
				{
					q: "Does this work without Google Analytics?",
					a: "Yes. UTM parameters are a convention in the address, not a Google product. Matomo, Plausible, Fathom and practically any server log analysis understand them too."
				},
				{
					q: "Can I shorten the link?",
					a: "Yes — a link shortener or a redirect of your own preserves the parameters when forwarding. For printed advertising that makes sense; there a QR code usually carries the link anyway, at which point its length stops mattering."
				}
			],
			related: ["qr-code-generator", "kontrast-checker"]
		}
	},
	"json-formatter": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"JSON ist das Format, in dem sich Programme heute Daten schicken: Schnittstellen antworten damit, Konfigurationsdateien sind darin geschrieben, Exporte aus Warenwirtschaft, Shop oder Buchhaltung liegen oft in dieser Form vor. Solange alles funktioniert, sieht man es nie. Man sieht es genau dann, wenn etwas klemmt — und dann meist als eine einzige, endlos lange Zeile ohne Umbrüche.",
				"Dieses Werkzeug macht daraus lesbaren Text: Es rückt die Struktur ein, prüft sie auf Gültigkeit und nennt bei einem Fehler die Stelle mit Zeile und Spalte, statt nur zu behaupten, irgendwo stimme etwas nicht. Umgekehrt minimiert es auch — entfernt also alle überflüssigen Leerzeichen, wenn die Daten wieder kompakt weitergegeben werden sollen.",
				"Für den Alltag heißt das: Sie können eine Schnittstellenantwort selbst ansehen, bevor Sie sie weitergeben, und eine abgelehnte Konfigurationsdatei prüfen, ohne zu raten. Häufigste Ursachen sind ein Komma hinter dem letzten Eintrag, einfache statt doppelte Anführungszeichen und eine Klammer, die nicht geschlossen wurde."
			],
			useCases: [
				{
					title: "Schnittstellenantwort lesbar machen",
					text: "Eine API-Antwort als eine Zeile ist für Menschen unbrauchbar. Eingerückt sehen Sie in Sekunden, welche Felder tatsächlich geliefert werden."
				},
				{
					title: "Abgelehnte Konfiguration prüfen",
					text: "Wenn ein Programm eine Datei nicht annimmt, zeigt die Prüfung die genaue Position des Syntaxfehlers statt einer allgemeinen Fehlermeldung."
				},
				{
					title: "Export vor dem Import kontrollieren",
					text: "Vor dem Einspielen in ein anderes System einmal ansehen, ob Struktur und Feldnamen dem entsprechen, was das Zielsystem erwartet."
				},
				{
					title: "Daten kompakt weitergeben",
					text: "Minimiertes JSON spart Platz und Übertragungszeit — sinnvoll überall dort, wo die Datei nicht von Menschen gelesen wird."
				},
				{
					title: "Fehler nachvollziehbar melden",
					text: "Ein eingerückter Ausschnitt mit markierter Fehlerstelle macht aus einer vagen Störungsmeldung eine, mit der sich arbeiten lässt."
				}
			],
			steps: [
				{
					title: "JSON einfügen",
					description: "Fügen Sie den Inhalt in das Eingabefeld ein — eine ganze Datei, eine Schnittstellenantwort oder auch nur den Ausschnitt, um den es geht."
				},
				{
					title: "Formatieren oder prüfen",
					description: "Das Formatieren rückt die Struktur ein und macht die Verschachtelung sichtbar. Ist der Inhalt ungültig, erscheint stattdessen die Fehlermeldung mit Position, Zeile und Spalte."
				},
				{
					title: "Fehlerstelle beheben",
					description: "Springen Sie an die genannte Stelle und prüfen Sie zuerst die üblichen Verdächtigen: ein Komma nach dem letzten Element, einfache Anführungszeichen, ein fehlendes Klammerpaar oder ein Zeilenumbruch mitten in einer Zeichenkette."
				},
				{
					title: "Ergebnis übernehmen",
					description: "Kopieren Sie das eingerückte Ergebnis zur Weiterverwendung — oder minimieren Sie es vorher, wenn es maschinell weiterverarbeitet wird."
				}
			],
			privacy: "Die Verarbeitung findet vollständig in Ihrem Browser statt; der eingefügte Inhalt wird nicht übertragen, nicht gespeichert und nicht protokolliert. Das ist bei diesem Werkzeug mehr als eine Formalie: In JSON-Daten stehen regelmäßig Kundendaten, Bestellungen, Zugangsschlüssel oder Preise. Wer solche Inhalte in ein beliebiges Online-Formular einfügt, gibt sie aus der Hand — hier verlassen sie das Gerät nicht.",
			faq: [
				{
					q: "Werden meine Daten hochgeladen?",
					a: "Nein. Das Formatieren und Prüfen läuft als JavaScript in Ihrem Browser. Es gibt keinen Server, der den Inhalt entgegennimmt — Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten."
				},
				{
					q: "Was bedeutet die Fehlermeldung mit Position?",
					a: "Die Position ist die Zeichenanzahl vom Anfang des Textes, Zeile und Spalte rechnen das in eine Stelle im Text um. Der Fehler liegt in aller Regel unmittelbar davor: Ein Zeichen, das an dieser Stelle nicht erwartet wurde, ist meist die Folge eines vergessenen Kommas oder einer offenen Klammer weiter oben."
				},
				{
					q: "Warum ist mein JSON ungültig, obwohl es richtig aussieht?",
					a: "Die drei häufigsten Ursachen sind ein Komma hinter dem letzten Element einer Liste, einfache statt doppelter Anführungszeichen und Kommentare. Alle drei sind in JavaScript erlaubt, in JSON aber nicht."
				},
				{
					q: "Kann ich sehr große Dateien verarbeiten?",
					a: "Bis in den Bereich einiger Megabyte arbeitet das Werkzeug problemlos. Weil alles im Browser läuft, ist die Grenze der Arbeitsspeicher Ihres Geräts — bei sehr großen Exporten wird die Seite langsam, statt eine Fehlermeldung zu zeigen."
				},
				{
					q: "Verändert das Formatieren meine Daten?",
					a: "Nein, nur die Darstellung. Einrückungen und Zeilenumbrüche sind in JSON bedeutungslos; Werte, Reihenfolge und Struktur bleiben unangetastet."
				}
			],
			related: ["kontrast-checker", "passwort-generator"]
		},
		en: {
			intro: [
				"JSON is the format programs use to send each other data today: interfaces answer in it, configuration files are written in it, and exports from inventory, shop or accounting systems often arrive in this shape. As long as everything works, you never see it. You see it precisely when something jams — and then usually as one endless line with no breaks in it.",
				"This tool turns that into readable text: it indents the structure, checks that it is valid, and on an error names the spot with a line and a column instead of merely claiming something is wrong somewhere. It also does the reverse — stripping every unnecessary space when the data needs to go back out compactly.",
				"In practice that means you can inspect an interface response yourself before passing it on, and check a rejected configuration file without guessing. The most common causes are a comma after the last entry, single instead of double quotes, and a bracket that was never closed."
			],
			useCases: [
				{
					title: "Making an API response readable",
					text: "An API response as a single line is useless to a human. Indented, you can see in seconds which fields are actually being delivered."
				},
				{
					title: "Checking a rejected configuration",
					text: "When a program refuses a file, the validation shows the exact position of the syntax error rather than a generic complaint."
				},
				{
					title: "Inspecting an export before importing it",
					text: "Before loading data into another system, check whether the structure and field names match what the target expects."
				},
				{
					title: "Passing data on compactly",
					text: "Minified JSON saves space and transfer time — worth doing wherever the file is not read by people."
				},
				{
					title: "Reporting an error usefully",
					text: "An indented excerpt with the failing position marked turns a vague fault report into one somebody can work with."
				}
			],
			steps: [
				{
					title: "Paste the JSON",
					description: "Drop the content into the input field — a whole file, an interface response, or just the excerpt you are asking about."
				},
				{
					title: "Format or validate",
					description: "Formatting indents the structure and makes the nesting visible. If the content is invalid, the error message appears instead, with the position, line and column."
				},
				{
					title: "Fix the failing spot",
					description: "Jump to the position named and check the usual suspects first: a comma after the last element, single quotes, a missing pair of brackets, or a line break in the middle of a string."
				},
				{
					title: "Take the result",
					description: "Copy the indented output for onward use — or minify it first if it is going to be processed by a machine."
				}
			],
			privacy: "Processing happens entirely in your browser; the content you paste is not transmitted, not stored and not logged. With this tool that is more than a formality: JSON data regularly contains customer records, orders, access keys or prices. Pasting that into an arbitrary online form gives it away — here it never leaves your device.",
			faq: [
				{
					q: "Is my data uploaded?",
					a: "No. Formatting and validation run as JavaScript in your browser. There is no server that receives the content — you can disconnect from the network after the page loads and keep working."
				},
				{
					q: "What does the error position mean?",
					a: "The position is the character count from the start of the text, and the line and column translate that into a spot you can find. The fault is almost always immediately before it: a character that was not expected there is usually the consequence of a forgotten comma or an open bracket further up."
				},
				{
					q: "Why is my JSON invalid when it looks fine?",
					a: "The three most common causes are a comma after the last element of a list, single instead of double quotes, and comments. All three are legal in JavaScript and none of them are in JSON."
				},
				{
					q: "Can I process very large files?",
					a: "Up to the low megabytes the tool handles it comfortably. Because everything runs in the browser, the limit is your device's memory — with very large exports the page slows down rather than showing an error."
				},
				{
					q: "Does formatting change my data?",
					a: "No, only the presentation. Indentation and line breaks carry no meaning in JSON; values, order and structure are left untouched."
				}
			],
			related: ["kontrast-checker", "passwort-generator"]
		}
	},
	"kontrast-checker": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Ob Text lesbar ist, entscheidet nicht der Geschmack, sondern der Unterschied zwischen Schrift- und Hintergrundhelligkeit. Die Web-Richtlinien für Barrierefreiheit drücken ihn als Verhältnis aus: 1:1 bedeutet identische Farben, 21:1 ist Schwarz auf Weiß. Ab 4,5:1 gilt normaler Text als ausreichend lesbar, große Schrift ab 3:1 — das ist die Stufe AA. Wer strenger sein will, zielt auf AAA mit 7:1.",
				"Dieses Werkzeug rechnet das Verhältnis für ein Farbpaar aus und sagt Ihnen unmittelbar, welche Stufen bestanden sind: AA und AAA, jeweils für normale und für große Schrift. Sie geben die beiden Farben als Hex-Wert ein oder wählen sie über die Farbfelder.",
				"Der praktische Nutzen liegt weniger in der Note als in der Korrektur: Fast jedes Corporate-Grau auf Weiß scheitert knapp, und fast immer reicht es, die Schrift eine Spur dunkler zu ziehen, statt die Gestaltung umzuwerfen. Wichtig ist außerdem, was oft vergessen wird — geprüft wird jede Kombination, die tatsächlich vorkommt: heller Text auf einem Farbbutton, Text auf einem Bild, der Hinweistext in einem Formularfeld."
			],
			useCases: [
				{
					title: "Neue Website vor dem Start prüfen",
					text: "Fließtext, Überschriften, Links und Buttons einmal durchgehen, bevor die Seite live geht — später ist jede Änderung teurer."
				},
				{
					title: "Farben aus dem Logo übernehmen",
					text: "Eine Markenfarbe, die im Logo gut aussieht, ist als Schriftfarbe oft zu hell. Die Prüfung zeigt, ob eine dunklere Variante nötig ist."
				},
				{
					title: "Buttons und Hinweise kontrollieren",
					text: "Weiße Schrift auf einem Aktionsbutton ist der häufigste stille Durchfaller — der Button fällt auf, der Text darauf ist trotzdem schwer lesbar."
				},
				{
					title: "Öffentliche Aufträge vorbereiten",
					text: "Für Websites öffentlicher Stellen ist Barrierefreiheit in Deutschland verbindlich. Die Kontrastprüfung ist einer der ersten Punkte jeder Abnahme."
				},
				{
					title: "Dunkles Design gegenprüfen",
					text: "Helle Schrift auf dunklem Grund verhält sich anders als umgekehrt. Beide Varianten einer Seite gehören getrennt geprüft."
				}
			],
			steps: [
				{
					title: "Textfarbe eintragen",
					description: "Geben Sie die Schriftfarbe als Hex-Wert ein oder wählen Sie sie über das Farbfeld. Kurzformen wie #fff werden ebenso verstanden wie die lange Schreibweise."
				},
				{
					title: "Hintergrundfarbe eintragen",
					description: "Entscheidend ist die Farbe, die im fertigen Layout tatsächlich hinter dem Text liegt — also die Fläche der Karte oder des Buttons, nicht die Seitenfarbe dahinter."
				},
				{
					title: "Ergebnis ablesen",
					description: "Das Verhältnis erscheint zusammen mit vier Bewertungen: AA und AAA, jeweils für normale und große Schrift. Groß bedeutet ab 18,66 Pixel fett oder ab 24 Pixel regulär."
				},
				{
					title: "Nachjustieren",
					description: "Reicht es nicht, verändern Sie zuerst die Helligkeit der Schriftfarbe und lassen den Farbton stehen — so bleibt der Markeneindruck erhalten und der Text wird trotzdem lesbar."
				}
			],
			privacy: "Die Berechnung läuft vollständig in Ihrem Browser; es werden keine Farbwerte übertragen oder gespeichert. Das Werkzeug prüft ausschließlich das Kontrastverhältnis nach WCAG 2.1 — es ist damit ein Baustein der Barrierefreiheit, nicht deren Nachweis. Tastaturbedienbarkeit, sinnvolle Alternativtexte, Formularbeschriftungen und eine schlüssige Überschriftenstruktur gehören ebenso dazu.",
			faq: [
				{
					q: "Was ist der Unterschied zwischen AA und AAA?",
					a: "AA verlangt 4,5:1 für normalen und 3:1 für großen Text und ist die Stufe, auf die in der Praxis abgezielt wird. AAA verlangt 7:1 beziehungsweise 4,5:1. AAA ist für längere Fließtexte anspruchsvoll und wird meist nur dort verlangt, wo eine besonders breite Leserschaft erreicht werden muss."
				},
				{
					q: "Ab wann gilt Schrift als groß?",
					a: "Ab 18,66 Pixel in Fettschrift oder ab 24 Pixel in normaler Stärke — das entspricht etwa 14 beziehungsweise 18 Punkt. Darunter gilt die strengere Anforderung für normalen Text."
				},
				{
					q: "Gilt das auch für Logos und Bilder?",
					a: "Für reine Logos nicht, die sind ausgenommen. Text, der als Teil eines Bildes gesetzt ist, muss die Anforderung dagegen erfüllen — und Bedienelemente sowie Grafiken, die Information tragen, brauchen mindestens 3:1 gegenüber ihrer Umgebung."
				},
				{
					q: "Mein Grau scheitert knapp. Was tun?",
					a: "Ziehen Sie die Helligkeit der Schriftfarbe herunter und lassen Sie den Farbton unverändert. In den meisten Fällen genügen wenige Prozent, um von 4,1:1 auf über 4,5:1 zu kommen, ohne dass sich der Gesamteindruck sichtbar ändert."
				},
				{
					q: "Muss meine Website barrierefrei sein?",
					a: "Für öffentliche Stellen ist es in Deutschland verbindlich. Seit Juni 2025 gelten über das Barrierefreiheitsstärkungsgesetz zudem Anforderungen für viele privatwirtschaftliche Online-Angebote, etwa im Onlinehandel; Kleinstunternehmen sind teilweise ausgenommen. Unabhängig von der Pflicht gilt: Lesbarer Text nutzt allen, auch bei Sonnenlicht auf dem Telefon."
				}
			],
			related: [
				"json-formatter",
				"bild-komprimieren",
				"barrierefreiheitserklaerung-generator"
			]
		},
		en: {
			intro: [
				"Whether text is readable is not decided by taste but by the difference in brightness between the type and its background. The web accessibility guidelines express that as a ratio: 1:1 means identical colours, 21:1 is black on white. From 4.5:1 normal text counts as sufficiently readable, large type from 3:1 — that is level AA. If you want to be stricter, aim for AAA at 7:1.",
				"This tool calculates the ratio for a pair of colours and tells you straight away which levels pass: AA and AAA, each for normal and for large text. Enter the two colours as hex values or pick them from the colour fields.",
				"The practical value lies less in the grade than in the correction: almost every corporate grey on white fails narrowly, and almost always it is enough to pull the type a shade darker rather than rework the design. What is often forgotten matters too — every combination that actually occurs needs checking: light text on a coloured button, text over an image, the hint text inside a form field."
			],
			useCases: [
				{
					title: "Checking a new website before launch",
					text: "Walk through body text, headings, links and buttons once before the site goes live — afterwards every change costs more."
				},
				{
					title: "Reusing colours from the logo",
					text: "A brand colour that looks right in a logo is often too light as type. The check shows whether a darker variant is needed."
				},
				{
					title: "Testing buttons and notices",
					text: "White type on an action button is the most common silent failure — the button stands out, the text on it is still hard to read."
				},
				{
					title: "Preparing for public-sector work",
					text: "Accessibility is binding for public bodies' websites. A contrast check is one of the first items in any acceptance review."
				},
				{
					title: "Verifying a dark design",
					text: "Light type on a dark ground behaves differently from the reverse. Both variants of a page deserve to be checked separately."
				}
			],
			steps: [
				{
					title: "Enter the text colour",
					description: "Give the type colour as a hex value or pick it from the colour field. Short forms such as #fff are understood as well as the long notation."
				},
				{
					title: "Enter the background colour",
					description: "What matters is the colour that genuinely sits behind the text in the finished layout — the surface of the card or the button, not the page colour behind that."
				},
				{
					title: "Read the result",
					description: "The ratio appears together with four verdicts: AA and AAA, each for normal and large text. Large means from 18.66 pixels bold or from 24 pixels regular."
				},
				{
					title: "Adjust",
					description: "If it falls short, change the brightness of the type colour first and leave the hue alone — the brand impression survives and the text becomes readable anyway."
				}
			],
			privacy: "The calculation runs entirely in your browser; no colour values are transmitted or stored. The tool checks the contrast ratio under WCAG 2.1 and nothing else — it is one building block of accessibility, not a certificate of it. Keyboard operability, meaningful alternative texts, labelled form fields and a coherent heading structure all belong to it as well.",
			faq: [
				{
					q: "What is the difference between AA and AAA?",
					a: "AA requires 4.5:1 for normal and 3:1 for large text, and is the level aimed at in practice. AAA requires 7:1 and 4.5:1 respectively. AAA is demanding for longer body text and is usually only required where a particularly broad readership must be reached."
				},
				{
					q: "When does type count as large?",
					a: "From 18.66 pixels in bold or from 24 pixels at normal weight — roughly 14 and 18 point. Below that the stricter requirement for normal text applies."
				},
				{
					q: "Does this apply to logos and images?",
					a: "Not to logos as such, which are exempt. Text set as part of an image does have to meet the requirement — and interface controls and graphics that carry information need at least 3:1 against their surroundings."
				},
				{
					q: "My grey fails narrowly. What now?",
					a: "Reduce the brightness of the type colour and leave the hue unchanged. In most cases a few per cent is enough to move from 4.1:1 to over 4.5:1 without the overall impression visibly changing."
				},
				{
					q: "Does my website have to be accessible?",
					a: "For public bodies in Germany it is binding. Since June 2025 the Barrierefreiheitsstärkungsgesetz has also imposed requirements on many private online offerings, in online retail for instance; micro-enterprises are partly exempt. Regardless of obligation: readable text helps everyone, including in sunlight on a phone."
				}
			],
			related: [
				"json-formatter",
				"bild-komprimieren",
				"barrierefreiheitserklaerung-generator"
			]
		}
	},
	"bild-komprimieren": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Bilder aus einer Handy- oder Systemkamera sind für das Web unnötig groß: vier bis zwölf Megabyte, mehrere tausend Pixel breit. Auf einer Website wird davon meist ein Ausschnitt von tausend Pixeln angezeigt — der Rest wird übertragen, bezahlt und dann verworfen. Auf dem Telefon im Mobilfunknetz entscheidet das darüber, ob eine Seite in einer oder in acht Sekunden steht.",
				"Dieses Werkzeug verkleinert Bilder auf eine Zielbreite und komprimiert sie mit einstellbarer Qualität. Es zeigt die neue Dateigröße im Vergleich zur alten und gibt das Ergebnis als JPEG oder WebP aus. WebP ist dabei in aller Regel die bessere Wahl: gleiche sichtbare Qualität bei spürbar kleinerer Datei, und alle aktuellen Browser verstehen es.",
				"Eine sinnvolle Faustregel für den Alltag: Zielbreite 1600 Pixel für großflächige Bilder, 800 für Bilder in Textbreite, Qualität um 80 Prozent. Damit landen die meisten Fotos zwischen 60 und 200 Kilobyte — statt bei acht Megabyte — ohne dass ein Unterschied auffällt."
			],
			useCases: [
				{
					title: "Bilder für die eigene Website",
					text: "Produktfotos, Referenzbilder und Teamfotos vor dem Hochladen verkleinern. Der schnellste Hebel für eine schnellere Seite."
				},
				{
					title: "Anhänge, die durch das Postfach passen",
					text: "Viele Postfächer nehmen Anhänge nur bis zu einer bestimmten Größe an. Fünf komprimierte Fotos passen, wo zwei Originale scheitern."
				},
				{
					title: "Fotos für Kleinanzeigen und Portale",
					text: "Verkaufsportale rechnen Bilder ohnehin herunter — oft schlechter als nötig. Wer selbst verkleinert, behält die Kontrolle über das Ergebnis."
				},
				{
					title: "Dokumentation aus dem Betrieb",
					text: "Aufmaß-, Schadens- und Baufortschrittsfotos summieren sich schnell auf Gigabyte. Komprimiert bleiben sie lesbar und das Archiv handhabbar."
				},
				{
					title: "Bilder für Newsletter",
					text: "Große Bilder in E-Mails werden von manchen Programmen gar nicht erst geladen und verlängern die Ladezeit auf dem Telefon deutlich."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "Wählen Sie eine Datei im Format JPG, PNG oder WebP. Die Vorschau und die ursprüngliche Dateigröße erscheinen sofort."
				},
				{
					title: "Zielbreite festlegen",
					description: "Geben Sie an, wie breit das Bild höchstens werden soll. Die Höhe wird im Seitenverhältnis mitgerechnet. Für die Anzeige im Web sind 1600 Pixel bei großen Bildern und 800 Pixel innerhalb von Text gute Werte."
				},
				{
					title: "Qualität einstellen",
					description: "Zwischen 70 und 85 Prozent liegt der brauchbare Bereich; darunter werden Kanten und Flächen sichtbar unruhig. Die Wirkung sehen Sie unmittelbar an der neuen Dateigröße."
				},
				{
					title: "Herunterladen",
					description: "Speichern Sie das Ergebnis als JPEG oder WebP. Bei Fotos ist WebP fast immer kleiner; für Grafiken mit harten Kanten oder Transparenz ist es ebenfalls die bessere Wahl."
				}
			],
			privacy: "Das Bild wird nicht hochgeladen. Es wird im Browser über ein Canvas-Element neu gezeichnet und dort komprimiert — die Datei verlässt Ihr Gerät zu keinem Zeitpunkt. Das ist der eigentliche Unterschied zu den verbreiteten Kompressionsdiensten: Dort landen Ihre Fotos auf einem fremden Server, was bei Baustellen-, Schadens- oder Personenaufnahmen nicht nur eine Geschmacksfrage ist, sondern eine datenschutzrechtliche.",
			faq: [
				{
					q: "Verliert das Bild sichtbar an Qualität?",
					a: "Bei 80 Prozent Qualität sehen die wenigsten Betrachter einen Unterschied zum Original, während die Datei um ein Vielfaches kleiner wird. Deutlich sichtbar wird die Kompression meist erst unterhalb von 60 Prozent, zuerst an weichen Farbverläufen wie einem Himmel."
				},
				{
					q: "JPEG oder WebP?",
					a: "WebP, sofern das Zielsystem es annimmt: gleiche wahrgenommene Qualität bei etwa 25 bis 35 Prozent weniger Daten, dazu Transparenz. JPEG bleibt die sichere Wahl für ältere Programme und für Portale, die nur dieses Format akzeptieren."
				},
				{
					q: "Werden meine Bilder auf einen Server geladen?",
					a: "Nein. Die gesamte Verarbeitung findet in Ihrem Browser statt; es gibt keine Gegenstelle, die die Datei entgegennehmen könnte. Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten."
				},
				{
					q: "Bleiben Aufnahmedatum und Ort erhalten?",
					a: "Nein. Beim Neuzeichnen im Browser gehen die EXIF-Daten verloren, also auch GPS-Koordinaten und Kameramodell. Für Bilder im Internet ist das ein Vorteil — wenn Sie die Angaben brauchen, bewahren Sie das Original auf."
				},
				{
					q: "Kann ich mehrere Bilder auf einmal verarbeiten?",
					a: "Das Werkzeug arbeitet Bild für Bild. Wenn bei Ihnen regelmäßig ganze Ordner anfallen — etwa aus der Baustellendokumentation —, lässt sich das automatisieren, statt es von Hand zu wiederholen."
				}
			],
			related: [
				"pdf-werkzeuge",
				"qr-code-generator",
				"ki-kennzeichnung-bilder"
			]
		},
		en: {
			intro: [
				"Photos out of a phone or system camera are needlessly large for the web: four to twelve megabytes, several thousand pixels wide. A website usually displays a thousand-pixel crop of that — the rest is transferred, paid for and then discarded. On a phone over mobile data, that is the difference between a page appearing in one second and in eight.",
				"This tool scales images down to a target width and compresses them at an adjustable quality. It shows the new file size next to the old one and outputs the result as JPEG or WebP. WebP is usually the better choice: the same apparent quality at a noticeably smaller file, and every current browser understands it.",
				"A workable rule of thumb: a target width of 1600 pixels for full-width images, 800 for images inside text, and quality around 80 per cent. That puts most photos between 60 and 200 kilobytes — instead of eight megabytes — without any visible difference."
			],
			useCases: [
				{
					title: "Images for your own website",
					text: "Shrink product, reference and team photos before uploading. The single fastest lever for a faster site."
				},
				{
					title: "Attachments that fit through a mailbox",
					text: "Many mailboxes only accept attachments up to a certain size. Five compressed photos fit where two originals fail."
				},
				{
					title: "Photos for classifieds and portals",
					text: "Selling portals downscale images anyway — often worse than necessary. Doing it yourself keeps control of the result."
				},
				{
					title: "Documentation from the field",
					text: "Measurement, damage and progress photos add up to gigabytes quickly. Compressed they stay legible and the archive stays manageable."
				},
				{
					title: "Images for a newsletter",
					text: "Large images in email are not even loaded by some clients and noticeably lengthen the load on a phone."
				}
			],
			steps: [
				{
					title: "Choose an image",
					description: "Pick a file in JPG, PNG or WebP format. The preview and the original file size appear immediately."
				},
				{
					title: "Set the target width",
					description: "State how wide the image should be at most. The height follows the aspect ratio. For display on the web, 1600 pixels for large images and 800 pixels within text are good values."
				},
				{
					title: "Set the quality",
					description: "Between 70 and 85 per cent is the usable range; below that edges and flat areas become visibly restless. You can see the effect immediately in the new file size."
				},
				{
					title: "Download",
					description: "Save the result as JPEG or WebP. For photographs WebP is almost always smaller; for graphics with hard edges or transparency it is the better choice too."
				}
			],
			privacy: "The image is not uploaded. It is redrawn and compressed in your browser through a canvas element — the file never leaves your device at any point. That is the real difference from the widespread compression services: there your photos land on somebody else's server, which for site, damage or personal photographs is not a matter of taste but of data protection law.",
			faq: [
				{
					q: "Does the image visibly lose quality?",
					a: "At 80 per cent quality very few viewers see any difference from the original, while the file becomes several times smaller. Compression usually only becomes clearly visible below 60 per cent, first in soft gradients such as a sky."
				},
				{
					q: "JPEG or WebP?",
					a: "WebP, provided the target system accepts it: the same perceived quality at roughly 25 to 35 per cent fewer bytes, plus transparency. JPEG remains the safe choice for older software and for portals that only accept that format."
				},
				{
					q: "Are my images uploaded to a server?",
					a: "No. All processing happens in your browser; there is no counterpart that could receive the file. You can disconnect from the network after the page loads and keep working."
				},
				{
					q: "Are the capture date and location preserved?",
					a: "No. Redrawing in the browser discards the EXIF data, including GPS coordinates and camera model. For images destined for the internet that is an advantage — if you need the values, keep the original."
				},
				{
					q: "Can I process several images at once?",
					a: "The tool works one image at a time. If whole folders regularly come up for you — from site documentation, say — that can be automated rather than repeated by hand."
				}
			],
			related: [
				"pdf-werkzeuge",
				"qr-code-generator",
				"ki-kennzeichnung-bilder"
			]
		}
	},
	"pdf-werkzeuge": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"PDF ist das Format, in dem Angebote, Rechnungen, Lieferscheine und Nachweise durch den Betrieb wandern. Genau deshalb fallen ständig kleine Handgriffe an: drei Scans zu einem Dokument zusammenfassen, aus einem zwanzigseitigen Vertrag die zwei relevanten Seiten herauslösen, eine quer eingezogene Seite geraderücken.",
				"Diese Werkzeuge erledigen genau das — zusammenführen, aufteilen und drehen. Beim Zusammenführen bestimmen Sie die Reihenfolge, beim Aufteilen geben Sie einen Seitenbereich wie 1-3,5 an, und das Drehen wirkt auf die gewählten Seiten. Das Ergebnis laden Sie unmittelbar als neue Datei herunter.",
				"Der übliche Weg für diese Aufgaben führt über einen der großen Online-Dienste — und damit über einen Upload. Bei einem Angebot mit Preisen, einer Rechnung mit Bankverbindung oder einer Personalakte ist das der Punkt, an dem es aufhört, eine reine Bequemlichkeitsfrage zu sein. Hier bleibt die Datei auf Ihrem Gerät."
			],
			useCases: [
				{
					title: "Scans zu einem Dokument bündeln",
					text: "Der Einzug liefert Seite für Seite eine eigene Datei. Zusammengeführt entsteht daraus ein Dokument, das sich versenden und ablegen lässt."
				},
				{
					title: "Nur die relevanten Seiten weitergeben",
					text: "Aus einem umfangreichen Vertrag oder Prüfbericht den Auszug lösen, der den Empfänger tatsächlich etwas angeht."
				},
				{
					title: "Quer eingezogene Seiten geraderücken",
					text: "Eine gedrehte Seite macht ein Dokument unlesbar und beim Ausdruck unbrauchbar. Drehen, speichern, fertig."
				},
				{
					title: "Angebot und Anlagen als eine Datei",
					text: "Anschreiben, Leistungsverzeichnis und Datenblätter in der richtigen Reihenfolge zusammenlegen, statt fünf Anhänge zu verschicken."
				},
				{
					title: "Unterlagen für die Buchhaltung",
					text: "Belege eines Vorgangs zu einer Datei zusammenfassen, bevor sie in die Ablage oder zur Steuerberatung gehen."
				}
			],
			steps: [
				{
					title: "Werkzeug wählen",
					description: "Entscheiden Sie zwischen Zusammenführen, Aufteilen und Drehen. Die Eingabefelder richten sich nach dieser Wahl."
				},
				{
					title: "Dateien auswählen",
					description: "Zum Zusammenführen wählen Sie mindestens zwei PDFs; die Reihenfolge der Auswahl ist die Reihenfolge im Ergebnis. Für das Aufteilen und Drehen genügt eine Datei."
				},
				{
					title: "Seitenbereich angeben",
					description: "Beim Aufteilen tragen Sie die gewünschten Seiten ein, etwa 1-3,5 für die ersten drei Seiten und die fünfte. Beim Drehen wählen Sie den Winkel für die betroffenen Seiten."
				},
				{
					title: "Ausführen und herunterladen",
					description: "Das Ergebnis wird im Browser erzeugt und sofort als neue Datei angeboten. Die Ausgangsdateien bleiben unverändert."
				}
			],
			privacy: "Die PDFs werden nicht hochgeladen. Sie werden im Browser gelesen und dort neu geschrieben; keine Seite und keine Datei verlässt Ihr Gerät. Bei Dokumenten aus dem Geschäftsbetrieb ist das der eigentliche Grund, dieses Werkzeug einem der großen Online-Dienste vorzuziehen: Wer ein Angebot, eine Rechnung oder eine Personalakte auf einen fremden Server lädt, verarbeitet damit personenbezogene oder vertrauliche Daten außerhalb des eigenen Hauses — mit allem, was daran hängt.",
			faq: [
				{
					q: "Werden meine Dokumente hochgeladen?",
					a: "Nein. Die Verarbeitung läuft vollständig im Browser; es gibt keinen Server, der die Datei entgegennimmt. Das gilt für alle drei Funktionen gleichermaßen."
				},
				{
					q: "Wie gebe ich einen Seitenbereich an?",
					a: "Einzelne Seiten trennen Sie mit Komma, zusammenhängende Bereiche mit Bindestrich. 1-3,5 bedeutet also die Seiten eins bis drei und zusätzlich die Seite fünf. Die Reihenfolge im Ergebnis entspricht der Reihenfolge im Original."
				},
				{
					q: "Bleibt die Qualität erhalten?",
					a: "Ja. Die Seiten werden übernommen, nicht neu gerendert — Text bleibt Text, eingebettete Schriften und Auflösung bleiben unverändert. Es findet keine Kompression statt."
				},
				{
					q: "Funktionieren passwortgeschützte PDFs?",
					a: "Verschlüsselte Dateien lassen sich nicht verarbeiten. Entfernen Sie den Schutz vorher im Programm, mit dem die Datei erstellt wurde, oder speichern Sie eine ungeschützte Fassung."
				},
				{
					q: "Warum ist dieses Werkzeug kostenpflichtig?",
					a: "Die frei zugänglichen Werkzeuge auf dieser Seite finanzieren sich über Werbung. Die PDF-Werkzeuge kommen ohne Werbung aus und sind stattdessen einmalig freizuschalten — bei Dokumenten aus dem Geschäftsbetrieb ist eine werbefreie, rein lokale Verarbeitung der ehrlichere Handel."
				}
			],
			related: ["pdf-wasserzeichen", "bild-komprimieren"]
		},
		en: {
			intro: [
				"PDF is the format in which quotes, invoices, delivery notes and certificates travel through a business. That is exactly why small jobs come up constantly: combining three scans into one document, pulling the two relevant pages out of a twenty-page contract, straightening a page that went through the feeder sideways.",
				"These tools do precisely that — merge, split and rotate. Merging lets you set the order, splitting takes a page range such as 1-3,5, and rotating applies to the pages you choose. You download the result immediately as a new file.",
				"The usual route for these jobs runs through one of the large online services, and therefore through an upload. With a quote carrying prices, an invoice carrying bank details or a personnel file, that is the point where it stops being a question of convenience. Here the file stays on your device."
			],
			useCases: [
				{
					title: "Bundling scans into one document",
					text: "The feeder produces a separate file per page. Merged, they become a document you can send and file."
				},
				{
					title: "Passing on only the relevant pages",
					text: "Pull the extract that actually concerns the recipient out of a lengthy contract or inspection report."
				},
				{
					title: "Straightening sideways pages",
					text: "A rotated page makes a document unreadable and useless in print. Rotate, save, done."
				},
				{
					title: "Quote and attachments as one file",
					text: "Put the cover letter, the specification and the data sheets in the right order instead of sending five attachments."
				},
				{
					title: "Paperwork for the bookkeeping",
					text: "Combine the receipts for one matter into a single file before it goes into the archive or to the accountant."
				}
			],
			steps: [
				{
					title: "Choose a tool",
					description: "Decide between merging, splitting and rotating. The input fields follow that choice."
				},
				{
					title: "Select the files",
					description: "For merging, choose at least two PDFs; the order you select them in is the order in the result. Splitting and rotating need a single file."
				},
				{
					title: "Give the page range",
					description: "For splitting, enter the pages you want, such as 1-3,5 for the first three pages plus the fifth. For rotating, choose the angle for the affected pages."
				},
				{
					title: "Run it and download",
					description: "The result is produced in the browser and offered straight away as a new file. Your source files are left untouched."
				}
			],
			privacy: "The PDFs are not uploaded. They are read in the browser and written out again there; no page and no file leaves your device. With documents from a business that is the real reason to prefer this tool to one of the large online services: uploading a quote, an invoice or a personnel file to somebody else's server means processing personal or confidential data outside your own house, with everything that entails.",
			faq: [
				{
					q: "Are my documents uploaded?",
					a: "No. Processing runs entirely in the browser; there is no server that receives the file. That holds for all three functions equally."
				},
				{
					q: "How do I write a page range?",
					a: "Separate individual pages with commas and continuous ranges with a hyphen. So 1-3,5 means pages one to three plus page five. The order in the result follows the order in the original."
				},
				{
					q: "Is quality preserved?",
					a: "Yes. Pages are carried over rather than re-rendered — text stays text, embedded fonts and resolution are unchanged. No compression takes place."
				},
				{
					q: "Do password-protected PDFs work?",
					a: "Encrypted files cannot be processed. Remove the protection beforehand in the program the file was created with, or save an unprotected copy."
				},
				{
					q: "Why does this tool cost money?",
					a: "The freely available tools on this site are funded by advertising. The PDF tools carry no advertising and are unlocked once instead — with documents from a business, ad-free and purely local processing is the more honest trade."
				}
			],
			related: ["pdf-wasserzeichen", "bild-komprimieren"]
		}
	},
	"pdf-komprimieren": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Ein PDF wird fast nie vom Text groß, sondern von den Bildern darin. Ein eingescannter Vertrag, ein Angebot mit Produktfotos, ein bebildertes Protokoll — der Text darin wiegt ein paar Kilobyte, die Fotos einige Megabyte. Genau dort setzt dieses Werkzeug an: Es sucht die eingebetteten Bilder, rechnet sie in der von Ihnen gewählten Qualität neu und schreibt sie an dieselbe Stelle zurück.",
				"Der Rest des Dokuments bleibt dabei unangetastet. Text bleibt Text und damit durchsuchbar und markierbar, Vektorgrafiken bleiben scharf, Verlinkungen und die Seitenreihenfolge bleiben, wie sie waren. Das ist der Unterschied zu Werkzeugen, die jede Seite in ein Bild verwandeln: Die Datei wird zwar auch kleiner, aber aus einem Dokument wird ein Stapel Fotos, in dem sich nichts mehr suchen lässt.",
				"Wie viel dabei herauskommt, hängt am Ausgangsmaterial. Ein Scan mit 300 dpi lässt sich meist auf ein Viertel eindampfen, ohne dass es am Bildschirm auffällt. Ein reines Textdokument dagegen enthält nichts, was sich neu rechnen ließe — dann sagt das Werkzeug genau das, statt eine Verbesserung zu behaupten, die es nicht gibt."
			],
			useCases: [
				{
					title: "Anhänge unter die Größengrenze bringen",
					text: "Viele Postfächer nehmen keine Anhänge über zehn oder zwanzig Megabyte an. Eine Angebotsmappe mit Fotos liegt schnell darüber und wird kommentarlos abgewiesen."
				},
				{
					title: "Scans aus dem Multifunktionsgerät",
					text: "Kopierer scannen im Zweifel mit voller Auflösung in Farbe. Für ein Dokument, das ohnehin nur abgelegt und gelesen wird, ist das um ein Vielfaches mehr, als nötig wäre."
				},
				{
					title: "Unterlagen für ein Portal hochladen",
					text: "Förderportale, Ausschreibungsplattformen und Versicherungen setzen oft harte Obergrenzen je Datei — und melden die Überschreitung erst nach dem Ausfüllen des ganzen Formulars."
				},
				{
					title: "Archiv aufräumen",
					text: "Wenn Jahre an Belegen und Protokollen auf einem Laufwerk liegen, macht ein Faktor drei bei der Dateigröße im Backup und in der Synchronisierung einen spürbaren Unterschied."
				},
				{
					title: "Dokumentation auf die Website stellen",
					text: "Ein Datenblatt, das der Besucher erst nach zehn Sekunden Ladezeit sieht, wird meist gar nicht erst geöffnet — besonders auf dem Mobilfunknetz einer Baustelle."
				}
			],
			steps: [
				{
					title: "PDF auswählen",
					description: "Wählen Sie die Datei aus, die kleiner werden soll. Sie wird ausschließlich in Ihrem Browser geöffnet und nirgendwohin übertragen; auch sehr große Dateien sind kein Problem, sie brauchen nur etwas länger."
				},
				{
					title: "Bildqualität festlegen",
					description: "Der Regler steuert, wie stark die enthaltenen Bilder neu gerechnet werden. 65 Prozent ist ein guter Startwert für Dokumente, die am Bildschirm gelesen werden; für einen Ausdruck in guter Qualität sollten Sie eher bei 80 Prozent bleiben."
				},
				{
					title: "Bildbreite begrenzen",
					description: "Ein Foto mit 4000 Pixeln Breite bringt in einem A4-Dokument nichts, das nie größer als 2000 Pixel gedruckt wird. Die Begrenzung ist deshalb oft der größere Hebel als die Qualität — probieren Sie 1600 Pixel, bevor Sie die Qualität weiter senken."
				},
				{
					title: "Ergebnis prüfen",
					description: "Nach dem Herunterladen steht die Ersparnis in Prozent unter dem Knopf. Öffnen Sie die Datei einmal und sehen Sie sich die bildlastigste Seite an: Was dort gut aussieht, sieht im ganzen Dokument gut aus."
				}
			],
			privacy: "Die Datei wird vollständig in Ihrem Browser geöffnet, verarbeitet und wieder gespeichert. Nichts davon wird auf einen Server übertragen, und es entsteht auch keine Kopie im Netz — das ist bei Verträgen, Personalunterlagen und Angeboten der eigentliche Punkt, denn ein Dokument, das man zum Verkleinern hochlädt, hat man aus der Hand gegeben.",
			faq: [
				{
					q: "Leidet die Qualität des Textes?",
					a: "Nein. Angefasst werden ausschließlich die eingebetteten Bilder. Text bleibt Text, bleibt durchsuchbar, bleibt beim Zoomen scharf und lässt sich weiterhin markieren und kopieren."
				},
				{
					q: "Warum wird meine Datei nicht kleiner?",
					a: "Dann enthält sie nichts, was sich neu rechnen ließe — entweder gar keine Bilder, oder nur solche in einem Format, das hier bewusst unangetastet bleibt, weil eine falsche Annahme über Farbraum oder Bittiefe die Seite still zerstören würde."
				},
				{
					q: "Kann ich mehrere Dateien auf einmal verkleinern?",
					a: "Derzeit wird eine Datei pro Durchgang verarbeitet. Bei einem Stapel lohnt es sich, die Einstellung einmal an der größten Datei zu prüfen und sie dann für die übrigen zu übernehmen."
				},
				{
					q: "Bleibt das Dokument nach dem Verkleinern gültig?",
					a: "Der Aufbau des Dokuments bleibt vollständig erhalten. Eine digitale Signatur ist davon allerdings ausgenommen: Jede Änderung an der Datei macht sie ungültig, das gilt für jedes Werkzeug gleichermaßen."
				}
			],
			related: ["pdf-werkzeuge", "bild-komprimieren"]
		},
		en: {
			intro: [
				"A PDF is almost never made large by its text, but by the images inside it. A scanned contract, a quotation with product photos, an illustrated report — the words weigh a few kilobytes, the pictures several megabytes. That is exactly where this tool works: it finds the embedded images, recomputes them at the quality you choose, and writes them back into the same place.",
				"The rest of the document is left alone. Text stays text and therefore stays searchable and selectable, vector graphics stay sharp, links and page order stay as they were. That is the difference from tools that turn every page into a picture: the file does get smaller, but a document becomes a stack of photos in which nothing can be found again.",
				"How much comes out of it depends on the material. A 300 dpi scan can usually be cut to a quarter without anything showing on screen. A pure text document, on the other hand, holds nothing that could be recomputed — and then the tool says so, rather than claiming an improvement that is not there."
			],
			useCases: [
				{
					title: "Getting an attachment under the limit",
					text: "Plenty of mailboxes refuse attachments over ten or twenty megabytes. A quotation pack with photos passes that quickly and is rejected without comment."
				},
				{
					title: "Scans out of the office machine",
					text: "Copiers scan at full resolution in colour when in doubt. For a document that will only ever be filed and read, that is many times more than would be needed."
				},
				{
					title: "Uploading papers to a portal",
					text: "Funding portals, tender platforms and insurers often set a hard per-file limit — and report the breach only after the whole form has been filled in."
				},
				{
					title: "Tidying up an archive",
					text: "When years of receipts and reports sit on a drive, a factor of three in file size makes a noticeable difference to backups and to syncing."
				},
				{
					title: "Putting documentation on a website",
					text: "A data sheet a visitor only sees after ten seconds of loading is usually not opened at all — especially on the mobile signal of a building site."
				}
			],
			steps: [
				{
					title: "Choose the PDF",
					description: "Pick the file that should get smaller. It is opened purely inside your browser and transferred nowhere; even very large files are fine, they simply take a little longer."
				},
				{
					title: "Set the image quality",
					description: "The slider controls how hard the contained images are recomputed. 65 per cent is a good starting point for documents read on screen; for a good-quality print run, stay closer to 80 per cent."
				},
				{
					title: "Limit the image width",
					description: "A photo 4000 pixels wide gains nothing in an A4 document that is never printed larger than 2000 pixels. The width limit is therefore often the bigger lever than the quality — try 1600 pixels before lowering the quality further."
				},
				{
					title: "Check the result",
					description: "After the download the saving is shown as a percentage under the button. Open the file once and look at the most image-heavy page: what looks good there looks good throughout the document."
				}
			],
			privacy: "The file is opened, processed and saved again entirely inside your browser. None of it is transferred to a server and no copy comes into existence anywhere online — with contracts, personnel files and quotations that is the actual point, because a document you upload in order to shrink it is a document you have handed over.",
			faq: [
				{
					q: "Does the text lose quality?",
					a: "No. Only the embedded images are touched. Text stays text, stays searchable, stays sharp when zoomed, and can still be selected and copied."
				},
				{
					q: "Why does my file not get smaller?",
					a: "Then it holds nothing that could be recomputed — either no images at all, or only images in a format deliberately left alone here, because a wrong assumption about colour space or bit depth would corrupt the page silently."
				},
				{
					q: "Can I compress several files at once?",
					a: "One file is processed per run at the moment. With a batch it pays to test the setting once on the largest file and then apply it to the rest."
				},
				{
					q: "Is the document still valid afterwards?",
					a: "The structure of the document is fully preserved. A digital signature is the exception: any change to the file invalidates it, and that is true of every tool alike."
				}
			],
			related: ["pdf-werkzeuge", "bild-komprimieren"]
		}
	},
	"pdf-wasserzeichen": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Ein Wasserzeichen sagt einem Dokument an, was es ist. „Entwurf“ quer über der Seite verhindert, dass eine Zwischenfassung als endgültige Rechnung durchgeht; „Kopie“ trennt das Zweitexemplar vom Original; ein Firmenname über einem Angebot macht sichtbar, von wem es stammt, auch wenn nur eine einzelne Seite ausgedruckt weitergereicht wird.",
				"Dieses Werkzeug setzt einen solchen Schriftzug in ein vorhandenes PDF — mit frei wählbarer Größe, Farbe, Deckkraft und Neigung, auf allen Seiten oder nur auf denen, die Sie angeben. Die vier Anordnungen decken die üblichen Fälle ab: diagonal über die Seite, waagerecht in der Mitte, dezent als Fußzeile oder gekachelt über die gesamte Fläche.",
				"Wichtig ist die Erwartung: Ein Wasserzeichen ist eine Kennzeichnung, kein Kopierschutz. Es macht den Status eines Dokuments auf einen Blick erkennbar und erschwert die unbemerkte Weiterverwendung einzelner Seiten. Wer es technisch entfernen will, kann das mit genügend Aufwand — dagegen hilft kein Werkzeug dieser Art, und Anbieter, die etwas anderes versprechen, überversprechen."
			],
			useCases: [
				{
					title: "Entwürfe eindeutig kennzeichnen",
					text: "Solange ein Angebot noch abgestimmt wird, gehört „Entwurf“ auf jede Seite. Es kostet nichts und verhindert die peinlichste Verwechslung im Schriftverkehr."
				},
				{
					title: "Vertrauliche Unterlagen markieren",
					text: "Kalkulationen, Personalunterlagen und interne Auswertungen bekommen einen sichtbaren Hinweis, der auch auf einem herumliegenden Ausdruck noch zu lesen ist."
				},
				{
					title: "Muster und Vorlagen versenden",
					text: "Wer ein Musterdokument herausgibt, will nicht, dass es ausgefüllt zurückkommt und als echter Vorgang verbucht wird. Ein Aufdruck über der Fläche macht das unmissverständlich."
				},
				{
					title: "Herkunft eines Dokuments zeigen",
					text: "Bei Unterlagen, die durch mehrere Hände gehen, hält ein dezenter Firmenschriftzug in der Fußzeile fest, aus welchem Haus die Seite ursprünglich stammt."
				},
				{
					title: "Fassungen auseinanderhalten",
					text: "Ein aufgedrucktes Datum oder eine Versionsnummer erspart die Rückfrage, welcher von drei Ausdrucken auf dem Tisch der aktuelle ist."
				}
			],
			steps: [
				{
					title: "PDF und Text wählen",
					description: "Laden Sie das Dokument und tragen Sie den Schriftzug ein. Kurz ist besser: Ein Wort bleibt bei jeder Größe lesbar, ein ganzer Satz zwingt Sie zu einer Schriftgröße, bei der das Wasserzeichen kaum noch auffällt."
				},
				{
					title: "Anordnung festlegen",
					description: "Diagonal ist die klassische Wahl für einen Statusvermerk und lässt den Text darunter am besten lesbar. Gekachelt deckt die ganze Seite ab und eignet sich für Muster; die Fußzeile ist die zurückhaltendste Variante für eine Herkunftsangabe."
				},
				{
					title: "Deckkraft und Farbe abstimmen",
					description: "Zwischen 15 und 25 Prozent liegt der Bereich, in dem der Aufdruck deutlich zu sehen ist, ohne den Text darunter zu stören. Prüfen Sie das Ergebnis am besten auf einer Seite mit viel Text, nicht auf dem Deckblatt."
				},
				{
					title: "Seiten eingrenzen und speichern",
					description: "Bleibt das Feld leer, bekommt jede Seite den Aufdruck. Für eine Kennzeichnung nur auf dem Deckblatt genügt eine 1, für einen Bereich eine Angabe wie 1-3,5. Danach laden Sie das fertige Dokument herunter."
				}
			],
			privacy: "Das Dokument wird ausschließlich in Ihrem Browser geöffnet und dort mit dem Aufdruck versehen; weder die Datei noch der Text des Wasserzeichens verlässt Ihr Gerät. Gerade bei als vertraulich gekennzeichneten Unterlagen wäre alles andere widersinnig — ein Dokument zum Anbringen des Vermerks „Vertraulich“ auf einen fremden Server zu laden, hebt genau die Vertraulichkeit auf, um die es geht.",
			faq: [
				{
					q: "Lässt sich das Wasserzeichen wieder entfernen?",
					a: "Mit entsprechendem Aufwand ja — es ist eine Kennzeichnung und kein Kopierschutz. Für den Zweck, den Status eines Dokuments erkennbar zu machen, reicht das vollkommen; für echten Schutz bräuchte es Verschlüsselung und Rechteverwaltung."
				},
				{
					q: "Kann ich ein Logo statt eines Textes einsetzen?",
					a: "Derzeit setzt das Werkzeug einen Textaufdruck. Für eine bildliche Kennzeichnung ist der übliche Weg, das Logo in die Vorlage aufzunehmen, aus der das PDF entsteht."
				},
				{
					q: "Warum fehlen einzelne Sonderzeichen im Aufdruck?",
					a: "Die eingebaute Schrift deckt den westeuropäischen Zeichenvorrat ab. Typografische Anführungszeichen und Gedankenstriche werden automatisch ersetzt, alles darüber hinaus — etwa ein Emoji — wird weggelassen, statt den Export scheitern zu lassen."
				},
				{
					q: "Bleibt der Text unter dem Wasserzeichen auswählbar?",
					a: "Ja. Der Aufdruck ist eine zusätzliche Ebene über dem Inhalt; Text bleibt Text und lässt sich weiterhin markieren, kopieren und durchsuchen."
				}
			],
			related: ["pdf-komprimieren", "pdf-werkzeuge"]
		},
		en: {
			intro: [
				"A watermark tells a document what it is. “Draft” across the page stops an interim version from passing as a final invoice; “Copy” separates the duplicate from the original; a company name over a quotation shows where it came from, even when a single page is printed and passed on.",
				"This tool puts such a wording into an existing PDF — with a size, colour, opacity and tilt of your choosing, on every page or only on the ones you name. The four placements cover the usual cases: diagonally across the page, horizontally in the centre, discreetly as a footer, or tiled over the whole surface.",
				"The expectation matters: a watermark is a marking, not a copy protection. It makes the status of a document visible at a glance and makes it harder to reuse single pages unnoticed. Anyone determined to strip it can, with enough effort — no tool of this kind changes that, and vendors who promise otherwise are overpromising."
			],
			useCases: [
				{
					title: "Marking drafts unmistakably",
					text: "While a quotation is still being agreed, “Draft” belongs on every page. It costs nothing and prevents the most embarrassing mix-up in correspondence."
				},
				{
					title: "Flagging confidential papers",
					text: "Costings, personnel files and internal analyses get a visible note that is still legible on a printout left lying around."
				},
				{
					title: "Sending out samples and templates",
					text: "Anyone handing out a sample document does not want it filled in and returned as a genuine case. A marking across the surface makes that unambiguous."
				},
				{
					title: "Showing where a document came from",
					text: "For papers that pass through several hands, a discreet company wording in the footer records which office the page originally came from."
				},
				{
					title: "Telling versions apart",
					text: "A printed date or version number saves the question of which of the three printouts on the desk is the current one."
				}
			],
			steps: [
				{
					title: "Choose the PDF and the wording",
					description: "Load the document and type the wording. Short is better: one word stays legible at any size, while a whole sentence forces a font size at which the watermark is barely noticeable."
				},
				{
					title: "Pick the placement",
					description: "Diagonal is the classic choice for a status note and keeps the text underneath most readable. Tiled covers the whole page and suits samples; the footer is the most restrained variant for an origin note."
				},
				{
					title: "Tune the opacity and colour",
					description: "Between 15 and 25 per cent is the range where the marking is clearly visible without disturbing the text under it. Check the result on a page full of text rather than on the cover sheet."
				},
				{
					title: "Narrow the pages and save",
					description: "Left empty, the field marks every page. For the cover sheet alone a 1 is enough, for a range something like 1-3,5. Then download the finished document."
				}
			],
			privacy: "The document is opened and marked entirely inside your browser; neither the file nor the watermark wording leaves your device. With papers being marked confidential, anything else would be self-defeating — uploading a document to a stranger's server in order to stamp it “Confidential” removes exactly the confidentiality at stake.",
			faq: [
				{
					q: "Can the watermark be removed again?",
					a: "With enough effort, yes — it is a marking and not a copy protection. For the purpose of making a document's status recognisable that is entirely sufficient; real protection would need encryption and rights management."
				},
				{
					q: "Can I use a logo instead of text?",
					a: "The tool applies a text marking at the moment. For a pictorial marking the usual route is to include the logo in the template the PDF is produced from."
				},
				{
					q: "Why are some special characters missing?",
					a: "The built-in font covers the Western European character set. Typographic quotes and dashes are substituted automatically, and anything beyond that — an emoji, say — is dropped rather than being allowed to fail the export."
				},
				{
					q: "Is the text under the watermark still selectable?",
					a: "Yes. The marking is an extra layer over the content; text stays text and can still be selected, copied and searched."
				}
			],
			related: ["pdf-komprimieren", "pdf-werkzeuge"]
		}
	},
	"bilder-zu-pdf": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Der Scanner steht im Büro, die Belege liegen im Fahrzeug — und abfotografiert ist ein Lieferschein in drei Sekunden. Was danach fehlt, ist die Form: Zwölf einzelne Handybilder sind kein Dokument, sie sind zwölf Anhänge in unklarer Reihenfolge, mit denen in der Buchhaltung niemand etwas anfangen kann.",
				"Dieses Werkzeug macht daraus ein PDF. Sie wählen die Bilder, bringen sie in die richtige Reihenfolge und legen fest, wie die Seiten aussehen sollen: A4, A5 oder Letter, hoch oder quer, mit Rand oder randlos. Jedes Bild wird eine Seite, und heraus kommt eine Datei, die sich verschicken, ablegen und ausdrucken lässt wie jedes andere Dokument.",
				"Für die Ausrichtung gibt es bewusst eine Automatik: Ein querformatiges Foto bekommt eine querformatige Seite, ein hochkant aufgenommenes eine hochkante. Damit passt der Stapel auch dann, wenn er gemischt ist — was er bei zwischendurch abfotografierten Belegen praktisch immer ist."
			],
			useCases: [
				{
					title: "Belege für die Buchhaltung bündeln",
					text: "Tankquittungen, Bewirtungsbelege und Parkscheine eines Monats werden ein Dokument statt dreißig Bilddateien mit nichtssagenden Namen."
				},
				{
					title: "Baustellendokumentation abgeben",
					text: "Fotos vom Baufortschritt, in der richtigen Reihenfolge und mit ordentlichen Seiten, sind gegenüber dem Auftraggeber eine Dokumentation und kein Bilderordner."
				},
				{
					title: "Unterschriebene Seiten zurückschicken",
					text: "Ein abfotografierter, unterschriebener Vertrag geht als PDF zurück — so, wie er losgeschickt wurde, und nicht als Foto im Anhang."
				},
				{
					title: "Schadensmeldung bei der Versicherung",
					text: "Versicherungen verlangen fast immer ein Dokument je Vorgang. Mehrere Aufnahmen eines Schadens gehören dann in eine Datei, nicht in fünf Einzelbilder."
				},
				{
					title: "Ersatz für den Scanner unterwegs",
					text: "Wer keinen Scanner zur Hand hat, kommt mit Handykamera und diesem Schritt zu einem brauchbaren Ergebnis — ohne eine App zu installieren, die Bilder in eine fremde Cloud lädt."
				}
			],
			steps: [
				{
					title: "Bilder auswählen",
					description: "Wählen Sie alle Aufnahmen auf einmal aus. JPG, PNG und WebP werden gelesen; die Bilder werden vor dem Einbetten einheitlich aufbereitet, sodass auch gemischte Formate im selben Dokument landen."
				},
				{
					title: "Reihenfolge sortieren",
					description: "Ab zwei Bildern erscheint eine Liste mit Pfeilen zum Verschieben und einem Kreuz zum Entfernen. Die Reihenfolge in dieser Liste ist die Seitenreihenfolge im PDF — das ist meist der Schritt, der über brauchbar oder nicht entscheidet."
				},
				{
					title: "Seitenformat und Rand wählen",
					description: "A4 mit zehn Millimetern Rand passt für alles, was ausgedruckt oder eingereicht wird. Wer das Bild formatfüllend braucht, wählt „So groß wie das Bild“; dann bestimmt die Aufnahme die Seitengröße und es gibt keinen Rand."
				},
				{
					title: "Qualität abwägen und erzeugen",
					description: "Mit 80 Prozent bleibt ein abfotografierter Beleg gut lesbar und die Datei handlich. Erst wenn Kleingedrucktes wirklich entziffert werden muss, lohnt ein höherer Wert — der Zuwachs an Dateigröße ist erheblich."
				}
			],
			privacy: "Die Bilder werden im Browser gelesen, aufbereitet und zu einem PDF zusammengesetzt; keine Aufnahme wird übertragen oder gespeichert. Das ist bei genau diesem Werkzeug relevant, denn die typischen Vorlagen sind Belege, Verträge und Schadensfotos — also Unterlagen, die Adressen, Beträge und manchmal Unterschriften zeigen.",
			faq: [
				{
					q: "Werden die Bilder in der Auswahlreihenfolge eingefügt?",
					a: "Zunächst ja, und viele Dateisysteme sortieren dabei alphabetisch statt nach Aufnahmezeit. Deshalb gibt es die Liste zum Umsortieren — prüfen Sie sie einmal, bevor Sie das PDF erzeugen."
				},
				{
					q: "Kann ich mehrere Bilder auf eine Seite legen?",
					a: "Nein, jedes Bild wird eine eigene Seite. Für eine Kontaktbogen-artige Übersicht ist ein Textprogramm der bessere Weg, weil dort auch Beschriftungen dazugehören."
				},
				{
					q: "Was bedeutet „Seite füllen“ genau?",
					a: "Das Bild wird so vergrößert, dass es die ganze Seite bedeckt; was über den Rand hinausragt, fällt weg — gleichmäßig an beiden Seiten. Für Belege ist „Ganz sichtbar“ die sichere Wahl, weil dort nichts abgeschnitten werden darf."
				},
				{
					q: "Lässt sich das entstandene PDF durchsuchen?",
					a: "Nein. Es enthält Bilder, keinen Text — das ist bei jedem aus Fotos erzeugten PDF so. Wenn Sie den Inhalt als Text brauchen, ist die Texterkennung der passende Schritt davor."
				}
			],
			related: ["pdf-zu-bildern", "bild-komprimieren"]
		},
		en: {
			intro: [
				"The scanner is in the office, the receipts are in the van — and a delivery note is photographed in three seconds. What is missing afterwards is the form: twelve separate phone pictures are not a document, they are twelve attachments in unclear order that nobody in bookkeeping can work with.",
				"This tool turns them into a PDF. You choose the images, put them in the right order, and decide how the pages should look: A4, A5 or Letter, portrait or landscape, with a margin or without. Each image becomes a page, and out comes a file that can be sent, filed and printed like any other document.",
				"Orientation is handled automatically on purpose: a landscape photo gets a landscape page, an upright one gets an upright page. That way a mixed stack still fits — and with receipts photographed as you go, a stack is mixed practically every time."
			],
			useCases: [
				{
					title: "Bundling receipts for bookkeeping",
					text: "A month of fuel receipts, hospitality slips and parking tickets becomes one document instead of thirty image files with meaningless names."
				},
				{
					title: "Handing over site documentation",
					text: "Photos of the work in progress, in the right order and on proper pages, read to a client as documentation rather than as a folder of pictures."
				},
				{
					title: "Returning signed pages",
					text: "A photographed, signed contract goes back as a PDF — the way it was sent out, not as a picture attached to an email."
				},
				{
					title: "Reporting a claim to an insurer",
					text: "Insurers almost always ask for one document per case. Several shots of the same damage then belong in one file, not in five separate images."
				},
				{
					title: "Standing in for a scanner on the road",
					text: "With no scanner at hand, a phone camera plus this step gives a usable result — without installing an app that uploads the pictures to somebody's cloud."
				}
			],
			steps: [
				{
					title: "Choose the images",
					description: "Select all the shots at once. JPG, PNG and WebP are read; the images are normalised before being embedded, so mixed formats still end up in the same document."
				},
				{
					title: "Sort the order",
					description: "From two images on, a list appears with arrows to move an entry and a cross to remove it. The order in that list is the page order in the PDF — usually the step that decides between usable and not."
				},
				{
					title: "Choose the page size and margin",
					description: "A4 with a ten millimetre margin suits anything that will be printed or submitted. If you need the image to fill the page, choose “Same size as the image”; the shot then sets the page size and there is no margin."
				},
				{
					title: "Weigh the quality and create",
					description: "At 80 per cent a photographed receipt stays clearly legible and the file stays manageable. Only when small print really has to be deciphered is a higher value worth it — the growth in file size is considerable."
				}
			],
			privacy: "The images are read, prepared and assembled into a PDF inside the browser; no shot is transmitted or stored. That matters especially for this tool, because the typical inputs are receipts, contracts and damage photos — papers showing addresses, amounts and sometimes signatures.",
			faq: [
				{
					q: "Are the images added in the order I selected them?",
					a: "Initially yes, and many file pickers sort alphabetically rather than by capture time. That is what the reordering list is for — check it once before creating the PDF."
				},
				{
					q: "Can I put several images on one page?",
					a: "No, each image becomes its own page. For a contact-sheet style overview a word processor is the better route, because captions belong there too."
				},
				{
					q: "What exactly does “fill the page” do?",
					a: "The image is enlarged until it covers the whole page; whatever sticks out is cropped, evenly on both sides. For receipts “fully visible” is the safe choice, because nothing there may be cut off."
				},
				{
					q: "Can the resulting PDF be searched?",
					a: "No. It contains images, not text — which is true of every PDF made from photos. If you need the content as text, text recognition is the right step beforehand."
				}
			],
			related: ["pdf-zu-bildern", "bild-komprimieren"]
		}
	},
	"pdf-zu-bildern": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Manchmal ist ein PDF das falsche Format. In eine Präsentation lässt es sich nicht einfügen, in einem Social-Media-Beitrag zeigt es niemand an, und für eine Vorschau auf der eigenen Website braucht es ohnehin ein Bild. Dann hilft der umgekehrte Weg: die gewünschte Seite als PNG oder JPG herausrechnen und wie jedes andere Bild weiterverwenden.",
				"Dieses Werkzeug rendert die Seiten so, wie ein Betrachter sie anzeigen würde — mit Schriften, Vektorgrafiken und Layout, nicht als Ausschnitt eines Screenshots. Die Auflösung bestimmen Sie: 96 dpi für den Bildschirm, 150 dpi als guter Mittelweg, 300 dpi, wenn das Ergebnis gedruckt wird.",
				"Die erzeugten Seiten erscheinen als Vorschau, mit Größe und Abmessung je Bild und einem eigenen Knopf zum Herunterladen. So laden Sie gezielt die eine Seite, die Sie brauchen, statt einen Ordner voller Dateien zu sortieren, von denen Sie neun wieder löschen."
			],
			useCases: [
				{
					title: "Seite in eine Präsentation übernehmen",
					text: "Eine Auswertung oder ein Plan aus einem PDF landet als Bild auf der Folie, ohne den Umweg über einen unscharf zugeschnittenen Bildschirmausschnitt."
				},
				{
					title: "Vorschaubild für die Website",
					text: "Ein Datenblatt oder eine Speisekarte bekommt eine Vorschau, die Besucher sehen, bevor sie entscheiden, ob sie das ganze Dokument öffnen wollen."
				},
				{
					title: "Einzelne Seite weitergeben",
					text: "Wenn nur eine Seite gebraucht wird, ist ein Bild oft der einfachere Weg als ein neues PDF — der Empfänger sieht es sofort, ohne etwas zu öffnen."
				},
				{
					title: "Plan auf die Baustelle schicken",
					text: "Ein Bild lässt sich am Telefon in jedem Messenger anzeigen und heranziehen, während ein PDF-Anhang je nach Gerät erst eine App verlangt."
				},
				{
					title: "Vorlage für die Texterkennung",
					text: "Ein gescanntes PDF ist für eine Texterkennung erst nutzbar, wenn die Seite als Bild vorliegt — dieser Schritt liefert genau das, in der passenden Auflösung."
				}
			],
			steps: [
				{
					title: "PDF auswählen",
					description: "Wählen Sie die Datei aus. Sie wird im Browser gelesen; die Anzeige-Engine dafür wird erst beim ersten Umwandeln geladen, damit das bloße Öffnen der Seite nicht schon ein Megabyte kostet."
				},
				{
					title: "Seiten eingrenzen",
					description: "Leer lassen wandelt das ganze Dokument um. Bei einem längeren PDF lohnt sich eine Angabe wie 1 oder 2-4 — pro Durchgang werden höchstens fünfzig Seiten gerendert, weil ein ganzes Buch bei 300 dpi den Arbeitsspeicher des Geräts sprengen würde."
				},
				{
					title: "Auflösung und Format wählen",
					description: "PNG ist die richtige Wahl für Text, Linien und Pläne, weil es scharfe Kanten sauber wiedergibt. JPG lohnt sich bei fotolastigen Seiten und liefert dort deutlich kleinere Dateien; die Qualität stellen Sie dann selbst ein."
				},
				{
					title: "Vorschau prüfen und laden",
					description: "Unter jeder Seite stehen Abmessung und Dateigröße. Laden Sie einzelne Seiten über den Knopf daneben oder alle auf einmal — der Browser fragt je nach Einstellung einmal nach, ob er mehrere Dateien speichern darf."
				}
			],
			privacy: "Das Dokument wird ausschließlich lokal im Browser gelesen und gerendert; weder die Datei noch die erzeugten Bilder werden übertragen. Auch die Anzeige-Engine liegt auf dieser Website und nicht bei einem fremden Anbieter, sodass beim Umwandeln keine Verbindung nach außen entsteht.",
			faq: [
				{
					q: "Warum wird nur eine begrenzte Seitenzahl umgewandelt?",
					a: "Jede gerenderte Seite liegt als Bild im Arbeitsspeicher, und bei 300 dpi sind das mehrere Megabyte pro Seite. Die Grenze von fünfzig Seiten je Durchgang verhindert, dass der Browser-Tab mitten in der Arbeit abstürzt."
				},
				{
					q: "Welche Auflösung brauche ich zum Drucken?",
					a: "300 dpi ist der übliche Wert für einen sauberen Ausdruck. Für die Anzeige am Bildschirm oder im Web sind 96 bis 150 dpi völlig ausreichend und ergeben deutlich handlichere Dateien."
				},
				{
					q: "Warum ist der Hintergrund weiß und nicht durchsichtig?",
					a: "Eine PDF-Seite hat keinen eigenen Hintergrund. Ohne eine gesetzte weiße Fläche würden durchsichtige Bereiche in einem JPG schwarz erscheinen, deshalb wird vor dem Rendern grundsätzlich weiß gefüllt."
				},
				{
					q: "Bleibt der Text im Bild auswählbar?",
					a: "Nein. Ein Bild besteht aus Bildpunkten, egal wie hoch die Auflösung ist. Wer den Inhalt weiterverwenden will, braucht danach eine Texterkennung."
				}
			],
			related: ["bilder-zu-pdf", "texterkennung"]
		},
		en: {
			intro: [
				"Sometimes a PDF is the wrong format. It cannot be dropped into a presentation, nobody's social feed will display it, and a preview on your own website needs a picture anyway. Then the reverse route helps: render the page you want as a PNG or JPG and use it like any other image.",
				"This tool renders the pages the way a viewer would show them — with fonts, vector graphics and layout, not as a crop of a screenshot. You choose the resolution: 96 dpi for the screen, 150 dpi as a good middle ground, 300 dpi when the result will be printed.",
				"The rendered pages appear as previews, each with its size and dimensions and its own download button. That way you take the one page you need instead of sorting through a folder of files, nine of which you delete again."
			],
			useCases: [
				{
					title: "Putting a page into a presentation",
					text: "An analysis or a plan out of a PDF lands on the slide as an image, without the detour through a blurry cropped screen capture."
				},
				{
					title: "A preview picture for a website",
					text: "A data sheet or a menu gets a preview that visitors see before deciding whether to open the whole document."
				},
				{
					title: "Passing on a single page",
					text: "When only one page is needed, an image is often simpler than a new PDF — the recipient sees it immediately, without opening anything."
				},
				{
					title: "Sending a plan to the site",
					text: "An image can be displayed and zoomed in any messenger on a phone, while a PDF attachment demands an app first depending on the device."
				},
				{
					title: "Preparing input for text recognition",
					text: "A scanned PDF only becomes usable for text recognition once the page exists as an image — this step delivers exactly that, at a suitable resolution."
				}
			],
			steps: [
				{
					title: "Choose the PDF",
					description: "Pick the file. It is read inside the browser; the rendering engine for it is only loaded on the first conversion, so merely opening the page does not already cost a megabyte."
				},
				{
					title: "Narrow the pages",
					description: "Left empty, the whole document is converted. For a longer PDF an entry like 1 or 2-4 pays off — at most fifty pages are rendered per run, because a whole book at 300 dpi would exhaust the device's memory."
				},
				{
					title: "Choose resolution and format",
					description: "PNG is the right choice for text, lines and plans, because it reproduces sharp edges cleanly. JPG pays off on photo-heavy pages and gives markedly smaller files there; you then set the quality yourself."
				},
				{
					title: "Check the preview and download",
					description: "Dimensions and file size are shown under each page. Take individual pages with the button beside them, or all at once — depending on its settings the browser will ask once whether it may save several files."
				}
			],
			privacy: "The document is read and rendered purely locally in the browser; neither the file nor the produced images are transmitted. The rendering engine is served by this site rather than by a third party, so converting a document opens no outbound connection at all.",
			faq: [
				{
					q: "Why is the number of pages limited?",
					a: "Every rendered page sits in memory as an image, and at 300 dpi that is several megabytes per page. The limit of fifty pages per run stops the browser tab from crashing halfway through the job."
				},
				{
					q: "Which resolution do I need for printing?",
					a: "300 dpi is the usual value for a clean print. For display on screen or on the web, 96 to 150 dpi is entirely sufficient and gives far more manageable files."
				},
				{
					q: "Why is the background white rather than transparent?",
					a: "A PDF page has no background of its own. Without a white fill, transparent areas would come out black in a JPG, so the canvas is always filled with white before rendering."
				},
				{
					q: "Is the text in the image still selectable?",
					a: "No. An image is made of pixels, however high the resolution. If you want to reuse the content, text recognition is the step that follows."
				}
			],
			related: ["bilder-zu-pdf", "texterkennung"]
		}
	},
	"etiketten-drucken": {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Etikettenbogen sind billig, das Beschriften ist es nicht. Wer einmal versucht hat, dreißig Adressen in einer Textverarbeitung so auf ein Raster zu bringen, dass sie nach dem Druck auch auf den Aufklebern landen, kennt das Ergebnis: zwei verschwendete Bogen und eine Tabelle, die beim nächsten Mal niemand mehr wiederfindet.",
				"Dieses Werkzeug erzeugt den Bogen als fertiges PDF. Sie wählen das Raster, fügen die Adressen ein — eine je Absatz — und bekommen eine Datei, die Sie ohne weitere Einstellung auf den Etikettenbogen drucken. Die gängigen Formate von 24 bis 40 Etiketten je A4-Seite sind hinterlegt, samt der Ränder und Abstände, die das jeweilige Raster braucht.",
				"Zwei Kleinigkeiten machen den Unterschied im Alltag. „Erstes benutztes Feld“ nimmt einen angebrochenen Bogen auf, sodass die ersten, schon abgezogenen Felder freibleiben. Und die Schnittlinien lassen sich zum Prüfen einblenden: einmal auf normalem Papier drucken, gegen den Etikettenbogen halten, und die Passgenauigkeit ist geklärt, bevor der teure Bogen durch den Drucker läuft."
			],
			useCases: [
				{
					title: "Serienbrief ohne Serienbrief",
					text: "Für eine Aussendung an dreißig Kunden braucht es keine Datenbankanbindung — die Adressen aus der Mail liegen ohnehin schon als Text vor."
				},
				{
					title: "Absenderaufkleber auf Vorrat",
					text: "Ein Bogen mit der eigenen Anschrift auf allen Feldern ist in einer Minute erzeugt und spart über das Jahr das Beschriften jedes einzelnen Umschlags."
				},
				{
					title: "Inventar und Lagerplätze beschriften",
					text: "Regalfächer, Werkzeugkisten und Ordnerrücken bekommen einheitliche Beschriftungen, statt der Handschrift von drei verschiedenen Kollegen."
				},
				{
					title: "Versandvorbereitung im Handel",
					text: "Wer regelmäßig Pakete verschickt, klebt die Empfängeradresse lieber auf, als sie jedes Mal von Hand auf den Karton zu schreiben."
				},
				{
					title: "Namensschilder für eine Veranstaltung",
					text: "Für einen Tag der offenen Tür oder eine Schulung reicht ein größeres Raster mit Name und Betrieb, gedruckt am Vorabend."
				}
			],
			steps: [
				{
					title: "Bogen auswählen",
					description: "Suchen Sie das Raster, das zu Ihrem Etikettenbogen passt. Entscheidend sind die Maße und die Anzahl je Seite, nicht die Marke — ein Bogen eines anderen Herstellers mit demselben Raster passt genauso."
				},
				{
					title: "Adressen einfügen",
					description: "Eine Adresse je Absatz: Die Zeilen innerhalb eines Absatzes werden zu den Zeilen auf dem Etikett, eine Leerzeile beendet das Etikett. Unter dem Feld steht laufend mit, wie viele Etiketten erkannt wurden — das ist die schnellste Kontrolle."
				},
				{
					title: "Angebrochenen Bogen berücksichtigen",
					description: "Wurden von einem Bogen schon Felder abgezogen, tragen Sie unter „Erstes benutztes Feld“ die Nummer des ersten freien Feldes ein. Gezählt wird zeilenweise von links oben, wie beim Lesen."
				},
				{
					title: "Probedruck und Druck",
					description: "Schalten Sie für den ersten Versuch die Schnittlinien ein und drucken Sie auf normales Papier. Wichtig ist dabei, dass der Drucker das PDF in Originalgröße ausgibt und nicht „an Seite anpassen“ — sonst verschiebt sich das ganze Raster um wenige Millimeter."
				}
			],
			privacy: "Der Bogen entsteht vollständig in Ihrem Browser; die eingefügten Adressen werden weder übertragen noch gespeichert. Bei einer Empfängerliste ist das keine Formalie, sondern der Unterschied zwischen einer internen Arbeitsdatei und einer Kundenliste, die auf einem fremden Server gelandet ist.",
			faq: [
				{
					q: "Mein Etikettenbogen steht nicht in der Liste — was nun?",
					a: "Vergleichen Sie die Maße auf der Verpackung mit den angebotenen Rastern; viele Hersteller verwenden identische Geometrien unter eigenen Nummern. Passt keines exakt, ist das nächstkleinere Raster meist noch brauchbar, weil der Text mittig auf dem Feld sitzt."
				},
				{
					q: "Warum sitzt der Druck ein paar Millimeter daneben?",
					a: "Fast immer liegt es an der Skalierung im Druckdialog. Die Einstellung muss „Originalgröße“ oder „100 %“ heißen; „An Seite anpassen“ verkleinert das Dokument minimal, und über eine A4-Seite summiert sich das zu einem sichtbaren Versatz."
				},
				{
					q: "Kann ich eine lange Adresse unterbringen?",
					a: "Der Text wird innerhalb des Etiketts umgebrochen, damit er nicht in das Nachbarfeld läuft. Bei sehr langen Zeilen hilft eine kleinere Schriftgröße — der Regler geht bis auf 6 pt herunter."
				},
				{
					q: "Lassen sich Barcodes oder Logos aufbringen?",
					a: "Das Werkzeug setzt Text. Für ein Etikett mit Code ist der QR-Code-Generator der passende Schritt davor; das erzeugte Bild lässt sich dann in einer Vorlage weiterverwenden."
				}
			],
			related: ["stundenzettel", "qr-code-generator"]
		},
		en: {
			intro: [
				"Label sheets are cheap; labelling them is not. Anyone who has tried to line up thirty addresses in a word processor so that they actually land on the stickers after printing knows the outcome: two wasted sheets and a table nobody can find again next time.",
				"This tool produces the sheet as a finished PDF. You choose the grid, paste the addresses — one per paragraph — and get a file you print onto the label sheet with no further settings. The common formats from 24 to 40 labels per A4 page are built in, along with the margins and gaps each grid needs.",
				"Two small things make the difference in daily use. “First slot to use” takes account of a partly used sheet, leaving the already-peeled slots empty. And the cutting guides can be shown for checking: print once on plain paper, hold it against the label sheet, and the alignment is settled before the expensive sheet goes through the printer."
			],
			useCases: [
				{
					title: "A mail merge without the mail merge",
					text: "A mailing to thirty customers needs no database connection — the addresses from the email are already sitting there as text."
				},
				{
					title: "Return address labels in stock",
					text: "A sheet with your own address in every slot takes a minute to produce and saves writing on each envelope for the rest of the year."
				},
				{
					title: "Labelling stock and storage places",
					text: "Shelves, tool boxes and file spines get consistent labels instead of the handwriting of three different colleagues."
				},
				{
					title: "Preparing shipments in retail",
					text: "Anyone sending parcels regularly would rather stick the recipient's address on than write it onto the box by hand every time."
				},
				{
					title: "Name badges for an event",
					text: "For an open day or a training session, a larger grid with a name and a company is enough, printed the evening before."
				}
			],
			steps: [
				{
					title: "Choose the sheet",
					description: "Find the grid that matches your label sheet. What counts is the measurements and the count per page, not the brand — a sheet from another manufacturer with the same grid fits just as well."
				},
				{
					title: "Paste the addresses",
					description: "One address per paragraph: the lines inside a paragraph become the lines on the label, and a blank line ends it. The number of labels detected is shown under the field as you type — the quickest check there is."
				},
				{
					title: "Account for a partly used sheet",
					description: "If slots have already been peeled off a sheet, enter the number of the first free slot under “First slot to use”. Counting runs row by row from the top left, the way you read."
				},
				{
					title: "Test print, then print",
					description: "For the first attempt switch the cutting guides on and print onto plain paper. What matters is that the printer outputs the PDF at original size and not “fit to page” — otherwise the whole grid shifts by a few millimetres."
				}
			],
			privacy: "The sheet is produced entirely in your browser; the pasted addresses are neither transmitted nor stored. With a recipient list that is not a formality but the difference between an internal working file and a customer list that has ended up on somebody else's server.",
			faq: [
				{
					q: "My label sheet is not in the list — what now?",
					a: "Compare the measurements on the packaging with the grids offered; many manufacturers use identical geometries under their own numbers. If none fits exactly, the next smaller grid is usually still usable, because the text sits centred on the slot."
				},
				{
					q: "Why is the print a few millimetres out?",
					a: "Almost always it is the scaling in the print dialogue. The setting must read “actual size” or “100 %”; “fit to page” shrinks the document slightly, and across an A4 page that adds up to a visible offset."
				},
				{
					q: "Can I fit a long address?",
					a: "The text is wrapped inside the label so that it does not run into the neighbouring slot. For very long lines a smaller font size helps — the slider goes down to 6 pt."
				},
				{
					q: "Can I add barcodes or logos?",
					a: "The tool sets text. For a label with a code, the QR code generator is the right step beforehand; the produced image can then be used in a template."
				}
			],
			related: ["stundenzettel", "qr-code-generator"]
		}
	},
	stundenzettel: {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Arbeitszeiten müssen aufgezeichnet werden, und in vielen kleinen Betrieben passiert das bis heute auf einem Zettel im Fahrzeug oder in einer Tabelle, die jeden Monat neu zusammenkopiert wird. Beides funktioniert, solange niemand nachfragt — und beides ist mühsam in genau dem Moment, in dem jemand nachfragt.",
				"Dieses Werkzeug erzeugt einen Arbeitszeitnachweis für einen ganzen Monat als PDF. Sie tragen Beginn, Ende und Pause ein, die Tagesstunden und die Monatssumme werden gerechnet, und heraus kommt ein Blatt zum Ausdrucken und Unterschreiben — mit Namen, Betrieb, Monat und je einem Feld für beide Unterschriften.",
				"Damit das Ausfüllen nicht dreißigmal dasselbe ist, gibt es eine Vorbelegung: Sie geben die üblichen Zeiten einmal an, übernehmen sie für alle Werktage und ändern danach nur noch die Ausnahmen. Wochenenden bleiben leer, sind aber vorhanden — ein Samstagseinsatz muss schließlich irgendwo hin."
			],
			useCases: [
				{
					title: "Nachweis für Minijob und Teilzeit",
					text: "Gerade bei geringfügiger Beschäftigung wird die Aufzeichnung der täglichen Arbeitszeit erwartet, und ein sauberes Monatsblatt ist die einfachste Form davon."
				},
				{
					title: "Stunden gegenüber dem Kunden belegen",
					text: "Bei Arbeiten nach Aufwand ist ein unterschriebener Monatsnachweis die Grundlage, auf die sich beide Seiten später berufen können."
				},
				{
					title: "Übergabe an das Steuerbüro",
					text: "Ein PDF je Mitarbeiter und Monat lässt sich weiterreichen und ablegen, ohne dass jemand eine fremde Tabellendatei öffnen und interpretieren muss."
				},
				{
					title: "Aushilfen und Saisonkräfte",
					text: "Wo Arbeitszeiten stark schwanken, ist ein Blatt mit allen Tagen des Monats übersichtlicher als eine Sammlung einzelner Notizen."
				},
				{
					title: "Eigene Zeiten festhalten",
					text: "Auch wer allein arbeitet, hat am Jahresende eine belastbare Übersicht, wenn die Monate durchgehend auf demselben Blatt festgehalten wurden."
				}
			],
			steps: [
				{
					title: "Kopf ausfüllen",
					description: "Name, Betrieb und Monat stehen später oben auf dem Blatt. Der Monat bestimmt zugleich, wie viele Zeilen die Tabelle bekommt und welcher Wochentag auf welches Datum fällt — auch im Schaltjahr."
				},
				{
					title: "Werktage vorbelegen",
					description: "Tragen Sie die üblichen Zeiten und die Pause ein und übernehmen Sie sie. Alle Montage bis Freitage des Monats werden damit gefüllt; Wochenenden bleiben bewusst leer, lassen sich aber einzeln ausfüllen."
				},
				{
					title: "Abweichungen eintragen",
					description: "Ändern Sie danach nur noch die Tage, die anders liefen: Urlaub und Krankheit bleiben leer und zählen nicht mit, verkürzte Tage bekommen andere Zeiten, und in die Bemerkung passt ein kurzer Hinweis wie Urlaub oder Baustelle."
				},
				{
					title: "Summe prüfen und erzeugen",
					description: "Unter der Tabelle stehen die Monatssumme und die Zahl der Arbeitstage. Stimmen beide, erzeugen Sie das PDF; die Unterschriftenfelder stehen am unteren Rand des Blattes bereit."
				}
			],
			privacy: "Alle Eingaben bleiben in Ihrem Browser, und das PDF entsteht ebenfalls dort; weder Namen noch Arbeitszeiten werden übertragen oder gespeichert. Arbeitszeitdaten sind Personaldaten, und ein Werkzeug, das sie zur Verarbeitung an einen Server schickt, wäre für diesen Zweck die falsche Wahl.",
			faq: [
				{
					q: "Ersetzt das Blatt eine Zeiterfassung?",
					a: "Es ist ein Nachweis, kein System: Es hält fest, was eingetragen wurde, und liefert eine unterschreibbare Fassung davon. Für laufende Erfassung mit Projektbezug ist eine richtige Zeiterfassung der bessere Weg."
				},
				{
					q: "Wie werden Pausen behandelt?",
					a: "Die Pause wird in Minuten eingetragen und von der Spanne zwischen Beginn und Ende abgezogen. Die gesetzlichen Mindestpausen prüft das Werkzeug nicht — die Verantwortung dafür bleibt beim Betrieb."
				},
				{
					q: "Was passiert bei einer Schicht über Mitternacht?",
					a: "Endet die Schicht vor ihrem Beginn, wird sie als über Mitternacht laufend gerechnet und ergibt korrekt positive Stunden. Ein negativer Tag käme sonst in die Monatssumme und würde dort unbemerkt bleiben."
				},
				{
					q: "Bleiben meine Eingaben erhalten, wenn ich die Seite neu lade?",
					a: "Nein, die Angaben stehen nur im geöffneten Tab. Erzeugen Sie das PDF, bevor Sie die Seite verlassen — die fertige Datei ist die Fassung, die bleibt."
				}
			],
			related: ["etiketten-drucken", "pdf-werkzeuge"]
		},
		en: {
			intro: [
				"Working time has to be recorded, and in plenty of small businesses that still happens on a note in the van or in a spreadsheet copied together afresh each month. Both work as long as nobody asks — and both are painful at exactly the moment somebody does.",
				"This tool produces a record of working time for a whole month as a PDF. You enter the start, the end and the break, the daily hours and the monthly total are worked out, and out comes a sheet to print and sign — with the name, the employer, the month and a field for each of the two signatures.",
				"So that filling it in is not the same thing thirty times over, there is a prefill: you state the usual times once, apply them to every weekday, and then change only the exceptions. Weekends stay empty but are present — a Saturday call-out has to go somewhere after all."
			],
			useCases: [
				{
					title: "A record for part-time and casual work",
					text: "For marginal employment in particular the daily working time is expected to be recorded, and a clean monthly sheet is the simplest form of that."
				},
				{
					title: "Evidencing hours to a client",
					text: "For work charged by time spent, a signed monthly record is the basis both sides can point to later on."
				},
				{
					title: "Handing over to the accountant",
					text: "One PDF per person and month can be passed on and filed without anybody having to open and interpret somebody else's spreadsheet."
				},
				{
					title: "Temporary and seasonal staff",
					text: "Where hours vary a lot, one sheet holding every day of the month is clearer than a collection of separate notes."
				},
				{
					title: "Recording your own hours",
					text: "Even working alone, you end the year with a defensible overview if the months were recorded consistently on the same sheet."
				}
			],
			steps: [
				{
					title: "Fill in the header",
					description: "The name, the employer and the month appear at the top of the sheet later on. The month also decides how many rows the table gets and which weekday falls on which date — in a leap year too."
				},
				{
					title: "Prefill the weekdays",
					description: "Enter the usual times and the break and apply them. Every Monday to Friday of the month is filled in; weekends are deliberately left empty but can be filled in individually."
				},
				{
					title: "Enter the exceptions",
					description: "Then change only the days that went differently: holidays and sickness stay empty and do not count, shorter days get other times, and a brief note such as holiday or site work fits in the note column."
				},
				{
					title: "Check the total and create",
					description: "Under the table sit the monthly total and the number of working days. When both look right, create the PDF; the signature fields are waiting at the bottom of the sheet."
				}
			],
			privacy: "Every entry stays in your browser and the PDF is produced there too; neither names nor working times are transmitted or stored. Working-time data is personnel data, and a tool that sent it to a server for processing would be the wrong choice for this job.",
			faq: [
				{
					q: "Does this replace a time-tracking system?",
					a: "It is a record, not a system: it holds what was entered and produces a signable version of it. For ongoing tracking tied to projects, proper time tracking is the better route."
				},
				{
					q: "How are breaks handled?",
					a: "The break is entered in minutes and deducted from the span between start and end. The tool does not check statutory minimum breaks — that responsibility stays with the employer."
				},
				{
					q: "What happens with a shift over midnight?",
					a: "If the shift ends before it starts, it is treated as running past midnight and correctly yields positive hours. A negative day would otherwise enter the monthly total and go unnoticed there."
				},
				{
					q: "Are my entries kept if I reload the page?",
					a: "No, they live only in the open tab. Create the PDF before leaving the page — the finished file is the version that lasts."
				}
			],
			related: ["etiketten-drucken", "pdf-werkzeuge"]
		}
	},
	texterkennung: {
		updatedAt: "2026-08-18",
		de: {
			intro: [
				"Ein abfotografierter Beleg ist für einen Computer ein Bild und sonst nichts. Der Betrag darauf ist nicht suchbar, die Adresse nicht kopierbar, die Rechnungsnummer nicht in ein Formular zu übernehmen — obwohl alles davon gut lesbar vor einem liegt. Texterkennung schließt diese Lücke: Sie liest die Buchstaben aus dem Bild heraus und gibt sie als Text zurück.",
				"Dieses Werkzeug erkennt deutschen und englischen Text und arbeitet dabei vollständig auf Ihrem Gerät. Auch die Spracherkennungsdaten kommen von dieser Website und nicht von einem fremden Anbieter — beim Öffnen des Werkzeugs entsteht also keine Verbindung nach außen, und das Bild selbst wird ohnehin nicht übertragen.",
				"Wie gut das Ergebnis wird, entscheidet fast ausschließlich die Vorlage. Ein gerade aufgenommener, scharfer Ausschnitt mit gutem Kontrast liefert Text, den man nur noch überfliegen muss. Ein schräges Foto bei Kunstlicht liefert Bruchstücke. Es lohnt sich deshalb mehr, die Aufnahme zu wiederholen, als am Ergebnis herumzubessern."
			],
			useCases: [
				{
					title: "Rechnungsangaben übernehmen",
					text: "Rechnungsnummer, Betrag und Steuersatz aus einem Beleg herauslesen, statt sie abzutippen — mit dem üblichen Zahlendreher, den niemand bemerkt."
				},
				{
					title: "Visitenkarten erfassen",
					text: "Nach einer Messe liegen zwanzig Karten auf dem Tisch. Abfotografiert und erkannt sind die Kontaktdaten in wenigen Minuten in der Adressverwaltung."
				},
				{
					title: "Alte Unterlagen durchsuchbar machen",
					text: "Ein Aktenordner ist erst dann wirklich digitalisiert, wenn sich der Inhalt suchen lässt — nicht schon dann, wenn ein Bild davon existiert."
				},
				{
					title: "Zitate aus gedruckten Vorlagen",
					text: "Ein Absatz aus einem Prospekt, einer Norm oder einem Behördenschreiben landet als Text im Angebot, ohne ihn Wort für Wort zu übertragen."
				},
				{
					title: "Typenschilder und Seriennummern",
					text: "Auf einem Foto vom Typenschild einer Maschine ist die Nummer lesbar, aber nicht kopierbar. Genau dafür ist die Erkennung eines kleinen Ausschnitts gedacht."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "Wählen Sie ein Foto, einen Screenshot oder einen Bildscan. Direkt aus einem PDF wird hier nicht gelesen — wandeln Sie in dem Fall zuerst die betreffende Seite in ein Bild um, am besten mit 300 dpi."
				},
				{
					title: "Sprache festlegen",
					description: "Wählen Sie die Sprache, in der der Text verfasst ist. Beide gleichzeitig ist möglich und sinnvoll bei gemischten Vorlagen, kostet aber etwas Genauigkeit und Zeit — bei rein deutschem Text bleiben Sie besser bei Deutsch."
				},
				{
					title: "Erkennung starten",
					description: "Beim ersten Durchgang wird die Erkennung geladen, was je nach Verbindung einen Moment dauert; danach zeigt der Knopf den Fortschritt in Prozent. Für ein einzelnes Bild dauert die Erkennung selbst meist wenige Sekunden."
				},
				{
					title: "Ergebnis nachsehen und übernehmen",
					description: "Der erkannte Text erscheint in einem bearbeitbaren Feld — Zahlen und Eigennamen sollten Sie kurz gegenlesen, denn dort sind Verwechslungen am wahrscheinlichsten. Danach kopieren Sie ihn oder speichern ihn als Textdatei."
				}
			],
			privacy: "Die Erkennung läuft vollständig auf Ihrem Gerät: Das Bild wird nicht hochgeladen, und die dafür nötige Software samt Sprachdaten wird von dieser Website ausgeliefert statt von einem fremden Anbieter. Beim Öffnen des Werkzeugs wird also keine dritte Seite aufgerufen — was gerade dann zählt, wenn auf der Vorlage Kundendaten oder Beträge stehen.",
			faq: [
				{
					q: "Warum ist die Erkennung stellenweise falsch?",
					a: "Meistens liegt es an der Vorlage: Unschärfe, Schatten, eine schräge Aufnahme oder eine gemusterte Unterlage kosten mehr Genauigkeit als jede Einstellung. Ein zweites, gerade und formatfüllend aufgenommenes Foto bringt fast immer mehr als Nacharbeit am Text."
				},
				{
					q: "Kann ich eine Handschrift erkennen lassen?",
					a: "Nein. Die Erkennung ist auf gedruckte Schrift ausgelegt; bei Handschrift sind die Ergebnisse nicht brauchbar. Das gilt für praktisch alle Werkzeuge dieser Art, die ohne Server auskommen."
				},
				{
					q: "Warum dauert der erste Start länger?",
					a: "Beim ersten Durchgang lädt der Browser die Erkennungssoftware und die Sprachdaten. Das sind einige Megabyte, die danach im Zwischenspeicher liegen — der zweite Lauf beginnt sofort."
				},
				{
					q: "Bleibt das Layout der Vorlage erhalten?",
					a: "Nur grob. Zeilenumbrüche bleiben meist stehen, Spalten und Tabellen dagegen werden zu fortlaufendem Text. Für tabellarische Vorlagen ist deshalb etwas Nacharbeit einzuplanen."
				}
			],
			related: ["bild-komprimieren", "pdf-zu-bildern"]
		},
		en: {
			intro: [
				"A photographed receipt is an image to a computer and nothing else. The amount on it cannot be searched, the address cannot be copied, the invoice number cannot be carried into a form — even though all of it is sitting there perfectly legible. Text recognition closes that gap: it reads the letters out of the picture and hands them back as text.",
				"This tool recognises German and English text and does the whole job on your device. Even the recognition data is served by this website rather than by a third party — so opening the tool opens no outbound connection, and the picture itself is not transmitted in any case.",
				"How good the result is depends almost entirely on the input. A straight, sharp, well-contrasted shot yields text you only have to skim. A tilted photo under artificial light yields fragments. It is therefore worth more to retake the picture than to patch up the output."
			],
			useCases: [
				{
					title: "Carrying over invoice details",
					text: "Read the invoice number, the amount and the tax rate out of a receipt instead of retyping them — with the usual transposed digits nobody notices."
				},
				{
					title: "Capturing business cards",
					text: "After a trade fair twenty cards sit on the desk. Photographed and recognised, the contact details are in the address book within minutes."
				},
				{
					title: "Making old papers searchable",
					text: "A file of documents is only really digitised once its contents can be searched — not merely once a picture of it exists."
				},
				{
					title: "Quoting from printed sources",
					text: "A paragraph from a brochure, a standard or an official letter lands in the quotation as text, without transcribing it word by word."
				},
				{
					title: "Rating plates and serial numbers",
					text: "In a photo of a machine's rating plate the number is legible but not copyable. Recognising a small crop is exactly what this is for."
				}
			],
			steps: [
				{
					title: "Choose the image",
					description: "Pick a photo, a screenshot or a scanned image. PDFs are not read here — in that case convert the page in question to an image first, ideally at 300 dpi."
				},
				{
					title: "Set the language",
					description: "Choose the language the text is written in. Both at once is possible and sensible for mixed material, but costs a little accuracy and time — for purely German text, stay with German."
				},
				{
					title: "Start the recognition",
					description: "On the first run the engine is loaded, which takes a moment depending on your connection; after that the button shows the progress as a percentage. For a single image the recognition itself usually takes a few seconds."
				},
				{
					title: "Review and take the result",
					description: "The recognised text appears in an editable field — numbers and proper names are worth a quick read, because that is where confusions are likeliest. Then copy it or save it as a text file."
				}
			],
			privacy: "Recognition runs entirely on your device: the image is not uploaded, and the software and language data needed for it are served by this website rather than by a third party. Opening the tool therefore contacts no other site — which counts most when the material shows customer details or amounts.",
			faq: [
				{
					q: "Why is the recognition wrong in places?",
					a: "Usually it is the input: blur, shadows, a tilted shot or a patterned surface cost more accuracy than any setting can win back. A second photo, straight and filling the frame, almost always beats reworking the text."
				},
				{
					q: "Can it recognise handwriting?",
					a: "No. The recognition is built for printed type; with handwriting the results are not usable. That is true of practically every tool of this kind that works without a server."
				},
				{
					q: "Why does the first start take longer?",
					a: "On the first run the browser loads the recognition software and the language data. That is a few megabytes, cached afterwards — the second run begins immediately."
				},
				{
					q: "Is the layout of the original kept?",
					a: "Only roughly. Line breaks usually survive, while columns and tables become running text. For tabular material, plan for some rework."
				}
			],
			related: ["bild-komprimieren", "pdf-zu-bildern"]
		}
	},
	"impressum-generator": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Ein Impressum ist keine Höflichkeit, sondern eine Auskunft: Wer betreibt diese Seite, und wo ist diese Person erreichbar, wenn etwas zu klären ist? § 5 des Digitale-Dienste-Gesetzes verlangt diese Angaben von jedem, der eine Website geschäftsmäßig betreibt — und „geschäftsmäßig“ beginnt deutlich früher, als die meisten annehmen. Eine Seite, auf der eine Leistung beschrieben und eine Telefonnummer genannt wird, ist bereits erfasst.",
				"Dieser Generator stellt ein Muster aus Ihren Angaben zusammen. Sie wählen die Rechtsform, tragen Anschrift und Kontakt ein und kreuzen an, was auf Ihren Betrieb zutrifft: Registereintrag, Umsatzsteuer-Identifikationsnummer, ein reglementierter Beruf mit Kammer, eine Aufsichtsbehörde, eine redaktionell verantwortliche Person nach dem Medienstaatsvertrag. Jede Ankreuzung fügt genau einen Abschnitt hinzu, jede zurückgenommene Ankreuzung entfernt ihn wieder.",
				"Zwei Dinge unterscheiden das Ergebnis von den Mustern, die seit Jahren unverändert im Netz stehen. Es verweist nicht auf die Online-Streitbeilegungsplattform der Europäischen Kommission — die wurde im Juli 2025 abgeschaltet, der Link führt seither ins Leere. Und es fragt nicht nach Ihrer Steuernummer: Ins Impressum gehört die Umsatzsteuer-Identifikationsnummer, nicht die Nummer, unter der Ihr Finanzamt Sie führt."
			],
			useCases: [
				{
					title: "Die erste eigene Website eines Handwerksbetriebs",
					text: "Ein Meisterbetrieb mit Handwerkskammer, Berufsbezeichnung und Verleihungsstaat braucht mehr Angaben als ein reiner Onlineshop. Die Ankreuzfelder führen durch genau diese Zusätze."
				},
				{
					title: "Umzug von der GbR in die GmbH",
					text: "Mit der neuen Rechtsform kommen Registergericht, Registernummer und die Geschäftsführung ins Impressum. Der Generator belegt die Registerangabe passend zur gewählten Rechtsform vor."
				},
				{
					title: "Ein Verein, der endlich online geht",
					text: "Vereinsregister statt Handelsregister, Vorstand statt Geschäftsführung: Die Beschriftung der Vertretung richtet sich nach der Rechtsform, damit der Text nicht wie ein ausgefülltes Formular klingt."
				},
				{
					title: "Ein Blog auf der Firmenseite",
					text: "Wer regelmäßig redaktionelle Beiträge veröffentlicht, braucht zusätzlich eine verantwortliche Person mit Anschrift nach § 18 Abs. 2 Medienstaatsvertrag. Ein eigenes Ankreuzfeld ergänzt diesen Abschnitt."
				},
				{
					title: "Ein altes Impressum überprüfen",
					text: "Stellen Sie Ihre Angaben neu zusammen und vergleichen Sie das Ergebnis mit dem, was auf Ihrer Seite steht. Vor allem der ODR-Verweis steht noch in erstaunlich vielen Impressen."
				}
			],
			steps: [
				{
					title: "Rechtsform wählen",
					description: "Die Auswahl steuert, wie die Vertretung beschriftet wird und ob ein Registereintrag vorbelegt ist. Eine GmbH hat eine Geschäftsführung und eine Handelsregisternummer, ein Verein einen Vorstand und eine Vereinsregisternummer."
				},
				{
					title: "Anbieter und Kontakt eintragen",
					description: "Name oder Firma, vollständige Anschrift mit Straße, Postleitzahl und Ort sowie mindestens eine E-Mail-Adresse. Ein Postfach genügt nicht: Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann."
				},
				{
					title: "Zusätzliche Angaben ankreuzen",
					description: "Registereintrag, Umsatzsteuer-Identifikationsnummer, reglementierter Beruf, Aufsichtsbehörde, Berufshaftpflicht und redaktionelle Verantwortung. Zu jeder gesetzten Ankreuzung erscheinen die zugehörigen Felder direkt darunter."
				},
				{
					title: "Streitbeilegung entscheiden",
					description: "Sie erklären entweder, dass Sie an einem Schlichtungsverfahren vor einer Verbraucherschlichtungsstelle nicht teilnehmen, oder Sie benennen die zuständige Stelle. Beides ist zulässig; die Angabe selbst ist es, die nicht fehlen darf."
				},
				{
					title: "Prüfen und übernehmen",
					description: "Lesen Sie die Vorschau Zeile für Zeile gegen Ihren Registerauszug und Ihre Gewerbeanmeldung. Dann kopieren Sie den Text oder laden ihn als Datei herunter und fügen ihn in Ihr Redaktionssystem ein."
				}
			],
			privacy: "Ihre Firmendaten bleiben in Ihrem Browser. Der Text entsteht während der Eingabe im Gerät und wird an keinen Server übertragen, gespeichert oder ausgewertet — dieses Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Das ist bei einem Impressum kein akademischer Unterschied: Die Angaben, die Sie hier eintragen, umfassen die private Anschrift, wenn Sie von zu Hause aus arbeiten, und einige verbreitete Generatoren senden genau diese Eingaben zur Erzeugung an ihren Server.",
			faq: [
				{
					q: "Brauche ich ein Impressum, wenn ich nur eine kleine Seite ohne Shop habe?",
					a: "Sobald die Seite geschäftsmäßig betrieben wird, ja — und das beginnt nicht erst beim Verkauf. Eine Seite, die eine Leistung beschreibt und zur Kontaktaufnahme einlädt, ist bereits geschäftsmäßig. Rein private Seiten ohne jeden geschäftlichen Bezug sind ausgenommen, aber die Grenze ist enger, als sie klingt."
				},
				{
					q: "Warum verweist der Text nicht auf die OS-Plattform der EU?",
					a: "Weil es sie nicht mehr gibt. Die Europäische Kommission hat die Plattform zur Online-Streitbeilegung am 20. Juli 2025 abgeschaltet. Ein Verweis darauf führt heute ins Leere und ist damit eher ein Risiko als eine Pflichterfüllung. Die Angabe zur Verbraucherschlichtungsstelle nach dem Verbraucherstreitbeilegungsgesetz bleibt davon unberührt und steht weiterhin im Text."
				},
				{
					q: "Gehört meine Steuernummer ins Impressum?",
					a: "Nein. § 5 des Digitale-Dienste-Gesetzes verlangt die Umsatzsteuer-Identifikationsnummer, sofern eine vorhanden ist. Die Steuernummer des Finanzamts ist eine andere Angabe, sie ist nicht öffentlich und hat im Impressum nichts verloren. Deshalb bietet dieses Werkzeug dafür auch kein Feld an."
				},
				{
					q: "Reicht ein Postfach als Anschrift?",
					a: "Nein. Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann. Wer von zu Hause aus arbeitet, muss deshalb in aller Regel die Wohnanschrift angeben. Eine Geschäftsadresse bei einem Anbieter, der Post entgegennimmt und weiterleitet, kann eine Alternative sein — das sollten Sie im Einzelfall prüfen lassen."
				},
				{
					q: "Ersetzt dieses Werkzeug die Prüfung durch eine Kanzlei?",
					a: "Nein. Es stellt ein Muster aus Ihren Angaben zusammen und macht sichtbar, welche Abschnitte üblicherweise dazugehören. Welche Pflichtangaben Ihr Betrieb tatsächlich schuldet, hängt an Rechtsform, Branche und Tätigkeit — und diese Umstände kennt das Werkzeug nicht. Lassen Sie den fertigen Text prüfen, bevor Sie ihn veröffentlichen."
				}
			],
			related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"]
		},
		en: {
			intro: [
				"An imprint is not a courtesy, it is a piece of information: who runs this site, and where can that person be reached when something needs sorting out? Section 5 of the German Digital Services Act requires these details from anyone running a website in the course of business — and “in the course of business” starts a good deal earlier than most people assume. A page that describes a service and gives a phone number already qualifies.",
				"This generator assembles a sample from the details you enter. You pick the legal form, fill in the address and contact details, and tick what applies to your business: an entry in a register, a VAT identification number, a regulated profession with its chamber, a supervisory authority, a person with editorial responsibility under the German media treaty. Every tick adds exactly one section, and unticking it takes that section away again.",
				"Two things set the result apart from the samples that have sat unchanged on the web for years. It does not point at the European Commission's online dispute resolution platform — that was shut down in July 2025, and the link has led nowhere since. And it does not ask for your tax number: what belongs in an imprint is the VAT identification number, not the number your tax office files you under."
			],
			useCases: [
				{
					title: "A trade business putting up its first website",
					text: "A master craftsman with a chamber, a professional title and an awarding state needs more details than a plain online shop. The tick boxes walk through exactly those additions."
				},
				{
					title: "Moving from a partnership to a limited company",
					text: "The new legal form brings the registering court, the register number and the managing directors into the imprint. The generator pre-selects the register entry to match the legal form you choose."
				},
				{
					title: "An association finally going online",
					text: "An association register rather than a commercial one, a board rather than managing directors: the wording for the representation follows the legal form, so the text does not read like a filled-in form."
				},
				{
					title: "A blog on the company site",
					text: "Anyone publishing editorial content regularly also needs a responsible person with an address under section 18 (2) of the German media treaty. A separate tick box adds that section."
				},
				{
					title: "Checking an old imprint",
					text: "Assemble your details afresh and compare the result with what is on your site. The dead ODR reference in particular is still sitting in a surprising number of imprints."
				}
			],
			steps: [
				{
					title: "Choose the legal form",
					description: "The choice controls how the representation is labelled and whether a register entry is pre-selected. A limited company has managing directors and a commercial register number, an association has a board and an association register number."
				},
				{
					title: "Enter the provider and contact details",
					description: "Name or company, a complete address with street, postcode and town, and at least an email address. A post office box is not enough: what is required is an address at which documents can actually be served."
				},
				{
					title: "Tick the additional details",
					description: "Register entry, VAT identification number, regulated profession, supervisory authority, indemnity insurance and editorial responsibility. For every tick, the matching fields appear directly underneath."
				},
				{
					title: "Decide on dispute resolution",
					description: "You either declare that you do not take part in proceedings before a consumer arbitration board, or you name the competent body. Both are permissible; it is the statement itself that must not be missing."
				},
				{
					title: "Check it, then take it over",
					description: "Read the preview line by line against your register extract and your trade registration. Then copy the text or download it as a file and paste it into your content management system."
				}
			],
			privacy: "Your company details stay in your browser. The text is built on your device as you type and is never transmitted to a server, stored or analysed — this tool has no counterpart to send anything to. For an imprint that is not an academic distinction: the details you enter here include your private address if you work from home, and several widely used generators send exactly those inputs to their server to produce the text.",
			faq: [
				{
					q: "Do I need an imprint for a small site with no shop?",
					a: "As soon as the site is run in the course of business, yes — and that does not start with selling. A page that describes a service and invites people to get in touch is already commercial. Purely private pages with no business connection are exempt, but the boundary is narrower than it sounds."
				},
				{
					q: "Why does the text not point at the EU ODR platform?",
					a: "Because it no longer exists. The European Commission shut down the online dispute resolution platform on 20 July 2025. A reference to it now leads nowhere and is a liability rather than compliance. The statement about a consumer arbitration board under the German dispute resolution act is unaffected and stays in the text."
				},
				{
					q: "Does my tax number belong in the imprint?",
					a: "No. Section 5 of the German Digital Services Act asks for the VAT identification number, where one exists. The tax number issued by the tax office is a different thing, it is not public, and it has no place in an imprint. That is why this tool offers no field for it."
				},
				{
					q: "Is a post office box enough as an address?",
					a: "No. What is required is an address at which documents can actually be served. Anyone working from home will therefore usually have to give their home address. A business address with a provider that receives and forwards post can be an alternative — have that checked for your particular case."
				},
				{
					q: "Does this tool replace a review by a law firm?",
					a: "No. It assembles a sample from your details and shows which sections usually belong in one. Which mandatory details your business actually owes depends on its legal form, its sector and what it does — and the tool knows none of that. Have the finished text reviewed before you publish it."
				}
			],
			related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"]
		}
	},
	"datenschutzerklaerung-generator": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Eine Datenschutzerklärung beantwortet eine einzige Frage, und zwar für jede Verarbeitung einzeln: Was passiert mit meinen Daten, und mit welchem Recht? Genau daran scheitern die meisten frei verfügbaren Muster. Sie zählen auf, welche Dienste eine Website einsetzt, nennen aber weder den Zweck noch die Rechtsgrundlage — und damit erfüllen sie Art. 13 der Datenschutz-Grundverordnung nicht, obwohl der Text vollständig aussieht.",
				"Dieser Generator arbeitet mit Bausteinen. Sie tragen den Verantwortlichen ein und kreuzen an, was auf Ihre Website zutrifft: externes Hosting, Server-Logdateien, Kontaktformular, Cookies, Webanalyse, Newsletter, Kartendienst, Schriftarten, Videos, soziale Netzwerke, Zahlungsdienstleister, Buchungssystem, Chat, Bewerbungen, Übermittlung in ein Drittland. Zu jedem gesetzten Haken erscheint ein Abschnitt mit Zweck und Rechtsgrundlage; ein entfernter Haken nimmt ihn wieder heraus.",
				"Der Unterschied zwischen Einwilligung und berechtigtem Interesse ist dabei fest verdrahtet und nicht Geschmackssache. Webanalyse, eingebundene Karten, Videos und von außen geladene Schriftarten werden hier auf Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG gestützt, also auf eine Einwilligung. Ein Muster, das an diesen Stellen ein berechtigtes Interesse behauptet, schreibt eine falsche Angabe auf Ihre Seite — und sie steht dort schwarz auf weiß."
			],
			useCases: [
				{
					title: "Website ohne Analyse und ohne Werbung",
					text: "Der häufigste Fall bei kleinen Betrieben: Hosting, Server-Logdateien, ein Kontaktformular, sonst nichts. Nehmen Sie die Haken bei allem heraus, was Sie nicht einsetzen — der Text wird dadurch kürzer und richtiger."
				},
				{
					title: "Onlineshop mit Zahlungsdienstleister",
					text: "Bestellungen laufen über Art. 6 Abs. 1 lit. b DSGVO, die Zahlungsabwicklung über eigenverantwortliche Dienstleister, und die handels- und steuerrechtlichen Aufbewahrungsfristen bleiben unberührt."
				},
				{
					title: "Seite mit Karte und eingebetteten Videos",
					text: "Beide Dienste bauen beim Laden eine Verbindung zu einem fremden Server auf und übertragen dabei die IP-Adresse. Die zugehörigen Abschnitte sagen genau das und stützen sich auf eine Einwilligung."
				},
				{
					title: "Betrieb, der offene Stellen ausschreibt",
					text: "Bewerbungsunterlagen sind eine eigene Verarbeitung nach § 26 Abs. 1 BDSG mit eigener Löschfrist. Der Baustein nennt beides, statt Bewerbungen unter „Kontaktaufnahme“ verschwinden zu lassen."
				},
				{
					title: "Die eigene Erklärung gegenlesen",
					text: "Stellen Sie den Text neu zusammen und vergleichen Sie ihn Abschnitt für Abschnitt mit dem, was auf Ihrer Seite steht. Auffällig sind meist Dienste, die längst abgeschaltet sind, und fehlende Rechtsgrundlagen."
				}
			],
			steps: [
				{
					title: "Verantwortlichen eintragen",
					description: "Name, vollständige Anschrift und eine Kontaktmöglichkeit. Wenn Sie eine datenschutzbeauftragte Person benannt haben, kommt deren Kontakt dazu; ohne Benennung bleibt der Abschnitt weg, statt eine Stelle zu erfinden, die es nicht gibt."
				},
				{
					title: "Betrieb der Website ankreuzen",
					description: "Externes Hosting und Server-Logdateien treffen auf nahezu jede Website zu. Wo Sie den Anbieter und den Serverstandort kennen, tragen Sie beides ein — die Angabe macht aus einer allgemeinen Formel eine überprüfbare Aussage."
				},
				{
					title: "Kontaktwege und Auswertung wählen",
					description: "Kontaktformular, E-Mail, Telefon; danach technisch notwendige Cookies, einwilligungspflichtige Cookies mit dem eingesetzten Einwilligungswerkzeug und gegebenenfalls die Webanalyse mit dem Namen des Werkzeugs."
				},
				{
					title: "Eingebundene Dienste benennen",
					description: "Kartendienst, Schriftarten, Videos und Content Delivery Network. Bei den Schriftarten entscheidet die Auswahl zwischen lokaler Auslieferung und Google Fonts über den ganzen Absatz — die beiden Fälle sind datenschutzrechtlich nicht dasselbe."
				},
				{
					title: "Prüfen, kopieren, einbinden",
					description: "Lesen Sie die Vorschau gegen das, was Ihre Seite tatsächlich lädt. Dann kopieren Sie den Text oder laden ihn als Datei herunter und verlinken ihn von jeder Seite aus — üblicherweise aus der Fußzeile."
				}
			],
			privacy: "Alles, was Sie eintragen, bleibt auf Ihrem Gerät: die Anschrift Ihres Betriebs, die Namen Ihrer Dienstleister, der Kontakt Ihrer datenschutzbeauftragten Person. Der Text entsteht im Browser, es gibt keine Übertragung an einen Server und nichts wird gespeichert. Bei einem Werkzeug für Datenschutztexte wäre alles andere auch schwer zu erklären — die Liste der eingesetzten Dienste ist ein recht genaues Abbild der technischen Ausstattung eines Betriebs.",
			faq: [
				{
					q: "Warum stützt der Text die Webanalyse nicht auf ein berechtigtes Interesse?",
					a: "Weil das Speichern und Auslesen von Informationen auf dem Endgerät nach § 25 Abs. 1 TDDDG eine Einwilligung verlangt, sobald es nicht technisch notwendig ist. Für die Reichweitenmessung gilt das praktisch immer. Ein Muster, das hier ein berechtigtes Interesse behauptet, ist bequemer und falsch."
				},
				{
					q: "Muss ich jeden eingesetzten Dienst namentlich nennen?",
					a: "Die Verordnung verlangt, dass Betroffene die Verarbeitung nachvollziehen können, und dazu gehört in aller Regel, wer die Daten erhält. Der Name des Hosters, des Analysewerkzeugs oder des Zahlungsdienstleisters gehört deshalb hinein. Wo der Generator ein Feld dafür anbietet, ist die Angabe nicht schmückendes Beiwerk."
				},
				{
					q: "Was ist der Unterschied zwischen technisch notwendigen und anderen Cookies?",
					a: "Technisch notwendig ist, was die Seite braucht, um zu funktionieren — eine Sitzung, ein Warenkorb, der Schutz eines Formulars. Alles andere, insbesondere Reichweitenmessung und Werbung, darf erst nach einer Einwilligung gesetzt werden. Die Abschnitte im erzeugten Text sind entsprechend getrennt und nennen unterschiedliche Rechtsgrundlagen."
				},
				{
					q: "Brauche ich eine datenschutzbeauftragte Person?",
					a: "Nicht jeder Betrieb. Eine Benennungspflicht besteht unter anderem, wenn die Kerntätigkeit in umfangreicher Verarbeitung besonderer Datenkategorien oder in umfangreicher regelmäßiger Beobachtung besteht. Kreuzen Sie das Feld nur an, wenn Sie tatsächlich jemanden benannt haben — eine erfundene Stelle im Text ist schlechter als keine."
				},
				{
					q: "Ersetzt dieses Werkzeug eine anwaltliche Prüfung?",
					a: "Nein. Es setzt ein Muster aus Bausteinen zusammen und zeigt, welche Angaben zu welcher Verarbeitung gehören. Ob die Auswahl zu Ihrem Betrieb passt und ob Sie alle Verarbeitungen erfasst haben, kann es nicht wissen. Lassen Sie den Text prüfen, bevor Sie ihn veröffentlichen."
				}
			],
			related: ["impressum-generator", "ki-kennzeichnung-bilder"]
		},
		en: {
			intro: [
				"A privacy policy answers a single question, separately for every operation: what happens to my data, and on what legal basis? That is exactly where most freely available samples fail. They list the services a website uses but name neither the purpose nor the legal basis — and so they do not satisfy Article 13 of the General Data Protection Regulation, even though the text looks complete.",
				"This generator works with blocks. You enter the controller and tick what applies to your website: external hosting, server log files, a contact form, cookies, web analytics, a newsletter, a map service, web fonts, videos, social networks, payment providers, a booking system, chat, job applications, transfers to a third country. Each tick produces a section stating the purpose and the legal basis; removing a tick takes it out again.",
				"The distinction between consent and legitimate interest is hard-wired here rather than a matter of taste. Web analytics, embedded maps, videos and externally loaded fonts are placed on Article 6 (1) (a) GDPR together with section 25 (1) TDDDG — that is, on consent. A sample that claims a legitimate interest at those points puts an incorrect statement on your site, and there it sits in black and white."
			],
			useCases: [
				{
					title: "A site with no analytics and no advertising",
					text: "The commonest case for a small business: hosting, server log files, a contact form, nothing else. Untick everything you do not use — the text gets shorter and more accurate at the same time."
				},
				{
					title: "An online shop with a payment provider",
					text: "Orders run on Article 6 (1) (b) GDPR, payments through providers acting on their own responsibility, and the retention periods under commercial and tax law remain unaffected."
				},
				{
					title: "A page with a map and embedded videos",
					text: "Both services open a connection to a third-party server when they load, transmitting the IP address. The matching sections say precisely that and rest on consent."
				},
				{
					title: "A business advertising vacancies",
					text: "Application documents are processing in their own right under section 26 (1) BDSG, with their own deletion period. The block names both, instead of letting applications disappear under “getting in touch”."
				},
				{
					title: "Proof-reading your existing policy",
					text: "Assemble the text afresh and compare it section by section with what is on your site. What usually stands out are services switched off long ago, and missing legal bases."
				}
			],
			steps: [
				{
					title: "Enter the controller",
					description: "Name, complete address and a way to get in touch. If you have appointed a data protection officer, their contact details are added; without an appointment the section stays out, rather than inventing a role that does not exist."
				},
				{
					title: "Tick how the website is run",
					description: "External hosting and server log files apply to almost every website. Where you know the provider and the location of the servers, enter both — that turns a general formula into a statement someone can check."
				},
				{
					title: "Choose contact channels and analysis",
					description: "Contact form, email, telephone; then technically necessary cookies, cookies requiring consent along with the consent tool in use, and web analytics with the name of the tool where applicable."
				},
				{
					title: "Name the embedded services",
					description: "Map service, web fonts, videos and content delivery network. For fonts the choice between local delivery and Google Fonts decides the whole paragraph — in data protection terms the two are not the same case."
				},
				{
					title: "Check it, copy it, link it",
					description: "Read the preview against what your site actually loads. Then copy the text or download it as a file and link to it from every page, usually from the footer."
				}
			],
			privacy: "Everything you enter stays on your device: the address of your business, the names of your service providers, the contact details of your data protection officer. The text is built in the browser, nothing is transmitted to a server and nothing is stored. For a tool that writes data protection texts, anything else would be hard to explain — the list of services in use is a fairly precise picture of a company's technical setup.",
			faq: [
				{
					q: "Why does the text not place web analytics on a legitimate interest?",
					a: "Because storing and reading information on a terminal device requires consent under section 25 (1) TDDDG as soon as it is not technically necessary. For audience measurement that is practically always the case. A sample that claims a legitimate interest here is more convenient and wrong."
				},
				{
					q: "Do I have to name every service I use?",
					a: "The regulation requires that data subjects can follow what happens to their data, and that generally includes who receives it. The name of the host, the analytics tool or the payment provider therefore belongs in the text. Where the generator offers a field for it, filling it in is not decoration."
				},
				{
					q: "What is the difference between necessary cookies and the rest?",
					a: "Technically necessary means what the site needs in order to work — a session, a shopping basket, protecting a form. Everything else, audience measurement and advertising in particular, may only be set after consent. The sections in the generated text are separated accordingly and cite different legal bases."
				},
				{
					q: "Do I need a data protection officer?",
					a: "Not every business does. An appointment is required where, among other things, the core activity involves large-scale processing of special categories of data or large-scale regular monitoring. Only tick the box if you have actually appointed someone — an invented role in the text is worse than none."
				},
				{
					q: "Does this tool replace a legal review?",
					a: "No. It assembles a sample from blocks and shows which statements belong to which processing. Whether that selection fits your business, and whether you have captured every operation, is something it cannot know. Have the text reviewed before you publish it."
				}
			],
			related: ["impressum-generator", "ki-kennzeichnung-bilder"]
		}
	},
	"barrierefreiheitserklaerung-generator": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Seit dem 28. Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz. Es verpflichtet Unternehmen, die bestimmte Dienstleistungen an Verbraucher erbringen — Onlineshops, Buchungs- und Terminsysteme, Bankdienste, Personenbeförderung —, ihre digitalen Angebote barrierefrei zu gestalten und darüber öffentlich Auskunft zu geben. Öffentliche Stellen trifft dieselbe Auskunftspflicht schon länger, allerdings über einen anderen Weg: § 12b des Behindertengleichstellungsgesetzes und die Barrierefreie-Informationstechnik-Verordnung.",
				"Das sind zwei verschiedene Erklärungen, und sie sehen einander zum Verwechseln ähnlich. Der Unterschied steht am Ende: Eine öffentliche Stelle verweist auf die Schlichtungsstelle nach § 16 BGG, ein Unternehmen auf die Marktüberwachungsstelle der Länder. Vertauscht sind beide Texte falsch — und zwar an einer Stelle, die niemand liest, solange sich niemand beschwert. Dieser Generator fragt deshalb als Erstes, wer die Erklärung abgibt, und richtet den ganzen Text danach aus.",
				"Alles Weitere ist die ehrliche Bestandsaufnahme: Ist das Angebot vollständig, teilweise oder nicht mit dem angewandten Standard vereinbar? Welche Inhalte sind es nicht, und warum? Wie erreicht man Sie, wenn jemand an eine Hürde stößt, und wie schnell antworten Sie? Eine Erklärung, die überall „vollständig vereinbar“ behauptet, ist selten glaubwürdig und im Zweifel eine falsche Angabe."
			],
			useCases: [
				{
					title: "Onlineshop unter dem BFSG",
					text: "Ein Shop, der an Verbraucher verkauft, braucht die Erklärung seit Juni 2025. Der Text nennt das Gesetz, den angewandten Standard und den Weg zur Marktüberwachungsstelle."
				},
				{
					title: "Buchungssystem einer Praxis oder Werkstatt",
					text: "Terminvergabe im Netz ist eine Dienstleistung im Sinne des Gesetzes. Wer sie anbietet, schuldet auch dann eine Erklärung, wenn die restliche Website nur informiert."
				},
				{
					title: "Kommune oder Behörde nach BITV 2.0",
					text: "Für öffentliche Stellen gilt der andere Weg: § 12b BGG, die Verordnung und am Ende die Schlichtungsstelle. Die Auswahl ganz oben stellt den kompletten Text darauf um."
				},
				{
					title: "Erklärung nach einer Überprüfung fortschreiben",
					text: "Die Erklärung ist kein einmaliges Dokument. Tragen Sie das neue Prüfdatum ein und kürzen Sie die Liste der Mängel um das, was inzwischen behoben ist."
				},
				{
					title: "Bestandsaufnahme vor dem Umbau",
					text: "Das Feld für die nicht barrierefreien Inhalte zwingt dazu, konkret zu werden. Wer es ausfüllt, hat nebenbei die Liste dessen, was am Angebot als Nächstes zu tun ist."
				}
			],
			steps: [
				{
					title: "Regime wählen",
					description: "Unternehmen nach dem BFSG oder öffentliche Stelle nach BITV 2.0 und § 12b BGG. Diese Auswahl steuert nicht nur eine Überschrift, sondern die genannten Vorschriften und die Stelle, an die sich eine unzufriedene Person am Ende wenden kann."
				},
				{
					title: "Angebot und Anbieter benennen",
					description: "Wer gibt die Erklärung ab, und wofür gilt sie? Benennen Sie das Angebot so, wie es die Nutzer kennen — „der Onlineshop shop.beispiel.de“ ist eine bessere Angabe als „unsere digitalen Angebote“."
				},
				{
					title: "Stand der Vereinbarkeit festhalten",
					description: "Vollständig, teilweise oder nicht vereinbar, dazu der angewandte Standard. Unterhalb der vollständigen Vereinbarkeit verlangt der Generator eine Liste der nicht barrierefreien Inhalte — pauschale Sätze helfen niemandem, der auf eine Hürde gestoßen ist."
				},
				{
					title: "Begründung und Prüfverfahren angeben",
					description: "Unverhältnismäßige Belastung, Ausnahme vom Anwendungsbereich oder laufende Umsetzung, und ob die Bewertung aus einer Selbstbewertung oder einer externen Prüfung stammt. Datum der Erstellung und der letzten Überprüfung gehören dazu."
				},
				{
					title: "Rückmeldeweg festlegen und veröffentlichen",
					description: "Ein erreichbarer Kontaktweg und eine Frist, innerhalb derer Sie antworten. Anschließend den Text übernehmen und dauerhaft auffindbar veröffentlichen, üblicherweise aus der Fußzeile heraus verlinkt."
				}
			],
			privacy: "Der Text entsteht vollständig in Ihrem Browser; weder die Angaben zu Ihrem Betrieb noch die Liste Ihrer bekannten Mängel verlassen das Gerät. Gerade der zweite Punkt ist hier relevant: Was Sie in das Feld für die nicht barrierefreien Inhalte schreiben, ist eine ungeschönte Aufstellung dessen, was an Ihrem Angebot noch nicht funktioniert. Diese Aufstellung geht an keinen Server, und sie wird nirgends zwischengespeichert.",
			faq: [
				{
					q: "Gilt das BFSG auch für meinen kleinen Betrieb?",
					a: "Das Gesetz kennt eine Ausnahme für Kleinstunternehmen, die Dienstleistungen erbringen: weniger als zehn Beschäftigte und höchstens zwei Millionen Euro Jahresumsatz oder Jahresbilanzsumme. Für Produkte gilt diese Ausnahme nicht. Ob Ihr Angebot als Dienstleistung in den Anwendungsbereich fällt, sollten Sie im Einzelfall prüfen lassen."
				},
				{
					q: "Worin unterscheiden sich BFSG und BITV 2.0?",
					a: "Im Adressaten und im Rechtsweg. Das BFSG richtet sich an Unternehmen, die Verbrauchern bestimmte Produkte und Dienstleistungen anbieten, und wird von der Marktüberwachung der Länder überwacht. Die BITV 2.0 samt § 12b BGG richtet sich an öffentliche Stellen, und dort führt der Weg zur Schlichtungsstelle nach § 16 BGG. Die inhaltlichen Anforderungen ähneln sich stark, beide verweisen auf die EN 301 549."
				},
				{
					q: "Was schreibe ich in die Liste der nicht barrierefreien Inhalte?",
					a: "Konkret das, was Sie wissen: ein nicht getaggtes PDF, ein Video ohne Untertitel, ein Formular ohne verbundene Beschriftungen, eine Karte ohne Textalternative. Je genauer die Angabe, desto eher findet jemand den Weg zu der Fassung, die er nutzen kann — und desto glaubwürdiger ist die Erklärung insgesamt."
				},
				{
					q: "Wie oft muss ich die Erklärung überprüfen?",
					a: "Sie soll den tatsächlichen Stand wiedergeben, also nach jeder wesentlichen Änderung am Angebot und ansonsten regelmäßig. Für öffentliche Stellen ist eine jährliche Überprüfung vorgesehen. Das Feld für das Datum der letzten Überprüfung ist deshalb kein Beiwerk: Es macht sichtbar, wie alt die Aussage ist."
				},
				{
					q: "Reicht die Erklärung, oder muss ich die Seite auch umbauen?",
					a: "Die Erklärung ist die Auskunftspflicht, nicht die Erfüllung. Sie beschreibt den Stand und benennt einen Rückmeldeweg; barrierefrei wird das Angebot dadurch nicht. Wer sie ernst nimmt, hat mit der Liste der Mängel allerdings genau den Arbeitsplan, den der Umbau braucht."
				}
			],
			related: ["kontrast-checker", "impressum-generator"]
		},
		en: {
			intro: [
				"The German Accessibility Strengthening Act has applied since 28 June 2025. It obliges businesses providing certain services to consumers — online shops, booking and appointment systems, banking services, passenger transport — to make their digital offerings accessible and to say publicly where they stand. Public bodies have had the same duty for longer, but by a different route: section 12b of the Disability Equality Act and the Barrier-Free Information Technology Ordinance.",
				"Those are two different statements, and they look confusingly alike. The difference is at the end: a public body points to the conciliation body under section 16 BGG, a business points to the market surveillance authority of the federal states. Swap them and both texts are wrong — in a place nobody reads until somebody complains. This generator therefore asks first who is issuing the statement, and shapes the whole text around that answer.",
				"Everything after that is an honest inventory: is the service fully, partially or not compliant with the standard applied? Which content is not, and why? How can people reach you when they hit a barrier, and how quickly do you answer? A statement claiming full compliance everywhere is rarely credible and, in case of doubt, an incorrect statement."
			],
			useCases: [
				{
					title: "An online shop under the BFSG",
					text: "A shop selling to consumers has needed the statement since June 2025. The text names the act, the standard applied and the route to the market surveillance authority."
				},
				{
					title: "The booking system of a practice or workshop",
					text: "Arranging appointments online is a service in the sense of the act. Anyone offering one owes a statement even where the rest of the website only informs."
				},
				{
					title: "A municipality or authority under BITV 2.0",
					text: "Public bodies take the other route: section 12b BGG, the ordinance, and the conciliation body at the end. The choice at the top switches the entire text over."
				},
				{
					title: "Updating the statement after a review",
					text: "The statement is not a one-off document. Enter the new review date and shorten the list of shortcomings by whatever has been fixed in the meantime."
				},
				{
					title: "Taking stock before a rebuild",
					text: "The field for non-accessible content forces you to be specific. Filling it in leaves you with the list of what needs doing next to the service anyway."
				}
			],
			steps: [
				{
					title: "Choose the regime",
					description: "A business under the BFSG, or a public body under BITV 2.0 and section 12b BGG. That choice controls more than a heading: it decides which rules are cited and which body a dissatisfied person can turn to at the end."
				},
				{
					title: "Name the service and the provider",
					description: "Who is issuing the statement, and what does it cover? Name the service the way its users know it — “the online shop shop.example.com” is a better statement than “our digital offerings”."
				},
				{
					title: "Record the compliance status",
					description: "Fully, partially or not compliant, together with the standard applied. Below full compliance the generator asks for a list of the non-accessible content — blanket sentences help nobody who has just hit a barrier."
				},
				{
					title: "State the reasoning and the assessment",
					description: "Disproportionate burden, an exemption from the scope, or work in progress, and whether the assessment comes from a self-assessment or an external review. The dates of preparation and of the last review belong here too."
				},
				{
					title: "Set out the feedback route and publish",
					description: "A contact channel that works and a period within which you answer. Then take the text over and publish it so that it stays findable, usually linked from the footer."
				}
			],
			privacy: "The text is produced entirely in your browser; neither the details of your business nor the list of shortcomings you know about ever leave the device. The second point matters here in particular: what you write into the field for non-accessible content is an unvarnished account of what does not yet work about your service. That account goes to no server, and it is cached nowhere.",
			faq: [
				{
					q: "Does the BFSG apply to my small business?",
					a: "The act exempts microenterprises providing services: fewer than ten employees and at most two million euros of annual turnover or balance sheet total. That exemption does not apply to products. Whether your offering falls within the scope as a service is something to have checked for your particular case."
				},
				{
					q: "What is the difference between the BFSG and BITV 2.0?",
					a: "The addressee and the route of redress. The BFSG addresses businesses offering certain products and services to consumers and is policed by the market surveillance authorities of the federal states. BITV 2.0 together with section 12b BGG addresses public bodies, where the route leads to the conciliation body under section 16 BGG. The substantive requirements are very similar; both refer to EN 301 549."
				},
				{
					q: "What do I write into the list of non-accessible content?",
					a: "Specifically what you know: an untagged PDF, a video without subtitles, a form without associated labels, a map without a text alternative. The more precise the entry, the more likely someone finds their way to a version they can use — and the more credible the statement is as a whole."
				},
				{
					q: "How often do I have to review the statement?",
					a: "It is meant to reflect the actual state, so after every substantial change to the service and otherwise at regular intervals. Public bodies are expected to review annually. The field for the date of the last review is therefore not decoration: it shows how old the claim is."
				},
				{
					q: "Is the statement enough, or do I have to rebuild the site?",
					a: "The statement is the duty to inform, not the compliance itself. It describes the state of play and names a feedback route; it does not make the service accessible. Taken seriously, though, the list of shortcomings is exactly the work plan the rebuild needs."
				}
			],
			related: ["kontrast-checker", "impressum-generator"]
		}
	},
	"ki-kennzeichnung-bilder": {
		updatedAt: "2026-09-02",
		de: {
			intro: [
				"Ein Bild, das eine Maschine erzeugt hat, sieht man ihm immer seltener an. Genau deshalb verlangt die KI-Verordnung der Europäischen Union eine Kennzeichnung — und sie verlangt sie zweimal: Wer ein System betreibt, das synthetische Inhalte erzeugt, muss die Ausgabe maschinenlesbar als künstlich erzeugt markieren; wer ein solches Bild veröffentlicht, muss das für die Betrachter offenlegen. Die Transparenzpflichten des Art. 50 greifen ab dem 2. August 2026.",
				"Dieses Werkzeug bedient beide Hälften. Es brennt eine Plakette mit einem Hinweis wie „KI-generiert“ in das Bild — Ecke, Größe, Deckkraft und Stil wählen Sie selbst — und es schreibt zusätzlich einen maschinenlesbaren Vermerk in die Datei: als Textabschnitt in ein PNG, als Kommentarsegment in ein JPEG. Beides passiert im Browser, ohne Upload und ohne Anmeldung.",
				"Zwei Dinge sagt das Werkzeug offen, statt sie zu verschweigen. WebP kann den maschinenlesbaren Vermerk nicht tragen; wählen Sie dieses Format, bekommen Sie nur die sichtbare Kennzeichnung, und die Insel weist darauf hin. Und das Bild wird beim Erzeugen neu gezeichnet, wodurch vorhandene Aufnahmedaten des Originals verloren gehen — bei einem Werkzeug, das Metadaten hinzufügt, ist das eine Nebenwirkung, die man kennen sollte."
			],
			useCases: [
				{
					title: "Produktbilder, die aus einem Bildgenerator stammen",
					text: "Wer Stimmungsbilder oder Freisteller aus einem KI-Werkzeug im Shop einsetzt, kennzeichnet sie sichtbar und legt den Vermerk zusätzlich in die Datei, wo Plattformen ihn auslesen können."
				},
				{
					title: "Beiträge in sozialen Netzwerken",
					text: "Mehrere Plattformen werten Metadaten aus und setzen selbst einen Hinweis. Ein Bild, das den Vermerk schon mitbringt, wird eher richtig einsortiert als eines, das erst geraten werden muss."
				},
				{
					title: "Redaktionelle Illustrationen auf der eigenen Seite",
					text: "Für den Blog eines Betriebs ist die Plakette die einfachste ehrliche Lösung: Sie steht im Bild und bleibt auch dann erhalten, wenn das Bild weiterverwendet wird."
				},
				{
					title: "Bestand nachträglich kennzeichnen",
					text: "Ältere Bilder lassen sich einzeln durchlaufen. Die Einstellungen bleiben zwischen zwei Bildern erhalten, sodass eine Serie dieselbe Plakette an derselben Stelle bekommt."
				},
				{
					title: "Bildunterschrift und Alternativtext vorbereiten",
					text: "Unter dem Werkzeug steht ein fertiger Satz zum Mitkopieren. Die Offenlegung im Text ergänzt die Plakette dort, wo das Bild ohne Beschriftung erscheint."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "PNG, JPEG oder WebP aus dem eigenen Gerät. Die Datei wird gelesen, aber nicht übertragen; die Vorschau darunter zeigt das Ergebnis in verkleinerter Fassung, gerechnet mit denselben Maßen wie das spätere Bild."
				},
				{
					title: "Text und Ecke festlegen",
					description: "Wählen Sie einen der Vorschläge oder schreiben Sie einen eigenen Hinweis. Die Ecke sollte dorthin zeigen, wo im Bild wenig passiert — eine Plakette über einem Gesicht liest sich schlecht und wird beim Zuschneiden zuerst geopfert."
				},
				{
					title: "Größe, Deckkraft und Stil einstellen",
					description: "Die Größe ist ein Anteil der Bildbreite, damit die Plakette auf einem großen Foto genauso wirkt wie auf einem kleinen. Der Stil kehrt Fläche und Schrift um; wählen Sie den, der sich vom Bildhintergrund an dieser Stelle deutlich absetzt."
				},
				{
					title: "Format wählen und Hinweis einbetten",
					description: "PNG bewahrt die Bildqualität und trägt den maschinenlesbaren Vermerk, JPEG ebenfalls und ist kleiner. WebP ist am kleinsten, kann den Vermerk aber nicht aufnehmen — das Ankreuzfeld bleibt dann wirkungslos, und der Hinweis darunter sagt es."
				},
				{
					title: "Erzeugen und herunterladen",
					description: "Das fertige Bild erscheint unter dem Werkzeug, zusammen mit der Auskunft, ob der Vermerk in der Datei gelandet ist. Prüfen Sie das Ergebnis einmal in voller Größe, bevor Sie es veröffentlichen."
				}
			],
			privacy: "Ihr Bild verlässt das Gerät nicht. Es wird über eine Zeichenfläche im Browser gelesen, mit der Plakette versehen und dort auch wieder als Datei zusammengesetzt; einen Server, an den es gehen könnte, gibt es in diesem Werkzeug nicht. Das ist bei Bildern eine andere Größenordnung als bei einem Textschnipsel: Ein Foto trägt oft mehr Nebeninformation, als der Absender vermutet — Aufnahmeort, Gerät, Zeitpunkt. Und genau diese Aufnahmedaten verwirft der Zeichenvorgang, worauf das Werkzeug auch hinweist.",
			faq: [
				{
					q: "Ab wann muss ich KI-Bilder kennzeichnen?",
					a: "Die Transparenzpflichten des Art. 50 der KI-Verordnung gelten ab dem 2. August 2026. Unabhängig davon können sich Kennzeichnungspflichten schon heute aus dem Wettbewerbsrecht oder aus den Regeln einzelner Plattformen ergeben — eine Kennzeichnung vorher ist also kein vergebener Aufwand."
				},
				{
					q: "Reicht die sichtbare Plakette allein?",
					a: "Für die Offenlegung gegenüber Betrachtern ist ein deutlich erkennbarer Hinweis der Kern. Die Verordnung verlangt daneben aber ausdrücklich eine maschinenlesbare Markierung der Ausgabe. Deshalb schreibt dieses Werkzeug zusätzlich einen Vermerk in die Datei, und deshalb sagt es auch, wenn das Format das nicht zulässt."
				},
				{
					q: "Warum bekommt WebP keinen Vermerk in der Datei?",
					a: "Weil ein sauberer Weg dafür mehr Aufwand bedeutet, als dieses Werkzeug tragen soll: PNG hat einen Textabschnitt und JPEG ein Kommentarsegment, beides sind schlanke, überall gelesene Strukturen. Für WebP müsste ein XMP-Block in den Container geschrieben werden. Statt das halbfertig zu tun, sagt die Insel, dass der Vermerk fehlt."
				},
				{
					q: "Bleiben die EXIF-Daten des Originals erhalten?",
					a: "Nein. Das Bild wird auf eine Zeichenfläche neu gezeichnet, und dabei gehen Aufnahmedaten wie Kamera, Zeitpunkt und Aufnahmeort verloren. Wenn Sie diese Angaben brauchen, bewahren Sie das Original auf. Für ein rein synthetisches Bild ist der Verlust ohne Bedeutung — es hatte nie welche."
				},
				{
					q: "Kann jemand die Kennzeichnung wieder entfernen?",
					a: "Der Vermerk in der Datei lässt sich mit einem Metadatenwerkzeug löschen, und die Plakette lässt sich wegschneiden oder überdecken. Eine fälschungssichere Herkunft ist etwas anderes und braucht kryptografisch signierte Daten. Für die Offenlegung gegenüber Ihrem Publikum ist diese Kennzeichnung dennoch das, was verlangt ist."
				}
			],
			related: ["bild-komprimieren", "datenschutzerklaerung-generator"]
		},
		en: {
			intro: [
				"It gets harder every year to see that a picture was made by a machine. That is exactly why the European Union's AI Act requires labelling — and it requires it twice over: whoever runs a system that produces synthetic content must mark the output as artificially generated in a machine-readable form, and whoever publishes such a picture must disclose that to the people looking at it. The transparency duties in Article 50 apply from 2 August 2026.",
				"This tool covers both halves. It burns a badge carrying a note such as “AI-generated” into the picture — you choose the corner, the size, the opacity and the style — and it additionally writes a machine-readable note into the file: a text chunk in a PNG, a comment segment in a JPEG. Both happen in the browser, with no upload and no sign-up.",
				"Two things the tool states openly rather than glossing over. WebP cannot carry the machine-readable note; choose that format and you get the visible label only, and the island says so. And producing the image redraws it, which discards any capture data the original held — for a tool that adds metadata, that is a side effect worth knowing about."
			],
			useCases: [
				{
					title: "Product images that came out of an image generator",
					text: "Anyone using generated mood shots or cut-outs in a shop labels them visibly and puts the note into the file as well, where platforms can read it."
				},
				{
					title: "Posts on social networks",
					text: "Several platforms read metadata and add a notice of their own. A picture that already carries the note is more likely to be classified correctly than one that has to be guessed at."
				},
				{
					title: "Editorial illustrations on your own site",
					text: "For a company blog the badge is the simplest honest answer: it sits in the picture and survives even when the picture is reused elsewhere."
				},
				{
					title: "Labelling an existing library",
					text: "Older pictures can be run through one at a time. The settings persist between images, so a series gets the same badge in the same place."
				},
				{
					title: "Preparing a caption and alternative text",
					text: "A ready-made sentence sits underneath the tool for copying. Disclosure in the text complements the badge wherever the picture appears without a caption."
				}
			],
			steps: [
				{
					title: "Choose an image",
					description: "A PNG, JPEG or WebP from your own device. The file is read but never transmitted; the preview underneath shows the result at a reduced size, worked out with the same proportions as the final picture."
				},
				{
					title: "Set the text and the corner",
					description: "Pick one of the suggestions or write a note of your own. The corner should sit where little is happening in the picture — a badge across a face reads badly and is the first thing sacrificed when the image is cropped."
				},
				{
					title: "Adjust size, opacity and style",
					description: "The size is a share of the image width, so the badge carries the same weight on a large photograph as on a small one. The style swaps the panel and the lettering; pick whichever stands out clearly against the background at that spot."
				},
				{
					title: "Choose a format and embed the note",
					description: "PNG keeps the image quality and carries the machine-readable note, JPEG does too and is smaller. WebP is the smallest but cannot take the note — the tick box then has no effect, and the line underneath says so."
				},
				{
					title: "Produce it and download",
					description: "The finished picture appears below the tool, together with a statement of whether the note made it into the file. Look at the result once at full size before you publish it."
				}
			],
			privacy: "Your image never leaves the device. It is read onto a canvas in the browser, given the badge, and reassembled into a file right there; this tool has no server it could send anything to. With pictures that is a different order of magnitude from a snippet of text: a photograph often carries more incidental information than the sender assumes — where it was taken, on what, and when. And it is precisely that capture data the redraw discards, which the tool also points out.",
			faq: [
				{
					q: "From when do I have to label AI images?",
					a: "The transparency duties in Article 50 of the AI Act apply from 2 August 2026. Independently of that, labelling obligations can already follow today from competition law or from the rules of individual platforms — so labelling earlier is not wasted effort."
				},
				{
					q: "Is the visible badge on its own enough?",
					a: "For disclosure to the people looking at the picture, a clearly recognisable notice is the core of it. Alongside that, however, the regulation expressly requires the output to be marked in a machine-readable form. That is why this tool also writes a note into the file, and why it says so when the format does not allow it."
				},
				{
					q: "Why does WebP get no note in the file?",
					a: "Because doing it cleanly means more machinery than this tool should carry: PNG has a text chunk and JPEG a comment segment, both lean structures that everything reads. WebP would need an XMP block written into the container. Rather than do that half-way, the island says the note is missing."
				},
				{
					q: "Is the original EXIF data kept?",
					a: "No. The image is redrawn onto a canvas, and capture data such as the camera, the time and the location is lost in the process. If you need those details, keep the original. For a purely synthetic picture the loss means nothing — it never had any."
				},
				{
					q: "Can somebody remove the label again?",
					a: "The note in the file can be deleted with a metadata tool, and the badge can be cropped off or painted over. Tamper-proof provenance is a different thing and needs cryptographically signed data. For disclosure to your own audience, this labelling is nonetheless what is being asked for."
				}
			],
			related: ["bild-komprimieren", "datenschutzerklaerung-generator"]
		}
	},
	"visitenkarten-designer": {
		updatedAt: "2026-10-02",
		de: {
			intro: [
				"Der Visitenkarten-Designer entwirft eine Visitenkarte im Browser: Sie tragen Name, Position, Firma und Kontaktdaten ein, wählen Farbe, Fläche, Ecken, Schatten und Aufteilung, und sehen das Ergebnis sofort in der Vorschau. Heraus kommt ein PNG im Format 85 × 55 mm mit 300 dpi — der Auflösung, die eine Druckerei für eine Karte dieser Größe erwartet.",
				"Gedacht ist das für den Fall, in dem eine Karte schnell gebraucht wird und niemand ein Layoutprogramm öffnen will: eine neue Mitarbeiterin, eine Messe in zwei Wochen, ein Betrieb ohne Hausgestaltung. Sie sehen beim Tippen, wie die Karte aussieht, statt eine Vorlage auszufüllen und auf die Korrektur zu warten.",
				"Eine Einschränkung vorweg, damit es keine Überraschung beim Druck gibt: Die Datei ist ein PNG in Endformat — ohne Anschnitt und ohne Schnittmarken. Online-Druckdienste, die PNG oder JPG annehmen, verarbeiten das direkt. Eine Druckerei, die eine PDF mit 3 mm Anschnitt verlangt, wird nachfragen. Wenn Sie eine randabfallende Fläche drucken wollen, ist das der Punkt, an dem ein Layoutprogramm beziehungsweise ein Gestalter die bessere Wahl ist."
			],
			useCases: [
				{
					title: "Neue Kollegin, Karte am selben Tag",
					text: "Name und Position ändern, Rest stehen lassen, herunterladen. Die Karte sieht aus wie die der anderen, weil Fläche, Ecken und Akzentfarbe dieselben bleiben."
				},
				{
					title: "Messe oder Markt in zwei Wochen",
					text: "Eine Karte, die zum Stand passt, ohne Abstimmungsschleife. Für kleine Auflagen bei einem Online-Druckdienst reicht das PNG in Druckauflösung."
				},
				{
					title: "Betrieb ohne festgelegtes Erscheinungsbild",
					text: "Die vier Flächen und drei Aufteilungen sind eine Vorauswahl, die zusammenpasst. Sie entscheiden zwischen vorgefertigten Kombinationen statt über Typografie."
				},
				{
					title: "Entwurf, über den sich reden lässt",
					text: "Zwei oder drei Varianten herunterladen und im Betrieb herumzeigen, bevor Geld in Gestaltung oder Druck geht."
				},
				{
					title: "Karte und QR-Code aus einer Hand",
					text: "Die Rückseite trägt oft einen QR-Code mit den Kontaktdaten als vCard. Den erzeugt der QR-Code-Generator auf dieser Seite, mit denselben Angaben."
				}
			],
			steps: [
				{
					title: "Inhalt eintragen",
					description: "Unter „Inhalt“ stehen Name, Position, Firma, Telefon, E-Mail und Webseite. Leere Felder werden nicht gedruckt, Sie können also weglassen, was auf die Karte nicht gehört."
				},
				{
					title: "Aussehen festlegen",
					description: "Unter „Aussehen“ wählen Sie Akzentfarbe, Fläche (Papier, Sand, Navy, Anthrazit), Ecken, Schatten und Aufteilung (linksbündig, zentriert, mit Farbband). Reicht der Kontrast einer Akzentfarbe auf der gewählten Fläche nicht, hellt das Werkzeug sie auf und sagt es — die Karte bleibt lesbar, auch wenn die Farbe nicht genau die eingegebene ist."
				},
				{
					title: "Vorschau prüfen",
					description: "Die Vorschau ist dieselbe Zeichnung wie der Druck, nur kleiner gerechnet. Lesen Sie sie einmal auf Armlänge: Was dort schwer zu entziffern ist, ist auf 85 mm Papier nicht besser."
				},
				{
					title: "Als PNG herunterladen",
					description: "Der Download gibt 85 × 55 mm bei 300 dpi. Prüfen Sie beim Druckdienst, ob PNG angenommen wird und ob ein Anschnitt verlangt ist. „Zurücksetzen“ stellt den Ausgangsentwurf wieder her."
				}
			],
			privacy: "Die Karte wird vollständig in Ihrem Browser gezeichnet. Name, Telefonnummer und E-Mail-Adresse verlassen das Gerät nicht: Vorschau und Download sind derselbe Zeichenaufruf auf ein Canvas-Element, einmal in Bildschirm- und einmal in Druckauflösung, und es gibt keine Gegenstelle, an die etwas gesendet werden könnte. Das ist bei Kontaktdaten kein nebensächlicher Unterschied — bei vielen Online-Kartengestaltern entsteht die Druckdatei auf einem Server, und die Angaben liegen dort anschließend in einem Konto.",
			faq: [
				{
					q: "Kann ich das PNG direkt in den Druck geben?",
					a: "Bei Online-Druckdiensten, die PNG oder JPG annehmen, ja — die Datei hat mit 85 × 55 mm bei 300 dpi die übliche Auflösung für dieses Format. Eine Druckerei, die eine PDF mit 3 mm Anschnitt und Schnittmarken verlangt, bekommt das hier nicht; fragen Sie vorher nach, was angenommen wird."
				},
				{
					q: "Warum ist meine Akzentfarbe heller als eingegeben?",
					a: "Weil sie auf der gewählten Fläche sonst nicht genug Kontrast hätte. Das Werkzeug hellt sie so weit auf, dass der Text lesbar bleibt, und weist darauf hin. Wollen Sie den Farbton genau treffen, wählen Sie eine hellere Fläche — auf Papier oder Sand bleibt mehr Spielraum als auf Navy oder Anthrazit."
				},
				{
					q: "Kann ich mein Logo einsetzen?",
					a: "Nein, das Werkzeug arbeitet ohne Bilddateien. Es gestaltet mit Fläche, Akzentfarbe, Aufteilung und Schrift. Eine Karte mit Logo ist der Punkt, an dem eine Vorlage in einem Layoutprogramm oder eine Gestaltung sinnvoller ist als ein Generator."
				},
				{
					q: "Wie bekomme ich die Rückseite?",
					a: "Der Designer entwirft eine Seite. Für die Rückseite laden Sie eine zweite Variante herunter — etwa nur mit Logo-Fläche und QR-Code — und geben beide Dateien als Vorder- und Rückseite in den Druck. Den QR-Code mit Ihren Kontaktdaten als vCard erzeugt der QR-Code-Generator."
				},
				{
					q: "Bleiben meine Eingaben erhalten, wenn ich die Seite neu lade?",
					a: "Nein. Da nichts gespeichert und nichts gesendet wird, ist die Seite nach dem Neuladen wieder im Ausgangszustand. Laden Sie den Entwurf herunter, bevor Sie den Tab schließen."
				}
			],
			related: ["qr-code-generator", "bild-komprimieren"]
		},
		en: {
			intro: [
				"The business card designer lays out a card in the browser: you fill in name, role, company and contact details, choose the accent colour, surface, corners, shadow and layout, and see the result in the preview as you type. What comes out is a PNG at 85 × 55 mm and 300 dpi — the resolution a printer expects for a card this size.",
				"It is meant for the case where a card is needed quickly and nobody wants to open a layout application: a new colleague, a trade fair in two weeks, a business with no house style. You watch the card change as you type instead of filling in a template and waiting for a proof.",
				"One limitation up front, so the print shop is not a surprise: the file is a PNG at final size — no bleed and no crop marks. Online print services that accept PNG or JPG take it as it is. A printer that asks for a PDF with 3 mm bleed will come back to you. If you want a colour running off the edge, that is the point where a layout application, or a designer, is the better answer."
			],
			useCases: [
				{
					title: "New colleague, card the same day",
					text: "Change the name and the role, leave the rest, download. The card matches the others because the surface, corners and accent colour stay the same."
				},
				{
					title: "A fair or market in two weeks",
					text: "A card that suits the stand, with no round of approvals. For a small run at an online print service, a PNG at print resolution is enough."
				},
				{
					title: "A business with no settled house style",
					text: "The four surfaces and three layouts are a pre-selection that works together. You choose between finished combinations rather than deciding typography."
				},
				{
					title: "A draft people can talk about",
					text: "Download two or three variants and show them around before any money goes into design or printing."
				},
				{
					title: "Card and QR code from one place",
					text: "The back often carries a QR code with the contact details as a vCard. The QR code generator on this site makes that one, from the same details."
				}
			],
			steps: [
				{
					title: "Fill in the content",
					description: "Under “Content” are name, role, company, phone, email and website. Empty fields are not printed, so you can leave out whatever does not belong on the card."
				},
				{
					title: "Decide how it looks",
					description: "Under “Look” you choose the accent colour, the surface (paper, sand, navy, charcoal), the corners, the shadow and the layout (left-aligned, centred, with a colour band). If an accent colour would not have enough contrast on the chosen surface, the tool lightens it and says so — the card stays readable even though the colour is not exactly the one you entered."
				},
				{
					title: "Check the preview",
					description: "The preview is the same drawing as the print, computed smaller. Read it once at arm's length: anything hard to make out there will be no better on 85 mm of paper."
				},
				{
					title: "Download as PNG",
					description: "The download gives 85 × 55 mm at 300 dpi. Check with the print service whether PNG is accepted and whether bleed is required. “Reset” restores the starting draft."
				}
			],
			privacy: "The card is drawn entirely in your browser. Your name, phone number and email address do not leave the device: the preview and the download are the same drawing call onto a canvas element, once at screen and once at print resolution, and there is no server to send anything to. With contact details that is not a minor difference — many online card designers produce the print file on a server, and the details then sit in an account there.",
			faq: [
				{
					q: "Can I send the PNG straight to print?",
					a: "At online print services that accept PNG or JPG, yes — at 85 × 55 mm and 300 dpi the file has the usual resolution for this format. A printer that requires a PDF with 3 mm bleed and crop marks will not get that here, so ask what is accepted before you order."
				},
				{
					q: "Why is my accent colour lighter than the one I entered?",
					a: "Because it would not have enough contrast on the chosen surface. The tool lightens it just far enough for the text to stay readable, and tells you it did. To hit a colour exactly, pick a lighter surface — paper and sand leave more room than navy or charcoal."
				},
				{
					q: "Can I use my logo?",
					a: "No, the tool works without image files. It designs with the surface, the accent colour, the layout and the type. A card with a logo is the point where a template in a layout application, or a designer, makes more sense than a generator."
				},
				{
					q: "How do I get the back of the card?",
					a: "The designer lays out one side. For the back, download a second variant — say just a colour surface and a QR code — and send both files as front and back. The QR code with your contact details as a vCard comes from the QR code generator."
				},
				{
					q: "Are my entries kept if I reload the page?",
					a: "No. Since nothing is stored and nothing is sent, the page is back to its starting state after a reload. Download the draft before you close the tab."
				}
			],
			related: ["qr-code-generator", "bild-komprimieren"]
		}
	}
};
/**
* The guide for a tool, in the requested language, falling back to German.
*
* Returns `undefined` for an unknown slug rather than throwing: a tool pack
* can add a tool before its guide is written, and a page without a guide is a
* thin page, not a broken build. `guides.test.ts` is what stops that state
* from lasting — it fails when a composed tool has no guide.
*/
function guideFor(slug, lang = "de") {
	const set = guides[slug];
	if (!set) return void 0;
	return set[lang] ?? set.de;
}
/**
* When this tool's guide last changed, or `undefined` for a tool without one.
*
* Separate from {@link guideFor} because the date lives on the set, not on a
* language. A page that has no date shows no "Stand" line and publishes no
* `dateModified` — better than a date the page cannot stand behind.
*/
function guideUpdatedAt(slug) {
	return guides[slug]?.updatedAt;
}
//#endregion
export { guideUpdatedAt as n, guideFor as t };
