// DEPENDENCIES
var log = require( 'services/logger' )( {
		tag: "fileManager",
		hideLog: true
	} );

//PUBLIC INTERFACE
var $ = module.exports = {
	writeToFile: writeToFile,
    readFile: readFile,
    fileExists: fileExists,
    deleteFile: deleteFile
};



function deleteFile(fileName){
    log("delete file...");
    var file = getFile(fileName);
    if (fileExists(fileName)) {
        log(file.deleteFile(), fileName + " > Delete file ");
    }
}


function writeToFile(fileName, data){
    log("write to file...");
    var file = getFile(fileName);
    if (fileExists(fileName)){
        if (data) {
            var dataToSave = typeof(data)== "string" ? data : JSON.stringify(data);
            log( dataToSave , fileName + ' > Write data '+ file.write(JSON.stringify(dataToSave)));
        }
    }
}

function readFile(fileName){
    log("read file ...");
    var data;
    var file = getFile(fileName);
    if (fileExists(fileName)){
        data = JSON.parse(file.read());
    }
    return data
}

function fileExists(fileName){
    var exists = false;
    var dir = getRootDir();
    var file = Titanium.Filesystem.getFile(dir.resolve(), fileName);

    if (Alloy.Globals.isAndroid) { // in android file.exists() always return false
        if (file.createFile()) { // if the creation success , the file donsnt exists => delete the created file
            file.deleteFile();
        }else { // if the creation failed , the file exists
            exists = true;
        }
        log(exists, "file exists");
    }else {
        log(file.exists(), "file exists");
        exists = file.exists();
    }
    return exists
}






function getFile(fileName){

    var dir = getRootDir();
    var file = Titanium.Filesystem.getFile(dir.resolve(), fileName);
    log(file.createFile(), fileName+" > Create file"); // if the file exists , ir return false
    return file
}

function getRootDir(){
    var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'CMpLDataDir');
    if (!dir.exists()) {
        log(dir.createDirectory(), "Create Dir 'APP_DATA': ");
    }
    return dir
}
