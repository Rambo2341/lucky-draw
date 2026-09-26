import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../providers/balance_provider.dart';
import '../providers/history_provider.dart';
import '../providers/settings_provider.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;
    final history = context.watch<HistoryProvider>();
    final balanceHistory = context.watch<BalanceProvider>().balanceHistory;

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('stats', lang))),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: _StatCard(
                    label: AppStrings.t('totalPlays', lang),
                    value: '${history.totalPlays}',
                    icon: Icons.confirmation_number,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: _StatCard(
                    label: AppStrings.t('highestWin', lang),
                    value: '${history.highestWin}',
                    icon: Icons.emoji_events,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            Text(
              AppStrings.t('balanceTrend', lang),
              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: balanceHistory.length < 2
                  ? Center(
                      child: Text(
                        AppStrings.t('noHistoryYet', lang),
                        style: const TextStyle(color: Colors.grey),
                      ),
                    )
                  : Padding(
                      padding: const EdgeInsets.only(top: 8, right: 8),
                      child: LineChart(
                        LineChartData(
                          gridData: const FlGridData(show: true, drawVerticalLine: false),
                          titlesData: const FlTitlesData(
                            topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                            rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                            bottomTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: true, reservedSize: 22),
                            ),
                            leftTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: true, reservedSize: 46),
                            ),
                          ),
                          borderData: FlBorderData(show: false),
                          lineBarsData: [
                            LineChartBarData(
                              spots: [
                                for (int i = 0; i < balanceHistory.length; i++)
                                  FlSpot(i.toDouble(), balanceHistory[i].toDouble()),
                              ],
                              isCurved: true,
                              color: AppColors.primary,
                              barWidth: 3,
                              dotData: const FlDotData(show: true),
                              belowBarData: BarAreaData(
                                show: true,
                                color: AppColors.gold.withOpacity(0.2),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _StatCard({required this.label, required this.value, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.grey.withOpacity(0.15)),
      ),
      child: Column(
        children: [
          Icon(icon, color: AppColors.gold, size: 28),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 12), textAlign: TextAlign.center),
        ],
      ),
    );
  }
}
