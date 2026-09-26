import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants.dart';

/// يدير إعدادات المستخدم: الوضع الليلي/النهاري واللغة (عربي/إنجليزي).
class SettingsProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.light;
  Locale _locale = const Locale('ar');

  ThemeMode get themeMode => _themeMode;
  Locale get locale => _locale;
  bool get isDark => _themeMode == ThemeMode.dark;
  bool get isArabic => _locale.languageCode == 'ar';

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final storedTheme = prefs.getString(PrefsKeys.themeMode);
    _themeMode = storedTheme == 'dark' ? ThemeMode.dark : ThemeMode.light;
    final storedLocale = prefs.getString(PrefsKeys.locale) ?? 'ar';
    _locale = Locale(storedLocale);
    notifyListeners();
  }

  Future<void> toggleTheme(bool dark) async {
    _themeMode = dark ? ThemeMode.dark : ThemeMode.light;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(PrefsKeys.themeMode, dark ? 'dark' : 'light');
  }

  Future<void> toggleLanguage(bool arabic) async {
    _locale = Locale(arabic ? 'ar' : 'en');
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(PrefsKeys.locale, arabic ? 'ar' : 'en');
  }
}
