# MERN Places – Frontend (React + TypeScript)

Frontend aplikacji MERN służącej do tworzenia, udostępniania i zarządzania miejscami użytkowników. Projekt został przepisany z JavaScript na TypeScript, wykorzystując React 16.11, Context API, custom hooki oraz integrację z Google Maps API.

---

## Najważniejsze funkcjonalności

### Autoryzacja i zarządzanie sesją
- Logowanie i rejestracja z uploadem zdjęcia
- Token przechowywany w localStorage
- Auto-login po odświeżeniu strony
- Auto-logout po wygaśnięciu tokena
- Chronione ścieżki

### Zarządzanie miejscami
- Tworzenie nowego miejsca (walidacja formularza + upload zdjęcia)
- Edycja i usuwanie miejsc
- Podgląd lokalizacji na mapie (Google Maps API)
- Lista miejsc konkretnego użytkownika

### Custom hooki
- useAuth – login, logout, auto-logout
- useHttpClient – requesty, błędy, loading, abort
- useForm – walidacja i zarządzanie formularzami

### Komponenty UI
- Card, Button, Modal, Backdrop, LoadingSpinner
- Nawigacja: MainNavigation, SideDrawer, NavLinks

---

## Technologie

- React 16.11
- TypeScript
- React Router v5
- Context API
- Google Maps JavaScript API
- Fetch API
- CSS
- Custom Hooks

---

## Struktura projektu

src/
 ├── shared/
 │   ├── components/
 │   │   ├── Navigation/
 │   │   ├── FormElements/
 │   │   └── UIElements/
 │   ├── context/
 │   ├── hooks/
 │   └── util/
 ├── user/
 ├── places/
 ├── App.tsx
 └── index.tsx

---

## Instalacja

1. Klonuj repozytorium:
   git clone <URL_REPO>
   cd app-frontend

2. Instalacja zależności:
   npm install

3. Dodanie klucza API Google:
   Utwórz plik public/.env

   Zawartość:
   REACT_APP_GOOGLE_API_KEY="TWÓJ_KLUCZ"
   BABEL_DISABLE_CACHE=1

4. Uruchom projekt:
   npm start

Aplikacja dostępna pod:
http://localhost:3000

---

## Backend API

Aplikacja korzysta z backendu pod adresem:

http://localhost:5001/api/

Główne endpointy:
- POST /users/login
- POST /users/signup
- GET /users
- GET /places/user/:uid
- POST /places
- PATCH /places/:pid
- DELETE /places/:pid

---

## Decyzje projektowe (skrócone)

- Routing v5 — kompatybilność z istniejącą architekturą
- TypeScript — bezpieczeństwo typów i łatwiejszy rozwój
- Custom Hooks — zamiast Redux, bo globalny stan jest niewielki
- Google Maps przez importLibrary() — nowoczesne ładowanie modułowe
- Własny system formularzy z useForm — pełna kontrola logiki

---

## Autor
Jan Banczerowski

## Licencja
MIT
