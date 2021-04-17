import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

 import us from './us';
 import bg from './bg';

// i18n.translations = {
//   default: us,
//   'en-US': us,
//   'fr-ch': bg,
// };
// // Set the locale once at the beginning of your app.
// i18n.locale = 'fr-ch';
// console.log('i18n.locale', i18n)
// // When a value is missing from a language it'll fallback to another language with the key present.
// i18n.fallbacks = true;
// const us = {
//   mainscreen: {
//     searchPlaceholder: 'Type here...',
//     leftTabNavigator: 'News',
//     rightTabNavigator: 'Settings',
//   },
// }

// const bg = {
//   mainscreen: {
//     searchPlaceholder: 'Пишете тук...',
//     leftTabNavigator: 'Новини',
//     rightTabNavigator: 'Настройки',
//   },
// };

i18n.fallbacks = true;
i18n.translations = {
    default: us,
    'us': us,
    'bg': bg,
  };
export default i18n;
