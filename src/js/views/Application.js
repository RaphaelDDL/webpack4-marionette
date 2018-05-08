import 'helpers';
import 'css/Application';
import RootView from 'views/Root';
import PackageInfo from 'package';

export default Mn.Application.extend( {
    region: `#${PackageInfo.app.appMountId}`,
    template: $.noop,

    onStart() {
        this.showView( new RootView() );
        this.historyStart();
    },

    historyStart() {
        if ( !Bb.History.started ) {
            Bb.history.start( {
                pushState: true,
                silent: false,
            } );
        }
    }
} );
