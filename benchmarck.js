const autocannon = require('autocannon')
const {PassThrough}= require('stream')

function run (url) {
    const buf = []
    const autputStream = new PassThrough()


const inst = autocannon({
    url,
    connection:100,
    duration:20,
})

autocannon.track(inst,{autputStream})

autputStream.on('data',data => buf.push(data))
inst.on('done',function(){
    process.stdout.write(Buffer.concat(buf))
})
console.log('running...')
run('http://localhost:8080/info')
}
