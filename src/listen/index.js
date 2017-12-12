import page from 'page';
import title from 'title';
import empty from 'empty-element';
import template from './template';

page('/listen/:product', (ctx,next)=>{
	//ctx.params.product
	title(`Recargas`);
	var main = document.getElementById('main-container');
	var header = document.getElementById('header-container');
	empty(header);
	empty(main).appendChild(template(ctx.params.product));
});