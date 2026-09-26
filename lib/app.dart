import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'core/theme.dart';
import 'core/localization/app_strings.dart';
import 'providers/settings_provider.dart';
import 'screens/splash_screen.dart';

class LuckyDrawApp extends StatelessWidget {
  const LuckyDrawApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<SettingsProvider>();
    final lang = settings.locale.languageCode;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: AppStrings.t('appName', lang),
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: settings.themeMode,
      locale: settings.locale,
      supportedLocales: const [Locale('ar'), Locale('en')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      // يضمن اتجاه الواجهة (RTL) تلقائيًا مع العربي و(LTR) مع الإنجليزي.
      builder: (context, child) {
        return Directionality(
          textDirection: lang == 'ar' ? TextDirection.rtl : TextDirection.ltr,
          child: child!,
        );
      },
      home: const SplashScreen(),
    );
  }
}
