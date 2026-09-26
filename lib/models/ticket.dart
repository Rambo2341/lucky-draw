/// يمثل تذكرة واحدة تم لعبها: الأرقام المختارة، نتيجة السحب، والنقاط.
class Ticket {
  final DateTime date;
  final List<int> chosenNumbers;
  final List<int> drawNumbers;
  final int matches;
  final int pointsWon;

  Ticket({
    required this.date,
    required this.chosenNumbers,
    required this.drawNumbers,
    required this.matches,
    required this.pointsWon,
  });

  Map<String, dynamic> toJson() => {
        'date': date.toIso8601String(),
        'chosenNumbers': chosenNumbers,
        'drawNumbers': drawNumbers,
        'matches': matches,
        'pointsWon': pointsWon,
      };

  factory Ticket.fromJson(Map<String, dynamic> json) {
    return Ticket(
      date: DateTime.parse(json['date'] as String),
      chosenNumbers: List<int>.from(json['chosenNumbers'] as List),
      drawNumbers: List<int>.from(json['drawNumbers'] as List),
      matches: json['matches'] as int,
      pointsWon: json['pointsWon'] as int,
    );
  }
}
