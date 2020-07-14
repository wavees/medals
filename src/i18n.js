import { register, init, getLocaleFromNavigator } from 'svelte-i18n'

register('int-en', () => import('../locales/int-en.json'));

init({
  fallbackLocale: 'int-en',
  initialLocale: getLocaleFromNavigator(),
});