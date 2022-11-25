const textFile = fs.readFileSync('./texts/Mohamed.txt','utf-8')
console.log(textFile)
const textFile2 = `This What We know about the future : ${textFile}. \n Created on ${Date.now()}`
fs.writeFileSync('./texts/output.txt',textFile2)

// async--Nonblocking
fs.readFile('./texts/start.txt','utf-8',(err,data1)=>{
    fs.readFile(`./texts/start-this.txt`,'utf-8',(err,data2)=>{
        console.log(data2)
        fs.readFile('./texts/mohamed.txt','utf-8',(err,data3)=>{
            console.log(data3)
            fs.writeFile('./texts/final.txt',`${data2}+${data3}`,'utf-8',err=>{
                console.log('File has been written')
            })
        })
    })
})
