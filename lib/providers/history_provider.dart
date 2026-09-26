import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants.dart';
import '../models/ticket.dart';

/// يحفظ سجل كل التذاكر التي لعبها المستخدم (الأحدث أولًا).
/// ملاحظة: يستخدم SharedPreferences مع JSON للتبسيط، لو كبر السجل
/// كثيرًا يُفضّل الانتقال لـ Hive أو SQLite لتخزين أفضل للأداء.
class HistoryProvider extends ChangeNotifier {
  final List<Ticket> _tickets = [];

  List<Ticket> get tickets => List.unmodifiable(_tickets);

  int get totalPlays => _tickets.length;

  int get highestWin =>
      _tickets.isEmpty ? 0 : _tickets.map((t) => t.pointsWon).reduce((a, b) => a > b ? a : b);

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(PrefsKeys.history);
    if (raw != null) {
      final decoded = jsonDecode(raw) as List;
      _tickets
        ..clear()
        ..addAll(decoded.map((e) => Ticket.fromJson(e as Map<String, dynamic>)));
    }
    notifyListeners();
  }

  Future<void> addTicket(Ticket ticket) async {
    _tickets.insert(0, ticket);
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      PrefsKeys.history,
      jsonEncode(_tickets.map((t) => t.toJson()).toList()),
    );
  }

  Future<void> clear() async {
    _tickets.clear();
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(PrefsKeys.history);
  }
}
