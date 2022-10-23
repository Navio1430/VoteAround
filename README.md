# Name

Celem naszej apliakcji jest umożliwienie obywatelom na terenie całego kraju, tworzenia projektów które wpłyną na jakość życia lokalnego społeczeństwa.

Każdy obywatel po zarejestrowaniu ma możliwość głosowania (pozytywnie bądź negatywnie) na powstałe projekty, jak i tworzenia własnych.

Podczas tworzenia projektu użytkownik podaje podstawowe dane na jego temat:

-   **Tytuł projektu**
-   **Opis projektu**
-   **Obszar którego dotyczy projekt:**
    -   Jedynie użytkownicy znajdujący się w określonym obszarze mogą oddać głos na projekt

Dane pozyskane dzięki naszej aplikajci pozwalają między innymi na oszacowanie poparcia danego projektu, co znacznie usprawni proces wdrożenia go w życie.

Projekt wykonany przeznaczony na konkurs hackheroes 2022, wykonany pomiędzy 8 a 23 października.

## Jak uruchomić projekt lokalnie

**Uwaga aby poprawnie uruchmoić projekt, należy zainstalować [python](https://www.python.org/downloads/)**

Skopiowanie projektu

```bash
  git clone https://github.com/Navio1430/HackHeroesZSME.git
```

Otwarcie folderu projektu

Otwarcie terminala

Instalacja zależności

```bash
  pip install -r requirements
```

Przejście do ścieżki

```bash
  cd /website
```

Uruchomienie projektu lokalnie

```bash
  python app.py
```

Otwarcie local host w przeglądarce, port 5000

```bash
  127.0.0.1:5000
```

## Jak testować naszą aplikację?

a) Rejestracja i logowanie

1. Zarejestruj konto

    - Podczas rejestracji zaznacz swoją lokalizację na mapię

2. Zaloguj się

b) Tworzenie projektów

1. Przejdź do zakładki 'Projekty'
2. Utwórz projekt w w lokalizacji, takiej abyś był w jego zakresie
3. Utworzony projekt wyświetla się w zakładce 'Projekty'

c) Wylogowanie

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Wyloguj się'

d) Usunięcie konta

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Usuń konto'
3. Podaj swoje hasło
4. Wciśnij przycisk 'Usuń'

e) Zmiana nazwy użytkownika

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Zmień Nazwę Użytkownika'
3. Podaj nową nazwę użytkownika
4. Podaj swoje hasło
5. Zaznacz checkbox 'Jestem pewien, że chcę zmienić nazwę użytkownika'
6. Wciśnij przycisk 'Zmień'

f) Zmiana hasła

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Zmień Hasło'
3. Podaj aktualne hasło
4. Podaj nowe hasło
5. Powtórz nowe hasło
6. Zaznacz checkbox 'Jestem pewien, że chcę zmienić hasło'
7. Wciśnij przycisk 'Zmień'

## Twórcy

-   [@Navio1430](https://github.com/Navio1430)
-   [@simon-dutka](https://github.com/simon-dutka)
-   [@KotreQ](https://github.com/KotreQ)
