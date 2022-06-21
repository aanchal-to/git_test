const Jimp=require ('jimp');
const fs=require ('fs');
const qrcode=require('qrcode-reader');

const buffer=fs.readFileSync(__dirname+'\\scan.png')

Jimp.read(buffer, function(err,image){
    if(err)
    {
        console.log(err)
    }
    const qr=new qrcode();
    qr.callback=function(err,value){
        if (err){
            console.log(err);
        }
        console.log(value.result);
    }
    qr.decode(image.bitmap);
})