// const SanctionCheck = require( '../src/index.js' )
const SanctionCheck = require( 'ethereum-sanction-check' )
const fs = require( 'fs' )


async function main( { tests, config } ) {
    return true
}



function prepareConfig( { config } ) {
    function loadEnv( { path } ) {
        const env = {}
            fs.readFileSync( path, 'utf8' )
                .split( "\n" )
                .forEach( ( txt ) => {
                    let temp = txt.split( /=(.+)/ )
                    env[ temp[ 0 ] ] = temp[ 1 ]
                } )
        return env
    }

    const env = loadEnv( { 'path': config['env'] } )

    config['provider'] = env['ETHEREUM_MAINNET_ALCHEMY_HTTP']
    config['chainalysis']['api_key'] = env['CHAINALYSIS_SANCTIONS_API_KEY']
    return config
}


let config = {
    'env': '../../.env',
    'provider': null,
    'chainalysis': {
        'api_key': null
    }
}


config = prepareConfig( { config } )
const s = new SanctionCheck( {
    'chainalysisApiKey': config['chainalysis']['api_key']
} )

s.start( { 'tests': '0x0000000000000000000000000000000000000000' } )
    .then( s => { s.print() } )
    .catch( err => console.log( err ) )
