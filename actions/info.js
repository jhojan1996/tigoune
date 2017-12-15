exports.info = (req, res)=>{
	console.log("****** Info *******");

	const info = (typeof req.body.result.contexts[0].parameters.servicios !== 'undefined') ? req.body.result.contexts[0].parameters.servicios: '';
}