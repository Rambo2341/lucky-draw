import 'package:flutter/material.dart';

/// Central place for the app's identity: colors, sizes and game rules.
/// Keeping these here means every screen stays visually consistent.
class AppColors {
  AppColors._();

  static const Color primary = Color(0xFF6C3CE9); // بنفسجي غامق - أساسي
  static const Color primaryDark = Color(0xFF4B22B0);
  static const Color gold = Color(0xFFFFD700); // ذهبي - ثانوي
  static const Color goldDark = Color(0xFFE0B600);

  static const Color backgroundLight = Color(0xFFF6F4FC);
  static const Color backgroundDark = Color(0xFF130B26);

  static const Color surfaceLight = Colors.white;
  static const Color surfaceDark = Color(0xFF1F1440);

  static const Color success = Color(0xFF2ECC71);
  static const Color danger = Color(0xFFFF5C5C);
  static const Color info = Color(0xFF3CC7E9);
}

class GameRules {
  GameRules._();

  static const int startingBalance = 1000;
  static const int ticketCost = 50;
  static const int numbersToPick = 6;
  static const int minNumber = 1;
  static const int maxNumber = 49;

  /// جدول الجوائز حسب عدد التطابقات
  static int pointsForMatches(int matches) {
    switch (matches) {
      case 6:
        return 5000;
      case 5:
        return 500;
      case 4:
        return 100;
      case 3:
        return 20;
      default:
        return 0;
    }
  }

  /// من هذا العدد من التطابقات فما فوق تُعتبر "فوز كبير" (كونفيتي)
  static const int bigWinMatchThreshold = 5;
}

/// باقات شراء النقاط (عملية شراء وهمية/تجريبية داخل التطبيق فقط -
/// غير مرتبطة بأي بوابة دفع حقيقية).
class CoinPackage {
  final String priceLabel;
  final int points;
  final bool bestValue;

  const CoinPackage({
    required this.priceLabel,
    required this.points,
    this.bestValue = false,
  });
}

const List<CoinPackage> kCoinPackages = [
  CoinPackage(priceLabel: '\$10', points: 1000),
  CoinPackage(priceLabel: '\$20', points: 2200),
  CoinPackage(priceLabel: '\$50', points: 6000, bestValue: true),
  CoinPackage(priceLabel: '\$100', points: 13000),
];

class PrefsKeys {
  PrefsKeys._();
  static const balance = 'lucky_draw_balance';
  static const balanceHistory = 'lucky_draw_balance_history';
  static const history = 'lucky_draw_history';
  static const themeMode = 'lucky_draw_theme_mode';
  static const locale = 'lucky_draw_locale';
}
