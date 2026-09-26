import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import '../core/constants.dart';
import '../core/localization/app_strings.dart';
import '../models/ticket.dart';
import '../providers/balance_provider.dart';
import '../providers/history_provider.dart';
import '../providers/settings_provider.dart';
import '../services/draw_service.dart';
import '../widgets/number_ball.dart';
import 'ticket_selection_screen.dart';
import 'home_screen.dart';

class DrawScreen extends StatefulWidget {
  final List<int> chosenNumbers;
  const DrawScreen({super.key, required this.chosenNumbers});

  @override
  State<DrawScreen> createState() => _DrawScreenState();
}

class _DrawScreenState extends State<DrawScreen> with TickerProviderStateMixin {
  late final List<int> _winningNumbers;
  final List<int> _revealed = [];
  bool _finished = false;
  int _matches = 0;
  int _pointsWon = 0;
  late final ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    _winningNumbers = DrawService.generateWinningNumbers();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    _revealSequentially();
  }

  Future<void> _revealSequentially() async {
    for (final number in _winningNumbers) {
      await Future.delayed(const Duration(milliseconds: 550));
      if (!mounted) return;
      HapticFeedback.mediumImpact();
      setState(() => _revealed.add(number));
    }
    await Future.delayed(const Duration(milliseconds: 300));
    _finishDraw();
  }

  void _finishDraw() {
    final matches = DrawService.countMatches(widget.chosenNumbers, _winningNumbers);
    final points = DrawService.pointsForMatches(matches);

    final balanceProvider = context.read<BalanceProvider>();
    final historyProvider = context.read<HistoryProvider>();

    if (points > 0) balanceProvider.add(points);
    balanceProvider.recordBalanceSnapshot();
    historyProvider.addTicket(Ticket(
      date: DateTime.now(),
      chosenNumbers: widget.chosenNumbers,
      drawNumbers: _winningNumbers,
      matches: matches,
      pointsWon: points,
    ));

    setState(() {
      _matches = matches;
      _pointsWon = points;
      _finished = true;
    });

    if (matches >= GameRules.bigWinMatchThreshold) {
      _confettiController.play();
      HapticFeedback.heavyImpact();
    }
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<SettingsProvider>().locale.languageCode;
    final chosenSet = widget.chosenNumbers.toSet();

    return Scaffold(
      appBar: AppBar(title: Text(AppStrings.t('drawing', lang))),
      body: Stack(
        alignment: Alignment.topCenter,
        children: [
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Text(
                    AppStrings.t('yourNumbers', lang),
                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    children: widget.chosenNumbers
                        .map((n) => NumberBall(
                              number: n,
                              selected: true,
                              highlighted: _finished && _winningNumbers.contains(n),
                              size: 38,
                            ))
                        .toList(),
                  ),
                  const SizedBox(height: 28),
                  Text(
                    AppStrings.t('winningNumbers', lang),
                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 10,
                    children: List.generate(GameRules.numbersToPick, (i) {
                      if (i >= _revealed.length) {
                        return Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.grey.withOpacity(0.4), width: 1.5),
                          ),
                          child: const Icon(Icons.help_outline, size: 20, color: Colors.grey),
                        );
                      }
                      final n = _revealed[i];
                      return TweenAnimationBuilder<double>(
                        tween: Tween(begin: 0, end: 1),
                        duration: const Duration(milliseconds: 400),
                        curve: Curves.elasticOut,
                        builder: (context, scale, child) => Transform.scale(scale: scale, child: child),
                        child: NumberBall(
                          number: n,
                          size: 48,
                          highlighted: chosenSet.contains(n),
                          selected: !chosenSet.contains(n),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 36),
                  if (_finished) _ResultCard(matches: _matches, pointsWon: _pointsWon, lang: lang),
                  const Spacer(),
                  if (_finished) ...[
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => Navigator.of(context).pushReplacement(
                          MaterialPageRoute(builder: (_) => const TicketSelectionScreen()),
                        ),
                        child: Text(AppStrings.t('playAgain', lang)),
                      ),
                    ),
                    const SizedBox(height: 10),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton(
                        onPressed: () => Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(builder: (_) => const HomeScreen()),
                          (route) => false,
                        ),
                        child: Text(AppStrings.t('backHome', lang)),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
              shouldLoop: false,
              numberOfParticles: 30,
              colors: const [AppColors.gold, AppColors.primary, AppColors.success, Colors.white],
            ),
          ),
        ],
      ),
    );
  }
}

class _ResultCard extends StatelessWidget {
  final int matches;
  final int pointsWon;
  final String lang;

  const _ResultCard({required this.matches, required this.pointsWon, required this.lang});

  @override
  Widget build(BuildContext context) {
    final won = pointsWon > 0;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: (won ? AppColors.success : AppColors.danger).withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: won ? AppColors.success : AppColors.danger),
      ),
      child: Column(
        children: [
          Text('${AppStrings.t('matches', lang)}: $matches',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 6),
          Text(
            '${AppStrings.t('pointsWon', lang)}: ${won ? '+' : ''}$pointsWon',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: won ? AppColors.success : AppColors.danger,
            ),
          ),
        ],
      ),
    );
  }
}
