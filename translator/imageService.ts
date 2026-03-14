import { ImageDTO } from "./types.js";
import * as Mocks from "./mocks.js";
import { loadLocalSettings } from "./helpers.js";


// Keep mocks as default until Unsplash access is approved.
const USE_IMAGE_MOCKS = true;

async function getImagesFromAPI(str: string, limit?: number): Promise<ImageDTO[]> {
    const perPage = limit ?? 5;
    const settings = await loadLocalSettings();
    const url =
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(str)}` +
        `&per_page=${perPage}&client_id=${encodeURIComponent(settings.UNSPLASH_ACCESS_KEY)}`;

    const response = await fetch(url);
    const data = await response.json();

    const items = Array.isArray(data?.results) ? data.results : [];
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
    limit?: number,
    useImagesMocks: boolean = USE_IMAGE_MOCKS
): Promise<ImageDTO[]> {
    return useImagesMocks
        ? getImagesFromMock(str, limit)
        : getImagesFromAPI(str, limit);
}
