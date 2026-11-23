ROLÍN SCOUT MOBILE 0.3 — GUÍA COMPLETA
======================================

QUÉ INCLUYE
- PWA para iPhone y navegador.
- Datos de carrera guardados localmente.
- Exportación e importación JSON.
- Integración con Supabase Auth y base de datos.
- Sincronización manual entre dispositivos.
- SQL con Row Level Security (RLS).
- Registro manual de partidos.
- Carrera, títulos, premios y cronología What If.

IMPORTANTE SOBRE TUS DATOS
1. Conservá la copia JSON que exportaste antes de actualizar.
2. La importación reemplaza los datos locales del navegador.
3. Los datos de ejemplo de clubes y premios son la instantánea histórica inicial.
   Revisalos y actualizalos; no se consideran automáticamente estadísticas actuales.
4. La nube sincroniza cuando vos tocás Subir/Descargar. No hay sincronización automática
   en segundo plano ni integración con Recorder en esta versión.

PARTE A — ACTUALIZAR GITHUB PAGES
1. En tu PC, extraé este ZIP.
2. Abrí tu repositorio GitHub: rolin-scout.
3. Entrá a la raíz del repositorio.
4. Add file > Upload files.
5. Subí TODOS los archivos de esta carpeta directamente a la raíz (no subas la carpeta
   como una carpeta anidada).
6. Aceptá reemplazar index.html, app.js, styles.css, manifest.webmanifest, sw.js e icon.svg.
7. Comprobá que index.html esté en la raíz.
8. Esperá a que GitHub Pages termine el despliegue.
9. Abrí la web en Safari y recargá. Si sigue apareciendo la versión vieja, cerrá la PWA
   completamente y abrí la web en Safari; el nuevo service worker actualizará la caché.

PARTE B — CREAR LA BASE DE DATOS EN SUPABASE
1. Entrá en https://supabase.com y creá una cuenta o iniciá sesión.
2. Creá un proyecto nuevo llamado rolin-scout.
3. Elegí una contraseña fuerte para la base de datos y guardala en un lugar seguro.
   Esa contraseña NO se pega en Rolín Scout.
4. Esperá a que el proyecto termine de aprovisionarse.
5. En el menú izquierdo abrí SQL Editor.
6. Elegí New query.
7. En tu PC abrí el archivo supabase_setup.sql de este ZIP.
8. Copiá TODO su contenido y pegalo en SQL Editor.
9. Tocá Run. Debe terminar sin errores. Esto crea la tabla career_data y políticas RLS.
10. Abrí Project Settings (ícono de engranaje) > API.
11. Copiá Project URL.
12. Copiá la clave pública publishable (sb_publishable_...) o anon public legacy.
    NO copies service_role ni secret key.

PARTE C — CONECTAR ROLÍN SCOUT
1. Abrí Rolín Scout en Safari.
2. Entrá a Ajustes y nube.
3. En Project URL pegá la URL del proyecto.
4. En Publishable / anon key pegá la clave PÚBLICA.
5. Tocá Guardar conexión.
6. En Cuenta, ingresá tu email y una contraseña de al menos 8 caracteres.
7. Tocá Crear cuenta.
8. Si Supabase solicita confirmar email, abrí el correo y confirmá.
9. Volvé a Rolín Scout e Iniciar sesión.
10. En Datos de carrera, tocá Importar JSON y seleccioná la copia que exportaste antes.
11. Confirmá la importación. Revisá que los datos estén correctos.
12. En Sincronización, tocá Subir datos a la nube.
13. Esperá el mensaje de confirmación.

PARTE D — USARLO EN OTRO DISPOSITIVO
1. Abrí la misma dirección de GitHub Pages.
2. Entrá a Ajustes y nube.
3. Pegá la misma Project URL y la misma clave pública.
4. Guardá la conexión.
5. Iniciá sesión con el mismo email y contraseña.
6. Tocá Descargar datos de la nube.
7. Confirmá SOLO si querés reemplazar los datos locales por los de la nube.

SEGURIDAD
- La app usa únicamente la clave pública (publishable/anon).
- Nunca pongas service_role, secret key ni contraseña de base de datos en la web.
- RLS limita lectura y escritura a la fila cuyo user_id coincide con auth.uid().
- Si publicás esta app, la URL y clave pública son visibles para los visitantes; eso es normal.
  La seguridad depende de RLS y de no exponer claves secretas.
- Elegí una contraseña única y segura para tu cuenta.

LIMITACIONES REALES DE LA 0.3
- Sincronización manual; no automática.
- Un único documento JSON por usuario; no hay historial de versiones en la nube.
- No hay recuperación de contraseña personalizada dentro de la app (usar el flujo de Supabase).
- No hay análisis de video IA, subida de videos ni conexión con Rolín Scout Recorder.
- El motor What If todavía es un marco de criterios y cronología, no un agente de IA conectado.
- La app requiere internet para Supabase y para cargar la librería JS externa.
- Para actualizaciones importantes, exportá una copia JSON.

SI ALGO FALLA
- "relation career_data does not exist": no ejecutaste supabase_setup.sql o lo ejecutaste en otro proyecto.
- "Invalid API key": revisá Project URL y clave pública.
- "Row level security": confirmá que ejecutaste todo el SQL y que iniciaste sesión.
- "Email not confirmed": confirmá el email recibido o revisá Authentication > Providers > Email.
- Si la importación falla, no borres tu copia original. Revisá que sea un JSON válido.
