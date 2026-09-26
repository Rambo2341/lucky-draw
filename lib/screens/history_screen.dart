import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../models/ticket.dart';
import '../providers/history_provider.dart';
import '../providers/settings_provider.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;
    final tickets = context.watch<HistoryProvider>().tickets;

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('history', lang))),
      body: tickets.isEmpty
          ? Center(
              child: Text(
                AppStrings.t('noHistoryYet', lang),
                style: const TextStyle(color: Colors.grey, fontSize: 16),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: tickets.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) => _TicketTile(ticket: tickets[index], lang: lang),
            ),
    );
  }
}

class _TicketTile extends StatelessWidget {
  final Ticket ticket;
  final String lang;
  const _TicketTile({required this.ticket, required this.lang});

  String _formatDate(DateTime d) =>
      '${d.year}/${d.month.toString().padLeft(2, '0')}/${d.day.toString().padLeft(2, '0')} '
      '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';

  @override
  Widget build(BuildContext context) {
    final won = ticket.pointsWon > 0;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.grey.withOpacity(0.15)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(_formatDate(ticket.date), style: const TextStyle(color: Colors.grey, fontSize: 12)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: (won ? AppColors.success : AppColors.danger).withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  won
                      ? '${AppStrings.t('win', lang)} +${ticket.pointsWon}'
                      : AppStrings.t('lose', lang),
                  style: TextStyle(
                    color: won ? AppColors.success : AppColors.danger,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text('${AppStrings.t('yourNumbers', lang)}: ${ticket.chosenNumbers.join(', ')}'),
          Text('${AppStrings.t('winningNumbers', lang)}: ${ticket.drawNumbers.join(', ')}'),
          const SizedBox(height: 4),
          Text(
            '${AppStrings.t('matches', lang)}: ${ticket.matches}',
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }
}
