---
draft: false
title: "Linux Shell y Bash: fundamentos de sistemas operativos, automatización y DevOps"
snippet: "Guía técnica sobre Linux y Bash: desde su origen en 1991 con Linus Torvalds, la filosofía Unix, la gestión de procesos, las tuberías (pipes) y los scripts para entornos de servidores y despliegue."
image: {
    src: "/img/blog/linux-shell-bash-administracio-sistemes-devops.webp",
    alt: "Terminal Linux Bash y administración de sistemas"
}
publishDate: "2026-03-24 14:00"
category: "Sistemas y DevOps"
author: "Jaume Tur"
tags: [linux, bash, shell, sysadmin, devops, unix, terminal]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-linux-shell-bash-administracio-sistemes-devops"
---

## ¿Qué son Linux y una shell?

**Linux** es una familia de sistemas operativos libres y de código abierto de tipo Unix, construidos en torno al **núcleo Linux** (*Linux kernel*). Es el sistema operativo dominante en el mundo de los servidores web, los superordenadores, la infraestructura en la nube, los contenedores (Docker, Kubernetes) y los dispositivos móviles (a través de Android).

Una **shell** (intérprete de órdenes) es la interfaz de texto que permite a los usuarios y a los programadores comunicarse directamente con el núcleo del sistema operativo mediante instrucciones de texto. El intérprete más extendido en las distribuciones GNU/Linux es **Bash** (*Bourne Again SHell*).

---

## ¿Cuándo y quién los creó?

* **El núcleo Linux:** Publicado el **17 de septiembre de 1991** por el estudiante finlandés **Linus Torvalds** como proyecto personal en la Universidad de Helsinki. Combinado con las utilidades del proyecto GNU (iniciado por Richard Stallman en 1983), dio lugar al sistema completo conocido como GNU/Linux.
* **Shell Bash:** Desarrollada en **1989** por **Brian Fox** para el Proyecto GNU como reemplazo de código libre de la *Bourne Shell* original (`sh`, creada por Stephen Bourne en 1977).

---

## ¿Para qué se utiliza?

La administración de sistemas Linux y el dominio de la línea de comandos (CLI) son competencias esenciales para cualquier ingeniero de software:

1. **Gestión de servidores de producción:** Conexión remota y segura mediante SSH para monitorizar recursos, gestionar servicios del sistema (con `systemd`), configurar cortafuegos (`ufw`, `iptables`) y gestionar certificados SSL/TLS.
2. **Automatización de tareas:** Creación de scripts en Bash para copias de seguridad periódicas (mediante `cron`), rotación de registros de logs y mantenimiento de archivos.
3. **Pipelines de CI/CD:** Las máquinas virtuales que ejecutan nuestras pruebas y despliegan código en plataformas como GitHub Actions son servidores Ubuntu Linux que se orquestan íntegramente mediante comandos de terminal.
4. **Manipulación masiva de datos y texto:** Herramientas clásicas de procesamiento de flujos como `grep`, `sed`, `awk`, `cut`, `sort` y `uniq`.

---

## La filosofía Unix y las tuberías (pipes)

Uno de los principios más elegantes de Linux es la **filosofía Unix**:
> «Escribe programas que hagan una sola cosa y la hagan muy bien. Escribe programas que colaboren entre sí. Escribe programas que gestionen flujos de texto, porque el texto es la interfaz universal».

Este principio se materializa con el operador de tubería (`|`), que redirige la salida estándar (*stdout*) de un programa a la entrada estándar (*stdin*) del siguiente:

```bash
#!/usr/bin/env bash
# Ejemplo de script Bash para auditar registros de acceso de un servidor Nginx
# Detecta las 5 direcciones IP con más peticiones que han generado errores HTTP 500

LOG_FILE="/var/log/nginx/access.log"

echo "Auditoria de peticions fallides (HTTP 500):"
awk '$9 == 500 {print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 5
```

---

## Comandos esenciales para desarrolladores

| Comando | Función principal | Ejemplo de uso |
| :--- | :--- | :--- |
| `curl` / `wget` | Descargar archivos y realizar peticiones HTTP directas | `curl -I https://jaumetur.es` |
| `ps` / `top` / `htop` | Monitorización de procesos en tiempo real y uso de memoria/CPU | `htop` |
| `grep` | Búsqueda de patrones de texto con expresiones regulares | `grep -rn "API_URL" src/` |
| `chmod` / `chown` | Gestión de permisos de lectura/escritura/ejecución y propietarios | `chmod +x deploy.sh` |
| `journalctl` | Lectura y diagnóstico de logs del sistema `systemd` | `journalctl -u nginx -f` |

---

## Nuestro uso en ingeniería

En nuestro flujo diario de desarrollo, Linux es tanto el entorno de despliegue de nuestros servidores como el motor sobre el que se ejecutan los contenedores y las automatizaciones de despliegue continuo.
