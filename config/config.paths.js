//* ========================
//#FILE - config.paths.js
//> Author: Raphael Oliveira
//>
//> Create Date: <May 04, 2018>
//>
//======================== */
import path from 'path';

export default {
    src: path.resolve( process.cwd(), 'src' ),
    dist: path.resolve( process.cwd(), 'dist' ),
    root: path.resolve( process.cwd() ),
    entry: path.resolve( process.cwd(), 'src/index.js' ),
    nodeModules: path.resolve( process.cwd(), 'node_modules' ),
};
