<?php
// src/php/process.php
// Accepts POST form data or JSON body with keys like "income-january", "expenses-february" and returns JSON with arrays for income and expenses.

declare(strict_types=1);

$months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getData(array $inputData, string $type, array $months): array {
    $data = [];
    foreach ($months as $month) {
        $key = $type . '-' . strtolower($month);
        $value = 0.0;
        if (array_key_exists($key, $inputData)) {
            $raw = $inputData[$key];
            // Allow numeric strings or numbers
            if (is_numeric($raw)) {
                $value = (float)$raw;
            }
        }
        $data[] = $value;
    }
    return $data;
}

// Read input: support JSON body or form-encoded POST
$rawInput = file_get_contents('php://input');
$payload = [];
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $payload = $decoded;
    }
}
// Fallback to $_POST for form submissions
$inputData = !empty($payload) ? $payload : $_POST;

$income = getData($inputData, 'income', $months);
$expenses = getData($inputData, 'expenses', $months);

header('Content-Type: application/json; charset=utf-8');
echo json_encode(["income" => $income, "expenses" => $expenses], JSON_PRETTY_PRINT);
