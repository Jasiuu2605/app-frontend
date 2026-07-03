# MERN Places - Frontend

Frontend aplikacji MERN do tworzenia, udostepniania i zarzadzania miejscami uzytkownikow. Aplikacja korzysta z React, TypeScript, React Router v5, Context API, custom hookow oraz Google Maps JavaScript API.

## Funkcjonalnosci

- Logowanie i rejestracja z uploadem zdjecia.
- Token przechowywany w `localStorage`.
- Auto-login po odswiezeniu strony.
- Auto-logout po wygasnieciu tokena.
- Lista uzytkownikow i ich miejsc.
- Tworzenie, edycja i usuwanie miejsc.
- Podglad lokalizacji na mapie Google.

## Technologie

- React 16.11
- TypeScript
- React Router v5
- Context API
- Google Maps JavaScript API
- Fetch API
- CSS

## Wymagania

- Node.js
- Dzialajacy backend pod `http://localhost:5001`
- Frontendowy klucz Google Maps z wlaczonym `Maps JavaScript API`

## Instalacja

1. Zainstaluj zaleznosci:

   ```bash
   npm install
   ```

2. Skopiuj przykladowe zmienne srodowiskowe:

   ```bash
   cp .env.example .env
   ```

3. Uzupelnij `.env`:

   ```env
   REACT_APP_GOOGLE_API_KEY=your_frontend_google_maps_key
   BABEL_DISABLE_CACHE=1
   ```

   Klucz frontendowy Google powinien miec ograniczenie aplikacji ustawione na `HTTP referrers`, np.:

   ```txt
   http://localhost:3000/*
   http://127.0.0.1:3000/*
   ```

4. Uruchom aplikacje:

   ```bash
   npm start
   ```

Aplikacja bedzie dostepna pod:

```txt
http://localhost:3000
```

## Backend API

Frontend oczekuje backendu pod adresem:

```txt
http://localhost:5001/api
```

Glowne endpointy:

- `POST /users/login`
- `POST /users/signup`
- `GET /users`
- `GET /places/user/:uid`
- `POST /places`
- `PATCH /places/:pid`
- `DELETE /places/:pid`

## Struktura projektu

```txt
src/
  shared/
    components/
      Navigation/
      FormElements/
      UIElements/
    context/
    hooks/
    util/
  user/
  places/
  App.tsx
  index.tsx
```

## Uwagi techniczne

- Projekt korzysta jeszcze z `react-scripts`, wiec zmienne dostepne w przegladarce musza zaczynac sie od `REACT_APP_`.
- `react-error-overlay` jest przypiety do `6.0.9`, zeby uniknac bledu `ReferenceError: process is not defined` w dev serverze.
- Backend ma osobny klucz Google do `Geocoding API`; nie uzywaj go w frontendzie.
