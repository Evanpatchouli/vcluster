import { zh_CN } from './zh_CN';
import { en_US } from './en_US';

function loadLocale(lang?: string) {
    let locale = null;
    let messages = null;
    switch (lang) {
        case 'en':
            locale = 'en';
            messages = en_US;
            break;
        case 'cn':
            locale = 'zh';
            messages = zh_CN;
            break;
        default:
            locale = 'zh';
            messages = zh_CN;
            break;
    }
    return { locale, messages };
}
export { loadLocale };
