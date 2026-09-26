import 'package:flutter/material.dart';
import '../core/constants.dart';

/// كرة رقم دائرية تُستخدم في شبكة الاختيار وفي عرض نتيجة السحب.
class NumberBall extends StatelessWidget {
  final int number;
  final bool selected;
  final bool highlighted; // للأرقام المتطابقة في نتيجة السحب
  final double size;
  final VoidCallback? onTap;

  const NumberBall({
    super.key,
    required this.number,
    this.selected = false,
    this.highlighted = false,
    this.size = 44,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final Color bg = highlighted
        ? AppColors.success
        : selected
            ? AppColors.gold
            : Theme.of(context).colorScheme.surface;
    final Color fg = (selected || highlighted)
        ? Colors.black87
        : Theme.of(context).textTheme.bodyLarge!.color!;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: size,
        height: size,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: bg,
          shape: BoxShape.circle,
          border: Border.all(
            color: selected || highlighted ? AppColors.goldDark : Colors.grey.withOpacity(0.4),
            width: 1.5,
          ),
          boxShadow: selected || highlighted
              ? [
                  BoxShadow(
                    color: AppColors.gold.withOpacity(0.5),
                    blurRadius: 8,
                    spreadRadius: 1,
                  )
                ]
              : [],
        ),
        child: Text(
          '$number',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: size * 0.36,
            color: fg,
          ),
        ),
      ),
    );
  }
}
