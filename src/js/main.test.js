const usernameRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*\d).{8,}$/;

  test('valid username: contains uppercase, special char, number, 8+ chars', () => {
    expect(usernameRegex.test('Abcdef1!')).toBe(true);
    expect(usernameRegex.test('Password1$')).toBe(true);
    expect(usernameRegex.test('A1!aaaaa')).toBe(true);
  });

  test('invalid username: less than 8 chars', () => {
    expect(usernameRegex.test('A1!aaaa')).toBe(false);
    expect(usernameRegex.test('A!1aaaa')).toBe(false);
  });

  test('invalid username: missing uppercase', () => {
    expect(usernameRegex.test('abcdef1!')).toBe(false);
    expect(usernameRegex.test('password1$')).toBe(false);
  });

  test('invalid username: missing special character', () => {
    expect(usernameRegex.test('Abcdef12')).toBe(false);
    expect(usernameRegex.test('Password1')).toBe(false);
  });

  test('invalid username: missing number', () => {
    expect(usernameRegex.test('Abcdefg!')).toBe(false);
    expect(usernameRegex.test('Password!')).toBe(false);
  });