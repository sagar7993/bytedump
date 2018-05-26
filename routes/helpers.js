var _ = require('underscore');

function containedInArray(needle) {
    var findNaN = needle !== needle; var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
}

function checkLoopComplete(index, length, files, res, client, ejs) {
    files = _.sortBy(files, 'fileType');
    if(index + 1 == length)
    {
        if(client === 'web') {
            res.render(ejs, { "files" : files });
        } else {
            res.send(files);
            res.end();
        }
    }
}

function getFileType(extension) {
    extension = extension.toUpperCase(); var fileType = "unknown";
    if(containedInArray.call(imageArray, extension)) {
        fileType = "image";
    } else if(containedInArray.call(videoArray, extension)) {
        fileType = "video";
    } else if(containedInArray.call(audioArray, extension)) {
        fileType = "audio";
    } else if(containedInArray.call(textArray, extension)) {
        fileType = "text";
    } else if(containedInArray.call(compressedArray, extension)) {
        fileType = "compressed";
    } else if(containedInArray.call(webArray, extension)) {
        fileType = "web";
    } else if(containedInArray.call(documentArray, extension)) {
        fileType = "document";
    } else if(containedInArray.call(executableArray, extension)) {
        fileType = "executable";
    } else if(extension == "") {
        fileType = "folder";
    } else {
        var fileType = "unknown";
    }
    return fileType;
}

function getSize(statSize) {
    var size = statSize;
    var sizeInBytes = statSize + " Bytes";
    var sizeInKB = statSize / 1024 + " KiloBytes";
    var sizeInMB = statSize / 1024 / 1024 + " MegaBytes";
    var sizeInGB = statSize / 1024 / 1024 / 1024 + " GigaBytes";
    var sizeInTB = statSize / 1024 / 1024 / 1024 / 1024 + " TeraBytes";
    if(size >= 0 && size < 1024) {
        size = sizeInBytes;
    }
    else if(size >= 1024 && size < 1024 * 1024) {
        size = sizeInKB;
    }
    else if(size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
        size = sizeInMB;
    }
    else if(size >= 1024 * 1024 * 1024 && size < 1024 * 1024 * 1024 * 1024) {
        size = sizeInGB;
    }
    else {
        size = sizeInTB;
    }
    return size;
}

var documentArray = [".DOC",".DOCX",".ODT",".PAGES",".RTF",".WPD",".WPS",".KEY",".KEYCHAIN",".PPT",".PPTX",".PDF",".CSV",".XLSX",".XLS",".XLR"];
var textArray = [".TXT",".DAT",".GED",".PPS",".SDF",".VCF",".LOG",".MD",".CONF",".BAK",".BACKUP"];
var audioArray = [".MP3",".WAV",".WMA",".AIF",".IFF",".M3U",".M4A",".MID",".MPA",".OBB",".VORBIS"];
var videoArray = [".3G2",".3GP",".ASF",".AVI",".FLV",".M4V",".MOV",".MP4",".MPG",".RM",".SRT",".SWF",".VOB",".WMV",".MKV"];
var imageArray = [".BMP",".DDS",".GIF",".JPG",".JPEG",".PNG",".PSD",".PSPIMAGE",".TGA",".THM",".TIF",".TIFF",".YUV",".SVG"];
var executableArray = [".APK",".IPA",".APP",".BAT",".CGI",".COM",".EXE",".GADGET",".JAR",".PIF",".WSF",".JAVA",".PY",".SH",".DLL"];
var webArray = [".ASP",".ASPX",".CER",".CFM",".CSR",".CSS",".HTM",".HTML",".JS",".JSP",".PHP",".RSS",".XHTML",".SASS",".LESS",".SCSS",".PEM",".PPK",".JSON",,".XML",".XSS",".CRX",".PLUGIN"];
var compressedArray = [".TAR",".7Z",".CBR",".DEB",".GZ",".PKG",".RAR",".RPM",".SITX",".TAR.GZ",".ZIP",".ZIPX"];

module.exports.containedInArray = containedInArray;
module.exports.checkLoopComplete = checkLoopComplete;
module.exports.getFileType = getFileType;
module.exports.getSize = getSize;

module.exports.documentArray = documentArray;
module.exports.textArray = textArray;
module.exports.audioArray = audioArray;
module.exports.videoArray = videoArray;
module.exports.imageArray = imageArray;
module.exports.videoArray = videoArray;
module.exports.executableArray = executableArray;
module.exports.webArray = webArray;
module.exports.compressedArray = compressedArray;
