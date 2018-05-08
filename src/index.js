// debugger; //<-- to make other breakpoints work: https://bugs.chromium.org/p/chromium/issues/detail?id=459499#c17

import 'css/Application';
import Application from 'views/Application';

$( () => {
    new Application().start();
} );
