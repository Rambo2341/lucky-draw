import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../providers/balance_provider.dart';
import '../providers/settings_provider.dart';

/// شاشة شراء النقاط (باقات تصاعدية). هذه عملية شراء *تجريبية/محاكاة*
/// فقط داخل التطبيق ولا تتصل بأي بوابة دفع حقيقية (Google Play Billing /
/// Apple StoreKit) - ربطها بمزود دفع فعلي يحتاج اعتماد المتاجر والامتثال
/// القانوني في بلد التشغيل.
class BuyCoinsScreen extends StatelessWidget {
  const BuyCoinsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('buyCoins', lang))),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              AppStrings.t('buyCoinsSubtitle', lang),
              style: const TextStyle(color: Colors.grey),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.separated(
                itemCount: kCoinPackages.length,
                separatorBuilder: (_, __) => const SizedBox(height: 14),
                itemBuilder: (context, index) {
                  final pkg = kCoinPackages[index];
                  return _CoinPackageTile(package: pkg, lang: lang);
                },
              ),
            ),
            Text(
              AppStrings.t('aboutDisclaimer', lang),
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}

class _CoinPackageTile extends StatelessWidget {
  final CoinPackage package;
  final String lang;

  const _CoinPackageTile({required this.package, required this.lang});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: BorderRadius.circular(20),
        border: package.bestValue
            ? Border.all(color: AppColors.gold, width: 2)
            : Border.all(color: Colors.grey.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          const Icon(Icons.monetization_on_rounded, color: AppColors.gold, size: 36),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      '${package.points} ${AppStrings.t('points', lang)}',
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                    ),
                    if (package.bestValue) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.gold,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          AppStrings.t('bestValue', lang),
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ],
                ),
                Text(package.priceLabel, style: const TextStyle(color: Colors.grey)),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => _simulatePurchase(context),
            child: Text(AppStrings.t('buy', lang)),
          ),
        ],
      ),
    );
  }

  void _simulatePurchase(BuildContext context) {
    context.read<BalanceProvider>().add(package.points);
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(AppStrings.t('purchaseSuccess', lang)),
        content: Text(AppStrings.t('demoNotice', lang)),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text(AppStrings.t('ok', lang)),
          ),
        ],
      ),
    );
  }
}
