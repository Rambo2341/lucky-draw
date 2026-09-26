import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../providers/balance_provider.dart';
import '../providers/history_provider.dart';
import '../providers/settings_provider.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<SettingsProvider>();
    final lang = settings.locale.languageCode;

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('settings', lang))),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _SectionCard(
            child: SwitchListTile(
              title: Text(AppStrings.t('darkMode', lang)),
              secondary: const Icon(Icons.dark_mode_rounded),
              value: settings.isDark,
              onChanged: (v) => settings.toggleTheme(v),
            ),
          ),
          const SizedBox(height: 12),
          _SectionCard(
            child: SwitchListTile(
              title: Text(AppStrings.t('language', lang)),
              subtitle: Text(settings.isArabic ? 'العربية' : 'English'),
              secondary: const Icon(Icons.language_rounded),
              value: settings.isArabic,
              onChanged: (v) => settings.toggleLanguage(v),
            ),
          ),
          const SizedBox(height: 12),
          _SectionCard(
            child: ListTile(
              leading: const Icon(Icons.restart_alt_rounded, color: AppColors.danger),
              title: Text(AppStrings.t('resetBalance', lang)),
              subtitle: Text(AppStrings.t('resetBalanceDesc', lang)),
              onTap: () => _confirmReset(context, lang),
            ),
          ),
          const SizedBox(height: 24),
          _SectionCard(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.info_outline_rounded, color: AppColors.primary),
                      const SizedBox(width: 8),
                      Text(
                        AppStrings.t('about', lang),
                        style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    AppStrings.t('aboutDisclaimer', lang),
                    style: const TextStyle(color: Colors.grey, height: 1.5),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _confirmReset(BuildContext context, String lang) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(AppStrings.t('resetBalance', lang)),
        content: Text(AppStrings.t('resetBalanceQuestion', lang)),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text(AppStrings.t('cancel', lang)),
          ),
          TextButton(
            onPressed: () {
              context.read<BalanceProvider>().reset();
              context.read<HistoryProvider>().clear();
              Navigator.of(ctx).pop();
            },
            child: Text(AppStrings.t('reset', lang), style: const TextStyle(color: AppColors.danger)),
          ),
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final Widget child;
  const _SectionCard({required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.grey.withOpacity(0.15)),
      ),
      child: child,
    );
  }
}
