/**
* Entrepreneurship Observatory
*
* @authors Fauricio Rojas Hernández, Manfred Artavia Gómez y Carlos Jiménez González.
* @version 1.0
*/


(function () {
	 'use strict';
	 angular
        .module('observatoryApp')
       .controller('AnalisisCompletoController', AnalisisCompletoController);
	 /**
	* Controlador del análisis.
	* @param {Object} Servicio que permite la unión entre el HTML y el controlador.
	* @param {Object} Servicio que brinda funciones del analisis al controlador.
	*/
    
    
	 function AnalisisCompletoController ($scope, AnalisisFactory, IndicadoresFactory, RegionesFactory, SectoresFactory, PeriodosFactory, TerritoriosFactory, $timeout, DatosGraficosFactory, $mdDialog) {
		 $scope.getAnalisis = getAnalisis;
		 $scope.generarGrafico = generarGrafico;
		 $scope.guardarDatosGraficos = guardarDatosGraficos;

		 $scope.analisis1 = null;
		 $scope.analisis2 = null;
		 $scope.analisis3 = null;
		 $scope.msgAnalisis = "";
		 $scope.showMsgAnalisis = false;
		 $scope.styleMsgAnalisis = "";
		 $scope.tiempoMsg = 5000;


		 $scope.selectAllSectores = function() {
			 var toggleStatus = $scope.allSectores;
			 angular.forEach($scope.sectores, function(sector){ sector.selected = toggleStatus; });
			 $scope.showMsgAnalisis = false;
		 };

		 $scope.selectSector = function(){
			 $scope.allSectores = $scope.sectores.every(function(sector){ return sector.selected; });
			 $scope.showMsgAnalisis = false;
		 };

		 $scope.selectAllIndicadores = function() {
			 var toggleStatus = $scope.allIndicadores;
			 angular.forEach($scope.indicadores, function(indicador){ indicador.selected = toggleStatus; });
			 $scope.showMsgAnalisis = false;
		 };

		 $scope.selectIndicador = function(){
			 $scope.allIndicadores = $scope.indicadores.every(function(indicador){ return indicador.selected; });
			 $scope.showMsgAnalisis = false;
		 };

		 function getMes(numMes) {
			 var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			 return meses[numMes-1];
		 }

		 function getPeriodos() {
			 PeriodosFactory.getAll()
				 .then(function(response) {
					 response.forEach(function(periodo) {
						 periodo.label = periodo.modo_periodicidad + ' ' + getMes(periodo.mes_inicio) + ' - ' + getMes(periodo.mes_fin) +', ' + periodo.anio;
					 });
					 $scope.periodos = response;
					 $scope.selectedPeriodo = $scope.periodos[0];
				 })
				 .catch(function(err) { });
		 }
         
         function getRegiones() {
			 RegionesFactory.getAll()
				 .then(function(response) {
					 response.forEach(function(region) {
						 region.label = region.nombre;
					 });
					 $scope.regiones = response;
					 $scope.selectedRegion = $scope.regiones[0];
				 })
				 .catch(function(err) { });
		 }
         
         function getTerritorios() {
			 TerritoriosFactory.getAll()
				 .then(function(response) {
					 response.forEach(function(region) {
						 territorio.label = territorio.nombre;
					 });
					 $scope.territorios = response;
					 $scope.selectedTerritorio = $scope.territorios[0];
				 })
				 .catch(function(err) { });
		 }

		 function getSectores() {
			 SectoresFactory.getAll()
				 .then(function (response) {
					 $scope.sectores = response;
					 $scope.sectores.forEach(function (sector) {
						 sector.selected = false;
					 });
				 });
		 }

		 function getIndicadores() {
			 IndicadoresFactory.getAll()
				 .then(function (response) {
					 $scope.indicadores = response;
					 $scope.indicadores.forEach(function (indicador) {
						 indicador.selected = false;
					 });
				 });
		 }

		 function createInformacion(filtro){
			 $scope.msgInfoAnalisis = "";
			 $scope.showMsgInfoAnalisis = true;
			 var indicadores = '';
			 filtro.filtroIndicadores.forEach(function (indice) {
				 indicadores += indice.nombre + ', ';
			 });
			 var sectores = '';
			 filtro.filtroSectores.forEach(function (sector) {
				 sectores += sector.nombre + ', ';
			 });
			 $scope.msgInfoAnalisis = 'El análisis generado es del periodo: ' +$scope.selectedPeriodo.label
			 + ', de los sectores: ' + sectores +  ' de los indicadores: '+ indicadores.slice(0, -2) + '.';
		 }

		 function guardarDatosGraficos(ev) {

			 var confirm = $mdDialog.confirm('?')
				 .title('Guardar datos del análisis')
				 .textContent('¿Esta seguro que desea guardar los datos del análisis?')
				 .ariaLabel('Lucky day')
				 .targetEvent(ev)
				 .ok('Sí')
				 .cancel('No');

			 $mdDialog.show(confirm)
				 .then(function() {
					 $scope.an = false;
					 var periodo_id = $scope.selectedPeriodo.id;
					 var datos = {datos1: $scope.analisis4, datos2: $scope.analisisEE4};
					 var datosGraficos = {datosGraficos: datos, periodo_id: periodo_id, descripcion: $scope.msgInfoAnalisis, totales: $scope.total};
					 AnalisisFactory.guardarDatosGraficos(datosGraficos)
						 .then(function (response) {
							 if (response === 'true'){
								 $scope.showMsgDatosGrafico = true;
								 $scope.msgDatosGrafico = 'Los datos del análisis se guardaron';
								 ocultarMensaje(6000);
							 }
						 }, function (err) {
							 $scope.showMsgDatosGrafico = true;
							 $scope.msgDatosGrafico = 'Ocurrió un error al guardar los datos del análisis';
							 ocultarMensaje(6000);
							 console.log(err);
						 });
				 }, function() {});
		 }

		 function ocultarMensaje(milisegundos) {
			 $timeout(function() {
				 $scope.showMsgDatosGrafico = false;
			 }, milisegundos);
		 }

		 function getAnalisis() {
			 var filtroSectores = [];
			 $scope.sectores.forEach(function (sector) {
				 if (sector.selected === true)
				 {
					 var nSector = { id: sector.id, nombre: sector.nombre };
					 filtroSectores.push(nSector);
				 }
			 });
			 var filtroIndicadores = [];
			 $scope.indicadores.forEach(function (indicador) {
				 if (indicador.selected === true)
				 {
					 var nIndicador = { id: indicador.id, nombre: indicador.nombre };
					 filtroIndicadores.push(nIndicador);
				 }
			 });
			 var filtro = { filtroSectores: filtroSectores, filtroIndicadores: filtroIndicadores,
				 periodo_id: $scope.selectedPeriodo.id, evolucion: 1};// evolucion real

			 if (filtroSectores.length === 0){
				 $scope.showMsgAnalisis = true;
				 $scope.msgAnalisis = "No se han seleccionado Sectores";
				 $scope.styleMsgAnalisis = "error-box";
				 $scope.tiempoMsg = 5000;
			 }
			 else if (filtroIndicadores.length === 0){
				 $scope.showMsgAnalisis = true;
				 $scope.msgAnalisis = "No se han seleccionado Indicadores";
				 $scope.styleMsgAnalisis = "error-box";
				 $scope.tiempoMsg = 5000;
			 }
			 else{
				 $scope.an = false;
				 AnalisisFactory.getAnalisis(filtro)
					 .then(function (response) {
						 $scope.analisis = response;

						 if ($scope.analisis[0].analisis1.length === 0){
							 $scope.showMsgAnalisis = true;
							 $scope.msgAnalisis = "No hay resultados que mostrar";
							 $scope.styleMsgAnalisis = "info-box";
							 $scope.tiempoMsg = 6000;
							 $scope.an = false;
						 }
						 else{
							 $scope.an = true;
							 createInformacion(filtro);
							 $('#configuracionAnalisis').modal('hide');
							 $scope.analisis1 = $scope.analisis[0].analisis1;
							 $scope.analisis2 = $scope.analisis[0].analisis2;
							 $scope.analisis3 = $scope.analisis[0].analisis3;
							 $scope.analisis4 = $scope.analisis[0].analisis4;

							 if ($scope.analisis4.length > 0)
								 $scope.headerSector = $scope.analisis4[0].resultados;
							 $scope.totales = $scope.analisis[0].totales;
						 }
						 if ($scope.an){
							 filtro.evolucion = 2;// evolucion esperada

							 AnalisisFactory.getAnalisis(filtro)
								 .then(function (response) {
									 $scope.analisisEE = response;

									 $scope.analisisEE1 = $scope.analisisEE[0].analisis1;
									 $scope.analisisEE2 = $scope.analisisEE[0].analisis2;
									 $scope.analisisEE3 = $scope.analisisEE[0].analisis3;
									 $scope.analisisEE4 = $scope.analisisEE[0].analisis4;
									 if ($scope.analisisEE4.length > 0)
										 $scope.headerSectorEE = $scope.analisisEE4[0].resultados;
									 $scope.totalesEE = $scope.analisisEE[0].totales;
									 $scope.totales.tipo_evolucion = 1;
									 $scope.totales.evolucion = 'Evolución real';
									 $scope.totalesEE.tipo_evolucion = 2;
									 $scope.totalesEE.evolucion = 'Evolución esperada';
									 $scope.total = {total1: $scope.totales, total2: $scope.totalesEE};
									 generarGrafico($scope.total);
								 })
								 .catch(function(err) {
									 console.log(err);
								 });
						 }
					 })
					 .catch(function(err) { });
			 }
			 $timeout(function() {
				 $scope.showMsgAnalisis = false;
			 }, $scope.tiempoMsg);
		 }
         
         //getRegiones();
		 getPeriodos();
		 getSectores();
		 getIndicadores();
		 
		 function generarGrafico(totales) {
			 //var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);

			 var ctx = document.getElementById("myCanvasChart");
			 $scope.titulo1 = totales.total1.evolucion; // Evolucion real
			 $scope.titulo2 = totales.total2.evolucion; // Evolucion esperada
			 var etiquetas = getNombreSectores(totales.total1.resultados);

			 var color1 = getRandomColor();
			 var color2 = getRandomColor();
             
			 if (color1 === color2)
				 color2 = getRandomColor();

			 var myChart = new Chart(ctx, {
				 type: 'bar',
				 data: {
					 labels: etiquetas,
					 datasets: [{
						 label: $scope.titulo1,
						 data: getData(totales.total1.resultados),
						 //backgroundColor: getColor(totales.total1.resultados.length, color1, '0.2'),
						 backgroundColor: "#4BC09F",
						 borderColor: "#4BC09F",
						 //borderColor: getColor(totales.total1.resultados.length , color1, '1'),
						 borderWidth: 1
					 },{
						 label: $scope.titulo2,
						 data: getData(totales.total2.resultados),
						 //backgroundColor: getColor(totales.total1.resultados.length, color2, '0.2'),
						 backgroundColor: "#0C543F",
						 //borderColor: getColor(totales.total1.resultados.length , color2, '1'),
						 borderColor: "#0C543F",
						 borderWidth: 1
					 }]
				 },
				 options: {
					 tooltip:{display: true},
					 title: {
						 display: true,
						 text: 'Índice  de confianza empresarial Región Huetar Norte'
					 },
					 legend: {
						 display: true,
						 labels: {
							 fontColor: 'rgb(40, 40, 40)'
						 }
					 },
					 scales: {
						 yAxes: [{
							 ticks: {
								 beginAtZero:true
							 }
						 }]
					 }
				 }
			 });
		 }

		 function getNombreSectores(sectores) {
			 var nombres = [];
			 sectores.forEach(function (sector) {
				 nombres.push(sector.nombre);
			 });
			 return nombres;
		 }
		 
		 function getData(resultados) {
			 var valores = [];
			 resultados.forEach(function (resultado) {
				 valores.push(resultado.valor);
			 });
			 return valores;
		 }

		 function getColor(con, color, op) {
			 var colores = [];
			 for (var i=0; i<con; i++) {
				 colores.push(color + op + ')');
			 }
			 return colores;
		 }

		 function getRandomColor() {
			 return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' +
				 (Math.floor(Math.random() * 256)) + ',' +
				 (Math.floor(Math.random() * 256)) + ', ';
		 }
	 }
})();