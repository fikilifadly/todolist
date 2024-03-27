<?php
function roundedGrade($num)
{
    $gradeMin = 0;
    $gradeMax = 100;
    $multiply = 5;

    if ($num < $gradeMin || $num > $gradeMax) return false;
    if ($num <= 10) return false;

    $currentDecimal = $num % $multiply;

    if ($num > 37) {
        if ($currentDecimal <= 2) {
            return $num;
        }
        return $num + $multiply - $currentDecimal;
    }
    return $num;
}


echo roundedGrade(4) . "\n";
echo roundedGrade(73) . "\n";
echo roundedGrade(67) . "\n";
echo roundedGrade(38) . "\n";
echo roundedGrade(33) . "\n";
