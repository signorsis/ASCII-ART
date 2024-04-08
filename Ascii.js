const Jimp = require('jimp');
const fs=require('fs')

async function changePixelToLuminance(imagePath) {
  try {
     //read the image 
    const image = await Jimp.read(imagePath);
   //resize image
    image.resize(64,48);
    
    //height and width of image
    const height= image.bitmap.height
    const width= image.bitmap.width
    
    //pixel array declaration and intialization
    let pixelArrayLuminance=[]
    for (let y=0; y<height;y++)
    {
        let row=[]
        for (let x=0; x<width;x++)
        {       
            const color=Jimp.intToRGBA(image.getPixelColor(x,y)) // calculate RGBA of pixel
            const luminance=calculateLuminance(color) // calcuate luminance of the RGBA
            row.push(luminance)  
        }
        pixelArrayLuminance.push(row)
    }
    return  pixelArrayLuminance
    
} catch (error) {
  console.error('An error occurred:', error.message);
}
}

            
             

async function changeLuminanceToAscii (imagePath)
{   
     const  pixelArrayLuminance= await changePixelToLuminance
    (imagePath)
 
    const H=await pixelArrayLuminance.length
  
    const W=await pixelArrayLuminance[0].length

    const asciiRGBMapVariable= MapRGBtoAscii()
    let AsciiArrayOfImg=[]
    for (let x=0; x<H;x++)
    {   let row =[]
        for (let y=0; y<W; y++)
        {
            row.push(asciiRGBMapVariable[ pixelArrayLuminance[x][y]])
            row.push(asciiRGBMapVariable[ pixelArrayLuminance[x][y]])
           

        }
        AsciiArrayOfImg.push(row)
    }
  return AsciiArrayOfImg
}



function calculateLuminance (RGBA) {
    const {r,g,b}= RGBA
    const luminance=0.2126 * r + 0.7152 * g + 0.0722 * b;

        return Math.floor(luminance*1)
}


function MapRGBtoAscii () { // 
    const ASCIIChars="`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
    const ASCIICharsLength=ASCIIChars.length
    const RangeLengthOfAscii=Math.ceil(256/ASCIICharsLength)
    let AsciiRgbMap=[]
    
     for (let x=0;x<ASCIICharsLength;x++)
      {
           for (let y=0; y<RangeLengthOfAscii; y++)
           { if(AsciiRgbMap.length<256)
            AsciiRgbMap.push(ASCIIChars[x])
           }
      }

   return AsciiRgbMap
   
}
async function convertImageToAscii(imagePath) {
    const asciiArt = await changeLuminanceToAscii(imagePath);
    const asciiArtString = asciiArt.map(row=>row.join('')).join("\n");

    
    fs.writeFileSync('asciiArt.txt', asciiArtString);
 
   
  }
  
 module.exports={convertImageToAscii}