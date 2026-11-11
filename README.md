# P2P-переводы

Мобильное приложение на React Native, Expo SDK 58 и TypeScript.

## Установка с нуля

1. Установите [Node.js 24 LTS](https://nodejs.org/) версии 24.3 или новее в ветке 24. npm входит в установку Node.js.
2. Распакуйте архив или скачайте репозиторий. Откройте терминал в папке, где лежат `package.json` и `package-lock.json`. В Windows можно использовать командную строку (`cmd.exe`).
3. Установите зависимости из lock-файла:

   ```bash
   npm ci
   ```

Для установки зависимостей и загрузки курсов валют с `www.cbr-xml-daily.ru` нужен интернет. Приложение запускается без `.env`, API-ключей и отдельного бэкенда.

## Запуск на телефоне или в эмуляторе

1. Установите Expo Go с поддержкой SDK 58. Сборки для Android, Android Emulator и iOS Simulator доступны на [странице Expo Go](https://expo.dev/go).
2. Подключите телефон и компьютер к одной сети Wi-Fi. В корне проекта запустите:

   ```bash
   npm start
   ```

3. На Android отсканируйте QR-код из терминала в Expo Go. На iPhone отсканируйте код камерой. Если Expo Go запросит вход, выполните `npx expo login` на компьютере и войдите в тот же аккаунт в Expo Go. Для Android Emulator запустите виртуальное устройство в Android Studio и нажмите `a` в терминале Expo. Для iOS Simulator на macOS с Xcode нажмите `i`.

Если на iPhone в App Store доступна другая версия SDK, выберите SDK 58 на [странице установки Expo Go для iOS](https://sign.expo.dev/). Если телефон не видит компьютер в локальной сети, попробуйте `npx expo start --tunnel`.

## Локальная нативная сборка

Для отладочной сборки Android установите Android Studio, JDK 17 и Android SDK Platform 37. Настройте `JAVA_HOME` и `ANDROID_HOME`, добавьте `platform-tools` в `PATH`. Запустите эмулятор или подключите Android-устройство с отладкой по USB, затем выполните:

```bash
npx expo run:android --device
```

На macOS с Xcode 26.4 или новее собрать и запустить приложение в iOS Simulator можно командой `npx expo run:ios`. При первом запуске Expo сгенерирует папку соответствующей платформы и может запросить идентификатор приложения. Для локальной проверки можно указать `com.example.testtask`. [Документация Expo по локальной сборке](https://docs.expo.dev/guides/local-app-development/)

## Проверки

```bash
npm run lint
npx tsc --noEmit
node --test tests/transferFlow.test.mjs
```
