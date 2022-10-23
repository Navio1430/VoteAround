# VoteAround

Celem naszej aplikacji jest umożliwienie obywatelom na terenie całego kraju tworzenia projektów, które wpłyną na jakość życia lokalnego społeczeństwa.

Każdy obywatel po zarejestrowaniu ma możliwość głosowania (pozytywnie bądź negatywnie) na powstałe projekty, jak i tworzenia własnych.

Podczas tworzenia projektu użytkownik podaje podstawowe dane na jego temat:
-   **Tytuł projektu**
-   **Opis projektu**
-   **Obszar, którego dotyczy projekt** (Jedynie użytkownicy znajdujący się w określonym obszarze mogą oddać głos na projekt)

Dane pozyskane dzięki naszej aplikacji pozwalają między innymi na oszacowanie poparcia danego projektu, co znacznie usprawni proces wdrożenia go w życie.

Projekt został wykonany pomiędzy 8 a 23 października (na konkurs HackHeroes edycja 2022).

</br>

## Jak uruchomić projekt

**Uwaga! Aby poprawnie uruchomić projekt, należy zainstalować [python](https://www.python.org/downloads/)**

Pobieranie projektu

```cmd
git clone https://github.com/Navio1430/VoteAround.git
```

</br>

### A. Uruchamianie automatyczne

- Uruchom skrypt `run.bat` w folderze aplikacji

</br>

### B. Uruchamianie manualne

- Otwórz terminal w folderze projektu

- Zainstaluj zależności

  ```cmd
  pip install -r requirements.txt
  ```

- Przejdź do ścieżki aplikacji

  ```cmd
  cd website
  ```

- Uruchom projekt przy użyciu języka python

  ```cmd
  python app.py
  ```

- Otwórz stronę w przeglądarce, port 5000

  ```
  127.0.0.1:5000
  ```

</br>

## Jak testować naszą aplikację?

### a) Rejestracja i logowanie

1. Zarejestruj konto

    - Podczas rejestracji zaznacz swoją lokalizację na mapie

2. Zaloguj się

### b) Tworzenie projektów

1. Przejdź do zakładki 'Projekty'
2. Utwórz projekt, w którego zakresie jest twoja lokalizacja
3. Utworzony projekt wyświetla się w zakładce 'Projekty'

### c) Wylogowanie

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Wyloguj się'

### d) Usuwanie konta

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Usuń konto'
3. Podaj swoje hasło
4. Wciśnij przycisk 'Usuń'

### e) Zmiana nazwy użytkownika

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Zmień nazwę użytkownika'
3. Podaj nową nazwę użytkownika
4. Podaj swoje hasło
5. Zaznacz checkbox 'Jestem pewien, że chcę zmienić nazwę użytkownika'
6. Wciśnij przycisk 'Zmień'

### f) Zmiana hasła

1. Przejdź do zakładki 'Twoje Dane'
2. Kliknij 'Zmień hasło'
3. Podaj aktualne hasło
4. Podaj nowe hasło
5. Powtórz nowe hasło
6. Zaznacz checkbox 'Jestem pewien, że chcę zmienić hasło'
7. Wciśnij przycisk 'Zmień'

## Twórcy

-   [@Navio1430](https://github.com/Navio1430)
-   [@KotreQ](https://github.com/KotreQ)
-   [@simon-dutka](https://github.com/simon-dutka)
