# Rolín Scout Mobile 0.1

Primer prototipo instalable (PWA) de la aplicación principal de Rolín Scout, diseñado para iPhone y adaptable a escritorio para pruebas.

## Qué incluye
- Panel de inicio y perfil de Lucas Rolín.
- Trayectoria, palmarés, competiciones y partidos.
- Alta manual de partidos y exportación JSON.
- Estructura editorial y de análisis para el universo What If.
- Módulos iniciales de mercado, prensa y Recorder PC.
- Guardado local en el navegador y manifest/service worker para instalación PWA.

## Qué NO está conectado todavía
- No es un `.ipa` nativo de iOS.
- No tiene backend, login, nube ni sincronización.
- No procesa videos ni tiene IA real.
- No está conectado al Recorder de Windows.
- No se transfieren videos automáticamente.

## Probar en Windows
1. Extraer el ZIP.
2. Abrir una terminal en esta carpeta.
3. Ejecutar `py -3.15 -m http.server 8000`.
4. Abrir `http://localhost:8000` en el navegador.

También puede abrirse `index.html` directamente, pero para probar instalación PWA y service worker se necesita servirlo por HTTP/HTTPS.

## Probar en iPhone
Para instalar como PWA, publicar esta carpeta en un hosting HTTPS estático. Luego abrir la URL con Safari > Compartir > Añadir a pantalla de inicio. Un servidor `localhost` en la PC no es accesible desde fuera de la PC; para probar en la misma Wi-Fi se puede abrir `http://IP-DE-LA-PC:8000`, pero la instalación PWA normalmente requiere HTTPS (salvo localhost).

## Datos
Los datos iniciales reflejan el último registro disponible aportado por el usuario. El total global y el desglose de clubes son una instantánea anterior; actualizar si existen partidos posteriores. Los campos no informados se dejan vacíos, no se convierten en cero.

## Próximas etapas
1. Backend/API segura y base de datos central.
2. Autenticación y sincronización entre iPhone y nube.
3. Emparejamiento QR y transferencia reanudable desde Recorder Windows.
4. Almacenamiento de videos y pipeline de análisis visual.
5. Motor What If con cronología, causalidad, fuentes y etiquetas de certeza.
6. Versión iOS nativa SwiftUI si se requiere integración profunda y transferencias en segundo plano. La compilación nativa iOS requiere Xcode/macOS o un servicio de build compatible.
