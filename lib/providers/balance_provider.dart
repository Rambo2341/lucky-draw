import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants.dart';

/// يدير رصيد اللاعب (بالنقاط الافتراضية) ويحفظه محليًا.
/// يمنع الرصيد من الوصول لسالب.
class BalanceProvider extends ChangeNotifier {
  int _balance = GameRules.startingBalance;
  final List<int> _balanceHistory = [];
  bool _isLoaded = false;

  int get balance => _balance;
  List<int> get balanceHistory => List.unmodifiable(_balanceHistory);
  bool get isLoaded => _isLoaded;
  bool get isOutOfFunds => _balance < GameRules.ticketCost;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    _balance = prefs.getInt(PrefsKeys.balance) ?? GameRules.startingBalance;
    final historyRaw = prefs.getString(PrefsKeys.balanceHistory);
    if (historyRaw != null) {
      final decoded = jsonDecode(historyRaw) as List;
      _balanceHistory
        ..clear()
        ..addAll(decoded.map((e) => e as int));
    }
    _isLoaded = true;
    notifyListeners();
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(PrefsKeys.balance, _balance);
    await prefs.setString(PrefsKeys.balanceHistory, jsonEncode(_balanceHistory));
  }

  /// يخصم تكلفة التذكرة، يرجع false لو الرصيد غير كافٍ.
  bool spend(int amount) {
    if (_balance < amount) return false;
    _balance -= amount;
    notifyListeners();
    _persist();
    return true;
  }

  void add(int amount) {
    _balance += amount;
    if (_balance < 0) _balance = 0;
    notifyListeners();
    _persist();
  }

  /// يُسجَّل بعد كل سحب لعرض منحنى تطور الرصيد في شاشة الإحصائيات.
  void recordBalanceSnapshot() {
    _balanceHistory.add(_balance);
    if (_balanceHistory.length > 10) {
      _balanceHistory.removeAt(0);
    }
    _persist();
  }

  Future<void> reset() async {
    _balance = GameRules.startingBalance;
    _balanceHistory.clear();
    notifyListeners();
    await _persist();
  }
}
