---
draft: false
title: "Linux Shell & Bash: Fonaments de Sistemes Operatius, Automatització i DevOps"
snippet: "Guia tècnica sobre Linux i Bash: des del seu origen el 1991 per Linus Torvalds, la filosofia Unix, gestió de processos, canonades (pipes) i scripts per a entorns de servidors i desplegament."
image: {
    src: "/img/blog/linux-shell-bash-administracio-sistemes-devops.webp",
    alt: "Terminal Linux Bash i administració de sistemes"
}
publishDate: "2026-03-24 14:00"
category: "Sistemes & DevOps"
author: "Jaume Tur"
tags: [linux, bash, shell, sysadmin, devops, unix, terminal]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/linux-shell-bash-administracio-sistemes-devops"
---

## Què és Linux i què és una Shell?

**Linux** és una família de sistemes operatius lliures i de codi obert del tipus Unix, construïts al voltant del **nucli Linux** (*Linux kernel*). És el sistema operatiu dominant al món en servidors web, supercomputadors, infraestructura al núvol, contenidors (Docker, Kubernetes) i dispositius mòbils (a través d'Android).

Una **Shell** (intèrpret d'ordres) és la interfície de text que permet a l'usuari i als programadors comunicar-se directament amb el nucli del sistema operatiu mitjançant instruccions de text. L'intèrpret més estès en distribucions GNU/Linux és **Bash** (*Bourne Again SHell*).

---

## Quan es van crear i per qui?

* **El nucli Linux:** Publicat el **17 de setembre de 1991** per l'estudiant finlandès **Linus Torvalds** com un projecte personal a la Universitat de Hèlsinki. Combinat amb les utilitats del projecte GNU (iniciat per Richard Stallman el 1983), va donar lloc al sistema complet conegut com a GNU/Linux.
* **Bash Shell:** Desenvolupada el **1989** per **Brian Fox** per al Projecte GNU com a reemplaçament de codi lliure de l'original *Bourne Shell* (`sh`, creada per Stephen Bourne el 1977).

---

## Per a què s'utilitza?

L'administració de sistemes Linux i el domini de la línia d'ordres (CLI) són competències crítiques per a qualsevol enginyer de programari:

1. **Gestió de servidors de producció:** Connexió remota i segura mitjançant SSH per a monitoritzar recursos, gestionar serveis del sistema (amb `systemd`), configurar firewalls (`ufw`, `iptables`) i gestionar certificats SSL/TLS.
2. **Automatització de tasques:** Creació d'scripts en Bash per a còpies de seguretat periòdiques (mitjançant `cron`), rotació de registres de logs i manteniment de fitxers.
3. **Pipelines de CI/CD:** Les màquines virtuals que executen els nostres tests i despleguen codi en plataformes com GitHub Actions són servidors Ubuntu Linux que s'orquestren íntegrament mitjançant comandes de terminal.
4. **Manipulació massiva de dades i text:** Eines clàssiques de processament de fluxos com `grep`, `sed`, `awk`, `cut`, `sort` i `uniq`.

---

## La Filosofia Unix i les Canonades (Pipes)

Un dels principis més elegants de Linux és la **Filosofia Unix**:
> "Escriu programes que facin una sola cosa i la facin molt bé. Escriu programes que col·laborin entre si. Escriu programes que gestionin fluxos de text, perquè el text és la interfície universal."

Aquest principi es materialitza amb l'operador de canonada (`|`), que redirigeix l'eixida estàndard (*stdout*) d'un programa a l'entrada estàndard (*stdin*) del següent:

```bash
#!/usr/bin/env bash
# Exemple de script Bash per auditar logs d'accés a un servidor Nginx
# Detecta les 5 adreces IP amb més peticions que han generat errors HTTP 500

LOG_FILE="/var/log/nginx/access.log"

echo "Auditoria de peticions fallides (HTTP 500):"
awk '$9 == 500 {print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 5
```

---

## Comandes Essencials per a Desenvolupadors

| Comanda | Funció Principal | Exemple d'Ús |
| :--- | :--- | :--- |
| `curl` / `wget` | Descarregar fitxers i fer peticions HTTP directes | `curl -I https://jaumetur.es` |
| `ps` / `top` / `htop` | Monitorització de processos en temps real i ús de memòria/CPU | `htop` |
| `grep` | Cerca de patrons de text amb expressions regulars | `grep -rn "API_URL" src/` |
| `chmod` / `chown` | Gestió de permisos de lectura/escriptura/execució i propietaris | `chmod +x deploy.sh` |
| `journalctl` | Lectura i diagnòstic de logs del sistema de `systemd` | `journalctl -u nginx -f` |

---

## El nostre ús en enginyeria

Al nostre flux diari de desenvolupament, Linux és tant l'entorn de desplegament dels nostres servidors com el motor sobre el qual s'executen els contenidors i les automatitzacions de desplegament continu.
