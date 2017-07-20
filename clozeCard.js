module.exports = function(text, cloze){
    this.cloze = cloze;
    this.partial = text.replace(cloze, "...");
    this.text = text;
        
    if(!text.includes(cloze)){
        console.log("ERROR: cloze-deletion does not appear within the input text");
    }
}