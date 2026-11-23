# Rolín Scout Mobile 0.2

Segunda versión de la PWA para iPhone. Mantiene la interfaz y los datos locales de 0.1, y agrega la primera conexión opcional a una base de datos central con Supabase.

## Novedades de 0.2
- Configuración del proyecto Supabase desde Ajustes.
- Crear cuenta e iniciar/cerrar sesión con correo y contraseña.
- Sincronización manual: subir el estado actual o descargar la copia de nube.
- Copia local persistente y exportación JSON.
- Confirmación antes de reemplazar los datos locales al descargar.
- SQL con tabla `career_data` y políticas RLS para que cada cuenta solo pueda leer/escribir sus propios datos.

## Importante: la nube requiere configuración
La conexión NO queda activa automáticamente al publicar la PWA. Hay que crear un proyecto Supabase y seguir estos pasos:

1. Entrar en https://supabase.com/ y crear un proyecto.
2. En Project Settings > API, copiar el **Project URL** y la clave **publishable** o **anon**. Nunca usar la `service_role`.
3. En Supabase, abrir SQL Editor, crear una consulta nueva, pegar el contenido de `supabase_setup.sql` y ejecutar.
4. En Authentication > Providers, comprobar que Email esté habilitado. Si la confirmación de correo está activada, confirmar el correo antes de iniciar sesión.
5. Abrir Rolín Scout en el iPhone > Ajustes. Pegar Project URL y clave pública y tocar Guardar conexión.
6. Crear cuenta o iniciar sesión.
7. Tocar **Subir a la nube** para guardar la carrera actual.
8. En otro dispositivo, configurar el mismo proyecto, iniciar sesión y tocar **Descargar de la nube**.

## Reglas de sincronización
- La sincronización es manual en esta versión.
- Subir reemplaza la copia de nube por el estado local actual.
- Descargar reemplaza el estado local por la copia de nube y pide confirmación.
- No existe todavía sincronización automática ni resolución de conflictos entre ediciones simultáneas.
- Exportá un JSON antes de cambios importantes.

## Modelo de datos en esta etapa
La tabla guarda un documento JSON completo por usuario autenticado. Es una primera base central funcional para validar cuentas y sincronización. La siguiente evolución será normalizar temporadas, clubes, competiciones, partidos, estadísticas, premios y eventos What If en tablas relacionadas, con historial de cambios y categorías de certeza.

## Publicar la actualización
Subí los archivos de esta carpeta a la raíz del mismo repositorio GitHub Pages, reemplazando los archivos de 0.1. Conservá el archivo `supabase_setup.sql` en el repositorio para tener a mano la configuración.

Después de publicar, cerrá y volvé a abrir la PWA. Si el iPhone muestra una versión vieja, cerrá la app, abrí la URL en Safari y actualizá la página para que se descargue el nuevo service worker.

## Limitaciones que siguen pendientes
- No es una app nativa `.ipa`.
- El Recorder de Windows todavía no se conecta ni transfiere videos.
- No hay análisis visual de partidos ni IA conectada.
- No hay sincronización automática en segundo plano ni edición colaborativa.
- La tabla usa JSONB como primera etapa; todavía no es el modelo relacional definitivo.
