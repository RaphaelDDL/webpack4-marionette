import template from 'templates/root';
import HeaderView from 'views/Header';
import FooterView from 'views/Footer';

export default Mn.View.extend( {
    template,

    regions: {
        header: 'header',
        footer: 'footer'
    },

    onRender() {
        this.showChildView( 'header', new HeaderView() );
        this.showChildView( 'footer', new FooterView() );
    }
} );
