/// نظام ترجمة بسيط وخفيف بدون الحاجة لتوليد ملفات (gen-l10n).
/// كل مفتاح له نص عربي وإنجليزي.
class AppStrings {
  AppStrings._();

  static const Map<String, Map<String, String>> _values = {
    'appName': {'ar': 'Lucky Draw', 'en': 'Lucky Draw'},
    'tagline': {'ar': 'جرّب حظك الآن', 'en': 'Try your luck now'},
    'home': {'ar': 'الرئيسية', 'en': 'Home'},
    'settings': {'ar': 'الإعدادات', 'en': 'Settings'},
    'balance': {'ar': 'رصيدك الحالي', 'en': 'Your Balance'},
    'points': {'ar': 'نقطة', 'en': 'pts'},
    'playNow': {'ar': 'العب الآن 🎟️', 'en': 'Play Now 🎟️'},
    'history': {'ar': 'السجل', 'en': 'History'},
    'stats': {'ar': 'الإحصائيات', 'en': 'Stats'},
    'buyCoins': {'ar': 'اشحن رصيدك', 'en': 'Buy Coins'},
    'buyCoinsSubtitle': {
      'ar': 'باقات نقاط إضافية (تجريبي)',
      'en': 'Extra point packages (demo)'
    },
    'selectNumbers': {'ar': 'اختر أرقامك', 'en': 'Select Your Numbers'},
    'selectedCount': {'ar': 'تم اختيار %d من 6', 'en': 'Selected %d of 6'},
    'quickPick': {'ar': 'اختيار عشوائي', 'en': 'Quick Pick'},
    'confirmPurchase': {
      'ar': 'تأكيد الشراء (50 نقطة)',
      'en': 'Confirm Purchase (50 pts)'
    },
    'notEnoughBalance': {
      'ar': 'رصيدك غير كافٍ لشراء تذكرة',
      'en': 'Not enough balance to buy a ticket'
    },
    'resetBalanceQuestion': {
      'ar': 'رصيدك انتهى! هل تريد إعادة تعيينه؟',
      'en': 'Your balance ran out! Reset it?'
    },
    'reset': {'ar': 'إعادة تعيين', 'en': 'Reset'},
    'cancel': {'ar': 'إلغاء', 'en': 'Cancel'},
    'drawing': {'ar': 'جارِ السحب...', 'en': 'Drawing...'},
    'matches': {'ar': 'عدد التطابقات', 'en': 'Matches'},
    'pointsWon': {'ar': 'النقاط المكتسبة', 'en': 'Points Won'},
    'playAgain': {'ar': 'العب مرة ثانية', 'en': 'Play Again'},
    'backHome': {'ar': 'الرجوع للرئيسية', 'en': 'Back to Home'},
    'yourNumbers': {'ar': 'أرقامك', 'en': 'Your Numbers'},
    'winningNumbers': {'ar': 'الأرقام الفائزة', 'en': 'Winning Numbers'},
    'noHistoryYet': {
      'ar': 'لا يوجد سجل بعد، ابدأ اللعب!',
      'en': 'No history yet, start playing!'
    },
    'totalPlays': {'ar': 'عدد مرات اللعب', 'en': 'Total Plays'},
    'highestWin': {'ar': 'أعلى جائزة', 'en': 'Highest Win'},
    'balanceTrend': {
      'ar': 'تطور الرصيد (آخر 10 محاولات)',
      'en': 'Balance Trend (last 10 plays)'
    },
    'darkMode': {'ar': 'الوضع الليلي', 'en': 'Dark Mode'},
    'language': {'ar': 'اللغة', 'en': 'Language'},
    'about': {'ar': 'حول التطبيق', 'en': 'About'},
    'aboutDisclaimer': {
      'ar':
          'هذا التطبيق للتسلية فقط، النقاط افتراضية ولا تمثل أي قيمة نقدية حقيقية.',
      'en':
          'This app is for entertainment only. Points are virtual and hold no real monetary value.'
    },
    'resetBalance': {'ar': 'إعادة تعيين الرصيد', 'en': 'Reset Balance'},
    'resetBalanceDesc': {
      'ar': 'يعيد رصيدك إلى 1000 نقطة (وضع تجريبي)',
      'en': 'Restores your balance to 1000 points (demo mode)'
    },
    'confirm': {'ar': 'تأكيد', 'en': 'Confirm'},
    'purchaseSuccess': {'ar': 'تمت العملية بنجاح!', 'en': 'Purchase successful!'},
    'demoNotice': {
      'ar': 'شراء تجريبي: تمت إضافة النقاط لرصيدك مباشرة.',
      'en': 'Demo purchase: points were added to your balance directly.'
    },
    'ok': {'ar': 'حسنًا', 'en': 'OK'},
    'buy': {'ar': 'شراء', 'en': 'Buy'},
    'bestValue': {'ar': 'الأفضل', 'en': 'Best Value'},
    'win': {'ar': 'ربح', 'en': 'Win'},
    'lose': {'ar': 'خسارة', 'en': 'Loss'},
    'prizeTable': {'ar': 'جدول الجوائز', 'en': 'Prize Table'},
  };

  static String t(String key, String langCode) {
    final entry = _values[key];
    if (entry == null) return key;
    return entry[langCode] ?? entry['en'] ?? key;
  }
}
