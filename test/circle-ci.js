const SanctionCheck = require( '../src/index.js' )
const fs = require( 'fs' )


async function main( { tests, config } ) {
    const s = new SanctionCheck( {
        'providerUrl': config['provider'],
        'chainalysisApiKey': config['chainalysis']
    } )

    await s.start( { 'tests': tests } )
    s.print()

    return s
}


let config = {}
config['provider'] = process.env.ETHEREUM_MAINNET_INFURA_HTTP
config['chainalysis'] = process.env.CHAINALYSIS_SANCTIONS_API_KEY

const tests = [
    '0x0000000000000000000000000000000000000000'
]

main( { config, tests } )
    .then( s => {
        if( s.checks[ 0 ]['chainalysis']['tradable'] ) {
            process.exit( 0 )
        } else {
            process.exit( 1 )
        }
    } )
    .catch( e => {
        console.log( e )
        process.exit( 1 )
    } )