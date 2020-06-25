import { FilteredKeywordModel } from '../model/filtered-keyword';

export namespace KeywordsHelper {

    export function SortKeywords(keywords: FilteredKeywordModel[]): FilteredKeywordModel[] {
        return keywords.sort((a: any, b: any) => {
            return (new Date(a.first.created_at).getTime() - new Date(b.first.created_at).getTime());
        });
    }
}
