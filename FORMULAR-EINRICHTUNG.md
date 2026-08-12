# Anfrageformular kostenlos aktivieren

Die Website ist für Formspree vorbereitet. Im kostenlosen Tarif sind derzeit 50 Einsendungen pro Monat enthalten.

1. Unter https://formspree.io ein kostenloses Konto erstellen und die E-Mail-Adresse bestätigen.
2. Im Formspree-Dashboard über **New Form** ein Formular anlegen.
3. Als Zieladresse `info@gt-re.de` oder die gewünschte Empfängeradresse eintragen.
4. Unter **Integration** den Endpoint kopieren. Er sieht etwa so aus: `https://formspree.io/f/abcdwxyz`.
5. In der Datei `form-config.js` nur `DEINE_FORM_ID` durch den letzten Teil ersetzen, im Beispiel also `abcdwxyz`.
6. `form-config.js` in GitHub hochladen und die vorhandene Datei ersetzen.
7. Das Formular auf der veröffentlichten Website einmal selbst absenden und gegebenenfalls die erste Einsendung in Formspree bestätigen.

Alle Formulare der Website verwenden anschließend automatisch diese eine Konfiguration. Die Formspree-ID ist kein Passwort und darf im öffentlichen Website-Code stehen.

## Datenschutz vor der Aktivierung

Formspree verarbeitet die abgesendeten Kontaktdaten als externer Formulardienst. Ergänzen Sie deshalb vor der Aktivierung die Datenschutzerklärung um Formspree, den Verarbeitungszweck, die Speicherdauer und eine mögliche Übermittlung in die USA. Prüfen Sie außerdem im Formspree-Konto die angebotenen Datenschutz- bzw. Auftragsverarbeitungsvereinbarungen. Lassen Sie den endgültigen Text im Zweifel rechtlich prüfen.
