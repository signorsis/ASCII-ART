
const {convertImageToAscii}=require("./Ascii")
 
const makeArt= async () => { 
 await convertImageToAscii("assets/images/gallery-1.jpg")

}

makeArt();