import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../providers/balance_provider.dart';
import '../providers/settings_provider.dart';
import '../services/draw_service.dart';
import '../widgets/number_ball.dart';
import 'draw_screen.dart';

class TicketSelectionScreen extends StatefulWidget {
  const TicketSelectionScreen({super.key});

  @override
  State<TicketSelectionScreen> createState() => _TicketSelectionScreenState();
}

class _TicketSelectionScreenState extends State<TicketSelectionScreen> {
  final Set<int> _selected = {};

  void _toggle(int number) {
    setState(() {
      if (_selected.contains(number)) {
        _selected.remove(number);
      } else if (_selected.length < GameRules.numbersToPick) {
        _selected.add(number);
      }
    });
  }

  void _quickPick() {
    final picked = DrawService.quickPick();
    setState(() {
      _selected
        ..clear()
        ..addAll(picked);
    });
  }

  void _confirmPurchase() {
    final balanceProvider = context.read<BalanceProvider>();
    final ok = balanceProvider.spend(GameRules.ticketCost);
    if (!ok) return; // الزر أصلًا معطل لو الرصيد غير كافٍ
    final numbers = _selected.toList()..sort();
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => DrawScreen(chosenNumbers: numbers)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;
    final balance = context.watch<BalanceProvider>().balance;
    final canConfirm = _selected.length == GameRules.numbersToPick &&
        balance >= GameRules.ticketCost;

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('selectNumbers', lang))),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              AppStrings.t('selectedCount', lang).replaceAll('%d', '${_selected.length}'),
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: GridView.builder(
                itemCount: GameRules.maxNumber,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 7,
                  mainAxisSpacing: 8,
                  crossAxisSpacing: 8,
                ),
                itemBuilder: (context, index) {
                  final number = index + 1;
                  return NumberBall(
                    number: number,
                    selected: _selected.contains(number),
                    size: 40,
                    onTap: () => _toggle(number),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            if (!canConfirm && balance < GameRules.ticketCost)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Text(
                  AppStrings.t('notEnoughBalance', lang),
                  style: const TextStyle(color: AppColors.danger),
                ),
              ),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    icon: const Icon(Icons.shuffle),
                    label: Text(AppStrings.t('quickPick', lang)),
                    onPressed: _quickPick,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: canConfirm ? _confirmPurchase : null,
                child: Text(AppStrings.t('confirmPurchase', lang)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
