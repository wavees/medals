import { register, init, getLocaleFromNavigator } from 'svelte-i18n'

register('en', () => import('../locales/en.json'));
register('ru', () => import('../locales/ru.json'));


init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});