<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/custom/ethereum-sanction-check-for-node.js.svg" height="45px" alt="Ethereum Sanction Check for Node.js" name="# Ethereum Sanction Check for Node.js">
</a>

<br>

This node module help to check if a account is sanction. Currently only `chainalysis sanction api` is support. Here you can find more Information: https://public.chainalysis.com/docs/index.html#create-an-api-key

<br>

<a href="#headline">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/examples.svg" height="45px" alt="Examples" name="examples">
</a>

**ENS Names compatible**
```javascript
const SanctionCheck = require( 'ethereum-sanction-check' )

async function main( { tests } ) {
    const check = new SanctionCheck( {
        'providerUrl': process.env.HTTP_NODE_PROVIDER,
        'chainalysisApiKey': process.env.CHAINALYSIS_API_KEY
    } )

    await check.start( { 'tests': tests } )
    check.print()
    return s.checks
}


main( { 'tests': 'vitalik.eth' } )
    .then( checks => console.log( checks ) )
    .catch( e => console.log( e ) )

```

**LISTS with validation check**
```javascript
const SanctionCheck = require( 'ethereum-sanction-check' )

async function main( { tests } ) {
    const check = new SanctionCheck( {
        'providerUrl': process.env.HTTP_NODE_PROVIDER,
        'chainalysisApiKey': process.env.CHAINALYSIS_API_KEY
    } )

    await check.start( { 'tests': tests } )
    check.print()
    return s.checks
}

const tests = [ 
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
    '0x0000000000000000000000000000000000000003',
    null,
    1,
    'invalid'
 ]

main( { 'tests': tests } )
    .then( checks => console.log( checks ) )
    .catch( e => console.log( e ) )
```

<br>

<a href="#headline">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/table-of-contents.svg" height="45px" alt="Table of Contents" name="table-of-contents">
</a>

1. [Examples](#examples)<br>
2. [Quickstart](#quickstart)<br>
3. [Setup](#setup)
4. [Options](#options)<br>
5. [Contributing](#contributing)<br>
6. [License](#license)<br>
7. [Code of Conduct](#code-of-conduct)<br>
8. [Support my Work](#support-my-work)<br>

<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/quickstart.svg" height="45px" alt="Quickstart" name="quickstart">
</a>


```javascript
const SanctionCheck = require( 'ethereum-sanction-check' )

const check = new SanctionCheck( {
    'chainalysisApiKey': process.env.CHAINALYSIS_API_KEY
} )

const tests = [ '0x0000000000000000000000000000000000000000' ]

check.start( { 'tests': tests } )
    .then( s => { s.print() } )
    .catch( err => console.log( err ) )
```


<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/setup.svg" height="45px" name="setup" alt="Setup">
</a>

```javascript
npm i ethereum-sanction-check
```

<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/options.svg" height="45px" alt="Options" name="Options">
</a>

**constructor()**

```javascript
const SanctionCheck = require( 'ethereum-sanction-check' )

const check = new SanctionCheck( { 
    'providerUrl': null, 
    'chainalysisApiKey': process.env.CHAINALYSIS_API_KEY
    'sleep': 1, 
    'provider': null 
} )
```

| **Name** | **Type** | **Required** | **Default** | **Description** |
|------:|:------|:------|:------|:------|
| providerUrl | ```String```| No | ```null```| Is only used for ENS Domainnames: [LINK](https://ens.domains) |
| chainalysisApiKey | ```String``` | Yes | ```null```| You can find more Information here: [LINK](https://public.chainalysis.com/docs/index.html#create-an-api-key) |
| sleep | ```String```| No | ```0``` | Delay between queries in milliseconds |
| provider | ```Etherjs Provider Object```| No | ```null``` | By default it will created for you. You can also pass the object y yourself: [LINK](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/) |


**.start( { tests: [] } )**

| **Name** | **Type** | **Required** | **Default** | **Description** |
|------:|:------|:------|:------|:------|
| tests | ```String``` or ```Array``` | Yes | | Insert your addresses here as Array or a single string |


**.print()**  
Console log all results.

**.checks**  
Return results as array


<br>


<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/contributing.svg" height="45px" alt="Contributing" name="contributing">
</a>

Bug reports and pull requests are welcome on GitHub at https://github.com/a6b8/ethereum-sanction-check-for-nodejs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/a6b8/ethereum-sanction-check-for-nodejs/blob/master/CODE_OF_CONDUCT.md).

<br>


<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/limitations.svg" height="45px" name="limitations" alt="Limitations">
</a>

- Only chainalysis api included

<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/credits.svg" height="45px" name="credits" alt="Credits">
</a>

- [Etherjs](https://docs.ethers.io/v5/)
- [Axios](https://axios-http.com/docs/intro)
  
<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/license.svg" height="45px" alt="License" name="license">
</a>

The module is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

<br>

<a href="#table-of-contents">
<img src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/code-of-conduct.svg" height="45px" alt="Code of Conduct" name="code-of-conduct">
</a>
    
Everyone interacting in the Statosio project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/a6b8/ethereum-sanction-check-for-nodejs/blob/main/CODE_OF_CONDUCT.md).

<br>

<a href="#table-of-contents">
<img href="#table-of-contents" src="https://raw.githubusercontent.com/a6b8/a6b8/main/assets/headlines/default/star-us.svg" height="45px" name="star-us" alt="Star us">
</a>

Please ⭐️ star this Project, every ⭐️ star makes us very happy!