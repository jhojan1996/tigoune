var yo = require('yo-yo');
var layout = require('../layout');
var request = require('superagent');

module.exports = function(){
	var el =  yo`
	<div class='container timeline'>
		<div class='row'>
			<div class='col s12 m10 offset-m1 l8 offset-l2 center-align'>
				<img src='images/banner1.jpg' class='full-img'/>
			</div>
		</div>
		<div class='row over'>
			<div class='col s10 m10 offset-m1 l8 offset-l2 center-align'>
				<form enctype='multipar/form-data' class='form-upload' id='formUpload'>
					<div class='main-section'>
						<div class='main-title'>NAVEGA AL DOBLE DE VELOCIDAD</div>
						<div class='sub-title'>¿Quiero mi plan?</div>
						<div class='input-field'>
				          	<input id='nombre' type='text' class='validate'>
				          	<label for='nombre'>Nombre:</label>
				        </div>			   
				        <div class='input-field'>
				          	<input id='apellido' type='text' class='validate'>
				          	<label for='apellido'>Apellido:</label>
				        </div>
				        <div class='text center'>Acepto <a class='link'>Términos y condiciones.</a></div>
				        <div class='record-btn'><i class="fa fa-microphone white-icons" aria-hidden="true"></i></div>
					</div>
				</form>
			</div>
		</div>
	</div>
	`;

	return layout(el);
}
