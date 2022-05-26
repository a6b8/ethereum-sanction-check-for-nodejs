const ethers = require( 'ethers' )
const axios = require( 'axios' )

const SanctionCheck = class SanctionCheck {
    constructor( { providerUrl=null, chainalysisApiKey, sleep=0, provider=null } ) {        
        this.chainalysisApiKey = chainalysisApiKey
        this.providerUrl = providerUrl
        this.provider = provider
        this.checks = []
        this.sleep = sleep

        return this
    }


    async ethereumAddress( { test } ) {
        const result = {
            'ens': null,
            'eoa': null,
            'valid': false
        }
    
        if( typeof test === 'string' ) {
            if( test.match( /^0x[a-fA-F0-9]{40}$/ ) ) {
                result['eoa'] = test
                result['valid'] = true
            } else {
                if( test.includes( '.eth' ) )  {
                    if( this.provider === null ) {
                        this.provider = new ethers.providers
                            .JsonRpcProvider( this.providerUrl )
                    }
                    result['ens'] = test
                    result['eoa'] = await this.provider.resolveName( test )
                    result['valid'] = true
                } else {}
            }
        } else {}
    
        return result
    }


    async chainlysisSanctionList( { address } ) {
        function statusCode( { address, code } ) {
            const codes = {
                200: 'OK',
                400: 'This indicates the request was unacceptable. This may refer to a missing or improperly formatted parameter.',
                404: 'This may be because you either requested a nonexistent endpoint or malformed the endpoint syntax.',
                406: 'This may be because you requested a response format that the API cannot produce. We currently only support JSON output.',
                500: "Internal server error	(Rare.) This indicates an error with Chainalysis's server.",
                503: "(Rare.) This indicates Chainalysis's server may be unavailable or not ready to handle the request.",
                504: '(Rare.) This indicates that our API gateway did not get a response from our application servers within the expected time.'
            }
    
            console.log( `Address  ${address}` )
            if( codes.hasOwnProperty( code ) ) {
                console.log( `         ${codes[ code ]}` )
            } else {
                console.log( `         Unknown Error` )
            }
    
            return 
        }
    
    
        const result = { 'identifications': null, 'tradable': null }
        if( address['valid'] ) {
            const url = `https://public.chainalysis.com/api/v1/address/${address['eoa']}`
            const response = await axios( 
                url, 
                {
                    'headers': {
                        'X-API-Key': this.chainalysisApiKey,
                        'Accept': 'application/json'
                    }
                } 
            )
    
            if( response['status'] === 200 ) {
                result['identifications'] = response['data']['identifications']
                result['tradable'] = !( result['identifications'].length > 0 )
            } else {
                statusCode( { 'address': address['eoa'], 'code': response['status'] } )
            }
        }
    
        return result
    }


    async start( { tests } ) {
        const delay = ms => new Promise( resolve => setTimeout( resolve, ms ) )
        Array.isArray( tests ) ? this.tests = tests : this.tests = [ tests ]

        this.checks = []

        for( let i = 0; i < this.tests.length; i++ ) {
            const obj = {
                'search': this.tests[ i ],
                'address': null,
                'chainalysis': null
            }
        
            this.sleep > 0 ? await delay( this.sleep ) : ''
            obj['address'] = await this.ethereumAddress( { 'test': obj['search'] } )
            obj['chainalysis'] = await this.chainlysisSanctionList( { 'address': obj['address'] } )
    
            this.checks.push( obj )
        }

        return this
    }


    print() {
        const symbols = {
            "check": "✅",
            "error": "❌"
        }

        
        const headlines = [
            {
                'name': 'VALID',
                'x': 'address__valid',
                'l': null
            },
            {
                'name': 'ENS',
                'x': 'address__ens',
                'l': null
            },
            {
                'name': 'ADDRESS',
                'x': 'address__eoa',
                'l': null
            },
            {
                'name': 'CHAINALYSIS',
                'x': 'chainalysis__tradable',
                'l': null
            }
        ]


        headlines
            .forEach( ( headline, index ) => {
                const [ k0, k1 ] = headline['x'].split( '__' )
                let min = this.checks
                    .map( check => { return `${check[ k0 ][ k1 ]}`.length } )
                    .reduce( ( a, b ) => { return ( a > b ) ? a : b } )

                if( min < headline['name'].length ) {
                    min = headline['name'].length
                }
                
                headlines[ index ]['l'] = min
                headlines[ index ]['l'] = headlines[ index ]['l'] + 4
            } )

        let a = headlines.map( headline => {
                const l = headline['l'] - ( headline['name'] + '' ).length
                const space = l >= 0 ? new Array( l ).join( ' ' ) : ''
                return `${headline['name']}${space}`
            } )
        a.unshift( 'NR   ' )
        console.log( a.join( '' ) )

        this.checks
            .forEach( ( row, index ) => {
                const values = headlines
                    .map( headline => {
                        const [ k0, k1 ] = headline['x'].split( '__' )
                        return row[ k0 ][ k1 ]
                    } )
                    .map( ( value, rindex ) => {
                        value = value === null ? '' : value
                        value = value === true ? symbols['check'] : value
                        value = value === false ? symbols['error'] : value
                        let l = headlines[ rindex ]['l'] - ( value + '' ).length
                        const space = l >= 0 ? new Array( l ).join( ' ' ) : ''
                        return [ `${value}`,`${space}` ]
                    } )
                
                const l = 5 - ( index + '' ).length
                const space = l >= 0 ? new Array( l ).join( ' ' ) : ''  
                values.unshift( [ `${space}`,`${index} `] ) 

                values.forEach( value => process.stdout.write( `${value[0]}${value[1]}`))
                console.log()
            } )

        return this
    }
}


module.exports = SanctionCheck