var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { makeNewWord } from './wordService.js';
// MyMemory Translation API
var apiUrl = "https://api.mymemory.translated.net/get";
var armenianPattern = /[\u0531-\u0587\u0589-\u058A]/; // Armenian Unicode range
var russianPattern = /[\u0400-\u04FF]/; // Cyrillic Unicode range
var translationList = [];
export function determineInputLanguage(inputText) {
    if (armenianPattern.test(inputText)) {
        return 'hy';
    }
    else if (russianPattern.test(inputText)) {
        return 'ru';
    }
    else if (/^[a-zA-Z\s]+$/.test(inputText)) {
        return 'en';
    }
    else {
        throw new Error("Cannot determine language from input: \"".concat(inputText, "\""));
    }
}
export function makeNewTranslation(sourceWord, translatedWord) {
    return {
        id: crypto.randomUUID(),
        sourceWord: sourceWord,
        translatedWord: translatedWord
    };
}
export function translateWordAPI(sourceWord, sourceLang, resultLang) {
    return __awaiter(this, void 0, void 0, function () {
        var langPair, url, response, data, translatedWord, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    langPair = "".concat(sourceLang, "|").concat(resultLang);
                    url = "".concat(apiUrl, "?q=").concat(encodeURIComponent(sourceWord.value), "&langpair=").concat(langPair);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("API error: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.responseStatus === 200) {
                        translatedWord = makeNewWord(data.responseData.translatedText, resultLang);
                        translationList.push(makeNewTranslation(sourceWord, translatedWord));
                        return [2 /*return*/, translatedWord];
                    }
                    else {
                        throw new Error("Translation failed");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Translation failed:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=translationService.js.map