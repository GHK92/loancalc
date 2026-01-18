# Lånekalkulator WordPress Plugin

En WordPress-plugin som lar deg legge til en lånekalkulator på dine sider ved hjelp av shortcodes. Perfekt for å vise låneinformasjon for forskjellige leiligheter eller boliger.

## 📋 Funksjoner

- **Justerbar egenkapital** med slider og inputfelt
- **Live beregninger** av fellesgjeld, renter og månedlige kostnader
- **Tilpassbare verdier** for hver leilighet via shortcode-parametere
- **Responsivt design** som fungerer på mobil og desktop
- **Moderne UI** med gradient-styling
- **Norsk formattering** med mellomrom som tusenskiller

## 📦 Installasjon

### Metode 1: Manuell installasjon

1. **Last ned plugin-mappen** `loan-calculator`
2. **Last opp til WordPress**:
   - Koble til din server via FTP eller filbehandler
   - Naviger til `/wp-content/plugins/`
   - Last opp hele `loan-calculator` mappen
3. **Aktiver plugin**:
   - Gå til WordPress Admin → Plugins
   - Finn "Lånekalkulator" i listen
   - Klikk "Activate"

### Metode 2: ZIP-installasjon

1. **Komprimer mappen** `loan-calculator` til en ZIP-fil
2. **I WordPress Admin**:
   - Gå til Plugins → Add New
   - Klikk "Upload Plugin"
   - Velg ZIP-filen
   - Klikk "Install Now"
   - Klikk "Activate Plugin"

## 🚀 Bruk

### Grunnleggende bruk

Legg til kalkulatoren på en side eller innlegg ved å bruke shortcoden:

```
[loanekalkulator]
```

Dette vil vise kalkulatoren med standardverdier:
- Totalpris: 6,700,000 kr
- Egenkapital: 1,675,000 kr
- Rente: 4.6%
- Driftskostnader: 3,698 kr/måned

### Tilpasse for forskjellige leiligheter

Du kan tilpasse alle verdier for hver leilighet ved å legge til parametere i shortcoden:

```
[loanekalkulator total_price="5500000" deposit="1375000" interest_rate="4.5" operating_cost="3200"]
```

## 📝 Shortcode-parametere

| Parameter | Beskrivelse | Standard | Eksempel |
|-----------|-------------|----------|----------|
| `total_price` | Total pris på leiligheten (kr) | 6700000 | `total_price="5500000"` |
| `deposit` | Standard egenkapital/innskudd (kr) | 1675000 | `deposit="1100000"` |
| `interest_rate` | Årlig rente i prosent | 4.6 | `interest_rate="4.5"` |
| `operating_cost` | Månedlige driftskostnader (kr) | 3698 | `operating_cost="3200"` |
| `title` | Overskrift på kalkulatoren | Lånekalkulator | `title="Beregn ditt lån"` |

**Viktig:** Ikke bruk mellomrom eller punktum i tallverdiene. Bruk kun hele tall.

## 💡 Eksempler

### Eksempel 1: Leilighet på 5 millioner

```
[loanekalkulator total_price="5000000" deposit="1250000" interest_rate="4.5" operating_cost="3200"]
```

Dette vil vise:
- Totalpris: 5,000,000 kr
- Standard egenkapital: 1,250,000 kr
- Fellesgjeld: 3,750,000 kr
- Månedlig rente: ca. 14,062 kr (ved 4.5%)
- Driftskostnader: 3,200 kr
- Totalt per måned: ca. 17,262 kr

### Eksempel 2: Leilighet på 8 millioner

```
[loanekalkulator total_price="8000000" deposit="2000000" interest_rate="4.8" operating_cost="4500" title="Leilighet 204"]
```

Dette vil vise:
- Overskrift: "Leilighet 204"
- Totalpris: 8,000,000 kr
- Standard egenkapital: 2,000,000 kr
- Fellesgjeld: 6,000,000 kr
- Månedlig rente: ca. 24,000 kr (ved 4.8%)
- Driftskostnader: 4,500 kr
- Totalt per måned: ca. 28,500 kr

### Eksempel 3: Flere kalkulatorer på samme side

Du kan ha flere kalkulatorer på samme side:

```
<h2>Leilighet 101</h2>
[loanekalkulator total_price="6700000" deposit="1675000" interest_rate="4.6" operating_cost="3698" title="Leilighet 101"]

<h2>Leilighet 102</h2>
[loanekalkulator total_price="7200000" deposit="1800000" interest_rate="4.6" operating_cost="4100" title="Leilighet 102"]

<h2>Leilighet 103</h2>
[loanekalkulator total_price="5800000" deposit="1450000" interest_rate="4.6" operating_cost="3400" title="Leilighet 103"]
```

## 🧮 Slik fungerer beregningene

### Fellesgjeld
```
Fellesgjeld = Totalpris - Egenkapital
```

### Månedlig rente
```
Månedlig rente = Fellesgjeld × (Årlig rente / 100 / 12)
```

### Totalt per måned
```
Totalt per måned = Månedlig rente + Driftskostnader
```

## 🎨 Tilpasning av design

Hvis du ønsker å tilpasse designet, kan du legge til egendefinert CSS i WordPress:

1. Gå til **Appearance → Customize → Additional CSS**
2. Legg til din CSS for å overstyre standardstiler

Eksempel for å endre fargen på gradient:

```css
.loan-calc-total-price,
.loan-calc-total-monthly {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%) !important;
}

.loan-calc-slider::-webkit-slider-thumb {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%) !important;
}
```

## 🔧 Feilsøking

### Kalkulatoren vises ikke
- Sjekk at plugin er aktivert i WordPress Admin → Plugins
- Sjekk at shortcoden er skrevet riktig: `[loanekalkulator]`
- Tøm cache (hvis du bruker et cache-plugin)

### Beregninger oppdateres ikke
- Sjekk konsollen i nettleseren for JavaScript-feil
- Sjekk at det ikke er konflikter med andre plugins
- Prøv å deaktivere andre plugins midlertidig for å teste

### Styling ser feil ut
- Sjekk at temaet ditt ikke overstyrer plugin-stilene
- Prøv å legge til `!important` i egendefinert CSS
- Kontakt utvikler hvis problemet vedvarer

## 📊 Systemkrav

- WordPress 5.0 eller nyere
- PHP 7.0 eller nyere
- Moderne nettleser med JavaScript aktivert

## 📄 Lisens

GPL v2 or later

## 👨‍💻 Support

For spørsmål eller problemer, vennligst opprett en issue på GitHub:
https://github.com/GHK92/loancalc/issues

## 📝 Changelog

### Version 1.0.0
- Første versjon
- Grunnleggende lånekalkulator funksjonalitet
- Shortcode support med tilpassbare parametere
- Responsivt design
- Live beregninger

---

**Laget med ❤️ for norske eiendomsmeglere og utbyggere**
