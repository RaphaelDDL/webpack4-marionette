import Handlebars from 'handlebars-template-loader/runtime';

//Example helper
//https://stackoverflow.com/questions/11924452/iterating-over-basic-for-loop-using-handlebars-js/11924998#11924998
Handlebars.registerHelper( 'times', function ( n, block ) {
    var accum = '';
    for ( var i = 0; i < n; ++i )
        accum += block.fn( i );
    return accum;
} );

export default Handlebars;
