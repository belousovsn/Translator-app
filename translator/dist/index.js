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
import { makeNewWord } from "./wordService.js";
import { determineInputLanguage, makeNewTranslation, translateWordAPI } from "./translationService.js";
var input = document.querySelector('#searchInput');
var searchButton = document.querySelector('#searchBtn');
var shiftButton = document.querySelector('.shift-key');
var spaceButton = document.querySelector('.space-key');
var allKeys = document.querySelectorAll('.key:not(.shift-key):not(.space-key)');
var isShiftActive = shiftButton.classList.contains('active');
var sourceWordDisplay = document.querySelector('.source-word');
var translatedWordDisplay = document.querySelector('.translated-word');
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var detectedLang, targetLang, currentWord, translatedWord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                detectedLang = 'hy';
                try {
                    detectedLang = determineInputLanguage(input.value);
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/];
                }
                targetLang = detectedLang === 'hy' ? 'en' : 'hy';
                currentWord = makeNewWord(input.value, detectedLang);
                return [4 /*yield*/, translateWordAPI(currentWord, detectedLang, targetLang)];
            case 1:
                translatedWord = _a.sent();
                if (!translatedWord) {
                    console.log('translation is failed');
                    return [2 /*return*/];
                }
                makeNewTranslation(currentWord, translatedWord);
                sourceWordDisplay.textContent = currentWord.value;
                translatedWordDisplay.textContent = translatedWord.value;
                return [2 /*return*/];
        }
    });
}); });
shiftButton === null || shiftButton === void 0 ? void 0 : shiftButton.addEventListener('click', function () {
    console.log('the shift button is pressed');
    isShiftActive = !isShiftActive;
    if (isShiftActive) {
        shiftButton.classList.add('active');
        allKeys.forEach(function (key) {
            key.textContent = key.textContent.toUpperCase();
        });
    }
    else {
        shiftButton.classList.remove('active');
        allKeys.forEach(function (key) {
            key.textContent = key.textContent.toLowerCase();
        });
    }
});
allKeys.forEach(function (key) {
    key === null || key === void 0 ? void 0 : key.addEventListener('click', function () {
        input.value += key.textContent;
    });
});
spaceButton === null || spaceButton === void 0 ? void 0 : spaceButton.addEventListener('click', function () {
    input.value += ' ';
});
//# sourceMappingURL=index.js.map