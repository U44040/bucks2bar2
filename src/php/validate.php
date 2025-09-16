<?php
// src/php/validate.php
// Validates a username according to the rules used in the original JS:
// - At least 8 characters long
// - At least one uppercase letter
// - At least one digit
// - At least one special character (non-alphanumeric)

declare(strict_types=1);

function validateUsername(string $username): bool {
    return preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/', $username) === 1;
}

// Accept JSON or form POST
$raw = file_get_contents('php://input');
$data = [];
if (!empty($raw)) {
    $decoded = json_decode($raw, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data)) {
    $data = $_POST;
}

$username = $data['username'] ?? '';
$valid = validateUsername((string)$username);

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['username' => $username, 'valid' => $valid]);
