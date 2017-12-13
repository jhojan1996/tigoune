var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function(){
	var el =  yo`
	<div class='container timeline'>
		<div class='row'>
			<div class='col s12 m10 l12'>
				<img src='images/banner1.jpg' class='full-img'/>
			</div>
		</div>
		<div class='row over'>
			<div class='col s10 m10 offset-m1 l8 offset-l2 center-align'>
				<form enctype='multipar/form-data' class='form-upload' id='formUpload'>
					<div class='main-section'>
						<div class='main-title'>En TIGO UNE se acabaron las bajas velocidades</div>
						<div class='row'>
							<a href='/listen/1'>
								<div class='col s12 m4 l4 black-word not-active'>
									<div class='row'>
										<div class='small-title'><b>Plan</b></div>
										<div class='plan-name'><b>5 <br><small class='small-plan'>MEGAS</small></b></div>
									</div>
									<div class='plan-content'>
										<div class='row>'>
											<b>Con 5 Megas puedes: </b>
											<ul class='own-list'>
												<li>Chatea</li>
												<li>Accede a tu email</li>
												<li>Disfruta tus peliculas favoritas</li>
												<li>Realiza videoconferencias</li>
											</ul>
										</div>
										<div class='row'>
											<b>velocidad de acceso</b>
											<ul class='own-list'>
												<li>Bajada 5.000 Kbps</li>
												<li>Subida 1.024 Kbps</li>
											</ul>
										</div>					
									</div>
									<div class='pay-button'>
										<a class='btn custom-btn disabled-cstm'>COMPRAR <i class="fa fa-microphone" aria-hidden="true"></i></a>
									</div>
								</div>
							</a>
							<a href='/listen/2'>
								<div class='col s12 m4 l4 black-word active'>
									<div class='row'>
										<div class='small-title'><b>Plan</b></div>
										<div class='plan-name'><b>10 <br><small class='small-plan'>MEGAS</small></b></div>
									</div>
									<div class='plan-content'>
										<div class='row>'>
											<b>Con 10 Megas puedes: </b>
											<ul class='own-list'>
												<li>Videos en HD</li>
												<li>Juega en linea</li>
												<li>Descarga contenido mas pesado</li>
												<li>Contecta varios dispositivos</li>
											</ul>
										</div>
										<div class='row'>
											<b>velocidad de acceso</b>
											<ul class='own-list'>
												<li>Bajada 10.000 Kbps</li>
												<li>Subida 1.024 Kbps</li>
											</ul>
										</div>					
									</div>
									<div class='pay-button'>
										<a class='btn custom-btn enabled-cstm'>COMPRAR <i class="fa fa-microphone" aria-hidden="true"></i></a>
									</div>
								</div>
							</a>
							<a href='/listen/3'>
								<div class='col s12 m4 l4 black-word not-active'>
									<div class='row'>
										<div class='small-title'><b>Plan</b></div>
										<div class='plan-name'><b>20 <br><small class='small-plan'>MEGAS</small></b></div>
									</div>
									<div class='plan-content'>
										<div class='row>'>
											<b>Con 20 Megas puedes: </b>
											<ul class='own-list'>
												<li>Conecta tu TV, tablet o móvil</li>
												<li>Videos en HD</li>
												<li>Juega en linea</li>
												<li>Descarga contenido más pesado</li>
											</ul>
										</div>
										<div class='row'>
											<b>velocidad de acceso</b>
											<ul class='own-list'>
												<li>Bajada 20.000 Kbps</li>
												<li>Subida 1.024 Kbps</li>
											</ul>
										</div>					
									</div>
									<div class='pay-button'>
										<a class='btn custom-btn disabled-cstm'>COMPRAR <i class="fa fa-microphone" aria-hidden="true"></i></a>
									</div>
								</div>
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	`;

	return layout(el);
}
