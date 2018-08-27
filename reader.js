var WordExtractor = require("word-extractor");
var extractor = new WordExtractor();
var extracted = extractor.extract("teste.doc");
var load;
extracted.then(function(doc) {
	var corpo = doc.getBody().toString();	
	corpo = corpo.replace("Teste1", "ABCD");
	corpo = corpo.replace("teste2", "EFGH");
 	console.log(corpo);
  	load = corpo;
});

