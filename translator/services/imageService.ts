import { ImageDTO } from "../types.js";
import * as Mocks from "../mocks.js";
import { loadLocalSettings } from "../helpers.js";


const USE_IMAGE_MOCKS = true;

type imageCacheEntry = {
    data: ImageDTO[]
    createdAt: number
    ttlMs: number
}
const imageCache = new Map<string,imageCacheEntry>()
const CACHE_TTL_MS = 20 * 60 * 1000

function makeCacheKey(str: string, limit: number) {
    return `${str}|${limit}`
}
function getFromCache(key: string): ImageDTO[] | null {
    const raw = localStorage.getItem(key)
    if (!raw) return null

    try {
        const entry = JSON.parse(raw) as imageCacheEntry
        const expired = Date.now() - entry.createdAt > entry.ttlMs

        if(expired) {
            localStorage.removeItem(key)
            return null
        }
        return entry.data
    } catch {
        localStorage.removeItem(key)
        return null
    }
}
function saveToCache(key: string, data: ImageDTO[], ttlMs: number): void {
    const entry: imageCacheEntry = {data, createdAt: Date.now(), ttlMs}
    localStorage.setItem(key, JSON.stringify(entry))
}


async function getImagesFromAPI(str: string, limit?: number): Promise<ImageDTO[]> {
    const perPage = limit ?? 5;
    const settings = await loadLocalSettings();
    const url =
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(str)}` +
        `&per_page=${perPage}&client_id=${encodeURIComponent(settings.UNSPLASH_ACCESS_KEY)}`;

    const response = await fetch(url);
    const data = await response.json();
    const items = data.results;

    const mapped: ImageDTO[] = items.map((item: any) => ({
        id: item.id,
        urlSmall: item.urls?.small ?? "",
        urlLarge: item.urls?.full ?? "",
        wordValue: str,
        description: item.alt_description ?? ""
    }));

    return limit ? mapped.slice(0, limit) : mapped;
}

async function getImagesFromMock(str: string, limit?: number): Promise<ImageDTO[]> {
    const key = str.trim().toLowerCase();
    const mockedList: string[] = Mocks.imageMocksByWord[key] ?? [];
    const limited = limit ? mockedList.slice(0, limit) : mockedList;

    return limited.map((mockUrl) => ({
        id: crypto.randomUUID(),
        urlSmall: mockUrl,
        urlLarge: mockUrl,
        wordValue: str,
        description: "mocked image"
    }));
}

export async function getSuggestedImages(
    str: string,
    limit: number = 5,
    useImagesMocks: boolean = USE_IMAGE_MOCKS
): Promise<ImageDTO[]> {
    const key = makeCacheKey(str, limit)
    const cached = getFromCache(str)
    if (cached) return cached
    if(useImagesMocks) return getImagesFromMock(str, limit)

    const freshImages = await getImagesFromAPI(str, limit)
    saveToCache(str, freshImages, CACHE_TTL_MS)
    return freshImages
}
