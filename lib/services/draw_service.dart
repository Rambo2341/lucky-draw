import 'dart:math';
import '../core/constants.dart';

/// كل منطق السحب: توليد أرقام فائزة بعشوائية حقيقية (Random.secure)
/// وحساب عدد التطابقات والنقاط.
class DrawService {
  DrawService._();

  static final Random _secureRandom = Random.secure();

  /// يولّد 6 أرقام فريدة بين 1 و49 مرتبة تصاعديًا.
  static List<int> generateWinningNumbers() {
    final pool = List<int>.generate(
      GameRules.maxNumber - GameRules.minNumber + 1,
      (i) => i + GameRules.minNumber,
    );
    pool.shuffle(_secureRandom);
    final winning = pool.take(GameRules.numbersToPick).toList();
    winning.sort();
    return winning;
  }

  /// اختيار عشوائي سريع لأرقام اللاعب (Quick Pick) - نفس آلية التوليد.
  static List<int> quickPick() => generateWinningNumbers();

  static int countMatches(List<int> chosen, List<int> winning) {
    final winningSet = winning.toSet();
    return chosen.where((n) => winningSet.contains(n)).length;
  }

  static int pointsForMatches(int matches) => GameRules.pointsForMatches(matches);
}
