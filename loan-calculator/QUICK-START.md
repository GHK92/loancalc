# Quick Start Guide - Lånekalkulator Plugin

## Installation (2 minutter)

1. Last opp `loan-calculator` mappen til `/wp-content/plugins/`
2. Gå til WordPress Admin → Plugins
3. Aktiver "Lånekalkulator"

## Bruk (30 sekunder)

Lim inn denne shortcoden på en side eller innlegg:

```
[loanekalkulator]
```

## Tilpass for din leilighet

Kopier og endre verdiene:

```
[loanekalkulator total_price="6700000" deposit="1675000" interest_rate="4.6" operating_cost="3698"]
```

**Parametere:**
- `total_price` = Totalpris i kroner (uten mellomrom)
- `deposit` = Standard egenkapital i kroner
- `interest_rate` = Årlig rente i prosent
- `operating_cost` = Månedlige driftskostnader i kroner
- `title` = Overskrift (valgfri)

## Eksempel - Leilighet til 5.5 millioner

```
[loanekalkulator total_price="5500000" deposit="1375000" interest_rate="4.5" operating_cost="3400" title="Leilighet 103"]
```

**Se README.md for fullstendig dokumentasjon!**
