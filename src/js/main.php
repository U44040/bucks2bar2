<?php
// bucks2bar2 PHP 8 version of selected JS logic
// Note: PHP cannot replace client-side interactivity, but can process and validate data server-side.

$months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getData(array $inputData, string $type, array $months): array {
    $data = [];
    foreach ($months as $month) {
        $key = $type . '-' . strtolower($month);
        $data[] = isset($inputData[$key]) ? (float)$inputData[$key] : 0;
    }
    return $data;
}

function validateUsername(string $username): bool {
    // At least 8 chars, 1 uppercase, 1 digit, 1 special char
    return preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/', $username) === 1;
}

// Example usage: process POST data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $incomeData = getData($_POST, 'income', $months);
    $expensesData = getData($_POST, 'expenses', $months);
    $username = $_POST['username'] ?? '';
    $usernameValid = validateUsername($username);
    // You can now use $incomeData, $expensesData, $usernameValid for further processing or rendering
}

?>
<!-- Example HTML form for PHP processing -->
<form method="post">
    <?php foreach ($months as $month): ?>
        <label>Income for <?= $month ?>: <input type="number" name="income-<?= strtolower($month) ?>" step="0.01"></label><br>
        <label>Expenses for <?= $month ?>: <input type="number" name="expenses-<?= strtolower($month) ?>" step="0.01"></label><br>
    <?php endforeach; ?>
    <label>Username: <input type="text" name="username"></label><br>
    <button type="submit">Submit</button>
</form>
<?php if (isset($usernameValid)): ?>
    <div>
        Username is <?= $usernameValid ? 'valid' : 'invalid' ?>
    </div>
<?php endif; ?>
