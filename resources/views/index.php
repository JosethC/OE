<!DOCTYPE html>
<html ng-app="observatoryApp">
<head>
	<title>Entrepreneurship Observatory</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" type="text/css" href="<?= asset('node_modules/bootstrap/dist/css/bootstrap.min.css') ?>">
	<link rel="stylesheet" type="text/css" href="<?= asset('node_modules/font-awesome/css/font-awesome.min.css') ?>">
	<link rel="stylesheet" type="text/css" href="<?= asset('node_modules/angular-material/angular-material.min.css') ?>">
	<link rel="stylesheet" type="text/css" href="<?= asset('app/css/styles.css') ?>">
	<link rel="stylesheet" type="text/css" href='<?= asset('app/css/roboto.css') ?>'>
	<link rel="stylesheet" type="text/css" href='<?= asset('app/css/kaushan.css') ?>'>
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPqTwsoIuwu62-uwGszSJnuZLECoFgqik"></script>
    
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v3.20.0/build/ol.js"></script>
    
</head>
<body>
	<div ui-view></div>

	<!-- Application Dependencies -->
	<script type="text/javascript" src="<?= asset('node_modules/angular/angular.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/ui-bootstrap/ui-bootstrap.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-animate/angular-animate.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-aria/angular-aria.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-messages/angular-messages.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/jquery/dist/jquery.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/carousel/js/bootstrap.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-ui-router/release/angular-ui-router.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-cookies/angular-cookies.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-material/angular-material.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-filter/angular-filter.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/chart/chart.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/file-saver/FileSaver.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/blob/Blob.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/html-docx/html-docx.js') ?>"></script>


	<!-- Application Scripts -->
	<script type="text/javascript" src="<?= asset('app/js/app.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/pagination.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Login/login.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Admin/admin.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Cantones/cantones.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Cantones/cantones.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestador/encuestador.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Empresario/empresario.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/TerritoriosSectores/territoriosSectores.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Login/login.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Regiones/regiones.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Regiones/regiones.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Territorios/territorios.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Territorios/territorios.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/PersonasSectores/personasSectores.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Sectores/sectores.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Sectores/sectores.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Personas/personas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Personas/personas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestas/encuestas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestas/encuestas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestador/contestar-encuestas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Preguntas/preguntas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Preguntas/preguntas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Indicadores/indicadores.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Indicadores/indicadores.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Aplicaciones/aplicaciones.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Aplicaciones/aplicaciones-respuestas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Aplicaciones/aplicaciones-respuestas-ee.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/RespaldoAplicacionesRespuestas/respaldo-aplicaciones-respuestas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Autenticacion/autenticacion.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Periodos/periodos.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Periodos/periodos.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/SectoresIndicadores/sectoresIndicadores.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/angular-drag-and-drop-lists.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Analisis/analisisCompleto.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Analisis/analisis.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Graficos/datosGraficos.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Graficos/datosGraficos.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Perfil/perfil.controller.js') ?>"></script>
    
</body>
</html>
