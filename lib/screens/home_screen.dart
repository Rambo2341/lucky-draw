import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../providers/balance_provider.dart';
import '../providers/settings_provider.dart';
import '../widgets/balance_card.dart';
import 'ticket_selection_screen.dart';
import 'history_screen.dart';
import 'stats_screen.dart';
import 'settings_screen.dart';
import 'buy_coins_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _lowBalanceDialogShown = false;

  void _maybeShowLowBalanceDialog(int balance, String lang) {
    if (balance >= GameRules.ticketCost) {
      _lowBalanceDialogShown = false;
      return;
    }
    if (_lowBalanceDialogShown) return;
    _lowBalanceDialogShown = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      showDialog(
        context: context,
        barrierDismissible: false,
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
                Navigator.of(ctx).pop();
              },
              child: Text(AppStrings.t('reset', lang)),
            ),
          ],
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;
    final balance = context.watch<BalanceProvider>().balance;
    _maybeShowLowBalanceDialog(balance, lang);

    return Scaffold(
      appBar: AppBar(
        title: Text(AppStrings.t('appName', lang)),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const SettingsScreen()),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(height: 8),
              BalanceCard(balance: balance, langCode: lang),
              const SizedBox(height: 14),
              _BuyCoinsBanner(lang: lang),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const TicketSelectionScreen()),
                  ),
                  child: Text(AppStrings.t('playNow', lang), style: const TextStyle(fontSize: 20)),
                ),
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      icon: const Icon(Icons.history),
                      label: Text(AppStrings.t('history', lang)),
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(builder: (_) => const HistoryScreen()),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      icon: const Icon(Icons.bar_chart_rounded),
                      label: Text(AppStrings.t('stats', lang)),
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(builder: (_) => const StatsScreen()),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }
}

class _BuyCoinsBanner extends StatelessWidget {
  final String lang;
  const _BuyCoinsBanner({required this.lang});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => const BuyCoinsScreen()),
      ),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: AppColors.gold.withOpacity(0.15),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.gold.withOpacity(0.5)),
        ),
        child: Row(
          children: [
            const Icon(Icons.add_circle, color: AppColors.goldDark),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                AppStrings.t('buyCoins', lang),
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
            ),
            const Icon(Icons.chevron_right),
          ],
        ),
      ),
    );
  }
}
